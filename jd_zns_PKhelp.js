/*
cron "10 21 * * *" jd_zns_PKhelp.js, tag:用户膨胀码助力

QQ1659670408
*/

var {window,document,get_log}=require('./utils/JDzns.log.min.js');//{window,document,navigator,screen,get_log,GetRandomNum,Env,get_log,GetRandomNum,Env}
const Env=require('./utils/Env.js');
const $ = new Env('炸年兽-自动膨胀助力');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';


let cookiesArr = [],
    cookie = '',
    message;
let secretp = '',
    inviteId = '',
    res

let ZNS_PKhelpPin=[];
if( process.env.ZNS_PKhelpPin ){
    ZNS_PKhelpPin=process.env.ZNS_PKhelpPin.split("&");
}else{
    console.log(`请设置变量 ZNS_PKhelpPin 来指定用户，多个用&分隔，如果全部用户就填all`)
    return false
}

let ok_UserNames=[];

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';
let shareCodes = []

!(async() => {   
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    await getUA()
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            if( (!$.UserName || ZNS_PKhelpPin.indexOf($.UserName)===-1) && ZNS_PKhelpPin[0]!="all" ) continue;
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            await promote_pk_getAmountForecast();
            await $.wait(1000)
        }
    }
    console.log(`\n\n为以下膨胀码膨胀：${JSON.stringify(shareCodes)}\n`)
    let code,inviteCode;
    for (let i = 102; i < cookiesArr.length && shareCodes .length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            for (let j = 0; j < shareCodes .length; j++) {
                if( $.UserName == shareCodes[j].pin){
                    console.log(`给自己助跳过..`)
                    continue
                }
                inviteId=shareCodes[j].inviteId;
                console.log(`给 ${shareCodes[j].pin} 进行助力`)
                try {
                    code = await promote_pk_collectPkExpandScore(inviteId);
                }catch(e){
                    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
                }
                if(code==2){
                    ok_UserNames.push(shareCodes[j].pin);
                    shareCodes.splice(j, 1)
                    j--
                    continue
                }else if(code==3){
                    break;
                }
                await $.wait(2000)
            }
            await $.wait(1000)
        }
    }

    if (ok_UserNames.length) {
        console.log(`\n******开始领取红包*********\n`);
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                if (!$.UserName || ok_UserNames.indexOf($.UserName) === -1) continue;
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                /*console.log("已经完成邀请了,开始领取优惠券。");*/
                //查看当前价格兑换
                promote_pk_receiveAward()
                await $.wait(2e3)
            }
        }
    }

})()
.catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })


//升级到膨胀红包
function promote_pk_getAmountForecast() {
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_pk_getAmountForecast", {}), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if ( data?.code === 0 && data?.data ) {
                            //console.log(`${JSON.stringify(data)}\n`)
                            //{"bizCode":-3,"bizMsg":"活动太火爆，请稍后再试哦~","success":false}
                            switch(data['data']['bizCode']){
                                case 0:
                                    let result=data['data']['result'];
                                    if( result?.securityCode ) {
                                        //console.log(`OK:\n${JSON.stringify(result)}`)
                                        console.log(`升级膨胀红包成功`);
                                        await travel_gethelp();
                                        resolve(1)
                                    }else{
                                        console.log(`已膨胀成功或者取消膨胀`);
                                        resolve(1)
                                    }
                                    break;
                                case -3:
                                    console.log(`${data['data']['bizMsg']}`);
                                    resolve(2)
                                    break;
                                default:
                                    console.log(`${data['data']['bizCode']+data['data']['bizMsg']}`);
                                    resolve(false)
                            }
                        } else {
                            console.log(`升级失败:${JSON.stringify(data)}\n`)
                            resolve(false)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                //resolve(data);
            }
        })
    })
}

function travel_gethelp(){
    let random=window.smashUtils.getRandom(8);
    let body = {"random":random,"log":get_log(random)}
	return new Promise((resolve) => {
	$.post(taskPostUrl("promote_pk_getExpandDetail",body), async (err, resp, data) => {
        try {
            if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
            } else {
            if (safeGet(data)) {
                data = JSON.parse(data);
                if (data && data.code === 0) {
                    let p=data.data?.result?.inviteId
                    if(p){
                        console.log(`成功获取膨胀码：`+p)
                        //console.log(`${JSON.stringify(data.data.result)}\n`)
                        shareCodes.push({
                            pin:$.UserName,
                            inviteId:p
                        });
                    }
                } else {
                    console.log(`\n\n 失败:${JSON.stringify(data)}\n`)
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
//膨胀助力
function promote_pk_collectPkExpandScore(inviteId) {
    let random=window.smashUtils.getRandom(8);
    let body = {"random":random,"log":get_log(random),"actionType":"0","inviteId":inviteId}
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_pk_collectPkExpandScore", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if ( data?.code === 0 && data?.data ) {
                            /*
                            {"bizCode":-1001,"bizMsg":"活动太火爆了~还是去买买买吧","success":false},
                            {"bizCode":-13,"bizMsg":"不能为本队队员助力哦|快去瓜分19亿红包吧~","success":false}
                            */
                            switch(data['data']['bizCode']){
                                case 0:
                                    console.log(`助力成功:${data['data']['bizMsg']}`);
                                    resolve(1)
                                    break;
                                case -19://TA已经获得足够的助力了|不需要助力啦~
                                case -15://助力已结束|下次早点来吧
                                    console.log(`助力:${data['data']['bizMsg']}`)
                                    resolve(2)
                                    break;
                                case -9://您今天的助力次数已用完|今天不能再助力啦~
                                    console.log(`助力:${data['data']['bizMsg']}`)
                                    resolve(3)
                                    break;
                                default:
                                    //-1001活动太火爆了~还是去买买买吧
                                    console.log(`助力:${data['data']['bizCode']+data['data']['bizMsg']}`)
                                    resolve(false)
                            }
                            //console.log(`助力失败:${JSON.stringify(data)}\n`)
                        } else {
                            if(data?.code === -40300 || data?.code==-30001){
                                resolve(3)
                                console.log(`助力失败:${JSON.stringify(data.msg)}\n`)
                            }else{
                                console.log(`助力失败:${JSON.stringify(data)}\n`)
                                resolve(false)
                            }
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                //resolve(data);
            }
        })
    })
}


function promote_pk_receiveAward() {
    let body={};
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_pk_receiveAward", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if ( data?.code === 0 && data?.data ) {
                            switch(data['data']['bizCode']){
                                case 0:
                                    console.log(`领取成功:${data['data']['result']["value"]}元红包，有效期${data['data']['result']["ext"]}`);
                                    resolve(1)
                                    break;
                                default:
                                    console.log(`领取:${data['data']['bizCode']+data['data']['bizMsg']}`)
                                    resolve(false)
                            }
                            //console.log(`助力失败:${JSON.stringify(data)}\n`)
                        } else {
                            console.log(`助力失败:${JSON.stringify(data)}\n`)
                            resolve(false)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                //resolve(data);
            }
        })
    })
}


function taskPostUrl(functionId, body) {
    return {
        url: `${JD_API_HOST}?functionId=${functionId}`,
        body: `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${escape(JSON.stringify(body))}`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'Origin': 'https://wbbny.m.jd.com',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}


function taskPost(functionId, body) {
    return new Promise((resolve) => {
        $.post(taskPostUrl(functionId, body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${functionId} API请求失败，请检查网路重试`)
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