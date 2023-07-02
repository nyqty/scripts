/*
a2集成长值赢千元礼包

任务本,邀请不清楚，抽奖概率豆子

变量：jd_a2_id // 活动id   7月id：export jd_a2_id="2307100000664403"

————————————————
入口：[ a2集成长值赢千元礼包 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#a2集成长值赢千元礼包
11 11 11 11 * jd_a2.js, tag=a2集成长值赢千元礼包, enabled=true

*/

const Env = require('./utils/Env.js');
const $ = new Env('a2集成长值赢千元礼包');
const iIIII = $.isNode() ? require("./jdCookie.js") : "",
  Il1iIi = $.isNode() ? require("./sendNotify") : "",
  Ii1Il = require("./function/krgetToken");
let Iii1ii = "https://lzkjdz-isv.isvjcloud.com",
  l1iiI1 = process.env.jd_a2_id ? process.env.jd_a2_id : "",
  Iii1il = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "10" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "10",
  lIi1li = {},
  Ii1Ii = [],
  Il1iIl = "";
if ($.isNode()) {
  Object.keys(iIIII).forEach(iIlilI => {
    Ii1Ii.push(iIIII[iIlilI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Ii1Ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1lil1($.getdata("CookiesJD") || "[]").map(i11Ii1 => i11Ii1.cookie)].filter(lIilIi => !!lIilIi);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lIi1ll = "",
  l1IIiI = "",
  IlilIi = "https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/" + l1iiI1 + "/";
!(async () => {
  if (!l1iiI1) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  if (!Ii1Ii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = l1iiI1;
  $.shareUuid = "";
  console.log("每期活动自行去 A2 店铺查看，有水无水自测");
  console.log("变量：export jd_a2_id=\"活动ID\"");
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000006644/99/" + $.activityId);
  for (let iIIIil = 0; iIIIil < Ii1Ii.length; iIIIil++) {
    Il1iIl = Ii1Ii[iIIIil];
    originCookie = Ii1Ii[iIIIil];
    if (Il1iIl) {
      $.UserName = decodeURIComponent(Il1iIl.match(/pt_pin=([^; ]+)(?=;?)/) && Il1iIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIIIil + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await iIlil1();
      await I1lilI();
      await $.wait(3000);
      if (iIIIil == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let Ii1Ii1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + Ii1Ii1);
    if ($.isNode()) await Il1iIi.sendNotify("" + $.name, "" + Ii1Ii1);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(IIll1I => $.logErr(IIll1I)).finally(() => $.done());
async function I1lilI() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lIi1ll = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await Ii1Il(Il1iIl, Iii1ii);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await Ii1II();
    if (l1IIiI == "") {
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
    await i11IiI("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await i11IiI("accessLogWithAD");
    await i11IiI("getOpenCardStatusWithOutSelf");
    await i11IiI("activityContent");
    if ($.openStatus == false) {
      console.log("去开通店铺会员");
      $.joinVenderId = 1000006644;
      await IIiii1();
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("第1次 重新开卡");
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        await IIiii1();
      }
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }
      await i11IiI("getOpenCardStatusWithOutSelf");
      await i11IiI("activityContent");
    }
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    for (let li11ll = 0; li11ll < $.taskslist.length; li11ll++) {
      $.taskId = $.taskslist[li11ll].taskId;
      $.taskType = $.taskslist[li11ll].taskType;
      if ($.taskslist[li11ll].taskFinishCnt === 0) {
        switch ($.taskType) {
          case 1:
            console.log("去完成" + $.taskslist[li11ll].taskType + "" + $.taskslist[li11ll].taskId);
            await i11IiI("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 2:
            console.log("去完成" + $.taskslist[li11ll].taskType + "" + $.taskslist[li11ll].taskId);
            await i11IiI("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 4:
            console.log("去完成" + $.taskslist[li11ll].taskType + "" + $.taskslist[li11ll].taskId);
            await i11IiI("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 5:
            console.log("去完成" + $.taskslist[li11ll].taskType + "" + $.taskslist[li11ll].taskId);
            await i11IiI("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 6:
          case 3:
            break;
          default:
            console.log("错误" + $.taskType);
        }
      }
    }
    await i11IiI("activityContent");
    if (Iii1il + "" !== "0") {
      $.runFalag = true;
      let li1l1 = parseInt($.score / 500);
      Iii1il = parseInt(Iii1il, 10);
      if (li1l1 > Iii1il) li1l1 = Iii1il;
      console.log("已设置抽奖次数为" + Iii1il + "次，当前有" + li1l1 + "次抽奖机会");
      for (m = 1; li1l1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await i11IiI("draw");
        if ($.runFalag == false) break;
        if (Number(li1l1) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (Il1I1i) {
    console.log(Il1I1i);
  }
}
async function i11IiI(lIilI1) {
  if ($.outFlag) return;
  let Ii1Il1 = "https://lzkjdz-isv.isvjcloud.com",
    iIIIli = "",
    I1IIll = "POST";
  switch (lIilI1) {
    case "getMyPing":
      url = Ii1Il1 + "/customer/getMyPing";
      iIIIli = "token=" + $.Token + "&fromType=APP&userId=1000006644&pin=";
      break;
    case "getSimpleActInfoVo":
      url = Ii1Il1 + "/common/brand/getSimpleActInfoVo";
      iIIIli = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = Ii1Il1 + "/common/accessLogWithAD";
      let i1lIi = "https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      iIIIli = "venderId=1000006644&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(i1lIi);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = Ii1Il1 + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      iIIIli = "venderId=1000006644&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = Ii1Il1 + "/a2/task/activityContent";
      iIIIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&inviterUuid=" + $.shareUuid;
      break;
    case "task":
      url = Ii1Il1 + "/a2/task/startTask";
      iIIIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId;
      break;
    case "draw":
      url = Ii1Il1 + "/a2/task/startDraw";
      iIIIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + lIilI1);
  }
  let lIilII = IlilIl(url, iIIIli, I1IIll);
  return new Promise(async iilIiI => {
    $.post(lIilII, (i1IiI1, l1lIII, iII11i) => {
      try {
        Iii1l1(l1lIII);
        i1IiI1 ? (l1lIII && typeof l1lIII.statusCode != "undefined" && l1lIII.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(i1IiI1, i1IiI1)), console.log(lIilI1 + " API请求失败，请检查网路重试")) : iIlill(lIilI1, iII11i);
      } catch (ll1IlI) {
        console.log(ll1IlI, l1lIII);
      } finally {
        iilIiI();
      }
    });
  });
}
async function iIlill(illI1i, i1IiII) {
  let l1ll1I = "";
  try {
    if (illI1i != "accessLogWithAD" || illI1i != "drawContent") {
      i1IiII && (l1ll1I = JSON.parse(i1IiII));
    }
  } catch (iIIlIi) {
    console.log(illI1i + " 执行任务异常");
    console.log(i1IiII);
    $.runFalag = false;
  }
  try {
    switch (illI1i) {
      case "getMyPing":
        if (typeof l1ll1I == "object") {
          if (l1ll1I.result && l1ll1I.result === true) {
            if (l1ll1I.data && typeof l1ll1I.data.secretPin != "undefined") $.Pin = l1ll1I.data.secretPin;
            if (l1ll1I.data && typeof l1ll1I.data.nickname != "undefined") $.nickname = l1ll1I.data.nickname;
          } else l1ll1I.errorMessage ? console.log(illI1i + " " + (l1ll1I.errorMessage || "")) : console.log(illI1i + " " + i1IiII);
        } else console.log(illI1i + " " + i1IiII);
        break;
      case "task":
        if (typeof l1ll1I == "object") {
          if (l1ll1I.result && l1ll1I.result === true) console.log("任务完成，总积分：" + l1ll1I.data);else l1ll1I.errorMessage ? console.log("" + (l1ll1I.errorMessage || "")) : console.log("" + i1IiII);
        } else console.log("" + i1IiII);
        break;
      case "draw":
        if (typeof l1ll1I == "object") {
          if (l1ll1I.result && l1ll1I.result === true && l1ll1I.data.drawOk) console.log("抽中：" + l1ll1I.data.name);else l1ll1I.errorMessage ? console.log("" + (l1ll1I.errorMessage || "")) : console.log("💨  空气");
        } else console.log("" + i1IiII);
        break;
      case "activityContent":
        if (typeof l1ll1I == "object") {
          if (l1ll1I.result && l1ll1I.result === true) {
            $.actorUuid = l1ll1I.data.customerId || "";
            $.turntableId = l1ll1I.data.turntableId || "";
            $.score = l1ll1I.data.score || 0;
            $.helpStatus = l1ll1I.data.helpStatus || 0;
            $.openStatus = l1ll1I.data.openStatus || 0;
            $.assistCount = l1ll1I.data.assistCount || 0;
            $.state = l1ll1I.data.state || "";
            $.taskslist = l1ll1I.data.giftVOS || [];
          } else {
            if (l1ll1I.errorMessage) {
              if (l1ll1I.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(illI1i + " " + (l1ll1I.errorMessage || ""));
            } else console.log(illI1i + " " + i1IiII);
          }
        } else console.log(illI1i + " " + i1IiII);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof l1ll1I == "object") {
          if (l1ll1I.isOk) $.openStatus = l1ll1I.openCard || false;else l1ll1I.errorMessage || l1ll1I.msg ? console.log(illI1i + " " + (l1ll1I.errorMessage || l1ll1I.msg || "")) : console.log(illI1i + " " + i1IiII);
        } else console.log(illI1i + " " + i1IiII);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(illI1i + "-> " + i1IiII);
    }
    if (typeof l1ll1I == "object") {
      if (l1ll1I.errorMessage) {
        if (l1ll1I.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (IlI1) {
    console.log(IlI1);
  }
}
function IlilIl(l1I1i1, I1IlIi, l1ll1i = "POST") {
  let i111l = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Il1iIl,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return l1I1i1.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (i111l.Referer = IlilIi, i111l.Cookie = "" + (lIi1ll && lIi1ll || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + l1IIiI), {
    "url": l1I1i1,
    "method": l1ll1i,
    "headers": i111l,
    "body": I1IlIi,
    "timeout": 30000
  };
}
function iIlili() {
  return new Promise(III1ii => {
    let l1iiii = {
      "url": "https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2306100000664401",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": Il1iIl,
        "Referer": IlilIi,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1iiii, async (iiiIi1, illl1l, Il11I) => {
      try {
        if (iiiIi1) {
          if (illl1l && typeof illl1l.statusCode != "undefined") {
            if (illl1l.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(iiiIi1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IIl1 = $.toObj(Il11I, Il11I);
          if (typeof IIl1 == "object") {
            if (IIl1.result && IIl1.result === true) {
              $.endTime = IIl1.data.endTime || 0;
              $.startTimes = IIl1.data.startTime || Date.now();
            } else {
              if (IIl1.errorMessage) {
                console.log("" + (IIl1.errorMessage || ""));
              } else console.log("" + Il11I);
            }
          } else {
            console.log("" + Il11I);
          }
        }
      } catch (illIIi) {
        $.logErr(illIIi, illl1l);
      } finally {
        III1ii();
      }
    });
  });
}
function Ii1II() {
  return new Promise(I1i1l => {
    let IIil = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": Il1iIl,
        "Referer": IlilIi,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(IIil, async (iiII, Iil11, Ill1iI) => {
      try {
        if (iiII) {
          Iil11 && typeof Iil11.statusCode != "undefined" && Iil11.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(iiII));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let ilI1ii = Ill1iI.match(/(活动已经结束)/) && Ill1iI.match(/(活动已经结束)/)[1] || "";
          ilI1ii && ($.activityEnd = true, console.log("活动已结束"));
          Iii1l1(Iil11);
        }
      } catch (ilI1il) {
        $.logErr(ilI1il, Iil11);
      } finally {
        I1i1l();
      }
    });
  });
}
function Iii1l1(ilI1l1) {
  if (ilI1l1) {
    if (ilI1l1.headers["set-cookie"]) {
      Il1iIl = originCookie + ";";
      for (let l1I11 of ilI1l1.headers["set-cookie"]) {
        lIi1li[l1I11.split(";")[0].substr(0, l1I11.split(";")[0].indexOf("="))] = l1I11.split(";")[0].substr(l1I11.split(";")[0].indexOf("=") + 1);
      }
      for (const i11I1 of Object.keys(lIi1li)) {
        Il1iIl += i11I1 + "=" + lIi1li[i11I1] + ";";
      }
      l1IIiI = Il1iIl;
    }
  }
}
async function iIlil1() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + l1IIi1(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function l1IIi1(l1iI1I) {
  l1iI1I = l1iI1I || 32;
  let l1I1I = "abcdef0123456789",
    l1lII1 = l1I1I.length,
    iilllI = "";
  for (i = 0; i < l1iI1I; i++) iilllI += l1I1I.charAt(Math.floor(Math.random() * l1lII1));
  return iilllI;
}
async function IIiii1() {
  return new Promise(async iliili => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let II1i1I = "";
    if ($.shopactivityId) II1i1I = ",\"activityId\":" + $.shopactivityId;
    const iIliI1 = "{\"venderId\":\"1000006644\",\"shopId\":\"1000006644\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + II1i1I + ",\"channel\":406}",
      iIii11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIliI1)
      },
      i1i1lI = await IlilII("8adfb", iIii11),
      IIllIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iIliI1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1i1lI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Il1iIl,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIllIi, async (i11l1l, IIllIl, i11l1i) => {
      try {
        i11l1i = i11l1i && i11l1i.match(/jsonp_.*?\((.*?)\);/) && i11l1i.match(/jsonp_.*?\((.*?)\);/)[1] || i11l1i;
        let I1liI1 = $.toObj(i11l1i, i11l1i);
        if (I1liI1 && typeof I1liI1 == "object") {
          if (I1liI1 && I1liI1.success === true) {
            console.log(I1liI1.message);
            $.errorJoinShop = I1liI1.message;
            if (I1liI1.result && I1liI1.result.giftInfo) {
              for (let I1ii11 of I1liI1.result.giftInfo.giftList) {
                console.log("入会获得:" + I1ii11.discountString + I1ii11.prizeName + I1ii11.secondLineDesc);
              }
            }
          } else {
            if (I1liI1 && typeof I1liI1 == "object" && I1liI1.message) {
              $.errorJoinShop = I1liI1.message;
              console.log("" + (I1liI1.message || ""));
            } else console.log(i11l1i);
          }
        } else console.log(i11l1i);
      } catch (iii11l) {
        $.logErr(iii11l, IIllIl);
      } finally {
        iliili();
      }
    });
  });
}
function IlilII(IIl11l, I111i1) {
  return new Promise(async i11l11 => {
    let liIIIl = {
      "url": "http://api.kingran.cf/h5st",
      "body": "businessId=" + IIl11l + "&req=" + encodeURIComponent(JSON.stringify(I111i1)),
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(liIIIl, (IIllI1, lIl1iI, iil1II) => {
      try {
        if (IIllI1) {
          console.log(JSON.stringify(IIllI1));
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {}
      } catch (iii11I) {
        $.logErr(iii11I, lIl1iI);
      } finally {
        i11l11(iil1II);
      }
    });
  });
}
function iIII1(IIil11) {
  return new Promise(iIilI => {
    const II1i1i = {
      "url": IIil11 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(II1i1i, async (Il1iiI, iIil1, l1IllI) => {
      try {
        if (Il1iiI) {
          $.log(Il1iiI);
        } else {
          if (l1IllI) l1IllI = JSON.parse(l1IllI);
        }
      } catch (IIiIII) {
        $.logErr(IIiIII, iIil1);
        l1IllI = null;
      } finally {
        iIilI(l1IllI);
      }
    });
  });
}
function I1lil1(lIi1Il) {
  if (typeof lIi1Il == "string") try {
    return JSON.parse(lIi1Il);
  } catch (ll111I) {
    return console.log(ll111I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}