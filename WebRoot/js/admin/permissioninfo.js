/**
 * Created by zhousicong on 2015/12/28.
 */
var permissioninfovm = avalon.define({
    $id: 'permissioninfovm',
    jpageIndex :1,
    jpageSize :10,
    queryUserName : "",
    queryDisplayName:"",
    usersList: [],
    initDate: function (tag) {
        $.ajax({
            type: "post",
            url: 'listUsers.action',
            dataType: "json",
            data: {
                "pageindex": permissioninfovm.jpageIndex,
                "pagesize": permissioninfovm.jpageSize,
                "username":permissioninfovm.queryUserName.trim(),
                "displayname":permissioninfovm.queryDisplayName.trim()
            },
            success: function (data) {
                permissioninfovm.usersList = data.users;
                if(tag){
                    $('#pagination').bootpag({total: data.pagenum});
                }

            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});


avalon.ready(function () {
    if (isLogin()) {
        permissioninfovm.initDate("init");
    }
    else {
        model.redirectIndexPage();
    }
});

