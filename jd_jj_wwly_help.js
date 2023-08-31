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
const I1ll1I = $.isNode() ? require("./jdCookie.js") : "",
  Iii1I1 = $.isNode() ? require("./sendNotify") : "",
  Iii1II = require("./function/jdCommon"),
  llIlI = require("./utils/h5st.js");
let l1iIil = [],
  l1iIii = "";
if ($.isNode()) {
  Object.keys(I1ll1I).forEach(illlli => {
    l1iIil.push(I1ll1I[illlli]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1iIil = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1iIiI($.getdata("CookiesJD") || "[]").map(illlll => illlll.cookie)].filter(IIIIiI => !!IIIIiI);
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let II1II = Date.now();
message = "";
!(async () => {
  if (!l1iIil[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let Illlil = 0; Illlil < l1iIil.length; Illlil++) {
    l1iIii = l1iIil[Illlil];
    if (l1iIii) {
      $.UserName = decodeURIComponent(l1iIii.match(/pt_pin=([^; ]+)(?=;?)/) && l1iIii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Illlil + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      $.UA = Iii1II.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await Iii1I1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      if ($.isNode()) {
        if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") {} else {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let Illlii = await liiill("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (Illlii.data && Illlii.data.helpState && Illlii.data.helpState === 1) {} else {
            if (Illlii.data && Illlii.data.helpState && Illlii.data.helpState === 3) {} else {
              if (Illlii.data && Illlii.data.helpState && Illlii.data.helpState === 2) $.openIndex++;else {}
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await liiill();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.joyBaseInfo && $.joyBaseInfo.invitePin) $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin), $.invitePinTaskList.push($.joyBaseInfo.invitePin);else {
        $.log($.name + " - " + $.UserName + "  助力码: null");
        $.invitePinTaskList.push("");
        $.isLogin = false;
        $.log("服务端异常，尝试手动进入活动，入口：京东极简版-汪汪乐园");
        continue;
      }
      await IIIIii();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const I1iill of $.taskList) {
        if (I1iill.taskType === "SIGN") {
          $.log("" + I1iill.taskTitle);
          await IIIIil(I1iill.id, I1iill.taskType, undefined);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          $.log(I1iill.taskTitle + " 领取奖励");
          await I1ll11(I1iill.id, I1iill.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
        if (I1iill.taskType === "BROWSE_PRODUCT" || I1iill.taskType === "BROWSE_CHANNEL" && I1iill.taskLimitTimes !== 1) {
          let lIl1li = await liiili(I1iill.id, I1iill.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let Il1I1 = 0;
          if (lIl1li.length === 0) {
            let lIilii = await I1ll11(I1iill.id, I1iill.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            !lIilii.success && ($.log(I1iill.taskTitle + "|" + I1iill.taskShowTitle + " 领取完成!"), lIl1li = await liiili(I1iill.id, I1iill.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          }
          while (I1iill.taskLimitTimes - I1iill.taskDoTimes >= 0) {
            if (lIl1li.length === 0) {
              $.log(I1iill.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(I1iill.taskTitle + " " + I1iill.taskDoTimes + "/" + I1iill.taskLimitTimes);
            let lIilil = await IIIIil(I1iill.id, I1iill.taskType, lIl1li[Il1I1].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            lIilil.code === 2005 || lIilil.code === 0 ? $.log(I1iill.taskTitle + "|" + I1iill.taskShowTitle + " 任务完成！") : $.log("任务失败！");
            Il1I1++;
            I1iill.taskDoTimes++;
            if (!lIl1li[Il1I1]) {
              break;
            }
          }
          for (let Ii111 = 0; Ii111 < I1iill.taskLimitTimes; Ii111++) {
            let Ii1III = await I1ll11(I1iill.id, I1iill.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!Ii1III.success) {
              $.log(I1iill.taskTitle + "|" + I1iill.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (I1iill.taskType === "SHARE_INVITE") {
            $.yq_taskid = I1iill.id;
            for (let ilIIi1 = 0; ilIIi1 < 5; ilIIi1++) {
              let l111i = await I1ll11($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!l111i.success) break;
              $.log("领取助力奖励成功！");
            }
          }
        }
        I1iill.taskType === "BROWSE_CHANNEL" && I1iill.taskLimitTimes === 1 && ($.log(I1iill.taskTitle + "|" + I1iill.taskShowTitle), await lI1lIl(I1iill.id, I1iill.taskType, I1iill.taskSourceUrl), $.log(I1iill.taskTitle + "|" + I1iill.taskShowTitle + " 领取奖励"), await I1ll11(I1iill.id, I1iill.taskType));
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let lilili = 0; lilili < l1iIil.length; lilili++) {
    l1iIii = l1iIil[lilili];
    if (l1iIii) {
      $.UserName = decodeURIComponent(l1iIii.match(/pt_pin=([^; ]+)(?=;?)/) && l1iIii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lilili + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = Iii1II.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await Iii1I1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const iIiili of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + iIiili);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let lilill = await liiill($.yq_taskid, 1, iIiili);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (lilill.success) {
          if (lilill.data.helpState === 1) $.log("助力成功！");else {
            if (lilill.data.helpState === 0) $.log("自己不能助力自己！");else {
              if (lilill.data.helpState === 2) $.log("助力过了！");else {
                if (lilill.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else lilill.data.helpState === 4 && $.log("这个B助力满了！");
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
function IIIIii() {
  return new Promise(lilI1l => {
    $.post(lI1lIi("body={\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}&appid=activities_platform", "apTaskList"), async (liI1I1, Ii11i, i1llI) => {
      $.log("=== 任务列表 start ===");
      try {
        if (liI1I1) console.log("" + JSON.stringify(liI1I1)), console.log($.name + " API请求失败，请检查网路重试");else {
          i1llI = JSON.parse(i1llI);
          $.taskList = i1llI.data;
          for (const Ii1l1l of $.taskList) {
            $.log(Ii1l1l.taskTitle + " " + Ii1l1l.taskDoTimes + "/" + Ii1l1l.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (i1Iiii) {
        $.logErr(i1Iiii, Ii11i);
      } finally {
        lilI1l(i1llI);
      }
    });
  });
}
async function liiill(lI1I11 = "", IilIl = "", IilIi = "") {
  const i1liI = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": II1II,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + lI1I11 + "\",\"inviteType\":\"" + IilIl + "\",\"inviterPin\":\"" + IilIi + "\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    iilIIi = await Iii1Il("4abce", i1liI);
  return new Promise(i1Iil1 => {
    $.post(Iii1Ii(iilIIi), async (liI1Ii, l1lil1, i1lil) => {
      try {
        liI1Ii ? (console.log("" + JSON.stringify(liI1Ii)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (i1lil = JSON.parse(i1lil), $.joyBaseInfo = i1lil.data);
      } catch (IilII) {
        $.logErr(IilII, l1lil1);
      } finally {
        i1Iil1(i1lil);
      }
    });
  });
}
async function IIIIil(i1lii, iilIII, liI1Il = "", I1iIi = "activities_platform") {
  const lilI11 = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": II1II,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + iilIII + "\",\"taskId\":" + i1lii + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\",\"taskInsert\":true,\"itemId\":\"" + liI1Il + "\"}"
    },
    Ili1II = await Iii1Il("4abce", lilI11);
  return new Promise(l1IiI => {
    $.post(Iii1Ii(Ili1II), async (I1Ilil, l1I1I1, I1Ilii) => {
      try {
        if (I1Ilil) {
          console.log("" + JSON.stringify(I1Ilil));
          console.log($.name + " API请求失败，请检查网路重试");
        } else I1Ilii = JSON.parse(I1Ilii);
      } catch (III1Il) {
        $.logErr(III1Il, l1I1I1);
      } finally {
        l1IiI(I1Ilii);
      }
    });
  });
}
async function lI1lIl(IiIii, iill1l, IiIiII, iill1i = "activities_platform") {
  const iill11 = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": II1II,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + iill1l + "\",\"taskId\":" + IiIii + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\",\"itemId\":\"" + IiIiII + "\"}"
    },
    I1IliI = await Iii1Il("4abce", iill11);
  return new Promise(lIIi1l => {
    $.post(Iii1Ii(I1IliI), async (IIIli1, I1lI11, I1I1Il) => {
      try {
        IIIli1 ? (console.log("" + JSON.stringify(IIIli1)), console.log($.name + " API请求失败，请检查网路重试")) : I1I1Il = JSON.parse(I1I1Il);
      } catch (l1l1I) {
        $.logErr(l1l1I, I1lI11);
      } finally {
        lIIi1l(I1I1Il);
      }
    });
  });
}
async function liiili(I1I1Ii, IiIl1) {
  const IIIi = {
      "functionId": "apTaskDetail",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": II1II,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + IiIl1 + "\",\"taskId\":" + I1I1Ii + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    l1IIli = await Iii1Il("4abce", IIIi);
  return new Promise(lIIi11 => {
    $.post(Iii1Ii(l1IIli), async (liI11l, l1l1i, I1I1II) => {
      try {
        liI11l ? (console.log("" + JSON.stringify(liI11l)), console.log($.name + " API请求失败，请检查网路重试")) : (I1I1II = JSON.parse(I1I1II), !I1I1II.success ? $.taskDetailList = [] : $.taskDetailList = I1I1II?.["data"]?.["taskItemList"]);
      } catch (i11ll) {
        $.logErr(i11ll, l1l1i);
      } finally {
        !I1I1II.success ? lIIi11([]) : lIIi11(I1I1II.data.taskItemList);
      }
    });
  });
}
async function I1ll11(Ili11I, i11li) {
  const iil11i = {
      "functionId": "apTaskDrawAward",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": II1II,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + i11li + "\",\"taskId\":" + Ili11I + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    Ill1II = await Iii1Il("55276", iil11i);
  return new Promise(l1IIlI => {
    $.post(Iii1Ii(Ill1II), async (l1l1l, illilI, IiIli) => {
      try {
        l1l1l ? (console.log("" + JSON.stringify(l1l1l)), console.log($.name + " API请求失败，请检查网路重试")) : (IiIli = JSON.parse(IiIli), $.log("领取奖励"));
      } catch (IiIll) {
        $.logErr(IiIll, illilI);
      } finally {
        l1IIlI(IiIli);
      }
    });
  });
}
function lI1lIi(IIIlil, Ili111) {
  return {
    "url": "https://api.m.jd.com/client.action" + (Ili111 ? "?functionId=" + Ili111 : ""),
    "body": IIIlil,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": l1iIii
    }
  };
}
function Iii1Ii(iiil11) {
  return {
    "url": "https://api.m.jd.com/?" + iiil11,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": l1iIii
    }
  };
}
async function Iii1Il(ilI1II, iillI1) {
  try {
    let IlllI = new llIlI({
      "appId": ilI1II,
      "appid": "activities_platform",
      "clientVersion": iillI1?.["clientVersion"],
      "client": iillI1?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await IlllI.genAlgo(), body = await IlllI.genUrlParams(iillI1.functionId, iillI1.body), body;
  } catch (iliIl) {}
}
async function i1l1I1(ii1i11, ll11II) {
  let Il1I = {
      "searchParams": {
        ...ll11II,
        "appId": ii1i11
      },
      "pt_pin": $.UserName,
      "client": ll11II?.["client"],
      "clientVersion": ll11II?.["clientVersion"]
    },
    iii1i = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    iii1l = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(Il1I),
      "headers": iii1i,
      "timeout": 30000
    };
  return new Promise(async illI11 => {
    $.post(iii1l, (ll11Ii, ll11Il, i11lI) => {
      let iii1I = "";
      try {
        if (ll11Ii) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          i11lI = JSON.parse(i11lI);
          console.log(JSON.stringify(i11lI));
          if (typeof i11lI === "object" && i11lI && i11lI.body) {
            if (i11lI.body) iii1I = i11lI || "";
          } else i11lI.code == 400 ? console.log("\n" + i11lI.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (iillIl) {
        $.logErr(iillIl, ll11Il);
      } finally {
        illI11(lI1lI1(iii1I));
      }
    });
  });
}
function lI1lI1(iliI1, i11iI = {}) {
  let l1lii1 = [],
    ii1i1i = i11iI.connector || "&",
    IiIi11 = Object.keys(iliI1);
  if (i11iI.sort) IiIi11 = IiIi11.sort();
  for (let liIlIl of IiIi11) {
    let I1lI1l = iliI1[liIlIl];
    if (I1lI1l && typeof I1lI1l === "object") I1lI1l = JSON.stringify(I1lI1l);
    if (I1lI1l && i11iI.encode) I1lI1l = encodeURIComponent(I1lI1l);
    l1lii1.push(liIlIl + "=" + I1lI1l);
  }
  return l1lii1.join(ii1i1i);
}
function llIl1(i11ii) {
  i11ii = i11ii || 32;
  let Il1i = "abcdef0123456789",
    lIiIl = Il1i.length,
    iiil1l = "";
  for (i = 0; i < i11ii; i++) iiil1l += Il1i.charAt(Math.floor(Math.random() * lIiIl));
  return iiil1l;
}
function l1iIiI(iIliil) {
  if (typeof iIliil == "string") {
    try {
      return JSON.parse(iIliil);
    } catch (liiiIi) {
      return console.log(liiiIi), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}