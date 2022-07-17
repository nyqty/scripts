/*
粉丝互动通用活动

会自动开卡店铺会员，最好只跑自己的账号

请求太频繁会被黑ip

变量：
//export jd_wxFansInterActionActivity_activityId="活动ID"
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/activity?activityId=xxxxxxx

cron:6 6 6 6 *
============Quantumultx===============
[task_local]
#粉丝互动通用活动
6 6 6 6 * jd_wxFansInterActionActivity.js, tag=粉丝互动通用活动, enabled=true

*/
const $ = new Env('粉丝互动通用活动-加密');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[];
let activityCookie='';
let lz_cookie={};
$.outFlag=false;
$.activityEnd=false;
let jd_wxFansInterActionActivity_activityId='';
jd_wxFansInterActionActivity_activityId=$.isNode()?process.env.jd_wxFansInterActionActivity_activityId?process.env.jd_wxFansInterActionActivity_activityId:''+jd_wxFansInterActionActivity_activityId:$.getdata('jd_wxFansInterActionActivity_activityId')?$.getdata('jd_wxFansInterActionActivity_activityId'):''+jd_wxFansInterActionActivity_activityId;
const activityList=jd_wxFansInterActionActivity_activityId;
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0xd59ac7=>{
		cookiesArr.push(jdCookieNode[_0xd59ac7]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]').map(_0xa940=>_0xa940.cookie)].filter(_0x13b7ef=>!!_0x13b7ef);
}
!(async()=>{
	if(!jd_wxFansInterActionActivity_activityId){
		console.log('\n衰仔、请填写粉丝互动的活动ID,变量是jd_wxFansInterActionActivity_activityId\n');
		return;
	}
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	console.log('\n互动ID：'+jd_wxFansInterActionActivity_activityId);
	console.log('\n活动地址：https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/'+jd_wxFansInterActionActivity_activityId+'?activityId='+jd_wxFansInterActionActivity_activityId);
	for(let _0x34044d=0;_0x34044d<cookiesArr.length;_0x34044d++){
		await getUA();
		$.index=_0x34044d+1;
		cookie=cookiesArr[_0x34044d];
		originCookie=cookiesArr[_0x34044d];
		$.isLogin=true;
		$.nickName='';
		$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
		//await TotalBean();
		console.log('\n*****开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*****\n');
		if(!$.isLogin){
			$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
			if($.isNode()){
				await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
			}
			continue;
		}
		$.hotFlag=false;
		$.activityID=activityList;
		await main();
		await $.wait(3000);
		if($.outFlag||$.activityEnd)break;
	}
})().catch(_0x11cb04=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x11cb04+'!','');
}).finally(()=>{
	$.done();
});
async function main(){
	$.token='';
	await getToken();
	if($.token===''){
		console.log('获取token失败');
		return;
	}
	await $.wait(3000);
	await getActCk();
	$.shopId='';
	await takePostRequest('getSimpleActInfoVo');
	if($.shopid===''){
		console.log('获取shopid失败');
		return;
	}
	console.log('店铺ID:'+$.shopid);
	await $.wait(3000);
	$.pin='';
	await takePostRequest('getMyPing');
	if($.pin===''){
		$.hotFlag=true;
		console.log('获取pin失败,该账号可能是黑号');
		return;
	}
	await $.wait(3000);
	await accessLogWithAD();
	await $.wait(3000);
	$.activityData={};
	$.actinfo='';
	$.actorInfo='';
	$.nowUseValue=0;
	await takePostRequest('activityContent');
	if(JSON.stringify($.activityData)==='{}'){
		console.log('获取活动详情失败,活动可能结束');
		$.activityEnd=true;
		return;
	}
	let _0x46943f=new Date($.activityData.actInfo.endTime);
	let _0x291a52=(_0x46943f.getFullYear()+'-'+(_0x46943f.getMonth()<10)?('0'+_0x46943f.getMonth()+1):_0x46943f.getMonth()+1+'-'+(_0x46943f.getDate()<10)?('0'+_0x46943f.getDate()):_0x46943f.getDate());
	console.log($.actinfo.actName+','+$.actinfo.shopName+',当前积分：'+$.nowUseValue+',结束时间：'+_0x291a52+'，'+$.activityData.actInfo.endTime);
	let _0x3c0661=[];
	let _0x47f8d3=['One','Two','Three'];
	for(let _0x4061c3=0;_0x4061c3<_0x47f8d3.length;_0x4061c3++){
		let _0x1ae128=$.activityData.actInfo['giftLevel'+_0x47f8d3[_0x4061c3]]||'';
		if(_0x1ae128){
			_0x1ae128=JSON.parse(_0x1ae128);
			_0x3c0661.push(_0x1ae128[0].name);
		}
	}
	console.log('奖品列表：'+_0x3c0661.toString());
	if($.actorInfo.prizeOneStatus&&$.actorInfo.prizeTwoStatus&&$.actorInfo.prizeThreeStatus){
		console.log('已抽过所有奖品');
		return;
	}
	await $.wait(3000);
	$.memberInfo={};
	await takePostRequest('getActMemberInfo');
	if(!$.memberInfo.openCard){
		$.shopactivityId='';
		$.joinVenderId=$.shopid;
		await getshopactivityId();
		for(let _0x3df74a=0;_0x3df74a<Array(5).length;_0x3df74a++){
			if(_0x3df74a>0)console.log('第'+_0x3df74a+'次 重新开卡');
			await joinShop();
			await $.wait(500);
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')==-1){
				break;
			}
		}
		await takePostRequest('getActMemberInfo');
		await $.wait(1000);
	}
	if($.memberInfo.actMemberStatus===1&&!$.memberInfo.openCard){
		console.log('\n该活动需要入会,如需执行，请先手动入会');
		return;
	}
	await $.wait(3000);
	$.upFlag=false;
	await doTask();
	await luckDraw();
}
async function luckDraw(){
	if($.upFlag){
		await takePostRequest('activityContent');
		await $.wait(3000);
	}
	let _0x220330=Number($.activityData.actorInfo.fansLoveValue)+Number($.activityData.actorInfo.energyValue);
	if((_0x220330>=$.activityData.actConfig.prizeScoreOne)&&($.activityData.actorInfo.prizeOneStatus===false)){
		console.log('开始第一次抽奖');
		$.drawType='01';
		await takePostRequest('startDraw');
		await $.wait(3000);
	}if(_0x220330>=$.activityData.actConfig.prizeScoreTwo&&($.activityData.actorInfo.prizeTwoStatus===false)){
		console.log('开始第二次抽奖');
		$.drawType='02';
		await takePostRequest('startDraw');
		await $.wait(3000);
	}if((_0x220330>=$.activityData.actConfig.prizeScoreThree)&&($.activityData.actorInfo.prizeThreeStatus===false)){
		console.log('开始第三次抽奖');
		$.drawType='03';
		await takePostRequest('startDraw');
		await $.wait(3000);
	}
}
async function doTask(){
	$.runFalag=true;
	if($.activityData.actorInfo&&!$.activityData.actorInfo.follow){
		console.log('关注店铺');
		await takePostRequest('followShop');
		await $.wait(3000);
		$.upFlag=true;
	}else{
		console.log('已关注');
	}
	if($.activityData.task1Sign&&($.activityData.task1Sign.finishedCount===0)&&$.runFalag){
		console.log('执行每日签到');
		await takePostRequest('doSign');
		await $.wait(3000);
		$.upFlag=true;
	}else{
		console.log('已签到');
	}
	let _0x19d131=0;
	if($.activityData.task2BrowGoods&&$.runFalag){
		if($.activityData.task2BrowGoods.finishedCount!==$.activityData.task2BrowGoods.upLimit){
			_0x19d131=(Number($.activityData.task2BrowGoods.upLimit)-Number($.activityData.task2BrowGoods.finishedCount));
			console.log('开始做浏览商品任务');
			$.upFlag=true;
			for(let _0x197028=0;(_0x197028<$.activityData.task2BrowGoods.taskGoodList.length)&&_0x19d131>0&&$.runFalag;_0x197028++){
				$.oneGoodInfo=$.activityData.task2BrowGoods.taskGoodList[_0x197028];
				if($.oneGoodInfo.finished===false){
					console.log('浏览:'+($.oneGoodInfo.skuName||''));
					await takePostRequest('doBrowGoodsTask');
					await $.wait(3000);
					_0x19d131--;
				}
			}
		}else{
			console.log('浏览商品任务已完成');
		}
	}if($.activityData.task3AddCart&&$.runFalag){
		if($.activityData.task3AddCart.finishedCount!==$.activityData.task3AddCart.upLimit){
			_0x19d131=Number($.activityData.task3AddCart.upLimit)-Number($.activityData.task3AddCart.finishedCount);
			console.log('开始做加购商品任务');
			$.upFlag=true;
			for(let _0x50a41e=0;(_0x50a41e<$.activityData.task3AddCart.taskGoodList.length)&&(_0x19d131>0)&&$.runFalag;_0x50a41e++){
				$.oneGoodInfo=$.activityData.task3AddCart.taskGoodList[_0x50a41e];
				if($.oneGoodInfo.finished===false){
					console.log('加购:'+($.oneGoodInfo.skuName||''));
					await takePostRequest('doAddGoodsTask');
					await $.wait(3000);
					_0x19d131--;
				}
			}
		}else{
			console.log('加购商品已完成');
		}
	}if($.activityData.task4Share&&$.runFalag){
		if($.activityData.task4Share.finishedCount!==$.activityData.task4Share.upLimit){
			_0x19d131=Number($.activityData.task4Share.upLimit)-Number($.activityData.task4Share.finishedCount);
			console.log('开始做分享任务');
			$.upFlag=true;
			for(let _0x5e88d9=0;_0x5e88d9<_0x19d131&&$.runFalag;_0x5e88d9++){
				console.log('执行第'+(_0x5e88d9+1)+'次分享');
				await takePostRequest('doShareTask');
				await $.wait(3000);
			}
		}else{
			console.log('分享任务已完成');
		}
	}if($.activityData.task5Remind&&$.runFalag){
		if($.activityData.task5Remind.finishedCount!==$.activityData.task5Remind.upLimit){
			console.log('执行设置活动提醒');
			$.upFlag=true;
			await takePostRequest('doRemindTask');
			await $.wait(3000);
		}else{
			console.log('设置活动提醒已完成');
		}
	}if($.activityData.task6GetCoupon&&$.runFalag){
		if($.activityData.task6GetCoupon.finishedCount!==$.activityData.task6GetCoupon.upLimit){
			_0x19d131=(Number($.activityData.task6GetCoupon.upLimit)-Number($.activityData.task6GetCoupon.finishedCount));
			console.log('开始做领取优惠券');
			$.upFlag=true;
			for(let _0x5d1326=0;(_0x5d1326<$.activityData.task6GetCoupon.taskCouponInfoList.length)&&_0x19d131>0&&$.runFalag;_0x5d1326++){
				$.oneCouponInfo=$.activityData.task6GetCoupon.taskCouponInfoList[_0x5d1326];
				if($.oneCouponInfo.finished===false){
					await takePostRequest('doGetCouponTask');
					await $.wait(3000);
					_0x19d131--;
				}
			}
		}else{
			console.log('领取优惠券已完成');
		}
	}if($.activityData.task7MeetPlaceVo&&$.runFalag){
		if($.activityData.task7MeetPlaceVo.finishedCount!==$.activityData.task7MeetPlaceVo.upLimit){
			console.log('执行逛会场');
			$.upFlag=true;
			await takePostRequest('doMeetingTask');
			await $.wait(3000);
		}else{
			console.log('逛会场已完成');
		}
	}
}
async function takePostRequest(_0x5deae3){
	let _0x3aa0ad='';
	let _0x289375='';
	switch(_0x5deae3){
		case 'getSimpleActInfoVo':
			_0x3aa0ad='https://lzkjdz-isv.isvjcloud.com/customer/getSimpleActInfoVo';
			_0x289375='activityId='+$.activityID;
			break;
		case 'getMyPing':
			_0x3aa0ad='https://lzkjdz-isv.isvjcloud.com/customer/getMyPing';
			_0x289375='userId='+$.shopid+'&token='+encodeURIComponent($.token)+'&fromType=APP';
			break;
		case 'activityContent':
			_0x3aa0ad='https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activityContent';
			_0x289375='activityId='+$.activityID+'&pin='+encodeURIComponent($.pin);
			break;
		case 'getActMemberInfo':
			_0x3aa0ad='https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/getActMemberInfo';
			_0x289375='venderId='+$.shopid+'&activityId='+$.activityID+'&pin='+encodeURIComponent($.pin);
			break;
		case 'doBrowGoodsTask':
		case 'doAddGoodsTask':
			_0x3aa0ad='https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/'+_0x5deae3;
			_0x289375='activityId='+$.activityID+'&uuid='+$.activityData.actorInfo.uuid+'&skuId='+$.oneGoodInfo.skuId;
			break;
		case 'doSign':
		case 'followShop':
		case'doShareTask':
		case'doRemindTask':
		case 'doMeetingTask':
			_0x3aa0ad='https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/'+_0x5deae3;
			_0x289375='activityId='+$.activityID+'&uuid='+$.activityData.actorInfo.uuid;
			break;
		case 'doGetCouponTask':
			_0x3aa0ad='https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/'+_0x5deae3;
			_0x289375='activityId='+$.activityID+'&uuid='+$.activityData.actorInfo.uuid+'&couponId='+$.oneCouponInfo.couponInfo.couponId;
			break;
		case 'startDraw':
			_0x3aa0ad='https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/'+_0x5deae3;
			_0x289375='activityId='+$.activityID+'&uuid='+$.activityData.actorInfo.uuid+'&drawType='+$.drawType;
			break;
		default:
			console.log('错误'+_0x5deae3);
	}
	let _0x87d2=getPostRequest(_0x3aa0ad,_0x289375);
	return new Promise(async _0x3d72fe=>{
		$.post(_0x87d2,(_0x499d07,_0x382a3a,_0xec181e)=>{
			try{
				setActivityCookie(_0x382a3a);
				dealReturn(_0x5deae3,_0xec181e);
			}catch(_0x518842){
				console.log(_0xec181e);
				$.logErr(_0x518842,_0x382a3a);
			}
			finally{
				_0x3d72fe();
			}
		});
	});
}
function dealReturn(_0x117950,_0x4c0d41){
	try{
		_0x4c0d41=JSON.parse(_0x4c0d41);
	}catch(_0x535df3){
		console.log('执行任务异常');
		$.runFalag=false;
	}
	switch(_0x117950){
		case 'getSimpleActInfoVo':
			if(_0x4c0d41.result){
			$.shopid=_0x4c0d41.data.venderId;
		}
			break;
		case 'getMyPing':
			if(_0x4c0d41.data&&_0x4c0d41.data.secretPin){
			$.pin=_0x4c0d41.data.secretPin;
			$.nickname=_0x4c0d41.data.nickname;
		}else{
			console.log(JSON.stringify(_0x4c0d41));
		}
			break;
		case'activityContent':
			if(_0x4c0d41.data&&_0x4c0d41.result&&(_0x4c0d41.count===0)){
			$.activityData=_0x4c0d41.data;
			$.actinfo=$.activityData.actInfo;
			$.actorInfo=$.activityData.actorInfo;
			$.nowUseValue=(Number($.actorInfo.fansLoveValue)+Number($.actorInfo.energyValue));
		}else{
			console.log(JSON.stringify(_0x4c0d41));
		}
			break;
		case 'getActMemberInfo':
			if(_0x4c0d41.data&&_0x4c0d41.result&&(_0x4c0d41.count===0)){
			$.memberInfo=_0x4c0d41.data;
		}
			break;
		case'doSign':
			if(_0x4c0d41.result===true){
			console.log('签到成功');
		}else{
			console.log(_0x4c0d41.errorMessage);
		}
			break;
		case 'followShop':
		case 'doBrowGoodsTask':
		case 'doAddGoodsTask':
		case 'doShareTask':
		case 'doRemindTask':
		case 'doGetCouponTask':
		case 'doMeetingTask':
			if(_0x4c0d41.result===true){
			console.log('执行成功');
		}else{
			console.log(_0x4c0d41.errorMessage);
		}
			break;
		case 'startDraw':
			if(_0x4c0d41.result&&_0x4c0d41.data){
			if(_0x4c0d41.data.drawInfoType===6){
				console.log('抽奖获得：'+(_0x4c0d41.data.name||''));
			}else if(_0x4c0d41.data.drawInfoType===0){
				console.log('未抽中');
			}else{
				console.log('抽奖结果：'+(_0x4c0d41.data.name||''));
			}
		}
			console.log(JSON.stringify(_0x4c0d41));
			break;
		default:
			console.log(JSON.stringify(_0x4c0d41));
	}
}
function getPostRequest(_0x2d2fda,_0x3c9009){
	let _0x75b422={'Host':'lzkjdz-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Referer':(('https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/'+$.activityID+'?activityId=')+$.activityID+'&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined'),'user-agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie};
	return{'url':_0x2d2fda,'method':'POST','headers':_0x75b422,'body':_0x3c9009};
}
function accessLogWithAD(){
	let _0x1a2b84={'url':'https://lzkjdz-isv.isvjcloud.com/common/accessLogWithAD','headers':{'Host':'lzkjdz-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','user-agent':$.UA,'Referer':('https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/'+$.activityID+'?activityId='+$.activityID+'&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined'),'content-type':'application/x-www-form-urlencoded','Cookie':cookie},'body':'venderId='+$.shopid+'&code=69&pin='+encodeURIComponent($.pin)+'&activityId='+$.activityID+'&pageUrl=https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/'+$.activityID+'?activityId='+$.activityID+'&shareuserid4minipg=&shopid=undefined&subType=app&adSource='};
	return new Promise(_0x264ae5=>{
		$.post(_0x1a2b84,(_0x620f2a,_0x31ed72,_0x34fd3f)=>{
			try{
				if(_0x620f2a){
					console.log(''+JSON.stringify(_0x620f2a));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					setActivityCookie(_0x31ed72);
				}
			}catch(_0x4ac2ca){
				$.logErr(_0x4ac2ca,_0x31ed72);
			}
			finally{
				_0x264ae5(_0x34fd3f);
			}
		});
	});
}
function getActCk(){
	let _0x2addb5={'url':'https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/'+$.activityID+'?activityId='+$.activityID+'&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined','headers':{'Host':'lzkjdz-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Referer':('https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/'+$.activityID+'?activityId='+$.activityID+'&shareuserid4minipg=jd_4806fb66e0f3e&shopid=undefined'),'user-agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
	return new Promise(_0x347d65=>{
		$.get(_0x2addb5,(_0x4cd601,_0x3b7ea7,_0x3c53bf)=>{
			try{
				if(_0x4cd601){
					if(_0x3b7ea7&&(typeof _0x3b7ea7.statusCode!='undefined')){
						if(_0x3b7ea7.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					setActivityCookie(_0x3b7ea7);
				}
			}catch(_0x229212){
				$.logErr(_0x229212,_0x3b7ea7);
			}
			finally{
				_0x347d65(_0x3c53bf);
			}
		});
	});
}
function setActivityCookie(_0x5dc5d3){
	if(_0x5dc5d3.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0xa4a1a5 of _0x5dc5d3.headers['set-cookie']){
			lz_cookie[_0xa4a1a5.split(';')[0].substr(0,_0xa4a1a5.split(';')[0].indexOf('='))]=_0xa4a1a5.split(';')[0].substr(_0xa4a1a5.split(';')[0].indexOf('=')+1);
		}
		for(const _0x284c8e of Object.keys(lz_cookie)){
			cookie+=(_0x284c8e+'='+lz_cookie[_0x284c8e]+';');
		}
		activityCookie=cookie;
	}
}
function getToken(){
	let _0x2963bd={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator&clientVersion=10.0.6&build=88852&client=android&d_brand=Xiaomi&d_model=RedmiK30&osVersion=11&screen=2175*1080&partner=xiaomi001&oaid=b30cf82cacfa8972&openudid=290955c2782e1c44&eid=eidAef5f8122a0sf2tNlFbi9TV+3rtJ+jl5UptrTZo/Aq5MKUEaXcdTZC6RfEBt5Jt3Gtml2hS+ZvrWoDvkVv4HybKpJJVMdRUkzX7rGPOis1TRFRUdU&sdkVersion=30&lang=zh_CN&uuid=290955c2782e1c44&aid=290955c2782e1c44&area=1_2803_2829_0&networkType=wifi&wifiBssid=unknown&uts=0f31TVRjBSsSbxrSGoN9DgdOSm6pBw5mcERcSRBBxns2PPMfI6n6ccc3sDC5tvqojX6KE6uHJtCmbQzfS%2B6T0ggVk1TfVMHdFhgxdB8xiJq%2BUJPVGAaS5duja15lBdKzCeU4J31903%2BQn8mkzlfNoAvZI7hmcbV%2FZBnR1VdoiUChwWlAxuEh75t18FqkjuqQHvhONIbhrfofUoFzbcriHw%3D%3D&uemps=0-0&harmonyOs=0&st=1625157308996&sign=e5ef32369adb2e4b7024cff612395a72&sv=110','body':'body=%7B%22id%22%3A%22%22%2C%22url%22%3A%22https%3A%2F%2Flzkjdz-isv.isvjcloud.com%22%7D&','headers':{'Host':'api.m.jd.com','accept':'*/*','user-agent':'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)','accept-language':'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6','content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
	return new Promise(_0x8bffe7=>{
		$.post(_0x2963bd,async(_0x546084,_0x30d4,_0x1dfe1b)=>{
			try{
				if(_0x546084){
					console.log(''+JSON.stringify(_0x546084));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x1dfe1b=JSON.parse(_0x1dfe1b);
					$.token=_0x1dfe1b.token;
				}
			}catch(_0x3bbb9c){
				$.logErr(_0x3bbb9c,_0x30d4);
			}
			finally{
				_0x8bffe7(_0x1dfe1b);
			}
		});
	});
}
async function getUA(){
	$.UA='jdapp;iPhone;10.0.10;14.3;'+randomString(40)+';network/wifi;model/iPhone12,1;addressid/3364463029;appBuild/167764;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x10dc91){
	_0x10dc91=(_0x10dc91||32);
	let _0x1df825='abcdef0123456789',_0x2deef9=_0x1df825.length,_0x26b88b='';
	for(i=0;i<_0x10dc91;i++)_0x26b88b+=_0x1df825.charAt(Math.floor(Math.random()*_0x2deef9));
	return _0x26b88b;
}
function TotalBean(){
	return new Promise(async _0x264ee6=>{
		const _0x468abb={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{
				'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
			}};
		$.post(_0x468abb,(_0x577524,_0x54c0ee,_0x526dc0)=>{
			try{
				if(_0x577524){
					console.log(''+JSON.stringify(_0x577524));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x526dc0){
						_0x526dc0=JSON.parse(_0x526dc0);
						if(_0x526dc0.retcode===13){
							$.isLogin=false;
							return;
						}if(_0x526dc0.retcode===0){
							$.nickName=_0x526dc0.base&&_0x526dc0.base.nickname||$.UserName;
						}else{
							$.nickName=$.UserName;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x251d41){
				$.logErr(_0x251d41,_0x54c0ee);
			}
			finally{
				_0x264ee6();
			}
		});
	});
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x583de6=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x3e247d='';
		if($.shopactivityId)_0x3e247d=',"activityId":'+$.shopactivityId;
		let _0x1384c2='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x3e247d+',"channel":406}';
		let _0x12f0c6=await geth5st();
		const _0xd5d1e={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x1384c2+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x12f0c6,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0xd5d1e,async(_0x325850,_0xc63ff1,_0x6f5108)=>{
			try{
				_0x6f5108=_0x6f5108&&_0x6f5108.match(/jsonp_.*?\((.*?)\);/)&&_0x6f5108.match(/jsonp_.*?\((.*?)\);/)[1]||_0x6f5108;
				let _0xdc8ccb=$.toObj(_0x6f5108,_0x6f5108);
				if(_0xdc8ccb&&(typeof _0xdc8ccb=='object')){
					if(_0xdc8ccb&&_0xdc8ccb.success===true){
						console.log(_0xdc8ccb.message);
						$.errorJoinShop=_0xdc8ccb.message;
						if(_0xdc8ccb.result&&_0xdc8ccb.result.giftInfo){
							for(let _0x43bf38 of _0xdc8ccb.result.giftInfo.giftList){
								console.log('入会获得:'+_0x43bf38.discountString+_0x43bf38.prizeName+_0x43bf38.secondLineDesc);
							}
						}
					}else if(_0xdc8ccb&&(typeof _0xdc8ccb=='object')&&_0xdc8ccb.message){
						$.errorJoinShop=_0xdc8ccb.message;
						console.log(''+(_0xdc8ccb.message||''));
					}else{
						console.log(_0x6f5108);
					}
				}else{
					console.log(_0x6f5108);
				}
			}catch(_0x4500c3){
				$.logErr(_0x4500c3,_0xc63ff1);
			}
			finally{
				_0x583de6();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x4974f8=>{
		let _0x3ef455='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let _0x51a462=await geth5st();
		const _0x420c2b={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x3ef455+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x51a462,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x420c2b,async(_0x50c1fa,_0x44ab12,_0x11fdb8)=>{
			try{
				_0x11fdb8=_0x11fdb8&&_0x11fdb8.match(/jsonp_.*?\((.*?)\);/)&&_0x11fdb8.match(/jsonp_.*?\((.*?)\);/)[1]||_0x11fdb8;
				let _0x49e10f=$.toObj(_0x11fdb8,_0x11fdb8);
				if(_0x49e10f&&(typeof _0x49e10f=='object')){
					if(_0x49e10f&&_0x49e10f.success==true){
						console.log('入会:'+(_0x49e10f.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x49e10f.result.interestsRuleList&&_0x49e10f.result.interestsRuleList[0]&&_0x49e10f.result.interestsRuleList[0].interestsInfo&&_0x49e10f.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x11fdb8);
				}
			}catch(_0x12f83d){
				$.logErr(_0x12f83d,_0x44ab12);
			}
			finally{
				_0x4974f8();
			}
		});
	});
}
var _0xodb='jsjiami.com.v6',_0xodb_=['‮_0xodb'],_0x3c1b=[_0xodb,'wqkgAcKeOQ==','NBDCnDEf','wqhhw7HDi8Ka','wrzCuHM/w6Qj','wpJyw7PDuMKE','E0bCnA==','BxbCg8KoSA==','QnjDk0Ycw6d1ZsK8w6RawpTDhMK2DMOyZcKvBTpYw4pvP8OyNFnCssO/w5DDjVvDhH3DocKWwpMGUMKVVsK/JDXCvcK9QMOIwqHDpMOXGk/DlAnDkxrDnMO/w5vDn2zCq8O9UsKBw7h3H1JFwp7CgzTCo8KTacOab2DCqcOSw7UZBVLCgWPDo8KoJGbDsMKDBA/Cl8KTwoBsF8OYPcOVwpUSWcOaaGlkwq0AF2tnPcK6w4tme8OcTMKZwrwND8OMLDNCw5TCq8OHw4BZJkzDlBoOwoHCi8KswofCu8KeX8OEwq7DrHsYw7bDn8KnGCECakwjKiTCr8ODRh/CgQ==','N8KtRw==','LDbCrMKSfQ==','w6LDpG1qNA==','wpEXUcOjCA==','FV7Ch8KGZQ==','CWPCmXPCnA==','wrg0w4g=','YsOYw4oQw7oKAMOowok=','AAbCgQwHw6g=','w5bDjClaCcO8YcK7','JMKpOsO2ayRI','WsO5CMKfwq7DnMOJwqE=','w40KQnnCnMOYf8OJw4Na','PsKnRGvCtjUTZEhE','w7QjwrVeScOw','JcKgIcOdeA==','OMKgX0rCkA==','VHjClMOCw4Q1wr7CjQjChHfDrMOKwozDsA==','w5bCmMOtwrAXw4Je','UHLCjsOsw4wt','F8O3VsOmKXXDjDsLJCQ=','wqojL8K/L8Ke','PlfDgMKmScOr','wqZow6nDn8Kwwog=','CUzCmH4=','wrHDkTw=','TMONdMOcwq0=','KgzCnQYSw7Q=','OcK7N8K8w7w=','wro5I8KvOsKY','wro+w5FlHFg=','c8OmMcKhwoM=','WQQTw6Fo','xjsjiaNUmi.xucoLOwqm.vBle6VKE=='];
if(function(_0x439ff7,_0x2bbb13,_0x5ab636){
	function _0x393a10(_0x1bfb69,_0xf864e0,_0x11f373,_0xa9cc44,_0x35feda,_0x18760a){
		_0xf864e0=(_0xf864e0>>0x8),_0x35feda='po';
		var _0x3ffef8='shift',_0x4fe93b='push',_0x18760a='‮';
		if(_0xf864e0<_0x1bfb69){
			while(--_0x1bfb69){
				_0xa9cc44=_0x439ff7[_0x3ffef8]();
				if((_0xf864e0===_0x1bfb69)&&(_0x18760a==='‮')&&(_0x18760a.length===1)){
					_0xf864e0=_0xa9cc44,_0x11f373=_0x439ff7[_0x35feda+'p']();
				}else if(_0xf864e0&&_0x11f373.replace(/[xNUxuLOwqBleVKE=]/g,'')===_0xf864e0){
					_0x439ff7[_0x4fe93b](_0xa9cc44);
				}
			}
			_0x439ff7[_0x4fe93b](_0x439ff7[_0x3ffef8]());
		}
		return 968710;
	};
	return _0x393a10(++_0x2bbb13,_0x5ab636)>>_0x2bbb13^_0x5ab636;
}(_0x3c1b,411,105216),_0x3c1b){
	_0xodb_=_0x3c1b.length^0x19b;
};
function _0x80d0(_0x322db5,_0x5e3894){
	_0x322db5=~~'0x'.concat(_0x322db5.slice(1));
	var _0x372972=_0x3c1b[_0x322db5];
	if(_0x80d0.ZHvfIH===undefined){
		(function(){
			var _0x4906cb=typeof window!=='undefined'?window:typeof process==='object'&&(typeof require==='function')&&typeof global==='object'?global:this;
			var _0x3ec8b2='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			_0x4906cb.atob||(_0x4906cb.atob=function(_0x1aa575){
				var _0x13b801=String(_0x1aa575).replace(/=+$/,'');
				for(var _0xae019a=0,_0x530658,_0x3e68c8,_0x4424a5=0,_0x1a3f12='';_0x3e68c8=_0x13b801.charAt(_0x4424a5++);~_0x3e68c8&&(_0x530658=(_0xae019a%4)?(_0x530658*64+_0x3e68c8):_0x3e68c8,_0xae019a++%4)?_0x1a3f12+=String.fromCharCode(0xff&_0x530658>>-2*_0xae019a&0x6):0){
					_0x3e68c8=_0x3ec8b2.indexOf(_0x3e68c8);
				}
				return _0x1a3f12;
			});
		}());
		function _0x341be8(_0x36bd17,_0x5e3894){
			var _0x445b6c=[],_0x526b7d=0,_0x9df354,_0x2e123d='',_0xc27c0e='';
			_0x36bd17=atob(_0x36bd17);
			for(var _0x336e23=0,_0x5ae50c=_0x36bd17.length;_0x336e23<_0x5ae50c;_0x336e23++){
				_0xc27c0e+=('%'+('00'+_0x36bd17.charCodeAt(_0x336e23).toString(16)).slice(-2));
			}
			_0x36bd17=decodeURIComponent(_0xc27c0e);
			for(var _0x456002=0;_0x456002<256;_0x456002++){
				_0x445b6c[_0x456002]=_0x456002;
			}
			for(_0x456002=0;_0x456002<256;_0x456002++){
				_0x526b7d=(_0x526b7d+_0x445b6c[_0x456002]+_0x5e3894.charCodeAt(_0x456002%_0x5e3894.length)%256);
				_0x9df354=_0x445b6c[_0x456002];
				_0x445b6c[_0x456002]=_0x445b6c[_0x526b7d];
				_0x445b6c[_0x526b7d]=_0x9df354;
			}
			_0x456002=0;
			_0x526b7d=0;
			for(var _0x42de7a=0;_0x42de7a<_0x36bd17.length;_0x42de7a++){
				_0x456002=(_0x456002+1%256);
				_0x526b7d=(_0x526b7d+_0x445b6c[_0x456002]%256);
				_0x9df354=_0x445b6c[_0x456002];
				_0x445b6c[_0x456002]=_0x445b6c[_0x526b7d];
				_0x445b6c[_0x526b7d]=_0x9df354;
				_0x2e123d+=String.fromCharCode(_0x36bd17.charCodeAt(_0x42de7a)^_0x445b6c[_0x445b6c[_0x456002]+_0x445b6c[_0x526b7d]%256]);
			}
			return _0x2e123d;
		}
		_0x80d0.uZkhLK=_0x341be8;
		_0x80d0.PgBxtv={};
		_0x80d0.ZHvfIH=true;
	}
	var _0x36dbe2=_0x80d0.PgBxtv[_0x322db5];
	if(_0x36dbe2===undefined){
		if(_0x80d0.mzwOwg===undefined){
			_0x80d0.mzwOwg=true;
		}
		_0x372972=_0x80d0.uZkhLK(_0x372972,_0x5e3894);
		_0x80d0.PgBxtv[_0x322db5]=_0x372972;
	}else{
		_0x372972=_0x36dbe2;
	}
	return _0x372972;
};
function generateFp(){
	var _0x3d1264={'ryoPy':'0123456789','mfvwK':function(_0x36121f,_0x127fa3){
			return _0x36121f|_0x127fa3;
		},'WutDU':function(_0x450893,_0x5428e4){
			return _0x450893+_0x5428e4;
		}};
	let _0xa87f02=_0x3d1264[_0x80d0('‮0','wj)i')];
	let _0x5989be=13;
	let _0x4a939c='';
	for(;_0x5989be--;)_0x4a939c+=_0xa87f02[_0x3d1264[_0x80d0('‮1','Z*hR')](Math.random()*_0xa87f02[_0x80d0('‮2','3@Q*')],0)];
	return _0x3d1264[_0x80d0('‮3','Z*hR')](_0x4a939c,Date[_0x80d0('‮4','Da%Y')]())[_0x80d0('‮5','LwWi')](0,16);
}
function geth5st(){
	var _0x413288={'XLFYP':'yyyyMMddhhmmssSSS','ERdzy':';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;','eaFvs':_0x80d0('‮6','@hXf'),'NqklQ':function(_0x5e6055,_0x403c0e){
			return _0x5e6055(_0x403c0e);
		},'DqrqH':function(_0x5a2467,_0x526391){
			return _0x5a2467+_0x526391;
		},'GEDpa':function(_0x2725f2,_0x22f018){
			return _0x2725f2+_0x22f018;
		},'tJryJ':function(_0x1e5e98,_0x399328){
			return _0x1e5e98+_0x399328;
		}};
	let _0x2bfe1f=Date[_0x80d0('‮7','3B2S')]();
	let _0x1faac3=generateFp();
	let _0x583db9=new Date(_0x2bfe1f).Format(_0x413288[_0x80d0('‫8','LwWi')]);
	let _0x280dd1=[_0x413288.ERdzy,_0x413288[_0x80d0('‮9','SCQF')]];
	let _0x3231d4=_0x280dd1[random(0,_0x280dd1.length)];
	return _0x413288[_0x80d0('‫a','%HoM')](encodeURIComponent,_0x413288.DqrqH(_0x413288[_0x80d0('‫b','vWDW')](_0x413288[_0x80d0('‮c','Da%Y')](_0x583db9,';')+_0x1faac3,_0x3231d4),Date[_0x80d0('‮d','7]Bn')]()));
}
Date[_0x80d0('‫e','gM9$')][_0x80d0('‫f','wj)i')]=function(_0x6fbf52){
	var _0x163a80={'wGAVl':function(_0x5e9a51,_0x38d1b2){
			return _0x5e9a51/_0x38d1b2;
		},'aborC':function(_0x239c51,_0xa07cc3){
			return _0x239c51+_0xa07cc3;
		},'khvyA':function(_0x37b336,_0x363b6d){
			return _0x37b336===_0x363b6d;
		},'RkhHN':function(_0x252ffe,_0x4fb61d){
			return _0x252ffe==_0x4fb61d;
		}};
	var _0x44bf90,_0x4982fa=this,_0x5d28fa=_0x6fbf52,_0x15505d={'M+':(_0x4982fa[_0x80d0('‮10','lEbY')]()+1),'d+':_0x4982fa.getDate(),'D+':_0x4982fa[_0x80d0('‮11','m]Ir')](),'h+':_0x4982fa.getHours(),'H+':_0x4982fa[_0x80d0('‫12','hLmb')](),'m+':_0x4982fa[_0x80d0('‫13','y[mS')](),'s+':_0x4982fa[_0x80d0('‮14','3B2S')](),'w+':_0x4982fa[_0x80d0('‫15','$n0%')](),'q+':Math[_0x80d0('‮16','m]Ir')](_0x163a80.wGAVl(_0x163a80[_0x80d0('‮17','3B2S')](_0x4982fa.getMonth(),3),3)),'S+':_0x4982fa[_0x80d0('‫18','3aAN')]()};
	/(y+)/i.test(_0x5d28fa)&&(_0x5d28fa=_0x5d28fa[_0x80d0('‫19','bosv')](RegExp.$1,''[_0x80d0('‮1a','3aAN')](_0x4982fa[_0x80d0('‫1b','n1@B')]())[_0x80d0('‮1c','ctu&')](4-RegExp.$1[_0x80d0('‫1d','T8*w')])));
	for(var _0x5abce7 in _0x15505d){
		if(new RegExp('('[_0x80d0('‮1e','Z*hR')](_0x5abce7,')'))[_0x80d0('‮1f','Da%Y')](_0x5d28fa)){
			var _0x5c0a77,_0x5955a6=_0x163a80.khvyA('S+',_0x5abce7)?_0x80d0('‫20','dvcH'):'00';
			_0x5d28fa=_0x5d28fa.replace(RegExp.$1,_0x163a80[_0x80d0('‫21','Jp@*')](1,RegExp.$1[_0x80d0('‫22','wj)i')])?_0x15505d[_0x5abce7]:_0x163a80[_0x80d0('‫23','JH9X')](''.concat(_0x5955a6),_0x15505d[_0x5abce7]).substr(''[_0x80d0('‮24','ctu&')](_0x15505d[_0x5abce7])[_0x80d0('‫25','7]Bn')]));
		}
	}
	return _0x5d28fa;
};
function random(_0x4bfa00,_0x18ec9c){
	var _0x342cc8={'NzMvB':function(_0x2dfe38,_0x212988){
			return _0x2dfe38+_0x212988;
		},'pvLRb':function(_0x22f6d4,_0x179284){
			return _0x22f6d4*_0x179284;
		},'KNgAC':function(_0x480b7f,_0x384f29){
			return _0x480b7f-_0x384f29;
		}};
	return _0x342cc8[_0x80d0('‫26','hLmb')](Math[_0x80d0('‫27','eShm')](_0x342cc8[_0x80d0('‮28','ctu&')](Math.random(),_0x342cc8.KNgAC(_0x18ec9c,_0x4bfa00))),_0x4bfa00);
};
_0xodb='jsjiami.com.v6';

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
