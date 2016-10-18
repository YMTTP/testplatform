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
                url: "verifyToken.action",
                type: "post",
                success: function(data) {
                    if (data.retCode == "1000") {
                        model.loggedInUser = data.displayname;
                        model.loggedInUserName = data.username;
                        model.offline = false;
                        model.online = true;
                    } else {
                        clearCookie();
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
        var username = model.loginUserName + model.loginCorp
        var password = model.loginPwd
        if (username == "" || password == "") {
            alert("用户名或者密码为空！");
            return;
        }
        zajax({
            url: "login.action",
            type: "post",
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

        })
    },
    logout: function() {
        zajax({
            url: "logout.action",
            type: "post",
            success: function(data) {
                if (data.retCode == "1000") {
                    model.offline = true;
                    model.online = false;
                    redirectIndexPage();
                }
                else {
                    alert(data.retMSG)
                }
            },
            error:function(data){
                alert(data.retMSG)
            }
        })
    },
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    loadPwdModal: function() {
        model.oldpassword = model.newpassword = model.confirmpassword = "";
        $('#pwdModal').modal('show');
    },
    changePwd: function() {
        if (model.oldpassword == "" || model.newpassword == "" || model.confirmpassword == "") {
            alert("请确认是否有空必填项!");
            return;
        } else if (model.oldpassword.length > 50 || model.newpassword.length > 50 || model.confirmpassword.length > 50) {
            alert("密码长度不能超过50个字符");
            return;
        } else if (model.newpassword != model.confirmpassword) {
            alert("密码和重复密码不同，请重新输入！");
            return;
        }
        zajax({
            url:"changePassword.action",
            type:"post",
            data:{
                "username": model.loggedInUserName,
                "password": model.oldpassword,
                "newpassword": model.newpassword
            },
            success:function(data){
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    redirectIndexPage();
                } else {
                    alert(data.retMSG);
                }
            },
            error:function(data){
                alert(data.retMSG);
            }
        })
    }

});

model.initAuth();