/*
集卡抽奖通用活动

第一个CK失效会退出脚本

6.15更新：自动开通店铺会员
12.24更新：修复获取token失败

请求太频繁会被黑ip

变量：
//export jd_wxCollectCard_activityId="活动ID"
//export JD_LZ_OPEN="false" //关闭LZ相关活动运行
//export jd_wxCollectCard_blacklist="" //黑名单 用&隔开 pin值
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId=xxxxxxx

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#集卡抽奖通用活动
1 1 1 1 * jd_wxCollectCard.js, tag=集卡抽奖通用活动, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('集卡抽奖通用活动');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjcloud.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x51ad7b=>{
		cookiesArr.push(jdCookieNode[_0x51ad7b]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x594b9d=>_0x594b9d.cookie)]['filter'](_0xc75f02=>!!_0xc75f02);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let lz_cookie={};
let Signz='';
let jd_wxCollectCard_activityId='';
jd_wxCollectCard_activityId=$.isNode()?process.env['jd_wxCollectCard_activityId']?process.env['jd_wxCollectCard_activityId']:''+jd_wxCollectCard_activityId:$.getdata('jd_wxCollectCard_activityId')?$.getdata('jd_wxCollectCard_activityId'):''+jd_wxCollectCard_activityId;
let lzopen=process.env['JD_LZ_OPEN']?process.env['JD_LZ_OPEN']:'true';
let whitelist='';
let blacklist='';
$.whitelist=process.env['jd_wxCollectCard_whitelist']||whitelist;
$.blacklist=process.env['jd_wxCollectCard_blacklist']||blacklist;
getWhitelist();
getBlacklist();
!(async()=>{
	if(lzopen==='false'){
		console.log('\n❌  已设置全局关闭LZ相关活动\n');
		return;
	}
	if(!jd_wxCollectCard_activityId){
		console.log('\n衰仔、请填写集卡抽奖的活动ID,变量是jd_wxCollectCard_activityId\n');
		return;
	}
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId=jd_wxCollectCard_activityId;
	$.shareUuid='';
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId);
	for(let _0x3858c0=0;_0x3858c0<cookiesArr.length;_0x3858c0++){
		cookie=cookiesArr[_0x3858c0];
		originCookie=cookiesArr[_0x3858c0];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x3858c0+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x3858c0==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	cookie=cookiesArr[0];
	if(cookie&&$.assistStatus&&!$.outFlag&&!$.activityEnd){
		$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
		$.index=1;
		message='';
		$.bean=0;
		$.hotFlag=false;
		$.nickName='';
		console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
		await $.wait(parseInt(Math.random()*2000+2000,10));
		await getUA();
		await runs();
		await $.wait(3000);
	}
	if($.outFlag){
		let _0x16a479='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x16a479);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x16a479);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x2daf3e=>$.logErr(_0x2daf3e))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x568e3e=false;
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
		await $.wait(1000);
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await $.wait(1000);
		await takePostRequest('getActMemberInfo');
		if(!$.openCard){
			$.shopactivityId='';
			$.joinVenderId=$.venderId;
			await getshopactivityId();
			for(let _0x595138=0;_0x595138<Array(5)['length'];_0x595138++){
				if(_0x595138>0)console.log('第'+_0x595138+'次 重新开卡');
				await joinShop();
				await $.wait(500);
				if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')==-1){
					break;
				}
			}
		}
		await takePostRequest('getUserInfo');
		await $.wait(1000);
		await takePostRequest('activityContent');
		await takePostRequest('shopInfo');
		await takePostRequest('saveSource');
		await $.wait(1000);
		if($.index==1){
			console.log('活动获取成功，助力码：'+$.actorUuid+'\n');
			console.log('\n当前活动店铺：'+$.shopName+'\n当前集卡成功人数：'+$.gatherCount+'\n');
			console.log('目前已集齐卡片详情：');
			for(const _0x73b94e of $.cardList){
				_0x568e3e=true;
				$.cardName=_0x73b94e.cardName;
				$.count=_0x73b94e.count;
				console.log('卡片：'+$.cardName+' , '+$.count+'张');
			}
			$.assistStatus=true;
		}
		if($.index!=1){
			await takePostRequest('drawCard');
			await takePostRequest('drawCard2');
		}
		if($.hotFlag)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('\n衰仔、全部助力→:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(_0x47a051){
		console.log(_0x47a051);
	}
}
async function runs(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x5e896a=false;
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
		await $.wait(1000);
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await $.wait(1000);
		await takePostRequest('getActMemberInfo');
		await takePostRequest('getUserInfo');
		await $.wait(1000);
		await takePostRequest('activityContent');
		await takePostRequest('shopInfo');
		await $.wait(1000);
		await takePostRequest('saveSource');
		await $.wait(1000);
		console.log('\n当前活动店铺：'+$.shopName+'\n当前集卡成功人数：'+$.gatherCount+'\n');
		console.log('目前已集齐卡片详情：');
		const _0x4c4bb4=new Set();
		for(const _0x2fed39 of $.cardList){
			_0x5e896a=true;
			$.cardName=_0x2fed39.cardName;
			$.count=_0x2fed39.count;
			_0x2fed39.count>=0?_0x4c4bb4.add(_0x2fed39.count):'';
			console.log('卡片：'+$.cardName+' , '+$.count+'张');
		}
		console.log('\n当前活动每人可抽卡：'+$.drawCounts+'次');
		await takePostRequest('drawCard3');
		for(let _0x32a24a=0;_0x32a24a<$.canShakeTimes;_0x32a24a++){
			console.log('第'+(_0x32a24a+1)+'次抽卡');
			await takePostRequest('drawCard3');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		var _0x14f778=Array.from(_0x4c4bb4);
		var _0x3bf544=getMaxMin(_0x14f778,'min');
		console.log('\n目前已集齐可抽奖：'+_0x3bf544+'次');
		for(let _0x5b4b97=0;_0x5b4b97<_0x3bf544;_0x5b4b97++){
			console.log('第'+(_0x5b4b97+1)+'次抽奖');
			await takePostRequest('getPrize');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.hotFlag)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(_0x1a5795){
		console.log(_0x1a5795);
	}
}
async function takePostRequest(_0x54624e){
	if($.outFlag)return;
	let _0x119ae9='https://lzkjdz-isv.isvjcloud.com';
	let _0x2935ec='';
	let _0x11660e='POST';
	let _0x41849e='';
	switch(_0x54624e){
		case'getMyPing':
			url=_0x119ae9+'/customer/getMyPing';
			_0x2935ec='token='+$.Token+'&fromType=APP&userId='+$.venderId;
			break;
		case 'shopInfo':
			url=_0x119ae9+'/wxCollectCard/shopInfo';
			_0x2935ec='activityId='+$.activityId;
			break;
		case 'getSimpleActInfoVo':
			url=_0x119ae9+'/customer/getSimpleActInfoVo';
			_0x2935ec='activityId='+$.activityId;
			break;
		case'getActMemberInfo':
			url=_0x119ae9+'/wxCommonInfo/getActMemberInfo';
			_0x2935ec='venderId='+$.venderId+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'accessLogWithAD':
			url=_0x119ae9+'/common/accessLogWithAD';
			let _0x2d03a2='https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x2935ec='venderId='+($.shopId||$.venderId||'')+'&code=42&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x2d03a2)+'&subType=app&adSource=';
			break;
		case'getUserInfo':
			url=_0x119ae9+'/wxActionCommon/getUserInfo';
			_0x2935ec='pin='+encodeURIComponent($.Pin);
			break;
		case 'drawCard':
			url=_0x119ae9+'/wxCollectCard/drawCard';
			_0x2935ec='&sourceId='+$.shareUuid+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&jdNick='+encodeURIComponent($.jdNick)+'&type=1';
			break;
		case 'drawCard2':
			url=_0x119ae9+'/wxCollectCard/drawCard';
			_0x2935ec='&sourceId='+$.shareUuid+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&type=2';
			break;
		case 'drawCard3':
			url=_0x119ae9+'/wxCollectCard/drawCard';
			_0x2935ec='&sourceId='+$.actorUuid+'&activityId='+$.activityId+'&type=0';
			break;
		case 'drawContent':
			url=_0x119ae9+'/wxCollectCard/drawContent';
			_0x2935ec='activityId='+$.activityId;
			break;
		case'activityContent':
			url=_0x119ae9+'/wxCollectCard/activityContent';
			_0x2935ec='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.shareUuid;
			break;
		case 'saveSource':
			url=_0x119ae9+'/wxCollectCard/saveSource';
			_0x2935ec='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&jdNick='+encodeURIComponent($.jdNick);
			break;
		case 'drawResult':
			url=_0x119ae9+'/wxCollectCard/drawResult';
			_0x2935ec='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'followShop':
			url=_0x119ae9+'/wxActionCommon/followShop';
			_0x2935ec='userId='+$.venderId+'&activityType=70&buyerNick='+encodeURIComponent($.Pin)+'&activityId='+$.activityId;
			break;
		case 'getPrize':
			url=_0x119ae9+'/wxCollectCard/getPrize';
			_0x2935ec='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x54624e);
	}
	let _0x1a02f8=getPostRequest(url,_0x2935ec,_0x11660e);
	return new Promise(async _0x4def80=>{
		$.post(_0x1a02f8,(_0x110ddb,_0x19cefc,_0x2bbb91)=>{
			try{
				setActivityCookie(_0x19cefc);
				if(_0x110ddb){
					if(_0x19cefc&&typeof _0x19cefc.statusCode!='undefined'){
						if(_0x19cefc.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x110ddb,_0x110ddb));
					console.log(_0x54624e+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x54624e,_0x2bbb91);
				}
			}catch(_0x4160a2){
				console.log(_0x4160a2,_0x19cefc);
			}finally{
				_0x4def80();
			}
		});
	});
}
async function dealReturn(_0x361578,_0x31425f){
	let _0x2eed47='';
	try{
		if(_0x361578!='accessLogWithAD'||_0x361578!='drawContent'){
			if(_0x31425f){
				_0x2eed47=JSON.parse(_0x31425f);
			}
		}
	}catch(_0x13dc32){
		console.log(_0x361578+' 执行任务异常');
		console.log(_0x31425f);
		$.runFalag=false;
	}
	try{
		switch(_0x361578){
			case 'getMyPing':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						if(_0x2eed47.data&&typeof _0x2eed47.data['secretPin']!='undefined')$.Pin=_0x2eed47.data['secretPin'];
						if(_0x2eed47.data&&typeof _0x2eed47.data['nickname']!='undefined')$.nickname=_0x2eed47.data['nickname'];
					}else if(_0x2eed47.errorMessage){
						console.log(_0x361578+' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(_0x361578+' '+_0x31425f);
					}
				}else{}
				break;
			case 'shopInfo':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						$.shopName=_0x2eed47.data['shopName']||'';
					}else if(_0x2eed47.errorMessage){
						console.log(_0x361578+' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(_0x361578+' '+_0x31425f);
					}
				}else{
					console.log(_0x361578+' '+_0x31425f);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						if(typeof _0x2eed47.data['shopId']!='undefined')$.shopId=_0x2eed47.data['shopId'];
						if(typeof _0x2eed47.data['venderId']!='undefined')$.venderId=_0x2eed47.data['venderId'];
					}else if(_0x2eed47.errorMessage){
						console.log(_0x361578+' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(_0x361578+' '+_0x31425f);
					}
				}else{}
				break;
			case 'getUserInfo':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						$.pinImg=_0x2eed47.data['yunMidImageUrl']||'';
						$.jdNick=_0x2eed47.data['nickname']||'';
					}else if(_0x2eed47.errorMessage){
						console.log(_0x361578+' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(_0x361578+' '+_0x31425f);
					}
				}else{
					console.log(_0x361578+' '+_0x31425f);
				}
				break;
			case 'activityContent':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						$.cardList=_0x2eed47.data['cardList']||[];
						$.helpStatus=_0x2eed47.data['canDraw']||false;
						$.canShake=_0x2eed47.data['canShake']||true;
						$.canCreate=_0x2eed47.data['canCreate']||true;
						$.canAssist=_0x2eed47.data['canAssist']||true;
						$.gatherCount=_0x2eed47.data['gatherCount']||0;
						$.drawCount=_0x2eed47.data['rule']['match'](/每人每天可获得(\d+)次/);
						if($.drawCount){
							$.drawCounts=$.drawCount[1];
						}
					}else if(_0x2eed47.errorMessage){
						if(_0x2eed47.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(''+(_0x2eed47.errorMessage||''));
					}else{
						console.log(''+_0x31425f);
					}
				}else{
					console.log(''+_0x31425f);
				}
				break;
			case 'saveSource':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						$.actorUuid=_0x2eed47.data||'';
					}else if(_0x2eed47.errorMessage){
						console.log(_0x361578+' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(_0x361578+' '+_0x31425f);
					}
				}else{
					console.log(_0x361578+' '+_0x31425f);
				}
				break;
			case'drawCard':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						console.log('获得：'+(_0x2eed47.data['reward']['cardName']||''));
					}else if(_0x2eed47.errorMessage){
						console.log(''+(_0x2eed47.errorMessage||''));
					}else{
						console.log(''+_0x31425f);
					}
				}else{
					console.log(_0x361578+' '+_0x31425f);
				}
				break;
			case 'drawCard2':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						console.log('获得：'+(_0x2eed47.data['reward']['cardName']||''));
					}else if(_0x2eed47.errorMessage){
						console.log(''+(_0x2eed47.errorMessage||''));
					}else{
						console.log(''+_0x31425f);
					}
				}else{}
				break;
			case 'drawCard3':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						$.canShakeTimes=_0x2eed47.data['canShakeTimes']||0;
						console.log('获得：'+(_0x2eed47.data['reward']['cardName']||''));
					}else if(_0x2eed47.errorMessage){
						console.log(' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(''+_0x31425f);
					}
				}else{}
				break;
			case 'getPrize':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true&&_0x2eed47.data['drawOk']===true){
						if(_0x2eed47.data){
							if(_0x2eed47.data['drawInfo']!=null){
								switch(_0x2eed47.data['drawInfo']['type']){
									case 4:
										console.log('再来一次');
										$.canDrawTimes+=1;
										break;
									case 6:
										console.log('🎉 '+_0x2eed47.data['drawInfo']['name']+' 🐶');
										break;
									case 7:
										console.log(_0x2eed47.data['drawInfo']);
										console.log('🎉 恭喜获得实物，去看看活动规则吧～');
										break;
									case 8:
										console.log('🗑️ 垃圾专享价');
										break;
									case 9:
										console.log('🗑️ '+_0x2eed47.data['drawInfo']['name']+' 🎟️');
										break;
									case 13:
										console.log('🎉 恭喜获得'+_0x2eed47.data['drawInfo']['name']+' 🎁');
										break;
									case 16:
										console.log('🎉 '+_0x2eed47.data['drawInfo']['priceInfo']+' 🧧');
										break;
									default:
										if(_0x2eed47.data['drawInfo']['name']['includes']('券')){
											console.log('🗑️ 垃圾优惠券');
										}else{
											console.log('获得：'+_0x2eed47.data['drawInfo']['name']);
										}
										break;
								}
							}else{
								console.log('💨  空气');
							}
						}else if(_0x31425f.errorMessage){
							console.log(_0x31425f.errorMessage);
						}else{
							console.log(JSON.stringify(_0x31425f));
						}
					}else if(_0x2eed47.errorMessage){
						console.log(' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(''+_0x31425f);
					}
				}else{}
				break;
			case 'drawContent':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						$.content=_0x2eed47.data['content']||[];
					}else if(_0x2eed47.errorMessage){
						console.log(_0x361578+' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(_0x361578+' '+_0x31425f);
					}
				}else{
					console.log(_0x361578+' '+_0x31425f);
				}
				break;
			case 'getActMemberInfo':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						$.openCard=_0x2eed47.data['openCard']||false;
					}else if(_0x2eed47.errorMessage){
						console.log(_0x361578+' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(_0x361578+' '+_0x31425f);
					}
				}else{
					console.log(_0x361578+' '+_0x31425f);
				}
				break;
			case 'drawResult':
				if(typeof _0x2eed47=='object'){
					if(_0x2eed47.result&&_0x2eed47.result===true){
						if(typeof _0x2eed47.data=='object'){
							let _0x4ec198='';
							if(_0x2eed47.data['drawName']){
								_0x4ec198=''+_0x2eed47.data['drawName'];
							}
							if(!_0x4ec198){
								_0x4ec198='空气💨';
							}
							console.log('获得:'+(_0x4ec198||_0x31425f));
						}else{
							console.log(_0x361578+' '+_0x31425f);
						}
					}else if(_0x2eed47.errorMessage){
						$.runFalag=false;
						console.log(_0x361578+' '+(_0x2eed47.errorMessage||''));
					}else{
						console.log(_0x361578+' '+_0x31425f);
					}
				}else{
					console.log(_0x361578+' '+_0x31425f);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x361578+'-> '+_0x31425f);
		}
		if(typeof _0x2eed47=='object'){
			if(_0x2eed47.errorMessage){
				if(_0x2eed47.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x27feda){
		console.log(_0x27feda);
	}
}
function getPostRequest(_0x50302b,_0x1ea876,_0x142556='POST'){
	let _0x3bf62f={'Accept':'application/json, text/javascript, */*; q=0.01','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x50302b.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x3bf62f.Origin='https://lzkjdz-isv.isvjcloud.com';
		_0x3bf62f.Referer='https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x3bf62f.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x50302b,'method':_0x142556,'headers':_0x3bf62f,'body':_0x1ea876,'timeout':30000};
}
function getCk(){
	return new Promise(_0x5da3cc=>{
		let _0x2226a2={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x2226a2,async(_0x492b64,_0x1e0701,_0x42b518)=>{
			try{
				if(_0x492b64){
					if(_0x1e0701&&typeof _0x1e0701.statusCode!='undefined'){
						if(_0x1e0701.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x492b64));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x5443a5=_0x42b518.match(/(活动已经结束)/)&&_0x42b518.match(/(活动已经结束)/)[1]||'';
					if(_0x5443a5){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x1e0701);
				}
			}catch(_0x102561){
				$.logErr(_0x102561,_0x1e0701);
			}finally{
				_0x5da3cc();
			}
		});
	});
}
function setActivityCookie(_0x428b95){
	if(_0x428b95.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0x465d95 of _0x428b95.headers['set-cookie']){
			lz_cookie[_0x465d95.split(';')[0]['substr'](0,_0x465d95.split(';')[0]['indexOf']('='))]=_0x465d95.split(';')[0]['substr'](_0x465d95.split(';')[0]['indexOf']('=')+1);
		}
		for(const _0x88667c of Object.keys(lz_cookie)){
			cookie+=_0x88667c+'='+lz_cookie[_0x88667c]+';';
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x1ec3b6){
	_0x1ec3b6=_0x1ec3b6||32;
	let _0xcc8f87='abcdef0123456789',_0x5a8422=_0xcc8f87.length,_0x41b7eb='';
	for(i=0;i<_0x1ec3b6;i++)_0x41b7eb+=_0xcc8f87.charAt(Math.floor(Math.random()*_0x5a8422));
	return _0x41b7eb;
}
function getMaxMin(_0x233b4e,_0x403bbd){
	if(_0x403bbd==='max'){
		return Math.max['apply'](Math,_0x233b4e);
	}else if(_0x403bbd==='min'){
		return Math.min['apply'](Math,_0x233b4e);
	}
}
function jsonParse(_0x25b091){
	if(typeof _0x25b091=='string'){
		try{
			return JSON.parse(_0x25b091);
		}catch(_0x50231e){
			console.log(_0x50231e);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x325c5b=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x312e7a='';
		if($.shopactivityId)_0x312e7a=',"activityId":'+$.shopactivityId;
		const _0x5c0722='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x312e7a+',"channel":406}';
		const _0x1292be={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x5c0722)};
		const _0x1143fb=await getH5st('8adfb',_0x1292be);
		const _0x4dc8e6={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x5c0722+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1143fb),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x4dc8e6,async(_0xe2bd31,_0x400d5f,_0x22e6d7)=>{
			try{
				_0x22e6d7=_0x22e6d7&&_0x22e6d7.match(/jsonp_.*?\((.*?)\);/)&&_0x22e6d7.match(/jsonp_.*?\((.*?)\);/)[1]||_0x22e6d7;
				let _0x35cfd4=$.toObj(_0x22e6d7,_0x22e6d7);
				if(_0x35cfd4&&typeof _0x35cfd4=='object'){
					if(_0x35cfd4&&_0x35cfd4.success===true){
						console.log(' >> '+_0x35cfd4.message);
						$.errorJoinShop=_0x35cfd4.message;
						if(_0x35cfd4.result&&_0x35cfd4.result['giftInfo']){
							for(let _0x25b69e of _0x35cfd4.result['giftInfo']['giftList']){
								console.log(' >> 入会获得：'+_0x25b69e.discountString+_0x25b69e.prizeName+_0x25b69e.secondLineDesc);
							}
						}
					}else if(_0x35cfd4&&typeof _0x35cfd4=='object'&&_0x35cfd4.message){
						$.errorJoinShop=_0x35cfd4.message;
						console.log(''+(_0x35cfd4.message||''));
					}else{
						console.log(_0x22e6d7);
					}
				}else{
					console.log(_0x22e6d7);
				}
			}catch(_0x8a9d84){
				$.logErr(_0x8a9d84,_0x400d5f);
			}finally{
				_0x325c5b();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x2b281d=>{
		const _0x1488c2='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x1a63e6={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x1488c2)};
		const _0x31bffd=await getH5st('8adfb',_0x1a63e6);
		const _0x366f49={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x1488c2+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x31bffd),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x366f49,async(_0x570ed7,_0x495fdc,_0x54214e)=>{
			try{
				_0x54214e=_0x54214e&&_0x54214e.match(/jsonp_.*?\((.*?)\);/)&&_0x54214e.match(/jsonp_.*?\((.*?)\);/)[1]||_0x54214e;
				let _0x4ec12b=$.toObj(_0x54214e,_0x54214e);
				if(_0x4ec12b&&typeof _0x4ec12b=='object'){
					if(_0x4ec12b&&_0x4ec12b.success==true){
						console.log('去加入：'+(_0x4ec12b.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x4ec12b.result['interestsRuleList']&&_0x4ec12b.result['interestsRuleList'][0]&&_0x4ec12b.result['interestsRuleList'][0]['interestsInfo']&&_0x4ec12b.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x54214e);
				}
			}catch(_0x37c385){
				$.logErr(_0x37c385,_0x495fdc);
			}finally{
				_0x2b281d();
			}
		});
	});
}
function getH5st(_0x236dd5,_0x1c84f5){
	return new Promise(async _0x28c626=>{
		let _0x2ff14a={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x236dd5+'&req='+encodeURIComponent(JSON.stringify(_0x1c84f5)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x2ff14a,(_0x10edfb,_0x194a50,_0x4d50d9)=>{
			try{
				if(_0x10edfb){
					console.log(JSON.stringify(_0x10edfb));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x182207){
				$.logErr(_0x182207,_0x194a50);
			}finally{
				_0x28c626(_0x4d50d9);
			}
		});
	});
}
function getBlacklist(){
	if($.blacklist=='')return;
	console.log('当前已设置黑名单：');
	const _0x55da31=Array.from(new Set($.blacklist['split']('&')));
	console.log(_0x55da31.join('&')+'\n');
	let _0x458a7b=_0x55da31;
	let _0x1fad5b=[];
	let _0x343e0c=false;
	for(let _0x34d069=0;_0x34d069<cookiesArr.length;_0x34d069++){
		let _0x2c50e7=decodeURIComponent(cookiesArr[_0x34d069]['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookiesArr[_0x34d069]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]||'');
		if(!_0x2c50e7)break;
		let _0xad4475=false;
		for(let _0x1706b9 of _0x458a7b){
			if(_0x1706b9&&_0x1706b9==_0x2c50e7){
				_0xad4475=true;
				break;
			}
		}
		if(!_0xad4475){
			_0x343e0c=true;
			_0x1fad5b.splice(_0x34d069,-1,cookiesArr[_0x34d069]);
		}
	}
	if(_0x343e0c)cookiesArr=_0x1fad5b;
}
function toFirst(_0x2b2706,_0x4b4e52){
	if(_0x4b4e52!=0){
		_0x2b2706.unshift(_0x2b2706.splice(_0x4b4e52,1)[0]);
	}
}
function getWhitelist(){
	if($.whitelist==''){
		helpCookiesArr=$.toObj($.toStr(cookiesArr,cookiesArr));
		return;
	}
	console.log('当前已设置白名单：');
	const _0x824372=Array.from(new Set($.whitelist['split']('&')));
	console.log(_0x824372.join('&')+'\n');
	let _0x54ec08=[];
	let _0x194a19=_0x824372;
	for(let _0xbcd86b in cookiesArr){
		let _0x5bd03c=decodeURIComponent(cookiesArr[_0xbcd86b]['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookiesArr[_0xbcd86b]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]||'');
		if(_0x194a19.includes(_0x5bd03c)){
			_0x54ec08.push(cookiesArr[_0xbcd86b]);
		}
	}
	helpCookiesArr=_0x54ec08;
	if(_0x194a19.length>1){
		for(let _0x549b57 in _0x194a19){
			let _0x21f9a6=_0x194a19[_0x194a19.length-1-_0x549b57];
			if(!_0x21f9a6)continue;
			for(let _0xbcd86b in helpCookiesArr){
				let _0x5bd03c=decodeURIComponent(helpCookiesArr[_0xbcd86b]['match'](/pt_pin=([^; ]+)(?=;?)/)&&helpCookiesArr[_0xbcd86b]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]);
				if(_0x21f9a6==_0x5bd03c){
					toFirst(helpCookiesArr,_0xbcd86b);
				}
			}
		}
	}
};