/*
11.1-11.31 雅诗兰黛奢雅邀请入会有礼
新增开卡脚本
一次性脚本

1.每邀请满3人一次抽奖机会
2.上限10组 1组3人
3.开1张卡
4.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 11.1-11.31 雅诗兰黛奢雅邀请入会有礼]

请求太频繁会被黑ip
过10分钟再执行

[task_local]
#11.1-11.31 雅诗兰黛奢雅邀请入会有礼
0 17 * * * jd_YSLD.js, tag=11.1-11.31 雅诗兰黛奢雅邀请入会有礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('11.1-11.31 雅诗兰黛奢雅邀请入会有礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjd.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x386101=>{
		cookiesArr.push(jdCookieNode[_0x386101]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0xfb72ed=>_0xfb72ed.cookie)].filter(_0x35efc1=>!!_0x35efc1);
}
allMessage='';
message='';
let lz_cookie={};
$.hotFlag=false;
$.hasEnd=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	authorCodeList=["9e1fb949c20b44ee83e6560107bd485c"];//await getAuthorCodeList('http://code.kingran.ga/ysld.json');
	$.joinStatus=false;
	$.activityId='2211100037674501';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	console.log('入口:\nhttps://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2211100037674501&inviterUuid='+$.shareUuid);
	for(let _0x136639=0;_0x136639<cookiesArr.length;_0x136639++){
		cookie=cookiesArr[_0x136639];
		originCookie=cookiesArr[_0x136639];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x136639+1;
			message='';
			$.bean=0;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x136639==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd||$.hasEnd)break;
		}
	}
	cookie=cookiesArr[0];
	if(cookie&&$.joinStatus&&!$.outFlag&&!$.activityEnd){
		$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
		$.index=1;
		message='';
		$.bean=0;
		$.nickName='';
		console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
		await $.wait(parseInt(Math.random()*2000+4000,10));
		await getUA();
		await run();
		await $.wait(3000);
	}
	if($.outFlag){
		let _0x1772d4='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x1772d4);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x1772d4);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
		if($.isNode())await notify.sendNotify(''+$.name,''+allMessage);
	}
})().catch(_0x9eaeec=>$.logErr(_0x9eaeec)).finally(()=>$.done());
async function run(){
	try{
		$.endTime=0;
		$.assistCount=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x15ee10=false;
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
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await takePostRequest('activityContent');
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if($.openStatus==0){
			console.log('开卡');
			$.joinVenderId=1000376745;
			await getshopactivityId();
			for(let _0x9f49d3=0;_0x9f49d3<Array(5).length;_0x9f49d3++){
				if(_0x9f49d3>0)console.log('第'+_0x9f49d3+'次 重新开卡');
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
		console.log($.openStatus===1?'已开卡':$.openStatus===2?'已开卡':$.openStatus===0?'未开卡':'未知-'+$.openStatus);
		console.log($.helpStatus===1?'助力成功':$.helpStatus===0?'助力失败':'助力失败-'+$.helpStatus);
		if($.index==1){
			$.helpCount=$.assistCount;
		}else if($.helpStatus==1){
			$.helpCount++;
		}
		if($.drawTimes>0){
			let _0x377972=parseInt($.drawTimes/1);
			for(m=1;_0x377972--;m++){
				await takePostRequest('convertPrize');
			}
		}
		console.log('【账号'+$.index+'】助力人数：'+$.assistCount+($.index!=1&&' 【账号1】助力人数：'+$.helpCount||''));
		if($.helpCount>=10*3)$.hasEnd=true;
		console.log($.actorUuid);
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+10000,10));
	}catch(_0x2e5330){
		console.log(_0x2e5330);
	}
}
async function takePostRequest(_0x2024f8){
	if($.outFlag)return;
	let _0x463854='https://lzkjdz-isv.isvjd.com';
	let _0x910433='';
	let _0x3214a8='POST';
	let _0x4655b9='';
	switch(_0x2024f8){
		case'getMyPing':
			url=_0x463854+'/customer/getMyPing';
			_0x910433='token='+$.Token+'&fromType=APP&userId=1000376745&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x463854+'/customer/getSimpleActInfoVo';
			_0x910433='activityId='+$.activityId;
			break;
		case'accessLogWithAD':
			url=_0x463854+'/common/accessLogWithAD';
			let _0x3d0666='https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid;
			_0x910433='venderId=1000376745&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x3d0666);
			break;
		case 'activityContent':
			url=_0x463854+'/esteelauder/inviteNew/activityContent';
			_0x910433='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&inviterUuid='+$.shareUuid;
			break;
		case 'convertPrize':
			url=_0x463854+'/esteelauder/inviteNew/convertPrize';
			_0x910433='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.shareUuid;
			break;
		default:
			console.log('错误'+_0x2024f8);
	}
	let _0x4f1308=getPostRequest(url,_0x910433,_0x3214a8);
	return new Promise(async _0x3cadb0=>{
		$.post(_0x4f1308,(_0x2812d2,_0x3f8275,_0x1f9437)=>{
			try{
				setActivityCookie(_0x3f8275);
				if(_0x2812d2){
					if(_0x3f8275&&typeof _0x3f8275.statusCode!='undefined'){
						if(_0x3f8275.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x2812d2,_0x2812d2));
					console.log(_0x2024f8+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x2024f8,_0x1f9437);
				}
			}catch(_0x3a58db){
				console.log(_0x3a58db,_0x3f8275);
			}finally{
				_0x3cadb0();
			}
		});
	});
}
async function dealReturn(_0x4d0dba,_0x53dfe3){
	let _0x55aaef='';
	try{
		if(_0x4d0dba!='accessLogWithAD'||_0x4d0dba!='drawContent'){
			if(_0x53dfe3){
				_0x55aaef=JSON.parse(_0x53dfe3);
			}
		}
	}catch(_0x27052c){
		console.log(_0x4d0dba+' 执行任务异常');
		console.log(_0x53dfe3);
		$.runFalag=false;
	}
	try{
		switch(_0x4d0dba){
			case 'getMyPing':
				if(typeof _0x55aaef=='object'){
					if(_0x55aaef.result&&_0x55aaef.result===true){
						if(_0x55aaef.data&&typeof _0x55aaef.data.secretPin!='undefined')$.Pin=_0x55aaef.data.secretPin;
						if(_0x55aaef.data&&typeof _0x55aaef.data.nickname!='undefined')$.nickname=_0x55aaef.data.nickname;
					}else if(_0x55aaef.errorMessage){
						console.log(_0x4d0dba+' '+(_0x55aaef.errorMessage||''));
					}else{
						console.log(_0x4d0dba+' '+_0x53dfe3);
					}
				}else{
					console.log(_0x4d0dba+' '+_0x53dfe3);
				}
				break;
			case'activityContent':
				if(typeof _0x55aaef=='object'){
					if(_0x55aaef.result&&_0x55aaef.result===true){
						$.actorUuid=_0x55aaef.data.userRecord.uuid||'';
						$.helpStatus=_0x55aaef.data.userRecord.assistStatus||0;
						$.openStatus=_0x55aaef.data.userRecord.openCardStatus||0;
						$.assistCount=_0x55aaef.data.userRecord.assistCount||0;
						$.drawTimes=_0x55aaef.data.drawTimes||0;
						if(_0x55aaef.data.sendBeanNum){
							console.log('获得'+_0x55aaef.data.sendBeanNum+'豆');
							allMessage+='【账号'+$.index+'】获得'+_0x55aaef.data.sendBeanNum+'豆\n';
						}
					}else if(_0x55aaef.errorMessage){
						if(_0x55aaef.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
						console.log(_0x4d0dba+' '+(_0x55aaef.errorMessage||''));
					}else{
						console.log(_0x4d0dba+' '+_0x53dfe3);
					}
				}else{
					console.log(_0x4d0dba+' '+_0x53dfe3);
				}
				break;
			case 'convertPrize':
				if(typeof _0x55aaef=='object'){
					if(_0x55aaef.result&&_0x55aaef.result===true){
						console.log(_0x55aaef.data.giftName);
						if(_0x55aaef.data.giftName.indexOf('京豆')==-1&&_0x55aaef.data.giftName.indexOf('谢谢')==-1){
							allMessage+='【账号'+$.index+'】获得'+_0x55aaef.data.giftName+'\n';
						}
					}else if(_0x55aaef.errorMessage||_0x55aaef.msg){
						console.log(_0x4d0dba+' '+(_0x55aaef.errorMessage||_0x55aaef.msg||''));
					}else{
						console.log(_0x4d0dba+' '+_0x53dfe3);
					}
				}else{
					console.log(_0x4d0dba+' '+_0x53dfe3);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x4d0dba+'-> '+_0x53dfe3);
		}
		if(typeof _0x55aaef=='object'){
			if(_0x55aaef.errorMessage){
				if(_0x55aaef.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x1ca58b){
		console.log(_0x1ca58b);
	}
}
function getPostRequest(_0x2a7814,_0x1ee08d,_0x7cfe4f='POST'){
	let _0x44bb61={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x2a7814.indexOf('https://lzkjdz-isv.isvjd.com')>-1){
		_0x44bb61.Referer='https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid;
		_0x44bb61.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x2a7814,'method':_0x7cfe4f,'headers':_0x44bb61,'body':_0x1ee08d,'timeout':30000};
}
function getCk(){
	return new Promise(_0x36f234=>{
		let _0x2d2d52={'url':'https://lzkjdz-isv.isvjd.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjd.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501&inviterUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x2d2d52,async(_0x512397,_0x3ef4eb,_0x18822b)=>{
			try{
				if(_0x512397){
					if(_0x3ef4eb&&typeof _0x3ef4eb.statusCode!='undefined'){
						if(_0x3ef4eb.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x512397));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x5bac60=_0x18822b.match(/(活动已经结束)/)&&_0x18822b.match(/(活动已经结束)/)[1]||'';
					if(_0x5bac60){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x3ef4eb);
				}
			}catch(_0x267f82){
				$.logErr(_0x267f82,_0x3ef4eb);
			}finally{
				_0x36f234();
			}
		});
	});
}
function setActivityCookie(_0x314496){
	if(_0x314496){
		if(_0x314496.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x4a1019 of _0x314496.headers['set-cookie']){
				lz_cookie[_0x4a1019.split(';')[0].substr(0,_0x4a1019.split(';')[0].indexOf('='))]=_0x4a1019.split(';')[0].substr(_0x4a1019.split(';')[0].indexOf('=')+1);
			}
			for(const _0x488086 of Object.keys(lz_cookie)){
				cookie+=_0x488086+'='+lz_cookie[_0x488086]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x264754){
	_0x264754=_0x264754||32;
	let _0x33b700='abcdef0123456789',_0x2bb9dc=_0x33b700.length,_0x571a17='';
	for(i=0;i<_0x264754;i++)_0x571a17+=_0x33b700.charAt(Math.floor(Math.random()*_0x2bb9dc));
	return _0x571a17;
}
async function joinShop(){
	return new Promise(async _0xfd46ce=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x538507='';
		if($.shopactivityId)_0x538507=',"activityId":'+$.shopactivityId;
		const _0x281904='{"venderId":"1000376745","shopId":"1000376745","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x538507+',"channel":406}';
		const _0x530372={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x281904)};
		const _0x305906=await getH5st('8adfb',_0x530372);
		const _0x445cef={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x281904+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x305906),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x445cef,async(_0x21897e,_0x5e9abf,_0x4b629f)=>{
			try{
				_0x4b629f=_0x4b629f&&_0x4b629f.match(/jsonp_.*?\((.*?)\);/)&&_0x4b629f.match(/jsonp_.*?\((.*?)\);/)[1]||_0x4b629f;
				let _0x230748=$.toObj(_0x4b629f,_0x4b629f);
				if(_0x230748&&typeof _0x230748=='object'){
					if(_0x230748&&_0x230748.success===true){
						console.log(_0x230748.message);
						$.errorJoinShop=_0x230748.message;
						if(_0x230748.result&&_0x230748.result.giftInfo){
							for(let _0x48a77d of _0x230748.result.giftInfo.giftList){
								console.log('入会获得:'+_0x48a77d.discountString+_0x48a77d.prizeName+_0x48a77d.secondLineDesc);
							}
						}
					}else if(_0x230748&&typeof _0x230748=='object'&&_0x230748.message){
						$.errorJoinShop=_0x230748.message;
						console.log(''+(_0x230748.message||''));
					}else{
						console.log(_0x4b629f);
					}
				}else{
					console.log(_0x4b629f);
				}
			}catch(_0x28c8da){
				$.logErr(_0x28c8da,_0x5e9abf);
			}finally{
				_0xfd46ce();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x4ce559=>{
		let _0x1cce2c='{"venderId":"1000376745","channel":406,"payUpShop":true}';
		const _0x355cda={'appid':'jd_shop_member','functionId':'getShopOpenCardInfo','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x1cce2c)};
		const _0x2b2376=await getH5st('ef79a',_0x355cda);
		const _0x299719={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x1cce2c+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x2b2376),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x299719,async(_0x23b475,_0x312659,_0x128296)=>{
			try{
				_0x128296=_0x128296&&_0x128296.match(/jsonp_.*?\((.*?)\);/)&&_0x128296.match(/jsonp_.*?\((.*?)\);/)[1]||_0x128296;
				let _0x4dc754=$.toObj(_0x128296,_0x128296);
				if(_0x4dc754&&typeof _0x4dc754=='object'){
					if(_0x4dc754&&_0x4dc754.success==true){
						console.log('入会:'+(_0x4dc754.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x4dc754.result.interestsRuleList&&_0x4dc754.result.interestsRuleList[0]&&_0x4dc754.result.interestsRuleList[0].interestsInfo&&_0x4dc754.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x128296);
				}
			}catch(_0x4c85e4){
				$.logErr(_0x4c85e4,_0x312659);
			}finally{
				_0x4ce559();
			}
		});
	});
}
function getH5st(_0x350442,_0x16a916){
	return new Promise(async _0x1072e1=>{
		let _0x190569={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x350442+'&req='+encodeURIComponent(JSON.stringify(_0x16a916)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x190569,(_0x49ff62,_0x4e9944,_0x21e389)=>{
			try{
				if(_0x49ff62){
					console.log(JSON.stringify(_0x49ff62));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x3c078b){
				$.logErr(_0x3c078b,_0x4e9944);
			}finally{
				_0x1072e1(_0x21e389);
			}
		});
	});
}
function getAuthorCodeList(_0x5f45e7){
	return new Promise(_0xeb2bf0=>{
		const _0x16d61a={'url':_0x5f45e7+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x16d61a,async(_0x1d662b,_0x210db4,_0x195b02)=>{
			try{
				if(_0x1d662b){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x195b02)_0x195b02=JSON.parse(_0x195b02);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0xb463c){
				$.logErr(_0xb463c,_0x210db4);
				_0x195b02=null;
			}finally{
				_0xeb2bf0(_0x195b02);
			}
		});
	});
}
function random(_0x36ce10,_0x593447){
	return Math.floor(Math.random()*(_0x593447-_0x36ce10))+_0x36ce10;
}
function jsonParse(_0x6a4529){
	if(typeof _0x6a4529=='string'){
		try{
			return JSON.parse(_0x6a4529);
		}catch(_0x3eeee9){
			console.log(_0x3eeee9);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};