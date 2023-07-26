/*
入会开卡领取礼包

环境变量
VENDER_ID // venderId或vendorId的值，多个用&、@或逗号连接，但是不要混用
OPENCARD_BEAN // 最小入会京豆（默认10）

*/

const Env=require('./utils/Env.js');
const $ = new Env('入会开卡领取礼包')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')

const OPENCARD_BEAN = process.env.OPENCARD_BEAN || "10";
let VENDER_IDs = [];
if (process.env.VENDER_ID) {
  if (process.env.VENDER_ID.indexOf("&") > -1) VENDER_IDs = process.env.VENDER_ID.split("&");else {
    if (process.env.VENDER_ID.indexOf("@") > -1) VENDER_IDs = process.env.VENDER_ID.split("@");else process.env.VENDER_ID.indexOf(",") > -1 ? VENDER_IDs = process.env.VENDER_ID.split(",") : VENDER_IDs = [process.env.VENDER_ID];
  }
}
let nobeans_mark = 0,
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(i1li1ili => {
    cookiesArr.push(jdCookieNode[i1li1ili]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iIIII1ll => iIIII1ll.cookie)].filter(li1li1 => !!li1li1);
allMessage = "";
message = "";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let lIi1II1I = 0; lIi1II1I < cookiesArr.length; lIi1II1I++) {
    cookie = cookiesArr[lIi1II1I];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIi1II1I + 1;
      if (nobeans_mark >= 3) {
        console.log("\n没豆不跑了～");
        break;
      }
      message = "";
      $.nickName = "";
      await TotalBean();
      $.UserName = $.nickName || $.UserName;
      console.log("\n******开始【京东账号" + $.index + "】" + $.UserName + "******\n");
      await getUA();
      await run();
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(iIl1iI1i => $.logErr(iIl1iI1i)).finally(() => $.done());
async function run() {
  try {
    const III11iII = VENDER_IDs;
    for (let IiliIll = 0; IiliIll < III11iII.length; IiliIll++) {
      $.joinVenderId = III11iII[IiliIll];
      $.errorJoinShop = "";
      await joinShop();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第2次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第3次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), allMessage += "【账号" + $.index + "】" + $.UserName + "开卡失败❌ ，请重新执行脚本\n");
    }
  } catch (I111i1ii) {
    console.log(I111i1ii);
  }
}
function TotalBean() {
  return new Promise(async iII1l1i => {
    const II11i1II = {
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
    $.post(II11i1II, (liIIIl1I, IIll11i1, i11ill1l) => {
      try {
        liIIIl1I ? (console.log(String(liIIIl1I)), console.log($.name + " API请求失败，请检查网路重试")) : i11ill1l ? (i11ill1l = JSON.parse(i11ill1l), i11ill1l.retcode === 0 && i11ill1l.base && i11ill1l.base.nickname && ($.nickName = i11ill1l.base.nickname)) : console.log("京东服务器返回空数据");
      } catch (II1liil) {
        $.logErr(II1liil);
      } finally {
        iII1l1i();
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(lIIlIIl1) {
  lIIlIIl1 = lIIlIIl1 || 32;
  let i1iIIIi = "abcdef0123456789",
    li11i1l = i1iIIIi.length,
    I11I11I1 = "";
  for (i = 0; i < lIIlIIl1; i++) I11I11I1 += i1iIIIi.charAt(Math.floor(Math.random() * li11i1l));
  return I11I11I1;
}
function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IlliiilI => {
    $.shopactivityId = "";
    $.errorJoinShop = "";
    $.openCardStatus = false;
    $.openCardBean = 0;
    await getshopactivityId();
    let l1il11Il = "";
    if ($.shopactivityId) l1il11Il = ",\"activityId\":" + $.shopactivityId;
    if ($.openCardStatus) {
      console.log("已经是会员了~");
      IlliiilI();
    } else {
      if ($.openCardBean === 0) {
        console.log("查询该店入会没有送豆，不入会");
        nobeans_mark += 1;
        IlliiilI();
      } else {
        if ($.openCardBean < OPENCARD_BEAN) {
          console.log("入会送【" + $.openCardBean + "】豆少于【" + OPENCARD_BEAN + "豆】，不入...");
          nobeans_mark += 1;
          IlliiilI();
        } else {
          const lili1i11 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l1il11Il + ",\"channel\":406}",
            liliiIiI = {
              "appid": "jd_shop_member",
              "functionId": "bindWithVender",
              "clientVersion": "9.2.0",
              "client": "H5",
              "body": JSON.parse(lili1i11)
            },
            iiIlII1 = await getH5st("8adfb", liliiIiI),
            IIli1ll1 = {
              "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + encodeURIComponent(lili1i11) + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiIlII1),
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
          $.get(IIli1ll1, async (l1iiIIl1, iIil1IiI, Ii1iIlil) => {
            try {
              let I1lIlii = $.toObj(Ii1iIlil, Ii1iIlil);
              if (typeof I1lIlii == "object") {
                if (I1lIlii.success === true) {
                  console.log(I1lIlii.message);
                  $.errorJoinShop = I1lIlii.message;
                  if (I1lIlii.result && I1lIlii.result.giftInfo) for (let Ii1IilIi of I1lIlii.result.giftInfo.giftList) {
                    console.log("入会获得：" + Ii1IilIi.discountString + Ii1IilIi.prizeName + Ii1IilIi.secondLineDesc);
                  }
                } else {
                  if (typeof I1lIlii == "object" && I1lIlii.message) {
                    $.errorJoinShop = I1lIlii.message;
                    console.log("" + (I1lIlii.message || ""));
                  } else console.log(Ii1iIlil);
                }
              } else {
                console.log(Ii1iIlil);
              }
            } catch (il1lII1l) {
              $.logErr(il1lII1l, iIil1IiI);
            } finally {
              IlliiilI();
            }
          });
        }
      }
    }
  });
}
function getshopactivityId() {
  return new Promise(Iilliii => {
    const il1i111 = {
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
    $.get(il1i111, async (I1liIi1I, IIl1IIl1, IIlIiIil) => {
      try {
        let liIlI1lI = $.toObj(IIlIiIil, IIlIiIil);
        if (typeof liIlI1lI == "object") {
          if (liIlI1lI.success == true) {
            console.log("会员卡名称：" + (liIlI1lI.result.shopMemberCardInfo.venderCardName || ""));
            $.shopactivityId = liIlI1lI.result.interestsRuleList && liIlI1lI.result.interestsRuleList[0] && liIlI1lI.result.interestsRuleList[0].interestsInfo && liIlI1lI.result.interestsRuleList[0].interestsInfo.activityId || "";
            $.openCardStatus = liIlI1lI.result.userInfo.openCardStatus;
            if (liIlI1lI.result.interestsRuleList && liIlI1lI.result.interestsRuleList.length) for (let IIIllIl1 = 0; IIIllIl1 < liIlI1lI.result.interestsRuleList.length; IIIllIl1++) {
              const iililli = liIlI1lI.result.interestsRuleList[IIIllIl1];
              if (iililli.prizeName) {
                if (iililli.prizeName.includes("京豆") || iililli.prizeName.includes("红包")) $.openCardBean = parseInt(iililli.discountString);
                break;
              }
            }
          }
        } else console.log(IIlIiIil);
      } catch (liilIIIi) {
        $.logErr(liilIIIi, IIl1IIl1);
      } finally {
        Iilliii();
      }
    });
  });
}
function jsonParse(ii11i1li) {
  if (typeof ii11i1li == "string") {
    try {
      return JSON.parse(ii11i1li);
    } catch (lIIii11l) {
      return console.log(lIIii11l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
