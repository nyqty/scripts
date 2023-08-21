/*
大牌联合0820期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC202308020dda/oC202308020dda?actId=1802015a6a374ce186ea9a4_230820

自行运行，有水无水自测。

变量填写：
黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 
重试次数，默认30
//export retrynum="30"
如需修改抽奖次数请设置环境变量：
//export opencard_draw="3" //次数
填地址变量看库说明

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码
============Quantumultx===============
[task_local]
#大牌联合0820期
1 1 1 1 * jd_dplh0820.js, tag=大牌联合0820期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0820期");
const _0x1c141c = $.isNode() ? require("./jdCookie.js") : "",
  _0x3a63a6 = $.isNode() ? require("./sendNotify") : "";
let _0x597d4f = [],
  _0x174d21 = "";
if ($.isNode()) {
  Object.keys(_0x1c141c).forEach(_0xfab896 => {
    _0x597d4f.push(_0x1c141c[_0xfab896]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x597d4f = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x35fab0($.getdata("CookiesJD") || "[]").map(_0x3f576e => _0x3f576e.cookie)].filter(_0x2e180d => !!_0x2e180d);
let _0x2d5ca3 = "30",
  _0x35ed6d = "0";
_0x2d5ca3 = $.isNode() ? process.env.retrynum ? process.env.retrynum : _0x2d5ca3 : $.getdata("retrynum") ? $.getdata("retrynum") : _0x35ed6d;
_0x35ed6d = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : _0x35ed6d : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : _0x35ed6d;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let _0x4ee46f = "",
  _0x21915a = "",
  _0x47b2e3 = "1802015a6a374ce186ea9a4_230820";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const _0xc02955 = require("./function/krgetToken"),
  _0x1b4d2c = require("./function/krh5st"),
  _0x58e51f = require("./function/krgetua");
let _0x64fb52 = "https://jinggengjcq-isv.isvjcloud.com";
_0x21915a = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + _0x21915a : $.getdata("helpnum") ? $.getdata("helpnum") : "" + _0x21915a;
let _0x3c0b15 = "",
  _0x532188 = "";
$.whitelist = process.env.DPLHTY_whitelist || _0x3c0b15;
$.blacklist = process.env.DPLHTY_blacklist || _0x532188;
_0x16b7f7();
_0x385736();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = _0x21915a ? _0x21915a : authorCodeList[_0x4cb1f4(0, authorCodeList.length)];
  } else {
    let _0x1e68dd = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = _0x21915a ? _0x21915a : _0x1e68dd[_0x4cb1f4(0, _0x1e68dd.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 默认抽奖次数：" + _0x35ed6d + " 💬 重试次数：" + _0x2d5ca3);
  console.log("\n💬 请在有水的情况下运行");
  process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let _0x58270b = [];
    _0x58270b = UserAdd_Data_Arr.split("|");
    var _0x3229eb = Math.floor(Math.random() * _0x58270b.length);
    if (_0x58270b[_0x3229eb] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else _0x58270b = _0x58270b[_0x3229eb];
    if (process.env.jd_jinggeng_address) {
      _0x58270b = _0x58270b.split("@");
      if (_0x58270b.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let _0x4ac5e0 = 0; _0x4ac5e0 < 6; _0x4ac5e0++) {
        if (_0x58270b[_0x4ac5e0] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      _0x58270b = _0x58270b.split("@");
      if (_0x58270b.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let _0x297db6 = 0; _0x297db6 < 7; _0x297db6++) {
        if (_0x58270b[_0x297db6] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = _0x58270b[0];
    $.phone = _0x58270b[1];
    $.province = _0x58270b[2];
    $.city = _0x58270b[3];
    $.county = _0x58270b[4];
    $.address = _0x58270b[5];
  }
  if (!_0x597d4f[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = _0x47b2e3;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let _0x40a92c = 0; _0x40a92c < _0x597d4f.length; _0x40a92c++) {
    _0x174d21 = _0x597d4f[_0x40a92c];
    if (_0x174d21) {
      $.UserName = decodeURIComponent(_0x174d21.match(/pt_pin=([^; ]+)(?=;?)/) && _0x174d21.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x40a92c + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await _0x58e51f($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await _0x1588d2();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let _0x1635c7 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x1635c7);
    if ($.isNode()) await _0x3a63a6.sendNotify("" + $.name, "" + _0x1635c7);
  }
})().catch(_0x31b5df => $.logErr(_0x31b5df)).finally(() => $.done());
async function _0x1588d2() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    _0x4ee46f = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await _0xc02955(_0x174d21, _0x64fb52);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await _0x24c173("activity_load");
    for (let _0x56246a = 0; _0x56246a < _0x2d5ca3; _0x56246a++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await _0x24c173("activity_load");
        if ($.krFlag) break;
      }
    }
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("❌ 获取[活动信息]失败，可能是黑号或者太卡了");
      return;
    }
    $.toBind = 0;
    $.openList = [];
    await _0x24c173("绑定");
    for (let _0x279778 = 0; _0x279778 < _0x2d5ca3; _0x279778++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await _0x24c173("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await _0x24c173("shopList");
    for (let _0x3ec501 = 0; _0x3ec501 < _0x2d5ca3; _0x3ec501++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await _0x24c173("shopList");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.activityEnd) return;
    for (o of $.openList) {
      $.missionType = "openCard";
      if (o.open != true && o.openCardUrl) {
        if ($.activityEnd) return;
        if ($.outEnd) return;
        $.openCard = false;
        $.joinVenderId = o.userId;
        await _0x24c173("mission");
        for (let _0x4ca57c = 0; _0x4ca57c < _0x2d5ca3; _0x4ca57c++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await _0x24c173("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await _0x519684();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("😤 呜呜呜，重试开卡");
            await $.wait(1000);
            await _0x519684();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await _0x24c173("activity_load");
          for (let _0x4b9bcf = 0; _0x4b9bcf < _0x2d5ca3; _0x4b9bcf++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await _0x24c173("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await _0x24c173("shopList");
          for (let _0x15a081 = 0; _0x15a081 < _0x2d5ca3; _0x15a081++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await _0x24c173("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await _0x24c173("mission");
      for (let _0x12ef5b = 0; _0x12ef5b < _0x2d5ca3; _0x12ef5b++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await _0x24c173("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else {
      console.log("💔 呜呜呜，已完成关注任务");
    }
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await _0x24c173("mission");
      for (let _0x3ba373 = 0; _0x3ba373 < _0x2d5ca3; _0x3ba373++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await _0x24c173("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await _0x24c173("activity_load");
    for (let _0x35b1ff = 0; _0x35b1ff < _0x2d5ca3; _0x35b1ff++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await _0x24c173("activity_load");
        if ($.krFlag) break;
      }
    }
    if (_0x35ed6d + "" !== "0") {
      $.runFalag = true;
      let _0x4361a3 = parseInt($.remainPoint / 200);
      _0x35ed6d = parseInt(_0x35ed6d, 10);
      if (_0x4361a3 > _0x35ed6d) _0x4361a3 = _0x35ed6d;
      console.log("💖 抽奖次数为:" + _0x4361a3 + "，当前积分：" + $.remainPoint);
      for (m = 1; _0x4361a3--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await _0x24c173("抽奖");
        for (let _0x2d6c09 = 0; _0x2d6c09 < _0x2d5ca3; _0x2d6c09++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await _0x24c173("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(_0x4361a3) <= 0) break;
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("🔊 后面的号都会助力:" + $.inviteNick));
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  } catch (_0x3f64e5) {
    console.log(_0x3f64e5);
  }
}
async function _0x24c173(_0x225c18) {
  if ($.outFlag) return;
  let _0x574bb3 = "https://jinggengjcq-isv.isvjcloud.com",
    _0x33c42b = "",
    _0x362495 = "POST",
    _0x2f2c59 = "";
  switch (_0x225c18) {
    case "activity_load":
      url = _0x574bb3 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x2f2c59 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) _0x2f2c59 = {
        ..._0x2f2c59,
        "shopId": "" + $.joinVenderId
      };
      _0x33c42b = _0x4aac08("/jdBigAlliance/activity/load", _0x2f2c59);
      break;
    case "shopList":
      url = _0x574bb3 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x2f2c59 = {};
      _0x33c42b = _0x4aac08("/jdBigAlliance/shop/shopList", _0x2f2c59);
      break;
    case "绑定":
      url = _0x574bb3 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x2f2c59 = {
        "inviterNick": $.inviteNick || ""
      };
      _0x33c42b = _0x4aac08("/jdBigAlliance/customer/inviteRelation", _0x2f2c59);
      break;
    case "mission":
      url = _0x574bb3 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x2f2c59 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) _0x2f2c59 = {
        ..._0x2f2c59,
        "shopId": $.joinVenderId
      };
      _0x33c42b = _0x4aac08("/jdBigAlliance/mission/completeMission", _0x2f2c59);
      break;
    case "抽奖":
      url = _0x574bb3 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x2f2c59 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      _0x33c42b = _0x4aac08("/jdBigAlliance/interactive/drawPost", _0x2f2c59);
      break;
    case "updateAddress":
      url = _0x574bb3 + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x2f2c59 = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      _0x33c42b = _0x4aac08("/jdBigAlliance/awards/updateAddress", _0x2f2c59);
      break;
    default:
      console.log("错误" + _0x225c18);
  }
  let _0x1edbe8 = _0x31a288(url, _0x33c42b, _0x362495);
  return new Promise(async _0x2131c1 => {
    $.post(_0x1edbe8, (_0x2df152, _0x4904bb, _0x495cd9) => {
      try {
        if (_0x2df152) {
          if (_0x4904bb && _0x4904bb.statusCode && _0x4904bb.statusCode == 493) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            $.outFlag = true;
          }
          $.retry = true;
        } else _0x2be0a8(_0x225c18, _0x495cd9);
      } catch (_0x656ff4) {
        console.log(_0x656ff4, _0x4904bb);
      } finally {
        _0x2131c1();
      }
    });
  });
}
async function _0x2be0a8(_0x3139ac, _0x320353) {
  let _0x1cd99f = "";
  try {
    $.krFlag = true;
    if (_0x3139ac != "accessLogWithAD" || _0x3139ac != "drawContent") {
      if (_0x320353) {
        _0x1cd99f = JSON.parse(_0x320353);
      }
    }
  } catch (_0xb73051) {
    console.log("🤬 " + _0x3139ac + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let _0x1681aa = "";
    switch (_0x3139ac) {
      case "抽奖":
        if (typeof _0x1cd99f == "object") {
          if (_0x1cd99f.success && _0x1cd99f.success === true && _0x1cd99f.data) {
            if (_0x1cd99f.data.status && _0x1cd99f.data.status == 200) {
              if (_0x1cd99f.data.data.sendResult) {
                console.log("抽中：" + _0x1cd99f.data.data.awardSetting.awardName);
                _0x1cd99f.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = _0x1cd99f.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await _0x24c173("updateAddress"), await $.wait(4000));
              } else {
                if (!_0x1cd99f.data.data.result) {
                  console.log("💔 空气");
                } else console.log(_0x1cd99f.data.data);
              }
            } else _0x1cd99f.data.status && _0x1cd99f.data.status == 500 && console.log("" + (_0x1cd99f.data.msg || ""));
          } else _0x1cd99f.message ? console.log("" + (_0x1cd99f.message || "")) : console.log(_0x320353);
        } else console.log(_0x320353);
        break;
      case "updateAddress":
        if (typeof _0x1cd99f == "object") {
          if (_0x1cd99f.success && _0x1cd99f.success === true && _0x1cd99f.data) {
            if (_0x1cd99f.data.status && _0x1cd99f.data.status == 200) _0x1cd99f.data.data.result ? console.log("💖 地址填写成功，返回：" + _0x1cd99f.data.data.msg) : console.log(_0x1cd99f.data.data);else {
              if (_0x1cd99f.data.status && _0x1cd99f.data.status == 500) {
                console.log("" + (_0x1cd99f.data.msg || ""));
              }
            }
          } else _0x1cd99f.message ? console.log("" + (_0x1cd99f.message || "")) : console.log(_0x320353);
        } else console.log(_0x320353);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      case "activity_load":
      case "mission":
      case "shopList":
      case "loadUniteOpenCard":
      case "setMixNick":
      case "uniteOpenCardOne":
      case "checkOpenCard":
      case "followShop":
      case "addCart":
      case "myAward":
      case "missionInviteList":
      case "绑定":
        _0x1681aa = "";
        if (_0x3139ac == "followShop") _0x1681aa = "关注";
        if (_0x3139ac == "addCart") _0x1681aa = "加购";
        if (typeof _0x1cd99f == "object") {
          if (_0x1cd99f.success && _0x1cd99f.success === true && _0x1cd99f.data) {
            if (_0x1cd99f.data.status && _0x1cd99f.data.status == 200) {
              _0x1cd99f = _0x1cd99f.data;
              if (_0x3139ac != "setMixNick" && (_0x1cd99f.msg || _0x1cd99f.data.isOpenCard || _0x1cd99f.data.remark)) console.log("🔊 " + (_0x1681aa && _0x1681aa + ":" || "") + (_0x1cd99f.msg || _0x1cd99f.data.isOpenCard || _0x1cd99f.data.remark || ""));
              if (_0x3139ac == "activity_load") {
                if (_0x1cd99f.msg || _0x1cd99f.data.isOpenCard) {
                  if ((_0x1cd99f.msg || _0x1cd99f.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (_0x1cd99f.data) {
                  $.endTime = _0x1cd99f.data.cusActivity.endTime || 0;
                  $.MixNick = _0x1cd99f.data.missionCustomer.buyerNick || "";
                  $.usedChance = _0x1cd99f.data.missionCustomer.usedChance || 0;
                  $.remainPoint = _0x1cd99f.data.missionCustomer.remainPoint || 0;
                  $.hasCollectShop = _0x1cd99f.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = _0x1cd99f.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (_0x3139ac == "shopList") $.openList = _0x1cd99f.data || [];else {
                  if (_0x3139ac == "mission") _0x1cd99f.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (_0x3139ac == "uniteOpenCardOne") $.uniteOpenCar = _0x1cd99f.msg || _0x1cd99f.data.msg || "";else {
                      if (_0x3139ac == "myAward") {
                        console.log("🔊 我的奖品：");
                        let _0x5056cd = 0;
                        for (let _0x3763da in _0x1cd99f.data.list || []) {
                          let _0x545ac3 = _0x1cd99f.data.list[_0x3763da];
                          _0x5056cd += Number(_0x545ac3.awardDes);
                        }
                        if (_0x5056cd > 0) console.log("🔊 共获得" + _0x5056cd + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else _0x3139ac == "missionInviteList" && console.log("🔊 邀请人数(" + _0x1cd99f.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (_0x1cd99f.data.msg) {
                _0x1cd99f.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (_0x1cd99f.data.msg || ""));
              } else {
                if (_0x1cd99f.errorMessage) {
                  if (_0x1cd99f.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (_0x1cd99f.errorMessage || ""));
                } else {
                  console.log("" + _0x320353);
                }
              }
            }
          } else {
            if (_0x1cd99f.errorMessage) {
              console.log("🔊 " + (_0x1cd99f.errorMessage || ""));
            } else {
              console.log("" + _0x320353);
            }
          }
        } else {}
        break;
      default:
        console.log((_0x1681aa || _0x3139ac) + "-> " + _0x320353);
    }
    if (typeof _0x1cd99f == "object") {
      if (_0x1cd99f.errorMessage) {
        if (_0x1cd99f.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (_0x38a6dd) {}
}
function _0x31a288(_0x52f723, _0x6bf017, _0x6b362f = "POST") {
  let _0x7d6212 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": _0x174d21,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x52f723.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1) {
    _0x7d6212.Origin = "https://jinggengjcq-isv.isvjcloud.com";
    _0x7d6212["Content-Type"] = "application/json; charset=utf-8";
    delete _0x7d6212.Cookie;
  }
  return {
    "url": _0x52f723,
    "method": _0x6b362f,
    "headers": _0x7d6212,
    "body": _0x6bf017,
    "timeout": 30 * 1000
  };
}
function _0x4aac08(_0x1f1902, _0x14154f) {
  d = {
    "actId": $.actId,
    ..._0x14154f,
    "method": _0x1f1902,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = _0x3439cb(d);
  const _0x47aaf4 = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "oba": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ..._0x14154f,
        "method": _0x1f1902,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  if (_0x1f1902.indexOf("missionInviteList") > -1) {
    delete _0x47aaf4.params.admJson.actId;
  }
  return $.toStr(_0x47aaf4, _0x47aaf4);
}
function _0x4cb1f4(_0x3897a1, _0x2d130d) {
  return Math.floor(Math.random() * (_0x2d130d - _0x3897a1)) + _0x3897a1;
}
function _0x3439cb(_0x189850) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(_0x189850));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret;
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    "sign": sign,
    "timeStamp": time2
  };
}
function _0x1b0867(_0x4a7e75) {
  _0x4a7e75 = _0x4a7e75 || 32;
  let _0x2ea88b = "abcdef0123456789",
    _0x20fbba = _0x2ea88b.length,
    _0x103b33 = "";
  for (i = 0; i < _0x4a7e75; i++) _0x103b33 += _0x2ea88b.charAt(Math.floor(Math.random() * _0x20fbba));
  return _0x103b33;
}
function _0x35fab0(_0x833201) {
  if (typeof _0x833201 == "string") try {
    return JSON.parse(_0x833201);
  } catch (_0x176400) {
    return console.log(_0x176400), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function _0x519684() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x4df812 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x25488b = "";
    if ($.shopactivityId) _0x25488b = ",\"activityId\":" + $.shopactivityId;
    const _0x2b729e = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x25488b + ",\"channel\":406}",
      _0x4b3d18 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x2b729e)
      };
    for (var _0x5dba0a = "", _0x33f922 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", _0x4b5359 = 0; _0x4b5359 < 16; _0x4b5359++) {
      var _0x355f48 = Math.round(Math.random() * (_0x33f922.length - 1));
      _0x5dba0a += _0x33f922.substring(_0x355f48, _0x355f48 + 1);
    }
    uuid = Buffer.from(_0x5dba0a, "utf8").toString("base64");
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
    const _0x552d20 = await _0x1b4d2c("8adfb", _0x4b3d18),
      _0x1c5486 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x2b729e + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x552d20),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x174d21,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x1c5486, async (_0x1e0134, _0x1d591f, _0x1987be) => {
      try {
        if (_0x1e0134) {
          if (_0x1d591f && typeof _0x1d591f.statusCode != "undefined") {
            if (_0x1d591f.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x1987be = _0x1987be && _0x1987be.match(/jsonp_.*?\((.*?)\);/) && _0x1987be.match(/jsonp_.*?\((.*?)\);/)[1] || _0x1987be;
          let _0x4a39f2 = $.toObj(_0x1987be, _0x1987be);
          if (_0x4a39f2 && typeof _0x4a39f2 == "object") {
            if (_0x4a39f2 && _0x4a39f2.success === true) {
              console.log(" >> " + _0x4a39f2.message);
              $.errorJoinShop = _0x4a39f2.message;
              if (_0x4a39f2.result && _0x4a39f2.result.giftInfo) for (let _0x318a38 of _0x4a39f2.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + _0x318a38.discountString + _0x318a38.prizeName + _0x318a38.secondLineDesc);
              }
            } else _0x4a39f2 && typeof _0x4a39f2 == "object" && _0x4a39f2.message ? ($.errorJoinShop = _0x4a39f2.message, console.log("" + (_0x4a39f2.message || ""))) : console.log(_0x1987be);
          } else console.log(_0x1987be);
        }
      } catch (_0x1d57a7) {
        $.logErr(_0x1d57a7, _0x1d591f);
      } finally {
        _0x4df812();
      }
    });
  });
}
async function _0x3a2301() {
  return new Promise(async _0x318212 => {
    const _0x404186 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      _0x1e8c9e = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x404186)
      };
    await $.wait(1000);
    const _0x2164b3 = await _0x1b4d2c("8adfb", _0x1e8c9e),
      _0x5a0e9a = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x404186 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x2164b3),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x174d21,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x5a0e9a, async (_0x666778, _0x2fbbc5, _0x4c417b) => {
      try {
        if (_0x666778) _0x2fbbc5 && typeof _0x2fbbc5.statusCode != "undefined" && _0x2fbbc5.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          _0x4c417b = _0x4c417b && _0x4c417b.match(/jsonp_.*?\((.*?)\);/) && _0x4c417b.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4c417b;
          let _0x1b4cf0 = $.toObj(_0x4c417b, _0x4c417b);
          if (_0x1b4cf0 && typeof _0x1b4cf0 == "object") {
            _0x1b4cf0 && _0x1b4cf0.success == true && (console.log("去加入：" + (_0x1b4cf0.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = _0x1b4cf0.result.interestsRuleList && _0x1b4cf0.result.interestsRuleList[0] && _0x1b4cf0.result.interestsRuleList[0].interestsInfo && _0x1b4cf0.result.interestsRuleList[0].interestsInfo.activityId || "");
          } else {
            console.log(_0x4c417b);
          }
        }
      } catch (_0x14cac8) {
        $.logErr(_0x14cac8, _0x2fbbc5);
      } finally {
        _0x318212();
      }
    });
  });
}
function _0x3bb7e4(_0x5870c3) {
  return new Promise(_0x33e988 => {
    const _0xdeed61 = {
      "url": "" + _0x5870c3,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0xdeed61, async (_0x50c537, _0x556b36, _0x4fcb0b) => {
      try {
        if (_0x50c537) {} else _0x4fcb0b ? _0x4fcb0b = JSON.parse(_0x4fcb0b) : console.log("未获取到数据,请重新运行");
      } catch (_0x3d1309) {
        $.logErr(_0x3d1309, _0x556b36);
        _0x4fcb0b = null;
      } finally {
        _0x33e988(_0x4fcb0b);
      }
    });
  });
}
function _0x4cb1f4(_0x270e65, _0x167af7) {
  return Math.floor(Math.random() * (_0x167af7 - _0x270e65)) + _0x270e65;
}
function _0x385736() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const _0x24baf4 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x24baf4.join("&") + "\n");
  let _0x1232c1 = _0x24baf4,
    _0x21ca9d = [],
    _0x2ab50c = false;
  for (let _0x2ff1d9 = 0; _0x2ff1d9 < _0x597d4f.length; _0x2ff1d9++) {
    let _0x40681b = decodeURIComponent(_0x597d4f[_0x2ff1d9].match(/pt_pin=([^; ]+)(?=;?)/) && _0x597d4f[_0x2ff1d9].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x40681b) break;
    let _0x20946a = false;
    for (let _0x434140 of _0x1232c1) {
      if (_0x434140 && _0x434140 == _0x40681b) {
        _0x20946a = true;
        break;
      }
    }
    !_0x20946a && (_0x2ab50c = true, _0x21ca9d.splice(_0x2ff1d9, -1, _0x597d4f[_0x2ff1d9]));
  }
  if (_0x2ab50c) _0x597d4f = _0x21ca9d;
}
function _0x588d8a(_0x2719b9, _0x56bb4e) {
  _0x56bb4e != 0 && _0x2719b9.unshift(_0x2719b9.splice(_0x56bb4e, 1)[0]);
}
function _0x16b7f7() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(_0x597d4f, _0x597d4f));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x86c5df = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x86c5df.join("&") + "\n");
  let _0x50846f = [],
    _0x4aaf21 = _0x86c5df;
  for (let _0x24156e in _0x597d4f) {
    let _0x497541 = decodeURIComponent(_0x597d4f[_0x24156e].match(/pt_pin=([^; ]+)(?=;?)/) && _0x597d4f[_0x24156e].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    _0x4aaf21.includes(_0x497541) && _0x50846f.push(_0x597d4f[_0x24156e]);
  }
  helpCookiesArr = _0x50846f;
  if (_0x4aaf21.length > 1) for (let _0x35647f in _0x4aaf21) {
    let _0x592396 = _0x4aaf21[_0x4aaf21.length - 1 - _0x35647f];
    if (!_0x592396) continue;
    for (let _0x15205e in helpCookiesArr) {
      let _0x1bc1df = decodeURIComponent(helpCookiesArr[_0x15205e].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x15205e].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      _0x592396 == _0x1bc1df && _0x588d8a(helpCookiesArr, _0x15205e);
    }
  }
}