/**
 * Created by zhousicong on 2015/12/28.
 */
var permissioninfovm = avalon.define({
    $id: 'permissioninfovm',
    jpageIndex: 1,
    jpageSize: 10,
    queryUserName: "",
    queryDisplayName: "",
    usersList: [],
    initDate: function (tag) {
        $.ajax({
            type: "post",
            url: 'listUsers.action',
            dataType: "json",
            data: {
                "pageindex": permissioninfovm.jpageIndex,
                "pagesize": permissioninfovm.jpageSize,
                "username": permissioninfovm.queryUserName.trim(),
                "displayname": permissioninfovm.queryDisplayName.trim()
            },
            success: function (data) {
                permissioninfovm.usersList = data.users;
                if (tag) {
                    $('#pagination').bootpag({total: data.pagenum});
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
            permissioninfovm.jpageIndex = num;
            permissioninfovm.initDate();
        });
    },
    userOps: true,
    ops: function (opid) {
        $.ajax({
            type: "post",
            url: 'verifyAuthorization.action',
            data: {
                "id": model.getCookie("userid"),
                "permissionvalue": opid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    permissioninfovm.userOps = true;
                }
                else {
                    permissioninfovm.userOps = false;
                }
            },
            error: function (data) {
                alert(data.retMSG);
                return false;
            }
        });
    }
});


avalon.ready(function () {
    if (model.getCookie("token").length < 3) {
        model.redirectIndexPage();
    }
    else {
        permissioninfovm.ops(6);
        permissioninfovm.bootpagFuc();
        permissioninfovm.initDate("init");
    }
});

permissioninfovm.$watch("userOps", function (newValue) {
    if (!newValue) {
        model.redirectIndexPage();
    }
});

