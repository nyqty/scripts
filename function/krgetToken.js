const got=require('got');
const Cache=require('./cache/index.js');
let cacheDefaultTTL=15*60*1000;
let cache=new Cache(cacheDefaultTTL,__dirname+'/cache/token.json');
const JD_SIGN_API=process.env['JD_SIGN_API']||'http://api.nolanstore.top/sign';
async function getSign(_0x519ee2,_0x3900cf){
	let _0x23208e='';
	let _0x2e559d={'fn':_0x519ee2,'body':JSON.stringify(_0x3900cf)};
	_0x23208e=got.post(JD_SIGN_API,{'headers':{'Content-Type':'application/json'},'body':JSON.stringify(_0x2e559d)})['json']()['catch'](_0x1798f6=>{
		console.log(_0x1798f6);
		console.error('🚫 getSign API请求失败');
	});
	return _0x23208e;
}
function regExecFirst(_0x38ef1c='',_0x37d144){
	let _0xcdfca1=_0x37d144.exec(_0x38ef1c);
	if(_0xcdfca1&&_0xcdfca1.length>0){
		return _0xcdfca1[0]['trim']();
	}
	return'';
}
function getCacheKey(_0x4527d6,_0x4a6694){
	let _0x266d9f=new Date()['getHours']();
	if(_0x266d9f>=0&&_0x266d9f<=3){
		return _0x4527d6;
	}
	return _0x4527d6+'_'+_0x4a6694;
}
async function getToken(_0x19d272,_0x48fdfc){
	let _0x310aba='';
	try{
		let _0x2c22a8=regExecFirst(_0x19d272,/(?<=pt_pin=)([^;]+)/);
		if(_0x2c22a8){
			let _0x17d6b5=getCacheKey(_0x2c22a8,_0x48fdfc);
			_0x310aba=cache.get(_0x17d6b5)||'';
			if(_0x310aba===''){
				let _0x56e215=await getSign('isvObfuscator',{'url':_0x48fdfc,'id':''});
				if(_0x56e215!=''){
					let _0x4b9c4b=await got.post('https://api.m.jd.com/client.action?functionId=isvObfuscator',{'headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Cookie':_0x19d272,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':_0x56e215.body})['json']()['catch'](_0x761e70=>{
						if(_0x761e70.response){
							console.log('🚫 getToken API请求失败 ➜ Response code '+(_0x761e70.response['statusCode']||'')+' ('+(_0x761e70.response['statusMessage']||'')+')');
						}else{
							console.log('🚫 getToken API请求失败\n'+(_0x761e70.message||'')+'\n');
						}
					});
					if(_0x4b9c4b){
						if(_0x4b9c4b.code==='0'){
							_0x310aba=_0x4b9c4b.token;
							cache.put(_0x17d6b5,_0x310aba,cacheDefaultTTL);
						}else if(_0x4b9c4b.code==='3'&&_0x4b9c4b.errcode===264){
							console.log('🚫 getToken API请求失败 ➜ 账号无效');
						}else{
							console.log('🚫 getToken API接口返回异常 ➜ '+JSON.stringify(_0x4b9c4b));
						}
					}
				}
			}else{
				console.log('已读取本地缓存token\n');
			}
		}
	}catch(_0xe6c2e2){
		console.log(_0xe6c2e2);
		console.log('🚫 getToken API请求失败');
	}
	return _0x310aba;
}
module.exports=getToken;