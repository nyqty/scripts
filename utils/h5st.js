/*
by、TY
调用方法：
const H5ST=require('./utils/h5st3.js');

console.log(getbody({
        appId,
        fn,
        "body": body,
        "appid": "jx_h5",
        "clientVersion": "1.0",
        "client": "jx_h5",
        "this.pin": $.UserName,
        "code": 1,
        "flag": $.flag,
        "ua": $.UA
    }));
*/
const CryptoJS = require("crypto-js");
const got = require("got");
const {format} = require("date-fns");

function randomString(num, charset = "abcdef0123456789") {
    let str = '';
    for (let i = 0; i < num; i++) {
        str += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return str;
}

function generateFp400() {
    var charset = "i1uct6d0jh";
    let array1 = [],
        cl = charset.length,
        num = 4;
    for (let i = 0; i < 10; i++) {
        if (Math.random() * cl < num) {
            array1.push(charset[i]);
            if (--num === 0) {
                break;
            }
        }
        cl--;
    }
    let remove = "";
    for (let i = 0,n; i < array1.length; i++) {
        n = Math.random() * (array1.length - i) | 0;
        remove += array1[n];
        array1[n] = array1[array1.length - i - 1];
    }
    let str = charset;
    for (let i = 0; i < remove.length; i++) {
        str.indexOf(remove[i]) !== -1 && (str = str.replace(remove[i], ""));
    }
    charset = str;
    var rd9 = Math.random() * 10 | 0,
        rdstr = randomString(rd9,charset) + remove + randomString(12 - rd9 - 1,charset) + rd9,
        rdstrs = rdstr.split(""),
        arr9 = rdstrs.slice(0, 9),
        new_rdstrs = [];
    for (; arr9.length > 0;) {
        new_rdstrs.push((35 - parseInt(arr9.pop(), 36)).toString(36));
    }
    return new_rdstrs.concat(rdstrs.slice(9)).join("");
}

function jsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
}

function isset(e) {
    return typeof e != "undefined";
}

function aes_cipher(key, message){
    return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
        "iv": CryptoJS.enc.Utf8.parse("0102030405060708"),
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
    }).ciphertext.toString();
}

class H5ST{
    constructor(opt) {
        this.valid=true
        //appId是h5st里面的
        for (let k of ["ua","pin","clientVersion","client","appId","appid"]) {
            if( !isset(k) ){
                console.log(`${k}: 未定义！`)
                this.valid=false
                return false
            }
        }
        Object.assign(this, opt)
        if( !isset(this.version) ) this.version="3.1"
        if(!this.fp) this.fp=this.generateFp()
        this.sua=ua.match(/\(([^)]+)\)/)[1];

    }
    isset(e) {
        return typeof e != "undefined";
    }
    generateFp(){
        if(this.version=="400") return generateFp400();
        var remove = "",
        charset = "0123456789",
        rd9 = Math.floor(Math.random() * 10),
        str,
        num = 12;
        do {
            str = randomString(1,charset);
            remove.indexOf(str) == -1 && (remove += str);
        } while (remove.length < 3);
        for (let ch of remove.slice()) {
            charset = charset.replace(ch, "");
        }
        var str2 = randomString(rd9,charset) + remove + randomString(num - rd9,charset) + rd9;
        if (this.version == "3.1") {
            var str2s = str2.split(""),arr = [];
            for (; str2s.length;) {
                arr.push(9 - parseInt(str2s.pop()));
            }
            str2 = arr.join("");
        }
        return str2;
    }
    async genAlgo(){
        let expandParams ="";
        if(this.version=="3.1" || this.version=="400"){
            let expand={
                "wc":1,"wd":0,"l":"zh-CN","ls":"zh-CN","ml":0,"pl":0,"av":"","ua":this.ua,
                "sua":this.sua,"pp":{"p1": this.pin,"p2": this.pin},"pp1":"","w":393,"h":873,
                "ow":393,"oh":779,"url":"","og":"","pr":2.75,"re":"","random":"","ai":this.appId,"fp":this.fp
            };
            if(this.version=="3.1"){
                delete expand.pp.p2;
                delete expand.random;
                expand.random={"p1": this.pin,"p2": this.pin};
            }else expand.random=randomString(10,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
            expandParams=aes_cipher("wm0!@w-s#ll1flo(", JSON.stringify(expand, null, 2));
        }
        let opt = {
            "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
            "body": JSON.stringify({
                "version": version,
                "fp": this.fp,
                "appId": this.appId,
                "timestamp": new Date().getTime(),
                "platform": "web",
                "expandParams": expandParams
            }),
            "headers": {
                "Host": "cactus.jd.com",
                "Content-Type": "application/json",
                "User-agent": this.ua
            },
            "timeout": 10000
        };
        return new Promise(resolve => {
            got.post(opt).then(
            (resp) => {
                const {body:data } = resp
                try {
                    let res = jsonParse(data);
                    if(typeof res == 'object'){
                        if(res.status == 200){
                            let result = res.data.result
                            this.tk = result.tk
                            this.genKey = new Function('return ' + result.algo)();
                            resolve(res.data.result);
                        }
                    }
                } catch (e) {
                    console.log(e)
                } finally {
                    resolve('');
                }
            },
            (err) => {
                    try {
                    const { message: error, response: resp } = err
                        console.log(`${jsonStringify(error)}`)
                        console.log(`${functionId} API请求失败，请检查网路重试`)
                    } catch (e) {
                        console.log(e)
                    } finally {
                        resolve('')
                    }
                }
            )
        })
    }
    async genH5st(functionId,body,code=true){
        t = new Date().getTime()
        if(!this.tk){
            hq=await this.genAlgo()
            if(!hq) return [false,"获取Algo失败"]
        }
        const time = new Date().getTime(),timeDate = format(time, "yyyyMMddHHmmssSSS");
        body = typeof body !== "string" ? JSON.stringify(body) : body;
        const Data = {
            "appid": this.appid,
            "functionId": functionId,
            "body": body,
            "clientVersion": this.clientVersion,
            "client": this.client
        };
        if(code) Data.t = t;
        //t > "1680278400000" && (Data.functionId = "");
        let str = ["appid", "body", "client", "clientVersion", "functionId", "t"].filter(item => Data[item]).map(
            k => k + ":" + (k == "body" ? CryptoJS.SHA256(Data[k]).toString() : Data[k])
        ).join("&"),
        Key = await this.genKey(this.tk, this.fp,timeDate+(this.version=="400"?"":66), this.appId, CryptoJS).toString();
        if(this.version=="400"){
            _0x1e25a9 = await this.genKey(this.tk, fp, timeDate + "66", appId, CryptoJS).toString(),
            hex = CryptoJS.HmacSHA256(str, Key).toString(CryptoJS.enc.Hex);
        }else{
            hex = CryptoJS.HmacSHA1(str, Key).toString(CryptoJS.enc.Hex);
        }
        let h5sts = [timeDate, this.fp, this.appId, this.tk, hex, this.version, time];
        if(this.version=="3.1"){
            h5sts.push(aes_cipher("wm0!@w_s#ll1flo(",JSON.stringify({"sua": this.sua,"pp": {"p1":this.pin},"fp": this.fp}, null, 2)));
            //__dirname.split(/[\\/]/).pop() !== "function" && (h5sts[0] = h5sts[0] - 1);
        }else if(this.version=="400"){
            h5sts.push(aes_cipher("n1nJA1s[uoyl982f",JSON.stringify({"sua": this.sua,"pp": {"p1":this.pin,"p2":this.pin},"fp": this.fp
                ,"random": randomString(10,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
            }, null, 2)));
        }
        return [false,h5sts.join(";"),time,body];
    }

    getbody(functionId,body,code=true){
        let [ok,h5st,t,body]=this.geth5st(functionId,body,code)
        if(ok) return "functionId=" + fn + "&body=" + encodeURIComponent(body) + (code?"&t=" + t:"") + "&appid=" + appid + "&client=" + client + "&clientVersion=" + clientVersion + "&h5st=" + encodeURIComponent(h5st);
        else return false
    }
}

module.exports = H5ST