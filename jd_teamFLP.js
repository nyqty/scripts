/*
组队分豆-飞利浦 [jd_teamFLP.js]

变量：export jd_teamFLP_activityId='活动ID'

————————————————
IOS等用户直接用NobyDa的jd cookie
============Quantumultx===============
[task_local]
#组队分豆-飞利浦
11 11 11 11 ** https://raw.githubusercontent.com/KingRan/KR/main/jd_teamFLP.js, tag=组队分豆-飞利浦, enabled=true
================Loon==============
[Script]
cron "11 11 11 11 **" script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamFLP.js,tag=组队分豆-飞利浦
===============Surge=================
组队分豆-飞利浦 = type=cron,cronexp="11 11 11 11 **",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamFLP.js
============小火箭=========
组队分豆-飞利浦 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamFLP.js, cronexpr="11 11 11 11 **", timeout=3600, enable=true
*/
const Env=require('./utils/Env.js');
const $=new Env("飞利浦组队分豆-加密");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjd.com';
let cookiesArr=[],cookie='',message='';
let ownCode=null;
let activityCookie='',
activityId=process.env['jd_teamFLP_activityId']||"5e42f78ad4a54d6db9c7347463a092ee",
lz_cookie={};
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x309ea8=>{
		cookiesArr.push(jdCookieNode[_0x309ea8]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=JSON.parse(cookiesData);
	cookiesArr=cookiesData.map(_0x58dc55=>_0x58dc55.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(_0x57099a=>!!_0x57099a);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	if(!activityId){
		console.log('\n活动id不存在！\n');
		console.log('请填写变量：export jd_teamFLP_activityId=\'活动ID\'\n');
		return;
	}
	authorCodeList=["65bfa445ec834c379c8249963ce29eb1"]//await getAuthorCodeList('http://code.kingran.ga/flp.json');
	console.log('\n此活动需要新加入会员店铺才能加入队伍，\n若已经入会过，则无法重复入队。');
	console.log('\n瓜分入口:\nhttps://lzkjdz-isv.isvjd.com/pool/captain/4471266?activityId='+activityId);
	for(let _0xbf0c3c=0;_0xbf0c3c<cookiesArr.length;_0xbf0c3c++){
		if(cookiesArr[_0xbf0c3c]){
			cookie=cookiesArr[_0xbf0c3c];
			originCookie=cookiesArr[_0xbf0c3c];
			newCookie='';
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=_0xbf0c3c+1;
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
			$.activityId=activityId;
			$.activityShopId='1000003691';
			$.activityUrls='https://lzkjdz-isv.isvjd.com/';
			$.activityUrl='https://lzkjdz-isv.isvjd.com/pool/captain/'+$.authorNum+'?activityId='+$.activityId+'&signUuid='+encodeURIComponent($.authorCode)+'&adsource=null&shareuserid4minipg=null&shopid='+$.activityShopId+'&lng=00.000000&lat=00.000000&sid=&un_area=';
			await getUA();
			await flp();
			await $.wait(5000);
		}
	}
	if(message!==''){
		if($.isNode()){
			await notify.sendNotify($.name,message,'','\n');
		}else{
			$.msg($.name,'有点儿收获',message);
		}
	}
})()['catch'](_0xe3c151=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0xe3c151+'!','');
})['finally'](()=>{
	$.done();
});
async function flp(){
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
function task(_0xb23d23,_0x7a120c){
	return new Promise(_0xdb611e=>{
		$.post(taskUrl(_0xb23d23,_0x7a120c),async(_0x30265f,_0x1c189f,_0x13e973)=>{
			try{
				if(_0x30265f){
					$.log(_0x30265f);
				}else{
					setActivityCookie(_0x1c189f);
					if(_0x13e973){
						_0x13e973=JSON.parse(_0x13e973);
						if(_0x13e973.result){
							switch(_0xb23d23){
								case 'pool/saveCaptain':
									if(_0x13e973.data['signUuid']){
										$.log('创建队伍成功');
										if($.index===1){
											ownCode=_0x13e973.data['signUuid'];
										}
									}
									break;
								case 'common/getSimpleActInfoVo':
									$.jdActivityId=_0x13e973.data['jdActivityId'];
									$.venderId=_0x13e973.data['venderId'];
									break;
								case 'wxActionCommon/getUserInfo':
									$.nickname=_0x13e973.data['nickname'];
									$.pinImg='https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
									break;
								case 'pool/activityContent':
									$.activityContent=_0x13e973.data;
									$.openCard=_0x13e973.data['openCard'];
									if($.index===1){
										ownCode=_0x13e973.data['signUuid'];
									}
									break;
								case 'pool/updateCaptain':
									console.log(_0x13e973.data);
									break;
								default:
									break;
							}
						}else{
							$.log(JSON.stringify(_0x13e973));
						}
					}else{}
				}
			}catch(_0x3ae5f2){
				$.log(_0x3ae5f2);
			}finally{
				_0xdb611e();
			}
		});
	});
}
async function joinShop(){
	return new Promise(async _0x2a827a=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x594b35='';
		if($.shopactivityId)_0x594b35=',"activityId":'+$.shopactivityId;
		const _0x1a5117='{"venderId":"1000003691","shopId":"1000003691","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x594b35+',"channel":406}';
		const _0xc21d3d={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x1a5117)};
		const _0x4f8f2d=await getH5st('8adfb',_0xc21d3d);
		const _0x19dc45={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x1a5117+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x4f8f2d),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x19dc45,async(_0x36130e,_0x1fd1ad,_0x2cf4fc)=>{
			try{
				_0x2cf4fc=_0x2cf4fc&&_0x2cf4fc.match(/jsonp_.*?\((.*?)\);/)&&_0x2cf4fc.match(/jsonp_.*?\((.*?)\);/)[1]||_0x2cf4fc;
				let _0x575618=$.toObj(_0x2cf4fc,_0x2cf4fc);
				if(_0x575618&&typeof _0x575618=='object'){
					if(_0x575618&&_0x575618.success===true){
						console.log(_0x575618.message);
						$.errorJoinShop=_0x575618.message;
						if(_0x575618.result&&_0x575618.result['giftInfo']){
							for(let _0x36f9b7 of _0x575618.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x36f9b7.discountString+_0x36f9b7.prizeName+_0x36f9b7.secondLineDesc);
							}
						}
					}else if(_0x575618&&typeof _0x575618=='object'&&_0x575618.message){
						$.errorJoinShop=_0x575618.message;
						console.log(''+(_0x575618.message||''));
					}else{
						console.log(_0x2cf4fc);
					}
				}else{
					console.log(_0x2cf4fc);
				}
			}catch(_0x445dfd){
				$.logErr(_0x445dfd,_0x1fd1ad);
			}finally{
				_0x2a827a();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x49d2bf=>{
		let _0x2e5f96='{"venderId":"1000003691","channel":406,"payUpShop":true}';
		const _0x30ff42={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x2e5f96)};
		const _0x3d88e8=await getH5st('ef79a',_0x30ff42);
		const _0x14a634={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x2e5f96+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x3d88e8),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x14a634,async(_0x4d75ad,_0x385101,_0x52560d)=>{
			try{
				_0x52560d=_0x52560d&&_0x52560d.match(/jsonp_.*?\((.*?)\);/)&&_0x52560d.match(/jsonp_.*?\((.*?)\);/)[1]||_0x52560d;
				let _0x4cb7fc=$.toObj(_0x52560d,_0x52560d);
				if(_0x4cb7fc&&typeof _0x4cb7fc=='object'){
					if(_0x4cb7fc&&_0x4cb7fc.success==true){
						console.log('入会:'+(_0x4cb7fc.result['shopMemberCardInfo']['venderCardName']||''));
						$.shopactivityId=_0x4cb7fc.result['interestsRuleList']&&_0x4cb7fc.result['interestsRuleList'][0]&&_0x4cb7fc.result['interestsRuleList'][0]['interestsInfo']&&_0x4cb7fc.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x52560d);
				}
			}catch(_0x3dd6ed){
				$.logErr(_0x3dd6ed,_0x385101);
			}finally{
				_0x49d2bf();
			}
		});
	});
}
function getH5st(_0x404569,_0x72d5b5){
	return new Promise(async _0x4fa961=>{
		let _0x5deb06={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x404569+'&req='+encodeURIComponent(JSON.stringify(_0x72d5b5)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x5deb06,(_0x8b06ed,_0x34e83c,_0x14fe84)=>{
			try{
				if(_0x8b06ed){
					console.log(JSON.stringify(_0x8b06ed));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x434f7b){
				$.logErr(_0x434f7b,_0x34e83c);
			}finally{
				_0x4fa961(_0x14fe84);
			}
		});
	});
}
function taskUrl(_0x33784c,_0x2a48c2){
	return{'url':''+$.activityUrls+_0x33784c,'headers':{'Host':'lzkjdz-isv.isvjd.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkjdz-isv.isvjd.comm','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie+activityCookie+';IsvToken='+$.Token+';AUTH_C_USER='+$.AUTH_C_USER},'body':_0x2a48c2};
}
function getMyPing(){
	let _0x253d53={'url':'https://lzkjdz-isv.isvjd.com/customer/getMyPing','headers':{'Host':'lzkjdz-isv.isvjd.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkjdz-isv.isvjd.com','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':'userId='+$.activityShopId+'&token='+$.token+'&fromType=APP&riskType=1'};
	return new Promise(_0x482330=>{
		$.post(_0x253d53,(_0x1691ee,_0x678df7,_0xfa6d13)=>{
			try{
				if(_0x1691ee){
					$.log(_0x1691ee);
				}else{
					setActivityCookie(_0x678df7);
					if(_0xfa6d13){
						_0xfa6d13=JSON.parse(_0xfa6d13);
						if(_0xfa6d13.result){
							$.log('用户名：'+_0xfa6d13.data['nickname']);
							$.pin=_0xfa6d13.data['nickname'];
							$.secretPin=_0xfa6d13.data['secretPin'];
							cookie=cookie+';AUTH_C_USER='+_0xfa6d13.data['secretPin'];
						}else{
							$.log(_0xfa6d13.errorMessage);
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x1c0efa){
				$.log(_0x1c0efa);
			}finally{
				_0x482330();
			}
		});
	});
}
function getFirstLZCK(){
	return new Promise(_0x1cb28a=>{
		$.get({'url':$.activityUrl,'headers':{'user-agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}},(_0x16ffea,_0x1c07bc,_0x40ef98)=>{
			try{
				if(_0x16ffea){
					console.log(_0x16ffea);
				}else{
					setActivityCookie(_0x1c07bc);
				}
			}catch(_0x4b3c72){
				console.log(_0x4b3c72);
			}finally{
				_0x1cb28a();
			}
		});
	});
}
function random(_0x5b7ed0,_0x232dd0){
	return Math.floor(Math.random()*(_0x232dd0-_0x5b7ed0))+_0x5b7ed0;
}
function getUUID(_0x1bc1ee='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',_0x2396f2=0){
	return _0x1bc1ee.replace(/[xy]/g,function(_0x5050fd){
		var _0x1d1a10=Math.random()*0x10|0x0,_0x5a0a19=_0x5050fd=='x'?_0x1d1a10:_0x1d1a10&0x3|0x8;
		if(_0x2396f2){
			uuid=_0x5a0a19.toString(36)['toUpperCase']();
		}else{
			uuid=_0x5a0a19.toString(36);
		}
		return uuid;
	});
}
function checkCookie(){
	const _0x12db36={'url':'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion','headers':{'Host':'me-api.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1','Accept-Language':'zh-cn','Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':'gzip, deflate, br'}};
	return new Promise(_0x3ed4f9=>{
		$.get(_0x12db36,(_0x2d770a,_0x5448fe,_0x939960)=>{
			try{
				if(_0x2d770a){
					$.logErr(_0x2d770a);
				}else{
					if(_0x939960){
						_0x939960=JSON.parse(_0x939960);
						if(_0x939960.retcode==='1001'){
							$.isLogin=false;
							return;
						}
						if(_0x939960.retcode==='0'&&_0x939960.data['hasOwnProperty']('userInfo')){
							$.nickName=_0x939960.data['userInfo']['baseInfo']['nickname'];
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x479ccf){
				$.logErr(_0x479ccf);
			}finally{
				_0x3ed4f9();
			}
		});
	});
}
function setActivityCookie(_0x4c2c80){
	if(_0x4c2c80){
		if(_0x4c2c80.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x3508da of _0x4c2c80.headers['set-cookie']){
				lz_cookie[_0x3508da.split(';')[0]['substr'](0,_0x3508da.split(';')[0]['indexOf']('='))]=_0x3508da.split(';')[0]['substr'](_0x3508da.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x599acc of Object.keys(lz_cookie)){
				cookie+=_0x599acc+'='+lz_cookie[_0x599acc]+';';
			}
			activityCookie=cookie;
		}
	}
}
function getAuthorCodeList(_0xd46d68){
	return new Promise(_0x22789c=>{
		const _0x385afe={'url':_0xd46d68+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x385afe,async(_0x13ca9c,_0x323a87,_0x2dc2bb)=>{
			try{
				if(_0x13ca9c){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x2dc2bb)_0x2dc2bb=JSON.parse(_0x2dc2bb);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x6693e7){
				$.logErr(_0x6693e7,_0x323a87);
				_0x2dc2bb=null;
			}finally{
				_0x22789c(_0x2dc2bb);
			}
		});
	});
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x48367b){
	_0x48367b=_0x48367b||32;
	let _0x304470='abcdef0123456789',_0x254477=_0x304470.length,_0x10c425='';
	for(i=0;i<_0x48367b;i++)_0x10c425+=_0x304470.charAt(Math.floor(Math.random()*_0x254477));
	return _0x10c425;
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);