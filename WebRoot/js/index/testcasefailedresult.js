/**
 * Created by zhousicong on 2016/3/4.
 */
var testcasefailedresult = avalon.define({
    $id: 'testcasefailedresult',
    tpid: model.getUrlVars()["tpid"],
    jpageIndex: 1,
    jpageSize: 20,
    createtime: "",
    domain: "",
    failedtestcaseresults: [],
    getFailedTestcaseResultsByTestpassId: function (tag) {
        if (tag) {
            testcasefailedresult.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'getFailedTestcaseResultsByTestpassId.action',
            data: {
                "pageIndex": testcasefailedresult.jpageIndex,
                "pageSize": testcasefailedresult.jpageSize,
                "testpassid": testcasefailedresult.tpid
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: testcasefailedresult.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.failedtestcaseresults;
                    testcasefailedresult.failedtestcaseresults = temArr;
                    testcasefailedresult.createtime = data.createtime;
                    testcasefailedresult.domain = data.domain;
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
            testcasefailedresult.jpageIndex = num;
        });
    },
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function (pgsize) {
        testcasefailedresult.jpageSize = pgsize;
        testcasefailedresult.getFailedTestcaseResultsByTestpassId("init");
    },
});

avalon.ready(function () {
    testcasefailedresult.bootpagFuc();
    testcasefailedresult.getFailedTestcaseResultsByTestpassId("init");
});

testcasefailedresult.$watch("jpageSize", function (newValue) {
    testcasefailedresult.pagesize1Cls = "";
    testcasefailedresult.pagesize2Cls = "";
    testcasefailedresult.pagesize3Cls = "";
    if (newValue == testcasefailedresult.pagesize1) {
        testcasefailedresult.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == testcasefailedresult.pagesize2) {
        testcasefailedresult.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == testcasefailedresult.pagesize3) {
        testcasefailedresult.pagesize3Cls = "pageSizeSelected";
    }
})