/*
通用代码库
new Env('jdCommon');
*/

const l1I11il = require("crypto-js/sha1"),
  II1ii = require("got");
class l1iiil1i {
  constructor() {
    this.ck = "";
    this.UserAgent = "";
    this.getH5st = null;
  }
  ["getUrlParameter"](II11iIi1, ilIlIi1l) {
    try {
      const IIIiiIli = new URL(II11iIi1),
        iil1lli = IIIiiIli.searchParams.get(ilIlIi1l);
      return iil1lli || "";
    } catch {
      return "";
    }
  }
  ["parseUrl"](Il1iiiI) {
    try {
      const iliilill = new URL(Il1iiiI);
      return iliilill;
    } catch (lllIllli) {
      return {};
    }
  }
  ["parseUrlParameter"](ll1iiliI) {
    try {
      const lI1IllII = this.parseUrl(ll1iiliI),
        lI1iIlII = new URLSearchParams(lI1IllII?.["search"]),
        lIIlIlll = {};
      for (const [I1Illlil, liil111I] of lI1iIlII) {
        lIIlIlll[I1Illlil] = liil111I;
      }
      return lIIlIlll;
    } catch {
      return {};
    }
  }
  ["objectToQueryString"](i1i11ii) {
    const iIii111 = [];
    for (const iilI1ii1 in i1i11ii) {
      if (i1i11ii.hasOwnProperty(iilI1ii1)) {
        const i1iIII1i = i1i11ii[iilI1ii1];
        if (i1iIII1i !== undefined && i1iIII1i !== null) {
          const iIII1lll = encodeURIComponent(iilI1ii1),
            lIl11II1 = encodeURIComponent(i1iIII1i);
          iIii111.push(iIII1lll + "=" + lIl11II1);
        }
      }
    }
    return iIii111.join("&");
  }
  ["getResponseCookie"](IIliIil, Ili1iiil) {
    let Ii11iii = "";
    if (IIliIil.headers["set-cookie"]) for (let liIllii1 of IIliIil.headers["set-cookie"]) {
      Ii11iii += liIllii1.split(";")[0].split("=")[0] + "=" + liIllii1.split(";")[0].split("=")[1] + "; ";
    } else {
      Ili1iiil && (Ii11iii = Ili1iiil);
    }
    return Ii11iii;
  }
  ["getCookieValue"](lliI1iI, iII111i) {
    if (!lliI1iI || !iII111i) {
      return "";
    }
    var lIli11ii = new RegExp(iII111i + "=" + "([^;]*)" + ";"),
      lI1li11l = lIli11ii.exec(lliI1iI);
    return lI1li11l && lI1li11l[1] || "";
  }
  ["parseCookie"](ilI1ilII) {
    const llI1lIll = {},
      i1IilI11 = ilI1ilII.split(";");
    for (const ii1lIlI1 of i1IilI11) {
      const [lI11II1i, ilI11iii] = ii1lIlI1.trim().split("=");
      llI1lIll[lI11II1i] = ilI11iii;
    }
    return llI1lIll;
  }
  ["genUuid"](lIIIlI11 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", i1Il1lIi = "0123456789abcdef") {
    let iiIi1lII = "";
    for (let lilill11 of lIIIlI11) {
      if (lilill11 == "x") iiIi1lII += i1Il1lIi.charAt(Math.floor(Math.random() * i1Il1lIi.length));else {
        if (lilill11 == "X") {
          iiIi1lII += i1Il1lIi.charAt(Math.floor(Math.random() * i1Il1lIi.length)).toUpperCase();
        } else {
          iiIi1lII += lilill11;
        }
      }
    }
    return iiIi1lII;
  }
  ["genEp"](liiIi11l, i11lI1 = "15.1.1") {
    let ili1iiiI = {
      "ciphertype": 5,
      "cipher": {
        "ud": this._base64Encode(l1I11il(liiIi11l).toString()),
        "sv": this._base64Encode(i11lI1),
        "iad": ""
      },
      "ts": Math.floor(Date.now() / 1000),
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile",
      "ridx": -1
    };
    return JSON.stringify(ili1iiiI);
  }
  ["genUA"](lIl1IIII, illiIIli = "jd", ilIlIlII = {}) {
    const lII1IiII = {
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
      lII1ii11 = ilIlIlII?.["ep"] ? ilIlIlII?.["ep"] : true,
      IliiillI = ilIlIlII?.["client"] ? ilIlIlII?.["client"] : lII1IiII[illiIIli].client,
      Ill11I1 = ilIlIlII?.["clientVersion"] ? ilIlIlII?.["clientVersion"] : lII1IiII[illiIIli].clientVersion,
      Ill11Iil = ["16.6", "16.5", "16.4", "16.3", "16.2", "16.1", "16.0", "15.6", "15.1", "14.5"],
      lI11llli = Ill11Iil[Math.floor(Math.random() * Ill11Iil.length)],
      iiiI111I = "iPhone; CPU iPhone OS " + lI11llli.replace(".", "_") + " like Mac OS X",
      Ii1i = IliiillI === "apple" || IliiillI === "iPhone" ? "iPhone" : "android",
      Ii1lil1 = this.genEp(lIl1IIII, lI11llli),
      iililiII = this.genUuid(),
      iiIIIli = [lII1IiII[illiIIli].app, Ii1i, Ill11I1, "", "rn/" + iililiII, "M/5.0", "appBuild/" + lII1IiII[illiIIli].appBuild, "jdSupportDarkMode/0", "ef/1", lII1ii11 ? "ep/" + encodeURIComponent(Ii1lil1) : "", "Mozilla/5.0 (" + iiiI111I + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      lii1lIi1 = iiIIIli.join(";");
    return this.UserAgent = lii1lIi1, lii1lIi1;
  }
  async ["loadH5st"]() {
    if (!this.getH5st) try {
      this.getH5st = require(__dirname + "/krh5st");
    } catch (IlI11lll) {
      console.log("❌ H5st 加载失败");
    }
  }
  async ["getLoginStatus"](ii1iIIII = this.ck) {
    return new Promise(async iiiiI1l1 => {
      if (!ii1iIIII) {
        console.log("🚫 Cookie 未设置");
        iiiiI1l1(undefined);
        return;
      }
      let I11iil1I = 0,
        iii1III1 = null;
      const llllI1il = 1;
      while (I11iil1I < llllI1il) {
        const IIlIII1I = "https://plogin.m.jd.com/cgi-bin/ml/islogin",
          illi1Iil = {
            "headers": {
              "Accept": "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "zh-CN,zh-Hans;q=0.9",
              "Connection": "keep-alive",
              "Cookie": ii1iIIII,
              "Host": "plogin.m.jd.com",
              "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
            },
            "timeout": 10000
          };
        try {
          const I1iiill = await II1ii.post(IIlIII1I, illi1Iil);
          if (I1iiill.body) try {
            const lIllI1lI = JSON.parse(I1iiill.body);
            if (lIllI1lI) {
              if (lIllI1lI.islogin === "1") iiiiI1l1(true);else {
                if (lIllI1lI.islogin === "0") iiiiI1l1(false);else {
                  iiiiI1l1(undefined);
                }
              }
            } else iiiiI1l1(undefined);
          } catch (l1liIIiI) {
            iii1III1 = "🚫 getLoginStatus 处理响应数据失败 ➜ " + (l1liIIiI.message || l1liIIiI);
            I11iil1I++;
          } else iii1III1 = "🚫 getLoginStatus 请求失败，无响应数据", I11iil1I++;
        } catch (lliii1li) {
          iii1III1 = "🚫 getLoginStatus 异常 ➜ " + (lliii1li.message || lliii1li);
          I11iil1I++;
        }
      }
      I11iil1I >= llllI1il && console.log(iii1III1);
      iiiiI1l1(undefined);
    });
  }
  async ["joinShopMember"](Ii11iil1, ll1IilIl = this.ck) {
    if (!Ii11iil1) return;
    return new Promise(async i1IIiliI => {
      const ii1Ii1l = "{\"venderId\":\"" + Ii11iil1 + "\",\"shopId\":\"" + Ii11iil1 + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0,\"channel\":406}",
        I1liIlll = {
          "appid": "shopmember_m_jd_com",
          "functionId": "bindWithVender",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": JSON.parse(ii1Ii1l)
        };
      await this.loadH5st();
      const IiIIl1 = await this.getH5st("27004", I1liIlll),
        illi1lll = "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + ii1Ii1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IiIIl1),
        Il1ii1lI = {
          "headers": {
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://api.m.jd.com",
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
            "Cookie": ll1IilIl
          },
          "timeout": 10000
        };
      try {
        const llI11liI = await II1ii.get(illi1lll, Il1ii1lI);
        if (llI11liI.body) {
          const l1I1iI1I = JSON.parse(llI11liI.body);
          if (l1I1iI1I.success === true) {
            if (l1I1iI1I.result && l1I1iI1I.result.giftInfo) for (let I1Iii1I1 of l1I1iI1I.result?.["giftInfo"]?.["giftList"]) {
              console.log(" >> 入会获得：" + I1Iii1I1.discountString + I1Iii1I1.prizeName + I1Iii1I1.secondLineDesc);
            }
            i1IIiliI(true);
          } else l1I1iI1I.message ? (console.log("🚫 加入店铺会员失败 ➜ " + l1I1iI1I.message), i1IIiliI(false)) : (console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(l1I1iI1I)), i1IIiliI(undefined));
        } else {
          console.log("🚫 bindWithVender API请求失败 ➜ 无响应数据");
          i1IIiliI(undefined);
        }
      } catch (lll1i1I1) {
        console.log("🚫 bindWithVender API在处理请求时遇到了错误 ➜ " + (lll1i1I1.message || lll1i1I1));
        i1IIiliI(undefined);
      }
    });
  }
  async ["getShopMemberStatus"](l1lIi1I1, iIiI1liI = this.ck) {
    return new Promise(async I1iiIli => {
      let iliII1 = "{\"venderId\":\"" + l1lIi1I1 + "\",\"channel\":406,\"payUpShop\":true}";
      const Ii111lIi = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iliII1)
      };
      await this.loadH5st();
      const IlII1ll1 = await this.getH5st("27004", Ii111lIi),
        lIIlil = "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + iliII1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlII1ll1),
        I1ll1I1i = {
          "headers": {
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://api.m.jd.com",
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
            "Cookie": iIiI1liI
          },
          "timeout": 10000
        };
      try {
        const IliI1l1l = await II1ii.get(lIIlil, I1ll1I1i);
        if (IliI1l1l.body) {
          const ll11Illl = JSON.parse(IliI1l1l.body);
          if (ll11Illl.success === true) console.log("去加入：" + (ll11Illl.result.shopMemberCardInfo.venderCardName || "未知")), openCardStatus = ll11Illl.result?.["userInfo"]?.["openCardStatus"], openCardStatus === 1 ? I1iiIli(true) : I1iiIli(false);else ll11Illl.message ? (console.log("🚫 获取店铺会员状态异常 ➜ " + ll11Illl.message), I1iiIli(false)) : (console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(ll11Illl)), I1iiIli(undefined));
        } else console.log("🚫 getShopOpenCardInfo API请求失败 ➜ 无响应数据"), I1iiIli(undefined);
      } catch (IIIlIIIl) {
        console.log("🚫 getShopOpenCardInfo API在处理请求时遇到了错误 ➜ " + (IIIlIIIl.message || IIIlIIIl));
        I1iiIli(undefined);
      }
    });
  }
  ["setCookie"](llllii1l) {
    this.ck = llllii1l;
  }
  ["unsetCookie"]() {
    this.ck = "";
    this.UserAgent = "";
  }
  ["_utf8Encode"](llilllil) {
    llilllil = llilllil.replace(/rn/g, "n");
    for (var l1ill1II = 0; l1ill1II < llilllil.length; l1ill1II++) {
      var lilii1i1 = "",
        iii1Il1 = llilllil.charCodeAt(l1ill1II);
      if (iii1Il1 < 128) lilii1i1 += String.fromCharCode(iii1Il1);else iii1Il1 > 127 && iii1Il1 < 2048 ? (lilii1i1 += String.fromCharCode(iii1Il1 >> 6 | 192), lilii1i1 += String.fromCharCode(iii1Il1 & 63 | 128)) : (lilii1i1 += String.fromCharCode(iii1Il1 >> 12 | 224), lilii1i1 += String.fromCharCode(iii1Il1 >> 6 & 63 | 128), lilii1i1 += String.fromCharCode(iii1Il1 & 63 | 128));
    }
    return lilii1i1;
  }
  ["_base64Encode"](iI11il11, I1liII1i = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
    var ilIlI1II = "";
    var iillii1i, lIIIlIiI, i11lIIi, iII1lII1, l1i1I1i, IIiIIli, lii11II;
    var liii1ii = 0;
    iI11il11 = this._utf8Encode(iI11il11);
    while (liii1ii < iI11il11.length) {
      iillii1i = iI11il11.charCodeAt(liii1ii++);
      lIIIlIiI = iI11il11.charCodeAt(liii1ii++);
      i11lIIi = iI11il11.charCodeAt(liii1ii++);
      iII1lII1 = iillii1i >> 2;
      l1i1I1i = (iillii1i & 3) << 4 | lIIIlIiI >> 4;
      IIiIIli = (lIIIlIiI & 15) << 2 | i11lIIi >> 6;
      lii11II = i11lIIi & 63;
      if (isNaN(lIIIlIiI)) IIiIIli = lii11II = 64;else isNaN(i11lIIi) && (lii11II = 64);
      ilIlI1II = ilIlI1II + I1liII1i.charAt(iII1lII1) + I1liII1i.charAt(l1i1I1i) + I1liII1i.charAt(IIiIIli) + I1liII1i.charAt(lii11II);
    }
    while (ilIlI1II.length % 4 > 1) ilIlI1II += "=";
    return ilIlI1II;
  }
}
module.exports = new l1iiil1i();