/*
新东东农场任务

种植，任务，浇水  暂无助力

更新 农场成熟后重新种植，需自行填写种植ID

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
var version_ = "jsjiami.com.v7";
const iIIliI = require("./jdCookie"),
  IiIil = require("./function/sendJDNotify"),
  IiIii = require("./function/jdCommon"),
  iill1l = require("./function/krgetH5st"),
  IiIiII = process.env.jd_dongDongFarm_plantSkuId || "",
  iill1i = process.env.jd_dongDongFarm_Notify === "true",
  l1Il1 = "LCH-fV7hSnChB-6i5f4ayw",
  iill11 = {
    1: "水滴"
  },
  I1IliI = process.env.JD_Farm_PROXY_OPEN === "true",
  III1II = process.env.JD_Farm_PROXY_TUNNRL,
  l1I1II = process.env.JD_Farm_PROXY_URL,
  iIIlil = process.env.JD_Farm_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let IiIiI1 = "",
  iIIlii = 0,
  llIII1 = false;
if (I1IliI) {
  llIII1 = true;
  try {
    require("global-agent/bootstrap");
    if (l1I1II) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + l1I1II + "\n");
      let iiiII1 = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = iiiII1.exec(l1I1II)[0] + "," + iIIlil;
    } else {
      III1II ? (global.GLOBAL_AGENT.HTTP_PROXY = III1II, global.GLOBAL_AGENT.NO_PROXY = "" + iIIlil, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (liI111) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    llIII1 = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_Farm_PROXY_OPEN='true' \n");
}
let IiIiI = "";
const iill1I = Object.keys(iIIliI).map(IiIlI => iIIliI[IiIlI]).filter(iIlI1i => iIlI1i);
!iill1I[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  IiIil.config({
    title: $.name
  });
  for (let IiIl1 = 0; IiIl1 < iill1I.length; IiIl1++) {
    $.index = IiIl1 + 1;
    IiIiI = iill1I[IiIl1];
    IiIii.setCookie(IiIiI);
    $.UserName = decodeURIComponent(IiIii.getCookieValue(IiIiI, "pt_pin"));
    $.UA = IiIii.genUA($.UserName);
    $.message = IiIil.create($.index, $.UserName);
    $.nickName = "";
    $.retry = 0;
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    I1IliI && llIII1 && l1I1II && (iIIlii % 10 == 0 && (await illili(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IiIiI1), console.log("📶 " + IiIiI1), iIIlii++);
    await Illi1();
    IiIii.unsetCookie();
    if ($.runEnd) {
      break;
    }
    await $.wait(3000);
  }
  iill1i && IiIil.getMessage() && (IiIil.updateContent(IiIil.content + "\n"), await IiIil.push());
})().catch(l1IIli => $.logErr(l1IIli)).finally(() => $.done());
async function Illi1() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    $.farm_home = "";
    await lIIi1l("farm_home");
    if ($.farm_home.bizCode === 0) {
      const iil11I = $.farm_home?.["result"]?.["treeFullStage"],
        iII1II = $.farm_home?.["result"]?.["waterTips"] || "",
        IiIll = $.farm_home?.["result"]?.["skuName"];
      switch (iil11I) {
        case 0:
          console.log("当前尚未种植，可种植的商品如下：\n");
          await lIIi1l("farm_tree_board");
          const llIilI = $.farm_tree_board?.["farmTreeLevels"];
          if (llIilI.length) {
            for (let I1I1I1 of llIilI) {
              const IIIlil = I1I1I1.farmLevelTrees,
                Ili111 = I1I1I1.needDays;
              for (let Il11 = 0; Il11 < IIIlil.length; Il11++) {
                const llII1I = IIIlil[Il11].skuName,
                  ilI1II = IIIlil[Il11].uid;
                console.log(llII1I + "（最快成熟需要" + Ili111 + "天）\n种植变量ID：" + ilI1II + "\n");
              }
            }
            if (IiIiII) {
              $.plantSuccess = false;
              console.log("\n已填写种植ID[" + IiIiII + "]，现在去种植~");
              await lIIi1l("farm_plant_tree");
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
          console.log("🌳 " + IiIll + "\n🌳 当前进度：" + iII1II + "\n");
          $.message.fix("🌳 " + IiIll + "\n🌳 当前进度：" + iII1II + "\n");
          break;
        case 5:
          console.log("🎉 种植的 “" + IiIll + "” 可以收获啦~");
          $.message.fix("🎉 种植的 “" + IiIll + "” 可以收获啦~");
          console.log("\n重新种植，可种植的商品如下：\n");
          await lIIi1l("farm_tree_board");
          const IlliI = $.farm_tree_board?.["farmTreeLevels"];
          if (IlliI.length) {
            for (let IlllI of IlliI) {
              const ll11II = IlllI.farmLevelTrees,
                liIlII = IlllI.level,
                Il1I = IlllI.needDays;
              for (let iii1i = 0; iii1i < ll11II.length; iii1i++) {
                const iii1l = ll11II[iii1i].skuName,
                  iliIi = ll11II[iii1i].uid;
                console.log(iii1l + "（等级" + liIlII + "最快成熟需要" + Il1I + "天）\n种植变量ID：" + iliIi + "\n");
              }
            }
            if (IiIiII) {
              $.plantSuccess = false;
              console.log("\n已填写种植ID[" + IiIiII + "]，现在去种植~");
              await lIIi1l("farm_plant_tree");
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
      }
      await l1iiIl();
      await lIIi1i();
      await liI11I();
      await l1IIl1();
      await lIIi1i();
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
      $.retry < 1 && ($.retry++, console.log("等待5秒后重试,第:" + $.retry + "次"), await $.wait(5000), await Illi1());
    }
  } catch (IiIi1l) {
    console.log(IiIi1l.message);
  }
}
async function l1iiIl() {
  await lIIi1l("dongDongFarmSignHome");
  const illI1I = $.dongDongFarmSignHome?.["signInFlag"] || 0;
  switch (illI1I) {
    case 0:
      {
        console.log("去做任务 \"每日签到\"");
        await lIIi1l("dongDongFarmSignIn");
        await $.wait(1000);
        await lIIi1l("dongDongFarmSignHome");
        break;
      }
    case 1:
      {
        break;
      }
    default:
      {
        console.log(illI1I);
        break;
      }
  }
}
async function lIIi1i() {
  let ii1i1I = false;
  await lIIi1l("farm_task_list");
  let liIlI1 = $.farm_task_list?.["taskList"] || [];
  for (let ii1i1l of liIlI1) {
    const iillII = ii1i1l?.["taskStatus"];
    if (iillII === 3) {
      continue;
    }
    const Illli = ii1i1l?.["mainTitle"];
    $.taskId = ii1i1l?.["taskId"];
    $.taskSourceUrl = ii1i1l?.["taskSourceUrl"];
    $.taskType = ii1i1l?.["taskType"];
    $.taskInsert = ii1i1l?.["taskInsert"];
    switch (iillII) {
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
                if (ii1i1l.taskSourceUrl) {
                  ii1i1I = true;
                  console.log("去做任务 \"" + Illli + "\"");
                  await lIIi1l("farm_do_task");
                  await $.wait(3000);
                } else {
                  ii1i1I = true;
                  await lIIi1l("farm_task_detail");
                  await $.wait(3000);
                  const ilI1I1 = $.farm_task_detail?.["taskDetaiList"] || [],
                    liIlIi = ilI1I1[0];
                  console.log("去做任务 \"" + Illli + "\"");
                  liIlIi ? ($.taskSourceUrl = liIlIi.itemId, $.taskInsert = liIlIi.taskInsert, await lIIi1l("farm_do_task"), await $.wait(3000)) : console.log("> 任务失败，没有获取到任务ID");
                }
                break;
              }
          }
          break;
        }
      case 2:
        {
          console.log("去领取 \"" + Illli + "\" 任务奖励");
          await lIIi1l("farm_task_receive_award");
          await $.wait(3000);
          break;
        }
      default:
        console.log("任务 \"" + ii1i1l.mainTitle + "\" 状态未知：" + ii1i1l.taskStatus);
        break;
    }
  }
  if (ii1i1I) {
    await lIIi1l("farm_task_list");
    liIlI1 = $.farm_task_list?.["taskList"] || [];
    for (let i11ii of liIlI1) {
      const iiil1l = i11ii.mainTitle;
      $.taskId = i11ii.taskId;
      $.taskSourceUrl = i11ii.taskSourceUrl;
      $.taskType = i11ii.taskType;
      $.taskInsert = i11ii.taskInsert;
      i11ii.taskStatus === 2 && (console.log("去领取 \"" + iiil1l + "\" 任务奖励"), await lIIi1l("farm_task_receive_award"), await $.wait(3000));
    }
  }
  console.log("");
}
async function liI11I() {
  $.farm_assist_init_info_hot = true;
  await lIIi1l("farm_assist_init_info");
  if ($.farm_assist_init_info_hot) {
    const Iii1lI = $.farm_assist_init_info?.["result"]?.["assistStageList"] || [];
    for (let liiiIi of Iii1lI) {
      $.assistNum = liiiIi?.["assistNum"];
      $.stage = liiiIi?.["stage"];
      $.waterEnergy = liiiIi?.["waterEnergy"];
      switch (liiiIi?.["stageStaus"]) {
        case 1:
          console.log("助力人数未满 [" + $.assistNum + "人助力],请继续邀请吧！");
          break;
        case 2:
          console.log("助力人数已满 [" + $.assistNum + "人助力],现在去领取 [" + $.waterEnergy + "水滴] 奖励！");
          await $.wait(1500);
          await lIIi1l("farm_assist_receive_award");
          await $.wait(1500);
          break;
        case 3:
          console.log("助力人数已满 [" + $.assistNum + "人助力],奖励 [" + $.waterEnergy + "水滴] 已经领取！");
          $.message.fix("助力人数已满 [" + $.assistNum + "人助力],奖励 [" + $.waterEnergy + "水滴] 已经领取！");
          break;
        default:
          {
            console.log("[未知状态]:" + liiiIi?.["stageStaus"]);
            $.hotproxy = true;
            break;
          }
      }
    }
  }
}
function III1(I1liil, IliIi1) {
  if (IliIi1 === "100" || IliIi1 === 100) {
    switch (I1liil) {
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
    const IIiil1 = 100 - IliIi1 + "%";
    switch (I1liil) {
      case 1:
        return "距离长大还有" + IIiil1;
      case 2:
        return "距离开花还有" + IIiil1;
      case 3:
        return "距离结果还有" + IIiil1;
      case 4:
        return "距离收获还有" + IIiil1;
    }
  }
}
async function l1IIl1() {
  await lIIi1l("farm_home");
  $.bottleWater = $.farm_home?.["result"]?.["bottleWater"];
  $.canFastWater = $.farm_home?.["result"]?.["canFastWater"] || false;
  console.log("\n当前剩余水滴：" + ($.bottleWater || 0) + "g💧");
  while ($.canWatering && $.bottleWater >= 10) {
    if ($.canFastWater && $.bottleWater >= 100) {
      console.log("可以快速浇水了");
      break;
    } else {
      await lIIi1l("farm_water");
      await $.wait(3000);
    }
  }
}
async function l1iiIi(ilIIlI, liiiI1) {
  try {
    switch (ilIIlI) {
      case "farm_home":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          $.farm_home = liiiI1.data;
        } else {
          if (liiiI1.data?.["bizMsg"]) {
            $.farm_home = liiiI1.data;
          } else {
            if (liiiI1.errMsg) {
              $.hotproxy = true;
              console.log(liiiI1.code + "-" + liiiI1.errMsg);
            } else {
              if (liiiI1.msg) {
                $.hotproxy = true;
                console.log(liiiI1.code + "-" + liiiI1.msg);
              } else {
                console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1));
              }
            }
          }
        }
        break;
      case "farm_tree_board":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          $.farm_tree_board = liiiI1.data?.["result"];
        } else {
          if (liiiI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(liiiI1.code + "-" + liiiI1.data?.["bizMsg"]);
          } else {
            if (liiiI1.errMsg) {
              $.hotproxy = true;
              console.log(liiiI1.code + "-" + liiiI1.errMsg);
            } else {
              liiiI1.msg ? ($.hotproxy = true, console.log(liiiI1.code + "-" + liiiI1.msg)) : console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1));
            }
          }
        }
        break;
      case "farm_plant_tree":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          $.plantSuccess = true;
          console.log("种植成功\n");
        } else {
          if (liiiI1.data?.["bizMsg"]) {
            $.plantSuccess = false;
            console.log("种植失败：" + liiiI1.data?.["bizMsg"]);
          } else {
            liiiI1.message ? ($.plantSuccess = false, console.log("种植失败：" + liiiI1.message)) : ($.plantSuccess = false, console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1)));
          }
        }
        break;
      case "farm_water":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          let Iii1l1 = liiiI1.data?.["result"],
            {
              currentProcess: iIlil1,
              updateStage: l1IIi1,
              treeFullStage: IIiii1,
              finished: IlilII,
              waterNum: iIII1,
              stagePrize = null
            } = Iii1l1;
          $.bottleWater = Iii1l1?.["bottleWater"];
          $.canFastWater = Iii1l1?.["canFastWater"];
          let I1lil1 = stagePrize?.["map"](iIlilI => iIlilI.value + "水滴") || [];
          if (l1IIi1) {
            let i11Ii1 = "已浇水" + iIII1 + "g，" + III1(IIiii1, 100);
            if (I1lil1.length) {
              i11Ii1 += "，奖励" + I1lil1.join(", ");
            }
            console.log(i11Ii1);
          } else {
            console.log("已浇水" + iIII1 + "g，" + III1(IIiii1, iIlil1));
          }
          IlilII && ($.canWatering = false, console.log("已浇水" + iIII1 + "g，" + III1(5, 100)));
        } else {
          if (liiiI1.message) {
            $.canWatering = false;
            console.log(liiiI1.message);
          } else {
            liiiI1.data?.["bizMsg"] ? ($.canWatering = false, console.log(liiiI1.data?.["bizMsg"])) : console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1));
          }
        }
        break;
      case "farm_task_list":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          $.farm_task_list = liiiI1.data?.["result"];
        } else {
          if (liiiI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(liiiI1.code + "-" + liiiI1.data?.["bizMsg"]);
          } else {
            if (liiiI1.errMsg) {
              $.hotproxy = true;
              console.log(liiiI1.code + "-" + liiiI1.errMsg);
            } else {
              liiiI1.msg ? ($.hotproxy = true, console.log(liiiI1.code + "-" + liiiI1.msg)) : console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1));
            }
          }
        }
        break;
      case "farm_task_detail":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          $.farm_task_detail = liiiI1.data?.["result"];
        } else {
          if (liiiI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(liiiI1.code + "-" + liiiI1.data?.["bizMsg"]);
          } else {
            if (liiiI1.errMsg) {
              $.hotproxy = true;
              console.log(liiiI1.code + "-" + liiiI1.errMsg);
            } else {
              liiiI1.msg ? ($.hotproxy = true, console.log(liiiI1.code + "-" + liiiI1.msg)) : console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1));
            }
          }
        }
        break;
      case "farm_assist_init_info":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          $.farm_assist_init_info = liiiI1.data;
        } else {
          if (liiiI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            $.farm_assist_init_info_hot = false;
          } else {
            if (liiiI1.errMsg) {
              $.hotproxy = true;
              console.log(liiiI1.code + "-" + liiiI1.errMsg);
            } else {
              liiiI1.msg ? ($.hotproxy = true, console.log(liiiI1.code + "-" + liiiI1.msg)) : console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1));
            }
          }
        }
        break;
      case "farm_assist_receive_award":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          console.log("领取[" + $.assistNum + "人助力]奖励: " + (liiiI1.data?.["result"]?.["amount"] || 0) + "水滴");
        } else {
          if (liiiI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(liiiI1.code + "-" + liiiI1.data?.["bizMsg"]);
          } else {
            if (liiiI1.errMsg) {
              $.hotproxy = true;
              console.log(liiiI1.code + "-" + liiiI1.errMsg);
            } else {
              if (liiiI1.msg) {
                $.hotproxy = true;
                console.log(liiiI1.code + "-" + liiiI1.msg);
              } else {
                console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1));
              }
            }
          }
        }
        break;
      case "farm_do_task":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          console.log("> 任务完成");
        } else {
          if (liiiI1.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log("> 任务失败 " + liiiI1.data.bizMsg);
          } else {
            liiiI1.errMsg ? console.log("> 任务失败 " + liiiI1.errMsg) : console.log("> 任务失败 " + ilIIlI + " " + JSON.stringify(liiiI1));
          }
        }
        break;
      case "farm_task_receive_award":
        if (liiiI1.code === 0 && liiiI1.data?.["bizCode"] === 0) {
          let I1IIl1 = liiiI1.data?.["result"]?.["taskAward"]?.["map"](l1I1l1 => "" + l1I1l1.awardValue + (iill11[l1I1l1.awardType] || "[type=" + awardType + "]"));
          console.log("> 领取成功，获得 - " + I1IIl1.join(", "));
        } else {
          if (liiiI1.errMsg) {
            $.hotproxy = true;
            console.log("> 领取失败 " + liiiI1.errMsg);
          } else {
            liiiI1.data?.["bizMsg"] ? console.log("> 领取失败 " + liiiI1.data?.["bizMsg"]) : console.log("> 领取失败 " + ilIIlI + " " + JSON.stringify(liiiI1));
          }
        }
        break;
      case "dongDongFarmSignHome":
        if (liiiI1.code === 0 && liiiI1.data) {
          $.dongDongFarmSignHome = liiiI1.data;
        } else {
          if (liiiI1.errMsg) {
            $.hotproxy = true;
            console.log(liiiI1.errMsg);
          } else {
            liiiI1.data?.["bizMsg"] ? console.log(liiiI1.data?.["bizMsg"]) : console.log("❓" + ilIIlI + " " + JSON.stringify(liiiI1));
          }
        }
        break;
      case "dongDongFarmSignIn":
        if (liiiI1.code === 0 && liiiI1.data) {
          console.log("> 签到成功，获得奖励 - " + liiiI1.data?.["prizeConfigName"]);
        } else {
          if (liiiI1.errMsg) {
            $.hotproxy = true;
            console.log("> 签到失败 " + liiiI1.errMsg);
          } else {
            if (liiiI1.data?.["bizMsg"]) {
              console.log("> 签到失败 " + liiiI1.data?.["bizMsg"]);
            } else {
              console.log("> 签到失败 " + ilIIlI + " " + JSON.stringify(liiiI1));
            }
          }
        }
        break;
    }
  } catch (iIIIii) {
    console.log("❌ 未能正确处理 " + ilIIlI + " 请求响应 " + (iIIIii.message || iIIIii));
  }
}
async function lIIi1l(li11ii) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let li1i1 = "",
    I1iiIl = "",
    liliII = "POST",
    lI1iIl = "",
    iIiiII = {};
  switch (li11ii) {
    case "farm_home":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_tree_board":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_plant_tree":
      iIiiII = {
        appId: "c57f6",
        functionId: "farm_plant_tree",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          uid: IiIiII
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_water":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_assist_init_info":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_task_list":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_task_detail":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_do_task":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_task_receive_award":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "farm_assist_receive_award":
      iIiiII = {
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
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/client.action";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "dongDongFarmSignHome":
      iIiiII = {
        appId: "deba1",
        functionId: "dongDongFarmSignHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1Il1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/api";
      I1iiIl = "" + lI1iIl.params;
      break;
    case "dongDongFarmSignIn":
      iIiiII = {
        appId: "65f9d",
        functionId: "dongDongFarmSignIn",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1Il1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      lI1iIl = await iill1l.getH5st(iIiiII);
      li1i1 = "https://api.m.jd.com/api";
      I1iiIl = "" + lI1iIl.params;
      break;
    default:
      console.log("❌ 未知请求 " + li11ii);
      return;
  }
  I1iiIl += "&screen=428*0&wqDefault=false";
  const ilIll1 = {
    url: li1i1,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: IiIiI,
      Host: "api.m.jd.com",
      Referer: "https://h5.m.jd.com/",
      "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
      Origin: "https://h5.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: I1iiIl,
    timeout: 30000
  };
  liliII === "GET" && (delete ilIll1.body, delete ilIll1.headers["Content-Type"]);
  if (I1IliI && llIII1) {
    if (l1I1II) {
      if ($.hotproxy) {
        await illili();
        global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IiIiI1;
        iIIlii = 0;
        $.hotproxy = false;
        console.log("📶 " + IiIiI1);
      }
      iIIlii++;
    }
  }
  const I1IIil = 1;
  let I1IIii = 0,
    iIIIlI = null,
    li11i1 = false;
  while (I1IIii < I1IIil) {
    I1IIii > 0 && (await $.wait(1000));
    const {
      err: Ii1lIl,
      res: iIIIiI,
      data: li1iI
    } = await I1lI1i(ilIll1, liliII);
    if (Ii1lIl) {
      if (typeof Ii1lIl === "string" && Ii1lIl.includes("Timeout awaiting 'request'")) {
        iIIIlI = li11ii + " 请求超时，请检查网络重试";
      } else {
        const II1ll = iIIIiI?.["statusCode"];
        if (II1ll) {
          if ([403, 493].includes(II1ll)) {
            iIIIlI = li11ii + " 请求失败，IP被限制（Response code " + II1ll + "）";
            $.hotproxy = true;
            li11i1 = true;
          } else {
            [400, 404].includes(II1ll) ? ($.hotproxy = true, iIIIlI = li11ii + " 请求配置参数错误，请联系开发者进行反馈（Response code " + II1ll + "）") : ($.hotproxy = true, iIIIlI = li11ii + " 请求失败（Response code " + II1ll + "）");
          }
        } else {
          $.hotproxy = true;
          iIIIlI = li11ii + " 请求失败 => " + (Ii1lIl.message || Ii1lIl);
        }
      }
      I1IIii++;
    } else {
      const i1Ill = false;
      try {
        const Ii1Ili = JSON.parse(li1iI);
        l1iiIi(li11ii, Ii1Ili);
        break;
      } catch (IIiI11) {
        iIIIlI = "❌ " + li11ii + " 接口响应数据解析失败: " + IIiI11.message;
        console.log("🚫 " + li11ii + " => " + String(li1iI || "无响应数据"));
        i1Ill && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        I1IIii++;
      }
      li11i1 = false;
    }
  }
  I1IIii >= I1IIil && (console.log(iIIIlI), li11i1 && ($.outFlag = true, $.message && $.message.fix(iIIIlI)));
}
async function I1lI1i(IIlIII, i1Iil = "POST") {
  if (i1Iil === "POST") {
    return new Promise(async IIlIIi => {
      $.post(IIlIII, (iliiil, li11ll, i1Il1) => {
        IIlIIi({
          err: iliiil,
          res: li11ll,
          data: i1Il1
        });
      });
    });
  } else {
    if (i1Iil === "GET") {
      return new Promise(async IIiI1i => {
        $.get(IIlIII, (ilIllI, I1IIli, Il1I1i) => {
          IIiI1i({
            err: ilIllI,
            res: I1IIli,
            data: Il1I1i
          });
        });
      });
    } else {
      const lIilI1 = "不支持的请求方法";
      return {
        err: lIilI1,
        res: null,
        data: null
      };
    }
  }
}
function illili() {
  return new Promise(async I1IIll => {
    $.get({
      url: l1I1II,
      timeout: {
        request: 5000
      }
    }, (i1Ii1, lIilII) => {
      if (lIilII) {
        try {
          let ilIlli = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            I1IIlI = ilIlli.exec(lIilII.body);
          IiIiI1 = I1IIlI[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IiIiI1;
        } catch (ilIlll) {} finally {
          I1IIll();
        }
      }
    });
  });
}
var version_ = "jsjiami.com.v7";