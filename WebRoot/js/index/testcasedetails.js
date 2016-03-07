/**
 * Created by zhousicong on 2016/3/3.
 */
var testcasedetailsvm = avalon.define({
    $id: 'testcasedetails',
    tcresultid: model.getUrlVars()["tcresultid"],
    casename: "",
    description: "",
    tcContentInfo: [],
    getResultContents: function () {
        $.ajax({
            type: "post",
            url: 'getResultContents.action',
            data: {
                "testcaseresultid": testcasedetailsvm.tcresultid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temInfoArr = [];
                    for (var i = 0; i < data.resultcontents.length; i++) {
                        var temInfoOBJ = new Object();
                        temInfoOBJ.type = data.resultcontents[i].type;
                        temInfoOBJ.createtime = data.resultcontents[i].createtime;
                        temInfoOBJ.content = data.resultcontents[i].content;
                        temInfoOBJ.checkpointcss = "";
                        if (data.resultcontents[i].type == "Checkpoint") {
                            if (data.resultcontents[i].status == "0") {
                                temInfoOBJ.checkpointcss = "checkpointsuccess";
                            }
                            else
                                temInfoOBJ.checkpointcss = "checkpointfailed";

                        }
                        if (data.resultcontents[i].type == "Error") {
                            temInfoOBJ.checkpointcss = "";
                        }
                        temInfoArr[i] = temInfoOBJ;
                    }
                    testcasedetailsvm.tcContentInfo = temInfoArr;
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