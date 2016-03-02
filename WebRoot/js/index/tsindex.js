/**
 * Created by zhousicong on 2016/3/2.
 */
var tsindexvm = avalon.define({
    $id: 'tsindexvm',
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
                    tsindexvm.appList = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    depList: [],
    listDepartment: function () {
        $.ajax({
            type: "post",
            url: 'listDepartments.action',
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.deps;
                    tsindexvm.depList = temArr;
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
    jpageIndex: 1,
    jpageSize: 20,
    conAppId: "",
    conAppDepId: "",
    tsappinfo:[],
    listTestApplications: function (tag) {
        if (tag) {
            tsindexvm.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listTestApplications.action',
            data: {
                "pageIndex": tsindexvm.jpageIndex,
                "pageSize": tsindexvm.jpageSize,
                "applicationid": tsindexvm.conAppId,
                "departmentid": tsindexvm.conAppDepId
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: tsindexvm.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var temAppsInfoArr = [];
                    for (var i = 0; i < data.applications.length; i++) {
                        var temAppsInfoOBJ = new Object();
                        temAppsInfoOBJ.appInfo = data.applications[i];
                        temAppsInfoOBJ.tscount = data.testsuitescount[i];
                        temAppsInfoOBJ.tccount = data.testcasescount[i];
                        temAppsInfoArr[i] = temAppsInfoOBJ;
                    }
                    tsindexvm.tsappinfo = temAppsInfoArr;
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
    bootpagFuc: function () {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function (event, num) {
            tsindexvm.jpageIndex = num;
            tsindexvm.listTestApplications();
        });
    },
});

avalon.ready(function () {
    tsindexvm.bootpagFuc();
    $(".chosen-select").chosen({
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "300px"
    });
    tsindexvm.listApp();
    $("#appSearchCZ").chosen().change(function () {
        tsindexvm.conAppId = this.value;
    });
    tsindexvm.listDepartment();
    tsindexvm.listTestApplications("init");
});

tsindexvm.$watch("appList", function (newValue) {
    $(".chosen-select").trigger("chosen:updated");
});