/*
安佳做任务开盲盒，赢好礼

变量：jd_AJMH_id // 活动id   7月id：export jd_AJMH_id="dz61340bc3efcd43e2b986c8be"

做任务，邀请，抽奖


请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#安佳做任务开盲盒，赢好礼
11 11 11 11 * jd_AJMH.js, tag=安佳做任务开盲盒，赢好礼, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('安佳做任务开盲盒，赢好礼');
const IIll1I = $.isNode() ? require("./jdCookie.js") : "",
  liii1I = $.isNode() ? require("./sendNotify") : "",
  lI1iIi = require("./function/krgetToken");
let iIIIii = "https://lzdz1-isv.isvjcloud.com",
  li11ii = process.env.jd_AJMH_id ? process.env.jd_AJMH_id : "",
  I1iiIi = [],
  li1i1 = "";
if ($.isNode()) {
  Object.keys(IIll1I).forEach(l1I1lI => {
    I1iiIi.push(IIll1I[l1I1lI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1iiIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIll1l($.getdata("CookiesJD") || "[]").map(iIIIl1 => iIIIl1.cookie)].filter(li11iI => !!li11iI);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I1iiIl = "",
  liliII = "",
  lI1iIl = {};
!(async () => {
  if (!li11ii) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  if (!I1iiIi[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = li11ii;
  console.log("每期活动自行去 安佳 店铺查看，有水无水自测");
  console.log("变量：export jd_AJMH_id=\"活动ID\"");
  console.log("入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId);
  console.log("\n规则:\n1.每天完成任务共计：50积分。\n2.邀请一名好友50积分，不上限。\n3.每300积分可以开盲盒一次，每天限制开三次，每天限制中奖一次。");
  for (let Ii1lIi = 0; Ii1lIi < I1iiIi.length; Ii1lIi++) {
    li1i1 = I1iiIi[Ii1lIi];
    originCookie = I1iiIi[Ii1lIi];
    if (li1i1) {
      $.UserName = decodeURIComponent(li1i1.match(/pt_pin=([^; ]+)(?=;?)/) && li1i1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Ii1lIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await liii1i();
      await iIiiII();
      await $.wait(3000);
      if (Ii1lIi == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let ll1lII = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + ll1lII);
    if ($.isNode()) await liii1I.sendNotify("" + $.name, "" + ll1lII);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(iIIIiI => $.logErr(iIIIiI)).finally(() => $.done());
async function iIiiII() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    I1iiIl = "";
    $.Token = "";
    $.Pin = "";
    let ll1IiI = false;
    $.Token = await lI1iIi(li1i1, iIIIii);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await iIIIlI();
    if (liliII == "") {
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
    await ilIll1("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await ilIll1("accessLogWithAD");
    await ilIll1("getUserInfo");
    await ilIll1("activityContent");
    await ilIll1("drawContent");
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
    !$.followShop && !$.outFlag && (ll1IiI = true, await ilIll1("followShop"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && (ll1IiI = true, await ilIll1("addSku"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("逛一逛: " + $.visitSkulist);
    !$.visitSkulist && !$.outFlag && (ll1IiI = true, await ilIll1("toShoplist"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    await ilIll1("activityContent");
    console.log("\n目前分值为：" + $.score + "\n");
    $.runFalag = true;
    let li1li = parseInt($.score / 300);
    for (m = 1; li1li--; m++) {
      console.log("第" + m + "次抽奖");
      await ilIll1("draw");
      if ($.runFalag == false) break;
      if (Number(li1li) <= 0) break;
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
    console.log("当前助力:" + ($.shareUuid || "未获取到助力邀请码"));
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
  } catch (i1IiI) {
    console.log(i1IiI);
  }
}
async function ilIll1(lIllil) {
  if ($.outFlag) return;
  let I111 = "https://lzdz1-isv.isvjcloud.com",
    I1I11l = "",
    I1I11i = "POST";
  switch (lIllil) {
    case "getSimpleActInfoVo":
      url = I111 + "/dz/common/getSimpleActInfoVo";
      I1I11l = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = I111 + "/customer/getMyPing";
      I1I11l = "userId=1000014486&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = I111 + "/common/accessLogWithAD";
      let lIllli = I111 + "/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I1I11l = "venderId=1000014486&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lIllli) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = I111 + "/wxActionCommon/getUserInfo";
      I1I11l = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = I111 + "/dingzhi/box618/activityContent";
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = I111 + "/dingzhi/taskact/common/drawContent";
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = I111 + "/dingzhi/box618/startDraw";
      I1I11l = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "toShoplist":
      url = I111 + "/dingzhi/box618/saveTask";
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=14&taskValue=1000014486";
      break;
    case "addCart":
    case "browseGoods":
      url = I111 + "/dingzhi/opencard/" + lIllil;
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (lIllil == "browseGoods") I1I11l += "&value=" + $.visitSkuValue;
      break;
    case "邀请":
    case "助力":
      lIllil == "助力" ? url = I111 + "/dingzhi/linkgame/assist" : url = I111 + "/dingzhi/linkgame/assist/status";
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid;
      break;
    case "followShop":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = I111 + "/dingzhi/box618/saveTask";
      let lIllll = "",
        I11I = "";
      if (lIllil == "followShop") {
        lIllll = 22;
        I11I = "";
      } else {
        if (lIllil == "visitSku") {
          lIllll = 5;
          I11I = $.visitSkuValue || 5;
        } else {
          if (lIllil == "toShop") {
            lIllll = 14;
            I11I = $.visitSkuValue || 1000014486;
          } else lIllil == "addSku" && (lIllll = 21, I11I = "");
        }
      }
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + lIllll + "&taskValue=" + $.visitSkuValue;
      break;
    case "getDrawRecordHasCoupon":
      url = I111 + "/dingzhi/taskact/common/getDrawRecordHasCoupon";
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    default:
      console.log("错误" + lIllil);
  }
  let III1ll = I1IIii(url, I1I11l, I1I11i);
  return new Promise(async i1IiIl => {
    $.post(III1ll, (iIIlIl, iIIlIi, iilIll) => {
      try {
        li11i1(iIIlIi);
        iIIlIl ? (iIIlIi && typeof iIIlIi.statusCode != "undefined" && iIIlIi.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(iIIlIl, iIIlIl)), console.log(lIllil + " API请求失败，请检查网路重试")) : I1IIil(lIllil, iilIll);
      } catch (i111I) {
        console.log(i111I, iIIlIi);
      } finally {
        i1IiIl();
      }
    });
  });
}
async function I1IIil(lIiIl1, iilIl1) {
  let III1i1 = "";
  try {
    (lIiIl1 != "accessLogWithAD" || lIiIl1 != "drawContent") && iilIl1 && (III1i1 = JSON.parse(iilIl1));
  } catch (l1iiil) {
    console.log(lIiIl1 + " 执行任务异常");
    console.log(iilIl1);
    $.runFalag = false;
  }
  try {
    switch (lIiIl1) {
      case "getSimpleActInfoVo":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            if (typeof III1i1.data.shopId != "undefined") $.shopId = III1i1.data.shopId;
            if (typeof III1i1.data.venderId != "undefined") $.venderId = III1i1.data.venderId;
          } else III1i1.errorMessage ? console.log(lIiIl1 + " " + (III1i1.errorMessage || "")) : console.log(lIiIl1 + " " + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);
        break;
      case "getMyPing":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            if (III1i1.data && typeof III1i1.data.secretPin != "undefined") $.Pin = III1i1.data.secretPin;
            if (III1i1.data && typeof III1i1.data.nickname != "undefined") $.nickname = III1i1.data.nickname;
          } else III1i1.errorMessage ? console.log(lIiIl1 + " " + (III1i1.errorMessage || "")) : console.log(lIiIl1 + " " + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);
        break;
      case "getUserInfo":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            if (III1i1.data && typeof III1i1.data.yunMidImageUrl != "undefined") $.attrTouXiang = III1i1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else III1i1.errorMessage ? console.log(lIiIl1 + " " + (III1i1.errorMessage || "")) : console.log(lIiIl1 + " " + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);
        break;
      case "activityContent":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            $.endTime = III1i1.data.endTime || III1i1.data.activityVo && III1i1.data.activityVo.endTime || III1i1.data.activity.endTime || 0;
            $.hasEnd = III1i1.data.hasEnd || false;
            $.score = III1i1.data.score || 0;
            $.settings = III1i1.data.openCardData.settings || [];
            $.assistStatus = III1i1.data.assistStatus || 0;
            $.followShop = III1i1.data.taskData.followSku.allStatus || false;
            $.visitSkulist = III1i1.data.taskData.toShop.allStatus || false;
            $.addSkulist = III1i1.data.taskData.addSku.settings || [];
            $.addSku = III1i1.data.taskData.addSku.allStatus || false;
            $.actorUuid = III1i1.data.actorUuid || 0;
          } else {
            if (III1i1.errorMessage) console.log(lIiIl1 + " " + (III1i1.errorMessage || ""));else {
              console.log(lIiIl1 + " " + iilIl1);
            }
          }
        } else {
          console.log(lIiIl1 + " " + iilIl1);
        }
        break;
      case "followShop":
      case "addSku":
      case "toShoplist":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            console.log("任务完成，获得分值：" + III1i1.data.addScore);
          } else III1i1.errorMessage ? console.log("" + (III1i1.errorMessage || "")) : console.log("" + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);
        break;
      case "checkOpenCard":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            let illIIi = III1i1.data.openInfo || [];
            $.openList = [...illIIi];
            $.allOpenCard = III1i1.data.allOpenCard || III1i1.data.isOpenCardStatus || false;
            if (III1i1.data.beans || III1i1.data.addBeanNum) console.log("开卡获得:" + (III1i1.data.beans || III1i1.data.addBeanNum) + "豆");
          } else III1i1.errorMessage ? console.log(lIiIl1 + " " + (III1i1.errorMessage || "")) : console.log(lIiIl1 + " " + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);
        break;
      case "draw":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) III1i1.data.drawOk === true ? console.log("获得：" + III1i1.data.name) : console.log("什么也没有~");else III1i1.errorMessage ? console.log("" + (III1i1.errorMessage || "")) : console.log("" + iilIl1);
        } else console.log("" + iilIl1);
        break;
      case "邀请":
      case "助力":
        if (typeof III1i1 == "object") {
          if (III1i1.data.status == 200) {
            if (lIiIl1 == "助力") console.log("助力成功");else {
              $.yaoqing = true;
            }
          } else {
            if (III1i1.data.status == 105) {
              console.log("已经助力过");
            } else {
              if (III1i1.data.status == 104) console.log("已经助力其他人");else {
                if (III1i1.data.status == 101) {} else console.log(iilIl1);
              }
            }
          }
        } else console.log(lIiIl1 + " " + iilIl1);
      case "getDrawRecordHasCoupon":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            console.log("我的奖品：");
            for (let IllII in III1i1.data.recordList) {
              let Ill1il = III1i1.data.recordList[IllII];
              console.log("" + (Ill1il.infoType != 10 && Ill1il.value && Ill1il.value + ":" || "") + Ill1il.infoName);
            }
          } else III1i1.errorMessage ? console.log("" + (III1i1.errorMessage || "")) : console.log("" + iilIl1);
        } else console.log("" + iilIl1);
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getRankList":
        break;
      default:
        console.log(lIiIl1 + "-> " + iilIl1);
    }
    if (typeof III1i1 == "object") {
      if (III1i1.errorMessage) {
        if (III1i1.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (i1Ii1I) {
    console.log(i1Ii1I);
  }
}
function I1IIii(llIiIl, I1i1i, lIi1II = "POST") {
  let IllI1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": li1i1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return llIiIl.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (IllI1.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, IllI1.Cookie = "" + (I1iiIl && I1iiIl || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + liliII), {
    "url": llIiIl,
    "method": lIi1II,
    "headers": IllI1,
    "body": I1i1i,
    "timeout": 30000
  };
}
function iIIIlI() {
  return new Promise(Iil1l => {
    let Iil1i = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(Iil1i, async (i1i1i1, iiiIli, IllIl) => {
      try {
        if (i1i1i1) {
          iiiIli && typeof iiiIli.statusCode != "undefined" && iiiIli.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(i1i1i1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IlIiI = IllIl.match(/(活动已经结束)/) && IllIl.match(/(活动已经结束)/)[1] || "";
          IlIiI && ($.activityEnd = true, console.log("活动已结束"));
          li11i1(iiiIli);
        }
      } catch (l1I1I) {
        $.logErr(l1I1I, iiiIli);
      } finally {
        Iil1l();
      }
    });
  });
}
function li11i1(iillil) {
  if (iillil) {
    if (iillil.headers["set-cookie"]) {
      li1i1 = originCookie + ";";
      for (let Il1ill of iillil.headers["set-cookie"]) {
        lI1iIl[Il1ill.split(";")[0].substr(0, Il1ill.split(";")[0].indexOf("="))] = Il1ill.split(";")[0].substr(Il1ill.split(";")[0].indexOf("=") + 1);
      }
      for (const Il1ili of Object.keys(lI1iIl)) {
        li1i1 += Il1ili + "=" + lI1iIl[Il1ili] + ";";
      }
      liliII = li1i1;
    }
  }
}
function II1l1(liIIII) {
  return new Promise(I111ii => {
    const I1liII = {
      "url": liIIII + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1liII, async (i1i1l1, iIii1i, IIil1i) => {
      try {
        if (i1i1l1) $.log(i1i1l1);else {
          if (IIil1i) IIil1i = JSON.parse(IIil1i);
        }
      } catch (IIllIl) {
        $.logErr(IIllIl, iIii1i);
        IIil1i = null;
      } finally {
        I111ii(IIil1i);
      }
    });
  });
}
async function liii1i() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + IIll1i(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function IIll1i(iIliII) {
  iIliII = iIliII || 32;
  let I1liI1 = "abcdef0123456789",
    I1ii11 = I1liI1.length,
    IlIil = "";
  for (i = 0; i < iIliII; i++) IlIil += I1liI1.charAt(Math.floor(Math.random() * I1ii11));
  return IlIil;
}
function lI1iII(iii11i, iii11l) {
  return Math.floor(Math.random() * (iii11l - iii11i)) + iii11i;
}
function IIll1l(lIl1i1) {
  if (typeof lIl1i1 == "string") {
    try {
      return JSON.parse(lIl1i1);
    } catch (IlIli) {
      return console.log(IlIli), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}