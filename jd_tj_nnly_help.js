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
const I1ll1l = $.isNode() ? require("./jdCookie.js") : "",
  I1ll1i = $.isNode() ? require("./sendNotify") : "",
  lI1Ii1 = require("./function/jdCommon"),
  i1I11 = require("./utils/h5st.js");
let I1I1i1 = [],
  i1I1l = "";
if ($.isNode()) {
  Object.keys(I1ll1l).forEach(IIIIii => {
    I1I1i1.push(I1ll1l[IIIIii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1I1i1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ii1l11($.getdata("CookiesJD") || "[]").map(liiill => liiill.cookie)].filter(IIIIil => !!IIIIil);
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let i1I1i = Date.now();
message = "";
!(async () => {
  if (!I1I1i1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let i1111l = 0; i1111l < I1I1i1.length; i1111l++) {
    i1I1l = I1I1i1[i1111l];
    if (i1I1l) {
      $.UserName = decodeURIComponent(i1I1l.match(/pt_pin=([^; ]+)(?=;?)/) && i1I1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1111l + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      $.UA = lI1Ii1.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await I1ll1i.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      if ($.isNode()) {
        if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") {} else {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let Illli1 = await Ilill("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (Illli1.data && Illli1.data.helpState && Illli1.data.helpState === 1) {} else {
            if (Illli1.data && Illli1.data.helpState && Illli1.data.helpState === 3) {} else {
              if (Illli1.data && Illli1.data.helpState && Illli1.data.helpState === 2) $.openIndex++;else {}
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await Ilill();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.joyBaseInfo && $.joyBaseInfo.invitePin) $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin), $.invitePinTaskList.push($.joyBaseInfo.invitePin);else {
        $.log($.name + " - " + $.UserName + "  助力码: null");
        $.invitePinTaskList.push("");
        $.isLogin = false;
        $.log("服务端异常，尝试手动进入活动，入口：特价版-我的-汪汪乐园");
        continue;
      }
      await llIiI();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const ilIIii of $.taskList) {
        if (ilIIii.taskType === "SIGN") {
          $.log("" + ilIIii.taskTitle);
          await Ilili(ilIIii.id, ilIIii.taskType, undefined);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          $.log(ilIIii.taskTitle + " 领取奖励");
          await i11iI1(ilIIii.id, ilIIii.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
        if (ilIIii.taskType === "BROWSE_PRODUCT" || ilIIii.taskType === "BROWSE_CHANNEL" && ilIIii.taskLimitTimes !== 1) {
          let li1i = await Iii1I1(ilIIii.id, ilIIii.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let ilIIil = 6;
          if (li1i.length === 0) {
            let lIili1 = await i11iI1(ilIIii.id, ilIIii.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            !lIili1.success && ($.log(ilIIii.taskTitle + "|" + ilIIii.taskShowTitle + " 领取完成!"), li1i = await Iii1I1(ilIIii.id, ilIIii.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          }
          while (ilIIii.taskLimitTimes - ilIIii.taskDoTimes >= 0) {
            if (li1i.length === 0) {
              $.log(ilIIii.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(ilIIii.taskTitle + " " + ilIIii.taskDoTimes + "/" + ilIIii.taskLimitTimes);
            let iliiII = await Ilili(ilIIii.id, ilIIii.taskType, li1i[ilIIil].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            iliiII.code === 2005 || iliiII.code === 0 ? $.log(ilIIii.taskTitle + "|" + ilIIii.taskShowTitle + " 任务完成！") : $.log("任务失败！");
            ilIIil++;
            ilIIii.taskDoTimes++;
            if (!li1i[ilIIil]) break;
          }
          for (let IliIl1 = 0; IliIl1 < ilIIii.taskLimitTimes; IliIl1++) {
            let lIl1lI = await i11iI1(ilIIii.id, ilIIii.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!lIl1lI.success) {
              $.log(ilIIii.taskTitle + "|" + ilIIii.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (ilIIii.taskType === "SHARE_INVITE") {
            $.yq_taskid = ilIIii.id;
            for (let lIiliI = 0; lIiliI < 5; lIiliI++) {
              let iIiill = await i11iI1($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!iIiill.success) break;
              $.log("领取助力奖励成功！");
            }
          }
        }
        if (ilIIii.taskType === "BROWSE_CHANNEL" && ilIIii.taskLimitTimes === 1) {
          $.log(ilIIii.taskTitle + "|" + ilIIii.taskShowTitle);
          await I1ll1I(ilIIii.id, ilIIii.taskType, ilIIii.taskSourceUrl);
          $.log(ilIIii.taskTitle + "|" + ilIIii.taskShowTitle + " 领取奖励");
          await i11iI1(ilIIii.id, ilIIii.taskType);
        }
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let ll1lll = 0; ll1lll < I1I1i1.length; ll1lll++) {
    i1I1l = I1I1i1[ll1lll];
    if (i1I1l) {
      $.UserName = decodeURIComponent(i1I1l.match(/pt_pin=([^; ]+)(?=;?)/) && i1I1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ll1lll + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = lI1Ii1.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await I1ll1i.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const lililI of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + lililI);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let lI1ill = await Ilill($.yq_taskid, 1, lililI);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (lI1ill.success) {
          if (lI1ill.data.helpState === 1) $.log("助力成功！");else {
            if (lI1ill.data.helpState === 0) $.log("自己不能助力自己！");else {
              if (lI1ill.data.helpState === 2) $.log("助力过了！");else {
                if (lI1ill.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else lI1ill.data.helpState === 4 && $.log("这个B助力满了！");
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
})().catch(lIl1li => $.logErr(lIl1li)).finally(() => $.done());
function llIiI() {
  return new Promise(l111i => {
    $.post(Iii1II("body={\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}&appid=activities_platform", "apTaskList"), async (IliIll, iIiili, lilill) => {
      $.log("=== 任务列表 start ===");
      try {
        if (IliIll) console.log("" + JSON.stringify(IliIll)), console.log($.name + " API请求失败，请检查网路重试");else {
          lilill = JSON.parse(lilill);
          $.taskList = lilill.data;
          for (const i1Iii1 of $.taskList) {
            $.log(i1Iii1.taskTitle + " " + i1Iii1.taskDoTimes + "/" + i1Iii1.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (l1liii) {
        $.logErr(l1liii, iIiili);
      } finally {
        l111i(lilill);
      }
    });
  });
}
async function Ilill(lI1I1l = "", Il1Il = "", i1IiiI = "") {
  const l1lII = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1I1i,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + lI1I1l + "\",\"inviteType\":\"" + Il1Il + "\",\"inviterPin\":\"" + i1IiiI + "\",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    lilI1l = await l1iIil("4abce", l1lII);
  return new Promise(Ii1l1i => {
    $.post(llIlI(lilI1l), async (i1Iiii, l1lIi, l1lili) => {
      try {
        i1Iiii ? (console.log("" + JSON.stringify(i1Iiii)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (l1lili = JSON.parse(l1lili), $.joyBaseInfo = l1lili.data);
      } catch (lI1I11) {
        $.logErr(lI1I11, l1lIi);
      } finally {
        Ii1l1i(l1lili);
      }
    });
  });
}
async function Ilili(IIlI1i, iiiI1i, iiiI1l = "", Ili1Ii = "activities_platform") {
  const iilII1 = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1I1i,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + iiiI1i + "\",\"taskId\":" + IIlI1i + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + iiiI1l + "\"}"
    },
    iiiI11 = await l1iIil("4abce", iilII1);
  return new Promise(i1lii => {
    $.post(llIlI(iiiI11), async (lilI11, Ili1II, ili1i) => {
      try {
        lilI11 ? (console.log("" + JSON.stringify(lilI11)), console.log($.name + " API请求失败，请检查网路重试")) : ili1i = JSON.parse(ili1i);
      } catch (IiIi1) {
        $.logErr(IiIi1, Ili1II);
      } finally {
        i1lii(ili1i);
      }
    });
  });
}
async function I1ll1I(i1IilI, III1I1, ilI111, I1IllI = "activities_platform") {
  const iIIll1 = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1I1i,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + III1I1 + "\",\"taskId\":" + i1IilI + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + ilI111 + "\"}"
    },
    llIIII = await l1iIil("4abce", iIIll1);
  return new Promise(I1Ill1 => {
    $.post(llIlI(llIIII), async (l1I1I1, I1Ilii, l1Iii) => {
      try {
        l1I1I1 ? (console.log("" + JSON.stringify(l1I1I1)), console.log($.name + " API请求失败，请检查网路重试")) : l1Iii = JSON.parse(l1Iii);
      } catch (IiIii) {
        $.logErr(IiIii, I1Ilii);
      } finally {
        I1Ill1(l1Iii);
      }
    });
  });
}
async function Iii1I1(iill1l, IiIiII) {
  const l1Il1 = {
      "functionId": "apTaskDetail",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1I1i,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + IiIiII + "\",\"taskId\":" + iill1l + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    iill11 = await l1iIil("4abce", l1Il1);
  return new Promise(l1iiIl => {
    $.post(llIlI(iill11), async (l1IIii, lIIi1I, l1IIil) => {
      try {
        if (l1IIii) console.log("" + JSON.stringify(l1IIii)), console.log($.name + " API请求失败，请检查网路重试");else {
          l1IIil = JSON.parse(l1IIil);
          if (!l1IIil.success) {
            $.taskDetailList = [];
          } else {
            $.taskDetailList = l1IIil?.["data"]?.["taskItemList"];
          }
        }
      } catch (l1l11) {
        $.logErr(l1l11, lIIi1I);
      } finally {
        if (!l1IIil.success) {
          l1iiIl([]);
        } else l1iiIl(l1IIil.data.taskItemList);
      }
    });
  });
}
async function i11iI1(IIIl, IIIi) {
  const iII1I1 = {
      "functionId": "apTaskDrawAward",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": i1I1i,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + IIIi + "\",\"taskId\":" + IIIl + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    iiiIIi = await l1iIil("55276", iII1I1);
  return new Promise(liI11l => {
    $.post(llIlI(iiiIIi), async (l1l1i, I1I1II, i11ll) => {
      try {
        l1l1i ? (console.log("" + JSON.stringify(l1l1i)), console.log($.name + " API请求失败，请检查网路重试")) : (i11ll = JSON.parse(i11ll), $.log("领取奖励"));
      } catch (Ill1II) {
        $.logErr(Ill1II, I1I1II);
      } finally {
        liI11l(i11ll);
      }
    });
  });
}
function Iii1II(iIlI11, IIII) {
  return {
    "url": "https://api.m.jd.com/client.action" + (IIII ? "?functionId=" + IIII : ""),
    "body": iIlI11,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": i1I1l
    }
  };
}
function llIlI(iil111) {
  return {
    "url": "https://api.m.jd.com/?" + iil111,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": i1I1l
    }
  };
}
async function l1iIil(iiiIII, Ill1I1) {
  try {
    let illilI = new i1I11({
      "appId": iiiIII,
      "appid": "activities_platform",
      "clientVersion": Ill1I1?.["clientVersion"],
      "client": Ill1I1?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await illilI.genAlgo(), body = await illilI.genUrlParams(Ill1I1.functionId, Ill1I1.body), body;
  } catch (IiIli) {}
}
async function l1iIii(illil1, IIIlii) {
  let iII1II = {
      "searchParams": {
        ...IIIlii,
        "appId": illil1
      },
      "pt_pin": $.UserName,
      "client": IIIlii?.["client"],
      "clientVersion": IIIlii?.["clientVersion"]
    },
    IiIll = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    llIilI = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(iII1II),
      "headers": IiIll,
      "timeout": 30000
    };
  return new Promise(async liIlII => {
    $.post(llIilI, (IiIi1i, llII1l, iil11l) => {
      let IiIi1l = "";
      try {
        if (IiIi1i) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          iil11l = JSON.parse(iil11l);
          console.log(JSON.stringify(iil11l));
          if (typeof iil11l === "object" && iil11l && iil11l.body) {
            if (iil11l.body) IiIi1l = iil11l || "";
          } else {
            if (iil11l.code == 400) console.log("\n" + iil11l.msg);else {
              console.log("\n可能连接不上接口，请检查网络");
            }
          }
        }
      } catch (ll11Ii) {
        $.logErr(ll11Ii, llII1l);
      } finally {
        liIlII(illllI(IiIi1l));
      }
    });
  });
}
function illllI(ll11Il, i11lI = {}) {
  let iii1I = [],
    iliII = i11lI.connector || "&",
    ii1i1I = Object.keys(ll11Il);
  if (i11lI.sort) ii1i1I = ii1i1I.sort();
  for (let iii11 of ii1i1I) {
    let iliI1 = ll11Il[iii11];
    if (iliI1 && typeof iliI1 === "object") iliI1 = JSON.stringify(iliI1);
    if (iliI1 && i11lI.encode) iliI1 = encodeURIComponent(iliI1);
    iii1I.push(iii11 + "=" + iliI1);
  }
  return iii1I.join(iliII);
}
function II1II(i11iI) {
  i11iI = i11iI || 32;
  let l1lii1 = "abcdef0123456789",
    ii1i1i = l1lii1.length,
    IiIi11 = "";
  for (i = 0; i < i11iI; i++) IiIi11 += l1lii1.charAt(Math.floor(Math.random() * ii1i1i));
  return IiIi11;
}
function ii1l11(liIlIl) {
  if (typeof liIlIl == "string") {
    try {
      return JSON.parse(liIlIl);
    } catch (lIiIi) {
      return console.log(lIiIi), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}