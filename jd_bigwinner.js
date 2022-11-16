/*
cron:0 0 0 * * *
原脚本 https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_makemoneyshop.js
by、梦创星河 QQ1659670408
TY二次修改优化
updatetime: 2022/11/14
京东特价APP首页-赚钱大赢家
进APP看看，能不能进去，基本都黑的！！！
有的能进去，助力确是黑的！！每个人的助力码基本上是不变的。
运行流程：设置助力信息--是否过滤黑号--助力--领取任务奖励！！！
助力信息变量：多个助力信息用&隔开，助力信息里面包括用户名和助力码用:隔开。
用户名和助力码可都填也可以只填用户名，若只有用户名就去ck里面筛选助力信息获取助力码。
两个都有就不去获取更新，且设置不过滤黑号就直接开始直接助力了。
DYJ_shareInfo='用户名&用户名:助力码'
设置是否过滤黑号 true|false 默认不过滤黑号
DYJ_filter='false'
助力间隔时间单位是毫秒，可固定也可设置最小到最大的随机延时。也可为0
DYJ_HelpWait='最小毫秒-最大毫秒'
*/
const Env=require('./utils/Env.js');
const $ = new Env('特价版大赢家');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
const {UARAM,randomNumber} = require('./USER_AGENTS');
const fs = require('fs');
let black_path = './bigwinner_black.txt',black_user = [],cookiesArr = [],
need_invite=0,cookie = '',DYJ_filter=false,DYJ_HelpWait=[500,1500],
shareInfo = [],sharePins=[],helpinfo = {};
const Hour = (new Date()).getHours()
const query = Hour >= 9

if (process.env.DYJ_shareInfo) {
    let t=process.env.DYJ_shareInfo.split("&");
    Object.keys(t).forEach((i) => {
        let a=t[i].split(":");
        sharePins.push(a[0]);
        shareInfo.push({pin:a[0],id:a.length>1?a[1]:''})
    })
    console.log(`已设置${shareInfo.length}个助力信息\n`);
}else{
    console.log(`请设置助力信息：DYJ_shareInfo='用户名&用户名:助力码'\n`);
}

if(process.env.DYJ_filter){
    DYJ_filter=process.env.DYJ_filter === 'true';
    console.log(`当前`+(DYJ_filter?"开启":"关闭")+`过滤黑号`);
}else{
    console.log(`请设置是否过滤黑号：DYJ_filter='true|false'
默认不过滤黑号\n`);
}

if(process.env.DYJ_HelpWait){
    DYJ_HelpWait=process.env.DYJ_HelpWait.split("-");
    DYJ_HelpWait[0]=parseInt(DYJ_HelpWait[0]);
    if(isNaN(DYJ_HelpWait[0])){
        DYJ_HelpWait[0]=500;
        console.log(`我真是无语了，你还是卸载青龙吧！`);
    }
    if(DYJ_HelpWait.length>1){
        DYJ_HelpWait[1]=parseInt(DYJ_HelpWait[1]);
        if(isNaN(DYJ_HelpWait[1])){
            DYJ_HelpWait[1]=1500;
            console.log(`我真是无语了，你还是卸载青龙吧！`);
        }
        console.log(`当前随机延时${DYJ_HelpWait[0]}-${DYJ_HelpWait[1]}Ms`);
    }else{
        console.log(`当前固定延时${DYJ_HelpWait[0]}Ms`);
    }
}else{
    console.log(`请设置助力间隔时间(毫秒)：DYJ_HelpWait='最小毫秒-最大毫秒'
也可固定，默认是500-1500毫秒，也就是0.5秒到1.5秒`);
}

let Fileexists = fs.existsSync(black_path);
if (Fileexists) {
    console.log(`检测到大赢家黑名单缓存数据${black_path}，载入...`);
    black_user = fs.readFileSync(black_path, 'utf-8');
    if (black_user) {
        black_user = black_user.toString().split("&");
        console.log(`检测到大赢家黑名单账号有${black_user.length}个`);
    }
}

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}


function getDate(extra){
    var dat = new Date;//生成日期
    var year = dat.getFullYear();//取得年
    var month = dat.getMonth()+1;    //取得月,js从0开始取,所以+1
    var date1 = dat.getDate(); //取得天
    var hour = dat.getHours();//取得小时
    var minutes = dat.getMinutes();//取得分钟
    dat.getMilliseconds
    var second = dat.getSeconds();//取得秒
    var haomiao = dat.getMilliseconds();
    dat = undefined;
    //return year+"-"+month+"-"+date1+" "+hour+":"+minutes +":"+second+" "+haomiao + extra ;
    return (hour>9?'':'0')+hour+":"+(minutes>9?'':'0')+minutes +":"+(second>9?'':'0')+second+" "+haomiao.toString().padStart(3, '0') + extra ;
}

function log(){
    //-log
    process.stdout.write(getDate(': '));
    console.log.apply(console, arguments);
    //console.oldlog.apply(console, arguments);
}
console.oldlog = console.log;
console.time = log;


!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            if(!$.UserName){
                console.log(`\n正则用户名失败！ck->${cookie}`);
                continue;
            }
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            helpinfo[$.UserName] = {};
            UA = UARAM();
            helpinfo[$.UserName].ua = UA;
            let Pin_i=sharePins.indexOf($.UserName);
            if(DYJ_filter){
                if( black_user.length && black_user.includes($.UserName) && Pin_i==-1 ){
                    helpinfo[$.UserName].hot=1;
                    continue;
                } 
            }else if( Pin_i==-1 || (shareInfo[Pin_i].id && !query) ) continue;
            //await TotalBean();
            console.log(`\n******开始【京东`+(Pin_i!=-1?"车头":"")+`账号${$.index}】${$.nickName || $.UserName}*********`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            await getinfo(1,Pin_i);
            await $.wait(1000);
        }
    }
    let txt=''
    if(shareInfo.length){
        console.log('\n检查是否存在空助力码.')
        for (let j = 0,l=shareInfo.length,uname; j < l; j++) {
            uname=sharePins[j];
            if( !shareInfo[j].id ){
                console.log('用户名：${uname} 助力码为空！');
                shareInfo.splice(j, 1);j--;
            }else txt+=uname+':'+shareInfo[j].id+'&';
        }
    }

    if (shareInfo.length) {
        console.log('\n开始助力...')
        console.log(`${JSON.stringify(shareInfo)}\n`)
        if(txt) console.log(`export DYJ_shareInfo="${txt.slice(0,-1)}"\n`)
        if(need_invite == 0) need_invite = 10;
        $.index = 0;
		let ck_i = 0,ck_length = cookiesArr.length,data;
        for (let j = 0,sinfo; j < shareInfo.length; j++) {
            sinfo=shareInfo[j];
            if(!helpinfo[sinfo.pin]) helpinfo[sinfo.pin]={};
            if(!helpinfo[sinfo.pin].invite_success) helpinfo[sinfo.pin].invite_success=0;
            if ( helpinfo[sinfo.pin].invite_success>=need_invite ) continue;
            console.log('\n去助力--> ' + sinfo.pin);
            if ($.index === ck_length) {console.time('已无账号可用于助力！结束\n');break};
            for (let i = ck_i; i < ck_length - ck_i; i++) {
                if (cookiesArr[i]) {
                    cookie = cookiesArr[i];
                    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                    $.index = i + 1;
                    UA = helpinfo[$.UserName].ua;
                    if($.UserName==sinfo.pin){
                        cookiesArr.push(cookie);
                        ck_length=cookiesArr.length
                        continue;
                    }
                    if(helpinfo[$.UserName].hot) continue;
                    data=await help(sinfo);
                    let msg=data.msg;
                    if (data.code === 0) {
                        helpinfo[sinfo.pin].invite_success++;
                        msg=`助力成功${helpinfo[sinfo.pin].invite_success}次`;
                        console.time(`账号[${$.index}][${$.nickName || $.UserName}]：${msg}`);
                        if(helpinfo[sinfo.pin].invite_taskId){
                            UA = helpinfo[sinfo.pin].ua;
                            cookie = helpinfo[sinfo.pin].cookie;
                            console.time(`车头[${sinfo.pin}]：去领取邀请好友打卡奖励`);
                            await Award(helpinfo[sinfo.pin].invite_taskId);
                            await $.wait(500);
                        }
                    } else if (data.code === 147) {//活动太火爆了，请稍后再试
                        helpinfo[$.UserName].hot=1;
                    } else if (data.code === 1006) {
                        msg='不能助力自己！';
                    } else if (data.code === 1007) {//已助力
                        helpinfo[sinfo.pin].invite_success++;
                    } else if (data.code === 1008) {//天助力次数限制
                        msg='今日无助力次数了！';
                    } else if (data.code === 1009) {//助力任务已完成
                        helpinfo[sinfo.pin].invite_success=need_invite;
                        i--;
                    } else {
                        if (data.msg.includes('火爆')) helpinfo[$.UserName].hot=1;
						console.time('此CK助力可能黑了！');
                        msg="code->"+data.code+":"+data.msg;
                    }
                    if (data.code != 0) console.time(`账号[${$.index}][${$.nickName || $.UserName}]：${msg}`);
                    if( DYJ_HelpWait.length>1 ){
                        let s=randomNumber(DYJ_HelpWait[0],DYJ_HelpWait[1]);
                        console.time(`随机等待${s}Ms`);
                        await $.wait(s)
                    }else if(DYJ_HelpWait[0]){
                        console.time(`固定等待${s}Ms`);
                        await $.wait(DYJ_HelpWait[0])
                    }
                    if (helpinfo[sinfo.pin].invite_success >= need_invite) {
                        console.time(`助力已满${need_invite}，跳出！`);ck_i = i;break
                    };
                }
            }
        }
    } else {
        console.log('无助立马请设置！！\n')
    }

    console.log('\n\n开始领取任务奖励...')
    black_user=[];
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            UA = helpinfo[$.UserName].ua;
            let ct=sharePins.includes($.UserName);
            if ( helpinfo[$.UserName].hot && !ct ){
                if( !black_user.includes($.UserName) ) black_user.push($.UserName)
                continue;
            }
            console.log("\n");
            console.time(`【`+(ct?"车头":"")+`账号${$.index}】${$.UserName}`);
            await getinfo(0);
            await $.wait(1000);
            await gettask(ct,1);
            await $.wait(1000);
        }
    }

    console.log(`\n\n统计：
    账号数量：${cookiesArr.length}
    正常:${cookiesArr.length-black_user.length}
    黑名单账号:${black_user.length}
`)

    if(black_user.length){
        fs.writeFile(black_path, black_user.join("&"), function (err) {
            if (err) {
                console.log(err);
                console.log(`\n缓存文件${black_path}更新失败!`);
            } else {
                console.log(`\n缓存文件${black_path}更新成功!`);
            }
        })
    }

})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function getinfo(xc,Pin_i) {
    return new Promise(async (resolve) => {
        $.get(taskUrl('makemoneyshop/home', 'activeId=63526d8f5fe613a6adb48f03&_stk=activeId&_ste=1'), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    let tostr = data.match(/\((\{.*?\})\)/)[1];
                    data = eval('(' + tostr + ')');
                    if (data.code == 0) {
                        helpinfo[$.UserName].hot = 0;
                        let sId = data.data.shareId;
                        helpinfo[$.UserName].sId = `${sId}`;
                        console.log('当前营业金：' + data.data.canUseCoinAmount);
                        if (xc) {
                            console.log('助力码：' + sId);
                        }
                        if( typeof Pin_i !== "undefined" && Pin_i!=-1 ){
                            await $.wait(500);
                            await gettask(0,0);
                            if(shareInfo[Pin_i].id){
                                if(shareInfo[Pin_i].id!=sId){
                                    shareInfo[Pin_i].id=sId;
                                    console.log('检测到当前用户设置的助力码和获取的不匹配！');
                                }
                            }else{
                                shareInfo[Pin_i].id=sId;
                                console.log('检测到当前用户没有设置助力码哦！');
                            }
                        }
                    } else {
                        console.log(data.msg);
                        if (data.msg.includes('火爆')) console.log('此CK可能黑了！');
                        helpinfo[$.UserName].hot = 1;
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

function gettask(info,领取) {
    return new Promise(async (resolve) => {
        $.get(taskUrl('newtasksys/newtasksys_front/GetUserTaskStatusList', `__t=${Date.now}&source=makemoneyshop&bizCode=makemoneyshop`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    let tostr = data.match(/\((\{.*?\})\n\)/)[1];
                    data = eval('(' + tostr + ')');
                    if (data.ret == 0) {
                        $.tasklist = data.data.userTaskStatusList;
                        if($.tasklist) for (let item of $.tasklist) {
                            let taskName = item['taskName'],
                            reward = parseInt(item['reward']) / 100,
                            taskId = item['taskId'],
                            configTargetTimes = parseInt(item['configTargetTimes']),
                            status = item.awardStatus;
                            if(taskName == '邀请好友打卡'){
                                helpinfo[$.UserName].invite_success = item['realCompletedTimes']
                                helpinfo[$.UserName].invite_taskId = item['taskId']
                                helpinfo[$.UserName].cookie = cookie
                                if(need_invite == 0) need_invite = configTargetTimes
                                if (helpinfo[$.UserName].invite_success < need_invite){
                                    info && console.log(`最高可邀请${need_invite}人,目前已邀请${helpinfo[$.UserName].invite_success}人,还需邀请${parseInt(need_invite) - parseInt(helpinfo[$.UserName].invite_success)}人`)
                                }else{
                                    info && console.log(`最高可邀请${need_invite}人,目前已邀请${helpinfo[$.UserName].invite_success}人,助力已满`)
                                }
                            }
                            info && console.log(`${taskId} : ${taskName} -- ${reward}个营业币 -- `+(status==1?'已完成':(status==2?'未完成':status)));
                            if ( status !== 1 && 领取 ) {
                                for (let k = 0; k < (item.realCompletedTimes - item.targetTimes + 1); k++) {
                                    console.log(`去领取${taskName}奖励`);
                                    await $.wait(500);
                                    await Award(item.taskId);
                                }
                            }
                        }
                    } else {
                        console.log(data.msg);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

function Award(id) {
    return new Promise(async (resolve) => {
        $.get(taskUrl('newtasksys/newtasksys_front/Award', `__t=${Date.now()}&source=makemoneyshop&taskId=${id}&bizCode=makemoneyshop`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    let tostr = data.match(/\((\{.*?\})\n\)/)[1];
                    data = eval('(' + tostr + ')');
                    if (data.ret == 0) {
                        if(data.data?.prizeInfo) console.log('获得营业金：' + (data.data.prizeInfo / 100) + '元');
                    } else {
                        console.log(data.msg);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}


function help(sinfo) {
    return new Promise(async (resolve) => {
        $.get(taskUrl('makemoneyshop/guesthelp', `activeId=63526d8f5fe613a6adb48f03&shareId=${sinfo.id}&_stk=activeId,shareId&_ste=1`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    let tostr = data.match(/\((\{.*?\})\)/)[1];
                    data = eval('(' + tostr + ')');
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

function taskUrl(fn, body) {
    return {
        url: `https://wq.jd.com/${fn}?g_ty=h5&g_tk=&appCode=msc588d6d5&${body}&h5st=&sceneval=2&callback=__jsonp1667344808184`,
        headers: {
            'Origin': 'https://wq.jd.com',
            'Referer': 'https://wqs.jd.com/sns/202210/20/make-money-shop/index.html?activeId=63526d8f5fe613a6adb48f03',
            'User-Agent': UA,
            'Cookie': cookie
        }
    }
}

function TotalBean() {
    return new Promise((resolve) => {
        const options = {
            url: 'https://plogin.ck_length.jd.com/cgi-bin/ml/islogin',
            headers: {
                "Cookie": cookie,
                "referer": "https://h5.ck_length.jd.com/",
                "User-Agent": UA,
            },
            timeout: 10000
        }
        $.get(options, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.islogin === "1") {
                    } else if (data.islogin === "0") {
                        $.isLogin = false;
                    }
                }
            } catch (e) {
                console.log(e);
            }
            finally {
                resolve();
            }
        });
    });
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