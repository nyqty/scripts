/*
活动名称：签到抽奖（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10001/10002/10003/10004>&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_sign_url // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('签到抽奖（超级无线欧莱雅）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityUrl = process.env.jd_lzkj_loreal_sign_url,
  activityId = null,
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_sign_url) activityUrl = process.env.jd_lzkj_loreal_sign_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(IIIl1lil => {
    cookiesArr.push(jdCookieNode[IIIl1lil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(liIlil11 => liIlil11.cookie)].filter(ll11iIil => !!ll11iIil);
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
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let Ill1ll1 = 0; Ill1ll1 < cookiesArr.length; Ill1ll1++) {
    if (cookiesArr[Ill1ll1]) {
      cookie = cookiesArr[Ill1ll1];
      originCookie = cookiesArr[Ill1ll1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = Ill1ll1 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await Main();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag || $.maxcountnum) {
        break;
      }
    }
  }
})().catch(li1lliii => {
  $.log("", " " + $.name + ", 失败! 原因: " + li1lliii + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
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
    await activity("sign");
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    await drawPrize();
    await $.wait(300);
    if ($.index == 1) {
      $.prizeList = "";
      for (let IIi1lii1 = 0; IIi1lii1 < $.prizeInfo.length; IIi1lii1++) {
        $.prizeName = $.prizeInfo[IIi1lii1].prizeName;
        $.leftNum = $.prizeInfo[IIi1lii1].leftNum;
        $.prizeType = $.prizeInfo[IIi1lii1].prizeType;
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
        IIi1lii1 != $.prizeInfo.length - 1 ? $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n" : $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n";
      }
      console.log("店铺名称：" + $.shopName + "\n活动名称：" + $.actName + "\n活动奖品：\n" + $.prizeList);
    }
    let I1lI1l1i = $.continuityNum || $.signNum || 0;
    console.log("已签到" + I1lI1l1i + "天, 今天" + ($.sign ? "未" : "已") + "签到, 再签到" + ($.leftNum || 0) + "天可以抽奖");
    $.sign && (await add());
    if ($.drawNumber > 0) console.log("可以抽奖" + $.drawNumber + "次");else {
      console.log("没有抽奖机会了~");
      return;
    }
    for (let i1IliIil = 0; i1IliIil < $.drawNumber; i1IliIil++) {
      await draw();
      await $.wait(2000);
      if (i1IliIil >= 3) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function getShopOpenCardInfo(lIi1lIii) {
  let iil1111l = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(lIi1lIii)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(il111l => {
    $.get(iil1111l, (llIlIII, I11i111l, l1iIi1ii) => {
      try {
        llIlIII ? llIlIII === "Response code 403 (Forbidden)" && ($.err = true, console.log(llIlIII)) : (res = JSON.parse(l1iIi1ii), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (IiI111) {
        console.log(IiI111);
      } finally {
        il111l();
      }
    });
  });
}
function showMsg() {
  return new Promise(Iliii1Il => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    Iliii1Il();
  });
}
function login(iiiIIiI1, IlliI111) {
  return new Promise(iiI1iii => {
    $.post(taskPostUrl(iiiIIiI1, IlliI111), async (llI11Iii, l11iIlIi, I1illiiI) => {
      try {
        if (llI11Iii) {
          console.log("" + JSON.stringify(llI11Iii));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          I1illiiI = JSON.parse(I1illiiI);
          if (I1illiiI && I1illiiI.data) {
            $.tokens = I1illiiI.data.token;
            $.customerId = I1illiiI.data.customerId;
            $.joinVenderId = I1illiiI.data.joinInfo.shopId;
            $.openCardUrl = I1illiiI.data.joinInfo.openCardUrl;
            $.shopName = I1illiiI.data.shopName;
            $.actName = I1illiiI.data.actName;
            $.openCardUrl && ($.joinVenderId = I1illiiI.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = I1illiiI.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let iIiIIIII = 0; iIiIIIII < Array(2).length; iIiIIIII++) {
                if (iIiIIIII > 0) console.log("第" + iIiIIIII + "次 重新开卡");
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                  break;
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(I1illiiI);
          l11iIlIi.status == 200 && refreshToken(l11iIlIi);
        }
      } catch (I1iil1Il) {
        $.logErr(I1iil1Il, l11iIlIi);
      } finally {
        iiI1iii();
      }
    });
  });
}
function follow() {
  return new Promise(l1IilI => {
    let lilillIl = {};
    $.post(taskPostUrl("api/task/followShop/follow", lilillIl), async (IiiiilI, il1ii, li1111lI) => {
      try {
        if (IiiiilI) {
          console.log("" + JSON.stringify(IiiiilI));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          li1111lI = JSON.parse(li1111lI);
          if (li1111lI && li1111lI.resp_code == 0) {} else {
            console.log(li1111lI.resp_msg);
            for (let IIili1il of ["未开始", "结束", "不存在", "不在"]) {
              if (li1111lI.resp_msg.includes(IIili1il)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (il1ii.status == 200) {
            refreshToken(il1ii);
          }
        }
      } catch (IIIIli) {
        $.logErr(IIIIli, il1ii);
      } finally {
        l1IilI();
      }
    });
  });
}
function activity(l1I1ii1l) {
  return new Promise(il11lII => {
    let IlIiiiI1 = {};
    $.post(taskPostUrl("api/task/" + l1I1ii1l + "/activity", IlIiiiI1), async (II1Iiiii, li11lli, llll1ili) => {
      try {
        if (II1Iiiii) {
          console.log("" + JSON.stringify(II1Iiiii));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          llll1ili = JSON.parse(llll1ili);
          if (llll1ili && llll1ili.data) {
            $.sign = llll1ili?.["data"]?.["sign"] || false;
            $.signNum = llll1ili?.["data"]?.["signNum"] || 0;
            $.leftNum = llll1ili?.["data"]?.["leftNum"] || 0;
            $.todaySign = llll1ili?.["data"]?.["todaySign"] || false;
            $.continuityNum = llll1ili?.["data"]?.["continuityNum"] || 0;
          } else {
            console.log(llll1ili.resp_msg);
            for (let III1lI11 of ["未开始", "结束", "不存在", "不在"]) {
              if (llll1ili.resp_msg.includes(III1lI11)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          li11lli.status == 200 && refreshToken(li11lli);
        }
      } catch (II11111i) {
        $.logErr(II11111i, li11lli);
      } finally {
        il11lII();
      }
    });
  });
}
function add() {
  return new Promise(Ilill1li => {
    let II1i1Iii = {};
    $.post(taskPostUrl("api/task/sign/add", II1i1Iii), async (iIllIIi, llIIill, I11lIIl) => {
      try {
        if (iIllIIi) {
          console.log("" + JSON.stringify(iIllIIi));
          console.log($.name + " toDo API请求失败，请检查网路重试");
        } else {
          I11lIIl = JSON.parse(I11lIIl);
          if (I11lIIl && I11lIIl.resp_code == 0) console.log("签到成功");else {
            if (I11lIIl && I11lIIl.resp_code == 50013 || I11lIIl.resp_code == 50012) {} else for (let lI1Il1Ii of ["未开始", "结束", "不存在", "不在"]) {
              if (I11lIIl.resp_msg.includes(lI1Il1Ii)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          llIIill.status == 200 && refreshToken(llIIill);
        }
      } catch (llii1lI1) {
        $.logErr(llii1lI1, llIIill);
      } finally {
        Ilill1li();
      }
    });
  });
}
function toDo() {
  return new Promise(Iiil1lii => {
    let iI111II = {
      "taskId": $.taskId,
      "skuId": $.skuId
    };
    $.post(taskPostUrl("api/basic/task/toDo", iI111II), async (IiIll1Il, liIi1111, I1iI) => {
      try {
        if (IiIll1Il) {
          console.log("" + JSON.stringify(IiIll1Il));
          console.log($.name + " toDo API请求失败，请检查网路重试");
        } else {
          I1iI = JSON.parse(I1iI);
          if (I1iI && I1iI.resp_code == 0) {} else {
            if (I1iI && I1iI.resp_code == 50013 || I1iI.resp_code == 50012) {} else for (let IIiiIll of ["未开始", "结束", "不存在", "不在"]) {
              if (I1iI.resp_msg.includes(IIiiIll)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          liIi1111.status == 200 && refreshToken(liIi1111);
        }
      } catch (Illliii1) {
        $.logErr(Illliii1, liIi1111);
      } finally {
        Iiil1lii();
      }
    });
  });
}
function basicInfo() {
  return new Promise(l1lII1li => {
    let Il1liil1 = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", Il1liil1), async (I1iIiili, illiilI, liiil11) => {
      try {
        if (I1iIiili) {
          console.log("" + JSON.stringify(I1iIiili));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          liiil11 = JSON.parse(liiil11);
          if (liiil11 && liiil11.resp_code == 0) {
            $.actName = liiil11.data.actName;
            $.shopName = liiil11.data.shopName;
          } else {
            console.log(liiil11);
          }
          illiilI.status == 200 && refreshToken(illiilI);
        }
      } catch (II1il1li) {
        $.logErr(II1il1li, illiilI);
      } finally {
        l1lII1li();
      }
    });
  });
}
function drawPrize() {
  return new Promise(iIii1l => {
    let IiIi1lil = {};
    $.post(taskPostUrl("api/prize/drawPrize", IiIi1lil), async (lIi1Ill, illil1ii, IiIilll) => {
      try {
        lIi1Ill ? (console.log("" + JSON.stringify(lIi1Ill)), console.log($.name + " drawPrize API请求失败，请检查网路重试")) : (IiIilll = JSON.parse(IiIilll), IiIilll && IiIilll.resp_code == 0 ? ($.drawNumber = IiIilll.data.drawNumber, $.prizeInfo = IiIilll.data.prizeInfo || []) : console.log(IiIilll), illil1ii.status == 200 && refreshToken(illil1ii));
      } catch (iIiI1Ii1) {
        $.logErr(iIiI1Ii1, illil1ii);
      } finally {
        iIii1l();
      }
    });
  });
}
function draw() {
  return new Promise(I11lIIl1 => {
    let llII1iiI = {
      "consumePoints": 0
    };
    $.post(taskPostUrl("api/prize/draw", llII1iiI), async (ii1lIi1i, i1l1illi, iiiIiI11) => {
      try {
        if (ii1lIi1i) {
          console.log("" + JSON.stringify(ii1lIi1i));
          console.log($.name + " draw API请求失败，请检查网路重试");
        } else {
          iiiIiI11 = JSON.parse(iiiIiI11);
          if (iiiIiI11 && iiiIiI11.resp_code == 0) {
            if (iiiIiI11.data === "") console.log("💨 空气");else {
              if (iiiIiI11.data === "1") {
                console.log("积分不足，无法抽奖");
              } else {
                drawInfo = iiiIiI11.data;
                if (drawInfo) switch (drawInfo.prizeType) {
                  case 1:
                    console.log("🎉 " + drawInfo.prizeName + " 🐶");
                    break;
                  case 2:
                    console.log("🗑️ 优惠券");
                    break;
                  case 3:
                    generateId = iiiIiI11.data.prizeInfoId;
                    prizeName = drawInfo.prizeName;
                    console.log(iiiIiI11);
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    break;
                  case 4:
                  case 11:
                    console.log("🗑️ " + drawInfo.prizeName + " 🎟️");
                    break;
                  case 5:
                    console.log("🗑️ 专享价");
                    break;
                  case 6:
                    console.log("🎉 " + drawInfo.prizeName + " 🧧");
                    break;
                  case 8:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  case 7:
                  case 9:
                  case 10:
                  case 12:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  default:
                    console.log(drawInfo);
                    break;
                }
              }
            }
          } else {
            console.log(iiiIiI11);
            for (let iI1liIli of ["未开始", "结束", "不存在", "不在"]) {
              if (iiiIiI11.resp_msg.includes(iI1liIli)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          i1l1illi.status == 200 && refreshToken(i1l1illi);
        }
      } catch (iliIliii) {
        $.logErr(iliIliii, i1l1illi);
      } finally {
        I11lIIl1();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IlllIiII => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIllI1I1 = "";
    if ($.shopactivityId) iIllI1I1 = ",\"activityId\":" + $.shopactivityId;
    const iil1IlIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIllI1I1 + ",\"channel\":406}",
      iIl1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iil1IlIl)
      },
      iilliiiI = await getH5st("8adfb", iIl1i),
      l11lII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iil1IlIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iilliiiI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l11lII, async (i1i1iil1, ll11lIli, IiliI1Ii) => {
      try {
        IiliI1Ii = IiliI1Ii && IiliI1Ii.match(/jsonp_.*?\((.*?)\);/) && IiliI1Ii.match(/jsonp_.*?\((.*?)\);/)[1] || IiliI1Ii;
        let l1111lI1 = $.toObj(IiliI1Ii, IiliI1Ii);
        if (l1111lI1 && typeof l1111lI1 == "object") {
          if (l1111lI1 && l1111lI1.success === true) {
            console.log(l1111lI1.message);
            $.errorJoinShop = l1111lI1.message;
            if (l1111lI1.result && l1111lI1.result.giftInfo) {
              for (let lliIiIl of l1111lI1.result.giftInfo.giftList) {
                console.log("入会获得: " + lliIiIl.discountString + lliIiIl.prizeName + lliIiIl.secondLineDesc);
              }
            }
            console.log("");
          } else l1111lI1 && typeof l1111lI1 == "object" && l1111lI1.message ? ($.errorJoinShop = l1111lI1.message, console.log("" + (l1111lI1.message || ""))) : console.log(IiliI1Ii);
        } else console.log(IiliI1Ii);
      } catch (liIlIIiI) {
        $.logErr(liIlIIiI, ll11lIli);
      } finally {
        IlllIiII();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async l11iii1I => {
    let II1l1iII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IilIiiil = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(II1l1iII)
      },
      iI1I11l = await getH5st("ef79a", IilIiiil),
      Ii1I1Il1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + II1l1iII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iI1I11l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii1I1Il1, async (iIiiIIi, iliIIii, IIll) => {
      try {
        IIll = IIll && IIll.match(/jsonp_.*?\((.*?)\);/) && IIll.match(/jsonp_.*?\((.*?)\);/)[1] || IIll;
        let lllIi1il = $.toObj(IIll, IIll);
        lllIi1il && typeof lllIi1il == "object" ? lllIi1il && lllIi1il.success == true && (console.log("\n去加入店铺会员：" + (lllIi1il.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = lllIi1il.result.interestsRuleList && lllIi1il.result.interestsRuleList[0] && lllIi1il.result.interestsRuleList[0].interestsInfo && lllIi1il.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IIll);
      } catch (i11iIiIi) {
        $.logErr(i11iIiIi, iliIIii);
      } finally {
        l11iii1I();
      }
    });
  });
}
function taskPostUrl(ilIiII1l, Il1IlIi1) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + ilIiII1l,
    "body": JSON.stringify(Il1IlIi1),
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
function refreshToken(I11Il1l1) {
  if (I11Il1l1) {
    if (I11Il1l1.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let I1l1i1li of I11Il1l1.headers["set-cookie"]) {
        lz_cookie[I1l1i1li.split(";")[0].substr(0, I1l1i1li.split(";")[0].indexOf("="))] = I1l1i1li.split(";")[0].substr(I1l1i1li.split(";")[0].indexOf("=") + 1);
      }
      for (const liIIlI of Object.keys(lz_cookie)) {
        cookie += liIIlI + "=" + lz_cookie[liIIlI] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(IiillI1I) {
  return new Promise(lll11l1I => {
    const IIlI1I11 = {
      "url": IiillI1I + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IIlI1I11, async (lIl1iII1, i1IiI1Il, lIilIl11) => {
      try {
        if (lIl1iII1) $.getAuthorCodeListerr = false;else {
          if (lIilIl11) lIilIl11 = JSON.parse(lIilIl11);
          $.getAuthorCodeListerr = true;
        }
      } catch (liii1li1) {
        $.logErr(liii1li1, i1IiI1Il);
        lIilIl11 = null;
      } finally {
        lll11l1I(lIilIl11);
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(ilIlli1i) {
  ilIlli1i = ilIlli1i || 32;
  let li1I1iI1 = "abcdef0123456789",
    l1IllIll = li1I1iI1.length,
    lllIlIl1 = "";
  for (i = 0; i < ilIlli1i; i++) lllIlIl1 += li1I1iI1.charAt(Math.floor(Math.random() * l1IllIll));
  return lllIlIl1;
}
function getQueryString(I1II1I1i, lillI1Il) {
  let iIiIIlIi = new RegExp("(^|[&?])" + lillI1Il + "=([^&]*)(&|$)"),
    IIiIi11i = I1II1I1i.match(iIiIIlIi);
  if (IIiIi11i != null) return decodeURIComponent(IIiIi11i[2]);
  return "";
}
function safeGet(illiIIII) {
  if (!illiIIII) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(illiIIII) == "object") {
      return true;
    }
  } catch (l1iilili) {
    return console.log(l1iilili), false;
  }
}
function jsonParse(IiiIIIii) {
  if (typeof IiiIIIii == "string") {
    try {
      return JSON.parse(IiiIIIii);
    } catch (lIliII1i) {
      return console.log(lIliII1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function random(l1lI1i1I, l1i1l11l) {
  return Math.floor(Math.random() * (l1i1l11l - l1lI1i1I)) + l1lI1i1I;
}
