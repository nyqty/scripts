/*
11.1-11.29 云养牛，免费赢好礼

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本


入口：[ 11.1-11.29 云养牛，免费赢好礼]

请求太频繁会被黑ip
过10分钟再执行

cron:12 13 * * *
============Quantumultx===============
[task_local]
#11.1-11.29 云养牛，免费赢好礼
12 13 * * * jd_mnyyn.js, tag=11.1-11.29 云养牛，免费赢好礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('11.1-11.29 云养牛，免费赢好礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzdz1-isv.isvjcloud.com';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x114e31=>{
		cookiesArr.push(jdCookieNode[_0x114e31]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x4fbdd6=>_0x4fbdd6.cookie)]['filter'](_0x416b25=>!!_0x416b25);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	authorCodeList=[]
	$.activityId='dze41585e4d6b94962ef751bc32cc';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	for(let _0x239557=0;_0x239557<cookiesArr.length;_0x239557++){
		cookie=cookiesArr[_0x239557];
		originCookie=cookiesArr[_0x239557];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x239557+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if(_0x239557==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x3453ec='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x3453ec);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x3453ec);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x2ccc5=>$.logErr(_0x2ccc5))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x5ed872=false;
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
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if($.hasEnd===true||Date.now()>$.endTime){
			$.activityEnd=true;
			console.log('活动结束');
			return;
		}
		await $.wait(1000);
		await takePostRequest('drawContent');
		console.log('开始填写名称......');
		await takePostRequest('名称');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('开始做日常任务......');
		await takePostRequest('每日签到');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('关注店铺');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('开始做浏览好物,每日三次......');
		await takePostRequest('浏览好物1');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('浏览好物2');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('浏览好物3');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('加购');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('日常任务全部完成,开始收取额外奖励......');
		await takePostRequest('getTaskDetail');
		if($.taskTimes>=3){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励1');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.taskTimes>=5){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励2');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.taskTimes>=10){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励3');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		let _0x38142a=parseInt(60-$.loadMinute);
		console.log('当前收草剩余时间:'+_0x38142a+' 分钟');
		if($.loadMinute>=60){
			console.log('开始收草......');
			await takePostRequest('收草');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		await takePostRequest('activityContent');
		await $.wait(parseInt(Math.random()*1000+1000,10));
		console.log('查询当前汇总......');
		console.log('\n小牛名称：'+$.cowName+' \n抽奖大转盘：'+$.canDrawTimes+' 次\n饲料：'+$.score+' \n等级：'+$.cowLevel+'\n已喂养：'+$.feedTimes+' 次\n');
		if($.score>=10*$.cowLevel){
			console.log('开始喂养......');
			let _0x3cc9fb=parseInt(10*$.cowLevel);
			console.log('当前等级喂养饲料需:'+_0x3cc9fb);
			let _0x346f9c=parseInt($.score/_0x3cc9fb);
			console.log('当前可喂养次数为:'+_0x346f9c);
			for(m=1;_0x346f9c--;m++){
				console.log('第'+m+'次喂养');
				await takePostRequest('喂养');
				if($.runFalag==false)break;
				if(Number(_0x346f9c)<=0)break;
				if(m>=5){
					console.log('喂养太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		await takePostRequest('activityContent');
		await $.wait(parseInt(Math.random()*1000+1000,10));
		if($.canDrawTimes>=1){
			console.log('开始大转盘抽奖......');
			let _0x4d8bbe=parseInt($.canDrawTimes/1);
			console.log('当前可抽奖次数为:'+_0x4d8bbe);
			for(m=1;_0x4d8bbe--;m++){
				console.log('第'+m+'次抽奖');
				await takePostRequest('抽奖');
				if($.runFalag==false)break;
				if(Number(_0x4d8bbe)<=0)break;
				if(m>=5){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
		await takePostRequest('getDrawRecordHasCoupon');
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await $.wait(parseInt(Math.random()*1000+5000,10));
		if($.index%3==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+30000,10));
	}catch(_0x2c27cf){
		console.log(_0x2c27cf);
	}
}
async function takePostRequest(_0xd6e3bd){
	if($.outFlag)return;
	let _0x4b32c7='https://lzdz1-isv.isvjcloud.com';
	let _0x57aa2f='';
	let _0x3eeaa9='POST';
	let _0x11633c='';
	switch(_0xd6e3bd){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x57aa2f='body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=ab640b5dc76b89426f72115f5b2e06e934a5fbe9&client=apple&clientVersion=10.1.4&st=1650250640876&sv=102&sign=7ea66dcb2969eff53c43b5b8a4937dbe';
			break;
		case 'getSimpleActInfoVo':
			url=_0x4b32c7+'/dz/common/getSimpleActInfoVo';
			_0x57aa2f='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x4b32c7+'/customer/getMyPing';
			_0x57aa2f='userId='+($.shopId||$.venderId||'')+'&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x4b32c7+'/common/accessLogWithAD';
			let _0x54cd7d=_0x4b32c7+'/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x57aa2f='venderId='+($.shopId||$.venderId||'')+'&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x54cd7d)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x4b32c7+'/wxActionCommon/getUserInfo';
			_0x57aa2f='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/activityContent';
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x4b32c7+'/dingzhi/taskact/common/drawContent';
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'getRankList':
			url=_0x4b32c7+'/dingzhi/taskact/common/getRankList';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid;
			break;
		case 'checkOpenCard':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/initOpenCard';
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'info':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/task/opencard/info';
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'startDraw':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveTask';
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&drawType=1';
			break;
		case '关注店铺':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=1&taskValue=1000014803';
			break;
		case '浏览好物1':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100008226516';
			break;
		case '每日签到':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=0&taskValue=1000014803';
			break;
		case '浏览好物2':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100003661795';
			break;
		case '浏览好物3':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100004891782';
			break;
		case'加购':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=21&taskValue=2693720';
			break;
		case '额外奖励1':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=1';
			break;
		case '额外奖励2':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=2';
			break;
		case '额外奖励3':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=3';
			break;
		case'喂养':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/feedCow';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case'名称':
			let _0x317a27=['赵','钱','蒋','张','金','章','葛','昌','鲍','苏','许','范','尤','水','白','蔺','叶','桂','甘','青','藏','川','宁','琼'];
			$.char0=_0x317a27[random(0,_0x317a27.length)];
			let _0x57d896=['日天','下地','上天','MM','GG','明星','善扣','中华','淡尘','星河','夕阳','心动','野女','烈酒','失去','清酒','萝莉','默','卡','星光','配角','川','宁','琼'];
			$.char1=_0x57d896[random(0,_0x57d896.length)];
			$.char2=''+$.char0+$.char1;
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveCow';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&cowNick='+encodeURIComponent($.char2);
			break;
		case'收草':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/saveForage';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getTaskDetail':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/getTaskDetail';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'sign':
		case 'addCart':
		case 'browseGoods':
			url=_0x4b32c7+'/dingzhi/opencard/'+_0xd6e3bd;
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0xd6e3bd=='browseGoods')_0x57aa2f+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(_0xd6e3bd=='助力'){
				url=_0x4b32c7+'/dingzhi/mengniumilk/grow/assist';
			}else{
				url=_0x4b32c7+'/dingzhi/mengniumilk/grow/assist/status';
			}
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=_0x4b32c7+'/dingzhi/opencard/'+_0xd6e3bd;
			let _0x3ecf63='';
			let _0x57c8b7='';
			if(_0xd6e3bd=='viewVideo'){
				_0x3ecf63=31;
				_0x57c8b7=31;
			}else if(_0xd6e3bd=='visitSku'){
				_0x3ecf63=5;
				_0x57c8b7=$.visitSkuValue||5;
			}else if(_0xd6e3bd=='toShop'){
				_0x3ecf63=14;
				_0x57c8b7=$.toShopValue||14;
			}else if(_0xd6e3bd=='addSku'){
				_0x3ecf63=2;
				_0x57c8b7=$.addSkuValue||2;
			}
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x3ecf63+'&taskValue='+_0x57c8b7;
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x4b32c7+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/help/list';
			_0x57aa2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'抽奖':
			url=_0x4b32c7+'/dingzhi/mengniumilk/grow/start';
			_0x57aa2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0xd6e3bd);
	}
	let _0x52f473=getPostRequest(url,_0x57aa2f,_0x3eeaa9);
	return new Promise(async _0x124903=>{
		$.post(_0x52f473,(_0x915485,_0x5310f0,_0x32f4b6)=>{
			try{
				setActivityCookie(_0x5310f0);
				if(_0x915485){
					if(_0x5310f0&&typeof _0x5310f0.statusCode!='undefined'){
						if(_0x5310f0.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x915485,_0x915485));
					console.log(_0xd6e3bd+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0xd6e3bd,_0x32f4b6);
				}
			}catch(_0x3e7716){
				console.log(_0x3e7716,_0x5310f0);
			}finally{
				_0x124903();
			}
		});
	});
}
async function dealReturn(_0x828b0d,_0x39b0d6){
	let _0x1835cf='';
	try{
		if(_0x828b0d!='accessLogWithAD'||_0x828b0d!='drawContent'){
			if(_0x39b0d6){
				_0x1835cf=JSON.parse(_0x39b0d6);
			}
		}
	}catch(_0x5379e5){
		console.log(_0x828b0d+' 执行任务异常');
		console.log(_0x39b0d6);
		$.runFalag=false;
	}
	try{
		switch(_0x828b0d){
			case 'isvObfuscator':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.errcode==0){
						if(typeof _0x1835cf.token!='undefined')$.Token=_0x1835cf.token;
					}else if(_0x1835cf.message){
						console.log('isvObfuscator '+(_0x1835cf.message||''));
					}else{
						console.log(_0x39b0d6);
					}
				}else{
					console.log(_0x39b0d6);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						if(typeof _0x1835cf.data['shopId']!='undefined')$.shopId=_0x1835cf.data['shopId'];
						if(typeof _0x1835cf.data['venderId']!='undefined')$.venderId=_0x1835cf.data['venderId'];
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case 'getMyPing':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						if(_0x1835cf.data&&typeof _0x1835cf.data['secretPin']!='undefined')$.Pin=_0x1835cf.data['secretPin'];
						if(_0x1835cf.data&&typeof _0x1835cf.data['nickname']!='undefined')$.nickname=_0x1835cf.data['nickname'];
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						if(_0x1835cf.data&&typeof _0x1835cf.data['yunMidImageUrl']!='undefined')$.attrTouXiang=_0x1835cf.data['yunMidImageUrl']||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case 'activityContent':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						$.endTime=_0x1835cf.data['endTime']||_0x1835cf.data['activityVo']&&_0x1835cf.data['activityVo']['endTime']||_0x1835cf.data['activity']['endTime']||0;
						$.hasEnd=_0x1835cf.data['isEnd']||false;
						$.score=_0x1835cf.data['score']||0;
						$.cowLevel=_0x1835cf.data['cowLevel']||0;
						$.shareSocre=_0x1835cf.data['shareSocre']||0;
						$.loadMinute=_0x1835cf.data['loadMinute'];
						$.signLevel=_0x1835cf.data['signLevel']||0;
						$.actorUuid=_0x1835cf.data['actorUuid']||'';
						$.assistCount=_0x1835cf.data['assistCount']||0;
						$.assistStatus=_0x1835cf.data['assistStatus']||0;
						$.canDrawTimes=_0x1835cf.data['canDrawTimes']||0;
						$.cowName=_0x1835cf.data['cowName']||'';
						$.remainderTimes=_0x1835cf.data['remainderTimes']||0;
						$.feedTimes=_0x1835cf.data['feedTimes']||0;
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case 'getTaskDetail':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						$.taskTimes=_0x1835cf.data['dayTask']['taskTimes'];
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case 'info':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						$.addCart=_0x1835cf.data['addCart']||false;
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case '关注店铺':
			case '浏览好物1':
			case '每日签到':
			case '浏览好物2':
			case '浏览好物3':
			case'加购':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						console.log('任务完成，获得饲料：'+_0x1835cf.data['score']);
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case '额外奖励1':
			case '额外奖励2':
			case '额外奖励3':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						console.log('任务完成，获得饲料：'+_0x1835cf.data['addScore']);
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case'喂养':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						console.log('衰仔，执行成功，喂养次数：'+_0x1835cf.data['feedTimes']);
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case'名称':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						console.log('衰仔，成功取名：'+_0x1835cf.data['cowNick']+'  (*￣︶￣)');
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case'收草':
			case '卖豆乳':
			case '卖燕麦牛奶':
			case '卖豆乳':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						console.log('衰仔，执行成功，剩余饲料：'+_0x1835cf.data['addScore']);
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case'checkOpenCard':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						let _0x6e6e1b=_0x1835cf.data['openInfo']||[];
						$.openList=[..._0x6e6e1b];
						$.allOpenCard=_0x1835cf.data['allOpenCard']||_0x1835cf.data['isOpenCardStatus']||false;
						if(_0x1835cf.data['beans']||_0x1835cf.data['addBeanNum'])console.log('开卡获得:'+(_0x1835cf.data['beans']||_0x1835cf.data['addBeanNum'])+'豆');
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case 'startDraw':
			case 'followShop':
			case 'viewVideo':
			case 'visitSku':
			case 'toShop':
			case 'addSku':
			case 'sign':
			case 'addCart':
			case 'browseGoods':
			case'抽奖':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						if(typeof _0x1835cf.data=='object'){
							let _0x5837e3='';
							let _0x4b9bfa='抽奖';
							if(_0x1835cf.data['addBeanNum']){
								_0x5837e3=_0x1835cf.data['addBeanNum']+'京豆';
							}
							if(_0x1835cf.data['addPoint']){
								_0x5837e3+=' '+_0x1835cf.data['addPoint']+'游戏机会';
							}
							if(_0x828b0d=='followShop'){
								_0x4b9bfa='关注';
								if(_0x1835cf.data['beanNumMember']&&_0x1835cf.data['assistSendStatus']){
									_0x5837e3+=' 额外获得:'+_0x1835cf.data['beanNumMember']+'京豆';
								}
							}else if(_0x828b0d=='addSku'||_0x828b0d=='addCart'){
								_0x4b9bfa='加购';
							}else if(_0x828b0d=='viewVideo'){
								_0x4b9bfa='热门文章';
							}else if(_0x828b0d=='toShop'){
								_0x4b9bfa='浏览店铺';
							}else if(_0x828b0d=='visitSku'||_0x828b0d=='browseGoods'){
								_0x4b9bfa='浏览商品';
							}else if(_0x828b0d=='sign'){
								_0x4b9bfa='签到';
							}else{
								let _0x56bbca=typeof _0x1835cf.data['drawOk']==='object'&&_0x1835cf.data['drawOk']||_0x1835cf.data;
								_0x5837e3=_0x56bbca.drawOk==true&&_0x56bbca.name||'';
							}
							if(_0x4b9bfa=='抽奖'&&_0x5837e3&&_0x5837e3.indexOf('京豆')==-1){
								if($.isNode())await notify.sendNotify(''+$.name,'【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n'+_0x4b9bfa+'成功,获得 '+_0x5837e3+'\n');
							}
							if(!_0x5837e3){
								_0x5837e3='空气💨';
							}
							console.log(_0x4b9bfa+'获得:'+(_0x5837e3||_0x39b0d6));
						}else{
							console.log(_0x828b0d+' '+_0x39b0d6);
						}
					}else if(_0x1835cf.errorMessage){
						$.runFalag=false;
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true){
						console.log('我的奖品：');
						let _0xa67a9f=0;
						let _0x2883b1=0;
						let _0x33991d=0;
						for(let _0x121ca9 in _0x1835cf.data){
							let _0x25d837=_0x1835cf.data[_0x121ca9];
							if(_0x25d837.infoName==''&&_0x25d837.sendStatus==0){
								_0xa67a9f++;
								_0x2883b1=_0x25d837.infoName['replace']('','');
								_0x33991d=_0x33991d<_0x25d837.createTime?_0x25d837.createTime:_0x33991d;
							}else{
								console.log(''+(_0x25d837.infoType!=10&&_0x25d837.value&&_0x25d837.value+':'||'')+_0x25d837.infoName);
							}
						}
						if(_0x33991d>0)console.log('最新邀请奖励时间:'+$.time('yyyy-MM-dd HH:mm:ss',_0x33991d));
						if(_0xa67a9f>0)console.log('邀请好友('+_0xa67a9f+'):'+(_0xa67a9f*parseInt(_0x2883b1,10)||30)+'京豆');
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case'getShareRecord':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.result&&_0x1835cf.result===true&&_0x1835cf.data){
						$.ShareCount=_0x1835cf.data['shareList']['length'];
						$.log('=========== 你邀请了:'+$.ShareCount+'个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n');
					}else if(_0x1835cf.errorMessage){
						console.log(_0x828b0d+' '+(_0x1835cf.errorMessage||''));
					}else{
						console.log(_0x828b0d+' '+_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
				break;
			case'邀请':
			case'助力':
				if(typeof _0x1835cf=='object'){
					if(_0x1835cf.data['status']==200){
						if(_0x828b0d=='助力'){
							console.log('助力成功');
						}else{
							$.yaoqing=true;
						}
					}else if(_0x1835cf.data['status']==105){
						console.log('已经助力过');
					}else if(_0x1835cf.data['status']==104){
						console.log('已经助力其他人');
					}else if(_0x1835cf.data['status']==101){}else{
						console.log(_0x39b0d6);
					}
				}else{
					console.log(_0x828b0d+' '+_0x39b0d6);
				}
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x828b0d+'-> '+_0x39b0d6);
		}
		if(typeof _0x1835cf=='object'){
			if(_0x1835cf.errorMessage){
				if(_0x1835cf.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x29740c){
		console.log(_0x29740c);
	}
}
function getPostRequest(_0x20dab0,_0x3b6819,_0x2f58cd='POST'){
	let _0x32c4de={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x20dab0.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		_0x32c4de.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x32c4de.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x20dab0,'method':_0x2f58cd,'headers':_0x32c4de,'body':_0x3b6819,'timeout':30000};
}
function getCk(){
	return new Promise(_0x1bfa0f=>{
		let _0x2840ea={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(_0x2840ea,async(_0xd04885,_0x4b1b69,_0x136af4)=>{
			try{
				if(_0xd04885){
					if(_0x4b1b69&&typeof _0x4b1b69.statusCode!='undefined'){
						if(_0x4b1b69.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xd04885));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x2b845f=_0x136af4.match(/(活动已经结束)/)&&_0x136af4.match(/(活动已经结束)/)[1]||'';
					if(_0x2b845f){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x4b1b69);
				}
			}catch(_0x5f0fce){
				$.logErr(_0x5f0fce,_0x4b1b69);
			}finally{
				_0x1bfa0f();
			}
		});
	});
}
function setActivityCookie(_0x41ffbb){
	if(_0x41ffbb){
		if(_0x41ffbb.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x34cff3 of _0x41ffbb.headers['set-cookie']){
				lz_cookie[_0x34cff3.split(';')[0]['substr'](0,_0x34cff3.split(';')[0]['indexOf']('='))]=_0x34cff3.split(';')[0]['substr'](_0x34cff3.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x5c2415 of Object.keys(lz_cookie)){
				cookie+=_0x5c2415+'='+lz_cookie[_0x5c2415]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x255fae){
	_0x255fae=_0x255fae||32;
	let _0x405682='abcdef0123456789',_0x2c29e1=_0x405682.length,_0x3b8f8d='';
	for(i=0;i<_0x255fae;i++)_0x3b8f8d+=_0x405682.charAt(Math.floor(Math.random()*_0x2c29e1));
	return _0x3b8f8d;
}
function jsonParse(_0x3399d6){
	if(typeof _0x3399d6=='string'){
		try{
			return JSON.parse(_0x3399d6);
		}catch(_0x1968ba){
			console.log(_0x1968ba);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x4d4ac2=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x328da8='';
		if($.shopactivityId)_0x328da8=',"activityId":'+$.shopactivityId;
		const _0xf7d281='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x328da8+',"channel":406}';
		const _0x257a67={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0xf7d281)};
		const _0x523a2a=await getH5st('8adfb',_0x257a67);
		const _0x218ca3={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0xf7d281+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x523a2a),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x218ca3,async(_0x2a26dd,_0x2a07e5,_0x421b9b)=>{
			try{
				_0x421b9b=_0x421b9b&&_0x421b9b.match(/jsonp_.*?\((.*?)\);/)&&_0x421b9b.match(/jsonp_.*?\((.*?)\);/)[1]||_0x421b9b;
				let _0x3dd1a0=$.toObj(_0x421b9b,_0x421b9b);
				if(_0x3dd1a0&&typeof _0x3dd1a0=='object'){
					if(_0x3dd1a0&&_0x3dd1a0.success===true){
						console.log(' >> '+_0x3dd1a0.message);
						$.errorJoinShop=_0x3dd1a0.message;
						if(_0x3dd1a0.result&&_0x3dd1a0.result['giftInfo']){
							for(let _0x54b421 of _0x3dd1a0.result['giftInfo']['giftList']){
								console.log(' >> 入会获得：'+_0x54b421.discountString+_0x54b421.prizeName+_0x54b421.secondLineDesc);
							}
						}
					}else if(_0x3dd1a0&&typeof _0x3dd1a0=='object'&&_0x3dd1a0.message){
						$.errorJoinShop=_0x3dd1a0.message;
						console.log(''+(_0x3dd1a0.message||''));
					}else{
						console.log(_0x421b9b);
					}
				}else{
					console.log(_0x421b9b);
				}
			}catch(_0x449b61){
				$.logErr(_0x449b61,_0x2a07e5);
			}finally{
				_0x4d4ac2();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x3d2ca6=>{
		const _0x1045ac='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x3c71cb={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x1045ac)};
		const _0x222287=await getH5st('8adfb',_0x3c71cb);
		const _0x42b180={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x1045ac+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x222287),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x42b180,async(_0xe61cbe,_0xb848ee,_0xdd9512)=>{
			try{
				_0xdd9512=_0xdd9512&&_0xdd9512.match(/jsonp_.*?\((.*?)\);/)&&_0xdd9512.match(/jsonp_.*?\((.*?)\);/)[1]||_0xdd9512;
				let _0x51d742=$.toObj(_0xdd9512,_0xdd9512);
				if(_0x51d742&&typeof _0x51d742=='object'){
					if(_0x51d742&&_0x51d742.success==true){
						console.log('去加入：'+(_0x51d742.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x51d742.result['interestsRuleList']&&_0x51d742.result['interestsRuleList'][0]&&_0x51d742.result['interestsRuleList'][0]['interestsInfo']&&_0x51d742.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0xdd9512);
				}
			}catch(_0x46269a){
				$.logErr(_0x46269a,_0xb848ee);
			}finally{
				_0x3d2ca6();
			}
		});
	});
}
function getH5st(_0x3d3aed,_0x5e7d49){
	return new Promise(async _0x204759=>{
		let _0x412a8f={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x3d3aed+'&req='+encodeURIComponent(JSON.stringify(_0x5e7d49)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x412a8f,(_0x703b24,_0x2a1948,_0x489228)=>{
			try{
				if(_0x703b24){
					console.log(JSON.stringify(_0x703b24));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x447949){
				$.logErr(_0x447949,_0x2a1948);
			}finally{
				_0x204759(_0x489228);
			}
		});
	});
}
function random(_0x1b2abf,_0x35dbec){
	return Math.floor(Math.random()*(_0x35dbec-_0x1b2abf))+_0x1b2abf;
}
function jsonParse(_0x3ed690){
	if(typeof _0x3ed690=='string'){
		try{
			return JSON.parse(_0x3ed690);
		}catch(_0x3dad8e){
			console.log(_0x3dad8e);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};