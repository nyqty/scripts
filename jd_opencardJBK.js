/*
JoinCommon开卡专用


支持类型：
https://lzdz1-isv.isvjcloud.com/m/unite/dzlh0001?activityId=< 活动ID >&venderId=1000090821&adSource=QCJKKX
https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=< 活动ID >

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行

//export opencard_id="ID" // 活动ID
//export opencard_open="true" // 开启开卡
//export opencard_addCart="true" // 开启加购
//export opencard_draw="3" // 抽奖次数
————————————————

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#JoinCommon开卡专用
1 1 1 1 * jd_opencardJBK.js, tag=JoinCommon开卡专用, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('JoinCommon开卡专用');
const _0x41ee72 = $.isNode() ? require("./jdCookie.js") : "",
  _0xc3aa2b = $.isNode() ? require("./sendNotify") : "";
let _0xa45d40 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  _0x2e3aae = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false,
  _0x4c15f0 = process.env.opencard_id ? process.env.opencard_id : "",
  _0x3c93ec = process.env.opencard_open ? process.env.opencard_open : "false";
const _0x481412 = require("./function/krgetToken"),
  _0xf617b7 = require("./function/krh5st");
let _0x445817 = "https://lzdz1-isv.isvjcloud.com",
  _0x38afbb = [],
  _0x59689e = "",
  _0x50bc4b = {};
if ($.isNode()) {
  Object.keys(_0x41ee72).forEach(_0x2b0b57 => {
    _0x38afbb.push(_0x41ee72[_0x2b0b57]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x38afbb = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x229c50($.getdata("CookiesJD") || "[]").map(_0x5759c3 => _0x5759c3.cookie)].filter(_0x551acf => !!_0x551acf);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let _0x1b5e42 = "",
  _0x4c5176 = "",
  _0x2c7c94 = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  _0x5c2f4f = "",
  _0x2584fa = "";
$.whitelist = process.env.jd_opencard_whitelist || _0x5c2f4f;
$.blacklist = process.env.jd_opencard_blacklist || _0x2584fa;
_0x273536();
_0x252cc4();
$.errMsgPin = [];
!(async () => {
  if (!_0x4c15f0) {
    console.log("活动ID未填写，设置变量：export opencard_id=\"ID\"");
    return;
  }
  if (_0x2c7c94 === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!_0x38afbb[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = [""];
  $.activityId = _0x4c15f0;
  $.authorCode = authorCodeList[_0x4e51bf(0, authorCodeList.length)];
  $.shareUuid = $.authorCode;
  console.log("活动入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "\n");
  console.log("默认不开卡，需开卡请设置变量 [opencard_open]，变量值为 true");
  console.log("默认不加购，需加购请设置变量 [opencard_addCart]，变量值为 true");
  console.log("默认不抽奖，需抽奖请设置变量 [opencard_draw]，变量值为抽奖次数");
  for (let _0x449059 = 0; _0x449059 < _0x38afbb.length; _0x449059++) {
    _0x59689e = _0x38afbb[_0x449059];
    originCookie = _0x38afbb[_0x449059];
    if (_0x59689e) {
      $.UserName = decodeURIComponent(_0x59689e.match(/pt_pin=([^; ]+)(?=;?)/) && _0x59689e.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x449059 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await _0x62c5fd();
      await _0x5a98aa();
      await $.wait(1500);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let _0x130a3e = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + _0x130a3e;
  }
  if ($.outFlag) {
    let _0x21f493 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + _0x21f493);
    if ($.isNode()) await _0xc3aa2b.sendNotify("" + $.name, "" + _0x21f493);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(_0xd0d641 => $.logErr(_0xd0d641)).finally(() => $.done());
async function _0x5a98aa() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    _0x1b5e42 = "";
    $.Token = "";
    $.Pin = "";
    let _0x52e66f = false;
    $.Token = await _0x481412(_0x59689e, _0x445817);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await _0x25519b();
    if (_0x4c5176 == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请更换IP后再执行脚本\n");
      return;
    }
    await _0x37b827("getSimpleActInfoVo");
    await _0x37b827("getMyPing");
    if (!$.Pin) {
      console.log("此号已黑，请加入黑名单");
      return;
    }
    await _0x37b827("accessLogWithAD");
    await _0x37b827("activityContent");
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    await _0x37b827("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await _0x37b827("checkOpenCard");
    await $.wait(1000);
    await _0x37b827("taskRecord");
    await $.wait(1000);
    await _0x37b827("assist");
    if (_0x3c93ec == "true") {
      if ($.allOpenCard == false) {
        console.log("开卡任务：");
        for (o of $.openList) {
          $.openCard = false;
          if (!$.openVenderId.includes(o.value * 1)) {
            _0x52e66f = true;
            $.shopactivityId = "";
            $.joinVenderId = o.venderId || o.value;
            await _0x1d8eb8();
            for (let _0x5e5078 = 0; _0x5e5078 < Array(2).length; _0x5e5078++) {
              if (_0x5e5078 > 0) console.log("第" + _0x5e5078 + "次 重新开卡");
              await _0x312677();
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
              if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
            }
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
              console.log("💔 可能是开卡黑号,跳过运行");
              return;
            }
            await _0x37b827("activityContent");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
        }
      } else console.log("已全部开卡");
    }
    !$.followShop && !$.outFlag && (console.log(""), await _0x37b827("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    _0x2e3aae && !$.addCart && !$.outFlag && (await _0x37b827("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await _0x37b827("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await _0x37b827("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    _0x52e66f && (await _0x37b827("activityContent"));
    if (_0xa45d40 + "" !== "0") {
      $.runFalag = true;
      let _0x355914 = parseInt($.score / 100);
      _0xa45d40 = parseInt(_0xa45d40, 10);
      if (_0x355914 > _0xa45d40) _0x355914 = _0xa45d40;
      console.log("可抽奖次数为" + _0x355914 + "次，当前有" + $.score + "金币");
      for (m = 1; _0x355914--; m++) {
        console.log("进行第" + m + "次抽奖");
        await _0x37b827("startDraw");
        if ($.runFalag == false) break;
        if (Number(_0x355914) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    }
    if ($.outFlag) {
      console.log("🚫 此ip已被限制，请更换IP后再执行脚本\n");
      return;
    }
    console.log("\n当前已邀请" + $.assistCount + "人");
    await _0x37b827("drawRecord");
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("后面的号都会助力 -> " + $.shareUuid);
    }
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (_0x1dbab8) {
    console.log(_0x1dbab8);
  }
}
async function _0x37b827(_0x238836) {
  if ($.outFlag) return;
  let _0x1bd377 = "https://lzdz1-isv.isvjcloud.com",
    _0xab7054 = "",
    _0x66f414 = "POST";
  switch (_0x238836) {
    case "getSimpleActInfoVo":
      url = _0x1bd377 + "/dz/common/getSimpleActInfoVo";
      _0xab7054 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = _0x1bd377 + "/customer/getMyPing";
      _0xab7054 = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = _0x1bd377 + "/common/accessLogWithAD";
      let _0x1fd359 = _0x1bd377 + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      _0xab7054 = "venderId=" + $.venderId + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x1fd359) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = _0x1bd377 + "/wxActionCommon/getUserInfo";
      _0xab7054 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = _0x1bd377 + "/dingzhi/joinCommon/activityContent";
      _0xab7054 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = _0x1bd377 + "/dingzhi/joinCommon/drawContent";
      _0xab7054 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = _0x1bd377 + "/dingzhi/joinCommon/taskInfo";
      _0xab7054 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = _0x1bd377 + "/dingzhi/joinCommon/assist";
      _0xab7054 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = _0x1bd377 + "/dingzhi/joinCommon/taskRecord";
      _0xab7054 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = _0x1bd377 + "/dingzhi/joinCommon/doTask";
      _0xab7054 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = _0x1bd377 + "/dingzhi/joinCommon/doTask";
      _0xab7054 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = _0x1bd377 + "/dingzhi/joinCommon/doTask";
      _0xab7054 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = _0x1bd377 + "/dingzhi/opencard/" + _0x238836;
      _0xab7054 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (_0x238836 == "browseGoods") _0xab7054 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = _0x1bd377 + "/dingzhi/opencard/" + _0x238836;
      let _0x2aad88 = "",
        _0xe091e9 = "";
      if (_0x238836 == "viewVideo") {
        _0x2aad88 = 31;
        _0xe091e9 = 31;
      } else {
        if (_0x238836 == "visitSku") {
          _0x2aad88 = 5;
          _0xe091e9 = $.visitSkuValue || 5;
        } else {
          if (_0x238836 == "toShop") {
            _0x2aad88 = 14;
            _0xe091e9 = $.toShopValue || 14;
          } else _0x238836 == "addSku" && (_0x2aad88 = 2, _0xe091e9 = $.addSkuValue || 2);
        }
      }
      _0xab7054 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + _0x2aad88 + "&taskValue=" + _0xe091e9;
      break;
    case "drawRecord":
      url = _0x1bd377 + "/dingzhi/joinCommon/drawRecord";
      _0xab7054 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = _0x1bd377 + "/dingzhi/joinCommon/shareRecord";
      _0xab7054 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = _0x1bd377 + "/dingzhi/joinCommon/startDraw";
      _0xab7054 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + _0x238836);
  }
  let _0x575d72 = _0x10e79e(url, _0xab7054, _0x66f414);
  return new Promise(async _0x17a8b0 => {
    $.post(_0x575d72, (_0x287bf7, _0x5b23bf, _0xffcf07) => {
      try {
        _0x311742(_0x5b23bf);
        _0x287bf7 ? (_0x5b23bf && typeof _0x5b23bf.statusCode != "undefined" && _0x5b23bf.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n"), console.log("" + $.toStr(_0x287bf7, _0x287bf7)), console.log(_0x238836 + " API请求失败，请检查网路重试")) : _0x349050(_0x238836, _0xffcf07);
      } catch (_0x4d2b82) {
        console.log(_0x4d2b82, _0x5b23bf);
      } finally {
        _0x17a8b0();
      }
    });
  });
}
async function _0x349050(_0xeab84c, _0x59486e) {
  let _0x4eab08 = "";
  try {
    (_0xeab84c != "accessLogWithAD" || _0xeab84c != "drawContent") && _0x59486e && (_0x4eab08 = JSON.parse(_0x59486e));
  } catch (_0x489831) {
    console.log(_0xeab84c + " 执行任务异常");
    console.log(_0x59486e);
    $.runFalag = false;
  }
  try {
    switch (_0xeab84c) {
      case "getSimpleActInfoVo":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            if (typeof _0x4eab08.data.shopId != "undefined") $.shopId = _0x4eab08.data.shopId;
            if (typeof _0x4eab08.data.venderId != "undefined") $.venderId = _0x4eab08.data.venderId;
          } else _0x4eab08.errorMessage ? console.log(_0xeab84c + " " + (_0x4eab08.errorMessage || "")) : console.log(_0xeab84c + " " + _0x59486e);
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "getMyPing":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            if (_0x4eab08.data && typeof _0x4eab08.data.secretPin != "undefined") $.Pin = _0x4eab08.data.secretPin;
            if (_0x4eab08.data && typeof _0x4eab08.data.nickname != "undefined") $.nickname = _0x4eab08.data.nickname;
          } else _0x4eab08.errorMessage ? (console.log("" + (_0x4eab08.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log(_0xeab84c + " " + _0x59486e);
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "getUserInfo":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            if (_0x4eab08.data && typeof _0x4eab08.data.yunMidImageUrl != "undefined") $.attrTouXiang = _0x4eab08.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else _0x4eab08.errorMessage ? console.log(_0xeab84c + " " + (_0x4eab08.errorMessage || "")) : console.log(_0xeab84c + " " + _0x59486e);
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "activityContent":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            $.endTime = _0x4eab08.data.endTime || _0x4eab08.data.activityVo && _0x4eab08.data.activityVo.endTime || _0x4eab08.data.activity.endTime || 0;
            $.hasEnd = _0x4eab08.data.isEnd || false;
            $.score = _0x4eab08.data.actorInfo.score || 0;
            $.actorUuid = _0x4eab08.data.actorInfo.uuid || "";
            $.assistCount = _0x4eab08.data.actorInfo.assistCount || 0;
          } else _0x4eab08.errorMessage ? console.log(_0xeab84c + " " + (_0x4eab08.errorMessage || "")) : console.log(_0xeab84c + " " + _0x59486e);
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "assist":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            $.assistState = _0x4eab08.data.assistState || 0;
            $.allOpenCard = _0x4eab08.data.openCardInfo.openAll || false;
            $.openVenderId = _0x4eab08.data.openCardInfo.openVenderId || [];
          } else _0x4eab08.errorMessage ? console.log(_0xeab84c + " " + (_0x4eab08.errorMessage || "")) : console.log(_0xeab84c + " " + _0x59486e);
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "taskRecord":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            $.followShop = _0x4eab08.data["20"].recordCount || 0;
            $.addCart = _0x4eab08.data["23"].recordCount || 0;
            $.visitSku = _0x4eab08.data["10"].recordCount || 0;
          } else _0x4eab08.errorMessage ? console.log(_0xeab84c + " " + (_0x4eab08.errorMessage || "")) : console.log(_0xeab84c + " " + _0x59486e);
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "checkOpenCard":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            let _0x1fe23d = _0x4eab08.data["10"].settingInfo || [],
              _0x3b97ef = _0x4eab08.data.cardList || [],
              _0x3fec58 = _0x4eab08.data.openCardList || [];
            $.openList = [..._0x3b97ef, ..._0x1fe23d, ..._0x3fec58];
            $.openCardScore1 = _0x4eab08.data.score1 || 0;
            $.openCardScore2 = _0x4eab08.data.score2 || 0;
            $.drawScore = _0x4eab08.data.drawScore || 0;
            if (_0x4eab08.data.beans || _0x4eab08.data.addBeanNum) console.log("开卡获得：" + (_0x4eab08.data.beans || _0x4eab08.data.addBeanNum) + "京豆 🐶");
          } else _0x4eab08.errorMessage ? console.log(_0xeab84c + " " + (_0x4eab08.errorMessage || "")) : console.log(_0xeab84c + " " + _0x59486e);
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "followShop":
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "addSku":
      case "sign":
      case "addCart":
      case "browseGoods":
      case "startDraw":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            if (typeof _0x4eab08.data == "object") {
              let _0x5db31f = "",
                _0x24e592 = "抽奖";
              if (_0x4eab08.data.addBeanNum) {
                _0x5db31f = _0x4eab08.data.addBeanNum + "京豆";
              }
              _0x4eab08.data.addPoint && (_0x5db31f += " " + _0x4eab08.data.addPoint + "游戏机会");
              if (_0xeab84c == "followShop") {
                _0x24e592 = "关注";
                _0x4eab08.data.beans != "0" && (_0x5db31f += _0x4eab08.data.beans + "京豆 🐶");
              } else {
                if (_0xeab84c == "addSku" || _0xeab84c == "addCart") {
                  _0x24e592 = "加购";
                  _0x4eab08.data.beans != "0" && (_0x5db31f += _0x4eab08.data.beans + "京豆 🐶");
                } else {
                  if (_0xeab84c == "viewVideo") _0x24e592 = "热门文章";else {
                    if (_0xeab84c == "toShop") _0x24e592 = "浏览店铺";else {
                      if (_0xeab84c == "visitSku" || _0xeab84c == "browseGoods") _0x24e592 = "浏览商品";else {
                        if (_0xeab84c == "sign") _0x24e592 = "签到";else {
                          let _0x35be59 = typeof _0x4eab08.data.drawOk === "object" && _0x4eab08.data.drawOk || _0x4eab08.data;
                          _0x5db31f = _0x35be59.drawOk == true && _0x35be59.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !_0x5db31f && (_0x5db31f = "空气 💨");
              console.log(_0x24e592 + "获得：" + (_0x5db31f || _0x59486e));
            } else console.log("" + _0x59486e);
          } else _0x4eab08.errorMessage ? ($.runFalag = false, console.log("" + (_0x4eab08.errorMessage || ""))) : console.log("" + _0x59486e);
        } else console.log("" + _0x59486e);
        break;
      case "drawRecord":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true) {
            let _0x2ece69 = 0;
            for (let _0x5e4d15 of _0x4eab08.data) {
              infoType = _0x5e4d15.infoType;
              infoName = _0x5e4d15.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  _0x2ece69 += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await _0xc3aa2b.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await _0xc3aa2b.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            _0x2ece69 > 0 && console.log("当前累计获得 " + _0x2ece69 + " 京豆 🐶");
          } else _0x4eab08.errorMessage ? console.log(_0xeab84c + " " + (_0x4eab08.errorMessage || "")) : console.log(_0xeab84c + " " + _0x59486e);
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "getShareRecord":
        if (typeof _0x4eab08 == "object") {
          if (_0x4eab08.result && _0x4eab08.result === true && _0x4eab08.data) {
            $.ShareCount = _0x4eab08.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else {
            if (_0x4eab08.errorMessage) {
              console.log(_0xeab84c + " " + (_0x4eab08.errorMessage || ""));
            } else {
              console.log(_0xeab84c + " " + _0x59486e);
            }
          }
        } else console.log(_0xeab84c + " " + _0x59486e);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(_0xeab84c + "-> " + _0x59486e);
    }
    if (typeof _0x4eab08 == "object") {
      if (_0x4eab08.errorMessage) {
        if (_0x4eab08.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (_0x2517f6) {
    console.log(_0x2517f6);
  }
}
function _0x10e79e(_0x427b7e, _0x2ba3e5, _0x4bd6f9 = "POST") {
  let _0x4be300 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": _0x59689e,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x427b7e.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (_0x4be300.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, _0x4be300.Cookie = "" + (_0x1b5e42 && _0x1b5e42 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + _0x4c5176), {
    "url": _0x427b7e,
    "method": _0x4bd6f9,
    "headers": _0x4be300,
    "body": _0x2ba3e5,
    "timeout": 30000
  };
}
function _0x25519b() {
  return new Promise(_0x3b56e2 => {
    let _0x47f71f = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x47f71f, async (_0x125c5a, _0x4b712c, _0x5e5fc9) => {
      try {
        if (_0x125c5a) {
          if (_0x4b712c && typeof _0x4b712c.statusCode != "undefined") {}
          console.log("" + $.toStr(_0x125c5a));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let _0x2414af = _0x5e5fc9.match(/(活动已经结束)/) && _0x5e5fc9.match(/(活动已经结束)/)[1] || "";
          _0x2414af && ($.activityEnd = true, console.log("活动已结束"));
          _0x311742(_0x4b712c);
        }
      } catch (_0x2c74dd) {
        $.logErr(_0x2c74dd, _0x4b712c);
      } finally {
        _0x3b56e2();
      }
    });
  });
}
function _0x311742(_0x42ded2) {
  if (_0x42ded2) {
    if (_0x42ded2.headers["set-cookie"]) {
      _0x59689e = originCookie + ";";
      for (let _0x35e766 of _0x42ded2.headers["set-cookie"]) {
        _0x50bc4b[_0x35e766.split(";")[0].substr(0, _0x35e766.split(";")[0].indexOf("="))] = _0x35e766.split(";")[0].substr(_0x35e766.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x227f63 of Object.keys(_0x50bc4b)) {
        _0x59689e += _0x227f63 + "=" + _0x50bc4b[_0x227f63] + ";";
      }
      _0x4c5176 = _0x59689e;
    }
  }
}
async function _0x62c5fd() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + _0x3ecbfa(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x3ecbfa(_0x4a1ed4) {
  _0x4a1ed4 = _0x4a1ed4 || 32;
  let _0x21173c = "abcdef0123456789",
    _0x6986a3 = _0x21173c.length,
    _0x61a9ce = "";
  for (i = 0; i < _0x4a1ed4; i++) _0x61a9ce += _0x21173c.charAt(Math.floor(Math.random() * _0x6986a3));
  return _0x61a9ce;
}
function _0x229c50(_0x414858) {
  if (typeof _0x414858 == "string") try {
    return JSON.parse(_0x414858);
  } catch (_0x291c7e) {
    return console.log(_0x291c7e), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function _0x312677() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x1a3854 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x38a41f = "";
    if ($.shopactivityId) _0x38a41f = ",\"activityId\":" + $.shopactivityId;
    const _0x30132b = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x38a41f + ",\"channel\":406}",
      _0x52c044 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x30132b)
      };
    for (var _0x4cb46f = "", _0x37230b = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", _0x40963a = 0; _0x40963a < 16; _0x40963a++) {
      var _0x180590 = Math.round(Math.random() * (_0x37230b.length - 1));
      _0x4cb46f += _0x37230b.substring(_0x180590, _0x180590 + 1);
    }
    uuid = Buffer.from(_0x4cb46f, "utf8").toString("base64");
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
    const _0x41ab6d = await _0xf617b7("8adfb", _0x52c044),
      _0x46b816 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x30132b + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x41ab6d),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x59689e,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x46b816, async (_0x16803c, _0x3887f9, _0x49a152) => {
      try {
        if (_0x16803c) {
          if (_0x3887f9 && typeof _0x3887f9.statusCode != "undefined") {
            _0x3887f9.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          _0x49a152 = _0x49a152 && _0x49a152.match(/jsonp_.*?\((.*?)\);/) && _0x49a152.match(/jsonp_.*?\((.*?)\);/)[1] || _0x49a152;
          let _0x39a3fb = $.toObj(_0x49a152, _0x49a152);
          if (_0x39a3fb && typeof _0x39a3fb == "object") {
            if (_0x39a3fb && _0x39a3fb.success === true) {
              console.log(" >> " + _0x39a3fb.message);
              $.errorJoinShop = _0x39a3fb.message;
              if (_0x39a3fb.result && _0x39a3fb.result.giftInfo) for (let _0x4825f3 of _0x39a3fb.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + _0x4825f3.discountString + _0x4825f3.prizeName + _0x4825f3.secondLineDesc);
              }
            } else {
              if (_0x39a3fb && typeof _0x39a3fb == "object" && _0x39a3fb.message) {
                $.errorJoinShop = _0x39a3fb.message;
                console.log("" + (_0x39a3fb.message || ""));
              } else {
                console.log(_0x49a152);
              }
            }
          } else console.log(_0x49a152);
        }
      } catch (_0x1b4c35) {
        $.logErr(_0x1b4c35, _0x3887f9);
      } finally {
        _0x1a3854();
      }
    });
  });
}
async function _0x1d8eb8() {
  return new Promise(async _0x2948bd => {
    const _0x5328ae = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      _0x37dcfb = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x5328ae)
      },
      _0x1168f5 = await _0xf617b7("8adfb", _0x37dcfb),
      _0x690547 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x5328ae + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x1168f5),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x59689e,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x690547, async (_0xdc7e1b, _0x332b5e, _0x3bb1c9) => {
      try {
        if (_0xdc7e1b) {
          if (_0x332b5e && typeof _0x332b5e.statusCode != "undefined") {
            if (_0x332b5e.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x3bb1c9 = _0x3bb1c9 && _0x3bb1c9.match(/jsonp_.*?\((.*?)\);/) && _0x3bb1c9.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3bb1c9;
          let _0x8a66ad = $.toObj(_0x3bb1c9, _0x3bb1c9);
          _0x8a66ad && typeof _0x8a66ad == "object" ? _0x8a66ad && _0x8a66ad.success == true && (console.log("去加入：" + (_0x8a66ad.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = _0x8a66ad.result.interestsRuleList && _0x8a66ad.result.interestsRuleList[0] && _0x8a66ad.result.interestsRuleList[0].interestsInfo && _0x8a66ad.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x3bb1c9);
        }
      } catch (_0x47b683) {
        $.logErr(_0x47b683, _0x332b5e);
      } finally {
        _0x2948bd();
      }
    });
  });
}
function _0x3e9a2a(_0xe4b8ed) {
  return new Promise(_0x34b5bb => {
    const _0x1461b4 = {
      "url": _0xe4b8ed + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x1461b4, async (_0x5b248c, _0x24ed9c, _0x540706) => {
      try {
        if (_0x5b248c) $.getAuthorCodeListerr = false;else {
          if (_0x540706) _0x540706 = JSON.parse(_0x540706);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x4def51) {
        $.logErr(_0x4def51, _0x24ed9c);
        _0x540706 = null;
      } finally {
        _0x34b5bb(_0x540706);
      }
    });
  });
}
function _0x4e51bf(_0x4b24f3, _0x4360f5) {
  return Math.floor(Math.random() * (_0x4360f5 - _0x4b24f3)) + _0x4b24f3;
}
function _0x252cc4() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const _0x1a6ed5 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x1a6ed5.join("&") + "\n");
  let _0xe16859 = _0x1a6ed5,
    _0x5b5720 = [],
    _0x2afd07 = false;
  for (let _0x2ed7f9 = 0; _0x2ed7f9 < _0x38afbb.length; _0x2ed7f9++) {
    let _0x1282da = decodeURIComponent(_0x38afbb[_0x2ed7f9].match(/pt_pin=([^; ]+)(?=;?)/) && _0x38afbb[_0x2ed7f9].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x1282da) break;
    let _0x357765 = false;
    for (let _0x5e620e of _0xe16859) {
      if (_0x5e620e && _0x5e620e == _0x1282da) {
        _0x357765 = true;
        break;
      }
    }
    !_0x357765 && (_0x2afd07 = true, _0x5b5720.splice(_0x2ed7f9, -1, _0x38afbb[_0x2ed7f9]));
  }
  if (_0x2afd07) _0x38afbb = _0x5b5720;
}
function _0xa3202d(_0x5d1ec2, _0x1d90e5) {
  _0x1d90e5 != 0 && _0x5d1ec2.unshift(_0x5d1ec2.splice(_0x1d90e5, 1)[0]);
}
function _0x273536() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(_0x38afbb, _0x38afbb));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x5187f8 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x5187f8.join("&") + "\n");
  let _0x524a03 = [],
    _0x3fc83a = _0x5187f8;
  for (let _0x172bcb in _0x38afbb) {
    let _0x565491 = decodeURIComponent(_0x38afbb[_0x172bcb].match(/pt_pin=([^; ]+)(?=;?)/) && _0x38afbb[_0x172bcb].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    _0x3fc83a.includes(_0x565491) && _0x524a03.push(_0x38afbb[_0x172bcb]);
  }
  helpCookiesArr = _0x524a03;
  if (_0x3fc83a.length > 1) for (let _0x17e6ea in _0x3fc83a) {
    let _0x17ac2f = _0x3fc83a[_0x3fc83a.length - 1 - _0x17e6ea];
    if (!_0x17ac2f) continue;
    for (let _0x3008b2 in helpCookiesArr) {
      let _0x1867bd = decodeURIComponent(helpCookiesArr[_0x3008b2].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x3008b2].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      _0x17ac2f == _0x1867bd && _0xa3202d(helpCookiesArr, _0x3008b2);
    }
  }
}