/*
9.15-9.29 中秋月饼勋章会员互动

————————————————
任务本，抽奖看脸

变量:
export jd_zqyb_exchangeid="兑换ID"
export jd_mpdz_draw="3" //次数 抽奖   没有多少就选择抽奖，很多小豆子

cron:31 16 17-29 9 *
============Quantumultx===============
[task_local]
#9.15-9.29 中秋月饼勋章会员互动
31 16 17-29 9 * jd_zqybhd.js, tag=9.15-9.29 中秋月饼勋章会员互动, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('9.15-9.29 中秋月饼勋章会员互动');
const II1lI1i = $.isNode() ? require("./jdCookie.js") : "",
  lIIil11i = $.isNode() ? require("./sendNotify") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const I11i1ll = require("./function/krgetToken"),
  I1IiiI = require("./function/krh5st"),
  IllIi1II = require("./function/jdCommon");
let I11Ii11i = "https://mpdz-act-dz.isvjcloud.com",
  IilllIiI = "false",
  IIiIl1ii = [],
  I1IIIl11 = "";
if ($.isNode()) {
  Object.keys(II1lI1i).forEach(iiII111 => {
    IIiIl1ii.push(II1lI1i[iiII111]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIiIl1ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IiiIlii($.getdata("CookiesJD") || "[]").map(Iil1lII1 => Iil1lII1.cookie)].filter(lilii1ll => !!lilii1ll);
IilllIiI = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + IilllIiI : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + IilllIiI;
$.exchangePostawardId = process.env.jd_zqyb_exchangeid ? process.env.jd_zqyb_exchangeid : "e3c9834ac90b46ba8060d3ad40fd5708";
let II1ill = "30";
II1ill = $.isNode() ? process.env.retrynum ? process.env.retrynum : II1ill : $.getdata("retrynum") ? $.getdata("retrynum") : II1ill;
const lIl11II = process.env.JD_PROXY_TUNNRL,
  lIIli1i1 = process.env.MPDZ_WAIT || "2";
let IIIlili = "0";
IIIlili = $.isNode() ? process.env.jd_mpdz_draw ? process.env.jd_mpdz_draw : IIIlili : $.getdata("jd_mpdz_draw") ? $.getdata("jd_mpdz_draw") : IIIlili;
let iii1lI1I = parseInt(lIIli1i1) * 1000;
lIl11II && (iii1lI1I = 100);
allMessage = "";
message = "";
let IlllllI = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let i1Il1l1l = "";
!(async () => {
  if (!IIiIl1ii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let IIIliiIi = [];
    IIIliiIi = UserAdd_Data_Arr.split("|");
    var lIii11iI = Math.floor(Math.random() * IIIliiIi.length);
    if (IIIliiIi[lIii11iI] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else {
      IIIliiIi = IIIliiIi[lIii11iI];
    }
    if (process.env.jd_jinggeng_address) {
      IIIliiIi = IIIliiIi.split("@");
      if (IIIliiIi.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let IlI1lIIi = 0; IlI1lIIi < 6; IlI1lIIi++) {
        if (IIIliiIi[IlI1lIIi] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      IIIliiIi = IIIliiIi.split("@");
      if (IIIliiIi.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let Ii1I1l1 = 0; Ii1I1l1 < 7; Ii1I1l1++) {
        if (IIIliiIi[Ii1I1l1] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = IIIliiIi[0];
    $.phone = IIIliiIi[1];
    $.province = IIIliiIi[2];
    $.city = IIIliiIi[3];
    $.county = IIIliiIi[4];
    $.address = IIIliiIi[5];
  }
  authorCodeList = await iI1IIIll("http://code.kingran.cf/dplh.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = IlllllI ? IlllllI : authorCodeList[il1iii1i(0, authorCodeList.length)];
  } else {
    let illl11I1 = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = IlllllI ? IlllllI : illl11I1[il1iii1i(0, illl11I1.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.appkey = "8bd7eeb6c96e4145864af794bb2cadd0";
  $.userId = "10299171";
  $.actId = "jd_beverage_union_230915";
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let lI1l1i11 = 0; lI1l1i11 < IIiIl1ii.length; lI1l1i11++) {
    I1IIIl11 = IIiIl1ii[lI1l1i11];
    $.ownCookie = IIiIl1ii[lI1l1i11];
    if (I1IIIl11) {
      $.UserName = decodeURIComponent(I1IIIl11.match(/pt_pin=([^; ]+)(?=;?)/) && I1IIIl11.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lI1l1i11 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      $.UA = IllIi1II.genUA($.UserName);
      await i1iIliii();
      if ($.outFlag || $.activityEnd) break;
      await $.wait(iii1lI1I);
    }
  }
  if ($.outFlag) {
    let li1IlI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + li1IlI);
    if ($.isNode()) await lIIil11i.sendNotify("" + $.name, "" + li1IlI);
  }
})().catch(liiI11l1 => $.logErr(liiI11l1)).finally(() => $.done());
async function i1iIliii() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    i1Il1l1l = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await I11i1ll(I1IIIl11, I11Ii11i);
    if (!$.Token) for (let IIIlI1ll = 0; IIIlI1ll < 3; IIIlI1ll++) {
      lIl11II && (console.log("Token没有成功获取，重试中"), $.Token = await I11i1ll(I1IIIl11, I11Ii11i), $.Token && ($.flag = true));
      if ($.flag) break;
    }
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await ilili1ii("activity_load");
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("获取cookie失败");
      return;
    }
    $.toBind = 0;
    $.openLists = [1000013169, 1000014485, 1000089246, 1000088849, 1000004718];
    await ilili1ii("绑定");
    await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
    await ilili1ii("completeState");
    for (let llII1Il = 0; llII1Il < $.renwulists.length; llII1Il++) {
      $.missionType = $.renwulists[llII1Il].type;
      if (!$.renwulists[llII1Il].isComplete) switch ($.missionType) {
        case "buyHotProducts":
        case "payTrade":
        case "shareAct":
          break;
        case "openCard":
          for (let illlil1l = 0; illlil1l < $.openLists.length; illlil1l++) {
            $.missionType = "openCard";
            $.open = false;
            $.joinVenderId = $.openLists[illlil1l];
            await ilili1ii("kaika");
            await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
            if ($.open == false) {
              $.errorJoinShop = "";
              await Ili1l1i1();
              await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
              if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) break;
              $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(parseInt(iii1lI1I * 1 + 500, 10)), await Ili1l1i1(), await $.wait(parseInt(iii1lI1I * 1 + 500, 10)));
              if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                console.log("💔 无法开卡,跳过运行");
                break;
              }
              await ilili1ii("activity_load");
              await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
            }
          }
          break;
        case "uniteAddCart":
          for (let iI1iilI1 = 0; iI1iilI1 < 1; iI1iilI1++) {
            $.missionType = "uniteAddCart";
            await ilili1ii("mission");
            await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
          }
          break;
        case "uniteCollectShop":
          for (let lIl1lI = 0; lIl1lI < 1; lIl1lI++) {
            $.missionType = "uniteCollectShop";
            await ilili1ii("mission");
            await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
          }
          break;
        case "followChannel":
          for (let iIIIlll1 = 0; iIIIlll1 < 1; iIIIlll1++) {
            $.missionType = "followChannel";
            await ilili1ii("mission");
            await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
          }
          break;
        case "viewTimes":
          $.vimetims = false;
          for (let Il1I1l1l = 0; Il1I1l1l < 1; Il1I1l1l++) {
            $.missionType = "viewTimes";
            await ilili1ii("mission");
            await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
            if ($.vimetims) break;
          }
          break;
        case "shareAct":
          for (let Ii1111II = 0; Ii1111II < 1; Ii1111II++) {
            $.missionType = "shareAct";
            await ilili1ii("绑定");
            await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
          }
          break;
        default:
          await $.wait(1000);
      }
    }
    await ilili1ii("activity_load");
    console.log("\n当前月饼：" + $.remainPoint + "\n");
    await $.wait(parseInt(iii1lI1I * 1 + 500, 10));
    await ilili1ii("getAwardSettingList");
    for (const l1II1iII of $.getAwardSettingList) {
      console.log(l1II1iII.awardName + "(库存:" + l1II1iII.remainNum + "-" + l1II1iII.awardDes + "月饼)\n兑换ID：" + l1II1iII.id);
    }
    if ($.exchangePostawardId) {
      console.log("");
      console.log("开始兑换 id：" + $.exchangePostawardId);
      await ilili1ii("exchangePost");
    } else console.log(""), console.log("未填写兑换ID，不进行兑换");
    $.runFalag = true;
    if (IIIlili + "" !== "0") {
      $.runFalag = true;
      let I1IIiiii = parseInt($.remainPoint / 1);
      IIIlili = parseInt(IIIlili, 10);
      if (I1IIiiii > IIIlili) I1IIiiii = IIIlili;
      console.log("抽奖次数为:" + I1IIiiii + "，当前月饼：" + $.remainPoint);
      for (m = 1; I1IIiiii--; m++) {
        console.log("第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ilili1ii("抽奖");
        if ($.runFalag == false) break;
        if (Number(I1IIiiii) <= 0) break;
        if (m >= 10) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[jd_mpdz_draw]为\"3\" 3为次数");
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("后面的号都会助力:" + $.inviteNick));
  } catch (Iiil1liI) {
    console.log(Iiil1liI);
  }
}
async function ilili1ii(I11iIIII) {
  if ($.outFlag) return;
  let iiIi11lI = "https://mpdz-act-dz.isvjcloud.com",
    li11111I = "",
    lIiII11 = "POST",
    iil1Il11 = "";
  switch (I11iIIII) {
    case "activity_load":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", iil1Il11 = {
        "jdToken": $.Token,
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) iil1Il11 = {
        ...iil1Il11,
        "shopId": "" + $.joinVenderId
      };
      li11111I = iilIlIli("/jdBeverageUnion/activity/load", iil1Il11);
      break;
    case "mission":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", iil1Il11 = {
        "missionType": $.missionType
      }, li11111I = iilIlIli("/jdBeverageUnion/mission/completeMission", iil1Il11);
      break;
    case "绑定":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", iil1Il11 = {
        "missionType": "relationBind",
        "inviterNick": $.inviteNick || ""
      }, li11111I = iilIlIli("/jdBeverageUnion/customer/inviteRelation", iil1Il11);
      break;
    case "kaika":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", iil1Il11 = {
        "missionType": $.missionType,
        "shopId": $.joinVenderId,
        "userId": "10299171",
        "inviterNick": $.inviteNick || ""
      }, li11111I = iilIlIli("/jdBeverageUnion/mission/completeMission", iil1Il11);
      break;
    case "completeState":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/mission/completeState?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171", iil1Il11 = {}, li11111I = iilIlIli("/jdBeverageUnion/mission/completeState", iil1Il11);
      break;
    case "抽奖":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || ""), iil1Il11 = {
        "dataType": "draw"
      }, li11111I = iilIlIli("/jdBeverageUnion/interactive/drawPost", iil1Il11);
      break;
    case "updateAddress":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171", iil1Il11 = {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.actLogId
      }, li11111I = iilIlIli("/jdBeverageUnion/awards/updateAddress", iil1Il11);
      break;
    case "getAwardSettingList":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/awards/getAwardSettingList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || ""), iil1Il11 = {
        "dataType": "exchange"
      }, li11111I = iilIlIli("/jdBeverageUnion/awards/getAwardSettingList", iil1Il11);
      break;
    case "exchangePost":
      url = iiIi11lI + "/dm/front/jdBeverageUnion/interactive/exchangePost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || ""), iil1Il11 = {
        "dataType": "exchange",
        "awardId": $.exchangePostawardId
      }, li11111I = iilIlIli("/jdBeverageUnion/interactive/exchangePost", iil1Il11);
      break;
    default:
      console.log("错误" + I11iIIII);
  }
  let li1ll1I = iI111l1i(url, li11111I, lIiII11);
  if (lIiII11 === "GET") {
    delete li1ll1I.body;
    delete li1ll1I["Content-Type"];
  }
  const IlI1I1il = II1ill;
  let il11ili = 0,
    liiliii = null,
    iIl1iIiI = false;
  while (il11ili < IlI1I1il) {
    il11ili > 0 && (await $.wait(1000));
    const {
      err: llIl1I1i,
      res: i111l1i1,
      data: iili1ilI
    } = await iii11lI1(li1ll1I, lIiII11);
    if (llIl1I1i) {
      if (typeof llIl1I1i === "string" && llIl1I1i.includes("Timeout awaiting 'request'")) liiliii = I11iIIII + " 请求超时，请检查网络重试";else {
        const Ili1lli = i111l1i1?.["statusCode"];
        if (Ili1lli) {
          if ([403, 493].includes(Ili1lli)) liiliii = I11iIIII + " 请求失败，IP被限制（Response code " + Ili1lli + "）", iIl1iIiI = true;else [400, 404].includes(Ili1lli) ? liiliii = I11iIIII + " 请求配置参数错误，请联系开发者进行反馈（Response code " + Ili1lli + "）" : liiliii = I11iIIII + " 请求失败（Response code " + Ili1lli + "）";
        } else liiliii = I11iIIII + " 请求失败 => " + (llIl1I1i.message || llIl1I1i);
      }
      il11ili++;
    } else {
      const iliil1 = IllIi1II.getResponseCookie(i111l1i1),
        lliiIllI = false;
      if (lliiIllI) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + I11iIIII + " 响应Body => " + (iili1ilI || "无") + "\n");
        console.log("🔧 " + I11iIIII + " 响应Cookie => " + (iliil1 || "无") + "\n");
        console.log("🔧 " + I11iIIII + " 请求参数");
        console.log(requestOptions);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(I11iIIII)) {
        try {
          const lI1lilII = JSON.parse(iili1ilI);
          iiii1iIi(I11iIIII, lI1lilII);
          break;
        } catch (li111lI) {
          liiliii = "❌ " + I11iIIII + " 接口响应数据解析失败: " + li111lI.message;
          console.log("🚫 " + I11iIIII + " => " + String(iili1ilI || "无响应数据"));
          lliiIllI && (console.log("\n---------------------------------------------------\n"), console.log("\n---------------------------------------------------\n"));
          il11ili++;
        }
      } else {
        break;
      }
      iIl1iIiI = false;
    }
  }
  il11ili >= IlI1I1il && (console.log(liiliii), iIl1iIiI && !hotbreak && ($.outFlag = true));
}
async function iii11lI1(l1iIII1I, lI11IllI = "POST") {
  if (lI11IllI === "POST") return new Promise(async lIil1lii => {
    $.post(l1iIII1I, (IIIlliii, lIl1iii1, IIlIIll) => {
      lIil1lii({
        "err": IIIlliii,
        "res": lIl1iii1,
        "data": IIlIIll
      });
    });
  });else {
    if (lI11IllI === "GET") {
      return new Promise(async IIlIII => {
        $.get(l1iIII1I, (I11IiI1i, il1lI1ii, IlIiIl1) => {
          IIlIII({
            "err": I11IiI1i,
            "res": il1lI1ii,
            "data": IlIiIl1
          });
        });
      });
    } else {
      const iIiliIII = "不支持的请求方法";
      return {
        "err": iIiliIII,
        "res": null,
        "data": null
      };
    }
  }
}
async function iiii1iIi(ii1liiii, I1II1iI) {
  try {
    let IiiIIll = "";
    switch (ii1liiii) {
      case "completeState":
        if (typeof I1II1iI == "object") {
          if (I1II1iI.success && I1II1iI.success === true && I1II1iI.data) I1II1iI.data.status && I1II1iI.data.status == 200 && ($.renwulists = I1II1iI.data.data || []);else {
            if (I1II1iI.message) console.log("" + (I1II1iI.message || ""));else {
              console.log(data);
            }
          }
        } else console.log(data);
        break;
      case "抽奖":
        if (typeof I1II1iI == "object") {
          if (I1II1iI.success && I1II1iI.success === true && I1II1iI.data) {
            if (I1II1iI.data.status && I1II1iI.data.status == 200) {
              if (I1II1iI.data.data.sendResult) console.log("抽中：" + I1II1iI.data.data.awardSetting.awardName), I1II1iI.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = I1II1iI.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await ilili1ii("updateAddress"), await $.wait(4000));else !I1II1iI.data.data.result ? console.log("💔 空气") : console.log(I1II1iI.data.data);
            } else I1II1iI.data.status && I1II1iI.data.status == 500 && console.log("" + (I1II1iI.data.msg || ""));
          } else {
            if (I1II1iI.message) {
              console.log("" + (I1II1iI.message || ""));
            } else {
              console.log(data);
            }
          }
        } else {
          console.log(data);
        }
        break;
      case "getAwardSettingList":
        if (typeof I1II1iI == "object") {
          if (I1II1iI.success && I1II1iI.success === true && I1II1iI.data) I1II1iI.data.status && I1II1iI.data.status == 200 && ($.getAwardSettingList = I1II1iI.data.data.awardSettings || []);else I1II1iI.message ? console.log("" + (I1II1iI.message || "")) : console.log(data);
        } else console.log(data);
        break;
      case "exchangePost":
        if (typeof I1II1iI == "object") {
          if (I1II1iI.success && I1II1iI.success === true && I1II1iI.data) {
            if (I1II1iI.data.status && I1II1iI.data.status == 200) {
              if (I1II1iI.data.data.sendResult) {
                console.log("兑换成功，获得：" + I1II1iI.data.data.awardSetting.awardName);
                if (I1II1iI.data.data.awardSetting.awardType == "goods") {
                  if (process.env.jd_jinggeng_address) {
                    $.actLogId = I1II1iI.data.data.awardSendLog.id;
                    console.log("兑换实物成功，奖品领取ID：" + $.actLogId);
                    await ilili1ii("updateAddress");
                    await $.wait(4000);
                  }
                }
              } else {
                if (!I1II1iI.data.data.result) {
                  console.log("兑换成功，💔 空气 （只能兑换一次）");
                } else console.log(I1II1iI.data.data);
              }
            } else I1II1iI.data.status && I1II1iI.data.status == 500 && console.log("" + (I1II1iI.data.msg || ""));
          } else I1II1iI.message ? console.log("" + (I1II1iI.message || "")) : console.log(data);
        } else console.log(data);
        break;
      case "updateAddress":
        if (typeof I1II1iI == "object") {
          if (I1II1iI.success && I1II1iI.success === true && I1II1iI.data) {
            if (I1II1iI.data.status && I1II1iI.data.status == 200) I1II1iI.data.data.result ? console.log("地址填写成功，返回：" + I1II1iI.data.data.msg) : console.log(I1II1iI.data.data);else I1II1iI.data.status && I1II1iI.data.status == 500 && console.log("" + (I1II1iI.data.msg || ""));
          } else {
            if (I1II1iI.message) {
              console.log("" + (I1II1iI.message || ""));
            } else console.log(data);
          }
        } else console.log(data);
        break;
      case "activity_load":
      case "mission":
      case "shopList":
      case "kaika":
      case "绑定":
      case "助力":
        IiiIIll = "";
        if (typeof I1II1iI == "object") {
          if (I1II1iI.success && I1II1iI.success === true && I1II1iI.data) {
            if (I1II1iI.data.status && I1II1iI.data.status == 200) {
              I1II1iI = I1II1iI.data;
              if (I1II1iI.msg || I1II1iI.data.isOpenCard || I1II1iI.data.remark) console.log("" + (IiiIIll && IiiIIll + ":" || "") + (I1II1iI.msg || I1II1iI.data.isOpenCard || I1II1iI.data.remark || ""));
              if (ii1liiii == "activity_load") I1II1iI.data && ($.endTime = I1II1iI.data.cusActivity.endTime || 0, $.MixNick = I1II1iI.data.missionCustomer.buyerNick || "", $.remainPoint = I1II1iI.data.missionCustomer.remainPoint || 0, $.remainChance = I1II1iI.data.missionCustomer.remainChance || 0, $.usedPoint = I1II1iI.data.missionCustomer.usedPoint || 0, $.hasCollectShop = I1II1iI.data.missionCustomer.hasCollectShop || 0, $.hasAddCart = I1II1iI.data.missionCustomer.hasAddCart || 0);else {
                if (ii1liiii == "shopList") I1II1iI.data && ($.openLists = I1II1iI.data);else ii1liiii == "mission" && (I1II1iI.data.remark.indexOf("赶紧去开卡吧") > -1 ? $.open = true : $.open = false);
              }
            } else {
              if (I1II1iI.data.msg) {
                if (I1II1iI.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                I1II1iI.data.msg.indexOf("浏览已达上限") > -1 && ($.vimetims = true);
                console.log("" + (I1II1iI.data.msg || ""));
              } else {
                if (I1II1iI.errorMessage) {
                  if (I1II1iI.errorMessage.indexOf("火爆") > -1) {}
                  console.log("" + (I1II1iI.errorMessage || ""));
                } else console.log("" + data);
              }
            }
          } else I1II1iI.errorMessage ? console.log("" + (I1II1iI.errorMessage || "")) : console.log("" + data);
        } else {
          console.log("" + data);
        }
        break;
      default:
        console.log((IiiIIll || ii1liiii) + "-> " + data);
    }
    if (typeof I1II1iI == "object") {
      if (I1II1iI.errorMessage) {
        if (I1II1iI.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (lIiIlI1I) {
    console.log(lIiIlI1I);
  }
}
function iI111l1i(iiIl1Ill, lililIi1, lliiIIll = "POST") {
  let liIl111l = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": I1IIIl11,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iiIl1Ill.indexOf("https://mpdz-act-dz.isvjcloud.com") > -1 && (liIl111l.Origin = "https://mpdz-act-dz.isvjcloud.com", liIl111l["Content-Type"] = "application/json; charset=utf-8", delete liIl111l.Cookie), {
    "url": iiIl1Ill,
    "method": lliiIIll,
    "headers": liIl111l,
    "body": lililIi1,
    "timeout": 30000
  };
}
function iilIlIli(lill11ii, Ill1liiI) {
  d = {
    "actId": $.actId,
    ...Ill1liiI,
    "method": lill11ii,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = iiIiI1(d);
  const iIiIliI = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "m": "POST",
        "sign": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ...Ill1liiI,
        "method": lill11ii,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return lill11ii.indexOf("missionInviteList") > -1 && delete iIiIliI.params.admJson.actId, $.toStr(iIiIliI, iIiIliI);
}
function iiIiI1(llIiiIII) {
  AppSecret = "01315faaab3f4bfb8446fa54aa579321";
  key = "8bd7eeb6c96e4145864af794bb2cadd0";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(llIiiIII));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = key + "a" + key + "b" + s2 + "c" + time2 + AppSecret;
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    "sign": sign,
    "timeStamp": time2
  };
}
function l1l1I1(iiIllI) {
  iiIllI = iiIllI || 32;
  let lIl1illl = "abcdef0123456789",
    iliiI1lI = lIl1illl.length,
    i1III1 = "";
  for (i = 0; i < iiIllI; i++) i1III1 += lIl1illl.charAt(Math.floor(Math.random() * iliiI1lI));
  return i1III1;
}
function IiiIlii(Il1lill) {
  if (typeof Il1lill == "string") {
    try {
      return JSON.parse(Il1lill);
    } catch (I1lIIIll) {
      return console.log(I1lIIIll), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function Ili1l1i1() {
  if (!$.joinVenderId) return;
  return new Promise(async llIII => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let li1lIiii = "";
    if ($.shopactivityId) li1lIiii = ",\"activityId\":" + $.shopactivityId;
    const lIIlIlIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + li1lIiii + ",\"channel\":406}",
      lll1i1ii = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIIlIlIl)
      },
      l11i1l = await I1IiiI("27004", lll1i1ii),
      Illiilli = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + lIIlIlIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11i1l),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": I1IIIl11
        },
        "timeout": 20000
      };
    $.get(Illiilli, async (IlIil1lI, i1I11llI, l1iiIl1I) => {
      try {
        if (IlIil1lI) console.log(IlIil1lI);else {
          const Ilil11il = JSON.parse(l1iiIl1I);
          if (typeof Ilil11il === "object") {
            if (Ilil11il.success === true) {
              console.log(Ilil11il.message);
              $.errorJoinShop = Ilil11il.message;
              if (Ilil11il.result && Ilil11il.result.giftInfo) {
                for (let I1i1llIl of Ilil11il.result.giftInfo.giftList) {
                  console.log("入会获得：" + I1i1llIl.discountString + I1i1llIl.prizeName + I1i1llIl.secondLineDesc);
                }
              }
            } else typeof Ilil11il == "object" && Ilil11il.message ? ($.errorJoinShop = Ilil11il.message, console.log("" + (Ilil11il.message || ""))) : console.log(l1iiIl1I);
          } else console.log(l1iiIl1I);
        }
      } catch (ili1iIIl) {
        $.logErr(ili1iIIl, i1I11llI);
      } finally {
        llIII();
      }
    });
  });
}
function iI1IIIll(liiI1lii) {
  return new Promise(liI11l1l => {
    const III111Il = {
      "url": "" + liiI1lii,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(III111Il, async (ill1lllI, I1liI1i, lIIlll1i) => {
      try {
        if (ill1lllI) {} else lIIlll1i ? lIIlll1i = JSON.parse(lIIlll1i) : console.log("未获取到数据,请重新运行");
      } catch (i11l11i) {
        $.logErr(i11l11i, I1liI1i);
        lIIlll1i = null;
      } finally {
        liI11l1l(lIIlll1i);
      }
    });
  });
}
function il1iii1i(I1IlIIl1, I1iI) {
  return Math.floor(Math.random() * (I1iI - I1IlIIl1)) + I1IlIIl1;
}
function Ili1ll1(l1l1II11, l1IiiilI) {
  if (l1IiiilI === "max") return Math.max.apply(Math, l1l1II11);else {
    if (l1IiiilI === "min") return Math.min.apply(Math, l1l1II11);
  }
}