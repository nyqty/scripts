/*
活动名称：完善信息有礼 · 超级会员
活动地址：https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=<活动id>&venderId=<店铺id>
环境变量：jd_completeInfoActivity_activityId // 活动id
		 jd_completeInfoActivity_venderId // 店铺id
		 jd_completeInfoActivity_openCard // 是否开卡，默认不开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('完善信息有礼（超级会员）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let jd_completeInfoActivity_activityId = "",
  jd_completeInfoActivity_venderId = "",
  jd_completeInfoActivity_activityUrl = "https://cjhydz-isv.isvjcloud.com",
  lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
$.selectByIds = false;
let cookiesArr = [],
  cookie = "",
  message = "";
activityId = jd_completeInfoActivity_activityId;
activityUrl = jd_completeInfoActivity_activityUrl;
venderId = jd_completeInfoActivity_venderId;
let openCard = process.env.jd_completeInfoActivity_openCard === "true" ? true : false;
if ($.isNode()) {
  if (process.env.jd_completeInfoActivity_activityId) activityId = process.env.jd_completeInfoActivity_activityId;
  if (process.env.jd_completeInfoActivity_activityUrl) activityUrl = process.env.jd_completeInfoActivity_activityUrl;
  if (process.env.jd_completeInfoActivity_venderId) venderId = process.env.jd_completeInfoActivity_venderId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(i1lI1IiI => {
    cookiesArr.push(jdCookieNode[i1lI1IiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(I111Iili => I111Iili.cookie)].filter(IlII1i1l => !!IlII1i1l);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let IlIiili = 0; IlIiili < cookiesArr.length; IlIiili++) {
    if (cookiesArr[IlIiili]) {
      cookie = cookiesArr[IlIiili];
      originCookie = cookiesArr[IlIiili];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = IlIiili + 1;
      $.isLogin = true;
      $.nickName = "";
      $.activityEnd = false;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await completeInfoActivity();
      await $.wait(4000);
      if ($.hasEnd || $.maxcountnum || $.outFlag || $.activityEnd) {
        break;
      }
    }
  }
})().catch(I1li1iII => {
  $.log("", " " + $.name + ", 失败! 原因: " + I1li1iII + "!", "");
}).finally(() => {
  $.done();
});
async function completeInfoActivity() {
  $.sid = "";
  $.userId = venderId;
  $.Token = "";
  $.Pin = "";
  $.hisPin = "";
  $.card = [];
  $.getPrize = false;
  $.saveStop = false;
  await getCk();
  if ($.outFlag) {
    console.log("此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n");
    return;
  }
  $.Token = await getToken(originCookie, "https://cjhydz-isv.isvjcloud.com");
  if ($.Token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.userId) {
    await $.wait(1000);
    await getPin();
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await accessLog();
    await $.wait(1000);
    await getOpenCardInfo();
    await $.wait(1000);
    if (!$.openedCard && openCard) {
      $.shopactivityId = "";
      $.joinVenderId = venderId;
      await getshopactivityId();
      for (let I1iili1 = 0; I1iili1 < Array(5).length; I1iili1++) {
        if (I1iili1 > 0) console.log("第" + I1iili1 + "次 重新开卡");
        await joinShop();
        await $.wait(1000);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
      await getOpenCardInfo();
      await $.wait(1000);
    }
    if (!$.openedCard) {
      console.log("活动仅限店铺会员参与哦~");
      return;
    }
    await selectById();
    if ($.selectByIds) {
      await $.wait(1000);
      await listDrawContent();
      await $.wait(1000);
      for (let i1lIlIli = 0; i1lIlIli < 20; i1lIlIli++) {
        await save();
        if ($.getPrize || $.saveStop || $.activityEnd) break;
        await $.wait(1000);
      }
    } else console.log("已经领取过奖励了哦~");
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function showMsg() {
  return new Promise(iillllll => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    iillllll();
  });
}
function getSimpleActInfoVo() {
  return new Promise(ll11Ii1I => {
    let Ilili11 = "activityId=" + activityId;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", Ilili11), async (iil11iIl, ii11l1lI, ili11lli) => {
      try {
        if (iil11iIl) {
          console.log(String(iil11iIl));
          console.log($.name + " getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {}
      } catch (liIl11il) {
        $.logErr(liIl11il, ii11l1lI);
      } finally {
        ll11Ii1I();
      }
    });
  });
}
function getCk() {
  return new Promise(IlIiiiil => {
    let IIIIiiIi = {
      "url": activityUrl + "/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(IIIIiiIi, async (iilI1iI1, lli1iIII, lI1I11i) => {
      try {
        if (iilI1iI1) {
          lli1iIII && typeof lli1iIII.statusCode != "undefined" && lli1iIII.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log("" + JSON.stringify(iilI1iI1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (lli1iIII.status == 200) {
            refreshToken(lli1iIII);
          }
        }
      } catch (lI11llll) {
        $.logErr(lI11llll, lli1iIII);
      } finally {
        IlIiiiil();
      }
    });
  });
}
function getPin() {
  return new Promise(lIIIillI => {
    let IlliIIl1 = "userId=" + $.userId + "&token=" + $.Token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", IlliIIl1), async (Ii1illil, ii1iIii1, Ilii1lIl) => {
      try {
        if (Ii1illil) {
          console.log("" + JSON.stringify(Ii1illil));
          console.log($.name + " 3 API请求失败，请检查网路重试");
        } else {
          ii1iIii1.status == 200 && refreshToken(ii1iIii1);
          if (safeGet(Ilii1lIl)) {
            Ilii1lIl = JSON.parse(Ilii1lIl);
            if (Ilii1lIl.result && Ilii1lIl.data) {
              $.Pin = Ilii1lIl.data.secretPin;
              $.AUTH_C_USER = $.Pin;
              $.attrTouXiang = Ilii1lIl.data.yunMidImageUrl ? Ilii1lIl.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
              $.nickName = Ilii1lIl.data.pin;
            } else {}
          }
        }
      } catch (ill11lii) {
        $.logErr(ill11lii, ii1iIii1);
      } finally {
        lIIIillI();
      }
    });
  });
}
function getUserInfo() {
  return new Promise(I1liI1 => {
    let iiIIill1 = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", iiIIill1), async (iIiiI1ii, liI1iili, I1IIIi1l) => {
      try {
        if (iIiiI1ii) {
          console.log("" + JSON.stringify(iIiiI1ii));
          console.log($.name + " 6-1 API请求失败，请检查网路重试");
        } else {
          if (safeGet(I1IIIi1l)) {
            I1IIIi1l = JSON.parse(I1IIIi1l);
            I1IIIi1l.result && I1IIIi1l.data ? $.attrTouXiang = I1IIIi1l.data.yunMidImageUrl ? I1IIIi1l.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg" : console.log("异常6-2：" + JSON.stringify(I1IIIi1l));
          }
        }
      } catch (iIl1l11l) {
        $.logErr(iIl1l11l, liI1iili);
      } finally {
        I1liI1();
      }
    });
  });
}
function save(lI1Iil1l = 0) {
  return new Promise(IIl1Ili1 => {
    let ll11lii1 = encodeURIComponent(encodeURIComponent($.Pin)),
      ilIIl1l1 = ["%E7%BE%8E%E7%BE%8E", "%E5%B8%85%E5%B8%85", "%E6%B0%A7%E6%B0%94", "%E5%A4%A7%E5%93%A5", "%E8%A1%B0%E4%BB%94"],
      iiI1iil1 = 0;
    iiI1iil1 = Math.floor(Math.random() * ilIIl1l1.length);
    $.content = ilIIl1l1[iiI1iil1] ? ilIIl1l1[iiI1iil1] : $.content;
    $.authorNum = "" + random(10000000, 99999999);
    $.phone = "150" + $.authorNum;
    var lIlIill = new Date(),
      ilII11Il = lIlIill.getFullYear(),
      IlIIi1i1 = lIlIill.getMonth() + 1;
    IlIIi1i1 = IlIIi1i1 < 10 ? "0" + IlIIi1i1 : IlIIi1i1;
    var i1Il1 = lIlIill.getDate();
    i1Il1 = i1Il1 < 10 ? "0" + i1Il1 : i1Il1;
    $.birthDays = ilII11Il + "-" + IlIIi1i1 + "-" + i1Il1;
    let ilIil11I = "name=" + $.content + "&phone=" + $.phone + "&birthDay=" + $.birthDays + "&customContent=%5B%5D&venderId=" + venderId + "&activityId=" + activityId + "&pin=" + ll11lii1 + "&token=" + $.Token + "&drawInfoId=" + $.drawInfoId + "&vcode=&fromType=APP";
    $.post(taskPostUrl("/wx/completeInfoActivity/save", ilIil11I), async (IlI11, lI1liill, iiill1II) => {
      try {
        if (IlI11) {
          console.log("" + JSON.stringify(IlI11));
          console.log($.name + "save 请求失败，请检查网路重试");
        } else {
          if (safeGet(iiill1II)) {
            iiill1II = JSON.parse(iiill1II);
            if (iiill1II.result && iiill1II.data) {
              if (iiill1II.data.drawOk === true) {
                $.getPrize = true;
                console.log("🎉 " + iiill1II.data.name);
              } else console.log(iiill1II.data);
            } else {
              if (iiill1II.errorMessage) {
                if (!iiill1II.errorMessage.includes("火爆")) console.log(iiill1II.errorMessage || "");
                for (let l11llIll of ["未开始", "结束", "不存在", "不在", "发完", "发放完", "领完", "来晚", "抢光", "全部被领取"]) {
                  if (iiill1II.errorMessage.includes(l11llIll)) {
                    $.activityEnd = true;
                    break;
                  }
                }
                for (let liI of ["不足", "上限", "会员", "变更值", "擦肩"]) {
                  if (iiill1II.errorMessage.includes(liI)) {
                    $.saveStop = true;
                    break;
                  }
                }
                iiill1II.errorMessage.includes("不能为空") && ($.activityEnd = true);
              } else console.log(iiill1II);
            }
          }
        }
      } catch (IIliiill) {
        $.logErr(IIliiill, lI1liill);
      } finally {
        IIl1Ili1();
      }
    });
  });
}
function listDrawContent(liliIlI1 = 0) {
  return new Promise(liI11iIl => {
    let iilIIli = "activityId=" + activityId + "&type=63";
    $.post(taskPostUrl("/drawContent/listDrawContent", iilIIli), async (i11i11, lIIIliIi, i1lIlliI) => {
      try {
        if (i11i11) {
          console.log("" + JSON.stringify(i11i11));
          console.log($.name + "listDrawContent 请求失败，请检查网路重试");
        } else {
          if (safeGet(i1lIlliI)) {
            i1lIlliI = JSON.parse(i1lIlliI);
            if (i1lIlliI.result && i1lIlliI.data) {
              $.listDrawContents = i1lIlliI.data || [];
              for (const Il11IiII of $.listDrawContents) {
                $.drawInfoId = Il11IiII.drawInfoId;
              }
            } else {
              if (res.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(i1lIlliI.errorMessage || "");
            }
          }
        }
      } catch (liIlI111) {
        $.logErr(liIlI111, lIIIliIi);
      } finally {
        liI11iIl();
      }
    });
  });
}
function selectById(lil1llII = 0) {
  return new Promise(llI1li => {
    let iIl11IlI = encodeURIComponent(encodeURIComponent($.Pin)),
      II1I11ll = "venderId=" + venderId + "&activityId=" + activityId + "&pin=" + iIl11IlI;
    $.post(taskPostUrl("/wx/completeInfoActivity/selectById", II1I11ll), async (i1iiI1lI, II1Iiil, li1iii1i) => {
      try {
        if (i1iiI1lI) {
          console.log("" + JSON.stringify(i1iiI1lI));
          console.log($.name + "selectById 请求失败，请检查网路重试");
        } else {
          if (safeGet(li1iii1i)) {
            li1iii1i = JSON.parse(li1iii1i);
            li1iii1i.result == false ? $.selectByIds = true : (console.log("已经填写过信息了哦~"), $.selectByIds = false);
          }
        }
      } catch (ll11liII) {
        $.logErr(ll11liII, II1Iiil);
      } finally {
        llI1li();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(iIi1Ii1I => {
    let lil11II = "activityType=40&venderId=" + $.userId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", lil11II), async (l1Il11I1, iliIllil, ii1IlI1l) => {
      try {
        if (l1Il11I1) {
          console.log("" + JSON.stringify(l1Il11I1));
          console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(ii1IlI1l)) {
            ii1IlI1l = JSON.parse(ii1IlI1l);
            if (ii1IlI1l.result && ii1IlI1l.data) {
              $.openedCard = ii1IlI1l.data.openedCard || false;
              if (ii1IlI1l.data.openCardLink) {
                $.channel = ii1IlI1l.data.openCardLink.match(/channel=(\d+)/)[1];
                $.joinVenderId = ii1IlI1l.data.openCardLink.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (lIl1illI) {
        $.logErr(lIl1illI, iliIllil);
      } finally {
        iIi1Ii1I();
      }
    });
  });
}
function taskPostUrl(l11Illll, I1I11li) {
  return {
    "url": "" + activityUrl + l11Illll,
    "body": I1I11li,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": "cjhydz-isv.isvjcloud.com",
      "Origin": "https://cjhydz-isv.isvjcloud.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl + "/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function taskUrl(illIlIIl, llIiiIiI) {
  return {
    "url": "https://api.m.jd.com/client.action" + illIlIIl,
    "body": llIiiIiI,
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
function accessLog() {
  return new Promise(async il1IiIII => {
    const i11l1111 = {
      "url": "https://cjhydz-isv.isvjcloud.com/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "cjhydz-isv.isvjcloud.com",
        "Origin": "https://cjhydz-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl + "/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId,
        "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + venderId + "&code=40&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + activityId + "&pageUrl=https%3A%2F%2F$cjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D" + activityId + "&subType=app"
    };
    $.post(i11l1111, (lil1lI1l, l1i111l1, I11liIII) => {
      try {
        lil1lI1l ? (console.log("" + JSON.stringify(lil1lI1l)), console.log($.name + " API请求失败，请检查网路重试")) : l1i111l1.status == 200 && refreshToken(l1i111l1);
      } catch (iliIIlIl) {
        $.logErr(iliIIlIl, l1i111l1);
      } finally {
        il1IiIII();
      }
    });
  });
}
function refreshToken(Ii11111l) {
  if (Ii11111l) {
    if (Ii11111l.headers["set-cookie"]) {
      cookie = "";
      for (let liI1li1I of Ii11111l.headers["set-cookie"]) {
        lz_cookie[liI1li1I.split(";")[0].substr(0, liI1li1I.split(";")[0].indexOf("="))] = liI1li1I.split(";")[0].substr(liI1li1I.split(";")[0].indexOf("=") + 1);
      }
      for (const iiiilI1l of Object.keys(lz_cookie)) {
        cookie += iiiilI1l + "=" + lz_cookie[iiiilI1l] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(I11i1III) {
  I11i1III = I11i1III || 32;
  let liI1li1l = "abcdef0123456789",
    lIlI1iII = liI1li1l.length,
    iIliiI11 = "";
  for (i = 0; i < I11i1III; i++) iIliiI11 += liI1li1l.charAt(Math.floor(Math.random() * lIlI1iII));
  return iIliiI11;
}
function safeGet(l1l1Ii) {
  if (!l1l1Ii) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(l1l1Ii) == "object") return true;
  } catch (lII1IlIi) {
    return console.log(lII1IlIi), false;
  }
}
function jsonParse(liIlii1) {
  if (typeof liIlii1 == "string") try {
    return JSON.parse(liIlii1);
  } catch (i1l1li1I) {
    return console.log(i1l1li1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function random(iIl11Ii, liliIlIi) {
  return Math.floor(Math.random() * (liliIlIi - iIl11Ii)) + iIl11Ii;
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async iiIiIIil => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIlii11I = "";
    if ($.shopactivityId) IIlii11I = ",\"activityId\":" + $.shopactivityId;
    const Ii1iIII = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIlii11I + ",\"channel\":406}",
      iIlIlI1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii1iIII)
      },
      l1liiIli = await getH5st("8adfb", iIlIlI1i),
      l1IlIIlI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ii1iIII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1liiIli),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1IlIIlI, async (IiI1Ii1i, il11Ilil, iiii1I1) => {
      try {
        iiii1I1 = iiii1I1 && iiii1I1.match(/jsonp_.*?\((.*?)\);/) && iiii1I1.match(/jsonp_.*?\((.*?)\);/)[1] || iiii1I1;
        let iil11Ii = $.toObj(iiii1I1, iiii1I1);
        if (iil11Ii && typeof iil11Ii == "object") {
          if (iil11Ii && iil11Ii.success === true) {
            console.log(iil11Ii.message);
            $.errorJoinShop = iil11Ii.message;
            if (iil11Ii.result && iil11Ii.result.giftInfo) for (let IlIlIIii of iil11Ii.result.giftInfo.giftList) {
              console.log("入会获得: " + IlIlIIii.discountString + IlIlIIii.prizeName + IlIlIIii.secondLineDesc);
            }
            console.log("");
          } else iil11Ii && typeof iil11Ii == "object" && iil11Ii.message ? ($.errorJoinShop = iil11Ii.message, console.log("" + (iil11Ii.message || ""))) : console.log(iiii1I1);
        } else {
          console.log(iiii1I1);
        }
      } catch (lIill1li) {
        $.logErr(lIill1li, il11Ilil);
      } finally {
        iiIiIIil();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async IlI1111 => {
    let li1i1IIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const lI1iIil1 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(li1i1IIi)
      },
      ll11IIil = await getH5st("ef79a", lI1iIil1),
      iIilIli = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + li1i1IIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ll11IIil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIilIli, async (Il1111, lIll11I, l11lllil) => {
      try {
        l11lllil = l11lllil && l11lllil.match(/jsonp_.*?\((.*?)\);/) && l11lllil.match(/jsonp_.*?\((.*?)\);/)[1] || l11lllil;
        let il11IIIl = $.toObj(l11lllil, l11lllil);
        il11IIIl && typeof il11IIIl == "object" ? il11IIIl && il11IIIl.success == true && (console.log("\n去加入店铺会员：" + (il11IIIl.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = il11IIIl.result.interestsRuleList && il11IIIl.result.interestsRuleList[0] && il11IIIl.result.interestsRuleList[0].interestsInfo && il11IIIl.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(l11lllil);
      } catch (Iill1il) {
        $.logErr(Iill1il, lIll11I);
      } finally {
        IlI1111();
      }
    });
  });
}
