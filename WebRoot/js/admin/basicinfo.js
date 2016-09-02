/**
 * Created by zhousicong on 2015/12/23.
 */
var basicinfovm = avalon.define({
    $id: 'basicinfovm',
    //Department Start
    depList: getAllDepartments(),
    newDepartment: "",
    loadAddDepModal: function() {
        basicinfovm.newDepartment = "";
        $('#addDepModal').modal('show');
    },
    createDep: function() {
        if (basicinfovm.newDepartment == "") {
            alert("部门名字不能为空");
            return;
        }
        zajax({
            type: "post",
            url: "createDepartment.action",
            data: {
                "name": basicinfovm.newDepartment
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.depList = getAllDepartments();
                    $('#addDepModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    modifyDepartmentId: "",
    modifyDepartmentName: "",
    loadModifyDepModal: function(index) {
        basicinfovm.modifyDepartmentId = basicinfovm.depList[index].id;
        basicinfovm.modifyDepartmentName = basicinfovm.depList[index].name;
        $('#modifyDepModal').modal('show');
    },
    modifyDep: function() {
        zajax({
            type: "post",
            url: "updateDepartment.action",
            data: {
                "departmentid": basicinfovm.modifyDepartmentId,
                "name": basicinfovm.modifyDepartmentName
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.depList = getAllDepartments();
                    $('#modifyDepModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    loadDepartmentTAB: function() {
        basicinfovm.depList = getAllDepartments();
        $('#department').tab('show');
    },
    //Department END

    //Position Start
    posList: getAllPositions(),
    newPosition: "",
    loadAddPosModal: function() {
        basicinfovm.newPosition = "";
        $('#addPosModal').modal('show');
    },
    createPos: function() {
        if (basicinfovm.newPosition == "") {
            alert("职位名字不能为空");
            return;
        }
        zajax({
            type: "post",
            url: "createPosition.action",
            data: {
                "name": basicinfovm.newPosition
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.posList = getAllPositions();
                    $('#addPosModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    modifyPositionId: "",
    modifyPositionName: "",
    loadModifyPosModal: function(index) {
        basicinfovm.modifyPositionId = basicinfovm.posList[index].id;
        basicinfovm.modifyPositionName = basicinfovm.posList[index].name;
        $('#modifyPosModal').modal('show');
    },
    modifyPos: function() {
        zajax({
            type: "post",
            url: "updatePosition.action",
            data: {
                "positionid": basicinfovm.modifyPositionId,
                "name": basicinfovm.modifyPositionName
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.posList = getAllPositions();
                    $('#modifyPosModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    loadPositionTAB: function() {
        basicinfovm.posList = getAllPositions();
        $('#position').tab('show');
    },
    //Position End

    //Permission Start
    newPerValue: "",
    newPerDesc: "",
    loadAddPerModal: function() {
        basicinfovm.newPerValue = "";
        basicinfovm.newPerDesc = "";
        $('#addPerModal').modal('show');
    },
    createPer: function() {
        if (basicinfovm.newPerDesc == "" || basicinfovm.newPerValue == "") {
            alert("权值和权限名不能为空");
            return;
        }
        zajax({
            type: "post",
            url: "createPermission.action",
            data: {
                "value": basicinfovm.newPerValue,
                "description": basicinfovm.newPerDesc
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.listPermission();
                    $('#addPerModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }

            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    perList: [],
    listPermission: function() {
        zajax({
            type: "post",
            url: "listPermissions.action",
            success: function(data) {
                var temArr = [];
                temArr = data.pers;
                basicinfovm.perList = temArr;
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    modifyPerId: "",
    modifyPerValue: "",
    modifyPerDesc: "",
    loadModifyPerModal: function(index) {
        basicinfovm.modifyPerId = basicinfovm.perList[index].id;
        basicinfovm.modifyPerValue = basicinfovm.perList[index].value;
        basicinfovm.modifyPerDesc = basicinfovm.perList[index].description;
        $('#modifyPerModal').modal('show');
    },
    modifyPer: function() {
        zajax({
            type: "post",
            url: "updatePermission.action",
            data: {
                "permissionid": basicinfovm.modifyPerId,
                "value": basicinfovm.modifyPerValue,
                "description": basicinfovm.modifyPerDesc
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    basicinfovm.listPermission();
                    $('#modifyPerModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    loadPermissionTAB: function() {
        basicinfovm.listPermission();
        $('#permission').tab('show');
    },
    //Permission End

    removeItem: function(id, actionName, idName) {
        var actitonUrl = actionName + ".action";
        var params = '{"' + idName + '":' + id + '}';
        params = JSON.parse(params);
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        zajax({
            type: "post",
            url: actitonUrl,
            data: params,
            success: function(data) {
                if (data.retCode == "1000") {
                    if (actionName == "deleteDepartment") {
                        basicinfovm.listDepartment();
                    } else if (actionName == "deletePosition") {
                        basicinfovm.listPosition();
                    } else if (actionName == "deletePermission") {
                        basicinfovm.listPermission();
                    }
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    userOps: ops(5),
});

if (basicinfovm.userOps) {
    basicinfovm.loadDepartmentTAB();
} else {
    redirectAdminIndexPage();
}