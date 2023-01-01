/*
组队分豆-安佳 [jd_teamAJ.js]

————————————————
入口：[组队分豆-安佳]
IOS等用户直接用NobyDa的jd cookie
============Quantumultx===============
[task_local]
#组队分豆-安佳
1 1 1 1 * https://raw.githubusercontent.com/KingRan/KR/main/jd_teamAJ.js, tag=组队分豆-安佳, enabled=true
================Loon==============
[Script]
cron "1 1 1 1 *" script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamAJ.js,tag=组队分豆-安佳
===============Surge=================
组队分豆-安佳 = type=cron,cronexp="1 1 1 1 *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamAJ.js
============小火箭=========
组队分豆-安佳 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_teamAJ.js, cronexpr="1 1 1 1 *", timeout=3600, enable=true
*/
const Env=require('./utils/Env.js');
const $=new Env("安佳组队分豆");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://lzkjdz-isv.isvjcloud.com';
let cookiesArr=[],cookie='',message='';
let ownCode=null;
let activityCookie='';
lz_cookie={};
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x1c7e7b=>{
		cookiesArr.push(jdCookieNode[_0x1c7e7b]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=JSON.parse(cookiesData);
	cookiesArr=cookiesData.map(_0x4c7f22=>_0x4c7f22.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(_0x774094=>!!_0x774094);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	authorCodeList=["3907e0df4cec4f68ae0656e6c361be62"];//await getAuthorCodeList('http://code.kingran.ga/aj.json');
	console.log('\n此活动需要新加入会员店铺才能加入队伍，\n若已经入会过，则无法重复入队，\n瓜分限制20组，请自行换号运行。\n瓜分入口:\nhttps://lzkjdz-isv.isvjcloud.com/pool/captain/4471266?activityId=36cc0f18d3eb4e178f2a3632f7af1c14');
	for(let _0xc9e228=0;_0xc9e228<cookiesArr.length;_0xc9e228++){
		if(cookiesArr[_0xc9e228]){
			cookie=cookiesArr[_0xc9e228];
			originCookie=cookiesArr[_0xc9e228];
			newCookie='';
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=_0xc9e228+1;
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
			$.activityId='36cc0f18d3eb4e178f2a3632f7af1c14';
			$.activityShopId='1000014486';
			$.activityUrls='https://lzkjdz-isv.isvjcloud.com/';
			$.activityUrl='https://lzkjdz-isv.isvjcloud.com/pool/captain/'+$.authorNum+'?activityId='+$.activityId+'&signUuid='+encodeURIComponent($.authorCode)+'&adsource=null&shareuserid4minipg=null&shopid='+$.activityShopId+'&lng=00.000000&lat=00.000000&sid=&un_area=';
			await getUA();
			await aj();
			await $.wait(3000);
		}
	}
	if(message!==''){
		if($.isNode()){
			await notify.sendNotify($.name,message,'','\n');
		}else{
			$.msg($.name,'有点儿收获',message);
		}
	}
})()['catch'](_0x48e406=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x48e406+'!','');
})['finally'](()=>{
	$.done();
});
async function aj(){
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
function task(_0x30d076,_0x4a7a7e){
	return new Promise(_0xbe7153=>{
		$.post(taskUrl(_0x30d076,_0x4a7a7e),async(_0x111aaf,_0x5c3547,_0x65b529)=>{
			try{
				if(_0x111aaf){
					$.log(_0x111aaf);
				}else{
					setActivityCookie(_0x5c3547);
					if(_0x65b529){
						_0x65b529=JSON.parse(_0x65b529);
						if(_0x65b529.result){
							switch(_0x30d076){
								case 'pool/saveCaptain':
									if(_0x65b529.data['signUuid']){
										$.log('创建队伍成功');
										if($.index===1){
											ownCode=_0x65b529.data['signUuid'];
										}
									}
									break;
								case 'common/getSimpleActInfoVo':
									$.jdActivityId=_0x65b529.data['jdActivityId'];
									$.venderId=_0x65b529.data['venderId'];
									break;
								case 'wxActionCommon/getUserInfo':
									$.nickname=_0x65b529.data['nickname'];
									$.pinImg='https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
									break;
								case'pool/activityContent':
									$.activityContent=_0x65b529.data;
									$.openCard=_0x65b529.data['openCard'];
									if($.index===1){
										ownCode=_0x65b529.data['signUuid'];
									}
									break;
								case 'pool/updateCaptain':
									console.log(_0x65b529.data);
									break;
								default:
									break;
							}
						}else{
							$.log(JSON.stringify(_0x65b529));
						}
					}else{}
				}
			}catch(_0x522b7b){
				$.log(_0x522b7b);
			}finally{
				_0xbe7153();
			}
		});
	});
}
async function joinShop(){
	return new Promise(async _0x41de40=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x3f1b89='';
		if($.shopactivityId)_0x3f1b89=',"activityId":'+$.shopactivityId;
		const _0x24395c='{"venderId":"1000014486","shopId":"1000014486","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x3f1b89+',"channel":406}';
		const _0x1b497e={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x24395c)};
		const _0x46e9c9=await getH5st('8adfb',_0x1b497e);
		const _0x807be7={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x24395c+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x46e9c9),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x807be7,async(_0x43652b,_0x117806,_0xb3fa0a)=>{
			try{
				_0xb3fa0a=_0xb3fa0a&&_0xb3fa0a.match(/jsonp_.*?\((.*?)\);/)&&_0xb3fa0a.match(/jsonp_.*?\((.*?)\);/)[1]||_0xb3fa0a;
				let _0x1e4b03=$.toObj(_0xb3fa0a,_0xb3fa0a);
				if(_0x1e4b03&&typeof _0x1e4b03=='object'){
					if(_0x1e4b03&&_0x1e4b03.success===true){
						console.log(_0x1e4b03.message);
						$.errorJoinShop=_0x1e4b03.message;
						if(_0x1e4b03.result&&_0x1e4b03.result['giftInfo']){
							for(let _0x39fbd3 of _0x1e4b03.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x39fbd3.discountString+_0x39fbd3.prizeName+_0x39fbd3.secondLineDesc);
							}
						}
					}else if(_0x1e4b03&&typeof _0x1e4b03=='object'&&_0x1e4b03.message){
						$.errorJoinShop=_0x1e4b03.message;
						console.log(''+(_0x1e4b03.message||''));
					}else{
						console.log(_0xb3fa0a);
					}
				}else{
					console.log(_0xb3fa0a);
				}
			}catch(_0x55dfa0){
				$.logErr(_0x55dfa0,_0x117806);
			}finally{
				_0x41de40();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x57bd3c=>{
		let _0x429303='{"venderId":"1000014486","channel":406,"payUpShop":true}';
		const _0x5964df={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x429303)};
		const _0x546212=await getH5st('ef79a',_0x5964df);
		const _0x4db792={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x429303+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x546212),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x4db792,async(_0x27c183,_0x236cee,_0xa8fd9f)=>{
			try{
				_0xa8fd9f=_0xa8fd9f&&_0xa8fd9f.match(/jsonp_.*?\((.*?)\);/)&&_0xa8fd9f.match(/jsonp_.*?\((.*?)\);/)[1]||_0xa8fd9f;
				let _0x285d39=$.toObj(_0xa8fd9f,_0xa8fd9f);
				if(_0x285d39&&typeof _0x285d39=='object'){
					if(_0x285d39&&_0x285d39.success==true){
						console.log('入会:'+(_0x285d39.result['shopMemberCardInfo']['venderCardName']||''));
						$.shopactivityId=_0x285d39.result['interestsRuleList']&&_0x285d39.result['interestsRuleList'][0]&&_0x285d39.result['interestsRuleList'][0]['interestsInfo']&&_0x285d39.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0xa8fd9f);
				}
			}catch(_0x137dbf){
				$.logErr(_0x137dbf,_0x236cee);
			}finally{
				_0x57bd3c();
			}
		});
	});
}
function taskUrl(_0x3bd7bd,_0x3b6a44){
	return{'url':''+$.activityUrls+_0x3bd7bd,'headers':{'Host':'lzkjdz-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkjdz-isv.isvjcloud.comm','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie+activityCookie+';IsvToken='+$.Token+';AUTH_C_USER='+$.AUTH_C_USER},'body':_0x3b6a44};
}
function getMyPing(){
	let _0x19401e={'url':'https://lzkjdz-isv.isvjcloud.com/customer/getMyPing','headers':{'Host':'lzkjdz-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkjdz-isv.isvjcloud.com','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':'userId='+$.activityShopId+'&token='+$.token+'&fromType=APP&riskType=1'};
	return new Promise(_0x59fcc8=>{
		$.post(_0x19401e,(_0xf18997,_0xf625b,_0x34deab)=>{
			try{
				if(_0xf18997){
					$.log(_0xf18997);
				}else{
					setActivityCookie(_0xf625b);
					if(_0x34deab){
						_0x34deab=JSON.parse(_0x34deab);
						if(_0x34deab.result){
							$.log('用户名：'+_0x34deab.data['nickname']);
							$.pin=_0x34deab.data['nickname'];
							$.secretPin=_0x34deab.data['secretPin'];
							cookie=cookie+';AUTH_C_USER='+_0x34deab.data['secretPin'];
						}else{
							$.log(_0x34deab.errorMessage);
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x5703a3){
				$.log(_0x5703a3);
			}finally{
				_0x59fcc8();
			}
		});
	});
}
function getFirstLZCK(){
	return new Promise(_0x4a9404=>{
		$.get({'url':$.activityUrl,'headers':{'user-agent':$.isNode()?process.env['JD_USER_AGENT']?process.env['JD_USER_AGENT']:require('./USER_AGENTS')['USER_AGENT']:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}},(_0x523add,_0x54476d,_0x2d7673)=>{
			try{
				if(_0x523add){
					console.log(_0x523add);
				}else{
					setActivityCookie(_0x54476d);
				}
			}catch(_0x4933bf){
				console.log(_0x4933bf);
			}finally{
				_0x4a9404();
			}
		});
	});
}
function random(_0x212a68,_0xc23729){
	return Math.floor(Math.random()*(_0xc23729-_0x212a68))+_0x212a68;
}
function getUUID(_0x185187='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',_0x56bbfb=0){
	return _0x185187.replace(/[xy]/g,function(_0x26282d){
		var _0x55220a=Math.random()*0x10|0x0,_0x114f57=_0x26282d=='x'?_0x55220a:_0x55220a&0x3|0x8;
		if(_0x56bbfb){
			uuid=_0x114f57.toString(36)['toUpperCase']();
		}else{
			uuid=_0x114f57.toString(36);
		}
		return uuid;
	});
}
function checkCookie(){
	const _0x38b76a={'url':'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion','headers':{'Host':'me-api.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1','Accept-Language':'zh-cn','Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':'gzip, deflate, br'}};
	return new Promise(_0x5b3c50=>{
		$.get(_0x38b76a,(_0x64a1ca,_0xd879bf,_0x455720)=>{
			try{
				if(_0x64a1ca){
					$.logErr(_0x64a1ca);
				}else{
					if(_0x455720){
						_0x455720=JSON.parse(_0x455720);
						if(_0x455720.retcode==='1001'){
							$.isLogin=false;
							return;
						}
						if(_0x455720.retcode==='0'&&_0x455720.data['hasOwnProperty']('userInfo')){
							$.nickName=_0x455720.data['userInfo']['baseInfo']['nickname'];
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x50e09e){
				$.logErr(_0x50e09e);
			}finally{
				_0x5b3c50();
			}
		});
	});
}
function setActivityCookie(_0x3b257a){
	if(_0x3b257a){
		if(_0x3b257a.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x5cdac3 of _0x3b257a.headers['set-cookie']){
				lz_cookie[_0x5cdac3.split(';')[0]['substr'](0,_0x5cdac3.split(';')[0]['indexOf']('='))]=_0x5cdac3.split(';')[0]['substr'](_0x5cdac3.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x5c1df5 of Object.keys(lz_cookie)){
				cookie+=_0x5c1df5+'='+lz_cookie[_0x5c1df5]+';';
			}
			activityCookie=cookie;
		}
	}
}
function getAuthorCodeList(_0x1f8eab){
	return new Promise(_0x5ee3e1=>{
		const _0x4ffbdc={'url':_0x1f8eab+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x4ffbdc,async(_0x361b12,_0x24f9fd,_0x569ae6)=>{
			try{
				if(_0x361b12){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x569ae6)_0x569ae6=JSON.parse(_0x569ae6);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x180541){
				$.logErr(_0x180541,_0x24f9fd);
				_0x569ae6=null;
			}finally{
				_0x5ee3e1(_0x569ae6);
			}
		});
	});
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x243c66){
	_0x243c66=_0x243c66||32;
	let _0x1a0a64='abcdef0123456789',_0x2c59ab=_0x1a0a64.length,_0x1d7e3c='';
	for(i=0;i<_0x243c66;i++)_0x1d7e3c+=_0x1a0a64.charAt(Math.floor(Math.random()*_0x2c59ab));
	return _0x1d7e3c;
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);