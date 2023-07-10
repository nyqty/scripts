/**
活动名称：店铺抽奖（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10020/10021/10026/10080>&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
					https://lorealjdcampaign-rc.isvjcloud.com/interactsaas/index?activityType=<10020/10021/10026/10080>&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_draw_url // 活动链接

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#幸运抽奖（lzkj_loreal）
1 1 1 1 * jd_lzkj_loreal_draw.js, tag=幸运抽奖（lzkj_loreal）, enabled=true
*/
const Env = require('./utils/Env.js');
const $ = new Env("幸运抽奖（lzkj_loreal）");
const notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let lz_cookie = {},
  activityUrl = process.env.jd_lzkj_loreal_draw_url,
  activityCookie = "",
  activityId = null;
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_draw_url) activityUrl = process.env.jd_lzkj_loreal_draw_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(Ii1Ill => {
    cookiesArr.push(jdCookieNode[Ii1Ill]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(ll1Iii => ll1Iii.cookie)].filter(IIlII1 => !!IIlII1);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  activityType = getQueryString("" + activityUrl, "activityType");
  templateId = getQueryString("" + activityUrl, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else activityUrl.includes("lzkj") ? wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1] : console.log("暂不支持的类型");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
}
let domains = "https://" + $.domain;
!(async () => {
  if (activityId == null) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口:" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let Ii1Il1 = 0; Ii1Il1 < cookiesArr.length; Ii1Il1++) {
    if (cookiesArr[Ii1Il1]) {
      cookie = cookiesArr[Ii1Il1];
      originCookie = cookiesArr[Ii1Il1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = Ii1Il1 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await getUA();
      await lzkj_draw();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        break;
      }
    }
  }
})().catch(I1IIlI => {
  $.log("", " " + $.name + ", 失败! 原因: " + I1IIlI + "!", "");
}).finally(() => {
  $.done();
});
async function lzkj_draw() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.OpenCard = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
    await $.wait(300);
    await follow();
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    switch (activityType) {
      case "10021":
      case "10020":
        await activity("jiugongge");
        break;
      case "10041":
      case "10042":
      case "10046":
      case "10062":
      case "10063":
      case "10073":
        await activity("lotteryCenter");
        break;
      case "10026":
      case "10080":
        break;
      default:
        console.log("暂不支持的类型");
        $.activityEnd = true;
        return;
    }
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    if (activityType == "10026" || activityType == "10080") {
      await getPoints();
    } else for (let IiIili = 0; IiIili < $.taskslist.length; IiIili++) {
      $.taskstatus = $.taskslist[IiIili].status || 0;
      $.taskType = $.taskslist[IiIili].taskType;
      if ($.taskstatus == 0) {
        if ($.taskslist[IiIili].taskId) switch ($.taskType) {
          case 1:
          case 2:
          case 14:
            $.taskId = $.taskslist[IiIili].taskId;
            $.skuId = "";
            await toDo();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 3:
          case 5:
          case 7:
            $.taskId = $.taskslist[IiIili].taskId;
            $.skuInfoVO = $.taskslist[IiIili].skuInfoVO || [];
            for (let llIiil = 0; llIiil < $.skuInfoVO.length; llIiil++) {
              $.taskskuInfoVO = $.skuInfoVO[llIiil].status || 0;
              $.taskskuInfoVO == 0 && ($.skuId = $.skuInfoVO[llIiil].skuId, await toDo(), await $.wait(parseInt(Math.random() * 500 + 500, 10)));
            }
            break;
          case 4:
          case 6:
          case 9:
            $.taskId = $.taskslist[IiIili].taskId;
            $.skuId = "";
            await toDo();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 10:
          case 12:
            $.taskId = $.taskslist[IiIili].taskId;
            $.skuId = "";
            $.taskfinishNum = $.taskslist[IiIili].finishNum || 0;
            $.taskshareCount = $.taskslist[IiIili].shareCount || 0;
            for (let l1ll1l = 0; l1ll1l < $.taskfinishNum; l1ll1l++) {
              await toDo();
              await $.wait(parseInt(Math.random() * 500 + 500, 10));
            }
            break;
          case 8:
          case 13:
          case 15:
          case 22:
            break;
          default:
        }
      }
    }
    await drawPrize();
    await $.wait(300);
    if ($.index == 1) {
      $.prizeList = "";
      for (let iIIlIl = 0; iIIlIl < $.prizeInfo.length; iIIlIl++) {
        $.prizeName = $.prizeInfo[iIIlIl].prizeName;
        $.leftNum = $.prizeInfo[iIIlIl].leftNum;
        $.prizeType = $.prizeInfo[iIIlIl].prizeType;
        switch ($.prizeType) {
          case 1:
            $.prizeType = "[京豆]";
            break;
          case 2:
            $.prizeType = "[优惠券]";
            break;
          case 3:
            $.prizeType = "[实物]";
            break;
          case 4:
            $.prizeType = "[积分]";
            break;
          case 5:
            $.prizeType = "[专享价]";
            break;
          case 6:
            $.prizeType = "[红包]";
            break;
          case 7:
            $.prizeType = "[礼品卡]";
            break;
          case 8:
            $.prizeType = "[E卡]";
            break;
          case 9:
            $.prizeType = "[PLUS会员]";
            break;
          case 10:
            $.prizeType = "[爱奇艺会员]";
            break;
          case 11:
            $.prizeType = "[积分]";
            break;
          default:
            console.log("未成功获取数据");
            return;
        }
        iIIlIl != $.prizeInfo.length - 1 ? $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n" : $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n";
      }
      console.log("店铺名称：" + $.shopName + "\n活动名称: " + $.actName + "\n活动奖品：\n" + $.prizeList);
    }
    if (activityType == "10026" || activityType == "10080") {
      let iilIll = parseInt($.poorScore / $.consumePoints);
      if (iilIll > 0) {
        console.log("积分: " + $.poorScore + "/" + $.consumePoints + ", 可以抽奖" + iilIll + "次");
        for (let iilIli = 0; iilIli < iilIll; iilIli++) {
          await draw();
          await $.wait(2000);
          if (iilIli >= 3) {
            console.log("抽奖太多次，多余的次数请再执行脚本");
            break;
          }
        }
      } else {
        console.log("积分: " + $.poorScore + "/" + $.consumePoints + ", 可以抽奖" + iilIll + "次");
        return;
      }
    } else {
      if ($.drawNumber > 0) {
        console.log("可以抽奖" + $.drawNumber + "次");
        for (let iilIl1 = 0; iilIl1 < $.drawNumber; iilIl1++) {
          await draw();
          await $.wait(2000);
          if (iilIl1 >= 3) {
            console.log("抽奖太多次，多余的次数请再执行脚本");
            break;
          }
        }
      } else {
        console.log("没有抽奖机会了~");
        return;
      }
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function getShopOpenCardInfo(I1IlIl) {
  let I1IlIi = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(I1IlIl)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(iIIlI1 => {
    $.get(I1IlIi, (IlIl, IiII1, l1IIi) => {
      try {
        if (IlIl) {
          IlIl === "Response code 403 (Forbidden)" && ($.err = true, console.log(IlIl));
        } else {
          res = JSON.parse(l1IIi);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (l1I1ii) {
        console.log(l1I1ii);
      } finally {
        iIIlI1();
      }
    });
  });
}
function showMsg() {
  return new Promise(IiIiiI => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    IiIiiI();
  });
}
function login(lIllii, l1il1) {
  return new Promise(l1iili => {
    $.post(taskPostUrl(lIllii, l1il1), async (iiiIlI, I1i11, Ill1ii) => {
      try {
        if (iiiIlI) {
          console.log("" + JSON.stringify(iiiIlI));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          Ill1ii = JSON.parse(Ill1ii);
          if (Ill1ii && Ill1ii.data) {
            $.tokens = Ill1ii.data.token;
            $.customerId = Ill1ii.data.customerId;
            $.joinVenderId = Ill1ii.data.joinInfo.shopId;
            $.openCardUrl = Ill1ii.data.joinInfo.openCardUrl;
            $.shopName = Ill1ii.data.shopName;
            $.actName = Ill1ii.data.actName;
            $.openCardUrl && ($.joinVenderId = Ill1ii.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = Ill1ii.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let IIlI = 0; IIlI < Array(2).length; IIlI++) {
                if (IIlI > 0) console.log("第" + IIlI + "次 重新开卡");
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(Ill1ii);
          I1i11.status == 200 && refreshToken(I1i11);
        }
      } catch (llIiIl) {
        $.logErr(llIiIl, I1i11);
      } finally {
        l1iili();
      }
    });
  });
}
function follow() {
  return new Promise(ilI1ii => {
    let ilI1il = {};
    $.post(taskPostUrl("api/task/followShop/follow", ilI1il), async (iII1I, iilli1, ilI1l1) => {
      try {
        if (iII1I) {
          console.log("" + JSON.stringify(iII1I));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          ilI1l1 = JSON.parse(ilI1l1);
          if (ilI1l1 && ilI1l1.resp_code == 0) {} else {
            console.log(ilI1l1.resp_msg);
            for (let i1i1i1 of ["未开始", "结束", "不存在", "不在"]) {
              if (ilI1l1.resp_msg.includes(i1i1i1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          iilli1.status == 200 && refreshToken(iilli1);
        }
      } catch (iiiIli) {
        $.logErr(iiiIli, iilli1);
      } finally {
        ilI1ii();
      }
    });
  });
}
function activity(IllIl) {
  return new Promise(l1I1l => {
    let i1i1il = {};
    $.post(taskPostUrl("api/task/" + IllIl + "/activity", i1i1il), async (i1i1ii, Il1ill, Il1ili) => {
      try {
        if (i1i1ii) {
          console.log("" + JSON.stringify(i1i1ii));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          Il1ili = JSON.parse(Il1ili);
          if (Il1ili && Il1ili.data) $.taskslist = Il1ili.data.taskList || [];else {
            console.log(Il1ili.resp_msg);
            for (let liiI of ["未开始", "结束", "不存在", "不在"]) {
              if (Il1ili.resp_msg.includes(liiI)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          Il1ill.status == 200 && refreshToken(Il1ill);
        }
      } catch (l1Ili1) {
        $.logErr(l1Ili1, Il1ill);
      } finally {
        l1I1l();
      }
    });
  });
}
function getPoints() {
  return new Promise(IlIl1 => {
    let iIliI1 = {};
    $.post(taskPostUrl("api/task/points/getPoints", iIliI1), async (I1ii11, IlIil, iI11i1) => {
      try {
        if (I1ii11) {
          console.log("" + JSON.stringify(I1ii11));
          console.log($.name + " getPoints API请求失败，请检查网路重试");
        } else {
          iI11i1 = JSON.parse(iI11i1);
          if (iI11i1 && iI11i1.resp_code == 0) {
            $.consumePoints = iI11i1.data.consumePoints;
            $.poorScore = iI11i1.data.poorScore;
          } else {
            console.log(iI11i1.resp_msg);
            for (let iii11i of ["未开始", "结束", "不存在", "不在"]) {
              if (iI11i1.resp_msg.includes(iii11i)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          IlIil.status == 200 && refreshToken(IlIil);
        }
      } catch (IIl11l) {
        $.logErr(IIl11l, IlIil);
      } finally {
        IlIl1();
      }
    });
  });
}
function draw() {
  return new Promise(iii11I => {
    let iI11iI = {
      "consumePoints": 0
    };
    $.post(taskPostUrl("api/prize/draw", iI11iI), async (ll111I, liIl1I, IIl111) => {
      try {
        if (ll111I) {
          console.log("" + JSON.stringify(ll111I));
          console.log($.name + " draw API请求失败，请检查网路重试");
        } else {
          IIl111 = JSON.parse(IIl111);
          if (IIl111 && IIl111.resp_code == 0) {
            if (IIl111.data === "") console.log("💨  空气");else {
              if (IIl111.data === "1") console.log("积分不足，无法抽奖");else {
                drawInfo = IIl111.data;
                if (drawInfo) switch (drawInfo.prizeType) {
                  case 1:
                    console.log("🎉 " + drawInfo.prizeName + " 🐶");
                    break;
                  case 3:
                    generateId = IIl111.data.prizeInfoId;
                    prizeName = drawInfo.prizeName;
                    console.log(IIl111);
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    break;
                  case 4:
                  case 11:
                    console.log("🎉 " + drawInfo.prizeName + " 🎟️");
                    break;
                  case 2:
                    console.log("🎉 " + drawInfo.prizeName + " 优惠券");
                    break;
                  case 8:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  default:
                    console.log(IIl111.data);
                    break;
                }
              }
            }
          } else {
            console.log(IIl111);
            for (let Ii1lI1 of ["未开始", "结束", "不存在", "不在"]) {
              if (IIl111.resp_msg.includes(Ii1lI1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          liIl1I.status == 200 && refreshToken(liIl1I);
        }
      } catch (ll1111) {
        $.logErr(ll1111, liIl1I);
      } finally {
        iii11I();
      }
    });
  });
}
function toDo() {
  return new Promise(illIII => {
    let Il1ilI = {
      "taskId": $.taskId,
      "skuId": $.skuId
    };
    $.post(taskPostUrl("api/basic/task/toDo", Il1ilI), async (iIliIl, l1Illi, iiilIi) => {
      try {
        if (iIliIl) {
          console.log("" + JSON.stringify(iIliIl));
          console.log($.name + " toDo API请求失败，请检查网路重试");
        } else {
          iiilIi = JSON.parse(iiilIi);
          if (iiilIi && iiilIi.resp_code == 0) {} else {
            if (iiilIi && iiilIi.resp_code == 50013 || iiilIi.resp_code == 50012) {} else {
              for (let Ililii of ["未开始", "结束", "不存在", "不在"]) {
                if (iiilIi.resp_msg.includes(Ililii)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          l1Illi.status == 200 && refreshToken(l1Illi);
        }
      } catch (I1ii1l) {
        $.logErr(I1ii1l, l1Illi);
      } finally {
        illIII();
      }
    });
  });
}
function basicInfo() {
  return new Promise(il1IlI => {
    let lI11 = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", lI11), async (IIlIlI, I1III1, iIll1) => {
      try {
        if (IIlIlI) {
          console.log("" + JSON.stringify(IIlIlI));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          iIll1 = JSON.parse(iIll1);
          if (iIll1 && iIll1.resp_code == 0) {
            $.actName = iIll1.data.actName;
            $.shopName = iIll1.data.shopName;
          } else {
            console.log(iIll1);
            for (let i1I of ["未开始", "结束", "不存在", "不在"]) {
              if (iIll1.resp_msg.includes(i1I)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (I1III1.status == 200) {
            refreshToken(I1III1);
          }
        }
      } catch (lI1I) {
        $.logErr(lI1I, I1III1);
      } finally {
        il1IlI();
      }
    });
  });
}
function drawPrize() {
  return new Promise(IIlIli => {
    let l11liI = {};
    $.post(taskPostUrl("api/prize/drawPrize", l11liI), async (ll1III, ll1II1, l11lii) => {
      try {
        if (ll1III) {
          console.log("" + JSON.stringify(ll1III));
          console.log($.name + " drawPrize API请求失败，请检查网路重试");
        } else {
          l11lii = JSON.parse(l11lii);
          if (l11lii && l11lii.resp_code == 0) {
            $.drawNumber = l11lii.data.drawNumber;
            $.prizeInfo = l11lii.data.prizeInfo || [];
          } else {
            console.log(l11lii);
            for (let l11lil of ["未开始", "结束", "不存在", "不在"]) {
              if (l11lii.resp_msg.includes(l11lil)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (ll1II1.status == 200) {
            refreshToken(ll1II1);
          }
        }
      } catch (IIlIil) {
        $.logErr(IIlIil, ll1II1);
      } finally {
        IIlIli();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIlIi1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIlIiI = "";
    if ($.shopactivityId) IIlIiI = ",\"activityId\":" + $.shopactivityId;
    const l11lll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIlIiI + ",\"channel\":406}",
      i1iiI1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l11lll)
      },
      ll1l1I = await getH5st("8adfb", i1iiI1),
      iIilI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + l11lll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ll1l1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIilI1, async (i1IIiI, lI1i1I, l111II) => {
      try {
        if (i1IIiI) {
          if (lI1i1I && typeof lI1i1I.statusCode != "undefined") {
            if (lI1i1I.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          l111II = l111II && l111II.match(/jsonp_.*?\((.*?)\);/) && l111II.match(/jsonp_.*?\((.*?)\);/)[1] || l111II;
          let lIil1i = $.toObj(l111II, l111II);
          if (lIil1i && typeof lIil1i == "object") {
            if (lIil1i && lIil1i.success === true) {
              console.log(" >> " + lIil1i.message);
              $.errorJoinShop = lIil1i.message;
              if (lIil1i.result && lIil1i.result.giftInfo) for (let lIil1l of lIil1i.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + lIil1l.discountString + lIil1l.prizeName + lIil1l.secondLineDesc);
              }
            } else {
              if (lIil1i && typeof lIil1i == "object" && lIil1i.message) {
                $.errorJoinShop = lIil1i.message;
                console.log("" + (lIil1i.message || ""));
              } else {
                console.log(l111II);
              }
            }
          } else console.log(l111II);
        }
      } catch (ii11i1) {
        $.logErr(ii11i1, lI1i1I);
      } finally {
        IIlIi1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async il111i => {
    const iIi11I = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iiii11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIi11I)
      },
      iIl1II = await getH5st("8adfb", iiii11),
      il1lIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIi11I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIl1II),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(il1lIi, async (Ili1, ii11iI, i1IIl1) => {
      try {
        if (Ili1) ii11iI && typeof ii11iI.statusCode != "undefined" && ii11iI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          i1IIl1 = i1IIl1 && i1IIl1.match(/jsonp_.*?\((.*?)\);/) && i1IIl1.match(/jsonp_.*?\((.*?)\);/)[1] || i1IIl1;
          let iiliII = $.toObj(i1IIl1, i1IIl1);
          iiliII && typeof iiliII == "object" ? iiliII && iiliII.success == true && (console.log("去加入：" + (iiliII.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iiliII.result.interestsRuleList && iiliII.result.interestsRuleList[0] && iiliII.result.interestsRuleList[0].interestsInfo && iiliII.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(i1IIl1);
        }
      } catch (I11llI) {
        $.logErr(I11llI, ii11iI);
      } finally {
        il111i();
      }
    });
  });
}
function taskPostUrl(lIlIi1, l1II1l) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + lIlIi1,
    "body": JSON.stringify(l1II1l),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": activityUrl,
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    },
    "timeout": 15 * 1000
  };
}
function refreshToken(ll1l11) {
  if (ll1l11) {
    if (ll1l11.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let Ilii of ll1l11.headers["set-cookie"]) {
        lz_cookie[Ilii.split(";")[0].substr(0, Ilii.split(";")[0].indexOf("="))] = Ilii.split(";")[0].substr(Ilii.split(";")[0].indexOf("=") + 1);
      }
      for (const lIl111 of Object.keys(lz_cookie)) {
        cookie += lIl111 + "=" + lz_cookie[lIl111] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(Ilil) {
  return new Promise(iIiIi1 => {
    const li1lil = {
      "url": Ilil + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(li1lil, async (I1l1i, lIiIIl, IliI) => {
      try {
        if (I1l1i) $.getAuthorCodeListerr = false;else {
          if (IliI) IliI = JSON.parse(IliI);
          $.getAuthorCodeListerr = true;
        }
      } catch (llIiI1) {
        $.logErr(llIiI1, lIiIIl);
        IliI = null;
      } finally {
        iIiIi1(IliI);
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(li1liI) {
  li1liI = li1liI || 32;
  let il1lIl = "abcdef0123456789",
    iiliIi = il1lIl.length,
    i111l1 = "";
  for (i = 0; i < li1liI; i++) i111l1 += il1lIl.charAt(Math.floor(Math.random() * iiliIi));
  return i111l1;
}
function getQueryString(lI11I, iIilIi) {
  let iIilIl = new RegExp("(^|[&?])" + iIilIi + "=([^&]*)(&|$)"),
    ilI1I = lI11I.match(iIilIl);
  if (ilI1I != null) return unescape(ilI1I[2]);
  return "";
}
function safeGet(lili1i) {
  if (!lili1i) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(lili1i) == "object") {
      return true;
    }
  } catch (iI1Il) {
    return console.log(iI1Il), false;
  }
}
function jsonParse(i111il) {
  if (typeof i111il == "string") try {
    return JSON.parse(i111il);
  } catch (il1IiI) {
    return console.log(il1IiI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function random(lI1i1l, li1ll1) {
  return Math.floor(Math.random() * (li1ll1 - lI1i1l)) + lI1i1l;
}