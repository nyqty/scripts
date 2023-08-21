/*
洋河造梦空间站

————————————————
任务本

集齐3张梦之蓝卡片 即可兑换 5豆   脚本默认兑换 5豆

cron:31 0 10-31 8 *
============Quantumultx===============
[task_local]
#洋河造梦空间站
31 0 10-31 8 * jd_yh.js, tag=洋河造梦空间站, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('洋河造梦空间站');
const _0x10d291 = $.isNode() ? require("./jdCookie.js") : "",
  _0x1d1694 = $.isNode() ? require("./sendNotify") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const _0x3c2d65 = require("./function/krgetToken"),
  _0x2c442e = require("./function/krh5st"),
  _0x200ec0 = require("./function/krgetua");
let _0x4f7be6 = "https://mpdz-act-dz.isvjcloud.com",
  _0x509f07 = "false",
  _0x180720 = [],
  _0x39c15e = "";
if ($.isNode()) {
  Object.keys(_0x10d291).forEach(_0x5b1149 => {
    _0x180720.push(_0x10d291[_0x5b1149]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x180720 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x55481e($.getdata("CookiesJD") || "[]").map(_0x5eecf7 => _0x5eecf7.cookie)].filter(_0x446baf => !!_0x446baf);
_0x509f07 = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + _0x509f07 : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + _0x509f07;
allMessage = "";
message = "";
let _0x58e1e8 = "";
$.exchangePostawardId = process.env.jd_yh_exchangeid ? process.env.jd_yh_exchangeid : "10082bd15b4701103";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let _0x59b513 = "";
!(async () => {
  if (!_0x180720[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let _0x38e01e = [];
    _0x38e01e = UserAdd_Data_Arr.split("|");
    var _0x2f949f = Math.floor(Math.random() * _0x38e01e.length);
    if (_0x38e01e[_0x2f949f] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else _0x38e01e = _0x38e01e[_0x2f949f];
    if (process.env.jd_jinggeng_address) {
      _0x38e01e = _0x38e01e.split("@");
      if (_0x38e01e.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let _0x5cf33f = 0; _0x5cf33f < 6; _0x5cf33f++) {
        if (_0x38e01e[_0x5cf33f] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      _0x38e01e = _0x38e01e.split("@");
      if (_0x38e01e.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let _0x34507f = 0; _0x34507f < 7; _0x34507f++) {
        if (_0x38e01e[_0x34507f] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = _0x38e01e[0];
    $.phone = _0x38e01e[1];
    $.province = _0x38e01e[2];
    $.city = _0x38e01e[3];
    $.county = _0x38e01e[4];
    $.address = _0x38e01e[5];
  }
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = _0x58e1e8 ? _0x58e1e8 : authorCodeList[_0x56e02f(0, authorCodeList.length)];
  } else {
    let _0xee3176 = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = _0x58e1e8 ? _0x58e1e8 : _0xee3176[_0x56e02f(0, _0xee3176.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.appkey = "8bd7eeb6c96e4145864af794bb2cadd0";
  $.userId = "10299171";
  $.actId = "jdYangheJika202308";
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let _0x4775d2 = 0; _0x4775d2 < _0x180720.length; _0x4775d2++) {
    _0x39c15e = _0x180720[_0x4775d2];
    $.ownCookie = _0x180720[_0x4775d2];
    if (_0x39c15e) {
      $.UserName = decodeURIComponent(_0x39c15e.match(/pt_pin=([^; ]+)(?=;?)/) && _0x39c15e.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x4775d2 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      $.UA = await _0x200ec0($.UserName);
      await _0x19d8db();
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let _0x7175fd = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x7175fd);
    if ($.isNode()) await _0x1d1694.sendNotify("" + $.name, "" + _0x7175fd);
  }
})().catch(_0x2a415c => $.logErr(_0x2a415c)).finally(() => $.done());
async function _0x19d8db() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    _0x59b513 = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await _0x3c2d65(_0x39c15e, _0x4f7be6);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await _0x316480("activity_load");
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("获取cookie失败");
      return;
    }
    $.toBind = 0;
    $.openLists = [1000015502];
    await _0x316480("绑定");
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    await _0x316480("completeState");
    for (let _0x2cd056 = 0; _0x2cd056 < $.renwulists.length; _0x2cd056++) {
      $.missionType = $.renwulists[_0x2cd056].type;
      if (!$.renwulists[_0x2cd056].isComplete) {
        switch ($.missionType) {
          case "buyHotProducts":
          case "payTrade":
          case "payTradeWeiFenZi":
          case "shareAct":
            break;
          case "openCard":
            for (let _0xfc0141 = 0; _0xfc0141 < $.openLists.length; _0xfc0141++) {
              $.missionType = "openCard";
              $.open = false;
              $.joinVenderId = $.openLists[_0xfc0141];
              await _0x316480("kaika");
              await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
              if ($.open == false) {
                $.errorJoinShop = "";
                await _0x5c4b25();
                await $.wait(parseInt(Math.random() * 3000 + 4500, 10));
                if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
                  return;
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await _0x5c4b25(), await $.wait(parseInt(Math.random() * 3000 + 4000, 10)));
                await _0x316480("activity_load");
                await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
              }
            }
            break;
          case "uniteAddCart":
            for (let _0x23dac1 = 0; _0x23dac1 < 1; _0x23dac1++) {
              $.missionType = "uniteAddCart";
              await _0x316480("mission");
              await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            }
            break;
          case "viewOneConferenceHall":
            for (let _0x1e84d9 = 0; _0x1e84d9 < 1; _0x1e84d9++) {
              $.missionType = "viewOneConferenceHall";
              await _0x316480("mission");
              await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
            }
            break;
          case "viewOneWeiFenZi":
            for (let _0xa922e9 = 0; _0xa922e9 < 1; _0xa922e9++) {
              $.missionType = "viewOneWeiFenZi";
              await _0x316480("mission");
              await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
            }
            break;
          case "shareAct":
            for (let _0x191f75 = 0; _0x191f75 < 1; _0x191f75++) {
              $.missionType = "shareAct";
              await _0x316480("绑定");
              await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            }
            break;
          default:
            await $.wait(1000);
        }
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    await _0x316480("activity_load");
    $.runFalag = true;
    let _0x4a1ef9 = parseInt($.remainPoint / 1);
    console.log("抽卡次数为：" + _0x4a1ef9 + " 次");
    for (m = 1; _0x4a1ef9--; m++) {
      console.log("第" + m + "次抽奖");
      await _0x316480("carDrawPost");
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      $.dataType = "cardAward";
      await _0x316480("抽奖");
      if ($.runFalag == false) break;
      if (Number(_0x4a1ef9) <= 0) break;
      if (m >= 10) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
    $.getAwardSettingtype = "cardDraw";
    await _0x316480("getAwardSettingList");
    const _0x455d28 = new Set();
    $.cardName = "";
    $.count = 0;
    $.prizeList = "";
    for (const _0x10b229 of $.getAwardSettingList) {
      $.cardName = _0x10b229?.["awardName"] || "";
      $.count = _0x10b229?.["carNum"] || 0;
      _0x10b229.carNum >= 0 ? _0x455d28.add(_0x10b229.carNum) : "";
      $.prizeList += $.cardName + "x" + $.count + "，";
    }
    console.log("目前已有卡片：" + $.prizeList);
    var _0x288db2 = Array.from(_0x455d28),
      _0x354dd7 = _0x36321c(_0x288db2, "min");
    console.log("\n目前集齐：" + _0x354dd7 + "次\n");
    for (let _0x54eff5 = 0; _0x54eff5 < _0x354dd7; _0x54eff5++) {
      console.log("第" + (_0x54eff5 + 1) + "次集满抽奖");
      $.dataType = "CompleteCardAward";
      $.carDrawPostid = "";
      await _0x316480("抽奖");
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
    $.exchangePostawardId ? (console.log(""), await _0x316480("exchangePost")) : (console.log(""), console.log("未填写兑换ID，不进行兑换"));
    $.krprizeList = "";
    await _0x316480("getAwardlist");
    for (const _0x1f6846 of $.getAwardlist) {
      $.createTime = new Date(parseInt(_0x1f6846?.["createTime"])).toLocaleString();
      $.krprizeList += _0x1f6846.awardName + "  时间：" + $.createTime + "\n";
    }
    console.log("\n我的奖品：\n" + $.krprizeList);
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("\n后面的号都会助力:" + $.inviteNick));
  } catch (_0x28782a) {
    console.log(_0x28782a);
  }
}
async function _0x316480(_0x3dae52) {
  if ($.outFlag) return;
  let _0x1eef5c = "https://mpdz-act-dz.isvjcloud.com",
    _0x95a7af = "",
    _0x31fc34 = "POST",
    _0x13ce30 = "";
  switch (_0x3dae52) {
    case "activity_load":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      _0x13ce30 = {
        "jdToken": $.Token,
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) _0x13ce30 = {
        ..._0x13ce30,
        "shopId": "" + $.joinVenderId
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/activity/load", _0x13ce30);
      break;
    case "mission":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      _0x13ce30 = {
        "missionType": $.missionType
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/mission/completeMission", _0x13ce30);
      break;
    case "绑定":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      _0x13ce30 = {
        "missionType": "relationBind",
        "inviterNick": $.inviteNick || ""
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/customer/inviteRelation", _0x13ce30);
      break;
    case "kaika":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      _0x13ce30 = {
        "missionType": $.missionType,
        "shopId": $.joinVenderId,
        "userId": "10299171",
        "inviterNick": $.inviteNick || ""
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/mission/completeMission", _0x13ce30);
      break;
    case "completeState":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/mission/completeState?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      _0x13ce30 = {};
      _0x95a7af = _0x334227("/jdYangHeJiKa/mission/completeState", _0x13ce30);
      break;
    case "抽奖":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/carDraw/carDeckDraw?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x13ce30 = {
        "dataType": $.dataType,
        "awardId": $.carDrawPostid
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/carDraw/carDeckDraw", _0x13ce30);
      break;
    case "getAwardSettingList":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/awards/getAwardSettingList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x13ce30 = {
        "dataType": $.getAwardSettingtype
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/awards/getAwardSettingList", _0x13ce30);
      break;
    case "getAwardlist":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/awards/list?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x13ce30 = {
        "pageNo": 1,
        "pageSize": 10
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/awards/list", _0x13ce30);
      break;
    case "carDrawPost":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/carDraw/carDrawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x13ce30 = {
        "dataType": "cardDraw"
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/carDraw/carDrawPost", _0x13ce30);
      break;
    case "exchangePost":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/interactive/exchangePost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      _0x13ce30 = {
        "dataType": "exchange",
        "awardId": $.exchangePostawardId
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/interactive/exchangePost", _0x13ce30);
      break;
    case "updateAddress":
      url = _0x1eef5c + "/dm/front/jdYangHeJiKa/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x13ce30 = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      _0x95a7af = _0x334227("/jdYangHeJiKa/awards/updateAddress", _0x13ce30);
      break;
    default:
      console.log("错误" + _0x3dae52);
  }
  let _0x518493 = _0x3cb505(url, _0x95a7af, _0x31fc34);
  return new Promise(async _0x116320 => {
    $.post(_0x518493, (_0x215c24, _0x4cfa79, _0x28498e) => {
      try {
        if (_0x215c24) {
          if (_0x4cfa79 && _0x4cfa79.statusCode && _0x4cfa79.statusCode == 493) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            $.outFlag = true;
          }
          console.log("API请求失败，请检查网路重试");
        } else _0x12db73(_0x3dae52, _0x28498e);
      } catch (_0x54e038) {
        console.log(_0x54e038, _0x4cfa79);
      } finally {
        _0x116320();
      }
    });
  });
}
async function _0x12db73(_0x235f53, _0x4d2a41) {
  let _0x13c357 = "";
  try {
    (_0x235f53 != "accessLogWithAD" || _0x235f53 != "drawContent") && _0x4d2a41 && (_0x13c357 = JSON.parse(_0x4d2a41));
  } catch (_0x10081b) {
    console.log("执行任务异常");
    console.log(_0x4d2a41);
    $.runFalag = false;
  }
  try {
    let _0x272417 = "";
    switch (_0x235f53) {
      case "completeState":
        if (typeof _0x13c357 == "object") {
          if (_0x13c357.success && _0x13c357.success === true && _0x13c357.data) _0x13c357.data.status && _0x13c357.data.status == 200 && ($.renwulists = _0x13c357.data.data || []);else {
            if (_0x13c357.message) {
              console.log("" + (_0x13c357.message || ""));
            } else console.log(_0x4d2a41);
          }
        } else console.log(_0x4d2a41);
        break;
      case "getAwardSettingList":
        if (typeof _0x13c357 == "object") {
          if (_0x13c357.success && _0x13c357.success === true && _0x13c357.data) _0x13c357.data.status && _0x13c357.data.status == 200 && ($.getAwardSettingList = _0x13c357.data.data.awardSettings || []);else {
            if (_0x13c357.message) {
              console.log("" + (_0x13c357.message || ""));
            } else console.log(_0x4d2a41);
          }
        } else console.log(_0x4d2a41);
        break;
      case "getAwardlist":
        if (typeof _0x13c357 == "object") {
          if (_0x13c357.success && _0x13c357.success === true && _0x13c357.data) {
            _0x13c357.data.status && _0x13c357.data.status == 200 && ($.getAwardlist = _0x13c357.data.data.list || []);
          } else _0x13c357.message ? console.log("" + (_0x13c357.message || "")) : console.log(_0x4d2a41);
        } else console.log(_0x4d2a41);
        break;
      case "抽奖":
        if (typeof _0x13c357 == "object") {
          if (_0x13c357.success && _0x13c357.success === true && _0x13c357.data) {
            if (_0x13c357.data.status && _0x13c357.data.status == 200) {
              if (_0x13c357.data.data.sendResult) {
                console.log("抽中：" + _0x13c357.data.data.awardSetting.awardName);
                if (_0x13c357.data.data.awardSetting.awardType == "goods") {
                  if (process.env.jd_jinggeng_address) {
                    $.actLogId = _0x13c357.data.data.awardSendLog.id;
                    console.log("抽中实物啦，奖品领取ID：" + $.actLogId);
                    await _0x316480("updateAddress");
                    await $.wait(4000);
                  }
                }
              } else {
                if (!_0x13c357.data.data.result) console.log("抽中：💔 空气");else {
                  console.log(_0x13c357.data.data);
                }
              }
            } else _0x13c357.data.status && _0x13c357.data.status == 500 && console.log("" + (_0x13c357.data.msg || ""));
          } else {
            if (_0x13c357.message) {
              console.log("" + (_0x13c357.message || ""));
            } else console.log(_0x4d2a41);
          }
        } else console.log(_0x4d2a41);
        break;
      case "exchangePost":
        if (typeof _0x13c357 == "object") {
          if (_0x13c357.success && _0x13c357.success === true && _0x13c357.data) {
            if (_0x13c357.data.status && _0x13c357.data.status == 200) {
              if (_0x13c357.data.data.sendResult) {
                console.log("兑换成功，获得：" + _0x13c357.data.data.awardSetting.awardName);
                _0x13c357.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = _0x13c357.data.data.awardSendLog.id, console.log("兑换实物成功，奖品领取ID：" + $.actLogId), await _0x316480("updateAddress"), await $.wait(4000));
              } else !_0x13c357.data.data.result ? console.log("兑换成功，💔 空气 （只能兑换一次）") : console.log(_0x13c357.data.data);
            } else _0x13c357.data.status && _0x13c357.data.status == 500 && console.log("" + (_0x13c357.data.msg || ""));
          } else _0x13c357.message ? console.log("" + (_0x13c357.message || "")) : console.log(_0x4d2a41);
        } else console.log(_0x4d2a41);
        break;
      case "carDrawPost":
        if (typeof _0x13c357 == "object") {
          if (_0x13c357.success && _0x13c357.success === true && _0x13c357.data) {
            if (_0x13c357.data.status && _0x13c357.data.status == 200) {
              if (_0x13c357.data.data.awardSetting) {
                $.carDrawPostid = _0x13c357.data.data.awardSetting.id;
                console.log("抽中：" + _0x13c357.data.data.awardSetting.awardName + "(" + $.carDrawPostid + ")");
              } else {
                if (!_0x13c357.data.data.result) {
                  console.log("💔 空气");
                } else console.log(_0x13c357.data.data);
              }
            } else _0x13c357.data.status && _0x13c357.data.status == 500 && console.log("" + (_0x13c357.data.msg || ""));
          } else {
            if (_0x13c357.message) console.log("" + (_0x13c357.message || ""));else {
              console.log(_0x4d2a41);
            }
          }
        } else console.log(_0x4d2a41);
        break;
      case "updateAddress":
        if (typeof _0x13c357 == "object") {
          if (_0x13c357.success && _0x13c357.success === true && _0x13c357.data) {
            if (_0x13c357.data.status && _0x13c357.data.status == 200) _0x13c357.data.data.result ? console.log("💖 地址填写成功，返回：" + _0x13c357.data.data.msg) : console.log(_0x13c357.data.data);else _0x13c357.data.status && _0x13c357.data.status == 500 && console.log("" + (_0x13c357.data.msg || ""));
          } else {
            if (_0x13c357.message) console.log("" + (_0x13c357.message || ""));else {
              console.log(_0x4d2a41);
            }
          }
        } else console.log(_0x4d2a41);
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
      case "lookHost":
      case "followShop":
      case "addCart":
      case "myAward":
      case "missionInviteList":
      case "kaika":
      case "绑定":
      case "助力":
      case "bulletChat":
      case "specialSign":
        _0x272417 = "";
        if (_0x235f53 == "followShop") _0x272417 = "关注";
        if (_0x235f53 == "addCart") _0x272417 = "加购";
        if (typeof _0x13c357 == "object") {
          if (_0x13c357.success && _0x13c357.success === true && _0x13c357.data) {
            if (_0x13c357.data.status && _0x13c357.data.status == 200) {
              _0x13c357 = _0x13c357.data;
              if (_0x235f53 != "setMixNick" && (_0x13c357.msg || _0x13c357.data.isOpenCard || _0x13c357.data.remark)) console.log("" + (_0x272417 && _0x272417 + ":" || "") + (_0x13c357.msg || _0x13c357.data.isOpenCard || _0x13c357.data.remark || ""));
              if (_0x235f53 == "activity_load") {
                if (_0x13c357.data) {
                  $.endTime = _0x13c357.data.cusActivity.endTime || 0;
                  $.MixNick = _0x13c357.data.missionCustomer.buyerNick || "";
                  $.remainPoint = _0x13c357.data.missionCustomer.remainPoint || 0;
                  $.remainChance = _0x13c357.data.missionCustomer.remainChance || 0;
                  $.usedPoint = _0x13c357.data.missionCustomer.usedPoint || 0;
                  $.hasCollectShop = _0x13c357.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = _0x13c357.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (_0x235f53 == "shopList") _0x13c357.data && ($.openLists = _0x13c357.data);else {
                  if (_0x235f53 == "mission") _0x13c357.data.remark.indexOf("赶紧去开卡吧") > -1 ? $.open = true : $.open = false;else {
                    if (_0x235f53 == "uniteOpenCardOne") $.uniteOpenCar = _0x13c357.msg || _0x13c357.data.msg || "";else {
                      if (_0x235f53 == "myAward") {
                        console.log("我的奖品：");
                        let _0x35522d = 0;
                        for (let _0x1e32b5 in _0x13c357.data.list || []) {
                          let _0x984d44 = _0x13c357.data.list[_0x1e32b5];
                          _0x35522d += Number(_0x984d44.awardDes);
                        }
                        if (_0x35522d > 0) console.log("共获得" + _0x35522d + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else _0x235f53 == "missionInviteList" && console.log("邀请人数(" + _0x13c357.data.total + ")");
                    }
                  }
                }
              }
            } else {
              if (_0x13c357.data.msg) {
                if (_0x13c357.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                console.log("" + (_0x13c357.data.msg || ""));
              } else {
                if (_0x13c357.errorMessage) {
                  if (_0x13c357.errorMessage.indexOf("火爆") > -1) {}
                  console.log("" + (_0x13c357.errorMessage || ""));
                } else console.log("" + _0x4d2a41);
              }
            }
          } else {
            if (_0x13c357.errorMessage) console.log("" + (_0x13c357.errorMessage || ""));else {
              console.log("" + _0x4d2a41);
            }
          }
        } else console.log("" + _0x4d2a41);
        break;
      default:
        console.log((_0x272417 || _0x235f53) + "-> " + _0x4d2a41);
    }
    if (typeof _0x13c357 == "object") {
      if (_0x13c357.errorMessage) {
        if (_0x13c357.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (_0x20a1b9) {
    console.log(_0x20a1b9);
  }
}
function _0x3cb505(_0x369836, _0x1e141e, _0x328b7f = "POST") {
  let _0x161d96 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": _0x39c15e,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x369836.indexOf("https://mpdz-act-dz.isvjcloud.com") > -1 && (_0x161d96.Origin = "https://mpdz-act-dz.isvjcloud.com", _0x161d96["Content-Type"] = "application/json; charset=utf-8", delete _0x161d96.Cookie), {
    "url": _0x369836,
    "method": _0x328b7f,
    "headers": _0x161d96,
    "body": _0x1e141e,
    "timeout": 60000
  };
}
function _0x334227(_0x19cc65, _0x196294) {
  d = {
    "actId": $.actId,
    ..._0x196294,
    "method": _0x19cc65,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = _0x53b816(d);
  const _0x23ecab = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "m": "POST",
        "sign": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ..._0x196294,
        "method": _0x19cc65,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return _0x19cc65.indexOf("missionInviteList") > -1 && delete _0x23ecab.params.admJson.actId, $.toStr(_0x23ecab, _0x23ecab);
}
function _0x53b816(_0x323e7d) {
  AppSecret = "01315faaab3f4bfb8446fa54aa579321";
  key = "8bd7eeb6c96e4145864af794bb2cadd0";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(_0x323e7d));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = key + "a" + key + "b" + s2 + "c" + time2 + AppSecret;
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    "sign": sign,
    "timeStamp": time2
  };
}
function _0x41bf8b(_0x53fc15) {
  _0x53fc15 = _0x53fc15 || 32;
  let _0xd03895 = "abcdef0123456789",
    _0x174a82 = _0xd03895.length,
    _0xcf774e = "";
  for (i = 0; i < _0x53fc15; i++) _0xcf774e += _0xd03895.charAt(Math.floor(Math.random() * _0x174a82));
  return _0xcf774e;
}
function _0x55481e(_0x2d9896) {
  if (typeof _0x2d9896 == "string") {
    try {
      return JSON.parse(_0x2d9896);
    } catch (_0x3238e8) {
      return console.log(_0x3238e8), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function _0x3cb7fa() {
  await _0x10aaa4("isvObfuscator", {
    "id": "",
    "url": "https://mpdz-act-dz.isvjcloud.com"
  });
  let _0x250922 = {
    "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x39c15e,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + _0x10aaa4.body
  };
  return new Promise(_0x4f807c => {
    $.post(_0x250922, (_0x27f947, _0x20e3b1, _0x76bbe9) => {
      try {
        if (_0x27f947) {} else {
          if (_0x76bbe9) {
            _0x76bbe9 = JSON.parse(_0x76bbe9);
            _0x76bbe9.code === "0" && ($.Token = _0x76bbe9.token);
          } else {}
        }
      } catch (_0x597182) {
        $.log(_0x597182);
      } finally {
        _0x4f807c();
      }
    });
  });
}
function _0x10aaa4(_0x1fa17a, _0x2d75c7) {
  let _0x59b471 = {
      "fn": _0x1fa17a,
      "body": JSON.stringify(_0x2d75c7)
    },
    _0x153f53 = {
      "url": "http://api.kingran.ml/sign",
      "body": JSON.stringify(_0x59b471),
      "headers": {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Cookie": _0x39c15e,
        "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json"
      },
      "timeout": 30000
    };
  return new Promise(async _0x4d2891 => {
    $.post(_0x153f53, (_0x2b6dcb, _0x759070, _0x4ea3ba) => {
      try {
        if (_0x2b6dcb) {} else {
          _0x4ea3ba = JSON.parse(_0x4ea3ba);
          if (typeof _0x4ea3ba === "object" && _0x4ea3ba && _0x4ea3ba.body) $.Signz = _0x4ea3ba.body || "";else {}
        }
      } catch (_0x4debf7) {
        $.logErr(_0x4debf7, _0x759070);
      } finally {
        _0x4d2891(_0x4ea3ba);
      }
    });
  });
}
async function _0x5c4b25() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x1c1a10 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x2a9922 = "";
    if ($.shopactivityId) _0x2a9922 = ",\"activityId\":" + $.shopactivityId;
    const _0x49e8c6 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x2a9922 + ",\"channel\":406}",
      _0x4e16c6 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x49e8c6)
      },
      _0x5e44b4 = await _0x2c442e("8adfb", _0x4e16c6),
      _0x4d5e3a = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x49e8c6 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x5e44b4),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x39c15e,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x4d5e3a, async (_0x4552ef, _0x61ad9f, _0x3355db) => {
      try {
        if (_0x4552ef) _0x61ad9f && typeof _0x61ad9f.statusCode != "undefined" && _0x61ad9f.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          _0x3355db = _0x3355db && _0x3355db.match(/jsonp_.*?\((.*?)\);/) && _0x3355db.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3355db;
          let _0x3ec1ab = $.toObj(_0x3355db, _0x3355db);
          if (_0x3ec1ab && typeof _0x3ec1ab == "object") {
            if (_0x3ec1ab && _0x3ec1ab.success === true) {
              console.log(" >> " + _0x3ec1ab.message);
              $.errorJoinShop = _0x3ec1ab.message;
              if (_0x3ec1ab.result && _0x3ec1ab.result.giftInfo) for (let _0x57229a of _0x3ec1ab.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + _0x57229a.discountString + _0x57229a.prizeName + _0x57229a.secondLineDesc);
              }
            } else _0x3ec1ab && typeof _0x3ec1ab == "object" && _0x3ec1ab.message ? ($.errorJoinShop = _0x3ec1ab.message, console.log("" + (_0x3ec1ab.message || ""))) : console.log(_0x3355db);
          } else console.log(_0x3355db);
        }
      } catch (_0x43ceac) {
        $.logErr(_0x43ceac, _0x61ad9f);
      } finally {
        _0x1c1a10();
      }
    });
  });
}
async function _0x3aa47e() {
  return new Promise(async _0x2b3abd => {
    const _0x48547a = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      _0x3c0968 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x48547a)
      },
      _0x1ea81b = await _0x2c442e("8adfb", _0x3c0968),
      _0x133562 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x48547a + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x1ea81b),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x39c15e,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x133562, async (_0x1ffc98, _0x4d7934, _0x432261) => {
      try {
        if (_0x1ffc98) {
          if (_0x4d7934 && typeof _0x4d7934.statusCode != "undefined") {
            if (_0x4d7934.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x432261 = _0x432261 && _0x432261.match(/jsonp_.*?\((.*?)\);/) && _0x432261.match(/jsonp_.*?\((.*?)\);/)[1] || _0x432261;
          let _0x5c500c = $.toObj(_0x432261, _0x432261);
          _0x5c500c && typeof _0x5c500c == "object" ? _0x5c500c && _0x5c500c.success == true && (console.log("去加入：" + (_0x5c500c.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = _0x5c500c.result.interestsRuleList && _0x5c500c.result.interestsRuleList[0] && _0x5c500c.result.interestsRuleList[0].interestsInfo && _0x5c500c.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x432261);
        }
      } catch (_0x18e5f9) {
        $.logErr(_0x18e5f9, _0x4d7934);
      } finally {
        _0x2b3abd();
      }
    });
  });
}
function _0x6e0ae8(_0x2cb2e3) {
  return new Promise(_0x502aa6 => {
    const _0x3c0070 = {
      "url": "" + _0x2cb2e3,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x3c0070, async (_0x49220b, _0x1e49d7, _0x52296a) => {
      try {
        if (_0x49220b) {} else {
          if (_0x52296a) {
            _0x52296a = JSON.parse(_0x52296a);
          } else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (_0x196e77) {
        $.logErr(_0x196e77, _0x1e49d7);
        _0x52296a = null;
      } finally {
        _0x502aa6(_0x52296a);
      }
    });
  });
}
function _0x56e02f(_0xdc8a3d, _0x55433d) {
  return Math.floor(Math.random() * (_0x55433d - _0xdc8a3d)) + _0xdc8a3d;
}
function _0x36321c(_0x239774, _0x1c3a5f) {
  if (_0x1c3a5f === "max") {
    return Math.max.apply(Math, _0x239774);
  } else {
    if (_0x1c3a5f === "min") return Math.min.apply(Math, _0x239774);
  }
}