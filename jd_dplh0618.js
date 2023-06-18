/*
大牌联合0618期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230618dda/oC20230618dda?actId=1ad318116b34475f8_230618

自行运行，有水无水自测。

变量填写：
黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 
重试次数，默认30
//export retrynum="30"
如需修改抽奖次数请设置环境变量：
//export opencard_draw="3" //次数

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码
============Quantumultx===============
[task_local]
#大牌联合0618期
1 18 18,20 * * jd_dplh0618.js, tag=大牌联合0618期, enabled=true
*/
let opencard_toShop = "false"

const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0618期");
const ll1Iii1I = $.isNode() ? require("./jdCookie.js") : "",
  il11l111 = $.isNode() ? require("./sendNotify") : "";
let IllIlilI = [],
  I1IlllIl = "";
if ($.isNode()) {
  Object.keys(ll1Iii1I).forEach(Il111II1 => {
    IllIlilI.push(ll1Iii1I[Il111II1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IllIlilI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...liIlIiii($.getdata("CookiesJD") || "[]").map(llliIIl => llliIIl.cookie)].filter(il1iII1 => !!il1iII1);
let lI1iIi1l = "30",
  llllii = "0";
lI1iIi1l = $.isNode() ? process.env.retrynum ? process.env.retrynum : lI1iIi1l : $.getdata("retrynum") ? $.getdata("retrynum") : llllii;
llllii = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : llllii : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : llllii;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let ilI1Illl = "",
  liiilllI = "",
  i1l1i1ll = "1ad318116b34475f8_230618";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const Il1Il11I = require("./function/krgetToken"),
  l1li1IiI = require("./function/krh5st");
let IiIl1i1i = "https://jinggengjcq-isv.isvjcloud.com";
liiilllI = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + liiilllI : $.getdata("helpnum") ? $.getdata("helpnum") : "" + liiilllI;
let IilI11i = "",
  IIIII1I = "";
$.whitelist = process.env.DPLHTY_whitelist || IilI11i;
$.blacklist = process.env.DPLHTY_blacklist || IIIII1I;
ili11IIi();
lIiIi1li();
!(async () => {
    authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = liiilllI ? liiilllI : authorCodeList[Ilill11(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + i1l1i1ll);
  console.log("\n💬 默认抽奖次数：" + llllii + " 💬 重试次数：" + lI1iIi1l);
  console.log("\n💬 请在有水的情况下运行");
  if (!IllIlilI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = i1l1i1ll;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let I1Ii1Iil = 0; I1Ii1Iil < IllIlilI.length; I1Ii1Iil++) {
    I1IlllIl = IllIlilI[I1Ii1Iil];
    if (I1IlllIl) {
      $.UserName = decodeURIComponent(I1IlllIl.match(/pt_pin=([^; ]+)(?=;?)/) && I1IlllIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I1Ii1Iil + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await IiI11ili();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await ii1ilI1i();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let il11iiiI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + il11iiiI);
    if ($.isNode()) await il11l111.sendNotify("" + $.name, "" + il11iiiI);
  }
})().catch(Il1ll1lI => $.logErr(Il1ll1lI)).finally(() => $.done());
async function ii1ilI1i() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    ilI1Illl = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await Il1Il11I(I1IlllIl, IiIl1i1i);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await iI1lIlI1("activity_load");
    for (let IiiIIiil = 0; IiiIIiil < lI1iIi1l; IiiIIiil++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iI1lIlI1("activity_load");
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
    await iI1lIlI1("绑定");
    for (let iil1liii = 0; iil1liii < lI1iIi1l; iil1liii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iI1lIlI1("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await iI1lIlI1("shopList");
    for (let li1IlIil = 0; li1IlIil < lI1iIi1l; li1IlIil++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iI1lIlI1("shopList");
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
        await iI1lIlI1("mission");
        for (let ll1lI111 = 0; ll1lI111 < lI1iIi1l; ll1lI111++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iI1lIlI1("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await Ii1i11il();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("😤 呜呜呜，重试开卡");
            await $.wait(1000);
            await Ii1i11il();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iI1lIlI1("activity_load");
          for (let lilliiii = 0; lilliiii < lI1iIi1l; lilliiii++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iI1lIlI1("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iI1lIlI1("shopList");
          for (let IIIliliI = 0; IIIliliI < lI1iIi1l; IIIliliI++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iI1lIlI1("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await iI1lIlI1("mission");
      for (let IliiiIIi = 0; IliiiIIi < lI1iIi1l; IliiiIIi++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iI1lIlI1("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await iI1lIlI1("mission");
      for (let IliliiII = 0; IliliiII < lI1iIi1l; IliliiII++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iI1lIlI1("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (llllii + "" !== "0") {
      $.runFalag = true;
      let li1llIiI = parseInt($.totalPoint / 200);
      llllii = parseInt(llllii, 10);
      if (li1llIiI > llllii) li1llIiI = llllii;
      console.log("💖 抽奖次数为:" + li1llIiI);
      for (m = 1; li1llIiI--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iI1lIlI1("抽奖");
        for (let ll1i1 = 0; ll1i1 < lI1iIi1l; ll1i1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iI1lIlI1("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(li1llIiI) <= 0) break;
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
  } catch (lIl1ii1) {
    console.log(lIl1ii1);
  }
}
async function iI1lIlI1(il1iIiIi) {
  if ($.outFlag) return;
  let l1llII1 = "https://jinggengjcq-isv.isvjcloud.com",
    ii1Ill = "",
    ill1IIll = "POST",
    IilIill1 = "";
  switch (il1iIiIi) {
    case "activity_load":
      url = l1llII1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IilIill1 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) IilIill1 = {
        ...IilIill1,
        "shopId": "" + $.joinVenderId
      };
      ii1Ill = illIlIli("/jdBigAlliance/activity/load", IilIill1);
      break;
    case "shopList":
      url = l1llII1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IilIill1 = {};
      ii1Ill = illIlIli("/jdBigAlliance/shop/shopList", IilIill1);
      break;
    case "绑定":
      url = l1llII1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IilIill1 = {
        "inviterNick": $.inviteNick || ""
      };
      ii1Ill = illIlIli("/jdBigAlliance/customer/inviteRelation", IilIill1);
      break;
    case "mission":
      url = l1llII1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IilIill1 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) IilIill1 = {
        ...IilIill1,
        "shopId": $.joinVenderId
      };
      ii1Ill = illIlIli("/jdBigAlliance/mission/completeMission", IilIill1);
      break;
    case "抽奖":
      url = l1llII1 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IilIill1 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      ii1Ill = illIlIli("/jdBigAlliance/interactive/drawPost", IilIill1);
      break;
    default:
      console.log("错误" + il1iIiIi);
  }
  let lIIl1lIi = l1Il1I1I(url, ii1Ill, ill1IIll);
  return new Promise(async IlI1liii => {
    $.post(lIIl1lIi, (i1ii1ili, l111ll1, iiiI11iI) => {
      try {
        if (i1ii1ili) {
          if (l111ll1 && l111ll1.statusCode && l111ll1.statusCode == 493) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            $.outFlag = true;
          }
          $.retry = true;
        } else Ii1liIll(il1iIiIi, iiiI11iI);
      } catch (ilIIIii1) {
        console.log(ilIIIii1, l111ll1);
      } finally {
        IlI1liii();
      }
    });
  });
}
async function Ii1liIll(IIllill1, II1i1l1) {
  let i1i1Ii1 = "";
  try {
    $.krFlag = true;
    (IIllill1 != "accessLogWithAD" || IIllill1 != "drawContent") && II1i1l1 && (i1i1Ii1 = JSON.parse(II1i1l1));
  } catch (IIi1i1ii) {
    console.log("🤬 " + IIllill1 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let lli1I1il = "";
    switch (IIllill1) {
      case "抽奖":
        if (typeof i1i1Ii1 == "object") {
          if (i1i1Ii1.success && i1i1Ii1.success === true && i1i1Ii1.data) {
            if (i1i1Ii1.data.status && i1i1Ii1.data.status == 200) {
              if (i1i1Ii1.data.data.sendResult) console.log("抽中：" + i1i1Ii1.data.data.awardSetting.awardName);else !i1i1Ii1.data.data.result ? console.log("空气") : console.log(i1i1Ii1.data.data);
            } else i1i1Ii1.data.status && i1i1Ii1.data.status == 500 && console.log("" + (i1i1Ii1.data.msg || ""));
          } else i1i1Ii1.message ? console.log("" + (i1i1Ii1.message || "")) : console.log(II1i1l1);
        } else console.log(II1i1l1);
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
        lli1I1il = "";
        if (IIllill1 == "followShop") lli1I1il = "关注";
        if (IIllill1 == "addCart") lli1I1il = "加购";
        if (typeof i1i1Ii1 == "object") {
          if (i1i1Ii1.success && i1i1Ii1.success === true && i1i1Ii1.data) {
            if (i1i1Ii1.data.status && i1i1Ii1.data.status == 200) {
              i1i1Ii1 = i1i1Ii1.data;
              if (IIllill1 != "setMixNick" && (i1i1Ii1.msg || i1i1Ii1.data.isOpenCard || i1i1Ii1.data.remark)) console.log("🔊 " + (lli1I1il && lli1I1il + ":" || "") + (i1i1Ii1.msg || i1i1Ii1.data.isOpenCard || i1i1Ii1.data.remark || ""));
              if (IIllill1 == "activity_load") {
                if (i1i1Ii1.msg || i1i1Ii1.data.isOpenCard) {
                  if ((i1i1Ii1.msg || i1i1Ii1.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (i1i1Ii1.data) {
                  $.endTime = i1i1Ii1.data.cusActivity.endTime || 0;
                  $.MixNick = i1i1Ii1.data.missionCustomer.buyerNick || "";
                  $.usedChance = i1i1Ii1.data.missionCustomer.usedChance || 0;
                  $.totalPoint = i1i1Ii1.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = i1i1Ii1.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = i1i1Ii1.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IIllill1 == "shopList") $.openList = i1i1Ii1.data || [];else {
                  if (IIllill1 == "mission") i1i1Ii1.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (IIllill1 == "uniteOpenCardOne") {
                      $.uniteOpenCar = i1i1Ii1.msg || i1i1Ii1.data.msg || "";
                    } else {
                      if (IIllill1 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let l11iiil = 0;
                        for (let IIilillI in i1i1Ii1.data.list || []) {
                          let l1iiiIlI = i1i1Ii1.data.list[IIilillI];
                          l11iiil += Number(l1iiiIlI.awardDes);
                        }
                        if (l11iiil > 0) console.log("🔊 共获得" + l11iiil + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IIllill1 == "missionInviteList" && console.log("🔊 邀请人数(" + i1i1Ii1.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (i1i1Ii1.data.msg) {
                i1i1Ii1.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (i1i1Ii1.data.msg || ""));
              } else {
                if (i1i1Ii1.errorMessage) {
                  if (i1i1Ii1.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (i1i1Ii1.errorMessage || ""));
                } else console.log("" + II1i1l1);
              }
            }
          } else i1i1Ii1.errorMessage ? console.log("🔊 " + (i1i1Ii1.errorMessage || "")) : console.log("" + II1i1l1);
        } else {}
        break;
      default:
        console.log((lli1I1il || IIllill1) + "-> " + II1i1l1);
    }
    if (typeof i1i1Ii1 == "object") {
      if (i1i1Ii1.errorMessage) {
        if (i1i1Ii1.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (iI11l1Il) {}
}
function l1Il1I1I(IiIil1, II1illii, iII1i1li = "POST") {
  let i1l1iil1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": I1IlllIl,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IiIil1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (i1l1iil1.Origin = "https://jinggengjcq-isv.isvjcloud.com", i1l1iil1["Content-Type"] = "application/json; charset=utf-8", delete i1l1iil1.Cookie), {
    "url": IiIil1,
    "method": iII1i1li,
    "headers": i1l1iil1,
    "body": II1illii,
    "timeout": 30 * 1000
  };
}
function illIlIli(l11ll1li, iIll11i) {
  d = {
    "actId": $.actId,
    ...iIll11i,
    "method": l11ll1li,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = i1lil1lI(d);
  const lIIil11l = {
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
        ...iIll11i,
        "method": l11ll1li,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return l11ll1li.indexOf("missionInviteList") > -1 && delete lIIil11l.params.admJson.actId, $.toStr(lIIil11l, lIIil11l);
}
function Ilill11(l1li1iIl, l1lIIil) {
  return Math.floor(Math.random() * (l1lIIil - l1li1iIl)) + l1li1iIl;
}
function i1lil1lI(Ill1i1) {
  AppSecret = "3155f04d929343f7b23a0e3c6e6a7114";
  key = "db6857ae7f86";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(Ill1i1));
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
async function IiI11ili() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const lii1ili1 = CryptoJS.enc.Utf8.parse(id),
    Ii1I1lll = CryptoJS.enc.Base64.stringify(lii1ili1);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": Ii1I1lll,
      "od": "",
      "ov": "Ctq=",
      "ud": Ii1I1lll
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function III1i1l1(llillI) {
  llillI = llillI || 32;
  let IiIll1ii = "abcdef0123456789",
    liII1ilI = IiIll1ii.length,
    iIIIII1I = "";
  for (i = 0; i < llillI; i++) iIIIII1I += IiIll1ii.charAt(Math.floor(Math.random() * liII1ilI));
  return iIIIII1I;
}
function liIlIiii(I1iiiilI) {
  if (typeof I1iiiilI == "string") {
    try {
      return JSON.parse(I1iiiilI);
    } catch (iIllIllI) {
      return console.log(iIllIllI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function Ii1i11il() {
  if (!$.joinVenderId) return;
  return new Promise(async lliiIlII => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i11ilI11 = "";
    if ($.shopactivityId) i11ilI11 = ",\"activityId\":" + $.shopactivityId;
    const iIli1l1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i11ilI11 + ",\"channel\":406}",
      iIIil1i1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIli1l1i)
      };
    for (var ii1iIi11 = "", illilll1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", Iliii1I = 0; Iliii1I < 16; Iliii1I++) {
      var llI11Ill = Math.round(Math.random() * (illilll1.length - 1));
      ii1iIi11 += illilll1.substring(llI11Ill, llI11Ill + 1);
    }
    uuid = Buffer.from(ii1iIi11, "utf8").toString("base64");
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
    const iiiI1111 = await l1li1IiI("8adfb", iIIil1i1),
      Ii1iIIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iIli1l1i + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiiI1111),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": I1IlllIl,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii1iIIi, async (lIIliiIl, lllIiIli, iII111lI) => {
      try {
        if (lIIliiIl) lllIiIli && typeof lllIiIli.statusCode != "undefined" && lllIiIli.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iII111lI = iII111lI && iII111lI.match(/jsonp_.*?\((.*?)\);/) && iII111lI.match(/jsonp_.*?\((.*?)\);/)[1] || iII111lI;
          let li111ili = $.toObj(iII111lI, iII111lI);
          if (li111ili && typeof li111ili == "object") {
            if (li111ili && li111ili.success === true) {
              console.log(" >> " + li111ili.message);
              $.errorJoinShop = li111ili.message;
              if (li111ili.result && li111ili.result.giftInfo) {
                for (let Il1l1iil of li111ili.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + Il1l1iil.discountString + Il1l1iil.prizeName + Il1l1iil.secondLineDesc);
                }
              }
            } else li111ili && typeof li111ili == "object" && li111ili.message ? ($.errorJoinShop = li111ili.message, console.log("" + (li111ili.message || ""))) : console.log(iII111lI);
          } else console.log(iII111lI);
        }
      } catch (iI1li1ll) {
        $.logErr(iI1li1ll, lllIiIli);
      } finally {
        lliiIlII();
      }
    });
  });
}
async function l1IIIiii() {
  return new Promise(async iI11Iill => {
    const I1lllilI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iiIlllI1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1lllilI)
      };
    await $.wait(1000);
    const IIiIIll = await l1li1IiI("8adfb", iiIlllI1),
      IlIiilll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I1lllilI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIiIIll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": I1IlllIl,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IlIiilll, async (iI1lii, I11iliIi, l1i1iii) => {
      try {
        if (iI1lii) I11iliIi && typeof I11iliIi.statusCode != "undefined" && I11iliIi.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          l1i1iii = l1i1iii && l1i1iii.match(/jsonp_.*?\((.*?)\);/) && l1i1iii.match(/jsonp_.*?\((.*?)\);/)[1] || l1i1iii;
          let i1llIiii = $.toObj(l1i1iii, l1i1iii);
          i1llIiii && typeof i1llIiii == "object" ? i1llIiii && i1llIiii.success == true && (console.log("去加入：" + (i1llIiii.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1llIiii.result.interestsRuleList && i1llIiii.result.interestsRuleList[0] && i1llIiii.result.interestsRuleList[0].interestsInfo && i1llIiii.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(l1i1iii);
        }
      } catch (i1iiiIl1) {
        $.logErr(i1iiiIl1, I11iliIi);
      } finally {
        iI11Iill();
      }
    });
  });
}
function iIilIiI1(iI1I1IIl) {
  return new Promise(Il1llll => {
    const lllli1ll = {
      "url": iI1I1IIl + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lllli1ll, async (llllI1ll, IiiI1iiI, iIIIIi1l) => {
      try {
        if (llllI1ll) $.getAuthorCodeListerr = false;else {
          if (iIIIIi1l) iIIIIi1l = JSON.parse(iIIIIi1l);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1i1Ii1I) {
        $.logErr(l1i1Ii1I, IiiI1iiI);
        iIIIIi1l = null;
      } finally {
        Il1llll(iIIIIi1l);
      }
    });
  });
}
function Ilill11(li1IiI1i, IlIIIllI) {
  return Math.floor(Math.random() * (IlIIIllI - li1IiI1i)) + li1IiI1i;
}
function lIiIi1li() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lIillI1 = Array.from(new Set($.blacklist.split("&")));
  console.log(lIillI1.join("&") + "\n");
  let iIII11Il = lIillI1,
    i1iill1 = [],
    lll1Ili1 = false;
  for (let liilili1 = 0; liilili1 < IllIlilI.length; liilili1++) {
    let liIi1Il1 = decodeURIComponent(IllIlilI[liilili1].match(/pt_pin=([^; ]+)(?=;?)/) && IllIlilI[liilili1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!liIi1Il1) break;
    let Ilill1I = false;
    for (let iII1iiiI of iIII11Il) {
      if (iII1iiiI && iII1iiiI == liIi1Il1) {
        Ilill1I = true;
        break;
      }
    }
    !Ilill1I && (lll1Ili1 = true, i1iill1.splice(liilili1, -1, IllIlilI[liilili1]));
  }
  if (lll1Ili1) IllIlilI = i1iill1;
}
function ll1i1ilI(lIiIl1II, llllill) {
  llllill != 0 && lIiIl1II.unshift(lIiIl1II.splice(llllill, 1)[0]);
}
function ili11IIi() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IllIlilI, IllIlilI));
    return;
  }
  console.log("当前已设置白名单：");
  const iii1l1Il = Array.from(new Set($.whitelist.split("&")));
  console.log(iii1l1Il.join("&") + "\n");
  let il1lIlII = [],
    ll11lI1I = iii1l1Il;
  for (let llIII1II in IllIlilI) {
    let Ii1I111i = decodeURIComponent(IllIlilI[llIII1II].match(/pt_pin=([^; ]+)(?=;?)/) && IllIlilI[llIII1II].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    ll11lI1I.includes(Ii1I111i) && il1lIlII.push(IllIlilI[llIII1II]);
  }
  helpCookiesArr = il1lIlII;
  if (ll11lI1I.length > 1) for (let ii1ilii1 in ll11lI1I) {
    let lii1i1ll = ll11lI1I[ll11lI1I.length - 1 - ii1ilii1];
    if (!lii1i1ll) continue;
    for (let lliIIIil in helpCookiesArr) {
      let iiIi1Ii = decodeURIComponent(helpCookiesArr[lliIIIil].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lliIIIil].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lii1i1ll == iiIi1Ii && ll1i1ilI(helpCookiesArr, lliIIIil);
    }
  }
}