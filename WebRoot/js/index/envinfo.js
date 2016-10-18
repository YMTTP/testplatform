/**
 * Created by zhousicong on 2016/1/7.
 */
var envinfovm = avalon.define({
    $id: 'envinfovm',
    vmsList: [],
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function(pgsize) {
        envinfovm.jpageSize = pgsize;
        envinfovm.listVmInfosByPage("init");
    },
    clearsearch: function() {
        envinfovm.conType = "";
        envinfovm.listVmInfosByPage("init");
    },
    jpageIndex: 1,
    jpageSize: 20,
    conType: "",
    listVmInfosByPage: function(tag) {
        if (tag) {
            envinfovm.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listVmInfosByPage.action',
            data: {
                "pageindex": envinfovm.jpageIndex,
                "pagesize": envinfovm.jpageSize,
                "type": envinfovm.conType
            },
            dataType: "json",
            success: function(data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: envinfovm.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var tempArr = [];
                    for (i = 0; i < data.vms.length; i++) {
                        var temObj = new Object();
                        temObj.vm = data.vms[i];
                        temObj.count = data.count[i];
                        tempArr[i] = temObj;
                    }
                    envinfovm.vmsList = tempArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    loadVmTAB: function() {
        envinfovm.listVmInfosByPage("init");
        $('#vms').tab('show');
    },
    serversList: [],
    loadServerTAB: function() {
        envinfovm.serversList = getAllServers();
        $('#servers').tab('show');
    },
    envsList: [],
    loadEnvTAB: function() {
        envinfovm.envsList = getAllEnvs();
        $('#envs').tab('show');
    },
    bootpagFuc: function() {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function(event, num) {
            envinfovm.jpageIndex = num;
            envinfovm.listVmInfosByPage();
        });
    }
});


avalon.ready(function() {
    envinfovm.bootpagFuc();
    envinfovm.loadVmTAB();
});

envinfovm.$watch("jpageSize", function(newValue) {
    envinfovm.pagesize1Cls = "";
    envinfovm.pagesize2Cls = "";
    envinfovm.pagesize3Cls = "";
    if (newValue == envinfovm.pagesize1) {
        envinfovm.pagesize1Cls = "pageSizeSelected";
    } else if (newValue == envinfovm.pagesize2) {
        envinfovm.pagesize2Cls = "pageSizeSelected";
    } else if (newValue == envinfovm.pagesize3) {
        envinfovm.pagesize3Cls = "pageSizeSelected";
    }
})