/*
购物车锦鲤通用活动

第一个CK失效会退出脚本

助力显示可能会有误差，以活动界面成功邀请人数为准

活动有BUG，直接加购不用助力也行。

请求太频繁会被黑ip

变量：
//export jd_wxCartKoi_activityId="活动ID"
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId=xxxxxxx

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#购物车锦鲤通用活动
1 1 1 1 * jd_wxCartKoi.js, tag=购物车锦鲤通用活动, enabled=true

*/

const $ = new Env('购物车锦鲤通用活动');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x22d6e5=>{
		cookiesArr.push(jdCookieNode[_0x22d6e5]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x2a07e4=>_0x2a07e4.cookie)].filter(_0x2764a8=>!!_0x2764a8);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let jd_wxCartKoi_activityId='';
jd_wxCartKoi_activityId=$.isNode()?process.env.jd_wxCartKoi_activityId?process.env.jd_wxCartKoi_activityId:''+jd_wxCartKoi_activityId:$.getdata('jd_wxCartKoi_activityId')?$.getdata('jd_wxCartKoi_activityId'):''+jd_wxCartKoi_activityId;
!(async()=>{
	if(!jd_wxCartKoi_activityId){
		console.log('\n衰仔、请填写购物车锦鲤的活动ID,变量是jd_wxCartKoi_activityId\n');
		return;
	}
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId=jd_wxCartKoi_activityId;
	$.shareUuid='';
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId='+$.activityId);
	for(let _0x28ae37=0;_0x28ae37<cookiesArr.length;_0x28ae37++){
		cookie=cookiesArr[_0x28ae37];
		originCookie=cookiesArr[_0x28ae37];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(_0x28ae37+1);
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n');
			await getUA();
			await run();
			await $.wait(3000);
			if((_0x28ae37==0)&&!$.actorUuid)break;
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
		console.log('\n\n开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'加购物车\n');
		await $.wait(parseInt(Math.random()*2000+2000,10));
		await getUA();
		await runs();
	}if($.outFlag){
		let _0x2fe03d='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x2fe03d);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x2fe03d);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0xb6ff4=>$.logErr(_0xb6ff4)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x1c0b71=false;
		await takePostRequest('isvObfuscator');
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
		await $.wait(1000);
		await takePostRequest('getActMemberInfo');
		if(!$.openCard){
			$.shopactivityId='';
			$.joinVenderId=$.venderId;
			await getshopactivityId();
			for(let _0x5eb0f8=0;_0x5eb0f8<Array(5).length;_0x5eb0f8++){
				if(_0x5eb0f8>0)console.log('第'+_0x5eb0f8+'次 重新开卡');
				await joinShop();
				await $.wait(500);
				if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')==-1){
					break;
				}
			}
		}
		await takePostRequest('getUserInfo');
		await takePostRequest('activityContent');
		await $.wait(1000);
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if($.index==1){
			console.log('活动获取成功，助力码：'+$.actorUuid+'\n');
			console.log('\n当前参加活动：'+$.activityName+'\n当前参与活动人数：'+$.joins+'\n活动抽奖时间：'+$.drawTime+'\n活动结束时间：'+$.cartEndTime+'\n最低加购：'+$.drawCondition+' 才可参与抽奖\n当前已加购：'+$.addCarts+' 次\n目前可加购次数：'+$.jsNum+' 次\n活动全部加购需：'+$.totals+' 次\n');
		}
		console.log(($.helpStatus===2)?'衰仔、助力成功':($.helpStatus===3)?'活动期间只能助力一次':($.helpStatus===4)?'助力已满，无法助力':($.helpStatus===1)?'已助力其他人':($.helpStatus===5)?'不能助力自己':($.helpStatus===6)?'活动已开奖，无法助力':('未知-'+$.helpStatus));
		await takePostRequest('followShop');
		if($.index==1){
			let _0x31eb99=new Date();
			let _0x32a86d=timestampToTime(_0x31eb99);
			if(_0x32a86d>$.drawTime){
				console.log('\n衰仔，抽奖时间到了，开始抽奖');
				await takePostRequest('drawResult');
				$.assistStatus=false;
			}else{
				console.log('\n衰仔，抽奖时间未到，跳过');
				$.assistStatus=true;
			}
		}
		if($.index==1){
			$.helpCount=$.jsNum;
		}else if($.helpStatus==2){
			$.helpCount++;
		}
		console.log('\n【账号'+$.index+'】可加购次数：'+$.jsNum+(($.index!=1)&&(' 【账号1】可加购次数：'+$.helpCount)||''));
		if($.helpCount==$.totals)$.hasEnd=true;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('衰仔、全部助力→:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(_0x4217d5){
		console.log(_0x4217d5);
	}
}
async function runs(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x5ca8c7=false;
		await takePostRequest('isvObfuscator');
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
		await $.wait(1000);
		await takePostRequest('getActMemberInfo');
		await takePostRequest('getUserInfo');
		await takePostRequest('activityContent');
		await $.wait(1000);
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		let _0x4db364=parseInt($.jsNum-$.addCarts);
		if(_0x4db364>0){
			console.log('衰仔、我开始加购了哟！');
			for(const _0x41709c of $.prodectVos){
				_0x5ca8c7=true;
				if((_0x41709c.collection==false)&&(_0x4db364>0)){
					$.productId=_0x41709c.productId;
					console.log(''+$.productId);
					await takePostRequest('addCart');
					_0x4db364--;
					await $.wait(2000);
					await takePostRequest('activityContent');
					await $.wait(2500);
				}
			}
		}else{
			console.log('衰仔，已全部加购了哟！');
		}
		let _0x404554=parseInt($.totals-$.jsNum);
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(_0x21182d){
		console.log(_0x21182d);
	}
}
async function takePostRequest(_0x1d66c4){
	if($.outFlag)return;
	let _0x143a82='https://lzkjdz-isv.isvjcloud.com';
	let _0x2bd81e='';
	let _0x336c4e='POST';
	let _0x2b2972='';
	switch(_0x1d66c4){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x2bd81e='body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954';
			break;
		case 'getMyPing':
			url=_0x143a82+'/customer/getMyPing';
			_0x2bd81e='token='+$.Token+'&fromType=APP&userId='+$.venderId+'&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x143a82+'/customer/getSimpleActInfoVo';
			_0x2bd81e='activityId='+$.activityId;
			break;
		case 'getActMemberInfo':
			url=_0x143a82+'/wxCommonInfo/getActMemberInfo';
			_0x2bd81e='venderId='+$.venderId+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'accessLogWithAD':
			url=_0x143a82+'/common/accessLogWithAD';
			let _0x308cd8='https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId='+$.activityId+'&friendUuid='+$.shareUuid;
			_0x2bd81e='venderId='+($.shopId||$.venderId||'')+'&code=70&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x308cd8)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x143a82+'/wxActionCommon/getUserInfo';
			_0x2bd81e='pin='+encodeURIComponent($.Pin);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x143a82+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x2bd81e='venderId='+($.shopId||$.venderId||'')+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x143a82+'/wxCartKoi/cartkoi/activityContent';
			_0x2bd81e='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&yunMidImageUrl='+$.yunMidImageUrl+'&friendUuid='+$.shareUuid+'&status=1';
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x143a82+'/wxSecond/myPrize';
			_0x2bd81e='activityId='+$.activityId+'&uuid='+$.actorUuid;
			break;
		case 'drawResult':
			url=_0x143a82+'/wxCartKoi/cartkoi/drawResult';
			_0x2bd81e='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'followShop':
			url=_0x143a82+'/wxActionCommon/followShop';
			_0x2bd81e='userId='+$.venderId+'&activityType=70&buyerNick='+encodeURIComponent($.Pin)+'&activityId='+$.activityId;
			break;
		case 'start':
			url=_0x143a82+'/wxSecond/start';
			_0x2bd81e='activityId='+$.activityId+'&uuid='+$.actorUuid+'&seconds='+$.targetTime;
			break;
		case 'addCart':
			url=_0x143a82+'/wxCartKoi/cartkoi/addCart';
			_0x2bd81e='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&productId='+$.productId;
			break;
		default:
			console.log('错误'+_0x1d66c4);
	}
	let _0x1fb9fc=getPostRequest(url,_0x2bd81e,_0x336c4e);
	return new Promise(async _0x11053c=>{
		$.post(_0x1fb9fc,(_0x44bbef,_0x51f75c,_0x55d665)=>{
			try{
				setActivityCookie(_0x51f75c);
				if(_0x44bbef){
					if(_0x51f75c&&(typeof _0x51f75c.statusCode!='undefined')){
						if(_0x51f75c.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x44bbef,_0x44bbef));
					console.log(_0x1d66c4+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x1d66c4,_0x55d665);
				}
			}catch(_0x13ca1e){
				console.log(_0x13ca1e,_0x51f75c);
			}
			finally{
				_0x11053c();
			}
		});
	});
}
async function dealReturn(_0xfbe92e,_0x38d397){
	let _0x43ac64='';
	try{
		if((_0xfbe92e!='accessLogWithAD')||(_0xfbe92e!='drawContent')){
			if(_0x38d397){
				_0x43ac64=JSON.parse(_0x38d397);
			}
		}
	}catch(_0x3d861a){
		console.log(_0xfbe92e+' 执行任务异常');
		console.log(_0x38d397);
		$.runFalag=false;
	}try{
		switch(_0xfbe92e){
			case 'isvObfuscator':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.errcode==0){
					if(typeof _0x43ac64.token!='undefined')$.Token=_0x43ac64.token;
				}else if(_0x43ac64.message){
					console.log('isvObfuscator '+(_0x43ac64.message||''));
				}else{
					console.log(_0x38d397);
				}
				}else{
					console.log(_0x38d397);
				}
				break;
			case 'getMyPing':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					if(_0x43ac64.data&&(typeof _0x43ac64.data.secretPin!='undefined'))$.Pin=_0x43ac64.data.secretPin;
					if(_0x43ac64.data&&(typeof _0x43ac64.data.nickname!='undefined'))$.nickname=_0x43ac64.data.nickname;
				}else if(_0x43ac64.errorMessage){
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					if(typeof _0x43ac64.data.shopId!='undefined')$.shopId=_0x43ac64.data.shopId;
					if(typeof _0x43ac64.data.venderId!='undefined')$.venderId=_0x43ac64.data.venderId;
				}else if(_0x43ac64.errorMessage){
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					$.yunMidImageUrl=_0x43ac64.data.yunMidImageUrl||'';
				}else if(_0x43ac64.errorMessage){
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'activityContent':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					$.actorUuid=_0x43ac64.data.joinRecord.myUuid||'';
					$.activityName=_0x43ac64.data.activityVo.activityName||'';
					$.cartEndTime=_0x43ac64.data.activityVo.cartEndTime||'';
					$.drawTime=_0x43ac64.data.activityVo.drawTime||'';
					$.prodectVos=_0x43ac64.data.prodectVos||[];
					$.helpStatus=_0x43ac64.data.joinRecord.status||0;
					$.addCarts=_0x43ac64.data.addCarts||0;
					$.joins=_0x43ac64.data.joins||0;
					$.jsNum=_0x43ac64.data.jsNum||0;
					$.totals=_0x43ac64.data.totals||0;
					$.drawCondition=_0x43ac64.data.activityVo.drawCondition||0;
					if(_0x43ac64.data.sendBeanNum){
						console.log('获得'+_0x43ac64.data.sendBeanNum+'豆');
						allMessage+='【账号'+$.index+'】获得'+_0x43ac64.data.sendBeanNum+'豆\n';
					}
				}else if(_0x43ac64.errorMessage){
					if(_0x43ac64.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'getActMemberInfo':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					$.openCard=_0x43ac64.data.openCard||false;
				}else if(_0x43ac64.errorMessage){
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'addCart':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					console.log('加购完成');
				}else if(_0x43ac64.errorMessage){
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'followShop':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					console.log('关注成功');
				}else if(_0x43ac64.errorMessage){
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'drawResult':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					if(typeof _0x43ac64.data=='object'){
						let _0x16ccc5='';
						if(_0x43ac64.data.drawName){
							_0x16ccc5=''+_0x43ac64.data.drawName;
						}
						if(!_0x16ccc5){
							_0x16ccc5='空气💨';
						}
						console.log('获得:'+(_0x16ccc5||_0x38d397));
					}else{
						console.log(_0xfbe92e+' '+_0x38d397);
					}
				}else if(_0x43ac64.errorMessage){
					$.runFalag=false;
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)){
					console.log('我的奖品：');
					for(let _0xa7c606 in _0x43ac64.data){
						$.item=_0xa7c606.name;
						console.log(''+$.item);
					}
				}else if(_0x43ac64.errorMessage){
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x43ac64=='object'){
					if(_0x43ac64.result&&(_0x43ac64.result===true)&&_0x43ac64.data){
					$.ShareCount=_0x43ac64.data.length;
					$.log('=========== 你邀请了:'+_0x43ac64.data.length+'个');
				}else if(_0x43ac64.errorMessage){
					console.log(_0xfbe92e+' '+(_0x43ac64.errorMessage||''));
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				}else{
					console.log(_0xfbe92e+' '+_0x38d397);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0xfbe92e+'-> '+_0x38d397);
		}
		if(typeof _0x43ac64=='object'){
			if(_0x43ac64.errorMessage){
				if(_0x43ac64.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x43bcff){
		console.log(_0x43bcff);
	}
}
function getPostRequest(_0x4dc4f6,_0x3de6f6,_0x1bca46='POST'){
	let _0x8486b5={'Accept':'application/json, text/javascript, */*; q=0.01','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x4dc4f6.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x8486b5.Origin='https://lzkjdz-isv.isvjcloud.com';
		_0x8486b5.Referer='https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId='+$.activityId+'&friendUuid='+$.shareUuid;
		_0x8486b5.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':_0x4dc4f6,'method':_0x1bca46,'headers':_0x8486b5,'body':_0x3de6f6,'timeout':30000};
}
function getCk(){
	return new Promise(_0x3228e9=>{
		let _0x2df881={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId='+$.activityId,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x2df881,async(_0x1901f5,_0x2a1b20,_0x1aa66d)=>{
			try{
				if(_0x1901f5){
					if(_0x2a1b20&&(typeof _0x2a1b20.statusCode!='undefined')){
						if(_0x2a1b20.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x1901f5));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x41d487=_0x1aa66d.match(/(活动已经结束)/)&&_0x1aa66d.match(/(活动已经结束)/)[1]||'';
					if(_0x41d487){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x2a1b20);
				}
			}catch(_0x451e32){
				$.logErr(_0x451e32,_0x2a1b20);
			}
			finally{
				_0x3228e9();
			}
		});
	});
}
function setActivityCookie(_0x214ea3){
	if(_0x214ea3.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0x19e3a4 of _0x214ea3.headers['set-cookie']){
			lz_cookie[_0x19e3a4.split(';')[0].substr(0,_0x19e3a4.split(';')[0].indexOf('='))]=_0x19e3a4.split(';')[0].substr(_0x19e3a4.split(';')[0].indexOf('=')+1);
		}
		for(const _0x47b9fb of Object.keys(lz_cookie)){
			cookie+=(_0x47b9fb+'='+lz_cookie[_0x47b9fb]+';');
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x35dbe2){
	_0x35dbe2=(_0x35dbe2||32);
	let _0x58f98d='abcdef0123456789',_0x259c31=_0x58f98d.length,_0x63130='';
	for(i=0;i<_0x35dbe2;i++)_0x63130+=_0x58f98d.charAt(Math.floor(Math.random()*_0x259c31));
	return _0x63130;
}
function timestampToTime(_0x3316fa){
	var _0x49606c=new Date(_0x3316fa);
	var _0xacc7f2=(_0x49606c.getFullYear()+'-');
	var _0x4740a3=((_0x49606c.getMonth()+1<10)?('0'+_0x49606c.getMonth()+1):(_0x49606c.getMonth()+1)+'-');
	var _0x34c947=(_0x49606c.getDate()+' ');
	var _0x5905aa=(_0x49606c.getHours()+':');
	var _0xfe7bf3=(_0x49606c.getMinutes()+':');
	var _0x4842d5=_0x49606c.getSeconds();
	return _0xacc7f2+_0x4740a3+_0x34c947+_0x5905aa+_0xfe7bf3+_0x4842d5;
}
function jsonParse(_0x4c7f1d){
	if(typeof _0x4c7f1d=='string'){
		try{
			return JSON.parse(_0x4c7f1d);
		}catch(_0x4e2367){
			console.log(_0x4e2367);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x240bbc=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x1f9a56='';
		if($.shopactivityId)_0x1f9a56=',"activityId":'+$.shopactivityId;
		let _0x66399e='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x1f9a56+',"channel":406}';
		let _0x271d45=await geth5st();
		const _0x52c170={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x66399e+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x271d45,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x52c170,async(_0x36c1f7,_0x2177a1,_0x72c1bc)=>{
			try{
				_0x72c1bc=_0x72c1bc&&_0x72c1bc.match(/jsonp_.*?\((.*?)\);/)&&_0x72c1bc.match(/jsonp_.*?\((.*?)\);/)[1]||_0x72c1bc;
				let _0x6f729a=$.toObj(_0x72c1bc,_0x72c1bc);
				if(_0x6f729a&&(typeof _0x6f729a=='object')){
					if(_0x6f729a&&(_0x6f729a.success===true)){
						console.log(_0x6f729a.message);
						$.errorJoinShop=_0x6f729a.message;
						if(_0x6f729a.result&&_0x6f729a.result.giftInfo){
							for(let _0x5e17a1 of _0x6f729a.result.giftInfo.giftList){
								console.log('入会获得:'+_0x5e17a1.discountString+_0x5e17a1.prizeName+_0x5e17a1.secondLineDesc);
							}
						}
					}else if(_0x6f729a&&(typeof _0x6f729a=='object')&&_0x6f729a.message){
						$.errorJoinShop=_0x6f729a.message;
						console.log(''+(_0x6f729a.message||''));
					}else{
						console.log(_0x72c1bc);
					}
				}else{
					console.log(_0x72c1bc);
				}
			}catch(_0x57d09f){
				$.logErr(_0x57d09f,_0x2177a1);
			}
			finally{
				_0x240bbc();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x5981cd=>{
		let _0x3832e8='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let _0x38d866=await geth5st();
		const _0x234cab={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x3832e8+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x38d866,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x234cab,async(_0x587968,_0x3baacf,_0x1d33b0)=>{
			try{
				_0x1d33b0=_0x1d33b0&&_0x1d33b0.match(/jsonp_.*?\((.*?)\);/)&&_0x1d33b0.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1d33b0;
				let _0x4bed68=$.toObj(_0x1d33b0,_0x1d33b0);
				if(_0x4bed68&&(typeof _0x4bed68=='object')){
					if(_0x4bed68&&(_0x4bed68.success==true)){
						console.log('入会:'+(_0x4bed68.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x4bed68.result.interestsRuleList&&_0x4bed68.result.interestsRuleList[0]&&_0x4bed68.result.interestsRuleList[0].interestsInfo&&_0x4bed68.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x1d33b0);
				}
			}catch(_0x50af4a){
				$.logErr(_0x50af4a,_0x3baacf);
			}
			finally{
				_0x5981cd();
			}
		});
	});
}
var _0xodb='jsjiami.com.v6',_0xodb_=['‮_0xodb'],_0x3c1b=[_0xodb,'wqkgAcKeOQ==','NBDCnDEf','wqhhw7HDi8Ka','wrzCuHM/w6Qj','wpJyw7PDuMKE','E0bCnA==','BxbCg8KoSA==','QnjDk0Ycw6d1ZsK8w6RawpTDhMK2DMOyZcKvBTpYw4pvP8OyNFnCssO/w5DDjVvDhH3DocKWwpMGUMKVVsK/JDXCvcK9QMOIwqHDpMOXGk/DlAnDkxrDnMO/w5vDn2zCq8O9UsKBw7h3H1JFwp7CgzTCo8KTacOab2DCqcOSw7UZBVLCgWPDo8KoJGbDsMKDBA/Cl8KTwoBsF8OYPcOVwpUSWcOaaGlkwq0AF2tnPcK6w4tme8OcTMKZwrwND8OMLDNCw5TCq8OHw4BZJkzDlBoOwoHCi8KswofCu8KeX8OEwq7DrHsYw7bDn8KnGCECakwjKiTCr8ODRh/CgQ==','N8KtRw==','LDbCrMKSfQ==','w6LDpG1qNA==','wpEXUcOjCA==','FV7Ch8KGZQ==','CWPCmXPCnA==','wrg0w4g=','YsOYw4oQw7oKAMOowok=','AAbCgQwHw6g=','w5bDjClaCcO8YcK7','JMKpOsO2ayRI','WsO5CMKfwq7DnMOJwqE=','w40KQnnCnMOYf8OJw4Na','PsKnRGvCtjUTZEhE','w7QjwrVeScOw','JcKgIcOdeA==','OMKgX0rCkA==','VHjClMOCw4Q1wr7CjQjChHfDrMOKwozDsA==','w5bCmMOtwrAXw4Je','UHLCjsOsw4wt','F8O3VsOmKXXDjDsLJCQ=','wqojL8K/L8Ke','PlfDgMKmScOr','wqZow6nDn8Kwwog=','CUzCmH4=','wrHDkTw=','TMONdMOcwq0=','KgzCnQYSw7Q=','OcK7N8K8w7w=','wro5I8KvOsKY','wro+w5FlHFg=','c8OmMcKhwoM=','WQQTw6Fo','xjsjiaNUmi.xucoLOwqm.vBle6VKE=='];
if(function(_0x158d78,_0x21d5e0,_0x5aeba5){
	function _0x454ecb(_0x4a849f,_0x5c9fd3,_0x2f7f8f,_0x474640,_0x1fa674,_0x341bc2){
		_0x5c9fd3=(_0x5c9fd3>>0x8),_0x1fa674='po';
		var _0x3da439='shift',_0x37d0e0='push',_0x341bc2='‮';
		if(_0x5c9fd3<_0x4a849f){
			while(--_0x4a849f){
				_0x474640=_0x158d78[_0x3da439]();
				if((_0x5c9fd3===_0x4a849f)&&(_0x341bc2==='‮')&&(_0x341bc2.length===1)){
					_0x5c9fd3=_0x474640,_0x2f7f8f=_0x158d78[_0x1fa674+'p']();
				}else if(_0x5c9fd3&&(_0x2f7f8f.replace(/[xNUxuLOwqBleVKE=]/g,'')===_0x5c9fd3)){
					_0x158d78[_0x37d0e0](_0x474640);
				}
			}
			_0x158d78[_0x37d0e0](_0x158d78[_0x3da439]());
		}
		return 968710;
	};
	return _0x454ecb(++_0x21d5e0,_0x5aeba5)>>_0x21d5e0^_0x5aeba5;
}(_0x3c1b,411,105216),_0x3c1b){
	_0xodb_=_0x3c1b.length^0x19b;
};
function _0x80d0(_0x34e847,_0x4f12c3){
	_0x34e847=~~'0x'.concat(_0x34e847.slice(1));
	var _0x57e731=_0x3c1b[_0x34e847];
	if(_0x80d0.ZHvfIH===undefined){
		(function(){
			var _0x4775d4=(typeof window!=='undefined')?window:(typeof process==='object')&&(typeof require==='function')&&(typeof global==='object')?global:this;
			var _0x3cb5fd='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			_0x4775d4.atob||(_0x4775d4.atob=function(_0x25c839){
				var _0x137d5d=String(_0x25c839).replace(/=+$/,'');
				for(var _0x5372d1=0,_0x9f5558,_0x802e5e,_0x589f78=0,_0x258bf8='';_0x802e5e=_0x137d5d.charAt(_0x589f78++);~_0x802e5e&&(_0x9f5558=(_0x5372d1%4)?(_0x9f5558*64+_0x802e5e):_0x802e5e,_0x5372d1++%4)?_0x258bf8+=String.fromCharCode(0xff&_0x9f5558>>-2*_0x5372d1&0x6):0){
					_0x802e5e=_0x3cb5fd.indexOf(_0x802e5e);
				}
				return _0x258bf8;
			});
		}());
		function _0x568f0b(_0x2a8f29,_0x4f12c3){
			var _0x284285=[],_0x1ea417=0,_0x374544,_0x2160cf='',_0x61fd5='';
			_0x2a8f29=atob(_0x2a8f29);
			for(var _0x4a1fce=0,_0x510d77=_0x2a8f29.length;_0x4a1fce<_0x510d77;_0x4a1fce++){
				_0x61fd5+=('%'+('00'+_0x2a8f29.charCodeAt(_0x4a1fce).toString(16)).slice(-2));
			}
			_0x2a8f29=decodeURIComponent(_0x61fd5);
			for(var _0x1a79ac=0;_0x1a79ac<256;_0x1a79ac++){
				_0x284285[_0x1a79ac]=_0x1a79ac;
			}
			for(_0x1a79ac=0;_0x1a79ac<256;_0x1a79ac++){
				_0x1ea417=(_0x1ea417+_0x284285[_0x1a79ac]+_0x4f12c3.charCodeAt(_0x1a79ac%_0x4f12c3.length)%256);
				_0x374544=_0x284285[_0x1a79ac];
				_0x284285[_0x1a79ac]=_0x284285[_0x1ea417];
				_0x284285[_0x1ea417]=_0x374544;
			}
			_0x1a79ac=0;
			_0x1ea417=0;
			for(var _0x35156a=0;_0x35156a<_0x2a8f29.length;_0x35156a++){
				_0x1a79ac=(_0x1a79ac+1%256);
				_0x1ea417=(_0x1ea417+_0x284285[_0x1a79ac]%256);
				_0x374544=_0x284285[_0x1a79ac];
				_0x284285[_0x1a79ac]=_0x284285[_0x1ea417];
				_0x284285[_0x1ea417]=_0x374544;
				_0x2160cf+=String.fromCharCode(_0x2a8f29.charCodeAt(_0x35156a)^_0x284285[_0x284285[_0x1a79ac]+_0x284285[_0x1ea417]%256]);
			}
			return _0x2160cf;
		}
		_0x80d0.uZkhLK=_0x568f0b;
		_0x80d0.PgBxtv={};
		_0x80d0.ZHvfIH=true;
	}
	var _0x419cf5=_0x80d0.PgBxtv[_0x34e847];
	if(_0x419cf5===undefined){
		if(_0x80d0.mzwOwg===undefined){
			_0x80d0.mzwOwg=true;
		}
		_0x57e731=_0x80d0.uZkhLK(_0x57e731,_0x4f12c3);
		_0x80d0.PgBxtv[_0x34e847]=_0x57e731;
	}else{
		_0x57e731=_0x419cf5;
	}
	return _0x57e731;
};
function generateFp(){
	var _0x3cb409={'ryoPy':'0123456789','mfvwK':function(_0x5e4816,_0x134e98){
			return _0x5e4816|_0x134e98;
		},'WutDU':function(_0x35921e,_0x23905b){
			return _0x35921e+_0x23905b;
		}};
	let _0x25a58f=_0x3cb409[_0x80d0('‮0','wj)i')];
	let _0xf2f67c=13;
	let _0xbdeb73='';
	for(;_0xf2f67c--;)_0xbdeb73+=_0x25a58f[_0x3cb409[_0x80d0('‮1','Z*hR')](Math.random()*_0x25a58f[_0x80d0('‮2','3@Q*')],0)];
	return _0x3cb409[_0x80d0('‮3','Z*hR')](_0xbdeb73,Date[_0x80d0('‮4','Da%Y')]())[_0x80d0('‮5','LwWi')](0,16);
}
function geth5st(){
	var _0x5c1910={'XLFYP':'yyyyMMddhhmmssSSS','ERdzy':';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;','eaFvs':_0x80d0('‮6','@hXf'),'NqklQ':function(_0x903d6c,_0x884a09){
			return _0x903d6c(_0x884a09);
		},'DqrqH':function(_0x2b669c,_0xf2500c){
			return _0x2b669c+_0xf2500c;
		},'GEDpa':function(_0x1a27dc,_0x427d96){
			return _0x1a27dc+_0x427d96;
		},'tJryJ':function(_0x23bafb,_0x30852e){
			return _0x23bafb+_0x30852e;
		}};
	let _0x13f5d6=Date[_0x80d0('‮7','3B2S')]();
	let _0x5562af=generateFp();
	let _0x4e8d06=new Date(_0x13f5d6).Format(_0x5c1910[_0x80d0('‫8','LwWi')]);
	let _0xb731ae=[_0x5c1910.ERdzy,_0x5c1910[_0x80d0('‮9','SCQF')]];
	let _0x24d951=_0xb731ae[random(0,_0xb731ae.length)];
	return _0x5c1910[_0x80d0('‫a','%HoM')](encodeURIComponent,_0x5c1910.DqrqH(_0x5c1910[_0x80d0('‫b','vWDW')](_0x5c1910[_0x80d0('‮c','Da%Y')](_0x4e8d06,';')+_0x5562af,_0x24d951),Date[_0x80d0('‮d','7]Bn')]()));
}
Date[_0x80d0('‫e','gM9$')][_0x80d0('‫f','wj)i')]=function(_0x1ad962){
	var _0x46ca49={'wGAVl':function(_0x7aa620,_0x27676a){
			return _0x7aa620/_0x27676a;
		},'aborC':function(_0x4047de,_0x362e23){
			return _0x4047de+_0x362e23;
		},'khvyA':function(_0x13157b,_0x166d5f){
			return _0x13157b===_0x166d5f;
		},'RkhHN':function(_0x5b6d02,_0x393b25){
			return _0x5b6d02==_0x393b25;
		}};
	var _0x2e532b,_0x154248=this,_0x931fae=_0x1ad962,_0x5adf84={'M+':(_0x154248[_0x80d0('‮10','lEbY')]()+1),'d+':_0x154248.getDate(),'D+':_0x154248[_0x80d0('‮11','m]Ir')](),'h+':_0x154248.getHours(),'H+':_0x154248[_0x80d0('‫12','hLmb')](),'m+':_0x154248[_0x80d0('‫13','y[mS')](),'s+':_0x154248[_0x80d0('‮14','3B2S')](),'w+':_0x154248[_0x80d0('‫15','$n0%')](),'q+':Math[_0x80d0('‮16','m]Ir')](_0x46ca49.wGAVl(_0x46ca49[_0x80d0('‮17','3B2S')](_0x154248.getMonth(),3),3)),'S+':_0x154248[_0x80d0('‫18','3aAN')]()};
	/(y+)/i.test(_0x931fae)&&(_0x931fae=_0x931fae[_0x80d0('‫19','bosv')](RegExp.$1,''[_0x80d0('‮1a','3aAN')](_0x154248[_0x80d0('‫1b','n1@B')]())[_0x80d0('‮1c','ctu&')](4-RegExp.$1[_0x80d0('‫1d','T8*w')])));
	for(var _0x28f99f in _0x5adf84){
		if(new RegExp('('[_0x80d0('‮1e','Z*hR')](_0x28f99f,')'))[_0x80d0('‮1f','Da%Y')](_0x931fae)){
			var _0x58fed1,_0x192aae=_0x46ca49.khvyA('S+',_0x28f99f)?_0x80d0('‫20','dvcH'):'00';
			_0x931fae=_0x931fae.replace(RegExp.$1,_0x46ca49[_0x80d0('‫21','Jp@*')](1,RegExp.$1[_0x80d0('‫22','wj)i')])?_0x5adf84[_0x28f99f]:_0x46ca49[_0x80d0('‫23','JH9X')](''.concat(_0x192aae),_0x5adf84[_0x28f99f]).substr(''[_0x80d0('‮24','ctu&')](_0x5adf84[_0x28f99f])[_0x80d0('‫25','7]Bn')]));
		}
	}
	return _0x931fae;
};
function random(_0x48662d,_0x51eec4){
	var _0x3e43b2={'NzMvB':function(_0x207dcb,_0x4102c9){
			return _0x207dcb+_0x4102c9;
		},'pvLRb':function(_0x7f4d6a,_0x4b82c7){
			return _0x7f4d6a*_0x4b82c7;
		},'KNgAC':function(_0x16da49,_0x337047){
			return _0x16da49-_0x337047;
		}};
	return _0x3e43b2[_0x80d0('‫26','hLmb')](Math[_0x80d0('‫27','eShm')](_0x3e43b2[_0x80d0('‮28','ctu&')](Math.random(),_0x3e43b2.KNgAC(_0x51eec4,_0x48662d))),_0x48662d);
};
_0xodb='jsjiami.com.v6';

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}