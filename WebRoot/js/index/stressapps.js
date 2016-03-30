/**
 * Created by zhousicong on 2016/3/30.
 */
var stressappsvm = avalon.define({
    $id: 'stressappsvm',
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
                    stressappsvm.appList = temArr;
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
                    stressappsvm.depList = temArr;
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
    conAppId: "",
    conAppDepId: "",
    clearsearch: function () {
        stressappsvm.conAppId = stressappsvm.conAppDepId = "";
        $(".chosen-select").trigger("chosen:updated");
        stressappsvm.listStressApps("init");
    },
    jpageIndex: 1,
    jpageSize: 20,
    stressApps:[],
    listStressApps: function (tag) {
        if (tag) {
            stressappsvm.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'findStressApplications.action',
            data: {
                "pageindex": stressappsvm.jpageIndex,
                "pagesize": stressappsvm.jpageSize,
                "applicationid": stressappsvm.conAppId,
                "departmentid": stressappsvm.conAppDepId,
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: stressappsvm.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.applications;
                    for (i = 0; i < temArr.length; i++) {
                        var temObj = new Object();
                        temObj = temArr[i];
                        temObj.stressresultscount = data.stressresultscount[i];
                        temArr[i] = temObj;
                    }
                    stressappsvm.stressApps = temArr;
                }
                else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            },
        });
    },
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function (pgsize) {
        stressappsvm.jpageSize = pgsize;
        stressappsvm.listStressApps("init");
    },
    bootpagFuc: function () {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function (event, num) {
            stressappsvm.jpageIndex = num;
            stressappsvm.listStressApps();
        });
    },
})

avalon.ready(function () {
    $(".chosen-select").chosen({
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "300px"
    });
    $("#appSearchCZ").chosen().change(function () {
        stressappsvm.conAppId = this.value;
    });
    stressappsvm.bootpagFuc();
    stressappsvm.listApp();
    stressappsvm.listDepartment();
    stressappsvm.listStressApps("init");
});

stressappsvm.$watch("appList", function (newValue) {
    $(".chosen-select").trigger("chosen:updated");
});

stressappsvm.$watch("jpageSize", function (newValue) {
    stressappsvm.pagesize1Cls = "";
    stressappsvm.pagesize2Cls = "";
    stressappsvm.pagesize3Cls = "";
    if (newValue == stressappsvm.pagesize1) {
        stressappsvm.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == stressappsvm.pagesize2) {
        stressappsvm.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == stressappsvm.pagesize3) {
        stressappsvm.pagesize3Cls = "pageSizeSelected";
    }
});
