/**
 * Created by zhousicong on 2015/10/23.
 */
var authinfovm = avalon.define({
        $id: 'authinfovm',
        userid: model.getUrlVars()["userid"],
        username: "",
        displayname: "",
        department: "",
        position: "",
        authArr: [],
        authList: [],
        permissionList: [],
        upDatePermissionText: "",
        getUserInfo: function () {
            $.ajax({
                type: "post",
                url: 'findUserByID.action',
                data: {
                    id: authinfovm.userid
                },
                dataType: "json",
                success: function (data) {
                    if (data.retCode == "1000") {
                        authinfovm.username = data.user.username;
                        authinfovm.displayname = data.user.displayname;
                        authinfovm.department = data.user.userInfo.department.name;
                        authinfovm.position = data.user.userInfo.position.name;
                    } else {
                        alert(data.retMSG);
                    }
                },
                error: function (data) {
                    alert(data.retMSG);
                }
            });
        },
        getUserAuth: function () {
            $.ajax({
                type: "post",
                url: 'getUserAuthorization.action',
                data: {
                    userid: authinfovm.userid
                },
                dataType: "json",
                success: function (data) {
                    if (data.retCode == "1000") {
                        authinfovm.authList = data.auth;
                        var tempArr = [];
                        for (var i = 0; i < data.auth.length; i++) {
                            tempArr[i] = data.auth[i].value;
                        }
                        authinfovm.authArr = tempArr;
                    } else {
                        alert(data.retMSG);
                    }
                },
                error: function (data) {
                    alert(data.retMSG);
                }
            });
        },
        getAllPermissions: function () {
            $.ajax({
                type: "post",
                url: 'listPermissions.action',
                dataType: "json",
                success: function (data) {
                    if (data.retCode == "1000") {
                        var tempArr = [];
                        tempArr=data.pers;
                        authinfovm.permissionList = tempArr;
                    } else {
                        alert(data.retMSG);
                    }
                },
                error: function (data) {
                    alert(data.retMSG);
                }
            });
        },
        updateUserAuth: function () {
            $.ajax({
                type: "post",
                url: 'updateAuthorization.action',
                data: {
                    "newauthorization":authinfovm.upDatePermissionText,
                    "userid":authinfovm.userid
                },
                dataType: "json",
                success: function (data) {
                    if (data.retCode == "1000") {
                        alert(data.retMSG);
                        authinfovm.getUserAuth();
                    } else {
                        alert(data.retMSG);
                    }
                },
                error: function (data) {
                    alert(data.retMSG);
                }
            });
        }

    })
    ;

avalon.ready(function () {
    if (isLogin()) {
        authinfovm.getUserInfo();
        authinfovm.getUserAuth();
        authinfovm.getAllPermissions();
    }
    else {
        model.redirectIndexPage();
    }
});

authinfovm.authArr.$watch("length", function () {
    authinfovm.upDatePermissionText = authinfovm.authArr.join(",");
})