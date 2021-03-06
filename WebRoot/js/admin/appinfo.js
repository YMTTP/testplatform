/**
 * Created by zhousicong on 2015/12/25.
 */
var appinfovm = avalon.define({
    $id: 'appinfovm',
    //Apptype Start
    newAppType: "",
    newAppTypeRemark: "",
    loadAddAppTypeModal: function() {
        appinfovm.newAppType = "";
        appinfovm.newAppTypeRemark = "";
        $('#addAppTypeModal').modal('show');
    },
    createAppType: function() {
        zajax({
            type: "post",
            url: 'createApplicationType.action',
            data: {
                "type": appinfovm.newAppType,
                "typeremark": appinfovm.newAppTypeRemark
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    appinfovm.listAppType();
                    $('#addAppTypeModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    applicationsTypeList: [],
    listAppType: function() {
        zajax({
            type: "post",
            url: 'listApplicationTypes.action',
            success: function(data) {
                var temArr = [];
                temArr = data.apptypes;
                appinfovm.applicationsTypeList = temArr;
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    modifyAppTypeId: "",
    modifyAppType: "",
    modifyAppTypeRemark: "",
    loadModifyAppTypeModal: function(index) {
        appinfovm.modifyAppTypeId = appinfovm.applicationsTypeList[index].id;
        appinfovm.modifyAppType = appinfovm.applicationsTypeList[index].type;
        appinfovm.modifyAppTypeRemark = appinfovm.applicationsTypeList[index].remark;
        $('#modifyAppTypeModal').modal('show');
    },
    saveAppType: function() {
        zajax({
            type: "post",
            url: 'updateApplicationType.action',
            data: {
                "applicationtypeid": appinfovm.modifyAppTypeId,
                "type": appinfovm.modifyAppType,
                "typeremark": appinfovm.modifyAppTypeRemark
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    appinfovm.listAppType();
                    $('#modifyAppTypeModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    lodApptypeTAB: function() {
        appinfovm.listAppType();
        $('#apptype').tab('show');
    },
    //AppType END

    //App Start
    newAppDomain: "",
    newAppName: "",
    newAppTypeId: "",
    newAppDepId: "",
    newAppDevs: "",
    loadAddAppModal: function() {
        appinfovm.newAppDomain = "";
        appinfovm.newAppName = "";
        appinfovm.newAppTypeId = "";
        appinfovm.newAppRemark = "";
        appinfovm.newAppDepId = "";
        appinfovm.depList = getAllDepartments();
        appinfovm.listAppType();
        $('#addAppModal').modal('show');
    },
    depList: getAllDepartments(),
    envsList: getAllEnvs(),
    createApp: function() {
        if (appinfovm.newAppDomain == "" || appinfovm.newAppTypeId == "") {
            alert("站点域名或站点类型不能为空");
            return;
        }
        zajax({
            type: "post",
            url: 'createApplication.action',
            data: {
                "domain": appinfovm.newAppDomain.trim(),
                "name": appinfovm.newAppName.trim(),
                "applicationtypeid": appinfovm.newAppTypeId,
                "departmentid": appinfovm.newAppDepId,
                "devs": appinfovm.newAppDevs
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    appinfovm.listApp();
                    $('#addAppModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    jpageIndex: 1,
    jpageSize: 20,
    applicationsList: [],
    conAppDomain: "",
    conAppDepId: "",
    conAppTypeId: "",
    listApp: function(tag) {
        if (tag) {
            appinfovm.jpageIndex = 1;
        }
        appinfovm.envsList = getAllEnvs();
        zajax({
            type: "post",
            url: 'listApplications.action',
            data: {
                "pageindex": appinfovm.jpageIndex,
                "pagesize": appinfovm.jpageSize,
                "domain": appinfovm.conAppDomain,
                "applicationtypeid": appinfovm.conAppTypeId,
                "departmentid": appinfovm.conAppDepId
            },
            success: function(data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: appinfovm.jpageIndex
                    });
                }
                var temAppsArr = [];
                var temAppsEnvidArr = [];
                temAppsArr = data.apps;
                temAppsEnvidArr = data.envids;
                for (var i = 0; i < temAppsEnvidArr.length; i++) {
                    var temAppsEnvidStringToArr = temAppsEnvidArr[i].split(",");
                    temAppsArr[i].appsEnvidArr = new Array();
                    for (j = 0; j < appinfovm.envsList.length; j++) {
                        var isInEnvArr = false;
                        var temAppEnvObj = new Object();
                        temAppEnvObj.appid = temAppsArr[i].id;
                        temAppEnvObj.appValue = temAppsArr[i].domain;
                        temAppEnvObj.envid = appinfovm.envsList[j].id;
                        temAppEnvObj.envValue = appinfovm.envsList[j].name;
                        for (var k = 0; k < temAppsEnvidStringToArr.length; k++) {
                            if (temAppsEnvidStringToArr[k] && temAppsEnvidStringToArr[k] == appinfovm.envsList[j].id) {
                                isInEnvArr = true;
                                break;
                            }
                        }
                        if (isInEnvArr) {
                            temAppEnvObj.exsit = true;
                        } else {
                            temAppEnvObj.exsit = false;
                        }
                        temAppsArr[i].appsEnvidArr.push(temAppEnvObj);
                    }
                }
                appinfovm.applicationsList = temAppsArr;
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    vmsList: getAllVMS(),
    newAppEnvDomain: "",
    newAppEnvDomainID: "",
    newAppEnvValue: "",
    newAppEnvId: "",
    newAppEnvVmId: "",
    newAppEnvDNSIP: "",
    newAppEnvLocalPort: "",
    newAppEnvPort: "",
    loadAddAppEnvModal: function(appId, appValue, envId, envValue) {
        appinfovm.newAppEnvDomainID = appId;
        appinfovm.newAppEnvDomain = appValue;
        appinfovm.newAppEnvId = envId;
        appinfovm.newAppEnvValue = envValue;
        appinfovm.newAppEnvVmId = "";
        appinfovm.newAppEnvDNSIP = "";
        appinfovm.newAppEnvLocalPort = "";
        appinfovm.newAppEnvPort = "";
        appinfovm.vmsList = getAllVMS();
        $('#addAppEnvModal').modal('show');
    },
    createAppEnv: function() {
        if (appinfovm.newAppEnvVmId == "") {
            alert("站点环境的隶属服务器不能为空");
            return;
        }
        zajax({
            type: "post",
            url: 'createApplicationEnv.action',
            data: {
                "applicationid": appinfovm.newAppEnvDomainID,
                "envid": appinfovm.newAppEnvId,
                "vminfoid": appinfovm.newAppEnvVmId,
                "dnsip": appinfovm.newAppEnvDNSIP,
                "localport": appinfovm.newAppEnvLocalPort,
                "port": appinfovm.newAppEnvPort
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    appinfovm.listApp("init");
                    $('#addAppEnvModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    modifyAppEnvDomain: "",
    modifyAppEnvDomainID: "",
    modifyAppEnvValue: "",
    modifyAppEnvId: "",
    modifyAppEnvVmId: "",
    modifyAppEnvDNSIP: "",
    modifyAppEnvLocalPort: "",
    modifyAppEnvPort: "",
    loadModifyAppEnvModal: function(appId, envId) {
        zajax({
            type: "post",
            url: 'findApplicationEnvByAppAndEnv.action',
            data: {
                "applicationid": appId,
                "envid": envId
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    appinfovm.vmsList = getAllVMS();
                    appinfovm.modifyAppEnvDomain = data.appenv.application.domain;
                    appinfovm.modifyAppEnvDomainID = data.appenv.application.id;
                    appinfovm.modifyAppEnvValue = data.appenv.env.name;
                    appinfovm.modifyAppEnvId = data.appenv.env.id;
                    appinfovm.modifyAppEnvVmId = data.appenv.vminfo.id;
                    appinfovm.modifyAppEnvDNSIP = data.appenv.dnsip;
                    appinfovm.modifyAppEnvLocalPort = data.appenv.localport;
                    appinfovm.modifyAppEnvPort = data.appenv.port;
                    $('#modifyAppEnvModal').modal('show');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    saveAppEnv: function() {
        if (appinfovm.modifyAppEnvVmId == "") {
            alert("站点环境的隶属服务器不能为空");
            return;
        }
        zajax({
            type: "post",
            url: 'updateApplicationEnv.action',
            data: {
                "applicationid": appinfovm.modifyAppEnvDomainID,
                "envid": appinfovm.modifyAppEnvId,
                "vminfoid": appinfovm.modifyAppEnvVmId,
                "dnsip": appinfovm.modifyAppEnvDNSIP,
                "localport": appinfovm.modifyAppEnvLocalPort,
                "port": appinfovm.modifyAppEnvPort
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    appinfovm.listApp("init");
                    $('#modifyAppEnvModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    modifyAppId: "",
    modifyAppDomain: "",
    modifyAppName: "",
    modifyAppTypeId: "",
    modifyAppDepId: "",
    modifyAppDevs: "",
    loadModifyAppModal: function(index) {
        appinfovm.depList = getAllDepartments();
        appinfovm.listAppType();
        appinfovm.modifyAppId = appinfovm.applicationsList[index].id;
        appinfovm.modifyAppDomain = appinfovm.applicationsList[index].domain;
        appinfovm.modifyAppName = appinfovm.applicationsList[index].name;
        appinfovm.modifyAppTypeId = appinfovm.applicationsList[index].applicationtype.id;
        appinfovm.modifyAppDepId = appinfovm.applicationsList[index].department.id;
        appinfovm.modifyAppDevs = appinfovm.applicationsList[index].devs;
        $('#modifyAppModal').modal('show');
    },
    saveApp: function() {
        if (appinfovm.modifyAppTypeId == "") {
            alert("站点类型不能为空");
            return;
        }
        zajax({
            type: "post",
            url: 'updateApplication.action',
            data: {
                "applicationid": appinfovm.modifyAppId,
                "applicationtypeid": appinfovm.modifyAppTypeId,
                "domain": appinfovm.modifyAppDomain.trim(),
                "name": appinfovm.modifyAppName.trim(),
                "devs": appinfovm.modifyAppDevs.trim(),
                "departmentid": appinfovm.modifyAppDepId
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    appinfovm.listApp();
                    $('#modifyAppModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        })
    },
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function(pgsize) {
        appinfovm.jpageSize = pgsize;
        appinfovm.listApp("init");
    },
    loadAppTAB: function() {
        appinfovm.listApp("init");
        appinfovm.depList = getAllDepartments();
        appinfovm.listAppType();
        $('#app').tab('show');
    },
    //APP END

    removeItem: function(id, actionName, idName) {
        var actitonUrl = actionName + ".action";
        var params = '{"' + idName + '":' + id + '}';
        params = JSON.parse(params);
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        zajax({
            type: "post",
            url: actitonUrl,
            data: params,
            success: function(data) {
                if (data.retCode == "1000") {
                    if (actionName == "deleteApplication") {
                        appinfovm.listApp();
                    } else if (actionName == "deleteApplicationType") {
                        appinfovm.listAppType();
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
    bootpagFuc: function() {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function(event, num) {
            appinfovm.jpageIndex = num;
            appinfovm.listApp();
        });
    },
    userOps: ops(3)

});


avalon.ready(function() {
    if (appinfovm.userOps) {
        appinfovm.bootpagFuc();
        appinfovm.loadAppTAB();
    } else {
        redirectAdminIndexPage();
    }
});



appinfovm.$watch("jpageSize", function(newValue) {
    appinfovm.pagesize1Cls = "";
    appinfovm.pagesize2Cls = "";
    appinfovm.pagesize3Cls = "";
    if (newValue == appinfovm.pagesize1) {
        appinfovm.pagesize1Cls = "pageSizeSelected";
    } else if (newValue == appinfovm.pagesize2) {
        appinfovm.pagesize2Cls = "pageSizeSelected";
    } else if (newValue == appinfovm.pagesize3) {
        appinfovm.pagesize3Cls = "pageSizeSelected";
    }
});

appinfovm.$watch("userOps", function(newValue) {
    if (!newValue) {
        redirectAdminIndexPage();
    }
});