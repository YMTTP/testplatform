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
    initDate: function(tag) {
        zajax({
            type: "post",
            url: 'listUsers.action',
            data: {
                "pageindex": permissioninfovm.jpageIndex,
                "pagesize": permissioninfovm.jpageSize,
                "username": permissioninfovm.queryUserName.trim(),
                "displayname": permissioninfovm.queryDisplayName.trim()
            },
            success: function(data) {
                permissioninfovm.usersList = data.users;
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum
                    });
                }

            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    bootpagFuc: function() {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function(event, num) {
            permissioninfovm.jpageIndex = num;
            permissioninfovm.initDate();
        });
    },
    userOps: ops(6)
});


avalon.ready(function() {
    if (permissioninfovm.userOps) {
        permissioninfovm.bootpagFuc();
        permissioninfovm.initDate("init");

    } else {
        redirectAdminIndexPage();
    }
});