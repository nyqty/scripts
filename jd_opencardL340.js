/*
10.27-11.17 嗨购狂欢节 惊喜享不停
新增开卡脚本，一次性脚本



第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 10.27-11.17 嗨购狂欢节 惊喜享不停]

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#10.27-11.17 嗨购狂欢节 惊喜享不停
1 1 1 1 * jd_opencardL340.js, tag=10.27-11.17 嗨购狂欢节 惊喜享不停, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('10.27-11.17 嗨购狂欢节 惊喜享不停');

const ilI1i1I1 = $.isNode() ? require("./jdCookie.js") : "",
  ll1li1l1 = require("./function/krgetToken"),
  I1illll1 = require("./function/krh5st");
let i1llilIl = "https://lzdz-isv.isvjcloud.com",
  i1lllili = {},
  lI1iIill = [],
  l1iI = "";
if ($.isNode()) {
  Object.keys(ilI1i1I1).forEach(liI11Iii => {
    lI1iIill.push(ilI1i1I1[liI11Iii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  lI1iIill = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1llIli1($.getdata("CookiesJD") || "[]").map(llII1ili => llII1ili.cookie)].filter(lI1Ii11l => !!lI1Ii11l);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IIIil1l1 = "",
  ilIil1lI = "";
!(async () => {
  if (!lI1iIill[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await I11l1llI("http://code.kingran.cf/340.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[iiIliI1I(0, authorCodeList.length)];
  } else {
    let i11l1II = ["8952b2acf7ad41e6aeec0fb7cbd37220"];
    $.authorCode = i11l1II[iiIliI1I(0, i11l1II.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "90523102701";
  $.shareUuid = $.authorCode;
  console.log("入口:\nhttps://lzdz-isv.isvjcloud.com/dingzhi/bd/common/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid);
  for (let ii1iIil = 0; ii1iIil < lI1iIill.length; ii1iIil++) {
    l1iI = lI1iIill[ii1iIil];
    originCookie = lI1iIill[ii1iIil];
    if (l1iI) {
      $.UserName = decodeURIComponent(l1iI.match(/pt_pin=([^; ]+)(?=;?)/) && l1iI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ii1iIil + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await llIliII1();
      await i1Ii11I();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.outFlag) {
    let I1IiIlll = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I1IiIlll);
    if ($.isNode()) {
      await notify.sendNotify("" + $.name, "" + I1IiIlll);
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(ili11ll => $.logErr(ili11ll)).finally(() => $.done());
async function i1Ii11I() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    IIIil1l1 = "";
    $.Token = "";
    $.Pin = "";
    let ilIl11ii = false;
    $.Token = await ll1li1l1(l1iI, i1llilIl);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await i1iiII1l();
    if (ilIil1lI == "") {
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
    await iI1i1ill("getSimpleActInfoVo");
    await iI1i1ill("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await iI1i1ill("accessLogWithAD");
    await iI1i1ill("getUserInfo");
    await iI1i1ill("activityContent");
    await $.wait(1000);
    $.needOpencardList = [];
    await iI1i1ill("myinfo");
    if ($.hotFlag) {
      return;
    }
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    $.allOpenCard = $.openCardStatus == 3 || $.openCardStatus == 0 ? true : false;
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (let lilil1ll = 0; lilil1ll < $.needOpencardList.length; lilil1ll++) {
        $.openCard = false;
        ilIl11ii = true;
        $.shopactivityId = "";
        $.joinVenderId = $.needOpencardList[lilil1ll];
        await IIIiiiiI();
        for (let illl1ilI = 0; illl1ilI < Array(2).length; illl1ilI++) {
          if (illl1ilI > 0) {
            console.log("第" + illl1ilI + "次 重新开卡");
          }
          await li1i1II();
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
            break;
          }
        }
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
          console.log("💔 可能是开卡黑号,跳过运行");
          break;
        }
        await iI1i1ill("activityContent");
        await $.wait(1000);
      }
    } else {
      console.log("已全部开卡");
    }
    for (let Ii1lil1 = 0; Ii1lil1 < $.renwulists.length; Ii1lil1++) {
      $.missionType = $.renwulists[Ii1lil1].taskid;
      switch ($.missionType) {
        case "order":
        case "joinvip":
        case "coupon":
        case "share2help":
          break;
        default:
          {
            let iiIIilli = $.renwulists[Ii1lil1]?.["params"]?.["includes"](",") || [];
            for (let IiIIIilI = $.renwulists[Ii1lil1].curNum; IiIIIilI < $.renwulists[Ii1lil1].maxNeed; IiIIIilI++) {
              $.param = iiIIilli.length ? iiIIilli.pop() : "";
              $.taskrw = $.renwulists[Ii1lil1].taskname || $.renwulists[Ii1lil1].taskid;
              $.missionType = $.renwulists[Ii1lil1].taskid;
              await iI1i1ill("doTask");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
            break;
          }
      }
    }
    await iI1i1ill("助力");
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.runFalag = true;
    let iIll1II1 = parseInt($.score / 100);
    for (m = 1; iIll1II1--; m++) {
      console.log("进行第" + m + "次抽奖");
      await iI1i1ill("draw");
      if ($.runFalag == false) {
        break;
      }
      if (Number(iIll1II1) <= 0) {
        break;
      }
      if (m >= 2) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
    await iI1i1ill("friendList");
    console.log($.actorUuid);
    console.log("当前助力:" + $.shareUuid);
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    if (ilIl11ii) {
      await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
    }
    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
    }
  } catch (i1i11li1) {
    console.log(i1i11li1);
  }
}
async function iI1i1ill(iliI1Iii) {
  if ($.outFlag) {
    return;
  }
  let iilii1l1 = "https://lzdz-isv.isvjcloud.com",
    I111iI1 = "",
    Ii1lil1I = "POST";
  switch (iliI1Iii) {
    case "getSimpleActInfoVo":
      url = iilii1l1 + "/dz/common/getSimpleActInfoVo";
      I111iI1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = iilii1l1 + "/dingzhi/bd/common/getMyPing";
      I111iI1 = "userId=" + ($.shopId || $.venderId || "") + "&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = iilii1l1 + "/common/accessLogWithAD";
      let illIlli = iilii1l1 + "/dingzhi/bd/common/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I111iI1 = "venderId=" + ($.shopId || $.venderId || "") + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(illIlli) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = iilii1l1 + "/wxActionCommon/getUserInfo";
      I111iI1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iilii1l1 + "/dingzhi/union/haigo2311/activityContent";
      I111iI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "myinfo":
      url = iilii1l1 + "/dingzhi/union/haigo2311/myInfo?_=" + Date.now();
      I111iI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uid=" + $.actorUuid;
      break;
    case "doTask":
      url = iilii1l1 + "/dingzhi/union/haigo2311/doTask?_=" + Date.now();
      I111iI1 = "taskId=" + $.missionType + "&param=" + $.param + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uid=" + $.actorUuid;
      break;
    case "draw":
      url = iilii1l1 + "/dingzhi/union/haigo2311/draw?_=" + Date.now();
      I111iI1 = "drawId=0&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uid=" + $.actorUuid;
      break;
    case "friendList":
      url = iilii1l1 + "/dingzhi/bd/common/friendList?_=" + Date.now();
      I111iI1 = "uid=" + $.actorUuid + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&page=1&pageSize=100&getNum=true";
      break;
    case "助力":
      url = iilii1l1 + "/dingzhi/union/haigo2311/helpFriend?_=" + Date.now();
      I111iI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid + "&uid=" + $.actorUuid;
      break;
    default:
      console.log("错误" + iliI1Iii);
  }
  await $.wait(500);
  let ii11Ii1l = lIIiil1I(url, I111iI1, Ii1lil1I);
  return new Promise(async lliilliI => {
    $.post(ii11Ii1l, (liIlIl1i, ll1iilli, il1ill11) => {
      try {
        Iiii11ii(ll1iilli);
        liIlIl1i ? (ll1iilli && typeof ll1iilli.statusCode != "undefined" && ll1iilli.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(liIlIl1i, liIlIl1i)), console.log("API请求失败，请检查网路重试")) : IlII1i(iliI1Iii, il1ill11);
      } catch (I1iiIlII) {
        console.log(I1iiIlII, ll1iilli);
      } finally {
        lliilliI();
      }
    });
  });
}
async function IlII1i(IIli1il1, IlIIi11I) {
  let iIiII1il = "";
  try {
    (IIli1il1 != "accessLogWithAD" || IIli1il1 != "drawContent") && IlIIi11I && (iIiII1il = JSON.parse(IlIIi11I));
  } catch (llllliI1) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (IIli1il1) {
      case "getSimpleActInfoVo":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            if (typeof iIiII1il.data.shopId != "undefined") {
              $.shopId = iIiII1il.data.shopId;
            }
            if (typeof iIiII1il.data.venderId != "undefined") {
              $.venderId = iIiII1il.data.venderId;
            }
          } else {
            iIiII1il.errorMessage ? console.log("" + (iIiII1il.errorMessage || "")) : console.log("" + IlIIi11I);
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "getMyPing":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            if (iIiII1il.data && typeof iIiII1il.data.secretPin != "undefined") {
              $.Pin = iIiII1il.data.secretPin;
            }
            if (iIiII1il.data && typeof iIiII1il.data.nickname != "undefined") {
              $.nickname = iIiII1il.data.nickname;
            }
          } else {
            if (iIiII1il.errorMessage) {
              console.log("" + (iIiII1il.errorMessage || ""));
            } else {
              console.log("" + IlIIi11I);
            }
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "getUserInfo":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            if (iIiII1il.data && typeof iIiII1il.data.yunMidImageUrl != "undefined") {
              $.attrTouXiang = iIiII1il.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            }
          } else {
            if (iIiII1il.errorMessage) {
              console.log("" + (iIiII1il.errorMessage || ""));
            } else {
              console.log("" + IlIIi11I);
            }
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "friendList":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            $.friendNum = iIiII1il.data.friendNum;
            console.log("当前账号已邀请:" + $.friendNum + " 人");
          } else {
            iIiII1il.errorMessage ? console.log("" + (iIiII1il.errorMessage || "")) : console.log("" + IlIIi11I);
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "draw":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            iIiII1il?.["data"]?.["prize"] ? console.log("抽奖获得:" + iIiII1il?.["data"]?.["prize"]) : console.log("抽奖获得: 空气");
          } else {
            iIiII1il.errorMessage ? console.log("" + (iIiII1il.errorMessage || "")) : console.log("" + IlIIi11I);
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "myinfo":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            $.openList = iIiII1il.data.venderList || [];
            $.renwulists = iIiII1il.data.task || [];
            $.drawScore = iIiII1il.data.drawScore || 0;
            $.score = iIiII1il.data.score || 0;
            $.vipList = iIiII1il.data.vip.map(li1IIlIi => li1IIlIi.venderId);
            $.needOpencardList = iIiII1il.data.venderList.map(iIllIi1i => iIllIi1i.venderId).filter(iiiIiI => !$.vipList.includes(iiiIiI));
          } else {
            iIiII1il.errorMessage ? console.log("" + (iIiII1il.errorMessage || "")) : console.log("" + IlIIi11I);
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "activityContent":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            $.actorUuid = iIiII1il.data.uid || "";
            $.followShop = iIiII1il.data.followstatus || 0;
            $.isGameEnd = iIiII1il.data.isGameEnd || false;
            $.newVip = iIiII1il.data.newVip || false;
            $.openCardStatus = iIiII1il.data.openCardStatus || 0;
            $.helpFriendStatus = iIiII1il.data.helpFriendStatus || 0;
          } else {
            iIiII1il.errorMessage ? console.log("" + (iIiII1il.errorMessage || "")) : console.log("" + IlIIi11I);
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "doTask":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            console.log("完成了[" + $.taskrw + "]任务，获得分值:" + (iIiII1il.data.score || 0));
          } else {
            if (iIiII1il.errorMessage) {
              if (!(iIiII1il.errorMessage == "任务已完成")) {
                console.log("" + (iIiII1il.errorMessage || ""));
              }
            } else {
              console.log("" + IlIIi11I);
            }
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "助力":
        if (typeof iIiII1il == "object") {
          if (iIiII1il.result && iIiII1il.result === true) {
            console.log("" + iIiII1il.data.helpFriendMsg);
          } else {
            iIiII1il.errorMessage ? console.log("" + (iIiII1il.errorMessage || "")) : console.log("" + IlIIi11I);
          }
        } else {
          console.log("" + IlIIi11I);
        }
        break;
      case "accessLogWithAD":
        break;
      default:
        console.log(IIli1il1 + "-> " + IlIIi11I);
    }
    if (typeof iIiII1il == "object") {
      if (iIiII1il.errorMessage) {
        iIiII1il.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
      }
    }
  } catch (i111I1l1) {
    console.log(i111I1l1);
  }
}
function lIIiil1I(liIIl, iI1l1lI1, Il1IIili = "POST") {
  let I1IliIi1 = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: l1iI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  liIIl.indexOf("https://lzdz-isv.isvjcloud.com") > -1 && (I1IliIi1.Referer = "https://lzdz-isv.isvjcloud.com/dingzhi/bd/common/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, I1IliIi1.Cookie = "" + (IIIil1l1 && IIIil1l1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + ilIil1lI);
  return {
    url: liIIl,
    method: Il1IIili,
    headers: I1IliIi1,
    body: iI1l1lI1,
    timeout: 30000
  };
}
function i1iiII1l() {
  return new Promise(lIl11ll1 => {
    let I1lIlIl = {
      url: "https://lzdz-isv.isvjcloud.com/dingzhi/bd/common/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      followRedirect: false,
      headers: {
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(I1lIlIl, async (ll1I1lI1, iIl11I11, Il1iil11) => {
      try {
        if (ll1I1lI1) {
          iIl11I11 && typeof iIl11I11.statusCode != "undefined" && iIl11I11.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(ll1I1lI1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let I1i11iIi = Il1iil11.match(/(活动已经结束)/) && Il1iil11.match(/(活动已经结束)/)[1] || "";
          I1i11iIi && ($.activityEnd = true, console.log("活动已结束"));
          Iiii11ii(iIl11I11);
        }
      } catch (i1l1I1ii) {
        $.logErr(i1l1I1ii, iIl11I11);
      } finally {
        lIl11ll1();
      }
    });
  });
}
function Iiii11ii(llIiI) {
  if (llIiI) {
    if (llIiI.headers["set-cookie"]) {
      l1iI = originCookie + ";";
      for (let Iill1IIi of llIiI.headers["set-cookie"]) {
        i1lllili[Iill1IIi.split(";")[0].substr(0, Iill1IIi.split(";")[0].indexOf("="))] = Iill1IIi.split(";")[0].substr(Iill1IIi.split(";")[0].indexOf("=") + 1);
      }
      for (const lliII11i of Object.keys(i1lllili)) {
        l1iI += lliII11i + "=" + i1lllili[lliII11i] + ";";
      }
      ilIil1lI = l1iI;
    }
  }
}
async function llIliII1() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + i1lI1ill(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function i1lI1ill(IiiI1I11) {
  IiiI1I11 = IiiI1I11 || 32;
  let IiIl1Iil = "abcdef0123456789",
    IilI1il1 = IiIl1Iil.length,
    iI1illll = "";
  for (i = 0; i < IiiI1I11; i++) {
    iI1illll += IiIl1Iil.charAt(Math.floor(Math.random() * IilI1il1));
  }
  return iI1illll;
}
function iiIliI1I(ilI1ll, il1IiI) {
  return Math.floor(Math.random() * (il1IiI - ilI1ll)) + ilI1ll;
}
function I1llIli1(IiiiI1iI) {
  if (typeof IiiiI1iI == "string") {
    try {
      return JSON.parse(IiiiI1iI);
    } catch (l11iliIl) {
      console.log(l11iliIl);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function li1i1II() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async Ill1I1ii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Iiiil1ii = "";
    if ($.shopactivityId) {
      Iiiil1ii = ",\"activityId\":" + $.shopactivityId;
    }
    const iI1lI1ll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Iiiil1ii + ",\"channel\":406}",
      i1Ii1il = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(iI1lI1ll)
      },
      ilIii1II = await I1illll1("27004", i1Ii1il),
      llIl1lIl = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + iI1lI1ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ilIii1II),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: l1iI
        }
      };
    $.get(llIl1lIl, async (IlIiI111, I1lllliI, I111II1I) => {
      try {
        if (IlIiI111) {
          console.log(IlIiI111);
        } else {
          const i1iiI = JSON.parse(I111II1I);
          if (typeof i1iiI === "object") {
            if (i1iiI.success === true) {
              console.log(i1iiI.message);
              $.errorJoinShop = i1iiI.message;
              if (i1iiI.result && i1iiI.result.giftInfo) {
                for (let l11Iiii1 of i1iiI.result.giftInfo.giftList) {
                  console.log("入会获得：" + l11Iiii1.discountString + l11Iiii1.prizeName + l11Iiii1.secondLineDesc);
                }
              }
            } else {
              typeof i1iiI == "object" && i1iiI.message ? ($.errorJoinShop = i1iiI.message, console.log("" + (i1iiI.message || ""))) : console.log(I111II1I);
            }
          } else {
            console.log(I111II1I);
          }
        }
      } catch (iIl1Il) {
        $.logErr(iIl1Il, I1lllliI);
      } finally {
        Ill1I1ii();
      }
    });
  });
}
async function IIIiiiiI() {
  return new Promise(async l1IiiI1 => {
    let lill1lIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const ll11iIll = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(lill1lIi)
      },
      I1111lii = await I1illll1("27004", ll11iIll),
      i1iiiiIl = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + lill1lIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1111lii),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: l1iI
        }
      };
    $.get(i1iiiiIl, async (liII1II, I11iI1Il, ilIll1) => {
      try {
        if (liII1II) {
          console.log(liII1II);
        } else {
          const Ililiil1 = JSON.parse(ilIll1);
          typeof Ililiil1 === "object" ? Ililiil1.success === true && (console.log("去加入：" + (Ililiil1.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = Ililiil1.result.interestsRuleList && Ililiil1.result.interestsRuleList[0] && Ililiil1.result.interestsRuleList[0].interestsInfo && Ililiil1.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = Ililiil1.result.userInfo.openCardStatus) : console.log(ilIll1);
        }
      } catch (Ii1IIIii) {
        $.logErr(Ii1IIIii, I11iI1Il);
      } finally {
        l1IiiI1();
      }
    });
  });
}
function I11l1llI(IIlIIiiI) {
  return new Promise(liII1I => {
    const iI1111lI = {
      url: "" + IIlIIiiI,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iI1111lI, async (iilll1I1, l1ilIIi1, iIill1l) => {
      try {
        if (!iilll1I1) {
          iIill1l ? iIill1l = JSON.parse(iIill1l) : console.log("未获取到数据,请重新运行");
        }
      } catch (lil1lil) {
        $.logErr(lil1lil, l1ilIIi1);
        iIill1l = null;
      } finally {
        liII1I(iIill1l);
      }
    });
  });
}
function iiIliI1I(IIlIIl1I, Illl1iIl) {
  return Math.floor(Math.random() * (Illl1iIl - IIlIIl1I)) + IIlIIl1I;
}
