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
const ii1iI = require("./jdCookie"),
  IIIil = require("./function/jdCommon"),
  IIIii = require("./function/sendJDNotify"),
  iI111i = process.env.jd_prodev_actCode || "";
let I1I1l1 = process.env.jd_prodev_invitePin || "";
const iI111l = process.env.jd_prodev_Notify === "true",
  i1lIii = process.env.jd_prodev_needPhysicalPrize !== "false";
let III11i = "";
const i1lIil = Object.keys(ii1iI).map(IIIli => ii1iI[IIIli]).filter(ii1i1 => ii1i1);
!i1lIil[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!iI111i) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  $.actCode = iI111i;
  $.helpNums = 0;
  $.successCount = 0;
  $.minHelpNums = 0;
  $.addressList = {};
  $.rewardArray = [];
  $.activityUrl = "https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=" + $.actCode;
  IIIii.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let ili1Il = 0; ili1Il < i1lIil.length; ili1Il++) {
    III11i = i1lIil[ili1Il];
    $.index = ili1Il + 1;
    $.nickName = "";
    $.UserName = decodeURIComponent(IIIil.getCookieValue(III11i, "pt_pin"));
    $.UA = IIIil.genUA($.UserName);
    $.uuid = "16" + IIIil.genUuid("xxxxxxxxxxxxxxxxxxxxx", "0123456789");
    $.message = IIIii.create($.index, $.UserName);
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await III11l();
    if ($.runEnd) break;
  }
  if ($.rewardArray.length > 0 && !$.jumpGetPrize) {
    if ($.successCount < $.minHelpNums) return;
    for (let ll11I = 0; ll11I < 1; ll11I++) {
      III11i = i1lIil[ll11I];
      $.index = ll11I + 1;
      $.nickName = "";
      $.UserName = decodeURIComponent(IIIil.getCookieValue(III11i, "pt_pin"));
      $.UA = IIIil.genUA($.UserName);
      $.uuid = "16" + IIIil.genUuid("xxxxxxxxxxxxxxxxxxxxx", "0123456789");
      $.message = IIIii.create($.index, $.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 领取奖品******\n");
      let iIi1I = 0;
      for (const liIIl of $.rewardArray) {
        $.prizeStage += 1;
        await llIl1l("memberBringInviteReward", encodeURIComponent(JSON.stringify({
          "code": $.actCode,
          "stage": liIIl
        })) + "&stage=" + liIIl);
        iIi1I += 1;
        if (iIi1I < 3) await $.wait(5000);
      }
    }
  }
  iI111l && IIIii.getMessage() && (IIIii.updateContent(IIIii.content + ("\n【活动地址】" + $.activityUrl)), await IIIii.push());
})().catch(IilllI => $.logErr(IilllI)).finally(() => $.done());
async function III11l() {
  $.skipRun = false;
  await Iiil();
  if ($.index === 1) {
    if ($.skipRun) {
      if (!I1I1l1) $.runEnd = true;
      return;
    }
    await llIl1l("memberBringActPage", encodeURIComponent(JSON.stringify({
      "code": $.actCode,
      "pageNum": 1,
      "invitePin": ""
    })) + "&invitePin=&_t=" + Date.now());
    if (!$.memberBringActPage) {
      console.log("获取活动信息失败");
      $.message.fix("获取活动信息失败");
      $.runEnd = true;
      return;
    }
    $.memberBringActPage.nickname && $.message.updateUsername();
    $.venderId = $.memberBringActPage.venderId;
    $.successCount = $.memberBringActPage.successCount;
    let ll11iI = "【活动店铺】" + ($.memberBringActPage.shopName || "未知") + "\n【开始时间】" + $.time("yyyy-MM-dd HH:mm:ss", $.memberBringActPage.beginTime) + "\n【结束时间】" + $.time("yyyy-MM-dd HH:mm:ss", $.memberBringActPage.endTime);
    $.memberBringActPage?.["helpReward"]?.["rewardName"] && (ll11iI += "\n【助力奖励】" + ($.memberBringActPage.helpReward.rewardName.includes("券") ? "优惠券" : $.memberBringActPage.helpReward.rewardName) + "（" + $.memberBringActPage.helpReward?.["rewardTotal"] + "份）");
    let l1i1I = false;
    for (const IIIIli of $.memberBringActPage.rewards) {
      ll11iI += "\n【活动奖品】邀请" + IIIIli.inviteNum + "人 — " + IIIIli.rewardName + " — " + IIIIli.rewardStock + "/" + IIIIli.rewardTotal + "（" + (0 == IIIIli.rewardStatus ? "未获得" : 1 == IIIIli.rewardStatus ? "进行中" : 2 == IIIIli.rewardStatus ? "待领取" : 3 == IIIIli.rewardStatus ? "已获得" : 4 == IIIIli.rewardStatus ? "已发完" : "未知状态") + "）";
      if (IIIIli.rewardStock <= 0) {
        continue;
      } else l1i1I = true;
      if (IIIIli.rewardStatus === 3 && !I1I1l1) continue;else {
        if (IIIIli.rewardType === 2) continue;else {
          if (IIIIli.rewardType === 3 && !i1lIii) continue;else {
            $.rewardArray.push(IIIIli.stage);
            $.minHelpNums === 0 && ($.minHelpNums = IIIIli.inviteNum);
          }
        }
      }
      IIIIli.rewardStatus !== 2 ? $.helpNums = IIIIli.inviteNum : ($.hasNeedClaimedPrize = TextTrackCueList, I1I1l1 && ($.helpNums = IIIIli.inviteNum));
    }
    console.log(ll11iI);
    IIIii.updateContent(IIIii.content + ("\n" + ll11iI));
    if ($.memberBringActPage.activityStatus === 2) {
      console.log("\n活动已结束");
      $.message.fix("活动已结束");
      $.runEnd = true;
      $.jumpGetPrize = true;
      return;
    } else {
      if ($.memberBringActPage.activityStatus === 0) {
        console.log("\n活动尚未开始");
        $.message.fix("活动尚未开始");
        $.runEnd = true;
        $.jumpGetPrize = true;
        return;
      } else {
        if (!l1i1I) {
          console.log("\n奖品已全部发完，下次早点来吧~");
          $.message.fix("奖品已发完");
          $.runEnd = true;
          $.jumpGetPrize = true;
          return;
        }
      }
    }
    if ($.rewardArray.length === 0) {
      !I1I1l1 ? (console.log("\n活动奖品不符合偏好设定或已领过，不跑了~"), $.message.fix("活动奖品不符合偏好设定或已领过")) : (console.log("\n活动奖品不符合偏好设定，不跑了~"), $.message.fix("活动奖品不符合偏好设定"));
      $.runEnd = true;
      $.jumpGetPrize = true;
      return;
    }
    if (!I1I1l1) {
      await llIl1l("memberBringFirstInvite", encodeURIComponent(JSON.stringify({
        "code": $.actCode,
        "fp": "",
        "eid": ""
      })) + "&fp=&eid=");
      if (!$.memberBringFirstInvite.success) {
        console.log("\n" + $.memberBringFirstInvite.errorMessage);
        $.message.fix($.memberBringFirstInvite.errorMessage);
        $.runEnd = true;
        $.jumpGetPrize = true;
        return;
      }
      const illlil = !!$.memberBringActPage?.["address"]?.["userName"];
      if (!illlil && i1lIii) {
        llIl1i();
        if (!$.addressList?.["addressVO"]) {
          $.jumpGetPrize = true;
          return;
        }
        await IiiII("memberBringSaveAddress", $.addressList);
        await $.wait(1000);
      }
      if ($.helpNums === 0) {
        console.log("【当前邀请】" + $.successCount + "人");
        console.log("\n没有需要完成的邀请任务，直接去领奖品~");
        $.runEnd = true;
        return;
      } else console.log("【当前邀请】" + $.successCount + "人\n【确认邀请】" + $.helpNums + "人");
    } else $.hasNeedClaimedPrize && (console.log("温馨提示：账号1有待领取的奖品，请单独运行脚本领取哦~"), $.message.insert("账号有待领取的奖品"));
    $.joinMemberStop = false;
    if (!I1I1l1) {
      I1I1l1 = $.UserName;
      for (let IIIIlI = 0; IIIIlI < 3; IIIIlI++) {
        await llIl1l("memberBringJoinMember", "" + encodeURIComponent(JSON.stringify({
          "code": $.actCode
        })));
        if ($.joinMemberStop) break;
      }
      if (!$.joinMemberStop) {
        console.log("\n加入店铺会员失败");
        $.message.fix("加入店铺会员失败");
        $.runEnd = true;
        $.jumpGetPrize = true;
        return;
      }
    } else {
      for (let l1i11l = 0; l1i11l < 3; l1i11l++) {
        await llIl1l("memberBringJoinMember", encodeURIComponent(JSON.stringify({
          "code": $.actCode,
          "invitePin": I1I1l1
        })) + "&invitePin=" + I1I1l1);
        if ($.joinMemberStop) break;
      }
      $.jumpGetPrize = true;
      $.successCount = 0;
    }
  } else {
    if ($.skipRun || $.runEnd) return;
    $.joinMemberStop = false;
    for (let lllII = 0; lllII < 3; lllII++) {
      await llIl1l("memberBringJoinMember", encodeURIComponent(JSON.stringify({
        "code": $.actCode,
        "invitePin": I1I1l1
      })) + "&invitePin=" + I1I1l1);
      if ($.joinMemberStop) break;
    }
    $.successCount >= $.helpNums && (console.log("助力已满"), $.message.insert("助力已满"), $.runEnd = true);
  }
}
function llIl1i() {
  const l11iI1 = process.env.prodevAddress || process.env.WX_ADDRESS || "";
  if (l11iI1 && l11iI1 !== "") {
    let IIIIl1 = [];
    IIIIl1 = l11iI1.split("|");
    const liiilI = Math.floor(Math.random() * IIIIl1.length);
    if (IIIIl1[liiilI] === "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else IIIIl1 = IIIIl1[liiilI];
    if (process.env.prodevAddress) {
      IIIIl1 = IIIIl1.split("@");
      if (IIIIl1.length !== 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (const liiii1 of [0, 1, 2, 3, 4, 5]) {
        if (IIIIl1[liiii1] === "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      IIIIl1 = IIIIl1.split("@");
      if (IIIIl1.length !== 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (const IIiiIi of [0, 1, 2, 3, 4, 5, 6]) {
        if (IIIIl1[IIiiIi] === "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.addressList = {
      "code": $.actCode,
      "addressVO": {
        "userName": IIIIl1[0],
        "telPhone": IIIIl1[1],
        "provinceName": IIIIl1[2],
        "cityName": IIIIl1[3],
        "countyName": IIIIl1[4],
        "detailInfo": IIIIl1[5]
      }
    };
  } else console.log("请先定义环境变量 prodevAddress 用于设置实物类奖品的用户收货地址信息\n变量格式：收件人@手机号@省份@城市@区县@详细地址，需按照顺序依次填写，多个用管道符分开");
}
function llIl1l(l11iIi, ll11li) {
  return new Promise(async illliI => {
    const i11iIl = {
      "url": "https://api.m.jd.com/api?client=&clientVersion=&appid=jdchoujiang_h5&t=" + $.now + "&functionId=" + l11iIi + "&body=" + ll11li + "&h5st=&openid=-1&uuid=" + $.uuid + "&code=" + $.actCode,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-US;q=1, en-US;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Cookie": III11i,
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "User-Agent": $.UA
      }
    };
    $.get(i11iIl, (II1I, lI1111, Ilil1) => {
      try {
        if (II1I) {
          console.log(String(II1I));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (Ilil1) {
            Ilil1 = JSON.parse(Ilil1);
            switch (l11iIi) {
              case "memberBringActPage":
                $.memberBringActPage = Ilil1?.["data"];
                break;
              case "memberBringFirstInvite":
                $.memberBringFirstInvite = Ilil1;
                break;
              case "memberBringJoinMember":
                if (Ilil1.success) {
                  $.joinMemberStop = true;
                  console.log("加入店铺会员成功");
                  ll11li.includes("invitePin") && ($.successCount += 1, console.log("✅ 助力成功，当前已助力人数：" + $.successCount), $.message.fix("助力成功 ✅"));
                } else {
                  if (Ilil1.errorMessage) {
                    const i1I1I = Ilil1.errorMessage;
                    if (i1I1I === "交易失败") {
                      $.joinMemberStop = true;
                      console.log("加入店铺会员成功");
                      ll11li.includes("invitePin") && ($.successCount += 1, console.log("✅ 助力成功，当前已助力人数：" + $.successCount), $.message.fix("助力成功 ✅"));
                    } else {
                      if (i1I1I === "data already exist") {
                        $.joinMemberStop = true;
                        ll11li.includes("invitePin") && (console.log("已经是会员了，无法助力好友哦~"), $.message.fix("已是会员无法助力"));
                      } else {
                        console.log(i1I1I);
                        $.message.fix(i1I1I);
                        $.index === 1 && !ll11li.includes("invitePin") && ($.runEnd = true);
                        for (let IIiiI1 of ["未开始", "结束", "不存在", "不在"]) {
                          if (i1I1I.includes(IIiiI1)) {
                            $.runEnd = true;
                            break;
                          }
                        }
                      }
                    }
                    if (i1I1I.indexOf("火爆") > -1) $.joinMemberStop = true;
                  } else {
                    console.log(Ilil1);
                  }
                }
                break;
              case "memberBringInviteReward":
                if (Ilil1.success) {
                  console.log("奖品领取成功 ✅");
                  $.message.insert("奖品" + $.prizeStage + "领取成功");
                } else Ilil1.success === false ? Ilil1.errorMessage ? (console.log("奖品领取失败：" + Ilil1.errorMessage), $.message.insert("奖品" + $.prizeStage + "领取失败（" + Ilil1.errorMessage + "）")) : (console.log("奖品领取失败：" + Ilil1), $.message.insert("奖品" + $.prizeStage + "领取失败")) : console.log(Ilil1);
                break;
              default:
                console.log(Ilil1);
                break;
            }
          } else {
            console.log("京东服务器返回空数据");
          }
        }
      } catch (I1ll1l) {
        $.logErr(I1ll1l, lI1111);
      } finally {
        illliI();
      }
    });
  });
}
async function IiiII(lI1Ii1, i1I11) {
  const i1I1l = {
    "url": "https://api.m.jd.com/api?client=&clientVersion=&appid=jdchoujiang_h5&t=" + $.now + "&functionId=" + lI1Ii1 + "&body=" + encodeURIComponent(JSON.stringify(i1I11)) + "&h5st=&openid=-1&uuid=" + $.uuid,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-Hans-US;q=1, en-US;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/json",
      "Cookie": III11i,
      "Origin": "https://prodev.m.jd.com",
      "Referer": "https://prodev.m.jd.com/",
      "User-Agent": $.UA
    },
    "body": JSON.stringify(i1I11)
  };
  return new Promise(i11iI1 => {
    $.post(i1I1l, (I1ll11, lI1lIi, Iii1Ii) => {
      try {
        if (I1ll11) $.log(I1ll11);else {
          if (Iii1Ii) {
            Iii1Ii = JSON.parse(Iii1Ii);
            switch (lI1Ii1) {
              case "memberBringSaveAddress":
                !Iii1Ii.success && (console.log("收货地址登记失败"), $.message.insert("收货地址登记失败"));
                break;
              default:
                break;
            }
          }
        }
      } catch (IIIIiI) {
        $.log(IIIIiI);
      } finally {
        i11iI1();
      }
    });
  });
}
function Iiil() {
  return new Promise(async IIlill => {
    const l1lI1I = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": III11i,
        "Host": "plogin.m.jd.com",
        "User-Agent": $.UA
      }
    };
    $.get(l1lI1I, (ll1llI, i11lIl, l1lI11) => {
      try {
        if (ll1llI) {
          console.log(String(ll1llI));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (l1lI11) try {
            l1lI11 = JSON.parse(l1lI11);
            if (l1lI11.islogin === "0") {
              console.log("❌ 账号无效");
              $.message.fix("账号无效");
              if (!I1I1l1) $.skipRun = true;
            }
          } catch {
            console.log("京东服务器返回空数据");
            if (!I1I1l1) $.skipRun = true;
          } else {
            console.log("京东服务器返回空数据");
            if (!I1I1l1) $.skipRun = true;
          }
        }
      } catch (lIilli) {
        $.logErr(lIilli, i11lIl);
      } finally {
        IIlill();
      }
    });
  });
}