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
  Object.keys(jdCookieNode).forEach(lI1IIi => {
    cookiesArr.push(jdCookieNode[lI1IIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(I1l11I => I1l11I.cookie)].filter(Ilil1l => !!Ilil1l);
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
  for (let Iil1ll = 0; Iil1ll < cookiesArr.length; Iil1ll++) {
    if (cookiesArr[Iil1ll]) {
      cookie = cookiesArr[Iil1ll];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Iil1ll + 1;
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
})().catch(iillI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iillI + "!", "");
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
  return new Promise(async ililII => {
    const i1ilII = {
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
    $.get(i1ilII, (iIIii1, IllIi1, lilIII) => {
      try {
        iIIii1 ? console.log(iIIii1) : ($.backEnd = lilIII.match(/"backEnd":"(.+?)"/), $.backEnd && ($.backEnd = $.backEnd[1]), console.log("领取ID：" + $.backEnd));
      } catch (il1li) {
        $.logErr(il1li, IllIi1);
      } finally {
        ililII(lilIII || {});
      }
    });
  });
}
function query_activetemporary() {
  return new Promise(async Iil1i1 => {
    const iliIl1 = {
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
    $.get(iliIl1, (i1iii, I1llIi, IIii1I) => {
      try {
        if (i1iii) console.log(i1iii);else {
          $.sPrizeDesc = IIii1I.match(/"sPrizeDesc":"(.+?)"/);
          $.sPrizeName = IIii1I.match(/"sPrizeName":"(.+?)"/);
          if ($.sPrizeDesc && $.sPrizeName) {
            $.sPrizeDesc = $.sPrizeDesc[1];
            $.sPrizeName = $.sPrizeName[1];
            console.log("宝，可能获得：" + $.sPrizeName + " " + $.sPrizeDesc);
          }
        }
      } catch (I11i1I) {
        $.logErr(I11i1I, I1llIi);
      } finally {
        Iil1i1(IIii1I || {});
      }
    });
  });
}
function draw_activetemporary() {
  return new Promise(async II11il => {
    const IlllII = {
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
    $.get(IlllII, (liI1i1, I11i11, I1llII) => {
      try {
        if (liI1i1) console.log(liI1i1);else {}
      } catch (I11i1i) {
        $.logErr(I11i1i, I11i11);
      } finally {
        II11il(I1llII || {});
      }
    });
  });
}
function getAuthorCodeList(I11i1l) {
  return new Promise(lill1I => {
    const Ii1ii1 = {
      "url": I11i1l + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(Ii1ii1, async (Ilil11, i1ii1, il1ii) => {
      try {
        if (Ilil11) $.getAuthorCodeListerr = false;else {
          if (il1ii) il1ii = JSON.parse(il1ii);
          $.getAuthorCodeListerr = true;
        }
      } catch (iI1Iii) {
        $.logErr(iI1Iii, i1ii1);
        il1ii = null;
      } finally {
        lill1I(il1ii);
      }
    });
  });
}
function random(iI1Iil, il1iI) {
  return Math.floor(Math.random() * (il1iI - iI1Iil)) + iI1Iil;
}
function safeGet(lIIiIi) {
  try {
    if (typeof JSON.parse(lIIiIi) == "object") return true;
  } catch (iI1Il1) {
    return console.log(iI1Il1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function jsonParse(i1lli1) {
  if (typeof i1lli1 == "string") try {
    return JSON.parse(i1lli1);
  } catch (i1iIlI) {
    return console.log(i1iIlI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}