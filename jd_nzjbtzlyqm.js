/*
年终奖补贴助力邀请码

export krshareCode=""  多个用@链接


cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#年终奖补贴助力邀请码
11 11 11 11 * jd_nzjbtzlyqm.js, tag=年终奖补贴助力邀请码, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('年终奖补贴助力邀请码');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let message='',allMessage='';
let shareCodelist=[];
if(process.env['krshareCode']){
	if(process.env['krshareCode']['indexOf']('&')>-1){
		shareCodelist=process.env['krshareCode']['split']('&');
	}else if(process.env['krshareCode']['indexOf']('@')>-1){
		shareCodelist=process.env['krshareCode']['split']('@');
	}else if(process.env['krshareCode']['indexOf'](',')>-1){
		shareCodelist=process.env['krshareCode']['split'](',');
	}else{
		shareCodelist=[process.env['krshareCode']];
	}
}
let cookiesArr=[],cookie='';
const JD_API_HOST='https://api.m.jd.com/client.action';
let appIdArr=['1EFVXyw'];
let appNameArr=['年终奖补贴助力'];
let appId,appName;
$.shareCode=[];
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x296b0b=>{
		cookiesArr.push(jdCookieNode[_0x296b0b]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x52a7df=>_0x52a7df.cookie)]['filter'](_0x1569b1=>!!_0x1569b1);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	for(let _0x1f0457=0;_0x1f0457<cookiesArr.length;_0x1f0457++){
		if(cookiesArr[_0x1f0457]){
			cookie=cookiesArr[_0x1f0457];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x1f0457+1;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			const _0x489cac=shareCodelist;
			if(_0x489cac.length<=0){
				for(let _0x5d98a6=0;_0x5d98a6<appIdArr.length;_0x5d98a6++){
					appId=appIdArr[_0x5d98a6];
					appName=appNameArr[_0x5d98a6];
					if($.index<=5){
						console.log('\n未填写变量\nexport krshareCode=""  多个用@链接');
						await jd_wish();
						await $.wait(2000);
					}else{
						console.log('只获取前五个账号的助力码，避免获取太多黑IP');
						return;
					}
				}
			}
			for(let _0x1f0457=0;_0x1f0457<_0x489cac.length;_0x1f0457++){
				$.shareCode=_0x489cac[_0x1f0457];
				console.log($.shareCode);
				await harmony_collectScore({'appId':'1EFVXyw','taskToken':$.shareCode,'actionType':'0','taskId':'6'});
				await $.wait(3000);
			}
		}
	}
})()['catch'](_0x2441c8=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x2441c8+'!','');
})['finally'](()=>{
	$.done();
});
async function jd_wish(){
	try{
		$.hasEnd=false;
		await healthyDay_getHomeData();
		if($.hasEnd)return;
		await $.wait(5000);
	}catch(_0xc92e8e){
		$.logErr(_0xc92e8e);
	}
}
async function healthyDay_getHomeData(_0x128674=true){
	return new Promise(async _0x52a25e=>{
		$.post(taskUrl('healthyDay_getHomeData',{'appId':appId,'taskToken':'','channelId':1}),async(_0x205790,_0x3f9ff2,_0x374494)=>{
			try{
				if(_0x205790){
					console.log(''+JSON.stringify(_0x205790));
					console.log($.name+' getHomeData API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x374494)){
						_0x374494=JSON.parse(_0x374494);
						if(_0x374494.data['bizCode']===0){
							if(_0x128674){
								for(let _0x13c287 of Object.keys(_0x374494.data['result']['taskVos'])['reverse']()){
									let _0x589560=_0x374494.data['result']['taskVos'][_0x13c287];
									if(_0x589560.status!==2){
										if(_0x589560.taskType===6){
											console.log('【京东账号'+$.index+'（'+$.UserName+'）的'+appName+'好友互助码】'+_0x589560.assistTaskDetailVo['taskToken']+'\n');
											if(_0x589560.times!==_0x589560.maxTimes){
												$.shareCode['push']({'code':_0x589560.assistTaskDetailVo['taskToken'],'appId':appId,'use':$.UserName});
											}
										}
									}
								}
							}
						}else{
							console.log('黑号，火爆了\n');
							$.hasEnd=true;
						}
					}
				}
			}catch(_0x141f06){
				$.logErr(_0x141f06,_0x3f9ff2);
			}finally{
				_0x52a25e(_0x374494);
			}
		});
	});
}
function harmony_collectScore(_0x580f38={},_0x8af82b=''){
	return new Promise(_0x546c50=>{
		$.post(taskUrl('harmony_collectScore',_0x580f38),(_0x22b46e,_0x32af16,_0x13b166)=>{
			try{
				if(_0x22b46e){
					console.log(''+JSON.stringify(_0x22b46e));
					console.log($.name+' collectScore API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x13b166)){
						_0x13b166=JSON.parse(_0x13b166);
						if(_0x13b166&&_0x13b166.data&&_0x13b166.data['bizCode']===0){
							console.log('助力成功：获得'+_0x13b166.data['result']['score']+'金币\n');
						}else{
							console.log('助力失败：'+(_0x13b166.data['bizMsg']||_0x13b166.msg)+'\n');
							if(_0x13b166.code===-30001||_0x13b166.data&&_0x13b166.data['bizCode']===108){
								console.log('助力失败：'+(_0x13b166.data['bizMsg']||_0x13b166.msg)+'\n');
								return;
							}
							if(_0x13b166.data['bizCode']===103){
								console.log('助力失败：'+(_0x13b166.data['bizMsg']||_0x13b166.msg)+'\n');
								return;
							}
						}
					}
				}
			}catch(_0x408962){
				$.logErr(_0x408962,_0x32af16);
			}finally{
				_0x546c50();
			}
		});
	});
}
function taskUrl(_0x4750a5,_0x20dd11={}){
	return{'url':''+JD_API_HOST,'body':'functionId='+_0x4750a5+'&body='+JSON.stringify(_0x20dd11)+'&client=wh5&clientVersion=1.0.0','headers':{'Host':'api.m.jd.com','Accept':'application/json, text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Origin':'https://h5.m.jd.com','Cookie':cookie,'Accept-Language':'zh-cn','User-Agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://h5.m.jd.com/babelDiy/Zeus/4FdmTJQNah9oDJyQN8NggvRi1nEY/index.html','Accept-Encoding':'gzip, deflate, br'}};
}
function getAuthorShareCode(_0x44d6bb){
	return new Promise(async _0x1da357=>{
		const _0xec0001={'url':_0x44d6bb+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		if($.isNode()&&process.env['TG_PROXY_HOST']&&process.env['TG_PROXY_PORT']){
			const _0x234888=require('tunnel');
			const _0x4b50ca={'https':_0x234888.httpsOverHttp({'proxy':{'host':process.env['TG_PROXY_HOST'],'port':process.env['TG_PROXY_PORT']*1}})};
			Object.assign(_0xec0001,{'agent':_0x4b50ca});
		}
		$.get(_0xec0001,async(_0x1aae8e,_0x384e8a,_0x5930b8)=>{
			try{
				_0x1da357(JSON.parse(_0x5930b8));
			}catch(_0x1e1583){}finally{
				_0x1da357();
			}
		});
		await $.wait(10000);
		_0x1da357();
	});
}
function TotalBean(){
	return new Promise(async _0x30ee32=>{
		const _0x170b90={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}};
		$.post(_0x170b90,(_0x23b642,_0x1e86f1,_0x1ef0ae)=>{
			try{
				if(_0x23b642){
					console.log(''+JSON.stringify(_0x23b642));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x1ef0ae){
						_0x1ef0ae=JSON.parse(_0x1ef0ae);
						if(_0x1ef0ae.retcode===13){
							$.isLogin=false;
							return;
						}
						if(_0x1ef0ae.retcode===0){
							$.nickName=_0x1ef0ae.base&&_0x1ef0ae.base['nickname']||$.UserName;
						}else{
							$.nickName=$.UserName;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x40515a){
				$.logErr(_0x40515a,_0x1e86f1);
			}finally{
				_0x30ee32();
			}
		});
	});
}
function safeGet(_0x36732e){
	try{
		if(typeof JSON.parse(_0x36732e)=='object'){
			return true;
		}
	}catch(_0x21fc1c){
		console.log(_0x21fc1c);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function random(_0x215f13,_0x3eaffd){
	return Math.floor(Math.random()*(_0x3eaffd-_0x215f13))+_0x215f13;
}
function jsonParse(_0x4fac6a){
	if(typeof _0x4fac6a=='string'){
		try{
			return JSON.parse(_0x4fac6a);
		}catch(_0x12d7e7){
			console.log(_0x12d7e7);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};