/*
粉丝福利红包
远程更新，看频道通知
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#粉丝福利红包
1 1 1 1 * jd_fans_fansactiveall.js, tag=粉丝福利红包, enabled=true
 */
const Env=require('./utils/Env.js');
const $=new Env('粉丝福利红包');
const notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(i11ii1 => {
    cookiesArr.push(jdCookieNode[i11ii1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IlIliI => IlIliI.cookie)].filter(l1iII1 => !!l1iII1);
let time = Date.now(),
  allMessage = "";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  authorCodeList = await getAuthorCodeList("http://code.kingran.cf/fsfl.json");
  $.authorCode = authorCodeList[random(0, authorCodeList.length)];
  $.activityId = $.authorCode;
  if (!$.activityId) {
    console.log("\n暂无活动~\n");
    return;
  }
  console.log("活动入口：https://wqs.jd.com/sns/202109/22/fansactiveall/index.html?qwer=" + $.activityId);
  for (let iii1il = 0; iii1il < cookiesArr.length; iii1il++) {
    if (cookiesArr[iii1il]) {
      cookie = cookiesArr[iii1il];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iii1il + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
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
})().catch(I1l11i => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + I1l11i + "!", "");
}).finally(() => {
  $.done();
});
async function main() {
  await query_tempactivconfig();
  await $.wait(500);
  await query_activetemporary();
  await $.wait(500);
  await draw_activetemporary();
}
function query_tempactivconfig() {
  return new Promise(async i1i11i => {
    const Iil1lI = {
      "url": "https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.activityId + "&_=" + time + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "wq.jd.com",
        "Referer": "https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.activityId + "&_=" + time + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      }
    };
    $.get(Iil1lI, (iIIiil, i1l1Ii, I1iIIi) => {
      try {
        iIIiil ? console.log(iIIiil) : ($.backEnd = I1iIIi.match(/"backEnd":"(.+?)"/), $.backEnd && ($.backEnd = $.backEnd[1]), console.log("领取ID：" + $.backEnd));
      } catch (Iil1li) {
        $.logErr(Iil1li, i1l1Ii);
      } finally {
        i1i11i(I1iIIi || {});
      }
    });
  });
}
function query_activetemporary() {
  return new Promise(async I1l111 => {
    const IIii1l = {
      "url": "https://wq.jd.com/activet2/looktreasure/query_activetemporary?sceneval=2&backendId=" + $.backEnd + "&_=" + time + "&sceneval=2&g_login_type=1&callback=query_activetemporary&g_ty=ls&appCode=msc588d6d5",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "wq.jd.com",
        "Referer": "https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.activityId + "&_=" + time + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      }
    };
    $.get(IIii1l, (I1iIII, liiI11, ililI1) => {
      try {
        if (I1iIII) {
          console.log(I1iIII);
        } else {}
      } catch (i1ili) {
        $.logErr(i1ili, liiI11);
      } finally {
        I1l111(ililI1 || {});
      }
    });
  });
}
function draw_activetemporary() {
  return new Promise(async ililII => {
    const i1ilII = {
      "url": "https://wq.jd.com/activet2/looktreasure/draw_activetemporary?sceneval=2&backendId=" + $.backEnd + "&_=" + time + "&sceneval=2&g_login_type=1&callback=draw_activetemporary&g_ty=ls&appCode=msc588d6d5",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "wq.jd.com",
        "Referer": "https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.activityId + "&_=" + time + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      }
    };
    $.get(i1ilII, (iilii, Ill11i, iilil) => {
      try {
        if (iilii) console.log(iilii);else {
          let i1ilIi = iilil?.["replace"](/[\n\r]/g, "")?.["match"](/draw_activetemporary\((\{.*?\})\);/);
          if (i1ilIi) {
            let lill1l = JSON.parse(i1ilIi[1]);
            if (lill1l?.["ret"] == 0) lill1l?.["prize"] != "" ? console.log("宝，可能获得：" + lill1l?.["prize"]?.["sPrizeName"] + " " + lill1l?.["prize"]?.["sPrizeDesc"]) : console.log("获得：空气");else lill1l?.["ret"] == 1005 ? console.log("已参与过活动，或者已领取过") : console.log(lill1l?.["msg"]);
          } else {
            console.log("获得数据获取失败");
          }
        }
      } catch (llI11I) {
        $.logErr(llI11I, Ill11i);
      } finally {
        ililII(iilil || {});
      }
    });
  });
}
function getAuthorCodeList(Il1i11) {
  return new Promise(I1il1l => {
    const lI1l1i = {
      "url": Il1i11 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lI1l1i, async (i1iil, llI11l, I1llIl) => {
      try {
        if (i1iil) $.getAuthorCodeListerr = false;else {
          if (I1llIl) I1llIl = JSON.parse(I1llIl);
          $.getAuthorCodeListerr = true;
        }
      } catch (IIii1I) {
        $.logErr(IIii1I, llI11l);
        I1llIl = null;
      } finally {
        I1il1l(I1llIl);
      }
    });
  });
}
function random(llI11i, i1iIi1) {
  return Math.floor(Math.random() * (i1iIi1 - llI11i)) + llI11i;
}
function safeGet(il1l1) {
  try {
    if (typeof JSON.parse(il1l1) == "object") return true;
  } catch (II11ii) {
    return console.log(II11ii), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function jsonParse(Iil1iI) {
  if (typeof Iil1iI == "string") {
    try {
      return JSON.parse(Iil1iI);
    } catch (I11i11) {
      return console.log(I11i11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}