/*
双11开红包

变量：
JD_JF_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_JF_PROXY_TUNNRL      // 代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_JF_PROXY_URL      // API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_JF_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改
JD_JF_CODE_WAIT     // 开红包延迟，默认值 10  表示：1000ms  需要自行修改
JD_JF_CODE_NUM     // 默认全抽，领取次数, 0=不限制 1=领取1次

JD_CODE1111      //  https://u.jd.com/xxxxxxx   xxxxxxx为变量值，就是链接后面那7位字母

59 59 9,20,23 * * * jd_Redpacket.js

*/

const Env=require('./utils/Env.js');
const $ = new Env('双11开红包');
const IlIllIli = $.isNode() ? require("./jdCookie.js") : "",
  llI1li1 = require("jsdom");
$.CryptoJS = require("crypto-js");
let iIiIII1l = [],
  liIill1 = "";
if ($.isNode()) {
  Object.keys(IlIllIli).forEach(iIilIiIl => {
    iIiIII1l.push(IlIllIli[iIilIiIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iIiIII1l = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(I11IIIll => I11IIIll.cookie)].filter(ilIliIIi => !!ilIliIIi);
let i1lIii11 = "",
  i1lI1l1 = "";
i1lIii11 = $.isNode() ? process.env.JD_CODE1111 ? process.env.JD_CODE1111 : "" + i1lIii11 : $.getdata("JD_CODE1111") ? $.getdata("JD_CODE1111") : "" + i1lIii11;
i1lI1l1 = $.isNode() ? process.env.JD_nhj_rebatePin ? process.env.JD_nhj_rebatePin : "" + i1lI1l1 : $.getdata("JD_nhj_rebatePin") ? $.getdata("JD_nhj_rebatePin") : "" + i1lI1l1;
let lliIiII1 = i1lI1l1 && i1lI1l1.split(",") || [];
rebateCode = i1lIii11 + "";
let IlI111l = "31165";
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
newCookie = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let lIi11ilI = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let llII1iIl = null;
const liIlI11 = "2023/11/12 00:00:00+08:00";
let l11Il111 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let Il111Ii = "";
$.time("yyyy-MM-dd");
iiIl11iI();
const lilil = process.env.JD_JF_PROXY_OPEN === "true",
  lilii1i1 = process.env.JD_JF_PROXY_TUNNRL,
  IllI1Ii1 = process.env.JD_JF_PROXY_URL,
  IlIIl1II = process.env.JD_JF_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let i1I1iIlI = "",
  Ii11lI1I = 0;
const Il1IIlli = process.env.JD_JF_CODE_WAIT || "0",
  l1iIII1l = process.env.JD_JF_CODE_NUM || "0";
let lIIIiilI = parseInt(Il1IIlli) * 100;
lilil && (lilii1i1 || IllI1Ii1) && (lIIIiilI = 0);
let llI1l11 = false;
if (lilil) {
  llI1l11 = true;
  try {
    require("global-agent/bootstrap");
    if (IllI1Ii1) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + IllI1Ii1 + "\n");
      let llIl1lil = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = llIl1lil.exec(IllI1Ii1)[0] + "," + IlIIl1II;
    } else lilii1i1 ? (global.GLOBAL_AGENT.HTTP_PROXY = lilii1i1, global.GLOBAL_AGENT.NO_PROXY = "" + IlIIl1II, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
  } catch (l1ii1iIi) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    llI1l11 = false;
  }
} else console.log("\n⚠ 检测当前模式未开启代理："), console.log("⚠ 开启代理变量：export JD_JF_PROXY_OPEN='true' \n");
!(async () => {
  $.authorCodeend = false;

  $.authorCode = "pss2Y6r";
  rebateCode = i1lIii11 ? i1lIii11 : $.authorCode;
  if (i1lIii11) console.log("\n红包码：" + i1lIii11 || "\n");
  console.log("开红包延迟：" + lIIIiilI + "ms\n");
  if (!iIiIII1l[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (l11Il111 > new Date(liIlI11).getTime()) {
    $.msg($.name, "活动已结束", "请删除此脚本");
  }
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("jd_code1111_pin") || {};
  $.shareCode = "";
  $.again = false;
  await lllliIlI();
  for (let IlIIiI1l = 0; IlIIiI1l < iIiIII1l.length && !$.runEnd; IlIIiI1l++) {
    if ($.endFlag) break;
    liIill1 = iIiIII1l[IlIIiI1l];
    if (liIill1) {
      $.UserName = decodeURIComponent(liIill1.match(/pt_pin=([^; ]+)(?=;?)/) && liIill1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IlIIiI1l + 1;
      if ($.runArr[$.UserName]) continue;
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let lilll1I1 = 1;
      !liIill1.includes("app_open") && (lilll1I1 = 2);
      if (lilil && llI1l11) {
        if (IllI1Ii1) {
          if (Ii11lI1I % 1 == 0) {
            await I11iilil();
            global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1I1iIlI;
          }
          console.log("📶 " + i1I1iIlI || "隧道代理不显示IP");
          Ii11lI1I++;
        }
      }
      await lilillI1(lilll1I1);
      await l1iII1l();
      if ($.endFlag || $.end) break;
    }
    $.setdata($.shareCodePinArr, "jd_code1111_pin");
  }
  $.setdata($.shareCodePinArr, "jd_code1111_pin");
  if (message) {
    if ($.isNode()) {}
  }
})().catch(IIIIiI => $.logErr(IIIIiI)).finally(() => {
  if (llII1iIl) llII1iIl.close();
  $.done();
});
async function l1iII1l(I11I1IIi = 0) {
  try {
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && iiIl11iI();
    resMsg = "";
    let I1iilIIl = false,
      iiIilI1i = 0,
      ilI1liII = 0,
      l1iii1Ii = 0;
    $.shareFlag = true;
    do {
      if (ilI1liII > 2) iiIilI1i = 0;
      $.flag = 0;
      newCookie = "";
      $.url1 = "";
      await lil1I11i();
      if (!$.url1) for (let l1liiiii = 0; l1liiiii < 3; l1liiiii++) {
        if (lilil && llI1l11) {
          if (IllI1Ii1) {
            console.log("📶 " + i1I1iIlI || "隧道代理不显示IP");
            console.log("获取失败，请检查");
            await lil1I11i();
            Ii11lI1I++;
          } else lilii1i1 && (console.log("获取失败，请检查"), await lil1I11i());
        }
        if ($.url1) break;
      }
      $.url2 = "";
      $.UVCookie = Il111Ii.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await ll1lIiil();
      !/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + rebateCode).test($.url2) && console.log("获取失败，可能不是红包页面，请检查");
      if (!$.url2) $.url2 = "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html?unionActId=" + IlI111l + "&d=" + rebateCode + "&cu=true&utm_source=kong&utm_medium=jingfen";
      $.actId = $.url2.match(/mall\/active\/([^\/]+)\/index\.html/) && $.url2.match(/mall\/active\/([^\/]+)\/index\.html/)[1] || "2ZqeDAGGJtUdE4C38i2EXkXBLLNu";
      $.UVCookie = Il111Ii.getUVCookie("", "", $.url2, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (I11I1IIi == 0) {
        let IillI1il = 0,
          ilIIiIll = true,
          lIllI1 = 0;
        if (Object.getOwnPropertyNames(lIi11ilI).length > iiIilI1i && $.shareFlag) {
          for (let liIliiiI in lIi11ilI || {}) {
            if (liIliiiI == $.UserName) {
              $.flag = 1;
              continue;
            }
            if (IillI1il == iiIilI1i) {
              $.flag = 0;
              $.shareCode = lIi11ilI[liIliiiI] || "";
              if ($.shareCodePinArr[liIliiiI] && $.shareCodePinArr[liIliiiI].includes($.UserName)) {
                lIllI1++;
                continue;
              }
              if ($.shareCode.count >= $.shareCodeArr.shareCount) {
                lIllI1++;
                continue;
              }
              $.getlj = false;
              let Ill111Il = await lIiiIll($.shareCode.code, 1);
              if (/重复助力/.test(Ill111Il)) {
                if (!$.shareCodePinArr[liIliiiI]) $.shareCodePinArr[liIliiiI] = [];
                $.shareCodePinArr[liIliiiI].push($.UserName);
                iiIilI1i--;
                l1iii1Ii--;
              } else {
                if (/助力/.test(Ill111Il) && /上限/.test(Ill111Il)) $.shareFlag = false;else {
                  if (!/领取上限/.test(Ill111Il) && $.getlj == true) {
                    if (!$.shareCodePinArr[liIliiiI]) $.shareCodePinArr[liIliiiI] = [];
                    !$.shareCodePinArr[liIliiiI].includes($.UserName) && $.shareCodePinArr[liIliiiI].push($.UserName);
                    iiIilI1i--;
                  } else ilIIiIll = false;
                }
              }
            }
            IillI1il++;
          }
        }
        ilIIiIll && lIllI1 == Object.getOwnPropertyNames(lIi11ilI).length && (I1iilIIl = true);
        if (IillI1il == 0) {
          $.getlj = false;
          let II1iIiIl = await lIiiIll("", 1);
          !/领取上限/.test(II1iIiIl) && $.getlj == true && iiIilI1i--;
        }
        if ($.endFlag) break;
      } else {
        let lllI11l = await l1IiI11();
        if (!$.endFlag && lllI11l && $.again == false) await iilll1();
        if ($.again == false) break;
      }
      $.again == true && ilI1liII < 1 && (ilI1liII++, $.again = false);
      iiIilI1i++;
      l1iii1Ii++;
      $.flag == 1 && (await $.wait(parseInt(lIIIiilI * 1 + 100, 10)));
      if (l1iIII1l > 0 && l1iIII1l <= l1iii1Ii) break;
    } while ($.flag == 1 && iiIilI1i < 4);
    if ($.endFlag) return;
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    I1iilIIl && (await lllliIlI(1));
    await $.wait(parseInt(lIIIiilI * 1 + 100, 10));
  } catch (I1Illi) {
    console.log(I1Illi);
  }
}
async function lllliIlI(iillIi1 = 0) {
  try {
    let i1I1i1ll = 2;
    if (iillIi1 == 1) i1I1i1ll = 1;
    let lIlll1Il = 0;
    for (let IliiiilI in $.shareCodeArr || {}) {
      if (IliiiilI === "flag" || IliiiilI === "updateTime" || IliiiilI === "shareCount") continue;
      if ($.shareCodeArr[IliiiilI] && $.shareCodeArr.shareCount && $.shareCodeArr[IliiiilI].count < $.shareCodeArr.shareCount) lIlll1Il++;
    }
    for (let IlIii1 = 0; IlIii1 < iIiIII1l.length && !$.runEnd; IlIii1++) {
      liIill1 = iIiIII1l[IlIii1];
      if (liIill1) {
        $.UserName = decodeURIComponent(liIill1.match(/pt_pin=([^; ]+)(?=;?)/) && liIill1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (lliIiII1.length > 0 && lliIiII1.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) continue;
        $.index = IlIii1 + 1;
        await lilillI1();
        await l1iII1l(1);
        let iII1IiI = 0;
        for (let il1IIii in $.shareCodeArr || {}) {
          if (il1IIii === "flag" || il1IIii === "updateTime" || il1IIii === "shareCount") continue;
          if ($.shareCodeArr[il1IIii] && $.shareCodeArr.shareCount && $.shareCodeArr[il1IIii].count < $.shareCodeArr.shareCount) iII1IiI++;
        }
        if ($.endFlag || iII1IiI - lIlll1Il >= i1I1i1ll || $.end) break;
      }
    }
  } catch (ll1I1l1l) {
    console.log(ll1I1l1l);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) for (let l1IlIili in $.shareCodeArr || {}) {
    if (l1IlIili === "flag" || l1IlIili === "updateTime" || l1IlIili === "shareCount") continue;
    if ($.shareCodeArr[l1IlIili]) lIi11ilI[l1IlIili] = $.shareCodeArr[l1IlIili];
  }
}
function lIiiIll(IIil11 = "", lIiIlil1 = 1) {
  return new Promise(async I111l1iI => {
    $.UVCookie = Il111Ii.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let i1iIIi1i = "",
      ilil1I1i = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000,
      iii11iii = 1;
    $.time("H", ilil1I1i) == "20" && (iii11iii = 4);
    const li1iI11I = {
        "platform": iii11iii,
        "unionActId": IlI111l,
        "actId": $.actId,
        "d": rebateCode,
        "unionShareId": IIil11,
        "type": lIiIlil1,
        "eid": $.eid
      },
      lIii1I1i = {
        "appid": "u",
        "body": li1iI11I,
        "client": "apple",
        "clientVersion": "12.1.4",
        "functionId": "getCoupons"
      };
    i1iIIi1i = await Ii1i1Ii("6a98d", lIii1I1i);
    i1iIIi1i = encodeURIComponent(i1iIIi1i);
    let lIlii1li = "",
      iI1lIiil = {
        "url": "https://api.m.jd.com/api?functionId=getCoupons&appid=u&_=" + ilil1I1i + "&loginType=2&body=" + encodeURIComponent($.toStr(li1iI11I)) + "&client=apple&clientVersion=12.1.4&h5st=" + i1iIIi1i,
        "headers": {
          "accept": "*/*",
          "Accept-Language": "zh-cn",
          "Accept-Encoding": "gzip, deflate, br",
          "Cookie": "" + $.UVCookie + newCookie + " " + liIill1,
          "origin": "https://pro.m.jd.com",
          "Referer": "https://pro.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html",
          "User-Agent": $.UA
        },
        "timeout": 15000
      };
    if ($.url2) iI1lIiil.headers.Referer = $.url2;
    $.get(iI1lIiil, async (ll11li, l1iiii11, iIll1liI) => {
      try {
        if (ll11li) console.log("" + $.toStr(ll11li)), console.log($.name + " API请求失败，请检查网路重试");else {
          let III1Ii = $.toObj(iIll1liI, iIll1liI);
          if (typeof III1Ii == "object") {
            III1Ii.msg && (lIlii1li = III1Ii.msg, console.log(III1Ii.msg));
            if (III1Ii.msg.indexOf("不展示弹层") > -1 && lIiIlil1 == 1) $.again = true;
            if (III1Ii.msg.indexOf("领取上限") === -1 && III1Ii.msg.indexOf("登录") === -1) {
              if (lIiIlil1 == 1) $.flag = 1;
            }
            if (III1Ii.msg.indexOf("活动已结束") > -1 || III1Ii.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            IIil11 && typeof III1Ii.data !== "undefined" && typeof III1Ii.data.joinNum !== "undefined" && console.log("当前" + III1Ii.data.joinSuffix + ":" + III1Ii.data.joinNum);
            if (III1Ii.code == 0 && III1Ii.data) {
              if (lIiIlil1 == 1) $.shareCode.count++;
              let iii111i1 = "";
              for (let IiiiIiI1 of III1Ii.data.couponList) {
                if (IiiiIiI1.type == 1) $.getlj = true, iii111i1 += (iii111i1 ? "\n" : "") + "获得[红包]🧧" + IiiiIiI1.discount + "元 使用时间:" + $.time("yyyy-MM-dd", IiiiIiI1.beginTime) + " " + $.time("yyyy-MM-dd", IiiiIiI1.endTime);else {
                  if (IiiiIiI1.type == 3) $.getlj = true, iii111i1 += (iii111i1 ? "\n" : "") + "获得[优惠券]🎟️满" + IiiiIiI1.quota + "减" + IiiiIiI1.discount + " 使用时间:" + $.time("yyyy-MM-dd", IiiiIiI1.beginTime) + " " + $.time("yyyy-MM-dd", IiiiIiI1.endTime);else {
                    if (IiiiIiI1.type == 6) $.getlj = true, iii111i1 += (iii111i1 ? "\n" : "") + "获得[打折券]]🎫满" + IiiiIiI1.quota + "打" + IiiiIiI1.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", IiiiIiI1.beginTime) + " " + $.time("yyyy-MM-dd", IiiiIiI1.endTime);else {
                      if (IiiiIiI1.type == 17) $.getlj = true, iii111i1 += (iii111i1 ? "\n" : "") + "获得[支付券]]🎫 " + IiiiIiI1.limitStr + " 使用时间:" + $.time("yyyy-MM-dd", IiiiIiI1.beginTime) + " " + $.time("yyyy-MM-dd", IiiiIiI1.endTime);else {
                        $.getlj = true;
                        iii111i1 += (iii111i1 ? "\n" : "") + "获得[未知]🎉" + (IiiiIiI1.quota || "") + " " + IiiiIiI1.discount + " 使用时间:" + $.time("yyyy-MM-dd", IiiiIiI1.beginTime) + " " + $.time("yyyy-MM-dd", IiiiIiI1.endTime);
                        console.log(IiiiIiI1);
                      }
                    }
                  }
                }
              }
              iii111i1 && (resMsg += iii111i1 + "\n", console.log(iii111i1));
            }
            if (lIiIlil1 == 1 && typeof III1Ii.data !== "undefined" && typeof III1Ii.data.groupData !== "undefined" && typeof III1Ii.data.groupData.groupInfo !== "undefined") {
              for (let i1Il11II of III1Ii.data.groupData.groupInfo || []) {
                i1Il11II.status == 2 && (console.log("助力满可以领取" + i1Il11II.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await lIiiIll("", 2));
              }
            }
          } else console.log(iIll1liI);
        }
      } catch (i1I1I1ll) {
        $.logErr(i1I1I1ll, l1iiii11);
      } finally {
        I111l1iI(lIlii1li);
      }
    });
  });
}
function l1IiI11(iill11i = "") {
  let l1i1iIIi = true;
  return new Promise(iI1I1i11 => {
    $.UVCookie = Il111Ii.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let II1IiII = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000,
      llIilI = 1;
    $.time("H", II1IiII) == "20" && (llIilI = 4);
    let l1ll1iil = {
      "url": "https://api.m.jd.com/api?functionId=showCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22actId%22:%22" + $.actId + "%22,%22unionActId%22:%22" + IlI111l + "%22,%22unpl%22:%22" + $.unpl + "%22,%22platform%22:" + llIilI + ",%22unionShareId%22:%22%22," + ($.uiUpdateTime ? "%22uiUpdateTime%22:" + $.uiUpdateTime + "," : "") + "%22d%22:%22" + rebateCode + "%22,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=",
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + newCookie + " " + liIill1,
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html",
        "User-Agent": $.UA
      },
      "timeout": 15000
    };
    if ($.url2) l1ll1iil.headers.Referer = $.url2;
    $.get(l1ll1iil, async (ii1IIl11, II11l11i, i1Iliili) => {
      try {
        if (ii1IIl11) console.log("" + $.toStr(ii1IIl11)), console.log($.name + " API请求失败，请检查网路重试");else {
          let iIi1illI = $.toObj(i1Iliili, i1Iliili);
          if (typeof iIi1illI == "object") {
            if (iIi1illI.msg) console.log(iIi1illI.msg);
            if (iIi1illI.msg.indexOf("不展示弹层") > -1) $.again = true;
            if (iIi1illI.msg.indexOf("领取上限") > -1) $.runArr[$.UserName] = true;
            iIi1illI.msg.indexOf("上限") === -1 && iIi1illI.msg.indexOf("登录") === -1 && ($.flag = 1);
            if (iIi1illI.msg.indexOf("活动已结束") > -1 || iIi1illI.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (iIi1illI.data.uiUpdateTime) $.uiUpdateTime = iIi1illI.data.uiUpdateTime;
            if (typeof iIi1illI.data !== "undefined" && typeof iIi1illI.data.groupData !== "undefined" && typeof iIi1illI.data.groupData.joinNum !== "undefined") {
              $.joinNum = iIi1illI.data.groupData.joinNum;
              $.shareCount = 0;
              for (let iii11Iil of iIi1illI.data.groupData.groupInfo) {
                if ($.shareCount < iii11Iil.num) $.shareCount = iii11Iil.num;
              }
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = $.shareCount);
              $.shareCodeArr.shareCount = $.shareCount;
              if ($.shareCount <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) $.shareCodeArr[$.UserName] = {};
                $.shareCodeArr[$.UserName].count = $.joinNum;
                l1i1iIIi = false;
              }
            }
            iIi1illI.msg.indexOf("活动已结束") > -1 && (l1i1iIIi = false);
            if (typeof iIi1illI.data !== "undefined" && typeof iIi1illI.data.groupData !== "undefined" && typeof iIi1illI.data.groupData.groupInfo !== "undefined") {
              for (let i11iIi1i of iIi1illI.data.groupData.groupInfo || []) {
                i11iIi1i.status == 2 && (await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await lIiiIll("", 2));
              }
            }
          } else console.log(i1Iliili);
        }
      } catch (lilIl111) {
        $.logErr(lilIl111, II11l11i);
      } finally {
        iI1I1i11(l1i1iIIi);
      }
    });
  });
}
function iilll1() {
  if ($.shareCodeArr[$.UserName]) return;
  return new Promise(iil1ii1l => {
    let iIlIIll1 = {
      "url": "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22unionActId%22:%22" + IlI111l + "%22,%22actId%22:%22" + $.actId + "%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22" + rebateCode + "%22,%22supportPic%22:2,%22supportLuckyCode%22:0,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=",
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + newCookie + " " + liIill1,
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html",
        "User-Agent": $.UA
      },
      "timeout": 15000
    };
    $.get(iIlIIll1, async (li1lIlil, iliiiIii, iII1III) => {
      try {
        if (li1lIlil) console.log("" + $.toStr(li1lIlil)), console.log($.name + " API请求失败，请检查网路重试");else {
          let illi11Ii = $.toObj(iII1III, iII1III);
          if (typeof illi11Ii == "object") {
            if (illi11Ii.code == 0 && illi11Ii.data && illi11Ii.data.shareUrl) {
              let li1iIl1I = illi11Ii.data.shareUrl.match(/\?s=([^&]+)/) && illi11Ii.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              li1iIl1I && ($.shareCodeArr[$.UserName] = {
                "code": li1iIl1I,
                "count": $.joinNum
              });
            }
          } else console.log(iII1III);
        }
      } catch (IIIiIlil) {
        $.logErr(IIIiIlil, iliiiIii);
      } finally {
        iil1ii1l();
      }
    });
  });
}
function ll1lIiil() {
  return new Promise(iIIIIli1 => {
    const iIli1i1i = {
      "url": $.url1,
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + newCookie + " " + liIill1,
        "User-Agent": $.UA
      },
      "timeout": 15000
    };
    $.get(iIli1i1i, async (illiIllI, illlii1, IlillIlI) => {
      try {
        i1Iil111(illlii1);
        $.url2 = illlii1 && illlii1.headers && (illlii1.headers.location || illlii1.headers.Location || "") || "";
        $.url2 = decodeURIComponent($.url2);
        $.url2 = $.url2.match(/(https:\/\/pro[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/pro[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
      } catch (IlI1l1iI) {
        $.logErr(IlI1l1iI, illlii1);
      } finally {
        iIIIIli1(IlillIlI);
      }
    });
  });
}
function lil1I11i() {
  return new Promise(I1lIi11l => {
    const li1llI1 = {
      "url": "https://u.jd.com/" + rebateCode + ($.shareCode && "?s=" + $.shareCode || ""),
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + newCookie + " " + liIill1,
        "User-Agent": $.UA
      },
      "timeout": 15000
    };
    $.get(li1llI1, async (IIIiI1il, lll1iil, l1IiIii1) => {
      try {
        i1Iil111(lll1iil);
        $.url1 = l1IiIii1 && l1IiIii1.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && l1IiIii1.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
      } catch (I1IIili) {
        $.logErr(I1IIili, lll1iil);
      } finally {
        I1lIi11l(l1IiIii1);
      }
    });
  });
}
function IiIIilI(iiii) {
  return new Promise(IIl11l1 => {
    const lIl11Ill = {
      "url": "https://gia.jd.com/fcf.html?a=" + iiii.a,
      "body": "d=" + iiii.d,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": $.UA
      },
      "timeout": 15000
    };
    $.post(lIl11Ill, async (l11I1iiI, i1lliiII, llIIiIii) => {
      try {
        if (l11I1iiI) {
          throw new Error(l11I1iiI);
        } else llIIiIii.indexOf("*_*") > 0 ? (llIIiIii = llIIiIii.split("*_*", 2), llIIiIii = JSON.parse(llIIiIii[1]), $.eid = llIIiIii.eid) : console.log("京东api返回数据为空，请检查自身原因");
      } catch (iiiillIl) {
        $.logErr(iiiillIl, i1lliiII);
      } finally {
        IIl11l1(llIIiIii);
      }
    });
  });
}
function i1Iil111(I1IlII1l) {
  let Il1111I = I1IlII1l && I1IlII1l.headers && (I1IlII1l.headers["set-cookie"] || I1IlII1l.headers["Set-Cookie"] || "") || "",
    ili11iI = "";
  if (Il1111I) {
    if (typeof Il1111I != "object") ili11iI = Il1111I.split(",");else ili11iI = Il1111I;
    for (let iliili1i of ili11iI) {
      let i1i11llI = iliili1i.split(";")[0].trim();
      if (i1i11llI.split("=")[1]) {
        i1i11llI.split("=")[0] == "unpl" && i1i11llI.split("=")[1] && ($.unpl = i1i11llI.split("=")[1]);
        if (newCookie.indexOf(i1i11llI.split("=")[1]) == -1) newCookie += i1i11llI.replace(/ /g, "") + "; ";
      }
    }
  }
}
function lilillI1(lIli111i = 1) {
  lIli111i = 1;
  if (lIli111i == 2) {
    $.UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";
  } else {
    let iiilIilI = $.CryptoJS.SHA1($.UserName + "reds").toString();
    $.UA = "jdapp;iPhone;12.1.4;14.3;" + iiilIilI + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
  }
}
function IliI1l1I(iiIllii1) {
  if (typeof iiIllii1 == "string") try {
    return JSON.parse(iiIllii1);
  } catch (i1II1l) {
    return console.log(i1II1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function liIIill(ll1ll1Ii) {
  return new Promise(IIlll1I1 => setTimeout(IIlll1I1, ll1ll1Ii));
}
async function i1I1lI1l() {
  try {
    const {
      JSDOM: Illli11i
    } = llI1li1;
    let ilI1li1i = {
      "url": "https://pro.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html?unionActId=" + IlI111l + "&d=" + rebateCode + "&cu=true&utm_source=kong&utm_medium=jingfen",
      "referrer": "https://u.jd.com/",
      "userAgent": "jdapp;iPhone;12.1.4;14.3;;M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "runScripts": "dangerously",
      "resources": new llI1li1.ResourceLoader({
        "userAgent": "jdapp;iPhone;12.1.4;14.3;;M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "referrer": "https://u.jd.com/"
      }),
      "includeNodeLocations": true,
      "storageQuota": 10000000,
      "pretendToBeVisual": true,
      "virtualConsole": new llI1li1.VirtualConsole()
    };
    const lIlIii1l = new Illli11i("<body>\n        <script src=\"https://static.360buyimg.com/siteppStatic/script/mescroll/map.js\"></script>\n        <script src=\"https://storage.360buyimg.com/webcontainer/js_security_v3.js\"></script>\n        <script src=\"https://static.360buyimg.com/siteppStatic/script/utils.js\"></script>\n        </body>", ilI1li1i);
    await liIIill(1000);
    llII1iIl = lIlIii1l.window;
  } catch (i11lIl11) {
    console.log(i11lIl11);
  }
}
async function Ii1i1Ii(IIIIii1I, IIIlII) {
  if (!$.getH5st_WQ_Arr[$.UserName]) $.getH5st_WQ_Arr[$.UserName] = {};
  let I1iiIli1 = $.getH5st_WQ_Arr[$.UserName];
  return !llII1iIl && (await i1I1lI1l()), llII1iIl.localStorage.setItem("WQ__dy_tk_s_" + IIIIii1I, I1iiIli1["WQ__dy_tk_s_" + IIIIii1I] || ""), llII1iIl.localStorage.setItem("WQ__dy_algo_s_" + IIIIii1I, I1iiIli1["WQ__dy_algo_s_" + IIIIii1I] || ""), llII1iIl.localStorage.setItem("WQ_qe_" + IIIIii1I, I1iiIli1["WQ_qe_" + IIIIii1I] || ""), new Promise(async l1i11iIi => {
    let iiil1ilI = "";
    try {
      if (typeof llII1iIl.signWaap === "function") iiil1ilI = await llII1iIl.signWaap(IIIIii1I, IIIlII);else {
        let I11I11Il = 0;
        timer = setInterval(async () => {
          I11I11Il++;
          if (typeof llII1iIl.signWaap === "function") {
            clearInterval(timer);
            timer = null;
            iiil1ilI = await llII1iIl.signWaap(IIIIii1I, IIIlII);
          }
          I11I11Il >= 100 && clearInterval(timer);
        }, 100);
      }
    } catch (IIllIlil) {
      console.log(IIllIlil);
    } finally {
      iiil1ilI && (I1iiIli1["WQ__dy_tk_s_" + IIIIii1I] = llII1iIl.localStorage.getItem("WQ__dy_tk_s_" + IIIIii1I), I1iiIli1["WQ__dy_algo_s_" + IIIIii1I] = llII1iIl.localStorage.getItem("WQ__dy_algo_s_" + IIIIii1I), I1iiIli1["WQ_qe_" + IIIIii1I] = llII1iIl.localStorage.getItem("WQ_qe_" + IIIIii1I));
      l1i11iIi(iiil1ilI);
    }
  });
}
function iiIl11iI() {
  class l1I1ilII {
    constructor() {
      this.UVCookie = "";
      this.ltr = 0;
      this.mr = [1, 0];
      this.document = {
        "cookie": "",
        "cookies": "__jdc=123;",
        "domain": "pro.m.jd.com",
        "referrer": "https://u.jd.com/",
        "location": {
          "href": "https://pro.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html",
          "hrefs": "https://pro.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html"
        }
      };
      this.navigator = {
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        "userAgents": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
      };
      this.window = {};
    }
    ["getUVCookie"](lil111II = "", lII1I111 = "", IlIill1l = "", ll11II1 = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (IlIill1l) this.document.location.href = IlIill1l;
        if (ll11II1) this.document.cookie = ll11II1;
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (lil111II) this.navigator.userAgent = lil111II;
        return this.lr = {
          "ckJda": "__jda",
          "ckJdb": "__jdb",
          "ckJdv": "__jdv",
          "ckJdc": "__jdc",
          "refUrl": "https://u.jd.com/"
        }, this.q(), this.s(lII1I111), this.UVCookie;
      } catch (lI1lI11) {
        console.log(lI1lI11);
      }
    }
    ["s"](i1I1IIl = "") {
      var Il1iiIli,
        IIi1IiI,
        lIiii1Il,
        IllIl1l,
        I1iil1Il = (this.getCookie(this.lr.ckJda) || "").split("."),
        lilI1IlI = (this.getCookie(this.lr.ckJdb) || "").split("."),
        I1I1IlIi = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        IiIl1iil = this.getCookie(this.lr.ckJdc) || "",
        Ill1I1Ii = parseInt((new Date().getTime() - this.ltr) / 1000),
        llliII = 0,
        liilIll = 1,
        i1II11II = "direct",
        I1IIllIl = "-",
        iI1lIIiI = "none",
        l111I1ii = "-";
      if (I1iil1Il.length > 3) for (var lIili1Il = 2; lIili1Il < 5 && lIili1Il < I1iil1Il.length; lIili1Il++) {
        var Il11Iil1 = I1iil1Il[lIili1Il];
        Il11Iil1.length > 10 && (I1iil1Il[lIili1Il] = Il11Iil1.substr(0, 10));
      }
      I1iil1Il.length > 5 ? (lIiii1Il = I1iil1Il[0], IllIl1l = I1iil1Il[1], Il1iiIli = parseInt(I1iil1Il[2], 10), IIi1IiI = parseInt(I1iil1Il[3], 10), Ill1I1Ii = parseInt(I1iil1Il[4], 10), liilIll = parseInt(I1iil1Il[5], 10) || liilIll) : (IllIl1l = this.genUuid(), Il1iiIli = Ill1I1Ii, IIi1IiI = Ill1I1Ii);
      this.lr.uuid = IllIl1l;
      lilI1IlI.length > 3 && (lIiii1Il || (lIiii1Il = lilI1IlI[0]), llliII = parseInt(lilI1IlI[1], 10) || 0);
      I1I1IlIi.length > 4 && (lIiii1Il || (lIiii1Il = I1I1IlIi[0]), i1II11II = I1I1IlIi[1], I1IIllIl = I1I1IlIi[2], iI1lIIiI = I1I1IlIi[3], l111I1ii = I1I1IlIi[4]);
      IiIl1iil && "" !== IiIl1iil && (lIiii1Il || (lIiii1Il = IiIl1iil));
      var I11lI11l,
        iIl1ii1I = [],
        l1lI1ill = lilI1IlI.length < 4,
        IlI1li1l = this.getParameter("utm_source"),
        III1liII = false;
      if (IlI1li1l) {
        var iliI1ii1 = this.getParameter("utm_campaign"),
          il111iiI = this.getParameter("utm_medium"),
          lIIlI = this.getParameter("utm_term");
        iIl1ii1I.push(IlI1li1l || i1II11II);
        iIl1ii1I.push(iliI1ii1 || I1IIllIl);
        iIl1ii1I.push(il111iiI || iI1lIIiI);
        iIl1ii1I.push(lIIlI || l111I1ii);
        l111I1ii = iIl1ii1I[3];
        III1liII = !0;
      } else {
        var IIlIiI,
          Iii1ll11 = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          IlIiIli1 = false;
        if (Iii1ll11 && Iii1ll11.indexOf(this.lr.ckDomain) < 0) {
          for (IIlIiI = this.lr.seo, lIili1Il = 0; lIili1Il < IIlIiI.length; lIili1Il++) {
            var ii1l1il1 = IIlIiI[lIili1Il].split(":");
            if (Iii1ll11.indexOf(ii1l1il1[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((ii1l1il1[1] + "=").toLowerCase()) > -1) {
              var lI11III1 = this.getParameter(ii1l1il1[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(lI11III1) && (lI11III1 = encodeURIComponent(lI11III1));
              iIl1ii1I.push(ii1l1il1[0]);
              iIl1ii1I.push("-");
              iIl1ii1I.push("organic");
              iIl1ii1I.push(lI11III1 || "not set");
              l111I1ii = iIl1ii1I[3];
              IlIiIli1 = !0;
              break;
            }
          }
          IlIiIli1 || (Iii1ll11.indexOf("zol.com.cn") > -1 ? (iIl1ii1I.push("zol.com.cn"), iIl1ii1I.push("-"), iIl1ii1I.push("cpc"), iIl1ii1I.push("not set")) : (iIl1ii1I.push(Iii1ll11), iIl1ii1I.push("-"), iIl1ii1I.push("referral"), iIl1ii1I.push("-")));
        }
      }
      I11lI11l = iIl1ii1I.length > 0 && (iIl1ii1I[0] !== i1II11II || iIl1ii1I[1] !== I1IIllIl || iIl1ii1I[2] !== iI1lIIiI) && "referral" !== iIl1ii1I[2];
      l1lI1ill || !l1lI1ill && I11lI11l ? (i1II11II = iIl1ii1I[0] || i1II11II, I1IIllIl = iIl1ii1I[1] || I1IIllIl, iI1lIIiI = iIl1ii1I[2] || iI1lIIiI, l111I1ii = iIl1ii1I[3] || l111I1ii, I1iil1Il.length > 5 ? (Il1iiIli = parseInt(I1iil1Il[2], 10), IIi1IiI = parseInt(I1iil1Il[4], 10), Ill1I1Ii = parseInt((new Date().getTime() - this.ltr) / 1000), liilIll++, llliII = 1) : (liilIll = 1, llliII = 1)) : llliII++;
      var IIli1111 = this.getPageParamFromSdk();
      if (IIli1111 && IIli1111.vts) {
        var l1liiIi = 1 * IIli1111.vts,
          iiII1iI1 = 1 * IIli1111.seq;
        (l1liiIi > liilIll || l1liiIi === liilIll && iiII1iI1 >= llliII) && (liilIll = l1liiIi, llliII = iiII1iI1 + 1);
      }
      if (lIiii1Il || (lIiii1Il = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [lIiii1Il, IllIl1l, Il1iiIli, IIi1IiI, Ill1I1Ii, liilIll || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [lIiii1Il, llliII, IllIl1l + "|" + liilIll, Ill1I1Ii].join("."), this.lr.ckDomain, this.lr.ckJdbExp), III1liII || I11lI11l || I1I1IlIi.length < 5) {
        var IiliI1li = [lIiii1Il, i1II11II || "direct", I1IIllIl || "-", iI1lIIiI || "none", l111I1ii || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(IiliI1li = encodeURIComponent(IiliI1li), lIiii1Il);
      }
      this.setCookie(this.lr.ckJdc, lIiii1Il, this.lr.ckDomain);
    }
    ["q"]() {
      this.lr.rpDomain = this.lr.rpDomain || "uranus.jd.com";
      this.lr.logUrl = "//" + this.lr.rpDomain + "/log/m";
      this.lr.logType = {
        "pv": "1",
        "pf": "2",
        "cl": "3",
        "od": "4",
        "pd": "5",
        "hm": "6",
        "magic": "000001"
      };
      this.lr.useTmpCookie ? (this.lr.ckJda = "__tra", this.lr.ckJdb = "__trb", this.lr.ckJdc = "__trc", this.lr.ckJdu = "__tru") : (this.lr.ckJda = "__jda", this.lr.ckJdb = "__jdb", this.lr.ckJdc = "__jdc", this.lr.ckJdu = "__jdu");
      this.lr.ckJdv = "__jdv";
      this.lr.ckWxAppCk = "__jdwxapp";
      this.lr.ckRefCls = "__jd_ref_cls";
      this.lr.ckJdaExp = 15552000000;
      this.lr.ckJdbExp = 1800000;
      this.lr.ckJduExp = 15552000000;
      this.lr.ckJdvExp = 1296000000;
      this.lr.ckJdvEmbeddedExp = 86400000;
      this.lr.ckWxAppCkExp = 15552000000;
      this.lr.mtSubsiteExp = 31536000000;
      this.lr.ckDomain = (this.document.domain.match(/[^.]+\.(com.cn|net.cn|org.cn|gov.cn|edu.cn)$/) || [""])[0] || this.document.domain.replace(/.*?([^.]+\.[^.]+)$/, "$1");
      this.lr.title = this.document.title;
      this.lr.refUrl = this.document.referrer;
      this.lr.seo = ["i.easou.com:q", "m.baidu.com:word", "m.sm.cn:q", "m.so.com:q", "wap.sogou.com:keyword", "m.sogou.com:keyword", "wap.sogo.com:keyword", "m.sogo.com:keyword", "page.roboo.com:q", "ask.com:q", "baidu:word", "baidu:wd", "bing:q", "easou:q", "google:q", "roboo:word", "roboo:q", "sm.cn:q", "so.com:q", "sogou:keyword", "sogou:query", "sogo.com:keyword", "sogo.com:query", "yahoo:p", "yandex:text", "yicha:key"];
    }
    ["setCookie"](lIII1iil, ilIIIIi, IlIIIIil, ilil1lI) {
      if (lIII1iil) {
        var lillIl1i = "";
        if (ilil1lI) {
          var lllii1Il = new Date();
          lllii1Il.setTime(lllii1Il.getTime() - this.ltr + ilil1lI);
          lillIl1i = ";expires=" + lllii1Il.toGMTString();
        }
        this.UVCookie += lIII1iil + "=" + ilIIIIi + "; ";
      }
    }
    ["setJdv"](iiII1IiI, l1111l11, IIiliiIi) {
      var Ii1I1iIi = "";
      Ii1I1iIi = this.isPrey(10) && (!iiII1IiI || iiII1IiI.length > 400) ? l1111l11 + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : iiII1IiI;
      var iiIl1i1I = IIiliiIi || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", Ii1I1iIi, this.lr.ckDomain, iiIl1i1I);
    }
    ["getCookie"](il1lll1, liIIiiI1) {
      var iiil1lII = this.document.cookie.match(new RegExp("(^| )" + il1lll1 + "=([^;]*)(;|$)"));
      return null !== iiil1lII ? liIIiiI1 ? iiil1lII[2] : this.urlDecode(iiil1lII[2]) : "";
    }
    ["genUuid"]() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    ["getParameter"](Iili1i, iiiii1il) {
      var IiII1ill = iiiii1il || this.document.location.href,
        l1IlIlI = new RegExp("(?:^|&|[?]|[/])" + Iili1i + "=([^&]*)").exec(IiII1ill);
      return l1IlIlI ? this.urlDecode(l1IlIlI[1]) : null;
    }
    ["urlDecode"](i1liliii) {
      try {
        return decodeURIComponent(i1liliii);
      } catch (Il1l) {
        return i1liliii;
      }
    }
    ["genHash"](ii1lIi) {
      var IlIiiilI,
        iIl1lli = 1,
        liIl1iI1 = 0;
      if (ii1lIi) for (iIl1lli = 0, IlIiiilI = ii1lIi.length - 1; IlIiiilI >= 0; IlIiiilI--) {
        iIl1lli = 0 !== (liIl1iI1 = 266338304 & (iIl1lli = (iIl1lli << 6 & 268435455) + (liIl1iI1 = ii1lIi.charCodeAt(IlIiiilI)) + (liIl1iI1 << 14))) ? iIl1lli ^ liIl1iI1 >> 21 : iIl1lli;
      }
      return iIl1lli;
    }
    ["isPrey"](l1l1lIl) {
      if (l1l1lIl >= 100) return !0;
      var I1l1I = this.lr.uuid,
        iIll1I1 = I1l1I.substr(I1l1I.length - 2);
      return !!iIll1I1 && 1 * iIll1I1 < l1l1lIl;
    }
    ["isEmbedded"]() {
      var Ili1l1ll = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(Ili1l1ll) || this.isJdLog();
    }
    ["isJdLog"]() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    ["getPageParamFromSdk"]() {
      var II11IiiI, lIli1llI;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? lIli1llI = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? lIli1llI = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (lIli1llI = this.window.prompt("JDMAGetMPageParam", ""));
        lIli1llI && (II11IiiI = JSON.parse(lIli1llI));
      } catch (i111lI1I) {}
      return II11IiiI;
    }
    ["time"](i1iIIi11, IIiii11l = null) {
      const IilIIii = IIiii11l ? new Date(IIiii11l) : new Date();
      let ii1IIii = {
        "M+": IilIIii.getMonth() + 1,
        "d+": IilIIii.getDate(),
        "H+": IilIIii.getHours(),
        "m+": IilIIii.getMinutes(),
        "s+": IilIIii.getSeconds(),
        "q+": Math.floor((IilIIii.getMonth() + 3) / 3),
        "S": IilIIii.getMilliseconds()
      };
      /(y+)/.test(i1iIIi11) && (i1iIIi11 = i1iIIi11.replace(RegExp.$1, (IilIIii.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let il1liII in ii1IIii) new RegExp("(" + il1liII + ")").test(i1iIIi11) && (i1iIIi11 = i1iIIi11.replace(RegExp.$1, 1 == RegExp.$1.length ? ii1IIii[il1liII] : ("00" + ii1IIii[il1liII]).substr(("" + ii1IIii[il1liII]).length)));
      return i1iIIi11;
    }
  }
  Il111Ii = new l1I1ilII();
}
function I11iilil() {
  return new Promise(async iIlil1l => {
    $.get({
      "url": IllI1Ii1,
      "timeout": {
        "request": 5000
      }
    }, (lIl1Illl, Ilil11il) => {
      if (Ilil11il) {
        try {
          let I1il1Il1 = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            IIllIiI1 = I1il1Il1.exec(Ilil11il.body);
          i1I1iIlI = IIllIiI1[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1I1iIlI;
        } catch (Il1iili) {} finally {
          iIlil1l();
        }
      }
    });
  });
}

function lIIli1I(I1lIil, lllillll) {
  return Math.floor(Math.random() * (lllillll - I1lIil)) + I1lIil;
}
function randomString(e){e=e||32;let t='abcdef0123456789',a=t.length,n='';for(i=0;i<e;i++)n+=t.charAt(Math.floor(Math.random()*a));return n}
const navigator={userAgent:`jdapp;iPhone;12.1.4;14.3;${$.CryptoJS.SHA1(randomString(40)).toString()};M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0(iPhone;CPU iPhone OS 14_3 like Mac OS X)AppleWebKit/605.1.15(KHTML,like Gecko)Mobile/15E148;supportJDSHWK/1`,plugins:{length:0},language:'zh-CN',};const screen={availHeight:812,availWidth:375,colorDepth:24,height:812,width:375,pixelDepth:24,};const window={};const document={location:{ancestorOrigins:{},href:'https://pro.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html',origin:'https://pro.m.jd.com',protocol:'https:',host:'pro.m.jd.com',hostname:'pro.m.jd.com',port:'',pathname:'/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html',search:'',hash:'',},};var start_time=new Date().getTime(),_jdfp_canvas_md5='',_jdfp_webgl_md5='',_fingerprint_step=1,_JdEid='',_eidFlag=!1,risk_jd_local_fingerprint='',_jd_e_joint_;function generateUuid(){var t=Math;for(var g='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split(''),m=0,a=g.length;m<a;m++)switch(g[m]){case'x':g[m]=t.floor(16*t.random()).toString(16);break;case'y':g[m]=(t.floor(4*t.random())+8).toString(16)}return g.join('')}function t(a){if(null==a||void 0==a||''==a)return'NA';if(null==a||void 0==a||''==a)var b='';else{b=[];for(var c=0;c<8*a.length;c+=8)b[c>>5]|=(a.charCodeAt(c/8)&255)<<c%32}a=8*a.length;b[a>>5]|=128<<a%32;b[(((a+64)>>>9)<<4)+14]=a;a=1732584193;c=-271733879;for(var l=-1732584194,h=271733878,q=0;q<b.length;q+=16){var z=a,C=c,D=l,B=h;a=v(a,c,l,h,b[q+0],7,-680876936);h=v(h,a,c,l,b[q+1],12,-389564586);l=v(l,h,a,c,b[q+2],17,606105819);c=v(c,l,h,a,b[q+3],22,-1044525330);a=v(a,c,l,h,b[q+4],7,-176418897);h=v(h,a,c,l,b[q+5],12,1200080426);l=v(l,h,a,c,b[q+6],17,-1473231341);c=v(c,l,h,a,b[q+7],22,-45705983);a=v(a,c,l,h,b[q+8],7,1770035416);h=v(h,a,c,l,b[q+9],12,-1958414417);l=v(l,h,a,c,b[q+10],17,-42063);c=v(c,l,h,a,b[q+11],22,-1990404162);a=v(a,c,l,h,b[q+12],7,1804603682);h=v(h,a,c,l,b[q+13],12,-40341101);l=v(l,h,a,c,b[q+14],17,-1502002290);c=v(c,l,h,a,b[q+15],22,1236535329);a=x(a,c,l,h,b[q+1],5,-165796510);h=x(h,a,c,l,b[q+6],9,-1069501632);l=x(l,h,a,c,b[q+11],14,643717713);c=x(c,l,h,a,b[q+0],20,-373897302);a=x(a,c,l,h,b[q+5],5,-701558691);h=x(h,a,c,l,b[q+10],9,38016083);l=x(l,h,a,c,b[q+15],14,-660478335);c=x(c,l,h,a,b[q+4],20,-405537848);a=x(a,c,l,h,b[q+9],5,568446438);h=x(h,a,c,l,b[q+14],9,-1019803690);l=x(l,h,a,c,b[q+3],14,-187363961);c=x(c,l,h,a,b[q+8],20,1163531501);a=x(a,c,l,h,b[q+13],5,-1444681467);h=x(h,a,c,l,b[q+2],9,-51403784);l=x(l,h,a,c,b[q+7],14,1735328473);c=x(c,l,h,a,b[q+12],20,-1926607734);a=u(c^l^h,a,c,b[q+5],4,-378558);h=u(a^c^l,h,a,b[q+8],11,-2022574463);l=u(h^a^c,l,h,b[q+11],16,1839030562);c=u(l^h^a,c,l,b[q+14],23,-35309556);a=u(c^l^h,a,c,b[q+1],4,-1530992060);h=u(a^c^l,h,a,b[q+4],11,1272893353);l=u(h^a^c,l,h,b[q+7],16,-155497632);c=u(l^h^a,c,l,b[q+10],23,-1094730640);a=u(c^l^h,a,c,b[q+13],4,681279174);h=u(a^c^l,h,a,b[q+0],11,-358537222);l=u(h^a^c,l,h,b[q+3],16,-722521979);c=u(l^h^a,c,l,b[q+6],23,76029189);a=u(c^l^h,a,c,b[q+9],4,-640364487);h=u(a^c^l,h,a,b[q+12],11,-421815835);l=u(h^a^c,l,h,b[q+15],16,530742520);c=u(l^h^a,c,l,b[q+2],23,-995338651);a=w(a,c,l,h,b[q+0],6,-198630844);h=w(h,a,c,l,b[q+7],10,1126891415);l=w(l,h,a,c,b[q+14],15,-1416354905);c=w(c,l,h,a,b[q+5],21,-57434055);a=w(a,c,l,h,b[q+12],6,1700485571);h=w(h,a,c,l,b[q+3],10,-1894986606);l=w(l,h,a,c,b[q+10],15,-1051523);c=w(c,l,h,a,b[q+1],21,-2054922799);a=w(a,c,l,h,b[q+8],6,1873313359);h=w(h,a,c,l,b[q+15],10,-30611744);l=w(l,h,a,c,b[q+6],15,-1560198380);c=w(c,l,h,a,b[q+13],21,1309151649);a=w(a,c,l,h,b[q+4],6,-145523070);h=w(h,a,c,l,b[q+11],10,-1120210379);l=w(l,h,a,c,b[q+2],15,718787259);c=w(c,l,h,a,b[q+9],21,-343485551);a=A(a,z);c=A(c,C);l=A(l,D);h=A(h,B)}b=[a,c,l,h];a='';for(c=0;c<4*b.length;c++)a+='0123456789abcdef'.charAt((b[c>>2]>>((c%4)*8+4))&15)+'0123456789abcdef'.charAt((b[c>>2]>>((c%4)*8))&15);return a}function u(a,b,c,l,h,q){a=A(A(b,a),A(l,q));return A((a<<h)|(a>>>(32-h)),c)}function v(a,b,c,l,h,q,z){return u((b&c)|(~b&l),a,b,h,q,z)}function x(a,b,c,l,h,q,z){return u((b&l)|(c&~l),a,b,h,q,z)}function w(a,b,c,l,h,q,z){return u(c^(b|~l),a,b,h,q,z)}function A(a,b){var c=(a&65535)+(b&65535);return(((a>>16)+(b>>16)+(c>>16))<<16)|(c&65535)}_fingerprint_step=2;var y='',n=navigator.userAgent.toLowerCase();n.indexOf('jdapp')&&(n=n.substring(0,90));var e=navigator.language,f=n;-1!=f.indexOf('ipad')||-1!=f.indexOf('iphone os')||-1!=f.indexOf('midp')||-1!=f.indexOf('rv:1.2.3.4')||-1!=f.indexOf('ucweb')||-1!=f.indexOf('android')||-1!=f.indexOf('windows ce')||f.indexOf('windows mobile');var r='NA',k='NA';try{-1!=f.indexOf('win')&&-1!=f.indexOf('95')&&((r='windows'),(k='95')),-1!=f.indexOf('win')&&-1!=f.indexOf('98')&&((r='windows'),(k='98')),-1!=f.indexOf('win 9x')&&-1!=f.indexOf('4.90')&&((r='windows'),(k='me')),-1!=f.indexOf('win')&&-1!=f.indexOf('nt 5.0')&&((r='windows'),(k='2000')),-1!=f.indexOf('win')&&-1!=f.indexOf('nt')&&((r='windows'),(k='NT')),-1!=f.indexOf('win')&&-1!=f.indexOf('nt 5.1')&&((r='windows'),(k='xp')),-1!=f.indexOf('win')&&-1!=f.indexOf('32')&&((r='windows'),(k='32')),-1!=f.indexOf('win')&&-1!=f.indexOf('nt 5.1')&&((r='windows'),(k='7')),-1!=f.indexOf('win')&&-1!=f.indexOf('6.0')&&((r='windows'),(k='8')),-1==f.indexOf('win')||(-1==f.indexOf('nt 6.0')&&-1==f.indexOf('nt 6.1'))||((r='windows'),(k='9')),-1!=f.indexOf('win')&&-1!=f.indexOf('nt 6.2')&&((r='windows'),(k='10')),-1!=f.indexOf('linux')&&(r='linux'),-1!=f.indexOf('unix')&&(r='unix'),-1!=f.indexOf('sun')&&-1!=f.indexOf('os')&&(r='sun os'),-1!=f.indexOf('ibm')&&-1!=f.indexOf('os')&&(r='ibm os/2'),-1!=f.indexOf('mac')&&-1!=f.indexOf('pc')&&(r='mac'),-1!=f.indexOf('aix')&&(r='aix'),-1!=f.indexOf('powerpc')&&(r='powerPC'),-1!=f.indexOf('hpux')&&(r='hpux'),-1!=f.indexOf('netbsd')&&(r='NetBSD'),-1!=f.indexOf('bsd')&&(r='BSD'),-1!=f.indexOf('osf1')&&(r='OSF1'),-1!=f.indexOf('irix')&&((r='IRIX'),(k='')),-1!=f.indexOf('freebsd')&&(r='FreeBSD'),-1!=f.indexOf('symbianos')&&((r='SymbianOS'),(k=f.substring(f.indexOf('SymbianOS/')+10,3)))}catch(a){}_fingerprint_step=3;var g='NA',m='NA';try{-1!=f.indexOf('msie')&&((g='ie'),(m=f.substring(f.indexOf('msie ')+5)),m.indexOf(';')&&(m=m.substring(0,m.indexOf(';'))));-1!=f.indexOf('firefox')&&((g='Firefox'),(m=f.substring(f.indexOf('firefox/')+8)));-1!=f.indexOf('opera')&&((g='Opera'),(m=f.substring(f.indexOf('opera/')+6,4)));-1!=f.indexOf('safari')&&((g='safari'),(m=f.substring(f.indexOf('safari/')+7)));-1!=f.indexOf('chrome')&&((g='chrome'),(m=f.substring(f.indexOf('chrome/')+7)),m.indexOf(' ')&&(m=m.substring(0,m.indexOf(' '))));-1!=f.indexOf('navigator')&&((g='navigator'),(m=f.substring(f.indexOf('navigator/')+10)));-1!=f.indexOf('applewebkit')&&((g='applewebkit_chrome'),(m=f.substring(f.indexOf('applewebkit/')+12)),m.indexOf(' ')&&(m=m.substring(0,m.indexOf(' '))));-1!=f.indexOf('sogoumobilebrowser')&&(g='\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668');if(-1!=f.indexOf('ucbrowser')||-1!=f.indexOf('ucweb'))g='UC\u6d4f\u89c8\u5668';if(-1!=f.indexOf('qqbrowser')||-1!=f.indexOf('tencenttraveler'))g='QQ\u6d4f\u89c8\u5668';-1!=f.indexOf('metasr')&&(g='\u641c\u72d7\u6d4f\u89c8\u5668');-1!=f.indexOf('360se')&&(g='360\u6d4f\u89c8\u5668');-1!=f.indexOf('the world')&&(g='\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668');-1!=f.indexOf('maxthon')&&(g='\u9068\u6e38\u6d4f\u89c8\u5668')}catch(a){}class JdJrTdRiskFinger{f={options:function(){return{}},nativeForEach:Array.prototype.forEach,nativeMap:Array.prototype.map,extend:function(a,b){if(null==a)return b;for(var c in a)null!=a[c]&&b[c]!==a[c]&&(b[c]=a[c]);return b},getData:function(){return y},get:function(a){var b=1*m,c=[];'ie'==g&&7<=b?(c.push(n),c.push(e),(y=y+",'userAgent':'"+t(n)+"','language':'"+e+"'"),this.browserRedirect(n)):((c=this.userAgentKey(c)),(c=this.languageKey(c)));c.push(g);c.push(m);c.push(r);c.push(k);y=y+",'os':'"+r+"','osVersion':'"+k+"','browser':'"+g+"','browserVersion':'"+m+"'";c=this.colorDepthKey(c);c=this.screenResolutionKey(c);c=this.timezoneOffsetKey(c);c=this.sessionStorageKey(c);c=this.localStorageKey(c);c=this.indexedDbKey(c);c=this.addBehaviorKey(c);c=this.openDatabaseKey(c);c=this.cpuClassKey(c);c=this.platformKey(c);c=this.hardwareConcurrencyKey(c);c=this.doNotTrackKey(c);c=this.pluginsKey(c);c=this.canvasKey(c);c=this.webglKey(c);b=this.x64hash128(c.join('~~~'),31);return a(b)},userAgentKey:function(a){a.push(navigator.userAgent),(y=y+",'userAgent':'"+t(navigator.userAgent)+"'"),this.browserRedirect(navigator.userAgent);return a},replaceAll:function(a,b,c){for(;0<=a.indexOf(b);)a=a.replace(b,c);return a},browserRedirect:function(a){var b=a.toLowerCase();a='ipad'==b.match(/ipad/i);var c='iphone os'==b.match(/iphone os/i),l='midp'==b.match(/midp/i),h='rv:1.2.3.4'==b.match(/rv:1.2.3.4/i),q='ucweb'==b.match(/ucweb/i),z='android'==b.match(/android/i),C='windows ce'==b.match(/windows ce/i);b='windows mobile'==b.match(/windows mobile/i);y=a||c||l||h||q||z||C||b?y+",'origin':'mobile'":y+",'origin':'pc'"},languageKey:function(a){''||(a.push(navigator.language),(y=y+",'language':'"+this.replaceAll(navigator.language,' ','_')+"'"));return a},colorDepthKey:function(a){''||(a.push(screen.colorDepth),(y=y+",'colorDepth':'"+screen.colorDepth+"'"));return a},screenResolutionKey:function(a){if(!this.options.excludeScreenResolution){var b=this.getScreenResolution();'undefined'!==typeof b&&(a.push(b.join('x')),(y=y+",'screenResolution':'"+b.join('x')+"'"))}return a},getScreenResolution:function(){return this.options.detectScreenOrientation?(screen.height>screen.width?[screen.height,screen.width]:[screen.width,screen.height]):[screen.height,screen.width]},timezoneOffsetKey:function(a){this.options.excludeTimezoneOffset||(a.push(new Date().getTimezoneOffset()),(y=y+",'timezoneOffset':'"+new Date().getTimezoneOffset()/60+"'"));return a},sessionStorageKey:function(a){!this.options.excludeSessionStorage&&this.hasSessionStorage()&&(a.push('sessionStorageKey'),(y+=",'sessionStorage':true"));return a},localStorageKey:function(a){!this.options.excludeSessionStorage&&this.hasLocalStorage()&&(a.push('localStorageKey'),(y+=",'localStorage':true"));return a},indexedDbKey:function(a){!this.options.excludeIndexedDB&&this.hasIndexedDB()&&(a.push('indexedDbKey'),(y+=",'indexedDb':true"));return a},addBehaviorKey:function(a){document.body&&!this.options.excludeAddBehavior&&document.body.addBehavior?(a.push('addBehaviorKey'),(y+=",'addBehavior':true")):(y+=",'addBehavior':false");return a},openDatabaseKey:function(a){!this.options.excludeOpenDatabase&&window.openDatabase?(a.push('openDatabase'),(y+=",'openDatabase':true")):(y+=",'openDatabase':false");return a},cpuClassKey:function(a){this.options.excludeCpuClass||(a.push(this.getNavigatorCpuClass()),(y=y+",'cpu':'"+this.getNavigatorCpuClass()+"'"));return a},platformKey:function(a){this.options.excludePlatform||(a.push(this.getNavigatorPlatform()),(y=y+",'platform':'"+this.getNavigatorPlatform()+"'"));return a},hardwareConcurrencyKey:function(a){var b=this.getHardwareConcurrency();a.push(b);y=y+",'ccn':'"+b+"'";return a},doNotTrackKey:function(a){this.options.excludeDoNotTrack||(a.push(this.getDoNotTrack()),(y=y+",'track':'"+this.getDoNotTrack()+"'"));return a},canvasKey:function(a){if(!this.options.excludeCanvas&&this.isCanvasSupported()){var b=this.getCanvasFp();a.push(b);_jdfp_canvas_md5=t(b);y=y+",'canvas':'"+_jdfp_canvas_md5+"'"}return a},webglKey:function(a){if(!this.options.excludeWebGL&&this.isCanvasSupported()){var b=this.getWebglFp();_jdfp_webgl_md5=t(b);a.push(b);y=y+",'webglFp':'"+_jdfp_webgl_md5+"'"}return a},pluginsKey:function(a){this.isIE()?(a.push(this.getIEPluginsString()),(y=y+",'plugins':'"+t(this.getIEPluginsString())+"'")):(a.push(this.getRegularPluginsString()),(y=y+",'plugins':'"+t(this.getRegularPluginsString())+"'"));return a},getRegularPluginsString:function(){return this.map(navigator.plugins,function(a){var b=this.map(a,function(c){return[c.type,c.suffixes].join('~')}).join(',');return[a.name,a.description,b].join('::')},this).join(';')},getIEPluginsString:function(){return window.ActiveXObject?this.map('AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1'.split(';'),function(a){try{return new ActiveXObject(a),a}catch(b){return null}}).join(';'):''},hasSessionStorage:function(){try{return!!window.sessionStorage}catch(a){return!0}},hasLocalStorage:function(){try{return!!window.localStorage}catch(a){return!0}},hasIndexedDB:function(){return true;return!!window.indexedDB},getNavigatorCpuClass:function(){return navigator.cpuClass?navigator.cpuClass:'NA'},getNavigatorPlatform:function(){return navigator.platform?navigator.platform:'NA'},getHardwareConcurrency:function(){return navigator.hardwareConcurrency?navigator.hardwareConcurrency:'NA'},getDoNotTrack:function(){return navigator.doNotTrack?navigator.doNotTrack:'NA'},getCanvasFp:function(){return'';var a=navigator.userAgent.toLowerCase();if((0<a.indexOf('jdjr-app')||0<=a.indexOf('jdapp'))&&(0<a.indexOf('iphone')||0<a.indexOf('ipad')))return null;a=document.createElement('canvas');var b=a.getContext('2d');b.fillStyle='red';b.fillRect(30,10,200,100);b.strokeStyle='#1a3bc1';b.lineWidth=6;b.lineCap='round';b.arc(50,50,20,0,Math.PI,!1);b.stroke();b.fillStyle='#42e1a2';b.font="15.4px 'Arial'";b.textBaseline='alphabetic';b.fillText('PR flacks quiz gym: TV DJ box when? \u2620',15,60);b.shadowOffsetX=1;b.shadowOffsetY=2;b.shadowColor='white';b.fillStyle='rgba(0, 0, 200, 0.5)';b.font="60px 'Not a real font'";b.fillText('No\u9a97',40,80);return a.toDataURL()},getWebglFp:function(){var a=navigator.userAgent;a=a.toLowerCase();if((0<a.indexOf('jdjr-app')||0<=a.indexOf('jdapp'))&&(0<a.indexOf('iphone')||0<a.indexOf('ipad')))return null;a=function(D){b.clearColor(0,0,0,1);b.enable(b.DEPTH_TEST);b.depthFunc(b.LEQUAL);b.clear(b.COLOR_BUFFER_BIT|b.DEPTH_BUFFER_BIT);return'['+D[0]+', '+D[1]+']'};var b=this.getWebglCanvas();if(!b)return null;var c=[],l=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,l);var h=new Float32Array([-0.2,-0.9,0,0.4,-0.26,0,0,0.732134444,0]);b.bufferData(b.ARRAY_BUFFER,h,b.STATIC_DRAW);l.itemSize=3;l.numItems=3;h=b.createProgram();var q=b.createShader(b.VERTEX_SHADER);b.shaderSource(q,'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}');b.compileShader(q);var z=b.createShader(b.FRAGMENT_SHADER);b.shaderSource(z,'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1)}');b.compileShader(z);b.attachShader(h,q);b.attachShader(h,z);b.linkProgram(h);b.useProgram(h);h.vertexPosAttrib=b.getAttribLocation(h,'attrVertex');h.offsetUniform=b.getUniformLocation(h,'uniformOffset');b.enableVertexAttribArray(h.vertexPosArray);b.vertexAttribPointer(h.vertexPosAttrib,l.itemSize,b.FLOAT,!1,0,0);b.uniform2f(h.offsetUniform,1,1);b.drawArrays(b.TRIANGLE_STRIP,0,l.numItems);null!=b.canvas&&c.push(b.canvas.toDataURL());c.push('extensions:'+b.getSupportedExtensions().join(';'));c.push('extensions:'+b.getSupportedExtensions().join(';'));c.push('w1'+a(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE)));c.push('w2'+a(b.getParameter(b.ALIASED_POINT_SIZE_RANGE)));c.push('w3'+b.getParameter(b.ALPHA_BITS));c.push('w4'+(b.getContextAttributes().antialias?'yes':'no'));c.push('w5'+b.getParameter(b.BLUE_BITS));c.push('w6'+b.getParameter(b.DEPTH_BITS));c.push('w7'+b.getParameter(b.GREEN_BITS));c.push('w8'+(function(D){var B,F=D.getExtension('EXT_texture_filter_anisotropic')||D.getExtension('WEBKIT_EXT_texture_filter_anisotropic')||D.getExtension('MOZ_EXT_texture_filter_anisotropic');return F?((B=D.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),0===B&&(B=2),B):null;})(b));c.push('w9'+b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS));c.push('w10'+b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE));c.push('w11'+b.getParameter(b.MAX_FRAGMENT_UNIFORM_VECTORS));c.push('w12'+b.getParameter(b.MAX_RENDERBUFFER_SIZE));c.push('w13'+b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS));c.push('w14'+b.getParameter(b.MAX_TEXTURE_SIZE));c.push('w15'+b.getParameter(b.MAX_VARYING_VECTORS));c.push('w16'+b.getParameter(b.MAX_VERTEX_ATTRIBS));c.push('w17'+b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS));c.push('w18'+b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS));c.push('w19'+a(b.getParameter(b.MAX_VIEWPORT_DIMS)));c.push('w20'+b.getParameter(b.RED_BITS));c.push('w21'+b.getParameter(b.RENDERER));c.push('w22'+b.getParameter(b.SHADING_LANGUAGE_VERSION));c.push('w23'+b.getParameter(b.STENCIL_BITS));c.push('w24'+b.getParameter(b.VENDOR));c.push('w25'+b.getParameter(b.VERSION));try{var C=b.getExtension('WEBGL_debug_renderer_info');C&&(c.push('wuv:'+b.getParameter(C.UNMASKED_VENDOR_WEBGL)),c.push('wur:'+b.getParameter(C.UNMASKED_RENDERER_WEBGL)));}catch(D){}return c.join('\u00a7');},isCanvasSupported:function(){return true;var a=document.createElement('canvas');return!(!a.getContext||!a.getContext('2d'));},isIE:function(){return'Microsoft Internet Explorer'===navigator.appName||('Netscape'===navigator.appName&&/Trident/.test(navigator.userAgent))?!0:!1;},getWebglCanvas:function(){return null;var a=document.createElement('canvas'),b=null;try{var c=navigator.userAgent;c=c.toLowerCase();((0<c.indexOf('jdjr-app')||0<=c.indexOf('jdapp'))&&(0<c.indexOf('iphone')||0<c.indexOf('ipad')))||(b=a.getContext('webgl')||a.getContext('experimental-webgl'));}catch(l){}b||(b=null);return b;},each:function(a,b,c){if(null!==a)if(this.nativeForEach&&a.forEach===this.nativeForEach)a.forEach(b,c);else if(a.length===+a.length)for(var l=0,h=a.length;l<h&&b.call(c,a[l],l,a)!=={};l++);else for(l in a)if(a.hasOwnProperty(l)&&b.call(c,a[l],l,a)==={})break;},map:function(a,b,c){var l=[];if(null==a)return l;if(this.nativeMap&&a.map===this.nativeMap)return a.map(b,c);this.each(a,function(h,q,z){l[l.length]=b.call(c,h,q,z);});return l;},x64Add:function(a,b){a=[a[0]>>>16,a[0]&65535,a[1]>>>16,a[1]&65535];b=[b[0]>>>16,b[0]&65535,b[1]>>>16,b[1]&65535];var c=[0,0,0,0];c[3]+=a[3]+b[3];c[2]+=c[3]>>>16;c[3]&=65535;c[2]+=a[2]+b[2];c[1]+=c[2]>>>16;c[2]&=65535;c[1]+=a[1]+b[1];c[0]+=c[1]>>>16;c[1]&=65535;c[0]+=a[0]+b[0];c[0]&=65535;return[(c[0]<<16)|c[1],(c[2]<<16)|c[3]];},x64Multiply:function(a,b){a=[a[0]>>>16,a[0]&65535,a[1]>>>16,a[1]&65535];b=[b[0]>>>16,b[0]&65535,b[1]>>>16,b[1]&65535];var c=[0,0,0,0];c[3]+=a[3]*b[3];c[2]+=c[3]>>>16;c[3]&=65535;c[2]+=a[2]*b[3];c[1]+=c[2]>>>16;c[2]&=65535;c[2]+=a[3]*b[2];c[1]+=c[2]>>>16;c[2]&=65535;c[1]+=a[1]*b[3];c[0]+=c[1]>>>16;c[1]&=65535;c[1]+=a[2]*b[2];c[0]+=c[1]>>>16;c[1]&=65535;c[1]+=a[3]*b[1];c[0]+=c[1]>>>16;c[1]&=65535;c[0]+=a[0]*b[3]+a[1]*b[2]+a[2]*b[1]+a[3]*b[0];c[0]&=65535;return[(c[0]<<16)|c[1],(c[2]<<16)|c[3]];},x64Rotl:function(a,b){b%=64;if(32===b)return[a[1],a[0]];if(32>b)return[(a[0]<<b)|(a[1]>>>(32-b)),(a[1]<<b)|(a[0]>>>(32-b))];b-=32;return[(a[1]<<b)|(a[0]>>>(32-b)),(a[0]<<b)|(a[1]>>>(32-b))];},x64LeftShift:function(a,b){b%=64;return 0===b?a:32>b?[(a[0]<<b)|(a[1]>>>(32-b)),a[1]<<b]:[a[1]<<(b-32),0];},x64Xor:function(a,b){return[a[0]^b[0],a[1]^b[1]];},x64Fmix:function(a){a=this.x64Xor(a,[0,a[0]>>>1]);a=this.x64Multiply(a,[4283543511,3981806797]);a=this.x64Xor(a,[0,a[0]>>>1]);a=this.x64Multiply(a,[3301882366,444984403]);return(a=this.x64Xor(a,[0,a[0]>>>1]));},x64hash128:function(a,b){a=a||'';b=b||0;var c=a.length%16,l=a.length-c,h=[0,b];b=[0,b];for(var q,z,C=[2277735313,289559509],D=[1291169091,658871167],B=0;B<l;B+=16)(q=[(a.charCodeAt(B+4)&255)|((a.charCodeAt(B+5)&255)<<8)|((a.charCodeAt(B+6)&255)<<16)|((a.charCodeAt(B+7)&255)<<24),(a.charCodeAt(B)&255)|((a.charCodeAt(B+1)&255)<<8)|((a.charCodeAt(B+2)&255)<<16)|((a.charCodeAt(B+3)&255)<<24)]),(z=[(a.charCodeAt(B+12)&255)|((a.charCodeAt(B+13)&255)<<8)|((a.charCodeAt(B+14)&255)<<16)|((a.charCodeAt(B+15)&255)<<24),(a.charCodeAt(B+8)&255)|((a.charCodeAt(B+9)&255)<<8)|((a.charCodeAt(B+10)&255)<<16)|((a.charCodeAt(B+11)&255)<<24)]),(q=this.x64Multiply(q,C)),(q=this.x64Rotl(q,31)),(q=this.x64Multiply(q,D)),(h=this.x64Xor(h,q)),(h=this.x64Rotl(h,27)),(h=this.x64Add(h,b)),(h=this.x64Add(this.x64Multiply(h,[0,5]),[0,1390208809])),(z=this.x64Multiply(z,D)),(z=this.x64Rotl(z,33)),(z=this.x64Multiply(z,C)),(b=this.x64Xor(b,z)),(b=this.x64Rotl(b,31)),(b=this.x64Add(b,h)),(b=this.x64Add(this.x64Multiply(b,[0,5]),[0,944331445]));q=[0,0];z=[0,0];switch(c){case 15:z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+14)],48));case 14:z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+13)],40));case 13:z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+12)],32));case 12:z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+11)],24));case 11:z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+10)],16));case 10:z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+9)],8));case 9:(z=this.x64Xor(z,[0,a.charCodeAt(B+8)])),(z=this.x64Multiply(z,D)),(z=this.x64Rotl(z,33)),(z=this.x64Multiply(z,C)),(b=this.x64Xor(b,z));case 8:q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+7)],56));case 7:q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+6)],48));case 6:q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+5)],40));case 5:q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+4)],32));case 4:q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+3)],24));case 3:q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+2)],16));case 2:q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+1)],8));case 1:(q=this.x64Xor(q,[0,a.charCodeAt(B)])),(q=this.x64Multiply(q,C)),(q=this.x64Rotl(q,31)),(q=this.x64Multiply(q,D)),(h=this.x64Xor(h,q));}h=this.x64Xor(h,[0,a.length]);b=this.x64Xor(b,[0,a.length]);h=this.x64Add(h,b);b=this.x64Add(b,h);h=this.x64Fmix(h);b=this.x64Fmix(b);h=this.x64Add(h,b);b=this.x64Add(b,h);return('00000000'+(h[0]>>>0).toString(16)).slice(-8)+('00000000'+(h[1]>>>0).toString(16)).slice(-8)+('00000000'+(b[0]>>>0).toString(16)).slice(-8)+('00000000'+(b[1]>>>0).toString(16)).slice(-8);},};}class JDDMAC{static t(){return'00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D'.split(' ').map(function(v){return parseInt(v,16);});}mac(v){for(var x=-1,w=0,A=v.length;w<A;w++)x=(x>>>8)^t[(x^v.charCodeAt(w))&255];return(x^-1)>>>0;}}var _CurrentPageProtocol='https:'==document.location.protocol?'https://':'http://',_JdJrTdRiskDomainName=window.__fp_domain||'gia.jd.com',_url_query_str='',_root_domain='',_CurrentPageUrl=(function(){var t=document.location.href.toString();try{_root_domain=/^https?:\/\/(?:\w+\.)*?(\w*\.(?:com\.cn|cn|com|net|id))[\\\/]*/.exec(t)[1];}catch(v){}var u=t.indexOf('?');0<u&&((_url_query_str=t.substring(u+1)),500<_url_query_str.length&&(_url_query_str=_url_query_str.substring(0,499)),(t=t.substring(0,u)));return(t=t.substring(_CurrentPageProtocol.length));})(),jd_shadow__=(function(){try{var t=$.CryptoJS,u=[];u.push(_CurrentPageUrl);var v=generateUuid();u.push(v);var x=new Date().getTime();u.push(x);var w=t.SHA1(u.join('')).toString().toUpperCase();u=[];u.push('JD3');u.push(w);var A=new JDDMAC().mac(u.join(''));u.push(A);var y=t.enc.Hex.parse('30313233343536373839616263646566'),n=t.enc.Hex.parse('4c5751554935255042304e6458323365'),e=u.join('');return t.AES.encrypt(t.enc.Utf8.parse(e),n,{mode:t.mode.CBC,padding:t.pad.Pkcs7,iv:y,}).ciphertext.toString(t.enc.Base32);}catch(f){console.log(f);}})();var td_collect=new(function(){function t(){var n=window.webkitRTCPeerConnection||window.mozRTCPeerConnection||window.RTCPeerConnection;if(n){var e=function(k){var g=/([0-9]{1,3}(\.[0-9]{1,3}){3})/,m=/\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*/;try{var a=g.exec(k);if(null==a||0==a.length||void 0==a)a=m.exec(k);var b=a[1];void 0===f[b]&&w.push(b);f[b]=!0;}catch(c){}},f={};try{var r=new n({iceServers:[{url:'stun:stun.services.mozilla.com',},],});}catch(k){}try{void 0===r&&(r=new n({iceServers:[],}));}catch(k){}if(r||window.mozRTCPeerConnection)try{r.createDataChannel('chat',{reliable:!1,});}catch(k){}r&&((r.onicecandidate=function(k){k.candidate&&e(k.candidate.candidate);}),r.createOffer(function(k){r.setLocalDescription(k,function(){},function(){});},function(){}),setTimeout(function(){try{r.localDescription.sdp.split('\n').forEach(function(k){0===k.indexOf('a=candidate:')&&e(k);});}catch(k){}},800));}}function u(n){var e;return(e=document.cookie.match(new RegExp('(^| )'+n+'=([^;]*)(;|$)')))?e[2]:'';}function v(){function n(g){var m={};r.style.fontFamily=g;document.body.appendChild(r);m.height=r.offsetHeight;m.width=r.offsetWidth;document.body.removeChild(r);return m;}var e=['monospace','sans-serif','serif'],f=[],r=document.createElement('span');r.style.fontSize='72px';r.style.visibility='hidden';r.innerHTML='mmmmmmmmmmlli';for(var k=0;k<e.length;k++)f[k]=n(e[k]);this.checkSupportFont=function(g){for(var m=0;m<f.length;m++){var a=n(g+','+e[m]),b=f[m];if(a.height!==b.height||a.width!==b.width)return!0;}return!1;};}function x(n){var e={};e.name=n.name;e.filename=n.filename.toLowerCase();e.description=n.description;void 0!==n.version&&(e.version=n.version);e.mimeTypes=[];for(var f=0;f<n.length;f++){var r=n[f],k={};k.description=r.description;k.suffixes=r.suffixes;k.type=r.type;e.mimeTypes.push(k);}return e;}this.bizId='';this.bioConfig={type:'42',operation:1,duraTime:2,interval:50,};this.worder=null;this.deviceInfo={userAgent:'',isJdApp:!1,isJrApp:!1,sdkToken:'',fp:'',eid:'',};this.isRpTok=!1;this.obtainLocal=function(n){n='undefined'!==typeof n&&n?!0:!1;var e={};try{var f=document.cookie.replace(/(?:(?:^|.*;\s*)3AB9D23F7A4B3C9B\s*=\s*([^;]*).*$)|^.*$/,'$1');0!==f.length&&(e.cookie=f);}catch(k){}try{window.localStorage&&null!==window.localStorage&&0!==window.localStorage.length&&(e.localStorage=window.localStorage.getItem('3AB9D23F7A4B3C9B'));}catch(k){}try{window.sessionStorage&&null!==window.sessionStorage&&(e.sessionStorage=window.sessionStorage['3AB9D23F7A4B3C9B']);}catch(k){}try{p.globalStorage&&(e.globalStorage=window.globalStorage['.localdomain']['3AB9D23F7A4B3C9B']);}catch(k){}try{d&&'function'==typeof d.load&&'function'==typeof d.getAttribute&&(d.load('jdgia_user_data'),(e.userData=d.getAttribute('3AB9D23F7A4B3C9B')));}catch(k){}try{E.indexedDbId&&(e.indexedDb=E.indexedDbId);}catch(k){}try{E.webDbId&&(e.webDb=E.webDbId);}catch(k){}try{for(var r in e)if(32<e[r].length){_JdEid=e[r];n||(_eidFlag=!0);break;}}catch(k){}try{('undefined'===typeof _JdEid||0>=_JdEid.length)&&this.db('3AB9D23F7A4B3C9B');if('undefined'===typeof _JdEid||0>=_JdEid.length)_JdEid=u('3AB9D23F7A4B3C9B');if('undefined'===typeof _JdEid||0>=_JdEid.length)_eidFlag=!0;}catch(k){}return _JdEid;};var w=[],A='Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin'.split(';'),y='4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako'.split(';');this.toJson='object'===typeof JSON&&JSON.stringify;this.init=function(){_fingerprint_step=6;t();_fingerprint_step=7;'function'!==typeof this.toJson&&(this.toJson=function(n){var e=typeof n;if('undefined'===e||null===n)return'null';if('number'===e||'boolean'===e)return n+'';if('object'===e&&n&&n.constructor===Array){e=[];for(var f=0;n.length>f;f++)e.push(this.toJson(n[f]));return'['+(e+']');}if('object'===e){e=[];for(f in n)n.hasOwnProperty(f)&&e.push('"'+f+'":'+this.toJson(n[f]));return'{'+(e+'}');}});this.sdkCollectInit();};this.sdkCollectInit=function(){try{try{bp_bizid&&(this.bizId=bp_bizid);}catch(f){this.bizId='jsDefault';}var n=navigator.userAgent.toLowerCase(),e=!n.match(/(iphone|ipad|ipod)/i)&&(-1<n.indexOf('android')||-1<n.indexOf('adr'));this.deviceInfo.isJdApp=-1<n.indexOf('jdapp');this.deviceInfo.isJrApp=-1<n.indexOf('jdjr');this.deviceInfo.userAgent=navigator.userAgent;this.deviceInfo.isAndroid=e;this.createWorker();}catch(f){}};this.db=function(n,e){try{_fingerprint_step='m';if(window.openDatabase){var f=window.openDatabase('sqlite_jdtdstorage','','jdtdstorage',1048576);void 0!==e&&''!=e?f.transaction(function(r){r.executeSql('CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))',[],function(k,g){},function(k,g){});r.executeSql('INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)',[n,e],function(k,g){},function(k,g){});}):f.transaction(function(r){r.executeSql('SELECT value FROM cache WHERE name=?',[n],function(k,g){1<=g.rows.length&&(_JdEid=g.rows.item(0).value);},function(k,g){});});}_fingerprint_step='n';}catch(r){}};this.setCookie=function(n,e){void 0!==e&&''!=e&&(document.cookie=n+'='+e+'; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain='+_root_domain);};this.tdencrypt=function(n){n=this.toJson(n);n=encodeURIComponent(n);var e='',f=0;do{var r=n.charCodeAt(f++);var k=n.charCodeAt(f++);var g=n.charCodeAt(f++);var m=r>>2;r=((r&3)<<4)|(k>>4);var a=((k&15)<<2)|(g>>6);var b=g&63;isNaN(k)?(a=b=64):isNaN(g)&&(b=64);e=e+'23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-'.charAt(m)+'23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-'.charAt(r)+'23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-'.charAt(a)+'23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-'.charAt(b);}while(f<n.length);return e+'/';};this.collect=function(){var n=new Date();try{var e=document.createElement('div'),f={},r='ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText'.split(' ');if(window.getComputedStyle)for(var k=0;k<r.length;k++)document.body.appendChild(e),(e.style.color=r[k]),(f[r[k]]=window.getComputedStyle(e).getPropertyValue('color')),document.body.removeChild(e);}catch(D){}e={ca:{},ts:{},m:{},};r=e.ca;r.tdHash=_jdfp_canvas_md5;var g=!1;if((k=window.WebGLRenderingContext))(k=navigator.userAgent),(k=k.toLowerCase()),(k=(0<k.indexOf('jdjr-app')||0<=k.indexOf('jdapp'))&&(0<k.indexOf('iphone')||0<k.indexOf('ipad'))?!0:!1),(k=!k);if(k){var m=['webgl','experimental-webgl','moz-webgl','webkit-3d'],a=[],b;for(k=0;k<m.length;k++)try{var c=!1;(c=document.createElement('canvas').getContext(m[k],{stencil:!0,}))&&c&&((b=c),a.push(m[k]));}catch(D){}a.length&&(g={name:a,gl:b,});}if(g){k=g.gl;r.contextName=g.name.join();r.webglversion=k.getParameter(k.VERSION);r.shadingLV=k.getParameter(k.SHADING_LANGUAGE_VERSION);r.vendor=k.getParameter(k.VENDOR);r.renderer=k.getParameter(k.RENDERER);b=[];try{(b=k.getSupportedExtensions()),(r.extensions=b);}catch(D){}try{var l=k.getExtension('WEBGL_debug_renderer_info');l&&((r.wuv=k.getParameter(l.UNMASKED_VENDOR_WEBGL)),(r.wur=k.getParameter(l.UNMASKED_RENDERER_WEBGL)));}catch(D){}}e.m.documentMode=document.documentMode;e.m.compatMode=document.compatMode;l=[];e.fo=l;k={};l=[];for(var h in navigator)'object'!=typeof navigator[h]&&(k[h]=navigator[h]),l.push(h);k.enumerationOrder=l;k.javaEnabled=false;try{k.taintEnabled=navigator.taintEnabled();}catch(D){}e.n=k;k=navigator.userAgent.toLowerCase();if((h=k.match(/rv:([\d.]+)\) like gecko/)))var q=h[1];if((h=k.match(/msie ([\d.]+)/)))q=h[1];h=[];if(q)for(q='AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX'.split(';'),k=0;k<q.length;k++){var z=q[k];try{var C=new ActiveXObject(z);l={};l.name=z;try{l.version=C.GetVariable('$version');}catch(D){}try{l.version=C.GetVersions();}catch(D){}(l.version&&0<l.version.length)||(l.version='');h.push(l);}catch(D){}}else{q=navigator.plugins;l={};for(k=0;k<q.length;k++)(z=q[k]),(l[z.name]=1),h.push(x(z));for(k=0;k<y.length;k++)(C=y[k]),l[C]||((z=q[C]),z&&h.push(x(z)));}q='availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval'.split(' ');z={};for(k=0;q.length>k;k++)(C=q[k]),void 0!==screen[C]&&(z[C]=screen[C]);q=['devicePixelRatio','screenTop','screenLeft'];l={};for(k=0;q.length>k;k++)(C=q[k]),void 0!==window[C]&&(l[C]=window[C]);e.p=h;e.w=l;e.s=z;e.sc=f;e.tz=n.getTimezoneOffset();e.lil=w.sort().join('|');e.wil='';f={};try{(f.cookie=navigator.cookieEnabled),(f.localStorage=!!window.localStorage),(f.sessionStorage=!!window.sessionStorage),(f.globalStorage=!!window.globalStorage),(f.indexedDB=!!window.indexedDB);}catch(D){}e.ss=f;e.ts.deviceTime=n.getTime();e.ts.deviceEndTime=new Date().getTime();return this.tdencrypt(e);};this.collectSdk=function(n){try{var e=this,f=!1,r=e.getLocal('BATQW722QTLYVCRD');if(null!=r&&void 0!=r&&''!=r)try{var k=JSON.parse(r),g=new Date().getTime();null!=k&&void 0!=k.t&&'number'==typeof k.t&&(12e5>=g-k.t&&void 0!=k.tk&&null!=k.tk&&''!=k.tk&&k.tk.startsWith('jdd')?((e.deviceInfo.sdkToken=k.tk),(f=!0)):void 0!=k.tk&&null!=k.tk&&''!=k.tk&&(e.deviceInfo.sdkToken=k.tk));}catch(m){}r=!1;e.deviceInfo.isJdApp?((e.deviceInfo.clientVersion=navigator.userAgent.split(';')[2]),(r=0<e.compareVersion(e.deviceInfo.clientVersion,'7.0.2'))&&!f&&e.getJdSdkCacheToken(function(m){e.deviceInfo.sdkToken=m;(null!=m&&''!=m&&m.startsWith('jdd'))||e.getJdBioToken(n);})):e.deviceInfo.isJrApp&&((e.deviceInfo.clientVersion=navigator.userAgent.match(/clientVersion=([^&]*)(&|$)/)[1]),(r=0<e.compareVersion(e.deviceInfo.clientVersion,'4.6.0'))&&!f&&e.getJdJrSdkCacheToken(function(m){e.deviceInfo.sdkToken=m;(null!=m&&''!=m&&m.startsWith('jdd'))||e.getJdJrBioToken(n);}));'function'==typeof n&&n(e.deviceInfo);}catch(m){}};this.compareVersion=function(n,e){try{if(n===e)return 0;var f=n.split('.');var r=e.split('.');for(n=0;n<f.length;n++){var k=parseInt(f[n]);if(!r[n])return 1;var g=parseInt(r[n]);if(k<g)break;if(k>g)return 1;}}catch(m){}return-1;};this.isWKWebView=function(){return this.deviceInfo.userAgent.match(/supportJDSHWK/i)||1==window._is_jdsh_wkwebview?!0:!1;};this.getErrorToken=function(n){try{if(n){var e=(n+'').match(/"token":"(.*?)"/);if(e&&1<e.length)return e[1];}}catch(f){}return'';};this.getJdJrBioToken=function(n){var e=this;'undefined'!=typeof JrBridge&&null!=JrBridge&&'undefined'!=typeof JrBridge._version&&(0>e.compareVersion(JrBridge._version,'2.0.0')?console.error('\u6865\u7248\u672c\u4f4e\u4e8e2.0\u4e0d\u652f\u6301bio'):JrBridge.callNative({type:e.bioConfig.type,operation:e.bioConfig.operation,biometricData:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},},function(f){try{'object'!=typeof f&&(f=JSON.parse(f)),(e.deviceInfo.sdkToken=f.token);}catch(r){console.error(r);}null!=e.deviceInfo.sdkToken&&''!=e.deviceInfo.sdkToken&&((f={tk:e.deviceInfo.sdkToken,t:new Date().getTime(),}),e.store('BATQW722QTLYVCRD',JSON.stringify(f)));}));};this.getJdJrSdkCacheToken=function(n){var e=this;try{'undefined'==typeof JrBridge||null==JrBridge||'undefined'==typeof JrBridge._version||0>e.compareVersion(JrBridge._version,'2.0.0')||JrBridge.callNative({type:e.bioConfig.type,operation:5,biometricData:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},},function(f){var r='';try{'object'!=typeof f&&(f=JSON.parse(f)),(r=f.token);}catch(k){console.error(k);}null!=r&&''!=r&&'function'==typeof n&&(n(r),r.startsWith('jdd')&&((f={tk:r,t:new Date().getTime(),}),e.store('BATQW722QTLYVCRD',JSON.stringify(f))));});}catch(f){}};this.getJdBioToken=function(n){var e=this;n=JSON.stringify({businessType:'bridgeBiologicalProbe',callBackName:'_bioDeviceCb',params:{pin:'',jsonData:{type:e.bioConfig.type,operation:e.bioConfig.operation,data:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},biometricData:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},},},});e.isWKWebView()?window.webkit.messageHandlers.JDAppUnite.postMessage({method:'notifyMessageToNative',params:n,}):window.JDAppUnite&&window.JDAppUnite.notifyMessageToNative(n);window._bioDeviceCb=function(f){try{var r='object'==typeof f?f:JSON.parse(f);if(void 0!=r&&null!=r&&'0'!=r.status)return;null!=r.data.token&&void 0!=r.data.token&&''!=r.data.token&&(e.deviceInfo.sdkToken=r.data.token);}catch(k){(f=e.getErrorToken(f)),null!=f&&''!=f&&(e.deviceInfo.sdkToken=f);}null!=e.deviceInfo.sdkToken&&''!=e.deviceInfo.sdkToken&&((f={tk:e.deviceInfo.sdkToken,t:new Date().getTime(),}),e.store('BATQW722QTLYVCRD',JSON.stringify(f)));};};this.getJdSdkCacheToken=function(n){try{var e=this,f=JSON.stringify({businessType:'bridgeBiologicalProbe',callBackName:'_bioDeviceSdkCacheCb',params:{pin:'',jsonData:{type:e.bioConfig.type,operation:5,data:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},biometricData:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},},},});e.isWKWebView()?window.webkit.messageHandlers.JDAppUnite.postMessage({method:'notifyMessageToNative',params:f,}):window.JDAppUnite&&window.JDAppUnite.notifyMessageToNative(f);window._bioDeviceSdkCacheCb=function(r){var k='';try{var g='object'==typeof r?r:JSON.parse(r);if(void 0!=g&&null!=g&&'0'!=g.status)return;k=g.data.token;}catch(m){k=e.getErrorToken(r);}null!=k&&''!=k&&'function'==typeof n&&(n(k),k.startsWith('jdd')&&((r={tk:k,t:new Date().getTime(),}),e.store('BATQW722QTLYVCRD',JSON.stringify(r))));};}catch(r){}};this.store=function(n,e){try{this.setCookie(n,e);}catch(f){}try{window.localStorage&&window.localStorage.setItem(n,e);}catch(f){}try{window.sessionStorage&&window.sessionStorage.setItem(n,e);}catch(f){}try{window.globalStorage&&window.globalStorage['.localdomain'].setItem(n,e);}catch(f){}try{this.db(n,_JdEid);}catch(f){}};this.getLocal=function(n){var e={},f=null;try{var r=document.cookie.replace(new RegExp('(?:(?:^|.*;\\s*)'+n+'\\s*\\=\\s*([^;]*).*$)|^.*$'),'$1');0!==r.length&&(e.cookie=r);}catch(g){}try{window.localStorage&&null!==window.localStorage&&0!==window.localStorage.length&&(e.localStorage=window.localStorage.getItem(n));}catch(g){}try{window.sessionStorage&&null!==window.sessionStorage&&(e.sessionStorage=window.sessionStorage[n]);}catch(g){}try{p.globalStorage&&(e.globalStorage=window.globalStorage['.localdomain'][n]);}catch(g){}try{d&&'function'==typeof d.load&&'function'==typeof d.getAttribute&&(d.load('jdgia_user_data'),(e.userData=d.getAttribute(n)));}catch(g){}try{E.indexedDbId&&(e.indexedDb=E.indexedDbId);}catch(g){}try{E.webDbId&&(e.webDb=E.webDbId);}catch(g){}try{for(var k in e)if(32<e[k].length){f=e[k];break;}}catch(g){}try{if(null==f||'undefined'===typeof f||0>=f.length)f=u(n);}catch(g){}return f;};this.createWorker=function(){if(window.Worker){try{var n=new Blob(["onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"],{type:'application/javascript',});}catch(e){(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder),(n=new BlobBuilder()),n.append("onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"),(n=n.getBlob());}try{this.worker=new Worker(URL.createObjectURL(n));}catch(e){}}};this.reportWorker=function(n,e,f,r){try{null!=this.worker&&(this.worker.postMessage(JSON.stringify({url:n,data:e,success:!1,async:!1,})),(this.worker.onmessage=function(k){}));}catch(k){}};})();function td_collect_exe(){_fingerprint_step=8;var t=td_collect.collect();td_collect.collectSdk();var u='string'===typeof orderId?orderId:'',v='undefined'!==typeof jdfp_pinenp_ext&&jdfp_pinenp_ext?2:1;u={pin:_jdJrTdCommonsObtainPin(v),oid:u,p:'https:'==document.location.protocol?'s':'h',fp:risk_jd_local_fingerprint,ctype:v,v:'2.7.10.4',f:'3',};try{(u.o=_CurrentPageUrl),(u.qs=_url_query_str);}catch(w){}_fingerprint_step=9;0>=_JdEid.length&&((_JdEid=td_collect.obtainLocal()),0<_JdEid.length&&(_eidFlag=!0));u.fc=_JdEid;try{u.t=jd_risk_token_id;}catch(w){}try{if('undefined'!=typeof gia_fp_qd_uuid&&0<=gia_fp_qd_uuid.length)u.qi=gia_fp_qd_uuid;else{var x=_JdJrRiskClientStorage.jdtdstorage_cookie('qd_uid');u.qi=void 0==x?'':x;}}catch(w){}'undefined'!=typeof jd_shadow__&&0<jd_shadow__.length&&(u.jtb=jd_shadow__);try{td_collect.deviceInfo&&void 0!=td_collect.deviceInfo&&null!=td_collect.deviceInfo.sdkToken&&''!=td_collect.deviceInfo.sdkToken?((u.stk=td_collect.deviceInfo.sdkToken),(td_collect.isRpTok=!0)):(td_collect.isRpTok=!1);}catch(w){td_collect.isRpTok=!1;}x=td_collect.tdencrypt(u);return{a:x,d:t};}function _jdJrTdCommonsObtainPin(t){var u='';'string'===typeof jd_jr_td_risk_pin&&1==t?(u=jd_jr_td_risk_pin):'string'===typeof pin?(u=pin):'object'===typeof pin&&'string'===typeof jd_jr_td_risk_pin&&(u=jd_jr_td_risk_pin);return u}function getBody(userAgent,url=document.location.href){navigator.userAgent=userAgent;let href=url;let choose=/((https?:)\/\/([^\/]+))(.+)/.exec(url);let[,origin,protocol,host,pathname]=choose;document.location.href=href;document.location.origin=origin;document.location.protocol=protocol;document.location.host=host;document.location.pathname=pathname;const JF=new JdJrTdRiskFinger();let fp=JF.f.get(function(t){risk_jd_local_fingerprint=t;return t});let arr=td_collect_exe();return{fp,...arr}}