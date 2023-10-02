/*
大牌联合通用开卡
新增开卡脚本，一次性脚本
通用大牌联合通用开卡：
活动地址：https://jinggengjcq-isv.isvjcloud.com/xxxx/xxx/xxx
变量填写：
//export DPLHTY="活动ID"
如：
//export DPLHTY="04c1bf1191d044c6ae059e_22040802"
任务之间延时设置，默认2秒
//export DPLHTY_WAIT="2"
黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 
浏览 默认不做浏览任务
//export DPLHTY_READ="" 
重试次数，默认30
//export retrynum="30"
活动ID自行查找
第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码
============Quantumultx===============
[task_local]
#大牌联合通用开卡
1 1 1 1 * jd_opencardDPLHTY.js, tag=大牌联合通用开卡, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env('大牌联合通用开卡');
const Il1ilii = $.isNode() ? require("./jdCookie.js") : "",
  ili1l = $.isNode() ? require("./sendNotify") : "";
let i11iiiI = [],
  li11liII = "";
if ($.isNode()) {
  Object.keys(Il1ilii).forEach(llliiiiI => {
    i11iiiI.push(Il1ilii[llliiiiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i11iiiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...li1liiIi($.getdata("CookiesJD") || "[]").map(lI1iIIIi => lI1iIIIi.cookie)].filter(I11i1IlI => !!I11i1IlI);
let l11i1i1i = "30",
  I1l1i1I = "0";
l11i1i1i = $.isNode() ? process.env.retrynum ? process.env.retrynum : l11i1i1i : $.getdata("retrynum") ? $.getdata("retrynum") : l11i1i1i;
I1l1i1I = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : I1l1i1I : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : I1l1i1I;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let ilII1l11 = "",
  Iill11iI = "",
  Iill11I = "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const IIIiI1ii = require("./function/krgetToken"),
  II1lIiII = require("./function/krh5st"),
  ll1l1ii = require("./function/jdCommon");
let l1iIIiI = "https://jinggengjcq-isv.isvjcloud.com";
Iill11iI = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + Iill11iI : $.getdata("helpnum") ? $.getdata("helpnum") : "" + Iill11iI;
Iill11I = $.isNode() ? process.env.DPLHTY ? process.env.DPLHTY : "" + Iill11I : $.getdata("DPLHTY") ? $.getdata("DPLHTY") : "" + Iill11I;
const l1lIlil1 = process.env.JD_PROXY_TUNNRL,
  ii11lIil = process.env.DPLHTY_WAIT || "2";
let IiiIiIiI = parseInt(ii11lIil) * 1000;
l1lIlil1 && (IiiIiIiI = 100);
let lilIIi1I = "",
  liiIii1l = "";
$.whitelist = process.env.DPLHTY_whitelist || lilIIi1I;
$.blacklist = process.env.DPLHTY_blacklist || liiIii1l;
i1lll1iI();
llIIl1i();
!(async () => {
  if (!Iill11I) {
    console.log("\n请填写大牌大牌联合通用开卡的活动ID,变量是DPLHTY  💖\n");
    return;
  }
  authorCodeList = await IIl11lI("http://code.kingran.cf/dplh.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = Iill11iI ? Iill11iI : authorCodeList[iliIli1(0, authorCodeList.length)];
  } else {
    let ill1Ii1i = ["vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "jvJh7GpoGhm7fSlpWhSy3MjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD", "8IgOKf+5WyAGyIlOgm/6vtPH3vYuPBb1K242gPzPNvcM1/5bn1kfgJfhWlCD+Ul2NlQTdHnDobG3YNSnH+XTYw=="];
    $.authorCode = Iill11iI ? Iill11iI : ill1Ii1i[iliIli1(0, ill1Ii1i.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 当前ID：" + Iill11I);
  console.log("\n💬 抽奖次数：" + I1l1i1I + " 💬 重试次数：" + l11i1i1i + " 💬 延时(ms)：" + IiiIiIiI);
  console.log("\n💬 请在有水的情况下运行");
  process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let il1I1lIl = [];
    il1I1lIl = UserAdd_Data_Arr.split("|");
    var lIiliIIl = Math.floor(Math.random() * il1I1lIl.length);
    if (il1I1lIl[lIiliIIl] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else {
      il1I1lIl = il1I1lIl[lIiliIIl];
    }
    if (process.env.jd_jinggeng_address) {
      il1I1lIl = il1I1lIl.split("@");
      if (il1I1lIl.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let IliIII1l = 0; IliIII1l < 6; IliIII1l++) {
        if (il1I1lIl[IliIII1l] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      il1I1lIl = il1I1lIl.split("@");
      if (il1I1lIl.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let il11IiIi = 0; il11IiIi < 7; il11IiIi++) {
        if (il1I1lIl[il11IiIi] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = il1I1lIl[0];
    $.phone = il1I1lIl[1];
    $.province = il1I1lIl[2];
    $.city = il1I1lIl[3];
    $.county = il1I1lIl[4];
    $.address = il1I1lIl[5];
  }
  if (!i11iiiI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = Iill11I;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let il1l1Il1 = 0; il1l1Il1 < i11iiiI.length; il1l1Il1++) {
    li11liII = i11iiiI[il1l1Il1];
    if (li11liII) {
      $.UserName = decodeURIComponent(li11liII.match(/pt_pin=([^; ]+)(?=;?)/) && li11liII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = il1l1Il1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = ll1l1ii.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await ii1I1i1i();
      await $.wait(IiiIiIiI);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let lliIlIIl = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + lliIlIIl);
    if ($.isNode()) await ili1l.sendNotify("" + $.name, "" + lliIlIIl);
  }
})().catch(l111llI => $.logErr(l111llI)).finally(() => $.done());
async function ii1I1i1i() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.endTime = 0;
    ilII1l11 = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await IIIiI1ii(li11liII, l1iIIiI);
    if (!$.Token) {
      for (let liil1li1 = 0; liil1li1 < 3; liil1li1++) {
        l1lIlil1 && (console.log("Token没有成功获取，重试中"), $.Token = await IIIiI1ii(li11liII, l1iIIiI), $.Token && ($.flag = true));
        if ($.flag) break;
      }
    }
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await II11lIli("activity_load");
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("❌ 获取[活动信息]失败，可能是黑号或者太卡了");
      return;
    }
    $.toBind = 0;
    $.openList = [];
    await II11lIli("绑定");
    await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
    await II11lIli("shopList");
    await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
    await II11lIli("completeState");
    for (let lIl11Iii = 0; lIl11Iii < $.renwulists.length; lIl11Iii++) {
      $.missionType = $.renwulists[lIl11Iii].type;
      if (!$.renwulists[lIl11Iii].isComplete) switch ($.missionType) {
        case "buyHotProducts":
        case "orderReturnBean":
        case "payTrade":
        case "shareAct":
          break;
        case "openCard":
          for (o of $.openList) {
            $.missionType = "openCard";
            if (o.open != true && o.openCardUrl) {
              if ($.activityEnd) return;
              if ($.outEnd) return;
              $.openCard = false;
              $.joinVenderId = o.userId;
              await II11lIli("mission");
              await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
              if ($.openCard == true) {
                $.errorJoinShop = "";
                await l1iI1lll();
                await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
                if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
                  break;
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("😤 呜呜呜，重试开卡");
                  await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
                  await l1iI1lll();
                  await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("💔 无法开卡,跳过运行");
                  break;
                }
                await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
                await II11lIli("activity_load");
                await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
                await II11lIli("shopList");
                await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
              }
            }
          }
          break;
        case "uniteAddCart":
          for (let Ii1iiIi = 0; Ii1iiIi < 1; Ii1iiIi++) {
            $.missionType = "uniteAddCart";
            await II11lIli("mission");
            await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
          }
          break;
        case "uniteCollectShop":
          for (let IiI1lill = 0; IiI1lill < 1; IiI1lill++) {
            $.missionType = "uniteCollectShop";
            await II11lIli("mission");
            await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
          }
          break;
        case "followChannel":
          for (let iliiI1 = 0; iliiI1 < 1; iliiI1++) {
            $.missionType = "followChannel";
            await II11lIli("mission");
            await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
          }
          break;
        case "multipleBrowsing":
          $.vimetims = false;
          if (process.env.DPLHTY_READ && process.env.DPLHTY_READ === "true") {
            for (lIl11Iii of $.openList) {
              $.missionType = "multipleBrowsing";
              $.goodsId = lIl11Iii.userId;
              await II11lIli("mission");
              await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
              if ($.vimetims) break;
            }
          } else console.log("🔊 默认不做浏览,请设置变量export DPLHTY_READ='true'做浏览任务");
          break;
        case "shareAct":
          for (let II1Illl1 = 0; II1Illl1 < 1; II1Illl1++) {
            $.missionType = "shareAct";
            await II11lIli("绑定");
            await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
          }
          break;
        default:
          await $.wait(1000);
      }
    }
    await II11lIli("activity_load");
    if (I1l1i1I !== "0") {
      $.runFalag = true;
      let ili11 = parseInt($.remainPoint / 200);
      I1l1i1I = parseInt(I1l1i1I, 10);
      if (ili11 > I1l1i1I) ili11 = I1l1i1I;
      console.log("💖 抽奖次数为:" + ili11 + "，当前积分：" + $.remainPoint);
      for (m = 1; ili11--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await II11lIli("抽奖");
        if ($.runFalag == false) break;
        if (Number(ili11) <= 0) break;
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("🔊 后面的号都会助力:" + $.inviteNick));
    await $.wait(parseInt(IiiIiIiI * 1 + 500, 10));
  } catch (lII1i1i) {
    console.log(lII1i1i);
  }
}
async function II11lIli(IIiIiliI) {
  if ($.outFlag) return;
  let ilI11iii = "https://jinggengjcq-isv.isvjcloud.com",
    i1I1iIi = "",
    ii1lI1I = "POST",
    lI11l1Ii = "";
  switch (IIiIiliI) {
    case "activity_load":
      url = ilI11iii + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", lI11l1Ii = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) lI11l1Ii = {
        ...lI11l1Ii,
        "shopId": "" + $.joinVenderId
      };
      i1I1iIi = lIiI11i("/jdBigAlliance/activity/load", lI11l1Ii);
      break;
    case "shopList":
      url = ilI11iii + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", lI11l1Ii = {}, i1I1iIi = lIiI11i("/jdBigAlliance/shop/shopList", lI11l1Ii);
      break;
    case "绑定":
      url = ilI11iii + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", lI11l1Ii = {
        "inviterNick": $.inviteNick || ""
      }, i1I1iIi = lIiI11i("/jdBigAlliance/customer/inviteRelation", lI11l1Ii);
      break;
    case "mission":
      url = ilI11iii + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", lI11l1Ii = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) lI11l1Ii = {
        ...lI11l1Ii,
        "shopId": $.joinVenderId
      };
      if ($.goodsId) lI11l1Ii = {
        ...lI11l1Ii,
        "goodsId": $.goodsId
      };
      i1I1iIi = lIiI11i("/jdBigAlliance/mission/completeMission", lI11l1Ii);
      break;
    case "抽奖":
      url = ilI11iii + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", lI11l1Ii = {
        "dataType": "draw",
        "usedGameNum": "2"
      }, i1I1iIi = lIiI11i("/jdBigAlliance/interactive/drawPost", lI11l1Ii);
      break;
    case "updateAddress":
      url = ilI11iii + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", lI11l1Ii = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      }, i1I1iIi = lIiI11i("/jdBigAlliance/awards/updateAddress", lI11l1Ii);
      break;
    case "completeState":
      url = ilI11iii + "/dm/front/jdBigAlliance/mission/completeState?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", lI11l1Ii = {}, i1I1iIi = lIiI11i("/jdBigAlliance/mission/completeState", lI11l1Ii);
      break;
    default:
      console.log("错误" + IIiIiliI);
  }
  let iii1lI = IIII1il1(url, i1I1iIi, ii1lI1I);
  ii1lI1I === "GET" && (delete iii1lI.body, delete iii1lI["Content-Type"]);
  const il1I1Ill = l11i1i1i;
  let ii1iIl1i = 0,
    lllIlill = null,
    li1l1lI = false;
  while (ii1iIl1i < il1I1Ill) {
    ii1iIl1i > 0 && (await $.wait(1000));
    const {
      err: i1il11I1,
      res: l1illil1,
      data: lI1I1il1
    } = await iIi1l1il(iii1lI, ii1lI1I);
    if (i1il11I1) {
      if (typeof i1il11I1 === "string" && i1il11I1.includes("Timeout awaiting 'request'")) lllIlill = IIiIiliI + " 请求超时，请检查网络重试";else {
        const l1iIlil1 = l1illil1?.["statusCode"];
        if (l1iIlil1) {
          if ([403, 493].includes(l1iIlil1)) lllIlill = IIiIiliI + " 请求失败，IP被限制（Response code " + l1iIlil1 + "）", li1l1lI = true;else [400, 404].includes(l1iIlil1) ? lllIlill = IIiIiliI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + l1iIlil1 + "）" : lllIlill = IIiIiliI + " 请求失败（Response code " + l1iIlil1 + "）";
        } else lllIlill = IIiIiliI + " 请求失败 => " + (i1il11I1.message || i1il11I1);
      }
      ii1iIl1i++;
    } else {
      const i1liIl11 = ll1l1ii.getResponseCookie(l1illil1),
        I1ll1IIl = false;
      I1ll1IIl && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + IIiIiliI + " 响应Body => " + (lI1I1il1 || "无") + "\n"), console.log("🔧 " + IIiIiliI + " 响应Cookie => " + (i1liIl11 || "无") + "\n"), console.log("🔧 " + IIiIiliI + " 请求参数"), console.log(requestOptions), console.log("\n---------------------------------------------------\n"));
      if (!["accessLog", "accessLogWithAD"].includes(IIiIiliI)) try {
        const II11IIII = JSON.parse(lI1I1il1);
        l11i111(IIiIiliI, II11IIII);
        break;
      } catch (iIlIIIIi) {
        lllIlill = "❌ " + IIiIiliI + " 接口响应数据解析失败: " + iIlIIIIi.message;
        console.log("🚫 " + IIiIiliI + " => " + String(lI1I1il1 || "无响应数据"));
        I1ll1IIl && (console.log("\n---------------------------------------------------\n"), console.log("\n---------------------------------------------------\n"));
        ii1iIl1i++;
      } else break;
      li1l1lI = false;
    }
  }
  if (ii1iIl1i >= il1I1Ill) {
    console.log(lllIlill);
    if (li1l1lI) {
      if (!hotbreak) {
        $.outFlag = true;
      }
    }
  }
}
async function iIi1l1il(I11lilI1, llilI1Il = "POST") {
  if (llilI1Il === "POST") {
    return new Promise(async I1IiI1ii => {
      $.post(I11lilI1, (I1IIlIli, illIiIlI, lIIliI) => {
        I1IiI1ii({
          "err": I1IIlIli,
          "res": illIiIlI,
          "data": lIIliI
        });
      });
    });
  } else {
    if (llilI1Il === "GET") return new Promise(async Il1Iil1l => {
      $.get(I11lilI1, (I1I11lll, IIIlliiI, liIlIlil) => {
        Il1Iil1l({
          "err": I1I11lll,
          "res": IIIlliiI,
          "data": liIlIlil
        });
      });
    });else {
      const iIIii11 = "不支持的请求方法";
      return {
        "err": iIIii11,
        "res": null,
        "data": null
      };
    }
  }
}
async function l11i111(Ii1Iii1l, Il1i1ll) {
  try {
    let illiI1l1 = "";
    switch (Ii1Iii1l) {
      case "抽奖":
        if (typeof Il1i1ll == "object") {
          if (Il1i1ll.success && Il1i1ll.success === true && Il1i1ll.data) {
            if (Il1i1ll.data.status && Il1i1ll.data.status == 200) {
              if (Il1i1ll.data.data.sendResult) {
                console.log("🔊 抽中：" + Il1i1ll.data.data.awardSetting.awardName);
                if (Il1i1ll.data.data.awardSetting.awardType == "goods") {
                  if (process.env.jd_jinggeng_address) {
                    $.actLogId = Il1i1ll.data.data.awardSendLog.id;
                    console.log("🔊 抽中实物啦，奖品领取ID：" + $.actLogId);
                    await II11lIli("updateAddress");
                    await $.wait(4000);
                  }
                }
              } else !Il1i1ll.data.data.result ? console.log("💔 空气") : console.log(Il1i1ll.data.data);
            } else Il1i1ll.data.status && Il1i1ll.data.status == 500 && console.log("" + (Il1i1ll.data.msg || ""));
          } else {
            if (Il1i1ll.message) console.log("" + (Il1i1ll.message || ""));else {
              console.log(data);
            }
          }
        } else {
          console.log(data);
        }
        break;
      case "updateAddress":
        if (typeof Il1i1ll == "object") {
          if (Il1i1ll.success && Il1i1ll.success === true && Il1i1ll.data) {
            if (Il1i1ll.data.status && Il1i1ll.data.status == 200) Il1i1ll.data.data.result ? console.log("💖 地址填写成功，返回：" + Il1i1ll.data.data.msg) : console.log(Il1i1ll.data.data);else Il1i1ll.data.status && Il1i1ll.data.status == 500 && console.log("" + (Il1i1ll.data.msg || ""));
          } else {
            if (Il1i1ll.message) {
              console.log("" + (Il1i1ll.message || ""));
            } else console.log(data);
          }
        } else {
          console.log(data);
        }
        break;
      case "completeState":
        if (typeof Il1i1ll == "object") {
          if (Il1i1ll.success && Il1i1ll.success === true && Il1i1ll.data) Il1i1ll.data.status && Il1i1ll.data.status == 200 && ($.renwulists = Il1i1ll.data.data || []);else Il1i1ll.message ? console.log("" + (Il1i1ll.message || "")) : console.log(data);
        } else console.log(data);
        break;
      case "activity_load":
      case "mission":
      case "shopList":
      case "绑定":
        illiI1l1 = "";
        if (typeof Il1i1ll == "object") {
          if (Il1i1ll.success && Il1i1ll.success === true && Il1i1ll.data) {
            if (Il1i1ll.data.status && Il1i1ll.data.status == 200) {
              Il1i1ll = Il1i1ll.data;
              if (Il1i1ll.msg || Il1i1ll.data.isOpenCard || Il1i1ll.data.remark) console.log("🔊 " + (illiI1l1 && illiI1l1 + ":" || "") + (Il1i1ll.msg || Il1i1ll.data.isOpenCard || Il1i1ll.data.remark || ""));
              if (Ii1Iii1l == "activity_load") {
                if (Il1i1ll.msg || Il1i1ll.data.isOpenCard) {
                  if ((Il1i1ll.msg || Il1i1ll.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (Il1i1ll.data) {
                  $.endTime = Il1i1ll.data.cusActivity.endTime || 0;
                  $.MixNick = Il1i1ll.data.missionCustomer.buyerNick || "";
                  $.usedChance = Il1i1ll.data.missionCustomer.usedChance || 0;
                  $.remainPoint = Il1i1ll.data.missionCustomer.remainPoint || 0;
                  $.hasCollectShop = Il1i1ll.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = Il1i1ll.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (Ii1Iii1l == "shopList") $.openList = Il1i1ll.data || [];else {
                  if (Ii1Iii1l == "mission") {
                    if (Il1i1ll.data.remark.indexOf("不是会员") > -1) $.openCard = true;else {
                      $.openCard = false;
                    }
                  }
                }
              }
            } else {
              if (Il1i1ll.data.msg) Il1i1ll.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true), console.log("🔊 " + (Il1i1ll.data.msg || "")), Il1i1ll.data.msg.indexOf("浏览已达上限") > -1 && ($.vimetims = true);else {
                if (Il1i1ll.errorMessage) {
                  if (Il1i1ll.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (Il1i1ll.errorMessage || ""));
                } else console.log("" + data);
              }
            }
          } else Il1i1ll.errorMessage ? console.log("🔊 " + (Il1i1ll.errorMessage || "")) : console.log("" + data);
        } else {}
        break;
      default:
        console.log((illiI1l1 || Ii1Iii1l) + "-> " + data);
    }
    if (typeof Il1i1ll == "object") {
      if (Il1i1ll.errorMessage) {
        if (Il1i1ll.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (llIII1i1) {}
}
function IIII1il1(lIlill1, i1i11i1, II1Il1il = "POST") {
  let llilI1li = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": li11liII,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lIlill1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (llilI1li.Origin = "https://jinggengjcq-isv.isvjcloud.com", llilI1li["Content-Type"] = "application/json; charset=utf-8", delete llilI1li.Cookie), {
    "url": lIlill1,
    "method": II1Il1il,
    "headers": llilI1li,
    "body": i1i11i1,
    "timeout": 30 * 1000
  };
}
function lIiI11i(iiIIIi1I, i1l11IIl) {
  d = {
    "actId": $.actId,
    ...i1l11IIl,
    "method": iiIIIi1I,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = il1IIil(d);
  const iIlliiii = {
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
        ...i1l11IIl,
        "method": iiIIIi1I,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return iiIIIi1I.indexOf("missionInviteList") > -1 && delete iIlliiii.params.admJson.actId, $.toStr(iIlliiii, iIlliiii);
}
function iliIli1(IliilIIl, iil1iliI) {
  return Math.floor(Math.random() * (iil1iliI - IliilIIl)) + IliilIIl;
}
function il1IIil(liIi1l11) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(liIi1l11));
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
function i11ill11(IIil1il) {
  IIil1il = IIil1il || 32;
  let liI1iIII = "abcdef0123456789",
    i11iIll = liI1iIII.length,
    I1iiiliI = "";
  for (i = 0; i < IIil1il; i++) I1iiiliI += liI1iIII.charAt(Math.floor(Math.random() * i11iIll));
  return I1iiiliI;
}
function li1liiIi(iliIIIII) {
  if (typeof iliIIIII == "string") {
    try {
      return JSON.parse(iliIIIII);
    } catch (iili1Iii) {
      return console.log(iili1Iii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function l1iI1lll() {
  if (!$.joinVenderId) return;
  return new Promise(async lIillI1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Il11l1I = "";
    if ($.shopactivityId) Il11l1I = ",\"activityId\":" + $.shopactivityId;
    const ll1Il1Il = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Il11l1I + ",\"channel\":406}",
      l1iiillI = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ll1Il1Il)
      },
      i1111iIi = await II1lIiII("27004", l1iiillI),
      ii1liIIl = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + ll1Il1Il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1111iIi),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": li11liII
        },
        "timeout": 20000
      };
    $.get(ii1liIIl, async (l1iilI1, II1ll, I1ili1l) => {
      try {
        if (l1iilI1) console.log(l1iilI1);else {
          const Il1iIl1i = JSON.parse(I1ili1l);
          if (typeof Il1iIl1i === "object") {
            if (Il1iIl1i.success === true) {
              console.log("🔊 " + Il1iIl1i.message);
              $.errorJoinShop = Il1iIl1i.message;
              if (Il1iIl1i.result && Il1iIl1i.result.giftInfo) for (let II11ilIl of Il1iIl1i.result.giftInfo.giftList) {
                console.log("🔊 入会获得：" + II11ilIl.discountString + II11ilIl.prizeName + II11ilIl.secondLineDesc);
              }
            } else typeof Il1iIl1i == "object" && Il1iIl1i.message ? ($.errorJoinShop = Il1iIl1i.message, console.log("" + (Il1iIl1i.message || ""))) : console.log(I1ili1l);
          } else console.log(I1ili1l);
        }
      } catch (ilIl1I1) {
        $.logErr(ilIl1I1, II1ll);
      } finally {
        lIillI1I();
      }
    });
  });
}
function IIl11lI(l1IilIi1) {
  return new Promise(Iil1i111 => {
    const II1i11Ii = {
      "url": "" + l1IilIi1,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(II1i11Ii, async (lIii1II1, ill11iIi, l1li11Ii) => {
      try {
        if (lIii1II1) {} else l1li11Ii ? l1li11Ii = JSON.parse(l1li11Ii) : console.log("未获取到数据,请重新运行");
      } catch (Iiil11lI) {
        $.logErr(Iiil11lI, ill11iIi);
        l1li11Ii = null;
      } finally {
        Iil1i111(l1li11Ii);
      }
    });
  });
}
function iliIli1(lliIIl1l, IllIlIii) {
  return Math.floor(Math.random() * (IllIlIii - lliIIl1l)) + lliIIl1l;
}
function llIIl1i() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const IillI1il = Array.from(new Set($.blacklist.split("&")));
  console.log(IillI1il.join("&") + "\n");
  let IIlI1lIl = IillI1il,
    lI1ll1ii = [],
    l1lII1Ii = false;
  for (let Iil1ilI = 0; Iil1ilI < i11iiiI.length; Iil1ilI++) {
    let lIiIl1ii = decodeURIComponent(i11iiiI[Iil1ilI].match(/pt_pin=([^; ]+)(?=;?)/) && i11iiiI[Iil1ilI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!lIiIl1ii) break;
    let iiIiIill = false;
    for (let liiiiIIi of IIlI1lIl) {
      if (liiiiIIi && liiiiIIi == lIiIl1ii) {
        iiIiIill = true;
        break;
      }
    }
    !iiIiIill && (l1lII1Ii = true, lI1ll1ii.splice(Iil1ilI, -1, i11iiiI[Iil1ilI]));
  }
  if (l1lII1Ii) i11iiiI = lI1ll1ii;
}
function IIllIiIl(il1li111, lIIIiII1) {
  lIIIiII1 != 0 && il1li111.unshift(il1li111.splice(lIIIiII1, 1)[0]);
}
function i1lll1iI() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(i11iiiI, i11iiiI));
    return;
  }
  console.log("当前已设置白名单：");
  const iil1i1l = Array.from(new Set($.whitelist.split("&")));
  console.log(iil1i1l.join("&") + "\n");
  let lIlilII = [],
    l11iliiI = iil1i1l;
  for (let iIl111i in i11iiiI) {
    let iIiI1Ili = decodeURIComponent(i11iiiI[iIl111i].match(/pt_pin=([^; ]+)(?=;?)/) && i11iiiI[iIl111i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (l11iliiI.includes(iIiI1Ili)) {
      lIlilII.push(i11iiiI[iIl111i]);
    }
  }
  helpCookiesArr = lIlilII;
  if (l11iliiI.length > 1) {
    for (let iiili1i1 in l11iliiI) {
      let iIIlII = l11iliiI[l11iliiI.length - 1 - iiili1i1];
      if (!iIIlII) continue;
      for (let I1I1iI1i in helpCookiesArr) {
        let II11iI1l = decodeURIComponent(helpCookiesArr[I1I1iI1i].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[I1I1iI1i].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        iIIlII == II11iI1l && IIllIiIl(helpCookiesArr, I1I1iI1i);
      }
    }
  }
}