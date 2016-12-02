/**
 * Created by chenjiazhu on 2016/12/1.
 */
var monitorlist = avalon.define({
    $id: 'monitorlist',
    testersList: [],
    listTesters: function () {
        zajax({
            type: "post",
            url: "findUsersByPosition.action",
            data: {
                "position": 1
            },
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    for (i = 0; i < data.users.length; i++) {
                        temArr[i] = data.users[i][0];
                    }
                    monitorlist.testersList = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
  
    addSTName: "",
    loadAddSTModal: function () {
        monitorlist.addSTName = "";
        $('#showSTModal').modal('show');
    },
    createMonitorTask: function () {
        if (monitorlist.addSTName == "") {
            alert("描述不能为空");
            return;
        }
        zajax({
            type: "post",
            url: 'createMonitorTask.action',
            data: {
                "desc": monitorlist.addSTName,
                "creatorid": getCookie("userid")               
            },
            success: function (data) {
                if (data.retCode == "1000") {
                    $('#showSTModal').modal('hide');
                    monitorlist.listMonitorTask("init");
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function (pgsize) {
        monitorlist.jpageSize = pgsize;
        monitorlist.listMonitorTask("init");
    },
    jpageIndex: 1,
    jpageSize: 20,
    conTesterId: "",
    monitorTaskList: [],
    
    clearsearch: function () {
        monitorlist.conTesterId= "";
        $(".chosen-select").trigger("chosen:updated");
        monitorlist.listMonitorTask("init");
    },
    
    listMonitorTask: function (tag) {
        if (tag) {
            monitorlist.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listMonitorTasks.action',
            data: {
                "pageindex": monitorlist.jpageIndex,
                "pagesize": monitorlist.jpageSize,
                "creatorid": monitorlist.conTesterId
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: monitorlist.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.MonitorTasks;
                    for (i = 0; i < temArr.length; i++) {
                        var stCreateTime;                       
                        temArr[i].stCreateTime = temArr[i].time.split(" ")[0];
                    }
                    monitorlist.monitorTaskList = temArr;
                }
                else {
                    alert(data.retMSG);
                }
            }
            ,
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    bootpagFuc: function () {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function (event, num) {
            monitorlist.jpageIndex = num;
            monitorlist.listMonitorTask();
        });
    },
    isTester: false
});

avalon.ready(function () {
    monitorlist.bootpagFuc();
    $(".chosen-select").chosen({
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "300px"
    });
    monitorlist.isTester = isTesterFunc();
    monitorlist.listTesters();
    monitorlist.listMonitorTask("init");
    
});


monitorlist.$watch("appList", function (newValue) {
    $(".chosen-select").trigger("chosen:updated");
});


monitorlist.$watch("jpageSize", function (newValue) {
    monitorlist.pagesize1Cls = "";
    monitorlist.pagesize2Cls = "";
    monitorlist.pagesize3Cls = "";
    if (newValue == monitorlist.pagesize1) {
        monitorlist.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == monitorlist.pagesize2) {
        monitorlist.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == monitorlist.pagesize3) {
        monitorlist.pagesize3Cls = "pageSizeSelected";
    }
});

