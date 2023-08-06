/*
大牌联合0805期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230805dda/oC20230805dda?actId=0248e06bd1694f1_230805

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
#大牌联合0805期
1 1 1 1 * jd_dplh0805.js, tag=大牌联合0805期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0805期");
const I1IIli = $.isNode() ? require("./jdCookie.js") : "",
  Il1I1i = $.isNode() ? require("./sendNotify") : "";
let lIilI1 = [],
  Il1I1l = "";
if ($.isNode()) {
  Object.keys(I1IIli).forEach(i1lIl => {
    lIilI1.push(I1IIli[i1lIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lIilI1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1I11i($.getdata("CookiesJD") || "[]").map(i1lIi => i1lIi.cookie)].filter(iilIiI => !!iilIiI);
let Ii1Il1 = "30",
  iIIIli = "0";
Ii1Il1 = $.isNode() ? process.env.retrynum ? process.env.retrynum : Ii1Il1 : $.getdata("retrynum") ? $.getdata("retrynum") : iIIIli;
iIIIli = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : iIIIli : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : iIIIli;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I1IIll = "",
  ilIlli = "",
  I1IIlI = "0248e06bd1694f1_230805";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const ilIlll = require("./function/krgetToken"),
  Ii1Iii = require("./function/krh5st"),
  Ii1Iil = require("./function/krgetua");
let ll1IiI = "https://jinggengjcq-isv.isvjcloud.com";
ilIlli = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + ilIlli : $.getdata("helpnum") ? $.getdata("helpnum") : "" + ilIlli;
let li1li = "",
  iIIIll = "";
$.whitelist = process.env.DPLHTY_whitelist || li1li;
$.blacklist = process.env.DPLHTY_blacklist || iIIIll;
l1lIIl();
iII11I();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = ilIlli ? ilIlli : authorCodeList[iilIi1(0, authorCodeList.length)];
  } else {
    let IlIi11 = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = ilIlli ? ilIlli : IlIi11[iilIi1(0, IlIi11.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 默认抽奖次数：" + iIIIli + " 💬 重试次数：" + Ii1Il1);
  console.log("\n💬 请在有水的情况下运行");
  process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let iIIlIl = [];
    iIIlIl = UserAdd_Data_Arr.split("|");
    var Ili1iI = Math.floor(Math.random() * iIIlIl.length);
    if (iIIlIl[Ili1iI] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else {
      iIIlIl = iIIlIl[Ili1iI];
    }
    if (process.env.jd_jinggeng_address) {
      iIIlIl = iIIlIl.split("@");
      if (iIIlIl.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let iilIli = 0; iilIli < 6; iilIli++) {
        if (iIIlIl[iilIli] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      iIIlIl = iIIlIl.split("@");
      if (iIIlIl.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let i111I = 0; i111I < 7; i111I++) {
        if (iIIlIl[i111I] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = iIIlIl[0];
    $.phone = iIIlIl[1];
    $.province = iIIlIl[2];
    $.city = iIIlIl[3];
    $.county = iIIlIl[4];
    $.address = iIIlIl[5];
  }
  if (!lIilI1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = I1IIlI;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let iilIl1 = 0; iilIl1 < lIilI1.length; iilIl1++) {
    Il1I1l = lIilI1[iilIl1];
    if (Il1I1l) {
      $.UserName = decodeURIComponent(Il1I1l.match(/pt_pin=([^; ]+)(?=;?)/) && Il1I1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iilIl1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await Ii1Iil($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await ll1Ii1();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let III1i1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + III1i1);
    if ($.isNode()) await Il1I1i.sendNotify("" + $.name, "" + III1i1);
  }
})().catch(I1IlIl => $.logErr(I1IlIl)).finally(() => $.done());
async function ll1Ii1() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    I1IIll = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await ilIlll(Il1I1l, ll1IiI);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await li1ll("activity_load");
    for (let Il1ili = 0; Il1ili < Ii1Il1; Il1ili++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li1ll("activity_load");
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
    await li1ll("绑定");
    for (let liIIII = 0; liIIII < Ii1Il1; liIIII++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li1ll("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await li1ll("shopList");
    for (let IIllII = 0; IIllII < Ii1Il1; IIllII++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li1ll("shopList");
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
        await li1ll("mission");
        for (let liiI = 0; liiI < Ii1Il1; liiI++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await li1ll("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await l1iI1l();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await l1iI1l(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await li1ll("activity_load");
          for (let I111il = 0; I111il < Ii1Il1; I111il++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await li1ll("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await li1ll("shopList");
          for (let iliili = 0; iliili < Ii1Il1; iliili++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await li1ll("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await li1ll("mission");
      for (let Ililli = 0; Ililli < Ii1Il1; Ililli++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await li1ll("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await li1ll("mission");
      for (let iIii1l = 0; iIii1l < Ii1Il1; iIii1l++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await li1ll("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await li1ll("activity_load");
    for (let i1i1l1 = 0; i1i1l1 < Ii1Il1; i1i1l1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li1ll("activity_load");
        if ($.krFlag) break;
      }
    }
    if (iIIIli + "" !== "0") {
      $.runFalag = true;
      let iIliI1 = parseInt($.remainPoint / 200);
      iIIIli = parseInt(iIIIli, 10);
      if (iIliI1 > iIIIli) iIliI1 = iIIIli;
      console.log("💖 抽奖次数为:" + iIliI1 + "，当前积分：" + $.remainPoint);
      for (m = 1; iIliI1--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li1ll("抽奖");
        for (let iIii11 = 0; iIii11 < Ii1Il1; iIii11++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await li1ll("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(iIliI1) <= 0) break;
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    if ($.index == 1) {
      $.inviteNick = $.MixNick;
      console.log("🔊 后面的号都会助力:" + $.inviteNick);
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  } catch (IlillI) {
    console.log(IlillI);
  }
}
async function li1ll(I111l1) {
  if ($.outFlag) return;
  let iIii1I = "https://jinggengjcq-isv.isvjcloud.com",
    I1liI1 = "",
    I1ii11 = "POST",
    IlIil = "";
  switch (I111l1) {
    case "activity_load":
      url = iIii1I + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) IlIil = {
        ...IlIil,
        "shopId": "" + $.joinVenderId
      };
      I1liI1 = lIllil("/jdBigAlliance/activity/load", IlIil);
      break;
    case "shopList":
      url = iIii1I + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil = {};
      I1liI1 = lIllil("/jdBigAlliance/shop/shopList", IlIil);
      break;
    case "绑定":
      url = iIii1I + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil = {
        "inviterNick": $.inviteNick || ""
      };
      I1liI1 = lIllil("/jdBigAlliance/customer/inviteRelation", IlIil);
      break;
    case "mission":
      url = iIii1I + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) IlIil = {
        ...IlIil,
        "shopId": $.joinVenderId
      };
      I1liI1 = lIllil("/jdBigAlliance/mission/completeMission", IlIil);
      break;
    case "抽奖":
      url = iIii1I + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      I1liI1 = lIllil("/jdBigAlliance/interactive/drawPost", IlIil);
      break;
    case "updateAddress":
      url = iIii1I + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      I1liI1 = lIllil("/jdBigAlliance/awards/updateAddress", IlIil);
      break;
    default:
      console.log("错误" + I111l1);
  }
  let iI11i1 = i1IiI(url, I1liI1, I1ii11);
  return new Promise(async i11l1I => {
    $.post(iI11i1, (l1IliI, liIIIi, iIilI) => {
      try {
        l1IliI ? (liIIIi && liIIIi.statusCode && liIIIi.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : iliii1(I111l1, iIilI);
      } catch (II1i1l) {
        console.log(II1i1l, liIIIi);
      } finally {
        i11l1I();
      }
    });
  });
}
async function iliii1(iIil1, l1IllI) {
  let iiilII = "";
  try {
    $.krFlag = true;
    (iIil1 != "accessLogWithAD" || iIil1 != "drawContent") && l1IllI && (iiilII = JSON.parse(l1IllI));
  } catch (l1Illl) {
    console.log("🤬 " + iIil1 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let liIl1i = "";
    switch (iIil1) {
      case "抽奖":
        if (typeof iiilII == "object") {
          if (iiilII.success && iiilII.success === true && iiilII.data) {
            if (iiilII.data.status && iiilII.data.status == 200) {
              if (iiilII.data.data.sendResult) {
                console.log("抽中：" + iiilII.data.data.awardSetting.awardName);
                iiilII.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = iiilII.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await li1ll("updateAddress"), await $.wait(4000));
              } else !iiilII.data.data.result ? console.log("💔 空气") : console.log(iiilII.data.data);
            } else iiilII.data.status && iiilII.data.status == 500 && console.log("" + (iiilII.data.msg || ""));
          } else {
            if (iiilII.message) {
              console.log("" + (iiilII.message || ""));
            } else console.log(l1IllI);
          }
        } else {
          console.log(l1IllI);
        }
        break;
      case "updateAddress":
        if (typeof iiilII == "object") {
          if (iiilII.success && iiilII.success === true && iiilII.data) {
            if (iiilII.data.status && iiilII.data.status == 200) iiilII.data.data.result ? console.log("💖 地址填写成功，返回：" + iiilII.data.data.msg) : console.log(iiilII.data.data);else {
              if (iiilII.data.status && iiilII.data.status == 500) {
                console.log("" + (iiilII.data.msg || ""));
              }
            }
          } else iiilII.message ? console.log("" + (iiilII.message || "")) : console.log(l1IllI);
        } else console.log(l1IllI);
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
        liIl1i = "";
        if (iIil1 == "followShop") liIl1i = "关注";
        if (iIil1 == "addCart") liIl1i = "加购";
        if (typeof iiilII == "object") {
          if (iiilII.success && iiilII.success === true && iiilII.data) {
            if (iiilII.data.status && iiilII.data.status == 200) {
              iiilII = iiilII.data;
              if (iIil1 != "setMixNick" && (iiilII.msg || iiilII.data.isOpenCard || iiilII.data.remark)) console.log("🔊 " + (liIl1i && liIl1i + ":" || "") + (iiilII.msg || iiilII.data.isOpenCard || iiilII.data.remark || ""));
              if (iIil1 == "activity_load") {
                if (iiilII.msg || iiilII.data.isOpenCard) {
                  if ((iiilII.msg || iiilII.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (iiilII.data) {
                  $.endTime = iiilII.data.cusActivity.endTime || 0;
                  $.MixNick = iiilII.data.missionCustomer.buyerNick || "";
                  $.usedChance = iiilII.data.missionCustomer.usedChance || 0;
                  $.remainPoint = iiilII.data.missionCustomer.remainPoint || 0;
                  $.hasCollectShop = iiilII.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = iiilII.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (iIil1 == "shopList") $.openList = iiilII.data || [];else {
                  if (iIil1 == "mission") iiilII.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (iIil1 == "uniteOpenCardOne") $.uniteOpenCar = iiilII.msg || iiilII.data.msg || "";else {
                      if (iIil1 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let l11li = 0;
                        for (let iIlli in iiilII.data.list || []) {
                          let l11ll = iiilII.data.list[iIlli];
                          l11li += Number(l11ll.awardDes);
                        }
                        if (l11li > 0) console.log("🔊 共获得" + l11li + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else iIil1 == "missionInviteList" && console.log("🔊 邀请人数(" + iiilII.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (iiilII.data.msg) {
                iiilII.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (iiilII.data.msg || ""));
              } else {
                if (iiilII.errorMessage) {
                  if (iiilII.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (iiilII.errorMessage || ""));
                } else console.log("" + l1IllI);
              }
            }
          } else iiilII.errorMessage ? console.log("🔊 " + (iiilII.errorMessage || "")) : console.log("" + l1IllI);
        } else {}
        break;
      default:
        console.log((liIl1i || iIil1) + "-> " + l1IllI);
    }
    if (typeof iiilII == "object") {
      if (iiilII.errorMessage) {
        if (iiilII.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (l1li1I) {}
}
function i1IiI(iIlli1, I1IIIl, il1IlI = "POST") {
  let lI11 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Il1I1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iIlli1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (lI11.Origin = "https://jinggengjcq-isv.isvjcloud.com", lI11["Content-Type"] = "application/json; charset=utf-8", delete lI11.Cookie), {
    "url": iIlli1,
    "method": il1IlI,
    "headers": lI11,
    "body": I1IIIl,
    "timeout": 30 * 1000
  };
}
function lIllil(Ii1li, iIiIli) {
  d = {
    "actId": $.actId,
    ...iIiIli,
    "method": Ii1li,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = I111(d);
  const iIiIl1 = {
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
        ...iIiIli,
        "method": Ii1li,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return Ii1li.indexOf("missionInviteList") > -1 && delete iIiIl1.params.admJson.actId, $.toStr(iIiIl1, iIiIl1);
}
function iilIi1(Ii1lll, I1IIII) {
  return Math.floor(Math.random() * (I1IIII - Ii1lll)) + Ii1lll;
}
function I111(iIiIii) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(iIiIii));
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
function I1I11l(Ii1ll1) {
  Ii1ll1 = Ii1ll1 || 32;
  let I1III1 = "abcdef0123456789",
    iIll1 = I1III1.length,
    l11li1 = "";
  for (i = 0; i < Ii1ll1; i++) l11li1 += I1III1.charAt(Math.floor(Math.random() * iIll1));
  return l11li1;
}
function I1I11i(lI1I) {
  if (typeof lI1I == "string") try {
    return JSON.parse(lI1I);
  } catch (IIlIll) {
    return console.log(IIlIll), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function l1iI1l() {
  if (!$.joinVenderId) return;
  return new Promise(async IlIiIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIlliI = "";
    if ($.shopactivityId) iIlliI = ",\"activityId\":" + $.shopactivityId;
    const IlIiIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIlliI + ",\"channel\":406}",
      IIlIi1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IlIiIi)
      };
    for (var i1IIi1 = "", IIlIiI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l11lll = 0; l11lll < 16; l11lll++) {
      var i1iiI1 = Math.round(Math.random() * (IIlIiI.length - 1));
      i1IIi1 += IIlIiI.substring(i1iiI1, i1iiI1 + 1);
    }
    uuid = Buffer.from(i1IIi1, "utf8").toString("base64");
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
    const ll1l1I = await Ii1Iii("8adfb", IIlIi1),
      iIilI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IlIiIi + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ll1l1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Il1I1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIilI1, async (lIil1l, l1II1i, lili11) => {
      try {
        if (lIil1l) {
          l1II1i && typeof l1II1i.statusCode != "undefined" && l1II1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          lili11 = lili11 && lili11.match(/jsonp_.*?\((.*?)\);/) && lili11.match(/jsonp_.*?\((.*?)\);/)[1] || lili11;
          let iIl1Ii = $.toObj(lili11, lili11);
          if (iIl1Ii && typeof iIl1Ii == "object") {
            if (iIl1Ii && iIl1Ii.success === true) {
              console.log(" >> " + iIl1Ii.message);
              $.errorJoinShop = iIl1Ii.message;
              if (iIl1Ii.result && iIl1Ii.result.giftInfo) {
                for (let i1IIii of iIl1Ii.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + i1IIii.discountString + i1IIii.prizeName + i1IIii.secondLineDesc);
                }
              }
            } else iIl1Ii && typeof iIl1Ii == "object" && iIl1Ii.message ? ($.errorJoinShop = iIl1Ii.message, console.log("" + (iIl1Ii.message || ""))) : console.log(lili11);
          } else console.log(lili11);
        }
      } catch (il111l) {
        $.logErr(il111l, l1II1i);
      } finally {
        IlIiIl();
      }
    });
  });
}
async function III1ll() {
  return new Promise(async iiliII => {
    const I11llI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      I1IIi = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I11llI)
      };
    await $.wait(1000);
    const iiii1I = await Ii1Iii("8adfb", I1IIi),
      lIlIi1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I11llI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiii1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Il1I1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIlIi1, async (l1II1l, i1IIlI, ii11il) => {
      try {
        if (l1II1l) {
          if (i1IIlI && typeof i1IIlI.statusCode != "undefined") {
            if (i1IIlI.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          ii11il = ii11il && ii11il.match(/jsonp_.*?\((.*?)\);/) && ii11il.match(/jsonp_.*?\((.*?)\);/)[1] || ii11il;
          let i111ll = $.toObj(ii11il, ii11il);
          i111ll && typeof i111ll == "object" ? i111ll && i111ll.success == true && (console.log("去加入：" + (i111ll.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i111ll.result.interestsRuleList && i111ll.result.interestsRuleList[0] && i111ll.result.interestsRuleList[0].interestsInfo && i111ll.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(ii11il);
        }
      } catch (lIl111) {
        $.logErr(lIl111, i1IIlI);
      } finally {
        iiliII();
      }
    });
  });
}
function l1lIIi(i1IIli) {
  return new Promise(li1lii => {
    const ii11lI = {
      "url": "" + i1IIli,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ii11lI, async (lIiIIl, IliI, I1l1l) => {
      try {
        if (lIiIIl) {} else {
          if (I1l1l) {
            I1l1l = JSON.parse(I1l1l);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (lIl11l) {
        $.logErr(lIl11l, IliI);
        I1l1l = null;
      } finally {
        li1lii(I1l1l);
      }
    });
  });
}
function iilIi1(iiii1l, lI11I) {
  return Math.floor(Math.random() * (lI11I - iiii1l)) + iiii1l;
}
function iII11I() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iI1iIi = Array.from(new Set($.blacklist.split("&")));
  console.log(iI1iIi.join("&") + "\n");
  let iI1iIl = iI1iIi,
    lili1i = [],
    iI1Ii = false;
  for (let i111il = 0; i111il < lIilI1.length; i111il++) {
    let i111ii = decodeURIComponent(lIilI1[i111il].match(/pt_pin=([^; ]+)(?=;?)/) && lIilI1[i111il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!i111ii) break;
    let lI11i = false;
    for (let ilI11 of iI1iIl) {
      if (ilI11 && ilI11 == i111ii) {
        lI11i = true;
        break;
      }
    }
    !lI11i && (iI1Ii = true, lili1i.splice(i111il, -1, lIilI1[i111il]));
  }
  if (iI1Ii) lIilI1 = lili1i;
}
function IiIii1(lIil11, iIilII) {
  iIilII != 0 && lIil11.unshift(lIil11.splice(iIilII, 1)[0]);
}
function l1lIIl() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(lIilI1, lIilI1));
    return;
  }
  console.log("当前已设置白名单：");
  const lIllI1 = Array.from(new Set($.whitelist.split("&")));
  console.log(lIllI1.join("&") + "\n");
  let Ill1 = [],
    lI1i1i = lIllI1;
  for (let IIilIi in lIilI1) {
    let l1Iiil = decodeURIComponent(lIilI1[IIilIi].match(/pt_pin=([^; ]+)(?=;?)/) && lIilI1[IIilIi].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    lI1i1i.includes(l1Iiil) && Ill1.push(lIilI1[IIilIi]);
  }
  helpCookiesArr = Ill1;
  if (lI1i1i.length > 1) for (let I1li1I in lI1i1i) {
    let IIiII = lI1i1i[lI1i1i.length - 1 - I1li1I];
    if (!IIiII) continue;
    for (let iiiI in helpCookiesArr) {
      let I1li11 = decodeURIComponent(helpCookiesArr[iiiI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iiiI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      if (IIiII == I1li11) {
        IiIii1(helpCookiesArr, iiiI);
      }
    }
  }
}