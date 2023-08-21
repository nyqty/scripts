/*

脚本默认会帮我助力开工位，介意请添加变量HELP_JOYPARK，false为不助力
export HELP_JOYPARK=""

运行频繁会403，请自行定时运行

============Quantumultx===============
[task_local]
#特价版-牛牛乐园助力
1 1 1 1 * jd_tj_nnly_help.js, tag=特价版-牛牛乐园助力, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('特价版-牛牛乐园助力');
const liIIi = $.isNode() ? require("./jdCookie.js") : "",
  IilllI = $.isNode() ? require("./sendNotify") : "",
  l1lllI = require("./function/krgetua");
let llliIi = [],
  i1lIli = "";
if ($.isNode()) {
  Object.keys(liIIi).forEach(llliI1 => {
    llliIi.push(liIIi[llliI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else llliIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ll11lI($.getdata("CookiesJD") || "[]").map(liIII => liIII.cookie)].filter(llii11 => !!llii11);
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let i1lIll = Date.now();
message = "";
!(async () => {
  if (!llliIi[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let II1i = 0; II1i < llliIi.length; II1i++) {
    i1lIli = llliIi[II1i];
    if (i1lIli) {
      $.UserName = decodeURIComponent(i1lIli.match(/pt_pin=([^; ]+)(?=;?)/) && i1lIli.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = II1i + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      UA = await l1lllI($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IilllI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      if ($.isNode()) {
        if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") {} else {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let II11 = await llii1l("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (II11.data && II11.data.helpState && II11.data.helpState === 1) {} else {
            if (II11.data && II11.data.helpState && II11.data.helpState === 3) {} else {
              if (II11.data && II11.data.helpState && II11.data.helpState === 2) $.openIndex++;else {}
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await llii1l();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.joyBaseInfo && $.joyBaseInfo.invitePin) {
        $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin);
        $.invitePinTaskList.push($.joyBaseInfo.invitePin);
      } else {
        $.log($.name + " - " + $.UserName + "  助力码: null");
        $.invitePinTaskList.push("");
        $.isLogin = false;
        $.log("服务端异常，尝试手动进入活动，入口：特价版-我的-汪汪乐园");
        continue;
      }
      await liIlii();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const ii1II1 of $.taskList) {
        ii1II1.taskType === "SIGN" && ($.log("" + ii1II1.taskTitle), await liIlil(ii1II1.id, ii1II1.taskType, undefined), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), $.log(ii1II1.taskTitle + " 领取奖励"), await iI1lIl(ii1II1.id, ii1II1.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
        if (ii1II1.taskType === "BROWSE_PRODUCT" || ii1II1.taskType === "BROWSE_CHANNEL" && ii1II1.taskLimitTimes !== 1) {
          let iliIll = await ll11il(ii1II1.id, ii1II1.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let llliIl = 6;
          if (iliIll.length === 0) {
            let iliIli = await iI1lIl(ii1II1.id, ii1II1.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            !iliIli.success && ($.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle + " 领取完成!"), iliIll = await ll11il(ii1II1.id, ii1II1.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          }
          while (ii1II1.taskLimitTimes - ii1II1.taskDoTimes >= 0) {
            if (iliIll.length === 0) {
              $.log(ii1II1.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(ii1II1.taskTitle + " " + ii1II1.taskDoTimes + "/" + ii1II1.taskLimitTimes);
            let illliI = await liIlil(ii1II1.id, ii1II1.taskType, iliIll[llliIl].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            illliI.code === 2005 || illliI.code === 0 ? $.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle + " 任务完成！") : $.log("任务失败！");
            llliIl++;
            ii1II1.taskDoTimes++;
            if (!iliIll[llliIl]) break;
          }
          for (let i11iIl = 0; i11iIl < ii1II1.taskLimitTimes; i11iIl++) {
            let ll11ll = await iI1lIl(ii1II1.id, ii1II1.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!ll11ll.success) {
              $.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (ii1II1.taskType === "SHARE_INVITE") {
            $.yq_taskid = ii1II1.id;
            for (let liiiii = 0; liiiii < 5; liiiii++) {
              let II1I = await iI1lIl($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!II1I.success) break;
              $.log("领取助力奖励成功！");
            }
          }
        }
        ii1II1.taskType === "BROWSE_CHANNEL" && ii1II1.taskLimitTimes === 1 && ($.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle), await llii1i(ii1II1.id, ii1II1.taskType, ii1II1.taskSourceUrl), $.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle + " 领取奖励"), await iI1lIl(ii1II1.id, ii1II1.taskType));
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let lI1111 = 0; lI1111 < llliIi.length; lI1111++) {
    i1lIli = llliIi[lI1111];
    if (i1lIli) {
      $.UserName = decodeURIComponent(i1lIli.match(/pt_pin=([^; ]+)(?=;?)/) && i1lIli.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lI1111 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IilllI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const Ilil1 of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + Ilil1);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let IliII1 = await llii1l($.yq_taskid, 1, Ilil1);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (IliII1.success) {
          if (IliII1.data.helpState === 1) $.log("助力成功！");else {
            if (IliII1.data.helpState === 0) $.log("自己不能助力自己！");else {
              if (IliII1.data.helpState === 2) $.log("助力过了！");else {
                if (IliII1.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else IliII1.data.helpState === 4 && $.log("这个B助力满了！");
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
})().catch(llIii => $.logErr(llIii)).finally(() => $.done());
function liIlii() {
  return new Promise(i1I1l => {
    $.post(iiIiII("body={\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}&appid=activities_platform", "apTaskList"), async (i1I1i, IIiiII, llIiI) => {
      $.log("=== 任务列表 start ===");
      try {
        if (i1I1i) {
          console.log("" + JSON.stringify(i1I1i));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          llIiI = JSON.parse(llIiI);
          $.taskList = llIiI.data;
          for (const Iii1I1 of $.taskList) {
            $.log(Iii1I1.taskTitle + " " + Iii1I1.taskDoTimes + "/" + Iii1I1.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (i11iI1) {
        $.logErr(i11iI1, IIiiII);
      } finally {
        i1I1l(llIiI);
      }
    });
  });
}
async function llii1l(Iii1II = "", llIlI = "", l1iIil = "") {
  const illllI = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1lIll,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + Iii1II + "\",\"inviteType\":\"" + llIlI + "\",\"inviterPin\":\"" + l1iIil + "\",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    II1II = await iIi11("4abce", illllI);
  return new Promise(lI1lIi => {
    $.post(Iili(II1II), async (illlll, IIIIiI, II1I1) => {
      try {
        illlll ? (console.log("" + JSON.stringify(illlll)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (II1I1 = JSON.parse(II1I1), $.joyBaseInfo = II1I1.data);
      } catch (ii1l1I) {
        $.logErr(ii1l1I, IIIIiI);
      } finally {
        lI1lIi(II1I1);
      }
    });
  });
}
async function liIlil(iiI1i1, ilIlII, iIiil1 = "", l1lI1i = "activities_platform") {
  const l1I1Il = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1lIll,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + ilIlII + "\",\"taskId\":" + iiI1i1 + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + iIiil1 + "\"}"
    },
    l1I1Ii = await iIi11("4abce", l1I1Il);
  return new Promise(iIiiil => {
    $.post(Iili(l1I1Ii), async (iIiiii, ilIlIi, ilIlIl) => {
      try {
        iIiiii ? (console.log("" + JSON.stringify(iIiiii)), console.log($.name + " API请求失败，请检查网路重试")) : ilIlIl = JSON.parse(ilIlIl);
      } catch (l1lI1I) {
        $.logErr(l1lI1I, ilIlIi);
      } finally {
        iIiiil(ilIlIl);
      }
    });
  });
}
async function llii1i(l1lI11, lI1iii, i11lIi, ll1ll1 = "activities_platform") {
  const lIilli = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1lIll,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + lI1iii + "\",\"taskId\":" + l1lI11 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + i11lIi + "\"}"
    },
    I1iiii = await iIi11("4abce", lIilli);
  return new Promise(lIilll => {
    $.post(Iili(I1iiii), async (ilI11i, ilI11l, li1I) => {
      try {
        ilI11i ? (console.log("" + JSON.stringify(ilI11i)), console.log($.name + " API请求失败，请检查网路重试")) : li1I = JSON.parse(li1I);
      } catch (ll1liI) {
        $.logErr(ll1liI, ilI11l);
      } finally {
        lIilll(li1I);
      }
    });
  });
}
async function ll11il(ll1li1, iIIlll) {
  const iiI1il = {
      "functionId": "apTaskDetail",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1lIll,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + iIIlll + "\",\"taskId\":" + ll1li1 + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    iiI1ii = await iIi11("4abce", iiI1il);
  return new Promise(llli1l => {
    $.post(Iili(iiI1ii), async (llli1i, iiI1l1, i11lI1) => {
      try {
        llli1i ? (console.log("" + JSON.stringify(llli1i)), console.log($.name + " API请求失败，请检查网路重试")) : (i11lI1 = JSON.parse(i11lI1), !i11lI1.success ? $.taskDetailList = [] : $.taskDetailList = i11lI1?.["data"]?.["taskItemList"]);
      } catch (Ii1l11) {
        $.logErr(Ii1l11, iiI1l1);
      } finally {
        !i11lI1.success ? llli1l([]) : llli1l(i11lI1.data.taskItemList);
      }
    });
  });
}
async function iI1lIl(i1111l, i1111i) {
  const Illli1 = {
      "functionId": "apTaskDrawAward",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1lIll,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + i1111i + "\",\"taskId\":" + i1111l + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    ilIIii = await iIi11("55276", Illli1);
  return new Promise(li1l => {
    $.post(Iili(ilIIii), async (iliiII, iiI1li, IIliii) => {
      try {
        iliiII ? (console.log("" + JSON.stringify(iliiII)), console.log($.name + " API请求失败，请检查网路重试")) : (IIliii = JSON.parse(IIliii), $.log("领取奖励"));
      } catch (i1111I) {
        $.logErr(i1111I, iiI1li);
      } finally {
        li1l(IIliii);
      }
    });
  });
}
function iiIiII(IliIl1, lIl1lI) {
  return {
    "url": "https://api.m.jd.com/client.action" + (lIl1lI ? "?functionId=" + lIl1lI : ""),
    "body": IliIl1,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": i1lIli
    }
  };
}
function Iili(lIiliI) {
  return {
    "url": "https://api.m.jd.com/?" + lIiliI,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": i1lIli
    }
  };
}
async function iIi11(Ii1IIi, Ii1IIl) {
  let ll1lli = {
      "appId": Ii1IIi,
      ...Ii1IIl,
      "ua": UA,
      "pin": $.UserName
    },
    ll1lll = {
      "url": "http://kr.kingran.cf/h5st",
      "body": JSON.stringify(ll1lli),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30000
    };
  return new Promise(async lIl1ll => {
    $.post(ll1lll, (Ii111, Ii1III, ilIIi1) => {
      let lilili = "";
      try {
        if (Ii111) {
          console.log("" + JSON.stringify(Ii111));
          console.log($.name + " geth5st API请求失败，请检查网路重试");
        } else {
          ilIIi1 = JSON.parse(ilIIi1);
          if (typeof ilIIi1 === "object" && ilIIi1 && ilIIi1.body) {
            if (ilIIi1.body) lilili = ilIIi1.body || "";
          } else ilIIi1.code == 400 ? console.log("\n" + ilIIi1.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (lilill) {
        $.logErr(lilill, Ii1III);
      } finally {
        lIl1ll(lilili);
      }
    });
  });
}
function Iil1(l1lI1) {
  l1lI1 = l1lI1 || 32;
  let lI1I1i = "abcdef0123456789",
    liI1II = lI1I1i.length,
    i1Iii1 = "";
  for (i = 0; i < l1lI1; i++) i1Iii1 += lI1I1i.charAt(Math.floor(Math.random() * liI1II));
  return i1Iii1;
}
function ll11lI(lilI1I) {
  if (typeof lilI1I == "string") try {
    return JSON.parse(lilI1I);
  } catch (lI1I1I) {
    return console.log(lI1I1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}