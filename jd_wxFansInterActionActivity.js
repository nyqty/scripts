/*
粉丝互动通用活动

会自动开卡店铺会员，最好只跑自己的账号

请求太频繁会被黑ip

变量：
//export jd_wxFansInterActionActivity_activityId="活动ID"
//export JD_LZ_OPEN="false" //关闭LZ相关活动运行
//export jd_wxFansInterActionActivity_blacklist="" //黑名单 用&隔开 pin值
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/activity?activityId=xxxxxxx

cron:6 6 6 6 *
============Quantumultx===============
[task_local]
#粉丝互动通用活动
6 6 6 6 * jd_wxFansInterActionActivity.js, tag=粉丝互动通用活动, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('粉丝互动通用活动-加密');

const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const getToken = require("./function/krgetToken");
let domains = "https://lzkjdz-isv.isvjd.com";
let cookiesArr = [];
let activityCookie = "";
let lz_cookie = {};
$.outFlag = false;
$.activityEnd = false;
let jd_wxFansInterActionActivity_activityId = "";
jd_wxFansInterActionActivity_activityId = $.isNode() ? process.env.jd_wxFansInterActionActivity_activityId ? process.env.jd_wxFansInterActionActivity_activityId : `${""}${jd_wxFansInterActionActivity_activityId}${""}` : $.getdata("jd_wxFansInterActionActivity_activityId") ? $.getdata("jd_wxFansInterActionActivity_activityId") : `${""}${jd_wxFansInterActionActivity_activityId}${""}`;
const activityList = jd_wxFansInterActionActivity_activityId;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x82b6xb => {
    cookiesArr.push(jdCookieNode[_0x82b6xb]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x82b6xb => {
    return _0x82b6xb.cookie;
  })].filter(_0x82b6xb => {
    return !!_0x82b6xb;
  });
}
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_wxFansInterActionActivity_whitelist || whitelist;
$.blacklist = process.env.jd_wxFansInterActionActivity_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!jd_wxFansInterActionActivity_activityId) {
    console.log("\n衰仔、请填写粉丝互动的活动ID,变量是jd_wxFansInterActionActivity_activityId\n");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/activity?activityId=" + jd_wxFansInterActionActivity_activityId);
  for (let _0x82b6x10 = 0; _0x82b6x10 < cookiesArr.length; _0x82b6x10++) {
    await getUA();
    $.index = _0x82b6x10 + 1;
    cookie = cookiesArr[_0x82b6x10];
    originCookie = cookiesArr[_0x82b6x10];
    $.isLogin = true;
    $.nickName = "";
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
    if (!$.isLogin) {
      $.msg($.name, `${"【提示】cookie已失效"}`, `${"京东账号"}${$.index}${" "}${$.nickName || $.UserName}${"\\n请重新登录获取\\nhttps://bean.m.jd.com/bean/signIndex.action"}`, {
        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
      });
      if ($.isNode()) {
        await notify.sendNotify(`${""}${$.name}${"cookie已失效 - "}${$.UserName}${""}`, `${"京东账号"}${$.index}${" "}${$.UserName}${"\\n请重新登录获取cookie"}`);
      }
      continue;
    }
    $.hotFlag = false;
    $.activityID = activityList;
    await main();
    await $.wait(3000);
    if ($.outFlag || $.activityEnd) {
      break;
    }
  }
})().catch(_0x82b6xf => {
  $.log("", `${"❌ "}${$.name}${", 失败! 原因: "}${_0x82b6xf}${"!"}`, "");
}).finally(() => {
  $.done();
});
async function main() {
  $.token = `${""}`;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await $.wait(3000);
  await getActCk();
  $.shopId = `${""}`;
  await takePostRequest("getSimpleActInfoVo");
  if ($.shopid === `${""}`) {
    console.log(`${"获取shopid失败"}`);
    return;
  }
  await $.wait(3000);
  $.pin = "";
  await takePostRequest("getMyPing");
  if ($.pin === `${""}`) {
    $.hotFlag = true;
    console.log(`${"获取pin失败,该账号可能是黑号"}`);
    return;
  }
  await $.wait(3000);
  await accessLogWithAD();
  await $.wait(3000);
  $.activityData = {};
  $.actinfo = "";
  $.actorInfo = "";
  $.nowUseValue = 0;
  await takePostRequest("activityContent");
  if (JSON.stringify($.activityData) === `${"{}"}`) {
    console.log(`${"获取活动详情失败,活动可能结束"}`);
    $.activityEnd = true;
    return;
  }
  let _0x82b6x12 = new Date($.activityData.actInfo.endTime);
  let _0x82b6x13 = _0x82b6x12.getFullYear() + "-" + (_0x82b6x12.getMonth() < 10 ? "0" + (_0x82b6x12.getMonth() + 1) : _0x82b6x12.getMonth() + 1) + "-" + (_0x82b6x12.getDate() < 10 ? "0" + _0x82b6x12.getDate() : _0x82b6x12.getDate());
  let _0x82b6x14 = [];
  let _0x82b6x15 = ["One", "Two", "Three"];
  for (let _0x82b6x10 = 0; _0x82b6x10 < _0x82b6x15.length; _0x82b6x10++) {
    let _0x82b6x16 = $.activityData.actInfo["giftLevel" + _0x82b6x15[_0x82b6x10]] || "";
    if (_0x82b6x16) {
      _0x82b6x16 = JSON.parse(_0x82b6x16);
      _0x82b6x14.push(_0x82b6x16[0].name);
    }
  }
  if ($.index === 1) {
    console.log(`${"店铺名称："}${$.actinfo.shopName}${""}`);
    console.log(`${"店铺链接：https://shop.m.jd.com/?shopId="}${$.shopid}${""}`);
    console.log(`${"活动名称："}${$.actinfo.actName}${""}`);
    console.log(`${"结束时间："}${_0x82b6x13}${""}`);
    console.log(`${"活动奖品："}` + _0x82b6x14.toString() + "\n");
  }
  console.log(`${"当前积分："}${$.nowUseValue}${""}`);
  if ($.actorInfo.prizeOneStatus && $.actorInfo.prizeTwoStatus && $.actorInfo.prizeThreeStatus) {
    console.log("\n已完成三阶段全部抽奖，不用再参与了哦～");
    return;
  }
  await $.wait(3000);
  $.memberInfo = {};
  await takePostRequest("getActMemberInfo");
  if (!$.memberInfo.openCard) {
    $.shopactivityId = "";
    $.joinVenderId = $.shopid;
    await getshopactivityId();
    for (let _0x82b6x10 = 0; _0x82b6x10 < Array(5).length; _0x82b6x10++) {
      if (_0x82b6x10 > 0) {
        console.log(`${"第"}${_0x82b6x10}${"次 重新开卡"}`);
      }
      await joinShop();
      await $.wait(500);
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
        break;
      }
    }
    await takePostRequest("getActMemberInfo");
    await $.wait(1000);
  }
  if ($.memberInfo.actMemberStatus === 1 && !$.memberInfo.openCard) {
    console.log("\n该活动需要入会,如需执行，请先手动入会");
    return;
  }
  await $.wait(3000);
  $.upFlag = false;
  await doTask();
  await luckDraw();
}
async function luckDraw() {
  if ($.upFlag) {
    await takePostRequest("activityContent");
    await $.wait(3000);
  }
  let _0x82b6x18 = Number($.activityData.actorInfo.fansLoveValue) + Number($.activityData.actorInfo.energyValue);
  if (_0x82b6x18 >= $.activityData.actConfig.prizeScoreOne && $.activityData.actorInfo.prizeOneStatus === false) {
    console.log("\n已达成第一阶段，开始抽奖吧~");
    $.drawType = "01";
    await takePostRequest("startDraw");
    await $.wait(3000);
  }
  if (_0x82b6x18 >= $.activityData.actConfig.prizeScoreTwo && $.activityData.actorInfo.prizeTwoStatus === false) {
    console.log("\n已达成第二阶段，开始抽奖吧~");
    $.drawType = "02";
    await takePostRequest("startDraw");
    await $.wait(3000);
  }
  if (_0x82b6x18 >= $.activityData.actConfig.prizeScoreThree && $.activityData.actorInfo.prizeThreeStatus === false) {
    console.log("\n已达成第三阶段，开始抽奖吧~");
    $.drawType = "03";
    await takePostRequest("startDraw");
    await $.wait(3000);
  }
}
async function doTask() {
  $.runFalag = true;
  if ($.activityData.actorInfo && !$.activityData.actorInfo.follow) {
    console.log("\n去关注店铺");
    await takePostRequest("followShop");
    await $.wait(3000);
    $.upFlag = true;
  }
  if ($.activityData.task1Sign && $.activityData.task1Sign.finishedCount === 0 && $.runFalag) {
    console.log("\n每日签到");
    await takePostRequest("doSign");
    await $.wait(3000);
    $.upFlag = true;
  }
  let _0x82b6x1a = 0;
  if ($.activityData.task2BrowGoods && $.runFalag) {
    if ($.activityData.task2BrowGoods.finishedCount !== $.activityData.task2BrowGoods.upLimit) {
      _0x82b6x1a = Number($.activityData.task2BrowGoods.upLimit) - Number($.activityData.task2BrowGoods.finishedCount);
      console.log("");
      $.upFlag = true;
      for (let _0x82b6x10 = 0; _0x82b6x10 < $.activityData.task2BrowGoods.taskGoodList.length && _0x82b6x1a > 0 && $.runFalag; _0x82b6x10++) {
        $.oneGoodInfo = $.activityData.task2BrowGoods.taskGoodList[_0x82b6x10];
        if ($.oneGoodInfo.finished === false) {
          console.log(`${"去浏览商品："}${$.oneGoodInfo.skuName || ""}${""}`);
          await takePostRequest("doBrowGoodsTask");
          await $.wait(3000);
          _0x82b6x1a--;
        }
      }
    }
  }
  if ($.activityData.task3AddCart && $.runFalag) {
    if ($.activityData.task3AddCart.finishedCount !== $.activityData.task3AddCart.upLimit) {
      _0x82b6x1a = Number($.activityData.task3AddCart.upLimit) - Number($.activityData.task3AddCart.finishedCount);
      console.log("");
      $.upFlag = true;
      for (let _0x82b6x10 = 0; _0x82b6x10 < $.activityData.task3AddCart.taskGoodList.length && _0x82b6x1a > 0 && $.runFalag; _0x82b6x10++) {
        $.oneGoodInfo = $.activityData.task3AddCart.taskGoodList[_0x82b6x10];
        if ($.oneGoodInfo.finished === false) {
          console.log(`${"去加购商品："}${$.oneGoodInfo.skuName || ""}${""}`);
          await takePostRequest("doAddGoodsTask");
          await $.wait(3000);
          _0x82b6x1a--;
        }
      }
    }
  }
  if ($.activityData.task4Share && $.runFalag) {
    if ($.activityData.task4Share.finishedCount !== $.activityData.task4Share.upLimit) {
      _0x82b6x1a = Number($.activityData.task4Share.upLimit) - Number($.activityData.task4Share.finishedCount);
      console.log(`${""}`);
      $.upFlag = true;
      for (let _0x82b6x10 = 0; _0x82b6x10 < _0x82b6x1a && $.runFalag; _0x82b6x10++) {
        console.log(`${"去分享活动：第"}${_0x82b6x10 + 1}${"次"}`);
        await takePostRequest("doShareTask");
        await $.wait(3000);
      }
    }
  }
  if ($.activityData.task5Remind && $.runFalag) {
    if ($.activityData.task5Remind.finishedCount !== $.activityData.task5Remind.upLimit) {
      console.log("\n去完成设置活动提醒");
      $.upFlag = true;
      await takePostRequest("doRemindTask");
      await $.wait(3000);
    }
  }
  if ($.activityData.task6GetCoupon && $.runFalag) {
    if ($.activityData.task6GetCoupon.finishedCount !== $.activityData.task6GetCoupon.upLimit) {
      _0x82b6x1a = Number($.activityData.task6GetCoupon.upLimit) - Number($.activityData.task6GetCoupon.finishedCount);
      $.upFlag = true;
      for (let _0x82b6x10 = 0; _0x82b6x10 < $.activityData.task6GetCoupon.taskCouponInfoList.length && _0x82b6x1a > 0 && $.runFalag; _0x82b6x10++) {
        $.oneCouponInfo = $.activityData.task6GetCoupon.taskCouponInfoList[_0x82b6x10];
        if ($.oneCouponInfo.finished === false) {
          await takePostRequest("doGetCouponTask");
          await $.wait(3000);
          _0x82b6x1a--;
        }
      }
    }
  }
  if ($.activityData.task7MeetPlaceVo && $.runFalag) {
    if ($.activityData.task7MeetPlaceVo.finishedCount !== $.activityData.task7MeetPlaceVo.upLimit) {
      console.log("\n去浏览会场：");
      $.upFlag = true;
      await takePostRequest("doMeetingTask");
      await $.wait(3000);
    }
  }
}
async function takePostRequest(_0x82b6x1c) {
  let _0x82b6x1d = "";
  let _0x82b6x1e = `${""}`;
  switch (_0x82b6x1c) {
    case "getSimpleActInfoVo":
      _0x82b6x1d = "https://lzkjdz-isv.isvjcloud.com/customer/getSimpleActInfoVo";
      _0x82b6x1e = `${"activityId="}${$.activityID}${""}`;
      break;
    case "getMyPing":
      _0x82b6x1d = "https://lzkjdz-isv.isvjcloud.com/customer/getMyPing";
      _0x82b6x1e = `${"userId="}${$.shopid}${"&token="}${encodeURIComponent($.token)}${"&fromType=APP"}`;
      break;
    case "activityContent":
      _0x82b6x1d = "https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activityContent";
      _0x82b6x1e = `${"activityId="}${$.activityID}${"&pin="}${encodeURIComponent($.pin)}${""}`;
      break;
    case "getActMemberInfo":
      _0x82b6x1d = "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/getActMemberInfo";
      _0x82b6x1e = `${"venderId="}${$.shopid}${"&activityId="}${$.activityID}${"&pin="}${encodeURIComponent($.pin)}${""}`;
      break;
    case "doBrowGoodsTask":
    case "doAddGoodsTask":
      _0x82b6x1d = `${"https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/"}${_0x82b6x1c}${""}`;
      _0x82b6x1e = `${"activityId="}${$.activityID}${"&uuid="}${$.activityData.actorInfo.uuid}${"&skuId="}${$.oneGoodInfo.skuId}${""}`;
      break;
    case "doSign":
    case "followShop":
    case "doShareTask":
    case "doRemindTask":
    case "doMeetingTask":
      _0x82b6x1d = `${"https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/"}${_0x82b6x1c}${""}`;
      _0x82b6x1e = `${"activityId="}${$.activityID}${"&uuid="}${$.activityData.actorInfo.uuid}${""}`;
      break;
    case "doGetCouponTask":
      _0x82b6x1d = `${"https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/"}${_0x82b6x1c}${""}`;
      _0x82b6x1e = `${"activityId="}${$.activityID}${"&uuid="}${$.activityData.actorInfo.uuid}${"&couponId="}${$.oneCouponInfo.couponInfo.couponId}${""}`;
      break;
    case "startDraw":
      _0x82b6x1d = `${"https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/"}${_0x82b6x1c}${""}`;
      _0x82b6x1e = `${"activityId="}${$.activityID}${"&uuid="}${$.activityData.actorInfo.uuid}${"&drawType="}${$.drawType}${""}`;
      break;
    default:
      console.log(`${"错误"}${_0x82b6x1c}${""}`);
  }
  let _0x82b6x1f = getPostRequest(_0x82b6x1d, _0x82b6x1e);
  return new Promise(async _0x82b6x20 => {
    $.post(_0x82b6x1f, (_0x82b6x21, _0x82b6x22, _0x82b6x23) => {
      try {
        setActivityCookie(_0x82b6x22);
        dealReturn(_0x82b6x1c, _0x82b6x23);
      } catch (e) {
        console.log(_0x82b6x23);
        $.logErr(e, _0x82b6x22);
      } finally {
        _0x82b6x20();
      }
    });
  });
}
function dealReturn(_0x82b6x1c, _0x82b6x23) {
  try {
    _0x82b6x23 = JSON.parse(_0x82b6x23);
  } catch (e) {
    console.log(`${"执行任务异常"}`);
    $.runFalag = false;
  }
  switch (_0x82b6x1c) {
    case "getSimpleActInfoVo":
      if (_0x82b6x23.result) {
        $.shopid = _0x82b6x23.data.venderId;
      }
      break;
    case "getMyPing":
      if (_0x82b6x23.data && _0x82b6x23.data.secretPin) {
        $.pin = _0x82b6x23.data.secretPin;
        $.nickname = _0x82b6x23.data.nickname;
      } else {
        console.log(JSON.stringify(_0x82b6x23));
      }
      break;
    case "activityContent":
      if (_0x82b6x23.data && _0x82b6x23.result && _0x82b6x23.count === 0) {
        $.activityData = _0x82b6x23.data;
        $.actinfo = $.activityData.actInfo;
        $.actorInfo = $.activityData.actorInfo;
        $.nowUseValue = Number($.actorInfo.fansLoveValue) + Number($.actorInfo.energyValue);
      } else {
        console.log(JSON.stringify(_0x82b6x23));
      }
      break;
    case "getActMemberInfo":
      if (_0x82b6x23.data && _0x82b6x23.result && _0x82b6x23.count === 0) {
        $.memberInfo = _0x82b6x23.data;
      }
      break;
    case "doSign":
      if (_0x82b6x23.result === true) {
        console.log("  >> 签到成功");
      } else {
        console.log(_0x82b6x23.errorMessage);
      }
      break;
    case "followShop":
    case "doBrowGoodsTask":
    case "doAddGoodsTask":
    case "doShareTask":
    case "doRemindTask":
    case "doGetCouponTask":
    case "doMeetingTask":
      if (_0x82b6x23.result === true) {
        console.log("  >> 任务完成");
      } else {
        console.log(_0x82b6x23.errorMessage);
      }
      break;
    case "startDraw":
      if (_0x82b6x23.result && _0x82b6x23.result === true) {
        if (_0x82b6x23.data) {
          if (_0x82b6x23.data.drawInfo != null) {
            switch (_0x82b6x23.data.drawInfo.type) {
              case 4:
                console.log(`${"再来一次"}`);
                $.canDrawTimes += 1;
                break;
              case 6:
                console.log(`${"🎉 "}` + _0x82b6x23.data.drawInfo.name + " 🐶");
                break;
              case 7:
                console.log(_0x82b6x23.data.drawInfo);
                console.log(`${"🎉 恭喜获得实物，去看看活动规则吧～"}`);
                break;
              case 8:
                console.log(`${"🗑️ 垃圾专享价"}`);
                break;
              case 9:
                console.log(`${"🗑️ "}` + _0x82b6x23.data.drawInfo.name + " 🎟️");
                break;
              case 13:
                console.log(`${"🎉 恭喜获得"}` + _0x82b6x23.data.drawInfo.name + " 🎁");
                break;
              case 16:
                console.log(`${"🎉 "}` + _0x82b6x23.data.drawInfo.priceInfo + " 🧧");
                break;
              default:
                if (_0x82b6x23.data.drawInfo.name.includes("券")) {
                  console.log(`${"🗑️ 垃圾优惠券"}`);
                } else {
                  console.log(`${"获得："}` + _0x82b6x23.data.drawInfo.name);
                }
                break;
            }
          } else {
            console.log(`${"💨  空气"}`);
          }
        } else {
          console.log(JSON.stringify(_0x82b6x23));
        }
      } else {
        if (_0x82b6x23.errorMessage) {
          console.log(_0x82b6x23.errorMessage);
        } else {
          console.log("抽了个寂寞，京东接口返回内容为空~");
        }
      }
      break;
    default:
      console.log(JSON.stringify(_0x82b6x23));
  }
}
function getPostRequest(_0x82b6x1d, _0x82b6x1e) {
  let _0x82b6x26 = {
    "Host": "lzkjdz-isv.isvjcloud.com",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Referer": "https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/" + $.activityID + "?activityId=" + $.activityID + "&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined",
    "user-agent": $.UA,
    "content-type": "application/x-www-form-urlencoded",
    "Cookie": cookie
  };
  return {
    url: _0x82b6x1d,
    method: `${"POST"}`,
    headers: _0x82b6x26,
    body: _0x82b6x1e
  };
}
function accessLogWithAD() {
  let _0x82b6x28 = {
    url: `${"https://lzkjdz-isv.isvjcloud.com/common/accessLogWithAD"}`,
    headers: {
      "Host": "lzkjdz-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "user-agent": $.UA,
      "Referer": "https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/" + $.activityID + "?activityId=" + $.activityID + "&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": cookie
    },
    body: `${"venderId="}${$.shopid}${"&code=69&pin="}${encodeURIComponent($.pin)}${"&activityId="}${$.activityID}${"&pageUrl=https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/"}${$.activityID}${"?activityId="}${$.activityID}${"&shareuserid4minipg=&shopid=undefined&subType=app&adSource="}`
  };
  return new Promise(_0x82b6x20 => {
    $.post(_0x82b6x28, (_0x82b6x21, _0x82b6x22, _0x82b6x23) => {
      try {
        if (_0x82b6x21) {
          console.log(`${""}${JSON.stringify(_0x82b6x21)}${""}`);
          console.log(`${""}${$.name}${" API请求失败，请检查网路重试"}`);
        } else {
          setActivityCookie(_0x82b6x22);
        }
      } catch (e) {
        $.logErr(e, _0x82b6x22);
      } finally {
        _0x82b6x20(_0x82b6x23);
      }
    });
  });
}
function getActCk() {
  let _0x82b6x28 = {
    url: `${"https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/"}${$.activityID}${"?activityId="}${$.activityID}${"&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined"}`,
    headers: {
      "Host": "lzkjdz-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Referer": "https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/" + $.activityID + "?activityId=" + $.activityID + "&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined",
      "user-agent": $.UA,
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": cookie
    }
  };
  return new Promise(_0x82b6x20 => {
    $.get(_0x82b6x28, (_0x82b6x21, _0x82b6x22, _0x82b6x23) => {
      try {
        if (_0x82b6x21) {
          if (_0x82b6x22 && typeof _0x82b6x22.statusCode != "undefined") {
            if (_0x82b6x22.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.name}${" API请求失败，请检查网路重试"}`);
        } else {
          setActivityCookie(_0x82b6x22);
        }
      } catch (e) {
        $.logErr(e, _0x82b6x22);
      } finally {
        _0x82b6x20(_0x82b6x23);
      }
    });
  });
}
function setActivityCookie(_0x82b6x22) {
  if (_0x82b6x22) {
    if (_0x82b6x22.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${";"}`;
      for (let _0x82b6x2b of _0x82b6x22.headers["set-cookie"]) {
        lz_cookie[_0x82b6x2b.split(";")[0].substr(0, _0x82b6x2b.split(";")[0].indexOf("="))] = _0x82b6x2b.split(";")[0].substr(_0x82b6x2b.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x82b6x2c of Object.keys(lz_cookie)) {
        cookie += _0x82b6x2c + "=" + lz_cookie[_0x82b6x2c] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = `${"jdapp;iPhone;10.0.10;14.3;"}${randomString(40)}${";network/wifi;model/iPhone12,1;addressid/3364463029;appBuild/167764;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"}`;
}
function randomString(_0x82b6xf) {
  _0x82b6xf = _0x82b6xf || 32;
  let _0x82b6x2f = "abcdef0123456789",
    _0x82b6x30 = _0x82b6x2f.length,
    _0x82b6x31 = "";
  for (i = 0; i < _0x82b6xf; i++) {
    _0x82b6x31 += _0x82b6x2f.charAt(Math.floor(Math.random() * _0x82b6x30));
  }
  return _0x82b6x31;
}
function TotalBean() {
  return new Promise(async _0x82b6x20 => {
    const _0x82b6x33 = {
      "url": `${"https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2"}`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    };
    $.post(_0x82b6x33, (_0x82b6x21, _0x82b6x22, _0x82b6x23) => {
      try {
        if (_0x82b6x21) {
          console.log(`${""}${JSON.stringify(_0x82b6x21)}${""}`);
          console.log(`${""}${$.name}${" API请求失败，请检查网路重试"}`);
        } else {
          if (_0x82b6x23) {
            _0x82b6x23 = JSON.parse(_0x82b6x23);
            if (_0x82b6x23.retcode === 13) {
              $.isLogin = false;
              return;
            }
            if (_0x82b6x23.retcode === 0) {
              $.nickName = _0x82b6x23.base && _0x82b6x23.base.nickname || $.UserName;
            } else {
              $.nickName = $.UserName;
            }
          } else {
            console.log(`${"京东服务器返回空数据"}`);
          }
        }
      } catch (e) {
        $.logErr(e, _0x82b6x22);
      } finally {
        _0x82b6x20();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x82b6x20 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x82b6x35 = `${""}`;
    if ($.shopactivityId) {
      _0x82b6x35 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0x82b6x36 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0x82b6x35}${",\"channel\":406}"}`;
    const _0x82b6x37 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x82b6x36)
    };
    const _0x82b6x38 = await getH5st("8adfb", _0x82b6x37);
    const _0x82b6x33 = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0x82b6x36}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x82b6x38)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x82b6x33, async (_0x82b6x21, _0x82b6x22, _0x82b6x23) => {
      try {
        _0x82b6x23 = _0x82b6x23 && _0x82b6x23.match(/jsonp_.*?\((.*?)\);/) && _0x82b6x23.match(/jsonp_.*?\((.*?)\);/)[1] || _0x82b6x23;
        let _0x82b6x39 = $.toObj(_0x82b6x23, _0x82b6x23);
        if (_0x82b6x39 && typeof _0x82b6x39 == "object") {
          if (_0x82b6x39 && _0x82b6x39.success === true) {
            console.log(`${" >> "}${_0x82b6x39.message}${""}`);
            $.errorJoinShop = _0x82b6x39.message;
            if (_0x82b6x39.result && _0x82b6x39.result.giftInfo) {
              for (let _0x82b6x10 of _0x82b6x39.result.giftInfo.giftList) {
                console.log(`${" >> 入会获得："}${_0x82b6x10.discountString}${""}${_0x82b6x10.prizeName}${""}${_0x82b6x10.secondLineDesc}${""}`);
              }
            }
          } else {
            if (_0x82b6x39 && typeof _0x82b6x39 == "object" && _0x82b6x39.message) {
              $.errorJoinShop = _0x82b6x39.message;
              console.log(`${""}${_0x82b6x39.message || ""}${""}`);
            } else {
              console.log(_0x82b6x23);
            }
          }
        } else {
          console.log(_0x82b6x23);
        }
      } catch (e) {
        $.logErr(e, _0x82b6x22);
      } finally {
        _0x82b6x20();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x82b6x20 => {
    const _0x82b6x36 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":406,\"payUpShop\":true}"}`;
    const _0x82b6x37 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x82b6x36)
    };
    const _0x82b6x38 = await getH5st("8adfb", _0x82b6x37);
    const _0x82b6x33 = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body="}${_0x82b6x36}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x82b6x38)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x82b6x33, async (_0x82b6x21, _0x82b6x22, _0x82b6x23) => {
      try {
        _0x82b6x23 = _0x82b6x23 && _0x82b6x23.match(/jsonp_.*?\((.*?)\);/) && _0x82b6x23.match(/jsonp_.*?\((.*?)\);/)[1] || _0x82b6x23;
        let _0x82b6x39 = $.toObj(_0x82b6x23, _0x82b6x23);
        if (_0x82b6x39 && typeof _0x82b6x39 == "object") {
          if (_0x82b6x39 && _0x82b6x39.success == true) {
            console.log(`${"去加入："}${_0x82b6x39.result.shopMemberCardInfo.venderCardName || ""}${" ("}${$.joinVenderId}${")"}`);
            $.shopactivityId = _0x82b6x39.result.interestsRuleList && _0x82b6x39.result.interestsRuleList[0] && _0x82b6x39.result.interestsRuleList[0].interestsInfo && _0x82b6x39.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(_0x82b6x23);
        }
      } catch (e) {
        $.logErr(e, _0x82b6x22);
      } finally {
        _0x82b6x20();
      }
    });
  });
}
function getH5st(_0x82b6x3c, _0x82b6x37) {
  return new Promise(async _0x82b6x20 => {
    let _0x82b6x33 = {
      url: `${"http://api.kingran.cf/h5st"}`,
      body: `${"businessId="}${_0x82b6x3c}${"&req="}${encodeURIComponent(JSON.stringify(_0x82b6x37))}${""}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    };
    $.post(_0x82b6x33, (_0x82b6x21, _0x82b6x22, _0x82b6x23) => {
      try {
        if (_0x82b6x21) {
          console.log(JSON.stringify(_0x82b6x21));
          console.log(`${""}${$.name}${" getSign API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x82b6x22);
      } finally {
        _0x82b6x20(_0x82b6x23);
      }
    });
  });
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x82b6x3e = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x82b6x3e.join("&") + "\n");
  let _0x82b6x3f = _0x82b6x3e;
  let _0x82b6x40 = [];
  let _0x82b6x41 = false;
  for (let _0x82b6x10 = 0; _0x82b6x10 < cookiesArr.length; _0x82b6x10++) {
    let _0x82b6x42 = decodeURIComponent(cookiesArr[_0x82b6x10].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x82b6x10].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x82b6x42) {
      break;
    }
    let _0x82b6x43 = false;
    for (let _0x82b6x31 of _0x82b6x3f) {
      if (_0x82b6x31 && _0x82b6x31 == _0x82b6x42) {
        _0x82b6x43 = true;
        break;
      }
    }
    if (!_0x82b6x43) {
      _0x82b6x41 = true;
      _0x82b6x40.splice(_0x82b6x10, -1, cookiesArr[_0x82b6x10]);
    }
  }
  if (_0x82b6x41) {
    cookiesArr = _0x82b6x40;
  }
}
function toFirst(_0x82b6x40, _0x82b6x45) {
  if (_0x82b6x45 != 0) {
    _0x82b6x40.unshift(_0x82b6x40.splice(_0x82b6x45, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x82b6x3e = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x82b6x3e.join("&") + "\n");
  let _0x82b6x40 = [];
  let _0x82b6x47 = _0x82b6x3e;
  for (let _0x82b6x10 in cookiesArr) {
    let _0x82b6x42 = decodeURIComponent(cookiesArr[_0x82b6x10].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x82b6x10].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x82b6x47.includes(_0x82b6x42)) {
      _0x82b6x40.push(cookiesArr[_0x82b6x10]);
    }
  }
  helpCookiesArr = _0x82b6x40;
  if (_0x82b6x47.length > 1) {
    for (let _0x82b6x31 in _0x82b6x47) {
      let _0x82b6x48 = _0x82b6x47[_0x82b6x47.length - 1 - _0x82b6x31];
      if (!_0x82b6x48) {
        continue;
      }
      for (let _0x82b6x10 in helpCookiesArr) {
        let _0x82b6x42 = decodeURIComponent(helpCookiesArr[_0x82b6x10].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x82b6x10].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x82b6x48 == _0x82b6x42) {
          toFirst(helpCookiesArr, _0x82b6x10);
        }
      }
    }
  }
}
	