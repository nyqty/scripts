/*
天天领红包

cron "25 7 * * *" script-path=jd_ttlhb.js, tag=天天领红包

轮询提现变量：jd_ttlhb_num //轮询提现页数  一般无需填写

 */
const Env=require('./utils/Env.js');
const $ = new Env('天天领红包');
var version_ = "jsjiami.com.v7";
const Iillll = $.isNode() ? require("./sendNotify") : "",
  lllI1 = $.isNode() ? require("./jdCookie.js") : "",
  III11I = require("./function/h5st41.js");
let ll11i1 = "l-yLvQMhLwCqYy6_nXUBgg",
  ili1I1 = process.env.jd_ttlhb_num ? process.env.jd_ttlhb_num : "1",
  Iill = Date.now(),
  ili1II = [],
  liIllI = "",
  ll11i;
if ($.isNode()) {
  Object.keys(lllI1).forEach(lllIi => {
    ili1II.push(lllI1[lllIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  ili1II = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1i11($.getdata("CookiesJD") || "[]").map(lil1l => lil1l.cookie)].filter(lllIl => !!lllIl);
}
!(async () => {
  if (!ili1II[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IliiI = 0; IliiI < ili1II.length; IliiI++) {
    if (ili1II[IliiI]) {
      liIllI = ili1II[IliiI];
      $.UserName = decodeURIComponent(liIllI.match(/pt_pin=([^; ]+)(?=;?)/) && liIllI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IliiI + 1;
      $.isLogin = true;
      $.nickName = "";
      ll11i = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await Iillll.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + lil1i("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await I1I1ll();
      await iI1lI1();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(lI111i => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lI111i + "!", "");
}).finally(() => {
  $.done();
});
async function iI1lI1() {
  $.txhot = false;
  $.nowcontinue = false;
  await IlI1li();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  if ($.nowcontinue) {
    await ll11l();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    for (let iliIli = 0; iliIli < $.remainChance; iliIli++) {
      await IlI1ll();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    console.log("\n当前设置轮询提现页数：" + ili1I1);
    for (let ii1III = 0; ii1III < ili1I1; ii1III++) {
      $.pageNum = ii1III + 1;
      console.log("\n开始轮询提现" + $.pageNum + "页");
      await liIll1($.pageNum);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.txhot) {
        break;
      }
    }
  }
}
function I1I1li(l11iIl) {
  try {
    if (typeof JSON.parse(l11iIl) == "object") {
      return true;
    }
  } catch (l1iIi1) {
    console.log(l1iIi1);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function l1i11(i1I11) {
  if (typeof i1I11 == "string") {
    try {
      return JSON.parse(i1I11);
    } catch (llIiI) {
      console.log(llIiI);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function IlI1li() {
  return new Promise(async l1lI1l => {
    const I1iil1 = {
      functionId: "lhb4b_home",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: Iill,
      body: {
        linkId: ll11i1,
        inviter: ""
      }
    };
    $.h5st = await ll11iI("d5a39", I1iil1);
    let lIillI = {
      url: "https://api.m.jd.com/",
      body: "" + $.h5st,
      headers: {
        origin: "https://pro.m.jd.com",
        Referer: "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
        "User-Agent": $.UA,
        Cookie: liIllI,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(lIillI, async (lI1il1, liliii, iIiilI) => {
      try {
        if (lI1il1) {
          console.log("" + JSON.stringify(lI1il1));
        } else {
          iIiilI = JSON.parse(iIiilI);
          if (iIiilI.code == 0) {
            $.nowcontinue = true;
            let lIilll = iIiilI?.["data"]?.["ongoingOpenDuration"],
              ilI11l = iIiilI?.["data"]?.["totalAward"] || [];
            $.remainChance = iIiilI?.["data"]?.["remainChance"];
            $.prizeList = "";
            for (let li1I = 0; li1I < ilI11l.length; li1I++) {
              $.amount = ilI11l[li1I].amount;
              $.prizeType = ilI11l[li1I].prizeType;
              switch ($.prizeType) {
                case 1:
                  $.prizeType = "[优惠券]";
                  break;
                case 2:
                  $.prizeType = "[红包]";
                  break;
                case 3:
                  $.prizeType = "[实物]";
                  break;
                case 4:
                  $.prizeType = "[现金]";
                  break;
                default:
                  console.log($.prizeType);
                  return;
              }
              if (li1I != ilI11l.length - 1) {
                $.prizeList += $.prizeType + "：" + $.amount + "，";
              } else {
                $.prizeList += $.prizeType + "：" + $.amount;
              }
            }
            console.log("当前汇总：" + $.prizeList);
            if (iIiilI?.["data"]?.["ongoingOpenState"] == 1 || iIiilI?.["data"]?.["ongoingOpenState"] == 2) {
              console.log("可以进行" + lIilll + "秒无限开红包");
              $.lhb4b_open = true;
              while ($.lhb4b_open) {
                await IlI1ll();
                await $.wait(parseInt(Math.random() * 1000 + 500, 10));
              }
            }
          } else {
            if (iIiilI.code == 402) {
              console.log("进入首页失败," + (iIiilI?.["errMsg"] || ""));
            } else {
              console.log("进入首页失败," + (iIiilI?.["errMsg"] || ""));
            }
          }
        }
      } catch (iiI1ii) {
        $.logErr(iiI1ii, liliii);
      } finally {
        l1lI1l();
      }
    });
  });
}
async function IlI1ll() {
  return new Promise(async ll1lii => {
    const ilIlI1 = {
      functionId: "lhb4b_open",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: Iill,
      body: {
        linkId: ll11i1,
        openMode: 0
      }
    };
    $.h5st = await ll11iI("7af4f", ilIlI1);
    let I1Illi = {
      url: "https://api.m.jd.com/",
      body: "" + $.h5st,
      headers: {
        origin: "https://pro.m.jd.com",
        Referer: "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
        "User-Agent": $.UA,
        Cookie: liIllI,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(I1Illi, async (i11lI1, liliiI, ilIIiI) => {
      try {
        if (i11lI1) {
          console.log("" + JSON.stringify(i11lI1));
        } else {
          ilIIiI = JSON.parse(ilIIiI);
          if (ilIIiI.code == 0) {
            switch (ilIIiI?.["data"]?.["received"]?.["prizeType"]) {
              case 1:
                console.log("获得," + ilIIiI?.["data"]?.["received"]?.["prizeValue"] + "-" + ilIIiI?.["data"]?.["received"]?.["prizeDesc"] + "-" + ilIIiI?.["data"]?.["received"]?.["prizeEndTime"]);
                break;
              case 2:
                console.log("获得红包," + ilIIiI?.["data"]?.["received"]?.["prizeValue"] + "-" + ilIIiI?.["data"]?.["received"]?.["prizeDesc"] + "-" + ilIIiI?.["data"]?.["received"]?.["prizeEndTime"]);
                break;
              case 4:
                console.log("获得现金," + ilIIiI?.["data"]?.["received"]?.["prizeValue"] + "-" + ilIIiI?.["data"]?.["received"]?.["prizeDesc"] + "-" + ilIIiI?.["data"]?.["received"]?.["prizeEndTime"]);
                break;
              case null:
                console.log("运气不太好，什么都没有抽到...");
                break;
              default:
                console.log(ilIIiI?.["data"]?.["received"]?.["prizeType"]);
                return;
            }
          } else {
            ilIIiI.code == 402 ? console.log("开红包失败," + (ilIIiI?.["errMsg"] || "")) : (console.log("开红包失败," + (ilIIiI?.["errMsg"] || "")), $.lhb4b_open = false);
          }
        }
      } catch (lIl1il) {
        $.logErr(lIl1il, liliiI);
      } finally {
        ll1lii();
      }
    });
  });
}
async function ll11l() {
  const IIlii1 = {
    functionId: "apTaskList",
    appid: "activities_platform",
    clientVersion: "12.0.1",
    client: "apple",
    t: Iill,
    body: {
      linkId: ll11i1
    }
  };
  $.h5st = await ll11iI("d5a39", IIlii1);
  let iiI1lI = {
    url: "https://api.m.jd.com/",
    body: "" + $.h5st,
    headers: {
      origin: "https://pro.m.jd.com",
      Referer: "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
      "User-Agent": $.UA,
      Cookie: liIllI,
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json, text/plain, */*"
    },
    timeout: 20000
  };
  return new Promise(iiI1li => {
    $.post(iiI1lI, async (lIl1ll, Ii111, Ii1III) => {
      try {
        if (lIl1ll) {
          $.log(lIl1ll);
        } else {
          Ii1III = JSON.parse(Ii1III);
          if (Ii1III?.["code"] == 0) {
            let liI1II = Ii1III?.["data"] || [];
            for (let i1Iii1 = 0; i1Iii1 < liI1II.length; i1Iii1++) {
              $.taskTitle = liI1II[i1Iii1].taskTitle;
              $.apTaskListid = liI1II[i1Iii1].id;
              $.taskType = liI1II[i1Iii1].taskType;
              $.taskSourceUrl = liI1II[i1Iii1].taskSourceUrl;
              $.taskDoTimes = liI1II[i1Iii1].taskDoTimes;
              $.taskFinished = liI1II[i1Iii1].taskFinished;
              $.taskShowTitle = liI1II[i1Iii1].taskShowTitle;
              $.timeLimitPeriod = liI1II[i1Iii1].timeLimitPeriod;
              if ($.timeLimitPeriod == null) {
                if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                  for (let I1Ili1 = 0; I1Ili1 < 1; I1Ili1++) {
                    console.log("去做 " + $.taskTitle);
                    await III111($.taskType, $.apTaskListid, $.taskSourceUrl);
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                  }
                }
              }
            }
          } else {
            console.log("查询任务失败," + (Ii1III?.["errMsg"] || Ii1III?.["msg"] || ""));
          }
        }
      } catch (i1ll1) {
        $.log(i1ll1);
      } finally {
        iiI1li();
      }
    });
  });
}
async function III111(lI1I1l, Il1Il, i1IiiI) {
  return new Promise(async l1lIl => {
    const i1Iiil = {
      functionId: "apsDoTask",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: Iill,
      body: {
        taskType: lI1I1l,
        taskId: Il1Il,
        channel: 4,
        checkVersion: true,
        linkId: ll11i1,
        itemId: i1IiiI
      }
    };
    $.h5st = await ll11iI("54ed7", i1Iiil);
    let i1Iiii = {
      url: "https://api.m.jd.com/",
      body: "" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: liIllI,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(i1Iiii, async (l1lIi, l1lili, IIlI1l) => {
      try {
        if (l1lIi) {
          console.log("" + JSON.stringify(l1lIi));
        } else {
          IIlI1l = JSON.parse(IIlI1l);
          if (IIlI1l.code == 0) {
            $.remainChance++;
            console.log("完成任务,抽奖次数：" + $.remainChance);
          } else {
            IIlI1l.code == 402 ? console.log("完成任务失败," + (IIlI1l?.["errMsg"] || "")) : console.log("完成任务失败," + (IIlI1l?.["errMsg"] || ""));
          }
        }
      } catch (I1iII) {
        $.logErr(I1iII, l1lili);
      } finally {
        l1lIl();
      }
    });
  });
}
async function liIll1(iiiI1l) {
  return new Promise(async iiiI1I => {
    const Ili1II = {
        functionId: "superRedBagList",
        appid: "activities_platform",
        clientVersion: "12.0.1",
        client: "ios",
        body: {
          linkId: ll11i1,
          pageNum: iiiI1l,
          pageSize: 100,
          business: "lhb4b"
        }
      },
      ili1i = await ll11iI("f2b1d", Ili1II);
    let IiIi1 = {
      url: "https://api.m.jd.com/?" + ili1i,
      headers: {
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        origin: "https://pro.m.jd.com",
        "User-Agent": $.UA,
        Cookie: liIllI
      },
      timeout: 30000
    };
    $.get(IiIi1, async (l1Ii1, i1IilI, III1I1) => {
      try {
        if (l1Ii1) {
          console.log("" + JSON.stringify(l1Ii1));
        } else {
          III1I1 = JSON.parse(III1I1);
          if (III1I1) {
            if (III1I1.code == 0 && III1I1.success == true) {
              const iIIll1 = (III1I1.data.items || []).filter(llIIII => llIIII.prizeType === 4 && llIIII.state === 0 || llIIII.state === 2);
              for (let ilI11I of iIIll1) {
                console.log("天天领红包提现，去提现" + ilI11I.amount + "现金");
                await l1llli(ilI11I.id, ilI11I.poolBaseId, ilI11I.prizeGroupId, ilI11I.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("天天领红包提现失败，当月额度已满");
                  break;
                }
              }
            } else {
              console.log("天天领红包提现查询奖品：异常:" + JSON.stringify(III1I1));
            }
          }
        }
      } catch (l1IiI) {
        $.logErr(l1IiI, i1IilI);
      } finally {
        iiiI1I();
      }
    });
  });
}
async function l1llli(I1Ill1, ili11, IiIiIi, llIIIl) {
  return new Promise(async l1I1II => {
    const IiIiI1 = {
        linkId: ll11i1,
        businessSource: "NONE",
        base: {
          prizeType: 4,
          business: "lhb4b",
          id: I1Ill1,
          poolBaseId: ili11,
          prizeGroupId: IiIiIi,
          prizeBaseId: llIIIl
        }
      },
      iIIlii = {
        url: "https://api.m.jd.com",
        body: "functionId=apCashWithDraw&body=" + escape(JSON.stringify(IiIiI1)) + "&_t=" + +new Date() + "&appid=activities_platform",
        headers: {
          Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          origin: "https://pro.m.jd.com",
          "User-Agent": $.UA,
          Cookie: liIllI
        },
        timeout: 30000
      };
    $.post(iIIlii, async (l1IIii, lIIi1I, l1IIil) => {
      try {
        if (l1IIii) {
          console.log("" + JSON.stringify(l1IIii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (I1I1li(l1IIil)) {
            l1IIil = $.toObj(l1IIil);
            if (l1IIil.code === 0) {
              if (l1IIil.data.status === "310") {
                console.log("提现现金成功！");
              } else {
                console.log("提现现金：失败:" + l1IIil.data.message);
                if (l1IIil.data.message.includes("上限")) {
                  $.txhot = true;
                } else {
                  if (l1IIil.data.message.includes("已存在状态")) {
                    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
                    await l1llli(I1Ill1, ili11, IiIiIi, llIIIl);
                  }
                }
              }
            } else {
              console.log("提现现金：异常:" + JSON.stringify(l1IIil));
            }
          }
        }
      } catch (I1I1Il) {
        $.logErr(I1I1Il, lIIi1I);
      } finally {
        l1I1II(l1IIil);
      }
    });
  });
}
function iI1lII(l1l1I) {
  l1l1I = l1l1I || 32;
  let I1I1Ii = "abcdef0123456789",
    IiIl1 = I1I1Ii.length,
    IIIl = "";
  for (i = 0; i < l1l1I; i++) {
    IIIl += I1I1Ii.charAt(Math.floor(Math.random() * IiIl1));
  }
  return IIIl;
}
async function ll11iI(lIi1iI, l1IIll) {
  try {
    let IIIll1 = new III11I({
      appId: lIi1iI,
      appid: "activities_platform",
      clientVersion: l1IIll?.["clientVersion"],
      client: l1IIll?.["client"],
      pin: $.UserName,
      ua: $.UA,
      version: "4.1"
    });
    await IIIll1.genAlgo();
    body = await IIIll1.genUrlParams(l1IIll.functionId, l1IIll.body);
    return body;
  } catch (liI11l) {}
}
function l1i1I(l1l1i) {
  return l1l1i.then(I1I1II => {
    return [null, I1I1II];
  }).catch(i11ll => [i11ll]);
}
function l1llll(Ili11I, i11li = {}) {
  let iil11i = [],
    Ill1II = i11li.connector || "&",
    llIili = Object.keys(Ili11I);
  if (i11li.sort) {
    llIili = llIili.sort();
  }
  for (let iil111 of llIili) {
    let llIil1 = Ili11I[iil111];
    if (llIil1 && typeof llIil1 === "object") {
      llIil1 = JSON.stringify(llIil1);
    }
    if (llIil1 && i11li.encode) {
      llIil1 = encodeURIComponent(llIil1);
    }
    iil11i.push(iil111 + "=" + llIil1);
  }
  return iil11i.join(Ill1II);
}
async function I1I1ll() {
  for (var Ill1I1 = "", lIi1ii = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", lIi1il = 0; lIi1il < 16; lIi1il++) {
    var liI11i = Math.round(Math.random() * (lIi1ii.length - 1));
    Ill1I1 += lIi1ii.substring(liI11i, liI11i + 1);
  }
  uuid = Buffer.from(Ill1I1, "utf8").toString("base64");
  ep = encodeURIComponent(JSON.stringify({
    hdid: "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    ts: new Date().getTime(),
    ridx: -1,
    cipher: {
      sv: "CJGkEK==",
      ud: uuid,
      iad: ""
    },
    ciphertype: 5,
    version: "1.0.3",
    appname: "com.360buy.jdmobile"
  }));
  return "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function lil1i(llIilI = "xxxxxxxxxxxxxxxxxxxx") {
  return llIilI.replace(/[xy]/g, function (iliIl) {
    var ii1i11 = Math.random() * 10 | 0,
      ll11II = iliIl == "x" ? ii1i11 : ii1i11 & 3 | 8;
    jdaid = ll11II.toString();
    return jdaid;
  });
}
function liiiil(liIlII) {
  return new Promise(iii1i => {
    const iliIi = {
      url: "" + liIlII,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iliIi, async (llII1l, iil11l, IiIi1l) => {
      try {
        if (!llII1l) {
          IiIi1l ? IiIi1l = JSON.parse(IiIi1l) : console.log("未获取到数据,请重新运行");
        }
      } catch (llII1i) {
        $.logErr(llII1i, iil11l);
        IiIi1l = null;
      } finally {
        iii1i(IiIi1l);
      }
    });
  });
}
function IIIIli(ilI1Ii, ilI1Il) {
  return Math.floor(Math.random() * (ilI1Il - ilI1Ii)) + ilI1Ii;
}
var version_ = "jsjiami.com.v7";