/*
11.2-11.10 京东健康一键开卡
新增开卡脚本，一次性脚本

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

cron:29 2,17 2-10 11 *
============Quantumultx===============
[task_local]
#11.2-11.10 京东健康一键开卡
29 2,17 2-10 11 * jd_opencardL271.js, tag=11.2-11.10 京东健康一键开卡, enabled=true
*/
const Env=require('./utils/Env.js');
let opencard_toShop="false"
const $=new Env("11.2-11.10 京东健康一键开卡");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x514a15=>{
		cookiesArr.push(jdCookieNode[_0x514a15]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x24cd3c=>_0x24cd3c.cookie)].filter(_0x30ef11=>!!_0x30ef11);
}
let opencard_draw='0';
opencard_draw=$.isNode()?process.env.opencard_draw?process.env.opencard_draw:opencard_draw:$.getdata('opencard_draw')?$.getdata('opencard_draw'):opencard_draw;
opencard_toShop=$.isNode()?process.env.opencard_toShop?process.env.opencard_toShop:''+opencard_toShop:$.getdata('opencard_toShop')?$.getdata('opencard_toShop'):''+opencard_toShop;
const JD_SIGN_API=process.env.JD_SIGN_API||'https://api.nolanstore.top/sign';
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
    //"oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F",
	authorCodeList=["1OhjOdTjxF64SfQYkXBk/MjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD",
    "yy1jlea9hNVEnGox2qJonjmRXeM4zcE95esOsf1MiVnFQl9Wnt18BShqEqPui5gh"]
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='21699045';
	$.userId='10299171';
	$.actId='TongrentangChineseMedicine';
	$.MixNicks='';
	$.inviteNick=$.authorCode;
	for(let _0x5c8194=0;_0x5c8194<cookiesArr.length;_0x5c8194++){
		cookie=cookiesArr[_0x5c8194];
		originCookie=cookiesArr[_0x5c8194];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x5c8194+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x1b9a2='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x1b9a2);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x1b9a2);
	}
})().catch(_0x1ac717=>$.logErr(_0x1ac717)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let _0x10243b=false;
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
		await $.wait(parseInt(Math.random()*2000+1000,10));
		await takePostRequest('绑定');
		await $.wait(parseInt(Math.random()*2000+2000,10));
		await takePostRequest('shopList');
		for(o of $.openLists){
			$.missionType='openCard';
			if(o.open!=true&&o.openCardUrl){
				if($.activityEnd)return;
				$.open=false;
				$.joinVenderId=o.userId;
				await takePostRequest('mission');
				await $.wait(parseInt(Math.random()*2000+2000,10));
				if($.open==false){
					$.errorJoinShop='';
					await joinShop();
					if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
						console.log('第1次 重新开卡');
						await $.wait(1000);
						await joinShop();
					}
					if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
						console.log('第2次 重新开卡');
						await $.wait(1000);
						await joinShop();
					}
					if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
						console.log('第3次 重新开卡');
						await $.wait(1000);
						await joinShop();
					}
					if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
						console.log('第4次 重新开卡');
						await $.wait(1000);
						await joinShop();
					}
					await takePostRequest('mission');
					await takePostRequest('shopList');
					await takePostRequest('activity_load');
					await $.wait(parseInt(Math.random()*2000+3000,10));
				}
			}
		}
		if($.hasCollectShop===0){
			$.missionType='uniteCollectShop';
			await takePostRequest('mission');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}else{
			console.log('已经关注');
		}
		await $.wait(parseInt(Math.random()*2000+1000,10));
		await takePostRequest('activity_load');
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x1c9d0e=parseInt($.usedChance,10);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x1c9d0e>opencard_draw)_0x1c9d0e=opencard_draw;
			console.log('抽奖次数为:'+_0x1c9d0e);
			for(m=1;_0x1c9d0e--;m++){
				console.log('第'+m+'次抽奖');
				await takePostRequest('抽奖');
				if($.runFalag==false)break;
				if(Number(_0x1c9d0e)<=0)break;
				if(m>=10){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}else console.log('如需抽奖请设置环境变量[opencard_draw]为"3" 3为次数');
		console.log('当前助力:'+$.inviteNick);
		if($.index==1){
			$.inviteNick=$.MixNick;
			console.log('后面的号都会助力:'+$.inviteNick);
		}
        //console.log('邀请码:'+$.MixNick);
		await $.wait(parseInt(Math.random()*1000+2000,10));
	}catch(_0x5a332d){
		console.log(_0x5a332d);
	}
}
async function takePostRequest(_0x501427){
	if($.outFlag)return;
	let _0x13061d='https://mpdz13-dz.isvjcloud.com';
	let _0x5de5d8='';
	let _0x342c64='POST';
	let _0x2a7042='';
	switch(_0x501427){
		case 'activity_load':
			url=_0x13061d+'/dm/front/jdTongrentangOpen/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x2a7042={'jdToken':$.Token,'inviteNick':$.inviteNick||''};
			if($.joinVenderId)_0x2a7042={..._0x2a7042,'shopId':''+$.joinVenderId};
			_0x5de5d8=taskPostUrl('/jdTongrentangOpen/activity/load',_0x2a7042);
			break;
		case 'shopList':
			url=_0x13061d+'/dm/front/jdTongrentangOpen/shop/shopList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x2a7042={};
			_0x5de5d8=taskPostUrl('/jdTongrentangOpen/shop/shopList',_0x2a7042);
			break;
		case'绑定':
			url=_0x13061d+'/dm/front/jdTongrentangOpen/customer/inviteRelation?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x2a7042={'missionType':'relationBind','inviterNick':$.inviteNick||''};
			_0x5de5d8=taskPostUrl('/jdTongrentangOpen/customer/inviteRelation',_0x2a7042);
			break;
		case'助力':
			url=_0x13061d+'/dm/front/jdTongrentangOpen/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x2a7042={'inviteListRequest':{'actId':'unionLover20220804','missionType':'shareAct','buyerNick':$.MixNick||'','inviteType':0},'inviterNick':$.inviteNick||''};
			_0x5de5d8=taskPostUrl('/jdTongrentangOpen/customer/inviteList',_0x2a7042);
			break;
		case 'mission':
			url=_0x13061d+'/dm/front/jdTongrentangOpen/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x2a7042={'missionType':$.missionType};
			if($.joinVenderId)_0x2a7042={..._0x2a7042,'shopId':$.joinVenderId};
			_0x5de5d8=taskPostUrl('/jdTongrentangOpen/mission/completeMission',_0x2a7042);
			break;
		case'抽奖':
			url=_0x13061d+'/dm/front/jdTongrentangOpen/interactive/drawPost?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2a7042={'dataType':'draw'};
			_0x5de5d8=taskPostUrl('/jdTongrentangOpen/interactive/drawPost',_0x2a7042);
			break;
		case'followShop':
			url=_0x13061d+'/dm/front/jdTongrentangOpen/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x2a7042={'actId':$.actId,'missionType':'uniteCollectShop'};
			_0x5de5d8=taskPostUrl('/jdTongrentangOpen/mission/completeMission',_0x2a7042);
			break;
		case 'inviteCheck':
			url=_0x13061d+'/dm/front/jdTongrentangOpen/mission/completeMission?open_id=?mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x2a7042={'actId':$.actId,'missionType':'inviteCheck'};
			_0x5de5d8=taskPostUrl('/jdTongrentangOpen/mission/completeMission',_0x2a7042);
			break;
		case 'myAward':
			url=_0x13061d+'/dm/front/jdRiceNoodleFestival/awards/list?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2a7042={'pageNo':1,'pageSize':9999};
			_0x5de5d8=taskPostUrl('/jdRiceNoodleFestival/awards/list',_0x2a7042);
			break;
		case 'missionInviteList':
			url=_0x13061d+'/dm/front/jdRiceNoodleFestival/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2a7042={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick||''};
			_0x5de5d8=taskPostUrl('/jdRiceNoodleFestival/customer/inviteList',_0x2a7042);
			break;
		default:
			console.log('错误'+_0x501427);
	}
	let _0x267928=getPostRequest(url,_0x5de5d8,_0x342c64);
	return new Promise(async _0x499b7c=>{
		$.post(_0x267928,(_0x3d0f09,_0x217ae7,_0x40c82d)=>{
			try{
				if(_0x3d0f09){
					if(_0x217ae7&&_0x217ae7.statusCode&&_0x217ae7.statusCode==493){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					console.log(''+$.toStr(_0x3d0f09,_0x3d0f09));
					console.log(_0x501427+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x501427,_0x40c82d);
				}
			}catch(_0x4add47){
				console.log(_0x4add47,_0x217ae7);
			}finally{
				_0x499b7c();
			}
		});
	});
}
async function dealReturn(_0x3d7dfb,_0x4ba48a){
	let _0x504e08='';
	try{
		if(_0x3d7dfb!='accessLogWithAD'||_0x3d7dfb!='drawContent'){
			if(_0x4ba48a){
				_0x504e08=JSON.parse(_0x4ba48a);
			}
		}
	}catch(_0x1b0bef){
		console.log(_0x3d7dfb+' 执行任务异常');
		console.log(_0x4ba48a);
		$.runFalag=false;
	}
	try{
		let _0x28e1d7='';
		switch(_0x3d7dfb){
			case 'isvObfuscator':
				if(typeof _0x504e08=='object'){
					if(_0x504e08.errcode==0){
						if(typeof _0x504e08.token!='undefined')$.Token=_0x504e08.token;
					}else if(_0x504e08.message){
						console.log(_0x3d7dfb+' '+(_0x504e08.message||''));
					}else{
						console.log(_0x4ba48a);
					}
				}else{
					console.log(_0x4ba48a);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			case 'activity_load':
			case 'mission':
			case'shopList':
			case 'loadUniteOpenCard':
			case'setMixNick':
			case 'uniteOpenCardOne':
			case 'checkOpenCard':
			case 'followShop':
			case 'addCart':
			case 'myAward':
			case 'missionInviteList':
			case'抽奖':
			case 'kaika':
			case 'kaika1':
			case'绑定':
			case'助力':
			case'bulletChat':
			case 'specialSign':
				_0x28e1d7='';
				if(_0x3d7dfb=='followShop')_0x28e1d7='关注';
				if(_0x3d7dfb=='addCart')_0x28e1d7='加购';
				if(typeof _0x504e08=='object'){
					if(_0x504e08.success&&_0x504e08.success===true&&_0x504e08.data){
						if(_0x504e08.data.status&&_0x504e08.data.status==200){
							_0x504e08=_0x504e08.data;
							if(_0x3d7dfb!='setMixNick'&&(_0x504e08.msg||_0x504e08.data.isOpenCard||_0x504e08.data.remark))console.log(''+(_0x28e1d7&&_0x28e1d7+':'||'')+(_0x504e08.msg||_0x504e08.data.isOpenCard||_0x504e08.data.remark||''));
							if(_0x3d7dfb=='activity_load'){
								if(_0x504e08.data){
									$.endTime=_0x504e08.data.cusActivity.endTime||0;
									$.MixNick=_0x504e08.data.missionCustomer.buyerNick||'';
									$.remainPoint=_0x504e08.data.missionCustomer.remainPoint||0;
									$.usedPoint=_0x504e08.data.missionCustomer.usedPoint||0;
									$.hasCollectShop=_0x504e08.data.missionCustomer.hasCollectShop||0;
									$.hasAddCart=_0x504e08.data.missionCustomer.hasAddCart||0;
								}
							}else if(_0x3d7dfb=='shopList'){
								if(_0x504e08.data){
									$.openLists=_0x504e08.data;
								}
							}else if(_0x3d7dfb=='mission'){
								if(_0x504e08.data.remark.indexOf('赶紧去开卡吧')>-1){
									$.open=true;
								}else{
									$.open=false;
								}
							}else if(_0x3d7dfb=='uniteOpenCardOne'){
								$.uniteOpenCar=_0x504e08.msg||_0x504e08.data.msg||'';
							}else if(_0x3d7dfb=='myAward'){
								console.log('我的奖品：');
								let _0x2ff39a=0;
								let _0x40ff3c=0;
								for(let _0x5e8079 in _0x504e08.data.list||[]){
									let _0x3cccc3=_0x504e08.data.list[_0x5e8079];
									_0x40ff3c+=Number(_0x3cccc3.awardDes);
								}
								if(_0x40ff3c>0)console.log('共获得'+_0x40ff3c+'京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n');
							}else if(_0x3d7dfb=='missionInviteList'){
								console.log('邀请人数('+_0x504e08.data.total+')');
							}
						}else if(_0x504e08.data.msg){
							if(_0x504e08.errorMessage.indexOf('活动未开始')>-1){
								$.activityEnd=true;
							}
							console.log(''+(_0x504e08.data.msg||''));
						}else if(_0x504e08.errorMessage){
							if(_0x504e08.errorMessage.indexOf('火爆')>-1){}
							console.log(''+(_0x504e08.errorMessage||''));
						}else{
							console.log(''+_0x4ba48a);
						}
					}else if(_0x504e08.errorMessage){
						console.log(''+(_0x504e08.errorMessage||''));
					}else{
						console.log(''+_0x4ba48a);
					}
				}else{
					console.log(''+_0x4ba48a);
				}
				break;
			default:
				console.log((_0x28e1d7||_0x3d7dfb)+'-> '+_0x4ba48a);
		}
		if(typeof _0x504e08=='object'){
			if(_0x504e08.errorMessage){
				if(_0x504e08.errorMessage.indexOf('火爆')>-1){}
			}
		}
	}catch(_0x432fa7){
		console.log(_0x432fa7);
	}
}
function getPostRequest(_0x5e6e75,_0x48049c,_0x227216='POST'){
	let _0x24dcbc={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x5e6e75.indexOf('https://mpdz13-dz.isvjcloud.com')>-1){
		_0x24dcbc.Origin='https://mpdz13-dz.isvjcloud.com';
		_0x24dcbc['Content-Type']='application/json; charset=utf-8';
		delete _0x24dcbc.Cookie;
	}
	return{'url':_0x5e6e75,'method':_0x227216,'headers':_0x24dcbc,'body':_0x48049c,'timeout':60000};
}
async function getToken(){
	await getSign('isvObfuscator',{'id':'','url':'https://mpdz13-dz.isvjcloud.com'});
	let _0x2ec40e={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':''+$.Signz};
	return new Promise(_0x4ff279=>{
		$.post(_0x2ec40e,(_0x2ebf7d,_0x3ac2b4,_0x2f8ef6)=>{
			try{
				if(_0x2ebf7d){
					$.log(_0x2ebf7d);
				}else{
					if(_0x2f8ef6){
						_0x2f8ef6=JSON.parse(_0x2f8ef6);
						if(_0x2f8ef6.code==='0'){
							$.Token=_0x2f8ef6.token;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x49c142){
				$.log(_0x49c142);
			}finally{
				_0x4ff279();
			}
		});
	});
}
function getSign(_0x10ed12,_0x388e8e){
	let _0x19e0b3={'fn':_0x10ed12,'body':JSON.stringify(_0x388e8e)};
	let _0x245ac0={'url':JD_SIGN_API,'body':JSON.stringify(_0x19e0b3),'headers':{'Content-Type':'application/json'},'timeout':30000};
	return new Promise(async _0x2ccd19=>{
		$.post(_0x245ac0,(_0x390e17,_0x3f41d7,_0x19e0b3)=>{
			try{
				if(_0x390e17){
					console.log(''+JSON.stringify(_0x390e17));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{
					_0x19e0b3=JSON.parse(_0x19e0b3);
					if(typeof _0x19e0b3==='object'&&_0x19e0b3&&_0x19e0b3.body){
						$.Signz=_0x19e0b3.body||'';
					}else{
						console.log('获取服务失败~~');
					}
				}
			}catch(_0x3fbd4c){
				$.logErr(_0x3fbd4c,_0x3f41d7);
			}finally{
				_0x2ccd19(_0x19e0b3);
			}
		});
	});
};
function taskPostUrl(_0xcdab9e,_0x5bc767){
	const _0x416722={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':'a6b11167cb823d19f793bb979448dfac','timestamp':Date.now(),'userId':$.userId},'admJson':{'actId':$.actId,'userId':$.userId,..._0x5bc767,'method':_0xcdab9e,'buyerNick':$.MixNick||''}}};
	if(_0xcdab9e.indexOf('missionInviteList')>-1){
		delete _0x416722.params.admJson.actId;
	}
	return $.toStr(_0x416722,_0x416722);
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x40a456){
	_0x40a456=_0x40a456||32;
	let _0x194006='abcdef0123456789',_0x5a08ef=_0x194006.length,_0x5aaeff='';
	for(i=0;i<_0x40a456;i++)_0x5aaeff+=_0x194006.charAt(Math.floor(Math.random()*_0x5a08ef));
	return _0x5aaeff;
}
function jsonParse(_0x3ea063){
	if(typeof _0x3ea063=='string'){
		try{
			return JSON.parse(_0x3ea063);
		}catch(_0x4b9d2f){
			console.log(_0x4b9d2f);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x2328d5=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x1ae3a8='';
		if($.shopactivityId)_0x1ae3a8=',"activityId":'+$.shopactivityId;
		const _0xfea0a='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x1ae3a8+',"channel":406}';
		const _0x733d29={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0xfea0a)};
		const _0x1a2e4b=await getH5st('8adfb',_0x733d29);
		const _0x978664={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0xfea0a+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1a2e4b),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x978664,async(_0x543749,_0x29c0b6,_0xf10582)=>{
			try{
				_0xf10582=_0xf10582&&_0xf10582.match(/jsonp_.*?\((.*?)\);/)&&_0xf10582.match(/jsonp_.*?\((.*?)\);/)[1]||_0xf10582;
				let _0x2463c2=$.toObj(_0xf10582,_0xf10582);
				if(_0x2463c2&&typeof _0x2463c2=='object'){
					if(_0x2463c2&&_0x2463c2.success===true){
						console.log(' >> '+_0x2463c2.message);
						$.errorJoinShop=_0x2463c2.message;
						if(_0x2463c2.result&&_0x2463c2.result.giftInfo){
							for(let _0x1564cb of _0x2463c2.result.giftInfo.giftList){
								console.log(' >> 入会获得：'+_0x1564cb.discountString+_0x1564cb.prizeName+_0x1564cb.secondLineDesc);
							}
						}
					}else if(_0x2463c2&&typeof _0x2463c2=='object'&&_0x2463c2.message){
						$.errorJoinShop=_0x2463c2.message;
						console.log(''+(_0x2463c2.message||''));
					}else{
						console.log(_0xf10582);
					}
				}else{
					console.log(_0xf10582);
				}
			}catch(_0x479824){
				$.logErr(_0x479824,_0x29c0b6);
			}finally{
				_0x2328d5();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x5f452a=>{
		const _0x59e204='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x44173d={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x59e204)};
		const _0x1e7c13=await getH5st('8adfb',_0x44173d);
		const _0x54c81f={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x59e204+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1e7c13),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x54c81f,async(_0x296fdf,_0x49238c,_0x35c124)=>{
			try{
				_0x35c124=_0x35c124&&_0x35c124.match(/jsonp_.*?\((.*?)\);/)&&_0x35c124.match(/jsonp_.*?\((.*?)\);/)[1]||_0x35c124;
				let _0x16012e=$.toObj(_0x35c124,_0x35c124);
				if(_0x16012e&&typeof _0x16012e=='object'){
					if(_0x16012e&&_0x16012e.success==true){
						console.log('去加入：'+(_0x16012e.result.shopMemberCardInfo.venderCardName||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x16012e.result.interestsRuleList&&_0x16012e.result.interestsRuleList[0]&&_0x16012e.result.interestsRuleList[0].interestsInfo&&_0x16012e.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x35c124);
				}
			}catch(_0xbae075){
				$.logErr(_0xbae075,_0x49238c);
			}finally{
				_0x5f452a();
			}
		});
	});
}
function getH5st(_0x39b08b,_0x4fd351){
	return new Promise(async _0x35910d=>{
		let _0x4ce1e9={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x39b08b+'&req='+encodeURIComponent(JSON.stringify(_0x4fd351)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x4ce1e9,(_0x281c42,_0x53ae98,_0x1fb1a7)=>{
			try{
				if(_0x281c42){
					console.log(JSON.stringify(_0x281c42));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0xb787ca){
				$.logErr(_0xb787ca,_0x53ae98);
			}finally{
				_0x35910d(_0x1fb1a7);
			}
		});
	});
}
function random(_0x3290e6,_0x14a0d5){
	return Math.floor(Math.random()*(_0x14a0d5-_0x3290e6))+_0x3290e6;
};