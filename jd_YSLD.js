/*
12.1-12.31 雅诗兰黛奢雅邀请入会有礼
新增开卡脚本
一次性脚本

1.每邀请满3人一次抽奖机会
2.上限10组 1组3人
3.开1张卡
4.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 12.1-12.31 雅诗兰黛奢雅邀请入会有礼]

请求太频繁会被黑ip
过10分钟再执行

[task_local]
#12.1-12.31 雅诗兰黛奢雅邀请入会有礼
1 1 1 1 ** jd_YSLD.js, tag=12.1-12.31 雅诗兰黛奢雅邀请入会有礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.1-12.31 雅诗兰黛奢雅邀请入会有礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjd.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x5c0d84=>{
		cookiesArr.push(jdCookieNode[_0x5c0d84]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x487357=>_0x487357.cookie)]['filter'](_0x533e94=>!!_0x533e94);
}
allMessage='';
message='';
let lz_cookie={};
$.hotFlag=false;
$.hasEnd=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	authorCodeList=[];//await getAuthorCodeList('http://code.kingran.ga/ysld.json');
	$.joinStatus=false;
	$.activityId='2212100037674501';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	console.log('入口:\nhttps://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2212100037674501&inviterUuid='+$.shareUuid);
	for(let _0xfac0c0=0;_0xfac0c0<cookiesArr.length;_0xfac0c0++){
		cookie=cookiesArr[_0xfac0c0];
		originCookie=cookiesArr[_0xfac0c0];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0xfac0c0+1;
			message='';
			$.bean=0;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0xfac0c0==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd||$.hasEnd)break;
		}
	}
	cookie=cookiesArr[0];
	if(cookie&&$.joinStatus&&!$.outFlag&&!$.activityEnd){
		$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
		$.index=1;
		message='';
		$.bean=0;
		$.nickName='';
		console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
		await $.wait(parseInt(Math.random()*2000+4000,10));
		await getUA();
		await run();
		await $.wait(3000);
	}
	if($.outFlag){
		let _0x462ea2='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x462ea2);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x462ea2);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
		if($.isNode())await notify.sendNotify(''+$.name,''+allMessage);
	}
})()['catch'](_0xaa4503=>$.logErr(_0xaa4503))['finally'](()=>$.done());
async function run(){
	try{
		$.endTime=0;
		$.assistCount=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x5e4ce4=false;
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
		await takePostRequest('activityContent');
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if($.openStatus==0){
			console.log('开卡');
			$.joinVenderId=1000376745;
			await getshopactivityId();
			for(let _0x29e75d=0;_0x29e75d<Array(5)['length'];_0x29e75d++){
				if(_0x29e75d>0)console.log('第'+_0x29e75d+'次 重新开卡');
				await joinShop();
				if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')==-1){
					break;
				}
			}
			if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
				console.log('开卡失败❌ ，重新执行脚本');
			}
			await takePostRequest('activityContent');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		console.log($.openStatus===1?'已开卡':$.openStatus===2?'已开卡':$.openStatus===0?'未开卡':'未知-'+$.openStatus);
		console.log($.helpStatus===1?'助力成功':$.helpStatus===0?'助力失败':'助力失败-'+$.helpStatus);
		if($.index==1){
			$.helpCount=$.assistCount;
		}else if($.helpStatus==1){
			$.helpCount++;
		}
		if($.drawTimes>0){
			let _0xd391d0=parseInt($.drawTimes/1);
			for(m=1;_0xd391d0--;m++){
				await takePostRequest('convertPrize');
			}
		}
		console.log('【账号'+$.index+'】助力人数：'+$.assistCount+($.index!=1&&' 【账号1】助力人数：'+$.helpCount||''));
		if($.helpCount>=10*3)$.hasEnd=true;
		console.log($.actorUuid);
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+10000,10));
	}catch(_0x7d97c8){
		console.log(_0x7d97c8);
	}
}
async function takePostRequest(_0x2c47cd){
	if($.outFlag)return;
	let _0xb29901='https://lzkjdz-isv.isvjd.com';
	let _0x125a73='';
	let _0x46b670='POST';
	let _0xc45475='';
	switch(_0x2c47cd){
		case 'getMyPing':
			url=_0xb29901+'/customer/getMyPing';
			_0x125a73='token='+$.Token+'&fromType=APP&userId=1000376745&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0xb29901+'/customer/getSimpleActInfoVo';
			_0x125a73='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0xb29901+'/common/accessLogWithAD';
			let _0x4addba='https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid;
			_0x125a73='venderId=1000376745&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x4addba);
			break;
		case 'activityContent':
			url=_0xb29901+'/esteelauder/inviteNew/activityContent';
			_0x125a73='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&inviterUuid='+$.shareUuid;
			break;
		case 'convertPrize':
			url=_0xb29901+'/esteelauder/inviteNew/convertPrize';
			_0x125a73='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.shareUuid;
			break;
		default:
			console.log('错误'+_0x2c47cd);
	}
	let _0x2dde6c=getPostRequest(url,_0x125a73,_0x46b670);
	return new Promise(async _0x33e98c=>{
		$.post(_0x2dde6c,(_0x2526ef,_0x5b6b2d,_0x46f718)=>{
			try{
				setActivityCookie(_0x5b6b2d);
				if(_0x2526ef){
					if(_0x5b6b2d&&typeof _0x5b6b2d.statusCode!='undefined'){
						if(_0x5b6b2d.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x2526ef,_0x2526ef));
					console.log(_0x2c47cd+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x2c47cd,_0x46f718);
				}
			}catch(_0x5218e6){
				console.log(_0x5218e6,_0x5b6b2d);
			}finally{
				_0x33e98c();
			}
		});
	});
}
async function dealReturn(_0x533ea0,_0x115f7f){
	let _0x4c8c90='';
	try{
		if(_0x533ea0!='accessLogWithAD'||_0x533ea0!='drawContent'){
			if(_0x115f7f){
				_0x4c8c90=JSON.parse(_0x115f7f);
			}
		}
	}catch(_0x4238a6){
		console.log(_0x533ea0+' 执行任务异常');
		console.log(_0x115f7f);
		$.runFalag=false;
	}
	try{
		switch(_0x533ea0){
			case 'getMyPing':
				if(typeof _0x4c8c90=='object'){
					if(_0x4c8c90.result&&_0x4c8c90.result===true){
						if(_0x4c8c90.data&&typeof _0x4c8c90.data['secretPin']!='undefined')$.Pin=_0x4c8c90.data['secretPin'];
						if(_0x4c8c90.data&&typeof _0x4c8c90.data['nickname']!='undefined')$.nickname=_0x4c8c90.data['nickname'];
					}else if(_0x4c8c90.errorMessage){
						console.log(_0x533ea0+' '+(_0x4c8c90.errorMessage||''));
					}else{
						console.log(_0x533ea0+' '+_0x115f7f);
					}
				}else{
					console.log(_0x533ea0+' '+_0x115f7f);
				}
				break;
			case 'activityContent':
				if(typeof _0x4c8c90=='object'){
					if(_0x4c8c90.result&&_0x4c8c90.result===true){
						$.actorUuid=_0x4c8c90.data['userRecord']['uuid']||'';
						$.helpStatus=_0x4c8c90.data['userRecord']['assistStatus']||0;
						$.openStatus=_0x4c8c90.data['userRecord']['openCardStatus']||0;
						$.assistCount=_0x4c8c90.data['userRecord']['assistCount']||0;
						$.drawTimes=_0x4c8c90.data['drawTimes']||0;
						if(_0x4c8c90.data['sendBeanNum']){
							console.log('获得'+_0x4c8c90.data['sendBeanNum']+'豆');
							allMessage+='【账号'+$.index+'】获得'+_0x4c8c90.data['sendBeanNum']+'豆\n';
						}
					}else if(_0x4c8c90.errorMessage){
						if(_0x4c8c90.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x533ea0+' '+(_0x4c8c90.errorMessage||''));
					}else{
						console.log(_0x533ea0+' '+_0x115f7f);
					}
				}else{
					console.log(_0x533ea0+' '+_0x115f7f);
				}
				break;
			case 'convertPrize':
				if(typeof _0x4c8c90=='object'){
					if(_0x4c8c90.result&&_0x4c8c90.result===true){
						console.log(_0x4c8c90.data['giftName']);
						if(_0x4c8c90.data['giftName']['indexOf']('京豆')==-1&&_0x4c8c90.data['giftName']['indexOf']('谢谢')==-1){
							allMessage+='【账号'+$.index+'】获得'+_0x4c8c90.data['giftName']+'\n';
						}
					}else if(_0x4c8c90.errorMessage||_0x4c8c90.msg){
						console.log(_0x533ea0+' '+(_0x4c8c90.errorMessage||_0x4c8c90.msg||''));
					}else{
						console.log(_0x533ea0+' '+_0x115f7f);
					}
				}else{
					console.log(_0x533ea0+' '+_0x115f7f);
				}
				break;
			case'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x533ea0+'-> '+_0x115f7f);
		}
		if(typeof _0x4c8c90=='object'){
			if(_0x4c8c90.errorMessage){
				if(_0x4c8c90.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x7e1768){
		console.log(_0x7e1768);
	}
}
function getPostRequest(_0x503df3,_0x3b90fc,_0x10ac6e='POST'){
	let _0x4a65af={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x503df3.indexOf('https://lzkjdz-isv.isvjd.com')>-1){
		_0x4a65af.Referer='https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid;
		_0x4a65af.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x503df3,'method':_0x10ac6e,'headers':_0x4a65af,'body':_0x3b90fc,'timeout':30000};
}
function getCk(){
	return new Promise(_0x392443=>{
		let _0x25a6d8={'url':'https://lzkjdz-isv.isvjd.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x25a6d8,async(_0x55f238,_0x2ab72a,_0x251483)=>{
			try{
				if(_0x55f238){
					if(_0x2ab72a&&typeof _0x2ab72a.statusCode!='undefined'){
						if(_0x2ab72a.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x55f238));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x564143=_0x251483.match(/(活动已经结束)/)&&_0x251483.match(/(活动已经结束)/)[1]||'';
					if(_0x564143){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x2ab72a);
				}
			}catch(_0x517463){
				$.logErr(_0x517463,_0x2ab72a);
			}finally{
				_0x392443();
			}
		});
	});
}
function setActivityCookie(_0x3f0432){
	if(_0x3f0432){
		if(_0x3f0432.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x219b09 of _0x3f0432.headers['set-cookie']){
				lz_cookie[_0x219b09.split(';')[0]['substr'](0,_0x219b09.split(';')[0]['indexOf']('='))]=_0x219b09.split(';')[0]['substr'](_0x219b09.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x33287e of Object.keys(lz_cookie)){
				cookie+=_0x33287e+'='+lz_cookie[_0x33287e]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x34371e){
	_0x34371e=_0x34371e||32;
	let _0x237a8e='abcdef0123456789',_0x415471=_0x237a8e.length,_0x2a7905='';
	for(i=0;i<_0x34371e;i++)_0x2a7905+=_0x237a8e.charAt(Math.floor(Math.random()*_0x415471));
	return _0x2a7905;
}
async function joinShop(){
	return new Promise(async _0x465d7c=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x5376cc='';
		if($.shopactivityId)_0x5376cc=',"activityId":'+$.shopactivityId;
		const _0xe61d3c='{"venderId":"1000376745","shopId":"1000376745","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x5376cc+',"channel":406}';
		const _0x5efe9b={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0xe61d3c)};
		const _0x1fe4a0=await getH5st('8adfb',_0x5efe9b);
		const _0x511bbc={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0xe61d3c+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1fe4a0),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x511bbc,async(_0x4e31b3,_0x32b146,_0x46f3de)=>{
			try{
				_0x46f3de=_0x46f3de&&_0x46f3de.match(/jsonp_.*?\((.*?)\);/)&&_0x46f3de.match(/jsonp_.*?\((.*?)\);/)[1]||_0x46f3de;
				let _0x124633=$.toObj(_0x46f3de,_0x46f3de);
				if(_0x124633&&typeof _0x124633=='object'){
					if(_0x124633&&_0x124633.success===true){
						console.log(_0x124633.message);
						$.errorJoinShop=_0x124633.message;
						if(_0x124633.result&&_0x124633.result['giftInfo']){
							for(let _0xccff17 of _0x124633.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0xccff17.discountString+_0xccff17.prizeName+_0xccff17.secondLineDesc);
							}
						}
					}else if(_0x124633&&typeof _0x124633=='object'&&_0x124633.message){
						$.errorJoinShop=_0x124633.message;
						console.log(''+(_0x124633.message||''));
					}else{
						console.log(_0x46f3de);
					}
				}else{
					console.log(_0x46f3de);
				}
			}catch(_0x350c22){
				$.logErr(_0x350c22,_0x32b146);
			}finally{
				_0x465d7c();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x35abf8=>{
		let _0xd09682='{"venderId":"1000376745","channel":406,"payUpShop":true}';
		const _0x4139a9={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0xd09682)};
		const _0x10830c=await getH5st('ef79a',_0x4139a9);
		const _0x466042={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0xd09682+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x10830c),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x466042,async(_0x427fee,_0x14fa4f,_0x1c8143)=>{
			try{
				_0x1c8143=_0x1c8143&&_0x1c8143.match(/jsonp_.*?\((.*?)\);/)&&_0x1c8143.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1c8143;
				let _0x2190bb=$.toObj(_0x1c8143,_0x1c8143);
				if(_0x2190bb&&typeof _0x2190bb=='object'){
					if(_0x2190bb&&_0x2190bb.success==true){
						console.log('入会:'+(_0x2190bb.result['shopMemberCardInfo']['venderCardName']||''));
						$.shopactivityId=_0x2190bb.result['interestsRuleList']&&_0x2190bb.result['interestsRuleList'][0]&&_0x2190bb.result['interestsRuleList'][0]['interestsInfo']&&_0x2190bb.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x1c8143);
				}
			}catch(_0x37b687){
				$.logErr(_0x37b687,_0x14fa4f);
			}finally{
				_0x35abf8();
			}
		});
	});
}
function getH5st(_0x3bfb92,_0x584a1e){
	return new Promise(async _0xa08b3f=>{
		let _0x3e90a7={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x3bfb92+'&req='+encodeURIComponent(JSON.stringify(_0x584a1e)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x3e90a7,(_0x57ce3f,_0x3b1d57,_0x4f88d9)=>{
			try{
				if(_0x57ce3f){
					console.log(JSON.stringify(_0x57ce3f));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0xc91c1e){
				$.logErr(_0xc91c1e,_0x3b1d57);
			}finally{
				_0xa08b3f(_0x4f88d9);
			}
		});
	});
}
function getAuthorCodeList(_0x4f2dc7){
	return new Promise(_0x32ca57=>{
		const _0x53bc59={'url':_0x4f2dc7+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x53bc59,async(_0x4da156,_0x5e8ff6,_0x5d1a98)=>{
			try{
				if(_0x4da156){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x5d1a98)_0x5d1a98=JSON.parse(_0x5d1a98);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x14c0bf){
				$.logErr(_0x14c0bf,_0x5e8ff6);
				_0x5d1a98=null;
			}finally{
				_0x32ca57(_0x5d1a98);
			}
		});
	});
}
function random(_0x2836f2,_0x4eba61){
	return Math.floor(Math.random()*(_0x4eba61-_0x2836f2))+_0x2836f2;
}
function jsonParse(_0x2d9a34){
	if(typeof _0x2d9a34=='string'){
		try{
			return JSON.parse(_0x2d9a34);
		}catch(_0x36c9a1){
			console.log(_0x36c9a1);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};