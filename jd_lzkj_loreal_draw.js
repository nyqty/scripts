/*
活动名称：幸运抽奖（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10020/10021/10026/10041/10042/10046/10062/10063/10073/10080>&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_draw_url // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('幸运抽奖（超级无线欧莱雅）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

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
  Object.keys(jdCookieNode).forEach(ilillII => {
    cookiesArr.push(jdCookieNode[ilillII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(iiIliIli => iiIliIli.cookie)].filter(IllllII1 => !!IllllII1);
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
  for (let lii1iiii = 0; lii1iiii < cookiesArr.length; lii1iiii++) {
    if (cookiesArr[lii1iiii]) {
      cookie = cookiesArr[lii1iiii];
      originCookie = cookiesArr[lii1iiii];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = lii1iiii + 1;
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
      getUA();
      await lzkj_draw();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        break;
      }
    }
  }
})().catch(l1l1lI => {
  $.log("", " " + $.name + ", 失败! 原因: " + l1l1lI + "!", "");
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
    if (activityType == "10026" || activityType == "10080") await getPoints();else for (let il11i1II = 0; il11i1II < $.taskslist.length; il11i1II++) {
      $.taskstatus = $.taskslist[il11i1II].status || 0;
      $.taskType = $.taskslist[il11i1II].taskType;
      if ($.taskstatus == 0) {
        if ($.taskslist[il11i1II].taskId) switch ($.taskType) {
          case 1:
          case 2:
          case 14:
            $.taskId = $.taskslist[il11i1II].taskId;
            $.skuId = "";
            await toDo();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 3:
          case 5:
          case 7:
            $.taskId = $.taskslist[il11i1II].taskId;
            $.skuInfoVO = $.taskslist[il11i1II].skuInfoVO || [];
            for (let I11lilII = 0; I11lilII < $.skuInfoVO.length; I11lilII++) {
              $.taskskuInfoVO = $.skuInfoVO[I11lilII].status || 0;
              $.taskskuInfoVO == 0 && ($.skuId = $.skuInfoVO[I11lilII].skuId, await toDo(), await $.wait(parseInt(Math.random() * 500 + 500, 10)));
            }
            break;
          case 4:
          case 6:
          case 9:
            $.taskId = $.taskslist[il11i1II].taskId;
            $.skuId = "";
            await toDo();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 10:
          case 12:
            $.taskId = $.taskslist[il11i1II].taskId;
            $.skuId = "";
            $.taskfinishNum = $.taskslist[il11i1II].finishNum || 0;
            $.taskshareCount = $.taskslist[il11i1II].shareCount || 0;
            for (let liiI11l = 0; liiI11l < $.taskfinishNum; liiI11l++) {
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
      for (let llI1lii1 = 0; llI1lii1 < $.prizeInfo.length; llI1lii1++) {
        prizeName = $.prizeInfo[llI1lii1].prizeName;
        leftNum = $.prizeInfo[llI1lii1].leftNum;
        let illIIiii = $.prizeInfo[llI1lii1].prizeType;
        switch (illIIiii) {
          case 1:
            illIIiii = "京豆";
            break;
          case 2:
            illIIiii = "优惠券";
            break;
          case 3:
            illIIiii = "实物";
            break;
          case 4:
            illIIiii = "积分";
            break;
          case 5:
            illIIiii = "专享价";
            break;
          case 6:
            illIIiii = "红包";
            break;
          case 7:
            illIIiii = "礼品卡";
            break;
          case 8:
            illIIiii = "E卡";
            break;
          case 9:
            illIIiii = "PLUS会员";
            break;
          case 10:
            illIIiii = "爱奇艺会员";
            break;
          case 11:
            illIIiii = "积分";
            break;
          default:
            console.log("未成功获取数据");
            return;
        }
        $.prizeList += "  " + prizeName + "（" + illIIiii + "，剩余" + leftNum + "件）\n";
      }
      console.log("店铺名称：" + $.shopName + "\n活动奖品：\n" + $.prizeList);
    }
    if (activityType == "10026" || activityType == "10080") {
      let IllI1lii = parseInt($.poorScore / $.consumePoints);
      if (IllI1lii <= 0) {
        console.log("积分不足，无法抽奖~");
        return;
      }
      for (let lilll11i = 0; lilll11i < IllI1lii; lilll11i++) {
        await draw();
        await $.wait(1000);
        if (lilll11i >= 5) {
          console.log("\n抽奖太多次了，下次再继续吧~");
          break;
        }
      }
    } else {
      if ($.drawNumber <= 0) {
        console.log("没有抽奖机会了~");
        return;
      }
      for (let lli1ll1i = 0; lli1ll1i < $.drawNumber; lli1ll1i++) {
        await draw();
        await $.wait(1000);
        if (lli1ll1i >= 5) {
          console.log("\n抽奖太多次了，下次再继续吧~");
          break;
        }
      }
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function getShopOpenCardInfo(iIlIiI1I) {
  let iliiliIi = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(iIlIiI1I)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(Ii11liii => {
    $.get(iliiliIi, (il1ll111, I1Ilil11, IliIliI) => {
      try {
        if (il1ll111) {
          if (il1ll111 === "Response code 403 (Forbidden)") {
            $.err = true;
            console.log(String(il1ll111));
          }
        } else {
          res = JSON.parse(IliIliI);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (lIi1I1II) {
        console.log(lIi1I1II);
      } finally {
        Ii11liii();
      }
    });
  });
}
function showMsg() {
  return new Promise(Il1ii1il => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    Il1ii1il();
  });
}
function login(llilII1, iIliliii) {
  return new Promise(iI1I11l1 => {
    $.post(taskPostUrl(llilII1, iIliliii), async (iii1li1, I1I11Iii, llIIilIl) => {
      try {
        if (iii1li1) {
          console.log("" + JSON.stringify(iii1li1));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          llIIilIl = JSON.parse(llIIilIl);
          if (llIIilIl && llIIilIl.data) {
            $.tokens = llIIilIl.data.token;
            $.customerId = llIIilIl.data.customerId;
            $.joinVenderId = llIIilIl.data.joinInfo.shopId;
            $.openCardUrl = llIIilIl.data.joinInfo.openCardUrl;
            $.shopName = llIIilIl.data.shopName;
            $.actName = llIIilIl.data.actName;
            $.openCardUrl && ($.joinVenderId = llIIilIl.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = llIIilIl.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let ii1lIIi1 = 0; ii1lIIi1 < Array(2).length; ii1lIIi1++) {
                if (ii1lIIi1 > 0) console.log("第" + ii1lIIi1 + "次 重新开卡");
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(llIIilIl);
          I1I11Iii.status == 200 && refreshToken(I1I11Iii);
        }
      } catch (Ii1ill1) {
        $.logErr(Ii1ill1, I1I11Iii);
      } finally {
        iI1I11l1();
      }
    });
  });
}
function follow() {
  return new Promise(l1ii1li => {
    let li1iI1i1 = {};
    $.post(taskPostUrl("api/task/followShop/follow", li1iI1i1), async (llIIIi11, IIlIl1i, I1il1iii) => {
      try {
        if (llIIIi11) {
          console.log("" + JSON.stringify(llIIIi11));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          I1il1iii = JSON.parse(I1il1iii);
          if (I1il1iii && I1il1iii.resp_code == 0) {} else {
            console.log(I1il1iii.resp_msg);
            for (let Ii1lI11l of ["未开始", "结束", "不存在", "不在"]) {
              if (I1il1iii.resp_msg.includes(Ii1lI11l)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          IIlIl1i.status == 200 && refreshToken(IIlIl1i);
        }
      } catch (iIli11iI) {
        $.logErr(iIli11iI, IIlIl1i);
      } finally {
        l1ii1li();
      }
    });
  });
}
function activity(II11iii1) {
  return new Promise(I1iIiIII => {
    let illiIi1I = {};
    $.post(taskPostUrl("api/task/" + II11iii1 + "/activity", illiIi1I), async (IliIlli1, I1lli1, iiIl11ll) => {
      try {
        if (IliIlli1) {
          console.log("" + JSON.stringify(IliIlli1));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          iiIl11ll = JSON.parse(iiIl11ll);
          if (iiIl11ll && iiIl11ll.data) $.taskslist = iiIl11ll.data.taskList || [];else {
            console.log(iiIl11ll.resp_msg);
            for (let i11lIlI1 of ["未开始", "结束", "不存在", "不在"]) {
              if (iiIl11ll.resp_msg.includes(i11lIlI1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          I1lli1.status == 200 && refreshToken(I1lli1);
        }
      } catch (Ili11iIi) {
        $.logErr(Ili11iIi, I1lli1);
      } finally {
        I1iIiIII();
      }
    });
  });
}
function getPoints() {
  return new Promise(I11li11l => {
    let ilIlI1 = {};
    $.post(taskPostUrl("api/task/points/getPoints", ilIlI1), async (il1l11, ilIIilII, Ii1lili) => {
      try {
        if (il1l11) {
          console.log("" + JSON.stringify(il1l11));
          console.log($.name + " getPoints API请求失败，请检查网路重试");
        } else {
          Ii1lili = JSON.parse(Ii1lili);
          if (Ii1lili && Ii1lili.resp_code == 0) {
            $.consumePoints = Ii1lili.data.consumePoints;
            $.poorScore = Ii1lili.data.poorScore;
          } else {
            console.log(Ii1lili.resp_msg);
            for (let lli1i11l of ["未开始", "结束", "不存在", "不在"]) {
              if (Ii1lili.resp_msg.includes(lli1i11l)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          ilIIilII.status == 200 && refreshToken(ilIIilII);
        }
      } catch (lliiiiIi) {
        $.logErr(lliiiiIi, ilIIilII);
      } finally {
        I11li11l();
      }
    });
  });
}
function draw() {
  return new Promise(l1iIiii => {
    let IiiIIllI = {
      "consumePoints": 0
    };
    $.post(taskPostUrl("api/prize/draw", IiiIIllI), async (llll1ili, I11lIIIi, I1I11iii) => {
      try {
        if (llll1ili) {
          console.log("" + JSON.stringify(llll1ili));
          console.log($.name + " draw API请求失败，请检查网路重试");
        } else {
          I1I11iii = JSON.parse(I1I11iii);
          if (I1I11iii && I1I11iii.resp_code == 0) {
            if (I1I11iii.data === "") console.log("💨 空气");else {
              if (I1I11iii.data === "1") console.log("积分不足，无法抽奖");else {
                drawInfo = I1I11iii.data;
                if (drawInfo) {
                  switch (drawInfo.prizeType) {
                    case 1:
                      console.log("🎉 " + drawInfo.prizeName + " 🐶");
                      break;
                    case 2:
                      console.log("🗑️ 优惠券");
                      break;
                    case 3:
                      generateId = I1I11iii.data.prizeInfoId;
                      prizeName = drawInfo.prizeName;
                      console.log(I1I11iii);
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
            }
          } else {
            console.log(I1I11iii);
            for (let lIlIlIli of ["未开始", "结束", "不存在", "不在"]) {
              if (I1I11iii.resp_msg.includes(lIlIlIli)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          I11lIIIi.status == 200 && refreshToken(I11lIIIi);
        }
      } catch (lI11iIiI) {
        $.logErr(lI11iIiI, I11lIIIi);
      } finally {
        l1iIiii();
      }
    });
  });
}
function toDo() {
  return new Promise(iI1ii1iI => {
    let IliII1ll = {
      "taskId": $.taskId,
      "skuId": $.skuId
    };
    $.post(taskPostUrl("api/basic/task/toDo", IliII1ll), async (llIIliiI, I11IIii1, iliI1Ill) => {
      try {
        if (llIIliiI) {
          console.log("" + JSON.stringify(llIIliiI));
          console.log($.name + " toDo API请求失败，请检查网路重试");
        } else {
          iliI1Ill = JSON.parse(iliI1Ill);
          if (iliI1Ill && iliI1Ill.resp_code == 0) {} else {
            if (iliI1Ill && iliI1Ill.resp_code == 50013 || iliI1Ill.resp_code == 50012) {} else for (let iii11iIl of ["未开始", "结束", "不存在", "不在"]) {
              if (iliI1Ill.resp_msg.includes(iii11iIl)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          I11IIii1.status == 200 && refreshToken(I11IIii1);
        }
      } catch (lII1I1Il) {
        $.logErr(lII1I1Il, I11IIii1);
      } finally {
        iI1ii1iI();
      }
    });
  });
}
function basicInfo() {
  return new Promise(Ii1l1Ii1 => {
    let iIiIiil = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", iIiIiil), async (i1iiI1I, iliII1I, iII1111I) => {
      try {
        if (i1iiI1I) {
          console.log("" + JSON.stringify(i1iiI1I));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          iII1111I = JSON.parse(iII1111I);
          if (iII1111I && iII1111I.resp_code == 0) {
            $.actName = iII1111I.data.actName;
            $.shopName = iII1111I.data.shopName;
          } else {
            console.log(iII1111I);
            for (let l1Il11i of ["未开始", "结束", "不存在", "不在"]) {
              if (iII1111I.resp_msg.includes(l1Il11i)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          iliII1I.status == 200 && refreshToken(iliII1I);
        }
      } catch (lillIiiI) {
        $.logErr(lillIiiI, iliII1I);
      } finally {
        Ii1l1Ii1();
      }
    });
  });
}
function drawPrize() {
  return new Promise(Iil1111 => {
    let Il11iII = {};
    $.post(taskPostUrl("api/prize/drawPrize", Il11iII), async (Ii1lliii, IilIIIli, l1lliiiI) => {
      try {
        if (Ii1lliii) {
          console.log("" + JSON.stringify(Ii1lliii));
          console.log($.name + " drawPrize API请求失败，请检查网路重试");
        } else {
          l1lliiiI = JSON.parse(l1lliiiI);
          if (l1lliiiI && l1lliiiI.resp_code == 0) {
            $.drawNumber = l1lliiiI.data.drawNumber;
            $.prizeInfo = l1lliiiI.data.prizeInfo || [];
          } else {
            console.log(l1lliiiI);
            for (let Iliill1l of ["未开始", "结束", "不存在", "不在"]) {
              if (l1lliiiI.resp_msg.includes(Iliill1l)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          IilIIIli.status == 200 && refreshToken(IilIIIli);
        }
      } catch (iIiii1li) {
        $.logErr(iIiii1li, IilIIIli);
      } finally {
        Iil1111();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async I11Il11 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I1iIiI = "";
    if ($.shopactivityId) I1iIiI = ",\"activityId\":" + $.shopactivityId;
    const Il11i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I1iIiI + ",\"channel\":406}",
      llll1iII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il11i)
      },
      iIll11i1 = await getH5st("8adfb", llll1iII),
      IiliiIlI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Il11i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIll11i1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IiliiIlI, async (I1IIiiI1, llllI1ll, i1Illll1) => {
      try {
        i1Illll1 = i1Illll1 && i1Illll1.match(/jsonp_.*?\((.*?)\);/) && i1Illll1.match(/jsonp_.*?\((.*?)\);/)[1] || i1Illll1;
        let l1IIilI = $.toObj(i1Illll1, i1Illll1);
        if (l1IIilI && typeof l1IIilI == "object") {
          if (l1IIilI && l1IIilI.success === true) {
            console.log(l1IIilI.message);
            $.errorJoinShop = l1IIilI.message;
            if (l1IIilI.result && l1IIilI.result.giftInfo) for (let Il1iiIlI of l1IIilI.result.giftInfo.giftList) {
              console.log("入会获得: " + Il1iiIlI.discountString + Il1iiIlI.prizeName + Il1iiIlI.secondLineDesc);
            }
            console.log("");
          } else l1IIilI && typeof l1IIilI == "object" && l1IIilI.message ? ($.errorJoinShop = l1IIilI.message, console.log("" + (l1IIilI.message || ""))) : console.log(i1Illll1);
        } else console.log(i1Illll1);
      } catch (i1ilil1I) {
        $.logErr(i1ilil1I, llllI1ll);
      } finally {
        I11Il11();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async i1l1lii1 => {
    let Iiil1I1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const lIii1lIi = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Iiil1I1l)
      },
      IIl1ii1I = await getH5st("ef79a", lIii1lIi),
      llIli11I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Iiil1I1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIl1ii1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(llIli11I, async (IIiil1Ii, lIiI11i1, I1iI1111) => {
      try {
        I1iI1111 = I1iI1111 && I1iI1111.match(/jsonp_.*?\((.*?)\);/) && I1iI1111.match(/jsonp_.*?\((.*?)\);/)[1] || I1iI1111;
        let i1IllI1 = $.toObj(I1iI1111, I1iI1111);
        i1IllI1 && typeof i1IllI1 == "object" ? i1IllI1 && i1IllI1.success == true && (console.log("\n去加入店铺会员：" + (i1IllI1.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = i1IllI1.result.interestsRuleList && i1IllI1.result.interestsRuleList[0] && i1IllI1.result.interestsRuleList[0].interestsInfo && i1IllI1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(I1iI1111);
      } catch (ilIlllIi) {
        $.logErr(ilIlllIi, lIiI11i1);
      } finally {
        i1l1lii1();
      }
    });
  });
}
function taskPostUrl(Ii1lllll, l1i1III1) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + Ii1lllll,
    "body": JSON.stringify(l1i1III1),
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
function refreshToken(i1iIliil) {
  if (i1iIliil) {
    if (i1iIliil.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let l1il1l1 of i1iIliil.headers["set-cookie"]) {
        lz_cookie[l1il1l1.split(";")[0].substr(0, l1il1l1.split(";")[0].indexOf("="))] = l1il1l1.split(";")[0].substr(l1il1l1.split(";")[0].indexOf("=") + 1);
      }
      for (const iIll11l1 of Object.keys(lz_cookie)) {
        cookie += iIll11l1 + "=" + lz_cookie[iIll11l1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(l1IlIl1i) {
  l1IlIl1i = l1IlIl1i || 32;
  let I11l11II = "abcdef0123456789",
    IlIIIIiI = I11l11II.length,
    iil1Iii = "";
  for (i = 0; i < l1IlIl1i; i++) iil1Iii += I11l11II.charAt(Math.floor(Math.random() * IlIIIIiI));
  return iil1Iii;
}
function getQueryString(liII1I11, IliIlill) {
  let II1IIlI1 = new RegExp("(^|[&?])" + IliIlill + "=([^&]*)(&|$)"),
    iillIiI1 = liII1I11.match(II1IIlI1);
  if (iillIiI1 != null) {
    return decodeURIComponent(iillIiI1[2]);
  }
  return "";
}
