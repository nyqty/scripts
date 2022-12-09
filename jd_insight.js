/*
cron "35 11 * * *" jd_insight.js, tag:京洞察问卷通知

by 青蛙
 */
const Env=require('./utils/Env.js');
const $ = new Env('京东调研问卷 京洞察')
const notify = $.isNode() ? require('./sendNotify') : ''
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : ''
//IOS等用户直接用NobyDa的jd cookie

let cookiesArr = [], cookie = '', message = '', messageTitle = '', messageBottom = ''

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
    }
    if(JSON.stringify(process.env).indexOf('GITHUB')>-1) process.exit(0)
}else {
    let cookiesData = $.getdata('CookiesJD') || '[]'
    cookiesData = jsonParse(cookiesData)
    cookiesArr = cookiesData.map(item => item.cookie)
    cookiesArr.reverse()
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')])
    cookiesArr.reverse()
    cookiesArr = cookiesArr.filter(item => item !== '' && item !== null && item !== undefined)
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for (let i = 0; i < cookiesArr.length && true; i++) {
        if (cookiesArr[i]) {
            $.index = i + 1;
            $.cookie = cookiesArr[i];
            $.nickName = ''
            $.UserName = decodeURIComponent($.cookie.match(/pin=([^; ]+)(?=;?)/) && $.cookie.match(/pin=([^; ]+)(?=;?)/)[1]);
            $.isLogin = true;
            console.log(`\n=====开始【京东账号${$.index}】${$.nickName || $.UserName}=====\n`);
            await getUA()
            await TotalBean();
            if (!$.isLogin) {
                console.log("Cookie已失效. . .")
                continue
            }
            await run()
        }
    }
    await showMsg()

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


function showMsg() {
    return new Promise(async resolve => {
        console.log('\n运行完毕')
        if(message){
            $.msg($.name, '', `${message}`)
            if ($.isNode()){
                // await notify.sendNotify(`${$.name}`, `${message}`)
            }
        }
        resolve()
    })
}

async function run() {
    try {
        $.surveyList = []
        await takePostRequest('有奖问答列表');
        if($.surveyList.length > 0){
            let n = 1
            for(let s of $.surveyList){
                console.log(`${n}、【${s.title}】 ${s.subTitle}\n${s.answerUrl}\n`)
                message += `【账号${$.index}】${$.UserName}\n${n}、【${s.title}】 ${s.subTitle}\n${s.answerUrl}\n`
                $.answerUrl = s.answerUrl
                $.survey_id = ''
                $.short_code = ''
                await takePostRequest('有奖问答页面');
                // console.log($.survey_id,$.short_code)
                if($.survey_id && $.short_code){
                    await takePostRequest('有奖问答题目');
                    console.log()
                }
                n++
            }
        }else{
            console.log("无任何信息")
        }
    } catch (e) {
        console.log(e)
    }
}

async function takePostRequest(type) {
    if ($.outFlag) return
    let url = '';
    let body = ``;
    let method = 'POST'
    let headers = ''
    switch (type) {
        case '有奖问答列表':
            url = `https://answer.jd.com/community/survey/list`;
            method = 'GET'
            headers = {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Cookie": $.cookie,
                "Origin": `https://prodev.m.jd.com`,
                "Referer": `https://prodev.m.jd.com/mall/active/2TADa7HkFatzGyeNG6KWZFyh96wM/index.html`,
                "User-Agent": $.UA
            }
            break;
        case '有奖问答页面':
            url = $.answerUrl;
            method = 'GET'
            headers = {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Cookie": $.cookie,
                "User-Agent": $.UA
            }
            break;
        case '有奖问答题目':
            url = `https://answer.jd.com/answer/getSurveyDetail?surveyId=${$.survey_id}&shortCode=${$.short_code}`;
            method = 'GET'
            headers = {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Cookie": $.cookie,
                "Referer": $.answerUrl,
                "User-Agent": $.UA
            }
            break;
        default:
            console.log(`错误${type}`);
    }
    if(!url) return
    let myRequest = getPostRequest(url, body, headers, method);
    return new Promise(async resolve => {
        $[method.toLocaleLowerCase()](myRequest, async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.toStr(err, err)}`)
                    console.log(`${type} API请求失败，请检查网路重试`)
                } else {
                    await dealReturn(type, data);
                }
            } catch (e) {
                console.log(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

async function dealReturn(type, data) {
    let res = ''
    try {
        if (type != 'accessLogWithAD' || type != 'drawContent') {
            if (data) {
                res = $.toObj(data,data);
            }
        }
    } catch (e) {
        console.log(`${type} 执行任务异常`);
        console.log(data);
        $.runFalag = false;
    }
    try {
        switch (type) {
            case '有奖问答列表':
                if (typeof res == 'object') {
                    if (res['messages'] && res['result'] == true && res['messages']['list']) {
                        for(let i of res['messages']['list']){
                            if(i.type == 1){
                                $.surveyList = i.surveyList;
                            }
                        }
                    } else {
                        console.log(`${type}-> ${data}`);
                    }
                } else {
                    console.log(`${type}-> ${data}`);
                }
                break;
            case '有奖问答页面':
                // console.log(data)
                try{
                    $.survey_id = data.match(/id="?survey-id"? value="?([^>]+)"?/)[1]
                } catch(e){}
                if(!$.survey_id){
                    try{
                        $.survey_id = data.match(/surveyId: ?['"]([^'"]+)['"]/)[1]
                    } catch(e){}
                }
                try{
                    $.short_code = data.match(/id="?short-code"? value="?([^>]+)"?/)[1]
                } catch(e){}
                break;
            case '有奖问答题目':
                // console.log(data)
                let index1 = []
                try{
                    index1 = res.messages.jsonStr.pages
                } catch(e){}
                for(let i of index1){
                    for(let q of i.questions){
                        let arr = []
                        for(let o in q.options){
                            let arr1 = q.options[o]
                            if(arr1.goto == '-2') arr.push(delhtml(arr1.text))
                        }
                        if(arr.length > 0) console.log("题目："+delhtml(q.title)+"\n  不要选："+arr.join("\n        "))
                    }
                }
                break;
            default:
                console.log(`${type}-> ${data}`);
        }
        if (typeof res == 'object') {
            if (res.errorMessage) {
                if (res.errorMessage.indexOf('火爆') > -1) {
                    $.hotFlag = true
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}
function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
            headers: {
                Host: "me-api.jd.com",
                Accept: "*/*",
                Connection: "keep-alive",
                Cookie: $.cookie,
                "User-Agent": $.UA,
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        let res = $.toObj(data,data);
                        if(typeof res == 'object'){
                            if (res['retcode'] === "1001") {
                                $.isLogin = false; //cookie过期
                                return;
                            }
                            if (res['retcode'] === "0" && res.data && res.data.hasOwnProperty("userInfo")) {
                                $.nickName = res.data.userInfo.baseInfo.nickname;
                            }
                        }
                    } else {
                        $.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}

function getPostRequest(url, body, headers = '', method = "POST") {
    let headers_only = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": $.cookie,
        "User-Agent": $.UA
    }
    if(!headers){
        headers = headers_only
    }
    // console.log(headers)
    // console.log(headers.Cookie)
    const options = { url: url, method: method, headers: headers, body: body, timeout: 10000 };
    if(method == "GET"){
        delete options.body
    }
    return options
}

async function getUA() {
    $.UA = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36`
}

function delhtml(text){
    return text && text.replace(/<\/?[\w \-"=:(),;+]+>/g,'').trim() || text
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