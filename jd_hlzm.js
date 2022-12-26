/*
12.15-12.31 海蓝之谜新年祝福

必须要邀请新人入会才能达到抽奖门槛

————————————————
入口：[ 12.15-12.31 海蓝之谜新年祝福 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#12.15-12.31 海蓝之谜新年祝福
11 11 11 11 * jd_hlzm.js, tag=12.15-12.31 海蓝之谜新年祝福, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.15-12.31 海蓝之谜新年祝福');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzkjdz-isv.isvjcloud.com';
let opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:'10':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'10';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x15c0a1=>{
		cookiesArr.push(jdCookieNode[_0x15c0a1]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x269d29=>_0x269d29.cookie)]['filter'](_0x335e6a=>!!_0x335e6a);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let activityUrl='https://lzkjdz-isv.isvjcloud.com/m/1000410747/99/2212100041074701/';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='2212100041074701';
	authorCodeList=["5335dad4830c4220a79bd3b159336489"];//await getAuthorCodeList('http://code.kingran.ga/hlzm.json');
	if(authorCodeList==='404: Not Found'){
		authorCodeList=[''];
	}
	$.shareUuid=authorCodeList[Math.floor(Math.random()*authorCodeList.length)];
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000410747/99/2212100041074701/?helpUuid='+$.shareUuid);
	for(let _0x310907=0;_0x310907<cookiesArr.length;_0x310907++){
		cookie=cookiesArr[_0x310907];
		originCookie=cookiesArr[_0x310907];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x310907+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(_0x310907==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
		}
	}
	if($.outFlag){
		let _0x1cdbaf='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x1cdbaf);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x1cdbaf);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x91b98=>$.logErr(_0x91b98))['finally'](()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x14e55b=false;
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
		await takePostRequest('getOpenCardStatusWithOutSelf');
		await takePostRequest('activityContent');
		if($.openStatus==false){
			console.log('去开通店铺会员');
			$.joinVenderId=1000410747;
			await joinShop();
			if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
				console.log('第1次 重新开卡');
				await $.wait(parseInt(Math.random()*2000+3000,10));
				await joinShop();
			}
			if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
				console.log('💔 无法开卡,跳过运行');
				return;
			}
			await takePostRequest('getOpenCardStatusWithOutSelf');
			await takePostRequest('activityContent');
		}
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		for(let _0x473c2d=0;_0x473c2d<$.taskslist['length'];_0x473c2d++){
			$.taskId=$.taskslist[_0x473c2d]['taskId'];
			if($.taskslist[_0x473c2d]['btnState']!=1){
				switch($.taskId){
					case 1:
						console.log('去完成'+$.taskslist[_0x473c2d]['taskDesc']);
						$.krzf='认准#name#爱你哟#sharePic#https://img10.360buyimg.com/imgzone/jfs/t1/107495/10/23917/33535/63a92452Eb1796ddb/4ab3132aac232610.png';
						await takePostRequest('browse1');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 2:
						console.log('去完成'+$.taskslist[_0x473c2d]['taskDesc']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 5:
						console.log('去完成'+$.taskslist[_0x473c2d]['taskDesc']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 3:
						console.log('去完成'+$.taskslist[_0x473c2d]['taskDesc']);
						for(let _0x473c2d=0;_0x473c2d<$.addCartlist['length'];_0x473c2d++){
							$.skuId=$.addCartlist[_0x473c2d]['skuId'];
							if($.addCartlist[_0x473c2d]['addFlg']!=1){
								console.log('去加购'+$.addCartlist[_0x473c2d]['skuId']);
								await takePostRequest('browse');
								await $.wait(parseInt(Math.random()*1000+2000,10));
							}
						}
						break;
					case 6:
						console.log('去完成'+$.taskslist[_0x473c2d]['taskDesc']);
						await takePostRequest('task');
						await $.wait(parseInt(Math.random()*1000+2000,10));
						break;
					case 7:
					case 4:
						break;
					default:
						console.log('错误'+$.taskId);
				}
			}
		}
		await takePostRequest('activityContent');
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x253600=parseInt($.leftTimes/99);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x253600>opencard_draw)_0x253600=opencard_draw;
			console.log('已设置抽奖次数为'+opencard_draw+'次，当前有'+$.leftTimes+'奢宠值，99奢宠值可抽奖一次');
			for(m=1;_0x253600--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('draw');
				if($.runFalag==false)break;
				if(Number(_0x253600)<=0)break;
				if(m>=5){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}else console.log('如需抽奖请设置环境变量[opencard_draw]为"3" 3为次数');
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+5000,10));
	}catch(_0x38ea86){
		console.log(_0x38ea86);
	}
}
async function takePostRequest(_0x44a13a){
	if($.outFlag)return;
	let _0x2844b3='https://lzkjdz-isv.isvjcloud.com';
	let _0x30cdc0='';
	let _0xe67e33='POST';
	let _0x5abdd7='';
	switch(_0x44a13a){
		case 'getMyPing':
			url=_0x2844b3+'/customer/getMyPing';
			_0x30cdc0='token='+$.Token+'&fromType=APP&userId=1000410747&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x2844b3+'/common/brand/getSimpleActInfoVo';
			_0x30cdc0='activityId='+$.activityId;
			break;
		case 'accessLogWithAD':
			url=_0x2844b3+'/common/accessLogWithAD';
			let _0x53cee5='https://lzkjdz-isv.isvjcloud.com/m/1000410747/99/'+$.activityId+'/?helpUuid='+$.shareUuid;
			_0x30cdc0='venderId=1000410747&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x53cee5);
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x2844b3+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x30cdc0='venderId=1000410747&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x2844b3+'/wx/lamer/newYearWish/activityContent';
			_0x30cdc0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&friendUuid='+$.shareUuid;
			break;
		case 'task':
			url=_0x2844b3+'/wx/lamer/newYearWish/doTask';
			_0x30cdc0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&msg=';
			break;
		case 'browse':
			url=_0x2844b3+'/wx/lamer/newYearWish/doTask';
			_0x30cdc0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&msg='+$.skuId;
			break;
		case 'browse1':
			url=_0x2844b3+'/wx/lamer/newYearWish/doTask';
			_0x30cdc0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskId='+$.taskId+'&msg='+encodeURIComponent($.krzf);
			break;
		case 'followShop':
			url=_0x2844b3+'/wxActionCommon/followShop';
			_0x30cdc0='activityId='+$.activityId+'userId=1000410747&activityType=99&buyerNick='+encodeURIComponent($.Pin)+'&pin='+encodeURIComponent($.Pin);
			break;
		case'draw':
			url=_0x2844b3+'/wx/lamer/newYearWish/startDraw';
			_0x30cdc0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x44a13a);
	}
	let _0x18e74f=getPostRequest(url,_0x30cdc0,_0xe67e33);
	return new Promise(async _0x1c51ee=>{
		$.post(_0x18e74f,(_0x202d3d,_0x3200a5,_0x50152f)=>{
			try{
				setActivityCookie(_0x3200a5);
				if(_0x202d3d){
					if(_0x3200a5&&typeof _0x3200a5.statusCode!='undefined'){
						if(_0x3200a5.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x202d3d,_0x202d3d));
					console.log(_0x44a13a+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x44a13a,_0x50152f);
				}
			}catch(_0x314933){
				console.log(_0x314933,_0x3200a5);
			}finally{
				_0x1c51ee();
			}
		});
	});
}
async function dealReturn(_0xa77413,_0x4b3de1){
	let _0xac3c74='';
	try{
		if(_0xa77413!='accessLogWithAD'||_0xa77413!='drawContent'){
			if(_0x4b3de1){
				_0xac3c74=JSON.parse(_0x4b3de1);
			}
		}
	}catch(_0x14f104){
		console.log(_0xa77413+' 执行任务异常');
		console.log(_0x4b3de1);
		$.runFalag=false;
	}
	try{
		switch(_0xa77413){
			case 'getMyPing':
				if(typeof _0xac3c74=='object'){
					if(_0xac3c74.result&&_0xac3c74.result===true){
						if(_0xac3c74.data&&typeof _0xac3c74.data['secretPin']!='undefined')$.Pin=_0xac3c74.data['secretPin'];
						if(_0xac3c74.data&&typeof _0xac3c74.data['nickname']!='undefined')$.nickname=_0xac3c74.data['nickname'];
					}else if(_0xac3c74.errorMessage){
						console.log(_0xa77413+' '+(_0xac3c74.errorMessage||''));
					}else{
						console.log(_0xa77413+' '+_0x4b3de1);
					}
				}else{
					console.log(_0xa77413+' '+_0x4b3de1);
				}
				break;
			case 'task':
				if(typeof _0xac3c74=='object'){
					if(_0xac3c74.result&&_0xac3c74.result===true){
						console.log(''+(_0xac3c74.result||''));
					}else if(_0xac3c74.errorMessage){
						console.log(''+(_0xac3c74.errorMessage||''));
					}else{
						console.log(''+_0x4b3de1);
					}
				}else{
					console.log(''+_0x4b3de1);
				}
				break;
			case 'browse':
				if(typeof _0xac3c74=='object'){
					if(_0xac3c74.result&&_0xac3c74.result===true){
						console.log(''+(_0xac3c74.result||''));
					}else if(_0xac3c74.errorMessage){
						console.log(''+(_0xac3c74.errorMessage||''));
					}else{
						console.log(''+_0x4b3de1);
					}
				}else{
					console.log(''+_0x4b3de1);
				}
				break;
			case 'browse1':
				if(typeof _0xac3c74=='object'){
					if(_0xac3c74.result&&_0xac3c74.result===true){
						console.log(''+(_0xac3c74.result||''));
					}else if(_0xac3c74.errorMessage){
						console.log(''+(_0xac3c74.errorMessage||''));
					}else{
						console.log(''+_0x4b3de1);
					}
				}else{
					console.log(''+_0x4b3de1);
				}
				break;
			case'draw':
				if(typeof _0xac3c74=='object'){
					if(_0xac3c74.success&&_0xac3c74.success===true&&_0xac3c74.data['drawOk']){
						console.log('抽中：'+_0xac3c74.data['name']);
					}else if(_0xac3c74.errorMessage){
						console.log(''+(_0xac3c74.errorMessage||''));
					}else{
						console.log('💨  空气');
					}
				}else{
					console.log(''+_0x4b3de1);
				}
				break;
			case 'followShop':
				if(typeof _0xac3c74=='object'){
					if(_0xac3c74.result&&_0xac3c74.result===true){
						console.log(''+_0xac3c74.data);
					}else if(_0xac3c74.errorMessage){
						console.log(''+(_0xac3c74.errorMessage||''));
					}else{
						console.log(' '+_0x4b3de1);
					}
				}else{
					console.log(''+_0x4b3de1);
				}
				break;
			case 'activityContent':
				if(typeof _0xac3c74=='object'){
					if(_0xac3c74.result&&_0xac3c74.result===true){
						$.actorUuid=_0xac3c74.data['uuid']||'';
						$.hasFollow=_0xac3c74.data['hasFollow']||false;
						$.needFollow=_0xac3c74.data['needFollow']||false;
						$.leftTimes=_0xac3c74.data['wishPoints']||0;
						$.state=_0xac3c74.data['state']||'';
						$.taskslist=_0xac3c74.data['taskInfoVos']||[];
						$.addCartlist=_0xac3c74.data['addCartVoList']||[];
					}else if(_0xac3c74.errorMessage){
						if(_0xac3c74.errorMessage['indexOf']('结束')>-1)$.activityEnd=true;
						console.log(_0xa77413+' '+(_0xac3c74.errorMessage||''));
					}else{
						console.log(_0xa77413+' '+_0x4b3de1);
					}
				}else{
					console.log(_0xa77413+' '+_0x4b3de1);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0xac3c74=='object'){
					if(_0xac3c74.isOk){
						$.openStatus=_0xac3c74.openCard||false;
					}else if(_0xac3c74.errorMessage||_0xac3c74.msg){
						console.log(_0xa77413+' '+(_0xac3c74.errorMessage||_0xac3c74.msg||''));
					}else{
						console.log(_0xa77413+' '+_0x4b3de1);
					}
				}else{
					console.log(_0xa77413+' '+_0x4b3de1);
				}
				break;
			case 'accessLogWithAD':
			case'drawContent':
				break;
			default:
				console.log(_0xa77413+'-> '+_0x4b3de1);
		}
		if(typeof _0xac3c74=='object'){
			if(_0xac3c74.errorMessage){
				if(_0xac3c74.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x1cfdd1){
		console.log(_0x1cfdd1);
	}
}
function getPostRequest(_0x2d17f7,_0x45b5ed,_0x254ff9='POST'){
	let _0x30051e={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x2d17f7.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x30051e.Referer=activityUrl;
		_0x30051e.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x2d17f7,'method':_0x254ff9,'headers':_0x30051e,'body':_0x45b5ed,'timeout':30000};
}
function getSimpleActInfoVo(){
	return new Promise(_0x5cf422=>{
		let _0x187320={'url':'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2212100041074712','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x187320,async(_0x3f6889,_0x1de0dc,_0x190c11)=>{
			try{
				if(_0x3f6889){
					if(_0x1de0dc&&typeof _0x1de0dc.statusCode!='undefined'){
						if(_0x1de0dc.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3f6889));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x4e9e04=$.toObj(_0x190c11,_0x190c11);
					if(typeof _0x4e9e04=='object'){
						if(_0x4e9e04.result&&_0x4e9e04.result===true){
							$.endTime=_0x4e9e04.data['endTime']||0;
							$.startTimes=_0x4e9e04.data['startTime']||Date.now();
						}else if(_0x4e9e04.errorMessage){
							console.log(''+(_0x4e9e04.errorMessage||''));
						}else{
							console.log(''+_0x190c11);
						}
					}else{
						console.log(''+_0x190c11);
					}
				}
			}catch(_0x31da7b){
				$.logErr(_0x31da7b,_0x1de0dc);
			}finally{
				_0x5cf422();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x49c713=>{
		let _0x1fc039={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':activityUrl,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x1fc039,async(_0x59ee52,_0x5ead3c,_0x2cd0f7)=>{
			try{
				if(_0x59ee52){
					if(_0x5ead3c&&typeof _0x5ead3c.statusCode!='undefined'){
						if(_0x5ead3c.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x59ee52));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x550653=_0x2cd0f7.match(/(活动已经结束)/)&&_0x2cd0f7.match(/(活动已经结束)/)[1]||'';
					if(_0x550653){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x5ead3c);
				}
			}catch(_0x1fe968){
				$.logErr(_0x1fe968,_0x5ead3c);
			}finally{
				_0x49c713();
			}
		});
	});
}
function setActivityCookie(_0x53eefd){
	if(_0x53eefd){
		if(_0x53eefd.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x551fde of _0x53eefd.headers['set-cookie']){
				lz_cookie[_0x551fde.split(';')[0]['substr'](0,_0x551fde.split(';')[0]['indexOf']('='))]=_0x551fde.split(';')[0]['substr'](_0x551fde.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x440f6b of Object.keys(lz_cookie)){
				cookie+=_0x440f6b+'='+lz_cookie[_0x440f6b]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x51dfe){
	_0x51dfe=_0x51dfe||32;
	let _0x11ad7a='abcdef0123456789',_0x182d57=_0x11ad7a.length,_0x4ebf3c='';
	for(i=0;i<_0x51dfe;i++)_0x4ebf3c+=_0x11ad7a.charAt(Math.floor(Math.random()*_0x182d57));
	return _0x4ebf3c;
}
async function joinShop(){
	return new Promise(async _0x156772=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x34adc2='';
		if($.shopactivityId)_0x34adc2=',"activityId":'+$.shopactivityId;
		const _0x403236='{"venderId":"1000410747","shopId":"1000410747","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x34adc2+',"channel":406}';
		const _0x139ccf={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x403236)};
		const _0x346667=await getH5st('8adfb',_0x139ccf);
		const _0x395187={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x403236+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x346667),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x395187,async(_0x5f2d6f,_0x2453c2,_0x20bffe)=>{
			try{
				_0x20bffe=_0x20bffe&&_0x20bffe.match(/jsonp_.*?\((.*?)\);/)&&_0x20bffe.match(/jsonp_.*?\((.*?)\);/)[1]||_0x20bffe;
				let _0x3e0b52=$.toObj(_0x20bffe,_0x20bffe);
				if(_0x3e0b52&&typeof _0x3e0b52=='object'){
					if(_0x3e0b52&&_0x3e0b52.success===true){
						console.log(_0x3e0b52.message);
						$.errorJoinShop=_0x3e0b52.message;
						if(_0x3e0b52.result&&_0x3e0b52.result['giftInfo']){
							for(let _0x1cd70f of _0x3e0b52.result['giftInfo']['giftList']){
								console.log('入会获得:'+_0x1cd70f.discountString+_0x1cd70f.prizeName+_0x1cd70f.secondLineDesc);
							}
						}
					}else if(_0x3e0b52&&typeof _0x3e0b52=='object'&&_0x3e0b52.message){
						$.errorJoinShop=_0x3e0b52.message;
						console.log(''+(_0x3e0b52.message||''));
					}else{
						console.log(_0x20bffe);
					}
				}else{
					console.log(_0x20bffe);
				}
			}catch(_0x167757){
				$.logErr(_0x167757,_0x2453c2);
			}finally{
				_0x156772();
			}
		});
	});
}
function getH5st(_0x836158,_0x206ca0){
	return new Promise(async _0x7e6e5c=>{
		let _0x261aae={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x836158+'&req='+encodeURIComponent(JSON.stringify(_0x206ca0)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x261aae,(_0x9b7c71,_0x1216ee,_0x15a6b0)=>{
			try{
				if(_0x9b7c71){
					console.log(JSON.stringify(_0x9b7c71));
					console.log($.name+' getH5st API请求失败，请检查网路重试');
				}else{}
			}catch(_0x2684e0){
				$.logErr(_0x2684e0,_0x1216ee);
			}finally{
				_0x7e6e5c(_0x15a6b0);
			}
		});
	});
}
function getAuthorCodeList(_0x166dec){
	return new Promise(_0x291f4f=>{
		const _0x7a89df={'url':_0x166dec+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x7a89df,async(_0x1cdb44,_0x2b91c7,_0x2e5131)=>{
			try{
				if(_0x1cdb44){
					$.log(_0x1cdb44);
				}else{
					if(_0x2e5131)_0x2e5131=JSON.parse(_0x2e5131);
				}
			}catch(_0x18d7d1){
				$.logErr(_0x18d7d1,_0x2b91c7);
				_0x2e5131=null;
			}finally{
				_0x291f4f(_0x2e5131);
			}
		});
	});
}
function jsonParse(_0x508ae2){
	if(typeof _0x508ae2=='string'){
		try{
			return JSON.parse(_0x508ae2);
		}catch(_0x6a1fc4){
			console.log(_0x6a1fc4);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};