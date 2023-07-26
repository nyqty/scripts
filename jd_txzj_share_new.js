/*
活动名称：分享有礼 · 收藏大师
活动链接：https://txzj-isv.isvjcloud.com/share_new/home?a=<活动id>
环境变量：jd_share_new_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('分享有礼（收藏大师）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')
const jsdom = require('jsdom')

let lz_cookie = {};
const {
  JSDOM
} = jsdom;
let activityCookie = "";
$.prizeIds = [];
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_share_new_activityUrl) activityUrl = process.env.jd_share_new_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(iI1IIii => {
    cookiesArr.push(jdCookieNode[iI1IIii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(liiiii1l => liiiii1l.cookie)].filter(lIIiI1Ii => !!lIIiI1Ii);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "a");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
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
  for (let i11ll1ll = 0; i11ll1ll < cookiesArr.length; i11ll1ll++) {
    if (cookiesArr[i11ll1ll]) {
      cookie = cookiesArr[i11ll1ll];
      originCookie = cookiesArr[i11ll1ll];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = i11ll1ll + 1;
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
      await share_new();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
  if ($.helpFull && !$.activityEnd) {
    for (let IlIlIili = 0; IlIlIili < 1; IlIlIili++) {
      if (cookiesArr[IlIlIili]) {
        cookie = cookiesArr[IlIlIili];
        originCookie = cookiesArr[IlIlIili];
        if (cookie) {
          $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
          $.index = IlIlIili + 1;
          message = "";
          $.bean = 0;
          $.hotFlag = false;
          $.nickName = "";
          console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 领取奖励******\n");
          await getUA();
          await runs();
          if ($.activityEnd || $.hasEnd) break;
        }
      }
    }
  }
})().catch(ll1IIiIl => {
  $.log("", " " + $.name + ", 失败! 原因: " + ll1IIiIl + "!", "");
}).finally(() => {
  $.done();
});
async function share_new() {
  $.helpFull = false;
  $.helpStatus = 0;
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if (activityId) {
    await jd_store_user_info();
    if ($.hasEnd === true) {
      return;
    }
    if ($.index == 1) {
      await share_newx();
      if ($.activityEnd) return;
      await change_task2();
    }
    $.index != 1 && (await change_task());
    if ($.index == 1) $.helpCountnum = $.helpCount;else $.helpStatus === 1 && $.helpCountnum++;
    console.log("\n【账号" + $.index + "】已有助力：" + $.helpCount + ($.index != 1 && " 【账号1】已有助力：" + $.helpCountnum || ""));
    $.helpCountnum >= $.helpnum && ($.helpFull = true);
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
async function runs() {
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if (activityId) {
    await jd_store_user_info();
    if ($.hasEnd === true) {
      return;
    }
    await share_newx();
    await $.wait(2000);
    for (let llIIIIiI = 0; llIIIIiI < $.prizeIds.length; llIIIIiI++) {
      $.prize_id = $.prizeIds[llIIIIiI];
      await receive_prize();
      await $.wait(2000);
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function jd_store_user_info() {
  return new Promise(ilillill => {
    let li11IIIi = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", li11IIIi), async (llllIiii, lliIII1i, iliiliiI) => {
      try {
        if (llllIiii) {
          console.log("" + JSON.stringify(llllIiii));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          iliiliiI = JSON.parse(iliiliiI);
          if (iliiliiI && iliiliiI.code === "success") {} else {
            console.log("授权失败：" + iliiliiI.msg);
            $.hasEnd = true;
          }
          lliIII1i.status == 200 && refreshToken(lliIII1i);
        }
      } catch (i1i1ilII) {
        $.logErr(i1i1ilII, lliIII1i);
      } finally {
        ilillill();
      }
    });
  });
}
function change_task2() {
  return new Promise(IIllilil => {
    let I1ii1Il = "pid=" + activityId + "&is_follow=false&type=user&code=";
    $.post(taskPostUrl("/share_new/change_task", I1ii1Il), async (illll1Ii, l1IlI1II, lIII1111) => {
      try {
        if (illll1Ii) {
          console.log("" + JSON.stringify(illll1Ii));
          console.log($.name + " change_task API请求失败，请检查网路重试");
        } else {
          lIII1111 = JSON.parse(lIII1111);
          lIII1111 && lIII1111.code === "success" ? (console.log("开启活动：" + lIII1111.msg), $.helpStatus = 1) : console.log("开启失败：" + JSON.stringify(lIII1111));
          l1IlI1II.status == 200 && refreshToken(l1IlI1II);
        }
      } catch (lIli11i) {
        $.logErr(lIli11i, l1IlI1II);
      } finally {
        IIllilil();
      }
    });
  });
}
function change_task() {
  return new Promise(llliiIIl => {
    let ilI111II = "pid=" + activityId + "&is_follow=false&type=help&code=" + encodeURIComponent($.code);
    $.post(taskPostUrl("/share_new/change_task", ilI111II), async (iIliIii1, llIlIIl1, ll1lI1i) => {
      try {
        iIliIii1 ? (console.log("" + JSON.stringify(iIliIii1)), console.log($.name + " change_task API请求失败，请检查网路重试")) : (ll1lI1i = JSON.parse(ll1lI1i), ll1lI1i && ll1lI1i.code === "success" ? (console.log("助力成功：" + ll1lI1i.msg), $.helpStatus = 1) : console.log("助力失败：" + JSON.stringify(ll1lI1i)), llIlIIl1.status == 200 && refreshToken(llIlIIl1));
      } catch (iI111I1) {
        $.logErr(iI111I1, llIlIIl1);
      } finally {
        llliiIIl();
      }
    });
  });
}
function receive_prize() {
  return new Promise(IiilllIi => {
    let liI111l = "pid=" + activityId + "&prize_id=" + $.prize_id;
    console.log(liI111l);
    $.post(taskPostUrl("/share_new/receive_prize", liI111l), async (II1IliII, IIlilIIl, i1i11ili) => {
      try {
        if (II1IliII) {
          console.log("" + JSON.stringify(II1IliII));
          console.log($.name + " receive_prize API请求失败，请检查网路重试");
        } else {
          i1i11ili = JSON.parse(i1i11ili);
          if (i1i11ili && i1i11ili.code === "success") {
            if (i1i11ili.data.prize_info) {
              switch (i1i11ili.data.prize_title.type) {
                case "coupon":
                  console.log("🗑️ 优惠券");
                  break;
                case "bean":
                  console.log("🎉 " + i1i11ili.data.prize_title.prize_title + " 🐶");
                  break;
                case "integral":
                  console.log("🗑️ " + (i1i11ili.data.prize_title.prize_title || i1i11ili.data.prize_title.once_num) + " 🎟️");
                  break;
                case "goods":
                  console.log("🎉 实物" + i1i11ili.data.prize_title.prize_name);
                  break;
                default:
                  console.log(i1i11ili.msg);
                  break;
              }
            } else console.log(i1i11ili.msg);
          } else {
            console.log("领取失败：" + i1i11ili.msg);
            II1IliII = i1i11ili.msg;
            for (let i11IIiiI of ["不足", "部分会员", "火爆", "上限", "已领取", "未开始"]) {
              if (II1IliII.includes(i11IIiiI)) {
                $.errs = true;
                break;
              }
            }
          }
          IIlilIIl.status == 200 && refreshToken(IIlilIIl);
        }
      } catch (i1iiIil) {
        $.logErr(i1iiIil, IIlilIIl);
      } finally {
        IiilllIi();
      }
    });
  });
}
function share_newz() {
  return new Promise(liIIii1 => {
    const I11I1 = {
      "url": domains + "/share_new/home?a=" + activityId + "&" + encodeURIComponent($.code) + "&token=" + $.token,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie + "IsvToken=" + $.token,
        "Host": $.domain,
        "Referer": activityUrl,
        "User-Agent": $.UA
      }
    };
    $.get(I11I1, async (Ili11I, iliiII1i, iilllii1) => {
      try {
        if (Ili11I) {
          console.log("" + JSON.stringify(Ili11I));
          console.log($.name + " share_newz API请求失败，请检查网路重试");
        } else {
          iilllii1 = iilllii1;
          if (iilllii1) {
            let lIil1Iii = iilllii1.match(/(活动已结束)/) && iilllii1.match(/(活动已结束)/)[1] || iilllii1.match(/(哎哟，当前活动尚未开始噢！)/) && iilllii1.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            lIil1Iii && ($.activityEnd = true, console.log("活动已结束或者未开始"));
            let iIIII1i = iilllii1.match(/id="code" value="(.+)"/);
            iIIII1i && ($.helpcode = iIIII1i[1], console.log("当前助力：" + $.helpcode));
          }
        }
      } catch (l1iIIiI) {
        $.logErr(l1iIIiI, iliiII1i);
      } finally {
        liIIii1();
      }
    });
  });
}
function share_newx() {
  return new Promise(lIilI1ii => {
    const l11i11lI = {
      "url": domains + "/share_new/home?a=" + activityId + "&token=" + $.token,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie + "IsvToken=" + $.token,
        "Host": $.domain,
        "Referer": activityUrl,
        "User-Agent": $.UA
      }
    };
    $.get(l11i11lI, async (l1lIIlIl, i1IiIlII, liillIIl) => {
      try {
        if (l1lIIlIl) {
          console.log("" + JSON.stringify(l1lIIlIl));
          console.log($.name + " share_newz API请求失败，请检查网路重试");
        } else {
          liillIIl = liillIIl;
          if (liillIIl) {
            const ii1ii1I = new JSDOM(liillIIl);
            let iiIIlIiI = liillIIl.match(/(活动已结束)/) && liillIIl.match(/(活动已结束)/)[1] || liillIIl.match(/(哎哟，当前活动尚未开始噢！)/) && liillIIl.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            if (iiIIlIiI) {
              $.activityEnd = true;
              console.log("活动已结束或者未开始");
            }
            if ($.index === 1) {
              if (liillIIl.includes("人领取")) {
                let lIliI1l = ii1ii1I.window.document.getElementsByClassName("prize-btn btn-not-complete");
                $.helpnum = 0;
                for (let li11Ili1 = 0; li11Ili1 < lIliI1l.length; li11Ili1++) {
                  let iiiiIIIi = lIliI1l.item(li11Ili1).textContent;
                  if (iiiiIIIi.match(/分享(.+)人领取/)) {
                    iiiiIIIi = iiiiIIIi.match(/分享(.+)人领取/)[1];
                    if (iiiiIIIi > $.helpnum) $.helpnum = iiiiIIIi;
                  }
                }
              } else {
                if (liillIIl.includes("领取奖品")) {
                  let iil1lIll = ii1ii1I.window.document.getElementsByClassName("prize-btn btn-get");
                  for (let l1i1lilI = 0; l1i1lilI < iil1lIll.length; l1i1lilI++) {
                    $.prizeIds.push(iil1lIll[l1i1lilI].getAttribute("data_prize_id"));
                  }
                }
              }
              let iiiII1I1 = liillIIl.match(/已有<span class="friends-num">(.+)<\/span>位好友成功帮助/);
              iiiII1I1 && ($.helpCount = iiiII1I1[1], console.log("已邀请人数：" + $.helpCount));
              let IiI1iil = liillIIl.match(/&code=(.+)","jd_init_share_url"/);
              IiI1iil && ($.code = IiI1iil[1], console.log("邀请码：" + $.code));
            }
          }
        }
      } catch (IiIl1ili) {
        $.logErr(IiIl1ili, i1IiIlII);
      } finally {
        lIilI1ii();
      }
    });
  });
}
function getShopOpenCardInfo(IllIIi11) {
  let lllI1i1l = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(IllIIi11)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(I11lilll => {
    $.get(lllI1i1l, (iIlllI, I1lII1Il, I1I1lil) => {
      try {
        if (iIlllI) {
          iIlllI === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(iIlllI)));
        } else {
          res = JSON.parse(I1I1lil);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (l111Ill) {
        console.log(l111Ill);
      } finally {
        I11lilll();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async llIlIlIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIii1iIi = "";
    if ($.shopactivityId) IIii1iIi = ",\"activityId\":" + $.shopactivityId;
    const llIIIll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIii1iIi + ",\"channel\":406}",
      i1l1i111 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(llIIIll)
      },
      lIiIIliI = await getH5st("8adfb", i1l1i111),
      i1lii1il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + llIIIll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIiIIliI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1lii1il, async (ii11lI, IlilI1il, i1I11Ili) => {
      try {
        i1I11Ili = i1I11Ili && i1I11Ili.match(/jsonp_.*?\((.*?)\);/) && i1I11Ili.match(/jsonp_.*?\((.*?)\);/)[1] || i1I11Ili;
        let Iiiil1iI = $.toObj(i1I11Ili, i1I11Ili);
        if (Iiiil1iI && typeof Iiiil1iI == "object") {
          if (Iiiil1iI && Iiiil1iI.success === true) {
            console.log(Iiiil1iI.message);
            $.errorJoinShop = Iiiil1iI.message;
            if (Iiiil1iI.result && Iiiil1iI.result.giftInfo) {
              for (let iIiI1iII of Iiiil1iI.result.giftInfo.giftList) {
                console.log("入会获得: " + iIiI1iII.discountString + iIiI1iII.prizeName + iIiI1iII.secondLineDesc);
              }
            }
            console.log("");
          } else Iiiil1iI && typeof Iiiil1iI == "object" && Iiiil1iI.message ? ($.errorJoinShop = Iiiil1iI.message, console.log("" + (Iiiil1iI.message || ""))) : console.log(i1I11Ili);
        } else console.log(i1I11Ili);
      } catch (lIIilIlI) {
        $.logErr(lIIilIlI, IlilI1il);
      } finally {
        llIlIlIl();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async i1Iii1Ii => {
    let Ii11llIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const lilil11I = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii11llIl)
      },
      ii1lIliI = await getH5st("ef79a", lilil11I),
      IIlIill1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Ii11llIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ii1lIliI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIlIill1, async (IIlliiIi, Il1111I1, ll1iiIII) => {
      try {
        ll1iiIII = ll1iiIII && ll1iiIII.match(/jsonp_.*?\((.*?)\);/) && ll1iiIII.match(/jsonp_.*?\((.*?)\);/)[1] || ll1iiIII;
        let ili1lI1I = $.toObj(ll1iiIII, ll1iiIII);
        if (ili1lI1I && typeof ili1lI1I == "object") ili1lI1I && ili1lI1I.success == true && (console.log("\n去加入店铺会员：" + (ili1lI1I.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = ili1lI1I.result.interestsRuleList && ili1lI1I.result.interestsRuleList[0] && ili1lI1I.result.interestsRuleList[0].interestsInfo && ili1lI1I.result.interestsRuleList[0].interestsInfo.activityId || "");else {
          console.log(ll1iiIII);
        }
      } catch (l1IlillI) {
        $.logErr(l1IlillI, Il1111I1);
      } finally {
        i1Iii1Ii();
      }
    });
  });
}
function getAuthorCodeList(i1il1llI) {
  return new Promise(i1lilIII => {
    const iII1lIi1 = {
      "url": i1il1llI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iII1lIi1, async (iIi1Ilil, I1IIIli1, ilii1IlI) => {
      try {
        if (iIi1Ilil) $.getAuthorCodeListerr = false;else {
          if (ilii1IlI) ilii1IlI = JSON.parse(ilii1IlI);
          $.getAuthorCodeListerr = true;
        }
      } catch (IliilIII) {
        $.logErr(IliilIII, I1IIIli1);
        ilii1IlI = null;
      } finally {
        i1lilIII(ilii1IlI);
      }
    });
  });
}
function taskPostUrl(illlllIl, ll1li1il) {
  return {
    "url": "" + domains + illlllIl,
    "body": ll1li1il,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + "IsvToken=" + $.token,
      "Host": $.domain,
      "Origin": domains,
      "Referer": activityUrl,
      "User-Agent": $.UA
    }
  };
}
function refreshToken(Iil1l1i) {
  if (Iil1l1i) {
    if (Iil1l1i.headers["set-cookie"]) {
      cookie = "";
      for (let iIIiiiI1 of Iil1l1i.headers["set-cookie"]) {
        lz_cookie[iIIiiiI1.split(";")[0].substr(0, iIIiiiI1.split(";")[0].indexOf("="))] = iIIiiiI1.split(";")[0].substr(iIIiiiI1.split(";")[0].indexOf("=") + 1);
      }
      for (const ilii1I1i of Object.keys(lz_cookie)) {
        cookie += ilii1I1i + "=" + lz_cookie[ilii1I1i] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(IiIli1II) {
  IiIli1II = IiIli1II || 32;
  let l1I1i1I1 = "abcdef0123456789",
    I1iI1ii = l1I1i1I1.length,
    l1IIIIi = "";
  for (i = 0; i < IiIli1II; i++) l1IIIIi += l1I1i1I1.charAt(Math.floor(Math.random() * I1iI1ii));
  return l1IIIIi;
}
function safeGet(iilii1i1) {
  if (!iilii1i1) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(iilii1i1) == "object") {
      return true;
    }
  } catch (li1Iii) {
    return console.log(li1Iii), false;
  }
}
function jsonParse(ilIIi1iI) {
  if (typeof ilIIi1iI == "string") try {
    return JSON.parse(ilIIi1iI);
  } catch (iIIi11Il) {
    return console.log(iIIi11Il), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function generateFp() {
  let I1illl1i = "0123456789",
    Il1iiiII = 13,
    liii = "";
  for (; Il1iiiII--;) liii += I1illl1i[Math.random() * I1illl1i.length | 0];
  return (liii + Date.now()).slice(0, 16);
}
function geth5st() {
  let il11iIl1 = Date.now(),
    l1l11l1I = generateFp(),
    IIIllilI = new Date(il11iIl1).Format("yyyyMMddhhmmssSSS"),
    Iil1IlIl = [";ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;", ";169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;"],
    i11Iiiil = Iil1IlIl[random(0, Iil1IlIl.length)];
  return encodeURIComponent(IIIllilI + ";" + l1l11l1I + i11Iiiil + Date.now());
}
Date.prototype.Format = function (illIiIl1) {
  var iiliili1 = this,
    II11lilI = illIiIl1,
    Il1II111 = {
      "M+": iiliili1.getMonth() + 1,
      "d+": iiliili1.getDate(),
      "D+": iiliili1.getDate(),
      "h+": iiliili1.getHours(),
      "H+": iiliili1.getHours(),
      "m+": iiliili1.getMinutes(),
      "s+": iiliili1.getSeconds(),
      "w+": iiliili1.getDay(),
      "q+": Math.floor((iiliili1.getMonth() + 3) / 3),
      "S+": iiliili1.getMilliseconds()
    };
  /(y+)/i.test(II11lilI) && (II11lilI = II11lilI.replace(RegExp.$1, "".concat(iiliili1.getFullYear()).substr(4 - RegExp.$1.length)));
  for (var lllIi1II in Il1II111) {
    if (new RegExp("(".concat(lllIi1II, ")")).test(II11lilI)) {
      var il11Iil1,
        iIllI1l1 = "S+" === lllIi1II ? "000" : "00";
      II11lilI = II11lilI.replace(RegExp.$1, 1 == RegExp.$1.length ? Il1II111[lllIi1II] : ("".concat(iIllI1l1) + Il1II111[lllIi1II]).substr("".concat(Il1II111[lllIi1II]).length));
    }
  }
  return II11lilI;
};
function random(I1ll1l1l, IlIlI1il) {
  return Math.floor(Math.random() * (IlIlI1il - I1ll1l1l)) + I1ll1l1l;
}
function getQueryString(ilillii1, iI1Iill1) {
  let Ii11llll = new RegExp("(^|[&?])" + iI1Iill1 + "=([^&]*)(&|$)"),
    liI1III = ilillii1.match(Ii11llll);
  if (liI1III != null) return decodeURIComponent(liI1III[2]);
  return "";
}
