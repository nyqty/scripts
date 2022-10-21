/*
建议手动先点开一次
cron "1 15 * * *" jd_cxxb_help.js, tag:快速升级，助力跑一次即可
*/
const $ = new Env('穿行寻宝-助力');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

let cookiesArr = [],
    cookie = '';
let secretp = '',
    inviteId = []

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';


!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    console.log('\n仅升级，快速跑完和助力\n')
    await getUA()

    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            $.newShareCodes = []
            await get_secretp()
            if ($.huobao == false) {
                console.log(`火爆`); continue;
            }
            await promote_collectAtuoScore() //定时领取
            let res
            try {
                res = await promote_getTaskDetail()
                await promote_sign()
                do {
                    var ret = await promote_raise()
                    await $.wait(1000)
                } while (ret)
            } catch (e) {
                $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
            }
        }
    }
    try {
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                message = '';
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                await get_secretp()
                if ($.huobao == false) {
                    console.log(`火爆`); continue;
                }
                await $.wait(1000)
                
                let res,bizCode
                for (let j = 0; j < inviteId.length; j++) {
                    console.log(`\n开始助力 【${inviteId[j]}】`)
                    res = await help(inviteId[j])
                    if(res && res['data']){
                        bizCode = res['data']['bizCode'];
                        if (bizCode === 0) {
                            console.log('助力成功,获得：', parseFloat(res.data.result.acquiredScore), '金币')
                            if (res.data.result?.redpacket?.value) console.log('🧧', parseFloat(res.data.result?.redpacket?.value))
                            //console.log('助力结果：'+res.data.bizMsg)
                        }else if (bizCode==108) { //无助力
                            console.log(res.data.bizMsg); break 
                        }else if (bizCode==-201) {//好友人气爆棚，不需要助力啦~
                            console.log(res.data.bizMsg);
                            inviteId.splice(j, 1)
                            j--
                            continue
                        }else if (bizCode==-1002) {//运行环境异常，请您从正规途径参与活动，谢谢~
                            break;
                        }else { console.log(res.data.bizCode+res.data.bizMsg) }
                        await $.wait(1000)
                    }else{
                        //{ code: -40300, msg: '运行环境异常，请您从正规途径参与活动，谢谢~' }
                        console.log(res);
                        break;
                    }
                }
            }
        }
    } catch (e) {
        $.log(`❌ ${$.name}, 失败! 原因: `, e)
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function get_secretp() {
    let body = {};
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_getHomeData", body), async(err, resp, data) => {
            //console.log(data)
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
						$.huobao = data.data.success
                        if (data.code == 0) {
                            if (data.data && data.data.bizCode === 0) {
                                secretp = data.data.result.homeMainInfo.secretp
							}
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

function promote_sign() {
    let body = { "ss": { "extraData": { "log": "", "sceneid": "RAhomePageh5" }, "secretp": secretp, "random": randomString(6) } };
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_sign", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {

                                console.log(`签到成功`)
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        } else {
                            console.log(`签到失败:${JSON.stringify(data)}\n`)
                            //签到失败:{"code":-40300,"msg":"运行环境异常，请您从正规途径参与活动，谢谢~"}
                            resolve(false)
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

function promote_collectAtuoScore() {
    let body = { "ss": { "extraData": { "log": "", "sceneid": "RAhomePageh5" }, "secretp": secretp, "random": randomString(6) } };
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_collectAutoScore", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {

                                console.log(`成功领取${data.data.result.produceScore}个币`)
                            }
                        } else {
                            //签到失败:{"code":-40300,"msg":"运行环境异常，请您从正规途径参与活动，谢谢~"}
                            //console.log(`\n\nsecretp失败:${JSON.stringify(data)}\n`)
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

function promote_getTaskDetail() {
    let body = {};
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_getTaskDetail", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {
								let 助力码 = data.data.result.inviteId
								if (!助力码) {
                                    console.log("黑号")
                                    resolve("")
                                }
								console.log('助力码：',助力码)
                                inviteId.push(助力码)
                                resolve(data.data.result)
                            }
                        } else {
                            //console.log(`\n\nsecretp失败:${JSON.stringify(data)}\n`)
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

function help(inviteId) {
    let body = { "actionType": 0, "inviteId": inviteId,"ss": { "extraData": { "log": "", "sceneid": "RAhomePageh5" }, "secretp": secretp, "random": randomString(6) } };
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_collectScore", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        //console.log(data)
                        //if (data.data.bizCode === 0) {
                            //if (data.data && data['data']['bizCode'] === 0) {
                              //  console.log(data.bizMsg)
                            //}
                        //} else {
                           // console.log(`\n 失败:` + data.bizMsg)
                       // }
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
function promote_raise() {
    let s = Math.floor((Math.random()*3)) +1
    let body = {"scenceId":s, "ss": { "extraData": { "log": "", "sceneid": "RAhomePageh5" }, "secretp": secretp, "random": randomString(6) } };
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_raise", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {
                                console.log(`升级成功`)
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        } else {
                            console.log(`升级失败:${JSON.stringify(data)}\n`)
                            //签到失败:{"code":-40300,"msg":"运行环境异常，请您从正规途径参与活动，谢谢~"}
                            resolve(false)
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

function taskPostUrl(functionId, body) {
    return {
        //functionId=promote_getHomeData&body={}&client=wh5&clientVersion=1.0.0
        url: `${JD_API_HOST}?functionId=${functionId}`,
        body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=m&clientVersion=-1&appid=signed_wh5`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'Origin': 'https://wbbny.m.jd.com',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}


function getUA() {
    $.UUID = randomString(40)
    $.UA = `jdapp;android;10.3.2`
}

function randomNum(min, max) {
    if (arguments.length === 0) return Math.random()
    if (!max) max = 10 ** (Math.log(min) * Math.LOG10E + 1 | 0) - 1
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomString(min, max = 0) {
    var str = "", range = min, arr = [...Array(36).keys()].map(k => k.toString(36));
    if (max) {
        range = Math.floor(Math.random() * (max - min + 1) + min);
    }
    for (let i = 0; i < range;) {
        let r = Math.random().toString(16).substring(2)
        if ((range - i) > r.length) {
            str += r
            i += r.length
        } else {
            str += r.slice(i - range)
            i += r.length
        }
    }
    return str;
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
//console.log(getBody(53554918))
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }