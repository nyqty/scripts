/*
new Env('savePrize');
全品类填地址通用依赖
*/

const Iii1l11I = require("got");
async function I11iI1Il(i1l1iIIl) {
  let {
    baseUrl: lIilIlIi,
    cookie: llIll1Ii,
    ua: Iii1iIi1,
    activityId: lIilil1I,
    activityType: iilIIlli,
    venderId: lll1i11,
    secretPin: lIi1iili,
    prizeName: lI11IIi1,
    generateId: lllIl1l
  } = i1l1iIIl;
  const l1lI11li = process.env.WX_ADDRESS || "",
    iiIllIIl = process.env.WX_ADDRESS_BLOCK || "";
  if (l1lI11li === "") {
    return false;
  }
  const iiiii1i1 = l1lI11li.split("|"),
    lIilillI = Math.floor(Math.random() * iiiii1i1.length);
  if (iiiii1i1[lIilillI] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [ilill1Ii, iI1IiIii, li1IlIII, l1l111lI, i1IliiIl, i1iilIiI, iilI111I, iiillI1i] = iiiii1i1[lIilillI].split("@");
  if (iiillI1i === undefined) {
    return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  }
  for (let i1l1liil = 0; i1l1liil < 7; i1l1liil++) {
    if (iiiii1i1[i1l1liil] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  if (iiIllIIl !== "") {
    const I1iii1ll = iiIllIIl.split("@");
    if (I1iii1ll.some(ii111I11 => lI11IIi1.includes(ii111I11))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  Array.isArray(lll1i11) && (shopId = lll1i11[1], lll1i11 = lll1i11[0]);
  const IIlIli1l = {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": lIilIlIi.match(/https?:\/\/([^/]+)/)[1],
        "Origin": lIilIlIi,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": lIilIlIi + "/wxAddress/save",
        "Cookie": llIll1Ii,
        "User-Agent": Iii1iIi1
      },
      "body": "venderId=" + lll1i11 + "&pin=" + (lIilIlIi.includes("cjhy") ? encodeURIComponent(encodeURIComponent(lIi1iili)) : encodeURIComponent(lIi1iili)) + "&activityId=" + lIilil1I + "&actType=" + iilIIlli + "&prizeName=" + encodeURIComponent(lI11IIi1) + "&receiver=" + encodeURIComponent(ilill1Ii) + "&phone=" + iI1IiIii + "&province=" + encodeURIComponent(li1IlIII) + "&city=" + encodeURIComponent(l1l111lI) + "&county=" + encodeURIComponent(i1IliiIl) + "&areaCode=" + iilI111I + "&address=" + encodeURIComponent(i1iilIiI) + "&generateId=" + lllIl1l + "&postalCode=" + iiillI1i,
      "timeout": 30000
    },
    I1ilIiIl = 5;
  let l1iI1Ii1 = 0,
    I11iIIi1 = null;
  while (l1iI1Ii1 < I1ilIiIl) {
    const I1I111i1 = await Iii1l11I.post(lIilIlIi + "/wxAddress/save", IIlIli1l).catch(async iIlIiI1 => {
      if (iIlIiI1?.["response"]) {
        iIlIiI1 = iIlIiI1.response;
        if (typeof iIlIiI1 === "string" && iIlIiI1.includes("Timeout awaiting 'request'")) I11iIIi1 = "请求超时，请检查网络重试";else {
          const IlI1illI = I1I111i1?.["statusCode"];
          if (IlI1illI) {
            if ([403, 493].includes(IlI1illI)) I11iIIi1 = "请求失败，IP被限制（Response code " + IlI1illI + "）";else [400, 404].includes(IlI1illI) ? I11iIIi1 = "请求配置参数错误，请联系开发者进行反馈（Response code " + IlI1illI + "）" : I11iIIi1 = "请求失败（Response code " + IlI1illI + "）";
          } else I11iIIi1 = "API请求失败 " + (iIlIiI1.message || iIlIiI1);
        }
      } else {
        if (iIlIiI1?.["response"]?.["body"]) I11iIIi1 = "请求失败 " + iIlIiI1.response.body + " ";else {
          I11iIIi1 = "请求失败 " + (iIlIiI1 || "") + " ";
        }
      }
      l1iI1Ii1++;
    });
    if (I1I111i1 && typeof I1I111i1 === "object") {
      if (I1I111i1.body) try {
        const Iiii1I = JSON.parse(I1I111i1.body);
        if (Iiii1I && Iiii1I.result) return console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (lIilillI + 1) + "套收货地址信息\n联系信息：" + ilill1Ii + " (" + iI1IiIii.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), true;else {
          if (l1iI1Ii1 === 0 && shopId) {
            IIlIli1l.body = "venderId=" + shopId + "&pin=" + (lIilIlIi.includes("cjhy") ? encodeURIComponent(encodeURIComponent(lIi1iili)) : encodeURIComponent(lIi1iili)) + "&activityId=" + lIilil1I + "&actType=" + iilIIlli + "&prizeName=" + encodeURIComponent(lI11IIi1) + "&receiver=" + encodeURIComponent(ilill1Ii) + "&phone=" + iI1IiIii + "&province=" + encodeURIComponent(li1IlIII) + "&city=" + encodeURIComponent(l1l111lI) + "&county=" + encodeURIComponent(i1IliiIl) + "&areaCode=" + iilI111I + "&address=" + encodeURIComponent(i1iilIiI) + "&generateId=" + lllIl1l + "&postalCode=" + iiillI1i;
            l1iI1Ii1++;
          } else return console.log("🚫 保存收货地址失败 ➜ " + (Iiii1I.errorMessage || JSON.stringify(I1I111i1))), false;
        }
      } catch (Ii1I1lIi) {
        return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (Ii1I1lIi.message || Ii1I1lIi)), false;
      } else {
        I11iIIi1 = "请求失败，无响应数据";
        l1iI1Ii1++;
      }
    }
  }
  return l1iI1Ii1 >= I1ilIiIl && console.log("🚫 保存收货地址异常 ➜ " + I11iIIi1), false;
}
async function Ii11iiiI(i1lili) {
  let {
    baseUrl: i1II11,
    newbaseUrl: iI1IIlIl,
    cookie: IIl1111,
    ua: Iiiiilll,
    token: I11lliil,
    prizeName: I1Il11il,
    orderCode: i1illIIl
  } = i1lili;
  const lI1liiIi = process.env.WX_ADDRESS || "",
    I1l1llIl = process.env.WX_ADDRESS_BLOCK || "";
  if (lI1liiIi === "") return false;
  const ll1IiIIl = lI1liiIi.split("|"),
    IiiIill1 = Math.floor(Math.random() * ll1IiIIl.length);
  if (ll1IiIIl[IiiIill1] === "") {
    return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  }
  const [i1IiilIi, iIl1II, IiIllIil, il1I1i1i, I1iiI1li, iilllIi] = ll1IiIIl[IiiIill1].split("@");
  for (let I1iilIl = 0; I1iilIl < 6; I1iilIl++) {
    if (ll1IiIIl[I1iilIl] === "") {
      return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
  }
  if (I1l1llIl !== "") {
    const l1IiI111 = I1l1llIl.split("@");
    if (l1IiI111.some(l1i1i111 => I1Il11il.includes(l1i1i111))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  const liiliili = i1II11.match(/https?:\/\/([^/]+)/)[1],
    iiiIllI1 = {
      "realName": i1IiilIi,
      "mobile": iIl1II,
      "address": iilllIi,
      "orderCode": i1illIIl,
      "province": IiIllIil,
      "city": il1I1i1i,
      "county": I1iiI1li
    },
    l1li1ill = {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": liiliili,
        "Origin": i1II11,
        "Content-Type": "application/json;charset=UTF-8",
        "Referer": iI1IIlIl + "/api/my/prize/update",
        "token": I11lliil,
        "Cookie": IIl1111,
        "User-Agent": Iiiiilll
      },
      "body": JSON.stringify(iiiIllI1),
      "timeout": 30000
    },
    iIiIIi1i = 5;
  let lIIII1ll = 0,
    iIlIi11i = null;
  while (lIIII1ll < iIiIIi1i) {
    const l11l1lil = await Iii1l11I.post(iI1IIlIl + "/api/my/prize/update", l1li1ill).catch(async i1Ili111 => {
      if (i1Ili111?.["response"]) {
        i1Ili111 = i1Ili111.response;
        if (typeof i1Ili111 === "string" && i1Ili111.includes("Timeout awaiting 'request'")) iIlIi11i = "请求超时，请检查网络重试";else {
          const i1lI111i = l11l1lil?.["statusCode"];
          if (i1lI111i) {
            if ([403, 493].includes(i1lI111i)) iIlIi11i = "请求失败，IP被限制（Response code " + i1lI111i + "）";else [400, 404].includes(i1lI111i) ? iIlIi11i = "请求配置参数错误，请联系开发者进行反馈（Response code " + i1lI111i + "）" : iIlIi11i = "请求失败（Response code " + i1lI111i + "）";
          } else iIlIi11i = "API请求失败 " + (i1Ili111.message || i1Ili111);
        }
      } else i1Ili111?.["response"]?.["body"] ? iIlIi11i = "请求失败 " + i1Ili111.response.body + " " : iIlIi11i = "请求失败 " + (i1Ili111 || "") + " ";
      lIIII1ll++;
    });
    if (l11l1lil.body) {
      try {
        const IlllliI = JSON.parse(l11l1lil.body);
        if (IlllliI && IlllliI.resp_code === 0) {
          return console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (IiiIill1 + 1) + "套收货地址信息\n联系信息：" + i1IiilIi + " (" + iIl1II.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), true;
        } else {
          if (IlllliI && IlllliI.resp_code === 2) return console.log("🚫 保存收货地址失败 ➜ " + (IlllliI.resp_msg || JSON.stringify(IlllliI))), false;else {
            if (lIIII1ll < 5) {
              console.log("🚫 保存收货地址失败 ➜ " + (IlllliI.resp_msg || JSON.stringify(IlllliI)));
              lIIII1ll++;
            } else return console.log("🚫 保存收货地址失败 ➜ " + (IlllliI.resp_msg || JSON.stringify(IlllliI))), false;
          }
        }
      } catch (lIiIlIil) {
        return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (lIiIlIil.message || lIiIlIil)), false;
      }
    } else iIlIi11i = "请求失败，无响应数据", lIIII1ll++;
  }
  if (lIIII1ll >= iIiIIi1i) {
    console.log("🚫 保存收货地址异常 ➜ " + iIlIi11i);
  }
  return false;
}
async function l1iiIIl1(liiIIil, lI1liII1, i1iiIIi, liill1I, IiIIlIl, I1Il1l, liI1Iiil, ilIllil, Ii1Iii11) {
  const iIIiIiI = process.env.WX_ADDRESS || "",
    i1lllIl1 = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
  let iiIIliiI = [];
  if (iIIiIiI != "") iiIIliiI = iIIiIiI.split("|");else return false;
  var lIlilll = Math.floor(Math.random() * iiIIliiI.length);
  if (iiIIliiI[lIlilll] == "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;else {
    iiIIliiI = iiIIliiI[lIlilll];
  }
  iiIIliiI = iiIIliiI.split("@");
  if (iiIIliiI.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  for (let iili1III = 0; iili1III < 7; iili1III++) {
    if (iiIIliiI[iili1III] == "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  const i1iIil1 = iiIIliiI[0],
    lII1iI1i = iiIIliiI[1],
    li11iil = iiIIliiI[2],
    iiIi11Ii = iiIIliiI[3],
    lIIIIi1I = iiIIliiI[4],
    I1iIi111 = iiIIliiI[5],
    ii1liII = iiIIliiI[6],
    l1IIII1I = iiIIliiI[7];
  if (i1lllIl1 != "") {
    let l1li1iIl = i1lllIl1.split("@"),
      i1lll1iI = false;
    for (let l1iiIiII of l1li1iIl) {
      if (ilIllil.includes(l1iiIiII)) {
        console.log("\n🚫 触发（" + l1iiIiII + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
        i1lll1iI = true;
        break;
      }
    }
    if (i1lll1iI) return false;
  }
  const iliiiill = liiIIil.includes("cjhy") ? encodeURIComponent(encodeURIComponent(liI1Iiil)) : encodeURIComponent(liI1Iiil),
    iiI1lIiI = liiIIil.match(/https?:\/\/([^/]+)/)[1],
    IlIlllil = "venderId=" + I1Il1l + "&pin=" + iliiiill + "&activityId=" + liill1I + "&actType=" + IiIIlIl + "&prizeName=" + encodeURIComponent(ilIllil) + "&receiver=" + encodeURIComponent(i1iIil1) + "&phone=" + lII1iI1i + "&province=" + encodeURIComponent(li11iil) + "&city=" + encodeURIComponent(iiIi11Ii) + "&county=" + encodeURIComponent(lIIIIi1I) + "&areaCode=" + ii1liII + "&address=" + encodeURIComponent(I1iIi111) + "&generateId=" + Ii1Iii11 + "&postalCode=" + l1IIII1I;
  let IlIIiI1 = false;
  try {
    let llIiiil1 = await Iii1l11I.post(liiIIil + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": iiI1lIiI,
        "Origin": liiIIil,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": liiIIil + "/wxAddress/save",
        "Cookie": lI1liII1,
        "User-Agent": i1iiIIi
      },
      "body": IlIlllil
    }).json().catch(II11IIll => {
      console.error("🚫 wxSavePrize API请求失败 ➜ (" + II11IIll.response.statusCode + " " + II11IIll.response.statusMessage + ")\n");
    });
    if (llIiiil1 && llIiiil1.result) {
      console.log("\n已自动提交收货地址 ✅\n");
      console.log("登记模板：采用第" + (lIlilll + 1) + "套收货地址信息（随机抽取）");
      console.log("联系信息：" + i1iIil1 + " (" + lII1iI1i.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）");
      console.log("");
      IlIIiI1 = true;
    } else llIiiil1.errorMessage ? console.log("🚫 保存收货地址失败 ➜ " + llIiiil1.errorMessage) : console.log("🚫 保存收货地址失败 ➜ " + JSON.stringify(llIiiil1)), console.log("");
  } catch (I1lilllI) {
    console.log("🚫 保存收货地址异常 ➜ " + I1lilllI);
  }
  return IlIIiI1;
}
module.exports = {
  "wxSavePrize": l1iiIIl1,
  "wuxian_savePrize": I11iI1Il,
  "loreal_savePrize": Ii11iiiI
};