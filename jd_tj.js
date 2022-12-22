/*
12.20-1.11 天机会员联合
新增开卡脚本，一次性脚本

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#12.20-1.11 天机会员联合
1 1 1 1 * jd_tj.js, tag=12.20-1.11 天机会员联合, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $=new Env("12.20-1.11 天机会员联合");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x3f92bf=>{
		cookiesArr.push(jdCookieNode[_0x3f92bf]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x46fbe2=>_0x46fbe2.cookie)]['filter'](_0x4cee0d=>!!_0x4cee0d);
}
opencard_toShop=$.isNode()?process.env['opencard_toShop']?process.env['opencard_toShop']:''+opencard_toShop:$.getdata('opencard_toShop')?$.getdata('opencard_toShop'):''+opencard_toShop;
const JD_SIGN_API=process.env['JD_SIGN_API']||'https://api.nolanstore.top/sign';
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	authorCodeList=await getAuthorCodeList('http://code.kingran.ga/tj.json');
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='21699045';
	$.userId='10299171';
	$.actId='jd_dimensity_union_221207';
	$.MixNicks='';
	$.inviteNick=$.authorCode;
	for(let _0x1ebcbd=0;_0x1ebcbd<cookiesArr.length;_0x1ebcbd++){
		cookie=cookiesArr[_0x1ebcbd];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x1ebcbd+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(parseInt(Math.random()*1000+1000,10));
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x550976='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x550976);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x550976);
	}
})()['catch'](_0x5afc0a=>$.logErr(_0x5afc0a))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let _0x159211=false;
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
		await takePostRequest('completeState');
		for(let _0x252ed9=0;_0x252ed9<$.renwulists['length'];_0x252ed9++){
			$.missionType=$.renwulists[_0x252ed9]['type'];
			if(!$.renwulists[_0x252ed9]['isComplete']){
				switch($.missionType){
					case 'oneKeyOpenCard':
						for(let _0x2cb5ac=0;_0x2cb5ac<1;_0x2cb5ac++){
							$.missionType='oneKeyOpenCard';
							await takePostRequest('kaika');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'shareAct':
						for(let _0x5e2903=0;_0x5e2903<1;_0x5e2903++){
							$.missionType='shareAct';
							await takePostRequest('绑定');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'uniteCollectShop':
						for(let _0x1c1153=0;_0x1c1153<1;_0x1c1153++){
							$.missionType='uniteCollectShop';
							await takePostRequest('mission');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'viewOneVivoShop':
						for(let _0x5de23a=0;_0x5de23a<1;_0x5de23a++){
							$.missionType='viewOneVivoShop';
							await takePostRequest('mission');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'viewOneDimensityShop':
						for(let _0x587599=0;_0x587599<1;_0x587599++){
							$.missionType='viewOneDimensityShop';
							await takePostRequest('mission');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'viewTargetProductVivo':
						$.goodsNumIdList=[100046172421,100046172433];
						for(let _0x264e1a=0;_0x264e1a<$.goodsNumIdList['length'];_0x264e1a++){
							$.missionType='viewTargetProductVivo';
							$.goodsNumId=$.goodsNumIdList[_0x264e1a];
							await takePostRequest('mission1');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'uniteAddCart':
						for(let _0x26599e=0;_0x26599e<1;_0x26599e++){
							$.missionType='uniteAddCart';
							await takePostRequest('mission');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'viewOneMediaTek9200':
						for(let _0x241980=0;_0x241980<1;_0x241980++){
							$.missionType='viewOneMediaTek9200';
							await takePostRequest('mission');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					case 'payTrade':
					default:
						await $.wait(1000);
				}
			}
		}
		await takePostRequest('activity_load');
		await $.wait(parseInt(Math.random()*2000+2000,10));
		let _0x1175d9=parseInt($.remainPoint/100);
		console.log('抽奖次数为：'+_0x1175d9+' 次');
		for(m=1;_0x1175d9--;m++){
			console.log('第'+m+'次抽奖');
			await takePostRequest('抽奖');
			if($.runFalag==false)break;
			if(Number(_0x1175d9)<=0)break;
			if(m>=10){
				console.log('抽奖太多次，多余的次数请再执行脚本');
				break;
			}
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		console.log('当前助力:'+$.inviteNick);
		if($.index==1){
			$.inviteNick=$.MixNick;
			console.log('后面的号都会助力:'+$.inviteNick);
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
	}catch(_0x45651b){
		console.log(_0x45651b);
	}
}
async function takePostRequest(_0x413abf){
	if($.outFlag)return;
	let _0x4f39e9='https://mpdz1-isv.isvjcloud.com';
	let _0x14913f='';
	let _0x10236f='POST';
	let _0x1ec98c='';
	switch(_0x413abf){
		case 'activity_load':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={'jdToken':$.Token,'inviteNick':$.inviteNick||''};
			if($.joinVenderId)_0x1ec98c={..._0x1ec98c,'shopId':''+$.joinVenderId};
			_0x14913f=taskPostUrl('/jdDimensityUnion/activity/load',_0x1ec98c);
			break;
		case'绑定':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/customer/inviteRelation?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={'missionType':'relationBind','inviterNick':$.inviteNick||''};
			_0x14913f=taskPostUrl('/jdDimensityUnion/customer/inviteRelation',_0x1ec98c);
			break;
		case 'completeState':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/mission/completeState?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={};
			_0x14913f=taskPostUrl('/jdDimensityUnion/mission/completeState',_0x1ec98c);
			break;
		case 'mission':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={'missionType':$.missionType};
			if($.joinVenderId)_0x1ec98c={..._0x1ec98c,'shopId':$.joinVenderId};
			_0x14913f=taskPostUrl('/jdDimensityUnion/mission/completeMission',_0x1ec98c);
			break;
		case 'kaika':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={'missionType':$.missionType,'grouping':9999};
			_0x14913f=taskPostUrl('/jdDimensityUnion/mission/completeMission',_0x1ec98c);
			break;
		case'抽奖':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/interactive/drawPost?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x1ec98c={'dataType':'draw'};
			_0x14913f=taskPostUrl('/jdDimensityUnion/interactive/drawPost',_0x1ec98c);
			break;
		case 'followShop':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={'actId':$.actId,'missionType':'uniteCollectShop'};
			_0x14913f=taskPostUrl('/jdDimensityUnion/mission/completeMission',_0x1ec98c);
			break;
		case 'mission1':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={'missionType':$.missionType,'goodsNumId':$.goodsNumId};
			_0x14913f=taskPostUrl('/jdDimensityUnion/mission/completeMission',_0x1ec98c);
			break;
		case 'inviteCheck':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/mission/completeMission?open_id=?mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={'actId':$.actId,'missionType':'inviteCheck'};
			_0x14913f=taskPostUrl('/jdDimensityUnion/mission/completeMission',_0x1ec98c);
			break;
		case 'completeState':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/mission/completeState?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x1ec98c={};
			_0x14913f=taskPostUrl('/jdDimensityUnion/mission/completeState',_0x1ec98c);
			break;
		case 'myAward':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/awards/list?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x1ec98c={'pageNo':1,'pageSize':9999};
			_0x14913f=taskPostUrl('/jdDimensityUnion/awards/list',_0x1ec98c);
			break;
		case 'missionInviteList':
			url=_0x4f39e9+'/dm/front/jdDimensityUnion/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x1ec98c={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick||''};
			_0x14913f=taskPostUrl('/jdDimensityUnion/customer/inviteList',_0x1ec98c);
			break;
		default:
			console.log('错误'+_0x413abf);
	}
	let _0x607f4d=getPostRequest(url,_0x14913f,_0x10236f);
	return new Promise(async _0x10ba95=>{
		$.post(_0x607f4d,(_0x4a1a18,_0x248933,_0x514222)=>{
			try{
				if(_0x4a1a18){
					if(_0x248933&&_0x248933.statusCode&&_0x248933.statusCode==493){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					console.log(''+$.toStr(_0x4a1a18,_0x4a1a18));
					console.log(_0x413abf+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x413abf,_0x514222);
				}
			}catch(_0x459cd6){
				console.log(_0x459cd6,_0x248933);
			}finally{
				_0x10ba95();
			}
		});
	});
}
async function dealReturn(_0x37a098,_0x2a4da7){
	let _0x36b6cb='';
	try{
		if(_0x37a098!='accessLogWithAD'||_0x37a098!='drawContent'){
			if(_0x2a4da7){
				_0x36b6cb=JSON.parse(_0x2a4da7);
			}
		}
	}catch(_0x590e3f){
		console.log(_0x37a098+' 执行任务异常');
		console.log(_0x2a4da7);
		$.runFalag=false;
	}
	try{
		let _0x21f83c='';
		switch(_0x37a098){
			case 'completeState':
				if(typeof _0x36b6cb=='object'){
					if(_0x36b6cb.success&&_0x36b6cb.success===true&&_0x36b6cb.data){
						if(_0x36b6cb.data['status']&&_0x36b6cb.data['status']==200){
							$.renwulists=_0x36b6cb.data['data']||[];
						}
					}else if(_0x36b6cb.message){
						console.log(''+(_0x36b6cb.message||''));
					}else{
						console.log(_0x2a4da7);
					}
				}else{
					console.log(_0x2a4da7);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			case'activity_load':
			case'mission':
			case 'shopList':
			case 'loadUniteOpenCard':
			case 'setMixNick':
			case 'uniteOpenCardOne':
			case 'checkOpenCard':
			case 'followShop':
			case 'addCart':
			case 'myAward':
			case 'missionInviteList':
			case 'kaika':
			case'绑定':
			case'助力':
			case 'mission1':
			case 'specialSign':
				_0x21f83c='';
				if(_0x37a098=='followShop')_0x21f83c='关注';
				if(_0x37a098=='addCart')_0x21f83c='加购';
				if(typeof _0x36b6cb=='object'){
					if(_0x36b6cb.success&&_0x36b6cb.success===true&&_0x36b6cb.data){
						if(_0x36b6cb.data['status']&&_0x36b6cb.data['status']==200){
							_0x36b6cb=_0x36b6cb.data;
							if(_0x37a098!='setMixNick'&&(_0x36b6cb.msg||_0x36b6cb.data['isOpenCard']||_0x36b6cb.data['remark']))console.log(''+(_0x21f83c&&_0x21f83c+':'||'')+(_0x36b6cb.msg||_0x36b6cb.data['isOpenCard']||_0x36b6cb.data['remark']||''));
							if(_0x37a098=='activity_load'){
								if(_0x36b6cb.data){
									$.endTime=_0x36b6cb.data['cusActivity']['endTime']||0;
									$.MixNick=_0x36b6cb.data['missionCustomer']['buyerNick']||'';
									$.remainPoint=_0x36b6cb.data['missionCustomer']['remainPoint']||0;
									$.usedPoint=_0x36b6cb.data['missionCustomer']['usedPoint']||0;
									$.hasCollectShop=_0x36b6cb.data['missionCustomer']['hasCollectShop']||0;
									$.hasAddCart=_0x36b6cb.data['missionCustomer']['hasAddCart']||0;
								}
							}else if(_0x37a098=='shopList'){
								if(_0x36b6cb.data){
									$.openLists=_0x36b6cb.data;
								}
							}else if(_0x37a098=='mission'){
								if(_0x36b6cb.data['remark']['indexOf']('赶紧去开卡吧')>-1){
									$.open=true;
								}else{
									$.open=false;
								}
							}else if(_0x37a098=='uniteOpenCardOne'){
								$.uniteOpenCar=_0x36b6cb.msg||_0x36b6cb.data['msg']||'';
							}else if(_0x37a098=='myAward'){
								console.log('我的奖品：');
								let _0x3f83b4=0;
								let _0x31cf5e=0;
								for(let _0xbac976 in _0x36b6cb.data['list']||[]){
									let _0x5d94e6=_0x36b6cb.data['list'][_0xbac976];
									_0x31cf5e+=Number(_0x5d94e6.awardDes);
								}
								if(_0x31cf5e>0)console.log('共获得'+_0x31cf5e+'京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n');
							}else if(_0x37a098=='missionInviteList'){
								console.log('邀请人数('+_0x36b6cb.data['total']+')');
							}
						}else if(_0x36b6cb.data['msg']){
							if(_0x36b6cb.errorMessage['indexOf']('活动未开始')>-1){
								$.activityEnd=true;
							}
							console.log(''+(_0x36b6cb.data['msg']||''));
						}else if(_0x36b6cb.errorMessage){
							if(_0x36b6cb.errorMessage['indexOf']('火爆')>-1){}
							console.log(''+(_0x36b6cb.errorMessage||''));
						}else{
							console.log(''+_0x2a4da7);
						}
					}else if(_0x36b6cb.errorMessage){
						console.log(''+(_0x36b6cb.errorMessage||''));
					}else{
						console.log(''+_0x2a4da7);
					}
				}else{
					console.log(''+_0x2a4da7);
				}
				break;
			default:
				console.log((_0x21f83c||_0x37a098)+'-> '+_0x2a4da7);
		}
		if(typeof _0x36b6cb=='object'){
			if(_0x36b6cb.errorMessage){
				if(_0x36b6cb.errorMessage['indexOf']('火爆')>-1){}
			}
		}
	}catch(_0x434a35){
		console.log(_0x434a35);
	}
}
function getPostRequest(_0xa528cd,_0x25f15b,_0x550513='POST'){
	let _0x4cb935={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0xa528cd.indexOf('https://mpdz1-isv.isvjcloud.com')>-1){
		_0x4cb935.Origin='https://mpdz1-isv.isvjcloud.com';
		_0x4cb935['Content-Type']='application/json; charset=utf-8';
		delete _0x4cb935.Cookie;
	}
	return{'url':_0xa528cd,'method':_0x550513,'headers':_0x4cb935,'body':_0x25f15b,'timeout':60000};
}
function taskPostUrl(_0x2366b5,_0x4503c4){
	const _0xf8a085={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':'a6b11167cb823d19f793bb979448dfac','timestamp':Date.now(),'userId':$.userId},'admJson':{'actId':$.actId,'userId':$.userId,..._0x4503c4,'method':_0x2366b5,'buyerNick':$.MixNick||''}}};
	if(_0x2366b5.indexOf('missionInviteList')>-1){
		delete _0xf8a085.params['admJson']['actId'];
	}
	return $.toStr(_0xf8a085,_0xf8a085);
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x424560){
	_0x424560=_0x424560||32;
	let _0x55b3f4='abcdef0123456789',_0x14c87d=_0x55b3f4.length,_0x16f011='';
	for(i=0;i<_0x424560;i++)_0x16f011+=_0x55b3f4.charAt(Math.floor(Math.random()*_0x14c87d));
	return _0x16f011;
}
function jsonParse(_0x2ba63f){
	if(typeof _0x2ba63f=='string'){
		try{
			return JSON.parse(_0x2ba63f);
		}catch(_0x4b1190){
			console.log(_0x4b1190);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function getToken(){
	await getSign('isvObfuscator',{'id':'','url':'https://mpdz1-isv.isvjcloud.com'});
	let _0x30191f={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':''+$.Signz};
	return new Promise(_0x3c1b43=>{
		$.post(_0x30191f,(_0x5b37f0,_0x2a0e43,_0x22ee02)=>{
			try{
				if(_0x5b37f0){
					$.log(_0x5b37f0);
				}else{
					if(_0x22ee02){
						_0x22ee02=JSON.parse(_0x22ee02);
						if(_0x22ee02.code==='0'){
							$.Token=_0x22ee02.token;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x4d3961){
				$.log(_0x4d3961);
			}finally{
				_0x3c1b43();
			}
		});
	});
}
function getSign(_0x3823cf,_0x3f23a1){
	let _0x57652f={'fn':_0x3823cf,'body':JSON.stringify(_0x3f23a1)};
	let _0x166496={'url':JD_SIGN_API,'body':JSON.stringify(_0x57652f),'headers':{'Content-Type':'application/json'},'timeout':30000};
	return new Promise(async _0x38b9a9=>{
		$.post(_0x166496,(_0x36bb00,_0x3a4980,_0x57652f)=>{
			try{
				if(_0x36bb00){
					console.log(''+JSON.stringify(_0x36bb00));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{
					_0x57652f=JSON.parse(_0x57652f);
					if(typeof _0x57652f==='object'&&_0x57652f&&_0x57652f.body){
						$.Signz=_0x57652f.body||'';
					}else{
						console.log('获取服务失败~~');
					}
				}
			}catch(_0x4420db){
				$.logErr(_0x4420db,_0x3a4980);
			}finally{
				_0x38b9a9(_0x57652f);
			}
		});
	});
};
function getShopOpenCardInfo(_0x1a6205){
	let _0x2464e9={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+encodeURIComponent(JSON.stringify(_0x1a6205))+'&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241','headers':{'Host':'api.m.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':$.UA,'Referer':'https://shopmember.m.jd.com/shopcard/?venderId='+$.joinVenderId+'&channel=801&returnUrl=','Accept-Encoding':'gzip, deflate, br'}};
	return new Promise(_0x1db5b5=>{
		$.get(_0x2464e9,(_0x221dc5,_0x36908f,_0x4a64ba)=>{
			try{
				if(_0x221dc5){
					if(_0x221dc5==='Response code 403 (Forbidden)'){
						$.err=true;
						console.log(_0x221dc5);
					}
				}else{
					res=JSON.parse(_0x4a64ba);
					if(res.success){
						$.openCardStatus=res.result['userInfo']['openCardStatus'];
						if(res.result['interestsRuleList']){
							$.openCardActivityId=res.result['interestsRuleList'][0]['interestsInfo']['activityId'];
						}
					}
				}
			}catch(_0x51d5a2){
				console.log(_0x51d5a2);
			}finally{
				_0x1db5b5();
			}
		});
	});
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x1f3a8a=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x34dc6e='';
		if($.shopactivityId)_0x34dc6e=',"activityId":'+$.shopactivityId;
		const _0x512cdd='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x34dc6e+',"channel":406}';
		const _0x48b539={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x512cdd)};
		const _0x4a4baf=await getH5st('8adfb',_0x48b539);
		const _0x4721ae={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x512cdd+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x4a4baf),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x4721ae,async(_0x237c08,_0x18d640,_0xb199b4)=>{
			try{
				_0xb199b4=_0xb199b4&&_0xb199b4.match(/jsonp_.*?\((.*?)\);/)&&_0xb199b4.match(/jsonp_.*?\((.*?)\);/)[1]||_0xb199b4;
				let _0x320c6e=$.toObj(_0xb199b4,_0xb199b4);
				if(_0x320c6e&&typeof _0x320c6e=='object'){
					if(_0x320c6e&&_0x320c6e.success===true){
						console.log(' >> '+_0x320c6e.message);
						$.errorJoinShop=_0x320c6e.message;
						if(_0x320c6e.result&&_0x320c6e.result['giftInfo']){
							for(let _0x2a763f of _0x320c6e.result['giftInfo']['giftList']){
								console.log(' >> 入会获得：'+_0x2a763f.discountString+_0x2a763f.prizeName+_0x2a763f.secondLineDesc);
							}
						}
					}else if(_0x320c6e&&typeof _0x320c6e=='object'&&_0x320c6e.message){
						$.errorJoinShop=_0x320c6e.message;
						console.log(''+(_0x320c6e.message||''));
					}else{
						console.log(_0xb199b4);
					}
				}else{
					console.log(_0xb199b4);
				}
			}catch(_0x50e3e0){
				$.logErr(_0x50e3e0,_0x18d640);
			}finally{
				_0x1f3a8a();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x1b7fa1=>{
		const _0x1e9adc='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x10453d={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x1e9adc)};
		const _0x595724=await getH5st('8adfb',_0x10453d);
		const _0x13b49a={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x1e9adc+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x595724),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x13b49a,async(_0x52e2d8,_0x55d96,_0x2579cc)=>{
			try{
				_0x2579cc=_0x2579cc&&_0x2579cc.match(/jsonp_.*?\((.*?)\);/)&&_0x2579cc.match(/jsonp_.*?\((.*?)\);/)[1]||_0x2579cc;
				let _0x477700=$.toObj(_0x2579cc,_0x2579cc);
				if(_0x477700&&typeof _0x477700=='object'){
					if(_0x477700&&_0x477700.success==true){
						console.log('去加入：'+(_0x477700.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x477700.result['interestsRuleList']&&_0x477700.result['interestsRuleList'][0]&&_0x477700.result['interestsRuleList'][0]['interestsInfo']&&_0x477700.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x2579cc);
				}
			}catch(_0x246ed2){
				$.logErr(_0x246ed2,_0x55d96);
			}finally{
				_0x1b7fa1();
			}
		});
	});
}
function getH5st(_0x223180,_0x45d237){
	return new Promise(async _0x42c137=>{
		let _0x299901={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x223180+'&req='+encodeURIComponent(JSON.stringify(_0x45d237)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x299901,(_0x3f2953,_0x4ecf9b,_0x379d2f)=>{
			try{
				if(_0x3f2953){
					console.log(JSON.stringify(_0x3f2953));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x27f6dd){
				$.logErr(_0x27f6dd,_0x4ecf9b);
			}finally{
				_0x42c137(_0x379d2f);
			}
		});
	});
}
function getAuthorCodeList(_0x4d60fd){
	return new Promise(_0x541f84=>{
		const _0x1b2299={'url':_0x4d60fd+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x1b2299,async(_0x5bbdf4,_0x16e154,_0x374ab2)=>{
			try{
				if(_0x5bbdf4){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x374ab2)_0x374ab2=JSON.parse(_0x374ab2);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x2d27ab){
				$.logErr(_0x2d27ab,_0x16e154);
				_0x374ab2=null;
			}finally{
				_0x541f84(_0x374ab2);
			}
		});
	});
}
function random(_0x4027fe,_0x352eb6){
	return Math.floor(Math.random()*(_0x352eb6-_0x4027fe))+_0x4027fe;
};
