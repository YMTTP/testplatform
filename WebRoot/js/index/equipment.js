/**
 * Created by zhousicong on 2016/2/2.
 */
var equipmentvm = avalon.define({
    $id: 'equipmentvm',
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function (pgsize) {
        equipmentvm.jpageSize = pgsize;
        equipmentvm.listAppAsserts("init");
    },
    usersList: [],
    listTestUser: function () {
        $.ajax({
            type: "post",
            url: 'findUsersByPosition.action',
            data: {
                "position": 1
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    for (i = 0; i < data.users.length; i++) {
                        temArr[i] = data.users[i][0];
                    }
                    equipmentvm.usersList = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    eqid: "",
    eqvendor: "",
    eqtype: "",
    eqos: "",
    eqresolution: "",
    eqimei: "",
    eqsn: "",
    eqbuydate: "",
    equserid: "",
    eqmarker: "",
    modifyOff: true,
    modifyOn: false,
    loadEQModal: function () {
        equipmentvm.modifyOff = true;
        equipmentvm.modifyOn = false;
        equipmentvm.listTestUser();
        equipmentvm.id = equipmentvm.eqvendor = equipmentvm.eqtype = equipmentvm.eqos = equipmentvm.eqresolution = equipmentvm.eqimei = equipmentvm.eqsn = "";
        equipmentvm.eqbuydate = equipmentvm.equserid = equipmentvm.eqmarker = "";
        $('#showEQModal').modal('show');
    },
    loadEQModifyModal: function (assertid) {
        equipmentvm.modifyOn = true;
        equipmentvm.modifyOff = false;
        equipmentvm.listTestUser();
        equipmentvm.eqid = assertid;
        equipmentvm.findAppAssertById(assertid);
        $('#showEQModal').modal('show');
    },
    createAppAssert: function () {
        if (equipmentvm.equserid == "") {
            alert("负责人不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createAppAssert.action',
            data: {
                "userid": equipmentvm.equserid,
                "brand": equipmentvm.eqvendor.trim(),
                "type": equipmentvm.eqtype.trim(),
                "OS": equipmentvm.eqos.trim(),
                "resolution": equipmentvm.eqresolution.trim(),
                "IMEI": equipmentvm.eqimei.trim(),
                "SN": equipmentvm.eqsn.trim(),
                "time": equipmentvm.eqbuydate.trim(),
                "remark": equipmentvm.eqmarker.trim()
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    $('#showEQModal').modal('hide');
                    equipmentvm.listAppAsserts("init");
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
    findAppAssertById: function (assertid) {
        $.ajax({
            type: "post",
            url: 'findAppAssertById.action',
            data: {
                "id": assertid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    equipmentvm.id = data.appassert.id;
                    equipmentvm.eqvendor = data.appassert.brand;
                    equipmentvm.eqtype = data.appassert.type;
                    equipmentvm.eqos = data.appassert.OS;
                    equipmentvm.eqresolution = data.appassert.resolution;
                    equipmentvm.eqimei = data.appassert.IMEI;
                    equipmentvm.eqsn = data.appassert.SN;
                    equipmentvm.eqbuydate = data.appassert.time;
                    equipmentvm.equserid = data.appassert.owner.id;
                    equipmentvm.eqmarker = data.appassert.remark;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    updateAppAssert: function () {
        if (equipmentvm.equserid == "") {
            alert("负责人不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'updateAppAssert.action',
            data: {
                "id": equipmentvm.eqid,
                "userid": equipmentvm.equserid,
                "brand": equipmentvm.eqvendor.trim(),
                "type": equipmentvm.eqtype.trim(),
                "OS": equipmentvm.eqos.trim(),
                "resolution": equipmentvm.eqresolution.trim(),
                "IMEI": equipmentvm.eqimei.trim(),
                "SN": equipmentvm.eqsn.trim(),
                "time": equipmentvm.eqbuydate.trim(),
                "remark": equipmentvm.eqmarker.trim()
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    $('#showEQModal').modal('hide');
                    equipmentvm.listAppAsserts("init");
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
    removeItem: function (assertid) {
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: 'deleteAppAssert.action',
            data: {
                "id": assertid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    equipmentvm.listAppAsserts("init");
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
    jpageIndex: 1,
    jpageSize: 20,
    appasserts: [],
    listAppAsserts: function (tag) {
        if (tag) {
            equipmentvm.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listAppAsserts.action',
            data: {
                "pageindex": equipmentvm.jpageIndex,
                "pagesize": equipmentvm.jpageSize
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: equipmentvm.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.appasserts;
                    equipmentvm.appasserts = temArr;
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
    bootpagFuc: function () {
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function (event, num) {
            equipmentvm.jpageIndex = num;
            equipmentvm.listAppAsserts();
        });
    },
    isTester: false,
    isTesterFunc: function () {
        if (model.getCookie("token").length < 3) {
            equipmentvm.isTester = false;
            return;
        };
        $.ajax({
            type: "post",
            url: 'verifyAuthorization.action',
            data: {
                "id": model.getCookie("userid"),
                "permissionvalue": 2
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    equipmentvm.isTester = true;
                }
                else {
                    equipmentvm.isTester = false;
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});

avalon.ready(function () {
    equipmentvm.isTesterFunc();
    equipmentvm.bootpagFuc();
    equipmentvm.listAppAsserts("init");
});


equipmentvm.$watch("jpageSize", function (newValue) {
    equipmentvm.pagesize1Cls = "";
    equipmentvm.pagesize2Cls = "";
    equipmentvm.pagesize3Cls = "";
    if (newValue == equipmentvm.pagesize1) {
        equipmentvm.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == equipmentvm.pagesize2) {
        equipmentvm.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == equipmentvm.pagesize3) {
        equipmentvm.pagesize3Cls = "pageSizeSelected";
    }
});





