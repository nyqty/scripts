/*
活动名称：盖楼有礼 · 超级无线
活动链接：https://lzkj-isv.isvjcloud.com/wxBuildActivity/activity?activityId=<活动id>
活动变量：
//export jd_wxBuildActivity_activityId="活动ID"
//export jd_wxBuildActivity_num //运行账号数量，默认运行前7
//export jd_wxBuildActivity_openCard //是否开卡，需要开卡变量值为 true，默认不开卡
//export JD_LZ_OPEN="false" //关闭LZ相关活动运行
//export jd_wxBuildActivity_blacklist="" //黑名单 用&隔开 pin值

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#LZ盖楼有礼
1 1 1 1 * jd_wxBuildActivity.js, tag=LZ盖楼有礼, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('LZ盖楼有礼');
const lIi1iIi = $.isNode() ? require("./jdCookie") : "",
  li1l11ll = require("./function/krgetToken");
let llIllIll = {},
  IIl1lIi = [],
  l1ilII1i = "";
if ($.isNode()) {
  Object.keys(lIi1iIi).forEach(iIII1Ili => {
    IIl1lIi.push(lIi1iIi[iIII1Ili]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIl1lIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1Ili1ll($.getdata("CookiesJD") || "[]").map(II1lI1ii => II1lI1ii.cookie)].filter(lIi111Ii => !!lIi111Ii);
let i11iIlil = 7;
process.env.jd_wxBuildActivity_num && process.env.jd_wxBuildActivity_num != 7 && (i11iIlil = process.env.jd_wxBuildActivity_num);
let IIi1i1 = $.isNode() ? process.env.jd_wxBuildActivity_openCard ? process.env.jd_wxBuildActivity_openCard : false : $.getdata("jd_wxBuildActivity_openCard") ? $.getdata("jd_wxBuildActivity_openCard") : false;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let l1I1l1il = "",
  illli1l1 = "",
  l1lll1i = 3,
  llII1il = "";
llII1il = $.isNode() ? process.env.jd_wxBuildActivity_activityId ? process.env.jd_wxBuildActivity_activityId : "" + llII1il : $.getdata("jd_wxBuildActivity_activityId") ? $.getdata("jd_wxBuildActivity_activityId") : "" + llII1il;
let Ii1Illli = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  IiIIil1i = "",
  lIllIiiI = "";
$.whitelist = process.env.jd_wxBuildActivity_whitelist || IiIIil1i;
$.blacklist = process.env.jd_wxBuildActivity_blacklist || lIllIiiI;
iIii1Ili();
iI111Il();
!(async () => {
  if (Ii1Illli === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!IIl1lIi[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = llII1il;
  console.log("活动入口：https://lzkj-isv.isvjcloud.com/wxBuildActivity/activity?activityId=" + $.activityId);
  for (let ll1I11I1 = 0; ll1I11I1 < i11iIlil; ll1I11I1++) {
    l1ilII1i = IIl1lIi[ll1I11I1];
    originCookie = IIl1lIi[ll1I11I1];
    if (l1ilII1i) {
      $.UserName = decodeURIComponent(l1ilII1i.match(/pt_pin=([^; ]+)(?=;?)/) && l1ilII1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ll1I11I1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      await IIliiiI();
      await l1iilIll();
      await $.wait(4000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iiiiil1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iiiiil1);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(lll111Il => $.logErr(lll111Il)).finally(() => $.done());
async function l1iilIll() {
  try {
    $.endTime = 0;
    l1I1l1il = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await li1l11ll(originCookie, "https://lzkj-isv.isvjcloud.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await l1llI111();
    if (illli1l1 == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    if ($.index == 1) await iIilIII("getSimpleActInfoVo");
    await iIilIII("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await iIilIII("accessLogWithAD");
    await $.wait(1000);
    await iIilIII("getActMemberInfo");
    if (!$.openCard) {
      console.log("还不是店铺会员哦~");
      if (IIi1i1) {
        $.shopactivityId = "";
        $.joinVenderId = $.venderId;
        await ii1lilIl();
        for (let Illi1il1 = 0; Illi1il1 < Array(5).length; Illi1il1++) {
          if (Illi1il1 > 0) console.log("第" + Illi1il1 + "次 重新开卡");
          await iil1lilI();
          await $.wait(1000);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
        }
        await iIilIII("getActMemberInfo");
        await $.wait(1000);
      } else console.log("如需入会请设置环境变量 [jd_wxBuildActivity_openCard]，变量值为 true");
    }
    if (!$.openCard) return;
    await iIilIII("activityContent");
    if ($.hotFlag) return;
    let IlIlIIl = ["%E4%B8%8D%E9%94%99%EF%BC%8C%E6%88%91%E6%9D%A5%E4%BA%86", "%E6%88%91%E4%B9%9F%E5%8F%82%E5%8A%A0%E4%B8%8B%E6%B4%BB%E5%8A%A8%E8%AF%95%E8%AF%95%EF%BC%81", "6666%EF%BC%8C%E8%80%81%E9%93%81", "%E5%B8%8C%E6%9C%9B%E4%B8%AD%E5%A5%96%E5%95%8A%EF%BC%81", "%E6%88%91%E8%A6%81%E5%86%B2%E9%A1%B6%E5%95%8A%EF%BC%81"],
      ll1i1II1 = 0;
    ll1i1II1 = Math.floor(Math.random() * IlIlIIl.length);
    $.content = IlIlIIl[ll1i1II1] ? IlIlIIl[ll1i1II1] : $.content;
    for (let liliiIil = 0; liliiIil < $.teamNum; liliiIil++) {
      await $.wait(1000);
      await iIilIII("publish");
      if ($.retry >= 2) {
        console.log("今日盖楼可能已经上限~");
        return;
      }
      await $.wait(4500);
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await $.wait(1000);
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 3000 + 10000, 10));
  } catch (I1i1Ili) {
    console.log(I1i1Ili);
  }
}
async function iIilIII(I11l111l) {
  if ($.outFlag) return;
  let Il1ili11 = "https://lzkj-isv.isvjcloud.com",
    Ili1lill = "",
    lliII1il = "POST";
  switch (I11l111l) {
    case "getMyPing":
      url = Il1ili11 + "/customer/getMyPing";
      Ili1lill = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      url = Il1ili11 + "/customer/getSimpleActInfoVo";
      Ili1lill = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = Il1ili11 + "/wxCommonInfo/getActMemberInfo";
      Ili1lill = "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = Il1ili11 + "/common/accessLogWithAD";
      let IiI1I1Il = "https://lzkj-isv.isvjcloud.com/wxBuildActivity/activity?activityId=" + $.activityId;
      Ili1lill = "venderId=" + ($.shopId || $.venderId || "") + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(IiI1I1Il) + "&subType=app&adSource=";
      break;
    case "activityContent":
      url = Il1ili11 + "/wxBuildActivity/activityContent";
      Ili1lill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "follow":
      url = Il1ili11 + "/wxBuildActivity/follow";
      Ili1lill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "publish":
      url = Il1ili11 + "/wxBuildActivity/publish";
      Ili1lill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&content=" + $.content;
      break;
    case "getShareRecord":
      url = Il1ili11 + "/wxBuildActivity/shopInfo";
      Ili1lill = "activityId=" + $.activityId;
      break;
    case "getUserInfo":
      url = Il1ili11 + "/wxActionCommon/getUserInfo";
      Ili1lill = "pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I11l111l);
  }
  let i1ilI1 = llllIili(url, Ili1lill, lliII1il);
  return new Promise(async l1lIII1i => {
    $.post(i1ilI1, (i1IlIiiI, I1Ilil1, iIilll1) => {
      try {
        IIlI1I1I(I1Ilil1);
        if (i1IlIiiI) {
          if (I1Ilil1 && typeof I1Ilil1.statusCode != "undefined") {
            if (I1Ilil1.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(i1IlIiiI, i1IlIiiI));
          console.log(I11l111l + " API请求失败，请检查网路重试");
        } else iI1lil(I11l111l, iIilll1);
      } catch (Ili1lli1) {
        console.log(Ili1lli1, I1Ilil1);
      } finally {
        l1lIII1i();
      }
    });
  });
}
async function iI1lil(il1IIlIi, iliilI) {
  let illii11 = "";
  try {
    (il1IIlIi != "accessLogWithAD" || il1IIlIi != "drawContent") && iliilI && (illii11 = JSON.parse(iliilI));
  } catch (Il1lIliI) {
    console.log(il1IIlIi + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (il1IIlIi) {
      case "getMyPing":
        if (typeof illii11 == "object") {
          if (illii11.result && illii11.result === true) {
            if (illii11.data && typeof illii11.data.secretPin != "undefined") $.Pin = illii11.data.secretPin;
            if (illii11.data && typeof illii11.data.nickname != "undefined") $.nickname = illii11.data.nickname;
          } else illii11.errorMessage ? console.log(il1IIlIi + " " + (illii11.errorMessage || "")) : console.log(il1IIlIi + " " + iliilI);
        } else console.log(il1IIlIi + " " + iliilI);
        break;
      case "getSimpleActInfoVo":
        if (typeof illii11 == "object") {
          if (illii11.result && illii11.result === true) {
            if (typeof illii11.data.shopId != "undefined") $.shopId = illii11.data.shopId;
            if (typeof illii11.data.venderId != "undefined") $.venderId = illii11.data.venderId;
            $.activityType = illii11.data.activityType;
          } else illii11.errorMessage ? console.log(il1IIlIi + " " + (illii11.errorMessage || "")) : console.log(il1IIlIi + " " + iliilI);
        } else console.log(il1IIlIi + " " + iliilI);
        break;
      case "follow":
        if (typeof illii11 == "object") {
          if (illii11.result && illii11.result === true && illii11.count === 0) console.log("关注成功");else illii11.errorMessage ? console.log(il1IIlIi + " " + (illii11.errorMessage || "")) : console.log(il1IIlIi + " " + iliilI);
        } else console.log(il1IIlIi + " " + iliilI);
        break;
      case "getActMemberInfo":
        if (typeof illii11 == "object") {
          if (illii11.result && illii11.result === true) $.openCard = illii11.data.openCard || false;else {
            if (illii11.errorMessage) console.log(il1IIlIi + " " + (illii11.errorMessage || ""));else {
              console.log(il1IIlIi + " " + iliilI);
            }
          }
        } else console.log(il1IIlIi + " " + iliilI);
        break;
      case "getUserInfo":
        if (typeof illii11 == "object") {
          if (illii11.result && illii11.result === true) {
            if (illii11.data && typeof illii11.data.yunMidImageUrl != "undefined") $.attrTouXiang = illii11.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            $.jdNick = illii11.data.nickname || "";
          } else illii11.errorMessage ? console.log(il1IIlIi + " " + (illii11.errorMessage || "")) : console.log(il1IIlIi + " " + iliilI);
        } else console.log(il1IIlIi + " " + iliilI);
        break;
      case "activityContent":
        if (typeof illii11 == "object") {
          if (illii11.result && illii11.result === true) {
            $.canJoin = illii11.data.canJoin || false;
            $.needFollow = illii11.data.needFollow || false;
            $.hasFollow = illii11.data.hasFollow || false;
            $.endTime = illii11.data.endTime || "";
            $.startTime = illii11.data.startTime || "";
            $.title = illii11.data.title || "";
            $.currentFloors = illii11.data.currentFloors || 0;
            $.totalJoinMans = illii11.data.totalJoinMans || 0;
            $.rule = illii11.data.rule || "";
            $.teamNum = illii11.data.rule.match(/每人每天最多可盖楼(\d+)次/);
            if ($.teamNum) $.teamNum = $.teamNum[1];else {
              $.teamNum = l1lll1i;
            }
            $.index === 1 && (console.log("当前活动规则:\n" + $.rule), console.log("当前活动最多盖楼次数:" + $.teamNum));
          } else {
            if (illii11.errorMessage) {
              if (illii11.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(il1IIlIi + " " + (illii11.errorMessage || ""));
            } else console.log(il1IIlIi + " " + iliilI);
          }
        } else console.log(il1IIlIi + " " + iliilI);
        break;
      case "publish":
        if (typeof illii11 == "object") {
          if (illii11.result && illii11.result === true) {
            if (illii11.data) {
              console.log("当前楼层：" + illii11.data.currentFloors);
              if (illii11.data.drawResult.drawInfo) {
                drawInfo = illii11.data.drawResult.drawInfo;
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    console.log(drawInfo);
                    console.log("🎉 恭喜获得实物，去看看活动规则吧~");
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + drawInfo.name + " 🎟️");
                    break;
                  case 13:
                    console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                    break;
                  case 16:
                    console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                    break;
                  default:
                    if (drawInfo.name.includes("券")) {
                      console.log("🗑️ 优惠券");
                    } else console.log("获得：" + drawInfo.name);
                    break;
                }
              } else console.log("💨  空气");
            } else console.log(JSON.stringify(illii11));
          } else illii11.errorMessage ? (console.log("" + (illii11.errorMessage || "")), (illii11.errorMessage = "哎呀活动火爆，请稍后再试！") && $.retry++) : console.log("抽了个寂寞，京东接口返回内容为空~");
        } else console.log(il1IIlIi + " " + iliilI);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(il1IIlIi + "-> " + iliilI);
    }
    typeof illii11 == "object" && illii11.errorMessage && illii11.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (I1iI1iIl) {
    console.log(I1iI1iIl);
  }
}
function llllIili(iilIil, lIiIlIil, i1ili1ii = "POST") {
  let iIli111I = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l1ilII1i,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iilIil.indexOf("https://lzkj-isv.isvjcloud.com") > -1 && (iIli111I.Referer = "https://lzkj-isv.isvjcloud.com/wxBuildActivity/activity?activityId=" + $.activityId, iIli111I.Cookie = "" + (l1I1l1il && l1I1l1il || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + illli1l1), {
    "url": iilIil,
    "method": i1ili1ii,
    "headers": iIli111I,
    "body": lIiIlIil,
    "timeout": 30000
  };
}
function l1llI111() {
  return new Promise(ill11ilI => {
    let I11Il11 = {
      "url": "https://lzkj-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": l1ilII1i,
        "Referer": "https://lzkj-isv.isvjcloud.com/wxBuildActivity/activity?activityId=" + $.activityId,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(I11Il11, async (l1Ill1il, I1IIil1l, ll1I1) => {
      try {
        if (l1Ill1il) {
          I1IIil1l && typeof I1IIil1l.statusCode != "undefined" && I1IIil1l.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(l1Ill1il));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let i1IiliIl = ll1I1.match(/(活动已经结束)/) && ll1I1.match(/(活动已经结束)/)[1] || "";
          if (i1IiliIl) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          IIlI1I1I(I1IIil1l);
        }
      } catch (ill1IIli) {
        $.logErr(ill1IIli, I1IIil1l);
      } finally {
        ill11ilI();
      }
    });
  });
}
function IIlI1I1I(II1iIilI) {
  if (II1iIilI) {
    if (II1iIilI.headers["set-cookie"]) {
      l1ilII1i = originCookie + ";";
      for (let Ill1lIll of II1iIilI.headers["set-cookie"]) {
        llIllIll[Ill1lIll.split(";")[0].substr(0, Ill1lIll.split(";")[0].indexOf("="))] = Ill1lIll.split(";")[0].substr(Ill1lIll.split(";")[0].indexOf("=") + 1);
      }
      for (const II1ll1il of Object.keys(llIllIll)) {
        l1ilII1i += II1ll1il + "=" + llIllIll[II1ll1il] + ";";
      }
      illli1l1 = l1ilII1i;
    }
  }
}
async function IIliiiI() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + lll1Ii(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function lll1Ii(li1IlliI) {
  li1IlliI = li1IlliI || 32;
  let l1iIilI1 = "abcdef0123456789",
    I1illIll = l1iIilI1.length,
    lIiI1i1l = "";
  for (i = 0; i < li1IlliI; i++) lIiI1i1l += l1iIilI1.charAt(Math.floor(Math.random() * I1illIll));
  return lIiI1i1l;
}
function I1Ili1ll(i11lI1i) {
  if (typeof i11lI1i == "string") {
    try {
      return JSON.parse(i11lI1i);
    } catch (lIlIliI) {
      return console.log(lIlIliI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function iil1lilI() {
  if (!$.joinVenderId) return;
  return new Promise(async iiiIi1Ii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let II1iI111 = "";
    if ($.shopactivityId) II1iI111 = ",\"activityId\":" + $.shopactivityId;
    const iIi1Ilii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + II1iI111 + ",\"channel\":406}",
      l1l1ilII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIi1Ilii)
      },
      lI1IIIll = await Ili1illI("8adfb", l1l1ilII),
      IllIiiii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iIi1Ilii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI1IIIll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1ilII1i,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IllIiiii, async (iI1Iiii, i11ll1II, Ii11i1Ii) => {
      try {
        Ii11i1Ii = Ii11i1Ii && Ii11i1Ii.match(/jsonp_.*?\((.*?)\);/) && Ii11i1Ii.match(/jsonp_.*?\((.*?)\);/)[1] || Ii11i1Ii;
        let li1iI1il = $.toObj(Ii11i1Ii, Ii11i1Ii);
        if (li1iI1il && typeof li1iI1il == "object") {
          if (li1iI1il && li1iI1il.success === true) {
            console.log(" >> " + li1iI1il.message);
            $.errorJoinShop = li1iI1il.message;
            if (li1iI1il.result && li1iI1il.result.giftInfo) for (let IilllilI of li1iI1il.result.giftInfo.giftList) {
              console.log(" >> 入会获得：" + IilllilI.discountString + IilllilI.prizeName + IilllilI.secondLineDesc);
            }
          } else li1iI1il && typeof li1iI1il == "object" && li1iI1il.message ? ($.errorJoinShop = li1iI1il.message, console.log("" + (li1iI1il.message || ""))) : console.log(Ii11i1Ii);
        } else console.log(Ii11i1Ii);
      } catch (IIIiii1) {
        $.logErr(IIIiii1, i11ll1II);
      } finally {
        iiiIi1Ii();
      }
    });
  });
}
async function ii1lilIl() {
  return new Promise(async iililiI => {
    const liIliIII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      ii1il11l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liIliIII)
      },
      IIIIII1l = await Ili1illI("8adfb", ii1il11l),
      IIl1llII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + liIliIII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIIIII1l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1ilII1i,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIl1llII, async (l11Iil1l, Il1lil11, iI11I1Ii) => {
      try {
        iI11I1Ii = iI11I1Ii && iI11I1Ii.match(/jsonp_.*?\((.*?)\);/) && iI11I1Ii.match(/jsonp_.*?\((.*?)\);/)[1] || iI11I1Ii;
        let lIliI111 = $.toObj(iI11I1Ii, iI11I1Ii);
        lIliI111 && typeof lIliI111 == "object" ? lIliI111 && lIliI111.success == true && (console.log("去加入：" + (lIliI111.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = lIliI111.result.interestsRuleList && lIliI111.result.interestsRuleList[0] && lIliI111.result.interestsRuleList[0].interestsInfo && lIliI111.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iI11I1Ii);
      } catch (l11I1ili) {
        $.logErr(l11I1ili, Il1lil11);
      } finally {
        iililiI();
      }
    });
  });
}
function Ili1illI(IllII1l, iiiiIIi1) {
  return new Promise(async liIIlill => {
    let IIi11I1l = {
      "url": "http://api.kingran.cf/h5st",
      "body": "businessId=" + IllII1l + "&req=" + encodeURIComponent(JSON.stringify(iiiiIIi1)),
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(IIi11I1l, (ii1liI1I, ii1llI1l, lIl11i) => {
      try {
        if (ii1liI1I) {
          console.log(JSON.stringify(ii1liI1I));
          console.log($.name + " getSign API请求失败，请检查网路重试");
        } else {}
      } catch (liI1I1i) {
        $.logErr(liI1I1i, ii1llI1l);
      } finally {
        liIIlill(lIl11i);
      }
    });
  });
}
function iI111Il() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const il1I1li1 = Array.from(new Set($.blacklist.split("&")));
  console.log(il1I1li1.join("&") + "\n");
  let iIi1lil1 = il1I1li1,
    illliiII = [],
    iI1illI1 = false;
  for (let IliIilll = 0; IliIilll < IIl1lIi.length; IliIilll++) {
    let llIlIiII = decodeURIComponent(IIl1lIi[IliIilll].match(/pt_pin=([^; ]+)(?=;?)/) && IIl1lIi[IliIilll].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!llIlIiII) break;
    let i11lilI = false;
    for (let Ili1i1iI of iIi1lil1) {
      if (Ili1i1iI && Ili1i1iI == llIlIiII) {
        i11lilI = true;
        break;
      }
    }
    !i11lilI && (iI1illI1 = true, illliiII.splice(IliIilll, -1, IIl1lIi[IliIilll]));
  }
  if (iI1illI1) IIl1lIi = illliiII;
}
function i1iili1I(l1llllI, I111i1I1) {
  I111i1I1 != 0 && l1llllI.unshift(l1llllI.splice(I111i1I1, 1)[0]);
}
function iIii1Ili() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IIl1lIi, IIl1lIi));
    return;
  }
  console.log("当前已设置白名单：");
  const IllIiIlI = Array.from(new Set($.whitelist.split("&")));
  console.log(IllIiIlI.join("&") + "\n");
  let IIII11li = [],
    IIiIilll = IllIiIlI;
  for (let llill1I1 in IIl1lIi) {
    let i1ilIl = decodeURIComponent(IIl1lIi[llill1I1].match(/pt_pin=([^; ]+)(?=;?)/) && IIl1lIi[llill1I1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    IIiIilll.includes(i1ilIl) && IIII11li.push(IIl1lIi[llill1I1]);
  }
  helpCookiesArr = IIII11li;
  if (IIiIilll.length > 1) for (let IllIIII in IIiIilll) {
    let iII1lIIi = IIiIilll[IIiIilll.length - 1 - IllIIII];
    if (!iII1lIIi) continue;
    for (let liII1lIi in helpCookiesArr) {
      let Il1111li = decodeURIComponent(helpCookiesArr[liII1lIi].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[liII1lIi].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      iII1lIIi == Il1111li && i1iili1I(helpCookiesArr, liII1lIi);
    }
  }
}