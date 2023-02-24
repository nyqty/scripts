/**
cron 59 9 * * * jd_ddaxc_qdd.js
*/
const Env = require('./utils/Env.js');
const $ = new Env('东东爱消除-抢豆豆');
const notify = $.isNode() ? require('./sendNotify.js') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let exchangeName = $.isNode() ? (process.env.EXCHANGE_EC ? process.env.EXCHANGE_EC : '京豆*1888') : ($.getdata('JDEC') ? $.getdata('JDEC') : '京豆*1888')

CryptoJS = require('crypto-js')

let ACT_ID = 'A_112790_R_1_D_20201028'
//Node.js用户请在jdCookie.js处填写京东ck;
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

function obj2param(obj) {
    let str = "";
    for (let key in obj) {
        if (str !== "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str
}

!(async () => {

    var body={
        "__data__":"8pCQZBqBXzZURB1MRi5eHiHe1em1jlO4zOJ+VIIIyTbFDGc7ajyH6W796FMFb8jJYLhG1CmsSJcJ3J2lQQmj38UdrUOdiy9UnfEmsH9ymp676WlhPaFvjP5IdlKlnlBvkvkTxXTqHbI1sfi4zsT0RlhINnxpuiIC+lwvfuQEzSDOxIp5oB51hOEHUNGQHS8JJdSh9J2XTdlYw2jJiBw//+O0gWSBm4+96dZ1Jyljeo1MwDTVCl0CmfdqjTjGhf1mdyRx17KzLs0GdT2y0qvPqQ==",
        "__iv__":"487f7b22f68312d2",
        "__id__":"7591669"
    }

    var key=CryptoJS.MD5(body.id).toString().substr(0,16)
    console.log(key)
    var r = CryptoJS.AES.decrypt(
        CryptoJS.enc.Utf8.parse(body.data), CryptoJS.enc.Utf8.parse( key ), {
        iv: CryptoJS.enc.Utf8.parse(body.__iv__),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log(r)
    

    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', { "open-url": "https://bean.m.jd.com/" });
        return;
    }

    $.shareCodesArr = []
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            //await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/`, { "open-url": "https://bean.m.jd.com/" });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                } else {
                    $.setdata('', `CookieJD${i ? i + 1 : ""}`);//cookie失效，故清空cookie。$.setdata('', `CookieJD${i ? i + 1 : "" }`);//cookie失效，故清空cookie。
                }
                continue
            }
            await jdBeauty()
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

async function jdBeauty() {
    $.reqId = 1
    await getIsvToken()
    await getIsvToken2()
    await getActInfo()
    await marketGoods()
}

// 获得IsvToken
function getIsvToken() {
    return new Promise(resolve => {
        //POST h2
        $.post(jdUrl('encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79'), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err},${jsonParse(resp.body)['message']}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if(data.success && data.data){
                            $.lkEPin = data.data.lkEPin;
                            $.lkToken = data.data.lkToken;
                        }else console.log(`getIsvToken 错误：${data.errorCode+data.errorMessage}`)
                        
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

// 获得对应游戏的访问Token
function getIsvToken2() {
    return new Promise(resolve => {
       //h2
        $.post(jdUrl('user/token?appId=dafbe42d5bff9d82298e5230eb8c3f79&client=m&url=pengyougou.m.jd.com'), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err},${jsonParse(resp.body)['message']}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        $.token = data.data
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

function getActInfo(inviter = null) {
    let body = {
        "inviter": inviter,
        "activeId":ACT_ID,"refid":"wojing",
        //"lkEPin": $.lkEPin,
        "lkToken":$.lkToken,
        "token":$.token,//"AAFj4l0uADCN8OgtvOA0H0PfSKwWlAA-Z2FuMNgeaKsVXmKWfaV18TPpRgUI6_vv-WxfZ9PuaWQ",
        "returnurl":"https://prodev.m.jd.com/mall/active/448KZiLTkqbPBuhS7nK5rJsrLHGD/index.html?babelChannel=ttt2",
        "tttparams":"7fuwkeyJhZGRyZXNzSWQiOjIwODEwNTMxMDUsImRMYXQiOjAsImRMbmciOjAsImdMYXQiOiIyOC4yOTc4IiwiZ0xuZyI6IjEwNS4yNCIsImdwc19hcmVhIjoiMjJfMjAwNV8zNjMxNV81NzIxMiIsImxhdCI6MjguNzYxMTAxLCJsbmciOjEwNC42MTc3NjcsIm1vZGVsIjoiMjIwODEyMTJDIiwicG9zTGF0IjoiMjguMjk3OCIsInBvc0xuZyI6IjEwNS4yNCIsInByc3RhdGUiOiIwIiwidW5fYXJlYSI6IjIyXzIwMDVfMjAxMF8zNjQ2Mi5J9",
        "babelChannel":"ttt2","location":"22-2005-36315","deviceType":"h5","scene":"3","source":"wojing"
    }
    return new Promise(resolve => {
        $.post(taskUrl("platform/active/role/login", body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (!inviter) {
                            $.info = data.info
                            $.id = data.id
                            $.authcode = data.authcode
                            $.to = data.token
                            $.money = JSON.parse(data.info.platform)['money']
                            console.log(`您的好友助力码为：${$.id}`)
                            console.log(`当前星星：${$.money}`)

                            $.pltId=data.info.pltId
                            // SecrectUtil2.InitEncryptInfo(data.token, data.info.pltId)
                            await checkLogin()
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

function checkLogin() {
    return new Promise(resolve => {
        $.post(taskUrl("eliminate_jd/game/local/logincheck", {
            info: JSON.stringify($.info),
            "reqsId": $.reqId++
        }), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        $.gameId = data.role.gameId
                        $.gameToken = data.token
                        $.strength = data.role.items['8003']
                        console.log(`当前体力：${$.strength}`)
                        // console.log(JSON.stringify(data))
                        $.curLevel = data.role.gameInfo.levelId || 40103
                        $.not3Star = []
                        for (let level of data.role.allLevels) {
                            if (level.maxStar !== 3) {
                                $.not3Star.push(level.id)
                            }
                        }
                        if (data.role.allLevels.length)
                            $.level = parseInt(data.role.allLevels[data.role.allLevels.length - 1]['id'])
                        else
                            $.level = 1
                        if ($.not3Star.length)
                            console.log(`当前尚未三星的关卡为：${$.not3Star.join(',')}`)
                        // SecrectUtil.InitEncryptInfo($.gameToken, $.gameId)
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

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function marketGoods() {
    let body = {
        "id": $.id,
        "activeid": ACT_ID,
        "token": $.to,
        "authcode": $.authcode
    }
    body={
        "__data__": "i62rhkVn5+xA484/mPlhczGYIT24qHsGhPc+iTB/lYsQ9u7EKDt7HsF8868ve0Bbcoaunr7T026PxWgReV3TC03gMx4mAqV71aHoDXkkM9Ou/AmkdbMl59yUlHho/67brBdlppLjgQkCxt6I68JW+Cg5gSF9+fPI5QrgFbJnGQWkbrvz77vF8FhtSeUZlD/fg9kG0uzSmE3/txxujOKKl5zTwtHRsS0ad3spWy91wy2CyiUeq7FrNrSIFm5OD0wJ",
        "__iv__": "487f7b22f68312d2",
        "__id__": $.pltId
    }

    return new Promise(resolve => {
        $.post(taskUrl("/platform/active/role/marketgoods", body),
            async (err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${err}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data)
                            if (data.code === 0) {
                                for (let vo of data.list) {
                                    if (vo.name === exchangeName) {
                                        let cond = vo['res']['asConsume'][0].split(',')
                                        if (vo['left'] === 1 && vo['count'] !== 0 && cond[0] === 'X028' && parseInt(cond[1]) <= $.money) {
                                            await buyGood(vo['res']['sID'])
                                        }
                                    }
                                }
                            } else {
                                console.log(`任务完成失败，错误信息：${JSON.stringify(data)}`)
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

function buyGood(consumeid) {
    let body = {
        "consumeid": consumeid,
        "id": $.id,
        "activeId": ACT_ID,
        "token": $.to,
        "authcode": $.authcode
    }
    body={
        "__data__":"8pCQZBqBXzZURB1MRi5eHiHe1em1jlO4zOJ+VIIIyTbFDGc7ajyH6W796FMFb8jJYLhG1CmsSJcJ3J2lQQmj38UdrUOdiy9UnfEmsH9ymp676WlhPaFvjP5IdlKlnlBvkvkTxXTqHbI1sfi4zsT0RlhINnxpuiIC+lwvfuQEzSDOxIp5oB51hOEHUNGQHS8JJdSh9J2XTdlYw2jJiBw//+O0gWSBm4+96dZ1Jyljeo1MwDTVCl0CmfdqjTjGhf1mdyRx17KzLs0GdT2y0qvPqQ==",
        "__iv__":"487f7b22f68312d2",
        "__id__":"7591669"
    }
    return new Promise(resolve => {
        $.post(taskUrl("/platform/active/role/marketbuy", body),
            async (err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${err}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    } else {
                        /*{
  "__data__": "uBxIcNMkea/Ong7iS+dsPgha02UNJZ6Td21AEWRijQCc6Mi2cbfxhnrIwyosnlowJ7RxDna024PYfN8rKFnyu1ldIU41yCkPWeVLfXIbM+jcZG2M96LT7tduvdViTzvQQb4YFJ8Zm82r5Hlcpljn75Wl9cV+CT3DwrXglb1dymM\u003d",
  "__iv__": "4jQ3fgLYxR74u4Dk"
} */
                        if (safeGet(data)) {
                            data = JSON.parse(data)
                            if (data.code === 0) {
                                console.log(`商品兑换成功，获得${data.item[0].itemid === 'JD29' ? '京豆' : '未知奖品'} * ${data.item[0].count}`)
                            } else {
                                console.log(`任务完成失败，错误信息：${JSON.stringify(data)}`)
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

function taskUrl(functionId, body = {}, decrypt = false) {
    return {
        url: `https://jd.moxigame.cn/${functionId}`,
        body: decrypt ? body : JSON.stringify(body),
        headers: {
            'Host': 'jd.moxigame.cn',
            'Connection': 'keep-alive',
            'Content-Type': decrypt ? 'application/x-www-form-urlencoded' : 'application/json',
            Accept: "*/*",
            Origin: "https://game-cdn.moxigame.cn",
            "X-Requested-With": "com.jingdong.app.mall",
            "Sec-Fetch-Site": "same-site",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            Referer: "https://game-cdn.moxigame.cn/",//https://game-cdn.moxigame.cn/eliminateJD/index.html?activeId=A_112790_R_1_D_20201028
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0") : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
        }
    }
}
//User-Agent: jdapp;android;11.4.4;;;appBuild/98651;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1675779374699%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJC%3D%22%2C%22ad%22%3A%22CJunCJvvZJqnZQOnZNGyYq%3D%3D%22%2C%22od%22%3A%22DNS5YwG5DQSnD2YyEQHuDG%3D%3D%22%2C%22ov%22%3A%22CzC%3D%22%2C%22ud%22%3A%22CJunCJvvZJqnZQOnZNGyYq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36

function jdUrl(functionId, body = '') {
    return {
        url: `https://jdjoy.jd.com/saas/framework/${functionId}`,
        body: body,
        headers: {
            'Host': 'jdjoy.jd.com',
            origin: "https://prodev.m.jd.com",
            "x-requested-with": "com.jingdong.app.mall",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://prodev.m.jd.com/mall/active/448KZiLTkqbPBuhS7nK5rJsrLHGD/index.html?babelChannel=ttt2&tttparams=7fuwkeyJhZGRyZXNzSWQiOjIwODEwNTMxMDUsImRMYXQiOjAsImRMbmciOjAsImdMYXQiOiIyOC4yOTc4IiwiZ0xuZyI6IjEwNS4yNCIsImdwc19hcmVhIjoiMjJfMjAwNV8zNjMxNV81NzIxMiIsImxhdCI6MjguNzYxMTAxLCJsbmciOjEwNC42MTc3NjcsIm1vZGVsIjoiMjIwODEyMTJDIiwicG9zTGF0IjoiMjguMjk3OCIsInBvc0xuZyI6IjEwNS4yNCIsInByc3RhdGUiOiIwIiwidW5fYXJlYSI6IjIyXzIwMDVfMjAxMF8zNjQ2Mi5J9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            //'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        }
    }
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
            $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie')
            return [];
        }
    }
}