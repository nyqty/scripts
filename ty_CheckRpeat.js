/*
cron "10,0 0-23/2 * * *" CheckRpeat.js, tag:脚本重复检测by-TengYu
 */
const Env=require('./utils/Env.js');
const $ = new Env('脚本重复检测');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
/*
是否删除重复任务 默认"false"  export CheckRpeat_DeleteTask="true"
是否删除重复脚本文件 默认"false"  export CheckRpeat_DeleteFile="true"
如果获取报错请设置QL_URL端口5700是你青龙端口 export QL_URL="http://127.0.0.1:5700"
根据名称以及脚本路径名称判断重复性！
*/

const got = require('got');
require('dotenv').config();
const { readFile } = require('fs/promises');
const path = require('path');

const qlDir = process.env.QL_DIR || '/ql';
const fs = require('fs');
let Fileexists = fs.existsSync('/ql/data/config/auth.json');
let authFile = "";
if (Fileexists)
	authFile = "/ql/data/config/auth.json"
else
	authFile = "/ql/config/auth.json"
//const authFile = path.join(qlDir, 'config/auth.json');


var prefixUrl;
if (process.env.QL_URL === "https://github.com/whyour/qinglong.git") {
	prefixUrl = "http://127.0.0.1:5700";
} else {
	prefixUrl = process.env.QL_URL || 'http://127.0.0.1:5700'
}

const api = got.extend({
	prefixUrl: prefixUrl,
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
		timeout: 3000
	}).json();
	if (body.data.data) {
		return body.data.data;
	} else return body.data;

}

async function DisableCrons(eid) {
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

async function delCrons(eid) {
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

async function delScripts(filename) {
	const token = await getToken();
	const body = await api({
		method: 'delete',
		url: 'api/scripts',
		params: { t: Date.now() },
		body: JSON.stringify({ "filename": filename }),
		headers: {
			Accept: 'application/json',
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json;charset=UTF-8',
		},
	}).json();
	return body;
};

!(async () => {
	console.log(`是否删除重复任务 默认"false"
export CheckRpeat_DeleteTask="true"
是否删除重复脚本文件 默认"false"
export CheckRpeat_DeleteFile="true"
如果获取报错请设置QL_URL端口5700是你青龙端口
export QL_URL="http://127.0.0.1:5700"
根据名称以及脚本路径名称判断重复性！

`);

	try {
		var crons = await getCrons();
	} catch (e) {
		console.log(e);//prefixUrl
		console.log(`请设置QL_URL 例如：export QL_URL="http://127.0.0.1:5700"`);
		return
	} finally {
	}

	if (!crons[0]) {
		$.msg($.name, '【提示】无法定时任务', '【提示】无法定时任务');
		return;
	}
	crons.sort((a, b) => a.name.localeCompare(b.name, 'zh')); //a~z 排序  
	//console.log(crons); 	
	for (let i = 0, arr = [], arr2 = [], n, filename = [], msg, json = {}; i < crons.length;) {
		arr = crons[i].command.split(" ");
		filename[i] = arr && arr.length > 1 ? arr[1] : "";
		if (!i || crons[i].name != crons[i - 1].name) {
			i++
			continue
		}
		msg = `检测到重复任务名称：${crons[i].name}`;
		arr = filename[i].split("_");
		arr2[0] = arr[arr.length - 1];
		arr = filename[i - 1].split("_");
		arr2[1] = arr[arr.length - 1];
		msg += `\n对比：${arr2[0]}|${arr2[1]}`;
		if (arr2[0] != arr2[1]) {
			i++
			msg += "=不相等，跳过"
			continue
		}
		msg += "=相等"
		n = filename[i].substr(0, atyvcn.length) == atyvcn ? i - 1 : i;
		if (crons[n].isDisabled) {
			i++
			msg += "\n已禁用，跳过"
			continue
		}
		try {
			var id = crons[n].id ? crons[n].id : crons[n]._id;
			json = DisableCrons(id)
			msg += "\n禁用" + filename[n]
			//msg+=json.code==DisableCrons(id)?"成功":"失败"
			if (DeleteTask == "true") {
				json = delCrons(id)
				msg += `\n删除任务_id：${id}`;
				//msg+=json.code==200?"成功":"失败"
			}
			if (DeleteFile == "true") {
				if (filename[n]) {
					json = delScripts(filename[n])
					msg += `\n删除脚本：${filename[n]}`;
					//msg+=json.code==200?"成功":"失败"
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
		}
		console.log(msg);
		filename.splice(n, 1)
		crons.splice(n, 1)
		//console.log(`等待1秒.......	\n`);
		//await $.wait(1 * 1000)
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())

