/**
 * Created by zhousicong on 2015/12/29.
 */
var serverdetailsvm = avalon.define({
    $id: 'serverdetailsvm',
    serverid: getUrlVars()["serverid"],
    serverip: getServerInfoById(),
    vminfos: getVmInfosByServerId()
});


function getServerInfoById() {
    var serverInfoIp;
    zajax({
        type: "post",
        url: "findServerInfoById.action",
        async: false,
        data: {
            "serverinfoid": getUrlVars()["serverid"],
        },
        success: function(data) {
            if (data.retCode == "1000") {
                serverInfoIp = data.serverinfo.ip;
            } else {
                alert(data.retMSG);
            }
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return serverInfoIp;
}



function getVmInfosByServerId() {
    var vmInfos;
    zajax({
        type: "post",
        url: "findVminfosByServerInfoId.action",
        async: false,
        data: {
            "serverinfoid": getUrlVars()["serverid"],
        },
        success: function(data) {
            if (data.retCode == "1000") {
                vmInfos =  data.vminfos;
            } else {
                alert(data.retMSG);
            }
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return vmInfos;
}