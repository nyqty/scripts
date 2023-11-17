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
var version_ = "jsjiami.com.v7";
const llliIl = require("./jdCookie"),
  iliIli = require("./function/jdCommon"),
  illliI = require("./function/sendJDNotify"),
  ii1III = require("./function/krgetToken"),
  {
    wuxianDefense: i11iIl
  } = require("./function/jdCrypto"),
  {
    loreal_savePrize: ll11ll
  } = require("./function/krsavePrize"),
  l11iIl = process.env.jd_lzkj_loreal_daySign_url || "",
  i11iIi = process.env.jd_lzkj_loreal_daySign_opencard === "true",
  IIIIll = process.env.jd_lzkj_loreal_daySign_break === "true",
  liiiii = process.env.jd_lzkj_loreal_daySign_Notify === "true";
let II1I = "",
  lI1111 = "";
const Ilil1 = Object.keys(llliIl).map(llIii => llliIl[llIii]).filter(IIiiI1 => IIiiI1);
!Ilil1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!l11iIl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const ii1IIl = iliIli.parseUrl(l11iIl);
  if (!ii1IIl) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = l11iIl;
  $.activityId = iliIli.getUrlParameter(l11iIl, "activityId");
  $.activityType = iliIli.getUrlParameter(l11iIl, "activityType");
  $.hostname = ii1IIl.hostname;
  $.pathname = ii1IIl.pathname;
  let ii1IIi = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      ii1IIi = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (ii1IIi = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + ii1IIi;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !ii1IIi || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  illliI.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let Ilili = 0; Ilili < Ilil1.length; Ilili++) {
    $.index = Ilili + 1;
    II1I = Ilil1[Ilili];
    lI1111 = Ilil1[Ilili];
    iliIli.setCookie(lI1111);
    $.UserName = decodeURIComponent(iliIli.getCookieValue(II1I, "pt_pin"));
    $.UA = iliIli.genUA($.UserName);
    $.UUID = iliIli.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = illliI.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await IliII1();
    iliIli.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  liiiii && illliI.getMessage() && (illliI.updateContent(illliI.content + ("\n【活动地址】" + $.activityUrl)), await illliI.push());
})().catch(I1ll1I => $.logErr(I1ll1I)).finally(() => $.done());
async function IliII1() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await ii1III(lI1111, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await i1I1I("login");
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
          await i1I1I("follow");
          await $.wait(500);
          await i1I1I("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await i1I1I("follow");
          await $.wait(500);
          await i1I1I("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (i11iIi) {
            const liliil = await iliIli.joinShopMember($.venderId);
            if (liliil) {
              console.log("加入店铺会员成功");
              await i1I1I("login");
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
      await i1I1I("initPinToken");
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
      await i1I1I("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10023":
        case "10040":
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
    await i1I1I("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await i1I1I("drawPrize");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      let iIiiii = false,
        ilIlIi = "";
      for (let ll1llI = 0; ll1llI < $.prizeInfo.length; ll1llI++) {
        const l1lI11 = $.prizeInfo[ll1llI],
          lI1iii = l1lI11.prizeName,
          i11lIi = l1lI11.leftNum,
          ll1ll1 = l1lI11.prizeType,
          lilil1 = $.activityContent?.["signPiize"][ll1llI]["signNumber"];
        i11lIi >= 1 && (iIiiii = true);
        ilIlIi += "  签到" + lilil1 + "天，" + lI1iii + (ll1ll1 === 5 ? "[专享价]" : ll1ll1 === 3 ? "[实物]" : "") + "，" + (i11lIi >= 1 ? "剩余" + i11lIi + "件" : "已发完") + "\n";
      }
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：\n" + ilIlIi);
      illliI.updateContent(illliI.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】\n" + ilIlIi));
      const ilIlIl = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        l1lI1I = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const I1iiii = Date.now();
          if ($.actStartTime && I1iiii < $.actStartTime) {
            console.log("活动将在 " + ilIlIl + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + ilIlIl);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && I1iiii > $.actEndTime) {
            console.log("活动已于 " + l1lI1I + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + l1lI1I);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + ilIlIl + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + ilIlIl);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + l1lI1I + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + l1lI1I);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!iIiiii) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    const l1I1Ii = $.activityContent?.["signNum"],
      IIlili = $.activityContent?.["continuityNum"],
      IIlill = $.activityContent?.["sign"];
    (IIlili > 0 || l1I1Ii > 0) && console.log("当前连续签到 " + IIlili + " 天，累计签到 " + l1I1Ii + " 天\n");
    IIlill ? (await i1I1I("getSignClick"), await $.wait(500)) : console.log("今天已经签过了，明天再来吧~");
  } catch (lI1iiI) {
    console.log("❌ 脚本运行遇到了错误\n" + lI1iiI);
  }
}
async function l1iIi1(i11lII, iIIlli) {
  try {
    switch (i11lII) {
      case "login":
        if (iIIlli.resp_code === 0 && iIIlli.data) {
          $.token = iIIlli?.["data"]?.["token"];
          $.joinInfo = iIIlli?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = iIIlli?.["data"]?.["shopId"];
          $.venderId = iliIli.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = iIIlli?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          iIIlli.resp_msg ? (console.log(i11lII + " " + iIIlli.resp_msg), $.message.fix(iIIlli.resp_msg), $.skipRun = true) : console.log("❓" + i11lII + " " + JSON.stringify(iIIlli));
        }
        break;
      case "follow":
        if (!(iIIlli.resp_code === 0)) {
          if (iIIlli.resp_msg) {
            console.log(i11lII + " " + iIIlli.resp_msg);
            $.message.fix(iIIlli.resp_msg);
            $.skipRun = true;
          } else {
            console.log("❓" + i11lII + " " + JSON.stringify(iIIlli));
          }
        }
        break;
      case "initPinToken":
        if (iIIlli.resp_code === 0 && iIIlli.data) {
          iIIlli = JSON.parse(iIIlli.data);
          if (iIIlli.resp_code === 0 && iIIlli.data) {
            $.pinToken = iIIlli?.["data"]?.["pinToken"];
            $.encryptPin = iIIlli?.["data"]?.["encryptPin"];
          } else {
            if (iIIlli.resp_code === 1000) {
              console.log(i11lII + " " + iIIlli.resp_msg);
              $.message.fix(iIIlli.resp_msg);
              $.skipRun = true;
            } else {
              if (iIIlli.resp_msg) {
                console.log(i11lII + " " + iIIlli.resp_msg);
                $.message.fix(iIIlli.resp_msg);
                $.skipRun = true;
              } else {
                console.log("❓" + i11lII + " " + JSON.stringify(iIIlli));
                $.skipRun = true;
              }
            }
          }
        } else {
          console.log("❓" + i11lII + " " + JSON.stringify(iIIlli));
        }
        break;
      case "basicInfo":
        if (iIIlli.resp_code === 0 && iIIlli.data) {
          $.actStartTime = iIIlli.data?.["startTime"];
          $.actEndTime = iIIlli.data?.["endTime"];
          $.actStatus = iIIlli.data?.["actStatus"];
          !$.activityType && ($.activityType = String(iIIlli.data?.["actType"] || ""));
        } else {
          iIIlli.resp_msg ? (console.log(i11lII + " " + iIIlli.resp_msg), $.message.fix(iIIlli.resp_msg)) : console.log("❓" + i11lII + " " + JSON.stringify(iIIlli));
        }
        break;
      case "activity":
        if (iIIlli.resp_code === 0 && iIIlli.data) {
          $.activityContent = iIIlli.data;
        } else {
          if (iIIlli.resp_msg) {
            console.log(i11lII + " " + iIIlli.resp_msg);
            $.message.fix(iIIlli.resp_msg);
            $.skipRun = true;
            if (["未开始", "结束", "不存在", "不在"].some(iiI1li => iIIlli.resp_msg.includes(iiI1li))) {
              $.runEnd = true;
            }
          } else {
            console.log("❓" + i11lII + " " + JSON.stringify(iIIlli));
            $.skipRun = true;
          }
        }
        break;
      case "drawPrize":
        if (iIIlli.resp_code === 0) {
          $.prizeInfo = iIIlli?.["data"]?.["prizeInfo"] || [];
        } else {
          if (iIIlli.resp_msg) {
            console.log(i11lII + " " + iIIlli.resp_msg);
            if (["未开始", "结束", "不存在", "不在"].some(iiI1ll => iIIlli.resp_msg.includes(iiI1ll))) {
              $.runEnd = true;
            }
            $.message.fix(iIIlli.resp_msg);
          } else {
            console.log("❓" + i11lII + " " + JSON.stringify(iIIlli));
          }
        }
        break;
      case "getSignClick":
        if (iIIlli.resp_code === 0) {
          const iIiill = iIIlli.data;
          if (iIiill) {
            process.stdout.write("签到成功 ➜ ");
            switch (iIiill.prizeType) {
              case 1:
                console.log("🎉 " + iIiill.prizeName + " 🐶");
                $.message.insert(iIiill.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const Ii1IIl = iIIlli.data.addressId,
                  l111I = iIiill.prizeName;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + l111I);
                if (iIiill.showImg) {
                  console.log("预览图片：" + iIiill.showImg);
                }
                const ll1lli = {
                    baseUrl: $.baseUrl,
                    newbaseUrl: $.newbaseUrl,
                    cookie: lI1111,
                    ua: $.UA,
                    token: $.token,
                    prizeName: l111I,
                    orderCode: Ii1IIl
                  },
                  ll1lll = await ll11ll(ll1lli);
                !liiiii && ll1lll && (await illliI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + l111I + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(l111I + "(" + (ll1lll ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + iIiill.prizeName + " 🎟️");
                $.message.insert("🗑️ " + iIiill.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + iIiill.prizeName + " 🧧");
                $.message.insert("🎉 " + iIiill.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + iIiill.prizeName + " 🎁");
                $.message.insert("🎉 恭喜获得" + iIiill.prizeName + " 🎁");
                !liiiii && (await illliI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + iIiill.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(iIiill);
                break;
            }
          } else {
            console.log("签到成功");
          }
        } else {
          if (iIIlli.resp_msg) {
            if (["未开始", "结束", "不存在", "不在"].some(Il1II => iIIlli.resp_msg.includes(Il1II))) {
              $.runEnd = true;
            }
            console.log(iIIlli.resp_msg);
            $.message.fix(iIIlli.resp_msg);
          } else {
            console.log("❓" + i11lII + " " + JSON.stringify(iIIlli));
          }
        }
        break;
    }
  } catch (I1iill) {
    console.log("❌ 未能正确处理 " + i11lII + " 请求响应 " + (I1iill.message || I1iill));
  }
}
async function i1I1I(i1lli) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let lIl1li = $.newbaseUrl,
    Il1I1 = {},
    lIilii = {},
    lIilil = "POST";
  switch (i1lli) {
    case "login":
      lIl1li += "/api/user-info/login";
      Il1I1 = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      lIl1li += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      lIilil = "GET";
      lIl1li += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      lIl1li += "/api/active/basicInfo";
      Il1I1 = {
        activityId: $.activityId
      };
      break;
    case "activity":
      lIl1li += "/api/task/daySign/activity";
      break;
    case "drawPrize":
      lIl1li += "/api/prize/drawPrize";
      break;
    case "getSignClick":
      lIl1li += "/api/task/daySign/getSignClick";
      break;
    default:
      console.log("❌ 未知请求 " + i1lli);
      return;
  }
  const lIl1ll = lIilil === "POST" && $.pathname.includes("/prod/cc/interactsaas") && i11iIl.isDefenseApi(lIl1li.replace($.newbaseUrl, "").split("?")[0]);
  lIl1ll && (Il1I1.actId = $.activityId, lIilii = {
    ecyText: i11iIl.encrypt(Il1I1, $.pinToken, $.te)
  });
  const Ii111 = {
    url: lIl1li,
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
    body: JSON.stringify(lIl1ll ? lIilii : Il1I1),
    timeout: 30000
  };
  $.token && (Ii111.headers.token = $.token);
  lIilil === "GET" && (delete Ii111.body, delete Ii111.headers["Content-Type"]);
  const Ii1III = 5;
  let ilIIi1 = 0,
    l111i = null,
    l111l = false;
  while (ilIIi1 < Ii1III) {
    ilIIi1 > 0 && (await $.wait(1000));
    const {
      err: l1lII,
      res: lilI1l,
      data: l1liiI
    } = await llIil(Ii111, lIilil);
    if (l1lII) {
      if (typeof l1lII === "string" && l1lII.includes("Timeout awaiting 'request'")) {
        l111i = i1lli + " 请求超时，请检查网络重试";
      } else {
        const Ii11i = lilI1l?.["statusCode"];
        if (Ii11i) {
          if ([403, 493].includes(Ii11i)) {
            l111i = i1lli + " 请求失败，IP被限制（Response code " + Ii11i + "）";
            l111l = true;
          } else {
            if ([400, 404].includes(Ii11i)) {
              l111i = i1lli + " 请求配置参数错误，请联系开发者进行反馈（Response code " + Ii11i + "）";
            } else {
              [500].includes(Ii11i) && lIl1ll ? Ii111.body = JSON.stringify({
                ecyText: i11iIl.encrypt(Il1I1, $.pinToken, $.te)
              }) : l111i = i1lli + " 请求失败（Response code " + Ii11i + "）";
            }
          }
        } else {
          l111i = i1lli + " 请求失败 => " + (l1lII.message || l1lII);
        }
      }
      ilIIi1++;
    } else {
      const Ii1l1i = iliIli.getResponseCookie(lilI1l),
        l1lIl = false;
      l1lIl && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + i1lli + " 响应Body => " + (l1liiI || "无") + "\n"), console.log("🔧 " + i1lli + " 响应Cookie => " + (Ii1l1i || "无") + "\n"), console.log("🔧 " + i1lli + " 请求参数"), console.log(Ii111), console.log("\n---------------------------------------------------\n"));
      switch (i1lli) {
        case "initPinToken":
          const Ii1l1l = iliIli.getCookieValue(Ii1l1i, "te");
          Ii1l1l && ($.te = Ii1l1l);
          break;
      }
      if (l1liiI) {
        try {
          const i1Iiil = JSON.parse(l1liiI);
          l1iIi1(i1lli, i1Iiil);
          break;
        } catch (l1lili) {
          l111i = "❌ " + i1lli + " 接口响应数据解析失败: " + l1lili.message;
          console.log("🚫 " + i1lli + " => " + String(l1liiI));
          ilIIi1++;
        }
      } else {
        lIl1ll && (Ii111.body = JSON.stringify({
          ecyText: i11iIl.encrypt(Il1I1, $.pinToken, $.te)
        }));
        l111i = "❌ " + i1lli + " 接口无响应数据";
        ilIIi1++;
      }
      l111l = false;
    }
  }
  ilIIi1 >= Ii1III && (console.log(l111i), l111l && !IIIIll && ($.outFlag = true, $.message && $.message.fix(l111i)));
}
async function llIil(iilIIi, I1iII = "POST") {
  if (I1iII === "POST") {
    return new Promise(async l1lilI => {
      $.post(iilIIi, (IilII, ili1l, i1lii) => {
        l1lilI({
          err: IilII,
          res: ili1l,
          data: i1lii
        });
      });
    });
  } else {
    if (I1iII === "GET") {
      return new Promise(async I1iIi => {
        $.get(iilIIi, (lilI11, Ili1II, ili1i) => {
          I1iIi({
            err: lilI11,
            res: Ili1II,
            data: ili1i
          });
        });
      });
    } else {
      const l1Ii1 = "不支持的请求方法";
      return {
        err: l1Ii1,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";