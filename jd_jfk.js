/*
1.11-1.21 京东家饰集福卡

cron:12 11 * * *
============Quantumultx===============
[task_local]
#1.11-1.21 京东家饰集福卡
12 11 * * * jd_jfk.js, tag=1.11-1.21 京东家饰集福卡, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('1.11-1.21 京东家饰集福卡');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://lzdz1-isv.isvjcloud.com';
let krdraw=0;
krdraw=$.isNode()?process.env['krdraw']?process.env['krdraw']:krdraw:$.getdata('krdraw')?$.getdata('krdraw'):krdraw;
let opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:'0':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'0';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x48169c=>{
		cookiesArr.push(jdCookieNode[_0x48169c]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x216c12=>_0x216c12.cookie)]['filter'](_0x47ff13=>!!_0x47ff13);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
$.max=20;
let lz_jdpin_token_cookie='';
let activityCookie='';
let activityUrl='https://lzdz1-isv.isvjcloud.com/m/1000085871/8966722/dz6e94280d4fc0842d8d8be528390a/';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='dz6e94280d4fc0842d8d8be528390a';
	authorCodeList=["29905a5301924847835d1b5de849f451","a589af5248dc470dbf69d5adb75e869a","bd74ab5d01e342c2b63b5beb5e2aaab5",
    "90a92615a26e4d3ab7aaa47c5f166de6","af074788ecd84a95b5e768e0d703a456","f2e958fe740c485ca45c19440156dd8f"]
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/m/1000085871/8966722/dz6e94280d4fc0842d8d8be528390a/?shareUuid='+$.shareUuid);
	for(let _0x235701=0;_0x235701<cookiesArr.length;_0x235701++){
		cookie=cookiesArr[_0x235701];
		originCookie=cookiesArr[_0x235701];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x235701+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if($.outFlag||$.activityEnd||$.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x11569d='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x11569d);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x11569d);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x1bc962=>$.logErr(_0x1bc962))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x28517f=false;
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
		await takePostRequest('drawContent');
		if($.hotFlag)return;
		if(!$.followShop&&!$.outFlag){
			await takePostRequest('followShop');
			await $.wait(parseInt(Math.random()*1000+1200,10));
		}
		if(!$.sign&&!$.outFlag){
			await takePostRequest('sign');
			await $.wait(parseInt(Math.random()*1000+1200,10));
		}
		if(!$.addSku&&!$.outFlag){
			await takePostRequest('addSku');
			await $.wait(parseInt(Math.random()*1000+1200,10));
		}
		await takePostRequest('visitSku');
		await takePostRequest('activityContent');
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x2c5287=parseInt($.score/100);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x2c5287>opencard_draw)_0x2c5287=opencard_draw;
			console.log('已设置抽奖次数为'+_0x2c5287+'次，当前有'+$.score+'福气值');
			for(m=1;_0x2c5287--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('draw');
				if($.runFalag==false)break;
				if(Number(_0x2c5287)<=0)break;
				if(m>=10){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		console.log($.actorUuid);
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+5000,10));
	}catch(_0xd361d4){
		console.log(_0xd361d4);
	}
}
async function takePostRequest(_0x2165b9){
	if($.outFlag)return;
	let _0x5b8774='https://lzdz1-isv.isvjd.com';
	let _0x24dc2f='';
	let _0x5e2823='POST';
	let _0x5849b2='';
	switch(_0x2165b9){
		case 'getMyPing':
			url=_0x5b8774+'/customer/getMyCidPing';
			_0x24dc2f='token='+$.Token+'&fromType=APP&userId=1000085871&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x5b8774+'/common/brand/getSimpleActInfoVo';
			_0x24dc2f='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x5b8774+'/common/accessLogWithAD';
			let _0x5b1490='https://lzdz1-isv.isvjd.com/m/1000085871/'+$.activityId+'/?shareUuid='+$.shareUuid;
			_0x24dc2f='venderId=1000085871&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x5b1490);
			break;
		case 'activityContent':
			url=_0x5b8774+'/dingzhi/nh/card/activityContent';
			_0x24dc2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent('https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png')+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'sign':
			url=_0x5b8774+'/dingzhi/nh/card/saveTask';
			_0x24dc2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=0&taskValue=0&shareUuid='+$.shareUuid;
			break;
		case 'addSku':
			url=_0x5b8774+'/dingzhi/nh/card/saveTask';
			_0x24dc2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=2&taskValue=2&shareUuid='+$.shareUuid;
			break;
		case 'followShop':
			url=_0x5b8774+'/dingzhi/nh/card/saveTask';
			_0x24dc2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=1&taskValue=&shareUuid='+$.shareUuid;
			break;
		case 'visitSku':
			url=_0x5b8774+'/dingzhi/nh/card/saveTask';
			_0x24dc2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=5&taskValue=100030078034&shareUuid='+$.shareUuid;
			break;
		case 'getAnswer':
			url=_0x5b8774+'/dingzhi/nh/card/getAnswer';
			_0x24dc2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&type=1';
			break;
		case 'drawContent':
			url=_0x5b8774+'/dingzhi/taskact/common/drawContent';
			_0x24dc2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x5b8774+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x24dc2f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'draw':
			url=_0x5b8774+'/dingzhi/nh/card/drawCard';
			_0x24dc2f='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x2165b9);
	}
	let _0x3101d5=getPostRequest(url,_0x24dc2f,_0x5e2823);
	return new Promise(async _0x1a0042=>{
		$.post(_0x3101d5,(_0x1b21e2,_0x4784ed,_0x23a581)=>{
			try{
				setActivityCookie(_0x4784ed);
				if(_0x1b21e2){
					if(_0x4784ed&&typeof _0x4784ed.statusCode!='undefined'){
						if(_0x4784ed.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(_0x2165b9+'：'+$.toStr(_0x1b21e2,_0x1b21e2));
					console.log(_0x2165b9+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x2165b9,_0x23a581);
				}
			}catch(_0x1ca096){
				console.log(_0x1ca096,_0x4784ed);
			}finally{
				_0x1a0042();
			}
		});
	});
}
async function dealReturn(_0x42e3bf,_0x4f0f2c){
	let _0x4ada16='';
	try{
		if(_0x42e3bf!='accessLogWithAD'||_0x42e3bf!='drawContent'){
			if(_0x4f0f2c){
				_0x4ada16=JSON.parse(_0x4f0f2c);
			}
		}
	}catch(_0x2596fe){
		console.log(_0x42e3bf+' 执行任务异常');
		console.log(_0x4f0f2c);
		$.runFalag=false;
	}
	try{
		switch(_0x42e3bf){
			case 'getMyPing':
				if(typeof _0x4ada16=='object'){
					if(_0x4ada16.result&&_0x4ada16.result===true){
						if(_0x4ada16.data&&typeof _0x4ada16.data['secretPin']!='undefined')$.Pin=_0x4ada16.data['secretPin'];
						if(_0x4ada16.data&&typeof _0x4ada16.data['nickname']!='undefined')$.nickname=_0x4ada16.data['nickname'];
					}else if(_0x4ada16.errorMessage){
						console.log(_0x42e3bf+' '+(_0x4ada16.errorMessage||''));
					}else{
						console.log(_0x42e3bf+' '+_0x4f0f2c);
					}
				}else{
					console.log(_0x42e3bf+' '+_0x4f0f2c);
				}
				break;
			case 'sign':
			case 'visitSku':
			case 'addSku':
			case 'followShop':
				if(typeof _0x4ada16=='object'){
					if(_0x4ada16.result&&_0x4ada16.result===true){
						console.log('任务完成，福气值：'+_0x4ada16.data['addScore']);
					}else if(_0x4ada16.errorMessage){
						console.log(''+(_0x4ada16.errorMessage||''));
					}else{
						console.log(' '+_0x4f0f2c);
					}
				}else{
					console.log(''+_0x4f0f2c);
				}
				break;
			case 'getAnswer':
				if(typeof _0x4ada16=='object'){
					if(_0x4ada16.result&&_0x4ada16.result===true){
						console.log('全部答对，抽奖机会：'+_0x4ada16.data['addScore']);
					}else if(_0x4ada16.errorMessage){
						console.log(''+(_0x4ada16.errorMessage||''));
					}else{
						console.log('空气');
					}
				}else{
					console.log(''+_0x4f0f2c);
				}
				break;
			case 'draw':
				if(typeof _0x4ada16=='object'){
					if(_0x4ada16.result&&_0x4ada16.result===true){
						console.log('抽中：'+_0x4ada16.data);
					}else if(_0x4ada16.errorMessage){
						console.log(''+(_0x4ada16.errorMessage||''));
					}else{
						console.log('空气');
					}
				}else{
					console.log(''+_0x4f0f2c);
				}
				break;
			case 'activityContent':
				if(typeof _0x4ada16=='object'){
					if(_0x4ada16.result&&_0x4ada16.result===true){
						$.actorUuid=_0x4ada16.data['actorUuid']||'';
						$.openCard=_0x4ada16.data['openCard']||false;
						$.followShop=_0x4ada16.data['followShop']||false;
						$.addSku=_0x4ada16.data['addSku']||false;
						$.sign=_0x4ada16.data['sign']||false;
						$.score=_0x4ada16.data['fqz']||0;
						$.assistStatus=_0x4ada16.data['assistStatus']||0;
					}else if(_0x4ada16.errorMessage){
						if(_0x4ada16.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x42e3bf+' '+(_0x4ada16.errorMessage||''));
					}else{
						console.log(_0x42e3bf+' '+_0x4f0f2c);
					}
				}else{
					console.log(_0x42e3bf+' '+_0x4f0f2c);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x4ada16=='object'){
					if(_0x4ada16.result&&_0x4ada16.result===true){
						console.log('我的奖品：');
						let _0x3d7086=0;
						let _0x5050b3=0;
						let _0x26cbb7=0;
						for(let _0x31eed3 in _0x4ada16.data){
							let _0x10a52f=_0x4ada16.data[_0x31eed3];
							if(_0x10a52f.infoName==''&&_0x10a52f.sendStatus==0){
								_0x3d7086++;
								_0x5050b3=_0x10a52f.infoName['replace']('','');
								_0x26cbb7=_0x26cbb7<_0x10a52f.createTime?_0x10a52f.createTime:_0x26cbb7;
							}else{
								console.log(''+(_0x10a52f.infoType!=10&&_0x10a52f.value&&_0x10a52f.value+':'||'')+_0x10a52f.infoName);
							}
						}
						if(_0x26cbb7>0)console.log('最新邀请奖励时间:'+$.time('yyyy-MM-dd HH:mm:ss',_0x26cbb7));
						if(_0x3d7086>0)console.log('邀请好友('+_0x3d7086+'):'+(_0x3d7086*parseInt(_0x5050b3,10)||30)+'京豆');
					}else if(_0x4ada16.errorMessage){
						console.log(_0x42e3bf+' '+(_0x4ada16.errorMessage||''));
					}else{
						console.log(_0x42e3bf+' '+_0x4f0f2c);
					}
				}else{
					console.log(_0x42e3bf+' '+_0x4f0f2c);
				}
				break;
			case 'accessLogWithAD':
			case'drawContent':
			case 'getQuestion':
				break;
			default:
				console.log(_0x42e3bf+'-> '+_0x4f0f2c);
		}
		if(typeof _0x4ada16=='object'){
			if(_0x4ada16.errorMessage){
				if(_0x4ada16.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x3a1d03){
		console.log(_0x3a1d03);
	}
}
function getPostRequest(_0x3c1d63,_0x9817b5,_0x49958f='POST'){
	let _0x28f590={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x3c1d63.indexOf('https://lzdz1-isv.isvjd.com')>-1){
		_0x28f590.Referer=activityUrl;
		_0x28f590.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x3c1d63,'method':_0x49958f,'headers':_0x28f590,'body':_0x9817b5,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x20a9ac=>{
		let _0x38b2bc={'url':'https://lzdz1-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=dz77972988470a953aadc7fb8d1703','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x38b2bc,async(_0x232e93,_0x2cbc85,_0x565fe3)=>{
			try{
				if(_0x232e93){
					if(_0x2cbc85&&typeof _0x2cbc85.statusCode!='undefined'){
						if(_0x2cbc85.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x232e93));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x36d3af=$.toObj(_0x565fe3,_0x565fe3);
					if(typeof _0x36d3af=='object'){
						if(_0x36d3af.result&&_0x36d3af.result===true){
							$.endTime=_0x36d3af.data['endTime']||0;
							$.startTimes=_0x36d3af.data['startTime']||Date.now();
						}else if(_0x36d3af.errorMessage){
							console.log(''+(_0x36d3af.errorMessage||''));
						}else{
							console.log(''+_0x565fe3);
						}
					}else{
						console.log(''+_0x565fe3);
					}
				}
			}catch(_0xf981c5){
				$.logErr(_0xf981c5,_0x2cbc85);
			}finally{
				_0x20a9ac();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x494211=>{
		let _0x4787d3={'url':'https://lzdz1-isv.isvjd.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x4787d3,async(_0x3a1f14,_0x4de2a4,_0xaf610)=>{
			try{
				if(_0x3a1f14){
					if(_0x4de2a4&&typeof _0x4de2a4.statusCode!='undefined'){
						if(_0x4de2a4.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3a1f14));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x4fb121=_0xaf610.match(/(活动已经结束)/)&&_0xaf610.match(/(活动已经结束)/)[1]||'';
					if(_0x4fb121){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x4de2a4);
				}
			}catch(_0x122e96){
				$.logErr(_0x122e96,_0x4de2a4);
			}finally{
				_0x494211();
			}
		});
	});
}
function setActivityCookie(_0x3a9c71){
	if(_0x3a9c71){
		if(_0x3a9c71.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x430a1f of _0x3a9c71.headers['set-cookie']){
				lz_cookie[_0x430a1f.split(';')[0]['substr'](0,_0x430a1f.split(';')[0]['indexOf']('='))]=_0x430a1f.split(';')[0]['substr'](_0x430a1f.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x204237 of Object.keys(lz_cookie)){
				cookie+=_0x204237+'='+lz_cookie[_0x204237]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x2510cb){
	_0x2510cb=_0x2510cb||32;
	let _0x3f6b7d='abcdef0123456789',_0x1b7c0d=_0x3f6b7d.length,_0x5c40a3='';
	for(i=0;i<_0x2510cb;i++)_0x5c40a3+=_0x3f6b7d.charAt(Math.floor(Math.random()*_0x1b7c0d));
	return _0x5c40a3;
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x34e9be=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x4e7efe='';
		if($.shopactivityId)_0x4e7efe=',"activityId":'+$.shopactivityId;
		const _0x5e0b75='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x4e7efe+',"channel":406}';
		const _0x4161d3={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x5e0b75)};
		const _0x1ffb63=await getH5st('8adfb',_0x4161d3);
		const _0x10e9bf={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x5e0b75+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1ffb63),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x10e9bf,async(_0x410459,_0x4bb3f6,_0x202970)=>{
			try{
				if(_0x410459){
					if(_0x4bb3f6&&typeof _0x4bb3f6.statusCode!='undefined'){
						if(_0x4bb3f6.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x202970=_0x202970&&_0x202970.match(/jsonp_.*?\((.*?)\);/)&&_0x202970.match(/jsonp_.*?\((.*?)\);/)[1]||_0x202970;
					let _0x3c007b=$.toObj(_0x202970,_0x202970);
					if(_0x3c007b&&typeof _0x3c007b=='object'){
						if(_0x3c007b&&_0x3c007b.success===true){
							console.log(' >> '+_0x3c007b.message);
							$.errorJoinShop=_0x3c007b.message;
							if(_0x3c007b.result&&_0x3c007b.result['giftInfo']){
								for(let _0x4de193 of _0x3c007b.result['giftInfo']['giftList']){
									console.log(' >> 入会获得：'+_0x4de193.discountString+_0x4de193.prizeName+_0x4de193.secondLineDesc);
								}
							}
						}else if(_0x3c007b&&typeof _0x3c007b=='object'&&_0x3c007b.message){
							$.errorJoinShop=_0x3c007b.message;
							console.log(''+(_0x3c007b.message||''));
						}else{
							console.log(_0x202970);
						}
					}else{
						console.log(_0x202970);
					}
				}
			}catch(_0x4431de){
				$.logErr(_0x4431de,_0x4bb3f6);
			}finally{
				_0x34e9be();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x1eb794=>{
		const _0x3fbc70='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x4e9e48={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x3fbc70)};
		const _0x103fc0=await getH5st('8adfb',_0x4e9e48);
		const _0x1625b4={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x3fbc70+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x103fc0),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x1625b4,async(_0x5145d6,_0x3664ee,_0xa1a878)=>{
			try{
				if(_0x5145d6){
					if(_0x3664ee&&typeof _0x3664ee.statusCode!='undefined'){
						if(_0x3664ee.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0xa1a878=_0xa1a878&&_0xa1a878.match(/jsonp_.*?\((.*?)\);/)&&_0xa1a878.match(/jsonp_.*?\((.*?)\);/)[1]||_0xa1a878;
					let _0x1a46ba=$.toObj(_0xa1a878,_0xa1a878);
					if(_0x1a46ba&&typeof _0x1a46ba=='object'){
						if(_0x1a46ba&&_0x1a46ba.success==true){
							console.log('去加入：'+(_0x1a46ba.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
							$.shopactivityId=_0x1a46ba.result['interestsRuleList']&&_0x1a46ba.result['interestsRuleList'][0]&&_0x1a46ba.result['interestsRuleList'][0]['interestsInfo']&&_0x1a46ba.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
						}
					}else{
						console.log(_0xa1a878);
					}
				}
			}catch(_0x109d27){
				$.logErr(_0x109d27,_0x3664ee);
			}finally{
				_0x1eb794();
			}
		});
	});
}
function getAuthorCodeList(_0x4ac49b){
	return new Promise(_0x48e6da=>{
		const _0x256acf={'url':_0x4ac49b+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x256acf,async(_0x44ae5a,_0x1e7ab7,_0x477537)=>{
			try{
				if(_0x44ae5a){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x477537)_0x477537=JSON.parse(_0x477537);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x5a1cef){
				$.logErr(_0x5a1cef,_0x1e7ab7);
				_0x477537=null;
			}finally{
				_0x48e6da(_0x477537);
			}
		});
	});
}
function random(_0x4e6720,_0x406b33){
	return Math.floor(Math.random()*(_0x406b33-_0x4e6720))+_0x4e6720;
}
function jsonParse(_0x1f576a){
	if(typeof _0x1f576a=='string'){
		try{
			return JSON.parse(_0x1f576a);
		}catch(_0x4ea049){
			console.log(_0x4ea049);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};