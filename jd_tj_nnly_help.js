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
var version_ = "jsjiami.com.v7";
const l1iIi1 = $.isNode() ? require("./jdCookie.js") : "",
  i1I1I = $.isNode() ? require("./sendNotify") : "",
  llIii = require("./function/jdCommon"),
  IIiiI1 = require("./function/h5st41.js");
let IIIIi1 = [],
  ii1IIl = "";
if ($.isNode()) {
  Object.keys(l1iIi1).forEach(i11iI1 => {
    IIIIi1.push(l1iIi1[i11iI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  IIIIi1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Iii1I1($.getdata("CookiesJD") || "[]").map(Iii1II => Iii1II.cookie)].filter(llIlI => !!llIlI);
}
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let ii1IIi = Date.now();
message = "";
!(async () => {
  if (!IIIIi1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let ll1lll = 0; ll1lll < IIIIi1.length; ll1lll++) {
    ii1IIl = IIIIi1[ll1lll];
    if (ii1IIl) {
      $.UserName = decodeURIComponent(ii1IIl.match(/pt_pin=([^; ]+)(?=;?)/) && ii1IIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ll1lll + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      $.UA = llIii.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1I1I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      if ($.isNode()) {
        if (!(process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false")) {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let lililI = await i11iII("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (!(lililI.data && lililI.data.helpState && lililI.data.helpState === 1)) {
            if (!(lililI.data && lililI.data.helpState && lililI.data.helpState === 3)) {
              if (lililI.data && lililI.data.helpState && lililI.data.helpState === 2) {
                $.openIndex++;
              }
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await i11iII();
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
      await I1ll1i();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const lI1ili of $.taskList) {
        if (lI1ili.taskType === "SIGN") {
          $.log("" + lI1ili.taskTitle);
          await lI1Ii1(lI1ili.id, lI1ili.taskType, undefined);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          $.log(lI1ili.taskTitle + " 领取奖励");
          await i1I1l(lI1ili.id, lI1ili.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
        if (lI1ili.taskType === "BROWSE_PRODUCT" || lI1ili.taskType === "BROWSE_CHANNEL" && lI1ili.taskLimitTimes !== 1) {
          let Ii11I = await I1I1i1(lI1ili.id, lI1ili.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let I1iill = 6;
          if (Ii11I.length === 0) {
            let i1lli = await i1I1l(lI1ili.id, lI1ili.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            !i1lli.success && ($.log(lI1ili.taskTitle + "|" + lI1ili.taskShowTitle + " 领取完成!"), Ii11I = await I1I1i1(lI1ili.id, lI1ili.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          }
          while (lI1ili.taskLimitTimes - lI1ili.taskDoTimes >= 0) {
            if (Ii11I.length === 0) {
              $.log(lI1ili.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(lI1ili.taskTitle + " " + lI1ili.taskDoTimes + "/" + lI1ili.taskLimitTimes);
            let i11111 = await lI1Ii1(lI1ili.id, lI1ili.taskType, Ii11I[I1iill].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            i11111.code === 2005 || i11111.code === 0 ? $.log(lI1ili.taskTitle + "|" + lI1ili.taskShowTitle + " 任务完成！") : $.log("任务失败！");
            I1iill++;
            lI1ili.taskDoTimes++;
            if (!Ii11I[I1iill]) {
              break;
            }
          }
          for (let Il1I1 = 0; Il1I1 < lI1ili.taskLimitTimes; Il1I1++) {
            let lIilii = await i1I1l(lI1ili.id, lI1ili.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!lIilii.success) {
              $.log(lI1ili.taskTitle + "|" + lI1ili.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (lI1ili.taskType === "SHARE_INVITE") {
            $.yq_taskid = lI1ili.id;
            for (let l111i = 0; l111i < 5; l111i++) {
              let l111l = await i1I1l($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!l111l.success) {
                break;
              }
              $.log("领取助力奖励成功！");
            }
          }
        }
        lI1ili.taskType === "BROWSE_CHANNEL" && lI1ili.taskLimitTimes === 1 && ($.log(lI1ili.taskTitle + "|" + lI1ili.taskShowTitle), await i1I11(lI1ili.id, lI1ili.taskType, lI1ili.taskSourceUrl), $.log(lI1ili.taskTitle + "|" + lI1ili.taskShowTitle + " 领取奖励"), await i1I1l(lI1ili.id, lI1ili.taskType));
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let lI1ilI = 0; lI1ilI < IIIIi1.length; lI1ilI++) {
    ii1IIl = IIIIi1[lI1ilI];
    if (ii1IIl) {
      $.UserName = decodeURIComponent(ii1IIl.match(/pt_pin=([^; ]+)(?=;?)/) && ii1IIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lI1ilI + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = llIii.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1I1I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const IliIll of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + IliIll);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let iIiili = await i11iII($.yq_taskid, 1, IliIll);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (iIiili.success) {
          if (iIiili.data.helpState === 1) {
            $.log("助力成功！");
          } else {
            if (iIiili.data.helpState === 0) {
              $.log("自己不能助力自己！");
            } else {
              if (iIiili.data.helpState === 2) {
                $.log("助力过了！");
              } else {
                if (iIiili.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else {
                  iIiili.data.helpState === 4 && $.log("这个B助力满了！");
                }
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
})().catch(liI1II => $.logErr(liI1II)).finally(() => $.done());
function I1ll1i() {
  return new Promise(Il1Il => {
    $.post(i1I1i("body={\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}&appid=activities_platform", "apTaskList"), async (lilI1l, l1liiI, I1iI1) => {
      $.log("=== 任务列表 start ===");
      try {
        if (lilI1l) {
          console.log("" + JSON.stringify(lilI1l));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          I1iI1 = JSON.parse(I1iI1);
          $.taskList = I1iI1.data;
          for (const Il1Ii of $.taskList) {
            $.log(Il1Ii.taskTitle + " " + Il1Ii.taskDoTimes + "/" + Il1Ii.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (Ii11l) {
        $.logErr(Ii11l, l1liiI);
      } finally {
        Il1Il(I1iI1);
      }
    });
  });
}
async function i11iII(iIIli1 = "", Ii1l1i = "", l1lIl = "") {
  const i1Iiil = {
      functionId: "joyBaseInfo",
      clientVersion: "10.1.0",
      client: "ios",
      t: ii1IIi,
      appid: "activities_platform",
      body: "{\"taskId\":\"" + iIIli1 + "\",\"inviteType\":\"" + Ii1l1i + "\",\"inviterPin\":\"" + l1lIl + "\",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    i1Iiii = await llIiI("4abce", i1Iiil);
  return new Promise(iilIIi => {
    $.post(IIiiII(i1Iiii), async (iiiI1l, Ili1Ii, Ii1l1I) => {
      try {
        iiiI1l ? (console.log("" + JSON.stringify(iiiI1l)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (Ii1l1I = JSON.parse(Ii1l1I), $.joyBaseInfo = Ii1l1I.data);
      } catch (l1lil1) {
        $.logErr(l1lil1, Ili1Ii);
      } finally {
        iilIIi(Ii1l1I);
      }
    });
  });
}
async function lI1Ii1(IilII, ili1l, i1lii = "", iilIII = "activities_platform") {
  const I1iIi = {
      functionId: "apDoTask",
      clientVersion: "10.1.0",
      client: "ios",
      t: ii1IIi,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + ili1l + "\",\"taskId\":" + IilII + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + i1lii + "\"}"
    },
    iiiI1I = await llIiI("cd949", I1iIi);
  return new Promise(i1IilI => {
    $.post(IIiiII(iiiI1I), async (IIlI11, iIIll1, llIIII) => {
      try {
        IIlI11 ? (console.log("" + JSON.stringify(IIlI11)), console.log($.name + " API请求失败，请检查网路重试")) : llIIII = JSON.parse(llIIII);
      } catch (ilI11I) {
        $.logErr(ilI11I, iIIll1);
      } finally {
        i1IilI(llIIII);
      }
    });
  });
}
async function i1I11(ili1I, iilIIl, i1Iili, i1Iill = "activities_platform") {
  const l1lill = {
      functionId: "apDoTask",
      clientVersion: "10.1.0",
      client: "ios",
      t: ii1IIi,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + iilIIl + "\",\"taskId\":" + ili1I + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + i1Iili + "\"}"
    },
    i1li1 = await llIiI("cd949", l1lill);
  return new Promise(IiIiIi => {
    $.post(IIiiII(i1li1), async (IIlI1I, llIIIi, IiIiIl) => {
      try {
        IIlI1I ? (console.log("" + JSON.stringify(IIlI1I)), console.log($.name + " API请求失败，请检查网路重试")) : IiIiIl = JSON.parse(IiIiIl);
      } catch (I1Ilii) {
        $.logErr(I1Ilii, llIIIi);
      } finally {
        IiIiIi(IiIiIl);
      }
    });
  });
}
async function I1I1i1(l1Iii, l1Iil) {
  const III1Il = {
      functionId: "apTaskDetail",
      clientVersion: "10.1.0",
      client: "ios",
      t: ii1IIi,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + l1Iil + "\",\"taskId\":" + l1Iii + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    iIIliI = await llIiI("cd949", III1Il);
  return new Promise(III1II => {
    $.post(IIiiII(iIIliI), async (lIIi1i, liI11I, III1) => {
      try {
        lIIi1i ? (console.log("" + JSON.stringify(lIIi1i)), console.log($.name + " API请求失败，请检查网路重试")) : (III1 = JSON.parse(III1), !III1.success ? $.taskDetailList = [] : $.taskDetailList = III1?.["data"]?.["taskItemList"]);
      } catch (liI111) {
        $.logErr(liI111, liI11I);
      } finally {
        !III1.success ? III1II([]) : III1II(III1.data.taskItemList);
      }
    });
  });
}
async function i1I1l(l1IIii, lIIi1I) {
  const l1iiII = {
      functionId: "apTaskDrawAward",
      clientVersion: "10.1.0",
      client: "ios",
      t: ii1IIi,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + lIIi1I + "\",\"taskId\":" + l1IIii + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    I1lI1I = await llIiI("55276", l1iiII);
  return new Promise(I1lI11 => {
    $.post(IIiiII(I1lI1I), async (IIIl, IIIi, l1IIli) => {
      try {
        IIIl ? (console.log("" + JSON.stringify(IIIl)), console.log($.name + " API请求失败，请检查网路重试")) : (l1IIli = JSON.parse(l1IIli), $.log("领取奖励"));
      } catch (iiiIIl) {
        $.logErr(iiiIIl, IIIi);
      } finally {
        I1lI11(l1IIli);
      }
    });
  });
}
function i1I1i(illiii, IIIll1) {
  return {
    url: "https://api.m.jd.com/client.action" + (IIIll1 ? "?functionId=" + IIIll1 : ""),
    body: illiii,
    headers: {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "api.m.jd.com",
      Origin: "https://joypark.jd.com",
      Referer: "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      Cookie: ii1IIl
    }
  };
}
function IIiiII(liI11l) {
  return {
    url: "https://api.m.jd.com/?" + liI11l,
    headers: {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "api.m.jd.com",
      Origin: "https://joypark.jd.com",
      Referer: "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      Cookie: ii1IIl
    }
  };
}
async function llIiI(I1I1II, i11ll) {
  try {
    let i11li = new IIiiI1({
      appId: I1I1II,
      appid: "activities_platform",
      clientVersion: i11ll?.["clientVersion"],
      client: i11ll?.["client"],
      pin: $.UserName,
      ua: $.UA,
      version: "4.1"
    });
    await i11li.genAlgo();
    body = await i11li.genUrlParams(i11ll.functionId, i11ll.body);
    return body;
  } catch (Illil) {}
}
async function Ilill(iil11i, Ill1II) {
  let Illii = {
      searchParams: {
        ...Ill1II,
        appId: iil11i
      },
      pt_pin: $.UserName,
      client: Ill1II?.["client"],
      clientVersion: Ill1II?.["clientVersion"]
    },
    iIlI11 = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    IIII = {
      url: "http://h5st.kingran.cf/api/h5st",
      body: JSON.stringify(Illii),
      headers: iIlI11,
      timeout: 30000
    };
  return new Promise(async IIIlii => {
    $.post(IIII, (iil11I, iII1II, IiIll) => {
      let IlliI = "";
      try {
        if (iil11I) {
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {
          IiIll = JSON.parse(IiIll);
          console.log(JSON.stringify(IiIll));
          if (typeof IiIll === "object" && IiIll && IiIll.body) {
            if (IiIll.body) {
              IlliI = IiIll || "";
            }
          } else {
            IiIll.code == 400 ? console.log("\n" + IiIll.msg) : console.log("\n可能连接不上接口，请检查网络");
          }
        }
      } catch (Il11) {
        $.logErr(Il11, iII1II);
      } finally {
        IIIlii(Ilili(IlliI));
      }
    });
  });
}
function Ilili(llII1I, ilI1II = {}) {
  let i11l1 = [],
    IlllI = ilI1II.connector || "&",
    iliIl = Object.keys(llII1I);
  if (ilI1II.sort) {
    iliIl = iliIl.sort();
  }
  for (let iliIi of iliIl) {
    let iiil1I = llII1I[iliIi];
    if (iiil1I && typeof iiil1I === "object") {
      iiil1I = JSON.stringify(iiil1I);
    }
    if (iiil1I && ilI1II.encode) {
      iiil1I = encodeURIComponent(iiil1I);
    }
    i11l1.push(iliIi + "=" + iiil1I);
  }
  return i11l1.join(IlllI);
}
function I1ll1I(llII11) {
  llII11 = llII11 || 32;
  let lIiI1 = "abcdef0123456789",
    IiIi1i = lIiI1.length,
    llII1l = "";
  for (i = 0; i < llII11; i++) {
    llII1l += lIiI1.charAt(Math.floor(Math.random() * IiIi1i));
  }
  return llII1l;
}
function Iii1I1(iil11l) {
  if (typeof iil11l == "string") {
    try {
      return JSON.parse(iil11l);
    } catch (illI11) {
      console.log(illI11);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
var version_ = "jsjiami.com.v7";