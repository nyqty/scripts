/*
12.30-1.6 迎新庆典
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
————————————————
入口：[ 12.30-1.6 迎新庆典 ]

没水

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:8 8 8 8 *
============Quantumultx===============
[task_local]
#12.30-1.6 迎新庆典
8 8 8 8 * jd_opencardL283.js, tag=12.30-1.6 迎新庆典, enabled=true

*/
const Env=require('./utils/Env');
const $=new Env('12.30-1.6 迎新庆典');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:'0':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'0';
let opencard_addCart=$.isNode()?process.env['opencard_addCart']?process.env['opencard_addCart']:false:$.getdata('opencard_addCart')?$.getdata('opencard_addCart'):false;
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
let domains='https://lzdz1-isv.isvjd.com';
let cookiesArr=[],cookie='';
let lz_cookie={};
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x2a967f=>{
		cookiesArr.push(jdCookieNode[_0x2a967f]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0xf39f06=>_0xf39f06.cookie)]['filter'](_0x4770df=>!!_0x4770df);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let lzopen=process.env['JD_LZ_OPENCARD']?process.env['JD_LZ_OPENCARD']:'true';
let whitelist='';
let blacklist='';
$.whitelist=process.env['jd_opencard_whitelist']||whitelist;
$.blacklist=process.env['jd_opencard_blacklist']||blacklist;
getWhitelist();
getBlacklist();
$.errMsgPin=[];
!(async()=>{
	if(lzopen==='false'){
		console.log('\n❌  已设置全局关闭开卡相关活动\n');
		return;
	}
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	authorCodeList=["04be317d13a2430f9144702f7b097fa2"];//await getAuthorCodeList('http://code.kingran.ga/283.json');
	$.activityId='d6a05b80fd234b469d5d4403b167a222';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	console.log('❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true');
	console.log('❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数');
	for(let _0x2409db=0;_0x2409db<cookiesArr.length;_0x2409db++){
		cookie=cookiesArr[_0x2409db];
		originCookie=cookiesArr[_0x2409db];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x2409db+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(1500);
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.errMsgPin['length']>0){
		let _0x3112da='以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist="'+$.errMsgPin['join']('&')+'"';
		allMessage+='\n'+_0x3112da;
	}
	if($.outFlag){
		let _0x54482b='此ip已被限制，请更换IP后再执行脚本';
		$.msg($.name,'',''+_0x54482b);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x54482b);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0xc53b94=>$.logErr(_0xc53b94))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x47d9ec=false;
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
			console.log('此ip已被限制，请更换IP后再执行脚本\n');
			return;
		}
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
		console.log($.actorUuid);
		if($.hasEnd===true||Date.now()>$.endTime){
			$.activityEnd=true;
			console.log('活动结束');
			return;
		}
		await takePostRequest('drawContent');
		$.openList=[];
		$.allOpenCard=false;
		await takePostRequest('checkOpenCard');
		await takePostRequest('taskRecord');
		await $.wait(1000);
		await takePostRequest('assist');
		if($.allOpenCard==false){
			console.log('开卡任务：');
			for(o of $.openList){
				$.openCard=false;
				if(!$.openVenderId['includes'](o.value*1)){
					_0x47d9ec=true;
					$.shopactivityId='';
					$.joinVenderId=o.venderId||o.value;
					await getshopactivityId();
					for(let _0x370ce7=0;_0x370ce7<Array(2)['length'];_0x370ce7++){
						if(_0x370ce7>0)console.log('第'+_0x370ce7+'次 重新开卡');
						await joinShop();
						await $.wait(parseInt(Math.random()*1000+1000,10));
						if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')==-1&&$.errorJoinShop['indexOf']('加入店铺会员失败')==-1){
							break;
						}
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('💔 可能是开卡黑号,跳过运行');
						return;
					}
					await takePostRequest('activityContent');
					await $.wait(parseInt(Math.random()*1000+1000,10));
				}
			}
		}else{
			console.log('已全部开卡');
		}
		if(!$.followShop&&!$.outFlag){
			console.log('');
			await takePostRequest('followShop');
			await $.wait(parseInt(Math.random()*1000+1200,10));
		}
		if(opencard_addCart){
			if(!$.addCart&&!$.outFlag){
				await takePostRequest('addCart');
				await $.wait(parseInt(Math.random()*1000+1200,10));
			}
		}
		console.log('去助力 -> '+$.shareUuid);
		await takePostRequest('assist');
		await $.wait(parseInt(Math.random()*1000+500,10));
		console.log($.assistState===1?'助力成功 ✅':$.assistState===10?'已经助力过了哟~':$.assistState===21?'未全部开卡或者其他原因':$.assistState===11?'已助力其他用户':$.assistState===0?'不能助力自己':'未知-'+$.assistState);
		await takePostRequest('assist');
		await $.wait(parseInt(Math.random()*1000+500,10));
		if(_0x47d9ec){
			await takePostRequest('activityContent');
		}
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x1d99fc=parseInt($.score/100);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x1d99fc>opencard_draw)_0x1d99fc=opencard_draw;
			console.log('已设置抽奖次数为'+_0x1d99fc+'次，当前有'+$.score+'金币');
			for(m=1;_0x1d99fc--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('startDraw');
				if($.runFalag==false)break;
				if(Number(_0x1d99fc)<=0)break;
				if(m>=5){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		if($.outFlag){
			console.log('🚫 此ip已被限制，请更换IP后再执行脚本\n');
			return;
		}
		console.log('\n当前已邀请'+$.assistCount+'人');
		await takePostRequest('drawRecord');
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力 -> '+$.shareUuid);
		}
		if($.index%5==0)await $.wait(parseInt(Math.random()*5000+15000,10));
	}catch(_0x5a1e83){
		console.log(_0x5a1e83);
	}
}
async function takePostRequest(_0x4da2ba){
	if($.outFlag)return;
	let _0x1e70c3='https://lzdz1-isv.isvjd.com';
	let _0x135e1f='';
	let _0x3298c6='POST';
	let _0x5cceee='';
	switch(_0x4da2ba){
		case 'getSimpleActInfoVo':
			url=_0x1e70c3+'/dz/common/getSimpleActInfoVo';
			_0x135e1f='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x1e70c3+'/customer/getMyPing';
			_0x135e1f='userId=10360863&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x1e70c3+'/common/accessLogWithAD';
			let _0x1d66fb=_0x1e70c3+'/dingzhi/joinCommon/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x135e1f='venderId=10360863&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x1d66fb)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x1e70c3+'/wxActionCommon/getUserInfo';
			_0x135e1f='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x1e70c3+'/dingzhi/joinCommon/activityContent';
			_0x135e1f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent('https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png')+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x1e70c3+'/dingzhi/joinCommon/drawContent';
			_0x135e1f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'checkOpenCard':
			url=_0x1e70c3+'/dingzhi/joinCommon/taskInfo';
			_0x135e1f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'assist':
			url=_0x1e70c3+'/dingzhi/joinCommon/assist';
			_0x135e1f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid+'&shareUuid='+$.shareUuid;
			break;
		case 'taskRecord':
			url=_0x1e70c3+'/dingzhi/joinCommon/taskRecord';
			_0x135e1f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid+'&taskType=';
			break;
		case'followShop':
			url=_0x1e70c3+'/dingzhi/joinCommon/doTask';
			_0x135e1f='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=20&taskValue=';
			break;
		case 'addCart':
			url=_0x1e70c3+'/dingzhi/joinCommon/doTask';
			_0x135e1f='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=23&taskValue=';
			break;
		case 'visitSkus':
			url=_0x1e70c3+'/dingzhi/joinCommon/doTask';
			_0x135e1f='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=10&taskValue='+$.taskValue;
			break;
		case 'sign':
		case 'browseGoods':
			url=_0x1e70c3+'/dingzhi/opencard/'+_0x4da2ba;
			_0x135e1f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0x4da2ba=='browseGoods')_0x135e1f+='&value='+$.visitSkuValue;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case'addSku':
			url=_0x1e70c3+'/dingzhi/opencard/'+_0x4da2ba;
			let _0x7a85df='';
			let _0x1936c2='';
			if(_0x4da2ba=='viewVideo'){
				_0x7a85df=31;
				_0x1936c2=31;
			}else if(_0x4da2ba=='visitSku'){
				_0x7a85df=5;
				_0x1936c2=$.visitSkuValue||5;
			}else if(_0x4da2ba=='toShop'){
				_0x7a85df=14;
				_0x1936c2=$.toShopValue||14;
			}else if(_0x4da2ba=='addSku'){
				_0x7a85df=2;
				_0x1936c2=$.addSkuValue||2;
			}
			_0x135e1f='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x7a85df+'&taskValue='+_0x1936c2;
			break;
		case 'drawRecord':
			url=_0x1e70c3+'/dingzhi/joinCommon/drawRecord';
			_0x135e1f='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getShareRecord':
			url=_0x1e70c3+'/dingzhi/joinCommon/shareRecord';
			_0x135e1f='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&num=30';
			break;
		case 'startDraw':
			url=_0x1e70c3+'/dingzhi/joinCommon/startDraw';
			_0x135e1f='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x4da2ba);
	}
	let _0x446838=getPostRequest(url,_0x135e1f,_0x3298c6);
	return new Promise(async _0x58c7f1=>{
		$.post(_0x446838,(_0x431575,_0x1992a1,_0x285bf7)=>{
			try{
				setActivityCookie(_0x1992a1);
				if(_0x431575){
					if(_0x1992a1&&typeof _0x1992a1.statusCode!='undefined'){
						if(_0x1992a1.statusCode==493){
							console.log('此ip已被限制，请更换IP后再执行脚本\n');
						}
					}
					console.log(''+$.toStr(_0x431575,_0x431575));
					console.log(_0x4da2ba+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x4da2ba,_0x285bf7);
				}
			}catch(_0x41ebde){
				console.log(_0x41ebde,_0x1992a1);
			}finally{
				_0x58c7f1();
			}
		});
	});
}
async function dealReturn(_0x2541bf,_0x1a73a5){
	let _0x494a22='';
	try{
		if(_0x2541bf!='accessLogWithAD'||_0x2541bf!='drawContent'){
			if(_0x1a73a5){
				_0x494a22=JSON.parse(_0x1a73a5);
			}
		}
	}catch(_0x5eb6a5){
		console.log(_0x2541bf+' 执行任务异常');
		console.log(_0x1a73a5);
		$.runFalag=false;
	}
	try{
		switch(_0x2541bf){
			case 'getSimpleActInfoVo':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						if(typeof _0x494a22.data['shopId']!='undefined')$.shopId=_0x494a22.data['shopId'];
						if(typeof _0x494a22.data['venderId']!='undefined')$.venderId=_0x494a22.data['venderId'];
					}else if(_0x494a22.errorMessage){
						console.log(_0x2541bf+' '+(_0x494a22.errorMessage||''));
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case 'getMyPing':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						if(_0x494a22.data&&typeof _0x494a22.data['secretPin']!='undefined')$.Pin=_0x494a22.data['secretPin'];
						if(_0x494a22.data&&typeof _0x494a22.data['nickname']!='undefined')$.nickname=_0x494a22.data['nickname'];
					}else if(_0x494a22.errorMessage){
						console.log(''+(_0x494a22.errorMessage||''));
						$.errMsgPin['push']($.UserName);
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						if(_0x494a22.data&&typeof _0x494a22.data['yunMidImageUrl']!='undefined')$.attrTouXiang=_0x494a22.data['yunMidImageUrl']||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
					}else if(_0x494a22.errorMessage){
						console.log(_0x2541bf+' '+(_0x494a22.errorMessage||''));
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case 'activityContent':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						$.endTime=_0x494a22.data['endTime']||_0x494a22.data['activityVo']&&_0x494a22.data['activityVo']['endTime']||_0x494a22.data['activity']['endTime']||0;
						$.hasEnd=_0x494a22.data['isEnd']||false;
						$.score=_0x494a22.data['actorInfo']['score']||0;
						$.actorUuid=_0x494a22.data['actorInfo']['uuid']||'';
						$.assistCount=_0x494a22.data['actorInfo']['assistCount']||0;
					}else if(_0x494a22.errorMessage){
						console.log(_0x2541bf+' '+(_0x494a22.errorMessage||''));
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case'assist':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						$.assistState=_0x494a22.data['assistState']||0;
						$.allOpenCard=_0x494a22.data['openCardInfo']['openAll']||false;
						$.openVenderId=_0x494a22.data['openCardInfo']['openVenderId']||[];
					}else if(_0x494a22.errorMessage){
						console.log(_0x2541bf+' '+(_0x494a22.errorMessage||''));
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case'taskRecord':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						$.followShop=_0x494a22.data['20']['recordCount']||0;
						$.addCart=_0x494a22.data['23']['recordCount']||0;
						$.visitSku=_0x494a22.data['10']['recordCount']||0;
					}else if(_0x494a22.errorMessage){
						console.log(_0x2541bf+' '+(_0x494a22.errorMessage||''));
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						let _0x4cacb0=_0x494a22.data['10']['settingInfo']||[];
						let _0x516ad8=_0x494a22.data['cardList']||[];
						let _0x5034e3=_0x494a22.data['openCardList']||[];
						$.openList=[..._0x516ad8,..._0x4cacb0,..._0x5034e3];
						$.openCardScore1=_0x494a22.data['score1']||0;
						$.openCardScore2=_0x494a22.data['score2']||0;
						$.drawScore=_0x494a22.data['drawScore']||0;
						if(_0x494a22.data['beans']||_0x494a22.data['addBeanNum'])console.log('开卡获得：'+(_0x494a22.data['beans']||_0x494a22.data['addBeanNum'])+'京豆 🐶');
					}else if(_0x494a22.errorMessage){
						console.log(_0x2541bf+' '+(_0x494a22.errorMessage||''));
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case 'followShop':
			case 'viewVideo':
			case 'visitSku':
			case 'toShop':
			case 'addSku':
			case 'sign':
			case 'addCart':
			case 'browseGoods':
			case 'startDraw':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						if(typeof _0x494a22.data=='object'){
							let _0x3f43fc='';
							let _0x2a0f05='抽奖';
							if(_0x494a22.data['addBeanNum']){
								_0x3f43fc=_0x494a22.data['addBeanNum']+'京豆';
							}
							if(_0x494a22.data['addPoint']){
								_0x3f43fc+=' '+_0x494a22.data['addPoint']+'游戏机会';
							}
							if(_0x2541bf=='followShop'){
								_0x2a0f05='关注';
								if(_0x494a22.data['beans']!='0'){
									_0x3f43fc+=_0x494a22.data['beans']+'京豆 🐶';
								}
							}else if(_0x2541bf=='addSku'||_0x2541bf=='addCart'){
								_0x2a0f05='加购';
								if(_0x494a22.data['beans']!='0'){
									_0x3f43fc+=_0x494a22.data['beans']+'京豆 🐶';
								}
							}else if(_0x2541bf=='viewVideo'){
								_0x2a0f05='热门文章';
							}else if(_0x2541bf=='toShop'){
								_0x2a0f05='浏览店铺';
							}else if(_0x2541bf=='visitSku'||_0x2541bf=='browseGoods'){
								_0x2a0f05='浏览商品';
							}else if(_0x2541bf=='sign'){
								_0x2a0f05='签到';
							}else{
								let _0x425dac=typeof _0x494a22.data['drawOk']==='object'&&_0x494a22.data['drawOk']||_0x494a22.data;
								_0x3f43fc=_0x425dac.drawOk==true&&_0x425dac.name||'';
							}
							if(!_0x3f43fc){
								_0x3f43fc='空气 💨';
							}
							console.log(_0x2a0f05+'获得：'+(_0x3f43fc||_0x1a73a5));
						}else{
							console.log(''+_0x1a73a5);
						}
					}else if(_0x494a22.errorMessage){
						$.runFalag=false;
						console.log(''+(_0x494a22.errorMessage||''));
					}else{
						console.log(''+_0x1a73a5);
					}
				}else{
					console.log(''+_0x1a73a5);
				}
				break;
			case 'drawRecord':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true){
						let _0xf4b2df=0;
						for(let _0x40c3be of _0x494a22.data){
							infoType=_0x40c3be.infoType;
							infoName=_0x40c3be.infoName;
							switch(infoType){
								case 6:
									infoName=Number(infoName.replace('京豆',''));
									_0xf4b2df+=infoName;
									break;
								case 7:
									console.log('🎉 恭喜获得实物 '+infoName+' ，请前往活动页填写收货地址~');
									await notify.sendNotify(''+$.name,'【账号'+$.UserName+'】抽中'+infoName+'，请前往活动页填写收货地址领取。');
									break;
								case 13:
									console.log('🎉 恭喜获得'+infoName);
									await notify.sendNotify(''+$.name,'【账号'+$.UserName+'】抽中'+infoName);
									break;
							}
						}
						if(_0xf4b2df>0){
							console.log('当前累计获得 '+_0xf4b2df+' 京豆 🐶');
						}
					}else if(_0x494a22.errorMessage){
						console.log(_0x2541bf+' '+(_0x494a22.errorMessage||''));
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x494a22=='object'){
					if(_0x494a22.result&&_0x494a22.result===true&&_0x494a22.data){
						$.ShareCount=_0x494a22.data['shareList']['length'];
						$.log('=========== 你邀请了:'+$.ShareCount+'个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n');
					}else if(_0x494a22.errorMessage){
						console.log(_0x2541bf+' '+(_0x494a22.errorMessage||''));
					}else{
						console.log(_0x2541bf+' '+_0x1a73a5);
					}
				}else{
					console.log(_0x2541bf+' '+_0x1a73a5);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x2541bf+'-> '+_0x1a73a5);
		}
		if(typeof _0x494a22=='object'){
			if(_0x494a22.errorMessage){
				if(_0x494a22.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x1da024){
		console.log(_0x1da024);
	}
}
function getPostRequest(_0x5e93ec,_0x517759,_0x40024d='POST'){
	let _0x4879ef={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x5e93ec.indexOf('https://lzdz1-isv.isvjd.com')>-1){
		_0x4879ef.Referer='https://lzdz1-isv.isvjd.com/dingzhi/joinCommon/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x4879ef.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x5e93ec,'method':_0x40024d,'headers':_0x4879ef,'body':_0x517759,'timeout':30000};
}
function getCk(){
	return new Promise(_0x2f1903=>{
		let _0x57ebdb={'url':'https://lzdz1-isv.isvjd.comnCommon/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(_0x57ebdb,async(_0x14ae9a,_0x5d51af,_0x3caf43)=>{
			try{
				if(_0x14ae9a){
					if(_0x5d51af&&typeof _0x5d51af.statusCode!='undefined'){}
					console.log(''+$.toStr(_0x14ae9a));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x260d45=_0x3caf43.match(/(活动已经结束)/)&&_0x3caf43.match(/(活动已经结束)/)[1]||'';
					if(_0x260d45){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x5d51af);
				}
			}catch(_0x4ea5db){
				$.logErr(_0x4ea5db,_0x5d51af);
			}finally{
				_0x2f1903();
			}
		});
	});
}
function setActivityCookie(_0x37a117){
	if(_0x37a117){
		if(_0x37a117.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x41238d of _0x37a117.headers['set-cookie']){
				lz_cookie[_0x41238d.split(';')[0]['substr'](0,_0x41238d.split(';')[0]['indexOf']('='))]=_0x41238d.split(';')[0]['substr'](_0x41238d.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x1ff97b of Object.keys(lz_cookie)){
				cookie+=_0x1ff97b+'='+lz_cookie[_0x1ff97b]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x5f4774){
	_0x5f4774=_0x5f4774||32;
	let _0x1ec827='abcdef0123456789',_0x4a04ea=_0x1ec827.length,_0x1eb592='';
	for(i=0;i<_0x5f4774;i++)_0x1eb592+=_0x1ec827.charAt(Math.floor(Math.random()*_0x4a04ea));
	return _0x1eb592;
}
function jsonParse(_0x12516b){
	if(typeof _0x12516b=='string'){
		try{
			return JSON.parse(_0x12516b);
		}catch(_0x2917c5){
			console.log(_0x2917c5);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x95fef7=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x254369='';
		if($.shopactivityId)_0x254369=',"activityId":'+$.shopactivityId;
		const _0x15038b='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x254369+',"channel":406}';
		const _0x57b5be={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x15038b)};
		const _0x4ebd96=await getH5st('8adfb',_0x57b5be);
		const _0x3c5be7={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x15038b+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x4ebd96),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x3c5be7,async(_0x215e9f,_0x1d1851,_0x4792a5)=>{
			try{
				if(_0x215e9f){
					if(_0x1d1851&&typeof _0x1d1851.statusCode!='undefined'){
						if(_0x1d1851.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x4792a5=_0x4792a5&&_0x4792a5.match(/jsonp_.*?\((.*?)\);/)&&_0x4792a5.match(/jsonp_.*?\((.*?)\);/)[1]||_0x4792a5;
					let _0x487bae=$.toObj(_0x4792a5,_0x4792a5);
					if(_0x487bae&&typeof _0x487bae=='object'){
						if(_0x487bae&&_0x487bae.success===true){
							console.log(' >> '+_0x487bae.message);
							$.errorJoinShop=_0x487bae.message;
							if(_0x487bae.result&&_0x487bae.result['giftInfo']){
								for(let _0x5dc6ef of _0x487bae.result['giftInfo']['giftList']){
									console.log(' >> 入会获得：'+_0x5dc6ef.discountString+_0x5dc6ef.prizeName+_0x5dc6ef.secondLineDesc);
								}
							}
						}else if(_0x487bae&&typeof _0x487bae=='object'&&_0x487bae.message){
							$.errorJoinShop=_0x487bae.message;
							console.log(''+(_0x487bae.message||''));
						}else{
							console.log(_0x4792a5);
						}
					}else{
						console.log(_0x4792a5);
					}
				}
			}catch(_0x3b4c58){
				$.logErr(_0x3b4c58,_0x1d1851);
			}finally{
				_0x95fef7();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x29e218=>{
		const _0x18c964='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x3c330b={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x18c964)};
		const _0x57d0a3=await getH5st('8adfb',_0x3c330b);
		const _0x5cfa8f={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x18c964+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x57d0a3),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x5cfa8f,async(_0x5ecfea,_0x132410,_0x83cc79)=>{
			try{
				if(_0x5ecfea){
					if(_0x132410&&typeof _0x132410.statusCode!='undefined'){
						if(_0x132410.statusCode==403){
							console.log('此ip已无法开卡，请更换IP后再执行脚本\n');
						}
					}
				}else{
					_0x83cc79=_0x83cc79&&_0x83cc79.match(/jsonp_.*?\((.*?)\);/)&&_0x83cc79.match(/jsonp_.*?\((.*?)\);/)[1]||_0x83cc79;
					let _0x593648=$.toObj(_0x83cc79,_0x83cc79);
					if(_0x593648&&typeof _0x593648=='object'){
						if(_0x593648&&_0x593648.success==true){
							console.log('去加入：'+(_0x593648.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
							$.shopactivityId=_0x593648.result['interestsRuleList']&&_0x593648.result['interestsRuleList'][0]&&_0x593648.result['interestsRuleList'][0]['interestsInfo']&&_0x593648.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
						}
					}else{
						console.log(_0x83cc79);
					}
				}
			}catch(_0x43ff2d){
				$.logErr(_0x43ff2d,_0x132410);
			}finally{
				_0x29e218();
			}
		});
	});
}
function getAuthorCodeList(_0x4c612b){
	return new Promise(_0x47e620=>{
		const _0x3fcb90={'url':_0x4c612b+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x3fcb90,async(_0xb72a8,_0x1ab86c,_0x2a3745)=>{
			try{
				if(_0xb72a8){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x2a3745)_0x2a3745=JSON.parse(_0x2a3745);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x43e617){
				$.logErr(_0x43e617,_0x1ab86c);
				_0x2a3745=null;
			}finally{
				_0x47e620(_0x2a3745);
			}
		});
	});
}
function random(_0x535220,_0x208822){
	return Math.floor(Math.random()*(_0x208822-_0x535220))+_0x535220;
}
function getBlacklist(){
	if($.blacklist=='')return;
	console.log('当前已设置黑名单：');
	const _0x3942cb=Array.from(new Set($.blacklist['split']('&')));
	console.log(_0x3942cb.join('&')+'\n');
	let _0x4fa447=_0x3942cb;
	let _0x107e59=[];
	let _0x6a9f24=false;
	for(let _0x1250a9=0;_0x1250a9<cookiesArr.length;_0x1250a9++){
		let _0x1e7388=decodeURIComponent(cookiesArr[_0x1250a9]['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookiesArr[_0x1250a9]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]||'');
		if(!_0x1e7388)break;
		let _0x5ea537=false;
		for(let _0x8e2ebf of _0x4fa447){
			if(_0x8e2ebf&&_0x8e2ebf==_0x1e7388){
				_0x5ea537=true;
				break;
			}
		}
		if(!_0x5ea537){
			_0x6a9f24=true;
			_0x107e59.splice(_0x1250a9,-1,cookiesArr[_0x1250a9]);
		}
	}
	if(_0x6a9f24)cookiesArr=_0x107e59;
}
function toFirst(_0x21b7db,_0x539385){
	if(_0x539385!=0){
		_0x21b7db.unshift(_0x21b7db.splice(_0x539385,1)[0]);
	}
}
function getWhitelist(){
	if($.whitelist==''){
		helpCookiesArr=$.toObj($.toStr(cookiesArr,cookiesArr));
		return;
	}
	console.log('当前已设置白名单：');
	const _0x8f68f0=Array.from(new Set($.whitelist['split']('&')));
	console.log(_0x8f68f0.join('&')+'\n');
	let _0x5905c8=[];
	let _0x51a22f=_0x8f68f0;
	for(let _0x160308 in cookiesArr){
		let _0x4db286=decodeURIComponent(cookiesArr[_0x160308]['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookiesArr[_0x160308]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]||'');
		if(_0x51a22f.includes(_0x4db286)){
			_0x5905c8.push(cookiesArr[_0x160308]);
		}
	}
	helpCookiesArr=_0x5905c8;
	if(_0x51a22f.length>1){
		for(let _0x131777 in _0x51a22f){
			let _0x38d1cc=_0x51a22f[_0x51a22f.length-1-_0x131777];
			if(!_0x38d1cc)continue;
			for(let _0x160308 in helpCookiesArr){
				let _0x4db286=decodeURIComponent(helpCookiesArr[_0x160308]['match'](/pt_pin=([^; ]+)(?=;?)/)&&helpCookiesArr[_0x160308]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]);
				if(_0x38d1cc==_0x4db286){
					toFirst(helpCookiesArr,_0x160308);
				}
			}
		}
	}
};