/*
6.1-6.30 安佳做任务开盲盒，赢好礼


做任务，邀请，抽奖


请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#6.1-6.30 安佳做任务开盲盒，赢好礼
11 11 11 11 * jd_AJMH.js, tag=6.1-6.30 安佳做任务开盲盒，赢好礼, enabled=true

*/

const $ = new Env('6.1-6.30 安佳做任务开盲盒，赢好礼')
const ililIii = $.isNode() ? require("./jdCookie.js") : "",
  i1llilIi = $.isNode() ? require("./sendNotify") : "",
  iii1I1ll = require("./function/krgetToken");
let lIIil1li = "https://lzdz1-isv.isvjcloud.com",
  iiliiIIl = [],
  I1ll1l = "";
if ($.isNode()) {
  Object.keys(ililIii).forEach(l1IIi1lI => {
    iiliiIIl.push(ililIii[l1IIi1lI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iiliiIIl = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iI1ili11($.getdata("CookiesJD") || "[]").map(IIi1iIi => IIi1iIi.cookie)].filter(lI1ii1iI => !!lI1ii1iI);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let l1lI1il1 = "",
  l1lliI11 = "",
  ll1iIII = {};
!(async () => {
  if (!iiliiIIl[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "dzd9bc978d1448b7aa84b5b753";
  authorCodeList = ["618745ff8941480d9b02e9883723310e","1e1a56055c1b4424986c343a35dbe263","cc644d0a7e3a49c8a6bdf12897ffa00f","1b12f95256f64b2b8ce2d17080a137b7"];
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid);
  console.log("\n规则:\n1.每天完成任务共计：50积分。\n2.邀请一名好友50积分，不上限。\n3.每300积分可以开盲盒一次，每天限制开三次，每天限制中奖一次。");
  for (let li1Ilill = 0; li1Ilill < iiliiIIl.length; li1Ilill++) {
    I1ll1l = iiliiIIl[li1Ilill];
    originCookie = iiliiIIl[li1Ilill];
    if (I1ll1l) {
      $.UserName = decodeURIComponent(I1ll1l.match(/pt_pin=([^; ]+)(?=;?)/) && I1ll1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = li1Ilill + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await i1I11liI();
      await li111Ill();
      await $.wait(3000);
      if (li1Ilill == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let lliI111I = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + lliI111I);
    if ($.isNode()) await i1llilIi.sendNotify("" + $.name, "" + lliI111I);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(I1ili11 => $.logErr(I1ili11)).finally(() => $.done());
async function li111Ill() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    l1lI1il1 = "";
    $.Token = "";
    $.Pin = "";
    let lI1Ilil1 = false;
    $.Token = await iii1I1ll(I1ll1l, lIIil1li);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await l1iliI1();
    if (l1lliI11 == "") {
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
    await illlIl("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await illlIl("accessLogWithAD");
    await illlIl("getUserInfo");
    await illlIl("activityContent");
    await illlIl("drawContent");
    if ($.hotFlag) return;
    console.log($.actorUuid);
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    await $.wait(1000);
    console.log("开始做日常任务......");
    $.log("关注: " + $.followShop);
    !$.followShop && !$.outFlag && (lI1Ilil1 = true, await illlIl("followShop"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && (lI1Ilil1 = true, await illlIl("addSku"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("逛一逛: " + $.visitSkulist);
    !$.visitSkulist && !$.outFlag && (lI1Ilil1 = true, await illlIl("toShoplist"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    await illlIl("activityContent");
    console.log("\n目前分值为：" + $.score + "\n");
    $.runFalag = true;
    let iillil1 = parseInt($.score / 300);
    for (m = 1; iillil1--; m++) {
      console.log("第" + m + "次抽奖");
      await illlIl("draw");
      if ($.runFalag == false) break;
      if (Number(iillil1) <= 0) break;
      if (m >= 1) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
    }
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    console.log("当前助力:" + $.shareUuid);
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("后面的号都会助力:" + $.shareUuid);
    }
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
  } catch (lli1Iill) {
    console.log(lli1Iill);
  }
}
async function illlIl(ilIiiiil) {
  if ($.outFlag) return;
  let iiliIil1 = "https://lzdz1-isv.isvjcloud.com",
    IIIl111I = "",
    ilIIlii = "POST";
  switch (ilIiiiil) {
    case "getSimpleActInfoVo":
      url = iiliIil1 + "/dz/common/getSimpleActInfoVo";
      IIIl111I = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = iiliIil1 + "/customer/getMyPing";
      IIIl111I = "userId=1000014486&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = iiliIil1 + "/common/accessLogWithAD";
      let liii1IlI = iiliIil1 + "/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      IIIl111I = "venderId=1000014486&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(liii1IlI) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = iiliIil1 + "/wxActionCommon/getUserInfo";
      IIIl111I = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iiliIil1 + "/dingzhi/box618/activityContent";
      IIIl111I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = iiliIil1 + "/dingzhi/taskact/common/drawContent";
      IIIl111I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = iiliIil1 + "/dingzhi/box618/startDraw";
      IIIl111I = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "toShoplist":
      url = iiliIil1 + "/dingzhi/box618/saveTask";
      IIIl111I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=14&taskValue=1000014486";
      break;
    case "addCart":
    case "browseGoods":
      url = iiliIil1 + "/dingzhi/opencard/" + ilIiiiil;
      IIIl111I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (ilIiiiil == "browseGoods") IIIl111I += "&value=" + $.visitSkuValue;
      break;
    case "邀请":
    case "助力":
      ilIiiiil == "助力" ? url = iiliIil1 + "/dingzhi/linkgame/assist" : url = iiliIil1 + "/dingzhi/linkgame/assist/status";
      IIIl111I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid;
      break;
    case "followShop":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = iiliIil1 + "/dingzhi/box618/saveTask";
      let iilIlI11 = "",
        i11iI1 = "";
      if (ilIiiiil == "followShop") {
        iilIlI11 = 22;
        i11iI1 = "";
      } else {
        if (ilIiiiil == "visitSku") {
          iilIlI11 = 5;
          i11iI1 = $.visitSkuValue || 5;
        } else {
          if (ilIiiiil == "toShop") {
            iilIlI11 = 14;
            i11iI1 = $.visitSkuValue || 1000014486;
          } else ilIiiiil == "addSku" && (iilIlI11 = 21, i11iI1 = "");
        }
      }
      IIIl111I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + iilIlI11 + "&taskValue=" + $.visitSkuValue;
      break;
    case "getDrawRecordHasCoupon":
      url = iiliIil1 + "/dingzhi/taskact/common/getDrawRecordHasCoupon";
      IIIl111I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    default:
      console.log("错误" + ilIiiiil);
  }
  let I11I1ilI = llI11li(url, IIIl111I, ilIIlii);
  return new Promise(async I1111il => {
    $.post(I11I1ilI, (i1liIIlI, IlIlilll, ilI1111i) => {
      try {
        lIIiII1(IlIlilll);
        i1liIIlI ? (IlIlilll && typeof IlIlilll.statusCode != "undefined" && IlIlilll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(i1liIIlI, i1liIIlI)), console.log(ilIiiiil + " API请求失败，请检查网路重试")) : iiII1Ii1(ilIiiiil, ilI1111i);
      } catch (IIIil111) {
        console.log(IIIil111, IlIlilll);
      } finally {
        I1111il();
      }
    });
  });
}
async function iiII1Ii1(lillIIlI, lIiIliil) {
  let i1lI11I = "";
  try {
    (lillIIlI != "accessLogWithAD" || lillIIlI != "drawContent") && lIiIliil && (i1lI11I = JSON.parse(lIiIliil));
  } catch (iIl1I11) {
    console.log(lillIIlI + " 执行任务异常");
    console.log(lIiIliil);
    $.runFalag = false;
  }
  try {
    switch (lillIIlI) {
      case "getSimpleActInfoVo":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.result && i1lI11I.result === true) {
            if (typeof i1lI11I.data.shopId != "undefined") $.shopId = i1lI11I.data.shopId;
            if (typeof i1lI11I.data.venderId != "undefined") $.venderId = i1lI11I.data.venderId;
          } else i1lI11I.errorMessage ? console.log(lillIIlI + " " + (i1lI11I.errorMessage || "")) : console.log(lillIIlI + " " + lIiIliil);
        } else console.log(lillIIlI + " " + lIiIliil);
        break;
      case "getMyPing":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.result && i1lI11I.result === true) {
            if (i1lI11I.data && typeof i1lI11I.data.secretPin != "undefined") $.Pin = i1lI11I.data.secretPin;
            if (i1lI11I.data && typeof i1lI11I.data.nickname != "undefined") $.nickname = i1lI11I.data.nickname;
          } else i1lI11I.errorMessage ? console.log(lillIIlI + " " + (i1lI11I.errorMessage || "")) : console.log(lillIIlI + " " + lIiIliil);
        } else console.log(lillIIlI + " " + lIiIliil);
        break;
      case "getUserInfo":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.result && i1lI11I.result === true) {
            if (i1lI11I.data && typeof i1lI11I.data.yunMidImageUrl != "undefined") $.attrTouXiang = i1lI11I.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else i1lI11I.errorMessage ? console.log(lillIIlI + " " + (i1lI11I.errorMessage || "")) : console.log(lillIIlI + " " + lIiIliil);
        } else console.log(lillIIlI + " " + lIiIliil);
        break;
      case "activityContent":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.result && i1lI11I.result === true) {
            $.endTime = i1lI11I.data.endTime || i1lI11I.data.activityVo && i1lI11I.data.activityVo.endTime || i1lI11I.data.activity.endTime || 0;
            $.hasEnd = i1lI11I.data.hasEnd || false;
            $.score = i1lI11I.data.score || 0;
            $.settings = i1lI11I.data.openCardData.settings || [];
            $.assistStatus = i1lI11I.data.assistStatus || 0;
            $.followShop = i1lI11I.data.taskData.followSku.allStatus || false;
            $.visitSkulist = i1lI11I.data.taskData.toShop.allStatus || false;
            $.addSkulist = i1lI11I.data.taskData.addSku.settings || [];
            $.addSku = i1lI11I.data.taskData.addSku.allStatus || false;
            $.actorUuid = i1lI11I.data.actorUuid || 0;
          } else i1lI11I.errorMessage ? console.log(lillIIlI + " " + (i1lI11I.errorMessage || "")) : console.log(lillIIlI + " " + lIiIliil);
        } else console.log(lillIIlI + " " + lIiIliil);
        break;
      case "followShop":
      case "addSku":
      case "toShoplist":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.result && i1lI11I.result === true) console.log("任务完成，获得分值：" + i1lI11I.data.addScore);else i1lI11I.errorMessage ? console.log("" + (i1lI11I.errorMessage || "")) : console.log("" + lIiIliil);
        } else console.log(lillIIlI + " " + lIiIliil);
        break;
      case "checkOpenCard":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.result && i1lI11I.result === true) {
            let ii1liI1I = i1lI11I.data.openInfo || [];
            $.openList = [...ii1liI1I];
            $.allOpenCard = i1lI11I.data.allOpenCard || i1lI11I.data.isOpenCardStatus || false;
            if (i1lI11I.data.beans || i1lI11I.data.addBeanNum) console.log("开卡获得:" + (i1lI11I.data.beans || i1lI11I.data.addBeanNum) + "豆");
          } else i1lI11I.errorMessage ? console.log(lillIIlI + " " + (i1lI11I.errorMessage || "")) : console.log(lillIIlI + " " + lIiIliil);
        } else console.log(lillIIlI + " " + lIiIliil);
        break;
      case "draw":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.result && i1lI11I.result === true) {
            if (i1lI11I.data.drawOk === true) {
              console.log("获得：" + i1lI11I.data.name);
            } else console.log("什么也没有~");
          } else i1lI11I.errorMessage ? console.log("" + (i1lI11I.errorMessage || "")) : console.log("" + lIiIliil);
        } else console.log("" + lIiIliil);
        break;
      case "邀请":
      case "助力":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.data.status == 200) {
            if (lillIIlI == "助力") {
              console.log("助力成功");
            } else $.yaoqing = true;
          } else {
            if (i1lI11I.data.status == 105) console.log("已经助力过");else {
              if (i1lI11I.data.status == 104) console.log("已经助力其他人");else {
                if (i1lI11I.data.status == 101) {} else console.log(lIiIliil);
              }
            }
          }
        } else console.log(lillIIlI + " " + lIiIliil);
      case "getDrawRecordHasCoupon":
        if (typeof i1lI11I == "object") {
          if (i1lI11I.result && i1lI11I.result === true) {
            console.log("我的奖品：");
            for (let ii11iIIi in i1lI11I.data.recordList) {
              let IIi1IllI = i1lI11I.data.recordList[ii11iIIi];
              console.log("" + (IIi1IllI.infoType != 10 && IIi1IllI.value && IIi1IllI.value + ":" || "") + IIi1IllI.infoName);
            }
          } else i1lI11I.errorMessage ? console.log("" + (i1lI11I.errorMessage || "")) : console.log("" + lIiIliil);
        } else console.log("" + lIiIliil);
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getRankList":
        break;
      default:
        console.log(lillIIlI + "-> " + lIiIliil);
    }
    typeof i1lI11I == "object" && i1lI11I.errorMessage && i1lI11I.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IIil) {
    console.log(IIil);
  }
}
function llI11li(I1iliiIl, I1i111li, illIIII = "POST") {
  let i1i11lIl = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": I1ll1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return I1iliiIl.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (i1i11lIl.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, i1i11lIl.Cookie = "" + (l1lI1il1 && l1lI1il1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + l1lliI11), {
    "url": I1iliiIl,
    "method": illIIII,
    "headers": i1i11lIl,
    "body": I1i111li,
    "timeout": 30000
  };
}
function l1iliI1() {
  return new Promise(i11Iii1 => {
    let li1Iiil1 = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(li1Iiil1, async (lI11lill, lI1liI, Il1iI1i1) => {
      try {
        if (lI11lill) {
          lI1liI && typeof lI1liI.statusCode != "undefined" && lI1liI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(lI11lill));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Ii1Il1i1 = Il1iI1i1.match(/(活动已经结束)/) && Il1iI1i1.match(/(活动已经结束)/)[1] || "";
          Ii1Il1i1 && ($.activityEnd = true, console.log("活动已结束"));
          lIIiII1(lI1liI);
        }
      } catch (i11liii) {
        $.logErr(i11liii, lI1liI);
      } finally {
        i11Iii1();
      }
    });
  });
}
function lIIiII1(lli11) {
  if (lli11) {
    if (lli11.headers["set-cookie"]) {
      I1ll1l = originCookie + ";";
      for (let lIil1ili of lli11.headers["set-cookie"]) {
        ll1iIII[lIil1ili.split(";")[0].substr(0, lIil1ili.split(";")[0].indexOf("="))] = lIil1ili.split(";")[0].substr(lIil1ili.split(";")[0].indexOf("=") + 1);
      }
      for (const IiiI1iIi of Object.keys(ll1iIII)) {
        I1ll1l += IiiI1iIi + "=" + ll1iIII[IiiI1iIi] + ";";
      }
      l1lliI11 = I1ll1l;
    }
  }
}
function IiiIllIl(iIlI) {
  return new Promise(iIlli1Ii => {
    const iI1iI1 = {
      "url": iIlI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iI1iI1, async (IlIlI1lI, IIiIIIIl, Iiii1li1) => {
      try {
        if (IlIlI1lI) $.log(IlIlI1lI);else {
          if (Iiii1li1) Iiii1li1 = JSON.parse(Iiii1li1);
        }
      } catch (l1lIIi11) {
        $.logErr(l1lIIi11, IIiIIIIl);
        Iiii1li1 = null;
      } finally {
        iIlli1Ii(Iiii1li1);
      }
    });
  });
}
async function i1I11liI() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + iliii111(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function iliii111(I1i1lIii) {
  I1i1lIii = I1i1lIii || 32;
  let liIiIlli = "abcdef0123456789",
    iiliIl1I = liIiIlli.length,
    lIillill = "";
  for (i = 0; i < I1i1lIii; i++) lIillill += liIiIlli.charAt(Math.floor(Math.random() * iiliIl1I));
  return lIillill;
}
function lIIiI11i(iiliii11, lII11iii) {
  return Math.floor(Math.random() * (lII11iii - iiliii11)) + iiliii11;
}
function iI1ili11(iI1Ii1i1) {
  if (typeof iI1Ii1i1 == "string") try {
    return JSON.parse(iI1Ii1i1);
  } catch (i1l1lIII) {
    return console.log(i1l1lIII), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }