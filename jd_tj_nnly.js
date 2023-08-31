/*
JOY_COIN_MAXIMIZE =      最大化硬币收益，如果合成后全部挖土后还有空位，则开启此模式（默认开启） 0关闭 1开启

请确保新用户助力过开工位，否则开启游戏了就不算新用户，后面就不能助力开工位了！！！！！！！！！！

如需关闭请添加变量，变量名：HELP_JOYPARK，变量值：false

此游戏黑号严重，所以请自行定时，火爆后停止放置一段时间恢复

做合成 购买等，无助力，无任务

============Quantumultx===============

[task_local]
#特价版-牛牛乐园
1 1 1 1 * jd_tj_nnly.js, tag=特价版-牛牛乐园, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('特价版-牛牛乐园');
const l1iiII = $.isNode() ? require("./jdCookie.js") : "",
  I1lI1I = $.isNode() ? require("./sendNotify") : "",
  l1l11 = require("./function/jdCommon"),
  illill = require("./utils/h5st.js");
let IIIli1 = [],
  I1lI11 = "",
  I1I1Il = false,
  l1l1I = 0;
if ($.isNode()) {
  Object.keys(l1iiII).forEach(iIlI11 => {
    IIIli1.push(l1iiII[iIlI11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIIli1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Illii($.getdata("CookiesJD") || "[]").map(IIII => IIII.cookie)].filter(l1IIlI => !!l1IIlI);
$.JOY_COIN_MAXIMIZE = process.env.JOY_COIN_MAXIMIZE === "1";
$.log("最大化收益模式: 已" + ($.JOY_COIN_MAXIMIZE ? "默认开启" : "关闭") + "  ");
let I1I1Ii = Date.now();
message = "";
!(async () => {
  if (!IIIli1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (process.env.JD_JOY_PARK && process.env.JD_JOY_PARK === "false") {
    console.log("\n******检测到您设置了不运行汪汪乐园，停止运行此脚本******\n");
    return;
  }
  for (let iil11l = 0; iil11l < IIIli1.length; iil11l++) {
    I1I1Il = false;
    l1l1I = 0;
    I1lI11 = IIIli1[iil11l];
    if (I1lI11) {
      $.UserName = decodeURIComponent(I1lI11.match(/pt_pin=([^; ]+)(?=;?)/) && I1lI11.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iil11l + 1;
      $.isLogin = true;
      $.nickName = "";
      $.maxJoyCount = 10;
      $.UA = l1l11.genUA($.UserName);
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await I1lI1I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
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
            let IiIi1l = await IIIl("", 2, $.kgw_invitePin);
            if (IiIi1l) {
              if (IiIi1l.helpState && IiIi1l.helpState === 1) {} else {
                if (IiIi1l.helpState && IiIi1l.helpState === 3) {} else {
                  if (IiIi1l.helpState && IiIi1l.helpState === 2) {} else {}
                }
              }
            }
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      $.hasJoyCoin = true;
      await IIIl("", "", "", true);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if (!$.krbreak) {
        $.activityJoyList = [];
        $.workJoyInfoList = [];
        await IIIi(true);
        await l1IIli();
        await lIi1iI($.workJoyInfoList);
      } else {
        console.log("活动太火爆，跳过");
      }
      try {
        !$.krbreak && (await l1IIll($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await liI11l());
      } catch (ll11Il) {
        $.logErr(ll11Il);
      }
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    }
  }
})().catch(i11lI => $.logErr(i11lI)).finally(() => $.done());
async function IIIl(Illl1 = "", iii1I = "", iliII = "", ii1i1I = false) {
  const iillIl = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": I1I1Ii,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + Illl1 + "\",\"inviteType\":\"" + iii1I + "\",\"inviterPin\":\"" + iliII + "\",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    IiIi1I = await Illil("4abce", iillIl);
  return new Promise(I1lI1l => {
    $.post(i11li(IiIi1I), async (Il1i, lIiIl, iiil1l) => {
      try {
        Il1i ? (console.log("" + JSON.stringify(Il1i)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (iiil1l = JSON.parse(iiil1l), iiil1l && (iiil1l.success ? (ii1i1I && ($.log("等级: " + iiil1l.data.level + "|金币: " + iiil1l.data.joyCoin), iiil1l.data.level >= 30 && $.isNode() && (await I1lI1I.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + iiil1l.data.level + "\n已达到单次最高等级奖励\n请前往京东极速版APP查看使用优惠券\n活动入口：京东极速版APP->我的->汪汪乐园"), $.log("\n开始解锁新场景...\n"), await illiil())), $.joyBaseInfo = iiil1l.data) : $.krbreak = true));
      } catch (liiiIi) {
        $.logErr(liiiIi, lIiIl);
      } finally {
        I1lI1l($.joyBaseInfo);
      }
    });
  });
}
async function IIIi(Iii1li = false) {
  const iIl1i = {
      "functionId": "joyList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": I1I1Ii,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    i11i1 = await Illil("e18ed", iIl1i);
  if (!i11i1) {
    console.log("接口获取失败，跳过");
    return;
  }
  return new Promise(IIiilI => {
    $.get(i11li(i11i1), async (i11Ili, liII, l1IlI1) => {
      try {
        if (i11Ili) console.log("" + JSON.stringify(i11Ili)), console.log($.name + " getJoyList API请求失败，请检查网路重试");else {
          l1IlI1 = JSON.parse(l1IlI1);
          if (Iii1li) {
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态 start =====");
            $.log("在逛街的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let liI1 = 0; liI1 < l1IlI1.data.activityJoyList.length; liI1++) {
              $.log("id:" + l1IlI1.data.activityJoyList[liI1].id + "|name: " + l1IlI1.data.activityJoyList[liI1].name + "|level: " + l1IlI1.data.activityJoyList[liI1].level);
              l1IlI1.data.activityJoyList[liI1].level >= 30 && $.isNode() && (await I1lI1I.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + l1IlI1.data.level + "\n已达到单次最高等级奖励\n请尽快前往活动查看领取\n活动入口：京东极速版APP->汪汪乐园\n"), $.log("\n开始解锁新场景...\n"), await illiil());
            }
            $.log("\n在铲土的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let IliIiI = 0; IliIiI < l1IlI1.data.workJoyInfoList.length; IliIiI++) {
              $.log("工位: " + l1IlI1.data.workJoyInfoList[IliIiI].location + " [" + (l1IlI1.data.workJoyInfoList[IliIiI].unlock ? "已开" : "未开") + "]|joy= " + (l1IlI1.data.workJoyInfoList[IliIiI].joyDTO ? "id:" + l1IlI1.data.workJoyInfoList[IliIiI].joyDTO.id + "|name: " + l1IlI1.data.workJoyInfoList[IliIiI].joyDTO.name + "|level: " + l1IlI1.data.workJoyInfoList[IliIiI].joyDTO.level : "毛都没有"));
            }
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态  end  =====");
          }
          $.activityJoyList = l1IlI1?.["data"]?.["activityJoyList"];
          $.workJoyInfoList = l1IlI1?.["data"]?.["workJoyInfoList"];
        }
      } catch (IIiiiI) {
        $.logErr(IIiiiI, liII);
      } finally {
        IIiilI(l1IlI1.data);
      }
    });
  });
}
async function l1IIli() {
  const i11Il1 = {
      "functionId": "gameShopList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": I1I1Ii,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    IIIlli = await Illil("e18ed", i11Il1);
  return new Promise(lIi1lI => {
    $.post(i11li(IIIlli), async (illiiI, liIl, llli11) => {
      try {
        illiiI ? (console.log("" + JSON.stringify(illiiI)), console.log($.name + " API请求失败，请检查网路重试")) : llli11 = JSON.parse(llli11).data.filter(Ili11l => Ili11l.shopStatus === 1);
      } catch (I1lill) {
        $.logErr(I1lill, liIl);
      } finally {
        lIi1lI(llli11);
      }
    });
  });
}
async function iII1I1(Ili11i, Il1iI1) {
  let Ill1Ii = Il1iI1.filter(iIII1 => iIII1.unlock && iIII1.joyDTO === null);
  if (Ili11i.length !== 0 && Ill1Ii.length !== 0) {
    let iIlilI = Math.max.apply(Math, Ili11i.map(lIilIi => lIilIi.level)),
      i11Ii1 = Ili11i.filter(iIiiIl => iIiiIl.level === iIlilI);
    $.log("下地干活！ joyId= " + i11Ii1[0].id + " location= " + Ill1Ii[0].location);
    await iiiIIl(i11Ii1[0].id, Ill1Ii[0].location);
    await IIIi();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await iII1I1($.activityJoyList, $.workJoyInfoList);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  } else $.JOY_COIN_MAXIMIZE && (await iiiIIi(Ill1Ii), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
}
async function iiiIIi(iIiiIi) {
  if (iIiiIi.length !== 0 && $.hasJoyCoin) {
    $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let liliIi = await IIIl();
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let i1Ili = liliIi.joyCoin;
    $.log("还有" + i1Ili + "金币,看看还能买啥下地");
    let I1iiI1 = await l1IIli();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    let lIiIi1 = false;
    for (let li11l1 = I1iiI1.length - 1; li11l1 >= 0 && li11l1 - 3 >= 0; li11l1--) {
      if (i1Ili > I1iiI1[li11l1].consume) {
        $.log("买一只 " + I1iiI1[li11l1].userLevel + "级的！");
        i1Ili = i1Ili - I1iiI1[li11l1].consume;
        let IIlIIl = await illiii(I1iiI1[li11l1].userLevel);
        if (!IIlIIl.success) break;else lIiIi1 = true, $.hasJoyCoin = false, li11l1++;
      }
    }
    $.hasJoyCoin = false;
    lIiIi1 && (await IIIi(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await iII1I1($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await IIIl(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
  }
}
async function lIi1iI(I1IIiI) {
  if (I1IIiI.filter(li1iI => li1iI.joyDTO).length === 0) return $.log("工位清理完成！"), true;
  for (let I1IIi1 = 0; I1IIi1 < I1IIiI.length; I1IIi1++) {
    I1IIiI[I1IIi1].unlock && I1IIiI[I1IIi1].joyDTO && (await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), $.log("从工位移除 => id:" + I1IIiI[I1IIi1].joyDTO.id + "|name: " + I1IIiI[I1IIi1].joyDTO.name + "|level: " + I1IIiI[I1IIi1].joyDTO.level), await iiiIIl(I1IIiI[I1IIi1].joyDTO.id, 0), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
  }
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await IIIi();
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await lIi1iI($.workJoyInfoList);
}
async function l1IIll(ll1lI1) {
  let liii11 = Math.min.apply(Math, ll1lI1.map(i1IiIl => i1IiIl.level)),
    lIiIii = ll1lI1.filter(i1IiIi => i1IiIi.level === liii11);
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  let i1Ill = await IIIl();
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  !i1Ill.fastBuyLevel && (await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), i1Ill = await IIIl(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
  if (!i1Ill.fastBuyLevel) {
    return $.log("出错，下地后跳出......"), await iII1I1($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), false;
  }
  let Il1I11 = i1Ill.fastBuyLevel;
  if (lIiIii.length >= 2) {
    $.log("开始合成 " + liii11 + " " + lIiIii[0].id + " <=> " + lIiIii[1].id + " 【限流严重，5秒后合成！如失败会重试】");
    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
    await lIIi11(lIiIii[0].id, lIiIii[1].id);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    if (I1I1Il) {
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      i1Ill = await IIIl();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await iII1I1($.activityJoyList, $.workJoyInfoList);
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
      return false;
    }
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await IIIi();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await l1IIll($.activityJoyList);
  } else {
    if (lIiIii.length === 1 && lIiIii[0].level < Il1I11) {
      let iilIii = await illiii(lIiIii[0].level, $.activityJoyList);
      iilIii.success ? (await IIIi(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await l1IIll($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await iII1I1($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    } else {
      $.log("没有需要合成的joy 开始买买买🛒🛒🛒🛒🛒🛒🛒🛒");
      $.log("现在最高可以购买: " + Il1I11 + "  购买 " + Il1I11 + " 的joy   你还有" + i1Ill.joyCoin + "金币");
      let Ili1ii = await illiii(Il1I11, $.activityJoyList);
      Ili1ii.success ? (await IIIi(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await l1IIll($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await iII1I1($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    }
  }
}
async function iiiIIl(IiIili, llIiil) {
  const l1ll1l = {
      "functionId": "joyMove",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": I1I1Ii,
      "appid": "activities_platform",
      "body": "{\"joyId\":" + IiIili + ",\"location\":" + llIiil + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    III1iI = await Illil("50788", l1ll1l);
  return new Promise(III1i1 => {
    $.post(i11li(III1iI), async (l1I1i1, I1IlIi, l1ll1i) => {
      try {
        l1I1i1 ? (console.log("" + JSON.stringify(l1I1i1)), console.log($.name + "  doJoyMove API请求失败，请检查网路重试")) : (llIiil !== 0 && $.log("下地完成了！"), l1ll1i = JSON.parse(l1ll1i));
      } catch (lIlli1) {
        $.logErr(lIlli1, I1IlIi);
      } finally {
        III1i1(l1ll1i.data);
      }
    });
  });
}
async function lIIi11(I1IlII, l1III) {
  const III1l1 = {
      "functionId": "joyMergeGet",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": I1I1Ii,
      "appid": "activities_platform",
      "body": "{\"joyOneId\":" + I1IlII + ",\"joyTwoId\":" + l1III + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    Il111 = await Illil("b08cf", III1l1);
  return new Promise(IiII1 => {
    $.get(i11li(Il111), async (IlIi1i, lIllii, l1il1) => {
      try {
        IlIi1i ? (console.log("" + JSON.stringify(IlIi1i)), console.log($.name + " doJoyMerge API请求失败，请检查网路重试"), l1il1 = {}, I1I1Il = true) : (l1il1 = JSON.parse(l1il1), $.log("合成 " + I1IlII + " <=> " + l1III + " " + (l1il1.success ? "成功！" : "失败！【" + l1il1.errMsg + "】 code=" + l1il1.code)), l1il1.code == "1006" && (l1l1I += 1), l1l1I == 5 && (console.log("失败次数多，避免死循环，跳出！"), I1I1Il = true));
      } catch (iiiIiI) {
        $.logErr(iiiIiI, lIllii);
        I1I1Il = true;
      } finally {
        IiII1(l1il1.data);
      }
    });
  });
}
async function illiii(Ill1i1, illl1I) {
  const Il11i = {
      "functionId": "joyBuy",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": I1I1Ii,
      "appid": "activities_platform",
      "body": "{\"level\":" + Ill1i1 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    illl11 = await Illil("ffb36", Il11i);
  return new Promise(Il11I => {
    $.post(i11li(illl11), async (l1ill, lIi1I1, l1iili) => {
      try {
        if (l1ill) console.log("" + JSON.stringify(l1ill)), console.log($.name + " doJoyBuy API请求失败，请检查网路重试");else {
          l1iili = JSON.parse(l1iili);
          let iiIi = "【不知道啥意思】";
          switch (l1iili.code) {
            case 519:
              iiIi = "【没钱了】";
              break;
            case 518:
              iiIi = "【没空位】";
              if (illl1I) {
                $.log("因为购买 " + Ill1i1 + "级🐶 没空位 所以我要删掉比低级的狗了");
                let iiIl = Math.min.apply(Math, illl1I.map(Iil1I => Iil1I.level));
                await IIIll1(illl1I.filter(illIIl => illIIl.level === iiIl)[0].id);
                await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
              }
              break;
            case 0:
              iiIi = "【OK】";
              break;
          }
          $.log("购买joy level: " + Ill1i1 + " " + (l1iili.success ? "成功！" : "失败！" + l1iili.errMsg + " code=" + l1iili.code) + "  code的意思是=" + iiIi);
        }
      } catch (IllII) {
        $.logErr(IllII, lIi1I1);
      } finally {
        Il11I(l1iili);
      }
    });
  });
}
async function IIIll1(llIiIi) {
  const IIii = {
      "functionId": "joyRecovery",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": I1I1Ii,
      "appid": "activities_platform",
      "body": "{\"level\":" + level + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    i1Ii1I = await Illil("ffb36", IIii);
  return new Promise(iiiIil => {
    $.post(i11li(i1Ii1I), async (lilll, l1iilI, lilli) => {
      try {
        lilll ? (console.log("" + JSON.stringify(lilll)), console.log($.name + " doJoyRecovery API请求失败，请检查网路重试"), lilli = {}) : (lilli = JSON.parse(lilli), $.log("回收🐶 " + (lilli.success ? "成功！" : "失败！【" + lilli.errMsg + "】 code=" + lilli.code)));
      } catch (iiII) {
        $.logErr(iiII, l1iilI);
      } finally {
        iiiIil(lilli);
      }
    });
  });
}
async function illiil() {
  const i1Ii1l = {
      "functionId": "joyRestart",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": I1I1Ii,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    IIll = await Illil("ffb36", i1Ii1l);
  return new Promise(ilI1il => {
    $.post(i11li(IIll), async (i11Ii, iII1I, iilli1) => {
      try {
        i11Ii ? (console.log("" + JSON.stringify(i11Ii)), console.log($.name + " doJoyRestart API请求失败，请检查网路重试")) : (iilli1 = JSON.parse(iilli1), $.log("新场景解锁 " + (iilli1.success ? "成功！" : "失败！【" + iilli1.errMsg + "】 code=" + iilli1.code)));
      } catch (Iil1i) {
        $.logErr(Iil1i, iII1I);
      } finally {
        ilI1il(iilli1);
      }
    });
  });
}
async function liI11l() {
  return new Promise(async l1I1i => {
    const l1I1l = {
        "linkId": "LsQNxL7iWDlXUs6cFl-AAg"
      },
      i11II = {
        "url": "https://api.m.jd.com",
        "body": "functionId=gameMyPrize&body=" + escape(JSON.stringify(l1I1l)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": $.UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": I1lI11
        },
        "timeout": 30 * 1000
      };
    $.post(i11II, async (IlIi1, i1i1il, i1i1ii) => {
      try {
        if (IlIi1) console.log("" + JSON.stringify(IlIi1)), console.log($.name + " API请求失败，请检查网路重试");else {
          i1i1ii = JSON.parse(i1i1ii);
          if (i1i1ii.success && i1i1ii.data) {
            $.Vos = i1i1ii.data.gamePrizeItemVos;
            for (let Il1ili = 0; Il1ili < $.Vos.length; Il1ili++) {
              if ($.Vos[Il1ili].prizeType == 4 && $.Vos[Il1ili].status == 1 && $.Vos[Il1ili].prizeTypeVO.prizeUsed == 0) {
                $.log("当前账号有【" + $.Vos[Il1ili].prizeName + "】可提现");
                $.id = $.Vos[Il1ili].prizeTypeVO.id;
                $.poolBaseId = $.Vos[Il1ili].prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.Vos[Il1ili].prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.Vos[Il1ili].prizeTypeVO.prizeBaseId;
                await l1l1i($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
          }
        }
      } catch (iil1I1) {
        $.logErr(iil1I1, i1i1il);
      } finally {
        l1I1i(i1i1ii);
      }
    });
  });
}
function l1l1i(iI11il, iii111, liiI, liIII1) {
  return new Promise(I1ii1I => {
    const lii1 = {
        "linkId": "LsQNxL7iWDlXUs6cFl-AAg",
        "businessSource": "JOY_PARK",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": iI11il,
          "poolBaseId": iii111,
          "prizeGroupId": liiI,
          "prizeBaseId": liIII1
        }
      },
      iIii1l = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(lii1)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": $.UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": I1lI11
        },
        "timeout": 30 * 1000
      };
    $.post(iIii1l, async (II1i1I, iIliI1, iIii11) => {
      try {
        II1i1I ? (console.log("" + JSON.stringify(II1i1I)), console.log($.name + " API请求失败，请检查网路重试")) : safeGet(iIii11) && (iIii11 = $.toObj(iIii11), iIii11.code === 0 ? iIii11.data.status === "310" ? console.log("提现现金成功！") : console.log("提现现金：失败:" + JSON.stringify(iIii11.data.message)) : console.log("提现现金：异常:" + JSON.stringify(iIii11)));
      } catch (IIllIi) {
        $.logErr(IIllIi, iIliI1);
      } finally {
        I1ii1I(iIii11);
      }
    });
  });
}
function I1I1II() {
  return new Promise(II1i11 => {
    $.get({
      "url": "http://code.kingran.cf/wwly.json",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    }, async (IlillI, I111l1, iIliII) => {
      try {
        IlillI ? (console.log("" + JSON.stringify(IlillI)), console.log($.name + " API请求失败，请检查网路重试")) : $.kgw_invitePin = JSON.parse(iIliII);
      } catch (I1ii11) {
        $.logErr(I1ii11, I111l1);
      } finally {
        II1i11();
      }
    });
  });
}
function i11ll(IlIil) {
  return {
    "url": "https://api.m.jd.com/",
    "body": IlIil,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": I1lI11
    },
    "timeout": 30 * 1000
  };
}
function Ili11I(iil1Ii, iii11i) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + iii11i + (iil1Ii ? "&" + iil1Ii : ""),
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.388006&lat=22.512549&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": I1lI11
    },
    "timeout": 30 * 1000
  };
}
function i11li(l1Ilii) {
  return {
    "url": "https://api.m.jd.com/?" + l1Ilii,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": I1lI11
    },
    "timeout": 30 * 1000
  };
}
async function Illil(l1Ilil, iIili) {
  try {
    let IlIll = new illill({
      "appId": l1Ilil,
      "appid": "activities_platform",
      "clientVersion": iIili?.["clientVersion"],
      "client": iIili?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await IlIll.genAlgo(), body = await IlIll.genUrlParams(iIili.functionId, iIili.body), body;
  } catch (liil) {}
}
async function iil11i(i11l11, IlIli) {
  let iliil1 = {
      "searchParams": {
        ...IlIli,
        "appId": i11l11
      },
      "pt_pin": $.UserName,
      "client": IlIli?.["client"],
      "clientVersion": IlIli?.["clientVersion"]
    },
    i1i1ll = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    IIllI1 = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(iliil1),
      "headers": i1i1ll,
      "timeout": 30000
    };
  return new Promise(async liIIIi => {
    $.post(IIllI1, (lIi1Il, Ii1lII, iliI11) => {
      let ii1iI1 = "";
      try {
        if (lIi1Il) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          iliI11 = JSON.parse(iliI11);
          console.log(JSON.stringify(iliI11));
          if (typeof iliI11 === "object" && iliI11 && iliI11.body) {
            if (iliI11.body) ii1iI1 = iliI11 || "";
          } else iliI11.code == 400 ? console.log("\n" + iliI11.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (IIl111) {
        $.logErr(IIl111, Ii1lII);
      } finally {
        liIIIi(Ill1II(ii1iI1));
      }
    });
  });
}
function Ill1II(Ill1lI, Ii1lI1 = {}) {
  let iliI1I = [],
    ii1iII = Ii1lI1.connector || "&",
    ll1111 = Object.keys(Ill1lI);
  if (Ii1lI1.sort) ll1111 = ll1111.sort();
  for (let IIiIIl of ll1111) {
    let Il1iil = Ill1lI[IIiIIl];
    if (Il1iil && typeof Il1iil === "object") Il1iil = JSON.stringify(Il1iil);
    if (Il1iil && Ii1lI1.encode) Il1iil = encodeURIComponent(Il1iil);
    iliI1I.push(IIiIIl + "=" + Il1iil);
  }
  return iliI1I.join(ii1iII);
}
function llIili(iIiil) {
  iIiil = iIiil || 32;
  let lilI = "abcdef0123456789",
    ll111i = lilI.length,
    l1Ill1 = "";
  for (i = 0; i < iIiil; i++) l1Ill1 += lilI.charAt(Math.floor(Math.random() * ll111i));
  return l1Ill1;
}
function Illii(iliI1l) {
  if (typeof iliI1l == "string") {
    try {
      return JSON.parse(iliI1l);
    } catch (ii1iIl) {
      return console.log(ii1iIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}