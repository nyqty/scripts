const axios = require('axios');
const CryptoJS = require('crypto-js')
const {format} = require("date-fns");
let tk = '', genKey = null

function zjdInit(){
	return new Promise(_0x3e8e66=>{
		axios.post('https://cactus.jd.com/request_algo?g_ty=ajax',
		'{"version":"3.0","fp":"5751706390487846","appId":"b342e","timestamp":'+Date.now()+',"platform":"web","expandParams":""}',
		{
			'headers':{'Content-Type': 'application/json', host: 'cactus.jd.com', Referer: 'https://cactus.jd.com'},
			'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac'
		}
		)["then"](_0x20c5db=>{
			tk=_0x20c5db['data']['data']["result"]['tk'];
			genKey=new Function('return '+_0x20c5db.data["data"]["result"]["algo"])();
			_0x3e8e66()
		});
	});
};
function zjdH5st(data){
	let _0x5b05fe=[{'key':'appid','value':data.appid},{'key':'body','value':data.body},{'key':'functionId','value':data.functionId}],_0x593076='';
	_0x5b05fe.forEach(({key,value})=>{
		_0x593076+=key+':'+value+'&';
	});
	_0x593076=_0x593076.slice(0,-1);
	let t=Date.now();
	let _0x5c2223=format(t,'yyyyMMddhhmmssSSS');
	let _0x1ea52b=genKey(tk,'5751706390487846',_0x5c2223.toString(),'b342e',CryptoJS)['toString'](CryptoJS.enc['Hex']);
	const _0x55d05d=CryptoJS.HmacSHA256(_0x593076,_0x1ea52b)['toString']();
	return [_0x5c2223.toString(),5751706390487846,'b342e',tk,_0x55d05d,'3.0',t.toString()].join(';');
};

module.exports = {
  zjdInit,
  zjdH5st
}