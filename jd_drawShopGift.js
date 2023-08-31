/*
活动名称：店铺关注有礼
环境变量：jd_drawShopGift_argv // 活动参数，格式：”<shopId(店铺id)>_<venderId(店主id)>“
        jd_drawShopGift_Notify // 是否推送通知（true/false），默认不推送

注：运行频繁会403限制IP

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺关注有礼
1 1 1 1 * jd_daily.js, tag=店铺关注有礼, enabled=true


*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺关注有礼')
const I11Il = require("./jdCookie"),
  iIIIiIil = require("./function/sendJDNotify"),
  ilIllIli = require("./function/jdCommon"),
  iilliliI = require("./function/krgetSign"),
  I1ll11Il = process.env.jd_drawShopGift_argv || "",
  i1iliI1 = process.env.jd_drawShopGift_Notify === "true",
  ili1111l = process.env.JD_SIGN_KRAPI || "";
let llIl1I = "";
const llI1iiIl = Object.keys(I11Il).map(IIllIIli => I11Il[IIllIIli]).filter(ii1IlII => ii1IlII);
!llI1iiIl[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!I1ll11Il) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  try {
    const iIl1iIi1 = I1ll11Il.split("_");
    $.shopId = iIl1iIi1[0];
    $.venderId = iIl1iIi1[1];
  } catch {
    console.log("⚠ 请填写格式正确的环境变量");
    return;
  } finally {
    if (!$.shopId || !$.venderId) {
      console.log("⚠ 请填写格式正确的环境变量");
      return;
    }
  }
  iIIIiIil.config({
    "title": $.name
  });
  console.log("店铺地址：https://shop.m.jd.com/?shopId=" + $.shopId + "&venderId=" + $.venderId);
  for (let lil1I1lI = 0; lil1I1lI < llI1iiIl.length; lil1I1lI++) {
    $.index = lil1I1lI + 1;
    llIl1I = llI1iiIl[lil1I1lI];
    $.UserName = decodeURIComponent(ilIllIli.getCookieValue(llIl1I, "pt_pin"));
    $.UA = ilIllIli.genUA($.UserName);
    $.message = iIIIiIil.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await iIIlili1();
    if ($.runEnd) break;
    await $.wait(1000);
  }
  if (i1iliI1 && iIIIiIil.getMessage()) {
    iIIIiIil.updateContent(iIIIiIil.content + ("\n【店铺地址】https://shop.m.jd.com/?shopId=" + $.shopId + "&venderId=" + $.venderId));
    await iIIIiIil.push();
  }
})().catch(l11iIl1 => $.logErr(l11iIl1)).finally(() => $.done());
async function iIIlili1() {
  $.skipRun = false;
  await I11lI1II();
  if ($.skipRun) return;
  try {
    const iII1lIIl = await l11I11i();
    if (!iII1lIIl) {
      console.log("京东没有返回数据!");
      $.message.fix("京东没有返回数据!");
      return;
    }
    const il1I1il1 = iII1lIIl?.["result"]?.["activityId"];
    if (il1I1il1) $.activityId = il1I1il1;else {
      console.log("未查询到活动信息或已领取过奖励");
      $.message.fix("活动不存在或已领过");
      return;
    }
    if (iII1lIIl.result.followed) {
      console.log("已经关注该店铺，执行取关操作");
      const iI11li = await IlI11I1I();
      if (iI11li.optCode === "F10000") console.log(iI11li.msg);else {
        console.log(JSON.stringify(iI11li));
      }
    }
    const iI1I1iiI = il1liIli(iII1lIIl, il1I1il1),
      lliIlIIi = await iiIl1IiI(iI1I1iiI);
    if (lliIlIIi.result.followCode === "F10000") {
      const I1iilIl = lliIlIIi.result.giftDesc;
      switch (lliIlIIi.result.giftCode) {
        case "200":
          const illi1ilI = JSON.parse(JSON.stringify(lliIlIIi.result.alreadyReceivedGifts));
          for (let lIIillll = 0; lIIillll <= illi1ilI.length - 1; lIIillll++) {
            const IlII1Iii = illi1ilI[lIIillll].redWord + illi1ilI[lIIillll].rearWord;
            console.log("🎉 " + IlII1Iii);
            $.message.insert(IlII1Iii);
          }
          break;
        case "402":
          console.log(I1iilIl);
          for (let llII1I1l of ["抢完"]) {
            if (I1iilIl.includes(llII1I1l)) {
              $.runEnd = true;
              $.message.insert(I1iilIl);
              break;
            }
          }
          break;
        default:
          console.log(lliIlIIi), $.message.fix("未知奖品领取状态，请查看日志");
          break;
      }
    } else lliIlIIi.result.followCode === "F0402" ? (console.log(lliIlIIi.result.followDesc), $.message.fix(lliIlIIi.result.followDesc)) : (console.log(JSON.stringify(lliIlIIi)), $.message.fix("未知活动状态，请查看日志"));
  } catch (i1I1il1) {
    console.log(i1I1il1);
  }
}
async function l11I11i() {
  const I1I11liI = "30." + Math.floor(Math.random() * (10000 - 99999)) + 99999,
    IlIil11l = "114." + Math.floor(Math.random() * (10000 - 99999)) + 99999,
    I1iIIlI1 = await Iii1ll1l("getShopHomeActivityInfo", {
      "shopId": $.shopId,
      "source": "app-shop",
      "latWs": I1I11liI,
      "lngWs": IlIil11l,
      "displayWidth": "1170.000000",
      "sourceRpc": "shop_app_home_home",
      "lng": IlIil11l,
      "lat": I1I11liI,
      "venderId": $.venderId
    });
  return I1iIIlI1;
}
async function IlI11I1I() {
  const liIIIi1l = await Iii1ll1l("followShop", {
    "follow": "false",
    "shopId": $.shopId,
    "award": "false",
    "sourceRpc": "shop_app_home_follow"
  });
  return liIIIi1l;
}
function il1liIli(Ii1111iI, IIiI111i) {
  let I1llIlll;
  if (Ii1111iI.result.giftTitle) I1llIlll = {
    "giftType": "vip",
    "follow": 0,
    "shopId": $.shopId,
    "activityId": IIiI111i,
    "sourceRpc": "shop_app_home_window",
    "venderId": $.venderId
  };else Ii1111iI.result.giftsToast && (I1llIlll = {
    "follow": 0,
    "shopId": $.shopId,
    "activityId": IIiI111i,
    "sourceRpc": "shop_app_home_window",
    "venderId": $.venderId
  });
  return I1llIlll;
}
async function iiIl1IiI() {
  return new Promise(lllilIIi => {
    $.post({
      "url": "https://api.m.jd.com/client.action?g_ty=ls&g_tk=518274330",
      "body": "functionId=drawShopGift&body={\"follow\":0,\"shopId\":\"" + $.shopId + "\",\"activityId\":\"" + $.activityId + "\",\"sourceRpc\":\"shop_app_home_window\",\"venderId\":\"" + $.venderId + "\"}&client=apple&clientVersion=10.0.4&osVersion=13.7&appid=wh5&loginType=2&loginWQBiz=interact",
      "headers": {
        "Host": "api.m.jd.com",
        "content-type": "application/x-www-form-urlencoded",
        "accept": "*/*",
        "user-agent": $.UA,
        "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
        "Cookie": llIl1I
      }
    }, (ll1IlI1, lllIiI1, i11li1I1) => {
      try {
        ll1IlI1 ? console.log(String(ll1IlI1)) : (i11li1I1 = JSON.parse(i11li1I1), i11li1I1 && i11li1I1.data && JSON.stringify(i11li1I1.data) === "{}" && console.log(JSON.stringify(i11li1I1)));
      } catch (Ii1I11i1) {
        console.log(i11li1I1);
        $.logErr(Ii1I11i1, lllIiI1);
      } finally {
        lllilIIi(i11li1I1 || {});
      }
    });
  });
}
async function Iii1ll1l(iIiIlilI, I1Il1iI) {
  const l11I1ii1 = await iilliliI(iIiIlilI, I1Il1iI);
  if (ili1111l) {
    $.signStr = l11I1ii1?.["data"]?.["convertUrl"] || "";
  } else $.signStr = l11I1ii1?.["body"] || "";
  return !$.signStr && console.log("接口获取失败，跳过"), new Promise(iiil11i1 => {
    $.post(IIllIli1(iIiIlilI, I1Il1iI, $.signStr), (i1IiiIll, lli1lill, l1iIi11l) => {
      try {
        i1IiiIll ? console.log(String(i1IiiIll)) : (l1iIi11l = JSON.parse(l1iIi11l), l1iIi11l && l1iIi11l.data && JSON.stringify(l1iIi11l.data) === "{}" && console.log(JSON.stringify(l1iIi11l)));
      } catch (II1111ii) {
        console.log(l1iIi11l);
        $.logErr(II1111ii, lli1lill);
      } finally {
        iiil11i1(l1iIi11l || {});
      }
    });
  });
}
function IIllIli1(l1Il11I, i1iIlIi, iIil1i1i) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + l1Il11I + "&body=" + encodeURIComponent(JSON.stringify(i1iIlIi)),
    "body": iIil1i1i,
    "headers": {
      "Host": "api.m.jd.com",
      "content-type": "application/x-www-form-urlencoded",
      "accept": "*/*",
      "user-agent": $.UA,
      "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
      "Cookie": llIl1I
    }
  };
}
function I11lI1II() {
  return new Promise(async Iili1il1 => {
    const iilIlIIl = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": llIl1I,
        "Host": "plogin.m.jd.com",
        "User-Agent": $.UA
      }
    };
    $.get(iilIlIIl, (liii11, IIiIl11i, IliIiIIl) => {
      try {
        if (liii11) console.log(String(liii11)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (IliIiIIl) try {
            IliIiIIl = JSON.parse(IliIiIIl);
            IliIiIIl.islogin === "0" && (console.log("❌ 账号无效"), $.message.fix("账号无效"), $.skipRun = true);
          } catch {
            console.log("京东服务器返回空数据");
            $.skipRun = true;
          } else console.log("京东服务器返回空数据"), $.skipRun = true;
        }
      } catch (iIlIl1li) {
        $.logErr(iIlIl1li, IIiIl11i);
      } finally {
        Iili1il1();
      }
    });
  });
}