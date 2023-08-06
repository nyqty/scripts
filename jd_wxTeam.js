/*
活动名称：组队瓜分奖品 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/wxTeam/activity/activity?activityId=<活动id>
        https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=<活动id>
环境变量：jd_wxTeam_activityUrl // 活动链接（必填）
        jd_wxTeam_joinMember // 是否入会（true/false），默认不入会
        jd_wxTeam_Notify // 是否推送通知（true/false），默认不推送
        jd_wxTeam_Concurrent // 是否启用并发模式（true/false），默认不开启
        jd_wxTeam_maxConcurrency // 控制最大并发线程数，默认3

队长无效或无法创建战队时会退出执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#组队瓜分奖品
1 1 1 1 * jd_wxTeam.js, tag=组队瓜分奖品, enabled=true


*/

const Env=require('./utils/Env.js');
const $ = new Env('组队瓜分奖品（超级无线/超级会员）')
const iil11l = require("./jdCookie"),
  IiIi1l = require("./function/jdCommon"),
  llII1i = require("./function/sendJDNotify"),
  illI1I = require("./function/krgetToken"),
  ilI1Ii = require("./function/krh5st"),
  ilI1Il = process.env.jd_wxTeam_activityUrl || "",
  illI11 = process.env.jd_wxTeam_joinMember === "true",
  ll11Ii = process.env.jd_wxTeam_Notify === "true",
  ll11Il = process.env.jd_wxTeam_Concurrent === "true",
  i11lI = process.env.jd_wxTeam_maxConcurrency || "3";
let Illl1 = "",
  iii1I = "",
  iliII = "";
const ii1i1I = Object.keys(iil11l).map(lIiII => iil11l[lIiII]).filter(l1lii1 => l1lii1);
!ii1i1I[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!ilI1Il) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const IiIi11 = IiIi1l.parseUrl(ilI1Il);
  if (!IiIi11) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = ilI1Il;
  $.activityId = IiIi1l.getUrlParameter(ilI1Il, "activityId");
  $.hostname = IiIi11?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) $.activityMode = "cjhy";else {
      if ($.hostname.includes("lzkj")) {
        $.activityMode = "lzkj";
        $.hostname = "lzkj-isv.isvjd.com";
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityMode || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  llII1i.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  if (!ll11Il) {
    for (let liIIii = 0; liIIii < ii1i1I.length; liIIii++) {
      $.index = liIIii + 1;
      Illl1 = ii1i1I[liIIii];
      iliII = ii1i1I[liIIii];
      $.UserName = decodeURIComponent(IiIi1l.getCookieValue(Illl1, "pt_pin"));
      $.UA = IiIi1l.genUA($.UserName);
      $.message = llII1i.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await liIlI1();
      if ($.outFlag || $.runEnd) break;
    }
    const IIiill = llII1i.getMessage();
    IIiill && (console.log("\n📣 运行结果\n" + IIiill.replace(/：/g, " ➜ ")), ll11Ii && (llII1i.updateContent(llII1i.content + ("\n【活动地址】：" + $.activityUrl)), await llII1i.push()));
  } else {
    console.log("当前为并发模式：已设置最大并发线程数 " + i11lI);
    for (let liiiIi = 0; liiiIi < 1; liiiIi++) {
      $.index = liiiIi + 1;
      Illl1 = ii1i1I[liiiIi];
      iliII = ii1i1I[liiiIi];
      $.UserName = decodeURIComponent(IiIi1l.getCookieValue(Illl1, "pt_pin"));
      $.UA = IiIi1l.genUA($.UserName);
      $.message = llII1i.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await liIlI1();
      if ($.outFlag || $.runEnd) break;
    }
    !$.outFlag && !$.runEnd && (ii1i1I.shift(), console.log(""), await iillIl(ii1i1I, i11lI));
    const I1liii = llII1i.getMessage();
    I1liii && ll11Ii && (llII1i.updateContent(llII1i.content + ("\n【活动地址】：" + $.activityUrl)), await llII1i.push());
  }
})().catch(I1liil => $.logErr(I1liil)).finally(() => $.done());
async function liIlI1() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.secretPin = "";
    iii1I = "";
    if ($.skipRun || $.runEnd || $.outFlag) return;
    await iliI1($.activityUrl);
    await $.wait(500);
    if ($.outFlag) return;
    if ($.index === 1) {
      await iillIi("getSimpleActInfoVo");
      if (!$.venderId) {
        $.runEnd = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
    }
    $.token = await illI1I(iliII, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      $.index === 1 && ($.runEnd = true);
      return;
    }
    await iillIi("getMyPing");
    if ($.runEnd || $.outFlag) return;
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      $.index === 1 && ($.runEnd = true);
      return;
    }
    switch ($.activityMode) {
      case "lzkj":
        $.formatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.formatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    $.activityMode === "cjhy" ? await $.wait(500) : await $.wait(200);
    switch ($.activityMode) {
      case "lzkj":
        await iillIi("accessLogWithAD");
        break;
      case "cjhy":
        await iillIi("accessLog");
        break;
    }
    $.activityMode === "cjhy" ? await $.wait(500) : await $.wait(200);
    if (illI11) {
      switch ($.activityMode) {
        case "lzkj":
          await iillIi("getActMemberInfo");
          break;
        case "cjhy":
          await iillIi("getOpenCardInfo");
          break;
      }
      if ($.outFlag) return;
      if (!$.isMember) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let llli11 = 0; llli11 < Array(3).length; llli11++) {
          if (llli11 > 0) console.log("第" + llli11 + "次 重新入会");
          await i11iI();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
        }
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
          console.log("❌ 入会失败");
          $.skipRun = true;
          if ($.index === 1) {
            $.runEnd = true;
            return;
          }
        }
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    if ($.index === 1) {
      await iillIi("activityContent");
      if ($.runEnd || $.outFlag) return;
      if (!$.active) {
        console.log("未能获取到活动信息！");
        $.message.fix("未能获取到活动信息");
        return;
      }
      if ($.actStatus === 0) {
        console.log("活动将在 " + $.active.startTimeStr + " 开始，晚点再来吧~");
        $.message.fix("活动尚未进行，将于 " + $.active.startTimeStr + " 开始");
        $.runEnd = true;
        return;
      }
      $.membersPinArray = [];
      const IIIllI = $.successRetList || [],
        Ill1Ii = $.list || [];
      let Ill1Il = "",
        iIIII = "";
      switch ($.active.prizeType) {
        case 6:
          Ill1Il = "京豆";
          iIIII = "🐶";
          break;
        case 9:
          Ill1Il = "积分";
          iIIII = "🎟️";
          break;
        default:
          Ill1Il = "未知";
          iIIII = "❓";
      }
      await iillIi("shopInfo");
      const Il1iIi = ($.shopName && "店铺名称：" + $.shopName + "\n") + "开始时间：" + $.active.startTimeStr + "\n结束时间：" + $.active.endTimeStr + "\n奖品类型：" + Ill1Il + " " + iIIII + "\n总计奖池：" + $.active.sendNumbers + "\n可组队伍：" + $.active.maxGroup + " 🚗\n瓜分数量：" + 5 * $.active.prizeNumbers + " " + iIIII + "\n队长奖励：" + $.active.extraPrizeNumbers + " " + iIIII + "\n成员获得：" + $.active.prizeNumbers + " " + iIIII + "\n最高可得：" + ($.active.maxGroup * ($.active.extraPrizeNumbers + $.active.prizeNumbers) + $.active.prizeNumbers) + " " + iIIII + "\n";
      console.log(Il1iIi);
      llII1i.updateContent(llII1i.content + ("\n" + Il1iIi));
      if ($.actStatus === -1) {
        console.log("活动已于 " + $.active.startTimeStr + " 结束，下次早点来吧~");
        $.message.fix("活动已于 " + $.active.startTimeStr + " 结束");
        $.runEnd = true;
        return;
      }
      if ($.successRetList.length === $.active.maxGroup) {
        console.log("活动创建队伍已达到上限且成员已满");
        $.message.fix("活动创建队伍已达到上限且成员已满");
        $.runEnd = true;
        return;
      }
      const Ii1Il = $.active.maxGroup * 4;
      if ($.signUuid) {
        $.captainUuid = $.signUuid;
        console.log("已经是队长了，队伍ID：" + $.captainUuid);
        $.message.fix("已是队长");
        if (IIIllI.length > 0) {
          IIIllI.forEach(Iii1il => {
            const lIi1li = Iii1il?.["memberList"] || [];
            lIi1li.forEach(Ii1Ii => {
              Ii1Ii?.["pin"] !== $.secretPin && $.membersPinArray.push(Ii1Ii?.["pin"]);
            });
          });
        }
        Ill1Ii.length > 1 && Ill1Ii.forEach(l1IIiI => {
          l1IIiI?.["pin"] !== $.secretPin && $.membersPinArray.push(l1IIiI?.["pin"]);
        });
        $.canJoinMembers = Ii1Il - $.membersPinArray.length;
      } else {
        if ($.canCreate) {
          await iillIi("saveCaptain");
          if ($.runEnd || $.outFlag) return;
          $.canJoinMembers = Ii1Il;
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
      await iillIi("saveMember");
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
  } catch (i11IiI) {
    console.log("❌ 脚本运行遇到了错误\n" + i11IiI);
  }
}
async function iillIl(iIlill, IlilIl) {
  let Ii1II = false,
    Iii1l1 = 0,
    iIlil1 = 0;
  async function l1IIi1(liliIi, i1Ili) {
    async function lIiIi1() {
      return new Promise(I1IIi1 => {
        let ll1lI1 = {
          "url": $.activityUrl,
          "headers": {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": $.activityUrl,
            "User-Agent": iIiiI1
          },
          "timeout": 30000
        };
        $.get(ll1lI1, (II1ll, liii11, lIiIii) => {
          try {
            if (liii11.status == 200) I1IIi1(IiIi1l.getResponseCookie(liii11, l1I1ll));else {
              I1IIi1(null);
            }
          } catch (Il1I11) {
            I1IIi1(null);
          }
        });
      });
    }
    async function li11l1(IIiI11) {
      const ll1Iii = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
      let IIlII1 = "",
        ll1Iil = "",
        li1lI = "POST";
      switch (IIiI11) {
        case "getMyPing":
          IIlII1 = $.baseUrl + "/customer/getMyPing";
          ll1Iil = "token=" + ilIli1 + "&fromType=APP&userId=" + $.venderId;
          break;
        case "saveMember":
          IIlII1 = $.baseUrl + "/wxTeam/saveMember";
          ll1Iil = "activityId=" + $.activityId + "&pin=" + li1il + "&pinImg=" + encodeURIComponent(ll1Iii) + "&signUuid=" + $.captainUuid;
          break;
      }
      const iliiiI = {
          "url": IIlII1,
          "headers": {
            "Origin": $.origin,
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": l1I1ll,
            "User-Agent": $.UA,
            "X-Requested-With": "XMLHttpRequest",
            "Referer": $.activityUrl
          },
          "body": ll1Iil,
          "timeout": 30000
        },
        {
          err: IIlIII,
          res: i1Iil,
          data: lIi11i
        } = await iii11(iliiiI, li1lI);
      if (IIlIII) typeof IIlIII === "string" && IIlIII.includes("Timeout awaiting 'request'") ? (lastErrorMsg = IIiI11 + " 请求超时，请检查网络重试", I1IIiI.fix("请求超时")) : I1IIiI.fix("请求失败 " + IIlIII.message);else {
        IIiI11 === "getMyPing" && (l1I1ll = IiIi1l.getResponseCookie(i1Iil, iii1I));
        try {
          const li11li = JSON.parse(lIi11i);
          switch (IIiI11) {
            case "getMyPing":
              if (li11li.result && li11li.result === true) {
                if (li11li.data?.["secretPin"]) li11lI = li11li.data.secretPin;
              } else li11li.errorMessage && I1IIiI.fix(IIiI11 + " " + li11li.errorMessage);
              break;
            case "saveMember":
              if (li11li.result && li11li.result === true) {
                I1IIiI.fix("加入队伍成功");
                $.canJoinMembers -= 1;
                $.canJoinMembers <= 0 && (console.log("战队已满，运行完毕"), Ii1II = true);
              } else {
                if (li11li.errorMessage) {
                  I1IIiI.fix(li11li.errorMessage);
                  for (let iliiil of ["未开始", "结束", "不存在", "不在"]) {
                    if (li11li.errorMessage.includes(iliiil)) {
                      Ii1II = true;
                      break;
                    }
                  }
                }
              }
              break;
          }
        } catch (li11ll) {
          I1IIiI.fix("❌ 未能正确处理 " + IIiI11 + " 请求响应 " + (li11ll.message || li11ll));
        }
      }
    }
    const IIlIIl = decodeURIComponent(IiIi1l.getCookieValue(liliIi, "pt_pin")),
      iIiiI1 = IiIi1l.genUA(IIlIIl),
      I1IIiI = llII1i.create(i1Ili, IIlIIl);
    let ilIli1 = "",
      li11lI = "",
      l1I1ll = "",
      li1il = "";
    l1I1ll = await lIiIi1();
    if (!l1I1ll) I1IIiI.fix("获取[LZ_COOKIE]失败");else {
      ilIli1 = await illI1I(liliIi, $.baseUrl);
      if (!ilIli1) I1IIiI.fix("获取[Token]失败");else {
        await li11l1("getMyPing");
        if (!li11lI) I1IIiI.fix("未能获取用户鉴权信息");else {
          if ($.membersPinArray.length > 0 && $.membersPinArray.includes(li11lI)) I1IIiI.fix("已是此队成员");else {
            switch ($.activityMode) {
              case "lzkj":
                li1il = encodeURIComponent(li11lI);
                break;
              case "cjhy":
                li1il = encodeURIComponent(encodeURIComponent(li11lI));
                break;
            }
            await li11l1("saveMember");
          }
        }
      }
    }
    console.log(I1IIiI.getInlineContent());
    Iii1l1--;
    IIiii1();
  }
  async function IIiii1() {
    while (Iii1l1 < IlilIl && iIlill.length > 0 && !Ii1II) {
      const ll1IiI = iIlill.shift();
      Iii1l1++;
      iIlil1++;
      await l1IIi1(ll1IiI, iIlil1);
    }
    Ii1II && (await new Promise(li1li => {
      const I1I11l = setInterval(() => {
        Iii1l1 === 0 && (clearInterval(I1I11l), li1li());
      }, 100);
    }));
  }
  const IlilII = Math.min(iIlill.length, IlilIl),
    iIII1 = [];
  for (let III1ll = 0; III1ll < IlilII; III1ll++) {
    const l1lIIi = iIlill.shift();
    Iii1l1++;
    iIlil1++;
    iIII1.push(l1IIi1(l1lIIi, iIlil1));
  }
  await Promise.all(iIII1);
  IIiii1();
  await new Promise(IiIii1 => {
    const Ili1iI = setInterval(() => {
      (Iii1l1 === 0 || Ii1II) && (clearInterval(Ili1iI), IiIii1());
    }, 100);
  });
  console.log("\n并发运行完毕");
}
async function IiIi1I(Ili1i1, I1I11I) {
  try {
    switch (Ili1i1) {
      case "getMyPing":
        if (I1I11I.result && I1I11I.result === true) {
          if (I1I11I.data?.["secretPin"]) $.secretPin = I1I11I.data.secretPin;
          if (I1I11I.data?.["nickname"]) $.nickname = I1I11I.data.nickname;
        } else {
          if (I1I11I.errorMessage) {
            console.log(Ili1i1 + " " + I1I11I.errorMessage);
            $.index === 1 && ($.runEnd = true);
          } else {
            console.log("❓" + Ili1i1 + " " + JSON.stringify(I1I11I));
            $.index === 1 && ($.runEnd = true);
          }
        }
        break;
      case "getSimpleActInfoVo":
        if (I1I11I.result && I1I11I.result === true && I1I11I.data) {
          if (I1I11I.data?.["venderId"]) $.venderId = I1I11I.data.venderId;
          if (I1I11I.data?.["activityType"]) $.activityType = I1I11I.data.activityType;
        } else I1I11I.errorMessage ? console.log(Ili1i1 + " " + I1I11I.errorMessage) : console.log("❓" + Ili1i1 + " " + JSON.stringify(I1I11I));
        break;
      case "getActMemberInfo":
        if (I1I11I.result && I1I11I.result === true) $.isMember = I1I11I.data.openCard || false;else I1I11I.errorMessage ? console.log(Ili1i1 + " " + I1I11I.errorMessage) : console.log("❓" + Ili1i1 + " " + JSON.stringify(I1I11I));
      case "getOpenCardInfo":
        if (I1I11I.result && I1I11I.result === true) $.isMember = I1I11I.data.openedCard || false;else I1I11I.errorMessage ? console.log(Ili1i1 + " " + I1I11I.errorMessage) : console.log("❓" + Ili1i1 + " " + JSON.stringify(I1I11I));
        break;
      case "activityContent":
        if (I1I11I.result && I1I11I.result === true) {
          $.actStatus = I1I11I.data?.["actStatus"];
          $.active = I1I11I.data?.["active"];
          $.list = I1I11I.data?.["list"];
          $.successRetList = I1I11I.data?.["successRetList"];
          $.signUuid = I1I11I.data?.["signUuid"];
          $.canCreate = I1I11I.data?.["canCreate"];
          $.canJoin = I1I11I.data?.["canJoin"];
        } else {
          if (I1I11I.errorMessage) {
            for (let IlII of ["未开始", "结束", "不存在", "不在"]) {
              if (I1I11I.errorMessage.includes(IlII)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(Ili1i1 + " " + I1I11I.errorMessage);
          } else console.log("❓" + Ili1i1 + " " + JSON.stringify(I1I11I));
        }
        break;
      case "shopInfo":
        if (I1I11I.result && I1I11I.result === true) $.shopName = I1I11I.data?.["shopName"];else I1I11I.errorMessage ? console.log("" + (I1I11I.errorMessage || "")) : console.log("❓" + Ili1i1 + " " + JSON.stringify(I1I11I));
        break;
      case "saveCaptain":
        if (I1I11I.result && I1I11I.result === true) {
          $.captainUuid = I1I11I.data.signUuid;
          console.log("创建队伍成功");
          $.message.fix("创建队伍成功");
        } else I1I11I.errorMessage ? (console.log("" + I1I11I.errorMessage), $.message.fix(I1I11I.errorMessage), $.runEnd = true) : (console.log("❓" + Ili1i1 + " " + JSON.stringify(I1I11I)), $.runEnd = true);
        break;
      case "saveMember":
        if (I1I11I.result && I1I11I.result === true) {
          console.log("加入队伍成功");
          $.message.fix("加入队伍成功");
          $.canJoinMembers -= 1;
          $.canJoinMembers <= 0 && (console.log("战队已满，运行完毕"), $.runEnd = true);
        } else {
          if (I1I11I.errorMessage) {
            console.log("" + I1I11I.errorMessage);
            $.message.fix(I1I11I.errorMessage);
            for (let l1ll1l of ["未开始", "结束", "不存在", "不在"]) {
              if (I1I11I.errorMessage.includes(l1ll1l)) {
                $.runEnd = true;
                break;
              }
            }
          } else console.log("❓" + Ili1i1 + " " + JSON.stringify(I1I11I));
        }
        break;
    }
  } catch (iIIlIl) {
    console.log("❌ 未能正确处理 " + Ili1i1 + " 请求响应 " + (iIIlIl.message || iIIlIl));
  }
}
async function iillIi(iilIll) {
  if ($.runEnd || $.outFlag) return;
  const IlIi1I = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
  let i111I = "",
    llIiiI = "",
    IiIilI = "POST";
  switch (iilIll) {
    case "getMyPing":
      i111I = $.baseUrl + "/customer/getMyPing";
      llIiiI = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      i111I = $.baseUrl + "/customer/getSimpleActInfoVo";
      llIiiI = "activityId=" + $.activityId;
      break;
    case "accessLog":
      i111I = $.baseUrl + "/common/accessLog";
      llIiiI = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      i111I = $.baseUrl + "/common/accessLogWithAD";
      llIiiI = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
      break;
    case "getActMemberInfo":
      i111I = $.baseUrl + "/wxCommonInfo/getActMemberInfo";
      llIiiI = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
      break;
    case "getOpenCardInfo":
      i111I = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      llIiiI = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
      break;
    case "activityContent":
      i111I = $.baseUrl + "/wxTeam/activityContent";
      llIiiI = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&signUuid=";
      break;
    case "shopInfo":
      i111I = $.baseUrl + "/wxTeam/shopInfo";
      llIiiI = "activityId=" + $.activityId;
      break;
    case "saveCaptain":
      i111I = $.baseUrl + "/wxTeam/saveCaptain";
      llIiiI = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&pinImg=" + encodeURIComponent(IlIi1I);
      break;
    case "saveMember":
      i111I = $.baseUrl + "/wxTeam/saveMember";
      llIiiI = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&pinImg=" + encodeURIComponent(IlIi1I) + "&signUuid=" + $.captainUuid;
      break;
    default:
      console.log("❌ 未知请求 " + iilIll);
      return;
  }
  const lIiIl1 = {
      "url": i111I,
      "headers": {
        "Origin": $.origin,
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": iii1I,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest",
        "Referer": $.activityUrl
      },
      "body": llIiiI,
      "timeout": 30000
    },
    iilIl1 = 5;
  let l1II1 = 0,
    III1i1 = null;
  while (l1II1 < iilIl1) {
    l1II1 > 0 && (await $.wait(1000));
    const {
      err: l1IIi,
      res: l1IIl,
      data: l1I1il
    } = await iii11(lIiIl1, IiIilI);
    if (l1IIi) {
      if (typeof l1IIi === "string" && l1IIi.includes("Timeout awaiting 'request'")) III1i1 = iilIll + " 请求超时，请检查网络重试";else {
        const I1IlI1 = l1IIl?.["statusCode"];
        if (I1IlI1) {
          if ([403, 493].includes(I1IlI1)) III1i1 = iilIll + " 请求失败，IP已被限制（Response code " + I1IlI1 + "）";else [400, 404].includes(I1IlI1) ? III1i1 = iilIll + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1IlI1 + "）" : III1i1 = iilIll + " 请求失败（Response code " + I1IlI1 + "）";
        } else III1i1 = iilIll + " API请求失败 => " + (l1IIi.message || l1IIi);
        console.log(III1i1);
      }
      l1II1++;
    } else {
      iilIll === "getMyPing" && (iii1I = IiIi1l.getResponseCookie(l1IIl, iii1I));
      if (!["accessLog", "accessLogWithAD"].includes(iilIll)) try {
        const IlIi1l = JSON.parse(l1I1il);
        IiIi1I(iilIll, IlIi1l);
        break;
      } catch (IiIiiI) {
        III1i1 = "🚫 API请求失败，" + iilIll + " 接口响应数据解析失败: " + IiIiiI.message;
        console.log(String(l1I1il));
        l1II1++;
      } else break;
    }
  }
  if (l1II1 >= iilIl1) {
    $.outFlag = true;
    console.log(III1i1);
    $.message && $.message.fix("ip已被限制");
  }
}
async function iii11(Il11i, illl11 = "POST") {
  if (illl11 === "POST") return new Promise(async iiiIl1 => {
    $.post(Il11i, (i1Ii11, l1iill, l1ill) => {
      iiiIl1({
        "err": i1Ii11,
        "res": l1iill,
        "data": l1ill
      });
    });
  });else {
    if (illl11 === "GET") return new Promise(async l1iili => {
      $.get(Il11i, (IllII, Ill1il, IIlI) => {
        l1iili({
          "err": IllII,
          "res": Ill1il,
          "data": IIlI
        });
      });
    });else {
      const llIiIi = "不支持的请求方法";
      return {
        "err": llIiIi,
        "res": null,
        "data": null
      };
    }
  }
}
function iliI1(IIii) {
  return $.skipRun = true, new Promise(i1Ii1l => {
    let ilI1ii = {
      "url": IIii,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": IIii,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(ilI1ii, async (iII1l, ilI1il, i11Il) => {
      try {
        if (iII1l) {
          if (ilI1il && typeof ilI1il.statusCode != "undefined") {
            if (ilI1il.statusCode == 493) {
              console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n");
              $.outFlag = true;
            }
          }
          console.log(String(iII1l));
          console.log("getFirstLZCK 请求失败，请检查网路重试");
        } else {
          i11Il.match(/(活动已经结束)/) && i11Il.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束"));
          ilI1il.status == 200 && (iii1I = IiIi1l.getResponseCookie(ilI1il, iii1I), $.skipRun = false);
        }
      } catch (Iil1l) {
        $.logErr(Iil1l, ilI1il);
      } finally {
        i1Ii1l();
      }
    });
  });
}
async function i11iI() {
  if (!$.joinVenderId) return;
  return new Promise(async iilllI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i1i1iI = "";
    if ($.shopactivityId) i1i1iI = ",\"activityId\":" + $.shopactivityId;
    const iillil = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i1i1iI + ",\"channel\":406}",
      iillii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iillil)
      },
      ilI1iI = await ilI1Ii("8adfb", iillii),
      l1I1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iillil + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ilI1iI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iliII,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1I1i, async (l1I1l, i11II, IlIi1) => {
      try {
        IlIi1 = IlIi1 && IlIi1.match(/jsonp_.*?\((.*?)\);/) && IlIi1.match(/jsonp_.*?\((.*?)\);/)[1] || IlIi1;
        let i1i1ii = $.toObj(IlIi1, IlIi1);
        if (i1i1ii && typeof i1i1ii == "object") {
          if (i1i1ii && i1i1ii.success === true) {
            console.log(i1i1ii.message);
            $.errorJoinShop = i1i1ii.message;
            if (i1i1ii.result && i1i1ii.result.giftInfo) for (let Il1ill of i1i1ii.result.giftInfo.giftList) {
              console.log("入会获得: " + Il1ill.discountString + Il1ill.prizeName + Il1ill.secondLineDesc);
            }
            console.log("");
          } else {
            if (i1i1ii && typeof i1i1ii == "object" && i1i1ii.message) {
              $.errorJoinShop = i1i1ii.message;
              console.log("" + (i1i1ii.message || ""));
            } else {
              console.log(IlIi1);
            }
          }
        } else console.log(IlIi1);
      } catch (IIllII) {
        $.logErr(IIllII, i11II);
      } finally {
        iilllI();
      }
    });
  });
}