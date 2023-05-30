/*
京东邀请领现金
入口：京东APP
11:/快来领100元现金！↷𝒥𝓲𝓲𝓲𝓷𝓰凍￥AAbM36pxpM￥
https://prodev.m.jd.com/mall/active/uFdv8vAHsiLz4MGsg4HEauwte8d/index.html?inviterId=aNCCrmkFj9FWdbNCbF--kw&originId=c6Bkpjp7dYcvQwO9-PR7-g&inviteCode=OZ2xF-3tRPB5w1UYKsD5q9MC7YP4ax10BB5U-aEfwpg&channelType=1&femobile=femobile&activityChannel=jdapp
执行流程，指定车头pin 输出助力码--助力--抽奖--检查提现
变量 CXJ_PIN="pin1&pin2" 多个用&分隔
指定最大助力 加“:”指定数量 例如指定pin1为60个最大助力，pin2没有指定就默认 CXJ_PIN="pin1:60&pin2"
多少助力换下一个，默认50个 ，可调整变量 CXJ_MAX='100';
只有出现助力自己的时候才会去助力作者。
1 1 1 1 * https://raw.githubusercontent.com/atyvcn/jd_scripts/main/jd_inviteFission2.js
updatetime:2023/5/28

自己弄代理懒得写了，或者本地跑
*/
const Env = require('./utils/Env.js');
const USER_AGENTS = require("./USER_AGENTS");
const H5ST=require('./utils/h5st.js');

const $ = new Env('京东邀请领现金');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message = '';
let inviters = [],inviter='';
const linkId='c6Bkpjp7dYcvQwO9-PR7-g';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
    if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0)
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const CXJ_MAX=process.env.CXJ_MAX?parseInt(process.env.CXJ_MAX):50

let TYUserName=[],HelpMax={};

if( process.env.CXJ_PIN ){
    process.env.CXJ_PIN.split("&").forEach((value) => {
        let a=value.split(":");
        HelpMax[a[0]]=a.length>1?parseInt(a[1]):CXJ_MAX;
        TYUserName.push(a[0]);
    })
}else{
    console.log(`
请设置变量 CXJ_PIN 来指定用户，多个用&分隔
执行流程，指定车头pin 输出助力码--助力--抽奖--检查提现
变量 CXJ_PIN="pin1&pin2" 多个用&分隔
指定最大助力数量用“:”隔开指定数量
例如指定pin1为60个最大助力，pin2没有指定就默认 CXJ_PIN="pin1:60&pin2"
多少助力换下一个，默认50个 ，可调整变量 CXJ_MAX='100';`)
    return false
}

const prize_conf = {'1': '优惠券','2': '红包','4': '现金',}
async function ck_expire(){
    $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/`, { "open-url": "https://bean.m.jd.com/" });
    if ($.isNode()) {
        await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
    }
}

!(async () => {    
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', { "open-url": "https://bean.m.jd.com/" });
        return;
    }
    $.UAS={};
    $.H5ST31={};
    $.jsTks={};
    console.log(`运行流程：获取指定用户助力码--助力--抽奖提现`);
    if( TYUserName.length ){
        console.log(`去获取以下用户助力码：`,TYUserName);
        for (let i = 0; i < cookiesArr.length; i++) {
            cookie = cookiesArr[i];
            if (!cookie) continue;
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            if( !$.UserName || TYUserName.indexOf($.UserName)===-1 ) continue;
            get_UA();
            //await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                await ck_expire();
                continue
            }
            $.jsTk=await get_jsTk();
            $.shshshfpa=$.shshshfpx=getUUID("xxxxxxxx-xxxx-xxxx-xxxx-bde5e40b40b1-")+Math.floor(Date.now() / 1000);
            cookie+=`shshshfpa=${$.shshshfpa};shshshfpx=${$.shshshfpx};cid=8;pwdt_id=${encodeURIComponent($.UserName)};3AB9D23F7A4B3CSS=${$.jsTk["token"]};3AB9D23F7A4B3C9B=${$.jsTk["eid"]};`;
            //inviterId=Hra4IGShf4yiLMHxC5jgzw&originId=c6Bkpjp7dYcvQwO9-PR7-g&inviteCode=HcGMbAY3hXb6WRloHJjll5VcnNdm9MwIsj_n24CAYwY
            //"inviteActId":"c6Bkpjp7dYcvQwO9-PR7-g","inviterEncryptPin":"Hra4IGShf4yiLMHxC5jgzw","inviteCode":"HcGMbAY3hXb6WRloHJjll5VcnNdm9MwIsj_n24CAYwY"
           // body: {"linkId":"YDoaG5vi1XmTyX03soVDUQ",}
           //encryptPin: 'Hra4IGShf4yiLMHxC5jgzw',
            //let wheelsHome=await JDTaskApi("wheelsHome",{linkId,"inviteActId":"","inviterEncryptPin":"","inviteCode":""},'c06b7','3.1');
            //console.log(wheelsHome);
            //await $.wait(500)
            //let BeforeHome=await JDTaskApi("inviteFissionBeforeHome",{linkId,"isJdApp":true,"inviter":""},'02f8d');
            let Home=await JDTaskApi("inviteFissionHome",{linkId,"inviter":""},'eb67b')
            if(Home && Home["code"]==0){
                Home=Home["data"]
                let num=Home["prizeNum"]+Home["drawPrizeNum"],//抽奖次数+已抽奖次数
                max=HelpMax[$.UserName];
                if(num>=max){
                    console.log(`当前已获取助力${num}次，大于设置的${max}的上限故跳过`)
                }else{
                    inviters.push({pin:$.UserName,inviteCode:Home["inviteCode"],inviter:Home["inviter"],num,max});
                }
                console.log(`【助力码】${Home["inviter"]}`)
                if(inviters.length>=TYUserName.length) break;
            }else if (Home && Home["code"]==1000 && Home["errMsg"]=='未登录') {
                cookiesArr.splice(i, 1);i--;
                await ck_expire();
                continue
            }else{
                console.log(Home);
            }
            await $.wait(2000)
        }
    }

    if (inviters.length) {
        //使用TYUserName对inviters进行排序的
        inviters.sort((a, b) => {
            return TYUserName.indexOf(a.pin) - TYUserName.indexOf(b.pin);
        });
        console.log('inviters:',inviters);
        let authorCodeList = ["aNCCrmkFj9FWdbNCbF--kw","Hra4IGShf4yiLMHxC5jgzw","fRm0DgXO-QL21ThMtQWUDg","q0_ZV7KDvsSxOLb3gzJUhQHuCf_5XIEZSnyDnj6QjHo","otUH9jNEHk1XUvPQ4M_kHA","vGl7gDpR-MboYSmEg0YTmVDggKKIARNO0pLz3xJLAa4"];
        let authorCode = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
        let Start = 0;
        //for (let item of inviters) {
        for (let u=0,item; u < inviters.length; u++) {
            item=inviters[u]
            $.full = false;
            $.hnum = 0;
            for (let i = Start; i < cookiesArr.length; i++) {
                cookie = cookiesArr[i];
                if (!cookie) continue;
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = i + 1;
                $.nickName = "";
                get_UA();
                $.jsTk=await get_jsTk();
                $.shshshfpa=$.shshshfpx=getUUID("xxxxxxxx-xxxx-xxxx-xxxx-bde5e40b40b1-")+Math.floor(Date.now() / 1000);
                cookie+=`shshshfpa=${$.shshshfpa};shshshfpx=${$.shshshfpx};cid=8;pwdt_id=${encodeURIComponent($.UserName)};3AB9D23F7A4B3CSS=${$.jsTk["token"]};3AB9D23F7A4B3C9B=${$.jsTk["eid"]};`;
                console.log("\n开始【账号" + $.index + "】" + ($.nickName || $.UserName));
                if( $.UserName==item.pin ){
                    if(authorCode){
                        console.log("不能助力自己，去助力作者");
                        inviter = authorCode;
                    }else{
                        console.log("不能助力自己，跳过。");
                        continue;
                    }
                }else{
                    inviter=item.inviter
                }
                //{"linkId":"c6Bkpjp7dYcvQwO9-PR7-g","isJdApp":true,"inviter":"Hra4IGShf4yiLMHxC5jgzw"}
                //mt9zi6ng39m5mtq5;02f8d
                let BeforeHome=await JDTaskApi("inviteFissionBeforeHome",{linkId,"isJdApp":true,inviter},'02f8d');
                //let Home=await JDTaskApi("inviteFissionHome",{linkId,inviter},'eb67b')
                if (BeforeHome && BeforeHome["code"]==0) {
                    console.log(`当前助力：${BeforeHome["data"]["nickName"]}`);
                    let helpResult = BeforeHome["data"]["helpResult"]
                    if (!helpResult) {
                        console.log(BeforeHome["errMsg"]);
                    }
                    if (helpResult == 1) {
                        console.log("助力成功...")
                        inviter==item.inviter && inviters[u].num++;
                    }else if (helpResult == 6) {
                        console.log("已经助力过了...")
                    }else if (helpResult == 3) {
                        console.log("没有助力次数了...")
                    }else if (helpResult == 4) {
                        console.log("助力次数用完了...")
                    }else if (helpResult == 2) {
                        console.log("活动火爆...")
                    }else{
                        console.log(`helpResult：${helpResult}`);
                    }
                    if (inviters[u].num >= inviters[u].max) {
                        console.log("助力达到设置上限，开始助力下一位。")
                        Start = i + 1;break;
                    }
                    await $.wait(4000);
                }else if (BeforeHome && BeforeHome["code"]==1000 && BeforeHome["errMsg"]=='未登录') {
                    cookiesArr.splice(i, 1);i--;
                    await ck_expire();
                    continue
                }else{
                    console.log(BeforeHome);
                    await $.wait(4000);
                }
                //console.log(Home);
            }
            if ($.index == cookiesArr.length) {
                break;
            }
        }
    } else {
        console.log("未找到可用的助力码");
    }
    console.log("\n开始任务和抽奖");
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (!cookie) continue;
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        $.isLogin = true;
        $.nickName = '';
        get_UA();
        //await TotalBean();
        if( !$.UserName || TYUserName.indexOf($.UserName)===-1 ) continue;
        console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/`, { "open-url": "https://bean.m.jd.com/" });
            if ($.isNode()) {
                await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
            }
            continue
        }
        let Home=await JDTaskApi("inviteFissionHome",{linkId,"inviter":""},'eb67b')
        if(Home && Home["code"]==0){
            Home=Home["data"]
            let prizeNum = Home["prizeNum"]
            console.log("可抽奖次数:", Home["prizeNum"])
            //drawPrizeNum 已经抽奖的数量
            let error = 0
            while(prizeNum){
                let Draw=await JDTaskApi("inviteFissionDrawPrize",{linkId,"lbs":"null"},'c02c6')
                if(Draw && Draw["code"]==0){
                    prizeNum--;
                    DrawData=Draw["data"]
                    let prizeType = DrawData["prizeType"]
                    if (!prizeType) {
                        error++
                    }else {
                        error = 0
                    }
                    if (error>2) {
                        console.log("已经连续3次没有获取到抽奖数据,跳过本次抽奖...")
                        break
                    }
                    console.log("抽中类型:", prize_conf[prizeType], '抽中面额:', DrawData["prizeValue"])
                    await $.wait(2000)
                }else if(Draw && Draw["code"]==80202){
                    /*error++
                    if (error>2) {
                        console.log("火爆3次，跳过本次抽奖...")
                        break
                    }else{
                        console.log("活动太火爆，10s后重试~")
                        await $.wait(10000)
                    }*/
                    let s=generateRandomInteger(10e3,50e3);
                    console.log(`活动太火爆，${s/1000}s后重试~`)
                    await $.wait(s)
                    //{ success: false, code: 80202, errMsg: '活动太火爆，请稍后重试~', data: null }
                }else{
                    error++
                    if (error>2) {
                        console.log("错误3次，跳过本次抽奖...")
                        break
                    }
                    console.log(Draw);
                }
            }
        }else if(Home){
            console.log(Home);
        }
        let NextPage=true,Page=1,count=0,count2=0;
        while(NextPage){
            let Result = await JDTaskApi("superRedBagList",{linkId,"pageNum":Page,"pageSize":100,"business":"fission"},'f2b1d')
            if(Result){
                NextPage=Result.data.totalPage>Result.data.currentPage;
                if(Result.data.currentPage>=2) break;
                //console.log(JSON.stringify(Result));
                console.log(`${Result.data.currentPage}/${Result.data.totalPage}`);
                Page=Result.data.currentPage+1
                for (let item of Result.data.items) {
                    if (item.prizeType == 4) {//prize_conf = {'1': '优惠券','2': '红包','4': '现金',}
                        if(item.state == 0){
                            console.log("正在提现:", item['amount']);
                            let body = {linkId, "businessSource": "NONE","base": {"id": item['id'], "business": "fission", "poolBaseId": item['poolBaseId'], "prizeGroupId": item['prizeGroupId'],"prizeBaseId": item['prizeBaseId'], "prizeType": 4}}
                            let data=await JDTaskApi("apCashWithDraw",body,'8c6ae')
                            //{ code: '-1', echo: '405' } console.log(data)
                            if (data.code == 0) {
                                if( data.data.status=="310" ){
                                    count+=parseFloat(item['amount']);
                                    console.log(data.data.message)
                                }else if(data.data.status=="50053"){//提现失败:无效的openId，当前pin尚未绑定微信
                                    console.log("提现失败:"+data.data.message)
                                    break;
                                }else{
                                    console.log("提现失败"+data.data.status+":"+data.data.message)
                                }
                                if (data.data.message.includes('风控')) {
                                    console.log("风控账户,不能提现")
                                    break;
                                }
                            } else {
                                console.log(data.code+":"+data.errMsg)
                            }
                            await $.wait(10000)
                        }else if(item.state == 3){
                            count+=parseFloat(item['amount']);
                        }else{
                            console.log("未知状态"+item.state)
                            console.log(item)
                        }
                    }
                }
            }else{
                console.log(`获取getlist 错误！`);
                break;
            }
        }
        console.log(`已经提现：${count.toFixed(2)}，提现中：${count2.toFixed(2)}`);
    }
    if (message) {
        if ($.isNode()) await notify.sendNotify(`${$.name}`, `${message}`);
        $.msg($.name, '', message);
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })



async function get_jsTk(){
    if( $.jsTks[$.UserName] ) return $.jsTks[$.UserName];
    const t = new Date().getTime()
    const g = {"pin":"","oid":"","bizId":"jd-babelh5",
        //"fc":"FD36HSPQHCD7UUM6NOPYJ65WL6RTGJGH74BDQN6IA7ITWHK7P7P5KHA7TIJDH3PXDLN7MTITDSDC26ZXGF3LHR6JGA",
        "fc":"",
        "mode":"strict","p":"s","fp":"05e7183d7b7a0a5428801f50d4e99059","ctype":1,"v":"3.1.1.1","f":"3",
        "o":"prodev.m.jd.com/mall/active/uFdv8vAHsiLz4MGsg4HEauwte8d/index.html",
        //"jsTk":"jdd03FD36HSPQHCD7UUM6NOPYJ65WL6RTGJGH74BDQN6IA7ITWHK7P7P5KHA7TIJDH3PXDLN7MTITDSDC26ZXGF3LHR6JGAAAAAMIH264JHIAAAAACYFROOZEXEHGGEX",
        "qi":""
    }
    const TDEncrypt = function(m) {
        m = JSON.stringify(m);
        m = encodeURIComponent(m);
        var n = "",
        g = 0
        s64="23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-";
        do {
            var f = m.charCodeAt(g++);
            var d = m.charCodeAt(g++);
            var a = m.charCodeAt(g++);
            var b = f >> 2;
            f = (f & 3) << 4 | d >> 4;
            var e = (d & 15) << 2 | a >> 6;
            var c = a & 63;
            isNaN(d) ? e = c = 64 : isNaN(a) && (c = 64);
            n = n + s64.charAt(b) + 
            s64.charAt(f) + 
            s64.charAt(e) + 
            s64.charAt(c)
        } while ( g < m.length );
        return n + "/"
    };
    const a = TDEncrypt(g);
    let d = '{"ts":{"deviceTime":1684749932883,"deviceEndTime":1684749932968},"ca":{"tdHash":"ae7bb88f7eac3baa052a6d2fd3c4eab8","contextName":"webgl,experimental-webgl","webglversion":"WebGL 1.0 (OpenGL ES 2.0 Chromium)","shadingLV":"WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)","vendor":"WebKit","renderer":"WebKit WebGL","extensions":["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_color_buffer_half_float","EXT_float_blend","EXT_texture_filter_anisotropic","WEBKIT_EXT_texture_filter_anisotropic","EXT_sRGB","OES_element_index_uint","OES_fbo_render_mipmap","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_color_buffer_float","WEBGL_compressed_texture_astc","WEBGL_compressed_texture_etc","WEBGL_compressed_texture_etc1","WEBGL_debug_renderer_info","WEBGL_debug_shaders","WEBGL_depth_texture","WEBKIT_WEBGL_depth_texture","WEBGL_lose_context","WEBKIT_WEBGL_lose_context","WEBGL_multi_draw"],"wuv":"Qualcomm","wur":"Adreno (TM) 730"},"m":{"compatMode":"CSS1Compat"},"fo":["Bauhaus 93","Casual"],"n":{"vendorSub":"","productSub":"20030107","vendor":"Google Inc.","maxTouchPoints":5,"hardwareConcurrency":8,"cookieEnabled":true,"appCodeName":"Mozilla","appName":"Netscape","appVersion":"","platform":"Linux aarch64","product":"Gecko","userAgent":"","language":"zh-CN","onLine":true,"webdriver":false,"javaEnabled":false,"deviceMemory":8,"enumerationOrder":["vendorSub","productSub","vendor","maxTouchPoints","userActivation","doNotTrack","geolocation","connection","plugins","mimeTypes","webkitTemporaryStorage","webkitPersistentStorage","hardwareConcurrency","cookieEnabled","appCodeName","appName","appVersion","platform","product","userAgent","language","languages","onLine","webdriver","getBattery","getGamepads","javaEnabled","sendBeacon","vibrate","scheduling","mediaCapabilities","locks","wakeLock","usb","clipboard","credentials","keyboard","mediaDevices","storage","serviceWorker","deviceMemory","bluetooth","getUserMedia","requestMIDIAccess","requestMediaKeySystemAccess","webkitGetUserMedia","clearAppBadge","setAppBadge"]},"p":[],"w":{"devicePixelRatio":3,"screenTop":0,"screenLeft":0},"s":{"availHeight":904,"availWidth":407,"colorDepth":24,"height":904,"width":407,"pixelDepth":24},"sc":{"ActiveBorder":"rgb(255, 255, 255)","ActiveCaption":"rgb(204, 204, 204)","AppWorkspace":"rgb(255, 255, 255)","Background":"rgb(99, 99, 206)","ButtonFace":"rgb(221, 221, 221)","ButtonHighlight":"rgb(221, 221, 221)","ButtonShadow":"rgb(136, 136, 136)","ButtonText":"rgb(0, 0, 0)","CaptionText":"rgb(0, 0, 0)","GrayText":"rgb(128, 128, 128)","Highlight":"rgb(181, 213, 255)","HighlightText":"rgb(0, 0, 0)","InactiveBorder":"rgb(255, 255, 255)","InactiveCaption":"rgb(255, 255, 255)","InactiveCaptionText":"rgb(127, 127, 127)","InfoBackground":"rgb(251, 252, 197)","InfoText":"rgb(0, 0, 0)","Menu":"rgb(247, 247, 247)","MenuText":"rgb(0, 0, 0)","Scrollbar":"rgb(255, 255, 255)","ThreeDDarkShadow":"rgb(102, 102, 102)","ThreeDFace":"rgb(192, 192, 192)","ThreeDHighlight":"rgb(221, 221, 221)","ThreeDLightShadow":"rgb(192, 192, 192)","ThreeDShadow":"rgb(136, 136, 136)","Window":"rgb(255, 255, 255)","WindowFrame":"rgb(204, 204, 204)","WindowText":"rgb(0, 0, 0)"},"ss":{"cookie":true,"localStorage":true,"sessionStorage":true,"globalStorage":false,"indexedDB":true},"tz":-480,"lil":"","wil":""}'
    d = JSON.parse(d)
    d["ts"]["deviceTime"] = t
    d["ts"]["deviceEndTime"] = t + 77
    d["n"]["appVersion"] = $.UA.substring($.UA.indexOf("appBuild/") + 9)
    d["n"]["userAgent"] = $.UA
    var opt = {
        url:`https://gia.jd.com/jsTk.do?a=${encodeURIComponent(a)}`,
        headers: {
            "Host": "gia.jd.com",
            "Connection": "keep-alive",
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Accept":"*/*",
            "Origin": "https://prodev.m.jd.com",
            "X-Requested-With": "com.jd.jdlite",
            "Sec-Fetch-Site": "same-site",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://prodev.m.jd.com/mall/active/uFdv8vAHsiLz4MGsg4HEauwte8d/index.html?babelChannel=ttt6",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": cookie+";cid=8",//sid={self.sha};
            "User-Agent": $.UA
            //self.sha = sha1(str(self.name).encode('utf-8')).hexdigest()
        },
        body:`d=${encodeURIComponent(TDEncrypt(d))}`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${functionId}: API查询请求失败!`)
                    $.logErr(err);
                } else if (safeGet(data)) {
                    const resData = JSON.parse(data)
                    if (resData['code'] == 0) {
                        $.jsTks[$.UserName]=resData['data']
                        resolve($.jsTks[$.UserName]);
                    } else {
                        console.log(resData)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(false);
            }
        });
    });
}


async function JDTaskApi(functionId, body = { },appId='',version='4.1') {
    var opt = {
        url:`https://api.m.jd.com/${version=="4.1"?"api":""}`,
        headers: {
            "Host": "api.m.jd.com",
            "accept": "application/json, text/plain, */*",
            "x-rp-client": "h5_1.0.0",
            "content-type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "x-referer-page": "https://prodev.m.jd.com/mall/active/uFdv8vAHsiLz4MGsg4HEauwte8d/index.html",
            "origin": "https://prodev.m.jd.com",
            "x-requested-with": "com.jingdong.app.mall",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://prodev.m.jd.com/mall/active/uFdv8vAHsiLz4MGsg4HEauwte8d/index.html",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": cookie//+";cid=8",
        }
    },ac='';

    if(appId){
        let appBuild=168341,
        uuid="5616237366134353-4383338333661383";
        uuid=getUUID(16);
        uuid="";
        const match = $.UA.match(/appBuild\/(\d+)/);
        if(match) appBuild=match[1];
        if( !$.H5ST31[$.UserName] ) $.H5ST31[$.UserName]={}
        if( !$.H5ST31[$.UserName][appId] ){
            let us=$.UA.split(";")
            $.H5ST31[$.UserName][appId]= new H5ST({
                appId,
                "appid": "activities_platform",
                "clientVersion": us[2],
                "client": us[1]=="iPhone"?"ios":us[1],//"android" us[1]=="iPhone"?"ios":us[1]
                "pin": $.UserName,
                "ua": $.UA,
                "version":version,
                //fp:version==4.1?"tm9izn5gg63g56t8":"",
                "fv":version=="4.1"?"v0.1.6":"",
                "expand":{
                    "url": "https://prodev.m.jd.com/mall/active/uFdv8vAHsiLz4MGsg4HEauwte8d/index.html",
                    "og": "https://prodev.m.jd.com",
                }
            });
            await $.H5ST31[$.UserName][appId].genAlgo();
        };
        ac='post';
        
        let post="&uuid="+uuid+"&build="+appBuild+"&cthr=1&networkType=wifi&d_brand=iPhone&d_model=iPhone12&screen=414*736&lang=zh_CN&osVersion=-1";
        if( version=="4.1" ) post+="&x-api-eid-token="+($.jsTk["token"]);
        //&screen=407*904&networkType=wifi&d_brand=Redmi&d_model=22081212C&lang=zh_CN&osVersion=13&partner=xiaomi&cthr=1
        opt["body"] = await $.H5ST31[$.UserName][appId].getbody(functionId,body)+post;
        //opt["url"]+="?"+opt["body"];
        //console.log(opt["body"]);
    }else{
        ac='get';
        opt["url"]+=`?functionId=${functionId}&body=${escape(JSON.stringify(body))}&t=${Date.now()}&appid=activities_platform`;
    }
    return new Promise(resolve => {
        $[ac](opt, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${functionId}: API查询请求失败!`)
                    $.logErr(err);
                } else if (safeGet(data)) {
                    resolve(JSON.parse(data));
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(false);
            }
        });
    });
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

function getUUID(x = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", t = 0) {
    if (typeof x == "number") x = new Array(x).join('x')
    return x.replace(/[xy]/g, function (x) {
        var r = (16 * Math.random()) | 0,
            n = "x" == x ? r : (3 & r) | 8;
        return (uuid = t ? n.toString(36).toUpperCase() : n.toString(36)), uuid;
    });
}

function get_UA() {
    if( !$.UAS[$.UserName] ) $.UAS[$.UserName]=USER_AGENTS.UARAM()
    $.UA=$.UAS[$.UserName]
}

function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}