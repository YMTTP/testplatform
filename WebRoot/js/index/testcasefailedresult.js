/**
 * Created by zhousicong on 2016/3/4.
 */
var testcasefailedresultvm = avalon.define({
    $id: 'testcasefailedresultvm',
    tpid: model.getUrlVars()["tpid"],
    jpageIndex: 1,
    jpageSize: 20,
    createtime: "",
    domain: "",
    failedtestcaseresults: [],
    getFailedTestcaseResultsByTestpassId: function (tag) {
        if (tag) {
            testcasefailedresultvm.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'getFailedTestcaseResultsByTestpassId.action',
            data: {
                "pageIndex": testcasefailedresultvm.jpageIndex,
                "pageSize": testcasefailedresultvm.jpageSize,
                "testpassid": testcasefailedresultvm.tpid
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: testcasefailedresultvm.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.failedtestcaseresults;
                    testcasefailedresultvm.failedtestcaseresults = temArr;
                    testcasefailedresultvm.createtime = data.createtime;
                    testcasefailedresultvm.domain = data.domain;
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
            testcasefailedresultvm.jpageIndex = num;
        });
    },
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function (pgsize) {
        testcasefailedresultvm.jpageSize = pgsize;
        testcasefailedresultvm.getFailedTestcaseResultsByTestpassId("init");
    },
});

avalon.ready(function () {
    testcasefailedresultvm.bootpagFuc();
    testcasefailedresultvm.getFailedTestcaseResultsByTestpassId("init");
});

testcasefailedresultvm.$watch("jpageSize", function (newValue) {
    testcasefailedresultvm.pagesize1Cls = "";
    testcasefailedresultvm.pagesize2Cls = "";
    testcasefailedresultvm.pagesize3Cls = "";
    if (newValue == testcasefailedresultvm.pagesize1) {
        testcasefailedresultvm.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == testcasefailedresultvm.pagesize2) {
        testcasefailedresultvm.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == testcasefailedresultvm.pagesize3) {
        testcasefailedresultvm.pagesize3Cls = "pageSizeSelected";
    }
})