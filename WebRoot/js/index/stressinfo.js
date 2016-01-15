/**
 * Created by zhousicong on 2016/1/12.
 */
var stressinfosvm = avalon.define({
    $id: 'stressinfosvm',
    appList: [],
    listApp: function () {
        $.ajax({
            type: "post",
            url: 'findAllApplications.action',
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.apps;
                    stressinfosvm.appList = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
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
                stressinfosvm.envsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    addSTDepId:"",
    addSTAppId:"",
    addSTName:"",
    addSTEnv:"",
    addSTDevs:"",
    addSTBg:"",
    loadAddSTModal:function(){
        stressinfosvm.conAppDepId="";
        stressinfosvm.conAppId="";
        stressinfosvm.depList=[];
        stressinfosvm.appList=[];
        stressinfosvm.addSTDepId="";
        stressinfosvm.addSTAppId="";
        stressinfosvm.listDepartment();
        stressinfosvm.listEnvs();
        $('#showSTModal').modal('show');
    },
    createStressTask: function () {
        if (stressinfosvm.addSTDepId == "" || stressinfosvm.addSTDepId == "" || stressinfosvm.addSTEnv=="") {
            alert("任务站点及所属部门和测试环境不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createStressTask.action',
            data: {
                "title": stressinfosvm.addSTName,
                "applicationid": stressinfosvm.addSTAppId,
                "creatorid": model.getCookie("userid"),
                "envid": stressinfosvm.addSTEnv,
                "dev": stressinfosvm.addSTDevs,
                "background": stressinfosvm.addSTBg,
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    $('#showSTModal').modal('hide');
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
        stressinfosvm.jpageSize = pgsize;
        //TODO
    },
    jpageIndex: 1,
    jpageSize: 20,
    conAppDepId: "",
    conAppId: "",
    listStressTask: function (tag) {
        if (tag) {
            stressinfosvm.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: '.action',
            data: {
                "conAppDepId": stressinfosvm.conAppDepId,
                "conAppId": stressinfosvm.conAppId
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    //TODO
                } else {
                    alert(data.retMSG);
                }
            },
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
            //TODO
            console.log(num);
        });
    }
});

avalon.ready(function () {
    $(".chosen-select").chosen();
    stressinfosvm.bootpagFuc();
    stressinfosvm.listApp();
});


stressinfosvm.$watch("appList", function (newValue) {
    $(".chosen-select").trigger("chosen:updated");
});

stressinfosvm.$watch("jpageSize", function (newValue) {
    stressinfosvm.pagesize1Cls = "";
    stressinfosvm.pagesize2Cls = "";
    stressinfosvm.pagesize3Cls = "";
    if (newValue == stressinfosvm.pagesize1) {
        stressinfosvm.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == stressinfosvm.pagesize2) {
        stressinfosvm.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == stressinfosvm.pagesize3) {
        stressinfosvm.pagesize3Cls = "pageSizeSelected";
    }
});
