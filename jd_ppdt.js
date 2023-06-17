/*
18 11,19 * * * jd_ppdt.js
 */
const Env = require('./utils/Env.js');
const $ = new Env('超级品牌殿堂');
const i1li1Il1 = $.isNode() ? require("./sendNotify") : "",
  liiIiiiI = $.isNode() ? require("./jdCookie.js") : "";
let IIi11I11 = true,
  l1I1111 = [],
  i1lI1lll = "",
  iliIlI = "";
if ($.isNode()) {
  Object.keys(liiIiiiI).forEach(Il1iIIl1 => {
    l1I1111.push(liiIiiiI[Il1iIIl1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1I1111 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1l1iIi1($.getdata("CookiesJD") || "[]").map(lIi11iil => lIi11iil.cookie)].filter(I1lI1IIl => !!I1lI1IIl);
!(async () => {
  if (!l1I1111[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let lIiiliIl = 0; lIiiliIl < l1I1111.length; lIiiliIl++) {
    if (l1I1111[lIiiliIl]) {
      i1lI1lll = l1I1111[lIiiliIl];
      $.UserName = decodeURIComponent(i1lI1lll.match(/pt_pin=([^; ]+)(?=;?)/) && i1lI1lll.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIiiliIl + 1;
      $.isLogin = true;
      $.nickName = "";
      $.ban = "";
      $.donep = "";
      $.UA = require("./USER_AGENTS").UARAM();
      await llliIl1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1li1Il1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await li1IiIIl();
      let ilIliill = await Ii1i1i($.activityId);
      if (ilIliill) {
        console.log("" + ilIliill.activityName);
        $.pid = ilIliill.encryptProjectId;
        $.aid = ilIliill.activityId;
      } else {
        console.log("获取活动信息失败！！");
        continue;
      }
      await $.wait(500);
      await l1liI1II($.aid);
      await $.wait(500);
      for (let liiI1l1l of $.tasklist) {
        $.log("去做任务-> " + liiI1l1l.assignmentName);
        if (liiI1l1l.completionCnt) {
          $.log("任务已完成");
          continue;
        }
        let iiI1I1I1;
        for (let ll1iI1il = 0; ll1iI1il < liiI1l1l.assignmentTimesLimit; ll1iI1il++) {
          iiI1I1I1 = await lil1li1l(liiI1l1l.encryptAssignmentId);
          await $.wait(500);
        }
        iiI1I1I1.length ? iiI1I1I1[0].awardType === 3 ? console.log("----恭喜获得 " + iiI1I1I1[0].beanNum + " 京豆") : console.log(JSON.stringify(iiI1I1I1)) : $.log("----空气");
      }
      await $.wait(2000);
    }
  }
})().catch(iI1iI1i1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iI1iI1i1 + "!", "");
}).finally(() => {
  $.done();
});
async function Ii1i1i(lIliI1II) {
  let i1lliI1l = {
    "url": "https://api.m.jd.com/?client=wh5&appid=superbrand-main&functionId=superBrandHall1111Page&t=1681289234365&body=%7B%22source%22%3A%22hall_1111%22%2C%22activityId%22%3A" + lIliI1II + "%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": $.UA,
      "Cookie": i1lI1lll
    }
  };
  return new Promise(async IiIllIIl => {
    let IilII1ii;
    $.post(i1lliI1l, async (i111Il1i, IIi1ilIi, l11iilil) => {
      try {
        i111Il1i ? (console.log("" + JSON.stringify(i111Il1i)), console.log(" API请求失败，请检查网路重试")) : (l11iilil = JSON.parse(l11iilil), l11iilil.code == 0 ? l11iilil.data.bizCode == 0 && (IilII1ii = l11iilil.data.result.activityBaseInfo || "") : console.log(JSON.stringify(l11iilil)));
      } catch (IIIliii1) {
        $.logErr(IIIliii1, IIi1ilIi);
      } finally {
        IiIllIIl(IilII1ii);
      }
    });
  });
}
async function l1liI1II(IliIilI) {
  let l11I1liI = {
    "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandTaskList&t=1681289234496&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + IliIilI + "%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": $.UA,
      "Cookie": i1lI1lll
    }
  };
  return new Promise(async l1iiIliI => {
    $.post(l11I1liI, async (I1Ili1ii, ii11IiI, iIilIil1) => {
      try {
        if (I1Ili1ii) {
          console.log("" + JSON.stringify(I1Ili1ii));
          console.log(" API请求失败，请检查网路重试");
        } else {
          iIilIil1 = JSON.parse(iIilIil1);
          if (iIilIil1.code == 0) {
            iIilIil1.data.bizCode == 0 ? $.tasklist = iIilIil1.data.result.taskList : console.log(iIilIil1.data.bizMsg);
          } else console.log(JSON.stringify(iIilIil1));
        }
      } catch (II1iiIiI) {
        $.logErr(II1iiIiI, ii11IiI);
      } finally {
        l1iiIliI(iIilIil1);
      }
    });
  });
}
async function lil1li1l(I11Ill) {
  let IIl1Il = {
      "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1681289234224&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + $.aid + ",%22completionFlag%22:1,%22encryptProjectId%22:%22" + $.pid + "%22,%22encryptAssignmentId%22:%22" + I11Ill + "%22,%22assignmentType%22:0,%22actionType%22:0%7D",
      "headers": {
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "User-Agent": $.UA,
        "Cookie": i1lI1lll
      }
    },
    i1ilI1li = "";
  return new Promise(async ill1111l => {
    $.post(IIl1Il, async (II1lll11, l111ll1i, Ii11I11l) => {
      try {
        if (II1lll11) {
          console.log("" + JSON.stringify(II1lll11));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Ii11I11l = JSON.parse(Ii11I11l);
          if (Ii11I11l.code == 0) {
            if (Ii11I11l.data.bizCode == 0) {
              i1ilI1li = Ii11I11l.data?.["result"]?.["rewards"];
            } else console.log(Ii11I11l.data.bizMsg);
          } else console.log(JSON.stringify(Ii11I11l));
        }
      } catch (l11I1i11) {
        $.logErr(l11I1i11, l111ll1i);
      } finally {
        ill1111l(i1ilI1li);
      }
    });
  });
}
function li1IiIIl() {
  let iIIi1ll = {
    "url": "https://prodev.m.jd.com/mall/active/rw8ewMzsDMevpVnuCJ7EgXS4PM9/index.html",
    "headers": {
      "User-Agent": $.UA,
      "Cookie": i1lI1lll
    }
  };
  return new Promise(II1liIil => {
    $.get(iIIi1ll, (iIliiiII, lliIII1, iilil1i1) => {
      try {
        iIliiiII ? $.log(JSON.stringify(iIliiiII)) : $.activityId = iilil1i1.match(/"cmsActivityId":"(\d+)"/)[1];
      } catch (ill1llIl) {
        $.log(JSON.stringify(ill1llIl));
      } finally {
        II1liIil();
      }
    });
  });
}
function llliIl1() {
  return new Promise(I11iIIl => {
    const li1I1I1i = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": i1lI1lll,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(li1I1I1i, (l1iI1iIi, illll1ll, lIlii111) => {
      try {
        if (lIlii111) {
          lIlii111 = JSON.parse(lIlii111);
          if (lIlii111.islogin === "1") {} else lIlii111.islogin === "0" && ($.isLogin = false);
        }
      } catch (iIlIiIIi) {
        console.log(iIlIiIIi);
      } finally {
        I11iIIl();
      }
    });
  });
}
function i1iiI11i() {
  return new Promise(IIli1IiI => {
    !IIi11I11 ? $.msg($.name, "", "" + iliIlI) : $.log("京东账号" + $.index + $.nickName + "\n" + iliIlI);
    IIli1IiI();
  });
}
function i1Iiil(iill1lIl) {
  try {
    if (typeof JSON.parse(iill1lIl) == "object") {
      return true;
    }
  } catch (iIIIlI1l) {
    return console.log(iIIIlI1l), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function l1l1iIi1(Ii1Ii11l) {
  const llilIl1l = function () {
      let I1I1llil = true;
      return function (I1il1i1l, lIIll1Il) {
        const lIlII11I = I1I1llil ? function () {
          if (lIIll1Il) {
            const IliIlIi = lIIll1Il.apply(I1il1i1l, arguments);
            return lIIll1Il = null, IliIlIi;
          }
        } : function () {};
        return I1I1llil = false, lIlII11I;
      };
    }(),
    iiI1Ili = llilIl1l(this, function () {
      return iiI1Ili.toString().search("(((.+)+)+)+$").toString().constructor(iiI1Ili).search("(((.+)+)+)+$");
    });
  iiI1Ili();
  if (typeof Ii1Ii11l == "string") try {
    return JSON.parse(Ii1Ii11l);
  } catch (li1liii) {
    return console.log(li1liii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}