/**
 * Created by zhousicong on 2015/12/29.
 */
var vmdetaisvm = avalon.define({
    $id: 'vmdetailsvm',
    vmid: model.getUrlVars()["vmid"],
    appenvs: [],
    vmip: "",
    getVminfoById: function () {
        $.ajax({
            type: "post",
            url: 'findVmInfoById.action',
            data: {
                "vminfoid": vmdetaisvm.vmid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    vmdetaisvm.vmip = data.vminfo.ip;
                    vmdetaisvm.getAppEnvsByVmID();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    getAppEnvsByVmID: function () {
        $.ajax({
            type: "post",
            url: 'findApplicationEnvsByVminfoId.action',
            data: {
                "vminfoid": vmdetaisvm.vmid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.appenvs;
                    vmdetaisvm.appenvs = temArr;
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
    if (isLogin()) {
        vmdetaisvm.getVminfoById();
    }
    else {
        model.redirectIndexPage();
    }
});
