
/*
入口：京喜首页领红包
CK1助力作者
运行流程：助力--任务--抽奖
未设置助力码变量运行会输出助力码
也可通过分享口令使用口令转链接获得
目前需邀请50人 最高开 1元红包
cron "20 9 * * *" jx_lhb.js, tag:京喜领红包
变量格式(多个&分割):
export JX_LHB_CODE='shareId@itemId'
updatetime: 2023/2/28
 */
//https://st.jingxi.com/promote/2023/spring2023/index.html?activeId=63ef4e50c800b87f7a99e144&shareId=103_121_104_119_97_84_72_110_48_77_85_53_83_105_102_71_77_118_65_76_55_65_61_61&itemId=SZk7ilpW8IMpg&source=3&jxsid=16775889033267031262&appCode=msd1188198
const Env = require('./utils/Env.js');
const $ = new Env("京喜领红包");
const notify = $.isNode() ? require("./sendNotify") : "",
    jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
    activeId = "63ef4e50c800b87f7a99e144",
    appCode = "msd1188198",
    appId = "99062";
const H5ST=require('./utils/h5st.js');

let cookiesArr = [], cookie = "", message = "";
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach(i => {
        cookiesArr.push(jdCookieNode[i]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x594a10 => _0x594a10.cookie)].filter(_0x407e4a => !!_0x407e4a);
}
let JX_LHB_CODE = "";
process.env.JX_LHB_CODE && (process.env.JX_LHB_CODE.indexOf("&") > -1 ? JX_LHB_CODE = process.env.JX_LHB_CODE.split("&") : JX_LHB_CODE = [process.env.JX_LHB_CODE]);

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    console.log("当前版本：V2.0.0");
    console.log("运行流程：助力--任务--抽奖");
    let authorCodeList = [
        "103_121_104_119_97_84_72_110_48_77_85_53_83_105_102_71_77_118_65_76_55_65_61_61@SZk7ilpW8IMpg",
        "70_43_75_120_52_66_54_56_72_98_77_76_107_110_53_98_116_47_51_71_55_81_61_61@S77k6Bk1H",
        "66_78_43_43_121_118_80_51_51_100_50_51_71_43_71_107_110_98_100_90_74_103_61_61@S5KkcAkhNoweSeGGl87Bb",
        "53_84_55_83_54_79_71_49_57_75_77_72_47_113_65_80_65_83_113_81_75_65_61_61@S5KkcKmtOty-rfUG14oJM",
        "100_102_116_74_57_89_100_114_67_122_53_57_107_49_112_77_110_43_104_89_82_98_74_110_101_67_66_74_118_54_117_75_68_80_74_74_108_101_106_118_68_114_103_61@S5KkcRBtM8VfSIR_2lvEMIQ",
        //"110_47_48_115_71_84_116_104_112_116_98_103_101_119_70_97_97_84_81_49_84_103_61_61@S5KkcIGxutw-Dan6-0IlA",
        //"69_115_102_120_108_77_107_67_114_89_82_116_114_50_110_83_73_107_90_114_73_76_74_110_101_67_66_74_118_54_117_75_68_80_74_74_108_101_106_118_68_114_103_61@S5KkcRxce9lXQcx6lxvRedg"
    ];
    let authorCode = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
    $.UAS={};
    $.H5ST={};
    if (JX_LHB_CODE) {
        JX_LHB_CODE = [...new Set([...JX_LHB_CODE, ...authorCodeList])];
        console.log("多余助力会助力TY");
        console.log("\n开始助力...");
        console.log(JX_LHB_CODE);
        let Start = 0;
        for (let SC of JX_LHB_CODE) {
            if (SC == undefined) continue;
            $.full = false;
            $.hnum = 0;
            for (let i = Start; i < cookiesArr.length; i++) {
                if (cookiesArr[i]) {
                    cookie = cookiesArr[i];
                    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                    $.index = i + 1;
                    $.nickName = "";
                    get_UA();
                    console.log("\n开始【账号" + $.index + "】" + ($.nickName || $.UserName));
                    if ($.index == 1 && authorCode) {
                        SC = authorCode;
                        console.log("当前CK1去助力作者");
                    } else {
                        console.log("去助力 " + SC);
                    }
                    let [shareId, itemId] = SC.split("@");
                    $.flag = 1;
                    let data = await jx_get("festivalhb_help", { activeId, shareId, itemId })
                    let { code, msg } = data;
                    if (code == 0) {
                        if ($.index > 1) $.hnum++;
                        console.log("助力成功 " + ($.index > 1 ? $.hnum : ""));
                    } else if (code == 103) {
                        console.log("对方助力已满");
                        if ($.index > 1) $.full = true;
                    } else {
                        //103:今日领好友红包个数已达上限
                        //104已助力过TA
                        //108:无助力次数
                        //-120:不能助力自己
                        //-130:活动火爆，请稍后尝试
                        console.log(`助力失败${code}：${msg}`);
                    }
                    if ($.full || $.hnum >= 45) {
                        Start = i + 1;
                        break;
                    }
                    await $.wait(2000);
                }
            }
            if ($.index == cookiesArr.length) {
                break;
            }
        }
    } else {
        console.log("未设置助力码,开始任务和抽奖");
    }
    console.log("\n开始任务和抽奖......");
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = i + 1;
            $.nickName = "";
            get_UA();
            console.log("\n******开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            $.flag = 1;
            let data = await jx_get("festivalhb_home", { activeId })
            if (data.code == 0) {
                data = data.data;
                $.lottery = data.drawChanceNum;
                $.tasklist = data.browseTaskList;
                $.cash = data.totalCoinAmount;
                $.red = data.totalHbAmount;
                console.log("助力码:\n" + data.shareId + "@" + data.helpTask.itemId);
            } else {
                console.log(data.msg);
                continue;
            }
            $.flag = 0;
            await $.wait(500);
            await querymyprizelist();
            await $.wait(500);
            console.log("\n开始做浏览任务。。。");
            for (let task of $.tasklist) {
                if (task.completionFlag) {
                    console.log(task.assignmentName + "---已完成");
                    continue;
                }
                console.log("去做 " + task.assignmentName);
                data = await jx_get("festivalhb_browse", { activeId, taskId: task.encryptAssignmentId, itemId: task.shoppingActivityList[0].itemId });
                if (data.code == 0) {
                    console.log("任务完成，" + data.data.drawChanceNum + "抽奖次数");
                    $.lottery = data.data.drawChanceNum;
                } else {
                    console.log(data.msg);
                }
                await $.wait(1000);
            }
            if($.lottery) console.log("\n开始抽奖...");
            for (let u = 0; u < $.lottery; u++) {
                data = await jx_get("festivalhb_draw", { activeId });
                if (data.code == 0) {
                    if (data.data.prize.length == 0) {
                        continue;
                    }
                    let { prizeType } = data.data.prize[0];
                    if (prizeType == 1) {
                        console.log("获得优惠券");
                    } else if (prizeType == 2 || prizeType == 3) {
                        console.log("获得" + data.data.prize[0].desc);
                    }
                } else {
                    console.log(data.msg);
                }
                await $.wait(1000);
            }
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


async function querymyprizelist() {
    const options = {
        "url": "https://api.jingxi.com/api?functionId=festivalhb_querymyprizelist&appid=jx_h5&t=1677806115621&channel=jxapp&cv=1.2.5&clientVersion=1.2.5&client=jxapp&uuid=30988114080298885&cthr=1&loginType=2&body=%7B%22activeId%22%3A%2263ef4e50c800b87f7a99e144%22%2C%22type%22%3A1%2C%22isExpire%22%3A1%2C%22ptag%22%3A%22138631.26.134%22%2C%22%24taroTimestamp%22%3A1677804984936%2C%22sceneval%22%3A2%2C%22buid%22%3A325%2C%22appCode%22%3A%22msd1188198%22%2C%22time%22%3A1677806115621%2C%22signStr%22%3A%220aeab59aa8165574c334c0147dccacb7%22%7D",
        "headers": {
            "Origin": "https://st.jingxi.com",
            "User-Agent": $.UA,
            "Cookie": cookie
        }
    };
    return new Promise(async resolve => {
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log("" + JSON.stringify(err));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    data = JSON.parse(data);
                    data.code == 0 ? console.log("\n已获得红包总计：" + data.data.totalHbAmount + ",现金总计：" + data.data.totalCoinAmount + ",可提现金额剩余：" + data.data.canUseCoinAmount) : console.log(data.msg);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        });
    });
}

async function jx_get(fn, body = { activeId }) {
    if( !$.H5ST[$.UserName] ) $.H5ST[$.UserName]={}
    if( !$.H5ST[$.UserName][appId] ){
        $.H5ST[$.UserName][appId]= new H5ST({
            appId,
            "appid": "jx_h5",
            "clientVersion": "1.0",
            "client":"jx_h5",
            "pin": $.UserName,
            "ua": $.UA,
            "version":"3.1",
            "expand":{}
        });
        await $.H5ST[$.UserName][appId].genAlgo();
    };
    let get =  await $.H5ST[$.UserName][appId].genUrlParams(fn,body)
    const opt = {
        "url": `https://api.jingxi.com/api?g_ty=h5&g_tk=&appCode=${appCode}&${get}&loginType=2&sceneval=2`,
        "headers": {
            "Host": "api.jingxi.com",
            "Origin": "https://st.jingxi.com",
            "User-Agent": $.UA,
            "Cookie": cookie
        }
    };
    return new Promise(resolve => {
        $.get(opt, (err, resp, data) => {
            try {
                if (err) {
                    console.log('\n${fn}: API查询请求失败 ‼️‼️')
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
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}

function randomString(e) {
	e = e || 32;
	let t = "0123456789abcdef",
	a = t.length,
	n = "";
	for (let i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}

function get_UA() {
    if(!$.UAS[$.UserName]){
        $.UAS[$.UserName]=createUA("jx","android");
    }
    $.UA=$.UAS[$.UserName];
}

function mt_rand(min, max) {
    return Math.min(Math.floor(min + Math.random() * (max - min)), max);
}

function createUA(app="jd",os="android") {
    if(app=="jd"){
        app="jdapp";
    }else{
        app="jdpingou";
        var session=mt_rand(10,99);//53
    }
    //22081212C Build/TKQ1.220829.002
    if( os=="android" ){
        const maketrans={
            'K':'A','L':'B','M':'C','N':'D','O':'E','P':'F','Q':'G','R':'H','S':'I','T':'J','A':'K','B':'L','C':'M','D':'N','E':'O','F':'P','G':'Q','H':'R','I':'S','J':'T',
            'o':'e','p':'f','q':'g','r':'h','s':'i','t':'j','u':'k','v':'l','w':'m','x':'n','e':'o','f':'p','g':'q','h':'r','i':'s','j':'t','k':'u','l':'v','m':'w','n':'x'
        };
        var dvs = ["MI9 Build/QKQ1.190825.002", "MI8 Build/OPM1.171019.026", "HLK-AL00 Build/HONORHLK-AL00", "SM-G9750 Build/QP1A.190711.020", "LIO-AL00 Build/HUAWEILIO-AL00", "ELE-AL00 Build/HUAWEIELE-AL00", "ANE-AL00 Build/HUAWEIANE-AL00", "22021211RC Build/SKQ1.211006.001"],
        ivs = ["9", "10", "11", "12", "13"];
        $.dv = dvs[Math.floor(Math.random() * dvs.length)];
        $.iv = ivs[Math.floor(Math.random() * ivs.length)];
        var ad = Buffer.from(randomString(16)).toString("base64"),
        od = Buffer.from(randomString(16)).toString("base64"),
        sv = Buffer.from($.iv).toString("base64").split("").map(val => maketrans[val] || val).join(""),
        ov = Buffer.from("31").toString("base64").split("").map(val => maketrans[val] || val).join("");
        od = od.split("").map(val => maketrans[val] || val).join("");
        ad = ad.split("").map(val => maketrans[val] || val).join("");

        if(app=="jdapp"){
            //,"appname":""}
            var avs = ["11.6.3","11.4.2"],//APP版本对应appBuild
            bvs = ["98691","98638"];
        }else{
            var avs = ["5.50.2"];
            bvs = ["22435"];
        }
        var i=Math.floor(Math.random() * avs.length);
        $.av = avs[i];
        $.bv = bvs[i];

        var ep={
            "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            "ts": Date.now(),
            "ridx": -1,
            "cipher": {
                "sv": sv,
                "ad": ad,
                "od": od,//...
                "ov":ov,
                "ud": ad
            },
            "ciphertype": 5,
            "version": "1.2.0",
            "appname": "com.jingdong.app.mall"
        };
        if(app=="jdapp"){
            ;
        }else{
            ep.cipher={"bd":"","ad": ad,"sv": sv,"od": od,"ud": ad},
            ep.appname="com.jd.pingou";
        }
        $.ep = encodeURIComponent(JSON.stringify(ep));
    }else{
        os="iPhone";
    }
    let ua=app+";"+os+";";
    if(app=="jdapp"){
        if(os=="android"){
            ua+= $.av + `;;;appBuild/${$.bv};ef/1;ep/${$.ep};jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android {$.iv}; ${$.dv}; wv)`;
        }else{
            $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
            $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            ua+=`9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X)`;
        }
    }else if(app="jdpingou"){
        if(os=="android"){
            ua+=`${$.av};appBuild/${$.bv};session/${session};pap/JA2019_3111789;ef/1;ep/${ep};Mozilla/5.0 (Linux; Android ${$.iv}; ${$.dv}; wv)`;
        }else{
            $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
            $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            ua+=`4.13.0;14.4.2;${UUID};network/wifi;model/iPhone10,2;appBuild/100609;ADID/${$.ADID};supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)`
        }
    }
    return ua+' AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36';
}

Array.prototype.remove = function (val) {
    var i = this.indexOf(val);
    if (i > -1) {
        this.splice(i, 1);
    }
};