/*
new Env('getToken');

变量：
JD_TOKEN_INTERVAL   //获取接口403延迟等待时长（正整数），默认延迟 30s=30000ms
JD_NEWTOKEN_INTERVAL   //获取接口成功延迟等待时长（正整数），默认延迟 0s
JD_CACHE_INTERVAL   //缓存TOKEN时长（正整数），默认缓存 25 分钟
JD_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_PROXY_TUNNRL      // 代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
根据自行需要设定，缓存文件数据通用，不再区分域名
*/

const l1ll11 = require("got"),
  l1II1lI = require("./cache/index"),
  lll1Iiil = require("./krgetSign"),
  lli1iIII = process.env.JD_CACHE_INTERVAL || "25";
let IiiiIi1 = parseInt(lli1iIII) * 60 * 1000;
const iiIllIlI = new l1II1lI(IiiiIi1, __dirname + "/cache/token.json"),
  iiIili1l = ["http://api.nolanstore.cc/sign", "http://kr.kingran.cf/sign"],
  I1lllI1l = iiIili1l[Ill11l1i(0, iiIili1l.length)],
  IiIliill = process.env.JD_SIGN_KRAPI || "",
  iIiI1I1I = process.env.JD_PROXY_OPEN === "true",
  i1l11l11 = process.env.JD_PROXY_TUNNRL || "",
  IIll11il = process.env.JD_TOKEN_INTERVAL || "30",
  ilI1Iii1 = process.env.JD_NEWTOKEN_INTERVAL || "0";
let iIiiiIII = false;
iIiI1I1I ? (iIiiiIII = true, require("global-agent/bootstrap"), global.GLOBAL_AGENT.HTTP_PROXY = i1l11l11 || "", i1l11l11 == "" ? (console.log("⚠ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 请知晓代理地址仅支持代理池模式(auto-proxy-pool)"), console.log("⚠ 变量：export JD_PROXY_TUNNRL='http://ip:port' 不填直连\n")) : (console.log("☑️ 代理已开启，建议设置Token等待时间为 0 秒"), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n"))) : (console.log("⚠ 检测当前模式未开启代理，默认直连运行"), console.log("⚠ 开启代理变量：export JD_PROXY_OPEN='true' \n"));
console.log("☑️ Token失败等待 " + IIll11il + " 秒 | 成功等待 " + ilI1Iii1 + " 秒 | 缓存时间 " + lli1iIII + " 分钟\n");
function iIl11llI(Iiill11l = "", liii1ii) {
  let I1lilI11 = liii1ii.exec(Iiill11l);
  if (I1lilI11 && I1lilI11.length > 0) return I1lilI11[0].trim();
  return "";
}
function ll1ilI(IIIilli, illlIil1) {
  let l1lIl1il = new Date().getHours();
  if (l1lIl1il >= 0 && l1lIl1il <= 23) return IIIilli;
  return IIIilli + "_" + illlIil1;
}
function Ill11l1i(l1lillil, ii11IlI1) {
  return Math.floor(Math.random() * (ii11IlI1 - l1lillil)) + l1lillil;
}
async function IlllllI1(iiIi1i1i, Ilil1il1) {
  async function l11i11lI(l111IiII) {
    return new Promise(iiI1il1I => setTimeout(iiI1il1I, l111IiII));
  }
  let iiIII1lI = "",
    iIlilIil = iIl11llI(iiIi1i1i, /(?<=pt_pin=)([^;]+)/);
  if (iIlilIil) {
    let I11iii1l = ll1ilI(iIlilIil, Ilil1il1);
    iiIII1lI = iiIllIlI.get(I11iii1l) || "";
    if (iiIII1lI === "") {
      let il11l1li = await lll1Iiil("isvObfuscator", {
        "url": Ilil1il1,
        "id": ""
      });
      if (il11l1li) try {
        if (IiIliill) {
          body = il11l1li.data.convertUrl;
        } else {
          body = il11l1li.body;
        }
        const li1I1ili = await l1ll11.post("https://api.m.jd.com/client.action?functionId=isvObfuscator", {
          "headers": {
            "Host": "api.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": iiIi1i1i,
            "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
            "Accept-Language": "zh-Hans-CN;q=1",
            "Accept-Encoding": "gzip, deflate, br"
          },
          "body": body,
          "timeout": 30000
        }).catch(async liIi1li1 => {
          if (liIi1li1.response) {
            console.log("🚫 getToken API请求失败 ➜ Response code " + (liIi1li1.response.statusCode || "") + " (" + (liIi1li1.response.statusMessage || "") + ")");
            if (liIi1li1.response.statusCode == 403) {
              let li1ilIl1 = parseInt(IIll11il) * 1000;
              await l11i11lI(li1ilIl1);
            }
          } else {
            if (liIi1li1.response.body) {
              console.log("🚫 getToken API请求失败\n" + (liIi1li1.response.body || "") + "\n");
            } else console.log("🚫 getToken API请求失败\n" + (liIi1li1 || "") + "\n");
          }
        });
        if (li1I1ili && typeof li1I1ili === "object") {
          if (li1I1ili.body) {
            let lI1IliI1 = JSON.parse(li1I1ili.body);
            if (lI1IliI1.code === "0") {
              iiIII1lI = lI1IliI1.token;
              iiIllIlI.put(I11iii1l, iiIII1lI, IiiiIi1);
              let lIII1IIi = parseInt(ilI1Iii1) * 1000;
              await l11i11lI(lIII1IIi);
            } else {
              if (lI1IliI1.code === "3" && lI1IliI1.errcode === 264) console.log("🚫 getToken API请求失败 ➜ 账号无效");else {
                console.log("🚫 getToken API接口返回异常 ➜ " + JSON.stringify(lI1IliI1));
              }
            }
          } else console.log("🚫 getToken API请求失败 ➜ 接口返回为空");
        }
      } catch (ll1lII1l) {
        console.log("🚫 getToken API在处理请求时遇到了错误");
        console.log(ll1lII1l);
      } else console.log("🚫 getToken API请求错误 ➜ 签名获取失败");
    } else console.log("已读取本地缓存token\n");
  }
  return iiIII1lI;
}
module.exports = IlllllI1;