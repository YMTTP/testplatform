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
                        model.clearCookie("userid");
                        model.clearCookie("token");
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
        window.location.href = '/html/index/index.html';
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
});

model.initAuth();
