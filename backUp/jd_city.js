/*
城城领现金
活动时间：2021-10-20到2021-10-30
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
没填指定助力码默认给作者助力，填了先给你填的助力，剩余助力给作者
自动抽奖 JD_CITY_EXCHANGE="true"
指定助力码 JD_CITY_SHARECODES="xDZ0HmcBlJQUMs_WF5h_mmvv-Ep-xFCOB0aPa1RY" 多个助力码用“@”或者“&”分割
新增可以指定最大大成功次数 举个例子：JD_CITY_SHARECODES="xDZ0HmcBlJQUMs_WF5h_mmvv-Ep-xFCOB0aPa1RY|99" 助力码|最大成功助力次数 同上多个助力码用多个@或者&分割
是否跑任务 JD_CITY_TASK="true"
末尾添加邀请码成功统计,脚本结束后可看日志末尾

如果你填的助力码超过了每个人助力的次数后面的也不会得到助力，作者的也得不到。因为你的优先在前。
=================================Quantumultx=========================
[task_local]
#城城领现金
0 0-23/5 * * * https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_city.js, tag=城城领现金, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

=================================Loon===================================
[Script]
cron "0 0-23/5 * * *" script-path=https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_city.js,tag=城城领现金

===================================Surge================================
城城领现金 = type=cron,cronexp="0 0-23/5 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_city.js

====================================小火箭=============================
城城领现金 = type=cron,script-path=https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_city.js, cronexpr="0 0-23/5 * * *", timeout=3600, enable=true
 */
const $ = new Env('城城领现金');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//自动抽奖 ，环境变量  JD_CITY_EXCHANGE
let exchangeFlag = $.isNode() ? (process.env.JD_CITY_EXCHANGE === "true" ? true : false) : ($.getdata('jdJxdExchange') === "true" ? true : false)  //是否开启自动抽奖，建议活动快结束开启，默认关闭
//是否跑任务 环境变量  JD_CITY_TASK
let JD_CITY_TASK = process.env.JD_CITY_TASK === "true" ? true : false   //是否开启自动跑任务，默认关闭
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
let uuid, UA;
$.shareCodes = []//用户获取的互助码

let shareCodes = []
let shareCodesMax = []
let shareCodes_success = []

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const JD_API_HOST = 'https://api.m.jd.com/client.action';
let inviteCodes = ['xDZ0HmcBlJQUMs_WF5h_mmvv-Ep-xFCOB0aPa1RY','RtGKopnzA3HfI9jbYaF1msS66HLnJFw6y6kB3Pwlqq4woTB-','RtGKirrwF1nmJvjLcJNiml9RYFvusBk61XyCgVF23KihTV48']

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }

  if ($.isNode()) {
    if (process.env.JD_CITY_SHARECODES) {
      let JD_CITY_SHARECODES = process.env.JD_CITY_SHARECODES.split(process.env.JD_CITY_SHARECODES.indexOf('&') > -1 ? '&' : '@');
      let arr = [];
      Object.keys(JD_CITY_SHARECODES).forEach((item) => {
        if( JD_CITY_SHARECODES[item] ) {
          arr = JD_CITY_SHARECODES[item].split('|');
          shareCodes.push(arr[0])
          shareCodesMax.push(  ( arr.length>1 && !isNaN(Math.trunc(arr[1])) ) ?Math.trunc(arr[1]):0  )
        }
      })
    }
  }
  console.log(`共${cookiesArr.length}个京东账号\n`);
  if (shareCodes.length) {
    console.log(`您提供了${shareCodes.length}个账号的${$.name}助力码，优先给你助力，如有剩余给作者\n`);
  } else {
    console.log(`你没填指定助力码默认给作者助力\n变量名 JD_CITY_SHARECODES\n多个助力码用“@”或者“&”分割。如果想限制最大成功助力次数助力码旁边用“|”分隔填写最大成功助力次数，是英文状态下的哦！\n如果你填的助力码超过了每个人助力的次数后面的也不会得到助力，作者的也得不到。因为你的优先在前。\n`);
  }

  if (exchangeFlag) {
    console.log(`脚本自动抽奖`)
  } else {
    console.log(`脚本不会自动抽奖，建议活动快结束开启，默认关闭(在10.29日自动开启抽奖),如需自动抽奖请设置环境变量  JD_CITY_EXCHANGE 为 true`);
  }
  if (JD_CITY_TASK) {
    console.log(`脚本自动跑任务`)
  } else {
    console.log(`脚本不会跑任务，如果需要跑任务 JD_CITY_TASK 为 true`);
  }
  shareCodes = [...new Set([...shareCodes, ...inviteCodes])];
  console.log(`\n末尾添加邀请码成功统计,脚本结束后可看日志末尾`)
  console.log(`将要助力的邀请码:`)
  for (let j = 0; j < shareCodes.length; j++) {
    if ( typeof (shareCodesMax[j]) == "undefined" ){
      shareCodesMax[j]=0;
      console.log(shareCodes[j])
    }else if( shareCodesMax[j] ){
      console.log(`${shareCodes[j]} MAX:${shareCodesMax[j]}`)
    }else console.log(shareCodes[j])
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
      /*if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }*/
      UA = `jdapp;iPhone;10.2.0;13.1.2;${randomString(40)};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
      uuid = UA.split(';')[4]
      if (JD_CITY_TASK) await getInfo('', true);

      for (let j = 0; j < shareCodes.length; j++) {
        if (typeof (shareCodes_success[j]) == "undefined") shareCodes_success[j] = 0;
        if ( shareCodesMax[j] && shareCodes_success[j] >= shareCodesMax[j]) {//达到指定数量自动跳过
          break
        }
        console.log(`\n${$.UserName} 开始助力 【${shareCodes[j]}】`)
        await $.wait(1000)
        let res = await getInfo(shareCodes[j])
        if (res && res['data'] && res['data']['bizCode'] === 0) {
          if (res['data']['result']['toasts'] && res['data']['result']['toasts'][0] && res['data']['result']['toasts'][0]['status'] === '3') {
            console.log(`助力次数已耗尽，跳出`)
            break
          }
          if (res['data']['result']['toasts']) {
            if ( res['data']['result']['toasts'][0] ) {
              shareCodes_success[j]++;
              console.log(`助力 【${shareCodes[j]}】:${res.data.result.toasts[0].msg}`)
            } else {
              console.log(`未知错误，跳出：err`)
              //console.log(`${JSON.stringify(res)}`)
              break
            }
          }
        }
        if ((res && res['status'] && res['status'] === '3') || (res && res.data && res.data.bizCode === -11)) {
          // 助力次数耗尽 || 黑号
          break
        }
      }

      await $.wait(1000)
      await getInviteInfo();//雇佣
      if (exchangeFlag) {
        const res = await city_lotteryAward();//抽奖
        if (res && res > 0) {
          for (let i = 0; i < new Array(res).fill('').length; i++) {
            await $.wait(1000)
            await city_lotteryAward();//抽奖
          }
        }
      } else {
        //默认10.29开启抽奖
        if ((new Date().getMonth() + 1) === 10 && new Date().getDate() >= 29) {
          const res = await city_lotteryAward();//抽奖
          if (res && res > 0) {
            for (let i = 0; i < new Array(res).fill('').length; i++) {
              await $.wait(1000)
              await city_lotteryAward();//抽奖
            }
          }
        }
      }

      await $.wait(1000)
    }
  }

  console.log(`\n邀请码成功统计:`);
  for (let j = 0; j < shareCodes.length; j++) {
    if (typeof (shareCodes_success[j]) != "undefined" && shareCodes_success[j]) console.log(`【${shareCodes[j]}】：${shareCodes_success[j]}`)
  }

})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

function getInfo(inviteId, flag = false) {
  let body = { "lbsCity": "1", "realLbsCity": "2953", "inviteId": inviteId, "headImg": "", "userName": "", "taskChannel": "1" }
  return new Promise((resolve) => {
    $.post(taskPostUrl("city_getHomeData", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              if (data.data && data['data']['bizCode'] === 0) {
                if (flag) {
                  console.log(`【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${data.data && data.data.result.userActBaseInfo.inviteId}`);
                  if (data.data && data.data.result.userActBaseInfo.inviteId) {
                    $.shareCodes.push(data.data.result.userActBaseInfo.inviteId)
                  }
                  console.log(`剩余金额：${data.data.result.userActBaseInfo.poolMoney}`)
                  for (let pop of data.data.result.popWindows || []) {
                    if (pop.data.cash && (pop.data.cash !== data.data.result.userActBaseInfo.poolMoney)) {
                      await receiveCash("", "2");
                    }
                  }
                  const { taskDetailResultVo } = data.data.result.taskInfo;
                  const { lotteryTaskVos, taskVos } = taskDetailResultVo;
                  for (let lotteryTask of lotteryTaskVos) {
                    if (lotteryTask.times >= lotteryTask.maxTimes && lotteryTask.times !== undefined) {
                      for (let lo of lotteryTask?.badgeAwardVos || []) {
                        if (lo.status === 3) {
                          await receiveCash("", "6");
                        }
                      }
                    }
                  }
                  // for (let task of taskVos || []) {
                  //   const t = Date.now();
                  //   if (task.status === 1 && t >= task.taskBeginTime && t < task.taskEndTime) {
                  //     const id = task.taskId, max = task.maxTimes;
                  //     const waitDuration = task.waitDuration || 0;
                  //     let time = task?.times || 0;
                  //     for (let ltask of task.shoppingActivityVos) {
                  //       if (ltask.status === 1) {
                  //         console.log(`去做任务：${ltask.title}`);
                  //         if (waitDuration) {
                  //           await $.wait(1500);
                  //           await city_doTaskByTk(id, ltask.taskToken, 1);
                  //           await $.wait(waitDuration * 1000);
                  //         }
                  //         await city_doTaskByTk(id, ltask.taskToken);
                  //         time++;
                  //         if (time >= max) break;
                  //       }
                  //     }
                  //     await $.wait(2500);
                  //   }
                  // }
                }
                for (let vo of data.data.result && data.data.result.mainInfos || []) {
                  if (vo && vo.remaingAssistNum === 0 && vo.status === "1") {
                    console.log(vo.roundNum)
                    await receiveCash(vo.roundNum)
                    await $.wait(2 * 1000)
                  }
                }
              } else {
                console.log(`\n\n${inviteId ? '助力好友' : '获取邀请码'}失败:${data.data.bizMsg}`)
                if (flag) {
                  if (data.data && !data.data.result.userActBaseInfo.inviteId) {
                    console.log(`账号已黑，看不到邀请码\n`);
                  }
                }
              }
            } else {
              console.log(`\n\ncity_getHomeData失败:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function receiveCash(roundNum, type = '') {
  let body = { "cashType": 1, "roundNum": roundNum }
  if (type) body = { "cashType": type }
  return new Promise((resolve) => {
    $.post(taskPostUrl("city_receiveCash", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            console.log(`领红包结果${data}`);
            data = JSON.parse(data);
            if (data['data']['bizCode'] === 0) {
              console.log(`获得 ${data.data.result.currentTimeCash} 元，共计 ${data.data.result.totalCash} 元`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function getInviteInfo() {
  let body = {}
  return new Promise((resolve) => {
    $.post(taskPostUrl("city_masterMainData", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data && (data.code === 0 && data.data.bizCode === 0)) {
              if (data.data.result.masterData.actStatus === 2) {
                await receiveCash("", "4")
                await $.wait(2000)
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function city_lotteryAward() {
  let body = {}
  return new Promise((resolve) => {
    $.post(taskPostUrl("city_lotteryAward", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            console.log(`抽奖结果：${data}`);
            data = JSON.parse(data);
            if (data['data']['bizCode'] === 0) {
              const lotteryNum = data['data']['result']['lotteryNum'];
              resolve(lotteryNum);
            }
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
function city_doTaskByTk(taskId, taskToken, actionType = 0) {
  return new Promise((resolve) => {
    $.post(taskPostUrl("city_doTaskByTk", { "taskToken": taskToken, "taskId": taskId, "actionType": actionType, "appId": "1GVRRwK4", "safeStr": "" }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            //if (!(data && data.code === 0 && data.success))
	    	console.log(JSON.stringify(data))
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

function taskPostUrl(functionId, body) {
  return {
    url: JD_API_HOST,
    body: `functionId=${functionId}&body=${JSON.stringify(body)}&client=wh5&clientVersion=1.0.0&uuid=${uuid}`,
    headers: {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://bunearth.m.jd.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent":UA,
      "Referer": "https://bunearth.m.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": cookie
    }
  }
}
function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (let i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
            headers: {
                Host: "me-api.jd.com",
                Accept: "*/*",
                Connection: "keep-alive",
                Cookie: cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname?data.data.userInfo.baseInfo.nickname:data.data.userInfo.baseInfo.curPin;
                        }
                    } else {
                        console.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}
function safeGet(data) {
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

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}