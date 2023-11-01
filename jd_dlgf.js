/*
10.28-11.12 签到瓜分京豆
————————————————

无助力

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#10.28-11.12 签到瓜分京豆
1 1 1 1 * jd_dlgf.js, tag=10.28-11.12 签到瓜分京豆, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('10.28-11.12 签到瓜分京豆');

const i11liiII = $.isNode() ? require("./jdCookie.js") : "",
  ll1iII1 = $.isNode() ? require("./sendNotify") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const iil1li11 = require("./function/krgetToken"),
  I1iii1 = require("./function/krh5st"),
  iI1iiIi1 = require("./function/jdCommon");
let lll1liIi = "https://mpdz-act-dz.isvjcloud.com",
  lIiIllli = "false",
  I111i11 = [],
  lliiI1l = "";
if ($.isNode()) {
  Object.keys(i11liiII).forEach(liil1iII => {
    I111i11.push(i11liiII[liil1iII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  I111i11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...li1l1Ii($.getdata("CookiesJD") || "[]").map(IIIIIIIl => IIIIIIIl.cookie)].filter(lllI1Il1 => !!lllI1Il1);
}
lIiIllli = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + lIiIllli : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + lIiIllli;
$.exchangePostawardId = process.env.jd_zqyb_exchangeid ? process.env.jd_zqyb_exchangeid : "e3c9834ac90b46ba8060d3ad40fd5708";
let llIlIllI = "30";
llIlIllI = $.isNode() ? process.env.retrynum ? process.env.retrynum : llIlIllI : $.getdata("retrynum") ? $.getdata("retrynum") : llIlIllI;
const lllI1IlI = process.env.JD_PROXY_TUNNRL,
  i1liliI1 = process.env.MPDZ_WAIT || "2";
let il1IIIiI = "0";
il1IIIiI = $.isNode() ? process.env.jd_mpdz_draw ? process.env.jd_mpdz_draw : il1IIIiI : $.getdata("jd_mpdz_draw") ? $.getdata("jd_mpdz_draw") : il1IIIiI;
let il1Iii1 = parseInt(i1liliI1) * 1000;
lllI1IlI && (il1Iii1 = 100);
allMessage = "";
message = "";
let Ill1il1 = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let i1Ill1l = "";
!(async () => {
  if (!I111i11[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let IliiillI = [];
    IliiillI = UserAdd_Data_Arr.split("|");
    var i11i11li = Math.floor(Math.random() * IliiillI.length);
    if (IliiillI[i11i11li] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else {
      IliiillI = IliiillI[i11i11li];
    }
    if (process.env.jd_jinggeng_address) {
      IliiillI = IliiillI.split("@");
      if (IliiillI.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let lIIllil1 = 0; lIIllil1 < 6; lIIllil1++) {
        if (IliiillI[lIIllil1] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      IliiillI = IliiillI.split("@");
      if (IliiillI.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let IIililI1 = 0; IIililI1 < 7; IIililI1++) {
        if (IliiillI[IIililI1] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = IliiillI[0];
    $.phone = IliiillI[1];
    $.province = IliiillI[2];
    $.city = IliiillI[3];
    $.county = IliiillI[4];
    $.address = IliiillI[5];
  }
  authorCodeList = await lIii1liI("http://code.kingran.cf/dplh.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = Ill1il1 ? Ill1il1 : authorCodeList[IIIiiI1I(0, authorCodeList.length)];
  } else {
    let iII111II = ["F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==", "k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf"];
    $.authorCode = Ill1il1 ? Ill1il1 : iII111II[IIIiiI1I(0, iII111II.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.appkey = "8bd7eeb6c96e4145864af794bb2cadd0";
  $.userId = "10299171";
  $.actId = "jdGeLiKongTiao231111";
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let i1ili = 0; i1ili < I111i11.length; i1ili++) {
    lliiI1l = I111i11[i1ili];
    $.ownCookie = I111i11[i1ili];
    if (lliiI1l) {
      $.UserName = decodeURIComponent(lliiI1l.match(/pt_pin=([^; ]+)(?=;?)/) && lliiI1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1ili + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      $.UA = iI1iiIi1.genUA($.UserName);
      await li1iiili();
      if ($.outFlag || $.activityEnd) {
        break;
      }
      await $.wait(il1Iii1);
    }
  }
  if ($.outFlag) {
    let I1lI1i11 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I1lI1i11);
    if ($.isNode()) {
      await ll1iII1.sendNotify("" + $.name, "" + I1lI1i11);
    }
  }
})().catch(iIlIi => $.logErr(iIlIi)).finally(() => $.done());
async function li1iiili() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    i1Ill1l = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) {
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await iil1li11(lliiI1l, lll1liIi);
    if (!$.Token) {
      for (let lIIIiilI = 0; lIIIiilI < 3; lIIIiilI++) {
        if (lllI1IlI) {
          console.log("Token没有成功获取，重试中");
          $.Token = await iil1li11(lliiI1l, lll1liIi);
          $.Token && ($.flag = true);
        }
        if ($.flag) {
          break;
        }
      }
    }
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await lIIlIiil("activity_load");
    if ($.hotFlag) {
      return;
    }
    if ($.MixNick == "") {
      console.log("获取cookie失败");
      return;
    }
    $.toBind = 0;
    $.openLists = [1000003445];
    await lIIlIiil("绑定");
    await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
    await lIIlIiil("completeState");
    for (let lilliil1 = 0; lilliil1 < $.renwulists.length; lilliil1++) {
      $.missionType = $.renwulists[lilliil1].type;
      if (!$.renwulists[lilliil1].isComplete) {
        switch ($.missionType) {
          case "buyHotProducts":
          case "payTrade":
            break;
          case "openCard":
            for (let Ii1i11II = 0; Ii1i11II < $.openLists.length; Ii1i11II++) {
              $.missionType = "openCard";
              $.open = false;
              $.joinVenderId = $.openLists[Ii1i11II];
              await lIIlIiil("kaika");
              await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
              if ($.open == false) {
                $.errorJoinShop = "";
                await ll1Illi1();
                await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
                if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
                  break;
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(parseInt(il1Iii1 * 1 + 500, 10)), await ll1Illi1(), await $.wait(parseInt(il1Iii1 * 1 + 500, 10)));
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("💔 无法开卡,跳过运行");
                  break;
                }
                await lIIlIiil("activity_load");
                await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
              }
            }
            break;
          case "uniteAddCart":
            for (let l1l111i = 0; l1l111i < 1; l1l111i++) {
              $.missionType = "uniteAddCart";
              await lIIlIiil("mission");
              await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
            }
            break;
          case "specialSignGeLi":
            for (let IIilI1i1 = 0; IIilI1i1 < 1; IIilI1i1++) {
              $.missionType = "specialSignGeLi";
              await lIIlIiil("mission");
              await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
            }
            break;
          case "collectShop":
            for (let lll1i1I = 0; lll1i1I < 1; lll1i1I++) {
              $.missionType = "collectShop";
              await lIIlIiil("mission");
              await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
            }
            break;
          case "viewOneHuiChang":
            for (let liIll1l1 = 0; liIll1l1 < 1; liIll1l1++) {
              $.missionType = "viewOneHuiChang";
              await lIIlIiil("mission");
              await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
            }
            break;
          case "viewCommodity":
            for (let li11I1II = 0; li11I1II < 1; li11I1II++) {
              $.missionType = "viewCommodity";
              $.goodsNumId = $.renwulists[lilliil1].linkUrl;
              await lIIlIiil("mission1");
              await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
            }
            break;
          case "shareAct":
            for (let illiil1 = 0; illiil1 < 1; illiil1++) {
              $.missionType = "shareAct";
              await lIIlIiil("绑定");
              await $.wait(parseInt(il1Iii1 * 1 + 500, 10));
            }
            break;
          default:
            await $.wait(1000);
        }
      }
    }
    await lIIlIiil("activity_load");
    console.log("\n当前积分：" + $.remainPoint + "\n");
    await lIIlIiil("unlockLoad");
    for (let IlIl11i = 0; IlIl11i < $.cusUnlockSettings.length; IlIl11i++) {
      $.cusUnlockSettings[IlIl11i].unlockType && ($.unlockId = $.cusUnlockSettings[IlIl11i].id, await lIIlIiil("unlockZone"), await $.wait(3000));
    }
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("后面的号都会助力:" + $.inviteNick));
  } catch (iI11Iiil) {
    console.log(iI11Iiil);
  }
}
async function lIIlIiil(Ii1Illi1) {
  if ($.outFlag) {
    return;
  }
  let IIll1l1I = "https://mpdz-act-dz.isvjcloud.com",
    IIIilIII = "",
    IiIli11l = "POST",
    IliIi11l = "";
  switch (Ii1Illi1) {
    case "activity_load":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      IliIi11l = {
        jdToken: $.Token,
        inviteNick: $.inviteNick || "",
        userId: "10299171"
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/activity/load", IliIi11l);
      break;
    case "mission":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      IliIi11l = {
        missionType: $.missionType,
        inviterNick: $.inviteNick || "",
        shopId: "1000003445"
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/mission/completeMission", IliIi11l);
      break;
    case "mission1":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      IliIi11l = {
        missionType: $.missionType,
        inviterNick: $.inviteNick || "",
        shopId: "1000003445",
        goodsNumId: "" + $.goodsNumId
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/mission/completeMission", IliIi11l);
      break;
    case "绑定":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      IliIi11l = {
        inviterNick: $.inviteNick || ""
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/customer/inviteRelation", IliIi11l);
      break;
    case "kaika":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      IliIi11l = {
        missionType: $.missionType,
        shopId: "1000003445",
        userId: "10299171",
        inviterNick: $.inviteNick || ""
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/mission/completeMission", IliIi11l);
      break;
    case "completeState":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/mission/completeState?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&bizExtString=&user_id=10299171";
      IliIi11l = {};
      IIIilIII = i1iIllll("/jdGeLiKongTiao/mission/completeState", IliIi11l);
      break;
    case "抽奖":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      IliIi11l = {
        dataType: "draw"
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/interactive/drawPost", IliIi11l);
      break;
    case "updateAddress":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/awards/updateAddress?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IliIi11l = {
        receiverName: $.receiver,
        receiverMobile: $.phone,
        receiverProvince: $.province,
        receiverCity: $.city,
        receiverDistrict: $.county,
        receiverAddress: $.address,
        logId: $.actLogId
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/awards/updateAddress", IliIi11l);
      break;
    case "getAwardSettingList":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/awards/getAwardSettingList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      IliIi11l = {
        dataType: "exchange"
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/awards/getAwardSettingList", IliIi11l);
      break;
    case "unlockLoad":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/valueUnlockLoad/unlockLoad?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      IliIi11l = {};
      IIIilIII = i1iIllll("/jdGeLiKongTiao/valueUnlockLoad/unlockLoad", IliIi11l);
      break;
    case "unlockZone":
      url = IIll1l1I + "/dm/front/jdGeLiKongTiao/valueUnlock/unlockZone?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      IliIi11l = {
        unlockId: $.unlockId
      };
      IIIilIII = i1iIllll("/jdGeLiKongTiao/valueUnlock/unlockZone", IliIi11l);
      break;
    default:
      console.log("错误" + Ii1Illi1);
  }
  let Il1I1Ili = l1II1Ii1(url, IIIilIII, IiIli11l);
  IiIli11l === "GET" && (delete Il1I1Ili.body, delete Il1I1Ili["Content-Type"]);
  const I11iIIi1 = llIlIllI;
  let l1llIilI = 0,
    li1llIII = null,
    l1il1Iii = false;
  while (l1llIilI < I11iIIi1) {
    l1llIilI > 0 && (await $.wait(1000));
    const {
      err: I1I11l1i,
      res: i11i1llI,
      data: liIiIliI
    } = await lll1ilIl(Il1I1Ili, IiIli11l);
    if (I1I11l1i) {
      if (typeof I1I11l1i === "string" && I1I11l1i.includes("Timeout awaiting 'request'")) {
        li1llIII = Ii1Illi1 + " 请求超时，请检查网络重试";
      } else {
        const I1iiIiii = i11i1llI?.["statusCode"];
        if (I1iiIiii) {
          if ([403, 493].includes(I1iiIiii)) {
            li1llIII = Ii1Illi1 + " 请求失败，IP被限制（Response code " + I1iiIiii + "）";
            l1il1Iii = true;
          } else {
            [400, 404].includes(I1iiIiii) ? li1llIII = Ii1Illi1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1iiIiii + "）" : li1llIII = Ii1Illi1 + " 请求失败（Response code " + I1iiIiii + "）";
          }
        } else {
          li1llIII = Ii1Illi1 + " 请求失败 => " + (I1I11l1i.message || I1I11l1i);
        }
      }
      l1llIilI++;
    } else {
      const IiIll1 = false;
      if (!["accessLog", "accessLogWithAD"].includes(Ii1Illi1)) {
        try {
          const i1li1liI = JSON.parse(liIiIliI);
          IiIIlIII(Ii1Illi1, i1li1liI);
          break;
        } catch (I11IllIi) {
          li1llIII = "❌ " + Ii1Illi1 + " 接口响应数据解析失败: " + I11IllIi.message;
          console.log("🚫 " + Ii1Illi1 + " => " + String(liIiIliI || "无响应数据"));
          IiIll1 && (console.log("\n---------------------------------------------------\n"), console.log("\n---------------------------------------------------\n"));
          l1llIilI++;
        }
      } else {
        break;
      }
      l1il1Iii = false;
    }
  }
  l1llIilI >= I11iIIi1 && (console.log(li1llIII), l1il1Iii && !hotbreak && ($.outFlag = true));
}
async function lll1ilIl(i1I1illI, lIl11il = "POST") {
  if (lIl11il === "POST") {
    return new Promise(async III1I1lI => {
      $.post(i1I1illI, (illilIl, IlilillI, Iiiii1) => {
        III1I1lI({
          err: illilIl,
          res: IlilillI,
          data: Iiiii1
        });
      });
    });
  } else {
    if (lIl11il === "GET") {
      return new Promise(async ii1ilI11 => {
        $.get(i1I1illI, (IiIII1i1, lIliIi1i, i1l111li) => {
          ii1ilI11({
            err: IiIII1i1,
            res: lIliIi1i,
            data: i1l111li
          });
        });
      });
    } else {
      const liiiIIl1 = "不支持的请求方法";
      return {
        err: liiiIIl1,
        res: null,
        data: null
      };
    }
  }
}
async function IiIIlIII(iIIlIlI1, i1iIIII) {
  try {
    let IIiIli1l = "";
    switch (iIIlIlI1) {
      case "completeState":
        if (typeof i1iIIII == "object") {
          if (i1iIIII.success && i1iIIII.success === true && i1iIIII.data) {
            i1iIIII.data.status && i1iIIII.data.status == 200 && ($.renwulists = i1iIIII.data.data || []);
          } else {
            i1iIIII.message ? console.log("" + (i1iIIII.message || "")) : console.log(data);
          }
        } else {
          console.log(data);
        }
        break;
      case "抽奖":
        if (typeof i1iIIII == "object") {
          if (i1iIIII.success && i1iIIII.success === true && i1iIIII.data) {
            if (i1iIIII.data.status && i1iIIII.data.status == 200) {
              if (i1iIIII.data.data.sendResult) {
                console.log("抽中：" + i1iIIII.data.data.awardSetting.awardName);
                i1iIIII.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = i1iIIII.data.data.awardSendLog.id, console.log("抽中实物啦，奖品领取ID：" + $.actLogId), await lIIlIiil("updateAddress"), await $.wait(4000));
              } else {
                if (!i1iIIII.data.data.result) {
                  console.log("💔 空气");
                } else {
                  console.log(i1iIIII.data.data);
                }
              }
            } else {
              i1iIIII.data.status && i1iIIII.data.status == 500 && console.log("" + (i1iIIII.data.msg || ""));
            }
          } else {
            i1iIIII.message ? console.log("" + (i1iIIII.message || "")) : console.log(data);
          }
        } else {
          console.log(data);
        }
        break;
      case "getAwardSettingList":
        if (typeof i1iIIII == "object") {
          if (i1iIIII.success && i1iIIII.success === true && i1iIIII.data) {
            i1iIIII.data.status && i1iIIII.data.status == 200 && ($.getAwardSettingList = i1iIIII.data.data.awardSettings || []);
          } else {
            i1iIIII.errorMessage ? console.log("" + (i1iIIII.errorMessage || "")) : console.log(data);
          }
        } else {
          console.log(data);
        }
        break;
      case "unlockLoad":
        if (typeof i1iIIII == "object") {
          if (i1iIIII.success && i1iIIII.success === true && i1iIIII.data) {
            i1iIIII.data.status && i1iIIII.data.status == 200 && ($.cusUnlockSettings = i1iIIII.data.data.cusUnlockSettings || []);
          } else {
            if (i1iIIII.errorMessage) {
              console.log("" + (i1iIIII.errorMessage || ""));
            } else {
              console.log(data);
            }
          }
        } else {
          console.log(data);
        }
        break;
      case "unlockZone":
        if (typeof i1iIIII == "object") {
          if (i1iIIII.success && i1iIIII.success === true && i1iIIII.data) {
            if (i1iIIII.data.status && i1iIIII.data.status == 200) {
              console.log("" + (i1iIIII || ""));
            } else {
              i1iIIII.data.status && i1iIIII.data.status == 500 && console.log("" + (i1iIIII.data.msg || ""));
            }
          } else {
            i1iIIII.errorMessage ? console.log("" + (i1iIIII.errorMessage || "")) : console.log(data);
          }
        } else {
          console.log(data);
        }
        break;
      case "exchangePost":
        if (typeof i1iIIII == "object") {
          if (i1iIIII.success && i1iIIII.success === true && i1iIIII.data) {
            if (i1iIIII.data.status && i1iIIII.data.status == 200) {
              if (i1iIIII.data.data.sendResult) {
                console.log("兑换成功，获得：" + i1iIIII.data.data.awardSetting.awardName);
                i1iIIII.data.data.awardSetting.awardType == "goods" && process.env.jd_jinggeng_address && ($.actLogId = i1iIIII.data.data.awardSendLog.id, console.log("兑换实物成功，奖品领取ID：" + $.actLogId), await lIIlIiil("updateAddress"), await $.wait(4000));
              } else {
                !i1iIIII.data.data.result ? console.log("兑换成功，💔 空气 （只能兑换一次）") : console.log(i1iIIII.data.data);
              }
            } else {
              if (i1iIIII.data.status && i1iIIII.data.status == 500) {
                console.log("" + (i1iIIII.data.msg || ""));
              }
            }
          } else {
            i1iIIII.message ? console.log("" + (i1iIIII.message || "")) : console.log(data);
          }
        } else {
          console.log(data);
        }
        break;
      case "updateAddress":
        if (typeof i1iIIII == "object") {
          if (i1iIIII.success && i1iIIII.success === true && i1iIIII.data) {
            if (i1iIIII.data.status && i1iIIII.data.status == 200) {
              i1iIIII.data.data.result ? console.log("地址填写成功，返回：" + i1iIIII.data.data.msg) : console.log(i1iIIII.data.data);
            } else {
              i1iIIII.data.status && i1iIIII.data.status == 500 && console.log("" + (i1iIIII.data.msg || ""));
            }
          } else {
            i1iIIII.message ? console.log("" + (i1iIIII.message || "")) : console.log(data);
          }
        } else {
          console.log(data);
        }
        break;
      case "activity_load":
      case "mission":
      case "mission1":
      case "shopList":
      case "kaika":
      case "绑定":
      case "助力":
        IIiIli1l = "";
        if (typeof i1iIIII == "object") {
          if (i1iIIII.success && i1iIIII.success === true && i1iIIII.data) {
            if (i1iIIII.data.status && i1iIIII.data.status == 200) {
              i1iIIII = i1iIIII.data;
              if (i1iIIII.msg || i1iIIII.data.isOpenCard || i1iIIII.data.remark) {
                console.log("" + (IIiIli1l && IIiIli1l + ":" || "") + (i1iIIII.msg || i1iIIII.data.isOpenCard || i1iIIII.data.remark || ""));
              }
              if (iIIlIlI1 == "activity_load") {
                if (i1iIIII.data) {
                  $.endTime = i1iIIII.data.cusActivity.endTime || 0;
                  $.MixNick = i1iIIII.data.missionCustomer.buyerNick || "";
                  $.remainPoint = i1iIIII.data.missionCustomer.remainPoint || 0;
                  $.remainChance = i1iIIII.data.missionCustomer.remainChance || 0;
                  $.usedPoint = i1iIIII.data.missionCustomer.usedPoint || 0;
                  $.hasCollectShop = i1iIIII.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = i1iIIII.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (iIIlIlI1 == "shopList") {
                  if (i1iIIII.data) {
                    $.openLists = i1iIIII.data;
                  }
                } else {
                  iIIlIlI1 == "mission" && (i1iIIII.data.remark.indexOf("赶紧去开卡吧") > -1 ? $.open = true : $.open = false);
                }
              }
            } else {
              if (i1iIIII.data.msg) {
                i1iIIII.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                i1iIIII.data.msg.indexOf("浏览已达上限") > -1 && ($.vimetims = true);
                console.log("" + (i1iIIII.data.msg || ""));
              } else {
                if (i1iIIII.errorMessage) {
                  i1iIIII.errorMessage.indexOf("火爆") > -1;
                  console.log("" + (i1iIIII.errorMessage || ""));
                } else {
                  console.log("" + data);
                }
              }
            }
          } else {
            i1iIIII.errorMessage ? console.log("" + (i1iIIII.errorMessage || "")) : console.log("" + data);
          }
        } else {
          console.log("" + data);
        }
        break;
      default:
        console.log((IIiIli1l || iIIlIlI1) + "-> " + data);
    }
    if (typeof i1iIIII == "object") {
      if (i1iIIII.errorMessage) {
        i1iIIII.errorMessage.indexOf("火爆") > -1;
      }
    }
  } catch (II1iiiil) {
    console.log(II1iiiil);
  }
}
function l1II1Ii1(lliIliII, iI1iliI1, iIIiIlIi = "POST") {
  let llll1llI = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: lliiI1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (lliIliII.indexOf("https://mpdz-act-dz.isvjcloud.com") > -1) {
    llll1llI.Origin = "https://mpdz-act-dz.isvjcloud.com";
    llll1llI["Content-Type"] = "application/json; charset=utf-8";
    delete llll1llI.Cookie;
  }
  return {
    url: lliIliII,
    method: iIIiIlIi,
    headers: llll1llI,
    body: iI1iliI1,
    timeout: 30000
  };
}
function i1iIllll(l11ilIi1, ii1liill) {
  d = {
    actId: $.actId,
    ...ii1liill,
    method: l11ilIi1,
    userId: $.userId,
    buyerNick: $.MixNick || ""
  };
  sign2 = iIl11Il(d);
  const Ili11l1I = {
    jsonRpc: "2.0",
    params: {
      commonParameter: {
        m: "POST",
        sign: sign2.sign,
        timestamp: sign2.timeStamp,
        userId: $.userId
      },
      admJson: {
        actId: $.actId,
        ...ii1liill,
        method: l11ilIi1,
        userId: $.userId,
        buyerNick: $.MixNick || ""
      }
    }
  };
  if (l11ilIi1.indexOf("missionInviteList") > -1) {
    delete Ili11l1I.params.admJson.actId;
  }
  return $.toStr(Ili11l1I, Ili11l1I);
}
function iIl11Il(ilii11II) {
  AppSecret = "5f3752ed46754c55a57192f960a8b387";
  key = "dd2ebaa5ded5415a9453ef1f37059131";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(ilii11II));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = key + "a" + key + "b" + s2 + "c" + time2 + AppSecret;
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    sign: sign,
    timeStamp: time2
  };
}
function lI11Il(IIIIi1ll) {
  IIIIi1ll = IIIIi1ll || 32;
  let iIi1Iii = "abcdef0123456789",
    lIiil1lI = iIi1Iii.length,
    IIilli = "";
  for (i = 0; i < IIIIi1ll; i++) {
    IIilli += iIi1Iii.charAt(Math.floor(Math.random() * lIiil1lI));
  }
  return IIilli;
}
function li1l1Ii(IlI1IiIl) {
  if (typeof IlI1IiIl == "string") {
    try {
      return JSON.parse(IlI1IiIl);
    } catch (lli1Ii1I) {
      console.log(lli1Ii1I);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function ll1Illi1() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async illII1ii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iilliIiI = "";
    if ($.shopactivityId) {
      iilliIiI = ",\"activityId\":" + $.shopactivityId;
    }
    const iillll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iilliIiI + ",\"channel\":406}",
      ii1liIiI = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(iillll)
      },
      ll11l11 = await I1iii1("27004", ii1liIiI),
      Iii1iII1 = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + iillll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ll11l11),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: lliiI1l
        },
        timeout: 20000
      };
    $.get(Iii1iII1, async (ill1ill, Il1iilll, l111iII1) => {
      try {
        if (ill1ill) {
          console.log(ill1ill);
        } else {
          const i1lIiiIi = JSON.parse(l111iII1);
          if (typeof i1lIiiIi === "object") {
            if (i1lIiiIi.success === true) {
              console.log(i1lIiiIi.message);
              $.errorJoinShop = i1lIiiIi.message;
              if (i1lIiiIi.result && i1lIiiIi.result.giftInfo) {
                for (let I1Ii1II1 of i1lIiiIi.result.giftInfo.giftList) {
                  console.log("入会获得：" + I1Ii1II1.discountString + I1Ii1II1.prizeName + I1Ii1II1.secondLineDesc);
                }
              }
            } else {
              typeof i1lIiiIi == "object" && i1lIiiIi.message ? ($.errorJoinShop = i1lIiiIi.message, console.log("" + (i1lIiiIi.message || ""))) : console.log(l111iII1);
            }
          } else {
            console.log(l111iII1);
          }
        }
      } catch (iilI1ill) {
        $.logErr(iilI1ill, Il1iilll);
      } finally {
        illII1ii();
      }
    });
  });
}
function lIii1liI(ll1IllII) {
  return new Promise(iIi1lIll => {
    const lII1ii1 = {
      url: "" + ll1IllII,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lII1ii1, async (liiI1I1, Ili1iIii, II1l1I1l) => {
      try {
        if (!liiI1I1) {
          II1l1I1l ? II1l1I1l = JSON.parse(II1l1I1l) : console.log("未获取到数据,请重新运行");
        }
      } catch (Ii1IlIl1) {
        $.logErr(Ii1IlIl1, Ili1iIii);
        II1l1I1l = null;
      } finally {
        iIi1lIll(II1l1I1l);
      }
    });
  });
}
function IIIiiI1I(l1I1i1il, llIlIIi) {
  return Math.floor(Math.random() * (llIlIIi - l1I1i1il)) + l1I1i1il;
}
function iiil1lii(II1iili1, i1I1Il) {
  if (i1I1Il === "max") {
    return Math.max.apply(Math, II1iili1);
  } else {
    if (i1I1Il === "min") {
      return Math.min.apply(Math, II1iili1);
    }
  }
}
