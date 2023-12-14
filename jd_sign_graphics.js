/* 
cron 10 8 * * * jd_sign_graphics.js
只支持nodejs环境
需要安装依赖 
npm i png-js 或者 npm i png-js -S

*/

const Faker = require('./sign_graphics_validate.js')
const Env=require('./utils/Env.js');
const $ = new Env('京东签到翻牌');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [], cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let message = '', subTitle = '', beanNum = 0;
let fp = ''
let eid = ''
let UA = ""
let signFlag = false
let successNum = 0
let errorNum = 0
let JD_API_HOST = 'https://sendbeans.jd.com'
const turnTableId = [
   // { "name": "翻牌", "id": 1356, "shopid": 1000088787, "url": "https://sendbeans.jd.com/jump/index/" },
   { "name": "翻牌", "id": 1082, "shopid": 1000004123, "url": "https://sendbeans.jd.com/jump/index/" },
   // { "name": "翻牌", "id": 1440, "shopid": 1000005670, "url": "https://sendbeans.jd.com/jump/index/" },
]

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.nickName = '';
      console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
      beanNum = 0
      successNum = 0
      errorNum = 0
      subTitle = '';
      $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      getUA()
      await signRun()
			await $.wait(8000)
      const UTC8 = new Date().getTime() + new Date().getTimezoneOffset() * 60000 + 28800000;
      $.beanSignTime = new Date(UTC8).toLocaleString('zh', { hour12: false });
      let msg = `【京东账号${$.index}】${$.nickName || $.UserName}\n【签到时间】:  ${$.beanSignTime}\n【签到概览】:  成功${successNum}个, 失败${errorNum}个\n${beanNum > 0 && "【签到奖励】:  " + beanNum + "京豆" || ""}\n`
      message += msg + '\n'
      $.msg($.name, msg);
    }
  }
  // await showMsg();
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function showMsg() {
  $.msg($.name, `【签到数量】:  ${turnTableId.length}个\n` + subTitle + message);
  if ($.isNode() && message) await notify.sendNotify(`${$.name}`, `【签到数量】:  ${turnTableId.length}个\n` + subTitle + message);
}
async function signRun() {
  for (let i in turnTableId) {
    signFlag = false
    await Login(i)
    if (signFlag) {
      successNum++;
    } else {
      errorNum++;
    }
    await $.wait(1000)
  }
}

function Sign(i) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_API_HOST}/api/turncard/chat/sign?turnTableId=${turnTableId[i].id}&shopId=${turnTableId[i].shopid}&fp=${fp}&eid=${eid}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        'Cookie': cookie,
        'Host': `sendbeans.jd.com`,
        "Referer": "https://sendbeans.jd.com/jump/index/",
        "User-Agent": $.UA,
      }
    }
    // console.log(options);
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${turnTableId[i].name} 签到: API查询请求失败 ‼️‼️`)
          throw new Error(err);
        } else {
          if (data) {
            // console.log(data)
            data = JSON.parse(data);
            if (data.success && data.data) {
              data = data.data
              if (Number(data.jdBeanQuantity) > 0) beanNum += Number(data.jdBeanQuantity)
              signFlag = true;
              console.log(`${turnTableId[i].name} 签到成功:获得 ${Number(data.jdBeanQuantity)}京豆`)
            } else {
              if (data.errorMessage) {
                if (data.errorMessage.indexOf('已签到') > -1 || data.errorMessage.indexOf('今天已经签到') > -1) {
                  signFlag = true;
                }
                console.log(`${turnTableId[i].name} ${data.errorMessage}`)
              } else {
                console.log(`${turnTableId[i].name} ${JSON.stringify(data)}`)
              }
            }
          } else {
            console.log(`京豆api返回数据为空，请检查自身原因`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function Login(i) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_API_HOST}/api/turncard/chat/detail?turnTableId=${turnTableId[i].id}&shopId=${turnTableId[i].shopid}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        'Cookie': cookie,
        'Host': `sendbeans.jd.com`,
        "Referer": "https://sendbeans.jd.com/jump/index/",
        "User-Agent": $.UA,
      }
    }
    // console.log(options);
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${turnTableId[i].name} 登录: API查询请求失败 ‼️‼️`)
          console.log(`${JSON.stringify(err)}`)
        } else {
          if (data) {
            // console.log(data)
            data = JSON.parse(data);
            if (data.success && data.data) {
              data = data.data
              if (!data.hasSign) {
                let arr = await Faker.getBody(UA, turnTableId[i].url)
                fp = arr.fp
                await getEid(arr)
                await Sign(i)
              } else {
                if (data.records && data.records[0]) {
                  for (let i in data.records) {
                    let item = data.records[i]
                    if ((item.hasSign == false && item.index != 1) || i == data.records.length - 1) {
                      if (item.hasSign == false) i = i - 1
                      beanNum += Number(data.records[i].beanQuantity)
                      break;
                    }
                  }
                }
                signFlag = true;
                console.log(`${turnTableId[i].name} 已签到`)
              }
            } else {
              if (data.errorMessage) {
                if (data.errorMessage.indexOf('已签到') > -1 || data.errorMessage.indexOf('今天已经签到') > -1) {
                  signFlag = true;
                }
                console.log(`${turnTableId[i].name} ${data.errorMessage}`)
              } else {
                console.log(`${turnTableId[i].name} ${JSON.stringify(data)}`)
              }
            }
          } else {
            console.log(`京豆api返回数据为空，请检查自身原因`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function getEid(arr) {
  return new Promise(resolve => {
    const options = {
      url: `https://gia.jd.com/fcf.html?a=${arr.a}`,
      body: `d=${arr.d}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": $.UA
      }
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${turnTableId[i].name} 登录: API查询请求失败 ‼️‼️`)
          throw new Error(err);
        } else {
          if (data.indexOf("*_*") > 0) {
            data = data.split("*_*", 2);
            data = JSON.parse(data[1]);
            eid = data.eid
          } else {
            console.log(`京豆api返回数据为空，请检查自身原因`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
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

function getUA() {
  $.UA = `jdapp;iPhone;10.1.0;14.3;${$.UUID};network/wifi;model/iPhone12,1;addressid/4199175193;appBuild/167774;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
}
function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
  return format.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    if (UpperCase) {
      uuid = v.toString(36).toUpperCase();
    } else {
      uuid = v.toString(36)
    }
    return uuid;
  });
}
