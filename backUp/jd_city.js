/*
城城分现金
活动时间：2022-12-09~2023-01-02
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
0 0,12 1-2,29-31 12,1 * https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_city.js, tag=城城分现金, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

=================================Loon===================================
[Script]
cron "0 0,12 1-2,29-31 12,1 *" script-path=https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_city.js,tag=城城分现金

===================================Surge================================
城城分现金 = type=cron,cronexp="0 0,12 1-2,29-31 12,1 *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_city.js

====================================小火箭=============================
城城分现金 = type=cron,script-path=https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_city.js, cronexpr="0 0,12 1-2,29-31 12,1 *", timeout=3600, enable=true
 */

const Env=require('./utils/Env.js');
const $ = new Env('城城分现金');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//自动抽奖 ，环境变量  JD_CITY_EXCHANGE
let exchangeFlag = $.isNode() ? (process.env.JD_CITY_EXCHANGE === "true" ? true : false) : ($.getdata('jdJxdExchange') === "true" ? true : false)  //是否开启自动抽奖，建议活动快结束开启，默认关闭
//是否跑任务 环境变量  
let JD_CITY_TASK = (process.env.JD_CITY_TASK === "true" ? true : false)   //是否开启自动跑任务，默认关闭
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
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
let inviteCodes = ['WTcvwEemlsDnIWC_cqR6QFs','29DRfLlUASUsMHf-SJ0tfJhanWC-fgY','29DRVJpXFQ0VNVfuWa86fLbJD01ay4Q','0MD3UJ9dDxJQIWCuTvw','29DRdr50AQUEJ0j1epYhfNDx_1mcZIU','29DREslWR11VbCm9PO5tZYupe10ExP6w']
//inviteCodes=[inviteCodes[0],inviteCodes[1],inviteCodes[2]];
//inviteCodes=[]

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  $.token="trxpmpmkwe3437l1"
  if(!$.token){
    console.log("填写log token")
    return
  }
  let urlArr = [
      "http://g.zxi7.cn",
      "https://jd.smiek.tk",
      "http://jd.smiek.ga",
  ]
  for(let i of urlArr){
      $.getSignUrl = i
      await toStatus()
      if($.toStatus) break
  }
  if(!$.toStatus){
      $.getSignUrl = ''
  }
  
  if (shareCodes.length) {
    console.log(`您提供了${shareCodes.length}个账号的${$.name}助力码，优先给你助力，如有剩余给作者\n`);
  } else {
    console.log(`你没填指定助力码默认给作者助力\n变量名 JD_CITY_SHARECODES\n多个助力码用“@”或者“&”分割。如果想限制最大成功助力次数助力码旁边用“|”分隔填写最大成功助力次数，是英文状态下的哦！\n如果你填的助力码超过了每个人助力的次数后面的也不会得到助力，作者的也得不到。因为你的优先在前。\n`);
  }

  if (exchangeFlag) {
    console.log(`脚本自动抽奖`)
  } else {
    console.log(`脚本不会自动抽奖，建议活动快结束开启，默认关闭(在12.12日自动开启抽奖),如需自动抽奖请设置环境变量  JD_CITY_EXCHANGE 为 true`);
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
      getUA()
      //await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      $.joyytoken = ''
      $.uid = ''
      let noHelpCount = 0
      $.joyytokenb = ($.getdata("jd_blog_joyytoken") && $.getdata("jd_blog_joyytoken")[$.UserName]) || ''
      if (JD_CITY_TASK){
        res = await getInfo('');
        if (res.code === 0) {
          if (res.data && res['data']['bizCode'] === 0) {
              console.log(`互助码:${res.data && res.data.result.userActBaseInfo.inviteId}`);
              /*if (res.data && res.data.result.userActBaseInfo.inviteId) {
                $.shareCodes.push(res.data.result.userActBaseInfo.inviteId)
              }*/
              console.log(`剩余金额：${res.data.result.userActBaseInfo.poolMoney}`)
            for (let vo of res.data.result && res.data.result.popWindows || []) {
              if (vo && vo.type === "dailycash_second") {
                await receiveCash()
                await $.wait(2 * 1000)
              }
            }
            for (let vo of res.data.result && res.data.result.mainInfos || []) {
              if (vo && vo.remaingAssistNum === 0 && vo.status === "1") {
                await receiveCash(vo.roundNum)
                await $.wait(2 * 1000)
              }
            }
            const { taskDetailResultVo } = res.data.result.taskInfo;
            const { lotteryTaskVos, taskVos } = taskDetailResultVo;
            for (let lotteryTask of lotteryTaskVos) {
              //if (lotteryTask.times >= lotteryTask.maxTimes && lotteryTask.times !== undefined) {
                for (let lo of lotteryTask?.badgeAwardVos || []) {
                  if (lo.status === 3) {
                    await receiveCash("", "6");
                    await $.wait(2 * 1000)
                  }
                }
              //}
            }
            
            //console.log(JSON.stringify(taskVos));
            if(JD_CITY_TASK) for (let task of taskVos || []) {
              if (task && task.status == 1) {
                  const t = Date.now();
                  if ( t >= task.taskBeginTime && t < task.taskEndTime) {
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
            }
          } else {
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
          if(res.code===0 && res['data']) {
            let {bizCode,bizMsg}=res['data'];
            //console.log(`${JSON.stringify(res['data']['result'])}`)
            if( bizCode=== 0 ){
              let toasts=res['data']['result']['toasts'];
              if(toasts){
                if( toasts[0] && toasts[0]['status'] === '3'){
                  console.log(`助力次数已耗尽，跳出`)
                  break
                }else{
                  shareCodes_success[j]++;
                  console.log(toasts[0].msg)
                }
              }else{
                console.log("无法助力")
                noHelpCount++
                if(noHelpCount > 1) break
                
              }
            }else if(bizMsg=="活动太火爆啦"){//{"bizCode":-11, -12
              console.log(bizMsg);
              break
            }else{
              console.log(bizMsg);
            }
          }else if (( res['status'] && res['status'] === '3') || (res && res.data && res.data.bizCode === -11)) {
            // 助力次数耗尽 || 黑号
            break
          }else if(/火爆|登陆失败/.test($.toStr(res, res))){
            $.isLogin = false
            break
          }else{
            console.log(`city_getHomeData失败:${JSON.stringify(res)}\n`)
            $.isLogin = false
            break
          }
        }else{
          console.log("助力解析失败！")
        }
      }
      if(!$.isLogin){
        continue
      }
      let jd_blog_joyytoken = $.getdata("jd_blog_joyytoken") || {}
      if($.joyytokenb){
        jd_blog_joyytoken[$.UserName] = $.joyytokenb
        $.setdata(jd_blog_joyytoken, 'jd_blog_joyytoken')
      }else if (jd_blog_joyytoken[$.UserName]){
        delete jd_blog_joyytoken[$.UserName]
        $.setdata(jd_blog_joyytoken, 'jd_blog_joyytoken')
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

async function getInfo(inviteId) {
  //let safeStr = JSON.stringify(await getLogs("inviteId", { }))
  let safeStr="{\"log\":\"${(new Date()).getTime()}~\",\"sceneid\":\"CHFhPageh5\",\"random\":\"51624039\"}"
  let body = { "lbsCity": "16", "realLbsCity": "1315", "inviteId": inviteId, "headImg": "", "userName": "", "taskChannel": "1" ,"location":"","safeStr":`${safeStr}`}
  return new Promise((resolve) => {
    $.post(taskPostUrl("city_getHomeDatav1", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          //console.log(data)
          if (safeGet(data)) {
            data = JSON.parse(data);
          }else{
            data=false;
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

async function receiveCash(roundNum = '',type) {
  let body = { "cashType": 2 }
  if (roundNum) body = { "cashType": 1, "roundNum": roundNum }
  if (roundNum == -1) body.cashType=4;
  if(type) body.cashType=type;
  return new Promise((resolve) => {
      $.post(taskPostUrl("city_receiveCash", body), async (err, resp, data) => {
          try {
              if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} API请求失败，请检查网路重试`)
              } else {
                  if (safeGet(data)) {
                      // console.log(`领红包结果${data}`);
                      data = JSON.parse(data);
                      if (data['data']['bizCode'] === 0) {
                          console.log(`获得 ${data.data.result.currentTimeCash} 元，共计 ${data.data.result.totalCash} 元`)
                      } else {
                        console.log(`领红包结果${JSON.stringify(data)}`);
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
            if (data.data.result.masterData.actStatus == 2) {
              console.log('领取赚赏金')
              await receiveCash(-1)
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
                      try{
                          let res = $.toObj(data, data)
                          console.log("抽奖结果："+(res.data.result.hongbao ? "红包" : res.data.result.coupon ? "优惠券" : ""))
                          console.log((res.data.result.hongbao || res.data.result.coupon || data))
                      }catch(e){
                          console.log(`抽奖结果：${data}`);
                      }
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

async function city_doTaskByTk(taskId, taskToken, actionType = 0) {
  let safeStr = JSON.stringify(await getLogs("city_doTaskByTk", { }))
  return new Promise((resolve) => {
    $.post(taskPostUrl("city_doTaskByTk", { "taskToken": taskToken, "taskId": taskId, "actionType": actionType, "appId": "1GVRQwqc", "safeStr": safeStr }), async (err, resp, data) => {
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
  return {
    url: JD_API_HOST,
    body: `functionId=${functionId}&appid=signed_wh5&body=${(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0`,
    headers: {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://bunearth.m.jd.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent":$.UA,
      "Referer": "https://bunearth.m.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": ($.abcv ? $.abcv : "")+cookie,
    }
  }
}

function getUA() {
  $.UA = `jdapp;iPhone;10.2.0;14.3;${randomString(40)};M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
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


async function getLogs(functionId, body = {}) {
  if(!$.getSignUrl){
      return {
          ...body,
          "log":-1,
          "sceneid":"CHFhPageh5",
          "random":""
      }
  }
  let num = ''
  let log = ''
  let res = ''
  let joyytoken = ''
  let joyytokenb = ''
  if (!$.joyytoken) {
      // $.joyytoken = await gettoken("50074")
      $.joyytoken = ""
  }
  joyytoken = $.joyytoken
  if (!$.joyytokenb) {
      $.joyytokenb = await gettoken("50999")
  }
  joyytokenb = $.joyytokenb
  let resBody = { "fn": "city1", "id": functionId, "riskData": '', "pin": $.UserName, "joyytoken": joyytoken, "uid": $.uid || "", "joyytokenb": joyytokenb }
  let log_res = await getLog(resBody)
  res = log_res.data
  let resCount = 0
  while (!res && resCount <= 4) {
      resCount++
      console.log(`重新获取算法 第${resCount}次`)
      log_res = await getLog(resBody)
      res = log_res.data
      await $.wait(2000)
  }
  
  if (!res) {
      console.log('获取不到算法')
      process.exit(1)
  }
  if (res.joyytoken) {
      $.joyytoken = res.joyytoken
  }
  if (res.ua) {
      $.UA = res.ua
  }
  if (res.uid) {
      $.uid = res.uid
  }
  if (res.abcv) {
      $.abcv = res.abcv
  }
  log = res.log || -1
  num = res.random || ''
  return {
      ...body,
      "log":log,
      "sceneid":"CHFhPageh5",
      "random":num
  }
}
function gettoken(appname) {
  return new Promise(resolve => {
      let body = `content={"appname":"50074","whwswswws":"","jdkey":"a","body":{"platform":"1"}}`
      if (appname != "50074") {
          body = `content={"appname":"50999","whwswswws":"","jdkey":"a","body":{"platform":"2"}}`
      }
      opts = {
          url: `https://rjsb-token-m.jd.com/gettoken`,
          headers: {
              "accept": "*/*",
              "Origin": "https://bunearth.m.jd.com",
              "Referer": "https://bunearth.m.jd.com/",
              "User-Agent": $.UA,
          },
          body: body
      }
      let msg = ''
      $.post(opts, async (err, resp, data) => {
          try {
              if (err) {
                  console.log(`${$.toStr(err, err)}`)
                  console.log(`gettoken API请求失败，请检查网路重试`)
              } else {
                  let res = $.toObj(data, data);
                  if (typeof res == 'object') {
                      if (res.joyytoken) {
                          msg = res.joyytoken
                      } else {
                          console.log(data)
                      }
                  } else {
                      console.log(data)
                  }
              }
          } catch (e) {
              console.log(e, resp)
          } finally {
              resolve(msg);
          }
      })
  })
}
//log算法
async function getLog(body) {
  return new Promise(resolve => {
      let options = {
          url: `${$.getSignUrl}/jdlog`,
          body: JSON.stringify({ "token": $.token, "body": body }),
          headers: {
              "Content-Type": "application/json",
          },
          timeout: 30000
      }
      let msg = ''
      $.post(options, async (err, resp, data) => {
          try {
              if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} 算法 API请求失败，请检查网路重试`)
              } else {
                  data = $.toObj(data, data);
                  if (data && data.code && data.code == 200) {
                      msg = data
                      if (data.msg && data.msg != "success") {
                          //console.log(data.msg)
                          if (/次数不够/.test(data.msg)) process.exit(1)
                      }
                  }
              }
          } catch (e) {
              console.log(e)
          } finally {
              resolve(msg);
          }
      })
  })
}
function toStatus() {
  return new Promise(resolve => {
      let get = {
          url: `${$.getSignUrl}/to_status`,
          timeout: 10000
      }
      $.get(get, async (err, resp, data) => {
          try {
              if (err) {
                  $.getSignErr = err
                  // console.log(`${$.toStr(err)}`)
                  // console.log(`${$.name} 连接服务器 API请求失败，请检查网路重试`)
              } else {
                  let res = $.toObj(data, data)
                  if (res && typeof res == 'object') {
                      if (res.msg === "success") {
                          $.toStatus = true
                      }
                  }
              }
          } catch (e) {
              $.logErr(e, resp)
          } finally {
              resolve()
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