/**
 * Created by zhousicong on 2016/1/7.
 */
var envinfovm = avalon.define({
    $id: 'envinfovm',
    vmsList: [],
    loadVmTAB: function() {
        envinfovm.vmsList = getAllVMS();
        $('#envs').tab('show');
    },
    serversList: [],
    loadServerTAB: function() {
        envinfovm.serversList = getAllServers();
        $('#envs').tab('show');
    },
    envsList: [],
    loadEnvTAB: function() {
        envinfovm.envsList = getAllEnvs();
        $('#envs').tab('show');
    },
});


avalon.ready(function() {
    envinfovm.loadVmTAB();
});