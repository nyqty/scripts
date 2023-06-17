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
const Il1IlI1I = $.isNode() ? require("./sendNotify") : "",
  IIli1iII = $.isNode() ? require("./jdCookie.js") : "",
  ii1l1iI1 = require("./function/krgetToken"),
  i1I1Ii = require("./function/krh5st");
let IlilII1I = {},
  iIiiIl1 = process.env.jd_lzkj_loreal_draw_url,
  Iiliil11 = "",
  Il1111lI = null;
$.activityEnd = false;
let I1111ill = [],
  il1ii11l = "",
  IIlIl1il = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_draw_url) iIiiIl1 = process.env.jd_lzkj_loreal_draw_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(IIli1iII).forEach(I1lii1ii => {
    I1111ill.push(IIli1iII[I1lii1ii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1111ill = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(II111li => II111li.cookie)].filter(llIi1lI1 => !!llIi1lI1);
let IlliI1lI = typeof $request !== "undefined";
IlliI1lI && (GetCookie(), $.done());
if (iIiiIl1) {
  Il1111lI = iI1l11II("" + iIiiIl1, "activityId");
  activityType = iI1l11II("" + iIiiIl1, "activityType");
  templateId = iI1l11II("" + iIiiIl1, "templateId");
  if (iIiiIl1.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else iIiiIl1.includes("lzkj") ? wxActType = iIiiIl1.match(/\/(prod\/cc\/interact\w*)\//)[1] : console.log("暂不支持的类型");
  $.domain = iIiiIl1.match(/https?:\/\/([^/]+)/)[1];
}
let lliIl1il = "https://" + $.domain;
!(async () => {
  if (Il1111lI == null) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口:" + iIiiIl1);
  if (!I1111ill[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let I1Ilil1l = 0; I1Ilil1l < I1111ill.length; I1Ilil1l++) {
    if (I1111ill[I1Ilil1l]) {
      il1ii11l = I1111ill[I1Ilil1l];
      originCookie = I1111ill[I1Ilil1l];
      $.UserName = decodeURIComponent(il1ii11l.match(/pt_pin=(.+?);/) && il1ii11l.match(/pt_pin=(.+?);/)[1]);
      $.index = I1Ilil1l + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await Il1IlI1I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await iilIi1iI();
      await illIlIII();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag) break;
    }
  }
})().catch(iliIlII1 => {
  $.log("", " " + $.name + ", 失败! 原因: " + iliIlII1 + "!", "");
}).finally(() => {
  $.done();
});
async function illIlIII() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.OpenCard = false;
  $.token = await ii1l1iI1(il1ii11l, lliIl1il);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await iiI11Il1("api/user-info/login", {
      "status": "1",
      "activityId": Il1111lI,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
    await $.wait(300);
    await ll11ii11();
    await iiI11Il1("api/user-info/login", {
      "status": "1",
      "activityId": Il1111lI,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    switch (activityType) {
      case "10021":
      case "10020":
        await Iili1i1("jiugongge");
        break;
      case "10041":
      case "10042":
      case "10046":
      case "10062":
      case "10063":
      case "10073":
        await Iili1i1("lotteryCenter");
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
    if (activityType == "10026" || activityType == "10080") await IIi1Iil1();else {
      for (let IIlIi1I1 = 0; IIlIi1I1 < $.taskslist.length; IIlIi1I1++) {
        $.taskType = $.taskslist[IIlIi1I1].taskType;
        if ($.taskslist[IIlIi1I1].taskId) switch ($.taskType) {
          case 1:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 2:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 3:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 4:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 5:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 6:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 7:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 8:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 9:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          case 10:
            $.taskId = $.taskslist[IIlIi1I1].taskId;
            await iiII11ll();
            await $.wait(parseInt(Math.random() * 500 + 500, 10));
            break;
          default:
        }
      }
    }
    await lllilli1();
    await $.wait(300);
    if ($.index == 1) {
      $.prizeList = "";
      for (let lIiliIII = 0; lIiliIII < $.prizeInfo.length; lIiliIII++) {
        $.prizeName = $.prizeInfo[lIiliIII].prizeName;
        $.leftNum = $.prizeInfo[lIiliIII].leftNum;
        $.prizeType = $.prizeInfo[lIiliIII].prizeType;
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
        lIiliIII != $.prizeInfo.length - 1 ? $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n" : $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n";
      }
      console.log("店铺名称：" + $.shopName + "\n活动名称: " + $.actName + "\n活动奖品：\n" + $.prizeList);
    }
    if (activityType == "10026" || activityType == "10080") {
      let i1I11I11 = parseInt($.poorScore / $.consumePoints);
      if (i1I11I11 > 0) console.log("积分: " + $.poorScore + "/" + $.consumePoints + ", 可以抽奖" + i1I11I11 + "次");else {
        console.log("积分: " + $.poorScore + "/" + $.consumePoints + ", 可以抽奖" + i1I11I11 + "次");
        return;
      }
      for (let iIIIl1lI = 0; iIIIl1lI < $.drawNumber; iIIIl1lI++) {
        await l1iill1I();
        await $.wait(2000);
        if (iIIIl1lI >= 3) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
      }
    } else {
      if ($.drawNumber > 0) console.log("可以抽奖" + $.drawNumber + "次");else {
        console.log("没有抽奖机会了~");
        return;
      }
      for (let l11li1i = 0; l11li1i < $.drawNumber; l11li1i++) {
        await l1iill1I();
        await $.wait(2000);
        if (l11li1i >= 3) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
      }
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function il11liIl(lii11ll) {
  let li1111 = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(lii11ll)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": il1ii11l,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(iIiiIl1),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(II11IilI => {
    $.get(li1111, (lll11II, lI1111I, Ilii1lI) => {
      try {
        if (lll11II) lll11II === "Response code 403 (Forbidden)" && ($.err = true, console.log(lll11II));else {
          res = JSON.parse(Ilii1lI);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (iil1I1l1) {
        console.log(iil1I1l1);
      } finally {
        II11IilI();
      }
    });
  });
}
function IilI1i() {
  return new Promise(IIiIlili => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + IIlIl1il);
    IIiIlili();
  });
}
function iiI11Il1(llI1IiIi, IiI1llI) {
  return new Promise(I1liI1i1 => {
    $.post(IIl1iiI(llI1IiIi, IiI1llI), async (I1IIlIiI, illI11l1, l1llil1I) => {
      try {
        if (I1IIlIiI) {
          console.log("" + JSON.stringify(I1IIlIiI));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          l1llil1I = JSON.parse(l1llil1I);
          if (l1llil1I && l1llil1I.data) {
            $.tokens = l1llil1I.data.token;
            $.customerId = l1llil1I.data.customerId;
            $.joinVenderId = l1llil1I.data.joinInfo.shopId;
            $.openCardUrl = l1llil1I.data.joinInfo.openCardUrl;
            $.shopName = l1llil1I.data.shopName;
            $.actName = l1llil1I.data.actName;
            if ($.openCardUrl) {
              $.joinVenderId = l1llil1I.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1];
            }
            $.joinDes = l1llil1I.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await Ii1l1li();
              for (let lI1iI1Ii = 0; lI1iI1Ii < Array(2).length; lI1iI1Ii++) {
                if (lI1iI1Ii > 0) console.log("第" + lI1iI1Ii + "次 重新开卡");
                await i11I1il();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                  break;
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(l1llil1I);
          illI11l1.status == 200 && i1illi11(illI11l1);
        }
      } catch (ll1lilII) {
        $.logErr(ll1lilII, illI11l1);
      } finally {
        I1liI1i1();
      }
    });
  });
}
function ll11ii11() {
  return new Promise(IIIiilI => {
    let lil1lIll = {};
    $.post(IIl1iiI("api/task/followShop/follow", lil1lIll), async (l11I1ii, lIiIlill, iI1Ii1l) => {
      try {
        if (l11I1ii) {
          console.log("" + JSON.stringify(l11I1ii));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          iI1Ii1l = JSON.parse(iI1Ii1l);
          if (iI1Ii1l && iI1Ii1l.resp_code == 0) {} else {
            console.log(iI1Ii1l.resp_msg);
            for (let IiI1Iii1 of ["未开始", "结束", "不存在", "不在"]) {
              if (iI1Ii1l.resp_msg.includes(IiI1Iii1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (lIiIlill.status == 200) {
            i1illi11(lIiIlill);
          }
        }
      } catch (iiIi1iiI) {
        $.logErr(iiIi1iiI, lIiIlill);
      } finally {
        IIIiilI();
      }
    });
  });
}
function Iili1i1(iI1IiIlI) {
  return new Promise(IiIi1Iil => {
    let liIlI1iI = {};
    $.post(IIl1iiI("api/task/" + iI1IiIlI + "/activity", liIlI1iI), async (I1111lll, IIlIIl1i, liIllIlI) => {
      try {
        if (I1111lll) {
          console.log("" + JSON.stringify(I1111lll));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          liIllIlI = JSON.parse(liIllIlI);
          if (liIllIlI && liIllIlI.data) $.taskslist = liIllIlI.data.taskList || [];else {
            console.log(liIllIlI.resp_msg);
            for (let lIIIili of ["未开始", "结束", "不存在", "不在"]) {
              if (liIllIlI.resp_msg.includes(lIIIili)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          IIlIIl1i.status == 200 && i1illi11(IIlIIl1i);
        }
      } catch (l11l11l) {
        $.logErr(l11l11l, IIlIIl1i);
      } finally {
        IiIi1Iil();
      }
    });
  });
}
function IIi1Iil1() {
  return new Promise(il1llli => {
    let iiiiliIl = {};
    $.post(IIl1iiI("api/task/points/getPoints", iiiiliIl), async (iliii1l, lI1IIIiI, l1iII11) => {
      try {
        if (iliii1l) {
          console.log("" + JSON.stringify(iliii1l));
          console.log($.name + " getPoints API请求失败，请检查网路重试");
        } else {
          l1iII11 = JSON.parse(l1iII11);
          if (l1iII11 && l1iII11.resp_code == 0) {
            $.consumePoints = l1iII11.data.consumePoints;
            $.poorScore = l1iII11.data.poorScore;
          } else {
            console.log(l1iII11.resp_msg);
            for (let ilI1I1il of ["未开始", "结束", "不存在", "不在"]) {
              if (l1iII11.resp_msg.includes(ilI1I1il)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          lI1IIIiI.status == 200 && i1illi11(lI1IIIiI);
        }
      } catch (I11Iili1) {
        $.logErr(I11Iili1, lI1IIIiI);
      } finally {
        il1llli();
      }
    });
  });
}
function l1iill1I() {
  return new Promise(iiiiI1ii => {
    let l1liIl11 = {
      "consumePoints": 0
    };
    $.post(IIl1iiI("api/prize/draw", l1liIl11), async (lI1iiI1i, Ili1il1I, iIIIi1li) => {
      try {
        if (lI1iiI1i) {
          console.log("" + JSON.stringify(lI1iiI1i));
          console.log($.name + " draw API请求失败，请检查网路重试");
        } else {
          iIIIi1li = JSON.parse(iIIIi1li);
          if (iIIIi1li && iIIIi1li.resp_code == 0) {
            if (iIIIi1li.data === "") console.log("💨  空气");else {
              if (iIIIi1li.data === "1") console.log("积分不足，无法抽奖");else {
                drawInfo = iIIIi1li.data;
                if (drawInfo) switch (drawInfo.prizeType) {
                  case 1:
                    console.log("🎉 " + drawInfo.prizeName + " 🐶");
                    break;
                  case 3:
                    generateId = iIIIi1li.data.prizeInfoId;
                    prizeName = drawInfo.prizeName;
                    console.log(iIIIi1li);
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
                    console.log(iIIIi1li.data);
                    break;
                }
              }
            }
          } else {
            console.log(iIIIi1li);
            for (let iiliilI1 of ["未开始", "结束", "不存在", "不在"]) {
              if (iIIIi1li.resp_msg.includes(iiliilI1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          Ili1il1I.status == 200 && i1illi11(Ili1il1I);
        }
      } catch (liiIl1ii) {
        $.logErr(liiIl1ii, Ili1il1I);
      } finally {
        iiiiI1ii();
      }
    });
  });
}
function iiII11ll() {
  return new Promise(i1IlIlI => {
    let i1iII1ii = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(IIl1iiI("api/basic/task/toDo", i1iII1ii), async (i1I11i1, lI1ii1I1, Iii1lil1) => {
      try {
        if (i1I11i1) {
          console.log("" + JSON.stringify(i1I11i1));
          console.log($.name + " toDo API请求失败，请检查网路重试");
        } else {
          Iii1lil1 = JSON.parse(Iii1lil1);
          if (Iii1lil1 && Iii1lil1.resp_code == 0) {} else {
            if (Iii1lil1 && Iii1lil1.resp_code == 50013 || Iii1lil1.resp_code == 50012) {} else for (let I1lill1 of ["未开始", "结束", "不存在", "不在"]) {
              if (Iii1lil1.resp_msg.includes(I1lill1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          lI1ii1I1.status == 200 && i1illi11(lI1ii1I1);
        }
      } catch (l11lIll1) {
        $.logErr(l11lIll1, lI1ii1I1);
      } finally {
        i1IlIlI();
      }
    });
  });
}
function I1llI1lI() {
  return new Promise(IlilIil1 => {
    let liilIlI = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(IIl1iiI("api/active/basicInfo", liilIlI), async (ll1Ili, liIlIIl1, IIl1l11l) => {
      try {
        if (ll1Ili) {
          console.log("" + JSON.stringify(ll1Ili));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          IIl1l11l = JSON.parse(IIl1l11l);
          if (IIl1l11l && IIl1l11l.resp_code == 0) {
            $.actName = IIl1l11l.data.actName;
            $.shopName = IIl1l11l.data.shopName;
          } else {
            console.log(IIl1l11l);
            for (let i1iiiiII of ["未开始", "结束", "不存在", "不在"]) {
              if (IIl1l11l.resp_msg.includes(i1iiiiII)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          liIlIIl1.status == 200 && i1illi11(liIlIIl1);
        }
      } catch (i1III1) {
        $.logErr(i1III1, liIlIIl1);
      } finally {
        IlilIil1();
      }
    });
  });
}
function lllilli1() {
  return new Promise(ilI1I1 => {
    let I11iIiIl = {};
    $.post(IIl1iiI("api/prize/drawPrize", I11iIiIl), async (i1ilil1i, lIIi1Iii, lllillI) => {
      try {
        if (i1ilil1i) {
          console.log("" + JSON.stringify(i1ilil1i));
          console.log($.name + " drawPrize API请求失败，请检查网路重试");
        } else {
          lllillI = JSON.parse(lllillI);
          if (lllillI && lllillI.resp_code == 0) {
            $.drawNumber = lllillI.data.drawNumber;
            $.prizeInfo = lllillI.data.prizeInfo || [];
          } else {
            console.log(lllillI);
            for (let i1iIl111 of ["未开始", "结束", "不存在", "不在"]) {
              if (lllillI.resp_msg.includes(i1iIl111)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          lIIi1Iii.status == 200 && i1illi11(lIIi1Iii);
        }
      } catch (llli1II) {
        $.logErr(llli1II, lIIi1Iii);
      } finally {
        ilI1I1();
      }
    });
  });
}
async function i11I1il() {
  if (!$.joinVenderId) return;
  return new Promise(async l1illiii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIII1I1 = "";
    if ($.shopactivityId) iIII1I1 = ",\"activityId\":" + $.shopactivityId;
    const l1ili1i1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIII1I1 + ",\"channel\":406}",
      il1lll11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1ili1i1)
      },
      I1ilii1l = await i1I1Ii("8adfb", il1lll11),
      iIii1Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + l1ili1i1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1ilii1l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": il1ii11l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIii1Il, async (l1lI1ilI, llIl1Ill, i11iiil1) => {
      try {
        if (l1lI1ilI) {
          if (llIl1Ill && typeof llIl1Ill.statusCode != "undefined") {
            llIl1Ill.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          i11iiil1 = i11iiil1 && i11iiil1.match(/jsonp_.*?\((.*?)\);/) && i11iiil1.match(/jsonp_.*?\((.*?)\);/)[1] || i11iiil1;
          let IllIl1li = $.toObj(i11iiil1, i11iiil1);
          if (IllIl1li && typeof IllIl1li == "object") {
            if (IllIl1li && IllIl1li.success === true) {
              console.log(" >> " + IllIl1li.message);
              $.errorJoinShop = IllIl1li.message;
              if (IllIl1li.result && IllIl1li.result.giftInfo) {
                for (let l11ii1 of IllIl1li.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + l11ii1.discountString + l11ii1.prizeName + l11ii1.secondLineDesc);
                }
              }
            } else IllIl1li && typeof IllIl1li == "object" && IllIl1li.message ? ($.errorJoinShop = IllIl1li.message, console.log("" + (IllIl1li.message || ""))) : console.log(i11iiil1);
          } else console.log(i11iiil1);
        }
      } catch (ilIll111) {
        $.logErr(ilIll111, llIl1Ill);
      } finally {
        l1illiii();
      }
    });
  });
}
async function Ii1l1li() {
  return new Promise(async ilIIIiii => {
    const Il1ilIlI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      i1lIi11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il1ilIlI)
      },
      II1l1il = await i1I1Ii("8adfb", i1lIi11),
      liI11lI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Il1ilIlI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(II1l1il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": il1ii11l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liI11lI1, async (I1i1111, i1iI11II, lIlillll) => {
      try {
        if (I1i1111) i1iI11II && typeof i1iI11II.statusCode != "undefined" && i1iI11II.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIlillll = lIlillll && lIlillll.match(/jsonp_.*?\((.*?)\);/) && lIlillll.match(/jsonp_.*?\((.*?)\);/)[1] || lIlillll;
          let Ilii11Ii = $.toObj(lIlillll, lIlillll);
          Ilii11Ii && typeof Ilii11Ii == "object" ? Ilii11Ii && Ilii11Ii.success == true && (console.log("去加入：" + (Ilii11Ii.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = Ilii11Ii.result.interestsRuleList && Ilii11Ii.result.interestsRuleList[0] && Ilii11Ii.result.interestsRuleList[0].interestsInfo && Ilii11Ii.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lIlillll);
        }
      } catch (lllilIli) {
        $.logErr(lllilIli, i1iI11II);
      } finally {
        ilIIIiii();
      }
    });
  });
}
function IIl1iiI(iIlIII1, lllI11il) {
  return {
    "url": "" + lliIl1il + "/" + wxActType + "/" + iIlIII1,
    "body": JSON.stringify(lllI11il),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": lliIl1il,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": iIiiIl1,
      "Cookie": il1ii11l + Iiliil11 + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    },
    "timeout": 15 * 1000
  };
}
function i1illi11(l11lI1I1) {
  if (l11lI1I1) {
    if (l11lI1I1.headers["set-cookie"]) {
      il1ii11l = originCookie + ";";
      for (let I11IIIli of l11lI1I1.headers["set-cookie"]) {
        IlilII1I[I11IIIli.split(";")[0].substr(0, I11IIIli.split(";")[0].indexOf("="))] = I11IIIli.split(";")[0].substr(I11IIIli.split(";")[0].indexOf("=") + 1);
      }
      for (const iiiiiili of Object.keys(IlilII1I)) {
        il1ii11l += iiiiiili + "=" + IlilII1I[iiiiiili] + ";";
      }
      Iiliil11 = il1ii11l;
    }
  }
}
function llll1Il(i11l1lii) {
  return new Promise(llil1lI1 => {
    const ii1lII1i = {
      "url": i11l1lii + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ii1lII1i, async (ilIlII1, i11lIi1l, ilIi1i1I) => {
      try {
        if (ilIlII1) $.getAuthorCodeListerr = false;else {
          if (ilIi1i1I) ilIi1i1I = JSON.parse(ilIi1i1I);
          $.getAuthorCodeListerr = true;
        }
      } catch (i111IIi) {
        $.logErr(i111IIi, i11lIi1l);
        ilIi1i1I = null;
      } finally {
        llil1lI1(ilIi1i1I);
      }
    });
  });
}
function iilIi1iI() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + iliIi111(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function iliIi111(liIIiIl) {
  liIIiIl = liIIiIl || 32;
  let Iiili1I = "abcdef0123456789",
    ili1i1I1 = Iiili1I.length,
    ill1llIl = "";
  for (i = 0; i < liIIiIl; i++) ill1llIl += Iiili1I.charAt(Math.floor(Math.random() * ili1i1I1));
  return ill1llIl;
}
function iI1l11II(lIiilIll, i11II1ii) {
  let lIi1iIii = new RegExp("(^|[&?])" + i11II1ii + "=([^&]*)(&|$)"),
    l1ll1Iii = lIiilIll.match(lIi1iIii);
  if (l1ll1Iii != null) return unescape(l1ll1Iii[2]);
  return "";
}
function Il1I1liI(Il1ilIi) {
  if (!Il1ilIi) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(Il1ilIi) == "object") {
      return true;
    }
  } catch (lilllIi1) {
    return console.log(lilllIi1), false;
  }
}
function iiIllIli(lIiIlili) {
  if (typeof lIiIlili == "string") try {
    return JSON.parse(lIiIlili);
  } catch (lll11ll) {
    return console.log(lll11ll), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Ilill1i1(I11III11, IilliI1I) {
  return Math.floor(Math.random() * (IilliI1I - I11III11)) + I11III11;
}