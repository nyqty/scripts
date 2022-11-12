const got=require('got');
const JD_SIGN_API=process.env.JD_SIGN_API||'http://api.nolanstore.top/sign';
const JD_SIGN_KRAPI=process.env.JD_SIGN_KRAPI||'';
async function getSign(_0x1c1970,_0xfb6948){
	let _0x22c686='';
	if(JD_SIGN_KRAPI){
		console.log('🔁 当前使用自定义Sign服务\n');
		let _0x243065='body='+JSON.stringify(_0xfb6948)+'&functionId='+_0x1c1970;
		_0x22c686=got.post(JD_SIGN_KRAPI,{'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},'body':_0x243065}).json().catch(_0x2d61d3=>{
			console.log(_0x2d61d3.message);
			console.error('🚫 getSign API请求失败');
		});
	}else{
		console.log('🔁 当前使用内置Nolan Sign服务\n');
		let _0x5506ed={'fn':_0x1c1970,'body':JSON.stringify(_0xfb6948)};
		_0x22c686=got.post(JD_SIGN_API,{'headers':{'Content-Type':'application/json'},'body':JSON.stringify(_0x5506ed)}).json().catch(_0x2f8015=>{
			console.log(_0x2f8015.message);
			console.error('🚫 getSign API请求失败');
		});
	}
	return _0x22c686;
}
module.exports=getSign;