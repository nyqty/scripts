/*
京东粉丝联盟福利社 入会赢专享好礼
新增开卡脚本，一次性脚本


第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[京东粉丝联盟福利社 入会赢专享好礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#京东粉丝联盟福利社 入会赢专享好礼
11 11 11 11 * jd_opencardL286.js, tag=京东粉丝联盟福利社 入会赢专享好礼, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('京东粉丝联盟福利社 入会赢专享好礼');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://lzkjdz-isv.isvjcloud.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x240ce4=>{
		cookiesArr.push(jdCookieNode[_0x240ce4]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x25b313=>_0x25b313.cookie)]['filter'](_0x4f4a25=>!!_0x4f4a25);
}
const JD_SIGN_API=process.env['JD_SIGN_API']||'https://api.nolanstore.top/sign';
let lz_cookie={};
allMessage='';
message='';
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
	authorCodeList=[]//await getAuthorCodeList('http://code.kingran.ga/286.json');
	$.activityId='dzf14d339243649ac29a2e350dshop';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	for(let _0x14cbe6=0;_0x14cbe6<cookiesArr.length;_0x14cbe6++){
		cookie=cookiesArr[_0x14cbe6];
		originCookie=cookiesArr[_0x14cbe6];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x14cbe6+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x46285c='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x46285c);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x46285c);
	}
})()['catch'](_0x171d44=>$.logErr(_0x171d44))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x2fd7cd=false;
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
		await takePostRequest('getUserInfo');
		await takePostRequest('activityContent');
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if($.hasEnd===true||Date.now()>$.endTime){
			$.activityEnd=true;
			console.log('活动结束');
			return;
		}
		await takePostRequest('drawContent');
		await $.wait(1000);
		$.openList=[];
		$.allOpenCard=false;
		await takePostRequest('checkOpenCard');
		console.log($.actorUuid);
		if($.allOpenCard==false){
			console.log('开卡任务');
			for(o of $.openList){
				$.openCard=false;
				if(o.status==0){
					_0x2fd7cd=true;
					$.joinVenderId=o.value;
					$.shopactivityId='';
					for(let _0x115ee9=0;_0x115ee9<Array(2)['length'];_0x115ee9++){
						if(_0x115ee9>0)console.log('第'+_0x115ee9+'次 重新开卡');
						await joinShop();
						if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')==-1){
							break;
						}
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('💔 可能是开卡黑号,跳过运行');
						return;
					}
					await takePostRequest('drawContent');
					await takePostRequest('checkOpenCard');
					await $.wait(parseInt(Math.random()*1000+2000,10));
				}
			}
			await takePostRequest('activityContent');
		}else{
			console.log('已全部开卡');
		}
		if($.openCardScore1==1&&!$.outFlag){
			$.startDraw=1;
			_0x2fd7cd=true;
			await takePostRequest('startDraw');
			await $.wait(parseInt(Math.random()*1000+2000,10));
		}
		if($.openCardScore2==1&&!$.outFlag){
			$.startDraw=2;
			_0x2fd7cd=true;
			await takePostRequest('startDraw');
			await $.wait(parseInt(Math.random()*1000+3000,10));
		}
		if($.openCardScore3==1&&!$.outFlag){
			$.startDraw=3;
			_0x2fd7cd=true;
			await takePostRequest('startDraw');
			await $.wait(parseInt(Math.random()*1000+3000,10));
		}
		$.log('关注: '+$.followShop);
		if(!$.followShop&&!$.outFlag){
			_0x2fd7cd=true;
			$.followShopValue=1;
			await takePostRequest('followShop');
			await $.wait(parseInt(Math.random()*1000+1000,10));
		}
		$.log('加购: '+$.addSku);
		if(!$.addSku&&!$.outFlag){
			_0x2fd7cd=true;
			$.followShopValue=2;
			await takePostRequest('addSku');
		}
		$.runFalag=true;
		if(_0x2fd7cd){
			await takePostRequest('activityContent');
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
		await takePostRequest('getDrawRecordHasCoupon');
		await takePostRequest('getShareRecord');
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		console.log($.actorUuid);
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+10000,10));
	}catch(_0x19c050){
		console.log(_0x19c050);
	}
}
async function takePostRequest(_0x38e705){
	if($.outFlag)return;
	let _0x442952='https://lzdz1-isv.isvjcloud.com';
	let _0x4d7234='';
	let _0x39b03e='POST';
	let _0x3871db='';
	switch(_0x38e705){
		case 'getSimpleActInfoVo':
			url=_0x442952+'/dz/common/getSimpleActInfoVo';
			_0x4d7234='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x442952+'/customer/getMyPing';
			_0x4d7234='userId=1000090461&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x442952+'/common/accessLogWithAD';
			let _0x390c5c=_0x442952+'/dingzhi/shop/league/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x4d7234='venderId=1000090461&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x390c5c)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x442952+'/wxActionCommon/getUserInfo';
			_0x4d7234='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x442952+'/dingzhi/shop/league/activityContent';
			_0x4d7234='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x442952+'/dingzhi/taskact/common/drawContent';
			_0x4d7234='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'checkOpenCard':
			url=_0x442952+'/dingzhi/shop/league/checkOpenCard';
			_0x4d7234='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'startDraw':
			url=_0x442952+'/dingzhi/shop/league/startDraw';
			_0x4d7234='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+($.startDraw&&'&type='+$.startDraw||'');
			break;
		case 'followShop':
			url=_0x442952+'/dingzhi/shop/league/saveTask';
			_0x4d7234='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&shareUuid='+$.shareUuid+'&taskType=1&taskValue='+$.followShopValue;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=_0x442952+'/dingzhi/shop/league/saveTask';
			let _0x27fd81='';
			let _0xfe40ed='';
			if(_0x38e705=='viewVideo'){
				_0x27fd81=31;
				_0xfe40ed=31;
			}else if(_0x38e705=='visitSku'){
				_0x27fd81=5;
				_0xfe40ed=$.visitSkuValue||5;
			}else if(_0x38e705=='toShop'){
				_0x27fd81=14;
				_0xfe40ed=$.toShopValue||14;
			}else if(_0x38e705=='addSku'){
				_0x27fd81=2;
				_0xfe40ed=$.addSkuValue||2;
			}
			_0x4d7234='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x27fd81+'&taskValue='+_0xfe40ed;
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x442952+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x4d7234='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x442952+'/dingzhi/taskact/common/getShareRecord';
			_0x4d7234='activityId='+$.activityId+'&actorUuid='+$.actorUuid;
			break;
		case'邀请':
		case'助力':
			if(_0x38e705=='助力'){
				url=_0x442952+'/dingzhi/light/wishLamp/assist';
			}else{
				url=_0x442952+'/dingzhi/linkgame/assist/status';
			}
			_0x4d7234='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		default:
			console.log('错误'+_0x38e705);
	}
	let _0x368ffc=getPostRequest(url,_0x4d7234,_0x39b03e);
	return new Promise(async _0x2e915a=>{
		$.post(_0x368ffc,(_0x2b78fc,_0x564fcf,_0x4b08bb)=>{
			try{
				setActivityCookie(_0x564fcf);
				if(_0x2b78fc){
					if(_0x564fcf&&typeof _0x564fcf.statusCode!='undefined'){
						if(_0x564fcf.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x2b78fc,_0x2b78fc));
					console.log(_0x38e705+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x38e705,_0x4b08bb);
				}
			}catch(_0xacf10a){
				console.log(_0xacf10a,_0x564fcf);
			}finally{
				_0x2e915a();
			}
		});
	});
}
async function dealReturn(_0x6e0dd7,_0x52da33){
	let _0x2f53d3='';
	try{
		if(_0x6e0dd7!='accessLogWithAD'||_0x6e0dd7!='drawContent'){
			if(_0x52da33){
				_0x2f53d3=JSON.parse(_0x52da33);
			}
		}
	}catch(_0x2ea0c8){
		console.log(_0x6e0dd7+' 执行任务异常');
		console.log(_0x52da33);
		$.runFalag=false;
	}
	try{
		switch(_0x6e0dd7){
			case 'getSimpleActInfoVo':
				if(typeof _0x2f53d3=='object'){
					if(_0x2f53d3.result&&_0x2f53d3.result===true){
						if(typeof _0x2f53d3.data['shopId']!='undefined')$.shopId=_0x2f53d3.data['shopId'];
						if(typeof _0x2f53d3.data['venderId']!='undefined')$.venderId=_0x2f53d3.data['venderId'];
					}else if(_0x2f53d3.errorMessage){
						console.log(_0x6e0dd7+' '+(_0x2f53d3.errorMessage||''));
					}else{
						console.log(_0x6e0dd7+' '+_0x52da33);
					}
				}else{
					console.log(_0x6e0dd7+' '+_0x52da33);
				}
				break;
			case 'getMyPing':
				if(typeof _0x2f53d3=='object'){
					if(_0x2f53d3.result&&_0x2f53d3.result===true){
						if(_0x2f53d3.data&&typeof _0x2f53d3.data['secretPin']!='undefined')$.Pin=_0x2f53d3.data['secretPin'];
						if(_0x2f53d3.data&&typeof _0x2f53d3.data['nickname']!='undefined')$.nickname=_0x2f53d3.data['nickname'];
					}else if(_0x2f53d3.errorMessage){
						console.log(_0x6e0dd7+' '+(_0x2f53d3.errorMessage||''));
					}else{
						console.log(_0x6e0dd7+' '+_0x52da33);
					}
				}else{
					console.log(_0x6e0dd7+' '+_0x52da33);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x2f53d3=='object'){
					if(_0x2f53d3.result&&_0x2f53d3.result===true){
						if(_0x2f53d3.data&&typeof _0x2f53d3.data['yunMidImageUrl']!='undefined')$.attrTouXiang=_0x2f53d3.data['yunMidImageUrl']||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
					}else if(_0x2f53d3.errorMessage){
						console.log(_0x6e0dd7+' '+(_0x2f53d3.errorMessage||''));
					}else{
						console.log(_0x6e0dd7+' '+_0x52da33);
					}
				}else{
					console.log(_0x6e0dd7+' '+_0x52da33);
				}
				break;
			case 'activityContent':
				if(typeof _0x2f53d3=='object'){
					if(_0x2f53d3.result&&_0x2f53d3.result===true){
						$.endTime=_0x2f53d3.data['endTime']||0;
						$.hasEnd=_0x2f53d3.data['hasEnd']||false;
						$.actorUuid=_0x2f53d3.data['actorUuid']||'';
						$.followShop=_0x2f53d3.data['followShop']['allStatus']||false;
						$.addSku=_0x2f53d3.data['addSku']['allStatus']||false;
						if(_0x2f53d3.data['followShop']&&_0x2f53d3.data['followShop']['settings']&&_0x2f53d3.data['followShop']['settings'][0]){
							$.followShopValue=_0x2f53d3.data['followShop']['settings'][0]['value']||1;
						}
						if(_0x2f53d3.data['addSku']&&_0x2f53d3.data['addSku']['settings']&&_0x2f53d3.data['addSku']['settings'][0]){
							$.addSkuValue=_0x2f53d3.data['addSku']['settings'][0]['value']||2;
						}
					}else if(_0x2f53d3.errorMessage){
						console.log(_0x6e0dd7+' '+(_0x2f53d3.errorMessage||''));
					}else{
						console.log(_0x6e0dd7+' '+_0x52da33);
					}
				}else{
					console.log(_0x6e0dd7+' '+_0x52da33);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x2f53d3=='object'){
					if(_0x2f53d3.result&&_0x2f53d3.result===true){
						let _0x267610=_0x2f53d3.data['cardList1']||[];
						let _0x39df54=_0x2f53d3.data['cardList2']||[];
						let _0x5aff40=_0x2f53d3.data['cardList']||[];
						$.openList=[..._0x5aff40,..._0x267610,..._0x39df54];
						$.allOpenCard=_0x2f53d3.data['allOpenCard']||false;
						$.openCardScore1=_0x2f53d3.data['score1']||_0x2f53d3.data['drawScore1']||0;
						$.openCardScore2=_0x2f53d3.data['score2']||_0x2f53d3.data['drawScore2']||0;
						$.openCardScore3=_0x2f53d3.data['score3']||_0x2f53d3.data['drawScore3']||0;
						$.drawScore=_0x2f53d3.data['drawScore']||0;
						if(_0x2f53d3.data['sendBeanNum']||_0x2f53d3.data['addBeanNum'])console.log('开卡获得:'+(_0x2f53d3.data['sendBeanNum']||_0x2f53d3.data['addBeanNum'])+'豆');
					}else if(_0x2f53d3.errorMessage){
						console.log(_0x6e0dd7+' '+(_0x2f53d3.errorMessage||''));
					}else{
						console.log(_0x6e0dd7+' '+_0x52da33);
					}
				}else{
					console.log(_0x6e0dd7+' '+_0x52da33);
				}
				break;
			case 'startDraw':
			case 'followShop':
			case 'viewVideo':
			case 'visitSku':
			case 'toShop':
			case 'addSku':
				if(typeof _0x2f53d3=='object'){
					if(_0x2f53d3.result&&_0x2f53d3.result===true){
						if(typeof _0x2f53d3.data=='object'){
							let _0x2f1adb='';
							let _0x437d7f='抽奖';
							if(_0x2f53d3.data['addBeanNum']&&_0x2f53d3.data['sendStatus']){
								_0x2f1adb=_0x2f53d3.data['addBeanNum']+'京豆';
							}
							if(_0x6e0dd7=='followShop'){
								_0x437d7f='关注';
								if(_0x2f53d3.data['beanNumMember']&&_0x2f53d3.data['assistSendStatus']){
									_0x2f1adb+=' 额外获得:'+_0x2f53d3.data['beanNumMember']+'京豆';
								}
							}else if(_0x6e0dd7=='addSku'){
								_0x437d7f='加购';
							}else if(_0x6e0dd7=='viewVideo'){
								_0x437d7f='热门文章';
							}else if(_0x6e0dd7=='toShop'){
								_0x437d7f='浏览店铺';
							}else if(_0x6e0dd7=='visitSku'){
								_0x437d7f='浏览商品';
							}else{
								_0x2f1adb=_0x2f53d3.data['drawOk']==true&&(_0x2f53d3.data['drawInfoType']==6&&_0x2f53d3.data['name']||'')||'空气💨';
							}
							if(!_0x2f1adb){
								_0x2f1adb='空气💨';
							}
							console.log(_0x437d7f+'获得:'+(_0x2f1adb||_0x52da33));
						}else{
							console.log(_0x6e0dd7+' '+_0x52da33);
						}
					}else if(_0x2f53d3.errorMessage){
						$.runFalag=false;
						console.log(_0x6e0dd7+' '+(_0x2f53d3.errorMessage||''));
					}else{
						console.log(_0x6e0dd7+' '+_0x52da33);
					}
				}else{
					console.log(_0x6e0dd7+' '+_0x52da33);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x2f53d3=='object'){
					if(_0x2f53d3.result&&_0x2f53d3.result===true){
						console.log('我的奖品：');
						let _0x3b4a99=0;
						let _0x230d07=0;
						for(let _0x2cde4a in _0x2f53d3.data){
							let _0x4344e3=_0x2f53d3.data[_0x2cde4a];
							if(_0x4344e3.value=='邀请好友'){
								_0x3b4a99++;
								_0x230d07=_0x4344e3.infoName['replace']('京豆','');
							}else{
								console.log(_0x4344e3.value+' '+_0x4344e3.infoName);
							}
						}
						if(_0x3b4a99>0)console.log('邀请好友('+_0x3b4a99+'):'+(_0x3b4a99*parseInt(_0x230d07,10)||30)+'京豆');
					}else if(_0x2f53d3.errorMessage){
						console.log(_0x6e0dd7+' '+(_0x2f53d3.errorMessage||''));
					}else{
						console.log(_0x6e0dd7+' '+_0x52da33);
					}
				}else{
					console.log(_0x6e0dd7+' '+_0x52da33);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x2f53d3=='object'){
					if(_0x2f53d3.result&&_0x2f53d3.result===true&&_0x2f53d3.data){
						$.ShareCount=_0x2f53d3.data['length'];
						$.log('=========== 你邀请了:'+_0x2f53d3.data['length']+'个');
					}else if(_0x2f53d3.errorMessage){
						console.log(_0x6e0dd7+' '+(_0x2f53d3.errorMessage||''));
					}else{
						console.log(_0x6e0dd7+' '+_0x52da33);
					}
				}else{
					console.log(_0x6e0dd7+' '+_0x52da33);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x6e0dd7+'-> '+_0x52da33);
		}
		if(typeof _0x2f53d3=='object'){
			if(_0x2f53d3.errorMessage){
				if(_0x2f53d3.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x2eea93){
		console.log(_0x2eea93);
	}
}
function getPostRequest(_0xd4a672,_0x476c94,_0x4a012e='POST'){
	let _0x23a774={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0xd4a672.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		_0x23a774.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x23a774.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0xd4a672,'method':_0x4a012e,'headers':_0x23a774,'body':_0x476c94,'timeout':30000};
}
function getCk(){
	return new Promise(_0xe2c1c6=>{
		let _0x2a3175={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(_0x2a3175,async(_0x113d91,_0x25f1de,_0x2cb23a)=>{
			try{
				if(_0x113d91){
					if(_0x25f1de&&typeof _0x25f1de.statusCode!='undefined'){
						if(_0x25f1de.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x113d91));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x59babe=_0x2cb23a.match(/(活动已经结束)/)&&_0x2cb23a.match(/(活动已经结束)/)[1]||'';
					if(_0x59babe){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x25f1de);
				}
			}catch(_0x52f439){
				$.logErr(_0x52f439,_0x25f1de);
			}finally{
				_0xe2c1c6();
			}
		});
	});
}
function setActivityCookie(_0x14a634){
	if(_0x14a634.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0x43b66b of _0x14a634.headers['set-cookie']){
			lz_cookie[_0x43b66b.split(';')[0]['substr'](0,_0x43b66b.split(';')[0]['indexOf']('='))]=_0x43b66b.split(';')[0]['substr'](_0x43b66b.split(';')[0]['indexOf']('=')+1);
		}
		for(const _0x36f867 of Object.keys(lz_cookie)){
			cookie+=_0x36f867+'='+lz_cookie[_0x36f867]+';';
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x35735a){
	_0x35735a=_0x35735a||32;
	let _0xb88af0='abcdef0123456789',_0x4b64ae=_0xb88af0.length,_0x3c35f4='';
	for(i=0;i<_0x35735a;i++)_0x3c35f4+=_0xb88af0.charAt(Math.floor(Math.random()*_0x4b64ae));
	return _0x3c35f4;
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x144f01=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x34e03a='';
		if($.shopactivityId)_0x34e03a=',"activityId":'+$.shopactivityId;
		const _0x68eaf7='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x34e03a+',"channel":406}';
		const _0x379d06={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x68eaf7)};
		const _0x1e4328=await getH5st('8adfb',_0x379d06);
		const _0x56257f={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x68eaf7+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1e4328),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x56257f,async(_0x58238c,_0x8337d9,_0x323d0b)=>{
			try{
				if(_0x58238c){
					if(_0x8337d9&&typeof _0x8337d9.statusCode!='undefined'){
						if(_0x8337d9.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x323d0b=_0x323d0b&&_0x323d0b.match(/jsonp_.*?\((.*?)\);/)&&_0x323d0b.match(/jsonp_.*?\((.*?)\);/)[1]||_0x323d0b;
					let _0x4b691f=$.toObj(_0x323d0b,_0x323d0b);
					if(_0x4b691f&&typeof _0x4b691f=='object'){
						if(_0x4b691f&&_0x4b691f.success===true){
							console.log(' >> '+_0x4b691f.message);
							$.errorJoinShop=_0x4b691f.message;
							if(_0x4b691f.result&&_0x4b691f.result['giftInfo']){
								for(let _0xcbf636 of _0x4b691f.result['giftInfo']['giftList']){
									console.log(' >> 入会获得：'+_0xcbf636.discountString+_0xcbf636.prizeName+_0xcbf636.secondLineDesc);
								}
							}
						}else if(_0x4b691f&&typeof _0x4b691f=='object'&&_0x4b691f.message){
							$.errorJoinShop=_0x4b691f.message;
							console.log(''+(_0x4b691f.message||''));
						}else{
							console.log(_0x323d0b);
						}
					}else{
						console.log(_0x323d0b);
					}
				}
			}catch(_0x5b4072){
				$.logErr(_0x5b4072,_0x8337d9);
			}finally{
				_0x144f01();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x30ab19=>{
		const _0x23eacc='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0xf7b20e={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x23eacc)};
		const _0xf91789=await getH5st('8adfb',_0xf7b20e);
		const _0x5c57d7={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x23eacc+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0xf91789),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x5c57d7,async(_0x3dcf93,_0x1dc29f,_0x38cb24)=>{
			try{
				if(_0x3dcf93){
					if(_0x1dc29f&&typeof _0x1dc29f.statusCode!='undefined'){
						if(_0x1dc29f.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x38cb24=_0x38cb24&&_0x38cb24.match(/jsonp_.*?\((.*?)\);/)&&_0x38cb24.match(/jsonp_.*?\((.*?)\);/)[1]||_0x38cb24;
					let _0x360483=$.toObj(_0x38cb24,_0x38cb24);
					if(_0x360483&&typeof _0x360483=='object'){
						if(_0x360483&&_0x360483.success==true){
							console.log('去加入：'+(_0x360483.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
							$.shopactivityId=_0x360483.result['interestsRuleList']&&_0x360483.result['interestsRuleList'][0]&&_0x360483.result['interestsRuleList'][0]['interestsInfo']&&_0x360483.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
						}
					}else{
						console.log(_0x38cb24);
					}
				}
			}catch(_0x5ad1f0){
				$.logErr(_0x5ad1f0,_0x1dc29f);
			}finally{
				_0x30ab19();
			}
		});
	});
}
function getAuthorCodeList(_0x4282ef){
	return new Promise(_0x46b484=>{
		const _0x533c19={'url':_0x4282ef+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x533c19,async(_0x345837,_0x569779,_0x1a9e48)=>{
			try{
				if(_0x345837){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x1a9e48)_0x1a9e48=JSON.parse(_0x1a9e48);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x5dbfde){
				$.logErr(_0x5dbfde,_0x569779);
				_0x1a9e48=null;
			}finally{
				_0x46b484(_0x1a9e48);
			}
		});
	});
}
function random(_0x4c093a,_0x40a105){
	return Math.floor(Math.random()*(_0x40a105-_0x4c093a))+_0x4c093a;
}
function jsonParse(_0x457b85){
	if(typeof _0x457b85=='string'){
		try{
			return JSON.parse(_0x457b85);
		}catch(_0x291037){
			console.log(_0x291037);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};