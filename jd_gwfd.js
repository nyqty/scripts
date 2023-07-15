/*
非plus购物返豆领取
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_gwfd.js
updatetime:2023/4/29
 */
const Env=require('./utils/Env.js');
const $ = new Env('购物返豆领取');
const lliI1li = $.isNode() ? require("./sendNotify") : "",
  Ii1i1il1 = $.isNode() ? require("./jdCookie.js") : "",
  iiiI1l = require("./USER_AGENTS");
let I1i1Ii1i = true,
  l1llllli = [],
  Ill1lIl1 = "",
  ll11iIi = "";
if ($.isNode()) {
  Object.keys(Ii1i1il1).forEach(lIi1IiII => {
    l1llllli.push(Ii1i1il1[lIi1IiII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1llllli = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIlii1l($.getdata("CookiesJD") || "[]").map(i11lIiII => i11lIiII.cookie)].filter(IllIiII1 => !!IllIiII1);
!(async () => {
  if (!l1llllli[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let liliii1I = 0; liliii1I < l1llllli.length; liliii1I++) {
    if (l1llllli[liliii1I]) {
      Ill1lIl1 = l1llllli[liliii1I];
      $.UserName = decodeURIComponent(Ill1lIl1.match(/pt_pin=([^; ]+)(?=;?)/) && Ill1lIl1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = liliii1I + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = iiiI1l.UARAM ? iiiI1l.UARAM() : iiiI1l.USER_AGENT;
      await l1IillII();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lliI1li.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await lilI1Il();
      if ($.orderlist.length == 0) {
        console.log("没有可领取！！！");
        continue;
      }
      let lIll1iiI = $.orderlist.map(Ii1lliI1 => Ii1lliI1.orderIdStr);
      await il1lilll(lIll1iiI);
      await $.wait(3000);
    }
  }
})().catch(IIl1II1I => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + IIl1II1I + "!", "");
}).finally(() => {
  $.done();
});
async function lilI1Il() {
  return new Promise(async liiIIIIi => {
    $.get(Iiii111l("manualCollectIndex", "%7B%22source%22%3A%22ljdhome%22%2C%22rnClient%22%3A%221%22%7D&appid=ld&clientVersion=11.6.5&client=android"), async (iIlIIIll, iIIIi1li, IlIli) => {
      try {
        if (iIlIIIll) {
          console.log("" + JSON.stringify(iIlIIIll));
          console.log(" API请求失败，请检查网路重试");
        } else {
          IlIli = JSON.parse(IlIli);
          IlIli.code == 0 ? $.orderlist = IlIli.data?.["orderList"] || [] : console.log(JSON.stringify(IlIli));
        }
      } catch (iIlIllII) {
        $.logErr(iIlIllII, iIIIi1li);
      } finally {
        liiIIIIi(IlIli);
      }
    });
  });
}
async function il1lilll(lii1l11I) {
  return new Promise(async lI11I1lI => {
    $.get(Iiii111l("manualCollectBeans", "%7B%22orderIdList%22%3A%5B%22" + encodeURIComponent(lii1l11I.toString()) + "%22%5D%7D&appid=ld&clientVersion=11.6.5&client=android"), async (IiIlIil, I1il11l1, I1l1Ii1) => {
      try {
        if (IiIlIil) {
          console.log("" + JSON.stringify(IiIlIil));
          console.log(" API请求失败，请检查网路重试");
        } else {
          I1l1Ii1 = JSON.parse(I1l1Ii1);
          if (I1l1Ii1.code == 0) {
            if (I1l1Ii1.data.collectStatus == 0) $.log("领取成功！！");else {
              console.log(JSON.stringify(I1l1Ii1));
            }
          } else console.log(JSON.stringify(I1l1Ii1));
        }
      } catch (I11l11Ii) {
        $.logErr(I11l11Ii, I1il11l1);
      } finally {
        lI11I1lI(I1l1Ii1);
      }
    });
  });
}
function Iiii111l(lIilIiIi, Ili11lil) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + lIilIiIi + "&body=" + Ili11lil,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://h5.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": Ill1lIl1
    }
  };
}
function l1IillII() {
  return new Promise(IiIIiliI => {
    const i1Il1iI1 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": Ill1lIl1,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(i1Il1iI1, (IllIIii1, l1l1I11, l1liiil) => {
      try {
        if (l1liiil) {
          l1liiil = JSON.parse(l1liiil);
          if (l1liiil.islogin === "1") {} else l1liiil.islogin === "0" && ($.isLogin = false);
        }
      } catch (Ill1iIl) {
        console.log(Ill1iIl);
      } finally {
        IiIIiliI();
      }
    });
  });
}
function iiI1lIlI() {
  return new Promise(IlIll1i1 => {
    !I1i1Ii1i ? $.msg($.name, "", "" + ll11iIi) : $.log("京东账号" + $.index + $.nickName + "\n" + ll11iIi);
    IlIll1i1();
  });
}
function lli1iIll(lIil1iIi) {
  try {
    if (typeof JSON.parse(lIil1iIi) == "object") return true;
  } catch (l1111lII) {
    return console.log(l1111lII), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function lIlii1l(IIIiII) {
  const IiiI111l = function () {
      let ii1IlIll = true;
      return function (iI1i11ll, IiilIIIl) {
        const III11iII = ii1IlIll ? function () {
          if (IiilIIIl) {
            const iIlIIlI = IiilIIIl.apply(iI1i11ll, arguments);
            return IiilIIIl = null, iIlIIlI;
          }
        } : function () {};
        return ii1IlIll = false, III11iII;
      };
    }(),
    ill1ii1I = IiiI111l(this, function () {
      return ill1ii1I.toString().search("(((.+)+)+)+$").toString().constructor(ill1ii1I).search("(((.+)+)+)+$");
    });
  ill1ii1I();
  if (typeof IIIiII == "string") try {
    return JSON.parse(IIIiII);
  } catch (lIlil11i) {
    return console.log(lIlil11i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}