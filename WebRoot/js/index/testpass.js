/**
 * Created by zhousicong on 2016/3/3.
 */
var testpassvm = avalon.define({
    $id: 'testpassvm',
    appList: [],
    depList: [],
    envsList: [],
    jpageIndex: 1,
    jpageSize: 20,
    conAppId: "",
    conAppDepId: "",
    conEnvId: "",
    testpassInfo: [],
    clearsearch:function(){
        testpassvm.conAppId = testpassvm.conAppDepId= testpassvm.conEnvId ="";
        $(".chosen-select").trigger("chosen:updated");
        testpassvm.getTestpass("init");
    },
    getTestpass: function (tag) {
        if (tag) {
            testpassvm.jpageIndex = 1;
        }
        zajax({
            url:"getTestpass.action",
            type:"post",
            data:{
                "pageIndex": testpassvm.jpageIndex,
                "pageSize": testpassvm.jpageSize,
                "applicationid": testpassvm.conAppId,
                "envid": testpassvm.conEnvId,
                "departmentid": testpassvm.conAppDepId
            },
            success:function(data){
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: testpassvm.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var temArr = [];
                    for (var i = 0; i < data.testpass.length; i++) {
                        var temOBJ = new Object();
                        temOBJ.testpass = data.testpass[i];
                        temOBJ.urlcount = data.urlcount[i];
                        temOBJ.totalcasecount = data.totalcasecount[i];
                        temOBJ.failedcasecount = data.failedcasecount[i];
                        temOBJ.passrate = data.passrate[i];
                        if(data.passrate[i] == 100){
                            temOBJ.passratecss = "pasratecss100";
                        }
                        else if (data.passrate[i] < 100 && data.passrate[i] >=90){
                            temOBJ.passratecss = "pasratecss90";
                        }
                        else if (data.passrate[i] < 90){
                            temOBJ.passratecss = "pasratecssfailed";
                        }
                        temArr[i] = temOBJ;
                    }
                    testpassvm.testpassInfo = temArr;
                }
                else {
                    alert(data.retMSG);
                }
            },
            error:function(data){
                alert(data.retMSG);
            }
        })
    },
    bootpagFuc: function () {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function (event, num) {
            testpassvm.jpageIndex = num;
            testpassvm.getTestpass();
        });
    },
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function (pgsize) {
        testpassvm.jpageSize = pgsize;
        testpassvm.getTestpass("init");
    },
});


avalon.ready(function () {
    testpassvm.bootpagFuc();
    $(".chosen-select").chosen({
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "300px"
    });
    $("#appSearchCZ").chosen().change(function () {
        testpassvm.conAppId = this.value;
    });
    testpassvm.appList = getAllApps();
    testpassvm.depList = getAllDepartments();
    testpassvm.envsList = getAllEnvs();
    testpassvm.getTestpass("init");
});

testpassvm.$watch("appList", function (newValue) {
    $(".chosen-select").trigger("chosen:updated");
});

testpassvm.$watch("jpageSize", function (newValue) {
    testpassvm.pagesize1Cls = "";
    testpassvm.pagesize2Cls = "";
    testpassvm.pagesize3Cls = "";
    if (newValue == testpassvm.pagesize1) {
        testpassvm.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == testpassvm.pagesize2) {
        testpassvm.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == testpassvm.pagesize3) {
        testpassvm.pagesize3Cls = "pageSizeSelected";
    }
})