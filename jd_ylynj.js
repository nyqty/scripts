/*
伊利养牛记

号1默认给我助力,后续接龙 2给1 3给2
如果提示没有养牛 自己手动进去养一只
活动入口：伊利京东自营旗舰店->伊利牛奶
https://lzdz-isv.isvjcloud.com/dingzhi/yili/yangniu/activity/5070687?activityId=dz2103100001340201&shareUuid=a7cc9f9c059b4112a4529a26f228f208&adsource=ziying&shareuserid4minipg=u/cWHIy7/x3Ij+HjfbnnePkaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw&shopid=1000013402&lng=114.062604&lat=29.541501&sid=6e9bfee3838075a72533536815d8f3ew&un_area=4_48201_54794_0
============Quantumultx===============
[task_local]
#柠檬伊利养牛记
0 12 * * * jd_ylynl.js, tag=柠檬伊利养牛记, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('京东伊利养牛记');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const randomCount = $.isNode() ? 20 : 5;
const notify = $.isNode() ? require('./sendNotify') : '';
let merge = {}
let codeList = []
Exchange = $.isNode() ? (process.env.Cowexchange ? process.env.Cowexchange : false) : ($.getdata("Cowexchange") ? $.getdata("Cowexchange") : false);
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const JD_API_HOST = `https://api.m.jd.com/client.action`;
message = ""
$.shareuuid = "e3f4984033284c8cac42a8a29e8072ff" //
    !(async () => {
        if (!cookiesArr[0]) {
            $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
                "open-url": "https://bean.m.jd.com/"
            });
            return;
        }
        for (let i = 0; i <cookiesArr.length; i++) {
            cookie = cookiesArr[i];
            cookie1 = cookiesArr[i];
            if (cookie) {
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.cando = true
                $.quming = true
                $.cow = ""
                $.openCard = true
                $.isLogin = true;
                $.needhelp = true
                $.foodNum = 0
                $.nickName = '';
                $.drawresult = ""
                $.exchange =0
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
                await genToken()
                await getActCk()
                await getToken2()
                await getshopid()
                await getMyPin()
                await adlog()
                await getUserInfo()
                if ($.cando) {
                    await join(100000000000168,1000013402)
                   await saveCow()   
                    await getUid($.shareuuid)
                    await dotask(0)
                    await dotask(1)
                    await dotask(12)
                    await dotask(13,"ziying")
                    await dotask(13,"pop")
                    await dotask(21)
                    await feedCow()
                    for (let i = 0; i < $.cs; i++) {
                     await feedCow()   
                    }
                    
                    for (let i = 0; i < $.cj; i++) {
                     await draw()   
                    }
                    

                }
            }
        }

    })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
//获取活动信息



//genToken
function genToken() {
    let config = {
        url: 'https://api.m.jd.com/client.action?functionId=genToken&clientVersion=10.0.4&build=88641&client=android&d_brand=OPPO&d_model=PCAM00&osVersion=10&screen=2208*1080&partner=oppo&oaid=&openudid=7049442d7e415232&eid=eidAfb0d81231cs3I4yd3GgLRjqcx9qFEcJEmyOMn1BwD8wvLt/pM7ENipVIQXuRiDyQ0FYw2aud9+AhtGqo1Zhp0TsLEgoKZvAWkaXhApgim9hlEyRB&sdkVersion=29&lang=zh_CN&uuid=7049442d7e415232&aid=7049442d7e415232&area=4_48201_54794_0&networkType=wifi&wifiBssid=774de7601b5cddf9aad1ae30f3a3dfc0&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJ3DxdOrbYUybTe3dL1fv5SZqA7LxGNRtzSOx8fh0f3M1MbIvt421AKNKOpCPfGQrrVUodx%2Fkyzv10ruE8Nej2sOUKwb8tCv2kUQ1xlvckMf%2F%2BQlbGZpk3SF6y3AMv848PpSuaIzc4Wef2Q%2FEVdfQwC5mHEU9bM129HM13EJuyirzz6m2X3KkBMA%3D%3D&uemps=0-0&st=1626585864591&sign=b8c73932c27934ace61d09b492e47cd1&sv=101',
        body: 'body=%7B%22action%22%3A%22to%22%2C%22to%22%3A%22https%253A%252F%252Flzdz-isv.isvjcloud.com%252Fdingzhi%252Fyili%252Fyangniu%252Factivity%252F5070687%253FactivityId%253Ddz2103100001340201%2526shareUuid%253Da7cc9f9c059b4112a4529a26f228f208%2526adsource%253Dziying%2526shareuserid4minipg%253Du%252FcWHIy7%252Fx3Ij%252BHjfbnnePkaL5GGqMTUc8u%252Fotw2E%252Ba7Ak3lgFoFQlZmf45w8Jzw%2526shopid%253D1000013402%22%7D&',
        headers: {
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                    console.log(`${JSON.stringify(err)}`)
                } else {
                    data = JSON.parse(data);
                    $.isvToken = data['tokenKey']
                       //console.log($.isvToken)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

//获取pin需要用到
function getToken2() {
    let config = {
        url: 'https://api.m.jd.com/client.action?functionId=isvObfuscator&clientVersion=10.0.4&build=88641&client=android&d_brand=OPPO&d_model=PCAM00&osVersion=10&screen=2208*1080&partner=oppo&oaid=&openudid=7049442d7e415232&eid=eidAfb0d81231cs3I4yd3GgLRjqcx9qFEcJEmyOMn1BwD8wvLt/pM7ENipVIQXuRiDyQ0FYw2aud9+AhtGqo1Zhp0TsLEgoKZvAWkaXhApgim9hlEyRB&sdkVersion=29&lang=zh_CN&uuid=7049442d7e415232&aid=7049442d7e415232&area=4_48201_54794_0&networkType=wifi&wifiBssid=774de7601b5cddf9aad1ae30f3a3dfc0&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJ3DxdOrbYUybTe3dL1fv5SZqA7LxGNRtzSOx8fh0f3M1MbIvt421AKNKOpCPfGQrrVUodx%2Fkyzv10ruE8Nej2sOUKwb8tCv2kUQ1xlvckMf%2F%2BQlbGZpk3SF6y3AMv848PpSuaIzc4Wef2Q%2FEVdfQwC5mHEU9bM129HM13EJuyirzz6m2X3KkBMA%3D%3D&uemps=0-0&st=1626585867093&sign=35d78547e97fda4666f0819866a13b19&sv=121',
        body: 'body=%7B%22id%22%3A%22%22%2C%22url%22%3A%22https%3A%2F%2Flzdz-isv.isvjcloud.com%22%7D&',
        headers: {
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    $.token2 = data['token']
                       //console.log($.token2)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}




//抄的书店的 不过不加好像也能进去
function getActCk() {
    return new Promise(resolve => {
        $.get(taskUrl("/dingzhi/yili/yangniu/activity", `activityId=dz2103100001340201&shareUuid=a7cc9f9c059b4112a4529a26f228f208&adsource=ziying&shareuserid4minipg=u/cWHIy7/x3Ij+HjfbnnePkaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw&shopid=1000013402&lng=114.062541&lat=29.541254&sid=eec1865d9c44c1070f3b5e6718c9ee1w&un_area=4_48201_54794_0`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.isNode())
                        for (let ck of resp['headers']['set-cookie']) {
                            cookie = `${cookie}; ${ck.split(";")[0]};`
                        }
                    else {
                        for (let ck of resp['headers']['Set-Cookie'].split(',')) {
                            cookie = `${cookie}; ${ck.split(";")[0]};`
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

//获取我的pin
function getshopid() {
    let config = taskPostUrl("/dz/common/getSimpleActInfoVo", "activityId=dz2103100001340201")
  
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
             
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result) {
                        $.shopid = data.data.venderId
                            //console.log($.shopid)
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

//获取我的pin
function getMyPin() {
    let config = taskPostUrl("/customer/getMyPing", `userId=${$.shopid}&token=${encodeURIComponent($.token2)}&fromType=APP`)
    //   console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.data && data.data.secretPin) {
                        $.pin = data.data.secretPin
                        //    console.log($.pin)
                        $.nickname = data.data.nickname
                        $.lz_jdpin_token = resp['headers']['set-cookie'].filter(row => row.indexOf("lz_jdpin_token") !== -1)[0]
                        // console.log(data)
                        console.log(`${$.nickname}`);
                        
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

function adlog() {
    let config = taskPostUrl("/common/accessLogWithAD", `venderId=1000013402&code=99&pin=${encodeURIComponent($.pin)}&activityId=dz2103100001340201&pageUrl=https%3A%2F%2Flzdz-isv.isvjcloud.com%2Fdingzhi%2Fyili%2Fyangniu%2Factivity%2F4827909%3FactivityId%3Ddz2103100001340201%26shareUuid%3Db44243656a694b6f94bb30a4a5f2a45d%26adsource%3Dziying%26shareuserid4minipg%3D5Iufa9rY657S3OP3PLSpK07oeVP9kq2pYSH90mYt4m3fwcJlClpxrfmVYaGKuquQkdK3rLBQpEQH9V4tdrrh0w%3D%3D%26shopid%3D1000013402%26lng%3D114.062604%26lat%3D29.541501%26sid%3D6e9bfee3838075a72533536815d8f3ew%26un_area%3D4_48201_54794_0&subType=app&adSource=ziying`)
    //   console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    //  data = JSON.parse(data);
                    if ($.isNode())
                        for (let ck of resp['headers']['set-cookie']) {
                            cookie = `${cookie}; ${ck.split(";")[0]};`
                        }
                    else {
                        for (let ck of resp['headers']['Set-Cookie'].split(',')) {
                            cookie = `${cookie}; ${ck.split(";")[0]};`
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

function saveCow() {
    return new Promise(resolve => {
        
        let body = `activityId=dz2103100001340201&actorUuid=${$.shareuuid}&shareUuid=${$.shareuuid}&cowNick=%E6%9F%A0%E6%AA%AC`
        let config = taskPostUrl('/dingzhi/yili/yangniu/saveCow', body)
        //   console.log(config)
        $.post(config, async (err, resp, data) => {
            //$.log(data)
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result == true) {
                        $.cowNick = data.data.cowNick
                        $.log("取名："+$.cowNick)
                    } else if(data.result == false){
                        
                        $.log(data.errorMessage)
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

// 获得用户信息
function getUserInfo() {
    return new Promise(resolve => {
        let body = `pin=${encodeURIComponent($.pin)}`
        let config = taskPostUrl('/wxActionCommon/getUserInfo', body)
        //   console.log(config)
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.data) {
                        $.userId = data.data.id
                        $.pinImg = data.data.yunMidImageUrl
                        $.nick = data.data.nickname
                    } else {
                        $.cando = false
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

function getUid() {
    return new Promise(resolve => {
        let body = `activityId=dz2103100001340201&pin=${encodeURIComponent($.pin)}&pinImg=${$.pinImg }&nick=${encodeURIComponent($.nick)}&cjyxPin=&cjhyPin=&shareUuid=${$.shareuuid}`
        $.post(taskPostUrl('/dingzhi/yili/yangniu/activityContent', body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                        if (data.result) {
                           if(data.data.openCard == false){
                           console.log("当前未开卡,无法助力和兑换奖励哦")
                           await join(100000000000168,1000013402)
                          
                           }
                            $.shareuuid = data.data.actorUuid
                            console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}\n好友互助码】${$.shareuuid}\n`);
                            
                            
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
function join(venderId,shopId) {
  return new Promise(resolve => {
let joinurl ={
    url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"${venderId}","shopId":"${shopId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0}&client=H5&clientVersion=8.5.6&uuid=88888&jsonp=jsonp_1599410555929_50468`,
    headers: {
      'Origin': 'https://api.m.jd.com',
      'Host': 'api.m.jd.com',
      'accept': '*/*',
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)',
      'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
      'Referer': `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"${venderId}","shopId":"${shopId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0}&client=H5&clientVersion=8.5.6&uuid=88888&jsonp=jsonp_1599410555929_50468`,
      'Cookie': cookie1,
    }
  }
    
    $.get(joinurl, async (err, resp, data) => {
      try {

        data = data.match(/(\{().+\})/)[1]
        data = JSON.parse(data);
          if(data.success == true){
              $.log(data.message)
          }else if(data.success == false){
           $.log(data.message)   
          } 

      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function feedCow() {
   
    let config = taskPostUrl("/dingzhi/yili/yangniu/feedCow", `activityId=dz2103100001340201&actorUuid=${$.shareuuid}&pin=${encodeURIComponent($.pin)}`)
    //     console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result) {
                        if (data.data) {
                            $.cs = data.data.score2*0.1
                            $.cj = data.data.assistCount
                            $.log($.cj)
                            console.log(`老牛等级:${data.data.level}\n下一等级还需吃奶:${data.data.score*0.1}\n剩余奶滴:${data.data.score2*0.1}`)
                        }
                    } else {
                        console.log(data.errorMessage)
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


function dotask(taskType, taskValue) {
   
    let config = taskPostUrl("/dingzhi/yili/yangniu/saveTask", `activityId=dz2103100001340201&actorUuid=${$.shareuuid}&pin=${encodeURIComponent($.pin)}&taskType=${taskType}&taskValue=${taskValue}`)
    //     console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result) {
                        if (data.data) {
                            console.log("恭喜你,获得奶滴： " + data.data.milkCount )
                        }
                    } else {
                        console.log(data.errorMessage)
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

function draw() {
    
    let config = taskPostUrl("/dingzhi/yili/yangniu/start", `activityId=dz2103100001340201&pin=${encodeURIComponent($.pin)}&actorUuid=${$.shareuuid}`)
    //  console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result) {
                        if (Object.keys(data.data).length == 0) {
                            console.log("抽奖成功,恭喜你抽了个寂寞： ")
                        } else {
                            console.log(`恭喜你抽中 ${data.data.name}`)
                            $.drawresult += `恭喜你抽中 ${data.data.name} `
                        }
                    } else {
                        console.log(data.errorMessage)
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
function taskUrl(url, body) {
    const time = Date.now();
    //  console.log(cookie)
    return {
        url: `https://lzdz-isv.isvjcloud.com${url}?${body}`,
        headers: {
            'Host': 'lzdz-isv.isvjcloud.com',
            'Accept': 'application/json',
            //     'X-Requested-With': 'XMLHttpRequest',
            'Referer': 'https://lzdz-isv.isvjcloud.com/dingzhi/yili/yangniu/activity/4827909?activityId=dz2103100001340201&shareUuid=b44243656a694b6f94bb30a4a5f2a45d&adsource=ziying&shareuserid4minipg=5Iufa9rY657S3OP3PLSpK07oeVP9kq2pYSH90mYt4m3fwcJlClpxrfmVYaGKuquQkdK3rLBQpEQH9V4tdrrh0w==&shopid=1000013402&lng=114.062604&lat=29.541501&sid=6e9bfee3838075a72533536815d8f3ew&un_area=4_48201_54794_0',
            'user-agent': 'jdapp;android;10.0.4;11;2393039353533623-7383235613364343;network/wifi;model/Redmi K30;addressid/138549750;aid/290955c2782e1c44;oaid/b30cf82cacfa8972;osVer/30;appBuild/88641;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': `${cookie} IsvToken=${$.IsvToken};AUTH_C_USER=${$.pin}`,
        }
    }
}



function taskPostUrl(url, body) {
    return {
        url: `https://lzdz-isv.isvjcloud.com${url}`,
        body: body,
        headers: {
            'Host': 'lzdz-isv.isvjcloud.com',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            

            'Referer': 'https://lzdz-isv.isvjcloud.com/dingzhi/yili/yangniu/activity/4827909?activityId=dz2103100001340201&shareUuid=b44243656a694b6f94bb30a4a5f2a45d&adsource=ziying&shareuserid4minipg=5Iufa9rY657S3OP3PLSpK07oeVP9kq2pYSH90mYt4m3fwcJlClpxrfmVYaGKuquQkdK3rLBQpEQH9V4tdrrh0w==&shopid=1000013402&lng=114.062604&lat=29.541501&sid=6e9bfee3838075a72533536815d8f3ew&un_area=4_48201_54794_0',
            'user-agent': 'jdapp;android;10.0.4;11;2393039353533623-7383235613364343;network/wifi;model/Redmi K30;addressid/138549750;aid/290955c2782e1c44;oaid/b30cf82cacfa8972;osVer/30;appBuild/88641;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': `${cookie} IsvToken=${$.IsvToken};AUTH_C_USER=${$.pin};${$.lz_jdpin_token}`,
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