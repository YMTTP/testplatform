/**
 * Created by zhousicong on 2016/3/2.
 */
var tsdetailsvm = avalon.define({
    $id: 'tsdetailsvm',
    appid: getUrlVars()["appid"],
    tsInfo: [],
    domain: "",
    appname: "",
    listTestsuitesByApplicationId: function() {
        zajax({
            url: "listTestsuitesByApplicationId.action",
            type: "post",
            data: {
                "applicationid": tsdetailsvm.appid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    tsdetailsvm.domain = data.domain;
                    tsdetailsvm.appname = data.appname;
                    var temTSInfoArr = [];
                    for (var i = 0; i < data.testsuites.length; i++) {
                        var temTSInfoOBJ = new Object();
                        temTSInfoOBJ.testsuites = data.testsuites[i];
                        if (data.testsuites[i].del == "0") {
                            temTSInfoOBJ.statusBg = "status-Inuse";
                            temTSInfoOBJ.statusText = "使用中";
                        } else if (data.testsuites[i].del == "1") {
                            temTSInfoOBJ.statusBg = "status-discard";
                            temTSInfoOBJ.statusText = "废弃";
                        }
                        temTSInfoOBJ.testcasescount = data.testcasescount[i];
                        temTSInfoArr[i] = temTSInfoOBJ;
                    }
                    tsdetailsvm.tsInfo = temTSInfoArr;

                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    isTester: false,
    statusList: [{
        "description": "使用中",
        "value": 0
    }, {
        "description": "废弃",
        "value": 1
    }],
    updateTSId: "",
    updateTSStatusId: "",
    loadUpdateTSStatus: function(id, statusid) {
        tsdetailsvm.updateTSId = id;
        tsdetailsvm.updateTSStatusId = statusid;
        $('#modifyTSStatusModal').modal('show');
    },
    updateTSStatus: function() {
        zajax({
            url: "updateTestsuiteStatus.action",
            type: "post",
            data: {
                "testsuiteid": tsdetailsvm.updateTSId,
                "status": tsdetailsvm.updateTSStatusId
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    $('#modifyTSStatusModal').modal('hide');
                    tsdetailsvm.listTestsuitesByApplicationId();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        })
    }
});

avalon.ready(function() {
    tsdetailsvm.isTester = isTesterFunc();
    tsdetailsvm.listTestsuitesByApplicationId();
});