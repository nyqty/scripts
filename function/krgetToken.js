const got=require('got');
const Cache=require('./cache/index.js');
const getSign=require('./krgetSign.js');
let cacheDefaultTTL=15*60*1000;
let cache=new Cache(cacheDefaultTTL,__dirname+'/cache/token.json');
const JD_SIGN_API=process.env.JD_SIGN_API||'http://api.nolanstore.top/sign';
const JD_SIGN_KRAPI=process.env.JD_SIGN_KRAPI||'';
function regExecFirst(_0x5c16ec='',_0xebbe42){
	let _0x3f4e86=_0xebbe42.exec(_0x5c16ec);
	if(_0x3f4e86&&_0x3f4e86.length>0){
		return _0x3f4e86[0].trim();
	}
	return'';
}
function getCacheKey(_0x585a1c,_0x4d9e28){
	let _0xfcda76=new Date().getHours();
	if(_0xfcda76>=0&&_0xfcda76<=3){
		return _0x585a1c;
	}
	return _0x585a1c+'_'+_0x4d9e28;
}
async function getToken(_0x3881ec,_0x3b99b9){
	async function _0x1b741b(_0x306b23){
		return new Promise(_0x1caed0=>setTimeout(_0x1caed0,_0x306b23));
	}
	let _0x232fa4='';
	try{
		let _0x50a99f=regExecFirst(_0x3881ec,/(?<=pt_pin=)([^;]+)/);
		if(_0x50a99f){
			let _0x2c2596=getCacheKey(_0x50a99f,_0x3b99b9);
			_0x232fa4=cache.get(_0x2c2596)||'';
			if(_0x232fa4===''){
				let _0x345805=await getSign('isvObfuscator',{'url':_0x3b99b9,'id':''});
				if(_0x345805!=''){
					if(JD_SIGN_KRAPI){
						body=_0x345805.data.convertUrl;
					}else{
						body=_0x345805.body;
					}
					let _0x252464=await got.post('https://api.m.jd.com/client.action?functionId=isvObfuscator',{'headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Cookie':_0x3881ec,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':body}).json().catch(async _0x2c374f=>{
						if(_0x2c374f.response){
							console.error('🚫 getToken API请求失败 ➜ ('+(_0x2c374f.response.statusCode||'')+' '+(_0x2c374f.response.statusMessage||'')+')\n');
							if(_0x2c374f.response.statusCode==403){
								let _0x405e44=Math.floor(Math.random()*(1000-2000))+30000;
								console.log('🚫 随机等待 '+_0x405e44+' ms');
								await _0x1b741b(_0x405e44);
							}
						}else{
							console.error('🚫 getToken API请求失败\n'+(_0x2c374f.message||'')+'\n');
						}
					});
					if(_0x252464&&_0x252464.code==='0'){
						_0x232fa4=_0x252464.token;
						cache.put(_0x2c2596,_0x232fa4,cacheDefaultTTL);
					}
				}
			}else{
				console.log('已读取本地缓存token\n');
			}
		}
	}catch(_0x26ebc2){
		console.log(_0x26ebc2);
		console.error('🚫 getToken API请求失败');
	}
	return _0x232fa4;
}
module.exports=getToken;