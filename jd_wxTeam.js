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

const IIlIi1 = $.isNode() ? require("./jdCookie") : "",
  i1IIi1 = require("./function/jdCommon"),
  IIlIiI = require("./function/sendJDNotify"),
  l11lll = require("./function/krgetToken"),
  i1iiI1 = require("crypto-js");
let ll1l1I = [];
const iIilI1 = process.env.jd_wxTeam_activityUrl || "",
  i1IIiI = !(process.env.jd_wxTeam_joinMember === "false"),
  lI1i1I = process.env.jd_wxTeam_Notify === "true",
  l111II = process.env.jd_wxTeam_Concurrent === "true",
  IiIII1 = process.env.jd_wxTeam_maxConcurrency || "3";
let I1II1 = "",
  lIil1i = "",
  lIil1l = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(IIlIi1).forEach(iIl1Il => {
    ll1l1I.push(IIlIi1[iIl1Il]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  ll1l1I = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(il111i => il111i.cookie)].filter(iI1iII => !!iI1iII);
}
!ll1l1I[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
const l1II1i = process.env.jd_wxTeam_break === "true";
let lili11 = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  lIllIi = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  iIi11l = "",
  lIllIl = "";
$.whitelist = process.env.jd_wxTeam_whitelist || iIi11l;
$.blacklist = process.env.jd_wxTeam_blacklist || lIllIl;
i1IIil();
iI1iI1();
!(async () => {
  if (!iIilI1) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const lI1i11 = i1IIi1.parseUrl(iIilI1);
  if (!lI1i11) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iIilI1;
  $.activityId = i1IIi1.getUrlParameter(iIilI1, "activityId");
  $.hostname = lI1i11?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      if (lIllIi === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else {
        $.activityMode = "cjhy";
      }
    } else {
      if ($.hostname.includes("lzkj")) {
        if (lili11 === "false") {
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
  IIlIiI.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  if (!l111II) {
    for (let iIi111 = 0; iIi111 < ll1l1I.length; iIi111++) {
      $.index = iIi111 + 1;
      I1II1 = ll1l1I[iIi111];
      lIil1l = ll1l1I[iIi111];
      i1IIi1.setCookie(lIil1l);
      $.UserName = decodeURIComponent(i1IIi1.getCookieValue(I1II1, "pt_pin"));
      $.UA = i1IIi1.genUA($.UserName);
      $.UUID = i1IIi1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.message = IIlIiI.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await iIi11i();
      i1IIi1.unsetCookie();
      if ($.outFlag || $.runEnd) {
        break;
      }
    }
    const il1lII = IIlIiI.getMessage();
    il1lII && (console.log("\n📣 运行结果\n" + il1lII.replace(/：/g, " ➜ ")), lI1i1I && (IIlIiI.updateContent(IIlIiI.content + ("\n【活动地址】" + $.activityUrl)), await IIlIiI.push()));
  } else {
    console.log("🔀 已开启并发模式，当前设置线程数为 " + IiIII1);
    for (let i111li = 0; i111li < 1; i111li++) {
      $.index = i111li + 1;
      I1II1 = ll1l1I[i111li];
      lIil1l = ll1l1I[i111li];
      $.UserName = decodeURIComponent(i1IIi1.getCookieValue(I1II1, "pt_pin"));
      $.UA = i1IIi1.genUA($.UserName);
      $.UUID = i1IIi1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.message = IIlIiI.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await iIi11i();
      if ($.outFlag || $.runEnd) {
        break;
      }
    }
    !$.outFlag && !$.runEnd && $.captainUuid && (console.log(""), await ii11i1());
    const il1lI1 = IIlIiI.getMessage();
    il1lI1 && lI1i1I && (IIlIiI.updateContent(IIlIiI.content + ("\n【活动地址】" + $.activityUrl)), await IIlIiI.push());
  }
})().catch(lIlIiI => $.logErr(lIlIiI)).finally(() => $.done());
async function iIi11i() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.LZ_AES_PIN = "";
    lIil1i = "";
    $.yunMidImageUrl = "";
    if ($.skipRun || $.runEnd || $.outFlag) {
      return;
    }
    await ll1l1i($.activityUrl);
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
      await l1II11("getSimpleActInfoVo");
      if (!$.venderId) {
        $.runEnd = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
    }
    $.token = await l11lll(lIil1l, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      $.index === 1 && ($.runEnd = true);
      return;
    }
    if ($.activityMode === "cjhy") {
      await l1II11("initPinToken");
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
      await l1II11("getMyPing");
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
    if (!l111II) {
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.LZ_AES_PIN = i1IIi1.getCookieValue(lIil1i, "LZ_AES_PIN");
    switch ($.activityMode) {
      case "lzkj":
        $.formatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.formatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    if (!l111II) {
      $.activityMode === "cjhy" ? await $.wait(500) : await $.wait(200);
    }
    switch ($.activityMode) {
      case "lzkj":
        await l1II11("accessLogWithAD");
        break;
      case "cjhy":
        await l1II11("accessLog");
        break;
    }
    if (!l111II) {
      $.activityMode === "cjhy" ? await $.wait(500) : await $.wait(200);
    }
    if ($.index === 1) {
      await l1II11("activityContent");
      if ($.runEnd || $.outFlag) {
        return;
      }
      const lI11i = $.activityContent?.["actStatus"],
        ilI11 = $.activityContent?.["active"],
        li1llI = $.activityContent?.["list"],
        lIil11 = $.activityContent?.["successRetList"],
        iIilII = $.activityContent?.["signUuid"],
        lIlI1 = $.activityContent?.["canCreate"];
      if (!ilI11) {
        console.log("未能获取到活动信息！");
        $.message.fix("未能获取到活动信息");
        return;
      }
      if (lI11i === 0) {
        console.log("活动将在 " + ilI11.startTimeStr + " 开始，晚点再来吧~");
        $.message.fix("活动尚未进行，将于 " + ilI11.startTimeStr + " 开始");
        $.runEnd = true;
        return;
      }
      $.membersPinArray = [];
      const lIllI1 = lIil11 || [],
        Ill1 = li1llI || [];
      let lI1i1i = "",
        il1IiI = "";
      switch (ilI11.prizeType) {
        case 6:
          lI1i1i = "京豆";
          il1IiI = "🐶";
          break;
        case 9:
          lI1i1i = "积分";
          il1IiI = "🎟️";
          break;
        default:
          lI1i1i = "未知";
          il1IiI = "❓";
      }
      await l1II11("shopInfo");
      const il1Ii1 = ($.shopName && "店铺名称：" + $.shopName + "\n") + "开始时间：" + ilI11.startTimeStr + "\n结束时间：" + ilI11.endTimeStr + "\n奖品类型：" + lI1i1i + " " + il1IiI + "\n总计奖池：" + ilI11.sendNumbers + "\n可组队伍：" + ilI11.maxGroup + " 🚗\n瓜分数量：" + 5 * ilI11.prizeNumbers + " " + il1IiI + "\n队长奖励：" + ilI11.extraPrizeNumbers + " " + il1IiI + "\n成员获得：" + ilI11.prizeNumbers + " " + il1IiI + "\n最高可得：" + (ilI11.maxGroup * (ilI11.extraPrizeNumbers + ilI11.prizeNumbers) + ilI11.prizeNumbers) + " " + il1IiI + "\n";
      console.log(il1Ii1);
      IIlIiI.updateContent(IIlIiI.content + ("\n" + il1Ii1));
      if (lI11i === -1) {
        console.log("活动已于 " + ilI11.endTimeStr + " 结束，下次早点来吧~");
        $.message.fix("活动已于 " + ilI11.endTimeStr + " 结束");
        $.runEnd = true;
        return;
      }
      if (lIil11.length === ilI11.maxGroup) {
        console.log("活动创建队伍已达到上限且成员已满");
        $.message.fix("活动创建队伍已达到上限且成员已满");
        $.runEnd = true;
        return;
      }
      const lI1i1l = ilI11.maxGroup * 4;
      if (iIilII) {
        $.captainUuid = iIilII;
        console.log("已经是队长了，队伍ID：" + $.captainUuid);
        $.message.fix("已是队长");
        lIllI1.length > 0 && lIllI1.forEach(lIil1I => {
          const IiIIII = lIil1I?.["memberList"] || [];
          IiIIII.forEach(i111iI => {
            i111iI?.["pin"] !== $.secretPin && $.membersPinArray.push(i111iI?.["pin"]);
          });
        });
        if (Ill1.length > 1) {
          Ill1.forEach(II1iI1 => {
            II1iI1?.["pin"] !== $.secretPin && $.membersPinArray.push(II1iI1?.["pin"]);
          });
        }
        $.canJoinMembers = lI1i1l - $.membersPinArray.length;
      } else {
        if (lIlI1) {
          await l1II11("saveCaptain");
          if ($.needJoinMember && i1IIiI) {
            const il11Il = await i1IIi1.joinShopMember($.venderId);
            il11Il && (console.log("加入店铺会员成功"), $.isMember = true, await l1II11("saveCaptain"));
          }
          if ($.runEnd || $.outFlag) {
            return;
          }
          $.canJoinMembers = lI1i1l;
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
      await l1II11("saveMember");
      if ($.needJoinMember && i1IIiI) {
        const il11Ii = await i1IIi1.joinShopMember($.venderId);
        il11Ii && (console.log("加入店铺会员成功"), $.isMember = true, await l1II11("saveMember"));
      }
    }
    if (!l111II) {
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
  } catch (i1ii11) {
    console.log("❌ 脚本运行遇到了错误\n" + i1ii11);
  }
}
async function ii11i1() {
  await i1IIi1.concTask(IiIII1, ll1l1I, async (lIlIil, I11lii) => {
    if (I11lii === 1) {
      return;
    }
    const Ili1ll = decodeURIComponent(i1IIi1.getCookieValue(lIlIil, "pt_pin")),
      IIl1Il = i1IIi1.genUA(Ili1ll),
      l1Iili = IIlIiI.create(I11lii, Ili1ll);
    let IIi11l = "",
      l1Iill = "",
      iiiiIi = "",
      iiiiIl = "",
      IIi11i = "",
      iiIIli = "",
      iili = "",
      IIl1Ii = "",
      ilIIl = false,
      I11ll1 = false;
    iiIIli = await li1IlI();
    if (iiIIli) {
      IIi11l = await l11lll(lIlIil, $.baseUrl);
      if (!IIi11l) {
        l1Iili.fix("获取[Token]失败");
        console.log(l1Iili.getInlineContent());
        return;
      }
      $.activityMode === "cjhy" ? await lIIII("initPinToken") : await lIIII("getMyPing");
      if (!l1Iill) {
        l1Iili.fix("未能获取用户鉴权信息");
        console.log(l1Iili.getInlineContent());
        return;
      }
      switch ($.activityMode) {
        case "lzkj":
          iili = encodeURIComponent(l1Iill);
          break;
        case "cjhy":
          iili = encodeURIComponent(encodeURIComponent(l1Iill));
          break;
      }
      if ($.membersPinArray.length > 0 && $.membersPinArray.includes(l1Iill)) {
        l1Iili.fix("已是此队成员");
      } else {
        await lIIII("saveMember");
        if (I11ll1) {
          console.log(l1Iili.getInlineContent());
          return {
            runEnd: true
          };
        }
        if (ilIIl && i1IIiI) {
          const I1li1l = await i1IIi1.joinShopMember($.venderId, lIlIil);
          if (I1li1l) {
            l1Iili.insert("加入店铺会员成功");
            await lIIII("saveMember");
            if (I11ll1) {
              console.log(l1Iili.getInlineContent());
              return {
                runEnd: true
              };
            }
          }
        }
      }
    } else {
      l1Iili.fix("获取[LZ_COOKIE]失败");
    }
    console.log(l1Iili.getInlineContent());
    async function lIIII(iiI1I) {
      const ilIII = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
      let IiII1I = "",
        IIl1I1 = "",
        I1li1i = "POST";
      switch (iiI1I) {
        case "getMyPing":
          IiII1I = $.baseUrl + "/customer/getMyPing";
          IIl1I1 = "token=" + IIi11l + "&fromType=APP&userId=" + $.venderId;
          break;
        case "initPinToken":
          I1li1i = "GET";
          IiII1I = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + IIi11l + "&source=01&venderId=" + $.venderId + "&uuid=" + i1IIi1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") + "&clientTime=" + Date.now();
          break;
        case "saveMember":
          IiII1I = $.baseUrl + "/wxTeam/saveMember";
          $.activityMode === "cjhy" ? IIl1I1 = JSON.stringify({
            ecyText: il111l({
              activityId: $.activityId,
              signUuid: $.captainUuid,
              pin: encodeURIComponent(l1Iill),
              pinImg: IIl1Ii || ilIII,
              venderId: $.venderId,
              actId: $.activityId
            }, iiiiIi, iiiiIl)
          }) : IIl1I1 = "activityId=" + $.activityId + "&pin=" + iili + "&pinImg=" + encodeURIComponent(IIl1Ii || ilIII) + "&signUuid=" + $.captainUuid;
          break;
      }
      const IIi111 = {
        url: IiII1I,
        headers: {
          Origin: $.origin,
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9",
          Connection: "keep-alive",
          "Content-Type": ["saveCaptain", "saveMember"].includes(iiI1I) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
          Cookie: iiIIli,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": IIl1Il,
          "X-Requested-With": "XMLHttpRequest",
          Referer: $.activityUrl
        },
        body: IIl1I1,
        timeout: 60000
      };
      I1li1i === "GET" && (delete IIi111.body, delete IIi111.headers["Content-Type"]);
      const {
        err: Ii11II,
        res: iiI11,
        data: lIlIli
      } = await iIl1Ii(IIi111, I1li1i);
      if (Ii11II) {
        if (!["accessLog", "accessLogWithAD"].includes(iiI1I)) {
          if (typeof Ii11II === "string" && Ii11II.includes("Timeout awaiting 'request'")) {
            l1Iili.fix("请求超时");
          } else {
            const lli1iI = iiI11?.["statusCode"];
            if (lli1iI) {
              if ([403, 493].includes(lli1iI)) {
                l1Iili.fix(iiI1I + " 请求失败，IP被限制（Response code " + lli1iI + "）");
              } else {
                if ([400, 404].includes(lli1iI)) {
                  l1Iili.fix(iiI1I + " 请求配置参数错误，请联系开发者进行反馈（Response code " + lli1iI + "）");
                } else {
                  [500].includes(lli1iI) && iiI1I === "saveMember" && $.activityMode === "cjhy" ? IIi111.body = JSON.stringify({
                    ecyText: il111l({
                      activityId: $.activityId,
                      signUuid: $.captainUuid,
                      pin: encodeURIComponent(l1Iill),
                      pinImg: IIl1Ii || ilIII,
                      venderId: $.venderId,
                      actId: $.activityId
                    }, iiiiIi, iiiiIl)
                  }) : l1Iili.fix(iiI1I + " 请求失败（Response code " + lli1iI + "）");
                }
              }
            } else {
              l1Iili.fix(iiI1I + " 请求失败 => " + (Ii11II.message || Ii11II));
            }
          }
        }
      } else {
        const IIllii = i1IIi1.getResponseCookie(iiI11, iiIIli),
          IIllil = false;
        IIllil && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + iiI1I + " 响应Body => " + (lIlIli || "无") + "\n"), console.log("🔧 " + iiI1I + " 响应Cookie => " + (IIllii || "无") + "\n"), console.log("🔧 " + iiI1I + " 请求参数"), console.log(IIi111), console.log("\n---------------------------------------------------\n"));
        switch (iiI1I) {
          case "getMyPing":
            IIi11i = i1IIi1.getCookieValue(IIllii, "LZ_AES_PIN");
            break;
          case "initPinToken":
            IIi11i = i1IIi1.getCookieValue(IIllii, "LZ_AES_PIN");
            iiiiIi = i1IIi1.getCookieValue(IIllii, "pToken");
            iiiiIl = i1IIi1.getCookieValue(IIllii, "te");
            break;
        }
        ["getMyPing"].includes(iiI1I) && (iiIIli = IIllii);
        !i1IIi1.getCookieValue(iiIIli, "LZ_AES_PIN") && IIi11i && (iiIIli += "LZ_AES_PIN=" + IIi11i + "; ");
        !i1IIi1.getCookieValue(iiIIli, "pToken") && iiiiIi && (iiIIli += "pToken=" + iiiiIi + "; ");
        if (!i1IIi1.getCookieValue(iiIIli, "AUTH_C_USER") && l1Iill) {
          iiIIli += "AUTH_C_USER=" + l1Iill + "; ";
        }
        !i1IIi1.getCookieValue(iiIIli, "te") && iiiiIl && (iiIIli += "te=" + iiiiIl + "; ");
        if (!["accessLog", "accessLogWithAD"].includes(iiI1I)) {
          if (lIlIli) {
            try {
              const Iili11 = JSON.parse(lIlIli);
              switch (iiI1I) {
                case "getMyPing":
                case "initPinToken":
                  if (Iili11.result === true && Iili11.data) {
                    l1Iill = Iili11.data?.["secretPin"];
                    IIl1Ii = Iili11.data?.["yunMidImageUrl"];
                  } else {
                    Iili11.errorMessage && l1Iili.fix(iiI1I + " " + Iili11.errorMessage);
                  }
                  break;
                case "saveMember":
                  if (Iili11.result === true && Iili11.data) {
                    l1Iili.insert("加入队伍成功");
                    $.canJoinMembers -= 1;
                    $.canJoinMembers <= 0 && (l1Iili.insert("战队已满运行完毕"), I11ll1 = true);
                  } else {
                    if (Iili11.errorMessage) {
                      if (["会员", "开卡"].some(lII1 => Iili11.errorMessage.includes(lII1))) {
                        ilIIl = true;
                        !i1IIiI && l1Iili.fix(Iili11.errorMessage);
                      } else {
                        l1Iili.fix(Iili11.errorMessage);
                        for (let iIlIlI of ["未开始", "结束", "不存在", "不在"]) {
                          Iili11.errorMessage.includes(iIlIlI) && (I11ll1 = true);
                        }
                      }
                    }
                  }
                  break;
              }
            } catch (ilIili) {
              l1Iili.fix("❌ " + iiI1I + " 接口响应数据解析失败: " + (ilIili.message || e));
              IIllil && (console.log("\n---------------------------------------------------\n"), console.log(iiIIli), console.log("\n---------------------------------------------------\n"));
            }
          } else {
            l1Iili.fix("❌ " + iiI1I + " 接口无响应数据");
            iiI1I === "saveMember" && $.activityMode === "cjhy" && (IIi111.body = JSON.stringify({
              ecyText: il111l({
                activityId: $.activityId,
                signUuid: $.captainUuid,
                pin: encodeURIComponent(l1Iill),
                pinImg: IIl1Ii || ilIII,
                venderId: $.venderId,
                actId: $.activityId
              }, iiiiIi, iiiiIl)
            }));
          }
        }
      }
    }
    async function li1IlI() {
      return new Promise(Iili1I => {
        let lIl1i = {
          url: $.activityUrl,
          headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: $.activityUrl,
            "User-Agent": IIl1Il
          },
          timeout: 30000
        };
        $.get(lIl1i, (Iili1l, liIiil, l11Il1) => {
          try {
            liIiil.status === 200 ? Iili1I(i1IIi1.getResponseCookie(liIiil, iiIIli)) : Iili1I(null);
          } catch (IIiIli) {
            Iili1I(null);
          }
        });
      });
    }
  });
  console.log("\n并发运行完毕");
}
async function ll1l1l(iIi, iI1i) {
  try {
    switch (iIi) {
      case "getMyPing":
        if (iI1i.result === true && iI1i.data) {
          $.secretPin = iI1i.data?.["secretPin"];
          $.nickname = iI1i.data?.["nickname"];
        } else {
          if (iI1i.errorMessage) {
            console.log(iIi + " " + iI1i.errorMessage);
            $.message.fix(iI1i.errorMessage);
            if ($.index === 1) {
              $.runEnd = true;
            }
          } else {
            console.log("❓" + iIi + " " + JSON.stringify(iI1i));
            $.index === 1 && ($.runEnd = true);
          }
        }
        break;
      case "initPinToken":
        if (iI1i.result === true && iI1i.data) {
          $.secretPin = iI1i.data?.["secretPin"];
          $.nickname = iI1i.data?.["nickname"];
          $.yunMidImageUrl = iI1i.data?.["yunMidImageUrl"];
        } else {
          if (iI1i.errorMessage) {
            console.log(iIi + " " + iI1i.errorMessage);
            $.message.fix(iI1i.errorMessage);
            if ($.index === 1) {
              $.runEnd = true;
            }
          } else {
            console.log("❓" + iIi + " " + JSON.stringify(iI1i));
            $.index === 1 && ($.runEnd = true);
          }
        }
        break;
      case "getSimpleActInfoVo":
        if (iI1i.result === true && iI1i.data) {
          $.venderId = iI1i.data?.["venderId"];
          $.shopId = iI1i.data?.["shopId"];
          $.activityType = iI1i.data?.["activityType"];
        } else {
          iI1i.errorMessage ? console.log(iIi + " " + iI1i.errorMessage) : console.log("❓" + iIi + " " + JSON.stringify(iI1i));
        }
        break;
      case "getActMemberInfo":
        if (iI1i.result === true && iI1i.data) {
          $.isMember = iI1i.data.openCard || false;
        } else {
          iI1i.errorMessage ? console.log(iIi + " " + iI1i.errorMessage) : console.log("❓" + iIi + " " + JSON.stringify(iI1i));
        }
      case "getOpenCardInfo":
        if (iI1i.result === true && iI1i.data) {
          $.isMember = iI1i.data.openedCard || false;
        } else {
          iI1i.errorMessage ? console.log(iIi + " " + iI1i.errorMessage) : console.log("❓" + iIi + " " + JSON.stringify(iI1i));
        }
        break;
      case "activityContent":
        if (iI1i.result === true && iI1i.data) {
          $.activityContent = iI1i.data;
        } else {
          if (iI1i.errorMessage) {
            for (let lli1l1 of ["未开始", "结束", "不存在", "不在"]) {
              if (iI1i.errorMessage.includes(lli1l1)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(iIi + " " + iI1i.errorMessage);
            $.message.fix(iI1i.errorMessage);
          } else {
            console.log("❓" + iIi + " " + JSON.stringify(iI1i));
          }
        }
        break;
      case "shopInfo":
        if (iI1i.result === true && iI1i.data) {
          $.shopName = iI1i.data?.["shopName"];
        } else {
          iI1i.errorMessage ? console.log("" + (iI1i.errorMessage || "")) : console.log("❓" + iIi + " " + JSON.stringify(iI1i));
        }
        break;
      case "saveCaptain":
        if (iI1i.result === true && iI1i.data) {
          $.captainUuid = iI1i.data.signUuid;
          console.log("创建队伍成功");
          $.message.fix("创建队伍成功");
        } else {
          iI1i.errorMessage ? (["会员", "开卡"].some(l1Iii1 => iI1i.errorMessage.includes(l1Iii1)) ? ($.needJoinMember = true, !i1IIiI && ($.message.fix(iI1i.errorMessage), $.runEnd = true)) : $.message.fix(iI1i.errorMessage), console.log(iI1i.errorMessage)) : (console.log("❓" + iIi + " " + JSON.stringify(iI1i)), $.runEnd = true);
        }
        break;
      case "saveMember":
        if (iI1i.result === true && iI1i.data) {
          console.log("加入队伍成功");
          $.message.fix("加入队伍成功");
          $.canJoinMembers -= 1;
          $.canJoinMembers <= 0 && (console.log("\n战队已满，运行完毕"), $.runEnd = true);
        } else {
          if (iI1i.errorMessage) {
            if (["会员", "开卡"].some(I1i1 => iI1i.errorMessage.includes(I1i1))) {
              $.needJoinMember = true;
              !i1IIiI && $.message.fix(iI1i.errorMessage);
            } else {
              for (let iiiil of ["未开始", "结束", "不存在", "不在"]) {
                if (iI1i.errorMessage.includes(iiiil)) {
                  $.runEnd = true;
                  break;
                }
              }
              $.message.fix(iI1i.errorMessage);
            }
            console.log(iI1i.errorMessage);
          } else {
            console.log("❓" + iIi + " " + JSON.stringify(iI1i));
          }
        }
        break;
    }
  } catch (l11l1) {
    console.log("❌ 未能正确处理 " + iIi + " 请求响应 " + (l11l1.message || l11l1));
  }
}
async function l1II11(l11lI) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  const I1II1l = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
  let lli1ii = "",
    I1II1i = "",
    lli1il = "POST";
  switch (l11lI) {
    case "getMyPing":
      lli1ii = $.baseUrl + "/customer/getMyPing";
      I1II1i = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      lli1ii = $.baseUrl + "/customer/getSimpleActInfoVo";
      I1II1i = "activityId=" + $.activityId;
      break;
    case "initPinToken":
      lli1il = "GET";
      lli1ii = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now();
      break;
    case "accessLog":
      lli1ii = $.baseUrl + "/common/accessLog";
      I1II1i = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      lli1ii = $.baseUrl + "/common/accessLogWithAD";
      I1II1i = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
      break;
    case "getActMemberInfo":
      lli1ii = $.baseUrl + "/wxCommonInfo/getActMemberInfo";
      I1II1i = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
      break;
    case "getOpenCardInfo":
      lli1ii = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      I1II1i = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
      break;
    case "activityContent":
      lli1ii = $.baseUrl + "/wxTeam/activityContent";
      I1II1i = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&signUuid=";
      break;
    case "shopInfo":
      lli1ii = $.baseUrl + "/wxTeam/shopInfo";
      I1II1i = "activityId=" + $.activityId;
      break;
    case "saveCaptain":
      lli1ii = $.baseUrl + "/wxTeam/saveCaptain";
      $.activityMode === "cjhy" ? I1II1i = JSON.stringify({
        ecyText: il111l({
          activityId: $.activityId,
          pin: encodeURIComponent($.secretPin),
          pinImg: $.yunMidImageUrl || I1II1l,
          venderId: $.venderId,
          actId: $.activityId
        }, $.pinToken, $.te)
      }) : I1II1i = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&pinImg=" + encodeURIComponent($.yunMidImageUrl || I1II1l);
      break;
    case "saveMember":
      lli1ii = $.baseUrl + "/wxTeam/saveMember";
      $.activityMode === "cjhy" ? I1II1i = JSON.stringify({
        ecyText: il111l({
          activityId: $.activityId,
          signUuid: $.captainUuid,
          pin: encodeURIComponent($.secretPin),
          pinImg: $.yunMidImageUrl || I1II1l,
          venderId: $.venderId,
          actId: $.activityId
        }, $.pinToken, $.te)
      }) : I1II1i = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&pinImg=" + encodeURIComponent($.yunMidImageUrl || I1II1l) + "&signUuid=" + $.captainUuid;
      break;
    default:
      console.log("❌ 未知请求 " + l11lI);
      return;
  }
  const lii1I = {
    url: lli1ii,
    headers: {
      Origin: $.origin,
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      Connection: "keep-alive",
      "Content-Type": ["saveCaptain", "saveMember"].includes(l11lI) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
      Cookie: lIil1i,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      Referer: $.activityUrl
    },
    body: I1II1i,
    timeout: 30000
  };
  lli1il === "GET" && (delete lii1I.body, delete lii1I.headers["Content-Type"]);
  const IIiIiI = 5;
  let ll1l = 0,
    ll1i = null,
    lliII = false;
  while (ll1l < IIiIiI) {
    ll1l > 0 && (await $.wait(1000));
    const {
      err: I1Iill,
      res: iilI1i,
      data: IiIlI1
    } = await iIl1Ii(lii1I, lli1il);
    if (I1Iill) {
      if (typeof I1Iill === "string" && I1Iill.includes("Timeout awaiting 'request'")) {
        ll1i = l11lI + " 请求超时，请检查网络重试";
      } else {
        const I1IilI = iilI1i?.["statusCode"];
        if (I1IilI) {
          if ([403, 493].includes(I1IilI)) {
            ll1i = l11lI + " 请求失败，IP被限制（Response code " + I1IilI + "）";
            lliII = true;
          } else {
            if ([400, 404].includes(I1IilI)) {
              ll1i = l11lI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1IilI + "）";
            } else {
              if ([500].includes(I1IilI) && $.activityMode === "cjhy") {
                switch (l11lI) {
                  case "saveCaptain":
                    lii1I.body = JSON.stringify({
                      ecyText: il111l({
                        activityId: $.activityId,
                        pin: encodeURIComponent($.secretPin),
                        pinImg: $.yunMidImageUrl || I1II1l,
                        venderId: $.venderId,
                        actId: $.activityId
                      }, $.pinToken, $.te)
                    });
                    break;
                  case "saveMember":
                    lii1I.body = JSON.stringify({
                      ecyText: il111l({
                        activityId: $.activityId,
                        signUuid: $.captainUuid,
                        pin: encodeURIComponent($.secretPin),
                        pinImg: $.yunMidImageUrl || I1II1l,
                        venderId: $.venderId,
                        actId: $.activityId
                      }, $.pinToken, $.te)
                    });
                    break;
                }
              } else {
                ll1i = l11lI + " 请求失败（Response code " + I1IilI + "）";
              }
            }
          }
        } else {
          ll1i = l11lI + " 请求失败 => " + (I1Iill.message || I1Iill);
        }
      }
      ll1l++;
    } else {
      const lli1I = i1IIi1.getResponseCookie(iilI1i, lIil1i),
        IlIilI = false;
      IlIilI && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + l11lI + " 响应Body => " + (IiIlI1 || "无") + "\n"), console.log("🔧 " + l11lI + " 响应Cookie => " + (lli1I || "无") + "\n"), console.log("🔧 " + l11lI + " 请求参数"), console.log(lii1I), console.log("\n---------------------------------------------------\n"));
      let Il1il = "";
      switch (l11lI) {
        case "getMyPing":
          Il1il = i1IIi1.getCookieValue(lli1I, "LZ_AES_PIN");
          Il1il ? $.LZ_AES_PIN = Il1il : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
        case "initPinToken":
          const IIllli = i1IIi1.getCookieValue(lli1I, "pToken");
          if (IIllli) {
            $.pinToken = IIllli;
          } else {
            console.log("获取 pinToken 失败！");
            $.message.fix("获取[pinToken]失败");
            $.skipRun = true;
            break;
          }
          Il1il = i1IIi1.getCookieValue(lli1I, "LZ_AES_PIN");
          if (Il1il) {
            $.LZ_AES_PIN = Il1il;
          } else {
            console.log("获取 LZ_AES_PIN 失败！");
            $.message.fix("获取[LZ_AES_PIN]失败");
            $.skipRun = true;
            break;
          }
          const lIIll1 = i1IIi1.getCookieValue(lli1I, "te");
          lIIll1 && ($.te = lIIll1, lIil1i += "te=" + $.te + "; ");
          break;
      }
      ["getMyPing", "followGoods", "start"].includes(l11lI) && (lIil1i = lli1I);
      Il1il = i1IIi1.getCookieValue(lIil1i, "LZ_AES_PIN");
      !Il1il && $.LZ_AES_PIN && (lIil1i += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const lll1il = i1IIi1.getCookieValue(lIil1i, "pToken");
      !lll1il && $.pinToken && (lIil1i += "pToken=" + $.pinToken + "; ");
      const lll1ii = i1IIi1.getCookieValue(lIil1i, "AUTH_C_USER");
      !lll1ii && $.secretPin && (lIil1i += "AUTH_C_USER=" + $.secretPin + "; ");
      const lIIllI = i1IIi1.getCookieValue(lIil1i, "te");
      !lIIllI && $.te && (lIil1i += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD"].includes(l11lI)) {
        if (IiIlI1) {
          try {
            const iIil1i = JSON.parse(IiIlI1);
            ll1l1l(l11lI, iIil1i);
            break;
          } catch (iIil1l) {
            ll1i = "❌ " + l11lI + " 接口响应数据解析失败: " + iIil1l.message;
            console.log("🚫 " + l11lI + " => " + String(IiIlI1));
            ll1l++;
          }
        } else {
          if ($.activityMode === "cjhy") {
            switch (l11lI) {
              case "saveCaptain":
                lii1I.body = JSON.stringify({
                  ecyText: il111l({
                    activityId: $.activityId,
                    pin: encodeURIComponent($.secretPin),
                    pinImg: $.yunMidImageUrl || I1II1l,
                    venderId: $.venderId,
                    actId: $.activityId
                  }, $.pinToken, $.te)
                });
                break;
              case "saveMember":
                lii1I.body = JSON.stringify({
                  ecyText: il111l({
                    activityId: $.activityId,
                    signUuid: $.captainUuid,
                    pin: encodeURIComponent($.secretPin),
                    pinImg: $.yunMidImageUrl || I1II1l,
                    venderId: $.venderId,
                    actId: $.activityId
                  }, $.pinToken, $.te)
                });
                break;
            }
          }
          ll1i = "❌ " + l11lI + " 接口无响应数据";
          ll1l++;
        }
      } else {
        break;
      }
      lliII = false;
    }
  }
  ll1l >= IIiIiI && (console.log(ll1i), lliII && !l1II1i && ($.outFlag = true, $.message && $.message.fix(ll1i)));
}
async function iIl1Ii(iIllI1, lli11 = "POST") {
  if (lli11 === "POST") {
    return new Promise(async iI1i1i => {
      $.post(iIllI1, (iIil1I, iI1i1l, IiI11I) => {
        iI1i1i({
          err: iIil1I,
          res: iI1i1l,
          data: IiI11I
        });
      });
    });
  } else {
    if (lli11 === "GET") {
      return new Promise(async il1liI => {
        $.get(iIllI1, (IiiiII, llilll, ll1ill) => {
          il1liI({
            err: IiiiII,
            res: llilll,
            data: ll1ill
          });
        });
      });
    } else {
      const llilli = "不支持的请求方法";
      return {
        err: llilli,
        res: null,
        data: null
      };
    }
  }
}
function ll1l1i(il1li1) {
  $.skipRun = true;
  return new Promise(IiIIiI => {
    let l111il = {
      url: il1li1,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: il1li1,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(l111il, async (l1lii, llillI, l1ii1I) => {
      try {
        if (l1lii) {
          llillI && typeof llillI.statusCode != "undefined" && llillI.statusCode === 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), !l1II1i && ($.outFlag = true));
          console.log(String(l1lii));
          console.log("getFirstLZCK 请求失败，请检查网路重试");
        } else {
          l1ii1I.match(/(活动已经结束)/) && l1ii1I.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束或不存在"));
          llillI.status === 200 && (lIil1i = i1IIi1.getResponseCookie(llillI, lIil1i), $.skipRun = false);
        }
      } catch (I11Iii) {
        $.logErr(I11Iii, llillI);
      } finally {
        IiIIiI();
      }
    });
  });
}
function iI1iI1() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const l1ll1 = Array.from(new Set($.blacklist.split("&")));
  console.log(l1ll1.join("&") + "\n");
  let llill1 = l1ll1,
    Iill1 = [],
    ll1il1 = false;
  for (let iiliii = 0; iiliii < ll1l1I.length; iiliii++) {
    let I1iii = decodeURIComponent(ll1l1I[iiliii].match(/pt_pin=([^; ]+)(?=;?)/) && ll1l1I[iiliii].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!I1iii) {
      break;
    }
    let li111i = false;
    for (let ll1ilI of llill1) {
      if (ll1ilI && ll1ilI == I1iii) {
        li111i = true;
        break;
      }
    }
    if (!li111i) {
      ll1il1 = true;
      Iill1.splice(iiliii, -1, ll1l1I[iiliii]);
    }
  }
  if (ll1il1) {
    ll1l1I = Iill1;
  }
}
function i1IIii(llilil, il1lii) {
  il1lii != 0 && llilil.unshift(llilil.splice(il1lii, 1)[0]);
}
function i1IIil() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(ll1l1I, ll1l1I));
    return;
  }
  console.log("当前已设置白名单：");
  const llilii = Array.from(new Set($.whitelist.split("&")));
  console.log(llilii.join("&") + "\n");
  let lll1li = [],
    l1ii1l = llilii;
  for (let ll1I11 in ll1l1I) {
    let l1lli = decodeURIComponent(ll1l1I[ll1I11].match(/pt_pin=([^; ]+)(?=;?)/) && ll1l1I[ll1I11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1ii1l.includes(l1lli) && lll1li.push(ll1l1I[ll1I11]);
  }
  helpCookiesArr = lll1li;
  if (l1ii1l.length > 1) {
    for (let IIi1Il in l1ii1l) {
      let l1lll = l1ii1l[l1ii1l.length - 1 - IIi1Il];
      if (!l1lll) {
        continue;
      }
      for (let IIi1Ii in helpCookiesArr) {
        let li1lII = decodeURIComponent(helpCookiesArr[IIi1Ii].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[IIi1Ii].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        l1lll == li1lII && i1IIii(helpCookiesArr, IIi1Ii);
      }
    }
  }
}
function il111l(Il11II, Iilll, I11Ill) {
  function IiIIll(IiliII) {
    IiliII = IiliII.split("").reverse().join("");
    const Iiii1I = new Uint8Array(12),
      II1il1 = new TextEncoder().encode(IiliII);
    for (let li1II1 = 0; li1II1 < II1il1.length; li1II1 += 2) {
      let iiIllI = II1il1[li1II1] << 5 | II1il1[li1II1 + 1] & 255;
      iiIllI %= 63;
      Iiii1I[li1II1 >> 1] = iiIllI;
    }
    let I11111 = "";
    for (let iII1l1 = 0; iII1l1 < Iiii1I.length; iII1l1++) {
      I11111 += (Iiii1I[iII1l1] + 256).toString(2).slice(1);
    }
    let l111 = "",
      il11lI = "";
    for (let l1IIII = 0; l1IIII < 16; l1IIII++) {
      if (l1IIII !== 0) {
        const l1Ili = l1IIII * 6,
          i1II11 = I11111.substring(l1Ili, l1Ili + 6);
        let l1Ill = parseInt(i1II11, 2);
        const lllllI = il11lI.split("");
        for (let Iiii1l = 0; Iiii1l < lllllI.length; Iiii1l++) {
          lllllI[Iiii1l] === "1" && (l1Ill = (l1Ill >> 6 - Iiii1l | l1Ill << Iiii1l) & 63);
        }
        il11lI = (l1Ill & 63).toString(2).padStart(6, "0");
      } else {
        il11lI = I11111.substring(0, 6);
      }
      l111 += il11lI;
    }
    for (let IiliIi = 0; IiliIi < 12; IiliIi++) {
      const Iiii1i = IiliIi * 8;
      Iiii1I[IiliIi] = parseInt(l111.substring(Iiii1i, Iiii1i + 8), 2);
    }
    const lIll1I = btoa(String.fromCharCode.apply(null, Iiii1I));
    return lIll1I;
  }
  const lIiiii = ["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"];
  let iililI = Date.now() + parseInt(I11Ill);
  typeof Il11II != "object" && (Il11II = JSON.parse(Il11II));
  Il11II.nowTime = iililI;
  let IlII1i = Iilll + iililI;
  const Iilli = IlII1i.substring(0, IlII1i.length - 5);
  let i1Il1I = "";
  for (let iiIlll = 0; iiIlll < Iilli.length; iiIlll++) {
    let II1iil = Iilli.charCodeAt(iiIlll),
      lllll1 = II1iil % 10,
      II1iii = lIiiii[lllll1][iiIlll];
    i1Il1I += II1iii;
  }
  var lIiiil = i1Il1I.length,
    ll1I1I = Math.floor(lIiiil / 24),
    IiIIli = "";
  for (var IlII11 = 0; IlII11 < 24; IlII11++) {
    var iiliil = (IlII11 + 1) * ll1I1I;
    IlII11 === 23 && (iiliil = lIiiil);
    var il1llI = i1Il1I.substring(IlII11 * ll1I1I, iiliil),
      il1ll1 = [];
    for (var Il11Ii = 0; Il11Ii < il1llI.length; Il11Ii++) {
      il1ll1.push(il1llI.charCodeAt(Il11Ii));
    }
    var Il11Il = il1ll1.reduce(function (lIll1i, iiIlli) {
        return lIll1i + iiIlli;
      }, 0),
      I1ill = Math.floor(Il11Il / il1ll1.length);
    IiIIli += String.fromCharCode(I1ill);
  }
  i1Il1I = IiIIli;
  const i111Il = IiIIll(i1Il1I),
    i111Ii = i1iiI1.enc.Utf8.parse(i111Il),
    IlII1I = i1iiI1.enc.Utf8.parse(""),
    IillI = i1iiI1.AES.encrypt(JSON.stringify(Il11II), i111Ii, {
      iv: IlII1I,
      mode: i1iiI1.mode.ECB,
      padding: i1iiI1.pad.Pkcs7
    });
  return IillI.toString();
}
