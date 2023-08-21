/*
8.10-8.31 祖玛珑邀请有礼

1.邀请满3人30豆,5人50豆，10人100豆
2.开1张卡
3.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 8.10-8.31 祖玛珑邀请有礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#8.10-8.31 祖玛珑邀请有礼
1 1 1 1 * jd_zmlyq.js, tag=8.10-8.31 祖玛珑邀请有礼, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('8.10-8.31 祖玛珑邀请有礼');
const lIiIll = $.isNode() ? require("./jdCookie.js") : "",
  lIlliI = $.isNode() ? require("./sendNotify") : "",
  iIIlI1 = require("./function/krgetToken"),
  IlIi = require("./function/krh5st");
let IlIl = "https://lzkjdz-isv.isvjcloud.com",
  IiII1 = [],
  l1IIi = "";
if ($.isNode()) {
  Object.keys(lIiIll).forEach(illl1I => {
    IiII1.push(lIiIll[illl1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IiII1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1il1($.getdata("CookiesJD") || "[]").map(lillI => lillI.cookie)].filter(Il11i => !!Il11i);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let l1IIl = "",
  l1I1il = "",
  III1ii = {};
!(async () => {
  if (!IiII1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.assistStatus = false;
  $.activityId = "2308100041110401";
  authorCodeList = await iiiIiI("http://code.kingran.cf/zml.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[Ill1i1(0, authorCodeList.length)];else {
    let I1i1I = ["affbdd25922647d9b3a5c8034d662b78", "c933813c8d3446739a470c7b825807dd"];
    $.authorCode = I1i1I[Ill1i1(0, I1i1I.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.shareUuid = $.authorCode;
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000411104/99/2205100041110401/?activityId=" + $.activityId);
  for (let l1ili = 0; l1ili < IiII1.length; l1ili++) {
    l1IIi = IiII1[l1ili];
    originCookie = IiII1[l1ili];
    if (l1IIi) {
      $.UserName = decodeURIComponent(l1IIi.match(/pt_pin=([^; ]+)(?=;?)/) && l1IIi.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1ili + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await IlIi1i();
      await l1I1ii();
      await $.wait(3000);
      if (l1ili == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let l1iill = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1iill);
    if ($.isNode()) await lIlliI.sendNotify("" + $.name, "" + l1iill);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(lIi1I1 => $.logErr(lIi1I1)).finally(() => $.done());
async function l1I1ii() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    l1IIl = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await iIIlI1(l1IIi, IlIl);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IlIi1l();
    if (l1I1il == "") {
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
    await III1il("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await III1il("accessLogWithAD");
    await III1il("getOpenCardStatusWithOutSelf");
    await III1il("activityContent");
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.openStatus == false) {
      console.log("开卡");
      $.joinVenderId = 1000411104;
      await l1iil1();
      for (let IllIi = 0; IllIi < Array(5).length; IllIi++) {
        if (IllIi > 0) console.log("第" + IllIi + "次 重新开卡");
        await IIiI();
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
      }
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("开卡失败❌ ，重新执行脚本");
      await III1il("getOpenCardStatusWithOutSelf");
      await III1il("activityContent");
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
    await $.wait(1000);
    $.assistCount >= 3 && (console.log("开始领取第一档奖励"), $.giftId = "a15704bab7d911edbfc4fa163e8623a71", await III1il("sendGift"), await $.wait(1000));
    $.assistCount >= 5 && (console.log("开始领取第二档奖励"), $.giftId = "a157044ab7d911edbfc4fa163e8623a71", await III1il("sendGift"), await $.wait(1000));
    $.assistCount >= 10 && (console.log("开始领取第三档奖励"), $.giftId = "6f4c317f037334739b74664b1e1043d9", await III1il("sendGift"), await $.wait(1000));
    console.log($.openStatus === true ? "已开卡" : $.openStatus === false ? "未开卡" : "未知-" + $.openStatus);
    console.log($.helpStatus === 1 ? "助力成功" : $.helpStatus === 0 ? "已助力,或者已开卡无法助力" : $.helpStatus === 2 ? "不能助力自己" : "未知-" + $.helpStatus);
    if ($.index == 1) $.helpCount = $.assistCount;else {
      if ($.helpStatus == 1) {
        $.helpCount++;
      }
    }
    console.log("【账号" + $.index + "】助力人数：" + $.assistCount + ($.index != 1 && " 【账号1】助力人数：" + $.helpCount || ""));
    if ($.helpCount >= 10) $.hasEnd = true;
    console.log($.actorUuid);
    console.log("当前助力:" + $.shareUuid);
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    if ($.index % 3 == 0) console.log("休息一下，别被黑ip了\n可持续发展");
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (l1iI11) {
    console.log(l1iI11);
  }
}
async function III1il(l1I11) {
  if ($.outFlag) return;
  let IlIiI = "https://lzkjdz-isv.isvjcloud.com",
    l1iI1I = "",
    ilI1i1 = "POST";
  switch (l1I11) {
    case "getMyPing":
      url = IlIiI + "/customer/getMyPing", l1iI1I = "token=" + $.Token + "&fromType=APP&userId=1000411104&pin=";
      break;
    case "getSimpleActInfoVo":
      url = IlIiI + "/common/brand/getSimpleActInfoVo", l1iI1I = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = IlIiI + "/common/accessLogWithAD";
      let iI11il = "https://lzkjdz-isv.isvjcloud.com/m/1000411104/99/2205100041110401/?activityId=" + $.activityId + "&helpUuid=" + $.shareUuid;
      l1iI1I = "venderId=1000411104&code=40&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iI11il);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = IlIiI + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf", l1iI1I = "venderId=1000411104&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = IlIiI + "/jomalone/invite/activityContent", l1iI1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&helpUuid=" + $.shareUuid;
      break;
    case "getDrawRecordHasCoupon":
      url = IlIiI + "/dingzhi/taskact/common/getDrawRecordHasCoupon", l1iI1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "getShareRecord":
      url = IlIiI + "/dingzhi/taskact/common/getShareRecord", l1iI1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "sendGift":
      url = IlIiI + "/jomalone/invite/sendGift", l1iI1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&giftId=" + $.giftId;
      break;
    case "getInviteSend":
      url = IlIiI + "/clinique/invite/wx/getInviteSend", l1iI1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + l1I11);
  }
  let l1lII1 = i1111(url, l1iI1I, ilI1i1);
  return new Promise(async iii111 => {
    $.post(l1lII1, (liiI, liIII1, I111il) => {
      try {
        IiIiiI(liIII1);
        liiI ? (liIII1 && typeof liIII1.statusCode != "undefined" && liIII1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(liiI, liiI)), console.log(l1I11 + " API请求失败，请检查网路重试")) : I1IlI1(l1I11, I111il);
      } catch (I111ii) {
        console.log(I111ii, liIII1);
      } finally {
        iii111();
      }
    });
  });
}
async function I1IlI1(I1ii1I, Ililli) {
  let iIii1l = "";
  try {
    (I1ii1I != "accessLogWithAD" || I1ii1I != "drawContent") && Ililli && (iIii1l = JSON.parse(Ililli));
  } catch (iiilII) {
    console.log(I1ii1I + " 执行任务异常");
    console.log(Ililli);
    $.runFalag = false;
  }
  try {
    switch (I1ii1I) {
      case "isvObfuscator":
        if (typeof iIii1l == "object") {
          if (iIii1l.errcode == 0) {
            if (typeof iIii1l.token != "undefined") $.Token = iIii1l.token;
          } else {
            if (iIii1l.message) console.log("isvObfuscator " + (iIii1l.message || ""));else {
              console.log(Ililli);
            }
          }
        } else console.log(Ililli);
        break;
      case "getMyPing":
        if (typeof iIii1l == "object") {
          if (iIii1l.result && iIii1l.result === true) {
            if (iIii1l.data && typeof iIii1l.data.secretPin != "undefined") $.Pin = iIii1l.data.secretPin;
            if (iIii1l.data && typeof iIii1l.data.nickname != "undefined") $.nickname = iIii1l.data.nickname;
          } else {
            if (iIii1l.errorMessage) {
              console.log(I1ii1I + " " + (iIii1l.errorMessage || ""));
            } else console.log(I1ii1I + " " + Ililli);
          }
        } else console.log(I1ii1I + " " + Ililli);
        break;
      case "activityContent":
        if (typeof iIii1l == "object") {
          if (iIii1l.result && iIii1l.result === true) $.actorUuid = iIii1l.data.customerId || "", $.helpStatus = iIii1l.data.helpStatus || 0, $.assistCount = iIii1l.data.inviteNum || 0, $.giftInfoList = iIii1l.data.giftInfoList || [], iIii1l.data.sendBeanNum && (console.log("获得" + iIii1l.data.sendBeanNum + "豆"), allMessage += "【账号" + $.index + "】获得" + iIii1l.data.sendBeanNum + "豆\n");else {
            if (iIii1l.errorMessage) {
              if (iIii1l.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(I1ii1I + " " + (iIii1l.errorMessage || ""));
            } else console.log(I1ii1I + " " + Ililli);
          }
        } else {
          console.log(I1ii1I + " " + Ililli);
        }
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof iIii1l == "object") {
          if (iIii1l.isOk) $.openStatus = iIii1l.openCard || false;else {
            if (iIii1l.errorMessage || iIii1l.msg) {
              console.log(I1ii1I + " " + (iIii1l.errorMessage || iIii1l.msg || ""));
            } else console.log(I1ii1I + " " + Ililli);
          }
        } else console.log(I1ii1I + " " + Ililli);
        break;
      case "sendGift":
        if (typeof iIii1l == "object") {
          if (iIii1l.result && iIii1l.result === true && iIii1l.data) console.log("" + (iIii1l.data.giftName || ""));else iIii1l.errorMessage ? console.log("" + (iIii1l.errorMessage || "")) : console.log("" + Ililli);
        } else {
          console.log(I1ii1I + " " + Ililli);
        }
        break;
      case "getDrawRecordHasCoupon":
        if (typeof iIii1l == "object") {
          if (iIii1l.result && iIii1l.result === true) {
            console.log("我的奖品：");
            let IIl11I = 0,
              i11IIi = 0,
              Il1ii1 = {
                "dayShareBeans": "邀请",
                "dayBeSharedBeans": "被邀请",
                "openCardBeans": "开卡",
                "saveTaskBeans23": "关注",
                "saveTaskBeans12": "逛店铺",
                "saveTaskBeans21": "加购"
              };
            for (let illII1 in iIii1l.data) {
              let iIiii = iIii1l.data[illII1];
              if (iIiii.drawId == "dayShareBeans") IIl11I++, i11IIi = iIiii.infoName.replace("京豆", "");else {
                console.log("" + (iIiii.infoType != 10 && iIiii.drawId && (Il1ii1[iIiii.drawId] || iIiii.drawId) + ":" || iIiii.value && iIiii.value + ":" || "") + iIiii.infoName);
              }
            }
            if (IIl11I > 0) console.log("邀请好友(" + IIl11I + "):" + (IIl11I * parseInt(i11IIi, 10) || 30) + "京豆");
          } else iIii1l.errorMessage ? console.log(I1ii1I + " " + (iIii1l.errorMessage || "")) : console.log(I1ii1I + " " + Ililli);
        } else console.log(I1ii1I + " " + Ililli);
        break;
      case "getShareRecord":
        if (typeof iIii1l == "object") {
          if (iIii1l.result && iIii1l.result === true && iIii1l.data) $.ShareCount = iIii1l.data.length, $.log("=========== 你邀请了:" + iIii1l.data.length + "个");else iIii1l.errorMessage ? console.log(I1ii1I + " " + (iIii1l.errorMessage || "")) : console.log(I1ii1I + " " + Ililli);
        } else console.log(I1ii1I + " " + Ililli);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(I1ii1I + "-> " + Ililli);
    }
    typeof iIii1l == "object" && iIii1l.errorMessage && iIii1l.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (ll111l) {
    console.log(ll111l);
  }
}
function i1111(illIII, iliI1l, ii1iIi = "POST") {
  let IIl11i = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l1IIi,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return illIII.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (IIl11i.Referer = "https://lzkjdz-isv.isvjcloud.com/m/1000411104/99/2205100041110401/?activityId=" + $.activityId + "&helpUuid=" + $.shareUuid, IIl11i.Cookie = "" + (l1IIl && l1IIl || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + l1I1il), {
    "url": illIII,
    "method": ii1iIi,
    "headers": IIl11i,
    "body": iliI1l,
    "timeout": 30000
  };
}
function iIIlII() {
  return new Promise(l1Illi => {
    let l1Illl = {
      "url": "https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2308100041110401",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": l1IIi,
        "Referer": "https://lzkjdz-isv.isvjcloud.com/m/1000411104/99/2205100041110401/?activityId=" + $.activityId + "&helpUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1Illl, async (Ill1li, Ililii, I111ll) => {
      try {
        if (Ill1li) Ililii && typeof Ililii.statusCode != "undefined" && Ililii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(Ill1li)), console.log($.name + " cookie API请求失败，请检查网路重试");else {
          let I111li = $.toObj(I111ll, I111ll);
          if (typeof I111li == "object") {
            if (I111li.result && I111li.result === true) {
              $.endTime = I111li.data.endTime || 0;
              $.startTimes = I111li.data.startTime || Date.now();
            } else I111li.errorMessage ? console.log("" + (I111li.errorMessage || "")) : console.log("" + I111ll);
          } else console.log("" + I111ll);
        }
      } catch (iIlll) {
        $.logErr(iIlll, Ililii);
      } finally {
        l1Illi();
      }
    });
  });
}
function IlIi1l() {
  return new Promise(i1I111 => {
    let il1Il1 = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": l1IIi,
        "Referer": "https://lzkjdz-isv.isvjcloud.com/m/1000411104/99/2205100041110401/?activityId=" + $.activityId + "&helpUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(il1Il1, async (iIiIlI, liII1i, iIiIil) => {
      try {
        if (iIiIlI) liII1i && typeof liII1i.statusCode != "undefined" && liII1i.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(iIiIlI)), console.log($.name + " cookie API请求失败，请检查网路重试");else {
          let i1I11l = iIiIil.match(/(活动已经结束)/) && iIiIil.match(/(活动已经结束)/)[1] || "";
          i1I11l && ($.activityEnd = true, console.log("活动已结束"));
          IiIiiI(liII1i);
        }
      } catch (liII1l) {
        $.logErr(liII1l, liII1i);
      } finally {
        i1I111();
      }
    });
  });
}
function IiIiiI(Ii1ll1) {
  if (Ii1ll1.headers["set-cookie"]) {
    l1IIi = originCookie + ";";
    for (let liII1I of Ii1ll1.headers["set-cookie"]) {
      III1ii[liII1I.split(";")[0].substr(0, liII1I.split(";")[0].indexOf("="))] = liII1I.split(";")[0].substr(liII1I.split(";")[0].indexOf("=") + 1);
    }
    for (const iIiIiI of Object.keys(III1ii)) {
      l1IIi += iIiIiI + "=" + III1ii[iIiIiI] + ";";
    }
    l1I1il = l1IIi;
  }
}
async function IlIi1i() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + lIllii(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function lIllii(iIlil) {
  iIlil = iIlil || 32;
  let iIlii = "abcdef0123456789",
    lI1I = iIlii.length,
    I1Ii = "";
  for (i = 0; i < iIlil; i++) I1Ii += iIlii.charAt(Math.floor(Math.random() * lI1I));
  return I1Ii;
}
function l1il1(IIlIli) {
  if (typeof IIlIli == "string") {
    try {
      return JSON.parse(IIlIli);
    } catch (ilIii1) {
      return console.log(ilIii1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function IIiI() {
  if (!$.joinVenderId) return;
  return new Promise(async I1Il11 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lI1i1I = "";
    if ($.shopactivityId) lI1i1I = ",\"activityId\":" + $.shopactivityId;
    const l111II = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lI1i1I + ",\"channel\":406}",
      IiIII1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l111II)
      },
      I1II1 = await IlIi("8adfb", IiIII1),
      lIil1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + l111II + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1II1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1IIi,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIil1i, async (lIil1l, l1II1i, lili11) => {
      try {
        if (lIil1l) {
          if (l1II1i && typeof l1II1i.statusCode != "undefined") {
            l1II1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          lili11 = lili11 && lili11.match(/jsonp_.*?\((.*?)\);/) && lili11.match(/jsonp_.*?\((.*?)\);/)[1] || lili11;
          let ii11i1 = $.toObj(lili11, lili11);
          if (ii11i1 && typeof ii11i1 == "object") {
            if (ii11i1 && ii11i1.success === true) {
              console.log(" >> " + ii11i1.message);
              $.errorJoinShop = ii11i1.message;
              if (ii11i1.result && ii11i1.result.giftInfo) for (let l1II11 of ii11i1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + l1II11.discountString + l1II11.prizeName + l1II11.secondLineDesc);
              }
            } else ii11i1 && typeof ii11i1 == "object" && ii11i1.message ? ($.errorJoinShop = ii11i1.message, console.log("" + (ii11i1.message || ""))) : console.log(lili11);
          } else {
            console.log(lili11);
          }
        }
      } catch (i1IIii) {
        $.logErr(i1IIii, l1II1i);
      } finally {
        I1Il11();
      }
    });
  });
}
async function l1iil1() {
  return new Promise(async i1IIl1 => {
    const I11llI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      I1IIi = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I11llI)
      },
      iiii1I = await IlIi("8adfb", I1IIi),
      lIlIi1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I11llI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiii1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1IIi,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIlIi1, async (l1II1l, i1IIlI, ii11il) => {
      try {
        if (l1II1l) i1IIlI && typeof i1IIlI.statusCode != "undefined" && i1IIlI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ii11il = ii11il && ii11il.match(/jsonp_.*?\((.*?)\);/) && ii11il.match(/jsonp_.*?\((.*?)\);/)[1] || ii11il;
          let iIi111 = $.toObj(ii11il, ii11il);
          iIi111 && typeof iIi111 == "object" ? iIi111 && iIi111.success == true && (console.log("去加入：" + (iIi111.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iIi111.result.interestsRuleList && iIi111.result.interestsRuleList[0] && iIi111.result.interestsRuleList[0].interestsInfo && iIi111.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(ii11il);
        }
      } catch (ii11ii) {
        $.logErr(ii11ii, i1IIlI);
      } finally {
        i1IIl1();
      }
    });
  });
}
function iiiIiI(iIl1I1) {
  return new Promise(I11lll => {
    const llIiII = {
      "url": "" + iIl1I1,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(llIiII, async (li1lil, li1lii, i111lI) => {
      try {
        if (li1lil) {} else {
          if (i111lI) i111lI = JSON.parse(i111lI);else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (lIl11I) {
        $.logErr(lIl11I, li1lii);
        i111lI = null;
      } finally {
        I11lll(i111lI);
      }
    });
  });
}
function Ill1i1(I1l1i, lIiIIl) {
  return Math.floor(Math.random() * (lIiIIl - I1l1i)) + I1l1i;
}