/*
大牌联合0817期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230817cot/oC20230817cot?actId=04ab382cebe94655b9ab223dd166d_230817

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
#大牌联合0817期
1 1 1 1 * jd_dplh0817.js, tag=大牌联合0817期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0817期");
const Il1I1I = $.isNode() ? require("./jdCookie.js") : "",
  ll1Il1 = $.isNode() ? require("./sendNotify") : "";
let li11li = [],
  iliiii = "";
if ($.isNode()) {
  Object.keys(Il1I1I).forEach(i1IiI => {
    li11li.push(Il1I1I[i1IiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else li11li = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Ii1Iil($.getdata("CookiesJD") || "[]").map(lIllil => lIllil.cookie)].filter(iilIi1 => !!iilIi1);
let IIlIIi = "30",
  iliiil = "0";
IIlIIi = $.isNode() ? process.env.retrynum ? process.env.retrynum : IIlIIi : $.getdata("retrynum") ? $.getdata("retrynum") : iliiil;
iliiil = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : iliiil : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : iliiil;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let li11ll = "",
  IIiI1l = "",
  IIiI1i = "04ab382cebe94655b9ab223dd166d_230817";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const ilIllI = require("./function/krgetToken"),
  I1IIli = require("./function/krh5st"),
  Il1I1i = require("./function/krgetua");
let lIilI1 = "https://jinggengjcq-isv.isvjcloud.com";
IIiI1l = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IIiI1l : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IIiI1l;
let Il1I1l = "",
  Ii1Il1 = "";
$.whitelist = process.env.DPLHTY_whitelist || Il1I1l;
$.blacklist = process.env.DPLHTY_blacklist || Ii1Il1;
iliii1();
ll1Ii1();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = IIiI1l ? IIiI1l : authorCodeList[I1IIlI(0, authorCodeList.length)];
  } else {
    let Ili1il = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = IIiI1l ? IIiI1l : Ili1il[I1IIlI(0, Ili1il.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 默认抽奖次数：" + iliiil + " 💬 重试次数：" + IIlIIi);
  console.log("\n💬 请在有水的情况下运行");
  if (process.env.jd_jinggeng_address) UserAdd_Data_Arr = process.env.jd_jinggeng_address;else {
    UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  }
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let lIiIil = [];
    lIiIil = UserAdd_Data_Arr.split("|");
    var I1I11l = Math.floor(Math.random() * lIiIil.length);
    if (lIiIil[I1I11l] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else lIiIil = lIiIil[I1I11l];
    if (process.env.jd_jinggeng_address) {
      lIiIil = lIiIil.split("@");
      if (lIiIil.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let IiIili = 0; IiIili < 6; IiIili++) {
        if (lIiIil[IiIili] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      lIiIil = lIiIil.split("@");
      if (lIiIil.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let llIiil = 0; llIiil < 7; llIiil++) {
        if (lIiIil[llIiil] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = lIiIil[0];
    $.phone = lIiIil[1];
    $.province = lIiIil[2];
    $.city = lIiIil[3];
    $.county = lIiIil[4];
    $.address = lIiIil[5];
  }
  if (!li11li[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = IIiI1i;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let iIIlIi = 0; iIIlIi < li11li.length; iIIlIi++) {
    iliiii = li11li[iIIlIi];
    if (iliiii) {
      $.UserName = decodeURIComponent(iliiii.match(/pt_pin=([^; ]+)(?=;?)/) && iliiii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIIlIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await Il1I1i($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await iIIIli();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iilIli = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iilIli);
    if ($.isNode()) await ll1Il1.sendNotify("" + $.name, "" + iilIli);
  }
})().catch(IlIi1I => $.logErr(IlIi1I)).finally(() => $.done());
async function iIIIli() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    li11ll = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await ilIllI(iliiii, lIilI1);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await I1IIll("activity_load");
    for (let iillil = 0; iillil < IIlIIi; iillil++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1IIll("activity_load");
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
    await I1IIll("绑定");
    for (let iillii = 0; iillii < IIlIIi; iillii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1IIll("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await I1IIll("shopList");
    for (let l1I1i = 0; l1I1i < IIlIIi; l1I1i++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1IIll("shopList");
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
        await I1IIll("mission");
        for (let i1i1il = 0; i1i1il < IIlIIi; i1i1il++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await I1IIll("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await ll1IiI();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await ll1IiI(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1IIll("activity_load");
          for (let liIIII = 0; liIIII < IIlIIi; liIIII++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await I1IIll("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1IIll("shopList");
          for (let IIllII = 0; IIllII < IIlIIi; IIllII++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await I1IIll("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await I1IIll("mission");
      for (let iii111 = 0; iii111 < IIlIIi; iii111++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1IIll("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await I1IIll("mission");
      for (let liIII1 = 0; liIII1 < IIlIIi; liIII1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1IIll("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await I1IIll("activity_load");
    for (let iliill = 0; iliill < IIlIIi; iliill++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1IIll("activity_load");
        if ($.krFlag) break;
      }
    }
    if (iliiil + "" !== "0") {
      $.runFalag = true;
      let Ililll = parseInt($.remainPoint / 200);
      iliiil = parseInt(iliiil, 10);
      if (Ililll > iliiil) Ililll = iliiil;
      console.log("💖 抽奖次数为:" + Ililll + "，当前积分：" + $.remainPoint);
      for (m = 1; Ililll--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1IIll("抽奖");
        for (let I1ii1I = 0; I1ii1I < IIlIIi; I1ii1I++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await I1IIll("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(Ililll) <= 0) break;
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
  } catch (iIliIi) {
    console.log(iIliIi);
  }
}
async function I1IIll(IIil1l) {
  if ($.outFlag) return;
  let iIii1i = "https://jinggengjcq-isv.isvjcloud.com",
    IIil1i = "",
    IlIl1 = "POST",
    II1i1I = "";
  switch (IIil1l) {
    case "activity_load":
      url = iIii1i + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      II1i1I = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) II1i1I = {
        ...II1i1I,
        "shopId": "" + $.joinVenderId
      };
      IIil1i = ilIlli("/jdBigAlliance/activity/load", II1i1I);
      break;
    case "shopList":
      url = iIii1i + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      II1i1I = {};
      IIil1i = ilIlli("/jdBigAlliance/shop/shopList", II1i1I);
      break;
    case "绑定":
      url = iIii1i + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      II1i1I = {
        "inviterNick": $.inviteNick || ""
      };
      IIil1i = ilIlli("/jdBigAlliance/customer/inviteRelation", II1i1I);
      break;
    case "mission":
      url = iIii1i + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      II1i1I = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) II1i1I = {
        ...II1i1I,
        "shopId": $.joinVenderId
      };
      IIil1i = ilIlli("/jdBigAlliance/mission/completeMission", II1i1I);
      break;
    case "抽奖":
      url = iIii1i + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      II1i1I = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      IIil1i = ilIlli("/jdBigAlliance/interactive/drawPost", II1i1I);
      break;
    case "updateAddress":
      url = iIii1i + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      II1i1I = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      IIil1i = ilIlli("/jdBigAlliance/awards/updateAddress", II1i1I);
      break;
    default:
      console.log("错误" + IIil1l);
  }
  let iIliI1 = lIilII(url, IIil1i, IlIl1);
  return new Promise(async iI11i1 => {
    $.post(iIliI1, (IIl11l, I111i1, lIl1i1) => {
      try {
        IIl11l ? (I111i1 && I111i1.statusCode && I111i1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : i1Ii1(IIil1l, lIl1i1);
      } catch (l1Ilil) {
        console.log(l1Ilil, I111i1);
      } finally {
        iI11i1();
      }
    });
  });
}
async function i1Ii1(IlIll, liil) {
  let IlIli = "";
  try {
    $.krFlag = true;
    (IlIll != "accessLogWithAD" || IlIll != "drawContent") && liil && (IlIli = JSON.parse(liil));
  } catch (i11III) {
    console.log("🤬 " + IlIll + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let Ill1l1 = "";
    switch (IlIll) {
      case "抽奖":
        if (typeof IlIli == "object") {
          if (IlIli.success && IlIli.success === true && IlIli.data) {
            if (IlIli.data.status && IlIli.data.status == 200) {
              if (IlIli.data.data.sendResult) {
                console.log("抽中：" + IlIli.data.data.awardSetting.awardName);
                IlIli.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = IlIli.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await I1IIll("updateAddress"), await $.wait(4000));
              } else !IlIli.data.data.result ? console.log("💔 空气") : console.log(IlIli.data.data);
            } else IlIli.data.status && IlIli.data.status == 500 && console.log("" + (IlIli.data.msg || ""));
          } else IlIli.message ? console.log("" + (IlIli.message || "")) : console.log(liil);
        } else console.log(liil);
        break;
      case "updateAddress":
        if (typeof IlIli == "object") {
          if (IlIli.success && IlIli.success === true && IlIli.data) {
            if (IlIli.data.status && IlIli.data.status == 200) IlIli.data.data.result ? console.log("💖 地址填写成功，返回：" + IlIli.data.data.msg) : console.log(IlIli.data.data);else IlIli.data.status && IlIli.data.status == 500 && console.log("" + (IlIli.data.msg || ""));
          } else IlIli.message ? console.log("" + (IlIli.message || "")) : console.log(liil);
        } else console.log(liil);
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
        Ill1l1 = "";
        if (IlIll == "followShop") Ill1l1 = "关注";
        if (IlIll == "addCart") Ill1l1 = "加购";
        if (typeof IlIli == "object") {
          if (IlIli.success && IlIli.success === true && IlIli.data) {
            if (IlIli.data.status && IlIli.data.status == 200) {
              IlIli = IlIli.data;
              if (IlIll != "setMixNick" && (IlIli.msg || IlIli.data.isOpenCard || IlIli.data.remark)) console.log("🔊 " + (Ill1l1 && Ill1l1 + ":" || "") + (IlIli.msg || IlIli.data.isOpenCard || IlIli.data.remark || ""));
              if (IlIll == "activity_load") {
                if (IlIli.msg || IlIli.data.isOpenCard) {
                  if ((IlIli.msg || IlIli.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (IlIli.data) {
                  $.endTime = IlIli.data.cusActivity.endTime || 0;
                  $.MixNick = IlIli.data.missionCustomer.buyerNick || "";
                  $.usedChance = IlIli.data.missionCustomer.usedChance || 0;
                  $.remainPoint = IlIli.data.missionCustomer.remainPoint || 0;
                  $.hasCollectShop = IlIli.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = IlIli.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IlIll == "shopList") $.openList = IlIli.data || [];else {
                  if (IlIll == "mission") IlIli.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (IlIll == "uniteOpenCardOne") $.uniteOpenCar = IlIli.msg || IlIli.data.msg || "";else {
                      if (IlIll == "myAward") {
                        console.log("🔊 我的奖品：");
                        let l1Illl = 0;
                        for (let Ii111I in IlIli.data.list || []) {
                          let liIl1i = IlIli.data.list[Ii111I];
                          l1Illl += Number(liIl1i.awardDes);
                        }
                        if (l1Illl > 0) console.log("🔊 共获得" + l1Illl + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IlIll == "missionInviteList" && console.log("🔊 邀请人数(" + IlIli.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (IlIli.data.msg) {
                IlIli.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (IlIli.data.msg || ""));
              } else {
                if (IlIli.errorMessage) {
                  if (IlIli.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (IlIli.errorMessage || ""));
                } else console.log("" + liil);
              }
            }
          } else {
            if (IlIli.errorMessage) console.log("🔊 " + (IlIli.errorMessage || ""));else {
              console.log("" + liil);
            }
          }
        } else {}
        break;
      default:
        console.log((Ill1l1 || IlIll) + "-> " + liil);
    }
    if (typeof IlIli == "object") {
      if (IlIli.errorMessage) {
        if (IlIli.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (Il1il1) {}
}
function lIilII(Ililil, Ill1ll, I1liIl = "POST") {
  let l11li = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iliiii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return Ililil.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (l11li.Origin = "https://jinggengjcq-isv.isvjcloud.com", l11li["Content-Type"] = "application/json; charset=utf-8", delete l11li.Cookie), {
    "url": Ililil,
    "method": I1liIl,
    "headers": l11li,
    "body": Ill1ll,
    "timeout": 30 * 1000
  };
}
function ilIlli(liII11, I1II) {
  d = {
    "actId": $.actId,
    ...I1II,
    "method": liII11,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = ilIlll(d);
  const l1li1I = {
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
        ...I1II,
        "method": liII11,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return liII11.indexOf("missionInviteList") > -1 && delete l1li1I.params.admJson.actId, $.toStr(l1li1I, l1li1I);
}
function I1IIlI(I1IIIi, lI11) {
  return Math.floor(Math.random() * (lI11 - I1IIIi)) + I1IIIi;
}
function ilIlll(Ii1li) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(Ii1li));
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
function Ii1Iii(iIiIlI) {
  iIiIlI = iIiIlI || 32;
  let iIiIil = "abcdef0123456789",
    iIiIii = iIiIil.length,
    lI1i = "";
  for (i = 0; i < iIiIlI; i++) lI1i += iIiIil.charAt(Math.floor(Math.random() * iIiIii));
  return lI1i;
}
function Ii1Iil(i1I11i) {
  if (typeof i1I11i == "string") {
    try {
      return JSON.parse(i1I11i);
    } catch (iIlii) {
      return console.log(iIlii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function ll1IiI() {
  if (!$.joinVenderId) return;
  return new Promise(async I1Il1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l11llI = "";
    if ($.shopactivityId) l11llI = ",\"activityId\":" + $.shopactivityId;
    const i1IlIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l11llI + ",\"channel\":406}",
      i1IlIl = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1IlIi)
      };
    for (var ll1IIi = "", IlIiI1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", ll1IIl = 0; ll1IIl < 16; ll1IIl++) {
      var l11ll1 = Math.round(Math.random() * (IlIiI1.length - 1));
      ll1IIi += IlIiI1.substring(l11ll1, l11ll1 + 1);
    }
    uuid = Buffer.from(ll1IIi, "utf8").toString("base64");
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
    const iIlllI = await I1IIli("8adfb", i1IlIl),
      iIli1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i1IlIi + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIlllI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iliiii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIli1, async (iIllil, l11lli, I1Il11) => {
      try {
        if (iIllil) {
          l11lli && typeof l11lli.statusCode != "undefined" && l11lli.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          I1Il11 = I1Il11 && I1Il11.match(/jsonp_.*?\((.*?)\);/) && I1Il11.match(/jsonp_.*?\((.*?)\);/)[1] || I1Il11;
          let l11lll = $.toObj(I1Il11, I1Il11);
          if (l11lll && typeof l11lll == "object") {
            if (l11lll && l11lll.success === true) {
              console.log(" >> " + l11lll.message);
              $.errorJoinShop = l11lll.message;
              if (l11lll.result && l11lll.result.giftInfo) {
                for (let ll1l1I of l11lll.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + ll1l1I.discountString + ll1l1I.prizeName + ll1l1I.secondLineDesc);
                }
              }
            } else l11lll && typeof l11lll == "object" && l11lll.message ? ($.errorJoinShop = l11lll.message, console.log("" + (l11lll.message || ""))) : console.log(I1Il11);
          } else console.log(I1Il11);
        }
      } catch (I1II1) {
        $.logErr(I1II1, l11lli);
      } finally {
        I1Il1I();
      }
    });
  });
}
async function li1li() {
  return new Promise(async iIl1Il => {
    const il111i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iI1iII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(il111i)
      };
    await $.wait(1000);
    const l111Ii = await I1IIli("8adfb", iI1iII),
      lI1i11 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + il111i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l111Ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iliiii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lI1i11, async (lili1I, i1iiII, l111Il) => {
      try {
        if (lili1I) {
          i1iiII && typeof i1iiII.statusCode != "undefined" && i1iiII.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          l111Il = l111Il && l111Il.match(/jsonp_.*?\((.*?)\);/) && l111Il.match(/jsonp_.*?\((.*?)\);/)[1] || l111Il;
          let i1iiIi = $.toObj(l111Il, l111Il);
          i1iiIi && typeof i1iiIi == "object" ? i1iiIi && i1iiIi.success == true && (console.log("去加入：" + (i1iiIi.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1iiIi.result.interestsRuleList && i1iiIi.result.interestsRuleList[0] && i1iiIi.result.interestsRuleList[0].interestsInfo && i1iiIi.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(l111Il);
        }
      } catch (I1IIi) {
        $.logErr(I1IIi, i1iiII);
      } finally {
        iIl1Il();
      }
    });
  });
}
function iIIIll(iiii1I) {
  return new Promise(il1lII => {
    const ii11ii = {
      "url": "" + iiii1I,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ii11ii, async (I11lli, i111ll, I11lll) => {
      try {
        if (I11lli) {} else I11lll ? I11lll = JSON.parse(I11lll) : console.log("未获取到数据,请重新运行");
      } catch (llIiII) {
        $.logErr(llIiII, i111ll);
        I11lll = null;
      } finally {
        il1lII(I11lll);
      }
    });
  });
}
function I1IIlI(lIl111, Ilil) {
  return Math.floor(Math.random() * (Ilil - lIl111)) + lIl111;
}
function ll1Ii1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const ii11l1 = Array.from(new Set($.blacklist.split("&")));
  console.log(ii11l1.join("&") + "\n");
  let li1lil = ii11l1,
    li1lii = [],
    i111lI = false;
  for (let ilI1i = 0; ilI1i < li11li.length; ilI1i++) {
    let llIiI1 = decodeURIComponent(li11li[ilI1i].match(/pt_pin=([^; ]+)(?=;?)/) && li11li[ilI1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!llIiI1) break;
    let li1li1 = false;
    for (let li1liI of li1lil) {
      if (li1liI && li1liI == llIiI1) {
        li1li1 = true;
        break;
      }
    }
    !li1li1 && (i111lI = true, li1lii.splice(ilI1i, -1, li11li[ilI1i]));
  }
  if (i111lI) li11li = li1lii;
}
function li1ll(i111l1, lIl11i) {
  if (lIl11i != 0) {
    i111l1.unshift(i111l1.splice(lIl11i, 1)[0]);
  }
}
function iliii1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(li11li, li11li));
    return;
  }
  console.log("当前已设置白名单：");
  const ii11ll = Array.from(new Set($.whitelist.split("&")));
  console.log(ii11ll.join("&") + "\n");
  let il1Iii = [],
    lili1l = ii11ll;
  for (let lIllI1 in li11li) {
    let il1IiI = decodeURIComponent(li11li[lIllI1].match(/pt_pin=([^; ]+)(?=;?)/) && li11li[lIllI1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    lili1l.includes(il1IiI) && il1Iii.push(li11li[lIllI1]);
  }
  helpCookiesArr = il1Iii;
  if (lili1l.length > 1) for (let il1Ii1 in lili1l) {
    let lI1i1l = lili1l[lili1l.length - 1 - il1Ii1];
    if (!lI1i1l) continue;
    for (let li1ll1 in helpCookiesArr) {
      let iI1II = decodeURIComponent(helpCookiesArr[li1ll1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[li1ll1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lI1i1l == iI1II && li1ll(helpCookiesArr, li1ll1);
    }
  }
}