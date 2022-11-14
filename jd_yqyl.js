/*
 #柠檬邀请有礼  
 #自定义邀请码环境变量
export yqm="你的邀请码"
#柠檬邀请有礼
[task_local]
0 12 * * * http://nm66.top/jd_yqyl.js, tag=柠檬邀请有礼, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('柠檬邀请有礼');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message,res;
let yqm = 'Y1J%2B%2BFA6%2BwKsvX%2BR2C2bDw%3D%3D';//["Y1J%2B%2BFA6%2BwKsvX%2BR2C2bDw%3D%3D","v7PbDLcmaFqxlAPSec3fHg%3D%3D"]//[Math.floor((Math.random() * 2))]

let zdtx = false //设置为true自动抢提现100
if (process.env.yqm) {
  yqm = process.env.yqm;
}
if (process.env.zdtx) {
  zdtx = process.env.zdtx;
}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }

  for (let i = 0; i < cookiesArr.length && yqm; i++) {
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
      await helpme()
      await $.wait(500)
      res = await invite2()
      if(!res){
        console.log(`应该是403了休息1分钟重试！`);
        await $.wait(60*1000);
        //{"code":605,"message":"被邀请者领取达到上限","class":"com.jd.market.task.bean.Response","isSuccess":false}
        //console.log(data)
      }
      if (zdtx == true) {
        for (let i = 0; i < 20; i++) {
          await $.wait(1000)
          await tx()
        }
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

function helpme() {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com/?t=${new Date()}`,
      body: `functionId=InviteFriendChangeAssertsService&body={"method":"attendInviteActivity","data":{"inviterPin":"${yqm}","channel":1,"token":"","frontendInitStatus":""}}&referer=-1&eid=eidIc2ff812158s1ARLLPvIBQjyII7trmiE3BQESzLTXqSC9s3TX28oQv3zQuaY%2B15FedjhWtgYfTsUSkl9FEDNBP8LQRrRx5GwEA93H4jSPYNJ1OvNs&aid=&client=ios&clientVersion=14.3&networkType=wifi&fp=-1&uuid=75aeceef3046d8ce11d354ff89af9517a2e4aa18&osVersion=14.3&d_brand=iPhone&d_model=iPhone9,2&agent=-1&pageClickKey=-1&screen=414*736&platform=3&lang=zh_CN&appid=market-task-h5&_t=${new Date()}`,
      headers: {
        "Origin": "https://618redpacket.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "jdltapp;iPhone;3.3.6;14.3;75aeceef3046d8ce11d354ff89af9517a2e4aa18;network/wifi;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone9,2;addressid/4585826605;hasOCPay/0;appBuild/1060;supportBestPay/0;pv/53.31;apprpd/;ref/https://invite-reward.jd.com/?lng=106.286950&lat=29.969353&sid=547255867e847394aedfb6d68c3e50fw&un_area=4_48201_54794_0#/invitee?inviterId=dS%2Bp85VyjydPuAOOnFP%2Faw%3D%3D;psq/0;ads/;psn/75aeceef3046d8ce11d354ff89af9517a2e4aa18|89;jdv/0|kong|t_1001003207_1762319_6901310|jingfen|30578707801140d09fcd54e5cd83bbf7|1621510932517|1621511027;adk/;app_device/IOS;pap/JA2020_3112531|3.3.6|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Cookie": cookie,
      }
    }
    $.post(options, async (err, resp, data) => {
      try {
        data = JSON.parse(data);
        //console.log(data)
        if( data && data.code===0 ){
          let inviteStatus = data?.data?.inviteStatus
          let inviterBaseUserInfo = data?.data?.inviterBaseUserInfo
          if( inviteStatus !== undefined ){
            if (inviteStatus == 0) {
              console.log("邀请失败")
            }else if (inviteStatus == 1) {
              console.log("邀请成功")
            } else if (inviteStatus == 2) {
              console.log(`已被“${inviterBaseUserInfo.jdNickname}”邀请`)
            }
          }else console.log(data?.data)
        }else console.log(`message ${data?.message}`)
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function invite2() {
  return new Promise(async (resolve) => {
    let inviterIdArr = [
      "Y1J++FA6+wKsvX+R2C2bDw==",
      "v7PbDLcmaFqxlAPSec3fHg=="
    ]
    let inviterId = inviterIdArr[Math.floor((Math.random() * inviterIdArr.length))]
    let options = {
      url: "https://api.m.jd.com/",
      //encodeURIComponent
      body: `functionId=TaskInviteService&body=${JSON.stringify({"method":"participateInviteTask","data":{"channel":"1","encryptionInviterPin":inviterId,"type":1}})}&appid=market-task-h5&uuid=&_t=${Date.now()}`,
      headers: {
        "Host": "api.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://assignment.jd.com",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Referer": "https://assignment.jd.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": cookie
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`TaskInviteService API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    });
  });
}

//提现100
function tx() {
  return new Promise(async (resolve) => {
    let options = {
      url: `functionId=InviteFriendApiService&body={"method":"changeWxHongBao","data":{"order":3,"channel":1,"token":"","s":""}}&referer=-1&eid=eidIc2ff812158s1ARLLPvIBQjyII7trmiE3BQESzLTXqSC9s3TX28oQv3zQuaY%2B15FedjhWtgYfTsUSkl9FEDNBP8LQRrRx5GwEA93H4jSPYNJ1OvNs&aid=&client=ios&clientVersion=14.3&networkType=wifi&fp=-1&uuid=75aeceef3046d8ce11d354ff89af9517a2e4aa18&osVersion=14.3&d_brand=iPhone&d_model=iPhone9,2&agent=-1&pageClickKey=-1&screen=414*736&platform=3&lang=zh_CN&appid=market-task-h5&_t=${new Date()}`,
      headers: {
        "Origin": "https://invite-reward.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "jdapp;iPhone;9.5.2;14.3;6898c30638c55142969304c8e2167997fa59eb53;network/wifi;ADID/F108E1B6-8E30-477C-BE54-87CF23435488;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone9,2;addressid/4585826605;supportBestPay/0;appBuild/167650;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Cookie": cookie,
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        data = JSON.parse(data);
        console.log(data.message)
        //return data.data;
        //allMessage += `京东账号${$.index}-${$.nickName || $.UserName}\n抽取京豆：${data.data.result.userAwardsCacheDto.jBeanAwardVo.prizeName}${$.index !== cookiesArr.length ? '\n\n' : '\n\n'}`;
        //}
        //}
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