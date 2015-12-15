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
    vmsList: [],
    listVMS: function () {
        $.ajax({
            type: "post",
            url: 'listVmInfos.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.vms;
                applicationvm.vmsList = temArr;
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
    applicationsTypeList: [],
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
                applicationvm.applicationsTypeList = temArr;
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
        applicationvm.applicationsTypeList[index].readonly = false;
        applicationvm.applicationsTypeList[index].modifyClass = "hideIcon";
        applicationvm.applicationsTypeList[index].saveClass = "showIcon";
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
                    applicationvm.applicationsTypeList[index].readonly = true;
                    applicationvm.applicationsTypeList[index].modifyClass = "showIcon";
                    applicationvm.applicationsTypeList[index].saveClass = "hideIcon";
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
        applicationvm.applicationsTypeList[index].readonly = true;
        applicationvm.applicationsTypeList[index].modifyClass = "showIcon";
        applicationvm.applicationsTypeList[index].saveClass = "hideIcon";
        applicationvm.listAppType();
    },
    newAppDomain: "",
    newAppName: "",
    newAppTypeId: "",
    newAppRemark: "",
    newAppDepId: "",
    addApp: function () {
        if (applicationvm.newAppDomain == "" || applicationvm.newAppTypeId == "") {
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
                "departmentid": applicationvm.newAppDepId
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
    jpageIndex: 1,
    jpageSize: 10,
    applicationsList: [],
    listAppInfo: function (tag) {
        $.ajax({
            type: "post",
            url: 'listApplications.action',
            data: {
                "pageindex": applicationvm.jpageIndex,
                "pagesize": applicationvm.jpageSize
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({total: data.pagenum});
                }
                var temAppsArr = [];
                var temAppsEnvidArr = [];
                temAppsArr = data.apps;
                temAppsEnvidArr = data.envids;
                for (var i = 0; i < temAppsEnvidArr.length; i++) {
                    var temAppsEnvidStringToArr = temAppsEnvidArr[i].split(",");
                    temAppsArr[i].appsEnvidArr = new Array();
                    for (j = 0; j < applicationvm.envsList.length; j++) {
                        var isInEnvArr = false;
                        var temAppEnvObj = new Object();
                        temAppEnvObj.appid = temAppsArr[i].id;
                        temAppEnvObj.appValue = temAppsArr[i].domain;
                        temAppEnvObj.envid = applicationvm.envsList[j].id;
                        temAppEnvObj.envValue = applicationvm.envsList[j].name;
                        for (var k = 0; k < temAppsEnvidStringToArr.length; k++) {
                            if (temAppsEnvidStringToArr[k] && temAppsEnvidStringToArr[k] == applicationvm.envsList[j].id ) {
                                isInEnvArr= true;
                                break;
                            }
                        }
                        if(isInEnvArr){
                            temAppEnvObj.exsit = true;
                        }
                        else{
                            temAppEnvObj.exsit=false;
                        }
                        temAppsArr[i].appsEnvidArr.push(temAppEnvObj);
                    }
                }
                applicationvm.applicationsList = temAppsArr;
            }
            ,
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    iniJpagination: function () {
        $('#pagination').bootpag({
            total: 1,          // total pages
            page: 1,            // default page
            maxVisible: 3,     // visible pagination
            leaps: true         // next/prev leaps through maxVisible
        }).on("page", function (event, num) {
            applicationvm.jpageIndex = num;
            applicationvm.listAppInfo();
        });
    },
    newAppEnvDomain: "",
    newAppEnvDomainID: "",
    newAppEnvValue: "",
    newAppEnvId: "",
    newAppEnvVmId: "",
    newAppEnvDNSIP: "",
    newAppEnvLocalPort: "",
    newAppEnvPort: "",
    preCreateAppsEnv: function (appId, appValue, envId, envValue) {
        applicationvm.newAppEnvDomainID = appId;
        applicationvm.newAppEnvDomain = appValue;
        applicationvm.newAppEnvId = envId;
        applicationvm.newAppEnvValue = envValue;
        $('#newAppEnvModal').modal('show');


    },
    cancleCreateAppsEnv: function () {
        $('#newAppEnvModal').modal('hide');
        applicationvm.newAppEnvDomainID = "";
        applicationvm.newAppEnvDomain = "";
        applicationvm.newAppEnvId = "";
        applicationvm.newAppEnvValue = "";
        applicationvm.newAppEnvVmId = "";
        applicationvm.newAppEnvDNSIP = "";
        applicationvm.newAppEnvLocalPort = "";
        applicationvm.newAppEnvPort = "";
    },
    saveAppsEnv: function () {
        $.ajax({
            type: "post",
            url: 'createApplicationEnv.action',
            data: {
                "applicationid": applicationvm.newAppEnvDomainID,
                "envid": applicationvm.newAppEnvId,
                "vminfoid": applicationvm.newAppEnvVmId,
                "dnsip": applicationvm.newAppEnvDNSIP,
                "localport": applicationvm.newAppEnvLocalPort,
                "port": applicationvm.newAppEnvPort
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    applicationvm.cancleCreateAppsEnv();
                    applicationvm.listAppInfo();
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


avalon.ready(function () {
    applicationvm.listDepartment();
    applicationvm.listVMS();
    applicationvm.listEnvs();
    applicationvm.listAppType();
    applicationvm.iniJpagination();
    applicationvm.listAppInfo("init");
});

