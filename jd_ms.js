/*
搞鸡玩家-秒秒币
Last Modified time: 2022-1-21
活动入口：京东 首页秒杀
更新地址：jd_ms.js
已支持IOS双京东账号, Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, 小火箭，JSBox, Node.js
============Quantumultx===============
[task_local]
#搞鸡玩家-秒秒币
30 7 * * * jd_ms.js, tag=搞鸡玩家-秒秒币, img-url=, enabled=true

================Loon==============
[Script]
cron "30 7 * * *" script-path=jd_ms.js, tag=搞鸡玩家-秒秒币

===============Surge=================
搞鸡玩家-秒秒币 = type=cron,cronexp="30 7 * * *",wake-system=1,timeout=3600,script-path=jd_ms.js

============小火箭=========
搞鸡玩家-秒秒币 = type=cron,script-path=jd_ms.js, cronexpr="30 7 * * *", timeout=3600, enable=true
 */
const Env=require('./utils/Env.js');
const $ = new Env('搞鸡玩家-秒秒币');

const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
var timestamp = Math.round(new Date().getTime()).toString();
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
    };
    if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0)
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';
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
            message = '';
            await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/`, { "open-url": "https://bean.m.jd.com/" });

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            await tttsign()
            await jdMs()
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

async function jdMs() {
    $.score = 0
    await getActInfo()
    await getUserInfo()
    await getActInfo()
    $.cur = $.score
    if ($.encryptProjectId) {
        console.log(`领红包签到`)
        await readpacksign()
        await getTaskList()
    }
    await getUserInfo(false)

    await showMsg()
}

function getActInfo() {
    return new Promise(resolve => {
        $.post(taskPostUrl('assignmentList', {}, 'appid=jwsp'), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err},${jsonParse(resp.body)['message']}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data)
                        if (data.code === 200) {
                            $.encryptProjectId = data.result.assignmentResult.encryptProjectId
                            console.log(`活动名称：${data.result.assignmentResult.projectName}`)
                            sourceCode = data.result.sourceCode
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function getUserInfo(info = true) {
    return new Promise(resolve => {
        $.post(taskPostUrl('homePageV2', {}, 'appid=SecKill2020'), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err},${jsonParse(resp.body)['message']}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data)
                        if (data.code === 2041) {
                            $.score = data.result.assignment.assignmentPoints || 0
                            if (info) console.log(`当前秒秒币${$.score}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function getTaskList() {
    let body = { "encryptProjectId": $.encryptProjectId, "sourceCode": "wh5" }
    return new Promise(resolve => {
        $.post(taskPostUrl('queryInteractiveInfo', body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err},${jsonParse(resp.body)['message']}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data)
                        $.risk = false
                        if (data.code === '0') {
                            for (let vo of data.assignmentList) {
                                if ($.risk) break
                                if (vo['completionCnt'] < vo['assignmentTimesLimit']) {
                                    if (vo['assignmentType'] === 1) {
                                        if (vo['ext'][vo['ext']['extraType']].length === 0) continue;
                                        for (let i = vo['completionCnt']; i < vo['assignmentTimesLimit']; ++i) {
                                            console.log(`去做${vo['assignmentName']}任务：${i + 1}/${vo['assignmentTimesLimit']}`)
                                            let body = {
                                                "encryptAssignmentId": vo['encryptAssignmentId'],
                                                "itemId": vo['ext'][vo['ext']['extraType']][i]['itemId'],
                                                "actionType": 1,
                                                "completionFlag": ""
                                            }
                                            await doTask(body)
                                            await $.wait(vo['ext']['waitDuration'] * 1000 + 500)
                                            body['actionType'] = 0
                                            await doTask(body)
                                        }
                                    } else if (vo['assignmentType'] === 0) {
                                        for (let i = vo['completionCnt']; i < vo['assignmentTimesLimit']; ++i) {
                                            console.log(`去做${vo['assignmentName']}任务：${i + 1}/${vo['assignmentTimesLimit']}`)
                                            let body = {
                                                "encryptAssignmentId": vo['encryptAssignmentId'],
                                                "itemId": "",
                                                "actionType": "0",
                                                "completionFlag": true
                                            }
                                            await doTask(body)
                                            await $.wait(1000)
                                        }
                                    } else if (vo['assignmentType'] === 3) {
                                        for (let i = vo['completionCnt']; i < vo['assignmentTimesLimit']; ++i) {
                                            console.log(`去做${vo['assignmentName']}任务：${i + 1}/${vo['assignmentTimesLimit']}`)
                                            let body = {
                                                "encryptAssignmentId": vo['encryptAssignmentId'],
                                                "itemId": vo['ext'][vo['ext']['extraType']][i]['itemId'],
                                                "actionType": 0,
                                                "completionFlag": ""
                                            }
                                            await doTask(body)
                                            await $.wait(1000)
                                        }
                                    }
                                }
                            }
                        } else {
                            console.log(data)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function doTask(body) {
    body = { ...body, "encryptProjectId": $.encryptProjectId, "sourceCode": sourceCode, "ext": {}, "extParam": { "businessData": { "random": 25500725 }, "signStr": timestamp + "~1hj9fq9", "sceneid": "MShPageh5" } }
    return new Promise(resolve => {
        $.post(taskPostUrl('doInteractiveAssignment', body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err},${jsonParse(resp.body)['message']}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data)
                        console.log(data.msg)
                        if (data.msg === '风险等级未通过') $.risk = 1
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function tttsign() {
    return new Promise(resolve => {
        body = 'appid=babelh5&body=%7B%22encryptProjectId%22%3A%224NzhoLbAJtBXbyRj5zGwprtf6GDv%22%2C%22encryptAssignmentId%22%3A%223yRMFkp3SN8nXpX49xAdCWsdy5XP%22%2C%22completionFlag%22%3Atrue%2C%22itemId%22%3A%221%22%2C%22sourceCode%22%3A%22aceaceqingzhan%22%7D&sign=11&t=1642929553660'
        $.post(ttt(body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err},${jsonParse(resp.body)['message']}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data)
                        if (data.code === 0) {
                            rewardsInfo = data.rewardsInfo.failRewards[0].msg
                            console.log(`${rewardsInfo}`)
                        } else console.log(data.msg)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function readpacksign() {
    return new Promise(resolve => {
        body = 'uuid=88888&clientVersion=10.3.4&client=wh5&osVersion=&area=4_48201_54794_0&networkType=unknown&functionId=signRedPackage&body={"random":"23715587","log":"~1oji7rf","sceneid":"MShPageh5","ext":{"platform":"1","eid":"","referUrl":-1,"userAgent":-1}}&appid=SecKill2020'
        $.post(readpack(body), (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${err},${jsonParse(resp.body)['message']}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data)
                        if (data.code === 200) {
                            rewardsInfo = data.result.assignmentResult.msg
                            console.log(`${rewardsInfo}`)
                        } else console.log("今日签到红包已领")
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function showMsg() {
    return new Promise(resolve => {
        message += `本次运行获得秒秒币${$.score - $.cur}枚，共${$.score}枚`;
        $.msg($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
        resolve()
    })
}
function ttt(body) {
    let url = `${JD_API_HOST}client.action?functionId=doInteractiveAssignment`;

    return {
        url,
        body: body,
        headers: {
            "Cookie": cookie,
            "origin": "https://prodev.m.jd.com",

            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        }
    }
}
function readpack(body) {
    let url = `${JD_API_HOST}client.action`;

    return {
        url,
        body: body,
        headers: {
            "Cookie": cookie,
            "origin": "https://h5.m.jd.com",

            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        }
    }
}
function taskPostUrl(function_id, body = {}, extra = '', function_id2) {
    let url = `${JD_API_HOST}`;
    if (function_id2) {
        url += `?functionId=${function_id2}`;
    }
    return {
        url,
        body: `functionId=${function_id}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0&${extra}`,
        headers: {
            "Cookie": cookie,
            "origin": "https://h5.m.jd.com",
            "referer": "https://h5.m.jd.com/babelDiy/Zeus/2NUvze9e1uWf4amBhe1AV6ynmSuH/index.html",
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        }
    }
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
            $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie')
            return [];
        }
    }
}