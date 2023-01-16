
/*
3 15 * * * jd_ppdt.js
*/
const Env=require('./utils/Env.js');
const $ = new Env('超级品牌殿堂');
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
            //await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            await xxx1();
            await $.wait(500);
            await xxx2();
			await $.wait(500);
            await xxx4();			
            await $.wait(500);
            await xxx3();     
            await $.wait(2000);
			

        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })


async function xxx1() {
    let opt = {
        url: `https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1673695255269&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:1012333,%22completionFlag%22:1,%22encryptProjectId%22:%222aZfauURe2aNSkpWhRgJYi2SgSJc%22,%22encryptAssignmentId%22:%223rC2Bx2wGCSD68Vdw8cRKqcT3ECy%22,%22assignmentType%22:0,%22actionType%22:0%7D`,
        headers: {
            'Origin': 'https://prodev.m.jd.com',
            'User-Agent': $.UA,
            'Cookie': cookie
        }
    }
    return new Promise(async (resolve) => {
        $.post(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data.code == 0) {
                        if (data.data.bizCode == 0) {
                            if (data.data?.result?.rewards) {
                                if (data.data?.result?.rewards[0].awardType === 3) {
                                    console.log(` 恭喜获得 ${data.data?.result?.rewards[0].beanNum} 京豆`);
                                } else {
                                    console.log(JSON.stringify(data.data?.result?.rewards));
                                }
                            } else {
                                console.log(JSON.stringify(data.data?.result));
                            }
                        } else {
                            console.log(data.data.bizMsg);
                        }
                    } else {
                        console.log(data.msg)
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
async function xxx2() {
    let opt = {
        url: `https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1673695266809&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:1012333,%22completionFlag%22:1,%22encryptProjectId%22:%222aZfauURe2aNSkpWhRgJYi2SgSJc%22,%22encryptAssignmentId%22:%223S59eXDjPwQAH4QbUkFjJg4KztmC%22,%22assignmentType%22:0,%22actionType%22:0%7D`,
        headers: {
            'Origin': 'https://prodev.m.jd.com',
            'User-Agent': $.UA,
            'Cookie': cookie
        }
    }
    return new Promise(async (resolve) => {
        $.post(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data.code == 0) {
                        if (data.data.bizCode == 0) {
                            if (data.data?.result?.rewards) {
                                if (data.data?.result?.rewards[0].awardType === 3) {
                                    console.log(` 恭喜获得 ${data.data?.result?.rewards[0].beanNum} 京豆`);
                                } else {
                                    console.log(JSON.stringify(data.data?.result?.rewards));
                                }
                            } else {
                                console.log(JSON.stringify(data.data?.result));
                            }
                        } else {
                            console.log(data.data.bizMsg);
                        }
                    } else {
                        console.log(data.msg)
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

async function xxx4() {
    let opt = {
        url: `https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1673695266809&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:1012333,%22completionFlag%22:1,%22encryptProjectId%22:%222aZfauURe2aNSkpWhRgJYi2SgSJc%22,%22encryptAssignmentId%22:%2231EmJRrCLjTuCVq9caCNfgKKhomF%22,%22assignmentType%22:0,%22actionType%22:0%7D`,
        headers: {
            'Origin': 'https://prodev.m.jd.com',
            'User-Agent': $.UA,
            'Cookie': cookie
        }
    }
    return new Promise(async (resolve) => {
        $.post(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data.code == 0) {
                        if (data.data.bizCode == 0) {
                            if (data.data?.result?.rewards) {
                                if (data.data?.result?.rewards[0].awardType === 3) {
                                    console.log(` 恭喜获得 ${data.data?.result?.rewards[0].beanNum} 京豆`);
                                } else {
                                    console.log(JSON.stringify(data.data?.result?.rewards));
                                }
                            } else {
                                console.log(JSON.stringify(data.data?.result));
                            }
                        } else {
                            console.log(data.data.bizMsg);
                        }
                    } else {
                        console.log(data.msg)
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

async function xxx3() {
    let opt = {
        url: `https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1673746202042&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:1012353,%22completionFlag%22:1,%22encryptProjectId%22:%22mCqqcvGW1LKeAWqJtc6NwHGXK2u%22,%22encryptAssignmentId%22:%22H8VttZkAwM83dpETucHznqaNGAc%22,%22assignmentType%22:0,%22actionType%22:0%7D`,
        headers: {
            'Origin': 'https://prodev.m.jd.com',
            'User-Agent': $.UA,
            'Cookie': cookie
        }
    }
    return new Promise(async (resolve) => {
        $.post(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data.code == 0) {
                        if (data.data.bizCode == 0) {
                            if (data.data?.result?.rewards) {
                                if (data.data?.result?.rewards[0].awardType === 3) {
                                    console.log(` 恭喜获得 ${data.data?.result?.rewards[0].beanNum} 京豆`);
                                } else {
                                    console.log(JSON.stringify(data.data?.result?.rewards));
                                }
                            } else {
                                console.log(JSON.stringify(data.data?.result));
                            }
                        } else {
                            console.log(data.data.bizMsg);
                        }
                    } else {
                        console.log(data.msg)
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