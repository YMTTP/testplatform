/**
 * Created by zhousicong on 2016/1/18.
 */
var stdetailsvm = avalon.define({
    $id: 'stdetailsvm',
    stid: model.getUrlVars()["stid"],
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
    loadSTInfo: function () {
        $.ajax({
            type: "post",
            url: 'findStressTaskById.action',
            data: {
                "stresstaskid": stdetailsvm.stid
            },
            dataType: "json",
            success: function (data) {
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
                    stdetailsvm.findAppEnvByAppAndENV(data.stresstask.application.id,data.stresstask.env.id);
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    serverIP:"",
    serverCPU:"",
    serverMemory:"",
    serverHarddrive:"",
    serverOS:"",
    findAppEnvByAppAndENV: function (applicationid,envid) {
        $.ajax({
            type: "post",
            url: 'findApplicationEnvByAppAndEnv.action',
            data: {
                "applicationid": applicationid,
                "envid": envid
            },
            dataType: "json",
            success: function (data) {
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
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    appList: [],
    listApp: function () {
        $.ajax({
            type: "post",
            url: 'findAllApplications.action',
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.apps;
                    stdetailsvm.appList = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    envsList: [],
    listAppEnvs: function (appid) {
        $.ajax({
            type: "post",
            url: 'findApplicationEnvByApp.action',
            data:{
                "applicationid":appid
            },
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.appenvs;
                stdetailsvm.envsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    updateSTbasicInfo: function () {
        stdetailsvm.updateSTInfoOff = false;
        stdetailsvm.updateSTInfoOn = true;
        $('.chosen-select option[value=' + stdetailsvm.stAppId + ']').attr("selected", "selected");
        $(".chosen-select").trigger("chosen:updated");
        stdetailsvm.listAppEnvs(stdetailsvm.stAppId);
    },
    cancleSTbasicInfo: function () {
        stdetailsvm.loadSTInfo();
        stdetailsvm.updateSTInfoOff = true;
        stdetailsvm.updateSTInfoOn = false;
    },
    saveSTbasicInfo: function () {
        if (stdetailsvm.stName == "" || stdetailsvm.stAppId == "" || stdetailsvm.stEnvId == "" || stdetailsvm.stDevs == "") {
            alert("任务名、测试站点、测试环境和开发负责人不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'updateStressTask.action',
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
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    stdetailsvm.loadSTInfo();
                    stdetailsvm.updateSTInfoOff = true;
                    stdetailsvm.updateSTInfoOn = false;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
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
    loadaddSTModal: function (id) {
        if (id == "0") {
            stdetailsvm.STRUrl = stdetailsvm.STRTps = stdetailsvm.STRRt = stdetailsvm.STRCc = stdetailsvm.STRDuration = stdetailsvm.STRPR = "";
            stdetailsvm.STRserverCpu = stdetailsvm.STRserverDiskInput = stdetailsvm.STRserverDiskOutput = stdetailsvm.STRserverMemory = stdetailsvm.STRserverNetworkInput = stdetailsvm.STRserverNetworkOutput = "";
            stdetailsvm.STRmongoCpu = stdetailsvm.STRmongoDiskInput = stdetailsvm.STRmongoDiskOutput = stdetailsvm.STRmongoNetworkInput = stdetailsvm.STRmongoNetworkOutput = "";
            stdetailsvm.STRmssqlCpu = stdetailsvm.STRmssqlDiskInput = stdetailsvm.STRmssqlDiskOutput = stdetailsvm.STRmssqlNetworkInput = stdetailsvm.STRmssqlNetworkOutput = "";
            stdetailsvm.STRmysqlCpu = stdetailsvm.STRmysqlDiskInput = stdetailsvm.STRmysqlDiskOutput = stdetailsvm.STRmysqlNetworkInput = stdetailsvm.STRmysqlNetworkOutput = "";
            stdetailsvm.addSTBTN = true;
            stdetailsvm.updateSTBTN = false;
        }
        else {
            stdetailsvm.loadSTResultById(id);
            stdetailsvm.addSTBTN = false;
            stdetailsvm.updateSTBTN = true;
        }
        $('#addSTModal').modal('show');
    },
    createSTResult: function () {
        if (stdetailsvm.STRUrl == "") {
            alert("接口地址不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createTaskResult.action',
            data: {
                "stresstaskid": stdetailsvm.stid,
                "url": stdetailsvm.STRUrl,
                "tps": stdetailsvm.STRTps,
                "duration": stdetailsvm.STRDuration,
                "passrate": stdetailsvm.STRPR,
                "responseTime": stdetailsvm.STRRt,
                "concurrence": stdetailsvm.STRCc
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    stdetailsvm.listSTResults();
                    $('#addSTModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    stressResultsLists: [],
    listSTResults: function () {
        $.ajax({
            type: "post",
            url: 'findStressResultsByStressTask.action',
            data: {
                "stresstaskid": stdetailsvm.stid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.StressResults;
                    stdetailsvm.stressResultsLists = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    STRID: "",
    loadSTResultById: function (id) {
        $.ajax({
            type: "post",
            url: 'findStressResultById.action',
            data: {
                "stressresultid": id
            },
            dataType: "json",
            success: function (data) {
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
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    updateStressBaseResult: function () {
        $.ajax({
            type: "post",
            url: 'updateStressBaseResult.action',
            data: {
                "stressresultid": stdetailsvm.STRID,
                "url": stdetailsvm.STRUrl,
                "tps": stdetailsvm.STRTps,
                "duration": stdetailsvm.STRDuration,
                "passrate": stdetailsvm.STRPR,
                "responseTime": stdetailsvm.STRRt,
                "concurrence": stdetailsvm.STRCc
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    stdetailsvm.listSTResults();
                    $('#addSTModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    updateStressServerResult: function () {
        $.ajax({
            type: "post",
            url: 'updateStressServerResult.action',
            data: {
                "stressresultid": stdetailsvm.STRID,
                "serverCpu": stdetailsvm.STRserverCpu,
                "serverDiskInput": stdetailsvm.STRserverDiskInput,
                "serverDiskOutput": stdetailsvm.STRserverDiskOutput,
                "serverMemory": stdetailsvm.STRserverMemory,
                "serverNetworkInput": stdetailsvm.STRserverNetworkInput,
                "serverNetworkOutput": stdetailsvm.STRserverNetworkOutput
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    stdetailsvm.listSTResults();
                    $('#addSTServerResultModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    updateStressDbResult: function () {
        $.ajax({
            type: "post",
            url: 'updateStressDbResult.action',
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
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    stdetailsvm.listSTResults();
                    $('#addSTDBResultModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadaddSTDBResultModal: function (id) {
        stdetailsvm.loadSTResultById(id);
        $('#addSTDBResultModal').modal('show');
    },
    loadaddSTServerResultModal: function (id) {
        stdetailsvm.loadSTResultById(id);
        $('#addSTServerResultModal').modal('show');
    }
});

avalon.ready(function () {
    $(".chosen-select").chosen({
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "300px"
    });
    stdetailsvm.listApp();
    stdetailsvm.loadSTInfo();
    $(".chosen-select").chosen().change(function () {
        stdetailsvm.stAppId = this.value;
        stdetailsvm.listAppEnvs(stdetailsvm.stAppId);
    });
    stdetailsvm.listSTResults();
});

stdetailsvm.$watch("appList", function (newValue) {
    $(".chosen-select").trigger("chosen:updated");
});

