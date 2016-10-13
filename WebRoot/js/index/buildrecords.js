var start = {
	dateCell: '#inpstart',
	format: "YYYY-MM-DD",
	minDate: "2016-10-08", //最小日期
	maxDate: "2099-12-31", //最大日期
	isTime: false
};
var end = {
	dateCell: '#inpend',
	format: "YYYY-MM-DD",
	minDate: "2016-10-08", //最小日期
	maxDate: "2099-12-31", //最大日期
	isTime: false
};
jeDate(start);
jeDate(end);


var recordsvm = avalon.define({
	$id: 'recordsvm',
	pagesize1: "20",
	pagesize1Cls: "pageSizeSelected",
	pagesize2: "50",
	pagesize2Cls: "",
	pagesize3: "100",
	pagesize3Cls: "",
	changePageSize: function(pgsize) {
		recordsvm.jpageSize = pgsize;
		recordsvm.listBuildHistoryCount("init");
	},
	clearsearch: function () {
        recordsvm.conAppId = recordsvm.conStartDate = recordsvm.conEndDate="";
        $(".chosen-select").trigger("chosen:updated");
        recordsvm.listBuildHistoryCount("init");
    },
	jpageIndex: 1,
	jpageSize: 20,
	conStartDate: "",
	conEndDate: "",
	conAppId: "",
	appList: getAllApps(),
	buildRecords: [],
	listBuildHistoryCount: function(tag) {
		if (recordsvm.conStartDate == "") {
			tempStartData = "2016-10-08";
		} else {
			tempStartData = recordsvm.conStartDate;
		}
		if (recordsvm.conEndDate == "") {
			tempEndData = "2099-12-31"
		} else {
			tempEndData = recordsvm.conEndDate;
		}
		if (!compareDate(tempStartData, tempEndData)) {
			alert('开始时间大于结束时间,请修改！');
			return;
		}
		if (tag) {
			recordsvm.jpageIndex = 1;
		}
		zajax({
			url: "listBuildHistoryCount.action",
			type: "post",
			data: {
				"appid": recordsvm.conAppId,
				"start": tempStartData,
				"end": tempEndData,
				"pageindex": recordsvm.jpageIndex,
				"pagesize": recordsvm.jpageSize
			},
			async: false,
			success: function(data) {
				if (tag) {
					$('#pagination').bootpag({
						total: data.pagenum,
						page: recordsvm.jpageIndex
					});
				}
				var tempArr = [];
				for (i = 0; i < data.domain.length; i++) {
					var temAppEnvObj = new Object();
					temAppEnvObj.domain = data.domain[i];
					temAppEnvObj.sit1 = data.sit1[i];
					temAppEnvObj.sit2 = data.sit2[i];
					temAppEnvObj.uat = data.uat[i];
					temAppEnvObj.stress = data.stress[i];
					temAppEnvObj.total = data.total[i];
					tempArr[i] = temAppEnvObj;
				}
				recordsvm.buildRecords = tempArr;
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
			recordsvm.jpageIndex = num;
			recordsvm.listBuildHistoryCount();
		});
	}
})

avalon.ready(function() {
	recordsvm.bootpagFuc();
	recordsvm.listBuildHistoryCount("init");
	$(".chosen-select").chosen({
		no_results_text: "没有找到",
		allow_single_deselect: true,
		width: "300px"
	});
	$("#appSearchCZ").chosen().change(function() {
		recordsvm.conAppId = this.value;
	})
});

recordsvm.$watch("appList", function(newValue) {
	$(".chosen-select").trigger("chosen:updated");
});


recordsvm.$watch("jpageSize", function (newValue) {
    recordsvm.pagesize1Cls = "";
    recordsvm.pagesize2Cls = "";
    recordsvm.pagesize3Cls = "";
    if (newValue == recordsvm.pagesize1) {
        recordsvm.pagesize1Cls = "pageSizeSelected";
    }
    else if (newValue == recordsvm.pagesize2) {
        recordsvm.pagesize2Cls = "pageSizeSelected";
    }

    else if (newValue == recordsvm.pagesize3) {
        recordsvm.pagesize3Cls = "pageSizeSelected";
    }
});