/*
业务加密通用库
new Env('JDCrypto');
*/
var version_ = "jsjiami.com.v7";
const IiIl = require("crypto-js");
class IiIi {
  wuxianDefense() {
    const l1il1l = ["/api/task/building/build", "/api/prize/draw", "/api/task/member/rank/getMember", "/api/task/rank/getRankInfo", "/api/task/member/rank/getMember", "/api/prize/receive/acquire", "/api/task/daySign/getSignClick", "/api/task/addSku/toDo", "/api/task/followGoods/followGoods", "/api/task/dmpss/toDo", "/api/task/dailyGift/todo", "/api/group/draw/toDo", "/api/basic/task/toDo", "/api/task/jiugongge/toDo", "/api/task/niudanji/toDo", "/api/task/organizeTeam/saveMember", "/api/questionnaire/answer"],
      liIil = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wxShopFollowActivity/getPrize", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"],
      IllI1I = [...l1il1l, ...liIil];
    function liIii(I1lIii, IiI1I, illlIl) {
      function IIIIIi(liiIIi) {
        liiIIi = liiIIi.split("").reverse().join("");
        const lil11I = new Uint8Array(12),
          Iliii1 = new TextEncoder().encode(liiIIi);
        for (let lillIl = 0; lillIl < Iliii1.length; lillIl += 2) {
          let iIiIl = Iliii1[lillIl] << 5 | Iliii1[lillIl + 1] & 255;
          iIiIl %= 63;
          lil11I[lillIl >> 1] = iIiIl;
        }
        let iIiIi = "";
        for (let iiilii = 0; iiilii < lil11I.length; iiilii++) {
          iIiIi += (lil11I[iiilii] + 256).toString(2).slice(1);
        }
        let iil1ll = "",
          iiilil = "";
        for (let li1i1i = 0; li1i1i < 16; li1i1i++) {
          if (li1i1i !== 0) {
            const IlIli1 = li1i1i * 6,
              illIiI = iIiIi.substring(IlIli1, IlIli1 + 6);
            let lI1lli = parseInt(illIiI, 2);
            const Ill1l = iiilil.split("");
            for (let llI1Il = 0; llI1Il < Ill1l.length; llI1Il++) {
              if (Ill1l[llI1Il] === "1") {
                lI1lli = (lI1lli >> 6 - llI1Il | lI1lli << llI1Il) & 63;
              }
            }
            iiilil = (lI1lli & 63).toString(2).padStart(6, "0");
          } else {
            iiilil = iIiIi.substring(0, 6);
          }
          iil1ll += iiilil;
        }
        for (let lllI1l = 0; lllI1l < 12; lllI1l++) {
          const i11iii = lllI1l * 8;
          lil11I[lllI1l] = parseInt(iil1ll.substring(i11iii, i11iii + 8), 2);
        }
        const iil1li = btoa(String.fromCharCode.apply(null, lil11I));
        return iil1li;
      }
      const IIIIIl = ["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"];
      let I1lIil = Date.now() + parseInt(illlIl);
      typeof I1lIii != "object" && (I1lIii = JSON.parse(I1lIii));
      I1lIii.nowTime = I1lIil;
      let IIIl1i = IiI1I + I1lIil;
      const liiII1 = IIIl1i.substring(0, IIIl1i.length - 5);
      let IIIl1l = "";
      for (let iiiliI = 0; iiiliI < liiII1.length; iiiliI++) {
        let illIii = liiII1.charCodeAt(iiiliI),
          ii1il1 = illIii % 10,
          lI1llI = IIIIIl[ii1il1][iiiliI];
        IIIl1l += lI1llI;
      }
      var lllll = IIIl1l.length,
        i11ili = Math.floor(lllll / 24),
        iil1l1 = "";
      for (var lllli = 0; lllli < 24; lllli++) {
        var iiili1 = (lllli + 1) * i11ili;
        lllli === 23 && (iiili1 = lllll);
        var ill11i = IIIl1l.substring(lllli * i11ili, iiili1),
          lllill = [];
        for (var ill11l = 0; ill11l < ill11i.length; ill11l++) {
          lllill.push(ill11i.charCodeAt(ill11l));
        }
        var I1lIiI = lllill.reduce(function (Ill1I, i11iiI) {
            return Ill1I + i11iiI;
          }, 0),
          lllili = Math.floor(I1lIiI / lllill.length);
        iil1l1 += String.fromCharCode(lllili);
      }
      IIIl1l = iil1l1;
      const IliiiI = IIIIIi(IIIl1l),
        Ill11 = IiIl.enc.Utf8.parse(IliiiI),
        liiIII = IiIl.enc.Utf8.parse(""),
        li1i11 = IiIl.AES.encrypt(JSON.stringify(I1lIii), Ill11, {
          iv: liiIII,
          mode: IiIl.mode.ECB,
          padding: IiIl.pad.Pkcs7
        });
      return li1i11.toString();
    }
    function II1ll1(IlIlii) {
      const i1l1i1 = IllI1I,
        liil11 = Object.fromEntries(i1l1i1.map(l1l111 => [l1l111, true])),
        iiillI = liil11[IlIlii] !== undefined;
      return iiillI;
    }
    function IlI1Ii() {
      const IIIIII = IiIl.enc.Utf8.parse("Hd5W5ONsYKmGm9QA"),
        lillII = IiIl.enc.Utf8.parse("2JjUvJEAsA2Yog==");
      function ii1ilI(iIiI1) {
        const liil1I = IiIl.enc.Utf8.parse(iIiI1),
          i11ii1 = IiIl.AES.encrypt(liil1I, IIIIII, {
            iv: lillII,
            mode: IiIl.mode.CBC,
            padding: IiIl.pad.Pkcs7
          });
        return IiIl.enc.Base64.stringify(i11ii1.ciphertext);
      }
      function lI1ll1(iiill1) {
        const lIli1i = IiIl.enc.Base64.parse(iiill1),
          IIIII1 = IiIl.enc.Base64.stringify(lIli1i),
          I1lIlI = IiIl.AES.decrypt(IIIII1, IIIIII, {
            iv: lillII,
            mode: IiIl.mode.CBC,
            padding: IiIl.pad.Pkcs7
          });
        return IiIl.enc.Utf8.stringify(I1lIlI).toString();
      }
      return {
        encrypt: ii1ilI,
        decrypt: lI1ll1
      };
    }
    return {
      encrypt: liIii,
      isDefenseApi: II1ll1,
      interactionV2: IlI1Ii
    };
  }
}
const iI1ll1 = new IiIi();
module.exports = {
  wuxianDefense: iI1ll1.wuxianDefense()
};
var version_ = "jsjiami.com.v7";