/**
 * Created by zhousicong on 2015/10/19.
 */
var resetpwd = avalon.define({
    $id: 'resetpwd',
    modifyUserName: "",
    modifyCorp: "@ymatou.com",
    resetPwd: function () {
        var username = resetpwd.modifyUserName + resetpwd.modifyCorp;
        if (username == "") {
            alert("请确认要修改的用户名是否为空!");
            return;
        }
        $.ajax({
            type: "post",
            url: 'forgetPassword.action',
            dataType: "json",
            data: {
                username: username
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

})