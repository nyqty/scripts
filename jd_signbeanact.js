/*
APP首页-领京豆
金融双签领取
21 3 * * * jd_signbeanact.js
*/


const Env=require('./utils/Env.js');
const $ = new Env('领京豆签到');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonformat($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const ua = require('./USER_AGENTS');
const jdVersion = '10.1.2'


!(async () => {
    if (!cookiesArr[0]) {
        $.msg('【京东账号一】宠汪汪积分兑换奖品失败', '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return
    }

    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            $.cookie = cookiesArr[i] + '';
            $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.bean = 0
            iphoneVersion = [Math.ceil(Math.random() * 2 + 12), Math.ceil(Math.random() * 4)]
            UA = `jdapp;iPhone;${jdVersion};${Math.ceil(Math.random() * 2 + 12)}.${Math.ceil(Math.random() * 4)};${randomString(40)};network/wifi;model/iPhone12,1;addressid/0;appBuild/167802;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS ${iphoneVersion[0]}_${iphoneVersion[1]} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
            UUID = randomString(40);
            UA =ua.UARAM();
            console.log(`\n*****开始【京东账号${$.index}】${$.UserName}****\n`);
            await run();
            await $.wait(5000);
        }
    }

})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    }).finally(() => {
        $.done();
    })

async function run() {
    try {
        //await takePostRequest('beanTaskList')
        //await $.wait(500);
        await takePostRequest('signBeanAct')
        await $.wait(500);
        //await getdouble();
    } catch (e) {
        console.log(e);
    }
}


async function takePostRequest(type) {
    let body = ``;
    let myRequest = ``;
    switch (type) {
        case 'beanTaskList':
            body = `{"viewChannel":"AppHome"}`;
            myRequest = await getGetRequest(`beanTaskList`, escape(body));
            break;
        case 'signBeanAct':
            body = `{"fp":"-1","shshshfp":"-1","shshshfpa":"-1","referUrl":"-1","userAgent":"-1","jda":"-1","rnVersion":"3.9"}`;
            myRequest = await getGetRequest(`signBeanAct`, encodeURIComponent(body));
            break;
        default:
            console.log(`错误${type}`);
    }
    if (myRequest) {
        return new Promise(async resolve => {
            $.get(myRequest, (err, resp, data) => {
                try {
                    dealReturn(type, data);
                } catch (e) {
                    $.logErr(e, resp)
                } finally {
                    resolve();
                }
            })
        })
    }
}

async function dealReturn(type, res) {
    try {
        data = JSON.parse(res);
    } catch (e) {
        console.log(`返回异常：${res}`);
        return;
    }
    switch (type) {
        case 'beanTaskList':
            if (data.code == 0 && data.data) {
                console.log(`当前等级:${data.data.curLevel || 0} 下一级可领取:${data.data.nextLevelBeanNum || 0}京豆`)
                $.taskList = data.data.taskInfos && data.data.taskInfos || [];
                $.viewAppHome = data.data.viewAppHome && data.data.viewAppHome || {};
            } else if (data.data && data.data.bizMsg) {
                console.log(data.data.bizMsg);
            } else {
                console.log(res);
            }
            break;
        case 'signBeanAct':
            if (data.code == 0 && data.data) {
                if (data.data?.continuityAward?.beanAward?.beanCount) {
                    console.log(`${data.data.continuityAward.title || 0}:${data.data.continuityAward.beanAward.beanCount || 0}京豆`);
                    $.bean += Number(data.data.continuityAward.beanAward.beanCount) || 0;
                }
                else {
                    if (data.data?.dailyAward) {
                        console.log(data.data.dailyAward.title + `获得:${data.data.dailyAward.beanAward.beanCount || 0}京豆`)
                        $.bean += Number(data.data.dailyAward.beanAward.beanCount) || 0;
                    } else {
                        console.log("DEBUG1:" + JSON.stringify(data));
                    }
                }

            } else {
                console.log("DEBUG2:" + JSON.stringify(res));
            }
            break;
        default:
            console.log(`未判断的异常${type}`);
    }
}
async function getGetRequest(type, body) {
    let url = `https://api.m.jd.com/client.action?functionId=${type}&body=${body}&appid=ld&client=apple&clientVersion=${UA.split(';')[2]}&networkType=wifi&uuid=${UUID}&openudid=${UUID}`;
    const method = `GET`;
    const headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        'Cookie': $.cookie,
        "Referer": "https://h5.m.jd.com/",
        "User-Agent": UA,
    };
    return { url: url, method: method, headers: headers };
}

async function getdouble() {
    let opt = {
        url: "https://nu.jr.jd.com/gw/generic/jrm/h5/m/process",
        headers: {
            Cookie: $.cookie,
        },
        body: `reqData=${encodeURIComponent('{"actCode":"F68B2C3E71","type":"3","frontParam":{"belong":"jingdou"}}')}`
    }
    return new Promise(async (resolve) => {
        $.post(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    if (data.match(/"京豆.*"/)) {
                        const count = data.match(/\"count\":\"?(\d.*?)\"?,/)[1];
                        console.log(`双签成功：${count}京豆`)
                    } else {
                        const msg = data.match(/},\"businessMsg\":\"(\S.*)\",\"c/)[1]
                        console.log("金融双签:" + msg)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}
function jsonformat(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}

function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789", a = t.length, n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}