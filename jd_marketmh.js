/*
超市盲盒
入口：京东APP-更多-超市盲盒
11 14 * * *  jd_marketmh.js
 */

const Env=require('./utils/Env.js');
const $ = new Env('超市盲盒');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
  cookie = "";
let linkId = "qHqXOx2bvqgFOzTH_-iJoQ";
$.shareCoseList = [];
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xffc4x2d => {
    cookiesArr.push(jdCookieNode[_0xffc4x2d]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0xffc4x2f => {
    return _0xffc4x2f.cookie;
  })].filter(_0xffc4x2e => {
    return !!_0xffc4x2e;
  });
}
!(async () => {
  console.log("活动入口：京东APP-更多-超市盲盒");
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let _0xffc4x4c = 0; _0xffc4x4c < cookiesArr.length; _0xffc4x4c++) {
    cookie = cookiesArr[_0xffc4x4c];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xffc4x4c + 1;
      $.isLogin = true;
      $.nickName = "";
      $.flag = true;
      UA = getUA();
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        continue;
      }
      console.log("-------------------【京东账号" + $.index + "】-------------------");
      await main();
      await $.wait(2000);
      if ($.index % 10 == 0) {
        await $.wait(parseInt(Math.random() * 1000 + 8000, 10));
      }
    }
  }
})().catch(_0xffc4x31 => {
  return $.logErr(_0xffc4x31);
}).finally(() => {
  return $.done();
});
async function main() {
  await starShopPageInfo({
    "taskId": "",
    "linkId": linkId,
    "encryptPin": ""
  });
  if (Date.now() > $.drawts) {
    console.log("开礼盒时间到，去开...");
    for (let _0xffc4x6f = 0; _0xffc4x6f < $.drawtimes; _0xffc4x6f++) {
      await openBox({
        "linkId": linkId,
        "endTime": $.endTime
      });
      await $.wait(500);
    }
  }
  if (!$.isDailyRaffle) {
    console.log("每天一次小惊喜，去开...");
    await starShopDraw({
      "linkId": linkId,
      "isDailyRaffle": true
    });
  }
  await $.wait(1000);
  await apTaskList({
    "linkId": linkId
  });
  if ($.allList) {
    for (let _0xffc4x70 = 0; _0xffc4x70 < $.allList.length; _0xffc4x70++) {
      $.oneTask = $.allList[_0xffc4x70];
      if (["SIGN"].includes($.oneTask.taskType) && $.oneTask.taskFinished === false) {
        await apDoTask({
          "taskId": $.allList[_0xffc4x70].id,
          "taskType": $.allList[_0xffc4x70].taskType,
          "linkId": linkId
        });
      }
      if (["BROWSE_CHANNEL"].includes($.oneTask.taskType) && $.oneTask.taskFinished === false) {
        await apTaskDetail({
          "taskId": $.oneTask.id,
          "taskType": $.oneTask.taskType,
          "channel": 4,
          "linkId": linkId
        });
        await $.wait(1000);
        for (let _0xffc4x71 = 0; _0xffc4x71 < $.doList.status.finishNeed - $.doList.status.userFinishedTimes; _0xffc4x71++) {
          $.startList = $.doList.taskItemList[_0xffc4x71];
          $.itemName = $.doList.taskItemList[_0xffc4x71].itemName;
          console.log("去浏览" + $.itemName);
          await apDoTask({
            "taskId": $.allList[_0xffc4x70].id,
            "taskType": $.allList[_0xffc4x70].taskType,
            "channel": 4,
            "itemId": $.startList.itemId,
            "linkId": linkId
          });
          await $.wait(1000);
        }
      }
    }
  } else {
    console.log("无任务数据！");
  }
}
async function starShopPageInfo(_0xffc4x75) {
  const _0xffc4x85 = {
    "functionId": "starShopPageInfo",
    "appid": "activities_platform",
    "clientVersion": "11.2.0",
    "client": "ios",
    "body": _0xffc4x75
  };
  const _0xffc4x86 = await getH5st("1d456", _0xffc4x85);
  if (!_0xffc4x86) {
    console.log("\n未获取到数据，请检查网络");
    return;
  }
  return new Promise(_0xffc4x87 => {
    $.get(taskPostUrl(_0xffc4x86), (_0xffc4x8d, _0xffc4x8e, _0xffc4x8f) => {
      try {
        if (_0xffc4x8d) {
          console.log("" + JSON.stringify(_0xffc4x8d));
          console.log("starShopPageInfo 请求失败，请检查网路重试");
        } else {
          _0xffc4x8f = JSON.parse(_0xffc4x8f);
          if (_0xffc4x8f.code === 0) {
            $.flag = _0xffc4x8f.data.isDailyRaffle;
            $.drawtimes = _0xffc4x8f.data.avaiableTimes;
            $.drawts = _0xffc4x8f.data.planDrawTime;
            $.endTime = _0xffc4x8f.data.endTime;
            $.isDailyRaffle = _0xffc4x8f.data.isDailyRaffle || false;
            $.encryptPin = _0xffc4x8f.data.encryptPin || "";
            console.log("当前积分：" + _0xffc4x8f.data.currentGoodRoleValue);
          } else {
            console.log("starShopPageInfo：" + JSON.stringify(_0xffc4x8f));
          }
        }
      } catch (_0x5adc64) {
        $.logErr(_0x5adc64, _0xffc4x8e);
      } finally {
        _0xffc4x87();
      }
    });
  });
}
function apTaskList(_0xffc4x9a) {
  return new Promise(_0xffc4xa5 => {
    $.get(taskGetUrl("apTaskList", _0xffc4x9a), (_0xffc4xa8, _0xffc4xa9, _0xffc4xaa) => {
      try {
        if (_0xffc4xa8) {
          console.log("" + JSON.stringify(_0xffc4xa8));
          console.log($.name + " apTaskList API请求失败，请检查网路重试");
        } else {
          _0xffc4xaa = JSON.parse(_0xffc4xaa);
          if (_0xffc4xaa.code === 0) {
            $.allList = _0xffc4xaa.data;
          } else {
            console.log("apTaskList错误：" + JSON.stringify(_0xffc4xaa));
          }
        }
      } catch (_0xfa664a) {
        $.logErr(_0xfa664a, _0xffc4xa9);
      } finally {
        _0xffc4xa5();
      }
    });
  });
}
function apTaskDetail(_0xffc4xad) {
  return new Promise(_0xffc4xbb => {
    $.get(taskGetUrl("apTaskDetail", _0xffc4xad), (_0xffc4xbe, _0xffc4xbf, _0xffc4xc0) => {
      try {
        if (_0xffc4xbe) {
          console.log("" + JSON.stringify(_0xffc4xbe));
          console.log($.name + " apTaskDetail API请求失败，请检查网路重试");
        } else {
          _0xffc4xc0 = JSON.parse(_0xffc4xc0);
          if (_0xffc4xc0.code === 0) {
            $.doList = _0xffc4xc0.data;
          } else {
            console.log("apTaskDetail错误：" + JSON.stringify(_0xffc4xc0));
          }
        }
      } catch (_0x220332) {
        $.logErr(_0x220332, _0xffc4xbf);
      } finally {
        _0xffc4xbb();
      }
    });
  });
}
async function apDoTask(_0xffc4xc5) {
  const _0xffc4xd0 = {
    "functionId": "apDoTask",
    "appid": "activities_platform",
    "clientVersion": "11.2.0",
    "client": "ios",
    "body": _0xffc4xc5
  };
  const _0xffc4xd1 = await getH5st("54ed7", _0xffc4xd0);
  return new Promise(_0xffc4xd2 => {
    $.post(taskPostUrl(_0xffc4xd1), (_0xffc4xd9, _0xffc4xda, _0xffc4xdb) => {
      try {
        if (_0xffc4xd9) {
          console.log("" + JSON.stringify(_0xffc4xd9));
          console.log($.name + " apDoTask API请求失败，请检查网路重试");
        } else {
          _0xffc4xdb = JSON.parse(_0xffc4xdb);
          if (_0xffc4xdb.success === true && _0xffc4xdb.code === 0) {
            console.log("任务完成！");
          } else {
            if (_0xffc4xdb.success === false && _0xffc4xdb.code === 2005) {
              console.log("" + _0xffc4xdb.data.errMsg + _0xffc4xdb.data.userFinishedTimes + "次");
            }
          }
        }
      } catch (_0x1ae6a3) {
        $.logErr(_0x1ae6a3, _0xffc4xda);
      } finally {
        _0xffc4xd2();
      }
    });
  });
}
async function openBox(_0xffc4xdd) {
  const _0xffc4xe8 = {
    "functionId": "starShopPopStatus",
    "appid": "activities_platform",
    "clientVersion": "11.2.0",
    "client": "ios",
    "body": _0xffc4xdd
  };
  const _0xffc4xe9 = await getH5st("73559", _0xffc4xe8);
  return new Promise(_0xffc4xea => {
    $.get(taskPostUrl(_0xffc4xe9), (_0xffc4xf2, _0xffc4xf3, _0xffc4xf4) => {
      try {
        if (_0xffc4xf2) {
          console.log("" + JSON.stringify(_0xffc4xf2));
          console.log($.name + " openBox API请求失败，请检查网路重试");
        } else {
          _0xffc4xf4 = JSON.parse(_0xffc4xf4);
          if (_0xffc4xf4.success === true && _0xffc4xf4.code === 0 && _0xffc4xf4.data.rewardType === 2) {
            console.log("开箱成功获得" + _0xffc4xf4.data.discount + "元红包");
          } else {
            if (_0xffc4xf4.success === true && _0xffc4xf4.code === 0 && _0xffc4xf4.data.rewardType !== 2) {
              console.log("开箱成功应该获得了空气" + JSON.stringify(_0xffc4xf4.data));
            } else {
              console.log("失败：" + JSON.stringify(_0xffc4xf4));
            }
          }
        }
      } catch (_0x1c0b81) {
        $.logErr(_0x1c0b81, _0xffc4xf3);
      } finally {
        _0xffc4xea();
      }
    });
  });
}
async function starShopDraw(_0xffc4xf8) {
  const _0xffc4x116 = {
    "functionId": "starShopDraw",
    "appid": "activities_platform",
    "clientVersion": "11.2.0",
    "client": "ios",
    "body": _0xffc4xf8
  };
  const _0xffc4x117 = await getH5st("568c6", _0xffc4x116);
  return new Promise(_0xffc4x118 => {
    $.get(taskPostUrl(_0xffc4x117), (_0xffc4x11c, _0xffc4x11d, _0xffc4x11e) => {
      try {
        if (_0xffc4x11c) {
          console.log("" + JSON.stringify(_0xffc4x11c));
          console.log($.name + " starShopDraw API请求失败，请检查网路重试");
        } else {
          _0xffc4x11e = JSON.parse(_0xffc4x11e);
          if (_0xffc4x11e.success === true && _0xffc4x11e.code === 0 && _0xffc4x11e.data.rewardType === 2) {
            console.log("每日盲盒成功,获得" + _0xffc4x11e.data.discount + "元红包");
          } else {
            if (_0xffc4x11e.success === true && _0xffc4x11e.code === 0 && _0xffc4x11e.data.prizeType == 1) {
              console.log("每日盲盒成功,获得：" + _0xffc4x11e.data.limitStr + "的" + _0xffc4x11e.data.prizeConfigName);
            } else {
              if (_0xffc4x11e.code === 10004) {
                console.log(_0xffc4x11e.errMsg);
              } else {
                console.log("失败：" + JSON.stringify(_0xffc4x11e));
              }
            }
          }
        }
      } catch (_0x4c5e63) {
        $.logErr(_0x4c5e63, _0xffc4x11d);
      } finally {
        _0xffc4x118();
      }
    });
  });
}
function getUA() {
  getstr = function (_0xffc4x12e) {
    let _0xffc4x12f = "",
      _0xffc4x130 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let _0xffc4x131 = 0; _0xffc4x131 < _0xffc4x12e; _0xffc4x131++) {
      let _0xffc4x132 = Math.round(Math.random() * (_0xffc4x130.length - 1));
      _0xffc4x12f += _0xffc4x130.substring(_0xffc4x132, _0xffc4x132 + 1);
    }
    return _0xffc4x12f;
  };
  let _0xffc4x133 = Buffer.from(getstr(16), "utf8").toString("base64");
  let _0xffc4x134 = getstr(48);
  ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": Date.now(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": _0xffc4x133,
      "od": _0xffc4x134,
      "ov": "Ctq=",
      "ud": _0xffc4x133
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  }));
  return "jdapp;android;11.2.0;;;appBuild/98413;ef/1;ep/" + ep + ";Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046033 Mobile Safari/537.36";
}
function getToken(_0xffc4x136 = 0) {
  return new Promise(_0xffc4x13d => {
    setTimeout(() => {
      let _0xffc4x144 = {
        "url": "https://bh.m.jd.com/gettoken",
        "headers": {
          "Content-Type": "text/plain;charset=UTF-8"
        },
        "body": "content={\"appname\":\"50084\",\"whwswswws\":\"\",\"jdkey\":\"\",\"body\":{\"platform\":\"1\"}}"
      };
      $.post(_0xffc4x144, async (_0xffc4x145, _0xffc4x146, _0xffc4x147) => {
        try {
          _0xffc4x147 = JSON.parse(_0xffc4x147);
          joyToken = _0xffc4x147.joyytoken;
          console.log("joyToken = " + _0xffc4x147.joyytoken);
        } catch (_0x2013cf) {
          $.logErr(_0x2013cf, _0xffc4x146);
        } finally {
          _0xffc4x13d();
        }
      });
    }, _0xffc4x136);
  });
}
function taskGetUrl(_0xffc4x149, _0xffc4x14a = {}) {
  return {
    "url": "https://api.m.jd.com/?functionId=" + _0xffc4x149 + "&body=" + JSON.stringify(_0xffc4x14a) + "&_t=" + Date.now() + "&appid=activities_platform&client=wh5&clientVersion=1.0.0",
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Cookie": cookie,
      "Origin": "https://prodev.m.jd.com",
      "Referer": "https://prodev.m.jd.com/mall/active/3z9BVbnAa1sVy88yEyKdp9wcWZ7Z/index.html?"
    }
  };
}
function taskPostUrl(_0xffc4x14d) {
  return {
    "url": "https://api.m.jd.com/?" + _0xffc4x14d,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Cookie": cookie,
      "Origin": "https://prodev.m.jd.com",
      "Referer": "https://prodev.m.jd.com/mall/active/3z9BVbnAa1sVy88yEyKdp9wcWZ7Z/index.html?"
    }
  };
}
async function getH5st(_0xffc4x150, _0xffc4x151) {
  let _0xffc4x164 = {
    "appId": _0xffc4x150,
    ..._0xffc4x151,
    "ua": UA,
    "pin": $.UserName
  };
  let _0xffc4x165 = {
    "url": "http://kr.kingran.cf/h5st",
    "body": JSON.stringify(_0xffc4x164),
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 30000
  };
  return new Promise(async _0xffc4x166 => {
    $.post(_0xffc4x165, (_0xffc4x16b, _0xffc4x16c, _0xffc4x164) => {
      let _0xffc4x170 = "";
      try {
        if (_0xffc4x16b) {
          console.log("" + JSON.stringify(_0xffc4x16b));
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {
          _0xffc4x164 = JSON.parse(_0xffc4x164);
          if (typeof _0xffc4x164 === "object" && _0xffc4x164 && _0xffc4x164.body) {
            if (_0xffc4x164.body) {
              _0xffc4x170 = _0xffc4x164.body || "";
            }
          } else {
            if (_0xffc4x164.code == 400) {
              console.log("\n" + _0xffc4x164.msg);
            } else {
              console.log("\n可能连接不上接口，请检查网络");
            }
          }
        }
      } catch (_0x14921c) {
        $.logErr(_0x14921c, _0xffc4x16c);
      } finally {
        _0xffc4x166(_0xffc4x170);
      }
    });
  });
}
function jsonParse(_0xffc4x174) {
  if (typeof _0xffc4x174 == "string") {
    try {
      return JSON.parse(_0xffc4x174);
    } catch (_0x923150) {
      console.log(_0x923150);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}