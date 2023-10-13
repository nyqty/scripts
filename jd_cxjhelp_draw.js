/*
#抽现金抽奖提现

轮询提现变量：jd_cxjhelp_num //轮询提现页数

兑换红包变量：
export jd_cxjhelp_tjdh="true" // 特价抽现金兑换红包，默认关闭
export jd_cxjhelp_jddh="true" // 京东转赚红包兑换红包，默认关闭

注意：轮询页数也大，越容易403，请谨慎填写

更新提现失败重试
更新抽奖火爆重试（一直火爆一直重试）
更新统计
更新转赚红包 上限兑换红包
更新单独兑换红包变量，避免兑换失败一直请求
更新此次活动到期时间
更新京东版提现金

[task_local]
#抽现金抽奖提现
11 11 11 11 * jd_cxjhelp_draw.js, tag=抽现金抽奖提现, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/

const Env=require('./utils/Env.js');
const $ = new Env("抽现金抽奖提现");
const IIiliI1 = $.isNode() ? require("./jdCookie") : "",
  ililili1 = require("./function/h5st41.js"),
  il1Ili11 = require("./function/jdCommon");
let Il111l = [],
  ll1i1lli = "";
$.krtyhot = false;
let liIIlll = ["3orGfh1YkwNLksxOcN8zWQ", "Wvzc_VpNTlSkiQdHT8r7QA"],
  iIlIlIII = ["京东转赚红包", "特价抽现金"],
  Il11iill = process.env.jd_cxjhelp_tjdh ? process.env.jd_cxjhelp_tjdh : "false",
  I1iil = process.env.jd_cxjhelp_jddh ? process.env.jd_cxjhelp_jddh : "false",
  liIIIl11 = "",
  l1ilii1i = process.env.jd_cxjhelp_num ? process.env.jd_cxjhelp_num : "1";
if ($.isNode()) {
  Object.keys(IIiliI1).forEach(ii11Ii1 => {
    Il111l.push(IIiliI1[ii11Ii1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Il111l = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIlilI($.getdata("CookiesJD") || "[]").map(liii1II => liii1II.cookie)].filter(I1i1Ii1l => !!I1i1Ii1l);
!(async () => {
  if (!Il111l[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前设置特价兑换红包：" + Il11iill);
  console.log("当前设置转赚兑换红包：" + I1iil);
  for (let iIi1Ii1l = 0; iIi1Ii1l < Il111l.length; iIi1Ii1l++) {
    if (Il111l[iIi1Ii1l]) {
      ll1i1lli = Il111l[iIi1Ii1l];
      $.UserName = decodeURIComponent(ll1i1lli.match(/pt_pin=([^; ]+)(?=;?)/) && ll1i1lli.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIi1Ii1l + 1;
      $.canUseCoinAmount = 0;
      console.log("");
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.UA = il1Ili11.genUA($.UserName);
      for (let lllIIllI = 0; lllIIllI < liIIlll.length; lllIIllI++) {
        liIIIl11 = liIIlll[lllIIllI];
        appName = iIlIlIII[lllIIllI];
        console.log("\n开始第" + (lllIIllI + 1) + "个活动：" + appName + "\n");
        await liii1ilI();
        await $.wait(2000);
      }
    }
  }
})().catch(Il11iII => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Il11iII + "!", "");
}).finally(() => {
  $.done();
});
async function liii1ilI() {
  $.txhot = false;
  $.inviteFissionReceivehot = false;
  $.hbnums = 0;
  $.xjnums = 0;
  await l11lllli();
  if ($.prizeNum > 0) for (m = 1; $.prizeNum--; m++) {
    console.log("进行第" + m + "次抽奖");
    await I1iiIlii();
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  }
  console.log("\n当前设置轮询提现页数：" + l1ilii1i);
  for (let I1IIIl = 0; I1IIIl < l1ilii1i; I1IIIl++) {
    $.pageNum = I1IIIl + 1;
    console.log("\n开始轮询提现" + $.pageNum + "页");
    await lIii($.pageNum);
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    if ($.txhot) break;
  }
}
async function I1iiIlii() {
  return new Promise(async l11ii1 => {
    let IIillI = {
      "ts": Date.now(),
      "ridx": -1,
      "hdid": ll1iiI(43) + "=",
      "cipher": {},
      "appname": "wegame",
      "version": "1.0.0",
      "ciphertype": 5
    };
    const ii1iIIil = {
        "functionId": "inviteFissionDrawPrize",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": liIIIl11,
          "lbs": JSON.stringify(IIillI)
        }
      },
      i1iIi1Ii = await iI1i1i11("c02c6", ii1iIIil);
    let Iiilii11 = {
      "url": "https://api.m.jd.com/api?functionId=inviteFissionDrawPrize&" + i1iIi1Ii,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1i1lli
      },
      "timeout": 30 * 1000
    };
    $.get(Iiilii11, async (Ill1Iili, i11il1l, I1i11lii) => {
      try {
        if (Ill1Iili) console.log("" + JSON.stringify(Ill1Iili));else {
          I1i11lii = JSON.parse(I1i11lii);
          if (I1i11lii) {
            if (I1i11lii.code == 0 && I1i11lii.success == true) {
              if (I1i11lii.data) {
                if (I1i11lii?.["data"]?.["prizeType"] == 4) $.xjprizeValue = I1i11lii?.["data"]?.["prizeValue"] || 0, $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100, $.xjnums = ii1iliIl($.xjnum), console.log("抽中现金：" + $.xjprizeValue + " 🎁 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");else {
                  if (I1i11lii?.["data"]?.["prizeType"] == 2) $.hbprizeValue = I1i11lii?.["data"]?.["prizeValue"] || 0, $.hbnum = ($.hbprizeValue * 100 + $.hbnums * 100) / 100, $.hbnums = ii1iliIl($.hbnum), console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");else {
                    if (I1i11lii?.["data"]?.["prizeType"] == 1) console.log("抽中垃圾卷  🗑️");else {
                      if (I1i11lii?.["data"]?.["prizeType"] == 6) console.log("抽中惊喜大礼包  🗑️");else {
                        if (I1i11lii?.["data"]?.["prizeType"] == 0) console.log("抽中未知  🎁");else {
                          console.log(JSON.stringify(I1i11lii?.["data"]));
                        }
                      }
                    }
                  }
                }
                !$.inviteFissionReceivehot && liIIIl11 == "3orGfh1YkwNLksxOcN8zWQ" && (await $.wait(parseInt(Math.random() * 1000 + 2000, 10)), await IIli1iI());
              }
            } else I1i11lii.code == 2000 && I1i11lii.msg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : (console.log(I1i11lii.errMsg), I1i11lii.errMsg.includes("火爆") && $.prizeNum++);
          }
        }
      } catch (liIiiilI) {
        $.logErr(liIiiilI, i11il1l);
      } finally {
        l11ii1();
      }
    });
  });
}
async function IIli1iI() {
  return new Promise(async Il1Il1i => {
    const iIli11ll = {
        "functionId": "inviteFissionReceive",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": liIIIl11
        }
      },
      IIIilI1I = await iI1i1i11("b8469", iIli11ll);
    let IlIli1I1 = {
      "url": "https://api.m.jd.com/?functionId=inviteFissionReceive&" + IIIilI1I,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1i1lli
      },
      "timeout": 30 * 1000
    };
    $.get(IlIli1I1, async (ll1I1lIl, li1i1I1l, Ii11l1i) => {
      try {
        if (ll1I1lIl) console.log("" + JSON.stringify(ll1I1lIl));else {
          Ii11l1i = JSON.parse(Ii11l1i);
          if (Ii11l1i) {
            if (Ii11l1i.code == 0 && Ii11l1i.success == true) console.log("仅差 " + Ii11l1i?.["data"]?.["leftAmount"] + " 提现金可提现 " + Ii11l1i?.["data"]?.["amount"] + " 元,进度值：" + Ii11l1i?.["data"]?.["rate"] + " %"), Ii11l1i?.["data"]?.["state"] == 3 && console.log("已成功获得 " + Ii11l1i?.["data"]?.["amount"] + " 元提现金，快去提现吧！");else {
              if (Ii11l1i.code == 80209 && Ii11l1i.errMsg == "活动太火爆，请稍候重试") console.log("当期额外提现任务已做过，跳过"), $.inviteFissionReceivehot = true;else Ii11l1i.code == 80208 && Ii11l1i.errMsg == "活动太火爆，请稍候重试" ? console.log("初始赠送次数不进行提现金抽奖，跳过") : console.log(Ii11l1i.errMsg);
            }
          }
        }
      } catch (iiiII1ll) {
        $.logErr(iiiII1ll, li1i1I1l);
      } finally {
        Il1Il1i();
      }
    });
  });
}
async function l11lllli() {
  return new Promise(async IillI1l => {
    const Illii1iI = {
        "functionId": "inviteFissionHome",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": liIIIl11,
          "inviter": ""
        }
      },
      iiiIiII1 = await iI1i1i11("eb67b", Illii1iI);
    let lI1IlII1 = {
      "url": "https://api.m.jd.com/?functionId=inviteFissionHome&" + iiiIiII1,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1i1lli
      },
      "timeout": 30 * 1000
    };
    $.post(lI1IlII1, async (I11ii1iI, Iii1ilIi, Ii1llI11) => {
      try {
        if (I11ii1iI) console.log("" + JSON.stringify(I11ii1iI));else {
          Ii1llI11 = JSON.parse(Ii1llI11);
          if (Ii1llI11) {
            if (Ii1llI11.code == 0 && Ii1llI11.success == true) {
              var Il1lI11I = new Date().valueOf();
              $.drawPrizeNum = Ii1llI11.data.drawPrizeNum || 0;
              $.prizeNum = Ii1llI11.data.prizeNum || 0;
              $.countDownTime = Ii1llI11.data.countDownTime || 0;
              countDownTime = Il1lI11I + $.countDownTime;
              let il1lIii1 = Ii1llI11.data.inviter || "";
              const lI1lI1I = $.time("yyyy-MM-dd HH:mm:ss", countDownTime);
              liIIIl11 == "3orGfh1YkwNLksxOcN8zWQ" && ($.cashVo = Ii1llI11.data.cashVo || "", console.log("限时额外提现金：\n已有 " + $.cashVo?.["amount"] + " 提现金，仅差 " + $.cashVo?.["leftAmount"] + " 提现金可提现 " + $.cashVo?.["totalAmount"] + " 元,进度值：" + $.cashVo?.["rate"] + " %\n"));
              console.log("到期时间：" + lI1lI1I + "\n助力码：" + il1lIii1 + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
            } else Ii1llI11.code == 2000 && Ii1llI11.errMsg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : console.log(Ii1llI11.errMsg);
          }
        }
      } catch (liIiiIl) {
        $.logErr(liIiiIl, Iii1ilIi);
      } finally {
        IillI1l();
      }
    });
  });
}
async function lIii(IiiiiIIi) {
  return new Promise(async iilliI11 => {
    const lIl1i1Il = {
        "functionId": "superRedBagList",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": liIIIl11,
          "pageNum": IiiiiIIi,
          "pageSize": 100,
          "business": "fission"
        }
      },
      l11llIil = await iI1i1i11("f2b1d", lIl1i1Il);
    let ill11lI1 = {
      "url": "https://api.m.jd.com/?" + l11llIil,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1i1lli
      },
      "timeout": 30 * 1000
    };
    $.get(ill11lI1, async (llliilli, liilllll, iiilllll) => {
      try {
        if (llliilli) console.log("" + JSON.stringify(llliilli));else {
          iiilllll = JSON.parse(iiilllll);
          if (iiilllll) {
            if (iiilllll.code == 0 && iiilllll.success == true) {
              const IliiiI1l = (iiilllll.data.items || []).filter(lI111il => lI111il.prizeType === 4 && lI111il.state === 0 || lI111il.state === 2);
              for (let ll11I of IliiiI1l) {
                console.log("抽现金抽奖提现，去提现" + ll11I.amount + "现金");
                await li1IlIII(ll11I.id, ll11I.poolBaseId, ll11I.prizeGroupId, ll11I.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("抽现金抽奖提现失败，当月额度已满");
                  break;
                }
              }
            } else console.log("抽现金抽奖提现查询奖品：异常:" + JSON.stringify(iiilllll));
          }
        }
      } catch (Il11iI1) {
        $.logErr(Il11iI1, liilllll);
      } finally {
        iilliI11();
      }
    });
  });
}
async function li1IlIII(l11ii1lI, iI1iI1il, IIl11iI, Il11Il1i) {
  return new Promise(async ii1ili11 => {
    const iIIiiili = {
        "linkId": liIIIl11,
        "businessSource": "NONE",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": l11ii1lI,
          "poolBaseId": iI1iI1il,
          "prizeGroupId": IIl11iI,
          "prizeBaseId": Il11Il1i
        }
      },
      iI11iI1i = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(iIIiiili)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": ll1i1lli
        },
        "timeout": 30 * 1000
      };
    $.post(iI11iI1i, async (lii1l11l, iIIilili, li1lli1I) => {
      try {
        if (lii1l11l) {
          console.log("" + JSON.stringify(lii1l11l));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (iI1II1l(li1lli1I)) {
            li1lli1I = $.toObj(li1lli1I);
            if (li1lli1I.code === 0) {
              if (li1lli1I.data.status === "310") console.log("提现现金成功！");else {
                console.log("提现现金：失败:" + li1lli1I.data.message);
                if (li1lli1I.data.message.includes("上限")) {
                  if (Il11iill == "true" && liIIIl11 == "Wvzc_VpNTlSkiQdHT8r7QA") await ll11Iili(l11ii1lI, iI1iI1il, IIl11iI, Il11Il1i);else I1iil == "true" && liIIIl11 == "3orGfh1YkwNLksxOcN8zWQ" ? await ll11Iili(l11ii1lI, iI1iI1il, IIl11iI, Il11Il1i) : $.txhot = true;
                } else {
                  if (li1lli1I.data.message.includes("已存在状态")) await $.wait(parseInt(Math.random() * 2000 + 5000, 10)), await li1IlIII(l11ii1lI, iI1iI1il, IIl11iI, Il11Il1i);else (li1lli1I.data.message.includes("未绑定微信") || li1lli1I.data.message.includes("绑定手机号")) && ($.txhot = true);
                }
              }
            } else {
              console.log("提现现金：异常:" + JSON.stringify(li1lli1I));
            }
          }
        }
      } catch (ilII1ill) {
        $.logErr(ilII1ill, iIIilili);
      } finally {
        ii1ili11(li1lli1I);
      }
    });
  });
}
function ll11Iili(iliIIii1, l11il1, iliiIiII, i11Ii1I) {
  return new Promise(lil1l1l1 => {
    const ii1Iil11 = {
        "linkId": liIIIl11,
        "businessSource": "fission",
        "business": "business",
        "drawRecordId": iliIIii1,
        "poolId": l11il1,
        "prizeGroupId": iliiIiII,
        "prizeId": i11Ii1I
      },
      lIII1I1I = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(ii1Iil11)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": ll1i1lli
        },
        "timeout": 30 * 1000
      };
    $.post(lIII1I1I, async (i1lliiiI, I1IIlI, i1lI11lI) => {
      try {
        i1lliiiI ? (console.log("" + JSON.stringify(i1lliiiI)), console.log($.name + " API请求失败，请检查网路重试")) : iI1II1l(i1lI11lI) && (i1lI11lI = $.toObj(i1lI11lI), i1lI11lI.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + i1lI11lI.errMsg));
      } catch (liiliIli) {
        $.logErr(liiliIli, I1IIlI);
      } finally {
        lil1l1l1(i1lI11lI);
      }
    });
  });
}
function ilil11I1(lIIll1ii) {
  return lIIll1ii.then(ill1iIiI => {
    return [null, ill1iIiI];
  }).catch(iiIIiiII => [iiIIiiII]);
}
async function iI1i1i11(iiII1III, lI11ll11) {
  try {
    let l1i1iili = new ililili1({
      "appId": iiII1III,
      "appid": "activities_platform",
      "clientVersion": lI11ll11?.["clientVersion"],
      "client": lI11ll11?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await l1i1iili.genAlgo(), body = await l1i1iili.genUrlParams(lI11ll11.functionId, lI11ll11.body), body;
  } catch (i1ll1l1) {}
}
function ll1iiI(iIIl1i1i) {
  iIIl1i1i = iIIl1i1i || 32;
  let iIliiIIi = "0123456789abcdef",
    ilIil1iI = iIliiIIi.length,
    li1Ii1I = "";
  for (let liIliil1 = 0; liIliil1 < iIIl1i1i; liIliil1++) li1Ii1I += iIliiIIi.charAt(Math.floor(Math.random() * ilIil1iI));
  return li1Ii1I;
}
function IIlilI(lIIIl1II) {
  if (typeof lIIIl1II == "string") try {
    return JSON.parse(lIIIl1II);
  } catch (II1I1I11) {
    return console.log(II1I1I11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function lll1i1Il(lI1IIIi1) {
  return new Promise(IliIliII => {
    const li1ii1il = {
      "url": lI1IIIi1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(li1ii1il, async (il1ili11, Illl1IIi, iiiIIli) => {
      try {
        if (il1ili11) $.getAuthorCodeListerr = false;else {
          if (iiiIIli) iiiIIli = JSON.parse(iiiIIli);
          $.getAuthorCodeListerr = true;
        }
      } catch (I1IiI11I) {
        $.logErr(I1IiI11I, Illl1IIi);
        iiiIIli = null;
      } finally {
        IliIliII(iiiIIli);
      }
    });
  });
}
function l1ii1i(ill1iiI, lII1iiI1) {
  return Math.floor(Math.random() * (lII1iiI1 - ill1iiI)) + ill1iiI;
}
function ii1iliIl(IIlIl11i) {
  var lIIl1li = Number(IIlIl11i);
  return !isNaN(parseFloat(lIIl1li)) && (lIIl1li = lIIl1li.toFixed(2)), lIIl1li;
}
function iI1II1l(Ii11IIi1) {
  try {
    if (typeof JSON.parse(Ii11IIi1) == "object") {
      return true;
    }
  } catch (lillIi1i) {
    return console.log(lillIi1i), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}