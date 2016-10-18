/**
 * Created by zhousicong on 2015/12/29.
 */
var vmdetaisvm = avalon.define({
    $id: 'vmdetailsvm',
    vmip: getVminfoById(),
    appenvs: getAppEnvsByVmID()
});

function getVminfoById() {
    var vmIp;
    zajax({
        type: "post",
        url: 'findVmInfoById.action',
        async: false,
        data: {
            "vminfoid": getUrlVars()["vmid"]
        },
        success: function(data) {
            if (data.retCode == "1000") {
                vmIp = data.vminfo.ip;
            } else {
                alert(data.retMSG);
            }
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return vmIp;
}

function getAppEnvsByVmID() {
    var appenvsInfo;
    zajax({
        type: "post",
        url: 'findApplicationEnvsByVminfoId.action',
        async: false,
        data: {
            "vminfoid": getUrlVars()["vmid"]
        },
        success: function(data) {
            if (data.retCode == "1000") {
                appenvsInfo = data.appenvs;
            } else {
                alert(data.retMSG);
            }
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return appenvsInfo;
}