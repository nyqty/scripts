/*
任务，抽奖
晚了没水
入口：https://pro.m.jd.com/mall/active/4BybhXN5cfWZfXktap24KHAV2tCv/index.html
1 9 11 * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_pdkh.js
updatetime:2023/6/11
*/
const Env = require('./utils/Env.js');
const $ = new Env('派对狂欢城');
const lIilIilI = $.isNode() ? require("./sendNotify") : "",
  i1llIll1 = $.isNode() ? require("./jdCookie.js") : "",
  IIlliiii = require("./USER_AGENTS"),
  IlIl1l1I = require("crypto-js");
let lilill11 = true,
  I1i11lil = [],
  iiiIIl1i = "",
  iI1I1lII = "",
  iiiIiI11 = false;
if ($.isNode()) {
  Object.keys(i1llIll1).forEach(iIIliI1l => {
    I1i11lil.push(i1llIll1[iIIliI1l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1i11lil = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IiIlIiIi($.getdata("CookiesJD") || "[]").map(liliIIli => liliIIli.cookie)].filter(lIilIIII => !!lIilIIII);
!(async () => {
  if (!I1i11lil[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.log("\n当前版本：V1.0.0 不做加购开会员");
  $.log("\n问题建议TG：https://t.me/dylan_jdpro");
  for (let lIillilI = 0; lIillilI < I1i11lil.length; lIillilI++) {
    if (I1i11lil[lIillilI]) {
      iiiIIl1i = I1i11lil[lIillilI];
      $.UserName = decodeURIComponent(iiiIIl1i.match(/pt_pin=([^; ]+)(?=;?)/) && iiiIIl1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIillilI + 1;
      $.isLogin = true;
      $.nickName = "";
      $.notimes = false;
      $.UA = IIlliiii.UARAM ? IIlliiii.UARAM() : IIlliiii.USER_AGENT;
      await liI11Il1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lIilIilI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await IiliiIIi();
      await $.wait(200);
      await iIII1l1();
      await $.wait(200);
      await I1IllIll();
      await $.wait(200);
      await IlI1li1l();
      await $.wait(200);
      if ($.taskList) {
        $.log("去做任务...");
        for (let IIiiI1l of $.taskList) {
          if (!!IIiiI1l.assignmentName && IIiiI1l.assignmentName !== "积分抽奖" && IIiiI1l.assignmentName.indexOf("抽奖奖池") == -1 && IIiiI1l.assignmentName.indexOf("加购") == -1 && IIiiI1l.assignmentName.indexOf("会员") == -1) {
            $.log("\n----" + IIiiI1l.assignmentName);
            if (IIiiI1l.completionFlag) {
              $.log("----已完成");
              continue;
            }
            if (IIiiI1l.ext.shoppingActivity || IIiiI1l.ext.followShop) {
              for (let il1I1IlI = 0; il1I1IlI < IIiiI1l.assignmentTimesLimit - IIiiI1l.completionCnt; il1I1IlI++) {
                await il1illll(IIiiI1l.encryptAssignmentId, IIiiI1l.ext.shoppingActivity ? IIiiI1l.ext.shoppingActivity[il1I1IlI].itemId : IIiiI1l.ext.followShop[il1I1IlI].itemId);
                await $.wait(1000);
              }
              continue;
            }
            await il1illll(IIiiI1l.encryptAssignmentId);
            await $.wait(500);
          }
        }
      }
      $.log("\n\n元宝抽奖...");
      for (let l1Iil1l of Array(50)) {
        if ($.notimes) break;
        await i11iIlII();
        await $.wait(3000);
      }
      await $.wait(5000);
    }
  }
})().catch(IililI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + IililI + "!", "");
}).finally(() => {
  $.done();
});
async function IiliiIIi() {
  return new Promise(async llilIi11 => {
    $.post(II1lIlil("arvrMeta2RoomSortListByTemplateId", {
      "templateId": "790088977"
    }), async (IlIil11, Iiiil1I, IIIl1III) => {
      try {
        IlIil11 ? (console.log("" + JSON.stringify(IlIil11)), console.log(" API请求失败，请检查网路重试")) : (iiiIiI11 && console.log(IIIl1III), IIIl1III = JSON.parse(IIIl1III), IIIl1III.code == 0 ? $.roomId = IIIl1III.data[0].roomId : console.log(IIIl1III.msg));
      } catch (IlIlIiIi) {
        $.logErr(IlIlIiIi, Iiiil1I);
      } finally {
        llilIi11(IIIl1III);
      }
    });
  });
}
async function iIII1l1() {
  return new Promise(async i1I1i11i => {
    $.post(II1lIlil("meta2LoginGame", {
      "channel": "1",
      "roomId": $.roomId
    }), async (lli1il1i, i11II1il, il11iI1I) => {
      try {
        if (lli1il1i) {
          console.log("" + JSON.stringify(lli1il1i));
          console.log(" API请求失败，请检查网路重试");
        } else {
          iiiIiI11 && console.log(il11iI1I);
          il11iI1I = JSON.parse(il11iI1I);
          if (il11iI1I.code == 0) {} else console.log(il11iI1I.msg);
        }
      } catch (lIIi111l) {
        $.logErr(lIIi111l, i11II1il);
      } finally {
        i1I1i11i(il11iI1I);
      }
    });
  });
}
async function I1IllIll() {
  let llIIi1li = {
    "rewardType": 6,
    "activityId": "ba6e852dd2bc05a1de75b2d2dc9fda305096bcc0",
    "appId": "app_440"
  };
  return llIIi1li = I1Ii11ii(llIIi1li), new Promise(async iIill1II => {
    $.post(II1lIlil("arvr_getRequestToken", llIIi1li), async (iIIlI1l, il1I1Ill, lI1l11Ii) => {
      try {
        if (iIIlI1l) {
          console.log("" + JSON.stringify(iIIlI1l));
          console.log(" API请求失败，请检查网路重试");
        } else {
          iiiIiI11 && console.log(lI1l11Ii);
          lI1l11Ii = JSON.parse(lI1l11Ii);
          lI1l11Ii.code == 200 ? $.token = lI1l11Ii.data : console.log(lI1l11Ii.msg);
        }
      } catch (ii1iI11i) {
        $.logErr(ii1iI11i, il1I1Ill);
      } finally {
        iIill1II(lI1l11Ii);
      }
    });
  });
}
async function IlI1li1l() {
  let liilli1I = {
    "projectId": "1452563",
    "sourceCode": 2
  };
  return liilli1I = I1Ii11ii(liilli1I), new Promise(async I11111i1 => {
    $.post(II1lIlil("arvr_queryInteractiveInfo", liilli1I), async (iiiIIlII, iIlliI1i, lllIIi1i) => {
      try {
        iiiIIlII ? (console.log("" + JSON.stringify(iiiIIlII)), console.log(" API请求失败，请检查网路重试")) : (iiiIiI11 && console.log(lllIIi1i), lllIIi1i = JSON.parse(lllIIi1i), lllIIi1i.subCode == 0 ? $.taskList = lllIIi1i.assignmentList : console.log(lllIIi1i.msg));
      } catch (ill1lli) {
        $.logErr(ill1lli, iIlliI1i);
      } finally {
        I11111i1(lllIIi1i);
      }
    });
  });
}
async function i11iIlII() {
  let li1II1l = {
    "projectId": "1452563",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": "jBnYHuyBu5krJWNKCcPJEHzR5a7",
    "subTaskIdSecret": true,
    "exchangeNum": 1
  };
  return li1II1l = I1Ii11ii(li1II1l), new Promise(async iiillli1 => {
    $.post(II1lIlil("arvr_doInteractiveAssignment", li1II1l), async (l1ilIiIi, iilIIill, I1iil) => {
      try {
        if (l1ilIiIi) {
          console.log("" + JSON.stringify(l1ilIiIi));
          console.log(" API请求失败，请检查网路重试");
        } else {
          iiiIiI11 && console.log(I1iil);
          I1iil = JSON.parse(I1iil);
          if (I1iil.subCode == 0) {
            if (I1iil.rewardsInfo.failRewards && I1iil.rewardsInfo.failRewards.length != 0) {
              if (I1iil.rewardsInfo.failRewards[0].msg.indexOf("风控") > -1) {
                process.stdout.write("黑号，不继续抽了！");
                $.notimes = true;
                return;
              }
            }
            if (I1iil.rewardsInfo.successRewards && JSON.stringify(I1iil.rewardsInfo.successRewards) != "{}") {
              process.stdout.write(Object.values(I1iil.rewardsInfo.successRewards)[0][0].rewardName + " ");
            } else process.stdout.write("空气 ");
          } else {
            if (I1iil.msg.includes("不足")) {
              console.log(I1iil.msg);
              $.notimes = true;
            } else console.log(I1iil.msg);
          }
        }
      } catch (IllI1I11) {
        $.logErr(IllI1I11, iilIIill);
      } finally {
        iiillli1(I1iil);
      }
    });
  });
}
async function il1illll(iiiIllIl, IiII111I) {
  let ii1I1i11 = {
    "projectId": "1452563",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": iiiIllIl,
    "subTaskIdSecret": true,
    "itemId": IiII111I
  };
  if (!IiII111I) delete ii1I1i11.itemId;
  return ii1I1i11 = I1Ii11ii(ii1I1i11), new Promise(async Il1l1lii => {
    $.post(II1lIlil("arvr_doInteractiveAssignment", ii1I1i11), async (lili1I1i, li1iI11I, ll1l1) => {
      try {
        if (lili1I1i) {
          console.log("" + JSON.stringify(lili1I1i));
          console.log(" API请求失败，请检查网路重试");
        } else {
          iiiIiI11 && console.log(ll1l1);
          ll1l1 = JSON.parse(ll1l1);
          ll1l1.subCode == 0 ? ll1l1.rewardsInfo.successRewards && process.stdout.write("" + ll1l1.rewardsInfo.successRewards[1].quantityDetails[0].quantity + ll1l1.rewardsInfo.successRewards[1].quantityDetails[0].rewardName + " ") : console.log(ll1l1.msg);
        }
      } catch (Ii1il1I) {
        $.logErr(Ii1il1I, li1iI11I);
      } finally {
        Il1l1lii(ll1l1);
      }
    });
  });
}
function II1lIlil(ii11ili1, IiiIIl1) {
  return {
    "url": "https://api.m.jd.com/api/" + ii11ili1,
    "body": "appid=commonActivity&functionId=" + ii11ili1 + "&body=" + encodeURIComponent(JSON.stringify(IiiIIl1)) + "&t=" + Date.now(),
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://pro.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": iiiIIl1i
    }
  };
}
function I1Ii11ii(iii1ii1) {
  let IllIlII1 = "",
    IiIlllil = Object.keys(iii1ii1).sort(function (lllIll, IIliIIIi) {
      return lllIll.localeCompare(IIliIIIi);
    });
  for (let iiIl1IIl of IiIlllil) {
    IllIlII1 = IllIlII1.concat(iii1ii1[iiIl1IIl]);
  }
  let ii1iI1I = Date.now();
  r = "".concat("c4491f13dce9c71f").concat(IllIlII1).concat(ii1iI1I);
  let l1llI1iI = IlIl1l1I.MD5(r).toString();
  return iii1ii1.timestamp = ii1iI1I, iii1ii1.sign = l1llI1iI, iii1ii1.signKey = "c4491f13dce9c71f", iii1ii1;
}
function liI11Il1() {
  return new Promise(iIllll1 => {
    const i1IiliI1 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": iiiIIl1i,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(i1IiliI1, (il111Iii, i1i11Ii, il1IiilI) => {
      try {
        if (il1IiilI) {
          il1IiilI = JSON.parse(il1IiilI);
          if (il1IiilI.islogin === "1") {} else il1IiilI.islogin === "0" && ($.isLogin = false);
        }
      } catch (IiliIlll) {
        console.log(IiliIlll);
      } finally {
        iIllll1();
      }
    });
  });
}
function IIl11liI() {
  return new Promise(llIl1i1 => {
    if (!lilill11) $.msg($.name, "", "" + iI1I1lII);else {
      $.log("京东账号" + $.index + $.nickName + "\n" + iI1I1lII);
    }
    llIl1i1();
  });
}
function liIilIi1(IIiI1I1) {
  try {
    if (typeof JSON.parse(IIiI1I1) == "object") return true;
  } catch (ii1illI1) {
    return console.log(ii1illI1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function IiIlIiIi(III1lll) {
  const IIIliI11 = function () {
      let Iil11Ili = true;
      return function (i1iiIii, ll1Iii1I) {
        const llIiIlli = Iil11Ili ? function () {
          if (ll1Iii1I) {
            const lI11liIl = ll1Iii1I.apply(i1iiIii, arguments);
            return ll1Iii1I = null, lI11liIl;
          }
        } : function () {};
        return Iil11Ili = false, llIiIlli;
      };
    }(),
    lIlI11i1 = IIIliI11(this, function () {
      return lIlI11i1.toString().search("(((.+)+)+)+$").toString().constructor(lIlI11i1).search("(((.+)+)+)+$");
    });
  lIlI11i1();
  if (typeof III1lll == "string") try {
    return JSON.parse(III1lll);
  } catch (Iil11iI1) {
    return console.log(Iil11iI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}