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
    loginShow: function () {
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    },
    loginClose: function () {
        $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
    },
    login: function () {
        var username = model.loginUserName;
        var password = model.loginPwd;
        if (username == "" || password == "") {
            alert("用户名或者密码为空！")
            return;
        }
        $.ajax({
            type: "post",
            url: 'login.action',
            dataType: "json",
            data: {
                "username": username,
                "password": password

            },
            success: function (data) {
                var result = JSON.stringify(data);
                alert(result);
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