/*
12.9-12.19 酒水会员盛典
新增开卡脚本，一次性脚本


第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本
————————————————
入口：[ 12.9-12.19 酒水会员盛典]

请求太频繁会被黑ip
过10分钟再执行
  
cron:8 8 8 8 *
============Quantumultx===============
[task_local]
#12.9-12.19 酒水会员盛典
8 8 8 8 * jd_opencardL277.js, tag=12.9-12.19 酒水会员盛典, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.9-12.19 酒水会员盛典');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
let domains='https://lzdz-isv.isvjcloud.com';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x820ee9=>{
		cookiesArr.push(jdCookieNode[_0x820ee9]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x4ccc8f=>_0x4ccc8f.cookie)]['filter'](_0xff7338=>!!_0xff7338);
}
let opencard_draw='0';
opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:opencard_draw:$.getdata('opencard_draw')?$.getdata('opencard_draw'):opencard_draw;
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let cookies=[];
let lz_cookie={};
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	authorCodeList=[]//await getAuthorCodeList('http://code.kingran.ga/277.json');
	$.activityId='dz7943b5bf718c4701bb5eee36a17f';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/drinkcategory/piecetoge1/activity?activityId='+$.activityId);
	for(let _0x4ff2fe=0;_0x4ff2fe<cookiesArr.length;_0x4ff2fe++){
		cookie=cookiesArr[_0x4ff2fe];
		originCookie=cookiesArr[_0x4ff2fe];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x4ff2fe+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(1000);
			if(_0x4ff2fe==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x104f47='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x104f47);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x104f47);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
	console.log($.toStr(cookies));
})()['catch'](_0x15ed11=>$.logErr(_0x15ed11))['finally'](()=>$.done());
async function run(){
	try{
		$.joinShopStatus=true;
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x79fb5d=false;
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
		if($.hotFlag)return;
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
				if(o.openStatus==0){
					_0x79fb5d=true;
					$.joinVenderId=o.venderId;
					$.errorJoinShop='';
					for(let _0x4e0c37=0;_0x4e0c37<Array(2)['length'];_0x4e0c37++){
						if(_0x4e0c37>0)console.log('第'+_0x4e0c37+'次 重新开卡');
						await joinShop();
						if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')==-1)break;
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('开卡失败❌ ，重新执行脚本');
					}
					await takePostRequest('activityContent');
					await takePostRequest('drawContent');
					await takePostRequest('checkOpenCard');
					await $.wait(parseInt(Math.random()*2000+1000,10));
				}
			}
		}else{
			console.log('已全部开卡');
		}
		$.log('关注: '+$.followShop);
		if(!$.followShop&&!$.outFlag){
			_0x79fb5d=true;
			await takePostRequest('followShop');
		}
		$.log('关注频道: '+$.followPeony);
		if(!$.followPeony&&!$.outFlag){
			_0x79fb5d=true;
			await takePostRequest('followPeony');
		}
		$.log('加购: '+$.followSku);
		if(!$.followSku&&!$.outFlag){
			_0x79fb5d=true;
			await takePostRequest('addSku');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}
		if(_0x79fb5d){
			await takePostRequest('activityContent');
		}
		console.log($.score+'值');
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x25ce17=parseInt($.score/100);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x25ce17>opencard_draw)_0x25ce17=opencard_draw;
			console.log('抽奖次数为:'+_0x25ce17);
			for(m=1;_0x25ce17--;m++){
				console.log('第'+m+'次抽奖');
				await takePostRequest('抽奖');
				if($.runFalag==false)break;
				if(Number(_0x25ce17)<=0)break;
				if(m>=10){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}else console.log('如需抽奖请设置环境变量[opencard_draw]为"3" 3为次数');
		await $.wait(parseInt(Math.random()*1000+2000,10));
		await takePostRequest('getDrawRecordHasCoupon');
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
		await $.wait(parseInt(Math.random()*2000+2000,10));
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+10000,10));
	}catch(_0x4e4b6f){
		console.log(_0x4e4b6f);
	}
}
async function takePostRequest(_0x4c645b){
	if($.outFlag)return;
	let _0x1214a7='https://lzdz1-isv.isvjcloud.com';
	let _0x4f1884='';
	let _0x5686e6='POST';
	let _0x276023='';
	switch(_0x4c645b){
		case'getMyPing':
			url=_0x1214a7+'/customer/getMyCidPing';
			_0x4f1884='userId=1000086085&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x1214a7+'/common/accessLogWithAD';
			let _0x312f0b=_0x1214a7+'/dingzhi/drinkcategory/piecetoge1/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x4f1884='venderId=1000086085&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x312f0b)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x1214a7+'/wxActionCommon/getUserInfo';
			_0x4f1884='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x1214a7+'/dingzhi/drinkcategory/piecetoge1/activityContent';
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x1214a7+'/dingzhi/taskact/common/drawContent';
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'checkOpenCard':
			url=_0x1214a7+'/dingzhi/drinkcategory/piecetoge1/initOpenCard';
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&shareUuid='+$.shareUuid;
			break;
		case 'info':
			url=_0x1214a7+'/dingzhi/linkgame/task/opencard/info';
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'startDraw':
			url=_0x1214a7+'/joint/order/draw';
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&drawType=1';
			break;
		case 'followShop':
			url=_0x1214a7+'/dingzhi/drinkcategory/piecetoge1/saveTask';
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&shareUuid='+$.shareUuid+'&taskType=23&taskValue=23';
			break;
		case 'sign':
		case 'addCart':
		case 'browseGoods':
			url=_0x1214a7+'/dingzhi/opencard/'+_0x4c645b;
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0x4c645b=='browseGoods')_0x4f1884+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(_0x4c645b=='助力'){
				url=_0x1214a7+'/dingzhi/linkgame/assist';
			}else{
				url=_0x1214a7+'/dingzhi/linkgame/assist/status';
			}
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'followPeony':
		case 'addSku':
			url=_0x1214a7+'/dingzhi/drinkcategory/piecetoge1/saveTask';
			let _0x56139c='';
			let _0xd268c3='';
			if(_0x4c645b=='viewVideo'){
				_0x56139c=31;
				_0xd268c3=31;
			}else if(_0x4c645b=='visitSku'){
				_0x56139c=5;
				_0xd268c3=$.visitSkuValue||5;
			}else if(_0x4c645b=='toShop'){
				_0x56139c=14;
				_0xd268c3=$.toShopValue||14;
			}else if(_0x4c645b=='followPeony'){
				_0x56139c=6;
				_0xd268c3=6;
			}else if(_0x4c645b=='addSku'){
				_0x56139c=21;
				_0xd268c3=21;
			}
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x56139c+'&taskValue='+_0xd268c3;
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x1214a7+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x1214a7+'/dingzhi/taskact/common/getShareRecord';
			_0x4f1884='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case'抽奖':
			url=_0x1214a7+'/dingzhi/drinkcategory/piecetoge1/draw';
			_0x4f1884='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x4c645b);
	}
	let _0x265f0a=getPostRequest(url,_0x4f1884,_0x5686e6);
	return new Promise(async _0x38dc54=>{
		$.post(_0x265f0a,(_0x343bed,_0x441a22,_0xa1f553)=>{
			try{
				setActivityCookie(_0x441a22);
				if(_0x343bed){
					if(_0x441a22&&typeof _0x441a22.statusCode!='undefined'){
						if(_0x441a22.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x343bed,_0x343bed));
					console.log(_0x4c645b+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x4c645b,_0xa1f553);
				}
			}catch(_0x2b0adc){
				console.log(_0x2b0adc,_0x441a22);
			}finally{
				_0x38dc54();
			}
		});
	});
}
async function dealReturn(_0x36b921,_0x46db83){
	let _0x5c9438='';
	try{
		if(_0x36b921!='accessLogWithAD'||_0x36b921!='drawContent'){
			if(_0x46db83){
				_0x5c9438=JSON.parse(_0x46db83);
			}
		}
	}catch(_0x47e819){
		console.log(_0x36b921+' 执行任务异常');
		console.log(_0x46db83);
		$.runFalag=false;
	}
	try{
		switch(_0x36b921){
			case 'getSimpleActInfoVo':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true){
						if(typeof _0x5c9438.data['shopId']!='undefined')$.shopId=_0x5c9438.data['shopId'];
						if(typeof _0x5c9438.data['venderId']!='undefined')$.venderId=_0x5c9438.data['venderId'];
					}else if(_0x5c9438.errorMessage){
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case 'getMyPing':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true){
						if(_0x5c9438.data&&typeof _0x5c9438.data['secretPin']!='undefined')$.Pin=_0x5c9438.data['secretPin'];
						if(_0x5c9438.data&&typeof _0x5c9438.data['nickname']!='undefined')$.nickname=_0x5c9438.data['nickname'];
					}else if(_0x5c9438.errorMessage){
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true){
						if(_0x5c9438.data&&typeof _0x5c9438.data['yunMidImageUrl']!='undefined')$.attrTouXiang=_0x5c9438.data['yunMidImageUrl']||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
					}else if(_0x5c9438.errorMessage){
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case 'activityContent':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true){
						$.endTime=_0x5c9438.data['endTime']||_0x5c9438.data['activityVo']&&_0x5c9438.data['activityVo']['endTime']||_0x5c9438.data['activity']['endTime']||0;
						$.hasEnd=_0x5c9438.data['hasEnd']||false;
						$.score=_0x5c9438.data['score']||0;
						$.actorUuid=_0x5c9438.data['actorUuid']||'';
						$.followShop=_0x5c9438.data['followShop']||'';
						$.followSku=_0x5c9438.data['followSku']||'';
						$.followPeony=_0x5c9438.data['followPeony']||'';
					}else if(_0x5c9438.errorMessage){
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case 'info':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true){
						$.addCart=_0x5c9438.data['addCart']||false;
					}else if(_0x5c9438.errorMessage){
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true){
						let _0x5cac48=_0x5c9438.data['cardList1']||[];
						let _0x38b501=_0x5c9438.data['cardList2']||[];
						let _0x5d6f45=_0x5c9438.data['cardList']||[];
						let _0x53f404=_0x5c9438.data['openCardList']||[];
						let _0x2b6913=_0x5c9438.data['openInfo']||[];
						$.openList=[..._0x5d6f45,..._0x5cac48,..._0x38b501,..._0x53f404,..._0x2b6913];
						$.allOpenCard=_0x5c9438.data['allOpenCard']||_0x5c9438.data['isOpenCardStatus']||false;
						$.openCardScore1=_0x5c9438.data['score1']||0;
						$.openCardScore2=_0x5c9438.data['score2']||0;
						$.drawScore=_0x5c9438.data['score']||0;
						if(_0x5c9438.data['beans']||_0x5c9438.data['addBeanNum'])console.log('开卡获得:'+(_0x5c9438.data['beans']||_0x5c9438.data['addBeanNum'])+'豆');
					}else if(_0x5c9438.errorMessage){
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case'startDraw':
			case 'followShop':
			case 'viewVideo':
			case 'visitSku':
			case 'followPeony':
			case 'toShop':
			case 'addSku':
			case 'sign':
			case 'addCart':
			case 'browseGoods':
			case'抽奖':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true){
						if(typeof _0x5c9438.data=='object'){
							let _0x2ca300='';
							let _0x3b7bc8='抽奖';
							if(_0x5c9438.data['taskbeanNum']){
								_0x2ca300=_0x5c9438.data['taskbeanNum']+'京豆';
							}
							if(_0x5c9438.data['addPoint']){
								_0x2ca300+=' '+_0x5c9438.data['addPoint']+'游戏机会';
							}
							if(_0x36b921=='followShop'){
								_0x3b7bc8='关注';
								if(_0x5c9438.data['beanNumMember']&&_0x5c9438.data['assistSendStatus']){
									_0x2ca300+=' 额外获得:'+_0x5c9438.data['beanNumMember']+'京豆';
								}
							}else if(_0x36b921=='addSku'||_0x36b921=='addCart'){
								_0x3b7bc8='加购';
							}else if(_0x36b921=='viewVideo'){
								_0x3b7bc8='热门文章';
							}else if(_0x36b921=='toShop'){
								_0x3b7bc8='浏览店铺';
							}else if(_0x36b921=='followPeony'){
								_0x3b7bc8='关注频道';
							}else if(_0x36b921=='visitSku'||_0x36b921=='browseGoods'){
								_0x3b7bc8='浏览商品';
							}else if(_0x36b921=='sign'){
								_0x3b7bc8='签到';
							}else{
								_0x2ca300=_0x5c9438.data['wdsrvo']['drawOk']==true&&(_0x5c9438.data['wdsrvo']['name']||'空气💨');
							}
							if(!_0x2ca300){
								_0x2ca300='空气💨';
							}
							console.log(_0x3b7bc8+'获得:'+(_0x2ca300||_0x46db83));
						}else{
							console.log(_0x36b921+' '+_0x46db83);
						}
					}else if(_0x5c9438.errorMessage){
						$.runFalag=false;
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true){
						console.log('我的奖品：');
						let _0x25362a=0;
						let _0x59fe00=0;
						for(let _0xeb24e8 in _0x5c9438.data){
							let _0x1d586f=_0x5c9438.data[_0xeb24e8];
							if(_0x1d586f.infoName=='20京豆'&&_0x1d586f.drawStatus&&_0x1d586f.value){
								_0x25362a++;
								_0x59fe00=_0x1d586f.infoName['replace']('京豆','');
							}else{
								console.log(''+_0x1d586f.infoName);
							}
						}
						if(_0x25362a>0)console.log('邀请好友('+_0x25362a+'):'+(_0x25362a*parseInt(_0x59fe00,10)||30)+'京豆');
					}else if(_0x5c9438.errorMessage){
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case'getShareRecord':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.result&&_0x5c9438.result===true&&_0x5c9438.data){
						$.ShareCount=_0x5c9438.data['length'];
						$.log('=========== 你邀请了:'+$.ShareCount+'个\n');
					}else if(_0x5c9438.errorMessage){
						console.log(_0x36b921+' '+(_0x5c9438.errorMessage||''));
					}else{
						console.log(_0x36b921+' '+_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
				break;
			case'邀请':
			case'助力':
				if(typeof _0x5c9438=='object'){
					if(_0x5c9438.data['status']==200){
						if(_0x36b921=='助力'){
							console.log('助力成功');
						}else{
							$.yaoqing=true;
						}
					}else if(_0x5c9438.data['status']==105){
						console.log('已经助力过');
					}else if(_0x5c9438.data['status']==104){
						console.log('已经助力其他人');
					}else if(_0x5c9438.data['status']==101){}else{
						console.log(_0x46db83);
					}
				}else{
					console.log(_0x36b921+' '+_0x46db83);
				}
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x36b921+'-> '+_0x46db83);
		}
		if(typeof _0x5c9438=='object'){
			if(_0x5c9438.errorMessage){
				if(_0x5c9438.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x509304){
		console.log(_0x509304);
	}
}
function getPostRequest(_0x97f115,_0x19ecfd,_0xbb91bc='POST'){
	let _0x54929c={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x97f115.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		_0x54929c.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/drinkcategory/piecetoge1/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x54929c.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x97f115,'method':_0xbb91bc,'headers':_0x54929c,'body':_0x19ecfd,'timeout':30000};
}
function getCk(){
	return new Promise(_0x5b6c56=>{
		let _0x1ea18c={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/drinkcategory/piecetoge1/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(_0x1ea18c,async(_0x3bdaa2,_0x5d1773,_0x60c5d3)=>{
			try{
				if(_0x3bdaa2){
					if(_0x5d1773&&typeof _0x5d1773.statusCode!='undefined'){
						if(_0x5d1773.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3bdaa2));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x298b25=_0x60c5d3.match(/(活动已经结束)/)&&_0x60c5d3.match(/(活动已经结束)/)[1]||'';
					if(_0x298b25){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x5d1773);
				}
			}catch(_0x2a8433){
				$.logErr(_0x2a8433,_0x5d1773);
			}finally{
				_0x5b6c56();
			}
		});
	});
}
function setActivityCookie(_0x52d280){
	if(_0x52d280.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0x5af4a9 of _0x52d280.headers['set-cookie']){
			lz_cookie[_0x5af4a9.split(';')[0]['substr'](0,_0x5af4a9.split(';')[0]['indexOf']('='))]=_0x5af4a9.split(';')[0]['substr'](_0x5af4a9.split(';')[0]['indexOf']('=')+1);
		}
		for(const _0x3a7e4f of Object.keys(lz_cookie)){
			cookie+=_0x3a7e4f+'='+lz_cookie[_0x3a7e4f]+';';
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x24a6c2){
	_0x24a6c2=_0x24a6c2||32;
	let _0xf389dc='abcdef0123456789',_0x20d7c0=_0xf389dc.length,_0x2ee55f='';
	for(i=0;i<_0x24a6c2;i++)_0x2ee55f+=_0xf389dc.charAt(Math.floor(Math.random()*_0x20d7c0));
	return _0x2ee55f;
}
function getCk(){
	return new Promise(_0x50c6ec=>{
		let _0x4cb4b3={'url':'https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token?t=1670556123847','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzdz1-isv.isvjcloud.com/m/1000086085/8366574/dz7943b5bf718c4701bb5eee36a17f','User-Agent':$.UA},'timeout':30000};
		$.get(_0x4cb4b3,async(_0x3f5e6f,_0x2a1714,_0x333b1c)=>{
			try{
				if(_0x3f5e6f){
					if(_0x2a1714&&typeof _0x2a1714.statusCode!='undefined'){
						if(_0x2a1714.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x3f5e6f));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x5c0490=_0x333b1c.match(/(活动已经结束)/)&&_0x333b1c.match(/(活动已经结束)/)[1]||'';
					if(_0x5c0490){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x2a1714);
				}
			}catch(_0x165dc6){
				$.logErr(_0x165dc6,_0x2a1714);
			}finally{
				_0x50c6ec();
			}
		});
	});
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x166dd6=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x4e5a5c='';
		if($.shopactivityId)_0x4e5a5c=',"activityId":'+$.shopactivityId;
		const _0xc8976c='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x4e5a5c+',"channel":406}';
		const _0x444cc6={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0xc8976c)};
		const _0x1f3934=await getH5st('8adfb',_0x444cc6);
		const _0x38d2e7={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0xc8976c+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1f3934),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x38d2e7,async(_0x2489b6,_0x330646,_0x119501)=>{
			try{
				_0x119501=_0x119501&&_0x119501.match(/jsonp_.*?\((.*?)\);/)&&_0x119501.match(/jsonp_.*?\((.*?)\);/)[1]||_0x119501;
				let _0x3d02b6=$.toObj(_0x119501,_0x119501);
				if(_0x3d02b6&&typeof _0x3d02b6=='object'){
					if(_0x3d02b6&&_0x3d02b6.success===true){
						console.log(' >> '+_0x3d02b6.message);
						$.errorJoinShop=_0x3d02b6.message;
						if(_0x3d02b6.result&&_0x3d02b6.result['giftInfo']){
							for(let _0x35dd7a of _0x3d02b6.result['giftInfo']['giftList']){
								console.log(' >> 入会获得：'+_0x35dd7a.discountString+_0x35dd7a.prizeName+_0x35dd7a.secondLineDesc);
							}
						}
					}else if(_0x3d02b6&&typeof _0x3d02b6=='object'&&_0x3d02b6.message){
						$.errorJoinShop=_0x3d02b6.message;
						console.log(''+(_0x3d02b6.message||''));
					}else{
						console.log(_0x119501);
					}
				}else{
					console.log(_0x119501);
				}
			}catch(_0x580c76){
				$.logErr(_0x580c76,_0x330646);
			}finally{
				_0x166dd6();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x512cbc=>{
		const _0x567833='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x58402b={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x567833)};
		const _0x47dcbf=await getH5st('8adfb',_0x58402b);
		const _0xc29213={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x567833+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x47dcbf),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0xc29213,async(_0x43a712,_0xd21490,_0x3e33c4)=>{
			try{
				_0x3e33c4=_0x3e33c4&&_0x3e33c4.match(/jsonp_.*?\((.*?)\);/)&&_0x3e33c4.match(/jsonp_.*?\((.*?)\);/)[1]||_0x3e33c4;
				let _0x1e23bd=$.toObj(_0x3e33c4,_0x3e33c4);
				if(_0x1e23bd&&typeof _0x1e23bd=='object'){
					if(_0x1e23bd&&_0x1e23bd.success==true){
						console.log('去加入：'+(_0x1e23bd.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x1e23bd.result['interestsRuleList']&&_0x1e23bd.result['interestsRuleList'][0]&&_0x1e23bd.result['interestsRuleList'][0]['interestsInfo']&&_0x1e23bd.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x3e33c4);
				}
			}catch(_0x144507){
				$.logErr(_0x144507,_0xd21490);
			}finally{
				_0x512cbc();
			}
		});
	});
}
function getH5st(_0x528f36,_0x1ebe03){
	return new Promise(async _0x47c8b5=>{
		let _0x3c3324={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x528f36+'&req='+encodeURIComponent(JSON.stringify(_0x1ebe03)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x3c3324,(_0x5e967f,_0x10b2fc,_0x3f5040)=>{
			try{
				if(_0x5e967f){
					console.log(JSON.stringify(_0x5e967f));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x3da08a){
				$.logErr(_0x3da08a,_0x10b2fc);
			}finally{
				_0x47c8b5(_0x3f5040);
			}
		});
	});
}
function getAuthorCodeList(_0x25c216){
	return new Promise(_0x5bbeba=>{
		const _0x328ad2={'url':_0x25c216+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x328ad2,async(_0x45f8a7,_0x26ef0e,_0x1cc951)=>{
			try{
				if(_0x45f8a7){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x1cc951)_0x1cc951=JSON.parse(_0x1cc951);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x4dea05){
				$.logErr(_0x4dea05,_0x26ef0e);
				_0x1cc951=null;
			}finally{
				_0x5bbeba(_0x1cc951);
			}
		});
	});
}
function random(_0xf668e6,_0x4369b5){
	return Math.floor(Math.random()*(_0x4369b5-_0xf668e6))+_0xf668e6;
}
function jsonParse(_0x5d2e9c){
	if(typeof _0x5d2e9c=='string'){
		try{
			return JSON.parse(_0x5d2e9c);
		}catch(_0x12599c){
			console.log(_0x12599c);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};