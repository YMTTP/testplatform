/**
 * Created by zhousicong on 2016/1/7.
 */
var envinfovm = avalon.define({
    $id:'envinfovm',
    vmsList: [],
    listVMS: function () {
        $.ajax({
            type: "post",
            url: 'listVmInfos.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.vms;
                envinfovm.vmsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadVmTAB: function () {
        envinfovm.listVMS();
        $('#envs').tab('show');
    },
    serversList: [],
    listServers: function () {
        $.ajax({
            type: "post",
            url: 'listServerInfos.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.serverinfos;
                envinfovm.serversList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadServerTAB: function () {
        envinfovm.listServers();
        $('#envs').tab('show');
    },
    envsList: [],
    listEnvs: function () {
        $.ajax({
            type: "post",
            url: 'listEnvs.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.envs;
                envinfovm.envsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadEnvTAB: function () {
        envinfovm.listEnvs();
        $('#envs').tab('show');
    },
});


avalon.ready(function () {
    envinfovm.loadVmTAB();
});