/*
18 19 * * 2,5 jd_ppdt_.js
 */

const Env=require('./utils/Env.js');
const $ = new Env('超级品牌殿堂');
const liIil1ll = $.isNode() ? require("./sendNotify") : "",
  ii11l1Ii = $.isNode() ? require("./jdCookie.js") : "";
let liIIlIIl = true,
  l1lilIii = [],
  ii1iIIIl = "",
  Il1IIlI = "";
if ($.isNode()) {
  Object.keys(ii11l1Ii).forEach(IiiIIli1 => {
    l1lilIii.push(ii11l1Ii[IiiIIli1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1lilIii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iI1iIiIi($.getdata("CookiesJD") || "[]").map(IiIl1lil => IiIl1lil.cookie)].filter(i1IIlli1 => !!i1IIlli1);
!(async () => {
  if (!l1lilIii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let iiilil1 = 0; iiilil1 < l1lilIii.length; iiilil1++) {
    if (l1lilIii[iiilil1]) {
      ii1iIIIl = l1lilIii[iiilil1];
      $.UserName = decodeURIComponent(ii1iIIIl.match(/pt_pin=([^; ]+)(?=;?)/) && ii1iIIIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiilil1 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.ban = "";
      $.donep = "";
      $.UA = require("./USER_AGENTS").UARAM();
      await iiillli();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await liIil1ll.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await IIIilll();
      let I1IlIliI = await I11ii1i($.activityId);
      if (I1IlIliI) console.log("" + I1IlIliI.activityName), $.pid = I1IlIliI.encryptProjectId, $.aid = I1IlIliI.activityId;else {
        console.log("获取活动信息失败！！");
        continue;
      }
      await $.wait(500);
      await llliI1Ii($.aid);
      await $.wait(500);
      for (let l1Ii1Ili of $.tasklist) {
        $.log("去做任务-> " + l1Ii1Ili.assignmentName);
        if (l1Ii1Ili.completionCnt) {
          $.log("任务已完成");
          continue;
        }
        let IlilI1il;
        for (let liIl111l = 0; liIl111l < l1Ii1Ili.assignmentTimesLimit; liIl111l++) {
          IlilI1il = await i1III1lI(l1Ii1Ili.encryptAssignmentId);
          await $.wait(500);
        }
        IlilI1il && IlilI1il.length ? IlilI1il[0].awardType === 3 ? console.log("----恭喜获得 " + IlilI1il[0].beanNum + " 京豆") : console.log(JSON.stringify(IlilI1il)) : $.log("----空气");
      }
      await $.wait(2000);
    }
  }
})().catch(l11illl1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + l11illl1 + "!", "");
}).finally(() => {
  $.done();
});
async function I11ii1i(Ii1IIlI) {
  let IllIlI1i = {
    "url": "https://api.m.jd.com/?client=wh5&appid=superbrand-main&functionId=superBrandHall1111Page&t=1681289234365&body=%7B%22source%22%3A%22hall_1111%22%2C%22activityId%22%3A" + Ii1IIlI + "%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": $.UA,
      "Cookie": ii1iIIIl
    }
  };
  return new Promise(async IIlIII1i => {
    let l1llI1iI;
    $.post(IllIlI1i, async (IiiIIlI1, llIi1IlI, illiIII1) => {
      try {
        if (IiiIIlI1) console.log("" + JSON.stringify(IiiIIlI1)), console.log(" API请求失败，请检查网路重试");else {
          illiIII1 = JSON.parse(illiIII1);
          if (illiIII1.code == 0) {
            if (illiIII1.data.bizCode == 0) {
              l1llI1iI = illiIII1.data.result.activityBaseInfo || "";
            }
          } else console.log(JSON.stringify(illiIII1));
        }
      } catch (iIlI1ll1) {
        $.logErr(iIlI1ll1, llIi1IlI);
      } finally {
        IIlIII1i(l1llI1iI);
      }
    });
  });
}
async function llliI1Ii(Ii1ii1iI) {
  let liIIlli1 = {
    "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandTaskList&t=1681289234496&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + Ii1ii1iI + "%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": $.UA,
      "Cookie": ii1iIIIl
    }
  };
  return new Promise(async l1Il11II => {
    $.post(liIIlli1, async (lll1lIII, lIIIlli1, ll1li1ii) => {
      try {
        if (lll1lIII) console.log("" + JSON.stringify(lll1lIII)), console.log(" API请求失败，请检查网路重试");else {
          ll1li1ii = JSON.parse(ll1li1ii);
          if (ll1li1ii.code == 0) {
            if (ll1li1ii.data.bizCode == 0) {
              $.tasklist = ll1li1ii.data.result.taskList;
            } else console.log(ll1li1ii.data.bizMsg);
          } else console.log(JSON.stringify(ll1li1ii));
        }
      } catch (il11iIl) {
        $.logErr(il11iIl, lIIIlli1);
      } finally {
        l1Il11II(ll1li1ii);
      }
    });
  });
}
async function i1III1lI(i1Ii11i1) {
  let Ii1liIl = {
      "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1681289234224&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + $.aid + ",%22completionFlag%22:1,%22encryptProjectId%22:%22" + $.pid + "%22,%22encryptAssignmentId%22:%22" + i1Ii11i1 + "%22,%22assignmentType%22:0,%22actionType%22:0%7D",
      "headers": {
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "User-Agent": $.UA,
        "Cookie": ii1iIIIl
      }
    },
    iIliI1Il = "";
  return new Promise(async i1llill => {
    $.post(Ii1liIl, async (Il1i11il, il111I1l, IllI1lIi) => {
      try {
        if (Il1i11il) console.log("" + JSON.stringify(Il1i11il)), console.log(" API请求失败，请检查网路重试");else {
          IllI1lIi = JSON.parse(IllI1lIi);
          IllI1lIi.code == 0 ? IllI1lIi.data.bizCode == 0 ? iIliI1Il = IllI1lIi.data?.["result"]?.["rewards"] : console.log(IllI1lIi.data.bizMsg) : console.log(JSON.stringify(IllI1lIi));
        }
      } catch (iiIiII1l) {
        $.logErr(iiIiII1l, il111I1l);
      } finally {
        i1llill(iIliI1Il);
      }
    });
  });
}
function IIIilll() {
  let Il1i1 = {
    "url": "https://prodev.m.jd.com/mall/active/rw8ewMzsDMevpVnuCJ7EgXS4PM9/index.html",
    "headers": {
      "User-Agent": $.UA,
      "Cookie": ii1iIIIl
    }
  };
  return new Promise(IIll1i1i => {
    $.get(Il1i1, (l1ililiI, IIIi111l, liI1i11i) => {
      try {
        l1ililiI ? $.log(JSON.stringify(l1ililiI)) : $.activityId = liI1i11i.match(/"cmsActivityId":"(\d+)"/)[1];
      } catch (iiIli111) {
        $.log(JSON.stringify(iiIli111));
      } finally {
        IIll1i1i();
      }
    });
  });
}
function iiillli() {
  return new Promise(lI1I1IIl => {
    const lill1ll = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": ii1iIIIl,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(lill1ll, (l11illII, Ii11lIli, liIil1I) => {
      try {
        if (liIil1I) {
          liIil1I = JSON.parse(liIil1I);
          if (liIil1I.islogin === "1") {} else liIil1I.islogin === "0" && ($.isLogin = false);
        }
      } catch (IIli1III) {
        console.log(IIli1III);
      } finally {
        lI1I1IIl();
      }
    });
  });
}
function Ii1Ii1iI() {
  return new Promise(lillIlii => {
    if (!liIIlIIl) {
      $.msg($.name, "", "" + Il1IIlI);
    } else $.log("京东账号" + $.index + $.nickName + "\n" + Il1IIlI);
    lillIlii();
  });
}
function Illiiii(IIi1ii1l) {
  try {
    if (typeof JSON.parse(IIi1ii1l) == "object") {
      return true;
    }
  } catch (illiilii) {
    return console.log(illiilii), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function iI1iIiIi(IiilII11) {
  if (typeof IiilII11 == "string") try {
    return JSON.parse(IiilII11);
  } catch (iiIIlI) {
    return console.log(iiIIlI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}