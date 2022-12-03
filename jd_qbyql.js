/*
12.1-12.31 倩碧邀请礼


1.邀请满3人30豆，邀请5人50 共计80
2.开1张卡
3.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 12.1-12.31 倩碧邀请礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#12.1-12.31 倩碧邀请礼
11 11 11 11 * jd_qbyql.js, tag=12.1-12.31 倩碧邀请礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.1-12.31 倩碧邀请礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjd.com';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x58f564=>{
		cookiesArr.push(jdCookieNode[_0x58f564]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x2af7cd=>_0x2af7cd.cookie)]['filter'](_0x45a201=>!!_0x45a201);
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
	$.activityId='2201100037643114';
	authorCodeList=await getAuthorCodeList('http://code.kingran.ga/qbyql.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjd.com/m/1000376431/99/2201100037643114/?helpUuid='+$.shareUuid);
	for(let _0x263f77=0;_0x263f77<cookiesArr.length;_0x263f77++){
		cookie=cookiesArr[_0x263f77];
		originCookie=cookiesArr[_0x263f77];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x263f77+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x263f77==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0xab8e00='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0xab8e00);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0xab8e00);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x23c7bb=>$.logErr(_0x23c7bb))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x89e065=false;
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
		await getSimpleActInfoVo();
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if($.openStatus==false){
			console.log('开卡');
			$.joinVenderId=1000376431;
			await joinShop();
			if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
				console.log('第1次 重新开卡');
				await $.wait(parseInt(Math.random()*2000+3000,10));
				await joinShop();
			}
			if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
				console.log('开卡失败❌ ，重新执行脚本');
			}else{
				$.assistStatus=true;
			}
			await takePostRequest('getOpenCardStatusWithOutSelf');
			await takePostRequest('activityContent');
		}
		await $.wait(1000);
		await takePostRequest('getInviteSend');
		if($.thirtyBeans==1){
			console.log('开始领取第一档奖励');
			$.prizFlag=1;
			await takePostRequest('sendGift');
			await $.wait(1000);
		}
		if($.fiftyBeans==1){
			console.log('开始领取第二档奖励');
			$.prizFlag=2;
			await takePostRequest('sendGift');
			await $.wait(1000);
		}
		if($.fifteen===1){
			console.log('第三档奖励需自行进入活动页面领取');
		}
		console.log($.openStatus===true?'已开卡':$.openStatus===false?'未开卡':'未知-'+$.openStatus);
		console.log($.helpStatus===1?'助力成功':$.helpStatus===0?'已助力,或者已开卡无法助力':$.helpStatus===2?'不能助力自己':'未知-'+$.helpStatus);
		if($.index==1){
			$.helpCount=$.assistCount;
		}else if($.helpStatus==1){
			$.helpCount++;
		}
		console.log('【账号'+$.index+'】助力人数：'+$.assistCount+($.index!=1&&' 【账号1】助力人数：'+$.helpCount||''));
		if($.helpCount>=5)$.hasEnd=true;
		console.log($.actorUuid);
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+5000,10));
	}catch(_0x45b132){
		console.log(_0x45b132);
	}
}
async function takePostRequest(_0x17e87c){
	if($.outFlag)return;
	let _0x768d41='https://lzkjdz-isv.isvjd.com';
	let _0x4ecfdb='';
	let _0x236eaf='POST';
	let _0x23df96='';
	switch(_0x17e87c){
		case 'getMyPing':
			url=_0x768d41+'/customer/getMyPing';
			_0x4ecfdb='token='+$.Token+'&fromType=APP&userId=1000376431&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x768d41+'/common/brand/getSimpleActInfoVo';
			_0x4ecfdb='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x768d41+'/common/accessLogWithAD';
			let _0xa7c5aa='https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x4ecfdb='venderId=1000376431&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0xa7c5aa);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x768d41+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x4ecfdb='venderId=1000376431&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x768d41+'/clinique/invite/wx/activityContent';
			_0x4ecfdb='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&helpUuid='+$.shareUuid;
			break;
		case 'sendGift':
			url=_0x768d41+'/clinique/invite/wx/sendGift';
			_0x4ecfdb='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&prizFlag='+$.prizFlag;
			break;
		case 'getInviteSend':
			url=_0x768d41+'/clinique/invite/wx/getInviteSend';
			_0x4ecfdb='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x17e87c);
	}
	let _0x143b88=getPostRequest(url,_0x4ecfdb,_0x236eaf);
	return new Promise(async _0x3c2ae1=>{
		$.post(_0x143b88,(_0xd0acff,_0x235359,_0x1c2887)=>{
			try{
				setActivityCookie(_0x235359);
				if(_0xd0acff){
					if(_0x235359&&typeof _0x235359.statusCode!='undefined'){
						if(_0x235359.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xd0acff,_0xd0acff));
					console.log(_0x17e87c+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x17e87c,_0x1c2887);
				}
			}catch(_0x49f719){
				console.log(_0x49f719,_0x235359);
			}finally{
				_0x3c2ae1();
			}
		});
	});
}
async function dealReturn(_0x42207a,_0x5da996){
	let _0x5ae6c2='';
	try{
		if(_0x42207a!='accessLogWithAD'||_0x42207a!='drawContent'){
			if(_0x5da996){
				_0x5ae6c2=JSON.parse(_0x5da996);
			}
		}
	}catch(_0x23aaa0){
		console.log(_0x42207a+' 执行任务异常');
		console.log(_0x5da996);
		$.runFalag=false;
	}
	try{
		switch(_0x42207a){
			case 'getMyPing':
				if(typeof _0x5ae6c2=='object'){
					if(_0x5ae6c2.result&&_0x5ae6c2.result===true){
						if(_0x5ae6c2.data&&typeof _0x5ae6c2.data['secretPin']!='undefined')$.Pin=_0x5ae6c2.data['secretPin'];
						if(_0x5ae6c2.data&&typeof _0x5ae6c2.data['nickname']!='undefined')$.nickname=_0x5ae6c2.data['nickname'];
					}else if(_0x5ae6c2.errorMessage){
						console.log(_0x42207a+' '+(_0x5ae6c2.errorMessage||''));
					}else{
						console.log(_0x42207a+' '+_0x5da996);
					}
				}else{
					console.log(_0x42207a+' '+_0x5da996);
				}
				break;
			case 'getInviteSend':
				if(typeof _0x5ae6c2=='object'){
					if(_0x5ae6c2.result&&_0x5ae6c2.result===true){
						$.thirtyBeans=_0x5ae6c2.data['thirtyBeans']||0;
						$.fiftyBeans=_0x5ae6c2.data['fiftyBeans']||0;
						$.fifteen=_0x5ae6c2.data['fifteen']||0;
					}else if(_0x5ae6c2.errorMessage){
						console.log(''+(_0x5ae6c2.errorMessage||''));
					}else{
						console.log(''+_0x5da996);
					}
				}else{
					console.log(''+_0x5da996);
				}
				break;
			case 'sendGift':
				if(typeof _0x5ae6c2=='object'){
					if(_0x5ae6c2.result&&_0x5ae6c2.result===true){
						console.log(''+_0x5ae6c2.data);
					}else if(_0x5ae6c2.errorMessage){
						console.log(''+(_0x5ae6c2.errorMessage||''));
					}else{
						console.log(' '+_0x5da996);
					}
				}else{
					console.log(''+_0x5da996);
				}
				break;
			case 'activityContent':
				if(typeof _0x5ae6c2=='object'){
					if(_0x5ae6c2.result&&_0x5ae6c2.result===true){
						$.actorUuid=_0x5ae6c2.data['customerId']||'';
						$.helpStatus=_0x5ae6c2.data['helpStatus']||0;
						$.assistCount=_0x5ae6c2.data['inviteNum']||0;
						if(_0x5ae6c2.data['sendBeanNum']){
							console.log('获得'+_0x5ae6c2.data['sendBeanNum']+'豆');
							allMessage+='【账号'+$.index+'】获得'+_0x5ae6c2.data['sendBeanNum']+'豆\n';
						}
					}else if(_0x5ae6c2.errorMessage){
						if(_0x5ae6c2.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x42207a+' '+(_0x5ae6c2.errorMessage||''));
					}else{
						console.log(_0x42207a+' '+_0x5da996);
					}
				}else{
					console.log(_0x42207a+' '+_0x5da996);
				}
				break;
			case'getOpenCardStatusWithOutSelf':
				if(typeof _0x5ae6c2=='object'){
					if(_0x5ae6c2.isOk){
						$.openStatus=_0x5ae6c2.openCard||false;
					}else if(_0x5ae6c2.errorMessage||_0x5ae6c2.msg){
						console.log(_0x42207a+' '+(_0x5ae6c2.errorMessage||_0x5ae6c2.msg||''));
					}else{
						console.log(_0x42207a+' '+_0x5da996);
					}
				}else{
					console.log(_0x42207a+' '+_0x5da996);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x42207a+'-> '+_0x5da996);
		}
		if(typeof _0x5ae6c2=='object'){
			if(_0x5ae6c2.errorMessage){
				if(_0x5ae6c2.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x4fbe0d){
		console.log(_0x4fbe0d);
	}
}
function getPostRequest(_0x1f277d,_0x170737,_0x3cb7bf='POST'){
	let _0x259acb={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x1f277d.indexOf('https://lzkjdz-isv.isvjd.com')>-1){
		_0x259acb.Referer='https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
		_0x259acb.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x1f277d,'method':_0x3cb7bf,'headers':_0x259acb,'body':_0x170737,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x225dc8=>{
		let _0x542e26={'url':'https://lzkjdz-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=2201100037643114','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x542e26,async(_0xc74d25,_0x455eaa,_0x39d7ba)=>{
			try{
				if(_0xc74d25){
					if(_0x455eaa&&typeof _0x455eaa.statusCode!='undefined'){
						if(_0x455eaa.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xc74d25));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x5704be=$.toObj(_0x39d7ba,_0x39d7ba);
					if(typeof _0x5704be=='object'){
						if(_0x5704be.result&&_0x5704be.result===true){
							$.endTime=_0x5704be.data['endTime']||0;
							$.startTimes=_0x5704be.data['startTime']||Date.now();
						}else if(_0x5704be.errorMessage){
							console.log(''+(_0x5704be.errorMessage||''));
						}else{
							console.log(''+_0x39d7ba);
						}
					}else{
						console.log(''+_0x39d7ba);
					}
				}
			}catch(_0x14c647){
				$.logErr(_0x14c647,_0x455eaa);
			}finally{
				_0x225dc8();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x5422ea=>{
		let _0xf6426={'url':'https://lzkjdz-isv.isvjd.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0xf6426,async(_0x16e4d3,_0xb91026,_0xd471e5)=>{
			try{
				if(_0x16e4d3){
					if(_0xb91026&&typeof _0xb91026.statusCode!='undefined'){
						if(_0xb91026.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x16e4d3));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x40cb7c=_0xd471e5.match(/(活动已经结束)/)&&_0xd471e5.match(/(活动已经结束)/)[1]||'';
					if(_0x40cb7c){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0xb91026);
				}
			}catch(_0x42bdfe){
				$.logErr(_0x42bdfe,_0xb91026);
			}finally{
				_0x5422ea();
			}
		});
	});
}
function setActivityCookie(_0x4399bf){
	if(_0x4399bf){
		if(_0x4399bf.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x19b118 of _0x4399bf.headers['set-cookie']){
				lz_cookie[_0x19b118.split(';')[0]['substr'](0,_0x19b118.split(';')[0]['indexOf']('='))]=_0x19b118.split(';')[0]['substr'](_0x19b118.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x55e5c9 of Object.keys(lz_cookie)){
				cookie+=_0x55e5c9+'='+lz_cookie[_0x55e5c9]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x29169f){
	_0x29169f=_0x29169f||32;
	let _0x42ff2b='abcdef0123456789',_0x156101=_0x42ff2b.length,_0x549e73='';
	for(i=0;i<_0x29169f;i++)_0x549e73+=_0x42ff2b.charAt(Math.floor(Math.random()*_0x156101));
	return _0x549e73;
}
async function joinShop(){
	return new Promise(async _0xe41bca=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x398494='';
		if($.shopactivityId)_0x398494=',"activityId":'+$.shopactivityId;
		const _0x4f33b5='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x398494+',"channel":406}';
		const _0x539020={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x4f33b5)};
		const _0x1bfdd3=await getH5st('8adfb',_0x539020);
		const _0x41596c={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x4f33b5+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1bfdd3),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x41596c,async(_0x40abdd,_0x4966e2,_0x518bbe)=>{
			try{
				_0x518bbe=_0x518bbe&&_0x518bbe.match(/jsonp_.*?\((.*?)\);/)&&_0x518bbe.match(/jsonp_.*?\((.*?)\);/)[1]||_0x518bbe;
				let _0x224946=$.toObj(_0x518bbe,_0x518bbe);
				if(_0x224946&&typeof _0x224946=='object'){
					if(_0x224946&&_0x224946.success===true){
						console.log(_0x224946.message);
						$.errorJoinShop=_0x224946.message;
						if(_0x224946.result&&_0x224946.result['giftInfo']){
							for(let _0x2557e1 of _0x224946.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x2557e1.discountString+_0x2557e1.prizeName+_0x2557e1.secondLineDesc);
							}
						}
					}else if(_0x224946&&typeof _0x224946=='object'&&_0x224946.message){
						$.errorJoinShop=_0x224946.message;
						console.log(''+(_0x224946.message||''));
					}else{
						console.log(_0x518bbe);
					}
				}else{
					console.log(_0x518bbe);
				}
			}catch(_0x3bd004){
				$.logErr(_0x3bd004,_0x4966e2);
			}finally{
				_0xe41bca();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x20991b=>{
		let _0x233dc1='{"venderId":"1000002527","channel":406,"payUpShop":true}';
		const _0x19d1ae={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x233dc1)};
		const _0x2422a5=await getH5st('ef79a',_0x19d1ae);
		const _0x571b3e={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x233dc1+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x2422a5),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x571b3e,async(_0x5aabc5,_0x5695ac,_0x831a7e)=>{
			try{
				_0x831a7e=_0x831a7e&&_0x831a7e.match(/jsonp_.*?\((.*?)\);/)&&_0x831a7e.match(/jsonp_.*?\((.*?)\);/)[1]||_0x831a7e;
				let _0x12df00=$.toObj(_0x831a7e,_0x831a7e);
				if(_0x12df00&&typeof _0x12df00=='object'){
					if(_0x12df00&&_0x12df00.success==true){
						console.log('入会:'+(_0x12df00.result['shopMemberCardInfo']['venderCardName']||''));
						$.shopactivityId=_0x12df00.result['interestsRuleList']&&_0x12df00.result['interestsRuleList'][0]&&_0x12df00.result['interestsRuleList'][0]['interestsInfo']&&_0x12df00.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x831a7e);
				}
			}catch(_0x5d1c4d){
				$.logErr(_0x5d1c4d,_0x5695ac);
			}finally{
				_0x20991b();
			}
		});
	});
}
function getH5st(_0x5e8449,_0x47b9fc){
	return new Promise(async _0x123654=>{
		let _0x325d8f={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x5e8449+'&req='+encodeURIComponent(JSON.stringify(_0x47b9fc)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x325d8f,(_0x1b75a1,_0xf8eaef,_0x29ca87)=>{
			try{
				if(_0x1b75a1){
					console.log(JSON.stringify(_0x1b75a1));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0xaf979){
				$.logErr(_0xaf979,_0xf8eaef);
			}finally{
				_0x123654(_0x29ca87);
			}
		});
	});
}
function getAuthorCodeList(_0x1d9114){
	return new Promise(_0x4e4d8b=>{
		const _0x41b4a2={'url':_0x1d9114+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x41b4a2,async(_0x4ac899,_0x3d7bb9,_0x388381)=>{
			try{
				if(_0x4ac899){
					$.log(_0x4ac899);
				}else{
					if(_0x388381)_0x388381=JSON.parse(_0x388381);
				}
			}catch(_0x12b94e){
				$.logErr(_0x12b94e,_0x3d7bb9);
				_0x388381=null;
			}finally{
				_0x4e4d8b(_0x388381);
			}
		});
	});
}
function jsonParse(_0x42f330){
	if(typeof _0x42f330=='string'){
		try{
			return JSON.parse(_0x42f330);
		}catch(_0x3f5913){
			console.log(_0x3f5913);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};