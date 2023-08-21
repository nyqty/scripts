/*
JOY_COIN_MAXIMIZE =      最大化硬币收益，如果合成后全部挖土后还有空位，则开启此模式（默认开启） 0关闭 1开启

请确保新用户助力过开工位，否则开启游戏了就不算新用户，后面就不能助力开工位了！！！！！！！！！！

如需关闭请添加变量，变量名：HELP_JOYPARK，变量值：false

此游戏黑号严重，所以请自行定时，火爆后停止放置一段时间恢复

做合成 购买等，无助力，无任务

============Quantumultx===============

[task_local]
#京东版-汪汪庄园
1 1 1 1 * jd_wwzy.js, tag=京东版-汪汪庄园, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('京东版-汪汪庄园');
const liI111 = $.isNode() ? require("./jdCookie.js") : "",
  IiIlI = $.isNode() ? require("./sendNotify") : "",
  iII1Il = require("./function/krgetua");
let IIIliI = [],
  iII1Ii = "",
  iIlI1l = false,
  llIill = 0;
if ($.isNode()) {
  Object.keys(liI111).forEach(illiii => {
    IIIliI.push(liI111[illiii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIIliI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIIi11($.getdata("CookiesJD") || "[]").map(IIIll1 => IIIll1.cookie)].filter(illiil => !!illiil);
$.JOY_COIN_MAXIMIZE = process.env.JOY_COIN_MAXIMIZE === "1";
$.log("最大化收益模式: 已" + ($.JOY_COIN_MAXIMIZE ? "默认开启" : "关闭") + "  ");
let lIIi1I = Date.now();
message = "";
!(async () => {
  if (!IIIliI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (process.env.JD_JOY_PARK && process.env.JD_JOY_PARK === "false") {
    console.log("\n******检测到您设置了不运行，停止运行此脚本******\n");
    return;
  }
  for (let illI1I = 0; illI1I < IIIliI.length; illI1I++) {
    iIlI1l = false;
    llIill = 0;
    iII1Ii = IIIliI[illI1I];
    if (iII1Ii) {
      $.UserName = decodeURIComponent(iII1Ii.match(/pt_pin=([^; ]+)(?=;?)/) && iII1Ii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = illI1I + 1;
      $.isLogin = true;
      $.nickName = "";
      $.maxJoyCount = 10;
      UA = await iII1Il($.UserName);
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IiIlI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.krbreak = false;
      if ($.isNode()) {
        if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") {} else {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
          if ($.kgw_invitePin && $.kgw_invitePin.length) {
            $.kgw_invitePin = [...($.kgw_invitePin || [])][Math.floor(Math.random() * $.kgw_invitePin.length)];
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            let ilI1Il = await l1iiII("", 2, $.kgw_invitePin);
            if (ilI1Il) {
              if (ilI1Il.helpState && ilI1Il.helpState === 1) {} else {
                if (ilI1Il.helpState && ilI1Il.helpState === 3) {} else {
                  if (ilI1Il.helpState && ilI1Il.helpState === 2) {} else {}
                }
              }
            }
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      $.hasJoyCoin = true;
      await l1iiII("", "", "", true);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if (!$.krbreak) {
        $.activityJoyList = [];
        $.workJoyInfoList = [];
        await I1lI1I(true);
        await lIi1i1();
        await IIIli1($.workJoyInfoList);
      } else console.log("活动太火爆，跳过");
      try {
        !$.krbreak && (await I1lI11($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await IIIl());
      } catch (Illl1) {
        $.logErr(Illl1);
      }
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    }
  }
})().catch(ii1i1I => $.logErr(ii1i1I)).finally(() => $.done());
async function l1iiII(liIlI1 = "", iillIl = "", IiIi1I = "", iillIi = false) {
  const iliI1 = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lIIi1I,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + liIlI1 + "\",\"inviteType\":\"" + iillIl + "\",\"inviterPin\":\"" + IiIi1I + "\",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    i11iI = await l1IIll("4abce", iliI1);
  return new Promise(i11ii => {
    $.post(lIi1iI(i11iI), async (lIiIi, Il1i, lIiIl) => {
      try {
        lIiIi ? (console.log("" + JSON.stringify(lIiIi)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (lIiIl = JSON.parse(lIiIl), lIiIl && (lIiIl.success ? (iillIi && ($.log("等级: " + lIiIl.data.level + "|金币: " + lIiIl.data.joyCoin), lIiIl.data.level >= 30 && $.isNode() && (await IiIlI.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + lIiIl.data.level + "\n已达到单次最高等级奖励\n请前往京东APP查看使用优惠券\n活动入口：京东APP->我的->汪汪庄园"), $.log("\n开始解锁新场景...\n"), await IiIl1())), $.joyBaseInfo = lIiIl.data) : $.krbreak = true));
      } catch (IIiill) {
        $.logErr(IIiill, Il1i);
      } finally {
        i11ii($.joyBaseInfo);
      }
    });
  });
}
async function I1lI1I(Iii1lI = false) {
  const liiiIi = {
      "functionId": "joyList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lIIi1I,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    l1I11I = await l1IIll("e18ed", liiiIi);
  if (!l1I11I) {
    console.log("接口获取失败，跳过");
    return;
  }
  return new Promise(l1I11i => {
    $.get(lIi1iI(l1I11I), async (iliiIl, IliIii, liIIl1) => {
      try {
        if (iliiIl) {
          console.log("" + JSON.stringify(iliiIl));
          console.log($.name + " getJoyList API请求失败，请检查网路重试");
        } else {
          liIIl1 = JSON.parse(liIIl1);
          if (Iii1lI) {
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态 start =====");
            $.log("在逛街的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let IIiilI = 0; IIiilI < liIIl1.data.activityJoyList.length; IIiilI++) {
              $.log("id:" + liIIl1.data.activityJoyList[IIiilI].id + "|name: " + liIIl1.data.activityJoyList[IIiilI].name + "|level: " + liIIl1.data.activityJoyList[IIiilI].level);
              liIIl1.data.activityJoyList[IIiilI].level >= 30 && $.isNode() && (await IiIlI.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + liIIl1.data.level + "\n已达到单次最高等级奖励\n请前往京东APP查看使用优惠券\n活动入口：京东APP->我的->汪汪庄园\n"), $.log("\n开始解锁新场景...\n"), await IiIl1());
            }
            $.log("\n在铲土的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let ilIIlI = 0; ilIIlI < liIIl1.data.workJoyInfoList.length; ilIIlI++) {
              $.log("工位: " + liIIl1.data.workJoyInfoList[ilIIlI].location + " [" + (liIIl1.data.workJoyInfoList[ilIIlI].unlock ? "已开" : "未开") + "]|joy= " + (liIIl1.data.workJoyInfoList[ilIIlI].joyDTO ? "id:" + liIIl1.data.workJoyInfoList[ilIIlI].joyDTO.id + "|name: " + liIIl1.data.workJoyInfoList[ilIIlI].joyDTO.name + "|level: " + liIIl1.data.workJoyInfoList[ilIIlI].joyDTO.level : "毛都没有"));
            }
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态  end  =====");
          }
          $.activityJoyList = liIIl1?.["data"]?.["activityJoyList"];
          $.workJoyInfoList = liIIl1?.["data"]?.["workJoyInfoList"];
        }
      } catch (liiiI1) {
        $.logErr(liiiI1, IliIii);
      } finally {
        l1I11i(liIIl1.data);
      }
    });
  });
}
async function lIi1i1() {
  const liII = {
      "functionId": "gameShopList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lIIi1I,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    l1IlI1 = await l1IIll("e18ed", liII);
  return new Promise(Ii1I1 => {
    $.post(lIi1iI(l1IlI1), async (IIIlli, illii1, Iii1i1) => {
      try {
        IIIlli ? (console.log("" + JSON.stringify(IIIlli)), console.log($.name + " API请求失败，请检查网路重试")) : Iii1i1 = JSON.parse(Iii1i1).data.filter(llli1I => llli1I.shopStatus === 1);
      } catch (iIIIi) {
        $.logErr(iIIIi, illii1);
      } finally {
        Ii1I1(Iii1i1);
      }
    });
  });
}
async function l1l11(Il1iII, Iii1iI) {
  let IIiiil = Iii1iI.filter(Ii1Il => Ii1Il.unlock && Ii1Il.joyDTO === null);
  if (Il1iII.length !== 0 && IIiiil.length !== 0) {
    let Iii1ii = Math.max.apply(Math, Il1iII.map(Iii1il => Iii1il.level)),
      l1iiI1 = Il1iII.filter(lIi1li => lIi1li.level === Iii1ii);
    $.log("下地干活！ joyId= " + l1iiI1[0].id + " location= " + IIiiil[0].location);
    await I1I1Il(l1iiI1[0].id, IIiiil[0].location);
    await I1lI1I();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await l1l11($.activityJoyList, $.workJoyInfoList);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  } else $.JOY_COIN_MAXIMIZE && (await illill(IIiiil), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
}
async function illill(Il1iIl) {
  if (Il1iIl.length !== 0 && $.hasJoyCoin) {
    $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let liii1I = await l1iiII();
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let lI1iIi = liii1I.joyCoin;
    $.log("还有" + lI1iIi + "金币,看看还能买啥下地");
    let lIi1l = await lIi1i1();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    let iIIIii = false;
    for (let li11ii = lIi1l.length - 1; li11ii >= 0 && li11ii - 3 >= 0; li11ii--) {
      if (lI1iIi > lIi1l[li11ii].consume) {
        $.log("买一只 " + lIi1l[li11ii].userLevel + "级的！");
        lI1iIi = lI1iIi - lIi1l[li11ii].consume;
        let li1i1 = await iIlI1I(lIi1l[li11ii].userLevel);
        if (!li1i1.success) {
          break;
        } else {
          iIIIii = true;
          $.hasJoyCoin = false;
          li11ii++;
        }
      }
    }
    $.hasJoyCoin = false;
    if (iIIIii) {
      await I1lI1I();
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
      await l1l11($.activityJoyList, $.workJoyInfoList);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await l1iiII();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    }
  }
}
async function IIIli1(iIIIlI) {
  if (iIIIlI.filter(iIIIi1 => iIIIi1.joyDTO).length === 0) {
    return $.log("工位清理完成！"), true;
  }
  for (let ilIliI = 0; ilIliI < iIIIlI.length; ilIliI++) {
    iIIIlI[ilIliI].unlock && iIIIlI[ilIliI].joyDTO && (await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), $.log("从工位移除 => id:" + iIIIlI[ilIliI].joyDTO.id + "|name: " + iIIIlI[ilIliI].joyDTO.name + "|level: " + iIIIlI[ilIliI].joyDTO.level), await I1I1Il(iIIIlI[ilIliI].joyDTO.id, 0), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
  }
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await I1lI1I();
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await IIIli1($.workJoyInfoList);
}
async function I1lI11(Ii1lIi) {
  let ll1lII = Math.min.apply(Math, Ii1lIi.map(iII11l => iII11l.level)),
    Ii1lIl = Ii1lIi.filter(i1IiI1 => i1IiI1.level === ll1lII);
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  let iIIIiI = await l1iiII();
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  !iIIIiI.fastBuyLevel && (await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), iIIIiI = await l1iiII(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
  if (!iIIIiI.fastBuyLevel) return $.log("出错，下地后跳出......"), await l1l11($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), false;
  let li1iI = iIIIiI.fastBuyLevel;
  if (Ii1lIl.length >= 2) {
    $.log("开始合成 " + ll1lII + " " + Ii1lIl[0].id + " <=> " + Ii1lIl[1].id + " 【限流严重，5秒后合成！如失败会重试】");
    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
    await l1l1I(Ii1lIl[0].id, Ii1lIl[1].id);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    if (iIlI1l) {
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      iIIIiI = await l1iiII();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await l1l11($.activityJoyList, $.workJoyInfoList);
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
      return false;
    }
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await I1lI1I();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await I1lI11($.activityJoyList);
  } else {
    if (Ii1lIl.length === 1 && Ii1lIl[0].level < li1iI) {
      let III1lI = await iIlI1I(Ii1lIl[0].level, $.activityJoyList);
      III1lI.success ? (await I1lI1I(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await I1lI11($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await l1l11($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    } else {
      $.log("没有需要合成的joy 开始买买买🛒🛒🛒🛒🛒🛒🛒🛒");
      $.log("现在最高可以购买: " + li1iI + "  购买 " + li1iI + " 的joy   你还有" + iIIIiI.joyCoin + "金币");
      let ll1IlI = await iIlI1I(li1iI, $.activityJoyList);
      ll1IlI.success ? (await I1lI1I(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await I1lI11($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await l1l11($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    }
  }
}
async function I1I1Il(I11l, Ili1l1) {
  const illI1i = {
      "functionId": "joyMove",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lIIi1I,
      "appid": "activities_platform",
      "body": "{\"joyId\":" + I11l + ",\"location\":" + Ili1l1 + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    i1IiII = await l1IIll("50788", illI1i);
  return new Promise(I1I111 => {
    $.post(lIi1iI(i1IiII), async (lIllli, lIllll, I11I) => {
      try {
        lIllli ? (console.log("" + JSON.stringify(lIllli)), console.log($.name + "  doJoyMove API请求失败，请检查网路重试")) : (Ili1l1 !== 0 && $.log("下地完成了！"), I11I = JSON.parse(I11I));
      } catch (i1IiIl) {
        $.logErr(i1IiIl, lIllll);
      } finally {
        I1I111(I11I.data);
      }
    });
  });
}
async function l1l1I(ll1Ill, Ili1il) {
  const iilIii = {
      "functionId": "joyMergeGet",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lIIi1I,
      "appid": "activities_platform",
      "body": "{\"joyOneId\":" + ll1Ill + ",\"joyTwoId\":" + Ili1il + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    iII111 = await l1IIll("b08cf", iilIii);
  return new Promise(iIIlIi => {
    $.get(lIi1iI(iII111), async (iilIll, iilIli, IlIi1I) => {
      try {
        iilIll ? (console.log("" + JSON.stringify(iilIll)), console.log($.name + " doJoyMerge API请求失败，请检查网路重试"), IlIi1I = {}, iIlI1l = true) : (IlIi1I = JSON.parse(IlIi1I), $.log("合成 " + ll1Ill + " <=> " + Ili1il + " " + (IlIi1I.success ? "成功！" : "失败！【" + IlIi1I.errMsg + "】 code=" + IlIi1I.code)), IlIi1I.code == "1006" && (llIill += 1), llIill == 5 && (console.log("失败次数多，避免死循环，跳出！"), iIlI1l = true));
      } catch (lIiIl1) {
        $.logErr(lIiIl1, iilIli);
        iIlI1l = true;
      } finally {
        iIIlIi(IlIi1I.data);
      }
    });
  });
}
async function iIlI1I(III1i1, IlI1) {
  const l1I1i1 = {
      "functionId": "joyBuy",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lIIi1I,
      "appid": "activities_platform",
      "body": "{\"level\":" + III1i1 + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    I1IlIi = await l1IIll("ffb36", l1I1i1);
  return new Promise(Il111 => {
    $.post(lIi1iI(I1IlIi), async (lIiIli, IiIII, IiIiii) => {
      try {
        if (lIiIli) {
          console.log("" + JSON.stringify(lIiIli));
          console.log($.name + " doJoyBuy API请求失败，请检查网路重试");
        } else {
          IiIiii = JSON.parse(IiIiii);
          let lIlliI = "【不知道啥意思】";
          switch (IiIiii.code) {
            case 519:
              lIlliI = "【没钱了】";
              break;
            case 518:
              lIlliI = "【没空位】";
              if (IlI1) {
                $.log("因为购买 " + III1i1 + "级🐶 没空位 所以我要删掉比低级的狗了");
                let iIIlI1 = Math.min.apply(Math, IlI1.map(IiIiil => IiIiil.level));
                await I1I1Ii(IlI1.filter(IlIi => IlIi.level === iIIlI1)[0].id);
                await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
              }
              break;
            case 0:
              lIlliI = "【OK】";
              break;
          }
          $.log("购买joy level: " + III1i1 + " " + (IiIiii.success ? "成功！" : "失败！" + IiIiii.errMsg + " code=" + IiIiii.code) + "  code的意思是=" + lIlliI);
        }
      } catch (IlIl) {
        $.logErr(IlIl, IiIII);
      } finally {
        Il111(IiIiii);
      }
    });
  });
}
async function I1I1Ii(l1IIi) {
  const l1I1il = {
      "functionId": "joyRecovery",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lIIi1I,
      "appid": "activities_platform",
      "body": "{\"level\":" + level + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    III1ii = await l1IIll("ffb36", l1I1il);
  return new Promise(l1iil1 => {
    $.post(lIi1iI(III1ii), async (illl11, iiI1, Il11l) => {
      try {
        illl11 ? (console.log("" + JSON.stringify(illl11)), console.log($.name + " doJoyRecovery API请求失败，请检查网路重试"), Il11l = {}) : (Il11l = JSON.parse(Il11l), $.log("回收🐶 " + (Il11l.success ? "成功！" : "失败！【" + Il11l.errMsg + "】 code=" + Il11l.code)));
      } catch (l1iiii) {
        $.logErr(l1iiii, iiI1);
      } finally {
        l1iil1(Il11l);
      }
    });
  });
}
async function IiIl1() {
  const Il11I = {
      "functionId": "joyRestart",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lIIi1I,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    li1lll = await l1IIll("ffb36", Il11I);
  return new Promise(lIi1I1 => {
    $.post(lIi1iI(li1lll), async (l1iili, illIIi, iiIi) => {
      try {
        l1iili ? (console.log("" + JSON.stringify(l1iili)), console.log($.name + " doJoyRestart API请求失败，请检查网路重试")) : (iiIi = JSON.parse(iiIi), $.log("新场景解锁 " + (iiIi.success ? "成功！" : "失败！【" + iiIi.errMsg + "】 code=" + iiIi.code)));
      } catch (illIIl) {
        $.logErr(illIIl, illIIi);
      } finally {
        lIi1I1(iiIi);
      }
    });
  });
}
async function IIIl() {
  return new Promise(async Iil11 => {
    const i11I1 = {
        "linkId": "99DZNpaCTAv8f4TuKXr0Ew"
      },
      IlIiI = {
        "url": "https://api.m.jd.com",
        "body": "functionId=gameMyPrize&body=" + escape(JSON.stringify(i11I1)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": iII1Ii
        },
        "timeout": 30 * 1000
      };
    $.post(IlIiI, async (l1iI1I, ilI1i1, l1I1I) => {
      try {
        if (l1iI1I) {
          console.log("" + JSON.stringify(l1iI1I));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          l1I1I = JSON.parse(l1I1I);
          if (l1I1I.success && l1I1I.data) {
            $.Vos = l1I1I.data.gamePrizeItemVos;
            for (let l1I1i = 0; l1I1i < $.Vos.length; l1I1i++) {
              if ($.Vos[l1I1i].prizeType == 4 && $.Vos[l1I1i].status == 1 && $.Vos[l1I1i].prizeTypeVO.prizeUsed == 0) {
                $.log("当前账号有【" + $.Vos[l1I1i].prizeName + "】可提现");
                $.id = $.Vos[l1I1i].prizeTypeVO.id;
                $.poolBaseId = $.Vos[l1I1i].prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.Vos[l1I1i].prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.Vos[l1I1i].prizeTypeVO.prizeBaseId;
                await IIIi($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
          }
        }
      } catch (Il1ill) {
        $.logErr(Il1ill, ilI1i1);
      } finally {
        Iil11(l1I1I);
      }
    });
  });
}
function IIIi(iI11ii, IIllII, iil1I1, iI11il) {
  return new Promise(I111ii => {
    const I1liII = {
        "linkId": "99DZNpaCTAv8f4TuKXr0Ew",
        "businessSource": "JOY_PARK",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": iI11ii,
          "poolBaseId": IIllII,
          "prizeGroupId": iil1I1,
          "prizeBaseId": iI11il
        }
      },
      I1ii1I = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(I1liII)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": iII1Ii
        },
        "timeout": 30 * 1000
      };
    $.post(I1ii1I, async (iIliI1, iIii11, i1i1lI) => {
      try {
        if (iIliI1) {
          console.log("" + JSON.stringify(iIliI1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (safeGet(i1i1lI)) {
            i1i1lI = $.toObj(i1i1lI);
            if (i1i1lI.code === 0) {
              i1i1lI.data.status === "310" ? console.log("提现现金成功！") : console.log("提现现金：失败:" + JSON.stringify(i1i1lI.data.message));
            } else console.log("提现现金：异常:" + JSON.stringify(i1i1lI));
          }
        }
      } catch (iI11lI) {
        $.logErr(iI11lI, iIii11);
      } finally {
        I111ii(i1i1lI);
      }
    });
  });
}
function l1IIli() {
  return new Promise(i1i1li => {
    $.get({
      "url": "http://code.kingran.cf/wwly.json",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    }, async (I111i1, lIl1i1, l1Ilil) => {
      try {
        I111i1 ? (console.log("" + JSON.stringify(I111i1)), console.log($.name + " API请求失败，请检查网路重试")) : $.kgw_invitePin = JSON.parse(l1Ilil);
      } catch (i11l11) {
        $.logErr(i11l11, lIl1i1);
      } finally {
        i1i1li();
      }
    });
  });
}
function iII1I1(lIl1iI) {
  return {
    "url": "https://api.m.jd.com/",
    "body": lIl1iI,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": iII1Ii
    },
    "timeout": 30 * 1000
  };
}
function iiiIIi(iI11iI, l1IliI) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + l1IliI + (iI11iI ? "&" + iI11iI : ""),
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.388006&lat=22.512549&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": iII1Ii
    },
    "timeout": 30 * 1000
  };
}
function lIi1iI(iIilI) {
  return {
    "url": "https://api.m.jd.com/?" + iIilI,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": iII1Ii
    },
    "timeout": 30 * 1000
  };
}
async function l1IIll(IlIlI, IIil1I) {
  let II1i1i = {
      "appId": IlIlI,
      ...IIil1I,
      "ua": UA,
      "pin": $.UserName
    },
    Il1iiI = {
      "url": "http://kr.kingran.cf/h5st",
      "body": JSON.stringify(II1i1i),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30 * 1000
    };
  return new Promise(async Ii1lI1 => {
    $.post(Il1iiI, (iliI1I, ii1iII, ll1111) => {
      let liIl11 = "";
      try {
        if (iliI1I) console.log($.name + " geth5st API请求失败，请检查网路重试");else {
          ll1111 = JSON.parse(ll1111);
          if (typeof ll1111 === "object" && ll1111 && ll1111.body) {
            if (ll1111.body) liIl11 = ll1111.body || "";
          } else ll1111.code == 400 ? console.log("\n" + ll1111.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (illII1) {
        $.logErr(illII1, ii1iII);
      } finally {
        Ii1lI1(liIl11);
      }
    });
  });
}
function iiiIIl(iIiii) {
  iIiii = iIiii || 32;
  let Il1iil = "abcdef0123456789",
    iIiil = Il1iil.length,
    IIiIIi = "";
  for (i = 0; i < iIiii; i++) IIiIIi += Il1iil.charAt(Math.floor(Math.random() * iIiil));
  return IIiIIi;
}
function lIIi11(illIII) {
  if (typeof illIII == "string") {
    try {
      return JSON.parse(illIII);
    } catch (IIl11i) {
      return console.log(IIl11i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}