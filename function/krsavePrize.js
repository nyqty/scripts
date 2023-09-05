/*
new Env('savePrize');
全品类填地址通用依赖
*/
const liIii1I1 = require("got");
async function IlIl1iil(IIIllIIi) {
  let {
    baseUrl: I1IiI1ii,
    cookie: ll11l1l,
    ua: li1I1ii,
    activityId: ilI11Ill,
    activityType: Iilllll1,
    venderId: l1iIilI,
    secretPin: i1IiIli,
    prizeName: i1i11i11,
    generateId: il11i1I
  } = IIIllIIi;
  const l1Ill1l = process.env.WX_ADDRESS || "",
    ii1lI1l1 = process.env.WX_ADDRESS_BLOCK || "";
  if (l1Ill1l === "") return false;
  const IiiiiiII = l1Ill1l.split("|"),
    Il1III = Math.floor(Math.random() * IiiiiiII.length);
  if (IiiiiiII[Il1III] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [ililil1i, iIi11I1, iIilll1l, iiIlilil, Il1I1ilI, IIlI11I, l1i1lIii, I1111l1i] = IiiiiiII[Il1III].split("@");
  if (I1111l1i === undefined) {
    return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  }
  for (let i1IlliI = 0; i1IlliI < 7; i1IlliI++) {
    if (IiiiiiII[i1IlliI] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  if (ii1lI1l1 !== "") {
    const I1I1IiI = ii1lI1l1.split("@");
    if (I1I1IiI.some(iIlI1Ill => i1i11i11.includes(iIlI1Ill))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  Array.isArray(l1iIilI) && (shopId = l1iIilI[1], l1iIilI = l1iIilI[0]);
  const l11IIii = {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": I1IiI1ii.match(/https?:\/\/([^/]+)/)[1],
        "Origin": I1IiI1ii,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": I1IiI1ii + "/wxAddress/save",
        "Cookie": ll11l1l,
        "User-Agent": li1I1ii
      },
      "body": "venderId=" + l1iIilI + "&pin=" + (I1IiI1ii.includes("cjhy") ? encodeURIComponent(encodeURIComponent(i1IiIli)) : encodeURIComponent(i1IiIli)) + "&activityId=" + ilI11Ill + "&actType=" + Iilllll1 + "&prizeName=" + encodeURIComponent(i1i11i11) + "&receiver=" + encodeURIComponent(ililil1i) + "&phone=" + iIi11I1 + "&province=" + encodeURIComponent(iIilll1l) + "&city=" + encodeURIComponent(iiIlilil) + "&county=" + encodeURIComponent(Il1I1ilI) + "&areaCode=" + l1i1lIii + "&address=" + encodeURIComponent(IIlI11I) + "&generateId=" + il11i1I + "&postalCode=" + I1111l1i,
      "timeout": 30000
    },
    lliIl11I = 5;
  let l1lIiIIi = 0,
    liIillII = null;
  while (l1lIiIIi < lliIl11I) {
    const l1Iill = await liIii1I1.post(I1IiI1ii + "/wxAddress/save", l11IIii).catch(async ii1llIii => {
      if (ii1llIii?.["response"]) {
        ii1llIii = ii1llIii.response;
        if (typeof ii1llIii === "string" && ii1llIii.includes("Timeout awaiting 'request'")) liIillII = "请求超时，请检查网络重试";else {
          const ili1ilIl = l1Iill?.["statusCode"];
          if (ili1ilIl) {
            if ([403, 493].includes(ili1ilIl)) liIillII = "请求失败，IP被限制（Response code " + ili1ilIl + "）";else [400, 404].includes(ili1ilIl) ? liIillII = "请求配置参数错误，请联系开发者进行反馈（Response code " + ili1ilIl + "）" : liIillII = "请求失败（Response code " + ili1ilIl + "）";
          } else liIillII = "API请求失败 " + (ii1llIii.message || ii1llIii);
        }
      } else {
        if (ii1llIii?.["response"]?.["body"]) liIillII = "请求失败 " + ii1llIii.response.body + " ";else {
          liIillII = "请求失败 " + (ii1llIii || "") + " ";
        }
      }
      l1lIiIIi++;
    });
    if (l1Iill && typeof l1Iill === "object") {
      if (l1Iill.body) try {
        const IIIiI11l = JSON.parse(l1Iill.body);
        if (IIIiI11l && IIIiI11l.result) return console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (Il1III + 1) + "套收货地址信息\n联系信息：" + ililil1i + " (" + iIi11I1.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), true;else {
          if (l1lIiIIi === 0 && shopId) l11IIii.body = "venderId=" + shopId + "&pin=" + (I1IiI1ii.includes("cjhy") ? encodeURIComponent(encodeURIComponent(i1IiIli)) : encodeURIComponent(i1IiIli)) + "&activityId=" + ilI11Ill + "&actType=" + Iilllll1 + "&prizeName=" + encodeURIComponent(i1i11i11) + "&receiver=" + encodeURIComponent(ililil1i) + "&phone=" + iIi11I1 + "&province=" + encodeURIComponent(iIilll1l) + "&city=" + encodeURIComponent(iiIlilil) + "&county=" + encodeURIComponent(Il1I1ilI) + "&areaCode=" + l1i1lIii + "&address=" + encodeURIComponent(IIlI11I) + "&generateId=" + il11i1I + "&postalCode=" + I1111l1i, l1lIiIIi++;else return console.log("🚫 保存收货地址失败 ➜ " + (IIIiI11l.errorMessage || JSON.stringify(l1Iill))), false;
        }
      } catch (IIIiiili) {
        return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (IIIiiili.message || IIIiiili)), false;
      } else {
        liIillII = "请求失败，无响应数据";
        l1lIiIIi++;
      }
    }
  }
  if (l1lIiIIi >= lliIl11I) {
    console.log("🚫 保存收货地址异常 ➜ " + liIillII);
  }
  return false;
}
async function l1ll111I(IIlliil) {
  const {
      baseUrl: iiIlII1I,
      cookie: llIIliI1,
      ua: IlliI1II,
      token: Il11il1l,
      prizeName: Il1lI1I,
      orderCode: iiilllIl
    } = IIlliil,
    iiliiI11 = process.env.WX_LOREAL_ADDRESS ? process.env.WX_LOREAL_ADDRESS : "",
    ii111ii = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : process.env.WX_LOREAL_ADDRESS_BLOCK ? process.env.WX_LOREAL_ADDRESS_BLOCK : "";
  if (iiliiI11 === "") return false;
  const i1ili1li = iiliiI11.split("|"),
    lIiIl1ii = Math.floor(Math.random() * i1ili1li.length);
  if (i1ili1li[lIiIl1ii] === "") {
    return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  }
  const [I1lIiIi1, Il1IilI, i1llIlIi, lIill1II, lIl1Illi, i11iIIIl] = i1ili1li[lIiIl1ii].split("@");
  for (let il11lII = 0; il11lII < 6; il11lII++) {
    if (i1ili1li[il11lII] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  if (ii111ii !== "") {
    const l1iI1li1 = ii111ii.split("@");
    if (l1iI1li1.some(i1ilIIiI => Il1lI1I.includes(i1ilIIiI))) {
      return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
    }
  }
  const li1i1ii = iiIlII1I.match(/https?:\/\/([^/]+)/)[1],
    i1iiI1I = {
      "realName": I1lIiIi1,
      "mobile": Il1IilI,
      "address": i11iIIIl,
      "orderCode": iiilllIl,
      "province": i1llIlIi,
      "city": lIill1II,
      "county": lIl1Illi
    };
  let iI111ll = false;
  try {
    const iI1lllll = await liIii1I1.post(iiIlII1I + "/prod/cc/interactsaas/api/my/prize/update", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": li1i1ii,
        "Origin": iiIlII1I,
        "Content-Type": "application/json;charset=UTF-8",
        "Referer": iiIlII1I + "/prod/cc/interactsaas/api/my/prize/update",
        "token": Il11il1l,
        "Cookie": llIIliI1,
        "User-Agent": IlliI1II
      },
      "json": i1iiI1I
    });
    if (iI1lllll && iI1lllll.resp_code === 0) {
      console.log("\n已自动提交收货地址 ✅\n");
      console.log("登记模板：采用第" + (lIiIl1ii + 1) + "套收货地址信息（随机抽取）");
      console.log("联系信息：" + I1lIiIi1 + " (" + Il1IilI.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）");
      console.log("");
      iI111ll = true;
    } else console.log("🚫 保存收货地址失败 ➜ " + (iI1lllll.resp_msg || JSON.stringify(iI1lllll)));
  } catch (li1iii11) {
    console.log("🚫 保存收货地址异常 ➜ " + li1iii11);
  }
  return iI111ll;
}
async function i1ii11l1(liI1I1i, l1l1iil, i11iiIii, lIii1Il, i1l1ilII, iii11IlI, i1Il11, iliIi11, ilI1Ii1I) {
  const iIlIll11 = process.env.WX_ADDRESS || "",
    ii111lIl = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
  let illi1lIl = [];
  if (iIlIll11 != "") illi1lIl = iIlIll11.split("|");else {
    return false;
  }
  var IIiI1i1I = Math.floor(Math.random() * illi1lIl.length);
  if (illi1lIl[IIiI1i1I] == "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;else illi1lIl = illi1lIl[IIiI1i1I];
  illi1lIl = illi1lIl.split("@");
  if (illi1lIl.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  for (let il1111I1 = 0; il1111I1 < 7; il1111I1++) {
    if (illi1lIl[il1111I1] == "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  const il1I1lII = illi1lIl[0],
    lIIiI = illi1lIl[1],
    lI1lii1l = illi1lIl[2],
    li11lII = illi1lIl[3],
    l1III1iI = illi1lIl[4],
    liII1iIi = illi1lIl[5],
    IiI1Ili = illi1lIl[6],
    l1ilil1 = illi1lIl[7];
  if (ii111lIl != "") {
    let IIili1li = ii111lIl.split("@"),
      Ii1llIi = false;
    for (let Iii1I11l of IIili1li) {
      if (iliIi11.includes(Iii1I11l)) {
        console.log("\n🚫 触发（" + Iii1I11l + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
        Ii1llIi = true;
        break;
      }
    }
    if (Ii1llIi) return false;
  }
  const ill1l111 = liI1I1i.includes("cjhy") ? encodeURIComponent(encodeURIComponent(i1Il11)) : encodeURIComponent(i1Il11),
    l1Il111I = liI1I1i.match(/https?:\/\/([^/]+)/)[1],
    IllilI1l = "venderId=" + iii11IlI + "&pin=" + ill1l111 + "&activityId=" + lIii1Il + "&actType=" + i1l1ilII + "&prizeName=" + encodeURIComponent(iliIi11) + "&receiver=" + encodeURIComponent(il1I1lII) + "&phone=" + lIIiI + "&province=" + encodeURIComponent(lI1lii1l) + "&city=" + encodeURIComponent(li11lII) + "&county=" + encodeURIComponent(l1III1iI) + "&areaCode=" + IiI1Ili + "&address=" + encodeURIComponent(liII1iIi) + "&generateId=" + ilI1Ii1I + "&postalCode=" + l1ilil1;
  let iIi1l11I = false;
  try {
    let i1i1I1II = await liIii1I1.post(liI1I1i + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": l1Il111I,
        "Origin": liI1I1i,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": liI1I1i + "/wxAddress/save",
        "Cookie": l1l1iil,
        "User-Agent": i11iiIii
      },
      "body": IllilI1l
    }).json().catch(llliiI1I => {
      console.error("🚫 wxSavePrize API请求失败 ➜ (" + llliiI1I.response.statusCode + " " + llliiI1I.response.statusMessage + ")\n");
    });
    if (i1i1I1II && i1i1I1II.result) {
      console.log("\n已自动提交收货地址 ✅\n");
      console.log("登记模板：采用第" + (IIiI1i1I + 1) + "套收货地址信息（随机抽取）");
      console.log("联系信息：" + il1I1lII + " (" + lIIiI.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）");
      console.log("");
      iIi1l11I = true;
    } else i1i1I1II.errorMessage ? console.log("🚫 保存收货地址失败 ➜ " + i1i1I1II.errorMessage) : console.log("🚫 保存收货地址失败 ➜ " + JSON.stringify(i1i1I1II)), console.log("");
  } catch (iiI1lii) {
    console.log("🚫 保存收货地址异常 ➜ " + iiI1lii);
  }
  return iIi1l11I;
}
module.exports = {
  "wxSavePrize": i1ii11l1,
  "wuxian_savePrize": IlIl1iil,
  "loreal_savePrize": l1ll111I
};