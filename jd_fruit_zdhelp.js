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

let Ii11l = [],
  liI1I1 = "",
  iIIli1,
  Ii1l1i = "",
  Ii1l1l = [],
  i1Iiil = [],
  i1Iiii = "",
  l1lIi = "",
  l1lili = {};
let IilIl = true;
const i1liI = process.env.jd_fruit_help_pin ? process.env.jd_fruit_help_pin.split("&") : "";
if (process.env.jd_fruit_help_code) {
  if (process.env.jd_fruit_help_code.includes("|")) {
    Ii1l1l = [...process.env.jd_fruit_help_code.split("|"), ...Ii1l1l];
  } else {
    process.env.jd_fruit_help_code.includes("@") ? Ii1l1l = [...process.env.jd_fruit_help_code.split("@"), ...Ii1l1l] : Ii1l1l = [...process.env.jd_fruit_help_code.split("&"), ...Ii1l1l];
  }
}
let iilIIi = "30";
process.env.jd_fruit_help_wait && process.env.jd_fruit_help_wait != 30 && (iilIIi = process.env.jd_fruit_help_wait);
const iiiI1i = require("./function/jdCommon"),
  iiiI1l = require("./function/krgetH5st");
let l1lilI = l1I1II(2, "1234567890") + "-" + l1I1II(4, "1234567890") + "-" + l1I1II(4, "1234567890") + "-" + l1I1II(5, "1234567890"),
  i1Iil1 = "106.475" + Math.floor(Math.random() * 899 + 100),
  liI1Ii = "29.503" + Math.floor(Math.random() * 899 + 100);
const IilII = require("fs");
let ili1l = false,
  i1lii = "./Fruit_ShareCache.json",
  iilIII = IilII.existsSync(i1lii),
  liI1Il = [];
iilIII && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), liI1Il = IilII.readFileSync(i1lii, "utf-8"), liI1Il && (liI1Il = liI1Il.toString(), liI1Il = JSON.parse(liI1Il)));
let I1iIi = 0,
  iiiI1I = false;
!(async () => {
  await iill1i();
  if (!Ii11l[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  if (!i1liI && !process.env.jd_fruit_help_code) {
    console.log("\n下方变量 二选一 \n");
    console.log("\n请先通过环境变量,设置助力账号变量：export jd_fruit_help_pin='pin值' 定义助力账号，多个用 & 隔开\n");
    console.log("\n请先通过环境变量,设置助力码变量：export jd_fruit_help_code='code值' 定义助力码，多个用 | 隔开\n");
    return;
  }
  if (i1liI && process.env.jd_fruit_help_code) {
    console.log("\n检测到环境变量同时存在指定账号变量和指定助力码变量，请调整后运行\n");
    return;
  }
  if (i1liI) {
    krmode = "指定助力账号";
  } else {
    process.env.jd_fruit_help_code && (krmode = "指定助力码");
  }
  console.log("【若多次提示403，务必更换IP运行.....】");
  console.log("【当前助力模式设置，" + krmode + ".....】");
  console.log("【当前助力接口延时设置，" + iilIIi + " 秒.....】");
  if (i1liI) {
    console.log("\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n");
    for (let l1l1i = 0; l1l1i < Ii11l.length; l1l1i++) {
      if (Ii11l[l1l1i]) {
        liI1I1 = Ii11l[l1l1i];
        $.UserName = decodeURIComponent(liI1I1.match(/pt_pin=([^; ]+)(?=;?)/) && liI1I1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = l1l1i + 1;
        $.isLogin = true;
        $.nickName = "";
        i1Iiii = "";
        if (i1liI.includes(encodeURIComponent($.UserName))) {
          console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
          if (!$.isLogin) {
            $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
              "open-url": "https://bean.m.jd.com/bean/signIndex.action"
            });
            $.isNode() && (await iIIli1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
            continue;
          }
          i1Iiii = "";
          l1lIi = "";
          l1lili = {};
          $.UA = iiiI1i.genUA($.UserName);
          $.retry = 0;
          iiiI1I = false;
          await IiIi1();
          if (iiiI1I) {
            await $.wait(2000);
            I1iIi++;
          }
          I1iIi == 10 && (console.log("\n【访问接口次数达到10次，休息一分钟.....】\n"), await $.wait(60000), I1iIi = 0);
        } else {
          continue;
        }
      }
      if (ili1l) {
        var iIIlii = JSON.stringify(liI1Il, null, 2);
        IilII.writeFile(i1lii, iIIlii, function (Ill1II) {
          Ill1II ? (console.log(Ill1II), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
        });
      }
    }
    console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  }
  if (process.env.jd_fruit_help_code) {
    i1Iiil = Ii1l1l;
    console.log("环境变量填写助力码为：" + process.env.jd_fruit_help_code);
  }
  for (let iIlI11 = 0; iIlI11 < Ii11l.length; iIlI11++) {
    if (Ii11l[iIlI11]) {
      liI1I1 = Ii11l[iIlI11];
      $.UserName = decodeURIComponent(liI1I1.match(/pt_pin=([^; ]+)(?=;?)/) && liI1I1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIlI11 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await iIIli1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      i1Iiii = "";
      l1lIi = "";
      l1lili = {};
      $.UA = iiiI1i.genUA($.UserName);
      $.retry = 0;
      I1iIi++;
      await ili1i();
      if (!i1Iiil.length) {
        console.log("\n❖ 没有可助力账号助力码，退出...");
        return;
      }
      I1iIi == 3 && (console.log("\n【访问接口次数达到3次，暂时休整等待 " + iilIIi + " 秒.....】\n"), await $.wait(parseInt(iilIIi, 10) * 1000), I1iIi = 0);
    }
  }
  $.isNode() && Ii1l1i && $.ctrTemp && (await iIIli1.sendNotify("" + $.name, "" + Ii1l1i));
})().catch(iil111 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iil111 + "!", "");
}).finally(() => {
  $.done();
});
async function Ili1II() {
  l1lIi = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await III1Ii();
    if ($.farmInfo?.["farmUserPro"]) {
      await ili1i();
    } else {
      if ($.farmInfo?.["code"] == 3) {
        console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");
      } else {
        if ($.farmInfo?.["code"] == 6) {
          console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");
        } else {
          $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + ($.farmInfo?.["message"] || $.farmInfo?.["msg"]));
        }
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
      $.retry < 1 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await Ili1II());
    }
  } catch (ll11II) {
    $.logErr(ll11II);
  }
}
async function ili1i() {
  await $.wait(2000);
  await III1Ii();
  let Il1I = 0,
    iii1i = 3,
    iii1l = "";
  for (let liIIiI = 0; liIIiI < i1Iiil.length; liIIiI++) {
    console.log("开始助力: " + i1Iiil[liIIiI]);
    if (!i1Iiil) {
      console.log("没有可助力账号助力码，退出...");
      return;
    }
    await IiIiIi(i1Iiil[liIIiI]);
    if ($.helpResult?.["code"] === "0") {
      if ($.helpResult?.["helpResult"]?.["code"] === "0") {
        Il1I += $.helpResult?.["helpResult"]?.["salveHelpAddWater"];
        console.log("【助力好友结果】: 已成功给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力");
        console.log("给好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力获得" + $.helpResult?.["helpResult"]?.["salveHelpAddWater"] + "g水滴");
        iii1l += ($.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] || "匿名用户") + ",";
      } else {
        if ($.helpResult?.["helpResult"]?.["code"] === "8") {
          console.log("【助力好友结果】: 助力【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】失败，您今天助力次数已耗尽");
        } else {
          if ($.helpResult?.["helpResult"]?.["code"] === "9") {
            console.log("【助力好友结果】: 之前给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力过了");
          } else {
            if ($.helpResult?.["helpResult"]?.["code"] === "7") {
              console.log("【助力好友结果】: 不能为自己助力哦");
            } else {
              $.helpResult?.["helpResult"]?.["code"] === "10" ? (console.log("【助力好友结果】: 好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力已满"), i1Iiil.shift()) : console.log("助力其他情况：" + JSON.stringify($.helpResult?.["helpResult"]));
            }
          }
        }
      }
      console.log("【今日助力次数还剩】" + $.helpResult?.["helpResult"]?.["remainTimes"] + "次\n");
      iii1i = $.helpResult?.["helpResult"]?.["remainTimes"];
      if ($.helpResult?.["helpResult"]?.["remainTimes"] === 0) {
        console.log("您当前助力次数已耗尽，跳出助力");
        break;
      }
    } else {
      if ($.helpResult?.["code"] == 3) {
        console.log("助力失败: " + $.helpResult?.["code"] + ",未登录");
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      } else {
        if ($.helpResult?.["code"] == 6) {
          console.log("助力失败: " + $.helpResult?.["code"] + ",活动太火爆");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        } else {
          $.helpResult?.["code"] == 2 ? (console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["echo"]), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))) : (console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["message"]), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
        }
      }
      if ($.helpResult?.["code"] == 402 || $.helpResult?.["code"] == 400) {
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        break;
      }
      $.helpResult?.["code"] == 403 && (console.log("IP估计黑了，等待30秒，建议更换IP后重试"), await $.wait(parseInt(Math.random() * 1000 + 30000, 10)));
    }
  }
  if ($.isLoon() || $.isQuanX() || $.isSurge()) {
    let iIlii1 = IiIiII() + $.farmInfo?.["farmUserPro"]?.["shareCode"];
    !$.getdata(iIlii1) && ($.setdata("", IiIiII(Date.now() - 86400000) + $.farmInfo?.["farmUserPro"]?.["shareCode"]), $.setdata("", iIlii1));
    iii1l && ($.getdata(iIlii1) ? $.setdata($.getdata(iIlii1) + "," + iii1l, iIlii1) : $.setdata(iii1l, iIlii1));
    iii1l = $.getdata(iIlii1);
  }
  iii1l && iii1l.length > 0;
  Il1I > 0 && console.log("【助力好友👬】获得" + Il1I + "g💧\n");
}
async function IiIi1() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var ii1i = false,
      ilIIl1 = "";
    if (liI1Il) {
      for (let i11Ili = 0; i11Ili < liI1Il.length; i11Ili++) {
        liI1Il[i11Ili].pt_pin == $.UserName && (ii1i = true, ilIIl1 = liI1Il[i11Ili].ShareCode);
      }
    }
    if (!ii1i) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      iiiI1I = true;
      await III1Ii();
      if ($.farmInfo?.["farmUserPro"]) {
        var ii1l = {};
        ilIIl1 = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        ii1l = {
          pt_pin: $.UserName,
          ShareCode: ilIIl1
        };
        liI1Il.push(ii1l);
        ili1l = true;
      }
    }
    ilIIl1 ? (console.log("\n" + ilIIl1), i1Iiil.push(ilIIl1)) : console.log("\n数据异常，未获取到助力码");
  } catch (liI1) {
    $.logErr(liI1);
  }
}
async function l1Ii1() {
  return new Promise(IIIlli => {
    const Iii1i1 = {
      type: 2,
      version: 6,
      channel: 2
    };
    $.post(III1II("getFullCollectionReward", Iii1i1), (Il1iII, Iii1iI, lIi1lI) => {
      try {
        Il1iII ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(Il1iII)), $.logErr(Il1iII)) : iill11(lIi1lI) && ($.duckRes = JSON.parse(lIi1lI));
      } catch (liIIll) {
        $.logErr(liIIll, Iii1iI);
      } finally {
        IIIlli();
      }
    });
  });
}
async function i1IilI() {
  $.totalWaterReward = await l1Il1("totalWaterTaskForFarm");
}
async function III1I1() {
  $.firstWaterReward = await l1Il1("firstWaterTaskForFarm");
}
async function ilI111() {
  $.waterFriendGotAwardRes = await l1Il1("waterFriendGotAwardForFarm", {
    version: 4,
    channel: 1
  });
}
async function I1IllI() {
  $.myCardInfoRes = await l1Il1("myCardInfoForFarm", {
    version: 5,
    channel: 1
  });
}
async function IIlI11(llli11) {
  $.userMyCardRes = await l1Il1("userMyCardForFarm", {
    cardType: llli11
  });
}
async function iIIll1(Ili11i) {
  $.gotStageAwardForFarmRes = await l1Il1("gotStageAwardForFarm", {
    type: Ili11i
  });
}
async function llIIII() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await l1Il1("waterGoodForFarm");
}
async function ilI11I() {
  $.initForTurntableFarmRes = await l1Il1("initForTurntableFarm", {
    version: 4,
    channel: 1
  });
}
async function ili1I() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await l1Il1("lotteryForTurntableFarm", {
    type: 1,
    version: 4,
    channel: 1
  });
}
async function iilIIl() {
  $.timingAwardRes = await l1Il1("timingAwardForTurntableFarm", {
    version: 4,
    channel: 1
  });
}
async function i1Iili(lIi1li, Ii1Ii) {
  lIi1li === 1 && console.log("浏览爆品会场");
  lIi1li === 2 && console.log("天天抽奖浏览任务领取水滴");
  const lIi1ll = {
    type: lIi1li,
    adId: Ii1Ii,
    version: 4,
    channel: 1
  };
  $.browserForTurntableFarmRes = await l1Il1("browserForTurntableFarm", lIi1ll);
}
async function i1Iill(iIlili) {
  const Iii1l1 = {
    type: 2,
    adId: iIlili,
    version: 4,
    channel: 1
  };
  $.browserForTurntableFarm2Res = await l1Il1("browserForTurntableFarm", Iii1l1);
}
async function l1IiI() {
  $.lotteryMasterHelpRes = await l1Il1("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-3",
    babelChannel: "3",
    version: 4,
    channel: 1
  });
}
async function l1lill() {
  $.masterGotFinished = await l1Il1("masterGotFinishedTaskForFarm");
}
async function i1li1() {
  $.masterHelpResult = await l1Il1("masterHelpTaskInitForFarm");
}
async function iIIllI() {
  $.farmAssistResult = await l1Il1("farmAssistInit", {
    version: 14,
    channel: 1,
    babelChannel: "120"
  });
}
async function I1Ill1() {
  $.receiveStageEnergy = await l1Il1("receiveStageEnergy", {
    version: 14,
    channel: 1,
    babelChannel: "120"
  });
}
async function ili11() {
  $.inviteFriendRes = await l1Il1("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-inviteFriend",
    version: 4,
    channel: 2
  });
}
async function IiIiIi() {
  $.helpResult = await l1Il1("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0],
    babelChannel: "3",
    version: 2,
    channel: 1
  });
}
async function llIIIl() {
  const lI1iIi = {
    type: 1,
    hongBaoTimes: 100,
    version: 3
  };
  $.waterRain = await l1Il1("waterRainForFarm", lI1iIi);
}
async function IIlI1I() {
  $.clockInInit = await l1Il1("clockInInitForFarm");
}
async function llIIIi() {
  $.clockInForFarmRes = await l1Il1("clockInForFarm", {
    type: 1
  });
}
async function IiIiIl(I1IIil, I1IIii, iIIIlI) {
  let II1l1 = {
    id: I1IIil,
    type: I1IIii,
    step: iIIIlI
  };
  if (I1IIii === "theme") {
    if (iIIIlI === "1") {
      $.themeStep1 = await l1Il1("clockInFollowForFarm", II1l1);
    } else {
      iIIIlI === "2" && ($.themeStep2 = await l1Il1("clockInFollowForFarm", II1l1));
    }
  } else {
    if (I1IIii === "venderCoupon") {
      if (iIIIlI === "1") {
        $.venderCouponStep1 = await l1Il1("clockInFollowForFarm", II1l1);
      } else {
        iIIIlI === "2" && ($.venderCouponStep2 = await l1Il1("clockInFollowForFarm", II1l1));
      }
    }
  }
}
async function I1Ilil() {
  $.gotClockInGiftRes = await l1Il1("gotClockInGift", {
    type: 2
  });
}
async function l1I1I1() {
  $.threeMeal = await l1Il1("gotThreeMealForFarm");
}
async function I1Ilii(l1I1li, li1ii) {
  if (li1ii === 0) {
    $.browseResult = await l1Il1("browseAdTaskForFarm", {
      advertId: l1I1li,
      type: li1ii
    });
  } else {
    li1ii === 1 && ($.browseRwardResult = await l1Il1("browseAdTaskForFarm", {
      advertId: l1I1li,
      type: li1ii
    }));
  }
}
async function l1Iii() {
  $.goalResult = await l1Il1("gotWaterGoalTaskForFarm", {
    type: 3
  });
}
async function l1Iil() {
  $.signResult = await l1Il1("signForFarm");
}
async function III1Ii() {
  $.farmInfo = await l1Il1("initForFarm", {
    babelChannel: "522",
    sid: "",
    un_area: l1lilI,
    version: 25,
    channel: 1,
    lat: liI1Ii,
    lng: i1Iil1
  });
}
async function III1Il() {
  console.log("\n初始化任务列表");
  $.farmTask = await l1Il1("taskInitForFarm", {
    version: 18,
    channel: 1,
    babelChannel: "121"
  });
}
async function iIIliI() {
  $.friendList = await l1Il1("friendListInitForFarm", {
    version: 18,
    channel: 1,
    babelChannel: "45"
  });
}
async function IiIil() {
  $.awardInviteFriendRes = await l1Il1("awardInviteFriendForFarm");
}
async function IiIii(ll1Iii) {
  const ll1Iil = {
    shareCode: ll1Iii,
    version: 18,
    channel: 1,
    babelChannel: "121"
  };
  $.waterFriendForFarmRes = await l1Il1("waterFriendForFarm", ll1Iil);
}
async function iill1l() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
    $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
  } else {
    $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + IilIl === "false";
  }
  $.ctrTemp ? ($.msg($.name, l1lIi, i1Iiii, l1lili), $.isNode() && (Ii1l1i += l1lIi + "\n" + i1Iiii + ($.index !== Ii11l.length ? "\n\n" : ""))) : $.log("\n" + i1Iiii + "\n");
}
function IiIiII(iliiii) {
  let iliiil;
  iliiii ? iliiil = new Date(iliiii) : iliiil = new Date();
  return iliiil.getFullYear() + "-" + (iliiil.getMonth() + 1 >= 10 ? iliiil.getMonth() + 1 : "0" + (iliiil.getMonth() + 1)) + "-" + (iliiil.getDate() >= 10 ? iliiil.getDate() : "0" + iliiil.getDate());
}
function iill1i() {
  return new Promise(iIIIll => {
    console.log("开始获取配置文件\n");
    iIIli1 = $.isNode() ? require("./sendNotify") : "";
    const li1ll = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(li1ll).forEach(i1IiI => {
        li1ll[i1IiI] && Ii11l.push(li1ll[i1IiI]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => {};
      }
    } else {
      Ii11l = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIIlil($.getdata("CookiesJD") || "[]").map(I111 => I111.cookie)].filter(I1I11l => !!I1I11l);
    }
    console.log("共" + Ii11l.length + "个京东账号\n");
    $.shareCodesArr = [];
    iIIIll();
  });
}
function l1Il1(I1I11i, l1iI1l = {}, III1ll = 4000) {
  return new Promise(Ili1iI => {
    setTimeout(async () => {
      $.post(await III1II(I1I11i, l1iI1l), (l1lIII, iII11i, l1iI1i) => {
        try {
          l1lIII ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(l1lIII)), console.log("functionId:" + I1I11i), $.logErr(l1lIII)) : iill11(l1iI1i) && (l1iI1i = JSON.parse(l1iI1i));
        } catch (lIlllI) {
          $.logErr(lIlllI, iII11i);
        } finally {
          Ili1iI(l1iI1i);
        }
      });
    }, III1ll);
  });
}
function iill11(ll1IlI) {
  if (!ll1IlI) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(ll1IlI) == "object") {
      return true;
    }
  } catch (l1ll1I) {
    console.log(l1ll1I);
    return false;
  }
}
const I1IliI = {
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
  guideTaskAward: "59bc4"
};
async function III1II(i1lI1, l1ll11 = {}) {
  let lIllli = "";
  const lIllll = I1IliI[i1lI1];
  if (!lIllll) {
    lIllli = "https://api.m.jd.com/client.action?functionId=" + i1lI1 + "&body=" + encodeURIComponent(JSON.stringify(l1ll11)) + "&appid=wh5";
    console.log(lIllli);
  } else {
    const i1IiIl = await iiiI1l.getH5st({
      appId: lIllll,
      appid: "signed_wh5",
      body: l1ll11,
      client: "iOS",
      clientVersion: "12.2.0",
      functionId: i1lI1,
      cookie: liI1I1,
      ua: $.UA,
      version: "4.2",
      t: true
    });
    lIllli = "https://api.m.jd.com/client.action?" + i1IiIl.params;
  }
  return {
    url: lIllli,
    headers: {
      Host: "api.m.jd.com",
      Accept: "*/*",
      Origin: "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      Referer: "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      Cookie: liI1I1
    },
    timeout: 30000
  };
}
function l1I1II(i1IiIi, ll1Ill = "qwertyuiopasdfghjklzxcvbnm") {
  let i1lII = "";
  for (let Ili1ii = 0; Ili1ii < i1IiIi; Ili1ii++) {
    i1lII += ll1Ill[Math.floor(Math.random() * ll1Ill.length)];
  }
  return i1lII;
}
function iIIlil(lIiIil) {
  if (typeof lIiIil == "string") {
    try {
      return JSON.parse(lIiIil);
    } catch (iIIlIi) {
      console.log(iIIlIi);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
