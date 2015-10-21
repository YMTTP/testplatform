/**
 * Created by zhousicong on 2015/10/17.
 */
var changepwd = avalon.define({
    $id: 'changepwdvm',
    password: "",
    newpassword: "",
    confirmpassword: "",
    initChangePwd: function () {
        var cookieUserid = model.getCookie("userid");
        var cookieToken =  model.getCookie("token");
        if (cookieUserid.length == "0" || cookieToken.length=="0") {
            window.location.href = '/html/index/index.html';
        }
    },
    changePwd: function () {
        if (changepwd.password == "" || changepwd.newpassword == "" || changepwd.confirmpassword == "") {
            alert("请确认是否有空必填项!");
            return;
        } else if (changepwd.password.length > 50 || changepwd.newpassword.length > 50 || changepwd.confirmpassword.length > 50) {
            alert("密码长度不能超过50个字符");
            return;
        } else if (changepwd.newpassword != changepwd.confirmpassword) {
            alert("密码和重复密码不同，请重新输入！");
            return;
        }
        $.ajax({
            type: "post",
            url: 'changePassword.action',
            dataType: "json",
            data: {
                "username": model.loggedInUserName,
                "password": changepwd.password,
                "newpassword": changepwd.newpassword
            },
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    window.location.href = '/html/index/index.html';
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

changepwd.initChangePwd();
