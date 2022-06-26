/*
#京喜免费领

[task_local]
#京喜免费领
51 7,15,17 * * * jd_jxmfl.js, tag=京喜免费领, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
*/
const $ = new Env('京喜免费领-加密');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[],cookie='',message;
token='';
let first=false;
let launchidlsit;
let launchid;
$.appId=10032;
let UA,UAInfo={};
if(process.env.first){
	first=true;
}
if($.isNode()){
	Object.keys(jdCookieNode).forEach(OOOOQOO=>{
		cookiesArr.push(jdCookieNode[OOOOQOO]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(OOOOQOQ=>OOOOQOQ.cookie)].filter(QQ0O0QQ=>!!QQ0O0QQ);
}
const JD_API_HOST='https://api.m.jd.com/client.action';
!(async()=>{
	console.log('活动入口:https://st.jingxi.com/sns/202205/20/jxmfl/list.html');
	console.log('环境变量添加：export launchid="你的邀请码" ##你的邀请码');
	console.log('环境变量添加：export first="false"');
	console.log('请自行添加环境变量，否则将助力作者，账号低于30的可以禁用');
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	$.CryptoJS=$.isNode()?require('crypto-js'):CryptoJS;
	await jxmflra();

    let res = await getAuthorShareCode('https://cdn.jsdelivr.net/gh/atyvcn/updateTeam@master/shareCodes/jd/jxmfl.json')
    if (!res) {
      $.http.get({url: 'https://purge.jsdelivr.net/gh/atyvcn/updateTeam@master/shareCodes/jd/jxmfl.json'}).then((resp) => {}).catch((e) => console.log('刷新CDN异常', e));
      await $.wait(1000)
      res = await getAuthorShareCode('https://cdn.jsdelivr.net/gh/atyvcn/updateTeam@master/shareCodes/jd/jxmfl.json')
    }
	launchidlsit=res||[];
	launchid=res||[];
	if(process.env.launchid){
		launchid=process.env.launchid.split('@');
	}if((launchid.length==0)&&!first){
		return;
	}for(let OOOOOQ0=0;OOOOOQ0<cookiesArr.length;OOOOOQ0++){
		if(cookiesArr[OOOOOQ0]){
			cookie=cookiesArr[OOOOOQ0];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(OOOOOQ0+1);
			$.isLogin=true;
			$.nickName='';
			message='';
			UA='jdpingou;iPhone;4.13.0;14.4.2;'+randomString(40)+';network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/'+(Math.random*98+1)+';pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
			UAInfo[$.UserName]=UA;
			await TotalBean();
			console.log('\n开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			token=await getJxToken();
			if(first==true){
				await test();
				await help_all();
			}else{
				await help_all();
			}
		}
	}
})().catch(Q00OQQQ=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+Q00OQQQ+'!','');
}).finally(()=>{
	$.done();
});
async function help_all(){
	if($.index==1){
		for(let OOOQQOQ=0;OOOQQOQ<launchidlsit.length;OOOQQOQ++){
			$.signle_launchid=launchidlsit[OOOQQOQ];
			await help();
			await $.wait(500);
		}
	}
	if($.index!=1){
		for(let Q000OOO=0;Q000OOO<launchid.length;Q000OOO++){
			$.signle_launchid=launchid[Q000OOO];
			await help();
			await $.wait(500);
		}
	}
}
function getAuthorShareCode(O00OO0Q){
	return new Promise(OOOQQOO=>{
		const QOQQ0OO={'url':O00OO0Q+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(QOQQ0OO,async(QOOOQ0Q,O00Q0QO,QOOO0Q0)=>{
			try{
				if(QOOOQ0Q){
					$.getAuthorCodeListerr=false;
				}else{
					if(QOOO0Q0)QOOO0Q0=JSON.parse(QOOO0Q0);
					$.getAuthorCodeListerr=true;
				}
			}catch(O00QQ0Q){
				$.logErr(O00QQ0Q,O00Q0QO);
				QOOO0Q0=null;
			}
			finally{
				OOOQQOO(QOOO0Q0);
			}
		});
	});
}
function info(){
	return new Promise(async Q0OQQQ0=>{
		let Q0OQQQQ={'url':'https://m.jingxi.com/jxzlmfl/zlmfl_showpage?pageindex=1&pagenum=20&launchid=&t=1654590540049&_=1654590540049&sceneval=2&g_login_type=1&callback=jsonpCBKB&g_ty=ls&appCode=msd1188198','headers':{'Referer':'https://st.jingxi.com/sns/202205/20/jxmfl/index.html','Host':'m.jingxi.com','User-Agent':'jdpingou;iPhone;4.8.0;14.3;9714ccbf07209f246277896ef7c041f3bb571ca3;network/wifi;model/iPhone9,2;appBuild/100540;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/22;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148','Cookie':cookie}};
		$.get(Q0OQQQQ,async(QQO0Q0Q,O00O0Q0,QOOO0QO)=>{
			try{
				QOOO0QO=QOOO0QO.match(/(\{[^()]+\}.+)/)[1];
				const QOO00OQ=JSON.parse(QOOO0QO);
				if(QOO00OQ.errcode==0){
					list=QOO00OQ.data.discountzone;
					for(let OQOQ00Q=0;OQOQ00Q<list.length;OQOQ00Q++){
						$.log('商品：'+list[OQOQ00Q].skutitle+'\n商品iD：'+list[OQOQ00Q].active+'\n需要邀请：'+list[OQOQ00Q].needhelpnum+'人 免费带回家');
					}
				}else console.log(QOOO0QO.msg);
			}catch(Q0OQQO0){
				$.logErr(Q0OQQO0,O00O0Q0);
			}
			finally{
				Q0OQQQ0();
			}
		});
	});
}
function test(){
	return new Promise(async Q00OQOO=>{
		let QOO0Q0O={'url':'https://m.jingxi.com/jxzlmfl/zlmfl_myonline?t=1654591101246&_=1654591101249&sceneval=2&g_login_type=1&callback=jsonpCBKC&g_ty=ls&appCode=msd1188198','headers':{'Referer':'https://st.jingxi.com/sns/202205/20/jxmfl/index.html','Host':'m.jingxi.com','User-Agent':'jdpingou;iPhone;4.8.0;14.3;9714ccbf07209f246277896ef7c041f3bb571ca3;network/wifi;model/iPhone9,2;appBuild/100540;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/22;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148','Cookie':cookie}};
		$.get(QOO0Q0O,async(QOO00Q0,O0O0O00,OQOQOOQ)=>{
			try{
				OQOQOOQ=OQOQOOQ.match(/(\{[^()]+\}.+)/)[1];
				OQOQOOQ=JSON.parse(OQOQOOQ);
				const OOOQQQO=OQOQOOQ.data.onling;
				for(let O0OQ0QO=0;O0OQ0QO<OOOQQQO.length;O0OQ0QO++){
					console.debug(OOOQQQO[O0OQ0QO]);
				}
			}catch(Q00OQQ0){
				$.logErr(Q00OQQ0,O0O0O00);
			}
			finally{
				Q00OQOO();
			}
		});
	});
}
function taskUrl(QQOQ0Q0,O0OQ0QQ=''){
	let QOO00QO='https://m.jingxi.com/jxzlmfl/'+QQOQ0Q0+'?'+(O0OQ0QQ?'&'+O0OQ0QQ:'');
	QOO00QO+='&_stk=launchid%2Ctype';
	QOO00QO+='&_ste=1&h5st='+jxmflst(Date.now(),'','',QOO00QO)+'&t=1656051648962&dvcid=bd7c974e572433e7&_='+(Date.now()+2)+'&sceneval=2&g_login_type=1&callback=jsonpCBK'+String.fromCharCode(Math.floor(Math.random()*26)+'A'.charCodeAt(0))+'&g_ty=ls&appCode=msd1188198';
	return{'url':QOO00QO,'headers':{'Host':'m.jingxi.com','Accept':'*/*','Accept-Encoding':'gzip, deflate, br','User-Agent':UA,'Accept-Language':'zh-CN,zh-Hans;q=0.9','Referer':'https://st.jingxi.com/','Cookie':'cid=4;'+cookie}};
}
function randomString(OQO0QQO){
	OQO0QQO=(OQO0QQO||32);
	let QQOO0Q0='0123456789abcdef',QQQQ0QO=QQOO0Q0.length,OQOQQQQ='';
	for(let Q0OQOQO=0;Q0OQOQO<OQO0QQO;Q0OQOQO++)OQOQQQQ+=QQOO0Q0.charAt(Math.floor(Math.random()*QQQQ0QO));
	return OQOQQQQ;
}
function getStk(QQQ0O0Q){
	let Q0OQOQQ=QQQ0O0Q.split('&').map(OQOQ000=>OQOQ000.replace(/.*\?/,'').replace(/=.*/,''));
	return encodeURIComponent(Q0OQOQQ.filter(OQOQQQO=>OQOQQQO).sort().join(','));
}
function help(){
	return new Promise(async QOOQQ00=>{
		$.get(taskUrl('zlmfl_queryhelp','strPgTimeStamp='+token.timestamp+'&strPhoneID='+token.phoneid+'&strPgUUNum='+token.farm_jstoken+'&launchid='+$.signle_launchid+'&type=1'),async(Q0O0OQ0,QQOOQ0O,QQOO0QO)=>{
			try{
				QQOO0QO=QQOO0QO.match(/(\{[^()]+\}.+)/)[1];
				const QQQQO0O=JSON.parse(QQOO0QO);
				if(QQQQO0O.errcode==0){
					$.log(''+QQQQO0O.data.guestinfo.contenttips);
				}else console.log(QQOO0QO.msg);
			}catch(QOO0O00){
				$.logErr(QOO0O00,QQOOQ0O);
			}
			finally{
				QOOQQ00();
			}
		});
	});
}
async function taskPostUrl(OQOQQO0,O00O0OO){
	return{'url':''+JD_API_HOST,'body':'functionId='+OQOQQO0+'&body='+escape(JSON.stringify(O00O0OO))+'&client=wh5&clientVersion=1.0.0&appid=content_ecology&uuid=6898c30638c55142969304c8e2167997fa59eb54&t=1622588448365','headers':{
			'Cookie':cookie,'Host':'api.m.jd.com','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','User-Agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br'
		}};
}
async function TotalBean(){
	return new Promise(async Q0OQOOQ=>{
		const QO0O00Q={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{
				'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
			}};
		$.post(QO0O00Q,(OO00OOQ,QOOQO0O,O0O0QOO)=>{
			try{
				if(OO00OOQ){
					console.log(''+JSON.stringify(OO00OOQ));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(O0O0QOO){
						O0O0QOO=JSON.parse(O0O0QOO);
						if(O0O0QOO.retcode===13){
							$.isLogin=false;
							return;
						}if(O0O0QOO.retcode===0){
							$.nickName=O0O0QOO.base&&O0O0QOO.base.nickname||$.UserName;
						}else{
							$.nickName=$.UserName;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(OQQQO0Q){
				$.logErr(OQQQO0Q,QOOQO0O);
			}
			finally{
				Q0OQOOQ();
			}
		});
	});
}
async function safeGet(QOOQO0Q){
	try{
		if(typeof JSON.parse(QOOQO0Q)=='object'){
			return true;
		}
	}catch(Q0Q000Q){
		console.log(Q0Q000Q);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function jsonParse(O0OO00Q){
	var OQO0=function(_0x1304c6){
		var _0xecac90=true;
		return function(_0x470e4c,_0x29b1d9){
			var _0x1bc34e='‮';
			var _0x435aeb=_0xecac90?function(){
				if(_0x1bc34e==='‮'&&_0x29b1d9){
					var _0x4a0dc7=_0x29b1d9.apply(_0x470e4c,arguments);
					_0x29b1d9=null;
					return _0x4a0dc7;
				}
			}:function(_0x1304c6){};
			_0xecac90=false;
			var _0x1304c6='‮';
			return _0x435aeb;
		};
	}();
	var OQ0O00O=OQO0(this,function(){
		var _0x109cbd=function(){
			return'dev';
		},_0x51444c=function(){
			return'window';
		};
		var _0x300de9=function(){
			var _0x8763c7=new RegExp('\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}');
			return!_0x8763c7['test'](_0x109cbd['toString']());
		};
		var _0x5e22ea=function(){
			var _0x72683a=new RegExp('(\\\\[x|u](\\w){2,4})+');
			return _0x72683a['test'](_0x51444c['toString']());
		};
		var _0x144a35=function(_0x5442de){
			var _0x27c6ae=~-0x1>>0x1+255%0;
			if(_0x5442de['indexOf']('i'===_0x27c6ae)){
				_0x342d5e(_0x5442de);
			}
		};
		var _0x342d5e=function(_0x377872){
			var _0x4befcc=~-0x4>>0x1+255%0;
			if(_0x377872['indexOf']((true+'')[3])!==_0x4befcc){
				_0x144a35(_0x377872);
			}
		};
		if(!_0x300de9()){
			if(!_0x5e22ea()){
				_0x144a35('indеxOf');
			}else{
				_0x144a35('indexOf');
			}
		}else{
			_0x144a35('indеxOf');
		}
	});
	OQ0O00O();
	var QO0OQQO={'QO0OQQ':function(QO0O000,QO0OQQQ){
			return QO0O000(QO0OQQQ);
		},'O0OQQ0':function(QOOQO00,OO0Q000){
			return QOOQO00==OO0Q000;
		},'O0OQ00':'O0OOO','OO00QQ':'O00QQ'};
	if(QO0OQQO.O0OQQ0(typeof O0OO00Q,'string')){
		if(QO0OQQO.O0OQ00===QO0OQQO.OO00QQ){
			return QO0OQQO.QO0OQQ(g,m(n));
		}else{
			try{
				return JSON.parse(O0OO00Q);
			}catch(QQQ0Q0O){
				console.log(QQQ0Q0O);
				$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
				return[];
			}
		}
	}
}
Date.prototype.Format=function(Q0QQQQO){
	var OO0QQQQ,O0O0QO0=this,OO00OQ0=Q0QQQQO,QQQOO00={'M+':(O0O0QO0.getMonth()+1),'d+':O0O0QO0.getDate(),'D+':O0O0QO0.getDate(),'h+':O0O0QO0.getHours(),'H+':O0O0QO0.getHours(),'m+':O0O0QO0.getMinutes(),'s+':O0O0QO0.getSeconds(),'w+':O0O0QO0.getDay(),'q+':Math.floor(O0O0QO0.getMonth()+3/3),'S+':O0O0QO0.getMilliseconds()};
	/(y+)/i.test(OO00OQ0)&&(OO00OQ0=OO00OQ0.replace(RegExp.$1,''.concat(O0O0QO0.getFullYear()).substr(4-RegExp.$1.length)));
	for(var O0OOOO0 in QQQOO00){
		if(new RegExp('('.concat(O0OOOO0,')')).test(OO00OQ0)){
			var O0OO00O,Q0Q0OOO='S+'===O0OOOO0?'000':'00';
			OO00OQ0=OO00OQ0.replace(RegExp.$1,1==RegExp.$1.length?QQQOO00[O0OOOO0]:(''.concat(Q0Q0OOO)+QQQOO00[O0OOOO0]).substr(''.concat(QQQOO00[O0OOOO0]).length));
		}
	}
	return OO00OQ0;
};
function jxmflst(Q0Q0OOQ,QO0OQQ0,QQQQ0Q0,O0OOQQQ){
	QO0OQQ0=QO0OQQ0||(O0OOQQQ?getUrlData(O0OOQQQ,'_stk'):'');
	if(QO0OQQ0){
		const QQQQQ0O=new Date(Q0Q0OOQ).Format('yyyyMMddhhmmssSSS');
		let O0OO000='';
		if($.fingerprint&&$.token&&$.enCryptMethodJD){
			O0OO000=$.enCryptMethodJD($.token,$.fingerprint.toString(),QQQQQ0O.toString(),$.appId.toString(),$.CryptoJS).toString($.CryptoJS.enc.Hex);
		}else{
			const QQQQQ0Q='5gkjB6SpmC9s';
			$.token='tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc';
			$.fingerprint=5287160221454703;
			const OQQ0O00=''+$.token+$.fingerprint+QQQQQ0O+$.appId+QQQQQ0Q;
			O0OO000=$.CryptoJS.SHA512(OQQ0O00,$.token).toString($.CryptoJS.enc.Hex);
		}
		let Q0QOOQQ='';
		QO0OQQ0.split(',').map((Q0QOOQO,OO0QOOO)=>{
			Q0QOOQQ+=Q0QOOQO+':'+getUrlData(O0OOQQQ,Q0QOOQO)+((OO0QOOO===QO0OQQ0.split(',').length-1)?'':'&');
		});
		const Q0OOQO0=$.CryptoJS.HmacSHA256(Q0QOOQQ,O0OO000.toString()).toString($.CryptoJS.enc.Hex);
		return encodeURIComponent([''.concat(QQQQQ0O.toString()),''.concat($.fingerprint.toString()),''.concat($.appId.toString()),''.concat($.token),''.concat(Q0OOQO0),''.concat('3.0'),''.concat(Q0Q0OOQ)].join(';'));
	}else{
		return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d';
	}
}
async function jxmflra(){
	$.fingerprint=await jxmflfp();
	const OQQ0O0Q={'url':'https://cactus.jd.com/request_algo?g_ty=ajax','headers':{'Authority':'cactus.jd.com','Pragma':'no-cache','Cache-Control':'no-cache','Accept':'application/json','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','Content-Type':'application/json','Origin':'https://st.jingxi.com','Sec-Fetch-Site':'cross-site','Sec-Fetch-Mode':'cors','Sec-Fetch-Dest':'empty','Referer':'https://st.jingxi.com/','Accept-Language':'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'},'body':JSON.stringify({'version':'1.0','fp':$.fingerprint,'appId':$.appId.toString(),'timestamp':Date.now(),'platform':'web','expandParams':''})};
	return new Promise(async QQQQ0OQ=>{
		$.post(OQQ0O0Q,(O0QQ00O,QO0QQQ0,OO00QOQ)=>{
			try{
				if(O0QQ00O){}else{
					if(OO00QOQ){
						OO00QOQ=JSON.parse(OO00QOQ);
						if(OO00QOQ.status===200){
							$.token=OO00QOQ.data.result.tk;
							let Q0OO000=OO00QOQ.data.result.algo;
							if(Q0OO000)$.enCryptMethodJD=new Function('return '+Q0OO000)();
						}else{}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(OQQQQ0Q){
				$.logErr(OQQQQ0Q,QO0QQQ0);
			}
			finally{
				QQQQ0OQ();
			}
		});
	});
}
function getUrlData(QO0000Q,OQQQ0OO){
	if(typeof URL!=='undefined'){
		let O0OQ000=new URL(QO0000Q);
		let OQQ00QQ=O0OQ000.searchParams.get(OQQQ0OO);
		return OQQ00QQ?OQQ00QQ:'';
	}else{
		const QQQOQ0Q=QO0000Q.match(/\?.*/)[0].substring(1);
		const O0QQOO0=QQQOQ0Q.split('&');
		for(let O0QQ00Q=0;O0QQ00Q<O0QQOO0.length;O0QQ00Q++){
			const QO0QQOO=O0QQOO0[O0QQ00Q].split('=');
			if(QO0QQOO[0]===OQQQ0OO){
				return O0QQOO0[O0QQ00Q].substr(O0QQOO0[O0QQ00Q].indexOf('=')+1);
			}
		}
		return'';
	}
}
function jxmflfp(){
	let OO00QQ0='0123456789';
	let QO0QQOQ=13;
	let O0O000O='';
	for(;QO0QQOQ--;)O0O000O+=OO00QQ0[(Math.random()*OO00QQ0.length)|0x0];
	return(O0O000O+Date.now()).slice(0,16);
}
var _0xod8='jsjiami.com.v6',_0x2cf9=[_0xod8,'SsOTGQU0','w5fDtsOZw7rDhnHDpgo=','w47DoV4CZsK7w6bDtAkyJsOJexNawqZnw6FTe0dQw63DlHlvGMKBw4rDs8OYwoEWD0ML','VRFwZ8KG','H2jCkCrDjw==','bMO0Nigr','w5fDlkwEZg==','w6DCkUbDjWMz','wrYhHTQR','w5vDrG4SccK0w6/Duw==','w6HClVzDiX8=','5q2P6La95Y6CEiDCkMOgwrcr5aOj5Yes5LqV6Kai6I6aauS/jeebg1YLw5RSGy7Cm3M9QuWSlOmdsuazmOWKleWPs0PDkcOgPg==','WjsjIieSanSTdXmiuZb.EncDom.v6=='];
(function(O0O000Q,O0O0OO0,Q0QQOQQ){
	var O0OQQQ0=function(QQQO0OO,O0QQOOO,QQQO0OQ,Q0O0QOO,QO0OOQ0){
		O0QQOOO=(O0QQOOO>>0x8),QO0OOQ0='po';
		var O0O0QQO='shift',O0O0QQQ='push';
		if(O0QQOOO<QQQO0OO){
			while(--QQQO0OO){
				Q0O0QOO=O0O000Q[O0O0QQO]();
				if(O0QQOOO===QQQO0OO){
					O0QQOOO=Q0O0QOO;
					QQQO0OQ=O0O000Q[QO0OOQ0+'p']();
				}else if(O0QQOOO&&QQQO0OQ.replace(/[WIeSnSTdXuZbEnD=]/g,'')===O0QQOOO){
					O0O000Q[O0O0QQQ](Q0O0QOO);
				}
			}
			O0O000Q[O0O0QQQ](O0O000Q[O0O0QQO]());
		}
		return 580532;
	};
	return O0OQQQ0(++O0O0OO0,Q0QQOQQ)>>O0O0OO0^Q0QQOQQ;
}(_0x2cf9,110,28160));
var _0x5108=function(O0O0000,Q0QQ00O){
	O0O0000=~~'0x'.concat(O0O0000);
	var OO0000O=_0x2cf9[O0O0000];
	if(_0x5108.xFLNEr===undefined){
		(function(){
			var QO00OQO=(typeof window!=='undefined')?window:(typeof process==='object')&&typeof require==='function'&&typeof global==='object'?global:this;
			var Q0QOQOQ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			QO00OQO.atob||(QO00OQO.atob=function(O0Q0QQO){
				var Q0QOQOO=String(O0Q0QQO).replace(/=+$/,'');
				for(var O0Q0QQQ=0,O0Q0000,QO00OQQ,O0QOOQQ=0,OOQOQOQ='';QO00OQQ=Q0QOQOO.charAt(O0QOOQQ++);~QO00OQQ&&(O0Q0000=(O0Q0QQQ%4)?(O0Q0000*64)+QO00OQQ:QO00OQQ,O0Q0QQQ++%4)?OOQOQOQ+=String.fromCharCode(0xff&O0Q0000>>-2*O0Q0QQQ&0x6):0){
					QO00OQQ=Q0QOQOQ.indexOf(QO00OQQ);
				}
				return OOQOQOQ;
			});
		}());
		var Q0Q0OQQ=function(O0QQOQO,Q0QQ00O){
			var O0OOOQ0=[],OQQ00Q0=0,OQ0OQ00,O0QQOQQ='',O0QOOQ0='';
			O0QQOQO=atob(O0QQOQO);
			for(var O0QQQO0=0,OQ0OQ0O=O0QQOQO.length;O0QQQO0<OQ0OQ0O;O0QQQO0++){
				O0QOOQ0+=('%'+('00'+O0QQOQO.charCodeAt(O0QQQO0).toString(16)).slice(-2));
			}
			O0QQOQO=decodeURIComponent(O0QOOQ0);
			for(var OQ0O0Q0=0;OQ0O0Q0<256;OQ0O0Q0++){
				O0OOOQ0[OQ0O0Q0]=OQ0O0Q0;
			}
			for(OQ0O0Q0=0;OQ0O0Q0<256;OQ0O0Q0++){
				OQQ00Q0=(OQQ00Q0+O0OOOQ0[OQ0O0Q0]+Q0QQ00O.charCodeAt(OQ0O0Q0%Q0QQ00O.length))%256;
				OQ0OQ00=O0OOOQ0[OQ0O0Q0];
				O0OOOQ0[OQ0O0Q0]=O0OOOQ0[OQQ00Q0];
				O0OOOQ0[OQQ00Q0]=OQ0OQ00;
			}
			OQ0O0Q0=0;
			OQQ00Q0=0;
			for(var OOQOQQO=0;OOQOQQO<O0QQOQO.length;OOQOQQO++){
				OQ0O0Q0=(OQ0O0Q0+1%256);
				OQQ00Q0=(OQQ00Q0+O0OOOQ0[OQ0O0Q0]%256);
				OQ0OQ00=O0OOOQ0[OQ0O0Q0];
				O0OOOQ0[OQ0O0Q0]=O0OOOQ0[OQQ00Q0];
				O0OOOQ0[OQQ00Q0]=OQ0OQ00;
				O0QQOQQ+=String.fromCharCode(O0QQOQO.charCodeAt(OOQOQQO)^O0OOOQ0[O0OOOQ0[OQ0O0Q0]+O0OOOQ0[OQQ00Q0]%256]);
			}
			return O0QQOQQ;
		};
		_0x5108.NgRmMn=Q0Q0OQQ;
		_0x5108.CiKmfm={};
		_0x5108.xFLNEr=true;
	}
	var QO0Q00O=_0x5108.CiKmfm[O0O0000];
	if(QO0Q00O===undefined){
		if(_0x5108.GhDaFS===undefined){
			_0x5108.GhDaFS=true;
		}
		OO0000O=_0x5108.NgRmMn(OO0000O,Q0QQ00O);
		_0x5108.CiKmfm[O0O0000]=OO0000O;
	}else{
		OO0000O=QO0Q00O;
	}
	return OO0000O;
};
function getJxToken(){
	var OQQO0Q0={'AShns':_0x5108('0','U*Pv'),'ehytr':function(QO00OOO,Q000OQO){
			return QO00OOO<Q000OQO;
		},'GoCYd':function(OQ0OO0Q,OQ0OO0O){
			return OQ0OO0Q(OQ0OO0O);
		},'xUqbe':function(OQ00Q0Q,QQ0QQ0O){
			return OQ00Q0Q*QQ0QQ0O;
		}};
	function OQ0Q0OO(QQ00O00){
		let OOQQQO0=OQQO0Q0[_0x5108('1','cqej')];
		let OOQOOQ0='';
		for(let Q00QOQ0=0;OQQO0Q0[_0x5108('2','1#C#')](Q00QOQ0,QQ00O00);Q00QOQ0++){
			OOQOOQ0+=OOQQQO0[OQQO0Q0[_0x5108('3','Hq%O')](parseInt,OQQO0Q0[_0x5108('4','U*Pv')](Math.random(),OOQQQO0[_0x5108('5','8QnT')]))];
		}
		return OOQOOQ0;
	}
	return new Promise(OO0QOQO=>{
		let OQQO0O0=OQQO0Q0[_0x5108('6','x)1A')](OQ0Q0OO,40);
		let QOQOQQO=(+new Date())[_0x5108('7','U*Pv')]();
		if(!cookie[_0x5108('8','8QnT')](/pt_pin=([^; ]+)(?=;?)/)){
			console.log(_0x5108('9','Hq%O'));
			OQQO0Q0.GoCYd(OO0QOQO,null);
		}
		let QOQO000=cookie[_0x5108('a','8#od')](/pt_pin=([^; ]+)(?=;?)/)[1];
		let QQ0Q0QO=$.md5((''+decodeURIComponent(QOQO000))+QOQOQQO+OQQO0O0+'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')[_0x5108('b',']OsH')]();
		OQQO0Q0.GoCYd(OO0QOQO,{'timestamp':QOQOQQO,'phoneid':OQQO0O0,'farm_jstoken':QQ0Q0QO});
	});
};
_0xod8='jsjiami.com.v6';
!function(OOQ0QQ0){
	'use strict';
	function OQQ0OQQ(OOQ0QQ0,OQQ0OQQ){
		var QO0Q0OO=(0xffff&OOQ0QQ0+0xffff&OQQ0OQQ);
		return ((OOQ0QQ0>>0x10+OQQ0OQQ>>0x10)+(QO0Q0OO>>0x10)<<0x10)|(0xffff&QO0Q0OO);
	}
	function O0QQ0QQ(OOQ0QQ0,OQQ0OQQ){
		return OOQ0QQ0<<OQQ0OQQ|OOQ0QQ0>>>0x20-OQQ0OQQ;
	}
	function OO000O0(OOQ0QQ0,OO000O0,OQQQQQO,Q0OOQ0O,O0Q0O00,Q0OO0Q0){
		return OQQ0OQQ(O0QQ0QQ(OQQ0OQQ(OQQ0OQQ(OO000O0,OOQ0QQ0),OQQ0OQQ(Q0OOQ0O,Q0OO0Q0)),O0Q0O00),OQQQQQO);
	}
	function OQQQQQQ(OOQ0QQ0,OQQ0OQQ,O0QQ0QQ,OQQQQQQ,QQQOQQQ,QQQO000,O0OQQ0O){
		return OO000O0((OQQ0OQQ&O0QQ0QQ)|(~OQQ0OQQ&OQQQQQQ),OOQ0QQ0,OQQ0OQQ,QQQOQQQ,QQQO000,O0OQQ0O);
	}
	function QQQOQQO(OOQ0QQ0,OQQ0OQQ,O0QQ0QQ,OQQQQQQ,QQQOQQO,OQQ0OOQ,QO0OO0Q){
		return OO000O0((OQQ0OQQ&OQQQQQQ)|(O0QQ0QQ&~OQQQQQQ),OOQ0QQ0,OQQ0OQQ,QQQOQQO,OQQ0OOQ,QO0OO0Q);
	}
	function QO0Q0O0(OOQ0QQ0,OQQ0OQQ,O0QQ0QQ,OQQQQQQ,QQQOQQO,QO0Q0O0,Q0OO0OQ){
		return OO000O0((OQQ0OQQ^O0QQ0QQ)^OQQQQQQ,OOQ0QQ0,OQQ0OQQ,QQQOQQO,QO0Q0O0,Q0OO0OQ);
	}
	function Q0QQO0Q(OOQ0QQ0,OQQ0OQQ,O0QQ0QQ,OQQQQQQ,QQQOQQO,QO0Q0O0,Q0QQO0Q){
		return OO000O0(O0QQ0QQ^OQQ0OQQ|~OQQQQQQ,OOQ0QQ0,OQQ0OQQ,QQQOQQO,QO0Q0O0,Q0QQO0Q);
	}
	function OQOOQOQ(OOQ0QQ0,O0QQ0QQ){
		OOQ0QQ0[O0QQ0QQ>>0x5]|=(0x80<<O0QQ0QQ%32),OOQ0QQ0[14+((O0QQ0QQ+64)>>>0x9<<0x4)]=O0QQ0QQ;
		var OO000O0,OQOOQOQ,O0OQQ00,O0OQ0OQ,O0OQ0OO,OQQ0OOO=1732584193,OQ0OQO0=-271733879,Q0O00O0=-1732584194,QO0OO00=271733878;
		for(OO000O0=0;OO000O0<OOQ0QQ0.length;OO000O0+=16)OQOOQOQ=OQQ0OOO,O0OQQ00=OQ0OQO0,O0OQ0OQ=Q0O00O0,O0OQ0OO=QO0OO00,OQ0OQO0=Q0QQO0Q(OQ0OQO0=Q0QQO0Q(OQ0OQO0=Q0QQO0Q(OQ0OQO0=Q0QQO0Q(OQ0OQO0=QO0Q0O0(OQ0OQO0=QO0Q0O0(OQ0OQO0=QO0Q0O0(OQ0OQO0=QO0Q0O0(OQ0OQO0=QQQOQQO(OQ0OQO0=QQQOQQO(OQ0OQO0=QQQOQQO(OQ0OQO0=QQQOQQO(OQ0OQO0=OQQQQQQ(OQ0OQO0=OQQQQQQ(OQ0OQO0=OQQQQQQ(OQ0OQO0=OQQQQQQ(OQ0OQO0,Q0O00O0=OQQQQQQ(Q0O00O0,QO0OO00=OQQQQQQ(QO0OO00,OQQ0OOO=OQQQQQQ(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0],7,-680876936),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+1],12,-389564586),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+2],17,606105819),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+3],22,-1044525330),Q0O00O0=OQQQQQQ(Q0O00O0,QO0OO00=OQQQQQQ(QO0OO00,OQQ0OOO=OQQQQQQ(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+4],7,-176418897),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+5],12,1200080426),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+6],17,-1473231341),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+7],22,-45705983),Q0O00O0=OQQQQQQ(Q0O00O0,QO0OO00=OQQQQQQ(QO0OO00,OQQ0OOO=OQQQQQQ(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+8],7,1770035416),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+9],12,-1958414417),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+10],17,-42063),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+11],22,-1990404162),Q0O00O0=OQQQQQQ(Q0O00O0,QO0OO00=OQQQQQQ(QO0OO00,OQQ0OOO=OQQQQQQ(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+12],7,1804603682),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+13],12,-40341101),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+14],17,-1502002290),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+15],22,1236535329),Q0O00O0=QQQOQQO(Q0O00O0,QO0OO00=QQQOQQO(QO0OO00,OQQ0OOO=QQQOQQO(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+1],5,-165796510),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+6],9,-1069501632),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+11],14,643717713),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0],20,-373897302),Q0O00O0=QQQOQQO(Q0O00O0,QO0OO00=QQQOQQO(QO0OO00,OQQ0OOO=QQQOQQO(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+5],5,-701558691),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+10],9,38016083),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+15],14,-660478335),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+4],20,-405537848),Q0O00O0=QQQOQQO(Q0O00O0,QO0OO00=QQQOQQO(QO0OO00,OQQ0OOO=QQQOQQO(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+9],5,568446438),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+14],9,-1019803690),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+3],14,-187363961),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+8],20,1163531501),Q0O00O0=QQQOQQO(Q0O00O0,QO0OO00=QQQOQQO(QO0OO00,OQQ0OOO=QQQOQQO(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+13],5,-1444681467),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+2],9,-51403784),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+7],14,1735328473),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+12],20,-1926607734),Q0O00O0=QO0Q0O0(Q0O00O0,QO0OO00=QO0Q0O0(QO0OO00,OQQ0OOO=QO0Q0O0(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+5],4,-378558),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+8],11,-2022574463),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+11],16,1839030562),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+14],23,-35309556),Q0O00O0=QO0Q0O0(Q0O00O0,QO0OO00=QO0Q0O0(QO0OO00,OQQ0OOO=QO0Q0O0(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+1],4,-1530992060),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+4],11,1272893353),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+7],16,-155497632),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+10],23,-1094730640),Q0O00O0=QO0Q0O0(Q0O00O0,QO0OO00=QO0Q0O0(QO0OO00,OQQ0OOO=QO0Q0O0(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+13],4,681279174),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0],11,-358537222),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+3],16,-722521979),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+6],23,76029189),Q0O00O0=QO0Q0O0(Q0O00O0,QO0OO00=QO0Q0O0(QO0OO00,OQQ0OOO=QO0Q0O0(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+9],4,-640364487),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+12],11,-421815835),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+15],16,530742520),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+2],23,-995338651),Q0O00O0=Q0QQO0Q(Q0O00O0,QO0OO00=Q0QQO0Q(QO0OO00,OQQ0OOO=Q0QQO0Q(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0],6,-198630844),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+7],10,1126891415),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+14],15,-1416354905),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+5],21,-57434055),Q0O00O0=Q0QQO0Q(Q0O00O0,QO0OO00=Q0QQO0Q(QO0OO00,OQQ0OOO=Q0QQO0Q(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+12],6,1700485571),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+3],10,-1894986606),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+10],15,-1051523),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+1],21,-2054922799),Q0O00O0=Q0QQO0Q(Q0O00O0,QO0OO00=Q0QQO0Q(QO0OO00,OQQ0OOO=Q0QQO0Q(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+8],6,1873313359),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+15],10,-30611744),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+6],15,-1560198380),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+13],21,1309151649),Q0O00O0=Q0QQO0Q(Q0O00O0,QO0OO00=Q0QQO0Q(QO0OO00,OQQ0OOO=Q0QQO0Q(OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00,OOQ0QQ0[OO000O0+4],6,-145523070),OQ0OQO0,Q0O00O0,OOQ0QQ0[OO000O0+11],10,-1120210379),OQQ0OOO,OQ0OQO0,OOQ0QQ0[OO000O0+2],15,718787259),QO0OO00,OQQ0OOO,OOQ0QQ0[OO000O0+9],21,-343485551),OQQ0OOO=OQQ0OQQ(OQQ0OOO,OQOOQOQ),OQ0OQO0=OQQ0OQQ(OQ0OQO0,O0OQQ00),Q0O00O0=OQQ0OQQ(Q0O00O0,O0OQ0OQ),QO0OO00=OQQ0OQQ(QO0OO00,O0OQ0OO);
		return[OQQ0OOO,OQ0OQO0,Q0O00O0,QO0OO00];
	}
	function OO00Q0O(OOQ0QQ0){
		var OQQ0OQQ,O0QQ0QQ='',OO000O0=32*OOQ0QQ0.length;
		for(OQQ0OQQ=0;OQQ0OQQ<OO000O0;OQQ0OQQ+=8)O0QQ0QQ+=String.fromCharCode(OOQ0QQ0[OQQ0OQQ>>0x5]>>>OQQ0OQQ%0x20&0xff);
		return O0QQ0QQ;
	}
	function OQQQQOO(OOQ0QQ0){
		var OQQ0OQQ,O0QQ0QQ=[];
		for(O0QQ0QQ[(OOQ0QQ0.length>>0x2)-1]=void 0,OQQ0OQQ=0;OQQ0OQQ<O0QQ0QQ.length;OQQ0OQQ+=1)O0QQ0QQ[OQQ0OQQ]=0;
		var OO000O0=8*OOQ0QQ0.length;
		for(OQQ0OQQ=0;OQQ0OQQ<OO000O0;OQQ0OQQ+=8)O0QQ0QQ[OQQ0OQQ>>0x5]|=(0xff&OOQ0QQ0.charCodeAt(OQQ0OQQ/8)<<OQQ0OQQ%32);
		return O0QQ0QQ;
	}
	function O0QQO00(OOQ0QQ0){
		return OO00Q0O(OQOOQOQ(OQQQQOO(OOQ0QQ0),8*OOQ0QQ0.length));
	}
	function OQQ0QQQ(OOQ0QQ0,OQQ0OQQ){
		var O0QQ0QQ,OO000O0,OQQQQQQ=OQQQQOO(OOQ0QQ0),QQQOQQO=[],QO0Q0O0=[];
		for(QQQOQQO[15]=QO0Q0O0[15]=void 0,(OQQQQQQ.length>16)&&(OQQQQQQ=OQOOQOQ(OQQQQQQ,8*OOQ0QQ0.length)),O0QQ0QQ=0;O0QQ0QQ<16;O0QQ0QQ+=1)QQQOQQO[O0QQ0QQ]=(0x36363636^OQQQQQQ[O0QQ0QQ]),QO0Q0O0[O0QQ0QQ]=(0x5c5c5c5c^OQQQQQQ[O0QQ0QQ]);
		return OO000O0=OQOOQOQ(QQQOQQO.concat(OQQQQOO(OQQ0OQQ)),512+8*OQQ0OQQ.length),OO00Q0O(OQOOQOQ(QO0Q0O0.concat(OO000O0),640));
	}
	function OQQQQO0(OOQ0QQ0){
		var OQQ0OQQ,O0QQ0QQ,OO000O0='';
		for(O0QQ0QQ=0;O0QQ0QQ<OOQ0QQ0.length;O0QQ0QQ+=1)OQQ0OQQ=OOQ0QQ0.charCodeAt(O0QQ0QQ),OO000O0+=('0123456789abcdef'.charAt((OQQ0OQQ>>>0x4)&0xf)+'0123456789abcdef'.charAt(0xf&OQQ0OQQ));
		return OO000O0;
	}
	function OO0OO0Q(OOQ0QQ0){
		return unescape(encodeURIComponent(OOQ0QQ0));
	}
	function OQQ0QO0(OOQ0QQ0){
		return O0QQO00(OO0OO0Q(OOQ0QQ0));
	}
	function OOQOQ0Q(OOQ0QQ0){
		return OQQQQO0(OQQ0QO0(OOQ0QQ0));
	}
	function OQ0O000(OOQ0QQ0,OQQ0OQQ){
		return OQQ0QQQ(OO0OO0Q(OOQ0QQ0),OO0OO0Q(OQQ0OQQ));
	}
	function OQQO00Q(OOQ0QQ0,OQQ0OQQ){
		return OQQQQO0(OQ0O000(OOQ0QQ0,OQQ0OQQ));
	}
	function OQ0OOO0(OOQ0QQ0,OQQ0OQQ,O0QQ0QQ){
		return OQQ0OQQ?O0QQ0QQ?OQ0O000(OQQ0OQQ,OOQ0QQ0):OQQO00Q(OQQ0OQQ,OOQ0QQ0):O0QQ0QQ?OQQ0QO0(OOQ0QQ0):OOQOQ0Q(OOQ0QQ0);
	}
	$.md5=OQ0OOO0;
}(this);

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}