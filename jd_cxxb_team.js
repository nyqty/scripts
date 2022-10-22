/*
建议手动先点开一次
cron "1 8 * * *" jd_cxxb_team.js, tag:快速升级，跑一次即可
*/
var {window,get_log,Env}=require('./JDcxxb.log.min.js');//{window,document,navigator,screen,get_log,GetRandomNum,Env,get_log,GetRandomNum,Env}

const $ = new Env('穿行寻宝-助力组队');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

let cookiesArr = [],
    cookie = '';
let secretp = '',
    inviteId = []

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';


let groups=[],g_i=0;
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    console.log('\n仅加战队\n')
    await getUA()


    let 队长用户名=[],队伍数量=cookiesArr.length>0?Math.ceil(cookiesArr.length/30):0;
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
            document.cookie=cookie;
            /* await get_secretp()
            if ($.huobao == false) {
                console.log(`火爆`); continue;
            }
            await promote_collectAtuoScore() //定时领取
            */
            let res
            
            //此处修改组队人数
            if ( 队伍数量>groups.length ) {
                res = await promote_pk_getHomeData()
                if (res && res.data?.result?.groupInfo?.memberList) {
                    let memberCount = res.data.result.groupInfo.memberList.length
                    console.log('当前队伍有', memberCount, '人')
                    let groupJoinInviteId = ""
                    if (memberCount < 30) {
                        //队伍数量--;
                        队长用户名.push($.UserName);
                        groupJoinInviteId = res.data.result.groupInfo.groupJoinInviteId
                        res = await getEncryptedPinColor()
                        groups.push({ mpin: res.result, groupJoinInviteId: groupJoinInviteId,num:memberCount  })
                        console.log('队伍未满:', groupJoinInviteId)
                    }
                }
            }else break;
        }
    }
    try {
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                message = '';
                if($.UserName && 队长用户名.indexOf($.UserName)!==-1) continue;
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                if(groups.length>g_i){
                    document.cookie=cookie;
                    res = await promote_pk_getHomeData()
                    if (res?.data?.result?.groupInfo?.memberList) {
                        let memberCount = res.data.result.groupInfo.memberList.length
                        if (memberCount === 1) {
                            console.log('\n开始加入队伍：', groups[g_i].groupJoinInviteId)
                            res = await collectFriendRecordColor(groups[g_i].mpin)
                            res = await promote_pk_joinGroup(groups[g_i].groupJoinInviteId)
                            if(res && res.data){
                                console.log(`promote_pk_joinGroup:\n${JSON.stringify(res)}`)
                                console.log('\n当前人数：',groups[g_i].num,"\n")
                                if (res.data.bizCode === 0) {
                                    groups[g_i].num++;
                                    console.log('加入队伍成功+1')
                                    if(groups[g_i].num>=30) g_i++;
                                }else if(res.data.bizCode === -3){//来晚了|该团队已经满员了
                                    console.log(res.data.bizMsg);
                                    g_i++;
                                    if(groups.length>g_i){
                                        i--;
                                    }
                                    //continue;
                                } else {
                                    console.log(res.data.bizCode+res.data.bizMsg)
                                }
                            }else{
                                //{ code: -40300, msg: '运行环境异常，请您从正规途径参与活动，谢谢~' }
                                console.log(res)
                            } 
                            await $.wait(3000)
                            //res = await promote_pk_getHomeData()
                        }else console.log('跳过组队！')
                    }else console.log(`promote_pk_getHomeData:\n${JSON.stringify(res)}`)
                    await $.wait(3000)
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

function promote_collectAtuoScore() {
    let random=window.smashUtils.getRandom(8);
    let log = get_log(random);
    let body = {"random":random,"log":log}
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
                            console.log(`promote_collectAutoScore失败:\n${JSON.stringify(data)}\n`)
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

function promote_pk_getHomeData(inviteId='') {
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_pk_getHomeData", inviteId?{"inviteId":inviteId}:{}), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        } else {
                            console.log(`\n\n 失败:${JSON.stringify(data)}\n`)
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

function getEncryptedPinColor() {
    return new Promise((resolve) => {
        $.post(taskPostUrl2("getEncryptedPinColor", {}), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        } else {
                            console.log(`\n\n 失败:${JSON.stringify(data)}\n`)
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


function collectFriendRecordColor(mpin) {
    return new Promise((resolve) => {
        //"assistType": "2"
        $.post(taskPostUrl("collectFriendRecordColor", {"mpin": mpin, "businessCode": "20136", "assistType": "1", "shareSource": 1}), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        } else {
                            console.log(`\n\n 失败:${JSON.stringify(data)}\n`)
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

function promote_pk_joinGroup(groupJoinInviteId) {
    let random=window.smashUtils.getRandom(8);
    let log = get_log(random);
    let body = {"inviteId": groupJoinInviteId, random: random,log: log, "confirmFlag": 1};
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_pk_joinGroup", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        } else {
                            console.log(`\n\n 失败:${JSON.stringify(data)}\n`)
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
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'referer': 'https://wbbny.m.jd.com',
            'Origin': 'https://wbbny.m.jd.com',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}

function taskPostUrl2(functionId, body) {
    return {
        url: `${JD_API_HOST}?functionId=${functionId}&client=wh5`,
        body: `body=${escape(JSON.stringify(body))}`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Origin': 'https://wbbny.m.jd.com',
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
        let randomString = Math.random().toString(16).substring(2)
        if ((range - i) > randomString.length) {
            str += randomString
            i += randomString.length
        } else {
            str += randomString.slice(i - range)
            i += randomString.length
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