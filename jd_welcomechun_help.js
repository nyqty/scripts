/*
多余助力会给作者助力
击鼓迎春抽红包
入口：https://h5.m.jd.com/pb/014182900/46nLG86c4z4z7Na48CBoC6oX3MVd/index.html?babelChannel=ttt4
11 11 11 11 * jd_welcomechun_help.js
*/

const Env=require('./utils/Env.js');
const $=new Env('击鼓迎春-助力');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const getH5st=require('./function/krh5st');
const h5st_appid='5a721'

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;

let inviteId, inviteList = [],inviteObj={};
let ok_UserNames=[];


let TYUserName=[];
if( process.env.TYUserName ){
    TYUserName=process.env.TYUserName.split("@");
}else{
    console.log(`请设置变量 TYUserName 来指定用户，多个用@分隔`)
    return false
}

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

!(async() => {    
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }


    if(TYUserName.length) console.log(`\n开始获取指定用户的邀请码\n`);
    for (let i = 0; i < cookiesArr.length && TYUserName.length; i++) {
        cookie = cookiesArr[i];
        if (!cookie) continue
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        $.isLogin = true;
        $.nickName = '';
        message = '';
        //await TotalBean();
        if( !$.UserName || TYUserName.indexOf($.UserName)===-1 ) continue;
        console.log(`\n*******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

            if ($.isNode()) {
            await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
            }
            continue
        }
        getUA()
        res=await taskPost("party_inviteWindow", {"area":"0_0_0_0","showAssistorsSwitch":true});
        if(res && res.data && res.code==0){
            let {bizCode,bizMsg,result}=res.data
            if(bizCode==0){
                let p=result?.inviteCode
                if(p){
                    console.log(`当前邀请${result.assistNum}人，共获得${result.hongbaoSum}红包。\n邀请码：`+p)
                    inviteObj[$.UserName]=p;
                }
            }else console.log(`party_inviteWindow ${bizCode}:${bizMsg}`);
        }else{
            console.log("party_inviteWindow 错误：",JSON.stringify(res));
            break;
        }
        await $.wait(1000)
    }

    var helpObj={},helpMax=0;
    if ( inviteList.length || JSON.stringify(inviteObj) !== '{}' ) {
        if( TYUserName.length && JSON.stringify(inviteObj) !== '{}' ){
            console.log(`\n按照TYUserName顺序跳转助力顺序\n`)
            for(var i=0;i<TYUserName.length;i++){
                $.UserName=TYUserName[i];
                if( inviteObj[$.UserName] ){
                    inviteList.push({ pin: $.UserName, id: inviteObj[$.UserName] });
                }else{
                    console.log("助力码为空："+$.UserName)
                }
            }
        }
        for (let j = 0; j < inviteList.length; j++) {
            $.UserName == inviteList[j].pin;
            helpObj[$.UserName]=0;
        }
        inviteList.push({ pin: 'TY', id: 'ycXdOSZSbNpDrcPMzabLLqV-' });
        helpObj["TY"]=0;
        console.log(`\n\n为以下分享码助力：`)//${JSON.stringify(inviteList)}\n
        console.log(inviteList);console.log("\n")
    
        var millisecond,error_Hot=0,max=0,max_i=-1;
        for (let i = 0; i < cookiesArr.length && inviteList.length; i++) {
            cookie = cookiesArr[i];
            if (!cookie) continue
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            getUA()
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            console.log(`${new Date().toLocaleString()}`);
            if(max) max_i=max;
            error_Hot=0;
            for (let j = 0; j < inviteList.length; j++) {
                if ($.UserName == inviteList[j].pin) { console.log(`不能给自己助力，跳过`); continue; }
                inviteId = inviteList[j].id;
                //console.log(`给 ${inviteList[j].pin} 进行助力`);
                res = await taskPost("party_assistWindow",{"area":"0_0_0_0","inviteCode":inviteId});
                if ( res && res?.code === 0 && res?.data ) {
                    let {bizCode,bizMsg,result}=res['data'];
                    if( bizCode==0 ) console.log(`给 ${result.nickname} 进行助力`);
                    else{
                        console.log(`获取助力信息失败:${bizCode}:${bizMsg}`)
                        continue;
                    }
                }else{
                    console.log(`获取助力信息失败:${JSON.stringify(res)}`)
                    continue;
                }
                await $.wait(1000)
                res = await taskPost("party_assist",{"area":"0_0_0_0","inviteCode":inviteId,"uuid":$.UUID},true);
                if ( res && res?.code === 0 && res?.data ) {
                    let {bizCode,bizMsg}=res['data'];
                    if( bizCode==0 ){
                        console.log(`${bizMsg}`);
                        helpObj[$.UserName]++;
                        if(max_i) max_i--;
                        if(max_i==0){
                            console.log(`助力${max}次了，跳过`);
                            await $.wait(randomNum(2e3,3e3));break;
                        }
                        if( helpMax ){
                            if( helpObj[$.UserName]>=helpMax ){
                                ok_UserNames.push(inviteList[j].pin);
                                inviteList.splice(j, 1);j--;
                                console.log(`已到设置的最大助力${helpMax}个。`);
                            }
                        }
                    }else if( [-103].includes(bizCode) ){
                        //{"code":0,"data":{"bizCode":-103,"bizMsg":"不能为自己助力哦~","result":null,"success":false},"msg":"调用成功"}
                        console.log(`助力:${bizMsg}`)
                        continue
                    }else if( bizCode==-105 ){//你已经帮助太多人啦
                        console.log(`助力:${bizMsg}`)
                        break;
                    }else if( bizCode==-4001 ){//手速太快啦，慢一点~
                        error_Hot++;
                        if(error_Hot>2){
                            millisecond=randomNum(8e3,15e3);
                            console.log(`${bizMsg}，休息${(millisecond/1000).toFixed(1)}秒跳出！`);
                            await $.wait(millisecond);
                            break;
                        }
                    }else{
                        console.log(`助力错误:${bizCode}:${bizMsg}`)
                    }
                } else if(res?.code === 131600){//助力要排队哦，先去玩会吧
                    millisecond=randomNum(4e3,8e3);
                    console.log(`排队中~休息${(millisecond/1000).toFixed(1)}秒重试`);
                    j--;
                    await $.wait(millisecond);
                }else{
                    console.log(`助力失败:${JSON.stringify(res)}\n`)
                }
                millisecond=randomNum(4e3,8e3);
                console.log(`休息${(millisecond/1000).toFixed(1)}秒继续`);
                await $.wait(millisecond);
            }
            await $.wait(2000)
        }
    }

})()
.catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
    $.done();
})

function taskPostUrl(functionId, body,get='') {
    return {
        url: 'https://api.m.jd.com/',
        //body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0&appid=signed_wh5`+(get?"&"+get:"")+"&t="+new Date().getTime(),
        //&d_brand=Redmi&d_model=22081212C&partner=xiaomi001
        body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=android&clientVersion=11.4.2&appid=signed_wh5&&build=${$.Build}&osVersion=12&networkType=wifi&uuid=${$.UUID}`+(get?"&"+get:"")+"&t="+new Date().getTime(),
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'Origin': 'https://h5.m.jd.com',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://h5.m.jd.com/',
            'X-Requested-With': 'com.jingdong.app.mall'
        }
    }
}

async function taskPost(functionId, body,get='',is_h5st=false) {
    if(is_h5st){
        const h5st=await getH5st(h5st_appid,{'appid':'signed_wh5','functionId':functionId,'clientVersion':'11.4.2','client':'android','body':body});
        //console.log(h5st)
        if(get) get+="&";
        get+="h5st="+h5st;
    }
    return new Promise((resolve) => {
        $.post(taskPostUrl(functionId, body,get), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${functionId} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        resolve(data);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(false);
            }
        })
    })
}

function getUA() {
    $.Build = random(72222,99999);//98638 
    $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
    $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    //$.UA = `jdapp;android;11.4.2;;;appBuild/98638;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1673516247578%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22CJunCJvvZJqnZQOnZNGyYq%3D%3D%22%2C%22od%22%3A%22DNS5YwG5DQSnD2YyEQHuDG%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22CJunCJvvZJqnZQOnZNGyYq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; 22081212C Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36`;
    $.UA = `jdapp;android;11.4.2;;;appBuild/${$.Build};jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; 22081212C Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36`;
    //$.UA = `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`;
}

function random(min,max){
	return Math.floor(Math.random()*(max-min))+min;
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

function getUUID(x = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", t = 0) {
    return x.replace(/[xy]/g, function (x) {
      var r = (16 * Math.random()) | 0,
        n = "x" == x ? r : (3 & r) | 8;
        return (uuid = t ? n.toString(36).toUpperCase() : n.toString(36)), uuid;
    });
}

function randomNum(min, max) {
    if (arguments.length === 0) return Math.random()
    if (!max) max = 10 ** (Math.log(min) * Math.LOG10E + 1 | 0) - 1
    return Math.floor(Math.random() * (max - min + 1) + min);
}