/*
常规店铺签到
环境变量: export DPQDTK="token1&token2" 或 export DPQDTK="token1\ntoken2"

定时建议自行修改
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#常规店铺签到
1 1 1 1 * jd_dpqd.js, tag=常规店铺签到, enabled=true
*/
const Env=require('./utils/Env.js');
const $=new Env('常规店铺签到');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie'):'';
let token=[];
if(process.env.DPQDTK){
	if(process.env.DPQDTK.includes('\n')){
		token=[...process.env.DPQDTK.split('\n'),...token];
	}else{
		token=[...process.env.DPQDTK.split('&'),...token];
	}
}
let cookiesArr=[],cookie='',allMessage='',message;
const JD_API_HOST='https://api.m.jd.com/api?appid=interCenter_shopSign';
$.activityId='';
$.venderId='';
$.activityEnd=false;
if($.isNode()){
	Object.keys(jdCookieNode).forEach(QOO00Q=>{
		cookiesArr.push(jdCookieNode[QOO00Q]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=jsonParse(cookiesData);
	cookiesArr=cookiesData.map(QO0QOO=>QO0QOO.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(QO00O0=>QO00O0!==''&&QO00O0!==null&&QO00O0!==undefined);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	for(let O000O0=0;O000O0<cookiesArr.length;O000O0++){
		if(cookiesArr[O000O0]){
			cookie=cookiesArr[O000O0];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=O000O0+1;
			$.isLogin=true;
			$.nickName='';
			message='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'******\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			getUA();
			await Main();
			await $.wait(1000);
		}
	}
})().catch(QQQQ0O=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+QQQQ0O+'!','');
}).finally(()=>{
	$.done();
});
async function Main(){
	for(var O00QQ0=0;O00QQ0<token.length;O00QQ0++){
		if(token[O00QQ0]==''){
			continue;
		}
		await getvenderId(token[O00QQ0]);
		if($.venderId==''){
			continue;
		}
		await getShopName($.venderId);
		await getActivityInfo(token[O00QQ0],$.venderId);
		await signCollectGift(token[O00QQ0],$.venderId,$.activityId);
		await taskUrl(token[O00QQ0],$.venderId);
	}
}
async function getvenderId(QQQ0QQ){
	return new Promise(QQ0OQ0=>{
		const O00000={'url':'https://api.m.jd.com/api?appid=interCenter_shopSign&t='+Date.now()+'&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22'+QQQ0QQ+'%22,%22venderId%22:%22%22}&jsonp=jsonp1000','headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'referer':'https://h5.m.jd.com/','User-Agent':$.UA}};
		$.get(O00000,(O00QQQ,QOOQQ0,O00Q0Q)=>{
			try{
				if(O00QQQ){
					console.log('查询店铺API请求失败‼️');
					console.log(O00QQQ);
				}else{
					O00Q0Q=JSON.parse(/{(.*)}/g.exec(O00Q0Q)[0]);
					if(O00Q0Q.code==402){
						$.venderId='';
						console.log('活动已失效');
						$.activityEnd=true;
					}else{
						$.venderId=O00Q0Q.data.venderId;
					}
				}
			}catch(O000Q0){
				$.logErr(O000Q0,QOOQQ0);
			}finally{
				QQ0OQ0(O00Q0Q);
			}
		});
	});
}
async function getShopName(QQOO0O){
	return new Promise(O0OO0Q=>{
		const O0000Q={'url':'https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=%7B%22venderId%22%3A%22'+QQOO0O+'%22%2C%22stamp%22%3A%221%22%2C%22%24taroTimestamp%22%3A'+new Date().valueOf()+'%2C%22source%22%3A%22m-shop%22%7D&t='+new Date().valueOf()+'&appid=shop_view&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=16630119447091257705224','headers':{'accept':'*/*','accept-language':'zh-CN,zh;q=0.9','sec-fetch-dest':'empty','sec-fetch-mode':'cors','sec-fetch-site':'same-site','Referer':'https://shop.m.jd.com/','User-Agent':$.UA}};
		$.get(O0000Q,(O00OO0,QQQQQ0,QQQ0OO)=>{
			try{
				if(O00OO0){
					console.log('查询店铺名称API请求失败‼️');
					console.log(O00OO0);
				}else{
					QQQ0OO=JSON.parse(QQQ0OO);
					if($.index==1){
						let QQOO0Q=QQQ0OO.data.shopBaseInfo.shopName;
						console.log('店铺名称：'+QQOO0Q+'\n店铺链接：https://shop.m.jd.com/?venderId='+QQOO0O);
						message+='【'+QQOO0Q+'】';
					}
				}
			}catch(QQQQOO){
				$.logErr(QQQQOO,QQQQQ0);
			}finally{
				O0OO0Q(QQQ0OO);
			}
		});
	});
}
async function getActivityInfo(QOOQO0,O0Q0OO){
	return new Promise(O0OQOQ=>{
		const O0OQQO={'url':JD_API_HOST+'&t='+Date.now()+'&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22'+QOOQO0+'%22,%22venderId%22:'+O0Q0OO+'}&jsonp=jsonp1005','headers':{'accept':'accept','accept-encoding':'gzip, deflate','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'referer':'https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token='+QOOQO0+'&sceneval=2','User-Agent':$.UA}};
		$.get(O0OQQO,(O0OQ0O,O0OQQQ,O0OQ0Q)=>{
			try{
				if(O0OQ0O){
					console.log('查询活动信息API请求失败‼️');
					console.log(O0OQ0O);
				}else{
					O0OQ0Q=JSON.parse(/{(.*)}/g.exec(O0OQ0Q)[0]);
					$.activityId=O0OQ0Q.data.id;
					let O00QO0=O0OQ0Q.data.startTime;
					let QOQO0Q=O0OQ0Q.data.endTime;
					if($.index==1){
						console.log('开始时间：'+new Date(parseInt(O00QO0)).toLocaleString()+'\n结束时间：'+new Date(parseInt(QOQO0Q)).toLocaleString());
						let QOQOQQ='';
						for(let QOQO0O=0;QOQO0O<O0OQ0Q.data.continuePrizeRuleList.length;QOQO0O++){
							const QOQOQO=O0OQ0Q.data.continuePrizeRuleList[QOQO0O].level;
							const OOQQQQ=O0OQ0Q.data.continuePrizeRuleList[QOQO0O].prizeList[0].discount;
							if(QOQO0O!=O0OQ0Q.data.continuePrizeRuleList.length-1){
								QOQOQQ+=QOQOQO+'天'+OOQQQQ+'豆，';
							}else{
								QOQOQQ+=QOQOQO+'天'+OOQQQQ+'豆';
							}
						}
						console.log('签到奖励：'+QOQOQQ+'\n');
					}
				}
			}catch(OOQ0QQ){
				$.logErr(OOQ0QQ,O0OQQQ);
			}finally{
				O0OQOQ(O0OQ0Q);
			}
		});
	});
}
async function signCollectGift(O0O00Q,O0O0QQ,O0O00O){
	return new Promise(QOOOQQ=>{
		const QOQ0QO={'url':JD_API_HOST+'&t='+Date.now()+'&loginType=2&functionId=interact_center_shopSign_signCollectGift&body={%22token%22:%22'+O0O00Q+'%22,%22venderId%22:688200,%22activityId%22:'+O0O00O+',%22type%22:56,%22actionType%22:7}&jsonp=jsonp1004','headers':{'accept':'accept','accept-encoding':'gzip, deflate','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'referer':'https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token='+O0O00Q+'&sceneval=2','User-Agent':$.UA}};
		$.get(QOQ0QO,(OOQOQQ,OOQO0Q,OOQOQO)=>{
			try{
				if(OOQOQQ){
					console.log('签到API请求失败‼️');
					console.log(OOQOQQ);
				}else{
					OOQOQO=JSON.parse(/{(.*)}/g.exec(OOQOQO)[0]);
					if(OOQOQO.success&&OOQOQO.success===true){
						console.log('签到成功');
					}else{
						if(OOQOQO.msg){
							console.log('签到失败：'+OOQOQO.msg);
						}else{
							console.log('签到失败');
							console.log(JSON.stringify(OOQOQO));
						}
					}
				}
			}catch(QO0OOO){
				$.logErr(QO0OOO,OOQO0Q);
			}finally{
				QOOOQQ(OOQOQO);
			}
		});
	});
}
async function taskUrl(OQQOOQ,OQQOOO){
	return new Promise(OQ0O00=>{
		const OOO0Q0={'url':JD_API_HOST+'&t='+Date.now()+'&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22'+OQQOOQ+'%22,%22venderId%22:'+OQQOOO+',%22activityId%22:'+$.activityId+',%22type%22:56}&jsonp=jsonp1006','headers':{'accept':'application/json','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9','cookie':cookie,'referer':'https://h5.m.jd.com/','User-Agent':$.UA}};
		$.get(OOO0Q0,(OOOQ0O,Q00O00,OOO000)=>{
			try{
				if(OOOQ0O){
					console.log('API请求失败‼️');
					console.log(OOOQ0O);
				}else{
					OOO000=JSON.parse(/{(.*)}/g.exec(OOO000)[0]);
					console.log('当前已签到 '+OOO000.data.days+' 天');
					message+='已签到：'+OOO000.data.days+'天\n';
				}
			}catch(Q00OQ0){
				$.logErr(Q00OQ0,Q00O00);
			}finally{
				OQ0O00(OOO000);
			}
		});
	});
}
async function showMsg(){
	if($.isNode()){
		$.msg($.name,'','【京东账号'+$.index+'】'+$.nickName+'\n'+message);
		allMessage+='【京东账号'+$.index+'】'+$.nickName+'\n'+message+($.index!==cookiesArr.length?'\n\n':'');
	}
}
function TotalBean(){
	return new Promise(async OQQQQQ=>{
		const OQQQ0O={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':'jdapp;android;9.3.5;10;3353234393134326-3673735303632613;network/wifi;model/MI 8;addressid/138719729;aid/3524914bc77506b1;oaid/274aeb3d01b03a22;osVer/29;appBuild/86390;psn/Mp0dlaZf4czQtfPNMEfpcYU9S/f2Vv4y|2255;psq/1;adk/;ads/;pap/JA2015_311210|9.3.5|ANDROID 10;osv/10;pv/2039.1;jdv/0|androidapp|t_335139774|appshare|QQfriends|1611211482018|1611211495;ref/com.jingdong.app.mall.home.JDHomeFragment;partner/jingdong;apprpd/Home_Main;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36'}};
		$.post(OQQQ0O,(Q00OOO,OOOQO0,Q0000Q)=>{
			try{
				if(Q00OOO){
					console.log(''+JSON.stringify(Q00OOO));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(Q0000Q){
						Q0000Q=JSON.parse(Q0000Q);
						if(Q0000Q.retcode===13){
							$.isLogin=false;
							return;
						}
						if(Q0000Q.retcode===0){
							$.nickName=Q0000Q.base.nickname;
						}else{
							$.nickName=$.UserName;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(OQ0OO0){
				$.logErr(OQ0OO0,OOOQO0);
			}finally{
				OQQQQQ();
			}
		});
	});
}
function jsonParse(OQ00QO){
	if(typeof OQ00QO=='string'){
		try{
			return JSON.parse(OQ00QO);
		}catch(OQQ0OQ){
			console.log(OQQ0OQ);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
function randomString(Q000QQ){
	Q000QQ=Q000QQ||32;
	let Q00Q0Q='abcdef0123456789',Q00QQQ=Q00Q0Q.length,OQ0OOQ='';
	for(i=0;i<Q000QQ;i++)OQ0OOQ+=Q00Q0Q.charAt(Math.floor(Math.random()*Q00QQQ));
	return OQ0OOQ;
}
function getUA(){
	$.UA='jdapp;iPhone;10.2.2;13.1.2;'+randomString(40)+';M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;';
};
