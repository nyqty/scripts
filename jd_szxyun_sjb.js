/*
12.1-12.20 竞猜世界杯

cron:31 14 1-20 12 *
============Quantumultx===============
[task_local]
#12.1-12.20 竞猜世界杯
31 14 1-20 12 * jd_szxyun_sjb.js, tag=12.1-12.20 竞猜世界杯, enabled=true
*/
const Env=require('./utils/Env.js');
const $=new Env("12.1-12.20 竞猜世界杯");
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const getToken=require('./function/krgetToken');
let domains='https://szxyun-rc.isvjcloud.com';
let cookiesArr=[],cookie='',message='',messageTitle='';
if($.isNode()){
	if(process.env['jd_showCart_activityUrl'])activityUrl=process.env['jd_showCart_activityUrl'];
	if(JSON.stringify(process.env)['indexOf']('GITHUB')>-1)process.exit(0);
	Object.keys(jdCookieNode)['forEach'](_0x221db4=>{
		cookiesArr.push(jdCookieNode[_0x221db4]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]')['map'](_0x591895=>_0x591895.cookie)]['filter'](_0x550fa3=>!!_0x550fa3);
}
let isGetCookie=typeof $request!=='undefined';
if(isGetCookie){
	GetCookie();
	$.done();
}
!(async()=>{
	authorCodeList=[]//await getAuthorCodeList('http://code.kingran.ga/1.json');
	$.activityId='guessWorldCupDG47nrRz';
	$.authorCode=authorCodeList[random(0,authorCodeList.length)];
	$.shareId=$.authorCode;
	console.log('活动入口:\nhttps://szxyun-rc.isvjcloud.com/pagec/unitedWorldCup/index.html?shareId='+$.shareId);
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	for(let _0x10159d=0;_0x10159d<cookiesArr.length;_0x10159d++){
		if(cookiesArr[_0x10159d]){
			cookie=cookiesArr[_0x10159d];
			originCookie=cookiesArr[_0x10159d];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=_0x10159d+1;
			$.isLogin=true;
			$.nickName='';
			console.log('\n开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await getUA();
			await showCart();
			if($.hasEnd||$.activityEnd){
				break;
			}
		}
	}
})()['catch'](_0x9ca922=>{
	$.log('',' '+$.name+', 失败! 原因: '+_0x9ca922+'!','');
})['finally'](()=>{
	$.done();
});
async function showCart(){
	$.shopid=1000085868;
	$.token='';
	$.token=await getToken(cookie,domains);
	if($.token==''){
		console.log('获取[token]失败！');
		return;
	}
	await userLogin();
	if($.tokens){
		await active();
		await share();
		console.log('去助力 -> '+$.shareId);
		if($.index==1){
			$.shareId=$.joinId;
			console.log('后面的号都会助力 -> '+$.shareId);
		}
	}
}
function userLogin(){
	return new Promise(_0x4dabd5=>{
		let _0x1661d1={'shopId':$.shopid,'token':$.token,'source':'01'};
		$.post(taskPostUrls('/webc/login/userLogin',_0x1661d1),async(_0x13aac9,_0x56feb0,_0x41a2ee)=>{
			try{
				if(_0x13aac9){
					console.log(''+JSON.stringify(_0x13aac9));
					console.log($.name+' userLogin API请求失败，请检查网路重试');
				}else{
					_0x41a2ee=JSON.parse(_0x41a2ee);
					if(_0x41a2ee&&_0x41a2ee.success){
						$.tokens=_0x41a2ee.data;
					}
				}
			}catch(_0x1b545b){
				$.logErr(_0x1b545b,_0x56feb0);
			}finally{
				_0x4dabd5();
			}
		});
	});
}
function active(){
	return new Promise(_0x174962=>{
		let _0x480ce9={'activeId':$.activityId,'shareId':$.shareId};
		$.post(taskPostUrl('/webc/guessWorldCup/active',_0x480ce9),async(_0x461d9c,_0x134154,_0x10f288)=>{
			try{
				if(_0x461d9c){
					console.log(''+JSON.stringify(_0x461d9c));
					console.log($.name+' active API请求失败，请检查网路重试');
				}else{
					_0x10f288=JSON.parse(_0x10f288);
					if(_0x10f288&&_0x10f288.success){
						$.joinId=_0x10f288.data['userVO']['joinId']||'';
					}
				}
			}catch(_0x5cabb3){
				$.logErr(_0x5cabb3,_0x134154);
			}finally{
				_0x174962();
			}
		});
	});
}
function share(){
	return new Promise(_0x23d333=>{
		let _0x44ac51={'activeId':$.activityId,'joinId':$.joinId,'shareId':$.shareId};
		$.post(taskPostUrl('/webc/guessWorldCup/share',_0x44ac51),async(_0x149252,_0x1bbe75,_0x7a499e)=>{
			try{
				if(_0x149252){
					console.log(''+JSON.stringify(_0x149252));
					console.log($.name+' share API请求失败，请检查网路重试');
				}else{
					_0x7a499e=JSON.parse(_0x7a499e);
					if(_0x7a499e&&_0x7a499e.success){
						$.helpStatus=_0x7a499e.data['helpStatus']||0;
						$.awardName=_0x7a499e.data['awardName']||0;
						console.log('助力状态：'+$.helpStatus+'  获得豆子： '+$.awardName);
					}
				}
			}catch(_0x161739){
				$.logErr(_0x161739,_0x1bbe75);
			}finally{
				_0x23d333();
			}
		});
	});
}
function getAuthorCodeList(_0x33d615){
	return new Promise(_0x209a6e=>{
		const _0x512f9e={'url':_0x33d615+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x512f9e,async(_0x1ff5cf,_0x127c8f,_0x3920a0)=>{
			try{
				if(_0x1ff5cf){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x3920a0)_0x3920a0=JSON.parse(_0x3920a0);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x2ab93b){
				$.logErr(_0x2ab93b,_0x127c8f);
				_0x3920a0=null;
			}finally{
				_0x209a6e(_0x3920a0);
			}
		});
	});
}
function taskPostUrl(_0x55d884,_0x3b8174){
	return{'url':''+domains+_0x55d884,'body':JSON.stringify(_0x3b8174),'headers':{'Accept':'application/json, text/javascript, */*; q=0.01','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-CN,zh-Hans;q=0.9','Connection':'keep-alive','Cookie':cookie,'Host':'szxyun-rc.isvjcloud.com','Content-Type':'application/json;charset=UTF-8','jd-fast-token':$.tokens,'Origin':'https://szxyun-rc.isvjcloud.com','Referer':'https://szxyun-rc.isvjcloud.com/pagec/unitedWorldCup/index.html?shareId=1598519907429326849&sid=02e0f540215c28730082d3c3e988f6aw&un_area=4_50950_50957_0','User-Agent':$.UA}};
}
function taskPostUrls(_0x423f5e,_0x4fec09){
	return{'url':''+domains+_0x423f5e,'body':JSON.stringify(_0x4fec09),'headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-CN,zh-Hans;q=0.9','Connection':'keep-alive','Cookie':cookie,'Content-Type':'application/json;charset=UTF-8','jd-fast-token':'null','Host':'szxyun-rc.isvjcloud.com','Origin':'https://szxyun-rc.isvjcloud.com','Referer':'https://szxyun-rc.isvjcloud.com/pagec/unitedWorldCup/index.html?shareId=1598519907429326849&sid=02e0f540215c28730082d3c3e988f6aw&un_area=4_50950_50957_0','User-Agent':$.UA}};
}
function getUA(){
	$.UA='jdapp;iPhone;10.2.2;14.3;'+randomString(40)+';M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;';
}
function randomString(_0x1e087d){
	_0x1e087d=_0x1e087d||32;
	let _0x161008='abcdef0123456789',_0x2b8c9f=_0x161008.length,_0x12dd0c='';
	for(i=0;i<_0x1e087d;i++)_0x12dd0c+=_0x161008.charAt(Math.floor(Math.random()*_0x2b8c9f));
	return _0x12dd0c;
}
function safeGet(_0x53df32){
	if(!_0x53df32){
		console.log('京东服务器返回数据为空');
		return false;
	}
	try{
		if(typeof JSON.parse(_0x53df32)=='object'){
			return true;
		}
	}catch(_0x38a5e9){
		console.log(_0x38a5e9);
		return false;
	}
}
function jsonParse(_0x5cc93c){
	if(typeof _0x5cc93c=='string'){
		try{
			return JSON.parse(_0x5cc93c);
		}catch(_0x45efe1){
			console.log(_0x45efe1);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
function random(_0x4a7680,_0x29ad4b){
	return Math.floor(Math.random()*(_0x29ad4b-_0x4a7680))+_0x4a7680;
};
