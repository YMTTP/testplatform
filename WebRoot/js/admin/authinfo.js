/**
 * Created by zhousicong on 2015/10/23.
 */
var authinfovm = avalon.define({
    $id: 'authinfovm',
    userid: model.getUrlVars()["userid"],
    username:"",
    displayname:"",
    department:"",
    position:"",
    getUserInfo: function () {
        $.ajax({
            type: "post",
            url: 'findUserByID.action',
            data: {
                id:authinfovm.userid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    console.log(JSON.stringify(data));
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    getUserAuth: function () {
        
    }

});