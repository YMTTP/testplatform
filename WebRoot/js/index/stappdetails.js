/**
 * Created by zhousicong on 2016/3/30.
 */
var stappdetailsvm = avalon.define({
    $id: 'stappdetailssvm',
    appid: getUrlVars()["appid"],
    stressresults: [],
    domain: "",
    findStressResultsByApplication: function() {
        zajax({
            type: "post",
            url: 'findStressResultsByApplication.action',
            data: {
                "applicationid": stappdetailsvm.appid,
            },
            success: function(data) {
                if (data) {
                    var temArr = [];
                    temArr = data.stressresults;
                    for (i = 0; i < temArr.length; i++) {
                        temArr[i].stressTask.createTime = temArr[i].stressTask.createTime.split(" ")[0];
                    }
                    stappdetailsvm.stressresults = temArr;
                    stappdetailsvm.domain = data.domain;

                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            },
        });
    }
});

avalon.ready(function() {
    stappdetailsvm.findStressResultsByApplication();
});