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
	Object.keys(jdCookieNode)['forEach'](_0x44de43=>{
		cookiesArr.push(jdCookieNode[_0x44de43]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x106f5e=>_0x106f5e.cookie)]['filter'](_0x410f1b=>!!_0x410f1b);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
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
	for(let _0x305284=0;_0x305284<cookiesArr.length;_0x305284++){
		cookie=cookiesArr[_0x305284];
		originCookie=cookiesArr[_0x305284];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x305284+1;
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
		let _0x1ed92b='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x1ed92b);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x1ed92b);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x46724e=>$.logErr(_0x46724e))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0xb9ed99=false;
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
			let _0x564737=parseInt($.score/100);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x564737>opencard_draw)_0x564737=opencard_draw;
			console.log('已设置抽奖次数为'+_0x564737+'次，当前有'+$.score+'福气值');
			for(m=1;_0x564737--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('draw');
				if($.runFalag==false)break;
				if(Number(_0x564737)<=0)break;
				if(m>=10){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		if($.index==1){
			console.log('查询福卡是否可合成...');
			await takePostRequest('getHasCard');
			const _0x43a78e=new Set();
			for(const _0x4f7e4f of $.hasCardList){
				$.cardName=_0x4f7e4f.cardName;
				$.count=_0x4f7e4f.hasNum;
				_0x4f7e4f.hasNum>=0?_0x43a78e.add(_0x4f7e4f.hasNum):'';
				console.log('福卡：'+$.cardName+' , '+$.count+'张');
			}
			var _0x1c01b5=Array.from(_0x43a78e);
			var _0x4c970e=getMaxMin(_0x1c01b5,'min');
			console.log('\n目前可合成：'+_0x4c970e+'次');
			for(let _0x117ecf=0;_0x117ecf<_0x4c970e;_0x117ecf++){
				console.log('第'+(_0x117ecf+1)+'次合成');
				await takePostRequest('compoundCard');
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
			console.log('\n目前已有福卡：'+$.xnfkNum+'张，请在1.21晚上8点前往瓜分');
		}
		console.log($.actorUuid);
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+5000,10));
	}catch(_0x3c19f3){
		console.log(_0x3c19f3);
	}
}
async function takePostRequest(_0x45d197){
	if($.outFlag)return;
	let _0x215482='https://lzdz1-isv.isvjd.com';
	let _0x3252ba='';
	let _0x33396e='POST';
	let _0x4cf091='';
	switch(_0x45d197){
		case 'getMyPing':
			url=_0x215482+'/customer/getMyCidPing';
			_0x3252ba='token='+$.Token+'&fromType=APP&userId=1000085871&pin=';
			break;
		case'getSimpleActInfoVo':
			url=_0x215482+'/common/brand/getSimpleActInfoVo';
			_0x3252ba='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x215482+'/common/accessLogWithAD';
			let _0xbbdac7='https://lzdz1-isv.isvjd.com/m/1000085871/'+$.activityId+'/?shareUuid='+$.shareUuid;
			_0x3252ba='venderId=1000085871&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0xbbdac7);
			break;
		case 'activityContent':
			url=_0x215482+'/dingzhi/nh/card/activityContent';
			_0x3252ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent('https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png')+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'sign':
			url=_0x215482+'/dingzhi/nh/card/saveTask';
			_0x3252ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=0&taskValue=0&shareUuid='+$.shareUuid;
			break;
		case 'addSku':
			url=_0x215482+'/dingzhi/nh/card/saveTask';
			_0x3252ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=2&taskValue=2&shareUuid='+$.shareUuid;
			break;
		case 'followShop':
			url=_0x215482+'/dingzhi/nh/card/saveTask';
			_0x3252ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=1&taskValue=&shareUuid='+$.shareUuid;
			break;
		case 'visitSku':
			url=_0x215482+'/dingzhi/nh/card/saveTask';
			_0x3252ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType=5&taskValue=100030078034&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x215482+'/dingzhi/taskact/common/drawContent';
			_0x3252ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'draw':
			url=_0x215482+'/dingzhi/nh/card/drawCard';
			_0x3252ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getHasCard':
			url=_0x215482+'/dingzhi/nh/card/getHasCard';
			_0x3252ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'compoundCard':
			url=_0x215482+'/dingzhi/nh/card/getHasCard';
			_0x3252ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x45d197);
	}
	let _0x235f48=getPostRequest(url,_0x3252ba,_0x33396e);
	return new Promise(async _0x3c3b67=>{
		$.post(_0x235f48,(_0x35ca72,_0x1c6415,_0x46f271)=>{
			try{
				setActivityCookie(_0x1c6415);
				if(_0x35ca72){
					if(_0x1c6415&&typeof _0x1c6415.statusCode!='undefined'){
						if(_0x1c6415.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x35ca72,_0x35ca72));
					console.log(_0x45d197+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x45d197,_0x46f271);
				}
			}catch(_0x2508a9){
				console.log(_0x2508a9,_0x1c6415);
			}finally{
				_0x3c3b67();
			}
		});
	});
}
async function dealReturn(_0x75a686,_0x15a1e5){
	let _0x3452d3='';
	try{
		if(_0x75a686!='accessLogWithAD'||_0x75a686!='drawContent'){
			if(_0x15a1e5){
				_0x3452d3=JSON.parse(_0x15a1e5);
			}
		}
	}catch(_0x500a0c){
		console.log(_0x75a686+' 执行任务异常');
		console.log(_0x15a1e5);
		$.runFalag=false;
	}
	try{
		switch(_0x75a686){
			case 'getMyPing':
				if(typeof _0x3452d3=='object'){
					if(_0x3452d3.result&&_0x3452d3.result===true){
						if(_0x3452d3.data&&typeof _0x3452d3.data['secretPin']!='undefined')$.Pin=_0x3452d3.data['secretPin'];
						if(_0x3452d3.data&&typeof _0x3452d3.data['nickname']!='undefined')$.nickname=_0x3452d3.data['nickname'];
					}else if(_0x3452d3.errorMessage){
						console.log(_0x75a686+' '+(_0x3452d3.errorMessage||''));
					}else{
						console.log(_0x75a686+' '+_0x15a1e5);
					}
				}else{
					console.log(_0x75a686+' '+_0x15a1e5);
				}
				break;
			case 'sign':
			case 'visitSku':
			case 'addSku':
			case 'followShop':
				if(typeof _0x3452d3=='object'){
					if(_0x3452d3.result&&_0x3452d3.result===true){
						console.log('任务完成，福气值：'+_0x3452d3.data['addScore']);
					}else if(_0x3452d3.errorMessage){
						console.log(''+(_0x3452d3.errorMessage||''));
					}else{
						console.log(' '+_0x15a1e5);
					}
				}else{
					console.log(''+_0x15a1e5);
				}
				break;
			case 'draw':
				if(typeof _0x3452d3=='object'){
					if(_0x3452d3.result&&_0x3452d3.result===true){
						drawlist=_0x3452d3.data||[];
						for(const _0x4e751f of drawlist){
							console.log('抽中：'+_0x4e751f.cardName);
						}
					}else if(_0x3452d3.errorMessage){
						console.log(''+(_0x3452d3.errorMessage||''));
					}else{
						console.log('空气');
					}
				}else{
					console.log(''+_0x15a1e5);
				}
				break;
			case'getHasCard':
				if(typeof _0x3452d3=='object'){
					if(_0x3452d3.result&&_0x3452d3.result===true){
						$.hasCardList=_0x3452d3.data['hasCardList']||[];
					}else if(_0x3452d3.errorMessage){
						console.log(''+(_0x3452d3.errorMessage||''));
					}else{
						console.log('空气');
					}
				}else{
					console.log(''+_0x15a1e5);
				}
				break;
			case 'compoundCard':
				if(typeof _0x3452d3=='object'){
					if(_0x3452d3.result&&_0x3452d3.result===true){
						$.isSuccess=_0x3452d3.data['isSuccess']||false;
						console.log('合成状态：'+$.isSuccess);
					}else if(_0x3452d3.errorMessage){
						console.log(''+(_0x3452d3.errorMessage||''));
					}else{
						console.log('空气');
					}
				}else{
					console.log(''+_0x15a1e5);
				}
				break;
			case 'activityContent':
				if(typeof _0x3452d3=='object'){
					if(_0x3452d3.result&&_0x3452d3.result===true){
						$.actorUuid=_0x3452d3.data['actorUuid']||'';
						$.openCard=_0x3452d3.data['openCard']||false;
						$.followShop=_0x3452d3.data['followShop']||false;
						$.addSku=_0x3452d3.data['addSku']||false;
						$.sign=_0x3452d3.data['sign']||false;
						$.xnfkNum=_0x3452d3.data['xnfkNum']||0;
						$.hccs=_0x3452d3.data['hccs']||0;
						$.score=_0x3452d3.data['fqz']||0;
						$.assistStatus=_0x3452d3.data['assistStatus']||0;
					}else if(_0x3452d3.errorMessage){
						if(_0x3452d3.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0x75a686+' '+(_0x3452d3.errorMessage||''));
					}else{
						console.log(_0x75a686+' '+_0x15a1e5);
					}
				}else{
					console.log(_0x75a686+' '+_0x15a1e5);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
			case 'getQuestion':
				break;
			default:
				console.log(_0x75a686+'-> '+_0x15a1e5);
		}
		if(typeof _0x3452d3=='object'){
			if(_0x3452d3.errorMessage){
				if(_0x3452d3.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x5a7e73){
		console.log(_0x5a7e73);
	}
}
function getPostRequest(_0x1a435e,_0x58b1cb,_0x58633d='POST'){
	let _0x22638a={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x1a435e.indexOf('https://lzdz1-isv.isvjd.com')>-1){
		_0x22638a.Referer=activityUrl;
		_0x22638a.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x1a435e,'method':_0x58633d,'headers':_0x22638a,'body':_0x58b1cb,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x119360=>{
		let _0x30eafd={'url':'https://lzdz1-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=dz77972988470a953aadc7fb8d1703','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x30eafd,async(_0x34cc15,_0x33f80c,_0x595154)=>{
			try{
				if(_0x34cc15){
					if(_0x33f80c&&typeof _0x33f80c.statusCode!='undefined'){
						if(_0x33f80c.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x34cc15));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x29df5d=$.toObj(_0x595154,_0x595154);
					if(typeof _0x29df5d=='object'){
						if(_0x29df5d.result&&_0x29df5d.result===true){
							$.endTime=_0x29df5d.data['endTime']||0;
							$.startTimes=_0x29df5d.data['startTime']||Date.now();
						}else if(_0x29df5d.errorMessage){
							console.log(''+(_0x29df5d.errorMessage||''));
						}else{
							console.log(''+_0x595154);
						}
					}else{
						console.log(''+_0x595154);
					}
				}
			}catch(_0x5572a6){
				$.logErr(_0x5572a6,_0x33f80c);
			}finally{
				_0x119360();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x5c13bc=>{
		let _0x126d82={'url':'https://lzdz1-isv.isvjd.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x126d82,async(_0x940aec,_0xfa5fd,_0x460b7a)=>{
			try{
				if(_0x940aec){
					if(_0xfa5fd&&typeof _0xfa5fd.statusCode!='undefined'){
						if(_0xfa5fd.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x940aec));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x34ae59=_0x460b7a.match(/(活动已经结束)/)&&_0x460b7a.match(/(活动已经结束)/)[1]||'';
					if(_0x34ae59){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0xfa5fd);
				}
			}catch(_0x1a5192){
				$.logErr(_0x1a5192,_0xfa5fd);
			}finally{
				_0x5c13bc();
			}
		});
	});
}
function setActivityCookie(_0x57bd78){
	if(_0x57bd78){
		if(_0x57bd78.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x483003 of _0x57bd78.headers['set-cookie']){
				lz_cookie[_0x483003.split(';')[0]['substr'](0,_0x483003.split(';')[0]['indexOf']('='))]=_0x483003.split(';')[0]['substr'](_0x483003.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x4163cc of Object.keys(lz_cookie)){
				cookie+=_0x4163cc+'='+lz_cookie[_0x4163cc]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x12e395){
	_0x12e395=_0x12e395||32;
	let _0x28c219='abcdef0123456789',_0xe72158=_0x28c219.length,_0x2edc1a='';
	for(i=0;i<_0x12e395;i++)_0x2edc1a+=_0x28c219.charAt(Math.floor(Math.random()*_0xe72158));
	return _0x2edc1a;
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x270029=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x14fda9='';
		if($.shopactivityId)_0x14fda9=',"activityId":'+$.shopactivityId;
		const _0x1d409c='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x14fda9+',"channel":406}';
		const _0x5924a3={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x1d409c)};
		const _0x3fd9ba=await getH5st('8adfb',_0x5924a3);
		const _0x28b2fc={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x1d409c+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x3fd9ba),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x28b2fc,async(_0x3f3d1,_0x3d6f53,_0x419d6e)=>{
			try{
				if(_0x3f3d1){
					if(_0x3d6f53&&typeof _0x3d6f53.statusCode!='undefined'){
						if(_0x3d6f53.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x419d6e=_0x419d6e&&_0x419d6e.match(/jsonp_.*?\((.*?)\);/)&&_0x419d6e.match(/jsonp_.*?\((.*?)\);/)[1]||_0x419d6e;
					let _0x3fa14c=$.toObj(_0x419d6e,_0x419d6e);
					if(_0x3fa14c&&typeof _0x3fa14c=='object'){
						if(_0x3fa14c&&_0x3fa14c.success===true){
							console.log(' >> '+_0x3fa14c.message);
							$.errorJoinShop=_0x3fa14c.message;
							if(_0x3fa14c.result&&_0x3fa14c.result['giftInfo']){
								for(let _0x377ff7 of _0x3fa14c.result['giftInfo']['giftList']){
									console.log(' >> 入会获得：'+_0x377ff7.discountString+_0x377ff7.prizeName+_0x377ff7.secondLineDesc);
								}
							}
						}else if(_0x3fa14c&&typeof _0x3fa14c=='object'&&_0x3fa14c.message){
							$.errorJoinShop=_0x3fa14c.message;
							console.log(''+(_0x3fa14c.message||''));
						}else{
							console.log(_0x419d6e);
						}
					}else{
						console.log(_0x419d6e);
					}
				}
			}catch(_0x3c3889){
				$.logErr(_0x3c3889,_0x3d6f53);
			}finally{
				_0x270029();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x21f7a7=>{
		const _0x5144fe='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x5233a8={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x5144fe)};
		const _0x6892b0=await getH5st('8adfb',_0x5233a8);
		const _0x372234={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x5144fe+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x6892b0),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x372234,async(_0x45b009,_0x50f899,_0x4b0208)=>{
			try{
				if(_0x45b009){
					if(_0x50f899&&typeof _0x50f899.statusCode!='undefined'){
						if(_0x50f899.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x4b0208=_0x4b0208&&_0x4b0208.match(/jsonp_.*?\((.*?)\);/)&&_0x4b0208.match(/jsonp_.*?\((.*?)\);/)[1]||_0x4b0208;
					let _0x566122=$.toObj(_0x4b0208,_0x4b0208);
					if(_0x566122&&typeof _0x566122=='object'){
						if(_0x566122&&_0x566122.success==true){
							console.log('去加入：'+(_0x566122.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
							$.shopactivityId=_0x566122.result['interestsRuleList']&&_0x566122.result['interestsRuleList'][0]&&_0x566122.result['interestsRuleList'][0]['interestsInfo']&&_0x566122.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
						}
					}else{
						console.log(_0x4b0208);
					}
				}
			}catch(_0xecdfb2){
				$.logErr(_0xecdfb2,_0x50f899);
			}finally{
				_0x21f7a7();
			}
		});
	});
}
function getMaxMin(_0x4c6517,_0x837822){
	if(_0x837822==='max'){
		return Math.max['apply'](Math,_0x4c6517);
	}else if(_0x837822==='min'){
		return Math.min['apply'](Math,_0x4c6517);
	}
}
function getAuthorCodeList(_0x20bc1f){
	return new Promise(_0x522ab2=>{
		const _0x3a68f5={'url':_0x20bc1f+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x3a68f5,async(_0x2ace67,_0x11f59f,_0x324a1a)=>{
			try{
				if(_0x2ace67){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x324a1a)_0x324a1a=JSON.parse(_0x324a1a);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x5a8a77){
				$.logErr(_0x5a8a77,_0x11f59f);
				_0x324a1a=null;
			}finally{
				_0x522ab2(_0x324a1a);
			}
		});
	});
}
function random(_0x52a072,_0x32a27c){
	return Math.floor(Math.random()*(_0x32a27c-_0x52a072))+_0x52a072;
}
function jsonParse(_0x949a6){
	if(typeof _0x949a6=='string'){
		try{
			return JSON.parse(_0x949a6);
		}catch(_0x2089d5){
			console.log(_0x2089d5);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};