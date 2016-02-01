var model = avalon.define({
    $id: 'vm',
    //获取cookie
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    //清除cookie
    clearCookie: function (name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "= " + "; expires=" + date.toUTCString();

    },
    offline: true,
    online: false,
    loggedInUser: "",
    loggedInUserName: "",
    initAuth: function () {
        var cookieToken = model.getCookie("token");
        if (cookieToken.length < 3) {
            return;
        }
        else {
            $.ajax({
                type: "post",
                url: 'verifyToken.action',
                dataType: "json",
                success: function (data) {
                    if (data.retCode == "1000") {
                        model.loggedInUser = data.displayname;
                        model.loggedInUserName = data.username;
                        model.offline = false;
                        model.online = true;
                    } else {
                        model.clearCookie();
                    }
                },
                error: function (data) {
                    alert(data.retMSG);
                }
            });
        }
    },
    loginUserName: "",
    loginPwd: "",
    loginCorp: "@ymatou.com",
    loadLoginModal: function () {
        model.loginUserName = model.loginPwd = "";
        model.loginCorp = "@ymatou.com";
        $('#loginModal').modal('show');
    },
    login: function () {
        var username = model.loginUserName + model.loginCorp;
        var password = model.loginPwd;
        if (username == "" || password == "") {
            alert("用户名或者密码为空！");
            return;
        }
        ;
        $.ajax({
            type: "post",
            url: 'login.action',
            dataType: "json",
            data: {
                "username": username,
                "password": password
            },
            success: function (data) {
                if (data.retCode == "1000") {
                    model.loggedInUser = data.displayname;
                    model.offline = false;
                    model.online = true;
                    $('#loginModal').modal('hide');
                    model.initAuth();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    redirectIndexPage: function () {
        window.location.href = '/home/index.html';
    },
    logout: function () {
        $.ajax({
            type: "post",
            url: 'logout.action',
            dataType: "json",
            success: function (data) {
                model.offline = true;
                model.online = false;
                model.redirectIndexPage();
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });

    },
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    loadPwdModal: function () {
        model.oldpassword = model.newpassword= model.confirmpassword = "";
        $('#pwdModal').modal('show');
    },
    changePwd: function () {
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
        $.ajax({
            type: "post",
            url: 'changePassword.action',
            dataType: "json",
            data: {
                "username": model.loggedInUserName,
                "password": model.oldpassword,
                "newpassword": model.newpassword
            },
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    window.location.href = '/home/index.html';
                } else {
                    alert(data.retMSG);
                }

            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    }

});

model.initAuth();
