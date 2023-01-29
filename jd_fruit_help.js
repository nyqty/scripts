/*
东东水果:脚本更新地址 jd_fruit_help.js
更新时间：2021-5-18
活动入口：京东APP我的-更多工具-东东农场
东东农场内部互助活动链接：https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
互助码shareCode请先手动运行脚本查看打印可看到
一天只能帮助3个人。多出的助力码无效
==========================Quantumultx=========================
[task_local]
#jd免费水果
20 4,16 * * * jd_fruit_help.js, tag=东东农场内部互助, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true
=========================Loon=============================
[Script]
cron "20 4,16 * * *" script-path=jd_fruit_help.js,tag=东东农场内部互助

=========================Surge============================
东东农场内部互助 = type=cron,cronexp="20 4,16 * * *",wake-system=1,timeout=3600,script-path=jd_fruit_help.js

=========================小火箭===========================
东东农场内部互助 = type=cron,script-path=jd_fruit_help.js, cronexpr="20 4,16 * * *", timeout=3600, enable=true

export DO_TEN_WATER_AGAIN="" 默认再次浇水

*/
const Env=require('./utils/Env.js');
const $ = new Env('东东农场内部水滴互助');
const h5st3=require('./utils/h5st3.js');
let cookiesArr = [],
    cookie = '',
    jdFruitShareArr = [],
    isBox = false,
    notify, allMessage = '';
//助力好友分享码(最多3个,否则后面的助力失败),原因:京东农场每人每天只有3次助力机会
//此此内容是IOS用户下载脚本到本地使用，填写互助码的地方，同一京东账号的好友互助码请使用@符号隔开。
//下面给出两个账号的填写示例（iOS只支持2个京东账号）
let shareCodes = [ // 这个列表填入你要助力的好友的shareCode
    //     //账号一的好友shareCode,不同好友的shareCode中间用@符号隔开
    //     '5853550f71014282912b76d95beb84c0@b58ddba3317b44ceb0ac86ea8952998c@8d724eb95e3847b6a1526587d1836f27@a80b7d1db41a4381b742232da9d22443@ce107b8f64d24f62a92292180f764018@c73ea563a77d4464b273503d3838fec1@0dd9a7fd1feb449fb1bf854a3ec0e801',
    //     //账号二的好友shareCode,不同好友的shareCode中间用@符号隔开
    //     '5853550f71014282912b76d95beb84c0@b58ddba3317b44ceb0ac86ea8952998c@8d724eb95e3847b6a1526587d1836f27@a80b7d1db41a4381b742232da9d22443@ce107b8f64d24f62a92292180f764018@c73ea563a77d4464b273503d3838fec1@0dd9a7fd1feb449fb1bf854a3ec0e801',
]
let newShareCodes = [];
let message = '',
    subTitle = '',
    option = {},
    isFruitFinished = false;
const retainWater = $.isNode() ? (process.env.retainWater ? process.env.retainWater : 100) : ($.getdata('retainWater') ? $.getdata('retainWater') : 100); //保留水滴大于多少g,默认100g;
let jdNotify = true; //是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false; //农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let randomCount = $.isNode() ? 20 : 5;
const JD_API_HOST = 'https://api.m.jd.com/client.action';
const urlSchema = `openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D`;
let NowHour = new Date().getHours();
let llhelp = true;
const fs = require('fs');
let boolneedUpdate = false;
let strShare = './Fruit_ShareCache.json';
let Fileexists = fs.existsSync(strShare);
let TempShareCache = [];
if (Fileexists) {
    console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入...");
    TempShareCache = fs.readFileSync(strShare, 'utf-8');
    if (TempShareCache) {
        TempShareCache = TempShareCache.toString();
        TempShareCache = JSON.parse(TempShareCache);
    }
}
let lnrun = 0;
let llgetshare = false;
let NoNeedCodes = [];
!(async () => {
    await requireConfig();
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    $.H5ST3={};
    $.UUID={};
    //
        //1393131393565683-1346161346432326
    if (llhelp) {
        console.log('\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n');
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                //await TotalBean();
                if (!$.isLogin) {
                    $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

                    if ($.isNode()) {
                        await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                    }
                    continue
                }
                message = '';
                subTitle = '';
                option = {};
                $.UA = require('./USER_AGENTS').UARAM();
                $.retry = 0;
                llgetshare = false;
                await GetCollect();
                if (llgetshare) {
                    await $.wait(5000);
                    lnrun++;
                }
                if (lnrun == 10) {
                    console.log(`\n【访问接口次数达到10次，休息一分钟.....】\n`);
                    await $.wait(60 * 1000);
                    lnrun = 0;
                }
            }
        }
        if (boolneedUpdate) {
            var str = JSON.stringify(TempShareCache, null, 2);
            fs.writeFile(strShare, str, function (err) {
                if (err) {
                    console.log(err);
                    console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n");
                } else {
                    console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
                }
            })
        }
    }
    console.log('\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n');
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            //await TotalBean();
            console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            message = '';
            subTitle = '';
            option = {};
            $.UA = require('./USER_AGENTS').UARAM();
            $.retry = 0;
            lnrun++;
            await jdFruit();
            if (lnrun == 3) {
                console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);
                await $.wait(60 * 1000);
                lnrun = 0;
            }
        }
    }
    if ($.isNode() && allMessage && $.ctrTemp) {
        await notify.sendNotify(`${$.name}`, `${allMessage}`)
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
async function jdFruit() {
    subTitle = `【京东账号${$.index}】${$.nickName || $.UserName}`;
    try {
        await initForFarm();
        if ($.farmInfo.farmUserPro) {
            // option['media-url'] = $.farmInfo.farmUserPro.goodsImage;
            //message = `【水果名称】${$.farmInfo.farmUserPro.name}\n`;
            //console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${$.farmInfo.farmUserPro.shareCode}\n`);
            console.log(`\n【已成功兑换水果】${$.farmInfo.farmUserPro.winTimes}次\n`);
            //message += `【已兑换水果】${$.farmInfo.farmUserPro.winTimes}次\n`;
            await masterHelpShare(); //助力好友
            await turntableFarm();//天天抽奖得好礼
            if ($.farmInfo.treeState === 2 || $.farmInfo.treeState === 3) {
                option['open-url'] = urlSchema;
                //$.msg($.name, ``, `【京东账号${$.index}】${$.nickName || $.UserName}\n【提醒⏰】${$.farmInfo.farmUserPro.name}已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达`, option);
                return
            } else if ($.farmInfo.treeState === 1) {
                console.log(`\n${$.farmInfo.farmUserPro.name}种植中...\n`)
            } else if ($.farmInfo.treeState === 0) {
                //已下单购买, 但未开始种植新的水果
                option['open-url'] = urlSchema;
                //$.msg($.name, ``, `【京东账号${$.index}】 ${$.nickName || $.UserName}\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达`, option);
                return
            }
        } else {
            //console.log(`初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据!`);
            if ($.retry < 2) {
                $.retry++
                console.log(`等待3秒后重试,第:${$.retry}次`);
                await $.wait(3000);
                await jdFruit();
            }
        }
    } catch (e) {
        //console.log(`任务执行异常，请检查执行日志 ‼️‼️`);
        $.logErr(e);
        // const errMsg = `京东账号${$.index} ${$.nickName || $.UserName}\n任务执行异常，请检查执行日志 ‼️‼️`;
        // if ($.isNode()) await notify.sendNotify(`${$.name}`, errMsg);
        // $.msg($.name, '', `${errMsg}`)
    }
    //await showMsg();
}
//天天抽奖活动
async function turntableFarm() {
    await initForTurntableFarm();
    if ($.initForTurntableFarmRes.code === '0') {
        //领取定时奖励 //4小时一次
        let { timingIntervalHours, timingLastSysTime, sysTime, remainLotteryTimes, turntableInfos } = $.initForTurntableFarmRes;
        //天天抽奖助力
        console.log('开始天天抽奖--好友助力--每人每天只有三次助力机会.')
        for (let code of newShareCodes) {
            if (code === $.farmInfo.farmUserPro.shareCode) {
                console.log('天天抽奖-不能自己给自己助力\n')
                continue
            }
            await lotteryMasterHelp(code);
            if ($.lotteryMasterHelpRes.helpResult) {
                if ($.lotteryMasterHelpRes.helpResult.code === '0') {
                    console.log(`天天抽奖-助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}成功\n`)
                } else if ($.lotteryMasterHelpRes.helpResult.code === '11') {
                    console.log(`天天抽奖-不要重复助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}\n`)
                } else if ($.lotteryMasterHelpRes.helpResult.code === '13') {
                    console.log(`天天抽奖-助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}失败,助力次数耗尽\n`);
                    break;
                }
            }
        }
        console.log(`天天抽奖次数共-${remainLotteryTimes}次`)
        //抽奖
        if (remainLotteryTimes > 0) {
            console.log('开始抽奖')
            let lotteryResult = '';
            for (let i = 0; i < new Array(remainLotteryTimes).fill('').length; i++) {
                await lotteryForTurntableFarm()
                console.log(`第${i + 1}次抽奖结果${JSON.stringify($.lotteryRes)}`);
                if ($.lotteryRes.code === '0') {
                    turntableInfos.map((item) => {
                        if (item.type === $.lotteryRes.type) {
                            console.log(`lotteryRes.type${$.lotteryRes.type}`);
                            if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === 'bean') {
                                lotteryResult += `${item.name}个，`;
                            } else if ($.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === 'water') {
                                lotteryResult += `${item.name}，`;
                            } else {
                                lotteryResult += `${item.name}，`;
                            }
                        }
                    })
                    //没有次数了
                    if ($.lotteryRes.remainLotteryTimes === 0) {
                        break
                    }
                }
            }
            if (lotteryResult) {
                console.log(`【天天抽奖】${lotteryResult.substr(0, lotteryResult.length - 1)}\n`)
                // message += `【天天抽奖】${lotteryResult.substr(0, lotteryResult.length - 1)}\n`;
            }
        } else {
            console.log('抽奖完成没有次数啦~')
        }
    } else {
        console.log('初始化天天抽奖得好礼失败')
    }
}
//助力好友
async function masterHelpShare() {
    await $.wait(2000);
    await initForFarm();
    let salveHelpAddWater = 0;
    let remainTimes = 3;//今日剩余助力次数,默认3次（京东农场每人每天3次助力机会）。
    let helpSuccessPeoples = '';//成功助力好友
    if (llhelp) {
        console.log('开始助力好友')
        for (let code of newShareCodes) {
            if (NoNeedCodes) {
                var llnoneed = false;
                for (let NoNeedCode of NoNeedCodes) {
                    if (code == NoNeedCode) {
                        llnoneed = true;
                        break;
                    }
                }
                if (llnoneed) {
                    console.log(`${code}助力已满，跳过...`);
                    continue;
                }
            }
            console.log(`${$.UserName}开始助力: ${code}`);
            if (!code) continue;
            if (!$.farmInfo.farmUserPro) {
                console.log('未种植,跳过助力\n')
                continue
            }
            if (code === $.farmInfo.farmUserPro.shareCode) {
                console.log('不能为自己助力哦，跳过自己的shareCode\n')
                continue
            }
            await masterHelp(code);
            if ($.helpResult.code === '0') {
                if ($.helpResult.helpResult.code === '0') {
                    //助力成功
                    salveHelpAddWater += $.helpResult.helpResult.salveHelpAddWater;
                    console.log(`【助力好友结果】: 已成功给【${$.helpResult.helpResult.masterUserInfo.nickName}】助力`);
                    console.log(`给好友【${$.helpResult.helpResult.masterUserInfo.nickName}】助力获得${$.helpResult.helpResult.salveHelpAddWater}g水滴`)
                    helpSuccessPeoples += ($.helpResult.helpResult.masterUserInfo.nickName || '匿名用户') + ',';
                } else if ($.helpResult.helpResult.code === '8') {
                    console.log(`【助力好友结果】: 助力【${$.helpResult.helpResult.masterUserInfo.nickName}】失败，您今天助力次数已耗尽`);
                } else if ($.helpResult.helpResult.code === '9') {
                    console.log(`【助力好友结果】: 之前给【${$.helpResult.helpResult.masterUserInfo.nickName}】助力过了`);
                } else if ($.helpResult.helpResult.code === '10') {
                    NoNeedCodes.push(code);
                    console.log(`【助力好友结果】: 好友【${$.helpResult.helpResult.masterUserInfo.nickName}】已满五人助力`);
                } else {
                    console.log(`助力其他情况：${JSON.stringify($.helpResult.helpResult)}`);
                }
                console.log(`【今日助力次数还剩】${$.helpResult.helpResult.remainTimes}次\n`);
                remainTimes = $.helpResult.helpResult.remainTimes;
                if ($.helpResult.helpResult.remainTimes === 0) {
                    console.log(`您当前助力次数已耗尽，跳出助力`);
                    break
                }
            } else {
                console.log(`助力失败::${JSON.stringify($.helpResult)}`);
            }
        }
    }
    if ($.isLoon() || $.isQuanX() || $.isSurge()) {
        let helpSuccessPeoplesKey = timeFormat() + $.farmInfo.farmUserPro.shareCode;
        if (!$.getdata(helpSuccessPeoplesKey)) {
            //把前一天的清除
            $.setdata('', timeFormat(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo.farmUserPro.shareCode);
            $.setdata('', helpSuccessPeoplesKey);
        }
        if (helpSuccessPeoples) {
            if ($.getdata(helpSuccessPeoplesKey)) {
                $.setdata($.getdata(helpSuccessPeoplesKey) + ',' + helpSuccessPeoples, helpSuccessPeoplesKey);
            } else {
                $.setdata(helpSuccessPeoples, helpSuccessPeoplesKey);
            }
        }
        helpSuccessPeoples = $.getdata(helpSuccessPeoplesKey);
    }
    if (helpSuccessPeoples && helpSuccessPeoples.length > 0) {
        //message += `【您助力的好友👬】${helpSuccessPeoples.substr(0, helpSuccessPeoples.length - 1)}\n`;
    }
    if (salveHelpAddWater > 0) {
        // message += `【助力好友👬】获得${salveHelpAddWater}g💧\n`;
        console.log(`【助力好友👬】获得${salveHelpAddWater}g💧\n`);
    }
    //message += `【今日剩余助力👬】${remainTimes}次\n`;
    console.log('助力好友结束，即将开始领取额外水滴奖励\n');
}

async function GetCollect() {
    try {
        console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】`);
        var llfound = false;
        var strShareCode = "";
        if (TempShareCache) {
            for (let j = 0; j < TempShareCache.length; j++) {
                if (TempShareCache[j].pt_pin == $.UserName) {
                    llfound = true;
                    strShareCode = TempShareCache[j].ShareCode;
                }
            }
        }
        if (!llfound) {
            console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
            llgetshare = true;
            await initForFarm();
            if ($.farmInfo.farmUserPro) {
                var tempAddCK = {};
                strShareCode = $.farmInfo.farmUserPro.shareCode;
                tempAddCK = {
                    "pt_pin": $.UserName,
                    "ShareCode": strShareCode
                };
                TempShareCache.push(tempAddCK);
                //标识，需要更新缓存文件
                boolneedUpdate = true;
            }
        }

        if (strShareCode) {
            console.log(`\n` + strShareCode);
            newShareCodes.push(strShareCode)
        } else {
            console.log(`\n数据异常`);
        }
    } catch (e) {
        $.logErr(e);
    }
}

// ========================API调用接口========================
// 初始化集卡抽奖活动数据API
async function initForTurntableFarm() {
    $.initForTurntableFarmRes = await request(arguments.callee.name.toString(), { version: 4, channel: 1 });
}
async function lotteryForTurntableFarm() {
    await $.wait(2000);
    console.log('等待了2秒');
    $.lotteryRes = await request(arguments.callee.name.toString(), { type: 1, version: 4, channel: 1 });
}

/**
 * 天天抽奖拿好礼-助力API(每人每天三次助力机会)
 */
async function lotteryMasterHelp() {
    $.lotteryMasterHelpRes = await request(`initForFarm`, {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + '-3',
        babelChannel: "3",
        version: 4,
        channel: 1
    });
}

// 助力好友API
async function masterHelp() {
    $.helpResult = await request(`initForFarm`, {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0],
        babelChannel: "3",
        version: 2,
        channel: 1
    });
}
/**
 * 初始化农场, 可获取果树及用户信息API
 */
async function initForFarm() {
    const functionId = arguments.callee.name.toString();
    //$.farmInfo = await request(functionId, {"babelChannel":"121","sid":"3c52b5f17ab2a42398939a27887eaf8w","version":18,"channel":1});//有h5st
    $.farmInfo = await request(functionId, {"babelChannel":"121","sid":"c58c8776f16696f164d7164a35306ebw","version":19,"channel":1});//有h5st
}

function timeFormat(time) {
    let date;
    if (time) {
        date = new Date(time)
    } else {
        date = new Date();
    }
    return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
}

function requireConfig() {
    return new Promise(resolve => {
        console.log('开始获取配置文件\n')
        notify = $.isNode() ? require('./sendNotify') : '';
        //Node.js用户请在jdCookie.js处填写京东ck;
        const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
        //IOS等用户直接用NobyDa的jd cookie
        if ($.isNode()) {
            Object.keys(jdCookieNode).forEach((item) => {
                if (jdCookieNode[item]) {
                    cookiesArr.push(jdCookieNode[item])
                }
            })
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
        } else {
            cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
        }
        console.log(`共${cookiesArr.length}个京东账号\n`)
        $.shareCodesArr = [];
        resolve()
    })
}

function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if (data['retcode'] === 0 && data.base && data.base.nickname) {
                            $.nickName = data.base.nickname;
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
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

async function request(function_id, body = {}, timeout = 2000) {
    var options=taskUrl(function_id, body);
    if(function_id=="initForFarm"){
        //jdapp;android;11.2.8;
        array=$.UA.split(";");
        if( !$.H5ST3[$.UserName] ){
            $.H5ST3[$.UserName] = new h5st3('8a2af', $.UA, "4848222220195689")
            await $.H5ST3[$.UserName].genAlgo()
        }
        if(!$.UUID[$.UserName]) $.UUID[$.UserName] = getUUID('xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx');
        await $.wait(500);
        let uuid=$.UUID[$.UserName],appid="signed_wh5",client=array[1]=="iPhone"?"ios":array[1],
        clientVersion=array[2],
        timestamp=Date.now(),
        h5st = $.H5ST3[$.UserName].genH5st({
            appid,
            body: JSON.stringify(body),
            client,
            clientVersion,
            functionId: function_id,
            //timestamp
            t: timestamp.toString()
        })
        console.log(h5st)
        options.url+=`&appid=${appid}&osVersion=13&timestamp=${timestamp}&client=${client}&clientVersion=${clientVersion}&uuid=${uuid}&h5st=${h5st}`
    }
    /*
    https://api.m.jd.com/client.action?functionId=friendListInitForFarm&body=%7B%22lastId%22%3Anull%2C%22version%22%3A19%2C%22channel%22%3A1%2C%22babelChannel%22%3A%22121%22%2C%22lat%22%3A%2228.130173%22%2C%22lng%22%3A%22105.161756%22%7D&appid=wh5&area=22_2005_2010_36462&osVersion=13&screen=407*904&networkType=wifi&timestamp=1674971471337&d_brand=Redmi&d_model=22081212C&wqDefault=false&client=android&clientVersion=11.4.4&partner=xiaomi001&build=98651&uuid=1393131393565683-1346161346432326
    */
    return new Promise(resolve => {
        setTimeout(() => {
            $.get(options, (err, resp, data) => {
                try {
                    if (err) {
                        console.log('\n东东农场: API查询请求失败 ‼️‼️')
                        console.log(JSON.stringify(err));
                        console.log(`function_id:${function_id}`)
                        $.logErr(err);
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data);
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            })
        }, timeout)
    })
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

function taskUrl(function_id, body = {}) {
    return {
        url: `${JD_API_HOST}?functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&appid=wh5`,
        headers: {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": cookie
        },
        timeout: 10000
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
        var r = 16 * Math.random() | 0,
        n = "x" == x ? r : 3 & r | 8;
        return uuid = t ? n.toString(36).toUpperCase() : n.toString(36),
        uuid
    })
}