/*
大牌联合0815期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC202308015dda/oC202308015dda?actId=65cf79ebb2504abab827c95edeb0_230815

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
#大牌联合0815期
1 1 1 1 * jd_dplh0815.js, tag=大牌联合0815期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0815期");
const li1lI = $.isNode() ? require("./jdCookie.js") : "",
  iliiiI = $.isNode() ? require("./sendNotify") : "";
let IIlIII = [],
  i1Iil = "";
if ($.isNode()) {
  Object.keys(li1lI).forEach(lIilII => {
    IIlIII.push(li1lI[lIilII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIlIII = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Il1I1i($.getdata("CookiesJD") || "[]").map(ilIlli => ilIlli.cookie)].filter(I1IIlI => !!I1IIlI);
let lIi11i = "30",
  i1Iii = "0";
lIi11i = $.isNode() ? process.env.retrynum ? process.env.retrynum : lIi11i : $.getdata("retrynum") ? $.getdata("retrynum") : i1Iii;
i1Iii = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : i1Iii : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : i1Iii;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IIiI1I = "",
  lIl1Ii = "",
  lIl1Il = "65cf79ebb2504abab827c95edeb0_230815";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const Ii1IlI = require("./function/krgetToken"),
  Il1I1I = require("./function/krh5st"),
  ll1Il1 = require("./function/krgetua");
let li11li = "https://jinggengjcq-isv.isvjcloud.com";
lIl1Ii = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + lIl1Ii : $.getdata("helpnum") ? $.getdata("helpnum") : "" + lIl1Ii;
let iliiii = "",
  IIlIIi = "";
$.whitelist = process.env.DPLHTY_whitelist || iliiii;
$.blacklist = process.env.DPLHTY_blacklist || IIlIIi;
i1Ii1();
iIIIli();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = lIl1Ii ? lIl1Ii : authorCodeList[IIiI1i(0, authorCodeList.length)];
  } else {
    let i1IiII = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = lIl1Ii ? lIl1Ii : i1IiII[IIiI1i(0, i1IiII.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 默认抽奖次数：" + i1Iii + " 💬 重试次数：" + lIi11i);
  console.log("\n💬 请在有水的情况下运行");
  process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let illI1l = [];
    illI1l = UserAdd_Data_Arr.split("|");
    var Ii1Iii = Math.floor(Math.random() * illI1l.length);
    if (illI1l[Ii1Iii] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else illI1l = illI1l[Ii1Iii];
    if (process.env.jd_jinggeng_address) {
      illI1l = illI1l.split("@");
      if (illI1l.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let I1I111 = 0; I1I111 < 6; I1I111++) {
        if (illI1l[I1I111] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      illI1l = illI1l.split("@");
      if (illI1l.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let i1IiIl = 0; i1IiIl < 7; i1IiIl++) {
        if (illI1l[i1IiIl] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = illI1l[0];
    $.phone = illI1l[1];
    $.province = illI1l[2];
    $.city = illI1l[3];
    $.county = illI1l[4];
    $.address = illI1l[5];
  }
  if (!IIlIII[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = lIl1Il;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let iilIii = 0; iilIii < IIlIII.length; iilIii++) {
    i1Iil = IIlIII[iilIii];
    if (i1Iil) {
      $.UserName = decodeURIComponent(i1Iil.match(/pt_pin=([^; ]+)(?=;?)/) && i1Iil.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iilIii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await ll1Il1($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await iliiil();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iII111 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iII111);
    if ($.isNode()) await iliiiI.sendNotify("" + $.name, "" + iII111);
  }
})().catch(Ili1ii => $.logErr(Ili1ii)).finally(() => $.done());
async function iliiil() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    IIiI1I = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await Ii1IlI(i1Iil, li11li);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await li11ll("activity_load");
    for (let iilllI = 0; iilllI < lIi11i; iilllI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li11ll("activity_load");
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
    await li11ll("绑定");
    for (let iillii = 0; iillii < lIi11i; iillii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li11ll("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await li11ll("shopList");
    for (let ilI1iI = 0; ilI1iI < lIi11i; ilI1iI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li11ll("shopList");
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
        await li11ll("mission");
        for (let l1I1l = 0; l1I1l < lIi11i; l1I1l++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await li11ll("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await lIilI1();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await lIilI1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await li11ll("activity_load");
          for (let i1i1ii = 0; i1i1ii < lIi11i; i1i1ii++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await li11ll("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await li11ll("shopList");
          for (let Il1ill = 0; Il1ill < lIi11i; Il1ill++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await li11ll("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await li11ll("mission");
      for (let Il1ili = 0; Il1ili < lIi11i; Il1ili++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await li11ll("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await li11ll("mission");
      for (let iI11il = 0; iI11il < lIi11i; iI11il++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await li11ll("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await li11ll("activity_load");
    for (let iliill = 0; iliill < lIi11i; iliill++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li11ll("activity_load");
        if ($.krFlag) break;
      }
    }
    if (i1Iii + "" !== "0") {
      $.runFalag = true;
      let I111ii = parseInt($.remainPoint / 200);
      i1Iii = parseInt(i1Iii, 10);
      if (I111ii > i1Iii) I111ii = i1Iii;
      console.log("💖 抽奖次数为:" + I111ii + "，当前积分：" + $.remainPoint);
      for (m = 1; I111ii--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await li11ll("抽奖");
        for (let Ililll = 0; Ililll < lIi11i; Ililll++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await li11ll("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(I111ii) <= 0) break;
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
  } catch (I1ii1I) {
    console.log(I1ii1I);
  }
}
async function li11ll(iIii1l) {
  if ($.outFlag) return;
  let IIil1l = "https://jinggengjcq-isv.isvjcloud.com",
    i1i1l1 = "",
    iIii1i = "POST",
    IIil1i = "";
  switch (iIii1l) {
    case "activity_load":
      url = IIil1l + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIil1i = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) IIil1i = {
        ...IIil1i,
        "shopId": "" + $.joinVenderId
      };
      i1i1l1 = IIiI1l("/jdBigAlliance/activity/load", IIil1i);
      break;
    case "shopList":
      url = IIil1l + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIil1i = {};
      i1i1l1 = IIiI1l("/jdBigAlliance/shop/shopList", IIil1i);
      break;
    case "绑定":
      url = IIil1l + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIil1i = {
        "inviterNick": $.inviteNick || ""
      };
      i1i1l1 = IIiI1l("/jdBigAlliance/customer/inviteRelation", IIil1i);
      break;
    case "mission":
      url = IIil1l + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIil1i = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) IIil1i = {
        ...IIil1i,
        "shopId": $.joinVenderId
      };
      i1i1l1 = IIiI1l("/jdBigAlliance/mission/completeMission", IIil1i);
      break;
    case "抽奖":
      url = IIil1l + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIil1i = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      i1i1l1 = IIiI1l("/jdBigAlliance/interactive/drawPost", IIil1i);
      break;
    case "updateAddress":
      url = IIil1l + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIil1i = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      i1i1l1 = IIiI1l("/jdBigAlliance/awards/updateAddress", IIil1i);
      break;
    default:
      console.log("错误" + iIii1l);
  }
  let IlIl1 = li1l1(url, i1i1l1, iIii1i);
  return new Promise(async iil1Il => {
    $.post(IlIl1, (iil1II, iii11I, IIil11) => {
      try {
        if (iil1II) {
          iii11I && iii11I.statusCode && iii11I.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else i1Il1(iIii1l, IIil11);
      } catch (iliilI) {
        console.log(iliilI, iii11I);
      } finally {
        iil1Il();
      }
    });
  });
}
async function i1Il1(IlIlI, IIil1I) {
  let II1i1i = "";
  try {
    $.krFlag = true;
    (IlIlI != "accessLogWithAD" || IlIlI != "drawContent") && IIil1I && (II1i1i = JSON.parse(IIil1I));
  } catch (Ii111I) {
    console.log("🤬 " + IlIlI + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let liIl1i = "";
    switch (IlIlI) {
      case "抽奖":
        if (typeof II1i1i == "object") {
          if (II1i1i.success && II1i1i.success === true && II1i1i.data) {
            if (II1i1i.data.status && II1i1i.data.status == 200) {
              if (II1i1i.data.data.sendResult) {
                console.log("抽中：" + II1i1i.data.data.awardSetting.awardName);
                II1i1i.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = II1i1i.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await li11ll("updateAddress"), await $.wait(4000));
              } else !II1i1i.data.data.result ? console.log("💔 空气") : console.log(II1i1i.data.data);
            } else II1i1i.data.status && II1i1i.data.status == 500 && console.log("" + (II1i1i.data.msg || ""));
          } else II1i1i.message ? console.log("" + (II1i1i.message || "")) : console.log(IIil1I);
        } else console.log(IIil1I);
        break;
      case "updateAddress":
        if (typeof II1i1i == "object") {
          if (II1i1i.success && II1i1i.success === true && II1i1i.data) {
            if (II1i1i.data.status && II1i1i.data.status == 200) II1i1i.data.data.result ? console.log("💖 地址填写成功，返回：" + II1i1i.data.data.msg) : console.log(II1i1i.data.data);else II1i1i.data.status && II1i1i.data.status == 500 && console.log("" + (II1i1i.data.msg || ""));
          } else {
            if (II1i1i.message) console.log("" + (II1i1i.message || ""));else {
              console.log(IIil1I);
            }
          }
        } else console.log(IIil1I);
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
        if (IlIlI == "followShop") liIl1i = "关注";
        if (IlIlI == "addCart") liIl1i = "加购";
        if (typeof II1i1i == "object") {
          if (II1i1i.success && II1i1i.success === true && II1i1i.data) {
            if (II1i1i.data.status && II1i1i.data.status == 200) {
              II1i1i = II1i1i.data;
              if (IlIlI != "setMixNick" && (II1i1i.msg || II1i1i.data.isOpenCard || II1i1i.data.remark)) console.log("🔊 " + (liIl1i && liIl1i + ":" || "") + (II1i1i.msg || II1i1i.data.isOpenCard || II1i1i.data.remark || ""));
              if (IlIlI == "activity_load") {
                if (II1i1i.msg || II1i1i.data.isOpenCard) {
                  if ((II1i1i.msg || II1i1i.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                II1i1i.data && ($.endTime = II1i1i.data.cusActivity.endTime || 0, $.MixNick = II1i1i.data.missionCustomer.buyerNick || "", $.usedChance = II1i1i.data.missionCustomer.usedChance || 0, $.remainPoint = II1i1i.data.missionCustomer.remainPoint || 0, $.hasCollectShop = II1i1i.data.missionCustomer.hasCollectShop || 0, $.hasAddCart = II1i1i.data.missionCustomer.hasAddCart || 0);
              } else {
                if (IlIlI == "shopList") {
                  $.openList = II1i1i.data || [];
                } else {
                  if (IlIlI == "mission") II1i1i.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (IlIlI == "uniteOpenCardOne") $.uniteOpenCar = II1i1i.msg || II1i1i.data.msg || "";else {
                      if (IlIlI == "myAward") {
                        console.log("🔊 我的奖品：");
                        let iiii1 = 0;
                        for (let l1li1I in II1i1i.data.list || []) {
                          let iIlli1 = II1i1i.data.list[l1li1I];
                          iiii1 += Number(iIlli1.awardDes);
                        }
                        if (iiii1 > 0) console.log("🔊 共获得" + iiii1 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IlIlI == "missionInviteList" && console.log("🔊 邀请人数(" + II1i1i.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (II1i1i.data.msg) {
                II1i1i.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (II1i1i.data.msg || ""));
              } else {
                if (II1i1i.errorMessage) {
                  if (II1i1i.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (II1i1i.errorMessage || ""));
                } else console.log("" + IIil1I);
              }
            }
          } else II1i1i.errorMessage ? console.log("🔊 " + (II1i1i.errorMessage || "")) : console.log("" + IIil1I);
        } else {}
        break;
      default:
        console.log((liIl1i || IlIlI) + "-> " + IIil1I);
    }
    if (typeof II1i1i == "object") {
      if (II1i1i.errorMessage) {
        if (II1i1i.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (li11I1) {}
}
function li1l1(i1I111, l1li11, il1Il1 = "POST") {
  let Ii1li = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": i1Iil,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i1I111.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (Ii1li.Origin = "https://jinggengjcq-isv.isvjcloud.com", Ii1li["Content-Type"] = "application/json; charset=utf-8", delete Ii1li.Cookie), {
    "url": i1I111,
    "method": il1Il1,
    "headers": Ii1li,
    "body": l1li11,
    "timeout": 30 * 1000
  };
}
function IIiI1l(i1I11I, Ii1lli) {
  d = {
    "actId": $.actId,
    ...Ii1lli,
    "method": i1I11I,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = ilIllI(d);
  const I1IIII = {
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
        ...Ii1lli,
        "method": i1I11I,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return i1I11I.indexOf("missionInviteList") > -1 && delete I1IIII.params.admJson.actId, $.toStr(I1IIII, I1IIII);
}
function IIiI1i(iIiIil, iIiIii) {
  return Math.floor(Math.random() * (iIiIii - iIiIil)) + iIiIil;
}
function ilIllI(i1I11i) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(i1I11i));
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
function I1IIli(Ii1ll1) {
  Ii1ll1 = Ii1ll1 || 32;
  let I1III1 = "abcdef0123456789",
    iIll1 = I1III1.length,
    l11li1 = "";
  for (i = 0; i < Ii1ll1; i++) l11li1 += I1III1.charAt(Math.floor(Math.random() * iIll1));
  return l11li1;
}
function Il1I1i(lIiII1) {
  if (typeof lIiII1 == "string") {
    try {
      return JSON.parse(lIiII1);
    } catch (l1li1i) {
      return console.log(l1li1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function lIilI1() {
  if (!$.joinVenderId) return;
  return new Promise(async i1IlIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I1Il11 = "";
    if ($.shopactivityId) I1Il11 = ",\"activityId\":" + $.shopactivityId;
    const IlIiIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I1Il11 + ",\"channel\":406}",
      iIiIll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IlIiIl)
      };
    for (var IlIiI1 = "", ll1IIl = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l11ll1 = 0; l11ll1 < 16; l11ll1++) {
      var iIlllI = Math.round(Math.random() * (ll1IIl.length - 1));
      IlIiI1 += ll1IIl.substring(iIlllI, iIlllI + 1);
    }
    uuid = Buffer.from(IlIiI1, "utf8").toString("base64");
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
    const iIlliI = await Il1I1I("8adfb", iIiIll),
      IlIiIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IlIiIl + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIlliI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i1Iil,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IlIiIi, async (IIlIi1, i1IIi1, IIlIiI) => {
      try {
        if (IIlIi1) i1IIi1 && typeof i1IIi1.statusCode != "undefined" && i1IIi1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IIlIiI = IIlIiI && IIlIiI.match(/jsonp_.*?\((.*?)\);/) && IIlIiI.match(/jsonp_.*?\((.*?)\);/)[1] || IIlIiI;
          let i1IIiI = $.toObj(IIlIiI, IIlIiI);
          if (i1IIiI && typeof i1IIiI == "object") {
            if (i1IIiI && i1IIiI.success === true) {
              console.log(" >> " + i1IIiI.message);
              $.errorJoinShop = i1IIiI.message;
              if (i1IIiI.result && i1IIiI.result.giftInfo) {
                for (let lI1i1I of i1IIiI.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + lI1i1I.discountString + lI1i1I.prizeName + lI1i1I.secondLineDesc);
                }
              }
            } else i1IIiI && typeof i1IIiI == "object" && i1IIiI.message ? ($.errorJoinShop = i1IIiI.message, console.log("" + (i1IIiI.message || ""))) : console.log(IIlIiI);
          } else console.log(IIlIiI);
        }
      } catch (lIil1l) {
        $.logErr(lIil1l, i1IIi1);
      } finally {
        i1IlIl();
      }
    });
  });
}
async function Il1I1l() {
  return new Promise(async lili1I => {
    const l111Il = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      I1III = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l111Il)
      };
    await $.wait(1000);
    const l1II1I = await Il1I1I("8adfb", I1III),
      iiliI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l111Il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1II1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i1Iil,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iiliI1, async (iIl1II, il1lIi, Ili1) => {
      try {
        if (iIl1II) {
          il1lIi && typeof il1lIi.statusCode != "undefined" && il1lIi.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          Ili1 = Ili1 && Ili1.match(/jsonp_.*?\((.*?)\);/) && Ili1.match(/jsonp_.*?\((.*?)\);/)[1] || Ili1;
          let iiliII = $.toObj(Ili1, Ili1);
          if (iiliII && typeof iiliII == "object") {
            iiliII && iiliII.success == true && (console.log("去加入：" + (iiliII.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iiliII.result.interestsRuleList && iiliII.result.interestsRuleList[0] && iiliII.result.interestsRuleList[0].interestsInfo && iiliII.result.interestsRuleList[0].interestsInfo.activityId || "");
          } else console.log(Ili1);
        }
      } catch (I1IIi) {
        $.logErr(I1IIi, il1lIi);
      } finally {
        lili1I();
      }
    });
  });
}
function Ii1Il1(iiii1I) {
  return new Promise(lIlIiI => {
    const i111ll = {
      "url": "" + iiii1I,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i111ll, async (lIl111, Ilil, i1IIli) => {
      try {
        if (lIl111) {} else {
          if (i1IIli) {
            i1IIli = JSON.parse(i1IIli);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (iIiIi1) {
        $.logErr(iIiIi1, Ilil);
        i1IIli = null;
      } finally {
        lIlIiI(i1IIli);
      }
    });
  });
}
function IIiI1i(li1lii, i111lI) {
  return Math.floor(Math.random() * (i111lI - li1lii)) + li1lii;
}
function iIIIli() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1l1i = Array.from(new Set($.blacklist.split("&")));
  console.log(I1l1i.join("&") + "\n");
  let lIiIIl = I1l1i,
    IliI = [],
    I1l1l = false;
  for (let iiii1i = 0; iiii1i < IIlIII.length; iiii1i++) {
    let iiii1l = decodeURIComponent(IIlIII[iiii1i].match(/pt_pin=([^; ]+)(?=;?)/) && IIlIII[iiii1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iiii1l) break;
    let lI11I = false;
    for (let iIilIi of lIiIIl) {
      if (iIilIi && iIilIi == iiii1l) {
        lI11I = true;
        break;
      }
    }
    !lI11I && (I1l1l = true, IliI.splice(iiii1i, -1, IIlIII[iiii1i]));
  }
  if (I1l1l) IIlIII = IliI;
}
function I1IIll(iIilIl, ilI1I) {
  if (ilI1I != 0) {
    iIilIl.unshift(iIilIl.splice(ilI1I, 1)[0]);
  }
}
function i1Ii1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IIlIII, IIlIII));
    return;
  }
  console.log("当前已设置白名单：");
  const iI1Ii = Array.from(new Set($.whitelist.split("&")));
  console.log(iI1Ii.join("&") + "\n");
  let IiIIIl = [],
    IiIIIi = iI1Ii;
  for (let li1ll1 in IIlIII) {
    let lIil1I = decodeURIComponent(IIlIII[li1ll1].match(/pt_pin=([^; ]+)(?=;?)/) && IIlIII[li1ll1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (IiIIIi.includes(lIil1I)) {
      IiIIIl.push(IIlIII[li1ll1]);
    }
  }
  helpCookiesArr = IiIIIl;
  if (IiIIIi.length > 1) for (let i111iI in IiIIIi) {
    let lIllII = IiIIIi[IiIIIi.length - 1 - i111iI];
    if (!lIllII) continue;
    for (let IIilIl in helpCookiesArr) {
      let IIilIi = decodeURIComponent(helpCookiesArr[IIilIl].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[IIilIl].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lIllII == IIilIi && I1IIll(helpCookiesArr, IIilIl);
    }
  }
}