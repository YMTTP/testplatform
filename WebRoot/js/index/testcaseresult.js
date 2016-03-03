/**
 * Created by zhousicong on 2016/3/3.
 */
var testcaseresultvm = avalon.define({
    $id: 'testcaseresultvm',
    tsid: model.getUrlVars()["tsid"],
    tcResultInfo: [],
    url: "",
    description: "",
    getTestcaseResults: function () {
        $.ajax({
            type: "post",
            url: 'getTestcaseResults.action',
            data: {
                "testsuiteresultid": testcaseresultvm.tsid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temTcResultInfoArr = [];
                    temTcResultInfoArr = data.testcaseresults;
                    testcaseresultvm.tcResultInfo = temTcResultInfoArr;
                    testcaseresultvm.url = data.url;
                    testcaseresultvm.description = data.description;
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
    testcaseresultvm.getTestcaseResults();
});