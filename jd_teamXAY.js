/*
组队分豆-新安怡 [jd_teamXAY.js]

————————————————
IOS等用户直接用NobyDa的jd cookie
============Quantumultx===============
[task_local]
#组队分豆-新安怡
1 1 1 1 * https://raw.githubusercontent.com/KingRan/KR/main/jd_teamXAY.js, tag=组队分豆-新安怡, enabled=true
================Loon==============
[Script]
cron "1 1 1 1 *" script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamXAY.js,tag=组队分豆-新安怡
===============Surge=================
组队分豆-新安怡 = type=cron,cronexp="1 1 1 1 *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamXAY.js
============小火箭=========
组队分豆-新安怡 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamXAY.js, cronexpr="1 1 1 1 *", timeout=3600, enable=true
*/
const Env=require('./utils/Env.js');
const $=new Env("新安怡组队分豆-加密");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjcloud.com';
let cookiesArr=[],cookie='',message='';
let ownCode=null;
let activityCookie='';
lz_cookie={};
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x411ac5=>{
		cookiesArr.push(jdCookieNode[_0x411ac5]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=JSON.parse(cookiesData);
	cookiesArr=cookiesData.map(_0x4dca4d=>_0x4dca4d.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(_0x3ef413=>!!_0x3ef413);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	authorCodeList=[]//await getAuthorCodeList('http://code.kingran.ga/xay.json');
	console.log('\n此活动需要新加入会员店铺才能加入队伍，\n若已经入会过，则无法重复入队。');
	console.log('\n瓜分入口:\nhttps://lzkjdz-isv.isvjcloud.com/pool/captain/4330568?activityId=d923d226bc734984a11d450912de6297');
	for(let _0x5339d6=0;_0x5339d6<cookiesArr.length;_0x5339d6++){
		if(cookiesArr[_0x5339d6]){
			cookie=cookiesArr[_0x5339d6];
			originCookie=cookiesArr[_0x5339d6];
			newCookie='';
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=_0x5339d6+1;
			$.isLogin=true;
			$.nickName='';
			await checkCookie();
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			$.ADID=getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',1);
			$.UUID=getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
			$.authorCode=ownCode?ownCode:authorCodeList[random(0,authorCodeList.length)];
			$.authorNum=''+random(1000000,9999999);
			$.activityId='d923d226bc734984a11d450912de6297';
			$.activityShopId='1000002527';
			$.activityUrls='https://lzkjdz-isv.isvjcloud.com/';
			$.activityUrl='https://lzkjdz-isv.isvjcloud.com/pool/captain/'+$.authorNum+'?activityId='+$.activityId+'&signUuid='+encodeURIComponent($.authorCode)+'&adsource=null&shareuserid4minipg=null&shopid='+$.activityShopId+'&lng=00.000000&lat=00.000000&sid=&un_area=';
			await getUA();
			await xay();
			await $.wait(4000);
		}
	}
	if(message!==''){
		if($.isNode()){
			await notify.sendNotify($.name,message,'','\n');
		}else{
			$.msg($.name,'有点儿收获',message);
		}
	}
})()['catch'](_0x38d9ed=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x38d9ed+'!','');
})['finally'](()=>{
	$.done();
});
async function xay(){
	$.token=null;
	$.secretPin=null;
	$.openCardActivityId=null;
	await getFirstLZCK();
	$.token=await getToken(cookie,domains);
	if($.token==''){
		console.log('获取[token]失败！');
		return;
	}
	await task('customer/getSimpleActInfoVo','activityId='+$.activityId);
	await $.wait(2000);
	if($.token){
		await getMyPing();
		if($.secretPin){
			console.log('加入队伍：'+$.authorCode);
			await task('common/accessLogWithAD','venderId='+$.activityShopId+'&code=46&pin='+encodeURIComponent($.secretPin)+'&activityId='+$.activityId+'&pageUrl='+$.activityUrl+'&subType=app&adSource=null');
			await $.wait(2000);
			await task('pool/activityContent','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&signUuid='+encodeURIComponent($.authorCode));
			if($.activityContent){
				if($.activityContent['canJoin']){
					$.log('加入队伍成功，请等待队长瓜分京豆');
					await $.wait(2000);
					await task('pool/saveCandidate','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&signUuid='+encodeURIComponent($.authorCode)+'&pinImg='+encodeURIComponent('https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg'));
					$.log('加入会员');
					$.errorJoinShop='';
					await joinShop();
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('尝试第一次 重新开卡');
						await $.wait(500);
						await joinShop();
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('尝试第二次 重新开卡');
						await $.wait(500);
						await joinShop();
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('尝试第三次 重新开卡');
						await $.wait(500);
						await joinShop();
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('抱歉，开卡不成功 ，请重新运行脚本');
					}
					await $.wait(2000);
					await task('pool/activityContent','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&signUuid='+encodeURIComponent($.authorCode));
					await $.wait(2000);
					if($.index===1){
						if($.activityContent['canCreate']){
							$.log('创建队伍');
							await $.wait(2000);
							await task('pool/saveCaptain','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&pinImg='+encodeURIComponent('https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg'));
							console.log('队伍ID：'+ownCode);
						}
					}
				}else{
					if($.index===1){
						$.log('创建队伍');
						if($.activityContent['canCreate']){
							await $.wait(2000);
							await task('pool/saveCaptain','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&pinImg='+encodeURIComponent('https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg'));
							console.log('队伍ID：'+ownCode);
						}else{
							ownCode=$.activityContent['signUuid'];
							console.log('队伍ID：'+ownCode);
						}
					}else{
						$.log('你已经是店铺会员了，无法加入队伍！');
					}
				}
			}
		}else{
			$.log('没有成功获取到用户信息');
		}
	}else{
		$.log('没有成功获取到用户鉴权信息');
	}
}
function task(_0x1d7d19,_0x2a810a){
	return new Promise(_0x4b2875=>{
		$.post(taskUrl(_0x1d7d19,_0x2a810a),async(_0x28afe4,_0x5c86f4,_0x4e25b0)=>{
			try{
				if(_0x28afe4){
					$.log(_0x28afe4);
				}else{
					setActivityCookie(_0x5c86f4);
					if(_0x4e25b0){
						_0x4e25b0=JSON.parse(_0x4e25b0);
						if(_0x4e25b0.result){
							switch(_0x1d7d19){
								case 'pool/saveCaptain':
									if(_0x4e25b0.data['signUuid']){
										$.log('创建队伍成功');
										if($.index===1){
											ownCode=_0x4e25b0.data['signUuid'];
										}
									}
									break;
								case 'common/getSimpleActInfoVo':
									$.jdActivityId=_0x4e25b0.data['jdActivityId'];
									$.venderId=_0x4e25b0.data['venderId'];
									break;
								case 'wxActionCommon/getUserInfo':
									$.nickname=_0x4e25b0.data['nickname'];
									$.pinImg='https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
									break;
								case 'pool/activityContent':
									$.activityContent=_0x4e25b0.data;
									$.openCard=_0x4e25b0.data['openCard'];
									if($.index===1){
										ownCode=_0x4e25b0.data['signUuid'];
									}
									break;
								case 'pool/updateCaptain':
									console.log(_0x4e25b0.data);
									break;
								default:
									break;
							}
						}else{
							$.log(JSON.stringify(_0x4e25b0));
						}
					}else{}
				}
			}catch(_0x7fa07e){
				$.log(_0x7fa07e);
			}finally{
				_0x4b2875();
			}
		});
	});
}
async function joinShop(){
	return new Promise(async _0x5ea779=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x3e85a1='';
		if($.shopactivityId)_0x3e85a1=',"activityId":'+$.shopactivityId;
		const _0x5bf12a='{"venderId":"1000002527","shopId":"1000002527","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x3e85a1+',"channel":406}';
		const _0x2ab8ea={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x5bf12a)};
		const _0x1ff95f=await getH5st('8adfb',_0x2ab8ea);
		const _0x287322={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x5bf12a+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1ff95f),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x287322,async(_0x243d30,_0xce78e,_0x2d0ed3)=>{
			try{
				_0x2d0ed3=_0x2d0ed3&&_0x2d0ed3.match(/jsonp_.*?\((.*?)\);/)&&_0x2d0ed3.match(/jsonp_.*?\((.*?)\);/)[1]||_0x2d0ed3;
				let _0x208e25=$.toObj(_0x2d0ed3,_0x2d0ed3);
				if(_0x208e25&&typeof _0x208e25=='object'){
					if(_0x208e25&&_0x208e25.success===true){
						console.log(_0x208e25.message);
						$.errorJoinShop=_0x208e25.message;
						if(_0x208e25.result&&_0x208e25.result['giftInfo']){
							for(let _0x15ba63 of _0x208e25.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x15ba63.discountString+_0x15ba63.prizeName+_0x15ba63.secondLineDesc);
							}
						}
					}else if(_0x208e25&&typeof _0x208e25=='object'&&_0x208e25.message){
						$.errorJoinShop=_0x208e25.message;
						console.log(''+(_0x208e25.message||''));
					}else{
						console.log(_0x2d0ed3);
					}
				}else{
					console.log(_0x2d0ed3);
				}
			}catch(_0xbf4701){
				$.logErr(_0xbf4701,_0xce78e);
			}finally{
				_0x5ea779();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x50659b=>{
		let _0x19eaf6='{"venderId":"1000002527","channel":406,"payUpShop":true}';
		const _0x5d805d={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x19eaf6)};
		const _0x22b3b9=await getH5st('ef79a',_0x5d805d);
		const _0x58cc76={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x19eaf6+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x22b3b9),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x58cc76,async(_0x58c061,_0x3487eb,_0x177df8)=>{
			try{
				_0x177df8=_0x177df8&&_0x177df8.match(/jsonp_.*?\((.*?)\);/)&&_0x177df8.match(/jsonp_.*?\((.*?)\);/)[1]||_0x177df8;
				let _0x4fa9b1=$.toObj(_0x177df8,_0x177df8);
				if(_0x4fa9b1&&typeof _0x4fa9b1=='object'){
					if(_0x4fa9b1&&_0x4fa9b1.success==true){
						console.log('入会:'+(_0x4fa9b1.result['shopMemberCardInfo']['venderCardName']||''));
						$.shopactivityId=_0x4fa9b1.result['interestsRuleList']&&_0x4fa9b1.result['interestsRuleList'][0]&&_0x4fa9b1.result['interestsRuleList'][0]['interestsInfo']&&_0x4fa9b1.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x177df8);
				}
			}catch(_0x53bef2){
				$.logErr(_0x53bef2,_0x3487eb);
			}finally{
				_0x50659b();
			}
		});
	});
}
function getH5st(_0x3f6a41,_0x478b7f){
	return new Promise(async _0x54f28c=>{
		let _0x515901={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x3f6a41+'&req='+encodeURIComponent(JSON.stringify(_0x478b7f)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x515901,(_0x18cdc3,_0x222d8c,_0x499f82)=>{
			try{
				if(_0x18cdc3){
					console.log(JSON.stringify(_0x18cdc3));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x32dbd6){
				$.logErr(_0x32dbd6,_0x222d8c);
			}finally{
				_0x54f28c(_0x499f82);
			}
		});
	});
}
function taskUrl(_0x2394ed,_0x2fa139){
	return{'url':''+$.activityUrls+_0x2394ed,'headers':{'Host':'lzkjdz-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkjdz-isv.isvjcloud.comm','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie+activityCookie+';IsvToken='+$.Token+';AUTH_C_USER='+$.AUTH_C_USER},'body':_0x2fa139};
}
function getMyPing(){
	let _0xcce2c5={'url':'https://lzkjdz-isv.isvjcloud.com/customer/getMyPing','headers':{'Host':'lzkjdz-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkjdz-isv.isvjcloud.com','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':'userId='+$.activityShopId+'&token='+$.token+'&fromType=APP&riskType=1'};
	return new Promise(_0x1b3cc2=>{
		$.post(_0xcce2c5,(_0xe962a0,_0x354551,_0x4cf162)=>{
			try{
				if(_0xe962a0){
					$.log(_0xe962a0);
				}else{
					setActivityCookie(_0x354551);
					if(_0x4cf162){
						_0x4cf162=JSON.parse(_0x4cf162);
						if(_0x4cf162.result){
							$.log('用户名：'+_0x4cf162.data['nickname']);
							$.pin=_0x4cf162.data['nickname'];
							$.secretPin=_0x4cf162.data['secretPin'];
							cookie=cookie+';AUTH_C_USER='+_0x4cf162.data['secretPin'];
						}else{
							$.log(_0x4cf162.errorMessage);
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x591554){
				$.log(_0x591554);
			}finally{
				_0x1b3cc2();
			}
		});
	});
}
function getFirstLZCK(){
	return new Promise(_0x1ecb7c=>{
		$.get({'url':$.activityUrl,'headers':{'user-agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}},(_0x96b9a4,_0x3c76f1,_0x56abc2)=>{
			try{
				if(_0x96b9a4){
					console.log(_0x96b9a4);
				}else{
					setActivityCookie(_0x3c76f1);
				}
			}catch(_0x29316e){
				console.log(_0x29316e);
			}finally{
				_0x1ecb7c();
			}
		});
	});
}
function random(_0x5736df,_0x1dee60){
	return Math.floor(Math.random()*(_0x1dee60-_0x5736df))+_0x5736df;
}
function getUUID(_0x2e6c65='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',_0x1eded7=0){
	return _0x2e6c65.replace(/[xy]/g,function(_0x4b90a5){
		var _0x20948c=Math.random()*0x10|0x0,_0x123d81=_0x4b90a5=='x'?_0x20948c:_0x20948c&0x3|0x8;
		if(_0x1eded7){
			uuid=_0x123d81.toString(36)['toUpperCase']();
		}else{
			uuid=_0x123d81.toString(36);
		}
		return uuid;
	});
}
function checkCookie(){
	const _0x40fdff={'url':'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion','headers':{'Host':'me-api.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1','Accept-Language':'zh-cn','Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':'gzip, deflate, br'}};
	return new Promise(_0x48b9a3=>{
		$.get(_0x40fdff,(_0xfd2351,_0x4bec61,_0x2c2d0a)=>{
			try{
				if(_0xfd2351){
					$.logErr(_0xfd2351);
				}else{
					if(_0x2c2d0a){
						_0x2c2d0a=JSON.parse(_0x2c2d0a);
						if(_0x2c2d0a.retcode==='1001'){
							$.isLogin=false;
							return;
						}
						if(_0x2c2d0a.retcode==='0'&&_0x2c2d0a.data['hasOwnProperty']('userInfo')){
							$.nickName=_0x2c2d0a.data['userInfo']['baseInfo']['nickname'];
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x59814b){
				$.logErr(_0x59814b);
			}finally{
				_0x48b9a3();
			}
		});
	});
}
function setActivityCookie(_0x40be10){
	if(_0x40be10){
		if(_0x40be10.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x47b10c of _0x40be10.headers['set-cookie']){
				lz_cookie[_0x47b10c.split(';')[0]['substr'](0,_0x47b10c.split(';')[0]['indexOf']('='))]=_0x47b10c.split(';')[0]['substr'](_0x47b10c.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x197b3c of Object.keys(lz_cookie)){
				cookie+=_0x197b3c+'='+lz_cookie[_0x197b3c]+';';
			}
			activityCookie=cookie;
		}
	}
}
function getAuthorCodeList(_0x2d6912){
	return new Promise(_0x2858e9=>{
		const _0x313658={'url':_0x2d6912+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x313658,async(_0x46ba97,_0x2e747d,_0x4cda28)=>{
			try{
				if(_0x46ba97){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x4cda28)_0x4cda28=JSON.parse(_0x4cda28);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x3e3766){
				$.logErr(_0x3e3766,_0x2e747d);
				_0x4cda28=null;
			}finally{
				_0x2858e9(_0x4cda28);
			}
		});
	});
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x1bbbb9){
	_0x1bbbb9=_0x1bbbb9||32;
	let _0x2fb031='abcdef0123456789',_0x4331b8=_0x2fb031.length,_0x155098='';
	for(i=0;i<_0x1bbbb9;i++)_0x155098+=_0x2fb031.charAt(Math.floor(Math.random()*_0x4331b8));
	return _0x155098;
};

// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);