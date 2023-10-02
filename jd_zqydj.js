/*
攒券赢大奖任务

cron "25 4,16 * * *" script-path=jd_zqydj.js, tag=攒券赢大奖任务

首页 右下角图标  赌运气，中奖会收到短信

一般是晚上 8点开奖

每期活动 id都会变动 

远程数据随缘更新 所以需要玩的请自行抓取

变量：
jd_zqydj_id  // 格式为 PbB1EhPXQd8FpIo3tu_dhg@2273  2个参数用@链接

 */
const Env=require('./utils/Env.js');
const $ = new Env('攒券赢大奖任务');
const IIiiIlii = $.isNode() ? require("./sendNotify") : "",
  lIl1lII1 = $.isNode() ? require("./jdCookie.js") : "",
  iiIl1iI1 = require("./function/h5st41.js");
let li1ii1i = process.env.jd_zqydj_id ? process.env.jd_zqydj_id : "",
  iiillIiI = Date.now(),
  lllI11iI = li1ii1i.split("@");
linkId = lllI11iI[0];
taskId = lllI11iI[1];
let I1I1llI = [],
  ll11IiIl = "",
  ilil1iil;
if ($.isNode()) {
  Object.keys(lIl1lII1).forEach(Iiii1IIi => {
    I1I1llI.push(lIl1lII1[Iiii1IIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1I1llI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1li11il($.getdata("CookiesJD") || "[]").map(I1iiIlIl => I1iiIlIl.cookie)].filter(IIi1l1l1 => !!IIi1l1l1);
!(async () => {
  if (!I1I1llI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  if (!linkId || !taskId) {
    $.log("请填写正确的环境变量");
    return;
  }
  authorCodeList = await IlIl1iII("http://code.kingran.cf/zqydj.json");
  newList = await IlIl1iII("http://code.kingran.cf/zqydjid.json");
  newList ? ($.newCode = newList[i11lIII1(0, newList.length)], console.log("❖ 最新变量：\n" + $.newCode + "\n")) : console.log("❖ 未获取到当期变量...\n");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[i11lIII1(0, authorCodeList.length)];else {
    let I111iI1I = ["0ONmpK1WVLg4iMBjYCUSmA", "ogzFtGc_gwzU7Pf2-0kq_9cbHfOxSKtvnMKNyqK6G80", "m6v23hKm2gJAG3LeporLkw", "zkLOrAi5vT56-1qMAxCLdA", "C0RqxK5D7f4eBBoiC405mA"];
    $.authorCode = I111iI1I[i11lIII1(0, I111iI1I.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.shareUuid = $.authorCode;
  console.log("当期活动：" + linkId);
  for (let iil1I1 = 0; iil1I1 < I1I1llI.length; iil1I1++) {
    if (I1I1llI[iil1I1]) {
      ll11IiIl = I1I1llI[iil1I1];
      $.UserName = decodeURIComponent(ll11IiIl.match(/pt_pin=([^; ]+)(?=;?)/) && ll11IiIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iil1I1 + 1;
      $.isLogin = true;
      $.nickName = "";
      ilil1iil = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IIiiIlii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + I1lIIlI1("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await lliIii1i();
      await lIl111Il();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
    if ($.hasEnd) break;
  }
})().catch(li1I1il1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + li1I1il1 + "!", "");
}).finally(() => {
  $.done();
});
async function lIl111Il() {
  $.nowcontinue = false;
  await lII1II1i();
  if ($.hasEnd) return;
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  $.nowcontinue && (await iiIil1Ii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await IIIIllll(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), $.index == 1 && ($.shareUuid = $.userCode));
}
function l1i1I1li(iI1ll1i) {
  try {
    if (typeof JSON.parse(iI1ll1i) == "object") return true;
  } catch (i11I1ill) {
    return console.log(i11I1ill), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function l1li11il(Iliii1II) {
  if (typeof Iliii1II == "string") try {
    return JSON.parse(Iliii1II);
  } catch (llll1Iii) {
    return console.log(llll1Iii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function lII1II1i() {
  return new Promise(async i1IiII11 => {
    const iIiliIl = {
      "functionId": "scarceGoodsLotteryHome",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iiillIiI,
      "body": {
        "linkId": linkId,
        "taskId": taskId,
        "inviter": $.shareUuid,
        "inJdApp": true
      }
    };
    $.h5st = await li1lIiIl("01d65", iIiliIl);
    let li11ii1i = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": ll11IiIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(li11ii1i, async (il1i1i, Iii1i11i, illIIli) => {
      try {
        if (il1i1i) console.log("" + JSON.stringify(il1i1i));else {
          illIIli = JSON.parse(illIIli);
          if (illIIli.code == 0) {
            $.nowcontinue = true;
            $.giftCode = illIIli?.["data"]?.["giftCode"];
            $.userCode = illIIli?.["data"]?.["userCode"];
            $.helpResult = illIIli?.["data"]?.["helpResult"];
            let liIiIIi = illIIli?.["data"]?.["prizeList"] || [],
              liiiIlil = illIIli?.["data"]?.["lotteryTime"];
            $.prizeList = "";
            for (let IIlli1l1 = 0; IIlli1l1 < liIiIIi.length; IIlli1l1++) {
              $.name = liIiIIi[IIlli1l1].name;
              $.prizeType = liIiIIi[IIlli1l1].type;
              $.originalPrice = liIiIIi[IIlli1l1].originalPrice;
              $.lotteryPrice = liIiIIi[IIlli1l1].lotteryPrice || 0;
              $.prizeValue = liIiIIi[IIlli1l1].prizeValue;
              $.count = liIiIIi[IIlli1l1].count || 0;
              IIlli1l1 != liIiIIi.length - 1 ? $.prizeList += $.name + "-" + $.lotteryPrice + "购买-数量：" + $.count + "\n" : $.prizeList += $.name + "-" + $.lotteryPrice + "购买-数量：" + $.count;
            }
            if (liiiIlil == null) {
              $.hasEnd = true;
              console.log("当期活动已经结束");
              return;
            }
            console.log("开奖时间：" + liiiIlil + "\n当前奖品汇总：\n" + $.prizeList);
          } else {
            if (illIIli.code == 402) {
              console.log("进入首页失败," + (illIIli?.["errMsg"] || ""));
            } else console.log("进入首页失败," + (illIIli?.["errMsg"] || ""));
          }
        }
      } catch (l1lII1I) {
        $.logErr(l1lII1I, Iii1i11i);
      } finally {
        i1IiII11();
      }
    });
  });
}
async function IIIIllll() {
  return new Promise(async IiiIiIII => {
    const ii11Iili = {
      "functionId": "scarceGoodsMyLotteryCode",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iiillIiI,
      "body": {
        "linkId": linkId
      }
    };
    $.h5st = await li1lIiIl("01d65", ii11Iili);
    let iilliIIi = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": ll11IiIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(iilliIIi, async (IiIll1Ii, iIiIil11, iiIilIII) => {
      try {
        if (IiIll1Ii) {
          console.log("" + JSON.stringify(IiIll1Ii));
        } else {
          iiIilIII = JSON.parse(iiIilIII);
          if (iiIilIII.code == 0) {
            let Ilill1iI = iiIilIII?.["data"];
            $.mycode = "";
            for (let llIilIiI = 0; llIilIiI < Ilill1iI.length; llIilIiI++) {
              $.code = Ilill1iI[llIilIiI].code;
              $.prizeType = Ilill1iI[llIilIiI].codeType;
              $.desc = Ilill1iI[llIilIiI].desc;
              llIilIiI != Ilill1iI.length - 1 ? $.mycode += $.code + "-" + $.desc + "\n" : $.mycode += $.code + "-" + $.desc;
            }
            console.log("\n当前卷码汇总( " + Ilill1iI.length + " 张)");
          } else {
            if (iiIilIII.code == 402) {
              console.log("进入首页失败," + (iiIilIII?.["errMsg"] || ""));
            } else {
              console.log("进入首页失败," + (iiIilIII?.["errMsg"] || ""));
            }
          }
        }
      } catch (il1l1Il1) {
        $.logErr(il1l1Il1, iIiIil11);
      } finally {
        IiiIiIII();
      }
    });
  });
}
async function iiIil1Ii() {
  let I1lll11I = {
    "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22:%22" + linkId + "%22%7D&t=" + iiillIiI + "&appid=activities_platform&client=ios&clientVersion=12.0.10",
    "headers": {
      "origin": "https://h5platform.jd.com",
      "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
      "User-Agent": $.UA,
      "Cookie": ll11IiIl,
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json, text/plain, */*"
    },
    "timeout": 20 * 1000
  };
  return new Promise(IIiilll1 => {
    $.get(I1lll11I, async (l11I1i1I, IIiiIIii, iI11llI1) => {
      try {
        if (l11I1i1I) $.log(l11I1i1I);else {
          iI11llI1 = JSON.parse(iI11llI1);
          if (iI11llI1?.["code"] == 0) {
            let i1Ilii = iI11llI1?.["data"] || [];
            for (let lil111il = 0; lil111il < i1Ilii.length; lil111il++) {
              $.taskTitle = i1Ilii[lil111il].taskTitle;
              $.apTaskListid = i1Ilii[lil111il].id;
              $.taskType = i1Ilii[lil111il].taskType;
              $.taskSourceUrl = i1Ilii[lil111il].taskSourceUrl;
              $.taskFinished = i1Ilii[lil111il].taskFinished;
              $.taskDoTimes = i1Ilii[lil111il].taskDoTimes;
              if (!$.taskFinished && $.taskType.includes("BROWSE_")) for (let IiiliI1l = 0; IiiliI1l < 1; IiiliI1l++) {
                console.log("去做 " + $.taskTitle);
                await I1Iii1Il($.taskType, $.apTaskListid, $.taskSourceUrl);
                await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
              }
            }
          } else console.log("查询任务失败," + (iI11llI1?.["errMsg"] || iI11llI1?.["msg"] || ""));
        }
      } catch (l11II11l) {
        $.log(l11II11l);
      } finally {
        IIiilll1();
      }
    });
  });
}
async function I1Iii1Il(IIill1Il, II1IlliI, l1IIlil) {
  return new Promise(async Ii1i1 => {
    const IIiii1II = {
      "functionId": "apsDoTask",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iiillIiI,
      "body": {
        "taskType": IIill1Il,
        "taskId": II1IlliI,
        "channel": 4,
        "checkVersion": true,
        "cityId": "",
        "provinceId": "",
        "countyId": "",
        "linkId": linkId,
        "itemId": l1IIlil
      }
    };
    $.h5st = await li1lIiIl("54ed7", IIiii1II);
    let I1li111l = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": ll11IiIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(I1li111l, async (ll11II1i, I1l1ili1, IIilil1l) => {
      try {
        if (ll11II1i) console.log("" + JSON.stringify(ll11II1i));else {
          IIilil1l = JSON.parse(IIilil1l);
          if (IIilil1l.code == 0) console.log("完成任务,获得一张奖券：" + IIilil1l?.["data"]?.["finishNeed"]), $.drawLotteryNum++;else IIilil1l.code == 402 ? console.log("完成任务失败," + (IIilil1l?.["errMsg"] || "")) : console.log("完成任务失败," + (IIilil1l?.["errMsg"] || ""));
        }
      } catch (iliiiill) {
        $.logErr(iliiiill, I1l1ili1);
      } finally {
        Ii1i1();
      }
    });
  });
}
function lIiIIIli(l1IiIIIi) {
  l1IiIIIi = l1IiIIIi || 32;
  let I11i11ll = "abcdef0123456789",
    I1ilI11i = I11i11ll.length,
    IIIil1li = "";
  for (i = 0; i < l1IiIIIi; i++) IIIil1li += I11i11ll.charAt(Math.floor(Math.random() * I1ilI11i));
  return IIIil1li;
}
async function li1lIiIl(iIIl11l1, liili1Il) {
  try {
    let IiIliII = new iiIl1iI1({
      "appId": iIIl11l1,
      "appid": "activities_platform",
      "clientVersion": liili1Il?.["clientVersion"],
      "client": liili1Il?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await IiIliII.genAlgo(), body = await IiIliII.genUrlParams(liili1Il.functionId, liili1Il.body), body;
  } catch (Iil1II) {}
}
function IlllI1i1(l1IiiIil) {
  return l1IiiIil.then(il1il111 => {
    return [null, il1il111];
  }).catch(l1Iil1l1 => [l1Iil1l1]);
}
function i1ii11i(IiIi11II, IiI1lIII = {}) {
  let l1I11Ill = [],
    IllI1iI = IiI1lIII.connector || "&",
    illIIl1l = Object.keys(IiIi11II);
  if (IiI1lIII.sort) illIIl1l = illIIl1l.sort();
  for (let l1lIIi1 of illIIl1l) {
    let IIliIii1 = IiIi11II[l1lIIi1];
    if (IIliIii1 && typeof IIliIii1 === "object") IIliIii1 = JSON.stringify(IIliIii1);
    if (IIliIii1 && IiI1lIII.encode) IIliIii1 = encodeURIComponent(IIliIii1);
    l1I11Ill.push(l1lIIi1 + "=" + IIliIii1);
  }
  return l1I11Ill.join(IllI1iI);
}
async function lliIii1i() {
  for (var i1lIii11 = "", l1llIIli = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IIIIIIl1 = 0; IIIIIIl1 < 16; IIIIIIl1++) {
    var i1l1 = Math.round(Math.random() * (l1llIIli.length - 1));
    i1lIii11 += l1llIIli.substring(i1l1, i1l1 + 1);
  }
  return uuid = Buffer.from(i1lIii11, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJGkEK==",
      "ud": uuid,
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function I1lIIlI1(i1I111l1 = "xxxxxxxxxxxxxxxxxxxx") {
  return i1I111l1.replace(/[xy]/g, function (iIIIi1ll) {
    var IlliIi1l = Math.random() * 10 | 0,
      llI1lllI = iIIIi1ll == "x" ? IlliIi1l : IlliIi1l & 3 | 8;
    return jdaid = llI1lllI.toString(), jdaid;
  });
}
function IlIl1iII(IilIiI1I) {
  return new Promise(i1I1iIII => {
    const ll1iIIll = {
      "url": "" + IilIiI1I,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ll1iIIll, async (illlll11, i11ii1li, iI11III) => {
      try {
        if (illlll11) {} else {
          iI11III ? iI11III = JSON.parse(iI11III) : console.log("未获取到数据,请重新运行");
        }
      } catch (lIl11IiI) {
        $.logErr(lIl11IiI, i11ii1li);
        iI11III = null;
      } finally {
        i1I1iIII(iI11III);
      }
    });
  });
}
function i11lIII1(l1liilll, i1IIlIl1) {
  return Math.floor(Math.random() * (i1IIlIl1 - l1liilll)) + l1liilll;
}