/**
 * Created by chenjiazhu on 2017/5/10.
 */
var vmdisk = avalon.define({
	$id : 'vmdisk',

	// VM Start
	pagesize1 : "20",
	pagesize1Cls : "pageSizeSelected",
	pagesize2 : "50",
	pagesize2Cls : "",
	pagesize3 : "100",
	pagesize3Cls : "",
	changePageSize : function(pgsize) {
		vmdisk.jpageSize = pgsize;
		vmdisk.listVmInfosByPage("init");
	},
	clearsearch : function() {
		vmdisk.conType = "";
		vmdisk.listVmInfosByPage("init");
	},
	jpageIndex : 1,
	jpageSize : 20,
	envType : "STRESS",
	conType : "",

	vmsList : [],

	listVmInfosByPage : function(tag) {
		if (tag) {
			vmdisk.jpageIndex = 1;
		}
		$.ajax({
			type : "post",
			url : 'listVmInfosByPageByEnvType.action',
			data : {
				"pageindex" : vmdisk.jpageIndex,
				"pagesize" : vmdisk.jpageSize,
				"type" : vmdisk.conType,
				"envType" : vmdisk.envType
			},
			dataType : "json",
			success : function(data) {
				if (tag) {
					$('#pagination').bootpag({
						total : data.pagenum,
						page : vmdisk.jpageIndex
					});
				}
				if (data.retCode == "1000") {
					vmdisk.vmsList = data.vms;
				} else {
					alert(data.retMSG);
				}

				$("[class^=free]").html("");
				$("[class^=total]").html("");
				$("[class*=progress-bar]").css("width", "0%");
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求数据异常，状态码：" + XMLHttpRequest.status + ",Error:"
						+ errorThrown + ",textStatus:" + textStatus);
			}
		});
	},

	postViewStatus : function(name, ip, os) {

		$(".loadDiv_view_" + name).show();
		$(".buttonDiv_view_" + name).hide();

		$
				.ajax({
					type : "post",
					url : 'viewDisk.action',
					data : {
						"ip" : ip,
						"os" : os
					},
					dataType : "json",

					success : function(data) {

						if (data.retCode == "1") {
							$(".free_" + name).html("fail");
							$(".total_" + name).html("fail");
						} else {
							$(".free_" + name).html(data.result[0]);
							$(".total_" + name).html(data.result[1]);
							
							var processdata = 100
									- (data.result[0] * 100 / data.result[1]);
							$(".process_" + name).css("width", processdata+"%");

							if (processdata > 90) {
								$(".process_" + name).removeClass(
										"progress-bar-success");
								$(".process_" + name).addClass(
										"progress-bar-danger");
							} else {
								if (processdata > 60) {
									$(".process_" + name).removeClass(
											"progress-bar-success");
									$(".process_" + name).addClass(
											"progress-bar-warning");
								}
							}

						}
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

	viewAllStatus : function() {
		$("input[type='checkbox']").each(function() {
			if ($(this).get(0).checked) {

				var name = $(this).attr("class").substr(6);
				// alert(name);
				$(".i_view_" + name).click();
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
		vmdisk.listVmInfosByPage("init");
		$('#vms').tab('show');
	},
	// VM END
	userOps : ops(4),
	bootpagFuc : function() {

		$('#pagination').bootpag({
			total : 1,
			maxVisible : 10
		}).on('page', function(event, num) {
			vmdisk.jpageIndex = num;
			vmdisk.listVmInfosByPage();
		});
	}
});

/*
 * avalon.ready(function() { appsvm.bootpagFuc(); appsvm.listApp("init");
 * appsvm.depList = getAllDepartments(); appsvm.envsList = getAllEnvs();
 * appsvm.applicationsTypeList = getAllAppType(); });
 */

avalon.ready(function() {
	/*
	 * if (vmdisk.userOps) { vmdisk.loadVmTAB(); } else {
	 * redirectAdminIndexPage(); }
	 */
	vmdisk.bootpagFuc();
	vmdisk.listVmInfosByPage("init");
	// $(".loadDiv").hide();
});

vmdisk.$watch("jpageSize", function(newValue) {
	vmdisk.pagesize1Cls = "";
	vmdisk.pagesize2Cls = "";
	vmdisk.pagesize3Cls = "";
	if (newValue == vmdisk.pagesize1) {
		vmdisk.pagesize1Cls = "pageSizeSelected";
	} else if (newValue == vmdisk.pagesize2) {
		vmdisk.pagesize2Cls = "pageSizeSelected";
	} else if (newValue == vmdisk.pagesize3) {
		vmdisk.pagesize3Cls = "pageSizeSelected";
	}
})