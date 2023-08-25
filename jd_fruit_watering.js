/*
东东农场快速浇水
默认使用快速浇水卡，成熟了自动收取红包和种植新的水果
11 11 11 11 * jd_fruit_watering.js, tag=东东农场快速浇水, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env('东东农场快速浇水');
let Ii1I1l = [],
  IIlIl = "",
  ili11l,
  Iiilli = "",
  IIlIi = "",
  ili11i = {},
  iiIi1l = false;
const lliiII = process.env.FRUIT_PLANT_LEVEL ? process.env.FRUIT_PLANT_LEVEL : "2",
  liI1ll = require("./function/jdCommon"),
  ll1II = require("./utils/h5st.js");
let IllIil = ii1Ii(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  ill1Ii = ii1Ii(2, "1234567890") + "-" + ii1Ii(4, "1234567890") + "-" + ii1Ii(4, "1234567890") + "-" + ii1Ii(5, "1234567890"),
  llIIl1 = "106.475" + Math.floor(Math.random() * 899 + 100),
  ill1Il = "29.503" + Math.floor(Math.random() * 899 + 100);
!(async () => {
  await iI1IlI();
  if (!Ii1I1l[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n无法浇水大概率是IP：403，请更换后运行\n");
  for (let IIIlI1 = 0; IIIlI1 < Ii1I1l.length; IIIlI1++) {
    if (Ii1I1l[IIIlI1]) {
      IIlIl = Ii1I1l[IIIlI1];
      $.UserName = decodeURIComponent(IIlIl.match(/pt_pin=([^; ]+)(?=;?)/) && IIlIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIIlI1 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await ili11l.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      Iiilli = "";
      IIlIi = "";
      ili11i = {};
      $.UA = liI1ll.genUA($.UserName);
      await l1i1Ii();
      await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
    }
  }
})().catch(IiiIi => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + IiiIi + "!", "");
}).finally(() => {
  $.done();
});
async function l1i1Ii() {
  IIlIi = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await IllIll();
    if ($.farmInfo?.["farmUserPro"]) {
      if ($.farmInfo.treeState === 2 || $.farmInfo.treeState === 3) {
        const l1iIll = $.farmInfo?.["farmUserPro"]?.["name"];
        await i1lllI();
        if ($.gotCouponForFarmRes?.["riskTips"]["includes"]("异常")) {
          console.log($.gotCouponForFarmRes?.["riskTips"]);
          return;
        }
        await IllIll();
        const l1iIli = $.farmInfo?.["myHongBaoInfo"]?.["hongBao"];
        console.log(l1iIll + "已成熟并自动收获");
        console.log("获得" + l1iIli?.["discount"] + "元红包");
        console.log(ill1I1(l1iIli?.["endTime"]) + "过期，请及时使用");
        await lliiI1();
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) console.log("当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）");else {
          if ($.farmInfo?.["treeState"] === 0) {
            console.log("还没有种植新的水果\n");
            await lliiI1();
            return;
          }
        }
      }
      await l1iI1();
    } else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",暂时不清楚什么原因");else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
  } catch (ili1Il) {
    console.log("任务执行异常，请检查执行日志");
    $.logErr(ili1Il);
  }
}
async function l1iI1() {
  await IllIll();
  let ll11I = $.farmInfo?.["farmUserPro"]?.["totalEnergy"] || 0;
  console.log("目前共有 " + ll11I + "g 💧");
  await IiiI1();
  const {
    fastCard: iIi1I,
    doubleCard: liIIl,
    beanCard: IlI1lI,
    signCard: liIIi
  } = $.myCardInfoRes;
  console.log("快速浇水卡：" + (iIi1I === -1 ? "未解锁" : iIi1I + " 🎟️"));
  if (ll11I >= 100 && $.myCardInfoRes.fastCard > 0) {
    let ili1II = parseInt(ll11I / 100) > $.myCardInfoRes?.["fastCard"] ? $.myCardInfoRes?.["fastCard"] : parseInt(ll11I / 100);
    for (let liIllI = 0; liIllI < ili1II; liIllI++) {
      console.log("");
      await lilII("fastCard");
      if ($.userMyCardRes.code === "0") {
        ll11I -= 100;
        console.log("使用快速浇水卡 ✅");
        if ($.userMyCardRes?.["treeFinished"]) {
          iiIi1l = true;
          break;
        } else console.log("当前剩余 " + ll11I + "g 💧");
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      } else {
        console.log("" + JSON.stringify($.userMyCardRes));
        console.log("❌ 浇水异常，可能触发风控，请稍后再试~");
        break;
      }
    }
  }
  if (iiIi1l) {
    console.log("\n🎉 水果已可领取");
    const IlI1li = $.farmInfo?.["farmUserPro"]?.["name"];
    await i1lllI();
    await IllIll();
    const IlI1ll = $.farmInfo?.["myHongBaoInfo"]?.["hongBao"];
    console.log(IlI1li + "已成熟并自动收获");
    console.log("获得" + IlI1ll?.["discount"] + "元红包");
    console.log(ill1I1(IlI1ll?.["endTime"]) + "过期，请及时使用");
    await lliiI1();
    return;
  }
  if (ll11I >= 10) {
    iiIi1l = false;
    for (let ll11l = 0; ll11l < parseInt(ll11I / 10); ll11l++) {
      console.log("");
      await IIIiI();
      if ($.waterResult.code === "0") {
        console.log("浇水10g ✅");
        if ($.waterResult.finished) {
          iiIi1l = true;
          break;
        } else await iii1i1(), console.log("当前剩余 " + $.waterResult?.["totalEnergy"] + "g 💧");
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      } else {
        console.log("" + JSON.stringify($.waterResult));
        console.log("❌ 浇水异常，可能触发风控，请稍后再试~");
        break;
      }
    }
    if (iiIi1l) {
      console.log("\n🎉 水果已可领取");
      const l1llli = $.farmInfo?.["farmUserPro"]?.["name"];
      await i1lllI();
      await IllIll();
      const iI1lII = $.farmInfo?.["myHongBaoInfo"]?.["hongBao"];
      console.log(l1llli + "已成熟并自动收获");
      console.log("获得" + iI1lII?.["discount"] + "元红包");
      onsole.log(ill1I1(iI1lII?.["endTime"]) + "过期，请及时使用");
      await lliiI1();
      return;
    }
  }
}
async function lliiI1() {
  await IllIll();
  const l1llll = $.farmInfo?.["farmLevelWinGoods"][lliiII];
  if (l1llll && l1llll.length) {
    const Iliii = l1llll[Math.floor(Math.random() * l1llll.length)];
    await llIIi1(Iliii?.["type"]);
    $.choiceGoodsForFarmRes.code * 1 === 0 ? (console.log("【提醒⏰】您没有种植新的水果"), console.log("已自动为您种植等级" + lliiII + "的" + $.choiceGoodsForFarmRes?.["farmUserPro"]?.["name"])) : (console.log("【提醒⏰】您没有种植新的水果"), onsole.log("尝试自动种植" + Iliii?.["name"] + "失败，请打开京东APP手动尝试"));
  } else console.log("【提醒⏰】您没有种植新的水果"), console.log("指定的等级" + lliiII + "暂无水果可供选择，请打开京东APP检查");
}
async function IiiI1() {
  $.myCardInfoRes = await l1i1Il("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function lilII(l1i1i) {
  $.userMyCardRes = await l1i1Il("userMyCardForFarm", {
    "cardType": l1i1i
  });
}
async function IIIiI() {
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  $.waterResult = await l1i1Il("waterGoodForFarm");
}
function iii1i1() {
  return new Promise(async liiii1 => {
    if ($.waterResult?.["waterStatus"] === 0 && $.waterResult?.["treeEnergy"] === 10) console.log("果树发芽了，奖励30g水滴"), await gotStageAwardForFarm("1"), console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && (console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"]), console.log(""));else {
      if ($.waterResult?.["waterStatus"] === 1) console.log("果树开花了,奖励 40g 💧"), await gotStageAwardForFarm("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && (console.log("【果树开花了】奖励 " + $.gotStageAwardForFarmRes?.["addEnergy"] + "g 💧"), console.log(""));else {
        if ($.waterResult?.["waterStatus"] === 2) {
          console.log("果树长出小果子啦, 奖励 50g 💧");
          await gotStageAwardForFarm("3");
          console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
          if ($.gotStageAwardForFarmRes?.["code"] === "0") {
            console.log("【果树结果了】奖励 " + $.gotStageAwardForFarmRes?.["addEnergy"] + "g 💧");
            console.log("");
          }
        }
      }
    }
    liiii1();
  });
}
async function IllIll() {
  $.farmInfo = await l1i1Il("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": IllIil,
    "un_area": ill1Ii,
    "version": 22,
    "lat": ill1Il,
    "lng": llIIl1,
    "channel": 1
  });
}
async function i1lllI() {
  const IlilI = {
    "version": 11,
    "channel": 3,
    "babelChannel": 0
  };
  $.gotCouponForFarmRes = await l1i1Il("gotCouponForFarm", IlilI);
}
async function llIIi1(liiiiI) {
  const illli1 = {
    "imageUrl": "",
    "nickName": "",
    "shareCode": "",
    "goodsType": liiiiI,
    "type": "0",
    "version": 11,
    "channel": 3,
    "babelChannel": 0
  };
  $.choiceGoodsForFarmRes = await l1i1Il("choiceGoodsForFarm", illli1);
}
function iI1IlI() {
  return new Promise(l11iIl => {
    ili11l = $.isNode() ? require("./sendNotify") : "";
    const IIIIll = $.isNode() ? require("./jdCookie") : "";
    if ($.isNode()) {
      Object.keys(IIIIll).forEach(liiiii => {
        IIIIll[liiiii] && Ii1I1l.push(IIIIll[liiiii]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else Ii1I1l = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1iII($.getdata("CookiesJD") || "[]").map(lI1111 => lI1111.cookie)].filter(Ilil1 => !!Ilil1);
    l11iIl();
  });
}
function l1i1Il(IliII1, l1iIi1 = {}, i1I1I = 1000) {
  return new Promise(Ilili => {
    setTimeout(async () => {
      $.post(await Ii1I11(IliII1, l1iIi1), (liiili, I1ll11, lI1lIi) => {
        try {
          if (liiili) {
            console.log("\n东东农场: API查询请求失败 ‼️‼️");
            console.log(JSON.stringify(liiili));
            console.log("function_id:" + IliII1);
            $.logErr(liiili);
          } else l1i1II(lI1lIi) && (lI1lIi = JSON.parse(lI1lIi));
        } catch (illlli) {
          $.logErr(illlli, I1ll11);
        } finally {
          Ilili(lI1lIi);
        }
      });
    }, i1I1I);
  });
}
function ill1I1(IIIIiI) {
  let i1i111;
  return IIIIiI ? i1i111 = new Date(IIIIiI) : i1i111 = new Date(), i1i111.getFullYear() + "-" + (i1i111.getMonth() + 1 >= 10 ? i1i111.getMonth() + 1 : "0" + (i1i111.getMonth() + 1)) + "-" + (i1i111.getDate() >= 10 ? i1i111.getDate() : "0" + i1i111.getDate());
}
function l1i1II(liliii) {
  if (!liliii) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(liliii) == "object") return true;
  } catch (l1lI1I) {
    return console.log(l1lI1I), false;
  }
}
const ili111 = {
  "initForFarm": "8a2af",
  "taskInitForFarm": "fcb5a",
  "browseAdTaskForFarm": "53f09",
  "firstWaterTaskForFarm": "0cf1e",
  "waterFriendGotAwardForFarm": "d08ff",
  "ddnc_getTreasureBoxAward": "67dfc",
  "totalWaterTaskForFarm": "102f5",
  "gotThreeMealForFarm": "57b30",
  "waterGoodForFarm": "0c010",
  "choiceGoodsForFarm": "5f4ca",
  "gotCouponForFarm": "b1515",
  "gotStageAwardForFarm": "81591",
  "followVenderForBrand": "71547",
  "gotWaterGoalTaskForFarm": "c901b",
  "gotNewUserTaskForFarm": "de8f8",
  "orderTaskGotWaterForFarm": "eed5c",
  "clockInForFarm": "32b94",
  "clockInFollowForFarm": "4a0b4",
  "waterFriendForFarm": "673a0",
  "awardFirstFriendForFarm": "9b655",
  "awardInviteFriendForFarm": "2b5ca",
  "awardCallOrInviteFriendForFarm": "b0b03",
  "userMyCardForFarm": "86ba5",
  "getCallUserCardForFarm": "2ca57",
  "deleteFriendForFarm": "eaf91",
  "gotLowFreqWaterForFarm": "8172b",
  "getFullCollectionReward": "5c767",
  "getOrderPayLotteryWater": "ef089",
  "receiveStageEnergy": "15507",
  "exchangeGood": "52963",
  "farmAssistInit": "92354",
  "myCardInfoForFarm": "157b6",
  "gotPopFirstPurchaseTaskForFarm": "d432f",
  "limitWaterInitForFarm": "6bdc2",
  "ddnc_surpriseModal": "e81c1",
  "friendInitForFarm": "a5a9c",
  "clockInInitForFarm": "08dc3",
  "guideTaskAward": "59bc4"
};
async function Ii1I11(ll1llI, i11lIl = {}) {
  let lI1iii = "";
  if (!ili111[ll1llI]) lI1iii = "https://api.m.jd.com/client.action?functionId=" + ll1llI + "&body=" + encodeURIComponent(JSON.stringify(i11lIl)) + "&appid=wh5";else {
    const I1iiil = {
        "appid": "signed_wh5",
        "client": "iOS",
        "clientVersion": "10.1.0",
        "functionId": ll1llI,
        "body": i11lIl
      },
      Illll1 = await IllIli(ili111[ll1llI], I1iiil);
    lI1iii = "https://api.m.jd.com/client.action?" + Illll1;
  }
  return {
    "url": lI1iii,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      "Cookie": IIlIl
    },
    "timeout": 10000
  };
}
async function IllIli(lI1iil, lIilll) {
  try {
    let IIliil = new ll1II({
      "appId": lI1iil,
      "appid": "signed_wh5",
      "clientVersion": lIilll?.["clientVersion"],
      "client": lIilll?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await IIliil.genAlgo(), body = await IIliil.genUrlParams(lIilll.functionId, lIilll.body), body;
  } catch (ll1liI) {}
}
function ii1Ii(lI1iiI, i11lII = "qwertyuiopasdfghjklzxcvbnm") {
  let ll1li1 = "";
  for (let I1iii1 = 0; I1iii1 < lI1iiI; I1iii1++) {
    ll1li1 += i11lII[Math.floor(Math.random() * i11lII.length)];
  }
  return ll1li1;
}
function ii1Il(iIiii1, ll1lil) {
  let I1Illl = {
      "appId": iIiii1,
      ...ll1lil,
      "ua": $.UA,
      "pin": $.UserName
    },
    ll1lii = {
      "url": "http://kr.kingran.cf/h5st",
      "body": JSON.stringify(I1Illl),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30000
    };
  return new Promise(async i11lI1 => {
    $.post(ll1lii, (ilIIiI, lIl1ii, lIl1il) => {
      let Ii1l11 = "";
      try {
        if (ilIIiI) console.log("" + JSON.stringify(ilIIiI)), console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          lIl1il = JSON.parse(lIl1il);
          if (typeof lIl1il === "object" && lIl1il && lIl1il.body) {
            if (lIl1il.body) Ii1l11 = lIl1il.body || "";
          } else lIl1il.code == 400 ? console.log("\n" + lIl1il.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (IliIlI) {
        $.logErr(IliIlI, lIl1ii);
      } finally {
        i11lI1(Ii1l11);
      }
    });
  });
}
function l1iII(i1111l) {
  if (typeof i1111l == "string") {
    try {
      return JSON.parse(i1111l);
    } catch (i1111I) {
      return console.log(i1111I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}