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



function addSiteENVS() {
    var appInfosArr = [{"appid":"600","envid":"1"},{"appid":"600","envid":"3"},{"appid":"556","envid":"1"},{"appid":"556","envid":"3"},{"appid":"561","envid":"1"},{"appid":"561","envid":"3"},{"appid":"567","envid":"1"},{"appid":"567","envid":"3"},{"appid":"452","envid":"1"},{"appid":"452","envid":"3"},{"appid":"414","envid":"1"},{"appid":"414","envid":"3"},{"appid":"575","envid":"1"},{"appid":"575","envid":"3"},{"appid":"406","envid":"3"},{"appid":"415","envid":"3"},{"appid":"427","envid":"3"},{"appid":"462","envid":"1"},{"appid":"462","envid":"3"},{"appid":"543","envid":"1"},{"appid":"543","envid":"3"},{"appid":"520","envid":"1"},{"appid":"520","envid":"4"},{"appid":"520","envid":"3"},{"appid":"445","envid":"1"},{"appid":"445","envid":"3"},{"appid":"566","envid":"1"},{"appid":"566","envid":"3"},{"appid":"597","envid":"1"},{"appid":"597","envid":"3"},{"appid":"569","envid":"1"},{"appid":"569","envid":"3"},{"appid":"425","envid":"1"},{"appid":"425","envid":"3"},{"appid":"253","envid":"4"},{"appid":"257","envid":"4"},{"appid":"419","envid":"1"},{"appid":"419","envid":"4"},{"appid":"419","envid":"3"},{"appid":"599","envid":"1"},{"appid":"599","envid":"3"},{"appid":"580","envid":"1"},{"appid":"580","envid":"3"},{"appid":"473","envid":"1"},{"appid":"473","envid":"3"},{"appid":"1","envid":"4"},{"appid":"431","envid":"1"},{"appid":"431","envid":"3"},{"appid":"3","envid":"4"},{"appid":"435","envid":"1"},{"appid":"435","envid":"3"},{"appid":"584","envid":"1"},{"appid":"584","envid":"3"},{"appid":"557","envid":"1"},{"appid":"557","envid":"3"},{"appid":"471","envid":"1"},{"appid":"471","envid":"3"},{"appid":"531","envid":"1"},{"appid":"531","envid":"3"},{"appid":"379","envid":"1"},{"appid":"379","envid":"3"},{"appid":"524","envid":"1"},{"appid":"524","envid":"3"},{"appid":"542","envid":"1"},{"appid":"542","envid":"3"},{"appid":"577","envid":"1"},{"appid":"577","envid":"3"},{"appid":"474","envid":"1"},{"appid":"474","envid":"3"},{"appid":"508","envid":"1"},{"appid":"508","envid":"3"},{"appid":"558","envid":"1"},{"appid":"558","envid":"3"},{"appid":"504","envid":"1"},{"appid":"504","envid":"3"},{"appid":"14","envid":"1"},{"appid":"14","envid":"3"},{"appid":"482","envid":"1"},{"appid":"482","envid":"3"},{"appid":"399","envid":"1"},{"appid":"399","envid":"3"},{"appid":"418","envid":"1"},{"appid":"418","envid":"3"},{"appid":"22","envid":"4"},{"appid":"594","envid":"1"},{"appid":"594","envid":"3"},{"appid":"391","envid":"3"},{"appid":"37","envid":"4"},{"appid":"523","envid":"1"},{"appid":"523","envid":"3"},{"appid":"501","envid":"1"},{"appid":"501","envid":"3"},{"appid":"398","envid":"3"},{"appid":"434","envid":"3"},{"appid":"601","envid":"3"},{"appid":"43","envid":"4"},{"appid":"46","envid":"4"},{"appid":"49","envid":"4"},{"appid":"50","envid":"4"},{"appid":"53","envid":"4"},{"appid":"589","envid":"1"},{"appid":"589","envid":"3"},{"appid":"63","envid":"4"},{"appid":"65","envid":"4"},{"appid":"437","envid":"3"},{"appid":"432","envid":"1"},{"appid":"432","envid":"3"},{"appid":"538","envid":"1"},{"appid":"538","envid":"3"},{"appid":"526","envid":"1"},{"appid":"526","envid":"3"},{"appid":"69","envid":"4"},{"appid":"70","envid":"4"},{"appid":"519","envid":"1"},{"appid":"519","envid":"3"},{"appid":"384","envid":"1"},{"appid":"384","envid":"4"},{"appid":"384","envid":"3"},{"appid":"463","envid":"1"},{"appid":"463","envid":"4"},{"appid":"463","envid":"3"},{"appid":"513","envid":"1"},{"appid":"513","envid":"3"},{"appid":"372","envid":"1"},{"appid":"372","envid":"3"},{"appid":"74","envid":"4"},{"appid":"76","envid":"4"},{"appid":"455","envid":"1"},{"appid":"455","envid":"3"},{"appid":"535","envid":"1"},{"appid":"535","envid":"4"},{"appid":"535","envid":"3"},{"appid":"395","envid":"1"},{"appid":"395","envid":"3"},{"appid":"400","envid":"1"},{"appid":"400","envid":"3"},{"appid":"510","envid":"1"},{"appid":"510","envid":"3"},{"appid":"439","envid":"1"},{"appid":"439","envid":"3"},{"appid":"470","envid":"1"},{"appid":"470","envid":"3"},{"appid":"583","envid":"1"},{"appid":"583","envid":"3"},{"appid":"364","envid":"1"},{"appid":"364","envid":"3"},{"appid":"590","envid":"1"},{"appid":"590","envid":"3"},{"appid":"512","envid":"1"},{"appid":"512","envid":"3"},{"appid":"515","envid":"1"},{"appid":"515","envid":"3"},{"appid":"499","envid":"1"},{"appid":"499","envid":"3"},{"appid":"441","envid":"1"},{"appid":"458","envid":"1"},{"appid":"458","envid":"3"},{"appid":"464","envid":"1"},{"appid":"464","envid":"3"},{"appid":"505","envid":"1"},{"appid":"505","envid":"3"},{"appid":"533","envid":"1"},{"appid":"533","envid":"3"},{"appid":"416","envid":"1"},{"appid":"416","envid":"3"},{"appid":"433","envid":"1"},{"appid":"433","envid":"3"},{"appid":"483","envid":"1"},{"appid":"483","envid":"3"},{"appid":"559","envid":"1"},{"appid":"559","envid":"3"},{"appid":"547","envid":"1"},{"appid":"547","envid":"3"},{"appid":"377","envid":"1"},{"appid":"377","envid":"3"},{"appid":"341","envid":"3"},{"appid":"340","envid":"3"},{"appid":"579","envid":"1"},{"appid":"579","envid":"3"},{"appid":"549","envid":"1"},{"appid":"549","envid":"3"},{"appid":"502","envid":"1"},{"appid":"502","envid":"3"},{"appid":"413","envid":"1"},{"appid":"413","envid":"3"},{"appid":"490","envid":"1"},{"appid":"490","envid":"3"},{"appid":"95","envid":"4"},{"appid":"596","envid":"1"},{"appid":"596","envid":"3"},{"appid":"96","envid":"4"},{"appid":"97","envid":"4"},{"appid":"385","envid":"1"},{"appid":"385","envid":"4"},{"appid":"385","envid":"3"},{"appid":"447","envid":"1"},{"appid":"447","envid":"3"},{"appid":"574","envid":"1"},{"appid":"574","envid":"3"},{"appid":"350","envid":"3"},{"appid":"573","envid":"1"},{"appid":"573","envid":"3"},{"appid":"363","envid":"1"},{"appid":"363","envid":"3"},{"appid":"362","envid":"1"},{"appid":"362","envid":"4"},{"appid":"362","envid":"3"},{"appid":"421","envid":"1"},{"appid":"421","envid":"3"},{"appid":"444","envid":"1"},{"appid":"444","envid":"3"},{"appid":"468","envid":"1"},{"appid":"468","envid":"3"},{"appid":"397","envid":"1"},{"appid":"397","envid":"4"},{"appid":"397","envid":"3"},{"appid":"442","envid":"1"},{"appid":"442","envid":"4"},{"appid":"442","envid":"3"},{"appid":"393","envid":"1"},{"appid":"393","envid":"3"},{"appid":"466","envid":"1"},{"appid":"466","envid":"3"},{"appid":"509","envid":"1"},{"appid":"509","envid":"3"},{"appid":"443","envid":"3"},{"appid":"536","envid":"1"},{"appid":"536","envid":"3"},{"appid":"472","envid":"1"},{"appid":"472","envid":"3"},{"appid":"436","envid":"1"},{"appid":"436","envid":"3"},{"appid":"537","envid":"1"},{"appid":"537","envid":"3"},{"appid":"446","envid":"1"},{"appid":"446","envid":"3"},{"appid":"568","envid":"1"},{"appid":"568","envid":"3"},{"appid":"492","envid":"1"},{"appid":"492","envid":"3"},{"appid":"503","envid":"1"},{"appid":"503","envid":"3"},{"appid":"595","envid":"1"},{"appid":"595","envid":"3"},{"appid":"392","envid":"1"},{"appid":"392","envid":"3"},{"appid":"336","envid":"4"},{"appid":"511","envid":"1"},{"appid":"511","envid":"4"},{"appid":"511","envid":"3"},{"appid":"386","envid":"1"},{"appid":"386","envid":"4"},{"appid":"386","envid":"3"},{"appid":"506","envid":"1"},{"appid":"506","envid":"3"},{"appid":"494","envid":"1"},{"appid":"494","envid":"3"},{"appid":"371","envid":"1"},{"appid":"371","envid":"3"},{"appid":"337","envid":"4"},{"appid":"369","envid":"1"},{"appid":"369","envid":"4"},{"appid":"369","envid":"3"},{"appid":"381","envid":"1"},{"appid":"381","envid":"3"},{"appid":"451","envid":"1"},{"appid":"451","envid":"3"},{"appid":"380","envid":"1"},{"appid":"380","envid":"3"},{"appid":"481","envid":"1"},{"appid":"481","envid":"3"},{"appid":"428","envid":"1"},{"appid":"428","envid":"3"},{"appid":"134","envid":"4"},{"appid":"409","envid":"1"},{"appid":"409","envid":"3"},{"appid":"426","envid":"1"},{"appid":"426","envid":"3"},{"appid":"424","envid":"1"},{"appid":"424","envid":"4"},{"appid":"424","envid":"3"},{"appid":"591","envid":"1"},{"appid":"591","envid":"3"},{"appid":"565","envid":"1"},{"appid":"565","envid":"3"},{"appid":"454","envid":"1"},{"appid":"454","envid":"3"},{"appid":"563","envid":"1"},{"appid":"563","envid":"3"},{"appid":"375","envid":"1"},{"appid":"375","envid":"3"},{"appid":"530","envid":"1"},{"appid":"530","envid":"3"},{"appid":"548","envid":"1"},{"appid":"548","envid":"3"},{"appid":"403","envid":"1"},{"appid":"403","envid":"4"},{"appid":"403","envid":"3"},{"appid":"498","envid":"1"},{"appid":"498","envid":"3"},{"appid":"587","envid":"1"},{"appid":"587","envid":"4"},{"appid":"587","envid":"3"},{"appid":"138","envid":"4"},{"appid":"370","envid":"1"},{"appid":"370","envid":"4"},{"appid":"370","envid":"3"},{"appid":"368","envid":"4"},{"appid":"368","envid":"3"},{"appid":"366","envid":"3"},{"appid":"522","envid":"1"},{"appid":"522","envid":"3"},{"appid":"491","envid":"1"},{"appid":"491","envid":"3"},{"appid":"496","envid":"1"},{"appid":"496","envid":"4"},{"appid":"496","envid":"3"},{"appid":"476","envid":"1"},{"appid":"476","envid":"4"},{"appid":"476","envid":"3"},{"appid":"598","envid":"1"},{"appid":"598","envid":"3"},{"appid":"570","envid":"1"},{"appid":"570","envid":"3"},{"appid":"555","envid":"1"},{"appid":"555","envid":"3"},{"appid":"602","envid":"1"},{"appid":"602","envid":"3"},{"appid":"459","envid":"1"},{"appid":"459","envid":"3"},{"appid":"411","envid":"1"},{"appid":"411","envid":"3"},{"appid":"521","envid":"1"},{"appid":"521","envid":"4"},{"appid":"521","envid":"3"},{"appid":"420","envid":"1"},{"appid":"420","envid":"3"},{"appid":"357","envid":"4"},{"appid":"357","envid":"3"},{"appid":"581","envid":"1"},{"appid":"581","envid":"3"},{"appid":"493","envid":"1"},{"appid":"493","envid":"3"},{"appid":"585","envid":"1"},{"appid":"585","envid":"3"},{"appid":"361","envid":"1"},{"appid":"361","envid":"3"},{"appid":"448","envid":"1"},{"appid":"448","envid":"3"},{"appid":"571","envid":"1"},{"appid":"571","envid":"3"},{"appid":"541","envid":"1"},{"appid":"541","envid":"4"},{"appid":"541","envid":"3"},{"appid":"356","envid":"4"},{"appid":"356","envid":"3"},{"appid":"551","envid":"1"},{"appid":"551","envid":"3"},{"appid":"553","envid":"1"},{"appid":"553","envid":"3"},{"appid":"347","envid":"3"},{"appid":"469","envid":"1"},{"appid":"469","envid":"3"},{"appid":"438","envid":"1"},{"appid":"438","envid":"4"},{"appid":"438","envid":"3"},{"appid":"378","envid":"1"},{"appid":"378","envid":"3"},{"appid":"349","envid":"4"},{"appid":"349","envid":"3"},{"appid":"486","envid":"1"},{"appid":"486","envid":"3"},{"appid":"528","envid":"1"},{"appid":"528","envid":"3"},{"appid":"344","envid":"4"},{"appid":"344","envid":"3"},{"appid":"342","envid":"4"},{"appid":"342","envid":"3"},{"appid":"150","envid":"4"},{"appid":"358","envid":"3"},{"appid":"457","envid":"1"},{"appid":"457","envid":"3"},{"appid":"382","envid":"1"},{"appid":"382","envid":"3"},{"appid":"401","envid":"1"},{"appid":"401","envid":"3"},{"appid":"335","envid":"4"},{"appid":"155","envid":"4"},{"appid":"604","envid":"1"},{"appid":"604","envid":"3"},{"appid":"539","envid":"1"},{"appid":"539","envid":"3"},{"appid":"383","envid":"1"},{"appid":"383","envid":"3"},{"appid":"159","envid":"4"},{"appid":"390","envid":"1"},{"appid":"390","envid":"3"},{"appid":"546","envid":"1"},{"appid":"546","envid":"4"},{"appid":"546","envid":"3"},{"appid":"449","envid":"1"},{"appid":"449","envid":"3"},{"appid":"456","envid":"1"},{"appid":"456","envid":"3"},{"appid":"586","envid":"1"},{"appid":"586","envid":"3"},{"appid":"489","envid":"1"},{"appid":"489","envid":"3"},{"appid":"417","envid":"1"},{"appid":"417","envid":"3"},{"appid":"376","envid":"1"},{"appid":"376","envid":"3"},{"appid":"560","envid":"1"},{"appid":"560","envid":"3"},{"appid":"170","envid":"4"},{"appid":"562","envid":"1"},{"appid":"562","envid":"3"},{"appid":"484","envid":"1"},{"appid":"484","envid":"3"},{"appid":"487","envid":"1"},{"appid":"487","envid":"3"},{"appid":"389","envid":"1"},{"appid":"389","envid":"3"},{"appid":"516","envid":"1"},{"appid":"516","envid":"3"},{"appid":"412","envid":"1"},{"appid":"412","envid":"3"},{"appid":"588","envid":"1"},{"appid":"588","envid":"3"},{"appid":"407","envid":"1"},{"appid":"407","envid":"3"},{"appid":"545","envid":"1"},{"appid":"545","envid":"3"},{"appid":"529","envid":"1"},{"appid":"529","envid":"3"},{"appid":"603","envid":"1"},{"appid":"603","envid":"3"},{"appid":"477","envid":"1"},{"appid":"477","envid":"3"},{"appid":"552","envid":"1"},{"appid":"552","envid":"3"},{"appid":"480","envid":"1"},{"appid":"480","envid":"3"},{"appid":"500","envid":"1"},{"appid":"500","envid":"3"},{"appid":"354","envid":"4"},{"appid":"354","envid":"3"},{"appid":"478","envid":"1"},{"appid":"478","envid":"3"},{"appid":"387","envid":"1"},{"appid":"387","envid":"3"},{"appid":"422","envid":"1"},{"appid":"422","envid":"3"},{"appid":"582","envid":"1"},{"appid":"582","envid":"3"},{"appid":"479","envid":"1"},{"appid":"479","envid":"3"},{"appid":"410","envid":"1"},{"appid":"410","envid":"3"},{"appid":"360","envid":"1"},{"appid":"360","envid":"3"},{"appid":"408","envid":"1"},{"appid":"408","envid":"3"},{"appid":"430","envid":"1"},{"appid":"430","envid":"4"},{"appid":"430","envid":"3"},{"appid":"525","envid":"1"},{"appid":"525","envid":"4"},{"appid":"525","envid":"3"},{"appid":"465","envid":"1"},{"appid":"465","envid":"3"},{"appid":"174","envid":"4"},{"appid":"514","envid":"1"},{"appid":"514","envid":"3"},{"appid":"518","envid":"1"},{"appid":"518","envid":"3"},{"appid":"534","envid":"1"},{"appid":"534","envid":"3"},{"appid":"550","envid":"1"},{"appid":"550","envid":"3"},{"appid":"450","envid":"1"},{"appid":"450","envid":"3"},{"appid":"176","envid":"4"},{"appid":"388","envid":"1"},{"appid":"388","envid":"3"},{"appid":"475","envid":"1"},{"appid":"475","envid":"3"},{"appid":"396","envid":"1"},{"appid":"396","envid":"3"},{"appid":"359","envid":"4"},{"appid":"359","envid":"3"},{"appid":"460","envid":"1"},{"appid":"460","envid":"3"},{"appid":"507","envid":"1"},{"appid":"507","envid":"3"},{"appid":"578","envid":"1"},{"appid":"578","envid":"3"},{"appid":"488","envid":"1"},{"appid":"488","envid":"3"},{"appid":"517","envid":"1"},{"appid":"517","envid":"3"},{"appid":"184","envid":"4"},{"appid":"185","envid":"4"},{"appid":"593","envid":"1"},{"appid":"593","envid":"3"},{"appid":"404","envid":"1"},{"appid":"404","envid":"3"},{"appid":"497","envid":"1"},{"appid":"497","envid":"3"},{"appid":"440","envid":"1"},{"appid":"440","envid":"3"},{"appid":"554","envid":"1"},{"appid":"554","envid":"3"},{"appid":"402","envid":"1"},{"appid":"402","envid":"3"},{"appid":"394","envid":"1"},{"appid":"394","envid":"3"},{"appid":"205","envid":"4"},{"appid":"461","envid":"1"},{"appid":"461","envid":"3"},{"appid":"211","envid":"4"},{"appid":"212","envid":"4"},{"appid":"495","envid":"1"},{"appid":"495","envid":"3"},{"appid":"405","envid":"1"},{"appid":"405","envid":"3"},{"appid":"485","envid":"1"},{"appid":"485","envid":"3"},{"appid":"345","envid":"4"},{"appid":"429","envid":"1"},{"appid":"429","envid":"4"},{"appid":"429","envid":"3"},{"appid":"423","envid":"1"},{"appid":"423","envid":"3"},{"appid":"532","envid":"1"},{"appid":"532","envid":"4"},{"appid":"532","envid":"3"},{"appid":"453","envid":"1"},{"appid":"453","envid":"3"},{"appid":"544","envid":"1"},{"appid":"544","envid":"3"},{"appid":"576","envid":"1"},{"appid":"576","envid":"3"},{"appid":"572","envid":"1"},{"appid":"572","envid":"3"},{"appid":"351","envid":"4"},{"appid":"351","envid":"3"},{"appid":"564","envid":"1"},{"appid":"564","envid":"4"},{"appid":"564","envid":"3"},{"appid":"224","envid":"4"},{"appid":"467","envid":"1"},{"appid":"467","envid":"3"},{"appid":"540","envid":"1"},{"appid":"540","envid":"3"},{"appid":"592","envid":"1"},{"appid":"592","envid":"3"}];

    console.log(appInfosArr.length);

    for (i = 0; i < appInfosArr.length; i++) {
        $.ajax({
            url: "createApplicationEnv.action",
            type: "post",
            data: {
                "applicationid": appInfosArr[i].appid,
                "envid": appInfosArr[i].envid,
                "vminfoid": "",
                "dnsip": "",
                "localport": "",
                "port": ""
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

