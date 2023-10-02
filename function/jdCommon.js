/*
通用代码库
new Env('jdCommon');
*/
const lil1Illl = require("crypto-js/sha1"),
  lIll1iii = require("got");
class ilIili1 {
  constructor() {
    this.ck = "";
    this.UserAgent = "";
    this.getH5st = null;
  }
  ["getUrlParameter"](lIliilIi, l1l1i1Il) {
    try {
      const II1l11ll = new URL(lIliilIi),
        liI1iI1 = II1l11ll.searchParams.get(l1l1i1Il);
      return liI1iI1 || "";
    } catch {
      return "";
    }
  }
  ["parseUrl"](lliil111) {
    try {
      const illi1iil = new URL(lliil111);
      return illi1iil;
    } catch (ililIilI) {
      return {};
    }
  }
  ["parseUrlParameter"](iilI11il) {
    try {
      const ilIlili = this.parseUrl(iilI11il),
        iiIlIIli = new URLSearchParams(ilIlili?.["search"]),
        liiIl1i = {};
      for (const [Ill1IlII, llili111] of iiIlIIli) {
        liiIl1i[Ill1IlII] = llili111;
      }
      return liiIl1i;
    } catch {
      return {};
    }
  }
  ["objectToQueryString"](liiIII1) {
    const IIiiI11I = [];
    for (const i1iIiilI in liiIII1) {
      if (liiIII1.hasOwnProperty(i1iIiilI)) {
        const lII11l11 = liiIII1[i1iIiilI];
        if (lII11l11 !== undefined && lII11l11 !== null) {
          const iIl1llli = encodeURIComponent(i1iIiilI),
            iliI111l = encodeURIComponent(lII11l11);
          IIiiI11I.push(iIl1llli + "=" + iliI111l);
        }
      }
    }
    return IIiiI11I.join("&");
  }
  ["getResponseCookie"](i1i11ill, ll11ll11) {
    let lIIi1111 = "";
    if (i1i11ill.headers["set-cookie"]) for (let iIII1l1i of i1i11ill.headers["set-cookie"]) {
      lIIi1111 += iIII1l1i.split(";")[0].split("=")[0] + "=" + iIII1l1i.split(";")[0].split("=")[1] + "; ";
    } else ll11ll11 && (lIIi1111 = ll11ll11);
    return lIIi1111;
  }
  ["getCookieValue"](Iliiliil, I1iIilI) {
    if (!Iliiliil || !I1iIilI) return "";
    var Il11i1Ii = new RegExp(I1iIilI + "=" + "([^;]*)" + ";"),
      iII1l1I = Il11i1Ii.exec(Iliiliil);
    return iII1l1I && iII1l1I[1] || "";
  }
  ["parseCookie"](I1llIlil) {
    const IIiIii1i = {},
      I11llliI = I1llIlil.split(";");
    for (const i1Il1liI of I11llliI) {
      const [iIIiiI11, ill1lII1] = i1Il1liI.trim().split("=");
      IIiIii1i[iIIiiI11] = ill1lII1;
    }
    return IIiIii1i;
  }
  ["genUuid"](lIIlillI = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", I1IiiiiI = "0123456789abcdef") {
    let iIiIIlli = "";
    for (let llI1iI of lIIlillI) {
      if (llI1iI == "x") iIiIIlli += I1IiiiiI.charAt(Math.floor(Math.random() * I1IiiiiI.length));else llI1iI == "X" ? iIiIIlli += I1IiiiiI.charAt(Math.floor(Math.random() * I1IiiiiI.length)).toUpperCase() : iIiIIlli += llI1iI;
    }
    return iIiIIlli;
  }
  ["genEp"](iIiIi11i, lllIl11l = "15.1.1") {
    let I11iI = {
      "ciphertype": 5,
      "cipher": {
        "ud": this._base64Encode(lil1Illl(iIiIi11i).toString()),
        "sv": this._base64Encode(lllIl11l),
        "iad": ""
      },
      "ts": Math.floor(Date.now() / 1000),
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile",
      "ridx": -1
    };
    return JSON.stringify(I11iI);
  }
  ["genUA"](I1l1lIII, lilIi1Il = "jd", lI111ili = {}) {
    const I1lII1 = {
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
      IlIiIil = lI111ili?.["ep"] ? lI111ili?.["ep"] : true,
      iil1i1Ii = lI111ili?.["client"] ? lI111ili?.["client"] : I1lII1[lilIi1Il].client,
      IIi11l1 = lI111ili?.["clientVersion"] ? lI111ili?.["clientVersion"] : I1lII1[lilIi1Il].clientVersion,
      lllIiii1 = ["16.6", "16.5", "16.4", "16.3", "16.2", "16.1", "16.0", "15.6", "15.1", "14.5"],
      I1ll11i = lllIiii1[Math.floor(Math.random() * lllIiii1.length)],
      I1II1iIl = "iPhone; CPU iPhone OS " + I1ll11i.replace(".", "_") + " like Mac OS X",
      i11lIiIi = iil1i1Ii === "apple" || iil1i1Ii === "iPhone" ? "iPhone" : "android",
      l11Iiil1 = this.genEp(I1l1lIII, I1ll11i),
      lIilI1I = this.genUuid(),
      IIIliII1 = [I1lII1[lilIi1Il].app, i11lIiIi, IIi11l1, "", "rn/" + lIilI1I, "M/5.0", "appBuild/" + I1lII1[lilIi1Il].appBuild, "jdSupportDarkMode/0", "ef/1", IlIiIil ? "ep/" + encodeURIComponent(l11Iiil1) : "", "Mozilla/5.0 (" + I1II1iIl + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      l1IIl11i = IIIliII1.join(";");
    return this.UserAgent = l1IIl11i, l1IIl11i;
  }
  async ["loadH5st"]() {
    if (!this.getH5st) try {
      this.getH5st = require(__dirname + "/krh5st");
    } catch (illi1Il1) {
      console.log("❌ H5st 加载失败");
    }
  }
  async ["getLoginStatus"](ii1il1Il = this.ck) {
    return new Promise(async Ii1li1l1 => {
      if (!ii1il1Il) {
        console.log("🚫 Cookie 未设置");
        Ii1li1l1(undefined);
        return;
      }
      let Il1IllIi = 0,
        IlIiliIi = null;
      const Il11IliI = 3;
      while (Il1IllIi < Il11IliI) {
        const iIliiiIl = {
          "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
          "headers": {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Connection": "keep-alive",
            "Cookie": ii1il1Il,
            "Host": "plogin.m.jd.com",
            "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
          }
        };
        try {
          const l1I1I1ii = await lIll1iii.post(iIliiiIl.url, iIliiiIl);
          if (l1I1I1ii.body) {
            try {
              const l11ii11i = JSON.parse(l1I1I1ii.body);
              if (l11ii11i) {
                if (l11ii11i.islogin === "1") {
                  Ii1li1l1(true);
                } else {
                  if (l11ii11i.islogin === "0") Ii1li1l1(false);else {
                    Ii1li1l1(undefined);
                  }
                }
              } else {
                Ii1li1l1(undefined);
              }
            } catch (i11I1li) {
              IlIiliIi = "🚫 账号有效性检测接口处理响应数据失败 ➜ " + (i11I1li.message || i11I1li);
              Il1IllIi++;
            }
          } else IlIiliIi = "🚫 账号有效性检测接口请求失败，无响应数据", Il1IllIi++;
        } catch (Illllli) {
          IlIiliIi = "🚫 账号有效性检测接口异常 ➜ " + (Illllli.message || Illllli);
          Il1IllIi++;
        }
      }
      Il1IllIi >= Il11IliI && console.log(IlIiliIi);
      Ii1li1l1(undefined);
    });
  }
  async ["joinShopMember"](llI1i1Ii, i1iI1llI = this.ck) {
    if (!llI1i1Ii) return;
    return new Promise(async l1illl1 => {
      const i1Ii111l = "{\"venderId\":\"" + llI1i1Ii + "\",\"shopId\":\"" + llI1i1Ii + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0,\"channel\":406}",
        llIill = {
          "appid": "shopmember_m_jd_com",
          "functionId": "bindWithVender",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": JSON.parse(i1Ii111l)
        };
      await this.loadH5st();
      const IlI1lI11 = await this.getH5st("27004", llIill),
        lliIIIll = {
          "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + i1Ii111l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlI1lI11),
          "headers": {
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://api.m.jd.com",
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
            "Cookie": i1iI1llI
          }
        };
      try {
        const ll1lil = await lIll1iii.get(lliIIIll.url, {
          "headers": lliIIIll.headers
        });
        if (ll1lil.body) {
          const III1i1i = JSON.parse(ll1lil.body);
          if (typeof III1i1i === "object") {
            if (III1i1i.success === true) {
              if (III1i1i.result && III1i1i.result.giftInfo) for (let lIlIl1lI of III1i1i.result?.["giftInfo"]?.["giftList"]) {
                console.log(" >> 入会获得：" + lIlIl1lI.discountString + lIlIl1lI.prizeName + lIlIl1lI.secondLineDesc);
              }
              l1illl1(true);
            } else III1i1i.message ? (console.log("🚫 加入店铺会员失败 ➜ " + III1i1i.message), l1illl1(false)) : (console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(III1i1i)), l1illl1(false));
          } else console.log(ll1lil.body), l1illl1(undefined);
        } else console.log("🚫 加入店铺会员接口请求失败，无响应数据"), l1illl1(undefined);
      } catch (iIiililI) {
        console.log("🚫 加入店铺会员接口异常 ➜ " + (iIiililI.message || iIiililI));
        l1illl1(undefined);
      }
    });
  }
  async ["getShopMemberStatus"](IlIiIll, iI1IIIiI = this.ck) {
    return new Promise(async IIiI1iI1 => {
      let i1iliIll = "{\"venderId\":\"" + IlIiIll + "\",\"channel\":406,\"payUpShop\":true}";
      const i1lilii = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1iliIll)
      };
      await this.loadH5st();
      const ii11Iil = await this.getH5st("27004", i1lilii),
        li1Ill = {
          "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + i1iliIll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ii11Iil),
          "headers": {
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://api.m.jd.com",
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
            "Cookie": iI1IIIiI
          }
        };
      try {
        const ili11i1I = await lIll1iii.get(li1Ill.url, {
          "headers": li1Ill.headers
        });
        if (ili11i1I.body) {
          const Iiiilil1 = JSON.parse(ili11i1I.body);
          if (typeof Iiiilil1 === "object") {
            if (Iiiilil1.success === true) {
              console.log("去加入：" + (Iiiilil1.result.shopMemberCardInfo.venderCardName || "未知"));
              openCardStatus = Iiiilil1.result?.["userInfo"]?.["openCardStatus"];
              openCardStatus === 1 ? IIiI1iI1(true) : IIiI1iI1(false);
            }
          } else console.log(ili11i1I.body), IIiI1iI1(undefined);
        } else console.log("🚫 店铺会员状态获取接口请求失败，无响应数据"), IIiI1iI1(undefined);
      } catch (l1111l1) {
        console.log("🚫 店铺会员状态获取接口异常 ➜ " + (l1111l1.message || l1111l1));
        IIiI1iI1(undefined);
      }
    });
  }
  ["setCookie"](llliiiI1) {
    this.ck = llliiiI1;
  }
  ["unsetCookie"]() {
    this.ck = "";
    this.UserAgent = "";
  }
  ["_utf8Encode"](l1Iii1ii) {
    l1Iii1ii = l1Iii1ii.replace(/rn/g, "n");
    for (var l1i1ilIl = 0; l1i1ilIl < l1Iii1ii.length; l1i1ilIl++) {
      var iiilII1i = "",
        iIIlllil = l1Iii1ii.charCodeAt(l1i1ilIl);
      if (iIIlllil < 128) iiilII1i += String.fromCharCode(iIIlllil);else iIIlllil > 127 && iIIlllil < 2048 ? (iiilII1i += String.fromCharCode(iIIlllil >> 6 | 192), iiilII1i += String.fromCharCode(iIIlllil & 63 | 128)) : (iiilII1i += String.fromCharCode(iIIlllil >> 12 | 224), iiilII1i += String.fromCharCode(iIIlllil >> 6 & 63 | 128), iiilII1i += String.fromCharCode(iIIlllil & 63 | 128));
    }
    return iiilII1i;
  }
  ["_base64Encode"](iI1lIIi1, Il1IiIl1 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
    var IIii = "",
      IIlI1lIl,
      iiii1I1l,
      iiiIIi1,
      llli1ll,
      lIII1iIi,
      IiIi1i1l,
      IIIiiI11,
      I1lii11 = 0;
    iI1lIIi1 = this._utf8Encode(iI1lIIi1);
    while (I1lii11 < iI1lIIi1.length) {
      IIlI1lIl = iI1lIIi1.charCodeAt(I1lii11++);
      iiii1I1l = iI1lIIi1.charCodeAt(I1lii11++);
      iiiIIi1 = iI1lIIi1.charCodeAt(I1lii11++);
      llli1ll = IIlI1lIl >> 2;
      lIII1iIi = (IIlI1lIl & 3) << 4 | iiii1I1l >> 4;
      IiIi1i1l = (iiii1I1l & 15) << 2 | iiiIIi1 >> 6;
      IIIiiI11 = iiiIIi1 & 63;
      if (isNaN(iiii1I1l)) IiIi1i1l = IIIiiI11 = 64;else {
        if (isNaN(iiiIIi1)) {
          IIIiiI11 = 64;
        }
      }
      IIii = IIii + Il1IiIl1.charAt(llli1ll) + Il1IiIl1.charAt(lIII1iIi) + Il1IiIl1.charAt(IiIi1i1l) + Il1IiIl1.charAt(IIIiiI11);
    }
    while (IIii.length % 4 > 1) IIii += "=";
    return IIii;
  }
}
module.exports = new ilIili1();