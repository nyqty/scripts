/*
1111red
加密
脚本锁佣建议用新的京粉号
https://u.jd.com/xxxxxxx

返利变量：JD_231111_RedRebateCode，若需要返利给自己，请自己修改环境变量[JD_231111_RedRebateCode]
xxxxxxx换成自己的返利 就是链接后面那7位字母
export JD_231111_RedRebateCode="xxxxxxx"

每次脚本领取红包次数
export JD_231111_RedCount="0"
0=不限制 1=领取1次
每个账号之间等待时间单位毫秒 默认15秒
1000=1秒
export JD_231111_RedTimes="15000"
export JD_231111_Red_proxy='' 代理池URL多个请用|隔开
返回的格式为：ip:port
如果有账号密码的话格式为：ip:port:username:password
export JD_231111_proxyReceiveCount='10' 使用代理领取账号大于 10 切换ip 填数字

30 0,10,20 * * * https://raw.githubusercontent.com/smiek2121/scripts/master/gua_231111_Red.js 1111red

*/

let rebateCodes = ''; // 返利变量
let redTimes = 10000 // 等待时间单位毫秒
let redCount = 0 // 领取次数
let shareHelpCount = 0 // 助力次数 0=默认 1=1次满 2=2次满
let proxyGetIpUrl = '' // // 代理池URL多个请用|隔开
let proxyReceiveCount = 10 // 使用代理领取账号大于 10 切换ip



const Env=require('./utils/Env.js');
const $ = new Env('1111red');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : ''
$.CryptoJS = require('crypto-js')
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

let lIliiII1 = "";
if (!rebateCodes) rebateCodes = "https://u.jd.com/0qAuac9";
if (!lIliiII1) lIliiII1 = "";
rebateCodes = $.isNode() ? process.env.JD_231111_RedRebateCode ? process.env.JD_231111_RedRebateCode : "" + rebateCodes : $.getdata("JD_231111_RedRebateCode") ? $.getdata("JD_231111_RedRebateCode") : "" + rebateCodes;
lIliiII1 = $.isNode() ? process.env.JD_nhj_rebatePin ? process.env.JD_nhj_rebatePin : "" + lIliiII1 : $.getdata("JD_nhj_rebatePin") ? $.getdata("JD_nhj_rebatePin") : "" + lIliiII1;
redCount = $.isNode() ? process.env.JD_231111_RedCount ? process.env.JD_231111_RedCount : "" + redCount : $.getdata("JD_231111_RedCount") ? $.getdata("JD_231111_RedCount") : "" + redCount;
redTimes = $.isNode() ? process.env.JD_231111_RedTimes ? process.env.JD_231111_RedTimes : "" + redTimes : $.getdata("JD_231111_RedTimes") ? $.getdata("JD_231111_RedTimes") : "" + redTimes;
$.shareCount = $.isNode() ? process.env.JD_nhj_shareHelpCount ? process.env.JD_nhj_shareHelpCount : "" + shareHelpCount : $.getdata("JD_nhj_shareHelpCount") ? $.getdata("JD_nhj_shareHelpCount") : "" + shareHelpCount;
proxyReceiveCount = $.isNode() ? process.env.JD_231111_proxyReceiveCount ? process.env.JD_231111_proxyReceiveCount : "" + proxyReceiveCount : $.getdata("JD_231111_proxyReceiveCount") ? $.getdata("JD_231111_proxyReceiveCount") : "" + proxyReceiveCount;
proxyGetIpUrl = $.isNode() ? process.env.JD_231111_Red_proxy ? process.env.JD_231111_Red_proxy : proxyGetIpUrl : $.getdata("JD_231111_Red_proxy") ? $.getdata("JD_231111_Red_proxy") : proxyGetIpUrl;
$.shareCount = parseInt($.shareCount, 10) || 0;
let i1I1li11 = lIliiII1 && lIliiII1.split(",") || [],
  li1llI1 = rebateCodes + "";
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
let l1ii1Ill = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let l1I11II = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let lIi1Ii1i = "";
const llliilii = "2023/11/12 00:00:00+08:00";
let lI1l11il = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let lIIIiil1 = "",
  iilliIii = 4;
redTimes = Number(redTimes);
proxyReceiveCount = Number(proxyReceiveCount);
$.time("yyyy-MM-dd");
const ilililI1 = require("request");
var III1IIil = "";
try {
  III1IIil = require("tunnel");
} catch (lll11lI1) {
  console.log("请安装模块\"tunnel\"\n");
}
var ii1lilI1 = "";
try {
  var {
    SocksProxyAgent: ii1lilI1
  } = require("socks-proxy-agent");
} catch (IIIIiIii) {
  console.log("如果有用socks代理请安装模块\"socks-proxy-agent\"\n没有的话请忽略！\n");
}
let lIiiIlli = false;
$.proxyArrCount = 20;
$.proxyArrOrder = 0;
$.proxyArrIndex = -1;
if (proxyGetIpUrl) proxyGetIpUrl = proxyGetIpUrl.split("|").map(function (lil1I11l, lIll, Ilii111I) {
  return {
    "url": lil1I11l,
    "index": lIll + 1,
    "status": true,
    "count": 0,
    "errorCount": 0
  };
});
$.proxyArrAll = {};
$.proxyArr = {};
proxyGetIpUrl.length > 0 && (lIiiIlli = true);
lIiiIlli && console.log("开启代理");
$.switchProxies = false;
iIIlI1Ii();
!(async () => {
  if (/https:\/\/u\.jd\.com\/.+/.test(li1llI1)) {
    if (li1llI1.split("/").pop()) li1llI1 = li1llI1.split("/").pop().split("?").shift();else {
      console.log("请填写正确的rebateCode");
      return;
    }
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (lI1l11il > new Date(llliilii).getTime()) {
    $.msg($.name, "活动已结束", "请删除此脚本");
    $.setdata("", "JD_231111_Red");
    $.setdata("", "JD_231111_Red_pin");
    return;
  }
  console.log("当前版本：2023年10月23日 V3");
  console.log("返利码：" + li1llI1.replace(/.+(.{3})/, "***$1") + "\n");
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("JD_231111_Red_pin") || {};
  $.shareCode = "";
  $.again = false;
  if ($.end) return;
  for (let llIIlll = 0; llIIlll < cookiesArr.length && !$.runEnd; llIIlll++) {
    if ($.endFlag) break;
    cookie = cookiesArr[llIIlll];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = llIIlll + 1;
      if ($.runArr[$.UserName]) continue;
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Iii1li11 = 1;
      iilliIii = 4;
      !cookie.includes("app_open") && (Iii1li11 = 2, iilliIii = 2);
      typeof $.proxyArr.pin == "object" && $.proxyArr.pin.length >= proxyReceiveCount && ($.switchProxies = true);
      $.eid_token = "";
      await lll1111(true, Iii1li11);
      await lIiiili1();
      await iiil1il();
      if ($.endFlag) break;
    }
    $.setdata($.shareCodePinArr, "JD_231111_Red_pin");
  }
  $.setdata($.shareCodePinArr, "JD_231111_Red_pin");
  if (message) {
    $.msg($.name, "", message + "\nhttps://u.jd.com/" + li1llI1 + "\n\n跳转到app 可查看助力情况");
    if ($.isNode()) {}
  }
})().catch(iIlIilII => $.logErr(iIlIilII)).finally(() => {
  $.done();
});
async function iiil1il(I1IIii1 = 0) {
  try {
    I1IIii1 == 0 && (iIIIllIl("c822a", $.UA), await lIi1Ii1i.__genAlgo());
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && iIIlI1Ii();
    resMsg = "";
    let iIl1Iil1 = false,
      iI1IlIiI = 0,
      i1iIiIli = 0,
      I1i1l1ll = 0;
    $.shareFlag = true;
    do {
      if (i1iIiIli > 2) iI1IlIiI = 0;
      $.flag = 0;
      l1ii1Ill = "";
      $.url1 = "";
      await II1lIiII();
      if (!$.url1) {
        console.log("获取url1失败");
        $.end = true;
        break;
      }
      $.url2 = "";
      $.UVCookie = lIIIiil1.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await lili11ii();
      if (!$.url2) {
        console.log("获取不到红包页面");
        break;
      }
      if (!/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + li1llI1).test($.url2)) {
        console.log("改返利url：https://u.jd.com/" + li1llI1 + " 可能不是红包页面");
        $.runEnd = true;
        return;
      }
      if (!$.url2) $.url2 = "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html?unionActId=31165&d=" + li1llI1 + "&cu=true&utm_source=kong&utm_medium=jingfen";
      $.actId = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || "2ZqeDAGGJtUdE4C38i2EXkXBLLNu";
      $.UVCookie = lIIIiil1.getUVCookie("", "", $.url2, $.UVCookie);
      $.origin = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || "https://pro.m.jd.com";
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (I1IIii1 == 0) {
        let I1li11iI = 0,
          I1lIIIlI = true,
          lilII1il = 0;
        if (Object.getOwnPropertyNames(l1I11II).length > iI1IlIiI && $.shareFlag) for (let iI1I1lI in l1I11II || {}) {
          if (iI1I1lI == $.UserName) {
            $.flag = 1;
            continue;
          }
          if (I1li11iI == iI1IlIiI) {
            $.flag = 0;
            $.shareCode = l1I11II[iI1I1lI] || "";
            if ($.shareCodePinArr[iI1I1lI] && $.shareCodePinArr[iI1I1lI].includes($.UserName)) {
              lilII1il++;
              continue;
            }
            if ($.shareCode.count >= $.shareCodeArr.shareCount) {
              lilII1il++;
              continue;
            }
            $.getlj = false;
            if ($.shareCode) console.log("助力[" + iI1I1lI + "]");
            let illi1i = await lIiiilIi($.shareCode.code, 1);
            if (/重复助力/.test(illi1i)) {
              if (!$.shareCodePinArr[iI1I1lI]) $.shareCodePinArr[iI1I1lI] = [];
              $.shareCodePinArr[iI1I1lI].push($.UserName);
              iI1IlIiI--;
              I1i1l1ll--;
            } else {
              if (/助力/.test(illi1i) && /上限/.test(illi1i)) $.shareFlag = false;else {
                if (!/领取上限/.test(illi1i) && $.getlj == true) {
                  if (!$.shareCodePinArr[iI1I1lI]) $.shareCodePinArr[iI1I1lI] = [];
                  !$.shareCodePinArr[iI1I1lI].includes($.UserName) && $.shareCodePinArr[iI1I1lI].push($.UserName);
                  iI1IlIiI--;
                } else I1lIIIlI = false;
              }
            }
          }
          I1li11iI++;
        }
        I1lIIIlI && lilII1il == Object.getOwnPropertyNames(l1I11II).length && (iIl1Iil1 = true);
        if (I1li11iI == 0) {
          $.getlj = false;
          let Il1lIll = await lIiiilIi("", 1);
          !/领取上限/.test(Il1lIll) && $.getlj == true && iI1IlIiI--;
        }
        if ($.endFlag) break;
      } else {
        let Ilii1Iil = await I1i1liI();
        if (!$.endFlag && Ilii1Iil && $.again == false) await ll1I1IIi();
        if ($.again == false) break;
      }
      $.again == true && i1iIiIli < 1 && (i1iIiIli++, $.again = false);
      iI1IlIiI++;
      I1i1l1ll++;
      $.flag == 1 && (await $.wait(parseInt(Math.random() * 500 + 100, 10)));
      if (redCount > 0 && redCount <= I1i1l1ll) break;
    } while ($.flag == 1 && iI1IlIiI < 4);
    if ($.endFlag) return;
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    if (iIl1Iil1) {}
    if (!lIiiIlli) {
      let ii1I1Ill = parseInt(Math.random() * 1000 + redTimes, 10);
      console.log("等待 " + ii1I1Ill / 1000 + " 秒");
      await $.wait(ii1I1Ill);
    }
  } catch (l1iiIiii) {
    console.log(l1iiIiii);
  }
}
async function iiil1i1i(ililiI1 = 0) {
  try {
    let l11i11 = 2;
    if (ililiI1 == 1) l11i11 = 1;
    let I11Iili1 = 0;
    for (let i1I1i1iI in $.shareCodeArr || {}) {
      if (i1I1i1iI === "flag" || i1I1i1iI === "updateTime" || i1I1i1iI === "shareCount") continue;
      if ($.shareCodeArr[i1I1i1iI] && $.shareCodeArr.shareCount && $.shareCodeArr[i1I1i1iI].count < $.shareCodeArr.shareCount) I11Iili1++;
    }
    for (let i1lI1i1 = 0; i1lI1i1 < cookiesArr.length && !$.runEnd; i1lI1i1++) {
      cookie = cookiesArr[i1lI1i1];
      if (cookie) {
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (i1I1li11.length > 0 && i1I1li11.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) continue;
        $.index = i1lI1i1 + 1;
        $.eid_token = "";
        await lll1111();
        await lIiiili1();
        await iiil1il(1);
        let iiIi1lIi = 0;
        for (let lI11iill in $.shareCodeArr || {}) {
          if (lI11iill === "flag" || lI11iill === "updateTime" || lI11iill === "shareCount") continue;
          if ($.shareCodeArr[lI11iill] && $.shareCodeArr.shareCount && $.shareCodeArr[lI11iill].count < $.shareCodeArr.shareCount) iiIi1lIi++;
        }
        if ($.endFlag || iiIi1lIi - I11Iili1 >= l11i11 || $.end) break;
      }
    }
  } catch (lIlI1Ii) {
    console.log(lIlI1Ii);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) for (let lIillIil in $.shareCodeArr || {}) {
    if (lIillIil === "flag" || lIillIil === "updateTime" || lIillIil === "shareCount") continue;
    if ($.shareCodeArr[lIillIil]) l1I11II[lIillIil] = $.shareCodeArr[lIillIil];
  }
}
function lIiiilIi(IiiIiI = "", illi1iIi = 1) {
  return new Promise(async lIillliI => {
    $.UVCookie = lIIIiil1.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let i11i1lIi = "",
      iiI11I11 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
    const Ii1III1l = {
        "platform": iilliIii,
        "unionActId": "31165",
        "actId": $.actId,
        "d": li1llI1,
        "unionShareId": IiiIiI,
        "type": illi1iIi,
        "qdPageId": "MO-J2011-1",
        "mdClickId": "jxhongbao_ck"
      },
      ii1iIiI = {
        "appid": "u_hongbao",
        "body": JSON.stringify(Ii1III1l),
        "client": "apple",
        "clientVersion": $.UA.split(";")[2] || "1.1.0",
        "functionId": "getCoupons"
      };
    let Iill11il = lIi1Ii1i.__genH5st(ii1iIiI, $.UserName);
    i11i1lIi = Iill11il.h5st || "";
    let iIiIii1I = "",
      liIlii = {
        "url": "https://api.m.jd.com/api",
        "body": "functionId=getCoupons&appid=" + ii1iIiI.appid + "&_=" + iiI11I11 + "&loginType=2&body=" + $.toStr(Ii1III1l) + "&client=" + ii1iIiI.client + "&clientVersion=" + ii1iIiI.clientVersion + "&h5st=" + i11i1lIi + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
        "headers": {
          "accept": "*/*",
          "Accept-Language": "zh-cn",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          "Cookie": "" + $.UVCookie + l1ii1Ill + " " + cookie,
          "origin": $.origin,
          "Referer": $.origin + "/",
          "User-Agent": $.UA
        },
        "timeout": 10000
      };
    liIlii.headers.Cookie = liIlii.headers.Cookie.replace(/;\s*$/, "");
    liIlii.headers.Cookie = liIlii.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) liIlii.headers.Referer = $.url2;
    liIlii = i1iI1iI1(liIlii);
    var il1ii1i = $;
    if (ilililI1 && $.proxyArr.type && $.proxyArr.type == "socks") il1ii1i = ilililI1;
    il1ii1i.post(liIlii, async (iI1lIIi1, iiIl11il, iIli1i11) => {
      try {
        if (iI1lIIi1) {
          var Iili1ill = i1Ilili1(iI1lIIi1, iiIl11il);
          console.log("" + $.toStr(iI1lIIi1));
          console.log($.name + " getCoupons API请求失败，请检查网路重试");
          if (Iili1ill) {
            await lll1111(false);
            if (!$.switchProxies) await lIiiilIi(...arguments);
          }
        } else {
          let IIiIliIi = $.toObj(iIli1i11, iIli1i11);
          if (typeof IIiIliIi == "object") {
            IIiIliIi.msg && (iIiIii1I = IIiIliIi.msg, console.log(IIiIliIi.msg));
            if (IIiIliIi.msg.indexOf("不展示弹层") > -1 && illi1iIi == 1) $.again = true;
            if (IIiIliIi.msg.indexOf("领取上限") === -1 && IIiIliIi.msg.indexOf("登录") === -1) {
              if (illi1iIi == 1) $.flag = 1;
            }
            if (IIiIliIi.msg.indexOf("活动已结束") > -1 || IIiIliIi.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            IiiIiI && typeof IIiIliIi.data !== "undefined" && typeof IIiIliIi.data.joinNum !== "undefined" && console.log("当前" + IIiIliIi.data.joinSuffix + ":" + IIiIliIi.data.joinNum);
            if (IIiIliIi.code == 0 && IIiIliIi.data) {
              illi1iIi == 1 && (typeof $.proxyArr.pin == "object" && !$.proxyArr.pin.includes($.UserName) && $.proxyArr.pin.push($.UserName), $.shareCode.count++);
              let Ii1IIIi1 = "";
              for (let l1lIiill of IIiIliIi.data.couponList) {
                if (l1lIiill.type == 1) $.getlj = true, Ii1IIIi1 += (Ii1IIIi1 ? "\n" : "") + "获得[红包]🧧" + l1lIiill.discount + "元 使用时间:" + $.time("yyyy-MM-dd", l1lIiill.beginTime) + " " + $.time("yyyy-MM-dd", l1lIiill.endTime);else {
                  if (l1lIiill.type == 3) $.getlj = true, Ii1IIIi1 += (Ii1IIIi1 ? "\n" : "") + "获得[优惠券]🎟️满" + l1lIiill.quota + "减" + l1lIiill.discount + " 使用时间:" + $.time("yyyy-MM-dd", l1lIiill.beginTime) + " " + $.time("yyyy-MM-dd", l1lIiill.endTime);else l1lIiill.type == 6 ? ($.getlj = true, Ii1IIIi1 += (Ii1IIIi1 ? "\n" : "") + "获得[打折券]]🎫满" + l1lIiill.quota + "打" + l1lIiill.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", l1lIiill.beginTime) + " " + $.time("yyyy-MM-dd", l1lIiill.endTime)) : ($.getlj = true, Ii1IIIi1 += (Ii1IIIi1 ? "\n" : "") + "获得[未知]🎉" + (l1lIiill.quota || "") + " " + l1lIiill.discount + " 使用时间:" + $.time("yyyy-MM-dd", l1lIiill.beginTime) + " " + $.time("yyyy-MM-dd", l1lIiill.endTime), console.log(l1lIiill));
                }
              }
              Ii1IIIi1 && (resMsg += Ii1IIIi1 + "\n", console.log(Ii1IIIi1));
            }
            if (illi1iIi == 1 && typeof IIiIliIi.data !== "undefined" && typeof IIiIliIi.data.groupData !== "undefined" && typeof IIiIliIi.data.groupData.groupInfo !== "undefined") for (let lI1IlIl1 of IIiIliIi.data.groupData.groupInfo || []) {
              lI1IlIl1.status == 2 && (console.log("助力满可以领取" + lI1IlIl1.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await lIiiilIi("", 2));
            }
          } else console.log(iIli1i11);
        }
      } catch (I1IiIiIi) {
        $.logErr(I1IiIiIi, iiIl11il);
      } finally {
        lIillliI(iIiIii1I);
      }
    });
  });
}
function I1i1liI(illil1 = "") {
  let llIIiIi = true;
  return new Promise(iI1I1l1i => {
    $.UVCookie = lIIIiil1.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let liIii11l = {
      "url": "https://api.m.jd.com/api?functionId=showCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22actId%22:%22" + $.actId + "%22,%22unionActId%22:%2231165%22,%22unpl%22:%22" + $.unpl + "%22,%22platform%22:" + iilliIii + ",%22unionShareId%22:%22%22," + ($.uiUpdateTime ? "%22uiUpdateTime%22:" + $.uiUpdateTime + "," : "") + "%22d%22:%22" + li1llI1 + "%22,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Cookie": "" + $.UVCookie + l1ii1Ill + " " + cookie,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    liIii11l.headers.Cookie = liIii11l.headers.Cookie.replace(/;\s*$/, "");
    liIii11l.headers.Cookie = liIii11l.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) liIii11l.headers.Referer = $.url2;
    liIii11l = i1iI1iI1(liIii11l);
    var liiIIlli = $;
    if (ilililI1 && $.proxyArr.type && $.proxyArr.type == "socks") liiIIlli = ilililI1;
    liiIIlli.get(liIii11l, async (II1Iii11, lIl1iIii, ll11iil1) => {
      try {
        if (II1Iii11) {
          var l1i1iIi1 = i1Ilili1(II1Iii11, lIl1iIii);
          console.log("" + $.toStr(II1Iii11));
          console.log($.name + " showCoupon API请求失败，请检查网路重试");
          if (l1i1iIi1) {
            await lll1111(false);
            if (!$.switchProxies) await I1i1liI(...arguments);
          }
        } else {
          let lllI1IIl = $.toObj(ll11iil1, ll11iil1);
          if (typeof lllI1IIl == "object") {
            if (lllI1IIl.msg) console.log(lllI1IIl.msg);
            if (lllI1IIl.msg.indexOf("不展示弹层") > -1) $.again = true;
            if (lllI1IIl.msg.indexOf("领取上限") > -1) $.runArr[$.UserName] = true;
            lllI1IIl.msg.indexOf("上限") === -1 && lllI1IIl.msg.indexOf("登录") === -1 && ($.flag = 1);
            if (lllI1IIl.msg.indexOf("活动已结束") > -1 || lllI1IIl.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (lllI1IIl.data.uiUpdateTime) $.uiUpdateTime = lllI1IIl.data.uiUpdateTime;
            if (typeof lllI1IIl.data !== "undefined" && typeof lllI1IIl.data.groupData !== "undefined" && typeof lllI1IIl.data.groupData.joinNum !== "undefined") {
              $.joinNum = lllI1IIl.data.groupData.joinNum;
              let liI11ili = 0;
              for (let lII11il1 of lllI1IIl.data.groupData.groupInfo) {
                if (liI11ili < lII11il1.num) liI11ili = lII11il1.num;
              }
              if ($.shareCount > 0 && liI11ili > $.shareCount) liI11ili = $.shareCount;
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = liI11ili);
              $.shareCodeArr.shareCount = liI11ili;
              if (liI11ili <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) $.shareCodeArr[$.UserName] = {};
                $.shareCodeArr[$.UserName].count = $.joinNum;
                llIIiIi = false;
              }
              console.log("【账号" + $.index + "】" + ($.nickName || $.UserName) + " " + $.joinNum + "/" + liI11ili + "人");
            }
            lllI1IIl.msg.indexOf("活动已结束") > -1 && (llIIiIi = false);
            if (typeof lllI1IIl.data !== "undefined" && typeof lllI1IIl.data.groupData !== "undefined" && typeof lllI1IIl.data.groupData.groupInfo !== "undefined") for (let ii11lIIi of lllI1IIl.data.groupData.groupInfo || []) {
              ii11lIIi.status == 2 && (console.log("助力满可以领取" + ii11lIIi.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await lIiiilIi("", 2));
            }
          } else console.log(ll11iil1);
        }
      } catch (IIll1lI) {
        $.logErr(IIll1lI, lIl1iIii);
      } finally {
        iI1I1l1i(llIIiIi);
      }
    });
  });
}
function ll1I1IIi() {
  if ($.shareCodeArr[$.UserName]) {
    console.log("【账号" + $.index + "】缓存分享码:" + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, "***$1"));
    return;
  }
  return new Promise(lIiil1II => {
    let l1lil1I1 = {
      "url": "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22unionActId%22:%2231165%22,%22actId%22:%22" + $.actId + "%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22" + li1llI1 + "%22,%22supportPic%22:2,%22supportLuckyCode%22:0,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Cookie": "" + $.UVCookie + l1ii1Ill + " " + cookie,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    l1lil1I1.headers.Cookie = l1lil1I1.headers.Cookie.replace(/;\s*$/, "");
    l1lil1I1.headers.Cookie = l1lil1I1.headers.Cookie.replace(/;([^\s])/g, "; $1");
    l1lil1I1 = i1iI1iI1(l1lil1I1);
    var illliI1I = $;
    if (ilililI1 && $.proxyArr.type && $.proxyArr.type == "socks") illliI1I = ilililI1;
    illliI1I.get(l1lil1I1, async (I1Illi1l, iI1IiI1i, ililiiI) => {
      try {
        if (I1Illi1l) {
          var IiiII1II = i1Ilili1(I1Illi1l, iI1IiI1i);
          console.log("" + $.toStr(I1Illi1l));
          console.log($.name + " shareUnionCoupon API请求失败，请检查网路重试");
          if (IiiII1II) {
            await lll1111(false);
            if (!$.switchProxies) await ll1I1IIi();
          }
        } else {
          let II1iIii = $.toObj(ililiiI, ililiiI);
          if (typeof II1iIii == "object") {
            if (II1iIii.code == 0 && II1iIii.data && II1iIii.data.shareUrl) {
              let I11lIlI = II1iIii.data.shareUrl.match(/\?s=([^&]+)/) && II1iIii.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              I11lIlI && (console.log("【账号" + $.index + "】分享码：" + I11lIlI.replace(/.+(.{3})/, "***$1")), $.shareCodeArr[$.UserName] = {
                "code": I11lIlI,
                "count": $.joinNum
              });
            }
          } else console.log(ililiiI);
        }
      } catch (iI1l1Ii1) {
        $.logErr(iI1l1Ii1, iI1IiI1i);
      } finally {
        lIiil1II();
      }
    });
  });
}
function lili11ii() {
  return new Promise(Iil1i1l => {
    let ilii1l11 = {
      "url": $.url1,
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + l1ii1Ill + " " + cookie,
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    var liIIlIlI = $;
    liIIlIlI.get(ilii1l11, async (i1lillii, IlIIlli1, lI1II1l1) => {
      try {
        if (i1lillii) {
          var lI1ii1II = i1Ilili1(i1lillii, IlIIlli1);
          console.log("" + $.toStr(i1lillii));
          console.log($.name + " getUrl1 API请求失败，请检查网路重试");
          if (lI1ii1II) {
            await lll1111(false);
            if (!$.switchProxies) await lili11ii();
          }
        } else ilIIi1il(IlIIlli1), $.url2 = IlIIlli1 && IlIIlli1.headers && (IlIIlli1.headers.location || IlIIlli1.headers.Location || "") || "", $.url2 = decodeURIComponent($.url2), $.url2 = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
      } catch (liiiil1) {
        $.logErr(liiiil1, IlIIlli1);
      } finally {
        Iil1i1l(lI1II1l1);
      }
    });
  });
}
function II1lIiII() {
  return new Promise(ii11IIl => {
    let lil11I = {
      "url": "https://u.jd.com/" + li1llI1 + ($.shareCode && "?s=" + $.shareCode || ""),
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + l1ii1Ill + " " + cookie,
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    var lllllll = $;
    lllllll.get(lil11I, async (illI1iI1, IiiliIll, ilIliI1) => {
      try {
        if (illI1iI1) {
          var llliIII1 = i1Ilili1(illI1iI1, IiiliIll);
          console.log("" + $.toStr(illI1iI1));
          console.log($.name + " getUrl API请求失败，请检查网路重试");
          if (llliIII1) {
            await lll1111(false);
            if (!$.switchProxies) await II1lIiII();
          }
        } else ilIIi1il(IiiliIll), $.url1 = ilIliI1 && ilIliI1.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && ilIliI1.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
      } catch (iiII1l1I) {
        $.logErr(iiII1l1I, IiiliIll);
      } finally {
        ii11IIl(ilIliI1);
      }
    });
  });
}
function ilIIi1il(i11111il) {
  let i1111l1l = i11111il && i11111il.headers && (i11111il.headers["set-cookie"] || i11111il.headers["Set-Cookie"] || "") || "",
    i1iIi1iI = "";
  if (i1111l1l) {
    if (typeof i1111l1l != "object") i1iIi1iI = i1111l1l.split(",");else i1iIi1iI = i1111l1l;
    for (let lllIIlIl of i1iIi1iI) {
      let iIIill1l = lllIIlIl.split(";")[0].trim();
      if (iIIill1l.split("=")[1]) {
        iIIill1l.split("=")[0] == "unpl" && iIIill1l.split("=")[1] && ($.unpl = iIIill1l.split("=")[1]);
        if (l1ii1Ill.indexOf(iIIill1l.split("=")[1]) == -1) l1ii1Ill += iIIill1l.replace(/ /g, "") + "; ";
      }
    }
  }
}
function i1Ilili1(iI111Ili, IIliIi1l) {
  var lIIlIIi1 = false;
  if (lIiiIlli) {
    if (/statusCode=407/.test(iI111Ili)) {
      console.log("代理连接失败");
      lIIlIIi1 = true;
      if ($.getProxyIp) for (let Ii1IlIll of proxyGetIpUrl) {
        if (!Ii1IlIll || Ii1IlIll.status == false) continue;
        if (Ii1IlIll.proxyArr && Ii1IlIll.proxyArr.host == $.proxyArr.host && Ii1IlIll.proxyArr.port == $.proxyArr.port) {
          Ii1IlIll.errorCount++;
          Ii1IlIll.errorCount >= 3 && (console.log("代理池(" + Ii1IlIll.index + ")请求多次失败，禁用"), Ii1IlIll.status = false);
          break;
        }
      }
    } else {
      if (/ESOCKETTIMEDOUT|Timeout awaiting|ETIMEDOUT/.test(iI111Ili)) console.log("请求超时"), lIIlIIi1 = true;else /socket|connect ECONNREFUSED/.test(iI111Ili) && (console.log("代理连接失败"), lIIlIIi1 = true);
    }
  }
  return lIIlIIi1 && ($.switchProxies = true), lIIlIIi1;
}
function i1iI1iI1(ilIiIll1) {
  if ($.proxyArr.host && $.proxyArr.port) {
    if ($.proxyArr.type == "socks") {
      var lIli1IIl = $.proxyArr.type == "socks" ? "socks5" : "http";
      let iiillii = lIli1IIl + "://" + ($.proxyArr.auth && $.proxyArr.auth.username ? $.proxyArr.auth.username + ":" + $.proxyArr.auth.password + "@" : "") + $.proxyArr.host + ":" + $.proxyArr.port;
      if (lIli1IIl == "http") Object.assign(ilIiIll1, {
        "proxy": iiillii
      });else {
        if (ii1lilI1) {
          const lll1Il1i = new ii1lilI1(iiillii);
          Object.assign(ilIiIll1, {
            "agent": lll1Il1i
          });
        }
      }
      delete ilIiIll1.headers["Accept-Encoding"];
    } else {
      const iI1llI1l = {
        "http": III1IIil.httpsOverHttp({
          "proxy": {
            "host": $.proxyArr.host,
            "port": $.proxyArr.port * 1,
            "proxyAuth": $.proxyArr.auth && $.proxyArr.auth.username ? $.proxyArr.auth.username + ":" + $.proxyArr.auth.password : ""
          }
        }),
        "https": III1IIil.httpsOverHttp({
          "proxy": {
            "host": $.proxyArr.host,
            "port": $.proxyArr.port * 1,
            "proxyAuth": $.proxyArr.auth && $.proxyArr.auth.username ? $.proxyArr.auth.username + ":" + $.proxyArr.auth.password : ""
          }
        })
      };
      Object.assign(ilIiIll1, {
        "agent": iI1llI1l
      });
    }
    Object.assign(ilIiIll1, {
      "retry": {
        "limit": 1
      }
    });
  }
  return ilIiIll1;
}
function lil11IIl(I1iI1i11) {
  if (I1iI1i11.status == false) return true;
  return I1iI1i11.count++, new Promise(il1Iiil => {
    let I1iiIi1l = true;
    $.get({
      "url": I1iI1i11.url,
      "timeout": 10000
    }, async (IIiii1I1, i1iI11Il, iliIIli1) => {
      try {
        if (IIiii1I1) console.log("" + $.toStr(IIiii1I1)), console.log($.name + " 获取ip代理池(" + I1iI1i11.index + ") API请求失败，请检查网路重试");else {
          let II1l1I1l = $.toStr(iliIIli1, iliIIli1),
            iIi1ilIi = II1l1I1l.match(/((\d{0,3}\.){3}\d{0,3}):(\d{0,5})/);
          if (iIi1ilIi && iIi1ilIi.length == 4) {
            $.switchProxies && ($.proxyArr.host != iIi1ilIi[1] || $.proxyArr.port != iIi1ilIi[3] ? console.log("切换成功！") : console.log("切换失败，IP不变！"));
            I1iiIi1l = false;
            $.proxyArr.host = iIi1ilIi[1];
            $.proxyArr.port = iIi1ilIi[3];
            $.proxyArr.pin = [];
            $.proxyArr.auth = "";
            var Ii1i1i = new RegExp(iIi1ilIi[1] + ":" + iIi1ilIi[3] + ":(\\S+):([^\\s\"]+)");
            if (Ii1i1i.test(II1l1I1l)) {
              var i1ilIii = II1l1I1l.match(Ii1i1i);
              i1ilIii.length == 3 && ($.proxyArr.auth = {
                "username": i1ilIii[1],
                "password": i1ilIii[2]
              });
            }
            $.getProxyIp = true;
            I1iI1i11.count = 0;
            I1iI1i11.proxyArr = $.proxyArr;
          } else console.log("获取ip代理池(" + I1iI1i11.index + ")失败\n" + iliIIli1), /订单不存在|key无效|无可用余量|过期|充值|续费|登陆|为空|添加|联系|未检索|Error/.test(iliIIli1) && (I1iI1i11.count = 999);
        }
      } catch (liIIiIII) {
        $.logErr(liIIiIII, i1iI11Il);
        console.log(iliIIli1);
      } finally {
        il1Iiil(I1iiIi1l);
      }
    });
  });
}
async function lll1111(IiiI1IiI = true, liII111l = 1) {
  if (IiiI1IiI) {
    $.UA = "jdapp;iPhone;12.2.0;;;M/5.0;appBuild/168919;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify({
      "ciphertype": 5,
      "cipher": {
        "ud": "",
        "sv": "CJGkCm==",
        "iad": ""
      },
      "ts": Math.floor(new Date().getTime() / 1000),
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile",
      "ridx": -1
    })) + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
    liII111l != 1 && ($.UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1");
  }
  try {
    if (lIiiIlli) {
      let ii11ii1 = true;
      if (proxyGetIpUrl && ($.switchProxies || !$.proxyArr.host || !$.getProxyIp)) {
        let l1iiii11 = 1;
        do {
          $.getProxyIp = false;
          for (let liiliIii of proxyGetIpUrl) {
            if (!liiliIii || liiliIii.status == false) continue;
            ii11ii1 = await lil11IIl(liiliIii);
            if (!ii11ii1) break;
            liiliIii.count >= 3 && (console.log("代理池(" + liiliIii.index + ")获取多次失败，禁用"), liiliIii.status = false);
          }
          l1iiii11++;
        } while (ii11ii1 && l1iiii11 <= 4);
      } else proxyGetIpUrl && $.proxyArr.host && (ii11ii1 = false);
      ii11ii1 && ($.proxyArr = {}, console.log("无可用代理地址，使用本地IP\n"));
      if ($.proxyArr.host && $.proxyArr.port) console.log("代理" + ($.getProxyIp ? "池" : "") + "地址:" + $.proxyArr.host + ":" + $.proxyArr.port + "\n");
      $.switchProxies = false;
    }
  } catch (iIllII1I) {
    console.log(iIllII1I);
  }
}
function l1111l11(li1Iiiil) {
  if (typeof li1Iiiil == "string") try {
    return JSON.parse(li1Iiiil);
  } catch (l111ii11) {
    return console.log(l111ii11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function lIiiili1() {
  var llIil1l1 = function () {
    function Iiil(Il11I1, iiIiiI1) {
      Il11I1 = [Il11I1[0] >>> 16, 65535 & Il11I1[0], Il11I1[1] >>> 16, 65535 & Il11I1[1]];
      iiIiiI1 = [iiIiiI1[0] >>> 16, 65535 & iiIiiI1[0], iiIiiI1[1] >>> 16, 65535 & iiIiiI1[1]];
      var il1ilIII = [0, 0, 0, 0];
      return il1ilIII[3] += Il11I1[3] + iiIiiI1[3], il1ilIII[2] += il1ilIII[3] >>> 16, il1ilIII[3] &= 65535, il1ilIII[2] += Il11I1[2] + iiIiiI1[2], il1ilIII[1] += il1ilIII[2] >>> 16, il1ilIII[2] &= 65535, il1ilIII[1] += Il11I1[1] + iiIiiI1[1], il1ilIII[0] += il1ilIII[1] >>> 16, il1ilIII[1] &= 65535, il1ilIII[0] += Il11I1[0] + iiIiiI1[0], il1ilIII[0] &= 65535, [il1ilIII[0] << 16 | il1ilIII[1], il1ilIII[2] << 16 | il1ilIII[3]];
    }
    function llI1111(ilIi1iil, lIllIlI1) {
      ilIi1iil = [ilIi1iil[0] >>> 16, 65535 & ilIi1iil[0], ilIi1iil[1] >>> 16, 65535 & ilIi1iil[1]];
      lIllIlI1 = [lIllIlI1[0] >>> 16, 65535 & lIllIlI1[0], lIllIlI1[1] >>> 16, 65535 & lIllIlI1[1]];
      var li1lIl1I = [0, 0, 0, 0];
      return li1lIl1I[3] += ilIi1iil[3] * lIllIlI1[3], li1lIl1I[2] += li1lIl1I[3] >>> 16, li1lIl1I[3] &= 65535, li1lIl1I[2] += ilIi1iil[2] * lIllIlI1[3], li1lIl1I[1] += li1lIl1I[2] >>> 16, li1lIl1I[2] &= 65535, li1lIl1I[2] += ilIi1iil[3] * lIllIlI1[2], li1lIl1I[1] += li1lIl1I[2] >>> 16, li1lIl1I[2] &= 65535, li1lIl1I[1] += ilIi1iil[1] * lIllIlI1[3], li1lIl1I[0] += li1lIl1I[1] >>> 16, li1lIl1I[1] &= 65535, li1lIl1I[1] += ilIi1iil[2] * lIllIlI1[2], li1lIl1I[0] += li1lIl1I[1] >>> 16, li1lIl1I[1] &= 65535, li1lIl1I[1] += ilIi1iil[3] * lIllIlI1[1], li1lIl1I[0] += li1lIl1I[1] >>> 16, li1lIl1I[1] &= 65535, li1lIl1I[0] += ilIi1iil[0] * lIllIlI1[3] + ilIi1iil[1] * lIllIlI1[2] + ilIi1iil[2] * lIllIlI1[1] + ilIi1iil[3] * lIllIlI1[0], li1lIl1I[0] &= 65535, [li1lIl1I[0] << 16 | li1lIl1I[1], li1lIl1I[2] << 16 | li1lIl1I[3]];
    }
    function ll11liII(illlIi, i1l11il) {
      return 32 === (i1l11il %= 64) ? [illlIi[1], illlIi[0]] : 32 > i1l11il ? [illlIi[0] << i1l11il | illlIi[1] >>> 32 - i1l11il, illlIi[1] << i1l11il | illlIi[0] >>> 32 - i1l11il] : (i1l11il -= 32, [illlIi[1] << i1l11il | illlIi[0] >>> 32 - i1l11il, illlIi[0] << i1l11il | illlIi[1] >>> 32 - i1l11il]);
    }
    function illlili1(lii1I1li, Iiiiiii) {
      return 0 === (Iiiiiii %= 64) ? lii1I1li : 32 > Iiiiiii ? [lii1I1li[0] << Iiiiiii | lii1I1li[1] >>> 32 - Iiiiiii, lii1I1li[1] << Iiiiiii] : [lii1I1li[1] << Iiiiiii - 32, 0];
    }
    function IlliIlIl(I1iI1i1I, i11ll1Il) {
      return [I1iI1i1I[0] ^ i11ll1Il[0], I1iI1i1I[1] ^ i11ll1Il[1]];
    }
    function ii1lii11(i1liiIII) {
      return IlliIlIl(i1liiIII = llI1111(i1liiIII = IlliIlIl(i1liiIII = llI1111(i1liiIII = IlliIlIl(i1liiIII, [0, i1liiIII[0] >>> 1]), [4283543511, 3981806797]), [0, i1liiIII[0] >>> 1]), [3301882366, 444984403]), [0, i1liiIII[0] >>> 1]);
    }
    return {
      "hash128": function (iIi1llIl, Il1i1i) {
        var IIIi11il = Il1i1i || 0;
        Il1i1i = (iIi1llIl = iIi1llIl || "").length % 16;
        var l1Iili1 = iIi1llIl.length - Il1i1i,
          lIIiIilI = [0, IIIi11il];
        IIIi11il = [0, IIIi11il];
        for (var l1lllIl, iii1lI1i, i1ilill1 = [2277735313, 289559509], Iii1lii = [1291169091, 658871167], llIii1il = 0; llIii1il < l1Iili1; llIii1il += 16) l1lllIl = [255 & iIi1llIl.charCodeAt(llIii1il + 4) | (255 & iIi1llIl.charCodeAt(llIii1il + 5)) << 8 | (255 & iIi1llIl.charCodeAt(llIii1il + 6)) << 16 | (255 & iIi1llIl.charCodeAt(llIii1il + 7)) << 24, 255 & iIi1llIl.charCodeAt(llIii1il) | (255 & iIi1llIl.charCodeAt(llIii1il + 1)) << 8 | (255 & iIi1llIl.charCodeAt(llIii1il + 2)) << 16 | (255 & iIi1llIl.charCodeAt(llIii1il + 3)) << 24], iii1lI1i = [255 & iIi1llIl.charCodeAt(llIii1il + 12) | (255 & iIi1llIl.charCodeAt(llIii1il + 13)) << 8 | (255 & iIi1llIl.charCodeAt(llIii1il + 14)) << 16 | (255 & iIi1llIl.charCodeAt(llIii1il + 15)) << 24, 255 & iIi1llIl.charCodeAt(llIii1il + 8) | (255 & iIi1llIl.charCodeAt(llIii1il + 9)) << 8 | (255 & iIi1llIl.charCodeAt(llIii1il + 10)) << 16 | (255 & iIi1llIl.charCodeAt(llIii1il + 11)) << 24], lIIiIilI = Iiil(llI1111(lIIiIilI = Iiil(lIIiIilI = ll11liII(lIIiIilI = IlliIlIl(lIIiIilI, l1lllIl = llI1111(l1lllIl = ll11liII(l1lllIl = llI1111(l1lllIl, i1ilill1), 31), Iii1lii)), 27), IIIi11il), [0, 5]), [0, 1390208809]), IIIi11il = Iiil(llI1111(IIIi11il = Iiil(IIIi11il = ll11liII(IIIi11il = IlliIlIl(IIIi11il, iii1lI1i = llI1111(iii1lI1i = ll11liII(iii1lI1i = llI1111(iii1lI1i, Iii1lii), 33), i1ilill1)), 31), lIIiIilI), [0, 5]), [0, 944331445]);
        switch (l1lllIl = [0, 0], iii1lI1i = [0, 0], Il1i1i) {
          case 15:
            iii1lI1i = IlliIlIl(iii1lI1i, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 14)], 48));
          case 14:
            iii1lI1i = IlliIlIl(iii1lI1i, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 13)], 40));
          case 13:
            iii1lI1i = IlliIlIl(iii1lI1i, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 12)], 32));
          case 12:
            iii1lI1i = IlliIlIl(iii1lI1i, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 11)], 24));
          case 11:
            iii1lI1i = IlliIlIl(iii1lI1i, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 10)], 16));
          case 10:
            iii1lI1i = IlliIlIl(iii1lI1i, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 9)], 8));
          case 9:
            IIIi11il = IlliIlIl(IIIi11il, iii1lI1i = llI1111(iii1lI1i = ll11liII(iii1lI1i = llI1111(iii1lI1i = IlliIlIl(iii1lI1i, [0, iIi1llIl.charCodeAt(llIii1il + 8)]), Iii1lii), 33), i1ilill1));
          case 8:
            l1lllIl = IlliIlIl(l1lllIl, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 7)], 56));
          case 7:
            l1lllIl = IlliIlIl(l1lllIl, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 6)], 48));
          case 6:
            l1lllIl = IlliIlIl(l1lllIl, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 5)], 40));
          case 5:
            l1lllIl = IlliIlIl(l1lllIl, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 4)], 32));
          case 4:
            l1lllIl = IlliIlIl(l1lllIl, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 3)], 24));
          case 3:
            l1lllIl = IlliIlIl(l1lllIl, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 2)], 16));
          case 2:
            l1lllIl = IlliIlIl(l1lllIl, illlili1([0, iIi1llIl.charCodeAt(llIii1il + 1)], 8));
          case 1:
            lIIiIilI = IlliIlIl(lIIiIilI, l1lllIl = llI1111(l1lllIl = ll11liII(l1lllIl = llI1111(l1lllIl = IlliIlIl(l1lllIl, [0, iIi1llIl.charCodeAt(llIii1il)]), i1ilill1), 31), Iii1lii));
        }
        return lIIiIilI = IlliIlIl(lIIiIilI, [0, iIi1llIl.length]), IIIi11il = Iiil(IIIi11il = IlliIlIl(IIIi11il, [0, iIi1llIl.length]), lIIiIilI = Iiil(lIIiIilI, IIIi11il)), lIIiIilI = ii1lii11(lIIiIilI), IIIi11il = Iiil(IIIi11il = ii1lii11(IIIi11il), lIIiIilI = Iiil(lIIiIilI, IIIi11il)), ("00000000" + (lIIiIilI[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (lIIiIilI[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (IIIi11il[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (IIIi11il[1] >>> 0).toString(16)).slice(-8);
      }
    };
  }();
  function Ii1liIIi(IIl1l11l) {
    IIl1l11l = JSON.stringify(IIl1l11l);
    IIl1l11l = encodeURIComponent(IIl1l11l);
    var iil11Il1 = "",
      llI1lIIl = 0;
    do {
      var ilII1l1l = IIl1l11l.charCodeAt(llI1lIIl++),
        Iil11Ili = IIl1l11l.charCodeAt(llI1lIIl++),
        Ii1ll1l = IIl1l11l.charCodeAt(llI1lIIl++),
        IIi11lll = ilII1l1l >> 2;
      ilII1l1l = (3 & ilII1l1l) << 4 | Iil11Ili >> 4;
      var liII11iI = (15 & Iil11Ili) << 2 | Ii1ll1l >> 6,
        ii1IiIi1 = 63 & Ii1ll1l;
      isNaN(Iil11Ili) ? liII11iI = ii1IiIi1 = 64 : isNaN(Ii1ll1l) && (ii1IiIi1 = 64);
      iil11Il1 = iil11Il1 + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(IIi11lll) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(ilII1l1l) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(liII11iI) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(ii1IiIi1);
    } while (llI1lIIl < IIl1l11l.length);
    return iil11Il1 + "/";
  }
  var lIi1l1li = [$.UA.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "896x414", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null],
    lliiIiiI = llIil1l1.hash128(lIi1l1li.join("~~~"), 31),
    IllIIiil = {
      "pin": "",
      "oid": "",
      "bizId": "jd-babelh5",
      "fc": "",
      "mode": "strict",
      "p": "s",
      "fp": lliiIiiI,
      "ctype": 1,
      "v": "3.1.1.0",
      "f": "3",
      "o": "prodev.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html",
      "qs": "",
      "jsTk": "",
      "qi": ""
    },
    i111Ilil = Ii1liIIi(IllIIiil),
    iIiiilli = {},
    lIi1l1li = new Date();
  iIiiilli.ts = {};
  iIiiilli.ts.deviceTime = lIi1l1li.getTime();
  iIiiilli.ca = {
    "tdHash": null
  };
  iIiiilli.m = {
    "compatMode": "CSS1Compat"
  };
  iIiiilli.fo = ["Arial Black", "Bauhaus 93", "Chalkduster", "GungSeo", "Hiragino Sans GB", "Impact", "Menlo", "Papyrus", "Rockwell"];
  iIiiilli.n = {
    "vendorSub": "",
    "productSub": "20030107",
    "vendor": "Apple Computer, Inc.",
    "maxTouchPoints": 1,
    "pdfViewerEnabled": !1,
    "hardwareConcurrency": 10,
    "cookieEnabled": !0,
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": /\/(.+)/g.exec($.UA) && /\/(.+)/g.exec($.UA)[1] || $.UA,
    "platform": "iPhone",
    "product": "Gecko",
    "userAgent": $.UA,
    "language": "zh-CN",
    "onLine": !0,
    "webdriver": !1,
    "javaEnabled": !1,
    "deviceMemory": 8,
    "enumerationOrder": ["vendorSub", "productSub", "vendor", "maxTouchPoints", "scheduling", "userActivation", "doNotTrack", "geolocation", "connection", "plugins", "mimeTypes", "pdfViewerEnabled", "webkitTemporaryStorage", "webkitPersistentStorage", "hardwareConcurrency", "cookieEnabled", "appCodeName", "appName", "appVersion", "platform", "product", "userAgent", "language", "languages", "onLine", "webdriver", "getGamepads", "javaEnabled", "sendBeacon", "vibrate", "bluetooth", "clipboard", "credentials", "keyboard", "managed", "mediaDevices", "storage", "serviceWorker", "virtualKeyboard", "wakeLock", "deviceMemory", "ink", "hid", "locks", "mediaCapabilities", "mediaSession", "permissions", "presentation", "serial", "gpu", "usb", "windowControlsOverlay", "xr", "userAgentData", "clearAppBadge", "getBattery", "getUserMedia", "requestMIDIAccess", "requestMediaKeySystemAccess", "setAppBadge", "webkitGetUserMedia", "getInstalledRelatedApps", "registerProtocolHandler", "unregisterProtocolHandler"]
  };
  iIiiilli.p = [];
  iIiiilli.w = {
    "devicePixelRatio": 1,
    "screenTop": 0,
    "screenLeft": 0
  };
  iIiiilli.s = {
    "availHeight": 896,
    "availWidth": 414,
    "colorDepth": 24,
    "height": 896,
    "width": 414,
    "pixelDepth": 24
  };
  iIiiilli.sc = {
    "ActiveBorder": "rgb(118, 118, 118)",
    "ActiveCaption": "rgb(0, 0, 0)",
    "AppWorkspace": "rgb(255, 255, 255)",
    "Background": "rgb(255, 255, 255)",
    "ButtonFace": "rgb(239, 239, 239)",
    "ButtonHighlight": "rgb(239, 239, 239)",
    "ButtonShadow": "rgb(239, 239, 239)",
    "ButtonText": "rgb(0, 0, 0)",
    "CaptionText": "rgb(0, 0, 0)",
    "GrayText": "rgb(128, 128, 128)",
    "Highlight": "rgb(181, 213, 255)",
    "HighlightText": "rgb(0, 0, 0)",
    "InactiveBorder": "rgb(118, 118, 118)",
    "InactiveCaption": "rgb(255, 255, 255)",
    "InactiveCaptionText": "rgb(128, 128, 128)",
    "InfoBackground": "rgb(255, 255, 255)",
    "InfoText": "rgb(0, 0, 0)",
    "Menu": "rgb(255, 255, 255)",
    "MenuText": "rgb(0, 0, 0)",
    "Scrollbar": "rgb(255, 255, 255)",
    "ThreeDDarkShadow": "rgb(118, 118, 118)",
    "ThreeDFace": "rgb(239, 239, 239)",
    "ThreeDHighlight": "rgb(118, 118, 118)",
    "ThreeDLightShadow": "rgb(118, 118, 118)",
    "ThreeDShadow": "rgb(118, 118, 118)",
    "Window": "rgb(255, 255, 255)",
    "WindowFrame": "rgb(118, 118, 118)",
    "WindowText": "rgb(0, 0, 0)"
  };
  iIiiilli.ss = {
    "cookie": !0,
    "localStorage": !0,
    "sessionStorage": !0,
    "globalStorage": !1,
    "indexedDB": !0
  };
  iIiiilli.tz = -480;
  iIiiilli.lil = "";
  iIiiilli.wil = "";
  iIiiilli.ts.deviceEndTime = new Date().getTime();
  var il1li1l1 = Ii1liIIi(iIiiilli);
  let I1l1I1ii = {
    "url": "https://gia.jd.com/jsTk.do?a=" + i111Ilil,
    "body": "d=" + il1li1l1,
    "headers": {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Origin": "https://pro.m.jd.com",
      "Referer": "https://pro.m.jd.com/",
      "User-Agent": $.UA
    },
    "timeout": 10000
  };
  return I1l1I1ii = i1iI1iI1(I1l1I1ii), new Promise(l11l1iI => {
    var lIiiiII1 = $;
    if (ilililI1 && $.proxyArr.type && $.proxyArr.type == "socks") lIiiiII1 = ilililI1;
    lIiiiII1.post(I1l1I1ii, async (i11ilil, III1iI1i, iIlIllIl) => {
      try {
        if (i11ilil) console.log(i11ilil);else {
          let Il1li = $.toObj(iIlIllIl, iIlIllIl);
          Il1li && typeof Il1li === "object" && Il1li.code == 0 && Il1li.data && Il1li.data.token ? $.eid_token = Il1li.data.token : console.log(iIlIllIl);
        }
      } catch (l1lill1I) {
        $.logErr(l1lill1I, III1iI1i);
      } finally {
        l11l1iI();
      }
    });
  });
}
function iIIIllIl(lll1IiiI, I1ilIli, Il1l1Iii = "") {
  class IIIlIl11 {
    constructor(il1liIIi = "", lillllI = "", li1ll1I1 = "") {
      this.appId = il1liIIi;
      this.v = "4.1";
      lillllI ? this.ua = lillllI : this.ua = this.__genUA();
      this.fp = li1ll1I1 ? li1ll1I1 : this.__genFp();
    }
    ["__format"](l111ill1, lIIl1iiI) {
      if (!l111ill1) l111ill1 = "yyyy-MM-dd";
      var iiIlll;
      !lIIl1iiI ? iiIlll = Date.now() : iiIlll = new Date(lIIl1iiI);
      var liIIIiI = new Date(iiIlll),
        IIIl1iIi = l111ill1,
        lI1lI1lI = {
          "M+": liIIIiI.getMonth() + 1,
          "d+": liIIIiI.getDate(),
          "D+": liIIIiI.getDate(),
          "h+": liIIIiI.getHours(),
          "H+": liIIIiI.getHours(),
          "m+": liIIIiI.getMinutes(),
          "s+": liIIIiI.getSeconds(),
          "w+": liIIIiI.getDay(),
          "q+": Math.floor((liIIIiI.getMonth() + 3) / 3),
          "S+": liIIIiI.getMilliseconds()
        };
      return /(y+)/i.test(IIIl1iIi) && (IIIl1iIi = IIIl1iIi.replace(RegExp.$1, "".concat(liIIIiI.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(lI1lI1lI).forEach(l1111II => {
        if (new RegExp("(".concat(l1111II, ")")).test(IIIl1iIi)) {
          var llIiIiil = "S+" === l1111II ? "000" : "00";
          IIIl1iIi = IIIl1iIi.replace(RegExp.$1, 1 == RegExp.$1.length ? lI1lI1lI[l1111II] : "".concat(llIiIiil).concat(lI1lI1lI[l1111II]).substr("".concat(lI1lI1lI[l1111II]).length));
        }
      }), IIIl1iIi;
    }
    ["__genUA"]() {
      this.uid = $.CryptoJS.SHA1($.UserName + "red").toString();
      let l11l1I1i = this.uid,
        IIlIl1 = ["14.3"],
        ll1IiIIl = IIlIl1[Math.floor(Math.random() * IIlIl1.length)],
        ilIIl1ii = ["12,1"],
        iiilIl = ilIIl1ii[Math.floor(Math.random() * ilIIl1ii.length)],
        ii1lill1 = ["wifi"],
        IIiiIIii = ii1lill1[Math.floor(Math.random() * ii1lill1.length)],
        lIil1iI1 = ll1IiIIl.replace(/\./g, "_"),
        lI1li1iI = [];
      lI1li1iI = [["10.1.4", "167814"]];
      let l1iI1il1 = Math.floor(Math.random() * lI1li1iI.length),
        IIIIliI = lI1li1iI[l1iI1il1] ? lI1li1iI[l1iI1il1] : lI1li1iI[0];
      iiilIl = "iPhone" + iiilIl;
      let IlIi1l1 = "";
      return IlIi1l1 = "jdapp;iPhone;" + IIIIliI[0] + ";" + ll1IiIIl + ";" + l11l1I1i + ";network/" + IIiiIIii + ";model/" + iiilIl + ";addressid/;appBuild/" + IIIIliI[1] + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + lIil1iI1 + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", IlIi1l1;
    }
    ["__genFp"]() {
      function iiI1lI1() {
        function iilllIi1() {
          var I11Illll,
            Il1IIII1,
            l11ii11I = void 0 === (il11iIll = (Il1IIII1 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : il11iIll,
            il11iIll = void 0 === (il11iIll = Il1IIII1.dictType) ? "number" : il11iIll,
            I11IllIl = "";
          if ((Il1IIII1 = Il1IIII1.customDict) && "string" == typeof Il1IIII1) I11Illll = Il1IIII1;else switch (il11iIll) {
            case "alphabet":
              I11Illll = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
              break;
            case "max":
              I11Illll = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
              break;
            case "number":
            default:
              I11Illll = "0123456789";
          }
          for (; l11ii11I--;) I11IllIl += I11Illll[Math.random() * I11Illll.length | 0];
          return I11IllIl;
        }
        function i1i1Ilii(I1iilIii, I1ii1iI1) {
          var lliiiI1l = [],
            ii1lillI = I1iilIii.length,
            iI1iIiiI = I1iilIii.split(""),
            illiliI = "";
          for (; illiliI = iI1iIiiI.shift();) {
            if (Math.random() * ii1lillI < I1ii1iI1) {
              lliiiI1l.push(illiliI);
              if (--I1ii1iI1 == 0) break;
            }
            ii1lillI--;
          }
          for (var ilIi1iiI = "", lIIi1I1I = 0; lIIi1I1I < lliiiI1l.length; lIIi1I1I++) {
            var ilIiilli = Math.random() * (lliiiI1l.length - lIIi1I1I) | 0;
            ilIi1iiI += lliiiI1l[ilIiilli];
            lliiiI1l[ilIiilli] = lliiiI1l[lliiiI1l.length - lIIi1I1I - 1];
          }
          return ilIi1iiI;
        }
        function IilI1llI(Iii1li1l, IIIliIIl) {
          for (let l1Iill1I of IIIliIIl.slice()) Iii1li1l = Iii1li1l.replace(l1Iill1I, "");
          return Iii1li1l;
        }
        var ll1iIIi = "uct6d0jhqw",
          llIlIIl1 = i1i1Ilii(ll1iIIi, 6),
          il11Il1 = Math.random() * 10 | 0,
          IiIIi1iI = IilI1llI(ll1iIIi, llIlIIl1),
          l1llI1i = {};
        l1llI1i.size = il11Il1;
        l1llI1i.customDict = IiIIi1iI;
        var lIiiliI = iilllIi1(l1llI1i) + llIlIIl1 + iilllIi1({
            "size": 10 - il11Il1 - 1,
            "customDict": IiIIi1iI
          }) + il11Il1,
          lIiIIiI1 = lIiiliI.split(""),
          I1iIll1I = lIiIIiI1,
          III1iIll;
        I1iIll1I = lIiIIiI1.slice(0, 14);
        III1iIll = lIiIIiI1.slice(14);
        var ii11IliI = [];
        for (; I1iIll1I.length > 0;) {
          ii11IliI.push((35 - parseInt(I1iIll1I.pop(), 36)).toString(36));
        }
        ii11IliI = ii11IliI.concat(III1iIll);
        var lI11I1i = ii11IliI.join("");
        return lI11I1i;
      }
      var Il11iiIi = iiI1lI1();
      return Il11iiIi;
    }
    ["getRandomIDPro"]() {
      var il11lIlI,
        Ilil1ii,
        ilIl1ilI = void 0 === (IlllI11i = (Ilil1ii = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : IlllI11i,
        IlllI11i = void 0 === (IlllI11i = Ilil1ii.dictType) ? "number" : IlllI11i,
        l111III = "";
      if ((Ilil1ii = Ilil1ii.customDict) && "string" == typeof Ilil1ii) il11lIlI = Ilil1ii;else switch (IlllI11i) {
        case "alphabet":
          il11lIlI = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "max":
          il11lIlI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
          break;
        case "number":
        default:
          il11lIlI = "0123456789";
      }
      for (; ilIl1ilI--;) l111III += il11lIlI[Math.random() * il11lIlI.length | 0];
      return l111III;
    }
    ["Encrypt"](ilIllIii, li1i1Ill) {
      let iI11l1ii = $.CryptoJS.AES.encrypt(ilIllIii, $.CryptoJS.enc.Utf8.parse(li1i1Ill.key), {
        "iv": $.CryptoJS.enc.Utf8.parse(li1i1Ill.iv),
        "mode": $.CryptoJS.mode.CBC,
        "padding": $.CryptoJS.pad.Pkcs7
      });
      return iI11l1ii.ciphertext.toString();
    }
    async ["__genAlgo"]() {
      let IllI1i1i = {
          "wc": 0,
          "wd": 0,
          "l": "zh-cn",
          "ls": "zh-cn",
          "ml": 0,
          "pl": 0,
          "av": /\/(.+)/g.exec(this.ua) && /\/(.+)/g.exec(this.ua)[1] || this.ua,
          "ua": this.ua,
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {},
          "pp1": "",
          "pm": {
            "ps": "prompt",
            "np": "default"
          },
          "w": 414,
          "h": 896,
          "ow": 414,
          "oh": 896,
          "url": "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html?unionActId=31165&d=&s=&cu=true&utm_source=kong&utm_medium=jingfen",
          "og": "https://pro.m.jd.com",
          "pr": 3,
          "re": "https://u.jd.com/",
          "ai": this.appId,
          "fp": this.fp
        },
        II1i1IiI = JSON.stringify(IllI1i1i, null, 2),
        illillI1 = this.Encrypt(II1i1IiI, {
          "key": "wm0!@w-s#ll1flo(",
          "iv": "0102030405060708"
        });
      var iIIIl1iI = {
        "appId": this.appId.toString(),
        "expandParams": illillI1 || "",
        "fp": this.fp,
        "fv": "v1.6.1",
        "platform": "web",
        "timestamp": Date.now(),
        "version": this.v
      };
      return new Promise(il1IllIl => {
        let i1l1I1II = {
          "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
          "body": JSON.stringify(iIIIl1iI),
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "zh-cn",
            "Origin": "https://passport.jd.com",
            "Referer": "https://passport.jd.com/",
            "user-agent": this.ua
          },
          "timeout": 30000
        };
        $.post(i1l1I1II, async (i1IiliI1, I11i1i1l, lIiIiili) => {
          try {
            if (i1IiliI1) console.log(i1IiliI1);else {
              let lIIiIIII = $.toObj(lIiIiili, lIiIiili);
              lIIiIIII && typeof lIIiIIII === "object" && lIIiIIII.data && lIIiIIII.data.result && lIIiIIII.data.result.tk && (this.tk = lIIiIIII.data.result.tk, this.genKey = new Function("return " + lIIiIIII.data.result.algo)());
            }
          } catch (illIi1iI) {
            $.logErr(illIi1iI, I11i1i1l);
          } finally {
            il1IllIl();
          }
        });
      });
    }
    ["__genH5st"](l1i1lIli = {}, I1lllilI = "") {
      let Illl11ii = undefined,
        IIIIiII1 = {
          "ua": this.ua,
          "uid": this.uid
        };
      if (this.tk && this.genKey) {
        this.time = Date.now();
        this.timestamp = this.__format("yyyyMMddhhmmssSSS", this.time);
        let I1i1iiIi = this.genKey(this.tk, this.fp.toString(), this.timestamp.toString(), this.appId.toString(), $.CryptoJS).toString();
        var lI1I1 = {},
          IlIi1i1l = null;
        IlIi1i1l = Object.keys(l1i1lIli).sort().map(function (l11Ii1i) {
          var lll11li = {};
          return lll11li.key = l11Ii1i, lll11li.value = l1i1lIli[l11Ii1i], lll11li;
        }).filter(function (I1iI1IIi) {
          var iii111ll = I1iI1IIi.value,
            iliIliIi = "number" == typeof iii111ll && !isNaN(iii111ll) || "string" == typeof iii111ll || "boolean" == typeof iii111ll || "body" == I1iI1IIi.key;
          if (iliIliIi) {
            if ("body" == I1iI1IIi.key && typeof I1iI1IIi.value == "object") I1iI1IIi.value = JSON.stringify(I1iI1IIi.value);
            lI1I1[I1iI1IIi.key] = I1iI1IIi.value;
          }
          return iliIliIi;
        });
        l1i1lIli = lI1I1;
        let iliiiI1l = "";
        iliiiI1l = Object.keys(l1i1lIli).map(function (liIiii) {
          return liIiii + ":" + (liIiii == "body" && l1i1lIli[liIiii].length !== 64 && l1i1lIli[liIiii].slice(0, 1) == "{" ? $.CryptoJS.SHA256(l1i1lIli[liIiii]).toString($.CryptoJS.enc.Hex) : l1i1lIli[liIiii]);
        }).join("&");
        iliiiI1l = $.CryptoJS.MD5(I1i1iiIi + iliiiI1l + I1i1iiIi).toString($.CryptoJS.enc.Hex);
        let l11llilI = {
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {},
          "extend": {
            "pm": 0,
            "wd": 0,
            "l": 0,
            "ls": 2,
            "wk": 0
          },
          "random": this.getRandomIDPro({
            "size": 10,
            "dictType": "max",
            "customDict": null
          }),
          "referer": "https://passport.jd.com/",
          "v": "v1.6.1",
          "fp": this.fp
        };
        I1lllilI && (l11llilI.pp.p1 = I1lllilI);
        let II1l1iil = JSON.stringify(l11llilI, null, 2),
          il11iIli = this.Encrypt(II1l1iil, {
            "key": "HL4|FW#Chc3#q?0)",
            "iv": "0102030405060708"
          });
        Illl11ii = [this.timestamp, this.fp, this.appId.toString(), this.tk, iliiiI1l, this.v, this.time.toString(), il11iIli].join(";");
        IIIIiII1.t = l1i1lIli.t;
      }
      return IIIIiII1.h5st = Illl11ii, IIIIiII1;
    }
  }
  lIi1Ii1i = new IIIlIl11(lll1IiiI, I1ilIli, Il1l1Iii);
}
function iIIlI1Ii() {
  class il11liI1 {
    constructor() {
      this.UVCookie = "";
      this.ltr = 0;
      this.mr = [1, 0];
      this.mbaFlag = true;
      this.document = {
        "cookie": "",
        "cookies": "__jdc=123;",
        "domain": "prodev.m.jd.com",
        "referrer": "https://u.jd.com/",
        "location": {
          "href": "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html",
          "hrefs": "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html"
        }
      };
      this.navigator = {
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        "userAgents": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
      };
      this.window = {};
    }
    ["getUVCookie"](lilIllii = "", lil1i1ll = "", I1llilii = "", liiI11Il = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (I1llilii) this.document.location.href = I1llilii;
        if (liiI11Il) this.document.cookie = liiI11Il;
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (this.mbaFlag) {
          this.mr[1]++;
          this.mr[1] >= 314 && (this.mr[1] = Math.round(31 * Math.random()));
          !lil1i1ll && (lil1i1ll = $.CryptoJS.SHA1("").toString());
          let i1IIIlil = 0;
          while (true) {
            this.mr[0] = parseInt(lil1i1ll.match(/\d/g)[i1IIIlil]);
            i1IIIlil++;
            if (this.mr[0] > 0 || i1IIIlil >= lil1i1ll.match(/\d/g).length) break;
          }
          this.mr[0] += Math.round((new Date().getTime() - new Date("2023-06-02").getTime()) / 86400000);
        }
        if (lilIllii) this.navigator.userAgent = lilIllii;
        return this.lr = {
          "ckJda": "__jda",
          "ckJdb": "__jdb",
          "ckJdv": "__jdv",
          "ckJdc": "__jdc",
          "refUrl": "https://u.jd.com/"
        }, this.q(), this.s(lil1i1ll), this.UVCookie;
      } catch (iIiIlIII) {
        console.log(iIiIlIII);
      }
    }
    ["s"](l1lillli = "") {
      var I111ili,
        llII1i,
        liiIliI1,
        iIIiil1l,
        I11IIiIl = (this.getCookie(this.lr.ckJda) || "").split("."),
        l1iIIlI1 = (this.getCookie(this.lr.ckJdb) || "").split("."),
        Iiiiii1l = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        liiII1ii = this.getCookie(this.lr.ckJdc) || "",
        lIl111l = parseInt((new Date().getTime() - this.ltr) / 1000),
        lI1iiIIl = 0,
        lIiil1i = 1,
        iiilI1Ii = "direct",
        Il1lIl1i = "-",
        li1iil = "none",
        IiIilll = "-";
      if (I11IIiIl.length > 3) for (var IliilI1i = 2; IliilI1i < 5 && IliilI1i < I11IIiIl.length; IliilI1i++) {
        var Ilili111 = I11IIiIl[IliilI1i];
        Ilili111.length > 10 && (I11IIiIl[IliilI1i] = Ilili111.substr(0, 10));
      }
      I11IIiIl.length > 5 ? (liiIliI1 = I11IIiIl[0], iIIiil1l = I11IIiIl[1], I111ili = parseInt(I11IIiIl[2], 10), llII1i = parseInt(I11IIiIl[3], 10), lIl111l = parseInt(I11IIiIl[4], 10), lIiil1i = parseInt(I11IIiIl[5], 10) || lIiil1i) : (iIIiil1l = this.genUuid(), I111ili = lIl111l, llII1i = lIl111l);
      this.lr.uuid = iIIiil1l;
      l1iIIlI1.length > 3 && (liiIliI1 || (liiIliI1 = l1iIIlI1[0]), lI1iiIIl = parseInt(l1iIIlI1[1], 10) || 0);
      Iiiiii1l.length > 4 && (liiIliI1 || (liiIliI1 = Iiiiii1l[0]), iiilI1Ii = Iiiiii1l[1], Il1lIl1i = Iiiiii1l[2], li1iil = Iiiiii1l[3], IiIilll = Iiiiii1l[4]);
      liiII1ii && "" !== liiII1ii && (liiIliI1 || (liiIliI1 = liiII1ii));
      var iIIiilII,
        i1iIiil1 = [],
        IIii1Ii1 = l1iIIlI1.length < 4,
        lliIIi = this.getParameter("utm_source"),
        lliIiiI = false;
      if (lliIIi) {
        var IiI1I1l = this.getParameter("utm_campaign"),
          ll1I1iil = this.getParameter("utm_medium"),
          ilI1lIIi = this.getParameter("utm_term");
        i1iIiil1.push(lliIIi || iiilI1Ii);
        i1iIiil1.push(IiI1I1l || Il1lIl1i);
        i1iIiil1.push(ll1I1iil || li1iil);
        i1iIiil1.push(ilI1lIIi || IiIilll);
        IiIilll = i1iIiil1[3];
        lliIiiI = !0;
      } else {
        var iliIll1l,
          IIllIliI = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          llIIlii1 = false;
        if (IIllIliI && IIllIliI.indexOf(this.lr.ckDomain) < 0) {
          for (iliIll1l = this.lr.seo, IliilI1i = 0; IliilI1i < iliIll1l.length; IliilI1i++) {
            var lIli1I = iliIll1l[IliilI1i].split(":");
            if (IIllIliI.indexOf(lIli1I[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((lIli1I[1] + "=").toLowerCase()) > -1) {
              var illIiiI = this.getParameter(lIli1I[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(illIiiI) && (illIiiI = encodeURIComponent(illIiiI));
              i1iIiil1.push(lIli1I[0]);
              i1iIiil1.push("-");
              i1iIiil1.push("organic");
              i1iIiil1.push(illIiiI || "not set");
              IiIilll = i1iIiil1[3];
              llIIlii1 = !0;
              break;
            }
          }
          llIIlii1 || (IIllIliI.indexOf("zol.com.cn") > -1 ? (i1iIiil1.push("zol.com.cn"), i1iIiil1.push("-"), i1iIiil1.push("cpc"), i1iIiil1.push("not set")) : (i1iIiil1.push(IIllIliI), i1iIiil1.push("-"), i1iIiil1.push("referral"), i1iIiil1.push("-")));
        }
      }
      iIIiilII = i1iIiil1.length > 0 && (i1iIiil1[0] !== iiilI1Ii || i1iIiil1[1] !== Il1lIl1i || i1iIiil1[2] !== li1iil) && "referral" !== i1iIiil1[2];
      IIii1Ii1 || !IIii1Ii1 && iIIiilII ? (iiilI1Ii = i1iIiil1[0] || iiilI1Ii, Il1lIl1i = i1iIiil1[1] || Il1lIl1i, li1iil = i1iIiil1[2] || li1iil, IiIilll = i1iIiil1[3] || IiIilll, I11IIiIl.length > 5 ? (I111ili = parseInt(I11IIiIl[2], 10), llII1i = parseInt(I11IIiIl[4], 10), lIl111l = parseInt((new Date().getTime() - this.ltr) / 1000), lIiil1i++, lI1iiIIl = 1) : (lIiil1i = 1, lI1iiIIl = 1)) : lI1iiIIl++;
      var lliliIil = this.getPageParamFromSdk();
      if (lliliIil && lliliIil.vts) {
        var IIIili = 1 * lliliIil.vts,
          IiIIlliI = 1 * lliliIil.seq;
        (IIIili > lIiil1i || IIIili === lIiil1i && IiIIlliI >= lI1iiIIl) && (lIiil1i = IIIili, lI1iiIIl = IiIIlliI + 1);
      }
      if (liiIliI1 || (liiIliI1 = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [liiIliI1, iIIiil1l, I111ili, llII1i, lIl111l, lIiil1i || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [liiIliI1, lI1iiIIl, iIIiil1l + "|" + lIiil1i, lIl111l].join("."), this.lr.ckDomain, this.lr.ckJdbExp), lliIiiI || iIIiilII || Iiiiii1l.length < 5) {
        var iIiili1i = [liiIliI1, iiilI1Ii || "direct", Il1lIl1i || "-", li1iil || "none", IiIilll || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(iIiili1i = encodeURIComponent(iIiili1i), liiIliI1);
      }
      this.setCookie(this.lr.ckJdc, liiIliI1, this.lr.ckDomain);
      if (this.mbaFlag) {
        this.setCookie("shshshfpa", this.shshshfpa(), this.lr.ckDomain);
        this.setCookie("mba_sid", this.mr.join("."), this.lr.ckDomain);
        this.setCookie("mba_muid", [iIIiil1l, this.mr[0], new Date().getTime()].join("."), this.lr.ckDomain);
        this.setCookie("pre_seq", Math.round(5 * Math.random()) * 2 + 1, this.lr.ckDomain);
        var lI1iiIIl = 0;
        var i1l1II = "";
        if (l1lillli) {
          while (true) {
            i1l1II += l1lillli.match(/\d/g)[lI1iiIIl];
            lI1iiIIl++;
            if (i1l1II.split("").length >= 2 || lI1iiIIl >= l1lillli.match(/\d/g).length) break;
          }
          this.setCookie("pre_session", l1lillli + "|" + (parseInt(this.mr[0]) + parseInt(i1l1II)), this.lr.ckDomain);
        }
      }
    }
    ["shshshfpa"]() {
      var llIlil1I = "";
      for (var llililli = 1; llililli <= 32; llililli++) {
        var I1lii1II = Math.floor(Math.random() * 16).toString(16);
        llIlil1I += I1lii1II;
        if (llililli == 8 || llililli == 12 || llililli == 16 || llililli == 20) llIlil1I += "-";
      }
      var I1l11lil = Date.parse(new Date());
      return I1l11lil = I1l11lil / 1000, llIlil1I += "-" + I1l11lil, llIlil1I;
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
    ["setCookie"](li111l, i1I1iIIl, liii11ll, I1Ilili1) {
      if (li111l) {
        var l11iI = "";
        if (I1Ilili1) {
          var l1liii = new Date();
          l1liii.setTime(l1liii.getTime() - this.ltr + I1Ilili1);
          l11iI = ";expires=" + l1liii.toGMTString();
        }
        this.UVCookie += li111l + "=" + i1I1iIIl + "; ";
      }
    }
    ["setJdv"](l1iI1lli, iilIilli, l1l1ilIl) {
      var l1l1Ili1 = "";
      l1l1Ili1 = this.isPrey(10) && (!l1iI1lli || l1iI1lli.length > 400) ? iilIilli + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : l1iI1lli;
      var IiilIil = l1l1ilIl || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", l1l1Ili1, this.lr.ckDomain, IiilIil);
    }
    ["getCookie"](lI11llIi, liI1i11) {
      var ili1i11i = this.document.cookie.match(new RegExp("(^| )" + lI11llIi + "=([^;]*)(;|$)"));
      return null !== ili1i11i ? liI1i11 ? ili1i11i[2] : this.urlDecode(ili1i11i[2]) : "";
    }
    ["genUuid"]() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    ["getParameter"](lli1Ii1i, II1IIiil) {
      var IiIiIl1l = II1IIiil || this.document.location.href,
        I1l1iiII = new RegExp("(?:^|&|[?]|[/])" + lli1Ii1i + "=([^&]*)").exec(IiIiIl1l);
      return I1l1iiII ? this.urlDecode(I1l1iiII[1]) : null;
    }
    ["urlDecode"](IIl1lII1) {
      try {
        return decodeURIComponent(IIl1lII1);
      } catch (lilll1lI) {
        return IIl1lII1;
      }
    }
    ["genHash"](il1Ill1I) {
      var iII1iiIl,
        I111ii1I = 1,
        lIII1i1I = 0;
      if (il1Ill1I) for (I111ii1I = 0, iII1iiIl = il1Ill1I.length - 1; iII1iiIl >= 0; iII1iiIl--) {
        I111ii1I = 0 !== (lIII1i1I = 266338304 & (I111ii1I = (I111ii1I << 6 & 268435455) + (lIII1i1I = il1Ill1I.charCodeAt(iII1iiIl)) + (lIII1i1I << 14))) ? I111ii1I ^ lIII1i1I >> 21 : I111ii1I;
      }
      return I111ii1I;
    }
    ["isPrey"](l1l1IIl) {
      if (l1l1IIl >= 100) return !0;
      var IIlliIi1 = this.lr.uuid,
        Iii1lill = IIlliIi1.substr(IIlliIi1.length - 2);
      return !!Iii1lill && 1 * Iii1lill < l1l1IIl;
    }
    ["isEmbedded"]() {
      var li11iili = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(li11iili) || this.isJdLog();
    }
    ["isJdLog"]() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    ["getPageParamFromSdk"]() {
      var IiIilli, IIiIIIiI;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? IIiIIIiI = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? IIiIIIiI = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (IIiIIIiI = this.window.prompt("JDMAGetMPageParam", ""));
        IIiIIIiI && (IiIilli = JSON.parse(IIiIIIiI));
      } catch (IIlIlii1) {}
      return IiIilli;
    }
    ["time"](iiiiliIl, IlIIilil = null) {
      const iilIlI1l = IlIIilil ? new Date(IlIIilil) : new Date();
      let lliII11I = {
        "M+": iilIlI1l.getMonth() + 1,
        "d+": iilIlI1l.getDate(),
        "H+": iilIlI1l.getHours(),
        "m+": iilIlI1l.getMinutes(),
        "s+": iilIlI1l.getSeconds(),
        "q+": Math.floor((iilIlI1l.getMonth() + 3) / 3),
        "S": iilIlI1l.getMilliseconds()
      };
      /(y+)/.test(iiiiliIl) && (iiiiliIl = iiiiliIl.replace(RegExp.$1, (iilIlI1l.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let lIIlIi1I in lliII11I) new RegExp("(" + lIIlIi1I + ")").test(iiiiliIl) && (iiiiliIl = iiiiliIl.replace(RegExp.$1, 1 == RegExp.$1.length ? lliII11I[lIIlIi1I] : ("00" + lliII11I[lIIlIi1I]).substr(("" + lliII11I[lIIlIi1I]).length)));
      return iiiiliIl;
    }
  }
  lIIIiil1 = new il11liI1();
}
function IlI11I1I(i11lIilI) {
  i11lIilI = i11lIilI || 32;
  let iilIIli1 = "abcdef0123456789",
    I1liIl11 = iilIIli1.length,
    ii11i1II = "";
  for (i = 0; i < i11lIilI; i++) ii11i1II += iilIIli1.charAt(Math.floor(Math.random() * I1liIl11));
  return ii11i1II;
}