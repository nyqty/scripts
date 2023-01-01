/*
12.1-12.31 云养牛，免费赢好礼

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本


入口：[ 12.1-12.31 云养牛，免费赢好礼]

请求太频繁会被黑ip
过10分钟再执行

cron:12 13 * * *
============Quantumultx===============
[task_local]
#12.1-12.31 云养牛，免费赢好礼
12 13 * * * jd_mnyyn.js, tag=12.1-12.31 云养牛，免费赢好礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.1-12.31 云养牛，免费赢好礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzdz1-isv.isvjd.com';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x23ae10=>{
		cookiesArr.push(jdCookieNode[_0x23ae10]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x1b4882=>_0x1b4882.cookie)]['filter'](_0x1fddcc=>!!_0x1fddcc);
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
	authorCodeList=[];//await getAuthorCodeList('http://code.kingran.ga/mnyyn.json');
	$.activityId='dzaddfbca448da2647c0b6da5d1c9';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	console.log('入口:\nhttps://lzdz1-isv.isvjd.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	for(let _0x17aec2=0;_0x17aec2<cookiesArr.length;_0x17aec2++){
		cookie=cookiesArr[_0x17aec2];
		originCookie=cookiesArr[_0x17aec2];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x17aec2+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if(_0x17aec2==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x3865b2='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x3865b2);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x3865b2);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x1a0e6c=>$.logErr(_0x1a0e6c))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x176221=false;
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
		let _0x236475=parseInt(60-$.loadMinute);
		console.log('当前收草剩余时间:'+_0x236475+' 分钟');
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
			let _0xf10422=parseInt(10*$.cowLevel);
			console.log('当前等级喂养饲料需:'+_0xf10422);
			let _0x4c0c04=parseInt($.score/_0xf10422);
			console.log('当前可喂养次数为:'+_0x4c0c04);
			for(m=1;_0x4c0c04--;m++){
				console.log('第'+m+'次喂养');
				await takePostRequest('喂养');
				if($.runFalag==false)break;
				if(Number(_0x4c0c04)<=0)break;
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
			let _0x4ea6bb=parseInt($.canDrawTimes/1);
			console.log('当前可抽奖次数为:'+_0x4ea6bb);
			for(m=1;_0x4ea6bb--;m++){
				console.log('第'+m+'次抽奖');
				await takePostRequest('抽奖');
				if($.runFalag==false)break;
				if(Number(_0x4ea6bb)<=0)break;
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
	}catch(_0x254391){
		console.log(_0x254391);
	}
}
async function takePostRequest(_0x26e1be){
	if($.outFlag)return;
	let _0x3fde1d='https://lzdz1-isv.isvjd.com';
	let _0x5c916a='';
	let _0x2c7327='POST';
	let _0x5c5602='';
	switch(_0x26e1be){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x5c916a='body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=ab640b5dc76b89426f72115f5b2e06e934a5fbe9&client=apple&clientVersion=10.1.4&st=1650250640876&sv=102&sign=7ea66dcb2969eff53c43b5b8a4937dbe';
			break;
		case 'getSimpleActInfoVo':
			url=_0x3fde1d+'/dz/common/getSimpleActInfoVo';
			_0x5c916a='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x3fde1d+'/customer/getMyPing';
			_0x5c916a='userId='+($.shopId||$.venderId||'')+'&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x3fde1d+'/common/accessLogWithAD';
			let _0x37f94d=_0x3fde1d+'/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x5c916a='venderId='+($.shopId||$.venderId||'')+'&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x37f94d)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x3fde1d+'/wxActionCommon/getUserInfo';
			_0x5c916a='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/activityContent';
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x3fde1d+'/dingzhi/taskact/common/drawContent';
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getRankList':
			url=_0x3fde1d+'/dingzhi/taskact/common/getRankList';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid;
			break;
		case'checkOpenCard':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/initOpenCard';
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'info':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/task/opencard/info';
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'startDraw':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveTask';
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&drawType=1';
			break;
		case '关注店铺':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=1&taskValue=1000014803';
			break;
		case'浏览好物1':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100008226516';
			break;
		case '每日签到':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=0&taskValue=1000014803';
			break;
		case '浏览好物2':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100003661795';
			break;
		case '浏览好物3':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100004891782';
			break;
		case'加购':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=21&taskValue=2693720';
			break;
		case '额外奖励1':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=1';
			break;
		case '额外奖励2':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=2';
			break;
		case '额外奖励3':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=3';
			break;
		case'喂养':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/feedCow';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case'名称':
			let _0x52aba6=['赵','钱','蒋','张','金','章','葛','昌','鲍','苏','许','范','尤','水','白','蔺','叶','桂','甘','青','藏','川','宁','琼'];
			$.char0=_0x52aba6[random(0,_0x52aba6.length)];
			let _0x211d59=['日天','下地','上天','MM','GG','明星','善扣','中华','淡尘','星河','夕阳','心动','野女','烈酒','失去','清酒','萝莉','默','卡','星光','配角','川','宁','琼'];
			$.char1=_0x211d59[random(0,_0x211d59.length)];
			$.char2=''+$.char0+$.char1;
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveCow';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&cowNick='+encodeURIComponent($.char2);
			break;
		case'收草':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/saveForage';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case'getTaskDetail':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/getTaskDetail';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case'sign':
		case 'addCart':
		case 'browseGoods':
			url=_0x3fde1d+'/dingzhi/opencard/'+_0x26e1be;
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0x26e1be=='browseGoods')_0x5c916a+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(_0x26e1be=='助力'){
				url=_0x3fde1d+'/dingzhi/mengniumilk/grow/assist';
			}else{
				url=_0x3fde1d+'/dingzhi/mengniumilk/grow/assist/status';
			}
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=_0x3fde1d+'/dingzhi/opencard/'+_0x26e1be;
			let _0x302089='';
			let _0x2c0b8f='';
			if(_0x26e1be=='viewVideo'){
				_0x302089=31;
				_0x2c0b8f=31;
			}else if(_0x26e1be=='visitSku'){
				_0x302089=5;
				_0x2c0b8f=$.visitSkuValue||5;
			}else if(_0x26e1be=='toShop'){
				_0x302089=14;
				_0x2c0b8f=$.toShopValue||14;
			}else if(_0x26e1be=='addSku'){
				_0x302089=2;
				_0x2c0b8f=$.addSkuValue||2;
			}
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x302089+'&taskValue='+_0x2c0b8f;
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x3fde1d+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/help/list';
			_0x5c916a='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'抽奖':
			url=_0x3fde1d+'/dingzhi/mengniumilk/grow/start';
			_0x5c916a='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x26e1be);
	}
	let _0x34cfed=getPostRequest(url,_0x5c916a,_0x2c7327);
	return new Promise(async _0x2b26ab=>{
		$.post(_0x34cfed,(_0x2b036e,_0x59e662,_0x2e5ef5)=>{
			try{
				setActivityCookie(_0x59e662);
				if(_0x2b036e){
					if(_0x59e662&&typeof _0x59e662.statusCode!='undefined'){
						if(_0x59e662.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x2b036e,_0x2b036e));
					console.log(_0x26e1be+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x26e1be,_0x2e5ef5);
				}
			}catch(_0x23b22c){
				console.log(_0x23b22c,_0x59e662);
			}finally{
				_0x2b26ab();
			}
		});
	});
}
async function dealReturn(_0x153954,_0x58566f){
	let _0x3761fa='';
	try{
		if(_0x153954!='accessLogWithAD'||_0x153954!='drawContent'){
			if(_0x58566f){
				_0x3761fa=JSON.parse(_0x58566f);
			}
		}
	}catch(_0x29b4de){
		console.log(_0x153954+' 执行任务异常');
		console.log(_0x58566f);
		$.runFalag=false;
	}
	try{
		switch(_0x153954){
			case 'isvObfuscator':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.errcode==0){
						if(typeof _0x3761fa.token!='undefined')$.Token=_0x3761fa.token;
					}else if(_0x3761fa.message){
						console.log('isvObfuscator '+(_0x3761fa.message||''));
					}else{
						console.log(_0x58566f);
					}
				}else{
					console.log(_0x58566f);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						if(typeof _0x3761fa.data['shopId']!='undefined')$.shopId=_0x3761fa.data['shopId'];
						if(typeof _0x3761fa.data['venderId']!='undefined')$.venderId=_0x3761fa.data['venderId'];
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case 'getMyPing':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						if(_0x3761fa.data&&typeof _0x3761fa.data['secretPin']!='undefined')$.Pin=_0x3761fa.data['secretPin'];
						if(_0x3761fa.data&&typeof _0x3761fa.data['nickname']!='undefined')$.nickname=_0x3761fa.data['nickname'];
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						if(_0x3761fa.data&&typeof _0x3761fa.data['yunMidImageUrl']!='undefined')$.attrTouXiang=_0x3761fa.data['yunMidImageUrl']||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case 'activityContent':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						$.endTime=_0x3761fa.data['endTime']||_0x3761fa.data['activityVo']&&_0x3761fa.data['activityVo']['endTime']||_0x3761fa.data['activity']['endTime']||0;
						$.hasEnd=_0x3761fa.data['isEnd']||false;
						$.score=_0x3761fa.data['score']||0;
						$.cowLevel=_0x3761fa.data['cowLevel']||0;
						$.shareSocre=_0x3761fa.data['shareSocre']||0;
						$.loadMinute=_0x3761fa.data['loadMinute'];
						$.signLevel=_0x3761fa.data['signLevel']||0;
						$.actorUuid=_0x3761fa.data['actorUuid']||'';
						$.assistCount=_0x3761fa.data['assistCount']||0;
						$.assistStatus=_0x3761fa.data['assistStatus']||0;
						$.canDrawTimes=_0x3761fa.data['canDrawTimes']||0;
						$.cowName=_0x3761fa.data['cowName']||'';
						$.remainderTimes=_0x3761fa.data['remainderTimes']||0;
						$.feedTimes=_0x3761fa.data['feedTimes']||0;
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case 'getTaskDetail':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						$.taskTimes=_0x3761fa.data['dayTask']['taskTimes'];
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case 'info':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						$.addCart=_0x3761fa.data['addCart']||false;
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case '关注店铺':
			case '浏览好物1':
			case '每日签到':
			case '浏览好物2':
			case '浏览好物3':
			case'加购':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						console.log('任务完成，获得饲料：'+_0x3761fa.data['score']);
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case '额外奖励1':
			case '额外奖励2':
			case'额外奖励3':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						console.log('任务完成，获得饲料：'+_0x3761fa.data['addScore']);
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case'喂养':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						console.log('衰仔，执行成功，喂养次数：'+_0x3761fa.data['feedTimes']);
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case'名称':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						console.log('衰仔，成功取名：'+_0x3761fa.data['cowNick']+'  (*￣︶￣)');
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case'收草':
			case '卖豆乳':
			case '卖燕麦牛奶':
			case'卖豆乳':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						console.log('衰仔，执行成功，剩余饲料：'+_0x3761fa.data['addScore']);
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						let _0x2b5eca=_0x3761fa.data['openInfo']||[];
						$.openList=[..._0x2b5eca];
						$.allOpenCard=_0x3761fa.data['allOpenCard']||_0x3761fa.data['isOpenCardStatus']||false;
						if(_0x3761fa.data['beans']||_0x3761fa.data['addBeanNum'])console.log('开卡获得:'+(_0x3761fa.data['beans']||_0x3761fa.data['addBeanNum'])+'豆');
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case 'startDraw':
			case 'followShop':
			case 'viewVideo':
			case 'visitSku':
			case'toShop':
			case 'addSku':
			case 'sign':
			case 'addCart':
			case 'browseGoods':
			case'抽奖':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						if(typeof _0x3761fa.data=='object'){
							let _0x74e98f='';
							let _0x441cdc='抽奖';
							if(_0x3761fa.data['addBeanNum']){
								_0x74e98f=_0x3761fa.data['addBeanNum']+'京豆';
							}
							if(_0x3761fa.data['addPoint']){
								_0x74e98f+=' '+_0x3761fa.data['addPoint']+'游戏机会';
							}
							if(_0x153954=='followShop'){
								_0x441cdc='关注';
								if(_0x3761fa.data['beanNumMember']&&_0x3761fa.data['assistSendStatus']){
									_0x74e98f+=' 额外获得:'+_0x3761fa.data['beanNumMember']+'京豆';
								}
							}else if(_0x153954=='addSku'||_0x153954=='addCart'){
								_0x441cdc='加购';
							}else if(_0x153954=='viewVideo'){
								_0x441cdc='热门文章';
							}else if(_0x153954=='toShop'){
								_0x441cdc='浏览店铺';
							}else if(_0x153954=='visitSku'||_0x153954=='browseGoods'){
								_0x441cdc='浏览商品';
							}else if(_0x153954=='sign'){
								_0x441cdc='签到';
							}else{
								let _0x25f4a7=typeof _0x3761fa.data['drawOk']==='object'&&_0x3761fa.data['drawOk']||_0x3761fa.data;
								_0x74e98f=_0x25f4a7.drawOk==true&&_0x25f4a7.name||'';
							}
							if(_0x441cdc=='抽奖'&&_0x74e98f&&_0x74e98f.indexOf('京豆')==-1){
								if($.isNode())await notify.sendNotify(''+$.name,'【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n'+_0x441cdc+'成功,获得 '+_0x74e98f+'\n');
							}
							if(!_0x74e98f){
								_0x74e98f='空气💨';
							}
							console.log(_0x441cdc+'获得:'+(_0x74e98f||_0x58566f));
						}else{
							console.log(_0x153954+' '+_0x58566f);
						}
					}else if(_0x3761fa.errorMessage){
						$.runFalag=false;
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case'getDrawRecordHasCoupon':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true){
						console.log('我的奖品：');
						let _0x6db167=0;
						let _0x1593bf=0;
						let _0x408dcf=0;
						for(let _0x3df4e0 in _0x3761fa.data){
							let _0x310095=_0x3761fa.data[_0x3df4e0];
							if(_0x310095.infoName==''&&_0x310095.sendStatus==0){
								_0x6db167++;
								_0x1593bf=_0x310095.infoName['replace']('','');
								_0x408dcf=_0x408dcf<_0x310095.createTime?_0x310095.createTime:_0x408dcf;
							}else{
								console.log(''+(_0x310095.infoType!=10&&_0x310095.value&&_0x310095.value+':'||'')+_0x310095.infoName);
							}
						}
						if(_0x408dcf>0)console.log('最新邀请奖励时间:'+$.time('yyyy-MM-dd HH:mm:ss',_0x408dcf));
						if(_0x6db167>0)console.log('邀请好友('+_0x6db167+'):'+(_0x6db167*parseInt(_0x1593bf,10)||30)+'京豆');
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.result&&_0x3761fa.result===true&&_0x3761fa.data){
						$.ShareCount=_0x3761fa.data['shareList']['length'];
						$.log('=========== 你邀请了:'+$.ShareCount+'个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n');
					}else if(_0x3761fa.errorMessage){
						console.log(_0x153954+' '+(_0x3761fa.errorMessage||''));
					}else{
						console.log(_0x153954+' '+_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
				break;
			case'邀请':
			case'助力':
				if(typeof _0x3761fa=='object'){
					if(_0x3761fa.data['status']==200){
						if(_0x153954=='助力'){
							console.log('助力成功');
						}else{
							$.yaoqing=true;
						}
					}else if(_0x3761fa.data['status']==105){
						console.log('已经助力过');
					}else if(_0x3761fa.data['status']==104){
						console.log('已经助力其他人');
					}else if(_0x3761fa.data['status']==101){}else{
						console.log(_0x58566f);
					}
				}else{
					console.log(_0x153954+' '+_0x58566f);
				}
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x153954+'-> '+_0x58566f);
		}
		if(typeof _0x3761fa=='object'){
			if(_0x3761fa.errorMessage){
				if(_0x3761fa.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x61ca27){
		console.log(_0x61ca27);
	}
}
function getPostRequest(_0x4c788b,_0x5b89ae,_0x495554='POST'){
	let _0x144faf={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x4c788b.indexOf('https://lzdz1-isv.isvjd.com')>-1){
		_0x144faf.Referer='https://lzdz1-isv.isvjd.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x144faf.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x4c788b,'method':_0x495554,'headers':_0x144faf,'body':_0x5b89ae,'timeout':30000};
}
function getCk(){
	return new Promise(_0x2baf15=>{
		let _0x3c34b3={'url':'https://lzdz1-isv.isvjd.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(_0x3c34b3,async(_0x52ef5e,_0x9b3591,_0x1571df)=>{
			try{
				if(_0x52ef5e){
					if(_0x9b3591&&typeof _0x9b3591.statusCode!='undefined'){
						if(_0x9b3591.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x52ef5e));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x1bf7d9=_0x1571df.match(/(活动已经结束)/)&&_0x1571df.match(/(活动已经结束)/)[1]||'';
					if(_0x1bf7d9){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x9b3591);
				}
			}catch(_0x4d9b24){
				$.logErr(_0x4d9b24,_0x9b3591);
			}finally{
				_0x2baf15();
			}
		});
	});
}
function setActivityCookie(_0x4df6e7){
	if(_0x4df6e7){
		if(_0x4df6e7.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x333fdf of _0x4df6e7.headers['set-cookie']){
				lz_cookie[_0x333fdf.split(';')[0]['substr'](0,_0x333fdf.split(';')[0]['indexOf']('='))]=_0x333fdf.split(';')[0]['substr'](_0x333fdf.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x1949ca of Object.keys(lz_cookie)){
				cookie+=_0x1949ca+'='+lz_cookie[_0x1949ca]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x4671e2){
	_0x4671e2=_0x4671e2||32;
	let _0x73a9f2='abcdef0123456789',_0x478b49=_0x73a9f2.length,_0x28113d='';
	for(i=0;i<_0x4671e2;i++)_0x28113d+=_0x73a9f2.charAt(Math.floor(Math.random()*_0x478b49));
	return _0x28113d;
}
function jsonParse(_0x5cccd8){
	if(typeof _0x5cccd8=='string'){
		try{
			return JSON.parse(_0x5cccd8);
		}catch(_0x2905d3){
			console.log(_0x2905d3);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x4c9e37=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x3b21f4='';
		if($.shopactivityId)_0x3b21f4=',"activityId":'+$.shopactivityId;
		const _0x1a4860='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x3b21f4+',"channel":406}';
		const _0x1a5899={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x1a4860)};
		const _0x2915dd=await getH5st('8adfb',_0x1a5899);
		const _0x2a1d00={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x1a4860+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x2915dd),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x2a1d00,async(_0x1d55ff,_0xfa5666,_0x19a968)=>{
			try{
				_0x19a968=_0x19a968&&_0x19a968.match(/jsonp_.*?\((.*?)\);/)&&_0x19a968.match(/jsonp_.*?\((.*?)\);/)[1]||_0x19a968;
				let _0x4df091=$.toObj(_0x19a968,_0x19a968);
				if(_0x4df091&&typeof _0x4df091=='object'){
					if(_0x4df091&&_0x4df091.success===true){
						console.log(' >> '+_0x4df091.message);
						$.errorJoinShop=_0x4df091.message;
						if(_0x4df091.result&&_0x4df091.result['giftInfo']){
							for(let _0x5539e0 of _0x4df091.result['giftInfo']['giftList']){
								console.log(' >> 入会获得：'+_0x5539e0.discountString+_0x5539e0.prizeName+_0x5539e0.secondLineDesc);
							}
						}
					}else if(_0x4df091&&typeof _0x4df091=='object'&&_0x4df091.message){
						$.errorJoinShop=_0x4df091.message;
						console.log(''+(_0x4df091.message||''));
					}else{
						console.log(_0x19a968);
					}
				}else{
					console.log(_0x19a968);
				}
			}catch(_0x73edc2){
				$.logErr(_0x73edc2,_0xfa5666);
			}finally{
				_0x4c9e37();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x41f2f6=>{
		const _0x590d84='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x560b4d={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x590d84)};
		const _0x6d944d=await getH5st('8adfb',_0x560b4d);
		const _0x233ec2={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x590d84+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x6d944d),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x233ec2,async(_0x51dffc,_0x3fc880,_0x205149)=>{
			try{
				_0x205149=_0x205149&&_0x205149.match(/jsonp_.*?\((.*?)\);/)&&_0x205149.match(/jsonp_.*?\((.*?)\);/)[1]||_0x205149;
				let _0x1ceabd=$.toObj(_0x205149,_0x205149);
				if(_0x1ceabd&&typeof _0x1ceabd=='object'){
					if(_0x1ceabd&&_0x1ceabd.success==true){
						console.log('去加入：'+(_0x1ceabd.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x1ceabd.result['interestsRuleList']&&_0x1ceabd.result['interestsRuleList'][0]&&_0x1ceabd.result['interestsRuleList'][0]['interestsInfo']&&_0x1ceabd.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x205149);
				}
			}catch(_0xdffba8){
				$.logErr(_0xdffba8,_0x3fc880);
			}finally{
				_0x41f2f6();
			}
		});
	});
}
function getH5st(_0xe35ebc,_0x590312){
	return new Promise(async _0x15bf68=>{
		let _0x52351d={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0xe35ebc+'&req='+encodeURIComponent(JSON.stringify(_0x590312)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x52351d,(_0x67d1b,_0x4fb44e,_0x432b8e)=>{
			try{
				if(_0x67d1b){
					console.log(JSON.stringify(_0x67d1b));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x3c490b){
				$.logErr(_0x3c490b,_0x4fb44e);
			}finally{
				_0x15bf68(_0x432b8e);
			}
		});
	});
}
function getAuthorCodeList(_0x19eb04){
	return new Promise(_0x5d2787=>{
		const _0x39802a={'url':_0x19eb04+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x39802a,async(_0x43137f,_0x259e6c,_0x5f1e2a)=>{
			try{
				if(_0x43137f){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x5f1e2a)_0x5f1e2a=JSON.parse(_0x5f1e2a);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x46c746){
				$.logErr(_0x46c746,_0x259e6c);
				_0x5f1e2a=null;
			}finally{
				_0x5d2787(_0x5f1e2a);
			}
		});
	});
}
function random(_0x224b8d,_0x10a97b){
	return Math.floor(Math.random()*(_0x10a97b-_0x224b8d))+_0x224b8d;
}
function jsonParse(_0x34ae6b){
	if(typeof _0x34ae6b=='string'){
		try{
			return JSON.parse(_0x34ae6b);
		}catch(_0x925b0d){
			console.log(_0x925b0d);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};