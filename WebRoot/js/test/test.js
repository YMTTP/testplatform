// UserAction
function register() {
    var username = "zhousicong@ymatou.com";
    var displayname = "段居鼎";
    var cellphone = "13816700001";
    var remark = "备注信息";
    var telephone = "021-88888888";
    var department = "10";
    var position = "10";

    $.ajax({
        type: "post",
        url: 'register.action',
        dataType: "json",
        data: {
            "username": username,
            "displayname": displayname,
            "cellphone": cellphone,
            "remark": remark,
            "telephone": telephone,
            "department": department,
            "position": position

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#register").html(result);

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}


function login() {
    var username = "duanjuding@ymatou.com";
    var password = "Uep235Vy";

    $.ajax({
        type: "post",
        url: 'login.action',
        dataType: "json",
        data: {
            "username": username,
            "password": password

        },
        success: function(data) {

            var result = JSON.stringify(data);
            $("#login").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

// AuthorizationAction
function getUserAuthorization() {
    var userid = "3";

    $.ajax({
        type: "post",
        url: 'findUserByID.action',
        dataType: "json",
        data: {
            "id": userid

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#getUserAuthorization").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

function updateAuthorization() {
    var userid = "1";
    var newauthorization = "1,2";

    $.ajax({
        type: "post",
        url: 'updateAuthorization.action',
        dataType: "json",
        data: {
            "userid": userid,
            "newauthorization": newauthorization

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#updateAuthorization").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

//PermissionAction
function createPermission() {
    var value = "2";
    var description = "2号权限";

    $.ajax({
        type: "post",
        url: 'createPermission.action',
        dataType: "json",
        data: {
            "value": value,
            "description": description

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#createPermission").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

//PositionAction
function createPosition() {
    var name = "测试";

    $.ajax({
        type: "post",
        url: 'createPosition.action',
        dataType: "json",
        data: {
            "name": name

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#createPosition").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

//DepartmentAction
function createDepartment() {
    var name = "C2C";

    $.ajax({
        type: "post",
        url: 'createDepartment.action',
        dataType: "json",
        data: {
            "name": name

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#createDepartment").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

//EnvironmentAction
function findVminfosByServerInfoId() {
    var serverinfoid = "1";

    $.ajax({
        type: "post",
        url: 'findVminfosByServerInfoId.action',
        dataType: "json",
        data: {
            "serverinfoid": serverinfoid

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#findVminfosByServerInfoId").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}


function findVmInfoById() {
    var vminfoid = "3";

    $.ajax({
        type: "post",
        url: 'findVmInfoById.action',
        dataType: "json",
        data: {
            "vminfoid": vminfoid

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#findVmInfoById").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}


//ApplicationAction
function findApplicationEnvsByVminfoId() {
    var vminfoid = "5";

    $.ajax({
        type: "post",
        url: 'findApplicationEnvsByVminfoId.action',
        dataType: "json",
        data: {
            "vminfoid": vminfoid

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#findApplicationEnvsByVminfoId").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}


function findApplicationEnvById() {
    var appenvid = "3";

    $.ajax({
        type: "post",
        url: 'findApplicationEnvById.action',
        dataType: "json",
        data: {
            "appenvid": appenvid

        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#findApplicationEnvById").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}



function listApplications() {

    $.ajax({
        type: "post",
        url: 'listApplications.action',
        dataType: "json",
        data: {
            "pagesize": 10,
            "pageindex": 1
        },
        success: function(data) {
            var result = JSON.stringify(data);
            $("#listApplications").html(result)

        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

function bashcreateapp() {

    for (var i = 0; i < 1000; i++) {

        $.ajax({
            type: "post",
            url: 'createApplication.action',
            data: {
                "applicationtypeid": 1,
                "domain": "www.ymatou" + i + ".com",
                "name": "test",
                "remark": "test",
                "departmentid": i % 4 + 1
            },
            dataType: "json",
            success: function(data) {

            },
            error: function(data) {
                alert(data.retMSG);
            }
        });

    }


}


function listStressTasks() {



    $.ajax({
        type: "post",
        url: 'listStressTasks.action',
        data: {
            "creatorid": 1,
            "departmentid": 1,
            "applicationid": 1,
            "pagesize": 20,
            "pageindex": 1
        },
        dataType: "json",
        success: function(data) {
            var result = JSON.stringify(data);
            $("#listStressTasks").html(result)
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });

}

function listTestApplications() {



    $.ajax({
        type: "post",
        url: 'listTestApplications.action',
        data: {
            //"departmentid": 1,
            //"applicationid":22,
            "pageSize": 20,
            "pageIndex": 1
        },
        dataType: "json",
        success: function(data) {
            var result = JSON.stringify(data);
            $("#listTestApplications").html(result)
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

function getTestpass() {

    $.ajax({
        type: "post",
        url: 'getTestpass.action',
        data: {
            "departmentid": 8,
            "applicationid": 22,
            "envid": 1,
            "pageSize": 20,
            "pageIndex": 1
        },
        dataType: "json",
        success: function(data) {
            var result = JSON.stringify(data);
            $("#getTestpass").html(result)
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

function findStressApplications() {

    $.ajax({
        type: "post",
        url: 'findStressApplications.action',
        data: {
            "pagesize": 20,
            "pageindex": 1
        },
        dataType: "json",
        success: function(data) {
            var result = JSON.stringify(data);
            $("#findStressApplications").html(result)
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}

function findStressResultsByApplication() {

    $.ajax({
        type: "post",
        url: 'findStressResultsByApplication.action',
        data: {
            "applicationid": 22,
        },
        dataType: "json",
        success: function(data) {
            var result = JSON.stringify(data);
            $("#findStressResultsByApplication").html(result)
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}


function queryValidateCode() {

    $.ajax({
        type: "post",
        url: 'queryValidateCode.action',
        data: {
            "queryChannelId": 1,
            "sloginid": "",
            "phoneno": "",
            "envid": 0
        },
        dataType: "json",
        success: function(data) {
            var result = JSON.stringify(data);
            $("#queryValidateCode").html(result)
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}



function listBuildHistory() {

    $.ajax({
        type: "post",
        url: 'listBuildHistory.action',
        data: {
            "domain": "",
            "envid": "",
            "pageindex": 1,
            "pagesize": 2
        },
        dataType: "json",
        success: function(data) {
            var result = JSON.stringify(data);
            $("#listBuildHistory").html(result)
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
}




function addSites() {
    var siteArr =["logisticsm.s1.ymatou.com"," m2cindexer.ymatou.com"," absite.iapi.ymatou.com"," seller.s1.ymatou.com"," diary.s1.ymatou.com"," prod.app.ymatou.com"," messagebizer.iapi.ymatou.com"," logistics.iapi.ymatou.com"," pullnew.iapi.ymatou.com"," register.s1.ymatou.com"," live.iapi.ymatou.com"," fileupload.iapi.ymatou.com"," sellernotice.s1.ymatou.com"," bgprobizer.iapi.ymatou.com"," settlement.iapi.ymatou.com"," sellerauth.iapi.ymatou.com"," YmatouMQPublishService"," restkeeper.ymatou.cn"," api.deliverytimetask.ymatou.com"," jyh.s1.ymatou.com"," comment2.iapi.ymatou.com"," topicrecbizer.iapi.ymatou.com"," static.s1.ymatou.com"," gspadmin.ymatou.cn"," shoppingcart.app.ymatou.com"," globalconf.app.ymatou.com"," api.mq.push.ymatou.com"," advancewithdraw.iapi.ymatou.com"," sq0.s1.ymatou.com"," pullnew.jsapi.ymatou.com"," comments.iapi.ymatou.com"," misc.iapi.ymatou.com"," api.social.ymatou.com"," mqcompensate.iapi.ymatou.com"," socialbizer.ymatou.com"," userregister.ymatou.com"," topic.m.ymatou.com"," special.iapi.ymatou.com"," sellergsp.iapi.ymatou.com"," TradingMQConsumeService"," sellerproduct.s1.ymatou.com"," marketing.m.ymatou.com"," sellerproduct.app.ymatou.com"," sellerfund.s1.ymatou.com"," notice.seller.ymatou.com"," evtadmin.ymatou.cn"," SyncProductSaleTask"," UserPushMQConsumeService"," api.riskcontrol.ymatou.com"," search.app.ymatou.com"," delivery.jsapi.ymatou.com"," alarmmanager.ymatou.cn"," YmatouOrderSyncService"," sellerproduct.iapi.ymatou.com"," socialindexer.ymatou.com"," api.promotion.ymatou.com"," game.iapi.ymatou.com"," operate.sellerfund.iapi.ymatou.com"," tradequota.iapi.ymatou.com"," sellerorderbizer.iapi.ymatou.com"," rec.app.ymatou.com"," marketingseller.api.ymatou.com"," YmatouExpress.DeliveryHandler"," marketingm.s1.ymatou.com"," topicrecindexer.iapi.ymatou.com"," lp.s1.ymatou.com"," VipMQConsumeService"," sellerpromotion.api.ymatou.com"," a.data.ymatou.cn"," couponactivity.iapi.ymatou.com"," appadmin.ymatou.cn"," api.mq.secondary.ymatou.com"," userbehavior.iapi.ymatou.com"," delivery.s1.ymatou.com"," auth.ymatou.com"," mqdispatch1.iapi.ymatou.com"," a.productbundle.ymatou.cn"," im2.iapi.ymatou.com"," api.vip.mq.ymatou.com"," fundstrategy.iapi.ymatou.com"," price.iapi.ymatou.com"," coupon.m.ymatou.com"," sq.s1.ymatou.com"," home1.app.ymatou.com"," cs1.ymatou.cn"," globalconf.iapi.ymatou.com"," userservice.ymatou.com"," game.jsapi.ymatou.com"," Ymatou.IM.DataRepair.WinService"," seller.ymatou.com"," imyy.ymatou.cn"," fp.s1.ymatou.com"," api.accounting.i.ymatou.com"," rpcadmin.ymatou.cn"," orderm.s1.ymatou.com"," serviceapi.evt.ymatou.com"," SyncAccounctinfoConsole"," logistics.m.ymatou.com"," sellersoslave1.ymatou.com"," productlist.iapi.ymatou.com"," tuan.iapi.ymatou.com"," mqpublish.iapi.ymatou.com"," collect.iapi.ymatou.com"," matouapp.s1.ymatou.com"," rule.atc.iapi.ymatou.com"," productviolate.iapi.ymatou.com"," csadmin.s1.ymatou.com"," slogin.s1.ymatou.com"," notem.s1.ymatou.com"," static1.ymatou.com"," sellerregister.iapi.ymatou.com"," Ymatou.App.AppAdmin.PushMessageService"," cwf.ymatou.cn"," bgproindexer.iapi.ymatou.com"," suggestbizer.ymatou.com"," wap.s1.ymatou.com"," guess.app.ymatou.com"," gameadmin.ymatou.cn"," preorderapp.s1.ymatou.com"," coupon.s1.ymatou.com"," sellerservice.evt.ymatou.com"," YmatouMQConsumeService"," ab.ymatou.com"," activity.s1.ymatou.com"," iksmart.iapi.ymatou.com"," YmatouSyncDataTask"," livemanage.iapi.ymatou.com"," shop.s1.ymatou.com"," query.invoice.iapi.ymatou.com"," api.trading.operate.ymatou.com"," shoppingcart.iapi.ymatou.com"," msstock.iapi.ymatou.com"," sellernotice.iapi.ymatou.com"," sellerhome.ymatou.com"," productprofile"," sellerordermsg.iapi.ymatou.com"," sellerhub.jsapi.ymatou.com"," lp.m.ymatou.com"," admin.ymatou.cn"," topic.s1.ymatou.com"," selleractivity.iapi.ymatou.com"," delivery.ymatou.com"," prodextra.app.ymatou.com"," feedindexer.ymatou.com"," sellerallocation.iapi.ymatou.com"," social.app.ymatou.com"," evtc.m.ymatou.com"," sadmin.s2.ymatou.com"," ms.m.ymatou.com"," api.trading.seller.query.ymatou.com"," item.m.ymatou.com"," livem.s1.ymatou.com"," msadmin.ymatou.cn"," tag.iapi.ymatou.com"," order.ymatou.com"," a.activity.ymatou.com"," sq.m.ymatou.com"," api.productcategory.ymatou.com"," cs.ymatou.cn"," missionadmin.ymatou.cn"," sellerhub.ymatou.com"," mq.admin.ymatou.com"," api.invoice.query.ymatou.com"," productstock.iapi.ymatou.com"," itemm.s1.ymatou.com"," activityadmin.ymatou.cn"," evt.jsapi.ymatou.com"," datamonitor.ymatou.cn"," slogin.ymatou.com"," live.m.ymatou.com"," activity4weibo.iapi.ymatou.com"," home.m.ymatou.com"," api.productstock.ymatou.com"," api.privilege.ymatou.com"," coupon.app.ymatou.com"," live.app.ymatou.com"," bpm.s1.ymatou.com"," sellerservice.s1.ymatou.com"," couponm.s1.ymatou.com"," brand.iapi.ymatou.com"," social.iapi.ymatou.com"," sellerservice.ymatou.cn"," sellercsim.iapi.ymatou.com"," cs.s1.ymatou.com"," c2clivebizer.ymatou.com"," account.m.ymatou.com"," Ymatou.Counter.Server"," batchpush.iapi.ymatou.com"," operate.invoice.iapi.ymatou.com"," ms.jsapi.ymatou.com"," api.invoice.operate.ymatou.com"," ordercenter.iapi.ymatou.com"," keyword.app.iapi.ymatou.com"," sellerquery.trading.iapi.ymatou.com"," atc.ymatou.cn"," ms.ymatou.com"," productadmin.ymatou.cn"," sellerhome.m.ymatou.com"," relation.app.ymatou.com"," messagebus.admin.ymatou.cn"," about.ymatou.com"," trading.app.ymatou.com"," deeplink.m.ymatou.com"," sellersomaster.ymatou.com"," homem.s1.ymatou.com"," comment.iapi.ymatou.com"," feedbizer.ymatou.com"," imyy.seller.ymatou.com"," refundm.s1.ymatou.com"," accountm.s1.ymatou.com"," appconf.iapi.ymatou.com"," disconf.iapi.ymatou.com"," paygetway.ymatou.com"," wxgateway.ymatou.com"," Ymatou.CSIM.Task.DaemonServices"," tuan.s1.ymatou.com"," disconfadmin.ymatou.cn"," c2cliveindexer.ymatou.com"," favorite.app.ymatou.com"," sellergspjobws.iapi.ymatou.com"," messageindexer.iapi.ymatou.com"," rpc.iapi.ymatou.com"," evt.iapi.ymatou.com"," diary.m.ymatou.com"," sellerinfo.iapi.ymatou.com"," authapp.ymatou.com"," sellersoslave.ymatou.com"," pk.s1.ymatou.com"," sellerhomepc.s1.ymatou.com"," livequery.iapi.ymatou.com"," pl.jsapi.ymatou.com"," sq0.m.ymatou.com"," nodehome.app.ymatou.com"," admin.messageroute.ymatou.com"," FundPlatformReportService"," a.ymatou.cn"," activityadmin.s1.ymatou.com"," deliverytimetask.iapi.ymatou.com"," ReturnBillTimerService"," seller.s2.ymatou.com"," selleraccount.iapi.ymatou.com"," media.app.ymatou.com"," marketingseller.ymatou.com"," usercenter.app.ymatou.com"," static.ymatou.com"," prod.iapi.ymatou.com"," Ymatou.Push.TaskService"," SaveOrderStockBackService"," indexer.atc.iapi.ymatou.com"," liveproduct.iapi.ymatou.com"," fundcommission.iapi.ymatou.com"," operate.trading.iapi.ymatou.com"," Ymatou.SellerCSIM.TaskService"," myorderm.s1.ymatou.com"," orderseller.s1.ymatou.com"," api.img.ymatou.com"," user.iapi.ymatou.com"," productitem.iapi.ymatou.com"," freightmanager.iapi.ymatou.com"," fp.ymatou.cn"," SysnActivityMongoDBService"," ups.iapi.ymatou.com"," activity.m.ymatou.com"," sloginapp.ymatou.com"," dubboadmin.ymatou.cn"," payment.iapi.ymatou.com"," YmatouSellerNoticeTimerServices"," order.m.ymatou.com"," sellerorderindexer.iapi.ymatou.com"," a.tuan.ymatou.cn"," coupon.ymatou.cn"," ordercenter.app.ymatou.com"," preorder.iapi.ymatou.com"," sadmin.s1.ymatou.com"," mockforpay.iapi.ymatou.com"," api.sellergrowthsystem.ymatou.com"," sellergrowthsystem.iapi.ymatou.com"," marketingseller.s1.ymatou.com"," couponadmin.s1.ymatou.com"," ymtlog.ymatou.com"," api.csim.i.ymatou.com"," suggestindexer.ymatou.com"," sop.iapi.ymatou.com"," a.evt.ymatou.com"," freight.iapi.ymatou.com"," jslog.api.ymatou.com"," favorite.iapi.ymatou.com"," Ymatou.SellerCSIM.Task.DaemonServices"," YmatouSecondHalfPriceTask"," myorder.m.ymatou.com"," FundPlatformDownloadService"," api.mq.ymatou.com"," note.m.ymatou.com"," sellerhome.s1.ymatou.com"," refund.m.ymatou.com"];

    console.log(siteArr.length);

    for (i = 0; i < siteArr.length; i++) {
    	console.log("第"+i+"个")
        $.ajax({
            url: "createApplication.action",
            type: "post",
            data: {
                "domain": siteArr[i].trim(),
                "name": "",
                "applicationtypeid": "11",
                "departmentid": "10",
                "devs": ""
            },
            dataType: "json",
            success: function(data) {
                console.log(data.retMSG);
            },
            error: function(data) {
                console.log(data.retMSG);
            }
        });
    }
}
