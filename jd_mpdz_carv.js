/*
头文字J 
活动快捷入口： 19:/参与头文字J，集能量兑换京豆！P5loICDei3！⇥Jℹ️ng◼倲
日常任务，助力，游戏
第一个账号助力作者 其他依次助力CK1
默认不做加购任务，如需要设置变量erport car_addsku='true'
只跑前5个CK
定时随机，一起冲会炸
*/
const Env=require('./utils/Env.js');
const $ = new Env("头文字JJJ");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const dy = require('./function/dylanx.js');
let cookiesArr=[],cookie='';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => { cookiesArr.push(jdCookieNode[item])})
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
let shareUuidArr=['oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F'];
let n=0;
n=Math.floor(Math.random()*shareUuidArr.length);
let shareUuid=shareUuidArr[n]||'';
!(async()=>{
	console.log('活动快捷入口： 19:/参与头文字J，集能量兑换京豆！P5loICDei3！⇥Jℹ️ng◼倲');
    if (!cookiesArr[0]) {
      $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
        "open-url": "https://bean.m.jd.com/"
      });
      return;
    }
	$.userId='10299171';
	$.actId='1760007';
	$.inviteNick=shareUuid;
	for(let o=0; o < 5; o++){
		cookie=cookiesArr[o];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=o+1;
			message='';
			$.bean=0;
            $.hotFlag = false
			$.nickName=false;
			$.nickName='';
			console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
			await getUA();
			await run();
			if($.outFlag)break;
		}
	}if($.outFlag){
		let msg='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+msg);
		if ($.isNode()) await notify.sendNotify(`${$.name}`, `${msg}`);
	}
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
async function run(){
	try{
		$.hasEnd=true;
		$.Token='';
		$.Pin='';
		$.MixNick='';
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本');
			return;
		}
		await takePostRequest('isvObfuscator');
		if($.Token==''){
			console.log('获取token失败！');
			return;
		}
		await takePostRequest('activity_load');
		if($.nickName)return;
		if($.MixNick==''){
			console.log('获取mixnick失败');
			return;
		}
        console.log(`助力码：${$.MixNick}\n`);
        if($.hotFlag) return
		await takePostRequest('taskList');
		console.log('开始日常任务。。。');
        for (let i = 0; i < $.taskLists.length; i++){
            $.missionType  = $.taskLists[i].type
            if (!$.taskLists[i].isComplete){
            switch($.missionType){
                case 'bingCar':
                case 'openCard':
                case 'shareAct':   
                case 'viewChannelCommodity':   				
                    break;
                case 'viewCommodity':
                case 'viewThemeConference':
                    for(let i=0;i<3;i++){
                        await takePostRequest('doTask');
                        await $.wait(parseInt(Math.random()*1000+1000,10));
                    }
                    break;
                case 'collectShop':
                    for(let i=0;i<3;i++){
                        await takePostRequest('getCusShop');
                        await takePostRequest('followShop');
                        await $.wait(parseInt(Math.random()*1000+1000,10));
                    }
                    break;
                case 'addCart':
                    if (process.env.car_addsku && process.env.car_addsku === 'true'){
                    for(let i=0;i<3;i++){
                        await takePostRequest('getCusShopProduct');
                        await takePostRequest('addCart');
                        await $.wait(parseInt(Math.random()*1000+1000,10));
                    }
                    } else {console.log(`默认不加购,请设置变量export car_addsku='true'做加购任务`)}
                    break;
                default:
                    await takePostRequest('doTask');
                    await $.wait(1000);  
            }
            }
        }
        if ($.remainChance){
		    console.log('\n开始游戏。。。');
            await takePostRequest('getCarInfo');
		    for(let i = 0;i < $.remainChance; i++){
		    	await takePostRequest('playGame');
		    	await $.wait(parseInt(Math.random()*2000+5000));
		    	await takePostRequest('sendGameAward');
		    	await $.wait(parseInt(Math.random()*2000+1000));
		    }
        }else{console.log('\n开始游戏：没有游戏币了，明天再来！')}
		await takePostRequest('activity_load');
        await $.wait(1000);
		console.log(`当前剩余能量：${$.remainPoint}\n`);
		await $.wait(1000);
		//console.log('开始兑换5豆。。。');
		//await takePostRequest('exchange');
		//await $.wait(500);
		await takePostRequest('missionInviteList');
        await $.wait(1000);
        console.log(`去助力：${$.inviteNick}`);
		await takePostRequest('助力'); 
		if($.index==1){
			$.inviteNick=$.MixNick;
			console.log(`后面的都会助力：${$.inviteNick}`);
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
	}catch(e){
		console.log(e);
	}
}
async function takePostRequest(type){
	if($.outFlag)return;
	let domain='https://mpdz-car-dz.isvjcloud.com';
	let body='';
	let method='POST';
	let admJson='';
	switch(type){
		case 'isvObfuscator':
            let sign = await dy.getbody('isvObfuscator', { "id": "", "url": "https://mpdz-car-dz.isvjcloud.com" })
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			body=sign;
            break;
		case 'activity_load':
			url=`${domain}/dm/front/jdCardRunning/activity/load?open_id=&mix_nick=${$.MixNick}&push_way=3&user_id=`;
			admJson={'jdToken':$.Token,'inviteNick':$.inviteNick};
			body=_0x5338bf('/jdCardRunning/activity/load',admJson);
			break;
		case 'taskList':
			url=`${domain}/dm/front/jdCardRunning/mission/completeState?open_id=&mix_nick=${$.MixNick}`;
			admJson={};
			body=_0x5338bf('/jdCardRunning/mission/completeState',admJson);
			break;
		case'绑定':
			url=`${domain}/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=${$.MixNick}`;
			admJson={'missionType':'shareAct','inviterNick':$.inviteNick||''};
			body=_0x5338bf('/jdCardRunning/mission/completeState',admJson);
			break;
		case'助力':
			url=`${domain}/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=${$.MixNick}`;
			admJson={'missionType':'shareAct','inviterNick':$.inviteNick||'','userId':10299171};
			body=_0x5338bf('/jdCardRunning/mission/completeMission',admJson);
			break;
		case'followShop':
			url=`${domain}/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=${$.MixNick}`;
			admJson={'missionType':$.missionType,'userId':10299171,'shopId':$.userIds,'buyerNick':$.inviteNick};
			body=_0x5338bf('/jdCardRunning/mission/completeMission',admJson);
			break;
		case'addCart':
			url=`${domain}/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=${$.MixNick}`;
			admJson={'missionType':$.missionType,'userId':10299171,'goodsNumId':$.goodsNumId,'buyerNick':$.inviteNick};
			body=_0x5338bf('/jdCardRunning/mission/completeMission',admJson);
			break;
		case 'getCusShop':
			url=`${domain}/dm/front/jdCardRunning/cusShop/getCusShop?open_id=&mix_nick=${$.MixNick}`;
			admJson={};
			body=_0x5338bf('/jdCardRunning/cusShop/getCusShop',admJson);
			break;
		case 'getCusShopProduct':
			url=`${domain}/dm/front/jdCardRunning/cusShop/getCusShopProduct?open_id=&mix_nick=${$.MixNick}`;
			admJson={};
			body=_0x5338bf('/jdCardRunning/cusShop/getCusShop',admJson);
			break;
		case 'doTask':
			url=`${domain}/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=${$.MixNick}`;
			admJson={'actId':$.actId,'missionType':$.missionType};
			body=_0x5338bf('/jdCardRunning/mission/completeMission',admJson);
			break;
		case 'playGame':
			url=`${domain}/dm/front/jdCardRunning/game/playGame?open_id=&mix_nick=${$.MixNick}`;
			admJson={'actId':$.actId,'carId':$.usecar.id,'carName':$.usecar.carName,'userId':10299171,'buyerNick':$.inviteNick};
			body=_0x5338bf('/jdCardRunning/game/playGame',admJson);
			break;
		case 'sendGameAward':
			url=`${domain}/dm/front/jdCardRunning/game/sendGameAward?open_id=&mix_nick=${$.MixNick}`;
			admJson={'actId':$.actId,'point':$.point.point||300,'gameLogId':$.gameLogId,'userId':10299171,'buyerNick':$.inviteNick};
			body=_0x5338bf('/jdCardRunning/game/sendGameAward',admJson);
			break;
		case 'missionInviteList':
			url=`${domain}/dm/front/jdCardRunning/customer/inviteList?open_id=&mix_nick=${$.MixNick}`;
			admJson={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick};
			body=_0x5338bf('/jdCardRunning/customer/inviteList',admJson);
			break;
		case 'getCarInfo':
		    url=`${domain}/dm/front/jdCardRunning/carInfo/getCarInfo?open_id=&mix_nick=${$.MixNick}`;
			body=_0x5338bf('/jdCardRunning/cusShop/getCusShop',{});
            break;
		case 'exchange':
		    url=`${domain}/dm/front/jdCardRunning/exchange/exchangeJdMarket?open_id=&mix_nick=${$.MixNick}`;
			admJson={"awardId": "10082bd15b4703","userId": 10299171,"actId": 1760007,"buyerNick": $.inviteNick}
			body=_0x5338bf('/jdCardRunning/exchange/exchangeJdMarket',admJson);
            break;			
		default:
			console.log('错误'+type);
	}
	let myRequest=getPostRequest(url,body,method);
	return new Promise(async resolve=>{
		$.post(myRequest,(err,resp,data)=>{
			try{
				if(err){
					if(resp&&resp.statusCode&&resp.statusCode==493){
						console.log('此ip已被限制，请过10分钟后再执行脚本');
						$.outFlag=true;
					}
					console.log(`${$.toStr(err,err)}`)
					console.log(' API请求失败，请检查网路重试');
				}else{
					dealReturn(type,data);
				}
			}catch(e){
				console.log(e,resp);
			}
			finally{
				resolve();
			}
		});
	});
}
async function dealReturn(type,data){
	let res='';
	try{
		if(type!='accessLogWithAD'||type!='drawContent'){
			if(data){
				res=JSON.parse(data);
			}
		}
	}catch(e){
		console.log(`${type} 执行任务异常`);
		console.log(data);
		$.runFalag=false;
	}
    try{
		switch(type){
			case 'isvObfuscator':
				if(typeof res == 'object'){
					if (res.errcode == 0){
					if (typeof res.token!='undefined') $.Token=res.token;
				} else if (res.message){
					console.log(`isvObfuscator ${res.message}`)
				} else {
					console.log(data);
				}
				} else {
					console.log(data);
				}
				break;
			case 'getCusShop':
				if ( typeof res=='object' ){
					if (res.success && res.success===true && res.data){
					if (res.data.status&&res.data.status==200){
						$.userIds=res.data.data.cusShop.userId;
					}
				} else if (res.message){
					console.log(`${type} ${res.message}`)
				} else {
					console.log(data);
				}
				} else {
					console.log(data);
				}
				break;
			case 'getCusShopProduct':
				if(typeof res=='object'){
					if(res.success&&res.success===true&&res.data){
					if(res.data.status&&res.data.status==200){
						$.goodsNumId=res.data.data.cusShopProduct.numId;
					}
				}else if(res.message){
					console.log(`${type} ${res.message}`)
				}else{
					console.log(data);
				}
				}else{
					console.log(data);
				}
				break;
			case 'taskList':
				if(typeof res=='object'){
					if(res.success&&res.success===true&&res.data){
					if(res.data.status&&res.data.status==200){
						$.taskLists=res.data.data||[];
					}
				}else if(res.message){
					console.log(`${type} ${res.message}`)
				}else{
					console.log(data);
				}
				}else{
					console.log(data);
				}
				break;
			case 'getCarInfo':
				if(typeof res=='object'){
					if(res.success&&res.success===true&&res.data){
					if(res.data.status&&res.data.status==200){
						$.carlist=res.data.data||[];
						$.usecar = $.carlist.reverse().find(item => item.isUnlock === true)
                        console.log(`使用我最牛X的${$.usecar.carName}进行游戏！`)
                        let pointArr = [{id:1,point:100},{id:2,point:150},{id:3,point:200},{id:4,point:300}]
                        $.point = pointArr.find(a => a.id === $.usecar.id)
					}
				}else if(res.message){
					console.log(`${type} ${res.message}`)
				}else{
					console.log(data);
				}
				}else{
					console.log(data);
				}
				break;			
			case 'playGame':
				if(typeof res=='object'){
				    	if(res.success&&res.success===true&&res.data){
				    	    if(res.data.status&&res.data.status==200){
				    	    	$.gameLogId=res.data.data.gameLogId;
				    	    	console.log(`游戏ID： ${$.gameLogId}`);
				    	    }
				        }else if(res.message){  
				    	    console.log(`${type} ${res.message}`)
				        }else{  
				            console.log(data);
				        }
				}else{
					console.log(data);
				}
				break;
			case 'sendGameAward':
				if(typeof res=='object'){
				    if(res.success&&res.data){
				        console.log(`游戏完成，获得${$.point.point}能量!`);
				       }else if(res.message){
				            console.log(`${type} ${res.message}`)
				       }else{
				            console.log(data);
				       }
				}else{
					console.log(data);
				}
				break;
			case 'exchange':
				if(typeof res=='object'){
				    if(res.success&&res.data){
				        console.log(res.data.msg);
				       }else if(res.message){
				            console.log(`${type} ${res.message}`)
				       }else{
				            console.log(data);
				       }
				}else{
					console.log(data);
				}
				break;				
			case 'accessLogWithAD':
			case 'drawContent':
				break;
            case 'specialSign':
			case 'activity_load':
			case 'setMixNick':
			case 'followShop':
			case 'doTask':
			case 'addCart':
			case 'missionInviteList':
			case'绑定':
			case'助力':
                let title=''
				if(type=='followShop')title='关注';
				if(type=='addCart')title='加购';
                if(type=='specialSign')title='签到';
				if(typeof res=='object'){
					if(res.success&&res.success===true&&res.data){
					if(res.data.status&&res.data.status==200){
						res=res.data;
						if(type!='setMixNick'&&(res.msg||res.data.remark)){
                        console.log((title&&title+':'||'')+(res.msg||res.data.isOpenCard||res.data.remark||''));
                        }
						if(type=='activity_load'){
							if(res.data){
								$.MixNick = res.data.missionCustomer.buyerNick || '';
								$.hasCollectShop = res.data.missionCustomer.hasCollectShop || 0;
								$.totalPoint = res.data.missionCustomer.totalPoint || 0;
								$.remainPoint = res.data.missionCustomer.remainPoint || 0;
								$.remainChance = res.data.missionCustomer.remainChance|| 0;
							}
						}else if(type=='missionInviteList'){
							console.log(`本月已邀请助力(${res.data.total})`);
						}
					}else if(res.data.msg){
						console.log(res.data.msg);
					}else if(res.errorMessage){
						console.log(`${type} ${res.errorMessage}`)
					}else{
						console.log(data);
					}
				}else if(res.errorMessage){
					console.log(`${type} ${res.errorMessage}`)
				}else{
					console.log(data);
				}
				}else{
					console.log(data);
				}
				break;
			default:
				console.log(data);
		}
        if(typeof res=='object'){
			if(res.errorMessage){
				if(res.errorMessage.indexOf('火爆')>-1){$.hotFlag = true}
			}
		}
	}catch(e){
		console.log(e);
	}
}
function getPostRequest(url,body,method='POST'){
	let headers={
		'Accept':'application/json',
		'Accept-Encoding':'gzip, deflate, br',
		'Accept-Language':'zh-cn','Connection':'keep-alive',
		'Content-Type':'application/x-www-form-urlencoded',
		'Cookie':cookie,
		'User-Agent':$['UA'],
		'X-Requested-With':'XMLHttpRequest'
	};
	if(url.indexOf('https://mpdz-car-dz.isvjcloud.com')>-1){
		headers['Origin']='https://mpdz-car-dz.isvjcloud.com';
		headers['Content-Type']='application/json; charset=utf-8';
		delete headers.Cookie;
	}
	return{'url':url,'method':method,'headers':headers,'body':body,'timeout':30000};
}

function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789", a = t.length, n = "";
    for (i = 0; i < e; i++)
      n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function jsonParse(str) {
    if (typeof str == "string") {
      try {
        return JSON.parse(str);
      } catch (e) {
        console.log(e);
        $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
        return [];
      }
    }
  }
async function getUA(){
  $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
}


const _0x4c8cde = require("crypto-js");
function _0x5338bf(_0x11eeed, _0x51c57b) {
  tmp = {
    "actId": $.actId,
    ..._0x51c57b,
    "method": _0x11eeed,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  let _0x3bea6b = _0x47ea35(tmp);
  const _0x26670d = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "m": "POST",
        ..._0x3bea6b,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ..._0x51c57b,
        "method": _0x11eeed,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  if (_0x11eeed.indexOf("missionInviteList") > -1) {
    delete _0x26670d.params.admJson.actId;
  }
  return $.toStr(_0x26670d, "taskPostUrl");
}
function _0x47ea35(_0x40b730) {
  ak = "25747717";
  AppSecret = "85623312044258464325227666883546";
  time = new Date().valueOf();
  o = JSON.stringify(_0x40b730);
  s = encodeURIComponent(o);
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s = s.replace(c, "%27");
  s = s.replace(A, "%7E");
  signBody = ak + "appkey" + ak + "admjson" + s + "timestamp" + time + AppSecret;
  return {
    "sign": _0x4c8cde.MD5(signBody.toLowerCase()).toString(),
    "timeStamp": time
  };
}