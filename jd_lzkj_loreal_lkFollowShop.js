/*
活动名称：关注店铺有礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lorealjdcampaign-rc.isvjcloud.com/interact/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_lkFollowShop_url // 活动链接
		jd_lzkj_loreal_lkFollowShop_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_lkFollowShop_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_lkFollowShop_break // 493后继续执行，默认退出运行（true/false）

*/

const Env=require('./utils/Env.js');
const $ = new Env('关注店铺有礼（超级无线）')
const iIIliIl = require("./jdCookie"),
  iiI11II1 = require("./function/jdCommon"),
  lIiIIiI1 = require("./function/sendJDNotify"),
  i11IlliI = require("./function/krgetToken"),
  {
    loreal_savePrize: IlIl1ill
  } = require("./function/krsavePrize"),
  liIlIlll = process.env.jd_lzkj_loreal_lkFollowShop_url || "",
  lii1IIll = process.env.jd_lzkj_loreal_lkFollowShop_opencard === "true",
  IiIl1lI = process.env.jd_lzkj_loreal_lkFollowShop_break === "true",
  li11lliI = process.env.jd_lzkj_loreal_lkFollowShop_Notify === "true";
let i1lI11il = "",
  I11iIli1 = "";
const l1Il1I11 = Object.keys(iIIliIl).map(i1I1II1i => iIIliIl[i1I1II1i]).filter(lll1I1i => lll1I1i);
!l1Il1I11[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!liIlIlll) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const l1llII = iiI11II1.parseUrl(liIlIlll);
  if (!l1llII) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = liIlIlll;
  $.activityId = iiI11II1.getUrlParameter(liIlIlll, "activityId");
  $.activityType = iiI11II1.getUrlParameter(liIlIlll, "activityType");
  $.hostname = l1llII.hostname;
  $.pathname = l1llII.pathname;
  let iiI1iliI = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) iiI1iliI = "apps/interact";else $.hostname.includes("lzkj") && (iiI1iliI = $.pathname.replace(/\/index$/, ""));
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + iiI1iliI;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !iiI1iliI || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  lIiIIiI1.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let i11l1i1i = 0; i11l1i1i < l1Il1I11.length; i11l1i1i++) {
    $.index = i11l1i1i + 1;
    i1lI11il = l1Il1I11[i11l1i1i];
    I11iIli1 = l1Il1I11[i11l1i1i];
    iiI11II1.setCookie(I11iIli1);
    $.UserName = decodeURIComponent(iiI11II1.getCookieValue(i1lI11il, "pt_pin"));
    $.UA = iiI11II1.genUA($.UserName);
    $.UUID = iiI11II1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = lIiIIiI1.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await l1Ill1i();
    iiI11II1.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  li11lliI && lIiIIiI1.getMessage() && (lIiIIiI1.updateContent(lIiIIiI1.content + ("\n【活动地址】" + $.activityUrl)), await lIiIIiI1.push());
})().catch(llilIIli => $.logErr(llilIIli)).finally(() => $.done());
async function l1Ill1i() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await i11IlliI(I11iIli1, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await I1ilIili("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1004":
          await I1ilIili("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await I1ilIili("follow"));
          if (lii1IIll) {
            const lI1Iiii = await iiI11II1.joinShopMember($.venderId);
            if (lI1Iiii) console.log("加入店铺会员成功");else {
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
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await I1ilIili("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await I1ilIili("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10069":
          break;
        case "":
          console.log("未能获取活动类型"), $.message.fix("未能获取活动类型"), $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.message.fix("活动类型（" + $.activityType + "）不受支持"), $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) return;
      await $.wait(500);
    }
    if ($.index === 1) {
      await I1ilIili("drawPrize");
      await $.wait(500);
      const I1lII11i = $.prizeInfo[0]?.["prizeName"],
        llIlllII = $.prizeInfo[0]?.["prizeType"],
        Il1l1Ill = $.prizeInfo[0]?.["leftNum"];
      let l1l11Ili = Il1l1Ill >= 1,
        i11ilIIl = "" + I1lII11i + (llIlllII === 5 ? "[专享价]" : llIlllII === 3 ? "[实物]" : "") + "，" + (Il1l1Ill >= 1 ? "剩余" + Il1l1Ill + "件" : "已发完");
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + i11ilIIl + "\n");
      lIiIIiI1.updateContent(lIiIIiI1.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + i11ilIIl));
      const llII11I = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        Il11iiI = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const l1l1Il11 = Date.now();
          if ($.actStartTime && l1l1Il11 < $.actStartTime) {
            console.log("活动将在 " + llII11I + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + llII11I);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && l1l1Il11 > $.actEndTime) {
            console.log("活动已于 " + Il11iiI + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + Il11iiI);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + llII11I + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + llII11I), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + Il11iiI + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + Il11iiI), $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!l1l11Ili) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    await I1ilIili("getUserFollowInfo");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) return;
    $.followShop ? (await I1ilIili("saveFollowInfo"), await $.wait(500)) : (console.log("仅限新关注店铺用户参与哦~"), $.message.fix("仅限新用户参与"));
  } catch (IliI1iI) {
    console.log("❌ 脚本运行遇到了错误\n" + IliI1iI);
  }
}
async function iIlI1ii(IlIl1ll1, i111liiI) {
  try {
    switch (IlIl1ll1) {
      case "login":
        if (i111liiI.resp_code === 0 && i111liiI.data) $.token = i111liiI?.["data"]?.["token"], $.joinInfo = i111liiI?.["data"]?.["joinInfo"], $.openCardUrl = $.joinInfo?.["openCardUrl"], $.shopId = i111liiI?.["data"]?.["shopId"], $.venderId = iiI11II1.getUrlParameter($.openCardUrl, "venderId"), $.shopName = i111liiI?.["data"]?.["shopName"], $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"], $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];else i111liiI.resp_msg ? (console.log(IlIl1ll1 + " " + i111liiI.resp_msg), $.message.fix(i111liiI.resp_msg), $.skipRun = true) : console.log("❓" + IlIl1ll1 + " " + JSON.stringify(i111liiI));
        break;
      case "follow":
        if (i111liiI.resp_code === 0) {} else {
          if (i111liiI.resp_msg) console.log(IlIl1ll1 + " " + i111liiI.resp_msg), $.message.fix(i111liiI.resp_msg), $.skipRun = true;else {
            console.log("❓" + IlIl1ll1 + " " + JSON.stringify(i111liiI));
          }
        }
        break;
      case "initPinToken":
        if (i111liiI.resp_code === 0 && i111liiI.data) {
          i111liiI = JSON.parse(i111liiI.data);
          if (i111liiI.resp_code === 0 && i111liiI.data) {
            $.pinToken = i111liiI?.["data"]?.["pinToken"];
            $.encryptPin = i111liiI?.["data"]?.["encryptPin"];
          } else {
            if (i111liiI.resp_code === 1000) console.log(IlIl1ll1 + " " + i111liiI.resp_msg), $.message.fix(i111liiI.resp_msg), $.skipRun = true;else i111liiI.resp_msg ? (console.log(IlIl1ll1 + " " + i111liiI.resp_msg), $.message.fix(i111liiI.resp_msg), $.skipRun = true) : (console.log("❓" + IlIl1ll1 + " " + JSON.stringify(i111liiI)), $.skipRun = true);
          }
        } else console.log("❓" + IlIl1ll1 + " " + JSON.stringify(i111liiI));
        break;
      case "basicInfo":
        if (i111liiI.resp_code === 0 && i111liiI.data) $.actStartTime = i111liiI.data?.["startTime"], $.actEndTime = i111liiI.data?.["endTime"], $.actStatus = i111liiI.data?.["actStatus"], !$.activityType && ($.activityType = String(i111liiI.data?.["actType"] || ""));else i111liiI.resp_msg ? (console.log(IlIl1ll1 + " " + i111liiI.resp_msg), $.message.fix(i111liiI.resp_msg)) : console.log("❓" + IlIl1ll1 + " " + JSON.stringify(i111liiI));
        break;
      case "drawPrize":
        if (i111liiI.resp_code === 0) $.prizeInfo = i111liiI?.["data"]?.["prizeInfo"] || [];else {
          if (i111liiI.resp_msg) {
            console.log(IlIl1ll1 + " " + i111liiI.resp_msg);
            for (let lIIl1Ii1 of ["未开始", "结束", "不存在", "不在"]) {
              if (i111liiI.resp_msg.includes(lIIl1Ii1)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(i111liiI.resp_msg);
          } else console.log("❓" + IlIl1ll1 + " " + JSON.stringify(i111liiI));
        }
        break;
      case "getUserFollowInfo":
        if (i111liiI.resp_code === 0 && i111liiI.data) $.followShop = i111liiI.data?.["followShop"];else {
          if (i111liiI.resp_msg) {
            for (let ii11l11 of ["未开始", "结束", "不存在", "不在"]) {
              if (i111liiI.resp_msg.includes(ii11l11)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(IlIl1ll1 + " " + i111liiI.resp_msg);
            $.message.fix(i111liiI.resp_msg);
            $.skipRun = true;
          } else console.log("❓" + IlIl1ll1 + " " + JSON.stringify(i111liiI)), $.skipRun = true;
        }
        break;
      case "saveFollowInfo":
        if (i111liiI.resp_code === 0) {
          const Ii1lII11 = i111liiI.data;
          if (Ii1lII11) {
            switch (Ii1lII11.prizeType) {
              case 1:
                console.log("🎉 " + Ii1lII11.prizeName + " 🐶"), $.message.insert(Ii1lII11.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const Iliiiil1 = i111liiI.data.addressId,
                  ii111Ill = Ii1lII11.prizeName;
                console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + ii111Ill);
                if (Ii1lII11.showImg) console.log("预览图片：" + Ii1lII11.showImg);
                const l1iIliIl = {
                    "baseUrl": $.baseUrl,
                    "newbaseUrl": $.newbaseUrl,
                    "cookie": I11iIli1,
                    "ua": $.UA,
                    "token": $.token,
                    "prizeName": ii111Ill,
                    "orderCode": Iliiiil1
                  },
                  Illl1lIl = await IlIl1ill(l1iIliIl);
                !li11lliI && Illl1lIl && (await lIiIIiI1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + ii111Ill + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(ii111Ill + "(" + (Illl1lIl ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + Ii1lII11.prizeName + " 🎟️"), $.message.insert("🗑️ " + Ii1lII11.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价"), $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + Ii1lII11.prizeName + " 🧧"), $.message.insert("🎉 " + Ii1lII11.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + Ii1lII11.prizeName + " 🎁"), $.message.insert("🎉 恭喜获得" + Ii1lII11.prizeName + " 🎁");
                !li11lliI && (await lIiIIiI1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + Ii1lII11.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(Ii1lII11);
                break;
            }
          } else console.log("💨 空气"), $.message.insert("💨 空气");
        } else {
          if (i111liiI.resp_msg) {
            console.log(IlIl1ll1 + " " + i111liiI.resp_msg);
            for (let i1lil11i of ["未开始", "结束", "不存在", "不在"]) {
              if (i111liiI.resp_msg.includes(i1lil11i)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(i111liiI.resp_msg);
          } else console.log("❓" + IlIl1ll1 + " " + JSON.stringify(i111liiI));
        }
        break;
    }
  } catch (lIi1l1iI) {
    console.log("❌ 未能正确处理 " + IlIl1ll1 + " 请求响应 " + (lIi1l1iI.message || lIi1l1iI));
  }
}
async function I1ilIili(li1lIliI) {
  if ($.runEnd || $.outFlag) return;
  let iIi11lli = $.newbaseUrl,
    i1iI11lI = {},
    i1iilil = "POST";
  switch (li1lIliI) {
    case "login":
      iIi11lli += "/api/user-info/login", i1iI11lI = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      iIi11lli += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      i1iilil = "GET", iIi11lli += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      iIi11lli += "/api/active/basicInfo", i1iI11lI = {
        "activityId": $.activityId
      };
      break;
    case "drawPrize":
      iIi11lli += "/api/prize/drawPrize";
      break;
    case "getUserFollowInfo":
      i1iilil = "GET", iIi11lli += "/api/task/lkFollowShop/getUserFollowInfo";
      break;
    case "saveFollowInfo":
      i1iilil = "GET", iIi11lli += "/api/task/lkFollowShop/saveFollowInfo?actType=10069";
      break;
    default:
      console.log("❌ 未知请求 " + li1lIliI);
      return;
  }
  const lII1i1li = {
    "url": iIi11lli,
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
    "body": JSON.stringify(i1iI11lI),
    "timeout": 30000
  };
  $.token && (lII1i1li.headers.token = $.token);
  i1iilil === "GET" && (delete lII1i1li.body, delete lII1i1li.headers["Content-Type"]);
  const llII1l1I = 5;
  let iiiliIi = 0,
    ilIilil = null,
    iiii11iI = false;
  while (iiiliIi < llII1l1I) {
    iiiliIi > 0 && (await $.wait(1000));
    const {
      err: liIliIil,
      res: Ii1ll11l,
      data: IIlil111
    } = await llIIlIii(lII1i1li, i1iilil);
    if (liIliIil) {
      if (typeof liIliIil === "string" && liIliIil.includes("Timeout awaiting 'request'")) ilIilil = li1lIliI + " 请求超时，请检查网络重试";else {
        const Iilillli = Ii1ll11l?.["statusCode"];
        if (Iilillli) {
          if ([403, 493].includes(Iilillli)) ilIilil = li1lIliI + " 请求失败，IP被限制（Response code " + Iilillli + "）", iiii11iI = true;else {
            if ([400, 404].includes(Iilillli)) ilIilil = li1lIliI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + Iilillli + "）";else {
              ilIilil = li1lIliI + " 请求失败（Response code " + Iilillli + "）";
            }
          }
        } else ilIilil = li1lIliI + " 请求失败 => " + (liIliIil.message || liIliIil);
      }
      iiiliIi++;
    } else {
      const Ii1i11il = iiI11II1.getResponseCookie(Ii1ll11l),
        I1IiIlII = false;
      if (I1IiIlII) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + li1lIliI + " 响应Body => " + (IIlil111 || "无") + "\n");
        console.log("🔧 " + li1lIliI + " 响应Cookie => " + (Ii1i11il || "无") + "\n");
        console.log("🔧 " + li1lIliI + " 请求参数");
        console.log(lII1i1li);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(li1lIliI)) try {
        const iliII11l = JSON.parse(IIlil111);
        iIlI1ii(li1lIliI, iliII11l);
        break;
      } catch (Iil1ll1i) {
        ilIilil = "❌ " + li1lIliI + " 接口响应数据解析失败: " + Iil1ll1i.message;
        console.log("🚫 " + li1lIliI + " => " + String(IIlil111 || "无响应数据"));
        if (I1IiIlII) {
          console.log("\n---------------------------------------------------\n");
          console.log(activityCookie);
          console.log("\n---------------------------------------------------\n");
        }
        iiiliIi++;
      } else break;
      iiii11iI = false;
    }
  }
  iiiliIi >= llII1l1I && (console.log(ilIilil), iiii11iI && !IiIl1lI && ($.outFlag = true, $.message && $.message.fix(ilIilil)));
}
async function llIIlIii(IlIIllli, iIi1lilI = "POST") {
  if (iIi1lilI === "POST") return new Promise(async l1I11lIl => {
    $.post(IlIIllli, (iI11IlIi, iliiI11, llIlilli) => {
      l1I11lIl({
        "err": iI11IlIi,
        "res": iliiI11,
        "data": llIlilli
      });
    });
  });else {
    if (iIi1lilI === "GET") return new Promise(async iIIiIlIl => {
      $.get(IlIIllli, (Il1lIl1l, IllI1li, i11Iiiii) => {
        iIIiIlIl({
          "err": Il1lIl1l,
          "res": IllI1li,
          "data": i11Iiiii
        });
      });
    });else {
      const ll1IlIll = "不支持的请求方法";
      return {
        "err": ll1IlIll,
        "res": null,
        "data": null
      };
    }
  }
}