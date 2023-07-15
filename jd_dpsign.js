/*
店铺签到，有新的店铺直接添加token即可
可设置变量DPSTOKEN='A&B&C'
或DPSTOKEN="A
B
C"
优先使用变量token，没有则使用内置token
每日最多签到22家店铺，超出失败
更新日期:2023-6-1 fix
cron 3 0,23 * * * jd_dpsign.js, tag=店铺签到
*/

var token = [//内置token
    //"72486155DE9716BB143C16A41C96EF26",
    //"4C82289AE45A4CC696232B7A4AF282D3",
    //"CA9FEDDCABD4DA31223441563C163B47",
    //"E00B0DC7738C5662F745A7BC6D137B97",
    //"776D3DAAD242B860E89DF11077F82169",
    //"F95A1A59A36015BE04EE37236DB6CE87",
    //"33D71DB237DA8C9D84DC3B34F74AAC07",
    //"E969CCB6A0DF9392A021E3D604D892A2",
    //"D4A243F51F645969EF77A35C93F686A5",
    //"445AF0A22B42AFE6D6ABADDE2FD161C2",
    //"43B0F3550B339D30B1DC1B85198F5871",
    //"710F970D2C9D83AE4547C6CD97754DCB",
    //"264D069FBD411345AC26F8173FB9ABDB",
]
const Env=require('./utils/Env.js');
const $ = new Env('店铺签到');
const Illlli1l = $.isNode() ? require("./sendNotify") : "",
  iIIi11l1 = $.isNode() ? require("./jdCookie") : "",
  II1IllIl = require("child_process").execSync,
  IlliiIiI = require("./function/dylany"),
  Iliii1Il = require("fs");
let iiI1IlI1 = [],
  iII1iii1 = "",
  IlIi11l1,
  ilIIII11 = 0,
  I11ill = [];
const i1lllI = "https://api.m.jd.com/api?appid=interCenter_shopSign";
$.activityId = "";
$.venderId = "";
$.activityEnd = false;
if ($.isNode()) {
  Object.keys(iIIi11l1).forEach(ilIl1lll => {
    iiI1IlI1.push(iIIi11l1[ilIl1lll]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let Ii1ll11I = $.getdata("CookiesJD") || "[]";
  Ii1ll11I = iIilIII1(Ii1ll11I);
  iiI1IlI1 = Ii1ll11I.map(Iil1ii1I => Iil1ii1I.cookie);
  iiI1IlI1.reverse();
  iiI1IlI1.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  iiI1IlI1.reverse();
  iiI1IlI1 = iiI1IlI1.filter(Iii1Il1l => Iii1Il1l !== "" && Iii1Il1l !== null && Iii1Il1l !== undefined);
}
let iiIl1lI = [],
  iililIli = [],
  II1l1IlI = 0;
process.env.DPSTOKEN && (process.env.DPSTOKEN.indexOf("\n") > -1 || process.env.DPSTOKEN.indexOf("&") > -1 ? iiIl1lI = process.env.DPSTOKEN.split(/[&\n]/) : iiIl1lI.push(process.env.DPSTOKEN), token = iiIl1lI);
let I11i11ll = Iliii1Il.existsSync("/ql/data/config") ? "/ql/data/config/config.sh" : "/ql/config/config.sh";
!(async () => {
  if (!iiI1IlI1[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.TokenLists = [];
  $.TokenLists.push(...token);
  $.TokenLists = [...new Set($.TokenLists)].filter(llIiIl1l => !!llIiIl1l && llIiIl1l.length === 32);
  if ($.TokenLists.length === 0) {
    console.log("无店铺签到token，退出！");
    return;
  } else console.log("共" + $.TokenLists.length + "个店铺，开始签到...");
  for (let liII11i1 = 0; liII11i1 < iiI1IlI1.length; liII11i1++) {
    if (iiI1IlI1[liII11i1]) {
      iII1iii1 = iiI1IlI1[liII11i1];
      $.UserName = decodeURIComponent(iII1iii1.match(/pt_pin=([^; ]+)(?=;?)/) && iII1iii1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = liII11i1 + 1;
      $.isLogin = true;
      $.nickName = "";
      IlIi11l1 = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await Illlli1l.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      ll1lilii();
      await IiIlIilI();
      await $.wait(1000);
      try {
        if ($.index === 1 && iiIl1lI.length !== 0) {
          II1l1IlI = iililIli.length;
          for (let iil11iI of iililIli) {
            $.TokenLists = $.TokenLists.filter(iiI11ii1 => iiI11ii1 != iil11iI);
            II1IllIl("sed -i \"s!" + iil11iI + "!!g\" " + I11i11ll);
          }
        }
      } catch (ill1l1I1) {}
    }
  }
  console.log("\n" + (II1l1IlI > 0 ? II1l1IlI + "个失效token，变量已移除" : ""));
})().catch(li1ii1i1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + li1ii1i1 + "!", "");
}).finally(() => {
  $.done();
});
async function IiIlIilI() {
  for (var il1iiIIl = 0; il1iiIIl < $.TokenLists.length; il1iiIIl++) {
    console.log("\n店铺->" + (il1iiIIl + 1) + ":" + $.TokenLists[il1iiIIl]);
    ilIIII11 = 0;
    if ($.index == 1) {
      I11ill[$.TokenLists[il1iiIIl]] = {};
      await II1i1III($.TokenLists[il1iiIIl]);
      if (I11ill[$.TokenLists[il1iiIIl]].vid == "") {
        continue;
      }
      await lI11l11I($.venderId);
    }
    if (I11ill[$.TokenLists[il1iiIIl]].vid == "") continue;
    await l1ii111l($.TokenLists[il1iiIIl], I11ill[$.TokenLists[il1iiIIl]].vid, I11ill[$.TokenLists[il1iiIIl]].aid);
    await iii1i1ii($.TokenLists[il1iiIIl], I11ill[$.TokenLists[il1iiIIl]].vid);
  }
}
async function II1i1III(i1lllIli) {
  let l1lI1Ill = {
      "token": "" + i1lllIli,
      "venderId": ""
    },
    I1lII1ll = {
      "appId": "4da33",
      "fn": "interact_center_shopSign_getActivityInfo",
      "body": l1lI1Ill,
      "apid": "interCenter_shopSign",
      "ver": "11.6.5",
      "cl": "android",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
  return l1lI1Ill = await IlliiIiI.getbody(I1lII1ll), new Promise(II11l1 => {
    const l1Illl1l = {
      "url": "https://api.m.jd.com/api?loginType=2&" + l1lI1Ill,
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": iII1iii1,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      }
    };
    $.get(l1Illl1l, (Iil1ilIl, i1iilllI, l1IiIil1) => {
      try {
        if (Iil1ilIl) {
          console.log("查询店铺API请求失败‼️");
          console.log(Iil1ilIl);
        } else {
          l1IiIil1 = JSON.parse(l1IiIil1);
          if (l1IiIil1.code == 402) {
            I11ill[i1lllIli].vid = "";
            console.log("活动已失效");
            $.activityEnd = true;
            iililIli.push(i1lllIli);
          } else {
            $.venderId = l1IiIil1.data.venderId;
            $.activityId = l1IiIil1.data.id;
            I11ill[i1lllIli].vid = $.venderId;
            I11ill[i1lllIli].aid = $.activityId;
            let i1iIIl1i = l1IiIil1.data.startTime,
              iIliiIlI = l1IiIil1.data.endTime;
            console.log("开始时间：" + new Date(parseInt(i1iIIl1i)).toLocaleString() + "\n结束时间：" + new Date(parseInt(iIliiIlI)).toLocaleString());
            let i1Ii1l = "";
            for (let lil1lIli = 0; lil1lIli < l1IiIil1.data.continuePrizeRuleList.length; lil1lIli++) {
              const lI1IiIil = l1IiIil1.data.continuePrizeRuleList[lil1lIli].level;
              for (let liiiiIiI of l1IiIil1.data.continuePrizeRuleList[lil1lIli].prizeList) {
                if (liiiiIiI.type == 4) lil1lIli != l1IiIil1.data.continuePrizeRuleList.length - 1 ? i1Ii1l += lI1IiIil + "天" + liiiiIiI.discount + "豆" + liiiiIiI.number + "份|" : i1Ii1l += lI1IiIil + "天" + liiiiIiI.discount + "豆" + liiiiIiI.number + "份";else {
                  if (liiiiIiI.type == 14) lil1lIli != l1IiIil1.data.continuePrizeRuleList.length - 1 ? i1Ii1l += lI1IiIil + "天" + liiiiIiI.discount / 100 + "红包" + liiiiIiI.number + "份|" : i1Ii1l += lI1IiIil + "天" + liiiiIiI.discount / 100 + "红包" + liiiiIiI.number + "份";else {}
                }
              }
            }
            !i1Ii1l && (i1Ii1l = "无豆无红包，积分优惠券！");
            console.log("奖励：" + i1Ii1l);
          }
        }
      } catch (Ii1Iilii) {
        $.logErr(Ii1Iilii, i1iilllI);
      } finally {
        II11l1(l1IiIil1);
      }
    });
  });
}
async function lI11l11I(llIi11ll) {
  return new Promise(liIIl1Il => {
    const IIiIiliI = {
      "url": "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=%7B%22venderId%22%3A%22" + llIi11ll + "%22%2C%22stamp%22%3A%221%22%2C%22%24taroTimestamp%22%3A" + new Date().valueOf() + "%2C%22source%22%3A%22m-shop%22%7D&t=" + new Date().valueOf() + "&appid=shop_view&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=16630119447091257705224",
      "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://shop.m.jd.com/",
        "User-Agent": $.UA
      }
    };
    $.get(IIiIiliI, (l11IiIll, ill111l, lI1II1ll) => {
      try {
        if (l11IiIll) {
          console.log("查询店铺名称API请求失败‼️");
          console.log(l11IiIll);
        } else {
          lI1II1ll = JSON.parse(lI1II1ll);
          let IliIlI11 = lI1II1ll.data.shopBaseInfo.shopName;
          console.log("店铺名称：" + IliIlI11 + "\n店铺链接：https://shop.m.jd.com/?venderId=" + llIi11ll);
          IlIi11l1 += "【" + IliIlI11 + "】";
        }
      } catch (Ili1i1il) {
        $.logErr(Ili1i1il, ill111l);
      } finally {
        liIIl1Il(lI1II1ll);
      }
    });
  });
}
async function iiIilli1(IIi1ll11, lIiiIiil) {
  return new Promise(l1IlIIll => {
    const lllIil1l = {
      "url": i1lllI + "&t=" + Date.now() + "&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22" + IIi1ll11 + "%22,%22venderId%22:" + lIiiIiil + "}&jsonp=jsonp1005",
      "headers": {
        "accept": "accept",
        "accept-encoding": "gzip, deflate",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": iII1iii1,
        "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + IIi1ll11 + "&sceneval=2",
        "User-Agent": $.UA
      }
    };
    $.get(lllIil1l, (iIlillli, IIIIl11i, iillii11) => {
      try {
        if (iIlillli) {
          console.log("查询活动信息API请求失败‼️");
          console.log(iIlillli);
        } else {
          iillii11 = JSON.parse(/{(.*)}/g.exec(iillii11)[0]);
          $.activityId = iillii11.data.id;
          let IIIIlilI = iillii11.data.startTime,
            i1lI11lI = iillii11.data.endTime;
          if ($.index == 1) {
            console.log("开始时间：" + new Date(parseInt(IIIIlilI)).toLocaleString() + "\n结束时间：" + new Date(parseInt(i1lI11lI)).toLocaleString());
            let I1iilIl1 = "";
            for (let iliIl1Ii = 0; iliIl1Ii < iillii11.data.continuePrizeRuleList.length; iliIl1Ii++) {
              const i1I1I111 = iillii11.data.continuePrizeRuleList[iliIl1Ii].level;
              for (let iil1iIi of iillii11.data.continuePrizeRuleList[iliIl1Ii].prizeList) {
                if (iil1iIi.type == 4) iliIl1Ii != iillii11.data.continuePrizeRuleList.length - 1 ? I1iilIl1 += i1I1I111 + "天" + iil1iIi.discount + "豆" + iil1iIi.number + "份|" : I1iilIl1 += i1I1I111 + "天" + iil1iIi.discount + "豆" + iil1iIi.number + "份";else {
                  if (iil1iIi.type == 14) {
                    if (iliIl1Ii != iillii11.data.continuePrizeRuleList.length - 1) I1iilIl1 += i1I1I111 + "天" + iil1iIi.discount / 100 + "红包" + iil1iIi.number + "份|";else {
                      I1iilIl1 += i1I1I111 + "天" + iil1iIi.discount / 100 + "红包" + iil1iIi.number + "份";
                    }
                  } else {}
                }
              }
            }
            !I1iilIl1 && (I1iilIl1 = "无豆无红包，积分优惠券！");
            console.log("奖励：" + I1iilIl1);
          }
        }
      } catch (IIliIll) {
        $.logErr(IIliIll, IIIIl11i);
      } finally {
        l1IlIIll(iillii11);
      }
    });
  });
}
async function l1ii111l(ii1Il111, lIi1IiI, il1IIllI) {
  let liIllI1i = {
      "token": "" + ii1Il111,
      "venderId": lIi1IiI,
      "activityId": il1IIllI,
      "type": 56,
      "actionType": 7
    },
    llil1Iil = {
      "appId": "4da33",
      "fn": "interact_center_shopSign_signCollectGift",
      "body": liIllI1i,
      "apid": "interCenter_shopSign",
      "ver": "11.6.5",
      "cl": "android",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
  return liIllI1i = await IlliiIiI.getbody(llil1Iil), new Promise(ii1Iii11 => {
    const llIllll1 = {
      "url": "https://api.m.jd.com/api?loginType=2&" + liIllI1i,
      "headers": {
        "accept": "accept",
        "accept-encoding": "gzip, deflate",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": iII1iii1,
        "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + ii1Il111 + "&sceneval=2",
        "User-Agent": $.UA
      }
    };
    $.get(llIllll1, async (llIli1, iI1lIll1, llII1Iil) => {
      try {
        if (llIli1) {
          console.log("签到API请求失败‼️");
          console.log(llIli1);
        } else {
          llII1Iil = JSON.parse(llII1Iil);
          if (llII1Iil.success && llII1Iil.success === true) {
            let ll11I11l = 0;
            for (let Ilil1I11 of llII1Iil.data) {
              for (i of Ilil1I11.prizeList) switch (i.type) {
                case 4:
                  ll11I11l += i.discount;
                  break;
              }
            }
            console.log("结果：签到成功! " + (ll11I11l > 0 ? "获得 " + ll11I11l + " 京豆" : ""));
            ilIIII11 = 0;
          } else {
            if (llII1Iil.msg) console.log("签到失败：" + llII1Iil.msg);else {
              console.log("签到失败!");
              console.log(JSON.stringify(llII1Iil));
              ilIIII11++;
              if (ilIIII11 > 6) return;
              await $.wait(100);
              await l1ii111l(ii1Il111, lIi1IiI, il1IIllI);
            }
          }
        }
      } catch (I11lII1l) {
        $.logErr(I11lII1l, iI1lIll1);
      } finally {
        ii1Iii11(llII1Iil);
      }
    });
  });
}
async function iii1i1ii(lllilIii, IIllIlI1) {
  return new Promise(l1ill1Ii => {
    const iiiIllII = {
      "url": i1lllI + "&t=" + Date.now() + "&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22" + lllilIii + "%22,%22venderId%22:" + IIllIlI1 + ",%22activityId%22:" + $.activityId + ",%22type%22:56}&jsonp=jsonp1006",
      "headers": {
        "accept": "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9",
        "cookie": iII1iii1,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      }
    };
    $.get(iiiIllII, (llIll1Il, iIIli1Ii, IiIlIIIi) => {
      try {
        llIll1Il ? (console.log("API请求失败‼️"), console.log(llIll1Il)) : (IiIlIIIi = JSON.parse(/{(.*)}/g.exec(IiIlIIIi)[0]), console.log("当前已签到 " + IiIlIIIi.data.days + " 天"), IlIi11l1 += "已签到：" + IiIlIIIi.data.days + "天\n");
      } catch (l1li1Ill) {
        $.logErr(l1li1Ill, iIIli1Ii);
      } finally {
        l1ill1Ii(IiIlIIIi);
      }
    });
  });
}
async function llilil1l() {
  $.isNode() && ($.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + IlIi11l1), allMessage += "【京东账号" + $.index + "】" + $.nickName + "\n" + IlIi11l1 + ($.index !== iiI1IlI1.length ? "\n\n" : ""));
}
function I11il11I() {
  return new Promise(IIIii1iI => {
    const Il1iII = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": iII1iii1,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(Il1iII, (iiiliili, i11iillI, Il111Ili) => {
      try {
        if (Il111Ili) {
          Il111Ili = JSON.parse(Il111Ili);
          if (Il111Ili.islogin === "1") {} else Il111Ili.islogin === "0" && ($.isLogin = false);
        }
      } catch (i1IIiI1l) {
        console.log(i1IIiI1l);
      } finally {
        IIIii1iI();
      }
    });
  });
}
function iIilIII1(l11iliIi) {
  const I111I1ll = function () {
      let lI1lilIi = true;
      return function (iIlIiIil, lIlIl11) {
        const lll1ili1 = lI1lilIi ? function () {
          if (lIlIl11) {
            const IlIIIIIi = lIlIl11.apply(iIlIiIil, arguments);
            return lIlIl11 = null, IlIIIIIi;
          }
        } : function () {};
        return lI1lilIi = false, lll1ili1;
      };
    }(),
    li11ii1l = I111I1ll(this, function () {
      return li11ii1l.toString().search("(((.+)+)+)+$").toString().constructor(li11ii1l).search("(((.+)+)+)+$");
    });
  li11ii1l();
  if (typeof l11iliIi == "string") try {
    return JSON.parse(l11iliIi);
  } catch (ilI11lI1) {
    return console.log(ilI11lI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function I1ii11I(lI1iii1l) {
  lI1iii1l = lI1iii1l || 32;
  let lil1liI = "abcdef0123456789",
    IlI1lIIi = lil1liI.length,
    lIiIi1li = "";
  for (i = 0; i < lI1iii1l; i++) lIiIi1li += lil1liI.charAt(Math.floor(Math.random() * IlI1lIIi));
  return lIiIi1li;
}
function ll1lilii() {
  $.UA = "jdapp;iPhone;10.2.2;13.1.2;" + I1ii11I(40) + ";M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}