/*
8.17-8.24 降暑囤货 嗨购一夏
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 8.17-8.24 降暑囤货 嗨购一夏 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#8.17-8.24 降暑囤货 嗨购一夏
11 11 11 11 * jd_opencardL329.js, tag=8.17-8.24 降暑囤货 嗨购一夏, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('8.17-8.24 降暑囤货 嗨购一夏')
const I1Il1l = $.isNode() ? require("./jdCookie.js") : "",
  I1Il1i = $.isNode() ? require("./sendNotify") : "";
let i1l = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  IlIiII = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const iIliI = require("./function/krgetToken"),
  i1IlII = require("./function/krh5st"),
  ilIii1 = require("./function/krgetua"),
  ll1III = require("./function/krwxSavePrize");
let ll1II1 = "https://lzdz1-isv.isvjcloud.com",
  l11lii = [],
  IIlIii = "",
  l11lil = {};
if ($.isNode()) {
  Object.keys(I1Il1l).forEach(iIlliI => {
    l11lii.push(I1Il1l[iIlliI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l11lii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIlllI($.getdata("CookiesJD") || "[]").map(IlIiIi => IlIiIi.cookie)].filter(IIlIi1 => !!IIlIi1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iIllli = "",
  iIlll1 = "",
  ilIiiI = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  I1Il1I = "",
  IIlIil = "";
$.whitelist = process.env.jd_opencard_whitelist || I1Il1I;
$.blacklist = process.env.jd_opencard_blacklist || IIlIil;
iIiIll();
I1Il11();
$.errMsgPin = [];
!(async () => {
  if (ilIiiI === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!l11lii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await iIllil("http://code.kingran.cf/329.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[l11lli(0, authorCodeList.length)];
  } else {
    let iI1iI1 = ["d5f4ac4c067e4467ab91584dd34ed29b", "b0f5784bde9742bea165a64ad9d7287e"];
    $.authorCode = iI1iI1[l11lli(0, iI1iI1.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "ec461baa774141a0a2fcc5734cce0241";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let i1IIii = 0; i1IIii < l11lii.length; i1IIii++) {
    IIlIii = l11lii[i1IIii];
    originCookie = l11lii[i1IIii];
    if (IIlIii) {
      $.UserName = decodeURIComponent(IIlIii.match(/pt_pin=([^; ]+)(?=;?)/) && IIlIii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1IIii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await ilIii1($.UserName);
      await l11llI();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let il111i = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + il111i;
  }
  if ($.outFlag) {
    let iI1iII = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + iI1iII);
    if ($.isNode()) await I1Il1i.sendNotify("" + $.name, "" + iI1iII);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(l111Ii => $.logErr(l111Ii)).finally(() => $.done());
async function l11llI() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    iIllli = "";
    $.Token = "";
    $.Pin = "";
    let i111ii = false;
    $.Token = await iIliI(IIlIii, ll1II1);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IlIiI1();
    if (iIlll1 == "") {
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
    await i1IlIi("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await i1IlIi("accessLogWithAD");
    await i1IlIi("activityContent");
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
    await i1IlIi("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await i1IlIi("checkOpenCard");
    await i1IlIi("taskRecord");
    await $.wait(1000);
    await i1IlIi("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          i111ii = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await iIllii();
          for (let iIilII = 0; iIilII < Array(2).length; iIilII++) {
            if (iIilII > 0) console.log("第" + iIilII + "次 重新开卡");
            await iIli1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await i1IlIi("activityContent");
          await i1IlIi("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else {
      console.log("已全部开卡");
    }
    !$.followShop && !$.outFlag && (console.log(""), await i1IlIi("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    if (IlIiII) {
      if (!$.addCart && !$.outFlag) {
        await i1IlIi("addCart");
        await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
      }
    }
    console.log("去助力 -> " + $.shareUuid);
    await i1IlIi("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await i1IlIi("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    i111ii && (await i1IlIi("activityContent"));
    if (i1l + "" !== "0") {
      $.runFalag = true;
      let il1Ii1 = parseInt($.score / 100);
      i1l = parseInt(i1l, 10);
      if (il1Ii1 > i1l) il1Ii1 = i1l;
      console.log("已设置抽奖次数为" + il1Ii1 + "次，当前有" + $.score + "金币");
      for (m = 1; il1Ii1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await i1IlIi("startDraw");
        if ($.runFalag == false) break;
        if (Number(il1Ii1) <= 0) break;
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
    await i1IlIi("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (iI1II) {
    console.log(iI1II);
  }
}
async function i1IlIi(IiIIII) {
  if ($.outFlag) return;
  let lIllII = "https://lzdz1-isv.isvjcloud.com",
    IIilIl = "",
    IIilIi = "POST";
  switch (IiIIII) {
    case "getSimpleActInfoVo":
      url = lIllII + "/dz/common/getSimpleActInfoVo";
      IIilIl = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = lIllII + "/customer/getMyPing";
      IIilIl = "userId=1000001132&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = lIllII + "/common/accessLogWithAD";
      let l1Iil1 = lIllII + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      IIilIl = "venderId=1000001132&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1Iil1) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = lIllII + "/wxActionCommon/getUserInfo";
      IIilIl = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = lIllII + "/dingzhi/joinCommon/activityContent";
      IIilIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = lIllII + "/dingzhi/joinCommon/drawContent";
      IIilIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = lIllII + "/dingzhi/joinCommon/taskInfo";
      IIilIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = lIllII + "/dingzhi/joinCommon/assist";
      IIilIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = lIllII + "/dingzhi/joinCommon/taskRecord";
      IIilIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = lIllII + "/dingzhi/joinCommon/doTask";
      IIilIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = lIllII + "/dingzhi/joinCommon/doTask";
      IIilIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = lIllII + "/dingzhi/joinCommon/doTask";
      IIilIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = lIllII + "/dingzhi/opencard/" + IiIIII;
      IIilIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (IiIIII == "browseGoods") IIilIl += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = lIllII + "/dingzhi/opencard/" + IiIIII;
      let IIiIl = "",
        iiiiI1 = "";
      if (IiIIII == "viewVideo") {
        IIiIl = 31;
        iiiiI1 = 31;
      } else {
        if (IiIIII == "visitSku") {
          IIiIl = 5;
          iiiiI1 = $.visitSkuValue || 5;
        } else {
          if (IiIIII == "toShop") {
            IIiIl = 14;
            iiiiI1 = $.toShopValue || 14;
          } else IiIIII == "addSku" && (IIiIl = 2, iiiiI1 = $.addSkuValue || 2);
        }
      }
      IIilIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + IIiIl + "&taskValue=" + iiiiI1;
      break;
    case "drawRecord":
      url = lIllII + "/dingzhi/joinCommon/drawRecord";
      IIilIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = lIllII + "/dingzhi/joinCommon/shareRecord";
      IIilIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = lIllII + "/dingzhi/joinCommon/startDraw";
      IIilIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + IiIIII);
  }
  let l1Iiil = ll1IIi(url, IIilIl, IIilIi);
  return new Promise(async i1ii1i => {
    $.post(l1Iiil, (lIlIii, li1Ili, I11lil) => {
      try {
        ll1IIl(li1Ili);
        if (lIlIii) {
          if (li1Ili && typeof li1Ili.statusCode != "undefined") {
            li1Ili.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n");
          }
          console.log("" + $.toStr(lIlIii, lIlIii));
          console.log("API请求失败，请检查网路重试");
        } else i1IlIl(IiIIII, I11lil);
      } catch (l1Iili) {
        console.log(l1Iili, li1Ili);
      } finally {
        i1ii1i();
      }
    });
  });
}
async function i1IlIl(l1Iill, iiiiIi) {
  let IIi11i = "";
  try {
    (l1Iill != "accessLogWithAD" || l1Iill != "drawContent") && iiiiIi && (IIi11i = JSON.parse(iiiiIi));
  } catch (IIiIii) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (l1Iill) {
      case "getSimpleActInfoVo":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            if (typeof IIi11i.data.shopId != "undefined") $.shopId = IIi11i.data.shopId;
            if (typeof IIi11i.data.venderId != "undefined") $.venderId = IIi11i.data.venderId;
          } else IIi11i.errorMessage ? console.log("" + (IIi11i.errorMessage || "")) : console.log("" + iiiiIi);
        } else console.log("" + iiiiIi);
        break;
      case "getMyPing":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            if (IIi11i.data && typeof IIi11i.data.secretPin != "undefined") $.Pin = IIi11i.data.secretPin;
            if (IIi11i.data && typeof IIi11i.data.nickname != "undefined") $.nickname = IIi11i.data.nickname;
          } else IIi11i.errorMessage ? (console.log("" + (IIi11i.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + iiiiIi);
        } else console.log("" + iiiiIi);
        break;
      case "getUserInfo":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            if (IIi11i.data && typeof IIi11i.data.yunMidImageUrl != "undefined") $.attrTouXiang = IIi11i.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else IIi11i.errorMessage ? console.log("" + (IIi11i.errorMessage || "")) : console.log("" + iiiiIi);
        } else console.log("" + iiiiIi);
        break;
      case "activityContent":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            $.endTime = IIi11i.data.endTime || IIi11i.data.activityVo && IIi11i.data.activityVo.endTime || IIi11i.data.activity.endTime || 0;
            $.hasEnd = IIi11i.data.isEnd || false;
            $.score = IIi11i.data.actorInfo.score || 0;
            $.actorUuid = IIi11i.data.actorInfo.uuid || "";
            $.assistCount = IIi11i.data.actorInfo.assistCount || 0;
          } else {
            if (IIi11i.errorMessage) {
              console.log("" + (IIi11i.errorMessage || ""));
            } else console.log("" + iiiiIi);
          }
        } else console.log("" + iiiiIi);
        break;
      case "assist":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            $.assistState = IIi11i.data.assistState || 0;
            $.allOpenCard = IIi11i.data.openCardInfo.openAll || false;
            $.openVenderId = IIi11i.data.openCardInfo.openVenderId || [];
            IIi11i?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (IIi11i?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else IIi11i.errorMessage ? console.log("" + (IIi11i.errorMessage || "")) : console.log("" + iiiiIi);
        } else console.log("" + iiiiIi);
        break;
      case "taskRecord":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            $.followShop = IIi11i.data["20"].recordCount || 0;
            $.addCart = IIi11i.data["23"].recordCount || 0;
            $.visitSku = IIi11i.data["10"].recordCount || 0;
          } else IIi11i.errorMessage ? console.log("" + (IIi11i.errorMessage || "")) : console.log("" + iiiiIi);
        } else {
          console.log("" + iiiiIi);
        }
        break;
      case "checkOpenCard":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            let IIiIlI = IIi11i.data["10"].settingInfo || [],
              ilII1I = IIi11i.data.cardList || [],
              iiIlI1 = IIi11i.data.openCardList || [];
            $.openList = [...ilII1I, ...IIiIlI, ...iiIlI1];
            $.openCardScore1 = IIi11i.data.score1 || 0;
            $.openCardScore2 = IIi11i.data.score2 || 0;
            $.drawScore = IIi11i.data.drawScore || 0;
            if (IIi11i.data.beans || IIi11i.data.addBeanNum) console.log("开卡获得：" + (IIi11i.data.beans || IIi11i.data.addBeanNum) + "京豆 🐶");
          } else IIi11i.errorMessage ? console.log("" + (IIi11i.errorMessage || "")) : console.log("" + iiiiIi);
        } else console.log("" + iiiiIi);
        break;
      case "addSku":
      case "followShop":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            console.log("完成任务,获得" + (IIi11i?.["data"]?.["beans"] || 0) + "京豆, " + (IIi11i?.["data"]?.["score"] || 0) + "金币");
          } else {
            if (IIi11i.errorMessage) {
              console.log("" + (IIi11i.errorMessage || ""));
            } else {
              console.log("" + iiiiIi);
            }
          }
        } else console.log("" + iiiiIi);
        break;
      case "startDraw":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            if (typeof IIi11i.data == "object") {
              drawInfo = IIi11i.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = IIi11i.data.addressId;
                    prizeName = drawInfo.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                    let I1i1 = await ll1III("https://lzdz1-isv.isvjcloud.com", IIlIii, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    I1i1 ? $.isNode() && (await I1Il1i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await I1Il1i.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + drawInfo.name + " 🎟️");
                    break;
                  case 13:
                    console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                    $.isNode() && (await I1Il1i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
            } else console.log("" + iiiiIi);
          } else IIi11i.errorMessage ? ($.runFalag = false, console.log("" + (IIi11i.errorMessage || ""))) : console.log("" + iiiiIi);
        } else console.log("" + iiiiIi);
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            if (typeof IIi11i.data == "object") {
              let Il1l11 = "",
                I1II1l = "抽奖";
              IIi11i.data.addBeanNum && (Il1l11 = IIi11i.data.addBeanNum + "京豆");
              IIi11i.data.addPoint && (Il1l11 += " " + IIi11i.data.addPoint + "游戏机会");
              if (l1Iill == "followShop") {
                I1II1l = "关注";
                IIi11i.data.beans != "0" && (Il1l11 += IIi11i.data.beans + "京豆 🐶");
              } else {
                if (l1Iill == "addSku" || l1Iill == "addCart") {
                  I1II1l = "加购";
                  IIi11i.data.beans != "0" && (Il1l11 += IIi11i.data.beans + "京豆 🐶");
                } else {
                  if (l1Iill == "viewVideo") I1II1l = "热门文章";else {
                    if (l1Iill == "toShop") I1II1l = "浏览店铺";else {
                      if (l1Iill == "visitSku" || l1Iill == "browseGoods") I1II1l = "浏览商品";else {
                        if (l1Iill == "sign") I1II1l = "签到";else {
                          let IIiIiI = typeof IIi11i.data.drawOk === "object" && IIi11i.data.drawOk || IIi11i.data;
                          Il1l11 = IIiIiI.drawOk == true && IIiIiI.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !Il1l11 && (Il1l11 = "空气 💨");
              console.log(I1II1l + "获得：" + (Il1l11 || iiiiIi));
            } else console.log("" + iiiiIi);
          } else {
            if (IIi11i.errorMessage) {
              $.runFalag = false;
              console.log("" + (IIi11i.errorMessage || ""));
            } else {
              console.log("" + iiiiIi);
            }
          }
        } else console.log("" + iiiiIi);
        break;
      case "drawRecord":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true) {
            let iiIlIl = 0;
            for (let iiIlIi of IIi11i.data) {
              infoType = iiIlIi.infoType;
              infoName = iiIlIi.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  iiIlIl += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await I1Il1i.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await I1Il1i.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            iiIlIl > 0 && console.log("当前累计获得 " + iiIlIl + " 京豆 🐶");
          } else IIi11i.errorMessage ? console.log("" + (IIi11i.errorMessage || "")) : console.log("" + iiiiIi);
        } else console.log("" + iiiiIi);
        break;
      case "getShareRecord":
        if (typeof IIi11i == "object") {
          if (IIi11i.result && IIi11i.result === true && IIi11i.data) {
            $.ShareCount = IIi11i.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else IIi11i.errorMessage ? console.log("" + (IIi11i.errorMessage || "")) : console.log("" + iiiiIi);
        } else console.log("" + iiiiIi);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(l1Iill + "-> " + iiiiIi);
    }
    typeof IIi11i == "object" && IIi11i.errorMessage && IIi11i.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (I1Iiil) {
    console.log(I1Iiil);
  }
}
function ll1IIi(I1Iiii, lIIliI, IiI111 = "POST") {
  let iIIi1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": IIlIii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return I1Iiii.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (iIIi1.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, iIIi1.Cookie = "" + (iIllli && iIllli || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + iIlll1), {
    "url": I1Iiii,
    "method": IiI111,
    "headers": iIIi1,
    "body": lIIliI,
    "timeout": 30000
  };
}
function IlIiI1() {
  return new Promise(iIlIl => {
    let i11lii = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(i11lii, async (I1Iii1, iiI1II, iIl11I) => {
      try {
        if (I1Iii1) {
          if (iiI1II && typeof iiI1II.statusCode != "undefined") {}
          console.log("" + $.toStr(I1Iii1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iIlII = iIl11I.match(/(活动已经结束)/) && iIl11I.match(/(活动已经结束)/)[1] || "";
          iIlII && ($.activityEnd = true, console.log("活动已结束"));
          ll1IIl(iiI1II);
        }
      } catch (iIiII1) {
        $.logErr(iIiII1, iiI1II);
      } finally {
        iIlIl();
      }
    });
  });
}
function ll1IIl(I1l1) {
  if (I1l1) {
    if (I1l1.headers["set-cookie"]) {
      IIlIii = originCookie + ";";
      for (let lIiiiI of I1l1.headers["set-cookie"]) {
        l11lil[lIiiiI.split(";")[0].substr(0, lIiiiI.split(";")[0].indexOf("="))] = lIiiiI.split(";")[0].substr(lIiiiI.split(";")[0].indexOf("=") + 1);
      }
      for (const iiI1Il of Object.keys(l11lil)) {
        IIlIii += iiI1Il + "=" + l11lil[iiI1Il] + ";";
      }
      iIlll1 = IIlIii;
    }
  }
}
function l11ll1(iiI1Ii) {
  iiI1Ii = iiI1Ii || 32;
  let IlIiil = "abcdef0123456789",
    IlIiii = IlIiil.length,
    ilIII1 = "";
  for (i = 0; i < iiI1Ii; i++) ilIII1 += IlIiil.charAt(Math.floor(Math.random() * IlIiii));
  return ilIII1;
}
function iIlllI(iIlI1) {
  if (typeof iIlI1 == "string") {
    try {
      return JSON.parse(iIlI1);
    } catch (lll1l1) {
      return console.log(lll1l1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function iIli1() {
  if (!$.joinVenderId) return;
  return new Promise(async iilI1l => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I1IilI = "";
    if ($.shopactivityId) I1IilI = ",\"activityId\":" + $.shopactivityId;
    const iIllII = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I1IilI + ",\"channel\":406}",
      lli1I = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIllII)
      },
      IlIilI = await i1IlII("8adfb", lli1I),
      Il1il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iIllII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlIilI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IIlIii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Il1il, async (IiI11i, iIil1l, iIil11) => {
      try {
        if (IiI11i) iIil1l && typeof iIil1l.statusCode != "undefined" && iIil1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iIil11 = iIil11 && iIil11.match(/jsonp_.*?\((.*?)\);/) && iIil11.match(/jsonp_.*?\((.*?)\);/)[1] || iIil11;
          let lll1iI = $.toObj(iIil11, iIil11);
          if (lll1iI && typeof lll1iI == "object") {
            if (lll1iI && lll1iI.success === true) {
              console.log(" >> " + lll1iI.message);
              $.errorJoinShop = lll1iI.message;
              if (lll1iI.result && lll1iI.result.giftInfo) {
                for (let lIIlil of lll1iI.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + lIIlil.discountString + lIIlil.prizeName + lIIlil.secondLineDesc);
                }
              }
            } else lll1iI && typeof lll1iI == "object" && lll1iI.message ? ($.errorJoinShop = lll1iI.message, console.log("" + (lll1iI.message || ""))) : console.log(iIil11);
          } else console.log(iIil11);
        }
      } catch (l1I111) {
        $.logErr(l1I111, iIil1l);
      } finally {
        iilI1l();
      }
    });
  });
}
async function iIllii() {
  return new Promise(async l1liII => {
    const I1ii1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      li1111 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1ii1)
      },
      IiliI = await i1IlII("8adfb", li1111),
      IiIIiI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I1ii1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IiliI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IIlIii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IiIIiI, async (I11IiI, l111il, Il1lI) => {
      try {
        if (I11IiI) l111il && typeof l111il.statusCode != "undefined" && l111il.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          Il1lI = Il1lI && Il1lI.match(/jsonp_.*?\((.*?)\);/) && Il1lI.match(/jsonp_.*?\((.*?)\);/)[1] || Il1lI;
          let l1lil = $.toObj(Il1lI, Il1lI);
          l1lil && typeof l1lil == "object" ? l1lil && l1lil.success == true && (console.log("去加入：" + (l1lil.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = l1lil.result.interestsRuleList && l1lil.result.interestsRuleList[0] && l1lil.result.interestsRuleList[0].interestsInfo && l1lil.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(Il1lI);
        }
      } catch (lli1i) {
        $.logErr(lli1i, l111il);
      } finally {
        l1liII();
      }
    });
  });
}
function iIllil(IiiiIl) {
  return new Promise(I11Iil => {
    const llill1 = {
      "url": "" + IiiiIl,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(llill1, async (Iill1, ll1il1, illi1I) => {
      try {
        if (Iill1) {} else illi1I ? illi1I = JSON.parse(illi1I) : console.log("未获取到数据,请重新运行");
      } catch (i1IIIi) {
        $.logErr(i1IIIi, ll1il1);
        illi1I = null;
      } finally {
        I11Iil(illi1I);
      }
    });
  });
}
function l11lli(li111l, l111lI) {
  return Math.floor(Math.random() * (l111lI - li111l)) + li111l;
}
function I1Il11() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1ilI = Array.from(new Set($.blacklist.split("&")));
  console.log(I1ilI.join("&") + "\n");
  let iilii1 = I1ilI,
    llilil = [],
    il1lii = false;
  for (let l1ii1l = 0; l1ii1l < l11lii.length; l1ii1l++) {
    let l111ll = decodeURIComponent(l11lii[l1ii1l].match(/pt_pin=([^; ]+)(?=;?)/) && l11lii[l1ii1l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!l111ll) break;
    let l1liIi = false;
    for (let I11Ii1 of iilii1) {
      if (I11Ii1 && I11Ii1 == l111ll) {
        l1liIi = true;
        break;
      }
    }
    !l1liIi && (il1lii = true, llilil.splice(l1ii1l, -1, l11lii[l1ii1l]));
  }
  if (il1lii) l11lii = llilil;
}
function IlIiIl(l1liIl, l111li) {
  l111li != 0 && l1liIl.unshift(l1liIl.splice(l111li, 1)[0]);
}
function iIiIll() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(l11lii, l11lii));
    return;
  }
  console.log("当前已设置白名单：");
  const IiIlIl = Array.from(new Set($.whitelist.split("&")));
  console.log(IiIlIl.join("&") + "\n");
  let iiliiI = [],
    Il1li = IiIlIl;
  for (let IlII1i in l11lii) {
    let Iilli = decodeURIComponent(l11lii[IlII1i].match(/pt_pin=([^; ]+)(?=;?)/) && l11lii[IlII1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (Il1li.includes(Iilli)) {
      iiliiI.push(l11lii[IlII1i]);
    }
  }
  helpCookiesArr = iiliiI;
  if (Il1li.length > 1) for (let lIiiil in Il1li) {
    let ll1I1I = Il1li[Il1li.length - 1 - lIiiil];
    if (!ll1I1I) continue;
    for (let IiIIli in helpCookiesArr) {
      let IlII11 = decodeURIComponent(helpCookiesArr[IiIIli].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[IiIIli].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      ll1I1I == IlII11 && IlIiIl(helpCookiesArr, IiIIli);
    }
  }
}