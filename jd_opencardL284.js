/*
12.28-1.15 年货大牌
新增开卡脚本，一次性脚本

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

cron:31 4,15 28-31,1-15 12,1 *
============Quantumultx===============
[task_local]
#12.28-1.15 年货大牌
31 4,15 28-31,1-15 12,1 * jd_opencardL284.js, tag=12.28-1.15 年货大牌, enabled=true
*/
let opencard_toShop="false";
const Env=require('./utils/Env');
const $=new Env("12.28-1.15 年货大牌");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://mpdz6-dz.isvjcloud.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0xce620d=>{
		cookiesArr.push(jdCookieNode[_0xce620d]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x3280b0=>_0x3280b0.cookie)]['filter'](_0x42a5dd=>!!_0x42a5dd);
}
opencard_toShop=$.isNode()?process.env['opencard_toShop']?process.env['opencard_toShop']:''+opencard_toShop:$.getdata('opencard_toShop')?$.getdata('opencard_toShop'):''+opencard_toShop;
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	authorCodeList=["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];//await getAuthorCodeList('http://code.kingran.ga/284.json');
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='21699045';
	$.userId='10299171';
	$.actId='jdNewYearsFestivalunion';
	$.MixNicks='';
	$.inviteNick=$.authorCode;
	for(let _0x36ae23=0;_0x36ae23<cookiesArr.length;_0x36ae23++){
		cookie=cookiesArr[_0x36ae23];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x36ae23+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x24fded='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x24fded);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x24fded);
	}
})()['catch'](_0x58a61b=>$.logErr(_0x58a61b))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let _0xb216a8=false;
		if($.activityEnd)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		$.Token=await getToken(cookie,domains);
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
		console.log($.MixNick);
		$.toBind=0;
		$.openLists=[];
		await takePostRequest('绑定');
		await $.wait(parseInt(Math.random()*1000+2000,10));
		await takePostRequest('shopList');
		for(o of $.openLists){
			$.missionType='openCard';
			if(o.open!=true&&o.openCardUrl){
				if($.activityEnd)return;
				$.open=false;
				$.joinVenderId=o.userId;
				await takePostRequest('kaika');
				await $.wait(parseInt(Math.random()*2000+1000,10));
				if($.open==false){
					$.errorJoinShop='';
					await joinShop();
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('第1次 重新开卡');
						await $.wait(1000);
						await joinShop();
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('💔 可能是开卡黑号,跳过运行');
						return;
					}
					await takePostRequest('kaika');
					await takePostRequest('shopList');
					await takePostRequest('activity_load');
					await $.wait(parseInt(Math.random()*2000+1000,10));
				}
			}
		}
		await $.wait(parseInt(Math.random()*1000+1000,10));
		await takePostRequest('completeState');
		for(let _0x3f5430=0;_0x3f5430<$.renwulists['length'];_0x3f5430++){
			$.missionType=$.renwulists[_0x3f5430]['type'];
			if(!$.renwulists[_0x3f5430]['isComplete']){
				switch($.missionType){
					case 'openCard':
					case 'carveUpJdBean':
					case'memberFirstPurchaseGift':
					case 'cumulativeConsumption':
					case 'shareAct':
						break;
					case 'uniteCollectShop':
						for(let _0x3538ed=0;_0x3538ed<1;_0x3538ed++){
							$.missionType='uniteCollectShop';
							await takePostRequest('mission');
							await $.wait(parseInt(Math.random()*1000+2000,10));
						}
						break;
					default:
						await $.wait(1000);
				}
			}
		}
		if($.index==1){
			$.inviteNick=$.MixNick;
			console.log('后面的号都会助力:'+$.inviteNick);
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
	}catch(_0x34a5f0){
		console.log(_0x34a5f0);
	}
}
async function takePostRequest(_0x3d051d){
	if($.outFlag)return;
	let _0x3890f4='https://mpdz6-dz.isvjcloud.com';
	let _0x5304fe='';
	let _0x180496='POST';
	let _0x4a8171='';
	switch(_0x3d051d){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x5304fe='body=%7B%22url%22%3A%22https%3A%5C/%5C/mpdz-dz.isvjcloud.com%5C/jdbeverage%5C/pages%5C/sign51%5C/sign51?bizExtString%3Dc2hhcmVOaWNrOjh0WFJQTEFobk8yaEU4V1VPUHByY2M3VHdKQ21OZThORnZocEkwWG1KRFVMVlUxMDglMkJVeGxIdzdxb1V1SEE0RiZoZWFkUGljVXJsOmh0dHAlM0ElMkYlMkZzdG9yYWdlLjM2MGJ1eWltZy5jb20lMkZpLmltYWdlVXBsb2FkJTJGNzc3NTY4NjU2ZTczNzQ2MTcyMzEzNjMwMzQzOTM4MzczODMxMzMzMTMxMzNfbWlkLmpwZyZuaWNrTmFtZTolRTYlOEMlOUElRTclODglQjElRTclOEYlOEElRTUlQUUlOUQlRTUlQUUlOUQ%3D%26sid%3D8476480e8271ba209c055afca63a924w%26un_area%3D4_50950_50957_0%22%2C%22id%22%3A%22%22%7D&build=167963&client=apple&clientVersion=10.3.6&d_brand=apple&d_model=iPhone8%2C2&ef=1&eid=eidI994b812123s1PRhmb/36RNW2uQJarJ271z0YZ%2Bv4APcrj75ymDe%2B0Z6%2BnTWSLykYTnpR8p/NwxporPY8JdbEwVIoH6%2BtJTHm/uL08tuO6g10hmNP&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJS0CseyCtK4%22%2C%22osVersion%22%3A%22CJGkEK%3D%3D%22%2C%22openudid%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22area%22%3A%22DP81CNu1CP81CNu1D18m%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1651115073%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=116&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=a872218a0b5b8bbf20718217f084b1ed&st=1651205710814&sv=120&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJGDvIUMS36N/l7mJ1NVzSiKCsJDs6WgecFid6ckXh2O65h6Up5mRVfM9FxyqSf7AnAUkkxZuCEelMJweKE0qmxKo6RbZPmvFcsO%2BBSivc5EiXDNGR2/Plyt5HCOw4YhV3l8R5RbDUOvqt4fdTRkK6bkQ28k%2B8Lf73/CiUHR%2ByZjLjlf/p50Zq9A%3D%3D';
			break;
		case 'activity_load':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={'jdToken':$.Token,'inviteNick':$.inviteNick||''};
			if($.joinVenderId)_0x4a8171={..._0x4a8171,'shopId':''+$.joinVenderId};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/activity/load',_0x4a8171);
			break;
		case 'shopList':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/shop/shopList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/shop/shopList',_0x4a8171);
			break;
		case'绑定':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/customer/inviteRelation?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={'missionType':'relationBind','inviterNick':$.inviteNick||''};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/customer/inviteRelation',_0x4a8171);
			break;
		case'助力':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={'inviteListRequest':{'actId':'unionLover20220804','missionType':'shareAct','buyerNick':$.MixNick||'','inviteType':0},'inviterNick':$.inviteNick||''};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/customer/inviteList',_0x4a8171);
			break;
		case 'mission':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={'missionType':$.missionType};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/mission/completeMission',_0x4a8171);
			break;
		case 'kaika':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={'missionType':$.missionType,'shopId':$.joinVenderId};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/mission/completeMission',_0x4a8171);
			break;
		case'抽奖':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/interactive/drawPost?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x4a8171={'usedGameNum':'2','dataType':'draw'};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/interactive/drawPost',_0x4a8171);
			break;
		case 'followShop':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={'actId':$.actId,'missionType':'uniteCollectShop'};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/mission/completeMission',_0x4a8171);
			break;
		case 'inviteCheck':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/mission/completeMission?open_id=?mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={'actId':$.actId,'missionType':'inviteCheck'};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/mission/completeMission',_0x4a8171);
			break;
		case 'completeState':
			url=_0x3890f4+'/dm/front/jdNewYearsFestival/mission/completeState?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			_0x4a8171={};
			_0x5304fe=taskPostUrl('/jdNewYearsFestival/mission/completeState',_0x4a8171);
			break;
		case 'myAward':
			url=_0x3890f4+'/dm/front/jdRiceNoodleFestival/awards/list?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x4a8171={'pageNo':1,'pageSize':9999};
			_0x5304fe=taskPostUrl('/jdRiceNoodleFestival/awards/list',_0x4a8171);
			break;
		case 'missionInviteList':
			url=_0x3890f4+'/dm/front/jdRiceNoodleFestival/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x4a8171={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick||''};
			_0x5304fe=taskPostUrl('/jdRiceNoodleFestival/customer/inviteList',_0x4a8171);
			break;
		default:
			console.log('错误'+_0x3d051d);
	}
	let _0x216600=getPostRequest(url,_0x5304fe,_0x180496);
	return new Promise(async _0xb9e2bc=>{
		$.post(_0x216600,(_0x5c42f8,_0x3016d2,_0x387cd1)=>{
			try{
				if(_0x5c42f8){
					if(_0x3016d2&&_0x3016d2.statusCode&&_0x3016d2.statusCode==493){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					console.log(''+$.toStr(_0x5c42f8,_0x5c42f8));
					console.log(_0x3d051d+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x3d051d,_0x387cd1);
				}
			}catch(_0xaf9dea){
				console.log(_0xaf9dea,_0x3016d2);
			}finally{
				_0xb9e2bc();
			}
		});
	});
}
async function dealReturn(_0x24457f,_0x4a8fea){
	let _0x191960='';
	try{
		if(_0x24457f!='accessLogWithAD'||_0x24457f!='drawContent'){
			if(_0x4a8fea){
				_0x191960=JSON.parse(_0x4a8fea);
			}
		}
	}catch(_0x461c85){
		console.log(_0x24457f+' 执行任务异常');
		console.log(_0x4a8fea);
		$.runFalag=false;
	}
	try{
		let _0x349673='';
		switch(_0x24457f){
			case 'completeState':
				if(typeof _0x191960=='object'){
					if(_0x191960.success&&_0x191960.success===true&&_0x191960.data){
						if(_0x191960.data['status']&&_0x191960.data['status']==200){
							$.renwulists=_0x191960.data['data']||[];
						}
					}else if(_0x191960.message){
						console.log(''+(_0x191960.message||''));
					}else{
						console.log(_0x4a8fea);
					}
				}else{
					console.log(_0x4a8fea);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			case 'activity_load':
			case 'mission':
			case 'shopList':
			case 'loadUniteOpenCard':
			case 'setMixNick':
			case 'uniteOpenCardOne':
			case 'checkOpenCard':
			case 'followShop':
			case 'addCart':
			case'myAward':
			case'missionInviteList':
			case'抽奖':
			case 'kaika':
			case'绑定':
			case'助力':
			case 'bulletChat':
			case 'specialSign':
				_0x349673='';
				if(_0x24457f=='followShop')_0x349673='关注';
				if(_0x24457f=='addCart')_0x349673='加购';
				if(typeof _0x191960=='object'){
					if(_0x191960.success&&_0x191960.success===true&&_0x191960.data){
						if(_0x191960.data['status']&&_0x191960.data['status']==200){
							_0x191960=_0x191960.data;
							if(_0x24457f!='setMixNick'&&(_0x191960.msg||_0x191960.data['isOpenCard']||_0x191960.data['remark']))console.log(''+(_0x349673&&_0x349673+':'||'')+(_0x191960.msg||_0x191960.data['isOpenCard']||_0x191960.data['remark']||''));
							if(_0x24457f=='activity_load'){
								if(_0x191960.data){
									$.endTime=_0x191960.data['cusActivity']['endTime']||0;
									$.MixNick=_0x191960.data['missionCustomer']['buyerNick']||'';
									$.remainPoint=_0x191960.data['missionCustomer']['remainPoint']||0;
									$.usedPoint=_0x191960.data['missionCustomer']['usedPoint']||0;
									$.hasCollectShop=_0x191960.data['missionCustomer']['hasCollectShop']||0;
									$.hasAddCart=_0x191960.data['missionCustomer']['hasAddCart']||0;
								}
							}else if(_0x24457f=='shopList'){
								if(_0x191960.data){
									$.openLists=_0x191960.data;
								}
							}else if(_0x24457f=='mission'){
								if(_0x191960.data['remark']['indexOf']('赶紧去开卡吧')>-1){
									$.open=true;
								}else{
									$.open=false;
								}
							}else if(_0x24457f=='uniteOpenCardOne'){
								$.uniteOpenCar=_0x191960.msg||_0x191960.data['msg']||'';
							}else if(_0x24457f=='myAward'){
								console.log('我的奖品：');
								let _0x2ba85f=0;
								let _0x1dc052=0;
								for(let _0x384b05 in _0x191960.data['list']||[]){
									let _0x4521b3=_0x191960.data['list'][_0x384b05];
									_0x1dc052+=Number(_0x4521b3.awardDes);
								}
								if(_0x1dc052>0)console.log('共获得'+_0x1dc052+'京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n');
							}else if(_0x24457f=='missionInviteList'){
								console.log('邀请人数('+_0x191960.data['total']+')');
							}
						}else if(_0x191960.data['msg']){
							if(_0x191960.errorMessage['indexOf']('活动未开始')>-1){
								$.activityEnd=true;
							}
							console.log(''+(_0x191960.data['msg']||''));
						}else if(_0x191960.errorMessage){
							if(_0x191960.errorMessage['indexOf']('火爆')>-1){}
							console.log(''+(_0x191960.errorMessage||''));
						}else{
							console.log(''+_0x4a8fea);
						}
					}else if(_0x191960.errorMessage){
						console.log(''+(_0x191960.errorMessage||''));
					}else{
						console.log(''+_0x4a8fea);
					}
				}else{
					console.log(''+_0x4a8fea);
				}
				break;
			default:
				console.log((_0x349673||_0x24457f)+'-> '+_0x4a8fea);
		}
		if(typeof _0x191960=='object'){
			if(_0x191960.errorMessage){
				if(_0x191960.errorMessage['indexOf']('火爆')>-1){}
			}
		}
	}catch(_0x245b42){
		console.log(_0x245b42);
	}
}
function getPostRequest(_0x233432,_0x445596,_0x55ee30='POST'){
	let _0x59517e={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x233432.indexOf('https://mpdz6-dz.isvjcloud.com')>-1){
		_0x59517e.Origin='https://mpdz6-dz.isvjcloud.com';
		_0x59517e['Content-Type']='application/json; charset=utf-8';
		delete _0x59517e.Cookie;
	}
	return{'url':_0x233432,'method':_0x55ee30,'headers':_0x59517e,'body':_0x445596,'timeout':60000};
}
function taskPostUrl(_0x3f4c69,_0x14c35e){
	const _0x2eb808={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':'a6b11167cb823d19f793bb979448dfac','timestamp':Date.now(),'userId':$.userId},'admJson':{'actId':$.actId,'userId':$.userId,..._0x14c35e,'method':_0x3f4c69,'buyerNick':$.MixNick||''}}};
	if(_0x3f4c69.indexOf('missionInviteList')>-1){
		delete _0x2eb808.params['admJson']['actId'];
	}
	return $.toStr(_0x2eb808,_0x2eb808);
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x2b73de){
	_0x2b73de=_0x2b73de||32;
	let _0x3b3c5a='abcdef0123456789',_0x40fe5a=_0x3b3c5a.length,_0x1f2dc4='';
	for(i=0;i<_0x2b73de;i++)_0x1f2dc4+=_0x3b3c5a.charAt(Math.floor(Math.random()*_0x40fe5a));
	return _0x1f2dc4;
}
function jsonParse(_0x524075){
	if(typeof _0x524075=='string'){
		try{
			return JSON.parse(_0x524075);
		}catch(_0x47bc6c){
			console.log(_0x47bc6c);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x5ecb45=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x5b8b1c='';
		if($.shopactivityId)_0x5b8b1c=',"activityId":'+$.shopactivityId;
		const _0x3e8f1f='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x5b8b1c+',"channel":406}';
		const _0x5e330b={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x3e8f1f)};
		const _0x49c3c4=await getH5st('8adfb',_0x5e330b);
		const _0x5b99d2={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x3e8f1f+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x49c3c4),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x5b99d2,async(_0x29d39e,_0x4e3284,_0x2a0f6f)=>{
			try{
				if(_0x29d39e){
					if(_0x4e3284&&typeof _0x4e3284.statusCode!='undefined'){
						if(_0x4e3284.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x2a0f6f=_0x2a0f6f&&_0x2a0f6f.match(/jsonp_.*?\((.*?)\);/)&&_0x2a0f6f.match(/jsonp_.*?\((.*?)\);/)[1]||_0x2a0f6f;
					let _0x1e89cb=$.toObj(_0x2a0f6f,_0x2a0f6f);
					if(_0x1e89cb&&typeof _0x1e89cb=='object'){
						if(_0x1e89cb&&_0x1e89cb.success===true){
							console.log(' >> '+_0x1e89cb.message);
							$.errorJoinShop=_0x1e89cb.message;
							if(_0x1e89cb.result&&_0x1e89cb.result['giftInfo']){
								for(let _0x2ed689 of _0x1e89cb.result['giftInfo']['giftList']){
									console.log(' >> 入会获得：'+_0x2ed689.discountString+_0x2ed689.prizeName+_0x2ed689.secondLineDesc);
								}
							}
						}else if(_0x1e89cb&&typeof _0x1e89cb=='object'&&_0x1e89cb.message){
							$.errorJoinShop=_0x1e89cb.message;
							console.log(''+(_0x1e89cb.message||''));
						}else{
							console.log(_0x2a0f6f);
						}
					}else{
						console.log(_0x2a0f6f);
					}
				}
			}catch(_0x5ee557){
				$.logErr(_0x5ee557,_0x4e3284);
			}finally{
				_0x5ecb45();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x469d67=>{
		const _0xaaaa41='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x187977={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0xaaaa41)};
		const _0x33d4e4=await getH5st('8adfb',_0x187977);
		const _0x54fdba={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0xaaaa41+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x33d4e4),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x54fdba,async(_0xc97c75,_0x553935,_0x11b7b3)=>{
			try{
				if(_0xc97c75){
					if(_0x553935&&typeof _0x553935.statusCode!='undefined'){
						if(_0x553935.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x11b7b3=_0x11b7b3&&_0x11b7b3.match(/jsonp_.*?\((.*?)\);/)&&_0x11b7b3.match(/jsonp_.*?\((.*?)\);/)[1]||_0x11b7b3;
					let _0x3907be=$.toObj(_0x11b7b3,_0x11b7b3);
					if(_0x3907be&&typeof _0x3907be=='object'){
						if(_0x3907be&&_0x3907be.success==true){
							console.log('去加入：'+(_0x3907be.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
							$.shopactivityId=_0x3907be.result['interestsRuleList']&&_0x3907be.result['interestsRuleList'][0]&&_0x3907be.result['interestsRuleList'][0]['interestsInfo']&&_0x3907be.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
						}
					}else{
						console.log(_0x11b7b3);
					}
				}
			}catch(_0x13dc3c){
				$.logErr(_0x13dc3c,_0x553935);
			}finally{
				_0x469d67();
			}
		});
	});
}
function getAuthorCodeList(_0x25bc02){
	return new Promise(_0x5be330=>{
		const _0x563bd3={'url':_0x25bc02+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x563bd3,async(_0x3950d6,_0x4099f1,_0x24a0b5)=>{
			try{
				if(_0x3950d6){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x24a0b5)_0x24a0b5=JSON.parse(_0x24a0b5);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x1e5992){
				$.logErr(_0x1e5992,_0x4099f1);
				_0x24a0b5=null;
			}finally{
				_0x5be330(_0x24a0b5);
			}
		});
	});
}
function random(_0x30fd04,_0x3ba481){
	return Math.floor(Math.random()*(_0x3ba481-_0x30fd04))+_0x30fd04;
};