/*
#京东晚八点红包雨

[task_local]
#京东晚八点红包雨
0 0 20 * * jd_xyhby.js, tag=京东晚八点红包雨, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/

const Env=require('./utils/Env.js');
const $ = new Env("京东晚八点红包雨");

const Ill1I = $.isNode() ? require("./jdCookie") : "";
let lIli11 = [],
  lllI1I = "";
if ($.isNode()) {
  Object.keys(Ill1I).forEach(II1il => {
    lIli11.push(Ill1I[II1il]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  lIli11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...llI1I1($.getdata("CookiesJD") || "[]").map(lllI11 => lllI11.cookie)].filter(I1lIll => !!I1lIll);
}
!(async () => {
  if (!lIli11[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IIIII1 = 0; IIIII1 < lIli11.length; IIIII1++) {
    if (lIli11[IIIII1]) {
      lllI1I = lIli11[IIIII1];
      $.UserName = decodeURIComponent(lllI1I.match(/pt_pin=([^; ]+)(?=;?)/) && lllI1I.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIIII1 + 1;
      $.canUseCoinAmount = 0;
      console.log("");
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await iiillI();
      await $.wait(500);
    }
  }
})().catch(ii1ili => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + ii1ili + "!", "");
}).finally(() => {
  $.done();
});
async function liil11() {
  return new Promise(async II11li => {
    const I1l11i = {
        functionId: "wheelsLottery",
        appid: "activities_platform",
        clientVersion: "11.1.0",
        client: "ios",
        body: {
          linkId: "7m_tf2OArtOndOSDV7IWeQ"
        }
      },
      iIIiiI = await l1l111("bd6c8", I1l11i);
    let liiI1i = {
      url: "https://api.m.jd.com/?functionId=wheelsLottery&" + iIIiiI,
      headers: {
        Referer: "https://pro.m.jd.com/mall/active/2iKbfCXwhMX2SVuGDFEcKcDjbtUC/index.html",
        origin: "https://pro.m.jd.com",
        "User-Agent": "jdpingou;iPhone;5.30.0;appBuild/100977;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/225;pap/JA2019_3111789;supportJDSHWK/1;ef/1;ep/%7B%22ciphertype%22:5,%22cipher%22:%7B%22ud%22:%22ZtVsDtvuZwC0CzdsZWTuEWS0YWS5DJTrDJTvDWSnZJu1YzU2CtVvDq==%22,%22bd%22:%22YXLmbQU=%22,%22iad%22:%22%22,%22sv%22:%22CJGkEK==%22%7D,%22ts%22:1677227105,%22hdid%22:%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=%22,%22version%22:%221.0.3%22,%22appname%22:%22com.360buy.jdpingou%22,%22ridx%22:-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        Cookie: lllI1I + "cid=8"
      }
    };
    $.get(liiI1i, async (ililIi, lilIIl, ililIl) => {
      try {
        ililIl = JSON.parse(ililIl);
        if (ililIl) {
          if (ililIl.code == 0 && ililIl.success == true) {
            console.log("抽中：" + ililIl.data.prizeName);
          } else {
            ililIl.code == 2000 && ililIl.msg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : console.log(ililIl.errMsg);
          }
        }
      } catch (i1l1II) {
        $.logErr(i1l1II, lilIIl);
      } finally {
        II11li();
      }
    });
  });
}
async function iiillI() {
  return new Promise(async i1i11i => {
    let Iil1lI = {
      url: "https://api.m.jd.com/api?appid=hongbaoyu&functionId=redRainStartLottery&body=%7B%22projectId%22%3A%22170490597608554627%22%2C%22activityId%22%3A%22de0f9cdc5b1a40ffa6ce6ab7f74ee589%22%7D&h5st=20231031202607448%3B9454428645544995%3B16073%3Btk02w99bb1c5418nGG60VMm0VpYmpaW1kWLQoW1OAASkw6cVyCP5jGHxlXaTHSrXbeFkPwtGoS1Gga2mnDGo0mtDfhr8%3B62de9622d29de789413f8ea81685361b6df2d34b2d78174b74ad56aa55a75712%3B3.0%3B1698755167448",
      headers: {
        Referer: "https://h5.m.jd.com/pb/015795320/3oqPgQ3enN5J89L4GBu436gEiMhu/index.html?id=170490597608554627&trackId=01579532&babelChannel=ttt1",
        origin: "https://h5.m.jd.com",
        "User-Agent": "jdpingou;iPhone;5.30.0;appBuild/100977;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/225;pap/JA2019_3111789;supportJDSHWK/1;ef/1;ep/%7B%22ciphertype%22:5,%22cipher%22:%7B%22ud%22:%22ZtVsDtvuZwC0CzdsZWTuEWS0YWS5DJTrDJTvDWSnZJu1YzU2CtVvDq==%22,%22bd%22:%22YXLmbQU=%22,%22iad%22:%22%22,%22sv%22:%22CJGkEK==%22%7D,%22ts%22:1677227105,%22hdid%22:%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=%22,%22version%22:%221.0.3%22,%22appname%22:%22com.360buy.jdpingou%22,%22ridx%22:-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        Cookie: lllI1I + "cid=8"
      }
    };
    $.get(Iil1lI, async (il1iII, iilli, IlllIl) => {
      try {
        IlllIl = JSON.parse(IlllIl);
        console.log(JSON.stringify(IlllIl));
      } catch (II11lI) {
        $.logErr(II11lI, iilli);
      } finally {
        i1i11i();
      }
    });
  });
}
function l1l111(I1l11I, Ilil1l) {
  let iilll = {
      appId: I1l11I,
      ...Ilil1l,
      ua: "jdpingou;iPhone;5.30.0;appBuild/100977;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/225;pap/JA2019_3111789;supportJDSHWK/1;ef/1;ep/%7B%22ciphertype%22:5,%22cipher%22:%7B%22ud%22:%22ZtVsDtvuZwC0CzdsZWTuEWS0YWS5DJTrDJTvDWSnZJu1YzU2CtVvDq==%22,%22bd%22:%22YXLmbQU=%22,%22iad%22:%22%22,%22sv%22:%22CJGkEK==%22%7D,%22ts%22:1677227105,%22hdid%22:%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=%22,%22version%22:%221.0.3%22,%22appname%22:%22com.360buy.jdpingou%22,%22ridx%22:-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      pin: $.UserName
    },
    il1iI1 = {
      url: "http://kr.kingran.cf/h5st",
      body: JSON.stringify(iilll),
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 30000
    };
  return new Promise(async i1ilI1 => {
    $.post(il1iI1, (liiI11, ililI1, IIii1i) => {
      let Iiill1 = "";
      try {
        if (liiI11) {
          console.log("" + JSON.stringify(liiI11));
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {
          IIii1i = JSON.parse(IIii1i);
          if (typeof IIii1i === "object" && IIii1i && IIii1i.body) {
            if (IIii1i.body) {
              Iiill1 = IIii1i.body || "";
            }
          } else {
            IIii1i.code == 400 ? console.log("\n" + IIii1i.msg) : console.log("\n可能连接不上接口，请检查网络");
          }
        }
      } catch (iii1l1) {
        $.logErr(iii1l1, ililI1);
      } finally {
        i1ilI1(Iiill1);
      }
    });
  });
}
function l1iIII(liiI1I) {
  liiI1I = liiI1I || 32;
  let lI1II1 = "0123456789abcdef",
    i1ilII = lI1II1.length,
    iIIii1 = "";
  for (let Ii1ilI = 0; Ii1ilI < liiI1I; Ii1ilI++) {
    iIIii1 += lI1II1.charAt(Math.floor(Math.random() * i1ilII));
  }
  return iIIii1;
}
function llI1I1(II11i1) {
  if (typeof II11i1 == "string") {
    try {
      return JSON.parse(II11i1);
    } catch (Ill11i) {
      console.log(Ill11i);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function IlIlil(iilil) {
  return new Promise(lill1l => {
    const i1iiI = {
      url: iilil + "?" + new Date(),
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i1iiI, async (Il1i11, iii1li, Iil1i1) => {
      try {
        if (Il1i11) {
          $.getAuthorCodeListerr = false;
        } else {
          if (Iil1i1) {
            Iil1i1 = JSON.parse(Iil1i1);
          }
          $.getAuthorCodeListerr = true;
        }
      } catch (Ii1il1) {
        $.logErr(Ii1il1, iii1li);
        Iil1i1 = null;
      } finally {
        lill1l(Iil1i1);
      }
    });
  });
}
function lIli1I(iii1ll, IIliI1) {
  return Math.floor(Math.random() * (IIliI1 - iii1ll)) + iii1ll;
}
