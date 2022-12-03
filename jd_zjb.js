/*
#极速版赚金币
##入口为极速版 百元生活费 赚金币 邀请好友
##第一次运行可不填写邀请码 运行一次查看自己的邀请码
export InviterPin="9vOskAagcMJ4EOWXPQSS9A%3D%3D" ##你的邀请码
##助力逻辑：填写你的邀请码变量之后会助力你填写的邀请码


[task_local]
#柠檬赚金币
1 0,14 * * * jd_zjb.js, tag=柠檬赚金币, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('极速版赚金币邀请');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
let InviterPin = '';

if ($.isNode() && process.env.InviterPin) {
  InviterPin = process.env.InviterPin;
}
if (InviterPin.length == 0) {
  console.log(`\n您未填写邀请码变量，请去环境变量中填写变量\n`);
}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
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
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      // await info()
      if (InviterPin.length != 0) {
        await help()
      } else {
        await help2("zjb",Math.random() > 0.5 ? "Y1J++FA6+wKsvX+R2C2bDw==" : "v7PbDLcmaFqxlAPSec3fHg==")
      }
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

function info() {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com`,
      body: `functionId=TaskInviteService&body={"method":"inviteTaskHomePage","data":{"channel":"1"}}&appid=market-task-h5&uuid=7303439343432346-7356431353233311&eu=7303439343432341&fv=7356431353233321&_t=1623475839367`,
      headers: {
        "Origin": "https://assignment.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "jdltapp;android;3.5.0;10;7303439343432346-7356431353233323;network/wifi;model/PCAM00;addressid/4228801336;aid/7049442d7e415232;oaid/;osVer/29;appBuild/1587;psn/jkWXTyfQA2PDVmg3OkxOiWnHy7pHXWA |155;psq/12;adk/;ads/;pap/JA2020_3112531|3.5.0|ANDROID 10;osv/10;pv/36.36;jdv/;ref/com.jd.jdlite.lib.mission.allowance.AllowanceFragment;partner/oppo;apprpd/Allowance_Registered;eufv/1;Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045140 Mobile Safari/537.36",
        "Cookie": cookie,
      }
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err);
        } else {
          reust = JSON.parse(data)
        }
        if (reust.code === 0) {
          $.log("\n【邀请码为】" + reust.data.encryptionInviterPin)
        } else
          console.log(data.message)
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function help() {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com`,
      body: `functionId=TaskInviteServiceNew&body=${JSON.stringify({"method":"participateInviteTask","data":{"channel":"1","encryptionInviterPin":encodeURIComponent(InviterPin),"type":1}})}&appid=jx_h5&uuid=&_t=${Date.now()}`,
      headers: {
        "Origin": "https://assignment.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "jdltapp;android;3.5.0;10;7303439343432346-7356431353233323;network/wifi;model/PCAM00;addressid/4228801336;aid/7049442d7e415232;oaid/;osVer/29;appBuild/1587;psn/jkWXTyfQA2PDVmg3OkxOiWnHy7pHXWA |155;psq/12;adk/;ads/;pap/JA2020_3112531|3.5.0|ANDROID 10;osv/10;pv/36.36;jdv/;ref/com.jd.jdlite.lib.mission.allowance.AllowanceFragment;partner/oppo;apprpd/Allowance_Registered;eufv/1;Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045140 Mobile Safari/537.36",
        "Cookie": cookie,
      }
    }
    $.post(options, async (err, resp, data) => {
      try {
        const reust = JSON.parse(data)
        if (reust.code == 0) {
          $.log(`邀请获得金币: ` + reust.data.coinReward * 0.1 + "金币")
        } else
          console.log(reust.message)
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function help2(name,code) {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com`,
      body: `functionId=TaskInviteServiceNew&body=${JSON.stringify({"method":"participateInviteTask","data":{"channel":"1","encryptionInviterPin":encodeURIComponent(code),"type":1}})}&appid=jx_h5&uuid=&_t=${Date.now()}`,
      headers: {
        "Origin": "https://assignment.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "jdltapp;android;3.5.0;10;7303439343432346-7356431353233323;network/wifi;model/PCAM00;addressid/4228801336;aid/7049442d7e415232;oaid/;osVer/29;appBuild/1587;psn/jkWXTyfQA2PDVmg3OkxOiWnHy7pHXWA |155;psq/12;adk/;ads/;pap/JA2020_3112531|3.5.0|ANDROID 10;osv/10;pv/36.36;jdv/;ref/com.jd.jdlite.lib.mission.allowance.AllowanceFragment;partner/oppo;apprpd/Allowance_Registered;eufv/1;Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045140 Mobile Safari/537.36",
        "Cookie": cookie,
      }
    }
    //console.log(options['body'])
    $.post(options, async (err, resp, data) => {
      try {
        const reust = JSON.parse(data)
        if (reust.code === 0) {
          $.log(`邀请获得金币: ` + reust.data.coinReward * 0.1 + "金币")
        } else
          console.log(reust.message)
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
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