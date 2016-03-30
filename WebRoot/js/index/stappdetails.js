/**
 * Created by zhousicong on 2016/3/30.
 */
var stappdetailsvm = avalon.define({
    $id:'stappdetailssvm',
    appid: model.getUrlVars()["appid"],
    stressresults:[],
    domain:"",
    findStressResultsByApplication:function(){
        $.ajax({
            type: "post",
            url: 'findStressResultsByApplication.action',
            data: {
                "applicationid": stappdetailsvm.appid,
            },
            dataType: "json",
            success: function (data) {
                if (data) {
                    var temArr = [];
                    temArr = data.stressresults;
                    stappdetailsvm.stressresults = temArr;
                    stappdetailsvm.domain = data.domain;

                }
                else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            },
        });
    }
});

avalon.ready(function () {
    stappdetailsvm.findStressResultsByApplication();
});