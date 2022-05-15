/*
5.11-5.22 祖玛珑邀请有礼

1.邀请满3人30豆，邀请满5人50豆，邀请满10人100豆  共计180豆
2.开1张卡
3.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 5.11-5.22 祖玛珑邀请有礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:10 13 11-22 5 *
============Quantumultx===============
[task_local]
#5.11-5.22 祖玛珑邀请有礼
10 13 11-22 5 * jd_opencardL143.js, tag=5.11-5.22 祖玛珑邀请有礼, enabled=true

*/

const $=new Env('5.11-5.22 祖玛珑邀请有礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x593e9e=>{
		cookiesArr.push(jdCookieNode[_0x593e9e]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x144ff6=>_0x144ff6.cookie)].filter(_0x5e7449=>!!_0x5e7449);
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
	$.assistStatus=false;
	$.activityId='2205100041110401';
	$.shareUuid='';
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000411104/99/'+$.activityId+'/?helpUuid='+$.shareUuid);
	let _0x21a609=['',''];
	let _0x1d36f0=Math.floor(Math.random()*2);
	let _0x502ac5=0;
	_0x502ac5=Math.floor(Math.random()*_0x21a609.length);
	$.shareUuid=_0x21a609[_0x502ac5]?_0x21a609[_0x502ac5]:$.shareUuid;
	for(let _0x1d1520=0;_0x1d1520<cookiesArr.length;_0x1d1520++){
		cookie=cookiesArr[_0x1d1520];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(_0x1d1520+1);
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if((_0x1d1520==0)&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}if($.outFlag){
		let _0x257d0a='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x257d0a);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x257d0a);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0x3c46fa=>$.logErr(_0x3c46fa)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x4b5377=false;
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
			$.joinVenderId=1000411104;
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
				allMessage+='【账号'+$.index+'】开卡失败❌ ，重新执行脚本\n';
			}else{
				$.assistStatus=true;
			}
			await takePostRequest('getOpenCardStatusWithOutSelf');
			await takePostRequest('activityContent');
		}
		await $.wait(1000);
		console.log(($.openStatus===true)?'已开卡':($.openStatus===false)?'未开卡':('未知-'+$.openStatus));
		console.log($.helpStatus===1?'助力成功':($.helpStatus===0)?'已助力,或者已开卡无法助力':($.helpStatus===2)?'不能助力自己':('未知-'+$.helpStatus));
		if($.index==1){
			$.helpCount=$.assistCount;
		}else if($.helpStatus==1){
			$.helpCount++;
		}
		console.log('【账号'+$.index+'】助力人数：'+$.assistCount+(($.index!=1)&&' 【账号1】助力人数：'+$.helpCount||''));
		if($.helpCount>=10)$.hasEnd=true;
		console.log($.actorUuid);
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if(($.index%3)==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+5000,10));
	}catch(_0x3b3d8f){
		console.log(_0x3b3d8f);
	}
}
async function takePostRequest(_0x118a66){
	if($.outFlag)return;
	let _0x1ae729='https://lzkjdz-isv.isvjcloud.com';
	let _0x1af573='';
	let _0x4b4952='POST';
	let _0x59d29e='';
	switch(_0x118a66){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x1af573='body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954';
			break;
		case'getMyPing':
			url=_0x1ae729+'/customer/getMyPing';
			_0x1af573='token='+$.Token+'&fromType=APP&userId=1000411104&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x1ae729+'/common/brand/getSimpleActInfoVo';
			_0x1af573='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x1ae729+'/common/accessLogWithAD';
			let _0x2ab23b='https://lzkjdz-isv.isvjcloud.com/m/1000411104/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x1af573='venderId=1000411104&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x2ab23b);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x1ae729+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x1af573='venderId=1000411104&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x1ae729+'/jomalone/invite/activityContent';
			_0x1af573='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&helpUuid='+$.shareUuid;
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x1ae729+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x1af573='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x1ae729+'/dingzhi/taskact/common/getShareRecord';
			_0x1af573='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		default:
			console.log('错误'+_0x118a66);
	}
	let _0x19cecf=getPostRequest(url,_0x1af573,_0x4b4952);
	return new Promise(async _0x5a9d2d=>{
		$.post(_0x19cecf,(_0x71c7b9,_0x3ea8c7,_0x697d27)=>{
			try{
				setActivityCookie(_0x3ea8c7);
				if(_0x71c7b9){
					if(_0x3ea8c7&&(typeof _0x3ea8c7.statusCode!='undefined')){
						if(_0x3ea8c7.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x71c7b9,_0x71c7b9));
					console.log(_0x118a66+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x118a66,_0x697d27);
				}
			}catch(_0x5c33dc){
				console.log(_0x5c33dc,_0x3ea8c7);
			}
			finally{
				_0x5a9d2d();
			}
		});
	});
}
async function dealReturn(_0x5f558b,_0x14a5f9){
	let _0x39441d='';
	try{
		if((_0x5f558b!='accessLogWithAD')||_0x5f558b!='drawContent'){
			if(_0x14a5f9){
				_0x39441d=JSON.parse(_0x14a5f9);
			}
		}
	}catch(_0x313a5c){
		console.log(_0x5f558b+' 执行任务异常');
		console.log(_0x14a5f9);
		$.runFalag=false;
	}try{
		switch(_0x5f558b){
			case 'isvObfuscator':
				if(typeof _0x39441d=='object'){
					if(_0x39441d.errcode==0){
					if(typeof _0x39441d.token!='undefined')$.Token=_0x39441d.token;
				}else if(_0x39441d.message){
					console.log('isvObfuscator '+(_0x39441d.message||''));
				}else{
					console.log(_0x14a5f9);
				}
				}else{
					console.log(_0x14a5f9);
				}
				break;
			case 'getMyPing':
				if(typeof _0x39441d=='object'){
					if(_0x39441d.result&&(_0x39441d.result===true)){
					if(_0x39441d.data&&typeof _0x39441d.data.secretPin!='undefined')$.Pin=_0x39441d.data.secretPin;
					if(_0x39441d.data&&(typeof _0x39441d.data.nickname!='undefined'))$.nickname=_0x39441d.data.nickname;
				}else if(_0x39441d.errorMessage){
					console.log(_0x5f558b+' '+(_0x39441d.errorMessage||''));
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				break;
			case 'activityContent':
				if(typeof _0x39441d=='object'){
					if(_0x39441d.result&&(_0x39441d.result===true)){
					$.actorUuid=_0x39441d.data.customerId||'';
					$.helpStatus=_0x39441d.data.helpStatus||0;
					$.assistCount=_0x39441d.data.inviteNum||0;
					if(_0x39441d.data.sendBeanNum){
						console.log('获得'+_0x39441d.data.sendBeanNum+'豆');
						allMessage+='【账号'+$.index+'】获得'+_0x39441d.data.sendBeanNum+'豆\n';
					}
				}else if(_0x39441d.errorMessage){
					if(_0x39441d.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
					console.log(_0x5f558b+' '+(_0x39441d.errorMessage||''));
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x39441d=='object'){
					if(_0x39441d.isOk){
					$.openStatus=_0x39441d.openCard||false;
				}else if(_0x39441d.errorMessage||_0x39441d.msg){
					console.log(_0x5f558b+' '+(_0x39441d.errorMessage||_0x39441d.msg||''));
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x39441d=='object'){
					if(_0x39441d.result&&(_0x39441d.result===true)){
					console.log('我的奖品：');
					let _0x3e617e=0;
					let _0x7d8b75=0;
					let _0x37233f={'dayShareBeans':'邀请','dayBeSharedBeans':'被邀请','openCardBeans':'开卡','saveTaskBeans23':'关注','saveTaskBeans12':'逛店铺','saveTaskBeans21':'加购'};
					for(let _0x2581ec in _0x39441d.data){
						let _0x10c064=_0x39441d.data[_0x2581ec];
						if(_0x10c064.drawId=='dayShareBeans'){
							_0x3e617e++;
							_0x7d8b75=_0x10c064.infoName.replace('京豆','');
						}else{
							console.log(''+((_0x10c064.infoType!=10)&&_0x10c064.drawId&&(_0x37233f[_0x10c064.drawId]||_0x10c064.drawId+':')||_0x10c064.value&&(_0x10c064.value+':')||'')+_0x10c064.infoName);
						}
					}
					if(_0x3e617e>0)console.log('邀请好友('+_0x3e617e+'):'+((_0x3e617e*parseInt(_0x7d8b75,10))||30)+'京豆');
				}else if(_0x39441d.errorMessage){
					console.log(_0x5f558b+' '+(_0x39441d.errorMessage||''));
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				break;
			case'getShareRecord':
				if(typeof _0x39441d=='object'){
					if(_0x39441d.result&&(_0x39441d.result===true)&&_0x39441d.data){
					$.ShareCount=_0x39441d.data.length;
					$.log('=========== 你邀请了:'+_0x39441d.data.length+'个');
				}else if(_0x39441d.errorMessage){
					console.log(_0x5f558b+' '+(_0x39441d.errorMessage||''));
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				}else{
					console.log(_0x5f558b+' '+_0x14a5f9);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x5f558b+'-> '+_0x14a5f9);
		}
		if(typeof _0x39441d=='object'){
			if(_0x39441d.errorMessage){
				if(_0x39441d.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x41a6cc){
		console.log(_0x41a6cc);
	}
}
function getPostRequest(_0x15a8cf,_0x3cc69a,_0x4ebdc7='POST'){
	let _0x489589={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x15a8cf.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x489589.Referer='https://lzkjdz-isv.isvjcloud.com/m/1000411104/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
		_0x489589.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':_0x15a8cf,'method':_0x4ebdc7,'headers':_0x489589,'body':_0x3cc69a,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x3294bf=>{
		let _0x2d9ef3={'url':'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2205100041110401','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/m/1000411104/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x2d9ef3,async(_0x4f4418,_0x464ee8,_0x2a2b3e)=>{
			try{
				if(_0x4f4418){
					if(_0x464ee8&&(typeof _0x464ee8.statusCode!='undefined')){
						if(_0x464ee8.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x4f4418));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0xfac7d9=$.toObj(_0x2a2b3e,_0x2a2b3e);
					if(typeof _0xfac7d9=='object'){
						if(_0xfac7d9.result&&(_0xfac7d9.result===true)){
							$.endTime=_0xfac7d9.data.endTime||0;
							$.startTimes=_0xfac7d9.data.startTime||Date.now();
						}else if(_0xfac7d9.errorMessage){
							console.log(''+(_0xfac7d9.errorMessage||''));
						}else{
							console.log(''+_0x2a2b3e);
						}
					}else{
						console.log(''+_0x2a2b3e);
					}
				}
			}catch(_0x35a3b8){
				$.logErr(_0x35a3b8,_0x464ee8);
			}
			finally{
				_0x3294bf();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x18c6f6=>{
		let _0x497e26={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/m/1000411104/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x497e26,async(_0x1678f4,_0x23fcaa,_0x3c7910)=>{
			try{
				if(_0x1678f4){
					if(_0x23fcaa&&(typeof _0x23fcaa.statusCode!='undefined')){
						if(_0x23fcaa.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x1678f4));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x5a1205=_0x3c7910.match(/(活动已经结束)/)&&_0x3c7910.match(/(活动已经结束)/)[1]||'';
					if(_0x5a1205){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x23fcaa);
				}
			}catch(_0x3c3d05){
				$.logErr(_0x3c3d05,_0x23fcaa);
			}
			finally{
				_0x18c6f6();
			}
		});
	});
}
function setActivityCookie(_0xee1b60){
	let _0x1fe24f='';
	let _0x38e162='';
	let _0x595762='';
	let _0x3c5a3d=_0xee1b60&&_0xee1b60.headers&&(_0xee1b60.headers['set-cookie']||_0xee1b60.headers['Set-Cookie']||'')||'';
	let _0x3834c8='';
	if(_0x3c5a3d){
		if(typeof _0x3c5a3d!='object'){
			_0x3834c8=_0x3c5a3d.split(',');
		}else _0x3834c8=_0x3c5a3d;
		for(let _0x54fc79 of _0x3834c8){
			let _0x19fb43=_0x54fc79.split(';')[0].trim();
			if(_0x19fb43.split('=')[1]){
				if(_0x19fb43.indexOf('LZ_TOKEN_KEY=')>-1)_0x1fe24f=(_0x19fb43.replace(/ /g,'')+';');
				if(_0x19fb43.indexOf('LZ_TOKEN_VALUE=')>-1)_0x38e162=(_0x19fb43.replace(/ /g,'')+';');
				if(_0x19fb43.indexOf('lz_jdpin_token=')>-1)_0x595762=(''+_0x19fb43.replace(/ /g,'')+';');
			}
		}
	}
	if(_0x1fe24f&&_0x38e162)activityCookie=_0x1fe24f+' '+_0x38e162;
	if(_0x595762)lz_jdpin_token_cookie=_0x595762;
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x4fe919){
	_0x4fe919=_0x4fe919||32;
	let _0x9a8e04='abcdef0123456789',_0x4ce61b=_0x9a8e04.length,_0x2a337e='';
	for(i=0;i<_0x4fe919;i++)_0x2a337e+=_0x9a8e04.charAt(Math.floor(Math.random()*_0x4ce61b));
	return _0x2a337e;
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x3faac5=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x410d23='';
		if($.shopactivityId)_0x410d23=',"activityId":'+$.shopactivityId;
		let _0x4b137f='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x410d23+',"channel":406}';
		let _0x1b20a6='20220412164641157%3B197ee697d50ca316f3582488c7fa9d34%3B169f1%3Btk02wd9451deb18n1P31JunSGTfZhmebuivwsEwYWUQF1ZkpdtuSmKOES5DnIMFdyOvKikdguelIiBUnJbeCgoNlcEvv%3B6e090cbde337590b51a514718fee391d46fece6b953ed1084a052f6d76ffbd92%3B3.0%3B1649753201157';
		const _0x2939b9={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x4b137f+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x1b20a6,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':$.UA}};
		$.get(_0x2939b9,async(_0x38d417,_0x321dc0,_0x212a48)=>{
			try{
				_0x212a48=_0x212a48&&_0x212a48.match(/jsonp_.*?\((.*?)\);/)&&_0x212a48.match(/jsonp_.*?\((.*?)\);/)[1]||_0x212a48;
				let _0x12f6b8=$.toObj(_0x212a48,_0x212a48);
				if(_0x12f6b8&&(typeof _0x12f6b8=='object')){
					if(_0x12f6b8&&(_0x12f6b8.success===true)){
						console.log(_0x12f6b8.message);
						$.errorJoinShop=_0x12f6b8.message;
						if(_0x12f6b8.result&&_0x12f6b8.result.giftInfo){
							for(let _0x2e0c72 of _0x12f6b8.result.giftInfo.giftList){
								console.log('入会获得:'+_0x2e0c72.discountString+_0x2e0c72.prizeName+_0x2e0c72.secondLineDesc);
							}
						}
					}else if(_0x12f6b8&&(typeof _0x12f6b8=='object')&&_0x12f6b8.message){
						$.errorJoinShop=_0x12f6b8.message;
						console.log(''+(_0x12f6b8.message||''));
					}else{
						console.log(_0x212a48);
					}
				}else{
					console.log(_0x212a48);
				}
			}catch(_0x545170){
				$.logErr(_0x545170,_0x321dc0);
			}
			finally{
				_0x3faac5();
			}
		});
	});
}
function getshopactivityId(){
	return new Promise(_0x26622e=>{
		const _0xe9f33f={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22'+$.joinVenderId+'%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888','headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(_0xe9f33f,async(_0x23cd83,_0x38b20d,_0x2d18a7)=>{
			try{
				let _0x408e86=$.toObj(_0x2d18a7,_0x2d18a7);
				if(typeof _0x408e86=='object'){
					if(_0x408e86.success==true){
						console.log('会员卡名称：'+(_0x408e86.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x408e86.result.interestsRuleList&&_0x408e86.result.interestsRuleList[0]&&_0x408e86.result.interestsRuleList[0].interestsInfo&&_0x408e86.result.interestsRuleList[0].interestsInfo.activityId||'';
						$.openCardStatus=_0x408e86.result.userInfo.openCardStatus;
						if(_0x408e86.result.interestsRuleList&&_0x408e86.result.interestsRuleList.length){
							for(let _0xd48860=0;_0xd48860<_0x408e86.result.interestsRuleList.length;_0xd48860++){
								const _0x1922a4=_0x408e86.result.interestsRuleList[_0xd48860];
								if(_0x1922a4.prizeName&&_0x1922a4.prizeName.includes('京豆')){
									$.openCardBean=parseInt(_0x1922a4.discountString);
									break;
								}
							}
						}
					}
				}else{
					console.log(_0x2d18a7);
				}
			}catch(_0x2a19b9){
				$.logErr(_0x2a19b9,_0x38b20d);
			}
			finally{
				_0x26622e();
			}
		});
	});
}
function jsonParse(_0x10c02e){
	if(typeof _0x10c02e=='string'){
		try{
			return JSON.parse(_0x10c02e);
		}catch(_0x47cb08){
			console.log(_0x47cb08);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}