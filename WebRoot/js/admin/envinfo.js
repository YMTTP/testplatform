/**
 * Created by zhousicong on 2015/12/23.
 */
var envinfovm = avalon.define({
    $id: 'envinfovm',
    //ENV Start
    newEnvName: "",
    newEnvDNS: "",
    newEnvRemark: "",
    loadAddEnvModal: function() {
        envinfovm.newEnvName = "";
        envinfovm.newEnvDNS = "";
        envinfovm.newEnvRemark = "";
        $('#addEnvModal').modal('show');
    },
    createEnv: function() {
        if (envinfovm.newEnvName == "" || envinfovm.newEnvDNS == "") {
            alert("新环境名称或DNS不能为空")
            return;
        }
        zajax({
            type: "post",
            url: "createEnv.action",
            data: {
                "name": envinfovm.newEnvName,
                "dns": envinfovm.newEnvDNS,
                "remark": envinfovm.newEnvRemark
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    envinfovm.envsList = getAllEnvs();
                    $('#addEnvModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    envsList: getAllEnvs(),
    modifyEnvId: "",
    modifyEnvName: "",
    modifyEnvDNS: "",
    modifyEnvRemark: "",
    loadModifyEnvModal: function(index) {
        envinfovm.modifyEnvId = envinfovm.envsList[index].id;
        envinfovm.modifyEnvName = envinfovm.envsList[index].name;
        envinfovm.modifyEnvDNS = envinfovm.envsList[index].dns;
        envinfovm.modifyEnvRemark = envinfovm.envsList[index].remark;
        $('#modifyEnvModal').modal('show');
    },
    modifyEnv: function() {
        zajax({
            type: "post",
            url: "updateEnv.action",
            data: {
                "envid": envinfovm.modifyEnvId,
                "name": envinfovm.modifyEnvName,
                "dns": envinfovm.modifyEnvDNS,
                "remark": envinfovm.modifyEnvRemark
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    envinfovm.envsList = getAllEnvs();
                    $('#modifyEnvModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    loadEnvTAB: function() {
        envinfovm.envsList = getAllEnvs();
        $('#envs').tab('show');
    },
    //ENV END

    //Server Start
    newServerIp: "",
    newServerCpu: "",
    newServerRam: "",
    newServerHarddrive: "",
    loadAddServerModal: function() {
        envinfovm.newServerIp = "";
        envinfovm.newServerCpu = "";
        envinfovm.newServerRam = "";
        envinfovm.newServerHarddrive = "";
        $('#addServerModal').modal('show');
    },
    createServer: function() {
        if (envinfovm.newServerIp == "") {
            alert("新服务器IP不能为空")
            return;
        }
        zajax({
            type: "post",
            url: "createServerInfo.action",
            data: {
                "ip": envinfovm.newServerIp,
                "cpu": envinfovm.newServerCpu,
                "ram": envinfovm.newServerRam,
                "harddrive": envinfovm.newServerHarddrive
            },
            success: function(data) {
                envinfovm.newServerIp = "";
                envinfovm.newServerCpu = "";
                envinfovm.newServerRam = "";
                envinfovm.newServerHarddrive = "";
                envinfovm.serversList = getAllServers();
                $('#addServerModal').modal('hide');
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    serversList: getAllServers(),
    modifyServerId: "",
    modifyServerIp: "",
    modifyServerCpu: "",
    modifyServerRam: "",
    modifyServerHarddrive: "",
    loadModifyServerModal: function(index) {
        envinfovm.modifyServerId = envinfovm.serversList[index].id;
        envinfovm.modifyServerIp = envinfovm.serversList[index].ip;
        envinfovm.modifyServerCpu = envinfovm.serversList[index].cpu;
        envinfovm.modifyServerRam = envinfovm.serversList[index].ram;
        envinfovm.modifyServerHarddrive = envinfovm.serversList[index].harddrive;
        $('#modifyServerModal').modal('show');
    },
    modifyServer: function() {
        zajax({
            type: "post",
            url: "updateServerInfo.action",
            data: {
                "serverinfoid": envinfovm.modifyServerId,
                "cpu": envinfovm.modifyServerCpu,
                "ip": envinfovm.modifyServerIp,
                "harddrive": envinfovm.modifyServerHarddrive,
                "ram": envinfovm.modifyServerRam
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    envinfovm.serversList = getAllServers();
                    $('#modifyServerModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    loadServerTAB: function() {
        envinfovm.serversList = getAllServers();
        $('#servers').tab('show');
    },
    //Server END

    //VM Start
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function(pgsize) {
        envinfovm.jpageSize = pgsize;
        envinfovm.listVmInfosByPage("init");
    },
    clearsearch: function() {
        envinfovm.conRemark = "";
        envinfovm.listVmInfosByPage("init");
    },
    jpageIndex: 1,
    jpageSize: 20,
    conRemark: "",
    listVmInfosByPage: function(tag) {
        if (tag) {
            envinfovm.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listVmInfosByPage.action',
            data: {
                "pageindex": envinfovm.jpageIndex,
                "pagesize": envinfovm.jpageSize,
                "remark": envinfovm.conRemark
            },
            dataType: "json",
            success: function(data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: envinfovm.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var tempArr = [];
                    for (i = 0; i < data.vms.length; i++) {
                        var temObj = new Object();
                        temObj.vm = data.vms[i];
                        temObj.count = data.count[i];
                        tempArr[i] = temObj;
                    }
                    envinfovm.vmsList = tempArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    newVMName: "",
    newVMIP: "",
    newVMServerId: "",
    newVMOS: "",
    newVMRemark: "",
    loadAddVmModal: function() {
        envinfovm.serversList = getAllServers();
        envinfovm.newVMName = "";
        envinfovm.newVMIP = "";
        envinfovm.newVMOS = "";
        envinfovm.newVMRemark = "";
        envinfovm.newVMServerId = "";
        $('#addVMModal').modal('show');
    },
    createVM: function() {
        if (envinfovm.newVMName == "" || envinfovm.newVMIP == "" || envinfovm.newVMServerId == "") {
            alert("虚拟机名称、IP或隶属服务器不能为空")
            return;
        }
        zajax({
            type: "post",
            url: "createVmInfo.action",
            data: {
                "name": envinfovm.newVMName,
                "ip": envinfovm.newVMIP,
                "serverinfoid": envinfovm.newVMServerId,
                "os": envinfovm.newVMOS,
                "remark": envinfovm.newVMRemark
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    envinfovm.listVmInfosByPage("init");
                    $('#addVMModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    vmsList: [],
    modifyVMId: "",
    modifyVMName: "",
    modifyVMIP: "",
    modifyVMOS: "",
    modifyVMRemark: "",
    modifyVMServerId: "",
    loadModifyVmModal: function(index) {
        envinfovm.serversList = getAllServers();
        envinfovm.modifyVMId = envinfovm.vmsList[index].vm.id;
        envinfovm.modifyVMName = envinfovm.vmsList[index].vm.name;
        envinfovm.modifyVMIP = envinfovm.vmsList[index].vm.ip;
        envinfovm.modifyVMOS = envinfovm.vmsList[index].vm.os;
        envinfovm.modifyVMRemark = envinfovm.vmsList[index].vm.remark;
        envinfovm.modifyVMServerId = envinfovm.vmsList[index].vm.serverinfo.id;
        $('#modifyVMModal').modal('show');
    },
    modifyVM: function() {
        if (envinfovm.modifyVMName == "" || envinfovm.modifyVMIP == "" || envinfovm.modifyVMServerId == "") {
            alert("虚拟机名称、IP或隶属服务器不能为空")
            return;
        }
        $.ajax({
            type: "post",
            url: 'updateVmInfo.action',
            data: {
                "vminfoid": envinfovm.modifyVMId,
                "name": envinfovm.modifyVMName,
                "ip": envinfovm.modifyVMIP,
                "os": envinfovm.modifyVMOS,
                "remark": envinfovm.modifyVMRemark,
                "serverinfoid": envinfovm.modifyVMServerId
            },
            dataType: "json",
            success: function(data) {
                if (data.retCode == "1000") {
                    envinfovm.listVmInfosByPage("init");
                    $('#modifyVMModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    loadVmTAB: function() {
        envinfovm.listVmInfosByPage("init");
        $('#vms').tab('show');
    },
    //VM END

    removeItem: function(id, actionName, idName) {
        var actitonUrl = actionName + ".action";
        var params = '{"' + idName + '":' + id + '}';
        params = JSON.parse(params);
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: actitonUrl,
            data: params,
            dataType: "json",
            success: function(data) {
                if (data.retCode == "1000") {
                    if (actionName == "deleteVmInfo") {
                        envinfovm.listVmInfosByPage("init");
                    } else if (actionName == "deleteServerInfo") {
                        envinfovm.serversList = getAllServers();
                    } else if (actionName == "deleteEnv") {
                        envinfovm.envsList = getAllEnvs();
                    }
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    userOps: ops(4),
    bootpagFuc: function() {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function(event, num) {
            envinfovm.jpageIndex = num;
            envinfovm.listVmInfosByPage();
        });
    }
});

avalon.ready(function() {
    if (envinfovm.userOps) {
        envinfovm.loadVmTAB();
    } else {
        redirectAdminIndexPage();
    }
    envinfovm.bootpagFuc();
});


envinfovm.$watch("jpageSize", function(newValue) {
    envinfovm.pagesize1Cls = "";
    envinfovm.pagesize2Cls = "";
    envinfovm.pagesize3Cls = "";
    if (newValue == envinfovm.pagesize1) {
        envinfovm.pagesize1Cls = "pageSizeSelected";
    } else if (newValue == envinfovm.pagesize2) {
        envinfovm.pagesize2Cls = "pageSizeSelected";
    } else if (newValue == envinfovm.pagesize3) {
        envinfovm.pagesize3Cls = "pageSizeSelected";
    }
})