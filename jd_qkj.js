/*
京东秋裤节
[task_local]
#京东秋裤节
31 1,23 * * * jd_qkj.js, tag=京东秋裤节, enabled=true
*/
const Env=require('./utils/Env.js');
const $=new Env('京东秋裤节');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const linkId='clXbTm-6dnQFYcnaz7Oy5g';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x4af010=>{
		cookiesArr.push(jdCookieNode[_0x4af010]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x2a6b2f=>_0x2a6b2f.cookie)].filter(_0x12f871=>!!_0x12f871);
}
$.invitePinTaskList=[];
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	for(let _0x5cb5c6=0;_0x5cb5c6<cookiesArr.length;_0x5cb5c6++){
		cookie=cookiesArr[_0x5cb5c6];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x5cb5c6+1;
			$.isLogin=true;
			$.nickName='';
			UA=await getUa();
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await run();
			await $.wait(2000);
		}
	}
})().catch(_0x43f6b5=>$.logErr(_0x43f6b5)).finally(()=>$.done());
async function run(){
	try{
		await arenaVote();
		await getTaskList();
		for(const _0x5605cb of $.taskList){
			if(_0x5605cb.taskType==='SIGN'){
				$.log(_0x5605cb.taskTitle+' 签到');
				await apDoTask(_0x5605cb.id,_0x5605cb.taskType,undefined);
			}
			if(_0x5605cb.taskType==='FOLLOW_SHOP'){
				let _0x2bbaf8=await apTaskDetail(_0x5605cb.id,_0x5605cb.taskType);
				let _0xe810e6=0;
				if(_0x2bbaf8.length===0){
					let _0x463342=await apTaskDrawAward(_0x5605cb.id,_0x5605cb.taskType);
					if(!_0x463342.success){
						$.log(_0x5605cb.taskTitle+' 领取完成!');
						_0x2bbaf8=await apTaskDetail(_0x5605cb.id,_0x5605cb.taskType);
					}
				}
				while(_0x5605cb.taskLimitTimes-_0x5605cb.taskDoTimes>=0){
					if(_0x2bbaf8.length===0){
						$.log(_0x5605cb.taskTitle+' 活动火爆，素材库没有素材，我也不知道啥回事 = = ');
						break;
					}
					$.log(_0x5605cb.taskTitle+' '+_0x5605cb.taskDoTimes+'/'+_0x5605cb.taskLimitTimes);
					let _0x393c25=await apDoTask(_0x5605cb.id,_0x5605cb.taskType,_0x2bbaf8[_0xe810e6].itemId,_0x2bbaf8[_0xe810e6].appid);
					if(_0x393c25.code===2005||_0x393c25.code===0){
						$.log(_0x5605cb.taskTitle+' 任务完成！');
					}else{
						$.log(_0x393c25.echo+' 任务失败！');
					}
					await $.wait(1000);
					_0xe810e6++;
					_0x5605cb.taskDoTimes++;
					if(!_0x2bbaf8[_0xe810e6]){
						break;
					}
				}
			}
			if(_0x5605cb.taskType==='BROWSE_CHANNEL'){
				let _0x1925d4=await apTaskDetail(_0x5605cb.id,_0x5605cb.taskType);
				let _0xe810e6=0;
				if(_0x1925d4.length===0){
					let _0x393c25=await apTaskDrawAward(_0x5605cb.id,_0x5605cb.taskType);
					if(!_0x393c25.success){
						$.log(_0x5605cb.taskTitle+' 领取完成!');
						_0x1925d4=await apTaskDetail(_0x5605cb.id,_0x5605cb.taskType);
					}
				}
				for(let _0x34c787=0;_0x34c787<_0x5605cb.taskLimitTimes;_0x34c787++){
					_0x1925d4=await apTaskDetail(_0x5605cb.id,_0x5605cb.taskType);
					if(_0x1925d4.length===0){
						$.log(_0x5605cb.taskTitle+' 活动火爆，素材库没有素材，我也不知道啥回事 = = ');
						break;
					}
					$.log(_0x5605cb.taskTitle+' '+_0x5605cb.taskDoTimes+'/'+_0x5605cb.taskLimitTimes);
					if(_0x1925d4[_0xe810e6].itemName==='京东数科'){
						break;
					}
					let _0x393c25=await apDoTask(_0x5605cb.id,_0x5605cb.taskType,_0x1925d4[_0xe810e6].itemId);
					if(_0x393c25.code===2005){
						$.log(_0x5605cb.taskTitle+' 任务完成！');
						break;
					}
					await $.wait(1000);
					_0x5605cb.taskDoTimes++;
				}
			}
		}
		for(let _0x1533bc=0;_0x1533bc<5;_0x1533bc++){
			await honorKingsLottery();
		}
	}catch(_0x165063){
		console.log(_0x165063);
	}
}
function getTaskList(){
	return new Promise(_0x44bb99=>{
		$.post(taskPostClientActionUrl('apTaskList',{'linkId':linkId}),async(_0x373013,_0x2b88aa,_0x31e8da)=>{
			try{
				if(_0x373013){
					console.log(''+JSON.stringify(_0x373013));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x31e8da=JSON.parse(_0x31e8da);
					$.taskList=_0x31e8da.data;
					if(_0x31e8da.success){
						$.log('=== 任务列表 start ===');
						for(const _0x29f939 of $.taskList){
							$.log(_0x29f939.taskTitle+' '+_0x29f939.taskDoTimes+'/'+_0x29f939.taskLimitTimes);
						}
						$.log('=== 任务列表 end  ===');
					}
				}
			}catch(_0x30c884){
				$.logErr(_0x30c884,_0x2b88aa);
			}finally{
				_0x44bb99(_0x31e8da);
			}
		});
	});
}
function apDoTask(_0x2a39a1,_0x2df7ac,_0x2edfa3=''){
	return new Promise(_0x3213e2=>{
		$.post(taskPostClientActionUrl('apDoTask',{'taskType':_0x2df7ac,'taskId':_0x2a39a1,'channel':4,'linkId':linkId,'itemId':_0x2edfa3}),async(_0x816be3,_0x2f6713,_0x5b3e54)=>{
			try{
				if(_0x816be3){
					console.log(''+JSON.stringify(_0x816be3));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x5b3e54=JSON.parse(_0x5b3e54);
					if(_0x5b3e54.code==0){
						console.log('任务完成，成功！');
					}
				}
			}catch(_0x16d2ae){
				$.logErr(_0x16d2ae,_0x2f6713);
			}finally{
				_0x3213e2(_0x5b3e54);
			}
		});
	});
}
function apTaskDetail(_0x2e423c,_0x371e9c){
	return new Promise(_0x31a05e=>{
		$.post(taskPostClientActionUrl('apTaskDetail',{'taskType':_0x371e9c,'taskId':_0x2e423c,'channel':4,'linkId':linkId}),async(_0x4739ac,_0x516cc2,_0xf255a3)=>{
			try{
				if(_0x4739ac){
					console.log(''+JSON.stringify(_0x4739ac));
					console.log('apTaskDetail API请求失败，请检查网路重试');
				}else{
					_0xf255a3=JSON.parse(_0xf255a3);
					if(!_0xf255a3.success){
						$.taskDetailList=[];
					}else{
						$.taskDetailList=_0xf255a3.data.taskItemList;
					}
				}
			}catch(_0x4af30e){
				$.logErr(_0x4af30e,_0x516cc2);
			}finally{
				if(!_0xf255a3.success){
					_0x31a05e([]);
				}else{
					_0x31a05e(_0xf255a3.data.taskItemList);
				}
			}
		});
	});
}
function apTaskDrawAward(_0x4cb240,_0x1c7b5e){
	return new Promise(_0x4f655c=>{
		$.post(taskPostClientActionUrl('apTaskDrawAward',{'taskType':_0x1c7b5e,'taskId':_0x4cb240,'linkId':linkId}),async(_0x323e28,_0x5301b,_0x2097e4)=>{
			try{
				if(_0x323e28){
					console.log(''+JSON.stringify(_0x323e28));
					console.log('apTaskDrawAward API请求失败，请检查网路重试');
				}else{
					_0x2097e4=JSON.parse(_0x2097e4);
					$.log('领取奖励');
				}
			}catch(_0x335696){
				$.logErr(_0x335696,_0x5301b);
			}finally{
				_0x4f655c(_0x2097e4);
			}
		});
	});
}
function arenaVote(){
	body={'linkId':linkId,'voteTeam':'yes'};
	opt={'url':'https://api.m.jd.com/?functionId=arenaVote&appid=activities_platform&body='+encodeURIComponent(JSON.stringify(body))+'&_t='+new Date().getTime()+'&cthr=1','headers':{'User-Agent':UA,'Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Origin':'https://pro.m.jd.com/','Referer':'https://pro.m.jd.com/','Cookie':cookie+'cid=8'}};
	return new Promise(_0x3d4274=>{
		$.get(opt,async(_0x3fd380,_0x3cade2,_0x4a2a23)=>{
			try{
				if(_0x3fd380){
					console.log(''+JSON.stringify(_0x3fd380));
					console.log('arenaVote API请求失败，请检查网路重试');
				}else{
					_0x4a2a23=JSON.parse(_0x4a2a23);
					if(_0x4a2a23.code==0){}else{
						console.log('失败原因: '+_0x4a2a23.errMsg);
					}
				}
			}catch(_0x1a7ff6){
				$.logErr(_0x1a7ff6,_0x3cade2);
			}finally{
				_0x3d4274(_0x4a2a23);
			}
		});
	});
}
function honorKingsLottery(){
	body={'linkId':linkId};
	opt={'url':'https://api.m.jd.com/?functionId=honorKingsLottery&appid=activities_platform&body='+encodeURIComponent(JSON.stringify(body))+'&_t='+new Date().getTime()+'&cthr=1','headers':{'User-Agent':UA,'Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Origin':'https://pro.m.jd.com/','Referer':'https://pro.m.jd.com/','Cookie':cookie+'cid=3'}};
	return new Promise(_0x5c3ae8=>{
		$.get(opt,async(_0x592391,_0xbc6171,_0x11d2ab)=>{
			try{
				if(_0x592391){
					console.log(''+JSON.stringify(_0x592391));
					console.log('honorKingsLottery API请求失败，请检查网路重试');
				}else{
					_0x11d2ab=JSON.parse(_0x11d2ab);
					if(_0x11d2ab.code==0){
						console.log(_0x11d2ab.data.prizeConfigName);
					}else{
						console.log('失败原因: '+_0x11d2ab.errMsg);
					}
				}
			}catch(_0x518b75){
				$.logErr(_0x518b75,_0xbc6171);
			}finally{
				_0x5c3ae8();
			}
		});
	});
}
function taskPostClientActionUrl(_0x2cdf8b,_0x291072,_0x38059c=new Date().getTime(),_0x7f89a4){
	bodyinfo=(_0x2cdf8b?'functionId='+_0x2cdf8b:'')+'&appid=activities_platform&body='+JSON.stringify(_0x291072)+'&t='+_0x38059c+'&cthr=1';
	if(_0x7f89a4){
		bodyinfo+='&h5st='+encodeURIComponent(_0x7f89a4);
	}
	return{'url':'https://api.m.jd.com','body':bodyinfo,'headers':{'User-Agent':UA,'Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Origin':'https://pro.m.jd.com/','Referer':'https://pro.m.jd.com/','Cookie':cookie+'cid=8'}};
}
function jsonParse(_0xe998c4){
	if(typeof _0xe998c4=='string'){
		try{
			return JSON.parse(_0xe998c4);
		}catch(_0x1a4439){
			console.log(_0x1a4439);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function getUa(){
	for(var _0x2a592c='',_0x4ec36c='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',_0x392956=0;_0x392956<16;_0x392956++){
		var _0x94033f=Math.round(Math.random()*(_0x4ec36c.length-1));
		_0x2a592c+=_0x4ec36c.substring(_0x94033f,_0x94033f+1);
	}
	uuid=Buffer.from(_0x2a592c,'utf8').toString('base64');
	ep=encodeURIComponent(JSON.stringify({'hdid':'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=','ts':new Date().getTime(),'ridx':-1,'cipher':{'sv':'CJK=','ad':uuid,'od':'CNKmCNKmCNKjCNKmCM0mCNKmBJKmCNKjCNKmCNKmCNKmCNKm','ov':'Ctu=','ud':uuid},'ciphertype':5,'version':'1.2.0','appname':'com.jd.jdlite'}));
	return 'jdltapp;android;3.8.16;;;appBuild/2314;ef/1;ep/'+ep+';Mozilla/5.0 (Linux; Android 10; WLZ-AN01 Build/HUAWEIWLZ-AN01; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045837 Mobile Safari/537.36';
};

