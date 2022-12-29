/*
新年开新抽奖

cron:33 7 * * *
============Quantumultx===============
[task_local]
#新年开新抽奖
33 7 * * * jd_xlottery.js, tag=新年开新抽奖, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('新年开新抽奖');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[],cookie='',message;
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x35a333=>{
		cookiesArr.push(jdCookieNode[_0x35a333]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x1e63eb=>_0x1e63eb.cookie)]['filter'](_0x4d566e=>!!_0x4d566e);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	for(let _0x768882=0;_0x768882<cookiesArr.length;_0x768882++){
		if(cookiesArr[_0x768882]){
			cookie=cookiesArr[_0x768882];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x768882+1;
			$.isLogin=true;
			$.nickName='';
			message='';
			await TotalBean();
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await main();
		}
	}
})()['catch'](_0x8ff2dd=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x8ff2dd+'!','');
})['finally'](()=>{
	$.done();
});
async function main(){
	let _0x402d94,_0x51ffa6,_0x2b7422;
	let _0x13900b=await doApi('queryInteractiveInfo',{'geo':null,'mcChannel':0,'encryptProjectId':'4LHXp3v7oB7jRp3Nf5u9kqcNeyYg','sourceCode':'aceacesy20221130','ext':{'isQueryTrailInfo':true,'needNum':20,'recentRewardInAssignmentIds':[]}});
	doInteractiveAssignment=await doApi('doInteractiveAssignment',{'geo':null,'mcChannel':0,'encryptProjectId':'4LHXp3v7oB7jRp3Nf5u9kqcNeyYg','encryptAssignmentId':'UscQFzWLNJJ3Di2E2Hkdbw8QzmT','sourceCode':'aceacesy20221130','itemId':'','actionType':'','completionFlag':true});
	console.log(JSON.stringify(doInteractiveAssignment));
	await $.wait(2000);
	doInteractiveAssignment=await doApi('doInteractiveAssignment',{'geo':null,'mcChannel':0,'encryptProjectId':'4LHXp3v7oB7jRp3Nf5u9kqcNeyYg','encryptAssignmentId':'PjSiY1JxrbfUjTuPAc8aiprGPqx','sourceCode':'aceacesy20221130','itemId':'3301706588','actionType':'','completionFlag':true});
	console.log(JSON.stringify(doInteractiveAssignment));
	await $.wait(2000);
	doInteractiveAssignment=await doApi('doInteractiveAssignment',{'geo':null,'mcChannel':0,'encryptProjectId':'4LHXp3v7oB7jRp3Nf5u9kqcNeyYg','encryptAssignmentId':'PjSiY1JxrbfUjTuPAc8aiprGPqx','sourceCode':'aceacesy20221130','itemId':'3301706919','actionType':'','completionFlag':true});
	console.log(JSON.stringify(doInteractiveAssignment));
	let _0x52ecf7=await doApi('queryInteractiveRewardInfo',{'geo':null,'mcChannel':0,'encryptProjectId':'4LHXp3v7oB7jRp3Nf5u9kqcNeyYg','encryptAssignmentIds':[],'sourceCode':'aceacesy20221130','ext':{'needExchangeRestScore':'1','detailTypeFlag':1}});
	let _0x401c0d,_0x3d8c64;
	if(_0x52ecf7.subCode==='0'){
		_0x401c0d=3;
		console.log('\n可以抽奖'+_0x401c0d+'次');
		for(let _0x3a556e=_0x401c0d;_0x3a556e>0;_0x3a556e--){
			let _0x43223a=await doApi('doInteractiveAssignment',{'geo':null,'mcChannel':0,'encryptProjectId':'47CJwjuUASg8JkCkwWrh72JC39PR','encryptAssignmentId':'3VTpMXV8Grh3edScMdT7naEd1MDk','sourceCode':'aceacesy20221130','itemId':'','actionType':'','completionFlag':true,'ext':{'exchangeNum':1}});
			console.log(JSON.stringify(_0x43223a));
			await $.wait(2000);
		}
	}
}
function doApi(_0x516d6b,_0x1cb9e4){
	return new Promise(_0x2f6d87=>{
		let _0x215f58={'url':'https://api.m.jd.com/client.action?functionId='+_0x516d6b,'body':'appid=content_ecology&body='+encodeURIComponent(JSON.stringify(_0x1cb9e4))+'&sign=11&t='+Date.now(),'headers':{'Host':'api.m.jd.com','Accept':'*/*','Content-Type':'application/x-www-form-urlencoded','Origin':'https://prodev.m.jd.com','Accept-Language':'zh-CN,zh-Hans;q=0.9','User-Agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://prodev.m.jd.com/','Accept-Encoding':'gzip, deflate, br','Cookie':cookie}};
		$.post(_0x215f58,(_0x58d194,_0x16a411,_0x11667c)=>{
			try{
				if(_0x58d194){
					console.log(JSON.stringify(_0x58d194));
					console.log($.name+' '+_0x516d6b+' API请求失败，请检查网路重试');
					_0x2f6d87();
				}else{
					if(safeGet(_0x11667c)){
						_0x11667c=JSON.parse(_0x11667c);
					}
				}
			}catch(_0x9acee6){
				$.logErr(_0x9acee6,_0x16a411);
				_0x2f6d87();
			}finally{
				_0x2f6d87(_0x11667c);
			}
		});
	});
}
function TotalBean(){
	return new Promise(async _0x28db8e=>{
		const _0x531248={'url':'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2','headers':{'Host':'wq.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Accept-Language':'zh-cn','Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':'gzip, deflate, br'}};
		$.get(_0x531248,(_0x3dfb8a,_0x2b7833,_0x33c1e3)=>{
			try{
				if(_0x3dfb8a){
					$.logErr(_0x3dfb8a);
				}else{
					if(_0x33c1e3){
						_0x33c1e3=JSON.parse(_0x33c1e3);
						if(_0x33c1e3.retcode===1001){
							$.isLogin=false;
							return;
						}
						if(_0x33c1e3.retcode===0&&_0x33c1e3.data&&_0x33c1e3.data['hasOwnProperty']('userInfo')){
							$.nickName=_0x33c1e3.data['userInfo']['baseInfo']['nickname'];
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x4d79ba){
				$.logErr(_0x4d79ba);
			}finally{
				_0x28db8e();
			}
		});
	});
}
function safeGet(_0x57e6a3){
	try{
		if(typeof JSON.parse(_0x57e6a3)=='object'){
			return true;
		}
	}catch(_0x51eafe){
		console.log(_0x51eafe);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function jsonParse(_0x1180da){
	if(typeof _0x1180da=='string'){
		try{
			return JSON.parse(_0x1180da);
		}catch(_0x56618a){
			console.log(_0x56618a);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};