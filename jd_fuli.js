const Env=require('./utils/Env.js');
const $ = new Env('粉丝福利');
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
	cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonfomat($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
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
			$.UA = require('./USER_AGENTS').UARAM();
			await TotalBean();
			console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
			if (!$.isLogin) {
				$.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
				if ($.isNode()) {
					await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
				}
				continue
			}
			await xxx();
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



async function xxx() {
	return new Promise(async (resolve) => {
		$.get(getUrl(), async (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(` API请求失败，请检查网路重试`)
				} else {
					console.log(data)
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve(data)
			}
		})
	})
}

function getUrl() {
	return {
		url: `https://wq.jd.com/activet2/looktreasure/fansapp_draw?_=1676105962495&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls&appCode=msc588d6d5`,
		//body: `appid=wh5&clientVersion=1.0.0&functionId=wanrentuan_superise_send&body={"channel":2}&area=2_2813_61130_0`,
		headers: {
			//'Host': 'api.m.jd.com',
			//'Origin': 'https://wqs.jd.com',
			'Referer': 'https://wqs.jd.com/',
			//'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': $.UA,
			'Cookie': cookie
		}
	}
}

function TotalBean() {
	return new Promise((resolve) => {
		const options = {
			url: 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
			headers: {
				"Cookie": cookie,
				"referer": "https://h5.m.jd.com/",
				"User-Agent": $.UA,
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
function jsonfomat(str) {
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