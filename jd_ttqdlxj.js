/*
天天签到礼享金
入口：app首页-家电家居-底部签到
不做邀请任务，默认不做加购任务，变量ADDSKU='true'开启
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_ttqdlxj.js
updatetime:2023/4/20
*/
const Env=require('./utils/Env.js');
const $ = new Env('天天签到礼享金');
const IiIII = require("./jdCookie.js"),
  li1I1III = require("./sendNotify"),
  i1iii1il = require("./function/dylanx"),
  ll11liil = require("./function/dylank");
let IiilIlII = [],
  l1IIl1Il = "",
  i1IilIIl = "https://lzdz-isv.isvjcloud.com",
  lI1Illi1 = "https://lzdz-isv.isvjcloud.com/m/688693/dzbddbeb43bfff40179190eb6a8e9b",
  lI1i1111 = "",
  liIiiI1i = {},
  IilIIil1 = process.env.ADDSKU ? process.env.ADDSKU : false;
$.activityId = "dzbddbeb43bfff40179190eb6a8e9b";
$.venderId = "688693";
if ($.isNode()) {
  Object.keys(IiIII).forEach(Il1iiI => {
    IiilIlII.push(IiIII[Il1iiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IiilIlII = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIl11li($.getdata("CookiesJD") || "[]").map(iIIIl11I => iIIIl11I.cookie)].filter(l1iiliI => !!l1iiliI);
message = [];
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
!(async () => {
  if (!IiilIlII[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  console.log("\n当前版本：V1.0.0，只跑前十CK");
  console.log("入口：app首页-家电家居-底部签到");
  console.log("TG频道：https://t.me/dylan_jdpro\n");
  for (let iI1Il1iI = 0; iI1Il1iI < "10"; iI1Il1iI++) {
    l1IIl1Il = IiilIlII[iI1Il1iI];
    originCookie = IiilIlII[iI1Il1iI];
    if (l1IIl1Il) {
      $.UserName = decodeURIComponent(l1IIl1Il.match(/pin=([^; ]+)(?=;?)/) && l1IIl1Il.match(/pin=([^; ]+)(?=;?)/)[1]);
      $.index = iI1Il1iI + 1;
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await II1lill1();
      await il1IlIl1();
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let I1111i11 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I1111i11);
    if ($.isNode()) await li1I1III.sendNotify("" + $.name, "" + I1111i11);
  }
})().catch(ii11iii => $.logErr(ii11iii)).finally(() => $.done());
async function il1IlIl1() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.scPin = "";
    $.Token = await ll11liil(l1IIl1Il, i1IilIIl);
    await Il1lI111("getlvtoken");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await $.wait(500);
    await Il1lI111("getMyCidPing");
    await Il1lI111("accessLogWithAD");
    await Il1lI111("activityContent");
    $.log("礼享金余额：" + $.giftscore);
    !$.signStatus && ($.log("\n去做 签到..."), await Il1lI111("saveTask", "taskType=0&taskValue=0"), await $.wait(1000));
    for (let iIIlll1 of $.skuVisitList) {
      let I1liIlI = JSON.stringify(iIIlll1).match(/\d+/)[0];
      if (iIIlll1[I1liIlI]) continue;
      $.log("\n去做 浏览商品...");
      await Il1lI111("saveTask", "taskType=5&taskValue=" + I1liIlI);
      await $.wait(1000);
    }
    if (IilIIil1) {
      $.log("\n去做 加购任务...");
      for (let i1IIiiil of $.skuAddList) {
        let I1ilIi11 = JSON.stringify(i1IIiiil).match(/\d+/)[0];
        if (i1IIiiil[I1ilIi11]) continue;
        await Il1lI111("saveTask", "taskType=2&taskValue=" + I1ilIi11);
        await $.wait(1000);
      }
    } else $.log("\n默认不做加购任务, 变量ADDSKU='true'开启");
    for (let iIli1l1 of $.channelList) {
      if (iIli1l1.status) continue;
      $.log("\n去做 " + iIli1l1.name + "...");
      await Il1lI111("saveTask", "taskType=12&taskValue=" + iIli1l1.value);
      await $.wait(1000);
    }
    !$.zhiBoStatus && ($.log("\n去做 浏览直播间..."), await Il1lI111("saveTask", "taskType=15&taskValue="), await $.wait(1000));
    await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
  } catch (llIil1II) {
    console.log(llIil1II);
  }
}
async function Il1lI111(ill1ii1l, liI11ll = "") {
  if ($.outFlag) return;
  let iIiIiiIi = "post";
  switch (ill1ii1l) {
    case "isvObfuscator":
      url = "https://api.m.jd.com/client.action?functionId=isvObfuscator";
      liI11ll = i1iii1il.getbody("isvObfuscator", {
        "id": "",
        "url": "" + i1IilIIl
      });
      break;
    case "getlvtoken":
      url = i1IilIIl + "/wxCommonInfo/token?t=" + Date.now();
      iIiIiiIi = "get";
      break;
    case "getMyCidPing":
      url = i1IilIIl + "/customer/getMyCidPing";
      liI11ll = "userId=" + $.venderId + "&token=" + $.Token + "&activityId=" + $.activityId + "&fromType=APP&pin=";
      break;
    case "accessLogWithAD":
      url = i1IilIIl + "/common/accessLogWithAD";
      liI11ll = "venderId=" + $.venderId + "&code=99&pin=" + $.scPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lI1Illi1) + "&subType=JDApp";
      break;
    case "activityContent":
      url = i1IilIIl + "/dingzhi/jdhomeapp/interaction/activityContent";
      liI11ll = "activityId=" + $.activityId + "&pin=" + $.scPin + "&userUUid=&pinImg=&nick=";
      break;
    case "getSystime":
      url = i1IilIIl + "/common/getSystime";
      liI11ll = "pin=" + $.scPin;
      break;
    case "exchangePrizeList":
      url = i1IilIIl + "/dingzhi/jdhomeapp/interaction/exchangePrizeList";
      liI11ll = "activityId=" + $.activityId + "&pin=" + $.scPin + "&actorUuid=" + $.actorUuid;
      break;
    case "saveTask":
      url = i1IilIIl + "/dingzhi/jdhomeapp/interaction/saveTask";
      liI11ll = "activityId=" + $.activityId + "&pin=" + $.scPin + "&actorUuid=" + $.actorUuid + "&shareUuid=&" + liI11ll;
      break;
    default:
      console.log("错误" + ill1ii1l);
  }
  let lIII11l1 = lIi11ilI(url, liI11ll, iIiIiiIi);
  return new Promise(async il11i11i => {
    $[iIiIiiIi](lIII11l1, (IIIIi1ll, iIi1II1l, i1llii) => {
      let I1ill11;
      try {
        ll1iIliI(iIi1II1l);
        if (IIIIi1ll) {
          if (iIi1II1l && typeof iIi1II1l.statusCode != "undefined") {
            iIi1II1l.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(IIIIi1ll, IIIIi1ll));
          console.log(ill1ii1l + " API请求失败，请检查网路重试");
        } else I1ill11 = I1lilIii(ill1ii1l, i1llii);
      } catch (II1I1i1l) {
        console.log(II1I1i1l, iIi1II1l);
      } finally {
        il11i11i(I1ill11);
      }
    });
  });
}
async function I1lilIii(lI1IIil1, i1Iill1) {
  let i1li1li = "";
  try {
    lI1IIil1 != "getlvtoken" && lI1IIil1 != "showDrawOne" && i1Iill1 && (i1li1li = JSON.parse(i1Iill1));
  } catch (l1I1IlII) {
    console.log(lI1IIil1 + " 执行任务异常");
    console.log(i1Iill1);
    $.runFalag = false;
  }
  try {
    switch (lI1IIil1) {
      case "isvObfuscator":
        if (typeof i1li1li == "object") {
          if (i1li1li.errcode == 0) {
            if (typeof i1li1li.token != "undefined") $.Token = i1li1li.token;
          } else i1li1li.message ? console.log("isvObfuscator " + (i1li1li.message || "")) : console.log(i1Iill1);
        } else console.log(i1Iill1);
        break;
      case "getMyCidPing":
        if (typeof i1li1li == "object") {
          if (i1li1li.data) $.scPin = encodeURIComponent(i1li1li.data.secretPin);else i1li1li.errorMessage ? console.log(lI1IIil1 + " " + (i1li1li.errorMessage || "")) : console.log(lI1IIil1 + " " + i1Iill1);
        } else console.log(lI1IIil1 + " " + i1Iill1);
        break;
      case "activityContent":
        if (typeof i1li1li == "object") {
          if (i1li1li.data) {
            $.userId = i1li1li.data.userId || "";
            $.signStatus = i1li1li.data.signStatus;
            $.zhiBoStatus = i1li1li.data.zhiBoStatus;
            $.giftscore = i1li1li.data.gift;
            $.skuVisitList = i1li1li.data.skuVisitRecord;
            $.skuAddList = i1li1li.data.skuAddRecord;
            $.channelList = i1li1li.data.toMainList;
            $.actorUuid = i1li1li.data.uuid;
          } else i1li1li.errorMessage ? console.log(lI1IIil1 + " " + (i1li1li.errorMessage || "")) : console.log(lI1IIil1 + " " + i1Iill1);
        } else console.log(lI1IIil1 + " " + i1Iill1);
        break;
      case "saveTask":
        if (typeof i1li1li == "object") {
          if (i1li1li.result) $.log("----任务完成！获得" + i1li1li.data.addGift + "礼享金，" + i1li1li.data.addBeans + "京豆！");else i1li1li.errorMessage ? console.log(lI1IIil1 + " " + (i1li1li.errorMessage || "") + " ") : console.log(lI1IIil1 + " " + i1Iill1 + " ");
        } else console.log(lI1IIil1 + " " + i1Iill1 + " ");
        break;
      case "getGiveContent":
      case "share":
      case "follow":
      case "start":
      case "check":
        if (typeof i1li1li == "object") {
          return i1li1li;
        } else console.log(lI1IIil1 + " " + i1Iill1 + " ");
        break;
      case "accessLogWithAD":
      case "getlvtoken":
      case "setMixNick":
      case "accessLog":
        break;
      default:
        console.log(lI1IIil1 + " -> " + i1Iill1 + " ");
    }
    typeof i1li1li == "object" && i1li1li.message && i1li1li.message.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (liiillii) {
    console.log(liiillii);
  }
}
function lIi11ilI(lii111lI, i1iiii1l, l1i1IIil = "post") {
  let iIill1I1 = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Cookie": l1IIl1Il,
    "User-Agent": $.UA
  };
  return lii111lI.indexOf(i1IilIIl) > -1 && (iIill1I1.Referer = lI1Illi1, iIill1I1.Cookie = lI1i1111 + " ", iIill1I1["Content-Type"] = typeof i1iiii1l == "string" ? "application/x-www-form-urlencoded" : "application/json;charset=utf-8"), l1i1IIil == "post" ? {
    "url": lii111lI,
    "headers": iIill1I1,
    "body": i1iiii1l,
    "timeout": 30000
  } : {
    "url": lii111lI,
    "headers": iIill1I1,
    "timeout": 30000
  };
}
function Il1i11Il() {
  return new Promise(lliIII1I => {
    let iIllI1Il = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iIllI1Il, async (IillliIl, II1i1II, l1Iiilll) => {
      try {
        if (IillliIl) {
          II1i1II && typeof II1i1II.statusCode != "undefined" && II1i1II.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(IillliIl));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let lllillil = l1Iiilll.match(/(活动已经结束)/) && l1Iiilll.match(/(活动已经结束)/)[1] || "";
          if (lllillil) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          ll1iIliI(II1i1II);
        }
      } catch (IIiii1i1) {
        $.logErr(IIiii1i1, II1i1II);
      } finally {
        lliIII1I();
      }
    });
  });
}
function ll1iIliI(i1l1ilI) {
  if (i1l1ilI.headers["set-cookie"]) {
    let iillI11i = "";
    for (let ililiili of i1l1ilI.headers["set-cookie"]) {
      liIiiI1i[ililiili.split(";")[0].substr(0, ililiili.split(";")[0].indexOf("="))] = ililiili.split(";")[0].substr(ililiili.split(";")[0].indexOf("=") + 1);
    }
    for (const iiIllIIi of Object.keys(liIiiI1i)) {
      iillI11i += iiIllIIi + "=" + liIiiI1i[iiIllIIi] + ";";
    }
    lI1i1111 = iillI11i;
  }
}
async function II1lill1() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + il1liiiI(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function il1liiiI(i1lII1Il) {
  i1lII1Il = i1lII1Il || 32;
  let l1I11i11 = "abcdef0123456789",
    ilIIi1Ii = l1I11i11.length,
    lIiiIiI1 = "";
  for (i = 0; i < i1lII1Il; i++) lIiiIiI1 += l1I11i11.charAt(Math.floor(Math.random() * ilIIi1Ii));
  return lIiiIiI1;
}
function lIl11li(IliI11II) {
  const ii1l11ii = function () {
      let Il1Il1 = true;
      return function (ll1Ill1I, IliiI1i) {
        const lllIIi1i = Il1Il1 ? function () {
          if (IliiI1i) {
            const l1ill1l1 = IliiI1i.apply(ll1Ill1I, arguments);
            return IliiI1i = null, l1ill1l1;
          }
        } : function () {};
        return Il1Il1 = false, lllIIi1i;
      };
    }(),
    llllll = ii1l11ii(this, function () {
      return llllll.toString().search("(((.+)+)+)+$").toString().constructor(llllll).search("(((.+)+)+)+$");
    });
  llllll();
  if (typeof IliI11II == "string") {
    try {
      return JSON.parse(IliI11II);
    } catch (i1lI1iIl) {
      return console.log(i1lI1iIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function IIi1i1Ii() {
  return new Promise(async iIiiIIIi => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lilIIli = "{\"venderId\":\"1000074823\",\"shopId\":\"1000074823\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0,\"activityId\":3051106,\"channel\":401}",
      II11Il1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lilIIli)
      },
      iI111liI = await getH5st("8adfb", II11Il1);
    const l1lIl1i1 = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lilIIli + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iI111liI),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": l1IIl1Il,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(l1lIl1i1, async (i1liIil, Iiiii1l, Illl1ill) => {
      try {
        Illl1ill = Illl1ill && Illl1ill.match(/jsonp_.*?\((.*?)\);/) && Illl1ill.match(/jsonp_.*?\((.*?)\);/)[1] || Illl1ill;
        let i11lI11l = $.toObj(Illl1ill, Illl1ill);
        if (i11lI11l && typeof i11lI11l == "object") {
          if (i11lI11l && i11lI11l.success === true) {
            console.log(i11lI11l.message);
            $.errorJoinShop = i11lI11l.message;
            if (i11lI11l.result && i11lI11l.result.giftInfo) for (let lIl11Ii of i11lI11l.result.giftInfo.giftList) {
              console.log("入会获得:" + lIl11Ii.discountString + lIl11Ii.prizeName + lIl11Ii.secondLineDesc);
            }
          } else {
            if (i11lI11l && typeof i11lI11l == "object" && i11lI11l.message) {
              $.errorJoinShop = i11lI11l.message;
              console.log("" + (i11lI11l.message || ""));
            } else {
              console.log(Illl1ill);
            }
          }
        } else console.log(Illl1ill);
      } catch (liI1I1i) {
        $.logErr(liI1I1i, Iiiii1l);
      } finally {
        iIiiIIIi();
      }
    });
  });
}
async function I1li1IiI() {
  return new Promise(async iii1Ii1I => {
    let I1lii = "{\"venderId\":\"1000074823\",\"payUpShop\":true,\"queryVersion\":\"10.5.2\",\"channel\":401}",
      I1Ill = "undefined";
    const IiliiIIl = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I1lii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + I1Ill,
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": l1IIl1Il,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(IiliiIIl, async (lI1lIIIi, I1l11lil, Illiili1) => {
      try {
        Illiili1 = Illiili1 && Illiili1.match(/jsonp_.*?\((.*?)\);/) && Illiili1.match(/jsonp_.*?\((.*?)\);/)[1] || Illiili1;
        let IIIilIil = $.toObj(Illiili1, Illiili1);
        IIIilIil && typeof IIIilIil == "object" ? IIIilIil && IIIilIil.success == true && ($.openstat = IIIilIil.result[0].userInfo.openCardStatus) : console.log(Illiili1);
      } catch (Ili111lI) {
        $.logErr(Ili111lI, I1l11lil);
      } finally {
        iii1Ii1I();
      }
    });
  });
}
async function IIi1i11I(i1I1il1l) {
  return new Promise(async lIi11111 => {
    const Ill1ii1i = {
      "url": "https://api.m.jd.com/client.action?functionId=whx_getMShopOutlineInfo&appid=shop_view&clientVersion=11.0.0&client=wh5&body=%7B%22shopId%22%3A" + i1I1il1l + "%7D",
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "origin": "https://shop.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(Ill1ii1i, async (lilIilI, l1IIiili, i1i11il1) => {
      try {
        lilIilI ? $.log(JSON.stringify(lilIilI)) : (i1i11il1 = JSON.parse(i1i11il1), $.shopName = i1i11il1.data?.["shopInfo"]?.["shopName"] || "");
      } catch (IlllII1I) {
        $.logErr(IlllII1I, l1IIiili);
      } finally {
        lIi11111();
      }
    });
  });
}
async function lll1i1i(liI1ll11) {
  let Iii1il1 = {
    "source": "app-shop",
    "latWs": "0",
    "lngWs": "0",
    "displayWidth": "1098.000000",
    "sourceRpc": "shop_app_home_home",
    "lng": "0",
    "lat": "0",
    "venderId": "" + liI1ll11,
    "navigationAbTest": "1"
  };
  return Iii1il1 = i1iii1il.getbody("getShopHomeBaseInfo", Iii1il1), new Promise(async IllI111I => {
    const l1lIIiiI = {
      "url": "https://api.m.jd.com/client.action?functionId=getShopHomeBaseInfo",
      "body": Iii1il1,
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.post(l1lIIiiI, async (IiiIIlI, I11111i, llilII) => {
      try {
        IiiIIlI ? $.log(JSON.stringify(IiiIIlI)) : (llilII = JSON.parse(llilII), $.shopName = llilII.result?.["shopInfo"]?.["shopName"] || "");
      } catch (l1IlIlI) {
        $.logErr(l1IlIlI, I11111i);
      } finally {
        IllI111I();
      }
    });
  });
}