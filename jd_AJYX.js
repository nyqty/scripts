/*
11.1-11.31 安佳 邀新有礼


1.开1张卡
2.已开卡的不算有效人数

活动规则：
邀请1人积分，邀请3人，邀请5人

最多可以获取10次机会，最大化收入：50*10

领取一次算一次机会，并扣除邀请人数，所以就不限制多少自动停脚本了。

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 11.1-11.31 安佳 邀新有礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#11.1-11.31 安佳 邀新有礼
1 1 1 1 * jd_AJYX.js, tag=11.1-11.31 安佳 邀新有礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('11.1-11.31 安佳 邀新有礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x327921=>{
		cookiesArr.push(jdCookieNode[_0x327921]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x48e901=>_0x48e901.cookie)].filter(_0x12f16d=>!!_0x12f16d);
}
allMessage='';
message='';
let lz_cookie={};
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
	console.log('请自行去活动页面兑换对应的奖励\n开卡火爆重新运行一次');
	$.assistStatus=false;
	$.activityId='2104100001448619';
	authorCodeList=[];//=await getAuthorCodeList('http://code.kingran.ga/ajyq.json');
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId=2104100001448619&InviteUuid='+$.shareUuid);
	for(let _0x11880f=0;_0x11880f<cookiesArr.length;_0x11880f++){
		cookie=cookiesArr[_0x11880f];
		originCookie=cookiesArr[_0x11880f];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x11880f+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3500);
			if(_0x11880f==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0xe6b4a7='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0xe6b4a7);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0xe6b4a7);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0x530746=>$.logErr(_0x530746)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0xa714d3=false;
		await getToken();
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
		await takePostRequest('getSimpleActInfoVo');
		await takePostRequest('getShopInfoVO');
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await takePostRequest('activityContent');
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		await takePostRequest('prizeItem');
		console.log($.actorUuid);
		if($.helpStatus==0){
			$.joinVenderId=1000014486;
			await getshopactivityId();
			for(let _0x46d432=0;_0x46d432<Array(2).length;_0x46d432++){
				if(_0x46d432>0)console.log('第'+_0x46d432+'次 重新开卡');
				await joinShop();
				if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')==-1){
					break;
				}
			}
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
				console.log('开卡失败❌ ，重新执行脚本');
			}
			await takePostRequest('activityContent');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		console.log($.helpStatus==='2'?'助力成功':$.helpStatus==='0'?'未助力':$.helpStatus==='1'?'已开卡 无法助力':'未知-'+$.helpStatus);
		if($.index==1){
			$.helpCount=$.assistCount;
			console.log('【账号'+$.index+'】可领取奖品\n第一档奖品可领取：'+$.flag1+'次\n第二档奖品可领取：'+$.flag2+'次\n第三档奖品可领取：'+$.flag3+'次\n衰仔，请前往活动页面领取，先到先得。');
		}else if($.helpStatus==2){
			$.helpCount++;
		}
		$.runFalag=true;
		let _0x1de49f=parseInt($.flag3/1);
		console.log('领取奖励次数为:'+_0x1de49f);
		for(m=1;_0x1de49f--;m++){
			console.log('第'+m+'次领取奖励');
			await takePostRequest('receivePrize');
			if($.runFalag==false)break;
			if(Number(_0x1de49f)<=0)break;
			if(m>=10){
				console.log('领奖太多次，多余的次数请再执行脚本');
				break;
			}
		}
		console.log('【账号'+$.index+'】助力人数：'+$.assistCount+($.index!=1&&' 【账号1】助力人数：'+$.helpCount||''));
		if($.helpCount>=50)$.hasEnd=true;
		await $.wait(parseInt(Math.random()*2000+2000,10));
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*4000+4000,10));
	}catch(_0x2bdb42){
		console.log(_0x2bdb42);
	}
}
async function takePostRequest(_0xf543e9){
	if($.outFlag)return;
	let _0x202702='https://lzkjdz-isv.isvjd.com';
	let _0x1aeaf2='';
	let _0x460042='POST';
	let _0x32eecb='';
	switch(_0xf543e9){
		case'getMyPing':
			url=_0x202702+'/customer/getMyPing';
			_0x1aeaf2='token='+$.Token+'&fromType=APP&userId=1000014486&&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x202702+'/customer/getSimpleActInfoVo';
			_0x1aeaf2='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x202702+'/common/accessLog';
			let _0x1afb7f='https://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId='+$.activityId+'&InviteUuid='+$.shareUuid;
			_0x1aeaf2='venderId=1000014486&&code=25&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x1afb7f);
			break;
		case 'getUserInfo':
			url=_0x202702+'/wxActionCommon/getUserInfo';
			_0x1aeaf2='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x202702+'/wx/anchor/inviteJune/updateInviteId';
			_0x1aeaf2='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&InviteUuid='+$.shareUuid;
			break;
		case 'getShopInfoVO':
			url=_0x202702+'/wxActionCommon/getShopInfoVO';
			_0x1aeaf2='userId=1000014486';
			break;
		case 'prizeItem':
			url=_0x202702+'/wx/anchor/inviteJune/prizeItem';
			_0x1aeaf2='activityId='+$.activityId+'&actorUuid='+$.actorUuid;
			break;
		case 'receivePrize':
			url=_0x202702+'/wx/anchor/inviteJune/receivePrize';
			_0x1aeaf2='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&tap=3';
			break;
		default:
			console.log('错误'+_0xf543e9);
	}
	let _0xa330e8=getPostRequest(url,_0x1aeaf2,_0x460042);
	return new Promise(async _0x7e4ba5=>{
		$.post(_0xa330e8,(_0x523a3c,_0x5f0960,_0x13ba34)=>{
			try{
				setActivityCookie(_0x5f0960);
				if(_0x523a3c){
					if(_0x5f0960&&typeof _0x5f0960.statusCode!='undefined'){
						if(_0x5f0960.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x523a3c,_0x523a3c));
					console.log(_0xf543e9+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0xf543e9,_0x13ba34);
				}
			}catch(_0x1c385a){
				console.log(_0x1c385a,_0x5f0960);
			}finally{
				_0x7e4ba5();
			}
		});
	});
}
async function dealReturn(_0x3f4765,_0x14445e){
	let _0x4df570='';
	try{
		if(_0x3f4765!='accessLogWithAD'||_0x3f4765!='drawContent'){
			if(_0x14445e){
				_0x4df570=JSON.parse(_0x14445e);
			}
		}
	}catch(_0x3fd0d3){
		console.log(_0x3f4765+' 执行任务异常');
		console.log(_0x14445e);
		$.runFalag=false;
	}
	try{
		switch(_0x3f4765){
			case 'getMyPing':
				if(typeof _0x4df570=='object'){
					if(_0x4df570.result&&_0x4df570.result===true){
						if(_0x4df570.data&&typeof _0x4df570.data.secretPin!='undefined')$.Pin=_0x4df570.data.secretPin;
						if(_0x4df570.data&&typeof _0x4df570.data.nickname!='undefined')$.nickname=_0x4df570.data.nickname;
					}else if(_0x4df570.errorMessage){
						console.log(_0x3f4765+' '+(_0x4df570.errorMessage||''));
					}else{
						console.log(_0x3f4765+' '+_0x14445e);
					}
				}else{
					console.log(_0x3f4765+' '+_0x14445e);
				}
				break;
			case 'getShopInfoVO':
				if(typeof _0x4df570=='object'){
					if(_0x4df570.result&&_0x4df570.result===true){
						if(typeof _0x4df570.data.sid!='undefined')$.shopId=_0x4df570.data.sid;
						if(typeof _0x4df570.data.userId!='undefined')$.venderId=_0x4df570.data.userId;
					}else if(_0x4df570.errorMessage){
						console.log(_0x3f4765+' '+(_0x4df570.errorMessage||''));
					}else{
						console.log(_0x3f4765+' '+_0x14445e);
					}
				}else{
					console.log(_0x3f4765+' '+_0x14445e);
				}
				break;
			case 'prizeItem':
			case 'getSimpleActInfoVo':
				if(typeof _0x4df570=='object'){
					if(_0x4df570.result&&_0x4df570.result===true){}else if(_0x4df570.errorMessage){
						console.log(_0x3f4765+' '+(_0x4df570.errorMessage||''));
					}else{
						console.log(_0x3f4765+' '+_0x14445e);
					}
				}else{
					console.log(_0x3f4765+' '+_0x14445e);
				}
				break;
			case 'receivePrize':
				if(typeof _0x4df570=='object'){
					if(_0x4df570.result&&_0x4df570.result===true){
						console.log('获得： '+(_0x4df570.data||[]));
					}else if(_0x4df570.errorMessage){
						console.log(_0x3f4765+' '+(_0x4df570.errorMessage||''));
					}else{
						console.log(_0x3f4765+' '+_0x14445e);
					}
				}else{
					console.log(_0x3f4765+' '+_0x14445e);
				}
				break;
			case 'activityContent':
				if(typeof _0x4df570=='object'){
					if(_0x4df570.result&&_0x4df570.result===true){
						$.flag1=_0x4df570.data.flag1||'';
						$.actorUuid=_0x4df570.data.actorUuid||'';
						$.flag3=_0x4df570.data.flag3||'';
						$.flag2=_0x4df570.data.flag2||'';
						$.enterStatus=_0x4df570.data.enterStatus||0;
						$.helpStatus=_0x4df570.data.openStatus;
						$.assistCount=_0x4df570.data.invitedNumber||0;
						if(_0x4df570.data.sendBeanNum){
							console.log('获得'+_0x4df570.data.sendBeanNum+'豆');
							allMessage+='【账号'+$.index+'】获得'+_0x4df570.data.sendBeanNum+'豆\n';
						}
					}else if(_0x4df570.errorMessage){
						if(_0x4df570.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
						console.log(_0x3f4765+' '+(_0x4df570.errorMessage||''));
					}else{
						console.log(_0x3f4765+' '+_0x14445e);
					}
				}else{
					console.log(_0x3f4765+' '+_0x14445e);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x4df570=='object'){
					if(_0x4df570.isOk){
						$.allOpenCard=_0x4df570.openCard||false;
					}else if(_0x4df570.errorMessage||_0x4df570.msg){
						console.log(_0x3f4765+' '+(_0x4df570.errorMessage||_0x4df570.msg||''));
					}else{
						console.log(_0x3f4765+' '+_0x14445e);
					}
				}else{
					console.log(_0x3f4765+' '+_0x14445e);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x4df570=='object'){
					if(_0x4df570.result&&_0x4df570.result===true){
						console.log('我的奖品：');
						let _0x2d66e4=0;
						let _0x50c03d=0;
						let _0x167431={'dayShareBeans':'邀请','dayBeSharedBeans':'被邀请','openCardBeans':'开卡','saveTaskBeans23':'关注','saveTaskBeans12':'逛店铺','saveTaskBeans21':'加购'};
						for(let _0x5c0e56 in _0x4df570.data){
							let _0x142506=_0x4df570.data[_0x5c0e56];
							if(_0x142506.drawId=='dayShareBeans'){
								_0x2d66e4++;
								_0x50c03d=_0x142506.infoName.replace('京豆','');
							}else{
								console.log(''+(_0x142506.infoType!=10&&_0x142506.drawId&&(_0x167431[_0x142506.drawId]||_0x142506.drawId)+':'||_0x142506.value&&_0x142506.value+':'||'')+_0x142506.infoName);
							}
						}
						if(_0x2d66e4>0)console.log('邀请好友('+_0x2d66e4+'):'+(_0x2d66e4*parseInt(_0x50c03d,10)||30)+'京豆');
					}else if(_0x4df570.errorMessage){
						console.log(_0x3f4765+' '+(_0x4df570.errorMessage||''));
					}else{
						console.log(_0x3f4765+' '+_0x14445e);
					}
				}else{
					console.log(_0x3f4765+' '+_0x14445e);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x4df570=='object'){
					if(_0x4df570.result&&_0x4df570.result===true&&_0x4df570.data){
						$.ShareCount=_0x4df570.data.length;
						$.log('=========== 你邀请了:'+_0x4df570.data.length+'个');
					}else if(_0x4df570.errorMessage){
						console.log(_0x3f4765+' '+(_0x4df570.errorMessage||''));
					}else{
						console.log(_0x3f4765+' '+_0x14445e);
					}
				}else{
					console.log(_0x3f4765+' '+_0x14445e);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x3f4765+'-> '+_0x14445e);
		}
		if(typeof _0x4df570=='object'){
			if(_0x4df570.errorMessage){
				if(_0x4df570.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x5e8a07){
		console.log(_0x5e8a07);
	}
}
function getPostRequest(_0x3353bb,_0x518ea9,_0x476361='POST'){
	let _0x519369={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x3353bb.indexOf('https://lzkjdz-isv.isvjd.com')>-1){
		_0x519369.Referer='https://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId=2203100000178202/?helpUuid='+$.shareUuid;
		_0x519369.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x3353bb,'method':_0x476361,'headers':_0x519369,'body':_0x518ea9,'timeout':30000};
}
function getCk(){
	return new Promise(_0x38bf17=>{
		let _0x49aed9={'url':'https://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId=2104100001448619&InviteUuid=','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId=2104100001448619&InviteUuid=','User-Agent':$.UA},'timeout':30000};
		$.get(_0x49aed9,async(_0xdb66fa,_0x4fe8fd,_0x6d844e)=>{
			try{
				if(_0xdb66fa){
					if(_0x4fe8fd&&typeof _0x4fe8fd.statusCode!='undefined'){
						if(_0x4fe8fd.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xdb66fa));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x5a3a18=_0x6d844e.match(/(活动已经结束)/)&&_0x6d844e.match(/(活动已经结束)/)[1]||'';
					if(_0x5a3a18){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x4fe8fd);
				}
			}catch(_0x5d32cf){
				$.logErr(_0x5d32cf,_0x4fe8fd);
			}finally{
				_0x38bf17();
			}
		});
	});
}
function setActivityCookie(_0x4195cb){
	if(_0x4195cb){
		if(_0x4195cb.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x4ce7bb of _0x4195cb.headers['set-cookie']){
				lz_cookie[_0x4ce7bb.split(';')[0].substr(0,_0x4ce7bb.split(';')[0].indexOf('='))]=_0x4ce7bb.split(';')[0].substr(_0x4ce7bb.split(';')[0].indexOf('=')+1);
			}
			for(const _0x38213a of Object.keys(lz_cookie)){
				cookie+=_0x38213a+'='+lz_cookie[_0x38213a]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x2640e8){
	_0x2640e8=_0x2640e8||32;
	let _0x2a2ec0='abcdef0123456789',_0x5b4abf=_0x2a2ec0.length,_0x5dcfa0='';
	for(i=0;i<_0x2640e8;i++)_0x5dcfa0+=_0x2a2ec0.charAt(Math.floor(Math.random()*_0x5b4abf));
	return _0x5dcfa0;
}
async function getToken(){
	let _0x20bcc3=await getSign('isvObfuscator',{'id':'','url':'https://lzdz1-isv.isvjd.com'});
	let _0x37e527={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':''+$.Signz};
	return new Promise(_0x341033=>{
		$.post(_0x37e527,(_0x4b07a3,_0x11cd6c,_0x1b2c76)=>{
			try{
				if(_0x4b07a3){
					$.log(_0x4b07a3);
				}else{
					if(_0x1b2c76){
						_0x1b2c76=JSON.parse(_0x1b2c76);
						if(_0x1b2c76.code==='0'){
							$.Token=_0x1b2c76.token;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x24f5f0){
				$.log(_0x24f5f0);
			}finally{
				_0x341033();
			}
		});
	});
}
function getSign(_0x42dde1,_0x40ca62){
	let _0x53ad98={'fn':_0x42dde1,'body':JSON.stringify(_0x40ca62)};
	let _0xa7fe94={'url':'https://api.nolanstore.top/sign','body':JSON.stringify(_0x53ad98),'headers':{'Content-Type':'application/json'},'timeout':30000};
	return new Promise(async _0x3b005a=>{
		$.post(_0xa7fe94,(_0x36c715,_0x1bcd82,_0x53ad98)=>{
			try{
				if(_0x36c715){
					console.log(''+JSON.stringify(_0x36c715));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{
					_0x53ad98=JSON.parse(_0x53ad98);
					if(typeof _0x53ad98==='object'&&_0x53ad98&&_0x53ad98.body){
						$.Signz=_0x53ad98.body||'';
					}else{
						console.log('获取服务失败~~');
					}
				}
			}catch(_0x448c37){
				$.logErr(_0x448c37,_0x1bcd82);
			}finally{
				_0x3b005a(_0x53ad98);
			}
		});
	});
};
async function joinShop(){
	return new Promise(async _0xf60224=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x57116c='';
		if($.shopactivityId)_0x57116c=',"activityId":'+$.shopactivityId;
		const _0x196b65='{"venderId":"1000014486","shopId":"1000014486","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x57116c+',"channel":406}';
		const _0x391993={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x196b65)};
		const _0x28f30d=await getH5st('8adfb',_0x391993);
		const _0x39e993={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x196b65+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x28f30d),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x39e993,async(_0x4d5475,_0x3e2067,_0x2d1fb1)=>{
			try{
				_0x2d1fb1=_0x2d1fb1&&_0x2d1fb1.match(/jsonp_.*?\((.*?)\);/)&&_0x2d1fb1.match(/jsonp_.*?\((.*?)\);/)[1]||_0x2d1fb1;
				let _0x5e80ac=$.toObj(_0x2d1fb1,_0x2d1fb1);
				if(_0x5e80ac&&typeof _0x5e80ac=='object'){
					if(_0x5e80ac&&_0x5e80ac.success===true){
						console.log(_0x5e80ac.message);
						$.errorJoinShop=_0x5e80ac.message;
						if(_0x5e80ac.result&&_0x5e80ac.result.giftInfo){
							for(let _0x217a7d of _0x5e80ac.result.giftInfo.giftList){
								console.log('入会获得:'+_0x217a7d.discountString+_0x217a7d.prizeName+_0x217a7d.secondLineDesc);
							}
						}
					}else if(_0x5e80ac&&typeof _0x5e80ac=='object'&&_0x5e80ac.message){
						$.errorJoinShop=_0x5e80ac.message;
						console.log(''+(_0x5e80ac.message||''));
					}else{
						console.log(_0x2d1fb1);
					}
				}else{
					console.log(_0x2d1fb1);
				}
			}catch(_0x5481d6){
				$.logErr(_0x5481d6,_0x3e2067);
			}finally{
				_0xf60224();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x179cea=>{
		let _0x3764ec='{"venderId":"1000014486","channel":406,"payUpShop":true}';
		const _0x3e82a6={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x3764ec)};
		const _0x45c853=await getH5st('ef79a',_0x3e82a6);
		const _0x213989={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x3764ec+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x45c853),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x213989,async(_0x367ebf,_0x481166,_0x145f73)=>{
			try{
				_0x145f73=_0x145f73&&_0x145f73.match(/jsonp_.*?\((.*?)\);/)&&_0x145f73.match(/jsonp_.*?\((.*?)\);/)[1]||_0x145f73;
				let _0x48cbc6=$.toObj(_0x145f73,_0x145f73);
				if(_0x48cbc6&&typeof _0x48cbc6=='object'){
					if(_0x48cbc6&&_0x48cbc6.success==true){
						console.log('入会:'+(_0x48cbc6.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x48cbc6.result.interestsRuleList&&_0x48cbc6.result.interestsRuleList[0]&&_0x48cbc6.result.interestsRuleList[0].interestsInfo&&_0x48cbc6.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x145f73);
				}
			}catch(_0x1d35f0){
				$.logErr(_0x1d35f0,_0x481166);
			}finally{
				_0x179cea();
			}
		});
	});
}
function getH5st(_0x481c08,_0x5bd246){
	return new Promise(async _0x464832=>{
		let _0x2b3ff3={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x481c08+'&req='+encodeURIComponent(JSON.stringify(_0x5bd246)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x2b3ff3,(_0x346eca,_0xc92e82,_0xcd1a6)=>{
			try{
				if(_0x346eca){
					console.log(JSON.stringify(_0x346eca));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x454721){
				$.logErr(_0x454721,_0xc92e82);
			}finally{
				_0x464832(_0xcd1a6);
			}
		});
	});
}
function getAuthorCodeList(_0x305e86){
	return new Promise(_0x576ce1=>{
		const _0x1125e8={'url':_0x305e86+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x1125e8,async(_0x1f4b43,_0x219ea7,_0x8bef29)=>{
			try{
				if(_0x1f4b43){
					$.log(_0x1f4b43);
				}else{
					if(_0x8bef29)_0x8bef29=JSON.parse(_0x8bef29);
				}
			}catch(_0x5e09f8){
				$.logErr(_0x5e09f8,_0x219ea7);
				_0x8bef29=null;
			}finally{
				_0x576ce1(_0x8bef29);
			}
		});
	});
};