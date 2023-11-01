/*
通用代码库
new Env('jdCommon');
*/

var version_ = "jsjiami.com.v7";
const Ili1I1 = require("crypto-js/sha1"),
  lI1I1i = require("got");
class liI1II {
  constructor() {
    this.ck = "";
    this.UserAgent = "";
    this.H5st = null;
  }
  parseUrl(i1Iii1) {
    try {
      const l1liii = new URL(i1Iii1);
      return l1liii;
    } catch (I1Ili1) {
      return {};
    }
  }
  parseUrlParameter(l1liil) {
    try {
      const lilI1l = this.parseUrl(l1liil),
        l1liiI = new URLSearchParams(lilI1l?.["search"]),
        I1iI1 = {};
      for (const [lilI1i, Il1Ii] of l1liiI) {
        I1iI1[lilI1i] = Il1Ii;
      }
      return I1iI1;
    } catch {
      return {};
    }
  }
  getUrlParameter(Ii11i, i1llI) {
    try {
      const i1Iiii = this.parseUrl(Ii11i),
        l1lIi = i1Iiii.searchParams.get(i1llI);
      return l1lIi || "";
    } catch {
      return "";
    }
  }
  objectToQueryString(IIlI1l) {
    const IilIl = [];
    for (const iilII1 in IIlI1l) {
      if (IIlI1l.hasOwnProperty(iilII1)) {
        const i1Iil1 = IIlI1l[iilII1];
        if (i1Iil1 !== undefined && i1Iil1 !== null) {
          const liI1Ii = encodeURIComponent(iilII1),
            l1lil1 = encodeURIComponent(i1Iil1);
          IilIl.push(liI1Ii + "=" + l1lil1);
        }
      }
    }
    return IilIl.join("&");
  }
  getResponseCookie(i1lil, I1iIl) {
    let ili1l = "";
    if (i1lil.headers["set-cookie"]) {
      for (let i1IilI of i1lil.headers["set-cookie"]) {
        ili1l += i1IilI.split(";")[0].split("=")[0] + "=" + i1IilI.split(";")[0].split("=")[1] + "; ";
      }
    } else {
      I1iIl && (ili1l = I1iIl);
    }
    return ili1l;
  }
  getCookieValue(ili1I, iilIIl) {
    if (!ili1I || !iilIIl) {
      return "";
    }
    var i1Iill = new RegExp(iilIIl + "=" + "([^;]*)" + ";"),
      l1IiI = i1Iill.exec(ili1I);
    return l1IiI && l1IiI[1] || "";
  }
  parseCookie(IiIiIi) {
    const IIlI1I = {},
      llIIIi = IiIiIi.split(";");
    for (const IiIiIl of llIIIi) {
      const [l1I1I1, I1Ilii] = IiIiIl.trim().split("=");
      IIlI1I[l1I1I1] = I1Ilii;
    }
    return IIlI1I;
  }
  genUuid(l1Iii = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", l1Iil = "0123456789abcdef") {
    let III1Il = "";
    for (let I1IliI of l1Iii) {
      if (I1IliI == "x") {
        III1Il += l1Iil.charAt(Math.floor(Math.random() * l1Iil.length));
      } else {
        I1IliI == "X" ? III1Il += l1Iil.charAt(Math.floor(Math.random() * l1Iil.length)).toUpperCase() : III1Il += I1IliI;
      }
    }
    return III1Il;
  }
  genEp(iIIlil, IiIiI1 = "jd", iIIlii = "17.1") {
    let IiIiI = {
      ciphertype: 5,
      cipher: {
        ud: this._base64Encode(Ili1I1(iIIlil).toString()),
        sv: this._base64Encode(iIIlii),
        iad: ""
      },
      ts: Math.floor(Date.now() / 1000),
      hdid: "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      version: "1.0.3",
      appname: IiIiI1 === "lite" ? "com.jd.jdmobilelite" : "com.360buy.jdmobile",
      ridx: -1
    };
    return JSON.stringify(IiIiI);
  }
  genUA(liI11I, III1 = "jd") {
    const l1iiIi = {
        jd: {
          app: "jdapp",
          appBuild: "168919",
          client: "iPhone",
          clientVersion: "12.2.0"
        },
        lite: {
          app: "jdltapp",
          appBuild: "1490",
          client: "iPhone",
          clientVersion: "6.14.0"
        }
      },
      lIIi1l = III1 === "lite" ? "lite" : "jd",
      {
        app: I1lI1i,
        appBuild: illili,
        client: iiiII1,
        clientVersion: liI111
      } = l1iiIi[lIIi1l],
      IiIlI = ["17.1", "17.0.3", "17.0", "16.7", "16.6", "16.1", "16.0", "15.6"],
      iIlI1i = IiIlI[Math.floor(Math.random() * IiIlI.length)],
      iII1Il = "iPhone; CPU iPhone OS " + iIlI1i.replace(".", "_") + " like Mac OS X",
      IIIliI = this.genEp(liI11I, lIIi1l, iIlI1i),
      iII1Ii = this.genUuid(),
      iIlI1l = [I1lI1i, iiiII1, liI111, "", "rn/" + iII1Ii, "M/5.0", "appBuild/" + illili, "jdSupportDarkMode/0", "ef/1", "ep/" + encodeURIComponent(IIIliI), "Mozilla/5.0 (" + iII1Il + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      llIill = iIlI1l.join(";");
    if (this.ck) {
      this.UserAgent = llIill;
    }
    return llIill;
  }
  genRandomString(l1IIil = 32, l1iiII = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
    const lIi1i1 = l1iiII.length;
    let l1l11 = "";
    for (var illill = 0; illill < l1IIil; illill++) {
      l1l11 += l1iiII.charAt(Math.floor(Math.random() * lIi1i1));
    }
    return l1l11;
  }
  async loadH5st() {
    if (!this.H5st) {
      try {
        this.H5st = require(__dirname + "/krgetH5st");
      } catch (l1IIli) {
        console.log("❌ H5st 加载失败");
      }
    }
  }
  async getLoginStatus(iiiIIi = this.ck) {
    if (!iiiIIi) {
      console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie");
      return undefined;
    }
    let l1IIll = 0,
      iiiIIl = null;
    const lIIi11 = 1;
    while (l1IIll < lIIi11) {
      const Ill1II = "https://plogin.m.jd.com/cgi-bin/ml/islogin",
        llIili = {
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            Connection: "keep-alive",
            Cookie: iiiIIi,
            Host: "plogin.m.jd.com",
            "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
          },
          timeout: 30000
        };
      try {
        const iIlI11 = await lI1I1i.post(Ill1II, llIili);
        if (iIlI11.body) {
          try {
            const IIII = JSON.parse(iIlI11.body);
            if (IIII) {
              if (IIII.islogin === "1") {
                return true;
              } else {
                if (IIII.islogin === "0") {
                  return false;
                }
              }
            }
          } catch (iil111) {
            iiiIIl = "🚫 getLoginStatus 处理响应数据失败 ➜ " + (iil111.message || iil111);
            l1IIll++;
          }
        } else {
          iiiIIl = "🚫 getLoginStatus 请求失败 ➜ 无响应数据";
          l1IIll++;
        }
      } catch (iiiIII) {
        iiiIIl = "🚫 getLoginStatus 请求异常 ➜ " + (iiiIII.message || iiiIII);
        l1IIll++;
      }
    }
    l1IIll >= lIIi11 && console.log(iiiIIl);
    return undefined;
  }
  async joinShopMember(lIi1il, liI11i = this.ck) {
    if (!liI11i) {
      console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie");
      return undefined;
    }
    if (!lIi1il) {
      return undefined;
    }
    await this.loadH5st();
    const illilI = {
        appId: "27004",
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: {
          venderId: lIi1il,
          shopId: lIi1il,
          bindByVerifyCodeFlag: 1,
          registerExtend: {},
          writeChildFlag: 0,
          channel: 102,
          appid: "27004",
          needSecurity: true,
          bizId: "shopmember_m_jd_com"
        },
        version: "4.1",
        t: true,
        ua: this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
      },
      IiIli = await this.H5st.getH5st(illilI),
      illil1 = IiIli.params + "&area=&uuid=88888",
      IIIlii = "https://api.m.jd.com/client.action",
      iil11I = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "https://pages.jd.com",
          Host: "api.m.jd.com",
          Accept: "*/*",
          "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
          Cookie: liI11i
        },
        body: illil1,
        timeout: 30000
      };
    try {
      const Ili111 = await lI1I1i.post(IIIlii, iil11I);
      if (Ili111.body) {
        const iiil11 = JSON.parse(Ili111.body);
        if (iiil11.success === true) {
          if (iiil11.result && iiil11.result?.["giftInfo"]) {
            for (let llII1I of iiil11.result?.["giftInfo"]?.["giftList"]) {
              console.log(" >> 入会获得：" + llII1I.discountString + llII1I.prizeName + llII1I.secondLineDesc);
            }
          }
          if (iiil11.message === "加入店铺会员成功") {
            return true;
          } else {
            if (iiil11.message === "活动太火爆，请稍后再试") {
              console.log("🚫 加入店铺会员失败 ➜ " + iiil11.message);
              return undefined;
            } else {
              console.log("🚫 加入店铺会员失败 ➜ " + iiil11.message);
              return false;
            }
          }
        } else {
          if (iiil11.message) {
            console.log("🚫 加入店铺会员失败 ➜ " + iiil11.message);
            return false;
          } else {
            console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(iiil11));
          }
        }
      } else {
        console.log("🚫 bindWithVender API请求失败 ➜ 无响应数据");
      }
    } catch (IlllI) {
      console.log("🚫 bindWithVender API在处理请求时遇到了错误 ➜ " + (IlllI.message || IlllI));
    }
    return undefined;
  }
  async getShopMemberStatus(iliIl, ii1i11 = this.ck) {
    if (!ii1i11) {
      console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie");
      return undefined;
    }
    if (!iliIl) {
      return undefined;
    }
    await this.loadH5st();
    const liIlII = {
        appId: "27004",
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: {
          venderId: iliIl,
          channel: 2,
          payUpShop: true,
          queryVersion: "10.5.2",
          appid: "27004",
          needSecurity: true,
          bizId: "shopmember_m_jd_com"
        },
        version: "3.1",
        ua: this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
      },
      Il1I = await this.H5st.getH5st(liIlII),
      iii1i = "https://api.m.jd.com/client.action?" + Il1I.params,
      iii1l = {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
          Cookie: ii1i11
        },
        timeout: 30000
      };
    try {
      const llII1i = await lI1I1i.get(iii1i, iii1l);
      if (llII1i.body) {
        const illI1I = JSON.parse(llII1i.body);
        if (illI1I.success === true) {
          console.log("去加入：" + (illI1I.result.shopMemberCardInfo.venderCardName || "未知"));
          openCardStatus = illI1I.result?.["userInfo"]?.["openCardStatus"];
          if (openCardStatus === 1) {
            return true;
          } else {
            return false;
          }
        } else {
          illI1I.message ? console.log("🚫 获取店铺会员状态异常 ➜ " + illI1I.message) : console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(illI1I));
        }
      } else {
        console.log("🚫 getShopOpenCardInfo API请求失败 ➜ 无响应数据");
      }
    } catch (illI11) {
      console.log("🚫 getShopOpenCardInfo API在处理请求时遇到了错误 ➜ " + (illI11.message || illI11));
    }
    return undefined;
  }
  async concTask(ll11Ii = "3", ll11Il, i11lI) {
    let iii1I = false,
      iliII = 0,
      ii1i1I = 0;
    async function liIlI1(lIiIl, iiil1l) {
      const Il1l = await i11lI(lIiIl, iiil1l);
      if (Il1l) {
        if (typeof Il1l === "boolean") {
          iii1I = true;
        } else {
          typeof Il1l === "object" && Il1l?.["runEnd"] && (iii1I = true);
        }
      }
      iliII--;
      iillIl();
    }
    async function iillIl() {
      while (iliII < ll11Ii && ll11Il.length > 0 && !iii1I) {
        const Illll = ll11Il.shift();
        iliII++;
        ii1i1I++;
        await liIlI1(Illll, ii1i1I);
      }
      iii1I && (await new Promise(iiil1i => {
        const ilIIll = setInterval(() => {
          iliII === 0 && (clearInterval(ilIIll), iiil1i());
        }, 100);
      }));
    }
    const IiIi1I = Math.min(ll11Il.length, ll11Ii),
      iillIi = [];
    for (let IliIi1 = 0; IliIi1 < IiIi1I; IliIi1++) {
      const Iii1ll = ll11Il.shift();
      iliII++;
      ii1i1I++;
      iillIi.push(liIlI1(Iii1ll, ii1i1I));
    }
    await Promise.all(iillIi);
    iillIl();
    await new Promise(liiiIl => {
      const Iii1li = setInterval(() => {
        if (iliII === 0 || iii1I) {
          clearInterval(Iii1li);
          liiiIl();
        }
      }, 100);
    });
  }
  async concTaskNormal(IIiil1 = "3", l1IlII = 100, ii1i) {
    let ii1l = false,
      iIl1I = 0,
      liIi = 0;
    async function liIIlI(lIi1lI) {
      const IIiiil = await ii1i(lIi1lI);
      if (IIiiil) {
        if (typeof IIiiil === "boolean") {
          ii1l = true;
        } else {
          if (typeof IIiiil === "object") {
            IIiiil?.["runEnd"] && (ii1l = true);
          }
        }
      }
      iIl1I--;
      IliIil();
    }
    async function IliIil() {
      while (iIl1I < IIiil1 && l1IlII > 0 && !ii1l) {
        l1IlII--;
        iIl1I++;
        liIi++;
        await liIIlI(liIi);
      }
      if (ii1l) {
        await new Promise(i11Iil => {
          const Ili11i = setInterval(() => {
            iIl1I === 0 && (clearInterval(Ili11i), i11Iil());
          }, 100);
        });
      }
    }
    const iliiIi = Math.min(l1IlII, IIiil1),
      i11Ill = [];
    for (let Il1iIi = 0; Il1iIi < iliiIi; Il1iIi++) {
      l1IlII--;
      iIl1I++;
      liIi++;
      i11Ill.push(liIIlI(liIi));
    }
    await Promise.all(i11Ill);
    IliIil();
    await new Promise(Iii1ii => {
      const l1iiI1 = setInterval(() => {
        (iIl1I === 0 || ii1l) && (clearInterval(l1iiI1), Iii1ii());
      }, 100);
    });
  }
  setCookie(Iii1il) {
    this.ck = Iii1il;
  }
  unsetCookie() {
    this.ck = "";
    this.UserAgent = "";
  }
  _utf8Encode(lIi1li) {
    lIi1li = lIi1li.replace(/rn/g, "n");
    for (var Il1iIl = 0; Il1iIl < lIi1li.length; Il1iIl++) {
      var lIi1ll = "",
        l1IIiI = lIi1li.charCodeAt(Il1iIl);
      if (l1IIiI < 128) {
        lIi1ll += String.fromCharCode(l1IIiI);
      } else {
        l1IIiI > 127 && l1IIiI < 2048 ? (lIi1ll += String.fromCharCode(l1IIiI >> 6 | 192), lIi1ll += String.fromCharCode(l1IIiI & 63 | 128)) : (lIi1ll += String.fromCharCode(l1IIiI >> 12 | 224), lIi1ll += String.fromCharCode(l1IIiI >> 6 & 63 | 128), lIi1ll += String.fromCharCode(l1IIiI & 63 | 128));
      }
    }
    return lIi1ll;
  }
  _base64Encode(iIiiIl, lIilIl = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
    var ll1lIi = "";
    var II1lI, ilIlil, Ii1IiI, IIll11, ll1lIl, I1IIl1, l1I1l1;
    var lIi1i = 0;
    iIiiIl = this._utf8Encode(iIiiIl);
    while (lIi1i < iIiiIl.length) {
      II1lI = iIiiIl.charCodeAt(lIi1i++);
      ilIlil = iIiiIl.charCodeAt(lIi1i++);
      Ii1IiI = iIiiIl.charCodeAt(lIi1i++);
      IIll11 = II1lI >> 2;
      ll1lIl = (II1lI & 3) << 4 | ilIlil >> 4;
      I1IIl1 = (ilIlil & 15) << 2 | Ii1IiI >> 6;
      l1I1l1 = Ii1IiI & 63;
      if (isNaN(ilIlil)) {
        I1IIl1 = l1I1l1 = 64;
      } else {
        isNaN(Ii1IiI) && (l1I1l1 = 64);
      }
      ll1lIi = ll1lIi + lIilIl.charAt(IIll11) + lIilIl.charAt(ll1lIl) + lIilIl.charAt(I1IIl1) + lIilIl.charAt(l1I1l1);
    }
    while (ll1lIi.length % 4 > 1) {
      ll1lIi += "=";
    }
    return ll1lIi;
  }
}
module.exports = new liI1II();
var version_ = "jsjiami.com.v7";