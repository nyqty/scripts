/*
城城分现金
活动时间：2022-12-09~12
没填指定助力码默认给作者助力，填了先给你填的助力，剩余助力给作者
自动抽奖 JD_CITY_EXCHANGE="true"
指定助力码 JD_CITY_SHARECODES="eFtqjyeps_r0L17EBpfUh8U" 多个助力码用“@”或者“&”分割
新增可以指定最大大成功次数 举个例子：JD_CITY_SHARECODES="eFtqjyeps_r0L17EBpfUh8U|99" 助力码|最大成功助力次数 同上多个助力码用多个@或者&分割
是否跑任务 JD_CITY_TASK="true"
末尾添加邀请码成功统计,脚本结束后可看日志末尾

如果你填的助力码超过了每个人助力的次数后面的也不会得到助力，作者的也得不到。因为你的优先在前。
=================================Quantumultx=========================
[task_local]
#城城分现金
0 0,12 9-12 12 * https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_city.js, tag=城城分现金, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

=================================Loon===================================
[Script]
cron "0 0,12 9-12 12 *" script-path=https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_city.js,tag=城城分现金

===================================Surge================================
城城分现金 = type=cron,cronexp="0 0,12 9-12 12 *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_city.js

====================================小火箭=============================
城城分现金 = type=cron,script-path=https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_city.js, cronexpr="0 0,12 9-12 12 *", timeout=3600, enable=true
 */
const Env=require('./utils/Env.js');
const $ = new Env('城城分现金');
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

const JD_API_HOST = 'https://api.m.jd.com/client.action';
let inviteCodes = [/*'eFtqjyeps_r0L17EBpfUh8U','-ryUM9lbJB8_PkmFPK6Du6olJhQnEtU','-ryUG_pYMDcGO2mVLZyUu84ZdHjbrIA',*/'8ayyH_9SKihDL17VOs8','-ryUXqULZWVEMBaVGNiR9aGr-wpRyEE-','-ryUOd57JD8XKXaODqWPu98ipnknA_w','-ryUXalZYmdGYhfGSN3DonbDM-KbH3xD']

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }

  if (shareCodes.length) {
    console.log(`您提供了${shareCodes.length}个账号的${$.name}助力码，优先给你助力，如有剩余给作者\n`);
  } else {
    console.log(`你没填指定助力码默认给作者助力\n变量名 JD_CITY_SHARECODES\n多个助力码用“@”或者“&”分割。如果想限制最大成功助力次数助力码旁边用“|”分隔填写最大成功助力次数，是英文状态下的哦！\n如果你填的助力码超过了每个人助力的次数后面的也不会得到助力，作者的也得不到。因为你的优先在前。\n`);
  }

  if (exchangeFlag) {
    console.log(`脚本自动抽奖`)
  } else {
    console.log(`脚本不会自动抽奖，建议活动快结束开启，默认关闭(在1.21日自动开启抽奖),如需自动抽奖请设置环境变量  JD_CITY_EXCHANGE 为 true`);
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
  let res;
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      UA = `jdapp;iPhone;10.2.0;13.1.2;${randomString(40)};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
      uuid = UA.split(';')[4]
      if (JD_CITY_TASK){
        res = await getInfo('');
        if (res.code === 0) {
          if (res.data && res['data']['bizCode'] === 0) {
              console.log(`互助码:${res.data && res.data.result.userActBaseInfo.inviteId}`);
              if (res.data && res.data.result.userActBaseInfo.inviteId) {
                $.shareCodes.push(res.data.result.userActBaseInfo.inviteId)
              }
              console.log(`剩余金额：${res.data.result.userActBaseInfo.poolMoney}`)
              for (let pop of res.data.result.popWindows || []) {
                if (pop.res.cash && (pop.data.cash !== res.data.result.userActBaseInfo.poolMoney)) {
                  await receiveCash("", "2");
                }
              }
              const { taskDetailResultVo } = res.data.result.taskInfo;
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
              /* */
              for (let task of taskVos || []) {
                const t = Date.now();
                if (task.status === 1 && t >= task.taskBeginTime && t < task.taskEndTime) {
                  const id = task.taskId, max = task.maxTimes;
                  const waitDuration = task.waitDuration || 0;
                  let time = task?.times || 0;
                  for (let ltask of task.shoppingActivityVos) {
                    if (ltask.status === 1) {
                      console.log(`去做任务：${ltask.title}`);
                      if (waitDuration) {
                        await $.wait(1500);
                        await city_doTaskByTk(id, ltask.taskToken, 1);
                        await $.wait(waitDuration * 1000);
                      }
                      await city_doTaskByTk(id, ltask.taskToken);
                      time++;
                      if (time >= max) break;
                    }
                  }
                  await $.wait(2500);
                }
              }
            
            for (let vo of res.data.result && res.data.result.mainInfos || []) {
              if (vo && vo.remaingAssistNum === 0 && vo.status === "1") {
                console.log(vo.roundNum)
                await receiveCash(vo.roundNum)
                await $.wait(2 * 1000)
              }
            }
          } else {
            console.log(`${inviteId ? '助力好友' : '获取邀请码'}失败:${res.data.bizMsg}`)
            if (res.data && !res.data.result.userActBaseInfo.inviteId) {
              console.log(`账号已黑，看不到邀请码`);
            }
          }
        }else if(res.code === -30001){
          console.log(res.msg)
          continue
        }else console.log(`city_getHomeData失败:${JSON.stringify(res)}\n`)
      }

      for (let j = 0; j < shareCodes.length; j++) {
        if (typeof (shareCodes_success[j]) == "undefined") shareCodes_success[j] = 0;
        if ( shareCodesMax[j] && shareCodes_success[j] >= shareCodesMax[j]) {//达到指定数量自动跳过
          break
        }
        console.log(`助力 【${shareCodes[j]}】`)
        await $.wait(1000)
        res = await getInfo(shareCodes[j])
        if(res){
          if(res.code === -30001){
            console.log(res.msg)
            break;
          }else if(res.code===0 && res['data']) {
            let {bizCode,bizMsg}=res['data'];
            if( bizCode=== 0 ){
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
            }else if(bizMsg=="活动太火爆啦"){//{"bizCode":-11, -12
              console.log(bizMsg+"等待10秒");
              await $.wait(10000)
            }else{
              console.log(bizMsg);
            }
          }else{
            console.log(`city_getHomeData失败:${JSON.stringify(res)}\n`)
          }
          if (( res['status'] && res['status'] === '3') || (res && res.data && res.data.bizCode === -11)) {
            // 助力次数耗尽 || 黑号
            break
          }
        }else{
          console.log("助力解析失败！")
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
        //默认12.12开启抽奖
        if ((new Date().getMonth() + 1) === 12 && new Date().getDate() >= 12) {
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

function getInfo(inviteId) {
  let body = {"lbsCity":"15","realLbsCity":"1233","inviteId":inviteId,"headImg":"","userName":"","taskChannel":"1","location":"120.609447,28.008608","safeStr":""}
  return new Promise((resolve) => {
    $.post(taskPostUrl("city_getHomeDatav1", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
          }else data=false;
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
            //console.log(`领红包结果${data}`);
            data = JSON.parse(data);
						// console.log(`抽奖结果：${JSON.stringify(data)}`);
            if(data){
							if(data['code'] === 410) {
								console.log(data.msg)
							} else if (data['data']['bizCode'] === 0) {
								console.log(`获得 ${data.data.result.currentTimeCash} 元，共计 ${data.data.result.totalCash} 元`)
							}  else if (data['data']['bizCode'] === -99) {
								console.log(`${data.data.bizMsg}`)
							} else {
								console.log(JSON.stringify(data))
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
            console.log(`抽奖结果：${JSON.stringify(data)}`);
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
            if(data){
              if(data.code === 0 ){
                console.log(data.data.bizMsg);
              }
            }else console.log(JSON.stringify(data))
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
  let t = Date.now()
  return {
    url: JD_API_HOST,
    body: `functionId=${functionId}&body=${JSON.stringify(body)}&appid=signed_wh5&osVersion=15.0.1&timestamp=${t}&&client=ios&clientVersion=11.3.0&openudid=${uuid}`,
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