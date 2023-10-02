/*
new Env('savePrize');
全品类填地址通用依赖
*/

const i1Ii11 = require("got");
async function iI1i1Ill(liIliIII) {
  let {
    baseUrl: I1lii1Il,
    cookie: Ii1iliI1,
    ua: iIiil1i1,
    activityId: I1Illi,
    activityType: il1li1iI,
    venderId: liI11IIi,
    secretPin: IllIIiII,
    prizeName: I1IlIl1i,
    generateId: ii11iIII
  } = liIliIII;
  const IiIli1 = process.env.WX_ADDRESS || "",
    lIIIl1I1 = process.env.WX_ADDRESS_BLOCK || "";
  if (IiIli1 === "") return false;
  const Iii1IllI = IiIli1.split("|"),
    iili1li = Math.floor(Math.random() * Iii1IllI.length);
  if (Iii1IllI[iili1li] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [ii1i1l1, IIlIll1I, lilI11I1, liI1lI, liIlIII, i1II111I, l1IIIl1l, i1I1IIi] = Iii1IllI[iili1li].split("@");
  if (i1I1IIi === undefined) {
    return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  }
  for (let l11ilili = 0; l11ilili < 7; l11ilili++) {
    if (Iii1IllI[l11ilili] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  if (lIIIl1I1 !== "") {
    const I111IliI = lIIIl1I1.split("@");
    if (I111IliI.some(Iili1 => I1IlIl1i.includes(Iili1))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  Array.isArray(liI11IIi) && (shopId = liI11IIi[1], liI11IIi = liI11IIi[0]);
  const IIII1lii = {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": I1lii1Il.match(/https?:\/\/([^/]+)/)[1],
        "Origin": I1lii1Il,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": I1lii1Il + "/wxAddress/save",
        "Cookie": Ii1iliI1,
        "User-Agent": iIiil1i1
      },
      "body": "venderId=" + liI11IIi + "&pin=" + (I1lii1Il.includes("cjhy") ? encodeURIComponent(encodeURIComponent(IllIIiII)) : encodeURIComponent(IllIIiII)) + "&activityId=" + I1Illi + "&actType=" + il1li1iI + "&prizeName=" + encodeURIComponent(I1IlIl1i) + "&receiver=" + encodeURIComponent(ii1i1l1) + "&phone=" + IIlIll1I + "&province=" + encodeURIComponent(lilI11I1) + "&city=" + encodeURIComponent(liI1lI) + "&county=" + encodeURIComponent(liIlIII) + "&areaCode=" + l1IIIl1l + "&address=" + encodeURIComponent(i1II111I) + "&generateId=" + ii11iIII + "&postalCode=" + i1I1IIi,
      "timeout": 30000
    },
    ii1li1ii = 5;
  let lIlIIll = 0,
    i11l1i11 = null;
  while (lIlIIll < ii1li1ii) {
    let lilllIIi = null;
    try {
      lilllIIi = await i1Ii11.post(I1lii1Il + "/wxAddress/save", IIII1lii);
    } catch (iiIII11I) {
      if (iiIII11I?.["response"]) {
        iiIII11I = iiIII11I.response;
        if (typeof iiIII11I === "string" && iiIII11I.includes("Timeout awaiting 'request'")) i11l1i11 = "请求超时，请检查网络重试";else {
          const lI111II = lilllIIi?.["statusCode"];
          if (lI111II) {
            if ([403, 493].includes(lI111II)) i11l1i11 = "请求失败，IP被限制（Response code " + lI111II + "）";else [400, 404].includes(lI111II) ? i11l1i11 = "请求配置参数错误，请联系开发者进行反馈（Response code " + lI111II + "）" : i11l1i11 = "请求失败（Response code " + lI111II + "）";
          } else i11l1i11 = "API请求失败 " + (iiIII11I.message || iiIII11I);
        }
      } else iiIII11I?.["response"]?.["body"] ? i11l1i11 = "请求失败 " + iiIII11I.response.body + " " : i11l1i11 = "请求失败 " + (iiIII11I || "") + " ";
      lIlIIll++;
    }
    if (lilllIIi && typeof lilllIIi === "object") {
      if (lilllIIi?.["body"]) try {
        const l111l1lI = JSON.parse(lilllIIi.body);
        if (l111l1lI && l111l1lI.result) return console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (iili1li + 1) + "套收货地址信息\n联系信息：" + ii1i1l1 + " (" + IIlIll1I.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), true;else {
          if (lIlIIll === 0 && shopId) IIII1lii.body = "venderId=" + shopId + "&pin=" + (I1lii1Il.includes("cjhy") ? encodeURIComponent(encodeURIComponent(IllIIiII)) : encodeURIComponent(IllIIiII)) + "&activityId=" + I1Illi + "&actType=" + il1li1iI + "&prizeName=" + encodeURIComponent(I1IlIl1i) + "&receiver=" + encodeURIComponent(ii1i1l1) + "&phone=" + IIlIll1I + "&province=" + encodeURIComponent(lilI11I1) + "&city=" + encodeURIComponent(liI1lI) + "&county=" + encodeURIComponent(liIlIII) + "&areaCode=" + l1IIIl1l + "&address=" + encodeURIComponent(i1II111I) + "&generateId=" + ii11iIII + "&postalCode=" + i1I1IIi, lIlIIll++;else return console.log("🚫 保存收货地址失败 ➜ " + (l111l1lI.errorMessage || JSON.stringify(lilllIIi))), false;
        }
      } catch (lliI1IiI) {
        return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (lliI1IiI.message || lliI1IiI)), false;
      } else i11l1i11 = "无响应数据", lIlIIll++;
    }
    lilllIIi = null;
  }
  return lIlIIll >= ii1li1ii && console.log("🚫 保存收货地址异常 ➜ " + i11l1i11), false;
}
async function l11IlI1i(i1Ii1i) {
  let {
    baseUrl: IIIiii,
    newbaseUrl: II1lI1i,
    cookie: i1il11Ii,
    ua: iIIIl1I,
    token: iIIIIIiI,
    prizeName: Illl1II,
    orderCode: il1i1lli
  } = i1Ii1i;
  const i1illlIl = process.env.WX_ADDRESS || "",
    ll11l1ll = process.env.WX_ADDRESS_BLOCK || "";
  if (i1illlIl === "") {
    return false;
  }
  const iiiIIIl1 = i1illlIl.split("|"),
    Ii1iliii = Math.floor(Math.random() * iiiIIIl1.length);
  if (iiiIIIl1[Ii1iliii] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [lIl1Il1, lillli1, iIillIi, Ii1lilll, Illl11Ii, ilii1Ill] = iiiIIIl1[Ii1iliii].split("@");
  for (let illl11ll = 0; illl11ll < 6; illl11ll++) {
    if (iiiIIIl1[illl11ll] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  if (ll11l1ll !== "") {
    const Iliiiii = ll11l1ll.split("@");
    if (Iliiiii.some(Iil1iI1l => Illl1II.includes(Iil1iI1l))) {
      return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
    }
  }
  const iI1li1I = IIIiii.match(/https?:\/\/([^/]+)/)[1],
    I1lIilI1 = {
      "realName": lIl1Il1,
      "mobile": lillli1,
      "address": ilii1Ill,
      "orderCode": il1i1lli,
      "province": iIillIi,
      "city": Ii1lilll,
      "county": Illl11Ii
    },
    I1iIiiI1 = {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": iI1li1I,
        "Origin": IIIiii,
        "Content-Type": "application/json;charset=UTF-8",
        "Referer": II1lI1i + "/api/my/prize/update",
        "token": iIIIIIiI,
        "Cookie": i1il11Ii,
        "User-Agent": iIIIl1I
      },
      "body": JSON.stringify(I1lIilI1),
      "timeout": 30000
    },
    iilI1lI1 = 5;
  let I1l1lli1 = 0,
    Il11Iiil = null;
  while (I1l1lli1 < iilI1lI1) {
    let lII1l11l = null;
    try {
      lII1l11l = await i1Ii11.post(II1lI1i + "/api/my/prize/update", I1iIiiI1);
    } catch (Il1ilI1l) {
      if (Il1ilI1l?.["response"]) {
        Il1ilI1l = Il1ilI1l.response;
        if (typeof Il1ilI1l === "string" && Il1ilI1l.includes("Timeout awaiting 'request'")) Il11Iiil = "请求超时，请检查网络重试";else {
          const llllIiII = lII1l11l?.["statusCode"];
          if (llllIiII) {
            if ([403, 493].includes(llllIiII)) Il11Iiil = "请求失败，IP被限制（Response code " + llllIiII + "）";else [400, 404].includes(llllIiII) ? Il11Iiil = "请求配置参数错误，请联系开发者进行反馈（Response code " + llllIiII + "）" : Il11Iiil = "请求失败（Response code " + llllIiII + "）";
          } else Il11Iiil = "API请求失败 " + (Il1ilI1l.message || Il1ilI1l);
        }
      } else Il1ilI1l?.["response"]?.["body"] ? Il11Iiil = "请求失败 " + Il1ilI1l.response.body + " " : Il11Iiil = "请求失败 " + (Il1ilI1l || "") + " ";
      I1l1lli1++;
    }
    if (lII1l11l?.["body"]) {
      try {
        const IlIII1 = JSON.parse(lII1l11l.body);
        if (IlIII1 && IlIII1.resp_code === 0) {
          return console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (Ii1iliii + 1) + "套收货地址信息\n联系信息：" + lIl1Il1 + " (" + lillli1.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), true;
        } else {
          if (IlIII1 && IlIII1.resp_code === 2) {
            return console.log("🚫 保存收货地址失败 ➜ " + (IlIII1.resp_msg || JSON.stringify(IlIII1))), false;
          } else {
            if (I1l1lli1 < 5) console.log("🚫 保存收货地址失败 ➜ " + (IlIII1.resp_msg || JSON.stringify(IlIII1))), I1l1lli1++;else return console.log("🚫 保存收货地址失败 ➜ " + (IlIII1.resp_msg || JSON.stringify(IlIII1))), false;
          }
        }
      } catch (l11II) {
        return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (l11II.message || l11II)), false;
      }
    } else Il11Iiil = "无响应数据", I1l1lli1++;
    lII1l11l = null;
  }
  if (I1l1lli1 >= iilI1lI1) {
    console.log("🚫 保存收货地址异常 ➜ " + Il11Iiil);
  }
  return false;
}
async function IIiIlIIl(Ilii1l, iII1IIi, lIII1i, Il1lii1l, IIIi1Ili, liIIiiii, Ii1iiil, liI1li1l, iiiiI1) {
  const Il1iI = process.env.WX_ADDRESS || "",
    IIli1I = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
  let iIIIIlIi = [];
  if (Il1iI != "") iIIIIlIi = Il1iI.split("|");else return false;
  var iiIiliiI = Math.floor(Math.random() * iIIIIlIi.length);
  if (iIIIIlIi[iiIiliiI] == "") {
    return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  } else {
    iIIIIlIi = iIIIIlIi[iiIiliiI];
  }
  iIIIIlIi = iIIIIlIi.split("@");
  if (iIIIIlIi.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  for (let llIiI1 = 0; llIiI1 < 7; llIiI1++) {
    if (iIIIIlIi[llIiI1] == "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  const lII1Iii = iIIIIlIi[0],
    ll11I1l = iIIIIlIi[1],
    l1Ilii1 = iIIIIlIi[2],
    Ii1iIIli = iIIIIlIi[3],
    lIil1IIi = iIIIIlIi[4],
    IIiiillI = iIIIIlIi[5],
    IiiiIIlI = iIIIIlIi[6],
    Iil1lIIi = iIIIIlIi[7];
  if (IIli1I != "") {
    let IIllIIl1 = IIli1I.split("@"),
      i11iiIlI = false;
    for (let iII1i1ll of IIllIIl1) {
      if (liI1li1l.includes(iII1i1ll)) {
        console.log("\n🚫 触发（" + iII1i1ll + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
        i11iiIlI = true;
        break;
      }
    }
    if (i11iiIlI) return false;
  }
  const iii11IIl = Ilii1l.includes("cjhy") ? encodeURIComponent(encodeURIComponent(Ii1iiil)) : encodeURIComponent(Ii1iiil),
    Il1iI1ii = Ilii1l.match(/https?:\/\/([^/]+)/)[1],
    I1iiIIiI = "venderId=" + liIIiiii + "&pin=" + iii11IIl + "&activityId=" + Il1lii1l + "&actType=" + IIIi1Ili + "&prizeName=" + encodeURIComponent(liI1li1l) + "&receiver=" + encodeURIComponent(lII1Iii) + "&phone=" + ll11I1l + "&province=" + encodeURIComponent(l1Ilii1) + "&city=" + encodeURIComponent(Ii1iIIli) + "&county=" + encodeURIComponent(lIil1IIi) + "&areaCode=" + IiiiIIlI + "&address=" + encodeURIComponent(IIiiillI) + "&generateId=" + iiiiI1 + "&postalCode=" + Iil1lIIi;
  let III1iiiI = false;
  try {
    let Ii1l1i1 = await i1Ii11.post(Ilii1l + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": Il1iI1ii,
        "Origin": Ilii1l,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": Ilii1l + "/wxAddress/save",
        "Cookie": iII1IIi,
        "User-Agent": lIII1i
      },
      "body": I1iiIIiI
    }).json().catch(i111lII => {
      console.error("🚫 wxSavePrize API请求失败 ➜ (" + i111lII.response.statusCode + " " + i111lII.response.statusMessage + ")\n");
    });
    if (Ii1l1i1 && Ii1l1i1.result) console.log("\n已自动提交收货地址 ✅\n"), console.log("登记模板：采用第" + (iiIiliiI + 1) + "套收货地址信息（随机抽取）"), console.log("联系信息：" + lII1Iii + " (" + ll11I1l.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）"), console.log(""), III1iiiI = true;else {
      if (Ii1l1i1.errorMessage) console.log("🚫 保存收货地址失败 ➜ " + Ii1l1i1.errorMessage);else {
        console.log("🚫 保存收货地址失败 ➜ " + JSON.stringify(Ii1l1i1));
      }
      console.log("");
    }
  } catch (lili1lII) {
    console.log("🚫 保存收货地址异常 ➜ " + lili1lII);
  }
  return III1iiiI;
}
module.exports = {
  "wxSavePrize": IIiIlIIl,
  "wuxian_savePrize": iI1i1Ill,
  "loreal_savePrize": l11IlI1i
};