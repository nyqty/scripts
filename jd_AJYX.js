/*
1.1-1.31 安佳 邀新有礼


1.开1张卡
2.已开卡的不算有效人数

活动规则：
邀请1人积分，邀请3人，邀请5人

最多可以获取10次机会，最大化收入：50*10

领取一次算一次机会，并扣除邀请人数，所以就不限制多少自动停脚本了。

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 1.1-1.31 安佳 邀新有礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#1.1-1.31 安佳 邀新有礼
11 11 11 11 * jd_AJYX.js, tag=1.1-1.31 安佳 邀新有礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('1.1-1.31 安佳 邀新有礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://lzdz1-isv.isvjd.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x4d0949=>{
		cookiesArr.push(jdCookieNode[_0x4d0949]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x3a9576=>_0x3a9576.cookie)]['filter'](_0x4edc8c=>!!_0x4edc8c);
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
	$.activityId='2104100001448621';
	authorCodeList=["507ebc4852bd495ba86ca58b2e0fd6b4"]//await getAuthorCodeList('http://code.kingran.ga/ajyq.json');
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId=2104100001448621&InviteUuid='+$.shareUuid);
	for(let _0x550c19=0;_0x550c19<cookiesArr.length;_0x550c19++){
		cookie=cookiesArr[_0x550c19];
		originCookie=cookiesArr[_0x550c19];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x550c19+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3500);
			if(_0x550c19==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x28022d='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x28022d);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x28022d);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x59c1b8=>$.logErr(_0x59c1b8))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x183902=false;
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
			for(let _0x333375=0;_0x333375<Array(2)['length'];_0x333375++){
				if(_0x333375>0)console.log('第'+_0x333375+'次 重新开卡');
				await joinShop();
				if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')==-1){
					break;
				}
			}
			if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
				console.log('💔 可能是开卡黑号,跳过运行');
				return;
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
		let _0x390c86=parseInt($.flag3/1);
		console.log('领取奖励次数为:'+_0x390c86);
		for(m=1;_0x390c86--;m++){
			console.log('第'+m+'次领取奖励');
			await takePostRequest('receivePrize');
			if($.runFalag==false)break;
			if(Number(_0x390c86)<=0)break;
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
	}catch(_0xac27dd){
		console.log(_0xac27dd);
	}
}
async function takePostRequest(_0x10d682){
	if($.outFlag)return;
	let _0x24c654='https://lzkjdz-isv.isvjd.com';
	let _0x9a8f7c='';
	let _0x233105='POST';
	let _0xaa0ea7='';
	switch(_0x10d682){
		case 'getMyPing':
			url=_0x24c654+'/customer/getMyPing';
			_0x9a8f7c='token='+$.Token+'&fromType=APP&userId=1000014486&&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x24c654+'/customer/getSimpleActInfoVo';
			_0x9a8f7c='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x24c654+'/common/accessLog';
			let _0x16dfcb='https://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId='+$.activityId+'&InviteUuid='+$.shareUuid;
			_0x9a8f7c='venderId=1000014486&&code=25&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x16dfcb);
			break;
		case'getUserInfo':
			url=_0x24c654+'/wxActionCommon/getUserInfo';
			_0x9a8f7c='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x24c654+'/wx/anchor/inviteJune/updateInviteId';
			_0x9a8f7c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&InviteUuid='+$.shareUuid;
			break;
		case 'getShopInfoVO':
			url=_0x24c654+'/wxActionCommon/getShopInfoVO';
			_0x9a8f7c='userId=1000014486';
			break;
		case 'prizeItem':
			url=_0x24c654+'/wx/anchor/inviteJune/prizeItem';
			_0x9a8f7c='activityId='+$.activityId+'&actorUuid='+$.actorUuid;
			break;
		case 'receivePrize':
			url=_0x24c654+'/wx/anchor/inviteJune/receivePrize';
			_0x9a8f7c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&tap=3';
			break;
		default:
			console.log('错误'+_0x10d682);
	}
	let _0x46548d=getPostRequest(url,_0x9a8f7c,_0x233105);
	return new Promise(async _0x56ad0f=>{
		$.post(_0x46548d,(_0xfbebf5,_0x54b11f,_0x3224cb)=>{
			try{
				setActivityCookie(_0x54b11f);
				if(_0xfbebf5){
					if(_0x54b11f&&typeof _0x54b11f.statusCode!='undefined'){
						if(_0x54b11f.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xfbebf5,_0xfbebf5));
					console.log(_0x10d682+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x10d682,_0x3224cb);
				}
			}catch(_0x4f3330){
				console.log(_0x4f3330,_0x54b11f);
			}finally{
				_0x56ad0f();
			}
		});
	});
}
async function dealReturn(_0x304f2a,_0x191ac2){
	let _0x549683='';
	try{
		if(_0x304f2a!='accessLogWithAD'||_0x304f2a!='drawContent'){
			if(_0x191ac2){
				_0x549683=JSON.parse(_0x191ac2);
			}
		}
	}catch(_0x59b846){
		console.log(_0x304f2a+' 执行任务异常');
		console.log(_0x191ac2);
		$.runFalag=false;
	}
	try{
		switch(_0x304f2a){
			case 'getMyPing':
				if(typeof _0x549683=='object'){
					if(_0x549683.result&&_0x549683.result===true){
						if(_0x549683.data&&typeof _0x549683.data['secretPin']!='undefined')$.Pin=_0x549683.data['secretPin'];
						if(_0x549683.data&&typeof _0x549683.data['nickname']!='undefined')$.nickname=_0x549683.data['nickname'];
					}else if(_0x549683.errorMessage){
						console.log(_0x304f2a+' '+(_0x549683.errorMessage||''));
					}else{
						console.log(_0x304f2a+' '+_0x191ac2);
					}
				}else{
					console.log(_0x304f2a+' '+_0x191ac2);
				}
				break;
			case 'getShopInfoVO':
				if(typeof _0x549683=='object'){
					if(_0x549683.result&&_0x549683.result===true){
						if(typeof _0x549683.data['sid']!='undefined')$.shopId=_0x549683.data['sid'];
						if(typeof _0x549683.data['userId']!='undefined')$.venderId=_0x549683.data['userId'];
					}else if(_0x549683.errorMessage){
						console.log(_0x304f2a+' '+(_0x549683.errorMessage||''));
					}else{
						console.log(_0x304f2a+' '+_0x191ac2);
					}
				}else{
					console.log(_0x304f2a+' '+_0x191ac2);
				}
				break;
			case 'prizeItem':
			case 'getSimpleActInfoVo':
				if(typeof _0x549683=='object'){
					if(_0x549683.result&&_0x549683.result===true){}else if(_0x549683.errorMessage){
						console.log(_0x304f2a+' '+(_0x549683.errorMessage||''));
					}else{
						console.log(_0x304f2a+' '+_0x191ac2);
					}
				}else{
					console.log(_0x304f2a+' '+_0x191ac2);
				}
				break;
			case 'receivePrize':
				if(typeof _0x549683=='object'){
					if(_0x549683.result&&_0x549683.result===true){
						console.log('获得： '+(_0x549683.data||[]));
					}else if(_0x549683.errorMessage){
						console.log(_0x304f2a+' '+(_0x549683.errorMessage||''));
					}else{
						console.log(_0x304f2a+' '+_0x191ac2);
					}
				}else{
					console.log(_0x304f2a+' '+_0x191ac2);
				}
				break;
			case 'activityContent':
				if(typeof _0x549683=='object'){
					if(_0x549683.result&&_0x549683.result===true){
						$.flag1=_0x549683.data['flag1']||'';
						$.actorUuid=_0x549683.data['actorUuid']||'';
						$.flag3=_0x549683.data['flag3']||'';
						$.flag2=_0x549683.data['flag2']||'';
						$.enterStatus=_0x549683.data['enterStatus']||0;
						$.helpStatus=_0x549683.data['openStatus'];
						$.assistCount=_0x549683.data['invitedNumber']||0;
						if(_0x549683.data['sendBeanNum']){
							console.log('获得'+_0x549683.data['sendBeanNum']+'豆');
							allMessage+='【账号'+$.index+'】获得'+_0x549683.data['sendBeanNum']+'豆\n';
						}
					}else if(_0x549683.errorMessage){
						if(_0x549683.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x304f2a+' '+(_0x549683.errorMessage||''));
					}else{
						console.log(_0x304f2a+' '+_0x191ac2);
					}
				}else{
					console.log(_0x304f2a+' '+_0x191ac2);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x549683=='object'){
					if(_0x549683.isOk){
						$.allOpenCard=_0x549683.openCard||false;
					}else if(_0x549683.errorMessage||_0x549683.msg){
						console.log(_0x304f2a+' '+(_0x549683.errorMessage||_0x549683.msg||''));
					}else{
						console.log(_0x304f2a+' '+_0x191ac2);
					}
				}else{
					console.log(_0x304f2a+' '+_0x191ac2);
				}
				break;
			case'getDrawRecordHasCoupon':
				if(typeof _0x549683=='object'){
					if(_0x549683.result&&_0x549683.result===true){
						console.log('我的奖品：');
						let _0x3a8510=0;
						let _0x2b7d17=0;
						let _0xa160c4={'dayShareBeans':'邀请','dayBeSharedBeans':'被邀请','openCardBeans':'开卡','saveTaskBeans23':'关注','saveTaskBeans12':'逛店铺','saveTaskBeans21':'加购'};
						for(let _0x205a26 in _0x549683.data){
							let _0x1b06eb=_0x549683.data[_0x205a26];
							if(_0x1b06eb.drawId=='dayShareBeans'){
								_0x3a8510++;
								_0x2b7d17=_0x1b06eb.infoName['replace']('京豆','');
							}else{
								console.log(''+(_0x1b06eb.infoType!=10&&_0x1b06eb.drawId&&(_0xa160c4[_0x1b06eb.drawId]||_0x1b06eb.drawId)+':'||_0x1b06eb.value&&_0x1b06eb.value+':'||'')+_0x1b06eb.infoName);
							}
						}
						if(_0x3a8510>0)console.log('邀请好友('+_0x3a8510+'):'+(_0x3a8510*parseInt(_0x2b7d17,10)||30)+'京豆');
					}else if(_0x549683.errorMessage){
						console.log(_0x304f2a+' '+(_0x549683.errorMessage||''));
					}else{
						console.log(_0x304f2a+' '+_0x191ac2);
					}
				}else{
					console.log(_0x304f2a+' '+_0x191ac2);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x549683=='object'){
					if(_0x549683.result&&_0x549683.result===true&&_0x549683.data){
						$.ShareCount=_0x549683.data['length'];
						$.log('=========== 你邀请了:'+_0x549683.data['length']+'个');
					}else if(_0x549683.errorMessage){
						console.log(_0x304f2a+' '+(_0x549683.errorMessage||''));
					}else{
						console.log(_0x304f2a+' '+_0x191ac2);
					}
				}else{
					console.log(_0x304f2a+' '+_0x191ac2);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x304f2a+'-> '+_0x191ac2);
		}
		if(typeof _0x549683=='object'){
			if(_0x549683.errorMessage){
				if(_0x549683.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x2d919b){
		console.log(_0x2d919b);
	}
}
function getPostRequest(_0x4d4a78,_0x3a5539,_0x5177de='POST'){
	let _0x2545cd={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x4d4a78.indexOf('https://lzkjdz-isv.isvjd.com')>-1){
		_0x2545cd.Referer='https://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId=2203100000178202/?helpUuid='+$.shareUuid;
		_0x2545cd.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x4d4a78,'method':_0x5177de,'headers':_0x2545cd,'body':_0x3a5539,'timeout':30000};
}
function getCk(){
	return new Promise(_0x2675b3=>{
		let _0x3572d6={'url':'https://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId=2104100001448621&InviteUuid=','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/wx/anchor/inviteJune/activity?activityId=2104100001448621&InviteUuid=','User-Agent':$.UA},'timeout':30000};
		$.get(_0x3572d6,async(_0x3f07f5,_0xe7f597,_0x297201)=>{
			try{
				if(_0x3f07f5){
					if(_0xe7f597&&typeof _0xe7f597.statusCode!='undefined'){
						if(_0xe7f597.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3f07f5));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x5648ae=_0x297201.match(/(活动已经结束)/)&&_0x297201.match(/(活动已经结束)/)[1]||'';
					if(_0x5648ae){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0xe7f597);
				}
			}catch(_0x509011){
				$.logErr(_0x509011,_0xe7f597);
			}finally{
				_0x2675b3();
			}
		});
	});
}
function setActivityCookie(_0x1c3d2d){
	if(_0x1c3d2d){
		if(_0x1c3d2d.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x416ca3 of _0x1c3d2d.headers['set-cookie']){
				lz_cookie[_0x416ca3.split(';')[0]['substr'](0,_0x416ca3.split(';')[0]['indexOf']('='))]=_0x416ca3.split(';')[0]['substr'](_0x416ca3.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x8614cd of Object.keys(lz_cookie)){
				cookie+=_0x8614cd+'='+lz_cookie[_0x8614cd]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x49bf71){
	_0x49bf71=_0x49bf71||32;
	let _0xce868e='abcdef0123456789',_0x24c144=_0xce868e.length,_0x2ae01a='';
	for(i=0;i<_0x49bf71;i++)_0x2ae01a+=_0xce868e.charAt(Math.floor(Math.random()*_0x24c144));
	return _0x2ae01a;
}
async function joinShop(){
	return new Promise(async _0x2deb2a=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x469a32='';
		if($.shopactivityId)_0x469a32=',"activityId":'+$.shopactivityId;
		const _0x334399='{"venderId":"1000014486","shopId":"1000014486","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x469a32+',"channel":406}';
		const _0x4e5893={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x334399)};
		const _0x359588=await getH5st('8adfb',_0x4e5893);
		const _0x566d1a={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x334399+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x359588),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x566d1a,async(_0x3a9f44,_0x341e18,_0x532008)=>{
			try{
				_0x532008=_0x532008&&_0x532008.match(/jsonp_.*?\((.*?)\);/)&&_0x532008.match(/jsonp_.*?\((.*?)\);/)[1]||_0x532008;
				let _0x38b6b8=$.toObj(_0x532008,_0x532008);
				if(_0x38b6b8&&typeof _0x38b6b8=='object'){
					if(_0x38b6b8&&_0x38b6b8.success===true){
						console.log(_0x38b6b8.message);
						$.errorJoinShop=_0x38b6b8.message;
						if(_0x38b6b8.result&&_0x38b6b8.result['giftInfo']){
							for(let _0x425614 of _0x38b6b8.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x425614.discountString+_0x425614.prizeName+_0x425614.secondLineDesc);
							}
						}
					}else if(_0x38b6b8&&typeof _0x38b6b8=='object'&&_0x38b6b8.message){
						$.errorJoinShop=_0x38b6b8.message;
						console.log(''+(_0x38b6b8.message||''));
					}else{
						console.log(_0x532008);
					}
				}else{
					console.log(_0x532008);
				}
			}catch(_0x293092){
				$.logErr(_0x293092,_0x341e18);
			}finally{
				_0x2deb2a();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x3263a9=>{
		let _0x27ff7b='{"venderId":"1000014486","channel":406,"payUpShop":true}';
		const _0x4a023e={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x27ff7b)};
		const _0x4897bf=await getH5st('ef79a',_0x4a023e);
		const _0xa47b2d={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x27ff7b+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x4897bf),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0xa47b2d,async(_0x188a6d,_0xe7fff3,_0x3bf1e6)=>{
			try{
				_0x3bf1e6=_0x3bf1e6&&_0x3bf1e6.match(/jsonp_.*?\((.*?)\);/)&&_0x3bf1e6.match(/jsonp_.*?\((.*?)\);/)[1]||_0x3bf1e6;
				let _0x5887f5=$.toObj(_0x3bf1e6,_0x3bf1e6);
				if(_0x5887f5&&typeof _0x5887f5=='object'){
					if(_0x5887f5&&_0x5887f5.success==true){
						console.log('入会:'+(_0x5887f5.result['shopMemberCardInfo']['venderCardName']||''));
						$.shopactivityId=_0x5887f5.result['interestsRuleList']&&_0x5887f5.result['interestsRuleList'][0]&&_0x5887f5.result['interestsRuleList'][0]['interestsInfo']&&_0x5887f5.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x3bf1e6);
				}
			}catch(_0xd51364){
				$.logErr(_0xd51364,_0xe7fff3);
			}finally{
				_0x3263a9();
			}
		});
	});
}
function getAuthorCodeList(_0x29732d){
	return new Promise(_0x3eb7ae=>{
		const _0x5c5c04={'url':_0x29732d+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x5c5c04,async(_0x11d5eb,_0x38471b,_0x422741)=>{
			try{
				if(_0x11d5eb){
					$.log(_0x11d5eb);
				}else{
					if(_0x422741)_0x422741=JSON.parse(_0x422741);
				}
			}catch(_0x586fd4){
				$.logErr(_0x586fd4,_0x38471b);
				_0x422741=null;
			}finally{
				_0x3eb7ae(_0x422741);
			}
		});
	});
};