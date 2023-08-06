/*
大牌联合080102期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023080102def/oC2023080102def?actId=2ed080b73da54d4c98c9_23080102

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
#大牌联合080102期
1 1 1 1 * jd_dplh080102.js, tag=大牌联合080102期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合080102期");
const lIiIiI = $.isNode() ? require("./jdCookie.js") : "",
  ilIliI = $.isNode() ? require("./sendNotify") : "";
let II1li = [],
  Ii1lIi = "";
if ($.isNode()) {
  Object.keys(lIiIiI).forEach(lIl1Ii => {
    II1li.push(lIiIiI[lIl1Ii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else II1li = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIlIII($.getdata("CookiesJD") || "[]").map(lIl1Il => lIl1Il.cookie)].filter(Ii1IlI => !!Ii1IlI);
let li11il = "30",
  ll1lII = "0";
li11il = $.isNode() ? process.env.retrynum ? process.env.retrynum : li11il : $.getdata("retrynum") ? $.getdata("retrynum") : ll1lII;
ll1lII = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : ll1lII : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : ll1lII;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let Ii1lIl = "",
  I1IIi1 = "",
  ll1lI1 = "2ed080b73da54d4c98c9_23080102";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const II1ll = require("./function/krgetToken"),
  liii11 = require("./function/krh5st"),
  lIiIii = require("./function/krgetua");
let i1Ill = "https://jinggengjcq-isv.isvjcloud.com";
I1IIi1 = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + I1IIi1 : $.getdata("helpnum") ? $.getdata("helpnum") : "" + I1IIi1;
let Il1I11 = "",
  lIl1II = "";
$.whitelist = process.env.DPLHTY_whitelist || Il1I11;
$.blacklist = process.env.DPLHTY_blacklist || lIl1II;
i1IlI();
IIiI1I();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = I1IIi1 ? I1IIi1 : authorCodeList[ll1Iil(0, authorCodeList.length)];
  } else {
    let iII11I = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = I1IIi1 ? I1IIi1 : iII11I[ll1Iil(0, iII11I.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 默认抽奖次数：" + ll1lII + " 💬 重试次数：" + li11il);
  console.log("\n💬 请在有水的情况下运行");
  if (process.env.jd_jinggeng_address) {
    UserAdd_Data_Arr = process.env.jd_jinggeng_address;
  } else UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let i1lIl = [];
    i1lIl = UserAdd_Data_Arr.split("|");
    var ll1Il1 = Math.floor(Math.random() * i1lIl.length);
    if (i1lIl[ll1Il1] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else i1lIl = i1lIl[ll1Il1];
    if (process.env.jd_jinggeng_address) {
      i1lIl = i1lIl.split("@");
      if (i1lIl.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let III1li = 0; III1li < 6; III1li++) {
        if (i1lIl[III1li] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      i1lIl = i1lIl.split("@");
      if (i1lIl.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let Ili1i1 = 0; Ili1i1 < 7; Ili1i1++) {
        if (i1lIl[Ili1i1] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = i1lIl[0];
    $.phone = i1lIl[1];
    $.province = i1lIl[2];
    $.city = i1lIl[3];
    $.county = i1lIl[4];
    $.address = i1lIl[5];
  }
  if (!II1li[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = ll1lI1;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let l1lIII = 0; l1lIII < II1li.length; l1lIII++) {
    Ii1lIi = II1li[l1lIII];
    if (Ii1lIi) {
      $.UserName = decodeURIComponent(Ii1lIi.match(/pt_pin=([^; ]+)(?=;?)/) && Ii1lIi.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1lIII + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await lIiIii($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await Ii1Ili();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iII11i = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iII11i);
    if ($.isNode()) await ilIliI.sendNotify("" + $.name, "" + iII11i);
  }
})().catch(l1iI1i => $.logErr(l1iI1i)).finally(() => $.done());
async function Ii1Ili() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    Ii1lIl = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await II1ll(Ii1lIi, i1Ill);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await IIiI11("activity_load");
    for (let iII1i = 0; iII1i < li11il; iII1i++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IIiI11("activity_load");
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
    await IIiI11("绑定");
    for (let ilI1ii = 0; ilI1ii < li11il; ilI1ii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IIiI11("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await IIiI11("shopList");
    for (let i11Il = 0; i11Il < li11il; i11Il++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IIiI11("shopList");
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
        await IIiI11("mission");
        for (let i11Ii = 0; i11Ii < li11il; i11Ii++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await IIiI11("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await i1Iil();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await i1Iil(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await IIiI11("activity_load");
          for (let iiiIli = 0; iiiIli < li11il; iiiIli++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await IIiI11("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await IIiI11("shopList");
          for (let IllIi = 0; IllIi < li11il; IllIi++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await IIiI11("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await IIiI11("mission");
      for (let iII11 = 0; iII11 < li11il; iII11++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await IIiI11("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await IIiI11("mission");
      for (let l1iI11 = 0; l1iI11 < li11il; l1iI11++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await IIiI11("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else {
      console.log("💔 呜呜呜，已完成加购任务");
    }
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await IIiI11("activity_load");
    for (let IlIiI = 0; IlIiI < li11il; IlIiI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IIiI11("activity_load");
        if ($.krFlag) break;
      }
    }
    if (ll1lII + "" !== "0") {
      $.runFalag = true;
      let l1iI1I = parseInt($.remainPoint / 200);
      ll1lII = parseInt(ll1lII, 10);
      if (l1iI1I > ll1lII) l1iI1I = ll1lII;
      console.log("💖 抽奖次数为:" + l1iI1I + "，当前积分：" + $.remainPoint);
      for (m = 1; l1iI1I--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IIiI11("抽奖");
        for (let l1I1I = 0; l1I1I < li11il; l1I1I++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await IIiI11("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(l1iI1I) <= 0) break;
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
  } catch (iillii) {
    console.log(iillii);
  }
}
async function IIiI11(ilI1iI) {
  if ($.outFlag) return;
  let l1I1l = "https://jinggengjcq-isv.isvjcloud.com",
    i11II = "",
    IlIi1 = "POST",
    i1i1il = "";
  switch (ilI1iI) {
    case "activity_load":
      url = l1I1l + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i1i1il = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) i1i1il = {
        ...i1i1il,
        "shopId": "" + $.joinVenderId
      };
      i11II = IIlII1("/jdBigAlliance/activity/load", i1i1il);
      break;
    case "shopList":
      url = l1I1l + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i1i1il = {};
      i11II = IIlII1("/jdBigAlliance/shop/shopList", i1i1il);
      break;
    case "绑定":
      url = l1I1l + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i1i1il = {
        "inviterNick": $.inviteNick || ""
      };
      i11II = IIlII1("/jdBigAlliance/customer/inviteRelation", i1i1il);
      break;
    case "mission":
      url = l1I1l + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i1i1il = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) i1i1il = {
        ...i1i1il,
        "shopId": $.joinVenderId
      };
      i11II = IIlII1("/jdBigAlliance/mission/completeMission", i1i1il);
      break;
    case "抽奖":
      url = l1I1l + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i1i1il = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      i11II = IIlII1("/jdBigAlliance/interactive/drawPost", i1i1il);
      break;
    case "updateAddress":
      url = l1I1l + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i1i1il = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      i11II = IIlII1("/jdBigAlliance/awards/updateAddress", i1i1il);
      break;
    default:
      console.log("错误" + ilI1iI);
  }
  let i1i1ii = ll1Iii(url, i11II, IlIi1);
  return new Promise(async iliili => {
    $.post(i1i1ii, (I1liII, I1ii1I, Ililli) => {
      try {
        if (I1liII) {
          I1ii1I && I1ii1I.statusCode && I1ii1I.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else Ii1Ill(ilI1iI, Ililli);
      } catch (iIliI1) {
        console.log(iIliI1, I1ii1I);
      } finally {
        iliili();
      }
    });
  });
}
async function Ii1Ill(iIii11, i1i1lI) {
  let i11l1l = "";
  try {
    $.krFlag = true;
    if (iIii11 != "accessLogWithAD" || iIii11 != "drawContent") {
      if (i1i1lI) {
        i11l1l = JSON.parse(i1i1lI);
      }
    }
  } catch (IliliI) {
    console.log("🤬 " + iIii11 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let iliI1I = "";
    switch (iIii11) {
      case "抽奖":
        if (typeof i11l1l == "object") {
          if (i11l1l.success && i11l1l.success === true && i11l1l.data) {
            if (i11l1l.data.status && i11l1l.data.status == 200) {
              if (i11l1l.data.data.sendResult) {
                console.log("抽中：" + i11l1l.data.data.awardSetting.awardName);
                if (i11l1l.data.data.awardSetting.awardType == "goods") {
                  if (process.env.jd_jinggeng_address) {
                    $.actLogId = i11l1l.data.data.awardSendLog.id;
                    console.log("抽中实物啦，奖品领取ID：" + $.actLogId);
                    await IIiI11("updateAddress");
                    await $.wait(4000);
                  }
                }
              } else !i11l1l.data.data.result ? console.log("💔 空气") : console.log(i11l1l.data.data);
            } else i11l1l.data.status && i11l1l.data.status == 500 && console.log("" + (i11l1l.data.msg || ""));
          } else i11l1l.message ? console.log("" + (i11l1l.message || "")) : console.log(i1i1lI);
        } else console.log(i1i1lI);
        break;
      case "updateAddress":
        if (typeof i11l1l == "object") {
          if (i11l1l.success && i11l1l.success === true && i11l1l.data) {
            if (i11l1l.data.status && i11l1l.data.status == 200) {
              if (i11l1l.data.data.result) console.log("💖 地址填写成功，返回：" + i11l1l.data.data.msg);else {
                console.log(i11l1l.data.data);
              }
            } else i11l1l.data.status && i11l1l.data.status == 500 && console.log("" + (i11l1l.data.msg || ""));
          } else i11l1l.message ? console.log("" + (i11l1l.message || "")) : console.log(i1i1lI);
        } else console.log(i1i1lI);
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
        iliI1I = "";
        if (iIii11 == "followShop") iliI1I = "关注";
        if (iIii11 == "addCart") iliI1I = "加购";
        if (typeof i11l1l == "object") {
          if (i11l1l.success && i11l1l.success === true && i11l1l.data) {
            if (i11l1l.data.status && i11l1l.data.status == 200) {
              i11l1l = i11l1l.data;
              if (iIii11 != "setMixNick" && (i11l1l.msg || i11l1l.data.isOpenCard || i11l1l.data.remark)) console.log("🔊 " + (iliI1I && iliI1I + ":" || "") + (i11l1l.msg || i11l1l.data.isOpenCard || i11l1l.data.remark || ""));
              if (iIii11 == "activity_load") {
                if (i11l1l.msg || i11l1l.data.isOpenCard) {
                  if ((i11l1l.msg || i11l1l.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (i11l1l.data) {
                  $.endTime = i11l1l.data.cusActivity.endTime || 0;
                  $.MixNick = i11l1l.data.missionCustomer.buyerNick || "";
                  $.usedChance = i11l1l.data.missionCustomer.usedChance || 0;
                  $.remainPoint = i11l1l.data.missionCustomer.remainPoint || 0;
                  $.hasCollectShop = i11l1l.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = i11l1l.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (iIii11 == "shopList") $.openList = i11l1l.data || [];else {
                  if (iIii11 == "mission") {
                    if (i11l1l.data.remark.indexOf("不是会员") > -1) {
                      $.openCard = true;
                    } else $.openCard = false;
                  } else {
                    if (iIii11 == "uniteOpenCardOne") {
                      $.uniteOpenCar = i11l1l.msg || i11l1l.data.msg || "";
                    } else {
                      if (iIii11 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let l1Ill1 = 0;
                        for (let iiilI1 in i11l1l.data.list || []) {
                          let ll111l = i11l1l.data.list[iiilI1];
                          l1Ill1 += Number(ll111l.awardDes);
                        }
                        if (l1Ill1 > 0) console.log("🔊 共获得" + l1Ill1 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else iIii11 == "missionInviteList" && console.log("🔊 邀请人数(" + i11l1l.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (i11l1l.data.msg) {
                i11l1l.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (i11l1l.data.msg || ""));
              } else {
                if (i11l1l.errorMessage) {
                  if (i11l1l.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (i11l1l.errorMessage || ""));
                } else {
                  console.log("" + i1i1lI);
                }
              }
            }
          } else i11l1l.errorMessage ? console.log("🔊 " + (i11l1l.errorMessage || "")) : console.log("" + i1i1lI);
        } else {}
        break;
      default:
        console.log((iliI1I || iIii11) + "-> " + i1i1lI);
    }
    if (typeof i11l1l == "object") {
      if (i11l1l.errorMessage) {
        if (i11l1l.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (ii1iIl) {}
}
function ll1Iii(Ill1l1, Ilili1, iIiiI = "POST") {
  let l1iiiI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Ii1lIi,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return Ill1l1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (l1iiiI.Origin = "https://jinggengjcq-isv.isvjcloud.com", l1iiiI["Content-Type"] = "application/json; charset=utf-8", delete l1iiiI.Cookie), {
    "url": Ill1l1,
    "method": iIiiI,
    "headers": l1iiiI,
    "body": Ilili1,
    "timeout": 30 * 1000
  };
}
function IIlII1(I111lI, l1iii1) {
  d = {
    "actId": $.actId,
    ...l1iii1,
    "method": I111lI,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = li1lI(d);
  const Il1ilI = {
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
        ...l1iii1,
        "method": I111lI,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return I111lI.indexOf("missionInviteList") > -1 && delete Il1ilI.params.admJson.actId, $.toStr(Il1ilI, Il1ilI);
}
function ll1Iil(iiilIi, l1Illl) {
  return Math.floor(Math.random() * (l1Illl - iiilIi)) + iiilIi;
}
function li1lI(Ill1li) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(Ill1li));
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
function iliiiI(I1liIl) {
  I1liIl = I1liIl || 32;
  let l11li = "abcdef0123456789",
    iIlli = l11li.length,
    l11ll = "";
  for (i = 0; i < I1liIl; i++) l11ll += l11li.charAt(Math.floor(Math.random() * iIlli));
  return l11ll;
}
function IIlIII(iiii1) {
  if (typeof iiii1 == "string") try {
    return JSON.parse(iiii1);
  } catch (il1IlI) {
    return console.log(il1IlI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function i1Iil() {
  if (!$.joinVenderId) return;
  return new Promise(async li11Il => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIlIl1 = "";
    if ($.shopactivityId) IIlIl1 = ",\"activityId\":" + $.shopactivityId;
    const liII1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIlIl1 + ",\"channel\":406}",
      Ii1ll1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liII1l)
      };
    for (var IIlIlI = "", I1III1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iIll1 = 0; iIll1 < 16; iIll1++) {
      var l11li1 = Math.round(Math.random() * (I1III1.length - 1));
      IIlIlI += I1III1.substring(l11li1, l11li1 + 1);
    }
    uuid = Buffer.from(IIlIlI, "utf8").toString("base64");
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
    const i1I = await liii11("8adfb", Ii1ll1),
      liII1I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + liII1l + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ii1lIi,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liII1I, async (I1Il1l, I1Il1i, i1l) => {
      try {
        if (I1Il1l) {
          I1Il1i && typeof I1Il1i.statusCode != "undefined" && I1Il1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          i1l = i1l && i1l.match(/jsonp_.*?\((.*?)\);/) && i1l.match(/jsonp_.*?\((.*?)\);/)[1] || i1l;
          let ll1II1 = $.toObj(i1l, i1l);
          if (ll1II1 && typeof ll1II1 == "object") {
            if (ll1II1 && ll1II1.success === true) {
              console.log(" >> " + ll1II1.message);
              $.errorJoinShop = ll1II1.message;
              if (ll1II1.result && ll1II1.result.giftInfo) {
                for (let l11lii of ll1II1.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + l11lii.discountString + l11lii.prizeName + l11lii.secondLineDesc);
                }
              }
            } else ll1II1 && typeof ll1II1 == "object" && ll1II1.message ? ($.errorJoinShop = ll1II1.message, console.log("" + (ll1II1.message || ""))) : console.log(i1l);
          } else console.log(i1l);
        }
      } catch (ilIiiI) {
        $.logErr(ilIiiI, I1Il1i);
      } finally {
        li11Il();
      }
    });
  });
}
async function lIi11i() {
  return new Promise(async iIlllI => {
    const iIllii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iIllil = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIllii)
      };
    await $.wait(1000);
    const l11lli = await liii11("8adfb", iIllil),
      I1Il11 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIllii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11lli),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ii1lIi,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1Il11, async (iIlliI, IlIiIi, IIlIi1) => {
      try {
        if (iIlliI) IlIiIi && typeof IlIiIi.statusCode != "undefined" && IlIiIi.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IIlIi1 = IIlIi1 && IIlIi1.match(/jsonp_.*?\((.*?)\);/) && IIlIi1.match(/jsonp_.*?\((.*?)\);/)[1] || IIlIi1;
          let i1iiI1 = $.toObj(IIlIi1, IIlIi1);
          i1iiI1 && typeof i1iiI1 == "object" ? i1iiI1 && i1iiI1.success == true && (console.log("去加入：" + (i1iiI1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1iiI1.result.interestsRuleList && i1iiI1.result.interestsRuleList[0] && i1iiI1.result.interestsRuleList[0].interestsInfo && i1iiI1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IIlIi1);
        }
      } catch (iIilI1) {
        $.logErr(iIilI1, IlIiIi);
      } finally {
        iIlllI();
      }
    });
  });
}
function i1Iii(IiIII1) {
  return new Promise(l1II1i => {
    const lIllIi = {
      "url": "" + IiIII1,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIllIi, async (iIi11i, ii11i1, ll1l1l) => {
      try {
        if (iIi11i) {} else ll1l1l ? ll1l1l = JSON.parse(ll1l1l) : console.log("未获取到数据,请重新运行");
      } catch (iI1iII) {
        $.logErr(iI1iII, ii11i1);
        ll1l1l = null;
      } finally {
        l1II1i(ll1l1l);
      }
    });
  });
}
function ll1Iil(l111Ii, lI1i11) {
  return Math.floor(Math.random() * (lI1i11 - l111Ii)) + l111Ii;
}
function IIiI1I() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iIl1II = Array.from(new Set($.blacklist.split("&")));
  console.log(iIl1II.join("&") + "\n");
  let il1lIi = iIl1II,
    Ili1 = [],
    ii11iI = false;
  for (let i1IIlI = 0; i1IIlI < II1li.length; i1IIlI++) {
    let ii11il = decodeURIComponent(II1li[i1IIlI].match(/pt_pin=([^; ]+)(?=;?)/) && II1li[i1IIlI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ii11il) break;
    let il1lII = false;
    for (let iIi111 of il1lIi) {
      if (iIi111 && iIi111 == ii11il) {
        il1lII = true;
        break;
      }
    }
    !il1lII && (ii11iI = true, Ili1.splice(i1IIlI, -1, II1li[i1IIlI]));
  }
  if (ii11iI) II1li = Ili1;
}
function lIi11l(ll1l11, iIl1I1) {
  iIl1I1 != 0 && ll1l11.unshift(ll1l11.splice(iIl1I1, 1)[0]);
}
function i1IlI() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(II1li, II1li));
    return;
  }
  console.log("当前已设置白名单：");
  const i111ll = Array.from(new Set($.whitelist.split("&")));
  console.log(i111ll.join("&") + "\n");
  let I11lll = [],
    I1l1I = i111ll;
  for (let li1li1 in II1li) {
    let il1lIl = decodeURIComponent(II1li[li1li1].match(/pt_pin=([^; ]+)(?=;?)/) && II1li[li1li1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I1l1I.includes(il1lIl) && I11lll.push(II1li[li1li1]);
  }
  helpCookiesArr = I11lll;
  if (I1l1I.length > 1) for (let i111l1 in I1l1I) {
    let lIl11i = I1l1I[I1l1I.length - 1 - i111l1];
    if (!lIl11i) continue;
    for (let lIl11l in helpCookiesArr) {
      let iiii1i = decodeURIComponent(helpCookiesArr[lIl11l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIl11l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lIl11i == iiii1i && lIi11l(helpCookiesArr, lIl11l);
    }
  }
}