/*
cron "30 7,15,23 * * *" jd_speed_sign_new.js, tag:京喜特价任务
*/
//详细说明参考 https://github.com/ccwav/QLScript2.
const Env = require('./utils/Env.js');
const $ = new Env('京喜特价任务');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
$.CryptoJS = $.isNode() ? require("crypto-js"):'';
let maxThread = 1; //并发数
if ($.isNode() && process.env.JDSPEED_MAXTHREAD){
	maxThread=process.env.JDSPEED_MAXTHREAD*1;
}

let TaskList = [];
let llAPIError = false;
let cookiesArr = [], message;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const JD_API_HOST = 'https://api.m.jd.com/';

let runorderReward = false;
var date = new Date();
if (new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() == date.getDate()) {
  console.log('月底了,自动领下单红包奖励')
  runorderReward = true;
}

!(async () => {
  
	

  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      var cookie = cookiesArr[i];
      var url_uuid = randomString(16);

      message = '';
      TaskList.push(jdGlobal(cookie, url_uuid));
      if (i == (cookiesArr.length - 1) || TaskList.length == maxThread) {
        await Promise.all(TaskList);
        if (!llAPIError) {
          if (i != (cookiesArr.length - 1)) {
            console.log(`当前批量完成，等待30秒`);
            await $.wait(30 * 1000);
          }
        } else {
          console.log(`检测到403，暂停2分钟后重试`);
          await $.wait(2 * 60 * 1000);
          llAPIError = false;
          await Promise.all(TaskList);
        }

        TaskList = [];
      }

      if (llAPIError) {
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

async function jdGlobal(cookie,url_uuid) {
  try {
	var isLogin= await isLoginByX1a0He(cookie);
	if (!isLogin)
		return;
	
    // await wheelsHome(cookie)
    // await apTaskList(cookie)
    // await wheelsHome(cookie)
    await taskList(cookie,url_uuid)
    if (llAPIError) {      
      return;
    }
    await queryJoy(cookie,url_uuid)
    if (llAPIError) {      
      return;
    }
    if (runorderReward) {
      await orderReward(cookie)
    }
  } catch (e) {
    $.logErr(e)
  }
}

async function orderReward(type, cookie) {
  var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  var t = +new Date()
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
              for (var item of $.details) {
                if (item.status === 2) {

                  console.log(UserName + `:检测到【下单领红包】有奖励可领取，开始领取奖励`)
                  await orderReward(item.orderQty, cookie);
                  await $.wait(2000)
                } else if (item.status === 1) {
                  console.log(UserName + `:【下单领红包】暂无奖励可领取，再下${data.data.needOrderQty}单可领取${data.data.rewardAmount}元`)
                  break
                }
              }
            } else {
              if (data.code === 0) {
                console.log(UserName + `奖励领取结果，获得${data.data.rewardAmount}元`)
              } else {
                console.log(UserName + `奖励领取结果：获得${JSON.stringify(data)}`)
              }
            }
          } else {
            console.log(UserName + `其他情况：${JSON.stringify(data)}`)
          }
        }
      }
    } catch (e) {
      $.logErr(e, resp)
    }
  })
}


async function taskList(cookie,url_uuid) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', cookie,url_uuid, {
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
              for (var task of data.data) {
                $.taskName = task.taskInfo.mainTitle;
                if (task.taskInfo.status === 0) {
                  if (task.taskType >= 1000) {
                    await doTask(task.taskType, cookie,url_uuid)
                    await $.wait(1000)
                  } else {
                    $.canStartNewItem = true
                    while ($.canStartNewItem) {
                      if (task.taskType !== 3) {
                        await queryItem(cookie,url_uuid, task.taskType)
                      } else {
                        await startItem("", task.taskType, cookie,url_uuid)
                      }
                    }
                  }
                } else {
                  var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                  console.log(`${UserName}:${task.taskInfo.mainTitle}已完成`)
                }

                if (llAPIError)
                  break;
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

async function doTask(taskId, cookie,url_uuid) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', cookie,url_uuid, {
      "method": "marketTaskRewardPayment",
      "data": { "channel": 1, "clientTime": +new Date() + 0.588, "activeType": taskId }
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`doTask API请求失败，请检查网路重试`)
          llAPIError = true;
        } else {
          var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              console.log(UserName + `:${data.data.taskInfo.mainTitle}任务完成成功，预计获得${data.data.reward}金币`)
            } else {
              console.log(UserName + `:任务完成失败，${data.message}`)
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

async function queryJoy(cookie,url_uuid) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', cookie,url_uuid, { "method": "queryJoyPage", "data": { "channel": 1 } }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`queryJoy API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.data.taskBubbles)
                for (var task of data.data.taskBubbles) {
                  await rewardTask(task.id, task.activeType, cookie,url_uuid)
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

async function rewardTask(id, taskId, cookie,url_uuid) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', cookie,url_uuid, {
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
            var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            if (data.code === 0) {
              console.log(`${UserName}:气泡收取成功，获得${data.data.reward}金币`)
            } else {
              console.log(`${UserName}:气泡收取失败，${data.message}`)
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


async function queryItem(cookie,url_uuid, activeType = 1) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', cookie,url_uuid, {
      "method": "queryNextTask",
      "data": { "channel": 1, "activeType": activeType }
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`queryItem API请求失败，请检查网路重试`)
          $.canStartNewItem = false;
          llAPIError = true;
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0 && data.data) {
              await startItem(data.data.nextResource, activeType,cookie,url_uuid)
            } else {
              var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
              console.log(`${UserName}:商品任务开启失败，${data.message}`)
              $.canStartNewItem = false
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

async function startItem(activeId, activeType, cookie,url_uuid) {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', cookie,url_uuid, {
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
        var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`startItem API请求失败，请检查网路重试`)
          $.canStartNewItem = false;
          llAPIError = true;
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0 && data.data) {
              if (data.data.taskInfo.isTaskLimit === 0) {
                var { videoBrowsing, taskCompletionProgress, taskCompletionLimit } = data.data.taskInfo
                if (activeType !== 3)
                  videoBrowsing = activeType === 1 ? 5 : 10
                console.log(`${UserName}:【${taskCompletionProgress + 1}/${taskCompletionLimit}】浏览商品任务记录成功，等待${videoBrowsing}秒`)
                await $.wait(videoBrowsing * 1000)
                await $.wait(3000);
                await endItem(data.data.uuid, activeType, cookie,url_uuid, activeId, activeType === 3 ? videoBrowsing : "")
                await $.wait(1000);
              } else {
                console.log(`${UserName}:${$.taskName}任务已达上限`)
                $.canStartNewItem = false
              }
            } else {
              $.canStartNewItem = false
              console.log(`${UserName}:${$.taskName}任务开启失败，${data.message}`)
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

async function endItem(uuid, activeType, cookie,url_uuid, activeId = "", videoTimeLength = "") {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', cookie,url_uuid,
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
                await rewardItem(uuid, activeType, cookie,url_uuid, activeId, videoTimeLength)
              } else {
                var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                console.log(`${UserName}:${$.taskName}任务结束失败，${data.message}`)
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

async function rewardItem(uuid, activeType, cookie,url_uuid, activeId = "", videoTimeLength = "") {
  return new Promise(resolve => {
    $.get(taskUrl('ClientHandleService.execute', cookie,url_uuid,
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
              var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
              if (data.code === 0 && data.isSuccess) {
                console.log(`${UserName}:${$.taskName}任务完成，获得${data.data.reward}金币`)
              } else {
                console.log(`${UserName}:${$.taskName}任务失败，${data.message}`)
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
function wheelsHome(cookie) {
  return new Promise(resolve => {
    $.get(taskGetUrl('wheelsHome', cookie,
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
                var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                console.log(`${UserName}:【幸运大转盘】剩余抽奖机会：${data.data.lotteryChances}`)
                while (data.data.lotteryChances--) {
                  await wheelsLottery(cookie)
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
function wheelsLottery(cookie) {
  return new Promise(resolve => {
    $.get(taskGetUrl('wheelsLottery', cookie,
      { "linkId": "toxw9c5sy9xllGBr3QFdYg" }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`wheelsLottery API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
              if (data.data && data.data.rewardType) {
                console.log(`${UserName}:幸运大转盘抽奖获得：【${data.data.couponUsedValue}-${data.data.rewardValue}${data.data.couponDesc}】\n`)
              } else {
                console.log(`${UserName}:幸运大转盘抽奖获得：空气`)
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
function apTaskList(cookie) {
  return new Promise(resolve => {
    $.get(taskGetUrl('apTaskList', cookie,
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
                var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                for (var task of data.data) {
                  // {"linkId":"toxw9c5sy9xllGBr3QFdYg","taskType":"SIGN","taskId":67,"channel":4}
                  if (!task.taskFinished && ['SIGN', 'BROWSE_CHANNEL'].includes(task.taskType)) {
                    console.log(`${UserName}:去做任务${task.taskTitle}`)
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
function apDoTask(taskType, taskId, channel, itemId, cookie) {
  // console.log({"linkId":"toxw9c5sy9xllGBr3QFdYg","taskType":taskType,"taskId":taskId,"channel":channel,"itemId":itemId})
  return new Promise(resolve => {
    $.get(taskGetUrl('apDoTask', cookie,
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
                var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                console.log(`${UserName}:任务完成成功`)
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

function taskUrl(functionId, cookie,url_uuid, body = {}) {	
	const struuid = url_uuid;
	let nowTime = Date.now();
	let _0x7683x5 = `${"lite-android&"}${JSON["stringify"](body)}${"&android&3.1.0&"}${functionId}&${nowTime}&${struuid}`;
	let _0x7683x6 = "12aea658f76e453faf803d15c40a72e0";
	let sign = $.CryptoJS.HmacSHA256(_0x7683x5, _0x7683x6).toString();
	let strurl=JD_API_HOST+"api?functionId="+functionId+"&body="+`${escape(JSON["stringify"](body))}&appid=lite-android&client=android&uuid=`+struuid+`&clientVersion=3.1.0&t=${nowTime}&sign=${sign}`;
	return {
		url: strurl,
		headers: {
			'Host': "api.m.jd.com",
			'accept': "*/*",
			'kernelplatform': "RN",
			'user-agent': "JDMobileLite/3.1.0 (iPad; iOS 14.4; Scale/2.00)",
			'accept-language': "zh-Hans-CN;q=1, ja-CN;q=0.9",
			'Cookie': cookie
		},
		timeout: 10000
	}
}


function taskGetUrl(function_id, cookie, body) {
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

function randomString(e) {
	e = e || 32;
	let t = "0123456789abcdef",
	a = t.length,
	n = "";
	for (let i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}

function isLoginByX1a0He(cookie) {
	var UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
    return new Promise((resolve) => {
        const options = {
            url: 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
            headers: {
                "Cookie": cookie,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": "jdapp;iPhone;10.1.2;15.0;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
            },
        }
        $.get(options, (err, resp, data) => {
			var isLogin=false;			
            try {
                if (data) {
                    data = JSON.parse(data);                    
                    if (data.islogin === "1") {
                        isLogin= true;
                    } else if (data.islogin === "0") {
                        console.log(UserName + `: Cookie无效\n`)
                        isLogin= false;
                    } else {
                        console.log(UserName + `: Cookie状态返回未知...\n`)
                        isLogin= false;
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve(isLogin);
            }
        });
    });
}