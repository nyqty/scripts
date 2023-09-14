/*
new Env('getSign');
*/

const lIiIlIII = require("got"),
  iiIi1I = process.env.JD_SIGN_KRAPI || "";
iiIi1I ? (console.log("⚠ 您当前使用自定义Sign服务 ⚠"), console.log("✅ : " + iiIi1I + "\n")) : console.log("⚠ 您当前使用内置Sign服务\n");
function llilliI1(I11IIIii, li11IiI) {
  return Math.floor(Math.random() * (li11IiI - I11IIIii)) + I11IIIii;
}
async function iIl1(IiI1IIII, liiIIii1) {
  let liIi1ilI = "";
  if (iiIi1I) {
    let llIIIi1l = "body=" + JSON.stringify(liiIIii1) + "&functionId=" + IiI1IIII;
    liIi1ilI = lIiIlIII.post(iiIi1I, {
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      "body": llIIIi1l,
      "retry": 1,
      "timeout": 10000
    }).json().catch(I1iI1lll => {
      console.log(I1iI1lll.message);
      console.error("🚫 getSign API请求失败");
    });
  } else {
    const I1IIillI = ["http://api.nolanstore.cc/sign", "http://kr.kingran.cf/sign"],
      ilii1 = I1IIillI[llilliI1(0, I1IIillI.length)],
      iilIIlII = ilii1;
    let iilIi1I1 = {
      "fn": IiI1IIII,
      "body": JSON.stringify(liiIIii1)
    };
    liIi1ilI = lIiIlIII.post(iilIIlII, {
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(iilIi1I1),
      "retry": 1,
      "timeout": 10000
    }).json().catch(Illl1Il1 => {
      console.log(Illl1Il1.message);
      console.error("🚫 getSign API请求失败");
    });
  }
  return liIi1ilI;
}
module.exports = iIl1;
