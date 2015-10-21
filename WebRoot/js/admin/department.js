/**
 * Created by zhousicong on 2015/10/19.
 */
var departmentvm = avalon.define({
    $id: 'departmentvm',
    editStatus: false,
    depList: [],
    initRole: function () {
        var cookieUserid = model.getCookie("userid");
        var cookieToken =  model.getCookie("token");
        if (cookieUserid.length == "0" || cookieToken.length=="0") {
            window.location.href = '/html/admin/admin.html';
        }
    },
    listDepartment: function () {
        $.ajax({
            type: "post",
            url: 'listDepartments.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.deps;
                for (var i = 0; i < data.deps.length; i++) {
                    temArr[i].modifyClass = "showIcon";
                    temArr[i].saveClass = "hideIcon";
                    temArr[i].readonly = true;
                }
                departmentvm.depList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    initModify: function (index) {
        if (departmentvm.editing) {
            alert("你还有尚未完成编辑的项目！")
            return;
        }
        departmentvm.editStatus = true;
        departmentvm.depList[index].readonly = false;
        departmentvm.depList[index].modifyClass = "hideIcon";
        departmentvm.depList[index].saveClass = "showIcon";
    },
    modifyDep: function (index) {
        departmentvm.depList[index].readonly = true;
        departmentvm.depList[index].modifyClass = "showIcon";
        departmentvm.depList[index].saveClass = "hideIcon";
        departmentvm.editStatus = false;
    },
    cancleModifyDep: function (index, depid, name) {
        $.ajax({
            type: "post",
            url: 'updateDepartment.action',
            data: {
                "positionid": depid,
                "name": name
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    departmentvm.listDepartment();
                    departmentvm.depList[index].readonly = true;
                    departmentvm.depList[index].modifyClass = "showIcon";
                    departmentvm.depList[index].saveClass = "hideIcon"
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    removeDep: function (depid) {
        $.ajax({
            type: "post",
            url: 'deleteDepartment.action',
            data: {
                "departmentid": depid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    departmentvm.listDepartment();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newDepartment: "",
    createDep: function () {
        $.ajax({
            type: "post",
            url: 'createDepartment.action',
            data: {
                "name": departmentvm.newDepartment
            },
            dataType: "json",
            success: function (data) {
                alert(data.retMSG);
                departmentvm.newDepartment = "";
                departmentvm.listDepartment();
                $('#depTab a:first').tab('show');
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});
departmentvm.initRole();
departmentvm.listDepartment();