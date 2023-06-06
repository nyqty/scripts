/*
头文字J

任务，助力，游戏

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

定时自行选择，不要跑太多账号，不要跑太多账号，不要跑太多账号

会永久黑IP，如果运行就提示 此ip已被限制，请过10分钟后再执行脚本  只能更换IP

变量：CAR_COOKIE_NUM 跑多少账号

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#头文字J
1 1 1 1 * jd_car_play.js, tag=头文字J, enabled=true
*/
const $ = new Env("头文字J");
const _0x51275f = $.isNode() ? require("./jdCookie.js") : "",
  _0x44b5f4 = $.isNode() ? require("./sendNotify") : "",
  _0xb7dee5 = require("./function/krgetToken");
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let _0x4b4c29 = [],
  _0x3b4165 = "";
if ($.isNode()) {
  Object.keys(_0x51275f).forEach(_0x1f86c0 => {
    _0x4b4c29.push(_0x51275f[_0x1f86c0]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x4b4c29 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x2dddfb($.getdata("CookiesJD") || "[]").map(_0x188461 => _0x188461.cookie)].filter(_0x1a87aa => !!_0x1a87aa);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let _0x5d9d54 = "",
  _0x5871cc = 5,
  _0x3e24f4 = "";
process.env.CAR_COOKIE_NUM && process.env.CAR_COOKIE_NUM != 5 && (_0x5871cc = process.env.CAR_COOKIE_NUM);
!(async () => {
  authorCodeList = [];
  $.authorCode = _0x3e24f4 ? _0x3e24f4 : authorCodeList[_0xacb228(0, authorCodeList.length)];
  console.log("\n请自行确认账号一是否黑号，黑号会全部助力当前助力");
  if (!_0x4b4c29[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "21699045";
  $.userId = "10299171";
  $.actId = "1760007";
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let _0x323ca4 = 0; _0x323ca4 < _0x5871cc; _0x323ca4++) {
    _0x3b4165 = _0x4b4c29[_0x323ca4];
    if (_0x3b4165) {
      $.UserName = decodeURIComponent(_0x3b4165.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3b4165.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x323ca4 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await _0x1f2b9b();
      await _0x3160ec();
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let _0x4b1d6e = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x4b1d6e);
    if ($.isNode()) await _0x44b5f4.sendNotify("" + $.name, "" + _0x4b1d6e);
  }
})().catch(_0x115ccf => $.logErr(_0x115ccf)).finally(() => $.done());
async function _0x3160ec() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    _0x5d9d54 = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await _0xb7dee5(_0x3b4165, "https://mpdz-car-dz.isvjcloud.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await _0x251d1a("activity_load");
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("获取活动信息失败，可能是黑号");
      return;
    }
    $.toBind = 0;
    await _0x251d1a("绑定");
    await $.wait(500);
    await _0x251d1a("shopList");
    console.log("\n【衰仔，开始刷任务中.....】\n");
    for (let _0x45f078 = 0; _0x45f078 < renwulists.length; _0x45f078++) {
      $.missionType = renwulists[_0x45f078].type;
      if (!renwulists[_0x45f078].isComplete) switch ($.missionType) {
        case "bingCar":
        case "openCard":
        case "shareAct":
          break;
        case "viewCommodity":
          for (let _0x127faa = 0; _0x127faa < 3; _0x127faa++) {
            $.missionType = "viewCommodity";
            await _0x251d1a("renwulist");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
          break;
        case "collectShop":
          for (let _0x266a26 = 0; _0x266a26 < 3; _0x266a26++) {
            await _0x251d1a("getCusShop");
            $.missionType = "collectShop";
            await _0x251d1a("关注");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
          break;
        case "addCart":
          if (process.env.carplay_addsku && process.env.carplay_addsku === "true") for (let _0x5c5a11 = 0; _0x5c5a11 < 3; _0x5c5a11++) {
            await _0x251d1a("getCusShopProduct");
            $.missionType = "addCart";
            await _0x251d1a("加购");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          } else console.log("默认不加购,请设置变量export carplay_addsku='true'做加购任务");
          break;
        default:
          await _0x251d1a("renwulist");
          await $.wait(1000);
      }
    }
    console.log("\n【衰仔，开始选择合适车辆中.....】\n");
    await _0x251d1a("getCarInfo");
    for (let _0x34e7e6 = carlist.length - 1; _0x34e7e6 >= 0; _0x34e7e6--) {
      if (carlist[_0x34e7e6].isUnlock == true) {
        $.carName = carlist[_0x34e7e6].carName;
        $.carid = carlist[_0x34e7e6].id;
        break;
      }
    }
    console.log("当前选择车辆：" + $.carName);
    console.log("\n【衰仔，开始刷游戏中.....】\n");
    for (let _0x2f79de = 0; _0x2f79de < $.remainChance; _0x2f79de++) {
      await _0x251d1a("playGame");
      await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
      await _0x251d1a("sendGameAward");
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    }
    await _0x251d1a("助力");
    await $.wait(500);
    await _0x251d1a("activity_load");
    console.log("目前分值：" + $.remainPoint);
    await _0x251d1a("missionInviteList");
    console.log("当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("后面的号都会助力:" + $.inviteNick));
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
  } catch (_0x499363) {
    console.log(_0x499363);
  }
}
async function _0x251d1a(_0x5f5b27) {
  if ($.outFlag) return;
  let _0x50b582 = "https://mpdz-car-dz.isvjcloud.com",
    _0xb168ea = "",
    _0x5352ee = "POST",
    _0x1fe23b = "";
  switch (_0x5f5b27) {
    case "isvObfuscator":
      url = "https://api.m.jd.com/client.action?functionId=isvObfuscator";
      _0xb168ea = "body=%7B%22url%22%3A%22https%3A%5C/%5C/mpdz-car-dz.isvjcloud.com%5C/jdbeverage%5C/pages%5C/paoku%5C/paoku?bizExtString%3Dc2hhcmVOaWNrOmsxTm9iYiUyQlAwZXIlMkJDMnN5c3hueCUyRlAyS0VMTzlpelJWcHdDeXF1MGVxVlo1YVc3Ukh6bE1vYnJ6SiUyRmU5ciUyRnVmJmhlYWRQaWNVcmw6aHR0cCUzQSUyRiUyRnN0b3JhZ2UuMzYwYnV5aW1nLmNvbSUyRmkuaW1hZ2VVcGxvYWQlMkY3MTM3MzUzNDM4MzczOTMxMzMzMzMxMzYzNDM0MzkzMjMxMzYzNTM5MzAzNTMzX21pZC5qcGcmbmlja05hbWU6JUU2JUFEJUEyJUU0JUJBJThFJUU0JUI5JThCJUU1JUJGJTgz%26sid%3D90ba17020afc534f5b45dec0247a92aw%26un_area%3D4_133_58530_0%22%2C%22id%22%3A%22%22%7D&build=168106&client=apple&clientVersion=11.0.4&d_brand=apple&d_model=iPhone9%2C2&ef=1&eid=QMVSKEWT77VAWK4HGCBDVYUU24PL45XVUKZLQVYD3EVIQU5NGL5JZQCG5UBOFKEB5NWSTOUMJXZ6UBHI3XZ7I5T6GVNVOGKHUM6XD27JRWUAYLKLURIA&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJS0CseyCtK4%22%2C%22area%22%3A%22DP8nCzDpDJq1CzLpCK%3D%3D%22%2C%22wifiBssid%22%3A%22CNZtEJKnCNC5EQHsCzuyZtG1YzuyZQG1CWVuDNC1YzC%3D%22%2C%22osVersion%22%3A%22CJCkDq%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%2C%22adid%22%3A%22EOCzDuVPEJujDzO1HI00HuVPBJqyENYjCOU3DUU5DUOmCNcn%22%2C%22openudid%22%3A%22DwOmZtK5EWYyD2HuEQPvEWS4DNK2CzPuYzc1YJKzYtS2Czq5ZJO5Yq%3D%3D%22%7D%2C%22ts%22%3A1655654228%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=126&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=31ca7162b0e02341d17b0110d8ebcad3&st=1655727885898&sv=112&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJwbhedhZ6rcCkWZYTLxOoljgDBW4uGvO15VAb0qmhiz62ezGh/XknCfMmiMjf%2B%2BWFIIlnUIPSu4UHiLi72gV6CoBTtRLM1Hwm30N1p3a%2BrIEmUFnpOdbRGomgBpnvs/RVkno8N0Cjx7Cn1u2WRfwp2/N6NB9n0KPt6DUaw2atUyUQbDjqz37GPQ%3D%3D";
      break;
    case "activity_load":
      url = _0x50b582 + "/dm/front/jdCardRunning/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&push_way=1&user_id=" + $.userId;
      _0x1fe23b = {
        "jdToken": $.Token,
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) _0x1fe23b = {
        ..._0x1fe23b,
        "shopId": "" + $.joinVenderId
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/activity/load", _0x1fe23b);
      break;
    case "shopList":
      url = _0x50b582 + "/dm/front/jdCardRunning/mission/completeState?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {};
      _0xb168ea = _0x4da2d0("/jdCardRunning/mission/completeState", _0x1fe23b);
      break;
    case "绑定":
      url = _0x50b582 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {
        "missionType": "shareAct",
        "inviterNick": $.inviteNick || ""
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/mission/completeState", _0x1fe23b);
      break;
    case "助力":
      url = _0x50b582 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {
        "missionType": "shareAct",
        "inviterNick": $.inviteNick || "",
        "userId": 10299171
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/mission/completeMission", _0x1fe23b);
      break;
    case "关注":
      url = _0x50b582 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {
        "missionType": $.missionType,
        "userId": 10299171,
        "shopId": $.userIds,
        "buyerNick": $.inviteNick || ""
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/mission/completeMission", _0x1fe23b);
      break;
    case "加购":
      url = _0x50b582 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {
        "missionType": $.missionType,
        "userId": 10299171,
        "goodsNumId": $.goodsNumId,
        "buyerNick": $.inviteNick || ""
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/mission/completeMission", _0x1fe23b);
      break;
    case "getCusShop":
      url = _0x50b582 + "/dm/front/jdCardRunning/cusShop/getCusShop?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {};
      _0xb168ea = _0x4da2d0("/jdCardRunning/cusShop/getCusShop", _0x1fe23b);
      break;
    case "getCusShopProduct":
      url = _0x50b582 + "/dm/front/jdCardRunning/cusShop/getCusShopProduct?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {};
      _0xb168ea = _0x4da2d0("/jdCardRunning/cusShop/getCusShop", _0x1fe23b);
      break;
    case "getCarInfo":
      url = _0x50b582 + "/dm/front/jdCardRunning/carInfo/getCarInfo?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {};
      _0xb168ea = _0x4da2d0("/jdCardRunning/cusShop/getCusShop", _0x1fe23b);
      break;
    case "renwulist":
      url = _0x50b582 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {
        "actId": $.actId,
        "missionType": $.missionType
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/mission/completeMission", _0x1fe23b);
      break;
    case "playGame":
      url = _0x50b582 + "/dm/front/jdCardRunning/game/playGame?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {
        "actId": $.actId,
        "carId": $.carid,
        "carName": $.carName,
        "userId": 10299171,
        "buyerNick": $.inviteNick || ""
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/game/playGame", _0x1fe23b);
      break;
    case "sendGameAward":
      url = _0x50b582 + "/dm/front/jdCardRunning/game/sendGameAward?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      $.point = _0xacb228(400, 600);
      _0x1fe23b = {
        "actId": $.actId,
        "point": $.point,
        "gameLogId": $.gameLogId,
        "userId": 10299171,
        "buyerNick": $.inviteNick || ""
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/game/sendGameAward", _0x1fe23b);
      break;
    case "missionInviteList":
      url = _0x50b582 + "/dm/front/jdCardRunning/customer/inviteList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x1fe23b = {
        "actId": $.actId,
        "userId": 10299171,
        "missionType": "shareAct",
        "inviteNum": 1,
        "buyerNick": $.MixNick || ""
      };
      _0xb168ea = _0x4da2d0("/jdCardRunning/customer/inviteList", _0x1fe23b);
      break;
    default:
      console.log("错误" + _0x5f5b27);
  }
  let _0x3a3531 = _0x35d91d(url, _0xb168ea, _0x5352ee);
  return new Promise(async _0xd442c3 => {
    $.post(_0x3a3531, (_0x3c9cd7, _0x7f3197, _0x5ca674) => {
      try {
        _0x3c9cd7 ? (_0x7f3197 && _0x7f3197.statusCode && _0x7f3197.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(_0x3c9cd7, _0x3c9cd7)), console.log(_0x5f5b27 + " API请求失败，请检查网路重试")) : _0x1a6db0(_0x5f5b27, _0x5ca674);
      } catch (_0x5e7373) {
        console.log(_0x5e7373, _0x7f3197);
      } finally {
        _0xd442c3();
      }
    });
  });
}
async function _0x1a6db0(_0x1a16a2, _0x5d9546) {
  let _0xc6cb86 = "";
  try {
    if (_0x1a16a2 != "accessLogWithAD" || _0x1a16a2 != "drawContent") {
      _0x5d9546 && (_0xc6cb86 = JSON.parse(_0x5d9546));
    }
  } catch (_0x169459) {
    console.log(_0x1a16a2 + " 执行任务异常");
    console.log(_0x5d9546);
    $.runFalag = false;
  }
  try {
    let _0x430e98 = "";
    switch (_0x1a16a2) {
      case "isvObfuscator":
        if (typeof _0xc6cb86 == "object") {
          if (_0xc6cb86.errcode == 0) {
            if (typeof _0xc6cb86.token != "undefined") $.Token = _0xc6cb86.token;
          } else _0xc6cb86.message ? console.log(_0x1a16a2 + " " + (_0xc6cb86.message || "")) : console.log(_0x5d9546);
        } else console.log(_0x5d9546);
        break;
      case "getCusShop":
        if (typeof _0xc6cb86 == "object") {
          if (_0xc6cb86.success && _0xc6cb86.success === true && _0xc6cb86.data) {
            if (_0xc6cb86.data.status && _0xc6cb86.data.status == 200) {
              $.userIds = _0xc6cb86.data.data.cusShop.userId;
            }
          } else _0xc6cb86.message ? console.log(_0x1a16a2 + " " + (_0xc6cb86.message || "")) : console.log(_0x5d9546);
        } else console.log(_0x5d9546);
        break;
      case "getCusShopProduct":
        if (typeof _0xc6cb86 == "object") {
          if (_0xc6cb86.success && _0xc6cb86.success === true && _0xc6cb86.data) _0xc6cb86.data.status && _0xc6cb86.data.status == 200 && ($.goodsNumId = _0xc6cb86.data.data.cusShopProduct.numId);else _0xc6cb86.message ? console.log(_0x1a16a2 + " " + (_0xc6cb86.message || "")) : console.log(_0x5d9546);
        } else console.log(_0x5d9546);
        break;
      case "shopList":
        if (typeof _0xc6cb86 == "object") {
          if (_0xc6cb86.success && _0xc6cb86.success === true && _0xc6cb86.data) _0xc6cb86.data.status && _0xc6cb86.data.status == 200 && (renwulists = _0xc6cb86.data.data || []);else _0xc6cb86.message ? console.log(_0x1a16a2 + " " + (_0xc6cb86.message || "")) : console.log(_0x5d9546);
        } else console.log(_0x5d9546);
        break;
      case "getCarInfo":
        if (typeof _0xc6cb86 == "object") {
          if (_0xc6cb86.success && _0xc6cb86.success === true && _0xc6cb86.data) _0xc6cb86.data.status && _0xc6cb86.data.status == 200 && (carlist = _0xc6cb86.data.data || []);else _0xc6cb86.message ? console.log(_0x1a16a2 + " " + (_0xc6cb86.message || "")) : console.log(_0x5d9546);
        } else console.log(_0x5d9546);
        break;
      case "playGame":
        if (typeof _0xc6cb86 == "object") {
          if (_0xc6cb86.success && _0xc6cb86.success === true && _0xc6cb86.data) _0xc6cb86.data.status && _0xc6cb86.data.status == 200 && ($.gameLogId = _0xc6cb86.data.data.gameLogId, console.log("游戏ID： " + $.gameLogId));else _0xc6cb86.message ? console.log(_0x1a16a2 + " " + (_0xc6cb86.message || "")) : console.log(_0x5d9546);
        } else console.log(_0x5d9546);
        break;
      case "sendGameAward":
        if (typeof _0xc6cb86 == "object") {
          if (_0xc6cb86.success && _0xc6cb86.data) console.log("太棒了，衰仔，游戏完成");else _0xc6cb86.message ? console.log(_0x1a16a2 + " " + (_0xc6cb86.message || "")) : console.log(_0x5d9546);
        } else console.log(_0x5d9546);
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
        _0x430e98 = "";
        if (_0x1a16a2 == "followShop") _0x430e98 = "关注";
        if (_0x1a16a2 == "addCart") _0x430e98 = "加购";
        if (typeof _0xc6cb86 == "object") {
          if (_0xc6cb86.success && _0xc6cb86.success === true && _0xc6cb86.data) {
            if (_0xc6cb86.data.status && _0xc6cb86.data.status == 200) {
              _0xc6cb86 = _0xc6cb86.data;
              if (_0x1a16a2 != "setMixNick" && (_0xc6cb86.msg || _0xc6cb86.data.isOpenCard || _0xc6cb86.data.remark)) console.log("" + (_0x430e98 && _0x430e98 + ":" || "") + (_0xc6cb86.msg || _0xc6cb86.data.isOpenCard || _0xc6cb86.data.remark || ""));
              if (_0x1a16a2 == "activity_load") {
                if (_0xc6cb86.data) {
                  $.endTime = _0xc6cb86.data.cusActivity.endTime || 0;
                  $.MixNick = _0xc6cb86.data.missionCustomer.buyerNick || "";
                  $.hasCollectShop = _0xc6cb86.data.missionCustomer.hasCollectShop || 0;
                  $.totalPoint = _0xc6cb86.data.missionCustomer.totalPoint || 0;
                  $.remainPoint = _0xc6cb86.data.missionCustomer.remainPoint || 0;
                  $.remainChance = _0xc6cb86.data.missionCustomer.remainChance || 0;
                }
              } else {
                if (_0x1a16a2 == "shopList") {
                  $.openList = _0xc6cb86.data.cusShopList || [];
                  renwulists = _0xc6cb86.data.data || [];
                } else _0x1a16a2 == "missionInviteList" && console.log("邀请人数(" + _0xc6cb86.data.total + ")");
              }
            } else {
              if (_0xc6cb86.data.msg) {
                if (_0xc6cb86.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                console.log("" + (_0xc6cb86.data.msg || ""));
              } else {
                if (_0xc6cb86.errorMessage) {
                  if (_0xc6cb86.errorMessage.indexOf("火爆") > -1) {}
                  console.log("" + (_0xc6cb86.errorMessage || ""));
                } else console.log("" + _0x5d9546);
              }
            }
          } else _0xc6cb86.errorMessage ? console.log("" + (_0xc6cb86.errorMessage || "")) : console.log("" + _0x5d9546);
        } else console.log("" + _0x5d9546);
        break;
      default:
        console.log("" + _0x5d9546);
    }
    if (typeof _0xc6cb86 == "object") {
      if (_0xc6cb86.errorMessage) {
        if (_0xc6cb86.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (_0x410611) {}
}
function _0x35d91d(_0x2d6cc4, _0x7654ed, _0x152da7 = "POST") {
  let _0xc07daa = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": _0x3b4165,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x2d6cc4.indexOf("https://mpdz-car-dz.isvjcloud.com") > -1 && (_0xc07daa.Origin = "https://mpdz-car-dz.isvjcloud.com", _0xc07daa.host = "mpdz-car-dz.isvjcloud.com", _0xc07daa["Content-Type"] = "application/json;charset=utf-8", delete _0xc07daa.Cookie), {
    "url": _0x2d6cc4,
    "method": _0x152da7,
    "headers": _0xc07daa,
    "body": _0x7654ed,
    "timeout": 60000
  };
}
function _0x4da2d0(_0x1d71e2, _0x2689c8) {
  d = {
    "actId": $.actId,
    ..._0x2689c8,
    "method": _0x1d71e2,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = _0x1b5342(d);
  const _0x44a62a = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "sign": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ..._0x2689c8,
        "method": _0x1d71e2,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return _0x1d71e2.indexOf("missionInviteList") > -1 && delete _0x44a62a.params.admJson.actId, $.toStr(_0x44a62a, _0x44a62a);
}
function _0x36a8e6(_0x3981a5) {
  return new Promise(_0x55dc27 => {
    const _0x28f9c1 = {
      "url": _0x3981a5 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x28f9c1, async (_0x20af96, _0x17e309, _0x108160) => {
      try {
        if (_0x20af96) $.getAuthorCodeListerr = false;else {
          if (_0x108160) _0x108160 = JSON.parse(_0x108160);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x256a61) {
        $.logErr(_0x256a61, _0x17e309);
        _0x108160 = null;
      } finally {
        _0x55dc27(_0x108160);
      }
    });
  });
}
function _0xacb228(_0x2e791e, _0x15bf3e) {
  return Math.floor(Math.random() * (_0x15bf3e - _0x2e791e)) + _0x2e791e;
}
function _0x1b5342(_0x114b65) {
  AppSecret = "85623312044258464325227666883546";
  key = 25747717;
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(_0x114b65));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = "k9mbrALjx4pLq5sgpO" + s2 + "z" + time2 + "xgwky6n09be8ih0x63s9i5zwdfdmou00";
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    "sign": sign,
    "timeStamp": time2
  };
}
async function _0x1f2b9b() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const _0x159920 = CryptoJS.enc.Utf8.parse(id),
    _0x3a3ecf = CryptoJS.enc.Base64.stringify(_0x159920);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": _0x3a3ecf,
      "od": "",
      "ov": "Ctq=",
      "ud": _0x3a3ecf
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function _0x2dddfb(_0x2b6662) {
  if (typeof _0x2b6662 == "string") try {
    return JSON.parse(_0x2b6662);
  } catch (_0x4bb723) {
    return console.log(_0x4bb723), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }