/*
1.1-1.31 雅诗兰黛奢雅邀请入会有礼
新增开卡脚本
一次性脚本

1.每邀请满3人一次抽奖机会
2.上限10组 1组3人
3.开1张卡
4.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 1.1-1.31 雅诗兰黛奢雅邀请入会有礼]

请求太频繁会被黑ip
过10分钟再执行

[task_local]
#1.1-1.31 雅诗兰黛奢雅邀请入会有礼
11 11 11 11 * jd_YSLD.js, tag=1.1-1.31 雅诗兰黛奢雅邀请入会有礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('1.1-1.31 雅诗兰黛奢雅邀请入会有礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://lzkjdz-isv.isvjd.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0xadf53b=>{
		cookiesArr.push(jdCookieNode[_0xadf53b]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x2fe519=>_0x2fe519.cookie)]['filter'](_0x5ebcec=>!!_0x5ebcec);
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
	authorCodeList=["80f8e7982fc74500b45be8694dde811a"]//await getAuthorCodeList('http://code.kingran.ga/ysld.json');
	$.joinStatus=false;
	$.activityId='2301100037674501';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	console.log('入口:\nhttps://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2301100037674501&inviterUuid='+$.shareUuid);
	for(let _0xfca804=0;_0xfca804<cookiesArr.length;_0xfca804++){
		cookie=cookiesArr[_0xfca804];
		originCookie=cookiesArr[_0xfca804];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0xfca804+1;
			message='';
			$.bean=0;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0xfca804==0&&!$.actorUuid)break;
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
		let _0x36324c='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x36324c);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x36324c);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
		if($.isNode())await notify.sendNotify(''+$.name,''+allMessage);
	}
})()['catch'](_0x18c737=>$.logErr(_0x18c737))['finally'](()=>$.done());
async function run(){
	try{
		$.endTime=0;
		$.assistCount=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x18f397=false;
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
			for(let _0x4d47d7=0;_0x4d47d7<Array(3)['length'];_0x4d47d7++){
				if(_0x4d47d7>0)console.log('第'+_0x4d47d7+'次 重新开卡');
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
			let _0x40c906=parseInt($.drawTimes/1);
			for(m=1;_0x40c906--;m++){
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
	}catch(_0x5c54b6){
		console.log(_0x5c54b6);
	}
}
async function takePostRequest(_0x5bf643){
	if($.outFlag)return;
	let _0x5c951b='https://lzkjdz-isv.isvjd.com';
	let _0x117cb7='';
	let _0x239c41='POST';
	let _0x26db97='';
	switch(_0x5bf643){
		case 'getMyPing':
			url=_0x5c951b+'/customer/getMyPing';
			_0x117cb7='token='+$.Token+'&fromType=APP&userId=1000376745&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x5c951b+'/customer/getSimpleActInfoVo';
			_0x117cb7='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x5c951b+'/common/accessLogWithAD';
			let _0x597b47='https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid;
			_0x117cb7='venderId=1000376745&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x597b47);
			break;
		case 'activityContent':
			url=_0x5c951b+'/esteelauder/inviteNew/activityContent';
			_0x117cb7='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&inviterUuid='+$.shareUuid;
			break;
		case 'convertPrize':
			url=_0x5c951b+'/esteelauder/inviteNew/convertPrize';
			_0x117cb7='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.shareUuid;
			break;
		default:
			console.log('错误'+_0x5bf643);
	}
	let _0x53c103=getPostRequest(url,_0x117cb7,_0x239c41);
	return new Promise(async _0x5af344=>{
		$.post(_0x53c103,(_0x3372e6,_0x1d92f0,_0x523281)=>{
			try{
				setActivityCookie(_0x1d92f0);
				if(_0x3372e6){
					if(_0x1d92f0&&typeof _0x1d92f0.statusCode!='undefined'){
						if(_0x1d92f0.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3372e6,_0x3372e6));
					console.log(_0x5bf643+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x5bf643,_0x523281);
				}
			}catch(_0x1328d0){
				console.log(_0x1328d0,_0x1d92f0);
			}finally{
				_0x5af344();
			}
		});
	});
}
async function dealReturn(_0x194e54,_0x581fcf){
	let _0x1a3e1c='';
	try{
		if(_0x194e54!='accessLogWithAD'||_0x194e54!='drawContent'){
			if(_0x581fcf){
				_0x1a3e1c=JSON.parse(_0x581fcf);
			}
		}
	}catch(_0x471208){
		console.log(_0x194e54+' 执行任务异常');
		console.log(_0x581fcf);
		$.runFalag=false;
	}
	try{
		switch(_0x194e54){
			case 'getMyPing':
				if(typeof _0x1a3e1c=='object'){
					if(_0x1a3e1c.result&&_0x1a3e1c.result===true){
						if(_0x1a3e1c.data&&typeof _0x1a3e1c.data['secretPin']!='undefined')$.Pin=_0x1a3e1c.data['secretPin'];
						if(_0x1a3e1c.data&&typeof _0x1a3e1c.data['nickname']!='undefined')$.nickname=_0x1a3e1c.data['nickname'];
					}else if(_0x1a3e1c.errorMessage){
						console.log(_0x194e54+' '+(_0x1a3e1c.errorMessage||''));
					}else{
						console.log(_0x194e54+' '+_0x581fcf);
					}
				}else{
					console.log(_0x194e54+' '+_0x581fcf);
				}
				break;
			case 'activityContent':
				if(typeof _0x1a3e1c=='object'){
					if(_0x1a3e1c.result&&_0x1a3e1c.result===true){
						$.actorUuid=_0x1a3e1c.data['userRecord']['uuid']||'';
						$.helpStatus=_0x1a3e1c.data['userRecord']['assistStatus']||0;
						$.openStatus=_0x1a3e1c.data['userRecord']['openCardStatus']||0;
						$.assistCount=_0x1a3e1c.data['userRecord']['assistCount']||0;
						$.drawTimes=_0x1a3e1c.data['drawTimes']||0;
						if(_0x1a3e1c.data['sendBeanNum']){
							console.log('获得'+_0x1a3e1c.data['sendBeanNum']+'豆');
							allMessage+='【账号'+$.index+'】获得'+_0x1a3e1c.data['sendBeanNum']+'豆\n';
						}
					}else if(_0x1a3e1c.errorMessage){
						if(_0x1a3e1c.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x194e54+' '+(_0x1a3e1c.errorMessage||''));
					}else{
						console.log(_0x194e54+' '+_0x581fcf);
					}
				}else{
					console.log(_0x194e54+' '+_0x581fcf);
				}
				break;
			case 'convertPrize':
				if(typeof _0x1a3e1c=='object'){
					if(_0x1a3e1c.result&&_0x1a3e1c.result===true){
						console.log(_0x1a3e1c.data['giftName']);
						if(_0x1a3e1c.data['giftName']['indexOf']('京豆')==-1&&_0x1a3e1c.data['giftName']['indexOf']('谢谢')==-1){
							allMessage+='【账号'+$.index+'】获得'+_0x1a3e1c.data['giftName']+'\n';
						}
					}else if(_0x1a3e1c.errorMessage||_0x1a3e1c.msg){
						console.log(_0x194e54+' '+(_0x1a3e1c.errorMessage||_0x1a3e1c.msg||''));
					}else{
						console.log(_0x194e54+' '+_0x581fcf);
					}
				}else{
					console.log(_0x194e54+' '+_0x581fcf);
				}
				break;
			case'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x194e54+'-> '+_0x581fcf);
		}
		if(typeof _0x1a3e1c=='object'){
			if(_0x1a3e1c.errorMessage){
				if(_0x1a3e1c.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x24af6c){
		console.log(_0x24af6c);
	}
}
function getPostRequest(_0x20de88,_0x1bbc08,_0x3351ab='POST'){
	let _0x4edc81={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x20de88.indexOf('https://lzkjdz-isv.isvjd.com')>-1){
		_0x4edc81.Referer='https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid;
		_0x4edc81.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x20de88,'method':_0x3351ab,'headers':_0x4edc81,'body':_0x1bbc08,'timeout':30000};
}
function getCk(){
	return new Promise(_0x4301d3=>{
		let _0x236f60={'url':'https://lzkjdz-isv.isvjd.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x236f60,async(_0x349577,_0x1080a2,_0x54daf7)=>{
			try{
				if(_0x349577){
					if(_0x1080a2&&typeof _0x1080a2.statusCode!='undefined'){
						if(_0x1080a2.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x349577));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x3484d9=_0x54daf7.match(/(活动已经结束)/)&&_0x54daf7.match(/(活动已经结束)/)[1]||'';
					if(_0x3484d9){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x1080a2);
				}
			}catch(_0x137d97){
				$.logErr(_0x137d97,_0x1080a2);
			}finally{
				_0x4301d3();
			}
		});
	});
}
function setActivityCookie(_0x27e5dd){
	if(_0x27e5dd){
		if(_0x27e5dd.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x2f4c4f of _0x27e5dd.headers['set-cookie']){
				lz_cookie[_0x2f4c4f.split(';')[0]['substr'](0,_0x2f4c4f.split(';')[0]['indexOf']('='))]=_0x2f4c4f.split(';')[0]['substr'](_0x2f4c4f.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x13c3be of Object.keys(lz_cookie)){
				cookie+=_0x13c3be+'='+lz_cookie[_0x13c3be]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0xeddd92){
	_0xeddd92=_0xeddd92||32;
	let _0x653f93='abcdef0123456789',_0x5e2b41=_0x653f93.length,_0x325e09='';
	for(i=0;i<_0xeddd92;i++)_0x325e09+=_0x653f93.charAt(Math.floor(Math.random()*_0x5e2b41));
	return _0x325e09;
}
async function joinShop(){
	return new Promise(async _0x35b312=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0xf155d6='';
		if($.shopactivityId)_0xf155d6=',"activityId":'+$.shopactivityId;
		const _0x2dccff='{"venderId":"1000376745","shopId":"1000376745","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0xf155d6+',"channel":406}';
		const _0x3b465a={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x2dccff)};
		const _0x546930=await getH5st('8adfb',_0x3b465a);
		const _0x479ec6={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x2dccff+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x546930),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x479ec6,async(_0x434b74,_0x174263,_0x4b583a)=>{
			try{
				_0x4b583a=_0x4b583a&&_0x4b583a.match(/jsonp_.*?\((.*?)\);/)&&_0x4b583a.match(/jsonp_.*?\((.*?)\);/)[1]||_0x4b583a;
				let _0x1a6d6f=$.toObj(_0x4b583a,_0x4b583a);
				if(_0x1a6d6f&&typeof _0x1a6d6f=='object'){
					if(_0x1a6d6f&&_0x1a6d6f.success===true){
						console.log(_0x1a6d6f.message);
						$.errorJoinShop=_0x1a6d6f.message;
						if(_0x1a6d6f.result&&_0x1a6d6f.result['giftInfo']){
							for(let _0x518cc0 of _0x1a6d6f.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x518cc0.discountString+_0x518cc0.prizeName+_0x518cc0.secondLineDesc);
							}
						}
					}else if(_0x1a6d6f&&typeof _0x1a6d6f=='object'&&_0x1a6d6f.message){
						$.errorJoinShop=_0x1a6d6f.message;
						console.log(''+(_0x1a6d6f.message||''));
					}else{
						console.log(_0x4b583a);
					}
				}else{
					console.log(_0x4b583a);
				}
			}catch(_0x3f3136){
				$.logErr(_0x3f3136,_0x174263);
			}finally{
				_0x35b312();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x5cad1b=>{
		let _0x23649e='{"venderId":"1000376745","channel":406,"payUpShop":true}';
		const _0x1cb316={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x23649e)};
		const _0x26e70e=await getH5st('ef79a',_0x1cb316);
		const _0x958ccc={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x23649e+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x26e70e),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x958ccc,async(_0xff6b2e,_0x56ac31,_0xf2fede)=>{
			try{
				_0xf2fede=_0xf2fede&&_0xf2fede.match(/jsonp_.*?\((.*?)\);/)&&_0xf2fede.match(/jsonp_.*?\((.*?)\);/)[1]||_0xf2fede;
				let _0x2b6440=$.toObj(_0xf2fede,_0xf2fede);
				if(_0x2b6440&&typeof _0x2b6440=='object'){
					if(_0x2b6440&&_0x2b6440.success==true){
						console.log('入会:'+(_0x2b6440.result['shopMemberCardInfo']['venderCardName']||''));
						$.shopactivityId=_0x2b6440.result['interestsRuleList']&&_0x2b6440.result['interestsRuleList'][0]&&_0x2b6440.result['interestsRuleList'][0]['interestsInfo']&&_0x2b6440.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0xf2fede);
				}
			}catch(_0x1fc028){
				$.logErr(_0x1fc028,_0x56ac31);
			}finally{
				_0x5cad1b();
			}
		});
	});
}
function getAuthorCodeList(_0x2a2c89){
	return new Promise(_0x403e67=>{
		const _0x10db71={'url':_0x2a2c89+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x10db71,async(_0x312ef5,_0x3ad6d6,_0x2def8e)=>{
			try{
				if(_0x312ef5){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x2def8e)_0x2def8e=JSON.parse(_0x2def8e);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x3cf07e){
				$.logErr(_0x3cf07e,_0x3ad6d6);
				_0x2def8e=null;
			}finally{
				_0x403e67(_0x2def8e);
			}
		});
	});
}
function random(_0xff15e9,_0x4115fb){
	return Math.floor(Math.random()*(_0x4115fb-_0xff15e9))+_0xff15e9;
}
function jsonParse(_0x2069c3){
	if(typeof _0x2069c3=='string'){
		try{
			return JSON.parse(_0x2069c3);
		}catch(_0x189098){
			console.log(_0x189098);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};