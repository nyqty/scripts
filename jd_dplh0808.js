/*
大牌联合0808期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230808aslw/oC20230808aslw?actId=cb9168cb545f40419_230808

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
#大牌联合0808期
1 1 1 1 * jd_dplh0808.js, tag=大牌联合0808期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0808期");
const lIi11l = $.isNode() ? require("./jdCookie.js") : "",
  i1IlI = $.isNode() ? require("./sendNotify") : "";
let lIl1Ii = [],
  lIl1Il = "";
if ($.isNode()) {
  Object.keys(lIi11l).forEach(li1li => {
    lIl1Ii.push(lIi11l[li1li]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lIl1Ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIilII($.getdata("CookiesJD") || "[]").map(iIIIll => iIIIll.cookie)].filter(ll1Ii1 => !!ll1Ii1);
let Ii1IlI = "30",
  Il1I1I = "0";
Ii1IlI = $.isNode() ? process.env.retrynum ? process.env.retrynum : Ii1IlI : $.getdata("retrynum") ? $.getdata("retrynum") : Il1I1I;
Il1I1I = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : Il1I1I : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : Il1I1I;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let ll1Il1 = "",
  IIlIIi = "",
  iliiil = "cb9168cb545f40419_230808";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const li11ll = require("./function/krgetToken"),
  i1Il1 = require("./function/krh5st"),
  li1l1 = require("./function/krgetua");
let IIiI1l = "https://jinggengjcq-isv.isvjcloud.com";
IIlIIi = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IIlIIi : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IIlIIi;
let IIiI1i = "",
  ilIllI = "";
$.whitelist = process.env.DPLHTY_whitelist || IIiI1i;
$.blacklist = process.env.DPLHTY_blacklist || ilIllI;
ll1IiI();
Ii1Iii();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = IIlIIi ? IIlIIi : authorCodeList[iIIIli(0, authorCodeList.length)];
  } else {
    let illI1l = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = IIlIIi ? IIlIIi : illI1l[iIIIli(0, illI1l.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 默认抽奖次数：" + Il1I1I + " 💬 重试次数：" + Ii1IlI);
  console.log("\n💬 请在有水的情况下运行");
  if (process.env.jd_jinggeng_address) UserAdd_Data_Arr = process.env.jd_jinggeng_address;else {
    UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  }
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let I1I111 = [];
    I1I111 = UserAdd_Data_Arr.split("|");
    var iliii1 = Math.floor(Math.random() * I1I111.length);
    if (I1I111[iliii1] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else I1I111 = I1I111[iliii1];
    if (process.env.jd_jinggeng_address) {
      I1I111 = I1I111.split("@");
      if (I1I111.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let I11I = 0; I11I < 6; I11I++) {
        if (I1I111[I11I] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      I1I111 = I1I111.split("@");
      if (I1I111.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let i1lII = 0; i1lII < 7; i1lII++) {
        if (I1I111[i1lII] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = I1I111[0];
    $.phone = I1I111[1];
    $.province = I1I111[2];
    $.city = I1I111[3];
    $.county = I1I111[4];
    $.address = I1I111[5];
  }
  if (!lIl1Ii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = iliiil;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let iII111 = 0; iII111 < lIl1Ii.length; iII111++) {
    lIl1Il = lIl1Ii[iII111];
    if (lIl1Il) {
      $.UserName = decodeURIComponent(lIl1Il.match(/pt_pin=([^; ]+)(?=;?)/) && lIl1Il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iII111 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await li1l1($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await I1IIli();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let lIiIil = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + lIiIil);
    if ($.isNode()) await i1IlI.sendNotify("" + $.name, "" + lIiIil);
  }
})().catch(llIiii => $.logErr(llIiii)).finally(() => $.done());
async function I1IIli() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    ll1Il1 = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await li11ll(lIl1Il, IIiI1l);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await Il1I1i("activity_load");
    for (let Iil1l = 0; Iil1l < Ii1IlI; Iil1l++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await Il1I1i("activity_load");
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
    await Il1I1i("绑定");
    for (let IllIi = 0; IllIi < Ii1IlI; IllIi++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await Il1I1i("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await Il1I1i("shopList");
    for (let IIli = 0; IIli < Ii1IlI; IIli++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await Il1I1i("shopList");
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
        await Il1I1i("mission");
        for (let i11I1 = 0; i11I1 < Ii1IlI; i11I1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await Il1I1i("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await ilIlli();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await ilIlli(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await Il1I1i("activity_load");
          for (let l1I1I = 0; l1I1I < Ii1IlI; l1I1I++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await Il1I1i("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await Il1I1i("shopList");
          for (let iilllI = 0; iilllI < Ii1IlI; iilllI++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await Il1I1i("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await Il1I1i("mission");
      for (let iillil = 0; iillil < Ii1IlI; iillil++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await Il1I1i("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await Il1I1i("mission");
      for (let ilI1iI = 0; ilI1iI < Ii1IlI; ilI1iI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await Il1I1i("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await Il1I1i("activity_load");
    for (let l1I1i = 0; l1I1i < Ii1IlI; l1I1i++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await Il1I1i("activity_load");
        if ($.krFlag) break;
      }
    }
    if (Il1I1I + "" !== "0") {
      $.runFalag = true;
      let i1i1il = parseInt($.remainPoint / 200);
      Il1I1I = parseInt(Il1I1I, 10);
      if (i1i1il > Il1I1I) i1i1il = Il1I1I;
      console.log("💖 抽奖次数为:" + i1i1il + "，当前积分：" + $.remainPoint);
      for (m = 1; i1i1il--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await Il1I1i("抽奖");
        for (let i1i1ii = 0; i1i1ii < Ii1IlI; i1i1ii++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await Il1I1i("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(i1i1il) <= 0) break;
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
  } catch (liIIII) {
    console.log(liIIII);
  }
}
async function Il1I1i(IIllII) {
  if ($.outFlag) return;
  let iI11il = "https://jinggengjcq-isv.isvjcloud.com",
    iii111 = "",
    liiI = "POST",
    liIII1 = "";
  switch (IIllII) {
    case "activity_load":
      url = iI11il + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      liIII1 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) liIII1 = {
        ...liIII1,
        "shopId": "" + $.joinVenderId
      };
      iii111 = Ii1Il1("/jdBigAlliance/activity/load", liIII1);
      break;
    case "shopList":
      url = iI11il + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      liIII1 = {};
      iii111 = Ii1Il1("/jdBigAlliance/shop/shopList", liIII1);
      break;
    case "绑定":
      url = iI11il + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      liIII1 = {
        "inviterNick": $.inviteNick || ""
      };
      iii111 = Ii1Il1("/jdBigAlliance/customer/inviteRelation", liIII1);
      break;
    case "mission":
      url = iI11il + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      liIII1 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) liIII1 = {
        ...liIII1,
        "shopId": $.joinVenderId
      };
      iii111 = Ii1Il1("/jdBigAlliance/mission/completeMission", liIII1);
      break;
    case "抽奖":
      url = iI11il + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      liIII1 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      iii111 = Ii1Il1("/jdBigAlliance/interactive/drawPost", liIII1);
      break;
    case "updateAddress":
      url = iI11il + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      liIII1 = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      iii111 = Ii1Il1("/jdBigAlliance/awards/updateAddress", liIII1);
      break;
    default:
      console.log("错误" + IIllII);
  }
  let I111il = Il1I1l(url, iii111, liiI);
  return new Promise(async iIii11 => {
    $.post(I111il, (i1i1lI, IIllIi, i11l1l) => {
      try {
        i1i1lI ? (IIllIi && IIllIi.statusCode && IIllIi.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : lIilI1(IIllII, i11l1l);
      } catch (i11l1i) {
        console.log(i11l1i, IIllIi);
      } finally {
        iIii11();
      }
    });
  });
}
async function lIilI1(IlIii, iI11lI) {
  let IlillI = "";
  try {
    $.krFlag = true;
    if (IlIii != "accessLogWithAD" || IlIii != "drawContent") {
      iI11lI && (IlillI = JSON.parse(iI11lI));
    }
  } catch (liIl11) {
    console.log("🤬 " + IlIii + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let IIl11I = "";
    switch (IlIii) {
      case "抽奖":
        if (typeof IlillI == "object") {
          if (IlillI.success && IlillI.success === true && IlillI.data) {
            if (IlillI.data.status && IlillI.data.status == 200) {
              if (IlillI.data.data.sendResult) {
                console.log("抽中：" + IlillI.data.data.awardSetting.awardName);
                IlillI.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = IlillI.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await Il1I1i("updateAddress"), await $.wait(4000));
              } else !IlillI.data.data.result ? console.log("💔 空气") : console.log(IlillI.data.data);
            } else IlillI.data.status && IlillI.data.status == 500 && console.log("" + (IlillI.data.msg || ""));
          } else IlillI.message ? console.log("" + (IlillI.message || "")) : console.log(iI11lI);
        } else console.log(iI11lI);
        break;
      case "updateAddress":
        if (typeof IlillI == "object") {
          if (IlillI.success && IlillI.success === true && IlillI.data) {
            if (IlillI.data.status && IlillI.data.status == 200) IlillI.data.data.result ? console.log("💖 地址填写成功，返回：" + IlillI.data.data.msg) : console.log(IlillI.data.data);else IlillI.data.status && IlillI.data.status == 500 && console.log("" + (IlillI.data.msg || ""));
          } else {
            if (IlillI.message) console.log("" + (IlillI.message || ""));else {
              console.log(iI11lI);
            }
          }
        } else console.log(iI11lI);
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
        IIl11I = "";
        if (IlIii == "followShop") IIl11I = "关注";
        if (IlIii == "addCart") IIl11I = "加购";
        if (typeof IlillI == "object") {
          if (IlillI.success && IlillI.success === true && IlillI.data) {
            if (IlillI.data.status && IlillI.data.status == 200) {
              IlillI = IlillI.data;
              if (IlIii != "setMixNick" && (IlillI.msg || IlillI.data.isOpenCard || IlillI.data.remark)) console.log("🔊 " + (IIl11I && IIl11I + ":" || "") + (IlillI.msg || IlillI.data.isOpenCard || IlillI.data.remark || ""));
              if (IlIii == "activity_load") {
                if (IlillI.msg || IlillI.data.isOpenCard) {
                  if ((IlillI.msg || IlillI.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                IlillI.data && ($.endTime = IlillI.data.cusActivity.endTime || 0, $.MixNick = IlillI.data.missionCustomer.buyerNick || "", $.usedChance = IlillI.data.missionCustomer.usedChance || 0, $.remainPoint = IlillI.data.missionCustomer.remainPoint || 0, $.hasCollectShop = IlillI.data.missionCustomer.hasCollectShop || 0, $.hasAddCart = IlillI.data.missionCustomer.hasAddCart || 0);
              } else {
                if (IlIii == "shopList") $.openList = IlillI.data || [];else {
                  if (IlIii == "mission") {
                    if (IlillI.data.remark.indexOf("不是会员") > -1) $.openCard = true;else {
                      $.openCard = false;
                    }
                  } else {
                    if (IlIii == "uniteOpenCardOne") $.uniteOpenCar = IlillI.msg || IlillI.data.msg || "";else {
                      if (IlIii == "myAward") {
                        console.log("🔊 我的奖品：");
                        let iliI1i = 0;
                        for (let IIl11i in IlillI.data.list || []) {
                          let ii1iIl = IlillI.data.list[IIl11i];
                          iliI1i += Number(ii1iIl.awardDes);
                        }
                        if (iliI1i > 0) console.log("🔊 共获得" + iliI1i + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IlIii == "missionInviteList" && console.log("🔊 邀请人数(" + IlillI.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (IlillI.data.msg) {
                IlillI.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (IlillI.data.msg || ""));
              } else {
                if (IlillI.errorMessage) {
                  if (IlillI.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (IlillI.errorMessage || ""));
                } else console.log("" + iI11lI);
              }
            }
          } else IlillI.errorMessage ? console.log("🔊 " + (IlillI.errorMessage || "")) : console.log("" + iI11lI);
        } else {}
        break;
      default:
        console.log((IIl11I || IlIii) + "-> " + iI11lI);
    }
    if (typeof IlillI == "object") {
      if (IlillI.errorMessage) {
        if (IlillI.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (lIi11) {}
}
function Il1I1l(i11II1, Ilill1, I111lI = "POST") {
  let iiilIl = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": lIl1Il,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (i11II1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1) {
    iiilIl.Origin = "https://jinggengjcq-isv.isvjcloud.com";
    iiilIl["Content-Type"] = "application/json; charset=utf-8";
    delete iiilIl.Cookie;
  }
  return {
    "url": i11II1,
    "method": I111lI,
    "headers": iiilIl,
    "body": Ilill1,
    "timeout": 30 * 1000
  };
}
function Ii1Il1(liIl1i, liIl1l) {
  d = {
    "actId": $.actId,
    ...liIl1l,
    "method": liIl1i,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = I1IIll(d);
  const lIi1I = {
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
        ...liIl1l,
        "method": liIl1i,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return liIl1i.indexOf("missionInviteList") > -1 && delete lIi1I.params.admJson.actId, $.toStr(lIi1I, lIi1I);
}
function iIIIli(iIii1, Il1il1) {
  return Math.floor(Math.random() * (Il1il1 - iIii1)) + iIii1;
}
function I1IIll(Ii1ll) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(Ii1ll));
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
function i1Ii1(il1Il1) {
  il1Il1 = il1Il1 || 32;
  let Ii1li = "abcdef0123456789",
    iIiIli = Ii1li.length,
    iIllI = "";
  for (i = 0; i < il1Il1; i++) iIllI += Ii1li.charAt(Math.floor(Math.random() * iIiIli));
  return iIllI;
}
function lIilII(Ii1lli) {
  if (typeof Ii1lli == "string") try {
    return JSON.parse(Ii1lli);
  } catch (Ii1lI) {
    return console.log(Ii1lI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function ilIlli() {
  if (!$.joinVenderId) return;
  return new Promise(async I1Ii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I1Il1i = "";
    if ($.shopactivityId) I1Il1i = ",\"activityId\":" + $.shopactivityId;
    const i1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I1Il1i + ",\"channel\":406}",
      IlIiII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1l)
      };
    for (var l1li1i = "", l1li1l = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", il1Ill = 0; il1Ill < 16; il1Ill++) {
      var il1Ili = Math.round(Math.random() * (l1li1l.length - 1));
      l1li1i += l1li1l.substring(il1Ili, il1Ili + 1);
    }
    uuid = Buffer.from(l1li1i, "utf8").toString("base64");
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
    const iIliI = await i1Il1("8adfb", IlIiII),
      i1IlII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i1l + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIliI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": lIl1Il,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1IlII, async (ilIii1, ll1III, ll1II1) => {
      try {
        if (ilIii1) ll1III && typeof ll1III.statusCode != "undefined" && ll1III.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ll1II1 = ll1II1 && ll1II1.match(/jsonp_.*?\((.*?)\);/) && ll1II1.match(/jsonp_.*?\((.*?)\);/)[1] || ll1II1;
          let IIlIil = $.toObj(ll1II1, ll1II1);
          if (IIlIil && typeof IIlIil == "object") {
            if (IIlIil && IIlIil.success === true) {
              console.log(" >> " + IIlIil.message);
              $.errorJoinShop = IIlIil.message;
              if (IIlIil.result && IIlIil.result.giftInfo) {
                for (let l11llI of IIlIil.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + l11llI.discountString + l11llI.prizeName + l11llI.secondLineDesc);
                }
              }
            } else IIlIil && typeof IIlIil == "object" && IIlIil.message ? ($.errorJoinShop = IIlIil.message, console.log("" + (IIlIil.message || ""))) : console.log(ll1II1);
          } else console.log(ll1II1);
        }
      } catch (ll1IIi) {
        $.logErr(ll1IIi, ll1III);
      } finally {
        I1Ii();
      }
    });
  });
}
async function I1IIlI() {
  return new Promise(async i1iiI1 => {
    const iIilI1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      i1IIiI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIilI1)
      };
    await $.wait(1000);
    const lI1i1I = await i1Il1("8adfb", i1IIiI),
      l111II = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIilI1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI1i1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": lIl1Il,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l111II, async (i1IIii, i1IIil, il111l) => {
      try {
        if (i1IIii) {
          i1IIil && typeof i1IIil.statusCode != "undefined" && i1IIil.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          il111l = il111l && il111l.match(/jsonp_.*?\((.*?)\);/) && il111l.match(/jsonp_.*?\((.*?)\);/)[1] || il111l;
          let l1II1I = $.toObj(il111l, il111l);
          if (l1II1I && typeof l1II1I == "object") {
            if (l1II1I && l1II1I.success == true) {
              console.log("去加入：" + (l1II1I.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = l1II1I.result.interestsRuleList && l1II1I.result.interestsRuleList[0] && l1II1I.result.interestsRuleList[0].interestsInfo && l1II1I.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else {
            console.log(il111l);
          }
        }
      } catch (ii11iI) {
        $.logErr(ii11iI, i1IIil);
      } finally {
        i1iiI1();
      }
    });
  });
}
function ilIlll(i1IIl1) {
  return new Promise(I1IIi => {
    const lIlIi1 = {
      "url": "" + i1IIl1,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIlIi1, async (iIi111, ii11ii, ll1l11) => {
      try {
        if (iIi111) {} else {
          if (ll1l11) ll1l11 = JSON.parse(ll1l11);else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (I11lli) {
        $.logErr(I11lli, ii11ii);
        ll1l11 = null;
      } finally {
        I1IIi(ll1l11);
      }
    });
  });
}
function iIIIli(I11lll, I1l1I) {
  return Math.floor(Math.random() * (I1l1I - I11lll)) + I11lll;
}
function Ii1Iii() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const i1IIli = Array.from(new Set($.blacklist.split("&")));
  console.log(i1IIli.join("&") + "\n");
  let lI111 = i1IIli,
    iiliIl = [],
    IiIl1I = false;
  for (let ilI1i = 0; ilI1i < lIl1Ii.length; ilI1i++) {
    let llIiI1 = decodeURIComponent(lIl1Ii[ilI1i].match(/pt_pin=([^; ]+)(?=;?)/) && lIl1Ii[ilI1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!llIiI1) break;
    let li1li1 = false;
    for (let li1liI of lI111) {
      if (li1liI && li1liI == llIiI1) {
        li1li1 = true;
        break;
      }
    }
    if (!li1li1) {
      IiIl1I = true;
      iiliIl.splice(ilI1i, -1, lIl1Ii[ilI1i]);
    }
  }
  if (IiIl1I) lIl1Ii = iiliIl;
}
function Ii1Iil(lIl11i, lIl11l) {
  lIl11l != 0 && lIl11i.unshift(lIl11i.splice(lIl11l, 1)[0]);
}
function ll1IiI() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(lIl1Ii, lIl1Ii));
    return;
  }
  console.log("当前已设置白名单：");
  const IllI = Array.from(new Set($.whitelist.split("&")));
  console.log(IllI.join("&") + "\n");
  let iIilIl = [],
    ilI1I = IllI;
  for (let lIllI1 in lIl1Ii) {
    let lI1i1i = decodeURIComponent(lIl1Ii[lIllI1].match(/pt_pin=([^; ]+)(?=;?)/) && lIl1Ii[lIllI1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    ilI1I.includes(lI1i1i) && iIilIl.push(lIl1Ii[lIllI1]);
  }
  helpCookiesArr = iIilIl;
  if (ilI1I.length > 1) {
    for (let il1Ii1 in ilI1I) {
      let lI1i1l = ilI1I[ilI1I.length - 1 - il1Ii1];
      if (!lI1i1l) continue;
      for (let li1ll1 in helpCookiesArr) {
        let iI1II = decodeURIComponent(helpCookiesArr[li1ll1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[li1ll1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        lI1i1l == iI1II && Ii1Iil(helpCookiesArr, li1ll1);
      }
    }
  }
}