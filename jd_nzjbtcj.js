/*
年终奖补贴抽奖

cron:29 14,16 8-12 12 *
============Quantumultx===============
[task_local]
#年终奖补贴抽奖
29 14,16 8-12 12 * jd_nzjbtcj.js, tag=年终奖补贴抽奖, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('年终奖补贴抽奖');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let message='',allMessage='';
let cookiesArr=[],cookie='';
const JD_API_HOST='https://api.m.jd.com/client.action';
let appIdArr=['1EFVXyw'];
let appNameArr=['年终奖补贴'];
let appId,appName;
$.shareCode=[];
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x4af6b8=>{
		cookiesArr.push(jdCookieNode[_0x4af6b8]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x3684e8=>_0x3684e8.cookie)]['filter'](_0x46b162=>!!_0x46b162);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	if(appIdArr.length<=0){
		console.log('\n暂无活动~\n');
		return;
	}
	for(let _0x4d2d2f=0;_0x4d2d2f<cookiesArr.length;_0x4d2d2f++){
		if(cookiesArr[_0x4d2d2f]){
			cookie=cookiesArr[_0x4d2d2f];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x4d2d2f+1;
			$.isLogin=true;
			$.nickName='';
			message='';
			console.log('\n*******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			for(let _0x47f799=0;_0x47f799<appIdArr.length;_0x47f799++){
				appId=appIdArr[_0x47f799];
				appName=appNameArr[_0x47f799];
				await jd_wish();
				await $.wait(2000);
			}
		}
	}
	if(allMessage){
		if($.isNode())await notify.sendNotify($.name,allMessage);
		$.msg($.name,'',allMessage);
	}
})()['catch'](_0x37ae0c=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x37ae0c+'!','');
})['finally'](()=>{
	$.done();
});
async function jd_wish(){
	try{
		$.hasEnd=false;
		await splitHongbao_getHomeData();
		if($.hasEnd)return;
		await $.wait(2000);
		$.openList=[2,3,4,5,7];
		$.canLottery=true;
		for(let _0x379790=0;_0x379790<$.openList['length'];_0x379790++){
			$.taskId=$.openList[_0x379790];
			await splitHongbao_getLotteryResult();
			await $.wait(3000);
		}
		for(let _0x28184d=0;_0x28184d<$.lotteryNum;_0x28184d++){
			await splitHongbao_getLotteryResult1();
			await $.wait(3000);
		}
	}catch(_0x1a236c){
		$.logErr(_0x1a236c);
	}
}
async function splitHongbao_getHomeData(_0x3fe1fb=true){
	return new Promise(async _0x341d3b=>{
		$.post(taskUrl('splitHongbao_getHomeData',{'appId':appId,'taskToken':'','channelId':1}),async(_0x1b8faa,_0x1d52c4,_0x44b202)=>{
			try{
				if(_0x1b8faa){
					console.log(''+JSON.stringify(_0x1b8faa));
					console.log($.name+' getHomeData API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x44b202)){
						_0x44b202=JSON.parse(_0x44b202);
						$.lotteryNum=_0x44b202.data['result']['userInfo']['lotteryNum']||0;
						console.log('开红包次数：'+$.lotteryNum);
						if(_0x44b202.data['bizCode']===0){
							if(_0x3fe1fb){
								for(let _0x18d3e9 of Object.keys(_0x44b202.data['result']['taskVos'])['reverse']()){
									let _0x423e15=_0x44b202.data['result']['taskVos'][_0x18d3e9];
									if(_0x423e15.status!==2){}else{
										console.log('【'+_0x423e15.taskName+'】已完成\n');
									}
								}
							}
						}else{
							console.log('黑号，火爆了\n');
							$.hasEnd=true;
						}
					}
				}
			}catch(_0x33fbde){
				$.logErr(_0x33fbde,_0x1d52c4);
			}finally{
				_0x341d3b(_0x44b202);
			}
		});
	});
}
function harmony_collectScore(_0x5381fc={},_0x146dfc=''){
	return new Promise(_0x4e51a5=>{
		$.post(taskUrl('harmony_collectScore',_0x5381fc),(_0x3c5562,_0x557765,_0x261292)=>{
			try{
				if(_0x3c5562){
					console.log(''+JSON.stringify(_0x3c5562));
					console.log($.name+' collectScore API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x261292)){
						_0x261292=JSON.parse(_0x261292);
						if(_0x261292&&_0x261292.data&&_0x261292.data['bizCode']===0){
							if(_0x146dfc===13){
								console.log('签到成功：获得'+_0x261292.data['result']['score']+'金币\n');
							}else if(_0x5381fc.taskId==5){
								console.log('助力成功：您的好友获得'+_0x261292.data['result']['score']+'金币\n');
							}else{
								console.log('完成任务：获得'+_0x261292.data['result']['score']+'金币\n');
							}
						}else{
							if(_0x146dfc===13){
								console.log('签到失败：'+_0x261292.data['bizMsg']+'\n');
							}else if(_0x5381fc.taskId==5){
								console.log('助力失败：'+(_0x261292.data['bizMsg']||_0x261292.msg)+'\n');
								if(_0x261292.code===-30001||_0x261292.data&&_0x261292.data['bizCode']===108)$.canHelp=false;
								if(_0x261292.data['bizCode']===103)$.delcode=true;
							}else{
								console.log(_0x5381fc.actionType==='0'?'完成任务失败：'+_0x261292.data['bizMsg']+'\n':_0x261292.data['bizMsg']);
							}
						}
					}
				}
			}catch(_0x36aee8){
				$.logErr(_0x36aee8,_0x557765);
			}finally{
				_0x4e51a5();
			}
		});
	});
}
function splitHongbao_getLotteryResult(){
	return new Promise(_0xad43ab=>{
		$.post(taskUrl('splitHongbao_getLotteryResult',{'appId':appId,'taskId':$.taskId}),(_0x5925ab,_0x4dd34d,_0x11a2a6)=>{
			try{
				if(_0x5925ab){
					console.log(''+JSON.stringify(_0x5925ab));
					console.log($.name+' getLotteryResul API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x11a2a6)){
						_0x11a2a6=JSON.parse(_0x11a2a6);
						let _0x202abe=_0x11a2a6&&_0x11a2a6.data&&_0x11a2a6.data['result']&&_0x11a2a6.data['result']['userAwardsCacheDto'];
						if(_0x202abe){
							if(_0x202abe.type===2){
								console.log('抽中：'+_0x202abe.jBeanAwardVo['quantity']+(_0x202abe.jBeanAwardVo['ext']||'京豆'));
							}else if(_0x202abe.type===0){
								console.log('很遗憾未中奖~');
							}else if(_0x202abe.type===1){
								console.log('抽中：'+_0x202abe.couponVo['prizeName']+'，金额'+_0x202abe.couponVo['usageThreshold']+'-'+_0x202abe.couponVo['quota']+'，使用时间'+_0x202abe.couponVo['useTimeRange']);
							}else{
								console.log('抽中：'+JSON.stringify(_0x11a2a6));
								message+='抽中：'+JSON.stringify(_0x11a2a6)+'\n';
							}
						}else{
							console.log(_0x11a2a6);
						}
					}
				}
			}catch(_0x133cf4){
				$.logErr(_0x133cf4,_0x4dd34d);
			}finally{
				_0xad43ab();
			}
		});
	});
}
function splitHongbao_getLotteryResult1(){
	return new Promise(_0x4f2390=>{
		$.post(taskUrl('splitHongbao_getLotteryResult',{'appId':appId,'taskId':''}),(_0x28b7d0,_0x1fdc55,_0x60da82)=>{
			try{
				if(_0x28b7d0){
					console.log(''+JSON.stringify(_0x28b7d0));
					console.log($.name+' getLotteryResul API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x60da82)){
						_0x60da82=JSON.parse(_0x60da82);
						let _0x586e7c=_0x60da82&&_0x60da82.data&&_0x60da82.data['result']&&_0x60da82.data['result']['userAwardsCacheDto'];
						if(_0x586e7c){
							if(_0x586e7c.type===2){
								console.log('抽中：'+_0x586e7c.jBeanAwardVo['quantity']+(_0x586e7c.jBeanAwardVo['ext']||'京豆'));
							}else if(_0x586e7c.type===0){
								console.log('很遗憾未中奖~');
							}else if(_0x586e7c.type===1){
								console.log('抽中：'+_0x586e7c.couponVo['prizeName']+'，金额'+_0x586e7c.couponVo['usageThreshold']+'-'+_0x586e7c.couponVo['quota']+'，使用时间'+_0x586e7c.couponVo['useTimeRange']);
							}else{
								console.log('抽中：'+JSON.stringify(_0x60da82));
								message+='抽中：'+JSON.stringify(_0x60da82)+'\n';
							}
						}else{
							console.log(_0x60da82);
						}
					}
				}
			}catch(_0xe1f9b7){
				$.logErr(_0xe1f9b7,_0x1fdc55);
			}finally{
				_0x4f2390();
			}
		});
	});
}
function taskUrl(_0x233e7e,_0x1f139e={}){
	return{'url':''+JD_API_HOST,'body':'functionId='+_0x233e7e+'&body='+JSON.stringify(_0x1f139e)+'&client=wh5&clientVersion=1.0.0','headers':{'Host':'api.m.jd.com','Accept':'application/json, text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Origin':'https://h5.m.jd.com','Cookie':cookie,'Accept-Language':'zh-cn','User-Agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://h5.m.jd.com/babelDiy/Zeus/4FdmTJQNah9oDJyQN8NggvRi1nEY/index.html','Accept-Encoding':'gzip, deflate, br'}};
}
function getAuthorShareCode(_0x26b4d4){
	return new Promise(async _0x29e180=>{
		const _0x34ce21={'url':_0x26b4d4+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		if($.isNode()&&process.env['TG_PROXY_HOST']&&process.env['TG_PROXY_PORT']){
			const _0x5d86a1=require('tunnel');
			const _0x567357={'https':_0x5d86a1.httpsOverHttp({'proxy':{'host':process.env['TG_PROXY_HOST'],'port':process.env['TG_PROXY_PORT']*1}})};
			Object.assign(_0x34ce21,{'agent':_0x567357});
		}
		$.get(_0x34ce21,async(_0x687037,_0x314dab,_0xd8a696)=>{
			try{
				_0x29e180(JSON.parse(_0xd8a696));
			}catch(_0x36bb32){}finally{
				_0x29e180();
			}
		});
		await $.wait(10000);
		_0x29e180();
	});
}
function TotalBean(){
	return new Promise(async _0x10591b=>{
		const _0x5982ae={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}};
		$.post(_0x5982ae,(_0x42d8dd,_0x48aea1,_0x41e80e)=>{
			try{
				if(_0x42d8dd){
					console.log(''+JSON.stringify(_0x42d8dd));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x41e80e){
						_0x41e80e=JSON.parse(_0x41e80e);
						if(_0x41e80e.retcode===13){
							$.isLogin=false;
							return;
						}
						if(_0x41e80e.retcode===0){
							$.nickName=_0x41e80e.base&&_0x41e80e.base['nickname']||$.UserName;
						}else{
							$.nickName=$.UserName;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x1efb0b){
				$.logErr(_0x1efb0b,_0x48aea1);
			}finally{
				_0x10591b();
			}
		});
	});
}
function safeGet(_0x24e282){
	try{
		if(typeof JSON.parse(_0x24e282)=='object'){
			return true;
		}
	}catch(_0x1e6e0b){
		console.log(_0x1e6e0b);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function jsonParse(_0x47ccca){
	if(typeof _0x47ccca=='string'){
		try{
			return JSON.parse(_0x47ccca);
		}catch(_0x134e8b){
			console.log(_0x134e8b);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};