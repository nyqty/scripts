/*
12.1-12.31 SK2互动抽奖，至高赢经典神仙水

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 12.1-12.31 SK2互动抽奖，至高赢经典神仙水 ]

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#12.1-12.31 SK2互动抽奖，至高赢经典神仙水
1 1 1 1 * jd_sk2.js, tag=12.1-12.31 SK2互动抽奖，至高赢经典神仙水, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.1-12.31 SK2互动抽奖，至高赢经典神仙水');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjcloud.com';
let opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:'10':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'10';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x208030=>{
		cookiesArr.push(jdCookieNode[_0x208030]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x48b254=>_0x48b254.cookie)]['filter'](_0x439bea=>!!_0x439bea);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let activityUrl='https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/2212100000982112/';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='2212100000982112';
	authorCodeList=[]//await getAuthorCodeList('http://code.kingran.ga/sk2.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000009821/99/2212100000982112/?helpUuid='+$.shareUuid);
	for(let _0x4379d8=0;_0x4379d8<cookiesArr.length;_0x4379d8++){
		cookie=cookiesArr[_0x4379d8];
		originCookie=cookiesArr[_0x4379d8];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x4379d8+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x4379d8==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x1baf7e='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x1baf7e);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x1baf7e);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x437793=>$.logErr(_0x437793))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x265930=false;
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
		for(let _0x4bdaa1=0;_0x4bdaa1<$.taskslist['length'];_0x4bdaa1++){
			$.taskId=$.taskslist[_0x4bdaa1]['taskId'];
			if($.taskslist[_0x4bdaa1]['btnState']!=1){
				switch($.taskId){
					case '903775ae6fb911edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4bdaa1]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '903775bf6fb911edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4bdaa1]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '903775ce6fb911edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4bdaa1]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '903775f56fb911edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4bdaa1]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '903776006fb911edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4bdaa1]['taskName']);
						await takePostRequest('browse');
						for(let _0x4bdaa1=0;_0x4bdaa1<$.browselist['length'];_0x4bdaa1++){
							$.skuId=$.browselist[_0x4bdaa1]['skuId'];
							if($.browselist[_0x4bdaa1]['state']!=1){
								console.log('去浏览'+$.browselist[_0x4bdaa1]['skuId']);
								await takePostRequest('browse1');
								await $.wait(parseInt(Math.random()*1000+2000,10));
							}
						}
						break;
					case '903776146fb911edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4bdaa1]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '9037761e6fb911edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4bdaa1]['taskName']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case'9037760a6fb911edbfc4fa163e8623a7':
					case '903776286fb911edbfc4fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4bdaa1]['taskName']);
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
			let _0x3ed17f=parseInt($.leftTimes/1);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x3ed17f>opencard_draw)_0x3ed17f=opencard_draw;
			console.log('已设置抽奖次数为'+opencard_draw+'次，当前有'+$.leftTimes+'次抽奖机会');
			for(m=1;_0x3ed17f--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('draw');
				if($.runFalag==false)break;
				if(Number(_0x3ed17f)<=0)break;
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
	}catch(_0x1bb360){
		console.log(_0x1bb360);
	}
}
async function takePostRequest(_0x2ea65a){
	if($.outFlag)return;
	let _0xc8e502='https://lzkjdz-isv.isvjcloud.com';
	let _0x123432='';
	let _0x3b21cb='POST';
	let _0x2181d0='';
	switch(_0x2ea65a){
		case 'getMyPing':
			url=_0xc8e502+'/customer/getMyPing';
			_0x123432='token='+$.Token+'&fromType=APP&userId=1000009821&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0xc8e502+'/common/brand/getSimpleActInfoVo';
			_0x123432='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0xc8e502+'/common/accessLogWithAD';
			let _0x12f7ba='https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x123432='venderId=1000009821&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x12f7ba);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0xc8e502+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x123432='venderId=1000009821&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0xc8e502+'/wx/skii/lottery/draw/main';
			_0x123432='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&teamId='+$.shareUuid;
			break;
		case 'task':
			url=_0xc8e502+'/wx/skii/lottery/draw/task';
			_0x123432='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&mark=2';
			break;
		case 'browse':
			url=_0xc8e502+'/wx/skii/lottery/draw/browse';
			_0x123432='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&mark=1';
			break;
		case 'browse1':
			url=_0xc8e502+'/wx/skii/lottery/draw/browse';
			_0x123432='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&skuId='+$.skuId;
			break;
		case 'followShop':
			url=_0xc8e502+'/wxActionCommon/followShop';
			_0x123432='activityId='+$.activityId+'userId=1000009821&activityType=99&buyerNick='+encodeURIComponent($.Pin)+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'draw':
			url=_0xc8e502+'/wx/skii/lottery/draw/draw';
			_0x123432='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x2ea65a);
	}
	let _0x250cf6=getPostRequest(url,_0x123432,_0x3b21cb);
	return new Promise(async _0x52b883=>{
		$.post(_0x250cf6,(_0x56be57,_0x41cea7,_0x4c0f8d)=>{
			try{
				setActivityCookie(_0x41cea7);
				if(_0x56be57){
					if(_0x41cea7&&typeof _0x41cea7.statusCode!='undefined'){
						if(_0x41cea7.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x56be57,_0x56be57));
					console.log(_0x2ea65a+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x2ea65a,_0x4c0f8d);
				}
			}catch(_0x416d97){
				console.log(_0x416d97,_0x41cea7);
			}finally{
				_0x52b883();
			}
		});
	});
}
async function dealReturn(_0x22ae94,_0x46417c){
	let _0x1b4447='';
	try{
		if(_0x22ae94!='accessLogWithAD'||_0x22ae94!='drawContent'){
			if(_0x46417c){
				_0x1b4447=JSON.parse(_0x46417c);
			}
		}
	}catch(_0x150a10){
		console.log(_0x22ae94+' 执行任务异常');
		console.log(_0x46417c);
		$.runFalag=false;
	}
	try{
		switch(_0x22ae94){
			case 'getMyPing':
				if(typeof _0x1b4447=='object'){
					if(_0x1b4447.result&&_0x1b4447.result===true){
						if(_0x1b4447.data&&typeof _0x1b4447.data['secretPin']!='undefined')$.Pin=_0x1b4447.data['secretPin'];
						if(_0x1b4447.data&&typeof _0x1b4447.data['nickname']!='undefined')$.nickname=_0x1b4447.data['nickname'];
					}else if(_0x1b4447.errorMessage){
						console.log(_0x22ae94+' '+(_0x1b4447.errorMessage||''));
					}else{
						console.log(_0x22ae94+' '+_0x46417c);
					}
				}else{
					console.log(_0x22ae94+' '+_0x46417c);
				}
				break;
			case 'task':
				if(typeof _0x1b4447=='object'){
					if(_0x1b4447.success&&_0x1b4447.success===true){
						console.log(''+(_0x1b4447.success||''));
					}else if(_0x1b4447.errorMessage){
						console.log(''+(_0x1b4447.errorMessage||''));
					}else{
						console.log(''+_0x46417c);
					}
				}else{
					console.log(''+_0x46417c);
				}
				break;
			case 'browse':
				if(typeof _0x1b4447=='object'){
					if(_0x1b4447.success&&_0x1b4447.success===true){
						$.browselist=_0x1b4447.data||[];
					}else if(_0x1b4447.errorMessage){
						console.log(''+(_0x1b4447.errorMessage||''));
					}else{
						console.log(''+_0x46417c);
					}
				}else{
					console.log(''+_0x46417c);
				}
				break;
			case 'browse1':
				if(typeof _0x1b4447=='object'){
					if(_0x1b4447.success&&_0x1b4447.success===true){
						console.log(''+(_0x1b4447.success||''));
					}else if(_0x1b4447.errorMessage){
						console.log(''+(_0x1b4447.errorMessage||''));
					}else{
						console.log(''+_0x46417c);
					}
				}else{
					console.log(''+_0x46417c);
				}
				break;
			case 'draw':
				if(typeof _0x1b4447=='object'){
					if(_0x1b4447.success&&_0x1b4447.success===true&&_0x1b4447.data['drawOk']){
						console.log('抽中：'+_0x1b4447.data['name']);
					}else if(_0x1b4447.errorMessage){
						console.log(''+(_0x1b4447.errorMessage||''));
					}else{
						console.log('💨  空气');
					}
				}else{
					console.log(''+_0x46417c);
				}
				break;
			case 'followShop':
				if(typeof _0x1b4447=='object'){
					if(_0x1b4447.result&&_0x1b4447.result===true){
						console.log(''+_0x1b4447.data);
					}else if(_0x1b4447.errorMessage){
						console.log(''+(_0x1b4447.errorMessage||''));
					}else{
						console.log(' '+_0x46417c);
					}
				}else{
					console.log(''+_0x46417c);
				}
				break;
			case 'activityContent':
				if(typeof _0x1b4447=='object'){
					if(_0x1b4447.success&&_0x1b4447.success===true){
						$.actorUuid=_0x1b4447.data['uuid']||'';
						$.turntableId=_0x1b4447.data['turntableId']||'';
						$.leftTimes=_0x1b4447.data['leftTimes']||0;
						$.state=_0x1b4447.data['state']||'';
						$.taskslist=_0x1b4447.data['tasks']||[];
					}else if(_0x1b4447.errorMessage){
						if(_0x1b4447.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x22ae94+' '+(_0x1b4447.errorMessage||''));
					}else{
						console.log(_0x22ae94+' '+_0x46417c);
					}
				}else{
					console.log(_0x22ae94+' '+_0x46417c);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x1b4447=='object'){
					if(_0x1b4447.isOk){
						$.openStatus=_0x1b4447.openCard||false;
					}else if(_0x1b4447.errorMessage||_0x1b4447.msg){
						console.log(_0x22ae94+' '+(_0x1b4447.errorMessage||_0x1b4447.msg||''));
					}else{
						console.log(_0x22ae94+' '+_0x46417c);
					}
				}else{
					console.log(_0x22ae94+' '+_0x46417c);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x22ae94+'-> '+_0x46417c);
		}
		if(typeof _0x1b4447=='object'){
			if(_0x1b4447.errorMessage){
				if(_0x1b4447.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0xe9dd5a){
		console.log(_0xe9dd5a);
	}
}
function getPostRequest(_0x2e1abb,_0xeb253b,_0xaf1b32='POST'){
	let _0x2ee4d1={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x2e1abb.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x2ee4d1.Referer=activityUrl;
		_0x2ee4d1.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x2e1abb,'method':_0xaf1b32,'headers':_0x2ee4d1,'body':_0xeb253b,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x577376=>{
		let _0x5ec03e={'url':'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2212100000982112','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x5ec03e,async(_0x2cadfb,_0x3102e4,_0x42119f)=>{
			try{
				if(_0x2cadfb){
					if(_0x3102e4&&typeof _0x3102e4.statusCode!='undefined'){
						if(_0x3102e4.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x2cadfb));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x19c730=$.toObj(_0x42119f,_0x42119f);
					if(typeof _0x19c730=='object'){
						if(_0x19c730.result&&_0x19c730.result===true){
							$.endTime=_0x19c730.data['endTime']||0;
							$.startTimes=_0x19c730.data['startTime']||Date.now();
						}else if(_0x19c730.errorMessage){
							console.log(''+(_0x19c730.errorMessage||''));
						}else{
							console.log(''+_0x42119f);
						}
					}else{
						console.log(''+_0x42119f);
					}
				}
			}catch(_0x4bdb41){
				$.logErr(_0x4bdb41,_0x3102e4);
			}finally{
				_0x577376();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x2c0c18=>{
		let _0x48dfa2={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x48dfa2,async(_0x37b2d5,_0x5734e3,_0x563ad9)=>{
			try{
				if(_0x37b2d5){
					if(_0x5734e3&&typeof _0x5734e3.statusCode!='undefined'){
						if(_0x5734e3.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x37b2d5));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x24873e=_0x563ad9.match(/(活动已经结束)/)&&_0x563ad9.match(/(活动已经结束)/)[1]||'';
					if(_0x24873e){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x5734e3);
				}
			}catch(_0x1bdf13){
				$.logErr(_0x1bdf13,_0x5734e3);
			}finally{
				_0x2c0c18();
			}
		});
	});
}
function setActivityCookie(_0x1eed97){
	if(_0x1eed97){
		if(_0x1eed97.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0xf19c57 of _0x1eed97.headers['set-cookie']){
				lz_cookie[_0xf19c57.split(';')[0]['substr'](0,_0xf19c57.split(';')[0]['indexOf']('='))]=_0xf19c57.split(';')[0]['substr'](_0xf19c57.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x268871 of Object.keys(lz_cookie)){
				cookie+=_0x268871+'='+lz_cookie[_0x268871]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x2b25af){
	_0x2b25af=_0x2b25af||32;
	let _0xcb978c='abcdef0123456789',_0x595e83=_0xcb978c.length,_0x577006='';
	for(i=0;i<_0x2b25af;i++)_0x577006+=_0xcb978c.charAt(Math.floor(Math.random()*_0x595e83));
	return _0x577006;
}
async function joinShop(){
	return new Promise(async _0xbceaed=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x2989c0='';
		if($.shopactivityId)_0x2989c0=',"activityId":'+$.shopactivityId;
		const _0x27a3cd='{"venderId":"1000009821","shopId":"1000009821","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x2989c0+',"channel":406}';
		const _0x27de74={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x27a3cd)};
		const _0xd669e2=await getH5st('8adfb',_0x27de74);
		const _0x14e838={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x27a3cd+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0xd669e2),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x14e838,async(_0x1a3c56,_0x22a876,_0x31756c)=>{
			try{
				_0x31756c=_0x31756c&&_0x31756c.match(/jsonp_.*?\((.*?)\);/)&&_0x31756c.match(/jsonp_.*?\((.*?)\);/)[1]||_0x31756c;
				let _0x45f782=$.toObj(_0x31756c,_0x31756c);
				if(_0x45f782&&typeof _0x45f782=='object'){
					if(_0x45f782&&_0x45f782.success===true){
						console.log(_0x45f782.message);
						$.errorJoinShop=_0x45f782.message;
						if(_0x45f782.result&&_0x45f782.result['giftInfo']){
							for(let _0x323dff of _0x45f782.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x323dff.discountString+_0x323dff.prizeName+_0x323dff.secondLineDesc);
							}
						}
					}else if(_0x45f782&&typeof _0x45f782=='object'&&_0x45f782.message){
						$.errorJoinShop=_0x45f782.message;
						console.log(''+(_0x45f782.message||''));
					}else{
						console.log(_0x31756c);
					}
				}else{
					console.log(_0x31756c);
				}
			}catch(_0x5a09e8){
				$.logErr(_0x5a09e8,_0x22a876);
			}finally{
				_0xbceaed();
			}
		});
	});
}
function getH5st(_0x300c42,_0x1547bb){
	return new Promise(async _0xb9d99f=>{
		let _0x4e6c7a={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x300c42+'&req='+encodeURIComponent(JSON.stringify(_0x1547bb)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x4e6c7a,(_0x2445f0,_0x88c24e,_0x2b36c2)=>{
			try{
				if(_0x2445f0){
					console.log(JSON.stringify(_0x2445f0));
					console.log($.name+' getH5st API请求失败，请检查网路重试');
				}else{}
			}catch(_0x5186cb){
				$.logErr(_0x5186cb,_0x88c24e);
			}finally{
				_0xb9d99f(_0x2b36c2);
			}
		});
	});
}
function getAuthorCodeList(_0x43baa2){
	return new Promise(_0x182764=>{
		const _0x575517={'url':_0x43baa2+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x575517,async(_0x252d52,_0x5ce73b,_0x14ebe1)=>{
			try{
				if(_0x252d52){
					$.log(_0x252d52);
				}else{
					if(_0x14ebe1)_0x14ebe1=JSON.parse(_0x14ebe1);
				}
			}catch(_0x101e5a){
				$.logErr(_0x101e5a,_0x5ce73b);
				_0x14ebe1=null;
			}finally{
				_0x182764(_0x14ebe1);
			}
		});
	});
}
function jsonParse(_0xb52cf1){
	if(typeof _0xb52cf1=='string'){
		try{
			return JSON.parse(_0xb52cf1);
		}catch(_0x38a784){
			console.log(_0x38a784);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};