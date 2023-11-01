/*
新东东农场任务

种植，任务，浇水  暂无助力

环境变量：
jd_dongDongFarm_plantSkuId // 需要种植的作物ID，详见脚本打印
jd_dongDongFarm_Notify // 是否推送通知（true/false），默认不推送
代理变量：
JD_Farm_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_Farm_PROXY_TUNNRL      // 代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_Farm_PROXY_URL      // API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_Farm_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改

cron:45 2-22/6 * * *
============Quantumultx===============
[task_local]
#新东东农场任务
45 2-22/6 * * * jd_dongDongFarm_task.js, tag=新东东农场任务, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('新东东农场任务')

const I1IllI = require("./jdCookie"),
  IIlI11 = require("./function/sendJDNotify"),
  iIIll1 = require("./function/jdCommon"),
  llIIII = require("./function/krgetH5st"),
  ilI11I = process.env.jd_dongDongFarm_plantSkuId || "",
  ili1I = process.env.jd_dongDongFarm_Notify === "true",
  iilIIl = "LCH-fV7hSnChB-6i5f4ayw",
  i1Iili = {
    1: "水滴"
  },
  i1Iill = process.env.JD_Farm_PROXY_OPEN === "true",
  l1IiI = process.env.JD_Farm_PROXY_TUNNRL,
  l1lill = process.env.JD_Farm_PROXY_URL,
  i1li1 = process.env.JD_Farm_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let iIIllI = "",
  I1Ill1 = 0,
  ili11 = false;
if (i1Iill) {
  ili11 = true;
  try {
    require("global-agent/bootstrap");
    if (l1lill) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + l1lill + "\n");
      let iIIliI = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = iIIliI.exec(l1lill)[0] + "," + i1li1;
    } else {
      l1IiI ? (global.GLOBAL_AGENT.HTTP_PROXY = l1IiI, global.GLOBAL_AGENT.NO_PROXY = "" + i1li1, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (IiIil) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    ili11 = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_Farm_PROXY_OPEN='true' \n");
}
let IiIiIi = "";
const llIIIl = Object.keys(I1IllI).map(IiIii => I1IllI[IiIii]).filter(iill1l => iill1l);
!llIIIl[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  IIlI11.config({
    title: $.name
  });
  for (let l1iiIi = 0; l1iiIi < llIIIl.length; l1iiIi++) {
    $.index = l1iiIi + 1;
    IiIiIi = llIIIl[l1iiIi];
    iIIll1.setCookie(IiIiIi);
    $.UserName = decodeURIComponent(iIIll1.getCookieValue(IiIiIi, "pt_pin"));
    $.UA = iIIll1.genUA($.UserName);
    $.message = IIlI11.create($.index, $.UserName);
    $.nickName = "";
    $.retry = 0;
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    i1Iill && ili11 && l1lill && (I1Ill1 % 10 == 0 && (await III1Il(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iIIllI), console.log("📶 " + iIIllI), I1Ill1++);
    await IIlI1I();
    iIIll1.unsetCookie();
    if ($.runEnd) {
      break;
    }
    await $.wait(3000);
  }
  ili1I && IIlI11.getMessage() && (IIlI11.updateContent(IIlI11.content + "\n"), await IIlI11.push());
})().catch(iiiII1 => $.logErr(iiiII1)).finally(() => $.done());
async function IIlI1I() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    const I1I1Il = await iIIll1.getLoginStatus(IiIiIi);
    if (!I1I1Il && typeof I1I1Il !== undefined) {
      console.log("账号无效");
      $.message.fix("账号无效");
      return;
    }
    await l1Iil("farm_home");
    if ($.farm_home.bizCode === 0) {
      const l1l1I = $.farm_home?.["result"]?.["treeFullStage"],
        iIlI1I = $.farm_home?.["result"]?.["waterTips"] || "",
        I1I1Ii = $.farm_home?.["result"]?.["skuName"];
      switch (l1l1I) {
        case 0:
          console.log("当前尚未种植，可种植的商品如下：\n");
          await l1Iil("farm_tree_board");
          const IiIl1 = $.farm_tree_board?.["farmTreeLevels"];
          if (IiIl1.length) {
            for (let IIIl of IiIl1) {
              const IIIi = IIIl.farmLevelTrees,
                l1IIli = IIIl.needDays;
              for (let iII1I1 = 0; iII1I1 < IIIi.length; iII1I1++) {
                const iiiIIi = IIIi[iII1I1].skuName,
                  lIi1iI = IIIi[iII1I1].uid;
                console.log(iiiIIi + "（最快成熟需要" + l1IIli + "天）\n种植变量ID：" + lIi1iI + "\n");
              }
            }
            if (ilI11I) {
              $.plantSuccess = false;
              console.log("\n已填写种植ID[" + ilI11I + "]，现在去种植~");
              await l1Iil("farm_plant_tree");
              if ($.plantSuccess) {
                break;
              }
            } else {
              console.log("未填写种植ID，请先填写后再次运行~");
              $.message.fix("未填写种植商品id变量，请先填写后再运行~");
              return;
            }
          } else {
            console.log("没有可种植的作物：" + JSON.stringify($.farm_tree_board));
            return;
          }
          break;
        case 1:
        case 2:
        case 3:
        case 4:
          console.log("🌳 " + I1I1Ii + "\n🌳 当前进度：" + iIlI1I + "\n");
          $.message.fix("🌳 " + I1I1Ii + "\n🌳 当前进度：" + iIlI1I + "\n");
          break;
        case 5:
          console.log("🎉 种植的 “" + I1I1Ii + "” 可以收获啦~");
          $.message.fix("🎉 种植的 “" + I1I1Ii + "” 可以收获啦~");
          return;
      }
      await llIIIi();
      await IiIiIl();
      await I1Ilil();
      await I1Ilii();
      await IiIiIl();
    } else {
      switch ($.farm_home?.["bizCode"]) {
        case -1001:
          console.log($.farm_home?.["bizMsg"] + " - " + $.farm_home?.["bizCode"]);
          $.hotproxy = true;
          break;
        default:
          {
            console.log($.farm_home?.["bizMsg"] + " - " + $.farm_home?.["bizCode"]);
            break;
          }
      }
      $.retry < 1 && ($.retry++, console.log("等待5秒后重试,第:" + $.retry + "次"), await $.wait(5000), await IIlI1I());
    }
  } catch (liI11l) {
    console.log(liI11l.message);
  }
}
async function llIIIi() {
  await l1Iil("dongDongFarmSignHome");
  const I1I1II = $.dongDongFarmSignHome?.["signInFlag"] || 0;
  switch (I1I1II) {
    case 0:
      {
        console.log("去做任务 \"每日签到\"");
        await l1Iil("dongDongFarmSignIn");
        await $.wait(1000);
        await l1Iil("dongDongFarmSignHome");
        break;
      }
    case 1:
      {
        break;
      }
    default:
      {
        console.log(I1I1II);
        break;
      }
  }
}
async function IiIiIl() {
  let iIlI11 = false;
  await l1Iil("farm_task_list");
  let IIII = $.farm_task_list?.["taskList"] || [];
  for (let iil11I of IIII) {
    const IiIll = iil11I?.["taskStatus"];
    if (IiIll === 3) {
      continue;
    }
    const llIilI = iil11I?.["mainTitle"];
    $.taskId = iil11I?.["taskId"];
    $.taskSourceUrl = iil11I?.["taskSourceUrl"];
    $.taskType = iil11I?.["taskType"];
    $.taskInsert = iil11I?.["taskInsert"];
    switch (IiIll) {
      case 1:
        {
          switch ($.taskType) {
            case "CUMULATIVE_TIMES":
            case "ORDER_MARK":
              break;
            case "BROWSE_CHANNEL":
            case "BROWSE_PRODUCT":
            default:
              {
                if (iil11I.taskSourceUrl) {
                  iIlI11 = true;
                  console.log("去做任务 \"" + llIilI + "\"");
                  await l1Iil("farm_do_task");
                  await $.wait(3000);
                } else {
                  iIlI11 = true;
                  await l1Iil("farm_task_detail");
                  await $.wait(3000);
                  const I1I1I1 = $.farm_task_detail?.["taskDetaiList"] || [],
                    IIIlil = I1I1I1[0];
                  console.log("去做任务 \"" + llIilI + "\"");
                  IIIlil ? ($.taskSourceUrl = IIIlil.itemId, $.taskInsert = IIIlil.taskInsert, await l1Iil("farm_do_task"), await $.wait(3000)) : console.log("> 任务失败，没有获取到任务ID");
                }
                break;
              }
          }
          break;
        }
      case 2:
        {
          console.log("去领取 \"" + llIilI + "\" 任务奖励");
          await l1Iil("farm_task_receive_award");
          await $.wait(3000);
          break;
        }
      default:
        console.log("任务 \"" + iil11I.mainTitle + "\" 状态未知：" + iil11I.taskStatus);
        break;
    }
  }
  if (iIlI11) {
    await l1Iil("farm_task_list");
    IIII = $.farm_task_list?.["taskList"] || [];
    for (let llII1I of IIII) {
      const ilI1II = llII1I.mainTitle;
      $.taskId = llII1I.taskId;
      $.taskSourceUrl = llII1I.taskSourceUrl;
      $.taskType = llII1I.taskType;
      $.taskInsert = llII1I.taskInsert;
      llII1I.taskStatus === 2 && (console.log("去领取 \"" + ilI1II + "\" 任务奖励"), await l1Iil("farm_task_receive_award"), await $.wait(3000));
    }
  }
  console.log("");
}
async function I1Ilil() {
  $.farm_assist_init_info_hot = true;
  await l1Iil("farm_assist_init_info");
  if ($.farm_assist_init_info_hot) {
    const iii1l = $.farm_assist_init_info?.["result"]?.["assistStageList"] || [];
    for (let iiil1I of iii1l) {
      $.assistNum = iiil1I?.["assistNum"];
      $.stage = iiil1I?.["stage"];
      $.waterEnergy = iiil1I?.["waterEnergy"];
      switch (iiil1I?.["stageStaus"]) {
        case 1:
          console.log("助力人数未满 [" + $.assistNum + "人助力],请继续邀请吧！");
          break;
        case 2:
          console.log("助力人数已满 [" + $.assistNum + "人助力],现在去领取 [" + $.waterEnergy + "水滴] 奖励！");
          await $.wait(1500);
          await l1Iil("farm_assist_receive_award");
          await $.wait(1500);
          break;
        case 3:
          console.log("助力人数已满 [" + $.assistNum + "人助力],奖励 [" + $.waterEnergy + "水滴] 已经领取！");
          $.message.fix("助力人数已满 [" + $.assistNum + "人助力],奖励 [" + $.waterEnergy + "水滴] 已经领取！");
          break;
        default:
          {
            console.log("[未知状态]:" + iiil1I?.["stageStaus"]);
            $.hotproxy = true;
            break;
          }
      }
    }
  }
}
function l1I1I1(llII11, lIiI1) {
  if (lIiI1 === "100" || lIiI1 === 100) {
    switch (llII11) {
      case 1:
        return "果树发芽了";
      case 2:
        return "果树长大了";
      case 3:
        return "果树开花了";
      case 4:
        return "果树结果了";
      case 5:
        return "果树成熟了，快去收获吧~";
    }
  } else {
    const ilI1Il = 100 - lIiI1 + "%";
    switch (llII11) {
      case 1:
        return "距离长大还有" + ilI1Il;
      case 2:
        return "距离开花还有" + ilI1Il;
      case 3:
        return "距离结果还有" + ilI1Il;
      case 4:
        return "距离收获还有" + ilI1Il;
    }
  }
}
async function I1Ilii() {
  await l1Iil("farm_home");
  $.bottleWater = $.farm_home?.["result"]?.["bottleWater"];
  $.canFastWater = $.farm_home?.["result"]?.["canFastWater"] || false;
  console.log("\n当前剩余水滴：" + ($.bottleWater || 0) + "g💧");
  while ($.canWatering && $.bottleWater >= 10) {
    if ($.canFastWater && $.bottleWater >= 100) {
      console.log("可以快速浇水了");
      break;
    } else {
      await l1Iil("farm_water");
      await $.wait(3000);
    }
  }
}
async function l1Iii(iii11, iliI1) {
  try {
    switch (iii11) {
      case "farm_home":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          $.farm_home = iliI1.data;
        } else {
          if (iliI1.data?.["bizMsg"]) {
            $.farm_home = iliI1.data;
          } else {
            if (iliI1.errMsg) {
              $.hotproxy = true;
              console.log(iliI1.code + "-" + iliI1.errMsg);
            } else {
              iliI1.msg ? ($.hotproxy = true, console.log(iliI1.code + "-" + iliI1.msg)) : console.log("❓" + iii11 + " " + JSON.stringify(iliI1));
            }
          }
        }
        break;
      case "farm_tree_board":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          $.farm_tree_board = iliI1.data?.["result"];
        } else {
          if (iliI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(iliI1.code + "-" + iliI1.data?.["bizMsg"]);
          } else {
            if (iliI1.errMsg) {
              $.hotproxy = true;
              console.log(iliI1.code + "-" + iliI1.errMsg);
            } else {
              iliI1.msg ? ($.hotproxy = true, console.log(iliI1.code + "-" + iliI1.msg)) : console.log("❓" + iii11 + " " + JSON.stringify(iliI1));
            }
          }
        }
        break;
      case "farm_plant_tree":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          $.plantSuccess = true;
          console.log("种植成功\n");
        } else {
          if (iliI1.data?.["bizMsg"]) {
            $.plantSuccess = false;
            console.log("种植失败：" + iliI1.data?.["bizMsg"]);
          } else {
            iliI1.message ? ($.plantSuccess = false, console.log("种植失败：" + iliI1.message)) : ($.plantSuccess = false, console.log("❓" + iii11 + " " + JSON.stringify(iliI1)));
          }
        }
        break;
      case "farm_water":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          let IIiilI = iliI1.data?.["result"],
            {
              currentProcess: I1lii1,
              updateStage: ilIIlI,
              treeFullStage: liiiI1,
              finished: iIl11,
              waterNum: ii1I,
              stagePrize = null
            } = IIiilI;
          $.bottleWater = IIiilI?.["bottleWater"];
          $.canFastWater = IIiilI?.["canFastWater"];
          let i11Ili = stagePrize?.["map"](liII => liII.value + "水滴") || [];
          if (ilIIlI) {
            let ii11 = "已浇水" + ii1I + "g，" + l1I1I1(liiiI1, 100);
            if (i11Ili.length) {
              ii11 += "，奖励" + i11Ili.join(", ");
            }
            console.log(ii11);
          } else {
            console.log("已浇水" + ii1I + "g，" + l1I1I1(liiiI1, I1lii1));
          }
          iIl11 && ($.canWatering = false, console.log("已浇水" + ii1I + "g，" + l1I1I1(5, 100)));
        } else {
          if (iliI1.message) {
            $.canWatering = false;
            console.log(iliI1.message);
          } else {
            iliI1.data?.["bizMsg"] ? ($.canWatering = false, console.log(iliI1.data?.["bizMsg"])) : console.log("❓" + iii11 + " " + JSON.stringify(iliI1));
          }
        }
        break;
      case "farm_task_list":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          $.farm_task_list = iliI1.data?.["result"];
        } else {
          if (iliI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(iliI1.code + "-" + iliI1.data?.["bizMsg"]);
          } else {
            if (iliI1.errMsg) {
              $.hotproxy = true;
              console.log(iliI1.code + "-" + iliI1.errMsg);
            } else {
              iliI1.msg ? ($.hotproxy = true, console.log(iliI1.code + "-" + iliI1.msg)) : console.log("❓" + iii11 + " " + JSON.stringify(iliI1));
            }
          }
        }
        break;
      case "farm_task_detail":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          $.farm_task_detail = iliI1.data?.["result"];
        } else {
          if (iliI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(iliI1.code + "-" + iliI1.data?.["bizMsg"]);
          } else {
            if (iliI1.errMsg) {
              $.hotproxy = true;
              console.log(iliI1.code + "-" + iliI1.errMsg);
            } else {
              iliI1.msg ? ($.hotproxy = true, console.log(iliI1.code + "-" + iliI1.msg)) : console.log("❓" + iii11 + " " + JSON.stringify(iliI1));
            }
          }
        }
        break;
      case "farm_assist_init_info":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          $.farm_assist_init_info = iliI1.data;
        } else {
          if (iliI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            $.farm_assist_init_info_hot = false;
          } else {
            if (iliI1.errMsg) {
              $.hotproxy = true;
              console.log(iliI1.code + "-" + iliI1.errMsg);
            } else {
              iliI1.msg ? ($.hotproxy = true, console.log(iliI1.code + "-" + iliI1.msg)) : console.log("❓" + iii11 + " " + JSON.stringify(iliI1));
            }
          }
        }
        break;
      case "farm_assist_receive_award":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          console.log("领取[" + $.assistNum + "人助力]奖励: " + (iliI1.data?.["result"]?.["amount"] || 0) + "水滴");
        } else {
          if (iliI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(iliI1.code + "-" + iliI1.data?.["bizMsg"]);
          } else {
            if (iliI1.errMsg) {
              $.hotproxy = true;
              console.log(iliI1.code + "-" + iliI1.errMsg);
            } else {
              iliI1.msg ? ($.hotproxy = true, console.log(iliI1.code + "-" + iliI1.msg)) : console.log("❓" + iii11 + " " + JSON.stringify(iliI1));
            }
          }
        }
        break;
      case "farm_do_task":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          console.log("> 任务完成");
        } else {
          if (iliI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log("> 任务失败 " + iliI1.data.bizMsg);
          } else {
            iliI1.errMsg ? console.log("> 任务失败 " + iliI1.errMsg) : console.log("> 任务失败 " + iii11 + " " + JSON.stringify(iliI1));
          }
        }
        break;
      case "farm_task_receive_award":
        if (iliI1.code === 0 && iliI1.data?.["bizCode"] === 0) {
          let IlilI1 = iliI1.data?.["result"]?.["taskAward"]?.["map"](iIIIi => "" + iIIIi.awardValue + (i1Iili[iIIIi.awardType] || "[type=" + awardType + "]"));
          console.log("> 领取成功，获得 - " + IlilI1.join(", "));
        } else {
          if (iliI1.errMsg) {
            $.hotproxy = true;
            console.log("> 领取失败 " + iliI1.errMsg);
          } else {
            if (iliI1.data?.["bizMsg"]) {
              console.log("> 领取失败 " + iliI1.data?.["bizMsg"]);
            } else {
              console.log("> 领取失败 " + iii11 + " " + JSON.stringify(iliI1));
            }
          }
        }
        break;
      case "dongDongFarmSignHome":
        if (iliI1.code === 0 && iliI1.data) {
          $.dongDongFarmSignHome = iliI1.data;
        } else {
          if (iliI1.errMsg) {
            $.hotproxy = true;
            console.log(iliI1.errMsg);
          } else {
            iliI1.data?.["bizMsg"] ? console.log(iliI1.data?.["bizMsg"]) : console.log("❓" + iii11 + " " + JSON.stringify(iliI1));
          }
        }
        break;
      case "dongDongFarmSignIn":
        if (iliI1.code === 0 && iliI1.data) {
          console.log("> 签到成功，获得奖励 - " + iliI1.data?.["prizeConfigName"]);
        } else {
          if (iliI1.errMsg) {
            $.hotproxy = true;
            console.log("> 签到失败 " + iliI1.errMsg);
          } else {
            iliI1.data?.["bizMsg"] ? console.log("> 签到失败 " + iliI1.data?.["bizMsg"]) : console.log("> 签到失败 " + iii11 + " " + JSON.stringify(iliI1));
          }
        }
        break;
    }
  } catch (l1IlIl) {
    console.log("❌ 未能正确处理 " + iii11 + " 请求响应 " + (l1IlIl.message || l1IlIl));
  }
}
async function l1Iil(liIIli) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let liIl = "",
    llli11 = "",
    Ili11l = "POST",
    I1lill = "",
    I1lili = {};
  switch (liIIli) {
    case "farm_home":
      I1lili = {
        appId: "c57f6",
        functionId: "farm_home",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_tree_board":
      I1lili = {
        appId: "c57f6",
        functionId: "farm_tree_board",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_plant_tree":
      I1lili = {
        appId: "c57f6",
        functionId: "farm_plant_tree",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          uid: ilI11I
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_water":
      I1lili = {
        appId: "28981",
        functionId: "farm_water",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          waterType: 1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_assist_init_info":
      I1lili = {
        appId: "c57f6",
        functionId: "farm_assist_init_info",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_task_list":
      I1lili = {
        appId: "c57f6",
        functionId: "farm_task_list",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_task_detail":
      I1lili = {
        appId: "c57f6",
        functionId: "farm_task_detail",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          taskType: $.taskType,
          taskId: $.taskId,
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_do_task":
      I1lili = {
        appId: "28981",
        functionId: "farm_do_task",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          taskType: $.taskType,
          taskId: $.taskId,
          taskInsert: $.taskInsert,
          itemId: Buffer.from($.taskSourceUrl, "utf-8").toString("base64"),
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_task_receive_award":
      I1lili = {
        appId: "33e0f",
        functionId: "farm_task_receive_award",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          taskType: $.taskType,
          taskId: $.taskId,
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "farm_assist_receive_award":
      I1lili = {
        appId: "c4332",
        functionId: "farm_assist_receive_award",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/client.action";
      llli11 = "" + I1lill.params;
      break;
    case "dongDongFarmSignHome":
      I1lili = {
        appId: "deba1",
        functionId: "dongDongFarmSignHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: iilIIl
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/api";
      llli11 = "" + I1lill.params;
      break;
    case "dongDongFarmSignIn":
      I1lili = {
        appId: "65f9d",
        functionId: "dongDongFarmSignIn",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: iilIIl
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      I1lill = await llIIII.getH5st(I1lili);
      liIl = "https://api.m.jd.com/api";
      llli11 = "" + I1lill.params;
      break;
    default:
      console.log("❌ 未知请求 " + liIIli);
      return;
  }
  llli11 += "&screen=428*0&wqDefault=false";
  const i11Iil = {
    url: liIl,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: IiIiIi,
      Host: "api.m.jd.com",
      Referer: "https://h5.m.jd.com/",
      "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
      Origin: "https://h5.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: llli11,
    timeout: 30000
  };
  Ili11l === "GET" && (delete i11Iil.body, delete i11Iil.headers["Content-Type"]);
  if (i1Iill && ili11) {
    if (l1lill) {
      if ($.hotproxy) {
        await III1Il();
        global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iIIllI;
        I1Ill1 = 0;
        $.hotproxy = false;
        console.log("📶 " + iIIllI);
      }
      I1Ill1++;
    }
  }
  const i11Iii = 1;
  let Ili11i = 0,
    Il1iI1 = null,
    IIIllI = false;
  while (Ili11i < i11Iii) {
    if (Ili11i > 0) {
      await $.wait(1000);
    }
    const {
      err: ilIlil,
      res: Ii1IiI,
      data: IIll11
    } = await III1Ii(i11Iil, Ili11l);
    if (ilIlil) {
      if (typeof ilIlil === "string" && ilIlil.includes("Timeout awaiting 'request'")) {
        Il1iI1 = liIIli + " 请求超时，请检查网络重试";
      } else {
        const l1I1l1 = Ii1IiI?.["statusCode"];
        if (l1I1l1) {
          if ([403, 493].includes(l1I1l1)) {
            Il1iI1 = liIIli + " 请求失败，IP被限制（Response code " + l1I1l1 + "）";
            $.hotproxy = true;
            IIIllI = true;
          } else {
            if ([400, 404].includes(l1I1l1)) {
              $.hotproxy = true;
              Il1iI1 = liIIli + " 请求配置参数错误，请联系开发者进行反馈（Response code " + l1I1l1 + "）";
            } else {
              $.hotproxy = true;
              Il1iI1 = liIIli + " 请求失败（Response code " + l1I1l1 + "）";
            }
          }
        } else {
          $.hotproxy = true;
          Il1iI1 = liIIli + " 请求失败 => " + (ilIlil.message || ilIlil);
        }
      }
      Ili11i++;
    } else {
      const lIi1l = false;
      try {
        const I1iiIi = JSON.parse(IIll11);
        l1Iii(liIIli, I1iiIi);
        break;
      } catch (li1i1) {
        Il1iI1 = "❌ " + liIIli + " 接口响应数据解析失败: " + li1i1.message;
        console.log("🚫 " + liIIli + " => " + String(IIll11 || "无响应数据"));
        lIi1l && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        Ili11i++;
      }
      IIIllI = false;
    }
  }
  if (Ili11i >= i11Iii) {
    console.log(Il1iI1);
    IIIllI && ($.outFlag = true, $.message && $.message.fix(Il1iI1));
  }
}
async function III1Ii(IIll1i, lI1iII = "POST") {
  if (lI1iII === "POST") {
    return new Promise(async I1iiI1 => {
      $.post(IIll1i, (lIiIi1, li11l1, IIlIIl) => {
        I1iiI1({
          err: lIiIi1,
          res: li11l1,
          data: IIlIIl
        });
      });
    });
  } else {
    if (lI1iII === "GET") {
      return new Promise(async I1IIiI => {
        $.get(IIll1i, (ilIli1, li11lI, l1I1ll) => {
          I1IIiI({
            err: ilIli1,
            res: li11lI,
            data: l1I1ll
          });
        });
      });
    } else {
      const li1ii = "不支持的请求方法";
      return {
        err: li1ii,
        res: null,
        data: null
      };
    }
  }
}
function III1Il() {
  return new Promise(async ll1lI1 => {
    $.get({
      url: l1lill,
      timeout: {
        request: 5000
      }
    }, (liii11, lIiIii) => {
      if (lIiIii) {
        try {
          let Il1I11 = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            lIl1II = Il1I11.exec(lIiIii.body);
          iIIllI = lIl1II[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iIIllI;
        } catch (Ii1Ili) {} finally {
          ll1lI1();
        }
      }
    });
  });
}
