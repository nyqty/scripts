/*
活动名称：游戏赢大礼 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/wxGameActivity/activity/activity?activityId=<活动id>
         https://cjhy-isv.isvjcloud.com/wxGameActivity/activity?activityId=<活动id>
环境变量：jd_wxGameActivity_activityUrl // 活动链接
         jd_wxGameActivity_openCard // 是否开卡，默认不开卡
         jd_wxGameActivity_endScore // 指定游戏分数，默认不指定，填0也为不指定

*/

const Env=require('./utils/Env.js');
const $ = new Env('游戏赢大礼（超级无线/超级会员）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')
const CryptoJS = require('crypto-js')

let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x49a352 => {
    cookiesArr.push(jdCookieNode[_0x49a352]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x55adfa => _0x55adfa.cookie)].filter(_0x37e302 => !!_0x37e302);
let activityUrl = process.env.jd_wxGameActivity_activityUrl ? process.env.jd_wxGameActivity_activityUrl : "",
  openCard = process.env.jd_wxGameActivity_openCard === "true" ? true : false;
$.endScore = process.env.jd_wxGameActivity_endScore ? process.env.jd_wxGameActivity_endScore : 0;
let activityId = "";
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  lz_cookie = {};
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
  $.domain_mode = null;
  if ($.domain.includes("cjhy")) $.domain_mode = "cjhy";
  $.domain.includes("lzkj") && ($.domain_mode = "lzkj", $.domain = "lzkj-isv.isvjd.com");
  if ($.domain_mode == null) {
    console.log("请填写正确的活动链接");
    return;
  }
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    console.log("活动id不存在！");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = activityId;
  console.log("活动入口：" + activityUrl);
  for (let _0x298ef7 = 0; _0x298ef7 < cookiesArr.length; _0x298ef7++) {
    cookie = cookiesArr[_0x298ef7];
    originCookie = cookiesArr[_0x298ef7];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x298ef7 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await getUA();
      await run();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(_0x5327be => $.logErr(_0x5327be)).finally(() => $.done());
async function run() {
  try {
    $.hasEnd = false;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.token = "";
    $.Pin = "";
    $.secretScore = null;
    switch ($.domain_mode) {
      case "lzkj":
        await getFirstLZCK();
        break;
      case "cjhy":
        await getFirstCK();
        break;
    }
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    await $.wait(500);
    if ($.index == 1) {
      await takePostRequest("getSimpleActInfoVo");
      if (!$.venderId) {
        $.outFlag = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
    }
    $.token = await getToken(originCookie, domains);
    if ($.token) {
      await takePostRequest("getMyPing");
      if (!$.Pin) {
        console.log("未能获取用户鉴权信息！");
        return;
      }
      switch ($.domain_mode) {
        case "lzkj":
          $.FormatPin = encodeURIComponent($.Pin);
          break;
        case "cjhy":
          $.FormatPin = encodeURIComponent(encodeURIComponent($.Pin));
          break;
      }
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
      switch ($.domain_mode) {
        case "lzkj":
          await takePostRequest("accessLogWithAD");
          break;
        case "cjhy":
          await takePostRequest("accessLog");
          break;
      }
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
    } else {
      console.log("获取[token]失败！");
      return;
    }
    if (openCard) {
      switch ($.domain_mode) {
        case "lzkj":
          await takePostRequest("getActMemberInfo");
          break;
        case "cjhy":
          await takePostRequest("getOpenCardInfo");
          break;
      }
      if ($.hasEnd || $.activityEnd || $.outFlag) return;
      if (!$.isOpenCard) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let _0x1f37e3 = 0; _0x1f37e3 < Array(5).length; _0x1f37e3++) {
          if (_0x1f37e3 > 0) console.log("第" + _0x1f37e3 + "次 重新开卡");
          await joinShop();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
        }
        $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("❌ 开卡失败，重新执行脚本");
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    await takePostRequest("activityContent");
    if ($.hasEnd) {
      console.log("未能获取到活动信息！");
      return;
    }
    await $.wait(500);
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    if ($.index == 1) {
      await takePostRequest("shopInfo");
      var _0x4e9fcc = "";
      let _0x3545f4 = 0,
        _0x113d68 = [6, 7, 13, 14, 15, 16],
        _0x46ce0e = ["购物金", "红包", "晒单", "下单", "预订", "实付", "专享价", "京豆", "积分", "优惠", "门店", "课程", "换新", "服务", "体验", "店铺券", "抵扣金", "鱼", "狗", "猫", "宠物", "药", "防臭地漏", "风湿", "口罩", "在线直播", "抖音作品", "名片", "皮带扣", "眼影", "降敏", "钙", "睫毛", "风湿", "肉苁蓉", "玉", "男用喷剂", "手抄报", "贴纸", "产后修复", "腮红", "袜子", "睫毛胶水", "牙刷头", "灵芝", "孢子", "除臭", "鼻炎", "和田玉", "祛痘", "解酒", "衣架", "戒烟", "棉签", "擦杯布", "驱蚊", "刷头", "小靓美", "脚气", "卷尺", "种子", "档案袋", "癣", "中年", "老太太", "妇女", "私处", "孕妇", "卫生巾", "卫生条", "阴道", "生殖器", "肛门", "狐臭", "洋娃娃", "胸罩", "少女", "女性内衣", "女性内裤", "女内裤", "女内衣", "女孩", "屏风底座", "童装", "吊带", "钢圈", "文胸", "婴儿", "幼儿", "电商", "女纯棉", "三角裤", "美少女", "纸尿裤", "阴道炎", "宫颈", "糜烂", "打底裤", "自慰", "情趣", "避孕套", "润滑液", "振动", "AV", "筋膜枪", "震动", "肛塞", "黑丝", "课", "网校", "英语", "俄语", "四级", "六级", "四六级", "在线", "培训", "辅导", "教程", "软件", "题库", "流量卡"];
      if ($.endScore == 0) {
        for (let _0xefd4fe = 0; _0xefd4fe < $.drawContentVOs.length; _0xefd4fe++) {
          let _0x2180dd = $.drawContentVOs[_0xefd4fe].type,
            _0x973701 = $.drawContentVOs[_0xefd4fe].hasSendPrizeNum,
            _0xa0f67c = $.drawContentVOs[_0xefd4fe].endScore,
            _0x31f79d = $.drawContentVOs[_0xefd4fe].startScore,
            _0x26bdf8 = $.drawContentVOs[_0xefd4fe].prizeNum,
            _0x53c199 = _0x26bdf8 - _0x973701,
            _0x351d9b = $.drawContentVOs[_0xefd4fe].name,
            _0x325181 = $.drawContentVOs[_0xefd4fe].priceInfo;
          if (_0x113d68.includes(_0x2180dd) && _0x53c199 > 0 && _0x325181 >= _0x3545f4) {
            if (_0x2180dd == 7) {
              let _0xb105db = false;
              _0x46ce0e.filter(function (_0x551f89) {
                if (_0x351d9b.includes(_0x551f89)) return _0xb105db = true, false;
              });
              !_0xb105db && (_0x3545f4 = _0x325181, $.endScore = _0xa0f67c);
            } else {
              _0x3545f4 = _0x325181;
              $.endScore = _0xa0f67c;
            }
          }
          _0x4e9fcc += "  " + (_0xefd4fe + 1) + ". " + _0x351d9b + "，所需游戏分数位于" + _0x31f79d + "至" + _0xa0f67c + "之间，剩余库存" + _0x53c199 + "件\n";
        }
        if ($.endScore == 0) for (let _0x4e2a02 = 0; _0x4e2a02 < $.drawContentVOs.length; _0x4e2a02++) {
          let _0x17239a = $.drawContentVOs[_0x4e2a02].hasSendPrizeNum,
            _0x2a7cb8 = $.drawContentVOs[_0x4e2a02].endScore,
            _0x18ebc2 = $.drawContentVOs[_0x4e2a02].prizeNum,
            _0x138679 = _0x18ebc2 - _0x17239a;
          if (_0x138679 <= 0) continue;
          $.endScore = _0x2a7cb8 >= $.endScore ? _0x2a7cb8 : $.endScore;
        }
        if ($.endScore != 0) console.log("游戏分数：" + $.endScore + "（自动）\n");
      } else {
        console.log("游戏分数：" + $.endScore + "（指定）\n");
        for (let _0x1ef213 = 0; _0x1ef213 < $.drawContentVOs.length; _0x1ef213++) {
          let _0x38f14c = $.drawContentVOs[_0x1ef213].hasSendPrizeNum,
            _0x488675 = $.drawContentVOs[_0x1ef213].endScore,
            _0x26caa4 = $.drawContentVOs[_0x1ef213].startScore,
            _0x59db88 = $.drawContentVOs[_0x1ef213].prizeNum,
            _0x28a4cf = _0x59db88 - _0x38f14c,
            _0x16b645 = $.drawContentVOs[_0x1ef213].name;
          _0x4e9fcc += "  " + (_0x1ef213 + 1) + ". " + _0x16b645 + "，所需游戏分数位于" + _0x26caa4 + "至" + _0x488675 + "之间，剩余库存" + _0x28a4cf + "件\n";
        }
      }
      console.log("店铺名称：" + ($.shopName || "未知") + "\n活动奖品：\n" + _0x4e9fcc);
      if ($.endScore == 0) {
        console.log("奖品全部发完了，下次早点来吧！");
        $.activityEnd = true;
        return;
      }
    }
    if (!$.todayCanDrawOk) {
      console.log("今天没有游戏次数了，明天再来吧~");
      return;
    }
    $.needFollow && (await takePostRequest("follow"), await $.wait(500));
    if ($.hotFlag) return;
    if ($.activityContent) {
      $.score = $.endScore;
      switch ($.domain_mode) {
        case "lzkj":
          var _0x482d26 = $.todayCanDrawOk < 5 ? $.todayCanDrawOk : 5;
          for (let _0x2dff06 = 0; _0x2dff06 < _0x482d26; _0x2dff06++) {
            $.secretScore = $.score;
            await takePostRequest("gameOverRecord");
            await $.wait(3000);
            $.todayCanDrawOk--;
          }
          if ($.todayCanDrawOk > 0) console.log("\n玩太多次了，下次再继续吧~");
          break;
        case "cjhy":
          let _0x2372a4 = 5;
          for (let _0x262785 = 0; _0x262785 < _0x2372a4; _0x262785++) {
            let _0x5701bf = Math.floor($.score / 10) * 10;
            $.secretScore = encrypt(_0x5701bf, $.activityId);
            await takePostRequest("gameStartDeposit");
            if ($.hasEnd || $.activityEnd || $.outFlag) return;
            await $.wait(1000);
            await takePostRequest("gameOverRecord");
            if ($.hasEnd || $.activityEnd || $.outFlag) return;
            if (!$.todayCanDrawOk) break;
            if (_0x262785 == _0x2372a4 - 1) {
              console.log("\n玩太多次了，下次再继续吧~");
              return;
            }
            await $.wait(3000);
          }
          break;
      }
    } else {
      $.log("未能成功获取到活动信息");
      $.activityEnd = true;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    await $.wait(1000);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
  } catch (_0x2cb2f0) {
    console.log(_0x2cb2f0);
  }
}
async function takePostRequest(_0x217df0) {
  if ($.outFlag) return;
  let _0x51f599 = domains,
    _0x28a04c = "",
    _0x97edbf = "POST";
  switch (_0x217df0) {
    case "getMyPing":
      url = _0x51f599 + "/customer/getMyPing";
      _0x28a04c = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      url = _0x51f599 + "/customer/getSimpleActInfoVo";
      _0x28a04c = "activityId=" + $.activityId;
      break;
    case "getOpenCardInfo":
      url = _0x51f599 + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      _0x28a04c = "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType;
      break;
    case "getActMemberInfo":
      url = _0x51f599 + "/wxCommonInfo/getActMemberInfo";
      _0x28a04c = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin;
      break;
    case "accessLog":
      url = _0x51f599 + "/common/accessLog";
      _0x28a04c = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      url = _0x51f599 + "/common/accessLogWithAD";
      _0x28a04c = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app";
      break;
    case "activityContent":
      url = _0x51f599 + "/wxGameActivity/activityContent";
      _0x28a04c = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "follow":
      url = _0x51f599 + "/wxGameActivity/follow";
      _0x28a04c = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "gameStartDeposit":
      url = _0x51f599 + "/wxGameActivity/gameStartDeposit";
      _0x28a04c = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "gameOverRecord":
      url = _0x51f599 + "/wxGameActivity/gameOverRecord";
      switch ($.domain_mode) {
        case "lzkj":
          _0x28a04c = "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&score=" + $.secretScore;
          break;
        case "cjhy":
          _0x28a04c = "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&score=" + encodeURIComponent(encodeURIComponent($.secretScore));
          break;
      }
      break;
    case "shopInfo":
      url = _0x51f599 + "/wxGameActivity/shopInfo";
      _0x28a04c = "activityId=" + $.activityId;
      break;
    case "getUserInfo":
      url = _0x51f599 + "/wxActionCommon/getUserInfo";
      _0x28a04c = "pin=" + $.FormatPin;
      break;
    default:
      console.log("错误" + _0x217df0);
  }
  let _0x40a5c4 = getPostRequest(url, _0x28a04c, _0x97edbf);
  return new Promise(async _0x1de5d6 => {
    $.post(_0x40a5c4, (_0x1b9e7b, _0x519507, _0x4470df) => {
      try {
        setActivityCookie(_0x519507);
        _0x1b9e7b ? (_0x519507 && typeof _0x519507.statusCode != "undefined" && _0x519507.statusCode == 493 && (console.log(_0x217df0 + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(_0x1b9e7b, _0x1b9e7b)), console.log(_0x217df0 + " API请求失败，请检查网路重试")) : dealReturn(_0x217df0, _0x4470df);
      } catch (_0x2c825d) {
        console.log(_0x2c825d, _0x519507);
      } finally {
        _0x1de5d6();
      }
    });
  });
}
async function dealReturn(_0xc19a7b, _0x3239e6) {
  let _0x5725a9 = "";
  try {
    (_0xc19a7b != "accessLogWithAD" || _0xc19a7b != "drawContent") && _0x3239e6 && (_0x5725a9 = JSON.parse(_0x3239e6));
  } catch (_0x20e067) {
    console.log(_0xc19a7b + " 执行任务异常");
    console.log(_0x3239e6);
    $.runFalag = false;
  }
  try {
    switch (_0xc19a7b) {
      case "isvObfuscator":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.errcode == 0) {
            if (typeof _0x5725a9.token != "undefined") $.token = _0x5725a9.token;
          } else _0x5725a9.message ? console.log("isvObfuscator " + (_0x5725a9.message || "")) : console.log(_0x3239e6);
        } else console.log(_0x3239e6);
        break;
      case "getMyPing":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result && _0x5725a9.result === true) {
            if (_0x5725a9.data && typeof _0x5725a9.data.secretPin != "undefined") $.Pin = _0x5725a9.data.secretPin;
            if (_0x5725a9.data && typeof _0x5725a9.data.nickname != "undefined") $.nickname = _0x5725a9.data.nickname;
          } else _0x5725a9.errorMessage ? console.log(_0xc19a7b + " " + (_0x5725a9.errorMessage || "")) : console.log(_0xc19a7b + " " + _0x3239e6);
        } else console.log(_0xc19a7b + " " + _0x3239e6);
        break;
      case "getSimpleActInfoVo":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result && _0x5725a9.result === true && _0x5725a9.data) {
            if (_0x5725a9.data && typeof _0x5725a9.data.shopId != "undefined") $.shopId = _0x5725a9.data.shopId;
            if (_0x5725a9.data && typeof _0x5725a9.data.venderId != "undefined") $.venderId = _0x5725a9.data.venderId;
            $.activityType = _0x5725a9.data.activityType;
          } else _0x5725a9.errorMessage ? console.log("" + (_0x5725a9.errorMessage || "")) : console.log("" + _0x3239e6);
        } else console.log("" + _0x3239e6);
        break;
      case "shopInfo":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result && _0x5725a9.data) $.shopName = _0x5725a9.data.shopName;else _0x5725a9.errorMessage ? console.log("" + (_0x5725a9.errorMessage || "")) : console.log("" + _0x3239e6);
        } else console.log("" + _0x3239e6);
        break;
      case "follow":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result && _0x5725a9.result === true && _0x5725a9.count === 0) {} else _0x5725a9.errorMessage ? console.log(_0xc19a7b + " " + (_0x5725a9.errorMessage || "")) : console.log(_0xc19a7b + " " + _0x3239e6);
        } else console.log(_0xc19a7b + " " + _0x3239e6);
        break;
      case "getOpenCardInfo":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result && _0x5725a9.result === true) $.isOpenCard = _0x5725a9.data.openedCard || false;else {
            if (_0x3239e6.errorMessage) {
              console.log(_0x3239e6.errorMessage || "");
              for (let _0x167328 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0x3239e6.errorMessage.includes(_0x167328)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else {
              console.log(_0x3239e6);
            }
          }
        } else console.log("" + _0x3239e6);
        break;
      case "getActMemberInfo":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result && _0x5725a9.result === true) $.isOpenCard = _0x5725a9.data.openCard || false;else {
            if (_0x3239e6.errorMessage) {
              console.log(_0x3239e6.errorMessage || "");
              for (let _0x4339ae of ["未开始", "结束", "不存在", "不在"]) {
                if (_0x3239e6.errorMessage.includes(_0x4339ae)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else console.log(_0x3239e6);
          }
        } else console.log("" + _0x3239e6);
        break;
      case "getUserInfo":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result && _0x5725a9.result === true) {
            if (_0x5725a9.data && typeof _0x5725a9.data.yunMidImageUrl != "undefined") $.attrTouXiang = _0x5725a9.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            $.jdNick = _0x5725a9.data.nickname || "";
          } else _0x5725a9.errorMessage ? console.log(_0xc19a7b + " " + (_0x5725a9.errorMessage || "")) : console.log(_0xc19a7b + " " + _0x3239e6);
        } else console.log(_0xc19a7b + " " + _0x3239e6);
        break;
      case "activityContent":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result && _0x5725a9.result === true) {
            $.activityContent = _0x5725a9.data;
            $.needFollow = _0x5725a9.data.needFollow || false;
            $.hasFollow = _0x5725a9.data.hasFollow || false;
            $.endTime = _0x5725a9.data.endTime || "";
            $.startTime = _0x5725a9.data.startTime || "";
            $.todayCanDrawOk = _0x5725a9.data.todayCanDrawOk || 0;
            $.drawContentVOs = _0x5725a9.data.drawContentVOs || null;
            $.actName = _0x5725a9.data.name || "";
          } else {
            if (_0x5725a9.errorMessage) {
              for (let _0x3ffe26 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0x5725a9.errorMessage.includes(_0x3ffe26)) {
                  $.hasEnd = true;
                  break;
                }
              }
              console.log(_0xc19a7b + " " + (_0x5725a9.errorMessage || ""));
            } else {
              console.log(_0xc19a7b + " " + _0x3239e6);
            }
          }
        } else console.log(_0xc19a7b + " " + _0x3239e6);
        break;
      case "gameStartDeposit":
        if (typeof _0x5725a9 == "object") {
          if (!_0x5725a9.result) {
            $.hasEnd = true;
            if (_0x5725a9.errorMessage) console.log("" + (_0x5725a9.errorMessage || ""));else {
              console.log("游戏开始失败");
            }
          }
        } else console.log("" + _0x3239e6);
        break;
      case "gameOverRecord":
        if (typeof _0x5725a9 == "object") {
          if (_0x5725a9.result) {
            drawInfo = _0x5725a9.data.drawInfo;
            if (drawInfo) {
              $.todayCanDrawOk--;
              switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  const _0xe9b471 = _0x5725a9.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  console.log("参考价值：" + drawInfo.priceInfo + "（元）");
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let _0x3fe01c = await wxSavePrize(domains, cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, _0xe9b471);
                  _0x3fe01c ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，已成功自动登记收货地址\n\n" + $.activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                case 14:
                case 15:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              }
            } else console.log("💨 空气");
          } else {
            if (_0x5725a9.errorMessage) {
              console.log(_0x5725a9.errorMessage);
              for (let _0x45ced9 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0x5725a9.errorMessage.includes(_0x45ced9)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else console.log(JSON.stringify(_0x5725a9));
          }
        }
        break;
      case "accessLogWithAD":
      case "accessLog":
      case "drawContent":
        break;
      default:
        console.log(_0xc19a7b + " -> " + _0x3239e6);
    }
    typeof _0x5725a9 == "object" && _0x5725a9.errorMessage && _0x5725a9.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x533507) {
    console.log(_0x533507);
  }
}
function getPostRequest(_0x5606ee, _0x12105c, _0x397976 = "POST") {
  let _0x363139 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x5606ee.indexOf("" + domains) > -1 && (_0x363139.Referer = domains + "/wxGameActivity/activity/activity?activityId=" + $.activityId, _0x363139.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": _0x5606ee,
    "method": _0x397976,
    "headers": _0x363139,
    "body": _0x12105c,
    "timeout": 30000
  };
}
function getFirstLZCK() {
  return new Promise(_0x70ce9c => {
    let _0x147b2c = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x147b2c, async (_0x4c85a5, _0x51093c, _0x1c8618) => {
      try {
        if (_0x4c85a5) {
          console.log(String(_0x4c85a5));
          console.log("wxCommonInfo API请求失败，请检查网路重试");
        } else {
          if (_0x51093c.status == 200) {
            setActivityCookie(_0x51093c);
          }
        }
      } catch (_0x5d4570) {
        $.logErr(_0x5d4570, _0x51093c);
      } finally {
        _0x70ce9c();
      }
    });
  });
}
function getFirstCK() {
  return new Promise(_0x2e6335 => {
    let _0x52506e = {
      "url": activityUrl,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(_0x52506e, async (_0x3c380f, _0x56197c, _0x23ea13) => {
      try {
        if (_0x3c380f) {
          console.log(String(_0x3c380f));
          console.log("getFirstCK API请求失败，请检查网路重试");
        } else {
          let _0x53ca6e = _0x23ea13.match(/(活动已经结束)/) && _0x23ea13.match(/(活动已经结束)/)[1] || "";
          _0x53ca6e && ($.activityEnd = true, console.log("活动已结束"));
          _0x56197c.status == 200 && setActivityCookie(_0x56197c);
        }
      } catch (_0x2d55cb) {
        $.logErr(_0x2d55cb, _0x56197c);
      } finally {
        _0x2e6335();
      }
    });
  });
}
function setActivityCookie(_0x23477f) {
  if (_0x23477f) {
    if (_0x23477f.headers["set-cookie"]) {
      cookie = "";
      for (let _0x64da5e of _0x23477f.headers["set-cookie"]) {
        lz_cookie[_0x64da5e.split(";")[0].substr(0, _0x64da5e.split(";")[0].indexOf("="))] = _0x64da5e.split(";")[0].substr(_0x64da5e.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x125f2d of Object.keys(lz_cookie)) {
        cookie += _0x125f2d + "=" + lz_cookie[_0x125f2d] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0x2f490a) {
  _0x2f490a = _0x2f490a || 32;
  let _0x52fbd6 = "abcdef0123456789",
    _0x1b9595 = _0x52fbd6.length,
    _0x5bef0e = "";
  for (i = 0; i < _0x2f490a; i++) _0x5bef0e += _0x52fbd6.charAt(Math.floor(Math.random() * _0x1b9595));
  return _0x5bef0e;
}
function random(_0x53596f, _0x1b43f3) {
  return Math.floor(Math.random() * (_0x1b43f3 - _0x53596f)) + _0x53596f;
}
function jsonParse(_0x5495c5) {
  if (typeof _0x5495c5 == "string") try {
    return JSON.parse(_0x5495c5);
  } catch (_0x14aab9) {
    return console.log(_0x14aab9), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function encrypt(_0x1b3121, _0x137d28) {
  let _0x3c151f = _0x137d28 ? CryptoJS.enc.Utf8.parse(_0x137d28) : CryptoJS.enc.Utf8.parse("1234567890123456");
  var _0x1acb69 = CryptoJS.enc.Utf8.parse(JSON.stringify(_0x1b3121)),
    _0x44e40b = CryptoJS.AES.encrypt(_0x1acb69, _0x3c151f, {
      "mode": CryptoJS.mode.ECB,
      "padding": CryptoJS.pad.Pkcs7
    });
  return _0x44e40b.toString();
}
function decrypt(_0x299f4a, _0x14a16d) {
  let _0x3daf64 = _0x14a16d ? CryptoJS.enc.Utf8.parse(_0x14a16d) : CryptoJS.enc.Utf8.parse("1234567890123456"),
    _0x558214 = CryptoJS.enc.Base64.parse(_0x299f4a),
    _0x464c4f = CryptoJS.enc.Base64.stringify(_0x558214);
  var _0x59bdf1 = CryptoJS.AES.decrypt(_0x464c4f, _0x3daf64, {
    "mode": CryptoJS.mode.ECB,
    "padding": CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(_0x59bdf1).toString();
}
function getQueryString(_0x132381, _0x1f8647) {
  let _0x386283 = new RegExp("(^|[&?])" + _0x1f8647 + "=([^&]*)(&|$)"),
    _0x465051 = _0x132381.match(_0x386283);
  if (_0x465051 != null) {
    return decodeURIComponent(_0x465051[2]);
  }
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x8c5c16 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x4d89a2 = "";
    if ($.shopactivityId) _0x4d89a2 = ",\"activityId\":" + $.shopactivityId;
    const _0x41535d = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x4d89a2 + ",\"channel\":406}",
      _0x2b205e = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x41535d)
      },
      _0x908fac = await getH5st("8adfb", _0x2b205e),
      _0x463f21 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x41535d + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x908fac),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x463f21, async (_0x2cb631, _0x516f34, _0x4b1a03) => {
      try {
        _0x4b1a03 = _0x4b1a03 && _0x4b1a03.match(/jsonp_.*?\((.*?)\);/) && _0x4b1a03.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4b1a03;
        let _0x26e08d = $.toObj(_0x4b1a03, _0x4b1a03);
        if (_0x26e08d && typeof _0x26e08d == "object") {
          if (_0x26e08d && _0x26e08d.success === true) {
            console.log(_0x26e08d.message);
            $.errorJoinShop = _0x26e08d.message;
            if (_0x26e08d.result && _0x26e08d.result.giftInfo) for (let _0x363dcc of _0x26e08d.result.giftInfo.giftList) {
              console.log("入会获得: " + _0x363dcc.discountString + _0x363dcc.prizeName + _0x363dcc.secondLineDesc);
            }
            console.log("");
          } else _0x26e08d && typeof _0x26e08d == "object" && _0x26e08d.message ? ($.errorJoinShop = _0x26e08d.message, console.log("" + (_0x26e08d.message || ""))) : console.log(_0x4b1a03);
        } else console.log(_0x4b1a03);
      } catch (_0x3aafc6) {
        $.logErr(_0x3aafc6, _0x516f34);
      } finally {
        _0x8c5c16();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x4810f8 => {
    let _0x41c269 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x26d01e = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x41c269)
      },
      _0x4f1b7f = await getH5st("ef79a", _0x26d01e),
      _0x1d5a4f = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x41c269 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x4f1b7f),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x1d5a4f, async (_0x5e9006, _0x599a5d, _0xc51863) => {
      try {
        _0xc51863 = _0xc51863 && _0xc51863.match(/jsonp_.*?\((.*?)\);/) && _0xc51863.match(/jsonp_.*?\((.*?)\);/)[1] || _0xc51863;
        let _0x184a69 = $.toObj(_0xc51863, _0xc51863);
        _0x184a69 && typeof _0x184a69 == "object" ? _0x184a69 && _0x184a69.success == true && (console.log("\n去加入店铺会员：" + (_0x184a69.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x184a69.result.interestsRuleList && _0x184a69.result.interestsRuleList[0] && _0x184a69.result.interestsRuleList[0].interestsInfo && _0x184a69.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0xc51863);
      } catch (_0x33cb7e) {
        $.logErr(_0x33cb7e, _0x599a5d);
      } finally {
        _0x4810f8();
      }
    });
  });
}
