/*
活动名称：签到有礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10023/10040>&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_daySign_url // 活动链接
		jd_lzkj_loreal_daySign_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_daySign_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_daySign_break // 493后继续执行，默认退出运行（true/false）
		
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#签到有礼（超级无线）
1 1 1 1 * jd_lzkj_loreal_daySign.js, tag=签到有礼（超级无线）, enabled=true		

*/

const Env=require('./utils/Env.js');
const $ = new Env('签到有礼（超级无线）')
const ililil = require("./jdCookie"),
  ii1i1ll = require("./function/jdCommon"),
  liIli11i = require("./function/sendJDNotify"),
  lili1IIi = require("./function/krgetToken"),
  {
    loreal_savePrize: IiIIil1
  } = require("./function/krsavePrize"),
  iIli1lli = process.env.jd_lzkj_loreal_daySign_url || "",
  IiiIlII1 = process.env.jd_lzkj_loreal_daySign_opencard === "true",
  lIIlil1 = process.env.jd_lzkj_loreal_daySign_break === "true",
  lIili11l = process.env.jd_lzkj_loreal_daySign_Notify === "true";
let l1Ii1iil = "",
  llIililI = "";
const iI1iIiII = Object.keys(ililil).map(Il1Ili11 => ililil[Il1Ili11]).filter(i1l1ilIl => i1l1ilIl);
!iI1iIiII[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!iIli1lli) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const IlilIiII = ii1i1ll.parseUrl(iIli1lli);
  if (!IlilIiII) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iIli1lli;
  $.activityId = ii1i1ll.getUrlParameter(iIli1lli, "activityId");
  $.activityType = ii1i1ll.getUrlParameter(iIli1lli, "activityType");
  $.hostname = IlilIiII.hostname;
  $.pathname = IlilIiII.pathname;
  let illlliIi = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) illlliIi = "apps/interact";else {
      if ($.hostname.includes("lzkj")) {
        illlliIi = $.pathname.replace(/\/index$/, "");
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + illlliIi;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !illlliIi || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  liIli11i.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let II1lii11 = 0; II1lii11 < iI1iIiII.length; II1lii11++) {
    $.index = II1lii11 + 1;
    l1Ii1iil = iI1iIiII[II1lii11];
    llIililI = iI1iIiII[II1lii11];
    ii1i1ll.setCookie(llIililI);
    $.UserName = decodeURIComponent(ii1i1ll.getCookieValue(l1Ii1iil, "pt_pin"));
    $.UA = ii1i1ll.genUA($.UserName);
    $.UUID = ii1i1ll.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = liIli11i.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await i1ll1lli();
    ii1i1ll.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  lIili11l && liIli11i.getMessage() && (liIli11i.updateContent(liIli11i.content + ("\n【活动地址】" + $.activityUrl)), await liIli11i.push());
})().catch(lll1iI1l => $.logErr(lll1iI1l)).finally(() => $.done());
async function i1ll1lli() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await lili1IIi(llIililI, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await IlIIlII("login");
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
          await IlIIlII("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await IlIIlII("follow"));
          if (IiiIlII1) {
            const IIlI1i11 = await ii1i1ll.joinShopMember($.venderId);
            if (IIlI1i11) {
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
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await IlIIlII("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await IlIIlII("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10023":
        case "10040":
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
    await IlIIlII("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await IlIIlII("drawPrize");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) return;
      let iI1l1llI = false,
        I1liIll = "";
      for (let iiI1Illl = 0; iiI1Illl < $.prizeInfo.length; iiI1Illl++) {
        const I1IIlii1 = $.prizeInfo[iiI1Illl],
          IIllI1 = I1IIlii1.prizeName,
          lIll1llI = I1IIlii1.leftNum,
          lii1iIII = I1IIlii1.prizeType,
          ili1ll1i = $.activityContent?.["signPiize"][iiI1Illl]["signNumber"];
        lIll1llI >= 1 && (iI1l1llI = true);
        I1liIll += "  签到" + ili1ll1i + "天，" + IIllI1 + (lii1iIII === 5 ? "[专享价]" : lii1iIII === 3 ? "[实物]" : "") + "，" + (lIll1llI >= 1 ? "剩余" + lIll1llI + "件" : "已发完") + "\n";
      }
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：\n" + I1liIll);
      liIli11i.updateContent(liIli11i.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】\n" + I1liIll));
      const ilIiIl1i = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        ilIil1l = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const ilI1Illl = Date.now();
          if ($.actStartTime && ilI1Illl < $.actStartTime) {
            console.log("活动将在 " + ilIiIl1i + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + ilIiIl1i);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && ilI1Illl > $.actEndTime) {
            console.log("活动已于 " + ilIil1l + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + ilIil1l);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + ilIiIl1i + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + ilIiIl1i), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + ilIil1l + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + ilIil1l), $.runEnd = true;
          return;
        default:
          if ($.actStatus) {
            console.log("未知活动状态 " + $.actStatus);
            $.message.fix("未知活动状态 " + $.actStatus);
            $.runEnd = true;
          }
          break;
      }
      if (!iI1l1llI) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    const i1iIiII = $.activityContent?.["signNum"],
      llllii1l = $.activityContent?.["continuityNum"],
      l11iIill = $.activityContent?.["sign"];
    if (llllii1l > 0 || i1iIiII > 0) {
      console.log("当前连续签到 " + llllii1l + " 天，累计签到 " + i1iIiII + " 天\n");
    }
    l11iIill ? (await IlIIlII("getSignClick"), await $.wait(500)) : console.log("今天已经签过了，明天再来吧~");
  } catch (ll1iIl1l) {
    console.log("❌ 脚本运行遇到了错误\n" + ll1iIl1l);
  }
}
async function IIll1I1(illliliI, lIi1IiI1) {
  try {
    switch (illliliI) {
      case "login":
        if (lIi1IiI1.resp_code === 0 && lIi1IiI1.data) $.token = lIi1IiI1?.["data"]?.["token"], $.joinInfo = lIi1IiI1?.["data"]?.["joinInfo"], $.openCardUrl = $.joinInfo?.["openCardUrl"], $.shopId = lIi1IiI1?.["data"]?.["shopId"], $.venderId = ii1i1ll.getUrlParameter($.openCardUrl, "venderId"), $.shopName = lIi1IiI1?.["data"]?.["shopName"], $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"], $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];else lIi1IiI1.resp_msg ? (console.log(illliliI + " " + lIi1IiI1.resp_msg), $.message.fix(lIi1IiI1.resp_msg), $.skipRun = true) : console.log("❓" + illliliI + " " + JSON.stringify(lIi1IiI1));
        break;
      case "follow":
        if (lIi1IiI1.resp_code === 0) {} else lIi1IiI1.resp_msg ? (console.log(illliliI + " " + lIi1IiI1.resp_msg), $.message.fix(lIi1IiI1.resp_msg), $.skipRun = true) : console.log("❓" + illliliI + " " + JSON.stringify(lIi1IiI1));
        break;
      case "initPinToken":
        if (lIi1IiI1.resp_code === 0 && lIi1IiI1.data) {
          lIi1IiI1 = JSON.parse(lIi1IiI1.data);
          if (lIi1IiI1.resp_code === 0 && lIi1IiI1.data) $.pinToken = lIi1IiI1?.["data"]?.["pinToken"], $.encryptPin = lIi1IiI1?.["data"]?.["encryptPin"];else {
            if (lIi1IiI1.resp_code === 1000) console.log(illliliI + " " + lIi1IiI1.resp_msg), $.message.fix(lIi1IiI1.resp_msg), $.skipRun = true;else lIi1IiI1.resp_msg ? (console.log(illliliI + " " + lIi1IiI1.resp_msg), $.message.fix(lIi1IiI1.resp_msg), $.skipRun = true) : (console.log("❓" + illliliI + " " + JSON.stringify(lIi1IiI1)), $.skipRun = true);
          }
        } else console.log("❓" + illliliI + " " + JSON.stringify(lIi1IiI1));
        break;
      case "basicInfo":
        if (lIi1IiI1.resp_code === 0 && lIi1IiI1.data) $.actStartTime = lIi1IiI1.data?.["startTime"], $.actEndTime = lIi1IiI1.data?.["endTime"], $.actStatus = lIi1IiI1.data?.["actStatus"], !$.activityType && ($.activityType = String(lIi1IiI1.data?.["actType"] || ""));else {
          if (lIi1IiI1.resp_msg) console.log(illliliI + " " + lIi1IiI1.resp_msg), $.message.fix(lIi1IiI1.resp_msg);else {
            console.log("❓" + illliliI + " " + JSON.stringify(lIi1IiI1));
          }
        }
        break;
      case "activity":
        if (lIi1IiI1.resp_code === 0 && lIi1IiI1.data) $.activityContent = lIi1IiI1.data;else {
          if (lIi1IiI1.resp_msg) {
            console.log(illliliI + " " + lIi1IiI1.resp_msg);
            $.message.fix(lIi1IiI1.resp_msg);
            $.skipRun = true;
            for (let iiIII1ii of ["未开始", "结束", "不存在", "不在"]) {
              if (lIi1IiI1.resp_msg.includes(iiIII1ii)) {
                $.runEnd = true;
                break;
              }
            }
          } else {
            console.log("❓" + illliliI + " " + JSON.stringify(lIi1IiI1));
            $.skipRun = true;
          }
        }
        break;
      case "drawPrize":
        if (lIi1IiI1.resp_code === 0) $.prizeInfo = lIi1IiI1?.["data"]?.["prizeInfo"] || [];else {
          if (lIi1IiI1.resp_msg) {
            console.log(illliliI + " " + lIi1IiI1.resp_msg);
            for (let iiIlll1i of ["未开始", "结束", "不存在", "不在"]) {
              if (lIi1IiI1.resp_msg.includes(iiIlll1i)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(lIi1IiI1.resp_msg);
          } else console.log("❓" + illliliI + " " + JSON.stringify(lIi1IiI1));
        }
        break;
      case "getSignClick":
        if (lIi1IiI1.resp_code === 0) {
          const iIl1111l = lIi1IiI1.data;
          if (iIl1111l) {
            process.stdout.write("签到成功 ➜ ");
            switch (iIl1111l.prizeType) {
              case 1:
                console.log("🎉 " + iIl1111l.prizeName + " 🐶"), $.message.insert(iIl1111l.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const lliIil = lIi1IiI1.data.addressId,
                  i1I1ii1 = iIl1111l.prizeName;
                console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + i1I1ii1);
                if (iIl1111l.showImg) console.log("预览图片：" + iIl1111l.showImg);
                const lI1l1III = {
                    "baseUrl": $.baseUrl,
                    "newbaseUrl": $.newbaseUrl,
                    "cookie": llIililI,
                    "ua": $.UA,
                    "token": $.token,
                    "prizeName": i1I1ii1,
                    "orderCode": lliIil
                  },
                  il11lI11 = await IiIIil1(lI1l1III);
                !lIili11l && il11lI11 && (await liIli11i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + i1I1ii1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(i1I1ii1 + "(" + (il11lI11 ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + iIl1111l.prizeName + " 🎟️"), $.message.insert("🗑️ " + iIl1111l.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价"), $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + iIl1111l.prizeName + " 🧧"), $.message.insert("🎉 " + iIl1111l.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + iIl1111l.prizeName + " 🎁"), $.message.insert("🎉 恭喜获得" + iIl1111l.prizeName + " 🎁");
                !lIili11l && (await liIli11i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + iIl1111l.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(iIl1111l);
                break;
            }
          } else {
            console.log("签到成功");
          }
        } else {
          if (lIi1IiI1.resp_msg) {
            console.log(illliliI + " " + lIi1IiI1.resp_msg);
            for (let lli1IIl1 of ["未开始", "结束", "不存在", "不在"]) {
              if (lIi1IiI1.resp_msg.includes(lli1IIl1)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(lIi1IiI1.resp_msg);
          } else {
            console.log("❓" + illliliI + " " + JSON.stringify(lIi1IiI1));
          }
        }
        break;
    }
  } catch (iIlIlI11) {
    console.log("❌ 未能正确处理 " + illliliI + " 请求响应 " + (iIlIlI11.message || iIlIlI11));
  }
}
async function IlIIlII(lIlllIIl) {
  if ($.runEnd || $.outFlag) return;
  let li11Ii11 = $.newbaseUrl,
    lIIllilI = {},
    l11I1Ill = "POST";
  switch (lIlllIIl) {
    case "login":
      li11Ii11 += "/api/user-info/login", lIIllilI = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      li11Ii11 += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      l11I1Ill = "GET", li11Ii11 += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      li11Ii11 += "/api/active/basicInfo", lIIllilI = {
        "activityId": $.activityId
      };
      break;
    case "activity":
      li11Ii11 += "/api/task/daySign/activity";
      break;
    case "drawPrize":
      li11Ii11 += "/api/prize/drawPrize";
      break;
    case "getSignClick":
      li11Ii11 += "/api/task/daySign/getSignClick";
      break;
    default:
      console.log("❌ 未知请求 " + lIlllIIl);
      return;
  }
  const i11lilil = {
    "url": li11Ii11,
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
    "body": JSON.stringify(lIIllilI),
    "timeout": 30000
  };
  $.token && (i11lilil.headers.token = $.token);
  l11I1Ill === "GET" && (delete i11lilil.body, delete i11lilil.headers["Content-Type"]);
  const IiI1Iii = 5;
  let i1111lii = 0,
    Illi1ll = null,
    Illill1 = false;
  while (i1111lii < IiI1Iii) {
    if (i1111lii > 0) {
      await $.wait(1000);
    }
    const {
      err: Iil1l1l1,
      res: li1lIii1,
      data: liIIIiiI
    } = await i1lIi1lI(i11lilil, l11I1Ill);
    if (Iil1l1l1) {
      if (typeof Iil1l1l1 === "string" && Iil1l1l1.includes("Timeout awaiting 'request'")) Illi1ll = lIlllIIl + " 请求超时，请检查网络重试";else {
        const IiiiI11 = li1lIii1?.["statusCode"];
        if (IiiiI11) {
          if ([403, 493].includes(IiiiI11)) Illi1ll = lIlllIIl + " 请求失败，IP被限制（Response code " + IiiiI11 + "）", Illill1 = true;else [400, 404].includes(IiiiI11) ? Illi1ll = lIlllIIl + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IiiiI11 + "）" : Illi1ll = lIlllIIl + " 请求失败（Response code " + IiiiI11 + "）";
        } else Illi1ll = lIlllIIl + " 请求失败 => " + (Iil1l1l1.message || Iil1l1l1);
      }
      i1111lii++;
    } else {
      const l11liii1 = ii1i1ll.getResponseCookie(li1lIii1),
        IIIliI1i = false;
      if (IIIliI1i) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + lIlllIIl + " 响应Body => " + (liIIIiiI || "无") + "\n");
        console.log("🔧 " + lIlllIIl + " 响应Cookie => " + (l11liii1 || "无") + "\n");
        console.log("🔧 " + lIlllIIl + " 请求参数");
        console.log(i11lilil);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(lIlllIIl)) try {
        const Ii1IiIiI = JSON.parse(liIIIiiI);
        IIll1I1(lIlllIIl, Ii1IiIiI);
        break;
      } catch (i11IIl1) {
        Illi1ll = "❌ " + lIlllIIl + " 接口响应数据解析失败: " + i11IIl1.message;
        console.log("🚫 " + lIlllIIl + " => " + String(liIIIiiI || "无响应数据"));
        IIIliI1i && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        i1111lii++;
      } else {
        break;
      }
      Illill1 = false;
    }
  }
  i1111lii >= IiI1Iii && (console.log(Illi1ll), Illill1 && !lIIlil1 && ($.outFlag = true, $.message && $.message.fix(Illi1ll)));
}
async function i1lIi1lI(i1i1I1ii, Iiii1iI = "POST") {
  if (Iiii1iI === "POST") return new Promise(async il1iil => {
    $.post(i1i1I1ii, (l1IlIIll, l1I1IIll, IililiIl) => {
      il1iil({
        "err": l1IlIIll,
        "res": l1I1IIll,
        "data": IililiIl
      });
    });
  });else {
    if (Iiii1iI === "GET") {
      return new Promise(async iiilIll1 => {
        $.get(i1i1I1ii, (i1ll11il, Ii11li11, i11I1l11) => {
          iiilIll1({
            "err": i1ll11il,
            "res": Ii11li11,
            "data": i11I1l11
          });
        });
      });
    } else {
      const li1IiIli = "不支持的请求方法";
      return {
        "err": li1IiIli,
        "res": null,
        "data": null
      };
    }
  }
}