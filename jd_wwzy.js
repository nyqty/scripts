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
const IlliI = $.isNode() ? require("./jdCookie.js") : "",
  I1I1I1 = $.isNode() ? require("./sendNotify") : "",
  Ili111 = require("./function/jdCommon"),
  Il11 = require("./utils/h5st.js");
let iiil11 = [],
  llII1I = "",
  ilI1II = false,
  iillI1 = 0;
if ($.isNode()) {
  Object.keys(IlliI).forEach(iii1I => {
    iiil11.push(IlliI[iii1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iiil11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Illl1($.getdata("CookiesJD") || "[]").map(iliII => iliII.cookie)].filter(ii1i1I => !!ii1i1I);
$.JOY_COIN_MAXIMIZE = process.env.JOY_COIN_MAXIMIZE === "1";
$.log("最大化收益模式: 已" + ($.JOY_COIN_MAXIMIZE ? "默认开启" : "关闭") + "  ");
let IlllI = Date.now();
message = "";
!(async () => {
  if (!iiil11[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (process.env.JD_JOY_PARK && process.env.JD_JOY_PARK === "false") {
    console.log("\n******检测到您设置了不运行，停止运行此脚本******\n");
    return;
  }
  for (let l1I11i = 0; l1I11i < iiil11.length; l1I11i++) {
    ilI1II = false;
    iillI1 = 0;
    llII1I = iiil11[l1I11i];
    if (llII1I) {
      $.UserName = decodeURIComponent(llII1I.match(/pt_pin=([^; ]+)(?=;?)/) && llII1I.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1I11i + 1;
      $.isLogin = true;
      $.nickName = "";
      $.maxJoyCount = 10;
      $.UA = Ili111.genUA($.UserName);
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await I1I1I1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
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
            let ii1i = await ii1i11("", 2, $.kgw_invitePin);
            if (ii1i) {
              if (ii1i.helpState && ii1i.helpState === 1) {} else {
                if (ii1i.helpState && ii1i.helpState === 3) {} else {
                  if (ii1i.helpState && ii1i.helpState === 2) {} else {}
                }
              }
            }
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      $.hasJoyCoin = true;
      await ii1i11("", "", "", true);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      !$.krbreak ? ($.activityJoyList = [], $.workJoyInfoList = [], await ll11II(true), await liIlII(), await iii1l($.workJoyInfoList)) : console.log("活动太火爆，跳过");
      try {
        if (!$.krbreak) {
          await iliIi($.activityJoyList);
          await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
          await iil11l();
        }
      } catch (liIIlI) {
        $.logErr(liIIlI);
      }
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    }
  }
})().catch(i11Ill => $.logErr(i11Ill)).finally(() => $.done());
async function ii1i11(iliiIl = "", IliIii = "", liIIl1 = "", iIliiI = false) {
  const I1lii1 = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": IlllI,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + iliiIl + "\",\"inviteType\":\"" + IliIii + "\",\"inviterPin\":\"" + liIIl1 + "\",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    ilIIlI = await illI11("4abce", I1lii1);
  return new Promise(IIiiiI => {
    $.post(ilI1Il(ilIIlI), async (lIi1l1, i11IlI, Ii1I1) => {
      try {
        lIi1l1 ? (console.log("" + JSON.stringify(lIi1l1)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (Ii1I1 = JSON.parse(Ii1I1), Ii1I1 && (Ii1I1.success ? (iIliiI && ($.log("等级: " + Ii1I1.data.level + "|金币: " + Ii1I1.data.joyCoin), Ii1I1.data.level >= 30 && $.isNode() && (await I1I1I1.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + Ii1I1.data.level + "\n已达到单次最高等级奖励\n请前往京东APP查看使用优惠券\n活动入口：京东APP->我的->汪汪庄园"), $.log("\n开始解锁新场景...\n"), await llII1l())), $.joyBaseInfo = Ii1I1.data) : $.krbreak = true));
      } catch (Iii1i1) {
        $.logErr(Iii1i1, i11IlI);
      } finally {
        IIiiiI($.joyBaseInfo);
      }
    });
  });
}
async function ll11II(IlilI1 = false) {
  const Il1iII = {
      "functionId": "joyList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": IlllI,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    Iii1iI = await illI11("e18ed", Il1iII);
  if (!Iii1iI) {
    console.log("接口获取失败，跳过");
    return;
  }
  return new Promise(i11Iil => {
    $.get(ilI1Il(Iii1iI), async (IlilIl, iIlili, Ii1II) => {
      try {
        if (IlilIl) console.log("" + JSON.stringify(IlilIl)), console.log($.name + " getJoyList API请求失败，请检查网路重试");else {
          Ii1II = JSON.parse(Ii1II);
          if (IlilI1) {
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态 start =====");
            $.log("在逛街的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let iIiiIl = 0; iIiiIl < Ii1II.data.activityJoyList.length; iIiiIl++) {
              $.log("id:" + Ii1II.data.activityJoyList[iIiiIl].id + "|name: " + Ii1II.data.activityJoyList[iIiiIl].name + "|level: " + Ii1II.data.activityJoyList[iIiiIl].level);
              Ii1II.data.activityJoyList[iIiiIl].level >= 30 && $.isNode() && (await I1I1I1.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + Ii1II.data.level + "\n已达到单次最高等级奖励\n请前往京东APP查看使用优惠券\n活动入口：京东APP->我的->汪汪庄园\n"), $.log("\n开始解锁新场景...\n"), await llII1l());
            }
            $.log("\n在铲土的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let iIiiIi = 0; iIiiIi < Ii1II.data.workJoyInfoList.length; iIiiIi++) {
              $.log("工位: " + Ii1II.data.workJoyInfoList[iIiiIi].location + " [" + (Ii1II.data.workJoyInfoList[iIiiIi].unlock ? "已开" : "未开") + "]|joy= " + (Ii1II.data.workJoyInfoList[iIiiIi].joyDTO ? "id:" + Ii1II.data.workJoyInfoList[iIiiIi].joyDTO.id + "|name: " + Ii1II.data.workJoyInfoList[iIiiIi].joyDTO.name + "|level: " + Ii1II.data.workJoyInfoList[iIiiIi].joyDTO.level : "毛都没有"));
            }
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态  end  =====");
          }
          $.activityJoyList = Ii1II?.["data"]?.["activityJoyList"];
          $.workJoyInfoList = Ii1II?.["data"]?.["workJoyInfoList"];
        }
      } catch (liliI1) {
        $.logErr(liliI1, iIlili);
      } finally {
        i11Iil(Ii1II.data);
      }
    });
  });
}
async function liIlII() {
  const IIll11 = {
      "functionId": "gameShopList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": IlllI,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    ll1lIl = await illI11("e18ed", IIll11);
  return new Promise(IIll1I => {
    $.post(ilI1Il(ll1lIl), async (I1iiIl, liliII, lI1iIl) => {
      try {
        I1iiIl ? (console.log("" + JSON.stringify(I1iiIl)), console.log($.name + " API请求失败，请检查网路重试")) : lI1iIl = JSON.parse(lI1iIl).data.filter(iIiiII => iIiiII.shopStatus === 1);
      } catch (ilIll1) {
        $.logErr(ilIll1, liliII);
      } finally {
        IIll1I(lI1iIl);
      }
    });
  });
}
async function Il1I(iIIIlI, li11i1) {
  let liii1i = li11i1.filter(l1I1li => l1I1li.unlock && l1I1li.joyDTO === null);
  if (iIIIlI.length !== 0 && liii1i.length !== 0) {
    let li1ii = Math.max.apply(Math, iIIIlI.map(iIIIi1 => iIIIi1.level)),
      lI1iI1 = iIIIlI.filter(lIiIiI => lIiIiI.level === li1ii);
    $.log("下地干活！ joyId= " + lI1iI1[0].id + " location= " + liii1i[0].location);
    await iiil1I(lI1iI1[0].id, liii1i[0].location);
    await ll11II();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await Il1I($.activityJoyList, $.workJoyInfoList);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  } else $.JOY_COIN_MAXIMIZE && (await iii1i(liii1i), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
}
async function iii1i(II1li) {
  if (II1li.length !== 0 && $.hasJoyCoin) {
    $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let li1l1 = await ii1i11();
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let IIiI1l = li1l1.joyCoin;
    $.log("还有" + IIiI1l + "金币,看看还能买啥下地");
    let IIiI1i = await liIlII();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    let ilIllI = false;
    for (let I1IIli = IIiI1i.length - 1; I1IIli >= 0 && I1IIli - 3 >= 0; I1IIli--) {
      if (IIiI1l > IIiI1i[I1IIli].consume) {
        $.log("买一只 " + IIiI1i[I1IIli].userLevel + "级的！");
        IIiI1l = IIiI1l - IIiI1i[I1IIli].consume;
        let lIilI1 = await lIiI1(IIiI1i[I1IIli].userLevel);
        if (!lIilI1.success) {
          break;
        } else ilIllI = true, $.hasJoyCoin = false, I1IIli++;
      }
    }
    $.hasJoyCoin = false;
    if (ilIllI) {
      await ll11II();
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
      await Il1I($.activityJoyList, $.workJoyInfoList);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await ii1i11();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    }
  }
}
async function iii1l(i1Ii1) {
  if (i1Ii1.filter(iII11i => iII11i.joyDTO).length === 0) {
    return $.log("工位清理完成！"), true;
  }
  for (let lIlllI = 0; lIlllI < i1Ii1.length; lIlllI++) {
    i1Ii1[lIlllI].unlock && i1Ii1[lIlllI].joyDTO && (await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), $.log("从工位移除 => id:" + i1Ii1[lIlllI].joyDTO.id + "|name: " + i1Ii1[lIlllI].joyDTO.name + "|level: " + i1Ii1[lIlllI].joyDTO.level), await iiil1I(i1Ii1[lIlllI].joyDTO.id, 0), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
  }
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await ll11II();
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await iii1l($.workJoyInfoList);
}
async function iliIi(I11i) {
  let I11l = Math.min.apply(Math, I11i.map(I1IlI1 => I1IlI1.level)),
    Ili1l1 = I11i.filter(i1111 => i1111.level === I11l);
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  let iilIil = await ii1i11();
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  !iilIil.fastBuyLevel && (await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), iilIil = await ii1i11(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
  if (!iilIil.fastBuyLevel) return $.log("出错，下地后跳出......"), await Il1I($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), false;
  let illI1i = iilIil.fastBuyLevel;
  if (Ili1l1.length >= 2) {
    $.log("开始合成 " + I11l + " " + Ili1l1[0].id + " <=> " + Ili1l1[1].id + " 【限流严重，5秒后合成！如失败会重试】");
    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
    await llII11(Ili1l1[0].id, Ili1l1[1].id);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    if (ilI1II) {
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      iilIil = await ii1i11();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await Il1I($.activityJoyList, $.workJoyInfoList);
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
      return false;
    }
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await ll11II();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await iliIi($.activityJoyList);
  } else {
    if (Ili1l1.length === 1 && Ili1l1[0].level < illI1i) {
      let lIllii = await lIiI1(Ili1l1[0].level, $.activityJoyList);
      lIllii.success ? (await ll11II(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await iliIi($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await Il1I($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    } else {
      $.log("没有需要合成的joy 开始买买买🛒🛒🛒🛒🛒🛒🛒🛒");
      $.log("现在最高可以购买: " + illI1i + "  购买 " + illI1i + " 的joy   你还有" + iilIil.joyCoin + "金币");
      let l1il1 = await lIiI1(illI1i, $.activityJoyList);
      l1il1.success ? (await ll11II(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await iliIi($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await Il1I($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    }
  }
}
async function iiil1I(IIiI, l1iil1) {
  const Ill1i1 = {
      "functionId": "joyMove",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": IlllI,
      "appid": "activities_platform",
      "body": "{\"joyId\":" + IIiI + ",\"location\":" + l1iil1 + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    illl1I = await illI11("50788", Ill1i1);
  return new Promise(I1i1I => {
    $.post(ilI1Il(illl1I), async (IIl1, l1ili, i1Ii11) => {
      try {
        if (IIl1) console.log("" + JSON.stringify(IIl1)), console.log($.name + "  doJoyMove API请求失败，请检查网路重试");else {
          l1iil1 !== 0 && $.log("下地完成了！");
          i1Ii11 = JSON.parse(i1Ii11);
        }
      } catch (Ill1ii) {
        $.logErr(Ill1ii, l1ili);
      } finally {
        I1i1I(i1Ii11.data);
      }
    });
  });
}
async function llII11(IIlI, I1i1l) {
  const IIil = {
      "functionId": "joyMergeGet",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": IlllI,
      "appid": "activities_platform",
      "body": "{\"joyOneId\":" + IIlI + ",\"joyTwoId\":" + I1i1l + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    IIii = await illI11("b08cf", IIil);
  return new Promise(lilli => {
    $.get(ilI1Il(IIii), async (iiII, Iil11, Ill1iI) => {
      try {
        if (iiII) console.log("" + JSON.stringify(iiII)), console.log($.name + " doJoyMerge API请求失败，请检查网路重试"), Ill1iI = {}, ilI1II = true;else {
          Ill1iI = JSON.parse(Ill1iI);
          $.log("合成 " + IIlI + " <=> " + I1i1l + " " + (Ill1iI.success ? "成功！" : "失败！【" + Ill1iI.errMsg + "】 code=" + Ill1iI.code));
          Ill1iI.code == "1006" && (iillI1 += 1);
          if (iillI1 == 5) {
            console.log("失败次数多，避免死循环，跳出！");
            ilI1II = true;
          }
        }
      } catch (iilliI) {
        $.logErr(iilliI, Iil11);
        ilI1II = true;
      } finally {
        lilli(Ill1iI.data);
      }
    });
  });
}
async function lIiI1(iII1l, ilI1il) {
  const i11Ii = {
      "functionId": "joyBuy",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": IlllI,
      "appid": "activities_platform",
      "body": "{\"level\":" + iII1l + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    iII1I = await illI11("ffb36", i11Ii);
  return new Promise(l1I11 => {
    $.post(ilI1Il(iII1I), async (IlIiI, l1iI1I, ilI1i1) => {
      try {
        if (IlIiI) console.log("" + JSON.stringify(IlIiI)), console.log($.name + " doJoyBuy API请求失败，请检查网路重试");else {
          ilI1i1 = JSON.parse(ilI1i1);
          let l1lII1 = "【不知道啥意思】";
          switch (ilI1i1.code) {
            case 519:
              l1lII1 = "【没钱了】";
              break;
            case 518:
              l1lII1 = "【没空位】";
              if (ilI1il) {
                $.log("因为购买 " + iII1l + "级🐶 没空位 所以我要删掉比低级的狗了");
                let iilllI = Math.min.apply(Math, ilI1il.map(i1i1iI => i1i1iI.level));
                await IiIi1i(ilI1il.filter(iillil => iillil.level === iilllI)[0].id);
                await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
              }
              break;
            case 0:
              l1lII1 = "【OK】";
              break;
          }
          $.log("购买joy level: " + iII1l + " " + (ilI1i1.success ? "成功！" : "失败！" + ilI1i1.errMsg + " code=" + ilI1i1.code) + "  code的意思是=" + l1lII1);
        }
      } catch (iillii) {
        $.logErr(iillii, l1iI1I);
      } finally {
        l1I11(ilI1i1);
      }
    });
  });
}
async function IiIi1i(ilI1iI) {
  const l1I1l = {
      "functionId": "joyRecovery",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": IlllI,
      "appid": "activities_platform",
      "body": "{\"level\":" + level + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    i11II = await illI11("ffb36", l1I1l);
  return new Promise(liiI => {
    $.post(ilI1Il(i11II), async (liIII1, I111il, l1Ili1) => {
      try {
        liIII1 ? (console.log("" + JSON.stringify(liIII1)), console.log($.name + " doJoyRecovery API请求失败，请检查网路重试"), l1Ili1 = {}) : (l1Ili1 = JSON.parse(l1Ili1), $.log("回收🐶 " + (l1Ili1.success ? "成功！" : "失败！【" + l1Ili1.errMsg + "】 code=" + l1Ili1.code)));
      } catch (I1liII) {
        $.logErr(I1liII, I111il);
      } finally {
        liiI(l1Ili1);
      }
    });
  });
}
async function llII1l() {
  const lii1 = {
      "functionId": "joyRestart",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": IlllI,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    iIii1l = await illI11("ffb36", lii1);
  return new Promise(iIliI1 => {
    $.post(ilI1Il(iIii1l), async (i11l1l, IIllIl, i11l1i) => {
      try {
        i11l1l ? (console.log("" + JSON.stringify(i11l1l)), console.log($.name + " doJoyRestart API请求失败，请检查网路重试")) : (i11l1i = JSON.parse(i11l1i), $.log("新场景解锁 " + (i11l1i.success ? "成功！" : "失败！【" + i11l1i.errMsg + "】 code=" + i11l1i.code)));
      } catch (iI11lI) {
        $.logErr(iI11lI, IIllIl);
      } finally {
        iIliI1(i11l1i);
      }
    });
  });
}
async function iil11l() {
  return new Promise(async l1Ilil => {
    const i11l1I = {
        "linkId": "99DZNpaCTAv8f4TuKXr0Ew"
      },
      iil1Il = {
        "url": "https://api.m.jd.com",
        "body": "functionId=gameMyPrize&body=" + escape(JSON.stringify(i11l1I)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": $.UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": llII1I
        },
        "timeout": 30 * 1000
      };
    $.post(iil1Il, async (IlIlI, IIil1I, II1i1l) => {
      try {
        if (IlIlI) console.log("" + JSON.stringify(IlIlI)), console.log($.name + " API请求失败，请检查网路重试");else {
          II1i1l = JSON.parse(II1i1l);
          if (II1i1l.success && II1i1l.data) {
            $.Vos = II1i1l.data.gamePrizeItemVos;
            for (let Il1iiI = 0; Il1iiI < $.Vos.length; Il1iiI++) {
              if ($.Vos[Il1iiI].prizeType == 4 && $.Vos[Il1iiI].status == 1 && $.Vos[Il1iiI].prizeTypeVO.prizeUsed == 0) {
                $.log("当前账号有【" + $.Vos[Il1iiI].prizeName + "】可提现");
                $.id = $.Vos[Il1iiI].prizeTypeVO.id;
                $.poolBaseId = $.Vos[Il1iiI].prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.Vos[Il1iiI].prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.Vos[Il1iiI].prizeTypeVO.prizeBaseId;
                await IiIi1l($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
          }
        }
      } catch (iiilII) {
        $.logErr(iiilII, IIil1I);
      } finally {
        l1Ilil(II1i1l);
      }
    });
  });
}
function IiIi1l(lIi1Il, Ii1lII, iliI11, ii1iI1) {
  return new Promise(i11IIl => {
    const i11IIi = {
        "linkId": "99DZNpaCTAv8f4TuKXr0Ew",
        "businessSource": "JOY_PARK",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": lIi1Il,
          "poolBaseId": Ii1lII,
          "prizeGroupId": iliI11,
          "prizeBaseId": ii1iI1
        }
      },
      Il1ii1 = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(i11IIi)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": $.UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": llII1I
        },
        "timeout": 30 * 1000
      };
    $.post(Il1ii1, async (illII1, Il1iii, iIiii) => {
      try {
        if (illII1) console.log("" + JSON.stringify(illII1)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (safeGet(iIiii)) {
            iIiii = $.toObj(iIiii);
            iIiii.code === 0 ? iIiii.data.status === "310" ? console.log("提现现金成功！") : console.log("提现现金：失败:" + JSON.stringify(iIiii.data.message)) : console.log("提现现金：异常:" + JSON.stringify(iIiii));
          }
        }
      } catch (lil1) {
        $.logErr(lil1, Il1iii);
      } finally {
        i11IIl(iIiii);
      }
    });
  });
}
function llII1i() {
  return new Promise(IIl11i => {
    $.get({
      "url": "http://code.kingran.cf/wwly.json",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    }, async (ii1iIl, Ill1l1, Ilili1) => {
      try {
        ii1iIl ? (console.log("" + JSON.stringify(ii1iIl)), console.log($.name + " API请求失败，请检查网路重试")) : $.kgw_invitePin = JSON.parse(Ilili1);
      } catch (l1iiiI) {
        $.logErr(l1iiiI, Ill1l1);
      } finally {
        IIl11i();
      }
    });
  });
}
function illI1I(lIi11) {
  return {
    "url": "https://api.m.jd.com/",
    "body": lIi11,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": llII1I
    },
    "timeout": 30 * 1000
  };
}
function ilI1Ii(l1iii1, iiilIl) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + iiilIl + (l1iii1 ? "&" + l1iii1 : ""),
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.388006&lat=22.512549&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": llII1I
    },
    "timeout": 30 * 1000
  };
}
function ilI1Il(iiilIi) {
  return {
    "url": "https://api.m.jd.com/?" + iiilIi,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": llII1I
    },
    "timeout": 30 * 1000
  };
}
async function illI11(liIl1i, liIl1l) {
  try {
    let lIi1I = new Il11({
      "appId": liIl1i,
      "appid": "activities_platform",
      "clientVersion": liIl1l?.["clientVersion"],
      "client": liIl1l?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await lIi1I.genAlgo(), body = await lIi1I.genUrlParams(liIl1l.functionId, liIl1l.body), body;
  } catch (Ii1111) {}
}
async function ll11Ii(Ill1li, Ililii) {
  let I1liIi = {
      "searchParams": {
        ...Ililii,
        "appId": Ill1li
      },
      "pt_pin": $.UserName,
      "client": Ililii?.["client"],
      "clientVersion": Ililii?.["clientVersion"]
    },
    I1ii1i = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    I1ii1l = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(I1liIi),
      "headers": I1ii1i,
      "timeout": 30000
    };
  return new Promise(async iIlll => {
    $.post(I1ii1l, (liII11, I1II, iiii1) => {
      let I1IIIi = "";
      try {
        if (liII11) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          iiii1 = JSON.parse(iiii1);
          console.log(JSON.stringify(iiii1));
          if (typeof iiii1 === "object" && iiii1 && iiii1.body) {
            if (iiii1.body) I1IIIi = iiii1 || "";
          } else iiii1.code == 400 ? console.log("\n" + iiii1.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (l1li11) {
        $.logErr(l1li11, I1II);
      } finally {
        iIlll(ll11Il(I1IIIi));
      }
    });
  });
}
function ll11Il(il1Il1, li11II = {}) {
  let iIiIli = [],
    iIllI = li11II.connector || "&",
    iIiIl1 = Object.keys(il1Il1);
  if (li11II.sort) iIiIl1 = iIiIl1.sort();
  for (let iIiIlI of iIiIl1) {
    let liII1i = il1Il1[iIiIlI];
    if (liII1i && typeof liII1i === "object") liII1i = JSON.stringify(liII1i);
    if (liII1i && li11II.encode) liII1i = encodeURIComponent(liII1i);
    iIiIli.push(iIiIlI + "=" + liII1i);
  }
  return iIiIli.join(iIllI);
}
function i11lI(iIiIil) {
  iIiIil = iIiIil || 32;
  let lI1i = "abcdef0123456789",
    i11 = lI1i.length,
    Ii1llI = "";
  for (i = 0; i < iIiIil; i++) Ii1llI += lI1i.charAt(Math.floor(Math.random() * i11));
  return Ii1llI;
}
function Illl1(IIlIl1) {
  if (typeof IIlIl1 == "string") {
    try {
      return JSON.parse(IIlIl1);
    } catch (I1Ii) {
      return console.log(I1Ii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}