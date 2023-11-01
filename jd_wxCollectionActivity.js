/*
活动名称：加购有礼 · 超级无线
活动链接：https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity?activityId=<活动id>
         https://cjhy-isv.isvjcloud.com/wxCollectionActivity/activity?activityId=<活动id>
         https://lzkj-isv.isvjd.com/wxCollectionActivity/activity2/activity?activityId=<活动id>
         https://cjhy-isv.isvjd.com/wxCollectionActivity/activity2/activity?activityId=<活动id>
环境变量：
jd_wxCollectionActivity_activityUrl // 活动链接
jd_wxCollectionActivity_openCard  // 默认不开卡
jd_wxCollectionActivity_blacklist 黑名单 用&隔开 pin值
JD_LZ_OPEN // 是否开启LZ活动运行，默认运行
JD_CJ_OPEN // 是否开启CJ活动运行，默认运行
				 
需要安装依赖  ds
支持缓存token   需要在容器安装依赖：
npm install -g ds  （或者直接在青龙面板-依赖管理-添加依赖-类型 nodejs -名称：ds  安装即可使用）

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#加购有礼通用-加密
1 1 1 1 * jd_wxCollectionActivity.js, tag=加购有礼通用-加密, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('加购有礼（超级无线/超级会员）')

const l1ililIl = $.isNode() ? require("./jdCookie") : "",
  l1lI1iil = $.isNode() ? require("./sendNotify") : "",
  IIIiIi1i = require("./function/krgetToken"),
  l1Il1Il = require("./function/krh5st"),
  I11lIIII = require("./function/jdCommon"),
  i1I1lI1 = require("./function/krwxSavePrize");
let Illl1ll = process.env.jd_wxCollectionActivity_activityUrl ? process.env.jd_wxCollectionActivity_activityUrl : "",
  I11i1IlI = process.env.jd_wxCollectionActivity_openCard === "true" ? true : false,
  i111l111 = {},
  i11II = "",
  ili1l1li = 40,
  IIiiIliI = [],
  ilIl1ll = "";
messageTitle = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(l1ililIl).forEach(l1liilI => {
    IIiiIliI.push(l1ililIl[l1liilI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  IIiiIliI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(IlIi1II => IlIi1II.cookie)].filter(iIl11iii => !!iIl11iii);
}
let li11l11l = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  Il1ii1lI = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  IliIIIlI = "",
  iIi11I11 = "";
$.whitelist = process.env.jd_wxCollectionActivity_whitelist || IliIIIlI;
$.blacklist = process.env.jd_wxCollectionActivity_blacklist || iIi11I11;
IiIii1ll();
l11il1I();
if (Illl1ll) {
  $.activityId = IIIIiI("" + Illl1ll, "activityId");
  if (Illl1ll.includes("lzkj")) {
    if (li11l11l === "false") {
      console.log("\n❌  已设置全局关闭LZ相关活动\n");
    } else {
      $.domain = Illl1ll.match(/https?:\/\/([^/]+)/)[1];
    }
  } else {
    if (Illl1ll.includes("cjhy")) {
      if (Il1ii1lI === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
      } else {
        $.domain = Illl1ll.match(/https?:\/\/([^/]+)/)[1];
      }
    }
  }
  $.domain_mode = null;
  $.errMsg = null;
  if ($.domain.includes("cjhy")) {
    $.domain_mode = "cjhy";
  }
  $.domain.includes("lzkj") && ($.domain_mode = "lzkj", $.domain = "lzkj-isv.isvjd.com");
  if ($.domain_mode == null) {
    console.log("请填写正确的活动链接");
  }
} else {
  console.log("请填写活动链接");
}
let II1i1Il = "https://" + $.domain;
!(async () => {
  if (!$.activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：" + Illl1ll);
  if (!IIiiIliI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityEnd = false;
  $.venderId = null;
  $.outFlag = false;
  $.hasPrize = false;
  for (let li1i111l = 0; li1i111l < IIiiIliI.length; li1i111l++) {
    if (IIiiIliI[li1i111l]) {
      ilIl1ll = IIiiIliI[li1i111l];
      originCookie = IIiiIliI[li1i111l];
      $.UserName = decodeURIComponent(ilIl1ll.match(/pt_pin=(.+?);/) && ilIl1ll.match(/pt_pin=(.+?);/)[1]);
      $.index = li1i111l + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await l1lI1iil.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = I11lIIII.genUA($.UserName);
      await iliiiIIl();
      $.domain_mode == "cjhy" ? await $.wait(2000) : await $.wait(1000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
})().catch(il1lIiIi => {
  $.log("", " " + $.name + ", 失败! 原因: " + il1lIiIi + "!", "");
}).finally(() => {
  $.done();
});
async function iliiiIIl() {
  $.newnums = 0;
  $.sid = "";
  $.Token = "";
  $.secretPin = "";
  $.hisPin = "";
  $.getCookieReuslt = false;
  $.needOpenCard = false;
  $.drawStop = false;
  $.getPrized = false;
  $.isOpenCard = false;
  switch ($.domain_mode) {
    case "lzkj":
      await ll1IiIi();
      break;
    case "cjhy":
      await lIIll1iI();
      break;
  }
  if (!$.getCookieReuslt && $.domain_mode == "cjhy") {
    for (let Ii1i1l1 = 0; Ii1i1l1 < ili1l1li; Ii1i1l1++) {
      await lIIll1iI();
      await $.wait(1000);
      if ($.getCookieReuslt) {
        break;
      }
    }
  }
  if ($.activityEnd || $.outFlag || !$.getCookieReuslt) {
    return;
  }
  await $.wait(500);
  if ($.index == 1) {
    await ililII1I("/customer/getSimpleActInfoVo", "activityId=" + $.activityId);
    if ($.activityEnd) {
      console.log("活动不存在或已经结束！");
      return;
    }
    if (!$.venderId) {
      $.activityEnd = true;
      console.log("getSimpleActInfoVo 未能获取店铺信息");
      return;
    }
  }
  $.Token = await IIIiIi1i(originCookie, II1i1Il);
  if ($.Token) {
    await IlIi1ii();
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    switch ($.domain_mode) {
      case "lzkj":
        $.FormatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.FormatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
    switch ($.domain_mode) {
      case "lzkj":
        await ilIllI1I();
        break;
      case "cjhy":
        await IiIlI1I1();
        break;
    }
    $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
  } else {
    console.log("获取[token]失败！");
    return;
  }
  if (I11i1IlI) {
    switch ($.domain_mode) {
      case "lzkj":
        await I1iI1ii1("/wxCommonInfo/getActMemberInfo", "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin);
        break;
      case "cjhy":
        await I1iI1ii1("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
        break;
    }
    if ($.activityEnd || $.outFlag) {
      return;
    }
    if (!$.isOpenCard) {
      $.errorJoinShop = "";
      $.joinVenderId = $.venderId;
      for (let IiIIlIIl = 0; IiIIlIIl < Array(5).length; IiIIlIIl++) {
        if (IiIIlIIl > 0) {
          console.log("第" + IiIIlIIl + "次 重新开卡");
        }
        await IlliIii1();
        await $.wait(500);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("❌ 开卡失败，重新执行脚本");
    }
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  }
  var llI1l1I1 = "";
  llI1l1I1 = await iIIiiI1l("/wxCollectionActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
  $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  if (llI1l1I1) {
    if (llI1l1I1.result && llI1l1I1.data) {
      let lIll1Iii = llI1l1I1.data.cpvos,
        IiiIIIil = llI1l1I1.data.needCollectionSize || 1,
        IlliiI11 = llI1l1I1.data.oneKeyAddCart * 1 === 1,
        Iil1i1il = llI1l1I1.data.hasCollectionSize;
      if ($.index == 1) {
        console.log("❖ 活动奖品：" + llI1l1I1.data.drawInfo.name + "\n");
        if (llI1l1I1.data.drawInfo.name.includes("优惠券")) {
          console.log("垃圾活动不跑了~");
          $.activityEnd = true;
          return;
        }
        let lilIiIli = new Date().valueOf(),
          ii1Ii1l = llI1l1I1.data.startTime,
          l1lilii = llI1l1I1.data.endTime;
        if (lilIiIli <= ii1Ii1l) {
          console.log("活动尚未开始，晚点再来吧~");
          $.activityEnd = true;
          return;
        } else {
          if (lilIiIli >= l1lilii) {
            console.log("活动已经结束~");
            $.activityEnd = true;
            return;
          }
        }
      }
      if (llI1l1I1.needFollow && !llI1l1I1.hasFollow) {
        let IIili11i = await Iiil1lll("/wxActionCommon/followShop", "userId=" + $.venderId + "&buyerNick=" + $.FormatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType);
        if (!IIili11i.result) {
          console.log(IIili11i.errorMessage);
          return;
        }
        if ($.needOpenCard) {
          console.log("活动仅限店铺会员参与哦~");
          return;
        }
      }
      if (Iil1i1il < IiiIIIil) {
        let IilI1lIi = [];
        liIIil1l: for (let IiiIli11 of lIll1Iii) {
          if (IlliiI11) {
            IilI1lIi.push(IiiIli11.skuId);
            continue;
          }
          for (let IlIiIlli = 0; IlIiIlli < 10; IlIiIlli++) {
            try {
              let liii111i = "";
              switch ($.activityType) {
                case 5:
                  liii111i = await lI11li1i("/wxCollectionActivity/collection", "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&productId=" + IiiIli11.skuId);
                  break;
                default:
                  liii111i = await lI11li1i("/wxCollectionActivity/addCart", "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&productId=" + IiiIli11.skuId);
                  break;
              }
              if (liii111i) {
                if (liii111i.result) {
                  Iil1i1il = liii111i.data.hasCollectionSize || liii111i.data.hasAddCartSize;
                  if (Iil1i1il >= IiiIIIil) {
                    break liIIil1l;
                  }
                  break;
                } else {
                  let ilIIi1i1 = liii111i.errorMessage;
                  if ($.domain_mode == "cjhy" && ilIIi1i1.includes("擦肩")) {
                    return;
                  }
                  if (!["异常", "购物车"].some(ilii1i1i => ilIIi1i1.includes(ilii1i1i))) {
                    console.log(String(ilIIi1i1));
                  }
                  for (let iIi111ii of ["未开始", "结束", "来晚了"]) {
                    if (ilIIi1i1.includes(iIi111ii)) {
                      $.activityEnd = true;
                      break liIIil1l;
                    }
                  }
                  if (ilIIi1i1.includes("会员")) {
                    $.needOpenCard = true;
                    break liIIil1l;
                  }
                }
              }
              if ($.activityEnd || $.outFlag || $.needOpenCard) {
                return;
              }
            } catch (Ii1iiiIi) {
              console.log(Ii1iiiIi);
            } finally {
              $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
            }
          }
        }
        if (IlliiI11) {
          let llIilIlI = await lI11li1i("/wxCollectionActivity/oneKeyAddCart", "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&productIds=" + encodeURIComponent(JSON.stringify(IilI1lIi)));
          if (llIilIlI.result && llIilIlI.data) {
            Iil1i1il = llIilIlI.data.hasCollectionSize || llIilIlI.data.hasAddCartSize;
          } else {
            let lIi11llI = llIilIlI.errorMessage;
            if ($.domain_mode == "cjhy" && lIi11llI.includes("擦肩")) {
              return;
            }
            if (!lIi11llI.includes("异常")) {
              console.log(String(lIi11llI));
            }
            for (let i11illl1 of ["未开始", "结束", "来晚了"]) {
              if (lIi11llI.includes(i11illl1)) {
                $.activityEnd = true;
                break;
              }
            }
            if (lIi11llI.includes("会员")) {
              $.needOpenCard = true;
            }
          }
          $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
        }
        if ($.activityEnd || $.outFlag || $.needOpenCard) {
          return;
        }
        if (Iil1i1il < IiiIIIil && !$.activityEnd && !$.needOpenCard) {
          console.log("未能完成加购任务，可能商品暂时存在异常！");
          return;
        }
      } else {
        let IIlIilII = await i1liliI1("/wxDrawActivity/drawMyOkList", "activityId=" + $.activityId + "&type=" + $.activityType + "&pin=" + $.FormatPin);
        if (IIlIilII.result) {
          if (IIlIilII.data.length > 0) {
            console.log("已经参与过了哟~");
            return;
          }
        }
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      }
      ili1l1li = $.hasPrize ? 80 : ili1l1li;
      for (let I1ilIiil = 0; I1ilIiil < ili1l1li; I1ilIiil++) {
        $.errMsg = "";
        await IliI1l1l("/wxCollectionActivity/getPrize", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
        if ($.getPrized || $.activityEnd || $.needOpenCard) {
          break;
        }
        if (I1ilIiil == ili1l1li - 1) {
          console.log("🚫 经过多次尝试未能领取奖励，奖品可能已发完或中奖概率较低！");
          return;
        }
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      }
    } else {
      if (llI1l1I1.errorMessage) {
        console.log(llI1l1I1.errorMessage);
        return;
      } else {
        console.log("活动可能已经结束！");
        $.activityEnd = true;
        return;
      }
    }
  } else {
    console.log("未能获取到活动信息！");
    return;
  }
}
async function iIIiiI1l(iI11i1iI, liIIlIii) {
  return new Promise(i1IlIlll => {
    $.post(illlIIil(iI11i1iI, liIIlIii), async (IIl1iili, i1IIii1I, i1iii1II) => {
      try {
        if (IIl1iili) {
          console.log(String(IIl1iili));
          console.log("getActivityContent 请求失败，请检查网路重试");
        } else {
          iII11Ill(i1iii1II) && (i1iii1II = JSON.parse(i1iii1II), i1IIii1I.status == 200 && illil1i(i1IIii1I), i1IlIlll(i1iii1II));
        }
      } catch (I1IIlIiI) {
        $.logErr(I1IIlIiI, i1IIii1I);
      } finally {
        i1IlIlll();
      }
    });
  });
}
async function Iiil1lll(i1iIl1II, I11iilI) {
  return new Promise(lliiII1i => {
    $.post(illlIIil(i1iIl1II, I11iilI), async (IiI1iI1i, ililiiIl, i1lilI) => {
      try {
        if (IiI1iI1i) {
          console.log(String(IiI1iI1i));
          console.log("followShop 请求失败，请检查网路重试");
        } else {
          if (iII11Ill(i1lilI)) {
            i1lilI = JSON.parse(i1lilI);
            errorMessage = i1lilI.errorMessage;
            errorMessage.indexOf("会员") > -1 && ($.needOpenCard = true);
            ililiiIl.status == 200 && illil1i(ililiiIl);
            lliiII1i(i1lilI);
          }
        }
      } catch (ilii1ll) {
        $.logErr(ilii1ll, ililiiIl);
      } finally {
        lliiII1i();
      }
    });
  });
}
async function i1liliI1(i11IIIl1, l1i1lii) {
  return new Promise(l1Ii1iI => {
    $.post(illlIIil(i11IIIl1, l1i1lii), async (i1i1iiI, i1I1llI, l11ilili) => {
      try {
        i1i1iiI ? (console.log(String(i1i1iiI)), console.log("getDrawList 请求失败，请检查网路重试")) : iII11Ill(l11ilili) && (l11ilili = JSON.parse(l11ilili), i1I1llI.status == 200 && illil1i(i1I1llI), l1Ii1iI(l11ilili));
      } catch (I1liIi11) {
        $.logErr(I1liIi11, i1I1llI);
      } finally {
        l1Ii1iI();
      }
    });
  });
}
async function lI11li1i(Ii11l1ii, iIIIl111) {
  return new Promise(lIl1II1i => {
    $.post(illlIIil(Ii11l1ii, iIIIl111), async (I1IlIII1, i1I1iIl, IIl1l1I1) => {
      try {
        if (I1IlIII1) {
          console.log(String(I1IlIII1));
          console.log("addCart 请求失败，请检查网路重试");
          i1I1iIl.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
        } else {
          if (iII11Ill(IIl1l1I1)) {
            IIl1l1I1 = JSON.parse(IIl1l1I1);
            errorMessage = IIl1l1I1.errorMessage;
            errorMessage.indexOf("会员") > -1 && ($.needOpenCard = true);
            i1I1iIl.status == 200 && illil1i(i1I1iIl);
            lIl1II1i(IIl1l1I1);
          }
        }
      } catch (Iliii) {
        $.logErr(Iliii, i1I1iIl);
      } finally {
        lIl1II1i();
      }
    });
  });
}
async function llliIili() {
  return new Promise(i111I11 => {
    $.post(illlIIil("/wxDrawActivity/shopInfo", "activityId=" + $.activityId), async (illIi1I, IIIliIII, I1llIl1l) => {
      try {
        illIi1I ? (console.log(String(illIi1I)), console.log("getShopInfo 请求失败，请检查网路重试")) : iII11Ill(I1llIl1l) && (I1llIl1l = JSON.parse(I1llIl1l), I1llIl1l.result && I1llIl1l.data && ($.shopName = I1llIl1l.data.shopName), IIIliIII.status == 200 && illil1i(IIIliIII));
      } catch (IIIiIl) {
        $.logErr(IIIiIl, IIIliIII);
      } finally {
        i111I11();
      }
    });
  });
}
async function IliI1l1l(iliI1I1I, l1IIll1l) {
  return new Promise(lli1Ii1 => {
    $.post(illlIIil(iliI1I1I, l1IIll1l), async (ll1iIl, i1Ilil1l, IIii1II1) => {
      try {
        if (ll1iIl) {
          console.log(String(ll1iIl));
          console.log("start 请求失败，请检查网路重试");
        } else {
          if (IIii1II1) {
            IIii1II1 = JSON.parse(IIii1II1);
            if (IIii1II1.result && IIii1II1.data) {
              let lI1l1i = IIii1II1.data.drawInfo;
              if (lI1l1i) {
                switch (lI1l1i.type) {
                  case 6:
                    console.log("🎉 " + lI1l1i.name + " 🐶");
                    break;
                  case 7:
                    const liii1lll = IIii1II1.data.addressId;
                    prizeName = lI1l1i.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    console.log("参考价值：" + lI1l1i.priceInfo + "（元）");
                    if (lI1l1i.showImage) {
                      console.log("预览图片：" + lI1l1i.showImage);
                    }
                    let IIi1Ill1 = await i1I1lI1(II1i1Il, ilIl1ll, $.UA, $.activityId, $.activityType, $.venderId, $.secretPin, prizeName, liii1lll);
                    if (IIi1Ill1) {
                      $.isNode() && (await l1lI1iil.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，已成功自动登记收货地址\n\n" + Illl1ll));
                    } else {
                      $.isNode() && (await l1lI1iil.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + Illl1ll));
                    }
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + lI1l1i.name + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + lI1l1i.name + " 🎁");
                    break;
                  case 16:
                    console.log("🎉 " + lI1l1i.priceInfo + " 🧧");
                    break;
                  default:
                    if (lI1l1i.name.includes("券")) {
                      console.log("🗑️ 优惠券");
                    } else {
                      console.log("获得：" + lI1l1i.name);
                    }
                    break;
                }
                $.getPrized = true;
                $.hasPrize = true;
              }
            } else {
              if (IIii1II1.errorMessage) {
                let l1i1Iill = IIii1II1.errorMessage;
                $.errMsg = l1i1Iill;
                for (let IIi111il of ["来晚了", "京豆计划", "奖品发送失败", "发放完", "发完", "领完", "抢光", "全部被领取", "余额不足", "最大次数"]) {
                  if (l1i1Iill.includes(IIi111il)) {
                    $.activityEnd = true;
                    break;
                  }
                }
                l1i1Iill.includes("领过") && (console.log("已经参与过了哦~"), $.getPrized = true);
                l1i1Iill.includes("非法操作") && (console.log("可能已经参与过了，接口返回非法操作！"), $.getPrized = true);
                for (let i1llIII of ["未开始", "结束", "不存在", "不在"]) {
                  if (l1i1Iill.includes(i1llIII)) {
                    $.activityEnd = true;
                    break;
                  }
                }
                if (l1i1Iill.includes("会员")) {
                  $.needOpenCard = true;
                }
                !$.getPrized && !l1i1Iill.includes("擦肩") && !l1i1Iill.includes("火爆") && console.log(l1i1Iill || "");
              } else {
                console.log(JSON.stringify(IIii1II1));
              }
            }
          }
          i1Ilil1l.status == 200 && illil1i(i1Ilil1l);
        }
      } catch (Iiili1) {
        $.logErr(Iiili1, i1Ilil1l);
      } finally {
        lli1Ii1();
      }
    });
  });
}
async function I1iI1ii1(iI1ii1Il, iII1llIi) {
  return new Promise(IiIII11l => {
    $.post(illlIIil(iI1ii1Il, iII1llIi), async (IliiIlIl, IIiiIll1, lI1l1Il1) => {
      try {
        if (IliiIlIl) {
          console.log(String(IliiIlIl));
          console.log("getOpenCardStatus API请求失败，请检查网路重试");
        } else {
          if (iII11Ill(lI1l1Il1)) {
            lI1l1Il1 = JSON.parse(lI1l1Il1);
            if (lI1l1Il1.result && lI1l1Il1.data) {
              switch ($.domain_mode) {
                case "lzkj":
                  $.isOpenCard = lI1l1Il1.data.openCard;
                  break;
                case "cjhy":
                  $.isOpenCard = lI1l1Il1.data.openedCard;
                  break;
              }
            } else {
              if (lI1l1Il1.errorMessage) {
                console.log(lI1l1Il1.errorMessage || "");
                for (let l11i11I of ["未开始", "结束", "不存在", "不在"]) {
                  if (lI1l1Il1.errorMessage.includes(l11i11I)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              } else {
                console.log(lI1l1Il1);
              }
            }
          }
          IIiiIll1.status == 200 && illil1i(IIiiIll1);
        }
      } catch (ll11I1Ii) {
        $.logErr(ll11I1Ii, IIiiIll1);
      } finally {
        IiIII11l();
      }
    });
  });
}
async function ililII1I() {
  return new Promise(iiIiill => {
    $.post(illlIIil("/customer/getSimpleActInfoVo", "activityId=" + $.activityId), async (Il1i1lI1, l11i1lli, lIilI1i) => {
      try {
        if (Il1i1lI1) {
          console.log(String(Il1i1lI1));
          console.log("getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {
          if (lIilI1i && iII11Ill(lIilI1i)) {
            lIilI1i = JSON.parse(lIilI1i);
            if (lIilI1i.data) {
              $.shopId = lIilI1i.data.shopId;
              $.venderId = lIilI1i.data.venderId;
              $.activityType = lIilI1i.data.activityType;
            } else {
              !lIilI1i.data ? $.activityEnd = true : console.log("异常：" + JSON.stringify(lIilI1i));
            }
          }
          l11i1lli.status == 200 && illil1i(l11i1lli);
        }
      } catch (IIli1I1I) {
        $.logErr(IIli1I1I, l11i1lli);
      } finally {
        iiIiill();
      }
    });
  });
}
async function ll1IiIi() {
  return new Promise(iIlliII => {
    let III1iI1l = {
      url: "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: Illl1ll,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(III1iI1l, async (IIIlil1, iiiIIII, i1IliIii) => {
      try {
        IIIlil1 ? (iiiIIII && typeof iiiIIII.statusCode != "undefined" && iiiIIII.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true), console.log(String(IIIlil1)), console.log("wxCommonInfo API请求失败，请检查网路重试")) : (iiiIIII.status == 200 && illil1i(iiiIIII), $.getCookieReuslt = true);
      } catch (iiiil1II) {
        $.logErr(iiiil1II, iiiIIII);
      } finally {
        iIlliII();
      }
    });
  });
}
async function lIIll1iI() {
  return new Promise(lIIIli => {
    let IIiilI1i = {
      url: Illl1ll,
      headers: {
        "User-Agent": $.UA
      }
    };
    $.get(IIiilI1i, async (i1l11ilI, ll1ilIII, iiliIIi) => {
      try {
        if (i1l11ilI) {
          ll1ilIII && typeof ll1ilIII.statusCode != "undefined" && ll1ilIII.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
          console.log(String(i1l11ilI));
          console.log("getFirstCK API请求失败，请检查网路重试");
        } else {
          let i1Il1ii = iiliIIi.match(/(活动已经结束)/) && iiliIIi.match(/(活动已经结束)/)[1] || "";
          i1Il1ii && ($.activityEnd = true, console.log("活动已结束"));
          ll1ilIII.status == 200 && illil1i(ll1ilIII);
          $.getCookieReuslt = true;
        }
      } catch (l1IiiIlI) {
        $.logErr(l1IiiIlI, ll1ilIII);
      } finally {
        lIIIli();
      }
    });
  });
}
async function IlIi1ii() {
  return new Promise(iiiiil1l => {
    let II11i1i1 = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
    $.post(illlIIil("/customer/getMyPing", II11i1i1), async (Illii111, Ii1lIlIi, l11lilii) => {
      try {
        if (Illii111) {
          Ii1lIlIi && typeof Ii1lIlIi.statusCode != "undefined" && Ii1lIlIi.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), $.outFlag = true);
          console.log(String(Illii111));
          console.log("getMyPing API请求失败，请检查网路重试");
        } else {
          if (Ii1lIlIi.status == 200) {
            illil1i(Ii1lIlIi);
          }
          if (iII11Ill(l11lilii)) {
            l11lilii = JSON.parse(l11lilii);
            if (l11lilii.result && l11lilii.data) {
              $.secretPin = l11lilii.data.secretPin;
              $.nickName = l11lilii.data.nickname;
              $.AUTH_C_USER = $.secretPin;
            }
          }
        }
      } catch (iIi1i1i) {
        $.logErr(iIi1i1i, Ii1lIlIi);
      } finally {
        iiiiil1l();
      }
    });
  });
}
function illlIIil(iill11l, llIII1ii) {
  return {
    url: "" + II1i1Il + iill11l,
    body: llIII1ii,
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      Host: $.domain,
      Origin: II1i1Il,
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: Illl1ll,
      Cookie: i11II + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    },
    timeout: 30000
  };
}
async function IiIlI1I1() {
  return new Promise(async I1llll11 => {
    const liI1I1Ii = {
      url: "https://cjhy-isv.isvjcloud.com/common/accessLog",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        Host: "cjhy-isv.isvjcloud.com",
        Origin: "https://cjhy-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: Illl1ll,
        Cookie: i11II + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      body: "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(Illl1ll) + "&subType=app&adSource="
    };
    $.post(liI1I1Ii, (I1lIli, llIIIIlI, II1IIIIi) => {
      try {
        if (I1lIli) {
          console.log(String(I1lIli));
          console.log("accessLog API请求失败，请检查网路重试");
        } else {
          if (llIIIIlI.status == 200) {
            illil1i(llIIIIlI);
          }
        }
      } catch (IIi1Il1I) {
        $.logErr(IIi1Il1I, llIIIIlI);
      } finally {
        I1llll11();
      }
    });
  });
}
async function ilIllI1I() {
  return new Promise(async iIl1i1lI => {
    const Ii1Ill1I = {
      url: "https://lzkj-isv.isvjd.com/common/accessLogWithAD",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        Host: "lzkj-isv.isvjcloud.com",
        Origin: "https://lzkj-isv.isvjd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: Illl1ll,
        Cookie: i11II + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      body: "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(Illl1ll) + "&subType=app&adSource="
    };
    $.post(Ii1Ill1I, (l1lil1, iI1IiIlI, ilIilll) => {
      try {
        if (l1lil1) {
          console.log(String(l1lil1));
          console.log("accessLogWithAD API请求失败，请检查网路重试");
        } else {
          iI1IiIlI.status == 200 && illil1i(iI1IiIlI);
        }
      } catch (lllIIi) {
        $.logErr(lllIIi, iI1IiIlI);
      } finally {
        iIl1i1lI();
      }
    });
  });
}
async function IlliIii1() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async IIIi11ii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIl1iilI = "";
    if ($.shopactivityId) {
      iIl1iilI = ",\"activityId\":" + $.shopactivityId;
    }
    const IiIIliII = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIl1iilI + ",\"channel\":406}",
      l1il1IIi = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(IiIIliII)
      },
      liIi1II = await l1Il1Il("27004", l1il1IIi),
      iillIiIi = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + IiIIliII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(liIi1II),
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          cookie: originCookie,
          origin: "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iillIiIi, async (II1lil1, lIi1li1i, l1lli1li) => {
      try {
        l1lli1li = l1lli1li && l1lli1li.match(/jsonp_.*?\((.*?)\);/) && l1lli1li.match(/jsonp_.*?\((.*?)\);/)[1] || l1lli1li;
        let ilIiIiii = $.toObj(l1lli1li, l1lli1li);
        if (ilIiIiii && typeof ilIiIiii == "object") {
          if (ilIiIiii && ilIiIiii.success === true) {
            console.log(ilIiIiii.message);
            $.errorJoinShop = ilIiIiii.message;
            if (ilIiIiii.result && ilIiIiii.result.giftInfo) {
              for (let l11i11li of ilIiIiii.result.giftInfo.giftList) {
                console.log("入会获得: " + l11i11li.discountString + l11i11li.prizeName + l11i11li.secondLineDesc);
              }
            }
            console.log("");
          } else {
            ilIiIiii && typeof ilIiIiii == "object" && ilIiIiii.message ? ($.errorJoinShop = ilIiIiii.message, console.log("" + (ilIiIiii.message || ""))) : console.log(l1lli1li);
          }
        } else {
          console.log(l1lli1li);
        }
      } catch (iIIIiiII) {
        $.logErr(iIIIiiII, lIi1li1i);
      } finally {
        IIIi11ii();
      }
    });
  });
}
function illil1i(ilIlIlII) {
  if (ilIlIlII.headers["set-cookie"]) {
    ilIl1ll = "";
    for (let I1iIlIIi of ilIlIlII.headers["set-cookie"]) {
      i111l111[I1iIlIIi.split(";")[0].substr(0, I1iIlIIi.split(";")[0].indexOf("="))] = I1iIlIIi.split(";")[0].substr(I1iIlIIi.split(";")[0].indexOf("=") + 1);
    }
    for (const liliI1iI of Object.keys(i111l111)) {
      ilIl1ll += liliI1iI + "=" + i111l111[liliI1iI] + ";";
    }
    i11II = ilIl1ll;
  }
}
function l11il1I() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const IiiiI1I1 = Array.from(new Set($.blacklist.split("&")));
  console.log(IiiiI1I1.join("&") + "\n");
  let i11ili = IiiiI1I1,
    iIi1i1i1 = [],
    i1i1lIli = false;
  for (let Iililll = 0; Iililll < IIiiIliI.length; Iililll++) {
    let iii1Iii1 = decodeURIComponent(IIiiIliI[Iililll].match(/pt_pin=([^; ]+)(?=;?)/) && IIiiIliI[Iililll].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iii1Iii1) {
      break;
    }
    let II11IllI = false;
    for (let ili1iIIl of i11ili) {
      if (ili1iIIl && ili1iIIl == iii1Iii1) {
        II11IllI = true;
        break;
      }
    }
    !II11IllI && (i1i1lIli = true, iIi1i1i1.splice(Iililll, -1, IIiiIliI[Iililll]));
  }
  if (i1i1lIli) {
    IIiiIliI = iIi1i1i1;
  }
}
function I11Ii1(II1ii1l1, i1llI1lI) {
  i1llI1lI != 0 && II1ii1l1.unshift(II1ii1l1.splice(i1llI1lI, 1)[0]);
}
function IiIii1ll() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IIiiIliI, IIiiIliI));
    return;
  }
  console.log("当前已设置白名单：");
  const IiIiIl1l = Array.from(new Set($.whitelist.split("&")));
  console.log(IiIiIl1l.join("&") + "\n");
  let IiiIi11i = [],
    illi1i11 = IiIiIl1l;
  for (let I1llIllI in IIiiIliI) {
    let I1il11Ii = decodeURIComponent(IIiiIliI[I1llIllI].match(/pt_pin=([^; ]+)(?=;?)/) && IIiiIliI[I1llIllI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    illi1i11.includes(I1il11Ii) && IiiIi11i.push(IIiiIliI[I1llIllI]);
  }
  helpCookiesArr = IiiIi11i;
  if (illi1i11.length > 1) {
    for (let lI1Il1li in illi1i11) {
      let il1IIii = illi1i11[illi1i11.length - 1 - lI1Il1li];
      if (!il1IIii) {
        continue;
      }
      for (let lill111i in helpCookiesArr) {
        let ii1IiIil = decodeURIComponent(helpCookiesArr[lill111i].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lill111i].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        il1IIii == ii1IiIil && I11Ii1(helpCookiesArr, lill111i);
      }
    }
  }
}
function IIliili(Iil1Ii11) {
  Iil1Ii11 = Iil1Ii11 || 32;
  let IiIi1li = "abcdef0123456789",
    ililil1l = IiIi1li.length,
    lililil = "";
  for (i = 0; i < Iil1Ii11; i++) {
    lililil += IiIi1li.charAt(Math.floor(Math.random() * ililil1l));
  }
  return lililil;
}
function iII11Ill(I1illlIi) {
  if (!I1illlIi) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(I1illlIi) == "object") {
      return true;
    }
  } catch (iIliII) {
    console.log(iIliII);
    return false;
  }
}
function IIIIiI(i11ii1Il, Iil1Ii1I) {
  let IIIilI1 = new RegExp("(^|[&?])" + Iil1Ii1I + "=([^&]*)(&|$)"),
    IIii1i = i11ii1Il.match(IIIilI1);
  if (IIii1i != null) {
    return decodeURIComponent(IIii1i[2]);
  }
  return "";
}
