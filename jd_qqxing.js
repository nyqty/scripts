/*
星系牧场
活动入口：QQ星儿童牛奶京东自营旗舰店->品牌会员->星系牧场
[task_local]
#星系牧场
13 14 * * * jd_qqxing.js
*/
const Env=require('./utils/Env.js');
const $=new Env('QQ星系牧场');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const randomCount=$.isNode()?20:5;
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzdz-isv.isvjcloud.com';
let merge={};
let codeList=[];
Exchange=true;
let cookiesArr=[],cookie='';
function oc(_0x5c8a92,_0x493212){
	try{
		return _0x5c8a92();
	}catch(_0x5090c7){
		return undefined;
	}
}
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x5299ca=>{
		cookiesArr.push(jdCookieNode[_0x5299ca]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x559f1b=>_0x559f1b.cookie)]['filter'](_0x1a29ef=>!!_0x1a29ef);
}
const JD_API_HOST='https://api.m.jd.com/client.action';
message='';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	let _0x38ea8a=[];//await getAuthorCodeList('http://code.kingran.ga/xxmc.json');
	$.shareUuid=_0x38ea8a[Math.floor(Math.random()*_0x38ea8a.length)];
	console.log('活动入口：https://lzdz-isv.isvjcloud.com/dingzhi/qqxing/pasture/activity/5270742?activityId=90121061401&shareUuid='+$.shareUuid);
	for(let _0x53065e=0;_0x53065e<7;_0x53065e++){
		cookie=cookiesArr[_0x53065e];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x53065e+1;
			$.cando=true;
			$.cow='';
			$.openCard=true;
			$.isLogin=true;
			$.needhelp=true;
			$.foodNum=0;
			$.nickName='';
			$.drawresult='';
			$.exchange=0;
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await genToken();
			await getActCk();
			$.token2=await getToken(cookie,domains);
			await getshopid();
			await getMyPin();
			await adlog();
			await getUserInfo();
			if($.cando){
				await getUid($.shareuuid);
				await getinfo();
				taskList=[...$.taskList,...$.taskList2];
				for(j=0;j<taskList.length;j++){
					task=taskList[j];
					console.log(task.taskname);
					if(task.taskid=='interact'){
						for(l=0;l<20-task.curNum;l++){
							console.log('完成任务中....等待5秒....');
							await dotask(task.taskid,task.params);
							await $.wait(5000);
						}
						console.log('互动完成');
					}else if(task.taskid=='scansku'){
						await getproduct();
						await writePersonInfo($.vid);
						await dotask(task.taskid,$.pparam);
					}else if(task.taskid!=='add2cart'){
						await dotask(task.taskid,task.params);
						await $.wait(5000);
					}
				}
				await getinfo();
				for(k=0;k<$.drawchance;k++){
					await draw();
				}
				let _0xf02c46=Math.floor($.foodNum/10000);
				console.log('可兑换 '+_0xf02c46+' 次 100京🐶');
				for(q=0;q<_0xf02c46&&Exchange;q++){
					await exchange(14);
				}
				await getinfo();
				if(!Exchange){
					console.log('你 默认 不兑换东西,请自行进去活动兑换');
				}
				message+='【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n'+$.cow+' 兑换京🐶 '+$.exchange+'  '+$.drawresult+'\n';
				console.log('休息休息~');
				await $.wait(5*1000);
			}else{
				$.msg($.name,'','跑不起来了~请自己进去一次牧场');
			}
		}
	}
	if(message.length!=0){
		if($.isNode()){}else{
			$.msg($.name,'','星系牧场'+message);
		}
	}
})()['catch'](_0x2d87e6=>$.logErr(_0x2d87e6))['finally'](()=>$.done());
function updateCookie(_0x49a133){
	if(!oc(()=>_0x49a133.headers['set-cookie'])){
		return;
	}
	let _0x3ac6d4={};
	let _0xc971ad={};
	let _0x48f8c3=cookie.split(';');
	for(let _0xc0b55a of _0x48f8c3){
		const _0x25405f=_0xc0b55a.split('=');
		_0x3ac6d4[_0x25405f[0]]=_0xc0b55a.replace(_0x25405f[0]+'=','');
	}
	for(let _0x306f07 of _0x49a133.headers['set-cookie']){
		const _0x802416=_0x306f07.split(';')[0];
		const _0x25405f=_0x802416.split('=');
		_0x3ac6d4[_0x25405f[0]]=_0x802416.replace(_0x25405f[0]+'=','');
	}
	const _0x31de8e={
		..._0xc971ad,..._0x3ac6d4
	};
	cookie='';
	for(let _0x13243d in _0x31de8e){
		_0x13243d&&(cookie=cookie+(_0x13243d+'='+_0x31de8e[_0x13243d]+';'));
	}
}
function jdUrl(_0x187f14,_0x35d4eb){
	return{'url':'https://api.m.jd.com/client.action?functionId='+_0x187f14,'body':_0x35d4eb,'headers':{'Host':'api.m.jd.com','accept':'*/*','user-agent':'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)','accept-language':'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6','content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
}
function genToken(){
	let _0x1735f8={'url':'https://api.m.jd.com/client.action?functionId=genToken','body':'&body=%7B%22to%22%3A%22https%3A%5C/%5C/lzdz-isv.isvjcloud.com%5C/dingzhi%5C/qqxing%5C/pasture%5C/activity?activityId%3D90121061401%22%2C%22action%22%3A%22to%22%7D&build=167588&client=apple&clientVersion=9.4.4&d_brand=apple&d_model=iPhone9%2C2&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=1805a3ab499eebc088fd9ed1c67f5eaf350856d4&osVersion=12.0&partner=apple&rfs=0000&scope=11&screen=1242%2A2208&sign=73af724a6be5f3cb89bf934dfcde647f&st=1624887881842&sv=111','headers':{'Host':'api.m.jd.com','accept':'*/*','user-agent':'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)','accept-language':'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6','content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
	return new Promise(_0x49daa7=>{
		$.post(_0x1735f8,async(_0x48728b,_0x1f0dd5,_0x145b1e)=>{
			updateCookie(_0x1f0dd5);
			try{
				if(_0x48728b){
					console.log($.name+' API请求失败，请检查网路重试');
					console.log(''+JSON.stringify(_0x48728b));
				}else{
					_0x145b1e=JSON.parse(_0x145b1e);
					$.isvToken=_0x145b1e.tokenKey;
					cookie+='IsvToken='+_0x145b1e.tokenKey;
				}
			}catch(_0x3d6a7a){
				$.logErr(_0x3d6a7a,_0x1f0dd5);
			}finally{
				_0x49daa7(_0x145b1e);
			}
		});
	});
}
function getActCk(){
	return new Promise(_0x29f823=>{
		$.get(taskUrl('/dingzhi/qqxing/pasture/activity','activityId=90121061401'),(_0x20086c,_0x27b7ad,_0x49cd4c)=>{
			updateCookie(_0x27b7ad);
			try{
				if(_0x20086c){
					console.log($.name+' API请求失败，请检查网路重试');
				}else{}
			}catch(_0x32ff38){
				$.logErr(_0x32ff38,_0x27b7ad);
			}finally{
				_0x29f823(_0x49cd4c);
			}
		});
	});
}
function getshopid(){
	let _0x320df2=taskPostUrl('/dz/common/getSimpleActInfoVo','activityId=90121061401');
	return new Promise(_0x1d47cb=>{
		$.post(_0x320df2,async(_0x96e853,_0x58bf5f,_0x2897af)=>{
			updateCookie(_0x58bf5f);
			try{
				if(_0x96e853){
					console.log(''+JSON.stringify(_0x96e853));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x2897af=JSON.parse(_0x2897af);
					if(_0x2897af.result){
						$.shopid=_0x2897af.data['shopId'];
					}
				}
			}catch(_0x15076f){
				$.logErr(_0x15076f,_0x58bf5f);
			}finally{
				_0x1d47cb(_0x2897af);
			}
		});
	});
}
function getMyPin(){
	let _0x1ba56a=taskPostUrl('/dingzhi/bd/common/getMyPing','userId='+$.shopid+'&token='+encodeURIComponent($.token2)+'&fromType=APP&activityId=90121061401');
	return new Promise(_0x2ed87e=>{
		$.post(_0x1ba56a,async(_0x3aff03,_0x13a7ea,_0x400fd4)=>{
			updateCookie(_0x13a7ea);
			try{
				if(_0x3aff03){
					console.log(''+JSON.stringify(_0x3aff03));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x400fd4=JSON.parse(_0x400fd4);
					if(_0x400fd4.data&&_0x400fd4.data['secretPin']){
						$.pin=_0x400fd4.data['secretPin'];
						$.nickname=_0x400fd4.data['nickname'];
						console.log('欢迎回来~  '+$.nickname);
					}
				}
			}catch(_0x25c178){
				$.logErr(_0x25c178,_0x13a7ea);
			}finally{
				_0x2ed87e(_0x400fd4);
			}
		});
	});
}
function adlog(){
	let _0x21734c=taskPostUrl('/common/accessLogWithAD','venderId=1000361242&code=99&pin='+encodeURIComponent($.pin)+'&activityId=90121061401&pageUrl=https%3A%2F%2Flzdz-isv.isvjcloud.com%2Fdingzhi%2Fqqxing%2Fpasture%2Factivity%3FactivityId%3D90121061401%26lng%3D107.146945%26lat%3D33.255267%26sid%3Dcad74d1c843bd47422ae20cadf6fe5aw%26un_area%3D27_2442_2444_31912&subType=app&adSource=');
	return new Promise(_0x1999e6=>{
		$.post(_0x21734c,async(_0x2f3ebf,_0x4166ad,_0x2e9022)=>{
			updateCookie(_0x4166ad);
			try{
				if(_0x2f3ebf){
					console.log(''+JSON.stringify(_0x2f3ebf));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if($.isNode())for(let _0x3585de of _0x4166ad.headers['set-cookie']){
						cookie=cookie+'; '+_0x3585de.split(';')[0]+';';
					}else{
						for(let _0x2ba9ba of _0x4166ad.headers['Set-Cookie']['split'](',')){
							cookie=cookie+'; '+_0x2ba9ba.split(';')[0]+';';
						}
					}
				}
			}catch(_0x338fe3){
				$.logErr(_0x338fe3,_0x4166ad);
			}finally{
				_0x1999e6(_0x2e9022);
			}
		});
	});
}
function getUserInfo(){
	return new Promise(_0xf585f=>{
		let _0x2c3243='pin='+encodeURIComponent($.pin);
		let _0x575839=taskPostUrl('/wxActionCommon/getUserInfo',_0x2c3243);
		$.post(_0x575839,async(_0x399c88,_0x17a06b,_0xdd9180)=>{
			updateCookie(_0x17a06b);
			try{
				if(_0x399c88){
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0xdd9180=JSON.parse(_0xdd9180);
					if(_0xdd9180.data){
						$.userId=_0xdd9180.data['id'];
						$.pinImg=_0xdd9180.data['yunMidImageUrl'];
						$.nick=_0xdd9180.data['nickname'];
					}else{
						$.cando=false;
					}
				}
			}catch(_0x3a76e0){
				$.logErr(_0x3a76e0,_0x17a06b);
			}finally{
				_0xf585f(_0xdd9180);
			}
		});
	});
}
function getUid(){
	return new Promise(_0x3afe10=>{
		let _0x58f202='activityId=90121061401&pin='+encodeURIComponent($.pin)+'&pinImg='+$.pinImg+'&nick='+encodeURIComponent($.nick)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareuuid;
		$.post(taskPostUrl('/dingzhi/qqxing/pasture/activityContent',_0x58f202),async(_0x221597,_0x2c181d,_0x149139)=>{
			updateCookie(_0x2c181d);
			try{
				if(_0x221597){
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x149139=JSON.parse(_0x149139);
					if(_0x149139.result){
						if(_0x149139.data['openCardStatus']!=3){
							console.log('当前未开卡,无法助力和兑换奖励哦');
						}
						$.shareuuid=_0x149139.data['uid'];
						console.log('\n【京东账号'+$.index+'（'+$.UserName+'）的'+$.name+'好友互助码】'+$.shareuuid+'\n');
					}
				}
			}catch(_0x71cb81){
				$.logErr(_0x71cb81,_0x2c181d);
			}finally{
				_0x3afe10(_0x149139);
			}
		});
	});
}
function getinfo(){
	let _0x2eca4b=taskPostUrl('/dingzhi/qqxing/pasture/myInfo','activityId=90121061401&pin='+encodeURIComponent($.pin)+'&pinImg='+$.pinImg+'&actorUuid='+$.shareuuid+'&userUuid='+$.shareuuid);
	return new Promise(_0x10882a=>{
		$.post(_0x2eca4b,async(_0x3f8008,_0x513054,_0x52cb0c)=>{
			updateCookie(_0x513054);
			try{
				if(_0x3f8008){
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x52cb0c=JSON.parse(_0x52cb0c);
					if(_0x52cb0c.result){
						$.taskList=_0x52cb0c.data['task']['filter'](_0x1398f9=>_0x1398f9.maxNeed==1&&_0x1398f9.curNum==0||_0x1398f9.taskid=='interact');
						$.taskList2=_0x52cb0c.data['task']['filter'](_0x5147df=>_0x5147df.maxNeed!=1&&_0x5147df.type==0);
						$.draw=_0x52cb0c.data['bags']['filter'](_0x311294=>_0x311294.bagId=='drawchance')[0];
						$.food=_0x52cb0c.data['bags']['filter'](_0x3454ec=>_0x3454ec.bagId=='food')[0];
						$.sign=_0x52cb0c.data['bags']['filter'](_0x295150=>_0x295150.bagId=='signDay')[0];
						$.score=_0x52cb0c.data['score'];
						let _0x3b7b4e=_0x52cb0c.data['task']['filter'](_0x52ae5b=>_0x52ae5b.taskid=='share2help')[0];
						if(_0x3b7b4e){
							console.log('今天已有'+_0x3b7b4e.curNum+'人为你助力啦');
							if(_0x3b7b4e.curNum==20){
								$.needhelp=false;
							}
						}
						$.cow='当前🐮🐮成长值：'+$.score+'  饲料：'+($.food['totalNum']-$.food['useNum'])+'  抽奖次数：'+($.draw['totalNum']-$.draw['useNum'])+'  签到天数：'+$.sign['totalNum'];
						$.foodNum=$.food['totalNum']-$.food['useNum'];
						console.log($.cow);
						$.drawchance=$.draw['totalNum']-$.draw['useNum'];
					}else{
						$.cando=false;
						console.log(_0x52cb0c.errorMessage);
					}
				}
			}catch(_0x14adc4){
				$.logErr(_0x14adc4,_0x513054);
			}finally{
				_0x10882a(_0x52cb0c);
			}
		});
	});
}
function getproduct(){
	return new Promise(_0x43f33c=>{
		let _0x51b347='type=4&activityId=90121061401&pin='+encodeURIComponent($.pin)+'&actorUuid='+$.uuid+'&userUuid='+$.uuid;
		$.post(taskPostUrl('/dingzhi/qqxing/pasture/getproduct',_0x51b347),async(_0x5eec92,_0x379762,_0x239468)=>{
			updateCookie(_0x379762);
			try{
				if(_0x5eec92){
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x239468=JSON.parse(_0x239468);
					if(_0x239468.data&&_0x239468.data[0]){
						$.pparam=_0x239468.data[0]['id'];
						$.vid=_0x239468.data[0]['venderId'];
					}
				}
			}catch(_0x5657eb){
				$.logErr(_0x5657eb,_0x379762);
			}finally{
				_0x43f33c(_0x239468);
			}
		});
	});
}
function writePersonInfo(_0x20d984){
	return new Promise(_0x1d4ba9=>{
		let _0x1377dc='jdActivityId=1404370&pin='+encodeURIComponent($.pin)+'&actionType=5&venderId='+_0x20d984+'&activityId=90121061401';
		$.post(taskPostUrl('/interaction/write/writePersonInfo',_0x1377dc),async(_0x46693f,_0x42fcce,_0x337a5b)=>{
			updateCookie(_0x42fcce);
			try{
				if(_0x46693f){
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					console.log('浏览：'+$.vid);
					console.log(_0x337a5b);
				}
			}catch(_0xc62280){
				$.logErr(_0xc62280,_0x42fcce);
			}finally{
				_0x1d4ba9(_0x337a5b);
			}
		});
	});
}
function exchange(_0x76ae3f){
	return new Promise(_0x5d25ca=>{
		let _0x5662b5='pid='+_0x76ae3f+'&activityId=90121061401&pin='+encodeURIComponent($.pin)+'&actorUuid=&userUuid=';
		$.post(taskPostUrl('/dingzhi/qqxing/pasture/exchange?_',_0x5662b5),async(_0x18c5f3,_0x4c09eb,_0x36d58e)=>{
			updateCookie(_0x4c09eb);
			try{
				if(_0x18c5f3){
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x36d58e=JSON.parse(_0x36d58e);
					if(_0x36d58e.result){
						console.log('兑换 '+_0x36d58e.data['rewardName']+'成功');
						$.exchange+=20;
					}else{
						console.log(_0x36d58e.errorMessage,'\n');
					}
				}
			}catch(_0x12fdfc){
				$.logErr(_0x12fdfc,_0x4c09eb);
			}finally{
				_0x5d25ca(_0x36d58e);
			}
		});
	});
}
function dotask(_0xa8fcbc,_0x3be809){
	let _0x12266e=taskPostUrl('/dingzhi/qqxing/pasture/doTask','taskId='+_0xa8fcbc+'&'+(_0x3be809?'param='+_0x3be809+'&':'')+'activityId=90121061401&pin='+encodeURIComponent($.pin)+'&actorUuid='+$.uuid+'&userUuid='+$.shareuuid);
	return new Promise(_0x279a5b=>{
		$.post(_0x12266e,async(_0x449203,_0x3bce2a,_0x37f9a0)=>{
			updateCookie(_0x3bce2a);
			try{
				if(_0x449203){
					console.log(''+JSON.stringify(_0x449203));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x37f9a0=JSON.parse(_0x37f9a0);
					if(_0x37f9a0.result){
						if(_0x37f9a0.data['food']){
							console.log('操作成功,获得饲料： '+_0x37f9a0.data['food']+'  抽奖机会：'+_0x37f9a0.data['drawChance']+'  成长值：'+_0x37f9a0.data['growUp']);
						}
					}else{
						console.log(_0x37f9a0.errorMessage);
					}
				}
			}catch(_0xa05e33){
				$.logErr(_0xa05e33,_0x3bce2a);
			}finally{
				_0x279a5b(_0x37f9a0);
			}
		});
	});
}
function draw(){
	let _0x542834=taskPostUrl('/dingzhi/qqxing/pasture/luckydraw','activityId=90121061401&pin='+encodeURIComponent($.pin)+'&actorUuid=&userUuid=');
	return new Promise(_0x32f511=>{
		$.post(_0x542834,async(_0x1caebe,_0x39e8d5,_0x2dc7a9)=>{
			updateCookie(_0x39e8d5);
			try{
				if(_0x1caebe){
					console.log(''+JSON.stringify(_0x1caebe));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x2dc7a9=JSON.parse(_0x2dc7a9);
					if(_0x2dc7a9.result){
						if(Object.keys(_0x2dc7a9.data)['length']==0){
							console.log('抽奖成功,恭喜你抽了个寂寞： ');
						}else{
							console.log('恭喜你抽中 '+_0x2dc7a9.data['prize']['rewardName']);
							$.drawresult+='恭喜你抽中 '+_0x2dc7a9.data['prize']['rewardName']+' ';
						}
					}else{
						console.log(_0x2dc7a9.errorMessage);
					}
				}
			}catch(_0x5e3e72){
				$.logErr(_0x5e3e72,_0x39e8d5);
			}finally{
				_0x32f511(_0x2dc7a9);
			}
		});
	});
}
function taskUrl(_0x2f60d5,_0x123b8c){
	const _0x2a152a=Date.now();
	return{'url':'https://lzdz-isv.isvjcloud.com'+_0x2f60d5+'?'+_0x123b8c,'headers':{'Host':'lzdz-isv.isvjcloud.com','Accept':'application/json','Referer':'https://lzdz-isv.isvjcloud.com','user-agent':'jdapp;android;10.0.4;11;2393039353533623-7383235613364343;network/wifi;model/Redmi K30;addressid/138549750;aid/290955c2782e1c44;oaid/b30cf82cacfa8972;osVer/30;appBuild/88641;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36','content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
}
function taskPostUrl(_0x5cd586,_0x1cb40f){
	return{'url':'https://lzdz-isv.isvjcloud.com'+_0x5cd586,'body':_0x1cb40f,'headers':{'Host':'lzdz-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Referer':'https://lzdz-isv.isvjcloud.com','user-agent':'jdapp;android;10.0.4;11;2393039353533623-7383235613364343;network/wifi;model/Redmi K30;addressid/138549750;aid/290955c2782e1c44;oaid/b30cf82cacfa8972;osVer/30;appBuild/88641;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36','content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
}
function getAuthorCodeList(_0x4c22a5){
	return new Promise(_0x106f86=>{
		const _0x97f89b={'url':_0x4c22a5+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x97f89b,async(_0x19e3e1,_0x50eda0,_0x3e68dc)=>{
			try{
				if(_0x19e3e1){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x3e68dc)_0x3e68dc=JSON.parse(_0x3e68dc);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x23a5e9){
				$.logErr(_0x23a5e9,_0x50eda0);
				_0x3e68dc=null;
			}finally{
				_0x106f86(_0x3e68dc);
			}
		});
	});
}
function random(_0x2b209b,_0x5be1ae){
	return Math.floor(Math.random()*(_0x5be1ae-_0x2b209b))+_0x2b209b;
}
function jsonParse(_0x34796c){
	if(typeof _0x34796c=='string'){
		try{
			return JSON.parse(_0x34796c);
		}catch(_0x5db5d5){
			console.log(_0x5db5d5);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};