/*
11.1-11.31 SK2互动抽奖，至高赢经典神仙水

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 11.1-11.31 SK2互动抽奖，至高赢经典神仙水 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 **
============Quantumultx===============
[task_local]
#11.1-11.31 SK2互动抽奖，至高赢经典神仙水
11 11 11 11 ** jd_sk2.js, tag=11.1-11.31 SK2互动抽奖，至高赢经典神仙水, enabled=true

*/
const $=new Env('11.1-11.31 SK2互动抽奖，至高赢经典神仙水');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjcloud.com';
let opencard_draw=$.isNode()?process.env.opencard_draw?process.env.opencard_draw:'0':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'0';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x210545=>{
		cookiesArr.push(jdCookieNode[_0x210545]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0xe36278=>_0xe36278.cookie)].filter(_0x3d75b0=>!!_0x3d75b0);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let activityUrl='https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/2210100000982102/';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='2210100000982102';
	authorCodeList=[];//await getAuthorCodeList('http://code.kingran.ga/sk2.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000009821/99/2210100000982102/?helpUuid='+$.shareUuid);
	for(let _0x5d7e6e=0;_0x5d7e6e<cookiesArr.length;_0x5d7e6e++){
		cookie=cookiesArr[_0x5d7e6e];
		originCookie=cookiesArr[_0x5d7e6e];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x5d7e6e+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x5d7e6e==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0xdbd87b='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0xdbd87b);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0xdbd87b);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0x35230d=>$.logErr(_0x35230d)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0xabe355=false;
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
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
				console.log('第1次 重新开卡');
				await $.wait(parseInt(Math.random()*2000+3000,10));
				await joinShop();
			}
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
				console.log('第2次 重新开卡');
				await $.wait(parseInt(Math.random()*2000+4000,10));
				await joinShop();
			}
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
				console.log('第3次 重新开卡');
				await $.wait(parseInt(Math.random()*2000+4000,10));
				await joinShop();
			}
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
				console.log('开卡失败❌ ，重新执行脚本');
			}else{
				$.assistStatus=true;
			}
			await takePostRequest('getOpenCardStatusWithOutSelf');
			await takePostRequest('activityContent');
		}
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		for(let _0x4ed7b1=0;_0x4ed7b1<$.taskslist.length;_0x4ed7b1++){
			$.taskId=$.taskslist[_0x4ed7b1].taskId;
			if($.taskslist[_0x4ed7b1].btnState!=1){
				switch($.taskId){
					case '82fb197747b611eda842fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4ed7b1].taskName);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '82fb199b47b611eda842fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4ed7b1].taskName);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '82fb19b147b611eda842fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4ed7b1].taskName);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '82fb19c447b611eda842fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4ed7b1].taskName);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '8a2b902d47b611eda842fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4ed7b1].taskName);
						await takePostRequest('browse');
						for(let _0x4ed7b1=0;_0x4ed7b1<$.browselist.length;_0x4ed7b1++){
							$.skuId=$.browselist[_0x4ed7b1].skuId;
							if($.browselist[_0x4ed7b1].state!=1){
								console.log('去浏览'+$.browselist[_0x4ed7b1].skuId);
								await takePostRequest('browse1');
								await $.wait(parseInt(Math.random()*1000+2000,10));
							}
						}
						break;
					case '8a2b90b047b611eda842fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4ed7b1].taskName);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '8a2b90c547b611eda842fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4ed7b1].taskName);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case '8a2b90dc47b611eda842fa163e8623a7':
					case '8a2b908d47b611eda842fa163e8623a7':
						console.log('去完成'+$.taskslist[_0x4ed7b1].taskName);
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
			let _0x5d287f=parseInt($.leftTimes/1);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x5d287f>opencard_draw)_0x5d287f=opencard_draw;
			console.log('已设置抽奖次数为'+opencard_draw+'次，当前有'+$.leftTimes+'次抽奖机会');
			for(m=1;_0x5d287f--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('draw');
				if($.runFalag==false)break;
				if(Number(_0x5d287f)<=0)break;
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
	}catch(_0x57945a){
		console.log(_0x57945a);
	}
}
async function takePostRequest(_0x476007){
	if($.outFlag)return;
	let _0x1a280b='https://lzkjdz-isv.isvjcloud.com';
	let _0x75739c='';
	let _0x599138='POST';
	let _0x5806c9='';
	switch(_0x476007){
		case 'getMyPing':
			url=_0x1a280b+'/customer/getMyPing';
			_0x75739c='token='+$.Token+'&fromType=APP&userId=1000009821&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x1a280b+'/common/brand/getSimpleActInfoVo';
			_0x75739c='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x1a280b+'/common/accessLogWithAD';
			let _0xa24283='https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x75739c='venderId=1000009821&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0xa24283);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x1a280b+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x75739c='venderId=1000009821&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x1a280b+'/wx/skii/lottery/draw/main';
			_0x75739c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&teamId='+$.shareUuid;
			break;
		case 'task':
			url=_0x1a280b+'/wx/skii/lottery/draw/task';
			_0x75739c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&mark=2';
			break;
		case'browse':
			url=_0x1a280b+'/wx/skii/lottery/draw/browse';
			_0x75739c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&mark=1';
			break;
		case 'browse1':
			url=_0x1a280b+'/wx/skii/lottery/draw/browse';
			_0x75739c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&skuId='+$.skuId;
			break;
		case 'followShop':
			url=_0x1a280b+'/wxActionCommon/followShop';
			_0x75739c='activityId='+$.activityId+'userId=1000009821&activityType=99&buyerNick='+encodeURIComponent($.Pin)+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'draw':
			url=_0x1a280b+'/wx/skii/lottery/draw/draw';
			_0x75739c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x476007);
	}
	let _0x4f3413=getPostRequest(url,_0x75739c,_0x599138);
	return new Promise(async _0x572506=>{
		$.post(_0x4f3413,(_0x281ae4,_0x79a970,_0x489445)=>{
			try{
				setActivityCookie(_0x79a970);
				if(_0x281ae4){
					if(_0x79a970&&typeof _0x79a970.statusCode!='undefined'){
						if(_0x79a970.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x281ae4,_0x281ae4));
					console.log(_0x476007+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x476007,_0x489445);
				}
			}catch(_0x63d48f){
				console.log(_0x63d48f,_0x79a970);
			}finally{
				_0x572506();
			}
		});
	});
}
async function dealReturn(_0x3ae9f1,_0x37fc19){
	let _0x1e9935='';
	try{
		if(_0x3ae9f1!='accessLogWithAD'||_0x3ae9f1!='drawContent'){
			if(_0x37fc19){
				_0x1e9935=JSON.parse(_0x37fc19);
			}
		}
	}catch(_0x4c2bab){
		console.log(_0x3ae9f1+' 执行任务异常');
		console.log(_0x37fc19);
		$.runFalag=false;
	}
	try{
		switch(_0x3ae9f1){
			case 'getMyPing':
				if(typeof _0x1e9935=='object'){
					if(_0x1e9935.result&&_0x1e9935.result===true){
						if(_0x1e9935.data&&typeof _0x1e9935.data.secretPin!='undefined')$.Pin=_0x1e9935.data.secretPin;
						if(_0x1e9935.data&&typeof _0x1e9935.data.nickname!='undefined')$.nickname=_0x1e9935.data.nickname;
					}else if(_0x1e9935.errorMessage){
						console.log(_0x3ae9f1+' '+(_0x1e9935.errorMessage||''));
					}else{
						console.log(_0x3ae9f1+' '+_0x37fc19);
					}
				}else{
					console.log(_0x3ae9f1+' '+_0x37fc19);
				}
				break;
			case 'task':
				if(typeof _0x1e9935=='object'){
					if(_0x1e9935.success&&_0x1e9935.success===true){
						console.log(''+(_0x1e9935.success||''));
					}else if(_0x1e9935.errorMessage){
						console.log(''+(_0x1e9935.errorMessage||''));
					}else{
						console.log(''+_0x37fc19);
					}
				}else{
					console.log(''+_0x37fc19);
				}
				break;
			case 'browse':
				if(typeof _0x1e9935=='object'){
					if(_0x1e9935.success&&_0x1e9935.success===true){
						$.browselist=_0x1e9935.data||[];
					}else if(_0x1e9935.errorMessage){
						console.log(''+(_0x1e9935.errorMessage||''));
					}else{
						console.log(''+_0x37fc19);
					}
				}else{
					console.log(''+_0x37fc19);
				}
				break;
			case 'browse1':
				if(typeof _0x1e9935=='object'){
					if(_0x1e9935.success&&_0x1e9935.success===true){
						console.log(''+(_0x1e9935.success||''));
					}else if(_0x1e9935.errorMessage){
						console.log(''+(_0x1e9935.errorMessage||''));
					}else{
						console.log(''+_0x37fc19);
					}
				}else{
					console.log(''+_0x37fc19);
				}
				break;
			case 'draw':
				if(typeof _0x1e9935=='object'){
					if(_0x1e9935.success&&_0x1e9935.success===true&&_0x1e9935.data.drawOk){
						console.log('抽中：'+_0x1e9935.data.name);
					}else if(_0x1e9935.errorMessage){
						console.log(''+(_0x1e9935.errorMessage||''));
					}else{
						console.log('💨  空气');
					}
				}else{
					console.log(''+_0x37fc19);
				}
				break;
			case 'followShop':
				if(typeof _0x1e9935=='object'){
					if(_0x1e9935.result&&_0x1e9935.result===true){
						console.log(''+_0x1e9935.data);
					}else if(_0x1e9935.errorMessage){
						console.log(''+(_0x1e9935.errorMessage||''));
					}else{
						console.log(' '+_0x37fc19);
					}
				}else{
					console.log(''+_0x37fc19);
				}
				break;
			case 'activityContent':
				if(typeof _0x1e9935=='object'){
					if(_0x1e9935.success&&_0x1e9935.success===true){
						$.actorUuid=_0x1e9935.data.uuid||'';
						$.turntableId=_0x1e9935.data.turntableId||'';
						$.leftTimes=_0x1e9935.data.leftTimes||0;
						$.state=_0x1e9935.data.state||'';
						$.taskslist=_0x1e9935.data.tasks||[];
					}else if(_0x1e9935.errorMessage){
						if(_0x1e9935.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
						console.log(_0x3ae9f1+' '+(_0x1e9935.errorMessage||''));
					}else{
						console.log(_0x3ae9f1+' '+_0x37fc19);
					}
				}else{
					console.log(_0x3ae9f1+' '+_0x37fc19);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x1e9935=='object'){
					if(_0x1e9935.isOk){
						$.openStatus=_0x1e9935.openCard||false;
					}else if(_0x1e9935.errorMessage||_0x1e9935.msg){
						console.log(_0x3ae9f1+' '+(_0x1e9935.errorMessage||_0x1e9935.msg||''));
					}else{
						console.log(_0x3ae9f1+' '+_0x37fc19);
					}
				}else{
					console.log(_0x3ae9f1+' '+_0x37fc19);
				}
				break;
			case'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x3ae9f1+'-> '+_0x37fc19);
		}
		if(typeof _0x1e9935=='object'){
			if(_0x1e9935.errorMessage){
				if(_0x1e9935.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x1809a7){
		console.log(_0x1809a7);
	}
}
function getPostRequest(_0x39bc63,_0x49b1e9,_0x26c2f9='POST'){
	let _0x3a7b7f={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x39bc63.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x3a7b7f.Referer=activityUrl;
		_0x3a7b7f.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x39bc63,'method':_0x26c2f9,'headers':_0x3a7b7f,'body':_0x49b1e9,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x5acd64=>{
		let _0x5b2d38={'url':'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2210100000982102','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x5b2d38,async(_0x3300ff,_0x1a5b41,_0x5c0bf6)=>{
			try{
				if(_0x3300ff){
					if(_0x1a5b41&&typeof _0x1a5b41.statusCode!='undefined'){
						if(_0x1a5b41.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3300ff));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x1dd9a8=$.toObj(_0x5c0bf6,_0x5c0bf6);
					if(typeof _0x1dd9a8=='object'){
						if(_0x1dd9a8.result&&_0x1dd9a8.result===true){
							$.endTime=_0x1dd9a8.data.endTime||0;
							$.startTimes=_0x1dd9a8.data.startTime||Date.now();
						}else if(_0x1dd9a8.errorMessage){
							console.log(''+(_0x1dd9a8.errorMessage||''));
						}else{
							console.log(''+_0x5c0bf6);
						}
					}else{
						console.log(''+_0x5c0bf6);
					}
				}
			}catch(_0x1265e1){
				$.logErr(_0x1265e1,_0x1a5b41);
			}finally{
				_0x5acd64();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x23c370=>{
		let _0x3f87c3={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x3f87c3,async(_0x1d1eeb,_0x364006,_0x1fbaee)=>{
			try{
				if(_0x1d1eeb){
					if(_0x364006&&typeof _0x364006.statusCode!='undefined'){
						if(_0x364006.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x1d1eeb));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x3808eb=_0x1fbaee.match(/(活动已经结束)/)&&_0x1fbaee.match(/(活动已经结束)/)[1]||'';
					if(_0x3808eb){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x364006);
				}
			}catch(_0x1f2983){
				$.logErr(_0x1f2983,_0x364006);
			}finally{
				_0x23c370();
			}
		});
	});
}
function setActivityCookie(_0x433cdf){
	if(_0x433cdf){
		if(_0x433cdf.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x4a234c of _0x433cdf.headers['set-cookie']){
				lz_cookie[_0x4a234c.split(';')[0].substr(0,_0x4a234c.split(';')[0].indexOf('='))]=_0x4a234c.split(';')[0].substr(_0x4a234c.split(';')[0].indexOf('=')+1);
			}
			for(const _0xf7e199 of Object.keys(lz_cookie)){
				cookie+=_0xf7e199+'='+lz_cookie[_0xf7e199]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x49931b){
	_0x49931b=_0x49931b||32;
	let _0x51227f='abcdef0123456789',_0x5d13c5=_0x51227f.length,_0x1411bc='';
	for(i=0;i<_0x49931b;i++)_0x1411bc+=_0x51227f.charAt(Math.floor(Math.random()*_0x5d13c5));
	return _0x1411bc;
}
async function joinShop(){
	return new Promise(async _0x396d74=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x46c077='';
		if($.shopactivityId)_0x46c077=',"activityId":'+$.shopactivityId;
		const _0x3cf583='{"venderId":"1000376745","shopId":"1000376745","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x46c077+',"channel":406}';
		const _0x550990={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x3cf583)};
		const _0x363e78=await getH5st('8adfb',_0x550990);
		const _0x4cc7c9={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x3cf583+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x363e78),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x4cc7c9,async(_0x506224,_0x67d84,_0x2d4e7e)=>{
			try{
				_0x2d4e7e=_0x2d4e7e&&_0x2d4e7e.match(/jsonp_.*?\((.*?)\);/)&&_0x2d4e7e.match(/jsonp_.*?\((.*?)\);/)[1]||_0x2d4e7e;
				let _0x5a47fd=$.toObj(_0x2d4e7e,_0x2d4e7e);
				if(_0x5a47fd&&typeof _0x5a47fd=='object'){
					if(_0x5a47fd&&_0x5a47fd.success===true){
						console.log(_0x5a47fd.message);
						$.errorJoinShop=_0x5a47fd.message;
						if(_0x5a47fd.result&&_0x5a47fd.result.giftInfo){
							for(let _0x5307fc of _0x5a47fd.result.giftInfo.giftList){
								console.log('入会获得:'+_0x5307fc.discountString+_0x5307fc.prizeName+_0x5307fc.secondLineDesc);
							}
						}
					}else if(_0x5a47fd&&typeof _0x5a47fd=='object'&&_0x5a47fd.message){
						$.errorJoinShop=_0x5a47fd.message;
						console.log(''+(_0x5a47fd.message||''));
					}else{
						console.log(_0x2d4e7e);
					}
				}else{
					console.log(_0x2d4e7e);
				}
			}catch(_0x3eff78){
				$.logErr(_0x3eff78,_0x67d84);
			}finally{
				_0x396d74();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x1b95ef=>{
		let _0x3ee11e='{"venderId":"1000376745","channel":406,"payUpShop":true}';
		const _0xff29ac={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x3ee11e)};
		const _0x252e51=await getH5st('ef79a',_0xff29ac);
		const _0x627b61={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x3ee11e+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x252e51),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x627b61,async(_0x5a1e2f,_0x182032,_0x3b14b9)=>{
			try{
				_0x3b14b9=_0x3b14b9&&_0x3b14b9.match(/jsonp_.*?\((.*?)\);/)&&_0x3b14b9.match(/jsonp_.*?\((.*?)\);/)[1]||_0x3b14b9;
				let _0x3ec15d=$.toObj(_0x3b14b9,_0x3b14b9);
				if(_0x3ec15d&&typeof _0x3ec15d=='object'){
					if(_0x3ec15d&&_0x3ec15d.success==true){
						console.log('入会:'+(_0x3ec15d.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x3ec15d.result.interestsRuleList&&_0x3ec15d.result.interestsRuleList[0]&&_0x3ec15d.result.interestsRuleList[0].interestsInfo&&_0x3ec15d.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x3b14b9);
				}
			}catch(_0x17ada6){
				$.logErr(_0x17ada6,_0x182032);
			}finally{
				_0x1b95ef();
			}
		});
	});
}
function getH5st(_0x1ef28b,_0x10107d){
	return new Promise(async _0x1a6181=>{
		let _0x4352de={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x1ef28b+'&req='+encodeURIComponent(JSON.stringify(_0x10107d)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x4352de,(_0x499c53,_0x389dad,_0x1380ee)=>{
			try{
				if(_0x499c53){
					console.log(JSON.stringify(_0x499c53));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x288570){
				$.logErr(_0x288570,_0x389dad);
			}finally{
				_0x1a6181(_0x1380ee);
			}
		});
	});
}
function getAuthorCodeList(_0x5286fd){
	return new Promise(_0x29e7e3=>{
		const _0x17a165={'url':_0x5286fd+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x17a165,async(_0xe8d47e,_0x598c59,_0x319b21)=>{
			try{
				if(_0xe8d47e){
					$.log(_0xe8d47e);
				}else{
					if(_0x319b21)_0x319b21=JSON.parse(_0x319b21);
				}
			}catch(_0xb8f3cc){
				$.logErr(_0xb8f3cc,_0x598c59);
				_0x319b21=null;
			}finally{
				_0x29e7e3(_0x319b21);
			}
		});
	});
}
function jsonParse(_0x2a6658){
	if(typeof _0x2a6658=='string'){
		try{
			return JSON.parse(_0x2a6658);
		}catch(_0x4b502d){
			console.log(_0x4b502d);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};