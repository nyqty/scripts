/*
12.1-12.31 安佳做任务开盲盒，赢好礼


做任务，邀请，抽奖


请求太频繁会被黑ip
过10分钟再执行

cron:1 1 * * *
============Quantumultx===============
[task_local]
#12.1-12.31 安佳做任务开盲盒，赢好礼
1 1 * * * jd_AJMH.js, tag=12.1-12.31 安佳做任务开盲盒，赢好礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.1-12.31 安佳做任务开盲盒，赢好礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzdz1-isv.isvjcloud.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x5997c5=>{
		cookiesArr.push(jdCookieNode[_0x5997c5]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0xad712=>_0xad712.cookie)]['filter'](_0xdc4285=>!!_0xdc4285);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let lz_cookie={};
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='dze13a037aa9d84d838afe9836';
	authorCodeList=["43aaf7886c3148109845111d14404112"]//await getAuthorCodeList('http://code.kingran.ga/ajmh.json');
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	console.log('\n规则:\n1.每天完成任务共计：50积分。\n2.邀请一名好友50积分，不上限。\n3.每300积分可以开盲盒一次，每天限制开三次，每天限制中奖一次。');
	for(let _0x4ef6b9=0;_0x4ef6b9<cookiesArr.length;_0x4ef6b9++){
		cookie=cookiesArr[_0x4ef6b9];
		originCookie=cookiesArr[_0x4ef6b9];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x4ef6b9+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x4ef6b9==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x1919d2='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x1919d2);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x1919d2);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0xc16420=>$.logErr(_0xc16420))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x42d284=false;
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
		await takePostRequest('getSimpleActInfoVo');
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await takePostRequest('getUserInfo');
		await takePostRequest('activityContent');
		await takePostRequest('drawContent');
		if($.hotFlag)return;
		if(!$.actorUuid){
			$.actorUuid=$.shareUuid;
			//console.log('获取不到[actorUuid]退出执行，请重新执行');
			//return;
		}
		if($.hasEnd===true||Date.now()>$.endTime){
			$.activityEnd=true;
			console.log('活动结束');
			return;
		}
		await $.wait(1000);
		console.log('开始做日常任务......');
		$.log('关注: '+$.followShop);
		if(!$.followShop&&!$.outFlag){
			_0x42d284=true;
			await takePostRequest('followShop');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}
		$.log('加购: '+$.addSku);
		if(!$.addSku&&!$.outFlag){
			_0x42d284=true;
			await takePostRequest('addSku');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}
		$.log('逛一逛: '+$.visitSkulist);
		if(!$.visitSkulist&&!$.outFlag){
			_0x42d284=true;
			await takePostRequest('toShoplist');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}
		await takePostRequest('activityContent');
		console.log('\n目前分值为：'+$.score+'\n');
		$.runFalag=true;
		let _0x35c5d5=parseInt($.score/300);
		for(m=1;_0x35c5d5--;m++){
			console.log('第'+m+'次抽奖');
			await takePostRequest('draw');
			if($.runFalag==false)break;
			if(Number(_0x35c5d5)<=0)break;
			if(m>=1){
				console.log('抽奖太多次，多余的次数请再执行脚本');
				break;
			}
			await $.wait(parseInt(Math.random()*5000+5000,10));
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+10000,10));
	}catch(_0x2e0bf3){
		console.log(_0x2e0bf3);
	}
}
async function takePostRequest(_0x265fce){
	if($.outFlag)return;
	let _0x4439ea='https://lzdz1-isv.isvjcloud.com';
	let _0x2109d8='';
	let _0x41980e='POST';
	let _0x30f2e6='';
	switch(_0x265fce){
		case 'getSimpleActInfoVo':
			url=_0x4439ea+'/dz/common/getSimpleActInfoVo';
			_0x2109d8='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x4439ea+'/customer/getMyPing';
			_0x2109d8='userId='+($.shopId||$.venderId||'')+'&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x4439ea+'/common/accessLogWithAD';
			let _0x48eb77=_0x4439ea+'/dingzhi/box618/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x2109d8='venderId='+($.shopId||$.venderId||'')+'&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x48eb77)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x4439ea+'/wxActionCommon/getUserInfo';
			_0x2109d8='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x4439ea+'/dingzhi/box618/activityContent';
			_0x2109d8='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x4439ea+'/dingzhi/taskact/common/drawContent';
			_0x2109d8='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'draw':
			url=_0x4439ea+'/dingzhi/box618/startDraw';
			_0x2109d8='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'toShoplist':
			url=_0x4439ea+'/dingzhi/box618/saveTask';
			_0x2109d8='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=14&taskValue=1000014486';
			break;
		case 'addCart':
		case 'browseGoods':
			url=_0x4439ea+'/dingzhi/opencard/'+_0x265fce;
			_0x2109d8='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0x265fce=='browseGoods')_0x2109d8+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(_0x265fce=='助力'){
				url=_0x4439ea+'/dingzhi/linkgame/assist';
			}else{
				url=_0x4439ea+'/dingzhi/linkgame/assist/status';
			}
			_0x2109d8='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'followShop':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=_0x4439ea+'/dingzhi/box618/saveTask';
			let _0x3383b7='';
			let _0xa9327='';
			if(_0x265fce=='followShop'){
				_0x3383b7=22;
				_0xa9327='';
			}else if(_0x265fce=='visitSku'){
				_0x3383b7=5;
				_0xa9327=$.visitSkuValue||5;
			}else if(_0x265fce=='toShop'){
				_0x3383b7=14;
				_0xa9327=$.visitSkuValue||1000014486;
			}else if(_0x265fce=='addSku'){
				_0x3383b7=21;
				_0xa9327='';
			}
			_0x2109d8='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x3383b7+'&taskValue='+$.visitSkuValue;
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x4439ea+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x2109d8='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		default:
			console.log('错误'+_0x265fce);
	}
	let _0x4a3e21=getPostRequest(url,_0x2109d8,_0x41980e);
	return new Promise(async _0x5a9cca=>{
		$.post(_0x4a3e21,(_0x12bc8a,_0x2b3d26,_0x3469b2)=>{
			try{
				setActivityCookie(_0x2b3d26);
				if(_0x12bc8a){
					if(_0x2b3d26&&typeof _0x2b3d26.statusCode!='undefined'){
						if(_0x2b3d26.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x12bc8a,_0x12bc8a));
					console.log(_0x265fce+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x265fce,_0x3469b2);
				}
			}catch(_0x1bea70){
				console.log(_0x1bea70,_0x2b3d26);
			}finally{
				_0x5a9cca();
			}
		});
	});
}
async function dealReturn(_0xad27d4,_0xe736a0){
	let _0x2da78f='';
	try{
		if(_0xad27d4!='accessLogWithAD'||_0xad27d4!='drawContent'){
			if(_0xe736a0){
				_0x2da78f=JSON.parse(_0xe736a0);
			}
		}
	}catch(_0x4f6dc2){
		console.log(_0xad27d4+' 执行任务异常');
		console.log(_0xe736a0);
		$.runFalag=false;
	}
	try{
		switch(_0xad27d4){
			case 'getSimpleActInfoVo':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.result&&_0x2da78f.result===true){
						if(typeof _0x2da78f.data['shopId']!='undefined')$.shopId=_0x2da78f.data['shopId'];
						if(typeof _0x2da78f.data['venderId']!='undefined')$.venderId=_0x2da78f.data['venderId'];
					}else if(_0x2da78f.errorMessage){
						console.log(_0xad27d4+' '+(_0x2da78f.errorMessage||''));
					}else{
						console.log(_0xad27d4+' '+_0xe736a0);
					}
				}else{
					console.log(_0xad27d4+' '+_0xe736a0);
				}
				break;
			case 'getMyPing':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.result&&_0x2da78f.result===true){
						if(_0x2da78f.data&&typeof _0x2da78f.data['secretPin']!='undefined')$.Pin=_0x2da78f.data['secretPin'];
						if(_0x2da78f.data&&typeof _0x2da78f.data['nickname']!='undefined')$.nickname=_0x2da78f.data['nickname'];
					}else if(_0x2da78f.errorMessage){
						console.log(_0xad27d4+' '+(_0x2da78f.errorMessage||''));
					}else{
						console.log(_0xad27d4+' '+_0xe736a0);
					}
				}else{
					console.log(_0xad27d4+' '+_0xe736a0);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.result&&_0x2da78f.result===true){
						if(_0x2da78f.data&&typeof _0x2da78f.data['yunMidImageUrl']!='undefined')$.attrTouXiang=_0x2da78f.data['yunMidImageUrl']||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
					}else if(_0x2da78f.errorMessage){
						console.log(_0xad27d4+' '+(_0x2da78f.errorMessage||''));
					}else{
						console.log(_0xad27d4+' '+_0xe736a0);
					}
				}else{
					console.log(_0xad27d4+' '+_0xe736a0);
				}
				break;
			case 'activityContent':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.result&&_0x2da78f.result===true){
						$.endTime=_0x2da78f.data['endTime']||_0x2da78f.data['activityVo']&&_0x2da78f.data['activityVo']['endTime']||_0x2da78f.data['activity']['endTime']||0;
						$.hasEnd=_0x2da78f.data['hasEnd']||false;
						$.score=_0x2da78f.data['score']||0;
						$.settings=_0x2da78f.data['openCardData']['settings']||[];
						$.assistStatus=_0x2da78f.data['assistStatus']||0;
						$.followShop=_0x2da78f.data['taskData']['followSku']['allStatus']||false;
						$.visitSkulist=_0x2da78f.data['taskData']['toShop']['allStatus']||false;
						$.addSkulist=_0x2da78f.data['taskData']['addSku']['settings']||[];
						$.addSku=_0x2da78f.data['taskData']['addSku']['allStatus']||false;
						$.actorUuid=_0x2da78f.data['actorUuid']||0;
					}else if(_0x2da78f.errorMessage){
						console.log(_0xad27d4+' '+(_0x2da78f.errorMessage||''));
					}else{
						console.log(_0xad27d4+' '+_0xe736a0);
					}
				}else{
					console.log(_0xad27d4+' '+_0xe736a0);
				}
				break;
			case'followShop':
			case 'addSku':
			case 'toShoplist':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.result&&_0x2da78f.result===true){
						console.log('任务完成，获得分值：'+_0x2da78f.data['addScore']);
					}else if(_0x2da78f.errorMessage){
						console.log(''+(_0x2da78f.errorMessage||''));
					}else{
						console.log(''+_0xe736a0);
					}
				}else{
					console.log(_0xad27d4+' '+_0xe736a0);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.result&&_0x2da78f.result===true){
						let _0x652e90=_0x2da78f.data['openInfo']||[];
						$.openList=[..._0x652e90];
						$.allOpenCard=_0x2da78f.data['allOpenCard']||_0x2da78f.data['isOpenCardStatus']||false;
						if(_0x2da78f.data['beans']||_0x2da78f.data['addBeanNum'])console.log('开卡获得:'+(_0x2da78f.data['beans']||_0x2da78f.data['addBeanNum'])+'豆');
					}else if(_0x2da78f.errorMessage){
						console.log(_0xad27d4+' '+(_0x2da78f.errorMessage||''));
					}else{
						console.log(_0xad27d4+' '+_0xe736a0);
					}
				}else{
					console.log(_0xad27d4+' '+_0xe736a0);
				}
				break;
			case 'draw':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.result&&_0x2da78f.result===true){
						if(_0x2da78f.data['drawOk']===true){
							console.log('获得：'+_0x2da78f.data['name']);
						}else{
							console.log('什么也没有~');
						}
					}else if(_0x2da78f.errorMessage){
						console.log(''+(_0x2da78f.errorMessage||''));
					}else{
						console.log(''+_0xe736a0);
					}
				}else{
					console.log(''+_0xe736a0);
				}
				break;
			case'邀请':
			case'助力':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.data['status']==200){
						if(_0xad27d4=='助力'){
							console.log('助力成功');
						}else{
							$.yaoqing=true;
						}
					}else if(_0x2da78f.data['status']==105){
						console.log('已经助力过');
					}else if(_0x2da78f.data['status']==104){
						console.log('已经助力其他人');
					}else if(_0x2da78f.data['status']==101){}else{
						console.log(_0xe736a0);
					}
				}else{
					console.log(_0xad27d4+' '+_0xe736a0);
				}
			case 'getDrawRecordHasCoupon':
				if(typeof _0x2da78f=='object'){
					if(_0x2da78f.result&&_0x2da78f.result===true){
						console.log('我的奖品：');
						let _0x229fe4=0;
						let _0x28d4b2=0;
						let _0x2b1b97=0;
						for(let _0x2168c5 in _0x2da78f.data['recordList']){
							let _0x4badf8=_0x2da78f.data['recordList'][_0x2168c5];
							console.log(''+(_0x4badf8.infoType!=10&&_0x4badf8.value&&_0x4badf8.value+':'||'')+_0x4badf8.infoName);
						}
					}else if(_0x2da78f.errorMessage){
						console.log(''+(_0x2da78f.errorMessage||''));
					}else{
						console.log(''+_0xe736a0);
					}
				}else{
					console.log(''+_0xe736a0);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
			case 'getRankList':
				break;
			default:
				console.log(_0xad27d4+'-> '+_0xe736a0);
		}
		if(typeof _0x2da78f=='object'){
			if(_0x2da78f.errorMessage){
				if(_0x2da78f.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x59b400){
		console.log(_0x59b400);
	}
}
function getPostRequest(_0x9570bf,_0x36d8c4,_0x1c841f='POST'){
	let _0x1e1863={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x9570bf.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		_0x1e1863.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x1e1863.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x9570bf,'method':_0x1c841f,'headers':_0x1e1863,'body':_0x36d8c4,'timeout':30000};
}
function getCk(){
	return new Promise(_0x3d0031=>{
		let _0x930669={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(_0x930669,async(_0x4db2f8,_0x1bf556,_0x5c3ed3)=>{
			try{
				if(_0x4db2f8){
					if(_0x1bf556&&typeof _0x1bf556.statusCode!='undefined'){
						if(_0x1bf556.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x4db2f8));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x2d142a=_0x5c3ed3.match(/(活动已经结束)/)&&_0x5c3ed3.match(/(活动已经结束)/)[1]||'';
					if(_0x2d142a){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x1bf556);
				}
			}catch(_0x540193){
				$.logErr(_0x540193,_0x1bf556);
			}finally{
				_0x3d0031();
			}
		});
	});
}
function setActivityCookie(_0x179be3){
	if(_0x179be3){
		if(_0x179be3.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x1f10dc of _0x179be3.headers['set-cookie']){
				lz_cookie[_0x1f10dc.split(';')[0]['substr'](0,_0x1f10dc.split(';')[0]['indexOf']('='))]=_0x1f10dc.split(';')[0]['substr'](_0x1f10dc.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x545aa1 of Object.keys(lz_cookie)){
				cookie+=_0x545aa1+'='+lz_cookie[_0x545aa1]+';';
			}
			activityCookie=cookie;
		}
	}
}
function getAuthorCodeList(_0x577c1c){
	return new Promise(_0x2a2b97=>{
		const _0x530d49={'url':_0x577c1c+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x530d49,async(_0x482ced,_0x453d97,_0x461d3b)=>{
			try{
				if(_0x482ced){
					$.log(_0x482ced);
				}else{
					if(_0x461d3b)_0x461d3b=JSON.parse(_0x461d3b);
				}
			}catch(_0x2b4455){
				$.logErr(_0x2b4455,_0x453d97);
				_0x461d3b=null;
			}finally{
				_0x2a2b97(_0x461d3b);
			}
		});
	});
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x1aa20f){
	_0x1aa20f=_0x1aa20f||32;
	let _0x3b5136='abcdef0123456789',_0x144a25=_0x3b5136.length,_0x54409c='';
	for(i=0;i<_0x1aa20f;i++)_0x54409c+=_0x3b5136.charAt(Math.floor(Math.random()*_0x144a25));
	return _0x54409c;
}
function random(_0x1b12cb,_0x5863ed){
	return Math.floor(Math.random()*(_0x5863ed-_0x1b12cb))+_0x1b12cb;
}
function jsonParse(_0x3d4c42){
	if(typeof _0x3d4c42=='string'){
		try{
			return JSON.parse(_0x3d4c42);
		}catch(_0x48b40f){
			console.log(_0x48b40f);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};

// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);