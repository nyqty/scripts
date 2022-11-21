/*
种豆得豆 脚本更新地址：jd_plantBean.js
更新时间：2021-08-20
活动入口：京东APP我的-更多工具-种豆得豆
已支持IOS京东多账号,云端多京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注：会自动关注任务中的店铺跟商品，介意者勿使用。
互助码shareCode请先手动运行脚本查看打印可看到
每个京东账号每天只能帮助3个人。多出的助力码将会助力失败。

=====================================Quantumult X=================================
[task_local]
1 7-21/2 * * * https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, tag=种豆得豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzd.png, enabled=true

=====================================Loon================================
[Script]
cron "1 7-21/2 * * *" script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js,tag=京东种豆得豆

======================================Surge==========================
京东种豆得豆 = type=cron,cronexp="1 7-21/2 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js

====================================小火箭=============================
京东种豆得豆 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, cronexpr="1 7-21/2 * * *", timeout=3600, enable=true

*/
const Env=require('./utils/Env')
const $ = new Env('种豆得豆');
//Node.js用户请在jdCookie.js处填写京东ck;
//ios等软件用户直接用NobyDa的jd cookie
let jdNotify = true;//是否开启静默运行。默认true开启
let cookiesArr = [], cookie = '', jdPlantBeanShareArr = [], isBox = false, notify, newShareCodes, option, message, subTitle;
//京东接口地址
const JD_API_HOST = 'https://api.m.jd.com/client.action';
//助力好友分享码(最多3个,否则后面的助力失败)
//此此内容是IOS用户下载脚本到本地使用，填写互助码的地方，同一京东账号的好友互助码请使用@符号隔开。
//下面给出两个账号的填写示例（iOS只支持2个京东账号）
let shareCodes = []
let allMessage = ``;
let currentRoundId = null;//本期活动id
let lastRoundId = null;//上期id
let roundList = [];
let awardState = '';//上期活动的京豆是否收取
let randomCount = $.isNode() ? 20 : 5;
let num;
$.newShareCode = [];
let NowHour = new Date().getHours();
let lnrun = 0;
!(async () => {
  await requireConfig();
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
      $.UA = require('./USER_AGENTS').UARAM();
      //await TotalBean();
      console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      message = '';
      subTitle = '';
      option = {};
      lnrun++;
      await jdPlantBean();
      if (lnrun == 3) {
        console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);
        await $.wait(60 * 1000);
        lnrun = 0;
      }
      //await showMsg();
    }
  }
  if ($.isNode() && allMessage) {
    await notify.sendNotify(`${$.name}`, `${allMessage}`)
  }
})().catch((e) => {
  $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
  $.done();
})

async function jdPlantBean() {
  try {
    console.log(`获取任务及基本信息`)
    await plantBeanIndex();
    if ($.plantBeanIndexResult.errorCode === 'PB101') {
      console.log(`\n活动太火爆了，还是去买买买吧！\n`)
      return
    }
    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === '0' && $.plantBeanIndexResult.data) {
      for (let i = 0; i < $.plantBeanIndexResult.data.roundList.length; i++) {
        if ($.plantBeanIndexResult.data.roundList[i].roundState === "2") {
          num = i
          break
        }
      }
      // console.log(plantBeanIndexResult.data.taskList);
      const shareUrl = $.plantBeanIndexResult.data.jwordShareInfo.shareUrl
      $.myPlantUuid = getParam(shareUrl, 'plantUuid')
      console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${$.myPlantUuid}\n`);

      roundList = $.plantBeanIndexResult.data.roundList;
      currentRoundId = roundList[num].roundId;//本期的roundId
      lastRoundId = roundList[num - 1].roundId;//上期的roundId
      awardState = roundList[num - 1].awardState;
      $.taskList = $.plantBeanIndexResult.data.taskList;
      subTitle = `【京东昵称】${$.plantBeanIndexResult.data.plantUserInfo.plantNickName}`;
      message += `【上期时间】${roundList[num - 1].dateDesc.replace('上期 ', '')}\n`;
      message += `【上期成长值】${roundList[num - 1].growth}\n`;
      await $.wait(1000);
      await receiveNutrients();//定时领取营养液
      await $.wait(2000);
      await doTask();//做日常任务
      await $.wait(5000);
      // await doEgg();
      await stealFriendWater();
      await $.wait(2000);
      await doCultureBean();
      await $.wait(1000);
      await doGetReward();
      await $.wait(1000);
      await showTaskProcess();
      await $.wait(1000);
      await plantShareSupportList();
      await $.wait(1000);
    } else {
      console.log(`种豆得豆-初始失败:  ${JSON.stringify($.plantBeanIndexResult)}`);
    }
  } catch (e) {
    $.logErr(e);
    const errMsg = `京东账号${$.index} ${$.nickName || $.UserName}\n任务执行异常，请检查执行日志 ‼️‼️`;
    // if ($.isNode()) await notify.sendNotify(`${$.name}`, errMsg);
    $.msg($.name, '', `${errMsg}`)
  }
}
async function doGetReward() {
  console.log(`【上轮京豆】${awardState === '4' ? '采摘中' : awardState === '5' ? '可收获了' : '已领取'}`);
  if (awardState === '4') {
    //京豆采摘中...
    message += `【上期状态】${roundList[num - 1].tipBeanEndTitle}\n`;
  } else if (awardState === '5') {
    //收获
    await getReward();
    console.log('开始领取京豆');
    if ($.getReward && $.getReward.code === '0') {
      console.log('京豆领取成功');
      message += `【上期兑换京豆】${$.getReward.data.awardBean}个\n`;
      $.msg($.name, subTitle, message);
      allMessage += `京东账号${$.index} ${$.nickName}\n${message}${$.index !== cookiesArr.length ? '\n\n' : ''}`
      // if ($.isNode()) {
      //   await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName || $.UserName}`, `京东账号${$.index} ${$.nickName}\n${message}`);
      // }
    } else {
      console.log(`$.getReward 异常：${JSON.stringify($.getReward)}`)
    }
  } else if (awardState === '6') {
    //京豆已领取
    message += `【上期兑换京豆】${roundList[num - 1].awardBeans}个\n`;
  }
  if (roundList[num].dateDesc.indexOf('本期 ') > -1) {
    roundList[num].dateDesc = roundList[num].dateDesc.substr(roundList[num].dateDesc.indexOf('本期 ') + 3, roundList[num].dateDesc.length);
  }
  message += `【本期时间】${roundList[num].dateDesc}\n`;
  message += `【本期成长值】${roundList[num].growth}\n`;
}
async function doCultureBean() {
  await plantBeanIndex();
  if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === '0' && $.plantBeanIndexResult.data) {
    const plantBeanRound = $.plantBeanIndexResult.data.roundList[num]
    if (plantBeanRound.roundState === '2') {
      //收取营养液
      if (plantBeanRound.bubbleInfos && plantBeanRound.bubbleInfos.length) console.log(`开始收取营养液`)
      for (let bubbleInfo of plantBeanRound.bubbleInfos) {
        console.log(`收取-${bubbleInfo.name}-的营养液`)
        await cultureBean(plantBeanRound.roundId, bubbleInfo.nutrientsType)
        console.log(`收取营养液结果:${JSON.stringify($.cultureBeanRes)}`)
      }
    }
  } else {
    console.log(`plantBeanIndexResult:${JSON.stringify($.plantBeanIndexResult)}`)
  }
}
async function stealFriendWater() {
  await stealFriendList();
  if ($.stealFriendList && $.stealFriendList.code === '0') {
    if ($.stealFriendList.data && $.stealFriendList.data.tips) {
      console.log('\n\n今日偷取好友营养液已达上限\n\n');
      return
    }
    if ($.stealFriendList.data && $.stealFriendList.data.friendInfoList && $.stealFriendList.data.friendInfoList.length > 0) {
      let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
      for (let item of $.stealFriendList.data.friendInfoList) {
        if (new Date(nowTimes).getHours() === 20) {
          if (item.nutrCount >= 2) {
            // console.log(`可以偷的好友的信息::${JSON.stringify(item)}`);
            console.log(`可以偷的好友的信息paradiseUuid::${JSON.stringify(item.paradiseUuid)}`);
            await collectUserNutr(item.paradiseUuid);
            console.log(`偷取好友营养液情况:${JSON.stringify($.stealFriendRes)}`)
            if ($.stealFriendRes && $.stealFriendRes.code === '0') {
              console.log(`偷取好友营养液成功`)
            }
          }
        } else {
          if (item.nutrCount >= 3) {
            // console.log(`可以偷的好友的信息::${JSON.stringify(item)}`);
            console.log(`可以偷的好友的信息paradiseUuid::${JSON.stringify(item.paradiseUuid)}`);
            await collectUserNutr(item.paradiseUuid);
            console.log(`偷取好友营养液情况:${JSON.stringify($.stealFriendRes)}`)
            if ($.stealFriendRes && $.stealFriendRes.code === '0') {
              console.log(`偷取好友营养液成功`)
            }
          }
        }
        await $.wait(1000)
      }
    }
  } else {
    console.log(`$.stealFriendList 异常： ${JSON.stringify($.stealFriendList)}`)
  }
}
async function doEgg() {
  await egg();
  if ($.plantEggLotteryRes && $.plantEggLotteryRes.code === '0') {
    if ($.plantEggLotteryRes.data.restLotteryNum > 0) {
      const eggL = new Array($.plantEggLotteryRes.data.restLotteryNum).fill('');
      console.log(`目前共有${eggL.length}次扭蛋的机会`)
      for (let i = 0; i < eggL.length; i++) {
        console.log(`开始第${i + 1}次扭蛋`);
        await plantEggDoLottery();
        console.log(`天天扭蛋成功：${JSON.stringify($.plantEggDoLotteryResult)}`);
      }
    } else {
      console.log('暂无扭蛋机会')
    }
  } else {
    console.log('查询天天扭蛋的机会失败' + JSON.stringify($.plantEggLotteryRes))
  }
}
async function doTask() {
  if ($.taskList && $.taskList.length > 0) {
    for (let item of $.taskList) {
      if (item.isFinished === 1) {
        console.log(`${item.taskName} 任务已完成\n`);
        continue;
      } else {
        switch (item.taskType) {
          case 92:
            await farmtask();
            continue;
          case 57:
            await jxdoublesign1('https://m.jingxi.com/jxbfd/user/DoubleSignDeal?g_ty=h5&g_tk=&appCode=msd1188198&__t=1657108409440&dwEnv=7&strDeviceId=a3b4e844090b28d5c38e7529af8115172079be4d&strZone=jxbfd&bizCode=jxbfd&source=jxbfd&_cfd_t=1657108409190&_stk=__t%2C_cfd_t%2CbizCode%2CdwEnv%2Csource%2CstrDeviceId%2CstrZone&_ste=1&h5st=20220706195330228%3B1980457211661562%3B10032%3Btk02w78551ad830nuMcGB4Qsv9QxapLP7gZdOCYE5PVV%2Bna%2Bb4KU21drJq64oP82965Vdc1tGqVU%2Flp7ydcZ5XgH0Feh%3B241b6f1d21bf8e41f380a5dd29a7bac2a6f1f65a0c7ef1b1f751eaea4c40dd9c%3B3.0%3B1657108410228&sceneval=2');
            await $.wait(2000);
            await jxdoublesign1('https://wq.jd.com/jxjdsignin/SignedInfo?channel=jx_zdddsq&_t=1658021925021&h5st=20220717093845024%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3B7eb86560860f8f60ad3b679c34f89aacf891b5a85580efd0a30c355537bfec54%3B3.0%3B1658021925024&_stk=_t%2Cchannel&_=1658021925027&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5');
            await $.wait(1000);
            await jxdoublesign1('https://wq.jd.com/jxjdsignin/IssueReward?channel=jx_zdddsq&_t=1658021926276&h5st=20220717093846279%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3Be2d7b6810b3bd1b9d9692d354ecbb582e69afc64df19bd8d6c14632b1a65660c%3B3.0%3B1658021926279&_stk=_t%2Cchannel&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5');
            await $.wait(1000);
            continue;
          case 96:
            // await tjdoublesign(`https://wq.jd.com/tjjdsignin/SignedInfo?channel=jx_zdddsq&_t=${Date.now()}&h5st=20221119212121629%3B7235812274907393%3B0f6ed%3Btk02w6ce01aef18nu1BI7ITY0GRHzGZYm4QAgvUlNI7sDNMkIIRWB5yQBcmGs48B1Kd89giyM6WMEBZoTeyTRE2yi6cO%3B97dcee4e91efeb5f884eb7feb1c8da1ef52ad53a90a0e3a3c74eb38f0136382d%3B3.0%3B1668864081629&_stk=_t%2Cchannel&_=1665408290814&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5`);
            // await $.wait(2000);
            // await tjdoublesign(`https://wq.jd.com/tjjdsignin/IssueReward?channel=jx_zdddsq&_t=${Date.now()}&h5st=20221119212121629%3B7235812274907393%3B0f6ed%3Btk02w6ce01aef18nu1BI7ITY0GRHzGZYm4QAgvUlNI7sDNMkIIRWB5yQBcmGs48B1Kd89giyM6WMEBZoTeyTRE2yi6cO%3B97dcee4e91efeb5f884eb7feb1c8da1ef52ad53a90a0e3a3c74eb38f0136382d%3B3.0%3B1668864081629&_stk=_t%2Cchannel&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5`);
            // await $.wait(1000);
            // await tjdoublesign(`https://wq.jd.com/tjjdsignin/SignedInfo?channel=jx_zdddsq&_t=${Date.now()}&h5st=20221119212121629%3B7235812274907393%3B0f6ed%3Btk02w6ce01aef18nu1BI7ITY0GRHzGZYm4QAgvUlNI7sDNMkIIRWB5yQBcmGs48B1Kd89giyM6WMEBZoTeyTRE2yi6cO%3B97dcee4e91efeb5f884eb7feb1c8da1ef52ad53a90a0e3a3c74eb38f0136382d%3B3.0%3B1668864081629&_stk=_t%2Cchannel&_=1665408290814&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5`);
            // await $.wait(1000);
            continue;
          case 94:
            continue;
          case 3:
            console.log(`开始做 ${item.taskName}任务`);
            let unFinishedShopNum = item.totalNum - item.gainedNum;
            if (unFinishedShopNum === 0) {
              continue
            }
            await shopTaskList();
            const { data } = $.shopTaskListRes;
            let goodShopListARR = [], moreShopListARR = [], shopList = [];
            const { goodShopList, moreShopList } = data;
            if (goodShopList) {
              for (let i of goodShopList) {
                if (i.taskState === '2') {
                  goodShopListARR.push(i);
                }
              }
            }
            if (moreShopList) {
              for (let j of moreShopList) {
                if (j.taskState === '2') {
                  moreShopListARR.push(j);
                }
              }
            }

            shopList = goodShopListARR.concat(moreShopListARR);
            for (let shop of shopList) {
              const { shopId, shopTaskId } = shop;
              const body = {
                "monitor_refer": "plant_shopNutrientsTask",
                "shopId": shopId,
                "shopTaskId": shopTaskId
              }
              const shopRes = await requestGet('shopNutrientsTask', body);
              console.log(`shopRes结果:${JSON.stringify(shopRes)}`);
              if (shopRes && shopRes.code === '0') {
                if (shopRes.data && shopRes.data.nutrState && shopRes.data.nutrState === '1') {
                  unFinishedShopNum--;
                }
              }
              if (unFinishedShopNum <= 0) {
                console.log(`${item.taskName}任务已做完\n`)
                break;
              }
            }
            continue;
          case 5:
            //挑选商品
            console.log(`开始做 ${item.taskName}任务`);
            let unFinishedProductNum = item.totalNum - item.gainedNum;
            if (unFinishedProductNum === 0) {
              continue
            }
            await productTaskList();
            // console.log('productTaskList', $.productTaskList);
            //const { data1 } = $.productTaskList;
            let productListARR = [], productList = [];
            const { productInfoList } = $.productTaskList.data;
            for (let i = 0; i < productInfoList.length; i++) {
              for (let j = 0; j < productInfoList[i].length; j++) {
                productListARR.push(productInfoList[i][j]);
              }
            }
            for (let i of productListARR) {
              if (i.taskState === '2') {
                productList.push(i);
              }
            }
            for (let product of productList) {
              const { skuId, productTaskId } = product;
              const body = {
                "monitor_refer": "plant_productNutrientsTask",
                "productTaskId": productTaskId,
                "skuId": skuId
              }
              const productRes = await requestGet('productNutrientsTask', body);
              if (productRes && productRes.code === '0') {
                // console.log('nutrState', productRes)
                //这里添加多重判断,有时候会出现活动太火爆的问题,导致nutrState没有
                if (productRes.data && productRes.data.nutrState && productRes.data.nutrState === '1') {
                  unFinishedProductNum--;
                }
              }
              if (unFinishedProductNum <= 0) {
                console.log(`${item.taskName}任务已做完\n`)
                break;
              }
            }
            continue;
          case 10:
            //关注频道
            console.log(`开始做 ${item.taskName}任务`);
            let unFinishedChannelNum = item.totalNum - item.gainedNum;
            if (unFinishedChannelNum === 0) {
              continue
            }
            await plantChannelTaskList();
            //const { data2 } = $.plantChannelTaskList;
            // console.log('goodShopList', data.goodShopList);
            // console.log('moreShopList', data.moreShopList);
            let goodChannelListARR = [], normalChannelListARR = [], channelList = [];
            const { goodChannelList, normalChannelList } = $.plantChannelTaskList.data;
            for (let i of goodChannelList) {
              if (i.taskState === '2') {
                goodChannelListARR.push(i);
              }
            }
            for (let j of normalChannelList) {
              if (j.taskState === '2') {
                normalChannelListARR.push(j);
              }
            }
            channelList = goodChannelListARR.concat(normalChannelListARR);
            for (let channelItem of channelList) {
              const { channelId, channelTaskId } = channelItem;
              const body = {
                "channelId": channelId,
                "channelTaskId": channelTaskId
              }
              const channelRes = await requestGet('plantChannelNutrientsTask', body);
              console.log(`channelRes结果:${JSON.stringify(channelRes)}`);
              if (channelRes && channelRes.code === '0') {
                if (channelRes.data && channelRes.data.nutrState && channelRes.data.nutrState === '1') {
                  unFinishedChannelNum--;
                }
              }
              if (unFinishedChannelNum <= 0) {
                console.log(`${item.taskName}任务已做完\n`)
                break;
              }
            }
            continue;
          default:
            console.log(`\n开始做 ${item.taskName}任务`);
            // $.receiveNutrientsTaskRes = await receiveNutrientsTask(item.taskType);
            await receiveNutrientsTask(item.taskType);
            console.log(`做 ${item.taskName}任务结果:${JSON.stringify($.receiveNutrientsTaskRes)}\n`);
            continue;
        }
      }
    }
  }
}
function showTaskProcess() {
  return new Promise(async resolve => {
    await plantBeanIndex();
    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === '0' && $.plantBeanIndexResult.data) {
      $.taskList = $.plantBeanIndexResult.data.taskList;
      if ($.taskList && $.taskList.length > 0) {
        console.log("     任务   进度");
        for (let item of $.taskList) {
          console.log(`[${item["taskName"]}]  ${item["gainedNum"]}/${item["totalNum"]}   ${item["isFinished"]}`);
        }
      }
    } else {
      console.log(`plantBeanIndexResult:${JSON.stringify($.plantBeanIndexResult)}`)
    }
    resolve()
  })
}

function showMsg() {
  $.log(`\n${message}\n`);
  jdNotify = $.getdata('jdPlantBeanNotify') ? $.getdata('jdPlantBeanNotify') : jdNotify;
  if (!jdNotify || jdNotify === 'false') {
    $.msg($.name, subTitle, message);
  }
}
// ================================================此处是API=================================
async function farmtask() {
  await receivefruit();
  await $.wait(500);
  await dofarm('gotConfigDataForBrand');
  await $.wait(500);
  await dofarm('initForFarm');
  await $.wait(500);
  await dofarm('taskInitForFarm');
  await $.wait(500);
  await dofarm('farmMarkStatus');
  await $.wait(500);
  await dofarm('initForFarm');
  await $.wait(500);
}
async function receivefruit() {
  const body = {
    "monitor_refer": "plant_receiveNutrientsTask",
    "monitor_source": "plant_app_plant_index",
    "awardType": "92",
    "version": "9.2.4.2"
  }
  await request('receiveNutrientsTask', body)
}
async function dofarm(function_id) {
  let body = {
    "version": 17,
    "channel": 1,
    "babelChannel": "45"
  }
  if (function_id == 'gotConfigDataForBrand') {
    body["type"] = "json";
    body["k"] = "farmShareConfig";
  }
  return new Promise(async resolve => {
    const option = {
      url: `${JD_API_HOST}?functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&appid=wh5`,
      headers: {
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'User-Agent': $.UA,
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://h5.m.jd.com'
      },
      timeout: 20000,
    };
    $.get(option, (err, resp, data) => {
      try {
        if (err) {
          console.log('\n API查询请求失败 ‼️‼️')
          $.logErr(err);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })

}

function jxdoublesign1(url) {
  let opt = {
    url,
    headers: {
      //'Host': 'wq.jd.com',
      'accept': 'application/json',
      'referer': 'https://st.jingxi.com/',
      'User-Agent': 'jdpingou;iPhone;4.13.0;14.4.2;${randomString(40)};network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
      'Cookie': 'cid=4;' + cookie
    }
  }
  return new Promise(async resolve => {
    $.get(opt, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            //data = JSON.parse(data);
            //console.log(data)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
    resolve()
  })
}
//每轮种豆活动获取结束后,自动收取京豆
function tjdoublesign(url) {
  let opt = {
    url,
    headers: {
      'Accept': 'application/json',
      'Referer': 'https://wqs.jd.com/',
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Cookie': cookie
    }
  }
  return new Promise(async resolve => {
    $.get(opt, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`tjdoublesign 请求失败，请检查网路重试`)
        } else {
          if (data) {
            //data = JSON.parse(data);
            //console.log(data)
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
async function getReward() {
  const body = {
    "roundId": lastRoundId
  }
  $.getReward = await request('receivedBean', body);
}
//收取营养液
async function cultureBean(currentRoundId, nutrientsType) {
  let functionId = arguments.callee.name.toString();
  let body = {
    "roundId": currentRoundId,
    "nutrientsType": nutrientsType,
  }
  $.cultureBeanRes = await request(functionId, body);
}
//偷营养液大于等于3瓶的好友
//①查询好友列表
async function stealFriendList() {
  const body = {
    pageNum: '1'
  }
  $.stealFriendList = await request('plantFriendList', body);
}

//②执行偷好友营养液的动作
async function collectUserNutr(paradiseUuid) {
  console.log('开始偷好友');
  // console.log(paradiseUuid);
  let functionId = arguments.callee.name.toString();
  const body = {
    "paradiseUuid": paradiseUuid,
    "roundId": currentRoundId
  }
  $.stealFriendRes = await request(functionId, body);
}
async function receiveNutrients() {
  $.receiveNutrientsRes = await request('receiveNutrients', { "roundId": currentRoundId, "monitor_refer": "plant_receiveNutrients" })
  // console.log(`定时领取营养液结果:${JSON.stringify($.receiveNutrientsRes)}`)
}
async function plantEggDoLottery() {
  $.plantEggDoLotteryResult = await requestGet('plantEggDoLottery');
}
//查询天天扭蛋的机会
async function egg() {
  $.plantEggLotteryRes = await requestGet('plantEggLotteryIndex');
}
async function productTaskList() {
  let functionId = arguments.callee.name.toString();
  $.productTaskList = await requestGet(functionId, { "monitor_refer": "plant_productTaskList" });
}
async function plantChannelTaskList() {
  let functionId = arguments.callee.name.toString();
  $.plantChannelTaskList = await requestGet(functionId);
  // console.log('$.plantChannelTaskList', $.plantChannelTaskList)
}
async function shopTaskList() {
  let functionId = arguments.callee.name.toString();
  $.shopTaskListRes = await requestGet(functionId, { "monitor_refer": "plant_receiveNutrients" });
  // console.log('$.shopTaskListRes', $.shopTaskListRes)
}
async function receiveNutrientsTask(awardType) {
  const functionId = arguments.callee.name.toString();
  const body = {
    "monitor_refer": "receiveNutrientsTask",
    "awardType": `${awardType}`,
  }
  $.receiveNutrientsTaskRes = await requestGet(functionId, body);
}
async function plantShareSupportList() {
  $.shareSupportList = await requestGet('plantShareSupportList', { "roundId": "" });
  if ($.shareSupportList && $.shareSupportList.code === '0') {
    const { data } = $.shareSupportList;
    //当日北京时间0点时间戳
    const UTC8_Zero_Time = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000;
    //次日北京时间0点时间戳
    const UTC8_End_Time = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + (24 * 60 * 60 * 1000);
    let friendList = [];
    data.map(item => {
      if (UTC8_Zero_Time <= item['createTime'] && item['createTime'] < UTC8_End_Time) {
        friendList.push(item);
      }
    })
    message += `【助力您的好友】共${friendList.length}人`;
  } else {
    console.log(`异常情况：${JSON.stringify($.shareSupportList)}`)
  }
}
//助力好友的api
async function helpShare(plantUuid) {
  console.log(`\n开始助力好友: ${plantUuid}`);
  const body = {
    "plantUuid": plantUuid,
    "wxHeadImgUrl": "",
    "shareUuid": "",
    "followType": "1",
  }
  $.helpResult = await request(`plantBeanIndex`, body);
  console.log(`助力结果的code:${$.helpResult && $.helpResult.code}`);
}
async function plantBeanIndex() {
  $.plantBeanIndexResult = await request('plantBeanIndex');//plantBeanIndexBody
}
function requireConfig() {
  return new Promise(resolve => {
    //console.log('开始获取种豆得豆配置文件\n')
    notify = $.isNode() ? require('./sendNotify') : '';
    //Node.js用户请在jdCookie.js处填写京东ck;
    const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
    const jdPlantBeanShareCodes = '';
    //IOS等用户直接用NobyDa的jd cookie
    if ($.isNode()) {
      Object.keys(jdCookieNode).forEach((item) => {
        if (jdCookieNode[item]) {
          cookiesArr.push(jdCookieNode[item])
        }
      })
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
    } else {
      cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
    }
    console.log(`共${cookiesArr.length}个京东账号\n`)
    $.shareCodesArr = [];
    if ($.isNode()) {
      Object.keys(jdPlantBeanShareCodes).forEach((item) => {
        if (jdPlantBeanShareCodes[item]) {
          $.shareCodesArr.push(jdPlantBeanShareCodes[item])
        }
      })
    } else {
      if ($.getdata('jd_plantbean_inviter')) $.shareCodesArr = $.getdata('jd_plantbean_inviter').split('\n').filter(item => !!item);
      //console.log(`\nBoxJs设置的${$.name}好友邀请码:${$.getdata('jd_plantbean_inviter') ? $.getdata('jd_plantbean_inviter') : '暂无'}\n`);
    }
    // console.log(`\n种豆得豆助力码::${JSON.stringify($.shareCodesArr)}`);
    //console.log(`您提供了${$.shareCodesArr.length}个账号的种豆得豆助力码\n`);
    resolve()
  })
}
function requestGet(function_id, body = {}) {
  if (!body.version) {
    body["version"] = "9.2.4.2";
  }
  body["monitor_source"] = "plant_app_plant_index";
  body["monitor_refer"] = "";
  return new Promise(async resolve => {
    await $.wait(5000);
    const option = {
      url: `${JD_API_HOST}?functionId=${function_id}&body=${escape(JSON.stringify(body))}&appid=ld`,
      headers: {
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'User-Agent': $.UA,
        'Accept-Language': 'zh-Hans-CN;q=1,en-CN;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': "application/x-www-form-urlencoded"
      },
      timeout: 20000,
    };
    $.get(option, (err, resp, data) => {
      try {
        if (err) {
          console.log('\n种豆得豆: API查询请求失败 ‼️‼️')
          $.logErr(err);
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function TotalBean() {
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
      },
      "timeout": 20000,
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie过期
              return
            }
            if (data['retcode'] === 0) {
              $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
            } else {
              $.nickName = $.UserName
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
function request(function_id, body = {}) {
  return new Promise(async resolve => {
    await $.wait(5000);
    $.post(taskUrl(function_id, body), (err, resp, data) => {
      try {
        if (err) {
          console.log('\n种豆得豆: API查询请求失败 ‼️‼️')
          console.log(`function_id:${function_id}`)
          $.logErr(err);
        } else if (data.indexOf('data') > -1) {
          data = JSON.parse(data);
        } else {
          data = JSON.parse(data);
          console.log(data.errorMessage)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function taskUrl(function_id, body) {
  body["version"] = "9.2.4.2";
  body["monitor_source"] = "plant_app_plant_index";
  if (!body["monitor_refer"]) {
    body["monitor_refer"] = "";
  }
  return {
    url: JD_API_HOST,
    body: `functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2`,
    headers: {
      "Cookie": cookie,
      //"Host": "api.m.jd.com",
      "Accept": "*/*",
      //"Connection": "keep-alive",
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    timeout: 20000,
  }
}
function getParam(url, name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  const r = url.match(reg)
  if (r != null) return unescape(r[2]);
  return null;
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