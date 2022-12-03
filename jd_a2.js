/*
12.1-12.31 a2集成长值赢千元礼包

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 12.1-12.31 a2集成长值赢千元礼包 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#12.1-12.31 a2集成长值赢千元礼包
11 11 11 11 * jd_a2.js, tag=12.1-12.31 a2集成长值赢千元礼包, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.1-12.31 a2集成长值赢千元礼包');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjcloud.com';
let opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:'10':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'10';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x5df98f=>{
		cookiesArr.push(jdCookieNode[_0x5df98f]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x45e27e=>_0x45e27e.cookie)]['filter'](_0x197074=>!!_0x197074);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let activityUrl='https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/2212100000664401/';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='2212100000664401';
	authorCodeList=["2b2ac5eb74ab48e2ad489e459eafd4fb"]//await getAuthorCodeList('http://code.kingran.ga/a2.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000006644/99/2212100000664401/?helpUuid='+$.shareUuid);
	for(let _0x29db16=0;_0x29db16<cookiesArr.length;_0x29db16++){
		cookie=cookiesArr[_0x29db16];
		originCookie=cookiesArr[_0x29db16];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x29db16+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x29db16==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x1fb8be='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x1fb8be);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x1fb8be);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x1abe6d=>$.logErr(_0x1abe6d))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x373d7b=false;
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
			$.joinVenderId=1000006644;
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
		for(let _0x4d3e6c=0;_0x4d3e6c<$.taskslist['length'];_0x4d3e6c++){
			$.taskId=$.taskslist[_0x4d3e6c]['taskId'];
			$.taskType=$.taskslist[_0x4d3e6c]['taskType'];
			if($.taskslist[_0x4d3e6c]['taskFinishCnt']===0){
				switch($.taskType){
					case 1:
						console.log('去完成'+$.taskslist[_0x4d3e6c]['taskType']+''+$.taskslist[_0x4d3e6c]['taskId']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 2:
						console.log('去完成'+$.taskslist[_0x4d3e6c]['taskType']+''+$.taskslist[_0x4d3e6c]['taskId']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 4:
						console.log('去完成'+$.taskslist[_0x4d3e6c]['taskType']+''+$.taskslist[_0x4d3e6c]['taskId']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 5:
						console.log('去完成'+$.taskslist[_0x4d3e6c]['taskType']+''+$.taskslist[_0x4d3e6c]['taskId']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 6:
					case 3:
						break;
					default:
						console.log('错误'+$.taskType);
				}
			}
		}
		await takePostRequest('activityContent');
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x5d7f9a=parseInt($.score/500);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x5d7f9a>opencard_draw)_0x5d7f9a=opencard_draw;
			console.log('已设置抽奖次数为'+opencard_draw+'次，当前有'+_0x5d7f9a+'次抽奖机会');
			for(m=1;_0x5d7f9a--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('draw');
				if($.runFalag==false)break;
				if(Number(_0x5d7f9a)<=0)break;
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
	}catch(_0x384ec1){
		console.log(_0x384ec1);
	}
}
async function takePostRequest(_0x3df81c){
	if($.outFlag)return;
	let _0x1d4014='https://lzkjdz-isv.isvjcloud.com';
	let _0x391b98='';
	let _0x4f0f08='POST';
	let _0x46633b='';
	switch(_0x3df81c){
		case 'getMyPing':
			url=_0x1d4014+'/customer/getMyPing';
			_0x391b98='token='+$.Token+'&fromType=APP&userId=1000006644&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x1d4014+'/common/brand/getSimpleActInfoVo';
			_0x391b98='activityId='+$.activityId;
			break;
		case'accessLogWithAD':
			url=_0x1d4014+'/common/accessLogWithAD';
			let _0x2d47d4='https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x391b98='venderId=1000006644&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x2d47d4);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x1d4014+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x391b98='venderId=1000006644&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x1d4014+'/a2/task/activityContent';
			_0x391b98='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&inviterUuid='+$.shareUuid;
			break;
		case 'task':
			url=_0x1d4014+'/a2/task/startTask';
			_0x391b98='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId;
			break;
		case 'draw':
			url=_0x1d4014+'/a2/task/startDraw';
			_0x391b98='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x3df81c);
	}
	let _0x4966e1=getPostRequest(url,_0x391b98,_0x4f0f08);
	return new Promise(async _0xe840fe=>{
		$.post(_0x4966e1,(_0x39c538,_0x539c09,_0x160c27)=>{
			try{
				setActivityCookie(_0x539c09);
				if(_0x39c538){
					if(_0x539c09&&typeof _0x539c09.statusCode!='undefined'){
						if(_0x539c09.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x39c538,_0x39c538));
					console.log(_0x3df81c+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x3df81c,_0x160c27);
				}
			}catch(_0x585fca){
				console.log(_0x585fca,_0x539c09);
			}finally{
				_0xe840fe();
			}
		});
	});
}
async function dealReturn(_0x4f7354,_0x403891){
	let _0x524630='';
	try{
		if(_0x4f7354!='accessLogWithAD'||_0x4f7354!='drawContent'){
			if(_0x403891){
				_0x524630=JSON.parse(_0x403891);
			}
		}
	}catch(_0x132c58){
		console.log(_0x4f7354+' 执行任务异常');
		console.log(_0x403891);
		$.runFalag=false;
	}
	try{
		switch(_0x4f7354){
			case 'getMyPing':
				if(typeof _0x524630=='object'){
					if(_0x524630.result&&_0x524630.result===true){
						if(_0x524630.data&&typeof _0x524630.data['secretPin']!='undefined')$.Pin=_0x524630.data['secretPin'];
						if(_0x524630.data&&typeof _0x524630.data['nickname']!='undefined')$.nickname=_0x524630.data['nickname'];
					}else if(_0x524630.errorMessage){
						console.log(_0x4f7354+' '+(_0x524630.errorMessage||''));
					}else{
						console.log(_0x4f7354+' '+_0x403891);
					}
				}else{
					console.log(_0x4f7354+' '+_0x403891);
				}
				break;
			case 'task':
				if(typeof _0x524630=='object'){
					if(_0x524630.result&&_0x524630.result===true){
						console.log('任务完成，总积分：'+_0x524630.data);
					}else if(_0x524630.errorMessage){
						console.log(''+(_0x524630.errorMessage||''));
					}else{
						console.log(''+_0x403891);
					}
				}else{
					console.log(''+_0x403891);
				}
				break;
			case 'draw':
				if(typeof _0x524630=='object'){
					if(_0x524630.result&&_0x524630.result===true&&_0x524630.data['drawOk']){
						console.log('抽中：'+_0x524630.data['name']);
					}else if(_0x524630.errorMessage){
						console.log(''+(_0x524630.errorMessage||''));
					}else{
						console.log('💨  空气');
					}
				}else{
					console.log(''+_0x403891);
				}
				break;
			case 'activityContent':
				if(typeof _0x524630=='object'){
					if(_0x524630.result&&_0x524630.result===true){
						$.actorUuid=_0x524630.data['customerId']||'';
						$.turntableId=_0x524630.data['turntableId']||'';
						$.score=_0x524630.data['score']||0;
						$.helpStatus=_0x524630.data['helpStatus']||0;
						$.openStatus=_0x524630.data['openStatus']||0;
						$.assistCount=_0x524630.data['assistCount']||0;
						$.state=_0x524630.data['state']||'';
						$.taskslist=_0x524630.data['giftVOS']||[];
					}else if(_0x524630.errorMessage){
						if(_0x524630.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x4f7354+' '+(_0x524630.errorMessage||''));
					}else{
						console.log(_0x4f7354+' '+_0x403891);
					}
				}else{
					console.log(_0x4f7354+' '+_0x403891);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x524630=='object'){
					if(_0x524630.isOk){
						$.openStatus=_0x524630.openCard||false;
					}else if(_0x524630.errorMessage||_0x524630.msg){
						console.log(_0x4f7354+' '+(_0x524630.errorMessage||_0x524630.msg||''));
					}else{
						console.log(_0x4f7354+' '+_0x403891);
					}
				}else{
					console.log(_0x4f7354+' '+_0x403891);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x4f7354+'-> '+_0x403891);
		}
		if(typeof _0x524630=='object'){
			if(_0x524630.errorMessage){
				if(_0x524630.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x412da7){
		console.log(_0x412da7);
	}
}
function getPostRequest(_0x5ac87d,_0x462715,_0x252f48='POST'){
	let _0x181f42={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x5ac87d.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x181f42.Referer=activityUrl;
		_0x181f42.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x5ac87d,'method':_0x252f48,'headers':_0x181f42,'body':_0x462715,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x3c34cf=>{
		let _0x151360={'url':'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2212100000664401','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x151360,async(_0x22b31a,_0x4451f3,_0x4639e9)=>{
			try{
				if(_0x22b31a){
					if(_0x4451f3&&typeof _0x4451f3.statusCode!='undefined'){
						if(_0x4451f3.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x22b31a));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0xf2b36=$.toObj(_0x4639e9,_0x4639e9);
					if(typeof _0xf2b36=='object'){
						if(_0xf2b36.result&&_0xf2b36.result===true){
							$.endTime=_0xf2b36.data['endTime']||0;
							$.startTimes=_0xf2b36.data['startTime']||Date.now();
						}else if(_0xf2b36.errorMessage){
							console.log(''+(_0xf2b36.errorMessage||''));
						}else{
							console.log(''+_0x4639e9);
						}
					}else{
						console.log(''+_0x4639e9);
					}
				}
			}catch(_0xd6cf33){
				$.logErr(_0xd6cf33,_0x4451f3);
			}finally{
				_0x3c34cf();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x153642=>{
		let _0x2ce175={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x2ce175,async(_0x4a4c59,_0x27b894,_0xd7a1e6)=>{
			try{
				if(_0x4a4c59){
					if(_0x27b894&&typeof _0x27b894.statusCode!='undefined'){
						if(_0x27b894.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x4a4c59));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x5eead8=_0xd7a1e6.match(/(活动已经结束)/)&&_0xd7a1e6.match(/(活动已经结束)/)[1]||'';
					if(_0x5eead8){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x27b894);
				}
			}catch(_0x323946){
				$.logErr(_0x323946,_0x27b894);
			}finally{
				_0x153642();
			}
		});
	});
}
function setActivityCookie(_0x31d711){
	if(_0x31d711){
		if(_0x31d711.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x36c2df of _0x31d711.headers['set-cookie']){
				lz_cookie[_0x36c2df.split(';')[0]['substr'](0,_0x36c2df.split(';')[0]['indexOf']('='))]=_0x36c2df.split(';')[0]['substr'](_0x36c2df.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x2cbd26 of Object.keys(lz_cookie)){
				cookie+=_0x2cbd26+'='+lz_cookie[_0x2cbd26]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x18bf37){
	_0x18bf37=_0x18bf37||32;
	let _0xd03a6e='abcdef0123456789',_0x1c182c=_0xd03a6e.length,_0x145f32='';
	for(i=0;i<_0x18bf37;i++)_0x145f32+=_0xd03a6e.charAt(Math.floor(Math.random()*_0x1c182c));
	return _0x145f32;
}
async function joinShop(){
	return new Promise(async _0x8e2352=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x53f33a='';
		if($.shopactivityId)_0x53f33a=',"activityId":'+$.shopactivityId;
		const _0x26b6a9='{"venderId":"1000006644","shopId":"1000006644","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x53f33a+',"channel":406}';
		const _0x20290e={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x26b6a9)};
		const _0x2146d1=await getH5st('8adfb',_0x20290e);
		const _0x3dd1cf={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x26b6a9+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x2146d1),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x3dd1cf,async(_0x3980d8,_0x267b12,_0x3f90f8)=>{
			try{
				_0x3f90f8=_0x3f90f8&&_0x3f90f8.match(/jsonp_.*?\((.*?)\);/)&&_0x3f90f8.match(/jsonp_.*?\((.*?)\);/)[1]||_0x3f90f8;
				let _0x36ade2=$.toObj(_0x3f90f8,_0x3f90f8);
				if(_0x36ade2&&typeof _0x36ade2=='object'){
					if(_0x36ade2&&_0x36ade2.success===true){
						console.log(_0x36ade2.message);
						$.errorJoinShop=_0x36ade2.message;
						if(_0x36ade2.result&&_0x36ade2.result['giftInfo']){
							for(let _0x5a80e0 of _0x36ade2.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x5a80e0.discountString+_0x5a80e0.prizeName+_0x5a80e0.secondLineDesc);
							}
						}
					}else if(_0x36ade2&&typeof _0x36ade2=='object'&&_0x36ade2.message){
						$.errorJoinShop=_0x36ade2.message;
						console.log(''+(_0x36ade2.message||''));
					}else{
						console.log(_0x3f90f8);
					}
				}else{
					console.log(_0x3f90f8);
				}
			}catch(_0x35740e){
				$.logErr(_0x35740e,_0x267b12);
			}finally{
				_0x8e2352();
			}
		});
	});
}
function getH5st(_0x146e5b,_0x3d482c){
	return new Promise(async _0x55835a=>{
		let _0x17f37c={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x146e5b+'&req='+encodeURIComponent(JSON.stringify(_0x3d482c)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x17f37c,(_0x2ffb03,_0x3c9304,_0x242bd6)=>{
			try{
				if(_0x2ffb03){
					console.log(JSON.stringify(_0x2ffb03));
					console.log($.name+' getH5st API请求失败，请检查网路重试');
				}else{}
			}catch(_0x314ebf){
				$.logErr(_0x314ebf,_0x3c9304);
			}finally{
				_0x55835a(_0x242bd6);
			}
		});
	});
}
function getAuthorCodeList(_0x21dd25){
	return new Promise(_0x4ec4f3=>{
		const _0x261cf8={'url':_0x21dd25+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x261cf8,async(_0xf6c9e,_0x3f0865,_0x49099e)=>{
			try{
				if(_0xf6c9e){
					$.log(_0xf6c9e);
				}else{
					if(_0x49099e)_0x49099e=JSON.parse(_0x49099e);
				}
			}catch(_0xf22725){
				$.logErr(_0xf22725,_0x3f0865);
				_0x49099e=null;
			}finally{
				_0x4ec4f3(_0x49099e);
			}
		});
	});
}
function jsonParse(_0x3767c8){
	if(typeof _0x3767c8=='string'){
		try{
			return JSON.parse(_0x3767c8);
		}catch(_0x3c71bb){
			console.log(_0x3c71bb);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};