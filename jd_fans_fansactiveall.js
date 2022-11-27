/*
粉丝福利红包
远程更新，看频道通知
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#粉丝福利红包
1 1 1 1 * jd_fans_fansactiveall.js, tag=粉丝福利红包, enabled=true
 */
const Env=require('./utils/Env.js');
const $=new Env('粉丝福利红包');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
CryptoJS=$.isNode()?require('crypto-js'):CryptoJS;
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x326af9=>{
		cookiesArr.push(jdCookieNode[_0x326af9]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x4f63ab=>_0x4f63ab.cookie)].filter(_0x162322=>!!_0x162322);
}
let time=Date.now();
let allMessage='';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	//authorCodeList=await getAuthorCodeList('http://code.kingran.ga/fans.json');
	authorCodeList=[]
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.activityId=$.authorCode;
	if(!$.activityId){
		console.log('\n暂无活动~\n');
		return;
	}
	for(let _0x5ac028=0;_0x5ac028<cookiesArr.length;_0x5ac028++){
		if(cookiesArr[_0x5ac028]){
			cookie=cookiesArr[_0x5ac028];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x5ac028+1;
			$.isLogin=true;
			$.nickName='';
			message='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await main();
			await $.wait(2000);
		}
	}
	if(allMessage){
		if($.isNode())await notify.sendNotify(''+$.name,''+allMessage);
		$.msg($.name,'',allMessage);
	}
})().catch(_0x894c48=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x894c48+'!','');
}).finally(()=>{
	$.done();
});
async function main(){
	await query_tempactivconfig();
	await $.wait(500);
	await query_activetemporary();
	await $.wait(500);
	await draw_activetemporary();
}
function query_tempactivconfig(){
	return new Promise(async _0x4a5954=>{
		const _0x4a4637={'url':'https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid='+$.activityId+'&_='+time+'&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5','headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Host':'wq.jd.com','Referer':'https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid='+$.activityId+'&_='+time+'&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1'}};
		$.get(_0x4a4637,(_0x34c62a,_0x560c23,_0x316cfc)=>{
			try{
				if(_0x34c62a){
					console.log(_0x34c62a);
				}else{
					$.backEnd=_0x316cfc.match(/"backEnd":"(.+?)"/);
					if($.backEnd){
						$.backEnd=$.backEnd[1];
					}
					console.log('领取ID：'+$.backEnd);
				}
			}catch(_0x2dfb99){
				$.logErr(_0x2dfb99,_0x560c23);
			}finally{
				_0x4a5954(_0x316cfc||{});
			}
		});
	});
}
function query_activetemporary(){
	return new Promise(async _0x1c2077=>{
		const _0x27c8e4={'url':'https://wq.jd.com/activet2/looktreasure/query_activetemporary?sceneval=2&backendId='+$.backEnd+'&_='+time+'&sceneval=2&g_login_type=1&callback=query_activetemporary&g_ty=ls&appCode=msc588d6d5','headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Host':'wq.jd.com','Referer':'https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid='+$.activityId+'&_='+time+'&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1'}};
		$.get(_0x27c8e4,(_0x470347,_0x339d26,_0x3eb637)=>{
			try{
				if(_0x470347){
					console.log(_0x470347);
				}else{
					$.sPrizeDesc=_0x3eb637.match(/"sPrizeDesc":"(.+?)"/);
					if($.sPrizeDesc){
						$.sPrizeDesc=$.sPrizeDesc[1];
						console.log('宝，获得：'+$.sPrizeDesc);
					}
				}
			}catch(_0x4b0acf){
				$.logErr(_0x4b0acf,_0x339d26);
			}finally{
				_0x1c2077(_0x3eb637||{});
			}
		});
	});
}
function draw_activetemporary(){
	return new Promise(async _0x403441=>{
		const _0x3b557c={'url':'https://wq.jd.com/activet2/looktreasure/draw_activetemporary?sceneval=2&backendId='+$.backEnd+'&_='+time+'&sceneval=2&g_login_type=1&callback=draw_activetemporary&g_ty=ls&appCode=msc588d6d5','headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Host':'wq.jd.com','Referer':'https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid='+$.activityId+'&_='+time+'&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls&appCode=msc588d6d5','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1'}};
		$.get(_0x3b557c,(_0x1bff35,_0x5f12d2,_0x50d163)=>{
			try{
				if(_0x1bff35){
					console.log(_0x1bff35);
				}else{}
			}catch(_0x5d5c2e){
				$.logErr(_0x5d5c2e,_0x5f12d2);
			}finally{
				_0x403441(_0x50d163||{});
			}
		});
	});
}
function getAuthorCodeList(_0x574ba9){
	return new Promise(_0x32acd4=>{
		const _0x54b152={'url':_0x574ba9+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x54b152,async(_0x187bfb,_0x4b81a2,_0x24d82d)=>{
			try{
				if(_0x187bfb){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x24d82d)_0x24d82d=JSON.parse(_0x24d82d);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x5cb35f){
				$.logErr(_0x5cb35f,_0x4b81a2);
				_0x24d82d=null;
			}finally{
				_0x32acd4(_0x24d82d);
			}
		});
	});
}
function random(_0x2b67a2,_0x41f25e){
	return Math.floor(Math.random()*(_0x41f25e-_0x2b67a2))+_0x2b67a2;
}
function safeGet(_0x16909f){
	try{
		if(typeof JSON.parse(_0x16909f)=='object'){
			return true;
		}
	}catch(_0x4b8f75){
		console.log(_0x4b8f75);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function jsonParse(_0x4a52eb){
	if(typeof _0x4a52eb=='string'){
		try{
			return JSON.parse(_0x4a52eb);
		}catch(_0xcffdbe){
			console.log(_0xcffdbe);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};