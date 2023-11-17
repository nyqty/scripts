/*
39 5 * * * jd_seckillViewTask.js
 */
const Env=require('./utils/Env.js');
const $ = new Env('秒杀浏览商品领豆');
var version_ = "jsjiami.com.v7";
const ii1iiI = $.isNode() ? require("./sendNotify") : "",
  lllilI = $.isNode() ? require("./jdCookie.js") : "",
  ilil11 = require("./function/jdCommon");
let IIIl11 = [],
  I1lIi1 = "";
if ($.isNode()) {
  Object.keys(lllilI).forEach(lillIl => {
    IIIl11.push(lllilI[lillIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  IIIl11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iil1li($.getdata("CookiesJD") || "[]").map(iIiIl => iIiIl.cookie)].filter(iiilii => !!iiilii);
}
!(async () => {
  if (!IIIl11[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.UA = ilil11.genUA($.UserName);
  await lil11I();
  for (let illIii = 0; illIii < IIIl11.length; illIii++) {
    if (IIIl11[illIii]) {
      I1lIi1 = IIIl11[illIii];
      $.UserName = decodeURIComponent(I1lIi1.match(/pt_pin=([^; ]+)(?=;?)/) && I1lIi1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = illIii + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = ilil11.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await ii1iiI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      let ii1il1 = await Iliii1("{\"taskType\": 0 }");
      if (ii1il1.data?.["taskThreshold"] && !ii1il1.data?.["awardStatus"]) {
        $.log("开始浏览商品...");
        let lI1llI = iiilil($.skulist, ii1il1.data.taskThreshold - ii1il1.data.taskProgress);
        for (let illIil of lI1llI) {
          console.log("浏览 " + illIil);
          ii1il1 = await Iliii1("{ \"skuId\": \"" + illIil + "\", \"taskType\": 1 }");
          await $.wait(2000);
        }
        ii1il1 = await Iliii1("{\"taskType\": 2 }");
        ii1il1.data?.["awardStatus"] ? console.log("浏览完成，获得 " + ii1il1.data.beanNum + "豆") : console.log(JSON.stringify(ii1il1));
      } else {
        $.log("今日已完成浏览！！！");
      }
      await $.wait(3000);
    }
  }
})().catch(lllI1I => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lllI1I + "!", "");
}).finally(() => {
  $.done();
});
async function lil11I() {
  let IlIlii = {
    url: "https://pro.m.jd.com/mall/active/Md9FMi1pJXg2q7qc8CmE9FNYDS4/index.html",
    headers: {
      "User-Agent": $.UA
    }
  };
  return new Promise(async l1iIII => {
    $.get(IlIlii, async (llI1I1, IlIlil, lIli1I) => {
      try {
        llI1I1 ? (console.log("" + JSON.stringify(llI1I1)), console.log(" API请求失败，请检查网路重试")) : (lIli1I = lIli1I.match(/\"skuId\":\"(\d+)\"/g), $.skulist = [...new Set(lIli1I.map(II1il => II1il.match(/\d+/)[0]))]);
      } catch (lllI11) {
        $.logErr(lllI11, IlIlil);
      } finally {
        l1iIII(lIli1I);
      }
    });
  });
}
async function Iliii1(II1ii) {
  let lillII = {
    url: "https://api.m.jd.com/client.action",
    body: "appid=signed_wh5_ihub&client=android&networkType=wifi&openudid=&uuid=&eu=&fv=&d_model=&body=" + II1ii + "&functionId=seckillViewTask&t=" + Date.now(),
    headers: {
      Host: "api.m.jd.com",
      Origin: "https://pro.m.jd.com",
      Referer: "https://pro.m.jd.com/mall/active/Md9FMi1pJXg2q7qc8CmE9FNYDS4/index.html",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      Cookie: I1lIi1
    }
  };
  return new Promise(async i11ii1 => {
    $.post(lillII, async (llI1II, lIli1l, lillIi) => {
      try {
        llI1II ? (console.log("" + JSON.stringify(llI1II)), console.log(" API请求失败，请检查网路重试")) : lillIi = JSON.parse(lillIi);
      } catch (ii1ili) {
        $.logErr(ii1ili, lIli1l);
      } finally {
        i11ii1(lillIi);
      }
    });
  });
}
function iIiIi() {
  return new Promise(i1i11I => {
    const iii1ii = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: {
        Cookie: I1lIi1,
        referer: "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      timeout: 10000
    };
    $.get(iii1ii, (lilIIl, ililIl, liiI1l) => {
      try {
        if (liiI1l) {
          liiI1l = JSON.parse(liiI1l);
          if (!(liiI1l.islogin === "1")) {
            liiI1l.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (i1ill) {
        console.log(i1ill);
      } finally {
        i1i11I();
      }
    });
  });
}
function iil1ll(i1l1Il) {
  for (let iilli = i1l1Il.length - 1; iilli > 0; iilli--) {
    const IlllIl = Math.floor(Math.random() * (iilli + 1));
    [i1l1Il[iilli], i1l1Il[IlllIl]] = [i1l1Il[IlllIl], i1l1Il[iilli]];
  }
  return i1l1Il;
}
function iiilil(II11lI, lI1IIi) {
  const Ilil1l = iil1ll(II11lI),
    iIIiii = [];
  for (let I1iIIi = 0; I1iIIi < Ilil1l.length; I1iIIi++) {
    if (iIIiii.length === lI1IIi) {
      break;
    }
    const I1iIIl = Ilil1l[I1iIIi];
    if (!iIIiii.includes(I1iIIl)) {
      iIIiii.push(I1iIIl);
    }
  }
  return iIIiii;
}
function iil1li(iii1lI) {
  if (typeof iii1lI == "string") {
    try {
      return JSON.parse(iii1lI);
    } catch (Iiilii) {
      console.log(Iiilii);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
var version_ = "jsjiami.com.v7";