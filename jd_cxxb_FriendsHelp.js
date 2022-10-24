/*
建议手动先点开一次
cron "10 9 * * *" jd_cxxb_help.js, tag:快速签到升级，助力跑一次即可
*/
const Env=require('./utils/Env.js');
var {window,document,get_log}=require('./utils/JDcxxb.log.min.js');

const $ = new Env('穿行寻宝-好友助力');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

let cookiesArr = [],
    cookie = '',
    helpPinArr=[],
    helpCodeArr=[];

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    console.log('\n仅升级，快速跑完和助力\n')
    await getUA()

    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            $.newShareCodes = []
            await promote_collectAtuoScore() //定时领取
            let res
            try {
                res = await promote_getTaskDetail()
                await promote_sign()
                do {
                    var ret = await promote_raise()
                    await $.wait(1000)
                } while (ret)
            } catch (e) {
                $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
            }
        }
    }
    helpCodeArr=[...helpCodeArr];
    try {
        for (let i = 0; i < cookiesArr.length && helpCodeArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                message = '';
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                let helpRes,bizCode,bizMsg
                for (let j = 0, codeLen = helpCodeArr.length; j < codeLen; j++) {
                    const { pin, code } = helpCodeArr[j]
                    if (pin === $.UserName) continue
                    console.log(`去帮助用户：${pin}`)
                    helpRes = await help(code)
                    if(helpRes && helpRes['data']){
                        helpRes = helpRes['data'];
                        bizCode = helpRes['bizCode'];
                        bizMsg = helpRes.bizMsg;
                        if (bizCode === 0) {//
                            const { alreadyAssistTimes, maxAssistTimes, maxTimes, score, times } = helpRes.result
                            const c = maxAssistTimes - alreadyAssistTimes
                            const num=maxTimes - times;
                            console.log(`互助成功，获得${score}金币，他还需要${num}人完成助力，你还有${c}次助力机会`)
                            if (helpRes.result?.redpacket?.value) console.log('🧧', parseFloat(helpRes.result?.redpacket?.value))
                            if (!c) break
                            if(!num){//助力完成
                                helpCodeArr.splice(j, 1);j--;
                            }
                            //console.log('助力结果：'+bizMsg)
                        }else if (bizCode==108) { //无助力
                            console.log(bizMsg); break;
                        }else if (bizCode==-201) {//好友人气爆棚，不需要助力啦~
                            console.log(bizMsg);
                            helpCodeArr.splice(j, 1);j--;
                            //helpCodeArr = helpCodeArr.filter(x => x.pin !== pin)
                            continue
                        }else if (bizCode==-202) {
                            console.log(bizMsg);
                        }else {
                            //1002 //运行环境异常，请您从正规途径参与活动，谢谢~
                            console.log(`互助失败，原因：${bizMsg}（${bizCode}）`)
                            break
                        }
                        await $.wait(1000)
                    }else{
                        //{ code: -40300, msg: '运行环境异常，请您从正规途径参与活动，谢谢~' }
                        console.log(helpRes);
                        break;
                    }
                }
            }
        }
    } catch (e) {
        $.log(`❌ ${$.name}, 失败! 原因: `, e)
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function promote_sign() {
    let random=window.smashUtils.getRandom(8);
    let body = {"random":random,"log":get_log(random)}
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_sign", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {
                                console.log(`签到成功`)
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        } else {
                            console.log(`签到失败:${JSON.stringify(data)}\n`)
                            //签到失败:{"code":-40300,"msg":"运行环境异常，请您从正规途径参与活动，谢谢~"}
                            resolve(false)
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

function promote_collectAtuoScore() {
    let random=window.smashUtils.getRandom(8);
    let body = {"random":random,"log":get_log(random)}
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_collectAutoScore", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {
                                console.log(`成功领取${data.data.result.produceScore}个币`)
                            }
                        } else {
                            //签到失败:{"code":-40300,"msg":"运行环境异常，请您从正规途径参与活动，谢谢~"}
                            console.log(`\n\nsecretp失败:${JSON.stringify(data)}\n`)
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

function promote_getTaskDetail() {
    let body = {"appSign":"1"};
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_getTaskDetail", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {
								let inviteId = data.data.result.inviteId
                                if (inviteId) {
                                    console.log(`你的互助码：${inviteId}`)
                                    if (!helpPinArr.includes($.UserName)) {
                                        helpCodeArr.push({
                                            pin: $.UserName,
                                            code: inviteId
                                        })
                                        helpPinArr.push($.UserName)
                                    }
                                }else{
                                    console.log("黑号")
                                    resolve("")
                                }
                                resolve(data.data.result)
                            }
                        } else {
                            //console.log(`\n\nsecretp失败:${JSON.stringify(data)}\n`)
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

function help(inviteId) {
    let random=window.smashUtils.getRandom(8);
    let body = {"random":random,"log":get_log(random),"actionType":"0","inviteId":inviteId}
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_collectScore", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
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
function promote_raise() {
    let random=window.smashUtils.getRandom(8);
    let body = {"scenceId":1,"random":random,"log":get_log(random)}
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_raise", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {
                                console.log(`升级成功`)
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        } else {
                            console.log(`升级失败:${JSON.stringify(data)}\n`)
                            //签到失败:{"code":-40300,"msg":"运行环境异常，请您从正规途径参与活动，谢谢~"}
                            resolve(false)
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

function taskPostUrl(functionId, body) {
    return {
        url: `${JD_API_HOST}?functionId=${functionId}`,
        body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=m&clientVersion=-1&appid=signed_wh5`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'referer': 'https://wbbny.m.jd.com',
            'Origin': 'https://wbbny.m.jd.com',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}


function getUA() {
    $.UUID = randomString(40)
    $.UA = `jdapp;android;10.3.2`
}


function randomNum(min, max) {
    if (arguments.length === 0) return Math.random()
    if (!max) max = 10 ** (Math.log(min) * Math.LOG10E + 1 | 0) - 1
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomString(min, max = 0) {
    var str = "", range = min, arr = [...Array(36).keys()].map(k => k.toString(36));
    if (max) {
        range = Math.floor(Math.random() * (max - min + 1) + min);
    }
    for (let i = 0; i < range;) {
        let r = Math.random().toString(16).substring(2)
        if ((range - i) > r.length) {
            str += r
            i += r.length
        } else {
            str += r.slice(i - range)
            i += r.length
        }
    }
    return str;
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