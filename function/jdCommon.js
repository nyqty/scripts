/*
通用代码库
new Env('jdCommon');
*/

const Il1lilIl = require("crypto-js/sha1"),
  i11l1il1 = require("got");
class lIIIIli {
  constructor() {
    this.ck = "";
    this.UserAgent = "";
    this.H5st = null;
  }
  ["parseUrl"](i1iilIIi) {
    try {
      const liIlIlIl = new URL(i1iilIIi);
      return liIlIlIl;
    } catch (ili1iIli) {
      return {};
    }
  }
  ["parseUrlParameter"](IliII1ll) {
    try {
      const Il1I = this.parseUrl(IliII1ll),
        Iii11lii = new URLSearchParams(Il1I?.["search"]),
        ii1iIlIl = {};
      for (const [IIIll11, ll1IIIi1] of Iii11lii) {
        ii1iIlIl[IIIll11] = ll1IIIi1;
      }
      return ii1iIlIl;
    } catch {
      return {};
    }
  }
  ["getUrlParameter"](iIiiiIIi, iiiilIl1) {
    try {
      const ilIIII1I = new URL(iIiiiIIi),
        l1IllIlI = ilIIII1I.searchParams.get(iiiilIl1);
      return l1IllIlI || "";
    } catch {
      return "";
    }
  }
  ["objectToQueryString"](Iii1liII) {
    const iI1IIli = [];
    for (const lli11lil in Iii1liII) {
      if (Iii1liII.hasOwnProperty(lli11lil)) {
        const l1Iiliii = Iii1liII[lli11lil];
        if (l1Iiliii !== undefined && l1Iiliii !== null) {
          const Ii1illi = encodeURIComponent(lli11lil),
            IIililll = encodeURIComponent(l1Iiliii);
          iI1IIli.push(Ii1illi + "=" + IIililll);
        }
      }
    }
    return iI1IIli.join("&");
  }
  ["getResponseCookie"](IiIIl1I, IillIl1) {
    let l1lIIlii = "";
    if (IiIIl1I.headers["set-cookie"]) {
      for (let Il1llI1 of IiIIl1I.headers["set-cookie"]) {
        l1lIIlii += Il1llI1.split(";")[0].split("=")[0] + "=" + Il1llI1.split(";")[0].split("=")[1] + "; ";
      }
    } else {
      IillIl1 && (l1lIIlii = IillIl1);
    }
    return l1lIIlii;
  }
  ["getCookieValue"](IilI11I1, ilI1l1ii) {
    if (!IilI11I1 || !ilI1l1ii) return "";
    var iiiil1i = new RegExp(ilI1l1ii + "=" + "([^;]*)" + ";"),
      IIl1Ilil = iiiil1i.exec(IilI11I1);
    return IIl1Ilil && IIl1Ilil[1] || "";
  }
  ["parseCookie"](Ili1ilIi) {
    const l1llIilI = {},
      IIilIiil = Ili1ilIi.split(";");
    for (const i11IIII of IIilIiil) {
      const [l1ii1iII, i1iIli1I] = i11IIII.trim().split("=");
      l1llIilI[l1ii1iII] = i1iIli1I;
    }
    return l1llIilI;
  }
  ["genUuid"](i1l1II = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", ii1iii1 = "0123456789abcdef") {
    let iI11iI1I = "";
    for (let IIiIlI of i1l1II) {
      if (IIiIlI == "x") iI11iI1I += ii1iii1.charAt(Math.floor(Math.random() * ii1iii1.length));else IIiIlI == "X" ? iI11iI1I += ii1iii1.charAt(Math.floor(Math.random() * ii1iii1.length)).toUpperCase() : iI11iI1I += IIiIlI;
    }
    return iI11iI1I;
  }
  ["genEp"](iiiI1I1l, i1iIlI = "15.1.1") {
    let ll1IiIii = {
      "ciphertype": 5,
      "cipher": {
        "ud": this._base64Encode(Il1lilIl(iiiI1I1l).toString()),
        "sv": this._base64Encode(i1iIlI),
        "iad": ""
      },
      "ts": Math.floor(Date.now() / 1000),
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile",
      "ridx": -1
    };
    return JSON.stringify(ll1IiIii);
  }
  ["genUA"](ii1i1111, iiIIllll = "jd", iiiI111 = {}) {
    const lllliIl1 = {
        "jd": {
          "app": "jdapp",
          "appBuild": "168858",
          "client": "iPhone",
          "clientVersion": "12.1.0"
        },
        "lite": {
          "app": "jdltapp",
          "appBuild": "1247",
          "client": "ios",
          "clientVersion": "6.0.0"
        }
      },
      lIIiiIi = iiiI111?.["ep"] ? iiiI111?.["ep"] : true,
      li1IIIIi = iiiI111?.["client"] ? iiiI111?.["client"] : lllliIl1[iiIIllll].client,
      II1II1i = iiiI111?.["clientVersion"] ? iiiI111?.["clientVersion"] : lllliIl1[iiIIllll].clientVersion,
      iII1l1i = ["16.6", "16.5", "16.4", "16.3", "16.2", "16.1", "16.0", "15.6", "15.1", "14.5"],
      iI11i111 = iII1l1i[Math.floor(Math.random() * iII1l1i.length)],
      l11lI11I = "iPhone; CPU iPhone OS " + iI11i111.replace(".", "_") + " like Mac OS X",
      li1I11ll = li1IIIIi === "apple" || li1IIIIi === "iPhone" ? "iPhone" : "android",
      ilIl1I1i = this.genEp(ii1i1111, iI11i111),
      li1llil1 = this.genUuid(),
      IlI1IIll = [lllliIl1[iiIIllll].app, li1I11ll, II1II1i, "", "rn/" + li1llil1, "M/5.0", "appBuild/" + lllliIl1[iiIIllll].appBuild, "jdSupportDarkMode/0", "ef/1", lIIiiIi ? "ep/" + encodeURIComponent(ilIl1I1i) : "", "Mozilla/5.0 (" + l11lI11I + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      I1lIlIil = IlI1IIll.join(";");
    return this.UserAgent = I1lIlIil, I1lIlIil;
  }
  async ["loadH5st"]() {
    if (!this.H5st) {
      try {
        this.H5st = require(__dirname + "/krgetH5st");
      } catch (IliIllii) {
        console.log("❌ H5st 加载失败");
      }
    }
  }
  async ["getLoginStatus"](l1ll1i1 = this.ck) {
    if (!l1ll1i1) {
      return console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie"), undefined;
    }
    let llillIIl = 0,
      i11lIiIl = null;
    const l1IiIlli = 1;
    while (llillIIl < l1IiIlli) {
      const Ii1Iil1 = "https://plogin.m.jd.com/cgi-bin/ml/islogin",
        iIl1i1iI = {
          "headers": {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Connection": "keep-alive",
            "Cookie": l1ll1i1,
            "Host": "plogin.m.jd.com",
            "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
          },
          "timeout": 10000
        };
      try {
        const I11lIIi = await i11l1il1.post(Ii1Iil1, iIl1i1iI);
        if (I11lIIi.body) try {
          const iIIl1II1 = JSON.parse(I11lIIi.body);
          if (iIIl1II1) {
            if (iIIl1II1.islogin === "1") return true;else {
              if (iIIl1II1.islogin === "0") {
                return false;
              }
            }
          }
        } catch (lil11l1) {
          i11lIiIl = "🚫 getLoginStatus 处理响应数据失败 ➜ " + (lil11l1.message || lil11l1);
          llillIIl++;
        } else i11lIiIl = "🚫 getLoginStatus 请求失败 ➜ 无响应数据", llillIIl++;
      } catch (lllii111) {
        i11lIiIl = "🚫 getLoginStatus 请求异常 ➜ " + (lllii111.message || lllii111);
        llillIIl++;
      }
    }
    return llillIIl >= l1IiIlli && console.log(i11lIiIl), undefined;
  }
  async ["joinShopMember"](IIllI1lI, lillI1Ii = this.ck) {
    if (!lillI1Ii) return console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie"), undefined;
    if (!IIllI1lI) return;
    await this.loadH5st();
    const ii1Il1I = "{\"venderId\":\"" + IIllI1lI + "\",\"shopId\":\"" + IIllI1lI + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0,\"channel\":406}",
      I1ii1llI = {
        "appId": "27004",
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ii1Il1I),
        "version": "3.1",
        "ua": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
      },
      lIli11i1 = await this.H5st.getH5st(I1ii1llI),
      iI1liiii = "https://api.m.jd.com/client.action?" + lIli11i1.params,
      Ii1II1ll = {
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
          "Cookie": lillI1Ii
        },
        "timeout": 10000
      };
    try {
      const iilII1il = await i11l1il1.get(iI1liiii, Ii1II1ll);
      if (iilII1il.body) {
        const IIl1111I = JSON.parse(iilII1il.body);
        if (IIl1111I.success === true) {
          if (IIl1111I.result && IIl1111I.result.giftInfo) for (let lIIili1 of IIl1111I.result?.["giftInfo"]?.["giftList"]) {
            console.log(" >> 入会获得：" + lIIili1.discountString + lIIili1.prizeName + lIIili1.secondLineDesc);
          }
          return true;
        } else {
          if (IIl1111I.message) return console.log("🚫 加入店铺会员失败 ➜ " + IIl1111I.message), false;else console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(IIl1111I));
        }
      } else console.log("🚫 bindWithVender API请求失败 ➜ 无响应数据");
    } catch (li11ll1I) {
      console.log("🚫 bindWithVender API在处理请求时遇到了错误 ➜ " + (li11ll1I.message || li11ll1I));
    }
    return undefined;
  }
  async ["getShopMemberStatus"](iIiIIII, iil11I = this.ck) {
    if (!iil11I) return console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie"), undefined;
    if (!iIiIIII) return;
    await this.loadH5st();
    let lIi1iii1 = "{\"venderId\":\"" + iIiIIII + "\",\"channel\":406,\"payUpShop\":true}";
    const iIlli1i1 = {
        "appId": "27004",
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIi1iii1),
        "version": "3.1",
        "ua": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
      },
      IIIIlI = await this.H5st.getH5st(iIlli1i1),
      iI1Illi = "https://api.m.jd.com/client.action?" + IIIIlI.params,
      ili1ili1 = {
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
          "Cookie": iil11I
        },
        "timeout": 10000
      };
    try {
      const Ill11il1 = await i11l1il1.get(iI1Illi, ili1ili1);
      if (Ill11il1.body) {
        const i111l1li = JSON.parse(Ill11il1.body);
        if (i111l1li.success === true) {
          console.log("去加入：" + (i111l1li.result.shopMemberCardInfo.venderCardName || "未知"));
          openCardStatus = i111l1li.result?.["userInfo"]?.["openCardStatus"];
          if (openCardStatus === 1) {
            return true;
          } else return false;
        } else i111l1li.message ? console.log("🚫 获取店铺会员状态异常 ➜ " + i111l1li.message) : console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(i111l1li));
      } else console.log("🚫 getShopOpenCardInfo API请求失败 ➜ 无响应数据");
    } catch (lIllll1l) {
      console.log("🚫 getShopOpenCardInfo API在处理请求时遇到了错误 ➜ " + (lIllll1l.message || lIllll1l));
    }
    return undefined;
  }
  ["setCookie"](ll11IllI) {
    this.ck = ll11IllI;
  }
  ["unsetCookie"]() {
    this.ck = "";
    this.UserAgent = "";
  }
  ["_utf8Encode"](liIi1Ii1) {
    liIi1Ii1 = liIi1Ii1.replace(/rn/g, "n");
    for (var iI11liii = 0; iI11liii < liIi1Ii1.length; iI11liii++) {
      var Ilil1Iil = "",
        Iii1ilii = liIi1Ii1.charCodeAt(iI11liii);
      if (Iii1ilii < 128) Ilil1Iil += String.fromCharCode(Iii1ilii);else Iii1ilii > 127 && Iii1ilii < 2048 ? (Ilil1Iil += String.fromCharCode(Iii1ilii >> 6 | 192), Ilil1Iil += String.fromCharCode(Iii1ilii & 63 | 128)) : (Ilil1Iil += String.fromCharCode(Iii1ilii >> 12 | 224), Ilil1Iil += String.fromCharCode(Iii1ilii >> 6 & 63 | 128), Ilil1Iil += String.fromCharCode(Iii1ilii & 63 | 128));
    }
    return Ilil1Iil;
  }
  ["_base64Encode"](IlI1ll, lIIiil1l = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
    var lili11ll = "",
      IIil111l,
      l11i1I1l,
      ii11ll1l,
      ii1liIil,
      IliilIl,
      IiliIi11,
      IIIl1Ill,
      iiIIIII = 0;
    IlI1ll = this._utf8Encode(IlI1ll);
    while (iiIIIII < IlI1ll.length) {
      IIil111l = IlI1ll.charCodeAt(iiIIIII++);
      l11i1I1l = IlI1ll.charCodeAt(iiIIIII++);
      ii11ll1l = IlI1ll.charCodeAt(iiIIIII++);
      ii1liIil = IIil111l >> 2;
      IliilIl = (IIil111l & 3) << 4 | l11i1I1l >> 4;
      IiliIi11 = (l11i1I1l & 15) << 2 | ii11ll1l >> 6;
      IIIl1Ill = ii11ll1l & 63;
      if (isNaN(l11i1I1l)) {
        IiliIi11 = IIIl1Ill = 64;
      } else {
        if (isNaN(ii11ll1l)) {
          IIIl1Ill = 64;
        }
      }
      lili11ll = lili11ll + lIIiil1l.charAt(ii1liIil) + lIIiil1l.charAt(IliilIl) + lIIiil1l.charAt(IiliIi11) + lIIiil1l.charAt(IIIl1Ill);
    }
    while (lili11ll.length % 4 > 1) lili11ll += "=";
    return lili11ll;
  }
}
module.exports = new lIIIIli();