/*
JOY_COIN_MAXIMIZE =      最大化硬币收益，如果合成后全部挖土后还有空位，则开启此模式（默认开启） 0关闭 1开启

请确保新用户助力过开工位，否则开启游戏了就不算新用户，后面就不能助力开工位了！！！！！！！！！！

如需关闭请添加变量，变量名：HELP_JOYPARK，变量值：false

此游戏黑号严重，所以请自行定时，火爆后停止放置一段时间恢复

地址：https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw

做合成 购买等，无助力，无任务

============Quantumultx===============

[task_local]
#京东极简版-汪汪乐园
1 1 1 1 * jd_jj_wwly.js, tag=京东极简版-汪汪乐园, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('京东极简版-汪汪乐园');
const iII1I1 = $.isNode() ? require("./jdCookie.js") : "",
  iiiIIi = $.isNode() ? require("./sendNotify") : "",
  l1IIll = require("./function/krgetua");
let iiiIIl = [],
  lIIi11 = "",
  illiii = false,
  IIIll1 = 0;
if ($.isNode()) {
  Object.keys(iII1I1).forEach(IiIli => {
    iiiIIl.push(iII1I1[IiIli]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iiiIIl = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...illilI($.getdata("CookiesJD") || "[]").map(illil1 => illil1.cookie)].filter(IIIlii => !!IIIlii);
$.JOY_COIN_MAXIMIZE = process.env.JOY_COIN_MAXIMIZE === "1";
$.log("最大化收益模式: 已" + ($.JOY_COIN_MAXIMIZE ? "默认开启" : "关闭") + "  ");
let liI11l = Date.now();
message = "";
!(async () => {
  if (!iiiIIl[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (process.env.JD_JOY_PARK && process.env.JD_JOY_PARK === "false") {
    console.log("\n******检测到您设置了不运行，停止运行此脚本******\n");
    return;
  }
  for (let iillII = 0; iillII < iiiIIl.length; iillII++) {
    illiii = false;
    IIIll1 = 0;
    lIIi11 = iiiIIl[iillII];
    if (lIIi11) {
      $.UserName = decodeURIComponent(lIIi11.match(/pt_pin=([^; ]+)(?=;?)/) && lIIi11.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iillII + 1;
      $.isLogin = true;
      $.nickName = "";
      $.maxJoyCount = 10;
      UA = await l1IIll($.UserName);
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await iiiIIi.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
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
            let i11il = await I1I1II("", 2, $.kgw_invitePin);
            if (i11il) {
              if (i11il.helpState && i11il.helpState === 1) {} else {
                if (i11il.helpState && i11il.helpState === 3) {} else {
                  if (i11il.helpState && i11il.helpState === 2) {} else {}
                }
              }
            }
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      $.hasJoyCoin = true;
      await I1I1II("", "", "", true);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      !$.krbreak ? ($.activityJoyList = [], $.workJoyInfoList = [], await i11ll(true), await Ili11I(), await iil11i($.workJoyInfoList)) : console.log("活动太火爆，跳过");
      try {
        !$.krbreak && (await Ill1II($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await iil111());
      } catch (I1lI1l) {
        $.logErr(I1lI1l);
      }
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    }
  }
})().catch(lIiIi => $.logErr(lIiIi)).finally(() => $.done());
async function I1I1II(Il1i = "", lIiIl = "", iiil1l = "", Il1l = false) {
  const Illll = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": liI11l,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + Il1i + "\",\"inviteType\":\"" + lIiIl + "\",\"inviterPin\":\"" + iiil1l + "\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    iiil1i = await liI11i("4abce", Illll);
  return new Promise(i11i1 => {
    $.post(lIi1il(iiil1i), async (iIlii1, IIiil1, l1IlII) => {
      try {
        iIlii1 ? (console.log("" + JSON.stringify(iIlii1)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (l1IlII = JSON.parse(l1IlII), l1IlII && (l1IlII.success ? (Il1l && ($.log("等级: " + l1IlII.data.level + "|金币: " + l1IlII.data.joyCoin), l1IlII.data.level >= 30 && $.isNode() && (await iiiIIi.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + l1IlII.data.level + "\n已达到单次最高等级奖励\n请前往京东APP查看使用优惠券\n活动入口：京东极简版-汪汪乐园"), $.log("\n开始解锁新场景...\n"), await l1IIlI())), $.joyBaseInfo = l1IlII.data) : $.krbreak = true));
      } catch (iIl1I) {
        $.logErr(iIl1I, IIiil1);
      } finally {
        i11i1($.joyBaseInfo);
      }
    });
  });
}
async function i11ll(iliiIi = false) {
  const iliiIl = {
      "functionId": "joyList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": liI11l,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    IliIii = await liI11i("e18ed", iliiIl);
  if (!IliIii) {
    console.log("接口获取失败，跳过");
    return;
  }
  return new Promise(l1IlI1 => {
    $.get(lIi1il(IliIii), async (IIIlll, llli1I, IlilI1) => {
      try {
        if (IIIlll) {
          console.log("" + JSON.stringify(IIIlll));
          console.log($.name + " getJoyList API请求失败，请检查网路重试");
        } else {
          IlilI1 = JSON.parse(IlilI1);
          if (iliiIi) {
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态 start =====");
            $.log("在逛街的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let Iii1iI = 0; Iii1iI < IlilI1.data.activityJoyList.length; Iii1iI++) {
              $.log("id:" + IlilI1.data.activityJoyList[Iii1iI].id + "|name: " + IlilI1.data.activityJoyList[Iii1iI].name + "|level: " + IlilI1.data.activityJoyList[Iii1iI].level);
              IlilI1.data.activityJoyList[Iii1iI].level >= 30 && $.isNode() && (await iiiIIi.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + IlilI1.data.level + "\n已达到单次最高等级奖励\n请前往京东APP查看使用优惠券\n活动入口：京东极简版-汪汪乐园\n"), $.log("\n开始解锁新场景...\n"), await l1IIlI());
            }
            $.log("\n在铲土的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let IIiiil = 0; IIiiil < IlilI1.data.workJoyInfoList.length; IIiiil++) {
              $.log("工位: " + IlilI1.data.workJoyInfoList[IIiiil].location + " [" + (IlilI1.data.workJoyInfoList[IIiiil].unlock ? "已开" : "未开") + "]|joy= " + (IlilI1.data.workJoyInfoList[IIiiil].joyDTO ? "id:" + IlilI1.data.workJoyInfoList[IIiiil].joyDTO.id + "|name: " + IlilI1.data.workJoyInfoList[IIiiil].joyDTO.name + "|level: " + IlilI1.data.workJoyInfoList[IIiiil].joyDTO.level : "毛都没有"));
            }
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态  end  =====");
          }
          $.activityJoyList = IlilI1?.["data"]?.["activityJoyList"];
          $.workJoyInfoList = IlilI1?.["data"]?.["workJoyInfoList"];
        }
      } catch (liIIll) {
        $.logErr(liIIll, llli1I);
      } finally {
        l1IlI1(IlilI1.data);
      }
    });
  });
}
async function Ili11I() {
  const l1IlIl = {
      "functionId": "gameShopList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": liI11l,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    liIIli = await liI11i("e18ed", l1IlIl);
  return new Promise(Il1iI1 => {
    $.post(lIi1il(liIIli), async (Ill1Ii, Ill1Il, iIIII) => {
      try {
        if (Ill1Ii) {
          console.log("" + JSON.stringify(Ill1Ii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else iIIII = JSON.parse(iIIII).data.filter(l1iiI1 => l1iiI1.shopStatus === 1);
      } catch (Iii1il) {
        $.logErr(Iii1il, Ill1Il);
      } finally {
        Il1iI1(iIIII);
      }
    });
  });
}
async function i11li(Il1iIl, lIi1ll) {
  let IlilIi = lIi1ll.filter(ilIlil => ilIlil.unlock && ilIlil.joyDTO === null);
  if (Il1iIl.length !== 0 && IlilIi.length !== 0) {
    let Ii1IiI = Math.max.apply(Math, Il1iIl.map(ll1lIl => ll1lIl.level)),
      IIll11 = Il1iIl.filter(I1IIl1 => I1IIl1.level === Ii1IiI);
    $.log("下地干活！ joyId= " + IIll11[0].id + " location= " + IlilIi[0].location);
    await llIili(IIll11[0].id, IlilIi[0].location);
    await i11ll();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await i11li($.activityJoyList, $.workJoyInfoList);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  } else $.JOY_COIN_MAXIMIZE && (await Illil(IlilIi), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
}
async function Illil(ll1lIi) {
  if (ll1lIi.length !== 0 && $.hasJoyCoin) {
    $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let ilIli1 = await I1I1II();
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let li11lI = ilIli1.joyCoin;
    $.log("还有" + li11lI + "金币,看看还能买啥下地");
    let l1I1ll = await Ili11I();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    let li1il = false;
    for (let l1I1li = l1I1ll.length - 1; l1I1li >= 0 && l1I1li - 3 >= 0; l1I1li--) {
      if (li11lI > l1I1ll[l1I1li].consume) {
        $.log("买一只 " + l1I1ll[l1I1li].userLevel + "级的！");
        li11lI = li11lI - l1I1ll[l1I1li].consume;
        let lI1iI1 = await iIlI11(l1I1ll[l1I1li].userLevel);
        if (!lI1iI1.success) break;else {
          li1il = true;
          $.hasJoyCoin = false;
          l1I1li++;
        }
      }
    }
    $.hasJoyCoin = false;
    if (li1il) {
      await i11ll();
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
      await i11li($.activityJoyList, $.workJoyInfoList);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await I1I1II();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    }
  }
}
async function iil11i(II1li) {
  if (II1li.filter(i1Iil => i1Iil.joyDTO).length === 0) {
    return $.log("工位清理完成！"), true;
  }
  for (let i1Iii = 0; i1Iii < II1li.length; i1Iii++) {
    II1li[i1Iii].unlock && II1li[i1Iii].joyDTO && (await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), $.log("从工位移除 => id:" + II1li[i1Iii].joyDTO.id + "|name: " + II1li[i1Iii].joyDTO.name + "|level: " + II1li[i1Iii].joyDTO.level), await llIili(II1li[i1Iii].joyDTO.id, 0), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
  }
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await i11ll();
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await iil11i($.workJoyInfoList);
}
async function Ill1II(i1IlI) {
  let lIl1Il = Math.min.apply(Math, i1IlI.map(I1I111 => I1I111.level)),
    Ii1IlI = i1IlI.filter(lIllli => lIllli.level === lIl1Il);
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  let Il1I1I = await I1I1II();
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  !Il1I1I.fastBuyLevel && (await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), Il1I1I = await I1I1II(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
  if (!Il1I1I.fastBuyLevel) {
    return $.log("出错，下地后跳出......"), await i11li($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), false;
  }
  let ll1Il1 = Il1I1I.fastBuyLevel;
  if (Ii1IlI.length >= 2) {
    $.log("开始合成 " + lIl1Il + " " + Ii1IlI[0].id + " <=> " + Ii1IlI[1].id + " 【限流严重，5秒后合成！如失败会重试】");
    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
    await Illii(Ii1IlI[0].id, Ii1IlI[1].id);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    if (illiii) return await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), Il1I1I = await I1I1II(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await i11li($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), false;
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await i11ll();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await Ill1II($.activityJoyList);
  } else {
    if (Ii1IlI.length === 1 && Ii1IlI[0].level < ll1Il1) {
      let i1IiIl = await iIlI11(Ii1IlI[0].level, $.activityJoyList);
      i1IiIl.success ? (await i11ll(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await Ill1II($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await i11li($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    } else {
      $.log("没有需要合成的joy 开始买买买🛒🛒🛒🛒🛒🛒🛒🛒");
      $.log("现在最高可以购买: " + ll1Il1 + "  购买 " + ll1Il1 + " 的joy   你还有" + Il1I1I.joyCoin + "金币");
      let i1IiIi = await iIlI11(ll1Il1, $.activityJoyList);
      i1IiIi.success ? (await i11ll(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await Ill1II($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await i11li($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    }
  }
}
async function llIili(ll1Ill, Ili1il) {
  const iilIii = {
      "functionId": "joyMove",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": liI11l,
      "appid": "activities_platform",
      "body": "{\"joyId\":" + ll1Ill + ",\"location\":" + Ili1il + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    iII111 = await liI11i("50788", iilIii);
  return new Promise(iilIl1 => {
    $.post(lIi1il(iII111), async (III1i1, IlI1, I1IlIl) => {
      try {
        if (III1i1) {
          console.log("" + JSON.stringify(III1i1));
          console.log($.name + "  doJoyMove API请求失败，请检查网路重试");
        } else {
          Ili1il !== 0 && $.log("下地完成了！");
          I1IlIl = JSON.parse(I1IlIl);
        }
      } catch (I1IlII) {
        $.logErr(I1IlII, IlI1);
      } finally {
        iilIl1(I1IlIl.data);
      }
    });
  });
}
async function Illii(IiIiii, lIiIll) {
  const iIIlI1 = {
      "functionId": "joyMergeGet",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": liI11l,
      "appid": "activities_platform",
      "body": "{\"joyOneId\":" + IiIiii + ",\"joyTwoId\":" + lIiIll + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    IiIiil = await liI11i("b08cf", iIIlI1);
  return new Promise(I1IlI1 => {
    $.get(lIi1il(IiIiil), async (IlIi1l, IiIiiI, IlIi1i) => {
      try {
        IlIi1l ? (console.log("" + JSON.stringify(IlIi1l)), console.log($.name + " doJoyMerge API请求失败，请检查网路重试"), IlIi1i = {}, illiii = true) : (IlIi1i = JSON.parse(IlIi1i), $.log("合成 " + IiIiii + " <=> " + lIiIll + " " + (IlIi1i.success ? "成功！" : "失败！【" + IlIi1i.errMsg + "】 code=" + IlIi1i.code)), IlIi1i.code == "1006" && (IIIll1 += 1), IIIll1 == 5 && (console.log("失败次数多，避免死循环，跳出！"), illiii = true));
      } catch (IIiI) {
        $.logErr(IIiI, IiIiiI);
        illiii = true;
      } finally {
        I1IlI1(IlIi1i.data);
      }
    });
  });
}
async function iIlI11(l1iil1, iiiIiI) {
  const illl1I = {
      "functionId": "joyBuy",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": liI11l,
      "appid": "activities_platform",
      "body": "{\"level\":" + l1iil1 + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    lillI = await liI11i("ffb36", illl1I);
  return new Promise(iiiIi1 => {
    $.post(lIi1il(lillI), async (l1iill, l1ill, lIi1I1) => {
      try {
        if (l1iill) {
          console.log("" + JSON.stringify(l1iill));
          console.log($.name + " doJoyBuy API请求失败，请检查网路重试");
        } else {
          lIi1I1 = JSON.parse(lIi1I1);
          let Iil1I = "【不知道啥意思】";
          switch (lIi1I1.code) {
            case 519:
              Iil1I = "【没钱了】";
              break;
            case 518:
              Iil1I = "【没空位】";
              if (iiiIiI) {
                $.log("因为购买 " + l1iil1 + "级🐶 没空位 所以我要删掉比低级的狗了");
                let iiiIlI = Math.min.apply(Math, iiiIiI.map(I1i11 => I1i11.level));
                await IIII(iiiIiI.filter(Ill1ii => Ill1ii.level === iiiIlI)[0].id);
                await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
              }
              break;
            case 0:
              Iil1I = "【OK】";
              break;
          }
          $.log("购买joy level: " + l1iil1 + " " + (lIi1I1.success ? "成功！" : "失败！" + lIi1I1.errMsg + " code=" + lIi1I1.code) + "  code的意思是=" + Iil1I);
        }
      } catch (IllII) {
        $.logErr(IllII, l1ill);
      } finally {
        iiiIi1(lIi1I1);
      }
    });
  });
}
async function IIII(I1i1l) {
  const IIil = {
      "functionId": "joyRecovery",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": liI11l,
      "appid": "activities_platform",
      "body": "{\"level\":" + level + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    IIii = await liI11i("ffb36", IIil);
  return new Promise(iiiIii => {
    $.post(lIi1il(IIii), async (Ill1iI, i1Ii1l, IIll) => {
      try {
        Ill1iI ? (console.log("" + JSON.stringify(Ill1iI)), console.log($.name + " doJoyRecovery API请求失败，请检查网路重试"), IIll = {}) : (IIll = JSON.parse(IIll), $.log("回收🐶 " + (IIll.success ? "成功！" : "失败！【" + IIll.errMsg + "】 code=" + IIll.code)));
      } catch (iiiIll) {
        $.logErr(iiiIll, i1Ii1l);
      } finally {
        iiiIii(IIll);
      }
    });
  });
}
async function l1IIlI() {
  const ilI1ii = {
      "functionId": "joyRestart",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": liI11l,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
    iII1l = await liI11i("ffb36", ilI1ii);
  return new Promise(IllIi => {
    $.post(lIi1il(iII1l), async (l1I1I, l1lII1, iilllI) => {
      try {
        l1I1I ? (console.log("" + JSON.stringify(l1I1I)), console.log($.name + " doJoyRestart API请求失败，请检查网路重试")) : (iilllI = JSON.parse(iilllI), $.log("新场景解锁 " + (iilllI.success ? "成功！" : "失败！【" + iilllI.errMsg + "】 code=" + iilllI.code)));
      } catch (ilI1iI) {
        $.logErr(ilI1iI, l1lII1);
      } finally {
        IllIi(iilllI);
      }
    });
  });
}
async function iil111() {
  return new Promise(async l1Ili1 => {
    const iliili = {
        "linkId": "jBNXcoiASxGof0f2RFI2Sw"
      },
      iliill = {
        "url": "https://api.m.jd.com",
        "body": "functionId=gameMyPrize&body=" + escape(JSON.stringify(iliili)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": lIIi11
        },
        "timeout": 30 * 1000
      };
    $.post(iliill, async (I111ii, Ililll, I1liII) => {
      try {
        if (I111ii) {
          console.log("" + JSON.stringify(I111ii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          I1liII = JSON.parse(I1liII);
          if (I1liII.success && I1liII.data) {
            $.Vos = I1liII.data.gamePrizeItemVos;
            for (let lii1 = 0; lii1 < $.Vos.length; lii1++) {
              if ($.Vos[lii1].prizeType == 4 && $.Vos[lii1].status == 1 && $.Vos[lii1].prizeTypeVO.prizeUsed == 0) {
                $.log("当前账号有【" + $.Vos[lii1].prizeName + "】可提现");
                $.id = $.Vos[lii1].prizeTypeVO.id;
                $.poolBaseId = $.Vos[lii1].prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.Vos[lii1].prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.Vos[lii1].prizeTypeVO.prizeBaseId;
                await llIil1($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
          }
        }
      } catch (IIil1l) {
        $.logErr(IIil1l, Ililll);
      } finally {
        l1Ili1(I1liII);
      }
    });
  });
}
function llIil1(i1i1l1, iIii1i, IIil1i, IlIl1) {
  return new Promise(iIii1I => {
    const I1ii11 = {
        "linkId": "jBNXcoiASxGof0f2RFI2Sw",
        "businessSource": "JOY_PARK",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": i1i1l1,
          "poolBaseId": iIii1i,
          "prizeGroupId": IIil1i,
          "prizeBaseId": IlIl1
        }
      },
      IlIil = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(I1ii11)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": lIIi11
        },
        "timeout": 30 * 1000
      };
    $.post(IlIil, async (l1Ilii, IIl11l, I111i1) => {
      try {
        l1Ilii ? (console.log("" + JSON.stringify(l1Ilii)), console.log($.name + " API请求失败，请检查网路重试")) : safeGet(I111i1) && (I111i1 = $.toObj(I111i1), I111i1.code === 0 ? I111i1.data.status === "310" ? console.log("提现现金成功！") : console.log("提现现金：失败:" + JSON.stringify(I111i1.data.message)) : console.log("提现现金：异常:" + JSON.stringify(I111i1)));
      } catch (iil1Il) {
        $.logErr(iil1Il, IIl11l);
      } finally {
        iIii1I(I111i1);
      }
    });
  });
}
function iiiIII() {
  return new Promise(liIIIl => {
    $.get({
      "url": "http://code.kingran.cf/wwly.json",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    }, async (i1i1ll, IIllI1, lIl1iI) => {
      try {
        i1i1ll ? (console.log("" + JSON.stringify(i1i1ll)), console.log($.name + " API请求失败，请检查网路重试")) : $.kgw_invitePin = JSON.parse(lIl1iI);
      } catch (iil1II) {
        $.logErr(iil1II, IIllI1);
      } finally {
        liIIIl();
      }
    });
  });
}
function Ill1I1(l1IliI) {
  return {
    "url": "https://api.m.jd.com/",
    "body": l1IliI,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": lIIi11
    },
    "timeout": 30 * 1000
  };
}
function lIi1ii(iliilI, I111iI) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + I111iI + (iliilI ? "&" + iliilI : ""),
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.388006&lat=22.512549&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": lIIi11
    },
    "timeout": 30 * 1000
  };
}
function lIi1il(II1i1i) {
  return {
    "url": "https://api.m.jd.com/?" + II1i1i,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": lIIi11
    },
    "timeout": 30 * 1000
  };
}
async function liI11i(lIi1Ii, iiilII) {
  let lili = {
      "appId": lIi1Ii,
      ...iiilII,
      "ua": UA,
      "pin": $.UserName
    },
    lIi1Il = {
      "url": "http://kr.kingran.cf/h5st",
      "body": JSON.stringify(lili),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30 * 1000
    };
  return new Promise(async Ii1lI1 => {
    $.post(lIi1Il, (Il1iil, iIiil, IIiIIi) => {
      let lilI = "";
      try {
        if (Il1iil) console.log($.name + " geth5st API请求失败，请检查网路重试");else {
          IIiIIi = JSON.parse(IIiIIi);
          if (typeof IIiIIi === "object" && IIiIIi && IIiIIi.body) {
            if (IIiIIi.body) lilI = IIiIIi.body || "";
          } else IIiIIi.code == 400 ? console.log("\n" + IIiIIi.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (ll111l) {
        $.logErr(ll111l, iIiil);
      } finally {
        Ii1lI1(lilI);
      }
    });
  });
}
function l1l1l(iliI1l) {
  iliI1l = iliI1l || 32;
  let iliI1i = "abcdef0123456789",
    IIl11i = iliI1i.length,
    i11III = "";
  for (i = 0; i < iliI1l; i++) i11III += iliI1i.charAt(Math.floor(Math.random() * IIl11i));
  return i11III;
}
function illilI(Ii111l) {
  if (typeof Ii111l == "string") try {
    return JSON.parse(Ii111l);
  } catch (Ilill1) {
    return console.log(Ilill1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}