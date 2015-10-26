/**
 * Created by zhousicong on 2015/10/26.
 */
var envinfovm = avalon.define({
    $id: 'envinfonvm',
    initRole: function () {
        var cookieToken = model.getCookie("token");
        if (cookieToken.length < 3) {
            window.location.href = '/html/admin/admin.html';
        }
    },
    editStatus:false,
    envsList: [],
    listEnvs: function () {
        $.ajax({
            type: "post",
            url: 'listEnvs.action',
            dataType: "json",
            success: function (data) {
                console.log(JSON.stringify(data));
                var temArr = [];
                temArr = data.envs;
                for (var i = 0; i < data.envs.length; i++) {
                    temArr[i].modifyClass = "showIcon";
                    temArr[i].saveClass = "hideIcon";
                    temArr[i].readonly = true;
                }
                envinfovm.envsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newEnvName: "",
    newEnvDNS: "",
    newEnvRemark: "",
    addEnv: function () {
        if (envinfovm.newEnvName == "" || envinfovm.newEnvDNS == "") {
            alert("新环境名称或DNS不能为空")
            return;
        }
        $.ajax({
            type: "post",
            url: 'createEnv.action',
            data: {
                "name": envinfovm.newEnvName,
                "dns": envinfovm.newEnvDNS,
                "remark": envinfovm.newEnvRemark
            },
            dataType: "json",
            success: function (data) {
                envinfovm.newEnvName = "";
                envinfovm.newEnvDNS = "";
                envinfovm.newEnvRemark = "";
                envinfovm.listEnvs();
                $('#envinfoTab a:first').tab('show');
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    preModifyEnv: function (index) {
        if (envinfovm.editStatus) {
            alert("你还有尚未完成编辑的项目！")
            return;
        }
        envinfovm.editStatus = true;
        envinfovm.envsList[index].readonly = false;
        envinfovm.envsList[index].modifyClass = "hideIcon";
        envinfovm.envsList[index].saveClass = "showIcon";
    },
    cancleModifyEnv:function(index){
        envinfovm.editStatus = false;
        envinfovm.envsList[index].readonly = true;
        envinfovm.envsList[index].modifyClass = "showIcon";
        envinfovm.envsList[index].saveClass = "hideIcon";
        envinfovm.listEnvs();
    },
    modifyEnv:function(index,id,name,dns,remark){
        $.ajax({
            type: "post",
            url: 'updateEnv.action',
            data: {
                "envid": id,
                "name": name,
                "dns":dns,
                "remark":remark
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    envinfovm.listEnvs();
                    envinfovm.editStatus = false;
                    envinfovm.envsList[index].readonly = true;
                    envinfovm.envsList[index].modifyClass = "showIcon";
                    envinfovm.envsList[index].saveClass = "hideIcon";
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});

envinfovm.initRole();
envinfovm.listEnvs();