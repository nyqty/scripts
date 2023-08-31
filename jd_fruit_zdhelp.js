/*
东东农场指定助力

脚本定时请自行修改

下方变量 二选一：
设置助力账号变量：export jd_fruit_help_pin='pin值' 定义助力账号，多个用 & 隔开
设置助力码变量：export jd_fruit_help_code='code值' 定义助力码，多个助力码用 @ 连接或者 | 连接 或者 & 连接
助力接口 3个账号 后延时变量：
export jd_fruit_help_wait='30' 单位 秒

有条件上代理，请勿频繁运行，若多次提示403，务必更换IP运行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#东东农场指定助力
1 1 1 1 * jd_wechat_openGroup.js, tag=东东农场指定助力, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('东东农场指定助力');
let Ill111 = [],
  lI1iIII = "",
  liliIiI,
  iIIlllil = "",
  lIliilIi = [],
  liiI1III = [],
  lIi1ii1l = "",
  il1l1iii = "",
  iiIIilii = {};
let lii1ii = true;
const I1il11Ii = process.env.jd_fruit_help_pin ? process.env.jd_fruit_help_pin.split("&") : "";
if (process.env.jd_fruit_help_code) {
  if (process.env.jd_fruit_help_code.includes("|")) lIliilIi = [...process.env.jd_fruit_help_code.split("|"), ...lIliilIi];else process.env.jd_fruit_help_code.includes("@") ? lIliilIi = [...process.env.jd_fruit_help_code.split("@"), ...lIliilIi] : lIliilIi = [...process.env.jd_fruit_help_code.split("&"), ...lIliilIi];
}
let Ili1l = "30";
process.env.jd_fruit_help_wait && process.env.jd_fruit_help_wait != 30 && (Ili1l = process.env.jd_fruit_help_wait);
const il1lI1lI = require("./function/jdCommon"),
  ii1llil = require("./utils/h5st.js");
let iii1ii = iI11lllI(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  Il1I11lI = iI11lllI(2, "1234567890") + "-" + iI11lllI(4, "1234567890") + "-" + iI11lllI(4, "1234567890") + "-" + iI11lllI(5, "1234567890"),
  IilI1Ili = "106.475" + Math.floor(Math.random() * 899 + 100),
  l1Il1i1i = "29.503" + Math.floor(Math.random() * 899 + 100),
  ilIlIlll = true;
const I1ilIlII = require("fs");
let l11i1llI = false,
  iii1II1 = "./Fruit_ShareCache.json",
  iI1liIll = I1ilIlII.existsSync(iii1II1),
  lI1lIli = [];
iI1liIll && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), lI1lIli = I1ilIlII.readFileSync(iii1II1, "utf-8"), lI1lIli && (lI1lIli = lI1lIli.toString(), lI1lIli = JSON.parse(lI1lIli)));
let Il1lI1lI = 0,
  iI1Iil = false;
!(async () => {
  await IiiiIii();
  if (!Ill111[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  if (!I1il11Ii && !process.env.jd_fruit_help_code) {
    console.log("\n下方变量 二选一 \n");
    console.log("\n请先通过环境变量,设置助力账号变量：export jd_fruit_help_pin='pin值' 定义助力账号，多个用 & 隔开\n");
    console.log("\n请先通过环境变量,设置助力码变量：export jd_fruit_help_code='code值' 定义助力码，多个用 | 隔开\n");
    return;
  }
  if (I1il11Ii && process.env.jd_fruit_help_code) {
    console.log("\n检测到环境变量同时存在指定账号变量和指定助力码变量，请调整后运行\n");
    return;
  }
  if (I1il11Ii) krmode = "指定助力账号";else {
    if (process.env.jd_fruit_help_code) {
      krmode = "指定助力码";
    }
  }
  console.log("【若多次提示403，务必更换IP运行.....】");
  console.log("【当前助力模式设置，" + krmode + ".....】");
  console.log("【当前助力接口延时设置，" + Ili1l + " 秒.....】");
  if (I1il11Ii) {
    console.log("\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n");
    for (let I11iilII = 0; I11iilII < Ill111.length; I11iilII++) {
      if (Ill111[I11iilII]) {
        lI1iIII = Ill111[I11iilII];
        $.UserName = decodeURIComponent(lI1iIII.match(/pt_pin=([^; ]+)(?=;?)/) && lI1iIII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = I11iilII + 1;
        $.isLogin = true;
        $.nickName = "";
        lIi1ii1l = "";
        if (I1il11Ii.includes(encodeURIComponent($.UserName))) {
          console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
          if (!$.isLogin) {
            $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
              "open-url": "https://bean.m.jd.com/bean/signIndex.action"
            });
            $.isNode() && (await liliIiI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
            continue;
          }
          lIi1ii1l = "";
          il1l1iii = "";
          iiIIilii = {};
          $.UA = il1lI1lI.genUA($.UserName);
          $.retry = 0;
          iI1Iil = false;
          await iI11iil();
          iI1Iil && (await $.wait(2000), Il1lI1lI++);
          Il1lI1lI == 10 && (console.log("\n【访问接口次数达到10次，休息一分钟.....】\n"), await $.wait(60 * 1000), Il1lI1lI = 0);
        } else {
          continue;
        }
      }
      if (l11i1llI) {
        var iiiIIIIl = JSON.stringify(lI1lIli, null, 2);
        I1ilIlII.writeFile(iii1II1, iiiIIIIl, function (IllII1ll) {
          IllII1ll ? (console.log(IllII1ll), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
        });
      }
    }
    console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  }
  process.env.jd_fruit_help_code && (liiI1III = lIliilIi, console.log("环境变量填写助力码为：" + process.env.jd_fruit_help_code));
  for (let iIlII1i = 0; iIlII1i < Ill111.length; iIlII1i++) {
    if (Ill111[iIlII1i]) {
      lI1iIII = Ill111[iIlII1i];
      $.UserName = decodeURIComponent(lI1iIII.match(/pt_pin=([^; ]+)(?=;?)/) && lI1iIII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIlII1i + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await liliIiI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      lIi1ii1l = "";
      il1l1iii = "";
      iiIIilii = {};
      $.UA = il1lI1lI.genUA($.UserName);
      $.retry = 0;
      Il1lI1lI++;
      await IIIi1I1i();
      if (!liiI1III.length) {
        console.log("\n❖ 没有可助力账号助力码，退出...");
        return;
      }
      Il1lI1lI == 3 && (console.log("\n【访问接口次数达到3次，暂时休整等待 " + Ili1l + " 秒.....】\n"), await $.wait(parseInt(Ili1l, 10) * 1000), Il1lI1lI = 0);
    }
  }
  $.isNode() && iIIlllil && $.ctrTemp && (await liliIiI.sendNotify("" + $.name, "" + iIIlllil));
})().catch(il1I1ll1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + il1I1ll1 + "!", "");
}).finally(() => {
  $.done();
});
async function i11lIll1() {
  il1l1iii = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await Ilii1iil();
    if ($.farmInfo?.["farmUserPro"]) await IIIi1I1i();else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + ($.farmInfo?.["message"] || $.farmInfo?.["msg"]));
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
      $.retry < 1 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await i11lIll1());
    }
  } catch (lIIlli1l) {
    $.logErr(lIIlli1l);
  }
}
async function IIIi1I1i() {
  await $.wait(2000);
  await Ilii1iil();
  let i11iiIII = 0,
    IliIiIII = 3,
    lI1111lI = "";
  if (ilIlIlll) for (let liiI1l1 = 0; liiI1l1 < liiI1III.length; liiI1l1++) {
    console.log("开始助力: " + liiI1III[liiI1l1]);
    if (!liiI1III) {
      console.log("没有可助力账号助力码，退出...");
      return;
    }
    await IlI1ilil(liiI1III[liiI1l1]);
    if ($.helpResult?.["code"] === "0") {
      if ($.helpResult?.["helpResult"]?.["code"] === "0") i11iiIII += $.helpResult?.["helpResult"]?.["salveHelpAddWater"], console.log("【助力好友结果】: 已成功给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力"), console.log("给好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力获得" + $.helpResult?.["helpResult"]?.["salveHelpAddWater"] + "g水滴"), lI1111lI += ($.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] || "匿名用户") + ",";else {
        if ($.helpResult?.["helpResult"]?.["code"] === "8") console.log("【助力好友结果】: 助力【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】失败，您今天助力次数已耗尽");else {
          if ($.helpResult?.["helpResult"]?.["code"] === "9") {
            console.log("【助力好友结果】: 之前给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力过了");
          } else {
            if ($.helpResult?.["helpResult"]?.["code"] === "7") console.log("【助力好友结果】: 不能为自己助力哦");else $.helpResult?.["helpResult"]?.["code"] === "10" ? (console.log("【助力好友结果】: 好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力已满"), liiI1III.shift()) : console.log("助力其他情况：" + JSON.stringify($.helpResult?.["helpResult"]));
          }
        }
      }
      console.log("【今日助力次数还剩】" + $.helpResult?.["helpResult"]?.["remainTimes"] + "次\n");
      IliIiIII = $.helpResult?.["helpResult"]?.["remainTimes"];
      if ($.helpResult?.["helpResult"]?.["remainTimes"] === 0) {
        console.log("您当前助力次数已耗尽，跳出助力");
        break;
      }
    } else {
      if ($.helpResult?.["code"] == 3) console.log("助力失败: " + $.helpResult?.["code"] + ",未登录"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));else {
        if ($.helpResult?.["code"] == 6) console.log("助力失败: " + $.helpResult?.["code"] + ",活动太火爆"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));else $.helpResult?.["code"] == 2 ? (console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["echo"]), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))) : (console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["message"]), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
      }
      if ($.helpResult?.["code"] == 402 || $.helpResult?.["code"] == 400) {
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        break;
      }
      if ($.helpResult?.["code"] == 403) {
        console.log("IP估计黑了，等待30秒，建议更换IP后重试");
        await $.wait(parseInt(Math.random() * 1000 + 30000, 10));
      }
    }
  }
  if ($.isLoon() || $.isQuanX() || $.isSurge()) {
    let iIIIIi11 = IilI1lI() + $.farmInfo?.["farmUserPro"]?.["shareCode"];
    !$.getdata(iIIIIi11) && ($.setdata("", IilI1lI(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo?.["farmUserPro"]?.["shareCode"]), $.setdata("", iIIIIi11));
    if (lI1111lI) {
      if ($.getdata(iIIIIi11)) {
        $.setdata($.getdata(iIIIIi11) + "," + lI1111lI, iIIIIi11);
      } else $.setdata(lI1111lI, iIIIIi11);
    }
    lI1111lI = $.getdata(iIIIIi11);
  }
  if (lI1111lI && lI1111lI.length > 0) {}
  i11iiIII > 0 && console.log("【助力好友👬】获得" + i11iiIII + "g💧\n");
}
async function iI11iil() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var lill1ili = false,
      iillil = "";
    if (lI1lIli) {
      for (let IilliIIi = 0; IilliIIi < lI1lIli.length; IilliIIi++) {
        lI1lIli[IilliIIi].pt_pin == $.UserName && (lill1ili = true, iillil = lI1lIli[IilliIIi].ShareCode);
      }
    }
    if (!lill1ili) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      iI1Iil = true;
      await Ilii1iil();
      if ($.farmInfo?.["farmUserPro"]) {
        var iI1IIIIl = {};
        iillil = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        iI1IIIIl = {
          "pt_pin": $.UserName,
          "ShareCode": iillil
        };
        lI1lIli.push(iI1IIIIl);
        l11i1llI = true;
      }
    }
    iillil ? (console.log("\n" + iillil), liiI1III.push(iillil)) : console.log("\n数据异常，未获取到助力码");
  } catch (ilIli1) {
    $.logErr(ilIli1);
  }
}
async function liiIlIll() {
  return new Promise(ii11Iii1 => {
    const iI1l = {
      "type": 2,
      "version": 6,
      "channel": 2
    };
    $.post(iIiIil1("getFullCollectionReward", iI1l), (l11IIiI1, llIil1lI, IliIIli) => {
      try {
        if (l11IIiI1) {
          console.log("\n东东农场: API查询请求失败 ‼️‼️");
          console.log(JSON.stringify(l11IIiI1));
          $.logErr(l11IIiI1);
        } else {
          if (IIil1I1I(IliIIli)) {
            $.duckRes = JSON.parse(IliIIli);
          }
        }
      } catch (iliIIlIi) {
        $.logErr(iliIIlIi, llIil1lI);
      } finally {
        ii11Iii1();
      }
    });
  });
}
async function l11l1iII() {
  $.totalWaterReward = await l1Illl11("totalWaterTaskForFarm");
}
async function iiilllli() {
  $.firstWaterReward = await l1Illl11("firstWaterTaskForFarm");
}
async function iIIiii1I() {
  $.waterFriendGotAwardRes = await l1Illl11("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}
async function I1iI1iII() {
  $.myCardInfoRes = await l1Illl11("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function il1Illii(i1illI1) {
  $.userMyCardRes = await l1Illl11("userMyCardForFarm", {
    "cardType": i1illI1
  });
}
async function Iillil1(iii1ll1I) {
  $.gotStageAwardForFarmRes = await l1Illl11("gotStageAwardForFarm", {
    "type": iii1ll1I
  });
}
async function I1ll1ll() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await l1Illl11("waterGoodForFarm");
}
async function li1III() {
  $.initForTurntableFarmRes = await l1Illl11("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function lIiii1ll() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await l1Illl11("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}
async function IIiillI1() {
  $.timingAwardRes = await l1Illl11("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function ilIl1li1(IilIl1il, iliIi1ll) {
  IilIl1il === 1 && console.log("浏览爆品会场");
  IilIl1il === 2 && console.log("天天抽奖浏览任务领取水滴");
  const llIl1l1 = {
    "type": IilIl1il,
    "adId": iliIi1ll,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await l1Illl11("browserForTurntableFarm", llIl1l1);
}
async function i11iIil1(l11i1iII) {
  const lilIlili = {
    "type": 2,
    "adId": l11i1iII,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await l1Illl11("browserForTurntableFarm", lilIlili);
}
async function I11i11lI() {
  $.lotteryMasterHelpRes = await l1Illl11("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}
async function l11I1Iil() {
  $.masterGotFinished = await l1Illl11("masterGotFinishedTaskForFarm");
}
async function i111il1l() {
  $.masterHelpResult = await l1Illl11("masterHelpTaskInitForFarm");
}
async function lili1l1() {
  $.farmAssistResult = await l1Illl11("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function lIIiiI1l() {
  $.receiveStageEnergy = await l1Illl11("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function IlllIil1() {
  $.inviteFriendRes = await l1Illl11("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function IlI1ilil() {
  $.helpResult = await l1Illl11("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function IiI1i1i1() {
  const ili1i11i = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await l1Illl11("waterRainForFarm", ili1i11i);
}
async function ililil1I() {
  $.clockInInit = await l1Illl11("clockInInitForFarm");
}
async function l1II1ll1() {
  $.clockInForFarmRes = await l1Illl11("clockInForFarm", {
    "type": 1
  });
}
async function llilIlII(I1Ilil, IIIl111l, l1I1IllI) {
  let IliiliII = {
    "id": I1Ilil,
    "type": IIIl111l,
    "step": l1I1IllI
  };
  if (IIIl111l === "theme") {
    if (l1I1IllI === "1") $.themeStep1 = await l1Illl11("clockInFollowForFarm", IliiliII);else l1I1IllI === "2" && ($.themeStep2 = await l1Illl11("clockInFollowForFarm", IliiliII));
  } else {
    if (IIIl111l === "venderCoupon") {
      if (l1I1IllI === "1") $.venderCouponStep1 = await l1Illl11("clockInFollowForFarm", IliiliII);else {
        if (l1I1IllI === "2") {
          $.venderCouponStep2 = await l1Illl11("clockInFollowForFarm", IliiliII);
        }
      }
    }
  }
}
async function lI1l11I1() {
  $.gotClockInGiftRes = await l1Illl11("gotClockInGift", {
    "type": 2
  });
}
async function illlIIII() {
  $.threeMeal = await l1Illl11("gotThreeMealForFarm");
}
async function IiIIlllI(li1iiili, Ili1l11) {
  if (Ili1l11 === 0) $.browseResult = await l1Illl11("browseAdTaskForFarm", {
    "advertId": li1iiili,
    "type": Ili1l11
  });else Ili1l11 === 1 && ($.browseRwardResult = await l1Illl11("browseAdTaskForFarm", {
    "advertId": li1iiili,
    "type": Ili1l11
  }));
}
async function lIIIIil() {
  $.goalResult = await l1Illl11("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function IiiII11() {
  $.signResult = await l1Illl11("signForFarm");
}
async function Ilii1iil() {
  $.farmInfo = await l1Illl11("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": iii1ii,
    "un_area": Il1I11lI,
    "version": 22,
    "lat": l1Il1i1i,
    "lng": IilI1Ili,
    "channel": 1
  });
}
async function I1il1lll() {
  console.log("\n初始化任务列表");
  $.farmTask = await l1Illl11("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function ili1ll1l() {
  $.friendList = await l1Illl11("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}
async function lIl1I1I1() {
  $.awardInviteFriendRes = await l1Illl11("awardInviteFriendForFarm");
}
async function IiIlilli(I1IIl11) {
  const lIlIlli1 = {
    "shareCode": I1IIl11,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await l1Illl11("waterFriendForFarm", lIlIlli1);
}
async function iiIIiIIi() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + lii1ii === "false";
  if ($.ctrTemp) $.msg($.name, il1l1iii, lIi1ii1l, iiIIilii), $.isNode() && (iIIlllil += il1l1iii + "\n" + lIi1ii1l + ($.index !== Ill111.length ? "\n\n" : ""));else {
    $.log("\n" + lIi1ii1l + "\n");
  }
}
function IilI1lI(IIIiII1i) {
  let I1iI1Ili;
  return IIIiII1i ? I1iI1Ili = new Date(IIIiII1i) : I1iI1Ili = new Date(), I1iI1Ili.getFullYear() + "-" + (I1iI1Ili.getMonth() + 1 >= 10 ? I1iI1Ili.getMonth() + 1 : "0" + (I1iI1Ili.getMonth() + 1)) + "-" + (I1iI1Ili.getDate() >= 10 ? I1iI1Ili.getDate() : "0" + I1iI1Ili.getDate());
}
function IiiiIii() {
  return new Promise(lll1ll1 => {
    console.log("开始获取配置文件\n");
    liliIiI = $.isNode() ? require("./sendNotify") : "";
    const llliI = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(llliI).forEach(l1llilll => {
        llliI[l1llilll] && Ill111.push(llliI[l1llilll]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else Ill111 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I11I1Il($.getdata("CookiesJD") || "[]").map(I1illII1 => I1illII1.cookie)].filter(iIli1ii => !!iIli1ii);
    console.log("共" + Ill111.length + "个京东账号\n");
    $.shareCodesArr = [];
    lll1ll1();
  });
}
function l1Illl11(lIIIIII, l1i1li1i = {}, iI1illII = 1000) {
  return new Promise(II11lil1 => {
    setTimeout(async () => {
      $.post(await iIiIil1(lIIIIII, l1i1li1i), (lIIiilIi, lI1IliI, lIII1111) => {
        try {
          if (lIIiilIi) {
            console.log("\n东东农场: API查询请求失败 ‼️‼️");
            console.log(JSON.stringify(lIIiilIi));
            console.log("function_id:" + lIIIIII);
            $.logErr(lIIiilIi);
          } else IIil1I1I(lIII1111) && (lIII1111 = JSON.parse(lIII1111));
        } catch (ilIlI1lI) {
          $.logErr(ilIlI1lI, lI1IliI);
        } finally {
          II11lil1(lIII1111);
        }
      });
    }, iI1illII);
  });
}
function IIil1I1I(lIiIlI) {
  if (!lIiIlI) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(lIiIlI) == "object") return true;
  } catch (liiI1II1) {
    return console.log(liiI1II1), false;
  }
}
const i1iil1iI = {
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
async function iIiIil1(I1li, l1I1ilI = {}) {
  let lI11iII1 = "";
  if (!i1iil1iI[I1li]) {
    lI11iII1 = "https://api.m.jd.com/client.action?functionId=" + I1li + "&body=" + encodeURIComponent(JSON.stringify(l1I1ilI)) + "&appid=wh5";
    console.log(lI11iII1);
  } else {
    const i1I11ii = {
        "appid": "signed_wh5",
        "client": "iOS",
        "clientVersion": "10.1.0",
        "functionId": I1li,
        "body": l1I1ilI
      },
      li1ll1 = await I1Iii11(i1iil1iI[I1li], i1I11ii);
    lI11iII1 = "https://api.m.jd.com/client.action?" + li1ll1;
  }
  return {
    "url": lI11iII1,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      "Cookie": lI1iIII
    },
    "timeout": 30000
  };
}
async function I1Iii11(IIIIIII1, iIiII11I) {
  try {
    let lliI1 = new ii1llil({
      "appId": IIIIIII1,
      "appid": "signed_wh5",
      "clientVersion": iIiII11I?.["clientVersion"],
      "client": iIiII11I?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await lliI1.genAlgo(), body = await lliI1.genUrlParams(iIiII11I.functionId, iIiII11I.body), body;
  } catch (l1lilIII) {}
}
async function IiliiIIi(i1llI1l1, I1l11111) {
  let i1iIII1i = {
      "searchParams": {
        ...I1l11111,
        "appId": i1llI1l1
      },
      "pt_pin": $.UserName,
      "client": I1l11111?.["client"],
      "clientVersion": I1l11111?.["clientVersion"]
    },
    lI11l1l1 = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    lilli111 = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(i1iIII1i),
      "headers": lI11l1l1,
      "timeout": 30000
    };
  return new Promise(async Ill11lli => {
    $.post(lilli111, (I1i1llI, i1IIlIil, IlI1lii1) => {
      let ili1III = "";
      try {
        if (I1i1llI) {
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {
          IlI1lii1 = JSON.parse(IlI1lii1);
          console.log(JSON.stringify(IlI1lii1));
          if (typeof IlI1lii1 === "object" && IlI1lii1 && IlI1lii1.body) {
            if (IlI1lii1.body) ili1III = IlI1lii1 || "";
          } else IlI1lii1.code == 400 ? console.log("\n" + IlI1lii1.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (IiIIIiII) {
        $.logErr(IiIIIiII, i1IIlIil);
      } finally {
        Ill11lli(iI1IIIli(ili1III));
      }
    });
  });
}
function iI1IIIli(i1ll11lI, IilllI1 = {}) {
  let I1I11II1 = [],
    ili11lII = IilllI1.connector || "&",
    iIllIi1i = Object.keys(i1ll11lI);
  if (IilllI1.sort) iIllIi1i = iIllIi1i.sort();
  for (let l1l1I1l of iIllIi1i) {
    let lilIIiI = i1ll11lI[l1l1I1l];
    if (lilIIiI && typeof lilIIiI === "object") lilIIiI = JSON.stringify(lilIIiI);
    if (lilIIiI && IilllI1.encode) lilIIiI = encodeURIComponent(lilIIiI);
    I1I11II1.push(l1l1I1l + "=" + lilIIiI);
  }
  return I1I11II1.join(ili11lII);
}
function iI11lllI(IllIIl, Ii1ll1 = "qwertyuiopasdfghjklzxcvbnm") {
  let iililIi = "";
  for (let IlIlIIll = 0; IlIlIIll < IllIIl; IlIlIIll++) {
    iililIi += Ii1ll1[Math.floor(Math.random() * Ii1ll1.length)];
  }
  return iililIi;
}
function I11I1Il(IlIli1iI) {
  if (typeof IlIli1iI == "string") {
    try {
      return JSON.parse(IlIli1iI);
    } catch (Iiill11I) {
      return console.log(Iiill11I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}