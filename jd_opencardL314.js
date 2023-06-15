/*
6.15--6.21 嗨购618 陪你疯一夏
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
————————————————
入口：[ 6.15--6.21 嗨购618 陪你疯一夏 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:51 5 15-21 6 *
============Quantumultx===============
[task_local]
#6.15--6.21 嗨购618 陪你疯一夏
51 5 15-21 6 * jd_opencardL314.js, tag=6.15--6.21 嗨购618 陪你疯一夏, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('6.15--6.21 嗨购618 陪你疯一夏')
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  opencard_addCart = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let domains = "https://lzdz1-isv.isvjcloud.com",
  cookiesArr = [],
  cookie = "",
  lz_cookie = {};
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(IIlIll => {
    cookiesArr.push(jdCookieNode[IIlIll]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(l11liI => l11liI.cookie)].filter(li11Ii => !!li11Ii);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  lzopen = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  whitelist = "",
  blacklist = "";
$.whitelist = process.env.jd_opencard_whitelist || whitelist;
$.blacklist = process.env.jd_opencard_blacklist || blacklist;
getWhitelist();
getBlacklist();
$.errMsgPin = [];
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await getAuthorCodeList("http://code.kingran.cf/314.json");
  $.activityId = "755aea1a02ec41c8a93165f0a3d18261";
  $.authorCode = authorCodeList[random(0, authorCodeList.length)];
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let ilIiiI = 0; ilIiiI < cookiesArr.length; ilIiiI++) {
    cookie = cookiesArr[ilIiiI];
    originCookie = cookiesArr[ilIiiI];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ilIiiI + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let IIlIil = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + IIlIil;
  }
  if ($.outFlag) {
    let l11llI = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + l11llI);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + l11llI);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(i1IlIi => $.logErr(i1IlIi)).finally(() => $.done());
async function run() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    let I1IIi = false;
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
      console.log("此ip已被限制，请更换IP后再执行脚本\n");
      return;
    }
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("activityContent");
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    console.log($.actorUuid);
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    await takePostRequest("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await takePostRequest("checkOpenCard");
    await takePostRequest("taskRecord");
    await $.wait(1000);
    await takePostRequest("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          I1IIi = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await getshopactivityId();
          for (let ii11ii = 0; ii11ii < Array(2).length; ii11ii++) {
            if (ii11ii > 0) console.log("第" + ii11ii + "次 重新开卡");
            await joinShop();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await takePostRequest("activityContent");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await takePostRequest("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    opencard_addCart && !$.addCart && !$.outFlag && (await takePostRequest("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await takePostRequest("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await takePostRequest("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    I1IIi && (await takePostRequest("activityContent"));
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let I11lli = parseInt($.score / 100);
      opencard_draw = parseInt(opencard_draw, 10);
      if (I11lli > opencard_draw) I11lli = opencard_draw;
      console.log("已设置抽奖次数为" + I11lli + "次，当前有" + $.score + "金币");
      for (m = 1; I11lli--; m++) {
        console.log("进行第" + m + "次抽奖");
        await takePostRequest("startDraw");
        if ($.runFalag == false) break;
        if (Number(I11lli) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    }
    if ($.outFlag) {
      console.log("🚫 此ip已被限制，请更换IP后再执行脚本\n");
      return;
    }
    console.log("\n当前已邀请" + $.assistCount + "人");
    await takePostRequest("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (I1l1I) {
    console.log(I1l1I);
  }
}
async function takePostRequest(Ilii) {
  if ($.outFlag) return;
  let Ilil = "https://lzdz1-isv.isvjcloud.com",
    i1IIli = "",
    lI111 = "POST";
  switch (Ilii) {
    case "getSimpleActInfoVo":
      url = Ilil + "/dz/common/getSimpleActInfoVo";
      i1IIli = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = Ilil + "/customer/getMyPing";
      i1IIli = "userId=1000002467&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = Ilil + "/common/accessLogWithAD";
      let lili1l = Ilil + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      i1IIli = "venderId=1000002467&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lili1l) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = Ilil + "/wxActionCommon/getUserInfo";
      i1IIli = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = Ilil + "/dingzhi/joinCommon/activityContent";
      i1IIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = Ilil + "/dingzhi/joinCommon/drawContent";
      i1IIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = Ilil + "/dingzhi/joinCommon/taskInfo";
      i1IIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = Ilil + "/dingzhi/joinCommon/assist";
      i1IIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = Ilil + "/dingzhi/joinCommon/taskRecord";
      i1IIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = Ilil + "/dingzhi/joinCommon/doTask";
      i1IIli = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = Ilil + "/dingzhi/joinCommon/doTask";
      i1IIli = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = Ilil + "/dingzhi/joinCommon/doTask";
      i1IIli = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = Ilil + "/dingzhi/opencard/" + Ilii;
      i1IIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (Ilii == "browseGoods") i1IIli += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = Ilil + "/dingzhi/opencard/" + Ilii;
      let iI1iIi = "",
        iI1iIl = "";
      if (Ilii == "viewVideo") {
        iI1iIi = 31;
        iI1iIl = 31;
      } else {
        if (Ilii == "visitSku") {
          iI1iIi = 5;
          iI1iIl = $.visitSkuValue || 5;
        } else {
          if (Ilii == "toShop") {
            iI1iIi = 14;
            iI1iIl = $.toShopValue || 14;
          } else {
            if (Ilii == "addSku") {
              iI1iIi = 2;
              iI1iIl = $.addSkuValue || 2;
            }
          }
        }
      }
      i1IIli = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + iI1iIi + "&taskValue=" + iI1iIl;
      break;
    case "drawRecord":
      url = Ilil + "/dingzhi/joinCommon/drawRecord";
      i1IIli = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = Ilil + "/dingzhi/joinCommon/shareRecord";
      i1IIli = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = Ilil + "/dingzhi/joinCommon/startDraw";
      i1IIli = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + Ilii);
  }
  let IiIl1I = getPostRequest(url, i1IIli, lI111);
  return new Promise(async iI1Il => {
    $.post(IiIl1I, (i111il, i111ii, lI11i) => {
      try {
        setActivityCookie(i111ii);
        i111il ? (i111ii && typeof i111ii.statusCode != "undefined" && i111ii.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n"), console.log("" + $.toStr(i111il, i111il)), console.log(Ilii + " API请求失败，请检查网路重试")) : dealReturn(Ilii, lI11i);
      } catch (iIilII) {
        console.log(iIilII, i111ii);
      } finally {
        iI1Il();
      }
    });
  });
}
async function dealReturn(Ill1, lI1i1i) {
  let il1Ii1 = "";
  try {
    (Ill1 != "accessLogWithAD" || Ill1 != "drawContent") && lI1i1i && (il1Ii1 = JSON.parse(lI1i1i));
  } catch (IIi11I) {
    console.log(Ill1 + " 执行任务异常");
    console.log(lI1i1i);
    $.runFalag = false;
  }
  try {
    switch (Ill1) {
      case "getSimpleActInfoVo":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            if (typeof il1Ii1.data.shopId != "undefined") $.shopId = il1Ii1.data.shopId;
            if (typeof il1Ii1.data.venderId != "undefined") $.venderId = il1Ii1.data.venderId;
          } else il1Ii1.errorMessage ? console.log(Ill1 + " " + (il1Ii1.errorMessage || "")) : console.log(Ill1 + " " + lI1i1i);
        } else console.log(Ill1 + " " + lI1i1i);
        break;
      case "getMyPing":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            if (il1Ii1.data && typeof il1Ii1.data.secretPin != "undefined") $.Pin = il1Ii1.data.secretPin;
            if (il1Ii1.data && typeof il1Ii1.data.nickname != "undefined") $.nickname = il1Ii1.data.nickname;
          } else {
            if (il1Ii1.errorMessage) {
              console.log("" + (il1Ii1.errorMessage || ""));
              $.errMsgPin.push($.UserName);
            } else console.log(Ill1 + " " + lI1i1i);
          }
        } else console.log(Ill1 + " " + lI1i1i);
        break;
      case "getUserInfo":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            if (il1Ii1.data && typeof il1Ii1.data.yunMidImageUrl != "undefined") $.attrTouXiang = il1Ii1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else il1Ii1.errorMessage ? console.log(Ill1 + " " + (il1Ii1.errorMessage || "")) : console.log(Ill1 + " " + lI1i1i);
        } else console.log(Ill1 + " " + lI1i1i);
        break;
      case "activityContent":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            $.endTime = il1Ii1.data.endTime || il1Ii1.data.activityVo && il1Ii1.data.activityVo.endTime || il1Ii1.data.activity.endTime || 0;
            $.hasEnd = il1Ii1.data.isEnd || false;
            $.score = il1Ii1.data.actorInfo.score || 0;
            $.actorUuid = il1Ii1.data.actorInfo.uuid || "";
            $.assistCount = il1Ii1.data.actorInfo.assistCount || 0;
          } else il1Ii1.errorMessage ? console.log(Ill1 + " " + (il1Ii1.errorMessage || "")) : console.log(Ill1 + " " + lI1i1i);
        } else {
          console.log(Ill1 + " " + lI1i1i);
        }
        break;
      case "assist":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            $.assistState = il1Ii1.data.assistState || 0;
            $.allOpenCard = il1Ii1.data.openCardInfo.openAll || false;
            $.openVenderId = il1Ii1.data.openCardInfo.openVenderId || [];
          } else il1Ii1.errorMessage ? console.log(Ill1 + " " + (il1Ii1.errorMessage || "")) : console.log(Ill1 + " " + lI1i1i);
        } else console.log(Ill1 + " " + lI1i1i);
        break;
      case "taskRecord":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            $.followShop = il1Ii1.data["20"].recordCount || 0;
            $.addCart = il1Ii1.data["23"].recordCount || 0;
            $.visitSku = il1Ii1.data["10"].recordCount || 0;
          } else il1Ii1.errorMessage ? console.log(Ill1 + " " + (il1Ii1.errorMessage || "")) : console.log(Ill1 + " " + lI1i1i);
        } else console.log(Ill1 + " " + lI1i1i);
        break;
      case "checkOpenCard":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            let IIi11i = il1Ii1.data["10"].settingInfo || [],
              iiIIli = il1Ii1.data.cardList || [],
              iili = il1Ii1.data.openCardList || [];
            $.openList = [...iiIIli, ...IIi11i, ...iili];
            $.openCardScore1 = il1Ii1.data.score1 || 0;
            $.openCardScore2 = il1Ii1.data.score2 || 0;
            $.drawScore = il1Ii1.data.drawScore || 0;
            if (il1Ii1.data.beans || il1Ii1.data.addBeanNum) console.log("开卡获得：" + (il1Ii1.data.beans || il1Ii1.data.addBeanNum) + "京豆 🐶");
          } else {
            if (il1Ii1.errorMessage) {
              console.log(Ill1 + " " + (il1Ii1.errorMessage || ""));
            } else console.log(Ill1 + " " + lI1i1i);
          }
        } else console.log(Ill1 + " " + lI1i1i);
        break;
      case "followShop":
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "addSku":
      case "sign":
      case "addCart":
      case "browseGoods":
      case "startDraw":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            if (typeof il1Ii1.data == "object") {
              let I11ll1 = "",
                lIIII = "抽奖";
              il1Ii1.data.addBeanNum && (I11ll1 = il1Ii1.data.addBeanNum + "京豆");
              il1Ii1.data.addPoint && (I11ll1 += " " + il1Ii1.data.addPoint + "游戏机会");
              if (Ill1 == "followShop") {
                lIIII = "关注";
                il1Ii1.data.beans != "0" && (I11ll1 += il1Ii1.data.beans + "京豆 🐶");
              } else {
                if (Ill1 == "addSku" || Ill1 == "addCart") {
                  lIIII = "加购";
                  il1Ii1.data.beans != "0" && (I11ll1 += il1Ii1.data.beans + "京豆 🐶");
                } else {
                  if (Ill1 == "viewVideo") lIIII = "热门文章";else {
                    if (Ill1 == "toShop") {
                      lIIII = "浏览店铺";
                    } else {
                      if (Ill1 == "visitSku" || Ill1 == "browseGoods") lIIII = "浏览商品";else {
                        if (Ill1 == "sign") lIIII = "签到";else {
                          let ilIIi = typeof il1Ii1.data.drawOk === "object" && il1Ii1.data.drawOk || il1Ii1.data;
                          I11ll1 = ilIIi.drawOk == true && ilIIi.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !I11ll1 && (I11ll1 = "空气 💨");
              console.log(lIIII + "获得：" + (I11ll1 || lI1i1i));
            } else console.log("" + lI1i1i);
          } else il1Ii1.errorMessage ? ($.runFalag = false, console.log("" + (il1Ii1.errorMessage || ""))) : console.log("" + lI1i1i);
        } else {
          console.log("" + lI1i1i);
        }
        break;
      case "drawRecord":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true) {
            let iiIIll = 0;
            for (let I1li1l of il1Ii1.data) {
              infoType = I1li1l.infoType;
              infoName = I1li1l.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  iiIIll += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await notify.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await notify.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            iiIIll > 0 && console.log("当前累计获得 " + iiIIll + " 京豆 🐶");
          } else il1Ii1.errorMessage ? console.log(Ill1 + " " + (il1Ii1.errorMessage || "")) : console.log(Ill1 + " " + lI1i1i);
        } else console.log(Ill1 + " " + lI1i1i);
        break;
      case "getShareRecord":
        if (typeof il1Ii1 == "object") {
          if (il1Ii1.result && il1Ii1.result === true && il1Ii1.data) {
            $.ShareCount = il1Ii1.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else il1Ii1.errorMessage ? console.log(Ill1 + " " + (il1Ii1.errorMessage || "")) : console.log(Ill1 + " " + lI1i1i);
        } else console.log(Ill1 + " " + lI1i1i);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(Ill1 + "-> " + lI1i1i);
    }
    typeof il1Ii1 == "object" && il1Ii1.errorMessage && il1Ii1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IIl1I1) {
    console.log(IIl1I1);
  }
}
function getPostRequest(I1li1i, IIi111, Ii11II = "POST") {
  let lIlIli = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return I1li1i.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (lIlIli.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, lIlIli.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": I1li1i,
    "method": Ii11II,
    "headers": lIlIli,
    "body": IIi111,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(I111II => {
    let iIlIlI = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iIlIlI, async (l11Iil, Iili1I, lli1i1) => {
      try {
        if (l11Iil) {
          if (Iili1I && typeof Iili1I.statusCode != "undefined") {}
          console.log("" + $.toStr(l11Iil));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let lIl1i = lli1i1.match(/(活动已经结束)/) && lli1i1.match(/(活动已经结束)/)[1] || "";
          lIl1i && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(Iili1I);
        }
      } catch (Iili1l) {
        $.logErr(Iili1l, Iili1I);
      } finally {
        I111II();
      }
    });
  });
}
function setActivityCookie(l11Il1) {
  if (l11Il1) {
    if (l11Il1.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let iI1i of l11Il1.headers["set-cookie"]) {
        lz_cookie[iI1i.split(";")[0].substr(0, iI1i.split(";")[0].indexOf("="))] = iI1i.split(";")[0].substr(iI1i.split(";")[0].indexOf("=") + 1);
      }
      for (const l11Ill of Object.keys(lz_cookie)) {
        cookie += l11Ill + "=" + lz_cookie[l11Ill] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(lIl1I1) {
  lIl1I1 = lIl1I1 || 32;
  let iIl = "abcdef0123456789",
    lIIi = iIl.length,
    l11Ili = "";
  for (i = 0; i < lIl1I1; i++) l11Ili += iIl.charAt(Math.floor(Math.random() * lIIi));
  return l11Ili;
}
function jsonParse(l11i1) {
  if (typeof l11i1 == "string") try {
    return JSON.parse(l11i1);
  } catch (IIiIil) {
    return console.log(IIiIil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async Il1II1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Il1IIi = "";
    if ($.shopactivityId) Il1IIi = ",\"activityId\":" + $.shopactivityId;
    const IIiIl1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Il1IIi + ",\"channel\":406}",
      ilII11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIiIl1)
      },
      l11ii = await getH5st("8adfb", ilII11),
      Il1IIl = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IIiIl1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Il1IIl, async (l1Iii1, IIiIi1, I1i1) => {
      try {
        if (l1Iii1) IIiIi1 && typeof IIiIi1.statusCode != "undefined" && IIiIi1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          I1i1 = I1i1 && I1i1.match(/jsonp_.*?\((.*?)\);/) && I1i1.match(/jsonp_.*?\((.*?)\);/)[1] || I1i1;
          let l11lI = $.toObj(I1i1, I1i1);
          if (l11lI && typeof l11lI == "object") {
            if (l11lI && l11lI.success === true) {
              console.log(" >> " + l11lI.message);
              $.errorJoinShop = l11lI.message;
              if (l11lI.result && l11lI.result.giftInfo) for (let I1II1l of l11lI.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + I1II1l.discountString + I1II1l.prizeName + I1II1l.secondLineDesc);
              }
            } else l11lI && typeof l11lI == "object" && l11lI.message ? ($.errorJoinShop = l11lI.message, console.log("" + (l11lI.message || ""))) : console.log(I1i1);
          } else console.log(I1i1);
        }
      } catch (lii1I) {
        $.logErr(lii1I, IIiIi1);
      } finally {
        Il1II1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async I1il => {
    const iIIi1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iIiIIl = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIIi1)
      },
      iIiIIi = await getH5st("8adfb", iIiIIl),
      IlIill = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIIi1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIiIIi),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IlIill, async (iiI1I1, IlIili, I1iI) => {
      try {
        if (iiI1I1) {
          if (IlIili && typeof IlIili.statusCode != "undefined") {
            if (IlIili.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          I1iI = I1iI && I1iI.match(/jsonp_.*?\((.*?)\);/) && I1iI.match(/jsonp_.*?\((.*?)\);/)[1] || I1iI;
          let I1lI = $.toObj(I1iI, I1iI);
          if (I1lI && typeof I1lI == "object") {
            if (I1lI && I1lI.success == true) {
              console.log("去加入：" + (I1lI.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = I1lI.result.interestsRuleList && I1lI.result.interestsRuleList[0] && I1lI.result.interestsRuleList[0].interestsInfo && I1lI.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else console.log(I1iI);
        }
      } catch (iIl111) {
        $.logErr(iIl111, IlIili);
      } finally {
        I1il();
      }
    });
  });
}
function getAuthorCodeList(i11lii) {
  return new Promise(iiI1II => {
    const lIiii1 = {
      "url": i11lii + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIiii1, async (iIlII, iIiII1, I1l1) => {
      try {
        if (iIlII) $.getAuthorCodeListerr = false;else {
          if (I1l1) I1l1 = JSON.parse(I1l1);
          $.getAuthorCodeListerr = true;
        }
      } catch (Il11I1) {
        $.logErr(Il11I1, iIiII1);
        I1l1 = null;
      } finally {
        iiI1II(I1l1);
      }
    });
  });
}
function random(iilI11, lIiiiI) {
  return Math.floor(Math.random() * (lIiiiI - iilI11)) + iilI11;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lll1lI = Array.from(new Set($.blacklist.split("&")));
  console.log(lll1lI.join("&") + "\n");
  let lliliI = lll1lI,
    ll1iiI = [],
    lIIlll = false;
  for (let iIllIi = 0; iIllIi < cookiesArr.length; iIllIi++) {
    let iI11l = decodeURIComponent(cookiesArr[iIllIi].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[iIllIi].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iI11l) break;
    let IlIiiI = false;
    for (let lll1l1 of lliliI) {
      if (lll1l1 && lll1l1 == iI11l) {
        IlIiiI = true;
        break;
      }
    }
    !IlIiiI && (lIIlll = true, ll1iiI.splice(iIllIi, -1, cookiesArr[iIllIi]));
  }
  if (lIIlll) cookiesArr = ll1iiI;
}
function toFirst(I1ll, ll1iii) {
  ll1iii != 0 && I1ll.unshift(I1ll.splice(ll1iii, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const lIIlli = Array.from(new Set($.whitelist.split("&")));
  console.log(lIIlli.join("&") + "\n");
  let I1Iill = [],
    iilI1i = lIIlli;
  for (let IIllli in cookiesArr) {
    let lIIll1 = decodeURIComponent(cookiesArr[IIllli].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[IIllli].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iilI1i.includes(lIIll1) && I1Iill.push(cookiesArr[IIllli]);
  }
  helpCookiesArr = I1Iill;
  if (iilI1i.length > 1) for (let Il1ii in iilI1i) {
    let IiI11l = iilI1i[iilI1i.length - 1 - Il1ii];
    if (!IiI11l) continue;
    for (let iI1i1I in helpCookiesArr) {
      let IiI11i = decodeURIComponent(helpCookiesArr[iI1i1I].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iI1i1I].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      IiI11l == IiI11i && toFirst(helpCookiesArr, iI1i1I);
    }
  }
}