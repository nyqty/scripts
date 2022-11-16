/*
10个豆子
一次性 没有获得就是玩过的 等下删除

库存还有9W

cron:31 12,21 16-25 11 *
============Quantumultx===============
[task_local]
#10个豆子
31 12,14 16 11 * jd_super10dz.js, tag=10个豆子, enabled=true
*/
const Env=require('./utils/Env.js');
const $=new Env("10个豆子");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x506aa2=>{
		cookiesArr.push(jdCookieNode[_0x506aa2]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x55f0f4=>_0x55f0f4.cookie)].filter(_0x5e82f8=>!!_0x5e82f8);
}
const JD_SIGN_API=process.env.JD_SIGN_API||'http://api.nolanstore.top/sign';
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	//authorCodeList=await getAuthorCodeList('http://code.kingran.ga/xxwj.json');
    authorCodeList=["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F","j7mZIPpzyFSoXXltwtdueMjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD"];
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='21699045';
	$.userId='1000003443';
	$.actId='jdNewProducts20221016';
	$.MixNicks='';
	$.inviteNick=$.authorCode;//buyerNick
	for(let _0x56d5e6=0;_0x56d5e6<cookiesArr.length;_0x56d5e6++){
		cookie=cookiesArr[_0x56d5e6];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x56d5e6+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(parseInt(Math.random()*1000+1000,10));
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x3d8fe5='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x3d8fe5);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x3d8fe5);
	}
})().catch(_0x218818=>$.logErr(_0x218818)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let _0x575025=false;
		if($.activityEnd)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await getToken();
		if($.Token==''){
			console.log('获取[token]失败！');
			return;
		}
		await takePostRequest('activity_load');
		if($.hotFlag)return;
		if($.MixNick==''){
			console.log('获取cookie失败');
			return;
		}
		$.toBind=0;
		$.openLists=[];
		await takePostRequest('绑定');
		await $.wait(parseInt(Math.random()*1000+2000,10));
		await takePostRequest('completeState');
		for(let _0x5d95c3=0;_0x5d95c3<$.renwulists.length;_0x5d95c3++){
			$.missionType=$.renwulists[_0x5d95c3].type;
			if(!$.renwulists[_0x5d95c3].isComplete){
				switch($.missionType){
					case 'openCard':
						for(let _0x20fa04=0;_0x20fa04<1;_0x20fa04++){
							$.missionType='openCard';
							$.joinVenderId=1000003443;
							await takePostRequest('mission');
							await $.wait(parseInt(Math.random()*1000+2000,10));
							await joinShop();
							await $.wait(parseInt(Math.random()*1000+2000,10));
							await takePostRequest('mission');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'shareAct':
						for(let _0x595312=0;_0x595312<1;_0x595312++){
							$.missionType='shareAct';
							await takePostRequest('绑定');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'bulletChat':
						for(let _0x2f2834=0;_0x2f2834<1;_0x2f2834++){
							$.missionType='bulletChat';
							await takePostRequest('bulletChat');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'collectShop':
					case 'payTrade':
						break;
					default:
						await $.wait(1000);
				}
			}
		}
		await takePostRequest('抽奖');
		await $.wait(parseInt(Math.random()*1000+1000,10));
	}catch(_0x347b2c){
		console.log(_0x347b2c);
	}
}
async function takePostRequest(_0x56a94c){
	if($.outFlag)return;
	let _0x42185d='https://mpdz-sanxing-dz.isvjcloud.com';
	let _0xbc5fde='';
	let _0x405129='POST';
	let _0x5adcfc='';
	switch(_0x56a94c){
		case 'activity_load':
			url=_0x42185d+'/dm/front/jdNewProducts/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x5adcfc={'jdToken':$.Token,'inviteNick':$.inviteNick||''};
			if($.joinVenderId)_0x5adcfc={..._0x5adcfc,'shopId':''+$.joinVenderId};
			_0xbc5fde=taskPostUrl('/jdNewProducts/activity/load',_0x5adcfc);
			break;
		case 'shopList':
			url=_0x42185d+'/dm/front/jdNewProducts/shop/shopList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x5adcfc={};
			_0xbc5fde=taskPostUrl('/jdNewProducts/shop/shopList',_0x5adcfc);
			break;
		case'绑定':
			url=_0x42185d+'/dm/front/jdNewProducts/customer/inviteRelation?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x5adcfc={'inviterNick':$.inviteNick||''};
			_0xbc5fde=taskPostUrl('/jdNewProducts/customer/inviteRelation',_0x5adcfc);
			break;
		case 'completeState':
			url=_0x42185d+'/dm/front/jdNewProducts/mission/completeState?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x5adcfc={};
			_0xbc5fde=taskPostUrl('/jdNewProducts/mission/completeState',_0x5adcfc);
			break;
		case'mission':
			url=_0x42185d+'/dm/front/jdNewProducts/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x5adcfc={'missionType':$.missionType};
			if($.joinVenderId)_0x5adcfc={..._0x5adcfc,'shopId':$.joinVenderId};
			_0xbc5fde=taskPostUrl('/jdNewProducts/mission/completeMission',_0x5adcfc);
			break;
		case'抽奖':
			url=_0x42185d+'/dm/front/jdNewProducts/interactive/drawPost?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x5adcfc={'round':1,'dataType':'draw'};
			_0xbc5fde=taskPostUrl('/jdNewProducts/interactive/drawPost',_0x5adcfc);
			break;
		case 'followShop':
			url=_0x42185d+'/dm/front/jdNewProducts/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x5adcfc={'missionType':'collectShop','bulletChat':'','shopId':'1000003443'};
			_0xbc5fde=taskPostUrl('/jdNewProducts/mission/completeMission',_0x5adcfc);
			break;
		case'bulletChat':
			url=_0x42185d+'/dm/front/jdNewProducts/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x5adcfc={'missionType':'bulletChat','bulletChat':'真正的旗舰折叠屏手机，三星Galaxy Z Fold4','shopId':'1000003443'};
			_0xbc5fde=taskPostUrl('/jdNewProducts/mission/completeMission',_0x5adcfc);
			break;
		default:
			console.log('错误'+_0x56a94c);
	}
	let _0x3e6d7f=getPostRequest(url,_0xbc5fde,_0x405129);
	return new Promise(async _0x72a04b=>{
		$.post(_0x3e6d7f,(_0x13df86,_0x2e9c69,_0x4f30a6)=>{
			try{
				if(_0x13df86){
					if(_0x2e9c69&&_0x2e9c69.statusCode&&_0x2e9c69.statusCode==493){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					console.log(''+$.toStr(_0x13df86,_0x13df86));
					console.log(_0x56a94c+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x56a94c,_0x4f30a6);
				}
			}catch(_0x39422c){
				console.log(_0x39422c,_0x2e9c69);
			}finally{
				_0x72a04b();
			}
		});
	});
}
async function dealReturn(_0x3c75e3,_0x118283){
	let _0x4a7a36='';
	try{
		if(_0x3c75e3!='accessLogWithAD'||_0x3c75e3!='drawContent'){
			if(_0x118283){
				_0x4a7a36=JSON.parse(_0x118283);
			}
		}
	}catch(_0x32fa13){
		console.log(_0x3c75e3+' 执行任务异常');
		console.log(_0x118283);
		$.runFalag=false;
	}
	try{
		let _0x102f36='';
		switch(_0x3c75e3){
			case 'completeState':
				if(typeof _0x4a7a36=='object'){
					if(_0x4a7a36.success&&_0x4a7a36.success===true&&_0x4a7a36.data){
						if(_0x4a7a36.data.status&&_0x4a7a36.data.status==200){
							$.renwulists=_0x4a7a36.data.data||[];
						}
					}else if(_0x4a7a36.message){}else{}
				}else{}
				break;
			case 'accessLogWithAD':
			case'drawContent':
				break;
			case 'activity_load':
			case 'mission':
			case 'shopList':
			case 'followShop':
			case'抽奖':
			case'绑定':
			case 'bulletChat':
				_0x102f36='';
				if(_0x3c75e3=='followShop')_0x102f36='关注';
				if(_0x3c75e3=='addCart')_0x102f36='加购';
				if(typeof _0x4a7a36=='object'){
					if(_0x4a7a36.success&&_0x4a7a36.success===true&&_0x4a7a36.data){
						if(_0x4a7a36.data.status&&_0x4a7a36.data.status==200){
							_0x4a7a36=_0x4a7a36.data;
							if(_0x3c75e3=='activity_load'){
								if(_0x4a7a36.data){
									$.endTime=_0x4a7a36.data.cusActivity.endTime||0;
									$.MixNick=_0x4a7a36.data.missionCustomer.buyerNick||'';
									$.remainPoint=_0x4a7a36.data.missionCustomer.remainPoint||0;
									$.usedPoint=_0x4a7a36.data.missionCustomer.usedPoint||0;
									$.hasCollectShop=_0x4a7a36.data.missionCustomer.hasCollectShop||0;
									$.hasAddCart=_0x4a7a36.data.missionCustomer.hasAddCart||0;
								}
							}else if(_0x3c75e3=='shopList'){
								if(_0x4a7a36.data){
									$.openLists=_0x4a7a36.data;
								}
							}else if(_0x3c75e3=='mission'){
								if(_0x4a7a36.data.remark.indexOf('赶紧去开卡吧')>-1){
									$.open=true;
								}else{
									$.open=false;
								}
							}else if(_0x3c75e3=='抽奖'){
								if(_0x4a7a36.status=='200'){
									console.log('获得:'+_0x4a7a36.data.awardSendLog.awardName);
								}
							}
						}else if(_0x4a7a36.data.msg){
							if(_0x4a7a36.errorMessage.indexOf('活动未开始')>-1){
								$.activityEnd=true;
							}
						}else if(_0x4a7a36.errorMessage){
							if(_0x4a7a36.errorMessage.indexOf('火爆')>-1){}
						}else{}
					}else if(_0x4a7a36.errorMessage){}else{}
				}else{}
				break;
			default:
		}
		if(typeof _0x4a7a36=='object'){
			if(_0x4a7a36.errorMessage){
				if(_0x4a7a36.errorMessage.indexOf('火爆')>-1){}
			}
		}
	}catch(_0x19dbd0){
		console.log(_0x19dbd0);
	}
}
function getPostRequest(_0x546922,_0x29076e,_0x1d25cd='POST'){
	let _0x12e5fe={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x546922.indexOf('https://mpdz-sanxing-dz.isvjcloud.com')>-1){
		_0x12e5fe.Origin='https://mpdz-sanxing-dz.isvjcloud.com';
		_0x12e5fe['Content-Type']='application/json; charset=utf-8';
		delete _0x12e5fe.Cookie;
	}
	return{'url':_0x546922,'method':_0x1d25cd,'headers':_0x12e5fe,'body':_0x29076e,'timeout':60000};
}
function taskPostUrl(_0x2527c3,_0x41530a){
	const _0x553e3a={'jsonRpc':'2.0','params':{'commonParameter':{'m':'POST','sign':'a6b11167cb823d19f793bb979448dfac','timestamp':Date.now(),'userId':$.userId},'admJson':{'actId':$.actId,'userId':$.userId,..._0x41530a,'method':_0x2527c3,'buyerNick':$.MixNick||''}}};
	if(_0x2527c3.indexOf('missionInviteList')>-1){
		delete _0x553e3a.params.admJson.actId;
	}
	return $.toStr(_0x553e3a,_0x553e3a);
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x8feea2){
	_0x8feea2=_0x8feea2||32;
	let _0x5a3830='abcdef0123456789',_0x316559=_0x5a3830.length,_0x281db7='';
	for(i=0;i<_0x8feea2;i++)_0x281db7+=_0x5a3830.charAt(Math.floor(Math.random()*_0x316559));
	return _0x281db7;
}
function jsonParse(_0x9fa566){
	if(typeof _0x9fa566=='string'){
		try{
			return JSON.parse(_0x9fa566);
		}catch(_0x578c65){
			console.log(_0x578c65);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function getToken(){
	await getSign('isvObfuscator',{'id':'','url':'https://mpdz-sanxing-dz.isvjcloud.com'});
	let _0x4ca417={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':''+$.Signz};
	return new Promise(_0x59e1e4=>{
		$.post(_0x4ca417,(_0x347401,_0x212f9a,_0x38036b)=>{
			try{
				if(_0x347401){
					$.log(_0x347401);
				}else{
					if(_0x38036b){
						_0x38036b=JSON.parse(_0x38036b);
						if(_0x38036b.code==='0'){
							$.Token=_0x38036b.token;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x8d212c){
				$.log(_0x8d212c);
			}finally{
				_0x59e1e4();
			}
		});
	});
}
function getSign(_0x5b4275,_0x2a93e5){
	let _0x5332ba={'fn':_0x5b4275,'body':JSON.stringify(_0x2a93e5)};
	let _0x3f41be={'url':JD_SIGN_API,'body':JSON.stringify(_0x5332ba),'headers':{'Content-Type':'application/json'},'timeout':30000};
	return new Promise(async _0x1c9255=>{
		$.post(_0x3f41be,(_0x3e32ce,_0x25039d,_0x5332ba)=>{
			try{
				if(_0x3e32ce){
					console.log(''+JSON.stringify(_0x3e32ce));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{
					_0x5332ba=JSON.parse(_0x5332ba);
					if(typeof _0x5332ba==='object'&&_0x5332ba&&_0x5332ba.body){
						$.Signz=_0x5332ba.body||'';
					}else{}
				}
			}catch(_0x56f55e){
				$.logErr(_0x56f55e,_0x25039d);
			}finally{
				_0x1c9255(_0x5332ba);
			}
		});
	});
};
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x1d1b3e=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x4b6f52='';
		if($.shopactivityId)_0x4b6f52=',"activityId":'+$.shopactivityId;
		const _0x506483='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x4b6f52+',"channel":406}';
		const _0xeb91e8={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x506483)};
		const _0x57e710=await getH5st('8adfb',_0xeb91e8);
		const _0x1dff9e={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x506483+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x57e710),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x1dff9e,async(_0x246ffc,_0x1cedfa,_0x303177)=>{
			try{
				_0x303177=_0x303177&&_0x303177.match(/jsonp_.*?\((.*?)\);/)&&_0x303177.match(/jsonp_.*?\((.*?)\);/)[1]||_0x303177;
				let _0x1dcb65=$.toObj(_0x303177,_0x303177);
				if(_0x1dcb65&&typeof _0x1dcb65=='object'){
					if(_0x1dcb65&&_0x1dcb65.success===true){
						$.errorJoinShop=_0x1dcb65.message;
						if(_0x1dcb65.result&&_0x1dcb65.result.giftInfo){
							for(let _0x2f1db6 of _0x1dcb65.result.giftInfo.giftList){}
						}
					}else if(_0x1dcb65&&typeof _0x1dcb65=='object'&&_0x1dcb65.message){
						$.errorJoinShop=_0x1dcb65.message;
					}else{}
				}else{}
			}catch(_0x13b4e7){
				$.logErr(_0x13b4e7,_0x1cedfa);
			}finally{
				_0x1d1b3e();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x38b8d8=>{
		const _0x21f821='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x3df286={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x21f821)};
		const _0x4dcc49=await getH5st('8adfb',_0x3df286);
		const _0x13f424={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x21f821+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x4dcc49),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x13f424,async(_0x340300,_0x1dce3f,_0x51346b)=>{
			try{
				_0x51346b=_0x51346b&&_0x51346b.match(/jsonp_.*?\((.*?)\);/)&&_0x51346b.match(/jsonp_.*?\((.*?)\);/)[1]||_0x51346b;
				let _0x5bd770=$.toObj(_0x51346b,_0x51346b);
				if(_0x5bd770&&typeof _0x5bd770=='object'){
					if(_0x5bd770&&_0x5bd770.success==true){
						$.shopactivityId=_0x5bd770.result.interestsRuleList&&_0x5bd770.result.interestsRuleList[0]&&_0x5bd770.result.interestsRuleList[0].interestsInfo&&_0x5bd770.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{}
			}catch(_0x23ab49){
				$.logErr(_0x23ab49,_0x1dce3f);
			}finally{
				_0x38b8d8();
			}
		});
	});
}
function getH5st(_0x30560f,_0x4bd599){
	return new Promise(async _0x1b293f=>{
		let _0x313d70={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x30560f+'&req='+encodeURIComponent(JSON.stringify(_0x4bd599)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x313d70,(_0x4a930e,_0x2d7ad1,_0x170dc9)=>{
			try{
				if(_0x4a930e){
					console.log(JSON.stringify(_0x4a930e));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x3c96e8){
				$.logErr(_0x3c96e8,_0x2d7ad1);
			}finally{
				_0x1b293f(_0x170dc9);
			}
		});
	});
}
function getAuthorCodeList(_0x24ca2d){
	return new Promise(_0x4a7d55=>{
		const _0x4dc291={'url':_0x24ca2d+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x4dc291,async(_0x404d09,_0x47912a,_0x5b8cfc)=>{
			try{
				if(_0x404d09){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x5b8cfc)_0x5b8cfc=JSON.parse(_0x5b8cfc);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x2b6f03){
				$.logErr(_0x2b6f03,_0x47912a);
				_0x5b8cfc=null;
			}finally{
				_0x4a7d55(_0x5b8cfc);
			}
		});
	});
}
function random(_0x26474f,_0x4558a4){
	return Math.floor(Math.random()*(_0x4558a4-_0x26474f))+_0x26474f;
};