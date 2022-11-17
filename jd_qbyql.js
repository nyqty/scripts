/*
11.1-11.31 倩碧邀请礼


1.邀请满3人30豆，邀请5人50，邀请15人 有机会获得盲盒
2.开1张卡
3.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 11.1-11.31 倩碧邀请礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:0 18 * * *
============Quantumultx===============
[task_local]
#11.1-11.31 倩碧邀请礼
0 18 * * * jd_qbyql.js, tag=11.1-11.31 倩碧邀请礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('11.1-11.31 倩碧邀请礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjd.com';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x1b6f18=>{
		cookiesArr.push(jdCookieNode[_0x1b6f18]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x420b92=>_0x420b92.cookie)].filter(_0x3cad9b=>!!_0x3cad9b);
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
	$.activityId='2201100037643113';
	authorCodeList=["e6e9ced5fd784e598fabe10381a6991b"];//await getAuthorCodeList('http://code.kingran.ga/qbyql.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjd.com/m/1000376431/99/2201100037643113/?helpUuid='+$.shareUuid);
	for(let _0x21c562=0;_0x21c562<cookiesArr.length;_0x21c562++){
		cookie=cookiesArr[_0x21c562];
		originCookie=cookiesArr[_0x21c562];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x21c562+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x21c562==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x361166='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x361166);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x361166);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0x10de34=>$.logErr(_0x10de34)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x34be4c=false;
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
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
				console.log('第1次 重新开卡');
				await $.wait(parseInt(Math.random()*2000+3000,10));
				await joinShop();
			}
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
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
	}catch(_0x43152b){
		console.log(_0x43152b);
	}
}
async function takePostRequest(_0x1e7205){
	if($.outFlag)return;
	let _0x5ceee1='https://lzkjdz-isv.isvjd.com';
	let _0xa4659e='';
	let _0x1fb610='POST';
	let _0x10e5a8='';
	switch(_0x1e7205){
		case 'getMyPing':
			url=_0x5ceee1+'/customer/getMyPing';
			_0xa4659e='token='+$.Token+'&fromType=APP&userId=1000376431&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x5ceee1+'/common/brand/getSimpleActInfoVo';
			_0xa4659e='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x5ceee1+'/common/accessLogWithAD';
			let _0x44e334='https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0xa4659e='venderId=1000376431&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x44e334);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x5ceee1+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0xa4659e='venderId=1000376431&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x5ceee1+'/clinique/invite/wx/activityContent';
			_0xa4659e='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&helpUuid='+$.shareUuid;
			break;
		case 'sendGift':
			url=_0x5ceee1+'/clinique/invite/wx/sendGift';
			_0xa4659e='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&prizFlag='+$.prizFlag;
			break;
		case 'getInviteSend':
			url=_0x5ceee1+'/clinique/invite/wx/getInviteSend';
			_0xa4659e='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x1e7205);
	}
	let _0x43a0f0=getPostRequest(url,_0xa4659e,_0x1fb610);
	return new Promise(async _0x51f2ee=>{
		$.post(_0x43a0f0,(_0x354aac,_0x2f3956,_0x27a268)=>{
			try{
				setActivityCookie(_0x2f3956);
				if(_0x354aac){
					if(_0x2f3956&&typeof _0x2f3956.statusCode!='undefined'){
						if(_0x2f3956.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x354aac,_0x354aac));
					console.log(_0x1e7205+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x1e7205,_0x27a268);
				}
			}catch(_0x2a990a){
				console.log(_0x2a990a,_0x2f3956);
			}finally{
				_0x51f2ee();
			}
		});
	});
}
async function dealReturn(_0x8f637b,_0x255c83){
	let _0x2fa5ef='';
	try{
		if(_0x8f637b!='accessLogWithAD'||_0x8f637b!='drawContent'){
			if(_0x255c83){
				_0x2fa5ef=JSON.parse(_0x255c83);
			}
		}
	}catch(_0x284b46){
		console.log(_0x8f637b+' 执行任务异常');
		console.log(_0x255c83);
		$.runFalag=false;
	}
	try{
		switch(_0x8f637b){
			case 'getMyPing':
				if(typeof _0x2fa5ef=='object'){
					if(_0x2fa5ef.result&&_0x2fa5ef.result===true){
						if(_0x2fa5ef.data&&typeof _0x2fa5ef.data.secretPin!='undefined')$.Pin=_0x2fa5ef.data.secretPin;
						if(_0x2fa5ef.data&&typeof _0x2fa5ef.data.nickname!='undefined')$.nickname=_0x2fa5ef.data.nickname;
					}else if(_0x2fa5ef.errorMessage){
						console.log(_0x8f637b+' '+(_0x2fa5ef.errorMessage||''));
					}else{
						console.log(_0x8f637b+' '+_0x255c83);
					}
				}else{
					console.log(_0x8f637b+' '+_0x255c83);
				}
				break;
			case 'getInviteSend':
				if(typeof _0x2fa5ef=='object'){
					if(_0x2fa5ef.result&&_0x2fa5ef.result===true){
						$.thirtyBeans=_0x2fa5ef.data.thirtyBeans||0;
						$.fiftyBeans=_0x2fa5ef.data.fiftyBeans||0;
						$.fifteen=_0x2fa5ef.data.fifteen||0;
					}else if(_0x2fa5ef.errorMessage){
						console.log(''+(_0x2fa5ef.errorMessage||''));
					}else{
						console.log(''+_0x255c83);
					}
				}else{
					console.log(''+_0x255c83);
				}
				break;
			case 'sendGift':
				if(typeof _0x2fa5ef=='object'){
					if(_0x2fa5ef.result&&_0x2fa5ef.result===true){
						console.log(''+_0x2fa5ef.data);
					}else if(_0x2fa5ef.errorMessage){
						console.log(''+(_0x2fa5ef.errorMessage||''));
					}else{
						console.log(' '+_0x255c83);
					}
				}else{
					console.log(''+_0x255c83);
				}
				break;
			case 'activityContent':
				if(typeof _0x2fa5ef=='object'){
					if(_0x2fa5ef.result&&_0x2fa5ef.result===true){
						$.actorUuid=_0x2fa5ef.data.customerId||'';
						$.helpStatus=_0x2fa5ef.data.helpStatus||0;
						$.assistCount=_0x2fa5ef.data.inviteNum||0;
						if(_0x2fa5ef.data.sendBeanNum){
							console.log('获得'+_0x2fa5ef.data.sendBeanNum+'豆');
							allMessage+='【账号'+$.index+'】获得'+_0x2fa5ef.data.sendBeanNum+'豆\n';
						}
					}else if(_0x2fa5ef.errorMessage){
						if(_0x2fa5ef.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
						console.log(_0x8f637b+' '+(_0x2fa5ef.errorMessage||''));
					}else{
						console.log(_0x8f637b+' '+_0x255c83);
					}
				}else{
					console.log(_0x8f637b+' '+_0x255c83);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x2fa5ef=='object'){
					if(_0x2fa5ef.isOk){
						$.openStatus=_0x2fa5ef.openCard||false;
					}else if(_0x2fa5ef.errorMessage||_0x2fa5ef.msg){
						console.log(_0x8f637b+' '+(_0x2fa5ef.errorMessage||_0x2fa5ef.msg||''));
					}else{
						console.log(_0x8f637b+' '+_0x255c83);
					}
				}else{
					console.log(_0x8f637b+' '+_0x255c83);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x8f637b+'-> '+_0x255c83);
		}
		if(typeof _0x2fa5ef=='object'){
			if(_0x2fa5ef.errorMessage){
				if(_0x2fa5ef.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x43e64a){
		console.log(_0x43e64a);
	}
}
function getPostRequest(_0x545575,_0x3204d3,_0x16118c='POST'){
	let _0x3dbd31={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x545575.indexOf('https://lzkjdz-isv.isvjd.com')>-1){
		_0x3dbd31.Referer='https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
		_0x3dbd31.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x545575,'method':_0x16118c,'headers':_0x3dbd31,'body':_0x3204d3,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x5d7d57=>{
		let _0x1878b2={'url':'https://lzkjdz-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=2201100037643113','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x1878b2,async(_0xe34b0d,_0x8bc867,_0x3603f9)=>{
			try{
				if(_0xe34b0d){
					if(_0x8bc867&&typeof _0x8bc867.statusCode!='undefined'){
						if(_0x8bc867.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xe34b0d));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x3a4179=$.toObj(_0x3603f9,_0x3603f9);
					if(typeof _0x3a4179=='object'){
						if(_0x3a4179.result&&_0x3a4179.result===true){
							$.endTime=_0x3a4179.data.endTime||0;
							$.startTimes=_0x3a4179.data.startTime||Date.now();
						}else if(_0x3a4179.errorMessage){
							console.log(''+(_0x3a4179.errorMessage||''));
						}else{
							console.log(''+_0x3603f9);
						}
					}else{
						console.log(''+_0x3603f9);
					}
				}
			}catch(_0x5ce7c2){
				$.logErr(_0x5ce7c2,_0x8bc867);
			}finally{
				_0x5d7d57();
			}
		});
	});
}
function getCk(){
	return new Promise(_0xc39ec8=>{
		let _0x56c043={'url':'https://lzkjdz-isv.isvjd.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/m/1000376431/99/'+$.activityId+'/?helpUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x56c043,async(_0x49ca73,_0x49bf8f,_0x221a40)=>{
			try{
				if(_0x49ca73){
					if(_0x49bf8f&&typeof _0x49bf8f.statusCode!='undefined'){
						if(_0x49bf8f.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x49ca73));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x372d7c=_0x221a40.match(/(活动已经结束)/)&&_0x221a40.match(/(活动已经结束)/)[1]||'';
					if(_0x372d7c){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x49bf8f);
				}
			}catch(_0x2758f9){
				$.logErr(_0x2758f9,_0x49bf8f);
			}finally{
				_0xc39ec8();
			}
		});
	});
}
function setActivityCookie(_0xac9b53){
	if(_0xac9b53){
		if(_0xac9b53.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x5e8f3d of _0xac9b53.headers['set-cookie']){
				lz_cookie[_0x5e8f3d.split(';')[0].substr(0,_0x5e8f3d.split(';')[0].indexOf('='))]=_0x5e8f3d.split(';')[0].substr(_0x5e8f3d.split(';')[0].indexOf('=')+1);
			}
			for(const _0x3289aa of Object.keys(lz_cookie)){
				cookie+=_0x3289aa+'='+lz_cookie[_0x3289aa]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x5e5f81){
	_0x5e5f81=_0x5e5f81||32;
	let _0x297456='abcdef0123456789',_0x733fdc=_0x297456.length,_0xbe12ac='';
	for(i=0;i<_0x5e5f81;i++)_0xbe12ac+=_0x297456.charAt(Math.floor(Math.random()*_0x733fdc));
	return _0xbe12ac;
}
async function joinShop(){
	return new Promise(async _0x5e58ed=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x46429e='';
		if($.shopactivityId)_0x46429e=',"activityId":'+$.shopactivityId;
		const _0x35b7dd='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x46429e+',"channel":406}';
		const _0x3b7db3={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x35b7dd)};
		const _0x1e0c0a=await getH5st('8adfb',_0x3b7db3);
		const _0x2d6bac={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x35b7dd+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1e0c0a),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x2d6bac,async(_0x1c4448,_0x4d5c14,_0x516bb3)=>{
			try{
				_0x516bb3=_0x516bb3&&_0x516bb3.match(/jsonp_.*?\((.*?)\);/)&&_0x516bb3.match(/jsonp_.*?\((.*?)\);/)[1]||_0x516bb3;
				let _0x4acb3d=$.toObj(_0x516bb3,_0x516bb3);
				if(_0x4acb3d&&typeof _0x4acb3d=='object'){
					if(_0x4acb3d&&_0x4acb3d.success===true){
						console.log(_0x4acb3d.message);
						$.errorJoinShop=_0x4acb3d.message;
						if(_0x4acb3d.result&&_0x4acb3d.result.giftInfo){
							for(let _0x3e830f of _0x4acb3d.result.giftInfo.giftList){
								console.log('入会获得:'+_0x3e830f.discountString+_0x3e830f.prizeName+_0x3e830f.secondLineDesc);
							}
						}
					}else if(_0x4acb3d&&typeof _0x4acb3d=='object'&&_0x4acb3d.message){
						$.errorJoinShop=_0x4acb3d.message;
						console.log(''+(_0x4acb3d.message||''));
					}else{
						console.log(_0x516bb3);
					}
				}else{
					console.log(_0x516bb3);
				}
			}catch(_0x2857f7){
				$.logErr(_0x2857f7,_0x4d5c14);
			}finally{
				_0x5e58ed();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x475ce4=>{
		let _0x4a2595='{"venderId":"1000002527","channel":406,"payUpShop":true}';
		const _0x1951fb={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x4a2595)};
		const _0x5ce48b=await getH5st('ef79a',_0x1951fb);
		const _0x2dd6cf={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x4a2595+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x5ce48b),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x2dd6cf,async(_0x13f21b,_0x544892,_0xe70db2)=>{
			try{
				_0xe70db2=_0xe70db2&&_0xe70db2.match(/jsonp_.*?\((.*?)\);/)&&_0xe70db2.match(/jsonp_.*?\((.*?)\);/)[1]||_0xe70db2;
				let _0x3e6363=$.toObj(_0xe70db2,_0xe70db2);
				if(_0x3e6363&&typeof _0x3e6363=='object'){
					if(_0x3e6363&&_0x3e6363.success==true){
						console.log('入会:'+(_0x3e6363.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x3e6363.result.interestsRuleList&&_0x3e6363.result.interestsRuleList[0]&&_0x3e6363.result.interestsRuleList[0].interestsInfo&&_0x3e6363.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0xe70db2);
				}
			}catch(_0xb54e6c){
				$.logErr(_0xb54e6c,_0x544892);
			}finally{
				_0x475ce4();
			}
		});
	});
}
function getH5st(_0x34f9b2,_0x38db63){
	return new Promise(async _0x12be6a=>{
		let _0x407239={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x34f9b2+'&req='+encodeURIComponent(JSON.stringify(_0x38db63)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x407239,(_0x5f4e38,_0x17a3ac,_0x1446e2)=>{
			try{
				if(_0x5f4e38){
					console.log(JSON.stringify(_0x5f4e38));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x37ee74){
				$.logErr(_0x37ee74,_0x17a3ac);
			}finally{
				_0x12be6a(_0x1446e2);
			}
		});
	});
}
function getAuthorCodeList(_0x54a137){
	return new Promise(_0x43c5ab=>{
		const _0x21eeb4={'url':_0x54a137+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x21eeb4,async(_0x592d03,_0x574540,_0x4ee84e)=>{
			try{
				if(_0x592d03){
					$.log(_0x592d03);
				}else{
					if(_0x4ee84e)_0x4ee84e=JSON.parse(_0x4ee84e);
				}
			}catch(_0x490349){
				$.logErr(_0x490349,_0x574540);
				_0x4ee84e=null;
			}finally{
				_0x43c5ab(_0x4ee84e);
			}
		});
	});
}
function jsonParse(_0x302762){
	if(typeof _0x302762=='string'){
		try{
			return JSON.parse(_0x302762);
		}catch(_0x4aba51){
			console.log(_0x4aba51);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};