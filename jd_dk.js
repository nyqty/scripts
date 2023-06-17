/*
6.16-6.30 打卡美好山东

自行desi ck1   仅CK1会去点亮

cron:31 12,20 * * *
============Quantumultx===============
[task_local]
#6.16-6.30 打卡美好山东
31 12,20 * * * jd_dk.js, tag=6.16-6.30 打卡美好山东, enabled=true
*/
const Env = require('./utils/Env.js');
const $ = new Env("6.16-6.30 打卡美好山东");
const Iii1i1ii = $.isNode() ? require("./sendNotify") : "",
  ilIlI1Ii = $.isNode() ? require("./jdCookie.js") : "",
  IIiII = require("./function/krgetToken"),
  l1Ili1I1 = require("./function/krh5st");
let IiIIii = "https://szxyun-rc.isvjcloud.com",
  l11l1liI = [],
  i1i1I1II = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(ilIlI1Ii).forEach(lIl11l1I => {
    l11l1liI.push(ilIlI1Ii[lIl11l1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l11l1liI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(ll1II1II => ll1II1II.cookie)].filter(llll1Iii => !!llll1Iii);
let illlIlII = typeof $request !== "undefined";
illlIlII && (GetCookie(), $.done());
!(async () => {
  authorCodeList = ["1670077951224475650"];
  $.activityId = "industrial230523";
  $.authorCode = authorCodeList[ii1ll11(0, authorCodeList.length)];
  $.shareId = $.authorCode;
  if (!l11l1liI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let IlIiIlI1 = 0; IlIiIlI1 < l11l1liI.length; IlIiIlI1++) {
    if (l11l1liI[IlIiIlI1]) {
      i1i1I1II = l11l1liI[IlIiIlI1];
      originCookie = l11l1liI[IlIiIlI1];
      $.UserName = decodeURIComponent(i1i1I1II.match(/pt_pin=(.+?);/) && i1i1I1II.match(/pt_pin=(.+?);/)[1]);
      $.index = IlIiIlI1 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await Iii1i1ii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await l1l111i();
      await Ill1illl();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(ll11I1 => {
  $.log("", " " + $.name + ", 失败! 原因: " + ll11I1 + "!", "");
}).finally(() => {
  $.done();
});
async function Ill1illl() {
  $.shopid = 1000100710;
  $.hotkr = false;
  $.token = "";
  $.token = await IIiII(i1i1I1II, IiIIii);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await iiIilIll();
  if ($.tokens) {
    await l11Illi();
    await ii111IIl();
    await iI1ii1I();
    if (!$.donekr) for (const Ii11lII of $.detail) {
      $.jobDetail = Ii11lII.config;
      await lilIii1i();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    if ($.index == 1) {
      await lI11i1Il();
      for (const Il11ilii of $.skuList) {
        $.prizeId = Il11ilii.skuId;
        await I1ii1ill();
        if ($.hotkr) break;
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
    await iIl11Il1();
    if ($.index == 1) {
      $.shareId = $.joinId;
      console.log("后面的号都会助力 -> " + $.shareId);
    }
    await IlIli111();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  }
}
function iiIilIll() {
  return new Promise(III1I1Ii => {
    let lI1ilI1I = {
      "shopId": $.shopid,
      "token": $.token,
      "source": "01"
    };
    $.post(il1l1i1("/webc/login/userLogin", lI1ilI1I), async (II1li1l1, Il1l11I1, i1iIiiiI) => {
      try {
        II1li1l1 ? (console.log("" + JSON.stringify(II1li1l1)), console.log($.name + " userLogin API请求失败，请检查网路重试")) : (i1iIiiiI = JSON.parse(i1iIiiiI), i1iIiiiI && i1iIiiiI.success && ($.tokens = i1iIiiiI.data));
      } catch (lilliiil) {
        $.logErr(lilliiil, Il1l11I1);
      } finally {
        III1I1Ii();
      }
    });
  });
}
function l11Illi() {
  return new Promise(II1iiIIl => {
    let iili1lIi = {
      "activeId": $.activityId,
      "shareId": $.shareId
    };
    $.post(l1illlI("/webc/industrial/active", iili1lIi), async (l1iIiIi1, l1IlilIl, iliil1Il) => {
      try {
        l1iIiIi1 ? (console.log("" + JSON.stringify(l1iIiIi1)), console.log($.name + " active API请求失败，请检查网路重试")) : (iliil1Il = JSON.parse(iliil1Il), iliil1Il && iliil1Il.success && ($.joinId = iliil1Il.data.userVO.joinId || "", $.points2 = iliil1Il.data.userVO.points2 || 0, $.points = iliil1Il.data.userVO.points || 0, $.detail = iliil1Il.data.jobMap.viewWare.details || [], $.donekr = iliil1Il.data.jobMap.viewWare.done || false));
      } catch (I1Il1II) {
        $.logErr(I1Il1II, l1IlilIl);
      } finally {
        II1iiIIl();
      }
    });
  });
}
function IlliIlli() {
  return new Promise(iIIl1l1l => {
    let IIiiI1ll = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 6,
      "jobDetail": "100046671870"
    };
    $.post(l1illlI("/webc/industrial/job", IIiiI1ll), async (l1IIlI1, iI1lI1ll, IIlllI) => {
      try {
        l1IIlI1 ? (console.log("" + JSON.stringify(l1IIlI1)), console.log($.name + " job API请求失败，请检查网路重试")) : (IIlllI = JSON.parse(IIlllI), IIlllI && IIlllI.success && ($.val = IIlllI.data.val || 0, $.awardName = IIlllI.data.awardName || "", console.log("获得次数：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (li1I1ii1) {
        $.logErr(li1I1ii1, iI1lI1ll);
      } finally {
        iIIl1l1l();
      }
    });
  });
}
function iIl11Il1() {
  return new Promise(lii1IIll => {
    let ill11il = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": $.shareId
    };
    $.post(l1illlI("/webc/industrial/helpFriend", ill11il), async (ii1I1Il, iiIli11l, i1iIiili) => {
      try {
        ii1I1Il ? (console.log("" + JSON.stringify(ii1I1Il)), console.log($.name + " share API请求失败，请检查网路重试")) : (i1iIiili = JSON.parse(i1iIiili), i1iIiili && i1iIiili.success && ($.helpStatus = i1iIiili.data.helpStatus || 0, $.awardName = i1iIiili.data.awardName || 0, console.log("助力状态：" + $.helpStatus + "  获得豆子： " + $.awardName)));
      } catch (i1iliiIl) {
        $.logErr(i1iliiIl, iiIli11l);
      } finally {
        lii1IIll();
      }
    });
  });
}
function IlIli111() {
  return new Promise(iIiIll1l => {
    let i1l1iIi = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": $.authorCode
    };
    $.post(l1illlI("/webc/industrial/helpFriend", i1l1iIi), async (I1I11Ili, l1iiI11l, i1il1i11) => {
      try {
        if (I1I11Ili) {} else {
          i1il1i11 = JSON.parse(i1il1i11);
          i1il1i11 && i1il1i11.success && ($.helpStatus = i1il1i11.data.helpStatus || 0, $.awardName = i1il1i11.data.awardName || 0);
        }
      } catch (I11IlI1i) {
        $.logErr(I11IlI1i, l1iiI11l);
      } finally {
        iIiIll1l();
      }
    });
  });
}
function iiIiiiI() {
  return new Promise(IIllIIlI => {
    let iiil11i = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1642876114092576770"
    };
    $.post(l1illlI("/webc/industrial/helpFriend", iiil11i), async (IIll1iI1, Ii1ll1, Iil11I1i) => {
      try {
        if (IIll1iI1) {} else {
          Iil11I1i = JSON.parse(Iil11I1i);
          Iil11I1i && Iil11I1i.success && ($.helpStatus = Iil11I1i.data.helpStatus || 0, $.awardName = Iil11I1i.data.awardName || 0);
        }
      } catch (l1lii1Ii) {
        $.logErr(l1lii1Ii, Ii1ll1);
      } finally {
        IIllIIlI();
      }
    });
  });
}
function IlI1IliI() {
  return new Promise(lliIIili => {
    let Il1ii11l = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 3,
      "jobDetail": 1
    };
    $.post(l1illlI("/webc/industrial/job", Il1ii11l), async (lIiilI, l1Ill1lI, iliIl1il) => {
      try {
        if (lIiilI) {
          console.log("" + JSON.stringify(lIiilI));
          console.log($.name + " job1 API请求失败，请检查网路重试");
        } else {
          iliIl1il = JSON.parse(iliIl1il);
          iliIl1il && iliIl1il.success && ($.val = iliIl1il.data.val || 0, $.awardName = iliIl1il.data.awardName || "", console.log("获得次数：" + $.val + "  获得豆子： " + $.awardName));
        }
      } catch (IIIIli) {
        $.logErr(IIIIli, l1Ill1lI);
      } finally {
        lliIIili();
      }
    });
  });
}
function ii111IIl() {
  return new Promise(iil1l1l1 => {
    let iiiIliil = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 7,
      "jobDetail": 1
    };
    $.post(l1illlI("/webc/industrial/job", iiiIliil), async (iillIliI, iI11Ii1, iIiIiI) => {
      try {
        iillIliI ? (console.log("" + JSON.stringify(iillIliI)), console.log($.name + " job API请求失败，请检查网路重试")) : (iIiIiI = JSON.parse(iIiIiI), iIiIiI && iIiIiI.success && ($.val = iIiIiI.data.val || 0, $.awardName = iIiIiI.data.awardName || "", console.log("获得次数：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (i1l1Iili) {
        $.logErr(i1l1Iili, iI11Ii1);
      } finally {
        iil1l1l1();
      }
    });
  });
}
function iI1ii1I() {
  return new Promise(iIIiiIll => {
    let lI1iI1I1 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 0,
      "jobDetail": 1
    };
    $.post(l1illlI("/webc/industrial/job", lI1iI1I1), async (iIi1lil, i1ii11II, iilIll) => {
      try {
        iIi1lil ? (console.log("" + JSON.stringify(iIi1lil)), console.log($.name + " job API请求失败，请检查网路重试")) : (iilIll = JSON.parse(iilIll), iilIll && iilIll.success && ($.val = iilIll.data.val || 0, $.awardName = iilIll.data.awardName || "", console.log("获得次数：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (li1li1ii) {
        $.logErr(li1li1ii, i1ii11II);
      } finally {
        iIIiiIll();
      }
    });
  });
}
function lilIii1i() {
  return new Promise(ii1Iii1 => {
    let Ii11I11I = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 4,
      "jobDetail": $.jobDetail
    };
    $.post(l1illlI("/webc/industrial/job", Ii11I11I), async (llililil, II1111l, IIiIl1Ii) => {
      try {
        llililil ? (console.log("" + JSON.stringify(llililil)), console.log($.name + " job API请求失败，请检查网路重试")) : (IIiIl1Ii = JSON.parse(IIiIl1Ii), IIiIl1Ii && IIiIl1Ii.success && ($.val = IIiIl1Ii.data.val || 0, $.awardName = IIiIl1Ii.data.awardName || "", console.log("获得次数：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (i1Illi11) {
        $.logErr(i1Illi11, II1111l);
      } finally {
        ii1Iii1();
      }
    });
  });
}
function Ii1i1I11() {
  return new Promise(I11iI11 => {
    let ilillill = {
      "activeId": $.activityId,
      "joinId": $.joinId
    };
    $.post(l1illlI("/webc/industrial/getCard", ilillill), async (lIl1i11i, IiI11i, IlliilI) => {
      try {
        if (lIl1i11i) {
          console.log("" + JSON.stringify(lIl1i11i));
          console.log($.name + " lottery API请求失败，请检查网路重试");
        } else {
          IlliilI = JSON.parse(IlliilI);
          if (IlliilI.data != null && IlliilI.success) {
            console.log("获得集卡数字： " + IlliilI.data.cardInfo.name);
          } else console.log("空气 ");
        }
      } catch (iil1i1I1) {
        $.logErr(iil1i1I1, IiI11i);
      } finally {
        I11iI11();
      }
    });
  });
}
function lI11i1Il() {
  return new Promise(IIli11II => {
    let i11I1Ili = {
      "activeId": $.activityId,
      "joinId": $.joinId
    };
    $.post(l1illlI("/webc/industrial/lightRecord", i11I1Ili), async (l1l1IIil, Iii111Il, ll1Iiil1) => {
      try {
        if (l1l1IIil) {
          console.log("" + JSON.stringify(l1l1IIil));
          console.log($.name + " lightRecord API请求失败，请检查网路重试");
        } else {
          ll1Iiil1 = JSON.parse(ll1Iiil1);
          if (ll1Iiil1 && ll1Iiil1.success) {
            $.skuList = ll1Iiil1.data.skuList || [];
          }
        }
      } catch (IIi1Iili) {
        $.logErr(IIi1Iili, Iii111Il);
      } finally {
        IIli11II();
      }
    });
  });
}
function I1ii1ill() {
  return new Promise(IiiII1l => {
    let iillI1ll = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "prizeId": $.prizeId
    };
    $.post(l1illlI("/webc/industrial/takePrize", iillI1ll), async (ilIIlII1, I1ilI1l, liIiI1II) => {
      try {
        if (ilIIlII1) {
          console.log("" + JSON.stringify(ilIIlII1));
          console.log($.name + " takePrize API请求失败，请检查网路重试");
        } else {
          liIiI1II = JSON.parse(liIiI1II);
          if (liIiI1II.data != null && liIiI1II.success) console.log("点亮成功，获得： " + liIiI1II.data.cardInfo.name);else {
            if (liIiI1II.code == "403") {
              console.log(liIiI1II.message);
              liIiI1II.message == "当前点亮次数不足无法点亮" && ($.hotkr = true);
            } else liIiI1II.code == "401" ? console.log(liIiI1II.message) : console.log("点亮成功，获得： 空气 ");
          }
        }
      } catch (IiIi111I) {
        $.logErr(IiIi111I, I1ilI1l);
      } finally {
        IiiII1l();
      }
    });
  });
}
function llIli1ii() {
  return new Promise(IlIIiII1 => {
    let l1lI11Il = {
      "activeId": $.activityId,
      "joinId": $.joinId
    };
    $.post(l1illlI("/webc/industrial/getCard", l1lI11Il), async (lllIIlii, iilIi1I1, lIlIllil) => {
      try {
        if (lllIIlii) {
          console.log("" + JSON.stringify(lllIIlii));
          console.log($.name + " getCard API请求失败，请检查网路重试");
        } else {
          lIlIllil = JSON.parse(lIlIllil);
          lIlIllil.data != null && lIlIllil.success ? console.log("获得集卡数字： " + lIlIllil.data.cardInfo.name) : console.log("空气 ");
        }
      } catch (ii11l1l1) {
        $.logErr(ii11l1l1, iilIi1I1);
      } finally {
        IlIIiII1();
      }
    });
  });
}
function IIiiIiI(li1i1lll) {
  return new Promise(IliiilI => {
    const lIi1IllI = {
      "url": li1i1lll + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIi1IllI, async (Iiill111, Illilii, IIiIl1il) => {
      try {
        if (Iiill111) $.getAuthorCodeListerr = false;else {
          if (IIiIl1il) IIiIl1il = JSON.parse(IIiIl1il);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1l1IlI) {
        $.logErr(l1l1IlI, Illilii);
        IIiIl1il = null;
      } finally {
        IliiilI(IIiIl1il);
      }
    });
  });
}
async function I1lI1I1i() {
  if (!$.joinVenderId) return;
  return new Promise(async lI1Il1Il => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lI1i11Il = "";
    if ($.shopactivityId) lI1i11Il = ",\"activityId\":" + $.shopactivityId;
    const IiI1lill = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lI1i11Il + ",\"channel\":406}",
      i1lllIil = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IiI1lill)
      },
      IIIIlIll = await l1Ili1I1("8adfb", i1lllIil),
      iIil111 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IiI1lill + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIIIlIll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i1i1I1II,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIil111, async (i11i1i1l, IlIIl, lIi1iiII) => {
      try {
        if (i11i1i1l) IlIIl && typeof IlIIl.statusCode != "undefined" && IlIIl.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIi1iiII = lIi1iiII && lIi1iiII.match(/jsonp_.*?\((.*?)\);/) && lIi1iiII.match(/jsonp_.*?\((.*?)\);/)[1] || lIi1iiII;
          let lII1iil = $.toObj(lIi1iiII, lIi1iiII);
          if (lII1iil && typeof lII1iil == "object") {
            if (lII1iil && lII1iil.success === true) {
              console.log(" >> " + lII1iil.message);
              $.errorJoinShop = lII1iil.message;
              if (lII1iil.result && lII1iil.result.giftInfo) for (let lIIIl1l1 of lII1iil.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + lIIIl1l1.discountString + lIIIl1l1.prizeName + lIIIl1l1.secondLineDesc);
              }
            } else lII1iil && typeof lII1iil == "object" && lII1iil.message ? ($.errorJoinShop = lII1iil.message, console.log("" + (lII1iil.message || ""))) : console.log(lIi1iiII);
          } else console.log(lIi1iiII);
        }
      } catch (IIilI1I) {
        $.logErr(IIilI1I, IlIIl);
      } finally {
        lI1Il1Il();
      }
    });
  });
}
async function Iil1iili() {
  return new Promise(async il1ilI => {
    const lIliIiIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      lIl1I1I1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIliIiIi)
      },
      iI1i1iI = await l1Ili1I1("8adfb", lIl1I1I1),
      IIiiIiil = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lIliIiIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iI1i1iI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i1i1I1II,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIiiIiil, async (liII1ii, iIl11I1l, l11iIlI) => {
      try {
        if (liII1ii) iIl11I1l && typeof iIl11I1l.statusCode != "undefined" && iIl11I1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          l11iIlI = l11iIlI && l11iIlI.match(/jsonp_.*?\((.*?)\);/) && l11iIlI.match(/jsonp_.*?\((.*?)\);/)[1] || l11iIlI;
          let I111lIII = $.toObj(l11iIlI, l11iIlI);
          I111lIII && typeof I111lIII == "object" ? I111lIII && I111lIII.success == true && (console.log("去加入：" + (I111lIII.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = I111lIII.result.interestsRuleList && I111lIII.result.interestsRuleList[0] && I111lIII.result.interestsRuleList[0].interestsInfo && I111lIII.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(l11iIlI);
        }
      } catch (I1iI11l) {
        $.logErr(I1iI11l, iIl11I1l);
      } finally {
        il1ilI();
      }
    });
  });
}
function l1illlI(IiiIii1i, iiIi1II1) {
  return {
    "url": "" + IiIIii + IiiIii1i,
    "body": JSON.stringify(iiIi1II1),
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": i1i1I1II,
      "Host": "szxyun-rc.isvjcloud.com",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.tokens,
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    }
  };
}
function il1l1i1(liii11II, I1ilI1Il) {
  return {
    "url": "" + IiIIii + liii11II,
    "body": JSON.stringify(I1ilI1Il),
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": i1i1I1II,
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": "null",
      "Host": "szxyun-rc.isvjcloud.com",
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    },
    "timeout": 5 * 2000
  };
}
function l1l111i() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + iiIIlI11(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function iiIIlI11(iI1iIli1) {
  iI1iIli1 = iI1iIli1 || 32;
  let iIIliII = "abcdef0123456789",
    ilIi1ll = iIIliII.length,
    IIli11i1 = "";
  for (i = 0; i < iI1iIli1; i++) IIli11i1 += iIIliII.charAt(Math.floor(Math.random() * ilIi1ll));
  return IIli11i1;
}
function i11iIII(iiIiliI) {
  if (!iiIiliI) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(iiIiliI) == "object") {
      return true;
    }
  } catch (IIii1lll) {
    return console.log(IIii1lll), false;
  }
}
function i1i11i1I(ii1i1i1I) {
  if (typeof ii1i1i1I == "string") {
    try {
      return JSON.parse(ii1i1i1I);
    } catch (IIlI1lil) {
      return console.log(IIlI1lil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function ii1ll11(iiiliil1, IIiI1IlI) {
  return Math.floor(Math.random() * (IIiI1IlI - iiiliil1)) + iiiliil1;
}
