/*
16 9 * * * jd_joypark_task.js
updatetime:2023/6/23
*/
const Env=require('./utils/Env.js');
const $ = new Env('汪汪庄园任务');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
$.invitePinTaskList = []
$.invitePin = [
    ""
]
const JD_API_HOST = `https://api.m.jd.com/client.action`;
message = ""
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.openIndex = 0;
            $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`

            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            for (let i of Array(5)) {
                await getTaskList();
                for (const task of $.taskList) {
                    if (task.taskFinished) continue;
                    if (task.taskType === 'SIGN') {
                        $.log(`${task.taskTitle}`)
                        await apDoTask(task.id, task.taskType, undefined);
                        $.log(`${task.taskTitle} 领取奖励`)
                        await apTaskDrawAward(task.id, task.taskType);
                    }
                    if (task.taskType === 'BROWSE_PRODUCT' || task.taskType === 'BROWSE_CHANNEL' && task.taskLimitTimes !== 1) {
                        let productList = await apTaskDetail(task.id, task.taskType);
                        let productListNow = 0;
                        if (productList.length === 0) {
                            let resp = await apTaskDrawAward(task.id, task.taskType);

                            if (!resp.success) {
                                $.log(`${task.taskTitle}|${task.taskShowTitle} 领取完成!`)
                                productList = await apTaskDetail(task.id, task.taskType);

                            }
                        }
                        //做
                        while (task.taskLimitTimes - task.taskDoTimes >= 0) {

                            if (productList.length === 0) {
                                $.log(`${task.taskTitle} 活动火爆，素材库没有素材，我也不知道啥回事 = = `);
                                break;
                            }
                            $.log(`${task.taskTitle} ${task.taskDoTimes}/${task.taskLimitTimes}`);
                            let resp = await apDoTask(task.id, task.taskType, productList[productListNow].itemId, productList[productListNow].appid);
                            await $.wait(1000)
                            if (resp.code === 2005 || resp.code === 0) {
                                $.log(`${task.taskTitle}|${task.taskShowTitle} 任务完成！`)
                            } else {
                                $.log(`${resp.echo} 任务失败！`)
                            }
                            productListNow++;
                            task.taskDoTimes++;
                            if (!productList[productListNow]) {
                                break
                            }
                        }
                        for (let j = 0; j < 1; j++) {
                            let resp = await apTaskDrawAward(task.id, task.taskType);

                            if (!resp.success) {
                                $.log(`${task.taskTitle}|${task.taskShowTitle} 领取完成!`)
                                break
                            }
                        }
                    } else if (task.taskType === 'SHARE_INVITE') {
                        // $.yq_taskid = task.id
                        // for (let j = 0; j < 5; j++) {
                        //     let resp = await apTaskDrawAward($.yq_taskid, 'SHARE_INVITE');

                        //     if (!resp.success) {
                        //         break
                        //     }
                        //     $.log("领取助力奖励成功！")
                        // }
                    }
                    if (task.taskType === 'BROWSE_CHANNEL' && task.taskLimitTimes === 1) {
                        $.log(`${task.taskTitle}|${task.taskShowTitle}`)
                        await apDoTask2(task.id, task.taskType, task.taskSourceUrl);
                        $.log(`${task.taskTitle}|${task.taskShowTitle} 领取奖励`)
                        await apTaskDrawAward(task.id, task.taskType);
                    }
                    // if (task.taskType === 'SHARE_INVITE') {
                    //   $.yq_taskid = task.id
                    // }
                    await $.wait(500);
                }
                await $.wait(500);
            }
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
//获取活动信息

//任务列表
function getTaskList() {
    return new Promise(resolve => {
        $.post(taskPostClientActionUrl(`body=%7B%22linkId%22%3A%2299DZNpaCTAv8f4TuKXr0Ew%22%7D&appid=activities_platform`, `apTaskList`), async (err, resp, data) => {
            $.log('=== 任务列表 start ===')
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    $.taskList = data.data
                    for (const row of $.taskList) {
                        $.log(`${row.taskTitle} ${row.taskDoTimes}/${row.taskLimitTimes}`)
                    }
                    $.log('=== 任务列表 end  ===')
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

/**
 * 互助
 * @param taskId
 * @param inviteType
 * @param inviterPin
 * @returns {Promise<unknown>}
 */
function getJoyBaseInfo(taskId = '', inviteType = '', inviterPin = '') {
    //await $.wait(20)
    return new Promise(resolve => {
        $.post(taskPostClientActionUrl(`body={"taskId":"${taskId}","inviteType":"${inviteType}","inviterPin":"${inviterPin}","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&_t=1625480372020&appid=activities_platform`, `joyBaseInfo`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    $.joyBaseInfo = data.data
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                $.log(`resolve start`)
                resolve(data);
                $.log(`resolve end`)
            }
        })
    })
}

function apDoTask(taskId, taskType, itemId = '', appid = 'activities_platform') {
    //await $.wait(20)
    return new Promise(resolve => {
        $.post(taskPostClientActionUrl(`body={"taskType":"${taskType}","taskId":${taskId},"channel":4,"linkId":"99DZNpaCTAv8f4TuKXr0Ew","itemId":"${itemId}"}&appid=${appid}`, `apDoTask`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function apDoTask2(taskId, taskType, itemId, appid = 'activities_platform') {
    return new Promise(resolve => {
        $.post(taskPostClientActionUrl(`body={"taskType":"${taskType}","taskId":${taskId},"linkId":"99DZNpaCTAv8f4TuKXr0Ew","itemId":"${encodeURIComponent(itemId)}"}&appid=${appid}`, `apDoTask`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.code == 0) {
                        $.log("任务完成");
                    } else {
                        $.log(data.errMsg);
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

function apTaskDetail(taskId, taskType) {
    //await $.wait(20)
    return new Promise(resolve => {
        $.post(taskPostClientActionUrl(`functionId=apTaskDetail&body={"taskType":"${taskType}","taskId":${taskId},"channel":4,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`, `apTaskDetail`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (!data.success) {
                        $.taskDetailList = []
                    } else {
                        $.taskDetailList = data.data.taskItemList;
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                if (!data.success) {
                    resolve([]);
                } else {
                    resolve(data.data.taskItemList);
                }
            }
        })
    })
}

function apTaskDrawAward(taskId, taskType) {
    //await $.wait(20)
    return new Promise(resolve => {
        $.post(taskPostClientActionUrl(`body={"taskType":"${taskType}","taskId":${taskId},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`, `apTaskDrawAward`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.code == 0) {
                        $.log("领取奖励");
                    } else {
                        $.log(data.errMsg);
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

function taskPostClientActionUrl(body, functionId) {
    return {
        url: `https://api.m.jd.com${functionId ? `?functionId=${functionId}` : ''}`,
        body: body,
        headers: {
            'User-Agent': $.UA,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.m.jd.com',
            'Origin': 'https://joypark.jd.com',
            'Referer': 'https://joypark.jd.com/',
            'Cookie': cookie,
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