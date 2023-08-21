/*

脚本默认会帮我助力开工位，介意请添加变量HELP_JOYPARK，false为不助力
export HELP_JOYPARK=""

运行频繁会403，请自行定时运行

============Quantumultx===============
[task_local]
#京东版-汪汪庄园助力
1 1 1 1 * jd_wwzy_help.js, tag=京东版-汪汪庄园助力, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('京东版-汪汪庄园助力');
const liIlli = $.isNode() ? require("./jdCookie.js") : "",
  lil11 = $.isNode() ? require("./sendNotify") : "",
  lllI1 = require("./function/krgetua");
let III11I = [],
  Ilii1 = "";
if ($.isNode()) {
  Object.keys(liIlli).forEach(l1llli => {
    III11I.push(liIlli[l1llli]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else III11I = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...liIll1($.getdata("CookiesJD") || "[]").map(iI1lII => iI1lII.cookie)].filter(ll11iI => !!ll11iI);
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let ili1I1 = Date.now();
message = "";
!(async () => {
  if (!III11I[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let lI1lIi = 0; lI1lIi < III11I.length; lI1lIi++) {
    Ilii1 = III11I[lI1lIi];
    if (Ilii1) {
      $.UserName = decodeURIComponent(Ilii1.match(/pt_pin=([^; ]+)(?=;?)/) && Ilii1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lI1lIi + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      UA = await lllI1($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lil11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      if ($.isNode()) {
        if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") {} else {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let Iii1Ii = await liIllI("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (Iii1Ii.data && Iii1Ii.data.helpState && Iii1Ii.data.helpState === 1) {} else {
            if (Iii1Ii.data && Iii1Ii.data.helpState && Iii1Ii.data.helpState === 3) {} else {
              if (Iii1Ii.data && Iii1Ii.data.helpState && Iii1Ii.data.helpState === 2) $.openIndex++;else {}
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await liIllI();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.joyBaseInfo && $.joyBaseInfo.invitePin) {
        $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin);
        $.invitePinTaskList.push($.joyBaseInfo.invitePin);
      } else {
        $.log($.name + " - " + $.UserName + "  助力码: null");
        $.invitePinTaskList.push("");
        $.isLogin = false;
        $.log("服务端异常，尝试手动进入活动，入口：京东版-我的-汪汪庄园");
        continue;
      }
      await ili1II();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const Iii1Il of $.taskList) {
        if (Iii1Il.taskType === "SIGN") {
          $.log("" + Iii1Il.taskTitle);
          await ll11i(Iii1Il.id, Iii1Il.taskType, undefined);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          $.log(Iii1Il.taskTitle + " 领取奖励");
          await l1i11(Iii1Il.id, Iii1Il.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
        if (Iii1Il.taskType === "BROWSE_PRODUCT" || Iii1Il.taskType === "BROWSE_CHANNEL" && Iii1Il.taskLimitTimes !== 1) {
          let ii1l1I = await I1I1li(Iii1Il.id, Iii1Il.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let lI1lII = 0;
          if (ii1l1I.length === 0) {
            let lIill1 = await l1i11(Iii1Il.id, Iii1Il.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            !lIill1.success && ($.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle + " 领取完成!"), ii1l1I = await I1I1li(Iii1Il.id, Iii1Il.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          }
          while (Iii1Il.taskLimitTimes - Iii1Il.taskDoTimes >= 0) {
            if (ii1l1I.length === 0) {
              $.log(Iii1Il.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(Iii1Il.taskTitle + " " + Iii1Il.taskDoTimes + "/" + Iii1Il.taskLimitTimes);
            let l1lI1i = await ll11i(Iii1Il.id, Iii1Il.taskType, ii1l1I[lI1lII].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            l1lI1i.code === 2005 || l1lI1i.code === 0 ? $.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle + " 任务完成！") : $.log("任务失败！");
            lI1lII++;
            Iii1Il.taskDoTimes++;
            if (!ii1l1I[lI1lII]) break;
          }
          for (let l1I1Ii = 0; l1I1Ii < Iii1Il.taskLimitTimes; l1I1Ii++) {
            let IIlill = await l1i11(Iii1Il.id, Iii1Il.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!IIlill.success) {
              $.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (Iii1Il.taskType === "SHARE_INVITE") {
            $.yq_taskid = Iii1Il.id;
            for (let liliil = 0; liliil < 5; liliil++) {
              let lIillI = await l1i11($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!lIillI.success) {
                break;
              }
              $.log("领取助力奖励成功！");
            }
          }
        }
        Iii1Il.taskType === "BROWSE_CHANNEL" && Iii1Il.taskLimitTimes === 1 && ($.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle), await iI1lI1(Iii1Il.id, Iii1Il.taskType, Iii1Il.taskSourceUrl), $.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle + " 领取奖励"), await l1i11(Iii1Il.id, Iii1Il.taskType));
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let iIiilI = 0; iIiilI < III11I.length; iIiilI++) {
    Ilii1 = III11I[iIiilI];
    if (Ilii1) {
      $.UserName = decodeURIComponent(Ilii1.match(/pt_pin=([^; ]+)(?=;?)/) && Ilii1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIiilI + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lil11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const ilIlIi of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + ilIlIi);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let ilIlIl = await liIllI($.yq_taskid, 1, ilIlIi);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (ilIlIl.success) {
          if (ilIlIl.data.helpState === 1) $.log("助力成功！");else {
            if (ilIlIl.data.helpState === 0) $.log("自己不能助力自己！");else {
              if (ilIlIl.data.helpState === 2) $.log("助力过了！");else {
                if (ilIlIl.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else ilIlIl.data.helpState === 4 && $.log("这个B助力满了！");
              }
            }
          }
        } else {
          $.log("数据异常 助力失败！\n\n");
          break;
        }
      }
    }
  }
})().catch(ll1llI => $.logErr(ll1llI)).finally(() => $.done());
function ili1II() {
  return new Promise(iiI1iI => {
    $.post(IlI1li("body={\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}&appid=activities_platform", "apTaskList"), async (I1iiil, Illll1, lI1iil) => {
      $.log("=== 任务列表 start ===");
      try {
        if (I1iiil) {
          console.log("" + JSON.stringify(I1iiil));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          lI1iil = JSON.parse(lI1iil);
          $.taskList = lI1iil.data;
          for (const iIiiiI of $.taskList) {
            $.log(iIiiiI.taskTitle + " " + iIiiiI.taskDoTimes + "/" + iIiiiI.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (ilI11i) {
        $.logErr(ilI11i, Illll1);
      } finally {
        iiI1iI(lI1iil);
      }
    });
  });
}
async function liIllI(ilI11l = "", li1I = "", IIliil = "") {
  const lI1iiI = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + ilI11l + "\",\"inviteType\":\"" + li1I + "\",\"inviterPin\":\"" + IIliil + "\",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    i11lII = await ll11l("4abce", lI1iiI);
  return new Promise(I1iii1 => {
    $.post(IlI1ll(i11lII), async (li11, ilIlI1, I1Illi) => {
      try {
        li11 ? (console.log("" + JSON.stringify(li11)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (I1Illi = JSON.parse(I1Illi), $.joyBaseInfo = I1Illi.data);
      } catch (lI1ii1) {
        $.logErr(lI1ii1, ilIlI1);
      } finally {
        I1iii1(I1Illi);
      }
    });
  });
}
async function ll11i(liliiI, ilIIiI, lIl1ii = "", lIl1il = "activities_platform") {
  const IIlii1 = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + ilIIiI + "\",\"taskId\":" + liliiI + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"taskInsert\":true,\"itemId\":\"" + lIl1ii + "\"}"
    },
    iiI1lI = await ll11l("4abce", IIlii1);
  return new Promise(iliiII => {
    $.post(IlI1ll(iiI1lI), async (iiI1li, IIliii, i1111I) => {
      try {
        iiI1li ? (console.log("" + JSON.stringify(iiI1li)), console.log($.name + " API请求失败，请检查网路重试")) : i1111I = JSON.parse(i1111I);
      } catch (lIl1lI) {
        $.logErr(lIl1lI, IIliii);
      } finally {
        iliiII(i1111I);
      }
    });
  });
}
async function iI1lI1(Ii1IIi, Ii1IIl, l111I, ll1lli = "activities_platform") {
  const Illlil = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + Ii1IIl + "\",\"taskId\":" + Ii1IIi + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"itemId\":\"" + l111I + "\"}"
    },
    I1iili = await ll11l("4abce", Illlil);
  return new Promise(i1lli => {
    $.post(IlI1ll(I1iili), async (i11111, lIl1li, Il1I1) => {
      try {
        i11111 ? (console.log("" + JSON.stringify(i11111)), console.log($.name + " API请求失败，请检查网路重试")) : Il1I1 = JSON.parse(Il1I1);
      } catch (Ii111) {
        $.logErr(Ii111, lIl1li);
      } finally {
        i1lli(Il1I1);
      }
    });
  });
}
async function I1I1li(l111i, l111l) {
  const Ii1II1 = {
      "functionId": "apTaskDetail",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + l111l + "\",\"taskId\":" + l111i + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    lilili = await ll11l("4abce", Ii1II1);
  return new Promise(IilI1 => {
    $.post(IlI1ll(lilili), async (l1lI1, Ili1I1, lI1I1i) => {
      try {
        l1lI1 ? (console.log("" + JSON.stringify(l1lI1)), console.log($.name + " API请求失败，请检查网路重试")) : (lI1I1i = JSON.parse(lI1I1i), !lI1I1i.success ? $.taskDetailList = [] : $.taskDetailList = lI1I1i?.["data"]?.["taskItemList"]);
      } catch (i1ll1) {
        $.logErr(i1ll1, Ili1I1);
      } finally {
        !lI1I1i.success ? IilI1([]) : IilI1(lI1I1i.data.taskItemList);
      }
    });
  });
}
async function l1i11(lilI1I, lI1I1l) {
  const i1IiiI = {
      "functionId": "apTaskDrawAward",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + lI1I1l + "\",\"taskId\":" + lilI1I + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    lI1I1I = await ll11l("55276", i1IiiI);
  return new Promise(i1llI => {
    $.post(IlI1ll(lI1I1I), async (iIIli1, Ii1l1i, l1lIl) => {
      try {
        iIIli1 ? (console.log("" + JSON.stringify(iIIli1)), console.log($.name + " API请求失败，请检查网路重试")) : (l1lIl = JSON.parse(l1lIl), $.log("领取奖励"));
      } catch (i1Iiil) {
        $.logErr(i1Iiil, Ii1l1i);
      } finally {
        i1llI(l1lIl);
      }
    });
  });
}
function IlI1li(l1lIi, l1lili) {
  return {
    "url": "https://api.m.jd.com/client.action" + (l1lili ? "?functionId=" + l1lili : ""),
    "body": l1lIi,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": Ilii1
    }
  };
}
function IlI1ll(lI1I11) {
  return {
    "url": "https://api.m.jd.com/?" + lI1I11,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": Ilii1
    }
  };
}
async function ll11l(IilIi, Ili1Il) {
  let iilIIi = {
      "appId": IilIi,
      ...Ili1Il,
      "ua": UA,
      "pin": $.UserName
    },
    I1iII = {
      "url": "http://kr.kingran.cf/h5st",
      "body": JSON.stringify(iilIIi),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30000
    };
  return new Promise(async l1lil1 => {
    $.post(I1iII, (I1iIi, iiiI1I, lilI11) => {
      let ili1i = "";
      try {
        if (I1iIi) {
          console.log("" + JSON.stringify(I1iIi));
          console.log($.name + " geth5st API请求失败，请检查网路重试");
        } else {
          lilI11 = JSON.parse(lilI11);
          if (typeof lilI11 === "object" && lilI11 && lilI11.body) {
            if (lilI11.body) ili1i = lilI11.body || "";
          } else lilI11.code == 400 ? console.log("\n" + lilI11.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (III1I1) {
        $.logErr(III1I1, iiiI1I);
      } finally {
        l1lil1(ili1i);
      }
    });
  });
}
function III111(I1IllI) {
  I1IllI = I1IllI || 32;
  let iIIll1 = "abcdef0123456789",
    llIIII = iIIll1.length,
    ilI11I = "";
  for (i = 0; i < I1IllI; i++) ilI11I += iIIll1.charAt(Math.floor(Math.random() * llIIII));
  return ilI11I;
}
function liIll1(i1Iili) {
  if (typeof i1Iili == "string") try {
    return JSON.parse(i1Iili);
  } catch (i1li1) {
    return console.log(i1li1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}