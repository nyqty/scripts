/*
new Env('getToken');

变量：
JD_TOKEN_INTERVAL   //获取接口403延迟等待时长（正整数），默认延迟 30s=30000ms
JD_NEWTOKEN_INTERVAL   //获取接口成功延迟等待时长（正整数），默认延迟 0s
JD_CACHE_INTERVAL   //缓存TOKEN时长（正整数），默认缓存 25 分钟
JD_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_PROXY_TUNNRL      // 代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改
JD_TOKEN_CUSTOM_CACHE      // 定义默认缓存文件路径 此文件默认存储在仓库 `function/cache` 目录下
根据自行需要设定，缓存文件数据通用，不再区分域名
*/

const lliII111 = require("got"),
  lIi1iI = require("./krgetSign"),
  I1lIIII1 = process.env.JD_CACHE_INTERVAL || "25";
let lliIIll = parseInt(I1lIIII1) * 60 * 1000;
const lI111i11 = require("./cache/index"),
  liIiiiil = new lI111i11(lliIIll, process.env.JD_TOKEN_CUSTOM_CACHE || __dirname + "/cache/token.json"),
  llilIll = ["http://api.nolanstore.cc/sign", "http://kr.kingran.cf/sign"],
  I1iI11l1 = llilIll[Iil1l1ll(0, llilIll.length)],
  I11llIIl = process.env.JD_SIGN_KRAPI || "",
  I1iI1Ii1 = process.env.JD_PROXY_OPEN === "true",
  iii1I1l = process.env.JD_PROXY_TUNNRL || "",
  il1ll111 = process.env.JD_NO_PROXY || "127.0.0.1,*.baidu.com",
  IIl1il = process.env.JD_TOKEN_INTERVAL || "30",
  llii111i = process.env.JD_NEWTOKEN_INTERVAL || "0";
let IilIi11l = false;
if (I1iI1Ii1) {
  IilIi11l = true;
  try {
    require("global-agent/bootstrap");
    global.GLOBAL_AGENT.HTTP_PROXY = iii1I1l || "";
    global.GLOBAL_AGENT.NO_PROXY = "*.kingran.cf," + il1ll111;
    iii1I1l == "" ? (console.log("⚠ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 请知晓代理地址仅支持代理池模式(auto-proxy-pool)"), console.log("⚠ 变量：export JD_PROXY_TUNNRL='http://ip:port' 不填直连\n")) : (console.log("☑️ 代理已开启，建议设置Token等待时间为 0 秒"), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n"));
  } catch (i1iIii1I) {
    console.log("请安装global-agent依赖，才能启用代理！\n");
  }
} else console.log("⚠ 检测当前模式未开启代理，默认直连运行"), console.log("⚠ 开启代理变量：export JD_PROXY_OPEN='true' \n");
console.log("☑️ Token失败等待 " + IIl1il + " 秒 | 成功等待 " + llii111i + " 秒 | 缓存时间 " + I1lIIII1 + " 分钟\n");
const lIIIlI1l = process.env.JD_TOKEN_REDIS_CACHE_URL || "",
  lIIiIli1 = process.env.JD_TOKEN_REDIS_CACHE_KEY || "",
  i1iIl1Ii = !(process.env.JD_TOKEN_REDIS_CACHE_SUBMIT === "false"),
  II1Ilii1 = /<pt_pin>/.test(lIIiIli1);
let lIl1Ii1 = null;
if (lIIIlI1l) {
  let l1iIliii = null;
  try {
    l1iIliii = require("redis");
  } catch (IIlIIiIl) {
    console.log("❌ getToken Redis模块加载失败 ➜ " + IIlIIiIl.message);
  }
  if (l1iIliii) try {
    lIl1Ii1 = l1iIliii.createClient({
      "url": lIIIlI1l
    });
    lIl1Ii1.on("ready", () => {});
    lIl1Ii1.on("error", il1iIill => {
      lIl1Ii1 = null;
    });
    lIl1Ii1.connect(ii1ililI => {
      if (ii1ililI) lIl1Ii1 = null;else {}
    });
  } catch (lii1IliI) {}
}
function illlll(iIlIIII = "", iil11i1i) {
  let l1l1IIli = iil11i1i.exec(iIlIIII);
  if (l1l1IIli && l1l1IIli.length > 0) return l1l1IIli[0].trim();
  return "";
}
function lllliill(iil1l1ll, llilll1) {
  let I11llil1 = new Date().getHours();
  if (I11llil1 >= 0 && I11llil1 <= 23) return iil1l1ll;
  return iil1l1ll + "_" + llilll1;
}
function Iil1l1ll(lIi1ilIl, Il1il1II) {
  return Math.floor(Math.random() * (Il1il1II - lIi1ilIl)) + lIi1ilIl;
}
async function IiiiilI1(liIl1i1i, ll1iiil) {
  async function l1IIiI1I(i1IiIil) {
    return new Promise(I11IlliI => setTimeout(I11IlliI, i1IiIil));
  }
  let I1iI1lI = "",
    iIIi111 = illlll(liIl1i1i, /(?<=pt_pin=)([^;]+)/);
  if (iIIi111) {
    let iI1i1ii = lllliill(iIIi111, ll1iiil);
    I1iI1lI = liIiiiil.get(iI1i1ii) || "";
    if (I1iI1lI) {
      return console.log("已读取本地缓存token\n"), I1iI1lI;
    }
    if (lIl1Ii1) {
      const l1IIIil = encodeURIComponent(II1Ilii1 ? lIIiIli1.replace(/<pt_pin>/g, iIIi111) : "" + lIIiIli1 + iIIi111);
      I1iI1lI = (await lIl1Ii1.get(l1IIIil)) || "";
      if (I1iI1lI) return I1iI1lI;
    }
    if (I1iI1lI === "") {
      let iil1iI11 = await lIi1iI("isvObfuscator", {
        "url": ll1iiil,
        "id": ""
      });
      if (iil1iI11) try {
        if (I11llIIl) body = iil1iI11?.["data"]?.["convertUrl"];else {
          body = iil1iI11?.["body"];
        }
        const IIiI1li = await lliII111.post("https://api.m.jd.com/client.action?functionId=isvObfuscator", {
          "headers": {
            "Host": "api.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": liIl1i1i,
            "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
            "Accept-Language": "zh-Hans-CN;q=1",
            "Accept-Encoding": "gzip, deflate, br"
          },
          "body": body,
          "timeout": 30000
        }).catch(async I1illil => {
          if (I1illil?.["response"]) {
            console.log("🚫 getToken API请求失败 ➜ Response code " + (I1illil.response.statusCode || "") + " (" + (I1illil.response.statusMessage || "") + ")");
            if (I1illil?.["response"]?.["statusCode"] == 403) {
              let IiI1Ilii = parseInt(IIl1il) * 1000;
              await l1IIiI1I(IiI1Ilii);
            }
          } else I1illil?.["response"]?.["body"] ? console.log("🚫 getToken API请求失败\n" + (I1illil?.["response"]?.["body"] || "") + "\n") : console.log("🚫 getToken API请求失败\n" + (I1illil || "") + "\n");
        });
        if (IIiI1li && typeof IIiI1li === "object") {
          if (IIiI1li?.["body"]) {
            let IiIl1IIi = JSON.parse(IIiI1li?.["body"]);
            if (IiIl1IIi?.["code"] === "0") {
              I1iI1lI = IiIl1IIi?.["token"];
              liIiiiil.put(iI1i1ii, I1iI1lI, lliIIll);
              if (lIl1Ii1 && i1iIl1Ii) {
                const iIIii1iI = encodeURIComponent(II1Ilii1 ? lIIiIli1.replace(/<pt_pin>/g, iIIi111) : "" + lIIiIli1 + iIIi111),
                  iIl1Ilii = I1iI1lI,
                  lllI1II = Math.floor((Date.now() + lliIIll) / 1000);
                try {
                  await lIl1Ii1.set(iIIii1iI, iIl1Ilii);
                  await lIl1Ii1.EXPIREAT(iIIii1iI, lllI1II);
                  console.log("☑️ getToken Redis缓存成功\n");
                } catch (I1IiIIii) {
                  console.log("❌ getToken Redis缓存失败 ➜ " + (I1IiIIii.message || I1IiIIii));
                }
              }
              let llIl1lI = parseInt(llii111i) * 1000;
              await l1IIiI1I(llIl1lI);
            } else IiIl1IIi?.["code"] === "3" && IiIl1IIi?.["errcode"] === 264 ? console.log("🚫 getToken API请求失败 ➜ 账号无效") : console.log("🚫 getToken API接口返回异常 ➜ " + JSON.stringify(IiIl1IIi));
          } else console.log("🚫 getToken API请求失败 ➜ 接口返回为空");
        }
      } catch (iiI1ili) {
        console.log("🚫 getToken API在处理请求时遇到了错误");
        console.log(iiI1ili);
      } else console.log("🚫 getToken API请求错误 ➜ 签名获取失败");
    }
  }
  return I1iI1lI;
}
module.exports = IiiiilI1;