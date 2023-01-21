
/*
0 0 * * * jd_festivalhb_cash.js
默认提现1元，可多次提现
其他金额id，自己改id
c47654fb387a2b2d84ffc19f16b52690  20元
6e53192e506af5d1fe5718867ee0ba1c  0.5元
e55648727819d44b09a414aa99c10b48  0.38元
559967f159d4fbd39d58bbd690875fc8  0.3元
*/
let id='a3595d5c3b107a912ba368b3ebc70ffa';//一元
const Env=require('./utils/Env.js');
const $ = new Env('团圆红包提现');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonfomat($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.UA = require('./USER_AGENTS').UARAM();
			console.log(`\n******开始【账号${$.index}】${$.nickName || $.UserName}*********\n`);
            await cashout(id);
            await $.wait(2000)
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })



async function cashout(id) {
    let opt = {
        url: `https://api.m.jd.com/api?functionId=jxPrmtExchange_exchange&appid=cs_h5&t=1674029812147&channel=jxh5&cv=1.2.5&clientVersion=1.2.5&client=jxh5&uuid=7296248594457&cthr=1&loginType=2&h5st=20230118161652120%3Bzmngn956qqctu1q5%3Baf89e%3Btk02wf6811d3118nI9e6wfteqkATwcZtrxdhtYq8EuqdvTefye%2B3wdx4jV47dTyh5p9w0QJhy0jW3C2SNRNKIHgAei7z%3B4e8eae376746a1201de5fe83166665063aabf725e5a47eb18c9ad8f412179c59%3B400%3B1674029812120%3B234d597e4bbee03fed04c11bddbceda56c28b9f38e03d90d5e300b95750f47df4206442e06e95f59b5a61da07c5731f7a4eeffa21ea3449ebc3671be48a9d1f080ef01c140a6125f7df6c6c59a60547797665043f6ea4cf8b0b02ffb43e617a14efac1e782764db638a957155545faa6c99369f42a61c15a88bd3b4b3a94169fe9e24db55876ee7cee9079e3e4160abf4e909fbd5011ef7b3c57700661a42d88b63fe431f1eba3032cf7883bac784312&body=%7B%22bizCode%22%3A%22festivalhb%22%2C%22ruleId%22%3A%22${id}%22%2C%22sceneval%22%3A2%2C%22buid%22%3A325%2C%22appCode%22%3A%22ms2362fc9e%22%2C%22time%22%3A1674029812147%2C%22signStr%22%3A%2215a5143f4b6d60a74d59cda5b98bc0c5%22%7D`,
        headers: {
            'Host': 'api.m.jd.com',
            'Origin': 'https://wqs.jd.com',
            //'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': $.UA,
            'Cookie': cookie
        }
    }
    return new Promise(async (resolve) => {
        $.get(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data.ret == 0) {
                        console.log('提现成功！');
                    } else {
                        console.log(data.msg);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}


function TotalBean() {
    return new Promise((resolve) => {
        const options = {
            url: 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
            headers: {
                "Cookie": cookie,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA,
            },
            timeout: 10000
        }
        $.get(options, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.islogin === "1") {
                    } else if (data.islogin === "0") {
                        $.isLogin = false;
                    }
                }
            } catch (e) {
                console.log(e);
            }
            finally {
                resolve();
            }
        });
    });
}
function showMsg() {
    return new Promise(resolve => {
        if (!jdNotify) {
            $.msg($.name, '', `${message}`);
        } else {
            $.log(`京东账号${$.index}${$.nickName}\n${message}`);
        }
        resolve()
    })
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
function jsonfomat(str) {
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