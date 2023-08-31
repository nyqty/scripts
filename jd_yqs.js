/*
摇钱树任务

cron "25 4,16 * * *" script-path=jd_yqs.js, tag=摇钱树任务

轮询提现变量：jd_yqs_num //轮询提现页数  一般无需填写

 */
const Env=require('./utils/Env.js');
const $ = new Env('摇钱树任务');
const IlII1I = $.isNode() ? require("./sendNotify") : "",
  lliilllI = $.isNode() ? require("./jdCookie.js") : "",
  IiI1l1ii = require("./utils/h5st.js");
let iiIIilI = "_LN1l_4Nv5mTEsWhs3hIMA",
  I1Ililil = process.env.jd_yqs_num ? process.env.jd_yqs_num : "1",
  I1l1i1ii = Date.now(),
  IiiiiI1i = [],
  l1IiiiII = "",
  lIllli1;
if ($.isNode()) {
  Object.keys(lliilllI).forEach(iiiIII1 => {
    IiiiiI1i.push(lliilllI[iiiIII1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IiiiiI1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIl1IIII($.getdata("CookiesJD") || "[]").map(Ii11lI1i => Ii11lI1i.cookie)].filter(liIl111i => !!liIl111i);
!(async () => {
  if (!IiiiiI1i[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let il1llIlI = 0; il1llIlI < IiiiiI1i.length; il1llIlI++) {
    if (IiiiiI1i[il1llIlI]) {
      l1IiiiII = IiiiiI1i[il1llIlI];
      $.UserName = decodeURIComponent(l1IiiiII.match(/pt_pin=([^; ]+)(?=;?)/) && l1IiiiII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = il1llIlI + 1;
      $.isLogin = true;
      $.nickName = "";
      lIllli1 = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IlII1I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + liIlIlI1("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await ilI1l1l1();
      await i1lliIli();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(lill1Ill => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lill1Ill + "!", "");
}).finally(() => {
  $.done();
});
async function i1lliIli() {
  $.txhot = false;
  $.nowcontinue = false;
  $.drawLotteryNum = 0;
  await iliiiI1I();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  if ($.nowcontinue) {
    await iliiiI1I();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await i1II1lIi();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    for (let lIIiilil = 0; lIIiilil < $.drawLotteryNum; lIIiilil++) {
      await liIli1i();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    console.log("\n当前设置轮询提现页数：" + I1Ililil);
    for (let IIIll1I1 = 0; IIIll1I1 < I1Ililil; IIIll1I1++) {
      $.pageNum = IIIll1I1 + 1;
      console.log("\n开始轮询提现" + $.pageNum + "页");
      await iI1ii1II($.pageNum);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.txhot) break;
    }
  }
}
function ilIliI1i(iIil1ill) {
  try {
    if (typeof JSON.parse(iIil1ill) == "object") {
      return true;
    }
  } catch (llIlIlli) {
    return console.log(llIlIlli), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function iIl1IIII(II1111l) {
  if (typeof II1111l == "string") try {
    return JSON.parse(II1111l);
  } catch (I11iI1II) {
    return console.log(I11iI1II), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function iliiiI1I() {
  return new Promise(async lliIi => {
    const I1I11II1 = {
      "functionId": "richTreeHome",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": I1l1i1ii,
      "body": {
        "linkId": iiIIilI
      }
    };
    $.h5st = await lIIiI1l("34e92", I1I11II1);
    let I1liiIii = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": l1IiiiII,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(I1liiIii, async (i1lllll, IIi11I1i, I1i1ilIl) => {
      try {
        if (i1lllll) console.log("" + JSON.stringify(i1lllll));else {
          I1i1ilIl = JSON.parse(I1i1ilIl);
          if (I1i1ilIl.code == 0) {
            $.drawLotteryNum = I1i1ilIl?.["data"]?.["drawLotteryNum"];
            let lIiiiiI = I1i1ilIl?.["data"]?.["kettle"]?.["currentCapacity"],
              i1Illil1 = I1i1ilIl?.["data"]?.["richTree"]?.["nowStep"],
              lli1i1l = I1i1ilIl?.["data"]?.["richTree"]?.["nowExp"],
              II1lliIl = I1i1ilIl?.["data"]?.["richTree"]?.["remainingExp"];
            console.log("当前水滴：" + lIiiiiI + ",当前等级：" + i1Illil1 + ",当前进度：" + lli1i1l + ",还需经验：" + II1lliIl);
            if (I1i1ilIl?.["data"]?.["richTree"]?.["nowStep"] >= 1) {
              $.nowcontinue = true;
              let llIIiili = I1i1ilIl?.["data"]?.["totalReward"] || [];
              $.prizeList = "";
              for (let III11Ili = 0; III11Ili < llIIiili.length; III11Ili++) {
                $.amount = llIIiili[III11Ili].amount;
                $.prizeType = llIIiili[III11Ili].prizeType;
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
                III11Ili != llIIiili.length - 1 ? $.prizeList += $.prizeType + "：" + $.amount + "，" : $.prizeList += $.prizeType + "：" + $.amount;
              }
              console.log("当前汇总：" + $.prizeList);
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              lIiiiiI >= 2000 && (await iI1i1Iil(lIiiiiI, 0), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
            } else console.log("获得新手红包," + I1i1ilIl?.["data"]?.["prizeDrawVO"]?.["prizeConfigName"]), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await iI1i1Iil(lIiiiiI, 2);
          } else I1i1ilIl.code == 402 ? console.log("进入首页失败," + (I1i1ilIl?.["errMsg"] || "")) : console.log("进入首页失败," + (I1i1ilIl?.["errMsg"] || ""));
        }
      } catch (iIl1I1i1) {
        $.logErr(iIl1I1i1, IIi11I1i);
      } finally {
        lliIi();
      }
    });
  });
}
async function iI1i1Iil(i1i, ll1illl1) {
  return new Promise(async l1IIiI1 => {
    const li11Ii1l = {
      "functionId": "richTreeWater",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": I1l1i1ii,
      "body": {
        "waterNum": i1i,
        "type": ll1illl1,
        "linkId": iiIIilI
      }
    };
    $.h5st = await lIIiI1l("34e92", li11Ii1l);
    let iiillil = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": l1IiiiII,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(iiillil, async (IiII11, lIllillI, IIiIIiiI) => {
      try {
        if (IiII11) console.log("" + JSON.stringify(IiII11));else {
          IIiIIiiI = JSON.parse(IIiIIiiI);
          if (IIiIIiiI.code == 0) {
            let l111I1II = IIiIIiiI?.["data"]?.["redPacketNum"];
            console.log("完成浇水,等级：" + IIiIIiiI?.["data"]?.["nowStep"] + "-获得抽奖次数：" + l111I1II);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            for (let i1lIlIiI = 0; i1lIlIiI < l111I1II; i1lIlIiI++) {
              await liIli1i();
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
          } else IIiIIiiI.code == 402 ? console.log("浇水失败," + (IIiIIiiI?.["errMsg"] || "")) : console.log("浇水失败," + (IIiIIiiI?.["errMsg"] || ""));
        }
      } catch (l1lI11li) {
        $.logErr(l1lI11li, lIllillI);
      } finally {
        l1IIiI1();
      }
    });
  });
}
async function liIli1i() {
  return new Promise(async iIii1liI => {
    const I1IlliIi = {
      "functionId": "richTreeOpen",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": I1l1i1ii,
      "body": {
        "linkId": iiIIilI
      }
    };
    $.h5st = await lIIiI1l("34e92", I1IlliIi);
    let iIIlli1I = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": l1IiiiII,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(iIIlli1I, async (Iiil111, l111il, Iil111l) => {
      try {
        if (Iiil111) console.log("" + JSON.stringify(Iiil111));else {
          Iil111l = JSON.parse(Iil111l);
          if (Iil111l.code == 0) switch (Iil111l?.["data"]?.["prizeType"]) {
            case 1:
              console.log("获得," + Iil111l?.["data"]?.["prizeConfigName"] + "-" + Iil111l?.["data"]?.["createTime"]);
              break;
            case 2:
              console.log("获得红包," + Iil111l?.["data"]?.["prizeConfigName"] + "-" + Iil111l?.["data"]?.["createTime"]);
              break;
            case 4:
              console.log("获得现金," + Iil111l?.["data"]?.["prizeConfigName"] + "-" + Iil111l?.["data"]?.["createTime"]);
              break;
            case null:
              console.log("运气不太好，什么都没有抽到...");
              break;
            default:
              console.log(Iil111l?.["data"]?.["prizeType"]);
              return;
          } else {
            if (Iil111l.code == 402) {
              console.log("抽奖失败," + (Iil111l?.["errMsg"] || ""));
            } else console.log("抽奖失败," + (Iil111l?.["errMsg"] || ""));
          }
        }
      } catch (iI1lIIlI) {
        $.logErr(iI1lIIlI, l111il);
      } finally {
        iIii1liI();
      }
    });
  });
}
async function i1II1lIi() {
  let IlIliiIl = {
    "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22:%22_LN1l_4Nv5mTEsWhs3hIMA%22%7D&t=" + I1l1i1ii + "&appid=activities_platform&client=ios&clientVersion=12.0.10",
    "headers": {
      "origin": "https://h5platform.jd.com",
      "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
      "User-Agent": $.UA,
      "Cookie": l1IiiiII,
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json, text/plain, */*"
    },
    "timeout": 20 * 1000
  };
  return new Promise(iiIl1lll => {
    $.get(IlIliiIl, async (I1iII11i, I1Ii1iil, i1lliiI1) => {
      try {
        if (I1iII11i) $.log(I1iII11i);else {
          i1lliiI1 = JSON.parse(i1lliiI1);
          if (i1lliiI1?.["code"] == 0) {
            let Illii1i = i1lliiI1?.["data"] || [];
            for (let i1Ill = 0; i1Ill < Illii1i.length; i1Ill++) {
              $.taskTitle = Illii1i[i1Ill].taskTitle;
              $.apTaskListid = Illii1i[i1Ill].id;
              $.taskType = Illii1i[i1Ill].taskType;
              $.taskSourceUrl = Illii1i[i1Ill].taskSourceUrl;
              $.taskDoTimes = Illii1i[i1Ill].taskDoTimes;
              if ($.taskDoTimes == 0) {
                switch ($.taskType) {
                  case "BROWSE_CHANNEL":
                    for (let iliiiiil = 0; iliiiiil < 1; iliiiiil++) {
                      console.log("去做 " + $.taskTitle);
                      await iIIl1ll1($.taskType, $.apTaskListid, $.taskSourceUrl);
                      await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                    }
                    break;
                  default:
                    console.log($.taskType);
                    return;
                }
              }
            }
          } else console.log("查询任务失败," + (i1lliiI1?.["errMsg"] || i1lliiI1?.["msg"] || ""));
        }
      } catch (I1lI11iI) {
        $.log(I1lI11iI);
      } finally {
        iiIl1lll();
      }
    });
  });
}
async function iIIl1ll1(iI1l1i, lilIIi1l, I1IIlii) {
  return new Promise(async iil1111l => {
    const i11l1iI1 = {
      "functionId": "apsDoTask",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": I1l1i1ii,
      "body": {
        "taskType": iI1l1i,
        "taskId": lilIIi1l,
        "channel": 4,
        "checkVersion": true,
        "cityId": "",
        "provinceId": "",
        "countyId": "",
        "linkId": iiIIilI,
        "itemId": I1IIlii
      }
    };
    $.h5st = await lIIiI1l("54ed7", i11l1iI1);
    let ilIilII = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": l1IiiiII,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(ilIilII, async (i11IiIIl, Illi11, liiiI11) => {
      try {
        if (i11IiIIl) console.log("" + JSON.stringify(i11IiIIl));else {
          liiiI11 = JSON.parse(liiiI11);
          if (liiiI11.code == 0) {
            console.log("完成任务,获得抽奖次数：" + liiiI11?.["data"]?.["finishNeed"]);
            $.drawLotteryNum++;
          } else liiiI11.code == 402 ? console.log("完成任务失败," + (liiiI11?.["errMsg"] || "")) : console.log("完成任务失败," + (liiiI11?.["errMsg"] || ""));
        }
      } catch (Ii1liiiI) {
        $.logErr(Ii1liiiI, Illi11);
      } finally {
        iil1111l();
      }
    });
  });
}
function lI1iIiIi(IIII11il) {
  IIII11il = IIII11il || 32;
  let iilli1Ii = "abcdef0123456789",
    I1Iil1I1 = iilli1Ii.length,
    iIIilli1 = "";
  for (i = 0; i < IIII11il; i++) iIIilli1 += iilli1Ii.charAt(Math.floor(Math.random() * I1Iil1I1));
  return iIIilli1;
}
async function lIIiI1l(lIl1l1iI, il1Il1i) {
  try {
    let lI1lIll = new IiI1l1ii({
      "appId": lIl1l1iI,
      "appid": "activities_platform",
      "clientVersion": il1Il1i?.["clientVersion"],
      "client": il1Il1i?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await lI1lIll.genAlgo(), body = await lI1lIll.genUrlParams(il1Il1i.functionId, il1Il1i.body), body;
  } catch (i11lllil) {}
}
async function iI1ii1II(I111l1l1) {
  return new Promise(async l1iI1lll => {
    const llII111 = {
        "functionId": "superRedBagList",
        "appid": "activities_platform",
        "clientVersion": "12.0.1",
        "client": "ios",
        "body": {
          "linkId": iiIIilI,
          "pageNum": I111l1l1,
          "pageSize": 100,
          "business": "richTree"
        }
      },
      Iiil1 = await lIIiI1l("f2b1d", llII111);
    let l1l1ilIl = {
      "url": "https://api.m.jd.com/?" + Iiil1,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": l1IiiiII
      },
      "timeout": 30 * 1000
    };
    $.get(l1l1ilIl, async (iIill1lI, Ii1l1i1I, iiliIllI) => {
      try {
        if (iIill1lI) console.log("" + JSON.stringify(iIill1lI));else {
          iiliIllI = JSON.parse(iiliIllI);
          if (iiliIllI) {
            if (iiliIllI.code == 0 && iiliIllI.success == true) {
              const iilII1il = (iiliIllI.data.items || []).filter(II1lliI => II1lliI.prizeType === 4 && II1lliI.state === 0 || II1lliI.state === 2);
              for (let li1lliIi of iilII1il) {
                console.log("摇钱树提现，去提现" + li1lliIi.amount + "现金");
                await Ii1l1l1(li1lliIi.id, li1lliIi.poolBaseId, li1lliIi.prizeGroupId, li1lliIi.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("摇钱树提现失败，当月额度已满");
                  break;
                }
              }
            } else console.log("摇钱树提现查询奖品：异常:" + JSON.stringify(iiliIllI));
          }
        }
      } catch (l1lIll1i) {
        $.logErr(l1lIll1i, Ii1l1i1I);
      } finally {
        l1iI1lll();
      }
    });
  });
}
async function Ii1l1l1(iI1I11lI, i1ii11ll, l1IIll1l, IIilllIl) {
  return new Promise(async iIlliI1i => {
    const iIl11III = {
        "linkId": iiIIilI,
        "businessSource": "NONE",
        "base": {
          "prizeType": 4,
          "business": "richTree",
          "id": iI1I11lI,
          "poolBaseId": i1ii11ll,
          "prizeGroupId": l1IIll1l,
          "prizeBaseId": IIilllIl
        }
      },
      lI1liiiI = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(iIl11III)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": l1IiiiII
        },
        "timeout": 30 * 1000
      };
    $.post(lI1liiiI, async (iIlil1l1, II1iliIl, I1i1IIIi) => {
      try {
        if (iIlil1l1) console.log("" + JSON.stringify(iIlil1l1)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (ilIliI1i(I1i1IIIi)) {
            I1i1IIIi = $.toObj(I1i1IIIi);
            if (I1i1IIIi.code === 0) {
              if (I1i1IIIi.data.status === "310") console.log("提现现金成功！");else {
                console.log("提现现金：失败:" + I1i1IIIi.data.message);
                if (I1i1IIIi.data.message.includes("上限")) $.txhot = true;else {
                  if (I1i1IIIi.data.message.includes("已存在状态")) {
                    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
                    await Ii1l1l1(iI1I11lI, i1ii11ll, l1IIll1l, IIilllIl);
                  }
                }
              }
            } else {
              console.log("提现现金：异常:" + JSON.stringify(I1i1IIIi));
            }
          }
        }
      } catch (l11I1Ii1) {
        $.logErr(l11I1Ii1, II1iliIl);
      } finally {
        iIlliI1i(I1i1IIIi);
      }
    });
  });
}
function l1IIill1(IiiiIliI, iIi1Ii1I, IilIIlI, liilIIl) {
  return new Promise(IiiII1II => {
    const ll1l1II1 = {
        "linkId": iiIIilI,
        "businessSource": "fission",
        "business": "business",
        "drawRecordId": IiiiIliI,
        "poolId": iIi1Ii1I,
        "prizeGroupId": IilIIlI,
        "prizeId": liilIIl
      },
      lIliIi1l = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(ll1l1II1)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": l1IiiiII
        },
        "timeout": 30 * 1000
      };
    $.post(lIliIi1l, async (i1Ii111i, iIIIii1i, lIll111l) => {
      try {
        i1Ii111i ? (console.log("" + JSON.stringify(i1Ii111i)), console.log($.name + " API请求失败，请检查网路重试")) : ilIliI1i(lIll111l) && (lIll111l = $.toObj(lIll111l), lIll111l.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + lIll111l.errMsg));
      } catch (IlIIiI1I) {
        $.logErr(IlIIiI1I, iIIIii1i);
      } finally {
        IiiII1II(lIll111l);
      }
    });
  });
}
function iilI1ll(iIlilIiI) {
  return iIlilIiI.then(liIiiIi => {
    return [null, liIiiIi];
  }).catch(l1I1ilii => [l1I1ilii]);
}
function illl1i1(iiII1Ii, Il1ll1ii = {}) {
  let lll1lIl = [],
    Ililii = Il1ll1ii.connector || "&",
    IiiIII1I = Object.keys(iiII1Ii);
  if (Il1ll1ii.sort) IiiIII1I = IiiIII1I.sort();
  for (let IIIl1i of IiiIII1I) {
    let i1lI11i = iiII1Ii[IIIl1i];
    if (i1lI11i && typeof i1lI11i === "object") i1lI11i = JSON.stringify(i1lI11i);
    if (i1lI11i && Il1ll1ii.encode) i1lI11i = encodeURIComponent(i1lI11i);
    lll1lIl.push(IIIl1i + "=" + i1lI11i);
  }
  return lll1lIl.join(Ililii);
}
async function ilI1l1l1() {
  for (var l1iiIi1i = "", l1i1liI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IiIl1lI1 = 0; IiIl1lI1 < 16; IiIl1lI1++) {
    var lliIi1 = Math.round(Math.random() * (l1i1liI.length - 1));
    l1iiIi1i += l1i1liI.substring(lliIi1, lliIi1 + 1);
  }
  return uuid = Buffer.from(l1iiIi1i, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJGkEK==",
      "ud": uuid,
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function liIlIlI1(IiIlii1 = "xxxxxxxxxxxxxxxxxxxx") {
  return IiIlii1.replace(/[xy]/g, function (IiIIliIi) {
    var i1IiIli = Math.random() * 10 | 0,
      ill111ii = IiIIliIi == "x" ? i1IiIli : i1IiIli & 3 | 8;
    return jdaid = ill111ii.toString(), jdaid;
  });
}
function l1iiIIi1(ilIII1l1) {
  return new Promise(iI1iIiil => {
    const II1li1il = {
      "url": "" + ilIII1l1,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(II1li1il, async (ilIiIIiI, I1i1Ii, Iiliili1) => {
      try {
        if (ilIiIIiI) {} else Iiliili1 ? Iiliili1 = JSON.parse(Iiliili1) : console.log("未获取到数据,请重新运行");
      } catch (IllIi1ii) {
        $.logErr(IllIi1ii, I1i1Ii);
        Iiliili1 = null;
      } finally {
        iI1iIiil(Iiliili1);
      }
    });
  });
}
function ll1IlIli(li1111II, iii1Iii) {
  return Math.floor(Math.random() * (iii1Iii - li1111II)) + li1111II;
}