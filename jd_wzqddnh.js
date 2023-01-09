/*
我最期待的年货
https://prodev.m.jd.com/mall/active/8JTz6MqgT1i2GfuESQnFttBGwnZ/index.html
11 11 11 11 ** jd_nhjs.js, tag=我最期待的年货, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env("我最期待的年货");
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = "",
    message = "";
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
    cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = "jdapp;android;11.1.2;;;Mozilla/5.0 (Linux; Android 8.1.0; MI 8 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36";
            // await TotalBean();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue;
            }
            await Main();
            await $.wait(2000);
        }
    }
})()
    .catch((e) => {
        $.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "");
    })
    .finally(() => {
        $.done();
    });

async function Main() {
    try {
        await vote("A", "100045888699");
        await $.wait(500);
        await vote("B", "100016393624");
        await $.wait(500);
        await vote("C", "2245046");
        await $.wait(500);
        await vote("D", "100011483893");
        await $.wait(500);
        await vote("E", "100042235333");
        await $.wait(500);
    } catch (e) {
        $.logErr(e);
    }
}

async function vote(type, skuId) {
    return new Promise(async (resolve) => {
        const options = {
            url: `https://mgold.jd.com/api/vote?type=${type}&skuId=${skuId}`,
            headers: {
                accept: "*/*",
                "content-type": "application/json",
                Referer: "https://prodev.m.jd.com/mall/active/8JTz6MqgT1i2GfuESQnFttBGwnZ/index.html",
                origin: "https://prodev.m.jd.com",
                "User-Agent": $.UA,
                "accept-language": "zh-Hans-CN;q=1",
                cookie: cookie,
            },
        };
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if (safeGet(data)) {
                        data = $.toObj(data);
                        if (data) {
                            if (data.code === 200) {
                                if (data.data.sendBean) {
                                    console.log(`获得${data.data.amount}京豆`);
                                } else if (data.data.sendCoupon) {
                                    console.log("获得优惠券");
                                } else {
                                    console.log(data.data);
                                }
                            } else {
                                console.log(data.msg);
                            }
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        });
    });
}

function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}
function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}