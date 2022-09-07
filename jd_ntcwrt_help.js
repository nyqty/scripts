/*
农特产万人团助力 自写自用，车头来，9月7~25号结束
每账号只能助力三次，大约250个成功助力才一分钱，当然还有运费8元。puls会员有运费劵可减
设置变量 TYUserName 为指定账号助力，多个用@分隔
设置变量 NTCWRT_shareCodes 为指定助力码，多个用@分隔
活动口令：10帮我助力，一起0.01元抢爆/ 款农特产，【ιngヤ棟】！PBUOc1B0ES！

1 1 1 1 * jd_ntcwrt_help.js
cron:1 1 1 1 *
*/
const $ = new Env('农特产万人团助力');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';


let cookiesArr = [],cookie = '',shareCode,shareCodes = [],res

let TYUserName=[]
if( process.env.TYUserName ){
    TYUserName=process.env.TYUserName.split("@");
}

if( process.env.NTCWRT_shareCodes ){
    let NTCWRT_shareCodes=process.env.NTCWRT_shareCodes.split("@");
    Object.keys(NTCWRT_shareCodes).forEach((item) => {
        shareCodes.push({pin:"自定义账号"+(item+1),shareCode:NTCWRT_shareCodes[item]})
    })
}

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

!(async() => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }

    console.log(`农特产万人团助力 自写自用，车头来，9月7~25号结束
每账号只能助力三次，大约250个成功助力才一分钱，当然还有运费8元。puls会员有运费劵可减
设置变量 TYUserName 为指定账号助力，多个用@分隔
设置变量 NTCWRT_shareCodes 为指定助力码，多个用@分隔
活动口令：10帮我助力，一起0.01元抢爆/ 款农特产，【ιngヤ棟】！PBUOc1B0ES！`);

    await getUA()
    
    if(TYUserName.length){
        console.log(`\n******开始获取助力码*********\n`);
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                if( !$.UserName || TYUserName.indexOf($.UserName)===-1 ) continue;
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                res=await taskPost("wanrentuan_harvest_home",{});
                if( res && res.code==0 ){
                    if( res.data && res.data.bizCode==0 && res.data.success ){
                        let result=res.data.result;
                        if( result ){
                            if( result.isFullStep ){
                                console.log("已经完成邀请了，只需要${result.currentPrice}");
                            }else{
                                if(result.shareCode){
                                    console.log(`分享码：${result.shareCode}`);
                                    shareCodes.push({pin:$.UserName,shareCode:result.shareCode});
                                }
                                if(result.firstShared==false){
                                    console.log(`开始首次分享。`);
                                    //"currentPrice":"34.90",
                                    res=await taskPost("wanrentuan_harvest_do",{"type":"1"});
                                    if( !(res && res.code==0 && res.data && res.data.bizCode==0) ) console.log(JSON.stringify(res));
                                }
                            }
                        }else console.log(res.data.bizMsg);
                    }else console.log(res.data.bizMsg);
                }else console.log(res && res.msg?res.msg:res);
                await $.wait(1000)
            }
        }
    }

    if(shareCodes.length){
        console.log(`\n\n为以下分享码助力：${JSON.stringify(shareCodes)}\n`)
        for (let i = 0; i < cookiesArr.length && shareCodes .length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                for (let j = 0; j < shareCodes .length; j++) {
                    if( $.UserName==shareCodes[j].pin ){console.log(`不能给自己助力，跳过`);continue;} 
                    shareCode=shareCodes[j].shareCode;
                    console.log(`给 ${shareCodes[j].pin} 进行助力`)
                    try {
                        //log":"1662551218827~16NFiXVVJzlMDJCS3BHYjAxMQ==.c31GdVd3ekF/WnF/RzlSdn8hMhMqcigJHHNnRmtRbnkOdRxzNRstJA8IRTAXKDgxdiwrKAVyMxA8Rz0zPA==.d73169b0~3,2~0DB591F060459C31AB96E61129BEA78B3D379E621D0D07778DF97C3A2BE8329C~1egqcmw~C~ThJMXhMPa2UfE0FeVRELbhJcBhwDdxR1ehl cWodBB4IAwEZRBofE1EHFQV2GXZzH395BhQCHwUACB9FF20UEVZHXhoJABkSS0ATDxIJBQcHBQ0CAA0HAQYIBAQNARMZEk9WVRcKGkdFQURMVURTEhQRRlBRGgkTU1ZMR0RBRVkRHRdAXF0TD2sJAx0EARQLHQIcCh8AaBwaWVsXCgkfE1ZDGgkTVwIPA1cECQpSVFBRDgVXAAMJUAIMCV0BBwwHDwEHAwEaHxNbQBoJE2JZVgADFxwaRxMPAQ4FAwAFCQEADQgKBB0XWlMRCxdRGh8TU0BaEQsXW1J1fHYFT0ZbRnEJfVhWRQ1iY0IHQmITGRJWRRMPEn9cXlJcXRN4W1MWER0XXllFEw8SAQQEAwUaHxNGU0oRC24HCAMdAQAIbh0XQlcRC24SWREdF1EaHxNUEhQRUBccGlITGRJZER0XURpuHRdZV1ITDxJeVVdTVl5HRRccGlJbFwoaRhMZEltaEw8STwAfAB4MER0XU15sRxcKGgMAFxwaUVUXChpBUFtUV14MDHhBUmFMA3QRHRddUhELbgEUAx0FbRQRU1lfXxELF1EaHxNYQ18RCxdRGk4=~1f4webn"}
                        res=await taskPost("wanrentuan_harvest_assist",{"shareCode":shareCode,"sceneid":"wanrentuan_harvest","random":randomString(8),"log":""});                      
                        if ( res && res?.code === 0 && res?.data ) {
                            let bizCode=res['data']['bizCode'],bizMsg=res['data']['bizMsg'];
                            /*
                            0帮好友助力成功啦～
                            3已经帮过TA啦～
                            4好友人气太高，不需要助力啦～
                            5助力次数用完啦～
                            6抱歉，该口令已失效~
                            7活动太火爆啦～
                            */
                            if(bizCode===4 || bizCode===6){
                                console.log(bizMsg)
                                shareCodes .splice(j, 1)
                                j--
                                continue
                            }else if(bizCode==5){
                                console.log(bizMsg)
                                break;
                            }else console.log(`助力:${bizCode+bizMsg}`)
                            //console.log(`助力失败:${JSON.stringify(data)}\n`)
                        } else if( res?.code === -30001 ){//登录后才能参加活动哦
                            console.log(`登录失效！`);break;
                        }
                    }catch(e){
                        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
                    }
                    await $.wait(2000)
                }
                await $.wait(1000)
            }
        }
    }else{
        console.log(`\n没有分享码！`)
    }

})()
.catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })


function taskPostUrl(functionId, body) {
    return {
        url: `https://api.m.jd.com/?functionId=${functionId}`,
        body: `appid=signed_wh5&client=h5&clientVersion=1.0.0&functionId=${functionId}&body=${escape(JSON.stringify(body))}`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'Origin': 'https://h5.m.jd.com',
            'referer': 'https://h5.m.jd.com',
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
    $.UA = `jdapp;android;10.0.6;11;9363537336739353-2636733333439346;network/wifi;model/KB2000;addressid/138121554;aid/9657c795bc73349d;oaid/;osVer/30;appBuild/88852;partner/oppo;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; KB2000 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36`
}

function randomString(e) {
    e = e || 32;
    let t = "abcdefghkmnprstuvwxyzABCDEFGHKMNPRSTUVWXYZ0123456789",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
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

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}