/*
一次性脚本
6 8 * * * jd_supergz.js, tag=频道关注
 */
const Env=require('./utils/Env.js');
const $ = new Env('频道关注');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;//是否关闭通知，false打开通知推送，true关闭通知推送
let cookiesArr = [], cookie = '', message;

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
    };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }

            await userFollow2();
            await $.wait(parseInt(Math.random()*2500+200, 10));

        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function userFollow2() {
    return new Promise(resolve => {
        $.post({
            url: `https://api.m.jd.com//client.action?functionId=userFollow&avifSupport=1&body=%7B%22businessId%22%3A%221%22%2C%22type%22%3A%221%22%2C%22themeId%22%3A%22276%22%2C%22uuid%22%3A%22%22%7D&build=168210&client=apple&clientVersion=11.1.4&d_brand=apple&d_model=iPhone8%2C2&ef=1&eid=eidI994b812123s1PRhmb/36RNW2uQJarJ271z0YZ%2Bv4APcrj75ymDe%2B0Z6%2BnTWSLykYTnpR8p/NwxporPY8JdbEwVIoH6%2BtJTHm/uL08tuO6g10hmNP&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJS0CseyCtK4%22%2C%22osVersion%22%3A%22CJGkEK%3D%3D%22%2C%22openudid%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22area%22%3A%22DP81CNu1CP81CNu1D18m%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1668304068%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=127&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=77b4a0ffc4547fcec9ae7d8b173e28b9&st=1668304108764&sv=111&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJBVHeEQpVPVaACI52LjwwK7NzBm1TrLgHzTfMu63%2Bkq2%2BDqQ%2Bhw6Yc/VFw5az56oDAdMImMRkRbTj6LZCh1cB53RDbOymHfXUmOHV03m5mncJEiFV0SuPUX/wyY2OgDMkMsdThcycWNu2cXGnPSYJzNODw3bUV8yGgGXvxH078XxSeVpKR/eRyg%3D%3D`,
            body: 'body=%7B%22businessId%22%3A%221%22%2C%22themeId%22%3A%22858%22%2C%22type%22%3A%221%22%7D&',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookie,
                'Host': 'api.m.jd.com',
                'User-Agent': 'okhttp/3.12.1;jdmall;android;version/10.1.3;build/90017;',
            }
        }, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.toStr(err)}`)
                    console.log(`userFollow API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data && data.activityType == "2") {
                        console.log(data.resultMsg);
                        //  console.log(data);
                    } else {
                        console.log("你已经关注过啦");
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if (data['retcode'] === 0) {
                            $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                        } else {
                            $.nickName = $.UserName
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
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

function jsonParse(str) {
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