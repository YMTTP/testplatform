/**
 * Created by zhousicong on 2015/12/29.
 */
var serverdetailsvm = avalon.define({
    $id: 'serverdetailsvm',
    serverid: model.getUrlVars()["serverid"],
    serverip: "",
    getServerInfoById: function () {
        $.ajax({
            type: "post",
            url: 'findServerInfoById.action',
            data: {
                "serverinfoid": serverdetailsvm.serverid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    serverdetailsvm.serverip = data.serverinfo.ip;
                    serverdetailsvm.getVmInfosByServerId();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    vminfos: [],
    getVmInfosByServerId: function () {
        $.ajax({
            type: "post",
            url: 'findVminfosByServerInfoId.action',
            data: {
                "serverinfoid": serverdetailsvm.serverid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.vminfos;
                    serverdetailsvm.vminfos = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    }

});

serverdetailsvm.getServerInfoById();