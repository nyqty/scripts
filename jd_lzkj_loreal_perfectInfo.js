/*
活动名称：完善有礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10049&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10049&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_perfectInfo_url // 活动链接
		jd_lzkj_loreal_perfectInfo_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_perfectInfo_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_perfectInfo_break // 493后继续执行，默认退出运行（true/false）
		
请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#完善有礼（超级无线）
1 1 1 1 * jd_lzkj_loreal_perfectInfo.js, tag=完善有礼（超级无线）, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('完善有礼（超级无线）')
var version_ = "jsjiami.com.v7";
const II1i = require("./jdCookie"),
  illli1 = require("./function/jdCommon"),
  I1lII1 = require("./function/sendJDNotify"),
  Ill111 = require("./function/krgetToken"),
  {
    wuxianDefense: I1iI11
  } = require("./function/jdCrypto"),
  {
    loreal_savePrize: II11
  } = require("./function/krsavePrize"),
  l1ilII = process.env.jd_lzkj_loreal_perfectInfo_url || "",
  ii1II1 = process.env.jd_lzkj_loreal_perfectInfo_opencard === "true",
  iliIll = process.env.jd_lzkj_loreal_perfectInfo_break === "true",
  llliIl = process.env.jd_lzkj_loreal_perfectInfo_Notify === "true";
let iliIli = "",
  illliI = "";
const ii1III = Object.keys(II1i).map(liiiii => II1i[liiiii]).filter(II1I => II1I);
!ii1III[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!l1ilII) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const Ilil1 = illli1.parseUrl(l1ilII);
  if (!Ilil1) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = l1ilII;
  $.activityId = illli1.getUrlParameter(l1ilII, "activityId");
  $.activityType = illli1.getUrlParameter(l1ilII, "activityType");
  $.hostname = Ilil1.hostname;
  $.pathname = Ilil1.pathname;
  let IliII1 = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      IliII1 = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (IliII1 = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + IliII1;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !IliII1 || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  I1lII1.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let IIiiII = 0; IIiiII < ii1III.length; IIiiII++) {
    $.index = IIiiII + 1;
    iliIli = ii1III[IIiiII];
    illliI = ii1III[IIiiII];
    illli1.setCookie(illliI);
    $.UserName = decodeURIComponent(illli1.getCookieValue(iliIli, "pt_pin"));
    $.UA = illli1.genUA($.UserName);
    $.UUID = illli1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = I1lII1.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await i11iIl();
    illli1.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  if (llliIl && I1lII1.getMessage()) {
    I1lII1.updateContent(I1lII1.content + ("\n【活动地址】" + $.activityUrl));
    await I1lII1.push();
  }
})().catch(Ilill => $.logErr(Ilill)).finally(() => $.done());
async function i11iIl() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await Ill111(illliI, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await l11iIl("login");
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
          await l11iIl("follow");
          await $.wait(500);
          await l11iIl("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await l11iIl("follow");
          await $.wait(500);
          await l11iIl("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (ii1II1) {
            const ii1l1I = await illli1.joinShopMember($.venderId);
            if (ii1l1I) {
              console.log("加入店铺会员成功");
              await l11iIl("login");
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
      await l11iIl("initPinToken");
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
      await l11iIl("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10049":
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
    await l11iIl("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      const liliil = $.activityContent?.["prizeName"];
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + liliil + "\n");
      I1lII1.updateContent(I1lII1.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】" + $.prizeName));
      const I1iil1 = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        lIillI = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const lI1il1 = Date.now();
          if ($.actStartTime && lI1il1 < $.actStartTime) {
            console.log("活动将在 " + I1iil1 + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + I1iil1);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && lI1il1 > $.actEndTime) {
            console.log("活动已于 " + lIillI + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + lIillI);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + I1iil1 + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + I1iil1);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + lIillI + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + lIillI);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
    }
    const i1i111 = $.activityContent?.["flag"];
    $.allInfo = $.activityContent?.["allInfo"];
    $.prizeId = $.activityContent?.["prizeId"];
    switch (i1i111) {
      case "001":
        await l11iIl("addInfo");
        await $.wait(500);
        await l11iIl("activity");
        await $.wait(500);
        await l11iIl("acquire");
        break;
      case "003":
        await l11iIl("acquire");
        break;
      case "002":
        console.log("已经领取过奖品了");
        $.message.fix("已领过");
        break;
      default:
        console.log("未知活动状态：" + i1i111);
        $.message.fix("未知活动状态：" + i1i111);
        break;
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
  } catch (i11lIl) {
    console.log("❌ 脚本运行遇到了错误\n" + i11lIl);
  }
}
async function ll11ll(lI1iii, i11lIi) {
  try {
    switch (lI1iii) {
      case "login":
        if (i11lIi.resp_code === 0 && i11lIi.data) {
          $.token = i11lIi?.["data"]?.["token"];
          $.joinInfo = i11lIi?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = i11lIi?.["data"]?.["shopId"];
          $.venderId = illli1.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = i11lIi?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          i11lIi.resp_msg ? (console.log(lI1iii + " " + i11lIi.resp_msg), $.message.fix(i11lIi.resp_msg), $.skipRun = true) : console.log("❓" + lI1iii + " " + JSON.stringify(i11lIi));
        }
        break;
      case "follow":
        if (!(i11lIi.resp_code === 0)) {
          i11lIi.resp_msg ? (console.log(lI1iii + " " + i11lIi.resp_msg), $.message.fix(i11lIi.resp_msg), $.skipRun = true) : console.log("❓" + lI1iii + " " + JSON.stringify(i11lIi));
        }
        break;
      case "initPinToken":
        if (i11lIi.resp_code === 0 && i11lIi.data) {
          i11lIi = JSON.parse(i11lIi.data);
          if (i11lIi.resp_code === 0 && i11lIi.data) {
            $.pinToken = i11lIi?.["data"]?.["pinToken"];
            $.encryptPin = i11lIi?.["data"]?.["encryptPin"];
          } else {
            if (i11lIi.resp_code === 1000) {
              console.log(lI1iii + " " + i11lIi.resp_msg);
              $.message.fix(i11lIi.resp_msg);
              $.skipRun = true;
            } else {
              i11lIi.resp_msg ? (console.log(lI1iii + " " + i11lIi.resp_msg), $.message.fix(i11lIi.resp_msg), $.skipRun = true) : (console.log("❓" + lI1iii + " " + JSON.stringify(i11lIi)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + lI1iii + " " + JSON.stringify(i11lIi));
        }
        break;
      case "basicInfo":
        if (i11lIi.resp_code === 0 && i11lIi.data) {
          $.actStartTime = i11lIi.data?.["startTime"];
          $.actEndTime = i11lIi.data?.["endTime"];
          $.actStatus = i11lIi.data?.["actStatus"];
          !$.activityType && ($.activityType = String(i11lIi.data?.["actType"] || ""));
        } else {
          i11lIi.resp_msg ? (console.log(lI1iii + " " + i11lIi.resp_msg), $.message.fix(i11lIi.resp_msg)) : console.log("❓" + lI1iii + " " + JSON.stringify(i11lIi));
        }
        break;
      case "activity":
        if (i11lIi.resp_code === 0 && i11lIi.data) {
          $.activityContent = i11lIi.data;
        } else {
          i11lIi.resp_msg ? (console.log(lI1iii + " " + i11lIi.resp_msg), ["未开始", "结束", "不存在", "不在"].some(ll1lil => i11lIi.resp_msg.includes(ll1lil)) && ($.runEnd = true), $.message.fix(i11lIi.resp_msg)) : console.log("❓" + lI1iii + " " + JSON.stringify(i11lIi));
        }
        break;
      case "addInfo":
        if (!(i11lIi.resp_code === 0)) {
          if (i11lIi.resp_code === 1000) {
            console.log(i11lIi.resp_msg);
            $.message.fix(i11lIi.resp_msg);
          } else {
            if (i11lIi.resp_msg) {
              console.log(lI1iii + " " + i11lIi.resp_msg);
              for (let IIlil1 of ["未开始", "结束", "不存在", "不在"]) {
                if (i11lIi.resp_msg.includes(IIlil1)) {
                  $.runEnd = true;
                  break;
                }
              }
              $.message.fix(i11lIi.resp_msg);
            } else {
              console.log("❓" + lI1iii + " " + JSON.stringify(i11lIi));
            }
          }
        }
        break;
      case "acquire":
        if (i11lIi.resp_code === 0) {
          const ll1lii = i11lIi.data;
          if (ll1lii) {
            switch (ll1lii.prizeType) {
              case 1:
                console.log("🎉 " + ll1lii.prizeName + " 🐶");
                $.message.insert(ll1lii.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const li11 = i11lIi.data.addressId,
                  ilIlI1 = ll1lii.prizeName;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + ilIlI1);
                if (ll1lii.showImg) {
                  console.log("预览图片：" + ll1lii.showImg);
                }
                const I1Illi = {
                    baseUrl: $.baseUrl,
                    newbaseUrl: $.newbaseUrl,
                    cookie: illliI,
                    ua: $.UA,
                    token: $.token,
                    prizeName: ilIlI1,
                    orderCode: li11
                  },
                  IIlilI = await II11(I1Illi);
                !llliIl && IIlilI && (await I1lII1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + ilIlI1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(ilIlI1 + "(" + (IIlilI ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + ll1lii.prizeName + " 🎟️");
                $.message.insert("🗑️ " + ll1lii.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + ll1lii.prizeName + " 🧧");
                $.message.insert("🎉 " + ll1lii.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + ll1lii.prizeName + " 🎁");
                $.message.insert("🎉 恭喜获得" + ll1lii.prizeName + " 🎁");
                !llliIl && (await I1lII1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + ll1lii.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(ll1lii);
                break;
            }
          } else {
            console.log("💨 空气");
            $.message.insert("💨 空气");
          }
        } else {
          i11lIi.resp_msg ? (console.log(i11lIi.resp_msg), $.message.fix(i11lIi.resp_msg), ["未开始", "结束", "不存在", "不在"].some(llli1i => i11lIi.resp_msg.includes(llli1i)) && ($.runEnd = true)) : console.log("❓" + lI1iii + " " + JSON.stringify(i11lIi));
        }
        break;
    }
  } catch (iiI1l1) {
    console.log("❌ 未能正确处理 " + lI1iii + " 请求响应 " + (iiI1l1.message || iiI1l1));
  }
}
async function l11iIl(i11lI1) {
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
    case "activity":
      ilIIiI += "/api/task/perfectInfo/activity";
      break;
    case "acquire":
      ilIIiI += "/api/prize/receive/acquire";
      lIl1ii = {
        prizeInfoId: $.prizeId
      };
      break;
    case "addInfo":
      const Illlil = i11iIi();
      for (let I1iili of $.allInfo) {
        switch (I1iili?.["num"]) {
          case "info01":
            I1iili.content = Illlil.name;
            break;
          case "info02":
            I1iili.content = Illlil.birthDay;
            break;
          case "info03":
            I1iili.content = Illlil.phone;
            break;
          case "info04":
            I1iili.content = Illlil.gender;
            break;
          case "info05":
            I1iili.content = Illlil.email;
            break;
          case "info06":
            I1iili.content = Illlil.address;
            break;
          case "info07":
            I1iili.content = Illlil.address;
            break;
          case "7":
            I1iili.content = Illlil.profession;
            break;
          default:
            console.log(I1iili?.["title"]);
            break;
        }
      }
      ilIIiI += "/api/task/perfectInfo/addInfo";
      lIl1ii = {
        perfectInfo: $.allInfo
      };
      break;
    default:
      console.log("❌ 未知请求 " + i11lI1);
      return;
  }
  const IIlii1 = Ii1l11 === "POST" && $.pathname.includes("/prod/cc/interactsaas") && I1iI11.isDefenseApi(ilIIiI.replace($.newbaseUrl, "").split("?")[0]);
  IIlii1 && (lIl1ii.actId = $.activityId, lIl1il = {
    ecyText: I1iI11.encrypt(lIl1ii, $.pinToken, $.te)
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
    IIliiI > 0 && (await $.wait(1000));
    const {
      err: Illlii,
      res: lI1ili,
      data: Il1II
    } = await IIIIll(iiI1lI, Ii1l11);
    if (Illlii) {
      if (typeof Illlii === "string" && Illlii.includes("Timeout awaiting 'request'")) {
        i1111l = i11lI1 + " 请求超时，请检查网络重试";
      } else {
        const I1iill = lI1ili?.["statusCode"];
        if (I1iill) {
          if ([403, 493].includes(I1iill)) {
            i1111l = i11lI1 + " 请求失败，IP被限制（Response code " + I1iill + "）";
            i1111i = true;
          } else {
            if ([400, 404].includes(I1iill)) {
              i1111l = i11lI1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1iill + "）";
            } else {
              [500].includes(I1iill) && IIlii1 ? iiI1lI.body = JSON.stringify({
                ecyText: I1iI11.encrypt(lIl1ii, $.pinToken, $.te)
              }) : i1111l = i11lI1 + " 请求失败（Response code " + I1iill + "）";
            }
          }
        } else {
          i1111l = i11lI1 + " 请求失败 => " + (Illlii.message || Illlii);
        }
      }
      IIliiI++;
    } else {
      const Il1I1 = illli1.getResponseCookie(lI1ili);
      switch (i11lI1) {
        case "initPinToken":
          const Ii1III = illli1.getCookieValue(Il1I1, "te");
          Ii1III && ($.te = Ii1III);
          break;
      }
      if (Il1II) {
        try {
          const l111i = JSON.parse(Il1II);
          ll11ll(i11lI1, l111i);
          break;
        } catch (I1iilI) {
          i1111l = "❌ " + i11lI1 + " 接口响应数据解析失败: " + I1iilI.message;
          console.log("🚫 " + i11lI1 + " => " + String(Il1II));
          IIliiI++;
        }
      } else {
        IIlii1 && (iiI1lI.body = JSON.stringify({
          ecyText: I1iI11.encrypt(lIl1ii, $.pinToken, $.te)
        }));
        i1111l = "❌ " + i11lI1 + " 接口无响应数据";
        IIliiI++;
      }
      i1111i = false;
    }
  }
  IIliiI >= IliIlI && (console.log(i1111l), i1111i && !iliIll && ($.outFlag = true, $.message && $.message.fix(i1111l)));
}
function i11iIi() {
  function lI1ilI(i1lii, iilIII) {
    let liI1Il = "";
    for (let I1iIi = i1lii; I1iIi > 0; --I1iIi) {
      liI1Il += iilIII[Math.floor(Math.random() * iilIII.length)];
    }
    return liI1Il;
  }
  const IllliI = ["王", "李", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "何", "郭", "马", "罗", "梁", "宋", "郑", "谢", "韩", "唐", "冯", "于", "董", "萧", "程", "曹", "袁", "邓", "许", "傅", "沈", "曾", "彭", "吕", "苏", "卢", "蒋", "蔡", "贾", "丁", "魏", "薛", "叶", "阎", "余", "潘", "杜", "戴", "夏", "钟", "汪", "田", "任", "姜", "范", "方", "石", "姚", "谭", "廖", "邹", "熊", "金", "陆", "郝", "孔", "白", "崔", "康", "毛", "邱", "秦", "江", "史", "顾", "侯", "邵", "孟", "龙", "万", "段", "雷", "钱", "汤", "尹", "黎", "易", "常", "武", "乔", "贺", "赖", "龚", "文"],
    IliIll = ["伟", "刚", "勇", "毅", "俊", "峰", "强", "军", "平", "保", "东", "文", "辉", "力", "明", "永", "健", "世", "广", "志", "义", "兴", "良", "海", "山", "仁", "波", "宁", "贵", "福", "生", "龙", "元", "全", "国", "胜", "学", "祥", "才", "发", "武", "新", "利", "清", "飞", "彬", "富", "顺", "信", "子", "杰", "涛", "昌", "成", "康", "星", "光", "天", "达", "安", "岩", "中", "茂", "进", "林", "有", "坚", "和", "彪", "博", "诚", "先", "敬", "震", "振", "壮", "会", "思", "群", "豪", "心", "邦", "承", "乐", "绍", "功", "松", "善", "厚", "庆", "磊", "民", "友", "裕", "河", "哲", "江", "超", "浩", "亮", "政", "谦", "亨", "奇", "固", "之", "轮", "翰", "朗", "伯", "宏", "言", "若", "鸣", "朋", "斌", "梁", "栋", "维", "启", "克", "伦", "翔", "旭", "鹏", "泽", "晨", "辰", "士", "以", "建", "家", "致", "树", "炎", "德", "行", "时", "泰", "盛", "雄", "琛", "钧", "冠", "策", "腾", "楠", "榕", "风", "航", "弘", "涛"],
    iIiili = ["丽", "芳", "娜", "敏", "静", "秀", "娟", "英", "华", "慧", "巧", "美", "娥", "瑞", "霞", "凤", "洁", "梅", "琳", "素", "云", "莲", "真", "环", "雪", "荣", "爱", "妹", "露", "艳", "佳", "琴", "兰", "蓉", "萍", "珍", "贞", "仙", "芹", "蕾", "华", "彩", "春", "菊", "勤", "珠", "翠", "雅", "芝", "玉", "萌", "婷", "琼"],
    lilill = Math.random() < 0.5,
    IilI1 = IllliI[Math.floor(Math.random() * IllliI.length)],
    l1lI1 = lilill ? IliIll : iIiili.filter(l1Ii1 => !l1Ii1.includes("美")),
    Ili1I1 = l1lI1[Math.floor(Math.random() * l1lI1.length)],
    lI1I1i = lilill ? "男" : "女",
    liI1II = ["医生", "教师", "程序员", "律师", "工程师", "设计师", "销售", "市场营销", "记者", "作家", "演员", "歌手", "画家", "摄影师", "主持人", "模特", "运动员", "教练", "裁判", "军人", "警察", "消防员", "厨师", "服务员", "店员", "会计", "金融分析师", "投资顾问", "房地产经纪人", "建筑师", "土木工程师", "电气工程师", "机械工程师", "化学工程师", "生物工程师", "环境工程师", "翻译", "旅游顾问", "导游", "翻译", "公关", "人力资源", "行政助理", "秘书", "办公室主任", "客服", "网站管理员", "数据分析师", "游戏开发者", "机器人工程师", "物联网工程师", "临床医生", "护士", "药剂师", "营养师", "健身教练", "美容师", "美发师", "时装设计师", "珠宝设计师", "室内设计师", "景观设计师", "平面设计师", "音乐制作人", "音效设计师", "配音演员", "广告创意总监", "广告文案", "广告策划"],
    i1Iii1 = liI1II[Math.floor(Math.random() * liI1II.length)],
    l1liii = new Date(),
    I1Ili1 = l1liii.getFullYear() - Math.floor(Math.random() * 33) - 18,
    l1liil = Math.floor(Math.random() * 12) + 1,
    i1ll1 = Math.floor(Math.random() * 28) + 1,
    lilI1I = new Date(I1Ili1, l1liil - 1, i1ll1).toISOString().slice(0, 10),
    lI1I1l = "1" + ["3", "4", "5", "6", "7", "8"][Math.floor(Math.random() * 6)] + lI1ilI(9, "0123456789"),
    Il1Il = "wx_" + lI1ilI(6, "0123456789"),
    i1IiiI = lI1ilI(["7", "8", "9", "10"][Math.floor(Math.random() * 4)], "0123456789"),
    lI1I1I = lI1ilI(6, "0123456789") + "@qq.com",
    l1lII = "北京市",
    lilI1l = ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区"],
    l1liiI = lilI1l[Math.floor(Math.random() * lilI1l.length)],
    I1iI1 = lI1ilI(["2", "3", "4"][Math.floor(Math.random() * 3)], "0123456789") + "号",
    lilI1i = lI1ilI(6, "0123456789");
  return {
    name: IilI1 + Ili1I1,
    gender: lI1I1i,
    profession: i1Iii1,
    birthDay: lilI1I,
    phone: lI1I1l,
    province: l1lII,
    city: l1liiI,
    address: I1iI1,
    vcode: lilI1i,
    weiXin: Il1Il,
    qq: i1IiiI,
    email: lI1I1I
  };
}
async function IIIIll(i1IilI, III1I1 = "POST") {
  if (III1I1 === "POST") {
    return new Promise(async i1Iili => {
      $.post(i1IilI, (i1li1, iIIllI, I1Ill1) => {
        i1Iili({
          err: i1li1,
          res: iIIllI,
          data: I1Ill1
        });
      });
    });
  } else {
    if (III1I1 === "GET") {
      return new Promise(async ili11 => {
        $.get(i1IilI, (IiIiIi, llIIIl, IIlI1I) => {
          ili11({
            err: IiIiIi,
            res: llIIIl,
            data: IIlI1I
          });
        });
      });
    } else {
      const IiIiIl = "不支持的请求方法";
      return {
        err: IiIiIl,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";