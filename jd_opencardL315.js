/*
6.15--6.21 任性嗨购  引爆狂欢盛宴
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
————————————————
入口：[ 6.15--6.21 任性嗨购  引爆狂欢盛宴 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:31 2 15-21 6 *
============Quantumultx===============
[task_local]
#6.15--6.21 任性嗨购  引爆狂欢盛宴
31 2 15-21 6 * jd_opencardL315.js, tag=6.15--6.21 任性嗨购  引爆狂欢盛宴, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('6.15--6.21 任性嗨购  引爆狂欢盛宴')
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
  Object.keys(jdCookieNode).forEach(lIiII1 => {
    cookiesArr.push(jdCookieNode[lIiII1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iIlii => iIlii.cookie)].filter(lI1I => !!lI1I);
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
  authorCodeList = ["0222cefb48844094b501ea6cb82e7920"];
  $.activityId = "08ca3a09b06a4cfe825e6361ae5b0c5e";
  $.authorCode = authorCodeList[random(0, authorCodeList.length)];
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let i1IlII = 0; i1IlII < cookiesArr.length; i1IlII++) {
    cookie = cookiesArr[i1IlII];
    originCookie = cookiesArr[i1IlII];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1IlII + 1;
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
    let ll1III = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + ll1III;
  }
  if ($.outFlag) {
    let ll1II1 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + ll1II1);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + ll1II1);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(l11lii => $.logErr(l11lii)).finally(() => $.done());
async function run() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    let I1IIl = false;
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
          I1IIl = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await getshopactivityId();
          for (let iiii1I = 0; iiii1I < Array(2).length; iiii1I++) {
            if (iiii1I > 0) console.log("第" + iiii1I + "次 重新开卡");
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
    if (opencard_addCart) {
      if (!$.addCart && !$.outFlag) {
        await takePostRequest("addCart");
        await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
      }
    }
    console.log("去助力 -> " + $.shareUuid);
    await takePostRequest("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await takePostRequest("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    I1IIl && (await takePostRequest("activityContent"));
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let il1lI1 = parseInt($.score / 100);
      opencard_draw = parseInt(opencard_draw, 10);
      if (il1lI1 > opencard_draw) il1lI1 = opencard_draw;
      console.log("已设置抽奖次数为" + il1lI1 + "次，当前有" + $.score + "金币");
      for (m = 1; il1lI1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await takePostRequest("startDraw");
        if ($.runFalag == false) break;
        if (Number(il1lI1) <= 0) break;
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
  } catch (lIlIiI) {
    console.log(lIlIiI);
  }
}
async function takePostRequest(I11lli) {
  if ($.outFlag) return;
  let I11lll = "https://lzdz1-isv.isvjcloud.com",
    I1l1I = "",
    llIiII = "POST";
  switch (I11lli) {
    case "getSimpleActInfoVo":
      url = I11lll + "/dz/common/getSimpleActInfoVo";
      I1l1I = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = I11lll + "/customer/getMyPing";
      I1l1I = "userId=1000015827&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = I11lll + "/common/accessLogWithAD";
      let lIl11i = I11lll + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I1l1I = "venderId=1000015827&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lIl11i) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = I11lll + "/wxActionCommon/getUserInfo";
      I1l1I = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = I11lll + "/dingzhi/joinCommon/activityContent";
      I1l1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = I11lll + "/dingzhi/joinCommon/drawContent";
      I1l1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = I11lll + "/dingzhi/joinCommon/taskInfo";
      I1l1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = I11lll + "/dingzhi/joinCommon/assist";
      I1l1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = I11lll + "/dingzhi/joinCommon/taskRecord";
      I1l1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = I11lll + "/dingzhi/joinCommon/doTask";
      I1l1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = I11lll + "/dingzhi/joinCommon/doTask";
      I1l1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = I11lll + "/dingzhi/joinCommon/doTask";
      I1l1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = I11lll + "/dingzhi/opencard/" + I11lli;
      I1l1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (I11lli == "browseGoods") I1l1I += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = I11lll + "/dingzhi/opencard/" + I11lli;
      let lIl11l = "",
        iiii1i = "";
      if (I11lli == "viewVideo") {
        lIl11l = 31;
        iiii1i = 31;
      } else {
        if (I11lli == "visitSku") {
          lIl11l = 5;
          iiii1i = $.visitSkuValue || 5;
        } else {
          if (I11lli == "toShop") {
            lIl11l = 14;
            iiii1i = $.toShopValue || 14;
          } else {
            if (I11lli == "addSku") {
              lIl11l = 2;
              iiii1i = $.addSkuValue || 2;
            }
          }
        }
      }
      I1l1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + lIl11l + "&taskValue=" + iiii1i;
      break;
    case "drawRecord":
      url = I11lll + "/dingzhi/joinCommon/drawRecord";
      I1l1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = I11lll + "/dingzhi/joinCommon/shareRecord";
      I1l1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = I11lll + "/dingzhi/joinCommon/startDraw";
      I1l1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I11lli);
  }
  let lIl111 = getPostRequest(url, I1l1I, llIiII);
  return new Promise(async IllI => {
    $.post(lIl111, (ilI11, li1llI, lIil11) => {
      try {
        setActivityCookie(li1llI);
        if (ilI11) {
          li1llI && typeof li1llI.statusCode != "undefined" && li1llI.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n");
          console.log("" + $.toStr(ilI11, ilI11));
          console.log(I11lli + " API请求失败，请检查网路重试");
        } else dealReturn(I11lli, lIil11);
      } catch (il1Ii1) {
        console.log(il1Ii1, li1llI);
      } finally {
        IllI();
      }
    });
  });
}
async function dealReturn(li1ll1, iI1II) {
  let IiIIII = "";
  try {
    (li1ll1 != "accessLogWithAD" || li1ll1 != "drawContent") && iI1II && (IiIIII = JSON.parse(iI1II));
  } catch (I11lii) {
    console.log(li1ll1 + " 执行任务异常");
    console.log(iI1II);
    $.runFalag = false;
  }
  try {
    switch (li1ll1) {
      case "getSimpleActInfoVo":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            if (typeof IiIIII.data.shopId != "undefined") $.shopId = IiIIII.data.shopId;
            if (typeof IiIIII.data.venderId != "undefined") $.venderId = IiIIII.data.venderId;
          } else IiIIII.errorMessage ? console.log(li1ll1 + " " + (IiIIII.errorMessage || "")) : console.log(li1ll1 + " " + iI1II);
        } else console.log(li1ll1 + " " + iI1II);
        break;
      case "getMyPing":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            if (IiIIII.data && typeof IiIIII.data.secretPin != "undefined") $.Pin = IiIIII.data.secretPin;
            if (IiIIII.data && typeof IiIIII.data.nickname != "undefined") $.nickname = IiIIII.data.nickname;
          } else IiIIII.errorMessage ? (console.log("" + (IiIIII.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log(li1ll1 + " " + iI1II);
        } else console.log(li1ll1 + " " + iI1II);
        break;
      case "getUserInfo":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            if (IiIIII.data && typeof IiIIII.data.yunMidImageUrl != "undefined") $.attrTouXiang = IiIIII.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else IiIIII.errorMessage ? console.log(li1ll1 + " " + (IiIIII.errorMessage || "")) : console.log(li1ll1 + " " + iI1II);
        } else console.log(li1ll1 + " " + iI1II);
        break;
      case "activityContent":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            $.endTime = IiIIII.data.endTime || IiIIII.data.activityVo && IiIIII.data.activityVo.endTime || IiIIII.data.activity.endTime || 0;
            $.hasEnd = IiIIII.data.isEnd || false;
            $.score = IiIIII.data.actorInfo.score || 0;
            $.actorUuid = IiIIII.data.actorInfo.uuid || "";
            $.assistCount = IiIIII.data.actorInfo.assistCount || 0;
          } else IiIIII.errorMessage ? console.log(li1ll1 + " " + (IiIIII.errorMessage || "")) : console.log(li1ll1 + " " + iI1II);
        } else console.log(li1ll1 + " " + iI1II);
        break;
      case "assist":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            $.assistState = IiIIII.data.assistState || 0;
            $.allOpenCard = IiIIII.data.openCardInfo.openAll || false;
            $.openVenderId = IiIIII.data.openCardInfo.openVenderId || [];
          } else {
            if (IiIIII.errorMessage) console.log(li1ll1 + " " + (IiIIII.errorMessage || ""));else {
              console.log(li1ll1 + " " + iI1II);
            }
          }
        } else console.log(li1ll1 + " " + iI1II);
        break;
      case "taskRecord":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            $.followShop = IiIIII.data["20"].recordCount || 0;
            $.addCart = IiIIII.data["23"].recordCount || 0;
            $.visitSku = IiIIII.data["10"].recordCount || 0;
          } else IiIIII.errorMessage ? console.log(li1ll1 + " " + (IiIIII.errorMessage || "")) : console.log(li1ll1 + " " + iI1II);
        } else console.log(li1ll1 + " " + iI1II);
        break;
      case "checkOpenCard":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            let iiI1i = IiIIII.data["10"].settingInfo || [],
              iiI1l = IiIIII.data.cardList || [],
              Ili1lI = IiIIII.data.openCardList || [];
            $.openList = [...iiI1l, ...iiI1i, ...Ili1lI];
            $.openCardScore1 = IiIIII.data.score1 || 0;
            $.openCardScore2 = IiIIII.data.score2 || 0;
            $.drawScore = IiIIII.data.drawScore || 0;
            if (IiIIII.data.beans || IiIIII.data.addBeanNum) console.log("开卡获得：" + (IiIIII.data.beans || IiIIII.data.addBeanNum) + "京豆 🐶");
          } else IiIIII.errorMessage ? console.log(li1ll1 + " " + (IiIIII.errorMessage || "")) : console.log(li1ll1 + " " + iI1II);
        } else console.log(li1ll1 + " " + iI1II);
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
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            if (typeof IiIIII.data == "object") {
              let IiII1l = "",
                IiII1i = "抽奖";
              if (IiIIII.data.addBeanNum) {
                IiII1l = IiIIII.data.addBeanNum + "京豆";
              }
              IiIIII.data.addPoint && (IiII1l += " " + IiIIII.data.addPoint + "游戏机会");
              if (li1ll1 == "followShop") {
                IiII1i = "关注";
                IiIIII.data.beans != "0" && (IiII1l += IiIIII.data.beans + "京豆 🐶");
              } else {
                if (li1ll1 == "addSku" || li1ll1 == "addCart") {
                  IiII1i = "加购";
                  if (IiIIII.data.beans != "0") {
                    IiII1l += IiIIII.data.beans + "京豆 🐶";
                  }
                } else {
                  if (li1ll1 == "viewVideo") IiII1i = "热门文章";else {
                    if (li1ll1 == "toShop") IiII1i = "浏览店铺";else {
                      if (li1ll1 == "visitSku" || li1ll1 == "browseGoods") {
                        IiII1i = "浏览商品";
                      } else {
                        if (li1ll1 == "sign") IiII1i = "签到";else {
                          let lIIIi = typeof IiIIII.data.drawOk === "object" && IiIIII.data.drawOk || IiIIII.data;
                          IiII1l = lIIIi.drawOk == true && lIIIi.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !IiII1l && (IiII1l = "空气 💨");
              console.log(IiII1i + "获得：" + (IiII1l || iI1II));
            } else console.log("" + iI1II);
          } else IiIIII.errorMessage ? ($.runFalag = false, console.log("" + (IiIIII.errorMessage || ""))) : console.log("" + iI1II);
        } else console.log("" + iI1II);
        break;
      case "drawRecord":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true) {
            let I1li1i = 0;
            for (let IIi111 of IiIIII.data) {
              infoType = IIi111.infoType;
              infoName = IIi111.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  I1li1i += infoName;
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
            I1li1i > 0 && console.log("当前累计获得 " + I1li1i + " 京豆 🐶");
          } else IiIIII.errorMessage ? console.log(li1ll1 + " " + (IiIIII.errorMessage || "")) : console.log(li1ll1 + " " + iI1II);
        } else console.log(li1ll1 + " " + iI1II);
        break;
      case "getShareRecord":
        if (typeof IiIIII == "object") {
          if (IiIIII.result && IiIIII.result === true && IiIIII.data) {
            $.ShareCount = IiIIII.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else IiIIII.errorMessage ? console.log(li1ll1 + " " + (IiIIII.errorMessage || "")) : console.log(li1ll1 + " " + iI1II);
        } else console.log(li1ll1 + " " + iI1II);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(li1ll1 + "-> " + iI1II);
    }
    typeof IiIIII == "object" && IiIIII.errorMessage && IiIIII.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (ilII1) {
    console.log(ilII1);
  }
}
function getPostRequest(lIlIll, l111I1, IiII11 = "POST") {
  let ilIilI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lIlIll.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (ilIilI.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, ilIilI.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": lIlIll,
    "method": IiII11,
    "headers": ilIilI,
    "body": l111I1,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(iI11 => {
    let Iili11 = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(Iili11, async (I111II, lII1, iIlIlI) => {
      try {
        if (I111II) {
          if (lII1 && typeof lII1.statusCode != "undefined") {}
          console.log("" + $.toStr(I111II));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let ilIill = iIlIlI.match(/(活动已经结束)/) && iIlIlI.match(/(活动已经结束)/)[1] || "";
          ilIill && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(lII1);
        }
      } catch (Il1l1l) {
        $.logErr(Il1l1l, lII1);
      } finally {
        iI11();
      }
    });
  });
}
function setActivityCookie(Il1l1i) {
  if (Il1l1i) {
    if (Il1l1i.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let IIlli1 of Il1l1i.headers["set-cookie"]) {
        lz_cookie[IIlli1.split(";")[0].substr(0, IIlli1.split(";")[0].indexOf("="))] = IIlli1.split(";")[0].substr(IIlli1.split(";")[0].indexOf("=") + 1);
      }
      for (const ilIiii of Object.keys(lz_cookie)) {
        cookie += ilIiii + "=" + lz_cookie[ilIiii] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(lIl1i) {
  lIl1i = lIl1i || 32;
  let liIiil = "abcdef0123456789",
    l11Il1 = liIiil.length,
    Iili1i = "";
  for (i = 0; i < lIl1i; i++) Iili1i += liIiil.charAt(Math.floor(Math.random() * l11Il1));
  return Iili1i;
}
function jsonParse(lIi111) {
  if (typeof lIi111 == "string") {
    try {
      return JSON.parse(lIi111);
    } catch (IIlliI) {
      return console.log(IIlliI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async lIi11I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIlIiI = "";
    if ($.shopactivityId) iIlIiI = ",\"activityId\":" + $.shopactivityId;
    const Il1III = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIlIiI + ",\"channel\":406}",
      l11iI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il1III)
      },
      IIiIil = await getH5st("8adfb", l11iI),
      lli1ll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Il1III + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIiIil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lli1ll, async (iiI11i, Il1II1, iiilI) => {
      try {
        if (iiI11i) {
          if (Il1II1 && typeof Il1II1.statusCode != "undefined") {
            Il1II1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          iiilI = iiilI && iiilI.match(/jsonp_.*?\((.*?)\);/) && iiilI.match(/jsonp_.*?\((.*?)\);/)[1] || iiilI;
          let Il1IIl = $.toObj(iiilI, iiilI);
          if (Il1IIl && typeof Il1IIl == "object") {
            if (Il1IIl && Il1IIl.success === true) {
              console.log(" >> " + Il1IIl.message);
              $.errorJoinShop = Il1IIl.message;
              if (Il1IIl.result && Il1IIl.result.giftInfo) for (let l11il of Il1IIl.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + l11il.discountString + l11il.prizeName + l11il.secondLineDesc);
              }
            } else Il1IIl && typeof Il1IIl == "object" && Il1IIl.message ? ($.errorJoinShop = Il1IIl.message, console.log("" + (Il1IIl.message || ""))) : console.log(iiilI);
          } else console.log(iiilI);
        }
      } catch (IIiIlI) {
        $.logErr(IIiIlI, Il1II1);
      } finally {
        lIi11I();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iiIlII => {
    const ll1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      lliII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ll1i)
      },
      iiiiI = await getH5st("8adfb", lliII),
      iiIlIl = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ll1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiiiI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iiIlIl, async (iiIlIi, iIlIli, iIlIll) => {
      try {
        if (iiIlIi) iIlIli && typeof iIlIli.statusCode != "undefined" && iIlIli.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iIlIll = iIlIll && iIlIll.match(/jsonp_.*?\((.*?)\);/) && iIlIll.match(/jsonp_.*?\((.*?)\);/)[1] || iIlIll;
          let iIIi1 = $.toObj(iIlIll, iIlIll);
          iIIi1 && typeof iIIi1 == "object" ? iIIi1 && iIIi1.success == true && (console.log("去加入：" + (iIIi1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iIIi1.result.interestsRuleList && iIIi1.result.interestsRuleList[0] && iIIi1.result.interestsRuleList[0].interestsInfo && iIIi1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iIlIll);
        }
      } catch (iIiIIi) {
        $.logErr(iIiIIi, iIlIli);
      } finally {
        iiIlII();
      }
    });
  });
}
function getAuthorCodeList(iiI1I1) {
  return new Promise(iIiIII => {
    const I1lI = {
      "url": iiI1I1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1lI, async (iIlIl, iIlIi, iIl111) => {
      try {
        if (iIlIl) $.getAuthorCodeListerr = false;else {
          if (iIl111) iIl111 = JSON.parse(iIl111);
          $.getAuthorCodeListerr = true;
        }
      } catch (iIl11I) {
        $.logErr(iIl11I, iIlIi);
        iIl111 = null;
      } finally {
        iIiIII(iIl111);
      }
    });
  });
}
function random(lIiii1, iIlII) {
  return Math.floor(Math.random() * (iIlII - lIiii1)) + lIiii1;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1l1 = Array.from(new Set($.blacklist.split("&")));
  console.log(I1l1.join("&") + "\n");
  let Il11I1 = I1l1,
    i11liI = [],
    iilI11 = false;
  for (let lIIlll = 0; lIIlll < cookiesArr.length; lIIlll++) {
    let ll1ii1 = decodeURIComponent(cookiesArr[lIIlll].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[lIIlll].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ll1ii1) break;
    let i11li1 = false;
    for (let iIlI1 of Il11I1) {
      if (iIlI1 && iIlI1 == ll1ii1) {
        i11li1 = true;
        break;
      }
    }
    !i11li1 && (iilI11 = true, i11liI.splice(lIIlll, -1, cookiesArr[lIIlll]));
  }
  if (iilI11) cookiesArr = i11liI;
}
function toFirst(iI11i, I1Iili) {
  I1Iili != 0 && iI11i.unshift(iI11i.splice(I1Iili, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const IlIiiI = Array.from(new Set($.whitelist.split("&")));
  console.log(IlIiiI.join("&") + "\n");
  let lll1l1 = [],
    llili1 = IlIiiI;
  for (let lll1il in cookiesArr) {
    let lll1ii = decodeURIComponent(cookiesArr[lll1il].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[lll1il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    llili1.includes(lll1ii) && lll1l1.push(cookiesArr[lll1il]);
  }
  helpCookiesArr = lll1l1;
  if (llili1.length > 1) {
    for (let IIllli in llili1) {
      let lIIll1 = llili1[llili1.length - 1 - IIllli];
      if (!lIIll1) continue;
      for (let Il1ii in helpCookiesArr) {
        let IiI11l = decodeURIComponent(helpCookiesArr[Il1ii].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[Il1ii].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        lIIll1 == IiI11l && toFirst(helpCookiesArr, Il1ii);
      }
    }
  }
}