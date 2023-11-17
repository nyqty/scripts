/*

脚本默认会帮我助力开工位，介意请添加变量HELP_JOYPARK，false为不助力
export HELP_JOYPARK=""

地址：https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw

运行频繁会403，请自行定时运行

============Quantumultx===============
[task_local]
#京东极简版-汪汪乐园助力
1 1 1 1 * jd_jj_wwly_help.js, tag=京东极简版-汪汪乐园助力, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('京东极简版-汪汪乐园助力');
var version_ = "jsjiami.com.v7";
const Iii1Il = $.isNode() ? require("./jdCookie.js") : "",
  i1l1I1 = $.isNode() ? require("./sendNotify") : "",
  llIl1 = require("./function/jdCommon"),
  l1iIiI = require("./function/h5st41.js");
let illlli = [],
  illlll = "";
if ($.isNode()) {
  Object.keys(Iii1Il).forEach(liliil => {
    illlli.push(Iii1Il[liliil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  illlli = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IllllI($.getdata("CookiesJD") || "[]").map(I1iil1 => I1iil1.cookie)].filter(lIillI => !!lIillI);
}
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let II1I1 = Date.now();
message = "";
!(async () => {
  if (!illlli[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let i1IiiI = 0; i1IiiI < illlli.length; i1IiiI++) {
    illlll = illlli[i1IiiI];
    if (illlll) {
      $.UserName = decodeURIComponent(illlll.match(/pt_pin=([^; ]+)(?=;?)/) && illlll.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1IiiI + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      $.UA = llIl1.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1l1I1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      if ($.isNode()) {
        if (!(process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false")) {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let lilI1l = await lI1lII("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (!(lilI1l.data && lilI1l.data.helpState && lilI1l.data.helpState === 1)) {
            if (!(lilI1l.data && lilI1l.data.helpState && lilI1l.data.helpState === 3)) {
              if (lilI1l.data && lilI1l.data.helpState && lilI1l.data.helpState === 2) {
                $.openIndex++;
              }
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await lI1lII();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.joyBaseInfo && $.joyBaseInfo.invitePin) {
        $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin);
        $.invitePinTaskList.push($.joyBaseInfo.invitePin);
      } else {
        $.log($.name + " - " + $.UserName + "  助力码: null");
        $.invitePinTaskList.push("");
        $.isLogin = false;
        $.log("服务端异常，尝试手动进入活动，入口：京东极简版-汪汪乐园");
        continue;
      }
      await ii1l1I();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const lilI1i of $.taskList) {
        lilI1i.taskType === "SIGN" && ($.log("" + lilI1i.taskTitle), await lIill1(lilI1i.id, lilI1i.taskType, undefined), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), $.log(lilI1i.taskTitle + " 领取奖励"), await iIiil1(lilI1i.id, lilI1i.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
        if (lilI1i.taskType === "BROWSE_PRODUCT" || lilI1i.taskType === "BROWSE_CHANNEL" && lilI1i.taskLimitTimes !== 1) {
          let Ii11i = await ilIlII(lilI1i.id, lilI1i.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let i1llI = 0;
          if (Ii11i.length === 0) {
            let iIIli1 = await iIiil1(lilI1i.id, lilI1i.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            !iIIli1.success && ($.log(lilI1i.taskTitle + "|" + lilI1i.taskShowTitle + " 领取完成!"), Ii11i = await ilIlII(lilI1i.id, lilI1i.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          }
          while (lilI1i.taskLimitTimes - lilI1i.taskDoTimes >= 0) {
            if (Ii11i.length === 0) {
              $.log(lilI1i.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(lilI1i.taskTitle + " " + lilI1i.taskDoTimes + "/" + lilI1i.taskLimitTimes);
            let Ii1l1i = await lIill1(lilI1i.id, lilI1i.taskType, Ii11i[i1llI].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            Ii1l1i.code === 2005 || Ii1l1i.code === 0 ? $.log(lilI1i.taskTitle + "|" + lilI1i.taskShowTitle + " 任务完成！") : $.log("任务失败！");
            i1llI++;
            lilI1i.taskDoTimes++;
            if (!Ii11i[i1llI]) {
              break;
            }
          }
          for (let l1lIi = 0; l1lIi < lilI1i.taskLimitTimes; l1lIi++) {
            let lI1I11 = await iIiil1(lilI1i.id, lilI1i.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!lI1I11.success) {
              $.log(lilI1i.taskTitle + "|" + lilI1i.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (lilI1i.taskType === "SHARE_INVITE") {
            $.yq_taskid = lilI1i.id;
            for (let Ili1Il = 0; Ili1Il < 5; Ili1Il++) {
              let i1liI = await iIiil1($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!i1liI.success) {
                break;
              }
              $.log("领取助力奖励成功！");
            }
          }
        }
        lilI1i.taskType === "BROWSE_CHANNEL" && lilI1i.taskLimitTimes === 1 && ($.log(lilI1i.taskTitle + "|" + lilI1i.taskShowTitle), await iiI1i1(lilI1i.id, lilI1i.taskType, lilI1i.taskSourceUrl), $.log(lilI1i.taskTitle + "|" + lilI1i.taskShowTitle + " 领取奖励"), await iIiil1(lilI1i.id, lilI1i.taskType));
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let iiiI1i = 0; iiiI1i < illlli.length; iiiI1i++) {
    illlll = illlli[iiiI1i];
    if (illlll) {
      $.UserName = decodeURIComponent(illlll.match(/pt_pin=([^; ]+)(?=;?)/) && illlll.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiiI1i + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = llIl1.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1l1I1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const Ii1l1I of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + Ii1l1I);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let iilII1 = await lI1lII($.yq_taskid, 1, Ii1l1I);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (iilII1.success) {
          if (iilII1.data.helpState === 1) {
            $.log("助力成功！");
          } else {
            if (iilII1.data.helpState === 0) {
              $.log("自己不能助力自己！");
            } else {
              if (iilII1.data.helpState === 2) {
                $.log("助力过了！");
              } else {
                if (iilII1.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else {
                  iilII1.data.helpState === 4 && $.log("这个B助力满了！");
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
})().catch(i1lii => $.logErr(i1lii)).finally(() => $.done());
function ii1l1I() {
  return new Promise(iiiI1I => {
    $.post(l1lI1i("body={\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}&appid=activities_platform", "apTaskList"), async (i1IilI, III1I1, ilI111) => {
      $.log("=== 任务列表 start ===");
      try {
        if (i1IilI) {
          console.log("" + JSON.stringify(i1IilI));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          ilI111 = JSON.parse(ilI111);
          $.taskList = ilI111.data;
          for (const IIlI11 of $.taskList) {
            $.log(IIlI11.taskTitle + " " + IIlI11.taskDoTimes + "/" + IIlI11.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (ilI11I) {
        $.logErr(ilI11I, III1I1);
      } finally {
        iiiI1I(ilI111);
      }
    });
  });
}
async function lI1lII(i1Iill = "", l1IiI = "", l1lill = "") {
  const iIIllI = {
      functionId: "joyBaseInfo",
      clientVersion: "10.1.0",
      client: "ios",
      t: II1I1,
      appid: "activities_platform",
      body: "{\"taskId\":\"" + i1Iill + "\",\"inviteType\":\"" + l1IiI + "\",\"inviterPin\":\"" + l1lill + "\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    I1Ill1 = await l1I1Il("4abce", iIIllI);
  return new Promise(I1Ilii => {
    $.post(l1lI1l(I1Ill1), async (III1Il, iIIliI, IiIil) => {
      try {
        III1Il ? (console.log("" + JSON.stringify(III1Il)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (IiIil = JSON.parse(IiIil), $.joyBaseInfo = IiIil.data);
      } catch (l1I1II) {
        $.logErr(l1I1II, iIIliI);
      } finally {
        I1Ilii(IiIil);
      }
    });
  });
}
async function lIill1(IiIiI1, iIIlii, llIII1 = "", IiIiI = "activities_platform") {
  const Illi1 = {
      functionId: "apDoTask",
      clientVersion: "10.1.0",
      client: "ios",
      t: II1I1,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + iIIlii + "\",\"taskId\":" + IiIiI1 + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\",\"taskInsert\":true,\"itemId\":\"" + llIII1 + "\"}"
    },
    l1iiIl = await l1I1Il("cd949", Illi1);
  return new Promise(IIIliI => {
    $.post(l1lI1l(l1iiIl), async (llIill, l1IIii, lIIi1I) => {
      try {
        llIill ? (console.log("" + JSON.stringify(llIill)), console.log($.name + " API请求失败，请检查网路重试")) : lIIi1I = JSON.parse(lIIi1I);
      } catch (I1lI1I) {
        $.logErr(I1lI1I, l1IIii);
      } finally {
        IIIliI(lIIi1I);
      }
    });
  });
}
async function iiI1i1(illill, IIIli1, I1lI11, I1I1Il = "activities_platform") {
  const iIlI1I = {
      functionId: "apDoTask",
      clientVersion: "10.1.0",
      client: "ios",
      t: II1I1,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + IIIli1 + "\",\"taskId\":" + illill + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\",\"itemId\":\"" + I1lI11 + "\"}"
    },
    I1I1Ii = await l1I1Il("cd949", iIlI1I);
  return new Promise(iII1I1 => {
    $.post(l1lI1l(I1I1Ii), async (iiiIIl, lIIi11, illiii) => {
      try {
        iiiIIl ? (console.log("" + JSON.stringify(iiiIIl)), console.log($.name + " API请求失败，请检查网路重试")) : illiii = JSON.parse(illiii);
      } catch (illiil) {
        $.logErr(illiil, lIIi11);
      } finally {
        iII1I1(illiii);
      }
    });
  });
}
async function ilIlII(i11ll, Ili11I) {
  const Illil = {
      functionId: "apTaskDetail",
      clientVersion: "10.1.0",
      client: "ios",
      t: II1I1,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + Ili11I + "\",\"taskId\":" + i11ll + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    iil11i = await l1I1Il("cd949", Illil);
  return new Promise(IiIli => {
    $.post(l1lI1l(iil11i), async (illil1, IIIlii, iil11I) => {
      try {
        illil1 ? (console.log("" + JSON.stringify(illil1)), console.log($.name + " API请求失败，请检查网路重试")) : (iil11I = JSON.parse(iil11I), !iil11I.success ? $.taskDetailList = [] : $.taskDetailList = iil11I?.["data"]?.["taskItemList"]);
      } catch (i11l1) {
        $.logErr(i11l1, IIIlii);
      } finally {
        !iil11I.success ? IiIli([]) : IiIli(iil11I.data.taskItemList);
      }
    });
  });
}
async function iIiil1(ii1i11, ll11II) {
  const Il1I = {
      functionId: "apTaskDrawAward",
      clientVersion: "10.1.0",
      client: "ios",
      t: II1I1,
      appid: "activities_platform",
      body: "{\"taskType\":\"" + ll11II + "\",\"taskId\":" + ii1i11 + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    iii1i = await l1I1Il("55276", Il1I);
  return new Promise(llII1i => {
    $.post(l1lI1l(iii1i), async (illI1I, ilI1Ii, ilI1Il) => {
      try {
        illI1I ? (console.log("" + JSON.stringify(illI1I)), console.log($.name + " API请求失败，请检查网路重试")) : (ilI1Il = JSON.parse(ilI1Il), $.log("领取奖励"));
      } catch (Illl1) {
        $.logErr(Illl1, ilI1Ii);
      } finally {
        llII1i(ilI1Il);
      }
    });
  });
}
function l1lI1i(ii1i1I, liIlI1) {
  return {
    url: "https://api.m.jd.com/client.action" + (liIlI1 ? "?functionId=" + liIlI1 : ""),
    body: ii1i1I,
    headers: {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "api.m.jd.com",
      Origin: "https://joypark.jd.com",
      Referer: "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      Cookie: illlll
    }
  };
}
function l1lI1l(IiIi1I) {
  return {
    url: "https://api.m.jd.com/?" + IiIi1I,
    headers: {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "api.m.jd.com",
      Origin: "https://joypark.jd.com",
      Referer: "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      Cookie: illlll
    }
  };
}
async function l1I1Il(iii11, iliI1) {
  try {
    let lIiII = new l1iIiI({
      appId: iii11,
      appid: "activities_platform",
      clientVersion: iliI1?.["clientVersion"],
      client: iliI1?.["client"],
      pin: $.UserName,
      ua: $.UA,
      version: "4.1"
    });
    await lIiII.genAlgo();
    body = await lIiII.genUrlParams(iliI1.functionId, iliI1.body);
    return body;
  } catch (l1lii1) {}
}
async function l1I1Ii(ii1i1i, IiIi11) {
  let iillII = {
      searchParams: {
        ...IiIi11,
        appId: ii1i1i
      },
      pt_pin: $.UserName,
      client: IiIi11?.["client"],
      clientVersion: IiIi11?.["clientVersion"]
    },
    Illli = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    i11il = {
      url: "http://h5st.kingran.cf/api/h5st",
      body: JSON.stringify(iillII),
      headers: Illli,
      timeout: 30000
    };
  return new Promise(async iiil1i => {
    $.post(i11il, (iIl1l, iIl1i, i11i1) => {
      let I1liiI = "";
      try {
        if (iIl1l) {
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {
          i11i1 = JSON.parse(i11i1);
          console.log(JSON.stringify(i11i1));
          if (typeof i11i1 === "object" && i11i1 && i11i1.body) {
            if (i11i1.body) {
              I1liiI = i11i1 || "";
            }
          } else {
            i11i1.code == 400 ? console.log("\n" + i11i1.msg) : console.log("\n可能连接不上接口，请检查网络");
          }
        }
      } catch (iIlii1) {
        $.logErr(iIlii1, iIl1i);
      } finally {
        iiil1i(IIlili(I1liiI));
      }
    });
  });
}
function IIlili(l1IlII, ii1i = {}) {
  let ii1l = [],
    iIl1I = ii1i.connector || "&",
    liIi = Object.keys(l1IlII);
  if (ii1i.sort) {
    liIi = liIi.sort();
  }
  for (let iliiIl of liIi) {
    let IliIii = l1IlII[iliiIl];
    if (IliIii && typeof IliIii === "object") {
      IliIii = JSON.stringify(IliIii);
    }
    if (IliIii && ii1i.encode) {
      IliIii = encodeURIComponent(IliIii);
    }
    ii1l.push(iliiIl + "=" + IliIii);
  }
  return ii1l.join(iIl1I);
}
function IIlill(liIIl1) {
  liIIl1 = liIIl1 || 32;
  let IIiilI = "abcdef0123456789",
    I1lii1 = IIiilI.length,
    ilIIlI = "";
  for (i = 0; i < liIIl1; i++) {
    ilIIlI += IIiilI.charAt(Math.floor(Math.random() * I1lii1));
  }
  return ilIIlI;
}
function IllllI(liII) {
  if (typeof liII == "string") {
    try {
      return JSON.parse(liII);
    } catch (ii11) {
      console.log(ii11);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
var version_ = "jsjiami.com.v7";