/*
活动名称：组队瓜分奖品（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10033&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_organizeTeam_url // 活动链接
		jd_lzkj_loreal_organizeTeam_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_organizeTeam_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_organizeTeam_break // 493后继续执行，默认退出运行（true/false）

*/

const Env=require('./utils/Env.js');
const $ = new Env('组队瓜分奖品（超级无线）')
const i1II1iii = require("./jdCookie"),
  lii1iI1l = require("./function/jdCommon"),
  I11i1iI = require("./function/sendJDNotify"),
  IllI1Ii = require("./function/krgetToken"),
  l1I111Il = process.env.jd_lzkj_loreal_organizeTeam_url || "",
  IiiIIii = process.env.jd_lzkj_loreal_organizeTeam_opencard === "true",
  ilil11l1 = process.env.jd_lzkj_loreal_organizeTeam_Notify === "true",
  iIIllili = process.env.jd_lzkj_loreal_organizeTeam_break === "true";
let IiII1iII = "",
  l1III1il = "";
const IIIllii = Object.keys(i1II1iii).map(ilIliii => i1II1iii[ilIliii]).filter(il1iil1l => il1iil1l);
!IIIllii[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!l1I111Il) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const li1IIIi1 = lii1iI1l.parseUrl(l1I111Il);
  if (!li1IIIi1) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = l1I111Il;
  $.activityId = lii1iI1l.getUrlParameter(l1I111Il, "activityId");
  $.activityType = lii1iI1l.getUrlParameter(l1I111Il, "activityType");
  $.hostname = li1IIIi1?.["hostname"];
  let IiI1iII1 = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      IiI1iII1 = "apps/interact";
    } else $.hostname.includes("lzkj") && (IiI1iII1 = l1I111Il.match(/\/(prod\/cc\/interact\w*)\//)[1]);
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + IiI1iII1;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !IiI1iII1 || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  I11i1iI.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let Ii1IiIi1 = 0; Ii1IiIi1 < IIIllii.length; Ii1IiIi1++) {
    $.index = Ii1IiIi1 + 1;
    IiII1iII = IIIllii[Ii1IiIi1];
    l1III1il = IIIllii[Ii1IiIi1];
    lii1iI1l.setCookie(l1III1il);
    $.UserName = decodeURIComponent(lii1iI1l.getCookieValue(IiII1iII, "pt_pin"));
    $.UA = lii1iI1l.genUA($.UserName);
    $.UUID = lii1iI1l.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = I11i1iI.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await li1i1I1i();
    lii1iI1l.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  const l1IilllI = I11i1iI.getMessage();
  l1IilllI && (console.log("\n📣运行结果\n" + l1IilllI.replace(/：/g, " ➜ ")), ilil11l1 && (I11i1iI.updateContent(I11i1iI.content + ("\n【活动地址】" + $.activityUrl)), await I11i1iI.push()));
})().catch(i1ilIIll => $.logErr(i1ilIIll)).finally(() => $.done());
async function li1i1I1i() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await IllI1Ii(l1III1il, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await ilIl1ili("login");
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
          await ilIl1ili("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await ilIl1ili("follow"));
          if (IiiIIii) {
            const ili11l1i = await lii1iI1l.joinShopMember($.venderId);
            if (ili11l1i) console.log("加入店铺会员成功");else {
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
      await ilIl1ili("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    await ilIl1ili("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await ilIl1ili("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10033":
          break;
        case "":
          console.log("未能获取活动类型"), $.message.fix("未能获取活动类型"), $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.message.fix("活动类型（" + $.activityType + "）不受支持"), $.runEnd = true;
          return;
      }
      const lllIii1 = $.activityContent?.["prizeType"];
      let Il1lIili = "",
        lI1IilI1 = "";
      switch (lllIii1) {
        case 1:
          Il1lIili = "京豆", lI1IilI1 = "🐶";
          break;
        case 4:
          Il1lIili = "积分", lI1IilI1 = "🎟️";
          break;
        default:
          Il1lIili = "未知", lI1IilI1 = "❓";
      }
      const lI1II = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        liil1II = $.time("yyyy-MM-dd HH:mm", $.actEndTime),
        IIIIiIIl = $.activityContent?.["prizeList"][0]?.["totalPrizeNum"],
        l1iilill = $.activityContent?.["groupNumber"],
        i1l11li1 = $.activityContent?.["captainPrize"],
        l1IlII1I = $.activityContent?.["memberPrize"],
        ililli = "店铺名称：" + $.shopName + "\n开始时间：" + lI1II + "\n结束时间：" + liil1II + "\n奖品类型：" + Il1lIili + " " + lI1IilI1 + "\n总计奖池：" + IIIIiIIl + "\n可组队伍：" + l1iilill + " 🚗\n瓜分数量：" + 5 * l1IlII1I + " " + lI1IilI1 + "\n队长奖励：" + i1l11li1 + " " + lI1IilI1 + "\n成员获得：" + l1IlII1I + " " + lI1IilI1 + "\n最高可得：" + (l1iilill * (i1l11li1 + l1IlII1I) + l1IlII1I) + " " + lI1IilI1 + "\n";
      I11i1iI.updateContent(I11i1iI.content + ("\n" + ililli));
      console.log(ililli);
      switch ($.actStatus) {
        case 0:
          const ll1II11i = Date.now();
          if ($.actStartTime && ll1II11i < $.actStartTime) {
            console.log("活动将在 " + lI1II + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + lI1II);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && ll1II11i > $.actEndTime) {
            console.log("活动已于 " + liil1II + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + liil1II);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + lI1II + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + lI1II), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + liil1II + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + liil1II), $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      await $.wait(500);
    }
    if (!$.teamId) {
      let l1il1lI = $.activityContent?.["captainList"];
      const I1ilill1 = $.activityContent?.["groupNumber"] * 4,
        lI1lI = $.activityContent?.["joinFlag"];
      switch (lI1lI) {
        case 5:
        case 2:
          await ilIl1ili("saveCaptain"), await $.wait(500);
          if ($.runEnd || $.outFlag || $.skipRun) return;
          await ilIl1ili("activity"), await $.wait(500), l1il1lI = $.activityContent?.["captainList"];
          for (const iI111Il of l1il1lI) {
            if (iI111Il.memberCount === 5) continue;
            $.teamId = iI111Il.id;
            break;
          }
          $.canJoinMembers = I1ilill1;
          break;
        case 3:
        case 4:
          let iIlI1Il = 0;
          for (const I1il1lIi of l1il1lI) {
            iIlI1Il += I1il1lIi.memberCount - 1;
            if (I1il1lIi.memberCount === 5) continue;
            $.teamId = I1il1lIi.id;
            break;
          }
          if (iIlI1Il >= I1ilill1) {
            console.log("队伍人数已满");
            $.message.fix("队伍已满");
            $.runEnd = true;
            return;
          } else console.log("已经是队长了"), $.message.fix("已是队长"), $.canJoinMembers = I1ilill1 - iIlI1Il;
          break;
        default:
          console.log("未知队伍状态"), $.message.insert("未知队伍状态");
          break;
      }
      await ilIl1ili("getUserId");
      await $.wait(500);
    } else {
      const i1liliil = $.activityContent?.["captain"];
      i1liliil ? (console.log("已经加入过队伍了"), $.message.fix("已经加入过队伍")) : (await ilIl1ili("saveMember"), await $.wait(500));
    }
  } catch (II1l1IIl) {
    console.log("❌ 脚本运行遇到了错误\n" + II1l1IIl);
  }
}
async function IlIillll(ilii1III, i1liI1lI) {
  try {
    switch (ilii1III) {
      case "login":
        if (i1liI1lI.resp_code === 0 && i1liI1lI.data) {
          $.token = i1liI1lI?.["data"]?.["token"];
          $.joinInfo = i1liI1lI?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = i1liI1lI?.["data"]?.["shopId"];
          $.venderId = lii1iI1l.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = i1liI1lI?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          if (i1liI1lI.resp_msg) {
            console.log(ilii1III + " " + i1liI1lI.resp_msg);
            $.message.fix(i1liI1lI.resp_msg);
            $.skipRun = true;
          } else console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI));
        }
        break;
      case "follow":
        if (i1liI1lI.resp_code === 0) {} else i1liI1lI.resp_msg ? (console.log(ilii1III + " " + i1liI1lI.resp_msg), $.message.fix(i1liI1lI.resp_msg), $.skipRun = true) : console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI));
        break;
      case "initPinToken":
        if (i1liI1lI.resp_code === 0 && i1liI1lI.data) {
          i1liI1lI = JSON.parse(i1liI1lI.data);
          if (i1liI1lI.resp_code === 0 && i1liI1lI.data) $.pinToken = i1liI1lI?.["data"]?.["pinToken"], $.encryptPin = i1liI1lI?.["data"]?.["encryptPin"];else {
            if (i1liI1lI.resp_code === 1000) console.log(ilii1III + " " + i1liI1lI.resp_msg), $.message.fix(i1liI1lI.resp_msg), $.skipRun = true;else i1liI1lI.resp_msg ? (console.log(ilii1III + " " + i1liI1lI.resp_msg), $.message.fix(i1liI1lI.resp_msg), $.skipRun = true) : (console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI)), $.skipRun = true);
          }
        } else console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI));
        break;
      case "basicInfo":
        if (i1liI1lI.resp_code === 0 && i1liI1lI.data) {
          $.actStartTime = i1liI1lI.data?.["startTime"];
          $.actEndTime = i1liI1lI.data?.["endTime"];
          $.actStatus = i1liI1lI.data?.["actStatus"];
          $.shopName = i1liI1lI.data?.["shopName"];
          !$.activityType && ($.activityType = String(i1liI1lI.data?.["actType"] || ""));
        } else i1liI1lI.resp_msg ? (console.log(ilii1III + " " + i1liI1lI.resp_msg), $.message.fix(i1liI1lI.resp_msg), $.runEnd) : console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI));
        break;
      case "activity":
        if (i1liI1lI.resp_code === 0 && i1liI1lI.data) $.activityContent = i1liI1lI.data;else {
          if (i1liI1lI.resp_msg) {
            console.log(ilii1III + " " + i1liI1lI.resp_msg);
            $.message.fix(i1liI1lI.resp_msg);
            $.skipRun = true;
            for (let iiI1liii of ["未开始", "结束", "不存在", "不在"]) {
              if (i1liI1lI.resp_msg.includes(iiI1liii)) {
                $.runEnd = true;
                break;
              }
            }
          } else {
            console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI));
            $.skipRun = true;
          }
        }
        break;
      case "getUserId":
        if (i1liI1lI.resp_code === 0 && i1liI1lI.data) $.shareUserId = i1liI1lI.data?.["shareUserId"];else {
          if (i1liI1lI.resp_msg) {
            console.log(ilii1III + " " + i1liI1lI.resp_msg);
          } else console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI));
        }
        break;
      case "saveCaptain":
        if (i1liI1lI.resp_code === 0) console.log("创建队伍成功"), $.message.fix("创建队伍成功");else {
          if (i1liI1lI.resp_msg) {
            console.log(ilii1III + " " + i1liI1lI.resp_msg);
            $.message.insert(i1liI1lI.resp_msg);
            $.skipRun = true;
            for (let llll11l of ["未开始", "结束", "不存在", "不在"]) {
              if (i1liI1lI.resp_msg.includes(llll11l)) {
                $.runEnd = true;
                break;
              }
            }
          } else console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI)), $.skipRun = true;
        }
        break;
      case "saveMember":
        if (i1liI1lI.resp_code === 0) console.log("加入队伍成功"), $.message.fix("加入队伍成功"), $.canJoinMembers -= 1, $.canJoinMembers <= 0 && (console.log("战队已满，运行完毕"), $.runEnd = true);else {
          if (i1liI1lI.resp_msg) {
            console.log(ilii1III + " " + i1liI1lI.resp_msg);
            $.message.insert(i1liI1lI.resp_msg);
            for (let Ii1li1l1 of ["未开始", "结束", "不存在", "不在"]) {
              if (i1liI1lI.resp_msg.includes(Ii1li1l1)) {
                $.runEnd = true;
                break;
              }
            }
          } else console.log("❓" + ilii1III + " " + JSON.stringify(i1liI1lI));
        }
        break;
    }
  } catch (iIiIlIll) {
    console.log("❌ 未能正确处理 " + ilii1III + " 请求响应 " + (iIiIlIll.message || iIiIlIll));
  }
}
async function ilIl1ili(ilIllil1) {
  if ($.runEnd || $.outFlag) return;
  let i1ii1l1l = $.newbaseUrl,
    ll11llii = {},
    l1lI11ll = "POST";
  switch (ilIllil1) {
    case "login":
      i1ii1l1l += "/api/user-info/login", ll11llii = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      i1ii1l1l += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      l1lI11ll = "GET", i1ii1l1l += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      i1ii1l1l += "/api/active/basicInfo", ll11llii = {
        "activityId": $.activityId
      };
      break;
    case "getUserId":
      i1ii1l1l += "/api/task/share/getUserId";
      break;
    case "activity":
      i1ii1l1l += "/api/task/organizeTeam/activity", ll11llii = {
        "shareUserId": $.shareUserId || ""
      };
      break;
    case "saveCaptain":
      i1ii1l1l += "/api/task/organizeTeam/saveCaptain";
      break;
    case "saveMember":
      i1ii1l1l += "/api/task/organizeTeam/saveMember", ll11llii = {
        "shareUserId": $.shareUserId,
        "teamId": $.teamId
      };
      break;
    default:
      console.log("❌ 未知请求 " + ilIllil1);
      return;
  }
  const lIiiiIil = {
    "url": i1ii1l1l,
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
      "token": $.token,
      "User-Agent": $.UA
    },
    "body": JSON.stringify(ll11llii),
    "timeout": 30000
  };
  l1lI11ll === "GET" && (delete lIiiiIil.body, delete lIiiiIil.headers["Content-Type"]);
  const iIi1lili = 5;
  let I1Iil1ii = 0,
    Il1lI1II = null,
    lllIl1i1 = false;
  while (I1Iil1ii < iIi1lili) {
    I1Iil1ii > 0 && (await $.wait(1000));
    const {
      err: IllIII1,
      res: iIiiiIiI,
      data: llli1Il
    } = await iIilIiiI(lIiiiIil, l1lI11ll);
    if (IllIII1) {
      if (typeof IllIII1 === "string" && IllIII1.includes("Timeout awaiting 'request'")) Il1lI1II = ilIllil1 + " 请求超时，请检查网络重试";else {
        const IilI1i11 = iIiiiIiI?.["statusCode"];
        if (IilI1i11) {
          if ([403, 493].includes(IilI1i11)) Il1lI1II = ilIllil1 + " 请求失败，IP被限制（Response code " + IilI1i11 + "）", lllIl1i1 = true;else [400, 404].includes(IilI1i11) ? Il1lI1II = ilIllil1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IilI1i11 + "）" : Il1lI1II = ilIllil1 + " 请求失败（Response code " + IilI1i11 + "）";
        } else Il1lI1II = ilIllil1 + " 请求失败 => " + (IllIII1.message || IllIII1);
      }
      I1Iil1ii++;
    } else {
      const IIillI1I = lii1iI1l.getResponseCookie(iIiiiIiI),
        ll1liiiI = false;
      if (ll1liiiI) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + ilIllil1 + " 响应Body => " + (llli1Il || "无") + "\n");
        console.log("🔧 " + ilIllil1 + " 响应Cookie => " + (IIillI1I || "无") + "\n");
        console.log("🔧 " + ilIllil1 + " 请求参数");
        console.log(lIiiiIil);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(ilIllil1)) try {
        const iIliii1l = JSON.parse(llli1Il);
        IlIillll(ilIllil1, iIliii1l);
        break;
      } catch (iilliIll) {
        Il1lI1II = "❌ " + ilIllil1 + " 接口响应数据解析失败: " + iilliIll.message;
        console.log("🚫 " + ilIllil1 + " => " + String(llli1Il || "无响应数据"));
        ll1liiiI && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        I1Iil1ii++;
      } else break;
      lllIl1i1 = false;
    }
  }
  I1Iil1ii >= iIi1lili && (console.log(Il1lI1II), lllIl1i1 && !iIIllili && ($.outFlag = true, $.message && $.message.fix(Il1lI1II)));
}
async function iIilIiiI(I1llil1I, IlII1Ill = "POST") {
  if (IlII1Ill === "POST") return new Promise(async IilIii => {
    $.post(I1llil1I, (IIill11i, ii1ilIlI, IIliIi) => {
      IilIii({
        "err": IIill11i,
        "res": ii1ilIlI,
        "data": IIliIi
      });
    });
  });else {
    if (IlII1Ill === "GET") return new Promise(async Ilil1i1I => {
      $.get(I1llil1I, (I1iIIil1, iliili11, il1llI1i) => {
        Ilil1i1I({
          "err": I1iIIil1,
          "res": iliili11,
          "data": il1llI1i
        });
      });
    });else {
      const ii1I1li1 = "不支持的请求方法";
      return {
        "err": ii1I1li1,
        "res": null,
        "data": null
      };
    }
  }
}