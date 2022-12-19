/*
购物抵现金
[task_local]
#购物抵现金
11 11 11 11 ** jd_lotty2.js, tag=购物抵现金, enabled=true
*/

const $=new Env('购物抵现金');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const getToken=require('./function/krgetToken');
let jdNotify=true;
let cookiesArr=[],cookie='',message='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x32cdbe=>{
		cookiesArr.push(jdCookieNode[_0x32cdbe]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x41497b=>_0x41497b.cookie)]['filter'](_0x5be8eb=>!!_0x5be8eb);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	for(let _0x46b11b=0;_0x46b11b<cookiesArr.length;_0x46b11b++){
		if(cookiesArr[_0x46b11b]){
			cookie=cookiesArr[_0x46b11b];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x46b11b+1;
			$.isLogin=true;
			$.nickName='';
			$.UA='jdapp;android;11.1.2;;;Mozilla/5.0 (Linux; Android 8.1.0; MI 8 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await lotty();
			await $.wait(2000);
		}
	}
})()['catch'](_0x434df7=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x434df7+'!','');
})['finally'](()=>{
	$.done();
});
async function lotty(){
	try{
		await getNewsComerWindow();
		await $.wait(1000);
		await isUserFollow();
		await $.wait(1000);
		await getNewsComerGift();
	}catch(_0xf7ddca){
		$.logErr(_0xf7ddca);
	}
}
async function getNewsComerWindow(){
	return new Promise(async _0xaa43da=>{
		const _0x46146f={'url':'https://api.m.jd.com/client.action?functionId=getNewsComerWindow&lmt=0&clientVersion=11.2.8&build=98380&client=android&partner=oppo&eid=eidAfea581218ds3r6vxnUdvS3yU8Zjjeu4jBq+r8yDlNMAWdRVBOHn+wcf7a1qGnYVfQ2xpIn4AYEaNjd1I4P2qmkDGd+F8PBSUlEZ4/RMU83wPmSBH&sdkVersion=28&lang=zh_CN&harmonyOs=0&networkType=wifi&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJgHew6f2YVOT52hi3mV5rR8WhyAVTyjkMcyqipp9LYvDuLuIcSGLdUicoXn17%2F6syDLJSbtqGaYdPwQR9LFTcIlc7gC0Y8TmqzZBBXd1nnEqrumvIx4swc9DDOrzbbhll9G83pUt0tvG0RgNKvn2QbPBhBT1FhBMGKgBVJ918sM1%2B01N%2FgZc3Bw%3D%3D&uemps=0-1&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&avifSupport=1&acs=1&ef=1&ep=%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1669557577661%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22area%22%3A%22Cv8yENO3XzLpCK%3D%3D%22%2C%22d_model%22%3A%22J05PUOnVU0OzCNKm%22%2C%22wifiBssid%22%3A%22dW5hbw93bq%3D%3D%22%2C%22osVersion%22%3A%22EG%3D%3D%22%2C%22d_brand%22%3A%22J25vUQn1cm%3D%3D%22%2C%22screen%22%3A%22CJuyCMenCNqm%22%2C%22uuid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%2C%22aid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D&st=1669557612931&sign=2c7239d5b1c91af7865546a6a4fdb99e&sv=122','body':'lmt=0&body=%7B%7D&','headers':{'Cookie':cookie,'Content-Type':'application/x-www-form-urlencoded','User-Agent':'jdltapp;iPhone;3.3.2;14.5.1network/wifi;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;model/iPhone13,2;addressid/137923973;hasOCPay/0;appBuild/1047;supportBestPay/0;pv/467.11;apprpd/MyJD_Main;','Accept-Language':'zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8'}};
		$.post(_0x46146f,async(_0x12d1dd,_0x2c8d95,_0x33046a)=>{
			try{
				if(_0x12d1dd){
					console.log(''+JSON.stringify(_0x12d1dd));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x33046a)){
						_0x33046a=$.toObj(_0x33046a);
					}
				}
			}catch(_0x2ef5c8){
				$.logErr(_0x2ef5c8,_0x2c8d95);
			}finally{
				_0xaa43da(_0x33046a);
			}
		});
	});
}
async function isUserFollow(){
	return new Promise(async _0x2eaeeb=>{
		const _0x3b2dd9={'url':'https://api.m.jd.com/client.action?functionId=isUserFollow&lmt=0&clientVersion=11.2.8&build=98380&client=android&partner=oppo&eid=eidAfea581218ds3r6vxnUdvS3yU8Zjjeu4jBq+r8yDlNMAWdRVBOHn+wcf7a1qGnYVfQ2xpIn4AYEaNjd1I4P2qmkDGd+F8PBSUlEZ4/RMU83wPmSBH&sdkVersion=28&lang=zh_CN&harmonyOs=0&networkType=wifi&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJgHew6f2YVOT52hi3mV5rR8WhyAVTyjkMcyqipp9LYvDuLuIcSGLdUicoXn17%2F6syDLJSbtqGaYdPwQR9LFTcIlc7gC0Y8TmqzZBBXd1nnEqrumvIx4swc9DDOrzbbhll9G83pUt0tvG0RgNKvn2QbPBhBT1FhBMGKgBVJ918sM1%2B01N%2FgZc3Bw%3D%3D&uemps=0-1&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&avifSupport=1&acs=1&ef=1&ep=%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1669557577661%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22area%22%3A%22Cv8yENO3XzLpCK%3D%3D%22%2C%22d_model%22%3A%22J05PUOnVU0OzCNKm%22%2C%22wifiBssid%22%3A%22dW5hbw93bq%3D%3D%22%2C%22osVersion%22%3A%22EG%3D%3D%22%2C%22d_brand%22%3A%22J25vUQn1cm%3D%3D%22%2C%22screen%22%3A%22CJuyCMenCNqm%22%2C%22uuid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%2C%22aid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D&st=1669557623437&sign=32fca984dd198de2d66fdcef4bb76580&sv=112','body':'lmt=0&body=%7B%22businessId%22%3A%221%22%2C%22informationParam%22%3A%7B%22eid%22%3A%22eidAfea581218ds3r6vxnUdvS3yU8Zjjeu4jBq%2Br8yDlNMAWdRVBOHn%2Bwcf7a1qGnYVfQ2xpIn4AYEaNjd1I4P2qmkDGd%2BF8PBSUlEZ4%2FRMU83wPmSBH%22%2C%22fp%22%3A0%2C%22isRvc%22%3A0%2C%22openId%22%3A-1%2C%22referUrl%22%3A-1%2C%22shshshfp%22%3A-1%2C%22shshshfpa%22%3A-1%2C%22userAgent%22%3A-1%7D%2C%22themeId%22%3A%22571%22%7D&','headers':{'Cookie':cookie,'Content-Type':'application/x-www-form-urlencoded','User-Agent':'jdltapp;iPhone;3.3.2;14.5.1network/wifi;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;model/iPhone13,2;addressid/137923973;hasOCPay/0;appBuild/1047;supportBestPay/0;pv/467.11;apprpd/MyJD_Main;','Accept-Language':'zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8'}};
		$.post(_0x3b2dd9,async(_0x3ff8d2,_0x2ec662,_0x5391f9)=>{
			try{
				if(_0x3ff8d2){
					console.log(''+JSON.stringify(_0x3ff8d2));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x5391f9)){
						_0x5391f9=$.toObj(_0x5391f9);
					}
				}
			}catch(_0x2e23a2){
				$.logErr(_0x2e23a2,_0x2ec662);
			}finally{
				_0x2eaeeb(_0x5391f9);
			}
		});
	});
}
async function getNewsComerGift(){
	return new Promise(async _0x400175=>{
		const _0x4b0af8={'url':'https://api.m.jd.com/client.action?functionId=getNewsComerGift&lmt=0&clientVersion=11.2.8&build=98380&client=android&partner=oppo&eid=eidAfea581218ds3r6vxnUdvS3yU8Zjjeu4jBq+r8yDlNMAWdRVBOHn+wcf7a1qGnYVfQ2xpIn4AYEaNjd1I4P2qmkDGd+F8PBSUlEZ4/RMU83wPmSBH&sdkVersion=28&lang=zh_CN&harmonyOs=0&networkType=wifi&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJgHew6f2YVOT52hi3mV5rR8WhyAVTyjkMcyqipp9LYvDuLuIcSGLdUicoXn17%2F6syDLJSbtqGaYdPwQR9LFTcIlc7gC0Y8TmqzZBBXd1nnEqrumvIx4swc9DDOrzbbhll9G83pUt0tvG0RgNKvn2QbPBhBT1FhBMGKgBVJ918sM1%2B01N%2FgZc3Bw%3D%3D&uemps=0-1&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&avifSupport=1&acs=1&ef=1&ep=%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1669557577661%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22area%22%3A%22Cv8yENO3XzLpCK%3D%3D%22%2C%22d_model%22%3A%22J05PUOnVU0OzCNKm%22%2C%22wifiBssid%22%3A%22dW5hbw93bq%3D%3D%22%2C%22osVersion%22%3A%22EG%3D%3D%22%2C%22d_brand%22%3A%22J25vUQn1cm%3D%3D%22%2C%22screen%22%3A%22CJuyCMenCNqm%22%2C%22uuid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%2C%22aid%22%3A%22CNG5DtLrZWG3YwG5DNVsDq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D&st=1669557633940&sign=050536045cb50043bddb8d5624c8e562&sv=101','body':'lmt=0&body=%7B%22encryptAssignmentId%22%3A%222hXh9ve7o3gekcA4LqenW982nEie%22%2C%22firstWindow%22%3A1%2C%22itemId%22%3A%221%22%7D&','headers':{'Cookie':cookie,'Content-Type':'application/x-www-form-urlencoded','User-Agent':'jdltapp;iPhone;3.3.2;14.5.1network/wifi;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;model/iPhone13,2;addressid/137923973;hasOCPay/0;appBuild/1047;supportBestPay/0;pv/467.11;apprpd/MyJD_Main;','Accept-Language':'zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8'}};
		$.post(_0x4b0af8,async(_0x432ad8,_0x5c39d1,_0x5b20fa)=>{
			try{
				if(_0x432ad8){
					console.log(''+JSON.stringify(_0x432ad8));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x5b20fa)){
						_0x5b20fa=$.toObj(_0x5b20fa);
						if(_0x5b20fa.code==0){
							if(_0x5b20fa.result['isLottery']===1){
								console.log('恭喜获得 '+_0x5b20fa.result['lotteryInfo']['quantity']+_0x5b20fa.result['lotteryInfo']['name']);
							}else{
								console.log('已领取过或者无奖励！');
							}
						}else{
							console.log(_0x5b20fa);
						}
					}
				}
			}catch(_0xfadbe0){
				$.logErr(_0xfadbe0,_0x5c39d1);
			}finally{
				_0x400175(_0x5b20fa);
			}
		});
	});
}
function safeGet(_0x25de7c){
	try{
		if(typeof JSON.parse(_0x25de7c)=='object'){
			return true;
		}
	}catch(_0x9ed06c){
		console.log(_0x9ed06c);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function jsonParse(_0x22a553){
	if(typeof _0x22a553=='string'){
		try{
			return JSON.parse(_0x22a553);
		}catch(_0x44b14c){
			console.log(_0x44b14c);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};