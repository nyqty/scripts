/*
活动名称：组队瓜分奖品 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/wxTeam/activity2/activity?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/wxTeam/activity?activityId=<活动id>
环境变量：jd_wxTeam_activityUrl // 活动链接（必填）
        jd_wxTeam_joinMember // 是否入会（true/false），默认入会
        jd_wxTeam_Notify // 是否推送通知（true/false），默认不推送
        jd_wxTeam_Concurrent // 是否启用并发模式（true/false），默认不开启
        jd_wxTeam_maxConcurrency // 控制并发线程数（正整数），默认3
		jd_wxTeam_blacklist 黑名单 用&隔开 pin值
		JD_LZ_OPEN // 是否开启LZ活动运行，默认运行
		JD_CJ_OPEN // 是否开启CJ活动运行，默认运行
		jd_wxTeam_break // 493后继续执行，默认退出运行（true/false）

队长无效或无法创建战队时会退出执行，并发模式下也支持入会

cron: 7 7 7 7 * jd_wxTeam.js

*/

const Env=require('./utils/Env.js');
const $ = new Env('组队瓜分奖品（超级无线/超级会员）')
const II1iIl = $.isNode() ? require("./jdCookie") : "",
  II1iIi = require("./function/jdCommon"),
  iI1iI = require("./function/sendJDNotify"),
  Ii11I1 = require("./function/krgetToken"),
  li1IiI = require("crypto-js");
let Illl = [];
const Illi = process.env.jd_wxTeam_activityUrl || "",
  l1IiiI = !(process.env.jd_wxTeam_joinMember === "false"),
  II1iI1 = process.env.jd_wxTeam_Notify === "true",
  iI1i1 = process.env.jd_wxTeam_Concurrent === "true",
  il11Il = process.env.jd_wxTeam_maxConcurrency || "3";
let IIiI1 = "",
  II1iII = "",
  il11Ii = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(II1iIl).forEach(iil1 => {
    Illl.push(II1iIl[iil1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  Illl = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(iiIIiI => iiIIiI.cookie)].filter(i1liII => !!i1liII);
}
!Illl[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
const li1Ii1 = process.env.jd_wxTeam_break === "true";
let i1ii11 = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  iii1 = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  ill1i = "",
  ill1l = "";
$.whitelist = process.env.jd_wxTeam_whitelist || ill1i;
$.blacklist = process.env.jd_wxTeam_blacklist || ill1l;
li1Il1();
iilI();
!(async () => {
  if (!Illi) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const ill1I = II1iIi.parseUrl(Illi);
  if (!ill1I) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = Illi;
  $.activityId = II1iIi.getUrlParameter(Illi, "activityId");
  $.hostname = ill1I?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      if (iii1 === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else {
        $.activityMode = "cjhy";
      }
    } else {
      if ($.hostname.includes("lzkj")) {
        if (i1ii11 === "false") {
          console.log("\n❌  已设置全局关闭LZ相关活动\n");
          return;
        } else {
          $.activityMode = "lzkj";
          $.hostname = "lzkj-isv.isvjd.com";
        }
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityMode || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  iI1iI.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  if (!iI1i1) {
    for (let iill = 0; iill < Illl.length; iill++) {
      $.index = iill + 1;
      IIiI1 = Illl[iill];
      il11Ii = Illl[iill];
      II1iIi.setCookie(il11Ii);
      $.UserName = decodeURIComponent(II1iIi.getCookieValue(IIiI1, "pt_pin"));
      $.UA = II1iIi.genUA($.UserName);
      $.UUID = II1iIi.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.message = iI1iI.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await iiIIi1();
      II1iIi.unsetCookie();
      if ($.outFlag || $.runEnd) {
        break;
      }
    }
    const IIl1II = iI1iI.getMessage();
    IIl1II && (console.log("\n📣 运行结果\n" + IIl1II.replace(/：/g, " ➜ ")), II1iI1 && (iI1iI.updateContent(iI1iI.content + ("\n【活动地址】" + $.activityUrl)), await iI1iI.push()));
  } else {
    console.log("🔀 已开启并发模式，当前设置线程数为 " + il11Il);
    for (let lIlIii = 0; lIlIii < 1; lIlIii++) {
      $.index = lIlIii + 1;
      IIiI1 = Illl[lIlIii];
      il11Ii = Illl[lIlIii];
      $.UserName = decodeURIComponent(II1iIi.getCookieValue(IIiI1, "pt_pin"));
      $.UA = II1iIi.genUA($.UserName);
      $.UUID = II1iIi.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.message = iI1iI.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await iiIIi1();
      if ($.outFlag || $.runEnd) {
        break;
      }
    }
    !$.outFlag && !$.runEnd && $.captainUuid && (console.log(""), await i1liI1());
    const llIi1I = iI1iI.getMessage();
    llIi1I && II1iI1 && (iI1iI.updateContent(iI1iI.content + ("\n【活动地址】" + $.activityUrl)), await iI1iI.push());
  }
})().catch(I11lil => $.logErr(I11lil)).finally(() => $.done());
async function iiIIi1() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.LZ_AES_PIN = "";
    II1iII = "";
    $.yunMidImageUrl = "";
    if ($.skipRun || $.runEnd || $.outFlag) {
      return;
    }
    await ll1I1l($.activityUrl);
    await $.wait(500);
    if ($.skipRun) {
      console.log("获取 LZ_TOKEN 失败！");
      $.message.fix("获取[LZ_TOKEN]失败");
      $.index === 1 && ($.runEnd = true);
      return;
    }
    if ($.outFlag || $.runEnd) {
      return;
    }
    if ($.index === 1) {
      await ll1I1i("getSimpleActInfoVo");
      if (!$.venderId) {
        $.runEnd = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
    }
    $.token = await Ii11I1(il11Ii, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      $.index === 1 && ($.runEnd = true);
      return;
    }
    if ($.activityMode === "cjhy") {
      await ll1I1i("initPinToken");
      if ($.runEnd || $.skipRun || $.outFlag) {
        return;
      }
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        $.index === 1 && ($.runEnd = true);
        return;
      }
    } else {
      await ll1I1i("getMyPing");
      if ($.runEnd || $.skipRun || $.outFlag) {
        return;
      }
      if (!$.secretPin) {
        console.log("未能获取用户鉴权信息！");
        $.message.fix("未能获取用户鉴权信息");
        $.index === 1 && ($.runEnd = true);
        return;
      }
    }
    if (!iI1i1) {
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.LZ_AES_PIN = II1iIi.getCookieValue(II1iII, "LZ_AES_PIN");
    switch ($.activityMode) {
      case "lzkj":
        $.formatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.formatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    if (!iI1i1) {
      $.activityMode === "cjhy" ? await $.wait(500) : await $.wait(200);
    }
    switch ($.activityMode) {
      case "lzkj":
        await ll1I1i("accessLogWithAD");
        break;
      case "cjhy":
        await ll1I1i("accessLog");
        break;
    }
    if (!iI1i1) {
      $.activityMode === "cjhy" ? await $.wait(500) : await $.wait(200);
    }
    if ($.index === 1) {
      await ll1I1i("activityContent");
      if ($.runEnd || $.outFlag) {
        return;
      }
      const iI1I = $.activityContent?.["actStatus"],
        liIiiI = $.activityContent?.["active"],
        l11Iii = $.activityContent?.["list"],
        IIllii = $.activityContent?.["successRetList"],
        IIllil = $.activityContent?.["signUuid"],
        Il1l1I = $.activityContent?.["canCreate"];
      if (!liIiiI) {
        console.log("未能获取到活动信息！");
        $.message.fix("未能获取到活动信息");
        return;
      }
      if (iI1I === 0) {
        console.log("活动将在 " + liIiiI.startTimeStr + " 开始，晚点再来吧~");
        $.message.fix("活动尚未进行，将于 " + liIiiI.startTimeStr + " 开始");
        $.runEnd = true;
        return;
      }
      $.membersPinArray = [];
      const lIII = IIllii || [],
        iI11 = l11Iii || [];
      let liIii1 = "",
        Iili11 = "";
      switch (liIiiI.prizeType) {
        case 6:
          liIii1 = "京豆";
          Iili11 = "🐶";
          break;
        case 9:
          liIii1 = "积分";
          Iili11 = "🎟️";
          break;
        default:
          liIii1 = "未知";
          Iili11 = "❓";
      }
      await ll1I1i("shopInfo");
      const I111II = ($.shopName && "店铺名称：#" + $.shopName + "\n") + "开始时间：" + liIiiI.startTimeStr + "\n结束时间：" + liIiiI.endTimeStr + "\n奖品类型：" + liIii1 + " " + Iili11 + "\n总计奖池：" + liIiiI.sendNumbers + "\n可组队伍：" + liIiiI.maxGroup + " 🚗\n瓜分数量：" + 5 * liIiiI.prizeNumbers + " " + Iili11 + "\n队长奖励：" + liIiiI.extraPrizeNumbers + " " + Iili11 + "\n成员获得：" + liIiiI.prizeNumbers + " " + Iili11 + "\n最高可得：" + (liIiiI.maxGroup * (liIiiI.extraPrizeNumbers + liIiiI.prizeNumbers) + liIiiI.prizeNumbers) + " " + Iili11 + "\n";
      console.log(I111II);
      iI1iI.updateContent(iI1iI.content + ("\n" + I111II));
      if (iI1I === -1) {
        console.log("活动已于 " + liIiiI.endTimeStr + " 结束，下次早点来吧~");
        $.message.fix("活动已于 " + liIiiI.endTimeStr + " 结束");
        $.runEnd = true;
        return;
      }
      if (IIllii.length === liIiiI.maxGroup) {
        console.log("活动创建队伍已达到上限且成员已满");
        $.message.fix("活动创建队伍已达到上限且成员已满");
        $.runEnd = true;
        return;
      }
      const lII1 = liIiiI.maxGroup * 4;
      if (IIllil) {
        $.captainUuid = IIllil;
        console.log("已经是队长了，队伍ID：" + $.captainUuid);
        $.message.fix("已是队长");
        lIII.length > 0 && lIII.forEach(ilIili => {
          const l11Il1 = ilIili?.["memberList"] || [];
          l11Il1.forEach(Iili1i => {
            Iili1i?.["pin"] !== $.secretPin && $.membersPinArray.push(Iili1i?.["pin"]);
          });
        });
        iI11.length > 1 && iI11.forEach(lIl1l => {
          lIl1l?.["pin"] !== $.secretPin && $.membersPinArray.push(lIl1l?.["pin"]);
        });
        $.canJoinMembers = lII1 - $.membersPinArray.length;
      } else {
        if (Il1l1I) {
          await ll1I1i("saveCaptain");
          if ($.needJoinMember && l1IiiI) {
            const iIlIii = await II1iIi.joinShopMember($.venderId);
            iIlIii && (console.log("加入店铺会员成功"), $.isMember = true, await ll1I1i("saveCaptain"));
          }
          if ($.runEnd || $.outFlag) {
            return;
          }
          $.canJoinMembers = lII1;
        } else {
          console.log("未知用户场景");
          $.message.fix("未知用户场景");
          $.runEnd = true;
          return;
        }
      }
    } else {
      if ($.membersPinArray.length > 0 && $.membersPinArray.includes($.secretPin)) {
        console.log("已经是此队的成员了，跳过");
        $.message.fix("已是此队成员");
        return;
      }
      await ll1I1i("saveMember");
      if ($.needJoinMember && l1IiiI) {
        const iIlIi1 = await II1iIi.joinShopMember($.venderId);
        iIlIi1 && (console.log("加入店铺会员成功"), $.isMember = true, await ll1I1i("saveMember"));
      }
    }
    if (!iI1i1) {
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
  } catch (iIi) {
    console.log("❌ 脚本运行遇到了错误\n" + iIi);
  }
}
async function i1liI1() {
  await II1iIi.concTask(il11Il, Illl, async (lli1lI, Ii1liI) => {
    if (Ii1liI === 1) {
      return;
    }
    const Ii1li1 = decodeURIComponent(II1iIi.getCookieValue(lli1lI, "pt_pin")),
      iiil1 = II1iIi.genUA(Ii1li1),
      liIil1 = iI1iI.create(Ii1liI, Ii1li1);
    let IIiIlI = "",
      ilII1I = "",
      iiIlI1 = "",
      lli1l1 = "",
      lii1l = "",
      lii1i = "",
      lliIl = "",
      lliIi = "",
      l1Iii1 = false,
      IIiIi1 = false;
    lii1i = await iiiii();
    if (lii1i) {
      IIiIlI = await Ii11I1(lli1lI, $.baseUrl);
      if (!IIiIlI) {
        liIil1.fix("获取[Token]失败");
        console.log(liIil1.getInlineContent());
        return;
      }
      $.activityMode === "cjhy" ? await I1i1("initPinToken") : await I1i1("getMyPing");
      if (!ilII1I) {
        liIil1.fix("未能获取用户鉴权信息");
        console.log(liIil1.getInlineContent());
        return;
      }
      switch ($.activityMode) {
        case "lzkj":
          lliIl = encodeURIComponent(ilII1I);
          break;
        case "cjhy":
          lliIl = encodeURIComponent(encodeURIComponent(ilII1I));
          break;
      }
      if ($.canJoinMembers <= 0) {
        return {
          runEnd: true
        };
      }
      if ($.membersPinArray.length > 0 && $.membersPinArray.includes(ilII1I)) {
        liIil1.fix("已是此队成员");
      } else {
        await I1i1("saveMember");
        if (IIiIi1) {
          console.log(liIil1.getInlineContent());
          return {
            runEnd: true
          };
        }
        if (l1Iii1 && l1IiiI) {
          const iilI1I = await II1iIi.joinShopMember($.venderId, lli1lI);
          if (iilI1I) {
            liIil1.insert("加入店铺会员成功");
            await I1i1("saveMember");
            if (IIiIi1) {
              console.log(liIil1.getInlineContent());
              return {
                runEnd: true
              };
            }
          }
        }
      }
    } else {
      liIil1.fix("获取[LZ_COOKIE]失败");
    }
    console.log(liIil1.getInlineContent());
    async function I1i1(I1Iii1) {
      const IlIiii = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
      let ilIII1 = "",
        lll1lI = "",
        lliliI = "POST";
      switch (I1Iii1) {
        case "getMyPing":
          ilIII1 = $.baseUrl + "/customer/getMyPing";
          lll1lI = "token=" + IIiIlI + "&fromType=APP&userId=" + $.venderId;
          break;
        case "initPinToken":
          lliliI = "GET";
          ilIII1 = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + IIiIlI + "&source=01&venderId=" + $.venderId + "&uuid=" + II1iIi.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") + "&clientTime=" + Date.now();
          break;
        case "saveMember":
          ilIII1 = $.baseUrl + "/wxTeam/saveMember";
          $.activityMode === "cjhy" ? lll1lI = JSON.stringify({
            ecyText: i1ii1I({
              activityId: $.activityId,
              signUuid: $.captainUuid,
              pin: encodeURIComponent(ilII1I),
              pinImg: lliIi || IlIiii,
              venderId: $.venderId,
              actId: $.activityId
            }, iiIlI1, lli1l1)
          }) : lll1lI = "activityId=" + $.activityId + "&pin=" + lliIl + "&pinImg=" + encodeURIComponent(lliIi || IlIiii) + "&signUuid=" + $.captainUuid;
          break;
      }
      const ll1iiI = {
        url: ilIII1,
        headers: {
          Origin: $.origin,
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9",
          Connection: "keep-alive",
          "Content-Type": ["saveCaptain", "saveMember"].includes(I1Iii1) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
          Cookie: lii1i,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": iiil1,
          "X-Requested-With": "XMLHttpRequest",
          Referer: $.activityUrl
        },
        body: lll1lI,
        timeout: 60000
      };
      lliliI === "GET" && (delete ll1iiI.body, delete ll1iiI.headers["Content-Type"]);
      const {
        err: lIIlll,
        res: ll1ii1,
        data: i11li1
      } = await iiiiII(ll1iiI, lliliI);
      if (lIIlll) {
        if (!["accessLog", "accessLogWithAD"].includes(I1Iii1)) {
          if (typeof lIIlll === "string" && lIIlll.includes("Timeout awaiting 'request'")) {
            liIil1.fix("请求超时");
          } else {
            const IiIlII = ll1ii1?.["statusCode"];
            if (IiIlII) {
              if ([403, 493].includes(IiIlII)) {
                liIil1.fix(I1Iii1 + " 请求失败，IP被限制（Response code " + IiIlII + "）");
              } else {
                if ([400, 404].includes(IiIlII)) {
                  liIil1.fix(I1Iii1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IiIlII + "）");
                } else {
                  [500].includes(IiIlII) && I1Iii1 === "saveMember" && $.activityMode === "cjhy" ? ll1iiI.body = JSON.stringify({
                    ecyText: i1ii1I({
                      activityId: $.activityId,
                      signUuid: $.captainUuid,
                      pin: encodeURIComponent(ilII1I),
                      pinImg: lliIi || IlIiii,
                      venderId: $.venderId,
                      actId: $.activityId
                    }, iiIlI1, lli1l1)
                  }) : liIil1.fix(I1Iii1 + " 请求失败（Response code " + IiIlII + "）");
                }
              }
            } else {
              liIil1.fix(I1Iii1 + " 请求失败 => " + (lIIlll.message || lIIlll));
            }
          }
        }
      } else {
        const iIllIi = II1iIi.getResponseCookie(ll1ii1, lii1i),
          iI11l = false;
        iI11l && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + I1Iii1 + " 响应Body => " + (i11li1 || "无") + "\n"), console.log("🔧 " + I1Iii1 + " 响应Cookie => " + (iIllIi || "无") + "\n"), console.log("🔧 " + I1Iii1 + " 请求参数"), console.log(ll1iiI), console.log("\n---------------------------------------------------\n"));
        switch (I1Iii1) {
          case "getMyPing":
            lii1l = II1iIi.getCookieValue(iIllIi, "LZ_AES_PIN");
            break;
          case "initPinToken":
            lii1l = II1iIi.getCookieValue(iIllIi, "LZ_AES_PIN");
            iiIlI1 = II1iIi.getCookieValue(iIllIi, "pToken");
            lli1l1 = II1iIi.getCookieValue(iIllIi, "te");
            break;
        }
        ["getMyPing"].includes(I1Iii1) && (lii1i = iIllIi);
        !II1iIi.getCookieValue(lii1i, "LZ_AES_PIN") && lii1l && (lii1i += "LZ_AES_PIN=" + lii1l + "; ");
        !II1iIi.getCookieValue(lii1i, "pToken") && iiIlI1 && (lii1i += "pToken=" + iiIlI1 + "; ");
        !II1iIi.getCookieValue(lii1i, "AUTH_C_USER") && ilII1I && (lii1i += "AUTH_C_USER=" + ilII1I + "; ");
        !II1iIi.getCookieValue(lii1i, "te") && lli1l1 && (lii1i += "te=" + lli1l1 + "; ");
        if (!["accessLog", "accessLogWithAD"].includes(I1Iii1)) {
          if (i11li1) {
            try {
              const lll1l1 = JSON.parse(i11li1);
              switch (I1Iii1) {
                case "getMyPing":
                case "initPinToken":
                  if (lll1l1.result === true && lll1l1.data) {
                    ilII1I = lll1l1.data?.["secretPin"];
                    lliIi = lll1l1.data?.["yunMidImageUrl"];
                  } else {
                    lll1l1.errorMessage && liIil1.fix(I1Iii1 + " " + lll1l1.errorMessage);
                  }
                  break;
                case "saveMember":
                  if (lll1l1.result === true && lll1l1.data) {
                    liIil1.insert("加入队伍成功");
                    $.canJoinMembers -= 1;
                    $.canJoinMembers <= 0 && (liIil1.insert("战队已满运行完毕"), IIiIi1 = true);
                  } else {
                    if (lll1l1.errorMessage) {
                      if (["组队完成", "已满"].some(iIllIl => lll1l1.errorMessage.includes(iIllIl))) {
                        $.canJoinMembers = 0;
                        liIil1.insert("战队已满运行完毕");
                        IIiIi1 = true;
                      } else {
                        if (["会员", "开卡"].some(I1ll => lll1l1.errorMessage.includes(I1ll))) {
                          l1Iii1 = true;
                          !l1IiiI && liIil1.fix(lll1l1.errorMessage);
                        } else {
                          liIil1.fix(lll1l1.errorMessage);
                          for (let ll1iil of ["未开始", "结束", "不存在", "不在"]) {
                            lll1l1.errorMessage.includes(ll1iil) && (IIiIi1 = true);
                          }
                        }
                      }
                    }
                  }
                  break;
              }
            } catch (I1Iill) {
              liIil1.fix("❌ " + I1Iii1 + " 接口响应数据解析失败: " + (I1Iill.message || e));
              iI11l && (console.log("\n---------------------------------------------------\n"), console.log(lii1i), console.log("\n---------------------------------------------------\n"));
            }
          } else {
            liIil1.fix("❌ " + I1Iii1 + " 接口无响应数据");
            I1Iii1 === "saveMember" && $.activityMode === "cjhy" && (ll1iiI.body = JSON.stringify({
              ecyText: i1ii1I({
                activityId: $.activityId,
                signUuid: $.captainUuid,
                pin: encodeURIComponent(ilII1I),
                pinImg: lliIi || IlIiii,
                venderId: $.venderId,
                actId: $.activityId
              }, iiIlI1, lli1l1)
            }));
          }
        }
      }
    }
    async function iiiii() {
      return new Promise(iilI1l => {
        let I1IilI = {
          url: $.activityUrl,
          headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: $.activityUrl,
            "User-Agent": iiil1
          },
          timeout: 30000
        };
        $.get(I1IilI, (lIIllI, IIllli, lIIll1) => {
          try {
            IIllli.status === 200 ? iilI1l(II1iIi.getResponseCookie(IIllli, lii1i)) : iilI1l(null);
          } catch (Il1ii) {
            iilI1l(null);
          }
        });
      });
    }
  });
  console.log("\n并发运行完毕");
}
async function l1IilI(iI1i1I, iIil1i) {
  try {
    switch (iI1i1I) {
      case "getMyPing":
        if (iIil1i.result === true && iIil1i.data) {
          $.secretPin = iIil1i.data?.["secretPin"];
          $.nickname = iIil1i.data?.["nickname"];
        } else {
          iIil1i.errorMessage ? (console.log(iI1i1I + " " + iIil1i.errorMessage), $.message.fix(iIil1i.errorMessage), $.index === 1 && ($.runEnd = true)) : (console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i)), $.index === 1 && ($.runEnd = true));
        }
        break;
      case "initPinToken":
        if (iIil1i.result === true && iIil1i.data) {
          $.secretPin = iIil1i.data?.["secretPin"];
          $.nickname = iIil1i.data?.["nickname"];
          $.yunMidImageUrl = iIil1i.data?.["yunMidImageUrl"];
        } else {
          if (iIil1i.errorMessage) {
            console.log(iI1i1I + " " + iIil1i.errorMessage);
            $.message.fix(iIil1i.errorMessage);
            $.index === 1 && ($.runEnd = true);
          } else {
            console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i));
            if ($.index === 1) {
              $.runEnd = true;
            }
          }
        }
        break;
      case "getSimpleActInfoVo":
        if (iIil1i.result === true && iIil1i.data) {
          $.venderId = iIil1i.data?.["venderId"];
          $.shopId = iIil1i.data?.["shopId"];
          $.activityType = iIil1i.data?.["activityType"];
        } else {
          if (iIil1i.errorMessage) {
            console.log(iI1i1I + " " + iIil1i.errorMessage);
          } else {
            console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i));
          }
        }
        break;
      case "getActMemberInfo":
        if (iIil1i.result === true && iIil1i.data) {
          $.isMember = iIil1i.data.openCard || false;
        } else {
          iIil1i.errorMessage ? console.log(iI1i1I + " " + iIil1i.errorMessage) : console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i));
        }
      case "getOpenCardInfo":
        if (iIil1i.result === true && iIil1i.data) {
          $.isMember = iIil1i.data.openedCard || false;
        } else {
          if (iIil1i.errorMessage) {
            console.log(iI1i1I + " " + iIil1i.errorMessage);
          } else {
            console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i));
          }
        }
        break;
      case "activityContent":
        if (iIil1i.result === true && iIil1i.data) {
          $.activityContent = iIil1i.data;
        } else {
          if (iIil1i.errorMessage) {
            for (let llill1 of ["未开始", "结束", "不存在", "不在"]) {
              if (iIil1i.errorMessage.includes(llill1)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(iI1i1I + " " + iIil1i.errorMessage);
            $.message.fix(iIil1i.errorMessage);
          } else {
            console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i));
          }
        }
        break;
      case "shopInfo":
        if (iIil1i.result === true && iIil1i.data) {
          $.shopName = iIil1i.data?.["shopName"];
        } else {
          iIil1i.errorMessage ? console.log("" + (iIil1i.errorMessage || "")) : console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i));
        }
        break;
      case "saveCaptain":
        if (iIil1i.result === true && iIil1i.data) {
          $.captainUuid = iIil1i.data.signUuid;
          console.log("创建队伍成功");
          $.message.fix("创建队伍成功");
        } else {
          iIil1i.errorMessage ? (["会员", "开卡"].some(i1IIIl => iIil1i.errorMessage.includes(i1IIIl)) ? ($.needJoinMember = true, !l1IiiI && ($.message.fix(iIil1i.errorMessage), $.runEnd = true)) : $.message.fix(iIil1i.errorMessage), console.log(iIil1i.errorMessage)) : (console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i)), $.runEnd = true);
        }
        break;
      case "saveMember":
        if (iIil1i.result === true && iIil1i.data) {
          console.log("加入队伍成功");
          $.message.fix("加入队伍成功");
          $.canJoinMembers -= 1;
          if ($.canJoinMembers <= 0) {
            console.log("\n战队已满，运行完毕");
            $.runEnd = true;
          }
        } else {
          if (iIil1i.errorMessage) {
            if (["组队完成", "已满"].some(il1lil => iIil1i.errorMessage.includes(il1lil))) {
              $.canJoinMembers = 0;
              $.message.fix("战队已满运行完毕");
              $.runEnd = true;
            } else {
              if (["会员", "开卡"].some(iiliii => iIil1i.errorMessage.includes(iiliii))) {
                $.needJoinMember = true;
                !l1IiiI && $.message.fix(iIil1i.errorMessage);
              } else {
                for (let I1iii of ["未开始", "结束", "不存在", "不在"]) {
                  if (iIil1i.errorMessage.includes(I1iii)) {
                    $.runEnd = true;
                    break;
                  }
                }
                $.message.fix(iIil1i.errorMessage);
              }
            }
            console.log(iIil1i.errorMessage);
          } else {
            console.log("❓" + iI1i1I + " " + JSON.stringify(iIil1i));
          }
        }
        break;
    }
  } catch (ll1ilI) {
    console.log("❌ 未能正确处理 " + iI1i1I + " 请求响应 " + (ll1ilI.message || ll1ilI));
  }
}
async function ll1I1i(I1ilI) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  const llilil = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
  let il1lii = "",
    illi1i = "",
    lll1ll = "POST";
  switch (I1ilI) {
    case "getMyPing":
      il1lii = $.baseUrl + "/customer/getMyPing";
      illi1i = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      il1lii = $.baseUrl + "/customer/getSimpleActInfoVo";
      illi1i = "activityId=" + $.activityId;
      break;
    case "initPinToken":
      lll1ll = "GET";
      il1lii = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now();
      break;
    case "accessLog":
      il1lii = $.baseUrl + "/common/accessLog";
      illi1i = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      il1lii = $.baseUrl + "/common/accessLogWithAD";
      illi1i = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
      break;
    case "getActMemberInfo":
      il1lii = $.baseUrl + "/wxCommonInfo/getActMemberInfo";
      illi1i = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
      break;
    case "getOpenCardInfo":
      il1lii = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      illi1i = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
      break;
    case "activityContent":
      il1lii = $.baseUrl + "/wxTeam/activityContent";
      illi1i = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&signUuid=";
      break;
    case "shopInfo":
      il1lii = $.baseUrl + "/wxTeam/shopInfo";
      illi1i = "activityId=" + $.activityId;
      break;
    case "saveCaptain":
      il1lii = $.baseUrl + "/wxTeam/saveCaptain";
      if ($.activityMode === "cjhy") {
        illi1i = JSON.stringify({
          ecyText: i1ii1I({
            activityId: $.activityId,
            pin: encodeURIComponent($.secretPin),
            pinImg: $.yunMidImageUrl || llilil,
            venderId: $.venderId,
            actId: $.activityId
          }, $.pinToken, $.te)
        });
      } else {
        illi1i = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&pinImg=" + encodeURIComponent($.yunMidImageUrl || llilil);
      }
      break;
    case "saveMember":
      il1lii = $.baseUrl + "/wxTeam/saveMember";
      $.activityMode === "cjhy" ? illi1i = JSON.stringify({
        ecyText: i1ii1I({
          activityId: $.activityId,
          signUuid: $.captainUuid,
          pin: encodeURIComponent($.secretPin),
          pinImg: $.yunMidImageUrl || llilil,
          venderId: $.venderId,
          actId: $.activityId
        }, $.pinToken, $.te)
      }) : illi1i = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&pinImg=" + encodeURIComponent($.yunMidImageUrl || llilil) + "&signUuid=" + $.captainUuid;
      break;
    default:
      console.log("❌ 未知请求 " + I1ilI);
      return;
  }
  const illi1l = {
    url: il1lii,
    headers: {
      Origin: $.origin,
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      Connection: "keep-alive",
      "Content-Type": ["saveCaptain", "saveMember"].includes(I1ilI) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
      Cookie: II1iII,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      Referer: $.activityUrl
    },
    body: illi1i,
    timeout: 30000
  };
  lll1ll === "GET" && (delete illi1l.body, delete illi1l.headers["Content-Type"]);
  const l1llI = 5;
  let llilii = 0,
    lll1li = null,
    l1ii1l = false;
  while (llilii < l1llI) {
    llilii > 0 && (await $.wait(1000));
    const {
      err: l1IIIi,
      res: i111i1,
      data: l1IlI
    } = await iiiiII(illi1l, lll1ll);
    if (l1IIIi) {
      if (typeof l1IIIi === "string" && l1IIIi.includes("Timeout awaiting 'request'")) {
        lll1li = I1ilI + " 请求超时，请检查网络重试";
      } else {
        const iiiii1 = i111i1?.["statusCode"];
        if (iiiii1) {
          if ([403, 493].includes(iiiii1)) {
            lll1li = I1ilI + " 请求失败，IP被限制（Response code " + iiiii1 + "）";
            l1ii1l = true;
          } else {
            if ([400, 404].includes(iiiii1)) {
              lll1li = I1ilI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iiiii1 + "）";
            } else {
              if ([500].includes(iiiii1) && $.activityMode === "cjhy") {
                switch (I1ilI) {
                  case "saveCaptain":
                    illi1l.body = JSON.stringify({
                      ecyText: i1ii1I({
                        activityId: $.activityId,
                        pin: encodeURIComponent($.secretPin),
                        pinImg: $.yunMidImageUrl || llilil,
                        venderId: $.venderId,
                        actId: $.activityId
                      }, $.pinToken, $.te)
                    });
                    break;
                  case "saveMember":
                    illi1l.body = JSON.stringify({
                      ecyText: i1ii1I({
                        activityId: $.activityId,
                        signUuid: $.captainUuid,
                        pin: encodeURIComponent($.secretPin),
                        pinImg: $.yunMidImageUrl || llilil,
                        venderId: $.venderId,
                        actId: $.activityId
                      }, $.pinToken, $.te)
                    });
                    break;
                }
              } else {
                lll1li = I1ilI + " 请求失败（Response code " + iiiii1 + "）";
              }
            }
          }
        } else {
          lll1li = I1ilI + " 请求失败 => " + (l1IIIi.message || l1IIIi);
        }
      }
      llilii++;
    } else {
      const Iiii1I = II1iIi.getResponseCookie(i111i1, II1iII),
        II1il1 = false;
      let I11111 = "";
      switch (I1ilI) {
        case "getMyPing":
          I11111 = II1iIi.getCookieValue(Iiii1I, "LZ_AES_PIN");
          I11111 ? $.LZ_AES_PIN = I11111 : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
        case "initPinToken":
          const I1I1I = II1iIi.getCookieValue(Iiii1I, "pToken");
          if (I1I1I) {
            $.pinToken = I1I1I;
          } else {
            console.log("获取 pinToken 失败！");
            $.message.fix("获取[pinToken]失败");
            $.skipRun = true;
            break;
          }
          I11111 = II1iIi.getCookieValue(Iiii1I, "LZ_AES_PIN");
          if (I11111) {
            $.LZ_AES_PIN = I11111;
          } else {
            console.log("获取 LZ_AES_PIN 失败！");
            $.message.fix("获取[LZ_AES_PIN]失败");
            $.skipRun = true;
            break;
          }
          const l1IIII = II1iIi.getCookieValue(Iiii1I, "te");
          if (l1IIII) {
            $.te = l1IIII;
            II1iII += "te=" + $.te + "; ";
          }
          break;
      }
      ["getMyPing", "followGoods", "start"].includes(I1ilI) && (II1iII = Iiii1I);
      I11111 = II1iIi.getCookieValue(II1iII, "LZ_AES_PIN");
      !I11111 && $.LZ_AES_PIN && (II1iII += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const l111 = II1iIi.getCookieValue(II1iII, "pToken");
      !l111 && $.pinToken && (II1iII += "pToken=" + $.pinToken + "; ");
      const il11lI = II1iIi.getCookieValue(II1iII, "AUTH_C_USER");
      if (!il11lI && $.secretPin) {
        II1iII += "AUTH_C_USER=" + $.secretPin + "; ";
      }
      const lIll1I = II1iIi.getCookieValue(II1iII, "te");
      !lIll1I && $.te && (II1iII += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD"].includes(I1ilI)) {
        if (l1IlI) {
          try {
            const II1iii = JSON.parse(l1IlI);
            l1IilI(I1ilI, II1iii);
            break;
          } catch (iII1lI) {
            lll1li = "❌ " + I1ilI + " 接口响应数据解析失败: " + iII1lI.message;
            console.log("🚫 " + I1ilI + " => " + String(l1IlI));
            II1il1 && (console.log("\n---------------------------------------------------\n"), console.log(II1iII), console.log("\n---------------------------------------------------\n"));
            llilii++;
          }
        } else {
          if ($.activityMode === "cjhy") {
            switch (I1ilI) {
              case "saveCaptain":
                illi1l.body = JSON.stringify({
                  ecyText: i1ii1I({
                    activityId: $.activityId,
                    pin: encodeURIComponent($.secretPin),
                    pinImg: $.yunMidImageUrl || llilil,
                    venderId: $.venderId,
                    actId: $.activityId
                  }, $.pinToken, $.te)
                });
                break;
              case "saveMember":
                illi1l.body = JSON.stringify({
                  ecyText: i1ii1I({
                    activityId: $.activityId,
                    signUuid: $.captainUuid,
                    pin: encodeURIComponent($.secretPin),
                    pinImg: $.yunMidImageUrl || llilil,
                    venderId: $.venderId,
                    actId: $.activityId
                  }, $.pinToken, $.te)
                });
                break;
            }
          }
          lll1li = "❌ " + I1ilI + " 接口无响应数据";
          llilii++;
        }
      } else {
        break;
      }
      l1ii1l = false;
    }
  }
  llilii >= l1llI && (console.log(lll1li), l1ii1l && !li1Ii1 && ($.outFlag = true, $.message && $.message.fix(lll1li)));
}
async function iiiiII(IIiliI, I1I1i = "POST") {
  if (I1I1i === "POST") {
    return new Promise(async iiiiiI => {
      $.post(IIiliI, (IiIl1i, IIl1li, l11i) => {
        iiiiiI({
          err: IiIl1i,
          res: IIl1li,
          data: l11i
        });
      });
    });
  } else {
    if (I1I1i === "GET") {
      return new Promise(async illiIi => {
        $.get(IIiliI, (illiIl, iIIl, il11li) => {
          illiIi({
            err: illiIl,
            res: iIIl,
            data: il11li
          });
        });
      });
    } else {
      const ililI = "不支持的请求方法";
      return {
        err: ililI,
        res: null,
        data: null
      };
    }
  }
}
function ll1I1l(li1III) {
  $.skipRun = true;
  return new Promise(ilil1 => {
    let li1l11 = {
      url: li1III,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: li1III,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(li1l11, async (lIlIIi, lIiI1l, llI1) => {
      try {
        if (lIlIIi) {
          if (lIiI1l && typeof lIiI1l.statusCode != "undefined") {
            lIiI1l.statusCode === 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), !li1Ii1 && ($.outFlag = true));
          }
          console.log(String(lIlIIi));
          console.log("getFirstLZCK 请求失败，请检查网路重试");
        } else {
          if (llI1.match(/(活动已经结束)/) && llI1.match(/(活动已经结束)/)[1]) {
            $.runEnd = true;
            console.log("活动已结束或不存在");
          }
          lIiI1l.status === 200 && (II1iII = II1iIi.getResponseCookie(lIiI1l, II1iII), $.skipRun = false);
        }
      } catch (li1l1i) {
        $.logErr(li1l1i, lIiI1l);
      } finally {
        ilil1();
      }
    });
  });
}
function iilI() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const lIil1 = Array.from(new Set($.blacklist.split("&")));
  console.log(lIil1.join("&") + "\n");
  let Il1lII = lIil1,
    iiiill = [],
    IIl1iI = false;
  for (let lIll11 = 0; lIll11 < Illl.length; lIll11++) {
    let iIlIIl = decodeURIComponent(Illl[lIll11].match(/pt_pin=([^; ]+)(?=;?)/) && Illl[lIll11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iIlIIl) {
      break;
    }
    let ilIl11 = false;
    for (let IIi11 of Il1lII) {
      if (IIi11 && IIi11 == iIlIIl) {
        ilIl11 = true;
        break;
      }
    }
    !ilIl11 && (IIl1iI = true, iiiill.splice(lIll11, -1, Illl[lIll11]));
  }
  if (IIl1iI) {
    Illl = iiiill;
  }
}
function IIilI1(lII1li, lII1ll) {
  lII1ll != 0 && lII1li.unshift(lII1li.splice(lII1ll, 1)[0]);
}
function li1Il1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(Illl, Illl));
    return;
  }
  console.log("当前已设置白名单：");
  const lli1I1 = Array.from(new Set($.whitelist.split("&")));
  console.log(lli1I1.join("&") + "\n");
  let II1I1i = [],
    II1I1l = lli1I1;
  for (let iil in Illl) {
    let IlIii1 = decodeURIComponent(Illl[iil].match(/pt_pin=([^; ]+)(?=;?)/) && Illl[iil].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    II1I1l.includes(IlIii1) && II1I1i.push(Illl[iil]);
  }
  helpCookiesArr = II1I1i;
  if (II1I1l.length > 1) {
    for (let i1li1I in II1I1l) {
      let lIl1 = II1I1l[II1I1l.length - 1 - i1li1I];
      if (!lIl1) {
        continue;
      }
      for (let i1li11 in helpCookiesArr) {
        let lII1l1 = decodeURIComponent(helpCookiesArr[i1li11].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[i1li11].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (lIl1 == lII1l1) {
          IIilI1(helpCookiesArr, i1li11);
        }
      }
    }
  }
}
function i1ii1I(lIil, lII1ii, lII1il) {
  function Ii1iI(IlIl1l) {
    IlIl1l = IlIl1l.split("").reverse().join("");
    const lIIlI1 = new Uint8Array(12),
      ilill1 = new TextEncoder().encode(IlIl1l);
    for (let lll11 = 0; lll11 < ilill1.length; lll11 += 2) {
      let il1iil = ilill1[lll11] << 5 | ilill1[lll11 + 1] & 255;
      il1iil %= 63;
      lIIlI1[lll11 >> 1] = il1iil;
    }
    let iIIiI1 = "";
    for (let il1iii = 0; il1iii < lIIlI1.length; il1iii++) {
      iIIiI1 += (lIIlI1[il1iii] + 256).toString(2).slice(1);
    }
    let IIIi1I = "",
      l1i1lI = "";
    for (let ilillI = 0; ilillI < 16; ilillI++) {
      if (ilillI !== 0) {
        const iIIiII = ilillI * 6,
          IIi1i1 = iIIiI1.substring(iIIiII, iIIiII + 6);
        let I1IiI1 = parseInt(IIi1i1, 2);
        const IlIl1i = l1i1lI.split("");
        for (let IIIi11 = 0; IIIi11 < IlIl1i.length; IIIi11++) {
          IlIl1i[IIIi11] === "1" && (I1IiI1 = (I1IiI1 >> 6 - IIIi11 | I1IiI1 << IIIi11) & 63);
        }
        l1i1lI = (I1IiI1 & 63).toString(2).padStart(6, "0");
      } else {
        l1i1lI = iIIiI1.substring(0, 6);
      }
      IIIi1I += l1i1lI;
    }
    for (let liIi1I = 0; liIi1I < 12; liIi1I++) {
      const il1ill = liIi1I * 8;
      lIIlI1[liIi1I] = parseInt(IIIi1I.substring(il1ill, il1ill + 8), 2);
    }
    const I11 = btoa(String.fromCharCode.apply(null, lIIlI1));
    return I11;
  }
  const Il1Iil = ["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"];
  let ilI = Date.now() + parseInt(lII1il);
  typeof lIil != "object" && (lIil = JSON.parse(lIil));
  lIil.nowTime = ilI;
  let iIIlI = lII1ii + ilI;
  const i1li1l = iIIlI.substring(0, iIIlI.length - 5);
  let l11I1 = "";
  for (let il1ili = 0; il1ili < i1li1l.length; il1ili++) {
    let lII11i = i1li1l.charCodeAt(il1ili),
      I1li1 = lII11i % 10,
      Il11i1 = Il1Iil[I1li1][il1ili];
    l11I1 += Il11i1;
  }
  var iiIli1 = l11I1.length,
    il11i1 = Math.floor(iiIli1 / 24),
    iII1i1 = "";
  for (var l11II = 0; l11II < 24; l11II++) {
    var ili = (l11II + 1) * il11i1;
    l11II === 23 && (ili = iiIli1);
    var iIIl1 = l11I1.substring(l11II * il11i1, ili),
      ill = [];
    for (var lIli = 0; lIli < iIIl1.length; lIli++) {
      ill.push(iIIl1.charCodeAt(lIli));
    }
    var ilii1I = ill.reduce(function (ililiI, i1iIl) {
        return ililiI + i1iIl;
      }, 0),
      Ii1i1 = Math.floor(ilii1I / ill.length);
    iII1i1 += String.fromCharCode(Ii1i1);
  }
  l11I1 = iII1i1;
  const lIll = Ii1iI(l11I1),
    iiiIi = li1IiI.enc.Utf8.parse(lIll),
    ilii11 = li1IiI.enc.Utf8.parse(""),
    iiiIl = li1IiI.AES.encrypt(JSON.stringify(lIil), iiiIi, {
      iv: ilii11,
      mode: li1IiI.mode.ECB,
      padding: li1IiI.pad.Pkcs7
    });
  return iiiIl.toString();
}