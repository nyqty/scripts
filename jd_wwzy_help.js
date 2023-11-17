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
var version_ = "jsjiami.com.v7";
const liliil = $.isNode() ? require("./jdCookie.js") : "",
  I1iil1 = $.isNode() ? require("./sendNotify") : "",
  lI1il1 = require("./function/jdCommon"),
  liliii = require("./function/h5st41.js");
let iIiilI = [],
  iIiiil = "";
if ($.isNode()) {
  Object.keys(liliil).forEach(lI1iil => {
    iIiilI.push(liliil[lI1iil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  iIiilI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Illll1($.getdata("CookiesJD") || "[]").map(lIilll => lIilll.cookie)].filter(iIiiiI => !!iIiiiI);
}
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let ilIlIi = Date.now();
message = "";
!(async () => {
  if (!iIiilI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let Il1Il = 0; Il1Il < iIiilI.length; Il1Il++) {
    iIiiil = iIiilI[Il1Il];
    if (iIiiil) {
      $.UserName = decodeURIComponent(iIiiil.match(/pt_pin=([^; ]+)(?=;?)/) && iIiiil.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Il1Il + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      $.UA = lI1il1.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await I1iil1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      if ($.isNode()) {
        if (!(process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false")) {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let l1lII = await ll1llI("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (!(l1lII.data && l1lII.data.helpState && l1lII.data.helpState === 1)) {
            if (!(l1lII.data && l1lII.data.helpState && l1lII.data.helpState === 3)) {
              if (l1lII.data && l1lII.data.helpState && l1lII.data.helpState === 2) {
                $.openIndex++;
              }
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await ll1llI();
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
      await l1lI1I();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const l1liiI of $.taskList) {
        if (l1liiI.taskType === "SIGN") {
          $.log("" + l1liiI.taskTitle);
          await i11lIl(l1liiI.id, l1liiI.taskType, undefined);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          $.log(l1liiI.taskTitle + " 领取奖励");
          await i11lIi(l1liiI.id, l1liiI.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
        if (l1liiI.taskType === "BROWSE_PRODUCT" || l1liiI.taskType === "BROWSE_CHANNEL" && l1liiI.taskLimitTimes !== 1) {
          let liI1I1 = await lI1iii(l1liiI.id, l1liiI.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let Ii11i = 0;
          if (liI1I1.length === 0) {
            let i1llI = await i11lIi(l1liiI.id, l1liiI.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            !i1llI.success && ($.log(l1liiI.taskTitle + "|" + l1liiI.taskShowTitle + " 领取完成!"), liI1I1 = await lI1iii(l1liiI.id, l1liiI.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          }
          while (l1liiI.taskLimitTimes - l1liiI.taskDoTimes >= 0) {
            if (liI1I1.length === 0) {
              $.log(l1liiI.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(l1liiI.taskTitle + " " + l1liiI.taskDoTimes + "/" + l1liiI.taskLimitTimes);
            let Ii1l1i = await i11lIl(l1liiI.id, l1liiI.taskType, liI1I1[Ii11i].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (Ii1l1i.code === 2005 || Ii1l1i.code === 0) {
              $.log(l1liiI.taskTitle + "|" + l1liiI.taskShowTitle + " 任务完成！");
            } else {
              $.log("任务失败！");
            }
            Ii11i++;
            l1liiI.taskDoTimes++;
            if (!liI1I1[Ii11i]) {
              break;
            }
          }
          for (let l1lIi = 0; l1lIi < l1liiI.taskLimitTimes; l1lIi++) {
            let IIlI1l = await i11lIi(l1liiI.id, l1liiI.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!IIlI1l.success) {
              $.log(l1liiI.taskTitle + "|" + l1liiI.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (l1liiI.taskType === "SHARE_INVITE") {
            $.yq_taskid = l1liiI.id;
            for (let IilIi = 0; IilIi < 5; IilIi++) {
              let Ili1Il = await i11lIi($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!Ili1Il.success) {
                break;
              }
              $.log("领取助力奖励成功！");
            }
          }
        }
        l1liiI.taskType === "BROWSE_CHANNEL" && l1liiI.taskLimitTimes === 1 && ($.log(l1liiI.taskTitle + "|" + l1liiI.taskShowTitle), await l1lI11(l1liiI.id, l1liiI.taskType, l1liiI.taskSourceUrl), $.log(l1liiI.taskTitle + "|" + l1liiI.taskShowTitle + " 领取奖励"), await i11lIi(l1liiI.id, l1liiI.taskType));
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let Ili1Ii = 0; Ili1Ii < iIiilI.length; Ili1Ii++) {
    iIiiil = iIiilI[Ili1Ii];
    if (iIiiil) {
      $.UserName = decodeURIComponent(iIiiil.match(/pt_pin=([^; ]+)(?=;?)/) && iIiiil.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Ili1Ii + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = lI1il1.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await I1iil1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const iilII1 of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + iilII1);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let iiiI11 = await ll1llI($.yq_taskid, 1, iilII1);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (iiiI11.success) {
          if (iiiI11.data.helpState === 1) {
            $.log("助力成功！");
          } else {
            if (iiiI11.data.helpState === 0) {
              $.log("自己不能助力自己！");
            } else {
              if (iiiI11.data.helpState === 2) {
                $.log("助力过了！");
              } else {
                if (iiiI11.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else {
                  iiiI11.data.helpState === 4 && $.log("这个B助力满了！");
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
})().catch(i1lil => $.logErr(i1lil)).finally(() => $.done());
function l1lI1I() {
  return new Promise(liI1Il => {
    $.post(ll1ll1("body={\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}&appid=activities_platform", "apTaskList"), async (iiiI1I, lilI11, Ili1II) => {
      $.log("=== 任务列表 start ===");
      try {
        if (iiiI1I) {
          console.log("" + JSON.stringify(iiiI1I));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          Ili1II = JSON.parse(Ili1II);
          $.taskList = Ili1II.data;
          for (const IiIi1 of $.taskList) {
            $.log(IiIi1.taskTitle + " " + IiIi1.taskDoTimes + "/" + IiIi1.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (i1IilI) {
        $.logErr(i1IilI, lilI11);
      } finally {
        liI1Il(Ili1II);
      }
    });
  });
}
async function ll1llI(III1I1 = "", ilI111 = "", I1IllI = "") {
  const iIIll1 = {
      functionId: "joyBaseInfo",
      clientVersion: "10.1.0",
      client: "ios",
      t: ilIlIi,
      appid: "activities_platform",
      body: "{\"taskId\":\"" + III1I1 + "\",\"inviteType\":\"" + ilI111 + "\",\"inviterPin\":\"" + I1IllI + "\",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    llIIII = await lIilli("4abce", iIIll1);
  return new Promise(i1Iill => {
    $.post(lilil1(llIIII), async (IiIiIi, llIIIl, IIlI1I) => {
      try {
        IiIiIi ? (console.log("" + JSON.stringify(IiIiIi)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (IIlI1I = JSON.parse(IIlI1I), $.joyBaseInfo = IIlI1I.data);
      } catch (IiIiIl) {
        $.logErr(IiIiIl, llIIIl);
      } finally {
        i1Iill(IIlI1I);
      }
    });
  });
}
async function i11lIl(I1Ilil, l1I1I1, I1Ilii = "", l1Iii = "activities_platform") {
  const III1Ii = {
      functionId: "apDoTask",
      clientVersion: "10.1.0",
      client: "ios",
      t: ilIlIi,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + l1I1I1 + "\",\"taskId\":" + I1Ilil + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"taskInsert\":true,\"itemId\":\"" + I1Ilii + "\"}"
    },
    III1Il = await lIilli("cd949", III1Ii);
  return new Promise(iIIlil => {
    $.post(lilil1(III1Il), async (iIIlii, llIII1, IiIiI) => {
      try {
        iIIlii ? (console.log("" + JSON.stringify(iIIlii)), console.log($.name + " API请求失败，请检查网路重试")) : IiIiI = JSON.parse(IiIiI);
      } catch (l1iiIl) {
        $.logErr(l1iiIl, llIII1);
      } finally {
        iIIlil(IiIiI);
      }
    });
  });
}
async function l1lI11(lIIi1i, liI11I, III1, l1IIl1 = "activities_platform") {
  const lIIi1l = {
      functionId: "apDoTask",
      clientVersion: "10.1.0",
      client: "ios",
      t: ilIlIi,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + liI11I + "\",\"taskId\":" + lIIi1i + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"itemId\":\"" + III1 + "\"}"
    },
    I1lI1i = await lIilli("cd949", lIIi1l);
  return new Promise(I1lI11 => {
    $.post(lilil1(I1lI1i), async (I1I1Ii, IiIl1, IIIl) => {
      try {
        I1I1Ii ? (console.log("" + JSON.stringify(I1I1Ii)), console.log($.name + " API请求失败，请检查网路重试")) : IIIl = JSON.parse(IIIl);
      } catch (l1IIll) {
        $.logErr(l1IIll, IiIl1);
      } finally {
        I1lI11(IIIl);
      }
    });
  });
}
async function lI1iii(illiii, IIIll1) {
  const liI11l = {
      functionId: "apTaskDetail",
      clientVersion: "10.1.0",
      client: "ios",
      t: ilIlIi,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + IIIll1 + "\",\"taskId\":" + illiii + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    l1l1i = await lIilli("cd949", liI11l);
  return new Promise(l1IIlI => {
    $.post(lilil1(l1l1i), async (illil1, IIIlii, iil11I) => {
      try {
        if (illil1) {
          console.log("" + JSON.stringify(illil1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          iil11I = JSON.parse(iil11I);
          if (!iil11I.success) {
            $.taskDetailList = [];
          } else {
            $.taskDetailList = iil11I?.["data"]?.["taskItemList"];
          }
        }
      } catch (I1I1I1) {
        $.logErr(I1I1I1, IIIlii);
      } finally {
        !iil11I.success ? l1IIlI([]) : l1IIlI(iil11I.data.taskItemList);
      }
    });
  });
}
async function i11lIi(llII1I, ilI1II) {
  const i11l1 = {
      functionId: "apTaskDrawAward",
      clientVersion: "10.1.0",
      client: "ios",
      t: ilIlIi,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + ilI1II + "\",\"taskId\":" + llII1I + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    IlllI = await lIilli("55276", i11l1);
  return new Promise(iii1l => {
    $.post(lilil1(IlllI), async (iil11l, IiIi1l, llII1i) => {
      try {
        iil11l ? (console.log("" + JSON.stringify(iil11l)), console.log($.name + " API请求失败，请检查网路重试")) : (llII1i = JSON.parse(llII1i), $.log("领取奖励"));
      } catch (illI1I) {
        $.logErr(illI1I, IiIi1l);
      } finally {
        iii1l(llII1i);
      }
    });
  });
}
function ll1ll1(ilI1Il, illI11) {
  return {
    url: "https://api.m.jd.com/client.action" + (illI11 ? "?functionId=" + illI11 : ""),
    body: ilI1Il,
    headers: {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "api.m.jd.com",
      Origin: "https://joypark.jd.com",
      Referer: "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      Cookie: iIiiil
    }
  };
}
function lilil1(ll11Il) {
  return {
    url: "https://api.m.jd.com/?" + ll11Il,
    headers: {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "api.m.jd.com",
      Origin: "https://joypark.jd.com",
      Referer: "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      Cookie: iIiiil
    }
  };
}
async function lIilli(Illl1, iii1I) {
  try {
    let IiIi1I = new liliii({
      appId: Illl1,
      appid: "activities_platform",
      clientVersion: iii1I?.["clientVersion"],
      client: iii1I?.["client"],
      pin: $.UserName,
      ua: $.UA,
      version: "4.1"
    });
    await IiIi1I.genAlgo();
    body = await IiIi1I.genUrlParams(iii1I.functionId, iii1I.body);
    return body;
  } catch (iillIi) {}
}
async function I1iiii(iii11, iliI1) {
  let lIiII = {
      searchParams: {
        ...iliI1,
        appId: iii11
      },
      pt_pin: $.UserName,
      client: iliI1?.["client"],
      clientVersion: iliI1?.["clientVersion"]
    },
    l1lii1 = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    ii1i1i = {
      url: "http://h5st.kingran.cf/api/h5st",
      body: JSON.stringify(lIiII),
      headers: l1lii1,
      timeout: 30000
    };
  return new Promise(async I1lI1l => {
    $.post(ii1i1i, (liiiIl, liIIiI, Iii1li) => {
      let iIl1i = "";
      try {
        if (liiiIl) {
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {
          Iii1li = JSON.parse(Iii1li);
          console.log(JSON.stringify(Iii1li));
          if (typeof Iii1li === "object" && Iii1li && Iii1li.body) {
            if (Iii1li.body) {
              iIl1i = Iii1li || "";
            }
          } else {
            Iii1li.code == 400 ? console.log("\n" + Iii1li.msg) : console.log("\n可能连接不上接口，请检查网络");
          }
        }
      } catch (i11Ill) {
        $.logErr(i11Ill, liIIiI);
      } finally {
        I1lI1l(iiI1iI(iIl1i));
      }
    });
  });
}
function iiI1iI(liIIl1, iIliiI = {}) {
  let I1lii1 = [],
    ilIIlI = iIliiI.connector || "&",
    liiiI1 = Object.keys(liIIl1);
  if (iIliiI.sort) {
    liiiI1 = liiiI1.sort();
  }
  for (let IliIiI of liiiI1) {
    let liiiII = liIIl1[IliIiI];
    if (liiiII && typeof liiiII === "object") {
      liiiII = JSON.stringify(liiiII);
    }
    if (liiiII && iIliiI.encode) {
      liiiII = encodeURIComponent(liiiII);
    }
    I1lii1.push(IliIiI + "=" + liiiII);
  }
  return I1lii1.join(ilIIlI);
}
function I1iiil(IIiiiI) {
  IIiiiI = IIiiiI || 32;
  let i11IlI = "abcdef0123456789",
    Ii1I1 = i11IlI.length,
    i11Il1 = "";
  for (i = 0; i < IIiiiI; i++) {
    i11Il1 += i11IlI.charAt(Math.floor(Math.random() * Ii1I1));
  }
  return i11Il1;
}
function Illll1(iIIIi) {
  if (typeof iIIIi == "string") {
    try {
      return JSON.parse(iIIIi);
    } catch (Ili11l) {
      console.log(Ili11l);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
var version_ = "jsjiami.com.v7";