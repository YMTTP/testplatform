/**
 * Created by zhousicong on 2016/1/7.
 */
var serverdetailsvm = avalon.define({
    $id: 'serverdetailsvm',
    serverid: getUrlVars()["serverid"],
    serverip: "",
    getServerInfoById: function() {
        zajax({
            type: "post",
            url: "findServerInfoById.action",
            data: {
                "serverinfoid": serverdetailsvm.serverid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    serverdetailsvm.serverip = data.serverinfo.ip;
                    serverdetailsvm.getVmInfosByServerId();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    vminfos: [],
    getVmInfosByServerId: function() {
        zajax({
            type: "post",
            url: "findVminfosByServerInfoId.action",
            data: {
                "serverinfoid": serverdetailsvm.serverid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.vminfos;
                    serverdetailsvm.vminfos = temArr;
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
    serverdetailsvm.getServerInfoById();
});