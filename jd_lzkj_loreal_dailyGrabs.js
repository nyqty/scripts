/*
活动名称：每日抢好礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10022&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_dailyGrabs_url // 活动链接
		jd_lzkj_loreal_dailyGrabs_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_dailyGrabs_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_dailyGrabs_break // 493后继续执行，默认退出运行（true/false）
		
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#每日抢好礼（超级无线）
1 1 1 1 * jd_lzkj_loreal_dailyGrabs.js, tag=每日抢好礼（超级无线）, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('每日抢好礼（超级无线）')
var version_ = "jsjiami.com.v7";
const l1ilIl = require("./jdCookie"),
  IIiiIi = require("./function/jdCommon"),
  l1ilIi = require("./function/sendJDNotify"),
  l11iIi = require("./function/krgetToken"),
  {
    wuxianDefense: ll11li
  } = require("./function/jdCrypto"),
  {
    loreal_savePrize: iliIlI
  } = require("./function/krsavePrize"),
  lI111I = process.env.jd_lzkj_loreal_dailyGrabs_url || "",
  IlilI = process.env.jd_lzkj_loreal_dailyGrabs_opencard === "true",
  llIi1 = process.env.jd_lzkj_loreal_dailyGrabs_Notify === "true",
  IliIII = process.env.jd_lzkj_loreal_dailyGrabs_break === "true";
let II1l = "",
  liiiiI = "";
const II1i = Object.keys(l1ilIl).map(II11 => l1ilIl[II11]).filter(l1ilII => l1ilII);
!II1i[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!lI111I) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const iliIll = IIiiIi.parseUrl(lI111I);
  if (!iliIll) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = lI111I;
  $.activityId = IIiiIi.getUrlParameter(lI111I, "activityId");
  $.activityType = IIiiIi.getUrlParameter(lI111I, "activityType");
  $.hostname = iliIll.hostname;
  $.pathname = iliIll.pathname;
  let llliIl = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      llliIl = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (llliIl = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + llliIl;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !llliIl || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  l1ilIi.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let IIiiI1 = 0; IIiiI1 < II1i.length; IIiiI1++) {
    $.index = IIiiI1 + 1;
    II1l = II1i[IIiiI1];
    liiiiI = II1i[IIiiI1];
    IIiiIi.setCookie(liiiiI);
    $.UserName = decodeURIComponent(IIiiIi.getCookieValue(II1l, "pt_pin"));
    $.UA = IIiiIi.genUA($.UserName);
    $.UUID = IIiiIi.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = l1ilIi.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await illli1();
    IIiiIi.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  llIi1 && l1ilIi.getMessage() && (l1ilIi.updateContent(l1ilIi.content + ("\n【活动地址】" + $.activityUrl)), await l1ilIi.push());
})().catch(ii1IIl => $.logErr(ii1IIl)).finally(() => $.done());
async function illli1() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await l11iIi(liiiiI, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await Ill111("login");
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
          await Ill111("follow");
          await $.wait(500);
          await Ill111("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await Ill111("follow");
          await $.wait(500);
          await Ill111("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (IlilI) {
            const illlli = await IIiiIi.joinShopMember($.venderId);
            if (illlli) {
              console.log("加入店铺会员成功");
              await Ill111("login");
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
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await Ill111("initPinToken");
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
      await Ill111("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10022":
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
      if ($.runEnd || $.outFlag) {
        return;
      }
      await $.wait(500);
    }
    await Ill111("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await Ill111("drawPrize");
      await $.wait(500);
      const IIIIiI = $.activityContent?.["prizeName"],
        II1I1 = $.activityContent?.["prizeType"],
        i1i111 = $.activityContent?.["surplusDayNum"],
        ii1l1I = $.prizeInfo[0]?.["leftNum"];
      let lI1lII = i1i111 >= 1,
        lIill1 = "" + IIIIiI + (II1I1 === 5 ? "[专享价]" : II1I1 === 3 ? "[实物]" : "") + "，" + (ii1l1I >= 1 ? "活动剩余" + ii1l1I + "件，今日" + (i1i111 >= 1 ? "剩余" + i1i111 + "件" : "已发完") : "全部已发完");
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + lIill1 + "\n");
      l1ilIi.updateContent(l1ilIi.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】" + lIill1));
      const iiI1i1 = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        ilIlII = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const IIlili = Date.now();
          if ($.actStartTime && IIlili < $.actStartTime) {
            console.log("活动将在 " + iiI1i1 + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + iiI1i1);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && IIlili > $.actEndTime) {
            console.log("活动已于 " + ilIlII + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + ilIlII);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + iiI1i1 + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + iiI1i1);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + ilIlII + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + ilIlII);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!lI1lII) {
        ii1l1I >= 1 ? (console.log("今天的奖品已全部发完了，下次早点来吧~"), $.message.fix("当日奖品已发完")) : (console.log("奖品已全部发完了，下次早点来吧~"), $.message.fix("奖品已发完"));
        $.runEnd = true;
        return;
      }
      const iIiil1 = $.activityContent?.["hours"],
        l1lI1i = $.activityContent?.["minutes"],
        l1lI1l = Date.now(),
        l1I1Il = $.time("HH", l1lI1l),
        l1I1Ii = $.time("mm", l1lI1l);
      if (iIiil1 > l1I1Il || iIiil1 === l1I1Il && l1lI1i > l1I1Ii) {
        console.log("活动将在今日 " + iIiil1 + ":" + l1lI1i + " 开抢，晚点再来吧~");
        $.message.fix("未到开抢时间，开始时间：" + iIiil1 + ":" + l1lI1i);
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    const i1l1I1 = $.activityContent?.["receiveStatus"];
    switch (i1l1I1) {
      case "0":
        $.prizeInfoId = $.activityContent?.["prizeInfoId"];
        await Ill111("dayReceive");
        await $.wait(500);
        break;
      case "1":
        console.log("今日已经领取过奖品了哦~");
        $.message.fix("今日已领");
        break;
      default:
        console.log("未知领取状态 " + i1l1I1);
        $.message.fix("未知领取状态 " + i1l1I1);
        break;
    }
  } catch (IllllI) {
    console.log("❌ 脚本运行遇到了错误\n" + IllllI);
  }
}
async function I1lII1(I1iil1, lIillI) {
  try {
    switch (I1iil1) {
      case "login":
        if (lIillI.resp_code === 0 && lIillI.data) {
          $.token = lIillI?.["data"]?.["token"];
          $.joinInfo = lIillI?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = lIillI?.["data"]?.["shopId"];
          $.venderId = IIiiIi.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = lIillI?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          lIillI.resp_msg ? (console.log(I1iil1 + " " + lIillI.resp_msg), $.message.fix(lIillI.resp_msg), $.skipRun = true) : console.log("❓" + I1iil1 + " " + JSON.stringify(lIillI));
        }
        break;
      case "follow":
        if (!(lIillI.resp_code === 0)) {
          lIillI.resp_msg ? (console.log(I1iil1 + " " + lIillI.resp_msg), $.message.fix(lIillI.resp_msg), $.skipRun = true) : console.log("❓" + I1iil1 + " " + JSON.stringify(lIillI));
        }
        break;
      case "initPinToken":
        if (lIillI.resp_code === 0 && lIillI.data) {
          lIillI = JSON.parse(lIillI.data);
          if (lIillI.resp_code === 0 && lIillI.data) {
            $.pinToken = lIillI?.["data"]?.["pinToken"];
            $.encryptPin = lIillI?.["data"]?.["encryptPin"];
          } else {
            if (lIillI.resp_code === 1000) {
              console.log(I1iil1 + " " + lIillI.resp_msg);
              $.message.fix(lIillI.resp_msg);
              $.skipRun = true;
            } else {
              lIillI.resp_msg ? (console.log(I1iil1 + " " + lIillI.resp_msg), $.message.fix(lIillI.resp_msg), $.skipRun = true) : (console.log("❓" + I1iil1 + " " + JSON.stringify(lIillI)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + I1iil1 + " " + JSON.stringify(lIillI));
        }
        break;
      case "basicInfo":
        if (lIillI.resp_code === 0 && lIillI.data) {
          $.actStartTime = lIillI.data?.["startTime"];
          $.actEndTime = lIillI.data?.["endTime"];
          $.actStatus = lIillI.data?.["actStatus"];
          !$.activityType && ($.activityType = String(lIillI.data?.["actType"] || ""));
        } else {
          if (lIillI.resp_msg) {
            console.log(I1iil1 + " " + lIillI.resp_msg);
            $.message.fix(lIillI.resp_msg);
          } else {
            console.log("❓" + I1iil1 + " " + JSON.stringify(lIillI));
          }
        }
        break;
      case "activity":
        if (lIillI.resp_code === 0 && lIillI.data) {
          $.activityContent = lIillI.data;
        } else {
          lIillI.resp_msg ? (console.log(I1iil1 + " " + lIillI.resp_msg), $.message.fix(lIillI.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(ilI11i => lIillI.resp_msg.includes(ilI11i)) && ($.runEnd = true)) : (console.log("❓" + I1iil1 + " " + JSON.stringify(lIillI)), $.skipRun = true);
        }
        break;
      case "drawPrize":
        if (lIillI.resp_code === 0) {
          $.prizeInfo = lIillI?.["data"]?.["prizeInfo"] || [];
        } else {
          lIillI.resp_msg ? (console.log(I1iil1 + " " + lIillI.resp_msg), ["未开始", "结束", "不存在", "不在"].some(li1I => lIillI.resp_msg.includes(li1I)) && ($.runEnd = true), $.message.fix(lIillI.resp_msg)) : console.log("❓" + I1iil1 + " " + JSON.stringify(lIillI));
        }
        break;
      case "dayReceive":
        if (lIillI.resp_code === 0) {
          const lI1iiI = lIillI.data;
          if (lI1iiI) {
            switch (lI1iiI.prizeType) {
              case 1:
                console.log("🎉 " + lI1iiI.prizeName + " 🐶");
                $.message.insert(lI1iiI.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const IIlil1 = lIillI.data.addressId,
                  I1Illl = lI1iiI.prizeName;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + I1Illl);
                if (lI1iiI.showImg) {
                  console.log("预览图片：" + lI1iiI.showImg);
                }
                const ll1lii = {
                    baseUrl: $.baseUrl,
                    newbaseUrl: $.newbaseUrl,
                    cookie: liiiiI,
                    ua: $.UA,
                    token: $.token,
                    prizeName: I1Illl,
                    orderCode: IIlil1
                  },
                  li11 = await iliIlI(ll1lii);
                !llIi1 && li11 && (await l1ilIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + I1Illl + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(I1Illl + "(" + (li11 ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + lI1iiI.prizeName + " 🎟️");
                $.message.insert("🗑️ " + lI1iiI.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + lI1iiI.prizeName + " 🧧");
                $.message.insert("🎉 " + lI1iiI.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + lI1iiI.prizeName + " 🎁");
                $.message.insert("🎉 恭喜获得" + lI1iiI.prizeName + " 🎁");
                !llIi1 && (await l1ilIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lI1iiI.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(lI1iiI);
                break;
            }
          } else {
            console.log("💨 空气");
            $.message.insert("💨 空气");
          }
        } else {
          lIillI.resp_msg ? (["未开始", "结束", "不存在", "不在"].some(ilIlI1 => lIillI.resp_msg.includes(ilIlI1)) && ($.runEnd = true), console.log(I1iil1 + " " + lIillI.resp_msg), $.message.fix(lIillI.resp_msg)) : console.log("❓" + I1iil1 + " " + JSON.stringify(lIillI));
        }
        break;
    }
  } catch (IIlilI) {
    console.log("❌ 未能正确处理 " + I1iil1 + " 请求响应 " + (IIlilI.message || IIlilI));
  }
}
async function Ill111(Illlll) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let llli1l = $.newbaseUrl,
    lI1ii1 = {},
    llli1i = {},
    iiI1l1 = "POST";
  switch (Illlll) {
    case "login":
      llli1l += "/api/user-info/login";
      lI1ii1 = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      llli1l += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      iiI1l1 = "GET";
      llli1l += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      llli1l += "/api/active/basicInfo";
      lI1ii1 = {
        activityId: $.activityId
      };
      break;
    case "activity":
      llli1l += "/api/task/dailyGrabs/activity";
      break;
    case "drawPrize":
      llli1l += "/api/prize/drawPrize";
      break;
    case "dayReceive":
      llli1l += "/api/task/dailyGrabs/dayReceive";
      lI1ii1 = {
        prizeInfoId: $.prizeInfoId
      };
      break;
    default:
      console.log("❌ 未知请求 " + Illlll);
      return;
  }
  const i11lI1 = iiI1l1 === "POST" && $.pathname.includes("/prod/cc/interactsaas") && ll11li.isDefenseApi(llli1l.replace($.newbaseUrl, "").split("?")[0]);
  i11lI1 && (lI1ii1.actId = $.activityId, llli1i = {
    ecyText: ll11li.encrypt(lI1ii1, $.pinToken, $.te)
  });
  const liliiI = {
    url: llli1l,
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
    body: JSON.stringify(i11lI1 ? llli1i : lI1ii1),
    timeout: 30000
  };
  $.token && (liliiI.headers.token = $.token);
  iiI1l1 === "GET" && (delete liliiI.body, delete liliiI.headers["Content-Type"]);
  const ilIIiI = 5;
  let lIl1ii = 0,
    lIl1il = null,
    Ii1l11 = false;
  while (lIl1ii < ilIIiI) {
    lIl1ii > 0 && (await $.wait(1000));
    const {
      err: ll1lll,
      res: Illlil,
      data: I1iili
    } = await I1iI11(liliiI, iiI1l1);
    if (ll1lll) {
      if (typeof ll1lll === "string" && ll1lll.includes("Timeout awaiting 'request'")) {
        lIl1il = Illlll + " 请求超时，请检查网络重试";
      } else {
        const lI1ill = Illlil?.["statusCode"];
        if (lI1ill) {
          if ([403, 493].includes(lI1ill)) {
            lIl1il = Illlll + " 请求失败，IP被限制（Response code " + lI1ill + "）";
            Ii1l11 = true;
          } else {
            if ([400, 404].includes(lI1ill)) {
              lIl1il = Illlll + " 请求配置参数错误，请联系开发者进行反馈（Response code " + lI1ill + "）";
            } else {
              [500].includes(lI1ill) && i11lI1 ? liliiI.body = JSON.stringify({
                ecyText: ll11li.encrypt(lI1ii1, $.pinToken, $.te)
              }) : lIl1il = Illlll + " 请求失败（Response code " + lI1ill + "）";
            }
          }
        } else {
          lIl1il = Illlll + " 请求失败 => " + (ll1lll.message || ll1lll);
        }
      }
      lIl1ii++;
    } else {
      const I1iill = IIiiIi.getResponseCookie(Illlil);
      switch (Illlll) {
        case "initPinToken":
          const lIilii = IIiiIi.getCookieValue(I1iill, "te");
          lIilii && ($.te = lIilii);
          break;
      }
      if (I1iili) {
        try {
          const lIilil = JSON.parse(I1iili);
          I1lII1(Illlll, lIilil);
          break;
        } catch (lIl1ll) {
          lIl1il = "❌ " + Illlll + " 接口响应数据解析失败: " + lIl1ll.message;
          console.log("🚫 " + Illlll + " => " + String(I1iili));
          lIl1ii++;
        }
      } else {
        if (i11lI1) {
          liliiI.body = JSON.stringify({
            ecyText: ll11li.encrypt(lI1ii1, $.pinToken, $.te)
          });
        }
        lIl1il = "❌ " + Illlll + " 接口无响应数据";
        lIl1ii++;
      }
      Ii1l11 = false;
    }
  }
  lIl1ii >= ilIIiI && (console.log(lIl1il), Ii1l11 && !IliIII && ($.outFlag = true, $.message && $.message.fix(lIl1il)));
}
async function I1iI11(I1iilI, Ii1II1 = "POST") {
  if (Ii1II1 === "POST") {
    return new Promise(async IilI1 => {
      $.post(I1iilI, (l1lI1, Ili1I1, lI1I1i) => {
        IilI1({
          err: l1lI1,
          res: Ili1I1,
          data: lI1I1i
        });
      });
    });
  } else {
    if (Ii1II1 === "GET") {
      return new Promise(async I1Ili1 => {
        $.get(I1iilI, (l1liil, i1ll1, lilI1I) => {
          I1Ili1({
            err: l1liil,
            res: i1ll1,
            data: lilI1I
          });
        });
      });
    } else {
      const lI1I1l = "不支持的请求方法";
      return {
        err: lI1I1l,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";