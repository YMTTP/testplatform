/**
 * Created by chenjiazhu on 2017/5/17.
 */
var h5stress = avalon.define({
    $id: 'h5stress',
   
    h5Name: "",
    h5Url: "",
    loadAddSTModal: function () {
        h5stress.conAppId = "";
        h5stress.addSTAppId = "";
        $('#showSTModal').modal('show');
    },
    createH5Task: function () {
        if (h5stress.h5Name == "" || h5stress.h5Url == "") {
            alert("任务名、url不能为空");
            return;
        }
        if ( h5stress.h5Url.indexOf("http://")!=0) {
            alert("url必须以http://开头");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createH5Task.action',
            data: {
                "name": h5stress.h5Name,
                "url": h5stress.h5Url,
                "creatorid": getCookie("userid"),              
            },
            success: function (data) {
                if (data.retCode == "1000") {
                    $('#showSTModal').modal('hide');
                    h5stress.listh5Task("init");
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
        h5stress.jpageSize = pgsize;
        h5stress.listStressTask("init");
    },
    
    jpageIndex: 1,
    jpageSize: 20,
    h5TaskList: [],
 
    listh5Task: function (tag) {
        if (tag) {
            h5stress.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listH5Tasks.action',
            data: {
                "pageindex": h5stress.jpageIndex,
                "pagesize": h5stress.jpageSize,              
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: h5stress.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    h5stress.h5TaskList = data.h5task;
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
            h5stress.jpageIndex = num;
            h5stress.listh5Task();
        });
    },
    isTester: false
});

avalon.ready(function () {
    h5stress.bootpagFuc();
   
    h5stress.isTester = isTesterFunc();
    h5stress.listh5Task("init");
   
});


h5stress.$watch("appList", function (newValue) {
    $(".chosen-select").trigger("chosen:updated");
});


h5stress.$watch("jpageSize", function (newValue) {
    h5stress.pagesize1Cls = "";
    h5stress.pagesize2Cls = "";
    h5stress.pagesize3Cls = "";
    
    if (newValue == h5stress.pagesize1) {
        h5stress.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == h5stress.pagesize2) {
        h5stress.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == h5stress.pagesize3) {
        h5stress.pagesize3Cls = "pageSizeSelected";
    }
});

