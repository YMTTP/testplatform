var register = avalon.define({
    $id: 'registervm',
    regUserName: "",
    regCorp: "@ymatou.com",
    positionList: {},
    initPosition: function () {
        $.ajax({
            type: "post",
            url: 'listPositions.action',
            dataType: "json",
            success: function (data) {
                register.positionList = data.poss;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    departmentList: {},
    initDepartment: function () {
        $.ajax({
            type: "post",
            url: 'listDepartments.action',
            dataType: "json",
            success: function (data) {
                register.departmentList = data.deps;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    regDisplayName: "",
    selectDepartment: "",
    selectPosition: "",
    regCellphone: "",
    regTelephone: "",
    regRemark: "",
    userRegister: function () {
        var username = register.regUserName + register.regCorp;
        var department = register.selectDepartment;
        var position = register.selectPosition;
        if (username == "" || register.regDisplayName == "" || department == "-1" || position == "-1") {
            alert("请确认是否有空必填项!");
            return;
        } else if (username.length > 30) {
            alert("用户名长度不能超过30个字符");
            return;
        } else if (register.regDisplayName.length > 30) {
            alert("昵称长度不能超过30个字符");
            return;
        } else if (register.regCellphone.length > 20) {
            alert("手机号码长度不能超过20个字符");
            return;
        } else if (register.regTelephone.length > 30) {
            alert("电话号码长度不能超过30个字符");
            return;
        } else if (register.regRemark.length > 200) {
            alert("备注长度不能超过200个字符");
            return;
        }

        $.ajax({
            type: "post",
            url: 'register.action',
            dataType: "json",
            data: {
                "username": username,
                "displayname": register.regDisplayName,
                "department": register.selectDepartment,
                "position": register.selectPosition,
                "cellphone": register.regCellphone,
                "telephone": register.regTelephone,
                "remark": register.regRemark,

            },
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    window.location.href = '/home/index.html';
                } else {
                    var reSend = confirm("激活邮件发送失败，重新发送？");
                    if (reSend == true) {
                        register.reSendRegMail();
                    } else {
                        window.location.href = '/home/index.html';
                    }

                }

            },
            error: function (data) {
                alert(data.retMSG);
            }
        });

    },
    reSendRegMail: function () {
        var username = register.regUserName + register.regCorp;
        $.ajax({
            type: "post",
            url: 'register.action',
            dataType: "json",
            data: {
                "username": username,
            },
            success: function (data) {
                if (data.retCode == "1000") {
                    window.location.href = '/';
                } else {
                    var reSend = confirm("激活邮件发送失败，重新发送？");
                    if (reSend == true) {
                        register.reSendRegMail();
                    } else {
                        window.location.href = '/';
                    }

                }

            },
            error: function (data) {
                alert(data.retMSG);
            }
        });

    }


});

register.initPosition();
register.initDepartment();