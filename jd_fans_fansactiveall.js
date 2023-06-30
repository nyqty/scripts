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
const lI1ll1 = $.isNode() ? require("./sendNotify") : "",
  iIiI1 = $.isNode() ? require("./jdCookie.js") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let i11ii1 = [],
  IlIliI = "";
if ($.isNode()) {
  Object.keys(iIiI1).forEach(illIi1 => {
    i11ii1.push(iIiI1[illIi1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i11ii1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lillIi($.getdata("CookiesJD") || "[]").map(ii1ili => ii1ili.cookie)].filter(liil1i => !!liil1i);
let l1iII1 = Date.now(),
  iiill1 = "";
!(async () => {
  if (!i11ii1[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  authorCodeList = await II1iI("http://code.kingran.cf/fsfl.json");
  $.authorCode = authorCodeList[llI1II(0, authorCodeList.length)];
  $.activityId = $.authorCode;
  if (!$.activityId) {
    console.log("\n暂无活动~\n");
    return;
  }
  console.log("活动入口：https://wqs.jd.com/sns/202109/22/fansactiveall/index.html?qwer=" + $.activityId);
  for (let I1l11i = 0; I1l11i < i11ii1.length; I1l11i++) {
    if (i11ii1[I1l11i]) {
      IlIliI = i11ii1[I1l11i];
      $.UserName = decodeURIComponent(IlIliI.match(/pt_pin=([^; ]+)(?=;?)/) && IlIliI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I1l11i + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lI1ll1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await lIli1i();
      await $.wait(2000);
    }
  }
  if (iiill1) {
    if ($.isNode()) await lI1ll1.sendNotify("" + $.name, "" + iiill1);
    $.msg($.name, "", iiill1);
  }
})().catch(liiI1i => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + liiI1i + "!", "");
}).finally(() => {
  $.done();
});
async function lIli1i() {
  await IIIII1();
  await $.wait(500);
  await I1lIlI();
  await $.wait(500);
  await ii1ill();
}
function IIIII1() {
  return new Promise(async Iil1lI => {
    const IiiliI = {
      "url": "https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.activityId + "&_=" + l1iII1 + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": IlIliI,
        "Host": "wq.jd.com",
        "Referer": "https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.activityId + "&_=" + l1iII1 + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      }
    };
    $.get(IiiliI, (iii1iI, llIll, il1iII) => {
      try {
        if (iii1iI) console.log(iii1iI);else {
          $.backEnd = il1iII.match(/"backEnd":"(.+?)"/);
          if ($.backEnd) {
            $.backEnd = $.backEnd[1];
          }
          console.log("领取ID：" + $.backEnd);
        }
      } catch (I1l11I) {
        $.logErr(I1l11I, llIll);
      } finally {
        Iil1lI(il1iII || {});
      }
    });
  });
}
function I1lIlI() {
  return new Promise(async iii1lI => {
    const Iiilil = {
      "url": "https://wq.jd.com/activet2/looktreasure/query_activetemporary?sceneval=2&backendId=" + $.backEnd + "&_=" + l1iII1 + "&sceneval=2&g_login_type=1&callback=query_activetemporary&g_ty=ls&appCode=msc588d6d5",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": IlIliI,
        "Host": "wq.jd.com",
        "Referer": "https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.activityId + "&_=" + l1iII1 + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      }
    };
    $.get(Iiilil, (Iil1ll, iillI, lI1III) => {
      try {
        if (Iil1ll) {
          console.log(Iil1ll);
        } else {}
      } catch (i1il1) {
        $.logErr(i1il1, iillI);
      } finally {
        iii1lI(lI1III || {});
      }
    });
  });
}
function ii1ill() {
  return new Promise(async iIIii1 => {
    const lilIII = {
      "url": "https://wq.jd.com/activet2/looktreasure/draw_activetemporary?sceneval=2&backendId=" + $.backEnd + "&_=" + l1iII1 + "&sceneval=2&g_login_type=1&callback=draw_activetemporary&g_ty=ls&appCode=msc588d6d5",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": IlIliI,
        "Host": "wq.jd.com",
        "Referer": "https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.activityId + "&_=" + l1iII1 + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      }
    };
    $.get(lilIII, (lill1i, il1li, iIIill) => {
      try {
        if (lill1i) console.log(lill1i);else {
          let Il1i11 = iIIill?.["replace"](/[\n\r]/g, "")?.["match"](/draw_activetemporary\((\{.*?\})\);/);
          if (Il1i11) {
            let iii1li = JSON.parse(Il1i11[1]);
            if (iii1li?.["ret"] == 0) iii1li?.["prize"] != "" ? console.log("宝，可能获得：" + iii1li?.["prize"]) : console.log("获得：空气");else iii1li?.["ret"] == 1005 ? console.log("已参与过活动，或者已领取过") : console.log(iii1li?.["msg"]);
          } else console.log("获得数据获取失败");
        }
      } catch (iii1ll) {
        $.logErr(iii1ll, il1li);
      } finally {
        iIIii1(iIIill || {});
      }
    });
  });
}
function II1iI(IliIIl) {
  return new Promise(I1il1i => {
    const IliIIi = {
      "url": IliIIl + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IliIIi, async (lI1l1i, i1iil, llI11l) => {
      try {
        if (lI1l1i) {
          $.getAuthorCodeListerr = false;
        } else {
          if (llI11l) llI11l = JSON.parse(llI11l);
          $.getAuthorCodeListerr = true;
        }
      } catch (i1iii) {
        $.logErr(i1iii, i1iil);
        llI11l = null;
      } finally {
        I1il1i(llI11l);
      }
    });
  });
}
function llI1II(llI11i, i1iIi1) {
  return Math.floor(Math.random() * (i1iIi1 - llI11i)) + llI11i;
}
function lIli1l(Ii1iii) {
  try {
    if (typeof JSON.parse(Ii1iii) == "object") {
      return true;
    }
  } catch (iIIil1) {
    return console.log(iIIil1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function lillIi(I1il1I) {
  if (typeof I1il1I == "string") try {
    return JSON.parse(I1il1I);
  } catch (I1llI1) {
    return console.log(I1llI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}