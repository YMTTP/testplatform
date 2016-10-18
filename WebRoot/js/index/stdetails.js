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
    STRserverCpu: "",
    STRserverDiskInput: "",
    STRserverDiskOutput: "",
    STRserverMemory: "",
    STRserverNetworkInput: "",
    STRserverNetworkOutput: "",
    STRmongoCpu: "",
    STRmongoDiskInput: "",
    STRmongoDiskOutput: "",
    STRmongoNetworkInput: "",
    STRmongoNetworkOutput: "",
    STRmssqlCpu: "",
    STRmssqlDiskInput: "",
    STRmssqlDiskOutput: "",
    STRmssqlNetworkInput: "",
    STRmssqlNetworkOutput: "",
    STRmysqlCpu: "",
    STRmysqlDiskInput: "",
    STRmysqlDiskOutput: "",
    STRmysqlNetworkInput: "",
    STRmysqlNetworkOutput: "",
    addSTBTN: true,
    updateSTBTN: false,
    loadaddSTModal: function(id) {
        if (id == "0") {
            stdetailsvm.STRUrl = stdetailsvm.STRTps = stdetailsvm.STRRt = stdetailsvm.STRCc = stdetailsvm.STRDuration = stdetailsvm.STRPR = "";
            stdetailsvm.STRserverCpu = stdetailsvm.STRserverDiskInput = stdetailsvm.STRserverDiskOutput = stdetailsvm.STRserverMemory = stdetailsvm.STRserverNetworkInput = stdetailsvm.STRserverNetworkOutput = "";
            stdetailsvm.STRmongoCpu = stdetailsvm.STRmongoDiskInput = stdetailsvm.STRmongoDiskOutput = stdetailsvm.STRmongoNetworkInput = stdetailsvm.STRmongoNetworkOutput = "";
            stdetailsvm.STRmssqlCpu = stdetailsvm.STRmssqlDiskInput = stdetailsvm.STRmssqlDiskOutput = stdetailsvm.STRmssqlNetworkInput = stdetailsvm.STRmssqlNetworkOutput = "";
            stdetailsvm.STRmysqlCpu = stdetailsvm.STRmysqlDiskInput = stdetailsvm.STRmysqlDiskOutput = stdetailsvm.STRmysqlNetworkInput = stdetailsvm.STRmysqlNetworkOutput = "";
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
                    stdetailsvm.STRserverCpu = data.stressResult.serverCpu;
                    stdetailsvm.STRserverDiskInput = data.stressResult.serverDiskInput;
                    stdetailsvm.STRserverDiskOutput = data.stressResult.serverDiskOutput;
                    stdetailsvm.STRserverMemory = data.stressResult.serverMemory;
                    stdetailsvm.STRserverNetworkInput = data.stressResult.serverNetworkInput;
                    stdetailsvm.STRserverNetworkOutput = data.stressResult.serverNetworkOutput;
                    stdetailsvm.STRmongoCpu = data.stressResult.mongoCpu;
                    stdetailsvm.STRmongoDiskInput = data.stressResult.mongoDiskInput;
                    stdetailsvm.STRmongoDiskOutput = data.stressResult.mongoDiskOutput;
                    stdetailsvm.STRmongoNetworkInput = data.stressResult.mongoNetworkInput;
                    stdetailsvm.STRmongoNetworkOutput = data.stressResult.mongoNetworkOutput;
                    stdetailsvm.STRmssqlCpu = data.stressResult.mssqlCpu;
                    stdetailsvm.STRmssqlDiskInput = data.stressResult.mssqlDiskInput;
                    stdetailsvm.STRmssqlDiskOutput = data.stressResult.mssqlDiskOutput;
                    stdetailsvm.STRmssqlNetworkInput = data.stressResult.mssqlNetworkInput;
                    stdetailsvm.STRmssqlNetworkOutput = data.stressResult.mssqlNetworkOutput;
                    stdetailsvm.STRmysqlCpu = data.stressResult.mysqlCpu;
                    stdetailsvm.STRmysqlDiskInput = data.stressResult.mysqlDiskInput;
                    stdetailsvm.STRmysqlDiskOutput = data.stressResult.mysqlDiskOutput;
                    stdetailsvm.STRmysqlNetworkInput = data.stressResult.mysqlNetworkInput;
                    stdetailsvm.STRmysqlNetworkOutput = data.stressResult.mysqlNetworkOutput;
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
    updateStressServerResult: function() {
        zajax({
            type: "post",
            url: "updateStressServerResult.action",
            data: {
                "stressresultid": stdetailsvm.STRID,
                "serverCpu": stdetailsvm.STRserverCpu,
                "serverDiskInput": stdetailsvm.STRserverDiskInput,
                "serverDiskOutput": stdetailsvm.STRserverDiskOutput,
                "serverMemory": stdetailsvm.STRserverMemory,
                "serverNetworkInput": stdetailsvm.STRserverNetworkInput,
                "serverNetworkOutput": stdetailsvm.STRserverNetworkOutput
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    stdetailsvm.listSTResults();
                    $('#addSTServerResultModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    updateStressDbResult: function() {
        zajax({
            type: "post",
            url: "updateStressDbResult.action",
            data: {
                "stressresultid": stdetailsvm.STRID,
                "mongoCpu": stdetailsvm.STRmongoCpu,
                "mongoDiskInput": stdetailsvm.STRmongoDiskInput,
                "mongoDiskOutput": stdetailsvm.STRmongoDiskOutput,
                "mongoNetworkInput": stdetailsvm.STRmongoNetworkInput,
                "mongoNetworkOutput": stdetailsvm.STRmongoNetworkOutput,
                "mssqlCpu": stdetailsvm.STRmssqlCpu,
                "mssqlDiskInput": stdetailsvm.STRmssqlDiskInput,
                "mssqlDiskOutput": stdetailsvm.STRmssqlDiskOutput,
                "mssqlNetworkInput": stdetailsvm.STRmssqlNetworkInput,
                "mssqlNetworkOutput": stdetailsvm.STRmssqlNetworkOutput,
                "mysqlCpu": stdetailsvm.STRmysqlCpu,
                "mysqlDiskInput": stdetailsvm.STRmysqlDiskInput,
                "mysqlDiskOutput": stdetailsvm.STRmysqlDiskOutput,
                "mysqlNetworkInput": stdetailsvm.STRmysqlNetworkInput,
                "mysqlNetworkOutput": stdetailsvm.STRmysqlNetworkOutput
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    stdetailsvm.listSTResults();
                    $('#addSTDBResultModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    loadaddSTDBResultModal: function(id) {
        stdetailsvm.loadSTResultById(id);
        $('#addSTDBResultModal').modal('show');
    },
    loadaddSTServerResultModal: function(id) {
        stdetailsvm.loadSTResultById(id);
        $('#addSTServerResultModal').modal('show');
    },
<<<<<<< HEAD
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
    monitorConfigList: [],
    monitorVmInfos: [],
    
    monitorConfigId:"",
    monitorVmId:0,
    monitorVmIp:"",
    monitorVmName:"",
    monitorIsActive:"",
    monitorComment:"",
    
    monitorLast:"",
    itemComment:"",
    
    addSTCBTN:false,
    updateSTCBTN:false,
 
    listMonitorConfig: function () {    	
        $.ajax({
            type: "post",
            url: 'findStressMonitorConfigListByTaskId.action',
            data: {
                "taskId": stdetailsvm.stid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    stdetailsvm.monitorConfigList = data.StressMonitorConfigs;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    loadVmList: function () {
        $.ajax({
            type: "post",
            url: 'listVmInfos.action',
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.vms;
                    stdetailsvm.monitorVmInfos = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    loadaddSTCModal: function (id) {
    	//stdetailsvm.loadVmList();
        if (id == "0") {
            stdetailsvm.monitorVmIp = stdetailsvm.monitorIsActive = stdetailsvm.monitorComment = "";
            stdetailsvm.addSTCBTN = true;
            stdetailsvm.updateSTCBTN = false;
        }
        else {
        	stdetailsvm.monitorConfigId=id;
            stdetailsvm.loadSTMonitorConfigById(id);
            stdetailsvm.addSTCBTN = false;
            stdetailsvm.updateSTCBTN = true;
        }
        $('#addSTCModal').modal('show');
    },
    
    loadSTMonitorConfigById: function (id) {
        $.ajax({
            type: "post",
            url: 'findStressMonitorConfigById.action',
            data: {
                "configId": id
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    stdetailsvm.monitorConfigId = data.StressMonitorConfig.id;
                    stdetailsvm.monitorVmId = data.StressMonitorConfig.vm.id;
                    stdetailsvm.monitorVmIp = data.StressMonitorConfig.vm.ip;
                    stdetailsvm.monitorVmName = data.StressMonitorConfig.vm.name;
                    stdetailsvm.monitorIsActive = data.StressMonitorConfig.isActive;
                    stdetailsvm.monitorComment = data.StressMonitorConfig.comment;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    createSTMonitorConfig: function () {
        if (stdetailsvm.stid == "") {
            alert("taskId不能为空");
            return;
        }
        if (stdetailsvm.monitorVmIp == "") {
            alert("机器不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createStressMonitorConfig.action',
            data: {
                "taskId": stdetailsvm.stid,
                "vmIp": stdetailsvm.monitorVmIp,
                "isActive": stdetailsvm.monitorIsActive,
                "configComment": stdetailsvm.monitorComment
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    stdetailsvm.listMonitorConfig();
                    $('#addSTCModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    updateSTMonitorConfig: function (id) {
        if (stdetailsvm.stid == "") {
            alert("taskId不能为空");
            return;
        }
        if (stdetailsvm.monitorVmIp == "") {
            alert("机器不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'updateStressMonitorConfig.action',
            data: {
            	"configId":stdetailsvm.monitorConfigId,
                "taskId": stdetailsvm.stid,
                "vmIp": stdetailsvm.monitorVmIp,
                "isActive": stdetailsvm.monitorIsActive,
                "configComment": stdetailsvm.monitorComment
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    stdetailsvm.listMonitorConfig();
                    $('#addSTCModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    loadStartMonitorModal: function () {
        $('#startMonitorModal').modal('show');
    },
    

	currentMonitorItemId:"",
    configItemList:[],
    configItemId:"",
    configItemComment:"",
    configItemStartTime:"",
    configItemEndTime:"",
    
    startMonitorBTN:false,
    endMonitorBTN:false,
    
    listMonitorItem: function () {
    	
    	stdetailsvm.getCurrentMonitorItem();
    	
        $.ajax({
            type: "post",
            url: 'findStressMonitorItemByTaskId.action',
            data: {
                "taskId": stdetailsvm.stid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    stdetailsvm.configItemList = data.items;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    getCurrentMonitorItem: function () {
        $.ajax({
            type: "post",
            url: 'getCurrentMonitorItem.action',
            data: {
                "taskId": stdetailsvm.stid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                	stdetailsvm.currentMonitorItemId=data.id;
                	if(data.id==0)
                		{
                			stdetailsvm.startMonitorBTN=true;
                			stdetailsvm.endMonitorBTN=false;                			
                		}
                	else
                		{
                		stdetailsvm.startMonitorBTN=false;
            			stdetailsvm.endMonitorBTN=true;
                		}
                    
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    startMonitor:function(){
		 $.ajax({
	            type: "post",
	            url: 'startMonitor.action',
	            data: {
	                "taskId": stdetailsvm.stid,
	                "last": stdetailsvm.monitorLast,
	                "itemComment": stdetailsvm.itemComment
	            },
	            dataType: "json",
	            success: function (data) {
	                if (data.retCode == "1000") {
	                	var itemId = data.itemId;
	                	
	                	stdetailsvm.listMonitorItem();
	                    $('#startMonitorModal').modal('hide');
	                    
	                    stdetailsvm.endMonitorBTN=true;
	                    stdetailsvm.startMonitorBTN=false;
	                    
	                	stdetailsvm.postStartMonitor(itemId);
	                	
	                } else {
	                    alert(data.retMSG);
	                }
	            },
	            error: function (data) {
	                alert(data.retMSG);
	            }
	        });
	},
	
	postStartMonitor:function (itemId) {
		for(var i=0;i<stdetailsvm.monitorConfigList.length;i++)
		{
		var element = stdetailsvm.monitorConfigList[i];
		if(element.isActive==true)
		{
			/*
			 var pack = new Object();
		        pack.configId = stdetailsvm.monitorConfigList[i].id;
		        pack.itemId = itemId;
		        pack.startTime = stdetailsvm.currentTime();
		        pack.lastTime = stdetailsvm.monitorLast;
		        pack.ReCallUrl =  "http://172.16.13.10:8080";
		        var submitData = JSON.stringify(pack);
		        
			 $.ajax({
		            type: "POST",
		            crossDomain:true,
		            url: 'http://'+element.vm.ip+':8034/Monitor/StartMonitorMachine',
		            data: submitData,
		            dataType: "json",
		            contentType: "application/json",
		            crossDomain: true,
		            success: function (data) {
		                if (data.Data == "0") {
		  
		                } else {
		                    alert("向服务器发送监控指令失败。"+data.Message);
		                }
		            },
		            error: function (data) {
		                alert(data.retMSG);
		            }
		        });*/
			
//			$.getJSON("http://localhost:58949/Monitor/StartMonitorMachine?name1=11&jsoncallback=?",{
//                "configId": stdetailsvm.monitorConfigList[i].id,
//                "itemId": itemId,
//                //"startTime": new Date().toLocaleString(),
//                "startTime": stdetailsvm.currentTime(),
//                "lastTime": stdetailsvm.monitorLast,
//                //"ReCallUrl": window.location.host
//                "ReCallUrl": "http://172.16.13.10:8008",
//                "ip":element.vm.ip
//            },function(result){
//				      alert("sdfsd")
//				        });
//				return;
		$.ajax({
			//contenType: "application/x-www-form-urlencoded",
            type: "GET",
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            url: 'http://'+element.vm.ip+':8034/Monitor/StartMonitorMachine',
//            url: 'http://localhost:58949/Monitor/StartMonitorMachine',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin","*");
            },
            data: {
                "configId": stdetailsvm.monitorConfigList[i].id,
                "itemId": itemId,
                //"startTime": new Date().toLocaleString(),
                "startTime": stdetailsvm.currentTime(),
                "lastTime": stdetailsvm.monitorLast,
                //"ReCallUrl": window.location.host
                "ReCallUrl": "http://172.16.13.10:8008",
                "ip":element.vm.ip
            },
            success: function (data) {
                if (data.Data == "0") {
//                	alert("向服务器发送启动监控指令成功。");
                } else {
                    alert("向服务器发送监控指令失败。"+data.Message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
            }
        });
		
		}

		}
	},
	
	postStopMonitor:function () {
		for(var i=0;i<stdetailsvm.monitorConfigList.length;i++)
		{
		var element = stdetailsvm.monitorConfigList[i];
		if(element.isActive==true)
		{
		
		$.ajax({
			//contenType: "application/x-www-form-urlencoded",
            type: "GET",
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            url: 'http://'+element.vm.ip+':8034/Monitor/StopMonitorMachine',
//            url: 'http://localhost:58949/Monitor/StopMonitorMachine',
//            beforeSend: function (xhr) {
//                xhr.setRequestHeader("Access-Control-Allow-Origin","*");
//            },

            success: function (data) {
                if (data.Data == "0") {
//                	 alert("向服务器发送停止监控指令成功。");
                } else {
                    alert("向服务器发送停止监控指令失败。"+data.Message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+ ",<br/>"+XMLHttpRequest.readyState+  ",<br/>"+XMLHttpRequest.responseText+",<br/>Error:"+errorThrown+",<br/>textStatus:"+textStatus);
            }
        });
		
		}

		}
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
	stopMonitor:function () {
	if(confirm("是否确认停止监控！"))
		{
	  $.ajax({
          type: "post",
          url: 'stopMonitor.action',
          data: {
              "currentItemId": stdetailsvm.currentMonitorItemId
          },
          dataType: "json",
          success: function (data) {
              if (data.retCode == "1000") {
                  stdetailsvm.listMonitorItem();
                  
                  stdetailsvm.endMonitorBTN=false;
                  stdetailsvm.startMonitorBTN=true;
                  
                  stdetailsvm.postStopMonitor();
              } else {
                  alert(data.retMSG);
              }
          },
          error: function (data) {
              alert(data.retMSG);
          }
      });
		}
},
configStrs:[],

times:[],
cpus:[],
memorys:[],
dReads:[],
dWrites:[],
nReceives:[],
nSends:[],

viewMonitorItem:function (id) {
	stdetailsvm.currentMonitorItemId=id;
	 $.ajax({
         type: "post",
         url: 'getStressMonitorInfo.action',
         data: {
        	 "taskId": stdetailsvm.stid,
             "itemId": id
         },
         dataType: "json",
         success: function (data) {
             if (data.retCode == "1000") {
            	 $('#showMonitorInfoModal').modal('show');
            	 stdetailsvm.configStrs=data.configStrs;
            	 
            	 stdetailsvm.times=data.times;
            	 stdetailsvm.cpus=data.cpus;
            	 stdetailsvm.memorys=data.memorys;
            	 stdetailsvm.dReads=data.dReads;
            	 stdetailsvm.dWrites=data.dWrites;
            	 stdetailsvm.nReceives=data.nReceives;
            	 stdetailsvm.nSends=data.nSends;
            	 

        		 stdetailsvm.showMonitorItem(0);
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
},
showMonitorItem:function (index) {
	$.oneinfochart($(".chartdiv1"), "CPU占用率(%)", "CPU", "%",stdetailsvm.times[index], stdetailsvm.cpus[index]);
    $.oneinfochart($(".chartdiv2"), "内存使用情况(MB)", "Memory", "MB",stdetailsvm.times[index], stdetailsvm.memorys[index]);
    $.twoinfochart($(".chartdiv3"), "磁盘IO（KB/s）", "Disk（I/O）Read","Disk（I/O）Write", "（KB/s）",stdetailsvm.times[index], stdetailsvm.dReads[index], stdetailsvm.dWrites[index]);
    $.twoinfochart($(".chartdiv4"), "网络IO（KB/s)", "Network（I/O）Receive", "Network（I/O）Write", "（KB/s）", stdetailsvm.times[index], stdetailsvm.nReceives[index], stdetailsvm.nSends[index]);
},

refreshMonitorInfo:function () {
	
	 $.ajax({
        type: "post",
        url: 'getStressMonitorInfo.action',
        data: {
       	 "taskId": stdetailsvm.stid,
            "itemId": stdetailsvm.currentMonitorItemId
        },
        dataType: "json",
        success: function (data) {
            if (data.retCode == "1000") {
           	 stdetailsvm.configStrs=data.configStrs;
           	 
           	 stdetailsvm.times=data.times;
           	 stdetailsvm.cpus=data.cpus;
           	 stdetailsvm.memorys=data.memorys;
           	 stdetailsvm.dReads=data.dReads;
           	 stdetailsvm.dWrites=data.dWrites;
           	 stdetailsvm.nReceives=data.nReceives;
           	 stdetailsvm.nSends=data.nSends;
           	 

       		 stdetailsvm.showMonitorItem(0);
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
=======
    isTester: false
>>>>>>> 59813c724871457e986e2f48ae15510ef7db5c0b
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
<<<<<<< HEAD
    stdetailsvm.listMonitorConfig();
    stdetailsvm.listMonitorItem();
    $(".chosen-select").chosen().change(function () {
=======
    $(".chosen-select").chosen().change(function() {
>>>>>>> 59813c724871457e986e2f48ae15510ef7db5c0b
        stdetailsvm.stAppId = this.value;
        stdetailsvm.listAppEnvs(stdetailsvm.stAppId);
    });
    stdetailsvm.listSTResults();
});

stdetailsvm.$watch("appList", function(newValue) {
    $(".chosen-select").trigger("chosen:updated");
});