/*
大牌联合080101期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230801aslw/oC20230801aslw?actId=6ad9acbdda784f85ad_23080101

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
#大牌联合080101期
1 1 1 1 * jd_dplh080101.js, tag=大牌联合080101期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合080101期");
const liii11 = $.isNode() ? require("./jdCookie.js") : "",
  lIiIii = $.isNode() ? require("./sendNotify") : "";
let i1Ill = [],
  Il1I11 = "";
if ($.isNode()) {
  Object.keys(liii11).forEach(IIiI1l => {
    i1Ill.push(liii11[IIiI1l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1Ill = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...li11li($.getdata("CookiesJD") || "[]").map(IIiI1i => IIiI1i.cookie)].filter(ilIllI => !!ilIllI);
let lIl1II = "30",
  Ii1Ili = "0";
lIl1II = $.isNode() ? process.env.retrynum ? process.env.retrynum : lIl1II : $.getdata("retrynum") ? $.getdata("retrynum") : Ii1Ili;
Ii1Ili = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : Ii1Ili : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : Ii1Ili;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IIiI11 = "",
  IIlII1 = "",
  ll1Iil = "6ad9acbdda784f85ad_23080101";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const li1lI = require("./function/krgetToken"),
  iliiiI = require("./function/krh5st"),
  IIlIII = require("./function/krgetua");
let i1Iil = "https://jinggengjcq-isv.isvjcloud.com";
IIlII1 = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IIlII1 : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IIlII1;
let lIi11i = "",
  i1Iii = "";
$.whitelist = process.env.DPLHTY_whitelist || lIi11i;
$.blacklist = process.env.DPLHTY_blacklist || i1Iii;
li1l1();
li11ll();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = IIlII1 ? IIlII1 : authorCodeList[Ii1IlI(0, authorCodeList.length)];
  } else {
    let illI1i = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = IIlII1 ? IIlII1 : illI1i[Ii1IlI(0, illI1i.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 默认抽奖次数：" + Ii1Ili + " 💬 重试次数：" + lIl1II);
  console.log("\n💬 请在有水的情况下运行");
  if (process.env.jd_jinggeng_address) {
    UserAdd_Data_Arr = process.env.jd_jinggeng_address;
  } else UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let l1ll11 = [];
    l1ll11 = UserAdd_Data_Arr.split("|");
    var Il1I1i = Math.floor(Math.random() * l1ll11.length);
    if (l1ll11[Il1I1i] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else l1ll11 = l1ll11[Il1I1i];
    if (process.env.jd_jinggeng_address) {
      l1ll11 = l1ll11.split("@");
      if (l1ll11.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let lIllll = 0; lIllll < 6; lIllll++) {
        if (l1ll11[lIllll] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      l1ll11 = l1ll11.split("@");
      if (l1ll11.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let i1IiIl = 0; i1IiIl < 7; i1IiIl++) {
        if (l1ll11[i1IiIl] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = l1ll11[0];
    $.phone = l1ll11[1];
    $.province = l1ll11[2];
    $.city = l1ll11[3];
    $.county = l1ll11[4];
    $.address = l1ll11[5];
  }
  if (!i1Ill[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = ll1Iil;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let iilIii = 0; iilIii < i1Ill.length; iilIii++) {
    Il1I11 = i1Ill[iilIii];
    if (Il1I11) {
      $.UserName = decodeURIComponent(Il1I11.match(/pt_pin=([^; ]+)(?=;?)/) && Il1I11.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iilIii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await IIlIII($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await IIiI1I();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let lIiIil = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + lIiIil);
    if ($.isNode()) await lIiIii.sendNotify("" + $.name, "" + lIiIil);
  }
})().catch(llIiii => $.logErr(llIiii)).finally(() => $.done());
async function IIiI1I() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    IIiI11 = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await li1lI(Il1I11, i1Iil);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await lIi11l("activity_load");
    for (let iilllI = 0; iilllI < lIl1II; iilllI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lIi11l("activity_load");
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
    await lIi11l("绑定");
    for (let ilI1iI = 0; ilI1iI < lIl1II; ilI1iI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lIi11l("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await lIi11l("shopList");
    for (let l1I1l = 0; l1I1l < lIl1II; l1I1l++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lIi11l("shopList");
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
        await lIi11l("mission");
        for (let i11II = 0; i11II < lIl1II; i11II++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await lIi11l("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await iliiii();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await iliiii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lIi11l("activity_load");
          for (let Il1ili = 0; Il1ili < lIl1II; Il1ili++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await lIi11l("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lIi11l("shopList");
          for (let iI11ii = 0; iI11ii < lIl1II; iI11ii++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await lIi11l("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await lIi11l("mission");
      for (let iii111 = 0; iii111 < lIl1II; iii111++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lIi11l("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else {
      console.log("💔 呜呜呜，已完成关注任务");
    }
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await lIi11l("mission");
      for (let iliili = 0; iliili < lIl1II; iliili++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lIi11l("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await lIi11l("activity_load");
    for (let I111ii = 0; I111ii < lIl1II; I111ii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lIi11l("activity_load");
        if ($.krFlag) break;
      }
    }
    if (Ii1Ili + "" !== "0") {
      $.runFalag = true;
      let I1ii1I = parseInt($.remainPoint / 200);
      Ii1Ili = parseInt(Ii1Ili, 10);
      if (I1ii1I > Ii1Ili) I1ii1I = Ii1Ili;
      console.log("💖 抽奖次数为:" + I1ii1I + "，当前积分：" + $.remainPoint);
      for (m = 1; I1ii1I--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lIi11l("抽奖");
        for (let lii1 = 0; lii1 < lIl1II; lii1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await lIi11l("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(I1ii1I) <= 0) break;
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
  } catch (IIil1l) {
    console.log(IIil1l);
  }
}
async function lIi11l(iIii1i) {
  if ($.outFlag) return;
  let IlIl1 = "https://jinggengjcq-isv.isvjcloud.com",
    II1i1I = "",
    iIliI1 = "POST",
    iIii11 = "";
  switch (iIii1i) {
    case "activity_load":
      url = IlIl1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIii11 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) iIii11 = {
        ...iIii11,
        "shopId": "" + $.joinVenderId
      };
      II1i1I = lIl1Il("/jdBigAlliance/activity/load", iIii11);
      break;
    case "shopList":
      url = IlIl1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIii11 = {};
      II1i1I = lIl1Il("/jdBigAlliance/shop/shopList", iIii11);
      break;
    case "绑定":
      url = IlIl1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIii11 = {
        "inviterNick": $.inviteNick || ""
      };
      II1i1I = lIl1Il("/jdBigAlliance/customer/inviteRelation", iIii11);
      break;
    case "mission":
      url = IlIl1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIii11 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) iIii11 = {
        ...iIii11,
        "shopId": $.joinVenderId
      };
      II1i1I = lIl1Il("/jdBigAlliance/mission/completeMission", iIii11);
      break;
    case "抽奖":
      url = IlIl1 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIii11 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      II1i1I = lIl1Il("/jdBigAlliance/interactive/drawPost", iIii11);
      break;
    case "updateAddress":
      url = IlIl1 + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIii11 = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      };
      II1i1I = lIl1Il("/jdBigAlliance/awards/updateAddress", iIii11);
      break;
    default:
      console.log("错误" + iIii1i);
  }
  let i1i1lI = lIl1Ii(url, II1i1I, iIliI1);
  return new Promise(async iIliII => {
    $.post(i1i1lI, (IlIil, iI11i1, i1i1li) => {
      try {
        IlIil ? (iI11i1 && iI11i1.statusCode && iI11i1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : i1IlI(iIii1i, i1i1li);
      } catch (iil1Ii) {
        console.log(iil1Ii, iI11i1);
      } finally {
        iIliII();
      }
    });
  });
}
async function i1IlI(l1Ilii, IIl11l) {
  let lIl1i1 = "";
  try {
    $.krFlag = true;
    (l1Ilii != "accessLogWithAD" || l1Ilii != "drawContent") && IIl11l && (lIl1i1 = JSON.parse(IIl11l));
  } catch (illII1) {
    console.log("🤬 " + l1Ilii + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let Il1iii = "";
    switch (l1Ilii) {
      case "抽奖":
        if (typeof lIl1i1 == "object") {
          if (lIl1i1.success && lIl1i1.success === true && lIl1i1.data) {
            if (lIl1i1.data.status && lIl1i1.data.status == 200) {
              if (lIl1i1.data.data.sendResult) {
                console.log("抽中：" + lIl1i1.data.data.awardSetting.awardName);
                lIl1i1.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = lIl1i1.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await lIi11l("updateAddress"), await $.wait(4000));
              } else !lIl1i1.data.data.result ? console.log("💔 空气") : console.log(lIl1i1.data.data);
            } else lIl1i1.data.status && lIl1i1.data.status == 500 && console.log("" + (lIl1i1.data.msg || ""));
          } else lIl1i1.message ? console.log("" + (lIl1i1.message || "")) : console.log(IIl11l);
        } else console.log(IIl11l);
        break;
      case "updateAddress":
        if (typeof lIl1i1 == "object") {
          if (lIl1i1.success && lIl1i1.success === true && lIl1i1.data) {
            if (lIl1i1.data.status && lIl1i1.data.status == 200) {
              if (lIl1i1.data.data.result) {
                console.log("💖 地址填写成功，返回：" + lIl1i1.data.data.msg);
              } else console.log(lIl1i1.data.data);
            } else lIl1i1.data.status && lIl1i1.data.status == 500 && console.log("" + (lIl1i1.data.msg || ""));
          } else lIl1i1.message ? console.log("" + (lIl1i1.message || "")) : console.log(IIl11l);
        } else console.log(IIl11l);
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
        Il1iii = "";
        if (l1Ilii == "followShop") Il1iii = "关注";
        if (l1Ilii == "addCart") Il1iii = "加购";
        if (typeof lIl1i1 == "object") {
          if (lIl1i1.success && lIl1i1.success === true && lIl1i1.data) {
            if (lIl1i1.data.status && lIl1i1.data.status == 200) {
              lIl1i1 = lIl1i1.data;
              if (l1Ilii != "setMixNick" && (lIl1i1.msg || lIl1i1.data.isOpenCard || lIl1i1.data.remark)) console.log("🔊 " + (Il1iii && Il1iii + ":" || "") + (lIl1i1.msg || lIl1i1.data.isOpenCard || lIl1i1.data.remark || ""));
              if (l1Ilii == "activity_load") {
                if (lIl1i1.msg || lIl1i1.data.isOpenCard) {
                  if ((lIl1i1.msg || lIl1i1.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (lIl1i1.data) {
                  $.endTime = lIl1i1.data.cusActivity.endTime || 0;
                  $.MixNick = lIl1i1.data.missionCustomer.buyerNick || "";
                  $.usedChance = lIl1i1.data.missionCustomer.usedChance || 0;
                  $.remainPoint = lIl1i1.data.missionCustomer.remainPoint || 0;
                  $.hasCollectShop = lIl1i1.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = lIl1i1.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (l1Ilii == "shopList") $.openList = lIl1i1.data || [];else {
                  if (l1Ilii == "mission") lIl1i1.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (l1Ilii == "uniteOpenCardOne") $.uniteOpenCar = lIl1i1.msg || lIl1i1.data.msg || "";else {
                      if (l1Ilii == "myAward") {
                        console.log("🔊 我的奖品：");
                        let ii1iIi = 0;
                        for (let iliI1i in lIl1i1.data.list || []) {
                          let IIl11i = lIl1i1.data.list[iliI1i];
                          ii1iIi += Number(IIl11i.awardDes);
                        }
                        if (ii1iIi > 0) console.log("🔊 共获得" + ii1iIi + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else l1Ilii == "missionInviteList" && console.log("🔊 邀请人数(" + lIl1i1.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (lIl1i1.data.msg) {
                lIl1i1.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (lIl1i1.data.msg || ""));
              } else {
                if (lIl1i1.errorMessage) {
                  if (lIl1i1.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lIl1i1.errorMessage || ""));
                } else console.log("" + IIl11l);
              }
            }
          } else lIl1i1.errorMessage ? console.log("🔊 " + (lIl1i1.errorMessage || "")) : console.log("" + IIl11l);
        } else {}
        break;
      default:
        console.log((Il1iii || l1Ilii) + "-> " + IIl11l);
    }
    if (typeof lIl1i1 == "object") {
      if (lIl1i1.errorMessage) {
        if (lIl1i1.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (Ii111l) {}
}
function lIl1Ii(iI11li, lIi11, i11II1 = "POST") {
  let I111lI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Il1I11,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iI11li.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (I111lI.Origin = "https://jinggengjcq-isv.isvjcloud.com", I111lI["Content-Type"] = "application/json; charset=utf-8", delete I111lI.Cookie), {
    "url": iI11li,
    "method": i11II1,
    "headers": I111lI,
    "body": lIi11,
    "timeout": 30 * 1000
  };
}
function lIl1Il(l1iii1, iiilIl) {
  d = {
    "actId": $.actId,
    ...iiilIl,
    "method": l1iii1,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = Il1I1I(d);
  const iIliIl = {
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
        ...iiilIl,
        "method": l1iii1,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return l1iii1.indexOf("missionInviteList") > -1 && delete iIliIl.params.admJson.actId, $.toStr(iIliIl, iIliIl);
}
function Ii1IlI(l1Illl, Ii111I) {
  return Math.floor(Math.random() * (Ii111I - l1Illl)) + l1Illl;
}
function Il1I1I(Ililii) {
  return AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed", key = "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(Ililii)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
function ll1Il1(iIlli) {
  iIlli = iIlli || 32;
  let Ii1ll = "abcdef0123456789",
    iIlll = Ii1ll.length,
    liII11 = "";
  for (i = 0; i < iIlli; i++) liII11 += Ii1ll.charAt(Math.floor(Math.random() * iIlll));
  return liII11;
}
function li11li(l1li1I) {
  if (typeof l1li1I == "string") try {
    return JSON.parse(l1li1I);
  } catch (I1IIIi) {
    return console.log(I1IIIi), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function iliiii() {
  if (!$.joinVenderId) return;
  return new Promise(async I1III1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l11li1 = "";
    if ($.shopactivityId) l11li1 = ",\"activityId\":" + $.shopactivityId;
    const i1I = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l11li1 + ",\"channel\":406}",
      liII1I = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1I)
      };
    for (var iIiIiI = "", iIlil = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", lIiII1 = 0; lIiII1 < 16; lIiII1++) {
      var iIlii = Math.round(Math.random() * (iIlil.length - 1));
      iIiIiI += iIlil.substring(iIlii, iIlii + 1);
    }
    uuid = Buffer.from(iIiIiI, "utf8").toString("base64");
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
    const lI1I = await iliiiI("8adfb", liII1I),
      I1Ii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i1I + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Il1I11,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1Ii, async (IIlIli, IIlIll, l11liI) => {
      try {
        if (IIlIli) IIlIll && typeof IIlIll.statusCode != "undefined" && IIlIll.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          l11liI = l11liI && l11liI.match(/jsonp_.*?\((.*?)\);/) && l11liI.match(/jsonp_.*?\((.*?)\);/)[1] || l11liI;
          let i1l = $.toObj(l11liI, l11liI);
          if (i1l && typeof i1l == "object") {
            if (i1l && i1l.success === true) {
              console.log(" >> " + i1l.message);
              $.errorJoinShop = i1l.message;
              if (i1l.result && i1l.result.giftInfo) for (let IlIiII of i1l.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + IlIiII.discountString + IlIiII.prizeName + IlIiII.secondLineDesc);
              }
            } else {
              if (i1l && typeof i1l == "object" && i1l.message) {
                $.errorJoinShop = i1l.message;
                console.log("" + (i1l.message || ""));
              } else {
                console.log(l11liI);
              }
            }
          } else console.log(l11liI);
        }
      } catch (IIlIii) {
        $.logErr(IIlIii, IIlIll);
      } finally {
        I1III1();
      }
    });
  });
}
async function IIlIIi() {
  return new Promise(async IlIiIi => {
    const i1IIi1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      IIlIiI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1IIi1)
      };
    await $.wait(1000);
    const l11lll = await iliiiI("8adfb", IIlIiI),
      i1iiI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + i1IIi1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11lll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Il1I11,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1iiI1, async (l1II11, iIl1Ii, ll1l1i) => {
      try {
        if (l1II11) iIl1Ii && typeof iIl1Ii.statusCode != "undefined" && iIl1Ii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ll1l1i = ll1l1i && ll1l1i.match(/jsonp_.*?\((.*?)\);/) && ll1l1i.match(/jsonp_.*?\((.*?)\);/)[1] || ll1l1i;
          let i1IIii = $.toObj(ll1l1i, ll1l1i);
          i1IIii && typeof i1IIii == "object" ? i1IIii && i1IIii.success == true && (console.log("去加入：" + (i1IIii.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1IIii.result.interestsRuleList && i1IIii.result.interestsRuleList[0] && i1IIii.result.interestsRuleList[0].interestsInfo && i1IIii.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(ll1l1i);
        }
      } catch (lI1i11) {
        $.logErr(lI1i11, iIl1Ii);
      } finally {
        IlIiIi();
      }
    });
  });
}
function iliiil(i1iiII) {
  return new Promise(iiii11 => {
    const il1lIi = {
      "url": "" + i1iiII,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(il1lIi, async (i1iiIi, iiliII, i1iiIl) => {
      try {
        if (i1iiIi) {} else {
          i1iiIl ? i1iiIl = JSON.parse(i1iiIl) : console.log("未获取到数据,请重新运行");
        }
      } catch (lIlIi1) {
        $.logErr(lIlIi1, iiliII);
        i1iiIl = null;
      } finally {
        iiii11(i1iiIl);
      }
    });
  });
}
function Ii1IlI(i1IIlI, ii11il) {
  return Math.floor(Math.random() * (ii11il - i1IIlI)) + i1IIlI;
}
function li11ll() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const i111li = Array.from(new Set($.blacklist.split("&")));
  console.log(i111li.join("&") + "\n");
  let lIlIiI = i111li,
    I11lli = [],
    i111ll = false;
  for (let i1IIli = 0; i1IIli < i1Ill.length; i1IIli++) {
    let lI111 = decodeURIComponent(i1Ill[i1IIli].match(/pt_pin=([^; ]+)(?=;?)/) && i1Ill[i1IIli].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!lI111) break;
    let iiliIl = false;
    for (let IiIl1I of lIlIiI) {
      if (IiIl1I && IiIl1I == lI111) {
        iiliIl = true;
        break;
      }
    }
    !iiliIl && (i111ll = true, I11lli.splice(i1IIli, -1, i1Ill[i1IIli]));
  }
  if (i111ll) i1Ill = I11lli;
}
function i1Il1(i1IIll, iIiIi1) {
  iIiIi1 != 0 && i1IIll.unshift(i1IIll.splice(iIiIi1, 1)[0]);
}
function li1l1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(i1Ill, i1Ill));
    return;
  }
  console.log("当前已设置白名单：");
  const ii11lI = Array.from(new Set($.whitelist.split("&")));
  console.log(ii11lI.join("&") + "\n");
  let ilI1l = [],
    I1l11 = ii11lI;
  for (let ii11li in i1Ill) {
    let il1lIl = decodeURIComponent(i1Ill[ii11li].match(/pt_pin=([^; ]+)(?=;?)/) && i1Ill[ii11li].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I1l11.includes(il1lIl) && ilI1l.push(i1Ill[ii11li]);
  }
  helpCookiesArr = ilI1l;
  if (I1l11.length > 1) for (let i111l1 in I1l11) {
    let lIl11i = I1l11[I1l11.length - 1 - i111l1];
    if (!lIl11i) continue;
    for (let lIl11l in helpCookiesArr) {
      let iiii1i = decodeURIComponent(helpCookiesArr[lIl11l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIl11l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lIl11i == iiii1i && i1Il1(helpCookiesArr, lIl11l);
    }
  }
}