/*
粉丝福利红包
活动链接：https://wqs.jd.com/sns/202109/22/fansactiveall/index.html?qwer=<活动id>
环境变量：jd_fansDraw_activityUrl // 活动链接
        jd_fansDraw_Notify // 是否推送通知（true/false），默认不推送

注：活动非百分百中奖，请勿重复运行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#粉丝福利红包
1 1 1 1 * jd_fansDraw.js, tag=粉丝福利红包, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('粉丝福利红包')
const Iiilil11 = require("./jdCookie"),
  lililIiI = require("./function/jdCommon"),
  iiii1Iil = require("./function/sendJDNotify"),
  iI11iIl1 = process.env.jd_fansDraw_activityUrl || "",
  II11I1Ii = process.env.jd_fansDraw_Notify === "true",
  Ii1II11 = "msc588d6d5";
let I11l1li = "";
const I11liiiI = Object.keys(Iiilil11).map(IlIIliII => Iiilil11[IlIIliII]).filter(i1iIiIIi => i1iIiIIi);
!I11liiiI[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  authorCodeList = await iI1lIliI("http://code.kingran.cf/fsfl.json");
  if (authorCodeList) {
    console.log("❖ 远程获取数据中...\n❖ 数据获取正常...\n");
    for (let Il1I1iII = 0; Il1I1iII < authorCodeList.length; Il1I1iII++) {
      console.log("❖ 远程数据第[" + (Il1I1iII + 1) + "]个变量: export jd_fansDraw_activityUrl=\"https://wqs.jd.com/sns/202109/22/fansactiveall/index.html?qwer=" + authorCodeList[Il1I1iII] + "\"");
    }
  } else {
    console.log("❖ 远程数据获取失败,请自行查找可用活动链接...\n");
  }
  if (!iI11iIl1) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const i1lllI1I = lililIiI.parseUrl(iI11iIl1);
  if (!i1lllI1I) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iI11iIl1;
  const IIlI1i1i = i1lllI1I.pathname;
  if (!IIlI1i1i.includes("dzhMiddlePage")) {
    $.activityId = lililIiI.getUrlParameter(iI11iIl1, "qwer");
    if (!$.activityId) {
      console.log("⚠ 请填写格式正确的变量");
      return;
    }
  }
  iiii1Iil.config({
    "title": $.name
  });
  console.log("活动入口：" + iI11iIl1);
  for (let ilIl1Iii = 0; ilIl1Iii < I11liiiI.length; ilIl1Iii++) {
    $.index = ilIl1Iii + 1;
    I11l1li = I11liiiI[ilIl1Iii];
    $.UserName = decodeURIComponent(lililIiI.getCookieValue(I11l1li, "pt_pin"));
    $.UA = lililIiI.genUA($.UserName);
    $.message = iiii1Iil.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await ii11illl();
  }
  II11I1Ii && iiii1Iil.getMessage() && (iiii1Iil.updateContent(iiii1Iil.content + ("\n【活动地址】" + $.activityUrl)), await iiii1Iil.push());
})().catch(liIillll => $.logErr(liIillll)).finally(() => $.done());
async function ii11illl() {
  $.skipRun = false;
  await IiIlil1l();
  if ($.skipRun) return;
  if ($.activityId) {
    $.index === 1 && (await IlliI111("query_tempactivconfig"));
    await IlliI111("query_activetemporary");
    if ($.skipRun) return;
    await IlliI111("draw_activetemporary");
  } else await IlliI111("fansapp_draw");
}
async function IlliI111(liIiI1i) {
  const IIiII1 = {
    "url": "https://wq.jd.com/activet2/looktreasure/" + liIiI1i + "?uuid=" + ($.activityId || "") + "&sceneval=2&backendId=" + ($.backEnd || "") + "&_=" + Date.now() + "&sceneval=2&g_login_type=1&callback=" + liIiI1i + "&g_ty=ls&appCode=" + Ii1II11,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Sec-Fetch-Site": "same-site",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Dest": "script",
      "Connection": "keep-alive",
      "Cookie": I11l1li,
      "Host": "wq.jd.com",
      "Referer": "https://wqs.jd.com/",
      "User-Agent": $.UA
    }
  };
  return new Promise(async llIIiI1i => {
    $.get(IIiII1, (I1IlIi1l, lIliI1ll, I1i11ll1) => {
      try {
        if (I1IlIi1l) console.log(String(I1IlIi1l));else {
          const ii11l = lIiIIIlI(I1i11ll1);
          if (ii11l) {
            switch (liIiI1i) {
              case "query_tempactivconfig":
                $.backEnd = ii11l.backEnd, $.frontEnd = ii11l.frontEnd;
                break;
              case "query_activetemporary":
                ii11l.first === 1 && (console.log("已经参与过了~"), $.message.fix("已抽过"), $.skipRun = true);
                break;
              case "draw_activetemporary":
                if (ii11l.ret === 0) {
                  if (ii11l?.["prize"]?.["sPrizeDesc"]) console.log("🎉 " + ii11l.prize.sPrizeDesc), $.message.fix(ii11l.prize.sPrizeDesc);else ii11l?.["prize"] ? console.log(ii11l?.["prize"]) : (console.log("💨 空气"), $.message.fix("空气"));
                } else console.log("领取失败"), $.message.fix("领取失败");
                break;
              case "fansapp_draw":
                if (ii11l.prize) {
                  if ($.index === 1) {
                    let I1iIi1i1 = "";
                    for (let ii1IIiI = 0; ii1IIiI < ii11l.prize.length; ii1IIiI++) {
                      const iliIIliI = ii11l.prize[ii1IIiI].sPrizeDesc;
                      ii1IIiI != ii11l.prize.length - 1 ? I1iIi1i1 += iliIIliI + "，" : I1iIi1i1 += "" + iliIIliI;
                    }
                    console.log("活动奖品：" + I1iIi1i1 + "\n");
                    iiii1Iil.updateContent(iiii1Iil.content + ("\n【活动奖品】" + I1iIi1i1));
                  }
                  console.log("🎉 领取成功");
                  $.message.fix("领取成功");
                } else console.log("可能未抽中"), $.message.fix("可能未抽中");
                break;
            }
          } else console.log(I1i11ll1);
        }
      } catch (Ii1ll) {
        $.logErr(Ii1ll, lIliI1ll);
      } finally {
        llIIiI1i(I1i11ll1);
      }
    });
  });
}
function lIiIIIlI(iiIiI1I) {
  let Ill1ll1I = null;
  try {
    const I1111IIl = /(\w+)\(([\s\S]*?)\);/,
      ilii1ilI = iiIiI1I.match(I1111IIl);
    ilii1ilI && (Ill1ll1I = JSON.parse(ilii1ilI[2]));
  } catch (I1iliI1l) {
    console.log(I1iliI1l);
  }
  return Ill1ll1I;
}
function IiIlil1l() {
  return new Promise(async lI111Il => {
    const lIIl11l = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": I11l1li,
        "Host": "plogin.m.jd.com",
        "User-Agent": $.UA
      }
    };
    $.get(lIIl11l, (iI1lliil, Il11illl, i1liI1I) => {
      try {
        if (iI1lliil) console.log(String(iI1lliil)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (i1liI1I) {
            try {
              i1liI1I = JSON.parse(i1liI1I);
              i1liI1I.islogin === "0" && (console.log("❌ 账号无效"), $.message.fix("账号无效"), $.skipRun = true);
            } catch {
              console.log("京东服务器返回空数据");
              $.skipRun = true;
            }
          } else console.log("京东服务器返回空数据"), $.skipRun = true;
        }
      } catch (IiIll1l) {
        $.logErr(IiIll1l, Il11illl);
      } finally {
        lI111Il();
      }
    });
  });
}
function iI1lIliI(illIll1i) {
  return new Promise(III1lIiI => {
    const l1IiII1i = {
      "url": "" + illIll1i,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1IiII1i, async (l1I1lii, li1111Ii, Ii1I1I1I) => {
      try {
        if (l1I1lii) {} else {
          Ii1I1I1I ? Ii1I1I1I = JSON.parse(Ii1I1I1I) : console.log("未获取到数据,请重新运行");
        }
      } catch (li11I1I1) {
        $.logErr(li11I1I1, li1111Ii);
        Ii1I1I1I = null;
      } finally {
        III1lIiI(Ii1I1I1I);
      }
    });
  });
}
function i1IIill(IIIli1II, IliIiiil) {
  return Math.floor(Math.random() * (IliIiiil - IIIli1II)) + IIIli1II;
}