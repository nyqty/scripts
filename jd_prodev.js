/*
活动名称：邀请好友入会得好礼
活动链接：https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=<活动id>
环境变量：jd_prodev_actCode // 活动ID
        jd_prodev_invitePin // 需要助力的默认用户名，不填默认CK1
        jd_prodev_Address // 用户登记收货地址，按照顺序依次填写 收件人@手机号@省份@城市@区县@详细地址，多个用管道符分开
        jd_prodev_needPhysicalPrize // 是否领取实物奖品（true/false），默认领取（只会助力到需要领取奖品的档位）

开卡邀请类活动，奖品自动过滤优惠券，自动助力并领取奖品，仅助力一个账号

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#邀请好友入会得好礼
1 1 1 1 * jd_prodev.js, tag=邀请好友入会得好礼, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('邀请好友入会得好礼')
const II11i = require("./jdCookie"),
  iI1Iii = require("./function/jdCommon"),
  liI1ii = require("./function/sendJDNotify"),
  lIIiIl = process.env.jd_prodev_actCode || "";
let iI1Iil = process.env.jd_prodev_invitePin || "";
const il1iI = process.env.jd_prodev_Notify === "true",
  i1iIii = process.env.jd_prodev_needPhysicalPrize !== "false";
let i1iIil = "";
const liI1il = Object.keys(II11i).map(liI1iI => II11i[liI1iI]).filter(iI1Il1 => iI1Il1);
!liI1il[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!lIIiIl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  $.actCode = lIIiIl;
  $.helpNums = 0;
  $.successCount = 0;
  $.minHelpNums = 0;
  $.addressList = {};
  $.rewardArray = [];
  $.activityUrl = "https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=" + $.actCode;
  liI1ii.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let IllIl1 = 0; IllIl1 < liI1il.length; IllIl1++) {
    i1iIil = liI1il[IllIl1];
    $.index = IllIl1 + 1;
    $.nickName = "";
    $.UserName = decodeURIComponent(iI1Iii.getCookieValue(i1iIil, "pt_pin"));
    $.UA = iI1Iii.genUA($.UserName);
    $.uuid = "16" + iI1Iii.genUuid("xxxxxxxxxxxxxxxxxxxxx", "0123456789");
    $.message = liI1ii.create($.index, $.UserName);
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await llIlIi();
    if ($.runEnd) break;
  }
  if ($.rewardArray.length > 0 && !$.outFlag) {
    if ($.successCount < $.minHelpNums) return;
    for (let ll1Il = 0; ll1Il < 1; ll1Il++) {
      i1iIil = liI1il[ll1Il];
      $.index = ll1Il + 1;
      $.nickName = "";
      $.UserName = decodeURIComponent(iI1Iii.getCookieValue(i1iIil, "pt_pin"));
      $.UA = iI1Iii.genUA($.UserName);
      $.uuid = "16" + iI1Iii.genUuid("xxxxxxxxxxxxxxxxxxxxx", "0123456789");
      $.message = liI1ii.create($.index, $.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 领取奖品******\n");
      let iiIi11 = 0;
      for (const ill1II of $.rewardArray) {
        $.prizeStage += 1;
        await II11I("memberBringInviteReward", encodeURIComponent(JSON.stringify({
          "code": $.actCode,
          "stage": ill1II
        })) + "&stage=" + ill1II);
        iiIi11 += 1;
        if (iiIi11 < 3) await $.wait(5000);
      }
    }
  }
  il1iI && liI1ii.getMessage() && (liI1ii.updateContent(liI1ii.content + ("\n【活动地址】" + $.activityUrl)), await liI1ii.push());
})().catch(llIIil => $.logErr(llIIil)).finally(() => $.done());
async function llIlIi() {
  $.skipRun = false;
  await lIIiIi();
  if ($.index === 1) {
    if ($.skipRun) {
      $.runEnd = true;
      return;
    }
    await II11I("memberBringActPage", encodeURIComponent(JSON.stringify({
      "code": $.actCode,
      "pageNum": 1,
      "invitePin": ""
    })) + "&invitePin=&_t=" + Date.now());
    if (!$.getActivityPage) {
      console.log("获取活动信息失败");
      $.message.fix("获取活动信息失败");
      $.runEnd = true;
      return;
    }
    $.venderId = $.getActivityPage.venderId;
    $.successCount = $.getActivityPage.successCount;
    const iI1Ill = !!$.getActivityPage?.["address"]?.["userName"];
    await II11I("memberBringFirstInvite", encodeURIComponent(JSON.stringify({
      "code": $.actCode,
      "fp": "",
      "eid": ""
    })) + "&fp=&eid=");
    if (!$.memberBringFirstInvite.success) {
      console.log($.memberBringFirstInvite.errorMessage);
      $.runEnd = true;
      return;
    }
    let lilI1 = "【活动店铺】" + ($.getActivityPage.shopName || "未知") + "\n【开始时间】" + $.time("yyyy-MM-dd HH:mm:ss", $.getActivityPage.beginTime) + "\n【结束时间】" + $.time("yyyy-MM-dd HH:mm:ss", $.getActivityPage.endTime);
    $.getActivityPage?.["helpReward"]?.["rewardName"] && (lilI1 += "\n【助力奖励】" + ($.getActivityPage.helpReward.rewardName.includes("券") ? "优惠券" : $.getActivityPage.helpReward.rewardName) + "（" + $.getActivityPage.helpReward?.["rewardTotal"] + "份）");
    let IIIi1 = false;
    for (const i1llll of $.getActivityPage.rewards) {
      lilI1 += "\n【活动奖品】邀请" + i1llll.inviteNum + "人 — " + i1llll.rewardName + " — 库存 " + i1llll.rewardStock + "/" + i1llll.rewardTotal + "（" + (0 == i1llll.rewardStatus ? "未获得" : 1 == i1llll.rewardStatus ? "进行中" : 2 == i1llll.rewardStatus ? "待领取" : 3 == i1llll.rewardStatus ? "已获得" : 4 == i1llll.rewardStatus ? "已发完" : "未知状态") + "）";
      if (i1llll.rewardStock <= 0) continue;else {
        IIIi1 = true;
      }
      if (i1llll.rewardStatus === 3) {
        continue;
      } else {
        if (i1llll.rewardType === 2) continue;else {
          if (i1llll.rewardType === 3 && !i1iIii) continue;
        }
      }
      i1llll.rewardStatus !== 2 && ($.helpNums = i1llll.inviteNum);
      $.rewardArray.push(i1llll.stage);
      $.minHelpNums === 0 && ($.minHelpNums = i1llll.inviteNum);
    }
    console.log(lilI1);
    liI1ii.updateContent(liI1ii.content + ("\n" + lilI1));
    if ($.getActivityPage.activityStatus === 2) {
      console.log("\n活动已结束");
      $.message.fix("活动已结束");
      $.runEnd = true;
      $.outFlag = true;
      return;
    } else {
      if ($.rewardArray.length === 0) {
        if (!IIIi1) {
          console.log("\n奖品已全部发完，下次早点来吧~");
          $.message.fix("奖品已发完");
        } else {
          console.log("\n活动奖品不符合偏好设定或已领过，不跑了~");
          $.message.fix("活动奖品不符合偏好设定或已领过");
        }
        $.runEnd = true;
        $.outFlag = true;
        return;
      } else {
        if ($.helpNums === 0) {
          console.log("\n没有需要完成的邀请任务，直接去领奖品~");
          $.runEnd = true;
          return;
        }
      }
    }
    if (!iI1Ill && i1iIii) {
      llIlIl();
      if (!$.addressList?.["addressVO"]) {
        $.outFlag = true;
        return;
      }
      await il1i1("memberBringSaveAddress", $.addressList);
      await $.wait(1000);
    }
    console.log("【当前邀请】" + $.successCount + "人\n【确认邀请】" + $.helpNums + "人");
    $.joinStop = false;
    if (!iI1Iil) {
      iI1Iil = $.UserName;
      for (let l1iIlI = 0; l1iIlI < 3; l1iIlI++) {
        await II11I("memberBringJoinMember", "" + encodeURIComponent(JSON.stringify({
          "code": $.actCode
        })));
        if ($.joinStop) break;
      }
      if (!$.joinStop) {
        console.log("\n加入店铺会员失败");
        $.message.fix("加入店铺会员失败");
        $.runEnd = true;
        $.outFlag = true;
        return;
      }
    } else {
      for (let i1lIiI = 0; i1lIiI < 3; i1lIiI++) {
        await II11I("memberBringJoinMember", encodeURIComponent(JSON.stringify({
          "code": $.actCode,
          "invitePin": iI1Iil
        })) + "&invitePin=" + iI1Iil);
        if ($.joinStop) break;
      }
      $.rewardArray = [];
    }
  } else {
    if ($.skipRun || $.runEnd) return;
    $.joinStop = false;
    for (let ii1l1l = 0; ii1l1l < 3; ii1l1l++) {
      await II11I("memberBringJoinMember", encodeURIComponent(JSON.stringify({
        "code": $.actCode,
        "invitePin": iI1Iil
      })) + "&invitePin=" + iI1Iil);
      if ($.joinStop) break;
    }
    $.successCount >= $.helpNums && (console.log("助力已满"), $.message.insert("助力已满"), $.runEnd = true);
  }
}
function llIlIl() {
  const ii1l1i = process.env.prodevAddress || process.env.WX_ADDRESS || "";
  if (ii1l1i && ii1l1i !== "") {
    let Iiil = [];
    Iiil = ii1l1i.split("|");
    const IIIli = Math.floor(Math.random() * Iiil.length);
    if (Iiil[IIIli] === "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else Iiil = Iiil[IIIli];
    if (process.env.prodevAddress) {
      Iiil = Iiil.split("@");
      if (Iiil.length !== 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (const Iiii of [0, 1, 2, 3, 4, 5]) {
        if (Iiil[Iiii] === "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      Iiil = Iiil.split("@");
      if (Iiil.length !== 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (const llIl11 of [0, 1, 2, 3, 4, 5, 6]) {
        if (Iiil[llIl11] === "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.addressList = {
      "code": $.actCode,
      "addressVO": {
        "userName": Iiil[0],
        "telPhone": Iiil[1],
        "provinceName": Iiil[2],
        "cityName": Iiil[3],
        "countyName": Iiil[4],
        "detailInfo": Iiil[5]
      }
    };
  } else {
    console.log("请先定义环境变量 prodevAddress 用于设置实物类奖品的用户收货地址信息\n变量格式：收件人@手机号@省份@城市@区县@详细地址，需按照顺序依次填写，多个用管道符分开");
  }
}
function II11I(l1llii, liII1) {
  return new Promise(async iIi1I => {
    const IlI1lI = {
      "url": "https://api.m.jd.com/api?client=&clientVersion=&appid=jdchoujiang_h5&t=" + $.now + "&functionId=" + l1llii + "&body=" + liII1 + "&h5st=&openid=-1&uuid=" + $.uuid + "&code=" + $.actCode,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-US;q=1, en-US;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Cookie": i1iIil,
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "User-Agent": $.UA
      }
    };
    $.get(IlI1lI, (iI1lIi, l1lllI, llliIi) => {
      try {
        if (iI1lIi) {
          console.log(String(iI1lIi));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (llliIi) {
            llliIi = JSON.parse(llliIi);
            switch (l1llii) {
              case "memberBringActPage":
                $.getActivityPage = llliIi?.["data"];
                break;
              case "memberBringFirstInvite":
                $.memberBringFirstInvite = llliIi;
                break;
              case "memberBringJoinMember":
                if (llliIi.success) {
                  $.joinStop = true;
                  console.log("加入店铺会员成功");
                  liII1.includes("invitePin") && ($.successCount += 1, console.log("✅ 助力成功，当前已助力人数：" + $.successCount), $.message.fix("助力成功 ✅"));
                } else {
                  if (llliIi.errorMessage) {
                    const ll11ii = llliIi.errorMessage;
                    if (ll11ii === "交易失败") {
                      $.joinStop = true;
                      console.log("加入店铺会员成功");
                      liII1.includes("invitePin") && ($.successCount += 1, console.log("✅ 助力成功，当前已助力人数：" + $.successCount), $.message.fix("助力成功 ✅"));
                    } else {
                      if (ll11ii === "data already exist") {
                        $.joinStop = true;
                        liII1.includes("invitePin") && (console.log("已经是会员了，无法助力好友哦~"), $.message.fix("已是会员无法助力"));
                      } else {
                        console.log(ll11ii);
                        $.message.fix(ll11ii);
                        $.index === 1 && !liII1.includes("invitePin") && ($.runEnd = true);
                        for (let llii1l of ["未开始", "结束", "不存在", "不在"]) {
                          if (ll11ii.includes(llii1l)) {
                            $.runEnd = true;
                            break;
                          }
                        }
                      }
                    }
                    if (ll11ii.indexOf("火爆") > -1) $.joinStop = true;
                  } else console.log(llliIi);
                }
                break;
              case "memberBringInviteReward":
                if (llliIi.success) {
                  console.log("奖品领取成功 ✅");
                  $.message.insert("奖品" + $.prizeStage + "领取成功");
                } else llliIi.success === false ? llliIi.errorMessage ? (console.log("奖品领取失败：" + llliIi.errorMessage), $.message.insert("奖品" + $.prizeStage + "领取失败（" + llliIi.errorMessage + "）")) : (console.log("奖品领取失败：" + llliIi), $.message.insert("奖品" + $.prizeStage + "领取失败")) : console.log(llliIi);
                break;
              default:
                console.log(llliIi);
                break;
            }
          } else console.log("京东服务器返回空数据");
        }
      } catch (ll11il) {
        $.logErr(ll11il, l1lllI);
      } finally {
        iIi1I();
      }
    });
  });
}
async function il1i1(iI1lIl, iiIiII) {
  const iIi11 = {
    "url": "https://api.m.jd.com/api?client=&clientVersion=&appid=jdchoujiang_h5&t=" + $.now + "&functionId=" + iI1lIl + "&body=" + encodeURIComponent(JSON.stringify(iiIiII)) + "&h5st=&openid=-1&uuid=" + $.uuid,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-Hans-US;q=1, en-US;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/json",
      "Cookie": i1iIil,
      "Origin": "https://prodev.m.jd.com",
      "Referer": "https://prodev.m.jd.com/",
      "User-Agent": $.UA
    },
    "body": JSON.stringify(iiIiII)
  };
  return new Promise(llliII => {
    $.post(iIi11, (IlI1l1, liIliI, llii1I) => {
      try {
        if (IlI1l1) $.log(IlI1l1);else {
          if (llii1I) {
            llii1I = JSON.parse(llii1I);
            switch (iI1lIl) {
              case "memberBringSaveAddress":
                !llii1I.success && (console.log("收货地址登记失败"), $.message.insert("收货地址登记失败"));
                break;
              default:
                break;
            }
          }
        }
      } catch (liIlli) {
        $.log(liIlli);
      } finally {
        llliII();
      }
    });
  });
}
function lIIiIi() {
  return new Promise(async IlI1li => {
    const ll11l = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": i1iIil,
        "Host": "plogin.m.jd.com",
        "User-Agent": $.UA
      }
    };
    $.get(ll11l, (lllIi, lil1l, lllIl) => {
      try {
        if (lllIi) {
          console.log(String(lllIi));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (lllIl) try {
            lllIl = JSON.parse(lllIl);
            lllIl.islogin === "0" && (console.log("❌ 账号无效"), $.message.fix("账号无效"), $.skipRun = true);
          } catch {
            console.log("京东服务器返回空数据");
            $.skipRun = true;
          } else {
            console.log("京东服务器返回空数据");
            $.skipRun = true;
          }
        }
      } catch (I1lIIl) {
        $.logErr(I1lIIl, lil1l);
      } finally {
        IlI1li();
      }
    });
  });
}