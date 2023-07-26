/*
活动名称：组队瓜分奖品 · 超级会员
活动链接：https://cjhydz-isv.isvjdcloud.com/wxTeam/activity?activityId=<活动id>
环境变量：jd_cjhy_activityId  // 活动id
         jd_cjhy_activityUrl // 活动域名

*/

const Env=require('./utils/Env.js');
const $ = new Env('组队瓜分奖品（超级会员）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let jd_cjhy_activityId = "",
  jd_cjhy_activityUrl = "https://cjhydz-isv.isvjcloud.com";
let cookiesArr = [],
  cookie = "",
  message = "",
  messageTitle = "";
activityId = jd_cjhy_activityId;
activityUrl = jd_cjhy_activityUrl;
let activityCookie = "",
  lz_cookie = {};
if ($.isNode()) {
  if (process.env.jd_cjhy_activityId) activityId = process.env.jd_cjhy_activityId;
  if (process.env.jd_cjhy_activityUrl) activityUrl = process.env.jd_cjhy_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(iI1lii1I => {
    cookiesArr.push(jdCookieNode[iI1lii1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lI1Ii1I => lI1Ii1I.cookie)].filter(ii1iIi1i => !!ii1iIi1i);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=" + activityId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.memberCount = 0;
  $.toactivity = [];
  $.noTeamLeader = false;
  for (let iiiii1il = 0; iiiii1il < cookiesArr.length; iiiii1il++) {
    if (cookiesArr[iiiii1il]) {
      cookie = cookiesArr[iiiii1il];
      originCookie = cookiesArr[iiiii1il];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = iiiii1il + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await Main();
      await $.wait(1000);
      if (!$.toactivity || $.maxTeam || $.noTeamLeader) {
        break;
      }
    }
  }
  if (message != "") await showMsg();
})().catch(II1lilIi => {
  $.log("", " " + $.name + ", 失败! 原因: " + II1lilIi + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  getUA();
  $.Token = "";
  $.Pin = "";
  $.saveTeam = false;
  await getCk();
  await $.wait(1500);
  $.index == 1 && ($.shopId = "", $.venderId = "", await getSimpleActInfoVo(), await $.wait(1000));
  if ($.shopId && $.venderId) {
    $.Token = await getToken(originCookie, "https://cjhydz-isv.isvjcloud.com");
    if ($.Token) await getPin();
    if (!$.Pin) {
      if ($.index == 1) $.noTeamLeader = true;
      console.log("获取用户[Pin]失败！");
      return;
    }
    await accessLog();
    await $.wait(1000);
    await getTeam();
    if ($.index == 1 && !$.signUuid) {
      $.noTeamLeader = true;
      return;
    }
    await $.wait(1500);
    if ($.maxTeam) {
      console.log("队伍已满员");
      return;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
    message += "【京东账号" + $.index + "】 未能获取活动信息\n";
    if ($.index == 1) return;
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.3.0;;;M/5.0;appBuild/167903;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22sv%22%3A%22CJGkEK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1645068549%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function showMsg() {
  return new Promise(II1l111i => {
    $.msg($.name, "", "" + message);
    II1l111i();
  });
}
function getSimpleActInfoVo() {
  return new Promise(i1Ii1IlI => {
    let iiii1lll = "activityId=" + activityId;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", iiii1lll), async (IIllIll, IiiIII, iiil1iIi) => {
      try {
        iiil1iIi = JSON.parse(iiil1iIi);
        $.shopId = iiil1iIi.data.shopId;
        $.venderId = iiil1iIi.data.venderId;
        if (IIllIll) {
          console.log(String(IIllIll));
          console.log("getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {}
      } catch (I1ilIl1I) {
        $.logErr(I1ilIl1I, IiiIII);
      } finally {
        i1Ii1IlI();
      }
    });
  });
}
function randomString(liiiIl1) {
  liiiIl1 = liiiIl1 || 32;
  let lili1il1 = "abcdef0123456789",
    l1liIIIi = lili1il1.length,
    i1iiIl = "";
  for (i = 0; i < liiiIl1; i++) i1iiIl += lili1il1.charAt(Math.floor(Math.random() * l1liIIIi));
  return i1iiIl;
}
function getCk() {
  return new Promise(IIIlI1l => {
    let iIIil1Ii = {
      "url": activityUrl + "/wxTeam/activity?activityId=" + activityId,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iIIil1Ii, async (IIi1liiI, lill1Ill, l1l1Il1i) => {
      try {
        IIi1liiI ? (console.log("" + JSON.stringify(IIi1liiI)), console.log("未能获取 LZ_TOKEN ，请检查网路重试")) : lill1Ill.status == 200 && setActivityCookie(lill1Ill);
      } catch (l1II1ilI) {
        $.logErr(l1II1ilI, lill1Ill);
      } finally {
        IIIlI1l();
      }
    });
  });
}
function setActivityCookie(IllI1lIi) {
  if (IllI1lIi.headers["set-cookie"]) {
    cookie = "";
    for (let I1lIl1lI of IllI1lIi.headers["set-cookie"]) {
      lz_cookie[I1lIl1lI.split(";")[0].substr(0, I1lIl1lI.split(";")[0].indexOf("="))] = I1lIl1lI.split(";")[0].substr(I1lIl1lI.split(";")[0].indexOf("=") + 1);
    }
    for (const Ii11l1ll of Object.keys(lz_cookie)) {
      cookie += Ii11l1ll + "=" + lz_cookie[Ii11l1ll] + ";";
    }
    activityCookie = cookie;
  }
}
function getPin() {
  return new Promise(lIl1i1iI => {
    let l1II1l1I = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP&riskType=1";
    $.post(taskPostUrl("/customer/getMyPing", l1II1l1I), async (iillili1, ii1ii1l, IlIIlill) => {
      try {
        iillili1 ? (console.log("" + JSON.stringify(iillili1)), console.log("getMyPing API请求失败，请检查网路重试")) : (ii1ii1l.status == 200 && setActivityCookie(ii1ii1l), safeGet(IlIIlill) && (IlIIlill = JSON.parse(IlIIlill), IlIIlill.result && IlIIlill.data ? ($.Pin = IlIIlill.data.secretPin, $.attrTouXiang = IlIIlill.data.yunMidImageUrl ? IlIIlill.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg") : console.log("异常3：" + JSON.stringify(IlIIlill))));
      } catch (iii1iil) {
        $.logErr(iii1iil, ii1ii1l);
      } finally {
        lIl1i1iI();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(lilIi11i => {
    let ll11i1il = "venderId=" + $.venderId + "&buyerPin=" + encodeURIComponent($.Pin);
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", ll11i1il), async (IiiiIiil, IlIl1l1l, iI1IIiii) => {
      try {
        if (IiiiIiil) {
          console.log("" + JSON.stringify(IiiiIiil));
          console.log("getOpenCardInfo API请求失败，请检查网路重试");
        } else {
          if (safeGet(iI1IIiii)) {
            iI1IIiii = JSON.parse(iI1IIiii);
            if (iI1IIiii.result && iI1IIiii.data) {
              if (iI1IIiii.data.openCardLink) {
                $.channel = iI1IIiii.data.openCardLink.match(/channel=(\d+)/)[1];
                $.joinVenderId = iI1IIiii.data.openCardLink.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (Il11I1lI) {
        $.logErr(Il11I1lI, IlIl1l1l);
      } finally {
        lilIi11i();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIIIii1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lIIII1ii = "";
    if ($.shopactivityId) lIIII1ii = ",\"activityId\":" + $.shopactivityId;
    const lliIiil = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lIIII1ii + ",\"channel\":406}",
      IIIIi11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lliIiil)
      },
      i11iiII1 = await getH5st("8adfb", IIIIi11),
      Ii1llI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lliIiil + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11iiII1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii1llI1, async (IllliIil, l1Il1ill, ll1I1I1i) => {
      try {
        ll1I1I1i = ll1I1I1i && ll1I1I1i.match(/jsonp_.*?\((.*?)\);/) && ll1I1I1i.match(/jsonp_.*?\((.*?)\);/)[1] || ll1I1I1i;
        let l1l1l1Ii = $.toObj(ll1I1I1i, ll1I1I1i);
        if (l1l1l1Ii && typeof l1l1l1Ii == "object") {
          if (l1l1l1Ii && l1l1l1Ii.success === true) {
            console.log(l1l1l1Ii.message);
            $.errorJoinShop = l1l1l1Ii.message;
            if (l1l1l1Ii.result && l1l1l1Ii.result.giftInfo) for (let lIi11iI of l1l1l1Ii.result.giftInfo.giftList) {
              console.log("入会获得: " + lIi11iI.discountString + lIi11iI.prizeName + lIi11iI.secondLineDesc);
            }
            console.log("");
          } else l1l1l1Ii && typeof l1l1l1Ii == "object" && l1l1l1Ii.message ? ($.errorJoinShop = l1l1l1Ii.message, console.log("" + (l1l1l1Ii.message || ""))) : console.log(ll1I1I1i);
        } else {
          console.log(ll1I1I1i);
        }
      } catch (i11iI1I) {
        $.logErr(i11iI1I, l1Il1ill);
      } finally {
        IIIIii1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iIiil1I => {
    let l1illllI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const I1lIIIIl = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1illllI)
      },
      lllI1ili = await getH5st("ef79a", I1lIIIIl),
      lllliIlI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l1illllI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lllI1ili),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lllliIlI, async (ili1iIll, iIiIIiI1, il11ilIl) => {
      try {
        il11ilIl = il11ilIl && il11ilIl.match(/jsonp_.*?\((.*?)\);/) && il11ilIl.match(/jsonp_.*?\((.*?)\);/)[1] || il11ilIl;
        let i1IIlIli = $.toObj(il11ilIl, il11ilIl);
        if (i1IIlIli && typeof i1IIlIli == "object") {
          i1IIlIli && i1IIlIli.success == true && (console.log("\n去加入店铺会员：" + (i1IIlIli.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = i1IIlIli.result.interestsRuleList && i1IIlIli.result.interestsRuleList[0] && i1IIlIli.result.interestsRuleList[0].interestsInfo && i1IIlIli.result.interestsRuleList[0].interestsInfo.activityId || "");
        } else console.log(il11ilIl);
      } catch (i11ll1Il) {
        $.logErr(i11ll1Il, iIiIIiI1);
      } finally {
        iIiil1I();
      }
    });
  });
}
function getTeam() {
  return new Promise(ll1IiiI1 => {
    let IiIIlli1 = "activityId=" + activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    if ($.signUuid) IiIIlli1 += "&signUuid=" + $.signUuid;
    $.post(taskPostUrls("/wxTeam/activityContent", IiIIlli1), async (ii1I1iI, lIIlIl11, I1Ii1lii) => {
      try {
        if (ii1I1iI) {
          console.log("" + JSON.stringify(ii1I1iI));
          console.log("activityContent API请求失败，请检查网路重试");
        } else {
          if (safeGet(I1Ii1lii)) {
            I1Ii1lii = JSON.parse(I1Ii1lii);
            if (I1Ii1lii.result && I1Ii1lii.data) {
              if (new Date(I1Ii1lii.data.active.endTimeStr.replace(/-/g, "/")).getTime() < new Date().getTime()) {
                $.toactivity = false;
                console.log("活动结束");
                messageTitle += "活动结束\n";
                ll1IiiI1();
              } else {
                if (!I1Ii1lii.data.canCreate && I1Ii1lii.data.list == null) message += "人数已满\n";
                I1Ii1lii.data.share ? $.memberCount = parseInt(I1Ii1lii.data.share.memberCount, 10) + 1 : $.memberCount = 0;
                if ($.index == 1) {
                  $.saveTeam = true;
                  $.maxGroup = I1Ii1lii.data.active.maxGroup;
                  $.successRetList = I1Ii1lii.data.successRetList;
                  $.successRetList.length === $.maxGroup && $.successRetList[$.successRetList.length - 1].memberList.length == 5 && (console.log("活动创建队伍已达到上限且成员已满"), $.noTeamLeader = true);
                }
                $.signUuid && ($.log("去加入队伍 ➜  " + $.signUuid), $.wait(600), await joinTeam());
                if ($.saveTeam) {
                  if (I1Ii1lii.data.canCreate) {
                    await saveTeam();
                  } else {
                    $.signUuid = I1Ii1lii.data.signUuid;
                    messageTitle += "队伍id: " + $.signUuid + "\n";
                    message += "【京东账号" + $.index + "】 创建队伍\n";
                    $.log("车头队伍 id: " + $.signUuid);
                  }
                }
              }
            } else console.log("异常5：" + JSON.stringify(I1Ii1lii));
          }
        }
      } catch (iIlI1li) {
        $.logErr(iIlI1li, lIIlIl11);
      } finally {
        ll1IiiI1(ll1IiiI1);
      }
    });
  });
}
function saveTeam(lll1IIl1 = 0) {
  return new Promise(iIlIIIi1 => {
    let lIli1Ii = encodeURIComponent(encodeURIComponent($.Pin));
    if (lll1IIl1 == 1) lIli1Ii = encodeURIComponent(encodeURIComponent($.Pin));
    let llili1ll = "activityId=" + activityId + "&pin=" + lIli1Ii + "&pinImg=" + encodeURIComponent(encodeURIComponent($.attrTouXiang)) + "&venderId=" + $.venderId;
    $.post(taskPostUrls("/wxTeam/saveCaptain", llili1ll), async (ll1li1i, i1II11Il, lIlIlll) => {
      try {
        if (ll1li1i) {
          console.log("" + JSON.stringify(ll1li1i));
          console.log($.name + "saveCaptain API请求失败，请检查网路重试");
        } else {
          if (safeGet(lIlIlll)) {
            lIlIlll = JSON.parse(lIlIlll);
            if (lIlIlll.result && lIlIlll.data) {
              message += "【京东账号" + $.index + "】 创建队伍\n";
              $.signUuid = lIlIlll.data.signUuid;
              console.log("创建队伍成功，队伍 id: " + $.signUuid);
              messageTitle += "队伍id: " + $.signUuid + " ";
            } else {
              console.log("创建队伍异常：" + lIlIlll.errorMessage ? lIlIlll.errorMessage : JSON.stringify(lIlIlll));
              if (lIlIlll.errorMessage.indexOf("不是店铺会员") > -1 && lll1IIl1 != 3) {
                await getshopactivityId();
                $.errorJoinShop = "";
                await joinShop();
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(1000), await joinShop());
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("第2次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第3次 重新开卡"), await $.wait(1000), await joinShop());
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("第4次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第5次 重新开卡"), await $.wait(1000), await joinShop());
                await $.wait(1000);
                await saveTeam(3);
              } else lIlIlll.errorMessage.indexOf("奖品与您擦肩而过") > -1 && lll1IIl1 == 0 && (await $.wait(1000), await saveTeam(1));
            }
          }
        }
      } catch (l1I1i1lI) {
        $.logErr(l1I1i1lI, i1II11Il);
      } finally {
        iIlIIIi1();
      }
    });
  });
}
function joinTeam(iIiiiiI = 0) {
  return new Promise(ill11IIi => {
    let i1I1III1 = encodeURIComponent(encodeURIComponent($.Pin));
    if (iIiiiiI == 1) i1I1III1 = encodeURIComponent(encodeURIComponent($.Pin));
    let liliIlI = "activityId=" + activityId + "&signUuid=" + $.signUuid + "&pin=" + i1I1III1 + "&pinImg=" + encodeURIComponent(encodeURIComponent($.attrTouXiang)) + "&venderId=" + $.venderId;
    $.post(taskPostUrls("/wxTeam/saveMember", liliIlI), async (ilIIiiI1, l11IIlli, IliI1lI) => {
      try {
        if (ilIIiiI1) {
          console.log("" + JSON.stringify(ilIIiiI1));
          console.log($.name + "saveMember API请求失败，请检查网路重试");
        } else {
          if (safeGet(IliI1lI)) {
            IliI1lI = JSON.parse(IliI1lI);
            if (IliI1lI.result && IliI1lI.data) {
              message += "【京东账号" + $.index + "】 加入队伍\n";
              $.log("加入队伍成功");
            } else {
              if (IliI1lI.errorMessage.indexOf("不是店铺会员") > -1 && iIiiiiI != 3) {
                await getshopactivityId();
                $.errorJoinShop = "";
                await joinShop();
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(1000), await joinShop());
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第2次 重新开卡"), await $.wait(1000), await joinShop());
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第3次 重新开卡"), await $.wait(1000), await joinShop());
                await joinTeam(3);
              } else {
                if (IliI1lI.errorMessage.indexOf("队伍已经满员") > -1) $.maxTeam = true;else {
                  if (IliI1lI.errorMessage.indexOf("奖品与您擦肩而过") > -1 && iIiiiiI == 0) {
                    await joinTeam(1);
                  } else IliI1lI.errorMessage ? console.log("加入异常：" + IliI1lI.errorMessage) : (console.log("加入异常：" + JSON.stringify(IliI1lI)), message += "【京东账号" + $.index + "】 " + IliI1lI.errorMessage + "\n");
                }
              }
            }
          }
        }
      } catch (l111iilI) {
        $.logErr(l111iilI, l11IIlli);
      } finally {
        ill11IIi();
      }
    });
  });
}
function taskPostUrls(IIlI1iIl, i1i1i11I) {
  return {
    "url": "" + activityUrl + IIlI1iIl,
    "headers": {
      "Host": "cjhydz-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://cjhydz-isv.isvjcloud.com",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": activityUrl + "/wxTeam/activity?activityId=" + activityId,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER
    },
    "body": i1i1i11I
  };
}
function taskPostUrl(ii1IIIIi, i1l11iIi) {
  return {
    "url": "" + activityUrl + ii1IIIIi,
    "headers": {
      "Host": "cjhydz-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://cjhydz-isv.isvjcloud.com",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": activityUrl + "/wxTeam/activity?activityId=" + activityId,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER
    },
    "body": i1l11iIi
  };
}
function taskUrl(llIlllIi, illl1lI1) {
  return {
    "url": "https://api.m.jd.com/client.action" + llIlllIi,
    "body": illl1lI1,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Cookie": cookie,
      "User-Agent": $.UA
    }
  };
}
function safeGet(lliIl1l1) {
  if (!lliIl1l1) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(lliIl1l1) == "object") return true;
  } catch (IIl1iiI1) {
    return console.log(IIl1iiI1), false;
  }
}
function accessLog() {
  return new Promise(async ilIllI1i => {
    const iIIlli1I = {
      "url": "https://cjhydz-isv.isvjcloud.com/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "cjhydz-isv.isvjcloud.com",
        "Origin": "https://cjhydz-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl + "/wxTeam/activity?activityId=" + activityId,
        "Cookie": cookie + activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=102&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + activityId + "&pageUrl=https%3A%2F%2Fcjhydz-isv.isvjcloud.com%2FwxTeam%2Factivity%3FactivityId%3D" + activityId + "&subType=app"
    };
    $.post(iIIlli1I, (Iliilll, il11i1il, iiil1III) => {
      try {
        Iliilll ? (console.log("" + JSON.stringify(Iliilll)), console.log($.name + "accessLog API请求失败，请检查网路重试")) : il11i1il.status == 200 && setActivityCookie(il11i1il);
      } catch (l1lIliI1) {
        $.logErr(l1lIliI1, il11i1il);
      } finally {
        ilIllI1i();
      }
    });
  });
}
function jsonParse(I11l11I1) {
  if (typeof strv == "string") {
    try {
      return JSON.parse(I11l11I1);
    } catch (i1iIiIlI) {
      return console.log(i1iIiIlI), $.msg($.name, "", "不要在BoxJS手动复制粘贴修改cookie"), [];
    }
  }
}
function GetCookie() {
  if ($request.url.indexOf("/wxTeam/shopInfo") > -1) {
    if ($request.body) {
      let l1iiiiii = $request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
      if (l1iiiiii) {
        let iiiIil1 = $request.url.split("/");
        console.log("activityId: " + l1iiiiii[1]);
        console.log("activityUrl: " + iiiIil1[0] + "//" + iiiIil1[2]);
        $.setdata(l1iiiiii[1], "jd_kr_cjhy_activityId");
        $.setdata(iiiIil1[0] + "//" + iiiIil1[2], "jd_kr_cjhy_activityUrl");
        $.msg($.name, "获取activityId: 成功", "activityId:" + l1iiiiii[1] + "\nactivityUrl:" + iiiIil1[0] + "//" + iiiIil1[2]);
      } else $.msg($.name, "找不到activityId", "");
    }
  }
}
