/*
new Env('getToken');

变量：
JD_TOKEN_INTERVAL   //获取接口403延迟等待时长（正整数），默认延迟 30s=30000ms
JD_NEWTOKEN_INTERVAL   //获取接口成功延迟等待时长（正整数），默认延迟 0s
JD_CACHE_INTERVAL   //缓存TOKEN时长（正整数），默认缓存 25 分钟
JD_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_PROXY_TUNNRL      // 代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改
根据自行需要设定，缓存文件数据通用，不再区分域名
*/

const lllllIll = require("got"),
  lII1iI1 = require("./cache/index"),
  I11illII = require("./krgetSign"),
  lii1iII1 = process.env.JD_CACHE_INTERVAL || "25";
let lilill1I = parseInt(lii1iII1) * 60 * 1000;
const IlIiilii = new lII1iI1(lilill1I, __dirname + "/cache/token.json"),
  i11lIIl1 = ["http://api.nolanstore.cc/sign", "http://kr.kingran.cf/sign"],
  iliIil = i11lIIl1[IlI1lil1(0, i11lIIl1.length)],
  Il1ili1l = process.env.JD_SIGN_KRAPI || "",
  li11l1Ii = process.env.JD_PROXY_OPEN === "true",
  lIll11I = process.env.JD_PROXY_TUNNRL || "",
  iIIlilIi = process.env.JD_NO_PROXY || "127.0.0.1,*.baidu.com",
  I11l1iI = process.env.JD_TOKEN_INTERVAL || "30",
  liii111i = process.env.JD_NEWTOKEN_INTERVAL || "0";
let l1ilii1I = false;
li11l1Ii ? (l1ilii1I = true, require("global-agent/bootstrap"), global.GLOBAL_AGENT.HTTP_PROXY = lIll11I || "", global.GLOBAL_AGENT.NO_PROXY = "*.kingran.cf," + iIIlilIi, lIll11I == "" ? (console.log("⚠ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 请知晓代理地址仅支持代理池模式(auto-proxy-pool)"), console.log("⚠ 变量：export JD_PROXY_TUNNRL='http://ip:port' 不填直连\n")) : (console.log("☑️ 代理已开启，建议设置Token等待时间为 0 秒"), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n"))) : (console.log("⚠ 检测当前模式未开启代理，默认直连运行"), console.log("⚠ 开启代理变量：export JD_PROXY_OPEN='true' \n"));
console.log("☑️ Token失败等待 " + I11l1iI + " 秒 | 成功等待 " + liii111i + " 秒 | 缓存时间 " + lii1iII1 + " 分钟\n");
function iIIl1I11(II11ii11 = "", l1II11Ii) {
  let II1IliiI = l1II11Ii.exec(II11ii11);
  if (II1IliiI && II1IliiI.length > 0) {
    return II1IliiI[0].trim();
  }
  return "";
}
function liI11(I1ilI1II, II11liII) {
  let iiilI1li = new Date().getHours();
  if (iiilI1li >= 0 && iiilI1li <= 23) {
    return I1ilI1II;
  }
  return I1ilI1II + "_" + II11liII;
}
function IlI1lil1(lIlliii1, iI1lIil) {
  return Math.floor(Math.random() * (iI1lIil - lIlliii1)) + lIlliii1;
}
async function iii1li1l(l11II1i1, lIl11l1I) {
  async function IIilIIii(lil11lII) {
    return new Promise(ii1I1IiI => setTimeout(ii1I1IiI, lil11lII));
  }
  let l1I11lI1 = "",
    I1iIlIl = iIIl1I11(l11II1i1, /(?<=pt_pin=)([^;]+)/);
  if (I1iIlIl) {
    let l1lI11 = liI11(I1iIlIl, lIl11l1I);
    l1I11lI1 = IlIiilii.get(l1lI11) || "";
    if (l1I11lI1 === "") {
      let lil1iIi1 = await I11illII("isvObfuscator", {
        "url": lIl11l1I,
        "id": ""
      });
      if (lil1iIi1) try {
        if (Il1ili1l) {
          body = lil1iIi1.data.convertUrl;
        } else body = lil1iIi1.body;
        const l1ili1il = await lllllIll.post("https://api.m.jd.com/client.action?functionId=isvObfuscator", {
          "headers": {
            "Host": "api.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": l11II1i1,
            "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
            "Accept-Language": "zh-Hans-CN;q=1",
            "Accept-Encoding": "gzip, deflate, br"
          },
          "body": body,
          "timeout": 30000
        }).catch(async I1lIiI1l => {
          if (I1lIiI1l.response) {
            console.log("🚫 getToken API请求失败 ➜ Response code " + (I1lIiI1l.response.statusCode || "") + " (" + (I1lIiI1l.response.statusMessage || "") + ")");
            if (I1lIiI1l.response.statusCode == 403) {
              let iIiiiii = parseInt(I11l1iI) * 1000;
              await IIilIIii(iIiiiii);
            }
          } else I1lIiI1l.response.body ? console.log("🚫 getToken API请求失败\n" + (I1lIiI1l.response.body || "") + "\n") : console.log("🚫 getToken API请求失败\n" + (I1lIiI1l || "") + "\n");
        });
        if (l1ili1il && typeof l1ili1il === "object") {
          if (l1ili1il.body) {
            let liiIllIi = JSON.parse(l1ili1il.body);
            if (liiIllIi.code === "0") {
              l1I11lI1 = liiIllIi.token;
              IlIiilii.put(l1lI11, l1I11lI1, lilill1I);
              let l11liII = parseInt(liii111i) * 1000;
              await IIilIIii(l11liII);
            } else {
              if (liiIllIi.code === "3" && liiIllIi.errcode === 264) console.log("🚫 getToken API请求失败 ➜ 账号无效");else {
                console.log("🚫 getToken API接口返回异常 ➜ " + JSON.stringify(liiIllIi));
              }
            }
          } else console.log("🚫 getToken API请求失败 ➜ 接口返回为空");
        }
      } catch (lIl1IIIl) {
        console.log("🚫 getToken API在处理请求时遇到了错误");
        console.log(lIl1IIIl);
      } else console.log("🚫 getToken API请求错误 ➜ 签名获取失败");
    } else console.log("已读取本地缓存token\n");
  }
  return l1I11lI1;
}
module.exports = iii1li1l;