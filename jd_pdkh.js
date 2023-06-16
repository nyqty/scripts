/*
任务，抽奖
晚了没水
入口：https://pro.m.jd.com/mall/active/4BybhXN5cfWZfXktap24KHAV2tCv/index.html
1 9 11 * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_pdkh.js
updatetime:2023/6/11
*/
const Env = require('./utils/Env.js');
let wudoutimes = '15';//连续几次没有豆就不抽奖
const $ = new Env('派对狂欢城');

const ii1lIl1l = $.isNode() ? require("./sendNotify") : "",
  li1I1i1l = $.isNode() ? require("./jdCookie.js") : "",
  l1i1ii = require("./function/dylany.js"),
  l1IiIIl = require("./USER_AGENTS"),
  i1Ii1il1 = require("crypto-js");
let iIi1l1li = true,
  li1i1i = [],
  l11ill = "",
  iIIlIiIl = "",
  Iiii1iI1 = false,
  I1iiili = true;
if ($.isNode()) {
  Object.keys(li1I1i1l).forEach(i111l11I => {
    li1i1i.push(li1I1i1l[i111l11I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else li1i1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iI1iii($.getdata("CookiesJD") || "[]").map(i1l11Il => i1l11Il.cookie)].filter(i1ii1l1I => !!i1ii1l1I);
!(async () => {
  if (!li1i1i[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.log("\n当前版本：V2.0.0 修复403");
  $.log("\n问题建议TG：https://t.me/dylan_jdpro");
  for (let lllI11ii = 0; lllI11ii < li1i1i.length; lllI11ii++) {
    if (li1i1i[lllI11ii]) {
      l11ill = li1i1i[lllI11ii];
      $.UserName = decodeURIComponent(l11ill.match(/pt_pin=([^; ]+)(?=;?)/) && l11ill.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lllI11ii + 1;
      $.isLogin = true;
      $.nickName = "";
      $.notimes = false;
      $.airnum = 0;
      $.UA = l1IiIIl.UARAM ? l1IiIIl.UARAM() : l1IiIIl.USER_AGENT;
      await IlI11lI();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await ii1lIl1l.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await I1lliIli();
      await $.wait(200);
      await iliIl1ll();
      await $.wait(200);
      await Il1li1l1();
      await $.wait(200);
      await I1iiIl1();
      await $.wait(200);
      if ($.taskList) {
        $.log("去做任务...");
        for (let IllilIii of $.taskList) {
          if (!!IllilIii.assignmentName && IllilIii.assignmentName !== "积分抽奖" && IllilIii.assignmentName.indexOf("抽奖奖池") == -1 && IllilIii.assignmentName.indexOf("加购") == -1 && IllilIii.assignmentName.indexOf("会员") == -1) {
            $.log("\n----" + IllilIii.assignmentName);
            if (IllilIii.completionFlag) {
              $.log("----已完成");
              continue;
            }
            if (IllilIii.ext.shoppingActivity || IllilIii.ext.followShop) {
              for (let li11i11i = 0; li11i11i < IllilIii.assignmentTimesLimit - IllilIii.completionCnt; li11i11i++) {
                await IiIIiIll(IllilIii.encryptAssignmentId, IllilIii.ext.shoppingActivity ? IllilIii.ext.shoppingActivity[li11i11i].itemId : IllilIii.ext.followShop[li11i11i].itemId);
                await $.wait(1000);
              }
              continue;
            }
            await IiIIiIll(IllilIii.encryptAssignmentId);
            await $.wait(500);
          }
        }
      }
      if (I1iiili) {
        $.log("\n\n元宝抽奖...");
        for (let Ililii of Array(50)) {
          if ($.notimes) break;
          if ($.airnum > wudoutimes) {
            $.log("\n\n连续无豆达到设定值, 不抽奖只做任务！！！");
            I1iiili = false;
            break;
          }
          await I1lilI();
          await $.wait(1000);
        }
      }
      await $.wait(5000);
    }
  }
})().catch(Il11iliI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Il11iliI + "!", "");
}).finally(() => {
  $.done();
});
async function I1lliIli() {
  return new Promise(async ii111i => {
    $.post(ilIIil1("arvrMeta2RoomSortListByTemplateId", {
      "templateId": "790088977"
    }), async (lliII1l1, lIliIIl1, ilIi1lll) => {
      try {
        if (lliII1l1) {
          console.log("" + JSON.stringify(lliII1l1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Iiii1iI1 && console.log(ilIi1lll);
          ilIi1lll = JSON.parse(ilIi1lll);
          if (ilIi1lll.code == 0) {
            $.roomId = ilIi1lll.data[0].roomId;
          } else {
            console.log(ilIi1lll.msg);
          }
        }
      } catch (l1l1liIi) {
        $.logErr(l1l1liIi, lIliIIl1);
      } finally {
        ii111i(ilIi1lll);
      }
    });
  });
}
async function iliIl1ll() {
  return new Promise(async IiillI => {
    $.post(ilIIil1("meta2LoginGame", {
      "channel": "1",
      "roomId": $.roomId
    }), async (l1111Iil, ilIiiI1, iiiI1l1i) => {
      try {
        if (l1111Iil) {
          console.log("" + JSON.stringify(l1111Iil));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Iiii1iI1 && console.log(iiiI1l1i);
          iiiI1l1i = JSON.parse(iiiI1l1i);
          if (iiiI1l1i.code == 0) {} else console.log(iiiI1l1i.msg);
        }
      } catch (iillI11l) {
        $.logErr(iillI11l, ilIiiI1);
      } finally {
        IiillI(iiiI1l1i);
      }
    });
  });
}
async function Il1li1l1() {
  let IIiIi1I1 = {
    "rewardType": 6,
    "activityId": "ba6e852dd2bc05a1de75b2d2dc9fda305096bcc0",
    "appId": "app_440"
  };
  return IIiIi1I1 = iIiiiii1(IIiIi1I1), new Promise(async lI1l111 => {
    $.post(ilIIil1("arvr_getRequestToken", IIiIi1I1), async (IIIlIlIl, I1ilii1l, lllil111) => {
      try {
        IIIlIlIl ? (console.log("" + JSON.stringify(IIIlIlIl)), console.log(" API请求失败，请检查网路重试")) : (Iiii1iI1 && console.log(lllil111), lllil111 = JSON.parse(lllil111), lllil111.code == 200 ? $.token = lllil111.data : console.log(lllil111.msg));
      } catch (IllIi1il) {
        $.logErr(IllIi1il, I1ilii1l);
      } finally {
        lI1l111(lllil111);
      }
    });
  });
}
async function I1iiIl1() {
  let i1llli1 = {
    "projectId": "1452563",
    "sourceCode": 2
  };
  return i1llli1 = iIiiiii1(i1llli1), new Promise(async iIl1iii1 => {
    $.post(ilIIil1("arvr_queryInteractiveInfo", i1llli1), async (IiIl11l1, iIllIiI, iil1iIiI) => {
      try {
        if (IiIl11l1) {
          console.log("" + JSON.stringify(IiIl11l1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Iiii1iI1 && console.log(iil1iIiI);
          iil1iIiI = JSON.parse(iil1iIiI);
          if (iil1iIiI.subCode == 0) {
            $.taskList = iil1iIiI.assignmentList;
          } else console.log(iil1iIiI.msg);
        }
      } catch (iIIi1ii) {
        $.logErr(iIIi1ii, iIllIiI);
      } finally {
        iIl1iii1(iil1iIiI);
      }
    });
  });
}
async function I1lilI() {
  let ilIIIlll = {
    "projectId": "1452563",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": "jBnYHuyBu5krJWNKCcPJEHzR5a7",
    "subTaskIdSecret": true,
    "exchangeNum": 1
  };
  ilIIIlll = iIiiiii1(ilIIIlll);
  let iIllil1l = {
      "appId": "e5749",
      "fn": "arvr_doInteractiveAssignment",
      "body": ilIIIlll,
      "apid": "commonActivity",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    },
    IIi1ilii = await l1i1ii.getbody(iIllil1l),
    l1i1IIll = {
      "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
      "body": "" + IIi1ilii,
      "headers": {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": l11ill
      }
    };
  return new Promise(async liiiiiI => {
    $.post(l1i1IIll, async (i1I1IIil, ll1IiliI, l11iIi1I) => {
      try {
        if (i1I1IIil) {
          console.log("" + JSON.stringify(i1I1IIil));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Iiii1iI1 && console.log(l11iIi1I);
          l11iIi1I = JSON.parse(l11iIi1I);
          if (l11iIi1I.subCode == 0) {
            if (l11iIi1I.rewardsInfo.failRewards && l11iIi1I.rewardsInfo.failRewards.length != 0) {
              if (l11iIi1I.rewardsInfo.failRewards[0].msg.indexOf("风控") > -1) {
                process.stdout.write("黑号，不继续抽了！");
                $.notimes = true;
                return;
              }
            }
            l11iIi1I.rewardsInfo.successRewards && JSON.stringify(l11iIi1I.rewardsInfo.successRewards) != "{}" ? (process.stdout.write(Object.values(l11iIi1I.rewardsInfo.successRewards)[0][0].rewardName + " "), Object.values(l11iIi1I.rewardsInfo.successRewards)[0][0].rewardName.indexOf("京豆") == -1 ? $.airnum++ : $.airnum = 0) : (process.stdout.write("空气 "), $.airnum++);
          } else {
            if (l11iIi1I.msg.includes("不足")) {
              console.log(l11iIi1I.msg);
              $.notimes = true;
            } else {
              console.log(l11iIi1I.msg);
            }
          }
        }
      } catch (iII1Il1i) {
        $.logErr(iII1Il1i, ll1IiliI);
      } finally {
        liiiiiI(l11iIi1I);
      }
    });
  });
}
async function IiIIiIll(ill1iii1, II1lI) {
  let I11I1i = {
    "projectId": "1452563",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": ill1iii1,
    "subTaskIdSecret": true,
    "itemId": II1lI
  };
  if (!II1lI) delete I11I1i.itemId;
  I11I1i = iIiiiii1(I11I1i);
  let ii1IiiII = {
      "appId": "e5749",
      "fn": "arvr_doInteractiveAssignment",
      "body": I11I1i,
      "apid": "commonActivity",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    },
    IIlil1Il = await l1i1ii.getbody(ii1IiiII),
    i11illlI = {
      "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
      "body": "" + IIlil1Il,
      "headers": {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": l11ill
      }
    };
  return new Promise(async iilIl1iI => {
    $.post(i11illlI, async (ii1l11I, lI1I1iI, I1ii1IiI) => {
      try {
        ii1l11I ? (console.log("" + JSON.stringify(ii1l11I)), console.log("dotask 请求失败，请检查网路重试")) : (Iiii1iI1 && console.log(I1ii1IiI), I1ii1IiI = JSON.parse(I1ii1IiI), I1ii1IiI.subCode == 0 ? I1ii1IiI.rewardsInfo.successRewards && process.stdout.write("" + I1ii1IiI.rewardsInfo.successRewards[1].quantityDetails[0].quantity + I1ii1IiI.rewardsInfo.successRewards[1].quantityDetails[0].rewardName + " ") : console.log(I1ii1IiI.msg));
      } catch (Iiii11l1) {
        $.logErr(Iiii11l1, lI1I1iI);
      } finally {
        iilIl1iI(I1ii1IiI);
      }
    });
  });
}
function ilIIil1(liiIi11l, IIIlIli1) {
  return {
    "url": "https://api.m.jd.com/api/" + liiIi11l,
    "body": "appid=commonActivity&functionId=" + liiIi11l + "&body=" + encodeURIComponent(JSON.stringify(IIIlIli1)) + "&t=" + Date.now(),
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://pro.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": l11ill
    }
  };
}
function iIiiiii1(i1lIii1l) {
  let lIilI1lI = "",
    IliiilI = Object.keys(i1lIii1l).sort(function (liiI1I1i, iIllilii) {
      return liiI1I1i.localeCompare(iIllilii);
    });
  for (let Ii11II1l of IliiilI) {
    lIilI1lI = lIilI1lI.concat(i1lIii1l[Ii11II1l]);
  }
  let Iii111il = Date.now();
  r = "".concat("c4491f13dce9c71f").concat(lIilI1lI).concat(Iii111il);
  let l1iI1ll = i1Ii1il1.MD5(r).toString();
  return i1lIii1l.timestamp = Iii111il, i1lIii1l.sign = l1iI1ll, i1lIii1l.signKey = "c4491f13dce9c71f", i1lIii1l;
}
function IlI11lI() {
  return new Promise(I1iIIli => {
    const l11iIiI = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": l11ill,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(l11iIiI, (lIIilI1l, Il11111I, lIilil1l) => {
      try {
        if (lIilil1l) {
          lIilil1l = JSON.parse(lIilil1l);
          if (lIilil1l.islogin === "1") {} else lIilil1l.islogin === "0" && ($.isLogin = false);
        }
      } catch (l111ilii) {
        console.log(l111ilii);
      } finally {
        I1iIIli();
      }
    });
  });
}
function ll111il() {
  return new Promise(iIili1l => {
    !iIi1l1li ? $.msg($.name, "", "" + iIIlIiIl) : $.log("京东账号" + $.index + $.nickName + "\n" + iIIlIiIl);
    iIili1l();
  });
}
function lilIIi1i(l1l11l) {
  try {
    if (typeof JSON.parse(l1l11l) == "object") {
      return true;
    }
  } catch (iIIiIlII) {
    return console.log(iIIiIlII), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function iI1iii(II1Illli) {
  const ii1I11ii = function () {
      let lIIII11i = true;
      return function (I1iIlill, ll1IIii) {
        const iIIiIii = lIIII11i ? function () {
          if (ll1IIii) {
            const ilI11i11 = ll1IIii.apply(I1iIlill, arguments);
            return ll1IIii = null, ilI11i11;
          }
        } : function () {};
        return lIIII11i = false, iIIiIii;
      };
    }(),
    iI1IiIii = ii1I11ii(this, function () {
      return iI1IiIii.toString().search("(((.+)+)+)+$").toString().constructor(iI1IiIii).search("(((.+)+)+)+$");
    });
  iI1IiIii();
  if (typeof II1Illli == "string") {
    try {
      return JSON.parse(II1Illli);
    } catch (IIiiIiI) {
      return console.log(IIiiIiI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}