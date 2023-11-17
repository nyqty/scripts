/**

活动名称：关注商品有礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10053&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10053&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_followGoods_url // 活动链接
		jd_lzkj_loreal_followGoods_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_followGoods_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_followGoods_break // 493后继续执行，默认退出运行（true/false）

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#关注商品有礼（超级无线）
1 1 1 1 * jd_lzkj_loreal_followGoods.js, tag=关注商品有礼（超级无线）, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("关注商品有礼（超级无线）");
var version_ = "jsjiami.com.v7";
const IIiiIl = require("./jdCookie"),
  l1ilIl = require("./function/jdCommon"),
  IIiiIi = require("./function/sendJDNotify"),
  l1ilIi = require("./function/krgetToken"),
  {
    wuxianDefense: l11iIi
  } = require("./function/jdCrypto"),
  {
    loreal_savePrize: ll11li
  } = require("./function/krsavePrize"),
  iliIlI = process.env.jd_lzkj_loreal_followGoods_url || "",
  lI111I = process.env.jd_lzkj_loreal_followGoods_opencard === "true",
  IlilI = process.env.jd_lzkj_loreal_followGoods_Notify === "true",
  llIi1 = process.env.jd_lzkj_loreal_followGoods_break === "true";
let IliIII = "",
  II1l = "";
const liiiiI = Object.keys(IIiiIl).map(I1iI11 => IIiiIl[I1iI11]).filter(II11 => II11);
!liiiiI[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!iliIlI) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const ii1II1 = l1ilIl.parseUrl(iliIlI);
  if (!ii1II1) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iliIlI;
  $.activityId = l1ilIl.getUrlParameter(iliIlI, "activityId");
  $.activityType = l1ilIl.getUrlParameter(iliIlI, "activityType");
  $.hostname = ii1II1.hostname;
  $.pathname = ii1II1.pathname;
  let iliIll = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      iliIll = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (iliIll = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + iliIll;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !iliIll || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  IIiiIi.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let ii1IIi = 0; ii1IIi < liiiiI.length; ii1IIi++) {
    $.index = ii1IIi + 1;
    IliIII = liiiiI[ii1IIi];
    II1l = liiiiI[ii1IIi];
    l1ilIl.setCookie(II1l);
    $.UserName = decodeURIComponent(l1ilIl.getCookieValue(IliIII, "pt_pin"));
    $.UA = l1ilIl.genUA($.UserName);
    $.UUID = l1ilIl.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = IIiiIi.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await II1i();
    l1ilIl.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  IlilI && IIiiIi.getMessage() && (IIiiIi.updateContent(IIiiIi.content + ("\n【活动地址】" + $.activityUrl)), await IIiiIi.push());
})().catch(I1ll1l => $.logErr(I1ll1l)).finally(() => $.done());
async function II1i() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await l1ilIi(II1l, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await I1lII1("login");
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
          await I1lII1("follow");
          await $.wait(500);
          await I1lII1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await I1lII1("follow");
          await $.wait(500);
          await I1lII1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (lI111I) {
            const i1l1I1 = await l1ilIl.joinShopMember($.venderId);
            if (i1l1I1) {
              console.log("加入店铺会员成功");
              await I1lII1("login");
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
      await I1lII1("initPinToken");
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
      await I1lII1("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10053":
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
    await I1lII1("getFollowGoods");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await I1lII1("drawPrize");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      const illlll = $.prizeInfo[0],
        IIIIiI = illlll.prizeName,
        II1I1 = illlll.leftNum,
        i1i111 = illlll.prizeType,
        ii1l1I = II1I1 >= 1;
      let lI1lII = "" + IIIIiI + (i1i111 === 5 ? "[专享价]" : i1i111 === 3 ? "[实物]" : "") + "（" + (II1I1 >= 1 ? "剩余" + II1I1 + "件" : "已发完") + "）\n";
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + lI1lII);
      IIiiIi.updateContent(IIiiIi.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】" + lI1lII));
      const lIill1 = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        iiI1i1 = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const ilIlII = Date.now();
          if ($.actStartTime && ilIlII < $.actStartTime) {
            console.log("活动将在 " + lIill1 + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + lIill1);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && ilIlII > $.actEndTime) {
            console.log("活动已于 " + iiI1i1 + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + iiI1i1);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + lIill1 + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + lIill1);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + iiI1i1 + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + iiI1i1);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!ii1l1I) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
      if (IIIIiI.includes("优惠券")) {
        console.log("垃圾活动不跑了~");
        $.message.fix("垃圾活动不跑");
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    $.taskId = $.activityContent[0]?.["taskId"];
    const lI1lIl = $.activityContent[0]?.["status"],
      liiili = $.activityContent[0]?.["skuInfoVO"] || [];
    $.completeCount = $.activityContent[0]?.["completeCount"];
    const I1ll11 = $.activityContent[0]?.["finishNum"];
    (lI1lIl === 1 || $.completeCount >= I1ll11) && (console.log("已经参与过了哦~"), $.message.fix("已参与过"));
    $.getPrize = false;
    const lI1lIi = $.activityContent[0]?.["oneClickPurchase"];
    if (lI1lIi === 0) {
      $.skuId = "";
      await I1lII1("followGoods");
      !$.getPrize && (console.log("💨 空气"), $.message.insert("💨 空气"));
    } else {
      for (let lIillI of liiili) {
        if (lIillI.status === 1) {
          continue;
        }
        $.skuId = lIillI.skuId;
        await I1lII1("followGoods");
        if ($.getPrize || $.runEnd || $.outFlag || $.skipRun) {
          break;
        }
        $.completeCount >= I1ll11 && (console.log("💨 空气"), $.message.insert("💨 空气"));
        await $.wait(500);
      }
    }
  } catch (liliii) {
    console.log("❌ 脚本运行遇到了错误\n" + liliii);
  }
}
async function illli1(iIiilI, iIiiil) {
  try {
    switch (iIiilI) {
      case "login":
        if (iIiiil.resp_code === 0 && iIiiil.data) {
          $.token = iIiiil?.["data"]?.["token"];
          $.joinInfo = iIiiil?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = iIiiil?.["data"]?.["shopId"];
          $.venderId = l1ilIl.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = iIiiil?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          iIiiil.resp_msg ? (console.log(iIiilI + " " + iIiiil.resp_msg), $.message.fix(iIiiil.resp_msg), $.skipRun = true) : console.log("❓" + iIiilI + " " + JSON.stringify(iIiiil));
        }
        break;
      case "follow":
        if (!(iIiiil.resp_code === 0)) {
          iIiiil.resp_msg ? (console.log(iIiilI + " " + iIiiil.resp_msg), $.message.fix(iIiiil.resp_msg), $.skipRun = true) : console.log("❓" + iIiilI + " " + JSON.stringify(iIiiil));
        }
        break;
      case "initPinToken":
        if (iIiiil.resp_code === 0 && iIiiil.data) {
          iIiiil = JSON.parse(iIiiil.data);
          if (iIiiil.resp_code === 0 && iIiiil.data) {
            $.pinToken = iIiiil?.["data"]?.["pinToken"];
            $.encryptPin = iIiiil?.["data"]?.["encryptPin"];
          } else {
            if (iIiiil.resp_code === 1000) {
              console.log(iIiilI + " " + iIiiil.resp_msg);
              $.message.fix(iIiiil.resp_msg);
              $.skipRun = true;
            } else {
              if (iIiiil.resp_msg) {
                console.log(iIiilI + " " + iIiiil.resp_msg);
                $.message.fix(iIiiil.resp_msg);
                $.skipRun = true;
              } else {
                console.log("❓" + iIiilI + " " + JSON.stringify(iIiiil));
                $.skipRun = true;
              }
            }
          }
        } else {
          console.log("❓" + iIiilI + " " + JSON.stringify(iIiiil));
        }
        break;
      case "basicInfo":
        if (iIiiil.resp_code === 0 && iIiiil.data) {
          $.actStartTime = iIiiil.data?.["startTime"];
          $.actEndTime = iIiiil.data?.["endTime"];
          $.actStatus = iIiiil.data?.["actStatus"];
          !$.activityType && ($.activityType = String(iIiiil.data?.["actType"] || ""));
        } else {
          iIiiil.resp_msg ? (console.log(iIiilI + " " + iIiiil.resp_msg), $.message.fix(iIiiil.resp_msg)) : console.log("❓" + iIiilI + " " + JSON.stringify(iIiiil));
        }
        break;
      case "getFollowGoods":
        if (iIiiil.resp_code === 0 && iIiiil.data) {
          $.activityContent = iIiiil.data;
        } else {
          iIiiil.resp_msg ? (console.log(iIiilI + " " + iIiiil.resp_msg), $.message.fix(iIiiil.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(lilii1 => iIiiil.resp_msg.includes(lilii1)) && ($.runEnd = true)) : (console.log("❓" + iIiilI + " " + JSON.stringify(iIiiil)), $.skipRun = true);
        }
        break;
      case "drawPrize":
        if (iIiiil.resp_code === 0) {
          $.prizeInfo = iIiiil?.["data"]?.["prizeInfo"] || [];
        } else {
          if (iIiiil.resp_msg) {
            console.log(iIiilI + " " + iIiiil.resp_msg);
            ["未开始", "结束", "不存在", "不在"].some(ll1lil => iIiiil.resp_msg.includes(ll1lil)) && ($.runEnd = true);
            $.message.fix(iIiiil.resp_msg);
          } else {
            console.log("❓" + iIiilI + " " + JSON.stringify(iIiiil));
          }
        }
        break;
      case "followGoods":
        if (iIiiil.resp_code === 0) {
          $.completeCount += 1;
          const li11 = iIiiil.data;
          if (li11) {
            $.getPrize = true;
            switch (li11.prizeType) {
              case 1:
                console.log("🎉 " + li11.prizeName + " 🐶");
                $.message.insert(li11.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const ilIlI1 = iIiiil.data.addressId,
                  I1Illi = li11.prizeName;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + I1Illi);
                if (li11.showImg) {
                  console.log("预览图片：" + li11.showImg);
                }
                const IIlilI = {
                    baseUrl: $.baseUrl,
                    newbaseUrl: $.newbaseUrl,
                    cookie: II1l,
                    ua: $.UA,
                    token: $.token,
                    prizeName: I1Illi,
                    orderCode: ilIlI1
                  },
                  Illlll = await ll11li(IIlilI);
                !IlilI && Illlll && (await IIiiIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + I1Illi + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(I1Illi + "(" + (Illlll ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + li11.prizeName + " 🎟️");
                $.message.insert("🗑️ " + li11.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + li11.prizeName + " 🧧");
                $.message.insert("🎉 " + li11.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + li11.prizeName + " 🎁");
                $.message.insert("🎉 恭喜获得" + li11.prizeName + " 🎁");
                !IlilI && (await IIiiIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + li11.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(li11);
                break;
            }
          }
        } else {
          iIiiil.resp_msg ? (["未开始", "结束", "不存在", "不在"].some(llli1l => iIiiil.resp_msg.includes(llli1l)) && ($.runEnd = true), ["会员等级不足"].some(llli1i => iIiiil.resp_msg.includes(llli1i)) && ($.skipRun = true), console.log(iIiiil.resp_msg), $.message.fix(iIiiil.resp_msg)) : console.log("❓" + iIiilI + " " + JSON.stringify(iIiiil));
        }
        break;
    }
  } catch (iiI1l1) {
    console.log("❌ 未能正确处理 " + iIiilI + " 请求响应 " + (iiI1l1.message || iiI1l1));
  }
}
async function I1lII1(i11lI1) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let ilIIiI = $.newbaseUrl,
    lIl1ii = {},
    lIl1il = {},
    Ii1l11 = "POST";
  switch (i11lI1) {
    case "login":
      ilIIiI += "/api/user-info/login";
      lIl1ii = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      ilIIiI += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      Ii1l11 = "GET";
      ilIIiI += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      ilIIiI += "/api/active/basicInfo";
      lIl1ii = {
        activityId: $.activityId
      };
      break;
    case "getFollowGoods":
      ilIIiI += "/api/task/followGoods/getFollowGoods";
      break;
    case "drawPrize":
      ilIIiI += "/api/prize/drawPrize";
      break;
    case "followGoods":
      ilIIiI += "/api/task/followGoods/followGoods";
      lIl1ii = {
        taskId: $.taskId || "",
        skuId: $.skuId || ""
      };
      break;
    default:
      console.log("❌ 未知请求 " + i11lI1);
      return;
  }
  const IIlii1 = Ii1l11 === "POST" && $.pathname.includes("/prod/cc/interactsaas") && l11iIi.isDefenseApi(ilIIiI.replace($.newbaseUrl, "").split("?")[0]);
  IIlii1 && (lIl1ii.actId = $.activityId, lIl1il = {
    ecyText: l11iIi.encrypt(lIl1ii, $.pinToken, $.te)
  });
  const iiI1lI = {
    url: ilIIiI,
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
    body: JSON.stringify(IIlii1 ? lIl1il : lIl1ii),
    timeout: 30000
  };
  $.token && (iiI1lI.headers.token = $.token);
  Ii1l11 === "GET" && (delete iiI1lI.body, delete iiI1lI.headers["Content-Type"]);
  const IliIlI = 5;
  let IIliiI = 0,
    i1111l = null,
    i1111i = false;
  while (IIliiI < IliIlI) {
    if (IIliiI > 0) {
      await $.wait(1000);
    }
    const {
      err: l111I,
      res: ll1lli,
      data: ll1lll
    } = await Ill111(iiI1lI, Ii1l11);
    if (l111I) {
      if (typeof l111I === "string" && l111I.includes("Timeout awaiting 'request'")) {
        i1111l = i11lI1 + " 请求超时，请检查网络重试";
      } else {
        const I1iili = ll1lli?.["statusCode"];
        if (I1iili) {
          if ([403, 493].includes(I1iili)) {
            i1111l = i11lI1 + " 请求失败，IP被限制（Response code " + I1iili + "）";
            i1111i = true;
          } else {
            if ([400, 404].includes(I1iili)) {
              i1111l = i11lI1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1iili + "）";
            } else {
              [500].includes(I1iili) && IIlii1 ? iiI1lI.body = JSON.stringify({
                ecyText: l11iIi.encrypt(lIl1ii, $.pinToken, $.te)
              }) : i1111l = i11lI1 + " 请求失败（Response code " + I1iili + "）";
            }
          }
        } else {
          i1111l = i11lI1 + " 请求失败 => " + (l111I.message || l111I);
        }
      }
      IIliiI++;
    } else {
      const Il1II = l1ilIl.getResponseCookie(ll1lli),
        i1lll = false;
      i1lll && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + i11lI1 + " 响应Body => " + (ll1lll || "无") + "\n"), console.log("🔧 " + i11lI1 + " 响应Cookie => " + (Il1II || "无") + "\n"), console.log("🔧 " + i11lI1 + " 请求参数"), console.log(iiI1lI), console.log("\n---------------------------------------------------\n"));
      switch (i11lI1) {
        case "initPinToken":
          const I1iill = l1ilIl.getCookieValue(Il1II, "te");
          I1iill && ($.te = I1iill);
          break;
      }
      if (ll1lll) {
        try {
          const i1lli = JSON.parse(ll1lll);
          illli1(i11lI1, i1lli);
          break;
        } catch (i11111) {
          i1111l = "❌ " + i11lI1 + " 接口响应数据解析失败: " + i11111.message;
          console.log("🚫 " + i11lI1 + " => " + String(ll1lll));
          IIliiI++;
        }
      } else {
        IIlii1 && (iiI1lI.body = JSON.stringify({
          ecyText: l11iIi.encrypt(lIl1ii, $.pinToken, $.te)
        }));
        i1111l = "❌ " + i11lI1 + " 接口无响应数据";
        IIliiI++;
      }
      i1111i = false;
    }
  }
  if (IIliiI >= IliIlI) {
    console.log(i1111l);
    i1111i && !llIi1 && ($.outFlag = true, $.message && $.message.fix(i1111l));
  }
}
async function Ill111(lIilil, lIl1ll = "POST") {
  if (lIl1ll === "POST") {
    return new Promise(async lilili => {
      $.post(lIilil, (IliIll, iIiili, lilill) => {
        lilili({
          err: IliIll,
          res: iIiili,
          data: lilill
        });
      });
    });
  } else {
    if (lIl1ll === "GET") {
      return new Promise(async Ili1I1 => {
        $.get(lIilil, (lI1I1i, liI1II, i1Iii1) => {
          Ili1I1({
            err: lI1I1i,
            res: liI1II,
            data: i1Iii1
          });
        });
      });
    } else {
      const l1liii = "不支持的请求方法";
      return {
        err: l1liii,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";
