/*
#砍价免费拿
#自定义邀请码环境变量
export actId="" ##你要参加砍价的商品ID
export packetId="" ##你要参加砍价的邀请码
活动地址：https://mfn.jd.com/ 京喜特价
[task_local]
#砍价免费拿
 1 1 1 1 * jd_mfn.js, tag=砍价免费拿, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env('砍价免费拿');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
let actId = ''; //你要参加砍价的商品ID
let packetId = '';//你要参加砍价的邀请码
//c50d6379ad3b4782bfc05940e358ace3
//ac4a4b0b300e4fc6a2fdb88412f51e94-amRfTFBtdnNBVGdyQ0t1
if (process.env.actId) {
  actId = process.env.actId;
}

if (process.env.packetId) {
  packetId = process.env.packetId;
}
if ($.isNode()) {
  console.log('export actId="" ##你要参加砍价的商品ID')
  console.log('export packetId="" ##你要参加砍价的邀请码')
  console.log('活动地址：https://mfn.jd.com/ 京喜特价')
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }

  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      //await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }

      await list()
     
     await $.wait(10000)
     
     await kanjia()
     

    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

function list() {
    return new Promise(async (resolve) => {

                let options = {
    url: `https://api.m.jd.com`,

    body: `functionId=HomeZeroBuy&body={"pageNum":1,"channel":"speed_app"}&appid=megatron&client=megatron&clientVersion=1.0.0`,
headers: {
"Origin": "https://mfn.jd.com",
"Host": "api.m.jd.com",
      "User-Agent": "jdltapp;iPhone;3.3.6;14.3;75aeceef3046d8ce11d354ff89af9517a2e4aa18;network/wifi;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone9,2;addressid/;hasOCPay/0;appBuild/1060;supportBestPay/0;pv/56.42;apprpd/;ref/JDLTSubMainPageViewController;psq/38;ads/;psn/75aeceef3046d8ce11d354ff89af9517a2e4aa18|99;jdv/0|kong|t_1001003207_1762319_6901310|jingfen|30578707801140d09fcd54e5cd83bbf7|1621510932517|1621511027;adk/;app_device/IOS;pap/JA2020_3112531|3.3.6|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Cookie": cookie,
      }
                }
      
        $.post(options, async (err, resp, data) => {
            try {

                    data = JSON.parse(data);
                 
                   
                   if($.index === 1){
                    if(data.code == 0){
console.log("商品："+data.data[0].goodsName+"\n商品ID："+data.data[0].actId)
await listyqm(data.data[0].actId)
console.log("\n商品："+data.data[1].goodsName+"\n商品ID："+data.data[1].actId)
await listyqm(data.data[1].actId)
console.log("\n商品："+data.data[2].goodsName+"\n商品ID："+data.data[2].actId)
await listyqm(data.data[2].actId)
console.log("\n商品："+data.data[3].goodsName+"\n商品ID："+data.data[3].actId)
await listyqm(data.data[3].actId)
console.log("\n商品："+data.data[4].goodsName+"\n商品ID："+data.data[4].actId) 
await listyqm(data.data[4].actId)

                }
			}
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function listyqm(actIda) {
    return new Promise(async (resolve) => {

                let options = {
    url: `https://api.m.jd.com`,

    body: `functionId=initiateBargain&body={"actId":"${actIda}","headPortrait":"","nick":"","channel":"speed_app"}&appid=megatron&client=megatron&clientVersion=1.0.0`,
headers: {
"Origin": "https://mfn.jd.com",
"Host": "api.m.jd.com",
      "User-Agent": "jdltapp;iPhone;3.3.6;14.3;75aeceef3046d8ce11d354ff89af9517a2e4aa18;network/wifi;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone9,2;addressid/;hasOCPay/0;appBuild/1060;supportBestPay/0;pv/56.42;apprpd/;ref/JDLTSubMainPageViewController;psq/38;ads/;psn/75aeceef3046d8ce11d354ff89af9517a2e4aa18|99;jdv/0|kong|t_1001003207_1762319_6901310|jingfen|30578707801140d09fcd54e5cd83bbf7|1621510932517|1621511027;adk/;app_device/IOS;pap/JA2020_3112531|3.3.6|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Cookie": cookie,
      }
                }
      
        $.post(options, async (err, resp, data) => {
            try {

                    data = JSON.parse(data);

                   
                   
                    if(data.code == 0){
                      
                       console.log('\n当前商品邀请码：'+data.data.packetId+"\n当前初始化砍价："+data.data.amount)

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function kanjia() {
    return new Promise(async (resolve) => {

                let options = {
    url: `https://api.m.jd.com`,

    body: `functionId=helpBargain&body={"actId":"${actId}","packetId":"${packetId}","headPortrait":"","nick":"","attent":true,"channel":"speed_app"}&appid=megatron&client=megatron&clientVersion=1.0.0`,
headers: {
"Origin": "https://mfn.jd.com",
"Host": "api.m.jd.com",
      "User-Agent": "jdltapp;iPhone;3.3.6;14.3;75aeceef3046d8ce11d354ff89af9517a2e4aa18;network/wifi;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone9,2;addressid/;hasOCPay/0;appBuild/1060;supportBestPay/0;pv/56.42;apprpd/;ref/JDLTSubMainPageViewController;psq/38;ads/;psn/75aeceef3046d8ce11d354ff89af9517a2e4aa18|99;jdv/0|kong|t_1001003207_1762319_6901310|jingfen|30578707801140d09fcd54e5cd83bbf7|1621510932517|1621511027;adk/;app_device/IOS;pap/JA2020_3112531|3.3.6|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Cookie": cookie,
      }
                }
      
        $.post(options, async (err, resp, data) => {
            try {

                    data = JSON.parse(data);

                   
                   
                    if(data.code == 0){
                      
                       console.log('\n已帮砍：'+data.msg)

                }else
                console.log('\n已帮砍：'+data.msg)
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}




















async function taskPostUrl(functionId,body) {
  return {
    url: `${JD_API_HOST}`,
    body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0&appid=content_ecology&uuid=6898c30638c55142969304c8e2167997fa59eb54&t=1622588448365`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}


async function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data["retcode"] === 13) {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data["retcode"] === 0) {
              $.nickName = (data["base"] && data["base"].nickname) || $.UserName;
            } else {
              $.nickName = $.UserName;
            }
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
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