/*
活动名称：店铺刮刮乐
活动链接：https://wq.jd.com/mshop/shopdraw?venderId=<店铺id>
环境变量：jd_shopdraw_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺刮刮乐')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getSign = require('./function/getSign')

let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(IiIIiiIi => {
    cookiesArr.push(jdCookieNode[IiIIiiIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iIlll11 => iIlll11.cookie)].filter(iIlIiiil => !!iIlIiiil);
let activityUrl = process.env.jd_shopdraw_activityUrl ? process.env.jd_shopdraw_activityUrl : "",
  allMessage = "";
const JD_API_HOST = "https://api.m.jd.com/client.action";
activityUrl && (venderId = getQueryString("" + activityUrl, "venderId"), $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1]);
!(async () => {
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let l1lIIiil = 0; l1lIIiil < cookiesArr.length; l1lIIiil++) {
    if (cookiesArr[l1lIIiil]) {
      cookie = cookiesArr[l1lIIiil];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1lIIiil + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await main();
      await $.wait(2000);
    }
  }
  if (allMessage) {
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + allMessage);
    $.msg($.name, "", allMessage);
  }
})().catch(lli1lIII => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lli1lIII + "!", "");
}).finally(() => {
  $.done();
});
async function main() {
  await getSignInfo();
  await $.wait(500);
  $.index == 1 && (await signActivityRule());
  await $.wait(500);
  if ($.isSign != 2) await drawsign();else {
    $.log("已经参与过活动~");
  }
}
async function getSignInfo() {
  let l1iI1lI1 = await getSign("getSignInfo", {
      "vendorId": venderId
    }),
    i111iIl1 = {
      "url": JD_API_HOST + "?functionId=getSignInfo",
      "headers": {
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Accept-Encoding": "gzip, deflate, br"
      },
      "body": "" + l1iI1lI1
    };
  return new Promise(I1lI1Il => {
    $.post(i111iIl1, (i1i1I11I, iliiIiiI, lll) => {
      try {
        if (i1i1I11I) {
          $.log(i1i1I11I);
        } else {
          lll = JSON.parse(lll);
          typeof lll == "object" ? lll.code == 0 && ($.isSign = lll.result.signInfo.isSign) : $.log("京东返回了空数据");
        }
      } catch (liI1iiiI) {
        $.log(liI1iiiI);
      } finally {
        I1lI1Il();
      }
    });
  });
}
async function signActivityRule() {
  let l1I1li1l = await getSign("signActivityRule", {
      "vendorId": venderId
    }),
    lII11Ill = {
      "url": JD_API_HOST + "?functionId=signActivityRule",
      "headers": {
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Accept-Encoding": "gzip, deflate, br"
      },
      "body": "" + l1I1li1l
    };
  return new Promise(iiiIIlIl => {
    $.post(lII11Ill, (liIlll11, li1IIl1I, lllIllil) => {
      try {
        if (liIlll11) $.log(liIlll11);else {
          lllIllil = JSON.parse(lllIllil);
          if (typeof lllIllil == "object") {
            if (lllIllil.code == 0) {
              for (let iIIl1lII of lllIllil.result.awardDescription) {
                $.log(iIIl1lII);
              }
              console.log("");
            }
          } else $.log("京东返回了空数据");
        }
      } catch (liI1lIii) {
        $.log(liI1lIii);
      } finally {
        iiiIIlIl();
      }
    });
  });
}
async function drawsign() {
  let l1iIllII = await getSign("sign", {
      "vendorId": venderId,
      "sourceRpc": "shop_app_sign_home"
    }),
    iliiiIil = {
      "url": JD_API_HOST + "?functionId=sign",
      "headers": {
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Accept-Encoding": "gzip, deflate, br"
      },
      "body": "" + l1iIllII
    };
  return new Promise(l11I1lli => {
    $.post(iliiiIil, (Ill1i11i, i1liii1I, Ililllil) => {
      try {
        Ill1i11i ? $.log(Ill1i11i) : (Ililllil = JSON.parse(Ililllil), typeof Ililllil == "object" ? Ililllil.code == 0 && (Ililllil.result.isWin ? ($.Prize = Ililllil.result.signReward.name || "", $.log("🎉 " + $.Prize.split("：")[1])) : $.log("💨 空气")) : $.log("京东返回了空数据"));
      } catch (iiiI1ii) {
        $.log(iiiI1ii);
      } finally {
        l11I1lli();
      }
    });
  });
}
function jsonParse(illiil11) {
  if (typeof illiil11 == "string") {
    try {
      return JSON.parse(illiil11);
    } catch (liiIIi1i) {
      return console.log(liiIIi1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function getQueryString(IIi11lll, liIiIIli) {
  let i11iiIll = new RegExp("(^|[&?])" + liIiIIli + "=([^&]*)(&|$)"),
    I1ili1II = IIi11lll.match(i11iiIll);
  if (I1ili1II != null) return decodeURIComponent(I1ili1II[2]);
  return "";
}
