/*
特物Z
cron:14 21 14 1 *
14 21 14 1 * jd_superBrandz.js

 */
const Env=require('./utils/Env.js');
const $ = new Env('特物Z_超级');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => { cookiesArr.push(jdCookieNode[item]) })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
    $.UUID = getUUID('xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx');
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.beans = 0
            message = ''
            $.cando = true
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
            await getid("superBrandTaskList", "hall_1111")
						await doTask1();
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

//获取活动信息
function getid(functionid, source) {
    return new Promise(async (resolve) => {
        const options = taskPostUrl(functionid, `{"source":"${source}","activityId":1012465}`)
        //  console.log(options)
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    // console.log(data.data.result)
                    if (data.data && data.code === "0" && data.data.result) {
                        $.result = data.data.result.taskList || []
                        for(const z of $.result){
													$.actid = '1012465'
													$.pid = 'JFMx7ke6h6KejTzCXQTfpNi8v1L'
													$.source = 'hall_1111'
													$.assignmentName = z.assignmentName
													$.assignmentType = z.assignmentType
													$.encryptAssignmentId = z.encryptAssignmentId
													console.log("去做任务" + $.assignmentName)
													await doTask();
												}
                    } else {
                        console.log("获取失败")
                        $.cando = false
                        resolve()
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}		

function doTask() {
    return new Promise(async (resolve) => {
        let body = `{"source":"${$.source}","activityId":${$.actid},"encryptProjectId":"${$.pid}","completionFlag":1,"encryptAssignmentId":"${$.encryptAssignmentId}","assignmentType":${$.assignmentType},"actionType":0}`
        const options = taskPostUrl(`superBrandDoTask`, body)
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
										// console.log(`${JSON.stringify(data)}`);
                    if (data && data.code === "0") {
                        if (data.data.bizCode === "0") {
															$.results = data.data.result.rewards || []
															for(const z of $.results){
															krtype = z.awardType
															if(z.awardType == 2) {
																console.log(`获得：${z.awardName}`)
															}else if(z.awardType == 3) {
																console.log(`获得：️${z.beanNum} 豆子`)
															}else if(z.awardType == 6){
																console.log(`获得：${z.awardName}`)
															}else if(z.awardType == 5){
																console.log(`获得：${z.awardName}`)
															}else{
																console.log(`不知道获得了啥`)
																console.log(data)
															}
														}
                            console.log("任务成功啦~")
                        } else {
                            console.log(data.data.bizMsg)
                        }
                        resolve(data.data.bizCode)
                    } else {
                        console.log(data)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}
function doTask1() {
    let opt = {
        url: `https://api.m.jd.com/api?functionId=superBrandDoTask&appid=ProductZ4Brand&client=wh5&t=1673920844810&body=%7B%22source%22%3A%22hall_1111%22%2C%22activityId%22%3A1012471%2C%22completionFlag%22%3A1%2C%22encryptProjectId%22%3A%223MhsbG1ZeDpqjoEaU2SEw38gdavD%22%2C%22encryptAssignmentId%22%3A%22379wQ992MFewWwiKrkfrNfmtbVwH%22%2C%22assignmentType%22%3A0%2C%22actionType%22%3A0%7D`,
        headers: {
            'Origin': 'https://prodev.m.jd.com',
            'User-Agent': `jdapp;android;9.4.4;10;${$.UUID};network/wifi;ADID/${$.ADID};model/M2006J10C;aid/3b78ecc3f490c7ba;oaid/7d5870c5a1696881;osVer/29;appBuild/85576;psn/3b78ecc3f490c7ba|541;psq/2;uid/3b78ecc3f490c7ba;adk/;ads/;pap/JA2015_311210|9.2.4|ANDROID 10;osv/10;pv/548.2;jdv/0|iosapp|t_335139774|appshare|CopyURL|1606277982178|1606277986;ref/com.jd.lib.personal.view.fragment.JDPersonalFragment;partner/xiaomi001;apprpd/MyJD_Main;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36`,
            'Cookie': cookie
        }
    }
    return new Promise(async (resolve) => {
        $.post(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
										// console.log(`${JSON.stringify(data)}`);
                    if (data && data.code === "0") {
                        if (data.data.bizCode === "0") {
															$.results = data.data.result.rewards || []
															for(const z of $.results){
															krtype = z.awardType
															if(z.awardType == 2) {
																console.log(`获得：${z.awardName}`)
															}else if(z.awardType == 3) {
																console.log(`获得：️${z.beanNum} 豆子`)
															}else if(z.awardType == 6){
																console.log(`获得：${z.awardName}`)
															}else if(z.awardType == 5){
																console.log(`获得：${z.awardName}`)
															}else{
																console.log(`不知道获得了啥`)
																console.log(data)
															}
														}
                            console.log("任务成功啦~")
                        } else {
                            console.log(data.data.bizMsg)
                        }
                        resolve(data.data.bizCode)
                    } else {
                        console.log(data)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}



function taskPostUrl(functionid, body) {
    const time = Date.now();
    return {
        url: `https://api.m.jd.com/api?functionId=${functionid}&appid=ProductZ4Brand&client=wh5&t=${time}&body=${encodeURIComponent(body)}`,
        body: "",
        headers: {
            Accept: "application/json,text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            Connection: "keep-alive",
            Cookie: cookie,
            Host: "api.m.jd.com",
            Referer: "https://prodev.m.jd.com/mall/active/NrHM6Egy96gxeG4eb7vFX7fYXf3/index.html?activityId=1000007&encryptProjectId=cUNnf3E6aMLQcEQbTVxn8AyhjXb&assistEncryptAssignmentId=2jpJFvC9MBNC7Qsqrt8WzEEcVoiT&assistItemId=S5ijz_8ukVww&tttparams=GgS7lUeyJnTGF0IjoiMzMuMjUyNzYyIiwiZ0xuZyI6IjEwNy4xNjA1MDcifQ6%3D%3D&lng=107.147022&lat=33.255229&sid=e5150a3fdd017952350b4b41294b145w&un_area=27_2442_2444_31912",
            "User-Agent": `jdapp;android;9.4.4;10;${$.UUID};network/wifi;ADID/${$.ADID};model/M2006J10C;aid/3b78ecc3f490c7ba;oaid/7d5870c5a1696881;osVer/29;appBuild/85576;psn/3b78ecc3f490c7ba|541;psq/2;uid/3b78ecc3f490c7ba;adk/;ads/;pap/JA2015_311210|9.2.4|ANDROID 10;osv/10;pv/548.2;jdv/0|iosapp|t_335139774|appshare|CopyURL|1606277982178|1606277986;ref/com.jd.lib.personal.view.fragment.JDPersonalFragment;partner/xiaomi001;apprpd/MyJD_Main;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36`
        }
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

function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36)
        }
        return uuid;
    });
}