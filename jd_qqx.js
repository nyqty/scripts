/*
6.1-6.30 QQ星成长黄金期，集成长值赢大奖

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 6.1-6.30 QQ星成长黄金期，集成长值赢大奖 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#6.1-6.30 QQ星成长黄金期，集成长值赢大奖
11 11 11 11 * jd_qqx.js, tag=6.1-6.30 QQ星成长黄金期，集成长值赢大奖, enabled=true

*/

const $ = new Env('6.1-6.30 QQ星成长黄金期，集成长值赢大奖');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  getToken = require("./function/krgetToken");
let domains = "https://lzkjdz-isv.isvjcloud.com",
  opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "10" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "10",
  lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(lil1i1ll => {
    cookiesArr.push(jdCookieNode[lil1i1ll]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IilIii1I => IilIii1I.cookie)].filter(lliIlll1 => !!lliIlll1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  activityUrl = "https://lzkjdz-isv.isvjcloud.com/m/1000003570/99/2306100000357001/";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "2306100000357001";
  authorCodeList = [];
  authorCodeList === "404: Not Found" && (authorCodeList = [""]);
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000003570/99/2306100000357001/?helpUuid=" + $.shareUuid);
  for (let Iiili1Il = 0; Iiili1Il < cookiesArr.length; Iiili1Il++) {
    cookie = cookiesArr[Iiili1Il];
    originCookie = cookiesArr[Iiili1Il];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Iiili1Il + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(3000);
      if (Iiili1Il == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let il1li1lI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + il1li1lI);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + il1li1lI);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(llilIli => $.logErr(llilIli)).finally(() => $.done());
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
      $.joinVenderId = 1000003570;
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
    for (let i1l111II = 0; i1l111II < $.taskslist.length; i1l111II++) {
      $.taskId = $.taskslist[i1l111II].taskId;
      $.taskType = $.taskslist[i1l111II].taskType;
      if ($.taskslist[i1l111II].taskFinishCnt === 0) {
        switch ($.taskType) {
          case 1:
            console.log("去完成" + $.taskslist[i1l111II].taskType + "" + $.taskslist[i1l111II].taskId);
            await takePostRequest("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 2:
            console.log("去完成" + $.taskslist[i1l111II].taskType + "" + $.taskslist[i1l111II].taskId);
            await takePostRequest("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 4:
            console.log("去完成" + $.taskslist[i1l111II].taskType + "" + $.taskslist[i1l111II].taskId);
            await takePostRequest("task");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            break;
          case 5:
            console.log("去完成" + $.taskslist[i1l111II].taskType + "" + $.taskslist[i1l111II].taskId);
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
      let IlI1lll = parseInt($.score / 400);
      opencard_draw = parseInt(opencard_draw, 10);
      if (IlI1lll > opencard_draw) IlI1lll = opencard_draw;
      console.log("已设置抽奖次数为" + opencard_draw + "次，当前有" + IlI1lll + "次抽奖机会");
      for (m = 1; IlI1lll--; m++) {
        console.log("进行第" + m + "次抽奖");
        await takePostRequest("draw");
        if ($.runFalag == false) break;
        if (Number(IlI1lll) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (lIIIIii1) {
    console.log(lIIIIii1);
  }
}
async function takePostRequest(i1illlli) {
  if ($.outFlag) return;
  let Il11iIIl = "https://lzkjdz-isv.isvjcloud.com",
    iIliiliI = "",
    lIIlliIl = "POST";
  switch (i1illlli) {
    case "getMyPing":
      url = Il11iIIl + "/customer/getMyPing";
      iIliiliI = "token=" + $.Token + "&fromType=APP&userId=1000003570&pin=";
      break;
    case "getSimpleActInfoVo":
      url = Il11iIIl + "/common/brand/getSimpleActInfoVo";
      iIliiliI = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = Il11iIIl + "/common/accessLogWithAD";
      let iI1l1111 = "https://lzkjdz-isv.isvjcloud.com/m/1000003570/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      iIliiliI = "venderId=1000003570&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iI1l1111);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = Il11iIIl + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      iIliiliI = "venderId=1000003570&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = Il11iIIl + "/a2/task/activityContent";
      iIliiliI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&inviterUuid=" + $.shareUuid;
      break;
    case "task":
      url = Il11iIIl + "/a2/task/startTask";
      iIliiliI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId;
      break;
    case "draw":
      url = Il11iIIl + "/a2/task/startDraw";
      iIliiliI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + i1illlli);
  }
  let liIi1iI = getPostRequest(url, iIliiliI, lIIlliIl);
  return new Promise(async lIIl11I1 => {
    $.post(liIi1iI, (II11iiII, IIli1Il1, ll1i) => {
      try {
        setActivityCookie(IIli1Il1);
        if (II11iiII) {
          IIli1Il1 && typeof IIli1Il1.statusCode != "undefined" && IIli1Il1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(II11iiII, II11iiII));
          console.log(i1illlli + " API请求失败，请检查网路重试");
        } else {
          dealReturn(i1illlli, ll1i);
        }
      } catch (Ii1l11i) {
        console.log(Ii1l11i, IIli1Il1);
      } finally {
        lIIl11I1();
      }
    });
  });
}
async function dealReturn(iiiIiIi1, iIlll1ii) {
  let II11lllI = "";
  try {
    (iiiIiIi1 != "accessLogWithAD" || iiiIiIi1 != "drawContent") && iIlll1ii && (II11lllI = JSON.parse(iIlll1ii));
  } catch (iI1IIiI) {
    console.log(iiiIiIi1 + " 执行任务异常");
    console.log(iIlll1ii);
    $.runFalag = false;
  }
  try {
    switch (iiiIiIi1) {
      case "getMyPing":
        if (typeof II11lllI == "object") {
          if (II11lllI.result && II11lllI.result === true) {
            if (II11lllI.data && typeof II11lllI.data.secretPin != "undefined") $.Pin = II11lllI.data.secretPin;
            if (II11lllI.data && typeof II11lllI.data.nickname != "undefined") $.nickname = II11lllI.data.nickname;
          } else {
            if (II11lllI.errorMessage) {
              console.log(iiiIiIi1 + " " + (II11lllI.errorMessage || ""));
            } else console.log(iiiIiIi1 + " " + iIlll1ii);
          }
        } else {
          console.log(iiiIiIi1 + " " + iIlll1ii);
        }
        break;
      case "task":
        if (typeof II11lllI == "object") {
          if (II11lllI.result && II11lllI.result === true) console.log("任务完成，总积分：" + II11lllI.data);else {
            if (II11lllI.errorMessage) console.log("" + (II11lllI.errorMessage || ""));else {
              console.log("" + iIlll1ii);
            }
          }
        } else console.log("" + iIlll1ii);
        break;
      case "draw":
        if (typeof II11lllI == "object") {
          if (II11lllI.result && II11lllI.result === true && II11lllI.data.drawOk) console.log("抽中：" + II11lllI.data.name);else II11lllI.errorMessage ? console.log("" + (II11lllI.errorMessage || "")) : console.log("💨  空气");
        } else console.log("" + iIlll1ii);
        break;
      case "activityContent":
        if (typeof II11lllI == "object") {
          if (II11lllI.result && II11lllI.result === true) {
            $.actorUuid = II11lllI.data.customerId || "";
            $.turntableId = II11lllI.data.turntableId || "";
            $.score = II11lllI.data.score || 0;
            $.helpStatus = II11lllI.data.helpStatus || 0;
            $.openStatus = II11lllI.data.openStatus || 0;
            $.assistCount = II11lllI.data.assistCount || 0;
            $.state = II11lllI.data.state || "";
            $.taskslist = II11lllI.data.giftVOS || [];
          } else {
            if (II11lllI.errorMessage) {
              if (II11lllI.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(iiiIiIi1 + " " + (II11lllI.errorMessage || ""));
            } else console.log(iiiIiIi1 + " " + iIlll1ii);
          }
        } else {
          console.log(iiiIiIi1 + " " + iIlll1ii);
        }
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof II11lllI == "object") {
          if (II11lllI.isOk) $.openStatus = II11lllI.openCard || false;else II11lllI.errorMessage || II11lllI.msg ? console.log(iiiIiIi1 + " " + (II11lllI.errorMessage || II11lllI.msg || "")) : console.log(iiiIiIi1 + " " + iIlll1ii);
        } else console.log(iiiIiIi1 + " " + iIlll1ii);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(iiiIiIi1 + "-> " + iIlll1ii);
    }
    typeof II11lllI == "object" && II11lllI.errorMessage && II11lllI.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IIl1IlI) {
    console.log(IIl1IlI);
  }
}
function getPostRequest(i1l11ili, ilIliIIi, I11Iiii1 = "POST") {
  let I11i1i1l = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i1l11ili.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (I11i1i1l.Referer = activityUrl, I11i1i1l.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": i1l11ili,
    "method": I11Iiii1,
    "headers": I11i1i1l,
    "body": ilIliIIi,
    "timeout": 30000
  };
}
function getSimpleActInfoVo() {
  return new Promise(IIIIIl11 => {
    let iil1illl = {
      "url": "https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2306100000357001",
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
    $.get(iil1illl, async (iIiiI1ll, iillIi1i, li1Ill1l) => {
      try {
        if (iIiiI1ll) {
          iillIi1i && typeof iillIi1i.statusCode != "undefined" && iillIi1i.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(iIiiI1ll));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let ii1iIllI = $.toObj(li1Ill1l, li1Ill1l);
          if (typeof ii1iIllI == "object") {
            if (ii1iIllI.result && ii1iIllI.result === true) {
              $.endTime = ii1iIllI.data.endTime || 0;
              $.startTimes = ii1iIllI.data.startTime || Date.now();
            } else {
              if (ii1iIllI.errorMessage) {
                console.log("" + (ii1iIllI.errorMessage || ""));
              } else console.log("" + li1Ill1l);
            }
          } else console.log("" + li1Ill1l);
        }
      } catch (ilIiIlli) {
        $.logErr(ilIiIlli, iillIi1i);
      } finally {
        IIIIIl11();
      }
    });
  });
}
function getCk() {
  return new Promise(iiIill1 => {
    let liili1l = {
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
    $.get(liili1l, async (Iili1lII, l111iI, lIl1iiIl) => {
      try {
        if (Iili1lII) {
          l111iI && typeof l111iI.statusCode != "undefined" && l111iI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(Iili1lII));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Ilili1II = lIl1iiIl.match(/(活动已经结束)/) && lIl1iiIl.match(/(活动已经结束)/)[1] || "";
          Ilili1II && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(l111iI);
        }
      } catch (IiilIiIi) {
        $.logErr(IiilIiIi, l111iI);
      } finally {
        iiIill1();
      }
    });
  });
}
function setActivityCookie(IIii1lii) {
  if (IIii1lii) {
    if (IIii1lii.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let lIil1iI1 of IIii1lii.headers["set-cookie"]) {
        lz_cookie[lIil1iI1.split(";")[0].substr(0, lIil1iI1.split(";")[0].indexOf("="))] = lIil1iI1.split(";")[0].substr(lIil1iI1.split(";")[0].indexOf("=") + 1);
      }
      for (const II1i1liI of Object.keys(lz_cookie)) {
        cookie += II1i1liI + "=" + lz_cookie[II1i1liI] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(i1IIilli) {
  i1IIilli = i1IIilli || 32;
  let ll1111il = "abcdef0123456789",
    IiIIlIIl = ll1111il.length,
    Il1i1iIi = "";
  for (i = 0; i < i1IIilli; i++) Il1i1iIi += ll1111il.charAt(Math.floor(Math.random() * IiIIlIIl));
  return Il1i1iIi;
}
async function joinShop() {
  return new Promise(async ii11ii1i => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let li1IIlIi = "";
    if ($.shopactivityId) li1IIlIi = ",\"activityId\":" + $.shopactivityId;
    const lil1i1l1 = "{\"venderId\":\"1000003570\",\"shopId\":\"1000003570\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + li1IIlIi + ",\"channel\":406}",
      lii1Ili = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lil1i1l1)
      },
      ilIIll11 = await getH5st("8adfb", lii1Ili),
      illI1lii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lil1i1l1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ilIIll11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(illI1lii, async (ilI11IiI, llI11liI, lliIIll1) => {
      try {
        lliIIll1 = lliIIll1 && lliIIll1.match(/jsonp_.*?\((.*?)\);/) && lliIIll1.match(/jsonp_.*?\((.*?)\);/)[1] || lliIIll1;
        let i1iI1Iii = $.toObj(lliIIll1, lliIIll1);
        if (i1iI1Iii && typeof i1iI1Iii == "object") {
          if (i1iI1Iii && i1iI1Iii.success === true) {
            console.log(i1iI1Iii.message);
            $.errorJoinShop = i1iI1Iii.message;
            if (i1iI1Iii.result && i1iI1Iii.result.giftInfo) for (let lI1llili of i1iI1Iii.result.giftInfo.giftList) {
              console.log("入会获得:" + lI1llili.discountString + lI1llili.prizeName + lI1llili.secondLineDesc);
            }
          } else {
            if (i1iI1Iii && typeof i1iI1Iii == "object" && i1iI1Iii.message) {
              $.errorJoinShop = i1iI1Iii.message;
              console.log("" + (i1iI1Iii.message || ""));
            } else {
              console.log(lliIIll1);
            }
          }
        } else console.log(lliIIll1);
      } catch (IIiliilI) {
        $.logErr(IIiliilI, llI11liI);
      } finally {
        ii11ii1i();
      }
    });
  });
}
function getH5st(Ilill1ii, l1lllliI) {
  return new Promise(async IIi1I11I => {
    let i1llli1 = {
      "url": "http://api.kingran.cf/h5st",
      "body": "businessId=" + Ilill1ii + "&req=" + encodeURIComponent(JSON.stringify(l1lllliI)),
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(i1llli1, (li1Il1I, lIlIil1I, lII1l111) => {
      try {
        if (li1Il1I) {
          console.log(JSON.stringify(li1Il1I));
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {}
      } catch (Il1iI1Ii) {
        $.logErr(Il1iI1Ii, lIlIil1I);
      } finally {
        IIi1I11I(lII1l111);
      }
    });
  });
}
function getAuthorCodeList(lI1Iiil1) {
  return new Promise(l1iI1i1l => {
    const llliiliI = {
      "url": lI1Iiil1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(llliiliI, async (iI1i1I1, IlII1IIi, ii1lI1il) => {
      try {
        if (iI1i1I1) $.log(iI1i1I1);else {
          if (ii1lI1il) ii1lI1il = JSON.parse(ii1lI1il);
        }
      } catch (l1iiiIlI) {
        $.logErr(l1iiiIlI, IlII1IIi);
        ii1lI1il = null;
      } finally {
        l1iI1i1l(ii1lI1il);
      }
    });
  });
}
function jsonParse(i111i1I1) {
  if (typeof i111i1I1 == "string") try {
    return JSON.parse(i111i1I1);
  } catch (ii1lIlli) {
    return console.log(ii1lIlli), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
