/**

活动名称：分享有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10043>&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
支持activityType ：(10043)
环境变量：
jd_lzkj_loreal_share_url // 活动链接
jd_lzkj_loreal_share_helpnum // 账号数  默认助力前3账号，需要助力其他请自行设置变量

请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#lzkj_loreal分享有礼
1 1 1 1 * jd_lzkj_loreal_share.js, tag=lzkj_loreal分享有礼, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("分享有礼（lzkj_loreal）");
const iiii1 = $.isNode() ? require("./sendNotify") : "",
  l1li1I = $.isNode() ? require("./jdCookie.js") : "",
  iIlli1 = require("./function/krgetToken"),
  I1IIIl = require("./function/krh5st"),
  il1IlI = require("./function/krgetua");
let I1IIIi = {},
  lI11 = process.env.jd_lzkj_loreal_share_url,
  li11I1 = 3;
process.env.jd_lzkj_loreal_share_helpnum && process.env.jd_lzkj_loreal_share_helpnum != "" && (li11I1 = process.env.jd_lzkj_loreal_share_helpnum);
let i1I111 = [],
  l1li11 = [],
  il1Il1 = [],
  li11II = true,
  Ii1li = null,
  iIiIli = "";
$.activityEnd = false;
let i1I11I = [],
  Ii1lli = "",
  Ii1lll = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_share_url) lI11 = process.env.jd_lzkj_loreal_share_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(l1li1I).forEach(iIlii => {
    i1I11I.push(l1li1I[iIlii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1I11I = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lI1I => lI1I.cookie)].filter(I1Ii => !!I1Ii);
let I1I1 = typeof $request !== "undefined";
I1I1 && (GetCookie(), $.done());
if (lI11) {
  Ii1li = liII1I("" + lI11, "activityId");
  activityType = liII1I("" + lI11, "activityType");
  templateId = liII1I("" + lI11, "templateId");
  if (lI11.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else lI11.includes("lzkj") ? wxActType = lI11.match(/\/(prod\/cc\/interact\w*)\//)[1] : console.log("暂不支持的类型");
  $.domain = lI11.match(/https?:\/\/([^/]+)/)[1];
}
let Ii1lI = "https://" + $.domain;
!(async () => {
  if (Ii1li == null) {
    console.log("活动id不存在");
    return;
  }
  console.log("活动入口:" + lI11);
  if (!i1I11I[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  process.env.jd_lzkj_loreal_address ? UserAdd_Data_Arr = process.env.jd_lzkj_loreal_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let I1IIi = [];
    I1IIi = UserAdd_Data_Arr.split("|");
    var il1Ill = Math.floor(Math.random() * I1IIi.length);
    if (I1IIi[il1Ill] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else I1IIi = I1IIi[il1Ill];
    if (process.env.jd_lzkj_loreal_address) {
      I1IIi = I1IIi.split("@");
      if (I1IIi.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let iiii1I = 0; iiii1I < 6; iiii1I++) {
        if (I1IIi[iiii1I] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      I1IIi = I1IIi.split("@");
      if (I1IIi.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let l1II1l = 0; l1II1l < 7; l1II1l++) {
        if (I1IIi[l1II1l] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = I1IIi[0];
    $.phone = I1IIi[1];
    $.province = I1IIi[2];
    $.city = I1IIi[3];
    $.county = I1IIi[4];
    $.address = I1IIi[5];
  }
  console.log("\n开始收集助力码中...");
  li11II = true;
  $.maxShareTimes = 0;
  $.prizeNameout = false;
  for (let i1IIlI = 0; i1IIlI < li11I1; i1IIlI++) {
    if (i1I11I[i1IIlI]) {
      Ii1lli = i1I11I[i1IIlI];
      originCookie = i1I11I[i1IIlI];
      $.UserName = decodeURIComponent(Ii1lli.match(/pt_pin=(.+?);/) && Ii1lli.match(/pt_pin=(.+?);/)[1]);
      $.index = i1IIlI + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await iiii1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = await il1IlI($.UserName);
      $.token = "";
      $.OpenCard = false;
      $.authorCode = "";
      $.token = await iIlli1(Ii1lli, Ii1lI);
      if ($.token == "") {
        console.log("获取[token]失败！");
        return;
      }
      if ($.token) {
        await iIiIii("api/user-info/login", {
          "status": "1",
          "activityId": Ii1li,
          "tokenPin": $.token,
          "source": "01",
          "shareUserId": ""
        });
        if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
        await $.wait(300);
        await lI1i();
        await iIiIii("api/user-info/login", {
          "status": "1",
          "activityId": Ii1li,
          "tokenPin": $.token,
          "source": "01",
          "shareUserId": ""
        });
        await $.wait(300);
        await i11();
        if ($.hasEnd || $.activityEnd || $.outFlag) return;
        await liII1l();
        await $.wait(300);
        if ($.index == 1) {
          $.prizeList = "";
          let ll1l11 = false;
          for (let iIl1I1 = 0; iIl1I1 < $.prizeInfo.length; iIl1I1++) {
            let il1lI1 = false;
            $.prizeName = $.prizeInfo[iIl1I1].prizeName;
            $.leftNum = $.prizeInfo[iIl1I1].leftNum;
            $.leftNum <= 0 ? $.prizeNum = "(已发完)" : $.prizeNum = "";
            $.prizeType = $.prizeInfo[iIl1I1].prizeType;
            $.position = $.shareSuccessTimesList[iIl1I1].successTimes || 9999;
            let i111li = $.shareSuccessTimesList[iIl1I1].prizeInfoId || "",
              lIlIiI = $.shareSuccessTimesList[iIl1I1].status || 0;
            switch ($.prizeType) {
              case 1:
                $.prizeType = "[京豆]";
                break;
              case 2:
                $.prizeType = "[优惠券]";
                break;
              case 3:
                $.prizeType = "[实物]";
                break;
              case 4:
                $.prizeType = "[积分]";
                break;
              case 5:
                $.prizeType = "[专享价]";
                break;
              case 6:
                $.prizeType = "[红包]";
                break;
              case 7:
                $.prizeType = "[礼品卡]";
                break;
              case 8:
                $.prizeType = "[E卡]";
                break;
              case 9:
                $.prizeType = "[PLUS会员]";
                break;
              case 10:
                $.prizeType = "[爱奇艺会员]";
                break;
              case 11:
                $.prizeType = "[积分]";
                break;
              default:
                console.log("未成功获取数据");
                return;
            }
            iIl1I1 != $.prizeInfo.length - 1 ? $.prizeList += $.position + "人--" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)" + $.prizeNum + "\n" : $.prizeList += $.position + "人--" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)" + $.prizeNum + "\n";
            lIlIiI != 4 && ($.prizeName.includes("券") && (ll1l11 = true, il1lI1 = true), !il1lI1 && $.position <= i1I11I.length && (l1li11.push(i111li), il1Il1.push($.position)), $.position > $.maxShareTimes && !il1lI1 && $.position <= i1I11I.length && ($.maxShareTimes = $.position));
            lIlIiI == 3 && ($.prizeNameout = true);
          }
          console.log("店铺名称：" + $.shopName + "\n活动名称: " + $.actName + "\n活动奖品：\n" + $.prizeList);
          if (ll1l11 && $.maxShareTimes == 0) {
            console.log("\n奖品全是优惠券，不跑了~");
            return;
          } else {
            if ($.maxShareTimes == 0) {
              console.log("\n奖品已经全部发完了，下次早点来哟~");
              return;
            }
          }
        }
        await i1I11i();
        await lI1l();
        console.log("\n当前已助力人数：" + $.num + " 人\n");
        for (let Ilii = 0; Ilii < il1Il1.length; Ilii++) {
          $.num >= il1Il1[Ilii] + 1 && (process.stdout.write("【" + $.prizeInfo[Ilii].prizeName + "】 "), await Ii1llI(l1li11[Ilii]));
        }
        if ($.activityEnd || $.outFlag) return;
      }
    }
  }
  if ($.prizeNameout) {
    console.log("\n奖品全部都领取了，结束运行~");
    return;
  }
  if (!i1I111.length) {
    console.log("\n没有获取到助力码...");
    return;
  }
  console.log("\n收集助力码完成,即将进行助力...");
  li11II = false;
  $.shareTimes = 0;
  for (let Ilil = 0; Ilil < i1I11I.length; Ilil++) {
    if (i1I11I[Ilil]) {
      Ii1lli = i1I11I[Ilil];
      originCookie = i1I11I[Ilil];
      $.UserName = decodeURIComponent(Ii1lli.match(/pt_pin=(.+?);/) && Ii1lli.match(/pt_pin=(.+?);/)[1]);
      $.index = Ilil + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await iiii1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = await il1IlI($.UserName);
      $.token = "";
      $.OpenCard = false;
      $.token = await iIlli1(Ii1lli, Ii1lI);
      if ($.token) {
        await iIiIii("api/user-info/login", {
          "status": "1",
          "activityId": Ii1li,
          "tokenPin": $.token,
          "source": "01",
          "shareUserId": ""
        });
        if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
        $.maxShareTimes > 5 ? await $.wait(500) : await $.wait(200);
        $.helpResult = false;
        for (let iiliIl = 0; iiliIl < i1I111.length; iiliIl++) {
          $.authorCode = i1I111[iiliIl];
          for (let IiIl1I = 0; IiIl1I < 1; IiIl1I++) {
            await i11();
            $.maxShareTimes > 5 ? await $.wait(500) : await $.wait(200);
            if ($.helpResult) {
              console.log("已助力 ➜ " + $.authorCode);
              break;
            }
          }
        }
        if ($.helpResult) $.shareTimes += 1;
        for (let ii11l1 = 0; ii11l1 < il1Il1.length; ii11l1++) {
          if ($.shareTimes == il1Il1[ii11l1] + 1) await iIiIlI(l1li11[ii11l1]);else continue;
        }
        if ($.shareTimes >= $.maxShareTimes + 1) break;
        if ($.activityEnd || $.outFlag) return;
      } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
    }
  }
})().catch(i111lI => {
  $.log("", " " + $.name + ", 失败! 原因: " + i111lI + "!", "");
}).finally(() => {
  $.done();
});
async function iIiIlI(ii11lI) {
  console.log("\n✅ 助力已达标，开始领取奖品");
  lII1i1: for (let lIl11l = 0; lIl11l < li11I1; lIl11l++) {
    if (i1I11I[lIl11l]) {
      Ii1lli = i1I11I[lIl11l];
      originCookie = i1I11I[lIl11l];
      $.UserName = decodeURIComponent(Ii1lli.match(/pt_pin=(.+?);/) && Ii1lli.match(/pt_pin=(.+?);/)[1]);
      $.index = lIl11l + 1;
      $.isLogin = true;
      $.nickName = "";
      $.authorCode = "";
      $.token = "";
      $.OpenCard = false;
      $.authorCode = "";
      $.token = await iIlli1(Ii1lli, Ii1lI);
      if ($.token) {
        await iIiIii("api/user-info/login", {
          "status": "1",
          "activityId": Ii1li,
          "tokenPin": $.token,
          "source": "01",
          "shareUserId": ""
        });
        if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
        await $.wait(300);
        await i11();
        for (let iiii1i = 0; iiii1i < $.shareSuccessTimesList.length; iiii1i++) {
          if ($.shareSuccessTimesList[iiii1i].prizeInfoId != ii11lI) continue;
          process.stdout.write("【" + $.UserName + "】");
          if ($.shareSuccessTimesList[iiii1i].status == 1) {
            await Ii1llI(ii11lI);
            await $.wait(500);
          } else {
            if ($.shareSuccessTimesList[iiii1i].status == 3) console.log("已经领过了，不要太贪心哦~");else {
              if ($.shareSuccessTimesList[iiii1i].status == 4) {
                console.log("很遗憾，奖品 " + $.shareSuccessTimesList[iiii1i].name + " 已经发完了，下次早点来吧~");
                break lII1i1;
              } else {
                if ($.shareSuccessTimesList[iiii1i].status == 5) console.log("未中奖");else break;
              }
            }
          }
        }
      } else {
        $.log("没有成功获取到用户信息，跳过领取奖品");
      }
    }
  }
}
function liII1i(iIilIi) {
  let iIilIl = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(iIilIi)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": Ii1lli,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(lI11),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(i111il => {
    $.get(iIilIl, (lIlI1, lIllI1, Ill1) => {
      try {
        lIlI1 ? lIlI1 === "Response code 403 (Forbidden)" && ($.err = true, console.log(lIlI1)) : (res = JSON.parse(Ill1), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (iI1II) {
        console.log(iI1II);
      } finally {
        i111il();
      }
    });
  });
}
function iIiIil() {
  return new Promise(IIilIl => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + Ii1lll);
    IIilIl();
  });
}
function iIiIii(IIilIi, l1Iiii) {
  return new Promise(iI1i1 => {
    $.post(I1III1(IIilIi, l1Iiii), async (iiIIiI, i1liII, ilII1i) => {
      try {
        if (iiIIiI) {
          console.log("" + JSON.stringify(iiIIiI));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          ilII1i = JSON.parse(ilII1i);
          if (ilII1i && ilII1i.data) {
            $.tokens = ilII1i.data.token;
            $.customerId = ilII1i.data.customerId;
            $.joinVenderId = ilII1i.data.joinInfo.shopId;
            $.openCardUrl = ilII1i.data.joinInfo.openCardUrl;
            $.shopName = ilII1i.data.shopName;
            $.actName = ilII1i.data.actName;
            $.openCardUrl && ($.joinVenderId = ilII1i.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = ilII1i.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await IIlIlI();
              for (let ilII1l = 0; ilII1l < Array(2).length; ilII1l++) {
                if (ilII1l > 0) console.log("第" + ilII1l + "次 重新开卡");
                await Ii1ll1();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(ilII1i);
          i1liII.status == 200 && iIll1(i1liII);
        }
      } catch (l1Iil1) {
        $.logErr(l1Iil1, i1liII);
      } finally {
        iI1i1();
      }
    });
  });
}
function lI1i() {
  return new Promise(lIlIii => {
    let I11lil = {};
    $.post(I1III1("api/task/followShop/follow", I11lil), async (l1Iill, iiiiIi, iiiiIl) => {
      try {
        if (l1Iill) {
          console.log("" + JSON.stringify(l1Iill));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          iiiiIl = JSON.parse(iiiiIl);
          if (iiiiIl && iiiiIl.resp_code == 0) {} else {
            console.log(iiiiIl.resp_msg);
            for (let IIi11i of ["未开始", "结束", "不存在", "不在"]) {
              if (iiiiIl.resp_msg.includes(IIi11i)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          iiiiIi.status == 200 && iIll1(iiiiIi);
        }
      } catch (lIIII) {
        $.logErr(lIIII, iiiiIi);
      } finally {
        lIlIii();
      }
    });
  });
}
function i11() {
  return new Promise(I1li1i => {
    let Ii11II = {
      "shareUserId": $.authorCode
    };
    $.post(I1III1("api/task/sharePolitely/activity", Ii11II), async (lIII, iI11, liIii1) => {
      try {
        if (lIII) {
          console.log("" + JSON.stringify(lIII));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          liIii1 = JSON.parse(liIii1);
          if (liIii1 && liIii1.resp_code == 0) {
            $.activitystatus = liIii1?.["data"]?.["status"] || 0;
            $.shareSuccessTimesList = liIii1?.["data"]?.["shareSuccessTimesList"] || [];
            $.activitystatus == 0 ? $.helpResult = true : console.log("没有助力次数或已助力过或已经助力其他人");
          } else {
            console.log(liIii1.resp_msg);
            for (let lIl11 of ["未开始", "结束", "不存在", "不在"]) {
              if (liIii1.resp_msg.includes(lIl11)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          iI11.status == 200 && iIll1(iI11);
        }
      } catch (iIlIil) {
        $.logErr(iIlIil, iI11);
      } finally {
        I1li1i();
      }
    });
  });
}
function Ii1llI(Il1l1i) {
  return new Promise(lIl1I1 => {
    let iIl = {
      "prizeInfoId": Il1l1i
    };
    $.post(I1III1("api/prize/receive/acquire", iIl), async (lIIi, l11Ili, iiill) => {
      try {
        if (lIIi) {
          console.log("" + JSON.stringify(lIIi));
          console.log($.name + " acquire API请求失败，请检查网路重试");
        } else {
          iiill = JSON.parse(iiill);
          if (iiill && iiill.resp_code == 0) {
            if (iiill.data === "") console.log("💨  空气");else {
              if (iiill.data === "1") console.log("积分不足，无法抽奖");else {
                drawInfo = iiill.data;
                if (drawInfo) switch (drawInfo.prizeType) {
                  case 1:
                    console.log("🎉 " + drawInfo.prizeName + " 🐶");
                    break;
                  case 3:
                    generateId = iiill.data.prizeInfoId;
                    prizeName = drawInfo.prizeName;
                    addressId = drawInfo.addressId;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    process.env.jd_lzkj_loreal_address && (await i1I11l(addressId), await $.wait(4000));
                    break;
                  case 4:
                  case 11:
                    console.log("🎉 " + drawInfo.prizeName + " 🎟️");
                    break;
                  case 2:
                    console.log("🎉 " + drawInfo.prizeName + " 优惠券");
                    break;
                  case 8:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  default:
                    console.log(iiill.data);
                    break;
                }
              }
            }
          } else {
            if (iiill && iiill.resp_code == 60002) console.log(iiill.resp_msg);else {
              console.log(iiill);
              for (let l11iI of ["未开始", "结束", "不存在", "不在"]) {
                if (iiill.resp_msg.includes(l11iI)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          if (l11Ili.status == 200) {
            iIll1(l11Ili);
          }
        }
      } catch (lli1li) {
        $.logErr(lli1li, l11Ili);
      } finally {
        lIl1I1();
      }
    });
  });
}
function i1I11i() {
  return new Promise(liIil1 => {
    let IIiIi1 = {};
    $.post(I1III1("api/task/share/getUserId", IIiIi1), async (I1i1, iiiii, iiiil) => {
      try {
        if (I1i1) {
          console.log("" + JSON.stringify(I1i1));
          console.log($.name + " getUserId API请求失败，请检查网路重试");
        } else {
          iiiil = JSON.parse(iiiil);
          if (iiiil && iiiil.resp_code == 0) {
            li11II && ($.shareUserId = iiiil?.["data"]?.["shareUserId"] || "", console.log("助力码：" + $.shareUserId), i1I111.push($.shareUserId));
            $.helpResult = true;
          } else {
            console.log(iiiil.resp_msg);
            for (let il11II of ["未开始", "结束", "不存在", "不在"]) {
              if (iiiil.resp_msg.includes(il11II)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          iiiii.status == 200 && iIll1(iiiii);
        }
      } catch (I1II1i) {
        $.logErr(I1II1i, iiiii);
      } finally {
        liIil1();
      }
    });
  });
}
function lI1l() {
  return new Promise(iiIlIi => {
    let iIlIll = {};
    $.post(I1III1("api/task/share/friends", iIlIll), async (i11llI, iIIi1, iIiIIl) => {
      try {
        if (i11llI) {
          console.log("" + JSON.stringify(i11llI));
          console.log($.name + " friends API请求失败，请检查网路重试");
        } else {
          iIiIIl = JSON.parse(iIiIIl);
          if (iIiIIl && iIiIIl.data) {
            $.num = iIiIIl?.["data"]?.["num"] || 0;
            $.friends = iIiIIl?.["data"]?.["friends"] || [];
          } else {
            console.log(iIiIIl.resp_msg);
            for (let iIiIIi of ["未开始", "结束", "不存在", "不在"]) {
              if (iIiIIl.resp_msg.includes(iIiIIi)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          iIIi1.status == 200 && iIll1(iIIi1);
        }
      } catch (IlIili) {
        $.logErr(IlIili, iIIi1);
      } finally {
        iiIlIi();
      }
    });
  });
}
function li11Il() {
  return new Promise(iiI1II => {
    let lIiii1 = {};
    $.post(I1III1("api/task/daySign/getSignClick", lIiii1), async (I1Iili, ilIIII, I1li) => {
      try {
        if (I1Iili) {
          console.log("" + JSON.stringify(I1Iili));
          console.log($.name + " getSignClick API请求失败，请检查网路重试");
        } else {
          I1li = JSON.parse(I1li);
          if (I1li && I1li.resp_code == 0) {
            if (!I1li.data) {
              console.log("💨  空气");
            } else {
              drawInfo = I1li.data;
              if (drawInfo) {
                switch (drawInfo.prizeType) {
                  case 1:
                    console.log("🎉 " + drawInfo.prizeName + " 🐶");
                    break;
                  case 3:
                    generateId = I1li.data.prizeInfoId;
                    prizeName = drawInfo.prizeName;
                    addressId = drawInfo.addressId;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    process.env.jd_lzkj_loreal_address && (await i1I11l(addressId), await $.wait(4000));
                    break;
                  case 4:
                  case 11:
                    console.log("🎉 " + drawInfo.prizeName + " 🎟️");
                    break;
                  case 2:
                    console.log("🎉 " + drawInfo.prizeName + " 优惠券");
                    break;
                  case 8:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  default:
                    console.log(I1li.data);
                    break;
                }
              }
            }
          } else {
            console.log(I1li.resp_msg);
            for (let iilI1i of ["未开始", "结束", "不存在", "不在"]) {
              if (I1li.resp_msg.includes(iilI1i)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          ilIIII.status == 200 && iIll1(ilIIII);
        }
      } catch (I1IilI) {
        $.logErr(I1IilI, ilIIII);
      } finally {
        iiI1II();
      }
    });
  });
}
function i1I11l(lli1I) {
  return new Promise(iI1i1I => {
    let IiI11i = {
      "realName": $.receiver,
      "mobile": $.phone,
      "address": $.address,
      "orderCode": lli1I,
      "province": $.province,
      "city": $.city,
      "county": $.county
    };
    $.post(I1III1("api/my/prize/update", IiI11i), async (iI1i1l, IiI11I, ll1ili) => {
      try {
        if (iI1i1l) {
          console.log("" + JSON.stringify(iI1i1l));
          console.log($.name + " update API请求失败，请检查网路重试");
        } else {
          ll1ili = JSON.parse(ll1ili);
          if (ll1ili && ll1ili.resp_code == 0) console.log("地址填写成功");else {
            if (ll1ili && ll1ili.resp_code == 50013 || ll1ili.resp_code == 50012) {} else {
              if (ll1ili && ll1ili.resp_code == 2) console.log("请在一个小时内填写");else {
                console.log(ll1ili);
                for (let IiiiII of ["未开始", "结束", "不存在", "不在"]) {
                  if (ll1ili.resp_msg.includes(IiiiII)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              }
            }
          }
          IiI11I.status == 200 && iIll1(IiI11I);
        }
      } catch (llilli) {
        $.logErr(llilli, IiI11I);
      } finally {
        iI1i1I();
      }
    });
  });
}
function IIlIl1() {
  return new Promise(llillI => {
    let l1ii1I = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(I1III1("api/active/basicInfo", l1ii1I), async (IiIIi1, I11Iil, l1liI1) => {
      try {
        if (IiIIi1) {
          console.log("" + JSON.stringify(IiIIi1));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          l1liI1 = JSON.parse(l1liI1);
          if (l1liI1 && l1liI1.resp_code == 0) {
            $.actName = l1liI1.data.actName;
            $.shopName = l1liI1.data.shopName;
          } else {
            console.log(l1liI1);
          }
          I11Iil.status == 200 && iIll1(I11Iil);
        }
      } catch (il1lil) {
        $.logErr(il1lil, I11Iil);
      } finally {
        llillI();
      }
    });
  });
}
function liII1l() {
  return new Promise(l111li => {
    let IiIlIl = {};
    $.post(I1III1("api/prize/drawPrize", IiIlIl), async (iiliiI, Il1li, lIiI11) => {
      try {
        iiliiI ? (console.log("" + JSON.stringify(iiliiI)), console.log($.name + " drawPrize API请求失败，请检查网路重试")) : (lIiI11 = JSON.parse(lIiI11), lIiI11 && lIiI11.resp_code == 0 ? ($.drawNumber = lIiI11.data.drawNumber, $.prizeInfo = lIiI11.data.prizeInfo || []) : console.log(lIiI11), Il1li.status == 200 && iIll1(Il1li));
      } catch (li1lI1) {
        $.logErr(li1lI1, Il1li);
      } finally {
        l111li();
      }
    });
  });
}
async function Ii1ll1() {
  if (!$.joinVenderId) return;
  return new Promise(async IiIIli => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiliil = "";
    if ($.shopactivityId) iiliil = ",\"activityId\":" + $.shopactivityId;
    const il1llI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiliil + ",\"channel\":406}",
      il1ll1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(il1llI)
      },
      Il11Ii = await I1IIIl("8adfb", il1ll1),
      Il11Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + il1llI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Il11Ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ii1lli,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Il11Il, async (I1ill, i111Il, i111Ii) => {
      try {
        if (I1ill) i111Il && typeof i111Il.statusCode != "undefined" && i111Il.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          i111Ii = i111Ii && i111Ii.match(/jsonp_.*?\((.*?)\);/) && i111Ii.match(/jsonp_.*?\((.*?)\);/)[1] || i111Ii;
          let i111II = $.toObj(i111Ii, i111Ii);
          if (i111II && typeof i111II == "object") {
            if (i111II && i111II.success === true) {
              console.log(" >> " + i111II.message);
              $.errorJoinShop = i111II.message;
              if (i111II.result && i111II.result.giftInfo) {
                for (let IiIIl1 of i111II.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + IiIIl1.discountString + IiIIl1.prizeName + IiIIl1.secondLineDesc);
                }
              }
            } else i111II && typeof i111II == "object" && i111II.message ? ($.errorJoinShop = i111II.message, console.log("" + (i111II.message || ""))) : console.log(i111Ii);
          } else {
            console.log(i111Ii);
          }
        }
      } catch (IIi1II) {
        $.logErr(IIi1II, i111Il);
      } finally {
        IiIIli();
      }
    });
  });
}
async function IIlIlI() {
  return new Promise(async IiliI1 => {
    const l111 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      il11lI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l111)
      },
      lIll1I = await I1IIIl("8adfb", il11lI),
      li1II1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l111 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIll1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ii1lli,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li1II1, async (iiIllI, iII1l1, I1I1I) => {
      try {
        if (iiIllI) iII1l1 && typeof iII1l1.statusCode != "undefined" && iII1l1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          I1I1I = I1I1I && I1I1I.match(/jsonp_.*?\((.*?)\);/) && I1I1I.match(/jsonp_.*?\((.*?)\);/)[1] || I1I1I;
          let l1Ili = $.toObj(I1I1I, I1I1I);
          l1Ili && typeof l1Ili == "object" ? l1Ili && l1Ili.success == true && (console.log("去加入：" + (l1Ili.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = l1Ili.result.interestsRuleList && l1Ili.result.interestsRuleList[0] && l1Ili.result.interestsRuleList[0].interestsInfo && l1Ili.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(I1I1I);
        }
      } catch (lllllI) {
        $.logErr(lllllI, iII1l1);
      } finally {
        IiliI1();
      }
    });
  });
}
function I1III1(Iiii1i, iiIlll) {
  return {
    "url": "" + Ii1lI + "/" + wxActType + "/" + Iiii1i,
    "body": JSON.stringify(iiIlll),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": Ii1lI,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": lI11,
      "Cookie": Ii1lli + iIiIli + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    },
    "timeout": 15 * 1000
  };
}
function iIll1(Il1lIl) {
  if (Il1lIl) {
    if (Il1lIl.headers["set-cookie"]) {
      Ii1lli = originCookie + ";";
      for (let iiiiil of Il1lIl.headers["set-cookie"]) {
        I1IIIi[iiiiil.split(";")[0].substr(0, iiiiil.split(";")[0].indexOf("="))] = iiiiil.split(";")[0].substr(iiiiil.split(";")[0].indexOf("=") + 1);
      }
      for (const l1Il11 of Object.keys(I1IIIi)) {
        Ii1lli += l1Il11 + "=" + I1IIIi[l1Il11] + ";";
      }
      iIiIli = Ii1lli;
    }
  }
}
function l11li1(IIl1lI) {
  return new Promise(illiII => {
    const llllil = {
      "url": IIl1lI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(llllil, async (ilill, li1IIi, Il1IiI) => {
      try {
        if (ilill) $.getAuthorCodeListerr = false;else {
          if (Il1IiI) Il1IiI = JSON.parse(Il1IiI);
          $.getAuthorCodeListerr = true;
        }
      } catch (IiIl1l) {
        $.logErr(IiIl1l, li1IIi);
        Il1IiI = null;
      } finally {
        illiII(Il1IiI);
      }
    });
  });
}
function i1I(iiiiiI) {
  iiiiiI = iiiiiI || 32;
  let IIl1li = "abcdef0123456789",
    l11i = IIl1li.length,
    IIl1ll = "";
  for (i = 0; i < iiiiiI; i++) IIl1ll += IIl1li.charAt(Math.floor(Math.random() * l11i));
  return IIl1ll;
}
function liII1I(il11li, il11ll) {
  let Il1Ii1 = new RegExp("(^|[&?])" + il11ll + "=([^&]*)(&|$)"),
    ililI = il11li.match(Il1Ii1);
  if (ililI != null) return unescape(ililI[2]);
  return "";
}
function iIiIiI(lIlII1) {
  if (!lIlII1) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(lIlII1) == "object") {
      return true;
    }
  } catch (I11lII) {
    return console.log(I11lII), false;
  }
}
function iIlil(iiiil1) {
  if (typeof iiiil1 == "string") try {
    return JSON.parse(iiiil1);
  } catch (iliil) {
    return console.log(iliil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function lIiII1(lIiiI, iiiilI) {
  return Math.floor(Math.random() * (iiiilI - lIiiI)) + lIiiI;
}