/**
 * Created by zhousicong on 2015/12/11.
 */
var applicationvm = avalon.define({
    $id: 'applicationvm',
    editStatus: false,
    depList: [],
    listDepartment: function () {
        $.ajax({
            type: "post",
            url: 'listDepartments.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.deps;
                applicationvm.depList = temArr;
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
                applicationvm.envsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newAppType: "",
    newAppTypeRemark: "",
    addAppType: function () {
        $.ajax({
            type: "post",
            url: 'createApplicationType.action',
            data: {
                "type": applicationvm.newAppType,
                "typeremark": applicationvm.newAppTypeRemark
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    applicationvm.newAppType = "";
                    applicationvm.newAppTypeRemark = "";
                    applicationvm.listAppType();
                    $('#applicationTab a:eq(2)').tab('show');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    applicationsList: [],
    listAppType: function () {
        $.ajax({
            type: "post",
            url: 'listApplicationTypes.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.apptypes;
                for (var i = 0; i < data.apptypes.length; i++) {
                    temArr[i].modifyClass = "showIcon";
                    temArr[i].saveClass = "hideIcon";
                    temArr[i].readonly = true;
                }
                applicationvm.applicationsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    removeAppType: function (id) {
        $.ajax({
            type: "post",
            url: 'deleteApplicationType.action',
            data: {
                "applicationtypeid": id
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    applicationvm.listAppType();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    preModifyAppType: function (index) {
        if (applicationvm.editStatus) {
            alert("你还有尚未完成编辑的项目！")
            return;
        }
        applicationvm.editStatus = true;
        applicationvm.applicationsList[index].readonly = false;
        applicationvm.applicationsList[index].modifyClass = "hideIcon";
        applicationvm.applicationsList[index].saveClass = "showIcon";
    },
    modifyAppType: function (index, id, type, remark) {
        $.ajax({
            type: "post",
            url: 'updateApplicationType.action',
            data: {
                "applicationtypeid": id,
                "type": type,
                "typeremark": remark
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    applicationvm.listAppType();
                    applicationvm.editStatus = false;
                    applicationvm.applicationsList[index].readonly = true;
                    applicationvm.applicationsList[index].modifyClass = "showIcon";
                    applicationvm.applicationsList[index].saveClass = "hideIcon";
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    cancleModifyAppType: function (index) {
        applicationvm.editStatus = false;
        applicationvm.applicationsList[index].readonly = true;
        applicationvm.applicationsList[index].modifyClass = "showIcon";
        applicationvm.applicationsList[index].saveClass = "hideIcon";
        applicationvm.listAppType();
    },
    newAppDomain: "",
    newAppName: "",
    newAppTypeId: "",
    newAppRemark: "",
    newAppDepId:"",
    addApp: function () {
        if(applicationvm.newAppDomain=="" || applicationvm.newAppTypeId==""){
            alert("站点域名或站点类型不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createApplication.action',
            data: {
                "applicationtypeid": applicationvm.newAppTypeId,
                "domain": applicationvm.newAppDomain,
                "name": applicationvm.newAppName,
                "remark": applicationvm.newAppRemark,
                "departmentid":applicationvm.newAppDepId
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    applicationvm.newAppDomain = "";
                    applicationvm.newAppName = "";
                    applicationvm.newAppTypeId = "";
                    applicationvm.newAppRemark = "";
                    applicationvm.newAppDepId = "";
                    $('#applicationTab a:first').tab('show');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});


avalon.ready(function () {
    applicationvm.listDepartment();
    applicationvm.listEnvs();
    applicationvm.listAppType();
});
