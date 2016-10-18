/**
 * Created by zhousicong on 2016/3/2.
 */
var tcindexvm = avalon.define({
    $id: 'tcindexvm',
    tsid: getUrlVars()["tsid"],
    tcInfo: [],
    applicationid: "",
    domain: "",
    url: "",
    description: "",
    listTestcaseByTestsuiteId: function() {
        zajax({
            url: "listTestcaseByTestsuiteId.action",
            type: "post",
            data: {
                "testsuiteid": tcindexvm.tsid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    tcindexvm.applicationid = data.applicationid;
                    tcindexvm.domain = data.domain;
                    tcindexvm.url = data.url;
                    tcindexvm.description = data.description;
                    var temTcInfoArr = [];
                    for (var i = 0; i < data.testcases.length; i++) {
                        var temTcInfoOBJ = new Object();
                        temTcInfoOBJ.testcases = data.testcases[i];
                        if (data.testcases[i].del == "0") {
                            temTcInfoOBJ.statusBg = "status-Inuse";
                            temTcInfoOBJ.statusText = "使用中";
                        } else if (data.testcases[i].del == "1") {
                            temTcInfoOBJ.statusBg = "status-discard";
                            temTcInfoOBJ.statusText = "废弃";
                        }
                        temTcInfoArr[i] = temTcInfoOBJ;
                    }
                    tcindexvm.tcInfo = temTcInfoArr;

                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        })
    },
    isTester: false,
    statusList: [{
        "description": "使用中",
        "value": 0
    }, {
        "description": "废弃",
        "value": 1
    }],
    updateTcId: "",
    updateTcStatusId: "",
    loadUpdateTcStatus: function(id, statusid) {
        tcindexvm.updateTcId = id;
        tcindexvm.updateTcStatusId = statusid;
        $('#modifyTcStatusModal').modal('show');
    },
    updateTcStatus: function() {
        $.ajax({
            type: "post",
            url: 'updateTestcaseStatus.action',
            data: {
                "testcaseid": tcindexvm.updateTcId,
                "status": tcindexvm.updateTcStatusId
            },
            dataType: "json",
            success: function(data) {
                if (data.retCode == "1000") {
                    $('#modifyTcStatusModal').modal('hide');
                    tcindexvm.listTestcaseByTestsuiteId();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    }
});

avalon.ready(function() {
    tcindexvm.isTester = isTesterFunc();
    tcindexvm.listTestcaseByTestsuiteId();
});