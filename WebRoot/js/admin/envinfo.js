/**
 * Created by zhousicong on 2015/12/23.
 */
var envinfovm = avalon.define({
    $id: 'envinfovm',
    //VM Start
    newEnvName: "",
    newEnvDNS: "",
    newEnvRemark: "",
    loadAddEnvModal: function () {
        envinfovm.newEnvName = "";
        envinfovm.newEnvDNS = "";
        envinfovm.newEnvDNS = "";
        $('#addEnvModal').modal('show');
    },
    createEnv: function () {
        if (envinfovm.newEnvName == "" || envinfovm.newEnvDNS == "") {
            alert("新环境名称或DNS不能为空")
            return;
        }
        $.ajax({
            type: "post",
            url: 'createEnv.action',
            data: {
                "name": envinfovm.newEnvName,
                "dns": envinfovm.newEnvDNS,
                "remark": envinfovm.newEnvRemark
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    envinfovm.newEnvName = "";
                    envinfovm.newEnvDNS = "";
                    envinfovm.newEnvRemark = "";
                    envinfovm.listEnvs();
                    $('#addEnvModal').modal('hide');
                }
                else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    envsList: [],
    listEnvs: function () {
        $.ajax({
            type: "post",
            url: 'listEnvs.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.envs;
                envinfovm.envsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyEnvId: "",
    modifyEnvName: "",
    modifyEnvDNS: "",
    modifyEnvRemark: "",
    loadModifyEnvModal: function (index) {
        envinfovm.modifyEnvId = envinfovm.envsList[index].id;
        envinfovm.modifyEnvName = envinfovm.envsList[index].name;
        envinfovm.modifyEnvDNS = envinfovm.envsList[index].dns;
        envinfovm.modifyEnvRemark = envinfovm.envsList[index].remark;
        $('#modifyEnvModal').modal('show');
    },
    modifyEnv: function () {
        $.ajax({
            type: "post",
            url: 'updateEnv.action',
            data: {
                "envid": envinfovm.modifyEnvId,
                "name": envinfovm.modifyEnvName,
                "dns": envinfovm.modifyEnvDNS,
                "remark": envinfovm.modifyEnvRemark
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    envinfovm.listEnvs();
                    $('#modifyEnvModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadEnvTAB: function () {
        envinfovm.listEnvs();
        $('#envs').tab('show');
    },
    //VM END

    //Server Start
    newServerIp: "",
    newServerCpu: "",
    newServerRam: "",
    newServerHarddrive: "",
    loadAddServerModal: function () {
        envinfovm.newServerIp = "";
        envinfovm.newServerCpu = "";
        envinfovm.newServerRam = "";
        envinfovm.newServerHarddrive = "";
        $('#addServerModal').modal('show');
    },
    createServer: function () {
        if (envinfovm.newServerIp == "") {
            alert("新服务器IP不能为空")
            return;
        }
        $.ajax({
            type: "post",
            url: 'createServerInfo.action',
            data: {
                "ip": envinfovm.newServerIp,
                "cpu": envinfovm.newServerCpu,
                "ram": envinfovm.newServerRam,
                "harddrive": envinfovm.newServerHarddrive
            },
            dataType: "json",
            success: function (data) {
                envinfovm.newServerIp = "";
                envinfovm.newServerCpu = "";
                envinfovm.newServerRam = "";
                envinfovm.newServerHarddrive = "";
                envinfovm.listServers();
                $('#addServerModal').modal('hide');
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    serversList: [],
    listServers: function () {
        $.ajax({
            type: "post",
            url: 'listServerInfos.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.serverinfos;
                envinfovm.serversList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyServerId: "",
    modifyServerIp: "",
    modifyServerCpu: "",
    modifyServerRam: "",
    modifyServerHarddrive: "",
    loadModifyServerModal: function (index) {
        envinfovm.modifyServerId = envinfovm.serversList[index].id;
        envinfovm.modifyServerIp = envinfovm.serversList[index].ip;
        envinfovm.modifyServerCpu = envinfovm.serversList[index].cpu;
        envinfovm.modifyServerRam = envinfovm.serversList[index].ram;
        envinfovm.modifyServerHarddrive = envinfovm.serversList[index].harddrive;
        $('#modifyServerModal').modal('show');
    },
    modifyServer: function () {
        $.ajax({
            type: "post",
            url: 'updateServerInfo.action',
            data: {
                "serverinfoid": envinfovm.modifyServerId,
                "cpu": envinfovm.modifyServerCpu,
                "ip": envinfovm.modifyServerIp,
                "harddrive": envinfovm.modifyServerHarddrive,
                "ram": envinfovm.modifyServerRam
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    envinfovm.listServers();
                    $('#modifyServerModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadServerTAB: function () {
        envinfovm.listServers();
        $('#envs').tab('show');
    },
    //Server END

    //VM Start
    newVMName: "",
    newVMIP: "",
    newVMCpu: "",
    newVMRam: "",
    newVMHarddrive: "",
    newVMOS: "",
    newVMServerId: "",
    loadAddVmModal: function () {
        envinfovm.listServers();
        envinfovm.newVMName = "";
        envinfovm.newVMIP = "";
        envinfovm.newVMCpu = "";
        envinfovm.newVMRam = "";
        envinfovm.newVMHarddrive = "";
        envinfovm.newVMOS = "";
        envinfovm.newVMServerId = "";
        $('#addVMModal').modal('show');
    },
    createVM: function () {
        if (envinfovm.newVMName == "" || envinfovm.newVMIP == "" || envinfovm.newVMServerId == "") {
            alert("虚拟机名称、IP或隶属服务器不能为空")
            return;
        }
        $.ajax({
            type: "post",
            url: 'createVmInfo.action',
            data: {
                "name": envinfovm.newVMName,
                "ip": envinfovm.newVMIP,
                "cpu": envinfovm.newVMCpu,
                "ram": envinfovm.newVMRam,
                "harddrive": envinfovm.newVMHarddrive,
                "os": envinfovm.newVMOS,
                "serverinfoid": envinfovm.newVMServerId
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    envinfovm.listVMS();
                    $('#addVMModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    vmsList: [],
    listVMS: function () {
        $.ajax({
            type: "post",
            url: 'listVmInfos.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.vms;
                envinfovm.vmsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyVMId: "",
    modifyVMName: "",
    modifyVMIP: "",
    modifyVMCpu: "",
    modifyVMRam: "",
    modifyVMHarddrive: "",
    modifyVMOS: "",
    modifyVMServerId: "",
    loadModifyVmModal: function (index) {
        envinfovm.listServers();
        envinfovm.modifyVMId = envinfovm.vmsList[index].id;
        envinfovm.modifyVMName = envinfovm.vmsList[index].name;
        envinfovm.modifyVMIP = envinfovm.vmsList[index].ip;
        envinfovm.modifyVMCpu = envinfovm.vmsList[index].cpu;
        envinfovm.modifyVMRam = envinfovm.vmsList[index].ram;
        envinfovm.modifyVMHarddrive = envinfovm.vmsList[index].harddrive;
        envinfovm.modifyVMOS = envinfovm.vmsList[index].os;
        envinfovm.modifyVMServerId = envinfovm.vmsList[index].serverinfo.id;
        $('#modifyVMModal').modal('show');
    },
    modifyVM: function () {
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
                "cpu": envinfovm.modifyVMCpu,
                "ram": envinfovm.modifyVMRam,
                "harddrive": envinfovm.modifyVMHarddrive,
                "os": envinfovm.modifyVMOS,
                "serverinfoid": envinfovm.modifyVMServerId
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    envinfovm.listVMS();
                    $('#modifyVMModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadVmTAB: function () {
        envinfovm.listVMS();
        $('#envs').tab('show');
    },
    //VM END

    removeItem: function (id, actionName, idName) {
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
            success: function (data) {
                if (data.retCode == "1000") {
                    if (actionName == "deleteVmInfo") {
                        envinfovm.listVMS();
                    }
                    else if (actionName == "deleteServerInfo") {
                        envinfovm.listServers();
                    }
                    else if (actionName == "deleteEnv") {
                        envinfovm.listEnvs();
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
    ops: function (opid) {
        $.ajax({
            type: "post",
            url: 'verifyAuthorization.action',
            data: {
                "id": model.getCookie("userid"),
                "permissionvalue": opid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    return true;
                }
                else {
                    return false;
                }
            },
            error: function (data) {
                alert(data.retMSG);
                return false;
            }
        });
    }
});

avalon.ready(function () {
    if (model.getCookie("token").length < 3) {
        model.redirectIndexPage();
    }
    else {
        if (envinfovm.ops(4)) {
            envinfovm.loadVmTAB();
        }
        else
            model.redirectIndexPage();
    }
});

