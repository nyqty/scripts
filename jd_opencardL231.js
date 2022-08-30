/*
8.26-9.10 中秋赏月 天涯共此食
新增开卡脚本，一次性脚本

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

cron:31 14 26-31,1-10 8,9 *
============Quantumultx===============
[task_local]
#8.26-9.10 中秋赏月 天涯共此食
31 14 26-31,1-10 8,9 * jd_opencardL231.js, tag=8.26-9.10 中秋赏月 天涯共此食, enabled=true
*/
let opencard_toShop="false"
const $=new Env("8.26-9.10 中秋赏月 天涯共此食");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const JD_SIGN_API=process.env.JD_SIGN_API||'https://api.nolanstore.top/sign';
CryptoJS=$.isNode()?require('crypto-js'):CryptoJS;
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(OOOOQQO=>{
		cookiesArr.push(jdCookieNode[OOOOQQO]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(OOQQ00O=>OOQQ00O.cookie)].filter(Q00QQQ0=>!!Q00QQQ0);
}
opencard_toShop=$.isNode()?process.env.opencard_toShop?process.env.opencard_toShop:''+opencard_toShop:$.getdata('opencard_toShop')?$.getdata('opencard_toShop'):''+opencard_toShop;
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let shareUuidArr=['vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==','F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==','il64pE7v1zdguoOwD5otHV4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==','KRksmsfoFlrgyw/oGOUnd14tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==','jvJh7GpoGhm7fSlpWhSy3MjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD','J/OEL8/ZMTbPczES9JZpjsjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD'];
let s=Math.floor(Math.random()*3);
let n=0;
n=Math.floor(Math.random()*shareUuidArr.length);
let helpnum=shareUuidArr[n]?shareUuidArr[n]:$.shareUuid;
!(async()=>{
	console.log('\n请自行确认账号一是否黑号，黑号会全部助力当前助力');
	console.log('\n当前助力：'+helpnum);
	if(!cookiesArr[0]){if('QQO0Q'==='QOOOO'){
		console.log('获取[token]失败！');
		return;
	}else{
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}}
	$.appkey='21699045';
	$.userId='10299171';
	$.actId='jdUnionMoon202208';
	$.MixNicks='';
	$.inviteNick=helpnum;
})().catch(QOQ00OQ=>$.logErr(QOQ00OQ)).finally(()=>$.done());
async function run(){}
async function takePostRequest(O00QQ0Q){
	if($.outFlag)return;
	let OQO0OQQ='https://mpdz1-isv.isvjcloud.com';
	let Q0O0QQO='';
	let OQO0OQO='POST';
	let O0OQO0O='';
	switch(O00QQ0Q){
		case 'activity_load':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'jdToken':$.Token,'inviteNick':$.inviteNick||''};
			if($.joinVenderId)O0OQO0O={...O0OQO0O,'shopId':''+$.joinVenderId};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/activity/load',O0OQO0O);
			break;
		case 'shopList':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/shop/shopList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/shop/shopList',O0OQO0O);
			break;
		case'绑定':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'missionType':'shareAct','inviterNick':$.inviteNick||''};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/mission/completeMission',O0OQO0O);
			break;
		case'助力':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'inviteListRequest':{'actId':'unionLover20220804','missionType':'shareAct','buyerNick':$.MixNick||'','inviteType':0},'inviterNick':$.inviteNick||''};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/customer/inviteList',O0OQO0O);
			break;
		case 'mission':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'missionType':$.missionType};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/mission/completeMission',O0OQO0O);
			break;
		case 'kaika':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'missionType':$.missionType,'shopId':$.joinVenderId,'inviterNick':$.inviteNick||''};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/mission/completeMission',O0OQO0O);
			break;
		case'抽奖':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/interactive/draw?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			O0OQO0O={'dataType':'draw'};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/interactive/draw',O0OQO0O);
			break;
		case 'followShop':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'actId':$.actId,'missionType':'uniteCollectShop'};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/mission/completeMission',O0OQO0O);
			break;
		case 'bulletChat':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'bulletChat':'七夕喜鹊叫，好运身边绕','actId':$.actId,'missionType':'bulletChat'};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/mission/completeMission',O0OQO0O);
			break;
		case 'inviteCheck':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/mission/completeMission?open_id=?mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'actId':$.actId,'missionType':'inviteCheck'};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/mission/completeMission',O0OQO0O);
			break;
		case 'completeState':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/mission/completeState?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/mission/completeState',O0OQO0O);
			break;
		case 'findCountByType':
			url=OQO0OQQ+'/dm/front/jdUnionMoon/activity/findCountByType?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			O0OQO0O={'type':$.types};
			Q0O0QQO=taskPostUrl('/jdUnionMoon/activity/findCountByType',O0OQO0O);
			break;
		case 'myAward':
			url=OQO0OQQ+'/dm/front/jdRiceNoodleFestival/awards/list?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			O0OQO0O={'pageNo':1,'pageSize':9999};
			Q0O0QQO=taskPostUrl('/jdRiceNoodleFestival/awards/list',O0OQO0O);
			break;
		case 'missionInviteList':
			url=OQO0OQQ+'/dm/front/jdRiceNoodleFestival/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			O0OQO0O={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick||''};
			Q0O0QQO=taskPostUrl('/jdRiceNoodleFestival/customer/inviteList',O0OQO0O);
			break;
		default:
			console.log('错误'+O00QQ0Q);
	}
	let Q0O0QQ0=getPostRequest(url,Q0O0QQO,OQO0OQO);
	return new Promise(async QQOOO0O=>{if('QOO00'!=='QOO00'){
		var O0QO=String(_0xa0ea45).replace(/=+$/,'');
		for(var OQQ0=0,Q00Q,OO00,O0OO=0,OQ00='';OO00=O0QO.charAt(O0OO++);~OO00&&(Q00Q=(OQQ0%4)?(Q00Q*64)+OO00:OO00,OQQ0++%4)?OQ00+=String.fromCharCode(0xff&Q00Q>>((-2*OQQ0)&0x6)):0){
			OO00=_0x596479.indexOf(OO00);
		}
		return OQ00;
	}else{
		$.post(Q0O0QQ0,(QQO0Q0O,Q0OQ000,QQO00Q0)=>{try{if(QQO0Q0O){if('QQQO0'==='QQQO0'){
			if(Q0OQ000&&Q0OQ000.statusCode&&(Q0OQ000.statusCode==493)){if('Q0QOO'!=='Q0QOO'){
				console.log(QQO00Q0);
			}else{
				console.log('此ip已被限制，请过10分钟后再执行脚本\n');
				$.outFlag=true;
			}}
			console.log(''+$.toStr(QQO0Q0O,QQO0Q0O));
			console.log(O00QQ0Q+' API请求失败，请检查网路重试');
		}else{
			res=JSON.parse(QQO00Q0);
		}}else{
			dealReturn(O00QQ0Q,QQO00Q0);
		}}catch(Q0OOOQ0){if('QOOQ0'!=='QOOQ0'){
			console.log('获取服务失败~~');
		}else{
			console.log(Q0OOOQ0,Q0OQ000);
		}}finally{
			QQOOO0O();
		}});
	}});
}
async function dealReturn(QQO0Q0Q,O00O0Q0){
	let QQOQQ0Q='';
}
function getPostRequest(OOO0OOQ,QQOQ0Q0,O0OQ0QQ='POST'){
	let QOOQ0Q0={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(OOO0OOQ.indexOf('https://mpdz1-isv.isvjcloud.com')>-1){if('QOOQQ'!=='QQ0O0'){
		QOOQ0Q0.Origin='https://mpdz1-isv.isvjcloud.com';
		QOOQ0Q0['Content-Type']='application/json; charset=utf-8';
		delete QOOQ0Q0.Cookie;
	}else{
		console.log(data);
	}}
	return{'url':OOO0OOQ,'method':O0OQ0QQ,'headers':QOOQ0Q0,'body':QQOQ0Q0,'timeout':60000};
}
function taskPostUrl(Q0OQOQ0,QOOQQ0Q){
	d={'actId':$.actId,...QOOQQ0Q,'method':Q0OQOQ0,'userId':$.userId,'buyerNick':$.MixNick||''};
	sign2=mpdzSign(d);
	const QOO00QO={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':sign2.sign,'timestamp':sign2.timeStamp,'userId':$.userId},'admJson':{'actId':$.actId,...QOOQQ0Q,'method':Q0OQOQ0,'userId':$.userId,'buyerNick':$.MixNick||''}}};
	if(Q0OQOQ0.indexOf('missionInviteList')>-1){
		delete QOO00QO.params.admJson.actId;
	}
	return $.toStr(QOO00QO,QOO00QO);
}
function mpdzSign(OQO0QQO){
	var QQOOQ00='4|10|0|9|7|1|6|2|5|8|3'.split('|'),QQOO0OO=0;
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(QQOO0Q0){
	QQOO0Q0=(QQOO0Q0||32);
	let QQQ0O0O='abcdef0123456789',QOOQ0OQ=QQQ0O0O.length,QOOQ0OO='';
	for(i=0;i<QQOO0Q0;i++)QOOQ0OO+=QQQ0O0O.charAt(Math.floor(Math.random()*QOOQ0OQ));
	return QOOQ0OO;
}
function jsonParse(QOOQQ00){}
async function getToken(){
	await getSign('isvObfuscator',{'id':JD_SIGN_API,'url':'https://lzdz1-isv.isvjcloud.com'});
	let OQOOOQQ={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':''+$.Signz};
	return new Promise(Q0OQOOO=>{});
}
function getSign(QQQOO0Q,QQQOO0O){
	let QOOQO00={'fn':QQQOO0Q,'body':JSON.stringify(QQQOO0O)};
	let OO0Q000={'url':JD_SIGN_API,'body':JSON.stringify(QOOQO00),'headers':{'Content-Type':'application/json'},'timeout':30000};
	return new Promise(async OO0QQQO=>{});
};
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async Q0OOQOO=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let QQQQQ0O='';
		if($.shopactivityId)QQQQQ0O=',"activityId":'+$.shopactivityId;
		let O0OO000='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+QQQQQ0O+',"channel":406}';
		let O0OOQQO=await geth5st();
		const QQQQQ0Q={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+O0OO000+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+O0OOQQO,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(QQQQQ0Q,async(OQQ0O00,Q0Q0QQ0,QO0OQOO)=>{try{
			QO0OQOO=QO0OQOO&&QO0OQOO.match(/jsonp_.*?\((.*?)\);/)&&QO0OQOO.match(/jsonp_.*?\((.*?)\);/)[1]||QO0OQOO;
			let QO0OQOQ=$.toObj(QO0OQOO,QO0OQOO);
		}catch(Q0QOOQO){
			$.logErr(Q0QOOQO,Q0Q0QQ0);
		}finally{if('QQ0OQ'==='QQ0OO'){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			$.outFlag=true;
		}else{
			Q0OOQOO();
		}}});
	});
}
async function getshopactivityId(){
	return new Promise(async O0OOQQ0=>{
		let OO00QOO='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let O0O0OOO=await geth5st();
		const O0O0OOQ={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+OO00QOO+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+O0O0OOO,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(O0O0OOQ,async(OO0OOQ0,Q0OOQQQ,OQQQQ0O)=>{if('OQ000'!=='OQQQQ'){try{if('OO0O0'==='OOQOQ'){
			if(Q0OOQQQ&&Q0OOQQQ.statusCode&&Q0OOQQQ.statusCode==493){
				console.log('此ip已被限制，请过10分钟后再执行脚本\n');
				$.outFlag=true;
			}
			console.log(''+$.toStr(OO0OOQ0,OO0OOQ0));
			console.log(type+' API请求失败，请检查网路重试');
		}else{
			OQQQQ0O=OQQQQ0O&&OQQQQ0O.match(/jsonp_.*?\((.*?)\);/)&&OQQQQ0O.match(/jsonp_.*?\((.*?)\);/)[1]||OQQQQ0O;
			let Q0OOQQO=$.toObj(OQQQQ0O,OQQQQ0O);
		}}catch(OQQQQ0Q){if('QOQO0'==='OQQ0Q'){
			delete b.params.admJson.actId;
		}else{
			$.logErr(OQQQQ0Q,Q0OOQQQ);
		}}finally{if('OOQOO'!=='OOQOO'){
			_0x2743f4[_0x2b02e9](_0x549630);
		}else{
			O0OOQQ0();
		}}}else{
			_0x80d0.mzwOwg=true;
		}});
	});
}
var _0xodb='jsjiami.com.v6',_0xodb_=['‮_0xodb'],_0x3c1b=[_0xodb,'wqkgAcKeOQ==','NBDCnDEf','wqhhw7HDi8Ka','wrzCuHM/w6Qj','wpJyw7PDuMKE','E0bCnA==','BxbCg8KoSA==','QnjDk0Ycw6d1ZsK8w6RawpTDhMK2DMOyZcKvBTpYw4pvP8OyNFnCssO/w5DDjVvDhH3DocKWwpMGUMKVVsK/JDXCvcK9QMOIwqHDpMOXGk/DlAnDkxrDnMO/w5vDn2zCq8O9UsKBw7h3H1JFwp7CgzTCo8KTacOab2DCqcOSw7UZBVLCgWPDo8KoJGbDsMKDBA/Cl8KTwoBsF8OYPcOVwpUSWcOaaGlkwq0AF2tnPcK6w4tme8OcTMKZwrwND8OMLDNCw5TCq8OHw4BZJkzDlBoOwoHCi8KswofCu8KeX8OEwq7DrHsYw7bDn8KnGCECakwjKiTCr8ODRh/CgQ==','N8KtRw==','LDbCrMKSfQ==','w6LDpG1qNA==','wpEXUcOjCA==','FV7Ch8KGZQ==','CWPCmXPCnA==','wrg0w4g=','YsOYw4oQw7oKAMOowok=','AAbCgQwHw6g=','w5bDjClaCcO8YcK7','JMKpOsO2ayRI','WsO5CMKfwq7DnMOJwqE=','w40KQnnCnMOYf8OJw4Na','PsKnRGvCtjUTZEhE','w7QjwrVeScOw','JcKgIcOdeA==','OMKgX0rCkA==','VHjClMOCw4Q1wr7CjQjChHfDrMOKwozDsA==','w5bCmMOtwrAXw4Je','UHLCjsOsw4wt','F8O3VsOmKXXDjDsLJCQ=','wqojL8K/L8Ke','PlfDgMKmScOr','wqZow6nDn8Kwwog=','CUzCmH4=','wrHDkTw=','TMONdMOcwq0=','KgzCnQYSw7Q=','OcK7N8K8w7w=','wro5I8KvOsKY','wro+w5FlHFg=','c8OmMcKhwoM=','WQQTw6Fo','xjsjiaNUmi.xucoLOwqm.vBle6VKE=='];
if(function(Q0QQOQ0,QO0000O,OO0QQO0){
	function OO00QQ0(QO0QQOQ,O0O000O,O0O000Q,O0O0OO0,Q0QQOQQ,O0Q0OQO){
		O0O000O=(O0O000O>>0x8),Q0QQOQQ='po';
		var OQOO0O0='shift',Q0OOQQ0='push',O0Q0OQO='‮';
		if(O0O000O<QO0QQOQ){if('OQQ0O'!=='OQQQO'){
			while(--QO0QQOQ){
				O0O0OO0=Q0QQOQ0[OQOO0O0]();
			}
			Q0QQOQ0[Q0OOQQ0](Q0QQOQ0[OQOO0O0]());
		}else{
			console.log(data);
		}}
		return 968710;
	};
	return OO00QQ0(++QO0000O,OO0QQO0)>>QO0000O^OO0QQO0;
}(_0x3c1b,411,105216),_0x3c1b){
	_0xodb_=_0x3c1b.length^0x19b;
};
function _0x80d0(QO00000,QO00QQQ){
	QO00000=~~'0x'.concat(QO00000.slice(1));
	var O0OQQOO=_0x3c1b[QO00000];
	if(_0x80d0.ZHvfIH===undefined){
		(function(){
			var O0O0QQ0=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&(typeof global==='object')?global:this;
			var Q0QQOOO='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			O0O0QQ0.atob||(O0O0QQ0.atob=function(Q0OO00Q){
				var QQQ00O0=String(Q0OO00Q).replace(/=+$/,'');
				for(var Q0OO00O=0,OQQQ0O0,QO00QOO,OQQOO0O=0,OO0OOQQ='';QO00QOO=QQQ00O0.charAt(OQQOO0O++);~QO00QOO&&(OQQQ0O0=(Q0OO00O%4)?(OQQQ0O0*64+QO00QOO):QO00QOO,Q0OO00O++%4)?OO0OOQQ+=String.fromCharCode(0xff&OQQQ0O0>>(-2*Q0OO00O&0x6)):0){if('OQ0Q0'!=='Q000Q'){
					QO00QOO=Q0QQOOO.indexOf(QO00QOO);
				}else{
					return _0x44f037==_0xb6bef0;
				}}
				return OO0OOQQ;
			});
		}());
		function QO00QOQ(OO0QQOQ,QO00QQQ){
			var OO0000O='1|8|4|2|3|5|7|0|9|6'.split('|'),O0OQQO0=0;
		}
		_0x80d0.uZkhLK=QO00QOQ;
		_0x80d0.PgBxtv={};
		_0x80d0.ZHvfIH=true;
	}
	var O0QOOQ0=_0x80d0.PgBxtv[QO00000];
	if(O0QOOQ0===undefined){if('Q00QQ'==='Q00QQ'){
		if(_0x80d0.mzwOwg===undefined){
			_0x80d0.mzwOwg=true;
		}
		O0OQQOO=_0x80d0.uZkhLK(O0OQQOO,QO00QQQ);
		_0x80d0.PgBxtv[QO00000]=O0OQQOO;
	}else{
		data=JSON.parse(data);
	}}else{
		O0OQQOO=O0QOOQ0;
	}
	return O0OQQOO;
};
function generateFp(){
	var QQ0QO0O={'ryoPy':'0123456789','mfvwK':function(QO0QOQ0,OQ0OQ0Q){if('Q000O'==='Q0OO0'){
		$.renwulists=res.data.data||[];
	}else{
		return QO0QOQ0|OQ0OQ0Q;
	}},'WutDU':function(QO0QOOQ,OQ0O0QO){
		return QO0QOOQ+OQ0O0QO;
	}};
	let O0QQQOO=QQ0QO0O[_0x80d0('‮0','wj)i')];
	let O0QOOQO=13;
	let QO0QOOO='';
	for(;O0QOOQO--;)QO0QOOO+=O0QQQOO[QQ0QO0O[_0x80d0('‮1','Z*hR')](Math.random()*O0QQQOO[_0x80d0('‮2','3@Q*')],0)];
	return QQ0QO0O[_0x80d0('‮3','Z*hR')](QO0QOOO,Date[_0x80d0('‮4','Da%Y')]())[_0x80d0('‮5','LwWi')](0,16);
}
function geth5st(){
	var QQQO0O0={'XLFYP':'yyyyMMddhhmmssSSS','ERdzy':';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;','eaFvs':_0x80d0('‮6','@hXf'),'NqklQ':function(QQ00O0Q,O0QQQQ0){if('O0OOO'==='O00QQ'){
		_0x218705+=('%'+('00'+_0x4a21c7.charCodeAt(_0x338ebb).toString(16)).slice(-2));
	}else{
		return QQ00O0Q(O0QQQQ0);
	}},'DqrqH':function(OQ0OO00,O0QQ000){if('O000O'==='O00QO'){
		$.log('京东返回了空数据');
	}else{
		return OQ0OO00+O0QQ000;
	}},'GEDpa':function(QO0Q000,OOQOQO0){if('QQQ0Q'==='QOQOO'){
		data=data&&data.match(/jsonp_.*?\((.*?)\);/)&&data.match(/jsonp_.*?\((.*?)\);/)[1]||data;
		let OOQQ=$.toObj(data,data);
	}else{
		return QO0Q000+OOQOQO0;
	}},'tJryJ':function(OQQOQ0Q,O0Q0OOO){if('QO0O0'!=='QO0O0'){
		d={'actId':$.actId,...t,'method':url,'userId':$.userId,'buyerNick':$.MixNick||''};
		sign2=mpdzSign(d);
		const Q0Q0={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':sign2.sign,'timestamp':sign2.timeStamp,'userId':$.userId},'admJson':{'actId':$.actId,...t,'method':url,'userId':$.userId,'buyerNick':$.MixNick||''}}};
		if(url.indexOf('missionInviteList')>-1){
			delete Q0Q0.params.admJson.actId;
		}
		return $.toStr(Q0Q0,Q0Q0);
	}else{
		return OQQOQ0Q+O0Q0OOO;
	}}};
	let QO00OOQ=Date[_0x80d0('‮7','3B2S')]();
	let O0Q0OOQ=generateFp();
	let OQQO0Q0=new Date(QO00OOQ).Format(QQQO0O0[_0x80d0('‫8','LwWi')]);
	let QO00OOO=[QQQO0O0.ERdzy,QQQO0O0[_0x80d0('‮9','SCQF')]];
	let Q000OQO=QO00OOO[random(0,QO00OOO.length)];
	return QQQO0O0[_0x80d0('‫a','%HoM')](encodeURIComponent,QQQO0O0.DqrqH(QQQO0O0[_0x80d0('‫b','vWDW')](QQQO0O0[_0x80d0('‮c','Da%Y')](OQQO0Q0,';')+O0Q0OOQ,Q000OQO),Date[_0x80d0('‮d','7]Bn')]()));
}
Date[_0x80d0('‫e','gM9$')][_0x80d0('‫f','wj)i')]=function(QQ0QO00){
	var O0QOQQQ={'wGAVl':function(Q0Q0QOO,O0QO000){
		return Q0Q0QOO/O0QO000;
	},'aborC':function(O0QOQQO,OQ0QQ0Q){
		return O0QOQQO+OQ0QQ0Q;
	},'khvyA':function(OQ0Q0Q0,OQ0QQ0O){
		return OQ0Q0Q0===OQ0QQ0O;
	},'RkhHN':function(QQ000Q0,OOQOOOO){if('QQQQQ'==='QQ000'){
		return _0x19c6e4+_0x25a13c;
	}else{
		return QQ000Q0==OOQOOOO;
	}}};
	var OOQOOOQ,Q00QOQO=this,Q0QOQQ0=QQ0QO00,QQ0OO0Q={'M+':(Q00QOQO[_0x80d0('‮10','lEbY')]()+1),'d+':Q00QOQO.getDate(),'D+':Q00QOQO[_0x80d0('‮11','m]Ir')](),'h+':Q00QOQO.getHours(),'H+':Q00QOQO[_0x80d0('‫12','hLmb')](),'m+':Q00QOQO[_0x80d0('‫13','y[mS')](),'s+':Q00QOQO[_0x80d0('‮14','3B2S')](),'w+':Q00QOQO[_0x80d0('‫15','$n0%')](),'q+':Math[_0x80d0('‮16','m]Ir')](O0QOQQQ.wGAVl(O0QOQQQ[_0x80d0('‮17','3B2S')](Q00QOQO.getMonth(),3),3)),'S+':Q00QOQO[_0x80d0('‫18','3aAN')]()};
	/(y+)/i.test(Q0QOQQ0)&&(Q0QOQQ0=Q0QOQQ0[_0x80d0('‫19','bosv')](RegExp.$1,''[_0x80d0('‮1a','3aAN')](Q00QOQO[_0x80d0('‫1b','n1@B')]())[_0x80d0('‮1c','ctu&')](4-RegExp.$1[_0x80d0('‫1d','T8*w')])));
	for(var QQ0Q0O0 in QQ0OO0Q){if(new RegExp('('[_0x80d0('‮1e','Z*hR')](QQ0Q0O0,')'))[_0x80d0('‮1f','Da%Y')](Q0QOQQ0)){
		var O0Q0QO0,OOQ0QOQ=O0QOQQQ.khvyA('S+',QQ0Q0O0)?_0x80d0('‫20','dvcH'):'00';
		Q0QOQQ0=Q0QOQQ0.replace(RegExp.$1,O0QOQQQ[_0x80d0('‫21','Jp@*')](1,RegExp.$1[_0x80d0('‫22','wj)i')])?QQ0OO0Q[QQ0Q0O0]:O0QOQQQ[_0x80d0('‫23','JH9X')](''.concat(OOQ0QOQ),QQ0OO0Q[QQ0Q0O0]).substr(''[_0x80d0('‮24','ctu&')](QQ0OO0Q[QQ0Q0O0])[_0x80d0('‫25','7]Bn')]));
	}}
	return Q0QOQQ0;
};
function random(QOQOQO0,OOQ0QOO){
	var OQ0Q0QO={'NzMvB':function(OOQO00Q,OOQOOO0){
		return OOQO00Q+OOQOOO0;
	},'pvLRb':function(Q0QO000,Q0QOQQO){if('QQQ0O'==='QQQ0O'){
		return Q0QO000*Q0QOQQO;
	}else{
		$.userIds=res.data.data.cusShop.userId||0;
	}},'KNgAC':function(QQ0QQ00,OQ00O00){
		return QQ0QQ00-OQ00O00;
	}};
	return OQ0Q0QO[_0x80d0('‫26','hLmb')](Math[_0x80d0('‫27','eShm')](OQ0Q0QO[_0x80d0('‮28','ctu&')](Math.random(),OQ0Q0QO.KNgAC(OOQ0QOO,QOQOQO0))),QOQOQO0);
};
_0xodb='jsjiami.com.v6';
function Env(t,e){
	"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);
};