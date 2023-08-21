/*


cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#玩一玩成就
1 1 1 1 * jd_wyw.js, tag=玩一玩成就, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('玩一玩成就');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
  cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

$.invitePinTaskList = []

message = ""
!(async () => {
  console.log('\n【活动入口：京东APP搜索-玩一玩 】\n\n【每次运行活动ID均不同，只增加成长值目前没任何收益 】');
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await getUA();
      await getPlayTaskCenter();
      for (const playTaskCenterListElement of $.playTaskCenterList) {
        $.log(`ID：${playTaskCenterListElement.playId} ${playTaskCenterListElement.name}  成就值: ${playTaskCenterListElement.achieve}`)
        await $.wait(parseInt(Math.random() * 1500 + 3000, 10))
        await doPlayAction(playTaskCenterListElement.playId)
        await $.wait(parseInt(Math.random() * 1500 + 3000, 10))
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10))

    }
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//获取活动信息



function getPlayTaskCenter() {
  //await $.wait(20)
  return new Promise(resolve => {
    $.post(taskPostClientActionUrl(`body={"client":"app"}&client=wh5&clientVersion=1.0.0`, `playTaskCenter`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          $.playTaskCenterList = data.data
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function doPlayAction(playId) {
  //await $.wait(20)
  return new Promise(resolve => {
    $.post(taskPostClientActionUrl(`body={"client":"app","playId":"${playId}","type":"1"}&client=wh5&clientVersion=1.0.0`, `playAction`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data) {
            console.log('任务完成，总成长值：' + data?.data?.achieve)
          }
          debugger
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

async function getUA() {
  $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
}

function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}
function taskPostClientActionUrl(body, functionId) {
  return {
    url: `https://api.m.jd.com/client.action?${functionId ? `functionId=${functionId}` : ``}`,
    body: body,
    headers: {
      'User-Agent': $.UA,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'api.m.jd.com',
      'Origin': 'https://api.m.jd.com',
      'Referer': 'https://funearth.m.jd.com/babelDiy/Zeus/3BB1rymVZUo4XmicATEUSDUgHZND/index.html?source=6&lng=113.388032&lat=22.510956&sid=f9dd95649c5d4f0c0d31876c606b6cew&un_area=19_1657_52093_0',
      'Cookie': cookie,
    }
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

