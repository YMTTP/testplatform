/**
 * Created by zhousicong on 2015/10/22.
 */
var userlistvm = avalon.define({
        $id: 'userlistvm',
        pagesize: 10,
        pageindex: 1,
        initDate: function () {
            $.ajax({
                type: "post",
                url: 'listUsers.action',
                dataType: "json",
                data: {
                    "pageindex": userlistvm.pageindex,
                    "pagesize": userlistvm.pagesize
                },
                success: function (data) {
                    console.log(JSON.stringify(data));
                },
                error: function (data) {
                    alert(data.retMSG);
                }
            });
        }

    })
    ;

userlistvm.initDate();