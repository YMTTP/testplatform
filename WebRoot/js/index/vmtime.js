/**
 * Created by chenjiazhu on 2017/5/10.
 */
var vmtime = avalon.define({
	$id : 'vmtime',

	// VM Start
	pagesize1 : "20",
	pagesize1Cls : "pageSizeSelected",
	pagesize2 : "50",
	pagesize2Cls : "",
	pagesize3 : "100",
	pagesize3Cls : "",
	changePageSize : function(pgsize) {
		vmtime.jpageSize = pgsize;
		vmtime.listVmInfosByPage("init");
	},
	clearsearch : function() {
		vmtime.conType = "";
		vmtime.listVmInfosByPage("init");
	},
	jpageIndex : 1,
	jpageSize : 20,
	envType : "STRESS",
	conType : "",

	vmsList : [],

	listVmInfosByPage : function(tag) {
		if (tag) {
			vmtime.jpageIndex = 1;
		}
		$.ajax({
			type : "post",
			url : 'listVmInfosByPageByEnvType.action',
			data : {
				"pageindex" : vmtime.jpageIndex,
				"pagesize" : vmtime.jpageSize,
				"type" : vmtime.conType,
				"envType" : vmtime.envType
			},
			dataType : "json",
			success : function(data) {
				if (tag) {
					$('#pagination').bootpag({
						total : data.pagenum,
						page : vmtime.jpageIndex
					});
				}
				if (data.retCode == "1000") {
					vmtime.vmsList = data.vms;
				} else {
					alert(data.retMSG);
				}
				$("[class^=time]").html("");
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求数据异常，状态码：" + XMLHttpRequest.status + ",Error:"
						+ errorThrown + ",textStatus:" + textStatus);
			}
		});
	},

	postViewStatus : function(name, ip,os) {

		$(".loadDiv_view_" + name).show();
		$(".buttonDiv_view_" + name).hide();

		$.ajax({
			type : "post",
			url : 'viewDate.action',
			data : {
				"ip" : ip,
				"os":os
			},
			dataType : "json",

			success : function(data) {
				$(".time_" + name).html(data.retCode);

				$(".loadDiv_view_" + name).hide();
				$(".buttonDiv_view_" + name).show();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求数据异常，状态码：" + XMLHttpRequest.status + ",Error:"
						+ errorThrown + ",textStatus:" + textStatus);
				$(".loadDiv_view_" + name).hide();
				$(".buttonDiv_view_" + name).show();
			}
		});

	},

	postDeploy : function(name, ip, os) {

		$(".loadDiv_" + name).show();
		$(".buttonDiv_" + name).hide();

		$.ajax({
			type : "post",
			url : 'syncDate.action',
			data : {
				"ip" : ip,
				"os":os
			},
			dataType : "json",
			success : function(data) {
				$(".loadDiv_" + name).hide();
				$(".buttonDiv_" + name).show();

				$(".time_" + name).html(data.retCode);

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$(".loadDiv_" + name).hide();
				$(".buttonDiv_" + name).show();
				alert("请求数据异常，状态码：" + XMLHttpRequest.status + ",<br/>"
						+ XMLHttpRequest.readyState + ",<br/>"
						+ XMLHttpRequest.responseText + ",<br/>Error:"
						+ errorThrown + ",<br/>textStatus:" + textStatus);
			}
		});
	},

	viewAllStatus : function() {
		$("input[type='checkbox']").each(function() {
			if ($(this).get(0).checked) {

				var name = $(this).attr("class").substr(6);
				// alert(name);
				$(".i_view_" + name).click();
			}

		});
	},

	deployAll : function() {
		$("input[type='checkbox']").each(function() {
			if ($(this).get(0).checked) {

				var name = $(this).attr("class").substr(6);
				// alert(name);
				$(".i_" + name).click();
			}

		});
	},

	checkAll : function() {
		$("input[type='checkbox']").each(function() {
			$(this).attr("checked", "true");
		});
	},

	uncheckAll : function() {
		$("input[type='checkbox']").each(function() {
			$(this).removeAttr("checked");
		});
	},

	loadVmTAB : function() {
		vmtime.listVmInfosByPage("init");
		$('#vms').tab('show');
	},
	// VM END
	userOps : ops(4),
	bootpagFuc : function() {

		$('#pagination').bootpag({
			total : 1,
			maxVisible : 10
		}).on('page', function(event, num) {
			vmtime.jpageIndex = num;
			vmtime.listVmInfosByPage();
		});
	}
});

/*
avalon.ready(function() {
    appsvm.bootpagFuc();
    appsvm.listApp("init");
    appsvm.depList = getAllDepartments();
    appsvm.envsList = getAllEnvs();
    appsvm.applicationsTypeList = getAllAppType();
});*/

avalon.ready(function() {
/*	if (vmtime.userOps) {
		vmtime.loadVmTAB();

	} else {
		redirectAdminIndexPage();
	}*/
	vmtime.bootpagFuc();
	vmtime.listVmInfosByPage("init");
	// $(".loadDiv").hide();
});

vmtime.$watch("jpageSize", function(newValue) {
	vmtime.pagesize1Cls = "";
	vmtime.pagesize2Cls = "";
	vmtime.pagesize3Cls = "";
	if (newValue == vmtime.pagesize1) {
		vmtime.pagesize1Cls = "pageSizeSelected";
	} else if (newValue == vmtime.pagesize2) {
		vmtime.pagesize2Cls = "pageSizeSelected";
	} else if (newValue == vmtime.pagesize3) {
		vmtime.pagesize3Cls = "pageSizeSelected";
	}
})