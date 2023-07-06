/*
特物Z_超级品牌殿堂
cron:18 0,18 * * *
18 0,18 * * * jd_superBrandz.js

 */
const Env = require('./utils/Env.js');
const $ = new Env('特物Z_超级品牌殿堂');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(ililII => {
    cookiesArr.push(jdCookieNode[ililII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(lI1II1 => lI1II1.cookie)].filter(i1ilII => !!i1ilII);
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
  $.UUID = getUUID("xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx");
  for (let lill1l = 0; lill1l < cookiesArr.length; lill1l++) {
    cookie = cookiesArr[lill1l];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lill1l + 1;
      $.isLogin = true;
      $.nickName = "";
      $.beans = 0;
      message = "";
      UA = await getUa();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await superBrandSecondFloorMainPage();
      await $.wait(parseInt(Math.random() * 500 + 500, 10));
    }
  }
})().catch(i1iiI => $.logErr(i1iiI)).finally(() => $.done());
async function superBrandSecondFloorMainPage() {
  let llI11I = Date.now();
  body = "{\"source\":\"hall_1111\"}";
  let Il1i11 = {
    "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandSecondFloorMainPage&t=" + llI11I + "&body=" + encodeURIComponent(body),
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "Cookie": cookie
    }
  };
  return new Promise(async I1llIl => {
    $.post(Il1i11, async (l1l1ii, Il1i1I, Ii1iii) => {
      try {
        if (l1l1ii) console.log(" API请求失败，请检查网路重试");else {
          let iili1 = JSON.parse(Ii1iii);
          if (iili1.data && iili1.code == "0") {
            let II11ii = iili1?.["data"]?.["bizCode"] || -1;
            if (II11ii == 0) {
              let Iil1iI = iili1?.["data"]?.["result"]?.["activityBaseInfo"];
              $.activityId = Iil1iI?.["activityId"];
              $.encryptProjectId = Iil1iI?.["encryptProjectId"];
              $.activityName = Iil1iI?.["activityName"];
              console.log($.activityName);
              await getid($.activityId);
            } else {
              let II11il = iili1?.["data"]?.["bizMsg"] || iili1?.["message"] || iili1?.["echo"] || "火爆";
              console.log("" + II11il);
              II11ii == "2001" && console.log("风控");
              II11il?.["includes"]("没有查询到活动信息") && console.log("没有查询到活动信息");
            }
          } else console.log("没有查询到活动信息");
        }
      } catch (I1il1I) {
        $.logErr(I1il1I, Il1i1I);
      } finally {
        I1llIl(Ii1iii);
      }
    });
  });
}
function getid(I11i11) {
  return new Promise(async lI1l11 => {
    const II11i = taskPostUrl("superBrandTaskList", "{\"source\":\"hall_1111\",\"activityId\":" + I11i11 + "}");
    $.post(II11i, async (ll1I1, Ii1ili, iI1Ii1) => {
      try {
        if (ll1I1) console.log($.name + " API请求失败，请检查网路重试");else {
          iI1Ii1 = JSON.parse(iI1Ii1);
          if (iI1Ii1.data && iI1Ii1.code === "0" && iI1Ii1.data.result) {
            $.result = iI1Ii1.data.result.taskList || [];
            for (const iiIi1I of $.result) {
              $.assignmentName = iiIi1I.assignmentName;
              $.assignmentType = iiIi1I.assignmentType;
              $.encryptAssignmentId = iiIi1I.encryptAssignmentId;
              console.log("去做任务" + $.assignmentName);
              await $.wait(parseInt(Math.random() * 500 + 500, 10));
              if ($.assignmentName == "浏览2场精彩在线活动") {
                $.conut = 2;
              }
              let IllIl1 = $.conut || 1;
              for (let ll1Il = 0; ll1Il < IllIl1; ll1Il++) {
                await doTask();
              }
            }
          } else lI1l11();
        }
      } catch (ill1II) {
        $.logErr(ill1II, Ii1ili);
      } finally {
        lI1l11();
      }
    });
  });
}
function doTask() {
  return new Promise(async IllIii => {
    let Ii1I11 = "{\"source\":\"hall_1111\",\"activityId\":" + $.activityId + ",\"encryptProjectId\":\"" + $.encryptProjectId + "\",\"completionFlag\":1,\"encryptAssignmentId\":\"" + $.encryptAssignmentId + "\",\"assignmentType\":" + $.assignmentType + ",\"actionType\":0}";
    await $.wait(parseInt(Math.random() * 500 + 500, 10));
    const IllIli = taskPostUrls("superBrandDoTask", Ii1I11);
    $.post(IllIli, async (ii1Ii, ii1Il, l1iII) => {
      try {
        if (ii1Ii) console.log($.name + " API请求失败，请检查网路重试");else {
          l1iII = JSON.parse(l1iII);
          if (l1iII && l1iII.code === "0") {
            if (l1iII.data.bizCode === "0") {
              $.results = l1iII.data.result.rewards || [];
              for (const i1llll of $.results) {
                krtype = i1llll.awardType;
                if (i1llll.awardType == 2) console.log("获得：" + i1llll.awardName);else {
                  if (i1llll.awardType == 3) {
                    console.log("获得：️" + i1llll.beanNum + " 豆子");
                  } else {
                    if (i1llll.awardType == 6) console.log("获得：" + i1llll.awardName);else {
                      if (i1llll.awardType == 5) {
                        console.log("获得：" + i1llll.awardName);
                      } else {
                        console.log("不知道获得了啥");
                        console.log(l1iII);
                      }
                    }
                  }
                }
              }
              console.log("任务成功啦~");
            } else console.log(l1iII.data.bizMsg);
            IllIii(l1iII.data.bizCode);
          } else console.log(l1iII);
        }
      } catch (I1I1lI) {
        $.logErr(I1I1lI, ii1Il);
      } finally {
        IllIii();
      }
    });
  });
}
function taskPostUrls(l1lli1, IiiIi) {
  const l1iIl1 = Date.now();
  return {
    "url": "https://api.m.jd.com/api?client=wh5&functionId=" + l1lli1 + "&appid=ProductZ4Brand&t=" + l1iIl1 + "&body=" + encodeURIComponent(IiiIi),
    "body": "",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "Cookie": cookie
    }
  };
}
function taskPostUrl(IIIii, iI111i) {
  const iI111l = Date.now();
  return {
    "url": "https://api.m.jd.com/?client=wh5&functionId=" + IIIii + "&appid=ProductZ4Brand&t=" + iI111l + "&body=" + encodeURIComponent(iI111i),
    "body": "",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "Cookie": cookie
    }
  };
}
function jsonParse(i1lIil) {
  if (typeof i1lIil == "string") {
    try {
      return JSON.parse(i1lIil);
    } catch (IiiII) {
      return console.log(IiiII), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function getUa() {
  for (var Iiii = "", llIl11 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IIIll = 0; IIIll < 16; IIIll++) {
    var I1I1il = Math.round(Math.random() * (llIl11.length - 1));
    Iiii += llIl11.substring(I1I1il, I1I1il + 1);
  }
  return uuid = Buffer.from(Iiii, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "ud": uuid,
      "sv": "CJCkDq==",
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;11.4.4;;;M/5.0;appBuild/168500;jdSupportDarkMode/1;ef/1;ep/" + ep + ";;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function getAuthorCodeList(IiiI) {
  return new Promise(iIi1l => {
    const l1lliI = {
      "url": IiiI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1lliI, async (iiIiI1, ili1Il, ili1Ii) => {
      try {
        if (iiIiI1) $.log(iiIiI1);else {
          if (ili1Ii) ili1Ii = JSON.parse(ili1Ii);
        }
      } catch (ll11I) {
        $.logErr(ll11I, ili1Il);
        ili1Ii = null;
      } finally {
        iIi1l(ili1Ii);
      }
    });
  });
}
function getUUID(iIi1I = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", liIIl = 0) {
  return iIi1I.replace(/[xy]/g, function (i1lIll) {
    var liIlii = Math.random() * 16 | 0,
      llii1l = i1lIll == "x" ? liIlii : liIlii & 3 | 8;
    if (liIIl) {
      uuid = llii1l.toString(36).toUpperCase();
    } else uuid = llii1l.toString(36);
    return uuid;
  });
}