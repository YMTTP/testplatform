/**
 * Created by zhousicong on 2015/10/19.
 */
var positionvm = avalon.define({
    $id: 'positionvm',
    editStatus: false,
    posList: [],
    initRole: function () {
        var cookieToken = model.getCookie("token");
        if (cookieToken.length < 3) {
            window.location.href = '/html/admin/admin.html';
        }
    },
    listPosition: function () {
        $.ajax({
            type: "post",
            url: 'listPositions.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.poss;
                for (var i = 0; i < data.poss.length; i++) {
                    temArr[i].modifyClass = "showIcon";
                    temArr[i].saveClass = "hideIcon";
                    temArr[i].readonly = true;
                }
                positionvm.posList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    initModify: function (index) {
        if (positionvm.editStatus) {
            alert("你还有尚未完成编辑的项目！")
            return;
        }
        positionvm.editStatus = true;
        positionvm.posList[index].readonly = false;
        positionvm.posList[index].modifyClass = "hideIcon";
        positionvm.posList[index].saveClass = "showIcon";
    },
    cancleModifyPos: function (index) {
        positionvm.editStatus = false;
        positionvm.posList[index].readonly = true;
        positionvm.posList[index].modifyClass = "showIcon";
        positionvm.posList[index].saveClass = "hideIcon";
        positionvm.listPosition();
    },
    modifyPos: function (index, posid, name) {
        $.ajax({
            type: "post",
            url: 'updatePosition.action',
            data: {
                "positionid": posid,
                "name": name
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    positionvm.listPosition();
                    positionvm.editStatus = false;
                    positionvm.posList[index].readonly = true;
                    positionvm.posList[index].modifyClass = "showIcon";
                    positionvm.posList[index].saveClass = "hideIcon"
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    removePos: function (posid) {
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: 'deletePosition.action',
            data: {
                "positionid": posid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    positionvm.listPosition();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newPosition: "",
    createPos: function () {
        if (positionvm.newPosition == "") {
            alert("职位名不能为空")
            return;
        }
        $.ajax({
            type: "post",
            url: 'createPosition.action',
            data: {
                "name": positionvm.newPosition
            },
            dataType: "json",
            success: function (data) {
                alert(data.retMSG);
                positionvm.newPosition = "";
                positionvm.listPosition();
                $('#posTab a:first').tab('show');
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});
positionvm.initRole();
positionvm.listPosition();