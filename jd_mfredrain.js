/*
远程获取，自行运行
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#魔方红包雨
1 1 1 1 * jd_mfredrain.js, tag=魔方红包雨, enabled=true
 */
const Env=require('./utils/Env.js');
const $ = new Env('魔方红包雨');

const notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(iiliI => {
    cookiesArr.push(jdCookieNode[iiliI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(Ill11I => Ill11I.cookie)].filter(I1il1i => !!I1il1i);
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  let lI1l1i = "http://code.kingran.cf/mfyurl.json";
  authorCodeList = await getAuthorCodeList(lI1l1i);
  if (authorCodeList.length <= 0) {
    console.log("\n暂无活动~\n");
    return;
  }
  for (let Il1i1I = 0; Il1i1I < cookiesArr.length; Il1i1I++) {
    if (cookiesArr[Il1i1I]) {
      cookie = cookiesArr[Il1i1I];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Il1i1I + 1;
      $.isLogin = true;
      $.nickName = "";
      UA = getUA();
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      for (let iIIilI = 0; iIIilI < authorCodeList.length; iIIilI++) {
        $.encryptProjectId = authorCodeList[iIIilI].encryptProjectId;
        $.encryptAssignmentId = authorCodeList[iIIilI].encryptAssignmentId;
        console.log("开始第" + (iIIilI + 1) + "个活动 " + $.encryptProjectId);
        console.log("");
        await dotask();
        console.log("");
        await $.wait(1000);
      }
    }
  }
})().catch(Ii1iil => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Ii1iil + "!", "");
}).finally(() => {
  $.done();
});
async function dotask() {
  return new Promise(async Iil1il => {
    $.get(taskUrl(), async (Ilil11, i1ii1, il1ii) => {
      try {
        if (Ilil11) {
          console.log("" + JSON.stringify(Ilil11));
          console.log("doInteractiveAssignment API请求失败，请检查网路重试");
        } else {
          il1ii = JSON.parse(il1ii);
          if (il1ii.subCode == 0) {
            console.log(JSON.stringify(il1ii.rewardsInfo));
          } else console.log(il1ii.msg);
        }
      } catch (liI1ii) {
        $.logErr(liI1ii, i1ii1);
      } finally {
        Iil1il(il1ii);
      }
    });
  });
}
async function getNewsComerWindow() {
  return new Promise(async liI1iI => {
    const llIlII = {
      "url": "https://api.m.jd.com/client.action?functionId=getNewsComerWindow&lmt=0&clientVersion=11.2.8&build=98380&client=android&partner=oppo&eid=eidAfea581218ds3r6vxnUdvS3yU8Zjjeu4jBq+r8yDlNMAWdRVBOHn+wcf7a1qGnYVfQ2xpIn4AYEaNjd1I4P2qmkDGd+F8PBSUlEZ4/RMU83wPmSBH&sdkVersion=28&lang=zh_CN&harmonyOs=0&networkType=wifi&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJgHew6f2YVOT52hi3mV5rR8WhyAVTyjkMcyqipp9LYvDuLuIcSGLdUicoXn17%2F6syDLJSbtqGaYdPwQR9LFTcIlc7gC0Y8TmqzZBBXd1nnEqrumvIx4swc9DDOrzbbhll9G83pUt0tvG0RgNKvn2QbPBhBT1FhBMGKgBVJ918sM1%2B01N%2FgZc3Bw%3D%3D&uemps=0-1&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&avifSupport=1&acs=1&ef=1&ep=%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1669557577661%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22area%22%3A%22Cv8yENO3XzLpCK%3D%3D%22%2C%22d_model%22%3A%22J05PUOnVU0OzCNKm%22%2C%22wifiBssid%22%3A%22dW5hbw93bq%3D%3D%22%2C%22osVersion%22%3A%22EG%3D%3D%22%2C%22d_brand%22%3A%22J25vUQn1cm%3D%3D%22%2C%22screen%22%3A%22CJuyCMenCNqm%22%2C%22uuid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%2C%22aid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D&st=1669557612931&sign=2c7239d5b1c91af7865546a6a4fdb99e&sv=122",
      "body": "lmt=0&body=%7B%7D&",
      "headers": {
        "Cookie": cookie,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "jdltapp;iPhone;3.3.2;14.5.1network/wifi;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;model/iPhone13,2;addressid/137923973;hasOCPay/0;appBuild/1047;supportBestPay/0;pv/467.11;apprpd/MyJD_Main;",
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8"
      }
    };
    $.post(llIlII, async (IIlII, lIIiII, i1iIlI) => {
      try {
        IIlII ? (console.log("" + JSON.stringify(IIlII)), console.log($.name + " API请求失败，请检查网路重试")) : safeGet(i1iIlI) && (i1iIlI = $.toObj(i1iIlI));
      } catch (ll1I1) {
        $.logErr(ll1I1, lIIiII);
      } finally {
        liI1iI(i1iIlI);
      }
    });
  });
}
async function isUserFollow() {
  return new Promise(async IIlI1 => {
    const i1iIli = {
      "url": "https://api.m.jd.com/client.action?functionId=isUserFollow&lmt=0&clientVersion=11.2.8&build=98380&client=android&partner=oppo&eid=eidAfea581218ds3r6vxnUdvS3yU8Zjjeu4jBq+r8yDlNMAWdRVBOHn+wcf7a1qGnYVfQ2xpIn4AYEaNjd1I4P2qmkDGd+F8PBSUlEZ4/RMU83wPmSBH&sdkVersion=28&lang=zh_CN&harmonyOs=0&networkType=wifi&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJgHew6f2YVOT52hi3mV5rR8WhyAVTyjkMcyqipp9LYvDuLuIcSGLdUicoXn17%2F6syDLJSbtqGaYdPwQR9LFTcIlc7gC0Y8TmqzZBBXd1nnEqrumvIx4swc9DDOrzbbhll9G83pUt0tvG0RgNKvn2QbPBhBT1FhBMGKgBVJ918sM1%2B01N%2FgZc3Bw%3D%3D&uemps=0-1&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&avifSupport=1&acs=1&ef=1&ep=%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1669557577661%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22area%22%3A%22Cv8yENO3XzLpCK%3D%3D%22%2C%22d_model%22%3A%22J05PUOnVU0OzCNKm%22%2C%22wifiBssid%22%3A%22dW5hbw93bq%3D%3D%22%2C%22osVersion%22%3A%22EG%3D%3D%22%2C%22d_brand%22%3A%22J25vUQn1cm%3D%3D%22%2C%22screen%22%3A%22CJuyCMenCNqm%22%2C%22uuid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%2C%22aid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D&st=1669557623437&sign=32fca984dd198de2d66fdcef4bb76580&sv=112",
      "body": "lmt=0&body=%7B%22businessId%22%3A%221%22%2C%22informationParam%22%3A%7B%22eid%22%3A%22eidAfea581218ds3r6vxnUdvS3yU8Zjjeu4jBq%2Br8yDlNMAWdRVBOHn%2Bwcf7a1qGnYVfQ2xpIn4AYEaNjd1I4P2qmkDGd%2BF8PBSUlEZ4%2FRMU83wPmSBH%22%2C%22fp%22%3A0%2C%22isRvc%22%3A0%2C%22openId%22%3A-1%2C%22referUrl%22%3A-1%2C%22shshshfp%22%3A-1%2C%22shshshfpa%22%3A-1%2C%22userAgent%22%3A-1%7D%2C%22themeId%22%3A%22571%22%7D&",
      "headers": {
        "Cookie": cookie,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "jdltapp;iPhone;3.3.2;14.5.1network/wifi;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;model/iPhone13,2;addressid/137923973;hasOCPay/0;appBuild/1047;supportBestPay/0;pv/467.11;apprpd/MyJD_Main;",
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8"
      }
    };
    $.post(i1iIli, async (i1iIll, i1lliI, liI1l1) => {
      try {
        i1iIll ? (console.log("" + JSON.stringify(i1iIll)), console.log($.name + " API请求失败，请检查网路重试")) : safeGet(liI1l1) && (liI1l1 = $.toObj(liI1l1));
      } catch (IllIlI) {
        $.logErr(IllIlI, i1lliI);
      } finally {
        IIlI1(liI1l1);
      }
    });
  });
}
function taskUrl() {
  return {
    "url": "https://api.m.jd.com/client.action?client=wh5&clientVersion=1.0.0&appid=redrain-2021&functionId=doInteractiveAssignment&body=%7B%22completionFlag%22:true,%22sourceCode%22:%22acehby20210924%22,%22encryptProjectId%22:%22" + $.encryptProjectId + "%22,%22encryptAssignmentId%22:%22" + $.encryptAssignmentId + "%22%7D",
    "headers": {
      "Host": "api.m.jd.com",
      "accept": "application/json, text/plain, */*",
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "Cookie": cookie + "__jda=123.1667062890194343232284.1667062890.1667794766.1667893339.9;"
    }
  };
}
function getUA() {
  getstr = function (Ii1I1i) {
    let IIlIl = "",
      ili11l = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let Iiilll = 0; Iiilll < Ii1I1i; Iiilll++) {
      let Iiilli = Math.round(Math.random() * (ili11l.length - 1));
      IIlIl += ili11l.substring(Iiilli, Iiilli + 1);
    }
    return IIlIl;
  };
  let lliiIi = Buffer.from(getstr(16), "utf8").toString("base64"),
    iiIi1I = getstr(48);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": Date.now(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": lliiIi,
      "od": iiIi1I,
      "ov": "Ctq=",
      "ud": lliiIi
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.2.0;;;appBuild/98413;ef/1;ep/" + ep + ";Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046033 Mobile Safari/537.36";
}
function getAuthorCodeList(IIlIi) {
  return new Promise(liI1ll => {
    const IllIil = {
      "url": IIlIi + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IllIil, async (ill1Ii, llIIl1, ill1Il) => {
      try {
        if (ill1Ii) $.getAuthorCodeListerr = false;else {
          if (ill1Il) ill1Il = JSON.parse(ill1Il);
          $.getAuthorCodeListerr = true;
        }
      } catch (Ii1I1I) {
        $.logErr(Ii1I1I, llIIl1);
        ill1Il = null;
      } finally {
        liI1ll(ill1Il);
      }
    });
  });
}
function random(lliiI1, IiiI1) {
  return Math.floor(Math.random() * (IiiI1 - lliiI1)) + lliiI1;
}
function safeGet(l1i1Il) {
  try {
    if (typeof JSON.parse(l1i1Il) == "object") {
      return true;
    }
  } catch (IIIi1) {
    return console.log(IIIi1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function jsonParse(i1llli) {
  if (typeof i1llli == "string") {
    try {
      return JSON.parse(i1llli);
    } catch (I1I1lI) {
      return console.log(I1I1lI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}