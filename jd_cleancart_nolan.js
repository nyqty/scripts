/*
清空购物车
更新时间：2022-08-12
因其他脚本会加入商品到购物车，故此脚本用来清空购物车
包括预售
需要算法支持
默认：不执行 如需要请添加环境变量
JD_CART_REMOVE="true"

——————————————
1.@&@ 前面加数字 指定账号pin
如果有中文请填写中文
2.|-| 账号之间隔开
3.英文大小写请填清楚
4.优先匹配账号再匹配*
5.定义不清空的[商品]名称支持模糊匹配
6.pin@&@ 👉 指定账号(后面添加商品 前面账号[pin] *表示所有账号
7.|-| 👉 账号之间隔开
——————————————

商品名称规则,默认所有账号全清空
——————gua_cleancart_products————————
pin2@&@商品1,商品2👉该pin这几个商品名不清空
pin5@&@👉该pin全清
pin3@&@不清空👉该pin不清空
*@&@不清空👉所有账号不请空
*@&@👉所有账号清空

优先匹配账号再匹配*
|-| 👉 账号之间隔开
有填帐号pin则*不适配
——————————————
如果有不清空的一定要加上"*@&@不清空"
防止没指定的账号购物车全清空

cron:8 8 8 8 *
============Quantumultx===============
[task_local]
#清空购物车-Sign版
8 8 8 8 * jd_cleancart_nolan.js, tag=清空购物车-Sign版, enabled=true

*/
let jdSignUrl = 'https://api.nolanstore.cc/sign'
let cleancartRun = 'false'
let cleancartProducts = ''
const Env=require('./utils/Env.js');
const $ = new Env('清空购物车-Sign版');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

message = ''

cleancartRun = $.isNode() ? (process.env.JD_CART_REMOVE ? process.env.JD_CART_REMOVE : `${cleancartRun}`) : ($.getdata('JD_CART_REMOVE') ? $.getdata('JD_CART_REMOVE') : `${cleancartRun}`);

cleancartProducts = $.isNode() ? (process.env.gua_cleancart_products ? process.env.gua_cleancart_products : '*@&@') : ($.getdata('gua_cleancart_products') ? $.getdata('gua_cleancart_products') : `${cleancartProducts}`);

let productsArr = []
let cleancartProductsAll = []
for (let i of cleancartProducts && cleancartProducts.split('|-|')) {
  productsArr.push(i)
}
for (let i of cleancartProducts && cleancartProducts.split('|-|')) {
  productsArr.push(i)
}
for (let i in productsArr) {
  if(productsArr[i].indexOf('@&@') > -1){
    let arr = productsArr[i].split('@&@')
    cleancartProductsAll[arr[0]] = arr[1].split(',')
  }
}

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if(cleancartRun !== 'true'){
    console.log('脚本停止\n请添加环境变量JD_CART_REMOVE为"true"')
    return
  }
  if(!cleancartProducts){
    console.log('脚本停止\n请添加环境变量[gua_cleancart_products]\n清空商品\n内容规则看脚本文件')
    return
  }

  $.out = false
  console.log('\n==此脚本使用的签名接口来自Nolan提供的公益服务,大伙记得给他点赞==');
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if(cleancartProductsAll[$.UserName]){
        $.cleancartProductsArr = cleancartProductsAll[$.UserName]
      }else if(cleancartProductsAll["*"]){
        $.cleancartProductsArr = cleancartProductsAll["*"]
      }else $.cleancartProductsArr = false
      if($.cleancartProductsArr) console.log($.cleancartProductsArr)
      await run();
      if($.out) break
    }
  }
  if(message){
    $.msg($.name, ``, `${message}`);
    // if ($.isNode()){
      // await notify.sendNotify(`${$.name}`, `${message}`);
    // }
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

async function run(){
  try{
    let msg = ''
    let signBody = `{"homeWishListUserFlag":"1","userType":"0","updateTag":true,"showPlusEntry":"2","hitNewUIStatus":"1","cvhv":"049591","cartuuid":"hjudwgohxzVu96krv/T6Hg==","adid":""}`
    let body = await jdSign('cartClearQuery', signBody)
    if($.out) return
    if(!body){
      console.log('获取不到算法')
      return
    }
    let data = await jdApi('cartClearQuery',body)
    let res = $.toObj(data,data);
    if(typeof res == 'object' && res){
      if(res.resultCode == 0){
        if(!res.clearCartInfo || !res.subTitle){
          msg += `${res.mainTitle}\n`
          console.log(res.mainTitle)
        }else{
          let num = 0
          if(res.subTitle){
            num = res.subTitle.match(/共(\d+)件商品/).length > 0 && res.subTitle.match(/共(\d+)件商品/)[1] || 0
            msg += res.subTitle + "\n"
            console.log(res.subTitle)
          }
          // console.log(`共${num}件商品`)
          if(num != 0){
            let operations = []
            let operNum = 0
            for(let a of res.clearCartInfo || {}){
              // console.log(a.groupName)
              // if(a.groupName.indexOf('7天前加入购物车') > -1){
                for(let s of a.groupDetails || []){
                  if(toSDS(s.name)){
                    // console.log(s.unusable,s.skuUuid,s.name)
                    operNum += s.clearSkus && s.clearSkus.length || 1;
                    operations.push({
                      "itemType": s.itemType+"",
                      "suitType": s.suitType,
                      "skuUuid": s.skuUuid+"",
                      "itemId": s.itemId || s.skuId,
                      "useUuid": typeof s.useUuid !== 'undefined' && s.useUuid || false
                    })
                  }
                }
              // }
            }
            console.log(`准备清空${operNum}件商品`)
            if(operations.length == 0){
              console.log(`清空${operNum}件商品|没有找到要清空的商品`)
              msg += `清空${operNum}件商品|没有找到要清空的商品\n`
            }else{
              let clearBody = `{"homeWishListUserFlag":"1","userType":"0","updateTag":false,"showPlusEntry":"2","hitNewUIStatus":"1","cvhv":"049591","cartuuid":"hjudwgohxzVu96krv/T6Hg==","operations":${$.toStr(operations,operations)},"adid":"","coord_type":"0"}`
              clearBody = await jdSign('cartClearRemove', clearBody)
              if($.out) return
              if(!clearBody){
                console.log('获取不到算法')
              }else{
                let clearData = await jdApi('cartClearRemove',clearBody)
                let clearRes = $.toObj(clearData,clearData);
                if(typeof clearRes == 'object'){
                  if(clearRes.resultCode == 0) {
                    msg += `清空${operNum}件商品|✅\n`
                    console.log(`清空${operNum}件商品|✅\n`)
                  }else if(clearRes.mainTitle){
                    msg += `清空${operNum}件商品|${clearRes.mainTitle}\n`
                    console.log(`清空${operNum}件商品|${clearRes.mainTitle}\n`)
                  }else{
                    msg += `清空${operNum}件商品|❌\n`
                    console.log(`清空${operNum}件商品|❌\n`)
                    console.log(clearData)
                  }
                }else{
                  msg += `清空${operNum}件商品|❌\n`
                  console.log(`清空${operNum}件商品|❌\n`)
                  console.log(clearData)
                }
              }
            }
          }else if(res.mainTitle){
            msg += `${res.mainTitle}\n`
            console.log(res.mainTitle)
          }else{
            msg += `未识别到购物车有商品\n`
            console.log(data)
          }
        }
      }else{
        console.log(data)
      }
    }else{
      console.log(data)
    }
    if(msg){
      message += `【京东账号${$.index}】${$.nickName || $.UserName}\n${msg}\n`
    }
    await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
  }catch(e){
    console.log(e)
  }
}
function toSDS(name){
  let res = true
  if($.cleancartProductsArr === false) return false
  for(let t of $.cleancartProductsArr || []){
    if(t && name.indexOf(t) > -1 || t == '不清空'){
      res = false
      break
    }
  }
  return res
}
function jdApi(functionId, body) {
    if (!functionId || !body) return
    return new Promise(resolve => {
        $.post(taskPostUrl(`/client.action?functionId=${functionId}`, body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.toStr(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    // console.log(data)
                    let res = $.toObj(data, data);
                    if (typeof res == 'object') {
                        if (res.mainTitle) console.log(res.mainTitle)
                        if (res.resultCode == 0) {
                            resolve(res);
                        } else if (res.tips && res.tips.includes("正在努力加载")) {
                            console.log("请求太快，ip被限制了")
                            $.out = true
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve('');
            }
        })
    })
}

function jdSign(fn, body) {
    let sign = '';
    let flag = false;
    try {
        const fs = require('fs');
        if (fs.existsSync('./gua_encryption_sign.js')) {
            const encryptionSign = require('./gua_encryption_sign');
            sign = encryptionSign.getSign(fn, body)
        } else {
            flag = true
        }
        sign = sign.data && sign.data.sign && sign.data.sign || ''
    } catch (e) {
        flag = true
    }
    if (!flag)
        return sign
        if (!jdSignUrl.match(/^https?:\/\//)) {
            console.log('请填写算法url')
            $.out = true
                return ''
        }
    return new Promise((resolve) => {
        let url = {
            url: jdSignUrl,
            body: `{"fn":"${fn}","body":${body}}`,
            followRedirect: false,
            headers: {
                'Accept': '*/*',
                "accept-encoding": "gzip, deflate, br",
                'Content-Type': 'application/json'
            },
            timeout: 30000
        }
        $.post(url, async(err, resp, data) => {
            try {				
                data = JSON.parse(data);
                if (data && data.body) {                    
                    if (data.body)
                        sign = data.body || '';
                    if (sign != '')
                        resolve(sign);
                    else
                        console.log("签名获取失败.");
                } else {
                    console.log("签名获取失败.");
                }
            } catch (e) {
                $.logErr(e, resp);
            }
            finally {
                resolve('')
            }
        })
    })
}


function taskPostUrl(url, body) {
    return {
        url: `https://api.m.jd.com${url}`,
        body: body,
        headers: {
            "Accept": "*/*",
            "Accept-Language": "zh-cn",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            'Cookie': `${cookie}`,
            "Host": "api.m.jd.com",
            "User-Agent": "JD4iPhone/167853 (iPhone; iOS; Scale/2.00)",
        },
        secureProtocol: 'TLSv1_2_method',
    }
}

function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
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


