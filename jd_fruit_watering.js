/*
东东农场快速浇水
环境变量：FRUIT_PLANT_LEVEL // 自动种植的作物等级（正整数），默认为2
        FRUIT_WATERING_NOTIFY // 是否推送通知（true/false），默认不推送

每月或每周只能领2次红包，由于常规浇水太慢，脚本优先使用快速浇水卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('东东农场快速浇水')
const jdCookie = require('./jdCookie')
const notify = require('./function/sendJDNotify')
const H5st = require('./function/krgetH5st')
const common = require('./function/jdCommon')


const FRUIT_PLANT_LEVEL = process.env.FRUIT_PLANT_LEVEL || "2",
  isNotify = process.env.FRUIT_WATERING_NOTIFY === "true";
let cookie = "";
const cookiesArr = Object.keys(jdCookie).map(l11ii1Ii => jdCookie[l11ii1Ii]).filter(lilIIIiI => lilIIIiI);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  notify.config({
    title: $.name
  });
  console.log("每月或每周只能领2次红包，由于常规浇水太慢，脚本优先使用快速浇水卡");
  for (let iI1iiIIi = 0; iI1iiIIi < cookiesArr.length; iI1iiIIi++) {
    if (cookiesArr[iI1iiIIi]) {
      cookie = cookiesArr[iI1iiIIi];
      $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
      $.index = iI1iiIIi + 1;
      $.nickName = "";
      $.message = notify.create($.index, $.UserName);
      $.UA = common.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await Main();
    }
  }
  if (isNotify && notify.getMessage()) {
    notify.updateContent(notify.content);
    await notify.push();
  }
})().catch(II1I1l1 => $.logErr(II1I1l1)).finally(() => $.done());
async function Main() {
  let Ill1iiII = false;
  try {
    const IilIliII = await common.getLoginStatus(cookie);
    if (!IilIliII && typeof IilIliII !== undefined) {
      console.log("账号无效");
      return;
    }
    await initForFarm();
    if ($.farmInfo?.["farmUserPro"]) {
      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        await autoCrop();
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) {
          console.log("当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "，进度" + ($.farmInfo?.["farmUserPro"]?.["treeEnergy"] / $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] * 100).toFixed(2) + "%，已浇水" + $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 + "次还需" + ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10 + "次）");
        } else {
          $.farmInfo?.["treeState"] === 0 && (await autoPlant());
        }
      }
    } else {
      console.log("初始化农场数据异常, 请登录京东App查看农场功能是否正常 " + JSON.stringify($.farmInfo));
      return;
    }
    let Ii1Iiii1 = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
    console.log("目前共有水滴 " + Ii1Iiii1 + "g💧");
    await myCardInfoForFarm();
    const {
      fastCard: llilI1II,
      doubleCard: ii1Il11I,
      beanCard: iiI1iIiI,
      signCard: llliiil
    } = $.myCardInfoRes;
    console.log("快速浇水卡 " + (llilI1II === -1 ? "未解锁" : llilI1II + " 🎟️") + "\n");
    if (Ii1Iiii1 < 10) {
      console.log("水滴不足");
      return;
    }
    if (Ii1Iiii1 >= 100 && $.myCardInfoRes.fastCard > 0) {
      let illiI1i = parseInt(Ii1Iiii1 / 100) > $.myCardInfoRes.fastCard ? $.myCardInfoRes.fastCard : parseInt(Ii1Iiii1 / 100);
      for (let illIIIIi = 0; illIIIIi < illiI1i; illIIIIi++) {
        await userMyCardForFarm("fastCard");
        if ($.userMyCardRes.code === "0") {
          Ii1Iiii1 -= 100;
          if ($.userMyCardRes.treeFinished) {
            Ill1iiII = true;
            console.log("已使用快速浇水卡，剩余" + Ii1Iiii1 + "g💧（作物已成熟）");
            break;
          } else {
            console.log("已使用快速浇水卡，剩余" + Ii1Iiii1 + "g💧");
          }
          await $.wait(500);
        } else {
          console.log("" + JSON.stringify($.userMyCardRes));
          console.log("❌ 浇水异常，可能触发风控，请稍后再试~");
          break;
        }
      }
      if (Ill1iiII) {
        await initForFarm();
        await autoCrop();
        return;
      }
    }
    if (Ii1Iiii1 >= 10) {
      do {
        await waterGoodForFarm();
        $.waterResult.totalEnergy && (Ii1Iiii1 = $.waterResult.totalEnergy);
        if ($.waterResult.code === "0") {
          if ($.waterResult.finished) {
            Ill1iiII = true;
            console.log("已浇水10g，剩余" + $.waterResult.totalEnergy + "g💧（作物已成熟）");
            break;
          } else {
            if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
              await gotStageAwardForFarm("1");
              $.gotStageAwardForFarmRes.code === "0" && console.log("果树发芽了，奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
            } else {
              if ($.waterResult.waterStatus === 1) {
                await gotStageAwardForFarm("2");
                $.gotStageAwardForFarmRes.code === "0" && console.log("果树开花了，奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
              } else {
                $.waterResult.waterStatus === 2 && (await gotStageAwardForFarm("3"), $.gotStageAwardForFarmRes.code === "0" && console.log("果树结果了，奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧"));
              }
            }
            console.log("已浇水10g，剩余" + $.waterResult.totalEnergy + "g💧");
          }
          await $.wait(500);
        } else {
          console.log("" + JSON.stringify($.waterResult));
          console.log("❌ 浇水异常，可能触发风控，请稍后再试~");
          break;
        }
      } while (Ii1Iiii1 >= 10);
      if (Ill1iiII) {
        await initForFarm();
        await autoCrop();
        return;
      }
    }
  } catch (Il1i1) {
    console.log("任务执行异常，请检查执行日志");
    $.logErr(Il1i1);
  }
}
async function autoPlant() {
  const Ii11I1lI = $.farmInfo?.["farmLevelWinGoods"];
  if (Ii11I1lI) {
    const I1lIIIli = $.farmInfo?.["farmLevelWinGoods"][FRUIT_PLANT_LEVEL];
    if (I1lIIIli && I1lIIIli.length) {
      const IilII1I1 = I1lIIIli[Math.floor(Math.random() * I1lIIIli.length)];
      await choiceGoodsForFarm(IilII1I1.type);
      $.choiceGoodsForFarmRes.code * 1 === 0 ? console.log("当前没有种植新的水果，已自动种植等级" + FRUIT_PLANT_LEVEL + "的" + $.choiceGoodsForFarmRes.farmUserPro.name + "\n") : console.log("当前没有种植新的水果，尝试自动种植失败，请打开京东APP手动尝试");
    } else {
      console.log("当前没有种植新的水果，指定的等级" + FRUIT_PLANT_LEVEL + "暂无水果可供选择，请打开京东APP检查");
    }
  } else {
    console.log("当前没有可种植的水果（可能本月已领取两次红包达到了上限）");
  }
}
async function autoCrop() {
  const lIli1i1i = $.farmInfo?.["farmUserPro"]?.["name"];
  console.log("🌳 当前种植的 ”" + lIli1i1i + "“ 已成熟");
  await gotCouponForFarm();
  const lli1li1l = $.gotCouponForFarmRes?.["hongbaoResult"],
    li1i11li = lli1li1l?.["resultCode"];
  if (lli1li1l && li1i11li) {
    switch (li1i11li) {
      case 200:
        const llI1i1iI = lli1li1l?.["hongBao"]?.["discount"],
          l11ll1lI = lli1li1l?.["hongBao"]?.["endTime"];
        console.log("🎉 收获成功，获得" + llI1i1iI + "元红包🧧（将在 " + $.time("yyyy-MM-dd HH:mm:ss", l11ll1lI) + " 过期）");
        $.message.insert("收获成功，获得" + llI1i1iI + "红包🧧");
        await initForFarm();
        await autoPlant();
        break;
      case 409:
        console.log("当前已达到领取上限，过一段时间再领取吧~");
        $.message.insert("已达到领取上限，请过一段时间再领取");
        break;
      default:
        console.log("收获失败，未知状态 " + JSON.stringify(lli1li1l));
        break;
    }
  } else {
    console.log("收获失败 " + JSON.stringify($.gotCouponForFarmRes));
  }
}
async function myCardInfoForFarm() {
  const i1lI11l = arguments.callee.name.toString();
  $.myCardInfoRes = await request(i1lI11l, {
    version: 5,
    channel: 1
  });
}
async function userMyCardForFarm(iiIllli) {
  const li1liIiI = arguments.callee.name.toString();
  $.userMyCardRes = await request(li1liIiI, {
    cardType: iiIllli
  });
}
async function waterGoodForFarm() {
  $.waterResult = {};
  const IIlIii = arguments.callee.name.toString();
  $.waterResult = await request(IIlIii);
}
async function gotStageAwardForFarm(iiIlI111) {
  $.gotStageAwardForFarmRes = await request("gotStageAwardForFarm", {
    type: iiIlI111
  });
}
async function initForFarm() {
  const ll1illlI = arguments.callee.name.toString();
  let i1Iiill = "106.475" + Math.floor(Math.random() * 899 + 100),
    li11l1i1 = "29.503" + Math.floor(Math.random() * 899 + 100);
  $.farmInfo = await request(ll1illlI, {
    babelChannel: "522",
    sid: "",
    un_area: "",
    version: 25,
    channel: 1,
    lat: li11l1i1,
    lng: i1Iiill
  });
}
async function gotCouponForFarm() {
  const II1iiiil = {
    version: 11,
    channel: 3,
    babelChannel: 0
  };
  $.gotCouponForFarmRes = await request("gotCouponForFarm", II1iiiil);
}
async function choiceGoodsForFarm(Ili111i1) {
  const ll111iii = {
    imageUrl: "",
    nickName: "",
    shareCode: "",
    goodsType: Ili111i1,
    type: "0",
    version: 11,
    channel: 3,
    babelChannel: 0
  };
  $.choiceGoodsForFarmRes = await request("choiceGoodsForFarm", ll111iii);
}
async function taskUrl(IIlliili, lIlI1ll1 = {}) {
  let I11I1li = "";
  const lIi1ii1I = appidMap[IIlliili];
  if (!lIi1ii1I) {
    I11I1li = "https://api.m.jd.com/client.action?functionId=" + IIlliili + "&body=" + encodeURIComponent(JSON.stringify(lIlI1ll1)) + "&appid=wh5";
  } else {
    const IliiIii = await H5st.getH5st({
      appId: lIi1ii1I,
      appid: "signed_wh5",
      body: lIlI1ll1,
      client: "iOS",
      clientVersion: "12.2.0",
      functionId: IIlliili,
      cookie: cookie,
      ua: $.UA,
      version: "4.2",
      t: true
    });
    I11I1li = "https://api.m.jd.com/client.action?" + IliiIii.params;
  }
  return {
    url: I11I1li,
    headers: {
      Host: "api.m.jd.com",
      Accept: "*/*",
      Origin: "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      Referer: "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      Cookie: cookie
    },
    timeout: 10000
  };
}
function request(l1II1i1i, ilI1i11I = {}, Iiilil11 = 1000) {
  return new Promise(iiI1iili => {
    setTimeout(async () => {
      $.get(await taskUrl(l1II1i1i, ilI1i11I), (IillIIil, I1iII1Ii, I1IlliI1) => {
        try {
          IillIIil ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(String(IillIIil)), console.log("functionId：" + l1II1i1i), $.logErr(IillIIil)) : safeGet(I1IlliI1) && (I1IlliI1 = JSON.parse(I1IlliI1));
        } catch (ilI1l1iI) {
          $.logErr(ilI1l1iI, I1iII1Ii);
        } finally {
          iiI1iili(I1IlliI1);
        }
      });
    }, Iiilil11);
  });
}
function safeGet(Ii1iiIll) {
  if (!Ii1iiIll) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(Ii1iiIll) == "object") {
      return true;
    }
  } catch (l1l1i1iI) {
    console.log(l1l1i1iI);
    return false;
  }
}
const appidMap = {
  initForFarm: "8a2af",
  taskInitForFarm: "fcb5a",
  browseAdTaskForFarm: "53f09",
  firstWaterTaskForFarm: "0cf1e",
  waterFriendGotAwardForFarm: "d08ff",
  ddnc_getTreasureBoxAward: "67dfc",
  totalWaterTaskForFarm: "102f5",
  gotThreeMealForFarm: "57b30",
  waterGoodForFarm: "0c010",
  choiceGoodsForFarm: "5f4ca",
  gotCouponForFarm: "b1515",
  gotStageAwardForFarm: "81591",
  followVenderForBrand: "71547",
  gotWaterGoalTaskForFarm: "c901b",
  gotNewUserTaskForFarm: "de8f8",
  orderTaskGotWaterForFarm: "eed5c",
  clockInForFarm: "32b94",
  clockInFollowForFarm: "4a0b4",
  waterFriendForFarm: "673a0",
  awardFirstFriendForFarm: "9b655",
  awardInviteFriendForFarm: "2b5ca",
  awardCallOrInviteFriendForFarm: "b0b03",
  userMyCardForFarm: "86ba5",
  getCallUserCardForFarm: "2ca57",
  deleteFriendForFarm: "eaf91",
  gotLowFreqWaterForFarm: "8172b",
  getFullCollectionReward: "5c767",
  getOrderPayLotteryWater: "ef089",
  receiveStageEnergy: "15507",
  exchangeGood: "52963",
  farmAssistInit: "92354",
  myCardInfoForFarm: "157b6",
  gotPopFirstPurchaseTaskForFarm: "d432f",
  limitWaterInitForFarm: "6bdc2",
  ddnc_surpriseModal: "e81c1",
  friendInitForFarm: "a5a9c",
  clockInInitForFarm: "08dc3",
  guideTaskAward: "59bc4",
  signForFarm: "32b94",
  gotNewUserTaskForFarm: "de8f8"
};
