/*
粉丝福利一次性
cron:29 15,17 * * *
============Quantumultx===============
[task_local]
粉丝福利一次性
29 15,17 * * * jd_fansjdycx.js, tag=粉丝福利一次性, enabled=true
 */
const $=new Env('粉丝福利一次性');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
CryptoJS=$.isNode()?require('crypto-js'):CryptoJS;
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(QQ0QQ=>{
		cookiesArr.push(jdCookieNode[QQ0QQ]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(OOO0Q=>OOO0Q.cookie)].filter(QO0OQ=>!!QO0OQ);
}
let allMessage='';
!(async()=>{})().catch(QQOOQ=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+QQOOQ+'!','');
}).finally(()=>{
	$.done();
});
async function main(){
	await query_tempactivconfig();
	await $.wait(500);
	await draw_activetemporary();
}
function query_tempactivconfig(){
	return new Promise(async O00OQ=>{if('OO0Q'==='O000'){
		cookiesArr.push(jdCookieNode[item]);
	}else{
		const O0QOO={'url':'https://wq.jd.com/activet2/looktreasure/fansapp_query?_=1661750805785&sceneval=2&g_login_type=1&callback=queryLibao&g_ty=ls&appCode=msc588d6d5','headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Host':'wq.jd.com','Referer':'https://wq.jd.com/activet2/looktreasure/fansapp_query?_=1661750805785&sceneval=2&g_login_type=1&callback=queryLibao&g_ty=ls&appCode=msc588d6d5','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1'}};
		$.get(O0QOO,(O0QOQ,QO0QQ,QOOO0)=>{try{if('O0Q0'!=='O0Q0'){
			console.log(e);
			console.log('京东服务器访问数据为空，请检查自身设备网络情况');
			return false;
		}else{if(O0QOQ){if('QQOQ'==='QQOQ'){
			console.log(O0QOQ);
		}else{
			$.nickName=$.UserName;
		}}else{}}}catch(QO00O){
			$.logErr(QO00O,QO0QQ);
		}finally{
			O00OQ(QOOO0||{});
		}});
	}});
}
function query_activetemporary(){
	return new Promise(async QQOQ0=>{
		const Q0QO0={'url':'https://wq.jd.com/activet2/looktreasure/fansapp_draw?_=1661750809320&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls&appCode=msc588d6d5','headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Host':'wq.jd.com','Referer':'https://wq.jd.com/activet2/looktreasure/fansapp_draw?_=1661750809320&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls&appCode=msc588d6d5','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1'}};
		$.get(Q0QO0,(O00O0,O0Q0QO,O0Q00O)=>{});
	});
}
function draw_activetemporary(){
	return new Promise(async O0QQ0Q=>{
		const O0QOOO={'url':'https://wq.jd.com/activet2/looktreasure/fansapp_draw?_=1661750809320&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls&appCode=msc588d6d5','headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Host':'wq.jd.com','Referer':'https://wq.jd.com/activet2/looktreasure/fansapp_draw?_=1661750809320&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls&appCode=msc588d6d5','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1'}};
		$.get(O0QOOO,(QOO0Q0,QOOQQO,QOOQ0O)=>{});
	});
}
function TotalBean(){
	return new Promise(async QO0QOQ=>{
		const QQ0OQQ={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}};
		$.post(QQ0OQQ,(O0QOQO,QQ0O0Q,O0QOQQ)=>{});
	});
}
function safeGet(QQ000Q){try{if(typeof JSON.parse(QQ000Q)=='object'){
	return true;
}}catch(O00QOO){
	console.log(O00QOO);
	console.log('京东服务器访问数据为空，请检查自身设备网络情况');
	return false;
}}
function jsonParse(QQQQQO){};
function Env(t,e){
	"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);
};