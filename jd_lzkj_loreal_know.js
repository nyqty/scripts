/*
活动名称：知识超人（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10039&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10039&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_know_url // 活动链接
		jd_lzkj_loreal_know_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_know_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_know_break // 493后继续执行，默认退出运行（true/false）

注：活动接口没有登记正确答案所以脚本可能会出现答题失败的情况，不过脚本会自动排除错误答案，为了提高头部账号的成功率脚本采用倒序运行账号

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#知识超人（超级无线）
1 1 1 1 * jd_lzkj_loreal_know.js, tag=知识超人（超级无线）, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('知识超人（超级无线）')
const IiiIIi11 = require("./jdCookie"),
  IillIl11 = require("./function/jdCommon"),
  I1l1ii1I = require("./function/sendJDNotify"),
  l11I1iI1 = require("./function/krgetToken"),
  {
    loreal_savePrize: I1lIii1l
  } = require("./function/krsavePrize"),
  IlI1li1 = process.env.jd_lzkj_loreal_know_url || "",
  iIl1I1ll = process.env.jd_lzkj_loreal_know_opencard === "true",
  l1l1I1Ii = process.env.jd_lzkj_loreal_know_break === "true",
  IiIl1II1 = process.env.jd_lzkj_loreal_know_Notify === "true";
let i11i1lIi = "",
  I1II11ii = "";
const IIIll11I = Object.keys(IiiIIi11).map(llllIlII => IiiIIi11[llllIlII]).filter(ll11IIl => ll11IIl);
!IIIll11I[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!IlI1li1) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const Ill1i1l1 = IillIl11.parseUrl(IlI1li1);
  if (!Ill1i1l1) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = IlI1li1;
  $.activityId = IillIl11.getUrlParameter(IlI1li1, "activityId");
  $.activityType = IillIl11.getUrlParameter(IlI1li1, "activityType");
  $.hostname = Ill1i1l1.hostname;
  $.pathname = Ill1i1l1.pathname;
  let i1IilI1l = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) i1IilI1l = "apps/interact";else $.hostname.includes("lzkj") && (i1IilI1l = $.pathname.replace(/\/index$/, ""));
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + i1IilI1l;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !i1IilI1l || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  I1l1ii1I.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  IIIll11I.reverse();
  for (let lIilIl11 = 0; lIilIl11 < IIIll11I.length; lIilIl11++) {
    $.index = lIilIl11 + 1;
    i11i1lIi = IIIll11I[lIilIl11];
    I1II11ii = IIIll11I[lIilIl11];
    IillIl11.setCookie(I1II11ii);
    $.UserName = decodeURIComponent(IillIl11.getCookieValue(i11i1lIi, "pt_pin"));
    $.UA = IillIl11.genUA($.UserName);
    $.UUID = IillIl11.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = I1l1ii1I.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await IIIli111();
    IillIl11.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  IiIl1II1 && I1l1ii1I.getMessage() && (I1l1ii1I.updateContent(I1l1ii1I.content + ("\n【活动地址】" + $.activityUrl)), await I1l1ii1I.push());
})().catch(I11IlII => $.logErr(I11IlII)).finally(() => $.done());
async function IIIli111() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await l11I1iI1(I1II11ii, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await lil1ii11("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1004":
          await lil1ii11("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await lil1ii11("follow"));
          if (iIl1I1ll) {
            const ll11l1 = await IillIl11.joinShopMember($.venderId);
            if (ll11l1) console.log("加入店铺会员成功");else {
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
      if ($.runEnd || $.outFlag || $.skipRun) return;
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) return;
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await lil1ii11("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await lil1ii11("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10039":
          break;
        case "":
          console.log("未能获取活动类型"), $.message.fix("未能获取活动类型"), $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.message.fix("活动类型（" + $.activityType + "）不受支持"), $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) return;
      await $.wait(500);
    }
    await lil1ii11("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await lil1ii11("drawPrize");
      await $.wait(500);
      const lill11iI = $.prizeInfo[0]?.["prizeName"],
        iIll11lI = $.prizeInfo[0]?.["prizeType"],
        iIi1l1i1 = $.prizeInfo[0]?.["leftNum"];
      let iIlliI1 = iIi1l1i1 >= 1,
        l1ill1II = "" + lill11iI + (iIll11lI === 5 ? "[专享价]" : iIll11lI === 3 ? "[实物]" : "") + "，" + (iIi1l1i1 >= 1 ? "剩余" + iIi1l1i1 + "件" : "已发完");
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + l1ill1II + "\n");
      I1l1ii1I.updateContent(I1l1ii1I.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + l1ill1II));
      const i1l1i1Ii = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        I1i1l1Il = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const iII1IIil = Date.now();
          if ($.actStartTime && iII1IIil < $.actStartTime) {
            console.log("活动将在 " + i1l1i1Ii + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + i1l1i1Ii);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && iII1IIil > $.actEndTime) {
            console.log("活动已于 " + I1i1l1Il + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + I1i1l1Il);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + i1l1i1Ii + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + i1l1i1Ii), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + I1i1l1Il + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + I1i1l1Il), $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!iIlliI1) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    !$.activityQaBankByIds && ($.activityQaBankByIds = $.activityContent?.["activityQaBankByIds"]);
    const Iilli11I = $.activityContent?.["anCount"];
    await lil1ii11("startAnswer");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) return;
    iiliiIli: for (let i11II1i1 = 0; i11II1i1 < Iilli11I; i11II1i1++) {
      IIilII: for (i11II1i1 = 0; i11II1i1 < $.activityQaBankByIds.length; i11II1i1++) {
        const iiiI1Ii = $.activityQaBankByIds[i11II1i1],
          Ilii1I11 = iiiI1Ii?.["questionType"],
          IlIiI1ll = iiiI1Ii?.["qaAnswerList"] || [];
        $.questionId = iiiI1Ii?.["questionId"];
        switch (Ilii1I11) {
          case 1:
            const llli1ilI = Math.floor(Math.random() * IlIiI1ll.length);
            $.answersId = IlIiI1ll[llli1ilI]?.["answerId"], $.answerFailed = false, $.answerSucceeded = false, await lil1ii11("answer"), await $.wait(500);
            if ($.runEnd || $.outFlag || $.skipRun) return;
            if ($.answerFailed) {
              IlIiI1ll.splice(llli1ilI, 1);
              break IIilII;
            } else {
              if ($.answerSucceeded) {
                const IliIiIli = IlIiI1ll.indexOf(IlIiI1ll[llli1ilI]);
                IliIiIli !== -1 && (IlIiI1ll.splice(0, IliIiIli), IlIiI1ll.splice(1, IlIiI1ll.length));
              }
            }
            break;
          case 2:
            const Ii1IIilI = iiiI1Ii?.["rightCount"];
            let i11Iliii = [];
            for (let I1i1iiiI = 0; I1i1iiiI < Ii1IIilI; I1i1iiiI++) {
              let illIlI1i;
              do {
                illIlI1i = Math.floor(Math.random() * IlIiI1ll.length);
              } while (i11Iliii.includes(illIlI1i));
              i11Iliii.push(illIlI1i);
              $.answersId = IlIiI1ll[illIlI1i]?.["answerId"];
              $.answerFailed = false;
              $.answerSucceeded = false;
              await lil1ii11("answer");
              await $.wait(500);
              if ($.runEnd || $.outFlag || $.skipRun) return;
              if ($.answerFailed) {
                IlIiI1ll.splice(illIlI1i, 1);
                break IIilII;
              } else $.answerSucceeded && (IlIiI1ll[illIlI1i].rightAnswer = true);
            }
            for (let lil1lIi1 = 0; lil1lIi1 < IlIiI1ll.length; lil1lIi1++) {
              !IlIiI1ll[lil1lIi1].rightAnswer && (IlIiI1ll.splice(lil1lIi1, 1), lil1lIi1--);
            }
            break;
          default:
            console.log("未知题目类型 " + Ilii1I11), $.message.fix("未知题目类型 " + Ilii1I11), $.runEnd = true;
            return;
        }
        if ($.answerCompleted) {
          break iiliiIli;
        }
      }
    }
  } catch (ili1iilI) {
    console.log("❌ 脚本运行遇到了错误\n" + ili1iilI);
  }
}
async function li1I1l(i1iilIll, lliII1I) {
  try {
    switch (i1iilIll) {
      case "login":
        if (lliII1I.resp_code === 0 && lliII1I.data) $.token = lliII1I?.["data"]?.["token"], $.joinInfo = lliII1I?.["data"]?.["joinInfo"], $.openCardUrl = $.joinInfo?.["openCardUrl"], $.shopId = lliII1I?.["data"]?.["shopId"], $.venderId = IillIl11.getUrlParameter($.openCardUrl, "venderId"), $.shopName = lliII1I?.["data"]?.["shopName"], $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"], $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];else lliII1I.resp_msg ? (console.log(i1iilIll + " " + lliII1I.resp_msg), $.message.fix(lliII1I.resp_msg), $.skipRun = true) : console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I));
        break;
      case "follow":
        if (lliII1I.resp_code === 0) {} else lliII1I.resp_msg ? (console.log(i1iilIll + " " + lliII1I.resp_msg), $.message.fix(lliII1I.resp_msg), $.skipRun = true) : console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I));
        break;
      case "initPinToken":
        if (lliII1I.resp_code === 0 && lliII1I.data) {
          lliII1I = JSON.parse(lliII1I.data);
          if (lliII1I.resp_code === 0 && lliII1I.data) $.pinToken = lliII1I?.["data"]?.["pinToken"], $.encryptPin = lliII1I?.["data"]?.["encryptPin"];else {
            if (lliII1I.resp_code === 1000) console.log(i1iilIll + " " + lliII1I.resp_msg), $.message.fix(lliII1I.resp_msg), $.skipRun = true;else {
              if (lliII1I.resp_msg) console.log(i1iilIll + " " + lliII1I.resp_msg), $.message.fix(lliII1I.resp_msg), $.skipRun = true;else {
                console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I));
                $.skipRun = true;
              }
            }
          }
        } else console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I));
        break;
      case "basicInfo":
        if (lliII1I.resp_code === 0 && lliII1I.data) $.actStartTime = lliII1I.data?.["startTime"], $.actEndTime = lliII1I.data?.["endTime"], $.actStatus = lliII1I.data?.["actStatus"], !$.activityType && ($.activityType = String(lliII1I.data?.["actType"] || ""));else {
          if (lliII1I.resp_msg) {
            console.log(i1iilIll + " " + lliII1I.resp_msg);
            $.message.fix(lliII1I.resp_msg);
          } else console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I));
        }
        break;
      case "activity":
        if (lliII1I.resp_code === 0 && lliII1I.data) $.activityContent = lliII1I.data;else {
          if (lliII1I.resp_msg) {
            console.log(i1iilIll + " " + lliII1I.resp_msg);
            $.message.fix(lliII1I.resp_msg);
            $.skipRun = true;
            for (let liiilil of ["未开始", "结束", "不存在", "不在"]) {
              if (lliII1I.resp_msg.includes(liiilil)) {
                $.runEnd = true;
                break;
              }
            }
          } else console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I)), $.skipRun = true;
        }
        break;
      case "drawPrize":
        if (lliII1I.resp_code === 0) $.prizeInfo = lliII1I?.["data"]?.["prizeInfo"] || [];else {
          if (lliII1I.resp_msg) {
            console.log(i1iilIll + " " + lliII1I.resp_msg);
            for (let liIiiIlI of ["未开始", "结束", "不存在", "不在"]) {
              if (lliII1I.resp_msg.includes(liIiiIlI)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(lliII1I.resp_msg);
          } else {
            console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I));
          }
        }
        break;
      case "startAnswer":
        if (lliII1I.resp_code === 0) {
          if (lliII1I.data === "1") console.log("没有答题次数了~"), $.message.insert("答题机会不足"), $.skipRun = true;else lliII1I.data === 2 ? (console.log("答题已通关"), $.message.insert("答题已通关"), $.skipRun = true) : $.recordId = lliII1I?.["data"];
        } else {
          if (lliII1I.resp_msg) {
            for (let Ii1IIiII of ["未开始", "结束", "不存在", "不在"]) {
              if (lliII1I.resp_msg.includes(Ii1IIiII)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(i1iilIll + " " + lliII1I.resp_msg);
            $.message.fix(lliII1I.resp_msg);
            $.skipRun = true;
          } else console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I)), $.skipRun = true;
        }
        break;
      case "answer":
        if (lliII1I.resp_code === 0) {
          if (lliII1I.data === "1") $.answerSucceeded = true;else {
            if (lliII1I.data === "2") console.log("答题失败"), $.message.insert("答题失败"), $.answerFailed = true;else {
              $.answerCompleted = true;
              const llliili = lliII1I.data;
              if (llliili) {
                switch (llliili.prizeType) {
                  case 1:
                    console.log("🎉 " + llliili.prizeName + " 🐶"), $.message.insert(llliili.prizeName + "🐶");
                    break;
                  case 2:
                    console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
                    break;
                  case 3:
                    const iii1lill = lliII1I.data.addressId,
                      iiiiIiIl = llliili.prizeName;
                    console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + iiiiIiIl);
                    if (llliili.showImg) console.log("预览图片：" + llliili.showImg);
                    const llli1l = {
                        "baseUrl": $.baseUrl,
                        "newbaseUrl": $.newbaseUrl,
                        "cookie": I1II11ii,
                        "ua": $.UA,
                        "token": $.token,
                        "prizeName": iiiiIiIl,
                        "orderCode": iii1lill
                      },
                      iIililii = await I1lIii1l(llli1l);
                    if (!IiIl1II1 && iIililii) {
                      await I1l1ii1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iiiiIiIl + "，已成功自动登记收货地址\n\n" + $.activityUrl);
                    }
                    $.message.insert(iiiiIiIl + "(" + (iIililii ? "已填地址" : "未填地址") + ")🎁");
                    break;
                  case 4:
                  case 11:
                    console.log("🗑️ " + llliili.prizeName + " 🎟️"), $.message.insert("🗑️ " + llliili.prizeName + " 🎟️");
                    break;
                  case 5:
                    console.log("🗑️ 专享价"), $.message.insert("🗑️ 专享价");
                    break;
                  case 6:
                    console.log("🎉 " + llliili.prizeName + " 🧧"), $.message.insert("🎉 " + llliili.prizeName + " 🧧");
                    break;
                  case 7:
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                    console.log("🎉 恭喜获得" + llliili.prizeName + " 🎁"), $.message.insert("🎉 恭喜获得" + llliili.prizeName + " 🎁");
                    !IiIl1II1 && (await I1l1ii1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + llliili.prizeName + "\n\n" + $.activityUrl));
                    break;
                  default:
                    console.log(llliili);
                    break;
                }
              } else console.log("💨 空气"), $.message.insert("💨 空气");
            }
          }
        } else {
          if (lliII1I.resp_msg) {
            console.log(i1iilIll + " " + lliII1I.resp_msg);
            for (let IliIII11 of ["未开始", "结束", "不存在", "不在"]) {
              if (lliII1I.resp_msg.includes(IliIII11)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(lliII1I.resp_msg);
          } else console.log("❓" + i1iilIll + " " + JSON.stringify(lliII1I));
        }
        break;
    }
  } catch (llllilii) {
    console.log("❌ 未能正确处理 " + i1iilIll + " 请求响应 " + (llllilii.message || llllilii));
  }
}
async function lil1ii11(ll1i1ii) {
  if ($.runEnd || $.outFlag) return;
  let il1ii1li = $.newbaseUrl,
    ii1lI1il = {},
    iilil11I = "POST";
  switch (ll1i1ii) {
    case "login":
      il1ii1li += "/api/user-info/login", ii1lI1il = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      il1ii1li += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      iilil11I = "GET", il1ii1li += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      il1ii1li += "/api/active/basicInfo", ii1lI1il = {
        "activityId": $.activityId
      };
      break;
    case "activity":
      il1ii1li += "/api/task/know/activity";
      break;
    case "drawPrize":
      il1ii1li += "/api/prize/drawPrize";
      break;
    case "startAnswer":
      il1ii1li += "/api/task/know/startAnswer";
      break;
    case "answer":
      il1ii1li += "/api/task/know/answer", ii1lI1il = {
        "answersId": $.answersId,
        "questionId": $.questionId,
        "recordId": $.recordId
      };
      break;
    default:
      console.log("❌ 未知请求 " + ll1i1ii);
      return;
  }
  const iiI111I = {
    "url": il1ii1li,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      "Cookie": "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      "Host": $.hostname,
      "Origin": $.origin,
      "Referer": $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    "body": JSON.stringify(ii1lI1il),
    "timeout": 30000
  };
  $.token && (iiI111I.headers.token = $.token);
  iilil11I === "GET" && (delete iiI111I.body, delete iiI111I.headers["Content-Type"]);
  const Ii1i1iII = 5;
  let IIli11li = 0,
    Iii1lllI = null,
    il1I1lIi = false;
  while (IIli11li < Ii1i1iII) {
    IIli11li > 0 && (await $.wait(1000));
    const {
      err: IllilI1,
      res: i11lIl1,
      data: ilIlI1I
    } = await i111I1Ii(iiI111I, iilil11I);
    if (IllilI1) {
      if (typeof IllilI1 === "string" && IllilI1.includes("Timeout awaiting 'request'")) Iii1lllI = ll1i1ii + " 请求超时，请检查网络重试";else {
        const I11IliiI = i11lIl1?.["statusCode"];
        if (I11IliiI) {
          if ([403, 493].includes(I11IliiI)) Iii1lllI = ll1i1ii + " 请求失败，IP被限制（Response code " + I11IliiI + "）", il1I1lIi = true;else [400, 404].includes(I11IliiI) ? Iii1lllI = ll1i1ii + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I11IliiI + "）" : Iii1lllI = ll1i1ii + " 请求失败（Response code " + I11IliiI + "）";
        } else Iii1lllI = ll1i1ii + " 请求失败 => " + (IllilI1.message || IllilI1);
      }
      IIli11li++;
    } else {
      const iIIli111 = IillIl11.getResponseCookie(i11lIl1),
        IlI1IIl = false;
      if (IlI1IIl) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + ll1i1ii + " 响应Body => " + (ilIlI1I || "无") + "\n");
        console.log("🔧 " + ll1i1ii + " 响应Cookie => " + (iIIli111 || "无") + "\n");
        console.log("🔧 " + ll1i1ii + " 请求参数");
        console.log(iiI111I);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(ll1i1ii)) try {
        const ll1Ii111 = JSON.parse(ilIlI1I);
        li1I1l(ll1i1ii, ll1Ii111);
        break;
      } catch (l1l1liI1) {
        Iii1lllI = "❌ " + ll1i1ii + " 接口响应数据解析失败: " + l1l1liI1.message;
        console.log("🚫 " + ll1i1ii + " => " + String(ilIlI1I || "无响应数据"));
        IlI1IIl && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        IIli11li++;
      } else break;
      il1I1lIi = false;
    }
  }
  if (IIli11li >= Ii1i1iII) {
    console.log(Iii1lllI);
    if (il1I1lIi) {
      if (!l1l1I1Ii) {
        $.outFlag = true;
        if ($.message) {
          $.message.fix(Iii1lllI);
        }
      }
    }
  }
}
async function i111I1Ii(Iil1, lI1llIil = "POST") {
  if (lI1llIil === "POST") {
    return new Promise(async ilIl1lIi => {
      $.post(Iil1, (iIllllli, liIIIilI, i11illil) => {
        ilIl1lIi({
          "err": iIllllli,
          "res": liIIIilI,
          "data": i11illil
        });
      });
    });
  } else {
    if (lI1llIil === "GET") return new Promise(async l1liIIi1 => {
      $.get(Iil1, (iII1iIlI, I1I1iIi1, iIilIIi1) => {
        l1liIIi1({
          "err": iII1iIlI,
          "res": I1I1iIi1,
          "data": iIilIIi1
        });
      });
    });else {
      const l1ilil = "不支持的请求方法";
      return {
        "err": l1ilil,
        "res": null,
        "data": null
      };
    }
  }
}