var historyvm = avalon.define({
	$id: 'historyVM',
	envsList: getAllEnvs(),
	appList: getAllApps(),
	conAppId: "",
	conEnvId: "",
	conRevision: "",
	conBuilder: "",
	pagesize1: "20",
	pagesize1Cls: "pageSizeSelected",
	pagesize2: "50",
	pagesize2Cls: "",
	pagesize3: "100",
	pagesize3Cls: "",
	changePageSize: function(pgsize) {
		historyvm.jpageSize = pgsize;
		historyvm.listBuildHistory("init");
	},
	jpageIndex: 1,
	jpageSize: 20,
	buildHistoryArr: [],
	clearsearch: function() {
		historyvm.conAppId = historyvm.conEnvId = historyvm.conRevision = historyvm.conBuilder = "";
		historyvm.conTodayCK = false;
		$(".chosen-select").trigger("chosen:updated");
		historyvm.listBuildHistory("init");
	},
	today: "false",
	conTodayCK: false,
	listBuildHistory: function(tag) {
		if (tag) {
			historyvm.jpageIndex = 1;
		}
		zajax({
			url: "listBuildHistory.action",
			type: "post",
			data: {
				"appid": historyvm.conAppId,
				"envid": historyvm.conEnvId,
				"revision": historyvm.conRevision,
				"user": historyvm.conBuilder,
				"pageindex": historyvm.jpageIndex,
				"pagesize": historyvm.jpageSize,
				"today": historyvm.today
			},
			async: false,
			success: function(data) {
				if (tag) {
					$('#pagination').bootpag({
						total: data.pagenum,
						page: historyvm.jpageIndex
					});
				}
				var tempArr = [];
				for (i = 0; i < data.buildHistory.length; i++) {
					var temAppEnvObj = new Object();
					temAppEnvObj.buildHistory = data.buildHistory[i];
					temAppEnvObj.appName = data.appNames[i];
					temAppEnvObj.envName = data.envs[i];
					tempArr[i] = temAppEnvObj;
				}
				historyvm.buildHistoryArr = tempArr;
			},
			error: function(data) {
				alert(data.retMSG);
			}
		});
	},
	bootpagFuc: function() {
		$('#pagination').bootpag({
			total: 1,
			maxVisible: 10
		}).on('page', function(event, num) {
			historyvm.jpageIndex = num;
			historyvm.listBuildHistory();
		});
	}
});



avalon.ready(function() {
	historyvm.bootpagFuc();
	$(".chosen-select").chosen({
		no_results_text: "没有找到",
		allow_single_deselect: true,
		width: "300px"
	});
	$("#appSearchCZ").chosen().change(function() {
		historyvm.conAppId = this.value;
	});
	historyvm.listBuildHistory("init");
});

historyvm.$watch("appList", function(newValue) {
	$(".chosen-select").trigger("chosen:updated");
});



historyvm.$watch("jpageSize", function(newValue) {
	historyvm.pagesize1Cls = "";
	historyvm.pagesize2Cls = "";
	historyvm.pagesize3Cls = "";
	if (newValue == historyvm.pagesize1) {
		historyvm.pagesize1Cls = "pageSizeSelected";
	} else if (newValue == historyvm.pagesize2) {
		historyvm.pagesize2Cls = "pageSizeSelected";
	} else if (newValue == historyvm.pagesize3) {
		historyvm.pagesize3Cls = "pageSizeSelected";
	}
})

historyvm.$watch("conTodayCK", function(newValue) {
	if (newValue == true) {
		historyvm.today = "true";
	} else if (newValue == false) {
		historyvm.today = "false";
	}
})