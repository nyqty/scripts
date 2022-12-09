/*
大牌联合通用开卡
新增开卡脚本，一次性脚本

2022.9.11 优化开卡火爆问题,加入重试

通用大牌联合通用开卡：
活动地址：https://jinggengjcq-isv.isvjcloud.com/xxxx/xxx/xxx

变量填写：
//export DPLHTY="活动ID"
如：
//export DPLHTY="04c1bf1191d044c6ae059e_22040802"

如需做浏览任务请设置环境变量：
//export opencard_toShop="true"

如需修改抽奖次数请设置环境变量：
//export opencard_draw="3" //次数

如需修改浏览次数请设置环境变量：
//export opencard_shop="6" //次数

如需修改助力码请设置环境变量：
//export helpnum="助力码"

账号间延时设置，默认35秒(已废弃)
//export krWait="60"

黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 

重试次数，默认30
//export retrynum="30"

活动ID自行查找

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码


============Quantumultx===============
[task_local]
#大牌联合通用开卡
1 1 1 1 * jd_opencardDPLHTY.js, tag=大牌联合通用开卡, enabled=true
*/
const Env=require('./utils/Env.js');
let opencard_toShop="false"
const $=new Env("大牌联合通用开卡");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach((item)=>{
		cookiesArr.push(jdCookieNode[item])
	})
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||"[]").map(item=>item.cookie)].filter(item=>!!item);
}
let retrynum="30"
let opencard_draw="0"
retrynum=$.isNode()?(process.env.retrynum?process.env.retrynum:retrynum):($.getdata('retrynum')?$.getdata('retrynum'):opencard_draw);
opencard_draw=$.isNode()?(process.env.opencard_draw?process.env.opencard_draw:opencard_draw):($.getdata('opencard_draw')?$.getdata('opencard_draw'):opencard_draw);
opencard_toShop=$.isNode()?(process.env.opencard_toShop?process.env.opencard_toShop:`${opencard_toShop}`):($.getdata('opencard_toShop')?$.getdata('opencard_toShop'):`${opencard_toShop}`);
allMessage=""
message=""
$.hotFlag=false
$.outFlag=false
$.activityEnd=false
let lz_jdpin_token_cookie=''
let activityCookie=''
let Signz=''
let helpnum='';
let DPLHTY='';
const getToken=require('./function/krgetToken');
let domains='https://jinggengjcq-isv.isvjcloud.com';
helpnum=$.isNode()?process.env['helpnum']?process.env['helpnum']:''+helpnum:$.getdata('helpnum')?$.getdata('helpnum'):''+helpnum;
DPLHTY=$.isNode()?process.env['DPLHTY']?process.env['DPLHTY']:''+DPLHTY:$.getdata('DPLHTY')?$.getdata('DPLHTY'):''+DPLHTY;
let whitelist='';
let blacklist='';
$.whitelist=process.env['DPLHTY_whitelist']||whitelist;
$.blacklist=process.env['DPLHTY_blacklist']||blacklist;
getWhitelist();
getBlacklist();
!(async()=>{
	if(!DPLHTY){
		console.log('\n请填写大牌大牌联合通用开卡的活动ID,变量是DPLHTY  💖\n');
		return;
	}
	authorCodeList=[];//await getAuthorCodeList('http://code.kingran.ga/dplh.json');
	$.authorCode=helpnum?helpnum:authorCodeList[random(0,authorCodeList.length)];
	console.log('\n💬 当前ID：'+DPLHTY);
	console.log('\n💬 默认抽奖次数：'+opencard_draw+' 💬 重试次数：'+retrynum);
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='51B59BB805903DA4CE513D29EC448375';
	$.userId='10299171';
	$.actId=DPLHTY;
	$.MixNicks='';
	$.inviteNick=$.authorCode;
	for(let _0x5f17e1=0;_0x5f17e1<cookiesArr.length;_0x5f17e1++){
		cookie=cookiesArr[_0x5f17e1];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x5f17e1+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(parseInt(Math.random()*1000+500,10));
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x13229f='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x13229f);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x13229f);
	}
})()['catch'](_0x34a144=>$.logErr(_0x34a144))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.outEnd=false;
		$.retry=false;
		$.krretry=false;
		$.krFlag=false;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let _0x5deda2=false;
		if($.activityEnd)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		$.Token=await getToken(cookie,domains);
		if($.Token==''){
			console.log('❌ 获取TOKEN失败');
			return;
		}
		await takePostRequest('activity_load');
		for(let _0x3a7ecd=0;_0x3a7ecd<retrynum;_0x3a7ecd++){
			if($.retry||$.krretry){
				await takePostRequest('activity_load');
				if($.krFlag)break;
			}
		}
		if($.hotFlag)return;
		if($.MixNick==''){
			console.log('❌ 获取[MixNick]失败');
			return;
		}
		$.toBind=0;
		$.openList=[];
		await takePostRequest('绑定');
		for(let _0x1e9061=0;_0x1e9061<retrynum;_0x1e9061++){
			if($.retry||$.krretry){
				await takePostRequest('绑定');
				if($.krFlag)break;
			}
		}
		await takePostRequest('shopList');
		for(let _0x38063d=0;_0x38063d<retrynum;_0x38063d++){
			if($.retry||$.krretry){
				await takePostRequest('shopList');
				if($.krFlag)break;
			}
		}
		if($.activityEnd)return;
		for(o of $.openList){
			$.missionType='openCard';
			if(o.open!=true&&o.openCardUrl){
				if($.activityEnd)return;
				if($.outEnd)return;
				$.openCard=false;
				$.joinVenderId=o.userId;
				await takePostRequest('mission');
				for(let _0x3c9acc=0;_0x3c9acc<retrynum;_0x3c9acc++){
					if($.retry||$.krretry){
						await takePostRequest('mission');
						if($.krFlag)break;
					}
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
				if($.openCard==true){
					$.errorJoinShop='';
					await joinShop();
					await $.wait(parseInt(Math.random()*1000+1000,10));
					if($.errorJoinShop['indexOf']('您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑')>-1){
						return;
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('😤 呜呜呜，重试开卡');
						await $.wait(1000);
						await joinShop();
						await $.wait(parseInt(Math.random()*1000+1000,10));
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('💔 无法开卡,跳过运行');
						return;
					}
					await takePostRequest('activity_load');
					for(let _0x159128=0;_0x159128<retrynum;_0x159128++){
						if($.retry||$.krretry){
							await takePostRequest('activity_load');
							if($.krFlag)break;
						}
					}
					await $.wait(parseInt(Math.random()*2000+1000,10));
				}
			}
		}
		if($.hasCollectShop===0){
			$.missionType='uniteCollectShop';
			await takePostRequest('mission');
			for(let _0x539164=0;_0x539164<retrynum;_0x539164++){
				if($.retry||$.krretry){
					await takePostRequest('mission');
					if($.krFlag)break;
				}
			}
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}else{
			console.log('💔 呜呜呜，已完成关注任务');
		}
		$.missionType='uniteAddCart';
		await takePostRequest('mission');
		for(let _0x15389f=0;_0x15389f<retrynum;_0x15389f++){
			if($.retry||$.krretry){
				await takePostRequest('mission');
				if($.krFlag)break;
			}
		}
		await $.wait(parseInt(Math.random()*2000+1000,10));
		if(opencard_toShop+''=='true'){
			let _0x350e8e=3;
			console.log('💖 默认浏览任务次数:'+_0x350e8e);
			for(m=1;_0x350e8e--;m++){
				console.log('🌐 第'+m+'次浏览');
				$.missionType='viewShop';
				await takePostRequest('mission');
				for(let _0x15389f=0;_0x15389f<retrynum;_0x15389f++){
					if($.retry||$.krretry){
						await takePostRequest('mission');
						if($.krFlag)break;
					}
				}
				await $.wait(parseInt(Math.random()*2000+1000,10));
				$.missionType='viewGoods';
				await takePostRequest('mission');
				for(let _0x15389f=0;_0x15389f<retrynum;_0x15389f++){
					if($.retry||$.krretry){
						await takePostRequest('mission');
						if($.krFlag)break;
					}
				}
				await $.wait(parseInt(Math.random()*2000+1000,10));
				if(m>=3){
					console.log('💔 浏览太多次，多余的次数请再执行脚本');
					break;
				}
			}
		}else{
			console.log('🔊 如需浏览店铺请设置环境变量[opencard_toShop]为"true"');
		}
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x17fb30=parseInt($.usedChance,10);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x17fb30>opencard_draw)_0x17fb30=opencard_draw;
			console.log('💖 抽奖次数为:'+_0x17fb30);
			for(m=1;_0x17fb30--;m++){
				console.log('🌐 第'+m+'次抽奖');
				await takePostRequest('抽奖');
				for(let _0x15389f=0;_0x15389f<retrynum;_0x15389f++){
					if($.retry||$.krretry){
						console.log('🔂 卡爆了，再重试一次');
						await takePostRequest('抽奖');
						if($.krFlag)break;
					}
				}
				if($.runFalag==false)break;
				if(Number(_0x17fb30)<=0)break;
				if(m>=10){
					console.log('💔 抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+1000,10));
			}
		}else console.log('🔊 如需抽奖请设置环境变量[opencard_draw]为"3" 3为次数');
		console.log('🔊 当前助力:'+$.inviteNick);
		if($.index==1){
			$.inviteNick=$.MixNick;
			console.log('🔊 后面的号都会助力:'+$.inviteNick);
		}
		await $.wait(parseInt(Math.random()*1000+1000,10));
	}catch(_0x42a976){
		console.log(_0x42a976);
	}
}
async function takePostRequest(_0x539ca4){
	if($.outFlag)return;
	let _0x40114a='https://jinggengjcq-isv.isvjcloud.com';
	let _0x3ddcc0='';
	let _0x406178='POST';
	let _0x2bd276='';
	switch(_0x539ca4){
		case 'activity_load':
			url=_0x40114a+'/dm/front/openCardNew/activity_load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={'jdToken':$.Token,'source':'01','inviteNick':$.inviteNick||''};
			if($.joinVenderId)_0x2bd276={..._0x2bd276,'shopId':''+$.joinVenderId};
			_0x3ddcc0=taskPostUrl('/openCardNew/activity_load',_0x2bd276);
			break;
		case 'shopList':
			url=_0x40114a+'/dm/front/openCardNew/shop/openCardLoad?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={};
			_0x3ddcc0=taskPostUrl('/openCardNew/shop/openCardLoad',_0x2bd276);
			break;
		case'绑定':
			url=_0x40114a+'/dm/front/openCardNew/complete/mission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={'missionType':'relationBind','inviterNick':$.inviteNick||''};
			_0x3ddcc0=taskPostUrl('/openCardNew/complete/mission',_0x2bd276);
			break;
		case 'mission':
			url=_0x40114a+'/dm/front/openCardNew/complete/mission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={'missionType':$.missionType};
			if($.joinVenderId)_0x2bd276={..._0x2bd276,'shopId':$.joinVenderId};
			_0x3ddcc0=taskPostUrl('/openCardNew/complete/mission',_0x2bd276);
			break;
		case'抽奖':
			url=_0x40114a+'/dm/front/openCardNew/draw/post?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={'dataType':'draw','usedGameNum':'2'};
			_0x3ddcc0=taskPostUrl('/openCardNew/draw/post',_0x2bd276);
			break;
		case 'followShop':
			url=_0x40114a+'/dm/front/openCardNew/followShop?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={'actId':$.actId,'missionType':'collectShop'};
			_0x3ddcc0=taskPostUrl('/openCardNew/followShop',_0x2bd276);
			break;
		case 'addCart':
			url=_0x40114a+'/dm/front/openCardNew/addCart?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={'actId':$.actId,'missionType':'addCart'};
			_0x3ddcc0=taskPostUrl('/openCardNew/addCart',_0x2bd276);
			break;
		case 'myAward':
			url=_0x40114a+'/dm/front/openCardNew/myAwards?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={'pageNo':1,'pageSize':9999};
			_0x3ddcc0=taskPostUrl('/openCardNew/myAwards',_0x2bd276);
			break;
		case'missionInviteList':
			url=_0x40114a+'/dm/front/openCardNew/missionInviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			_0x2bd276={'inviteListRequest':{'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteType':1,'buyerNick':$.MixNick||''}};
			_0x3ddcc0=taskPostUrl('/openCardNew/missionInviteList',_0x2bd276);
			break;
		default:
			console.log('错误'+_0x539ca4);
	}
	let _0xd7f0a6=getPostRequest(url,_0x3ddcc0,_0x406178);
	return new Promise(async _0x165dd3=>{
		$.post(_0xd7f0a6,(_0x3210fc,_0x39046f,_0x402533)=>{
			try{
				if(_0x3210fc){
					if(_0x39046f&&_0x39046f.statusCode&&_0x39046f.statusCode==493){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					$.retry=true;
				}else{
					dealReturn(_0x539ca4,_0x402533);
				}
			}catch(_0x5c9228){
				console.log(_0x5c9228,_0x39046f);
			}finally{
				_0x165dd3();
			}
		});
	});
}
async function dealReturn(_0xc0110c,_0x264156){
	let _0x425231='';
	try{
		$.krFlag=true;
		if(_0xc0110c!='accessLogWithAD'||_0xc0110c!='drawContent'){
			if(_0x264156){
				_0x425231=JSON.parse(_0x264156);
			}
		}
	}catch(_0x1db8e9){
		console.log('🤬 '+_0xc0110c+' 数据异常');
		$.krretry=true;
		$.runFalag=false;
	}
	try{
		let _0xf498ea='';
		switch(_0xc0110c){
			case'accessLogWithAD':
			case 'drawContent':
				break;
			case 'activity_load':
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
			case'抽奖':
			case'绑定':
				_0xf498ea='';
				if(_0xc0110c=='followShop')_0xf498ea='关注';
				if(_0xc0110c=='addCart')_0xf498ea='加购';
				if(typeof _0x425231=='object'){
					if(_0x425231.success&&_0x425231.success===true&&_0x425231.data){
						if(_0x425231.data['status']&&_0x425231.data['status']==200){
							_0x425231=_0x425231.data;
							if(_0xc0110c!='setMixNick'&&(_0x425231.msg||_0x425231.data['isOpenCard']||_0x425231.data['remark']))console.log('🔊 '+(_0xf498ea&&_0xf498ea+':'||'')+(_0x425231.msg||_0x425231.data['isOpenCard']||_0x425231.data['remark']||''));
							if(_0xc0110c=='activity_load'){
								if(_0x425231.msg||_0x425231.data['isOpenCard']){
									if((_0x425231.msg||_0x425231.data['isOpenCard']||'')['indexOf']('绑定成功')>-1)$.toBind=1;
								}
								if(_0x425231.data){
									$.endTime=_0x425231.data['cusActivity']['endTime']||0;
									$.MixNick=_0x425231.data['buyerNick']||'';
									$.usedChance=_0x425231.data['missionCustomer']['usedChance']||0;
									$.hasCollectShop=_0x425231.data['missionCustomer']['hasCollectShop']||0;
								}
							}else if(_0xc0110c=='shopList'){
								$.openList=_0x425231.data||[];
							}else if(_0xc0110c=='mission'){
								if(_0x425231.data['remark']['indexOf']('不是会员')>-1){
									$.openCard=true;
								}else{
									$.openCard=false;
								}
							}else if(_0xc0110c=='uniteOpenCardOne'){
								$.uniteOpenCar=_0x425231.msg||_0x425231.data['msg']||'';
							}else if(_0xc0110c=='myAward'){
								console.log('🔊 我的奖品：');
								let _0x413fcd=0;
								let _0x1457a6=0;
								for(let _0x431a2d in _0x425231.data['list']||[]){
									let _0x32d401=_0x425231.data['list'][_0x431a2d];
									_0x1457a6+=Number(_0x32d401.awardDes);
								}
								if(_0x1457a6>0)console.log('🔊 共获得'+_0x1457a6+'京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n');
							}else if(_0xc0110c=='missionInviteList'){
								console.log('🔊 邀请人数('+_0x425231.data['invitedLogList']['total']+')');
							}
						}else if(_0x425231.data['msg']){
							if(_0x425231.errorMessage['indexOf']('活动未开始')>-1){
								$.activityEnd=true;
							}
							console.log('🔊 '+(_0x425231.data['msg']||''));
						}else if(_0x425231.errorMessage){
							if(_0x425231.errorMessage['indexOf']('火爆')>-1){}
							console.log('🔊 '+(_0x425231.errorMessage||''));
						}else{
							console.log(''+_0x264156);
						}
					}else if(_0x425231.errorMessage){
						console.log('🔊 '+(_0x425231.errorMessage||''));
					}else{
						console.log(''+_0x264156);
					}
				}else{}
				break;
			default:
				console.log((_0xf498ea||_0xc0110c)+'-> '+_0x264156);
		}
		if(typeof _0x425231=='object'){
			if(_0x425231.errorMessage){
				if(_0x425231.errorMessage['indexOf']('火爆')>-1){}
			}
		}
	}catch(_0x1631bf){}
}
function getPostRequest(_0x387672,_0x5a5e64,_0x34256d='POST'){
	let _0x14b111={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x387672.indexOf('https://jinggengjcq-isv.isvjcloud.com')>-1){
		_0x14b111.Origin='https://jinggengjcq-isv.isvjcloud.com';
		_0x14b111['Content-Type']='application/json; charset=utf-8';
		delete _0x14b111.Cookie;
	}
	return{'url':_0x387672,'method':_0x34256d,'headers':_0x14b111,'body':_0x5a5e64,'timeout':10*1000};
}
function taskPostUrl(_0x1b7e53,_0x20dad2){
	const _0x3d2a35={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','timestamp':Date.now(),'userId':$.userId},'admJson':{'actId':$.actId,'userId':$.userId,..._0x20dad2,'method':_0x1b7e53,'buyerNick':$.MixNick||''}}};
	if(_0x1b7e53.indexOf('missionInviteList')>-1){
		delete _0x3d2a35.params['admJson']['actId'];
	}
	return $.toStr(_0x3d2a35,_0x3d2a35);
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0xc820d){
	_0xc820d=_0xc820d||32;
	let _0x46560c='abcdef0123456789',_0xc6b3a8=_0x46560c.length,_0x1ed041='';
	for(i=0;i<_0xc820d;i++)_0x1ed041+=_0x46560c.charAt(Math.floor(Math.random()*_0xc6b3a8));
	return _0x1ed041;
}
function jsonParse(_0x16f58e){
	if(typeof _0x16f58e=='string'){
		try{
			return JSON.parse(_0x16f58e);
		}catch(_0x19318e){
			console.log(_0x19318e);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x3f4e58=>{
		$.errorJoinShop='';
		$.shopactivityId='';
		await $.wait(1000);
		await getshopactivityId();
		let _0x33d817='';
		if($.shopactivityId)_0x33d817=',"activityId":'+$.shopactivityId;
		let _0x4f914a=await geth5st();
		const _0xd90dde={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x33d817+',"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888&h5st='+_0x4f914a,'headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(_0xd90dde,async(_0x367f80,_0x4f85b4,_0x1dbd1c)=>{
			try{
				let _0x449425=$.toObj(_0x1dbd1c,_0x1dbd1c);
				if(typeof _0x449425=='object'){
					if(_0x449425.success===true){
						console.log(_0x449425.message);
						$.errorJoinShop=_0x449425.message;
						if(_0x449425.result&&_0x449425.result['giftInfo']){
							for(let _0x123d5c of _0x449425.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x123d5c.discountString+_0x123d5c.prizeName+_0x123d5c.secondLineDesc);
							}
						}
					}else if(typeof _0x449425=='object'&&_0x449425.message){
						$.errorJoinShop=_0x449425.message;
						console.log(''+(_0x449425.message||''));
					}else{
						console.log(_0x1dbd1c);
					}
				}else{
					console.log(_0x1dbd1c);
				}
			}catch(_0x194cb2){
				$.logErr(_0x194cb2,_0x4f85b4);
			}finally{
				_0x3f4e58();
			}
		});
	});
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x420d87=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0xdd3ce5='';
		if($.shopactivityId)_0xdd3ce5=',"activityId":'+$.shopactivityId;
		const _0x47a098='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0xdd3ce5+',"channel":401}';
		const _0x3a4fec={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x47a098)};
		const _0x3ae439=await getH5st('8adfb',_0x3a4fec);
		const _0x1cf293={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x47a098+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x3ae439),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x1cf293,async(_0x4b4e94,_0x25e821,_0x52c6c7)=>{
			try{
				_0x52c6c7=_0x52c6c7&&_0x52c6c7.match(/jsonp_.*?\((.*?)\);/)&&_0x52c6c7.match(/jsonp_.*?\((.*?)\);/)[1]||_0x52c6c7;
				let _0x46ba5b=$.toObj(_0x52c6c7,_0x52c6c7);
				if(_0x46ba5b&&typeof _0x46ba5b=='object'){
					if(_0x46ba5b&&_0x46ba5b.success===true){
						console.log(' >> '+_0x46ba5b.message);
						$.errorJoinShop=_0x46ba5b.message;
						if(_0x46ba5b.result&&_0x46ba5b.result['giftInfo']){
							for(let _0x34f06e of _0x46ba5b.result['giftInfo']['giftList']){
								console.log(' >> 入会获得：'+_0x34f06e.discountString+_0x34f06e.prizeName+_0x34f06e.secondLineDesc);
							}
						}
					}else if(_0x46ba5b&&typeof _0x46ba5b=='object'&&_0x46ba5b.message){
						$.errorJoinShop=_0x46ba5b.message;
						console.log(''+(_0x46ba5b.message||''));
					}else{
						console.log(_0x52c6c7);
					}
				}else{
					console.log(_0x52c6c7);
				}
			}catch(_0xdce46a){
				$.logErr(_0xdce46a,_0x25e821);
			}finally{
				_0x420d87();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x3e1684=>{
		const _0xa76db0='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x1ea8ae={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0xa76db0)};
		const _0x3ed072=await getH5st('8adfb',_0x1ea8ae);
		const _0x4aa1e7={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0xa76db0+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x3ed072),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x4aa1e7,async(_0x4b8aac,_0x46c553,_0x18bc54)=>{
			try{
				_0x18bc54=_0x18bc54&&_0x18bc54.match(/jsonp_.*?\((.*?)\);/)&&_0x18bc54.match(/jsonp_.*?\((.*?)\);/)[1]||_0x18bc54;
				let _0x23c8d1=$.toObj(_0x18bc54,_0x18bc54);
				if(_0x23c8d1&&typeof _0x23c8d1=='object'){
					if(_0x23c8d1&&_0x23c8d1.success==true){
						console.log('去加入：'+(_0x23c8d1.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x23c8d1.result['interestsRuleList']&&_0x23c8d1.result['interestsRuleList'][0]&&_0x23c8d1.result['interestsRuleList'][0]['interestsInfo']&&_0x23c8d1.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x18bc54);
				}
			}catch(_0x456a1a){
				$.logErr(_0x456a1a,_0x46c553);
			}finally{
				_0x3e1684();
			}
		});
	});
}
function getH5st(_0x3c56ac,_0x241b96){
	return new Promise(async _0x17ef27=>{
		let _0x106d6f={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x3c56ac+'&req='+encodeURIComponent(JSON.stringify(_0x241b96)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x106d6f,(_0x2d8f12,_0x26bb8,_0x5496f6)=>{
			try{
				if(_0x2d8f12){
					console.log(JSON.stringify(_0x2d8f12));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x54e78d){
				$.logErr(_0x54e78d,_0x26bb8);
			}finally{
				_0x17ef27(_0x5496f6);
			}
		});
	});
}
function getAuthorCodeList(_0x1aacbb){
	return new Promise(_0x3f1ef2=>{
		const _0x18713c={'url':_0x1aacbb+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x18713c,async(_0x2f9acf,_0x1b59c2,_0x1de263)=>{
			try{
				if(_0x2f9acf){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x1de263)_0x1de263=JSON.parse(_0x1de263);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x2edd39){
				$.logErr(_0x2edd39,_0x1b59c2);
				_0x1de263=null;
			}finally{
				_0x3f1ef2(_0x1de263);
			}
		});
	});
}
function random(_0x3e18e8,_0x1314fe){
	return Math.floor(Math.random()*(_0x1314fe-_0x3e18e8))+_0x3e18e8;
}
function getBlacklist(){
	if($.blacklist=='')return;
	console.log('当前已设置黑名单：');
	const _0x3b8732=Array.from(new Set($.blacklist['split']('&')));
	console.log(_0x3b8732.join('&')+'\n');
	let _0x4b39fb=_0x3b8732;
	let _0x125727=[];
	let _0x7132fb=false;
	for(let _0x5023f4=0;_0x5023f4<cookiesArr.length;_0x5023f4++){
		let _0x5b8f3c=decodeURIComponent(cookiesArr[_0x5023f4]['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookiesArr[_0x5023f4]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]||'');
		if(!_0x5b8f3c)break;
		let _0x59bc85=false;
		for(let _0x55ded0 of _0x4b39fb){
			if(_0x55ded0&&_0x55ded0==_0x5b8f3c){
				_0x59bc85=true;
				break;
			}
		}
		if(!_0x59bc85){
			_0x7132fb=true;
			_0x125727.splice(_0x5023f4,-1,cookiesArr[_0x5023f4]);
		}
	}
	if(_0x7132fb)cookiesArr=_0x125727;
}
function toFirst(_0x441c8b,_0x1a5966){
	if(_0x1a5966!=0){
		_0x441c8b.unshift(_0x441c8b.splice(_0x1a5966,1)[0]);
	}
}
function getWhitelist(){
	if($.whitelist==''){
		helpCookiesArr=$.toObj($.toStr(cookiesArr,cookiesArr));
		return;
	}
	console.log('当前已设置白名单：');
	const _0x8fe373=Array.from(new Set($.whitelist['split']('&')));
	console.log(_0x8fe373.join('&')+'\n');
	let _0x14df11=[];
	let _0x5cb52e=_0x8fe373;
	for(let _0x3d816b in cookiesArr){
		let _0x292f0d=decodeURIComponent(cookiesArr[_0x3d816b]['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookiesArr[_0x3d816b]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]||'');
		if(_0x5cb52e.includes(_0x292f0d)){
			_0x14df11.push(cookiesArr[_0x3d816b]);
		}
	}
	helpCookiesArr=_0x14df11;
	if(_0x5cb52e.length>1){
		for(let _0x43294f in _0x5cb52e){
			let _0xb3e63a=_0x5cb52e[_0x5cb52e.length-1-_0x43294f];
			if(!_0xb3e63a)continue;
			for(let _0x3d816b in helpCookiesArr){
				let _0x292f0d=decodeURIComponent(helpCookiesArr[_0x3d816b]['match'](/pt_pin=([^; ]+)(?=;?)/)&&helpCookiesArr[_0x3d816b]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]);
				if(_0xb3e63a==_0x292f0d){
					toFirst(helpCookiesArr,_0x3d816b);
				}
			}
		}
	}
};