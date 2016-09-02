var model = avalon.define({
    $id: 'vm',
    offline: true,
    online: false,
    loggedInUser: "",
    loggedInUserName: "",
    initAuth: function() {
        var cookieToken = getCookie("token");
        if (cookieToken.length < 3) {
            return;
        } else {
            zajax({
                type: "post",
                url: "verifyToken.action",
                success: function(data) {
                    var userData = data;
                    if (data.retCode == "1000") {
                        var cookieId = getCookie("userid");
                        zajax({
                            type: "post",
                            url: "verifyAuthorization.action",
                            data: {
                                "id": cookieId,
                                "permissionvalue": 1
                            },
                            success: function(data) {
                                if (data.retCode == "1000") {
                                    model.loggedInUser = userData.displayname;
                                    model.loggedInUserName = userData.username;
                                    model.offline = false;
                                    model.online = true;
                                } else {
                                    clearCookie();
                                    redirectAdminIndexPage();
                                }
                            },
                            error: function(data) {
                                alert(data.retMSG);
                            }
                        });
                    } else {
                        model.clearCookie();
                    }
                },
                error: function(data) {
                    alert(data.retMSG);
                }
            });
        }
    },
    loginUserName: "",
    loginPwd: "",
    loginCorp: "@ymatou.com",
    loadLoginModal: function() {
        model.loginUserName = model.loginPwd = "";
        model.loginCorp = "@ymatou.com";
        $('#loginModal').modal('show');
    },
    login: function() {
        var username = model.loginUserName + model.loginCorp;
        var password = model.loginPwd;
        if (username == "" || password == "") {
            alert("用户名或者密码为空！");
            return;
        };
        zajax({
            type: "post",
            url: "adminLogin.action",
            data: {
                "username": username,
                "password": password
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    model.loggedInUser = data.displayname;
                    model.offline = false;
                    model.online = true;
                    $('#loginModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    logout: function() {
        $.ajax({
            type: "post",
            url: 'logout.action',
            dataType: "json",
            success: function(data) {
                model.offline = true;
                model.online = false;
                redirectAdminIndexPage();
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    }
});

model.initAuth();