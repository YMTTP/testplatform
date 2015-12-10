/**
 * Created by zhousicong on 2015/10/26.
 */
var envinfovm = avalon.define({
    $id: 'envinfonvm',
    initRole: function () {
        var cookieToken = model.getCookie("token");
        if (cookieToken.length < 3) {
            window.location.href = '/html/admin/admin.html';
        }
    },
    editStatus: false,
    envsList: [],
    listEnvs: function () {
        $.ajax({
            type: "post",
            url: 'listEnvs.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.envs;
                for (var i = 0; i < data.envs.length; i++) {
                    temArr[i].modifyClass = "showIcon";
                    temArr[i].saveClass = "hideIcon";
                    temArr[i].readonly = true;
                }
                envinfovm.envsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newEnvName: "",
    newEnvDNS: "",
    newEnvRemark: "",
    addEnv: function () {
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
                envinfovm.newEnvName = "";
                envinfovm.newEnvDNS = "";
                envinfovm.newEnvRemark = "";
                envinfovm.listEnvs();
                $('#envinfoTab a:first').tab('show');
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    preModifyEnv: function (index) {
        if (envinfovm.editStatus) {
            alert("你还有尚未完成编辑的项目！")
            return;
        }
        envinfovm.editStatus = true;
        envinfovm.envsList[index].readonly = false;
        envinfovm.envsList[index].modifyClass = "hideIcon";
        envinfovm.envsList[index].saveClass = "showIcon";
    },
    cancleModifyEnv: function (index) {
        envinfovm.editStatus = false;
        envinfovm.envsList[index].readonly = true;
        envinfovm.envsList[index].modifyClass = "showIcon";
        envinfovm.envsList[index].saveClass = "hideIcon";
        envinfovm.listEnvs();
    },
    modifyEnv: function (index, id, name, dns, remark) {
        $.ajax({
            type: "post",
            url: 'updateEnv.action',
            data: {
                "envid": id,
                "name": name,
                "dns": dns,
                "remark": remark
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    envinfovm.listEnvs();
                    envinfovm.editStatus = false;
                    envinfovm.envsList[index].readonly = true;
                    envinfovm.envsList[index].modifyClass = "showIcon";
                    envinfovm.envsList[index].saveClass = "hideIcon";
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    removeEnv: function (id) {
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: 'deleteEnv.action',
            data: {
                "envid": id
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    envinfovm.listEnvs();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newServerIp: "",
    newServerCpu: "",
    newServerRam: "",
    newServerHarddrive: "",
    addServerInfo: function () {
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
                $('#envinfoTab a:eq(2)').tab('show');
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
                for (var i = 0; i < data.serverinfos.length; i++) {
                    temArr[i].modifyClass = "showIcon";
                    temArr[i].saveClass = "hideIcon";
                    temArr[i].readonly = true;
                }
                envinfovm.serversList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    preModifyServerInfo: function (index) {
        if (envinfovm.editStatus) {
            alert("你还有尚未完成编辑的项目！")
            return;
        }
        envinfovm.editStatus = true;
        envinfovm.serversList[index].readonly = false;
        envinfovm.serversList[index].modifyClass = "hideIcon";
        envinfovm.serversList[index].saveClass = "showIcon";
    },
    cancleModifyServerInfo: function (index) {
        envinfovm.editStatus = false;
        envinfovm.serversList[index].readonly = true;
        envinfovm.serversList[index].modifyClass = "showIcon";
        envinfovm.serversList[index].saveClass = "hideIcon";
        envinfovm.serversList();
    },
    removeServer: function (id) {
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: 'deleteServerInfo.action',
            data: {
                "serverinfoid": id
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    envinfovm.listServers();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyServerInfo: function (index, id, ip, cpu, ram, harddrive) {
        $.ajax({
            type: "post",
            url: 'updateServerInfo.action',
            data: {
                "serverinfoid": id,
                "cpu": cpu,
                "ip": ip,
                "harddrive": harddrive,
                "ram": ram
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    envinfovm.listServers();
                    envinfovm.editStatus = false;
                    envinfovm.serversList[index].readonly = true;
                    envinfovm.serversList[index].modifyClass = "showIcon";
                    envinfovm.serversList[index].saveClass = "hideIcon";
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });

    },
    newVMName: "",
    newVMIP: "",
    newVMCpu: "",
    newVMRam: "",
    newVMHarddrive: "",
    newVMOS: "",
    newVMServerId: "",
    addVMInfo: function () {
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
                console.log(JSON.stringify(data));
                if (data.retCode == "1000") {
                    envinfovm.newVMName = "";
                    envinfovm.newVMIP = "";
                    envinfovm.newVMCpu = "";
                    envinfovm.newVMRam = "";
                    envinfovm.newVMHarddrive = "";
                    envinfovm.newVMOS = "";
                    envinfovm.listVMS();
                    $('#envinfoTab a:eq(4)').tab('show');
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
});

envinfovm.initRole();
envinfovm.listEnvs();
envinfovm.listServers();
envinfovm.listVMS();