/*
星系牧场
活动入口：QQ星儿童牛奶京东自营旗舰店->品牌会员->星系牧场
[task_local]
#星系牧场
13 14 * * * jd_qqxing.js
*/
const Env=require('./utils/Env.js');
const $ = new Env('QQ星系牧场');
const _0x4c47a5 = $.isNode() ? require("./jdCookie.js") : "",
  _0x28487c = $.isNode() ? require("./sendNotify") : "",
  _0x64d5ac = require("./function/krgetToken");
let _0x3b00eb = "https://lzdz-isv.isvjcloud.com";
Exchange = true;
let _0x55a95d = [],
  _0x6ed046 = "";
function _0x302b2b(_0x213644, _0x375092) {
  try {
    return _0x213644();
  } catch (_0x1607ff) {
    return undefined;
  }
}
if ($.isNode()) {
  Object.keys(_0x4c47a5).forEach(_0x1f4fd6 => {
    _0x55a95d.push(_0x4c47a5[_0x1f4fd6]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x55a95d = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x39650f($.getdata("CookiesJD") || "[]").map(_0x2c7fb0 => _0x2c7fb0.cookie)].filter(_0x1ee70b => !!_0x1ee70b);
message = "";
!(async () => {
  if (!_0x55a95d[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  let _0x32971a = [""];
  $.shareUuid = _0x32971a[Math.floor(Math.random() * _0x32971a.length)];
  console.log("活动入口：https://lzdz-isv.isvjcloud.com/dingzhi/qqxing/pasture/activity/5270742?activityId=90121061401&shareUuid=" + $.shareUuid);
  for (let _0x2c4f26 = 0; _0x2c4f26 < 7; _0x2c4f26++) {
    _0x6ed046 = _0x55a95d[_0x2c4f26];
    if (_0x6ed046) {
      $.UserName = decodeURIComponent(_0x6ed046.match(/pt_pin=([^; ]+)(?=;?)/) && _0x6ed046.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x2c4f26 + 1;
      $.cando = true;
      $.cow = "";
      $.openCard = true;
      $.isLogin = true;
      $.needhelp = true;
      $.foodNum = 0;
      $.nickName = "";
      $.drawresult = "";
      $.exchange = 0;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x28487c.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x15213e();
      await _0x237185();
      $.token2 = await _0x64d5ac(_0x6ed046, _0x3b00eb);
      await _0x58ae21();
      await _0x37f4cc();
      await _0x5ecfe8();
      await _0x249077();
      if ($.cando) {
        await _0x3af972($.shareuuid);
        await _0x474092();
        taskList = [...$.taskList, ...$.taskList2];
        for (j = 0; j < taskList.length; j++) {
          task = taskList[j];
          console.log(task.taskname);
          if (task.taskid == "interact") {
            for (l = 0; l < 20 - task.curNum; l++) {
              console.log("完成任务中....等待5秒....");
              await _0x55eb4a(task.taskid, task.params);
              await $.wait(5000);
            }
            console.log("互动完成");
          } else {
            if (task.taskid == "scansku") {
              await _0x3ac8fd();
              await _0x51fe83($.vid);
              await _0x55eb4a(task.taskid, $.pparam);
            } else {
              if (task.taskid !== "add2cart") {
                await _0x55eb4a(task.taskid, task.params);
                await $.wait(5000);
              }
            }
          }
        }
        await _0x474092();
        for (k = 0; k < $.drawchance; k++) {
          await _0x59e0b7();
        }
        let _0x3e0511 = Math.floor($.foodNum / 10000);
        console.log("可兑换 " + _0x3e0511 + " 次 100京🐶");
        for (q = 0; q < _0x3e0511 && Exchange; q++) {
          await _0x44bd41(14);
        }
        await _0x474092();
        !Exchange && console.log("你 默认 不兑换东西,请自行进去活动兑换");
        message += "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n" + $.cow + " 兑换京🐶 " + $.exchange + "  " + $.drawresult + "\n";
        console.log("休息休息~");
        await $.wait(5 * 1000);
      } else $.msg($.name, "", "跑不起来了~请自己进去一次牧场");
    }
  }
  if (message.length != 0) {
    if ($.isNode()) {} else $.msg($.name, "", "星系牧场" + message);
  }
})().catch(_0xe70061 => $.logErr(_0xe70061)).finally(() => $.done());
function _0x366588(_0x28b8fb) {
  if (!_0x302b2b(() => _0x28b8fb.headers["set-cookie"])) return;
  let _0x25a54a = {},
    _0x556699 = {},
    _0xaaeb1b = _0x6ed046.split(";");
  for (let _0x1bfcfd of _0xaaeb1b) {
    const _0x5a6ebe = _0x1bfcfd.split("=");
    _0x25a54a[_0x5a6ebe[0]] = _0x1bfcfd.replace(_0x5a6ebe[0] + "=", "");
  }
  for (let _0x2dd34f of _0x28b8fb.headers["set-cookie"]) {
    const _0x4b4517 = _0x2dd34f.split(";")[0],
      _0x3f63b7 = _0x4b4517.split("=");
    _0x25a54a[_0x3f63b7[0]] = _0x4b4517.replace(_0x3f63b7[0] + "=", "");
  }
  const _0x553ff9 = {
    ..._0x556699,
    ..._0x25a54a
  };
  _0x6ed046 = "";
  for (let _0x7f7ebc in _0x553ff9) {
    _0x7f7ebc && (_0x6ed046 = _0x6ed046 + (_0x7f7ebc + "=" + _0x553ff9[_0x7f7ebc] + ";"));
  }
}
function _0x5b1f22(_0x907c73, _0x2fd029) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + _0x907c73,
    "body": _0x2fd029,
    "headers": {
      "Host": "api.m.jd.com",
      "accept": "*/*",
      "user-agent": "JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)",
      "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x6ed046
    }
  };
}
function _0x15213e() {
  let _0x5bca53 = {
    "url": "https://api.m.jd.com/client.action?functionId=genToken",
    "body": "&body=%7B%22to%22%3A%22https%3A%5C/%5C/lzdz-isv.isvjcloud.com%5C/dingzhi%5C/qqxing%5C/pasture%5C/activity?activityId%3D90121061401%22%2C%22action%22%3A%22to%22%7D&build=167588&client=apple&clientVersion=9.4.4&d_brand=apple&d_model=iPhone9%2C2&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=1805a3ab499eebc088fd9ed1c67f5eaf350856d4&osVersion=12.0&partner=apple&rfs=0000&scope=11&screen=1242%2A2208&sign=73af724a6be5f3cb89bf934dfcde647f&st=1624887881842&sv=111",
    "headers": {
      "Host": "api.m.jd.com",
      "accept": "*/*",
      "user-agent": "JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)",
      "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x6ed046
    }
  };
  return new Promise(_0x41f606 => {
    $.post(_0x5bca53, async (_0x1cb833, _0x3d8a25, _0x188e22) => {
      _0x366588(_0x3d8a25);
      try {
        if (_0x1cb833) {
          console.log($.name + " API请求失败，请检查网路重试");
          console.log("" + JSON.stringify(_0x1cb833));
        } else {
          _0x188e22 = JSON.parse(_0x188e22);
          $.isvToken = _0x188e22.tokenKey;
          _0x6ed046 += "IsvToken=" + _0x188e22.tokenKey;
        }
      } catch (_0x287ab1) {
        $.logErr(_0x287ab1, _0x3d8a25);
      } finally {
        _0x41f606(_0x188e22);
      }
    });
  });
}
function _0x237185() {
  return new Promise(_0x23dc71 => {
    $.get(_0x55191a("/dingzhi/qqxing/pasture/activity", "activityId=90121061401"), (_0x23ec31, _0x44db85, _0x29ab4f) => {
      _0x366588(_0x44db85);
      try {
        if (_0x23ec31) console.log($.name + " API请求失败，请检查网路重试");else {}
      } catch (_0x4c00b5) {
        $.logErr(_0x4c00b5, _0x44db85);
      } finally {
        _0x23dc71(_0x29ab4f);
      }
    });
  });
}
function _0x58ae21() {
  let _0x2afa6f = _0x9b3103("/dz/common/getSimpleActInfoVo", "activityId=90121061401");
  return new Promise(_0x15a66d => {
    $.post(_0x2afa6f, async (_0x27deca, _0x158a79, _0x46ca91) => {
      _0x366588(_0x158a79);
      try {
        _0x27deca ? (console.log("" + JSON.stringify(_0x27deca)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x46ca91 = JSON.parse(_0x46ca91), _0x46ca91.result && ($.shopid = _0x46ca91.data.shopId));
      } catch (_0xe78b1f) {
        $.logErr(_0xe78b1f, _0x158a79);
      } finally {
        _0x15a66d(_0x46ca91);
      }
    });
  });
}
function _0x37f4cc() {
  let _0x3ccd25 = _0x9b3103("/dingzhi/bd/common/getMyPing", "userId=" + $.shopid + "&token=" + encodeURIComponent($.token2) + "&fromType=APP&activityId=90121061401");
  return new Promise(_0x177345 => {
    $.post(_0x3ccd25, async (_0x51732b, _0x115b81, _0x56456e) => {
      _0x366588(_0x115b81);
      try {
        _0x51732b ? (console.log("" + JSON.stringify(_0x51732b)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x56456e = JSON.parse(_0x56456e), _0x56456e.data && _0x56456e.data.secretPin && ($.pin = _0x56456e.data.secretPin, $.nickname = _0x56456e.data.nickname, console.log("欢迎回来~  " + $.nickname)));
      } catch (_0x4c345a) {
        $.logErr(_0x4c345a, _0x115b81);
      } finally {
        _0x177345(_0x56456e);
      }
    });
  });
}
function _0x5ecfe8() {
  let _0x481643 = _0x9b3103("/common/accessLogWithAD", "venderId=1000361242&code=99&pin=" + encodeURIComponent($.pin) + "&activityId=90121061401&pageUrl=https%3A%2F%2Flzdz-isv.isvjcloud.com%2Fdingzhi%2Fqqxing%2Fpasture%2Factivity%3FactivityId%3D90121061401%26lng%3D107.146945%26lat%3D33.255267%26sid%3Dcad74d1c843bd47422ae20cadf6fe5aw%26un_area%3D27_2442_2444_31912&subType=app&adSource=");
  return new Promise(_0x61f490 => {
    $.post(_0x481643, async (_0x346721, _0x20ecc7, _0x450617) => {
      _0x366588(_0x20ecc7);
      try {
        if (_0x346721) {
          console.log("" + JSON.stringify(_0x346721));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if ($.isNode()) for (let _0x26dfc7 of _0x20ecc7.headers["set-cookie"]) {
            _0x6ed046 = _0x6ed046 + "; " + _0x26dfc7.split(";")[0] + ";";
          } else {
            for (let _0x2aea0a of _0x20ecc7.headers["Set-Cookie"].split(",")) {
              _0x6ed046 = _0x6ed046 + "; " + _0x2aea0a.split(";")[0] + ";";
            }
          }
        }
      } catch (_0x1916f5) {
        $.logErr(_0x1916f5, _0x20ecc7);
      } finally {
        _0x61f490(_0x450617);
      }
    });
  });
}
function _0x249077() {
  return new Promise(_0x1f167c => {
    let _0x7b4d18 = "pin=" + encodeURIComponent($.pin),
      _0x5b8630 = _0x9b3103("/wxActionCommon/getUserInfo", _0x7b4d18);
    $.post(_0x5b8630, async (_0xf2ef1f, _0x5c25b5, _0x1a224c) => {
      _0x366588(_0x5c25b5);
      try {
        _0xf2ef1f ? console.log($.name + " API请求失败，请检查网路重试") : (_0x1a224c = JSON.parse(_0x1a224c), _0x1a224c.data ? ($.userId = _0x1a224c.data.id, $.pinImg = _0x1a224c.data.yunMidImageUrl, $.nick = _0x1a224c.data.nickname) : $.cando = false);
      } catch (_0x1baa46) {
        $.logErr(_0x1baa46, _0x5c25b5);
      } finally {
        _0x1f167c(_0x1a224c);
      }
    });
  });
}
function _0x3af972() {
  return new Promise(_0x49629a => {
    let _0x3cd266 = "activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&pinImg=" + $.pinImg + "&nick=" + encodeURIComponent($.nick) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareuuid;
    $.post(_0x9b3103("/dingzhi/qqxing/pasture/activityContent", _0x3cd266), async (_0x14a865, _0x39d231, _0x5989e6) => {
      _0x366588(_0x39d231);
      try {
        _0x14a865 ? console.log($.name + " API请求失败，请检查网路重试") : (_0x5989e6 = JSON.parse(_0x5989e6), _0x5989e6.result && (_0x5989e6.data.openCardStatus != 3 && console.log("当前未开卡,无法助力和兑换奖励哦"), $.shareuuid = _0x5989e6.data.uid, console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.shareuuid + "\n")));
      } catch (_0x3240a8) {
        $.logErr(_0x3240a8, _0x39d231);
      } finally {
        _0x49629a(_0x5989e6);
      }
    });
  });
}
function _0x474092() {
  let _0x5301bb = _0x9b3103("/dingzhi/qqxing/pasture/myInfo", "activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&pinImg=" + $.pinImg + "&actorUuid=" + $.shareuuid + "&userUuid=" + $.shareuuid);
  return new Promise(_0x32f4a1 => {
    $.post(_0x5301bb, async (_0x41db8b, _0x52288c, _0x253e87) => {
      _0x366588(_0x52288c);
      try {
        if (_0x41db8b) console.log($.name + " API请求失败，请检查网路重试");else {
          _0x253e87 = JSON.parse(_0x253e87);
          if (_0x253e87.result) {
            $.taskList = _0x253e87.data.task.filter(_0x24ec10 => _0x24ec10.maxNeed == 1 && _0x24ec10.curNum == 0 || _0x24ec10.taskid == "interact");
            $.taskList2 = _0x253e87.data.task.filter(_0xd23849 => _0xd23849.maxNeed != 1 && _0xd23849.type == 0);
            $.draw = _0x253e87.data.bags.filter(_0x574ea1 => _0x574ea1.bagId == "drawchance")[0];
            $.food = _0x253e87.data.bags.filter(_0x4aa9a9 => _0x4aa9a9.bagId == "food")[0];
            $.sign = _0x253e87.data.bags.filter(_0x98a81e => _0x98a81e.bagId == "signDay")[0];
            $.score = _0x253e87.data.score;
            let _0x67e168 = _0x253e87.data.task.filter(_0x258f3e => _0x258f3e.taskid == "share2help")[0];
            if (_0x67e168) {
              console.log("今天已有" + _0x67e168.curNum + "人为你助力啦");
              _0x67e168.curNum == 20 && ($.needhelp = false);
            }
            $.cow = "当前🐮🐮成长值：" + $.score + "  饲料：" + ($.food.totalNum - $.food.useNum) + "  抽奖次数：" + ($.draw.totalNum - $.draw.useNum) + "  签到天数：" + $.sign.totalNum;
            $.foodNum = $.food.totalNum - $.food.useNum;
            console.log($.cow);
            $.drawchance = $.draw.totalNum - $.draw.useNum;
          } else {
            $.cando = false;
            console.log(_0x253e87.errorMessage);
          }
        }
      } catch (_0xe69abe) {
        $.logErr(_0xe69abe, _0x52288c);
      } finally {
        _0x32f4a1(_0x253e87);
      }
    });
  });
}
function _0x3ac8fd() {
  return new Promise(_0x118c57 => {
    let _0x476e92 = "type=4&activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&actorUuid=" + $.uuid + "&userUuid=" + $.uuid;
    $.post(_0x9b3103("/dingzhi/qqxing/pasture/getproduct", _0x476e92), async (_0x5bccce, _0x588d16, _0x53c0fb) => {
      _0x366588(_0x588d16);
      try {
        _0x5bccce ? console.log($.name + " API请求失败，请检查网路重试") : (_0x53c0fb = JSON.parse(_0x53c0fb), _0x53c0fb.data && _0x53c0fb.data[0] && ($.pparam = _0x53c0fb.data[0].id, $.vid = _0x53c0fb.data[0].venderId));
      } catch (_0x51fcb5) {
        $.logErr(_0x51fcb5, _0x588d16);
      } finally {
        _0x118c57(_0x53c0fb);
      }
    });
  });
}
function _0x51fe83(_0x34bbad) {
  return new Promise(_0x54c6f0 => {
    let _0x37f89d = "jdActivityId=1404370&pin=" + encodeURIComponent($.pin) + "&actionType=5&venderId=" + _0x34bbad + "&activityId=90121061401";
    $.post(_0x9b3103("/interaction/write/writePersonInfo", _0x37f89d), async (_0x696bdb, _0x6d559c, _0x2ee6b2) => {
      _0x366588(_0x6d559c);
      try {
        _0x696bdb ? console.log($.name + " API请求失败，请检查网路重试") : (console.log("浏览：" + $.vid), console.log(_0x2ee6b2));
      } catch (_0x55263c) {
        $.logErr(_0x55263c, _0x6d559c);
      } finally {
        _0x54c6f0(_0x2ee6b2);
      }
    });
  });
}
function _0x44bd41(_0x31454b) {
  return new Promise(_0x3ac9a2 => {
    let _0x308eda = "pid=" + _0x31454b + "&activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&actorUuid=&userUuid=";
    $.post(_0x9b3103("/dingzhi/qqxing/pasture/exchange?_", _0x308eda), async (_0x2abdf3, _0x533c96, _0x5cce47) => {
      _0x366588(_0x533c96);
      try {
        _0x2abdf3 ? console.log($.name + " API请求失败，请检查网路重试") : (_0x5cce47 = JSON.parse(_0x5cce47), _0x5cce47.result ? (console.log("兑换 " + _0x5cce47.data.rewardName + "成功"), $.exchange += 20) : console.log(_0x5cce47.errorMessage, "\n"));
      } catch (_0x41f7eb) {
        $.logErr(_0x41f7eb, _0x533c96);
      } finally {
        _0x3ac9a2(_0x5cce47);
      }
    });
  });
}
function _0x55eb4a(_0x356a4a, _0x1ec4a6) {
  let _0x119d5f = _0x9b3103("/dingzhi/qqxing/pasture/doTask", "taskId=" + _0x356a4a + "&" + (_0x1ec4a6 ? "param=" + _0x1ec4a6 + "&" : "") + "activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&actorUuid=" + $.uuid + "&userUuid=" + $.shareuuid);
  return new Promise(_0x507530 => {
    $.post(_0x119d5f, async (_0x4f7a9c, _0x1a4dd5, _0x1acfca) => {
      _0x366588(_0x1a4dd5);
      try {
        _0x4f7a9c ? (console.log("" + JSON.stringify(_0x4f7a9c)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x1acfca = JSON.parse(_0x1acfca), _0x1acfca.result ? _0x1acfca.data.food && console.log("操作成功,获得饲料： " + _0x1acfca.data.food + "  抽奖机会：" + _0x1acfca.data.drawChance + "  成长值：" + _0x1acfca.data.growUp) : console.log(_0x1acfca.errorMessage));
      } catch (_0x39c120) {
        $.logErr(_0x39c120, _0x1a4dd5);
      } finally {
        _0x507530(_0x1acfca);
      }
    });
  });
}
function _0x59e0b7() {
  let _0x5d4b0e = _0x9b3103("/dingzhi/qqxing/pasture/luckydraw", "activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&actorUuid=&userUuid=");
  return new Promise(_0x4426c7 => {
    $.post(_0x5d4b0e, async (_0x4e3907, _0x314638, _0x40573b) => {
      _0x366588(_0x314638);
      try {
        _0x4e3907 ? (console.log("" + JSON.stringify(_0x4e3907)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x40573b = JSON.parse(_0x40573b), _0x40573b.result ? Object.keys(_0x40573b.data).length == 0 ? console.log("抽奖成功,恭喜你抽了个寂寞： ") : (console.log("恭喜你抽中 " + _0x40573b.data.prize.rewardName), $.drawresult += "恭喜你抽中 " + _0x40573b.data.prize.rewardName + " ") : console.log(_0x40573b.errorMessage));
      } catch (_0x2ff863) {
        $.logErr(_0x2ff863, _0x314638);
      } finally {
        _0x4426c7(_0x40573b);
      }
    });
  });
}
function _0x55191a(_0x4e8f68, _0x5d13d8) {
  return {
    "url": "https://lzdz-isv.isvjcloud.com" + _0x4e8f68 + "?" + _0x5d13d8,
    "headers": {
      "Host": "lzdz-isv.isvjcloud.com",
      "Accept": "application/json",
      "Referer": "https://lzdz-isv.isvjcloud.com",
      "user-agent": "jdapp;android;10.0.4;11;2393039353533623-7383235613364343;network/wifi;model/Redmi K30;addressid/138549750;aid/290955c2782e1c44;oaid/b30cf82cacfa8972;osVer/30;appBuild/88641;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x6ed046
    }
  };
}
function _0x9b3103(_0x38c5d3, _0x169388) {
  return {
    "url": "https://lzdz-isv.isvjcloud.com" + _0x38c5d3,
    "body": _0x169388,
    "headers": {
      "Host": "lzdz-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Referer": "https://lzdz-isv.isvjcloud.com",
      "user-agent": "jdapp;android;10.0.4;11;2393039353533623-7383235613364343;network/wifi;model/Redmi K30;addressid/138549750;aid/290955c2782e1c44;oaid/b30cf82cacfa8972;osVer/30;appBuild/88641;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x6ed046
    }
  };
}
function _0x12ca94(_0x75d401) {
  return new Promise(_0x1923f0 => {
    const _0x3ae3ae = {
      "url": _0x75d401 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x3ae3ae, async (_0x51fc01, _0x4e24ed, _0x5eaaf3) => {
      try {
        if (_0x51fc01) $.getAuthorCodeListerr = false;else {
          if (_0x5eaaf3) _0x5eaaf3 = JSON.parse(_0x5eaaf3);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x504b91) {
        $.logErr(_0x504b91, _0x4e24ed);
        _0x5eaaf3 = null;
      } finally {
        _0x1923f0(_0x5eaaf3);
      }
    });
  });
}
function _0x387f6f(_0x3c9eda, _0x29631e) {
  return Math.floor(Math.random() * (_0x29631e - _0x3c9eda)) + _0x3c9eda;
}
function _0x39650f(_0x3d4d30) {
  if (typeof _0x3d4d30 == "string") {
    try {
      return JSON.parse(_0x3d4d30);
    } catch (_0x4db01f) {
      return console.log(_0x4db01f), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}