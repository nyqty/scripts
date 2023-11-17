/*
活动名称：店铺礼包（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10058&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10058&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_shopGift_url // 活动链接
		jd_lzkj_loreal_shopGift_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_shopGift_Notify // 是否推送通知（true/false），默认不推送
		
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺礼包（超级无线）
1 1 1 1 * jd_lzkj_loreal_shopGift.js, tag=店铺礼包（超级无线）, enabled=true		


*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺礼包（超级无线）')
var version_ = "jsjiami.com.v7";
const ll11l1 = require("./jdCookie"),
  ll111 = require("./function/jdCommon"),
  llliII = require("./function/sendJDNotify"),
  iiIiIl = require("./function/krgetToken"),
  {
    wuxianDefense: IlI1l1
  } = require("./function/jdCrypto"),
  liIliI = process.env.jd_lzkj_loreal_shopGift_url || "",
  llii1I = process.env.jd_lzkj_loreal_shopGift_opencard === "true",
  iiIiIi = process.env.jd_lzkj_loreal_shopGift_Notify === "true";
let l1lll1 = "",
  IilI = "";
const liIlli = Object.keys(ll11l1).map(Ilii1 => ll11l1[Ilii1]).filter(ll11i1 => ll11i1);
!liIlli[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!liIliI) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const Iill = ll111.parseUrl(liIliI);
  if (!Iill) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = liIliI;
  $.activityId = ll111.getUrlParameter(liIliI, "activityId");
  $.activityType = ll111.getUrlParameter(liIliI, "activityType");
  $.hostname = Iill.hostname;
  $.pathname = Iill.pathname;
  let ili1II = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      ili1II = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (ili1II = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + ili1II;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityType || !ili1II || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  llliII.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let IIIIli = 0; IIIIli < liIlli.length; IIIIli++) {
    $.index = IIIIli + 1;
    l1lll1 = liIlli[IIIIli];
    IilI = liIlli[IIIIli];
    ll111.setCookie(IilI);
    $.UserName = decodeURIComponent(ll111.getCookieValue(l1lll1, "pt_pin"));
    $.UA = ll111.genUA($.UserName);
    $.UUID = ll111.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = llliII.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await lil11();
    ll111.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  iiIiIi && llliII.getMessage() && (llliII.updateContent(llliII.content + ("\n【活动地址】" + $.activityUrl)), await llliII.push());
})().catch(lil1l => $.logErr(lil1l)).finally(() => $.done());
async function lil11() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await iiIiIl(IilI, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await lllI1("login");
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
          await lllI1("follow");
          await $.wait(500);
          await lllI1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await lllI1("follow");
          await $.wait(500);
          await lllI1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (llii1I) {
            const llIi1 = await ll111.joinShopMember($.venderId);
            if (llIi1) {
              console.log("加入店铺会员成功");
              await lllI1("login");
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
      await lllI1("initPinToken");
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
      switch ($.activityType) {
        case "10058":
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
    await lllI1("shopGiftMain");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      const lI1111 = $.activityContent?.["prizeInfoList"] || [];
      let Ilil1 = "";
      for (let IliII1 = 0; IliII1 < lI1111.length; IliII1++) {
        const l1iIi1 = lI1111[IliII1],
          i1I1I = l1iIi1.prizeName,
          llIil = l1iIi1.prizeType;
        Ilil1 += "" + i1I1I + (llIil === 5 ? "[专享价]" : llIil === 3 ? "[实物]" : "");
        IliII1 !== lI1111.length - 1 && (Ilil1 += "，");
      }
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + Ilil1 + "\n");
      llliII.updateContent(llliII.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】\n" + Ilil1));
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    $.flag = $.activityContent?.["flag"] || false;
    $.memberUser = $.activityContent?.["memberUser"] || 0;
    $.activityName = $.activityContent?.["name"] || "";
    $.position = $.activityContent?.["position"] || "";
    $.visitor = $.activityContent?.["visitor"] || "";
    await lllI1("drawShopGift");
    await $.wait(500);
  } catch (IIiiI1) {
    console.log("❌ 脚本运行遇到了错误\n" + IIiiI1);
  }
}
async function Iillll(IIIIi1, ii1IIl) {
  try {
    switch (IIIIi1) {
      case "login":
        if (ii1IIl.resp_code === 0 && ii1IIl.data) {
          $.token = ii1IIl?.["data"]?.["token"];
          $.joinInfo = ii1IIl?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = ii1IIl?.["data"]?.["shopId"];
          $.venderId = ll111.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = ii1IIl?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          ii1IIl.resp_msg ? (console.log(IIIIi1 + " " + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), $.skipRun = true) : console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl));
        }
        break;
      case "follow":
        if (!(ii1IIl.resp_code === 0)) {
          ii1IIl.resp_msg ? (console.log(IIIIi1 + " " + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), $.skipRun = true) : console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl));
        }
        break;
      case "initPinToken":
        if (ii1IIl.resp_code === 0 && ii1IIl.data) {
          ii1IIl = JSON.parse(ii1IIl.data);
          if (ii1IIl.resp_code === 0 && ii1IIl.data) {
            $.pinToken = ii1IIl?.["data"]?.["pinToken"];
            $.encryptPin = ii1IIl?.["data"]?.["encryptPin"];
          } else {
            if (ii1IIl.resp_code === 1000) {
              console.log(IIIIi1 + " " + ii1IIl.resp_msg);
              $.message.fix(ii1IIl.resp_msg);
              $.skipRun = true;
            } else {
              ii1IIl.resp_msg ? (console.log(IIIIi1 + " " + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), $.skipRun = true) : (console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl));
        }
        break;
      case "basicInfo":
        if (ii1IIl.resp_code === 0 && ii1IIl.data) {
          $.actStartTime = ii1IIl.data?.["startTime"];
          $.actEndTime = ii1IIl.data?.["endTime"];
          $.actStatus = ii1IIl.data?.["actStatus"];
          !$.activityType && ($.activityType = String(ii1IIl.data?.["actType"] || ""));
        } else {
          if (ii1IIl.resp_msg) {
            console.log(IIIIi1 + " " + ii1IIl.resp_msg);
            $.message.fix(ii1IIl.resp_msg);
          } else {
            console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl));
          }
        }
        break;
      case "shopGiftMain":
        if (ii1IIl.resp_code === 0 && ii1IIl.data) {
          $.activityContent = ii1IIl.data;
        } else {
          ii1IIl.resp_msg ? (console.log(IIIIi1 + " " + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(l1iIiI => ii1IIl.resp_msg.includes(l1iIiI)) && ($.runEnd = true)) : (console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl)), $.skipRun = true);
        }
        break;
      case "drawShopGift":
        if (ii1IIl.resp_code === 0) {
          console.log("🎉 领取成功");
          $.message.fix("领取成功");
        } else {
          ii1IIl.resp_msg ? (console.log("" + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), ["未开始", "结束", "不存在", "不在"].some(IIIIiI => ii1IIl.resp_msg.includes(IIIIiI)) && ($.runEnd = true)) : (console.log("领取失败"), $.message.fix("领取失败"));
        }
        break;
    }
  } catch (i1i111) {
    console.log("❌ 未能正确处理 " + IIIIi1 + " 请求响应 " + (i1i111.message || i1i111));
  }
}
async function lllI1(ii1l1I) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let lIill1 = $.newbaseUrl,
    iiI1i1 = {},
    ilIlII = {},
    iIiil1 = "POST";
  switch (ii1l1I) {
    case "login":
      lIill1 += "/api/user-info/login";
      iiI1i1 = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      lIill1 += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      iIiil1 = "GET";
      lIill1 += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      lIill1 += "/api/active/basicInfo";
      iiI1i1 = {
        activityId: $.activityId
      };
      break;
    case "shopGiftMain":
      lIill1 += "/api/shopGift/shopGiftMain";
      break;
    case "drawShopGift":
      lIill1 += "/api/shopGift/drawShopGift";
      iiI1i1 = {
        flag: $.flag,
        memberUser: $.memberUser,
        name: $.activityName,
        position: $.position,
        visitor: $.visitor
      };
      break;
    default:
      console.log("❌ 未知请求 " + ii1l1I);
      return;
  }
  const l1lI1i = iIiil1 === "POST" && $.pathname.includes("/prod/cc/interactsaas") && IlI1l1.isDefenseApi(lIill1.replace($.newbaseUrl, "").split("?")[0]);
  l1lI1i && (iiI1i1.actId = $.activityId, ilIlII = {
    ecyText: IlI1l1.encrypt(iiI1i1, $.pinToken, $.te)
  });
  const l1lI1l = {
    url: lIill1,
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
    body: JSON.stringify(l1lI1i ? ilIlII : iiI1i1),
    timeout: 30000
  };
  if ($.token) {
    l1lI1l.headers.token = $.token;
  }
  iIiil1 === "GET" && (delete l1lI1l.body, delete l1lI1l.headers["Content-Type"]);
  const l1I1Il = 5;
  let l1I1Ii = 0,
    IIlili = null,
    IIlill = false;
  while (l1I1Ii < l1I1Il) {
    l1I1Ii > 0 && (await $.wait(1000));
    const {
      err: lI1iiI,
      res: i11lII,
      data: iIIlli
    } = await III11I(l1lI1l, iIiil1);
    if (lI1iiI) {
      if (typeof lI1iiI === "string" && lI1iiI.includes("Timeout awaiting 'request'")) {
        IIlili = ii1l1I + " 请求超时，请检查网络重试";
      } else {
        const iIIlll = i11lII?.["statusCode"];
        if (iIIlll) {
          if ([403, 493].includes(iIIlll)) {
            IIlili = ii1l1I + " 请求失败，IP被限制（Response code " + iIIlll + "）";
            IIlill = true;
          } else {
            if ([400, 404].includes(iIIlll)) {
              IIlili = ii1l1I + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iIIlll + "）";
            } else {
              [500].includes(iIIlll) && l1lI1i ? l1lI1l.body = JSON.stringify({
                ecyText: IlI1l1.encrypt(iiI1i1, $.pinToken, $.te)
              }) : IIlili = ii1l1I + " 请求失败（Response code " + iIIlll + "）";
            }
          }
        } else {
          IIlili = ii1l1I + " 请求失败 => " + (lI1iiI.message || lI1iiI);
        }
      }
      l1I1Ii++;
    } else {
      const li11 = ll111.getResponseCookie(i11lII);
      switch (ii1l1I) {
        case "initPinToken":
          const Illlll = ll111.getCookieValue(li11, "te");
          if (Illlll) {
            $.te = Illlll;
          }
          break;
      }
      if (iIIlli) {
        try {
          const llli1l = JSON.parse(iIIlli);
          Iillll(ii1l1I, llli1l);
          break;
        } catch (lI1ii1) {
          IIlili = "❌ " + ii1l1I + " 接口响应数据解析失败: " + lI1ii1.message;
          console.log("🚫 " + ii1l1I + " => " + String(iIIlli));
          l1I1Ii++;
        }
      } else {
        l1lI1i && (l1lI1l.body = JSON.stringify({
          ecyText: IlI1l1.encrypt(iiI1i1, $.pinToken, $.te)
        }));
        IIlili = "❌ " + ii1l1I + " 接口无响应数据";
        l1I1Ii++;
      }
      IIlill = false;
    }
  }
  l1I1Ii >= l1I1Il && (console.log(IIlili), IIlill && ($.outFlag = true, $.message && $.message.fix(IIlili)));
}
async function III11I(liliiI, ilIIiI = "POST") {
  if (ilIIiI === "POST") {
    return new Promise(async lIl1l1 => {
      $.post(liliiI, (li1i, ilIIil, lIili1) => {
        lIl1l1({
          err: li1i,
          res: ilIIil,
          data: lIili1
        });
      });
    });
  } else {
    if (ilIIiI === "GET") {
      return new Promise(async iiI1li => {
        $.get(liliiI, (iIiill, Ii1IIi, Ii1IIl) => {
          iiI1li({
            err: iIiill,
            res: Ii1IIi,
            data: Ii1IIl
          });
        });
      });
    } else {
      const ll1lll = "不支持的请求方法";
      return {
        err: ll1lll,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";