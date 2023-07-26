/*
活动名称：粉丝互动 · 超级无线
活动地址：https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/activity/activity?activityId=<活动id>
环境变量：jd_wxFansInterActionActivity_activityId // 活动id
         jd_wxFansInterActionActivity_addCart // 是否做加购任务，默认不做

脚本自动入会，不想入会勿跑！

*/

const Env=require('./utils/Env.js');
const $ = new Env('粉丝互动（超级无线）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let cookiesArr = [],
  activityCookie = "",
  lz_cookie = {};
$.outFlag = false;
$.activityEnd = false;
let jd_wxFansInterActionActivity_activityId = "";
jd_wxFansInterActionActivity_activityId = $.isNode() ? process.env.jd_wxFansInterActionActivity_activityId ? process.env.jd_wxFansInterActionActivity_activityId : "" + jd_wxFansInterActionActivity_activityId : $.getdata("jd_wxFansInterActionActivity_activityId") ? $.getdata("jd_wxFansInterActionActivity_activityId") : "" + jd_wxFansInterActionActivity_activityId;
let addCart = process.env.jd_wxgame_addCart ? process.env.jd_wxgame_addCart : "false";
const activityList = jd_wxFansInterActionActivity_activityId;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x571b32 => {
    cookiesArr.push(jdCookieNode[_0x571b32]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x39882c => _0x39882c.cookie)].filter(_0x7350e5 => !!_0x7350e5);
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/activity/activity?activityId=" + jd_wxFansInterActionActivity_activityId);
  for (let _0x377d22 = 0; _0x377d22 < cookiesArr.length; _0x377d22++) {
    await getUA();
    $.index = _0x377d22 + 1;
    cookie = cookiesArr[_0x377d22];
    originCookie = cookiesArr[_0x377d22];
    $.isLogin = true;
    $.nickName = "";
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    if (!$.isLogin) {
      $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
      });
      $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
      continue;
    }
    $.hotFlag = false;
    $.activityId = activityList;
    await main();
    await $.wait(3000);
    if ($.outFlag || $.activityEnd) break;
  }
})().catch(_0x31e3ac => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x31e3ac + "!", "");
}).finally(() => {
  $.done();
});
async function main() {
  $.token = "";
  $.token = await getToken(originCookie, "https://lzkjdz-isv.isvjd.com");
  if ($.token === "") {
    console.log("获取token失败");
    return;
  }
  await getFirstLZCK();
  await $.wait(500);
  if ($.index == 1) {
    await takePostRequest("getSimpleActInfoVo");
    if ($.venderId === "") {
      console.log("获取shopid失败");
      return;
    }
    await $.wait(500);
  }
  $.pin = "";
  await getMyPing();
  if ($.pin === "") {
    $.hotFlag = true;
    console.log("获取pin失败");
    return;
  }
  await $.wait(500);
  await accessLogWithAD();
  await $.wait(500);
  $.activityData = {};
  $.actInfo = "";
  $.actorInfo = "";
  $.nowUseValue = 0;
  await takePostRequest("activityContent");
  if (JSON.stringify($.activityData) === "{}") {
    console.log("获取活动详情失败，活动可能结束");
    $.activityEnd = true;
    return;
  }
  let _0x2a8702 = [],
    _0x2c5b4c = ["One", "Two", "Three"];
  for (let _0x36b4d5 = 0; _0x36b4d5 < _0x2c5b4c.length; _0x36b4d5++) {
    let _0x44dae7 = $.activityData.actInfo["giftLevel" + _0x2c5b4c[_0x36b4d5]] || "";
    _0x44dae7 && (_0x44dae7 = JSON.parse(_0x44dae7), _0x2a8702.push(_0x44dae7[0].name + "(中奖率:" + _0x44dae7[0].drawChanceStr + "%)"));
  }
  $.index === 1 && console.log("店铺名称：" + $.actInfo.shopName + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n结束时间：" + new Date(parseInt($.activityData.actInfo.endTime)).toLocaleString() + "\n活动奖品：" + _0x2a8702.toString() + "\n");
  console.log("当前能量分：" + $.nowUseValue);
  if ($.actorInfo.prizeOneStatus && $.actorInfo.prizeTwoStatus && $.actorInfo.prizeThreeStatus) {
    console.log("\n已完成三阶段全部抽奖，不能再参与了哦～");
    return;
  }
  await $.wait(1000);
  $.memberInfo = {};
  await takePostRequest("getActMemberInfo");
  if (!$.memberInfo.openCard) {
    $.shopactivityId = "";
    $.joinVenderId = $.venderId;
    await getshopactivityId();
    for (let _0x1ab8f8 = 0; _0x1ab8f8 < Array(5).length; _0x1ab8f8++) {
      if (_0x1ab8f8 > 0) console.log("第" + _0x1ab8f8 + "次 重新开卡");
      await joinShop();
      await $.wait(500);
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
        break;
      }
    }
    await takePostRequest("getActMemberInfo");
    await $.wait(1000);
  }
  await $.wait(1000);
  $.upFlag = false;
  await doTask();
  await $.wait(1000);
  await startDraw();
}
async function startDraw() {
  if ($.upFlag) {
    await takePostRequest("activityContent");
    await $.wait(2000);
  }
  let _0xc428b = Number($.activityData.actorInfo.fansLoveValue) + Number($.activityData.actorInfo.energyValue);
  _0xc428b >= $.activityData.actConfig.prizeScoreOne && $.activityData.actorInfo.prizeOneStatus === false && (console.log("\n已达成第一阶段，开始抽奖吧~\n"), $.drawType = "01", await takePostRequest("startDraw"), await $.wait(2000));
  _0xc428b >= $.activityData.actConfig.prizeScoreTwo && $.activityData.actorInfo.prizeTwoStatus === false && (console.log("\n已达成第二阶段，开始抽奖吧~\n"), $.drawType = "02", await takePostRequest("startDraw"), await $.wait(2000));
  _0xc428b >= $.activityData.actConfig.prizeScoreThree && $.activityData.actorInfo.prizeThreeStatus === false && (console.log("\n已达成第三阶段，开始抽奖吧~\n"), $.drawType = "03", await takePostRequest("startDraw"), await $.wait(2000));
}
async function doTask() {
  $.runFlag = true;
  $.activityData.actorInfo && !$.activityData.actorInfo.follow && (console.log("去关注店铺"), await takePostRequest("followShop"), await $.wait(2000), $.upFlag = true);
  if ($.activityEnd === true) return;
  $.activityData.task1Sign && $.activityData.task1Sign.finishedCount === 0 && $.runFlag && (console.log("每日签到"), await takePostRequest("doSign"), await $.wait(2000), $.upFlag = true);
  if ($.activityEnd === true) return;
  let _0x4ab878 = 0;
  if ($.activityData.task2BrowGoods && $.runFlag) {
    if ($.activityData.task2BrowGoods.finishedCount !== $.activityData.task2BrowGoods.upLimit) {
      _0x4ab878 = Number($.activityData.task2BrowGoods.upLimit) - Number($.activityData.task2BrowGoods.finishedCount);
      $.upFlag = true;
      for (let _0x5b4691 = 0; _0x5b4691 < $.activityData.task2BrowGoods.taskGoodList.length && _0x4ab878 > 0 && $.runFlag; _0x5b4691++) {
        $.oneGoodInfo = $.activityData.task2BrowGoods.taskGoodList[_0x5b4691];
        $.oneGoodInfo.finished === false && (console.log("去浏览商品"), await takePostRequest("doBrowGoodsTask"), await $.wait(2000), _0x4ab878--);
      }
    }
  }
  if ($.activityEnd === true) return;
  if (addCart == "true") {
    if ($.activityData.task3AddCart && $.runFlag) {
      if ($.activityData.task3AddCart.finishedCount !== $.activityData.task3AddCart.upLimit) {
        _0x4ab878 = Number($.activityData.task3AddCart.upLimit) - Number($.activityData.task3AddCart.finishedCount);
        $.upFlag = true;
        for (let _0x14596d = 0; _0x14596d < $.activityData.task3AddCart.taskGoodList.length && _0x4ab878 > 0 && $.runFlag; _0x14596d++) {
          $.oneGoodInfo = $.activityData.task3AddCart.taskGoodList[_0x14596d];
          $.oneGoodInfo.finished === false && (console.log("去加购商品"), await takePostRequest("doAddGoodsTask"), await $.wait(2000), _0x4ab878--);
        }
      }
    }
  }
  if ($.activityEnd === true) return;
  if ($.activityData.task4Share && $.runFlag) {
    if ($.activityData.task4Share.finishedCount !== $.activityData.task4Share.upLimit) {
      _0x4ab878 = Number($.activityData.task4Share.upLimit) - Number($.activityData.task4Share.finishedCount);
      $.upFlag = true;
      for (let _0x52305b = 0; _0x52305b < _0x4ab878 && $.runFlag; _0x52305b++) {
        console.log("去分享活动：第" + (_0x52305b + 1) + "次");
        await takePostRequest("doShareTask");
        await $.wait(2000);
      }
    }
  }
  if ($.activityEnd === true) return;
  $.activityData.task5Remind && $.runFlag && $.activityData.task5Remind.finishedCount !== $.activityData.task5Remind.upLimit && (console.log("去设置活动提醒"), $.upFlag = true, await takePostRequest("doRemindTask"), await $.wait(2000));
  if ($.activityEnd === true) return;
  if ($.activityData.task6GetCoupon && $.runFlag) {
    if ($.activityData.task6GetCoupon.finishedCount !== $.activityData.task6GetCoupon.upLimit) {
      _0x4ab878 = Number($.activityData.task6GetCoupon.upLimit) - Number($.activityData.task6GetCoupon.finishedCount);
      $.upFlag = true;
      for (let _0x579301 = 0; _0x579301 < $.activityData.task6GetCoupon.taskCouponInfoList.length && _0x4ab878 > 0 && $.runFlag; _0x579301++) {
        $.oneCouponInfo = $.activityData.task6GetCoupon.taskCouponInfoList[_0x579301];
        $.oneCouponInfo.finished === false && (await takePostRequest("doGetCouponTask"), await $.wait(2000), _0x4ab878--);
      }
    }
  }
  if ($.activityEnd === true) return;
  $.activityData.task7MeetPlaceVo && $.runFlag && $.activityData.task7MeetPlaceVo.finishedCount !== $.activityData.task7MeetPlaceVo.upLimit && (console.log("去浏览会场"), $.upFlag = true, await takePostRequest("doMeetingTask"), await $.wait(2000));
}
async function takePostRequest(_0x2ea933) {
  let _0xda8424 = "",
    _0x4c86fa = "";
  switch (_0x2ea933) {
    case "getSimpleActInfoVo":
      _0xda8424 = "https://lzkjdz-isv.isvjd.com/customer/getSimpleActInfoVo";
      _0x4c86fa = "activityId=" + $.activityId;
      break;
    case "activityContent":
      _0xda8424 = "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/activityContent";
      _0x4c86fa = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.pin);
      break;
    case "getActMemberInfo":
      _0xda8424 = "https://lzkjdz-isv.isvjd.com/wxCommonInfo/getActMemberInfo";
      _0x4c86fa = "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.pin);
      break;
    case "doBrowGoodsTask":
    case "doAddGoodsTask":
      _0xda8424 = "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/" + _0x2ea933;
      _0x4c86fa = "activityId=" + $.activityId + "&uuid=" + $.activityData.actorInfo.uuid + "&skuId=" + $.oneGoodInfo.skuId;
      break;
    case "doSign":
    case "followShop":
    case "doShareTask":
    case "doRemindTask":
    case "doMeetingTask":
      _0xda8424 = "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/" + _0x2ea933;
      _0x4c86fa = "activityId=" + $.activityId + "&uuid=" + $.activityData.actorInfo.uuid;
      break;
    case "doGetCouponTask":
      _0xda8424 = "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/" + _0x2ea933;
      _0x4c86fa = "activityId=" + $.activityId + "&uuid=" + $.activityData.actorInfo.uuid + "&couponId=" + $.oneCouponInfo.couponInfo.couponId;
      break;
    case "startDraw":
      _0xda8424 = "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/" + _0x2ea933;
      _0x4c86fa = "activityId=" + $.activityId + "&uuid=" + $.activityData.actorInfo.uuid + "&drawType=" + $.drawType;
      break;
    default:
      console.log("错误" + _0x2ea933);
  }
  let _0x4da387 = getPostRequest(_0xda8424, _0x4c86fa);
  return new Promise(async _0x20c0e3 => {
    $.post(_0x4da387, (_0x4addd1, _0xec6698, _0x4bca78) => {
      try {
        setActivityCookie(_0xec6698);
        dealReturn(_0x2ea933, _0x4bca78);
      } catch (_0x527c11) {
        console.log(_0x4bca78);
        $.logErr(_0x527c11, _0xec6698);
      } finally {
        _0x20c0e3();
      }
    });
  });
}
function dealReturn(_0xa4dc5e, _0x234f04) {
  try {
    _0x234f04 = JSON.parse(_0x234f04);
  } catch (_0x2118a8) {
    console.log(_0xa4dc5e + " 执行任务异常");
    console.log(_0x2118a8);
    $.runFlag = false;
  }
  switch (_0xa4dc5e) {
    case "getSimpleActInfoVo":
      _0x234f04.result && ($.venderId = _0x234f04.data.venderId);
      break;
    case "activityContent":
      _0x234f04.data && _0x234f04.result && _0x234f04.count === 0 ? ($.activityData = _0x234f04.data, $.actInfo = $.activityData.actInfo, $.actorInfo = $.activityData.actorInfo, $.nowUseValue = Number($.actorInfo.fansLoveValue) + Number($.actorInfo.energyValue)) : console.log(JSON.stringify(_0x234f04));
      break;
    case "getActMemberInfo":
      _0x234f04.data && _0x234f04.result && _0x234f04.count === 0 && ($.memberInfo = _0x234f04.data);
      break;
    case "doSign":
      _0x234f04.result === true ? console.log("  >> 签到成功") : console.log(_0x234f04.errorMessage);
      break;
    case "followShop":
    case "doBrowGoodsTask":
    case "doAddGoodsTask":
    case "doShareTask":
    case "doRemindTask":
    case "doGetCouponTask":
    case "doMeetingTask":
      if (_0x234f04.result === true) console.log("  >> 任务完成");else {
        if (_0x234f04.errorMessage) {
          console.log("  >> " + _0x234f04.errorMessage);
          for (let _0x582f08 of ["上限", "不足", "超过", "非法操作", "明天", "来晚", "抢光", "发完", "领完", "奖品发送失败", "未开始", "发放完", "全部被领取", "不足", "结束", "京豆计划", "不存在", "不在"]) {
            if (_0x234f04.errorMessage.includes(_0x582f08)) {
              $.activityEnd = true;
              break;
            }
          }
        } else console.log(_0x234f04);
      }
      break;
    case "startDraw":
      if (_0x234f04.result && _0x234f04.result === true) {
        if (_0x234f04.data) {
          if (_0x234f04.data.drawInfo != null) switch (_0x234f04.data.drawInfo.type) {
            case 6:
              console.log("🎉 " + _0x234f04.data.drawInfo.name + " 🐶");
              break;
            case 7:
              console.log(_0x234f04.data.drawInfo);
              console.log("🎉 恭喜获得实物，去看看活动规则吧～");
              break;
            case 8:
              console.log("🗑️ 专享价");
              break;
            case 9:
              console.log("🗑️ " + _0x234f04.data.drawInfo.name + " 🎟️");
              break;
            case 13:
            case 14:
            case 15:
              console.log("🎉 恭喜获得" + _0x234f04.data.drawInfo.name + " 🎁");
              break;
            case 16:
              console.log("🎉 " + _0x234f04.data.drawInfo.priceInfo + " 🧧");
              break;
            default:
              _0x234f04.data.drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + _0x234f04.data.drawInfo.name);
              break;
          } else console.log("💨 空气");
        } else console.log(JSON.stringify(_0x234f04));
      } else _0x234f04.errorMessage ? console.log(_0x234f04.errorMessage) : console.log("抽了个寂寞，京东接口返回内容为空~");
      break;
    default:
      console.log(JSON.stringify(_0x234f04));
  }
}
function getPostRequest(_0x4a22f8, _0x37ee8d) {
  let _0x2b0e74 = {
    "Host": "lzkjdz-isv.isvjcloud.com",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Referer": "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/activity/activity?activityId=" + $.activityId,
    "user-agent": $.UA,
    "content-type": "application/x-www-form-urlencoded",
    "Cookie": cookie
  };
  return {
    "url": _0x4a22f8,
    "method": "POST",
    "headers": _0x2b0e74,
    "body": _0x37ee8d
  };
}
function getMyPing() {
  let _0x4952cd = {
    "url": "https://lzkjdz-isv.isvjd.com/customer/getMyPing",
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
      "Referer": "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/activity/activity?activityId=" + $.activityId,
      "Cookie": cookie
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP"
  };
  return new Promise(_0x11c021 => {
    $.post(_0x4952cd, (_0x505be1, _0x46aa80, _0x212e7f) => {
      try {
        if (_0x505be1) $.log(_0x505be1);else {
          if (_0x46aa80.status == 200) setActivityCookie(_0x46aa80);
          _0x212e7f ? (_0x212e7f = JSON.parse(_0x212e7f), _0x212e7f.result ? ($.pin = _0x212e7f.data.secretPin, $.nickname = _0x212e7f.data.nickname) : $.log(_0x212e7f.errorMessage)) : $.log("京东返回了空数据");
        }
      } catch (_0x11ac7c) {
        $.log(_0x11ac7c);
      } finally {
        _0x11c021();
      }
    });
  });
}
function accessLogWithAD() {
  let _0x47bdd9 = {
    "url": "https://lzkjdz-isv.isvjd.com/common/accessLogWithAD",
    "headers": {
      "Host": "lzkjdz-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "user-agent": $.UA,
      "Referer": "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/activity/" + $.activityId + "?activityId=" + $.activityId + "&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": cookie
    },
    "body": "venderId=" + $.venderId + "&code=69&pin=" + encodeURIComponent($.pin) + "&activityId=" + $.activityId + "&pageUrl=https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/activity/" + $.activityId + "?activityId=" + $.activityId + "&shareuserid4minipg=&shopid=undefined&subType=app&adSource="
  };
  return new Promise(_0x21bff7 => {
    $.post(_0x47bdd9, (_0x486b80, _0x1973da, _0x4001b6) => {
      try {
        if (_0x486b80) {
          console.log(String(_0x486b80));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          setActivityCookie(_0x1973da);
        }
      } catch (_0x2a391f) {
        $.logErr(_0x2a391f, _0x1973da);
      } finally {
        _0x21bff7(_0x4001b6);
      }
    });
  });
}
function getFirstLZCK() {
  return new Promise(_0x16a5a2 => {
    let _0x3f9d06 = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://lzkjdz-isv.isvjd.com/wxFansInterActionActivity/activity/activity?activityId=" + $.activityId,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x3f9d06, async (_0x3aae6d, _0x4a688d, _0x1002be) => {
      try {
        if (_0x3aae6d) {
          _0x4a688d && typeof _0x4a688d.statusCode != "undefined" && _0x4a688d.statusCode == 493 && (console.log("getFirstLZCK 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log(String(_0x3aae6d));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (_0x4a688d.status == 200) setActivityCookie(_0x4a688d);
        }
      } catch (_0x371a5e) {
        $.logErr(_0x371a5e, _0x4a688d);
      } finally {
        _0x16a5a2();
      }
    });
  });
}
function setActivityCookie(_0x2d7fd0) {
  if (_0x2d7fd0.headers["set-cookie"]) {
    cookie = "";
    for (let _0x4296d1 of _0x2d7fd0.headers["set-cookie"]) {
      lz_cookie[_0x4296d1.split(";")[0].substr(0, _0x4296d1.split(";")[0].indexOf("="))] = _0x4296d1.split(";")[0].substr(_0x4296d1.split(";")[0].indexOf("=") + 1);
    }
    for (const _0x32238a of Object.keys(lz_cookie)) {
      cookie += _0x32238a + "=" + lz_cookie[_0x32238a] + ";";
    }
    activityCookie = cookie;
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.0.10;14.3;" + randomString(40) + ";network/wifi;model/iPhone12,1;addressid/3364463029;appBuild/167764;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0x147b04) {
  _0x147b04 = _0x147b04 || 32;
  let _0x3344a9 = "abcdef0123456789",
    _0xb0aa45 = _0x3344a9.length,
    _0x370cb5 = "";
  for (i = 0; i < _0x147b04; i++) _0x370cb5 += _0x3344a9.charAt(Math.floor(Math.random() * _0xb0aa45));
  return _0x370cb5;
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x3ae344 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x391058 = "";
    if ($.shopactivityId) _0x391058 = ",\"activityId\":" + $.shopactivityId;
    const _0x500ba3 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x391058 + ",\"channel\":406}",
      _0x493188 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x500ba3)
      },
      _0x5a1123 = await getH5st("8adfb", _0x493188),
      _0x3f54ca = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x500ba3 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x5a1123),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x3f54ca, async (_0x24b32d, _0x3a7177, _0x43db3a) => {
      try {
        _0x43db3a = _0x43db3a && _0x43db3a.match(/jsonp_.*?\((.*?)\);/) && _0x43db3a.match(/jsonp_.*?\((.*?)\);/)[1] || _0x43db3a;
        let _0x2d47ca = $.toObj(_0x43db3a, _0x43db3a);
        if (_0x2d47ca && typeof _0x2d47ca == "object") {
          if (_0x2d47ca && _0x2d47ca.success === true) {
            console.log(_0x2d47ca.message);
            $.errorJoinShop = _0x2d47ca.message;
            if (_0x2d47ca.result && _0x2d47ca.result.giftInfo) for (let _0x1b5d96 of _0x2d47ca.result.giftInfo.giftList) {
              console.log("入会获得: " + _0x1b5d96.discountString + _0x1b5d96.prizeName + _0x1b5d96.secondLineDesc);
            }
            console.log("");
          } else _0x2d47ca && typeof _0x2d47ca == "object" && _0x2d47ca.message ? ($.errorJoinShop = _0x2d47ca.message, console.log("" + (_0x2d47ca.message || ""))) : console.log(_0x43db3a);
        } else console.log(_0x43db3a);
      } catch (_0x2bcf4c) {
        $.logErr(_0x2bcf4c, _0x3a7177);
      } finally {
        _0x3ae344();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x38d3a4 => {
    let _0x1f5a2d = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x8fc55f = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x1f5a2d)
      },
      _0x48133d = await getH5st("ef79a", _0x8fc55f),
      _0x4fb6aa = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x1f5a2d + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x48133d),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x4fb6aa, async (_0x2c05cd, _0x465c21, _0x22b814) => {
      try {
        _0x22b814 = _0x22b814 && _0x22b814.match(/jsonp_.*?\((.*?)\);/) && _0x22b814.match(/jsonp_.*?\((.*?)\);/)[1] || _0x22b814;
        let _0x18a070 = $.toObj(_0x22b814, _0x22b814);
        _0x18a070 && typeof _0x18a070 == "object" ? _0x18a070 && _0x18a070.success == true && (console.log("\n去加入店铺会员：" + (_0x18a070.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x18a070.result.interestsRuleList && _0x18a070.result.interestsRuleList[0] && _0x18a070.result.interestsRuleList[0].interestsInfo && _0x18a070.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x22b814);
      } catch (_0x5cf35f) {
        $.logErr(_0x5cf35f, _0x465c21);
      } finally {
        _0x38d3a4();
      }
    });
  });
}
