/**
 * Created by zhousicong on 2016/3/3.
 */
var testcasedetailsvm = avalon.define({
    $id:'testcasedetails',
    tcid: model.getUrlVars()["tcid"],
    casename:"",
    description:"",
    tcContentInfo:[],
    getResultContents: function () {
        $.ajax({
            type: "post",
            url: 'getResultContents.action',
            data: {
                "testcaseresultid": testcasedetailsvm.tcid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temTcDetailsInfoArr = [];
                    temTcDetailsInfoArr = data.resultcontents;
                    testcasedetailsvm.tcContentInfo = temTcDetailsInfoArr;
                    testcasedetailsvm.casename = data.casename;
                    testcasedetailsvm.description = data.description;
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
    testcasedetailsvm.getResultContents();
});