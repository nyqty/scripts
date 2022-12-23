const got=require('got');
const JD_SIGN_API=process.env['JD_SIGN_API']||'http://api.nolanstore.top/sign';
const JD_SIGN_KRAPI=process.env['JD_SIGN_KRAPI']||'';
async function getSign(_0x9f79c2,_0x604f3a){
	let _0x244309='';
	if(JD_SIGN_KRAPI){
		let _0x59ddbf='body='+JSON.stringify(_0x604f3a)+'&functionId='+_0x9f79c2;
		_0x244309=got.post(JD_SIGN_KRAPI,{'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},'body':_0x59ddbf})['json']()['catch'](_0x1d363c=>{
			console.log(_0x1d363c.message);
			console.error('🚫 getSign API请求失败');
		});
	}else{
		console.log('🔁 当前使用内置Nolan Sign服务\n');
		let _0x522985={'fn':_0x9f79c2,'body':JSON.stringify(_0x604f3a)};
		_0x244309=got.post(JD_SIGN_API,{'headers':{'Content-Type':'application/json'},'body':JSON.stringify(_0x522985)})['json']()['catch'](_0x356fe2=>{
			console.log(_0x356fe2.message);
			console.error('🚫 getSign API请求失败');
		});
	}
	return _0x244309;
}
module.exports=getSign;