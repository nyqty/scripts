/*
12.26~1.3 跨年献礼 感恩相伴
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
————————————————
入口：[ 12.26~1.3 跨年献礼 感恩相伴 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:8 8 8 8 *
============Quantumultx===============
[task_local]
#12.26~1.3 跨年献礼 感恩相伴
8 8 8 8 * jd_opencardL281.js, tag=12.26~1.3 跨年献礼 感恩相伴, enabled=true

*/
const Env=require('./utils/Env.js');
const $=new Env('12.26~1.3 跨年献礼 感恩相伴');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let opencard_draw=$.isNode()?process.env['opencard_draw']?process.env['opencard_draw']:'0':$.getdata('opencard_draw')?$.getdata('opencard_draw'):'0';
let opencard_addCart=$.isNode()?process.env['opencard_addCart']?process.env['opencard_addCart']:false:$.getdata('opencard_addCart')?$.getdata('opencard_addCart'):false;
const getToken=require('./function/krgetToken');
let domains='https://lzdz1-isv.isvjcloud.com';
let cookiesArr=[],cookie='';
let lz_cookie={};
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x4a92ac=>{
		cookiesArr.push(jdCookieNode[_0x4a92ac]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x4afdf1=>_0x4afdf1.cookie)]['filter'](_0x272235=>!!_0x272235);
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
	authorCodeList=["f8a67451b696436e93a9965c399ba492"];//await getAuthorCodeList('http://code.kingran.ga/281.json');
	$.activityId='c0ca7dbcef2143f59799855eb67bcf90';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareUuid=$.authorCode;
	console.log('活动入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	console.log('❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true');
	console.log('❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数');
	for(let _0x270963=0;_0x270963<cookiesArr.length;_0x270963++){
		cookie=cookiesArr[_0x270963];
		originCookie=cookiesArr[_0x270963];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x270963+1;
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
		let _0x188cf5='以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist="'+$.errMsgPin['join']('&')+'"';
		allMessage+='\n'+_0x188cf5;
	}
	if($.outFlag){
		let _0x5011c7='此ip已被限制，请更换IP后再执行脚本';
		$.msg($.name,'',''+_0x5011c7);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x5011c7);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x20dd09=>$.logErr(_0x20dd09))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x53c6cb=false;
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
					_0x53c6cb=true;
					$.shopactivityId='';
					$.joinVenderId=o.venderId||o.value;
					await getshopactivityId();
					for(let _0x512150=0;_0x512150<Array(2)['length'];_0x512150++){
						if(_0x512150>0)console.log('第'+_0x512150+'次 重新开卡');
						await joinShop();
						await $.wait(parseInt(Math.random()*1000+1000,10));
						if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')==-1&&$.errorJoinShop['indexOf']('加入店铺会员失败')==-1){
							break;
						}
					}
					if($.errorJoinShop['indexOf']('活动太火爆，请稍后再试')>-1){
						console.log('开卡失败❌ ，重新执行脚本');
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
		if(_0x53c6cb){
			await takePostRequest('activityContent');
		}
		if(opencard_draw+''!=='0'){
			$.runFalag=true;
			let _0x34ab78=parseInt($.score/100);
			opencard_draw=parseInt(opencard_draw,10);
			if(_0x34ab78>opencard_draw)_0x34ab78=opencard_draw;
			console.log('已设置抽奖次数为'+_0x34ab78+'次，当前有'+$.score+'金币');
			for(m=1;_0x34ab78--;m++){
				console.log('进行第'+m+'次抽奖');
				await takePostRequest('startDraw');
				if($.runFalag==false)break;
				if(Number(_0x34ab78)<=0)break;
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
	}catch(_0x7c4d01){
		console.log(_0x7c4d01);
	}
}
async function takePostRequest(_0x320816){
	if($.outFlag)return;
	let _0x40212e='https://lzdz1-isv.isvjcloud.com';
	let _0x3a5ac2='';
	let _0x40653a='POST';
	let _0xf558e0='';
	switch(_0x320816){
		case 'getSimpleActInfoVo':
			url=_0x40212e+'/dz/common/getSimpleActInfoVo';
			_0x3a5ac2='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x40212e+'/customer/getMyPing';
			_0x3a5ac2='userId=1000000904&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x40212e+'/common/accessLogWithAD';
			let _0x3b40d4=_0x40212e+'/dingzhi/joinCommon/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x3a5ac2='venderId=1000000904&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x3b40d4)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x40212e+'/wxActionCommon/getUserInfo';
			_0x3a5ac2='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x40212e+'/dingzhi/joinCommon/activityContent';
			_0x3a5ac2='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent('https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png')+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x40212e+'/dingzhi/joinCommon/drawContent';
			_0x3a5ac2='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'checkOpenCard':
			url=_0x40212e+'/dingzhi/joinCommon/taskInfo';
			_0x3a5ac2='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'assist':
			url=_0x40212e+'/dingzhi/joinCommon/assist';
			_0x3a5ac2='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid+'&shareUuid='+$.shareUuid;
			break;
		case 'taskRecord':
			url=_0x40212e+'/dingzhi/joinCommon/taskRecord';
			_0x3a5ac2='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid+'&taskType=';
			break;
		case 'followShop':
			url=_0x40212e+'/dingzhi/joinCommon/doTask';
			_0x3a5ac2='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=20&taskValue=';
			break;
		case 'addCart':
			url=_0x40212e+'/dingzhi/joinCommon/doTask';
			_0x3a5ac2='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=23&taskValue=';
			break;
		case 'sign':
		case 'browseGoods':
			url=_0x40212e+'/dingzhi/opencard/'+_0x320816;
			_0x3a5ac2='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0x320816=='browseGoods')_0x3a5ac2+='&value='+$.visitSkuValue;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=_0x40212e+'/dingzhi/opencard/'+_0x320816;
			let _0x3b2612='';
			let _0x59bdb1='';
			if(_0x320816=='viewVideo'){
				_0x3b2612=31;
				_0x59bdb1=31;
			}else if(_0x320816=='visitSku'){
				_0x3b2612=5;
				_0x59bdb1=$.visitSkuValue||5;
			}else if(_0x320816=='toShop'){
				_0x3b2612=14;
				_0x59bdb1=$.toShopValue||14;
			}else if(_0x320816=='addSku'){
				_0x3b2612=2;
				_0x59bdb1=$.addSkuValue||2;
			}
			_0x3a5ac2='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x3b2612+'&taskValue='+_0x59bdb1;
			break;
		case 'drawRecord':
			url=_0x40212e+'/dingzhi/joinCommon/drawRecord';
			_0x3a5ac2='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getShareRecord':
			url=_0x40212e+'/dingzhi/joinCommon/shareRecord';
			_0x3a5ac2='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&num=30';
			break;
		case 'startDraw':
			url=_0x40212e+'/dingzhi/joinCommon/startDraw';
			_0x3a5ac2='activityId='+$.activityId+'&uuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x320816);
	}
	let _0x31dd60=getPostRequest(url,_0x3a5ac2,_0x40653a);
	return new Promise(async _0x1bee5f=>{
		$.post(_0x31dd60,(_0x2ad410,_0x270bf5,_0x5f469f)=>{
			try{
				setActivityCookie(_0x270bf5);
				if(_0x2ad410){
					if(_0x270bf5&&typeof _0x270bf5.statusCode!='undefined'){
						if(_0x270bf5.statusCode==493){
							console.log('此ip已被限制，请更换IP后再执行脚本\n');
						}
					}
					console.log(''+$.toStr(_0x2ad410,_0x2ad410));
					console.log(_0x320816+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x320816,_0x5f469f);
				}
			}catch(_0x3110fb){
				console.log(_0x3110fb,_0x270bf5);
			}finally{
				_0x1bee5f();
			}
		});
	});
}
async function dealReturn(_0x347afa,_0x298cb0){
	let _0x3da2fa='';
	try{
		if(_0x347afa!='accessLogWithAD'||_0x347afa!='drawContent'){
			if(_0x298cb0){
				_0x3da2fa=JSON.parse(_0x298cb0);
			}
		}
	}catch(_0x152b3c){
		console.log(_0x347afa+' 执行任务异常');
		console.log(_0x298cb0);
		$.runFalag=false;
	}
	try{
		switch(_0x347afa){
			case 'getSimpleActInfoVo':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						if(typeof _0x3da2fa.data['shopId']!='undefined')$.shopId=_0x3da2fa.data['shopId'];
						if(typeof _0x3da2fa.data['venderId']!='undefined')$.venderId=_0x3da2fa.data['venderId'];
					}else if(_0x3da2fa.errorMessage){
						console.log(_0x347afa+' '+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'getMyPing':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						if(_0x3da2fa.data&&typeof _0x3da2fa.data['secretPin']!='undefined')$.Pin=_0x3da2fa.data['secretPin'];
						if(_0x3da2fa.data&&typeof _0x3da2fa.data['nickname']!='undefined')$.nickname=_0x3da2fa.data['nickname'];
					}else if(_0x3da2fa.errorMessage){
						console.log(''+(_0x3da2fa.errorMessage||''));
						$.errMsgPin['push']($.UserName);
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						if(_0x3da2fa.data&&typeof _0x3da2fa.data['yunMidImageUrl']!='undefined')$.attrTouXiang=_0x3da2fa.data['yunMidImageUrl']||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
					}else if(_0x3da2fa.errorMessage){
						console.log(_0x347afa+' '+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'activityContent':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						$.endTime=_0x3da2fa.data['endTime']||_0x3da2fa.data['activityVo']&&_0x3da2fa.data['activityVo']['endTime']||_0x3da2fa.data['activity']['endTime']||0;
						$.hasEnd=_0x3da2fa.data['isEnd']||false;
						$.score=_0x3da2fa.data['actorInfo']['score']||0;
						$.actorUuid=_0x3da2fa.data['actorInfo']['uuid']||'';
						$.assistCount=_0x3da2fa.data['actorInfo']['assistCount']||0;
					}else if(_0x3da2fa.errorMessage){
						console.log(_0x347afa+' '+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'assist':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						$.assistState=_0x3da2fa.data['assistState']||0;
						$.allOpenCard=_0x3da2fa.data['openCardInfo']['openAll']||false;
						$.openVenderId=_0x3da2fa.data['openCardInfo']['openVenderId']||[];
					}else if(_0x3da2fa.errorMessage){
						console.log(_0x347afa+' '+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'taskRecord':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						$.followShop=_0x3da2fa.data['20']['recordCount']||0;
						$.addCart=_0x3da2fa.data['23']['recordCount']||0;
					}else if(_0x3da2fa.errorMessage){
						console.log(_0x347afa+' '+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						let _0x19c017=_0x3da2fa.data['10']['settingInfo']||[];
						let _0x3e75f8=_0x3da2fa.data['cardList']||[];
						let _0x2c4019=_0x3da2fa.data['openCardList']||[];
						$.openList=[..._0x3e75f8,..._0x19c017,..._0x2c4019];
						$.openCardScore1=_0x3da2fa.data['score1']||0;
						$.openCardScore2=_0x3da2fa.data['score2']||0;
						$.drawScore=_0x3da2fa.data['drawScore']||0;
						if(_0x3da2fa.data['beans']||_0x3da2fa.data['addBeanNum'])console.log('开卡获得：'+(_0x3da2fa.data['beans']||_0x3da2fa.data['addBeanNum'])+'京豆 🐶');
					}else if(_0x3da2fa.errorMessage){
						console.log(_0x347afa+' '+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'followShop':
			case 'viewVideo':
			case 'visitSku':
			case'toShop':
			case 'addSku':
			case 'sign':
			case 'addCart':
			case 'browseGoods':
			case'startDraw':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						if(typeof _0x3da2fa.data=='object'){
							let _0x4bb24f='';
							let _0x5b2326='抽奖';
							if(_0x3da2fa.data['addBeanNum']){
								_0x4bb24f=_0x3da2fa.data['addBeanNum']+'京豆';
							}
							if(_0x3da2fa.data['addPoint']){
								_0x4bb24f+=' '+_0x3da2fa.data['addPoint']+'游戏机会';
							}
							if(_0x347afa=='followShop'){
								_0x5b2326='关注';
								if(_0x3da2fa.data['beans']!='0'){
									_0x4bb24f+=_0x3da2fa.data['beans']+'京豆 🐶';
								}
							}else if(_0x347afa=='addSku'||_0x347afa=='addCart'){
								_0x5b2326='加购';
								if(_0x3da2fa.data['beans']!='0'){
									_0x4bb24f+=_0x3da2fa.data['beans']+'京豆 🐶';
								}
							}else if(_0x347afa=='viewVideo'){
								_0x5b2326='热门文章';
							}else if(_0x347afa=='toShop'){
								_0x5b2326='浏览店铺';
							}else if(_0x347afa=='visitSku'||_0x347afa=='browseGoods'){
								_0x5b2326='浏览商品';
							}else if(_0x347afa=='sign'){
								_0x5b2326='签到';
							}else{
								let _0x492f90=typeof _0x3da2fa.data['drawOk']==='object'&&_0x3da2fa.data['drawOk']||_0x3da2fa.data;
								_0x4bb24f=_0x492f90.drawOk==true&&_0x492f90.name||'';
							}
							if(!_0x4bb24f){
								_0x4bb24f='空气 💨';
							}
							console.log(_0x5b2326+'获得：'+(_0x4bb24f||_0x298cb0));
						}else{
							console.log(''+_0x298cb0);
						}
					}else if(_0x3da2fa.errorMessage){
						$.runFalag=false;
						console.log(''+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(''+_0x298cb0);
					}
				}else{
					console.log(''+_0x298cb0);
				}
				break;
			case 'drawRecord':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true){
						let _0x422faa=0;
						for(let _0x43a2d5 of _0x3da2fa.data){
							infoType=_0x43a2d5.infoType;
							infoName=_0x43a2d5.infoName;
							switch(infoType){
								case 6:
									infoName=Number(infoName.replace('京豆',''));
									_0x422faa+=infoName;
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
						if(_0x422faa>0){
							console.log('当前累计获得 '+_0x422faa+' 京豆 🐶');
						}
					}else if(_0x3da2fa.errorMessage){
						console.log(_0x347afa+' '+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x3da2fa=='object'){
					if(_0x3da2fa.result&&_0x3da2fa.result===true&&_0x3da2fa.data){
						$.ShareCount=_0x3da2fa.data['shareList']['length'];
						$.log('=========== 你邀请了:'+$.ShareCount+'个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n');
					}else if(_0x3da2fa.errorMessage){
						console.log(_0x347afa+' '+(_0x3da2fa.errorMessage||''));
					}else{
						console.log(_0x347afa+' '+_0x298cb0);
					}
				}else{
					console.log(_0x347afa+' '+_0x298cb0);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x347afa+'-> '+_0x298cb0);
		}
		if(typeof _0x3da2fa=='object'){
			if(_0x3da2fa.errorMessage){
				if(_0x3da2fa.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x43e954){
		console.log(_0x43e954);
	}
}
function getPostRequest(_0x21a3c9,_0x5dec0a,_0x495ce3='POST'){
	let _0x5cc678={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x21a3c9.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		_0x5cc678.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x5cc678.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x21a3c9,'method':_0x495ce3,'headers':_0x5cc678,'body':_0x5dec0a,'timeout':30000};
}
function getCk(){
	return new Promise(_0x19a6ea=>{
<<<<<<< HEAD
		let _0x16e7b0={'url':'https://lzdz1-isv.isvjd.com/dingzhi/joinCommon/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
=======
		let _0x16e7b0={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
>>>>>>> parent of 04ace7c (更新)
		$.get(_0x16e7b0,async(_0x20ef06,_0x19ccb5,_0x5138b8)=>{
			try{
				if(_0x20ef06){
					if(_0x19ccb5&&typeof _0x19ccb5.statusCode!='undefined'){}
					console.log(''+$.toStr(_0x20ef06));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x2615c5=_0x5138b8.match(/(活动已经结束)/)&&_0x5138b8.match(/(活动已经结束)/)[1]||'';
					if(_0x2615c5){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x19ccb5);
				}
			}catch(_0x4f24b8){
				$.logErr(_0x4f24b8,_0x19ccb5);
			}finally{
				_0x19a6ea();
			}
		});
	});
}
function setActivityCookie(_0x2dc7ed){
	if(_0x2dc7ed){
		if(_0x2dc7ed.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x6c8ded of _0x2dc7ed.headers['set-cookie']){
				lz_cookie[_0x6c8ded.split(';')[0]['substr'](0,_0x6c8ded.split(';')[0]['indexOf']('='))]=_0x6c8ded.split(';')[0]['substr'](_0x6c8ded.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x21372b of Object.keys(lz_cookie)){
				cookie+=_0x21372b+'='+lz_cookie[_0x21372b]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x405864){
	_0x405864=_0x405864||32;
	let _0x1864cf='abcdef0123456789',_0x47ad83=_0x1864cf.length,_0x41a10e='';
	for(i=0;i<_0x405864;i++)_0x41a10e+=_0x1864cf.charAt(Math.floor(Math.random()*_0x47ad83));
	return _0x41a10e;
}
function jsonParse(_0x550f8c){
	if(typeof _0x550f8c=='string'){
		try{
			return JSON.parse(_0x550f8c);
		}catch(_0x52053e){
			console.log(_0x52053e);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x45458a=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x532be4='';
		if($.shopactivityId)_0x532be4=',"activityId":'+$.shopactivityId;
		const _0x2ec49e='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x532be4+',"channel":406}';
		const _0x1cf4ea={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x2ec49e)};
		const _0x1281e8=await getH5st('8adfb',_0x1cf4ea);
		const _0x137d4b={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x2ec49e+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x1281e8),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x137d4b,async(_0xcd55cb,_0x4fe115,_0x1ae558)=>{
			try{
				_0x1ae558=_0x1ae558&&_0x1ae558.match(/jsonp_.*?\((.*?)\);/)&&_0x1ae558.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1ae558;
				let _0x32fedc=$.toObj(_0x1ae558,_0x1ae558);
				if(_0x32fedc&&typeof _0x32fedc=='object'){
					if(_0x32fedc&&_0x32fedc.success===true){
						console.log(' >> '+_0x32fedc.message);
						$.errorJoinShop=_0x32fedc.message;
						if(_0x32fedc.result&&_0x32fedc.result['giftInfo']){
							for(let _0x29f18d of _0x32fedc.result['giftInfo']['giftList']){
								console.log(' >> 入会获得：'+_0x29f18d.discountString+_0x29f18d.prizeName+_0x29f18d.secondLineDesc);
							}
						}
					}else if(_0x32fedc&&typeof _0x32fedc=='object'&&_0x32fedc.message){
						$.errorJoinShop=_0x32fedc.message;
						console.log(''+(_0x32fedc.message||''));
					}else{
						console.log(_0x1ae558);
					}
				}else{
					console.log(_0x1ae558);
				}
			}catch(_0x3376e1){
				$.logErr(_0x3376e1,_0x4fe115);
			}finally{
				_0x45458a();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x288a1d=>{
		const _0x46f28f='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x3da3d3={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x46f28f)};
		const _0x3de473=await getH5st('8adfb',_0x3da3d3);
		const _0xad5a1a={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x46f28f+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x3de473),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0xad5a1a,async(_0x239e26,_0x51f087,_0x1c9d24)=>{
			try{
				_0x1c9d24=_0x1c9d24&&_0x1c9d24.match(/jsonp_.*?\((.*?)\);/)&&_0x1c9d24.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1c9d24;
				let _0x3eaa59=$.toObj(_0x1c9d24,_0x1c9d24);
				if(_0x3eaa59&&typeof _0x3eaa59=='object'){
					if(_0x3eaa59&&_0x3eaa59.success==true){
						console.log('去加入：'+(_0x3eaa59.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x3eaa59.result['interestsRuleList']&&_0x3eaa59.result['interestsRuleList'][0]&&_0x3eaa59.result['interestsRuleList'][0]['interestsInfo']&&_0x3eaa59.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x1c9d24);
				}
			}catch(_0x48925e){
				$.logErr(_0x48925e,_0x51f087);
			}finally{
				_0x288a1d();
			}
		});
	});
}
function getH5st(_0x3de30d,_0x2960fc){
	return new Promise(async _0x1f1840=>{
		let _0x5428fc={'url':'http://api.kingran.cf/h5st','body':'businessId='+_0x3de30d+'&req='+encodeURIComponent(JSON.stringify(_0x2960fc)),'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'},'timeout':30*1000};
		$.post(_0x5428fc,(_0x2456fb,_0x2012e6,_0x5c5826)=>{
			try{
				if(_0x2456fb){
					console.log(JSON.stringify(_0x2456fb));
					console.log($.name+' getSign API请求失败，请检查网路重试');
				}else{}
			}catch(_0x1080ab){
				$.logErr(_0x1080ab,_0x2012e6);
			}finally{
				_0x1f1840(_0x5c5826);
			}
		});
	});
}
function getAuthorCodeList(_0x31ebe3){
	return new Promise(_0xe04f3b=>{
		const _0x21e5d9={'url':_0x31ebe3+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x21e5d9,async(_0x247c1c,_0x26af3c,_0x500f5d)=>{
			try{
				if(_0x247c1c){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x500f5d)_0x500f5d=JSON.parse(_0x500f5d);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x24227b){
				$.logErr(_0x24227b,_0x26af3c);
				_0x500f5d=null;
			}finally{
				_0xe04f3b(_0x500f5d);
			}
		});
	});
}
function random(_0xe5fd69,_0x326ce9){
	return Math.floor(Math.random()*(_0x326ce9-_0xe5fd69))+_0xe5fd69;
}
function getBlacklist(){
	if($.blacklist=='')return;
	console.log('当前已设置黑名单：');
	const _0x33e13e=Array.from(new Set($.blacklist['split']('&')));
	console.log(_0x33e13e.join('&')+'\n');
	let _0x1a05ee=_0x33e13e;
	let _0x1d200a=[];
	let _0x329a52=false;
	for(let _0x27f281=0;_0x27f281<cookiesArr.length;_0x27f281++){
		let _0x1f40ef=decodeURIComponent(cookiesArr[_0x27f281]['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookiesArr[_0x27f281]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]||'');
		if(!_0x1f40ef)break;
		let _0x299527=false;
		for(let _0x3be9ba of _0x1a05ee){
			if(_0x3be9ba&&_0x3be9ba==_0x1f40ef){
				_0x299527=true;
				break;
			}
		}
		if(!_0x299527){
			_0x329a52=true;
			_0x1d200a.splice(_0x27f281,-1,cookiesArr[_0x27f281]);
		}
	}
	if(_0x329a52)cookiesArr=_0x1d200a;
}
function toFirst(_0x55fed9,_0x37bc51){
	if(_0x37bc51!=0){
		_0x55fed9.unshift(_0x55fed9.splice(_0x37bc51,1)[0]);
	}
}
function getWhitelist(){
	if($.whitelist==''){
		helpCookiesArr=$.toObj($.toStr(cookiesArr,cookiesArr));
		return;
	}
	console.log('当前已设置白名单：');
	const _0x48b7f4=Array.from(new Set($.whitelist['split']('&')));
	console.log(_0x48b7f4.join('&')+'\n');
	let _0x2850ce=[];
	let _0x3f1216=_0x48b7f4;
	for(let _0x4b7ec8 in cookiesArr){
		let _0x10e1e8=decodeURIComponent(cookiesArr[_0x4b7ec8]['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookiesArr[_0x4b7ec8]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]||'');
		if(_0x3f1216.includes(_0x10e1e8)){
			_0x2850ce.push(cookiesArr[_0x4b7ec8]);
		}
	}
	helpCookiesArr=_0x2850ce;
	if(_0x3f1216.length>1){
		for(let _0x1998e5 in _0x3f1216){
			let _0x7b0906=_0x3f1216[_0x3f1216.length-1-_0x1998e5];
			if(!_0x7b0906)continue;
			for(let _0x4b7ec8 in helpCookiesArr){
				let _0x10e1e8=decodeURIComponent(helpCookiesArr[_0x4b7ec8]['match'](/pt_pin=([^; ]+)(?=;?)/)&&helpCookiesArr[_0x4b7ec8]['match'](/pt_pin=([^; ]+)(?=;?)/)[1]);
				if(_0x7b0906==_0x10e1e8){
					toFirst(helpCookiesArr,_0x4b7ec8);
				}
			}
		}
	}
};
