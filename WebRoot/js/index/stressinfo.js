/**
 * Created by zhousicong on 2016/1/12.
 */
var stressinfosvm = avalon.define({
    $id: 'stressinfosvm',
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
                    stressinfosvm.appList = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    testersList: [],
    listTesters: function () {
        $.ajax({
            type: "post",
            url: 'findUsersByPosition.action',
            data: {
                "position": 1
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    for (i = 0; i < data.users.length; i++) {
                        temArr[i] = data.users[i][0];
                    }
                    stressinfosvm.testersList = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    appEnvsList: [],
    listAppEnvs: function (appid) {
        $.ajax({
            type: "post",
            url: 'findApplicationEnvByApp.action',
            data: {
                "applicationid": appid
            },
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.appenvs;
                stressinfosvm.appEnvsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    addSTName: "",
    addSTAppId: "",
    addSTEnv: "",
    addSTDevs: "",
    addSTBg: "",
    loadAddSTModal: function () {
        stressinfosvm.conAppId = "";
        stressinfosvm.addSTAppId = "";
        $('#showSTModal').modal('show');
    },
    createStressTask: function () {
        if (stressinfosvm.addSTName == "" || stressinfosvm.addSTAppId == "" || stressinfosvm.addSTEnv == "" || stressinfosvm.addSTDevs == "") {
            alert("任务名、测试站点、测试环境和开发负责人不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createStressTask.action',
            data: {
                "title": stressinfosvm.addSTName,
                "applicationid": stressinfosvm.addSTAppId,
                "creatorid": model.getCookie("userid"),
                "envid": stressinfosvm.addSTEnv,
                "dev": stressinfosvm.addSTDevs,
                "background": stressinfosvm.addSTBg,
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    $('#showSTModal').modal('hide');
                    stressinfosvm.listStressTask("init");
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function (pgsize) {
        stressinfosvm.jpageSize = pgsize;
        listStressTask("init");
    },
    jpageIndex: 1,
    jpageSize: 20,
    conAppId: "",
    conStatusId: "",
    conTesterId: "",
    stressTaskList: [],
    listStressTask: function (tag) {
        if (tag) {
            stressinfosvm.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listStressTasks.action',
            data: {
                "pageindex": stressinfosvm.jpageIndex,
                "pagesize": stressinfosvm.jpageSize,
                "applicationid": stressinfosvm.conAppId,
                "status": stressinfosvm.conStatusId,
                "creatorid": stressinfosvm.conTesterId,
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: stressinfosvm.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.StressTasks;
                    for (i = 0; i < temArr.length; i++) {
                        var stCreateTime;
                        var statusObj = new Object();
                        if (temArr[i].status == "0") {
                            statusObj.statusBg = "status-NOTSTARTED";
                            statusObj.statusText = "未开始";
                        } else if (temArr[i].status == "1") {
                            statusObj.statusBg = "status-INPROGRESS";
                            statusObj.statusText = "进行中";
                        } else if (temArr[i].status == "2") {
                            statusObj.statusBg = "status-SHELVE";
                            statusObj.statusText = "搁置";
                        } else if (temArr[i].status == "3") {
                            statusObj.statusBg = "status-DONE";
                            statusObj.statusText = "完成";
                        }
                        temArr[i].statusObj = statusObj;
                        temArr[i].stCreateTime = temArr[i].createTime.split(" ")[0];
                    }
                    stressinfosvm.stressTaskList = temArr;
                }
                else {
                    alert(data.retMSG);
                }
            }
            ,
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    bootpagFuc: function () {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function (event, num) {
            stressinfosvm.jpageIndex = num;
            stressinfosvm.listStressTask();
        });
    },
    isTester: false,
    isTesterFunc: function () {
        if (model.getCookie("token").length < 3) {
            stressinfosvm.isTester = false;
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
                    stressinfosvm.isTester = true;
                }
                else {
                    stressinfosvm.isTester = false;
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});

avalon.ready(function () {
    $(".chosen-select").chosen({
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "300px"
    });
    stressinfosvm.isTesterFunc();
    stressinfosvm.bootpagFuc();
    stressinfosvm.listApp();
    stressinfosvm.listTesters();
    stressinfosvm.listStressTask("init");
    $("#appSearchCZ").chosen().change(function () {
        stressinfosvm.conAppId = this.value;
    });
    $("#appAddSTModalCZ").chosen().change(function () {
        stressinfosvm.addSTAppId = this.value;
        stressinfosvm.listAppEnvs(stressinfosvm.addSTAppId);
    });
});


stressinfosvm.$watch("appList", function (newValue) {
    $(".chosen-select").trigger("chosen:updated");
});


stressinfosvm.$watch("jpageSize", function (newValue) {
    stressinfosvm.pagesize1Cls = "";
    stressinfosvm.pagesize2Cls = "";
    stressinfosvm.pagesize3Cls = "";
    if (newValue == stressinfosvm.pagesize1) {
        stressinfosvm.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == stressinfosvm.pagesize2) {
        stressinfosvm.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == stressinfosvm.pagesize3) {
        stressinfosvm.pagesize3Cls = "pageSizeSelected";
    }
});

