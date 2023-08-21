/*
大牌联合0816期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230816def/oC20230816def?actId=edb27bbb5b7544a5_230816

自行运行，有水无水自测。

变量填写：
黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 
重试次数，默认30
//export retrynum="30"
如需修改抽奖次数请设置环境变量：
//export opencard_draw="3" //次数
填地址变量看库说明

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码
============Quantumultx===============
[task_local]
#大牌联合0816期
1 1 1 1 * jd_dplh0816.js, tag=大牌联合0816期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0816期");
const ilIll1 = $.isNode() ? require("./jdCookie.js") : "",
  I1IIil = $.isNode() ? require("./sendNotify") : "";
let I1IIii = [],
  iIIIlI = "";
if ($.isNode()) {
  Object.keys(ilIll1).forEach(lIiIiI => {
    I1IIii.push(ilIll1[lIiIiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1IIii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...li11lI($.getdata("CookiesJD") || "[]").map(ilIliI => ilIliI.cookie)].filter(II1li => !!II1li);
let li11i1 = "30",
  II1l1 = "0";
li11i1 = $.isNode() ? process.env.retrynum ? process.env.retrynum : li11i1 : $.getdata("retrynum") ? $.getdata("retrynum") : II1l1;
II1l1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : II1l1 : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : II1l1;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let liii1i = "",
  IIll1l = "",
  l1I1lI = "edb27bbb5b7544a5_230816";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const iIIIl1 = require("./function/krgetToken"),
  li11iI = require("./function/krh5st"),
  liliIl = require("./function/krgetua");
let liii1l = "https://jinggengjcq-isv.isvjcloud.com";
IIll1l = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IIll1l : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IIll1l;
let I1iiII = "",
  liliIi = "";
$.whitelist = process.env.DPLHTY_whitelist || I1iiII;
$.blacklist = process.env.DPLHTY_blacklist || liliIi;
iIIIi1();
li1ii();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = IIll1l ? IIll1l : authorCodeList[iIiiI1(0, authorCodeList.length)];
  } else {
    let iliiil = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = IIll1l ? IIll1l : iliiil[iIiiI1(0, iliiil.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 默认抽奖次数：" + II1l1 + " 💬 重试次数：" + li11i1);
  console.log("\n💬 请在有水的情况下运行");
  process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let li1l1 = [];
    li1l1 = UserAdd_Data_Arr.split("|");
    var li11il = Math.floor(Math.random() * li1l1.length);
    if (li1l1[li11il] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else li1l1 = li1l1[li11il];
    if (process.env.jd_jinggeng_address) {
      li1l1 = li1l1.split("@");
      if (li1l1.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let IIiI1l = 0; IIiI1l < 6; IIiI1l++) {
        if (li1l1[IIiI1l] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      li1l1 = li1l1.split("@");
      if (li1l1.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let IIiI1i = 0; IIiI1i < 7; IIiI1i++) {
        if (li1l1[IIiI1i] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = li1l1[0];
    $.phone = li1l1[1];
    $.province = li1l1[2];
    $.city = li1l1[3];
    $.county = li1l1[4];
    $.address = li1l1[5];
  }
  if (!I1IIii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = l1I1lI;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let Il1I1i = 0; Il1I1i < I1IIii.length; Il1I1i++) {
    iIIIlI = I1IIii[Il1I1i];
    if (iIIIlI) {
      $.UserName = decodeURIComponent(iIIIlI.match(/pt_pin=([^; ]+)(?=;?)/) && iIIIlI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Il1I1i + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await liliIl($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await i1Ili();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let Il1I1l = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + Il1I1l);
    if ($.isNode()) await I1IIil.sendNotify("" + $.name, "" + Il1I1l);
  }
})().catch(Ii1Il1 => $.logErr(Ii1Il1)).finally(() => $.done());
async function i1Ili() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    liii1i = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await iIIIl1(iIIIlI, liii1l);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await I1iiI1("activity_load");
    for (let l1I1il = 0; l1I1il < li11i1; l1I1il++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1iiI1("activity_load");
        if ($.krFlag) break;
      }
    }
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("❌ 获取[活动信息]失败，可能是黑号或者太卡了");
      return;
    }
    $.toBind = 0;
    $.openList = [];
    await I1iiI1("绑定");
    for (let III1ii = 0; III1ii < li11i1; III1ii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1iiI1("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await I1iiI1("shopList");
    for (let l1I1ii = 0; l1I1ii < li11i1; l1I1ii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1iiI1("shopList");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.activityEnd) return;
    for (o of $.openList) {
      $.missionType = "openCard";
      if (o.open != true && o.openCardUrl) {
        if ($.activityEnd) return;
        if ($.outEnd) return;
        $.openCard = false;
        $.joinVenderId = o.userId;
        await I1iiI1("mission");
        for (let I1IlI1 = 0; I1IlI1 < li11i1; I1IlI1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await I1iiI1("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await l1I1ll();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await l1I1ll(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1iiI1("activity_load");
          for (let IlIi1i = 0; IlIi1i < li11i1; IlIi1i++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await I1iiI1("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1iiI1("shopList");
          for (let lIllii = 0; lIllii < li11i1; lIllii++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await I1iiI1("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await I1iiI1("mission");
      for (let iiiIiI = 0; iiiIiI < li11i1; iiiIiI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1iiI1("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await I1iiI1("mission");
      for (let illl1I = 0; illl1I < li11i1; illl1I++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1iiI1("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await I1iiI1("activity_load");
    for (let lillI = 0; lillI < li11i1; lillI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1iiI1("activity_load");
        if ($.krFlag) break;
      }
    }
    if (II1l1 + "" !== "0") {
      $.runFalag = true;
      let Il11i = parseInt($.remainPoint / 200);
      II1l1 = parseInt(II1l1, 10);
      if (Il11i > II1l1) Il11i = II1l1;
      console.log("💖 抽奖次数为:" + Il11i + "，当前积分：" + $.remainPoint);
      for (m = 1; Il11i--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1iiI1("抽奖");
        for (let illl11 = 0; illl11 < li11i1; illl11++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await I1iiI1("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(Il11i) <= 0) break;
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("🔊 后面的号都会助力:" + $.inviteNick));
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  } catch (l1iiii) {
    console.log(l1iiii);
  }
}
async function I1iiI1(Il11I) {
  if ($.outFlag) return;
  let lill1 = "https://jinggengjcq-isv.isvjcloud.com",
    IiIIl = "",
    IiIIi = "POST",
    li1lli = "";
  switch (Il11I) {
    case "activity_load":
      url = lill1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1lli = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) li1lli = {
        ...li1lli,
        "shopId": "" + $.joinVenderId
      };
      IiIIl = IIlIIl("/jdBigAlliance/activity/load", li1lli);
      break;
    case "shopList":
      url = lill1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1lli = {};
      IiIIl = IIlIIl("/jdBigAlliance/shop/shopList", li1lli);
      break;
    case "绑定":
      url = lill1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1lli = {
        "inviterNick": $.inviteNick || ""
      };
      IiIIl = IIlIIl("/jdBigAlliance/customer/inviteRelation", li1lli);
      break;
    case "mission":
      url = lill1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1lli = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) li1lli = {
        ...li1lli,
        "shopId": $.joinVenderId
      };
      IiIIl = IIlIIl("/jdBigAlliance/mission/completeMission", li1lli);
      break;
    case "抽奖":
      url = lill1 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1lli = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      IiIIl = IIlIIl("/jdBigAlliance/interactive/drawPost", li1lli);
      break;
    case "updateAddress":
      url = lill1 + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1lli = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      IiIIl = IIlIIl("/jdBigAlliance/awards/updateAddress", li1lli);
      break;
    default:
      console.log("错误" + Il11I);
  }
  let iiiIl1 = li11l1(url, IiIIl, IiIIi);
  return new Promise(async Ill1ii => {
    $.post(iiiIl1, (iiiIii, IllI1, iiiIil) => {
      try {
        if (iiiIii) {
          IllI1 && IllI1.statusCode && IllI1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else lIiIi1(Il11I, iiiIil);
      } catch (iiII) {
        console.log(iiII, IllI1);
      } finally {
        Ill1ii();
      }
    });
  });
}
async function lIiIi1(Ill1iI, i1Ii1l) {
  let i1Ii1i = "";
  try {
    $.krFlag = true;
    (Ill1iI != "accessLogWithAD" || Ill1iI != "drawContent") && i1Ii1l && (i1Ii1i = JSON.parse(i1Ii1l));
  } catch (Ililli) {
    console.log("🤬 " + Ill1iI + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let lii1 = "";
    switch (Ill1iI) {
      case "抽奖":
        if (typeof i1Ii1i == "object") {
          if (i1Ii1i.success && i1Ii1i.success === true && i1Ii1i.data) {
            if (i1Ii1i.data.status && i1Ii1i.data.status == 200) {
              if (i1Ii1i.data.data.sendResult) {
                console.log("抽中：" + i1Ii1i.data.data.awardSetting.awardName);
                i1Ii1i.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = i1Ii1i.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await I1iiI1("updateAddress"), await $.wait(4000));
              } else !i1Ii1i.data.data.result ? console.log("💔 空气") : console.log(i1Ii1i.data.data);
            } else {
              if (i1Ii1i.data.status && i1Ii1i.data.status == 500) {
                console.log("" + (i1Ii1i.data.msg || ""));
              }
            }
          } else i1Ii1i.message ? console.log("" + (i1Ii1i.message || "")) : console.log(i1Ii1l);
        } else {
          console.log(i1Ii1l);
        }
        break;
      case "updateAddress":
        if (typeof i1Ii1i == "object") {
          if (i1Ii1i.success && i1Ii1i.success === true && i1Ii1i.data) {
            if (i1Ii1i.data.status && i1Ii1i.data.status == 200) i1Ii1i.data.data.result ? console.log("💖 地址填写成功，返回：" + i1Ii1i.data.data.msg) : console.log(i1Ii1i.data.data);else i1Ii1i.data.status && i1Ii1i.data.status == 500 && console.log("" + (i1Ii1i.data.msg || ""));
          } else i1Ii1i.message ? console.log("" + (i1Ii1i.message || "")) : console.log(i1Ii1l);
        } else console.log(i1Ii1l);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      case "activity_load":
      case "mission":
      case "shopList":
      case "loadUniteOpenCard":
      case "setMixNick":
      case "uniteOpenCardOne":
      case "checkOpenCard":
      case "followShop":
      case "addCart":
      case "myAward":
      case "missionInviteList":
      case "绑定":
        lii1 = "";
        if (Ill1iI == "followShop") lii1 = "关注";
        if (Ill1iI == "addCart") lii1 = "加购";
        if (typeof i1Ii1i == "object") {
          if (i1Ii1i.success && i1Ii1i.success === true && i1Ii1i.data) {
            if (i1Ii1i.data.status && i1Ii1i.data.status == 200) {
              i1Ii1i = i1Ii1i.data;
              if (Ill1iI != "setMixNick" && (i1Ii1i.msg || i1Ii1i.data.isOpenCard || i1Ii1i.data.remark)) console.log("🔊 " + (lii1 && lii1 + ":" || "") + (i1Ii1i.msg || i1Ii1i.data.isOpenCard || i1Ii1i.data.remark || ""));
              if (Ill1iI == "activity_load") {
                if (i1Ii1i.msg || i1Ii1i.data.isOpenCard) {
                  if ((i1Ii1i.msg || i1Ii1i.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                i1Ii1i.data && ($.endTime = i1Ii1i.data.cusActivity.endTime || 0, $.MixNick = i1Ii1i.data.missionCustomer.buyerNick || "", $.usedChance = i1Ii1i.data.missionCustomer.usedChance || 0, $.remainPoint = i1Ii1i.data.missionCustomer.remainPoint || 0, $.hasCollectShop = i1Ii1i.data.missionCustomer.hasCollectShop || 0, $.hasAddCart = i1Ii1i.data.missionCustomer.hasAddCart || 0);
              } else {
                if (Ill1iI == "shopList") $.openList = i1Ii1i.data || [];else {
                  if (Ill1iI == "mission") i1Ii1i.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (Ill1iI == "uniteOpenCardOne") {
                      $.uniteOpenCar = i1Ii1i.msg || i1Ii1i.data.msg || "";
                    } else {
                      if (Ill1iI == "myAward") {
                        console.log("🔊 我的奖品：");
                        let II1i11 = 0;
                        for (let IlillI in i1Ii1i.data.list || []) {
                          let I111l1 = i1Ii1i.data.list[IlillI];
                          II1i11 += Number(I111l1.awardDes);
                        }
                        if (II1i11 > 0) console.log("🔊 共获得" + II1i11 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else Ill1iI == "missionInviteList" && console.log("🔊 邀请人数(" + i1Ii1i.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (i1Ii1i.data.msg) {
                i1Ii1i.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (i1Ii1i.data.msg || ""));
              } else {
                if (i1Ii1i.errorMessage) {
                  if (i1Ii1i.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (i1Ii1i.errorMessage || ""));
                } else console.log("" + i1Ii1l);
              }
            }
          } else i1Ii1i.errorMessage ? console.log("🔊 " + (i1Ii1i.errorMessage || "")) : console.log("" + i1Ii1l);
        } else {}
        break;
      default:
        console.log((lii1 || Ill1iI) + "-> " + i1Ii1l);
    }
    if (typeof i1Ii1i == "object") {
      if (i1Ii1i.errorMessage) {
        if (i1Ii1i.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (iIill) {}
}
function li11l1(iil1Ii, iii11i, iii11l = "POST") {
  let IIl11l = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iIIIlI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iil1Ii.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (IIl11l.Origin = "https://jinggengjcq-isv.isvjcloud.com", IIl11l["Content-Type"] = "application/json; charset=utf-8", delete IIl11l.Cookie), {
    "url": iil1Ii,
    "method": iii11l,
    "headers": IIl11l,
    "body": iii11i,
    "timeout": 30 * 1000
  };
}
function IIlIIl(l1Ilil, iIili) {
  d = {
    "actId": $.actId,
    ...iIili,
    "method": l1Ilil,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = I1IIiI(d);
  const iil1Il = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "oba": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ...iIili,
        "method": l1Ilil,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return l1Ilil.indexOf("missionInviteList") > -1 && delete iil1Il.params.admJson.actId, $.toStr(iil1Il, iil1Il);
}
function iIiiI1(iliil1, i1i1ll) {
  return Math.floor(Math.random() * (i1i1ll - iliil1)) + iliil1;
}
function I1IIiI(iI11iI) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(iI11iI));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret;
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    "sign": sign,
    "timeStamp": time2
  };
}
function ilIli1(lIi1Ii) {
  lIi1Ii = lIi1Ii || 32;
  let IIiIII = "abcdef0123456789",
    lili = IIiIII.length,
    lIi1Il = "";
  for (i = 0; i < lIi1Ii; i++) lIi1Il += IIiIII.charAt(Math.floor(Math.random() * lili));
  return lIi1Il;
}
function li11lI(ii1iI1) {
  if (typeof ii1iI1 == "string") try {
    return JSON.parse(ii1iI1);
  } catch (liIl1I) {
    return console.log(liIl1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function l1I1ll() {
  if (!$.joinVenderId) return;
  return new Promise(async IIl11i => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l1iiiI = "";
    if ($.shopactivityId) l1iiiI = ",\"activityId\":" + $.shopactivityId;
    const Ii111l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l1iiiI + ",\"channel\":406}",
      iI11li = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii111l)
      };
    for (var ii1iIl = "", Ill1l1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", Ilili1 = 0; Ilili1 < 16; Ilili1++) {
      var iIiiI = Math.round(Math.random() * (Ill1l1.length - 1));
      ii1iIl += Ill1l1.substring(iIiiI, iIiiI + 1);
    }
    uuid = Buffer.from(ii1iIl, "utf8").toString("base64");
    ep = encodeURIComponent(JSON.stringify({
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "ts": new Date().getTime(),
      "ridx": -1,
      "cipher": {
        "screen": "CJS0CseyCtK4",
        "osVersion": "CJGkEK==",
        "uuid": uuid
      },
      "ciphertype": 5,
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile"
    }));
    const lIi11 = await li11iI("8adfb", iI11li),
      i11II1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ii111l + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIi11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIIIlI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11II1, async (Ilill1, I111lI, l1iii1) => {
      try {
        if (Ilill1) I111lI && typeof I111lI.statusCode != "undefined" && I111lI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          l1iii1 = l1iii1 && l1iii1.match(/jsonp_.*?\((.*?)\);/) && l1iii1.match(/jsonp_.*?\((.*?)\);/)[1] || l1iii1;
          let liIl1i = $.toObj(l1iii1, l1iii1);
          if (liIl1i && typeof liIl1i == "object") {
            if (liIl1i && liIl1i.success === true) {
              console.log(" >> " + liIl1i.message);
              $.errorJoinShop = liIl1i.message;
              if (liIl1i.result && liIl1i.result.giftInfo) {
                for (let liIl1l of liIl1i.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + liIl1l.discountString + liIl1l.prizeName + liIl1l.secondLineDesc);
                }
              }
            } else {
              if (liIl1i && typeof liIl1i == "object" && liIl1i.message) {
                $.errorJoinShop = liIl1i.message;
                console.log("" + (liIl1i.message || ""));
              } else console.log(l1iii1);
            }
          } else console.log(l1iii1);
        }
      } catch (Ililii) {
        $.logErr(Ililii, I111lI);
      } finally {
        IIl11i();
      }
    });
  });
}
async function li1il() {
  return new Promise(async lI11 => {
    const Ii1lll = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      I1IIII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii1lll)
      };
    await $.wait(1000);
    const I1I1 = await li11iI("8adfb", I1IIII),
      Ii1lI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Ii1lll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1I1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIIIlI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii1lI, async (iIiIlI, liII1i, iIiIil) => {
      try {
        if (iIiIlI) liII1i && typeof liII1i.statusCode != "undefined" && liII1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iIiIil = iIiIil && iIiIil.match(/jsonp_.*?\((.*?)\);/) && iIiIil.match(/jsonp_.*?\((.*?)\);/)[1] || iIiIil;
          let i11 = $.toObj(iIiIil, iIiIil);
          if (i11 && typeof i11 == "object") {
            i11 && i11.success == true && (console.log("去加入：" + (i11.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i11.result.interestsRuleList && i11.result.interestsRuleList[0] && i11.result.interestsRuleList[0].interestsInfo && i11.result.interestsRuleList[0].interestsInfo.activityId || "");
          } else {
            console.log(iIiIil);
          }
        }
      } catch (Ii1ll1) {
        $.logErr(Ii1ll1, liII1i);
      } finally {
        lI11();
      }
    });
  });
}
function l1I1li(IIlIlI) {
  return new Promise(iIiIiI => {
    const lIiII1 = {
      "url": "" + IIlIlI,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIiII1, async (il1Ill, il1Ili, i1IlI1) => {
      try {
        if (il1Ill) {} else {
          if (i1IlI1) {
            i1IlI1 = JSON.parse(i1IlI1);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (li11Ii) {
        $.logErr(li11Ii, il1Ili);
        i1IlI1 = null;
      } finally {
        iIiIiI(i1IlI1);
      }
    });
  });
}
function iIiiI1(i1i, I1Il1l) {
  return Math.floor(Math.random() * (I1Il1l - i1i)) + i1i;
}
function li1ii() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const ll1III = Array.from(new Set($.blacklist.split("&")));
  console.log(ll1III.join("&") + "\n");
  let ll1II1 = ll1III,
    l11lii = [],
    IIlIii = false;
  for (let i1IlIl = 0; i1IlIl < I1IIii.length; i1IlIl++) {
    let ll1IIi = decodeURIComponent(I1IIii[i1IlIl].match(/pt_pin=([^; ]+)(?=;?)/) && I1IIii[i1IlIl].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ll1IIi) break;
    let IlIiI1 = false;
    for (let ll1IIl of ll1II1) {
      if (ll1IIl && ll1IIl == ll1IIi) {
        IlIiI1 = true;
        break;
      }
    }
    !IlIiI1 && (IIlIii = true, l11lii.splice(i1IlIl, -1, I1IIii[i1IlIl]));
  }
  if (IIlIii) I1IIii = l11lii;
}
function lI1iI1(l11ll1, iIlllI) {
  iIlllI != 0 && l11ll1.unshift(l11ll1.splice(iIlllI, 1)[0]);
}
function iIIIi1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(I1IIii, I1IIii));
    return;
  }
  console.log("当前已设置白名单：");
  const iIllii = Array.from(new Set($.whitelist.split("&")));
  console.log(iIllii.join("&") + "\n");
  let iIllil = [],
    l11lli = iIllii;
  for (let IiIII1 in I1IIii) {
    let I1II1 = decodeURIComponent(I1IIii[IiIII1].match(/pt_pin=([^; ]+)(?=;?)/) && I1IIii[IiIII1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (l11lli.includes(I1II1)) {
      iIllil.push(I1IIii[IiIII1]);
    }
  }
  helpCookiesArr = iIllil;
  if (l11lli.length > 1) for (let lili11 in l11lli) {
    let lIllIi = l11lli[l11lli.length - 1 - lili11];
    if (!lIllIi) continue;
    for (let iIi11l in helpCookiesArr) {
      let lIllIl = decodeURIComponent(helpCookiesArr[iIi11l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iIi11l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lIllIi == lIllIl && lI1iI1(helpCookiesArr, iIi11l);
    }
  }
}