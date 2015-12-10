/**
 * Created by zhousicong on 2015/10/28.
 */
var serverinfovm= avalon.define({
    $id:'serverinfovm',
    serverId:model.getUrlVars()["serverid"],
    findServerInfoById:function(){
        $.ajax({
            type: "post",
            url: 'findServerInfoById.action',
            data: {
                "serverinfoid": serverinfovm.serverId
            },
            dataType: "json",
            success: function (data) {
                console.log(JSON.stringify(data));
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    }
});

serverinfovm.findServerInfoById();