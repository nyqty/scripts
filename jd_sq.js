/*
5.30-6.18 省钱特种兵

cron:31 12 * * *
============Quantumultx===============
[task_local]
#5.30-6.18 省钱特种兵
31 12 * * * jd_sq.js, tag=5.30-6.18 省钱特种兵, enabled=true
*/
const Env = require('./utils/Env.js');
const $ = new Env("5.30-6.18 省钱特种兵");

const notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let domains = "https://szxyun-rc.isvjcloud.com",
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(I1ll11lI => {
    cookiesArr.push(jdCookieNode[I1ll11lI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lilI1I1i => lilI1I1i.cookie)].filter(iilli1lI => !!iilli1lI);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
!(async () => {
  authorCodeList = ["1667458738983837697"];
  $.activityId = "unionCard618GoDNpc2fdF";
  $.authorCode = authorCodeList[random(0, authorCodeList.length)];
  $.shareId = $.authorCode;
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let li11Iil = 0; li11Iil < cookiesArr.length; li11Iil++) {
    if (cookiesArr[li11Iil]) {
      cookie = cookiesArr[li11Iil];
      originCookie = cookiesArr[li11Iil];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = li11Iil + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await showCart();
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(II1iiii1 => {
  $.log("", " " + $.name + ", 失败! 原因: " + II1iiii1 + "!", "");
}).finally(() => {
  $.done();
});
async function showCart() {
  $.shopid = 1000100710;
  $.token = "";
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await userLogin();
  if ($.tokens) {
    await active();
    await job1();
    await job4();
    if ($.points2 >= 1) {
      let I11I11II = parseInt($.points2 / 1);
      console.log("抽奖次数为" + I11I11II + "次");
      for (m = 1; I11I11II--; m++) {
        await getCard();
        if (Number(I11I11II) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
    await share();
    $.index == 1 && ($.shareId = $.joinId, console.log("后面的号都会助力 -> " + $.shareId));
  }
}
function userLogin() {
  return new Promise(i1li1ilI => {
    let II1l1lII = {
      "shopId": $.shopid,
      "token": $.token,
      "source": "01"
    };
    $.post(taskPostUrls("/webc/login/userLogin", II1l1lII), async (iIiI1liI, IiIii1iI, liiIll) => {
      try {
        if (iIiI1liI) {
          console.log("" + JSON.stringify(iIiI1liI));
          console.log($.name + " userLogin API请求失败，请检查网路重试");
        } else {
          liiIll = JSON.parse(liiIll);
          if (liiIll && liiIll.success) {
            $.tokens = liiIll.data;
          }
        }
      } catch (i1llIIi1) {
        $.logErr(i1llIIi1, IiIii1iI);
      } finally {
        i1li1ilI();
      }
    });
  });
}
function active() {
  return new Promise(l1Ii1lil => {
    let llIliIl1 = {
      "activeId": $.activityId,
      "shareId": $.shareId
    };
    $.post(taskPostUrl("/webc/unionCard/active", llIliIl1), async (i111lIlI, iII11I1l, llIi1IlI) => {
      try {
        i111lIlI ? (console.log("" + JSON.stringify(i111lIlI)), console.log($.name + " active API请求失败，请检查网路重试")) : (llIi1IlI = JSON.parse(llIi1IlI), llIi1IlI && llIi1IlI.success && ($.joinId = llIi1IlI.data.userVO.joinId || "", $.points2 = llIi1IlI.data.userVO.points2 || 0, $.points = llIi1IlI.data.userVO.points || 0, $.bindCardInfo = llIi1IlI.data.bindCardInfo || []));
      } catch (ilIiii1I) {
        $.logErr(ilIiii1I, iII11I1l);
      } finally {
        l1Ii1lil();
      }
    });
  });
}
function job() {
  return new Promise(iI1iilli => {
    let lilI1ii1 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 6,
      "jobDetail": "100046671870"
    };
    $.post(taskPostUrl("/webc/unionCard/job", lilI1ii1), async (IIli1Il, IIlII11, Iiii11l1) => {
      try {
        IIli1Il ? (console.log("" + JSON.stringify(IIli1Il)), console.log($.name + " job API请求失败，请检查网路重试")) : (Iiii11l1 = JSON.parse(Iiii11l1), Iiii11l1 && Iiii11l1.success && ($.val = Iiii11l1.data.val || 0, $.awardName = Iiii11l1.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (llIi1lli) {
        $.logErr(llIi1lli, IIlII11);
      } finally {
        iI1iilli();
      }
    });
  });
}
function share() {
  return new Promise(iii1I11i => {
    let lI1111i = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": $.shareId
    };
    $.post(taskPostUrl("/webc/unionCard/share", lI1111i), async (I1Iilll, Ii1Iilii, lili1iIl) => {
      try {
        I1Iilll ? (console.log("" + JSON.stringify(I1Iilll)), console.log($.name + " share API请求失败，请检查网路重试")) : (lili1iIl = JSON.parse(lili1iIl), lili1iIl && lili1iIl.success && ($.helpStatus = lili1iIl.data.helpStatus || 0, $.awardName = lili1iIl.data.awardName || 0, console.log("助力状态：" + $.helpStatus + "  获得豆子： " + $.awardName)));
      } catch (II11I) {
        $.logErr(II11I, Ii1Iilii);
      } finally {
        iii1I11i();
      }
    });
  });
}
function share1() {
  return new Promise(Ii1l1IIi => {
    let i1liliII = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1642874649715695617"
    };
    $.post(taskPostUrl("/webc/unionCard/share", i1liliII), async (iii111ii, llli1l1, lIiIilII) => {
      try {
        if (iii111ii) {} else {
          lIiIilII = JSON.parse(lIiIilII);
          lIiIilII && lIiIilII.success && ($.helpStatus = lIiIilII.data.helpStatus || 0, $.awardName = lIiIilII.data.awardName || 0);
        }
      } catch (Ii1I11i) {
        $.logErr(Ii1I11i, llli1l1);
      } finally {
        Ii1l1IIi();
      }
    });
  });
}
function share2() {
  return new Promise(lIlIllil => {
    let i1III1iI = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1642876114092576770"
    };
    $.post(taskPostUrl("/webc/unionCard/share", i1III1iI), async (liii11ll, iilillli, lil1iIiI) => {
      try {
        if (liii11ll) {} else {
          lil1iIiI = JSON.parse(lil1iIiI);
          lil1iIiI && lil1iIiI.success && ($.helpStatus = lil1iIiI.data.helpStatus || 0, $.awardName = lil1iIiI.data.awardName || 0);
        }
      } catch (Il111Iii) {
        $.logErr(Il111Iii, iilillli);
      } finally {
        lIlIllil();
      }
    });
  });
}
function job1() {
  return new Promise(llIII1i => {
    let III1iil = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 3,
      "jobDetail": 1
    };
    $.post(taskPostUrl("/webc/unionCard/job", III1iil), async (IlllIlli, lI11iii, lil11IlI) => {
      try {
        IlllIlli ? (console.log("" + JSON.stringify(IlllIlli)), console.log($.name + " job1 API请求失败，请检查网路重试")) : (lil11IlI = JSON.parse(lil11IlI), lil11IlI && lil11IlI.success && ($.val = lil11IlI.data.val || 0, $.awardName = lil11IlI.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (iIlIiIiI) {
        $.logErr(iIlIiIiI, lI11iii);
      } finally {
        llIII1i();
      }
    });
  });
}
function job2() {
  return new Promise(l1iIllll => {
    let IIilIIll = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 1,
      "jobDetail": 1
    };
    $.post(taskPostUrl("/webc/unionCard/job", IIilIIll), async (l1liI1iI, llIlllil, ll1IIl1l) => {
      try {
        l1liI1iI ? (console.log("" + JSON.stringify(l1liI1iI)), console.log($.name + " job API请求失败，请检查网路重试")) : (ll1IIl1l = JSON.parse(ll1IIl1l), ll1IIl1l && ll1IIl1l.success && ($.val = ll1IIl1l.data.val || 0, $.awardName = ll1IIl1l.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (l1iIlli1) {
        $.logErr(l1iIlli1, llIlllil);
      } finally {
        l1iIllll();
      }
    });
  });
}
function job4() {
  return new Promise(ll1I1l1i => {
    let llIl1lIi = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 0,
      "jobDetail": 1
    };
    $.post(taskPostUrl("/webc/unionCard/job", llIl1lIi), async (Illiilll, i1I1iIi, llIiIlll) => {
      try {
        Illiilll ? (console.log("" + JSON.stringify(Illiilll)), console.log($.name + " job API请求失败，请检查网路重试")) : (llIiIlll = JSON.parse(llIiIlll), llIiIlll && llIiIlll.success && ($.val = llIiIlll.data.val || 0, $.awardName = llIiIlll.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (iiIlIiil) {
        $.logErr(iiIlIiil, i1I1iIi);
      } finally {
        ll1I1l1i();
      }
    });
  });
}
function job3() {
  return new Promise(IlII111i => {
    let iI1Ii1ll = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 5,
      "jobDetail": $.joinVenderId
    };
    console.log(iI1Ii1ll);
    $.post(taskPostUrl("/webc/unionCard/job", iI1Ii1ll), async (l1il1i, Il1il1lI, I1Il1l1) => {
      try {
        l1il1i ? (console.log("" + JSON.stringify(l1il1i)), console.log($.name + " job API请求失败，请检查网路重试")) : (console.log(I1Il1l1), I1Il1l1 = JSON.parse(I1Il1l1), I1Il1l1 && I1Il1l1.success && ($.val = I1Il1l1.data.val || 0, $.awardName = I1Il1l1.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (lIIiIii) {
        $.logErr(lIIiIii, Il1il1lI);
      } finally {
        IlII111i();
      }
    });
  });
}
function lottery() {
  return new Promise(lIi1I => {
    let li1iIII = {
      "activeId": $.activityId,
      "joinId": $.joinId
    };
    $.post(taskPostUrl("/webc/unionCard/getCard", li1iIII), async (i1iIi, I1l11ill, i1lIiIiI) => {
      try {
        i1iIi ? (console.log("" + JSON.stringify(i1iIi)), console.log($.name + " lottery API请求失败，请检查网路重试")) : (i1lIiIiI = JSON.parse(i1lIiIiI), i1lIiIiI.data != null && i1lIiIiI.success ? console.log("获得集卡数字： " + i1lIiIiI.data.cardInfo.name) : console.log("空气 "));
      } catch (i1i11i1I) {
        $.logErr(i1i11i1I, I1l11ill);
      } finally {
        lIi1I();
      }
    });
  });
}
function getCard() {
  return new Promise(iillll1i => {
    let iillIIii = {
      "activeId": $.activityId,
      "joinId": $.joinId
    };
    $.post(taskPostUrl("/webc/unionCard/getCard", iillIIii), async (iiIlIl1, IiII1llI, ilill1lI) => {
      try {
        iiIlIl1 ? (console.log("" + JSON.stringify(iiIlIl1)), console.log($.name + " getCard API请求失败，请检查网路重试")) : (ilill1lI = JSON.parse(ilill1lI), ilill1lI.data != null && ilill1lI.success ? console.log("获得集卡数字： " + ilill1lI.data.cardInfo.name) : console.log("空气 "));
      } catch (lI1I11lI) {
        $.logErr(lI1I11lI, IiII1llI);
      } finally {
        iillll1i();
      }
    });
  });
}
function getAuthorCodeList(lI1li1l) {
  return new Promise(il1iIIlI => {
    const lIIl1l1I = {
      "url": lI1li1l + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIIl1l1I, async (IlliII11, ilili1il, illiiIIi) => {
      try {
        if (IlliII11) $.getAuthorCodeListerr = false;else {
          if (illiiIIi) illiiIIi = JSON.parse(illiiIIi);
          $.getAuthorCodeListerr = true;
        }
      } catch (li1IIliI) {
        $.logErr(li1IIliI, ilili1il);
        illiiIIi = null;
      } finally {
        il1iIIlI(illiiIIi);
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async il1llII1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lllliI1l = "";
    if ($.shopactivityId) lllliI1l = ",\"activityId\":" + $.shopactivityId;
    const iI1i1iI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lllliI1l + ",\"channel\":406}",
      lIIIl1l1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iI1i1iI)
      },
      llllIi1l = await getH5st("8adfb", lIIIl1l1),
      illlIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iI1i1iI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(llllIi1l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(illlIi, async (i1iiIII1, iliIlIi, lll1ilil) => {
      try {
        if (i1iiIII1) iliIlIi && typeof iliIlIi.statusCode != "undefined" && iliIlIi.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lll1ilil = lll1ilil && lll1ilil.match(/jsonp_.*?\((.*?)\);/) && lll1ilil.match(/jsonp_.*?\((.*?)\);/)[1] || lll1ilil;
          let IIiil1Il = $.toObj(lll1ilil, lll1ilil);
          if (IIiil1Il && typeof IIiil1Il == "object") {
            if (IIiil1Il && IIiil1Il.success === true) {
              console.log(" >> " + IIiil1Il.message);
              $.errorJoinShop = IIiil1Il.message;
              if (IIiil1Il.result && IIiil1Il.result.giftInfo) for (let Iil1l1iI of IIiil1Il.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + Iil1l1iI.discountString + Iil1l1iI.prizeName + Iil1l1iI.secondLineDesc);
              }
            } else IIiil1Il && typeof IIiil1Il == "object" && IIiil1Il.message ? ($.errorJoinShop = IIiil1Il.message, console.log("" + (IIiil1Il.message || ""))) : console.log(lll1ilil);
          } else console.log(lll1ilil);
        }
      } catch (i1I1iII) {
        $.logErr(i1I1iII, iliIlIi);
      } finally {
        il1llII1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async II1iIl1I => {
    const lIliIiIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      IiII1ili = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIliIiIl)
      },
      ilIlliI1 = await getH5st("8adfb", IiII1ili),
      lIiil1Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lIliIiIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ilIlliI1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIiil1Il, async (l1iIill, I1Ili11l, I11lIlIi) => {
      try {
        if (l1iIill) I1Ili11l && typeof I1Ili11l.statusCode != "undefined" && I1Ili11l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          I11lIlIi = I11lIlIi && I11lIlIi.match(/jsonp_.*?\((.*?)\);/) && I11lIlIi.match(/jsonp_.*?\((.*?)\);/)[1] || I11lIlIi;
          let iIIi1li1 = $.toObj(I11lIlIi, I11lIlIi);
          iIIi1li1 && typeof iIIi1li1 == "object" ? iIIi1li1 && iIIi1li1.success == true && (console.log("去加入：" + (iIIi1li1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iIIi1li1.result.interestsRuleList && iIIi1li1.result.interestsRuleList[0] && iIIi1li1.result.interestsRuleList[0].interestsInfo && iIIi1li1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(I11lIlIi);
        }
      } catch (ii1iI1lI) {
        $.logErr(ii1iI1lI, I1Ili11l);
      } finally {
        II1iIl1I();
      }
    });
  });
}
function taskPostUrl(iii1lil1, I1I1IiIi) {
  return {
    "url": "" + domains + iii1lil1,
    "body": JSON.stringify(I1I1IiIi),
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "Host": "szxyun-rc.isvjcloud.com",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.tokens,
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    }
  };
}
function taskPostUrls(III1Illi, illilIli) {
  return {
    "url": "" + domains + III1Illi,
    "body": JSON.stringify(illilIli),
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": cookie,
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
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(liI1iIII) {
  liI1iIII = liI1iIII || 32;
  let IIii1iiI = "abcdef0123456789",
    l1I1iIli = IIii1iiI.length,
    llIlII1I = "";
  for (i = 0; i < liI1iIII; i++) llIlII1I += IIii1iiI.charAt(Math.floor(Math.random() * l1I1iIli));
  return llIlII1I;
}
function safeGet(IiiIii1l) {
  if (!IiiIii1l) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(IiiIii1l) == "object") {
      return true;
    }
  } catch (il1l1i1) {
    return console.log(il1l1i1), false;
  }
}
function jsonParse(iIliiI) {
  if (typeof iIliiI == "string") try {
    return JSON.parse(iIliiI);
  } catch (i111ii1i) {
    return console.log(i111ii1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}