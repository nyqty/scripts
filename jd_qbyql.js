/*
6.23-7.14 倩碧邀请礼


1.邀请满3人30豆，邀请5人50，邀请15人 有机会获得盲盒
2.开1张卡
3.已开卡的不算有效人数

第三档奖励需手动领取

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 6.23-7.14 倩碧邀请礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:10 0,11 25-30/2,1-14/3 6,7 *
============Quantumultx===============
[task_local]
#6.23-7.14 倩碧邀请礼
10 0,11 25-30/2,1-14/3 6,7 * jd_qbyql.js, tag=6.23-7.14 倩碧邀请礼, enabled=true

*/

const $ = new Env('6.23-7.14 倩碧邀请礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x288db3=>{
		cookiesArr.push(jdCookieNode[_0x288db3]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x4f522e=>_0x4f522e.cookie)].filter(_0x299514=>!!_0x299514);
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
	$.activityId='2201100037643107';
	authorCodeList=await getAuthorCodeList('https://kingran.coding.net/p/yq.json/d/shareCodes/git/raw/master/yq.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid);
	for(let _0x1d50b0=0;_0x1d50b0<cookiesArr.length;_0x1d50b0++){
		cookie=cookiesArr[_0x1d50b0];
		originCookie=cookiesArr[_0x1d50b0];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x1d50b0+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if((_0x1d50b0==0)&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}if($.outFlag){
		let _0x3e7523='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x3e7523);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x3e7523);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0x17b76e=>$.logErr(_0x17b76e)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x6b4006=false;
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
			$.joinVenderId=1000376431;
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
		console.log(($.openStatus===true)?'已开卡':($.openStatus===false)?'未开卡':('未知-'+$.openStatus));
		console.log($.helpStatus===1?'助力成功':$.helpStatus===0?'已助力,或者已开卡无法助力':($.helpStatus===2)?'不能助力自己':'未知-'+$.helpStatus);
		if($.index==1){
			$.helpCount=$.assistCount;
		}else if($.helpStatus==1){
			$.helpCount++;
		}
		console.log('【账号'+$.index+'】助力人数：'+$.assistCount+($.index!=1&&(' 【账号1】助力人数：'+$.helpCount)||''));
		if($.helpCount>=15)$.hasEnd=true;
		console.log($.actorUuid);
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+5000,10));
	}catch(_0x17612a){
		console.log(_0x17612a);
	}
}
async function takePostRequest(_0x37687c){
	if($.outFlag)return;
	let _0x3c834d='https://lzkjdz-isv.isvjcloud.com';
	let _0x468202='';
	let _0x2489f4='POST';
	let _0x1deaa0='';
	switch(_0x37687c){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x468202='body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954';
			break;
		case'getMyPing':
			url=_0x3c834d+'/customer/getMyPing';
			_0x468202='token='+$.Token+'&fromType=APP&userId=1000376431&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x3c834d+'/common/brand/getSimpleActInfoVo';
			_0x468202='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x3c834d+'/common/accessLogWithAD';
			let _0x1ffae5='https://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x468202='venderId=1000376431&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x1ffae5);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x3c834d+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x468202='venderId=1000376431&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x3c834d+'/clinique/invite/wx/activityContent';
			_0x468202='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&helpUuid='+$.shareUuid;
			break;
		case 'sendGift':
			url=_0x3c834d+'/clinique/invite/wx/sendGift';
			_0x468202='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&prizFlag='+$.prizFlag;
			break;
		case 'getInviteSend':
			url=_0x3c834d+'/clinique/invite/wx/getInviteSend';
			_0x468202='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x37687c);
	}
	let _0x94fd92=getPostRequest(url,_0x468202,_0x2489f4);
	return new Promise(async _0xabd090=>{
		$.post(_0x94fd92,(_0x4cd2db,_0x58c3f5,_0xa77e6)=>{
			try{
				setActivityCookie(_0x58c3f5);
				if(_0x4cd2db){
					if(_0x58c3f5&&(typeof _0x58c3f5.statusCode!='undefined')){
						if(_0x58c3f5.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x4cd2db,_0x4cd2db));
					console.log(_0x37687c+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x37687c,_0xa77e6);
				}
			}catch(_0x195811){
				console.log(_0x195811,_0x58c3f5);
			}
			finally{
				_0xabd090();
			}
		});
	});
}
async function dealReturn(_0x480b3f,_0x5198a2){
	let _0x3e12a1='';
	try{
		if((_0x480b3f!='accessLogWithAD')||(_0x480b3f!='drawContent')){
			if(_0x5198a2){
				_0x3e12a1=JSON.parse(_0x5198a2);
			}
		}
	}catch(_0x2b775d){
		console.log(_0x480b3f+' 执行任务异常');
		console.log(_0x5198a2);
		$.runFalag=false;
	}try{
		switch(_0x480b3f){
			case 'isvObfuscator':
				if(typeof _0x3e12a1=='object'){
					if(_0x3e12a1.errcode==0){
					if(typeof _0x3e12a1.token!='undefined')$.Token=_0x3e12a1.token;
				}else if(_0x3e12a1.message){
					console.log('isvObfuscator '+(_0x3e12a1.message||''));
				}else{
					console.log(_0x5198a2);
				}
				}else{
					console.log(_0x5198a2);
				}
				break;
			case 'getMyPing':
				if(typeof _0x3e12a1=='object'){
					if(_0x3e12a1.result&&(_0x3e12a1.result===true)){
					if(_0x3e12a1.data&&typeof _0x3e12a1.data.secretPin!='undefined')$.Pin=_0x3e12a1.data.secretPin;
					if(_0x3e12a1.data&&(typeof _0x3e12a1.data.nickname!='undefined'))$.nickname=_0x3e12a1.data.nickname;
				}else if(_0x3e12a1.errorMessage){
					console.log(_0x480b3f+' '+(_0x3e12a1.errorMessage||''));
				}else{
					console.log(_0x480b3f+' '+_0x5198a2);
				}
				}else{
					console.log(_0x480b3f+' '+_0x5198a2);
				}
				break;
			case 'getInviteSend':
				if(typeof _0x3e12a1=='object'){
					if(_0x3e12a1.result&&(_0x3e12a1.result===true)){
					$.thirtyBeans=_0x3e12a1.data.thirtyBeans||0;
					$.fiftyBeans=_0x3e12a1.data.fiftyBeans||0;
					$.fifteen=_0x3e12a1.data.fifteen||0;
				}else if(_0x3e12a1.errorMessage){
					console.log(''+(_0x3e12a1.errorMessage||''));
				}else{
					console.log(''+_0x5198a2);
				}
				}else{
					console.log(''+_0x5198a2);
				}
				break;
			case 'sendGift':
				if(typeof _0x3e12a1=='object'){
					if(_0x3e12a1.result&&(_0x3e12a1.result===true)){
					console.log(''+_0x3e12a1.data);
				}else if(_0x3e12a1.errorMessage){
					console.log(''+(_0x3e12a1.errorMessage||''));
				}else{
					console.log(' '+_0x5198a2);
				}
				}else{
					console.log(''+_0x5198a2);
				}
				break;
			case 'activityContent':
				if(typeof _0x3e12a1=='object'){
					if(_0x3e12a1.result&&_0x3e12a1.result===true){
					$.actorUuid=_0x3e12a1.data.customerId||'';
					$.helpStatus=_0x3e12a1.data.helpStatus||0;
					$.assistCount=_0x3e12a1.data.inviteNum||0;
					if(_0x3e12a1.data.sendBeanNum){
						console.log('获得'+_0x3e12a1.data.sendBeanNum+'豆');
						allMessage+='【账号'+$.index+'】获得'+_0x3e12a1.data.sendBeanNum+'豆\n';
					}
				}else if(_0x3e12a1.errorMessage){
					if(_0x3e12a1.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
					console.log(_0x480b3f+' '+(_0x3e12a1.errorMessage||''));
				}else{
					console.log(_0x480b3f+' '+_0x5198a2);
				}
				}else{
					console.log(_0x480b3f+' '+_0x5198a2);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x3e12a1=='object'){
					if(_0x3e12a1.isOk){
					$.openStatus=_0x3e12a1.openCard||false;
				}else if(_0x3e12a1.errorMessage||_0x3e12a1.msg){
					console.log(_0x480b3f+' '+(_0x3e12a1.errorMessage||_0x3e12a1.msg||''));
				}else{
					console.log(_0x480b3f+' '+_0x5198a2);
				}
				}else{
					console.log(_0x480b3f+' '+_0x5198a2);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x480b3f+'-> '+_0x5198a2);
		}
		if(typeof _0x3e12a1=='object'){
			if(_0x3e12a1.errorMessage){
				if(_0x3e12a1.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x5d3eed){
		console.log(_0x5d3eed);
	}
}
function getPostRequest(_0x148de7,_0x175f9e,_0x393dd6='POST'){
	let _0x57557b={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x148de7.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x57557b.Referer='https://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
		_0x57557b.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':_0x148de7,'method':_0x393dd6,'headers':_0x57557b,'body':_0x175f9e,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x19b732=>{
		let _0x44b3d4={'url':'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2201100037643107','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x44b3d4,async(_0x511fcc,_0x5eadfe,_0x1723b0)=>{
			try{
				if(_0x511fcc){
					if(_0x5eadfe&&(typeof _0x5eadfe.statusCode!='undefined')){
						if(_0x5eadfe.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x511fcc));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x4dad18=$.toObj(_0x1723b0,_0x1723b0);
					if(typeof _0x4dad18=='object'){
						if(_0x4dad18.result&&(_0x4dad18.result===true)){
							$.endTime=_0x4dad18.data.endTime||0;
							$.startTimes=_0x4dad18.data.startTime||Date.now();
						}else if(_0x4dad18.errorMessage){
							console.log(''+(_0x4dad18.errorMessage||''));
						}else{
							console.log(''+_0x1723b0);
						}
					}else{
						console.log(''+_0x1723b0);
					}
				}
			}catch(_0x5518b8){
				$.logErr(_0x5518b8,_0x5eadfe);
			}
			finally{
				_0x19b732();
			}
		});
	});
}
function getCk(){
	return new Promise(_0xc6f100=>{
		let _0x2f2afc={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x2f2afc,async(_0x24479e,_0x5240fc,_0x15dd93)=>{
			try{
				if(_0x24479e){
					if(_0x5240fc&&(typeof _0x5240fc.statusCode!='undefined')){
						if(_0x5240fc.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x24479e));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x35fd71=_0x15dd93.match(/(活动已经结束)/)&&_0x15dd93.match(/(活动已经结束)/)[1]||'';
					if(_0x35fd71){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x5240fc);
				}
			}catch(_0x24bf00){
				$.logErr(_0x24bf00,_0x5240fc);
			}
			finally{
				_0xc6f100();
			}
		});
	});
}
function setActivityCookie(_0x180b53){
	if(_0x180b53.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0x2663b7 of _0x180b53.headers['set-cookie']){
			lz_cookie[_0x2663b7.split(';')[0].substr(0,_0x2663b7.split(';')[0].indexOf('='))]=_0x2663b7.split(';')[0].substr(_0x2663b7.split(';')[0].indexOf('=')+1);
		}
		for(const _0x3ff185 of Object.keys(lz_cookie)){
			cookie+=(_0x3ff185+'='+lz_cookie[_0x3ff185]+';');
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x2c9650){
	_0x2c9650=(_0x2c9650||32);
	let _0x57851c='abcdef0123456789',_0x23c1fd=_0x57851c.length,_0x373cc5='';
	for(i=0;i<_0x2c9650;i++)_0x373cc5+=_0x57851c.charAt(Math.floor(Math.random()*_0x23c1fd));
	return _0x373cc5;
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x521caa=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x921fd3='';
		if($.shopactivityId)_0x921fd3=',"activityId":'+$.shopactivityId;
		let _0x2d0d77='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x921fd3+',"channel":406}';
		let _0x2f4fbb=await geth5st();
		const _0x44ed88={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x2d0d77+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x2f4fbb,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x44ed88,async(_0xf37fca,_0x3603a0,_0x261e68)=>{
			try{
				_0x261e68=_0x261e68&&_0x261e68.match(/jsonp_.*?\((.*?)\);/)&&_0x261e68.match(/jsonp_.*?\((.*?)\);/)[1]||_0x261e68;
				let _0x4b8ac2=$.toObj(_0x261e68,_0x261e68);
				if(_0x4b8ac2&&(typeof _0x4b8ac2=='object')){
					if(_0x4b8ac2&&(_0x4b8ac2.success===true)){
						console.log(_0x4b8ac2.message);
						$.errorJoinShop=_0x4b8ac2.message;
						if(_0x4b8ac2.result&&_0x4b8ac2.result.giftInfo){
							for(let _0x19f200 of _0x4b8ac2.result.giftInfo.giftList){
								console.log('入会获得:'+_0x19f200.discountString+_0x19f200.prizeName+_0x19f200.secondLineDesc);
							}
						}
					}else if(_0x4b8ac2&&(typeof _0x4b8ac2=='object')&&_0x4b8ac2.message){
						$.errorJoinShop=_0x4b8ac2.message;
						console.log(''+(_0x4b8ac2.message||''));
					}else{
						console.log(_0x261e68);
					}
				}else{
					console.log(_0x261e68);
				}
			}catch(_0x5c8458){
				$.logErr(_0x5c8458,_0x3603a0);
			}
			finally{
				_0x521caa();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x1ed741=>{
		let _0x26007b='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let _0x53170c=await geth5st();
		const _0x16b5a1={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x26007b+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x53170c,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x16b5a1,async(_0x4d86ec,_0x32ad9b,_0x424986)=>{
			try{
				_0x424986=_0x424986&&_0x424986.match(/jsonp_.*?\((.*?)\);/)&&_0x424986.match(/jsonp_.*?\((.*?)\);/)[1]||_0x424986;
				let _0x55d311=$.toObj(_0x424986,_0x424986);
				if(_0x55d311&&typeof _0x55d311=='object'){
					if(_0x55d311&&(_0x55d311.success==true)){
						console.log('入会:'+(_0x55d311.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x55d311.result.interestsRuleList&&_0x55d311.result.interestsRuleList[0]&&_0x55d311.result.interestsRuleList[0].interestsInfo&&_0x55d311.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x424986);
				}
			}catch(_0x4e3098){
				$.logErr(_0x4e3098,_0x32ad9b);
			}
			finally{
				_0x1ed741();
			}
		});
	});
}
function getAuthorCodeList(_0x4318cc){
	return new Promise(_0x3f3e20=>{
		const _0x2f1c09={'url':_0x4318cc+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x2f1c09,async(_0x5d6a4a,_0xa925d6,_0x5bacc8)=>{
			try{
				if(_0x5d6a4a){
					$.log(_0x5d6a4a);
				}else{
					if(_0x5bacc8)_0x5bacc8=JSON.parse(_0x5bacc8);
				}
			}catch(_0xc6929e){
				$.logErr(_0xc6929e,_0xa925d6);
				_0x5bacc8=null;
			}
			finally{
				_0x3f3e20(_0x5bacc8);
			}
		});
	});
}
function jsonParse(_0x35ea42){
	if(typeof _0x35ea42=='string'){
		try{
			return JSON.parse(_0x35ea42);
		}catch(_0x2070a1){
			console.log(_0x2070a1);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
var _0xodb='jsjiami.com.v6',_0xodb_=['‮_0xodb'],_0x3c1b=[_0xodb,'wqkgAcKeOQ==','NBDCnDEf','wqhhw7HDi8Ka','wrzCuHM/w6Qj','wpJyw7PDuMKE','E0bCnA==','BxbCg8KoSA==','QnjDk0Ycw6d1ZsK8w6RawpTDhMK2DMOyZcKvBTpYw4pvP8OyNFnCssO/w5DDjVvDhH3DocKWwpMGUMKVVsK/JDXCvcK9QMOIwqHDpMOXGk/DlAnDkxrDnMO/w5vDn2zCq8O9UsKBw7h3H1JFwp7CgzTCo8KTacOab2DCqcOSw7UZBVLCgWPDo8KoJGbDsMKDBA/Cl8KTwoBsF8OYPcOVwpUSWcOaaGlkwq0AF2tnPcK6w4tme8OcTMKZwrwND8OMLDNCw5TCq8OHw4BZJkzDlBoOwoHCi8KswofCu8KeX8OEwq7DrHsYw7bDn8KnGCECakwjKiTCr8ODRh/CgQ==','N8KtRw==','LDbCrMKSfQ==','w6LDpG1qNA==','wpEXUcOjCA==','FV7Ch8KGZQ==','CWPCmXPCnA==','wrg0w4g=','YsOYw4oQw7oKAMOowok=','AAbCgQwHw6g=','w5bDjClaCcO8YcK7','JMKpOsO2ayRI','WsO5CMKfwq7DnMOJwqE=','w40KQnnCnMOYf8OJw4Na','PsKnRGvCtjUTZEhE','w7QjwrVeScOw','JcKgIcOdeA==','OMKgX0rCkA==','VHjClMOCw4Q1wr7CjQjChHfDrMOKwozDsA==','w5bCmMOtwrAXw4Je','UHLCjsOsw4wt','F8O3VsOmKXXDjDsLJCQ=','wqojL8K/L8Ke','PlfDgMKmScOr','wqZow6nDn8Kwwog=','CUzCmH4=','wrHDkTw=','TMONdMOcwq0=','KgzCnQYSw7Q=','OcK7N8K8w7w=','wro5I8KvOsKY','wro+w5FlHFg=','c8OmMcKhwoM=','WQQTw6Fo','xjsjiaNUmi.xucoLOwqm.vBle6VKE=='];
if(function(_0xc3aaa3,_0x432b12,_0x1ade70){
	function _0x47cf89(_0x4bab4f,_0x5556dc,_0x5b17e5,_0x2c5494,_0x405c49,_0x1036ce){
		_0x5556dc=(_0x5556dc>>0x8),_0x405c49='po';
		var _0x2ad8a1='shift',_0x4d2ad6='push',_0x1036ce='‮';
		if(_0x5556dc<_0x4bab4f){
			while(--_0x4bab4f){
				_0x2c5494=_0xc3aaa3[_0x2ad8a1]();
				if((_0x5556dc===_0x4bab4f)&&_0x1036ce==='‮'&&_0x1036ce.length===1){
					_0x5556dc=_0x2c5494,_0x5b17e5=_0xc3aaa3[_0x405c49+'p']();
				}else if(_0x5556dc&&(_0x5b17e5.replace(/[xNUxuLOwqBleVKE=]/g,'')===_0x5556dc)){
					_0xc3aaa3[_0x4d2ad6](_0x2c5494);
				}
			}
			_0xc3aaa3[_0x4d2ad6](_0xc3aaa3[_0x2ad8a1]());
		}
		return 968710;
	};
	return (_0x47cf89(++_0x432b12,_0x1ade70)>>_0x432b12)^_0x1ade70;
}(_0x3c1b,411,105216),_0x3c1b){
	_0xodb_=_0x3c1b.length^0x19b;
};
function _0x80d0(_0x5402f6,_0x37c98b){
	_0x5402f6=~~'0x'.concat(_0x5402f6.slice(1));
	var _0x4091f0=_0x3c1b[_0x5402f6];
	if(_0x80d0.ZHvfIH===undefined){
		(function(){
			var _0x22ad86=(typeof window!=='undefined')?window:typeof process==='object'&&(typeof require==='function')&&typeof global==='object'?global:this;
			var _0x5e9e46='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			_0x22ad86.atob||(_0x22ad86.atob=function(_0x1a499c){
				var _0x2608c1=String(_0x1a499c).replace(/=+$/,'');
				for(var _0x5197af=0,_0x419e45,_0x27d27d,_0xda185b=0,_0x5a2829='';_0x27d27d=_0x2608c1.charAt(_0xda185b++);~_0x27d27d&&(_0x419e45=(_0x5197af%4)?(_0x419e45*64+_0x27d27d):_0x27d27d,_0x5197af++%4)?_0x5a2829+=String.fromCharCode(0xff&_0x419e45>>(-2*_0x5197af&0x6)):0){
					_0x27d27d=_0x5e9e46.indexOf(_0x27d27d);
				}
				return _0x5a2829;
			});
		}());
		function _0x2f628(_0x3df772,_0x37c98b){
			var _0xcdea18=[],_0x389f94=0,_0x181da0,_0x4d030c='',_0x599cb5='';
			_0x3df772=atob(_0x3df772);
			for(var _0x370fc3=0,_0x2bac8b=_0x3df772.length;_0x370fc3<_0x2bac8b;_0x370fc3++){
				_0x599cb5+=('%'+('00'+_0x3df772.charCodeAt(_0x370fc3).toString(16)).slice(-2));
			}
			_0x3df772=decodeURIComponent(_0x599cb5);
			for(var _0x12ca9e=0;_0x12ca9e<256;_0x12ca9e++){
				_0xcdea18[_0x12ca9e]=_0x12ca9e;
			}
			for(_0x12ca9e=0;_0x12ca9e<256;_0x12ca9e++){
				_0x389f94=(_0x389f94+_0xcdea18[_0x12ca9e]+_0x37c98b.charCodeAt(_0x12ca9e%_0x37c98b.length))%256;
				_0x181da0=_0xcdea18[_0x12ca9e];
				_0xcdea18[_0x12ca9e]=_0xcdea18[_0x389f94];
				_0xcdea18[_0x389f94]=_0x181da0;
			}
			_0x12ca9e=0;
			_0x389f94=0;
			for(var _0x30e183=0;_0x30e183<_0x3df772.length;_0x30e183++){
				_0x12ca9e=(_0x12ca9e+1%256);
				_0x389f94=(_0x389f94+_0xcdea18[_0x12ca9e]%256);
				_0x181da0=_0xcdea18[_0x12ca9e];
				_0xcdea18[_0x12ca9e]=_0xcdea18[_0x389f94];
				_0xcdea18[_0x389f94]=_0x181da0;
				_0x4d030c+=String.fromCharCode(_0x3df772.charCodeAt(_0x30e183)^_0xcdea18[(_0xcdea18[_0x12ca9e]+_0xcdea18[_0x389f94])%256]);
			}
			return _0x4d030c;
		}
		_0x80d0.uZkhLK=_0x2f628;
		_0x80d0.PgBxtv={};
		_0x80d0.ZHvfIH=true;
	}
	var _0x3abad5=_0x80d0.PgBxtv[_0x5402f6];
	if(_0x3abad5===undefined){
		if(_0x80d0.mzwOwg===undefined){
			_0x80d0.mzwOwg=true;
		}
		_0x4091f0=_0x80d0.uZkhLK(_0x4091f0,_0x37c98b);
		_0x80d0.PgBxtv[_0x5402f6]=_0x4091f0;
	}else{
		_0x4091f0=_0x3abad5;
	}
	return _0x4091f0;
};
function generateFp(){
	var _0x5af844={'ryoPy':'0123456789','mfvwK':function(_0x2f9d7f,_0x46b453){
			return _0x2f9d7f|_0x46b453;
		},'WutDU':function(_0x4c7e23,_0x5cd795){
			return _0x4c7e23+_0x5cd795;
		}};
	let _0x123052=_0x5af844[_0x80d0('‮0','wj)i')];
	let _0x53990b=13;
	let _0x16a7ba='';
	for(;_0x53990b--;)_0x16a7ba+=_0x123052[_0x5af844[_0x80d0('‮1','Z*hR')](Math.random()*_0x123052[_0x80d0('‮2','3@Q*')],0)];
	return _0x5af844[_0x80d0('‮3','Z*hR')](_0x16a7ba,Date[_0x80d0('‮4','Da%Y')]())[_0x80d0('‮5','LwWi')](0,16);
}
function geth5st(){
	var _0x55bf3b={'XLFYP':'yyyyMMddhhmmssSSS','ERdzy':';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;','eaFvs':_0x80d0('‮6','@hXf'),'NqklQ':function(_0x177c90,_0x501d58){
			return _0x177c90(_0x501d58);
		},'DqrqH':function(_0x245eda,_0x2990bd){
			return _0x245eda+_0x2990bd;
		},'GEDpa':function(_0x2d93fb,_0x1b738b){
			return _0x2d93fb+_0x1b738b;
		},'tJryJ':function(_0x429329,_0x526a44){
			return _0x429329+_0x526a44;
		}};
	let _0x3bbe29=Date[_0x80d0('‮7','3B2S')]();
	let _0x26109a=generateFp();
	let _0x5b3780=new Date(_0x3bbe29).Format(_0x55bf3b[_0x80d0('‫8','LwWi')]);
	let _0x2b5e9c=[_0x55bf3b.ERdzy,_0x55bf3b[_0x80d0('‮9','SCQF')]];
	let _0x1484b7=_0x2b5e9c[random(0,_0x2b5e9c.length)];
	return _0x55bf3b[_0x80d0('‫a','%HoM')](encodeURIComponent,_0x55bf3b.DqrqH(_0x55bf3b[_0x80d0('‫b','vWDW')](_0x55bf3b[_0x80d0('‮c','Da%Y')](_0x5b3780,';')+_0x26109a,_0x1484b7),Date[_0x80d0('‮d','7]Bn')]()));
}
Date[_0x80d0('‫e','gM9$')][_0x80d0('‫f','wj)i')]=function(_0x38a8fe){
	var _0xcf7f17={'wGAVl':function(_0x289a62,_0x155bab){
			return _0x289a62/_0x155bab;
		},'aborC':function(_0x155c01,_0x310c40){
			return _0x155c01+_0x310c40;
		},'khvyA':function(_0x5032a5,_0x1ddb6c){
			return _0x5032a5===_0x1ddb6c;
		},'RkhHN':function(_0x1b7dd7,_0x3540ea){
			return _0x1b7dd7==_0x3540ea;
		}};
	var _0x1389f2,_0x1066ca=this,_0x180d2e=_0x38a8fe,_0x2f1ab5={'M+':(_0x1066ca[_0x80d0('‮10','lEbY')]()+1),'d+':_0x1066ca.getDate(),'D+':_0x1066ca[_0x80d0('‮11','m]Ir')](),'h+':_0x1066ca.getHours(),'H+':_0x1066ca[_0x80d0('‫12','hLmb')](),'m+':_0x1066ca[_0x80d0('‫13','y[mS')](),'s+':_0x1066ca[_0x80d0('‮14','3B2S')](),'w+':_0x1066ca[_0x80d0('‫15','$n0%')](),'q+':Math[_0x80d0('‮16','m]Ir')](_0xcf7f17.wGAVl(_0xcf7f17[_0x80d0('‮17','3B2S')](_0x1066ca.getMonth(),3),3)),'S+':_0x1066ca[_0x80d0('‫18','3aAN')]()};
	/(y+)/i.test(_0x180d2e)&&(_0x180d2e=_0x180d2e[_0x80d0('‫19','bosv')](RegExp.$1,''[_0x80d0('‮1a','3aAN')](_0x1066ca[_0x80d0('‫1b','n1@B')]())[_0x80d0('‮1c','ctu&')](4-RegExp.$1[_0x80d0('‫1d','T8*w')])));
	for(var _0x2edec9 in _0x2f1ab5){
		if(new RegExp('('[_0x80d0('‮1e','Z*hR')](_0x2edec9,')'))[_0x80d0('‮1f','Da%Y')](_0x180d2e)){
			var _0xa10407,_0x1dd383=_0xcf7f17.khvyA('S+',_0x2edec9)?_0x80d0('‫20','dvcH'):'00';
			_0x180d2e=_0x180d2e.replace(RegExp.$1,_0xcf7f17[_0x80d0('‫21','Jp@*')](1,RegExp.$1[_0x80d0('‫22','wj)i')])?_0x2f1ab5[_0x2edec9]:_0xcf7f17[_0x80d0('‫23','JH9X')](''.concat(_0x1dd383),_0x2f1ab5[_0x2edec9]).substr(''[_0x80d0('‮24','ctu&')](_0x2f1ab5[_0x2edec9])[_0x80d0('‫25','7]Bn')]));
		}
	}
	return _0x180d2e;
};
function random(_0x3aa1f6,_0x5a42a2){
	var _0x58c3c1={'NzMvB':function(_0x13da19,_0x3964bf){
			return _0x13da19+_0x3964bf;
		},'pvLRb':function(_0x396795,_0x183a82){
			return _0x396795*_0x183a82;
		},'KNgAC':function(_0x300d40,_0x4d93c7){
			return _0x300d40-_0x4d93c7;
		}};
	return _0x58c3c1[_0x80d0('‫26','hLmb')](Math[_0x80d0('‫27','eShm')](_0x58c3c1[_0x80d0('‮28','ctu&')](Math.random(),_0x58c3c1.KNgAC(_0x5a42a2,_0x3aa1f6))),_0x3aa1f6);
};
_0xodb='jsjiami.com.v6';

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

