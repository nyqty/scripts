/*
1.1-1.31 SK2互动抽奖，至高赢经典神仙水

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 1.1-1.31 SK2互动抽奖，至高赢经典神仙水 ]

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#1.1-1.31 SK2互动抽奖，至高赢经典神仙水
1 1 1 1 * jd_sk2.js, tag=1.1-1.31 SK2互动抽奖，至高赢经典神仙水, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('1.1-1.31 SK2互动抽奖，至高赢经典神仙水');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjcloud.com';
let opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:'10':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'10';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x12b233=>{
		cookiesArr.push(jdCookieNode[_0x12b233]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x1d84ac=>_0x1d84ac.cookie)]['filter'](_0x22c616=>!!_0x22c616);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let activityUrl='https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/2301100000982123/';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='2301100000982123';
	authorCodeList=await getAuthorCodeList('http://code.kingran.ga/sk2.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000009821/99/2301100000982123/?helpUuid='+$.shareUuid);
	for(let _0xbe0a14=0;_0xbe0a14<cookiesArr.length;_0xbe0a14++){
		cookie=cookiesArr[_0xbe0a14];
		originCookie=cookiesArr[_0xbe0a14];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0xbe0a14+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0xbe0a14==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x13162b='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x13162b);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x13162b);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x320cef=>$.logErr(_0x320cef))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x582875=false;
		$.Token=await getToken(cookie,domains);
		if($.Token==''){
			console.log('获取[token]失败！');
			return;
		}
		await getCk();
		if(activityCookie==''){
			console.log('获取cookie失败');
			return;
		}
		if($.activityEnd===true){
			console.log('活动结束');
			return;
		}
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await takePostRequest('getOpenCardStatusWithOutSelf');
		await takePostRequest('activityContent');
		if($.openStatus==false){
			console.log('去开通店铺会员');
			$.joinVenderId=1000009821;
			await joinShop();
			if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
				console.log('第1次 重新开卡');
				await $.wait(parseInt(Math.random()*2000+3000,10));
				await joinShop();
			}
			if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
				console.log('💔 无法开卡,跳过运行');
				return;
			}
			await takePostRequest('getOpenCardStatusWithOutSelf');
			await takePostRequest('activityContent');
		}
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		console.log($.actorUuid);
		for(let _0x47e103=0;_0x47e103<$.taskslist['length'];_0x47e103++){
			$.taskId=$.taskslist[_0x47e103]['taskId'];
			if($.taskslist[_0x47e103]['btnState']!=1){
				switch($.taskId){
					case '67555ce7872311edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x47e103]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '67555cfa872311edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x47e103]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '67555d0a872311edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x47e103]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '67555d22872311edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x47e103]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '67555d30872311edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x47e103]['taskName']);
						await takePostRequest('browse');
						for(let _0x47e103=0;_0x47e103<$.browselist['length'];_0x47e103++){
							$.skuId=$.browselist[_0x47e103]['skuId'];
							if($.browselist[_0x47e103]['state']!=1){
								console.log('去浏览'+$.browselist[_0x47e103]['skuId']);
								await takePostRequest('browse1');
								await $.wait(parseInt(Math.random()*1000+2000,10));
							}
						}
						break;
					case'67555d48872311edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x47e103]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '67555d53872311edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x47e103]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '67555d5e872311edbfc4fa163e8623a7':
					case '67555d3c872311edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x47e103]['taskName']);
						await takePostRequest('activityContent');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					default:
						console.log('错误'+$.taskId);
				}
			}
		}
		await takePostRequest('activityContent');
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x55b6a1=parseInt($.leftTimes/1);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x55b6a1>opencard_draw)_0x55b6a1=opencard_draw;
			console.log('已设置抽奖次数为'+opencard_draw+'次，当前有'+$.leftTimes+'次抽奖机会');
			for(m=1;_0x55b6a1--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('draw');
				if($.runFalag==false)break;
				if(Number(_0x55b6a1)<=0)break;
				if(m>=5){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}else console.log('如需抽奖请设置环境变量[opencard_draw]为"3" 3为次数');
		if($.index==1){
			$.shareUuid=$.actorUuid;
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+5000,10));
	}catch(_0x3a63fe){
		console.log(_0x3a63fe);
	}
}
async function takePostRequest(_0x90b46a){
	if($.outFlag)return;
	let _0x1fa715='https://lzkjdz-isv.isvjcloud.com';
	let _0x354dee='';
	let _0x35f9a1='POST';
	let _0x381176='';
	switch(_0x90b46a){
		case 'getMyPing':
			url=_0x1fa715+'/customer/getMyPing';
			_0x354dee='token='+$.Token+'&fromType=APP&userId=1000009821&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x1fa715+'/common/brand/getSimpleActInfoVo';
			_0x354dee='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x1fa715+'/common/accessLogWithAD';
			let _0x2b97e4='https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x354dee='venderId=1000009821&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x2b97e4);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x1fa715+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x354dee='venderId=1000009821&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x1fa715+'/wx/skii/lottery/draw/main';
			_0x354dee='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&teamId='+$.shareUuid;
			break;
		case 'task':
			url=_0x1fa715+'/wx/skii/lottery/draw/task';
			_0x354dee='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&mark=2';
			break;
		case 'browse':
			url=_0x1fa715+'/wx/skii/lottery/draw/browse';
			_0x354dee='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&mark=1';
			break;
		case 'browse1':
			url=_0x1fa715+'/wx/skii/lottery/draw/browse';
			_0x354dee='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&skuId='+$.skuId;
			break;
		case 'followShop':
			url=_0x1fa715+'/wxActionCommon/followShop';
			_0x354dee='activityId='+$.activityId+'userId=1000009821&activityType=99&buyerNick='+encodeURIComponent($.Pin)+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'draw':
			url=_0x1fa715+'/wx/skii/lottery/draw/draw';
			_0x354dee='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x90b46a);
	}
	let _0x234da7=getPostRequest(url,_0x354dee,_0x35f9a1);
	return new Promise(async _0x357835=>{
		$.post(_0x234da7,(_0x169022,_0x4b4ec6,_0x4a152b)=>{
			try{
				setActivityCookie(_0x4b4ec6);
				if(_0x169022){
					if(_0x4b4ec6&&typeof _0x4b4ec6.statusCode!='undefined'){
						if(_0x4b4ec6.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x169022,_0x169022));
					console.log(_0x90b46a+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x90b46a,_0x4a152b);
				}
			}catch(_0x275611){
				console.log(_0x275611,_0x4b4ec6);
			}finally{
				_0x357835();
			}
		});
	});
}
async function dealReturn(_0xe7dd24,_0x17f775){
	let _0x2f0666='';
	try{
		if(_0xe7dd24!='accessLogWithAD'||_0xe7dd24!='drawContent'){
			if(_0x17f775){
				_0x2f0666=JSON.parse(_0x17f775);
			}
		}
	}catch(_0x59e210){
		console.log(_0xe7dd24+' 执行任务异常');
		console.log(_0x17f775);
		$.runFalag=false;
	}
	try{
		switch(_0xe7dd24){
			case'getMyPing':
				if(typeof _0x2f0666=='object'){
					if(_0x2f0666.result&&_0x2f0666.result===true){
						if(_0x2f0666.data&&typeof _0x2f0666.data['secretPin']!='undefined')$.Pin=_0x2f0666.data['secretPin'];
						if(_0x2f0666.data&&typeof _0x2f0666.data['nickname']!='undefined')$.nickname=_0x2f0666.data['nickname'];
					}else if(_0x2f0666.errorMessage){
						console.log(_0xe7dd24+' '+(_0x2f0666.errorMessage||''));
					}else{
						console.log(_0xe7dd24+' '+_0x17f775);
					}
				}else{
					console.log(_0xe7dd24+' '+_0x17f775);
				}
				break;
			case 'task':
				if(typeof _0x2f0666=='object'){
					if(_0x2f0666.success&&_0x2f0666.success===true){
						console.log(''+(_0x2f0666.success||''));
					}else if(_0x2f0666.errorMessage){
						console.log(''+(_0x2f0666.errorMessage||''));
					}else{
						console.log(''+_0x17f775);
					}
				}else{
					console.log(''+_0x17f775);
				}
				break;
			case 'browse':
				if(typeof _0x2f0666=='object'){
					if(_0x2f0666.success&&_0x2f0666.success===true){
						$.browselist=_0x2f0666.data||[];
					}else if(_0x2f0666.errorMessage){
						console.log(''+(_0x2f0666.errorMessage||''));
					}else{
						console.log(''+_0x17f775);
					}
				}else{
					console.log(''+_0x17f775);
				}
				break;
			case 'browse1':
				if(typeof _0x2f0666=='object'){
					if(_0x2f0666.success&&_0x2f0666.success===true){
						console.log(''+(_0x2f0666.success||''));
					}else if(_0x2f0666.errorMessage){
						console.log(''+(_0x2f0666.errorMessage||''));
					}else{
						console.log(''+_0x17f775);
					}
				}else{
					console.log(''+_0x17f775);
				}
				break;
			case 'draw':
				if(typeof _0x2f0666=='object'){
					if(_0x2f0666.success&&_0x2f0666.success===true&&_0x2f0666.data['drawOk']){
						console.log('抽中：'+_0x2f0666.data['name']);
					}else if(_0x2f0666.errorMessage){
						console.log(''+(_0x2f0666.errorMessage||''));
					}else{
						console.log('💨  空气');
					}
				}else{
					console.log(''+_0x17f775);
				}
				break;
			case'followShop':
				if(typeof _0x2f0666=='object'){
					if(_0x2f0666.result&&_0x2f0666.result===true){
						console.log(''+_0x2f0666.data);
					}else if(_0x2f0666.errorMessage){
						console.log(''+(_0x2f0666.errorMessage||''));
					}else{
						console.log(' '+_0x17f775);
					}
				}else{
					console.log(''+_0x17f775);
				}
				break;
			case 'activityContent':
				if(typeof _0x2f0666=='object'){
					if(_0x2f0666.success&&_0x2f0666.success===true){
						$.actorUuid=_0x2f0666.data['uuid']||'';
						$.turntableId=_0x2f0666.data['turntableId']||'';
						$.leftTimes=_0x2f0666.data['leftTimes']||0;
						$.state=_0x2f0666.data['state']||'';
						$.taskslist=_0x2f0666.data['tasks']||[];
					}else if(_0x2f0666.errorMessage){
						if(_0x2f0666.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0xe7dd24+' '+(_0x2f0666.errorMessage||''));
					}else{
						console.log(_0xe7dd24+' '+_0x17f775);
					}
				}else{
					console.log(_0xe7dd24+' '+_0x17f775);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x2f0666=='object'){
					if(_0x2f0666.isOk){
						$.openStatus=_0x2f0666.openCard||false;
					}else if(_0x2f0666.errorMessage||_0x2f0666.msg){
						console.log(_0xe7dd24+' '+(_0x2f0666.errorMessage||_0x2f0666.msg||''));
					}else{
						console.log(_0xe7dd24+' '+_0x17f775);
					}
				}else{
					console.log(_0xe7dd24+' '+_0x17f775);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0xe7dd24+'-> '+_0x17f775);
		}
		if(typeof _0x2f0666=='object'){
			if(_0x2f0666.errorMessage){
				if(_0x2f0666.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x28a1e){
		console.log(_0x28a1e);
	}
}
function getPostRequest(_0x3f7390,_0xca14e9,_0x9b10b9='POST'){
	let _0x1aec32={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x3f7390.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x1aec32.Referer=activityUrl;
		_0x1aec32.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x3f7390,'method':_0x9b10b9,'headers':_0x1aec32,'body':_0xca14e9,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x5048ee=>{
		let _0x5b526f={'url':'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2301100000982123','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x5b526f,async(_0x3aea55,_0x2ff5a1,_0x13f4e5)=>{
			try{
				if(_0x3aea55){
					if(_0x2ff5a1&&typeof _0x2ff5a1.statusCode!='undefined'){
						if(_0x2ff5a1.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3aea55));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x2c36a8=$.toObj(_0x13f4e5,_0x13f4e5);
					if(typeof _0x2c36a8=='object'){
						if(_0x2c36a8.result&&_0x2c36a8.result===true){
							$.endTime=_0x2c36a8.data['endTime']||0;
							$.startTimes=_0x2c36a8.data['startTime']||Date.now();
						}else if(_0x2c36a8.errorMessage){
							console.log(''+(_0x2c36a8.errorMessage||''));
						}else{
							console.log(''+_0x13f4e5);
						}
					}else{
						console.log(''+_0x13f4e5);
					}
				}
			}catch(_0x448fd1){
				$.logErr(_0x448fd1,_0x2ff5a1);
			}finally{
				_0x5048ee();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x62dba5=>{
		let _0x5d42c6={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x5d42c6,async(_0x3d0cda,_0x488fe9,_0x6a62b4)=>{
			try{
				if(_0x3d0cda){
					if(_0x488fe9&&typeof _0x488fe9.statusCode!='undefined'){
						if(_0x488fe9.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3d0cda));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x490e95=_0x6a62b4.match(/(活动已经结束)/)&&_0x6a62b4.match(/(活动已经结束)/)[1]||'';
					if(_0x490e95){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x488fe9);
				}
			}catch(_0x185714){
				$.logErr(_0x185714,_0x488fe9);
			}finally{
				_0x62dba5();
			}
		});
	});
}
function setActivityCookie(_0x5acd54){
	if(_0x5acd54){
		if(_0x5acd54.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x24a888 of _0x5acd54.headers['set-cookie']){
				lz_cookie[_0x24a888.split(';')[0]['substr'](0,_0x24a888.split(';')[0]['indexOf']('='))]=_0x24a888.split(';')[0]['substr'](_0x24a888.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x3889e0 of Object.keys(lz_cookie)){
				cookie+=_0x3889e0+'='+lz_cookie[_0x3889e0]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x45e2f6){
	_0x45e2f6=_0x45e2f6||32;
	let _0x577aad='abcdef0123456789',_0x265171=_0x577aad.length,_0x545f3f='';
	for(i=0;i<_0x45e2f6;i++)_0x545f3f+=_0x577aad.charAt(Math.floor(Math.random()*_0x265171));
	return _0x545f3f;
}
async function joinShop(){
	return new Promise(async _0x1592af=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x1cf58b='';
		if($.shopactivityId)_0x1cf58b=',"activityId":'+$.shopactivityId;
		const _0x337236='{"venderId":"1000009821","shopId":"1000009821","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x1cf58b+',"channel":406}';
		const _0x48e4fb={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x337236)};
		const _0x2de8cc=await getH5st('8adfb',_0x48e4fb);
		const _0x5e13a1={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x337236+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x2de8cc),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x5e13a1,async(_0x47e87b,_0x4592d8,_0x3a4f89)=>{
			try{
				_0x3a4f89=_0x3a4f89&&_0x3a4f89.match(/jsonp_.*?\((.*?)\);/)&&_0x3a4f89.match(/jsonp_.*?\((.*?)\);/)[1]||_0x3a4f89;
				let _0x30749c=$.toObj(_0x3a4f89,_0x3a4f89);
				if(_0x30749c&&typeof _0x30749c=='object'){
					if(_0x30749c&&_0x30749c.success===true){
						console.log(_0x30749c.message);
						$.errorJoinShop=_0x30749c.message;
						if(_0x30749c.result&&_0x30749c.result['giftInfo']){
							for(let _0x52d6e1 of _0x30749c.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x52d6e1.discountString+_0x52d6e1.prizeName+_0x52d6e1.secondLineDesc);
							}
						}
					}else if(_0x30749c&&typeof _0x30749c=='object'&&_0x30749c.message){
						$.errorJoinShop=_0x30749c.message;
						console.log(''+(_0x30749c.message||''));
					}else{
						console.log(_0x3a4f89);
					}
				}else{
					console.log(_0x3a4f89);
				}
			}catch(_0x25352d){
				$.logErr(_0x25352d,_0x4592d8);
			}finally{
				_0x1592af();
			}
		});
	});
}
function getH5st(_0x578ae1,_0x6971b6){
	return new Promise(async _0x107ee9=>{
		let _0x27aa0f={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x578ae1+'&req='+encodeURIComponent(JSON.stringify(_0x6971b6)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x27aa0f,(_0x5cdc15,_0x4b281a,_0x2d52b5)=>{
			try{
				if(_0x5cdc15){
					console.log(JSON.stringify(_0x5cdc15));
					console.log($.name+' getH5st API请求失败，请检查网路重试');
				}else{}
			}catch(_0x154a09){
				$.logErr(_0x154a09,_0x4b281a);
			}finally{
				_0x107ee9(_0x2d52b5);
			}
		});
	});
}
function getAuthorCodeList(_0xa87296){
	return new Promise(_0x54f709=>{
		const _0x27b8c8={'url':_0xa87296+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x27b8c8,async(_0x3e99f9,_0x56b872,_0x5b8d15)=>{
			try{
				if(_0x3e99f9){
					$.log(_0x3e99f9);
				}else{
					if(_0x5b8d15)_0x5b8d15=JSON.parse(_0x5b8d15);
				}
			}catch(_0x12a52c){
				$.logErr(_0x12a52c,_0x56b872);
				_0x5b8d15=null;
			}finally{
				_0x54f709(_0x5b8d15);
			}
		});
	});
}
function jsonParse(_0x1f976e){
	if(typeof _0x1f976e=='string'){
		try{
			return JSON.parse(_0x1f976e);
		}catch(_0x38108c){
			console.log(_0x38108c);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};