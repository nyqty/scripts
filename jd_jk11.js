/*
10.24-11.11 联合集卡 双十一冲

10.31可瓜分

cron:31 11 24-31/3,1-11/3 10,11 *
============Quantumultx===============
[task_local]
#10.24-11.11 联合集卡 双十一冲
31 11 24-31/3,1-11/3 10,11 * jd_jk.js, tag=10.24-11.11 联合集卡 双十一冲, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env('10.24-11.11 联合集卡 双十一冲');

const iIiIil = $.isNode() ? require("./sendNotify") : "",
  iIiIii = $.isNode() ? require("./jdCookie.js") : "",
  lI1i = require("./function/krgetToken"),
  i11 = require("./function/krh5st"),
  Ii1llI = require("./function/jdCommon");
let i1I11i = "https://szxyun-rc.isvjcloud.com",
  lI1l = [],
  li11Il = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) {
    $.teamId = process.env.jd_szxyun_teamId;
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(iIiIii).forEach(li11Ii => {
    lI1l.push(iIiIii[li11Ii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  lI1l = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIiIII => lIiIII.cookie)].filter(i1i => !!i1i);
}
let liII1l = typeof $request !== "undefined";
liII1l && (GetCookie(), $.done());
!(async () => {
  authorCodeList = await I1Il("http://code.kingran.cf/5.json");
  $.activityId = "unionCardD11Go20231020Nlmrxwq2";
  if (authorCodeList.length <= 0) {
    console.log("\n网络不好，请重新运行~\n");
    return;
  } else {
    $.shareId = authorCodeList[0].id;
    $.openId = authorCodeList[0].openid;
  }
  if (!lI1l[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let i1IlIi = 0; i1IlIi < lI1l.length; i1IlIi++) {
    if (lI1l[i1IlIi]) {
      li11Il = lI1l[i1IlIi];
      originCookie = lI1l[i1IlIi];
      $.UserName = decodeURIComponent(li11Il.match(/pt_pin=(.+?);/) && li11Il.match(/pt_pin=(.+?);/)[1]);
      $.index = i1IlIi + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await iIiIil.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      $.UA = Ii1llI.genUA($.UserName);
      await Ii1ll1();
      await $.wait(5000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(l11ll1 => {
  $.log("", " " + $.name + ", 失败! 原因: " + l11ll1 + "!", "");
}).finally(() => {
  $.done();
});
async function Ii1ll1() {
  $.shopid = 1000100710;
  $.token = "";
  $.token = await lI1i(li11Il, i1I11i);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await IIlIlI();
  if ($.tokens) {
    await I1III1();
    await iIiIiI();
    await iIlil();
    for (const iiliI1 of $.bindCardInfo) {
      if (iiliI1.isBindCard == false) {
        flag = true;
        $.joinVenderId = iiliI1.shopId;
        $.shopactivityId = "";
        await l1li1l();
        for (let iiii11 = 0; iiii11 < Array(2).length; iiii11++) {
          if (iiii11 > 0) {
            console.log("第" + iiii11 + "次 重新开卡");
          }
          await l1li1i();
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
            break;
          }
        }
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
          console.log("💔 可能是开卡黑号,跳过运行");
          return;
        }
        await I1III1();
        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
      }
    }
    for (const iIl1II of $.viewWare) {
      if (iIl1II.done == null) {
        $.jobDetail = iIl1II.config;
        await lIiII1();
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
    for (const ii11iI of $.viewMetting) {
      ii11iI.done == null && ($.jobDetail = ii11iI.config, await iIlii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    }
    await I1Ii();
    let l1II1I = parseInt($.points2 / 1);
    console.log("抽卡次数为" + l1II1I + "次,当前积分为 " + $.points);
    if ($.points2 >= 1) {
      for (m = 1; l1II1I--; m++) {
        await lI1I();
        if (Number(l1II1I) <= 0) {
          break;
        }
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
    await l11li1();
    $.index == 1 && ($.shareId = $.joinId, console.log("后面的号都会助力 -> " + $.shareId));
    $.openId == "ture" && (await i1I(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await liII1I(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
  }
}
function IIlIlI() {
  return new Promise(i1IIlI => {
    let il1lII = {
      shopId: $.shopid,
      token: $.token,
      source: "01"
    };
    $.post(il1Ili("/webc/login/userLogin", il1lII), async (i111li, lIlIiI, I11lli) => {
      try {
        i111li ? (console.log("" + JSON.stringify(i111li)), console.log($.name + " userLogin API请求失败，请检查网路重试")) : (I11lli = JSON.parse(I11lli), I11lli && I11lli.success && ($.tokens = I11lli.data));
      } catch (I1l1I) {
        $.logErr(I1l1I, lIlIiI);
      } finally {
        i1IIlI();
      }
    });
  });
}
function I1III1() {
  return new Promise(IiIl1I => {
    let iIiIi1 = {
      activeId: $.activityId,
      shareId: $.shareId
    };
    $.post(il1Ill("/webc/unionCard/active", iIiIi1), async (ii11lI, ilI1l, I1l11) => {
      try {
        if (ii11lI) {
          console.log("" + JSON.stringify(ii11lI));
          console.log($.name + " active API请求失败，请检查网路重试");
        } else {
          I1l11 = JSON.parse(I1l11);
          if (I1l11 && I1l11.success) {
            $.joinId = I1l11.data.userVO.joinId || "";
            $.points2 = I1l11?.["data"]?.["userVO"]?.["points2"] || 0;
            $.points = I1l11?.["data"]?.["userVO"]?.["points"] || 0;
            $.bindCardInfo = I1l11?.["data"]?.["bindCardInfo"] || [];
            $.jobMap = I1l11?.["data"]?.["jobMap"] || [];
            $.viewMetting = I1l11?.["data"]?.["jobMap"]?.["viewMetting"]?.["details"] || [];
            $.viewWare = I1l11?.["data"]?.["jobMap"]?.["viewWare"]?.["details"] || [];
          }
        }
      } catch (I1l1i) {
        $.logErr(I1l1i, ilI1l);
      } finally {
        IiIl1I();
      }
    });
  });
}
function iIll1() {
  return new Promise(lIl11l => {
    let iiii1l = {
      activeId: $.activityId,
      joinId: $.joinId,
      jobForm: 6,
      jobDetail: "100046671870"
    };
    $.post(il1Ill("/webc/unionCard/job", iiii1l), async (iI1Ii, IiIIIl, IiIIIi) => {
      try {
        if (iI1Ii) {
          console.log("" + JSON.stringify(iI1Ii));
          console.log($.name + " job API请求失败，请检查网路重试");
        } else {
          IiIIIi = JSON.parse(IiIIIi);
          if (IiIIIi && IiIIIi.success) {
            $.val = IiIIIi.data.val || 0;
            $.awardName = IiIIIi.data.awardName || "";
            console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName);
          }
        }
      } catch (il1IiI) {
        $.logErr(il1IiI, IiIIIl);
      } finally {
        lIl11l();
      }
    });
  });
}
function l11li1() {
  return new Promise(IIiII => {
    let li1IiI = {
      activeId: $.activityId,
      joinId: $.joinId,
      shareId: $.shareId
    };
    $.post(il1Ill("/webc/unionCard/share", li1IiI), async (Illl, Illi, l1IiiI) => {
      try {
        Illl ? (console.log("" + JSON.stringify(Illl)), console.log($.name + " share API请求失败，请检查网路重试")) : (l1IiiI = JSON.parse(l1IiiI), l1IiiI && l1IiiI.success && ($.helpStatus = l1IiiI.data.helpStatus || 0, $.awardName = l1IiiI.data.awardName || 0, console.log("助力状态：" + $.helpStatus)));
      } catch (II1iII) {
        $.logErr(II1iII, Illi);
      } finally {
        IIiII();
      }
    });
  });
}
function i1I() {
  return new Promise(i1liI1 => {
    let ll1I1i = {
      activeId: $.activityId,
      joinId: $.joinId,
      shareId: "1716698196434821122"
    };
    $.post(il1Ill("/webc/unionCard/share", ll1I1i), async (iiiiII, ll1I1l, iilI) => {
      try {
        if (!iiiiII) {
          iilI = JSON.parse(iilI);
          iilI && iilI.success && ($.helpStatus = iilI.data.helpStatus || 0, $.awardName = iilI.data.awardName || 0);
        }
      } catch (IIilI1) {
        $.logErr(IIilI1, ll1I1l);
      } finally {
        i1liI1();
      }
    });
  });
}
function liII1I() {
  return new Promise(IIiIi => {
    let li1Iil = {
      activeId: $.activityId,
      joinId: $.joinId,
      shareId: "1716719406558883841"
    };
    $.post(il1Ill("/webc/unionCard/share", li1Iil), async (ill11, i1ii1l, iiIIil) => {
      try {
        if (!ill11) {
          iiIIil = JSON.parse(iiIIil);
          if (iiIIil && iiIIil.success) {
            $.helpStatus = iiIIil.data.helpStatus || 0;
            $.awardName = iiIIil.data.awardName || 0;
          }
        }
      } catch (lIII1) {
        $.logErr(lIII1, i1ii1l);
      } finally {
        IIiIi();
      }
    });
  });
}
function iIiIiI() {
  return new Promise(l1Iili => {
    let l1Iill = {
      activeId: $.activityId,
      joinId: $.joinId,
      jobForm: 3,
      jobDetail: 1
    };
    $.post(il1Ill("/webc/unionCard/job", l1Iill), async (iiiiIi, iiiiIl, IIi11i) => {
      try {
        iiiiIi ? (console.log("" + JSON.stringify(iiiiIi)), console.log($.name + " job1 API请求失败，请检查网路重试")) : (IIi11i = JSON.parse(IIi11i), IIi11i && IIi11i.success && ($.val = IIi11i?.["data"]?.["val"] || 0, $.awardName = IIi11i?.["data"]?.["awardName"] || "", console.log("获得积分：" + $.val)));
      } catch (I11ll1) {
        $.logErr(I11ll1, iiiiIl);
      } finally {
        l1Iili();
      }
    });
  });
}
function iIlil() {
  return new Promise(lIlIlI => {
    let iiI1I = {
      activeId: $.activityId,
      joinId: $.joinId,
      jobForm: 0,
      jobDetail: 1
    };
    $.post(il1Ill("/webc/unionCard/job", iiI1I), async (lIIIl, ilIII, IiII1I) => {
      try {
        lIIIl ? (console.log("" + JSON.stringify(lIIIl)), console.log($.name + " job API请求失败，请检查网路重试")) : (IiII1I = JSON.parse(IiII1I), IiII1I && IiII1I.success && ($.val = IiII1I?.["data"]?.["val"] || 0, $.awardName = IiII1I?.["data"]?.["awardName"] || "", console.log("获得积分：" + $.val)));
      } catch (IIl1I1) {
        $.logErr(IIl1I1, ilIII);
      } finally {
        lIlIlI();
      }
    });
  });
}
function lIiII1() {
  return new Promise(l111I1 => {
    let I11liI = {
      activeId: $.activityId,
      joinId: $.joinId,
      jobForm: 4,
      jobDetail: $.jobDetail
    };
    $.post(il1Ill("/webc/unionCard/job", I11liI), async (l11Iii, IIllii, IIllil) => {
      try {
        l11Iii ? (console.log("" + JSON.stringify(l11Iii)), console.log($.name + " job API请求失败，请检查网路重试")) : (IIllil = JSON.parse(IIllil), IIllil && IIllil.success && ($.val = IIllil?.["data"]?.["val"] || 0, $.awardName = IIllil?.["data"]?.["awardName"] || "", console.log("获得积分：" + $.val)));
      } catch (iI11) {
        $.logErr(iI11, IIllii);
      } finally {
        l111I1();
      }
    });
  });
}
function iIlii() {
  return new Promise(Il1l1i => {
    let iI1 = {
      activeId: $.activityId,
      joinId: $.joinId,
      jobForm: 7,
      jobDetail: $.jobDetail
    };
    $.post(il1Ill("/webc/unionCard/job", iI1), async (l11IlI, lIIl, lIl1i) => {
      try {
        l11IlI ? (console.log("" + JSON.stringify(l11IlI)), console.log($.name + " job API请求失败，请检查网路重试")) : (lIl1i = JSON.parse(lIl1i), lIl1i && lIl1i.success && ($.val = lIl1i?.["data"]?.["val"] || 0, $.awardName = lIl1i?.["data"]?.["awardName"] || "", console.log("获得积分：" + $.val)));
      } catch (l11Il1) {
        $.logErr(l11Il1, lIIl);
      } finally {
        Il1l1i();
      }
    });
  });
}
function lI1I() {
  return new Promise(iI1i => {
    let l11Ill = {
      activeId: $.activityId,
      joinId: $.joinId
    };
    $.post(il1Ill("/webc/unionCard/getCard", l11Ill), async (lIi11I, iiili, iIlIiI) => {
      try {
        if (lIi11I) {
          console.log("" + JSON.stringify(lIi11I));
          console.log($.name + " getCard API请求失败，请检查网路重试");
        } else {
          iIlIiI = JSON.parse(iIlIiI);
          iIlIiI.data != null && iIlIiI.success ? console.log("抽到卡片： " + iIlIiI?.["data"]?.["cardInfo"]?.["name"] + " 是否集齐：" + iIlIiI?.["data"]?.["collectAll"]) : console.log("空气 ");
        }
      } catch (liIill) {
        $.logErr(liIill, iiili);
      } finally {
        iI1i();
      }
    });
  });
}
function I1Ii() {
  return new Promise(Il1IIl => {
    let Ii1liI = {
      activeId: $.activityId,
      joinId: $.joinId,
      lotteryForm: 0
    };
    $.post(il1Ill("/webc/unionCard/lottery", Ii1liI), async (liIilI, Ii1li1, iiil1) => {
      try {
        liIilI ? (console.log("" + JSON.stringify(liIilI)), console.log($.name + " lottery API请求失败，请检查网路重试")) : (iiil1 = JSON.parse(iiil1), iiil1.data != null && iiil1.success ? console.log("获得奖品： " + iiil1.data.awardName) : console.log("空气 "));
      } catch (ilII1I) {
        $.logErr(ilII1I, Ii1li1);
      } finally {
        Il1IIl();
      }
    });
  });
}
function I1Il(lli1l1) {
  return new Promise(lliIi => {
    const l1Iii1 = {
      url: lli1l1 + "?" + new Date(),
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1Iii1, async (IIiIi1, I1i1, iiiii) => {
      try {
        if (IIiIi1) {
          $.getAuthorCodeListerr = false;
        } else {
          if (iiiii) {
            iiiii = JSON.parse(iiiii);
          }
          $.getAuthorCodeListerr = true;
        }
      } catch (il11II) {
        $.logErr(il11II, I1i1);
        iiiii = null;
      } finally {
        lliIi(iiiii);
      }
    });
  });
}
async function l1li1i() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async iiiiI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiIlIl = "";
    if ($.shopactivityId) {
      iiIlIl = ",\"activityId\":" + $.shopactivityId;
    }
    const iiIlIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiIlIl + ",\"channel\":406}",
      iIlIli = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(iiIlIi)
      },
      iIlIll = await i11("27004", iIlIli),
      il11I1 = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + iiIlIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIlIll),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: li11Il
        }
      };
    $.get(il11I1, async (lll1i1, iIl11l, I1ii) => {
      try {
        if (lll1i1) {
          console.log(lll1i1);
        } else {
          const I1il = JSON.parse(I1ii);
          if (typeof I1il === "object") {
            if (I1il.success === true) {
              console.log(I1il.message);
              $.errorJoinShop = I1il.message;
              if (I1il.result && I1il.result.giftInfo) {
                for (let I1Iiil of I1il.result.giftInfo.giftList) {
                  console.log("入会获得：" + I1Iiil.discountString + I1Iiil.prizeName + I1Iiil.secondLineDesc);
                }
              }
            } else {
              typeof I1il == "object" && I1il.message ? ($.errorJoinShop = I1il.message, console.log("" + (I1il.message || ""))) : console.log(I1ii);
            }
          } else {
            console.log(I1ii);
          }
        }
      } catch (I1Iiii) {
        $.logErr(I1Iiii, iIl11l);
      } finally {
        iiiiI();
      }
    });
  });
}
async function l1li1l() {
  return new Promise(async lIIli1 => {
    let iIlIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iIl111 = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(iIlIi)
      },
      i11lil = await i11("27004", iIl111),
      iilI1I = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + iIlIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11lil),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: li11Il
        }
      };
    $.get(iilI1I, async (i11lii, I1Iii1, iiI1II) => {
      try {
        if (i11lii) {
          console.log(i11lii);
        } else {
          const iIl11I = JSON.parse(iiI1II);
          typeof iIl11I === "object" ? iIl11I.success === true && (console.log("去加入：" + (iIl11I.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = iIl11I.result.interestsRuleList && iIl11I.result.interestsRuleList[0] && iIl11I.result.interestsRuleList[0].interestsInfo && iIl11I.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = iIl11I.result.userInfo.openCardStatus) : console.log(iiI1II);
        }
      } catch (lIiii1) {
        $.logErr(lIiii1, I1Iii1);
      } finally {
        lIIli1();
      }
    });
  });
}
function il1Ill(iIlII, iIiII1) {
  return {
    url: "" + i1I11i + iIlII,
    body: JSON.stringify(iIiII1),
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      Connection: "keep-alive",
      Cookie: li11Il,
      Host: "szxyun-rc.isvjcloud.com",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.tokens,
      Origin: "https://szxyun-rc.isvjcloud.com",
      Referer: "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    }
  };
}
function il1Ili(iiI1Il, iiI1Ii) {
  return {
    url: "" + i1I11i + iiI1Il,
    body: JSON.stringify(iiI1Ii),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      Connection: "keep-alive",
      Cookie: li11Il,
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": "null",
      Host: "szxyun-rc.isvjcloud.com",
      Origin: "https://szxyun-rc.isvjcloud.com",
      Referer: "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    },
    timeout: 15000
  };
}
function i1IlI1(lliliI) {
  lliliI = lliliI || 32;
  let lIIlll = "abcdef0123456789",
    ll1ii1 = lIIlll.length,
    i11li1 = "";
  for (i = 0; i < lliliI; i++) {
    i11li1 += lIIlll.charAt(Math.floor(Math.random() * ll1ii1));
  }
  return i11li1;
}
function IIlIli(iI11i) {
  if (!iI11i) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(iI11i) == "object") {
      return true;
    }
  } catch (lIIlli) {
    console.log(lIIlli);
    return false;
  }
}
function IIlIll(I1Iill) {
  if (typeof I1Iill == "string") {
    try {
      return JSON.parse(I1Iill);
    } catch (I1IilI) {
      console.log(I1IilI);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function l11liI(iIllII, lli1I) {
  return Math.floor(Math.random() * (lli1I - iIllII)) + iIllII;
}
