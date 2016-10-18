/**
 * Created by zhousicong on 2016/3/3.
 */
var testcaseresultvm = avalon.define({
    $id: 'testcaseresultvm',
    tsid: getUrlVars()["tsid"],
    tcResultInfo: [],
    createtime: "",
    domain: "",
    env: "",
    testpassid: "",
    url: "",
    description: "",
    getTestcaseResults: function() {
        zajax({
            type: "post",
            url: "getTestcaseResults.action",
            data: {
                "testsuiteresultid": testcaseresultvm.tsid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    var temTcResultInfoArr = [];
                    temTcResultInfoArr = data.testcaseresults;
                    testcaseresultvm.tcResultInfo = temTcResultInfoArr;
                    testcaseresultvm.url = data.url;
                    testcaseresultvm.description = data.description;
                    testcaseresultvm.domain = data.domain;
                    testcaseresultvm.env = data.env;
                    testcaseresultvm.testpassid = data.testpassid;
                    testcaseresultvm.createtime = data.createtime;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        })
    },
});

avalon.ready(function() {
    testcaseresultvm.getTestcaseResults();
});