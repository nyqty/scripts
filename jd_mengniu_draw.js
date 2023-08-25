/*
蒙牛积分抽奖

抽奖本 99积分抽一次

变量：jd_mengniu_id // 活动id   8月id：export jd_mengniu_id="dzafc981cb4f499745f04ca689b1e5"
变量：opencard_draw // 抽奖次数   export opencard_draw="3"

————————————————
入口：[ 蒙牛积分抽奖 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#蒙牛积分抽奖
11 11 11 11 * jd_mengniu_draw.js, tag=蒙牛积分抽奖, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('蒙牛积分抽奖')
const lIilii = $.isNode() ? require("./jdCookie.js") : "",
  lIilil = $.isNode() ? require("./sendNotify") : "",
  lIl1ll = require("./function/krgetToken"),
  Ii1III = require("./function/krgetua"),
  ilIIi1 = require("./function/wxSavePrize");
let l111i = "https://lzdz1-isv.isvjcloud.com",
  l111l = process.env.jd_mengniu_id ? process.env.jd_mengniu_id : "",
  I1iilI = [],
  Ii1II1 = "";
if ($.isNode()) {
  Object.keys(lIilii).forEach(l1liii => {
    I1iilI.push(lIilii[l1liii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1iilI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1Iii1($.getdata("CookiesJD") || "[]").map(I1Ili1 => I1Ili1.cookie)].filter(l1liil => !!l1liil);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lilili = "",
  IliIli = "",
  lI1ilI = {};
!(async () => {
  if (!I1iilI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await Ili1I1("http://code.kingran.cf/mengniu.json");
  if (authorCodeList) {
    console.log("❖ 远程获取数据中...\n❖ 数据获取正常...\n");
    for (let i1Iiil = 0; i1Iiil < authorCodeList.length; i1Iiil++) {
      console.log("❖ 远程数据第[" + (i1Iiil + 1) + "]个变量: export jd_mengniu_id=\"" + authorCodeList[i1Iiil] + "\"");
    }
  } else {
    console.log("❖ 远程数据获取失败,请自行查找可用活动ID...\n");
  }
  if (!l111l) {
    console.log("\n请先通过环境变量,设置活动ID变量：export jd_mengniu_id='活动ID' 定义活动ID\n");
    return;
  }
  $.activityId = l111l;
  console.log("\n每期活动自行去 蒙牛 店铺查看，有水无水自测");
  for (let l1lIi = 0; l1lIi < I1iilI.length; l1lIi++) {
    Ii1II1 = I1iilI[l1lIi];
    originCookie = I1iilI[l1lIi];
    if (Ii1II1) {
      $.UserName = decodeURIComponent(Ii1II1.match(/pt_pin=([^; ]+)(?=;?)/) && Ii1II1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1lIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await Ii1III($.UserName);
      await IllliI();
      await $.wait(3000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let IIlI1l = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + IIlI1l);
    if ($.isNode()) await lIilil.sendNotify("" + $.name, "" + IIlI1l);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(IilIl => $.logErr(IilIl)).finally(() => $.done());
async function IllliI() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lilili = "";
    $.Token = "";
    $.Pin = "";
    $.activityType = 99;
    $.venderId = 1000014803;
    $.Raglan = false;
    $.Token = await lIl1ll(Ii1II1, l111i);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IilI1();
    if (IliIli == "") {
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
    await IliIll("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await IliIll("accessLogWithAD");
    await IliIll("getUserInfo");
    await IliIll("activityContent");
    await IliIll("drawContent");
    if ($.hotFlag) return;
    if ($.Raglan) {
      return;
    }
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    await $.wait(1000);
    await IliIll("activityContent");
    console.log("\n目前分值为：" + $.score + "\n");
    $.runFalag = true;
    let l1IiI = parseInt($.score / 99);
    for (m = 1; l1IiI--; m++) {
      console.log("第" + m + "次抽奖");
      await IliIll("draw");
      if ($.runFalag == false) break;
      if (Number(l1IiI) <= 0) break;
      if (m >= 3) {
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
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
  } catch (I1Ill1) {
    console.log(I1Ill1);
  }
}
async function IliIll(ili11) {
  if ($.outFlag) return;
  let llIIIl = "https://lzdz1-isv.isvjcloud.com",
    IIlI1I = "",
    llIIIi = "POST";
  switch (ili11) {
    case "getSimpleActInfoVo":
      url = llIIIl + "/dz/common/getSimpleActInfoVo";
      IIlI1I = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = llIIIl + "/customer/getMyCidPing";
      IIlI1I = "userId=1000014803&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = llIIIl + "/common/accessLogWithAD";
      let l1I1II = llIIIl + "/dingzhi/may/mengniu/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      IIlI1I = "venderId=1000014803&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1I1II) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = llIIIl + "/wxActionCommon/getUserInfo";
      IIlI1I = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = llIIIl + "/dingzhi/may/mengniu/activityContent";
      IIlI1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname);
      break;
    case "drawContent":
      url = llIIIl + "/dingzhi/taskact/common/drawContent";
      IIlI1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = llIIIl + "/dingzhi/may/mengniu/draw";
      IIlI1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + ili11);
  }
  let I1Ilil = lilill(url, IIlI1I, llIIIi);
  return new Promise(async iIIlil => {
    $.post(I1Ilil, (iII1Il, IIIliI, iII1Ii) => {
      try {
        l1lI1(IIIliI);
        iII1Il ? (IIIliI && typeof IIIliI.statusCode != "undefined" && IIIliI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(iII1Il, iII1Il)), console.log("API请求失败，请检查网路重试")) : iIiili(ili11, iII1Ii);
      } catch (IIIli1) {
        console.log(IIIli1, IIIliI);
      } finally {
        iIIlil();
      }
    });
  });
}
async function iIiili(I1lI11, I1I1Il) {
  let iIlI1I = "";
  try {
    (I1lI11 != "accessLogWithAD" || I1lI11 != "drawContent") && I1I1Il && (iIlI1I = JSON.parse(I1I1Il));
  } catch (iii1i) {
    console.log("执行任务异常");
    console.log(I1I1Il);
    $.runFalag = false;
  }
  try {
    switch (I1lI11) {
      case "getSimpleActInfoVo":
        if (typeof iIlI1I == "object") {
          if (iIlI1I.result && iIlI1I.result === true) {
            if (typeof iIlI1I.data.shopId != "undefined") $.shopId = iIlI1I.data.shopId;
            if (typeof iIlI1I.data.venderId != "undefined") $.venderId = iIlI1I.data.venderId;
          } else {
            if (iIlI1I.errorMessage) {
              console.log("" + (iIlI1I.errorMessage || ""));
            } else console.log("" + I1I1Il);
          }
        } else console.log("" + I1I1Il);
        break;
      case "getMyPing":
        if (typeof iIlI1I == "object") {
          if (iIlI1I.result && iIlI1I.result === true) {
            if (iIlI1I.data && typeof iIlI1I.data.secretPin != "undefined") $.Pin = iIlI1I.data.secretPin;
            if (iIlI1I.data && typeof iIlI1I.data.nickname != "undefined") $.nickname = iIlI1I.data.nickname;
          } else {
            if (iIlI1I.errorMessage) console.log("" + (iIlI1I.errorMessage || ""));else {
              console.log("" + I1I1Il);
            }
          }
        } else console.log("" + I1I1Il);
        break;
      case "getUserInfo":
        if (typeof iIlI1I == "object") {
          if (iIlI1I.result && iIlI1I.result === true) {
            if (iIlI1I.data && typeof iIlI1I.data.yunMidImageUrl != "undefined") $.attrTouXiang = iIlI1I.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else {
            if (iIlI1I.errorMessage) {
              console.log("" + (iIlI1I.errorMessage || ""));
            } else console.log("" + I1I1Il);
          }
        } else console.log("" + I1I1Il);
        break;
      case "activityContent":
        if (typeof iIlI1I == "object") {
          if (iIlI1I.result && iIlI1I.result === true) {
            $.endTime = iIlI1I.data.endTime || iIlI1I.data.activityVo && iIlI1I.data.activityVo.endTime || iIlI1I.data.activity.endTime || 0;
            $.hasEnd = iIlI1I.data.hasEnd || false;
            $.score = iIlI1I.data.score || 0;
            $.actorUuid = iIlI1I.data.actorUuid || 0;
          } else iIlI1I.errorMessage ? console.log("" + (iIlI1I.errorMessage || "")) : console.log("" + I1I1Il);
        } else console.log("" + I1I1Il);
        break;
      case "draw":
        if (typeof iIlI1I == "object") {
          if (iIlI1I.result && iIlI1I.result === true) {
            if (typeof iIlI1I.data == "object") {
              drawInfo = iIlI1I.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = iIlI1I.data.addressId;
                    prizeName = drawInfo.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                    let ilI1Il = await ilIIi1("https://lzdz1-isv.isvjcloud.com", Ii1II1, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    if (ilI1Il) {
                      $.isNode() && (await lIilil.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/may/mengniu/activity/activity?activityId=" + $.activityId));
                    } else {
                      if ($.isNode()) {
                        await lIilil.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/may/mengniu/activity/activity?activityId=" + $.activityId);
                      }
                    }
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + drawInfo.name + " 🎟️");
                    break;
                  case 13:
                    console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                    $.isNode() && (await lIilil.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/may/mengniu/activity/activity?activityId=" + $.activityId));
                    break;
                  case 16:
                    console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                    break;
                  default:
                    drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                    break;
                }
              } else {
                console.log("💨  空气");
              }
            } else console.log("" + I1I1Il);
          } else iIlI1I.errorMessage ? ($.runFalag = false, console.log("" + (iIlI1I.errorMessage || ""))) : console.log("" + I1I1Il);
        } else {
          console.log("" + I1I1Il);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getRankList":
        break;
      default:
        console.log(I1lI11 + "-> " + I1I1Il);
    }
    typeof iIlI1I == "object" && iIlI1I.errorMessage && iIlI1I.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (liIlI1) {
    console.log(liIlI1);
  }
}
function lilill(iillIl, IiIi1I, iillIi = "POST") {
  let iliI1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Ii1II1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iillIl.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (iliI1.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/may/mengniu/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, iliI1.Cookie = "" + (lilili && lilili || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + IliIli), {
    "url": iillIl,
    "method": iillIi,
    "headers": iliI1,
    "body": IiIi1I,
    "timeout": 30000
  };
}
function IilI1() {
  return new Promise(Illli => {
    let ilI1I1 = {
      "url": "https://lzdz1-isv.isvjd.com/wxCommonInfo/token?t=1690875041251",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": Ii1II1,
        "Referer": "https://lzdz1-isv.isvjcloud.com/dingzhi/may/mengniu/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(ilI1I1, async (ilIIll, iIliil, IIiill) => {
      try {
        if (ilIIll) {
          if (iIliil && typeof iIliil.statusCode != "undefined") {
            iIliil.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(ilIIll));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let I1liiI = IIiill.match(/(活动已经结束)/) && IIiill.match(/(活动已经结束)/)[1] || "";
          I1liiI && ($.activityEnd = true, console.log("活动已结束"));
          l1lI1(iIliil);
        }
      } catch (l1I11l) {
        $.logErr(l1I11l, iIliil);
      } finally {
        Illli();
      }
    });
  });
}
function l1lI1(l1I11i) {
  if (l1I11i) {
    if (l1I11i.headers["set-cookie"]) {
      Ii1II1 = originCookie + ";";
      for (let liIi of l1I11i.headers["set-cookie"]) {
        lI1ilI[liIi.split(";")[0].substr(0, liIi.split(";")[0].indexOf("="))] = liIi.split(";")[0].substr(liIi.split(";")[0].indexOf("=") + 1);
      }
      for (const liIIlI of Object.keys(lI1ilI)) {
        Ii1II1 += liIIlI + "=" + lI1ilI[liIIlI] + ";";
      }
      IliIli = Ii1II1;
    }
  }
}
function Ili1I1(iliiIi) {
  return new Promise(IIiilI => {
    const ilIIlI = {
      "url": "" + iliiIi,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ilIIlI, async (ii11, liIIil, liI1) => {
      try {
        if (ii11) {} else {
          if (liI1) {
            liI1 = JSON.parse(liI1);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (i11IlI) {
        $.logErr(i11IlI, liIIil);
        liI1 = null;
      } finally {
        IIiilI(liI1);
      }
    });
  });
}
function lI1I1i(i11Il1) {
  i11Il1 = i11Il1 || 32;
  let illii1 = "abcdef0123456789",
    Iii1i1 = illii1.length,
    IIIlll = "";
  for (i = 0; i < i11Il1; i++) IIIlll += illii1.charAt(Math.floor(Math.random() * Iii1i1));
  return IIIlll;
}
function liI1II(IIiiil, iIIIl) {
  return Math.floor(Math.random() * (iIIIl - IIiiil)) + IIiiil;
}
function i1Iii1(illiiI) {
  if (typeof illiiI == "string") {
    try {
      return JSON.parse(illiiI);
    } catch (i11Iil) {
      return console.log(i11Iil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}