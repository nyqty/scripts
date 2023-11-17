/*
活动名称：组队瓜分奖品（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10033&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_organizeTeam_url // 活动链接
		jd_lzkj_loreal_organizeTeam_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_organizeTeam_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_organizeTeam_break // 493后继续执行，默认退出运行（true/false）
		
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#组队瓜分奖品（超级无线）
1 1 1 1 * jd_lzkj_loreal_organizeTeam.js, tag=组队瓜分奖品（超级无线）, enabled=true		

*/

const Env=require('./utils/Env.js');
const $ = new Env('组队瓜分奖品（超级无线）')
var version_ = "jsjiami.com.v7";
const i11iII = require("./jdCookie"),
  lI1Ii1 = require("./function/jdCommon"),
  i1I11 = require("./function/sendJDNotify"),
  I1I1i1 = require("./function/krgetToken"),
  {
    wuxianDefense: i1I1l
  } = require("./function/jdCrypto"),
  i1I1i = process.env.jd_lzkj_loreal_organizeTeam_url || "",
  IIiiII = process.env.jd_lzkj_loreal_organizeTeam_opencard === "true",
  llIiI = process.env.jd_lzkj_loreal_organizeTeam_Notify === "true",
  Ilill = process.env.jd_lzkj_loreal_organizeTeam_break === "true";
let Ilili = "",
  I1ll1I = "";
const Iii1I1 = Object.keys(i11iII).map(l1iIii => i11iII[l1iIii]).filter(illllI => illllI);
!Iii1I1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!i1I1i) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const ii1l11 = lI1Ii1.parseUrl(i1I1i);
  if (!ii1l11) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = i1I1i;
  $.activityId = lI1Ii1.getUrlParameter(i1I1i, "activityId");
  $.activityType = lI1Ii1.getUrlParameter(i1I1i, "activityType");
  $.hostname = ii1l11?.["hostname"];
  $.pathname = ii1l11.pathname;
  let IIIIii = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      IIIIii = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (IIIIii = i1I1i.match(/\/(prod\/cc\/interact\w*)\//)[1]);
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + IIIIii;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !IIIIii || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  i1I11.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let i1i111 = 0; i1i111 < Iii1I1.length; i1i111++) {
    $.index = i1i111 + 1;
    Ilili = Iii1I1[i1i111];
    I1ll1I = Iii1I1[i1i111];
    lI1Ii1.setCookie(I1ll1I);
    $.UserName = decodeURIComponent(lI1Ii1.getCookieValue(Ilili, "pt_pin"));
    $.UA = lI1Ii1.genUA($.UserName);
    $.UUID = lI1Ii1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = i1I11.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await i11iI1();
    lI1Ii1.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  const liiill = i1I11.getMessage();
  liiill && (console.log("\n📣运行结果\n" + liiill.replace(/：/g, " ➜ ")), llIiI && (i1I11.updateContent(i1I11.content + ("\n【活动地址】" + $.activityUrl)), await i1I11.push()));
})().catch(lI1lII => $.logErr(lI1lII)).finally(() => $.done());
async function i11iI1() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await I1I1i1(I1ll1I, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await llIlI("login");
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
          await llIlI("follow");
          await $.wait(500);
          await llIlI("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await llIlI("follow");
          await $.wait(500);
          await llIlI("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (IIiiII) {
            const I1iii1 = await lI1Ii1.joinShopMember($.venderId);
            if (I1iii1) {
              console.log("加入店铺会员成功");
              await llIlI("login");
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
      await llIlI("initPinToken");
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
    await llIlI("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await llIlI("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10033":
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
      const li11 = $.activityContent?.["prizeType"];
      let ilIlI1 = "",
        I1Illi = "";
      switch (li11) {
        case 1:
          ilIlI1 = "京豆";
          I1Illi = "🐶";
          break;
        case 4:
          ilIlI1 = "积分";
          I1Illi = "🎟️";
          break;
        default:
          ilIlI1 = "未知";
          I1Illi = "❓";
      }
      const IIlilI = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        Illlll = $.time("yyyy-MM-dd HH:mm", $.actEndTime),
        Illlli = $.activityContent?.["prizeList"][0]?.["totalPrizeNum"],
        llli1l = $.activityContent?.["groupNumber"],
        lI1ii1 = $.activityContent?.["captainPrize"],
        llli1i = $.activityContent?.["memberPrize"],
        iiI1l1 = ($.shopName && "店铺名称：#" + $.shopName + "\n") + "开始时间：" + IIlilI + "\n结束时间：" + Illlll + "\n奖品类型：" + ilIlI1 + " " + I1Illi + "\n总计奖池：" + Illlli + "\n可组队伍：" + llli1l + " 🚗\n瓜分数量：" + 5 * llli1i + " " + I1Illi + "\n队长奖励：" + lI1ii1 + " " + I1Illi + "\n成员获得：" + llli1i + " " + I1Illi + "\n最高可得：" + (llli1l * (lI1ii1 + llli1i) + llli1i) + " " + I1Illi + "\n";
      i1I11.updateContent(i1I11.content + ("\n" + iiI1l1));
      console.log(iiI1l1);
      switch ($.actStatus) {
        case 0:
          const i11lI1 = Date.now();
          if ($.actStartTime && i11lI1 < $.actStartTime) {
            console.log("活动将在 " + IIlilI + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + IIlilI);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && i11lI1 > $.actEndTime) {
            console.log("活动已于 " + Illlll + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + Illlll);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + IIlilI + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + IIlilI);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + Illlll + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + Illlll);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      await $.wait(500);
    }
    if (!$.teamId) {
      let lIl1ii = $.activityContent?.["captainList"];
      const lIl1il = $.activityContent?.["groupNumber"] * 4,
        Ii1l11 = $.activityContent?.["joinFlag"];
      switch (Ii1l11) {
        case 5:
        case 2:
          await llIlI("saveCaptain");
          await $.wait(500);
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await llIlI("activity");
          await $.wait(500);
          lIl1ii = $.activityContent?.["captainList"];
          for (const iiI1lI of lIl1ii) {
            if (iiI1lI.memberCount === 5) {
              continue;
            }
            $.teamId = iiI1lI.id;
            break;
          }
          $.canJoinMembers = lIl1il;
          break;
        case 3:
        case 4:
          let IIlii1 = 0;
          for (const IIliiI of lIl1ii) {
            IIlii1 += IIliiI.memberCount - 1;
            if (IIliiI.memberCount === 5) {
              continue;
            }
            $.teamId = IIliiI.id;
            break;
          }
          if (IIlii1 >= lIl1il) {
            console.log("队伍人数已满");
            $.message.fix("队伍已满");
            $.runEnd = true;
            return;
          } else {
            console.log("已经是队长了");
            $.message.fix("已是队长");
            $.canJoinMembers = lIl1il - IIlii1;
          }
          break;
        default:
          console.log("未知队伍状态");
          $.message.insert("未知队伍状态");
          break;
      }
      await llIlI("getUserId");
      await $.wait(500);
    } else {
      const iliiII = $.activityContent?.["captain"];
      if (iliiII) {
        console.log("已经加入过队伍了");
        $.message.fix("已经加入过队伍");
      } else {
        await llIlI("saveMember");
        await $.wait(500);
      }
    }
  } catch (i1111I) {
    console.log("❌ 脚本运行遇到了错误\n" + i1111I);
  }
}
async function Iii1II(IliIl1, lIl1lI) {
  try {
    switch (IliIl1) {
      case "login":
        if (lIl1lI.resp_code === 0 && lIl1lI.data) {
          $.token = lIl1lI?.["data"]?.["token"];
          $.joinInfo = lIl1lI?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = lIl1lI?.["data"]?.["shopId"];
          $.venderId = lI1Ii1.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = lIl1lI?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          lIl1lI.resp_msg ? (console.log(IliIl1 + " " + lIl1lI.resp_msg), $.message.fix(lIl1lI.resp_msg), $.skipRun = true) : console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI));
        }
        break;
      case "follow":
        if (!(lIl1lI.resp_code === 0)) {
          lIl1lI.resp_msg ? (console.log(IliIl1 + " " + lIl1lI.resp_msg), $.message.fix(lIl1lI.resp_msg), $.skipRun = true) : console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI));
        }
        break;
      case "initPinToken":
        if (lIl1lI.resp_code === 0 && lIl1lI.data) {
          lIl1lI = JSON.parse(lIl1lI.data);
          if (lIl1lI.resp_code === 0 && lIl1lI.data) {
            $.pinToken = lIl1lI?.["data"]?.["pinToken"];
            $.encryptPin = lIl1lI?.["data"]?.["encryptPin"];
          } else {
            if (lIl1lI.resp_code === 1000) {
              console.log(IliIl1 + " " + lIl1lI.resp_msg);
              $.message.fix(lIl1lI.resp_msg);
              $.skipRun = true;
            } else {
              lIl1lI.resp_msg ? (console.log(IliIl1 + " " + lIl1lI.resp_msg), $.message.fix(lIl1lI.resp_msg), $.skipRun = true) : (console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI));
        }
        break;
      case "basicInfo":
        if (lIl1lI.resp_code === 0 && lIl1lI.data) {
          $.actStartTime = lIl1lI.data?.["startTime"];
          $.actEndTime = lIl1lI.data?.["endTime"];
          $.actStatus = lIl1lI.data?.["actStatus"];
          $.shopName = lIl1lI.data?.["shopName"];
          !$.activityType && ($.activityType = String(lIl1lI.data?.["actType"] || ""));
        } else {
          lIl1lI.resp_msg ? (console.log(IliIl1 + " " + lIl1lI.resp_msg), $.message.fix(lIl1lI.resp_msg)) : console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI));
        }
        break;
      case "activity":
        if (lIl1lI.resp_code === 0 && lIl1lI.data) {
          $.activityContent = lIl1lI.data;
        } else {
          lIl1lI.resp_msg ? (console.log(IliIl1 + " " + lIl1lI.resp_msg), $.message.fix(lIl1lI.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(Ii1II1 => lIl1lI.resp_msg.includes(Ii1II1)) && ($.runEnd = true)) : (console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI)), $.skipRun = true);
        }
        break;
      case "getUserId":
        if (lIl1lI.resp_code === 0 && lIl1lI.data) {
          $.shareUserId = lIl1lI.data?.["shareUserId"];
        } else {
          lIl1lI.resp_msg ? console.log(IliIl1 + " " + lIl1lI.resp_msg) : console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI));
        }
        break;
      case "saveCaptain":
        if (lIl1lI.resp_code === 0) {
          console.log("创建队伍成功");
          $.message.fix("创建队伍成功");
        } else {
          if (lIl1lI.resp_msg) {
            console.log(IliIl1 + " " + lIl1lI.resp_msg);
            $.message.insert(lIl1lI.resp_msg);
            $.skipRun = true;
            ["未开始", "结束", "不存在", "不在"].some(lI1ilI => lIl1lI.resp_msg.includes(lI1ilI)) && ($.runEnd = true);
          } else {
            console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI));
            $.skipRun = true;
          }
        }
        break;
      case "saveMember":
        if (lIl1lI.resp_code === 0) {
          console.log("加入队伍成功");
          $.message.fix("加入队伍成功");
          $.canJoinMembers -= 1;
          $.canJoinMembers <= 0 && (console.log("战队已满，运行完毕"), $.runEnd = true);
        } else {
          if (lIl1lI.resp_msg) {
            console.log(IliIl1 + " " + lIl1lI.resp_msg);
            $.message.insert(lIl1lI.resp_msg);
            ["未开始", "结束", "不存在", "不在"].some(IliIll => lIl1lI.resp_msg.includes(IliIll)) && ($.runEnd = true);
            if (lIl1lI.resp_msg.includes("上限")) {
              $.runEnd = true;
              break;
            }
          } else {
            console.log("❓" + IliIl1 + " " + JSON.stringify(lIl1lI));
          }
        }
        break;
    }
  } catch (l1lI1) {
    console.log("❌ 未能正确处理 " + IliIl1 + " 请求响应 " + (l1lI1.message || l1lI1));
  }
}
async function llIlI(Ili1I1) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let liI1II = $.newbaseUrl,
    i1Iii1 = {},
    l1liii = {},
    I1Ili1 = "POST";
  switch (Ili1I1) {
    case "login":
      liI1II += "/api/user-info/login";
      i1Iii1 = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      liI1II += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      I1Ili1 = "GET";
      liI1II += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      liI1II += "/api/active/basicInfo";
      i1Iii1 = {
        activityId: $.activityId
      };
      break;
    case "getUserId":
      liI1II += "/api/task/share/getUserId";
      break;
    case "activity":
      liI1II += "/api/task/organizeTeam/activity";
      i1Iii1 = {
        shareUserId: $.shareUserId || ""
      };
      break;
    case "saveCaptain":
      liI1II += "/api/task/organizeTeam/saveCaptain";
      break;
    case "saveMember":
      liI1II += "/api/task/organizeTeam/saveMember";
      i1Iii1 = {
        shareUserId: $.shareUserId,
        teamId: $.teamId
      };
      break;
    default:
      console.log("❌ 未知请求 " + Ili1I1);
      return;
  }
  const l1liil = I1Ili1 === "POST" && $.pathname.includes("/prod/cc/interactsaas") && i1I1l.isDefenseApi(liI1II.replace($.newbaseUrl, "").split("?")[0]);
  l1liil && (i1Iii1.actId = $.activityId, l1liii = {
    ecyText: i1I1l.encrypt(i1Iii1, $.pinToken, $.te)
  });
  const i1ll1 = {
    url: liI1II,
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
    body: JSON.stringify(l1liil ? l1liii : i1Iii1),
    timeout: 30000
  };
  $.token && (i1ll1.headers.token = $.token);
  if (I1Ili1 === "GET") {
    delete i1ll1.body;
    delete i1ll1.headers["Content-Type"];
  }
  const lilI1I = 5;
  let lI1I1l = 0,
    Il1Il = null,
    i1IiiI = false;
  while (lI1I1l < lilI1I) {
    lI1I1l > 0 && (await $.wait(1000));
    const {
      err: Ili1Il,
      res: i1liI,
      data: iilIIi
    } = await l1iIil(i1ll1, I1Ili1);
    if (Ili1Il) {
      if (typeof Ili1Il === "string" && Ili1Il.includes("Timeout awaiting 'request'")) {
        Il1Il = Ili1I1 + " 请求超时，请检查网络重试";
      } else {
        const IIlI1i = i1liI?.["statusCode"];
        if (IIlI1i) {
          if ([403, 493].includes(IIlI1i)) {
            Il1Il = Ili1I1 + " 请求失败，IP被限制（Response code " + IIlI1i + "）";
            i1IiiI = true;
          } else {
            if ([400, 404].includes(IIlI1i)) {
              Il1Il = Ili1I1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IIlI1i + "）";
            } else {
              if ([500].includes(IIlI1i) && l1liil) {
                i1ll1.body = JSON.stringify({
                  ecyText: i1I1l.encrypt(i1Iii1, $.pinToken, $.te)
                });
              } else {
                Il1Il = Ili1I1 + " 请求失败（Response code " + IIlI1i + "）";
              }
            }
          }
        } else {
          Il1Il = Ili1I1 + " 请求失败 => " + (Ili1Il.message || Ili1Il);
        }
      }
      lI1I1l++;
    } else {
      const iiiI11 = lI1Ii1.getResponseCookie(i1liI);
      switch (Ili1I1) {
        case "initPinToken":
          const i1lil = lI1Ii1.getCookieValue(iiiI11, "te");
          i1lil && ($.te = i1lil);
          break;
      }
      if (iilIIi) {
        try {
          const IilII = JSON.parse(iilIIi);
          Iii1II(Ili1I1, IilII);
          break;
        } catch (ili1l) {
          Il1Il = "❌ " + Ili1I1 + " 接口响应数据解析失败: " + ili1l.message;
          console.log("🚫 " + Ili1I1 + " => " + String(iilIIi));
          lI1I1l++;
        }
      } else {
        l1liil && (i1ll1.body = JSON.stringify({
          ecyText: i1I1l.encrypt(i1Iii1, $.pinToken, $.te)
        }));
        Il1Il = "❌ " + Ili1I1 + " 接口无响应数据";
        lI1I1l++;
      }
      i1IiiI = false;
    }
  }
  if (lI1I1l >= maxRequestTimes) {
    console.log(Il1Il);
    if (i1IiiI) {
      !Ilill && ($.outFlag = true, $.message && $.message.fix(Il1Il));
    }
  }
}
async function l1iIil(liI1Il, I1iIi = "POST") {
  if (I1iIi === "POST") {
    return new Promise(async l1Ii1 => {
      $.post(liI1Il, (I1IllI, IIlI11, iIIll1) => {
        l1Ii1({
          err: I1IllI,
          res: IIlI11,
          data: iIIll1
        });
      });
    });
  } else {
    if (I1iIi === "GET") {
      return new Promise(async llIIII => {
        $.get(liI1Il, (ilI11I, ili1I, iilIIl) => {
          llIIII({
            err: ilI11I,
            res: ili1I,
            data: iilIIl
          });
        });
      });
    } else {
      const i1Iili = "不支持的请求方法";
      return {
        err: i1Iili,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";