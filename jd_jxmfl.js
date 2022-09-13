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
let launchid;
$.appId=10032;
let UA,UAInfo={};
if(process.env.first){
	first=true;
}
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST='https://api.m.jd.com/client.action';
!(async()=>{
    //https://st.jingxi.com/sns/202205/20/jxmfl/list.html
	console.log('活动入口:https://st.jingxi.com/sns/202205/20/jxmfl/index.html');
	console.log('环境变量添加：export launchid="你的邀请码" ##你的邀请码');
	console.log('环境变量添加：export first="false"');
	console.log('请自行添加环境变量，否则将助力作者，账号低于30的可以禁用');
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	$.CryptoJS=$.isNode()?require('crypto-js'):CryptoJS;
	await requestAlgo();
    launchid = await getAuthorShareCode() || []
    if (process.env.launchid) {
        launchid = process.env.launchid.split('@');
    }
    if (launchid.length == 0 && !first) {
        return
    }
    for(let i=0;i<cookiesArr.length;i++){
		if(cookiesArr[i]){
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
			UA='jdpingou;iPhone;4.13.0;14.4.2;'+randomString(40)+';network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/'+(Math.random*98+1)+';pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
			UAInfo[$.UserName]=UA;
			await TotalBean();
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
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
})().catch(e=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+e+'!','');
}).finally(()=>{
	$.done();
});

async function help_all(){
    for (let i = 0; i < launchid.length; i++) {
        $.signle_launchid = launchid[i]
		await help();
		await $.wait(2000);
	}
}

function getAuthorShareCode() {
    return new Promise(resolve => {
        $.get({
            url: "https://raw.fastgit.org/atyvcn/updateTeam/master/shareCodes/jd/kyd.json",
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        }, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    resolve(JSON.parse(data))
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function test(){
	return new Promise(async resolve=>{
		let options={'url':'https://m.jingxi.com/jxzlmfl/zlmfl_myonline?t=1654591101246&_=1654591101249&sceneval=2&g_login_type=1&callback=jsonpCBKC&g_ty=ls&appCode=msd1188198','headers':{'Referer':'https://st.jingxi.com/sns/202205/20/jxmfl/index.html','Host':'m.jingxi.com','User-Agent':'jdpingou;iPhone;4.8.0;14.3;9714ccbf07209f246277896ef7c041f3bb571ca3;network/wifi;model/iPhone9,2;appBuild/100540;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/22;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148','Cookie':cookie}};
		$.get(options,async(err,resp,data)=>{
			try{
                data = data.match(/(\{[^()]+\}.+)/)[1]
                data = JSON.parse(data)
                // console.debug(data)
                const temp = data.data.onling
                // console.debug(temp)
                for (let i = 0; i < temp.length; i++) {
                    console.debug(temp[i])
                }
			}catch(e){
				$.logErr(e,resp);
			}
			finally{
				resolve();
			}
		});
	});
}

function taskUrl(_0x420dee,_0x50ec66=''){
	let _0x58636f='https://m.jingxi.com/jxzlmfl/'+_0x420dee+'?'+(_0x50ec66?'&'+_0x50ec66:'');
	_0x58636f+='&_stk=launchid%2Ctype';
	_0x58636f+='&_ste=1&h5st='+decrypt(Date.now(),'','',_0x58636f)+'&t=1656051648962&dvcid=bd7c974e572433e7&_='+(Date.now()+2)+'&sceneval=2&g_login_type=1&callback=jsonpCBK'+String.fromCharCode(Math.floor(Math.random()*26)+'A'.charCodeAt(0))+'&g_ty=ls&appCode=msd1188198';
	return{'url':_0x58636f,'headers':{'Host':'m.jingxi.com','Accept':'*/*','Accept-Encoding':'gzip, deflate, br','User-Agent':UA,'Accept-Language':'zh-CN,zh-Hans;q=0.9','Referer':'https://st.jingxi.com/','Cookie':'cid=4;'+cookie}};
}
function randomString(_0x239ff4){
	_0x239ff4=(_0x239ff4||32);
	let _0x445386='0123456789abcdef',_0x59bcd3=_0x445386.length,_0x5e5aab='';
	for(let _0x22ddf8=0;_0x22ddf8<_0x239ff4;_0x22ddf8++)_0x5e5aab+=_0x445386.charAt(Math.floor(Math.random()*_0x59bcd3));
	return _0x5e5aab;
}
function getStk(_0x532b50){
	let _0x127d05=_0x532b50.split('&').map(_0x2f528b=>_0x2f528b.replace(/.*\?/,'').replace(/=.*/,''));
	return encodeURIComponent(_0x127d05.filter(_0x1ec3e5=>_0x1ec3e5).sort().join(','));
}
function help(){
	return new Promise(async _0x3cc97f=>{
		$.get(taskUrl('zlmfl_queryhelp','strPgTimeStamp='+token.timestamp+'&strPhoneID='+token.phoneid+'&strPgUUNum='+token.farm_jstoken+'&launchid='+$.signle_launchid+'&type=1'),async(_0x47d5b0,_0x185047,_0x3b4e68)=>{
			try{
				_0x3b4e68=_0x3b4e68.match(/(\{[^()]+\}.+)/)[1];
				const _0x4c6fb5=JSON.parse(_0x3b4e68);
				if(_0x4c6fb5.errcode==0){
					$.log('\n'+_0x4c6fb5.data.guestinfo.contenttips);
				}else console.log(_0x3b4e68.msg);
			}catch(_0x42529d){
				$.logErr(_0x42529d,_0x185047);
			}
			finally{
				_0x3cc97f();
			}
		});
	});
}
async function taskPostUrl(functionId,body){
	return  {'url':''+JD_API_HOST,'body':'functionId='+functionId+'&body='+escape(JSON.stringify(body))+'&client=wh5&clientVersion=1.0.0&appid=content_ecology&uuid=6898c30638c55142969304c8e2167997fa59eb54&t=1622588448365','headers':{
        'Cookie':cookie,'Host':'api.m.jd.com','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','User-Agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br'
    }};
}


async function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
            headers: {
                Host: "me-api.jd.com",
                Accept: "*/*",
                Connection: "keep-alive",
                Cookie: cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname?data.data.userInfo.baseInfo.nickname:data.data.userInfo.baseInfo.curPin;
                        }
                    } else {
                        console.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}

async function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
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

Date.prototype.Format=function(_0x1a685c){
	var _0x2ba453,_0x43655d=this,_0x1f894f=_0x1a685c,_0x395f45={'M+':(_0x43655d.getMonth()+1),'d+':_0x43655d.getDate(),'D+':_0x43655d.getDate(),'h+':_0x43655d.getHours(),'H+':_0x43655d.getHours(),'m+':_0x43655d.getMinutes(),'s+':_0x43655d.getSeconds(),'w+':_0x43655d.getDay(),'q+':Math.floor(_0x43655d.getMonth()+3/3),'S+':_0x43655d.getMilliseconds()};
	/(y+)/i.test(_0x1f894f)&&(_0x1f894f=_0x1f894f.replace(RegExp.$1,''.concat(_0x43655d.getFullYear()).substr(4-RegExp.$1.length)));
	for(var _0x30e87d in _0x395f45){
		if(new RegExp('('.concat(_0x30e87d,')')).test(_0x1f894f)){
			var _0x3baade,_0x1cc56a=('S+'===_0x30e87d)?'000':'00';
			_0x1f894f=_0x1f894f.replace(RegExp.$1,(1==RegExp.$1.length)?_0x395f45[_0x30e87d]:(''.concat(_0x1cc56a)+_0x395f45[_0x30e87d]).substr(''.concat(_0x395f45[_0x30e87d]).length));
		}
	}
	return _0x1f894f;
};
async function requestAlgo(){
	$.fingerprint=await generateFp();
	const _0x1cd0cf={'url':'https://cactus.jd.com/request_algo?g_ty=ajax','headers':{'Authority':'cactus.jd.com','Pragma':'no-cache','Cache-Control':'no-cache','Accept':'application/json','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','Content-Type':'application/json','Origin':'https://st.jingxi.com','Sec-Fetch-Site':'cross-site','Sec-Fetch-Mode':'cors','Sec-Fetch-Dest':'empty','Referer':'https://st.jingxi.com/','Accept-Language':'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'},'body':JSON.stringify({'version':'1.0','fp':$.fingerprint,'appId':$.appId.toString(),'timestamp':Date.now(),'platform':'web','expandParams':''})};
	return new Promise(async _0x49d93d=>{
		$.post(_0x1cd0cf,(_0x4a9b87,_0x221276,_0x158281)=>{
			try{
				if(_0x4a9b87){}else{
					if(_0x158281){
						_0x158281=JSON.parse(_0x158281);
						if(_0x158281.status===200){
							$.token=_0x158281.data.result.tk;
							let _0x4d6d0d=_0x158281.data.result.algo;
							if(_0x4d6d0d)$.enCryptMethodJD=new Function('return '+_0x4d6d0d)();
						}else{}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x15f5da){
				$.logErr(_0x15f5da,_0x221276);
			}
			finally{
				_0x49d93d();
			}
		});
	});
}
function decrypt(_0x54e04c,_0x3bef63,_0x175f13,_0x176130){
	_0x3bef63=_0x3bef63||(_0x176130?getUrlData(_0x176130,'_stk'):'');
	if(_0x3bef63){
		const _0x2a688f=new Date(_0x54e04c).Format('yyyyMMddhhmmssSSS');
		let _0x6cb71e='';
		if($.fingerprint&&$.token&&$.enCryptMethodJD){
			_0x6cb71e=$.enCryptMethodJD($.token,$.fingerprint.toString(),_0x2a688f.toString(),$.appId.toString(),$.CryptoJS).toString($.CryptoJS.enc.Hex);
		}else{
			const _0x4ba423='5gkjB6SpmC9s';
			$.token='tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc';
			$.fingerprint=5287160221454703;
			const _0x3b5d6e=''+$.token+$.fingerprint+_0x2a688f+$.appId+_0x4ba423;
			_0x6cb71e=$.CryptoJS.SHA512(_0x3b5d6e,$.token).toString($.CryptoJS.enc.Hex);
		}
		let _0x3e2ea7='';
		_0x3bef63.split(',').map((_0x588c7b,_0x283860)=>{
			_0x3e2ea7+=_0x588c7b+':'+getUrlData(_0x176130,_0x588c7b)+((_0x283860===_0x3bef63.split(',').length-1)?'':'&');
		});
		const _0x3fba24=$.CryptoJS.HmacSHA256(_0x3e2ea7,_0x6cb71e.toString()).toString($.CryptoJS.enc.Hex);
		return encodeURIComponent([''.concat(_0x2a688f.toString()),''.concat($.fingerprint.toString()),''.concat($.appId.toString()),''.concat($.token),''.concat(_0x3fba24),''.concat('3.0'),''.concat(_0x54e04c)].join(';'));
	}else{
		return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d';
	}
}
function getUrlData(_0x402708,_0x228930){
	if(typeof URL!=='undefined'){
		let _0x2e62a8=new URL(_0x402708);
		let _0x2d6139=_0x2e62a8.searchParams.get(_0x228930);
		return _0x2d6139?_0x2d6139:'';
	}else{
		const _0x3678be=_0x402708.match(/\?.*/)[0].substring(1);
		const _0x303fd4=_0x3678be.split('&');
		for(let _0x5a2c11=0;_0x5a2c11<_0x303fd4.length;_0x5a2c11++){
			const _0x626921=_0x303fd4[_0x5a2c11].split('=');
			if(_0x626921[0]===_0x228930){
				return _0x303fd4[_0x5a2c11].substr(_0x303fd4[_0x5a2c11].indexOf('=')+1);
			}
		}
		return'';
	}
}
function generateFp(){
	let _0x259545='0123456789';
	let _0x1d29c4=13;
	let _0x49053b='';
	for(;_0x1d29c4--;)_0x49053b+=_0x259545[Math.random()*_0x259545.length|0x0];
	return (_0x49053b+Date.now()).slice(0,16);
}
var _0xod8='jsjiami.com.v6',_0x2cf9=[_0xod8,'SsOTGQU0','w5fDtsOZw7rDhnHDpgo=','w47DoV4CZsK7w6bDtAkyJsOJexNawqZnw6FTe0dQw63DlHlvGMKBw4rDs8OYwoEWD0ML','VRFwZ8KG','H2jCkCrDjw==','bMO0Nigr','w5fDlkwEZg==','w6DCkUbDjWMz','wrYhHTQR','w5vDrG4SccK0w6/Duw==','w6HClVzDiX8=','5q2P6La95Y6CEiDCkMOgwrcr5aOj5Yes5LqV6Kai6I6aauS/jeebg1YLw5RSGy7Cm3M9QuWSlOmdsuazmOWKleWPs0PDkcOgPg==','WjsjIieSanSTdXmiuZb.EncDom.v6=='];
(function(_0x16aa93,_0x5d4099,_0x1a2e82){
	var _0x3a7073=function(_0x16be61,_0x472487,_0xb9ebaf,_0x171b79,_0x53805e){
		_0x472487=_0x472487>>0x8,_0x53805e='po';
		var _0x5b68fa='shift',_0x4d9711='push';
		if(_0x472487<_0x16be61){
			while(--_0x16be61){
				_0x171b79=_0x16aa93[_0x5b68fa]();
				if(_0x472487===_0x16be61){
					_0x472487=_0x171b79;
					_0xb9ebaf=_0x16aa93[_0x53805e+'p']();
				}else if(_0x472487&&_0xb9ebaf.replace(/[WIeSnSTdXuZbEnD=]/g,'')===_0x472487){
					_0x16aa93[_0x4d9711](_0x171b79);
				}
			}
			_0x16aa93[_0x4d9711](_0x16aa93[_0x5b68fa]());
		}
		return 580532;
	};
	return _0x3a7073(++_0x5d4099,_0x1a2e82)>>_0x5d4099^_0x1a2e82;
}(_0x2cf9,110,28160));
var _0x5108=function(_0x3e60be,_0x18a7e0){
	_0x3e60be=~~'0x'.concat(_0x3e60be);
	var _0x1659ea=_0x2cf9[_0x3e60be];
	if(_0x5108.xFLNEr===undefined){
		(function(){
			var _0x1204e8=(typeof window!=='undefined')?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;
			var _0xbcca01='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			_0x1204e8.atob||(_0x1204e8.atob=function(_0x416ab7){
				var _0x6b7790=String(_0x416ab7).replace(/=+$/,'');
				for(var _0xab8113=0,_0x3ef658,_0x4bdea7,_0x6a469b=0,_0x4ab248='';_0x4bdea7=_0x6b7790.charAt(_0x6a469b++);~_0x4bdea7&&(_0x3ef658=(_0xab8113%4)?(_0x3ef658*64+_0x4bdea7):_0x4bdea7,_0xab8113++%4)?_0x4ab248+=String.fromCharCode(0xff&_0x3ef658>>-2*_0xab8113&0x6):0){
					_0x4bdea7=_0xbcca01.indexOf(_0x4bdea7);
				}
				return _0x4ab248;
			});
		}());
		var _0x297d84=function(_0xc9d4b9,_0x18a7e0){
			var _0x1628bd=[],_0xec6d15=0,_0x414523,_0x48d4ab='',_0x472f1f='';
			_0xc9d4b9=atob(_0xc9d4b9);
			for(var _0x39cfcd=0,_0x521afc=_0xc9d4b9.length;_0x39cfcd<_0x521afc;_0x39cfcd++){
				_0x472f1f+='%'+('00'+_0xc9d4b9.charCodeAt(_0x39cfcd).toString(16)).slice(-2);
			}
			_0xc9d4b9=decodeURIComponent(_0x472f1f);
			for(var _0x2e33d8=0;_0x2e33d8<256;_0x2e33d8++){
				_0x1628bd[_0x2e33d8]=_0x2e33d8;
			}
			for(_0x2e33d8=0;_0x2e33d8<256;_0x2e33d8++){
				_0xec6d15=(_0xec6d15+_0x1628bd[_0x2e33d8]+_0x18a7e0.charCodeAt(_0x2e33d8%_0x18a7e0.length)%256);
				_0x414523=_0x1628bd[_0x2e33d8];
				_0x1628bd[_0x2e33d8]=_0x1628bd[_0xec6d15];
				_0x1628bd[_0xec6d15]=_0x414523;
			}
			_0x2e33d8=0;
			_0xec6d15=0;
			for(var _0x71ed92=0;_0x71ed92<_0xc9d4b9.length;_0x71ed92++){
				_0x2e33d8=(_0x2e33d8+1)%256;
				_0xec6d15=(_0xec6d15+_0x1628bd[_0x2e33d8]%256);
				_0x414523=_0x1628bd[_0x2e33d8];
				_0x1628bd[_0x2e33d8]=_0x1628bd[_0xec6d15];
				_0x1628bd[_0xec6d15]=_0x414523;
				_0x48d4ab+=String.fromCharCode(_0xc9d4b9.charCodeAt(_0x71ed92)^_0x1628bd[_0x1628bd[_0x2e33d8]+_0x1628bd[_0xec6d15]%256]);
			}
			return _0x48d4ab;
		};
		_0x5108.NgRmMn=_0x297d84;
		_0x5108.CiKmfm={};
		_0x5108.xFLNEr=true;
	}
	var _0x9bf0e3=_0x5108.CiKmfm[_0x3e60be];
	if(_0x9bf0e3===undefined){
		if(_0x5108.GhDaFS===undefined){
			_0x5108.GhDaFS=true;
		}
		_0x1659ea=_0x5108.NgRmMn(_0x1659ea,_0x18a7e0);
		_0x5108.CiKmfm[_0x3e60be]=_0x1659ea;
	}else{
		_0x1659ea=_0x9bf0e3;
	}
	return _0x1659ea;
};
function getJxToken(){
	var _0x1d8243={'AShns':_0x5108('0','U*Pv'),'ehytr':function(_0x57943c,_0x51d527){
			return _0x57943c<_0x51d527;
		},'GoCYd':function(_0x624676,_0x1bf4e2){
			return _0x624676(_0x1bf4e2);
		},'xUqbe':function(_0x134b1f,_0x19074a){
			return _0x134b1f*_0x19074a;
		}};
	function _0x4de932(_0x2b7753){
		let _0x3d88ba=_0x1d8243[_0x5108('1','cqej')];
		let _0x279b4d='';
		for(let _0x5cacec=0;_0x1d8243[_0x5108('2','1#C#')](_0x5cacec,_0x2b7753);_0x5cacec++){
			_0x279b4d+=_0x3d88ba[_0x1d8243[_0x5108('3','Hq%O')](parseInt,_0x1d8243[_0x5108('4','U*Pv')](Math.random(),_0x3d88ba[_0x5108('5','8QnT')]))];
		}
		return _0x279b4d;
	}
	return new Promise(_0x277788=>{
		let _0x4ca6fe=_0x1d8243[_0x5108('6','x)1A')](_0x4de932,40);
		let _0x462df2=(+new Date())[_0x5108('7','U*Pv')]();
		if(!cookie[_0x5108('8','8QnT')](/pt_pin=([^; ]+)(?=;?)/)){
			console.log(_0x5108('9','Hq%O'));
			_0x1d8243.GoCYd(_0x277788,null);
		}
		let _0x52118c=cookie[_0x5108('a','8#od')](/pt_pin=([^; ]+)(?=;?)/)[1];
		let _0x5b6ced=$.md5((''+decodeURIComponent(_0x52118c)+_0x462df2)+_0x4ca6fe+'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')[_0x5108('b',']OsH')]();
		_0x1d8243.GoCYd(_0x277788,{'timestamp':_0x462df2,'phoneid':_0x4ca6fe,'farm_jstoken':_0x5b6ced});
	});
};
_0xod8='jsjiami.com.v6';

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }