
/*
穿越寻宝组队奖励领取
30 22 * * * jd_zns_award.js
updatetime：2022/12/26
 */
const Env=require('./utils/Env.js');
const $ = new Env('穿行组队奖励领取');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message = '';
if ($.isNode()) {
	Object.keys(jdCookieNode).forEach((item) => {
		cookiesArr.push(jdCookieNode[item])
	})
	if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
	cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
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
			await TotalBean();
			console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
			if (!$.isLogin) {
				$.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
				if ($.isNode()) {
					await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
				}
				continue;
			}
			await run('promote_pk_getAmountForecast');
			await $.wait(1000);
			await run('promote_pk_receiveAward');
			await $.wait(1000);
			await run('promote_pk_divideScores');
			await $.wait(2000)
		}
	}
})()
	.catch((e) => {
		$.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
	})
	.finally(() => {
		$.done();
	})

function run(fn) {
	let body = `functionId=${fn}&client=m&clientVersion=-1&appid=signed_wh5&body={}`;
	let opt = {
		url: `https://api.m.jd.com/client.action?functionId=${fn}`,
		body,
		headers: {
			'Cookie': cookie,
			'Content-Type': 'application/x-www-form-urlencoded',
			"User-Agent": $.UA,
			'Origin': 'https://wbbny.m.jd.com',
			'Accept-Language': 'zh-cn',
			'Accept-Encoding': 'gzip, deflate, br',
		},
		timeout: 30000
	}
	return new Promise((resolve) => {
		$.post(opt, async (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`请求失败，请检查网路重试`)
				} else {
					if (safeGet(data)) {
						data = JSON.parse(data);
						if (data.code === 0) {
							if (data.data && data.data.bizCode === 0) {
								if (fn === 'promote_pk_receiveAward') {
									console.log('领取组队红包：' + data.data.result.value);
								} else if (fn === 'promote_pk_divideScores'){
									console.log('领取组队金币：' + data.data.result.produceScore)
								}
							} else {
								console.log(data.data.bizMsg);

							}
						} else {
							console.log(`失败:${JSON.stringify(data)}\n`)
							resolve()
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

function TotalBean() {
	return new Promise(async resolve => {
		const options = {
			url: "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
			headers: {
				Host: "wq.jd.com",
				Accept: "*/*",
				Connection: "keep-alive",
				Cookie: cookie,
				"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
				"Accept-Language": "zh-cn",
				"Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
				"Accept-Encoding": "gzip, deflate, br"
			}
		}
		$.get(options, (err, resp, data) => {
			try {
				if (err) {
					$.logErr(err)
				} else {
					if (data) {
						data = JSON.parse(data);
						if (data['retcode'] === 1001) {
							$.isLogin = false;
							return;
						}
						if (data['retcode'] === 0 && data.data && data.data.hasOwnProperty("userInfo")) {
							$.nickName = data.data.userInfo.baseInfo.nickname;
						}
					} else {
						console.log('京东服务器返回空数据');
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
function showMsg() {
	return new Promise(resolve => {
		if (!jdNotify) {
			$.msg($.name, '', `${message}`);
		} else {
			$.log(`京东账号${$.index}${$.nickName}\n${message}`);
		}
		resolve()
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