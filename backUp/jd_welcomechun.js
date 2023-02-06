/*
击鼓迎春抽红包
入口：https://h5.m.jd.com/pb/014182900/46nLG86c4z4z7Na48CBoC6oX3MVd/index.html?babelChannel=ttt4
2 12,20 * * * jd_welcomechun.js
*/

const Env=require('./utils/Env.js');
const $=new Env('击鼓迎春');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const getH5st=require('./function/krh5st');
const h5st_appid='5a721'

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;

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
    
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (!cookie) continue
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        $.isLogin = true;
        $.nickName = '';
        message = '';
        //await TotalBean();
        console.log(`\n*******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

            if ($.isNode()) {
            await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
            }
            continue
        }
        getUA()
        res=await taskPost("party_home", {"area":"0_0_0_0"});
        if(res && res.data && res.code==0){
            let {bizCode,bizMsg,result}=res.data
            if(bizCode==0){
                $.coupon=result.awardInfo.coupon
                $.lotteryTimes=result.lotteryInfo.lotteryTimes;
                console.log(`当前红包${result.awardInfo?.hongbao}，击鼓${$.coupon}次可击鼓${$.lotteryTimes}。(${result.lotteryFillTimes})`);
                //"lotteryCountDown":8,"lotteryFillTimes":10,
                //console.log(JSON.stringify(result));
                if(result.needSendWelcomeHongbao){
                    console.log("领取欢迎红包");
                    //20230114181226535%3B7uu4u77ljf8v0442%3B5a721%3Btk02wbe221bf518nhZhSbeMEDPhuLVjZZg9KrfDl70TtyHi1cnSGyMlbq%2FOmHesHghGo9TNPB4%2BjV8zB%2F4iZOU%2BYQ%2Ban%3Ba6a1dc9365781935bc4bb648d454315186534005cfd8412700005be1e7c2a16e%3B400%3B1673691146535%3B9f6f03516f2946977ccb57d9c252fa77e14e0735072fb4673b8a44e169d34266e97fd675aa50724b54791ec0119c6b0d4ec4355020416d9e141269ee1ec8346ca9b99fecddc35e691dfda86d8dc01224698eefd7afc4589ebb87fa5e38d14238167e4cfc0e4183244bef34befacff1555c70f68e98a102420dad3c98838dfac71e0c9f8bfe1649804f860c97dd6bdbe1165a4b634245f0a85ee52bfe67419ce5
                    //"np2ZiBbQwR3Jp2wS" 安卓16位
                    res=await taskPost("party_welcome", {"area":"0_0_0_0","uuid":$.UUID},"",true);
                    if(res && res.data && res.code==0){
                        let {bizCode,bizMsg,result}=res.data
                        if(bizCode==0){
                            console.log(`${result.title}`);//console.log(JSON.stringify(result));
                            award(result.award);
                        }else console.log(`party_welcome ${bizCode}:${bizMsg}`);
                    }else{
                        console.log("party_welcome错误：",JSON.stringify(res));
                    }
                    await $.wait(1000)
                }
                while($.lotteryTimes){
                    $.lotteryTimes--;
                    await party_lottery();
                }
                
            }else console.log(`party_home ${bizCode}:${bizMsg}`);
        }else{
            console.log("party_home错误：",JSON.stringify(res));
            break;
        }
        await $.wait(1000)
    }

})()
.catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
    $.done();
})

function award(cras) {
    if(cras) for(let u=0,cl=cras.length,cra;u<cl;u++){
        cra=cras[u];
        if(cra.type==1){
            //满199元可用-20(仅可购买京东健康部分商品)
            console.log(`优惠券：${cra.usageThreshold}-${cra.amount}(${cra.useRange})`);//"createTime":1673693461359,
        }else if(cra.type==2){
            console.log(`红包：${cra.amount}`);
        }else if(cra.type==5){
            console.log(`文字祝福：${cra.text1+','+cra.text2}`);
        }else{
            console.log(JSON.stringify(cra));
        }
    }
}
async function party_lottery() {
    console.log(`开始击鼓~`);
    let res=await taskPost("party_lottery", {"area":"0_0_0_0","uuid":$.UUID},"",true);
    if(res && res.data && res.code==0){
        let {bizCode,bizMsg,result}=res.data
        if(bizCode==0){
            $.lotteryTimes=result.restLotteryTimes;
            $.coupon=result.awardInfo?.coupon;
            //console.log(JSON.stringify(result));
            console.log(`${result.title}当前红包${result.awardInfo?.hongbao}，击鼓${$.coupon}次`)
            award(result.award);//result.currentRoundAward?result.currentRoundAward:
        }else if(bizCode==-302){
            console.log(bizMsg);
        }else console.log(`party_lottery ${bizCode}:${bizMsg}`);
    }else console.log("party_lottery错误：",JSON.stringify(res));
}

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