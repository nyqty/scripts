/*
活动名称：邀请关注店铺有礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10068&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_inviteFollowShop_url // 活动链接
		jd_lzkj_loreal_inviteFollowShop_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_inviteFollowShop_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_inviteFollowShop_break // 493后继续执行，默认退出运行（true/false）
		
请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#邀请关注店铺有礼（超级无线）
1 1 1 1 * jd_lzkj_loreal_inviteFollowShop.js, tag=邀请关注店铺有礼（超级无线）, enabled=true


*/

const Env=require('./utils/Env.js');
const $ = new Env('邀请关注店铺有礼（超级无线）')
var version_ = "jsjiami.com.v7";
const i11lI1 = require("./jdCookie"),
  liliiI = require("./function/jdCommon"),
  ilIIiI = require("./function/sendJDNotify"),
  lIl1ii = require("./function/krgetToken"),
  {
    wuxianDefense: lIl1il
  } = require("./function/jdCrypto"),
  {
    loreal_savePrize: Ii1l11
  } = require("./function/krsavePrize"),
  IIlii1 = process.env.jd_lzkj_loreal_inviteFollowShop_url || "",
  iiI1lI = process.env.jd_lzkj_loreal_inviteFollowShop_opencard === "true",
  IliIlI = process.env.jd_lzkj_loreal_inviteFollowShop_Notify === "true",
  IIliiI = process.env.jd_lzkj_loreal_inviteFollowShop_break === "true";
let i1111l = "",
  i1111i = "";
const iliiI1 = Object.keys(i11lI1).map(ilIIil => i11lI1[ilIIil]).filter(lIili1 => lIili1);
!iliiI1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!IIlii1) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const iliiII = liliiI.parseUrl(IIlii1);
  if (!iliiII) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = IIlii1;
  $.activityId = liliiI.getUrlParameter(IIlii1, "activityId");
  $.activityType = liliiI.getUrlParameter(IIlii1, "activityType");
  $.hostname = iliiII.hostname;
  $.pathname = iliiII.pathname;
  let iiI1li = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      iiI1li = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (iiI1li = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + iiI1li;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !iiI1li || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  ilIIiI.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let I1iill = 0; I1iill < iliiI1.length; I1iill++) {
    $.index = I1iill + 1;
    i1111l = iliiI1[I1iill];
    i1111i = iliiI1[I1iill];
    liliiI.setCookie(i1111i);
    $.UserName = decodeURIComponent(liliiI.getCookieValue(i1111l, "pt_pin"));
    $.UA = liliiI.genUA($.UserName);
    $.UUID = liliiI.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = ilIIiI.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await Illli1();
    liliiI.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  if ($.canReceivePrize && !$.outFlag) {
    $.runEnd = false;
    for (let i1lli = 0; i1lli < 1; i1lli++) {
      $.index = i1lli + 1;
      i1111l = iliiI1[i1lli];
      i1111i = iliiI1[i1lli];
      liliiI.setCookie(i1111i);
      $.UserName = decodeURIComponent(liliiI.getCookieValue(i1111l, "pt_pin"));
      $.UA = liliiI.genUA($.UserName);
      $.UUID = liliiI.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.te = Math.floor(Math.random() * 9000) + 1000;
      $.message = ilIIiI.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 领取奖品******\n");
      await ilIIii();
      liliiI.unsetCookie();
    }
  }
  IliIlI && ilIIiI.getMessage() && (ilIIiI.updateContent(ilIIiI.content + ("\n【活动地址】" + $.activityUrl)), await ilIIiI.push());
})().catch(lIilii => $.logErr(lIilii)).finally(() => $.done());
async function Illli1() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await lIl1ii(i1111i, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await lIl1l1("login");
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1004":
          await lIl1l1("follow");
          await $.wait(500);
          await lIl1l1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await lIl1l1("follow");
          await $.wait(500);
          await lIl1l1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (iiI1lI) {
            const liI1I1 = await liliiI.joinShopMember($.venderId);
            if (liI1I1) {
              console.log("加入店铺会员成功");
              await lIl1l1("login");
              if ($.runEnd || $.outFlag || $.skipRun) {
                return;
              }
              await $.wait(500);
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
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj")) {
      await lIl1l1("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await lIl1l1("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10068":
          break;
        case "":
          console.log("未能获取活动类型");
          $.message.fix("未能获取活动类型");
          $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
          $.message.fix("活动类型（" + $.activityType + "）不受支持");
          $.runEnd = true;
          return;
      }
      await $.wait(500);
    }
    if ($.index === 1 || !$.needHelpNums || !$.shareUserId) {
      await lIl1l1("prizeList");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      await lIl1l1("getInviteInfo");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      await lIl1l1("getUserId");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      if (!$.shareUserId) {
        return;
      }
      await $.wait(500);
      await lIl1l1("list");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      let l1lIl = false,
        Ii1l1l = "";
      for (let l1lIi = 0; l1lIi < $.prizeInfo.length; l1lIi++) {
        const IIlI1l = $.prizeInfo[l1lIi],
          lI1I11 = IIlI1l.prizeName,
          IilIl = IIlI1l.leftNum,
          IilIi = IIlI1l.prizeType,
          Ili1Il = IIlI1l.days;
        IilIl > 0 && IilIi !== 2 && ($.needHelpNums ? Ili1Il > $.needHelpNums && ($.needHelpNums = Ili1Il) : ($.minHelpNums = Ili1Il, $.needHelpNums = Ili1Il), l1lIl = true);
        Ii1l1l += "  " + lI1I11 + (IilIi === 5 ? "[专享价]" : IilIi === 3 ? "[实物]" : "") + "，需邀请" + Ili1Il + "人，" + (IilIl > 0 ? "剩余" + IilIl + "件" : "已发完") + "\n";
      }
      $.haveHelpNums = $.shareNum;
      console.log((($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n当前邀请：" + $.shareNum + "人\n确认邀请：" + $.needHelpNums + "人\n活动奖品：\n" + Ii1l1l).trim());
      ilIIiI.updateContent(ilIIiI.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【当前邀请】" + $.shareNum + "人\n【确认邀请】" + $.needHelpNums + "人\n【活动奖品】\n" + Ii1l1l));
      const i1Iiil = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        i1Iiii = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const i1liI = Date.now();
          if ($.actStartTime && i1liI < $.actStartTime) {
            console.log("活动将在 " + i1Iiil + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + i1Iiil);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && i1liI > $.actEndTime) {
            console.log("活动已于 " + i1Iiii + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + i1Iiii);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + i1Iiil + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + i1Iiil);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + i1Iiii + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + i1Iiii);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!l1lIl) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    } else {
      if ($.shareUserId) {
        await lIl1l1("getInviteInfo");
        switch ($.sharesStatus) {
          case 1:
            $.haveHelpNums += 1;
            console.log("✅ 助力成功");
            $.message.fix("助力成功");
            console.log("\n当前已邀请 " + $.haveHelpNums + " 人");
            break;
          case 2:
            console.log("❌ 没有助力机会或已经助力过了~");
            $.message.fix("已助力过");
            break;
          case 0:
          case 3:
            console.log("❌ 助力码未填写或其它原因");
            $.message.fix("助力码未填写或其它原因");
            break;
          default:
            console.log("未知助力状态");
            $.message.fix("未知助力状态");
            break;
        }
      }
    }
    if ($.haveHelpNums >= $.minHelpNums) {
      $.canReceivePrize = true;
      $.haveHelpNums >= $.needHelpNums && ($.runEnd = true);
    }
  } catch (Ii1l1I) {
    console.log("❌ 脚本运行遇到了错误\n" + Ii1l1I);
  }
}
async function ilIIii() {
  try {
    $.token = "";
    $.havePrize = false;
    $.jdToken = await lIl1ii(i1111i, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await lIl1l1("login");
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    $.shareUserId = "";
    if ($.receivePrizes.length) {
      for (let IiIi1 = $.prizeInfo.length - 1; IiIi1 >= 0; IiIi1--) {
        const i1IilI = $.prizeInfo[IiIi1],
          III1I1 = i1IilI.id;
        for (let ilI111 = $.receivePrizes.length - 1; ilI111 >= 0; ilI111--) {
          const I1IllI = $.receivePrizes[ilI111];
          if (I1IllI?.["prizeInfoId"] === III1I1 && I1IllI?.["status"] === 1) {
            $.prizeInfo.splice(IiIi1, 1);
            break;
          }
        }
      }
    }
    for (let iIIll1 = $.prizeInfo.length - 1; iIIll1 >= 0; iIIll1--) {
      const llIIII = $.prizeInfo[iIIll1],
        ilI11I = llIIII.leftNum,
        ili1I = llIIII.prizeType,
        iilIIl = llIIII.id,
        i1Iili = llIIII.days;
      ilI11I > 0 && ili1I !== 2 && $.haveHelpNums >= i1Iili && ($.prizeInfoId = iilIIl, await lIl1l1("acquire"), await $.wait(500), $.havePrize = true);
    }
    !$.havePrize && console.log("没有可以领取的奖品");
  } catch (l1IiI) {
    console.log("❌ 脚本运行遇到了错误\n" + l1IiI);
  }
}
async function l1111(l1lill, i1li1) {
  try {
    switch (l1lill) {
      case "login":
        if (i1li1.resp_code === 0 && i1li1.data) {
          $.token = i1li1?.["data"]?.["token"];
          $.joinInfo = i1li1?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = i1li1?.["data"]?.["shopId"];
          $.venderId = liliiI.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = i1li1?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          i1li1.resp_msg ? (console.log(l1lill + " " + i1li1.resp_msg), $.message.fix(i1li1.resp_msg), $.skipRun = true) : console.log("❓" + l1lill + " " + JSON.stringify(i1li1));
        }
        break;
      case "follow":
        if (!(i1li1.resp_code === 0)) {
          i1li1.resp_msg ? (console.log(l1lill + " " + i1li1.resp_msg), $.message.fix(i1li1.resp_msg), $.skipRun = true) : console.log("❓" + l1lill + " " + JSON.stringify(i1li1));
        }
        break;
      case "initPinToken":
        if (i1li1.resp_code === 0 && i1li1.data) {
          i1li1 = JSON.parse(i1li1.data);
          if (i1li1.resp_code === 0 && i1li1.data) {
            $.pinToken = i1li1?.["data"]?.["pinToken"];
            $.encryptPin = i1li1?.["data"]?.["encryptPin"];
          } else {
            if (i1li1.resp_code === 1000) {
              console.log(l1lill + " " + i1li1.resp_msg);
              $.message.fix(i1li1.resp_msg);
              $.skipRun = true;
            } else {
              i1li1.resp_msg ? (console.log(l1lill + " " + i1li1.resp_msg), $.message.fix(i1li1.resp_msg), $.skipRun = true) : (console.log("❓" + l1lill + " " + JSON.stringify(i1li1)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + l1lill + " " + JSON.stringify(i1li1));
        }
        break;
      case "basicInfo":
        if (i1li1.resp_code === 0 && i1li1.data) {
          $.actStartTime = i1li1.data?.["startTime"];
          $.actEndTime = i1li1.data?.["endTime"];
          $.actStatus = i1li1.data?.["actStatus"];
          $.shopName = i1li1.data?.["shopName"];
          !$.activityType && ($.activityType = String(i1li1.data?.["actType"] || ""));
        } else {
          i1li1.resp_msg ? (console.log(l1lill + " " + i1li1.resp_msg), $.message.fix(i1li1.resp_msg)) : console.log("❓" + l1lill + " " + JSON.stringify(i1li1));
        }
        break;
      case "getUserId":
        if (i1li1.resp_code === 0 && i1li1.data) {
          $.shareUserId = i1li1.data?.["shareUserId"];
        } else {
          i1li1.resp_msg ? (console.log(l1lill + " " + i1li1.resp_msg), $.message.fix(i1li1.resp_msg)) : console.log("❓" + l1lill + " " + JSON.stringify(i1li1));
        }
        break;
      case "prizeList":
        if (i1li1.resp_code === 0 && i1li1.data) {
          $.prizeInfo = i1li1.data.prizeInfo || [];
        } else {
          i1li1.resp_msg ? (console.log(l1lill + " " + i1li1.resp_msg), $.message.fix(i1li1.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(IiIiI => i1li1.resp_msg.includes(IiIiI)) && ($.runEnd = true)) : (console.log("❓" + l1lill + " " + JSON.stringify(i1li1)), $.skipRun = true);
        }
        break;
      case "list":
        if (i1li1.resp_code === 0 && i1li1.data) {
          $.receivePrizes = i1li1.data?.["receivePrizes"] || [];
        } else {
          i1li1.resp_msg ? (console.log(l1lill + " " + i1li1.resp_msg), $.message.fix(i1li1.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(Illi1 => i1li1.resp_msg.includes(Illi1)) && ($.runEnd = true)) : (console.log("❓" + l1lill + " " + JSON.stringify(i1li1)), $.skipRun = true);
        }
        break;
      case "getInviteInfo":
        if (i1li1.resp_code === 0 && i1li1.data) {
          $.shareNum = i1li1.data?.["shareNum"];
          $.sharesStatus = i1li1.data?.["sharesStatus"];
          $.flag = i1li1.data?.["flag"];
        } else {
          i1li1.resp_msg ? (console.log(l1lill + " " + i1li1.resp_msg), $.message.insert(i1li1.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(liI11I => i1li1.resp_msg.includes(liI11I)) && ($.runEnd = true)) : (console.log("❓" + l1lill + " " + JSON.stringify(i1li1)), $.skipRun = true);
        }
        break;
      case "acquire":
        if (i1li1.resp_code === 0) {
          const lIIi1l = i1li1.data;
          if (lIIi1l) {
            switch (lIIi1l.prizeType) {
              case 1:
                console.log("🎉 " + lIIi1l.prizeName + " 🐶");
                $.message.insert(lIIi1l.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const illili = i1li1.data.addressId,
                  iiiII1 = lIIi1l.prizeName;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + iiiII1);
                if (lIIi1l.showImg) {
                  console.log("预览图片：" + lIIi1l.showImg);
                }
                const liI111 = {
                    baseUrl: $.baseUrl,
                    newbaseUrl: $.newbaseUrl,
                    cookie: i1111i,
                    ua: $.UA,
                    token: $.token,
                    prizeName: iiiII1,
                    orderCode: illili
                  },
                  IiIlI = await Ii1l11(liI111);
                !IliIlI && IiIlI && (await ilIIiI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iiiII1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(iiiII1 + "(" + (IiIlI ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + lIIi1l.prizeName + " 🎟️");
                $.message.insert("🗑️ " + lIIi1l.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + lIIi1l.prizeName + " 🧧");
                $.message.insert("🎉 " + lIIi1l.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + lIIi1l.prizeName + " 🎁");
                $.message.insert("🎉 恭喜获得" + lIIi1l.prizeName + " 🎁");
                !IliIlI && (await ilIIiI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lIIi1l.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(lIIi1l);
                break;
            }
          } else {
            console.log("💨 空气");
            $.message.insert("💨 空气");
          }
        } else {
          if (i1li1.resp_msg) {
            console.log(l1lill + " " + i1li1.resp_msg);
            for (let IIIliI of ["未开始", "结束", "不存在", "不在"]) {
              if (i1li1.resp_msg.includes(IIIliI)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(i1li1.resp_msg);
          } else {
            console.log("❓" + l1lill + " " + JSON.stringify(i1li1));
          }
        }
        break;
    }
  } catch (iII1Ii) {
    console.log("❌ 未能正确处理 " + l1lill + " 请求响应 " + (iII1Ii.message || iII1Ii));
  }
}
async function lIl1l1(iIlI1l) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let l1IIii = $.newbaseUrl,
    lIIi1I = {},
    l1IIil = {},
    l1iiII = "POST";
  switch (iIlI1l) {
    case "login":
      l1IIii += "/api/user-info/login";
      lIIi1I = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      l1IIii += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      l1iiII = "GET";
      l1IIii += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      l1IIii += "/api/active/basicInfo";
      lIIi1I = {
        activityId: $.activityId
      };
      break;
    case "getUserId":
      l1IIii += "/api/task/share/getUserId";
      break;
    case "prizeList":
      l1IIii += "/api/task/inviteFollowShop/prizeList";
      break;
    case "list":
      l1IIii += "/api/prize/receive/list";
      break;
    case "getInviteInfo":
      l1IIii += "/api/task/inviteFollowShop/getInviteInfo";
      lIIi1I = {
        shareUserId: $.shareUserId || ""
      };
      break;
    case "acquire":
      l1IIii += "/api/prize/receive/acquire";
      lIIi1I = {
        prizeInfoId: $.prizeInfoId
      };
      break;
    default:
      console.log("❌ 未知请求 " + iIlI1l);
      return;
  }
  const I1lI1I = l1iiII === "POST" && $.pathname.includes("/prod/cc/interactsaas") && lIl1il.isDefenseApi(l1IIii.replace($.newbaseUrl, "").split("?")[0]);
  I1lI1I && (lIIi1I.actId = $.activityId, l1IIil = {
    ecyText: lIl1il.encrypt(lIIi1I, $.pinToken, $.te)
  });
  const lIi1i1 = {
    url: l1IIii,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      Connection: "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      Host: $.hostname,
      Origin: $.origin,
      Referer: $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    body: JSON.stringify(I1lI1I ? l1IIil : lIIi1I),
    timeout: 30000
  };
  $.token && (lIi1i1.headers.token = $.token);
  l1iiII === "GET" && (delete lIi1i1.body, delete lIi1i1.headers["Content-Type"]);
  const l1l11 = 5;
  let illill = 0,
    IIIli1 = null,
    I1lI11 = false;
  while (illill < l1l11) {
    illill > 0 && (await $.wait(1000));
    const {
      err: iIlI11,
      res: IIII,
      data: l1IIlI
    } = await li1i(lIi1i1, l1iiII);
    if (iIlI11) {
      if (typeof iIlI11 === "string" && iIlI11.includes("Timeout awaiting 'request'")) {
        IIIli1 = iIlI1l + " 请求超时，请检查网络重试";
      } else {
        const llIil1 = IIII?.["statusCode"];
        if (llIil1) {
          if ([403, 493].includes(llIil1)) {
            IIIli1 = iIlI1l + " 请求失败，IP被限制（Response code " + llIil1 + "）";
            I1lI11 = true;
          } else {
            if ([400, 404].includes(llIil1)) {
              IIIli1 = iIlI1l + " 请求配置参数错误，请联系开发者进行反馈（Response code " + llIil1 + "）";
            } else {
              [500].includes(llIil1) && I1lI1I ? lIi1i1.body = JSON.stringify({
                ecyText: lIl1il.encrypt(lIIi1I, $.pinToken, $.te)
              }) : IIIli1 = iIlI1l + " 请求失败（Response code " + llIil1 + "）";
            }
          }
        } else {
          IIIli1 = iIlI1l + " 请求失败 => " + (iIlI11.message || iIlI11);
        }
      }
      illill++;
    } else {
      const Ill1I1 = liliiI.getResponseCookie(IIII);
      switch (iIlI1l) {
        case "initPinToken":
          const illilI = liliiI.getCookieValue(Ill1I1, "te");
          if (illilI) {
            $.te = illilI;
          }
          break;
      }
      if (l1IIlI) {
        try {
          const iil11I = JSON.parse(l1IIlI);
          l1111(iIlI1l, iil11I);
          break;
        } catch (iII1II) {
          IIIli1 = "❌ " + iIlI1l + " 接口响应数据解析失败: " + iII1II.message;
          console.log("🚫 " + iIlI1l + " => " + String(l1IIlI));
          illill++;
        }
      } else {
        I1lI1I && (lIi1i1.body = JSON.stringify({
          ecyText: lIl1il.encrypt(lIIi1I, $.pinToken, $.te)
        }));
        IIIli1 = "❌ " + iIlI1l + " 接口无响应数据";
        illill++;
      }
      I1lI11 = false;
    }
  }
  if (illill >= l1l11) {
    console.log(IIIli1);
    I1lI11 && !IIliiI && ($.outFlag = true, $.message && $.message.fix(IIIli1));
  }
}
async function li1i(IIIlil, Ili111 = "POST") {
  if (Ili111 === "POST") {
    return new Promise(async liIlII => {
      $.post(IIIlil, (llII1l, iil11l, IiIi1l) => {
        liIlII({
          err: llII1l,
          res: iil11l,
          data: IiIi1l
        });
      });
    });
  } else {
    if (Ili111 === "GET") {
      return new Promise(async illI1I => {
        $.get(IIIlil, (ilI1Ii, ilI1Il, illI11) => {
          illI1I({
            err: ilI1Ii,
            res: ilI1Il,
            data: illI11
          });
        });
      });
    } else {
      const ll11Ii = "不支持的请求方法";
      return {
        err: ll11Ii,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";