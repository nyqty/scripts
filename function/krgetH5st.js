/*
new Env('getH5st');
*/
var version_ = "jsjiami.com.v7";
const lil1I1Il = require("jsdom");
class IiII1Iil {
  constructor() {
    this.domWindow3_1 = null;
    this.domWindow3_1_UA = null;
    this.domWindow4_1 = null;
    this.domWindow4_1_UA = null;
    this.domWindow4_2 = null;
    this.domWindow4_2_UA = null;
  }
  async _sleep(i1iIl11l) {
    return new Promise((II1iiI11, ilIl1lI) => {
      setTimeout(() => {
        II1iiI11(i1iIl11l);
      }, i1iIl11l);
    });
  }
  async _loadH5Sdk(IIlIIIl1, lI1IIl1l) {
    const {
      JSDOM: l11Ii1i1
    } = lil1I1Il;
    let i11lI1ll = new lil1I1Il.ResourceLoader({
        userAgent: lI1IIl1l
      }),
      l1Il1I = new lil1I1Il.VirtualConsole(),
      i1i1ii = {
        url: "http://localhost",
        userAgent: lI1IIl1l,
        runScripts: "dangerously",
        resources: i11lI1ll,
        includeNodeLocations: true,
        storageQuota: 1000000000,
        pretendToBeVisual: true,
        virtualConsole: l1Il1I
      },
      l1i1li1I = "";
    switch (IIlIIIl1) {
      case "3.1":
        l1i1li1I = "v3_0.1.3";
        break;
      case "4.1":
        l1i1li1I = "v3_0.1.8";
        break;
      case "4.2":
        l1i1li1I = "v3_0.1.9";
        break;
    }
    const iI1liil = new l11Ii1i1("<body>\n    <script src=\"https://storage.360buyimg.com/webcontainer/js_security_" + l1i1li1I + ".js\"></script>\n</body>", i1i1ii);
    do {
      await this._sleep(100);
    } while (!iI1liil.window.ParamsSign);
    switch (IIlIIIl1) {
      case "3.1":
        this.domWindow3_1 = iI1liil.window;
        break;
      case "4.1":
        this.domWindow4_1 = iI1liil.window;
        break;
      case "4.2":
        this.domWindow4_2 = iI1liil.window;
        break;
    }
  }
  async _signWaap(II1IillI, liIiiI1i, il1IIli) {
    const iIIIlil = new il1IIli.ParamsSign({
      appId: II1IillI,
      preRequest: false,
      debug: true,
      onSign({
        code: l1IIlIIi,
        message: iiiI1II,
        data: lIil1il
      }) {},
      onRequestTokenRemotely({
        code: Iili1iIl,
        message: liiiIili
      }) {},
      onRequestToken({
        code: lllii111,
        message: il1llI11
      }) {}
    });
    let lllI11l1 = {
      appid: liIiiI1i.appid,
      body: this._SHA256(JSON.stringify(liIiiI1i.body)).toString(),
      client: liIiiI1i.client,
      clientVersion: liIiiI1i.clientVersion,
      functionId: liIiiI1i.functionId
    };
    liIiiI1i?.["t"] && (lllI11l1.t = liIiiI1i.t);
    let lIIii1ll = await iIIIlil.sign(lllI11l1);
    if (!lIIii1ll?.["h5st"]) {
      console.log("❌ getH5st 签名生成失败");
    }
    return lIIii1ll?.["h5st"] || "";
  }
  async getH5st(l1llIllI) {
    let lilIil1I = {
      ...l1llIllI,
      h5st: "",
      params: ""
    };
    try {
      if (!(typeof l1llIllI === "object" && l1llIllI !== null)) {
        console.log("❌ getH5st 传入参数有误");
        return lilIil1I;
      } else {
        const il1IIii1 = ["appId", "appid", "body", "client", "clientVersion", "functionId"],
          Iliiiii1 = il1IIii1.filter(Iili1l11 => !l1llIllI[Iili1l11]);
        if (Iliiiii1.length > 0) {
          console.log("❌ getH5st 传入参数有误，缺少必要参数：" + Iliiiii1.join(", "));
          return lilIil1I;
        }
      }
      switch (l1llIllI?.["version"]) {
        case "3.1":
        case "4.1":
        case "4.2":
          break;
        default:
          l1llIllI.version = "4.1";
          break;
      }
      const {
          appId: iIiiI11,
          appid: III1I1ll,
          body: llii1iii,
          client: li1iIill,
          clientVersion: iilI1ili,
          functionId: I1liil1i,
          version: iIiIi1ll
        } = l1llIllI,
        Ii1l1iII = "jdapp;android;11.8.0;;;M/5.0;appBuild/98730;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1684847465219%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJO%3D%22%2C%22ad%22%3A%22DJdtZNdtZNY1DJYmCJDuCq%3D%3D%22%2C%22od%22%3A%22DwO5DJrtZwG5ZNCyDJu3ZK%3D%3D%22%2C%22ov%22%3A%22CzK%3D%22%2C%22ud%22%3A%22DJdtZNdtZNY1DJYmCJDuCq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672.77 Mobile Safari/537.36",
        illII11I = l1llIllI?.["ua"] || Ii1l1iII;
      switch (iIiIi1ll) {
        case "3.1":
          if (!this.domWindow3_1 || this.domWindow3_1_UA && this.domWindow3_1_UA !== illII11I) {
            await this._loadH5Sdk(iIiIi1ll, illII11I);
            this.domWindow3_1_UA = illII11I;
          }
          break;
        case "4.1":
          (!this.domWindow4_1 || this.domWindow4_1_UA && this.domWindow4_1_UA !== illII11I) && (await this._loadH5Sdk(iIiIi1ll, illII11I), this.domWindow4_1_UA = illII11I);
          break;
        case "4.2":
          (!this.domWindow4_2 || this.domWindow4_2_UA && this.domWindow4_2_UA !== illII11I) && (await this._loadH5Sdk(iIiIi1ll, illII11I), this.domWindow4_2_UA = illII11I);
          break;
      }
      l1llIllI?.["t"] && typeof l1llIllI.t === "boolean" ? (l1llIllI.t = Date.now(), lilIil1I.t = l1llIllI.t) : l1llIllI.t = "";
      lilIil1I.params = "functionId=" + I1liil1i + "&body=" + encodeURIComponent(JSON.stringify(llii1iii)) + (l1llIllI?.["t"] ? "&t=" + l1llIllI.t : "") + "&appid=" + III1I1ll + "&client=" + li1iIill + "&clientVersion=" + iilI1ili + "&h5st=";
      let lllllli = "";
      switch (iIiIi1ll) {
        case "3.1":
          lllllli = await this._signWaap(iIiiI11, l1llIllI, this.domWindow3_1);
          break;
        case "4.1":
          lllllli = await this._signWaap(iIiiI11, l1llIllI, this.domWindow4_1);
          break;
        case "4.2":
          lllllli = await this._signWaap(iIiiI11, l1llIllI, this.domWindow4_2);
          break;
      }
      lilIil1I.h5st = lllllli || "";
      lilIil1I.params += lllllli || "";
      return lilIil1I;
    } catch (liiI1lII) {
      console.log("❌ getH5st 遇到了错误 " + (liiI1lII.message || liiI1lII));
    }
    return lilIil1I;
  }
  _SHA256(lIlIl1lI) {
    var Ii11ili1 = 8,
      Ii1i11i = 0;
    function i1l1Ii1I(li1iilii, i1i11llI) {
      var iIIIIiI1 = (li1iilii & 65535) + (i1i11llI & 65535),
        iIii1ii1 = (li1iilii >> 16) + (i1i11llI >> 16) + (iIIIIiI1 >> 16);
      return iIii1ii1 << 16 | iIIIIiI1 & 65535;
    }
    function lIIiil(i11IIIil, lIII1lIi) {
      return i11IIIil >>> lIII1lIi | i11IIIil << 32 - lIII1lIi;
    }
    function ll11l1i1(liIilI1l, I1l1lIIi) {
      return liIilI1l >>> I1l1lIIi;
    }
    function l1llIil(l1I1111l, I1ll1, i1illIi) {
      return l1I1111l & I1ll1 ^ ~l1I1111l & i1illIi;
    }
    function ili111Il(lIiillI1, iiI1IIii, i1iiiiI1) {
      return lIiillI1 & iiI1IIii ^ lIiillI1 & i1iiiiI1 ^ iiI1IIii & i1iiiiI1;
    }
    function IiI1III1(lll1lii1) {
      return lIIiil(lll1lii1, 2) ^ lIIiil(lll1lii1, 13) ^ lIIiil(lll1lii1, 22);
    }
    function iiiI11iI(I1Illlll) {
      return lIIiil(I1Illlll, 6) ^ lIIiil(I1Illlll, 11) ^ lIIiil(I1Illlll, 25);
    }
    function Iil1illl(l11l1iII) {
      return lIIiil(l11l1iII, 7) ^ lIIiil(l11l1iII, 18) ^ ll11l1i1(l11l1iII, 3);
    }
    function l1l1IIII(I1iIII1l) {
      return lIIiil(I1iIII1l, 17) ^ lIIiil(I1iIII1l, 19) ^ ll11l1i1(I1iIII1l, 10);
    }
    function i11iIiI1(iiiI1IiI, Iii1Iil1) {
      var IlllIi1 = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
        I11iiI = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
        l1Ii111I = new Array(64),
        IiIi1I,
        I1iii1iI,
        iiIi1ilI,
        i11l11I,
        iI1I1iiI,
        il1lii11,
        IIII1ili,
        I1lIll1i,
        IlI1Iii1,
        li1iiIi1,
        lliIIll1,
        lIll11;
      iiiI1IiI[Iii1Iil1 >> 5] |= 128 << 24 - Iii1Iil1 % 32;
      iiiI1IiI[(Iii1Iil1 + 64 >> 9 << 4) + 15] = Iii1Iil1;
      for (var IlI1Iii1 = 0; IlI1Iii1 < iiiI1IiI.length; IlI1Iii1 += 16) {
        IiIi1I = I11iiI[0];
        I1iii1iI = I11iiI[1];
        iiIi1ilI = I11iiI[2];
        i11l11I = I11iiI[3];
        iI1I1iiI = I11iiI[4];
        il1lii11 = I11iiI[5];
        IIII1ili = I11iiI[6];
        I1lIll1i = I11iiI[7];
        for (var li1iiIi1 = 0; li1iiIi1 < 64; li1iiIi1++) {
          if (li1iiIi1 < 16) {
            l1Ii111I[li1iiIi1] = iiiI1IiI[li1iiIi1 + IlI1Iii1];
          } else {
            l1Ii111I[li1iiIi1] = i1l1Ii1I(i1l1Ii1I(i1l1Ii1I(l1l1IIII(l1Ii111I[li1iiIi1 - 2]), l1Ii111I[li1iiIi1 - 7]), Iil1illl(l1Ii111I[li1iiIi1 - 15])), l1Ii111I[li1iiIi1 - 16]);
          }
          lliIIll1 = i1l1Ii1I(i1l1Ii1I(i1l1Ii1I(i1l1Ii1I(I1lIll1i, iiiI11iI(iI1I1iiI)), l1llIil(iI1I1iiI, il1lii11, IIII1ili)), IlllIi1[li1iiIi1]), l1Ii111I[li1iiIi1]);
          lIll11 = i1l1Ii1I(IiI1III1(IiIi1I), ili111Il(IiIi1I, I1iii1iI, iiIi1ilI));
          I1lIll1i = IIII1ili;
          IIII1ili = il1lii11;
          il1lii11 = iI1I1iiI;
          iI1I1iiI = i1l1Ii1I(i11l11I, lliIIll1);
          i11l11I = iiIi1ilI;
          iiIi1ilI = I1iii1iI;
          I1iii1iI = IiIi1I;
          IiIi1I = i1l1Ii1I(lliIIll1, lIll11);
        }
        I11iiI[0] = i1l1Ii1I(IiIi1I, I11iiI[0]);
        I11iiI[1] = i1l1Ii1I(I1iii1iI, I11iiI[1]);
        I11iiI[2] = i1l1Ii1I(iiIi1ilI, I11iiI[2]);
        I11iiI[3] = i1l1Ii1I(i11l11I, I11iiI[3]);
        I11iiI[4] = i1l1Ii1I(iI1I1iiI, I11iiI[4]);
        I11iiI[5] = i1l1Ii1I(il1lii11, I11iiI[5]);
        I11iiI[6] = i1l1Ii1I(IIII1ili, I11iiI[6]);
        I11iiI[7] = i1l1Ii1I(I1lIll1i, I11iiI[7]);
      }
      return I11iiI;
    }
    function i1Ii1Ili(lIIiIII) {
      var IIIliilI = Array(),
        IIll111i = (1 << Ii11ili1) - 1;
      for (var I1I1llIl = 0; I1I1llIl < lIIiIII.length * Ii11ili1; I1I1llIl += Ii11ili1) {
        IIIliilI[I1I1llIl >> 5] |= (lIIiIII.charCodeAt(I1I1llIl / Ii11ili1) & IIll111i) << 24 - I1I1llIl % 32;
      }
      return IIIliilI;
    }
    function IIl11I(IIl1ll1l) {
      IIl1ll1l = IIl1ll1l.replace(/\r\n/g, "\n");
      var lll1iil = "";
      for (var llIIiI1 = 0; llIIiI1 < IIl1ll1l.length; llIIiI1++) {
        var IIiliI = IIl1ll1l.charCodeAt(llIIiI1);
        if (IIiliI < 128) {
          lll1iil += String.fromCharCode(IIiliI);
        } else {
          if (IIiliI > 127 && IIiliI < 2048) {
            lll1iil += String.fromCharCode(IIiliI >> 6 | 192);
            lll1iil += String.fromCharCode(IIiliI & 63 | 128);
          } else {
            lll1iil += String.fromCharCode(IIiliI >> 12 | 224);
            lll1iil += String.fromCharCode(IIiliI >> 6 & 63 | 128);
            lll1iil += String.fromCharCode(IIiliI & 63 | 128);
          }
        }
      }
      return lll1iil;
    }
    function i1IiliI(I1l11III) {
      var iIIliiI1 = Ii1i11i ? "0123456789ABCDEF" : "0123456789abcdef",
        iIiIIII = "";
      for (var iiII1lIl = 0; iiII1lIl < I1l11III.length * 4; iiII1lIl++) {
        iIiIIII += iIIliiI1.charAt(I1l11III[iiII1lIl >> 2] >> (3 - iiII1lIl % 4) * 8 + 4 & 15) + iIIliiI1.charAt(I1l11III[iiII1lIl >> 2] >> (3 - iiII1lIl % 4) * 8 & 15);
      }
      return iIiIIII;
    }
    lIlIl1lI = IIl11I(lIlIl1lI);
    return i1IiliI(i11iIiI1(i1Ii1Ili(lIlIl1lI), lIlIl1lI.length * Ii11ili1));
  }
}
module.exports = new IiII1Iil();
var version_ = "jsjiami.com.v7";