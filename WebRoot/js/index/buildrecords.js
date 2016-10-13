var start = {
	dateCell: '#inpstart',
	skinCell: "jedateblue",
	format: 'YYYY-MM-DD',
	minDate: '2016-12-31', //设定最小日期为当前日期
	isinitVal: true,
	festival: true,
	ishmsVal: false,
	maxDate: '2099-12-31', //最大日期
	choosefun: function(elem, datas) {
		end.minDate = datas; //开始日选好后，重置结束日的最小日期
	}
};
var end = {
	dateCell: '#inpend',
	skinCell: "jedateblue",
	format: 'YYYY-MM-DD',
	minDate: jeDate.now(0), //设定最小日期为当前日期
	festival: true,
	maxDate: '2099-12-31', //最大日期
	choosefun: function(elem, datas) {
		start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
	}
};
jeDate(start);
jeDate(end);


var recordsvm = avalon.define({
	$id: 'recordsvm',
	conStartDate:""
})