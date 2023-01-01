/*
1.1-1.31 倩碧邀请礼


1.邀请满3人30豆，邀请5人50 共计80
2.开1张卡
3.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 1.1-1.31 倩碧邀请礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#1.1-1.31 倩碧邀请礼
11 11 11 11 * jd_qbyql.js, tag=1.1-1.31 倩碧邀请礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('1.1-1.31 倩碧邀请礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://lzkjdz-isv.isvjd.com';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x1eff2b=>{
		cookiesArr.push(jdCookieNode[_0x1eff2b]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x1aab02=>_0x1aab02.cookie)]['filter'](_0x62f9eb=>!!_0x62f9eb);
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
	$.activityId='2201100037643115';
	authorCodeList=["99ad232944be4a37a529d88fa90ff75d"]//await getAuthorCodeList('http://code.kingran.ga/qbyql.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjd.com/m/1000376431/99/2201100037643115/?helpUuid='+$.shareUuid);
	for(let _0x25fb3c=0;_0x25fb3c<cookiesArr.length;_0x25fb3c++){
		cookie=cookiesArr[_0x25fb3c];
		originCookie=cookiesArr[_0x25fb3c];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x25fb3c+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x25fb3c==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x472067='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x472067);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x472067);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x390d9a=>$.logErr(_0x390d9a))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0xc83971=false;
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
	}catch(_0x265c69){
		console.log(_0x265c69);
	}
}
async function takePostRequest(_0x162851){
	if($.outFlag)return;
	let _0x2bd82e='https://lzkjdz-isv.isvjd.com';
	let _0x3c88a6='';
	let _0x48c815='POST';
	let _0x7a0f8='';
	switch(_0x162851){
		case 'getMyPing':
			url=_0x2bd82e+'/customer/getMyPing';
			_0x3c88a6='token='+$.Token+'&fromType=APP&userId=1000376431&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x2bd82e+'/common/brand/getSimpleActInfoVo';
			_0x3c88a6='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x2bd82e+'/common/accessLogWithAD';
			let _0xb1c1a7='https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x3c88a6='venderId=1000376431&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0xb1c1a7);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x2bd82e+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x3c88a6='venderId=1000376431&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'activityContent':
			url=_0x2bd82e+'/clinique/invite/wx/activityContent';
			_0x3c88a6='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&helpUuid='+$.shareUuid;
			break;
		case 'sendGift':
			url=_0x2bd82e+'/clinique/invite/wx/sendGift';
			_0x3c88a6='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&prizFlag='+$.prizFlag;
			break;
		case 'getInviteSend':
			url=_0x2bd82e+'/clinique/invite/wx/getInviteSend';
			_0x3c88a6='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x162851);
	}
	let _0x57310f=getPostRequest(url,_0x3c88a6,_0x48c815);
	return new Promise(async _0x2cab83=>{
		$.post(_0x57310f,(_0x2e62d6,_0x3f8d3c,_0x320f78)=>{
			try{
				setActivityCookie(_0x3f8d3c);
				if(_0x2e62d6){
					if(_0x3f8d3c&&typeof _0x3f8d3c.statusCode!='undefined'){
						if(_0x3f8d3c.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x2e62d6,_0x2e62d6));
					console.log(_0x162851+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x162851,_0x320f78);
				}
			}catch(_0x4610fa){
				console.log(_0x4610fa,_0x3f8d3c);
			}finally{
				_0x2cab83();
			}
		});
	});
}
async function dealReturn(_0x5a5139,_0x48365c){
	let _0x2cfcf1='';
	try{
		if(_0x5a5139!='accessLogWithAD'||_0x5a5139!='drawContent'){
			if(_0x48365c){
				_0x2cfcf1=JSON.parse(_0x48365c);
			}
		}
	}catch(_0x2a3b15){
		console.log(_0x5a5139+' 执行任务异常');
		console.log(_0x48365c);
		$.runFalag=false;
	}
	try{
		switch(_0x5a5139){
			case 'getMyPing':
				if(typeof _0x2cfcf1=='object'){
					if(_0x2cfcf1.result&&_0x2cfcf1.result===true){
						if(_0x2cfcf1.data&&typeof _0x2cfcf1.data['secretPin']!='undefined')$.Pin=_0x2cfcf1.data['secretPin'];
						if(_0x2cfcf1.data&&typeof _0x2cfcf1.data['nickname']!='undefined')$.nickname=_0x2cfcf1.data['nickname'];
					}else if(_0x2cfcf1.errorMessage){
						console.log(_0x5a5139+' '+(_0x2cfcf1.errorMessage||''));
					}else{
						console.log(_0x5a5139+' '+_0x48365c);
					}
				}else{
					console.log(_0x5a5139+' '+_0x48365c);
				}
				break;
			case 'getInviteSend':
				if(typeof _0x2cfcf1=='object'){
					if(_0x2cfcf1.result&&_0x2cfcf1.result===true){
						$.thirtyBeans=_0x2cfcf1.data['thirtyBeans']||0;
						$.fiftyBeans=_0x2cfcf1.data['fiftyBeans']||0;
						$.fifteen=_0x2cfcf1.data['fifteen']||0;
					}else if(_0x2cfcf1.errorMessage){
						console.log(''+(_0x2cfcf1.errorMessage||''));
					}else{
						console.log(''+_0x48365c);
					}
				}else{
					console.log(''+_0x48365c);
				}
				break;
			case'sendGift':
				if(typeof _0x2cfcf1=='object'){
					if(_0x2cfcf1.result&&_0x2cfcf1.result===true){
						console.log(''+_0x2cfcf1.data);
					}else if(_0x2cfcf1.errorMessage){
						console.log(''+(_0x2cfcf1.errorMessage||''));
					}else{
						console.log(' '+_0x48365c);
					}
				}else{
					console.log(''+_0x48365c);
				}
				break;
			case 'activityContent':
				if(typeof _0x2cfcf1=='object'){
					if(_0x2cfcf1.result&&_0x2cfcf1.result===true){
						$.actorUuid=_0x2cfcf1.data['customerId']||'';
						$.helpStatus=_0x2cfcf1.data['helpStatus']||0;
						$.assistCount=_0x2cfcf1.data['inviteNum']||0;
						if(_0x2cfcf1.data['sendBeanNum']){
							console.log('获得'+_0x2cfcf1.data['sendBeanNum']+'豆');
							allMessage+='【账号'+$.index+'】获得'+_0x2cfcf1.data['sendBeanNum']+'豆\n';
						}
					}else if(_0x2cfcf1.errorMessage){
						if(_0x2cfcf1.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x5a5139+' '+(_0x2cfcf1.errorMessage||''));
					}else{
						console.log(_0x5a5139+' '+_0x48365c);
					}
				}else{
					console.log(_0x5a5139+' '+_0x48365c);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x2cfcf1=='object'){
					if(_0x2cfcf1.isOk){
						$.openStatus=_0x2cfcf1.openCard||false;
					}else if(_0x2cfcf1.errorMessage||_0x2cfcf1.msg){
						console.log(_0x5a5139+' '+(_0x2cfcf1.errorMessage||_0x2cfcf1.msg||''));
					}else{
						console.log(_0x5a5139+' '+_0x48365c);
					}
				}else{
					console.log(_0x5a5139+' '+_0x48365c);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x5a5139+'-> '+_0x48365c);
		}
		if(typeof _0x2cfcf1=='object'){
			if(_0x2cfcf1.errorMessage){
				if(_0x2cfcf1.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x258844){
		console.log(_0x258844);
	}
}
function getPostRequest(_0x22e4d6,_0x284d5f,_0x18bca2='POST'){
	let _0x2fcb0d={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x22e4d6.indexOf('https://lzkjdz-isv.isvjd.com')>-1){
		_0x2fcb0d.Referer='https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
		_0x2fcb0d.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x22e4d6,'method':_0x18bca2,'headers':_0x2fcb0d,'body':_0x284d5f,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x2aa8b3=>{
		let _0x497485={'url':'https://lzkjdz-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=2201100037643115','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x497485,async(_0x334bef,_0x4940e9,_0x4da8fc)=>{
			try{
				if(_0x334bef){
					if(_0x4940e9&&typeof _0x4940e9.statusCode!='undefined'){
						if(_0x4940e9.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x334bef));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x3c611b=$.toObj(_0x4da8fc,_0x4da8fc);
					if(typeof _0x3c611b=='object'){
						if(_0x3c611b.result&&_0x3c611b.result===true){
							$.endTime=_0x3c611b.data['endTime']||0;
							$.startTimes=_0x3c611b.data['startTime']||Date.now();
						}else if(_0x3c611b.errorMessage){
							console.log(''+(_0x3c611b.errorMessage||''));
						}else{
							console.log(''+_0x4da8fc);
						}
					}else{
						console.log(''+_0x4da8fc);
					}
				}
			}catch(_0x207678){
				$.logErr(_0x207678,_0x4940e9);
			}finally{
				_0x2aa8b3();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x33d552=>{
		let _0x4b30b0={'url':'https://lzkjdz-isv.isvjd.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x4b30b0,async(_0x29de53,_0x35da82,_0x42b6c1)=>{
			try{
				if(_0x29de53){
					if(_0x35da82&&typeof _0x35da82.statusCode!='undefined'){
						if(_0x35da82.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x29de53));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x14fd7f=_0x42b6c1.match(/(活动已经结束)/)&&_0x42b6c1.match(/(活动已经结束)/)[1]||'';
					if(_0x14fd7f){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x35da82);
				}
			}catch(_0x494cbf){
				$.logErr(_0x494cbf,_0x35da82);
			}finally{
				_0x33d552();
			}
		});
	});
}
function setActivityCookie(_0x10682f){
	if(_0x10682f){
		if(_0x10682f.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x31bf3e of _0x10682f.headers['set-cookie']){
				lz_cookie[_0x31bf3e.split(';')[0]['substr'](0,_0x31bf3e.split(';')[0]['indexOf']('='))]=_0x31bf3e.split(';')[0]['substr'](_0x31bf3e.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x3f020f of Object.keys(lz_cookie)){
				cookie+=_0x3f020f+'='+lz_cookie[_0x3f020f]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x1a1c8e){
	_0x1a1c8e=_0x1a1c8e||32;
	let _0x1ca759='abcdef0123456789',_0x3e29c2=_0x1ca759.length,_0x173d3c='';
	for(i=0;i<_0x1a1c8e;i++)_0x173d3c+=_0x1ca759.charAt(Math.floor(Math.random()*_0x3e29c2));
	return _0x173d3c;
}
async function joinShop(){
	return new Promise(async _0x70188a=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x4356a3='';
		if($.shopactivityId)_0x4356a3=',"activityId":'+$.shopactivityId;
		const _0x136506='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x4356a3+',"channel":406}';
		const _0x539ccb={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x136506)};
		const _0x585d9e=await getH5st('8adfb',_0x539ccb);
		const _0x480458={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x136506+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x585d9e),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x480458,async(_0x5e4b7e,_0x4d8a0f,_0x3f516d)=>{
			try{
				_0x3f516d=_0x3f516d&&_0x3f516d.match(/jsonp_.*?\((.*?)\);/)&&_0x3f516d.match(/jsonp_.*?\((.*?)\);/)[1]||_0x3f516d;
				let _0x2b5a2a=$.toObj(_0x3f516d,_0x3f516d);
				if(_0x2b5a2a&&typeof _0x2b5a2a=='object'){
					if(_0x2b5a2a&&_0x2b5a2a.success===true){
						console.log(_0x2b5a2a.message);
						$.errorJoinShop=_0x2b5a2a.message;
						if(_0x2b5a2a.result&&_0x2b5a2a.result['giftInfo']){
							for(let _0x50399 of _0x2b5a2a.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x50399.discountString+_0x50399.prizeName+_0x50399.secondLineDesc);
							}
						}
					}else if(_0x2b5a2a&&typeof _0x2b5a2a=='object'&&_0x2b5a2a.message){
						$.errorJoinShop=_0x2b5a2a.message;
						console.log(''+(_0x2b5a2a.message||''));
					}else{
						console.log(_0x3f516d);
					}
				}else{
					console.log(_0x3f516d);
				}
			}catch(_0x27687b){
				$.logErr(_0x27687b,_0x4d8a0f);
			}finally{
				_0x70188a();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x438f81=>{
		let _0x13ed69='{"venderId":"1000002527","channel":406,"payUpShop":true}';
		const _0x52521f={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x13ed69)};
		const _0x5e0a86=await getH5st('ef79a',_0x52521f);
		const _0x208172={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x13ed69+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x5e0a86),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x208172,async(_0x569bc0,_0x1c65c0,_0xf1dca)=>{
			try{
				_0xf1dca=_0xf1dca&&_0xf1dca.match(/jsonp_.*?\((.*?)\);/)&&_0xf1dca.match(/jsonp_.*?\((.*?)\);/)[1]||_0xf1dca;
				let _0x1125e7=$.toObj(_0xf1dca,_0xf1dca);
				if(_0x1125e7&&typeof _0x1125e7=='object'){
					if(_0x1125e7&&_0x1125e7.success==true){
						console.log('入会:'+(_0x1125e7.result['shopMemberCardInfo']['venderCardName']||''));
						$.shopactivityId=_0x1125e7.result['interestsRuleList']&&_0x1125e7.result['interestsRuleList'][0]&&_0x1125e7.result['interestsRuleList'][0]['interestsInfo']&&_0x1125e7.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0xf1dca);
				}
			}catch(_0x4167ed){
				$.logErr(_0x4167ed,_0x1c65c0);
			}finally{
				_0x438f81();
			}
		});
	});
}
function getAuthorCodeList(_0x32e97a){
	return new Promise(_0xb87c86=>{
		const _0x87f15b={'url':_0x32e97a+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x87f15b,async(_0x101f93,_0x3dce79,_0x9e080d)=>{
			try{
				if(_0x101f93){
					$.log(_0x101f93);
				}else{
					if(_0x9e080d)_0x9e080d=JSON.parse(_0x9e080d);
				}
			}catch(_0x47b36c){
				$.logErr(_0x47b36c,_0x3dce79);
				_0x9e080d=null;
			}finally{
				_0xb87c86(_0x9e080d);
			}
		});
	});
}
function jsonParse(_0x4f6bba){
	if(typeof _0x4f6bba=='string'){
		try{
			return JSON.parse(_0x4f6bba);
		}catch(_0x2080b2){
			console.log(_0x2080b2);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};