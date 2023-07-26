/*
活动名称：店铺礼包 · 无线营销
活动链接：https://gzsl-isv.isvjcloud.com/wuxian/mobileForApp/dist/views/pages/shopGiftBag.html?activityType=<活动类型>&activityId=<活动id>
环境变量：jd_gzsl_shopGiftBag_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺礼包（无线营销）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let cookiesArr = [],
  cookie = "",
  allMessage = "",
  activityUrl = process.env.jd_gzsl_shopGiftBag_activityUrl ? process.env.jd_gzsl_shopGiftBag_activityUrl : "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(liilillI => {
    cookiesArr.push(jdCookieNode[liilillI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(Il11lIi => Il11lIi.cookie)].filter(Il1lIiI => !!Il1lIiI);
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
  console.log("【ID】:\n" + activityId + "\n" + $.domain);
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：" + activityUrl);
  for (let iiii1IlI = 0; iiii1IlI < cookiesArr.length; iiii1IlI++) {
    if (cookiesArr[iiii1IlI]) {
      cookie = cookiesArr[iiii1IlI];
      originCookie = cookiesArr[iiii1IlI];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiii1IlI + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await run();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
  if (allMessage) {
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + allMessage);
    $.msg($.name, "", allMessage);
  }
})().catch(il1llIii => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + il1llIii + "!", "");
}).finally(() => {
  $.done();
});
async function run() {
  try {
    $.token = "";
    $.errs = false;
    $.token = await getToken(originCookie, domains);
    if ($.token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await $.wait(300);
    await getShopGiftActivity();
    if ($.activityEnd) return;
    await $.wait(300);
    !$.isContact ? (await contact(), await $.wait(300)) : $.log("已经关注过~");
  } catch (il1II11i) {
    console.log(il1II11i);
  }
}
function contact() {
  body = {
    "wxToken": $.token,
    "token": $.token,
    "source": "01",
    "venderId": $.venderId
  };
  let i1ili1i = {
    "url": domains + "/wuxian/user/getShopGiftPrize/" + $.venderId + "?wxToken=" + $.token,
    "headers": {
      "Host": $.domain,
      "Connection": "keep-alive",
      "Accept": "application/json, text/plain, */*",
      "User-Agent": UA,
      "Content-Type": "application/json;charset=UTF-8",
      "Origin": "https://" + $.domain,
      "Referer": activityUrl,
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,th-CN;q=0.8,th;q=0.7,vi-CN;q=0.6,vi;q=0.5,en-US;q=0.4,en;q=0.3",
      "Cookie": cookie
    },
    "body": JSON.stringify(body)
  };
  return new Promise(il1lilII => {
    $.post(i1ili1i, (Ii111iiI, Ii1llIli, IlI1l1i) => {
      try {
        if (Ii111iiI) $.log(Ii111iiI);else {
          if (safeGet(IlI1l1i)) {
            IlI1l1i = JSON.parse(IlI1l1i);
            if (IlI1l1i && IlI1l1i.status == 1) {
              $.prizes = IlI1l1i.activity.prizes;
              for (o of $.prizes) {
                $.quota = o.quota;
                $.discount = o.discount;
                $.unit = o.unit;
                if (o.quota == null && o.unit != 0) {
                  console.log("领取成功：" + $.unit + " 🎟️ 积分 ");
                } else {
                  if (o.quota != null && o.unit == 0) console.log("领取成功：满" + $.quota + "减" + $.discount + "🗑️ 优惠券 ");else {
                    if (o.quota != null && o.unit != 0) {
                      console.log("领取成功：满" + $.quota + "减" + $.discount + "🗑️ 优惠券 " + $.pointNum + " 🎟️ 积分");
                    } else console.log($.prizes);
                  }
                }
              }
            } else {
              $.log(IlI1l1i.msg);
              Ii111iiI = IlI1l1i.msg;
              for (let l1iii1l1 of ["不足", "火爆", "上限", "用完了", "擦肩", "抽奖机会"]) {
                if (Ii111iiI.includes(l1iii1l1)) {
                  $.errs = true;
                  break;
                }
              }
              for (let IiIIIiii of ["结束", "未开始"]) {
                if (Ii111iiI.includes(IiIIIiii)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          } else $.log("京东返回了空数据");
        }
      } catch (iI1llliI) {
        $.log(iI1llliI);
      } finally {
        il1lilII();
      }
    });
  });
}
function getShopGiftActivity() {
  body = {
    "venderId": activityId,
    "token": $.token,
    "source": "01"
  };
  let IlilIli = {
    "url": domains + "/wuxian/user/getShopGiftActivity/" + activityId,
    "headers": {
      "Host": $.domain,
      "Connection": "keep-alive",
      "Accept": "application/json, text/plain, */*",
      "User-Agent": UA,
      "Content-Type": "application/json;charset=UTF-8",
      "Origin": "https://" + $.domain,
      "Referer": activityUrl,
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,th-CN;q=0.8,th;q=0.7,vi-CN;q=0.6,vi;q=0.5,en-US;q=0.4,en;q=0.3",
      "Cookie": cookie
    },
    "body": JSON.stringify(body)
  };
  return new Promise(IlII111 => {
    $.post(IlilIli, (ilII111, IiII1lIl, li11ii) => {
      try {
        if (ilII111) $.log(ilII111);else {
          if (safeGet(li11ii)) {
            li11ii = JSON.parse(li11ii);
            if (li11ii && li11ii.status == 1) $.venderId = li11ii.activity.id;else {
              $.log(li11ii.msg);
              ilII111 = li11ii.msg;
              for (let Illi111I of ["不足", "火爆", "上限", "用完了", "擦肩", "抽奖机会"]) {
                if (ilII111.includes(Illi111I)) {
                  $.errs = true;
                  break;
                }
              }
              for (let I11I1IIl of ["结束", "未开始"]) {
                if (ilII111.includes(I11I1IIl)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          } else $.log("京东返回了空数据");
        }
      } catch (I1llI1iI) {
        $.log(I1llI1iI);
      } finally {
        IlII111();
      }
    });
  });
}
function jsonParse(IlIi11i1) {
  if (typeof IlIi11i1 == "string") try {
    return JSON.parse(IlIi11i1);
  } catch (lIiI1III) {
    return console.log(lIiI1III), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function safeGet(iIliIl1l) {
  if (!iIliIl1l) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(iIliIl1l) == "object") return true;
  } catch (ll1l1111) {
    return console.log(ll1l1111), false;
  }
}
function getQueryString(lI1iili, lII1ill) {
  let lIiili = new RegExp("(^|[&?])" + lII1ill + "=([^&]*)(&|$)"),
    Il1111I = lI1iili.match(lIiili);
  if (Il1111I != null) return decodeURIComponent(Il1111I[2]);
  return "";
}
function timestampToTime(lil1l1ll) {
  var l11I1 = new Date(lil1l1ll);
  var i11l1II = l11I1.getFullYear() + "-";
  var II1III1l = (l11I1.getMonth() + 1 < 10 ? "0" + (l11I1.getMonth() + 1) : l11I1.getMonth() + 1) + "-";
  var ili1Il1I = l11I1.getDate() + " ";
  ili1Il1I.length == 2 && (ili1Il1I = "0" + ili1Il1I);
  var i1I1i11 = l11I1.getHours() + ":";
  var IIlil1l1 = l11I1.getMinutes() + ":";
  var IllI1lll = l11I1.getSeconds();
  return i11l1II + II1III1l + ili1Il1I + i1I1i11 + IIlil1l1 + IllI1lll;
}
function getUA() {
  UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(Iil1lii1) {
  Iil1lii1 = Iil1lii1 || 32;
  let IlilllI = "abcdef0123456789",
    IlIlI1il = IlilllI.length,
    IilI1il1 = "";
  for (i = 0; i < Iil1lii1; i++) IilI1il1 += IlilllI.charAt(Math.floor(Math.random() * IlIlI1il));
  return IilI1il1;
}
