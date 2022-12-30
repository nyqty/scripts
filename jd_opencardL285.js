/*
12.26-1.15 金龙鱼大牌风暴
新增开卡脚本，一次性脚本

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

cron:59 3,12 26-31,1-15 12,1 * 
============Quantumultx===============
[task_local]
#12.26-1.15 金龙鱼大牌风暴
59 3,12 26-31,1-15 12,1 * jd_opencardL284.js, tag=12.26-1.15 金龙鱼大牌风暴, enabled=true
*/
let opencard_toShop="false"
const Env=require('./utils/Env');
const $=new Env("12.26-1.15 金龙鱼大牌风暴");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://mpdz2-isv.isvjcloud.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0xa39920=>{
		cookiesArr.push(jdCookieNode[_0xa39920]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x3f9e6e=>_0x3f9e6e.cookie)]['filter'](_0x17169b=>!!_0x17169b);
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
	authorCodeList=await getAuthorCodeList('http://code.kingran.ga/284.json');
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='21699045';
	$.userId='10299171';
	$.actId='jdGoldenArowana20221205';
	$.MixNicks='';
	$.inviteNick=$.authorCode;
	for(let _0x198967=0;_0x198967<cookiesArr.length;_0x198967++){
		cookie=cookiesArr[_0x198967];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x198967+1;
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
		let _0x4e0578='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x4e0578);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x4e0578);
	}
})()['catch'](_0x410e56=>$.logErr(_0x410e56))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let _0x1a7062=false;
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
		for(let _0x14a2b4=0;_0x14a2b4<$.renwulists['length'];_0x14a2b4++){
			$.missionType=$.renwulists[_0x14a2b4]['type'];
			if(!$.renwulists[_0x14a2b4]['isComplete']){
				switch($.missionType){
					case 'openCard':
					case 'payTradeCaiZiYou':
					case 'payTradeEvery':
					case 'viewTimesShop':
					case 'shareAct':
						break;
					case 'uniteCollectShop':
						for(let _0x379ae6=0;_0x379ae6<1;_0x379ae6++){
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
	}catch(_0x1d2251){
		console.log(_0x1d2251);
	}
}
async function takePostRequest(_0x4f2835){
	if($.outFlag)return;
	let _0x39f60d='https://mpdz2-isv.isvjcloud.com';
	let _0x119458='';
	let _0xf142d3='POST';
	let _0x1db799='';
	switch(_0x4f2835){
		case 'activity_load':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=10299171';
			_0x1db799={'jdToken':$.Token,'pushWay':'1','inviteNick':$.inviteNick||''};
			if($.joinVenderId)_0x1db799={..._0x1db799,'shopId':''+$.joinVenderId};
			_0x119458=taskPostUrl('/jdGoldenArowana/activity/load',_0x1db799);
			break;
		case 'shopList':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/shop/shopList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=10299171';
			_0x1db799={'pushWay':'1'};
			_0x119458=taskPostUrl('/jdGoldenArowana/shop/shopList',_0x1db799);
			break;
		case'绑定':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/customer/inviteRelation?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=10299171';
			_0x1db799={'missionType':'relationBind','pushWay':'1','inviterNick':$.inviteNick||''};
			_0x119458=taskPostUrl('/jdGoldenArowana/customer/inviteRelation',_0x1db799);
			break;
		case 'mission':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=10299171';
			_0x1db799={'missionType':$.missionType,'pushWay':'1'};
			_0x119458=taskPostUrl('/jdGoldenArowana/mission/completeMission',_0x1db799);
			break;
		case 'kaika':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=10299171';
			_0x1db799={'missionType':$.missionType,'pushWay':'1','shopId':$.joinVenderId};
			_0x119458=taskPostUrl('/jdGoldenArowana/mission/completeMission',_0x1db799);
			break;
		case'抽奖':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/interactive/drawPost?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x1db799={'usedGameNum':'2','pushWay':'1','dataType':'draw'};
			_0x119458=taskPostUrl('/jdGoldenArowana/interactive/drawPost',_0x1db799);
			break;
		case 'followShop':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=10299171';
			_0x1db799={'actId':$.actId,'pushWay':'1','missionType':'uniteCollectShop'};
			_0x119458=taskPostUrl('/jdGoldenArowana/mission/completeMission',_0x1db799);
			break;
		case 'inviteCheck':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/mission/completeMission?open_id=?mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=10299171';
			_0x1db799={'actId':$.actId,'pushWay':'1','missionType':'inviteCheck'};
			_0x119458=taskPostUrl('/jdGoldenArowana/mission/completeMission',_0x1db799);
			break;
		case 'completeState':
			url=_0x39f60d+'/dm/front/jdGoldenArowana/mission/completeState?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=10299171';
			_0x1db799={'pushWay':'1'};
			_0x119458=taskPostUrl('/jdGoldenArowana/mission/completeState',_0x1db799);
			break;
		case 'myAward':
			url=_0x39f60d+'/dm/front/jdRiceNoodleFestival/awards/list?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x1db799={'pageNo':1,'pageSize':9999};
			_0x119458=taskPostUrl('/jdRiceNoodleFestival/awards/list',_0x1db799);
			break;
		case 'missionInviteList':
			url=_0x39f60d+'/dm/front/jdRiceNoodleFestival/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x1db799={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick||''};
			_0x119458=taskPostUrl('/jdRiceNoodleFestival/customer/inviteList',_0x1db799);
			break;
		default:
			console.log('错误'+_0x4f2835);
	}
	let _0x4a43db=getPostRequest(url,_0x119458,_0xf142d3);
	return new Promise(async _0x5c7691=>{
		$.post(_0x4a43db,(_0x505ffd,_0xcaa8a0,_0xb6c3dd)=>{
			try{
				if(_0x505ffd){
					if(_0xcaa8a0&&_0xcaa8a0.statusCode&&_0xcaa8a0.statusCode==493){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					console.log(''+$.toStr(_0x505ffd,_0x505ffd));
					console.log(_0x4f2835+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x4f2835,_0xb6c3dd);
				}
			}catch(_0xfeb7b3){
				console.log(_0xfeb7b3,_0xcaa8a0);
			}finally{
				_0x5c7691();
			}
		});
	});
}
async function dealReturn(_0x3ef66a,_0x546c02){
	let _0x5526dc='';
	try{
		if(_0x3ef66a!='accessLogWithAD'||_0x3ef66a!='drawContent'){
			if(_0x546c02){
				_0x5526dc=JSON.parse(_0x546c02);
			}
		}
	}catch(_0x11acde){
		console.log(_0x3ef66a+' 执行任务异常');
		console.log(_0x546c02);
		$.runFalag=false;
	}
	try{
		let _0x5e2921='';
		switch(_0x3ef66a){
			case 'completeState':
				if(typeof _0x5526dc=='object'){
					if(_0x5526dc.success&&_0x5526dc.success===true&&_0x5526dc.data){
						if(_0x5526dc.data['status']&&_0x5526dc.data['status']==200){
							$.renwulists=_0x5526dc.data['data']||[];
						}
					}else if(_0x5526dc.message){
						console.log(''+(_0x5526dc.message||''));
					}else{
						console.log(_0x546c02);
					}
				}else{
					console.log(_0x546c02);
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
			case 'myAward':
			case 'missionInviteList':
			case'抽奖':
			case 'kaika':
			case'绑定':
			case'助力':
			case 'bulletChat':
			case 'specialSign':
				_0x5e2921='';
				if(_0x3ef66a=='followShop')_0x5e2921='关注';
				if(_0x3ef66a=='addCart')_0x5e2921='加购';
				if(typeof _0x5526dc=='object'){
					if(_0x5526dc.success&&_0x5526dc.success===true&&_0x5526dc.data){
						if(_0x5526dc.data['status']&&_0x5526dc.data['status']==200){
							_0x5526dc=_0x5526dc.data;
							if(_0x3ef66a!='setMixNick'&&(_0x5526dc.msg||_0x5526dc.data['isOpenCard']||_0x5526dc.data['remark']))console.log(''+(_0x5e2921&&_0x5e2921+':'||'')+(_0x5526dc.msg||_0x5526dc.data['isOpenCard']||_0x5526dc.data['remark']||''));
							if(_0x3ef66a=='activity_load'){
								if(_0x5526dc.data){
									$.endTime=_0x5526dc.data['cusActivity']['endTime']||0;
									$.MixNick=_0x5526dc.data['missionCustomer']['buyerNick']||'';
									$.remainPoint=_0x5526dc.data['missionCustomer']['remainPoint']||0;
									$.usedPoint=_0x5526dc.data['missionCustomer']['usedPoint']||0;
									$.hasCollectShop=_0x5526dc.data['missionCustomer']['hasCollectShop']||0;
									$.hasAddCart=_0x5526dc.data['missionCustomer']['hasAddCart']||0;
								}
							}else if(_0x3ef66a=='shopList'){
								if(_0x5526dc.data){
									$.openLists=_0x5526dc.data;
								}
							}else if(_0x3ef66a=='mission'){
								if(_0x5526dc.data['remark']['indexOf']('赶紧去开卡吧')>-1){
									$.open=true;
								}else{
									$.open=false;
								}
							}else if(_0x3ef66a=='uniteOpenCardOne'){
								$.uniteOpenCar=_0x5526dc.msg||_0x5526dc.data['msg']||'';
							}else if(_0x3ef66a=='myAward'){
								console.log('我的奖品：');
								let _0x1263b3=0;
								let _0x300f2e=0;
								for(let _0xf8cbe3 in _0x5526dc.data['list']||[]){
									let _0x45107b=_0x5526dc.data['list'][_0xf8cbe3];
									_0x300f2e+=Number(_0x45107b.awardDes);
								}
								if(_0x300f2e>0)console.log('共获得'+_0x300f2e+'京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n');
							}else if(_0x3ef66a=='missionInviteList'){
								console.log('邀请人数('+_0x5526dc.data['total']+')');
							}
						}else if(_0x5526dc.data['msg']){
							if(_0x5526dc.errorMessage['indexOf']('活动未开始')>-1){
								$.activityEnd=true;
							}
							console.log(''+(_0x5526dc.data['msg']||''));
						}else if(_0x5526dc.errorMessage){
							if(_0x5526dc.errorMessage['indexOf']('火爆')>-1){}
							console.log(''+(_0x5526dc.errorMessage||''));
						}else{
							console.log(''+_0x546c02);
						}
					}else if(_0x5526dc.errorMessage){
						console.log(''+(_0x5526dc.errorMessage||''));
					}else{
						console.log(''+_0x546c02);
					}
				}else{
					console.log(''+_0x546c02);
				}
				break;
			default:
				console.log((_0x5e2921||_0x3ef66a)+'-> '+_0x546c02);
		}
		if(typeof _0x5526dc=='object'){
			if(_0x5526dc.errorMessage){
				if(_0x5526dc.errorMessage['indexOf']('火爆')>-1){}
			}
		}
	}catch(_0x5e75b6){
		console.log(_0x5e75b6);
	}
}
function getPostRequest(_0x270a30,_0x4d9b17,_0x1c624e='POST'){
	let _0x304ba3={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x270a30.indexOf('https://mpdz2-isv.isvjcloud.com')>-1){
		_0x304ba3.Origin='https://mpdz2-isv.isvjcloud.com';
		_0x304ba3['Content-Type']='application/json; charset=utf-8';
		delete _0x304ba3.Cookie;
	}
	return{'url':_0x270a30,'method':_0x1c624e,'headers':_0x304ba3,'body':_0x4d9b17,'timeout':60000};
}
function taskPostUrl(_0x57cf96,_0x264180){
	const _0x4c3f32={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':'a6b11167cb823d19f793bb979448dfac','timestamp':Date.now(),'userId':$.userId},'admJson':{'actId':$.actId,'userId':$.userId,..._0x264180,'method':_0x57cf96,'buyerNick':$.MixNick||''}}};
	if(_0x57cf96.indexOf('missionInviteList')>-1){
		delete _0x4c3f32.params['admJson']['actId'];
	}
	return $.toStr(_0x4c3f32,_0x4c3f32);
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x19c415){
	_0x19c415=_0x19c415||32;
	let _0x443bb5='abcdef0123456789',_0x2d0acf=_0x443bb5.length,_0x4b163d='';
	for(i=0;i<_0x19c415;i++)_0x4b163d+=_0x443bb5.charAt(Math.floor(Math.random()*_0x2d0acf));
	return _0x4b163d;
}
function jsonParse(_0x15d4f4){
	if(typeof _0x15d4f4=='string'){
		try{
			return JSON.parse(_0x15d4f4);
		}catch(_0x598ac6){
			console.log(_0x598ac6);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x556e17=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x5d024a='';
		if($.shopactivityId)_0x5d024a=',"activityId":'+$.shopactivityId;
		const _0x669f53='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x5d024a+',"channel":406}';
		const _0x5d49eb={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x669f53)};
		const _0x248e95=await getH5st('8adfb',_0x5d49eb);
		const _0x25d589={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x669f53+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x248e95),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x25d589,async(_0x4f8321,_0x4334f2,_0x5118ee)=>{
			try{
				if(_0x4f8321){
					if(_0x4334f2&&typeof _0x4334f2.statusCode!='undefined'){
						if(_0x4334f2.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x5118ee=_0x5118ee&&_0x5118ee.match(/jsonp_.*?\((.*?)\);/)&&_0x5118ee.match(/jsonp_.*?\((.*?)\);/)[1]||_0x5118ee;
					let _0x4379b1=$.toObj(_0x5118ee,_0x5118ee);
					if(_0x4379b1&&typeof _0x4379b1=='object'){
						if(_0x4379b1&&_0x4379b1.success===true){
							console.log(' >> '+_0x4379b1.message);
							$.errorJoinShop=_0x4379b1.message;
							if(_0x4379b1.result&&_0x4379b1.result['giftInfo']){
								for(let _0x4bef17 of _0x4379b1.result['giftInfo']['giftList']){
									console.log(' >> 入会获得：'+_0x4bef17.discountString+_0x4bef17.prizeName+_0x4bef17.secondLineDesc);
								}
							}
						}else if(_0x4379b1&&typeof _0x4379b1=='object'&&_0x4379b1.message){
							$.errorJoinShop=_0x4379b1.message;
							console.log(''+(_0x4379b1.message||''));
						}else{
							console.log(_0x5118ee);
						}
					}else{
						console.log(_0x5118ee);
					}
				}
			}catch(_0x53d5dc){
				$.logErr(_0x53d5dc,_0x4334f2);
			}finally{
				_0x556e17();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x4caac4=>{
		const _0x317e4b='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x272485={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x317e4b)};
		const _0x106f38=await getH5st('8adfb',_0x272485);
		const _0x461393={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x317e4b+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x106f38),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x461393,async(_0x415ab6,_0x2c7bf7,_0x55269a)=>{
			try{
				if(_0x415ab6){
					if(_0x2c7bf7&&typeof _0x2c7bf7.statusCode!='undefined'){
						if(_0x2c7bf7.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x55269a=_0x55269a&&_0x55269a.match(/jsonp_.*?\((.*?)\);/)&&_0x55269a.match(/jsonp_.*?\((.*?)\);/)[1]||_0x55269a;
					let _0x234ec7=$.toObj(_0x55269a,_0x55269a);
					if(_0x234ec7&&typeof _0x234ec7=='object'){
						if(_0x234ec7&&_0x234ec7.success==true){
							console.log('去加入：'+(_0x234ec7.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
							$.shopactivityId=_0x234ec7.result['interestsRuleList']&&_0x234ec7.result['interestsRuleList'][0]&&_0x234ec7.result['interestsRuleList'][0]['interestsInfo']&&_0x234ec7.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
						}
					}else{
						console.log(_0x55269a);
					}
				}
			}catch(_0x159445){
				$.logErr(_0x159445,_0x2c7bf7);
			}finally{
				_0x4caac4();
			}
		});
	});
}
function getAuthorCodeList(_0xe21d5e){
	return new Promise(_0x4e0bb1=>{
		const _0x38c73={'url':_0xe21d5e+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x38c73,async(_0x10b4ba,_0x55b884,_0x46ef5b)=>{
			try{
				if(_0x10b4ba){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x46ef5b)_0x46ef5b=JSON.parse(_0x46ef5b);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x2b5980){
				$.logErr(_0x2b5980,_0x55b884);
				_0x46ef5b=null;
			}finally{
				_0x4e0bb1(_0x46ef5b);
			}
		});
	});
}
function random(_0x1bc3b4,_0x434374){
	return Math.floor(Math.random()*(_0x434374-_0x1bc3b4))+_0x1bc3b4;
};