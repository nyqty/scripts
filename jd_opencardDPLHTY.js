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
const i1I1IIIl = $.isNode() ? require("./jdCookie.js") : "",
  ilIII11l = $.isNode() ? require("./sendNotify") : "";
let IIIiiil = [],
  iIIiiil1 = "";
if ($.isNode()) {
  Object.keys(i1I1IIIl).forEach(ll1I111I => {
    IIIiiil.push(i1I1IIIl[ll1I111I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIIiiil = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIliiIII($.getdata("CookiesJD") || "[]").map(I1I1l111 => I1I1l111.cookie)].filter(IIII11I => !!IIII11I);
let IIIlIiiI = "30",
  iI1IiliI = "0";
IIIlIiiI = $.isNode() ? process.env.retrynum ? process.env.retrynum : IIIlIiiI : $.getdata("retrynum") ? $.getdata("retrynum") : IIIlIiiI;
iI1IiliI = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : iI1IiliI : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : iI1IiliI;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let illili1l = "",
  illl1ll = "",
  iIllil11 = "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const lii1l1li = require("./function/krgetToken"),
  Iii1i = require("./function/krh5st"),
  iill1ii1 = require("./function/jdCommon");
let llIll11l = "https://jinggengjcq-isv.isvjcloud.com";
illl1ll = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + illl1ll : $.getdata("helpnum") ? $.getdata("helpnum") : "" + illl1ll;
iIllil11 = $.isNode() ? process.env.DPLHTY ? process.env.DPLHTY : "" + iIllil11 : $.getdata("DPLHTY") ? $.getdata("DPLHTY") : "" + iIllil11;
const lIi11il = process.env.JD_PROXY_TUNNRL,
  lI111iIl = process.env.DPLHTY_WAIT || "2";
let ilI11lii = parseInt(lI111iIl) * 1000;
lIi11il && (ilI11lii = 100);
let iII1iliI = "",
  iiII111i = "";
$.whitelist = process.env.DPLHTY_whitelist || iII1iliI;
$.blacklist = process.env.DPLHTY_blacklist || iiII111i;
iii1ll11();
l11lI1l1();
!(async () => {
  if (!iIllil11) {
    console.log("\n请填写大牌大牌联合通用开卡的活动ID,变量是DPLHTY  💖\n");
    return;
  }
  authorCodeList = await ll1l1lIl("http://code.kingran.cf/dplh.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = illl1ll ? illl1ll : authorCodeList[lII1i11(0, authorCodeList.length)];else {
    let I1l1lil1 = ["vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "jvJh7GpoGhm7fSlpWhSy3MjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD", "8IgOKf+5WyAGyIlOgm/6vtPH3vYuPBb1K242gPzPNvcM1/5bn1kfgJfhWlCD+Ul2NlQTdHnDobG3YNSnH+XTYw=="];
    $.authorCode = illl1ll ? illl1ll : I1l1lil1[lII1i11(0, I1l1lil1.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("\n💬 当前ID：" + iIllil11);
  console.log("\n💬 抽奖次数：" + iI1IiliI + " 💬 重试次数：" + IIIlIiiI + " 💬 延时(ms)：" + ilI11lii);
  console.log("\n💬 请在有水的情况下运行");
  if (process.env.jd_jinggeng_address) {
    UserAdd_Data_Arr = process.env.jd_jinggeng_address;
  } else UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let l1IliIII = [];
    l1IliIII = UserAdd_Data_Arr.split("|");
    var Il11IiIi = Math.floor(Math.random() * l1IliIII.length);
    if (l1IliIII[Il11IiIi] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else {
      l1IliIII = l1IliIII[Il11IiIi];
    }
    if (process.env.jd_jinggeng_address) {
      l1IliIII = l1IliIII.split("@");
      if (l1IliIII.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let i1I1l111 = 0; i1I1l111 < 6; i1I1l111++) {
        if (l1IliIII[i1I1l111] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      l1IliIII = l1IliIII.split("@");
      if (l1IliIII.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let iiil1i11 = 0; iiil1i11 < 7; iiil1i11++) {
        if (l1IliIII[iiil1i11] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = l1IliIII[0];
    $.phone = l1IliIII[1];
    $.province = l1IliIII[2];
    $.city = l1IliIII[3];
    $.county = l1IliIII[4];
    $.address = l1IliIII[5];
  }
  if (!IIIiiil[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = iIllil11;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let i1llIiI = 0; i1llIiI < IIIiiil.length; i1llIiI++) {
    iIIiiil1 = IIIiiil[i1llIiI];
    if (iIIiiil1) {
      $.UserName = decodeURIComponent(iIIiiil1.match(/pt_pin=([^; ]+)(?=;?)/) && iIIiiil1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1llIiI + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = iill1ii1.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await Iiill1i1();
      await $.wait(ilI11lii);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let II1lll1i = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + II1lll1i);
    if ($.isNode()) await ilIII11l.sendNotify("" + $.name, "" + II1lll1i);
  }
})().catch(i1l1Iii1 => $.logErr(i1l1Iii1)).finally(() => $.done());
async function Iiill1i1() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.endTime = 0;
    illili1l = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await lii1l1li(iIIiiil1, llIll11l);
    if (!$.Token) for (let II1Il1II = 0; II1Il1II < 3; II1Il1II++) {
      lIi11il && (console.log("Token没有成功获取，重试中"), $.Token = await lii1l1li(iIIiiil1, llIll11l), $.Token && ($.flag = true));
      if ($.flag) break;
    }
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await l111l1l("activity_load");
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("❌ 获取[活动信息]失败，可能是黑号或者太卡了");
      return;
    }
    $.toBind = 0;
    $.openList = [];
    await l111l1l("绑定");
    await $.wait(parseInt(ilI11lii * 1 + 500, 10));
    await l111l1l("shopList");
    await $.wait(parseInt(ilI11lii * 1 + 500, 10));
    await l111l1l("completeState");
    for (let I111II1I = 0; I111II1I < $.renwulists.length; I111II1I++) {
      $.missionType = $.renwulists[I111II1I].type;
      if (!$.renwulists[I111II1I].isComplete) switch ($.missionType) {
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
              await l111l1l("mission");
              await $.wait(parseInt(ilI11lii * 1 + 500, 10));
              if ($.openCard == true) {
                $.errorJoinShop = "";
                await iIl1li11();
                await $.wait(parseInt(ilI11lii * 1 + 500, 10));
                if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
                  break;
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("😤 呜呜呜，重试开卡");
                  await $.wait(parseInt(ilI11lii * 1 + 500, 10));
                  await iIl1li11();
                  await $.wait(parseInt(ilI11lii * 1 + 500, 10));
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("💔 无法开卡,跳过运行");
                  break;
                }
                await $.wait(parseInt(ilI11lii * 1 + 500, 10));
                await l111l1l("activity_load");
                await $.wait(parseInt(ilI11lii * 1 + 500, 10));
                await l111l1l("shopList");
                await $.wait(parseInt(ilI11lii * 1 + 500, 10));
              }
            }
          }
          break;
        case "uniteAddCart":
          for (let iIiIi1 = 0; iIiIi1 < 1; iIiIi1++) {
            $.missionType = "uniteAddCart";
            await l111l1l("mission");
            await $.wait(parseInt(ilI11lii * 1 + 500, 10));
          }
          break;
        case "uniteCollectShop":
          for (let ilI1lIii = 0; ilI1lIii < 1; ilI1lIii++) {
            $.missionType = "uniteCollectShop";
            await l111l1l("mission");
            await $.wait(parseInt(ilI11lii * 1 + 500, 10));
          }
          break;
        case "followChannel":
          for (let li111I1I = 0; li111I1I < 1; li111I1I++) {
            $.missionType = "followChannel";
            await l111l1l("mission");
            await $.wait(parseInt(ilI11lii * 1 + 500, 10));
          }
          break;
        case "multipleBrowsing":
          $.vimetims = false;
          for (I111II1I of $.openList) {
            $.missionType = "multipleBrowsing";
            $.goodsId = I111II1I.userId;
            await l111l1l("mission");
            await $.wait(parseInt(ilI11lii * 1 + 500, 10));
            if ($.vimetims) break;
          }
          break;
        case "shareAct":
          for (let lliI1ii = 0; lliI1ii < 1; lliI1ii++) {
            $.missionType = "shareAct";
            await l111l1l("绑定");
            await $.wait(parseInt(ilI11lii * 1 + 500, 10));
          }
          break;
        default:
          await $.wait(1000);
      }
    }
    await l111l1l("activity_load");
    if (iI1IiliI !== "0") {
      $.runFalag = true;
      let llIlllii = parseInt($.remainPoint / 200);
      iI1IiliI = parseInt(iI1IiliI, 10);
      if (llIlllii > iI1IiliI) llIlllii = iI1IiliI;
      console.log("💖 抽奖次数为:" + llIlllii + "，当前积分：" + $.remainPoint);
      for (m = 1; llIlllii--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l111l1l("抽奖");
        if ($.runFalag == false) break;
        if (Number(llIlllii) <= 0) break;
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
    await $.wait(parseInt(ilI11lii * 1 + 500, 10));
  } catch (III11i11) {
    console.log(III11i11);
  }
}
async function l111l1l(liiiIiil) {
  if ($.outFlag) return;
  let llli1Ii1 = "https://jinggengjcq-isv.isvjcloud.com",
    ll1i1Ii1 = "",
    liil1ii = "POST",
    liIilIlI = "";
  switch (liiiIiil) {
    case "activity_load":
      url = llli1Ii1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", liIilIlI = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) liIilIlI = {
        ...liIilIlI,
        "shopId": "" + $.joinVenderId
      };
      ll1i1Ii1 = I1Ili1ii("/jdBigAlliance/activity/load", liIilIlI);
      break;
    case "shopList":
      url = llli1Ii1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", liIilIlI = {}, ll1i1Ii1 = I1Ili1ii("/jdBigAlliance/shop/shopList", liIilIlI);
      break;
    case "绑定":
      url = llli1Ii1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", liIilIlI = {
        "inviterNick": $.inviteNick || ""
      }, ll1i1Ii1 = I1Ili1ii("/jdBigAlliance/customer/inviteRelation", liIilIlI);
      break;
    case "mission":
      url = llli1Ii1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", liIilIlI = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) liIilIlI = {
        ...liIilIlI,
        "shopId": $.joinVenderId
      };
      if ($.goodsId) liIilIlI = {
        ...liIilIlI,
        "goodsId": $.goodsId
      };
      ll1i1Ii1 = I1Ili1ii("/jdBigAlliance/mission/completeMission", liIilIlI);
      break;
    case "抽奖":
      url = llli1Ii1 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", liIilIlI = {
        "dataType": "draw",
        "usedGameNum": "2"
      }, ll1i1Ii1 = I1Ili1ii("/jdBigAlliance/interactive/drawPost", liIilIlI);
      break;
    case "updateAddress":
      url = llli1Ii1 + "/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", liIilIlI = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      }, ll1i1Ii1 = I1Ili1ii("/jdBigAlliance/awards/updateAddress", liIilIlI);
      break;
    case "completeState":
      url = llli1Ii1 + "/dm/front/jdBigAlliance/mission/completeState?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", liIilIlI = {}, ll1i1Ii1 = I1Ili1ii("/jdBigAlliance/mission/completeState", liIilIlI);
      break;
    default:
      console.log("错误" + liiiIiil);
  }
  let i1i1Ii11 = I1l1i1Il(url, ll1i1Ii1, liil1ii);
  liil1ii === "GET" && (delete i1i1Ii11.body, delete i1i1Ii11["Content-Type"]);
  const ill1II1l = IIIlIiiI;
  let ii11IiiI = 0,
    lI1lIiii = null,
    l1li1l11 = false;
  while (ii11IiiI < ill1II1l) {
    ii11IiiI > 0 && (await $.wait(1000));
    const {
      err: ll1llil,
      res: ll11li,
      data: IiII1l1
    } = await iilIii1(i1i1Ii11, liil1ii);
    if (ll1llil) {
      if (typeof ll1llil === "string" && ll1llil.includes("Timeout awaiting 'request'")) lI1lIiii = liiiIiil + " 请求超时，请检查网络重试";else {
        const lI1lii11 = ll11li?.["statusCode"];
        if (lI1lii11) {
          if ([403, 493].includes(lI1lii11)) lI1lIiii = liiiIiil + " 请求失败，IP被限制（Response code " + lI1lii11 + "）", l1li1l11 = true;else {
            if ([400, 404].includes(lI1lii11)) lI1lIiii = liiiIiil + " 请求配置参数错误，请联系开发者进行反馈（Response code " + lI1lii11 + "）";else {
              lI1lIiii = liiiIiil + " 请求失败（Response code " + lI1lii11 + "）";
            }
          }
        } else {
          lI1lIiii = liiiIiil + " 请求失败 => " + (ll1llil.message || ll1llil);
        }
      }
      ii11IiiI++;
    } else {
      const i1lIII11 = iill1ii1.getResponseCookie(ll11li),
        iilil11 = false;
      if (iilil11) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + liiiIiil + " 响应Body => " + (IiII1l1 || "无") + "\n");
        console.log("🔧 " + liiiIiil + " 响应Cookie => " + (i1lIII11 || "无") + "\n");
        console.log("🔧 " + liiiIiil + " 请求参数");
        console.log(requestOptions);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(liiiIiil)) try {
        const iliilli1 = JSON.parse(IiII1l1);
        lII1ii1i(liiiIiil, iliilli1);
        break;
      } catch (i11lll1i) {
        lI1lIiii = "❌ " + liiiIiil + " 接口响应数据解析失败: " + i11lll1i.message;
        console.log("🚫 " + liiiIiil + " => " + String(IiII1l1 || "无响应数据"));
        iilil11 && (console.log("\n---------------------------------------------------\n"), console.log("\n---------------------------------------------------\n"));
        ii11IiiI++;
      } else break;
      l1li1l11 = false;
    }
  }
  ii11IiiI >= ill1II1l && (console.log(lI1lIiii), l1li1l11 && !hotbreak && ($.outFlag = true));
}
async function iilIii1(Ili1liII, Ill1lii = "POST") {
  if (Ill1lii === "POST") return new Promise(async il11I1l1 => {
    $.post(Ili1liII, (IlII1I1I, iIllilII, ii1li1I1) => {
      il11I1l1({
        "err": IlII1I1I,
        "res": iIllilII,
        "data": ii1li1I1
      });
    });
  });else {
    if (Ill1lii === "GET") {
      return new Promise(async ii1Il1ii => {
        $.get(Ili1liII, (l1lI1iI1, i11Ii1ii, liI1l1Il) => {
          ii1Il1ii({
            "err": l1lI1iI1,
            "res": i11Ii1ii,
            "data": liI1l1Il
          });
        });
      });
    } else {
      const l1l1I1l = "不支持的请求方法";
      return {
        "err": l1l1I1l,
        "res": null,
        "data": null
      };
    }
  }
}
async function lII1ii1i(l1i1IiII, ll111lIi) {
  try {
    let II11II1I = "";
    switch (l1i1IiII) {
      case "抽奖":
        if (typeof ll111lIi == "object") {
          if (ll111lIi.success && ll111lIi.success === true && ll111lIi.data) {
            if (ll111lIi.data.status && ll111lIi.data.status == 200) {
              if (ll111lIi.data.data.sendResult) console.log("🔊 抽中：" + ll111lIi.data.data.awardSetting.awardName), ll111lIi.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = ll111lIi.data.data.awardSendLog.id, console.log("🔊 抽中实物啦，奖品领取ID：" + $.actLogId), await l111l1l("updateAddress"), await $.wait(4000));else !ll111lIi.data.data.result ? console.log("💔 空气") : console.log(ll111lIi.data.data);
            } else {
              if (ll111lIi.data.status && ll111lIi.data.status == 500) {
                console.log("" + (ll111lIi.data.msg || ""));
              }
            }
          } else {
            if (ll111lIi.message) console.log("" + (ll111lIi.message || ""));else {
              console.log(data);
            }
          }
        } else console.log(data);
        break;
      case "updateAddress":
        if (typeof ll111lIi == "object") {
          if (ll111lIi.success && ll111lIi.success === true && ll111lIi.data) {
            if (ll111lIi.data.status && ll111lIi.data.status == 200) ll111lIi.data.data.result ? console.log("💖 地址填写成功，返回：" + ll111lIi.data.data.msg) : console.log(ll111lIi.data.data);else ll111lIi.data.status && ll111lIi.data.status == 500 && console.log("" + (ll111lIi.data.msg || ""));
          } else ll111lIi.message ? console.log("" + (ll111lIi.message || "")) : console.log(data);
        } else console.log(data);
        break;
      case "completeState":
        if (typeof ll111lIi == "object") {
          if (ll111lIi.success && ll111lIi.success === true && ll111lIi.data) ll111lIi.data.status && ll111lIi.data.status == 200 && ($.renwulists = ll111lIi.data.data || []);else ll111lIi.message ? console.log("" + (ll111lIi.message || "")) : console.log(data);
        } else {
          console.log(data);
        }
        break;
      case "activity_load":
      case "mission":
      case "shopList":
      case "绑定":
        II11II1I = "";
        if (typeof ll111lIi == "object") {
          if (ll111lIi.success && ll111lIi.success === true && ll111lIi.data) {
            if (ll111lIi.data.status && ll111lIi.data.status == 200) {
              ll111lIi = ll111lIi.data;
              if (ll111lIi.msg || ll111lIi.data.isOpenCard || ll111lIi.data.remark) console.log("🔊 " + (II11II1I && II11II1I + ":" || "") + (ll111lIi.msg || ll111lIi.data.isOpenCard || ll111lIi.data.remark || ""));
              if (l1i1IiII == "activity_load") {
                if (ll111lIi.msg || ll111lIi.data.isOpenCard) {
                  if ((ll111lIi.msg || ll111lIi.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (ll111lIi.data) {
                  $.endTime = ll111lIi.data.cusActivity.endTime || 0;
                  $.MixNick = ll111lIi.data.missionCustomer.buyerNick || "";
                  $.usedChance = ll111lIi.data.missionCustomer.usedChance || 0;
                  $.remainPoint = ll111lIi.data.missionCustomer.remainPoint || 0;
                  $.hasCollectShop = ll111lIi.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = ll111lIi.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (l1i1IiII == "shopList") $.openList = ll111lIi.data || [];else {
                  if (l1i1IiII == "mission") {
                    if (ll111lIi.data.remark.indexOf("不是会员") > -1) $.openCard = true;else {
                      $.openCard = false;
                    }
                  }
                }
              }
            } else {
              if (ll111lIi.data.msg) ll111lIi.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true), console.log("🔊 " + (ll111lIi.data.msg || "")), ll111lIi.data.msg.indexOf("浏览已达上限") > -1 && ($.vimetims = true);else {
                if (ll111lIi.errorMessage) {
                  if (ll111lIi.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (ll111lIi.errorMessage || ""));
                } else console.log("" + data);
              }
            }
          } else ll111lIi.errorMessage ? console.log("🔊 " + (ll111lIi.errorMessage || "")) : console.log("" + data);
        } else {}
        break;
      default:
        console.log((II11II1I || l1i1IiII) + "-> " + data);
    }
    if (typeof ll111lIi == "object") {
      if (ll111lIi.errorMessage) {
        if (ll111lIi.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (iIII1lIl) {}
}
function I1l1i1Il(i1l1iI1, IIl1lIl, iI1lIli1 = "POST") {
  let IiiiIIIl = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iIIiiil1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i1l1iI1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (IiiiIIIl.Origin = "https://jinggengjcq-isv.isvjcloud.com", IiiiIIIl["Content-Type"] = "application/json; charset=utf-8", delete IiiiIIIl.Cookie), {
    "url": i1l1iI1,
    "method": iI1lIli1,
    "headers": IiiiIIIl,
    "body": IIl1lIl,
    "timeout": 30 * 1000
  };
}
function I1Ili1ii(I1iIi1ii, IliiIlli) {
  d = {
    "actId": $.actId,
    ...IliiIlli,
    "method": I1iIi1ii,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = iIIiil1I(d);
  const iI1l1lIl = {
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
        ...IliiIlli,
        "method": I1iIi1ii,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return I1iIi1ii.indexOf("missionInviteList") > -1 && delete iI1l1lIl.params.admJson.actId, $.toStr(iI1l1lIl, iI1l1lIl);
}
function lII1i11(lIlI1ii, iI11lIli) {
  return Math.floor(Math.random() * (iI11lIli - lIlI1ii)) + lIlI1ii;
}
function iIIiil1I(i11li1Il) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(i11li1Il));
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
function Iiiii11(iIIiIIli) {
  iIIiIIli = iIIiIIli || 32;
  let Illill11 = "abcdef0123456789",
    i1lI1I1l = Illill11.length,
    I1IIlI = "";
  for (i = 0; i < iIIiIIli; i++) I1IIlI += Illill11.charAt(Math.floor(Math.random() * i1lI1I1l));
  return I1IIlI;
}
function iIliiIII(illl1i1i) {
  if (typeof illl1i1i == "string") try {
    return JSON.parse(illl1i1i);
  } catch (lIllIlil) {
    return console.log(lIllIlil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function iIl1li11() {
  if (!$.joinVenderId) return;
  return new Promise(async Ii1ll1li => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i11IIlI1 = "";
    if ($.shopactivityId) i11IIlI1 = ",\"activityId\":" + $.shopactivityId;
    const llI1i1il = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i11IIlI1 + ",\"channel\":406}",
      lllIil = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(llI1i1il)
      },
      iliII1l1 = await Iii1i("27004", lllIil),
      i1lIIIlI = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + llI1i1il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iliII1l1),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": iIIiiil1
        },
        "timeout": 20000
      };
    $.get(i1lIIIlI, async (i11IIl1i, I1llIlI1, l1II1I) => {
      try {
        if (i11IIl1i) console.log(i11IIl1i);else {
          const IIIiIiII = JSON.parse(l1II1I);
          if (typeof IIIiIiII === "object") {
            if (IIIiIiII.success === true) {
              console.log("🔊 " + IIIiIiII.message);
              $.errorJoinShop = IIIiIiII.message;
              if (IIIiIiII.result && IIIiIiII.result.giftInfo) for (let I1I1IlIi of IIIiIiII.result.giftInfo.giftList) {
                console.log("🔊 入会获得：" + I1I1IlIi.discountString + I1I1IlIi.prizeName + I1I1IlIi.secondLineDesc);
              }
            } else typeof IIIiIiII == "object" && IIIiIiII.message ? ($.errorJoinShop = IIIiIiII.message, console.log("" + (IIIiIiII.message || ""))) : console.log(l1II1I);
          } else {
            console.log(l1II1I);
          }
        }
      } catch (l1Iii111) {
        $.logErr(l1Iii111, I1llIlI1);
      } finally {
        Ii1ll1li();
      }
    });
  });
}
function ll1l1lIl(lIlIiI1i) {
  return new Promise(III11I1I => {
    const iIIIlI1I = {
      "url": "" + lIlIiI1i,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIIIlI1I, async (Il1i1lii, iIiIi11, lIliii1i) => {
      try {
        if (Il1i1lii) {} else {
          if (lIliii1i) {
            lIliii1i = JSON.parse(lIliii1i);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (Il1ii11) {
        $.logErr(Il1ii11, iIiIi11);
        lIliii1i = null;
      } finally {
        III11I1I(lIliii1i);
      }
    });
  });
}
function lII1i11(I1IIiIil, IillIiil) {
  return Math.floor(Math.random() * (IillIiil - I1IIiIil)) + I1IIiIil;
}
function l11lI1l1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lIIiliI1 = Array.from(new Set($.blacklist.split("&")));
  console.log(lIIiliI1.join("&") + "\n");
  let Ili1lIli = lIIiliI1,
    lIlIii11 = [],
    lIii1lIl = false;
  for (let il11i1l = 0; il11i1l < IIIiiil.length; il11i1l++) {
    let ilI1illl = decodeURIComponent(IIIiiil[il11i1l].match(/pt_pin=([^; ]+)(?=;?)/) && IIIiiil[il11i1l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ilI1illl) break;
    let lI1l1ili = false;
    for (let Ii1il1Ii of Ili1lIli) {
      if (Ii1il1Ii && Ii1il1Ii == ilI1illl) {
        lI1l1ili = true;
        break;
      }
    }
    !lI1l1ili && (lIii1lIl = true, lIlIii11.splice(il11i1l, -1, IIIiiil[il11i1l]));
  }
  if (lIii1lIl) IIIiiil = lIlIii11;
}
function l1ilI1II(I1l11Ili, li1lI1II) {
  li1lI1II != 0 && I1l11Ili.unshift(I1l11Ili.splice(li1lI1II, 1)[0]);
}
function iii1ll11() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IIIiiil, IIIiiil));
    return;
  }
  console.log("当前已设置白名单：");
  const li1liill = Array.from(new Set($.whitelist.split("&")));
  console.log(li1liill.join("&") + "\n");
  let Il1II11I = [],
    iliIl1I1 = li1liill;
  for (let Il11lill in IIIiiil) {
    let Illl1II = decodeURIComponent(IIIiiil[Il11lill].match(/pt_pin=([^; ]+)(?=;?)/) && IIIiiil[Il11lill].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (iliIl1I1.includes(Illl1II)) {
      Il1II11I.push(IIIiiil[Il11lill]);
    }
  }
  helpCookiesArr = Il1II11I;
  if (iliIl1I1.length > 1) for (let illl1I1 in iliIl1I1) {
    let lliI1lii = iliIl1I1[iliIl1I1.length - 1 - illl1I1];
    if (!lliI1lii) continue;
    for (let liiI1i11 in helpCookiesArr) {
      let lII1IlI1 = decodeURIComponent(helpCookiesArr[liiI1i11].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[liiI1i11].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lliI1lii == lII1IlI1 && l1ilI1II(helpCookiesArr, liiI1i11);
    }
  }
}