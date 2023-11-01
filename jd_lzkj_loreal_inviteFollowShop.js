/*
活动名称：邀请关注店铺有礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10068&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_inviteFollowShop_url // 活动链接
		jd_lzkj_loreal_inviteFollowShop_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_inviteFollowShop_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_inviteFollowShop_break // 493后继续执行，默认退出运行（true/false）

*/

const Env=require('./utils/Env.js');
const $ = new Env('邀请关注店铺有礼（超级无线）')
const lIill1I1 = require("./jdCookie"),
  IiIIill1 = require("./function/jdCommon"),
  ii11Il11 = require("./function/sendJDNotify"),
  II1l1II = require("./function/krgetToken"),
  iIiII1i1 = process.env.jd_lzkj_loreal_inviteFollowShop_url || "",
  lI1i11II = process.env.jd_lzkj_loreal_inviteFollowShop_opencard === "true",
  lI1iIliI = process.env.jd_lzkj_loreal_inviteFollowShop_Notify === "true",
  lii1lIil = process.env.jd_lzkj_loreal_inviteFollowShop_break === "true";
let lilIl1lI = "",
  iliII11I = "";
const iIl1111I = Object.keys(lIill1I1).map(ilII1l1i => lIill1I1[ilII1l1i]).filter(i1Ii1iiI => i1Ii1iiI);
!iIl1111I[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!iIiII1i1) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const liIlI1II = IiIIill1.parseUrl(iIiII1i1);
  if (!liIlI1II) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iIiII1i1;
  $.activityId = IiIIill1.getUrlParameter(iIiII1i1, "activityId");
  $.activityType = IiIIill1.getUrlParameter(iIiII1i1, "activityType");
  $.hostname = liIlI1II?.["hostname"];
  let l111IIlI = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) l111IIlI = "apps/interact";else $.hostname.includes("lzkj") && (l111IIlI = iIiII1i1.match(/\/(prod\/cc\/interact\w*)\//)[1]);
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + l111IIlI;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !l111IIlI || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  ii11Il11.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let Iiill1l1 = 0; Iiill1l1 < iIl1111I.length; Iiill1l1++) {
    $.index = Iiill1l1 + 1;
    lilIl1lI = iIl1111I[Iiill1l1];
    iliII11I = iIl1111I[Iiill1l1];
    IiIIill1.setCookie(iliII11I);
    $.UserName = decodeURIComponent(IiIIill1.getCookieValue(lilIl1lI, "pt_pin"));
    $.UA = IiIIill1.genUA($.UserName);
    $.UUID = IiIIill1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = ii11Il11.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await lIIiiii();
    IiIIill1.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  if ($.canReceivePrize && !$.outFlag) {
    $.runEnd = false;
    for (let l1iiiiil = 0; l1iiiiil < 1; l1iiiiil++) {
      $.index = l1iiiiil + 1;
      lilIl1lI = iIl1111I[l1iiiiil];
      iliII11I = iIl1111I[l1iiiiil];
      IiIIill1.setCookie(iliII11I);
      $.UserName = decodeURIComponent(IiIIill1.getCookieValue(lilIl1lI, "pt_pin"));
      $.UA = IiIIill1.genUA($.UserName);
      $.UUID = IiIIill1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.te = Math.floor(Math.random() * 9000) + 1000;
      $.message = ii11Il11.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 领取奖品******\n");
      await Ii111lI1();
      IiIIill1.unsetCookie();
    }
  }
  lI1iIliI && ii11Il11.getMessage() && (ii11Il11.updateContent(ii11Il11.content + ("\n【活动地址】" + $.activityUrl)), await ii11Il11.push());
})().catch(lil11ii => $.logErr(lil11ii)).finally(() => $.done());
async function lIIiiii() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await II1l1II(iliII11I, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await II1Il1i1("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      await II1Il1i1("follow");
      switch ($.joinCode) {
        case "1004":
          break;
        case "1005":
        case "1006":
          if (lI1i11II) {
            const iIii1lI1 = await IiIIill1.joinShopMember($.venderId);
            if (iIii1lI1) {
              console.log("加入店铺会员成功");
            } else {
              console.log("加入店铺会员失败，活动仅限店铺会员参与哦~");
              $.message.fix("加入店铺会员失败，活动仅限店铺会员参与");
              return;
            }
          } else {
            console.log("活动仅限店铺会员参与哦~");
            $.message.fix("活动仅限店铺会员参与");
            return;
          }
          break;
        default:
          if ($.joinCode !== "1001") {
            console.log($.joinDes);
            $.message.fix($.joinDes);
            return;
          }
          break;
      }
      if ($.runEnd || $.outFlag || $.skipRun) return;
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) return;
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj")) {
      await II1Il1i1("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await II1Il1i1("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10068":
          break;
        case "":
          console.log("未能获取活动类型"), $.message.fix("未能获取活动类型"), $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.message.fix("活动类型（" + $.activityType + "）不受支持"), $.runEnd = true;
          return;
      }
      await $.wait(500);
    }
    if ($.index === 1 || !$.needHelpNums || !$.shareUserId) {
      await II1Il1i1("prizeList");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) return;
      await II1Il1i1("getInviteInfo");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) return;
      await II1Il1i1("getUserId");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      if (!$.shareUserId) return;
      await $.wait(500);
      await II1Il1i1("list");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) return;
      let IIIill1I = false,
        l1iillil = "";
      for (let Ii1li1l1 = 0; Ii1li1l1 < $.prizeInfo.length; Ii1li1l1++) {
        const lIil1ii1 = $.prizeInfo[Ii1li1l1],
          iiIl111I = lIil1ii1.prizeName,
          ilIiI1i1 = lIil1ii1.leftNum,
          illi1iII = lIil1ii1.prizeType,
          IIiIIIIi = lIil1ii1.days;
        ilIiI1i1 > 0 && illi1iII !== 2 && ($.needHelpNums ? IIiIIIIi > $.needHelpNums && ($.needHelpNums = IIiIIIIi) : ($.minHelpNums = IIiIIIIi, $.needHelpNums = IIiIIIIi), IIIill1I = true);
        l1iillil += "  " + iiIl111I + (illi1iII === 5 ? "[专享价]" : illi1iII === 3 ? "[实物]" : "") + "，需邀请" + IIiIIIIi + "人，" + (ilIiI1i1 > 0 ? "剩余" + ilIiI1i1 + "件" : "已发完") + "\n";
      }
      $.haveHelpNums = $.shareNum;
      console.log((($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n当前邀请：" + $.shareNum + "人\n确认邀请：" + $.needHelpNums + "人\n活动奖品：\n" + l1iillil).trim());
      ii11Il11.updateContent(ii11Il11.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【当前邀请】" + $.shareNum + "人\n【确认邀请】" + $.needHelpNums + "人\n【活动奖品】\n" + l1iillil));
      const i1I1I1il = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        iill1iil = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const IIllIl1i = Date.now();
          if ($.actStartTime && IIllIl1i < $.actStartTime) {
            console.log("活动将在 " + i1I1I1il + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + i1I1I1il);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && IIllIl1i > $.actEndTime) {
            console.log("活动已于 " + iill1iil + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + iill1iil);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + i1I1I1il + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + i1I1I1il), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + iill1iil + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + iill1iil), $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!IIIill1I) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    } else {
      if ($.shareUserId) {
        await II1Il1i1("getInviteInfo");
        switch ($.sharesStatus) {
          case 1:
            $.haveHelpNums += 1, console.log("✅ 助力成功"), $.message.fix("助力成功"), console.log("\n当前已邀请 " + $.haveHelpNums + " 人");
            break;
          case 2:
            console.log("❌ 没有助力机会或已经助力过了~"), $.message.fix("已助力过");
            break;
          case 0:
          case 3:
            console.log("❌ 助力码未填写或其它原因"), $.message.fix("助力码未填写或其它原因");
            break;
          default:
            console.log("未知助力状态"), $.message.fix("未知助力状态");
            break;
        }
      }
    }
    $.haveHelpNums >= $.minHelpNums && ($.canReceivePrize = true, $.haveHelpNums >= $.needHelpNums && ($.runEnd = true));
  } catch (l1Ilill) {
    console.log("❌ 脚本运行遇到了错误\n" + l1Ilill);
  }
}
async function Ii111lI1() {
  try {
    $.token = "";
    $.havePrize = false;
    $.jdToken = await II1l1II(iliII11I, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await II1Il1i1("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    $.shareUserId = "";
    if ($.receivePrizes.length) for (let li1lIIiI = $.prizeInfo.length - 1; li1lIIiI >= 0; li1lIIiI--) {
      const lllillI = $.prizeInfo[li1lIIiI],
        I11l1liI = lllillI.id;
      for (let IilIIIi = $.receivePrizes.length - 1; IilIIIi >= 0; IilIIIi--) {
        const iIi1ii1 = $.receivePrizes[IilIIIi];
        if (iIi1ii1?.["prizeInfoId"] === I11l1liI && iIi1ii1?.["status"] === 1) {
          $.prizeInfo.splice(li1lIIiI, 1);
          break;
        }
      }
    }
    for (let iIli1Iil = $.prizeInfo.length - 1; iIli1Iil >= 0; iIli1Iil--) {
      const I1i1I11 = $.prizeInfo[iIli1Iil],
        liI11Ii1 = I1i1I11.leftNum,
        iil1iIIi = I1i1I11.prizeType,
        iliilI1 = I1i1I11.id,
        ilIl1l = I1i1I11.days;
      liI11Ii1 > 0 && iil1iIIi !== 2 && $.haveHelpNums >= ilIl1l && ($.prizeInfoId = iliilI1, await II1Il1i1("acquire"), await $.wait(500), $.havePrize = true);
    }
    !$.havePrize && console.log("没有可以领取的奖品");
  } catch (I1I111i1) {
    console.log("❌ 脚本运行遇到了错误\n" + I1I111i1);
  }
}
async function I1i1liII(II1lII1l, iiiiiiIl) {
  try {
    switch (II1lII1l) {
      case "login":
        if (iiiiiiIl.resp_code === 0 && iiiiiiIl.data) {
          $.token = iiiiiiIl?.["data"]?.["token"];
          $.joinInfo = iiiiiiIl?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = iiiiiiIl?.["data"]?.["shopId"];
          $.venderId = IiIIill1.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = iiiiiiIl?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else iiiiiiIl.resp_msg ? (console.log(II1lII1l + " " + iiiiiiIl.resp_msg), $.message.fix(iiiiiiIl.resp_msg), $.skipRun = true) : console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl));
        break;
      case "follow":
        if (iiiiiiIl.resp_code === 0) {} else iiiiiiIl.resp_msg ? (console.log(II1lII1l + " " + iiiiiiIl.resp_msg), $.message.fix(iiiiiiIl.resp_msg), $.skipRun = true) : console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl));
        break;
      case "initPinToken":
        if (iiiiiiIl.resp_code === 0 && iiiiiiIl.data) {
          iiiiiiIl = JSON.parse(iiiiiiIl.data);
          if (iiiiiiIl.resp_code === 0 && iiiiiiIl.data) {
            $.pinToken = iiiiiiIl?.["data"]?.["pinToken"];
            $.encryptPin = iiiiiiIl?.["data"]?.["encryptPin"];
          } else {
            if (iiiiiiIl.resp_code === 1000) console.log(II1lII1l + " " + iiiiiiIl.resp_msg), $.message.fix(iiiiiiIl.resp_msg), $.skipRun = true;else {
              if (iiiiiiIl.resp_msg) console.log(II1lII1l + " " + iiiiiiIl.resp_msg), $.message.fix(iiiiiiIl.resp_msg), $.skipRun = true;else {
                console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl));
                $.skipRun = true;
              }
            }
          }
        } else console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl));
        break;
      case "basicInfo":
        if (iiiiiiIl.resp_code === 0 && iiiiiiIl.data) {
          $.actStartTime = iiiiiiIl.data?.["startTime"];
          $.actEndTime = iiiiiiIl.data?.["endTime"];
          $.actStatus = iiiiiiIl.data?.["actStatus"];
          $.shopName = iiiiiiIl.data?.["shopName"];
          !$.activityType && ($.activityType = String(iiiiiiIl.data?.["actType"] || ""));
        } else iiiiiiIl.resp_msg ? (console.log(II1lII1l + " " + iiiiiiIl.resp_msg), $.message.fix(iiiiiiIl.resp_msg)) : console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl));
        break;
      case "getUserId":
        if (iiiiiiIl.resp_code === 0 && iiiiiiIl.data) {
          $.shareUserId = iiiiiiIl.data?.["shareUserId"];
        } else iiiiiiIl.resp_msg ? (console.log(II1lII1l + " " + iiiiiiIl.resp_msg), $.message.fix(iiiiiiIl.resp_msg)) : console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl));
        break;
      case "prizeList":
        if (iiiiiiIl.resp_code === 0 && iiiiiiIl.data) $.prizeInfo = iiiiiiIl.data.prizeInfo || [];else iiiiiiIl.resp_msg ? (console.log(II1lII1l + " " + iiiiiiIl.resp_msg), $.message.fix(iiiiiiIl.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(iI1I1i1I => iiiiiiIl.resp_msg.includes(iI1I1i1I)) && ($.runEnd = true)) : (console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl)), $.skipRun = true);
        break;
      case "list":
        if (iiiiiiIl.resp_code === 0 && iiiiiiIl.data) $.receivePrizes = iiiiiiIl.data?.["receivePrizes"] || [];else iiiiiiIl.resp_msg ? (console.log(II1lII1l + " " + iiiiiiIl.resp_msg), $.message.fix(iiiiiiIl.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(l1Il11li => iiiiiiIl.resp_msg.includes(l1Il11li)) && ($.runEnd = true)) : (console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl)), $.skipRun = true);
        break;
      case "getInviteInfo":
        if (iiiiiiIl.resp_code === 0 && iiiiiiIl.data) $.shareNum = iiiiiiIl.data?.["shareNum"], $.sharesStatus = iiiiiiIl.data?.["sharesStatus"], $.flag = iiiiiiIl.data?.["flag"];else {
          if (iiiiiiIl.resp_msg) {
            console.log(II1lII1l + " " + iiiiiiIl.resp_msg);
            $.message.insert(iiiiiiIl.resp_msg);
            $.skipRun = true;
            ["未开始", "结束", "不存在", "不在"].some(IiIi1iI1 => iiiiiiIl.resp_msg.includes(IiIi1iI1)) && ($.runEnd = true);
          } else console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl)), $.skipRun = true;
        }
        break;
      case "acquire":
        if (iiiiiiIl.resp_code === 0) {
          const liI1lli1 = iiiiiiIl.data;
          if (liI1lli1) {
            switch (liI1lli1.prizeType) {
              case 1:
                console.log("🎉 " + liI1lli1.prizeName + " 🐶"), $.message.insert(liI1lli1.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const IIl1liii = iiiiiiIl.data.addressId,
                  iII1II1l = liI1lli1.prizeName;
                console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + iII1II1l);
                if (liI1lli1.showImg) console.log("预览图片：" + liI1lli1.showImg);
                const iII1i1I1 = {
                    "baseUrl": $.baseUrl,
                    "newbaseUrl": $.newbaseUrl,
                    "cookie": iliII11I,
                    "ua": $.UA,
                    "token": $.token,
                    "prizeName": iII1II1l,
                    "orderCode": IIl1liii
                  },
                  I11Ii1Ii = await loreal_savePrize(iII1i1I1);
                !lI1iIliI && I11Ii1Ii && (await ii11Il11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iII1II1l + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(iII1II1l + "(" + (I11Ii1Ii ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + liI1lli1.prizeName + " 🎟️"), $.message.insert("🗑️ " + liI1lli1.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价"), $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + liI1lli1.prizeName + " 🧧"), $.message.insert("🎉 " + liI1lli1.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + liI1lli1.prizeName + " 🎁"), $.message.insert("🎉 恭喜获得" + liI1lli1.prizeName + " 🎁");
                !lI1iIliI && (await ii11Il11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + liI1lli1.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(liI1lli1);
                break;
            }
          } else console.log("💨 空气"), $.message.insert("💨 空气");
        } else {
          if (iiiiiiIl.resp_msg) {
            console.log(II1lII1l + " " + iiiiiiIl.resp_msg);
            for (let Iii1iIll of ["未开始", "结束", "不存在", "不在"]) {
              if (iiiiiiIl.resp_msg.includes(Iii1iIll)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(iiiiiiIl.resp_msg);
          } else console.log("❓" + II1lII1l + " " + JSON.stringify(iiiiiiIl));
        }
        break;
    }
  } catch (IIiIIiil) {
    console.log("❌ 未能正确处理 " + II1lII1l + " 请求响应 " + (IIiIIiil.message || IIiIIiil));
  }
}
async function II1Il1i1(IIill1lI) {
  if ($.runEnd || $.outFlag) return;
  let lI1I11il = $.newbaseUrl,
    I1Ii11i1 = {},
    lllliI11 = "POST";
  switch (IIill1lI) {
    case "login":
      lI1I11il += "/api/user-info/login", I1Ii11i1 = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      lI1I11il += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      lllliI11 = "GET", lI1I11il += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      lI1I11il += "/api/active/basicInfo", I1Ii11i1 = {
        "activityId": $.activityId
      };
      break;
    case "getUserId":
      lI1I11il += "/api/task/share/getUserId";
      break;
    case "prizeList":
      lI1I11il += "/api/task/inviteFollowShop/prizeList";
      break;
    case "list":
      lI1I11il += "/api/prize/receive/list";
      break;
    case "getInviteInfo":
      lI1I11il += "/api/task/inviteFollowShop/getInviteInfo", I1Ii11i1 = {
        "shareUserId": $.shareUserId || ""
      };
      break;
    case "acquire":
      lI1I11il += "/api/prize/receive/acquire", I1Ii11i1 = {
        "prizeInfoId": $.prizeInfoId
      };
      break;
    default:
      console.log("❌ 未知请求 " + IIill1lI);
      return;
  }
  const Ii1IiIi1 = {
    "url": lI1I11il,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      "Cookie": "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      "Host": $.hostname,
      "Origin": $.origin,
      "Referer": $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    "body": JSON.stringify(I1Ii11i1),
    "timeout": 30000
  };
  $.token && (Ii1IiIi1.headers.token = $.token);
  lllliI11 === "GET" && (delete Ii1IiIi1.body, delete Ii1IiIi1.headers["Content-Type"]);
  const l1i111I1 = 5;
  let llI11i1 = 0,
    i1lill1I = null,
    lI11Iii = false;
  while (llI11i1 < l1i111I1) {
    llI11i1 > 0 && (await $.wait(1000));
    const {
      err: l1i11lii,
      res: I1iili1i,
      data: li1li1ii
    } = await lliliI1l(Ii1IiIi1, lllliI11);
    if (l1i11lii) {
      if (typeof l1i11lii === "string" && l1i11lii.includes("Timeout awaiting 'request'")) i1lill1I = IIill1lI + " 请求超时，请检查网络重试";else {
        const ll11I1 = I1iili1i?.["statusCode"];
        if (ll11I1) {
          if ([403, 493].includes(ll11I1)) i1lill1I = IIill1lI + " 请求失败，IP被限制（Response code " + ll11I1 + "）", lI11Iii = true;else {
            if ([400, 404].includes(ll11I1)) i1lill1I = IIill1lI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + ll11I1 + "）";else {
              i1lill1I = IIill1lI + " 请求失败（Response code " + ll11I1 + "）";
            }
          }
        } else i1lill1I = IIill1lI + " 请求失败 => " + (l1i11lii.message || l1i11lii);
      }
      llI11i1++;
    } else {
      const lll1lI1l = IiIIill1.getResponseCookie(I1iili1i),
        iiilI1l = false;
      if (iiilI1l) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + IIill1lI + " 响应Body => " + (li1li1ii || "无") + "\n");
        console.log("🔧 " + IIill1lI + " 响应Cookie => " + (lll1lI1l || "无") + "\n");
        console.log("🔧 " + IIill1lI + " 请求参数");
        console.log(Ii1IiIi1);
        console.log("\n---------------------------------------------------\n");
      }
      if (li1li1ii) try {
        const llII1Ili = JSON.parse(li1li1ii);
        I1i1liII(IIill1lI, llII1Ili);
        break;
      } catch (illlIlII) {
        i1lill1I = "❌ " + IIill1lI + " 接口响应数据解析失败: " + illlIlII.message;
        console.log("🚫 " + IIill1lI + " => " + String(li1li1ii));
        llI11i1++;
      } else i1lill1I = "❌ " + IIill1lI + " 接口无响应数据", llI11i1++;
      lI11Iii = false;
    }
  }
  llI11i1 >= l1i111I1 && (console.log(i1lill1I), lI11Iii && !lii1lIil && ($.outFlag = true, $.message && $.message.fix(i1lill1I)));
}
async function lliliI1l(Illi1l11, III1lill = "POST") {
  if (III1lill === "POST") return new Promise(async IiilIiII => {
    $.post(Illi1l11, (ii1IllIl, liiIIiII, i1i1I1iI) => {
      IiilIiII({
        "err": ii1IllIl,
        "res": liiIIiII,
        "data": i1i1I1iI
      });
    });
  });else {
    if (III1lill === "GET") return new Promise(async ill1iilI => {
      $.get(Illi1l11, (ii1llI, Il1Il1li, Ii11I1lI) => {
        ill1iilI({
          "err": ii1llI,
          "res": Il1Il1li,
          "data": Ii11I1lI
        });
      });
    });else {
      const l1i1l1i = "不支持的请求方法";
      return {
        "err": l1i1l1i,
        "res": null,
        "data": null
      };
    }
  }
}