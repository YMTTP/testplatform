/**
 * Created by zhousicong on 2015/10/19.
 */
var permissionvm = avalon.define({
    $id: 'permissionvm',
    editStatus: false,
    perList: [],
    initRole: function () {
        var cookieToken = model.getCookie("token");
        if (cookieToken.length < 3) {
            window.location.href = '/html/admin/admin.html';
        }
    },
    listPermission: function () {
        $.ajax({
            type: "post",
            url: 'listPermissions.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.pers;
                for (var i = 0; i < data.pers.length; i++) {
                    temArr[i].modifyClass = "showIcon";
                    temArr[i].saveClass = "hideIcon";
                    temArr[i].readonly = true;
                }
                permissionvm.perList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    initModify: function (index) {
        if (permissionvm.editing) {
            alert("你还有尚未完成编辑的项目！")
            return;
        }
        permissionvm.editStatus = true;
        permissionvm.perList[index].readonly = false;
        permissionvm.perList[index].modifyClass = "hideIcon";
        permissionvm.perList[index].saveClass = "showIcon";
    },
    cancleModifyPer: function (index) {
        permissionvm.editStatus = false;
        permissionvm.perList[index].readonly = true;
        permissionvm.perList[index].modifyClass = "showIcon";
        permissionvm.perList[index].saveClass = "hideIcon";
    },
    modifyPer: function (index, id, value, desc) {
        $.ajax({
            type: "post",
            url: 'updatePermission.action',
            data: {
                "permissionid": id,
                "value": value,
                "description": desc
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    permissionvm.listPermission();
                    permissionvm.posList[index].readonly = true;
                    permissionvm.posList[index].modifyClass = "showIcon";
                    permissionvm.posList[index].saveClass = "hideIcon"
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    removePer: function (id) {
        var r = confirm("确认删除?");
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: 'deletePermission.action',
            data: {
                "permissionid": id
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    permissionvm.listPermission();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newPerValue: "",
    newPerDesc: "",
    createPer: function () {
        if (permissionvm.newPerDesc == "" || permissionvm.newPerValue == "") {
            alert("权值和权限名不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createPermission.action',
            data: {
                "value": permissionvm.newPerValue,
                "description": permissionvm.newPerDesc
            },
            dataType: "json",
            success: function (data) {
                alert(data.retMSG);
                permissionvm.newPerValue = "";
                permissionvm.newPerDesc = "";
                permissionvm.listPermission();
                $('#perTab a:first').tab('show');
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});
permissionvm.initRole();
permissionvm.listPermission();