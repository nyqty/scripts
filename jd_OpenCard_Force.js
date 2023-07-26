/*
强制入会

环境变量：VENDER_ID // venderId或vendorId的值，多个用&、@或逗号连接，但是不要混用

*/

const Env=require('./utils/Env.js');
const $ = new Env('强制入会')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')

let VENDER_IDs = [];
if (process.env.VENDER_ID) {
  if (process.env.VENDER_ID.indexOf("&") > -1) VENDER_IDs = process.env.VENDER_ID.split("&");else {
    if (process.env.VENDER_ID.indexOf("@") > -1) VENDER_IDs = process.env.VENDER_ID.split("@");else process.env.VENDER_ID.indexOf(",") > -1 ? VENDER_IDs = process.env.VENDER_ID.split(",") : VENDER_IDs = [process.env.VENDER_ID];
  }
}
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(I1i11lil => {
    cookiesArr.push(jdCookieNode[I1i11lil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(liIlIl11 => liIlIl11.cookie)].filter(Ilii1IIi => !!Ilii1IIi);
allMessage = "";
message = "";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let l1IlIlI1 = 0; l1IlIlI1 < cookiesArr.length; l1IlIlI1++) {
    cookie = cookiesArr[l1IlIlI1];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1IlIlI1 + 1;
      message = "";
      $.nickName = "";
      $.UserName = $.nickName || $.UserName;
      console.log("\n******开始【京东账号" + $.index + "】" + $.UserName + "******\n");
      await getUA();
      await run();
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(I11liIII => $.logErr(I11liIII)).finally(() => $.done());
async function run() {
  try {
    let lli1liii = new Array();
    const lIliIlI1 = VENDER_IDs;
    for (let IIIl1ll1 = 0; IIIl1ll1 < lIliIlI1.length; IIIl1ll1++) {
      $.joinVenderId = lIliIlI1[IIIl1ll1];
      ($.index = 1) ? ($.shopactivityId = "", await getshopactivityId(), lli1liii[IIIl1ll1] = $.shopactivityId) : $.shopactivityId = lli1liii[IIIl1ll1];
      $.errorJoinShop = "";
      await joinShop();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第2次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第3次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), allMessage += "【账号" + $.index + "】" + $.UserName + "开卡失败❌ ，请重新执行脚本\n");
    }
  } catch (lllliilI) {
    console.log(lllliilI);
  }
}
function TotalBean() {
  return new Promise(async iIllliii => {
    const lilillli = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    };
    $.post(lilillli, (IIIIilii, II11liIi, I1liiI1i) => {
      try {
        if (IIIIilii) {
          console.log(String(IIIIilii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          I1liiI1i ? (I1liiI1i = JSON.parse(I1liiI1i), I1liiI1i.retcode === 0 && I1liiI1i.base && I1liiI1i.base.nickname && ($.nickName = I1liiI1i.base.nickname)) : console.log("京东服务器返回空数据");
        }
      } catch (i1l1i111) {
        $.logErr(i1l1i111);
      } finally {
        iIllliii();
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(i11ll1il) {
  i11ll1il = i11ll1il || 32;
  let li11i1ll = "abcdef0123456789",
    Ii1I11Il = li11i1ll.length,
    IIIllIi = "";
  for (i = 0; i < i11ll1il; i++) IIIllIi += li11i1ll.charAt(Math.floor(Math.random() * Ii1I11Il));
  return IIIllIi;
}
function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IililiIl => {
    $.errorJoinShop = "";
    $.openCardStatus = false;
    let Ili1li1 = "";
    if ($.shopactivityId) Ili1li1 = ",\"activityId\":" + $.shopactivityId;
    if ($.openCardStatus) {
      console.log("已经是会员了~");
      IililiIl();
    } else {
      const iIiI1ill = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Ili1li1 + ",\"channel\":406}",
        i1l1lI = {
          "appid": "jd_shop_member",
          "functionId": "bindWithVender",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": JSON.parse(iIiI1ill)
        },
        lII1lII = await getH5st("8adfb", i1l1lI),
        iilIIlIl = {
          "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + encodeURIComponent(iIiI1ill) + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lII1lII),
          "headers": {
            "Content-Type": "text/plain; Charset=UTF-8",
            "Origin": "https://api.m.jd.com",
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "User-Agent": $.UA,
            "content-type": "application/x-www-form-urlencoded",
            "Cookie": cookie
          }
        };
      $.get(iilIIlIl, async (I1lII111, lillI11l, IIi1I) => {
        try {
          let Iii1liil = $.toObj(IIi1I, IIi1I);
          if (typeof Iii1liil == "object") {
            if (Iii1liil.success === true) {
              console.log(Iii1liil.message);
              $.errorJoinShop = Iii1liil.message;
              if (Iii1liil.result && Iii1liil.result.giftInfo) for (let Ii11Illi of Iii1liil.result.giftInfo.giftList) {
                console.log("入会获得：" + Ii11Illi.discountString + Ii11Illi.prizeName + Ii11Illi.secondLineDesc);
              }
            } else {
              if (typeof Iii1liil == "object" && Iii1liil.message) {
                $.errorJoinShop = Iii1liil.message;
                console.log("" + (Iii1liil.message || ""));
              } else console.log(IIi1I);
            }
          } else console.log(IIi1I);
        } catch (i1l1) {
          $.logErr(i1l1, lillI11l);
        } finally {
          IililiIl();
        }
      });
    }
  });
}
function getshopactivityId() {
  return new Promise(iili1II => {
    const lIlIllii = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22" + $.joinVenderId + "%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888",
      "headers": {
        "Content-Type": "text/plain; Charset=UTF-8",
        "Origin": "https://api.m.jd.com",
        "Host": "api.m.jd.com",
        "accept": "*/*",
        "User-Agent": $.UA,
        "content-type": "application/x-www-form-urlencoded",
        "Cookie": cookie
      }
    };
    $.get(lIlIllii, async (ilIili, i1llI1l, IiilliIl) => {
      try {
        let IIIIIliI = $.toObj(IiilliIl, IiilliIl);
        typeof IIIIIliI == "object" ? IIIIIliI.success == true && (console.log("会员卡名称：" + (IIIIIliI.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = IIIIIliI.result.interestsRuleList && IIIIIliI.result.interestsRuleList[0] && IIIIIliI.result.interestsRuleList[0].interestsInfo && IIIIIliI.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = IIIIIliI.result.userInfo.openCardStatus) : console.log(IiilliIl);
      } catch (liilIili) {
        $.logErr(liilIili, i1llI1l);
      } finally {
        iili1II();
      }
    });
  });
}
function jsonParse(lI1IIili) {
  if (typeof lI1IIili == "string") try {
    return JSON.parse(lI1IIili);
  } catch (i1l1i1l1) {
    return console.log(i1l1i1l1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
