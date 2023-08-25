/*
洋河造梦空间站

————————————————
任务本

变量:export jd_yh_exchangeid="兑换ID"

集齐3张梦之蓝卡片 即可兑换 5豆   脚本默认兑换 5豆

cron:31 0 10-31 8 *
============Quantumultx===============
[task_local]
#洋河造梦空间站
31 0 10-31 8 * jd_yh.js, tag=洋河造梦空间站, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('洋河造梦空间站');
const _0x49000e = $.isNode() ? require("./jdCookie.js") : "",
  _0x3fcffd = $.isNode() ? require("./sendNotify") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const _0x312771 = require("./function/krgetToken"),
  _0x42fd10 = require("./function/krh5st"),
  _0x2040bc = require("./function/krgetua");
let _0x476ef4 = "https://mpdz-act-dz.isvjcloud.com",
  _0x2f7771 = "false",
  _0x295842 = [],
  _0x3d2481 = "";
if ($.isNode()) {
  Object.keys(_0x49000e).forEach(_0x34fec3 => {
    _0x295842.push(_0x49000e[_0x34fec3]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x295842 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x251c0d($.getdata("CookiesJD") || "[]").map(_0x5f007d => _0x5f007d.cookie)].filter(_0x229aae => !!_0x229aae);
_0x2f7771 = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + _0x2f7771 : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + _0x2f7771;
allMessage = "";
message = "";
let _0x8e8381 = "";
$.exchangePostawardId = process.env.jd_yh_exchangeid ? process.env.jd_yh_exchangeid : "10082bd15b4701103";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let _0x2db99f = "";
!(async () => {
  if (!_0x295842[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (process.env.jd_jinggeng_address) UserAdd_Data_Arr = process.env.jd_jinggeng_address;else {
    UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  }
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let _0x1dc43c = [];
    _0x1dc43c = UserAdd_Data_Arr.split("|");
    var _0x3c7b55 = Math.floor(Math.random() * _0x1dc43c.length);
    if (_0x1dc43c[_0x3c7b55] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else _0x1dc43c = _0x1dc43c[_0x3c7b55];
    if (process.env.jd_jinggeng_address) {
      _0x1dc43c = _0x1dc43c.split("@");
      if (_0x1dc43c.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let _0x16408d = 0; _0x16408d < 6; _0x16408d++) {
        if (_0x1dc43c[_0x16408d] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      _0x1dc43c = _0x1dc43c.split("@");
      if (_0x1dc43c.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let _0x2d01f7 = 0; _0x2d01f7 < 7; _0x2d01f7++) {
        if (_0x1dc43c[_0x2d01f7] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = _0x1dc43c[0];
    $.phone = _0x1dc43c[1];
    $.province = _0x1dc43c[2];
    $.city = _0x1dc43c[3];
    $.county = _0x1dc43c[4];
    $.address = _0x1dc43c[5];
  }
  authorCodeList = await _0x1e7ff8("http://code.kingran.cf/dplh.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = _0x8e8381 ? _0x8e8381 : authorCodeList[_0x247817(0, authorCodeList.length)];else {
    let _0x146010 = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = _0x8e8381 ? _0x8e8381 : _0x146010[_0x247817(0, _0x146010.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.appkey = "8bd7eeb6c96e4145864af794bb2cadd0";
  $.userId = "10299171";
  $.actId = "jdYangheJika202308";
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let _0x4a9720 = 0; _0x4a9720 < _0x295842.length; _0x4a9720++) {
    _0x3d2481 = _0x295842[_0x4a9720];
    $.ownCookie = _0x295842[_0x4a9720];
    if (_0x3d2481) {
      $.UserName = decodeURIComponent(_0x3d2481.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3d2481.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x4a9720 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      $.UA = await _0x2040bc($.UserName);
      await _0x499914();
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let _0x513f71 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x513f71);
    if ($.isNode()) await _0x3fcffd.sendNotify("" + $.name, "" + _0x513f71);
  }
})().catch(_0x4f0734 => $.logErr(_0x4f0734)).finally(() => $.done());
async function _0x499914() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    _0x2db99f = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await _0x312771(_0x3d2481, _0x476ef4);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await _0x241a22("activity_load");
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("获取cookie失败");
      return;
    }
    $.toBind = 0;
    $.openLists = [1000015502];
    await _0x241a22("绑定");
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    await _0x241a22("completeState");
    for (let _0x47c338 = 0; _0x47c338 < $.renwulists.length; _0x47c338++) {
      $.missionType = $.renwulists[_0x47c338].type;
      if (!$.renwulists[_0x47c338].isComplete) switch ($.missionType) {
        case "buyHotProducts":
        case "payTrade":
        case "payTradeWeiFenZi":
        case "shareAct":
          break;
        case "openCard":
          for (let _0x27b35e = 0; _0x27b35e < $.openLists.length; _0x27b35e++) {
            $.missionType = "openCard";
            $.open = false;
            $.joinVenderId = $.openLists[_0x27b35e];
            await _0x241a22("kaika");
            await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
            if ($.open == false) {
              $.errorJoinShop = "";
              await _0x51793a();
              await $.wait(parseInt(Math.random() * 3000 + 4500, 10));
              if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
              $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await _0x51793a(), await $.wait(parseInt(Math.random() * 3000 + 4000, 10)));
              await _0x241a22("activity_load");
              await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
            }
          }
          break;
        case "uniteAddCart":
          for (let _0x469bd0 = 0; _0x469bd0 < 1; _0x469bd0++) {
            $.missionType = "uniteAddCart";
            await _0x241a22("mission");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          }
          break;
        case "viewOneConferenceHall":
          for (let _0x23d5d3 = 0; _0x23d5d3 < 1; _0x23d5d3++) {
            $.missionType = "viewOneConferenceHall";
            await _0x241a22("mission");
            await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
          }
          break;
        case "viewOneWeiFenZi":
          for (let _0x17299c = 0; _0x17299c < 1; _0x17299c++) {
            $.missionType = "viewOneWeiFenZi";
            await _0x241a22("mission");
            await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
          }
          break;
        case "shareAct":
          for (let _0x598931 = 0; _0x598931 < 1; _0x598931++) {
            $.missionType = "shareAct";
            await _0x241a22("绑定");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          }
          break;
        default:
          await $.wait(1000);
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    await _0x241a22("activity_load");
    $.runFalag = true;
    let _0x15c9dc = parseInt($.remainPoint / 1);
    console.log("抽卡次数为：" + _0x15c9dc + " 次");
    for (m = 1; _0x15c9dc--; m++) {
      console.log("第" + m + "次抽奖");
      await _0x241a22("carDrawPost");
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      $.dataType = "cardAward";
      await _0x241a22("抽奖");
      if ($.runFalag == false) break;
      if (Number(_0x15c9dc) <= 0) break;
      if (m >= 10) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
    $.getAwardSettingtype = "cardDraw";
    await _0x241a22("getAwardSettingList");
    const _0x1f833d = new Set();
    $.cardName = "";
    $.count = 0;
    $.prizeList = "";
    for (const _0x13ac3a of $.getAwardSettingList) {
      $.cardName = _0x13ac3a?.["awardName"] || "";
      $.count = _0x13ac3a?.["carNum"] || 0;
      _0x13ac3a.carNum >= 0 ? _0x1f833d.add(_0x13ac3a.carNum) : "";
      $.prizeList += $.cardName + "x" + $.count + "，";
    }
    console.log("目前已有卡片：" + $.prizeList);
    var _0x4951a8 = Array.from(_0x1f833d),
      _0x39f81e = _0xcad625(_0x4951a8, "min");
    console.log("\n目前集齐：" + _0x39f81e + "次\n");
    for (let _0xf80451 = 0; _0xf80451 < _0x39f81e; _0xf80451++) {
      console.log("第" + (_0xf80451 + 1) + "次集满抽奖");
      $.dataType = "CompleteCardAward";
      $.carDrawPostid = "";
      await _0x241a22("抽奖");
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
    $.getAwardSettingtype = "exchange";
    await _0x241a22("getAwardSettingList");
    for (const _0x71025b of $.getAwardSettingList) {
      console.log("奖品：" + _0x71025b.awardName + "  数量：" + _0x71025b.remainNum + "  条件：" + _0x71025b.awardDes + "  兑换ID：" + _0x71025b.id);
    }
    $.exchangePostawardId ? (console.log(""), await _0x241a22("exchangePost")) : (console.log(""), console.log("未填写兑换ID，不进行兑换"));
    $.krprizeList = "";
    await _0x241a22("getAwardlist");
    for (const _0xbeaac2 of $.getAwardlist) {
      $.createTime = new Date(parseInt(_0xbeaac2?.["createTime"])).toLocaleString();
      $.krprizeList += _0xbeaac2.awardName + "  时间：" + $.createTime + "\n";
    }
    console.log("\n我的奖品：\n" + $.krprizeList);
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("\n后面的号都会助力:" + $.inviteNick));
  } catch (_0x3a0610) {
    console.log(_0x3a0610);
  }
}
async function _0x241a22(_0x755e1c) {
  if ($.outFlag) return;
  let _0x392fa6 = "https://mpdz-act-dz.isvjcloud.com",
    _0x31d8db = "",
    _0x559596 = "POST",
    _0x1f2bda = "";
  switch (_0x755e1c) {
    case "activity_load":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", _0x1f2bda = {
        "jdToken": $.Token,
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) _0x1f2bda = {
        ..._0x1f2bda,
        "shopId": "" + $.joinVenderId
      };
      _0x31d8db = _0x2e02f7("/jdYangHeJiKa/activity/load", _0x1f2bda);
      break;
    case "mission":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", _0x1f2bda = {
        "missionType": $.missionType
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/mission/completeMission", _0x1f2bda);
      break;
    case "绑定":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", _0x1f2bda = {
        "missionType": "relationBind",
        "inviterNick": $.inviteNick || ""
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/customer/inviteRelation", _0x1f2bda);
      break;
    case "kaika":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", _0x1f2bda = {
        "missionType": $.missionType,
        "shopId": $.joinVenderId,
        "userId": "10299171",
        "inviterNick": $.inviteNick || ""
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/mission/completeMission", _0x1f2bda);
      break;
    case "completeState":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/mission/completeState?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", _0x1f2bda = {}, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/mission/completeState", _0x1f2bda);
      break;
    case "抽奖":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/carDraw/carDeckDraw?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || ""), _0x1f2bda = {
        "dataType": $.dataType,
        "awardId": $.carDrawPostid
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/carDraw/carDeckDraw", _0x1f2bda);
      break;
    case "getAwardSettingList":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/awards/getAwardSettingList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || ""), _0x1f2bda = {
        "dataType": $.getAwardSettingtype
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/awards/getAwardSettingList", _0x1f2bda);
      break;
    case "getAwardlist":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/awards/list?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || ""), _0x1f2bda = {
        "pageNo": 1,
        "pageSize": 10
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/awards/list", _0x1f2bda);
      break;
    case "carDrawPost":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/carDraw/carDrawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || ""), _0x1f2bda = {
        "dataType": "cardDraw"
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/carDraw/carDrawPost", _0x1f2bda);
      break;
    case "exchangePost":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/interactive/exchangePost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || ""), _0x1f2bda = {
        "dataType": "exchange",
        "awardId": $.exchangePostawardId
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/interactive/exchangePost", _0x1f2bda);
      break;
    case "updateAddress":
      url = _0x392fa6 + "/dm/front/jdYangHeJiKa/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", _0x1f2bda = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      }, _0x31d8db = _0x2e02f7("/jdYangHeJiKa/awards/updateAddress", _0x1f2bda);
      break;
    default:
      console.log("错误" + _0x755e1c);
  }
  let _0x52235a = _0x372414(url, _0x31d8db, _0x559596);
  return new Promise(async _0x2fa52b => {
    $.post(_0x52235a, (_0x52cfbc, _0x1733e8, _0x231dfb) => {
      try {
        _0x52cfbc ? (_0x1733e8 && _0x1733e8.statusCode && _0x1733e8.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("API请求失败，请检查网路重试")) : _0xc89594(_0x755e1c, _0x231dfb);
      } catch (_0x27f4e8) {
        console.log(_0x27f4e8, _0x1733e8);
      } finally {
        _0x2fa52b();
      }
    });
  });
}
async function _0xc89594(_0x281d47, _0x2ee3e0) {
  let _0x1aa733 = "";
  try {
    (_0x281d47 != "accessLogWithAD" || _0x281d47 != "drawContent") && _0x2ee3e0 && (_0x1aa733 = JSON.parse(_0x2ee3e0));
  } catch (_0x4a5bbd) {
    console.log("执行任务异常");
    console.log(_0x2ee3e0);
    $.runFalag = false;
  }
  try {
    let _0xf6cd1a = "";
    switch (_0x281d47) {
      case "completeState":
        if (typeof _0x1aa733 == "object") {
          if (_0x1aa733.success && _0x1aa733.success === true && _0x1aa733.data) {
            if (_0x1aa733.data.status && _0x1aa733.data.status == 200) {
              $.renwulists = _0x1aa733.data.data || [];
            }
          } else _0x1aa733.message ? console.log("" + (_0x1aa733.message || "")) : console.log(_0x2ee3e0);
        } else console.log(_0x2ee3e0);
        break;
      case "getAwardSettingList":
        if (typeof _0x1aa733 == "object") {
          if (_0x1aa733.success && _0x1aa733.success === true && _0x1aa733.data) {
            _0x1aa733.data.status && _0x1aa733.data.status == 200 && ($.getAwardSettingList = _0x1aa733.data.data.awardSettings || []);
          } else {
            if (_0x1aa733.message) console.log("" + (_0x1aa733.message || ""));else {
              console.log(_0x2ee3e0);
            }
          }
        } else console.log(_0x2ee3e0);
        break;
      case "getAwardlist":
        if (typeof _0x1aa733 == "object") {
          if (_0x1aa733.success && _0x1aa733.success === true && _0x1aa733.data) _0x1aa733.data.status && _0x1aa733.data.status == 200 && ($.getAwardlist = _0x1aa733.data.data.list || []);else {
            if (_0x1aa733.message) console.log("" + (_0x1aa733.message || ""));else {
              console.log(_0x2ee3e0);
            }
          }
        } else console.log(_0x2ee3e0);
        break;
      case "抽奖":
        if (typeof _0x1aa733 == "object") {
          if (_0x1aa733.success && _0x1aa733.success === true && _0x1aa733.data) {
            if (_0x1aa733.data.status && _0x1aa733.data.status == 200) {
              if (_0x1aa733.data.data.sendResult) console.log("抽中：" + _0x1aa733.data.data.awardSetting.awardName), _0x1aa733.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = _0x1aa733.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await _0x241a22("updateAddress"), await $.wait(4000));else !_0x1aa733.data.data.result ? console.log("抽中：💔 空气") : console.log(_0x1aa733.data.data);
            } else _0x1aa733.data.status && _0x1aa733.data.status == 500 && console.log("" + (_0x1aa733.data.msg || ""));
          } else _0x1aa733.message ? console.log("" + (_0x1aa733.message || "")) : console.log(_0x2ee3e0);
        } else console.log(_0x2ee3e0);
        break;
      case "exchangePost":
        if (typeof _0x1aa733 == "object") {
          if (_0x1aa733.success && _0x1aa733.success === true && _0x1aa733.data) {
            if (_0x1aa733.data.status && _0x1aa733.data.status == 200) {
              if (_0x1aa733.data.data.sendResult) {
                console.log("兑换成功，获得：" + _0x1aa733.data.data.awardSetting.awardName);
                _0x1aa733.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = _0x1aa733.data.data.awardSendLog.id, console.log("兑换实物成功，奖品领取ID：" + $.actLogId), await _0x241a22("updateAddress"), await $.wait(4000));
              } else !_0x1aa733.data.data.result ? console.log("兑换成功，💔 空气 （只能兑换一次）") : console.log(_0x1aa733.data.data);
            } else _0x1aa733.data.status && _0x1aa733.data.status == 500 && console.log("" + (_0x1aa733.data.msg || ""));
          } else _0x1aa733.message ? console.log("" + (_0x1aa733.message || "")) : console.log(_0x2ee3e0);
        } else {
          console.log(_0x2ee3e0);
        }
        break;
      case "carDrawPost":
        if (typeof _0x1aa733 == "object") {
          if (_0x1aa733.success && _0x1aa733.success === true && _0x1aa733.data) {
            if (_0x1aa733.data.status && _0x1aa733.data.status == 200) {
              if (_0x1aa733.data.data.awardSetting) $.carDrawPostid = _0x1aa733.data.data.awardSetting.id, console.log("抽中：" + _0x1aa733.data.data.awardSetting.awardName + "(" + $.carDrawPostid + ")");else !_0x1aa733.data.data.result ? console.log("💔 空气") : console.log(_0x1aa733.data.data);
            } else _0x1aa733.data.status && _0x1aa733.data.status == 500 && console.log("" + (_0x1aa733.data.msg || ""));
          } else _0x1aa733.message ? console.log("" + (_0x1aa733.message || "")) : console.log(_0x2ee3e0);
        } else console.log(_0x2ee3e0);
        break;
      case "updateAddress":
        if (typeof _0x1aa733 == "object") {
          if (_0x1aa733.success && _0x1aa733.success === true && _0x1aa733.data) {
            if (_0x1aa733.data.status && _0x1aa733.data.status == 200) {
              if (_0x1aa733.data.data.result) {
                console.log("💖 地址填写成功，返回：" + _0x1aa733.data.data.msg);
              } else console.log(_0x1aa733.data.data);
            } else _0x1aa733.data.status && _0x1aa733.data.status == 500 && console.log("" + (_0x1aa733.data.msg || ""));
          } else _0x1aa733.message ? console.log("" + (_0x1aa733.message || "")) : console.log(_0x2ee3e0);
        } else console.log(_0x2ee3e0);
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
        _0xf6cd1a = "";
        if (_0x281d47 == "followShop") _0xf6cd1a = "关注";
        if (_0x281d47 == "addCart") _0xf6cd1a = "加购";
        if (typeof _0x1aa733 == "object") {
          if (_0x1aa733.success && _0x1aa733.success === true && _0x1aa733.data) {
            if (_0x1aa733.data.status && _0x1aa733.data.status == 200) {
              _0x1aa733 = _0x1aa733.data;
              if (_0x281d47 != "setMixNick" && (_0x1aa733.msg || _0x1aa733.data.isOpenCard || _0x1aa733.data.remark)) console.log("" + (_0xf6cd1a && _0xf6cd1a + ":" || "") + (_0x1aa733.msg || _0x1aa733.data.isOpenCard || _0x1aa733.data.remark || ""));
              if (_0x281d47 == "activity_load") {
                if (_0x1aa733.data) {
                  $.endTime = _0x1aa733.data.cusActivity.endTime || 0;
                  $.MixNick = _0x1aa733.data.missionCustomer.buyerNick || "";
                  $.remainPoint = _0x1aa733.data.missionCustomer.remainPoint || 0;
                  $.remainChance = _0x1aa733.data.missionCustomer.remainChance || 0;
                  $.usedPoint = _0x1aa733.data.missionCustomer.usedPoint || 0;
                  $.hasCollectShop = _0x1aa733.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = _0x1aa733.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (_0x281d47 == "shopList") _0x1aa733.data && ($.openLists = _0x1aa733.data);else {
                  if (_0x281d47 == "mission") _0x1aa733.data.remark.indexOf("赶紧去开卡吧") > -1 ? $.open = true : $.open = false;else {
                    if (_0x281d47 == "uniteOpenCardOne") $.uniteOpenCar = _0x1aa733.msg || _0x1aa733.data.msg || "";else {
                      if (_0x281d47 == "myAward") {
                        console.log("我的奖品：");
                        let _0x31ed23 = 0;
                        for (let _0x3bc8c4 in _0x1aa733.data.list || []) {
                          let _0x8056ef = _0x1aa733.data.list[_0x3bc8c4];
                          _0x31ed23 += Number(_0x8056ef.awardDes);
                        }
                        if (_0x31ed23 > 0) console.log("共获得" + _0x31ed23 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else _0x281d47 == "missionInviteList" && console.log("邀请人数(" + _0x1aa733.data.total + ")");
                    }
                  }
                }
              }
            } else {
              if (_0x1aa733.data.msg) _0x1aa733.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true), console.log("" + (_0x1aa733.data.msg || ""));else {
                if (_0x1aa733.errorMessage) {
                  if (_0x1aa733.errorMessage.indexOf("火爆") > -1) {}
                  console.log("" + (_0x1aa733.errorMessage || ""));
                } else console.log("" + _0x2ee3e0);
              }
            }
          } else _0x1aa733.errorMessage ? console.log("" + (_0x1aa733.errorMessage || "")) : console.log("" + _0x2ee3e0);
        } else console.log("" + _0x2ee3e0);
        break;
      default:
        console.log((_0xf6cd1a || _0x281d47) + "-> " + _0x2ee3e0);
    }
    if (typeof _0x1aa733 == "object") {
      if (_0x1aa733.errorMessage) {
        if (_0x1aa733.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (_0x12011a) {
    console.log(_0x12011a);
  }
}
function _0x372414(_0x544667, _0x5328dc, _0x59b1d5 = "POST") {
  let _0x474573 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": _0x3d2481,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x544667.indexOf("https://mpdz-act-dz.isvjcloud.com") > -1) {
    _0x474573.Origin = "https://mpdz-act-dz.isvjcloud.com";
    _0x474573["Content-Type"] = "application/json; charset=utf-8";
    delete _0x474573.Cookie;
  }
  return {
    "url": _0x544667,
    "method": _0x59b1d5,
    "headers": _0x474573,
    "body": _0x5328dc,
    "timeout": 60000
  };
}
function _0x2e02f7(_0x56b224, _0xb4feaf) {
  d = {
    "actId": $.actId,
    ..._0xb4feaf,
    "method": _0x56b224,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = _0x32d3d8(d);
  const _0x1482c2 = {
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
        ..._0xb4feaf,
        "method": _0x56b224,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return _0x56b224.indexOf("missionInviteList") > -1 && delete _0x1482c2.params.admJson.actId, $.toStr(_0x1482c2, _0x1482c2);
}
function _0x32d3d8(_0x550189) {
  AppSecret = "01315faaab3f4bfb8446fa54aa579321";
  key = "8bd7eeb6c96e4145864af794bb2cadd0";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(_0x550189));
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
function _0x1125cb(_0x1e78b1) {
  _0x1e78b1 = _0x1e78b1 || 32;
  let _0x5f42c8 = "abcdef0123456789",
    _0x5914e4 = _0x5f42c8.length,
    _0x5cc997 = "";
  for (i = 0; i < _0x1e78b1; i++) _0x5cc997 += _0x5f42c8.charAt(Math.floor(Math.random() * _0x5914e4));
  return _0x5cc997;
}
function _0x251c0d(_0x499bf7) {
  if (typeof _0x499bf7 == "string") {
    try {
      return JSON.parse(_0x499bf7);
    } catch (_0x23d472) {
      return console.log(_0x23d472), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function _0x25ee8b() {
  await _0x6b75c6("isvObfuscator", {
    "id": "",
    "url": "https://mpdz-act-dz.isvjcloud.com"
  });
  let _0x5cdac0 = {
    "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x3d2481,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + _0x6b75c6.body
  };
  return new Promise(_0x3526dc => {
    $.post(_0x5cdac0, (_0x17ca1c, _0x59c830, _0x183586) => {
      try {
        if (_0x17ca1c) {} else {
          if (_0x183586) _0x183586 = JSON.parse(_0x183586), _0x183586.code === "0" && ($.Token = _0x183586.token);else {}
        }
      } catch (_0xcf76ed) {
        $.log(_0xcf76ed);
      } finally {
        _0x3526dc();
      }
    });
  });
}
function _0x6b75c6(_0x2c9399, _0x4f9893) {
  let _0xc3fba8 = {
      "fn": _0x2c9399,
      "body": JSON.stringify(_0x4f9893)
    },
    _0x14f02e = {
      "url": "http://api.kingran.ml/sign",
      "body": JSON.stringify(_0xc3fba8),
      "headers": {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Cookie": _0x3d2481,
        "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json"
      },
      "timeout": 30000
    };
  return new Promise(async _0x5dec52 => {
    $.post(_0x14f02e, (_0x1c86c8, _0x438b13, _0x10a1f4) => {
      try {
        if (_0x1c86c8) {} else {
          _0x10a1f4 = JSON.parse(_0x10a1f4);
          if (typeof _0x10a1f4 === "object" && _0x10a1f4 && _0x10a1f4.body) $.Signz = _0x10a1f4.body || "";else {}
        }
      } catch (_0x5636c9) {
        $.logErr(_0x5636c9, _0x438b13);
      } finally {
        _0x5dec52(_0x10a1f4);
      }
    });
  });
}
async function _0x51793a() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x3a95ae => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x5b2fc7 = "";
    if ($.shopactivityId) _0x5b2fc7 = ",\"activityId\":" + $.shopactivityId;
    const _0x39455d = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x5b2fc7 + ",\"channel\":406}",
      _0x37c059 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x39455d)
      },
      _0x1b3fb8 = await _0x42fd10("8adfb", _0x37c059),
      _0x210f76 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x39455d + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x1b3fb8),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x3d2481,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x210f76, async (_0x23ad7b, _0x4af741, _0x3c252b) => {
      try {
        if (_0x23ad7b) _0x4af741 && typeof _0x4af741.statusCode != "undefined" && _0x4af741.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          _0x3c252b = _0x3c252b && _0x3c252b.match(/jsonp_.*?\((.*?)\);/) && _0x3c252b.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3c252b;
          let _0x165b39 = $.toObj(_0x3c252b, _0x3c252b);
          if (_0x165b39 && typeof _0x165b39 == "object") {
            if (_0x165b39 && _0x165b39.success === true) {
              console.log(" >> " + _0x165b39.message);
              $.errorJoinShop = _0x165b39.message;
              if (_0x165b39.result && _0x165b39.result.giftInfo) {
                for (let _0xfeea47 of _0x165b39.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + _0xfeea47.discountString + _0xfeea47.prizeName + _0xfeea47.secondLineDesc);
                }
              }
            } else {
              if (_0x165b39 && typeof _0x165b39 == "object" && _0x165b39.message) $.errorJoinShop = _0x165b39.message, console.log("" + (_0x165b39.message || ""));else {
                console.log(_0x3c252b);
              }
            }
          } else console.log(_0x3c252b);
        }
      } catch (_0x4e152b) {
        $.logErr(_0x4e152b, _0x4af741);
      } finally {
        _0x3a95ae();
      }
    });
  });
}
async function _0x50b607() {
  return new Promise(async _0x4ba9d1 => {
    const _0x1aae1f = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      _0x4863d2 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x1aae1f)
      },
      _0x279654 = await _0x42fd10("8adfb", _0x4863d2),
      _0x39fa4f = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x1aae1f + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x279654),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x3d2481,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x39fa4f, async (_0x418d84, _0x12e345, _0x221963) => {
      try {
        if (_0x418d84) _0x12e345 && typeof _0x12e345.statusCode != "undefined" && _0x12e345.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          _0x221963 = _0x221963 && _0x221963.match(/jsonp_.*?\((.*?)\);/) && _0x221963.match(/jsonp_.*?\((.*?)\);/)[1] || _0x221963;
          let _0x36f6f3 = $.toObj(_0x221963, _0x221963);
          if (_0x36f6f3 && typeof _0x36f6f3 == "object") {
            if (_0x36f6f3 && _0x36f6f3.success == true) {
              console.log("去加入：" + (_0x36f6f3.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = _0x36f6f3.result.interestsRuleList && _0x36f6f3.result.interestsRuleList[0] && _0x36f6f3.result.interestsRuleList[0].interestsInfo && _0x36f6f3.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else console.log(_0x221963);
        }
      } catch (_0x41368b) {
        $.logErr(_0x41368b, _0x12e345);
      } finally {
        _0x4ba9d1();
      }
    });
  });
}
function _0x1e7ff8(_0x31aa57) {
  return new Promise(_0x11934a => {
    const _0x485b66 = {
      "url": "" + _0x31aa57,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x485b66, async (_0x3b6e2a, _0x3350ef, _0x436205) => {
      try {
        if (_0x3b6e2a) {} else _0x436205 ? _0x436205 = JSON.parse(_0x436205) : console.log("未获取到数据,请重新运行");
      } catch (_0x41168e) {
        $.logErr(_0x41168e, _0x3350ef);
        _0x436205 = null;
      } finally {
        _0x11934a(_0x436205);
      }
    });
  });
}
function _0x247817(_0x55eb95, _0x505304) {
  return Math.floor(Math.random() * (_0x505304 - _0x55eb95)) + _0x55eb95;
}
function _0xcad625(_0x5c41a8, _0x27b568) {
  if (_0x27b568 === "max") return Math.max.apply(Math, _0x5c41a8);else {
    if (_0x27b568 === "min") return Math.min.apply(Math, _0x5c41a8);
  }
}