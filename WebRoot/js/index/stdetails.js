/**
 * Created by zhousicong on 2016/1/18.
 */
var stdetailsvm = avalon.define({
    $id: 'stdetailsvm',
    stid: getUrlVars()["stid"],
    updateSTInfoOff: true,
    updateSTInfoOn: false,
    stName: "",
    stAppId: "",
    stAppDomain: "",
    stEnvId: "",
    stEnvName: "",
    stDevs: "",
    stCreater: "",
    stBg: "",
    stConclusion: "",
    stStatusId: "",
    stStatus: "",
    statusBg: "",
    loadSTInfo: function() {
        zajax({
            type: "post",
            url: "findStressTaskById.action",
            data: {
                "stresstaskid": stdetailsvm.stid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    stdetailsvm.stName = data.stresstask.title;
                    stdetailsvm.stAppId = data.stresstask.application.id;
                    stdetailsvm.stAppDomain = data.stresstask.application.domain;
                    stdetailsvm.stEnvId = data.stresstask.env.id;
                    stdetailsvm.stEnvName = data.stresstask.env.name;
                    stdetailsvm.stDevs = data.stresstask.dev;
                    stdetailsvm.stCreater = data.stresstask.creator.displayname;
                    stdetailsvm.stBg = data.stresstask.background;
                    stdetailsvm.stStatusId = data.stresstask.status;
                    stdetailsvm.stConclusion = data.stresstask.conclusion;
                    if (stdetailsvm.stStatusId == "0") {
                        stdetailsvm.stStatus = "未开始";
                        stdetailsvm.statusBg = "status-NOTSTARTED";
                    } else if (stdetailsvm.stStatusId == "1") {
                        stdetailsvm.stStatus = "进行中";
                        stdetailsvm.statusBg = "status-INPROGRESS";
                    } else if (stdetailsvm.stStatusId == "2") {
                        stdetailsvm.stStatus = "搁置";
                        stdetailsvm.statusBg = "status-SHELVE";
                    } else if (stdetailsvm.stStatusId == "3") {
                        stdetailsvm.stStatus = "完成";
                        stdetailsvm.statusBg = "status-DONE";
                    }
                    stdetailsvm.findAppEnvByAppAndENV(data.stresstask.application.id, data.stresstask.env.id);
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    serverIP: "",
    serverCPU: "",
    serverMemory: "",
    serverHarddrive: "",
    serverOS: "",
    findAppEnvByAppAndENV: function(applicationid, envid) {
        zajax({
            type: "post",
            url: "findApplicationEnvByAppAndEnv.action",
            data: {
                "applicationid": applicationid,
                "envid": envid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    stdetailsvm.serverIP = data.appenv.vminfo.ip;
                    stdetailsvm.serverCPU = data.appenv.vminfo.cpu;
                    stdetailsvm.serverMemory = data.appenv.vminfo.ram;
                    stdetailsvm.serverHarddrive = data.appenv.vminfo.harddrive;
                    stdetailsvm.serverOS = data.appenv.vminfo.os;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    appList: [],
    envsList: [],
    listAppEnvs: function(appid) {
        zajax({
            type: "post",
            url: "findApplicationEnvByApp.action",
            data: {
                "applicationid": appid
            },
            success: function(data) {
                var temArr = [];
                temArr = data.appenvs;
                stdetailsvm.envsList = temArr;
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    updateSTbasicInfo: function() {
        stdetailsvm.updateSTInfoOff = false;
        stdetailsvm.updateSTInfoOn = true;
        $('.chosen-select option[value=' + stdetailsvm.stAppId + ']').attr("selected", "selected");
        $(".chosen-select").trigger("chosen:updated");
        stdetailsvm.listAppEnvs(stdetailsvm.stAppId);
    },
    cancleSTbasicInfo: function() {
        stdetailsvm.loadSTInfo();
        stdetailsvm.updateSTInfoOff = true;
        stdetailsvm.updateSTInfoOn = false;
    },
    saveSTbasicInfo: function() {
        if (stdetailsvm.stName == "" || stdetailsvm.stAppId == "" || stdetailsvm.stEnvId == "" || stdetailsvm.stDevs == "") {
            alert("任务名、测试站点、测试环境和开发负责人不能为空");
            return;
        }
        zajax({
            type: "post",
            url: "updateStressTask.action",
            data: {
                "stresstaskid": stdetailsvm.stid,
                "title": stdetailsvm.stName,
                "applicationid": stdetailsvm.stAppId,
                "envid": stdetailsvm.stEnvId,
                "dev": stdetailsvm.stDevs,
                "background": stdetailsvm.stBg,
                "status": stdetailsvm.stStatusId,
                "conclusion": stdetailsvm.stConclusion,
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    stdetailsvm.loadSTInfo();
                    stdetailsvm.updateSTInfoOff = true;
                    stdetailsvm.updateSTInfoOn = false;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    STRUrl: "",
    STRTps: "",
    STRRt: "",
    STRCc: "",
    STRDuration: "",
    STRPR: "",
    
    addSTBTN: true,
    updateSTBTN: false,
    loadaddSTModal: function(id) {
        if (id == "0") {
            stdetailsvm.STRUrl = stdetailsvm.STRTps = stdetailsvm.STRRt = stdetailsvm.STRCc = stdetailsvm.STRDuration = stdetailsvm.STRPR = "";
            stdetailsvm.addSTBTN = true;
            stdetailsvm.updateSTBTN = false;
        } else {
            stdetailsvm.loadSTResultById(id);
            stdetailsvm.addSTBTN = false;
            stdetailsvm.updateSTBTN = true;
        }
        $('#addSTModal').modal('show');
    },
    createSTResult: function() {
        if (stdetailsvm.STRUrl == "") {
            alert("接口地址不能为空");
            return;
        }
        zajax({
            type: "post",
            url: "createTaskResult.action",
            data: {
                "stresstaskid": stdetailsvm.stid,
                "url": stdetailsvm.STRUrl,
                "tps": stdetailsvm.STRTps,
                "duration": stdetailsvm.STRDuration,
                "passrate": stdetailsvm.STRPR,
                "responseTime": stdetailsvm.STRRt,
                "concurrence": stdetailsvm.STRCc
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    stdetailsvm.listSTResults();
                    $('#addSTModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    stressResultsLists: [],
    listSTResults: function() {
        zajax({
            type: "post",
            url: "findStressResultsByStressTask.action",
            data: {
                "stresstaskid": stdetailsvm.stid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.StressResults;
                    stdetailsvm.stressResultsLists = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    STRID: "",
    loadSTResultById: function(id) {
        zajax({
            type: "post",
            url: "findStressResultById.action",
            data: {
                "stressresultid": id
            },
            dataType: "json",
            success: function(data) {
                if (data.retCode == "1000") {
                    stdetailsvm.STRID = data.stressResult.id;
                    stdetailsvm.STRUrl = data.stressResult.url;
                    stdetailsvm.STRTps = data.stressResult.tps;
                    stdetailsvm.STRDuration = data.stressResult.duration;
                    stdetailsvm.STRPR = data.stressResult.passrate;
                    stdetailsvm.STRRt = data.stressResult.responseTime;
                    stdetailsvm.STRCc = data.stressResult.concurrence;
                    
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    updateStressBaseResult: function() {
        zajax({
            type: "post",
            url: "updateStressBaseResult.action",
            data: {
                "stressresultid": stdetailsvm.STRID,
                "url": stdetailsvm.STRUrl,
                "tps": stdetailsvm.STRTps,
                "duration": stdetailsvm.STRDuration,
                "passrate": stdetailsvm.STRPR,
                "responseTime": stdetailsvm.STRRt,
                "concurrence": stdetailsvm.STRCc
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    stdetailsvm.listSTResults();
                    $('#addSTModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
   
    isTester: false,
    isTesterFunc: function () {
        if (model.getCookie("token").length < 3) {
            stdetailsvm.isTester = false;
            return;
        };
        $.ajax({
            type: "post",
            url: 'verifyAuthorization.action',
            data: {
                "id": model.getCookie("userid"),
                "permissionvalue": 2
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    stdetailsvm.isTester = true;
                }
                else {
                    stdetailsvm.isTester = false;
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
	currentMonitorItemId:"",
    monitorItemList:[],
    monitorItemId:"",
    
    startMonitorBTN:false,
    endMonitorBTN:false,
    
    listMonitorItem: function () {
    	
        $.ajax({
            type: "post",
            url: 'findMonitorRelatedItemByStressTaskId.action',
            data: {
                "stressTaskId": stdetailsvm.stid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    stdetailsvm.monitorItemList = data.items;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },    
   
	currentTime:function()	{
		var d = new Date(),str = '';
		 str += d.getFullYear()+'-';
		 str  += d.getMonth() + 1+'-';
		 str  += d.getDate()+' ';
		 str += d.getHours()+':'; 
		 str  += d.getMinutes()+':'; 
		str+= d.getSeconds(); 
		return str;
	},

configStrs:[],

times:[],
cpus:[],
cpus1:[],
cpus2:[],
cpus3:[],
memorys:[],
dReads:[],
dWrites:[],
nReceives:[],
nSends:[],

curentMonitorItem:0,

viewMonitorItem:function (id) {
	stdetailsvm.currentMonitorItemId=id;
	 $('#showMonitorInfoModal').modal('show');
     stdetailsvm.refreshMonitorInfo();
},
showMonitorItem:function (index) {
	stdetailsvm.curentMonitorItem=index;
	$.fourareachart($(".chartdiv1"),stdetailsvm.times[index], stdetailsvm.cpus[index], stdetailsvm.cpus1[index], stdetailsvm.cpus2[index], stdetailsvm.cpus3[index]);
  $.oneinfochart($(".chartdiv2"), "内存使用情况(MB)", "Memory", "MB",stdetailsvm.times[index], stdetailsvm.memorys[index]);
    $.twoinfochart($(".chartdiv3"), "磁盘IO（KB/s）", "Disk（I/O）Read","Disk（I/O）Write", "（KB/s）",stdetailsvm.times[index], stdetailsvm.dReads[index], stdetailsvm.dWrites[index]);
    $.twoinfochart($(".chartdiv4"), "网络IO（KB/s)", "Network（I/O）Input", "Network（I/O）Output", "（KB/s）", stdetailsvm.times[index], stdetailsvm.nReceives[index], stdetailsvm.nSends[index]);
},

refreshMonitorInfo:function () {
	
	 $.ajax({
        type: "post",
        url: 'getMonitorInfoByItemId.action',
        data: {
            "itemId": stdetailsvm.currentMonitorItemId
        },
        dataType: "json",
        success: function (data) {
            if (data.retCode == "1000") {
           	 stdetailsvm.configStrs=data.configStrs;
           	 
           	 stdetailsvm.times=data.times;
           	 stdetailsvm.cpus=data.cpus;
           	stdetailsvm.cpus1=data.cpus1;
           	stdetailsvm.cpus2=data.cpus2;
           	stdetailsvm.cpus3=data.cpus3;
           	 stdetailsvm.memorys=data.memorys;
           	 stdetailsvm.dReads=data.dReads;
           	 stdetailsvm.dWrites=data.dWrites;
           	 stdetailsvm.nReceives=data.nReceives;
           	 stdetailsvm.nSends=data.nSends;
           	 

       		 stdetailsvm.showMonitorItem(stdetailsvm.curentMonitorItem);
           	 //$.oneinfochart($(".chartdiv1"), "CPU占用率(%)", "CPU", "%",results.Data.times, results.Data.cpus);
           	/*for(var i=0;i<stdetailsvm.configStrs.length;i++)
           		 {
           		 stdetailsvm.showMonitorItem(i);
           		 }*/
           	 
            } else {
                alert(data.retMSG);
            }
        },
        error: function (data) {
            alert(data.retMSG);
        }
    });
}

});

avalon.ready(function() {
    $(".chosen-select").chosen({
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "300px"
    });
    stdetailsvm.isTester = isTesterFunc();
    stdetailsvm.appList = getAllApps();
    stdetailsvm.loadSTInfo();
    stdetailsvm.listMonitorItem();
    $(".chosen-select").chosen().change(function () {
        stdetailsvm.stAppId = this.value;
        stdetailsvm.listAppEnvs(stdetailsvm.stAppId);
    });
    stdetailsvm.listSTResults();
});

stdetailsvm.$watch("appList", function(newValue) {
    $(".chosen-select").trigger("chosen:updated");
});
