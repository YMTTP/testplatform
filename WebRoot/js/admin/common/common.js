var model = avalon.define({
    $id: 'vm',
    scrollTopHeight: 0,
    fixedNav: "",
    scrollTopVal: function () {
        $(window).scroll(function () {
            model.scrollTopHeight = $(window).scrollTop();
        });
    },
    offline: true,
    online: false,
    loginUserName: "",
    loginPwd: "",
    loginCorp: "@ymatou.com",
    loggedInUser: "",
    loggedInUserName: "",
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

    initAuth: function () {
        var cookieToken =  model.getCookie("token");
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
    loginShow: function () {
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    }
    ,
    loginClose: function () {
        $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
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
            url: 'adminLogin.action',
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
                    model.loginClose();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    logout: function () {
        $.ajax({
            type: "post",
            url: 'logout.action',
            dataType: "json",
            success: function (data) {
                model.offline = true;
                model.online = false;
                window.location.reload(true);
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });

    },
});

model.$watch("scrollTopHeight", function (v) {
    if (v > 50) {
        model.fixedNav = "fixedNav";
    } else {
        model.fixedNav = "";
    }
});
model.scrollTopVal();
model.initAuth();