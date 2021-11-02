/*
cron "10 0,12,17 * * *" CheckRpeat.js, tag:脚本重复检测by-TengYu
 */
const $ = new Env('脚本重复检测');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
/*
是否删除重复任务 默认"false""  export CheckRpeat_DeleteTask="true"
是否删除重复脚本文件 默认"false""  export CheckRpeat_DeleteFile="true"
根据名称以及脚本路径名称判断重复性！
*/

const got = require('got');
require('dotenv').config();
const { readFile } = require('fs/promises');
const path = require('path');

const qlDir = process.env.QL_DIR || '/ql';
const authFile = path.join(qlDir, 'config/auth.json');

const api = got.extend({
  prefixUrl: process.env.QL_URL || 'http://localhost:5600',
  retry: { limit: 0 },
});

let DeleteTask = "false",
DeleteFile = "false";

let atyvcn = "atyvcn";//atyvcn_jd_scripts


if ($.isNode() && process.env.CheckRpeat_DeleteTask) {
	DeleteTask = process.env.CheckRpeat_DeleteTask;
}
if ($.isNode() && process.env.CheckRpeat_DeleteFile) {
	DeleteFile = process.env.CheckRpeat_DeleteFile;
}

async function getToken() {
  const authConfig = JSON.parse(await readFile(authFile));
  return authConfig.token;
}


async function getCrons() {
	const token = await getToken();
	const body = await api({
	  url: 'api/crons',
	  searchParams: {
		searchValue: '',
		t: Date.now(),
	  },
	  headers: {
		Accept: 'application/json',
		authorization: `Bearer ${token}`,
	  },
	}).json();
	return body.data;
}

async function DisableCrons(eid){
	const token = await getToken();
	const body = await api({
	  method: 'put',
	  url: 'api/crons/disable',
	  params: { t: Date.now() },	
	  body: JSON.stringify([eid]),
	  headers: {
		Accept: 'application/json',
		authorization: `Bearer ${token}`,
		'Content-Type': 'application/json;charset=UTF-8',
	  },
	}).json();
	return body;
};


async function delCrons(eid){
	const token = await getToken();
	const body = await api({
	  method: 'delete',
	  url: 'api/crons',
	  params: { t: Date.now() },
	  body: JSON.stringify([eid]),
	  headers: {
		Accept: 'application/json',
		authorization: `Bearer ${token}`,
		'Content-Type': 'application/json;charset=UTF-8',
	  },
	}).json();
	return body;
};

async function delScripts(filename){
	const token = await getToken();
	const body = await api({
	  method: 'delete',
	  url: 'api/scripts',
	  params: { t: Date.now() },
	  body: JSON.stringify({"filename":filename}),
	  headers: {
		Accept: 'application/json',
		authorization: `Bearer ${token}`,
		'Content-Type': 'application/json;charset=UTF-8',
	  },
	}).json();
	return body;
};

!(async() => {
	const crons = await getCrons();
	if (!crons[0]) {
		$.msg($.name, '【提示】无法定时任务', '【提示】无法定时任务');
		return;
	}
	crons.sort((a, b)=> a.name.localeCompare(b.name, 'zh')); //a~z 排序  
	//console.log(crons); 	
	for (let i = 0,arr=[],arr2=[],n,filename=[],msg,json={}; i < crons.length;) {
		arr = crons[i].command.split(" ");
		filename[i]=arr && arr.length>1?arr[1]:"";
		if( !i || crons[i].name!=crons[i-1].name ){
			i++
			continue
		}
		msg=`检测到重复任务名称：${crons[i].name}`;
		arr=filename[i].split("_");
		arr2[0]=arr[arr.length-1];
		arr=filename[i-1].split("_");
		arr2[1]=arr[arr.length-1];
		msg+=`\n对比：${arr2[0]}|${arr2[1]}`;
		if( arr2[0]!=arr2[1] ){
			i++
			msg+="=不相等，跳过"
			continue
		}
		msg+="=相等"
		n=filename[i].substr(0,atyvcn.length)==atyvcn?i-1:i;
		if( crons[n].isDisabled ){
			i++
			msg+="\n已禁用，跳过"
			continue
		}
		try {
			json=DisableCrons(crons[n]._id)
			msg+="\n禁用"+filename[n]
			//msg+=json.code==DisableCrons(crons[n]._id)?"成功":"失败"
			if( DeleteTask=="true" ){
				json=delCrons(crons[n]._id)
				msg+=`\n删除任务_id：${crons[n]._id}`;
				//msg+=json.code==200?"成功":"失败"
			}
			if( DeleteFile=="true" ){
				if(filename[n]){
					json=delScripts(filename[n])
					msg+=`\n删除脚本：${filename[n]}`;
					//msg+=json.code==200?"成功":"失败"
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
		}
		console.log(msg);
		filename.splice(n,1)
		crons.splice(n,1)
		//console.log(`等待1秒.......	\n`);
		//await $.wait(1 * 1000)
	}
})()
.catch((e) => $.logErr(e))
.finally(() => $.done())



// prettier-ignore
function Env(t, e) {
	"undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
	class s {
		constructor(t) {
			this.env = t
		}
		send(t, e = "GET") {
			t = "string" == typeof t ? {
				url: t
			}
			 : t;
			let s = this.get;
			return "POST" === e && (s = this.post),
			new Promise((e, i) => {
				s.call(this, t, (t, s, r) => {
					t ? i(t) : e(s)
				})
			})
		}
		get(t) {
			return this.send.call(this.env, t)
		}
		post(t) {
			return this.send.call(this.env, t, "POST")
		}
	}
	return new class {
		constructor(t, e) {
			this.name = t,
			this.http = new s(this),
			this.data = null,
			this.dataFile = "box.dat",
			this.logs = [],
			this.isMute = !1,
			this.isNeedRewrite = !1,
			this.logSeparator = "\n",
			this.startTime = (new Date).getTime(),
			Object.assign(this, e),
			this.log("", `🔔${this.name}, 开始!`)
		}
		isNode() {
			return "undefined" != typeof module && !!module.exports
		}
		isQuanX() {
			return "undefined" != typeof $task
		}
		isSurge() {
			return "undefined" != typeof $httpClient && "undefined" == typeof $loon
		}
		isLoon() {
			return "undefined" != typeof $loon
		}
		toObj(t, e = null) {
			try {
				return JSON.parse(t)
			} catch {
				return e
			}
		}
		toStr(t, e = null) {
			try {
				return JSON.stringify(t)
			} catch {
				return e
			}
		}
		getjson(t, e) {
			let s = e;
			const i = this.getdata(t);
			if (i)
				try {
					s = JSON.parse(this.getdata(t))
				} catch {}
			return s
		}
		setjson(t, e) {
			try {
				return this.setdata(JSON.stringify(t), e)
			} catch {
				return !1
			}
		}
		getScript(t) {
			return new Promise(e => {
				this.get({
					url: t
				}, (t, s, i) => e(i))
			})
		}
		runScript(t, e) {
			return new Promise(s => {
				let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
				i = i ? i.replace(/\n/g, "").trim() : i;
				let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
				r = r ? 1 * r : 20,
				r = e && e.timeout ? e.timeout : r;
				const[o, h] = i.split("@"),
				n = {
					url: `http://${h}/v1/scripting/evaluate`,
					body: {
						script_text: t,
						mock_type: "cron",
						timeout: r
					},
					headers: {
						"X-Key": o,
						Accept: "*/*"
					}
				};
				this.post(n, (t, e, i) => s(i))
			}).catch(t => this.logErr(t))
		}
		loaddata() {
			if (!this.isNode())
				return {}; {
				this.fs = this.fs ? this.fs : require("fs"),
				this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile),
				e = this.path.resolve(process.cwd(), this.dataFile),
				s = this.fs.existsSync(t),
				i = !s && this.fs.existsSync(e);
				if (!s && !i)
					return {}; {
					const i = s ? t : e;
					try {
						return JSON.parse(this.fs.readFileSync(i))
					} catch (t) {
						return {}
					}
				}
			}
		}
		writedata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require("fs"),
				this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile),
				e = this.path.resolve(process.cwd(), this.dataFile),
				s = this.fs.existsSync(t),
				i = !s && this.fs.existsSync(e),
				r = JSON.stringify(this.data);
				s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
			}
		}
		lodash_get(t, e, s) {
			const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
			let r = t;
			for (const t of i)
				if (r = Object(r)[t], void 0 === r)
					return s;
			return r
		}
		lodash_set(t, e, s) {
			return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
		}
		getdata(t) {
			let e = this.getval(t);
			if (/^@/.test(t)) {
				const[, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
				r = s ? this.getval(s) : "";
				if (r)
					try {
						const t = JSON.parse(r);
						e = t ? this.lodash_get(t, i, "") : e
					} catch (t) {
						e = ""
					}
			}
			return e
		}
		setdata(t, e) {
			let s = !1;
			if (/^@/.test(e)) {
				const[, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
				o = this.getval(i),
				h = i ? "null" === o ? null : o || "{}" : "{}";
				try {
					const e = JSON.parse(h);
					this.lodash_set(e, r, t),
					s = this.setval(JSON.stringify(e), i)
				} catch (e) {
					const o = {};
					this.lodash_set(o, r, t),
					s = this.setval(JSON.stringify(o), i)
				}
			} else
				s = this.setval(t, e);
			return s
		}
		getval(t) {
			return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
		}
		setval(t, e) {
			return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
		}
		initGotEnv(t) {
			this.got = this.got ? this.got : require("got"),
			this.cktough = this.cktough ? this.cktough : require("tough-cookie"),
			this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar,
			t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
		}
		get(t, e = (() => {})) {
			t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
			this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
						"X-Surge-Skip-Scripting": !1
					})), $httpClient.get(t, (t, s, i) => {
					!t && s && (s.body = i, s.statusCode = s.status),
					e(t, s, i)
				})) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
						hints: !1
					})), $task.fetch(t).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
					try {
						if (t.headers["set-cookie"]) {
							const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
							s && this.ckjar.setCookieSync(s, null),
							e.cookieJar = this.ckjar
						}
					} catch (t) {
						this.logErr(t)
					}
				}).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => {
					const {
						message: s,
						response: i
					} = t;
					e(s, i, i && i.body)
				}))
		}
		post(t, e = (() => {})) {
			if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon())
				this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
						"X-Surge-Skip-Scripting": !1
					})), $httpClient.post(t, (t, s, i) => {
					!t && s && (s.body = i, s.statusCode = s.status),
					e(t, s, i)
				});
			else if (this.isQuanX())
				t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
						hints: !1
					})), $task.fetch(t).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => e(t));
			else if (this.isNode()) {
				this.initGotEnv(t);
				const {
					url: s,
					...i
				} = t;
				this.got.post(s, i).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => {
					const {
						message: s,
						response: i
					} = t;
					e(s, i, i && i.body)
				})
			}
		}
		time(t, e = null) {
			const s = e ? new Date(e) : new Date;
			let i = {
				"M+": s.getMonth() + 1,
				"d+": s.getDate(),
				"H+": s.getHours(),
				"m+": s.getMinutes(),
				"s+": s.getSeconds(),
				"q+": Math.floor((s.getMonth() + 3) / 3),
				S: s.getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (let e in i)
				new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
			return t
		}
		msg(e = t, s = "", i = "", r) {
			const o = t => {
				if (!t)
					return t;
				if ("string" == typeof t)
					return this.isLoon() ? t : this.isQuanX() ? {
						"open-url": t
					}
				 : this.isSurge() ? {
					url: t
				}
				 : void 0;
				if ("object" == typeof t) {
					if (this.isLoon()) {
						let e = t.openUrl || t.url || t["open-url"],
						s = t.mediaUrl || t["media-url"];
						return {
							openUrl: e,
							mediaUrl: s
						}
					}
					if (this.isQuanX()) {
						let e = t["open-url"] || t.url || t.openUrl,
						s = t["media-url"] || t.mediaUrl;
						return {
							"open-url": e,
							"media-url": s
						}
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t["open-url"];
						return {
							url: e
						}
					}
				}
			};
			if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
				let t = ["", "==============📣系统通知📣=============="];
				t.push(e),
				s && t.push(s),
				i && t.push(i),
				console.log(t.join("\n")),
				this.logs = this.logs.concat(t)
			}
		}
		log(...t) {
			t.length > 0 && (this.logs = [...this.logs, ...t]),
			console.log(t.join(this.logSeparator))
		}
		logErr(t, e) {
			const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
			s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t))
		}
		done(t = {}) {
			const e = (new Date).getTime(),
			s = (e - this.startTime) / 1e3;
			this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`),
			this.log(),
			(this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
		}
	}
	(t, e)
}