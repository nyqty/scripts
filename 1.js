/*
京喜特价签到+赚现金任务
每日9毛左右，满3，10，50可兑换无门槛红包
⚠️⚠️⚠️一个号需要运行20分钟左右

活动时间：长期
活动入口：京喜特价app-现金签到
cron "0 0-23/8 * * *" script-path=jd_speed_sign_1.js,tag=京喜特价-1
*/

const $ = new Env('京喜特价-1');

const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

let cookiesArr = [], cookie = '', message;
let llAPIError = false
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/', actCode = 'visa-card-001';
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }

  const date = new Date()
  $.last_day = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate() == date.getDate()
  let max=cookiesArr.length>20?20:cookiesArr.length;
  for (let i = 0; i < max; i++) {
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
      await jdGlobal()
      await $.wait(2*1000)
  	  if (llAPIError){
    		console.log(`黑IP了，赶紧重新拨号换个IP吧`);
    		break;
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

async function jdGlobal() {
  try {
    //await richManIndex()//
    await wheelsHome()
    await apTaskList()
    await wheelsHome()
    $.score = 0
    $.total = 0
    await taskList()
    await queryJoy()
    // await signInit()
    await cash()
    if ($.last_day) {
      console.log('月底了,自动领下单红包奖励')
      await orderReward()
    }else{
      //console.log('非月底,不自动领下单红包奖励')
    }
    //await showMsg()
  } catch (e) {
    $.logErr(e)
  }
}


function showMsg() {
  return new Promise(resolve => {
    message += `本次运行获得${$.score}金币，共计${$.total}金币\n可兑换 ${($.total / 10000).toFixed(2)} 元京东红包\n兑换入口：京喜特价->我的->金币`
    $.msg($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
    resolve()
  })
}

async function taskList() {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', {
      "version": "3.1.0",
      "method": "newTaskCenterPage",
      "data": { "channel": 1 }
    }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`taskList API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              for (let task of data.data) {
                $.taskName = task.taskInfo.mainTitle
                if (task.taskInfo.status === 0) {
                  if (task.taskType >= 1000) {
                    await doTask(task.taskType)
                    await $.wait(1000)
                  } else {
                    $.canStartNewItem = true
                    while ($.canStartNewItem) {
                      if (task.taskType !== 3) {
                        await queryItem(task.taskType)
                      } else {
                        await startItem("", task.taskType)
                      }
                    }
                  }
                } else {
                  console.log(`${task.taskInfo.mainTitle}已完成`)
                }
                if (llAPIError){
                  console.error('API请求失败，停止执行')
                  break
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

async function doTask(taskId) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', {
      "method": "marketTaskRewardPayment",
      "data": { "channel": 1, "clientTime": +new Date() + 0.588, "activeType": taskId }
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`doTask API请求失败，请检查网路重试`)
          llAPIError = true
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              console.log(`${data.data.taskInfo.mainTitle}任务完成成功，预计获得${data.data.reward}金币`)
            } else {
              console.log(`任务完成失败，${data.message}`)
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

async function queryJoy() {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', { "method": "queryJoyPage", "data": { "channel": 1 } }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`queryJoy API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.data.taskBubbles)
                for (let task of data.data.taskBubbles) {
                  await rewardTask(task.id, task.activeType)
                  await $.wait(500)
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

async function rewardTask(id, taskId) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', {
      "method": "joyTaskReward",
      "data": { "id": id, "channel": 1, "clientTime": +new Date() + 0.588, "activeType": taskId }
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`rewardTask API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              $.score += data.data.reward
              console.log(`气泡收取成功，获得${data.data.reward}金币`)
            } else {
              console.log(`气泡收取失败，${data.message}`)
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


async function queryItem(activeType = 1) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', {
      "method": "queryNextTask",
      "data": { "channel": 1, "activeType": activeType }
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`queryItem API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0 && data.data) {
              await startItem(data.data.nextResource, activeType)
            } else {
              console.log(`商品任务开启失败，${data.message}`)
              $.canStartNewItem = false
              llAPIError = true
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

async function startItem(activeId, activeType) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', {
      "method": "enterAndLeave",
      "data": {
        "activeId": activeId,
        "clientTime": +new Date(),
        "channel": "1",
        "messageType": "1",
        "activeType": activeType,
      }
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`startItem API请求失败，请检查网路重试`)
          llAPIError = true
          $.canStartNewItem = false
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0 && data.data) {
              if (data.data.taskInfo.isTaskLimit === 0) {
                let { videoBrowsing, taskCompletionProgress, taskCompletionLimit } = data.data.taskInfo
                if (activeType !== 3)
                  videoBrowsing = activeType === 1 ? 5 : 10
                console.log(`【${taskCompletionProgress + 1}/${taskCompletionLimit}】浏览商品任务记录成功，等待${videoBrowsing}秒`)
                await $.wait(videoBrowsing * 1000)
                await $.wait(1000)//3000
                await endItem(data.data.uuid, activeType, activeId, activeType === 3 ? videoBrowsing : "")
                await $.wait(1000);//4000
              } else {
                console.log(`${$.taskName}任务已达上限`)
                $.canStartNewItem = false
              }
            } else {
              $.canStartNewItem = false
              console.log(`${$.taskName}任务开启失败，${data.message}`)
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

async function endItem(uuid, activeType, activeId = "", videoTimeLength = "") {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute',
      {
        "method": "enterAndLeave",
        "data": {
          "channel": "1",
          "clientTime": +new Date(),
          "uuid": uuid,
          "videoTimeLength": videoTimeLength,
          "messageType": "2",
          "activeType": activeType,
          "activeId": activeId
        }
      }), async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`endItem API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.code === 0 && data.isSuccess) {
                await rewardItem(uuid, activeType, activeId, videoTimeLength)
              } else {
                console.log(`${$.taskName}任务结束失败，${data.message}`)
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

async function rewardItem(uuid, activeType, activeId = "", videoTimeLength = "") {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute',
      {
        "method": "rewardPayment",
        "data": {
          "channel": "1",
          "clientTime": +new Date(),
          "uuid": uuid,
          "videoTimeLength": videoTimeLength,
          "messageType": "2",
          "activeType": activeType,
          "activeId": activeId
        }
      }), async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`rewardItem API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.code === 0 && data.isSuccess) {
                $.score += data.data.reward
                console.log(`${$.taskName}任务完成，获得${data.data.reward}金币`)
              } else {
                console.log(`${$.taskName}任务失败，${data.message}`)
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

async function cash() {
  return new Promise(resolve => {
    $.get(taskUrl('MyAssetsService.execute',
      { "method": "userCashRecord", "data": { "channel": 1, "pageNum": 1, "pageSize": 20 } }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`cash API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              $.total = data.data.goldBalance
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
// 大转盘
function wheelsHome() {
  return new Promise(resolve => {
    $.get(taskGetUrl('wheelsHome',
      { "linkId": "toxw9c5sy9xllGBr3QFdYg" }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`wheelsHome API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.code === 0) {
                console.log(`【幸运大转盘】剩余抽奖机会：${data.data.lotteryChances}`)
                while (data.data.lotteryChances--) {
                  await wheelsLottery()
                  await $.wait(500)
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
// 大转盘
function wheelsLottery() {
  return new Promise(resolve => {
    $.get(taskGetUrl('wheelsLottery',
      { "linkId": "toxw9c5sy9xllGBr3QFdYg" }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`wheelsLottery API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.data && data.data.rewardType) {
                console.log(`幸运大转盘抽奖获得：【${data.data.couponUsedValue}-${data.data.rewardValue}${data.data.couponDesc}】\n`)
                message += `幸运大转盘抽奖获得：【${data.data.couponUsedValue}-${data.data.rewardValue}${data.data.couponDesc}】\n`
              } else {
                console.log(`幸运大转盘抽奖获得：空气`)
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
// 大转盘任务
function apTaskList() {
  return new Promise(resolve => {
    $.get(taskGetUrl('apTaskList',
      { "linkId": "toxw9c5sy9xllGBr3QFdYg" }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`apTaskList API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.code === 0) {
                for (let task of data.data) {
                  // {"linkId":"toxw9c5sy9xllGBr3QFdYg","taskType":"SIGN","taskId":67,"channel":4}
                  if (!task.taskFinished && ['SIGN', 'BROWSE_CHANNEL'].includes(task.taskType)) {
                    console.log(`去做任务${task.taskTitle}`)
                    await apDoTask(task.taskType, task.id, 4, task.taskSourceUrl)
                  }
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
// 大转盘做任务
function apDoTask(taskType, taskId, channel, itemId) {
  // console.log({"linkId":"toxw9c5sy9xllGBr3QFdYg","taskType":taskType,"taskId":taskId,"channel":channel,"itemId":itemId})
  return new Promise(resolve => {
    $.get(taskGetUrl('apDoTask',
      { "linkId": "toxw9c5sy9xllGBr3QFdYg", "taskType": taskType, "taskId": taskId, "channel": channel, "itemId": itemId }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`apDoTask API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.code === 0 && data.data && data.data.finished) {
                console.log(`任务完成成功`)
              } else {
                console.log(JSON.stringify(data))
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
// 红包大富翁
function richManIndex() {
  return new Promise(resolve => {
    $.get(taskUrl('richManIndex', { "actId": "hbdfw", "needGoldToast": "true" }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`richManIndex API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0 && data.data && data.data.userInfo) {
              console.log(`用户当前位置：${data.data.userInfo.position}，剩余机会：${data.data.userInfo.randomTimes}`)
              while (data.data.userInfo.randomTimes--) {
                await shootRichManDice()
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
// 红包大富翁
function shootRichManDice() {
  return new Promise(resolve => {
    $.get(taskUrl('shootRichManDice', { "actId": "hbdfw" }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`shootRichManDice API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0 && data.data && data.data.rewardType && data.data.couponDesc) {
              message += `红包大富翁抽奖获得：【${data.data.couponUsedValue}-${data.data.rewardValue} ${data.data.poolName}】\n`
              console.log(`红包大富翁抽奖获得：【${data.data.couponUsedValue}-${data.data.rewardValue} ${data.data.poolName}】`)
            } else {
              console.log(`红包大富翁抽奖：获得空气`)
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

async function orderReward(type) {
  let t = +new Date()
  var headers = {
    'Host': 'api.m.jd.com',
    'accept': 'application/json, text/plain, */*',
    'content-type': 'application/x-www-form-urlencoded',
    'origin': 'https://palace.m.jd.com',
    'accept-language': 'zh-cn',
    'user-agent': $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
    'referer': 'https://palace.m.jd.com/?lng=110.917107&lat=22.2706&sid=abefac3cfbcb550b542e4c064dbcabfw&un_area=19_1684_1687_6233',
    'Cookie': cookie
  };
  if (type) {
    var dataString = `functionId=OrderRewardService&body={"method":"receiveReward","data":{"orderQty":${type}}}&_t=${t}&appid=market-task-h5&eid=`;
  } else {
    var dataString = `functionId=OrderRewardService&body={"method":"queryRewards","data":{}}&_t=${t}&appid=market-task-h5&eid=`;
  }
  var options = {
    url: `https://api.m.jd.com/`,
    headers: headers,
    body: dataString
  };
  $.post(options, async (err, resp, data) => {
    try {
      if (err) {
        console.log(`${JSON.stringify(err)}`)
        console.log(`orderReward API请求失败，请检查网路重试`)
      } else {
        if (safeGet(data)) {
          data = JSON.parse(data);
          if (data.code === 0 && data.isSuccess) {
            if (data.data.details) {
              $.details = data.data.details
              for (let item of $.details) {
                if (item.status === 2) {
                  console.log(`\n检测到【下单领红包】有奖励可领取，开始领取奖励`)
                  await orderReward(item.orderQty);
                  await $.wait(2000)
                } else if (item.status === 1) {
                  console.log(`\n【下单领红包】暂无奖励可领取，再下${data.data.needOrderQty}单可领取${data.data.rewardAmount}元`)
                  break
                }
              }
            } else {
              if (data.code === 0) {
                console.log(`奖励领取结果，获得${data.data.rewardAmount}元`)
              } else {
                console.log(`奖励领取结果：获得${JSON.stringify(data)}`)
              }
            }
          } else {
            console.log(`\n其他情况：${JSON.stringify(data)}`)
          }
        }
      }
    } catch (e) {
      $.logErr(e, resp)
    }
  })
}

function taskUrl(functionId, body = {}) {
  let t = +new Date();
  let key = `lite-android&${JSON.stringify(body)}&android&3.1.0&${functionId}&${t}&846c4c32dae910ef`;
  const C = $.isNode() ? require("crypto-js") : CryptoJS;
  let sign = C.HmacSHA256(key, '12aea658f76e453faf803d15c40a72e0').toString();
  return {
      url: `${JD_API_HOST}?functionId=${functionId}&body=${escape(JSON.stringify(body))}&appid=lite-android&client=android&uuid=846c4c32dae910ef&clientVersion=3.1.0&t=${t}&sign=${sign}`,
      headers: {
          'Host': 'api.m.jd.com',
          'accept': '*/*',
          'kernelplatform': 'RN',
          'user-agent': 'JDMobileLite/3.1.0 (iPad; iOS 14.4; Scale/2.00)',
          'accept-language': 'zh-Hans-CN;q=1, ja-CN;q=0.9',
          'Cookie': cookie
      }
  }
}

function taskGetUrl(function_id, body) {
  return {
    url: `https://api.m.jd.com/?appid=activities_platform&functionId=${function_id}&body=${escape(JSON.stringify(body))}&t=${+new Date()}`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'user-agent': $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Accept-Language': 'zh-Hans-CN;q=1,en-CN;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': "application/x-www-form-urlencoded",
      "referer": "https://an.jd.com/babelDiy/Zeus/q1eB6WUB8oC4eH1BsCLWvQakVsX/index.html"
    }
  }
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