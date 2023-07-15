/*
1，5，10豆，黑子擦肩
定时随机
 */
const Env=require('./utils/Env.js');
const $ = new Env('每日抽豆');
const liIiI11I = $.isNode() ? require("./sendNotify") : "",
  lIl1Ill = $.isNode() ? require("./jdCookie.js") : "",
  Iil1lil = require("./function/dylanx.js");
let I1IIl1II = true,
  i1I1Ilil = [],
  llliIllI = "",
  lili111 = "";
if ($.isNode()) {
  Object.keys(lIl1Ill).forEach(i11lli11 => {
    i1I1Ilil.push(lIl1Ill[i11lli11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1I1Ilil = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IiiI1li($.getdata("CookiesJD") || "[]").map(Ii11li11 => Ii11li11.cookie)].filter(iliI1l => !!iliI1l);
!(async () => {
  if (!i1I1Ilil[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IIIiIII1 = 0; IIIiIII1 < i1I1Ilil.length; IIIiIII1++) {
    if (i1I1Ilil[IIIiIII1]) {
      llliIllI = i1I1Ilil[IIIiIII1];
      $.UserName = decodeURIComponent(llliIllI.match(/pt_pin=([^; ]+)(?=;?)/) && llliIllI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIIiIII1 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.black = false;
      $.UA = require("./USER_AGENTS").UARAM();
      await I11l11i1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await liIiI11I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await l1IiIiil();
      await $.wait(1000);
      await I1I11lll({
        "authType": "2",
        "awardSource": "1",
        "enAwardK": "ltvTJ/WYFPZcuWIWHCAjR/lUVVYszUqGN+JzEE06dPu7DDzXHNt5Br7i6hYH2826ssuKfHev2yv2\n8HWSugMPNJj0hO0oRf9K9vB1kroDDzT5uSUPG/Z35YJDHw8AyYmqk4Q1u2vSGKS/M+5ruJeepDDb\nGjIC3nIIbIE2I7/kWfG6LEOpCsfjzQD+tTlmq6znidq4bRZoUJ3MOg0BXga8nip79XSe0g5kHG/A\na2pjcqcS+Z0MdH5AoT28E84LptqHeCE6mkMJ/dL3sjRs44o9OuXOZklgdKme+XUAsi2or52idiaj\nejivdFQcDHA7HH3gaHvanKkkE8TU7ESujM2a18EuQglPvG63XuhsjEuTur7Q0q+RCbbzCUJO1qM0\nhM1uGj8RZGTjNPmgGqqkikOxgpl2et5AeQ0y_babel",
        "encryptAssignmentId": "tb5nbUQ7kk45XoAexByamhEHeHy",
        "encryptProjectId": "TmxyMFsNSsUTi1UoGoYd6WM2Bks",
        "lotteryCode": "1271763",
        "riskParam": {
          "childActivityUrl": "https://pro.m.jd.com/mall/active/3kmVmayf36Kmoyfq9pLuCSYUfU9t/index.html?babelChannel=ttt1",
          "eid": "",
          "pageClickKey": "Babel_WheelSurf",
          "shshshfpb": ""
        },
        "srv": "{\"bord\":\"0\",\"fno\":\"0-0-2\",\"mid\":\"70764372\",\"bi2\":\"2\",\"bid\":\"0\",\"aid\":\"01150161\"}"
      });
      await $.wait(10000);
    }
  }
})().catch(Illll1iI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Illll1iI + "!", "");
}).finally(() => {
  $.done();
});
async function I1I11lll(I11lIl1) {
  let II1Iilii = Iil1lil.getbody("babelGetLottery", I11lIl1);
  return new Promise(async IiIiII11 => {
    $.post(iIililll("babelGetLottery", II1Iilii), async (I111II, IllilI11, IIlI11l1) => {
      try {
        if (I111II) {
          console.log("" + JSON.stringify(I111II));
          console.log(" API请求失败，请检查网路重试");
        } else {
          IIlI11l1 = JSON.parse(IIlI11l1);
          if (IIlI11l1.prizeName) console.log("恭喜获得：" + IIlI11l1.prizeName);else IIlI11l1.responseMessage.includes("未通过") ? ($.log("风险等级未通过！"), $.black = true) : $.log(JSON.stringify(IIlI11l1));
        }
      } catch (l11) {
        $.logErr(l11, IllilI11);
      } finally {
        IiIiII11(IIlI11l1);
      }
    });
  });
}
async function l1IiIiil() {
  let I1iiill1 = Iil1lil.getbody("signInWithPrize", {
    "floorId": "83596202"
  });
  return new Promise(async IliII11l => {
    $.post(iIililll("signInWithPrize", I1iiill1), async (li1l11i1, iI11lil, i1l1llII) => {
      try {
        if (li1l11i1) {
          console.log("" + JSON.stringify(li1l11i1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          i1l1llII = JSON.parse(i1l1llII);
          if (i1l1llII.code == 0) {
            if (i1l1llII.result.signInText.includes("已经")) $.log("103-任务已完成");else {
              if (i1l1llII.result.signInText.includes("恭喜")) $.log("恭喜获得：" + i1l1llII.result.beanCount + "京豆");else {}
            }
          } else console.log(i1l1llII.message);
        }
      } catch (IiIIiiI) {
        $.logErr(IiIIiiI, iI11lil);
      } finally {
        IliII11l(i1l1llII);
      }
    });
  });
}
function iIililll(i111l1I, IIIlI11l) {
  return {
    "url": "https://api.m.jd.com/client.action",
    "body": "functionId=" + i111l1I + "&" + IIIlI11l,
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": llliIllI
    }
  };
}
function I11l11i1() {
  return new Promise(iiIii11 => {
    const Illili1I = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": llliIllI,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(Illili1I, (I11IlIll, li1iIIl1, l1Ii1liI) => {
      try {
        if (l1Ii1liI) {
          l1Ii1liI = JSON.parse(l1Ii1liI);
          if (l1Ii1liI.islogin === "1") {} else l1Ii1liI.islogin === "0" && ($.isLogin = false);
        }
      } catch (iliiI1I1) {
        console.log(iliiI1I1);
      } finally {
        iiIii11();
      }
    });
  });
}
function i1IiiIi() {
  return new Promise(i11I1lil => {
    const Ili1II1i = {
      "url": "https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1",
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(Ili1II1i, (lliil1I1, lI1Iii1l, iIII11li) => {
      try {
        iIII11li && (iIII11li = JSON.parse(iIII11li), $.difftime = Date.now() - iIII11li.timestamp);
      } catch (IIllIiIl) {
        console.log(IIllIiIl);
      } finally {
        i11I1lil();
      }
    });
  });
}
function il1IIli1() {
  return new Promise(llI1I1I1 => {
    if (!I1IIl1II) $.msg($.name, "", "" + lili111);else {
      $.log("京东账号" + $.index + $.nickName + "\n" + lili111);
    }
    llI1I1I1();
  });
}
function l1illIIi(l11iIili) {
  try {
    if (typeof JSON.parse(l11iIili) == "object") return true;
  } catch (l1iI1Ii) {
    return console.log(l1iI1Ii), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function IiiI1li(I1I1li1l) {
  const iIIIIIl = function () {
      let l1l1I = true;
      return function (liilllI, Ill11ll1) {
        const iIl11IiI = l1l1I ? function () {
          if (Ill11ll1) {
            const iiiilili = Ill11ll1.apply(liilllI, arguments);
            return Ill11ll1 = null, iiiilili;
          }
        } : function () {};
        return l1l1I = false, iIl11IiI;
      };
    }(),
    li1IIIiI = iIIIIIl(this, function () {
      return li1IIIiI.toString().search("(((.+)+)+)+$").toString().constructor(li1IIIiI).search("(((.+)+)+)+$");
    });
  li1IIIiI();
  if (typeof I1I1li1l == "string") {
    try {
      return JSON.parse(I1I1li1l);
    } catch (l11iIl1i) {
      return console.log(l11iIl1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}