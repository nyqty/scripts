/*
宠汪汪喂食(默认20g)
更新时间：2022-10-14
活动入口：京东APP我的-更多工具-宠汪汪
33 0-23/4 * * * jd_joy_feedPets.js
*/
const Env=require('./utils/Env.js');
const $ = new Env('宠汪汪喂食');
const Slider = require('./utils/JDJRValidator_Pure');
//$.get = Slider.injectToRequest2($.get.bind($));
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
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
let jdNotify = true;//是否开启静默运行。默认true开启
let message = '', subTitle = '';
let FEED_NUM = 20;   //喂食数量默认20g,可选 10,20,40,80 , 其他数字不可.
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
            await $.wait(100);
            await TotalBean();
            console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}******\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            message = '';
            subTitle = '';
            if ($.isNode()) {
                if (process.env.JOY_FEED_COUNT) {
                    if ([0, 10, 20, 40, 80].indexOf(process.env.JOY_FEED_COUNT * 1) > -1) {
                        FEED_NUM = process.env.JOY_FEED_COUNT ? process.env.JOY_FEED_COUNT * 1 : FEED_NUM;
                    } else {
                        console.log(`您输入的 JOY_FEED_COUNT 为非法数字，请重新输入`);
                    }
                }
            }
            $.validate = '';
            $.validate = await Slider.injectToRequest()
            if (!$.validate) {console.log('滑块验证失败过多，跳出');continue};
            await feedPets(FEED_NUM);//喂食
            //await ThreeMeals();//三餐
            await showMsg();
            await $.wait(2000);
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
function showMsg() {
    //$.log(`\n${message}\n`);
    jdNotify = $.getdata('jdJoyNotify') ? $.getdata('jdJoyNotify') : jdNotify;
    if (!jdNotify || jdNotify === 'false') {
        //$.msg($.name, subTitle, `【京东账号${$.index}】${$.UserName}\n` + message);
    }
}
function feedPets(feedNum) {
    return new Promise(async resolve => {
        console.log(`\n您设置的喂食数量:${FEED_NUM}g\n`);
        if (FEED_NUM === 0) { console.log(`跳出喂食`); resolve(); return }
        //console.log(`实际的喂食数量:${feedNum}g\n`);
        const url = `https://api.m.jd.com/api?client=android&clientVersion=11.2.2&appid=jdchoujiang_h5&t=1665740196279&functionId=feed&body=${encodeURIComponent(JSON.stringify({ "feedCount": feedNum, "validate": $.validate, "reqSource": "h5" }))}&h5st=&reqSource=h5`;
        const options = {
            url,
            headers: {
                "Accept": "*/*",
                "Origin": "https://h5.m.jd.com",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                "Referer": "https://h5.m.jd.com/",
                "Accept-Encoding": "gzip, deflate, br",
                "Cookie": cookie,
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                $.data = JSON.parse(data);
                if ($.data.success) {
                    if ($.data.errorCode === 'feed_ok') {
                        console.log(`喂食成功: ${feedNum}g\n`)
                        message += `【喂食成功】${feedNum}g\n`;
                    } else if ($.data.errorCode === 'time_error') {
                        console.log('喂食失败：正在食用')
                        message += `【喂食失败】您的汪汪正在食用\n`;
                    } else if ($.data.errorCode === 'food_insufficient') {
                        console.log(`当前喂食${feedNum}g狗粮不够, 现为您降低一档次喂食\n`)
                        if ((feedNum) === 80) {
                            feedNum = 40;
                        } else if ((feedNum) === 40) {
                            feedNum = 20;
                        } else if ((feedNum) === 20) {
                            feedNum = 10;
                        } else if ((feedNum) === 10) {
                            feedNum = 0;
                        }
                        // 如果喂食设置的数量失败, 就降低一个档次喂食.
                        if ((feedNum) !== 0) {
                            await feedPets(feedNum);
                        } else {
                            console.log('您的狗粮已不足10g')
                            message += `【喂食失败】您的狗粮已不足10g\n`;
                        }
                    } else {
                        console.log(`其他状态${$.data.errorCode}`)
                    }
                } else {
                    console.log(`喂食失败:${JSON.stringify($.data)}\n`);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve($.data);
            }
        })
    })
}

//三餐
function ThreeMeals() {
    return new Promise(resolve => {
        const url = `https://jdjoy.jd.com/common/pet/getFood?taskType=ThreeMeals&reqSource=h5&invokeKey=q8DNJdpcfRQ69gIx` + $.validate
        let lkt = new Date().getTime()
        let lks = $.md5('' + 'q8DNJdpcfRQ69gIx' + lkt).toString()
        const options = {
            url,
            headers: {
                "Host": "jdjoy.jd.com",
                "Accept": "*/*",
                "Origin": "https://h5.m.jd.com",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                "Referer": "https://h5.m.jd.com/",
                "Accept-Encoding": "gzip, deflate, br",
                "Cookie": cookie,
                "lkt": lkt,
                "lks": lks
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                data = JSON.parse(data);
                if (data.success) {
                    if (data.errorCode === 'received') {
                        console.log(`三餐结果领取成功`)
                        message += `【三餐】领取成功，获得${data.data}g狗粮\n`;
                    }
                }
            } catch (e) {
                $.logErr(resp, e);
            } finally {
                resolve(data);
            }
        })
    })
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
function TotalBean() {
    return new Promise(resolve => {
        const options = {
            url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
            headers: {
                "Host": "me-api.jd.com",
                "Accept": "*/*",
                "User-Agent": "ScriptableWidgetExtension/185 CFNetwork/1312 Darwin/21.0.0",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Cookie": cookie
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        console.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}