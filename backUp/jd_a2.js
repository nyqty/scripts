/*
1.1-1.31 a2集成长值赢千元礼包

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 1.1-1.31 a2集成长值赢千元礼包 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#1.1-1.31 a2集成长值赢千元礼包
11 11 11 11 * jd_a2.js, tag=1.1-1.31 a2集成长值赢千元礼包, enabled=true

*/
const Env=require('./utils/Env.js');

const $=new Env('1.1-1.31 a2集成长值赢千元礼包');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjcloud.com';
let opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:'10':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'10';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x4ca8ac=>{
		cookiesArr.push(jdCookieNode[_0x4ca8ac]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x1cf9f=>_0x1cf9f.cookie)]['filter'](_0x3a86c7=>!!_0x3a86c7);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let activityUrl='https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/2301100000664401/';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='2301100000664401';
	authorCodeList=["a473a82ed44d4eb38a662f459dbbeaa3"]
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000006644/99/2301100000664401/?helpUuid='+$.shareUuid);
	for(let _0x2f2b39=0;_0x2f2b39<cookiesArr.length;_0x2f2b39++){
		cookie=cookiesArr[_0x2f2b39];
		originCookie=cookiesArr[_0x2f2b39];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x2f2b39+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x2f2b39==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x57ea91='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x57ea91);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x57ea91);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x1df637=>$.logErr(_0x1df637))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x1f8001=false;
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
		for(let _0x18accc=0;_0x18accc<$.taskslist['length'];_0x18accc++){
			$.taskId=$.taskslist[_0x18accc]['taskId'];
			$.taskType=$.taskslist[_0x18accc]['taskType'];
			if($.taskslist[_0x18accc]['taskFinishCnt']===0){
				switch($.taskType){
					case 1:
						console.log('去完成'+$.taskslist[_0x18accc]['taskType']+''+$.taskslist[_0x18accc]['taskId']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 2:
						console.log('去完成'+$.taskslist[_0x18accc]['taskType']+''+$.taskslist[_0x18accc]['taskId']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 4:
						console.log('去完成'+$.taskslist[_0x18accc]['taskType']+''+$.taskslist[_0x18accc]['taskId']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 5:
						console.log('去完成'+$.taskslist[_0x18accc]['taskType']+''+$.taskslist[_0x18accc]['taskId']);
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
			let _0x543a5d=parseInt($.score/500);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x543a5d>opencard_draw)_0x543a5d=opencard_draw;
			console.log('已设置抽奖次数为'+opencard_draw+'次，当前有'+_0x543a5d+'次抽奖机会');
			for(m=1;_0x543a5d--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('draw');
				if($.runFalag==false)break;
				if(Number(_0x543a5d)<=0)break;
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
	}catch(_0x5d581f){
		console.log(_0x5d581f);
	}
}
async function takePostRequest(_0x5116c6){
	if($.outFlag)return;
	let _0x3ad34d='https://lzkjdz-isv.isvjcloud.com';
	let _0x4edb77='';
	let _0x252eb6='POST';
	let _0x1dd06d='';
	switch(_0x5116c6){
		case 'getMyPing':
			url=_0x3ad34d+'/customer/getMyPing';
			_0x4edb77='token='+$.Token+'&fromType=APP&userId=1000006644&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x3ad34d+'/common/brand/getSimpleActInfoVo';
			_0x4edb77='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x3ad34d+'/common/accessLogWithAD';
			let _0x39d752='https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x4edb77='venderId=1000006644&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x39d752);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x3ad34d+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x4edb77='venderId=1000006644&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x3ad34d+'/a2/task/activityContent';
			_0x4edb77='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&inviterUuid='+$.shareUuid;
			break;
		case 'task':
			url=_0x3ad34d+'/a2/task/startTask';
			_0x4edb77='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId;
			break;
		case 'draw':
			url=_0x3ad34d+'/a2/task/startDraw';
			_0x4edb77='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x5116c6);
	}
	let _0x230be0=getPostRequest(url,_0x4edb77,_0x252eb6);
	return new Promise(async _0x111db9=>{
		$.post(_0x230be0,(_0x10bfb4,_0x4ac9ff,_0x1ea152)=>{
			try{
				setActivityCookie(_0x4ac9ff);
				if(_0x10bfb4){
					if(_0x4ac9ff&&typeof _0x4ac9ff.statusCode!='undefined'){
						if(_0x4ac9ff.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x10bfb4,_0x10bfb4));
					console.log(_0x5116c6+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x5116c6,_0x1ea152);
				}
			}catch(_0x5347d4){
				console.log(_0x5347d4,_0x4ac9ff);
			}finally{
				_0x111db9();
			}
		});
	});
}
async function dealReturn(_0x5d09a2,_0x4aff65){
	let _0xacfe67='';
	try{
		if(_0x5d09a2!='accessLogWithAD'||_0x5d09a2!='drawContent'){
			if(_0x4aff65){
				_0xacfe67=JSON.parse(_0x4aff65);
			}
		}
	}catch(_0x310cd6){
		console.log(_0x5d09a2+' 执行任务异常');
		console.log(_0x4aff65);
		$.runFalag=false;
	}
	try{
		switch(_0x5d09a2){
			case'getMyPing':
				if(typeof _0xacfe67=='object'){
					if(_0xacfe67.result&&_0xacfe67.result===true){
						if(_0xacfe67.data&&typeof _0xacfe67.data['secretPin']!='undefined')$.Pin=_0xacfe67.data['secretPin'];
						if(_0xacfe67.data&&typeof _0xacfe67.data['nickname']!='undefined')$.nickname=_0xacfe67.data['nickname'];
					}else if(_0xacfe67.errorMessage){
						console.log(_0x5d09a2+' '+(_0xacfe67.errorMessage||''));
					}else{
						console.log(_0x5d09a2+' '+_0x4aff65);
					}
				}else{
					console.log(_0x5d09a2+' '+_0x4aff65);
				}
				break;
			case 'task':
				if(typeof _0xacfe67=='object'){
					if(_0xacfe67.result&&_0xacfe67.result===true){
						console.log('任务完成，总积分：'+_0xacfe67.data);
					}else if(_0xacfe67.errorMessage){
						console.log(''+(_0xacfe67.errorMessage||''));
					}else{
						console.log(''+_0x4aff65);
					}
				}else{
					console.log(''+_0x4aff65);
				}
				break;
			case 'draw':
				if(typeof _0xacfe67=='object'){
					if(_0xacfe67.result&&_0xacfe67.result===true&&_0xacfe67.data['drawOk']){
						console.log('抽中：'+_0xacfe67.data['name']);
					}else if(_0xacfe67.errorMessage){
						console.log(''+(_0xacfe67.errorMessage||''));
					}else{
						console.log('💨  空气');
					}
				}else{
					console.log(''+_0x4aff65);
				}
				break;
			case 'activityContent':
				if(typeof _0xacfe67=='object'){
					if(_0xacfe67.result&&_0xacfe67.result===true){
						$.actorUuid=_0xacfe67.data['customerId']||'';
						$.turntableId=_0xacfe67.data['turntableId']||'';
						$.score=_0xacfe67.data['score']||0;
						$.helpStatus=_0xacfe67.data['helpStatus']||0;
						$.openStatus=_0xacfe67.data['openStatus']||0;
						$.assistCount=_0xacfe67.data['assistCount']||0;
						$.state=_0xacfe67.data['state']||'';
						$.taskslist=_0xacfe67.data['giftVOS']||[];
					}else if(_0xacfe67.errorMessage){
						if(_0xacfe67.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x5d09a2+' '+(_0xacfe67.errorMessage||''));
					}else{
						console.log(_0x5d09a2+' '+_0x4aff65);
					}
				}else{
					console.log(_0x5d09a2+' '+_0x4aff65);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0xacfe67=='object'){
					if(_0xacfe67.isOk){
						$.openStatus=_0xacfe67.openCard||false;
					}else if(_0xacfe67.errorMessage||_0xacfe67.msg){
						console.log(_0x5d09a2+' '+(_0xacfe67.errorMessage||_0xacfe67.msg||''));
					}else{
						console.log(_0x5d09a2+' '+_0x4aff65);
					}
				}else{
					console.log(_0x5d09a2+' '+_0x4aff65);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x5d09a2+'-> '+_0x4aff65);
		}
		if(typeof _0xacfe67=='object'){
			if(_0xacfe67.errorMessage){
				if(_0xacfe67.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x43ba15){
		console.log(_0x43ba15);
	}
}
function getPostRequest(_0x2631fd,_0x5cea9e,_0x254d5a='POST'){
	let _0x370339={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x2631fd.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x370339.Referer=activityUrl;
		_0x370339.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x2631fd,'method':_0x254d5a,'headers':_0x370339,'body':_0x5cea9e,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x28f3f6=>{
		let _0x39a011={'url':'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2301100000664401','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x39a011,async(_0x19fd2e,_0x5c283d,_0x5e7fee)=>{
			try{
				if(_0x19fd2e){
					if(_0x5c283d&&typeof _0x5c283d.statusCode!='undefined'){
						if(_0x5c283d.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x19fd2e));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x46216e=$.toObj(_0x5e7fee,_0x5e7fee);
					if(typeof _0x46216e=='object'){
						if(_0x46216e.result&&_0x46216e.result===true){
							$.endTime=_0x46216e.data['endTime']||0;
							$.startTimes=_0x46216e.data['startTime']||Date.now();
						}else if(_0x46216e.errorMessage){
							console.log(''+(_0x46216e.errorMessage||''));
						}else{
							console.log(''+_0x5e7fee);
						}
					}else{
						console.log(''+_0x5e7fee);
					}
				}
			}catch(_0x5b588f){
				$.logErr(_0x5b588f,_0x5c283d);
			}finally{
				_0x28f3f6();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x521043=>{
		let _0x569332={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x569332,async(_0x118b81,_0x1b2eb1,_0x15c0ae)=>{
			try{
				if(_0x118b81){
					if(_0x1b2eb1&&typeof _0x1b2eb1.statusCode!='undefined'){
						if(_0x1b2eb1.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x118b81));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x2b2a62=_0x15c0ae.match(/(活动已经结束)/)&&_0x15c0ae.match(/(活动已经结束)/)[1]||'';
					if(_0x2b2a62){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x1b2eb1);
				}
			}catch(_0xcf43ed){
				$.logErr(_0xcf43ed,_0x1b2eb1);
			}finally{
				_0x521043();
			}
		});
	});
}
function setActivityCookie(_0x2c4a09){
	if(_0x2c4a09){
		if(_0x2c4a09.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x23d8a3 of _0x2c4a09.headers['set-cookie']){
				lz_cookie[_0x23d8a3.split(';')[0]['substr'](0,_0x23d8a3.split(';')[0]['indexOf']('='))]=_0x23d8a3.split(';')[0]['substr'](_0x23d8a3.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x10b540 of Object.keys(lz_cookie)){
				cookie+=_0x10b540+'='+lz_cookie[_0x10b540]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x494f65){
	_0x494f65=_0x494f65||32;
	let _0x1bd64d='abcdef0123456789',_0x1b6cec=_0x1bd64d.length,_0x1faafa='';
	for(i=0;i<_0x494f65;i++)_0x1faafa+=_0x1bd64d.charAt(Math.floor(Math.random()*_0x1b6cec));
	return _0x1faafa;
}
async function joinShop(){
	return new Promise(async _0x11921b=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x3d77fa='';
		if($.shopactivityId)_0x3d77fa=',"activityId":'+$.shopactivityId;
		const _0x1d9cd5='{"venderId":"1000006644","shopId":"1000006644","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x3d77fa+',"channel":406}';
		const _0x2aacc7={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x1d9cd5)};
		const _0x5038eb=await getH5st('8adfb',_0x2aacc7);
		const _0x7dbd9c={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x1d9cd5+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x5038eb),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x7dbd9c,async(_0x5f004a,_0x2e38ec,_0xa034d6)=>{
			try{
				_0xa034d6=_0xa034d6&&_0xa034d6.match(/jsonp_.*?\((.*?)\);/)&&_0xa034d6.match(/jsonp_.*?\((.*?)\);/)[1]||_0xa034d6;
				let _0x1df8b8=$.toObj(_0xa034d6,_0xa034d6);
				if(_0x1df8b8&&typeof _0x1df8b8=='object'){
					if(_0x1df8b8&&_0x1df8b8.success===true){
						console.log(_0x1df8b8.message);
						$.errorJoinShop=_0x1df8b8.message;
						if(_0x1df8b8.result&&_0x1df8b8.result['giftInfo']){
							for(let _0x12c43b of _0x1df8b8.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x12c43b.discountString+_0x12c43b.prizeName+_0x12c43b.secondLineDesc);
							}
						}
					}else if(_0x1df8b8&&typeof _0x1df8b8=='object'&&_0x1df8b8.message){
						$.errorJoinShop=_0x1df8b8.message;
						console.log(''+(_0x1df8b8.message||''));
					}else{
						console.log(_0xa034d6);
					}
				}else{
					console.log(_0xa034d6);
				}
			}catch(_0x5b73f5){
				$.logErr(_0x5b73f5,_0x2e38ec);
			}finally{
				_0x11921b();
			}
		});
	});
}
function getH5st(_0x10fa23,_0x19f876){
	return new Promise(async _0x1540af=>{
		let _0x562bd5={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x10fa23+'&req='+encodeURIComponent(JSON.stringify(_0x19f876)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x562bd5,(_0x2762c9,_0x2e7a74,_0x5af9b8)=>{
			try{
				if(_0x2762c9){
					console.log(JSON.stringify(_0x2762c9));
					console.log($.name+' getH5st API请求失败，请检查网路重试');
				}else{}
			}catch(_0x465c48){
				$.logErr(_0x465c48,_0x2e7a74);
			}finally{
				_0x1540af(_0x5af9b8);
			}
		});
	});
}
function getAuthorCodeList(_0x4b075f){
	return new Promise(_0x3ad6c3=>{
		const _0x14308c={'url':_0x4b075f+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x14308c,async(_0x20ee40,_0x879048,_0x444a4a)=>{
			try{
				if(_0x20ee40){
					$.log(_0x20ee40);
				}else{
					if(_0x444a4a)_0x444a4a=JSON.parse(_0x444a4a);
				}
			}catch(_0x125614){
				$.logErr(_0x125614,_0x879048);
				_0x444a4a=null;
			}finally{
				_0x3ad6c3(_0x444a4a);
			}
		});
	});
}
function jsonParse(_0x3809cc){
	if(typeof _0x3809cc=='string'){
		try{
			return JSON.parse(_0x3809cc);
		}catch(_0x1319d8){
			console.log(_0x1319d8);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};