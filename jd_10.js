/*
10豆

一次性脚本
2 15 * * * jd_10.js, tag=10豆, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

 */
const Env=require('./utils/Env.js');
const $ = new Env('10豆');
const ii1ll = $.isNode() ? require("./sendNotify") : "",
  IliI1l = $.isNode() ? require("./jdCookie.js") : "";
let lliiii = [],
  IliI1i = "",
  ll1ii;
if ($.isNode()) {
  Object.keys(IliI1l).forEach(ii1li => {
    lliiii.push(IliI1l[ii1li]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  lliiii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IllIII($.getdata("CookiesJD") || "[]").map(IIll1 => IIll1.cookie)].filter(ll1il => !!ll1il);
}
!(async () => {
  if (!lliiii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let Illl11 = 0; Illl11 < lliiii.length; Illl11++) {
    if (lliiii[Illl11]) {
      IliI1i = lliiii[Illl11];
      $.UserName = decodeURIComponent(IliI1i.match(/pt_pin=([^; ]+)(?=;?)/) && IliI1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Illl11 + 1;
      $.isLogin = true;
      $.nickName = "";
      ll1ii = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await ii1ll.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await IIli11();
    }
  }
})().catch(llIlli => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + llIlli + "!", "");
}).finally(() => {
  $.done();
});
function IIli11() {
  return new Promise(IiiIil => {
    $.post({
      url: "https://api.m.jd.com//client.action?functionId=userFollow&clientVersion=12.2.2&build=98996&client=android&partner=meizu&sdkVersion=28&lang=zh_CN&harmonyOs=0&networkType=UNKNOWN&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJontBvjXgff2EmU39niNGjuoImVfODJkDtCz%2F0fAihMUPLCWA6d2eiq6RUqDDrtiYuhKThXf6zWc%2BCMC1Gbvcd5n7TGLSYsiPCzb%2FGWQS7MQ8fqGI34SmxmzBM5kEAyyyeLkHuNBzkayXlWg5mpGu5l4jJ%2BClrCgi5Og29W4zxK9YWdRdfAleNg%3D%3D&uemps=0-0-2&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%2C%22cfgExt%22%3A%22%7B%5C%22privacyOffline%5C%22%3A%5C%220%5C%22%7D%22%7D&eid=eidAbe50812154s52W3u%2F3ixSA6WvCtlMm7PCdlt8ItlPPezHyW2qZARScMhTXOJGHHx5UJLXDeHzm54R1GRmOZJOHK7KGvT3sHPI9bm30Ro8YDMhilr&x-api-eid-token=jdd01YU5MULIZ4SDYW5QR2U6QX3CULI72BAMHYVHSYG5IIZC4HSEEA2WQFVJGHQD3NNJYNT3V5NJS52PMF2FAISE24YVMUFXW653PS7JODUQ01234567&ef=1&ep=%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1700742163690%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22area%22%3A%22CtTpCtKmDV8yCNK5XzC2Czq1%22%2C%22d_model%22%3A%22Jw90ZJu%3D%22%2C%22wifiBssid%22%3A%22dW5hbw93bq%3D%3D%22%2C%22osVersion%22%3A%22EG%3D%3D%22%2C%22d_brand%22%3A%22bWVfoxU%3D%22%2C%22screen%22%3A%22CtO5DMenCNqm%22%2C%22uuid%22%3A%22ZJO5CJPsDJK5CtPwYWUzYG%3D%3D%22%2C%22aid%22%3A%22ZJO5CJPsDJK5CtPwYWUzYG%3D%3D%22%2C%22openudid%22%3A%22ZJO5CJPsDJK5CtPwYWUzYG%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D&st=1700742201267&sign=6ffadb6d2fa557ce94639be96cfd8db1&sv=120",
      body: "body=%7B%22businessId%22%3A%221%22%2C%22themeId%22%3A%22838%22%2C%22type%22%3A%221%22%7D&",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: IliI1i,
        Host: "api.m.jd.com",
        "User-Agent": "okhttp/3.12.1;jdmall;android;version/10.1.3;build/90017;"
      }
    }, async (IiiIii, IIlll, liliI) => {
      try {
        IiiIii ? (console.log("" + $.toStr(IiiIii)), console.log("userFollow API请求失败，请检查网路重试")) : (liliI = JSON.parse(liliI), liliI && liliI.activityType == "2" ? console.log(liliI.resultMsg) : console.log("你已经关注过啦"));
      } catch (ll1lI) {
        $.logErr(ll1lI, IIlll);
      } finally {
        IiiIil();
      }
    });
  });
}
function IllIII(l1iii) {
  if (typeof l1iii == "string") {
    try {
      return JSON.parse(l1iii);
    } catch (lIIill) {
      console.log(lIIill);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}