
/*
京东特价APP首页-赚钱大赢家
进APP看看，能不能进去，基本都黑的！！！
有的能进去，助力确是黑的！！
默认定时不跑！助力和领取任务奖励
运行流程：设置助力码--过滤黑号--助力--领取任务奖励！！！
助理吗变量：多个用&号隔开
DYJSHAREID = 'xxx&xxx&xxx'
10 10 10 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_makemoneyshop.js
By: https://github.com/6dylan6/jdpro
updatetime: 2022/11/10 助力满下一个
 */
const Env=require('./utils/Env.js');
const $ = new Env('特价版大赢家');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
let shareId = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
if (process.env.DYJSHAREID) {
    if (process.env.DYJSHAREID.indexOf('&') > -1) {
        shareId = process.env.DYJSHAREID.split('&');
    } else {
        shareId = [process.env.DYJSHAREID];
    }
}
let helpinfo = {};
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    console.log('\n运行一遍可以看到助力码，然后设置需要助力的！')
    console.log('\n运行流程：设置助力码--过滤黑号--助力--领取任务奖励！！！\n')
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.canUseCoinAmount = 0;
            helpinfo[$.UserName] = {};
            UA = require('./USER_AGENTS').UARAM();
            helpinfo[$.UserName].ua = UA;
            await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }

            await getinfo(1);
            await $.wait(1000);
        }
    }
    if (shareId.length > 0) {
        console.log('\n\n开始助力...')
        for (let j = 0; j < shareId.length; j++) {
            console.log('\n去助力--> ' + shareId[j]);
            helpnum = 1;
            for (let i = 0; i < cookiesArr.length; i++) {
                if (helpnum == 10) {console.log('助力已满，跳出！\n');break};
                if (cookiesArr[i]) {
                    cookie = cookiesArr[i];
                    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                    $.index = i + 1;
                    UA = helpinfo[$.UserName].ua;
                    console.log(`\n开始【账号${$.index}】${$.nickName || $.UserName}`);
                    if (helpinfo[$.UserName].nohelp) { console.log('已无助力次数了'); continue };
                    if (helpinfo[$.UserName].hot) { console.log('可能黑了，跳过！'); continue };
                    await help(shareId[j]);
                    console.log('随机等待2-5秒');
                    await $.wait(parseInt(Math.random() * 3000 + 2000, 10))
                }
            }
        }
    } else {
        console.log('无助立马请设置！！\n')
    }

    console.log('开始领取任务奖励...')

    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            UA = helpinfo[$.UserName].ua;
            console.log(`\n开始【账号${$.index}】${$.UserName}`);
            if (helpinfo[$.UserName].hot) continue;
            await gettask();
            await $.wait(500);
            for (let item of $.tasklist) {
                if (item.awardStatus !== 1) {
                    for (let k = 0; k < (item.realCompletedTimes - item.targetTimes + 1); k++) {
                        console.log(`去领取${item.taskName}奖励`);
                        await Award(item.taskId);
                        await $.wait(500);
                    }
                }
            }
            await $.wait(1000);
        }
    }

})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function getinfo(xc) {
    return new Promise(async (resolve) => {
        $.get(taskUrl('makemoneyshop/home', 'activeId=63526d8f5fe613a6adb48f03&_stk=activeId&_ste=1'), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    let tostr = data.match(/\((\{.*?\})\)/)[1];
                    data = eval('(' + tostr + ')');
                    if (data.code == 0) {
                        if (xc) {
                            let sId = data.data.shareId;
                            helpinfo[$.UserName].sId = `${sId}`;
                            console.log('助力码：' + sId);
                            console.log('当前营业金：' + data.data.canUseCoinAmount);
                        }
                    } else {
                        console.log(data.msg);
                        $.hotflag = true;
                        helpinfo[$.UserName].hot = 1;
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

function gettask() {
    return new Promise(async (resolve) => {
        $.get(taskUrl('newtasksys/newtasksys_front/GetUserTaskStatusList', `__t=${Date.now}&source=makemoneyshop&bizCode=makemoneyshop`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    let tostr = data.match(/\((\{.*?\})\n\)/)[1];
                    data = eval('(' + tostr + ')');
                    if (data.ret == 0) {
                        $.tasklist = data.data.userTaskStatusList;
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
function Award(id) {
    return new Promise(async (resolve) => {
        $.get(taskUrl('newtasksys/newtasksys_front/Award', `__t=${Date.now()}&source=makemoneyshop&taskId=${id}&bizCode=makemoneyshop`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    let tostr = data.match(/\((\{.*?\})\n\)/)[1];
                    data = eval('(' + tostr + ')');
                    if (data.ret == 0) {
                        console.log('获得营业金：' + (data.data.prizeInfo / 100) + '元');
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


function help(shareid) {
    return new Promise(async (resolve) => {
        $.get(taskUrl('makemoneyshop/guesthelp', `activeId=63526d8f5fe613a6adb48f03&shareId=${shareid}&_stk=activeId,shareId&_ste=1`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    let tostr = data.match(/\((\{.*?\})\)/)[1];
                    data = eval('(' + tostr + ')');
                    if (data.code == 0) {
                        console.log('助力成功！');
                        helpinfo[$.UserName].nohelp = 1;
                        helpnum++;
                    } else if (data.msg === '已助力') {
                        console.log('你已助力过TA！')
                        helpinfo[$.UserName].nohelp = 1;
                    } else if (data.code === 1006) {
                        console.log('不能助力自己！');
                    } else if (data.code === 1008) {
                        console.log('今日无助力次数了！');
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

function taskUrl(fn, body) {
    return {
        url: `https://wq.jd.com/${fn}?g_ty=h5&g_tk=&appCode=msc588d6d5&${body}&h5st=&sceneval=2&callback=__jsonp1667344808184`,
        headers: {
            'Origin': 'https://wq.jd.com',
            'Referer': 'https://wqs.jd.com/sns/202210/20/make-money-shop/index.html?activeId=63526d8f5fe613a6adb48f03',
            'User-Agent': UA,
            'Cookie': cookie
        }
    }
}

function TotalBean() {
    return new Promise((resolve) => {
        const options = {
            url: 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
            headers: {
                "Cookie": cookie,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": UA,
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