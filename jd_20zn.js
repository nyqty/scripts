/*
#京东20周年
10 12 23,25 * * https://raw.githubusercontent.com/atyvcn/jd_scripts/main/jd_20zn.js
*/

const Env = require('./utils/Env.js');
const $ = new Env('京东20周年');
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
    if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0)
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const USER_AGENTS = require("./USER_AGENTS");
const H5ST=require('./utils/h5st.js');

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', { "open-url": "https://bean.m.jd.com/" });
        return;
    }
    $.UAS={};
    $.H5ST31={};
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (!cookie) continue;

        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        $.canUseCoinAmount = 0;
        console.log("\n******开始【京东账号" + $.index + "】" + ($.UserName) + "******\n");
        get_UA()
        let DrawPrize=await JDTaskApi("anniversaryDrawPrize",{"linkId": "HD9X14lw5YO0OBM61ySKJw","eid": ""},'35fa0')
        if (DrawPrize.code == 0 && DrawPrize.success == true) {
            if (DrawPrize.data.prizeType == 2) {
                console.log("抽中：" + DrawPrize.data.prizeDesc + "\n红包面额：" + DrawPrize.data.prizeValue);
                console.log("有效期开始：" + DrawPrize.data.prizeBeginTime + "\n有效期结束：" + DrawPrize.data.prizeEndTime);
            } else DrawPrize.data.prizeType == 1 && (console.log("抽中优惠卷：" + DrawPrize.data.prizeDesc + "\n使用效果：" + DrawPrize.data.limitStr), console.log("有效期开始：" + DrawPrize.data.prizeBeginTime + "\n有效期结束：" + DrawPrize.data.prizeEndTime));
        } else DrawPrize.code == 10012 ? console.log("不多说了，乌漆嘛黑" + DrawPrize.errMsg) : console.log(DrawPrize.errMsg);
        await $.wait(500);
    }

})()
.catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
})
.finally(() => {
    $.done();
})

async function JDTaskApi(functionId, body = { },appId='',post='') {
    var opt = {
        url:"https://api.m.jd.com/client.action",
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Referer": "https://prodev.m.jd.com/mall/active/38rKSYRmJEY1cYdse1v8cM96h5qZ/index.html",
            "origin": "https://prodev.m.jd.com",
            "Cookie": cookie + ";cid=8",
            "User-Agent": $.UA
        }
    };
    if(appId){
        if( !$.H5ST31[$.UserName] ){
            $.H5ST31[$.UserName]={}
        }
        if( !$.H5ST31[$.UserName][appId] ){
            $.H5ST31[$.UserName][appId]= new H5ST({
                appId,
                "appid": "publicUseApi",
                "clientVersion": "1.0.0",
                "client": "wh5",
                "pin": $.UserName,
                "ua": $.UA,
                "version":"3.1"
            });
            await $.H5ST31[$.UserName][appId].genAlgo();
        };
        post="&ext={\"prstate\":\"0\"}&x-api-eid-token=jdd03HU23JJJUXP4OFVXVYB2TIXXUEFGNIO7A3RKLQEK27TIW7ILL4267U2HVC5UNBJXGTAGV6PYPTIONMOID2EPUNAC3NQAAAAMIGT56NVIAAAAACIJRE6PPC7SFHMX";
        opt["body"] = await $.H5ST31[$.UserName][appId].getbody(functionId,body)+post;
        //console.log(opt["body"]);process.exit(0); 
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
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

function get_UA() {
    let UA = USER_AGENTS.UARAM ? USER_AGENTS.UARAM() : USER_AGENTS.USER_AGENT;
    if( !$.UAS[$.UserName] ) $.UAS[$.UserName]=UA
    $.UA=$.UAS[$.UserName]
}