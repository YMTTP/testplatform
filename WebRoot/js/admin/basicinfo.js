/**
 * Created by zhousicong on 2015/12/23.
 */
var basicinfovm = avalon.define({
    $id: 'basicinfovm',
    //Department Start
    newDepartment: "",
    loadAddDepModal: function () {
        basicinfovm.newDepartment = "";
        $('#addDepModal').modal('show');
    },
    createDep: function () {
        if (basicinfovm.newDepartment == "") {
            alert("部门名字不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createDepartment.action',
            data: {
                "name": basicinfovm.newDepartment
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.listDepartment();
                    $('#addDepModal').modal('hide');
                }
                else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    depList: [],
    listDepartment: function () {
        $.ajax({
            type: "post",
            url: 'listDepartments.action',
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.deps;
                    basicinfovm.depList = temArr;
                }
                else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyDepartmentId: "",
    modifyDepartmentName: "",
    loadModifyDepModal: function (index) {
        basicinfovm.modifyDepartmentId = basicinfovm.depList[index].id;
        basicinfovm.modifyDepartmentName = basicinfovm.depList[index].name;
        $('#modifyDepModal').modal('show');
    },
    modifyDep: function () {
        $.ajax({
            type: "post",
            url: 'updateDepartment.action',
            data: {
                "departmentid": basicinfovm.modifyDepartmentId,
                "name": basicinfovm.modifyDepartmentName
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.listDepartment();
                    $('#modifyDepModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadDepartmentTAB: function () {
        basicinfovm.listDepartment();
        $('#department').tab('show');
    },
    //Department END

    //Position Start
    newPosition: "",
    loadAddPosModal: function () {
        basicinfovm.newPosition = "";
        $('#addPosModal').modal('show');
    },
    createPos: function () {
        if (basicinfovm.newPosition == "") {
            alert("职位名字不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createPosition.action',
            data: {
                "name": basicinfovm.newPosition
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.listPosition();
                    $('#addPosModal').modal('hide');
                }
                else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    posList: [],
    listPosition: function () {
        $.ajax({
            type: "post",
            url: 'listPositions.action',
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.poss;
                    basicinfovm.posList = temArr;
                }
                else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyPositionId: "",
    modifyPositionName: "",
    loadModifyPosModal: function (index) {
        basicinfovm.modifyPositionId = basicinfovm.posList[index].id;
        basicinfovm.modifyPositionName = basicinfovm.posList[index].name;
        $('#modifyPosModal').modal('show');
    },
    modifyPos: function () {
        $.ajax({
            type: "post",
            url: 'updatePosition.action',
            data: {
                "positionid": basicinfovm.modifyPositionId,
                "name": basicinfovm.modifyPositionName
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.listPosition();
                    $('#modifyPosModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadPositionTAB: function () {
        basicinfovm.listPosition();
        $('#position').tab('show');
    },
    //Position End

    //Permission Start
    newPerValue: "",
    newPerDesc: "",
    loadAddPerModal: function () {
        basicinfovm.newPerValue = "";
        basicinfovm.newPerDesc = "";
        $('#addPerModal').modal('show');
    },
    createPer: function () {
        if (basicinfovm.newPerDesc == "" || basicinfovm.newPerValue == "") {
            alert("权值和权限名不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createPermission.action',
            data: {
                "value": basicinfovm.newPerValue,
                "description": basicinfovm.newPerDesc
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.listPermission();
                    $('#addPerModal').modal('hide');
                }
                else {
                    alert(data.retMSG);
                }

            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    perList: [],
    listPermission: function () {
        $.ajax({
            type: "post",
            url: 'listPermissions.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.pers;
                basicinfovm.perList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyPerId: "",
    modifyPerValue: "",
    modifyPerDesc: "",
    loadModifyPerModal: function (index) {
        basicinfovm.modifyPerId = basicinfovm.perList[index].id;
        basicinfovm.modifyPerValue = basicinfovm.perList[index].value;
        basicinfovm.modifyPerDesc = basicinfovm.perList[index].description;
        $('#modifyPerModal').modal('show');
    },
    modifyPer: function () {
        $.ajax({
            type: "post",
            url: 'updatePermission.action',
            data: {
                "permissionid": basicinfovm.modifyPerId,
                "value": basicinfovm.modifyPerValue,
                "description": basicinfovm.modifyPerDesc
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.listPermission();
                    $('#modifyPerModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadPermissionTAB: function () {
        basicinfovm.listPermission();
        $('#permission').tab('show');
    },
    //Permission End

    removeItem: function (id, actionName, idName) {
        var actitonUrl = actionName + ".action";
        var params = '{"' + idName + '":' + id + '}';
        params = JSON.parse(params);
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: actitonUrl,
            data: params,
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    if (actionName == "deleteDepartment") {
                        basicinfovm.listDepartment();
                    }
                    else if (actionName == "deletePosition") {
                        basicinfovm.listPosition();
                    }
                    else if (actionName == "deletePermission") {
                        basicinfovm.listPermission();
                    }
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    userOps: true,
    ops: function (opid) {
        $.ajax({
            type: "post",
            url: 'verifyAuthorization.action',
            data: {
                "id": model.getCookie("userid"),
                "permissionvalue": opid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    basicinfovm.userOps = true;
                }
                else {
                    basicinfovm.userOps = false;
                }
            },
            error: function (data) {
                alert(data.retMSG);
                return false;
            }
        });
    }
});

avalon.ready(function () {
    if (model.getCookie("token").length < 3) {
        model.redirectIndexPage();
    }
    else {
        basicinfovm.ops(5);
        basicinfovm.loadDepartmentTAB();
    }
});

basicinfovm.$watch("userOps", function (newValue) {
    if (!newValue) {
        model.redirectIndexPage();
    }
});

