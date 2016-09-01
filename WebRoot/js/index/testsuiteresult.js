/**
 * Created by zhousicong on 2016/3/3.
 */
var testsuiteresultvm = avalon.define({
    $id: 'testsuiteresultvm',
    tpid: getUrlVars()["tpid"],
    tsResultInfo: [],
    domain: "",
    createtime: "",
    env: "",
    getTestsuiteResults: function() {
        zajax({
            type: "post",
            url: "getTestsuiteResults.action",
            data: {
                "testpassid": testsuiteresultvm.tpid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    var temTSResultInfoArr = [];
                    for (var i = 0; i < data.testsuiteresults.length; i++) {
                        var temTSInfoOBJ = new Object();
                        temTSInfoOBJ.testsuiteresults = data.testsuiteresults[i];
                        temTSInfoOBJ.totalcasecount = data.totalcasecount[i];
                        temTSInfoOBJ.failedcasecount = data.failedcasecount[i];
                        temTSResultInfoArr[i] = temTSInfoOBJ;
                    }
                    testsuiteresultvm.tsResultInfo = temTSResultInfoArr;
                    testsuiteresultvm.domain = data.domain;
                    testsuiteresultvm.createtime = data.createtime;
                    testsuiteresultvm.env = data.env;

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
    testsuiteresultvm.getTestsuiteResults();
});