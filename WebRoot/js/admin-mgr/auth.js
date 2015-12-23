/**
 * Created by zhousicong on 2015/10/22.
 */
var userlistvm = avalon.define({
    $id: 'userlistvm',
    jpageIndex :1,
    jpageSize :10,
    queryUserName : "",
    queryDisplayName:"",
    usersList: [],
    initDate: function (tag) {
        $.ajax({
            type: "post",
            url: 'listUsers.action',
            dataType: "json",
            data: {
                "pageindex": userlistvm.jpageIndex,
                "pagesize": userlistvm.jpageSize,
                "username":userlistvm.queryUserName,
                "displayname":userlistvm.queryDisplayName
            },
            success: function (data) {
                userlistvm.usersList = data.users;
                if(tag){
                    $('#pagination').bootpag({total: data.pagenum});
                }

            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    iniJpagination:function(){
        $('#pagination').bootpag({
            total: 1,          // total pages
            page: 1,            // default page
            maxVisible: 3,     // visible pagination
            leaps: true         // next/prev leaps through maxVisible
        }).on("page", function(event, num){
            userlistvm.jpageIndex = num;
            userlistvm.initDate();
        });
    }
})
userlistvm.iniJpagination();
userlistvm.initDate("init");



