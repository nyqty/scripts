/*
活动名称：幸运大转盘 · 无线营销
活动链接：https://gzsl-isv.isvjcloud.com/wuxian/user/getLottery/<活动id>
环境变量：jd_gzsl_getLottery_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('幸运大转盘（无线营销）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let cookiesArr = [],
  cookie = "",
  allMessage = "",
  activityUrl = process.env.jd_gzsl_getLottery_activityUrl ? process.env.jd_gzsl_getLottery_activityUrl : "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(i11lliIl => {
    cookiesArr.push(jdCookieNode[i11lliIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IlIIiIil => IlIIiIil.cookie)].filter(lIIlIIIi => !!lIIlIIIi);
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
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
  for (let il1Iiii = 0; il1Iiii < cookiesArr.length; il1Iiii++) {
    if (cookiesArr[il1Iiii]) {
      cookie = cookiesArr[il1Iiii];
      originCookie = cookiesArr[il1Iiii];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = il1Iiii + 1;
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
      if ($.hasEnd || $.activityEnd) break;
    }
  }
  if (allMessage) {
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + allMessage);
    $.msg($.name, "", allMessage);
  }
})().catch(i1I1IIlI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + i1I1IIlI + "!", "");
}).finally(() => {
  $.done();
});
async function run() {
  try {
    $.token = "";
    $.errs = false;
    let ii11IlIl = 5;
    $.token = await getToken(originCookie, domains);
    if ($.token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await $.wait(300);
    await getLottery();
    if ($.activityEnd) return;
    await $.wait(300);
    for (m = 1; ii11IlIl--; m++) {
      if (!$.errs) {
        await draw();
        $.flowShop && (await flowShop());
        if ($.activityEnd) return;
        await $.wait(parseInt(Math.random() * 2000 + 2500, 10));
      }
    }
  } catch (lIl11iii) {
    console.log(lIl11iii);
  }
}
function getLottery() {
  body = {
    "activityId": activityId,
    "token": $.token,
    "source": "01"
  };
  let liIi1lll = {
    "url": domains + "/wuxian/user/getLottery/" + activityId,
    "headers": {
      "Host": $.domain,
      "Connection": "keep-alive",
      "Accept": "application/json, text/javascript, */*; q=0.01",
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
  return new Promise(ili11Il => {
    $.post(liIi1lll, (IlilIiil, II1IIIII, il11Illl) => {
      try {
        if (IlilIiil) $.log(IlilIiil);else {
          if (il11Illl) {
            il11Illl = JSON.parse(il11Illl);
            if (il11Illl && il11Illl.status == 1) {
              $.index == 1 && console.log("活动规则：" + JSON.parse(JSON.stringify(il11Illl.activity.rule)) + "\n");
              $.customerId = JSON.parse(JSON.stringify(il11Illl.activity.customerId));
              $.shopId = JSON.parse(JSON.stringify(il11Illl.activity.shopId));
            } else {
              $.log(il11Illl.msg);
              IlilIiil = il11Illl.msg;
              for (let IIli1Ill of ["结束", "未开始"]) {
                if (IlilIiil.includes(IIli1Ill)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          } else $.log("京东返回了空数据");
        }
      } catch (iI1IiIIl) {
        $.log(iI1IiIIl);
      } finally {
        ili11Il();
      }
    });
  });
}
function flowShop() {
  body = {
    "shopId": $.shopId,
    "venderId": $.customerId,
    "token": $.token,
    "source": "01"
  };
  let lIli1III = {
    "url": domains + "/wuxian/user/flowShop/" + $.shopId + "/" + $.customerId,
    "headers": {
      "Host": $.domain,
      "Connection": "keep-alive",
      "Accept": "application/json, text/javascript, */*; q=0.01",
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
  return new Promise(Illl11il => {
    $.post(lIli1III, (iIi1lIIl, IiIiIi1I, IllIIl) => {
      try {
        if (iIi1lIIl) $.log(iIi1lIIl);else {
          if (IllIIl) {
            IllIIl = JSON.parse(IllIIl);
            if (IllIIl && IllIIl.status == 1) {} else $.log(IllIIl);
          } else $.log("京东返回了空数据");
        }
      } catch (i1IIl1il) {
        $.log(i1IIl1il);
      } finally {
        Illl11il();
      }
    });
  });
}
function draw() {
  body = {
    "activityId": activityId,
    "token": $.token,
    "source": "01"
  };
  let l1Il11l1 = {
    "url": domains + "/wuxian/user/draw/" + activityId,
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
  return new Promise(lli11Iil => {
    $.post(l1Il11l1, (l1ll1il1, liiiiiII, iIili1lI) => {
      try {
        if (l1ll1il1) $.log(l1ll1il1);else {
          if (safeGet(iIili1lI)) {
            iIili1lI = JSON.parse(iIili1lI);
            if (iIili1lI && iIili1lI.status == 1) iIili1lI.data == -1 ? $.log("💨 空气") : console.log("🎉 " + iIili1lI.data.name);else {
              if (iIili1lI && iIili1lI.status == -14 || iIili1lI && iIili1lI.status == -7) {
                $.log("不是店铺会员，退出~");
                $.errs = true;
              } else {
                if (iIili1lI && iIili1lI.status == -3) {
                  $.log(iIili1lI.msg);
                  l1ll1il1 = iIili1lI.msg;
                  for (let IiIIl1il of ["关注"]) {
                    if (l1ll1il1.includes(IiIIl1il)) {
                      $.flowShop = true;
                      break;
                    }
                  }
                } else {
                  $.log(iIili1lI.msg);
                  l1ll1il1 = iIili1lI.msg;
                  for (let llI1liI1 of ["不足", "火爆", "上限", "用完了", "擦肩", "抽奖机会", "达到"]) {
                    if (l1ll1il1.includes(llI1liI1)) {
                      $.errs = true;
                      break;
                    }
                  }
                  for (let iilIIlli of ["结束", "未开始"]) {
                    if (l1ll1il1.includes(iilIIlli)) {
                      $.activityEnd = true;
                      break;
                    }
                  }
                }
              }
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (IIiIll1I) {
        $.log(IIiIll1I);
      } finally {
        lli11Iil();
      }
    });
  });
}
function jsonParse(lill1II) {
  if (typeof lill1II == "string") try {
    return JSON.parse(lill1II);
  } catch (iIIIilI) {
    return console.log(iIIIilI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function safeGet(lIliIII) {
  if (!lIliIII) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(lIliIII) == "object") return true;
  } catch (IIilIiIi) {
    return console.log(IIilIiIi), false;
  }
}
function getQueryString(ll1llIil, lii1i111) {
  let illli1iI = new RegExp("(^|[&?])" + lii1i111 + "=([^&]*)(&|$)"),
    l11l1i = ll1llIil.match(illli1iI);
  if (l11l1i != null) return decodeURIComponent(l11l1i[2]);
  return "";
}
function getUA() {
  UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(l1liillI) {
  l1liillI = l1liillI || 32;
  let IliiiIli = "abcdef0123456789",
    IilI1li = IliiiIli.length,
    iIilli = "";
  for (i = 0; i < l1liillI; i++) iIilli += IliiiIli.charAt(Math.floor(Math.random() * IilI1li));
  return iIilli;
}
