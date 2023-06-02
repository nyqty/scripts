/*
6.1-6.30 a2集成长值赢千元礼包

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 6.1-6.30 a2集成长值赢千元礼包 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#6.1-6.30 a2集成长值赢千元礼包
11 11 11 11 * jd_a2.js, tag=6.1-6.30 a2集成长值赢千元礼包, enabled=true

*/

const $ = new Env('6.1-6.30 a2集成长值赢千元礼包');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  getToken = require("./function/krgetToken");
let domains = "https://lzkjdz-isv.isvjcloud.com",
  opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "10" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "10",
  lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(iil111i1 => {
    cookiesArr.push(jdCookieNode[iil111i1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IliIIll => IliIIll.cookie)].filter(iIIIl11l => !!iIIIl11l);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  activityUrl = "https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/2306100000664401/";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "2306100000664401";
  authorCodeList = [];
  authorCodeList === "404: Not Found" && (authorCodeList = [""]);
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000006644/99/2306100000664401/?helpUuid=" + $.shareUuid);
  for (let IIiil1li = 0; IIiil1li < cookiesArr.length; IIiil1li++) {
    cookie = cookiesArr[IIiil1li];
    originCookie = cookiesArr[IIiil1li];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIiil1li + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(3000);
      if (IIiil1li == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let lI1lll1l = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + lI1lll1l);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + lI1lll1l);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(lIi11i1 => $.logErr(lIi11i1)).finally(() => $.done());
async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
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
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("getOpenCardStatusWithOutSelf");
    await takePostRequest("activityContent");
    if ($.openStatus == false) {
      console.log("去开通店铺会员");
      $.joinVenderId = 1000006644;
      await joinShop();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await joinShop());
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }
      await takePostRequest("getOpenCardStatusWithOutSelf");
      await takePostRequest("activityContent");
    }
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    for (let I1I1lIil = 0; I1I1lIil < $.taskslist.length; I1I1lIil++) {
      $.taskId = $.taskslist[I1I1lIil].taskId;
      $.taskType = $.taskslist[I1I1lIil].taskType;
      if ($.taskslist[I1I1lIil].taskFinishCnt === 0) {
        switch ($.taskType) {
          case 1:
            console.log("去完成" + $.taskslist[I1I1lIil].taskType + "" + $.taskslist[I1I1lIil].taskId);
            await takePostRequest("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 2:
            console.log("去完成" + $.taskslist[I1I1lIil].taskType + "" + $.taskslist[I1I1lIil].taskId);
            await takePostRequest("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 4:
            console.log("去完成" + $.taskslist[I1I1lIil].taskType + "" + $.taskslist[I1I1lIil].taskId);
            await takePostRequest("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 5:
            console.log("去完成" + $.taskslist[I1I1lIil].taskType + "" + $.taskslist[I1I1lIil].taskId);
            await takePostRequest("task");
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
    await takePostRequest("activityContent");
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let i111i11I = parseInt($.score / 500);
      opencard_draw = parseInt(opencard_draw, 10);
      if (i111i11I > opencard_draw) i111i11I = opencard_draw;
      console.log("已设置抽奖次数为" + opencard_draw + "次，当前有" + i111i11I + "次抽奖机会");
      for (m = 1; i111i11I--; m++) {
        console.log("进行第" + m + "次抽奖");
        await takePostRequest("draw");
        if ($.runFalag == false) break;
        if (Number(i111i11I) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (IIIiii11) {
    console.log(IIIiii11);
  }
}
async function takePostRequest(IllII1iI) {
  if ($.outFlag) return;
  let iIIlII1l = "https://lzkjdz-isv.isvjcloud.com",
    ii1l1iIl = "",
    I1i1lI1I = "POST";
  switch (IllII1iI) {
    case "getMyPing":
      url = iIIlII1l + "/customer/getMyPing";
      ii1l1iIl = "token=" + $.Token + "&fromType=APP&userId=1000006644&pin=";
      break;
    case "getSimpleActInfoVo":
      url = iIIlII1l + "/common/brand/getSimpleActInfoVo";
      ii1l1iIl = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = iIIlII1l + "/common/accessLogWithAD";
      let IillIIiI = "https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      ii1l1iIl = "venderId=1000006644&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(IillIIiI);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = iIIlII1l + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      ii1l1iIl = "venderId=1000006644&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iIIlII1l + "/a2/task/activityContent";
      ii1l1iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&inviterUuid=" + $.shareUuid;
      break;
    case "task":
      url = iIIlII1l + "/a2/task/startTask";
      ii1l1iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId;
      break;
    case "draw":
      url = iIIlII1l + "/a2/task/startDraw";
      ii1l1iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + IllII1iI);
  }
  let iII11li1 = getPostRequest(url, ii1l1iIl, I1i1lI1I);
  return new Promise(async Iiliiii => {
    $.post(iII11li1, (iIiIil1I, llliiIll, i1iI1iI1) => {
      try {
        setActivityCookie(llliiIll);
        if (iIiIil1I) {
          llliiIll && typeof llliiIll.statusCode != "undefined" && llliiIll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(iIiIil1I, iIiIil1I));
          console.log(IllII1iI + " API请求失败，请检查网路重试");
        } else {
          dealReturn(IllII1iI, i1iI1iI1);
        }
      } catch (l1IlIl1) {
        console.log(l1IlIl1, llliiIll);
      } finally {
        Iiliiii();
      }
    });
  });
}
async function dealReturn(ilI1ilIl, I11IIi) {
  let Ii1i1Ii = "";
  try {
    (ilI1ilIl != "accessLogWithAD" || ilI1ilIl != "drawContent") && I11IIi && (Ii1i1Ii = JSON.parse(I11IIi));
  } catch (I1II1IIi) {
    console.log(ilI1ilIl + " 执行任务异常");
    console.log(I11IIi);
    $.runFalag = false;
  }
  try {
    switch (ilI1ilIl) {
      case "getMyPing":
        if (typeof Ii1i1Ii == "object") {
          if (Ii1i1Ii.result && Ii1i1Ii.result === true) {
            if (Ii1i1Ii.data && typeof Ii1i1Ii.data.secretPin != "undefined") $.Pin = Ii1i1Ii.data.secretPin;
            if (Ii1i1Ii.data && typeof Ii1i1Ii.data.nickname != "undefined") $.nickname = Ii1i1Ii.data.nickname;
          } else Ii1i1Ii.errorMessage ? console.log(ilI1ilIl + " " + (Ii1i1Ii.errorMessage || "")) : console.log(ilI1ilIl + " " + I11IIi);
        } else console.log(ilI1ilIl + " " + I11IIi);
        break;
      case "task":
        if (typeof Ii1i1Ii == "object") {
          if (Ii1i1Ii.result && Ii1i1Ii.result === true) console.log("任务完成，总积分：" + Ii1i1Ii.data);else Ii1i1Ii.errorMessage ? console.log("" + (Ii1i1Ii.errorMessage || "")) : console.log("" + I11IIi);
        } else console.log("" + I11IIi);
        break;
      case "draw":
        if (typeof Ii1i1Ii == "object") {
          if (Ii1i1Ii.result && Ii1i1Ii.result === true && Ii1i1Ii.data.drawOk) console.log("抽中：" + Ii1i1Ii.data.name);else {
            if (Ii1i1Ii.errorMessage) {
              console.log("" + (Ii1i1Ii.errorMessage || ""));
            } else console.log("💨  空气");
          }
        } else console.log("" + I11IIi);
        break;
      case "activityContent":
        if (typeof Ii1i1Ii == "object") {
          if (Ii1i1Ii.result && Ii1i1Ii.result === true) {
            $.actorUuid = Ii1i1Ii.data.customerId || "";
            $.turntableId = Ii1i1Ii.data.turntableId || "";
            $.score = Ii1i1Ii.data.score || 0;
            $.helpStatus = Ii1i1Ii.data.helpStatus || 0;
            $.openStatus = Ii1i1Ii.data.openStatus || 0;
            $.assistCount = Ii1i1Ii.data.assistCount || 0;
            $.state = Ii1i1Ii.data.state || "";
            $.taskslist = Ii1i1Ii.data.giftVOS || [];
          } else {
            if (Ii1i1Ii.errorMessage) {
              if (Ii1i1Ii.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(ilI1ilIl + " " + (Ii1i1Ii.errorMessage || ""));
            } else console.log(ilI1ilIl + " " + I11IIi);
          }
        } else console.log(ilI1ilIl + " " + I11IIi);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof Ii1i1Ii == "object") {
          if (Ii1i1Ii.isOk) $.openStatus = Ii1i1Ii.openCard || false;else Ii1i1Ii.errorMessage || Ii1i1Ii.msg ? console.log(ilI1ilIl + " " + (Ii1i1Ii.errorMessage || Ii1i1Ii.msg || "")) : console.log(ilI1ilIl + " " + I11IIi);
        } else console.log(ilI1ilIl + " " + I11IIi);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(ilI1ilIl + "-> " + I11IIi);
    }
    if (typeof Ii1i1Ii == "object") {
      if (Ii1i1Ii.errorMessage) {
        if (Ii1i1Ii.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (ll1llilI) {
    console.log(ll1llilI);
  }
}
function getPostRequest(IIlIilil, l1ll1lll, i1iiIiIl = "POST") {
  let lIIliIil = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IIlIilil.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (lIIliIil.Referer = activityUrl, lIIliIil.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": IIlIilil,
    "method": i1iiIiIl,
    "headers": lIIliIil,
    "body": l1ll1lll,
    "timeout": 30000
  };
}
function getSimpleActInfoVo() {
  return new Promise(l1I1il1 => {
    let IiIl1i1 = {
      "url": "https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2306100000664401",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(IiIl1i1, async (lIi1I111, lli1li1l, liilll) => {
      try {
        if (lIi1I111) {
          if (lli1li1l && typeof lli1li1l.statusCode != "undefined") {
            lli1li1l.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(lIi1I111));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Ii1i1lIi = $.toObj(liilll, liilll);
          if (typeof Ii1i1lIi == "object") {
            if (Ii1i1lIi.result && Ii1i1lIi.result === true) {
              $.endTime = Ii1i1lIi.data.endTime || 0;
              $.startTimes = Ii1i1lIi.data.startTime || Date.now();
            } else {
              if (Ii1i1lIi.errorMessage) console.log("" + (Ii1i1lIi.errorMessage || ""));else {
                console.log("" + liilll);
              }
            }
          } else console.log("" + liilll);
        }
      } catch (iillIil) {
        $.logErr(iillIil, lli1li1l);
      } finally {
        l1I1il1();
      }
    });
  });
}
function getCk() {
  return new Promise(iIillII1 => {
    let l1iiii1I = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1iiii1I, async (II1lIl1I, IIllIiI, ii1I11I) => {
      try {
        if (II1lIl1I) {
          IIllIiI && typeof IIllIiI.statusCode != "undefined" && IIllIiI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(II1lIl1I));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iiII1Ili = ii1I11I.match(/(活动已经结束)/) && ii1I11I.match(/(活动已经结束)/)[1] || "";
          iiII1Ili && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(IIllIiI);
        }
      } catch (i1l111l1) {
        $.logErr(i1l111l1, IIllIiI);
      } finally {
        iIillII1();
      }
    });
  });
}
function setActivityCookie(I1l111Ii) {
  if (I1l111Ii) {
    if (I1l111Ii.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let Il1iII11 of I1l111Ii.headers["set-cookie"]) {
        lz_cookie[Il1iII11.split(";")[0].substr(0, Il1iII11.split(";")[0].indexOf("="))] = Il1iII11.split(";")[0].substr(Il1iII11.split(";")[0].indexOf("=") + 1);
      }
      for (const IliiiI11 of Object.keys(lz_cookie)) {
        cookie += IliiiI11 + "=" + lz_cookie[IliiiI11] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(ii1111Ii) {
  ii1111Ii = ii1111Ii || 32;
  let llIii1Ii = "abcdef0123456789",
    iii1Il11 = llIii1Ii.length,
    ll1il1il = "";
  for (i = 0; i < ii1111Ii; i++) ll1il1il += llIii1Ii.charAt(Math.floor(Math.random() * iii1Il11));
  return ll1il1il;
}
async function joinShop() {
  return new Promise(async liiIliIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iil1ll1l = "";
    if ($.shopactivityId) iil1ll1l = ",\"activityId\":" + $.shopactivityId;
    const lilll1ll = "{\"venderId\":\"1000006644\",\"shopId\":\"1000006644\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iil1ll1l + ",\"channel\":406}",
      IIIIIll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lilll1ll)
      },
      lIllilil = await getH5st("8adfb", IIIIIll),
      lI1llill = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lilll1ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIllilil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lI1llill, async (iiIll1il, IiIiiilI, l1l1li1i) => {
      try {
        l1l1li1i = l1l1li1i && l1l1li1i.match(/jsonp_.*?\((.*?)\);/) && l1l1li1i.match(/jsonp_.*?\((.*?)\);/)[1] || l1l1li1i;
        let l1l1llI = $.toObj(l1l1li1i, l1l1li1i);
        if (l1l1llI && typeof l1l1llI == "object") {
          if (l1l1llI && l1l1llI.success === true) {
            console.log(l1l1llI.message);
            $.errorJoinShop = l1l1llI.message;
            if (l1l1llI.result && l1l1llI.result.giftInfo) for (let lil1liI of l1l1llI.result.giftInfo.giftList) {
              console.log("入会获得:" + lil1liI.discountString + lil1liI.prizeName + lil1liI.secondLineDesc);
            }
          } else l1l1llI && typeof l1l1llI == "object" && l1l1llI.message ? ($.errorJoinShop = l1l1llI.message, console.log("" + (l1l1llI.message || ""))) : console.log(l1l1li1i);
        } else console.log(l1l1li1i);
      } catch (iIi1III) {
        $.logErr(iIi1III, IiIiiilI);
      } finally {
        liiIliIl();
      }
    });
  });
}
function getH5st(ii11liIi, I1IIiii) {
  return new Promise(async IIIi1lli => {
    let iI1I1Ii1 = {
      "url": "http://api.kingran.cf/h5st",
      "body": "businessId=" + ii11liIi + "&req=" + encodeURIComponent(JSON.stringify(I1IIiii)),
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(iI1I1Ii1, (IillllIl, I1I1Ii1, iI111IIl) => {
      try {
        if (IillllIl) {
          console.log(JSON.stringify(IillllIl));
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {}
      } catch (II1llll) {
        $.logErr(II1llll, I1I1Ii1);
      } finally {
        IIIi1lli(iI111IIl);
      }
    });
  });
}
function getAuthorCodeList(iillIIil) {
  return new Promise(ili1il1i => {
    const i111Iii = {
      "url": iillIIil + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i111Iii, async (ilI1ilil, iI1lliI, iilIliil) => {
      try {
        if (ilI1ilil) $.log(ilI1ilil);else {
          if (iilIliil) iilIliil = JSON.parse(iilIliil);
        }
      } catch (l1llIiii) {
        $.logErr(l1llIiii, iI1lliI);
        iilIliil = null;
      } finally {
        ili1il1i(iilIliil);
      }
    });
  });
}
function jsonParse(ililII11) {
  if (typeof ililII11 == "string") try {
    return JSON.parse(ililII11);
  } catch (illlii11) {
    return console.log(illlii11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
