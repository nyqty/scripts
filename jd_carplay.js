/*
头文字J

任务，助力，游戏

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

变量：CAR_COOKIE_NUM 跑多少账号

cron:30 4,16 * * *
============Quantumultx===============
[task_local]
#头文字J
30 4,16 * * * jd_carplay.js, tag=头文字J, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env("头文字J");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x1f9ax5 => {
    cookiesArr.push(jdCookieNode[_0x1f9ax5]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x1f9ax5 => {
    return _0x1f9ax5.cookie;
  })].filter(_0x1f9ax5 => {
    return !!_0x1f9ax5;
  });
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "";
let helpCookieNum = 5;
if (process.env.CAR_COOKIE_NUM && process.env.CAR_COOKIE_NUM != 5) {
  helpCookieNum = process.env.CAR_COOKIE_NUM;
}
let shareUuidArr = ["vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf", "F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "il64pE7v1zdguoOwD5otHV4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "KRksmsfoFlrgyw/oGOUnd14tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "jvJh7GpoGhm7fSlpWhSy3MjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD", "J/OEL8/ZMTbPczES9JZpjsjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD"];
let n = 0;
n = Math.floor(Math.random() * shareUuidArr.length);
let helpnum = shareUuidArr[n] ? shareUuidArr[n] : $.shareUuid;
!(async () => {
  console.log("\n请自行确认账号一是否黑号，黑号会全部助力当前助力");
  console.log("\n当前助力：" + helpnum);
  console.log("\n当前活动口令： 16:/(B3tU33OD5Ti) ，【鯨〤Dσδδng】参与头文字J，集能量兑换京豆");
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "21699045";
  $.userId = "10299171";
  $.actId = "1760007";
  $.MixNicks = "";
  $.inviteNick = helpnum;
  for (let _0x1f9axe = 0; _0x1f9axe < helpCookieNum; _0x1f9axe++) {
    cookie = cookiesArr[_0x1f9axe];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x1f9axe + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await getUa();
      await run();
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.outFlag) {
    let _0x1f9axf = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, `${""}`, `${""}${_0x1f9axf}${""}`);
    if ($.isNode()) {
      await notify.sendNotify(`${""}${$.name}${""}`, `${""}${_0x1f9axf}${""}`);
    }
  }
})().catch(_0x1f9axd => {
  return $.logErr(_0x1f9axd);
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
    $.MixNick = "";
    if ($.activityEnd) {
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await getToken();
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await takePostRequest("activity_load");
    if ($.hotFlag) {
      return;
    }
    if ($.MixNick == "") {
      console.log(`${"获取cookie失败"}`);
      return;
    }
    $.toBind = 0;
    await takePostRequest("绑定");
    await $.wait(500);
    await takePostRequest("shopList");
    console.log("\n【衰仔，开始刷任务中.....】\n");
    for (let _0x1f9axe = 0; _0x1f9axe < renwulists.length; _0x1f9axe++) {
      $.missionType = renwulists[_0x1f9axe].type;
      if (!renwulists[_0x1f9axe].isComplete) {
        switch ($.missionType) {
          case "bingCar":
          case "openCard":
          case "shareAct":
            break;
          case "viewCommodity":
            for (let _0x1f9axe = 0; _0x1f9axe < 3; _0x1f9axe++) {
              $.missionType = "viewCommodity";
              await takePostRequest("renwulist");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
            break;
          case "collectShop":
            for (let _0x1f9axe = 0; _0x1f9axe < 3; _0x1f9axe++) {
              await takePostRequest("getCusShop");
              $.missionType = "collectShop";
              await takePostRequest("关注");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
            break;
          case "addCart":
            if (process.env.carplay_addsku && process.env.carplay_addsku === "true") {
              for (let _0x1f9axe = 0; _0x1f9axe < 3; _0x1f9axe++) {
                await takePostRequest("getCusShopProduct");
                $.missionType = "addCart";
                await takePostRequest("加购");
                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              }
            } else {
              console.log(`${"默认不加购,请设置变量export carplay_addsku='true'做加购任务"}`);
            }
            break;
          default:
            await takePostRequest("renwulist");
            await $.wait(1000);
        }
      }
    }
    console.log("\n【衰仔，开始选择合适车辆中.....】\n");
    await takePostRequest("getCarInfo");
    for (let _0x1f9axe = carlist.length - 1; _0x1f9axe >= 0; _0x1f9axe--) {
      if (carlist[_0x1f9axe].isUnlock == true) {
        $.carName = carlist[_0x1f9axe].carName;
        $.carid = carlist[_0x1f9axe].id;
        break;
      }
    }
    console.log(`${"当前选择车辆："}${$.carName}${""}`);
    console.log("\n【衰仔，开始刷游戏中.....】\n");
    for (let _0x1f9axe = 0; _0x1f9axe < $.remainChance; _0x1f9axe++) {
      await takePostRequest("playGame");
      await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
      await takePostRequest("sendGameAward");
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    }
    await takePostRequest("助力");
    await $.wait(500);
    await takePostRequest("activity_load");
    console.log(`${"目前分值："}${$.totalPoint}${""}`);
    await takePostRequest("missionInviteList");
    console.log($.MixNick);
    console.log(`${"当前助力:"}${$.inviteNick}${""}`);
    if ($.index == 1) {
      $.inviteNick = $.MixNick;
      console.log(`${"后面的号都会助力:"}${$.inviteNick}${""}`);
    }
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
  } catch (e) {
    console.log(e);
  }
}
async function takePostRequest(_0x1f9ax13) {
  if ($.outFlag) {
    return;
  }
  let _0x1f9ax14 = "https://mpdz-car-dz.isvjcloud.com";
  let _0x1f9ax15 = `${""}`;
  let _0x1f9ax16 = "POST";
  let _0x1f9ax17 = "";
  switch (_0x1f9ax13) {
    case "isvObfuscator":
      url = `${"https://api.m.jd.com/client.action?functionId=isvObfuscator"}`;
      _0x1f9ax15 = `${"body=%7B%22url%22%3A%22https%3A%5C/%5C/mpdz-car-dz.isvjcloud.com%5C/jdbeverage%5C/pages%5C/paoku%5C/paoku?bizExtString%3Dc2hhcmVOaWNrOmsxTm9iYiUyQlAwZXIlMkJDMnN5c3hueCUyRlAyS0VMTzlpelJWcHdDeXF1MGVxVlo1YVc3Ukh6bE1vYnJ6SiUyRmU5ciUyRnVmJmhlYWRQaWNVcmw6aHR0cCUzQSUyRiUyRnN0b3JhZ2UuMzYwYnV5aW1nLmNvbSUyRmkuaW1hZ2VVcGxvYWQlMkY3MTM3MzUzNDM4MzczOTMxMzMzMzMxMzYzNDM0MzkzMjMxMzYzNTM5MzAzNTMzX21pZC5qcGcmbmlja05hbWU6JUU2JUFEJUEyJUU0JUJBJThFJUU0JUI5JThCJUU1JUJGJTgz%26sid%3D90ba17020afc534f5b45dec0247a92aw%26un_area%3D4_133_58530_0%22%2C%22id%22%3A%22%22%7D&build=168106&client=apple&clientVersion=11.0.4&d_brand=apple&d_model=iPhone9%2C2&ef=1&eid=QMVSKEWT77VAWK4HGCBDVYUU24PL45XVUKZLQVYD3EVIQU5NGL5JZQCG5UBOFKEB5NWSTOUMJXZ6UBHI3XZ7I5T6GVNVOGKHUM6XD27JRWUAYLKLURIA&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJS0CseyCtK4%22%2C%22area%22%3A%22DP8nCzDpDJq1CzLpCK%3D%3D%22%2C%22wifiBssid%22%3A%22CNZtEJKnCNC5EQHsCzuyZtG1YzuyZQG1CWVuDNC1YzC%3D%22%2C%22osVersion%22%3A%22CJCkDq%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%2C%22adid%22%3A%22EOCzDuVPEJujDzO1HI00HuVPBJqyENYjCOU3DUU5DUOmCNcn%22%2C%22openudid%22%3A%22DwOmZtK5EWYyD2HuEQPvEWS4DNK2CzPuYzc1YJKzYtS2Czq5ZJO5Yq%3D%3D%22%7D%2C%22ts%22%3A1655654228%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=126&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=31ca7162b0e02341d17b0110d8ebcad3&st=1655727885898&sv=112&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJwbhedhZ6rcCkWZYTLxOoljgDBW4uGvO15VAb0qmhiz62ezGh/XknCfMmiMjf%2B%2BWFIIlnUIPSu4UHiLi72gV6CoBTtRLM1Hwm30N1p3a%2BrIEmUFnpOdbRGomgBpnvs/RVkno8N0Cjx7Cn1u2WRfwp2/N6NB9n0KPt6DUaw2atUyUQbDjqz37GPQ%3D%3D"}`;
      break;
    case "activity_load":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/activity/load?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${"&push_way=1&user_id="}${$.userId}${""}`;
      _0x1f9ax17 = {
        "jdToken": $.Token,
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) {
        _0x1f9ax17 = {
          ..._0x1f9ax17,
          "shopId": `${""}${$.joinVenderId}${""}`
        };
      }
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/activity/load", _0x1f9ax17);
      break;
    case "shopList":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/mission/completeState?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {};
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/mission/completeState", _0x1f9ax17);
      break;
    case "绑定":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {
        "missionType": "shareAct",
        "inviterNick": $.inviteNick || ""
      };
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/mission/completeState", _0x1f9ax17);
      break;
    case "助力":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {
        "missionType": "shareAct",
        "inviterNick": $.inviteNick || "",
        "userId": 10299171
      };
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/mission/completeMission", _0x1f9ax17);
      break;
    case "关注":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {
        "missionType": $.missionType,
        "userId": 10299171,
        "shopId": $.userIds,
        "buyerNick": $.inviteNick || ""
      };
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/mission/completeMission", _0x1f9ax17);
      break;
    case "加购":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {
        "missionType": $.missionType,
        "userId": 10299171,
        "goodsNumId": $.goodsNumId,
        "buyerNick": $.inviteNick || ""
      };
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/mission/completeMission", _0x1f9ax17);
      break;
    case "getCusShop":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/cusShop/getCusShop?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {};
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/cusShop/getCusShop", _0x1f9ax17);
      break;
    case "getCusShopProduct":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/cusShop/getCusShopProduct?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {};
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/cusShop/getCusShop", _0x1f9ax17);
      break;
    case "getCarInfo":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/carInfo/getCarInfo?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {};
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/cusShop/getCusShop", _0x1f9ax17);
      break;
    case "renwulist":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {
        "actId": $.actId,
        "missionType": $.missionType
      };
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/mission/completeMission", _0x1f9ax17);
      break;
    case "playGame":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/game/playGame?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {
        "actId": $.actId,
        "carId": $.carid,
        "carName": $.carName,
        "userId": 10299171,
        "buyerNick": $.inviteNick || ""
      };
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/game/playGame", _0x1f9ax17);
      break;
    case "sendGameAward":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/game/sendGameAward?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      $.point = random(400, 600);
      _0x1f9ax17 = {
        "actId": $.actId,
        "point": $.point,
        "gameLogId": $.gameLogId,
        "userId": 10299171,
        "buyerNick": $.inviteNick || ""
      };
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/game/sendGameAward", _0x1f9ax17);
      break;
    case "missionInviteList":
      url = `${""}${_0x1f9ax14}${"/dm/front/jdCardRunning/customer/inviteList?open_id=&mix_nick="}${$.MixNick || $.MixNicks || ""}${""}`;
      _0x1f9ax17 = {
        "actId": $.actId,
        "userId": 10299171,
        "missionType": "shareAct",
        "inviteNum": 1,
        "buyerNick": $.MixNick || ""
      };
      _0x1f9ax15 = taskPostUrl("/jdCardRunning/customer/inviteList", _0x1f9ax17);
      break;
    default:
      console.log(`${"错误"}${_0x1f9ax13}${""}`);
  }
  let _0x1f9ax18 = getPostRequest(url, _0x1f9ax15, _0x1f9ax16);
  return new Promise(async _0x1f9ax19 => {
    $.post(_0x1f9ax18, (_0x1f9ax1a, _0x1f9ax1b, _0x1f9ax1c) => {
      try {
        if (_0x1f9ax1a) {
          if (_0x1f9ax1b && _0x1f9ax1b.statusCode && _0x1f9ax1b.statusCode == 493) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            $.outFlag = true;
          }
          console.log(`${""}${$.toStr(_0x1f9ax1a, _0x1f9ax1a)}${""}`);
          console.log(`${""}${_0x1f9ax13}${" API请求失败，请检查网路重试"}`);
        } else {
          dealReturn(_0x1f9ax13, _0x1f9ax1c);
        }
      } catch (e) {
        console.log(e, _0x1f9ax1b);
      } finally {
        _0x1f9ax19();
      }
    });
  });
}
async function dealReturn(_0x1f9ax13, _0x1f9ax1c) {
  let _0x1f9ax1e = "";
  try {
    if (_0x1f9ax13 != "accessLogWithAD" || _0x1f9ax13 != "drawContent") {
      if (_0x1f9ax1c) {
        _0x1f9ax1e = JSON.parse(_0x1f9ax1c);
      }
    }
  } catch (e) {
    console.log(`${""}${_0x1f9ax13}${" 执行任务异常"}`);
    console.log(_0x1f9ax1c);
    $.runFalag = false;
  }
  try {
    let _0x1f9ax1f = "";
    switch (_0x1f9ax13) {
      case "isvObfuscator":
        if (typeof _0x1f9ax1e == "object") {
          if (_0x1f9ax1e.errcode == 0) {
            if (typeof _0x1f9ax1e.token != "undefined") {
              $.Token = _0x1f9ax1e.token;
            }
          } else {
            if (_0x1f9ax1e.message) {
              console.log(`${""}${_0x1f9ax13}${" "}${_0x1f9ax1e.message || ""}${""}`);
            } else {
              console.log(_0x1f9ax1c);
            }
          }
        } else {
          console.log(_0x1f9ax1c);
        }
        break;
      case "getCusShop":
        if (typeof _0x1f9ax1e == "object") {
          if (_0x1f9ax1e.success && _0x1f9ax1e.success === true && _0x1f9ax1e.data) {
            if (_0x1f9ax1e.data.status && _0x1f9ax1e.data.status == 200) {
              $.userIds = _0x1f9ax1e.data.data.cusShop.userId;
            }
          } else {
            if (_0x1f9ax1e.message) {
              console.log(`${""}${_0x1f9ax13}${" "}${_0x1f9ax1e.message || ""}${""}`);
            } else {
              console.log(_0x1f9ax1c);
            }
          }
        } else {
          console.log(_0x1f9ax1c);
        }
        break;
      case "getCusShopProduct":
        if (typeof _0x1f9ax1e == "object") {
          if (_0x1f9ax1e.success && _0x1f9ax1e.success === true && _0x1f9ax1e.data) {
            if (_0x1f9ax1e.data.status && _0x1f9ax1e.data.status == 200) {
              $.goodsNumId = _0x1f9ax1e.data.data.cusShopProduct.numId;
            }
          } else {
            if (_0x1f9ax1e.message) {
              console.log(`${""}${_0x1f9ax13}${" "}${_0x1f9ax1e.message || ""}${""}`);
            } else {
              console.log(_0x1f9ax1c);
            }
          }
        } else {
          console.log(_0x1f9ax1c);
        }
        break;
      case "shopList":
        if (typeof _0x1f9ax1e == "object") {
          if (_0x1f9ax1e.success && _0x1f9ax1e.success === true && _0x1f9ax1e.data) {
            if (_0x1f9ax1e.data.status && _0x1f9ax1e.data.status == 200) {
              renwulists = _0x1f9ax1e.data.data || [];
            }
          } else {
            if (_0x1f9ax1e.message) {
              console.log(`${""}${_0x1f9ax13}${" "}${_0x1f9ax1e.message || ""}${""}`);
            } else {
              console.log(_0x1f9ax1c);
            }
          }
        } else {
          console.log(_0x1f9ax1c);
        }
        break;
      case "getCarInfo":
        if (typeof _0x1f9ax1e == "object") {
          if (_0x1f9ax1e.success && _0x1f9ax1e.success === true && _0x1f9ax1e.data) {
            if (_0x1f9ax1e.data.status && _0x1f9ax1e.data.status == 200) {
              carlist = _0x1f9ax1e.data.data || [];
            }
          } else {
            if (_0x1f9ax1e.message) {
              console.log(`${""}${_0x1f9ax13}${" "}${_0x1f9ax1e.message || ""}${""}`);
            } else {
              console.log(_0x1f9ax1c);
            }
          }
        } else {
          console.log(_0x1f9ax1c);
        }
        break;
      case "playGame":
        if (typeof _0x1f9ax1e == "object") {
          if (_0x1f9ax1e.success && _0x1f9ax1e.success === true && _0x1f9ax1e.data) {
            if (_0x1f9ax1e.data.status && _0x1f9ax1e.data.status == 200) {
              $.gameLogId = _0x1f9ax1e.data.data.gameLogId;
              console.log(`${"游戏ID： "}${$.gameLogId}${""}`);
            }
          } else {
            if (_0x1f9ax1e.message) {
              console.log(`${""}${_0x1f9ax13}${" "}${_0x1f9ax1e.message || ""}${""}`);
            } else {
              console.log(_0x1f9ax1c);
            }
          }
        } else {
          console.log(_0x1f9ax1c);
        }
        break;
      case "sendGameAward":
        if (typeof _0x1f9ax1e == "object") {
          if (_0x1f9ax1e.success && _0x1f9ax1e.data) {
            console.log(`${"太棒了，衰仔，游戏完成，当前分值："}${_0x1f9ax1e.data.data.totalPoint}${""}`);
          } else {
            if (_0x1f9ax1e.message) {
              console.log(`${""}${_0x1f9ax13}${" "}${_0x1f9ax1e.message || ""}${""}`);
            } else {
              console.log(_0x1f9ax1c);
            }
          }
        } else {
          console.log(_0x1f9ax1c);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      case "activity_load":
      case "mission":
      case "setMixNick":
      case "followShop":
      case "renwulist":
      case "addCart":
      case "myAward":
      case "missionInviteList":
      case "关注":
      case "加购":
      case "绑定":
      case "助力":
      case "specialSign":
        _0x1f9ax1f = "";
        if (_0x1f9ax13 == "followShop") {
          _0x1f9ax1f = "关注";
        }
        if (_0x1f9ax13 == "addCart") {
          _0x1f9ax1f = "加购";
        }
        if (typeof _0x1f9ax1e == "object") {
          if (_0x1f9ax1e.success && _0x1f9ax1e.success === true && _0x1f9ax1e.data) {
            if (_0x1f9ax1e.data.status && _0x1f9ax1e.data.status == 200) {
              _0x1f9ax1e = _0x1f9ax1e.data;
              if (_0x1f9ax13 != "setMixNick" && (_0x1f9ax1e.msg || _0x1f9ax1e.data.isOpenCard || _0x1f9ax1e.data.remark)) {
                console.log(`${""}${_0x1f9ax1f && _0x1f9ax1f + ":" || ""}${""}${_0x1f9ax1e.msg || _0x1f9ax1e.data.isOpenCard || _0x1f9ax1e.data.remark || ""}${""}`);
              }
              if (_0x1f9ax13 == "activity_load") {
                if (_0x1f9ax1e.data) {
                  $.endTime = _0x1f9ax1e.data.cusActivity.endTime || 0;
                  $.MixNick = _0x1f9ax1e.data.missionCustomer.buyerNick || "";
                  $.hasCollectShop = _0x1f9ax1e.data.missionCustomer.hasCollectShop || 0;
                  $.totalPoint = _0x1f9ax1e.data.missionCustomer.totalPoint || 0;
                  $.remainChance = _0x1f9ax1e.data.missionCustomer.remainChance || 0;
                }
              } else {
                if (_0x1f9ax13 == "shopList") {
                  $.openList = _0x1f9ax1e.data.cusShopList || [];
                  renwulists = _0x1f9ax1e.data.data || [];
                } else {
                  if (_0x1f9ax13 == "missionInviteList") {
                    console.log(`${"邀请人数("}${_0x1f9ax1e.data.total}${")"}`);
                  }
                }
              }
            } else {
              if (_0x1f9ax1e.data.msg) {
                if (_0x1f9ax1e.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                console.log(`${""}${_0x1f9ax1e.data.msg || ""}${""}`);
              } else {
                if (_0x1f9ax1e.errorMessage) {
                  if (_0x1f9ax1e.errorMessage.indexOf("火爆") > -1) {}
                  console.log(`${""}${_0x1f9ax1e.errorMessage || ""}${""}`);
                } else {
                  console.log(`${""}${_0x1f9ax1c}${""}`);
                }
              }
            }
          } else {
            if (_0x1f9ax1e.errorMessage) {
              console.log(`${""}${_0x1f9ax1e.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x1f9ax1c}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x1f9ax1c}${""}`);
        }
        break;
      default:
        console.log(`${""}${_0x1f9ax1c}${""}`);
    }
    if (typeof _0x1f9ax1e == "object") {
      if (_0x1f9ax1e.errorMessage) {
        if (_0x1f9ax1e.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (e) {}
}
function getPostRequest(_0x1f9ax21, _0x1f9ax15, _0x1f9ax16 = "POST") {
  let _0x1f9ax22 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x1f9ax21.indexOf("https://mpdz-car-dz.isvjcloud.com") > -1) {
    _0x1f9ax22.Origin = "https://mpdz-car-dz.isvjcloud.com";
    _0x1f9ax22.host = "mpdz-car-dz.isvjcloud.com";
    _0x1f9ax22["Content-Type"] = "application/json;charset=utf-8";
    delete _0x1f9ax22.Cookie;
  }
  return {
    url: _0x1f9ax21,
    method: _0x1f9ax16,
    headers: _0x1f9ax22,
    body: _0x1f9ax15,
    timeout: 60000
  };
}
async function getToken() {
  let _0x1f9ax25 = {
    url: `${"https://api.m.jd.com/client.action?functionId=isvObfuscator"}`,
    headers: {
      Host: "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
      Connection: "keep-alive",
      Cookie: cookie,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    body: `${""}${Signz}${""}`
  };
  return new Promise(_0x1f9ax19 => {
    $.post(_0x1f9ax25, (_0x1f9ax1a, _0x1f9ax1b, _0x1f9ax1c) => {
      try {
        if (_0x1f9ax1a) {
          $.log(_0x1f9ax1a);
        } else {
          if (_0x1f9ax1c) {
            _0x1f9ax1c = JSON.parse(_0x1f9ax1c);
            if (_0x1f9ax1c.code === "0") {
              $.Token = _0x1f9ax1c.token;
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (error) {
        $.log(error);
      } finally {
        _0x1f9ax19();
      }
    });
  });
}
function getSign(_0x1f9ax27, _0x1f9ax15) {
  let _0x1f9ax1c = {
    "fn": _0x1f9ax27,
    "body": JSON.stringify(_0x1f9ax15)
  };
  let _0x1f9ax28 = {
    "url": "https://api.nolanstore.top/sign",
    "body": JSON.stringify(_0x1f9ax1c),
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 30000
  };
  return new Promise(async _0x1f9ax19 => {
    $.post(_0x1f9ax28, (_0x1f9ax1a, _0x1f9ax1b, _0x1f9ax1c) => {
      try {
        if (_0x1f9ax1a) {
          console.log("" + JSON.stringify(_0x1f9ax1a));
          console.log($.name + " getSign API请求失败，请检查网路重试");
        } else {
          _0x1f9ax1c = JSON.parse(_0x1f9ax1c);
          if (typeof _0x1f9ax1c === "object" && _0x1f9ax1c && _0x1f9ax1c.body) {
            if (_0x1f9ax1c.body) {
              Signz = _0x1f9ax1c.body || "";
            }
          } else {
            console.log("获取服务失败~~");
          }
        }
      } catch (e) {
        $.logErr(e, _0x1f9ax1b);
      } finally {
        _0x1f9ax19(_0x1f9ax1c);
      }
    });
  });
}
function taskPostUrl(_0x1f9ax21, _0x1f9ax2a) {
  d = {
    actId: $.actId,
    ..._0x1f9ax2a,
    "method": _0x1f9ax21,
    userId: $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const _0x1f9ax2b = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "sign": sign2.sign,
        "timestamp": sign2.timeStamp,
        userId: $.userId
      },
      "admJson": {
        actId: $.actId,
        ..._0x1f9ax2a,
        "method": _0x1f9ax21,
        userId: $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  if (_0x1f9ax21.indexOf("missionInviteList") > -1) {
    delete _0x1f9ax2b.params.admJson.actId;
  }
  return $.toStr(_0x1f9ax2b, _0x1f9ax2b);
}
function random(_0x1f9ax2d, _0x1f9ax2e) {
  return Math.floor(Math.random() * (_0x1f9ax2e - _0x1f9ax2d)) + _0x1f9ax2d;
}
function mpdzSign(_0x1f9ax30) {
  AppSecret = "85623312044258464325227666883546";
  key = 25747717;
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(_0x1f9ax30));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = key + "appKey" + key + "admJson" + s2 + "timestamp" + time2 + AppSecret;
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    sign,
    timeStamp: time2
  };
}
async function getUa() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const _0x1f9ax32 = CryptoJS.enc.Utf8.parse(id);
  const _0x1f9ax33 = CryptoJS.enc.Base64.stringify(_0x1f9ax32);
  ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": _0x1f9ax33,
      "od": "",
      "ov": "Ctq=",
      "ud": _0x1f9ax33
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  }));
  return `${"jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/"}${ep}${";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36"}`;
}
function jsonParse(_0x1f9ax35) {
  if (typeof _0x1f9ax35 == "string") {
    try {
      return JSON.parse(_0x1f9ax35);
    } catch (e) {
      console.log(e);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}